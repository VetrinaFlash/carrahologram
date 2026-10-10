const CONSENT_VERSION = 'newsletter-marketing-v2';
const PRIVACY_VERSION = 'privacy-2026-10-10';

const json = (payload, status = 200) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Il middleware lascia inalterate tutte le altre API.
  if (request.method !== 'POST' || url.pathname !== '/api/subscribe') {
    return context.next();
  }

  try {
    // Usiamo clone(): subscribe.js riceverà ancora il body originale intatto.
    const body = await request.clone().json();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return json({ error: 'Email non valida' }, 400);
    }

    // Blocco SERVER-SIDE: non basta aggirare il checkbox dal browser.
    if (body.consent !== true) {
      return json({ error: 'Consenso richiesto' }, 400);
    }

    const serverConsentAt = new Date().toISOString();
    const consentRecord = {
      email,
      consent: true,
      purpose: 'Invio via email di aggiornamenti su biglietti, concerto e merchandising',
      consentVersion: CONSENT_VERSION,
      privacyVersion: PRIVACY_VERSION,
      source: String(body.consentSource || 'website'),
      clientConsentAt: body.clientConsentAt || null,
      serverConsentAt
    };

    // Stesso KV già usato da subscribe.js: nessun nuovo binding Cloudflare richiesto.
    await env.VISITOR_COUNT.put(
      `subscriber_consent_${email}`,
      JSON.stringify(consentRecord)
    );

    return context.next();
  } catch (error) {
    return json({ error: error?.message || 'Errore consenso' }, 500);
  }
}
