// Elegant sparkle override: loaded after concert.css so it can refine the
// existing Carrà sparkle effect without changing the main stylesheet.
(() => {
  const href = 'sparkles-elegant.css?v=20261008';
  if (!document.querySelector(`link[href^="sparkles-elegant.css"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
})();

// Exact event link and countdown.
window.CARRA_CONFIG = Object.freeze({
  ticketUrl: 'https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642',
  countdownTarget: '2026-10-14T10:00:00+02:00'
});

// Newsletter consent.
// V35 deliberately avoids observing/mutating the whole body: V34 could create a
// self-triggering MutationObserver loop because textContent changes are mutations.
(() => {
  const CONSENT_VERSION = 'newsletter-marketing-v3';
  const PRIVACY_VERSION = 'privacy-2026-10-10';

  const copy = {
    it: 'Acconsento a ricevere via email aggiornamenti su biglietti, concerto e merchandising.',
    en: 'I agree to receive email updates about tickets, the concert and merchandise.',
    es: 'Acepto recibir por email novedades sobre entradas, concierto y merchandising.',
    pt: 'Aceito receber por email novidades sobre bilhetes, concerto e merchandising.',
    de: 'Ich willige ein, E-Mail-Updates zu Tickets, Konzert und Merchandise zu erhalten.',
    fr: 'J’accepte de recevoir par e-mail des actualités sur les billets, le concert et le merchandising.'
  };

  const privacyCopy = {
    it: 'Privacy', en: 'Privacy', es: 'Privacidad',
    pt: 'Privacidade', de: 'Datenschutz', fr: 'Confidentialité'
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'it').toLowerCase().split('-')[0];
    return copy[value] ? value : 'it';
  };

  function injectStyles() {
    if (document.getElementById('carra-consent-style')) return;
    const style = document.createElement('style');
    style.id = 'carra-consent-style';
    style.textContent = `
      .carra-consent-row{
        display:flex;align-items:flex-start;gap:6px;
        margin:6px 2px 0;padding:0;
        color:rgba(255,255,255,.86);
        font:500 10px/1.25 Arial,Helvetica,sans-serif;
        text-align:left;letter-spacing:0;
      }
      .carra-consent-row input[type="checkbox"]{
        appearance:none;-webkit-appearance:none;
        flex:0 0 14px;width:14px;height:14px;margin:0;
        border:1px solid rgba(255,255,255,.72);border-radius:3px;
        background:rgba(4,2,16,.90);cursor:pointer;position:relative;
        box-shadow:0 0 0 1px rgba(255,40,111,.10),0 2px 6px rgba(0,0,0,.32);
      }
      .carra-consent-row input[type="checkbox"]:checked{
        border-color:#ff4a90;background:#ff2b72;
      }
      .carra-consent-row input[type="checkbox"]:checked::after{
        content:'✓';position:absolute;inset:-1px 0 0;
        color:#fff;font:900 11px/14px Arial,Helvetica,sans-serif;text-align:center;
      }
      .carra-consent-row input[type="checkbox"]:focus-visible{
        outline:2px solid #fff;outline-offset:2px;
      }
      .carra-consent-row a{
        color:#fff;text-decoration:underline;text-underline-offset:2px;
        white-space:nowrap;font-weight:700;
      }

      /* Countdown: compact second row inside the existing form area. */
      #countdownScreen .gate-form-row{
        display:grid!important;
        grid-template-columns:minmax(0,1fr) auto!important;
        grid-template-rows:auto auto!important;
        column-gap:8px!important;
        row-gap:1px!important;
      }
      #countdownScreen .gate-input{
        grid-column:1!important;grid-row:1!important;
        padding-top:6px!important;padding-bottom:1px!important;
        align-self:end!important;
      }
      #countdownScreen .gate-btn{
        grid-column:2!important;grid-row:1 / span 2!important;
        align-self:center!important;
      }
      #countdownScreen .carra-consent-row{
        grid-column:1!important;grid-row:2!important;
        width:auto!important;margin:0 0 3px 4px!important;
        color:rgba(255,255,255,.88)!important;
        font-size:8.1px!important;line-height:1.12!important;
        text-shadow:0 1px 4px rgba(0,0,0,.95)!important;
        overflow:hidden!important;
      }
      #countdownScreen .carra-consent-row input[type="checkbox"]{
        flex-basis:12px!important;width:12px!important;height:12px!important;
      }
      #countdownScreen .carra-consent-row input[type="checkbox"]:checked::after{
        font-size:9px!important;line-height:12px!important;
      }

      .home-signup .carra-consent-row,
      dialog .carra-consent-row,
      form[data-subscribe]:not(#gateSubscribeForm) .carra-consent-row{
        max-width:100%;font-size:9px;line-height:1.2;margin-top:5px;
      }

      @media (max-width:699px){
        #countdownScreen .carra-consent-row{
          font-size:7.35px!important;gap:5px!important;margin-left:2px!important;
        }
        #countdownScreen .gate-input{
          padding-top:4px!important;padding-bottom:0!important;
        }
        #countdownScreen .carra-consent-row input[type="checkbox"]{
          flex-basis:11px!important;width:11px!important;height:11px!important;
        }
        #countdownScreen .carra-consent-row input[type="checkbox"]:checked::after{
          font-size:8px!important;line-height:11px!important;
        }
        .home-signup .carra-consent-row,
        dialog .carra-consent-row,
        form[data-subscribe]:not(#gateSubscribeForm) .carra-consent-row{
          font-size:8.3px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setLabelText(label) {
    const l = lang();
    const text = label.querySelector('.carra-consent-text');
    const link = label.querySelector('.carra-privacy-link');
    if (text) text.textContent = copy[l] + ' ';
    if (link) link.textContent = privacyCopy[l];
  }

  function enhanceForms() {
    document.querySelectorAll('form[data-subscribe]').forEach((form, index) => {
      if (form.querySelector('input[name="marketingConsent"]')) return;

      const checkboxId = `marketingConsent_${form.id || index}`;
      const label = document.createElement('label');
      label.className = 'carra-consent-row';
      label.htmlFor = checkboxId;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = checkboxId;
      checkbox.name = 'marketingConsent';
      checkbox.value = 'yes';
      checkbox.required = true;
      checkbox.setAttribute('aria-required', 'true');

      const wrap = document.createElement('span');
      const text = document.createElement('span');
      text.className = 'carra-consent-text';

      const privacy = document.createElement('a');
      privacy.className = 'carra-privacy-link';
      privacy.href = 'privacy.html';
      privacy.target = '_blank';
      privacy.rel = 'noopener noreferrer';
      privacy.addEventListener('click', event => event.stopPropagation());

      wrap.append(text, privacy);
      label.append(checkbox, wrap);
      setLabelText(label);

      if (form.id === 'gateSubscribeForm') {
        const row = form.querySelector('.gate-form-row');
        if (row) {
          const button = row.querySelector('button[type="submit"]');
          if (button) row.insertBefore(label, button);
          else row.appendChild(label);
        }
      } else {
        const finePrint = form.querySelector('.fine-print');
        if (finePrint) form.insertBefore(label, finePrint);
        else form.appendChild(label);
      }
    });
  }

  injectStyles();

  // site-config.js is defer in index.html, but this guard also makes it safe if
  // the loading strategy changes in the future.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceForms, { once: true });
  } else {
    enhanceForms();
  }

  // Only observe the language attribute. This does NOT mutate/observe body.
  new MutationObserver(() => {
    document.querySelectorAll('.carra-consent-row').forEach(setLabelText);
  }).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  let pendingConsent = null;

  // Capture phase: validate consent before concert.js handles the form.
  document.addEventListener('submit', event => {
    const form = event.target.closest && event.target.closest('form[data-subscribe]');
    if (!form) return;

    const checkbox = form.querySelector('input[name="marketingConsent"]');
    if (!checkbox || !checkbox.checked) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (checkbox) checkbox.reportValidity();
      return;
    }

    const email = form.querySelector('input[type="email"]');
    pendingConsent = {
      email: String(email ? email.value : '').trim().toLowerCase(),
      source: form.id || 'subscribe-form',
      clientConsentAt: new Date().toISOString()
    };
  }, true);

  // Keep the original /api/subscribe untouched.
  // Before it runs, store the consent proof in /api/consent.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const urlString = typeof input === 'string' ? input : (input && input.url);
    if (!urlString) return nativeFetch(input, init);

    let url;
    try { url = new URL(urlString, window.location.href); }
    catch (_) { return nativeFetch(input, init); }

    if (url.origin !== window.location.origin || url.pathname !== '/api/subscribe') {
      return nativeFetch(input, init);
    }

    let payload;
    try { payload = JSON.parse(init.body || '{}'); }
    catch (_) { return nativeFetch(input, init); }

    const normalizedEmail = String(payload.email || '').trim().toLowerCase();
    if (!pendingConsent || pendingConsent.email !== normalizedEmail) {
      return new Response(JSON.stringify({ error:'Consenso richiesto' }), {
        status:400,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    }

    const proofResponse = await nativeFetch('/api/consent', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email: normalizedEmail,
        consent: true,
        consentVersion: CONSENT_VERSION,
        privacyVersion: PRIVACY_VERSION,
        source: pendingConsent.source,
        clientConsentAt: pendingConsent.clientConsentAt
      })
    });

    if (!proofResponse.ok) {
      return new Response(JSON.stringify({ error:'Impossibile registrare il consenso' }), {
        status:500,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    }

    return nativeFetch(input, init);
  };
})();

