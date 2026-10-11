# DMARC + RESEND — PASSAGGI ESATTI

## 1. Crea l'indirizzo per i report DMARC

Sul provider email che gestisce le caselle di `raffaellacarraofficial.com`
(Namecheap Private Email, se è ancora quello in uso), crea:

`dmarc@raffaellacarraofficial.com`

Va bene anche un alias che inoltra a una casella che controllate.

Non attivare Cloudflare Email Routing se gli MX del dominio sono gestiti
dal provider email esistente.

## 2. Aggiungi DMARC su Cloudflare DNS

Cloudflare → dominio → DNS → Records → Add record

- Type: `TXT`
- Name: `_dmarc`
- Content:
  `v=DMARC1; p=none; rua=mailto:dmarc@raffaellacarraofficial.com; adkim=r; aspf=r`
- TTL: Auto

Non aggiungere `fmt=r`.

`p=none` significa monitoraggio: non blocca e non mette in quarantena le email.

## 3. Non creare un secondo SPF root

Se sul root `@` hai già lo SPF del provider email, per esempio:

`v=spf1 include:spf.privateemail.com ~all`

non creare un secondo record SPF root.

Resend normalmente autentica il proprio Return-Path su un sottodominio
dedicato (spesso `send.raffaellacarraofficial.com`) con i record mostrati
nel pannello Resend.

Copia sempre i record Resend esatti dal loro pannello; non inventare
DKIM/SPF/MX.

## 4. Verifica Resend

Nel pannello Resend → Domains → `raffaellacarraofficial.com`:

- status: `Verified`
- SPF: verificato
- DKIM: verificato
- Return-Path: verificato

Nel JSON che hai già ottenuto dall'API, il dominio risultava `verified`
e il sending risultava `enabled`, quindi la configurazione Resend di base
è già operativa.

## 5. Test prima della mailing

Invia un test reale con lo stesso mittente:

`Raffaella Carrà Official <newsletter@raffaellacarraofficial.com>`

Poi su Gmail:

- apri la mail
- menu a tre puntini
- Mostra originale
- controlla:
  - SPF: PASS
  - DKIM: PASS
  - DMARC: PASS

Fai anche un test Mail-Tester. Obiettivo pratico: 9/10 o meglio, ma non è una
garanzia matematica di inbox.

## 6. Dopo il lancio

Lascia `p=none` mentre raccogli e controlli i report DMARC.
Passa a `p=quarantine` e poi eventualmente `p=reject` solo quando sei sicuro
che tutti i flussi legittimi (Namecheap + Resend + eventuali altri servizi)
passino SPF/DKIM e siano allineati.
