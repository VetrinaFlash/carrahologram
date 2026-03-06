export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const userEmail = body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return new Response("Email non valida", { status: 400 });
    }

    // Salva l'email nel database KV
    await context.env.VISITOR_COUNT.put(`subscriber_${userEmail}`, new Date().toISOString());

    // 1. VERSIONE TESTO SEMPLICE (FONDAMENTALE PER L'ANTI-SPAM)
    // Nessun link HTML, solo testo pulito. I filtri antispam verificano sempre che esista questa versione.
    const plainText = `Raffaella Carrà - Live From Heaven\n\nPreparati a fare rumore.\n\nSei ufficialmente nella lista esclusiva. Sarai tra i primi a scoprire le date del primo Official Hologram Concert dedicato a Raffaella Carrà.\n\nVisita il sito ufficiale: https://raffaellacarraofficial.com\n\n✓ Zero spam, te lo promettiamo.\n✓ Solo comunicazioni e date ufficiali.\n✓ Accesso prioritario ai biglietti.\n\n---\n© 2026 Raffaella Carrà Official Hologram Concert\nHai ricevuto questa email perché ti sei iscritto su raffaellacarraofficial.com.\nSe vuoi cancellarti e non ricevere più aggiornamenti, rispondi a questa email scrivendo "CANCELLAMI".`;

    // 2. VERSIONE HTML (Design tipografico di lusso senza immagini)
    const emailHtml = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Raffaella Carrà - Live From Heaven</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050505; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased;">
        
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #050505; padding: 40px 10px;">
          <tr>
            <td align="center">
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #1a1a1a; border-top: 4px solid #d4af37; border-radius: 8px; overflow: hidden;">
                
                <tr>
                  <td align="center" style="padding: 50px 30px 20px 30px; border-bottom: 1px solid #1a1a1a;">
                    <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-family: 'Times New Roman', Georgia, serif; text-transform: uppercase; letter-spacing: 4px;">
                      Raffaella
                    </h1>
                    <h2 style="color: #d4af37; font-size: 20px; margin: 10px 0 0 0; font-family: Arial, sans-serif; font-style: italic; letter-spacing: 2px;">
                      Live From Heaven
                    </h2>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 40px 30px;">
                    <h3 style="color: #ffffff; font-size: 22px; margin: 0 0 20px 0; font-weight: normal; font-family: 'Times New Roman', Georgia, serif; font-style: italic;">
                      Sei nella lista esclusiva.
                    </h3>
                    <p style="color: #cccccc; font-size: 15px; line-height: 1.8; margin: 0 0 30px 0;">
                      Benvenuto. Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo <strong style="color: #d4af37; font-weight: normal;">Official Hologram Concert</strong> dedicato all'icona immortale della TV italiana.
                    </p>
                    
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto 35px auto;">
                      <tr>
                        <td align="center" style="background-color: #d4af37; border-radius: 4px; padding: 14px 30px;">
                          <a href="https://raffaellacarraofficial.com" target="_blank" style="color: #000000; text-decoration: none; font-size: 14px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">
                            Visita il sito ufficiale
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #111111; border-left: 2px solid #d4af37; padding: 20px;">
                      <tr>
                        <td align="left">
                          <p style="color: #999999; font-size: 13px; margin: 0 0 8px 0;">✓ Zero spam, te lo promettiamo.</p>
                          <p style="color: #999999; font-size: 13px; margin: 0 0 8px 0;">✓ Solo comunicazioni e date ufficiali.</p>
                          <p style="color: #999999; font-size: 13px; margin: 0;">✓ Accesso prioritario ai biglietti.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 30px; background-color: #080808; border-top: 1px solid #151515;">
                    <p style="color: #666666; font-size: 11px; line-height: 1.6; margin: 0 0 10px 0;">
                      Hai ricevuto questa email perché hai richiesto di iscriverti alla nostra newsletter dal sito ufficiale <a href="https://raffaellacarraofficial.com" style="color: #d4af37; text-decoration: none;">raffaellacarraofficial.com</a>.
                    </p>
                    <p style="color: #555555; font-size: 11px; margin: 0 0 15px 0;">
                      Se hai cambiato idea e non vuoi più ricevere notizie sull'evento, rispondi a questa email scrivendo "CANCELLAMI".
                    </p>
                    <p style="color: #444444; font-size: 11px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
                      © 2026 Raffaella Carrà Official Hologram Concert
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
        // Il mittente DEVE coincidere con un dominio che hai verificato su Resend
        from: 'Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>',
        to: [userEmail],
        subject: 'Sei in lista. Preparati a fare rumore ✨',
        html: emailHtml,
        text: plainText // QUESTO E' IL PARAMETRO CHE TI SALVA DALLO SPAM
      })
    });

    if (!resendResponse.ok) {
      console.error("Errore invio email:", await resendResponse.text());
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}