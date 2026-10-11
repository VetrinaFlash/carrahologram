# V41 — SINCRONIZZAZIONE A SCAGLIONI

Fix per errore Cloudflare:

`Too many subrequests by single Worker invocation`

## Come funziona

- massimo 5 iscritti per singola invocazione Worker;
- massimo 2 contatti Resend elaborati in parallelo;
- circa 800 ms di pausa tra uno scaglione e il successivo;
- il browser continua automaticamente usando il cursor KV;
- non devi premere più volte;
- i legacy vengono migrati come nella V40;
- il pannello mostra `Scaglione N`, processati, sincronizzati e legacy migrati;
- l'ID Segment Resend viene riutilizzato dal KV invece di rileggere `/segments`
  ad ogni scaglione.

## Uso

1. Pusha tutto su `newcount`.
2. Fai deploy.
3. Apri `/subscribers.html`.
4. Premi `Sincronizza ora`.
5. Aspetta che arrivi al 100%.

Se hai molti iscritti vedrai più scaglioni consecutivi: è voluto.
