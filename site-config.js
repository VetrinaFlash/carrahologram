// V8 INLINE LAUNCH CSS — niente richiesta separata launch-page.css.
(() => {
  if (document.getElementById('launch-page-v9-style')) return;
  const style = document.createElement('style');
  style.id = 'launch-page-v9-style';
  style.textContent = `/* ========================================================================== */
/* RAFFAELLA CARRÀ — LAUNCH PAGE V8                                          */
/* Branch: new (senza countdown). Caricato da site-config.js.                 */
/* ========================================================================== */

:root{
  --launch-red:#ef2848;
  --launch-red-2:#ff3f67;
  --launch-gold:#e4c98f;
  --launch-panel:#070916;
  --launch-glass:rgba(8,11,29,.88);
}

/* ---------- Header / navigazione ---------- */
.desktop-navigation{gap:10px!important}
.desktop-navigation button{
  min-height:38px;
  padding:0 14px!important;
  border:1px solid transparent!important;
  border-radius:999px;
  background:rgba(7,10,27,.22)!important;
  color:rgba(255,255,255,.86)!important;
  backdrop-filter:blur(8px);
  transition:background .2s ease,border-color .2s ease,color .2s ease,transform .2s ease!important;
}
.desktop-navigation button:hover,
.desktop-navigation button:focus-visible{
  color:#fff!important;
  border-color:rgba(228,201,143,.52)!important;
  background:rgba(15,18,40,.78)!important;
  transform:translateY(-1px);
}

.quiet-button,.icon-button,.language-control select{
  border-color:rgba(255,255,255,.18)!important;
  background:rgba(5,8,24,.74)!important;
  box-shadow:0 8px 24px rgba(0,0,0,.18);
}

/* ---------- CTA / campi coerenti ---------- */
.ticket-button,
.email-row,
.detail-links>a,
.detail-links>button,
.menu-links button,
.close-button{
  border-color:rgba(255,255,255,.16)!important;
}

.ticket-label,
.primary-button,
.email-row button{
  background:linear-gradient(135deg,var(--launch-red),var(--launch-red-2))!important;
  color:#fff!important;
  border:1px solid rgba(255,255,255,.12)!important;
  box-shadow:0 8px 24px rgba(239,40,72,.22),0 0 0 1px rgba(255,255,255,.04) inset!important;
  transition:transform .2s ease,filter .2s ease,box-shadow .2s ease!important;
}
.primary-button:hover,
.email-row button:hover,
.ticket-button:hover .ticket-label{
  filter:brightness(1.08);
  box-shadow:0 10px 30px rgba(239,40,72,.34),0 0 0 1px rgba(255,255,255,.08) inset!important;
}
.primary-button:active,.email-row button:active{transform:translateY(1px)}

.email-row{
  background:linear-gradient(145deg,rgba(7,10,27,.95),rgba(4,6,18,.97))!important;
  box-shadow:0 8px 28px rgba(0,0,0,.20),0 0 0 1px rgba(255,255,255,.025) inset;
}
.email-row:focus-within{
  border-color:rgba(228,201,143,.72)!important;
  box-shadow:0 0 0 1px rgba(228,201,143,.18),0 8px 34px rgba(0,0,0,.26)!important;
}

/* ---------- Pannelli ---------- */
.panel{
  border-color:rgba(255,255,255,.15)!important;
  border-top-color:rgba(228,201,143,.62)!important;
  background:
    radial-gradient(circle at 18% 0%,rgba(239,40,72,.10),transparent 30%),
    linear-gradient(145deg,rgba(18,20,42,.985),rgba(5,7,19,.992))!important;
  box-shadow:0 28px 100px rgba(0,0,0,.76),0 0 0 1px rgba(255,255,255,.025) inset!important;
}
.panel::backdrop{background:rgba(2,3,17,.84)!important;backdrop-filter:blur(12px)!important}
.panel h2{color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.32)}
.eyebrow{color:var(--launch-gold)!important;font-weight:700}
.close-button{background:rgba(255,255,255,.055)!important}
.close-button:hover{background:rgba(255,255,255,.11)!important;border-color:rgba(228,201,143,.5)!important}

.menu-links{gap:7px!important}
.menu-links button{
  padding:14px 15px!important;
  border:1px solid rgba(255,255,255,.10)!important;
  border-radius:11px!important;
  background:rgba(255,255,255,.025)!important;
}
.menu-links button:hover{background:rgba(255,255,255,.07)!important;border-color:rgba(228,201,143,.36)!important;color:#fff!important}

/* ---------- IL CONCERTO ---------- */
#infoDialog.concert-info-panel{
  width:min(760px,calc(100% - 28px))!important;
  max-height:min(88dvh,900px)!important;
  padding:44px 42px 34px!important;
}
#infoDialog.concert-info-panel h2{
  margin:14px 0 14px!important;
  font-size:clamp(30px,4.2vw,46px)!important;
  letter-spacing:-.045em!important;
}
#infoDialog .panel-intro.concert-lead{
  color:#fff!important;
  font-size:clamp(15px,1.4vw,17px)!important;
  line-height:1.62!important;
  font-weight:650;
  margin-bottom:18px!important;
}
.concert-story{
  display:grid;
  gap:14px;
  margin:0 0 24px;
  color:rgba(239,241,249,.82);
  font-size:14px;
  line-height:1.72;
}
.concert-story p{margin:0}
.concert-story strong{color:#fff;font-weight:750}
.concert-story .concert-story-finale{
  margin-top:4px;
  padding:16px 17px;
  border:1px solid rgba(228,201,143,.24);
  border-radius:12px;
  background:linear-gradient(135deg,rgba(228,201,143,.075),rgba(239,40,72,.055));
  color:#fff;
  font-weight:700;
}
#infoDialog .event-details{
  margin:24px 0 16px!important;
  padding:16px 0!important;
}
#infoDialog .detail-links{
  grid-template-columns:repeat(3,minmax(0,1fr));
  gap:8px!important;
  margin-bottom:14px!important;
}
#infoDialog .detail-links>a,
#infoDialog .detail-links>button{
  display:flex!important;
  align-items:center;
  justify-content:center;
  min-height:44px;
  padding:10px 12px!important;
  border:1px solid rgba(255,255,255,.13)!important;
  border-radius:10px;
  background:rgba(255,255,255,.035)!important;
  color:#fff!important;
  text-align:center!important;
  font-weight:650;
  line-height:1.25;
}
#infoDialog .detail-links>a:hover,
#infoDialog .detail-links>button:hover{
  border-color:rgba(228,201,143,.48)!important;
  background:rgba(228,201,143,.08)!important;
}

/* ---------- Landscape desktop: dock agganciato alla locandina, non al viewport ---------- */
@media (min-aspect-ratio:1001/1000){
  .action-dock{
    top:var(--launch-dock-y,74.5%)!important;
    bottom:auto!important;
    left:50%!important;
    right:auto!important;
    transform:translateX(-50%)!important;
    width:min(1080px,82vw)!important;
    gap:18px!important;
    align-items:flex-end!important;
  }
  .ticket-button{
    width:calc((100% - 18px)/2)!important;
    height:54px!important;
    border-radius:13px!important;
    padding:5px 7px 5px 18px!important;
  }
  .ticket-button>img{width:clamp(118px,10vw,145px)!important;max-height:26px!important}
  .ticket-label{height:100%!important;border-radius:8px!important;font-size:12px!important;letter-spacing:.075em!important}
  .home-signup{width:calc((100% - 18px)/2)!important}
  .home-signup label{font-size:10px!important;margin-bottom:5px!important;letter-spacing:.095em!important}
  .home-signup .email-row{height:54px!important;border-radius:13px!important}
  .home-signup .email-row button{min-height:42px!important;height:100%!important;padding:0 24px!important;font-size:11px!important}
  .home-signup .email-row input{font-size:14px!important;padding:0 13px!important}
}

/* MacBook / notebook: meno ingombro senza comprimere la locandina. */
@media (min-width:1100px) and (max-height:950px) and (min-aspect-ratio:1001/1000){
  .controls{height:56px!important;padding:0 28px!important}
  .header-navigation{gap:14px!important}
  .desktop-navigation button{min-height:34px!important;padding:0 11px!important;font-size:9.5px!important}
  .quiet-button,.icon-button,.language-control select{height:38px!important;min-height:38px!important}
  .action-dock{width:min(1000px,80vw)!important;gap:16px!important}
  .ticket-button{width:calc((100% - 16px)/2)!important;height:50px!important}
  .home-signup{width:calc((100% - 16px)/2)!important}
  .home-signup .email-row{height:50px!important}
  .home-signup .email-row button{min-height:38px!important;padding:0 21px!important}
  .home-signup label{font-size:9.4px!important;margin-bottom:4px!important}
}

@media (min-width:1100px) and (max-height:780px) and (min-aspect-ratio:1001/1000){
  .action-dock{width:min(900px,76vw)!important;gap:14px!important}
  .ticket-button{width:calc((100% - 14px)/2)!important;height:44px!important;padding-left:13px!important}
  .ticket-button>img{width:105px!important}
  .ticket-label{font-size:10px!important;padding:0 12px!important}
  .home-signup{width:calc((100% - 14px)/2)!important}
  .home-signup .email-row{height:44px!important;padding:4px 5px!important}
  .home-signup .email-row button{min-height:34px!important;font-size:10px!important;padding:0 16px!important}
  .home-signup .email-row input{font-size:13px!important;padding:0 9px!important}
  .home-signup label{font-size:8.5px!important;margin-bottom:3px!important}
}

/* ---------- Mobile ---------- */
@media(max-aspect-ratio:1/1){
  #infoDialog.concert-info-panel{padding:42px 22px 26px!important;max-height:calc(100dvh - 20px)!important}
  #infoDialog.concert-info-panel h2{font-size:31px!important}
  #infoDialog .detail-links{grid-template-columns:1fr!important}
  .concert-story{font-size:13px;line-height:1.65;gap:12px}
  .concert-story .concert-story-finale{padding:14px}
  .menu-links button{padding:13px 14px!important}
}

@media(max-width:430px){
  #infoDialog.concert-info-panel{width:calc(100% - 14px)!important;border-radius:15px!important}
}


/* ========================================================================== */
/* V3 — DOCK COMPATTO / ALLINEAMENTO VIVATICKET + EMAIL / MOBILE FIX          */
/* ========================================================================== */

/*
  Obiettivo:
  - ticket ed email sulla stessa riga ottica su desktop;
  - form home compatto come il countdown;
  - checkbox consenso non deve far crescere il box;
  - su mobile ticket + email diventano un unico gruppo sotto la data;
  - niente form appoggiato in fondo sopra Atlantico / Laserman.
*/

/* Base home signup: il consenso vive sotto il campo senza allargarne l'altezza. */
.home-signup,
.home-signup form{
  position:relative!important;
}

.home-signup > form > label[for="homeEmail"]{
  color:#efd7a5!important;
  font-weight:700!important;
  text-transform:uppercase!important;
  letter-spacing:.095em!important;
  text-shadow:0 1px 5px rgba(0,0,0,.95)!important;
}

.home-signup .carra-consent-row{
  color:rgba(255,255,255,.90)!important;
  text-shadow:0 1px 4px rgba(0,0,0,.95)!important;
}

.home-signup .carra-consent-row a{
  color:#fff!important;
  font-weight:800!important;
}

/* ---------- Desktop / notebook ---------- */
@media (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(980px,78vw)!important;
    gap:12px!important;
    align-items:center!important;
    z-index:6!important;
  }

  .ticket-button,
  .home-signup{
    width:calc((100% - 12px)/2)!important;
    flex:0 0 calc((100% - 12px)/2)!important;
  }

  .ticket-button{
    height:48px!important;
    padding:4px 6px 4px 16px!important;
    border-radius:12px!important;
    align-self:center!important;
  }

  .ticket-button>img{
    width:clamp(110px,9vw,136px)!important;
    max-height:24px!important;
  }

  .ticket-label{
    height:100%!important;
    min-width:0!important;
    border-radius:7px!important;
    padding:0 18px!important;
    font-size:11px!important;
    letter-spacing:.08em!important;
  }

  .home-signup{
    height:48px!important;
    align-self:center!important;
  }

  .home-signup form{
    height:48px!important;
  }

  .home-signup > form > label[for="homeEmail"]{
    position:absolute!important;
    left:9px!important;
    top:-14px!important;
    margin:0!important;
    font-size:8.1px!important;
    line-height:1!important;
    white-space:nowrap!important;
  }

  .home-signup .email-row{
    height:48px!important;
    min-height:48px!important;
    padding:4px 5px!important;
    border-radius:12px!important;
    gap:5px!important;
  }

  .home-signup .email-row input{
    height:100%!important;
    padding:0 11px!important;
    font-size:13px!important;
  }

  .home-signup .email-row button{
    min-height:38px!important;
    height:38px!important;
    padding:0 19px!important;
    border-radius:7px!important;
    font-size:10px!important;
    letter-spacing:.075em!important;
    flex:0 0 auto!important;
  }

  .home-signup .carra-consent-row{
    position:absolute!important;
    z-index:2!important;
    left:7px!important;
    top:calc(100% + 3px)!important;
    width:max-content!important;
    max-width:calc(100% - 10px)!important;
    margin:0!important;
    gap:4px!important;
    font-size:6.8px!important;
    line-height:1.05!important;
    white-space:nowrap!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]{
    flex-basis:10px!important;
    width:10px!important;
    height:10px!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]:checked::after{
    font-size:7px!important;
    line-height:10px!important;
  }
}

/* MacBook / notebook: ancora più compatto, senza scendere sui loghi sponsor. */
@media (min-width:1100px) and (max-height:900px) and (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(920px,76vw)!important;
    gap:10px!important;
  }

  .ticket-button,
  .home-signup{
    width:calc((100% - 10px)/2)!important;
    flex-basis:calc((100% - 10px)/2)!important;
  }

  .ticket-button,
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:44px!important;
    min-height:44px!important;
  }

  .ticket-button>img{width:108px!important}
  .ticket-label{font-size:10px!important;padding:0 14px!important}

  .home-signup > form > label[for="homeEmail"]{
    top:-12px!important;
    font-size:7.5px!important;
  }

  .home-signup .email-row button{
    min-height:34px!important;
    height:34px!important;
    padding:0 15px!important;
    font-size:9.5px!important;
  }

  .home-signup .email-row input{
    font-size:12.5px!important;
    padding:0 8px!important;
  }

  .home-signup .carra-consent-row{
    top:calc(100% + 2px)!important;
    font-size:6.2px!important;
  }
}

/* ---------- Mobile / portrait ---------- */
@media (max-aspect-ratio:1/1){
  /*
    concert.css usava display:contents e separava il ticket dal form:
    il ticket stava al centro mentre il form finiva sul bordo inferiore.
    V3 li riunisce in un unico blocco compatto sotto la data.
  */
  .action-dock{
    display:flex!important;
    position:fixed!important;
    z-index:7!important;
    top:var(--poster-ticket-y,63%)!important;
    bottom:auto!important;
    left:50%!important;
    right:auto!important;
    transform:translateX(-50%)!important;
    width:min(92vw,390px)!important;
    height:auto!important;
    padding:0!important;
    flex-direction:column!important;
    align-items:stretch!important;
    justify-content:flex-start!important;
    gap:6px!important;
  }

  .action-dock .ticket-button{
    position:relative!important;
    inset:auto!important;
    left:auto!important;
    top:auto!important;
    bottom:auto!important;
    transform:none!important;
    width:100%!important;
    min-width:0!important;
    height:45px!important;
    padding:4px 5px 4px 15px!important;
    border-radius:12px!important;
    flex:none!important;
  }

  .action-dock .ticket-button:hover{
    transform:translateY(-1px)!important;
  }

  .action-dock .ticket-button>img{
    width:112px!important;
    max-height:24px!important;
  }

  .action-dock .ticket-label{
    min-width:0!important;
    flex:1!important;
    padding:0 14px!important;
    border-radius:7px!important;
    font-size:10.5px!important;
    letter-spacing:.075em!important;
  }

  .action-dock .home-signup{
    position:relative!important;
    inset:auto!important;
    left:auto!important;
    top:auto!important;
    bottom:auto!important;
    transform:none!important;
    width:100%!important;
    height:auto!important;
  }

  .home-signup > form > label[for="homeEmail"]{
    margin:0 0 3px 4px!important;
    font-size:7.6px!important;
    line-height:1!important;
    text-align:left!important;
  }

  .home-signup .email-row{
    height:41px!important;
    min-height:41px!important;
    padding:3px 4px!important;
    gap:4px!important;
    border-radius:11px!important;
  }

  .home-signup .email-row input{
    height:100%!important;
    padding:0 9px!important;
    font-size:13px!important;
  }

  .home-signup .email-row button{
    min-height:33px!important;
    height:33px!important;
    padding:0 14px!important;
    border-radius:7px!important;
    font-size:9.5px!important;
    letter-spacing:.045em!important;
  }

  .home-signup .carra-consent-row{
    position:relative!important;
    inset:auto!important;
    width:100%!important;
    max-width:100%!important;
    margin:4px 2px 0!important;
    padding:0!important;
    gap:5px!important;
    font-size:6.8px!important;
    line-height:1.08!important;
    text-align:left!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]{
    flex:0 0 11px!important;
    width:11px!important;
    height:11px!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]:checked::after{
    font-size:8px!important;
    line-height:11px!important;
  }

  /* Lascia respirare il popup lungo del concerto sui telefoni. */
  #infoDialog.concert-info-panel{
    width:min(94vw,760px)!important;
  }
}

/* Telefoni stretti: nessuna uscita laterale, CTA sempre leggibile. */
@media (max-width:390px) and (max-aspect-ratio:1/1){
  .action-dock{
    width:94vw!important;
  }

  .action-dock .ticket-button{
    height:43px!important;
    padding-left:12px!important;
  }

  .action-dock .ticket-button>img{
    width:100px!important;
  }

  .action-dock .ticket-label{
    font-size:9.5px!important;
    padding:0 10px!important;
  }

  .home-signup .email-row{
    height:39px!important;
  }

  .home-signup .email-row button{
    min-height:31px!important;
    height:31px!important;
    padding:0 11px!important;
    font-size:9px!important;
  }

  .home-signup .carra-consent-row{
    font-size:6.3px!important;
  }
}


/* ========================================================================== */
/* V4 FINAL OVERRIDES — DOCK + EMAIL + RTL VISUAL BALANCE                     */
/* ========================================================================== */

/* Home newsletter: niente label flottante sopra la data.
   L'input mantiene aria-label/placeholder, quindi resta accessibile. */
.home-signup > form > label[for="homeEmail"]{
  display:none!important;
}

/* Desktop: due moduli perfettamente allineati e compatti. */
@media (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(960px,76vw)!important;
    gap:10px!important;
    align-items:center!important;
  }

  .ticket-button,
  .home-signup{
    width:calc((100% - 10px)/2)!important;
    flex:0 0 calc((100% - 10px)/2)!important;
  }

  .ticket-button,
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:46px!important;
    min-height:46px!important;
  }

  .ticket-button{
    padding:4px 5px 4px 15px!important;
    border-radius:11px!important;
  }

  .ticket-button>img{
    width:112px!important;
    max-height:23px!important;
  }

  .ticket-label{
    font-size:10px!important;
    padding:0 14px!important;
    border-radius:7px!important;
  }

  .home-signup .email-row{
    padding:4px!important;
    gap:4px!important;
    border-radius:11px!important;
  }

  .home-signup .email-row input{
    padding:0 9px!important;
    font-size:12.5px!important;
  }

  .home-signup .email-row button{
    min-height:36px!important;
    height:36px!important;
    padding:0 15px!important;
    font-size:9.5px!important;
    border-radius:7px!important;
  }

  .home-signup .carra-consent-row{
    top:calc(100% + 3px)!important;
    left:5px!important;
    max-width:calc(100% - 8px)!important;
    font-size:6px!important;
    line-height:1.04!important;
    gap:4px!important;
  }
}

/* Notebook / MacBook: non comprimere la data e non toccare i partner. */
@media (min-width:1100px) and (max-height:900px) and (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(900px,74vw)!important;
  }

  .ticket-button,
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:42px!important;
    min-height:42px!important;
  }

  .ticket-button>img{width:104px!important}
  .ticket-label{font-size:9.3px!important}

  .home-signup .email-row button{
    min-height:32px!important;
    height:32px!important;
    padding:0 13px!important;
    font-size:9px!important;
  }

  .home-signup .email-row input{
    font-size:12px!important;
  }

  .home-signup .carra-consent-row{
    font-size:5.7px!important;
  }
}

/* Mobile: ticket + email restano un blocco unico compatto sotto la data.
   Il logo RTL è gestito dal canvas V4 più in basso, sulla riga dei partner. */
@media (max-aspect-ratio:1/1){
  .action-dock{
    width:min(90vw,370px)!important;
    gap:5px!important;
  }

  .action-dock .ticket-button{
    height:43px!important;
    border-radius:11px!important;
  }

  .action-dock .ticket-button>img{
    width:106px!important;
  }

  .action-dock .ticket-label{
    font-size:10px!important;
    padding:0 12px!important;
  }

  .action-dock .home-signup{
    width:100%!important;
  }

  .home-signup .email-row{
    height:39px!important;
    min-height:39px!important;
    padding:3px 4px!important;
    border-radius:10px!important;
  }

  .home-signup .email-row input{
    font-size:12.5px!important;
    padding:0 8px!important;
  }

  .home-signup .email-row button{
    min-height:31px!important;
    height:31px!important;
    padding:0 12px!important;
    font-size:9px!important;
    border-radius:6px!important;
  }

  .home-signup .carra-consent-row{
    margin:3px 2px 0!important;
    font-size:6.25px!important;
    line-height:1.06!important;
    gap:4px!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]{
    flex-basis:10px!important;
    width:10px!important;
    height:10px!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]:checked::after{
    font-size:7px!important;
    line-height:10px!important;
  }
}

@media (max-width:390px) and (max-aspect-ratio:1/1){
  .action-dock{width:92vw!important}
  .action-dock .ticket-button>img{width:98px!important}
  .action-dock .ticket-label{font-size:9.3px!important}
  .home-signup .carra-consent-row{font-size:5.9px!important}
}


/* ========================================================================== */
/* V5 — MOBILE MAIL IN BASSO + MENU UNIFORMATO                                */
/* ========================================================================== */

/* ---------- MENU: stile uniforme con il resto del sito ---------- */
#menuDialog.menu-panel{
  width:min(430px,calc(100% - 24px))!important;
  padding:42px 24px 24px!important;
  border-radius:18px!important;
  background:
    radial-gradient(circle at 20% 0%,rgba(239,40,72,.10),transparent 34%),
    linear-gradient(145deg,rgba(17,19,39,.985),rgba(5,7,19,.995))!important;
  border:1px solid rgba(255,255,255,.14)!important;
  border-top-color:rgba(228,201,143,.56)!important;
  box-shadow:0 26px 90px rgba(0,0,0,.72)!important;
}

#menuDialog .eyebrow{
  display:block;
  margin-bottom:8px!important;
  color:var(--launch-gold)!important;
  font-weight:800!important;
  letter-spacing:.16em!important;
}

#menuDialog h2{
  margin:0 0 18px!important;
  font-size:30px!important;
  line-height:1!important;
  letter-spacing:-.035em!important;
}

#menuDialog .menu-links{
  display:grid!important;
  gap:8px!important;
  margin-top:0!important;
}

#menuDialog .menu-links button{
  min-height:50px!important;
  padding:0 15px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:space-between!important;
  gap:12px!important;
  border:1px solid rgba(255,255,255,.11)!important;
  border-radius:11px!important;
  background:linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.018))!important;
  color:#fff!important;
  font-size:13px!important;
  font-weight:700!important;
  letter-spacing:.025em!important;
  text-transform:none!important;
  transition:transform .18s ease,border-color .18s ease,background .18s ease!important;
}

#menuDialog .menu-links button:hover,
#menuDialog .menu-links button:focus-visible{
  transform:translateY(-1px)!important;
  border-color:rgba(228,201,143,.48)!important;
  background:linear-gradient(145deg,rgba(228,201,143,.09),rgba(239,40,72,.06))!important;
}

#menuDialog .menu-links button > span:last-child{
  color:var(--launch-gold)!important;
  font-size:16px!important;
  font-weight:500!important;
}

#menuDialog .menu-links small{
  padding:5px 8px!important;
  border:1px solid rgba(228,201,143,.24)!important;
  border-radius:999px!important;
  color:var(--launch-gold)!important;
  background:rgba(228,201,143,.055)!important;
  font-size:8px!important;
  line-height:1!important;
  letter-spacing:.08em!important;
}

#menuDialog .close-button{
  width:38px!important;
  height:38px!important;
  top:11px!important;
  right:11px!important;
  background:rgba(255,255,255,.05)!important;
}

/* ---------- MOBILE: ticket sotto la data, mail di nuovo in basso ---------- */
@media (max-aspect-ratio:1/1){

  /* Torniamo alla separazione che funzionava meglio:
     ticket nel poster, newsletter ancorata in fondo. */
  .action-dock{
    display:contents!important;
  }

  .action-dock .ticket-button{
    position:fixed!important;
    z-index:7!important;
    left:50%!important;
    top:var(--poster-ticket-y,63%)!important;
    right:auto!important;
    bottom:auto!important;
    transform:translateX(-50%)!important;
    width:min(90vw,370px)!important;
    height:43px!important;
    min-width:0!important;
    padding:4px 5px 4px 14px!important;
    border-radius:11px!important;
  }

  .action-dock .ticket-button:hover{
    transform:translateX(-50%) translateY(-1px)!important;
  }

  .action-dock .ticket-button>img{
    width:104px!important;
    max-height:23px!important;
  }

  .action-dock .ticket-label{
    min-width:0!important;
    flex:1!important;
    font-size:9.8px!important;
    padding:0 12px!important;
    border-radius:7px!important;
  }

  .action-dock .home-signup{
    position:fixed!important;
    z-index:8!important;
    left:50%!important;
    right:auto!important;
    top:auto!important;
    bottom:calc(8px + env(safe-area-inset-bottom))!important;
    transform:translateX(-50%)!important;
    width:min(92vw,390px)!important;
    height:auto!important;
    padding:0!important;
  }

  .home-signup form{
    height:auto!important;
  }

  .home-signup .email-row{
    height:40px!important;
    min-height:40px!important;
    padding:3px 4px!important;
    border-radius:10px!important;
    background:linear-gradient(145deg,rgba(7,10,27,.96),rgba(4,6,18,.985))!important;
    box-shadow:0 8px 30px rgba(0,0,0,.28),0 0 0 1px rgba(255,255,255,.025) inset!important;
  }

  .home-signup .email-row input{
    font-size:13px!important;
    padding:0 9px!important;
  }

  .home-signup .email-row button{
    min-height:32px!important;
    height:32px!important;
    padding:0 13px!important;
    font-size:9px!important;
    border-radius:6px!important;
  }

  .home-signup .carra-consent-row{
    position:relative!important;
    inset:auto!important;
    width:100%!important;
    max-width:100%!important;
    margin:4px 2px 0!important;
    padding:0!important;
    gap:4px!important;
    font-size:6.15px!important;
    line-height:1.07!important;
    color:rgba(255,255,255,.88)!important;
    text-align:left!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]{
    flex:0 0 10px!important;
    width:10px!important;
    height:10px!important;
  }

  .home-signup .carra-consent-row input[type="checkbox"]:checked::after{
    font-size:7px!important;
    line-height:10px!important;
  }

  #menuDialog.menu-panel{
    width:calc(100% - 16px)!important;
    max-height:calc(100dvh - 20px)!important;
    padding:40px 18px 20px!important;
    border-radius:16px!important;
  }

  #menuDialog h2{
    font-size:27px!important;
    margin-bottom:15px!important;
  }

  #menuDialog .menu-links{
    gap:7px!important;
  }

  #menuDialog .menu-links button{
    min-height:47px!important;
    padding:0 13px!important;
    font-size:12.5px!important;
  }
}

@media (max-width:390px) and (max-aspect-ratio:1/1){
  .action-dock .ticket-button{
    width:92vw!important;
    height:42px!important;
  }

  .action-dock .ticket-button>img{
    width:98px!important;
  }

  .action-dock .home-signup{
    width:94vw!important;
  }

  .home-signup .email-row{
    height:39px!important;
  }

  .home-signup .carra-consent-row{
    font-size:5.9px!important;
  }
}




/* ========================================================================== */
/* V7 — FAST FIRST PAINT                                                       */
/* ========================================================================== */

/* La locandina originale è visibile subito.
   Solo la piccola zona della vecchia dicitura radio viene sfocata per pochi ms. */
.poster-frame .poster-art{
  opacity:1!important;
}
.poster-frame .poster-canvas{
  opacity:0!important;
  transition:opacity .055s linear!important;
}
.poster-frame.rtl-clean-ready .poster-art{
  opacity:0!important;
}
.poster-frame.rtl-clean-ready .poster-canvas{
  opacity:1!important;
}

.poster-frame .radio-prepaint-mask{
  position:absolute;
  z-index:2;
  pointer-events:none;
  border-radius:999px;
  background:rgba(4,5,17,.24);
  backdrop-filter:blur(7px);
  -webkit-backdrop-filter:blur(7px);
  opacity:1;
  transition:opacity .045s linear;
}
.poster-frame.rtl-clean-ready .radio-prepaint-mask{
  opacity:0;
}

@media(min-aspect-ratio:1001/1000){
  .poster-frame .radio-prepaint-mask{
    left:43%;
    top:81.5%;
    width:14%;
    height:2.8%;
  }
}
@media(max-aspect-ratio:1/1){
  .poster-frame .radio-prepaint-mask{
    left:38%;
    top:70.4%;
    width:24%;
    height:2.3%;
  }
}

.radio-partner span{
  display:none!important;
}


/* ========================================================================== */
/* V8 — ZERO CSS ROUNDTRIP + CONSENSO INTEGRATO NELL'INPUT                    */
/* ========================================================================== */

/* Il poster resta visibile SEMPRE: il canvas pulito gli si appoggia sopra.
   Così non c'è più il micro-lampo/ritardo dovuto allo swap poster -> canvas. */
.poster-frame .poster-art,
.poster-frame.is-rendered .poster-art,
.poster-frame.rtl-clean-ready .poster-art{
  opacity:1!important;
}
.poster-frame .poster-canvas{
  opacity:0!important;
  transition:none!important;
}
.poster-frame.rtl-clean-ready .poster-canvas{
  opacity:1!important;
}

/* Home newsletter: consenso dentro lo stesso box della mail, come countdown. */
.home-signup > form > label[for="homeEmail"]{
  display:none!important;
}

.home-signup .email-row{
  display:grid!important;
  grid-template-columns:minmax(0,1fr) auto!important;
  grid-template-rows:minmax(22px,1fr) auto!important;
  column-gap:5px!important;
  row-gap:0!important;
  align-items:center!important;
}

.home-signup .email-row > input[type="email"]{
  grid-column:1!important;
  grid-row:1!important;
  align-self:end!important;
  width:100%!important;
  min-width:0!important;
}

.home-signup .email-row > button[type="submit"]{
  grid-column:2!important;
  grid-row:1 / span 2!important;
  align-self:stretch!important;
  height:auto!important;
  min-height:0!important;
}

.home-signup .email-row > .carra-consent-row{
  grid-column:1!important;
  grid-row:2!important;
  position:static!important;
  inset:auto!important;
  width:auto!important;
  max-width:100%!important;
  margin:0 0 3px 8px!important;
  padding:0!important;
  gap:4px!important;
  white-space:nowrap!important;
  overflow:hidden!important;
  font-size:6.2px!important;
  line-height:1.02!important;
  color:rgba(255,255,255,.88)!important;
  text-shadow:0 1px 4px rgba(0,0,0,.95)!important;
}

.home-signup .email-row > .carra-consent-row > span{
  overflow:hidden!important;
  text-overflow:ellipsis!important;
  white-space:nowrap!important;
}

.home-signup .email-row > .carra-consent-row input[type="checkbox"]{
  flex:0 0 10px!important;
  width:10px!important;
  height:10px!important;
}

.home-signup .email-row > .carra-consent-row input[type="checkbox"]:checked::after{
  font-size:7px!important;
  line-height:10px!important;
}

/* Desktop: box compatto ma sufficiente per input + micro-riga consenso. */
@media(min-aspect-ratio:1001/1000){
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:46px!important;
    min-height:46px!important;
  }

  .home-signup .email-row > input[type="email"]{
    padding:3px 9px 0!important;
    font-size:12.3px!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:84px!important;
    padding:0 15px!important;
    margin:1px 0!important;
    font-size:9.4px!important;
  }
}

/* Mobile: mail resta IN BASSO come V5/V7, ma privacy è dentro il box mail. */
@media(max-aspect-ratio:1/1){
  .action-dock .home-signup{
    bottom:calc(8px + env(safe-area-inset-bottom))!important;
  }

  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:43px!important;
    min-height:43px!important;
  }

  .home-signup .email-row{
    padding:3px 4px!important;
  }

  .home-signup .email-row > input[type="email"]{
    padding:3px 8px 0!important;
    font-size:12.7px!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:82px!important;
    padding:0 12px!important;
    margin:1px 0!important;
    font-size:9px!important;
  }

  .home-signup .email-row > .carra-consent-row{
    margin:0 0 2px 7px!important;
    font-size:5.85px!important;
  }
}

@media(max-width:390px) and (max-aspect-ratio:1/1){
  .home-signup .email-row > button[type="submit"]{
    min-width:76px!important;
    padding:0 9px!important;
    font-size:8.6px!important;
  }

  .home-signup .email-row > .carra-consent-row{
    font-size:5.45px!important;
  }
}


/* ========================================================================== */
/* V9 — POLISH DESKTOP / NOTEBOOK / CHECKBOX PRIVACY                          */
/* ========================================================================== */

/* Dock più importante e leggibile, ma ancora sotto la data. */
@media (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(1120px,72vw)!important;
    gap:14px!important;
    align-items:center!important;
  }

  .ticket-button,
  .home-signup{
    width:calc((100% - 14px)/2)!important;
    flex:0 0 calc((100% - 14px)/2)!important;
  }

  .ticket-button,
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:54px!important;
    min-height:54px!important;
  }

  .ticket-button{
    padding:5px 6px 5px 18px!important;
    border-radius:13px!important;
    border:1px solid rgba(255,255,255,.20)!important;
    background:linear-gradient(145deg,rgba(13,12,31,.94),rgba(8,8,22,.98))!important;
    box-shadow:0 10px 30px rgba(0,0,0,.28),0 0 0 1px rgba(255,255,255,.025) inset!important;
  }

  .ticket-button>img{
    width:128px!important;
    max-height:26px!important;
  }

  .ticket-label{
    min-width:0!important;
    height:100%!important;
    padding:0 22px!important;
    border-radius:8px!important;
    font-size:11px!important;
    letter-spacing:.08em!important;
  }

  .home-signup .email-row{
    grid-template-columns:minmax(0,1fr) 102px!important;
    grid-template-rows:31px 15px!important;
    padding:4px 5px!important;
    column-gap:5px!important;
    row-gap:0!important;
    border-radius:13px!important;
    border:1px solid rgba(255,255,255,.20)!important;
    background:linear-gradient(145deg,rgba(10,11,29,.96),rgba(5,6,18,.99))!important;
    box-shadow:0 10px 30px rgba(0,0,0,.28),0 0 0 1px rgba(255,255,255,.025) inset!important;
  }

  .home-signup .email-row > input[type="email"]{
    padding:2px 11px 0!important;
    font-size:13px!important;
    line-height:1!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:102px!important;
    padding:0 16px!important;
    margin:0!important;
    border-radius:8px!important;
    font-size:9.8px!important;
    letter-spacing:.075em!important;
  }

  .home-signup .email-row > .carra-consent-row{
    margin:0 0 1px 10px!important;
    gap:5px!important;
    font-size:7.15px!important;
    line-height:1!important;
    overflow:visible!important;
    white-space:nowrap!important;
    color:rgba(255,255,255,.82)!important;
  }

  .home-signup .email-row > .carra-consent-row > span{
    overflow:visible!important;
    text-overflow:clip!important;
    white-space:nowrap!important;
  }

  .home-signup .email-row > .carra-consent-row a{
    color:#f0d596!important;
    text-decoration-color:rgba(240,213,150,.72)!important;
    font-weight:800!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]{
    flex:0 0 11px!important;
    width:11px!important;
    height:11px!important;
    margin-top:0!important;
    border-radius:3px!important;
    border:1px solid rgba(255,255,255,.74)!important;
    background:rgba(7,7,22,.98)!important;
    box-shadow:0 0 0 1px rgba(239,40,72,.10),0 1px 4px rgba(0,0,0,.35)!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]:hover{
    border-color:#f0d596!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]:checked{
    border-color:#ff5576!important;
    background:linear-gradient(135deg,#ef2848,#ff4c72)!important;
    box-shadow:0 0 0 2px rgba(239,40,72,.14)!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]:checked::after{
    inset:-1px 0 0!important;
    font-size:7.8px!important;
    line-height:11px!important;
  }
}

/* MacBook / notebook: proporzioni più compatte ma ancora leggibili. */
@media (min-width:1100px) and (max-height:900px) and (min-aspect-ratio:1001/1000){
  .action-dock{
    width:min(1040px,70vw)!important;
    gap:12px!important;
  }

  .ticket-button,
  .home-signup{
    width:calc((100% - 12px)/2)!important;
    flex-basis:calc((100% - 12px)/2)!important;
  }

  .ticket-button,
  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:50px!important;
    min-height:50px!important;
  }

  .ticket-button>img{width:118px!important}
  .ticket-label{font-size:10.2px!important;padding:0 18px!important}

  .home-signup .email-row{
    grid-template-columns:minmax(0,1fr) 94px!important;
    grid-template-rows:29px 13px!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:94px!important;
    font-size:9.2px!important;
    padding:0 13px!important;
  }

  .home-signup .email-row > input[type="email"]{
    font-size:12.5px!important;
  }

  .home-signup .email-row > .carra-consent-row{
    font-size:6.55px!important;
    margin-left:9px!important;
  }
}

/* Mobile: mail resta in basso, privacy integrata ma leggibile. */
@media(max-aspect-ratio:1/1){
  .action-dock .home-signup{
    width:min(93vw,400px)!important;
  }

  .home-signup,
  .home-signup form,
  .home-signup .email-row{
    height:48px!important;
    min-height:48px!important;
  }

  .home-signup .email-row{
    grid-template-columns:minmax(0,1fr) 88px!important;
    grid-template-rows:28px 14px!important;
    padding:3px 4px!important;
    border-radius:12px!important;
    border:1px solid rgba(255,255,255,.19)!important;
    box-shadow:0 9px 28px rgba(0,0,0,.30),0 0 0 1px rgba(255,255,255,.025) inset!important;
  }

  .home-signup .email-row > input[type="email"]{
    padding:2px 9px 0!important;
    font-size:13px!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:88px!important;
    padding:0 11px!important;
    border-radius:8px!important;
    font-size:9px!important;
    margin:0!important;
  }

  .home-signup .email-row > .carra-consent-row{
    margin:0 0 1px 8px!important;
    gap:4px!important;
    font-size:6.25px!important;
    line-height:1!important;
    white-space:nowrap!important;
    color:rgba(255,255,255,.82)!important;
    overflow:visible!important;
  }

  .home-signup .email-row > .carra-consent-row > span{
    overflow:visible!important;
    white-space:nowrap!important;
  }

  .home-signup .email-row > .carra-consent-row a{
    color:#f0d596!important;
    font-weight:800!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]{
    flex:0 0 11px!important;
    width:11px!important;
    height:11px!important;
    border-radius:3px!important;
  }

  .home-signup .email-row > .carra-consent-row input[type="checkbox"]:checked::after{
    font-size:7.8px!important;
    line-height:11px!important;
  }
}

@media(max-width:390px) and (max-aspect-ratio:1/1){
  .home-signup .email-row{
    grid-template-columns:minmax(0,1fr) 80px!important;
  }

  .home-signup .email-row > button[type="submit"]{
    min-width:80px!important;
    font-size:8.6px!important;
    padding:0 8px!important;
  }

  .home-signup .email-row > .carra-consent-row{
    font-size:5.85px!important;
    margin-left:7px!important;
  }
}
`;
  document.head.appendChild(style);
})();

