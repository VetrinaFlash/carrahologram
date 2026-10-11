const SEGMENT_KEY = 'config_resend_marketing_segment_id';

const json = (payload, status = 200) => new Response(JSON.stringify(payload), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8' }
});

async function resendRequest(key, path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('User-Agent', 'RaffaLiveConsentSync/2.0');

  let body = options.body;
  if (body && typeof body !== 'string') {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.resend.com${path}`, {
    ...options,
    headers,
    body
  });

  const raw = await response.text();
  let data = null;
  if (raw) {
    try { data = JSON.parse(raw); } catch (_) { data = { raw }; }
  }

  return { ok: response.ok, status: response.status, data };
}

function isDuplicate(result) {
  if (!result || result.ok) return true;
  const message = String(
    result.data?.message ||
    result.data?.error ||
    ''
  ).toLowerCase();

  return (
    result.status === 409 ||
    message.includes('already') ||
    message.includes('exists')
  );
}

async function bestEffortResendSync(context, email) {
  try {
    const key = String(
      context.env?.RESEND_ADMIN_API_KEY ||
      context.env?.RESEND_API_KEY ||
      ''
    ).trim();

    if (!key || !context.env?.VISITOR_COUNT) return;

    const segmentId = await context.env.VISITOR_COUNT.get(SEGMENT_KEY);
    if (!segmentId) return;

    const create = await resendRequest(key, '/contacts', {
      method: 'POST',
      body: { email }
    });

    if (!create.ok && !isDuplicate(create)) return;

    const add = await resendRequest(
      key,
      `/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
      { method: 'POST' }
    );

    // Never fail the signup because Resend synchronization can be recovered
    // later from subscribers.html using "Sincronizza ora".
    if (!add.ok && !isDuplicate(add)) {
      console.error('Resend contact sync failed', add.status, add.data);
    }
  } catch (error) {
    console.error('Resend contact sync exception', error);
  }
}

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

    await bestEffortResendSync(context, email);

    return json({ success: true });
  } catch (error) {
    return json({
      error: error?.message || 'Errore consenso'
    }, 500);
  }
}
