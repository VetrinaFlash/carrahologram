BRANCH: newcount
VERSIONE V22 — optical alignment

Sostituisci:
- countdown-screen.css

Aggiungi:
- logo-rail-desktop-top.png
- logo-rail-desktop-bottom.png
- logo-rail-mobile-top.png
- logo-rail-mobile-bottom.png

V22 cambia strategia: i loghi non sono più posizionati singolarmente tramite box CSS.
Sono precomposti su rail trasparenti usando il contenuto reale dei PNG, quindi:
- desktop/tablet: Vivaticket + RTL hanno lo stesso centro ottico in alto;
- desktop/tablet: Laserman + Atlantico hanno lo stesso centro ottico in basso;
- mobile: Vivaticket + Laserman + Atlantico hanno lo stesso centro ottico in basso;
- mobile: RTL resta centrato sopra il titolo;
- mobile: aggiunta banda nera trasparente mirata sotto la CTA per leggere bene
  "IL 14 OTTOBRE ENTRI PER PRIMO".
