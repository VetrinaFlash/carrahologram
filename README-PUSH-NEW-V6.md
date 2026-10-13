# BRANCH new — V6

File:
- `site-config.js` — sostituire
- `launch-page-v6.css` — aggiungere

## Fix
La scritta `OFFICIAL RADIO PARTNER` non deve più comparire nemmeno per un istante.

Il motivo era questo:
1. il poster originale contiene quella dicitura;
2. `concert.js` disegna prima il poster completo nel canvas;
3. solo quando `rtl-background-*` è caricato viene ripulita l'area RTL;
4. quindi per qualche frame la scritta era visibile.

V6 nasconde il poster/canvas grezzo e rende visibile il canvas solo DOPO
che la zona RTL è stata ripulita e il logo è stato riposizionato.

Inoltre qualsiasi eventuale `.radio-partner span` viene forzato a `display:none`.
