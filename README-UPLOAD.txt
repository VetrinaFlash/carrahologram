NEWCOUNT — CONSENSO EMAIL COMPLETO (V34)

Carica questi file nel branch newcount mantenendo gli stessi percorsi:

ROOT:
- site-config.js                -> SOSTITUISCE quello esistente
- countdown-screen.css         -> mantiene la versione grafica V33 attuale
- gate-cta-mobile-hq-v33.png   -> mantiene la CTA mobile attuale
- privacy.html                 -> NUOVO

FUNCTIONS:
- functions/api/_middleware.js -> NUOVO

NON serve modificare functions/api/subscribe.js.
Il middleware intercetta /api/subscribe e rifiuta lato server ogni iscrizione senza consenso.

COSA FA:
- checkbox obbligatorio e non preselezionato su tutti i form data-subscribe
- countdown: checkbox integrato dentro il pill del form per non spostare il layout
- sito dopo countdown: checkbox aggiunto in modo discreto ai form email
- link Privacy accanto al consenso
- consenso verificato anche lato server
- prova del consenso salvata nel KV VISITOR_COUNT con chiave subscriber_consent_<email>
- nessun nuovo secret/binding Cloudflare richiesto
- Resend continua a funzionare tramite subscribe.js come prima

IMPORTANTE LEGALE:
privacy.html usa come identificazione pubblica il gestore del sito/evento e l'indirizzo newsletter@raffaellacarraofficial.com.
Se il titolare legale è una società/persona specifica, sostituisci quella riga con la denominazione legale completa prima della pubblicazione definitiva.
