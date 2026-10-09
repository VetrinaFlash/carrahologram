BRANCH: newcount
REPOSITORY: VetrinaFlash/carrahologram

VERSIONE HQ FULL-SCREEN V2

Sostituisci nella ROOT di newcount:
- countdown-screen.css
- site-config.js

Aggiungi nella ROOT di newcount:
- gate-bg-desktop-hq.png
- gate-bg-mobile-hq.png
- gate-title-hq.png
- gate-rumore-desktop-hq.png
- gate-rumore-mobile-hq.png
- gate-cta-hq.png

Aggiornamenti di questa V2:
- rimosso lo sfondo nero visibile dalle grafiche del titolo, di "Pronto a fare rumore" e della CTA;
- le PNG lettering ora hanno trasparenza reale (alpha), quindi si integrano correttamente sul fondale;
- composizione abbassata e resa piu centrale sia su mobile sia su desktop;
- fondale sempre full-bleed 100vw x 100dvh, senza bande laterali.

Le PNG statiche derivano DIRETTAMENTE dagli elementi originali allegati in chat:
nessuna ricostruzione AI e nessuna compressione JPEG/WebP. Per titolo/claim/CTA e' stato fatto solo un crop/lavorazione lossless per rimuovere il nero di sfondo mantenendo la massima qualita'. I due fondali sono copiati alla risoluzione originale completa.

Layout:
- desktop usa il fondale orizzontale originale;
- mobile usa il fondale verticale originale;
- titolo e lettering occupano quasi tutta la larghezza disponibile;
- countdown e form sono piu larghi e sfruttano la viewport;
- composizione in una singola schermata, con adattamento per telefoni stretti e landscape bassi;
- musica: tentativo subito; se il browser blocca autoplay, parte al primo pointer/touch/click/tasto anche sul gate.

Non serve modificare index.html o concert.js.
