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
      <div style="background-color: #000000; color: #ffffff; font-family: 'Montserrat', Arial, sans-serif; padding: 40px 20px; text-align: center;">
        <h1 style="color: #E8C46A; letter-spacing: 2px; margin-bottom: 20px; font-family: 'Bebas Neue', Arial, sans-serif;">PREPARATI A FARE RUMORE</h1>
        <p style="font-size: 16px; line-height: 1.6; font-weight: 300;">Ciao!</p>
        <p style="font-size: 16px; line-height: 1.6; font-weight: 300;">Grazie per esserti iscritto. Sei ufficialmente nella lista per scoprire in anteprima mondiale le date del <strong>Raffaella Carrà &ndash; Live From Heaven | Official Hologram Concert</strong>.</p>
        <p style="font-size: 16px; line-height: 1.6; font-weight: 300; color: #5BCFFF;">Ti scriveremo non appena ci saranno novità ufficiali e i biglietti saranno disponibili.</p>
        <hr style="border: 0; border-top: 1px solid rgba(200,146,42,0.3); margin: 30px auto; width: 50%;">
        <p style="font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 1px;">Ricevi questa email perch&eacute; ti sei iscritto su raffaellalivefromheaven.com.<br>Nessuno spam, solo notizie ufficiali.</p>
      </div>
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