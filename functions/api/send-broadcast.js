export async function onRequest(context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-password'
  };

  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (context.request.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, error: 'Metodo non consentito. Usa POST.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const REQUIRED_PASSWORD = 'Andrea12@';

  try {
    const body = await context.request.json();
    const password = body.password || context.request.headers.get('x-admin-password');

    // Verifica password
    if (password !== REQUIRED_PASSWORD) {
      return new Response(JSON.stringify({ success: false, error: 'Password non valida o non autorizzata.' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const apiKey = context.env?.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({
        success: false,
        error: "RESEND_API_KEY non configurata nelle variabili d'ambiente di Cloudflare Pages."
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const fromAddress = body.from || 'Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>';
    const subject = body.subject;
    const htmlContent = body.html;
    let textContent = body.text || '';
    const recipients = body.recipients;

    if (!subject || !subject.trim()) {
      return new Response(JSON.stringify({ success: false, error: "L'oggetto dell'email è obbligatorio." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (!htmlContent || !htmlContent.trim()) {
      return new Response(JSON.stringify({ success: false, error: "Il contenuto dell'email è obbligatorio." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Generazione automatica testo semplice (fondamentale contro i filtri antispam) se non passato
    if (!textContent && htmlContent) {
      textContent = htmlContent
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
        .replace(/<br\s*[\/]?>/gi, '\n')
        .replace(/<\/p>/gi, '\n\n')
        .replace(/<\/tr>/gi, '\n')
        .replace(/<\/h[1-6]>/gi, '\n\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }

    if (!Array.isArray(recipients) || recipients.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Nessun destinatario fornito." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Filtro e pulizia email valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRecipients = recipients
      .map(e => (typeof e === 'string' ? e.trim() : ''))
      .filter(e => emailRegex.test(e));

    if (validRecipients.length === 0) {
      return new Response(JSON.stringify({ success: false, error: "Nessun indirizzo email valido tra i destinatari." }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Se è un solo destinatario (es. email di test), possiamo usare l'endpoint singolo
    if (validRecipients.length === 1) {
      const singleRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'User-Agent': 'CarraHologramBroadcast/1.0'
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [validRecipients[0]],
          subject: subject,
          html: htmlContent,
          text: textContent || undefined
        })
      });

      const singleData = await singleRes.json();
      if (!singleRes.ok) {
        return new Response(JSON.stringify({
          success: false,
          error: singleData.message || 'Errore durante l\'invio dell\'email singola.',
          details: singleData
        }), {
          status: singleRes.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        sentCount: 1,
        ids: [singleData.id]
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Invio Batch tramite https://api.resend.com/emails/batch (supporta fino a 100 email per chiamata)
    // Se validRecipients > 100, dividiamo in sotto-lotti da 100
    const BATCH_SIZE = 100;
    const allResults = [];
    const errors = [];

    for (let i = 0; i < validRecipients.length; i += BATCH_SIZE) {
      const currentBatch = validRecipients.slice(i, i + BATCH_SIZE);
      const batchPayload = currentBatch.map(recipientEmail => ({
        from: fromAddress,
        to: [recipientEmail],
        subject: subject,
        html: htmlContent.replace(/\{\{email\}\}/g, recipientEmail),
        text: textContent ? textContent.replace(/\{\{email\}\}/g, recipientEmail) : undefined
      }));

      try {
        const batchRes = await fetch('https://api.resend.com/emails/batch', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'User-Agent': 'CarraHologramBroadcast/1.0'
          },
          body: JSON.stringify(batchPayload)
        });

        const batchData = await batchRes.json();

        if (!batchRes.ok) {
          errors.push({
            batchIndex: Math.floor(i / BATCH_SIZE),
            message: batchData.message || 'Errore nel lotto batch',
            recipients: currentBatch
          });
        } else {
          allResults.push(...(batchData.data || []));
        }
      } catch (batchErr) {
        errors.push({
          batchIndex: Math.floor(i / BATCH_SIZE),
          message: batchErr.message,
          recipients: currentBatch
        });
      }

      // Piccola pausa per rispettare il rate limit di 2 req/s di Resend se ci sono più batch
      if (i + BATCH_SIZE < validRecipients.length) {
        await new Promise(r => setTimeout(r, 600));
      }
    }

    const totalSent = validRecipients.length - errors.reduce((acc, e) => acc + e.recipients.length, 0);

    return new Response(JSON.stringify({
      success: errors.length === 0,
      sentCount: totalSent,
      totalRequested: validRecipients.length,
      errors: errors.length > 0 ? errors : undefined
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
