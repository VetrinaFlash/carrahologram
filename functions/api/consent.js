const json = (payload, status = 200) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return json({ error: 'Email non valida' }, 400);
    }

    if (body.consent !== true) {
      return json({ error: 'Consenso richiesto' }, 400);
    }

    if (!context.env.VISITOR_COUNT) {
      return json({ error: 'Archivio consensi non configurato' }, 500);
    }

    const serverConsentAt = new Date().toISOString();
    const record = {
      email,
      consent: true,
      purpose: 'Aggiornamenti email su biglietti, concerto, prevendite e merchandising',
      consentVersion: String(body.consentVersion || 'newsletter-marketing-v3'),
      privacyVersion: String(body.privacyVersion || 'privacy-2026-10-10'),
      source: String(body.source || 'website'),
      clientConsentAt: body.clientConsentAt || null,
      serverConsentAt
    };

    await context.env.VISITOR_COUNT.put(
      `subscriber_consent_${email}`,
      JSON.stringify(record)
    );

    return json({ success: true });
  } catch (error) {
    return json({ error: error && error.message ? error.message : 'Errore consenso' }, 500);
  }
}
