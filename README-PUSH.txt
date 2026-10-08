BRANCH: newcount (quello che stai chiamando "New Countdown")

File da mettere nella ROOT del branch:
1) countdown-screen.css  -> sostituisce quello esistente
2) countdown-lettering.jpg -> nuovo file, e' ESATTAMENTE l'immagine allegata in chat

Non serve modificare index.html: la vecchia scritta HTML resta nel DOM per accessibilita/SEO,
ma il CSS la nasconde visivamente e mostra l'immagine al suo posto.

Effetto aggiunto:
- 3 punti luminosi sovrapposti ai flare dell'immagine
- pulse morbido + raggi a stella
- responsive desktop/mobile
- prefers-reduced-motion rispettato

Comandi indicativi:
  git checkout newcount
  git add countdown-screen.css countdown-lettering.jpg
  git commit -m "Use countdown lettering image with pulsing glints"
  git push origin newcount
