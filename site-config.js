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
