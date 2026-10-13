# BRANCH new — V14 FULLSCREEN MOBILE

Da pushare:
- `site-config.js` -> sostituire

Fix:
- ripristinata la resa mobile full-screen originale;
- su iPhone la locandina torna a riempire tutto il viewport;
- durante il caricamento si vede subito il poster;
- appena il canvas finale è pronto, il poster viene nascosto;
- resta il canvas che estende solo i bordi della scenografia fino ai bordi schermo;
- aggiunto supporto esplicito `100dvh` per Safari/iPhone.

Restano invariati:
- layout desktop V13;
- mail mobile in basso;
- privacy integrata;
- checkbox sottile;
- menu rosa;
- rimozione "Scarica la locandina".
