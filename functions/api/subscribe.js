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

    // 3. Prepara il template email in HTML (abbinato ai colori del tuo sito)
const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="background-color: #000000; margin: 0; padding: 0; font-family: 'Montserrat', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #000000;">
          <tr>
            <td align="center" style="padding: 50px 20px;">
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px; background-color: #000000;">
                
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 18px; color: #E8C46A; margin: 0; letter-spacing: 1px;">
                      Raffaella Carrà – Live From Heaven
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding-bottom: 40px;">
                    <h1 style="font-family: 'Bebas Neue', Impact, sans-serif; font-size: 38px; color: #ffffff; letter-spacing: 2px; margin: 0; text-transform: uppercase;">
                      Preparati a fare <span style="color: #E8C46A;">rumore</span>
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td align="left" style="padding-bottom: 30px;">
                    <p style="font-size: 14px; line-height: 1.8; color: #ffffff; font-weight: 300; margin: 0 0 20px 0;">
                      La tua iscrizione è confermata.
                    </p>
                    <p style="font-size: 14px; line-height: 1.8; color: #ffffff; font-weight: 300; margin: 0 0 20px 0;">
                      Sei ufficialmente nella lista esclusiva per scoprire in anteprima mondiale le date del primo <strong>Official Hologram Concert</strong> dedicato a Raffaella Carrà.
                    </p>
                    <p style="font-size: 14px; line-height: 1.8; color: #ffffff; font-weight: 300; margin: 0;">
                      Niente spam, nessuna distrazione. Riceverai un nostro messaggio solo quando saremo pronti a svelare le date ufficiali e ad aprire le prevendite dei biglietti.
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 30px 0;">
                    <div style="border-top: 1px solid #C8922A; opacity: 0.3; width: 60%;"></div>
                  </td>
                </tr>

                <tr>
                  <td align="center">
                    <p style="font-family: 'Cormorant Garamond', Georgia, serif; font-style: italic; font-size: 15px; color: #E8C46A; margin: 0 0 15px 0;">
                      Official Hologram Concert
                    </p>
                    <p style="font-size: 10px; color: #666666; line-height: 1.5; margin: 0; letter-spacing: 0.5px; text-transform: uppercase;">
                      Hai ricevuto questa email perché ti sei iscritto su <br>
                      <a href="https://raffaellacarraofficial.com" style="color: #E8C46A; text-decoration: none;">raffaellacarraofficial.com</a><br><br>
                      © 2026 Raffaella Carrà Official.
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
        from: 'Newsletter Raffaella Carrà Hologram <newsletter@raffaellacarraofficial.com>',
        to: [userEmail],
        subject: 'Preparati a fare rumore ✨ Sei nella lista.',
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