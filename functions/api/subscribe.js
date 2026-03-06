export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const userEmail = body.email;

    if (!userEmail || !userEmail.includes('@')) {
      return new Response("Email non valida", { status: 400 });
    }

    // Salva l'email nel database KV
    await context.env.VISITOR_COUNT.put(`subscriber_${userEmail}`, new Date().toISOString());

    // FONDAMENTALE: L'URL dell'immagine deve essere assoluto e pubblico.
    // Carica il file header.jpg sul tuo sito e assicurati che questo link sia corretto!
    const headerImageUrl = "https://raffaellacarraofficial.com/header.jpg";

    // 1. VERSIONE TESTO SEMPLICE (Anti-Spam salvavita)
    const plainText = `Preparati a fare rumore!\n\nSei ufficialmente nella lista esclusiva. Sarai tra i primi a scoprire le date del primo Official Hologram Concert dedicato a Raffaella Carrà.\n\n✓ Zero spam, te lo promettiamo.\n✓ Solo comunicazioni e date ufficiali.\n✓ Accesso prioritario ai biglietti.\n\n© 2026 Raffaella Carrà Official Hologram Concert\nHai ricevuto questa email perché ti sei iscritto su raffaellacarraofficial.com.\nSe vuoi cancellarti, rispondi a questa email con "CANCELLAMI".`;

    // 2. VERSIONE HTML (Design Sicuro per Client Email)
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
              
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 8px; overflow: hidden;">
                
                <tr>
                  <td align="center" style="background-color: #000000;">
                    <img src="${headerImageUrl}" alt="Raffaella Carrà - Live From Heaven" width="600" style="display: block; width: 100%; max-width: 600px; height: auto; border: 0;" />
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 40px 30px;">
                    <h1 style="color: #d4af37; font-size: 26px; margin: 0 0 20px 0; font-weight: normal; font-family: 'Times New Roman', Times, serif; font-style: italic;">
                      Sei nella lista esclusiva.
                    </h1>
                    <p style="color: #e0e0e0; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                      Benvenuto! Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo <strong>Official Hologram Concert</strong> dedicato all'icona immortale della TV italiana.
                    </p>
                    
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #111111; border-left: 3px solid #d4af37; border-radius: 4px;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="color: #aaaaaa; font-size: 13px; margin: 0 0 10px 0;">✓ Zero spam, te lo promettiamo.</p>
                          <p style="color: #aaaaaa; font-size: 13px; margin: 0 0 10px 0;">✓ Solo comunicazioni e date ufficiali.</p>
                          <p style="color: #aaaaaa; font-size: 13px; margin: 0;">✓ Accesso prioritario ai biglietti.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding: 30px; background-color: #080808; border-top: 1px solid #1a1a1a;">
                    <p style="color: #555555; font-size: 11px; line-height: 1.5; margin: 0 0 10px 0;">
                      Hai ricevuto questa email perché ti sei iscritto alla newsletter su <a href="https://raffaellacarraofficial.com" style="color: #d4af37; text-decoration: none;">raffaellacarraofficial.com</a>.
                    </p>
                    <p style="color: #444444; font-size: 11px; margin: 0 0 15px 0;">
                      Se vuoi essere rimosso dalla lista, rispondi a questa email con la parola "CANCELLAMI".
                    </p>
                    <p style="color: #333333; font-size: 11px; margin: 0;">
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
        from: 'Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>',
        to: [userEmail],
        subject: 'Sei in lista. Preparati a fare rumore ✨',
        html: emailHtml,
        text: plainText // <-- QUESTO SALVA LA MAIL DALLO SPAM
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