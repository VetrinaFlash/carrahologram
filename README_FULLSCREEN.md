# CarraHologram — versione a schermata unica

Home senza scroll, con locandina originale intera: verticale su schermi verticali e orizzontale sugli altri. I margini necessari ad altri rapporti di schermo sono riempiti da uno sfondo ambientale. Nessun rifacimento del volto o delle scritte.

Controlli: informazioni, audio su richiesta, sei lingue e biglietti. Informazioni e iscrizione si aprono in dialoghi. Animazioni leggere e rispetto di `prefers-reduced-motion`.

## Aggiornare il sito esistente

Copia nella **radice del repository `carrahologram`, branch `new`**, i file contenuti nella cartella `sito` del pacchetto. Non caricare la cartella esterna come sottocartella del sito e non eliminare file preesistenti.

I file modificati/aggiunti sono:
- `index.html`, `concert.css`, `concert.js`, `site-config.js`
- `poster-desktop.jpg`, `poster-mobile.jpg`, `vivaticket.png`
- questo documento

Il pacchetto include anche `rumore.mp4`, `subscribers.html` e le funzioni API esistenti per avere i componenti del sito nello stesso archivio; questi file non sono stati modificati.

Su Cloudflare Pages mantieni le impostazioni del progetto e i binding esistenti (`VISITOR_COUNT`, `RESEND_API_KEY`). Se `new` è un branch di anteprima, il caricamento aggiorna l'anteprima: la pubblicazione sul dominio dipende dal branch di produzione configurato nel progetto.

## Biglietti

Non è stato fornito il link della pagina evento Vivaticket. Il pulsante **Biglietti** apre quindi la finestra di iscrizione, collegata a `/api/subscribe` come nel sito precedente. Non rimanda a una pagina evento inventata.

Quando il link è disponibile, inseriscilo in `site-config.js`, nel campo `ticketUrl`. Nella finestra apparirà il collegamento di acquisto. Sono accettati URL HTTPS su `vivaticket.com` e relativi sottodomini.

## Verifiche svolte

Browser Chromium: 1440×900, 390×844, 320×568, 768×1024, 844×390, 2560×1080. Verificati assenza di overflow, immagini, finestre, contenimento del focus, Escape, cambio delle sei lingue e riduzione del movimento. Modulo verificato con risposte simulate di successo ed errore, senza creare iscritti né inviare email. Le credenziali backend non sono state usate nei test.

Per l'anteprima locale: `python3 -m http.server 8000`, poi apri `http://localhost:8000`. Le funzioni Cloudflare non vengono eseguite da questo server statico.