// V8 FAST PRELOAD
// Avvia subito il caricamento del piccolo background RTL pulito.
// Il poster principale NON viene più nascosto in attesa del canvas.
(() => {
  const portrait = window.matchMedia('(max-aspect-ratio: 1/1)').matches;
  const rtlClean = new Image();
  rtlClean.decoding = 'async';
  rtlClean.src = portrait ? 'rtl-background-mobile.png' : 'rtl-background-desktop.png';
  window.__CARRA_RTL_CLEAN_IMAGE = rtlClean;
  window.__CARRA_RTL_CLEAN_KIND = portrait ? 'mobile' : 'desktop';

  const installMask = () => {
    const frame = document.querySelector('.poster-frame');
    if (!frame || frame.querySelector('.radio-prepaint-mask')) return;
    const mask = document.createElement('span');
    mask.className = 'radio-prepaint-mask';
    mask.setAttribute('aria-hidden', 'true');
    frame.appendChild(mask);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installMask, { once:true });
  } else {
    installMask();
  }
})();

// Elegant sparkle override: loaded after concert.css so it can refine the
// existing Carrà sparkle effect without changing the main stylesheet.
(() => {
  const href = 'sparkles-elegant.css?v=20261008';
  if (!document.querySelector(`link[href^="sparkles-elegant.css"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
})();

// Exact event link and countdown.
window.CARRA_CONFIG = Object.freeze({
  ticketUrl: 'https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642',
  countdownTarget: '2026-10-14T10:00:00+02:00'
});

// Newsletter consent.
// V35 deliberately avoids observing/mutating the whole body: V34 could create a
// self-triggering MutationObserver loop because textContent changes are mutations.
(() => {
  const CONSENT_VERSION = 'newsletter-marketing-v3';
  const PRIVACY_VERSION = 'privacy-2026-10-10';

  const copy = {
    it: 'Acconsento a ricevere via email aggiornamenti su biglietti, concerto e merchandising.',
    en: 'I agree to receive email updates about tickets, the concert and merchandise.',
    es: 'Acepto recibir por email novedades sobre entradas, concierto y merchandising.',
    pt: 'Aceito receber por email novidades sobre bilhetes, concerto e merchandising.',
    de: 'Ich willige ein, E-Mail-Updates zu Tickets, Konzert und Merchandise zu erhalten.',
    fr: 'J’accepte de recevoir par e-mail des actualités sur les billets, le concert et le merchandising.'
  };

  const privacyCopy = {
    it: 'Privacy', en: 'Privacy', es: 'Privacidad',
    pt: 'Privacidade', de: 'Datenschutz', fr: 'Confidentialité'
  };

  const lang = () => {
    const value = (document.documentElement.lang || 'it').toLowerCase().split('-')[0];
    return copy[value] ? value : 'it';
  };

  function injectStyles() {
    if (document.getElementById('carra-consent-style')) return;
    const style = document.createElement('style');
    style.id = 'carra-consent-style';
    style.textContent = `
      .carra-consent-row{
        display:flex;align-items:flex-start;gap:6px;
        margin:6px 2px 0;padding:0;
        color:rgba(255,255,255,.86);
        font:500 10px/1.25 Arial,Helvetica,sans-serif;
        text-align:left;letter-spacing:0;
      }
      .carra-consent-row input[type="checkbox"]{
        appearance:none;-webkit-appearance:none;
        flex:0 0 14px;width:14px;height:14px;margin:0;
        border:1px solid rgba(255,255,255,.72);border-radius:3px;
        background:rgba(4,2,16,.90);cursor:pointer;position:relative;
        box-shadow:0 0 0 1px rgba(255,40,111,.10),0 2px 6px rgba(0,0,0,.32);
      }
      .carra-consent-row input[type="checkbox"]:checked{
        border-color:#ff4a90;background:#ff2b72;
      }
      .carra-consent-row input[type="checkbox"]:checked::after{
        content:'✓';position:absolute;inset:-1px 0 0;
        color:#fff;font:900 11px/14px Arial,Helvetica,sans-serif;text-align:center;
      }
      .carra-consent-row input[type="checkbox"]:focus-visible{
        outline:2px solid #fff;outline-offset:2px;
      }
      .carra-consent-row a{
        color:#fff;text-decoration:underline;text-underline-offset:2px;
        white-space:nowrap;font-weight:700;
      }

      /* Countdown: compact second row inside the existing form area. */
      #countdownScreen .gate-form-row{
        display:grid!important;
        grid-template-columns:minmax(0,1fr) auto!important;
        grid-template-rows:auto auto!important;
        column-gap:8px!important;
        row-gap:1px!important;
      }
      #countdownScreen .gate-input{
        grid-column:1!important;grid-row:1!important;
        padding-top:6px!important;padding-bottom:1px!important;
        align-self:end!important;
      }
      #countdownScreen .gate-btn{
        grid-column:2!important;grid-row:1 / span 2!important;
        align-self:center!important;
      }
      #countdownScreen .carra-consent-row{
        grid-column:1!important;grid-row:2!important;
        width:auto!important;margin:0 0 3px 4px!important;
        color:rgba(255,255,255,.88)!important;
        font-size:8.1px!important;line-height:1.12!important;
        text-shadow:0 1px 4px rgba(0,0,0,.95)!important;
        overflow:hidden!important;
      }
      #countdownScreen .carra-consent-row input[type="checkbox"]{
        flex-basis:12px!important;width:12px!important;height:12px!important;
      }
      #countdownScreen .carra-consent-row input[type="checkbox"]:checked::after{
        font-size:9px!important;line-height:12px!important;
      }

      .home-signup .carra-consent-row,
      dialog .carra-consent-row,
      form[data-subscribe]:not(#gateSubscribeForm) .carra-consent-row{
        max-width:100%;font-size:9px;line-height:1.2;margin-top:5px;
      }

      @media (max-width:699px){
        #countdownScreen .carra-consent-row{
          font-size:7.35px!important;gap:5px!important;margin-left:2px!important;
        }
        #countdownScreen .gate-input{
          padding-top:4px!important;padding-bottom:0!important;
        }
        #countdownScreen .carra-consent-row input[type="checkbox"]{
          flex-basis:11px!important;width:11px!important;height:11px!important;
        }
        #countdownScreen .carra-consent-row input[type="checkbox"]:checked::after{
          font-size:8px!important;line-height:11px!important;
        }
        .home-signup .carra-consent-row,
        dialog .carra-consent-row,
        form[data-subscribe]:not(#gateSubscribeForm) .carra-consent-row{
          font-size:8.3px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function setLabelText(label) {
    const l = lang();
    const text = label.querySelector('.carra-consent-text');
    const link = label.querySelector('.carra-privacy-link');
    if (text) text.textContent = copy[l] + ' ';
    if (link) link.textContent = privacyCopy[l];
  }

  function enhanceForms() {
    document.querySelectorAll('form[data-subscribe]').forEach((form, index) => {
      if (form.querySelector('input[name="marketingConsent"]')) return;

      const checkboxId = `marketingConsent_${form.id || index}`;
      const label = document.createElement('label');
      label.className = 'carra-consent-row';
      label.htmlFor = checkboxId;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = checkboxId;
      checkbox.name = 'marketingConsent';
      checkbox.value = 'yes';
      checkbox.required = true;
      checkbox.setAttribute('aria-required', 'true');

      const wrap = document.createElement('span');
      const text = document.createElement('span');
      text.className = 'carra-consent-text';

      const privacy = document.createElement('a');
      privacy.className = 'carra-privacy-link';
      privacy.href = 'privacy.html';
      privacy.target = '_blank';
      privacy.rel = 'noopener noreferrer';
      privacy.addEventListener('click', event => event.stopPropagation());

      wrap.append(text, privacy);
      label.append(checkbox, wrap);
      setLabelText(label);

      if (form.id === 'gateSubscribeForm') {
        const row = form.querySelector('.gate-form-row');
        if (row) {
          const button = row.querySelector('button[type="submit"]');
          if (button) row.insertBefore(label, button);
          else row.appendChild(label);
        }
      } else if (form.id === 'homeSubscribeForm') {
        // V8: stessa logica visiva del countdown.
        // Input + consenso stanno nella colonna sinistra;
        // il bottone occupa entrambe le righe a destra.
        const row = form.querySelector('.email-row');
        if (row) {
          const button = row.querySelector('button[type="submit"]');
          if (button) row.insertBefore(label, button);
          else row.appendChild(label);
        }
      } else {
        const finePrint = form.querySelector('.fine-print');
        if (finePrint) form.insertBefore(label, finePrint);
        else form.appendChild(label);
      }
    });
  }

  injectStyles();

  // site-config.js is defer in index.html, but this guard also makes it safe if
  // the loading strategy changes in the future.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceForms, { once: true });
  } else {
    enhanceForms();
  }

  // Only observe the language attribute. This does NOT mutate/observe body.
  new MutationObserver(() => {
    document.querySelectorAll('.carra-consent-row').forEach(setLabelText);
  }).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });

  let pendingConsent = null;

  // Capture phase: validate consent before concert.js handles the form.
  document.addEventListener('submit', event => {
    const form = event.target.closest && event.target.closest('form[data-subscribe]');
    if (!form) return;

    const checkbox = form.querySelector('input[name="marketingConsent"]');
    if (!checkbox || !checkbox.checked) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (checkbox) checkbox.reportValidity();
      return;
    }

    const email = form.querySelector('input[type="email"]');
    pendingConsent = {
      email: String(email ? email.value : '').trim().toLowerCase(),
      source: form.id || 'subscribe-form',
      clientConsentAt: new Date().toISOString()
    };
  }, true);

  // Keep the original /api/subscribe untouched.
  // Before it runs, store the consent proof in /api/consent.
  const nativeFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const urlString = typeof input === 'string' ? input : (input && input.url);
    if (!urlString) return nativeFetch(input, init);

    let url;
    try { url = new URL(urlString, window.location.href); }
    catch (_) { return nativeFetch(input, init); }

    if (url.origin !== window.location.origin || url.pathname !== '/api/subscribe') {
      return nativeFetch(input, init);
    }

    let payload;
    try { payload = JSON.parse(init.body || '{}'); }
    catch (_) { return nativeFetch(input, init); }

    const normalizedEmail = String(payload.email || '').trim().toLowerCase();
    if (!pendingConsent || pendingConsent.email !== normalizedEmail) {
      return new Response(JSON.stringify({ error:'Consenso richiesto' }), {
        status:400,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    }

    const proofResponse = await nativeFetch('/api/consent', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        email: normalizedEmail,
        consent: true,
        consentVersion: CONSENT_VERSION,
        privacyVersion: PRIVACY_VERSION,
        source: pendingConsent.source,
        clientConsentAt: pendingConsent.clientConsentAt
      })
    });

    if (!proofResponse.ok) {
      return new Response(JSON.stringify({ error:'Impossibile registrare il consenso' }), {
        status:500,
        headers:{'Content-Type':'application/json; charset=utf-8'}
      });
    }

    return nativeFetch(input, init);
  };
})();

