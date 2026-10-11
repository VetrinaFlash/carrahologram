const SEGMENT_NAME = 'Raffa Live — Consensi verificati';
const SEGMENT_KEY = 'config_resend_marketing_segment_id';
const LAST_BROADCAST_KEY = 'config_resend_last_broadcast';
const SIGNUP_TEMPLATE_KEY = 'config_signup_email_template_v1';

const DEFAULT_SIGNUP_TEMPLATE = {
  "subject": "Sei in lista. Preparati a fare rumore ✨",
  "html": "<!doctype html>\n<html>\n<body style=\"margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#fff\">\n  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background:#050505;padding:40px 10px\">\n    <tr><td align=\"center\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width:600px;background:#0a0a0a;border:1px solid #1a1a1a;border-top:4px solid #d4af37;border-radius:8px;overflow:hidden\">\n        <tr>\n          <td align=\"center\" style=\"padding:50px 30px 30px;border-bottom:1px solid #1a1a1a\">\n            <div style=\"color:#fff;font-size:42px;letter-spacing:6px;font-weight:900\">RAFFAELLA</div>\n            <div style=\"color:#d4af37;font-size:15px;margin-top:15px;letter-spacing:3px;font-style:italic\">The Show Must Go On</div>\n          </td>\n        </tr>\n        <tr>\n          <td align=\"center\" style=\"padding:40px 30px\">\n            <div style=\"color:#fff;font-size:24px;font-family:Georgia,serif;font-style:italic;margin-bottom:25px\">Sei nella lista esclusiva.</div>\n            <p style=\"color:#ccc;font-size:15px;line-height:1.8;margin:0 0 40px\">\n              Benvenuto. Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo\n              <strong style=\"color:#d4af37;font-weight:normal\">Official Raffaella Carrà Hologram Concert</strong>.\n            </p>\n            <div style=\"border-top:1px solid #222;border-bottom:1px solid #222;padding:20px 0;color:#d4af37;font-size:20px;letter-spacing:3px\">\n              SEI PRONTO A FARE RUMORE?\n            </div>\n            <div style=\"margin-top:40px;background:#111;border-left:2px solid #d4af37;padding:20px;text-align:left\">\n              <p style=\"color:#999;font-size:13px;margin:0 0 8px\">✓ Zero spam, te lo promettiamo.</p>\n              <p style=\"color:#999;font-size:13px;margin:0 0 8px\">✓ Solo comunicazioni e date ufficiali.</p>\n              <p style=\"color:#999;font-size:13px;margin:0\">✓ Accesso prioritario ai biglietti.</p>\n            </div>\n            <p style=\"color:#888;font-size:16px;text-align:right;font-family:Georgia,serif;font-style:italic;margin:35px 0 0\">\n              A presto,<br><span style=\"color:#d4af37;font-size:20px\">Raffa Holo Team</span>\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td align=\"center\" style=\"padding:30px;background:#080808;border-top:1px solid #151515\">\n            <p style=\"color:#666;font-size:11px;line-height:1.6;margin:0 0 10px\">\n              Hai ricevuto questa email perché ti sei iscritto dal sito ufficiale\n              <a href=\"https://raffaellacarraofficial.com\" style=\"color:#d4af37;text-decoration:none\">raffaellacarraofficial.com</a>.\n            </p>\n            <p style=\"color:#555;font-size:11px;margin:0 0 15px\">\n              Se hai cambiato idea e non vuoi più ricevere aggiornamenti, rispondi a questa email scrivendo \"CANCELLAMI\".\n            </p>\n            <p style=\"color:#444;font-size:11px;margin:0;letter-spacing:1px\">\n              © 2026 Raffaella Carrà Official Hologram Concert\n            </p>\n          </td>\n        </tr>\n      </table>\n    </td></tr>\n  </table>\n</body>\n</html>",
  "text": "Raffaella Carrà - The Show Must Go On\n\nSei nella lista esclusiva.\n\nBenvenuto. Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo Official Raffaella Carrà Hologram Concert.\n\nSEI PRONTO A FARE RUMORE?\n\n✓ Zero spam, te lo promettiamo.\n✓ Solo comunicazioni e date ufficiali.\n✓ Accesso prioritario ai biglietti.\n\nA presto,\nRaffa Holo Team\n\n---\n© 2026 Raffaella Carrà Official Hologram Concert\nHai ricevuto questa email perché ti sei iscritto su raffaellacarraofficial.com.\nSe vuoi cancellarti e non ricevere più aggiornamenti, rispondi a questa email scrivendo \"CANCELLAMI\"."
};

