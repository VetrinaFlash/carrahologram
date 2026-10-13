# BRANCH `new` — VERSIONE SENZA COUNTDOWN

Pacchetto preparato confrontando `new` con `newcount`.

## IMPORTANTE

Il sito pubblico SENZA countdown è già presente nel branch `new`:

- `index.html` del branch `new` = struttura principale del sito che `newcount`
  mostra quando il countdown è terminato.
- `concert.js` del branch `new` = versione senza il blocco `COUNTDOWN GATE`.
- `concert.css`, `sparkles-elegant.css` e gli asset principali del concerto
  sono già presenti nel branch `new`.

Per questo motivo NON devi copiare nel branch `new`:
- `countdown-screen.css`
- `countdown-lettering.*`
- `gate-*`
- `preview.html`
- il blocco countdown dentro `index.html`
- il blocco `initCountdownGate()` dentro `concert.js`

Questo ZIP contiene SOLO i file che vanno portati da `newcount` a `new`
per avere il sito definitivo senza countdown ma con tutte le funzioni attuali.

## FILE DA CARICARE / SOSTITUIRE

ROOT:
- `site-config.js`
  - URL Vivaticket reale
  - consenso newsletter obbligatorio
  - registrazione prova consenso
  - link Privacy
- `privacy.html`
- `subscribers.html`
  - dashboard amministrativa corrente

CLOUDFLARE FUNCTIONS:
- `functions/api/_middleware.js`
- `functions/api/consent.js`
- `functions/api/subscribe.js`
- `functions/api/subscribers.js`
- `functions/api/resend-admin.js`
- `functions/api/resend-info.js`
- `functions/api/send-broadcast.js`

## COSA RESTA INVARIATO NEL BRANCH `new`

NON sostituire:
- `index.html`
- `concert.js`
- `concert.css`
- `sparkles-elegant.css`
- poster, audio, scene, loghi e immagini già presenti

In questo modo `new` resta il sito concerto puro, senza countdown,
ma riceve tutta la parte aggiornata di iscrizione, consenso, Privacy,
dashboard subscribers e Resend.

## DOPO IL PUSH

1. Verifica `/` -> deve aprirsi direttamente il sito concerto, senza gate.
2. Verifica il pulsante Vivaticket.
3. Verifica un'iscrizione newsletter con checkbox consenso.
4. Verifica `/privacy.html`.
5. Verifica `/subscribers.html`.

Cloudflare deve mantenere:
- `VISITOR_COUNT`
- `RESEND_API_KEY`
- `ADMIN_PASSWORD` / configurazione admin già usata nel progetto.

Nessun secret è incluso in questo pacchetto.
