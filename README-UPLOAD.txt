NEWCOUNT — FIX CONSENSO V35

QUESTO PACCHETTO CORREGGE IL BLOCCO/ERRORE DELLA V34.

CAUSA:
La V34 osservava tutto il body con MutationObserver e, nello stesso callback,
riscriveva textContent. Quella riscrittura generava nuove mutazioni e poteva
creare un ciclo continuo, bloccando il caricamento della pagina.

CARICA/SOSTITUISCI NEL BRANCH newcount:
1) site-config.js
2) functions/api/_middleware.js
3) functions/api/consent.js
4) privacy.html
5) countdown-screen.css
6) gate-cta-mobile-hq-v33.png

NON TOCCARE functions/api/subscribe.js:
rimane il tuo endpoint originale che salva la mail e invia la conferma con Resend.

FLUSSO:
- il checkbox è obbligatorio su tutti i form email;
- prima di /api/subscribe viene chiamato /api/consent;
- /api/consent salva nel KV VISITOR_COUNT la prova del consenso;
- solo se la prova è stata salvata parte l'iscrizione originale;
- nessun MutationObserver sul body;
- il middleware V34 viene neutralizzato con un semplice context.next().

NOTA PRIVACY:
prima della pubblicazione definitiva inserisci nell'informativa la ragione sociale
esatta del titolare del trattamento se diversa dalla denominazione del progetto.