const FROM_ADDRESS = 'Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>';

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

function adminPassword(context) {
  return String(context.env?.ADMIN_PASSWORD || '');
}

function isAuthorized(context) {
  const expected = adminPassword(context);
  const provided = String(context.request.headers.get('x-admin-password') || '');
  return expected.length >= 16 && provided.length > 0 && provided === expected;
}

function apiKey(context) {
  return String(
    context.env?.RESEND_ADMIN_API_KEY ||
    context.env?.RESEND_API_KEY ||
    ''
  ).trim();
}

async function resendRequest(key, path, options = {}) {
  const headers = new Headers(options.headers || {});
  headers.set('Authorization', `Bearer ${key}`);
  headers.set('User-Agent', 'RaffaLiveBroadcastAdmin/3.0');

  let body = options.body;
  if (body && !(body instanceof FormData) && typeof body !== 'string') {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(body);
  } else if (typeof body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`https://api.resend.com${path}`, {
    ...options,
    headers,
    body
  });

  const raw = await response.text();
  let data = null;
  if (raw) {
    try { data = JSON.parse(raw); }
    catch (_) { data = { raw }; }
  }

  return {
    ok: response.ok,
    status: response.status,
    data
  };
}

function resendError(result, fallback = 'Errore Resend') {
  return (
    result?.data?.message ||
    result?.data?.error ||
    result?.data?.name ||
    fallback
  );
}

async function ensureSegment(context, key) {
  if (!context.env?.VISITOR_COUNT) {
    throw new Error("Binding KV 'VISITOR_COUNT' non configurato.");
  }

  const storedId = await context.env.VISITOR_COUNT.get(SEGMENT_KEY);

  const listed = await resendRequest(key, '/segments', { method: 'GET' });
  if (!listed.ok) {
    const message = resendError(listed, 'Impossibile leggere i Segment Resend.');
    if (listed.status === 401 || listed.status === 403) {
      throw new Error(
        `${message} La chiave usata deve avere Full Access per Contacts, Segments e Broadcasts.`
      );
    }
    throw new Error(message);
  }

  const segments = Array.isArray(listed.data?.data) ? listed.data.data : [];

  let segment = null;
  if (storedId) {
    segment = segments.find(item => item.id === storedId) || null;
  }

  if (!segment) {
    segment = segments.find(item => item.name === SEGMENT_NAME) || null;
  }

  if (!segment) {
    const created = await resendRequest(key, '/segments', {
      method: 'POST',
      body: { name: SEGMENT_NAME }
    });

    if (!created.ok) {
      throw new Error(resendError(created, 'Impossibile creare il Segment Resend.'));
    }

    segment = created.data;
  }

  if (!segment?.id) {
    throw new Error('Resend non ha restituito un ID Segment valido.');
  }

  await context.env.VISITOR_COUNT.put(SEGMENT_KEY, segment.id);

  return {
    id: segment.id,
    name: segment.name || SEGMENT_NAME
  };
}

function parseConsent(raw) {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw);
    return value && value.consent === true ? value : null;
  } catch (_) {
    return null;
  }
}

function looksLikeExistingContact(result) {
  if (!result || result.ok) return true;
  const message = String(
    result.data?.message ||
    result.data?.error ||
    result.data?.name ||
    ''
  ).toLowerCase();

  return (
    result.status === 409 ||
    message.includes('already exist') ||
    message.includes('already been created') ||
    message.includes('contact already')
  );
}

function looksLikeExistingSegmentMembership(result) {
  if (!result || result.ok) return true;
  const message = String(
    result.data?.message ||
    result.data?.error ||
    result.data?.name ||
    ''
  ).toLowerCase();

  return (
    result.status === 409 ||
    message.includes('already') ||
    message.includes('exists')
  );
}

