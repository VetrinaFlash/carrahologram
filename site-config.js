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
  ticketUrl: '',
  countdownTarget: '2026-10-14T10:00:00+02:00'
});

