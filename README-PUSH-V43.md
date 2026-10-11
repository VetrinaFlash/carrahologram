# V43 — SYNC ROBUSTA: SKIP EMAIL NON VALIDE

Correzione del problema in cui una singola email non valida poteva produrre
`Errore HTTP 200` e interrompere la sincronizzazione.

## Cosa cambia

- La sync continua anche se una singola email è errata.
- Gli indirizzi con sintassi chiaramente non valida vengono scartati prima
  delle chiamate Resend.
- Vengono scartati anche placeholder noti:
  - `example.com`
  - `example.org`
  - `example.net`
  - `prova@prova.com`
- Se Resend risponde che un contatto ha email non valida, viene contato come
  `saltato`, non come errore dell'intero scaglione.
- Gli errori veri (permessi, rate limit, segment non valido, ecc.) vengono
  contati ma non bloccano gli scaglioni successivi.
- Il pannello mostra:
  - sincronizzati
  - email saltate
  - legacy migrati
  - errori reali

## Nota importante

Questo NON può sapere matematicamente se una casella esiste davvero senza
fare una verifica esterna della mailbox. Quindi:
- email palesemente invalide -> saltate;
- email rifiutate da Resend -> saltate;
- email sintatticamente valide ma inesistenti -> potrebbero entrare nel
  Segment e poi risultare bounce/suppressed in fase di invio.

La V42 (Test Broadcast reale), la V41 (sync a scaglioni) e tutte le funzioni
precedenti restano incluse.
