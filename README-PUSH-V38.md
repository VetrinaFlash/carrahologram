# NEWCOUNT — V38 COMPLETA

Questa cartella contiene in un unico push:

1. Invio massivo da `subscribers.html` tramite Resend Broadcasts.
2. Sincronizzazione dei soli iscritti con consenso verificato nel Segment Resend.
3. Invio test, bozza, invio immediato o programmato dal pannello.
4. Sicurezza admin con `ADMIN_PASSWORD` in Cloudflare, non hardcoded.
5. `resend-info.js` disabilitato.
6. Vecchio `/api/send-broadcast` dismesso.
7. Sincronizzazione automatica dei nuovi consensi verso Resend (best effort).
8. NUOVO: editor della mail automatica che parte quando un utente si iscrive.
   - Oggetto modificabile
   - HTML modificabile
   - Testo semplice modificabile
   - Anteprima
   - Invio test
   - Ripristino template originale
   - Supporto placeholder `{{email}}`
   - Salvataggio del template nel KV `VISITOR_COUNT`

## File da pushare su `newcount`

Sostituisci:
- `subscribers.html`
- `functions/api/subscribers.js`
- `functions/api/consent.js`
- `functions/api/subscribe.js`
- `functions/api/send-broadcast.js`
- `functions/api/resend-info.js`

Aggiungi:
- `functions/api/resend-admin.js`

## Cloudflare

Obbligatori:
- `VISITOR_COUNT` = binding KV esistente
- `RESEND_API_KEY` = secret esistente
- `ADMIN_PASSWORD` = nuovo secret lungo almeno 20-24 caratteri

Consigliato, se puoi entrare su Resend:
- `RESEND_ADMIN_API_KEY` = API key Resend Full Access

Se `RESEND_ADMIN_API_KEY` non esiste, V38 prova automaticamente a usare `RESEND_API_KEY`.

## Mail automatica iscrizione

Dopo il deploy:

1. Apri `/subscribers.html`
2. Login con `ADMIN_PASSWORD`
3. Vai a **Email automatica nuova iscrizione**
4. Modifica oggetto / HTML / testo
5. Premi **Invia test**
6. Premi **Salva mail automatica**

Da quel momento `functions/api/subscribe.js` legge il template dal KV e lo usa
per ogni nuova iscrizione. Se il template non è mai stato salvato o viene
ripristinato, usa il design originale incluso nel codice.

## Broadcast

1. Inizializza Resend
2. Sincronizza ora
3. Invia test
4. Crea bozza / invia subito / programma

Prima di invio o programmazione la sincronizzazione viene rifatta.
