const SIGNUP_TEMPLATE_KEY = 'config_signup_email_template_v1';
const FROM_ADDRESS = 'Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>';

const DEFAULT_SIGNUP_TEMPLATE = {
  "subject": "Sei in lista. Preparati a fare rumore ✨",
  "html": "<!doctype html>\n<html>\n<body style=\"margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#fff\">\n  <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"background:#050505;padding:40px 10px\">\n    <tr><td align=\"center\">\n      <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"max-width:600px;background:#0a0a0a;border:1px solid #1a1a1a;border-top:4px solid #d4af37;border-radius:8px;overflow:hidden\">\n        <tr>\n          <td align=\"center\" style=\"padding:50px 30px 30px;border-bottom:1px solid #1a1a1a\">\n            <div style=\"color:#fff;font-size:42px;letter-spacing:6px;font-weight:900\">RAFFAELLA</div>\n            <div style=\"color:#d4af37;font-size:15px;margin-top:15px;letter-spacing:3px;font-style:italic\">The Show Must Go On</div>\n          </td>\n        </tr>\n        <tr>\n          <td align=\"center\" style=\"padding:40px 30px\">\n            <div style=\"color:#fff;font-size:24px;font-family:Georgia,serif;font-style:italic;margin-bottom:25px\">Sei nella lista esclusiva.</div>\n            <p style=\"color:#ccc;font-size:15px;line-height:1.8;margin:0 0 40px\">\n              Benvenuto. Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo\n              <strong style=\"color:#d4af37;font-weight:normal\">Official Raffaella Carrà Hologram Concert</strong>.\n            </p>\n            <div style=\"border-top:1px solid #222;border-bottom:1px solid #222;padding:20px 0;color:#d4af37;font-size:20px;letter-spacing:3px\">\n              SEI PRONTO A FARE RUMORE?\n            </div>\n            <div style=\"margin-top:40px;background:#111;border-left:2px solid #d4af37;padding:20px;text-align:left\">\n              <p style=\"color:#999;font-size:13px;margin:0 0 8px\">✓ Zero spam, te lo promettiamo.</p>\n              <p style=\"color:#999;font-size:13px;margin:0 0 8px\">✓ Solo comunicazioni e date ufficiali.</p>\n              <p style=\"color:#999;font-size:13px;margin:0\">✓ Accesso prioritario ai biglietti.</p>\n            </div>\n            <p style=\"color:#888;font-size:16px;text-align:right;font-family:Georgia,serif;font-style:italic;margin:35px 0 0\">\n              A presto,<br><span style=\"color:#d4af37;font-size:20px\">Raffa Holo Team</span>\n            </p>\n          </td>\n        </tr>\n        <tr>\n          <td align=\"center\" style=\"padding:30px;background:#080808;border-top:1px solid #151515\">\n            <p style=\"color:#666;font-size:11px;line-height:1.6;margin:0 0 10px\">\n              Hai ricevuto questa email perché ti sei iscritto dal sito ufficiale\n              <a href=\"https://raffaellacarraofficial.com\" style=\"color:#d4af37;text-decoration:none\">raffaellacarraofficial.com</a>.\n            </p>\n            <p style=\"color:#555;font-size:11px;margin:0 0 15px\">\n              Se hai cambiato idea e non vuoi più ricevere aggiornamenti, rispondi a questa email scrivendo \"CANCELLAMI\".\n            </p>\n            <p style=\"color:#444;font-size:11px;margin:0;letter-spacing:1px\">\n              © 2026 Raffaella Carrà Official Hologram Concert\n            </p>\n          </td>\n        </tr>\n      </table>\n    </td></tr>\n  </table>\n</body>\n</html>",
  "text": "Raffaella Carrà - The Show Must Go On\n\nSei nella lista esclusiva.\n\nBenvenuto. Sarai tra i primi a scoprire le date ufficiali e ad accedere alle prevendite del primo Official Raffaella Carrà Hologram Concert.\n\nSEI PRONTO A FARE RUMORE?\n\n✓ Zero spam, te lo promettiamo.\n✓ Solo comunicazioni e date ufficiali.\n✓ Accesso prioritario ai biglietti.\n\nA presto,\nRaffa Holo Team\n\n---\n© 2026 Raffaella Carrà Official Hologram Concert\nHai ricevuto questa email perché ti sei iscritto su raffaellacarraofficial.com.\nSe vuoi cancellarti e non ricevere più aggiornamenti, rispondi a questa email scrivendo \"CANCELLAMI\"."
};

function replaceVars(value, email) {
  return String(value || '').replace(/\{\{email\}\}/g, email);
}

async function getSignupTemplate(context) {
  const kv = context.env?.VISITOR_COUNT;
  if (!kv) return DEFAULT_SIGNUP_TEMPLATE;

  try {
    const raw = await kv.get(SIGNUP_TEMPLATE_KEY);
    if (!raw) return DEFAULT_SIGNUP_TEMPLATE;

    const data = JSON.parse(raw);
    if (!data || !String(data.subject || '').trim() || !String(data.html || '').trim()) {
      return DEFAULT_SIGNUP_TEMPLATE;
    }

    return {
      subject: String(data.subject).trim(),
      html: String(data.html),
      text: String(data.text || '')
    };
  } catch (_) {
    return DEFAULT_SIGNUP_TEMPLATE;
  }
}

export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const userEmail = String(body.email || '').trim().toLowerCase();

    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return new Response(JSON.stringify({ success: false, error: 'Email non valida' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    if (!context.env?.VISITOR_COUNT) {
      return new Response(JSON.stringify({ success: false, error: 'Archivio iscritti non configurato' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      });
    }

    await context.env.VISITOR_COUNT.put(
      `subscriber_${userEmail}`,
      new Date().toISOString()
    );

    const template = await getSignupTemplate(context);

    const subject = replaceVars(template.subject, userEmail);
    const html = replaceVars(template.html, userEmail);
    const text = replaceVars(template.text, userEmail);

    const key = String(context.env?.RESEND_API_KEY || '').trim();

    if (!key) {
      console.error('RESEND_API_KEY non configurata: iscrizione salvata, email automatica non inviata.');
    } else {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json',
          'User-Agent': 'RaffaLiveSignup/4.0'
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [userEmail],
          subject,
          html,
          ...(text ? { text } : {})
        })
      });

      if (!resendResponse.ok) {
        console.error('Errore invio email automatica:', await resendResponse.text());
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error?.message || 'Errore iscrizione'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });
  }
}
