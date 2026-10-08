BRANCH: new

Obiettivo:
- lasciare RAFFAELLA CARRÀ invariata
- ingrandire solo THE SHOW MUST GO ON.
- ingrandire solo OFFICIAL HOLOGRAM CONCERT
- riutilizzare gli asset già presenti nel branch:
  scene-title.png (1350x94)
  scene-subtitle.png (884x37)

Metodo consigliato:
1. checkout del branch new
2. applica carrahologram-new-showcopy.patch con:
   git apply carrahologram-new-showcopy.patch
3. verifica desktop e mobile
4. commit e push

In alternativa, copia il contenuto di show-copy-enlarge.css in fondo a sparkles-elegant.css.

Non servono nuove immagini e non viene toccata la scritta RAFFAELLA CARRÀ.
