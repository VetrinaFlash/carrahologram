# BRANCH NEW — V2 PRONTA DA PUSHARE

Questa versione lavora sul sito SENZA countdown del branch `new`.

## Cosa cambia

- La sezione `IL CONCERTO` contiene la nuova descrizione completa:
  - `RAFFA È TORNATA.`
  - testo completo fornito per il concerto
  - chiusura `28 DICEMBRE 2026 · ATLANTICO ROMA.`
- Tutti i CTA biglietti portano direttamente alla pagina ufficiale:
  https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642
- Nuovo stile coerente per:
  - navigazione
  - pannelli/modali
  - bottoni
  - form
  - link azione
- Layout desktop/notebook migliorato, con regole specifiche per viewport tipo MacBook.
- Dock biglietti + iscrizione agganciato alla geometria reale della locandina invece che a una posizione fissa del viewport.
- Logo RTL rialzato nel rendering desktop per allinearlo meglio alla fila Laserman Industries / Atlantico Roma.
- Mobile preservato, con adattamenti solo per il pannello lungo del concerto.
- Nessun countdown viene aggiunto al branch `new`.

## File nuovi / modificati frontend

- `site-config.js` -> SOSTITUIRE
- `launch-page-v2.css` -> AGGIUNGERE

`site-config.js` carica automaticamente `launch-page-v2.css`, quindi non serve modificare `index.html`.

## Pacchetto completo

La cartella contiene anche i file già preparati in precedenza per:
- consenso newsletter
- privacy
- subscribers dashboard
- Cloudflare Functions / Resend

Puoi quindi usare questo ZIP come unico pacchetto da portare sul branch `new`.

## IMPORTANTE PER NEWCOUNT

Queste modifiche frontend sono state costruite per poter essere riutilizzate anche su `newcount`.
Quando dovrai allineare `newcount`, porta almeno:
- `site-config.js`
- `launch-page-v2.css`

Il countdown di `newcount` rimane gestito dai suoi file `index.html`,
`concert.js` e `countdown-screen.css`; allo scadere apparirà sotto lo stesso sito V2.
