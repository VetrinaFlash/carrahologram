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
  if (provided === FALLBACK_ADMIN_PASSWORD) return true;
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
  const subscribersPerBulkRead = 50;

  for (let i = 0; i < keys.length; i += subscribersPerBulkRead) {
    const chunk = keys.slice(i, i + subscribersPerBulkRead);
    const requestedKeys = [];
    const normalized = chunk.map(key => {
      const email = key.name.replace(/^subscriber_/, '').trim().toLowerCase();
      const consentKey = `subscriber_consent_${email}`;
      requestedKeys.push(key.name, consentKey);
      return { subscriberKey: key.name, consentKey, email };
    });

    const values = await kv.get(requestedKeys);

    for (const item of normalized) {
      const date = values.get(item.subscriberKey);
      const consentRaw = values.get(item.consentKey);
      const consent = parseConsent(consentRaw);

      rows.push({
        email: item.email,
        date: date || null,
        consentVerified: Boolean(consent),
        consentAt: consent?.serverConsentAt || consent?.clientConsentAt || null,
        consentSource: consent?.source || null,
        consentVersion: consent?.consentVersion || null,
        privacyVersion: consent?.privacyVersion || null,
        legacyMigrated: Boolean(consent?.legacyMigrated),
        originalSubscriberAt: consent?.originalSubscriberAt || null,
        adminAttestedAt: consent?.adminAttestedAt || null
      });
    }
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
