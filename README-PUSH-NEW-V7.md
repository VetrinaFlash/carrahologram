# BRANCH new — V7 FAST LOAD

Questi sono i 2 file da pushare:

- `site-config.js` — sostituire
- `launch-page-v7.css` — aggiungere

## Perché V6 sembrava più lenta

V6 nascondeva completamente locandina + canvas finché non era stato caricato
`rtl-background-*.png` e completata la pulizia della scritta
`Official Radio Partner`.

Quindi il contenuto era corretto, ma il first paint sembrava più lento.

## Cosa fa V7

- mostra la locandina subito;
- avvia immediatamente il preload del background RTL corretto;
- maschera soltanto la piccola zona della vecchia scritta per pochi millisecondi;
- appena il canvas pulito è pronto, fa uno swap rapidissimo;
- `Official Radio Partner` continua a non essere visibile;
- non aspetta più il background RTL per mostrare tutta la locandina;
- layout V5/V6, menu, newsletter mobile e posizionamento RTL restano invariati.

In pratica: stessa resa finale, ma caricamento percepito molto più rapido.
