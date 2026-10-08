# CarraHologram — versione a schermata unica

Home senza scroll composta da livelli HTML indipendenti: sfondo a copertura totale, insegna, figura originale scontornata, firma, titolo, sottotitolo, data e marchi dei partner. Le scritte principali provengono dai ritagli della locandina; il viso non è stato rigenerato. La locandina intera è disponibile solo per il download e l'anteprima social.

La composizione si adatta allo schermo. Entrata progressiva, fasci luminosi leggeri e parallax discreto sui livelli con mouse; movimento disattivato con `prefers-reduced-motion`. Menu completo con Home, concerto, biglietti, merchandising e iscrizione. Campo email direttamente in home, sotto ai biglietti; affiancato negli schermi orizzontali bassi; ulteriori accessi dal menu e dalla finestra merchandising. Le iscrizioni usano tutte lo stesso endpoint /api/subscribe e condividono conferma e stato. Merchandising in arrivo con avviso al lancio. Sei lingue e audio solo su richiesta.

## Aggiornare il sito esistente

Copia nella **radice del repository `carrahologram`, branch `new`**, i file contenuti nella cartella `sito` del pacchetto. Non caricare la cartella esterna come sottocartella del sito e non eliminare file preesistenti.

I file modificati/aggiunti sono:
- `index.html`, `concert.css`, `concert.js`, `site-config.js`
- `poster-desktop.jpg`, `poster-mobile.jpg`, `vivaticket.png`
- `stage-background.jpg` e tutte le immagini `scene-*.png`
- questo documento

Il pacchetto include anche `rumore.mp4`, `subscribers.html` e le funzioni API esistenti per avere i componenti del sito nello stesso archivio; questi file non sono stati modificati.

Su Cloudflare Pages mantieni le impostazioni del progetto e i binding esistenti (`VISITOR_COUNT`, `RESEND_API_KEY`). Se `new` è un branch di anteprima, il caricamento aggiorna l'anteprima: la pubblicazione sul dominio dipende dal branch di produzione configurato nel progetto.

## Biglietti

Non è stato fornito il link della pagina evento Vivaticket. Il pulsante **Biglietti** apre quindi la finestra di iscrizione, collegata a `/api/subscribe` come nel sito precedente. Non rimanda a una pagina evento inventata.

Quando il link è disponibile, inseriscilo in `site-config.js`, nel campo `ticketUrl`. Nella finestra apparirà il collegamento di acquisto. Sono accettati URL HTTPS su `vivaticket.com` e relativi sottodomini.

## Verifiche svolte

Browser Chromium: 1440×900, 390×844, 320×568, 768×1024, 844×390, 2560×1080. Verificati almeno otto elementi immagine distinti nella scena, assenza della locandina intera nella home, assenza di overflow, immagini, finestre, contenimento del focus, Escape, cambio delle sei lingue e riduzione del movimento. Verificati anche menu → merchandising → iscrizione, iscrizione dalla home e sincronizzazione della conferma fra i moduli. Modulo verificato con risposte simulate di successo ed errore, senza creare iscritti né inviare email. Le credenziali backend non sono state usate nei test.

Per l'anteprima locale: `python3 -m http.server 8000`, poi apri `http://localhost:8000`. Le funzioni Cloudflare non vengono eseguite da questo server statico.

## Revisione annotazioni dell’8 ottobre

La disposizione segue il riferimento fornito: insegna dietro la figura, titolo sui fianchi, sottotitolo e data, Vivaticket sotto la data e RTL più in basso. Rimangono menu, merchandising e iscrizione email visibile. Eliminata la scritta “Official radio partner”.

La figura del sito ora è continua (`scene-raffaella-continuous.png`, 534×1107): il corpo intero già presente nel progetto è stato allineato al ritaglio originale della locandina verticale, conservando volto, capelli e parte alta originali. Non ci sono più fasce trasparenti in corrispondenza del titolo o della data. Il corpo usato per le parti prima nascoste proviene dall’asset completo preesistente, non da una nuova rigenerazione. La rigenerazione richiesta è stata bloccata dal servizio e non è stata eseguita. Il dettaglio fotografico del volto resta limitato dal master originale.

Nei banner resta il volto della locandina verticale con il contorno corretto. Il 120×600 ha Raffaella/Carrà su due righe; il 160×600 conserva il titolo approvato. I master 2× sono file di composizione, non una nuova fotografia a maggiore dettaglio.
