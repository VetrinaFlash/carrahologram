# Raffaella Carrà — locandina originale a schermo

La home usa il master orizzontale originale poster-desktop.jpg su desktop e schermi orizzontali; sui telefoni verticali usa il JPG 25220 fornito dall’utente, salvato come poster-exact.jpg senza modifica dei byte. La locandina è intera, proporzionata e senza ritagli, filtri o rigenerazione. Su desktop il master orizzontale è ingrandito fino ai limiti dello schermo senza tagli; lo sfondo scenico riempie gli spazi residui. Su mobile la locandina verticale è intera. Sui telefoni menu e comandi occupano spazio sopra e sotto; sui desktop i comandi sono sotto la data; sugli schermi orizzontali bassi sono sulla sinistra. Nessuno scroll della pagina.

Restano menu, informazioni, merchandising in arrivo, iscrizione email, biglietti, musica su richiesta e sei lingue. Le animazioni leggere agiscono sullo sfondo e sui controlli, non deformano la locandina; supportata la preferenza di movimento ridotto.

## Installazione
Copia il contenuto dello ZIP nella radice del repository carrahologram, branch new, sovrascrivendo i file corrispondenti. Nel pacchetto completo, usa il contenuto della cartella sito. Mantieni i binding Cloudflare esistenti VISITOR_COUNT e RESEND_API_KEY. Il sito non è stato pubblicato automaticamente: l’integrazione GitHub ha rifiutato le scritture.

## Biglietti e iscrizioni
Il link evento Vivaticket non è stato fornito. Il pulsante apre la finestra per ricevere aggiornamenti. Per abilitare l’acquisto inserisci l’URL HTTPS dell’evento Vivaticket nel campo ticketUrl di site-config.js. I moduli email usano /api/subscribe. I prodotti del merchandising non sono ancora configurati: rimane l’avviso al lancio.

## Verifica
Confronto binario fra il JPG originale e poster-exact.jpg: identici. Verificati in Chromium sei formati: 1440×900, 390×844, 320×568, 768×1024, 844×390, 2560×1080. Immagine intera con proporzioni originali; comandi esterni alla locandina su mobile verticale e sovrapposti nelle aree libere su desktop; nessuno scroll. Verificati menu, merchandising, finestre, focus, Escape, sei lingue, movimento ridotto e moduli con risposte simulate. Nessun invio reale di email nei test.
