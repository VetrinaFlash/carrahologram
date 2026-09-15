const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
let defaultApiKey = process.argv[2] || process.env.RESEND_API_KEY || '';

// Funzione helper per chiamate HTTPS a Resend
function requestResend(endpoint, method, apiKey, postData = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL('https://api.resend.com' + endpoint);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'User-Agent': 'ResendAccountFinderLocal/1.0'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed, raw: body });
        } catch (_) {
          resolve({ status: res.statusCode, data: { raw: body }, raw: body });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

// Logica per individuare l'email di login
async function resolveResendAccount(apiKey) {
  let loginEmail = null;
  let probeData = null;

  // 1. Prova sonda Sandbox
  try {
    const probeRes = await requestResend('/emails', 'POST', apiKey, {
      from: 'onboarding@resend.dev',
      to: ['check-account-owner-verification-probe@resend.dev'],
      subject: 'Probe',
      text: 'Probe'
    });
    probeData = probeRes.data;

    if (probeData && probeData.message) {
      const match = probeData.message.match(/to your own email address \(([^)]+)\)/i);
      if (match && match[1]) {
        loginEmail = match[1].trim();
      } else {
        const emailMatch = probeData.message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
        if (emailMatch && emailMatch[1] && !emailMatch[1].includes('resend.dev')) {
          loginEmail = emailMatch[1].trim();
        }
      }
    }
  } catch (err) {
    probeData = { error: err.message };
  }

  // 2. Dati accessori
  let domains = [];
  let recentEmails = [];
  let apiKeys = [];

  try {
    const domRes = await requestResend('/domains', 'GET', apiKey);
    if (domRes.data && domRes.data.data) domains = domRes.data.data;
  } catch (_) {}

  try {
    const mailRes = await requestResend('/emails?limit=10', 'GET', apiKey);
    if (mailRes.data && mailRes.data.data) {
      recentEmails = mailRes.data.data;
      if (!loginEmail && recentEmails.length > 0) {
        for (const e of recentEmails) {
          if (Array.isArray(e.to)) {
            for (const addr of e.to) {
              if (!addr.includes('resend.dev') && !loginEmail) {
                loginEmail = addr;
                break;
              }
            }
          }
        }
      }
    }
  } catch (_) {}

  try {
    const keysRes = await requestResend('/api-keys', 'GET', apiKey);
    if (keysRes.data && keysRes.data.data) apiKeys = keysRes.data.data;
  } catch (_) {}

  const maskedKey = apiKey.length > 8 ? apiKey.substring(0, 5) + '...' + apiKey.slice(-4) : '***';

  return {
    success: true,
    loginEmail,
    detectionMethod: loginEmail ? "Rilevato tramite restrizione Sandbox/Testing Resend" : null,
    probeMessage: probeData?.message || null,
    maskedKey,
    domains,
    recentEmails,
    apiKeys,
    rawProbe: probeData
  };
}

// Server HTTP locale
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Header CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Endpoint API /api/resend-info
  if (pathname === '/api/resend-info') {
    const apiKey = parsedUrl.query.key || defaultApiKey;
    if (!apiKey) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: false,
        error: "Nessuna API Key fornita. Inseriscila nel campo o avvia con 'node local-server.js re_xxx'"
      }));
      return;
    }

    try {
      const result = await resolveResendAccount(apiKey);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
    return;
  }

  // File statici
  let filePath = path.join(__dirname, pathname === '/' ? 'resend-check.html' : pathname);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'resend-check.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.mp4': 'video/mp4'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Server locale attivo: http://localhost:${PORT}/resend-check.html`);
  console.log(`======================================================\n`);

  if (defaultApiKey) {
    console.log(`Verifico subito la chiave passata (${defaultApiKey.substring(0, 5)}...)...`);
    try {
      const res = await resolveResendAccount(defaultApiKey);
      if (res.loginEmail) {
        console.log(`\n🎉 EMAIL DI LOGIN TROVATA: ${res.loginEmail}\n`);
      } else {
        console.log(`⚠️ Email non estratta automaticamente. Apri la pagina nel browser per i dettagli.`);
      }
    } catch (e) {
      console.error(`Errore verifica immediata:`, e.message);
    }
  } else {
    console.log(`💡 Apri http://localhost:${PORT}/resend-check.html nel browser`);
    console.log(`   oppure avvia: node local-server.js re_tuachiave\n`);
  }
});
