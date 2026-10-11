function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

const FALLBACK_ADMIN_PASSWORD = 'Andrea12@';

function isAuthorized(context) {
  const expected = String(context.env?.ADMIN_PASSWORD || '').trim();
  const provided = String(context.request.headers.get('x-admin-password') || '').trim();

  if (!provided) return false;

  // Accetta sempre la password richiesta dal proprietario del sito.
  if (provided === FALLBACK_ADMIN_PASSWORD) return true;

  // Se Cloudflare contiene ADMIN_PASSWORD, accetta anche quel valore.
  return expected.length > 0 && provided === expected;
}

async function listSubscriberKeys(kv) {
  let cursor = undefined;
  const keys = [];

  do {
    const page = await kv.list({
      prefix: 'subscriber_',
      cursor,
      limit: 1000
    });

    for (const key of page.keys || []) {
      if (!key.name.startsWith('subscriber_consent_')) {
        keys.push(key);
      }
    }

    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);

  return keys;
}

function parseConsent(raw) {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    return data && data.consent === true ? data : null;
  } catch (_) {
    return null;
  }
}

async function readSubscribers(kv, keys) {
  const rows = [];
  const chunkSize = 25;

  for (let i = 0; i < keys.length; i += chunkSize) {
    const chunk = keys.slice(i, i + chunkSize);

    const batch = await Promise.all(chunk.map(async key => {
      const email = key.name.replace(/^subscriber_/, '').trim().toLowerCase();

      const [date, consentRaw] = await Promise.all([
        kv.get(key.name),
        kv.get(`subscriber_consent_${email}`)
      ]);

      const consent = parseConsent(consentRaw);

      return {
        email,
        date: date || null,
        consentVerified: Boolean(consent),
        consentAt: consent?.serverConsentAt || consent?.clientConsentAt || null,
        consentSource: consent?.source || null,
        consentVersion: consent?.consentVersion || null,
        privacyVersion: consent?.privacyVersion || null
      };
    }));

    rows.push(...batch);
  }

  rows.sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : 0;
    const tb = b.date ? new Date(b.date).getTime() : 0;
    return tb - ta;
  });

  return rows;
}

export async function onRequest(context) {
  if (context.request.method !== 'GET') {
    return json({ success: false, error: 'Metodo non consentito.' }, 405);
  }

  if (!isAuthorized(context)) {
    return json({ success: false, error: 'Non autorizzato.' }, 401);
  }

  if (!context.env?.VISITOR_COUNT) {
    return json({
      success: false,
      error: "Binding KV 'VISITOR_COUNT' non configurato."
    }, 500);
  }

  try {
    const keys = await listSubscriberKeys(context.env.VISITOR_COUNT);
    const subscribers = await readSubscribers(context.env.VISITOR_COUNT, keys);
    const consentedCount = subscribers.filter(item => item.consentVerified).length;

    return json({
      success: true,
      count: subscribers.length,
      consentedCount,
      legacyCount: subscribers.length - consentedCount,
      subscribers
    });
  } catch (error) {
    return json({
      success: false,
      error: error?.message || 'Errore caricamento iscritti.'
    }, 500);
  }
}