// Audio bootstrap for the NEWCOUNT gate.
(() => {
  const attemptMainAudio = () => {
    const button = document.getElementById('audioButton');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    button.click();
  };

  const onGesture = event => {
    if (!event.isTrusted) return;
    if (event.type === 'keydown' && (event.ctrlKey || event.metaKey || event.altKey)) return;
    attemptMainAudio();
  };

  document.addEventListener('pointerdown', onGesture, { passive: true });
  document.addEventListener('touchstart', onGesture, { passive: true });
  document.addEventListener('click', onGesture, { passive: true });
  document.addEventListener('keydown', onGesture);

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(attemptMainAudio, 0);
  }, { once: true });
})();

// Launch page V4 — dock riallineato, home signup compatto e RTL allineato ai partner.
(() => {
  const STYLE_HREF = 'launch-page-v4.css?v=20261013-1';
  if (!document.querySelector(`link[href^="launch-page-v4.css"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_HREF;
    document.head.appendChild(link);
  }

  const TICKET_URL = 'https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642';

  function openTickets() {
    const link = document.createElement('a');
    link.href = TICKET_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // Tutti i CTA biglietti portano direttamente alla pagina evento ufficiale.
  document.addEventListener('click', event => {
    const target = event.target.closest && event.target.closest('#ticketButton,[data-open="ticketDialog"],#purchaseLink');
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const openDialog = target.closest('dialog[open]');
    if (openDialog) openDialog.close();
    openTickets();
  }, true);

  function enhanceConcertPanel() {
    const panel = document.getElementById('infoDialog');
    if (!panel || panel.dataset.launchV4 === '1') return;
    panel.dataset.launchV4 = '1';
    panel.classList.add('concert-info-panel');

    const eyebrow = panel.querySelector('.eyebrow');
    const title = panel.querySelector('h2');
    const intro = panel.querySelector('.panel-intro');
    const details = panel.querySelector('.event-details');

    if (eyebrow) {
      eyebrow.removeAttribute('data-t');
      eyebrow.textContent = 'IL CONCERTO';
    }
    if (title) {
      title.removeAttribute('data-t');
      title.textContent = 'RAFFA È TORNATA.';
    }
    if (intro) {
      intro.removeAttribute('data-t');
      intro.classList.add('concert-lead');
      intro.textContent = 'Non un tributo. Non un musical. Un vero concerto dal vivo, dove passato e futuro si incontrano.';
    }

    const story = document.createElement('div');
    story.className = 'concert-story';
    story.lang = 'it';

    const paragraphs = [
      'Per la prima volta in Italia, Raffaella Carrà torna sul palco attraverso un ologramma iperrealistico, così realistico da regalare la sensazione di averla nuovamente davanti ai nostri occhi, mentre canta, balla e sorride con quell\'energia inconfondibile che ha conquistato milioni di persone.',
      '“RAFFAELLA CARRÀ – THE SHOW MUST GO ON” è un\'esperienza straordinaria di 100 minuti, un viaggio attraverso i suoi più grandi successi, i momenti indimenticabili della sua carriera e i racconti più emozionanti della sua vita.',
      'Sul palco, Raffaella sarà protagonista di uno spettacolo ricco di musica, danza e tecnologia, accompagnata da ballerini dal vivo, coreografie spettacolari, laser 3D, effetti luminosi, fiamme, geyser ed effetti speciali di ultima generazione.',
      'Un concerto pensato per far cantare, ballare, sorridere ed emozionare, rivivendo insieme quelle canzoni e quei momenti che hanno unito intere generazioni.',
      'Non è soltanto uno spettacolo. È l\'occasione di ritrovare, attraverso la magia della tecnologia, quella gioia, quella libertà e quella straordinaria voglia di vivere che hanno reso Raffaella un\'icona senza tempo.',
      'Un progetto ufficiale, realizzato con l\'autorizzazione degli aventi diritto, prodotto da Laserman Industries sotto la direzione artistica e creativa di Andrea Prince.',
      'Il 28 dicembre 2026, all\'Atlantico di Roma, preparati a vivere qualcosa di mai visto prima.',
      'La musica riparte. L\'energia si accende. Raffa è tornata.'
    ];

    paragraphs.forEach((text, index) => {
      const p = document.createElement('p');
      p.textContent = text;
      if (index === paragraphs.length - 1) p.className = 'concert-story-finale';
      story.appendChild(p);
    });

    const dateLine = document.createElement('p');
    dateLine.className = 'concert-story-date';
    dateLine.innerHTML = '<strong>28 DICEMBRE 2026 · ATLANTICO ROMA.</strong>';
    story.appendChild(dateLine);

    if (details) panel.insertBefore(story, details);
    else panel.appendChild(story);

    const ticketCta = panel.querySelector('[data-open="ticketDialog"]');
    if (ticketCta) {
      ticketCta.removeAttribute('data-t');
      ticketCta.textContent = 'Acquista biglietti su Vivaticket ↗';
    }
  }

  function updateDockPosition() {
    const frame = document.querySelector('.poster-frame');
    const poster = document.querySelector('.poster-art');
    if (!frame || !poster || !poster.complete || !poster.naturalWidth || poster.naturalWidth <= poster.naturalHeight) return;
    const bounds = frame.getBoundingClientRect();
    const scale = Math.min(bounds.width / poster.naturalWidth, bounds.height / poster.naturalHeight);
    const renderedHeight = poster.naturalHeight * scale;
    const y = (bounds.height - renderedHeight) / 2;
    // V4: il dock scende sotto la data senza invadere la fascia partner.
    let ratio = 0.758;
    if (window.innerHeight <= 820) ratio = 0.752;
    if (window.innerHeight <= 700) ratio = 0.745;
    const dockY = bounds.top + y + renderedHeight * ratio;
    document.documentElement.style.setProperty('--launch-dock-y', `${dockY.toFixed(1)}px`);
  }

  // V3: riposiziona RTL in modo ottico sia desktop sia mobile.
  // Il canvas originale lo spostava verso il basso sul desktop e lo lasciava
  // troppo alto sul mobile rispetto alla fascia Laserman / Atlantico.
  function initRtlAlignment() {
    const frame = document.querySelector('.poster-frame');
    const poster = document.querySelector('.poster-art');
    const canvas = document.querySelector('.poster-canvas');
    if (!frame || !poster || !canvas) return;

    const backgrounds = {
      desktop: new Image(),
      mobile: new Image()
    };
    backgrounds.desktop.src = 'rtl-background-desktop.png';
    backgrounds.mobile.src = 'rtl-background-mobile.png';

    let raf = 0;

    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTimeout(patch, 34));
    }

    function featherBackground(ctx, background, iw, ih, x, y, scale, box, ratio) {
      const { left, top, width, height, pad = 14 } = box;
      const patchCanvas = document.createElement('canvas');
      patchCanvas.width = width + pad * 2;
      patchCanvas.height = height + pad * 2;
      const patchCtx = patchCanvas.getContext('2d');
      if (!patchCtx) return;

      patchCtx.drawImage(
        background,
        (left - pad) * background.naturalWidth / iw,
        (top - pad) * background.naturalHeight / ih,
        (width + pad * 2) * background.naturalWidth / iw,
        (height + pad * 2) * background.naturalHeight / ih,
        0, 0, patchCanvas.width, patchCanvas.height
      );

      patchCtx.globalCompositeOperation = 'destination-in';
      for (const horizontal of [true, false]) {
        const length = horizontal ? patchCanvas.width : patchCanvas.height;
        const gradient = patchCtx.createLinearGradient(
          0, 0,
          horizontal ? length : 0,
          horizontal ? 0 : length
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(pad / length, 'black');
        gradient.addColorStop(1 - pad / length, 'black');
        gradient.addColorStop(1, 'transparent');
        patchCtx.fillStyle = gradient;
        patchCtx.fillRect(0, 0, patchCanvas.width, patchCanvas.height);
      }

      ctx.drawImage(
        patchCanvas,
        x + (left - pad) * scale,
        y + (top - pad) * scale,
        patchCanvas.width * scale,
        patchCanvas.height * scale
      );
    }

    function patch() {
      updateDockPosition();

      if (!poster.complete || !poster.naturalWidth || !canvas.width || !canvas.height) return;

      const desktop = poster.naturalWidth > poster.naturalHeight;
      const background = backgrounds[desktop ? 'desktop' : 'mobile'];
      if (!background.complete || !background.naturalWidth) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bounds = frame.getBoundingClientRect();
      const w = bounds.width;
      const h = bounds.height;
      const iw = poster.naturalWidth;
      const ih = poster.naturalHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.min(w / iw, h / ih);
      const x = (w - iw * scale) / 2;
      const y = (h - ih * scale) / 2;

      ctx.save();
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      let sourceCx, sourceCy, radius, targetCx, targetCy, eraseBox;

      if (desktop) {
        // Desktop: RTL sulla stessa fascia ottica di Laserman e Atlantico.
        sourceCx = 758;
        sourceCy = 780;
        radius = 46;
        targetCx = 758;
        targetCy = 786;
        eraseBox = { left: 692, top: 708, width: 134, height: 146, pad: 18 };
      } else {
        // Mobile: il logo sale/scende insieme alla locandina, ma resta tra i
        // due partner in basso invece di galleggiare troppo in alto tra le gambe.
        sourceCx = 431;
        sourceCy = 1177;
        radius = 49;
        targetCx = 431;
        targetCy = 1416;
        eraseBox = { left: 360, top: 1102, width: 142, height: 154, pad: 18 };
      }

      // Cancella la vecchia posizione del logo usando il background pulito.
      featherBackground(ctx, background, iw, ih, x, y, scale, eraseBox, pixelRatio);

      // Ridisegna il logo originale nella nuova posizione, senza rigenerarlo.
      ctx.beginPath();
      ctx.arc(
        x + targetCx * scale,
        y + targetCy * scale,
        radius * scale,
        0,
        Math.PI * 2
      );
      ctx.clip();
      ctx.drawImage(
        poster,
        sourceCx - radius,
        sourceCy - radius,
        radius * 2,
        radius * 2,
        x + (targetCx - radius) * scale,
        y + (targetCy - radius) * scale,
        radius * 2 * scale,
        radius * 2 * scale
      );

      ctx.restore();
    }

    Object.values(backgrounds).forEach(image => image.addEventListener('load', schedule));
    poster.addEventListener('load', schedule);
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });
    new MutationObserver(schedule).observe(canvas, {
      attributes: true,
      attributeFilter: ['width', 'height']
    });
    schedule();
  }

  function initLaunchV4() {
    enhanceConcertPanel();
    updateDockPosition();
    initRtlAlignment();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLaunchV4, { once:true });
  } else {
    initLaunchV4();
  }
})();
