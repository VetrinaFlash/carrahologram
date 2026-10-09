BRANCH: newcount
REPOSITORY: VetrinaFlash/carrahologram

VERSIONE HQ FULL-SCREEN

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

Le PNG statiche derivano DIRETTAMENTE dagli elementi originali allegati in chat:
nessuna ricostruzione AI e nessuna compressione JPEG/WebP. Per titolo/claim/CTA e' stato fatto solo un crop lossless dei margini neri, senza ridimensionare i pixel originali. I due fondali sono copiati alla risoluzione originale completa.

Layout:
- fondale full-bleed 100vw x 100dvh, cover, senza bande laterali;
- desktop usa il fondale orizzontale originale;
- mobile usa il fondale verticale originale;
- titolo e lettering occupano quasi tutta la larghezza disponibile;
- countdown e form sono piu larghi e sfruttano la viewport;
- composizione in una singola schermata, con adattamento per telefoni stretti e landscape bassi;
- musica: tentativo subito; se il browser blocca autoplay, parte al primo pointer/touch/click/tasto anche sul gate.

Non serve modificare index.html o concert.js.
