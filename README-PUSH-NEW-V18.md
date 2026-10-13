# BRANCH new — V18 MOBILE TRUE COVER

Da pushare:
- `site-config.js` -> sostituire

Questa volta il fix non è solo CSS.

## Perché V16/V17 potevano sembrare uguali
Il canvas calcolava la scala con `Math.min(width, height)`.
Su alcuni iPhone era l'altezza disponibile a limitare la locandina:
allargare il contenitore a 108% o 120% non aumentava realmente il poster.

## V18
- cambia direttamente il renderer mobile;
- usa un vero `cover` uniforme;
- la locandina riempie realmente tutta la larghezza disponibile;
- nessuno stretch orizzontale;
- crop simmetrico solo dove necessario;
- il poster visibile durante il caricamento usa lo stesso `object-fit: cover`;
- fascia newsletter e gestione dei tre partner restano quelle della V15;
- desktop invariato.

Questo deve produrre un cambiamento visibile anche sugli iPhone dove V17
sembrava identica.