// Audio bootstrap for the NEWCOUNT gate.
(() => {
  const attemptMainAudio = () => {
    const button = document.getElementById('audioButton');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    button.click();
  };

  const onGesture = event => {
    if (!event.isTrusted) return;
    if (event.type === 'keydown' && (event.ctrlKey || event.metaKey || event.altKey)) return;
    attemptMainAudio();
  };

  document.addEventListener('pointerdown', onGesture, { passive: true });
  document.addEventListener('touchstart', onGesture, { passive: true });
  document.addEventListener('click', onGesture, { passive: true });
  document.addEventListener('keydown', onGesture);

  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(attemptMainAudio, 0);
  }, { once: true });
})();

// Launch page V9 — dock più leggibile, checkbox privacy rifinita, stesso fast-load.
(() => {
  const TICKET_URL = 'https://www.vivaticket.com/it/ticket/raffaella-carra-hologram/320642';

  function openTickets() {
    const link = document.createElement('a');
    link.href = TICKET_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  // Tutti i CTA biglietti portano direttamente alla pagina evento ufficiale.
  document.addEventListener('click', event => {
    const target = event.target.closest && event.target.closest('#ticketButton,[data-open="ticketDialog"],#purchaseLink');
    if (!target) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const openDialog = target.closest('dialog[open]');
    if (openDialog) openDialog.close();
    openTickets();
  }, true);

  function enhanceConcertPanel() {
    const panel = document.getElementById('infoDialog');
    if (!panel || panel.dataset.launchV9 === '1') return;
    panel.dataset.launchV9 = '1';
    panel.classList.add('concert-info-panel');

    const eyebrow = panel.querySelector('.eyebrow');
    const title = panel.querySelector('h2');
    const intro = panel.querySelector('.panel-intro');
    const details = panel.querySelector('.event-details');

    if (eyebrow) {
      eyebrow.removeAttribute('data-t');
      eyebrow.textContent = 'IL CONCERTO';
    }
    if (title) {
      title.removeAttribute('data-t');
      title.textContent = 'RAFFA È TORNATA.';
    }
    if (intro) {
      intro.removeAttribute('data-t');
      intro.classList.add('concert-lead');
      intro.textContent = 'Non un tributo. Non un musical. Un vero concerto dal vivo, dove passato e futuro si incontrano.';
    }

    const story = document.createElement('div');
    story.className = 'concert-story';
    story.lang = 'it';

    const paragraphs = [
      'Per la prima volta in Italia, Raffaella Carrà torna sul palco attraverso un ologramma iperrealistico, così realistico da regalare la sensazione di averla nuovamente davanti ai nostri occhi, mentre canta, balla e sorride con quell\'energia inconfondibile che ha conquistato milioni di persone.',
      '“RAFFAELLA CARRÀ – THE SHOW MUST GO ON” è un\'esperienza straordinaria di 100 minuti, un viaggio attraverso i suoi più grandi successi, i momenti indimenticabili della sua carriera e i racconti più emozionanti della sua vita.',
      'Sul palco, Raffaella sarà protagonista di uno spettacolo ricco di musica, danza e tecnologia, accompagnata da ballerini dal vivo, coreografie spettacolari, laser 3D, effetti luminosi, fiamme, geyser ed effetti speciali di ultima generazione.',
      'Un concerto pensato per far cantare, ballare, sorridere ed emozionare, rivivendo insieme quelle canzoni e quei momenti che hanno unito intere generazioni.',
      'Non è soltanto uno spettacolo. È l\'occasione di ritrovare, attraverso la magia della tecnologia, quella gioia, quella libertà e quella straordinaria voglia di vivere che hanno reso Raffaella un\'icona senza tempo.',
      'Un progetto ufficiale, realizzato con l\'autorizzazione degli aventi diritto, prodotto da Laserman Industries sotto la direzione artistica e creativa di Andrea Prince.',
      'Il 28 dicembre 2026, all\'Atlantico di Roma, preparati a vivere qualcosa di mai visto prima.',
      'La musica riparte. L\'energia si accende. Raffa è tornata.'
    ];

    paragraphs.forEach((text, index) => {
      const p = document.createElement('p');
      p.textContent = text;
      if (index === paragraphs.length - 1) p.className = 'concert-story-finale';
      story.appendChild(p);
    });

    const dateLine = document.createElement('p');
    dateLine.className = 'concert-story-date';
    dateLine.innerHTML = '<strong>28 DICEMBRE 2026 · ATLANTICO ROMA.</strong>';
    story.appendChild(dateLine);

    if (details) panel.insertBefore(story, details);
    else panel.appendChild(story);

    const ticketCta = panel.querySelector('[data-open="ticketDialog"]');
    if (ticketCta) {
      ticketCta.removeAttribute('data-t');
      ticketCta.textContent = 'Acquista biglietti su Vivaticket ↗';
    }
  }

  function updateDockPosition() {
    const frame = document.querySelector('.poster-frame');
    const poster = document.querySelector('.poster-art');
    if (!frame || !poster || !poster.complete || !poster.naturalWidth || poster.naturalWidth <= poster.naturalHeight) return;
    const bounds = frame.getBoundingClientRect();
    const scale = Math.min(bounds.width / poster.naturalWidth, bounds.height / poster.naturalHeight);
    const renderedHeight = poster.naturalHeight * scale;
    const y = (bounds.height - renderedHeight) / 2;
    // V4: il dock scende sotto la data senza invadere la fascia partner.
    let ratio = 0.758;
    if (window.innerHeight <= 820) ratio = 0.752;
    if (window.innerHeight <= 700) ratio = 0.745;
    const dockY = bounds.top + y + renderedHeight * ratio;
    document.documentElement.style.setProperty('--launch-dock-y', `${dockY.toFixed(1)}px`);
  }

  // V3: riposiziona RTL in modo ottico sia desktop sia mobile.
  // Il canvas originale lo spostava verso il basso sul desktop e lo lasciava
  // troppo alto sul mobile rispetto alla fascia Laserman / Atlantico.
  function initRtlAlignment() {
    const frame = document.querySelector('.poster-frame');
    const poster = document.querySelector('.poster-art');
    const canvas = document.querySelector('.poster-canvas');
    if (!frame || !poster || !canvas) return;

    const backgrounds = {
      desktop: null,
      mobile: null
    };

    const preloadedKind = window.__CARRA_RTL_CLEAN_KIND;
    const preloadedImage = window.__CARRA_RTL_CLEAN_IMAGE;
    if (preloadedKind && preloadedImage) {
      backgrounds[preloadedKind] = preloadedImage;
    }

    function getBackground(kind) {
      if (backgrounds[kind]) return backgrounds[kind];
      const image = new Image();
      image.decoding = 'async';
      image.src = kind === 'desktop'
        ? 'rtl-background-desktop.png'
        : 'rtl-background-mobile.png';
      image.addEventListener('load', schedule, { once:true });
      backgrounds[kind] = image;
      return image;
    }

    let raf = 0;

    function schedule() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setTimeout(patch, 34));
    }

    function featherBackground(ctx, background, iw, ih, x, y, scale, box, ratio) {
      const { left, top, width, height, pad = 14 } = box;
      const patchCanvas = document.createElement('canvas');
      patchCanvas.width = width + pad * 2;
      patchCanvas.height = height + pad * 2;
      const patchCtx = patchCanvas.getContext('2d');
      if (!patchCtx) return;

      patchCtx.drawImage(
        background,
        (left - pad) * background.naturalWidth / iw,
        (top - pad) * background.naturalHeight / ih,
        (width + pad * 2) * background.naturalWidth / iw,
        (height + pad * 2) * background.naturalHeight / ih,
        0, 0, patchCanvas.width, patchCanvas.height
      );

      patchCtx.globalCompositeOperation = 'destination-in';
      for (const horizontal of [true, false]) {
        const length = horizontal ? patchCanvas.width : patchCanvas.height;
        const gradient = patchCtx.createLinearGradient(
          0, 0,
          horizontal ? length : 0,
          horizontal ? 0 : length
        );
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(pad / length, 'black');
        gradient.addColorStop(1 - pad / length, 'black');
        gradient.addColorStop(1, 'transparent');
        patchCtx.fillStyle = gradient;
        patchCtx.fillRect(0, 0, patchCanvas.width, patchCanvas.height);
      }

      ctx.drawImage(
        patchCanvas,
        x + (left - pad) * scale,
        y + (top - pad) * scale,
        patchCanvas.width * scale,
        patchCanvas.height * scale
      );
    }

    function patch() {
      updateDockPosition();

      if (!poster.complete || !poster.naturalWidth || !canvas.width || !canvas.height) return;

      const desktop = poster.naturalWidth > poster.naturalHeight;
      const background = getBackground(desktop ? 'desktop' : 'mobile');
      if (!background.complete || !background.naturalWidth) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const bounds = frame.getBoundingClientRect();
      const w = bounds.width;
      const h = bounds.height;
      const iw = poster.naturalWidth;
      const ih = poster.naturalHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const scale = Math.min(w / iw, h / ih);
      const x = (w - iw * scale) / 2;
      const y = (h - ih * scale) / 2;

      ctx.save();
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      let sourceCx, sourceCy, radius, targetCx, targetCy, eraseBox;

      if (desktop) {
        // Desktop: RTL sulla stessa fascia ottica di Laserman e Atlantico.
        sourceCx = 758;
        sourceCy = 780;
        radius = 46;
        targetCx = 758;
        targetCy = 786;
        eraseBox = { left: 692, top: 708, width: 134, height: 146, pad: 18 };
      } else {
        // Mobile: il logo sale/scende insieme alla locandina, ma resta tra i
        // due partner in basso invece di galleggiare troppo in alto tra le gambe.
        sourceCx = 431;
        sourceCy = 1177;
        radius = 49;
        targetCx = 431;
        targetCy = 1416;
        eraseBox = { left: 360, top: 1102, width: 142, height: 154, pad: 18 };
      }

      // Cancella la vecchia posizione del logo usando il background pulito.
      featherBackground(ctx, background, iw, ih, x, y, scale, eraseBox, pixelRatio);

      // Ridisegna il logo originale nella nuova posizione, senza rigenerarlo.
      ctx.beginPath();
      ctx.arc(
        x + targetCx * scale,
        y + targetCy * scale,
        radius * scale,
        0,
        Math.PI * 2
      );
      ctx.clip();
      ctx.drawImage(
        poster,
        sourceCx - radius,
        sourceCy - radius,
        radius * 2,
        radius * 2,
        x + (targetCx - radius) * scale,
        y + (targetCy - radius) * scale,
        radius * 2 * scale,
        radius * 2 * scale
      );

      ctx.restore();

      // Solo adesso il canvas non contiene più la scritta "Official Radio Partner".
      frame.classList.add('rtl-clean-ready');
    }

    Object.values(backgrounds).forEach(image => {
      if (!image) return;
      if (image.complete && image.naturalWidth) schedule();
      else image.addEventListener('load', schedule, { once:true });
    });
    poster.addEventListener('load', schedule);
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('orientationchange', schedule, { passive: true });
    new MutationObserver(schedule).observe(canvas, {
      attributes: true,
      attributeFilter: ['width', 'height']
    });
    schedule();
  }

  function initLaunchV9() {
    enhanceConcertPanel();
    updateDockPosition();
    initRtlAlignment();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLaunchV9, { once:true });
  } else {
    initLaunchV9();
  }
})();
