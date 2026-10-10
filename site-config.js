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

// Inserire qui il link esatto della pagina evento Vivaticket quando disponibile.
// Se vuoto, il pulsante apre la finestra di iscrizione già collegata a /api/subscribe.
window.CARRA_CONFIG = Object.freeze({
  ticketUrl: 'https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642',
  countdownTarget: '2026-10-14T10:00:00+02:00'
});

// ---------------------------------------------------------------------------
// Consenso newsletter / marketing email
// - checkbox non preselezionato e obbligatorio su TUTTI i form [data-subscribe]
// - nessun invio parte senza consenso
// - /api/subscribe continua a essere l'endpoint originale
// - il middleware server salva la prova del consenso prima dell'iscrizione
// ---------------------------------------------------------------------------
(() => {
  const CONSENT_VERSION = 'newsletter-marketing-v2';
  const PRIVACY_VERSION = 'privacy-2026-10-10';

  const consentCopy = {
    it: 'Acconsento a ricevere via email aggiornamenti su biglietti, concerto e merchandising.',
    en: 'I agree to receive email updates about tickets, the concert and merchandise.',
    es: 'Acepto recibir por email novedades sobre entradas, concierto y merchandising.',
    pt: 'Aceito receber por email novidades sobre bilhetes, concerto e merchandising.',
    de: 'Ich willige ein, E-Mail-Updates zu Tickets, Konzert und Merchandise zu erhalten.',
    fr: 'J’accepte de recevoir par e-mail des actualités sur les billets, le concert et le merchandising.'
  };

  const privacyLabel = {
    it: 'Privacy', en: 'Privacy', es: 'Privacidad', pt: 'Privacidade', de: 'Datenschutz', fr: 'Confidentialité'
  };

  const style = document.createElement('style');
  style.id = 'carra-consent-style';
  style.textContent = `
    .carra-consent-row{
      display:flex;align-items:flex-start;gap:6px;
      margin:6px 2px 0;padding:0;
      color:rgba(255,255,255,.82);
      font:500 10px/1.25 Arial,Helvetica,sans-serif;
      text-align:left;letter-spacing:0;
    }
    .carra-consent-row input[type="checkbox"]{
      appearance:none;-webkit-appearance:none;
      flex:0 0 14px;width:14px;height:14px;margin:0;
      border:1px solid rgba(255,255,255,.68);border-radius:3px;
      background:rgba(4,2,16,.88);cursor:pointer;position:relative;
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
      outline:2px solid rgba(255,255,255,.95);outline-offset:2px;
    }
    .carra-consent-text{display:inline}
    .carra-consent-row a{
      color:#fff;text-decoration:underline;text-underline-offset:2px;
      white-space:nowrap;font-weight:700;
    }

    /* COUNTDOWN: il consenso resta DENTRO il pill del form, senza aumentare
       l'altezza complessiva del layout. */
    #countdownScreen .gate-form-row{
      display:grid!important;
      grid-template-columns:minmax(0,1fr) auto!important;
      grid-template-rows:auto auto!important;
      column-gap:8px!important;row-gap:1px!important;
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
      color:rgba(255,255,255,.82)!important;
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

    /* Form del sito / dialog: aggiunta discreta sotto il campo senza stravolgere */
    .home-signup .carra-consent-row,
    dialog .carra-consent-row,
    form[data-subscribe]:not(#gateSubscribeForm) .carra-consent-row{
      max-width:100%;font-size:9px;line-height:1.2;margin-top:5px;
    }

    @media (max-width:699px){
      #countdownScreen .carra-consent-row{
        font-size:7.4px!important;gap:5px!important;margin-left:2px!important;
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

  const getLang = () => {
    const lang = (document.documentElement.lang || 'it').toLowerCase().split('-')[0];
    return consentCopy[lang] ? lang : 'it';
  };

  const updateConsentCopy = () => {
    const lang = getLang();
    document.querySelectorAll('.carra-consent-text').forEach(node => {
      node.textContent = consentCopy[lang] + ' ';
    });
    document.querySelectorAll('.carra-privacy-link').forEach(node => {
      node.textContent = privacyLabel[lang];
    });
  };

  const enhanceForms = () => {
    document.querySelectorAll('form[data-subscribe]').forEach((form, index) => {
      if (form.dataset.consentReady === 'true') return;
      form.dataset.consentReady = 'true';

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

      const copyWrap = document.createElement('span');
      const text = document.createElement('span');
      text.className = 'carra-consent-text';
      text.textContent = consentCopy[getLang()] + ' ';

      const privacy = document.createElement('a');
      privacy.className = 'carra-privacy-link';
      privacy.href = 'privacy.html';
      privacy.target = '_blank';
      privacy.rel = 'noopener';
      privacy.textContent = privacyLabel[getLang()];
      privacy.addEventListener('click', event => event.stopPropagation());

      copyWrap.append(text, privacy);
      label.append(checkbox, copyWrap);

      const gateRow = form.id === 'gateSubscribeForm' ? form.querySelector('.gate-form-row') : null;
      if (gateRow) {
        const button = gateRow.querySelector('button[type="submit"]');
        if (button) gateRow.insertBefore(label, button);
        else gateRow.appendChild(label);
      } else {
        const finePrint = form.querySelector('.fine-print');
        if (finePrint) form.insertBefore(label, finePrint);
        else form.appendChild(label);
      }
    });
  };

  // site-config.js è defer: il DOM principale è già stato parsato.
  enhanceForms();
  updateConsentCopy();

  // Copre eventuali form creati/aperti dinamicamente dopo il caricamento.
  new MutationObserver(() => {
    enhanceForms();
    updateConsentCopy();
  }).observe(document.body, { childList: true, subtree: true });

  new MutationObserver(updateConsentCopy).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  // Memorizza il consenso soltanto quando il submit del relativo form è valido.
  let latestConsent = null;
  document.addEventListener('submit', event => {
    const form = event.target.closest?.('form[data-subscribe]');
    if (!form) return;

    const checkbox = form.querySelector('input[name="marketingConsent"]');
    if (!checkbox || !checkbox.checked) {
      event.preventDefault();
      event.stopImmediatePropagation();
      checkbox?.reportValidity();
      return;
    }

    const emailInput = form.querySelector('input[type="email"]');
    latestConsent = {
      email: (emailInput?.value || '').trim().toLowerCase(),
      source: form.id || 'subscribe-form',
      clientConsentAt: new Date().toISOString()
    };
  }, true);

  // Il codice esistente continua a usare /api/subscribe. Aggiungiamo al JSON
  // soltanto i dati di consenso; il middleware server rifiuta richieste prive di consenso.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = (input, init = {}) => {
    const urlString = typeof input === 'string' ? input : input?.url;
    if (!urlString) return nativeFetch(input, init);

    let url;
    try { url = new URL(urlString, window.location.href); }
    catch { return nativeFetch(input, init); }

    if (url.origin !== window.location.origin || url.pathname !== '/api/subscribe') {
      return nativeFetch(input, init);
    }

    let payload = {};
    try { payload = JSON.parse(init.body || '{}'); }
    catch { return nativeFetch(input, init); }

    const normalizedEmail = String(payload.email || '').trim().toLowerCase();
    if (!latestConsent || latestConsent.email !== normalizedEmail) {
      return Promise.resolve(new Response(JSON.stringify({ error: 'Consenso richiesto' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    return nativeFetch(input, {
      ...init,
      headers: { ...(init.headers || {}), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...payload,
        consent: true,
        consentVersion: CONSENT_VERSION,
        privacyVersion: PRIVACY_VERSION,
        consentSource: latestConsent.source,
        clientConsentAt: latestConsent.clientConsentAt
      })
    });
  };
})();

// Audio bootstrap for the NEWCOUNT gate.
// The main app owns the audio instance. We simply trigger its existing audio
// button immediately where autoplay is allowed, then again on the first real
// user gesture (including taps on the countdown overlay) where browsers require it.
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
    // Audible autoplay is intentionally attempted: browsers that disallow it
    // will simply wait for the first trusted gesture handled above.
    setTimeout(attemptMainAudio, 0);
  }, { once: true });
})();