async function syncContact(key, segmentId, email) {
  const create = await resendRequest(key, '/contacts', {
    method: 'POST',
    body: { email }
  });

  if (!create.ok && !looksLikeExistingContact(create)) {
    // We still try to add it to the Segment: if the contact already exists but
    // Resend used a different duplicate error code, the segment call can succeed.
  }

  const add = await resendRequest(
    key,
    `/contacts/${encodeURIComponent(email)}/segments/${encodeURIComponent(segmentId)}`,
    { method: 'POST' }
  );

  if (!add.ok && !looksLikeExistingSegmentMembership(add)) {
    const createMessage = create.ok ? null : resendError(create, 'create contact failed');
    const addMessage = resendError(add, 'add to segment failed');

    throw new Error(
      createMessage
        ? `${createMessage}; ${addMessage}`
        : addMessage
    );
  }

  return {
    created: create.ok,
    segmentAdded: add.ok
  };
}

async function mapLimit(items, limit, worker) {
  const results = new Array(items.length);
  let index = 0;

  async function run() {
    while (true) {
      const current = index++;
      if (current >= items.length) return;
      try {
        results[current] = { ok: true, value: await worker(items[current], current) };
      } catch (error) {
        results[current] = {
          ok: false,
          error: error?.message || String(error)
        };
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, Math.max(items.length, 1)) }, () => run())
  );

  return results;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function addPreheader(html, preheader) {
  const text = String(preheader || '').trim();
  if (!text) return html;

  const block = `<div style="display:none!important;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">${escapeHtml(text)}</div>`;

  if (/<body[^>]*>/i.test(html)) {
    return html.replace(/<body([^>]*)>/i, match => `${match}${block}`);
  }

  return block + html;
}

function ensureUnsubscribe(html) {
  if (html.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) return html;

  const footer = `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px">
  <tr>
    <td align="center" style="padding:18px 14px;color:#777;font:11px/1.5 Arial,sans-serif">
      Hai ricevuto questa email perché ti sei iscritto agli aggiornamenti di Raffaella Carrà Official Hologram Concert.
      <br>
      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#999;text-decoration:underline">Disiscriviti</a>
    </td>
  </tr>
</table>`;

  if (/<\/body>/i.test(html)) {
    return html.replace(/<\/body>/i, `${footer}</body>`);
  }

  return html + footer;
}

function normalizeSchedule(value) {
  const scheduled = String(value || '').trim();
  if (!scheduled) return null;

  const parsed = new Date(scheduled);
  if (Number.isNaN(parsed.getTime())) {
    throw new Error('Data/ora di programmazione non valida.');
  }

  if (parsed.getTime() < Date.now() + 60_000) {
    throw new Error('La programmazione deve essere almeno 1 minuto nel futuro.');
  }

  return parsed.toISOString();
}


async function getSignupTemplate(context) {
  const kv = context.env?.VISITOR_COUNT;
  if (!kv) {
    return { ...DEFAULT_SIGNUP_TEMPLATE, isCustom: false, updatedAt: null };
  }

  try {
    const raw = await kv.get(SIGNUP_TEMPLATE_KEY);
    if (!raw) {
      return { ...DEFAULT_SIGNUP_TEMPLATE, isCustom: false, updatedAt: null };
    }

    const data = JSON.parse(raw);
    if (!data || !String(data.subject || '').trim() || !String(data.html || '').trim()) {
      return { ...DEFAULT_SIGNUP_TEMPLATE, isCustom: false, updatedAt: null };
    }

    return {
      subject: String(data.subject).trim(),
      html: String(data.html),
      text: String(data.text || ''),
      isCustom: true,
      updatedAt: data.updatedAt || null
    };
  } catch (_) {
    return { ...DEFAULT_SIGNUP_TEMPLATE, isCustom: false, updatedAt: null };
  }
}

function normalizeSignupTemplate(body) {
  const subject = String(body.subject || '').trim();
  const html = String(body.html || '');
  const text = String(body.text || '');

  if (!subject) throw new Error("L'oggetto della mail automatica è obbligatorio.");
  if (!html.trim()) throw new Error("L'HTML della mail automatica è obbligatorio.");
  if (subject.length > 200) throw new Error("L'oggetto è troppo lungo.");
  if (html.length > 250000) throw new Error("L'HTML è troppo grande.");
  if (text.length > 100000) throw new Error("Il testo semplice è troppo grande.");

  return { subject, html, text };
}

async function saveSignupTemplate(context, body) {
  if (!context.env?.VISITOR_COUNT) {
    throw new Error("Binding KV 'VISITOR_COUNT' non configurato.");
  }

  const template = normalizeSignupTemplate(body);
  const saved = {
    ...template,
    updatedAt: new Date().toISOString()
  };

  await context.env.VISITOR_COUNT.put(
    SIGNUP_TEMPLATE_KEY,
    JSON.stringify(saved)
  );

  return {
    success: true,
    signupTemplate: {
      ...saved,
      isCustom: true
    }
  };
}

