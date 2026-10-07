const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const profileDir = `${process.env.TEMP}\\chrome-dbg-${Date.now()}`;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--remote-debugging-port=9444',
    `--user-data-dir=${profileDir}`,
    'http://localhost:3000'
  ]);

  await new Promise(r => setTimeout(r, 2500));

  let res = await fetch('http://127.0.0.1:9444/json/list');
  let tabs = await res.json();
  const pageTab = tabs.find(t => t.type === 'page');
  let wsUrl = pageTab.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise(resolve => ws.onopen = resolve);

  let msgId = 1;
  const pending = new Map();
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      pending.get(data.id)(data);
      pending.delete(data.id);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const id = msgId++;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');

  for (const vp of [
    { name: 'desktop', w: 1440, h: 900, isMobile: false },
    { name: 'mobile', w: 390, h: 844, isMobile: true }
  ]) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.w,
      height: vp.h,
      deviceScaleFactor: 1,
      mobile: vp.isMobile
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await new Promise(r => setTimeout(r, 3000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const getBox = sel => {
          const el = document.querySelector(sel);
          if (!el) return { error: 'not found' };
          const r = el.getBoundingClientRect();
          return {
            x: Math.round(r.x),
            y: Math.round(r.y),
            w: Math.round(r.width),
            h: Math.round(r.height),
            cx: Math.round(r.x + r.width / 2),
            opacity: getComputedStyle(el).opacity,
            display: getComputedStyle(el).display
          };
        };
        return {
          viewportW: window.innerWidth,
          viewportH: window.innerHeight,
          centerX: Math.round(window.innerWidth / 2),
          motto: getBox('.motto-heading'),
          date: getBox('.date-row'),
          ticketWrap: getBox('.ticket-cta-wrap'),
          btnBuy: getBox('.btn-buy-ticket'),
          emailWrap: getBox('.email-card-wrap'),
          footer: getBox('.partners-footer')
        };
      })()`,
      returnByValue: true
    });

    console.log(`\n=== VIEWPORT: ${vp.name} (${vp.w}x${vp.h}) ===`);
    const val = evalRes?.result?.result?.value;
    console.log(JSON.stringify(val, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const shotPath = `${process.env.TEMP}\\cdp-${vp.name}.png`;
    fs.writeFileSync(shotPath, Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved screenshot: ${shotPath}`);
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
