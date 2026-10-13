# NEWCOUNT — MIRROR ESATTO DEL BRANCH `new` V36

Questo pacchetto serve per fare in modo che, quando il countdown scade,
il sito visibile sul branch `newcount` sia uguale alla versione che stai vedendo
adesso sul branch `new`.

## DA PUSHARE SU `newcount`
Sostituisci SOLO:
- `site-config.js`

## NON TOCCARE
Lascia invariati:
- `index.html`
- `concert.js`
- `concert.css`
- `countdown-screen.css`
- asset e immagini del countdown

La logica del countdown resta quindi quella di `newcount`; alla scadenza,
quando il gate viene nascosto, il sito sottostante userà lo stesso
`site-config.js` della V36 di `new`.

SHA256 site-config.js:
9f0b079d64c94b8b69e0aee7bf4240afdf4316a33627fc81ab8df9aec54ad45d

Controlli:
- JS syntax: OK
- Countdown target presente: OK
- Logica gate/newcount presente: OK
- V35 layout mail presente: OK
- V36 Atlantico mobile presente: OK
- Vivaticket corretto: OK
