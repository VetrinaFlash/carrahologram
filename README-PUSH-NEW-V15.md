# BRANCH new — V15 MOBILE FULLSCREEN + LOGHI VISIBILI

Da pushare:
- `site-config.js` -> sostituire

Fix mobile/iPhone:
- resta il canvas finale che riempie la scena fino ai bordi;
- non torna la resa "contain" della V8;
- la fascia bassa della locandina viene rialzata sopra la newsletter;
- Laserman Industries, RTL 102.5 e Atlantico tornano tutti visibili;
- la newsletter resta in basso;
- viene usato `100dvh` solo per la pagina/experience, non più per forzare
  poster-frame fino sotto la UI del browser.

Il centro della locandina continua a mantenere le proporzioni originali:
il renderer del sito estende soltanto i bordi esterni della scenografia.
