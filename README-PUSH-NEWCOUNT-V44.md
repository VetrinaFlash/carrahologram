# NEWCOUNT V44 — FIX PANNELLO / TOO MANY API REQUESTS

Problema:
`/api/subscribers` faceva 2 letture KV separate per ogni iscritto.
Con molti iscritti superava il limite Cloudflare di operazioni nella singola invocazione Worker.

Fix:
- bulk read Workers KV;
- fino a 100 chiavi per operazione;
- 50 iscritti per batch = 100 chiavi = 1 operazione KV;
- nessuna modifica al frontend del pannello;
- nessuna modifica a Resend, password o grafica.

DA PUSHARE SU `newcount`:
- `functions/api/subscribers.js`
