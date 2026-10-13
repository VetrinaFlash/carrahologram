# BRANCH `new` — V3 LAYOUT FIX

Questi sono i due file da pushare sul branch `new`.

## SOSTITUIRE
- `site-config.js`

## AGGIUNGERE
- `launch-page-v3.css`

`site-config.js` carica automaticamente il nuovo CSS V3, quindi non serve
modificare `index.html`.

## FIX V3

- form email home compatto come quello del countdown;
- Vivaticket ed email allineati sulla stessa riga ottica desktop;
- consenso molto più compatto e non aumenta l'altezza del box desktop;
- dock desktop rialzato per non invadere la fascia sponsor;
- regole specifiche notebook / MacBook;
- su mobile Vivaticket + email diventano un blocco unico subito sotto la data;
- il form non rimane più incollato al bordo inferiore sopra Atlantico/Laserman;
- RTL desktop riallineato alla fila sponsor;
- RTL mobile spostato nella fascia dei partner invece di restare troppo alto;
- descrizione `RAFFA È TORNATA.` e link Vivaticket ufficiale restano invariati.

Link ticket:
https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642

## NEWCOUNT

Quando il layout viene approvato su `new`, gli stessi due file V3 andranno
portati su `newcount`. Il countdown di `newcount` resterà intatto; alla sua
scadenza apparirà questo stesso layout.
