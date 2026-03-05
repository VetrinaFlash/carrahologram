export async function onRequestPost(context) {
  try {
    // 1. Leggi l'email inviata dal form
    const body = await context.request.json();
    const userEmail = body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return new Response("Email non valida", { status: 400 });
    }

    // 2. Salva l'email nel database KV (così avrai la tua lista iscritti!)
    // Usiamo l'email come chiave per evitare duplicati
    await context.env.VISITOR_COUNT.put(`subscriber_${userEmail}`, new Date().toISOString());

    // 3. Prepara il template email in HTML (design minimalista e elegante come il sito)
const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        </style>
      </head>
      <body style="background-color: #0a0a0a; margin: 0; padding: 0; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0a0a0a; min-height: 100vh;">
          <tr>
            <td align="center" style="padding: 60px 20px;">
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px;">
                
                <!-- Titolo principale -->
                <tr>
                  <td align="center" style="padding-bottom: 50px;">
                    <h1 style="font-family: 'Playfair Display', Georgia, serif; font-size: 48px; font-weight: 700; color: #ffffff; margin: 0; letter-spacing: -1px; line-height: 1.1;">
                      Preparati a fare
                    </h1>
                    <h2 style="font-family: 'Playfair Display', Georgia, serif; font-size: 48px; font-weight: 700; color: #d4af37; margin: 8px 0 0 0; letter-spacing: -1px;">
                      rumore
                    </h2>
                  </td>
                </tr>

                <!-- Sottotitolo elegante -->
                <tr>
                  <td align="center" style="padding-bottom: 45px;">
                    <p style="font-size: 13px; letter-spacing: 2px; color: #999999; margin: 0; text-transform: uppercase; font-weight: 500;">
                      Raffaella Carrà – Live From Heaven
                    </p>
                  </td>
                </tr>

                <!-- Messaggio principale -->
                <tr>
                  <td align="center" style="padding-bottom: 40px; border-top: 1px solid #333333; border-bottom: 1px solid #333333; padding-top: 40px;">
                    <p style="font-size: 15px; line-height: 1.8; color: #e8e8e8; font-weight: 300; margin: 0 0 25px 0;">
                      Sei ufficialmente nella lista esclusiva.
                    </p>
                    <p style="font-size: 15px; line-height: 1.8; color: #d8d8d8; font-weight: 300; margin: 0;">
                      Sarai tra i primi a scoprire le date del primo <strong style="color: #d4af37;">Official Hologram Concert</strong> dedicato a Raffaella Carrà.
                    </p>
                  </td>
                </tr>

                <!-- Sezione promessa -->
                <tr>
                  <td align="center" style="padding: 45px 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="left" style="padding-bottom: 18px;">
                          <p style="font-size: 12px; letter-spacing: 1px; color: #999999; margin: 0; text-transform: uppercase;">✓ Nessuno spam</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding-bottom: 18px;">
                          <p style="font-size: 12px; letter-spacing: 1px; color: #999999; margin: 0; text-transform: uppercase;">✓ Solo notizie ufficiali</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="padding-bottom: 0;">
                          <p style="font-size: 12px; letter-spacing: 1px; color: #999999; margin: 0; text-transform: uppercase;">✓ Cancellazione in qualsiasi momento</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Divisore -->
                <tr>
                  <td align="center" style="padding: 30px 0;">
                    <div style="width: 40px; height: 1px; background-color: #d4af37; margin: 0 auto;"></div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <p style="font-size: 11px; color: #666666; line-height: 1.6; margin: 0 0 20px 0; letter-spacing: 0.5px;">
                      <a href="https://carrahologram.pages.dev/carra" style="color: #d4af37; text-decoration: none; font-weight: 500;">carrahologram.pages.dev</a>
                    </p>
                    <p style="font-size: 10px; color: #555555; line-height: 1.6; margin: 0; letter-spacing: 0.3px;">
                      © 2026 Raffaella Carrà Official Hologram Concert<br>
                      Realizzato con ✨
                    </p>
                  </td>
                </tr>

              </table>
              
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // 4. Invia l'email tramite Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Raffaella Carrà Official <newsletter@carrahologram.pages.dev>',
        to: [userEmail],
        subject: 'Preparati a fare rumore ✨',
        html: emailHtml
      })
    });

    if (!resendResponse.ok) {
      console.error("Errore invio email:", await resendResponse.text());
      // Non blocchiamo l'utente se la mail fallisce, ma lo registriamo
    }

    // 5. Rispondi al sito web che è andato tutto bene
    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}