async function resetSignupTemplate(context) {
  if (!context.env?.VISITOR_COUNT) {
    throw new Error("Binding KV 'VISITOR_COUNT' non configurato.");
  }

  await context.env.VISITOR_COUNT.delete(SIGNUP_TEMPLATE_KEY);

  return {
    success: true,
    signupTemplate: {
      ...DEFAULT_SIGNUP_TEMPLATE,
      isCustom: false,
      updatedAt: null
    }
  };
}

function replaceSignupVars(value, email) {
  return String(value || '').replace(/\{\{email\}\}/g, email);
}

async function sendSignupTemplateTest(context, key, body) {
  const to = String(body.to || '').trim();
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error('Email test non valida.');
  }

  const template = normalizeSignupTemplate(body);
  const result = await resendRequest(key, '/emails', {
    method: 'POST',
    body: {
      from: FROM_ADDRESS,
      to: [to],
      subject: `[TEST ISCRIZIONE] ${replaceSignupVars(template.subject, to)}`,
      html: replaceSignupVars(template.html, to),
      ...(template.text
        ? { text: replaceSignupVars(template.text, to) }
        : {})
    }
  });

  if (!result.ok) {
    throw new Error(resendError(result, 'Invio test mail iscrizione fallito.'));
  }

  return {
    success: true,
    id: result.data?.id || null
  };
}

async function getState(context, key) {
  const signupTemplate = await getSignupTemplate(context);
  let segment = null;
  let setupError = null;

  try {
    segment = await ensureSegment(context, key);
  } catch (error) {
    setupError = error?.message || String(error);
  }

  let usage = null;
  const usageResult = await resendRequest(key, '/usage', { method: 'GET' });
  if (usageResult.ok) usage = usageResult.data;

  let broadcasts = [];
  const broadcastsResult = await resendRequest(key, '/broadcasts', { method: 'GET' });
  if (broadcastsResult.ok && Array.isArray(broadcastsResult.data?.data)) {
    broadcasts = broadcastsResult.data.data.slice(0, 10);
  }

  let lastBroadcast = null;
  if (context.env?.VISITOR_COUNT) {
    const raw = await context.env.VISITOR_COUNT.get(LAST_BROADCAST_KEY);
    if (raw) {
      try { lastBroadcast = JSON.parse(raw); }
      catch (_) {}
    }
  }

  return {
    success: !setupError,
    segment,
    setupError,
    usage,
    broadcasts,
    lastBroadcast,
    signupTemplate,
    from: FROM_ADDRESS
  };
}

async function syncPage(context, key, cursor) {
  const kv = context.env?.VISITOR_COUNT;
  if (!kv) throw new Error("Binding KV 'VISITOR_COUNT' non configurato.");

  const segment = await ensureSegment(context, key);

  const page = await kv.list({
    prefix: 'subscriber_',
    cursor: cursor || undefined,
    limit: 80
  });

  const realSubscriberKeys = (page.keys || []).filter(
    item => !item.name.startsWith('subscriber_consent_')
  );

  const consented = [];
  let skippedNoConsent = 0;

  for (const item of realSubscriberKeys) {
    const email = item.name.replace(/^subscriber_/, '').trim().toLowerCase();
    if (!email || !email.includes('@')) continue;

    const consent = parseConsent(await kv.get(`subscriber_consent_${email}`));
    if (!consent) {
      skippedNoConsent++;
      continue;
    }

    consented.push(email);
  }

  const unique = [...new Set(consented)];

  const results = await mapLimit(unique, 5, email =>
    syncContact(key, segment.id, email)
  );

  let synced = 0;
  const errors = [];

  results.forEach((result, index) => {
    if (result?.ok) {
      synced++;
    } else {
      errors.push({
        email: unique[index],
        error: result?.error || 'Errore sincronizzazione'
      });
    }
  });

  return {
    success: errors.length === 0,
    segment,
    processed: realSubscriberKeys.length,
    consented: unique.length,
    synced,
    skippedNoConsent,
    errors,
    nextCursor: page.list_complete ? null : (page.cursor || null),
    listComplete: Boolean(page.list_complete)
  };
}

