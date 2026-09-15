export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let apiKey = context.env?.RESEND_API_KEY;

    // Consenti passaggio chiave via URL param ?key=... se non presente in env
    try {
      const url = new URL(context.request.url);
      const queryKey = url.searchParams.get('key');
      if (queryKey) apiKey = queryKey.trim();
    } catch (_) {}

    // Consenti passaggio chiave via header Authorization: Bearer re_...
    const authHeader = context.request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.replace('Bearer ', '').trim();
    }

    // Consenti passaggio chiave via body JSON se POST
    if (!apiKey && context.request.method === 'POST') {
      try {
        const body = await context.request.json();
        if (body && body.apiKey) apiKey = body.apiKey.trim();
      } catch (_) {}
    }

    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: "RESEND_API_KEY non trovata nelle variabili d'ambiente di Cloudflare Pages e nessuna chiave inserita manualmente."
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'User-Agent': 'ResendAccountFinder/1.0'
    };

    // 1. Prova di invio da onboarding@resend.dev verso un indirizzo fittizio
    // Resend blocca questa operazione con 403 e restituisce l'email registrata dell'account:
    // "You can only send testing emails to your own email address (EMAIL@DOMAIN.COM)..."
    let probeResponseRaw = null;
    let probeData = null;
    let loginEmail = null;

    try {
      const probeRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: 'onboarding@resend.dev',
          to: ['check-account-owner-verification-probe@resend.dev'],
          subject: 'Resend Account Email Check',
          text: 'Probe to discover account owner email'
        })
      });

      probeResponseRaw = await probeRes.text();
      try {
        probeData = JSON.parse(probeResponseRaw);
      } catch (_) {
        probeData = { raw: probeResponseRaw };
      }

      if (probeData && probeData.message) {
        // Cerca il pattern: to your own email address (email@example.com)
        const match = probeData.message.match(/to your own email address \(([^)]+)\)/i);
        if (match && match[1]) {
          loginEmail = match[1].trim();
        } else {
          // Fallback con regex generica per email nel messaggio d'errore
          const emailMatch = probeData.message.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
          if (emailMatch && emailMatch[1] && !emailMatch[1].includes('resend.dev')) {
            loginEmail = emailMatch[1].trim();
          }
        }
      }
    } catch (e) {
      probeData = { error: e.message };
    }

    // 2. Chiamate accessorie per raccogliere ulteriori dettagli (domini, email recenti, api keys)
    let domains = [];
    let recentEmails = [];
    let apiKeys = [];

    // Recupera domini
    try {
      const domRes = await fetch('https://api.resend.com/domains', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ResendAccountFinder/1.0'
        }
      });
      if (domRes.ok) {
        const d = await domRes.json();
        domains = d.data || [];
      }
    } catch (_) {}

    // Recupera email recenti
    try {
      const mailRes = await fetch('https://api.resend.com/emails?limit=10', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ResendAccountFinder/1.0'
        }
      });
      if (mailRes.ok) {
        const m = await mailRes.json();
        recentEmails = m.data || [];
        
        // Se non abbiamo ancora trovato l'email, controlla tra i destinatari delle prime email
        if (!loginEmail && recentEmails.length > 0) {
          for (const email of recentEmails) {
            if (Array.isArray(email.to)) {
              for (const addr of email.to) {
                if (!addr.includes('resend.dev') && !loginEmail) {
                  loginEmail = addr;
                  break;
                }
              }
            }
          }
        }
      }
    } catch (_) {}

    // Recupera chiavi API
    try {
      const keysRes = await fetch('https://api.resend.com/api-keys', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ResendAccountFinder/1.0'
        }
      });
      if (keysRes.ok) {
        const k = await keysRes.json();
        apiKeys = k.data || [];
      }
    } catch (_) {}

    const maskedKey = apiKey.length > 8 
      ? apiKey.substring(0, 5) + '...' + apiKey.slice(-4) 
      : '***';

    return new Response(JSON.stringify({
      success: true,
      loginEmail: loginEmail,
      detectionMethod: loginEmail ? "Rilevato tramite restrizione Sandbox/Testing Resend" : null,
      probeMessage: probeData?.message || null,
      maskedKey,
      domains,
      recentEmails,
      apiKeys,
      rawProbe: probeData
    }), {
      status: 200,
      headers: corsHeaders
    });

  } catch (err) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
}
