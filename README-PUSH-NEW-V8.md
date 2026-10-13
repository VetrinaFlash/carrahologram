# BRANCH new — V8 FAST INLINE + PRIVACY INTEGRATA

## Da pushare
### OBBLIGATORIO
- `site-config.js` -> sostituire

### Solo sorgente di riferimento
- `launch-page-v8.css`

La V8 NON carica più `launch-page-v8.css` via rete:
tutto il CSS launch è già incorporato dentro `site-config.js`.

Questo elimina la richiesta CSS aggiuntiva e soprattutto evita che gli stili
del dock/menu arrivino qualche istante dopo il primo render.

## Caricamento
- poster visibile immediatamente;
- il poster non viene più nascosto durante la preparazione RTL;
- il canvas pulito viene semplicemente sovrapposto quando pronto;
- niente transizione poster -> canvas;
- background RTL pulito pre-caricato immediatamente;
- nessun caricamento separato di launch-page.css.

## Checkbox privacy home
La checkbox è ora DENTRO lo stesso box email, come nel countdown:

    email                    | ISCRIVITI
    [ ] consenso... Privacy  | ISCRIVITI

Su mobile la mail resta in basso, separata dal pulsante Vivaticket,
come richiesto nelle V5/V7.

## Nota
I vecchi file `launch-page-v2.css` ... `launch-page-v7.css` possono restare
nel repository: V8 non li carica.
