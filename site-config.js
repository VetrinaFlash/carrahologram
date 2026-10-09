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
