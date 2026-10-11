# V42 — TEST BROADCAST REALE

Aggiunge nel pannello `subscribers.html` il pulsante:

`TEST BROADCAST REALE +3 MIN`

## Cosa verifica davvero

Il pulsante NON usa il normale invio singolo `/emails`.

Fa invece questo flusso end-to-end:

1. prende la mail inserita nel campo Test;
2. crea/riusa un Segment Resend dedicato solo a quella specifica email;
3. aggiunge quel contatto al Segment;
4. crea un vero Broadcast Resend;
5. aggiunge automaticamente il link unsubscribe se manca;
6. imposta `send: true`;
7. programma il Broadcast a circa +3 minuti con `scheduled_at`;
8. mostra l'ID del Broadcast e l'ora prevista.

Se la mail arriva, hai verificato realmente:

`Contact → Segment → Broadcast → Scheduling → Queue → Delivery`

Il Broadcast normale continua a funzionare come in V41.
La sync legacy continua a essere a scaglioni da 5 contatti per Worker invocation.