async function createBroadcast(context, key, body) {
  const segment = await ensureSegment(context, key);

  const subject = String(body.subject || '').trim();
  const originalHtml = String(body.html || '').trim();
  const text = String(body.text || '').trim();
  const preheader = String(body.preheader || '').trim();
  const mode = String(body.mode || 'draft');

  if (!subject) throw new Error("L'oggetto è obbligatorio.");
  if (!originalHtml) throw new Error("L'HTML della mail è obbligatorio.");

  if (!['draft', 'send', 'schedule'].includes(mode)) {
    throw new Error('Modalità broadcast non valida.');
  }

  if ((mode === 'send' || mode === 'schedule') && body.confirmation !== 'INVIA') {
    throw new Error('Conferma di invio mancante.');
  }

  let html = addPreheader(originalHtml, preheader);
  html = ensureUnsubscribe(html);

  const payload = {
    segment_id: segment.id,
    from: FROM_ADDRESS,
    subject,
    html,
    name: String(body.name || '').trim() || `Raffa Live — ${subject}`.slice(0, 70),
    send: mode !== 'draft'
  };

  if (text) payload.text = text;

  let scheduledAt = null;
  if (mode === 'schedule') {
    scheduledAt = normalizeSchedule(body.scheduledAt);
    payload.scheduled_at = scheduledAt;
  }

  const result = await resendRequest(key, '/broadcasts', {
    method: 'POST',
    body: payload
  });

  if (!result.ok) {
    throw new Error(resendError(result, 'Creazione Broadcast fallita.'));
  }

  const record = {
    id: result.data?.id || null,
    subject,
    mode,
    scheduledAt,
    segmentId: segment.id,
    createdAt: new Date().toISOString()
  };

  if (context.env?.VISITOR_COUNT) {
    await context.env.VISITOR_COUNT.put(
      LAST_BROADCAST_KEY,
      JSON.stringify(record)
    );
  }

  return {
    success: true,
    broadcast: record,
    resend: result.data
  };
}

async function sendSingleTest(key, body) {
  const to = String(body.to || '').trim();
  const subject = String(body.subject || '').trim();
  const html = String(body.html || '').trim();
  const text = String(body.text || '').trim();

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    throw new Error('Email test non valida.');
  }
  if (!subject) throw new Error("L'oggetto è obbligatorio.");
  if (!html) throw new Error("L'HTML è obbligatorio.");

  const result = await resendRequest(key, '/emails', {
    method: 'POST',
    body: {
      from: FROM_ADDRESS,
      to: [to],
      subject: `[TEST] ${subject}`,
      html,
      ...(text ? { text } : {})
    }
  });

  if (!result.ok) {
    throw new Error(resendError(result, 'Invio test fallito.'));
  }

  return {
    success: true,
    id: result.data?.id || null
  };
}

export async function onRequest(context) {
  if (!adminPassword(context)) {
    return json({
      success: false,
      error: 'ADMIN_PASSWORD non configurata su Cloudflare.'
    }, 503);
  }

  if (!isAuthorized(context)) {
    return json({ success: false, error: 'Non autorizzato.' }, 401);
  }

  const key = apiKey(context);
  if (!key) {
    return json({
      success: false,
      error: 'Configura RESEND_ADMIN_API_KEY (consigliato) o RESEND_API_KEY su Cloudflare.'
    }, 503);
  }

  try {
    if (context.request.method === 'GET') {
      return json(await getState(context, key));
    }

    if (context.request.method !== 'POST') {
      return json({ success: false, error: 'Metodo non consentito.' }, 405);
    }

    const body = await context.request.json();
    const action = String(body.action || '');

    if (action === 'setup') {
      const segment = await ensureSegment(context, key);
      return json({ success: true, segment });
    }

    if (action === 'sync') {
      return json(await syncPage(context, key, body.cursor || null));
    }

    if (action === 'broadcast') {
      return json(await createBroadcast(context, key, body));
    }

    if (action === 'test') {
      return json(await sendSingleTest(key, body));
    }

    if (action === 'save_signup_template') {
      return json(await saveSignupTemplate(context, body));
    }

    if (action === 'reset_signup_template') {
      return json(await resetSignupTemplate(context));
    }

    if (action === 'test_signup_template') {
      return json(await sendSignupTemplateTest(context, key, body));
    }

    return json({ success: false, error: 'Azione non valida.' }, 400);
  } catch (error) {
    return json({
      success: false,
      error: error?.message || 'Errore interno.'
    }, 500);
  }
}
