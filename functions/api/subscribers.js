export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-password'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const REQUIRED_PASSWORD = 'Andrea12@';

  try {
    let password = null;

    // Lettura password da header
    password = context.request.headers.get('x-admin-password');

    // Lettura password da URL query (?pwd=...)
    if (!password) {
      try {
        const url = new URL(context.request.url);
        password = url.searchParams.get('pwd');
      } catch (_) {}
    }

    // Lettura password da body se POST
    if (!password && context.request.method === 'POST') {
      try {
        const body = await context.request.json();
        if (body && body.password) password = body.password;
      } catch (_) {}
    }

    // Verifica password
    if (password !== REQUIRED_PASSWORD) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Password non valida o mancante'
      }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!context.env || !context.env.VISITOR_COUNT) {
      return new Response(JSON.stringify({
        success: false,
        error: "Il binding KV 'VISITOR_COUNT' non è configurato o non è accessibile in questo ambiente."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Paginazione completa per recuperare TUTTE le chiavi subscriber_
    let allKeys = [];
    let cursor = undefined;
    let listComplete = false;

    while (!listComplete) {
      const listRes = await context.env.VISITOR_COUNT.list({
        prefix: 'subscriber_',
        cursor: cursor,
        limit: 1000
      });

      if (listRes.keys && listRes.keys.length > 0) {
        allKeys = allKeys.concat(listRes.keys);
      }

      listComplete = listRes.list_complete;
      cursor = listRes.cursor;
      if (!cursor) break;
    }

    // Estrazione email e date (in chunk da 25 per non sovraccaricare KV)
    const subscribers = [];
    const chunkSize = 25;

    for (let i = 0; i < allKeys.length; i += chunkSize) {
      const chunk = allKeys.slice(i, i + chunkSize);
      const dates = await Promise.all(
        chunk.map(async (k) => {
          try {
            return await context.env.VISITOR_COUNT.get(k.name);
          } catch (_) {
            return null;
          }
        })
      );

      for (let j = 0; j < chunk.length; j++) {
        const email = chunk[j].name.replace(/^subscriber_/, '');
        subscribers.push({
          email: email,
          date: dates[j] || null
        });
      }
    }

    // Ordinamento: dal più recente al più vecchio (se la data è presente)
    subscribers.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });

    // Controllo se è stato richiesto il download CSV diretto
    const url = new URL(context.request.url);
    const format = url.searchParams.get('format');

    if (format === 'csv') {
      let csv = 'Email,Data Iscrizione\n';
      subscribers.forEach(sub => {
        const d = sub.date ? new Date(sub.date).toISOString() : '';
        csv += `"${sub.email}","${d}"\n`;
      });

      return new Response(csv, {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="iscritti_raffaella_carra.csv"'
        }
      });
    }

    // Risposta JSON di default
    return new Response(JSON.stringify({
      success: true,
      count: subscribers.length,
      subscribers: subscribers
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
