# Raffaella Carrà — locandina originale a schermo

La home usa il master orizzontale originale poster-desktop.jpg sugli schermi orizzontali e il JPG 25220, salvato come poster-exact.jpg, sugli schermi verticali. Il soggetto, le scritte e i loghi mantengono le proporzioni originali. Un canvas adatta esclusivamente i 20 pixel esterni della scenografia fino ai bordi dello schermo, eliminando gli stacchi dello sfondo precedente. Nessuna rigenerazione del volto o dei capelli. Su mobile il pulsante biglietti è sotto la data e il campo email resta sul fondo; sui desktop i comandi sono sotto la data; sugli schermi orizzontali bassi sono sulla sinistra. Nessuno scroll della pagina.

Restano menu, informazioni, merchandising in arrivo, iscrizione email, biglietti, musica con tentativo di avvio automatico e sei lingue. Le animazioni leggere agiscono sullo sfondo e sui controlli, non deformano la locandina; supportata la preferenza di movimento ridotto.

La dicitura “Official radio partner” è rimossa nella resa web e il logo originale RTL è spostato poco più in basso. Solo le piccole aree di sfondo dietro dicitura e logo usano un ritocco generato; volto, capelli e titoli restano quelli originali. Biglietti e iscrizione sono leggermente più larghi. Il player precarica rumore.mp3 e tenta subito la riproduzione; se il browser blocca l’autoplay, riprova al primo clic/tocco o tasto. Il comando di pausa resta rispettato anche dopo altre interazioni.

## Installazione
Copia il contenuto dello ZIP nella radice del repository carrahologram, branch new, sovrascrivendo i file corrispondenti. Nel pacchetto completo, usa il contenuto della cartella sito. Mantieni i binding Cloudflare esistenti VISITOR_COUNT e RESEND_API_KEY. Il sito non è stato pubblicato automaticamente: l’integrazione GitHub ha rifiutato le scritture.

## Biglietti e iscrizioni
Il link evento Vivaticket non è stato fornito. Il pulsante apre la finestra per ricevere aggiornamenti. Per abilitare l’acquisto inserisci l’URL HTTPS dell’evento Vivaticket nel campo ticketUrl di site-config.js. I moduli email usano /api/subscribe. I prodotti del merchandising non sono ancora configurati: rimane l’avviso al lancio.

## Verifica
Il JPG poster-exact.jpg conserva i byte originali. Verificati in Chromium otto formati: 1440×900, 390×844, 320×568, 768×1024, 844×390, 2560×1080, 500×648 e 900×900. Verificati anche ridimensionamento senza ricaricare la pagina, riempimento dello sfondo, proporzioni originali e assenza di scroll. Verificati menu, merchandising, finestre, focus, Escape, sei lingue, movimento ridotto e moduli con risposte simulate. Nessun invio reale di email nei test.
