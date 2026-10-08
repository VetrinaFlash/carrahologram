'use strict';
(() => {
  const copy = {
    it: {info:'Il concerto',language:'Lingua',tickets:'Biglietti',intro:'Una notte con l’icona dello spettacolo italiano.',when:'Quando',where:'Dove',date:'28 dicembre 2026',directions:'Come arrivare ↗',calendar:'Aggiungi al calendario ↗',poster:'Scarica la locandina ↓',ticketInfo:'Biglietti e aggiornamenti',ticketTitle:'Ci vediamo sotto il palco.',ticketIntro:'Lascia la tua email per ricevere le novità sui biglietti e sul concerto.',buy:'Acquista su Vivaticket ↗',email:'La tua email',notify:'Avvisami',finePrint:'Solo aggiornamenti sul concerto. Per cancellarti, rispondi a una nostra email con “CANCELLAMI”.',close:'Chiudi',audioOn:'Attiva la musica',audioOff:'Disattiva la musica',audioError:'Audio non disponibile. Riprova tra poco.',pending:'Invio…',success:'Sei nella lista. Ti aggiorneremo via email.',error:'Iscrizione non riuscita. Riprova tra poco.'},
    en: {info:'The concert',language:'Language',tickets:'Tickets',intro:'A night with an icon of Italian entertainment.',when:'When',where:'Where',date:'28 December 2026',directions:'Get directions ↗',calendar:'Add to calendar ↗',poster:'Download the poster ↓',ticketInfo:'Tickets and updates',ticketTitle:'See you at the show.',ticketIntro:'Leave your email to receive ticket and concert updates.',buy:'Buy on Vivaticket ↗',email:'Your email',notify:'Notify me',finePrint:'Concert updates only. To unsubscribe, reply to one of our emails with “CANCELLAMI”.',close:'Close',audioOn:'Play music',audioOff:'Mute music',audioError:'Audio is unavailable. Please try again.',pending:'Sending…',success:'You’re on the list. We’ll keep you updated by email.',error:'Could not subscribe. Please try again.'},
    es: {info:'El concierto',language:'Idioma',tickets:'Entradas',intro:'Una noche con un icono del espectáculo italiano.',when:'Cuándo',where:'Dónde',date:'28 de diciembre de 2026',directions:'Cómo llegar ↗',calendar:'Añadir al calendario ↗',poster:'Descargar el cartel ↓',ticketInfo:'Entradas y novedades',ticketTitle:'Nos vemos en el concierto.',ticketIntro:'Deja tu email para recibir novedades sobre las entradas y el concierto.',buy:'Comprar en Vivaticket ↗',email:'Tu email',notify:'Avísame',finePrint:'Solo novedades del concierto. Para darte de baja, responde a un email con “CANCELLAMI”.',close:'Cerrar',audioOn:'Activar música',audioOff:'Silenciar música',audioError:'Audio no disponible. Inténtalo de nuevo.',pending:'Enviando…',success:'Estás en la lista. Te informaremos por email.',error:'No se pudo completar la inscripción. Inténtalo de nuevo.'},
    pt: {info:'O concerto',language:'Idioma',tickets:'Bilhetes',intro:'Uma noite com um ícone do espetáculo italiano.',when:'Quando',where:'Onde',date:'28 de dezembro de 2026',directions:'Como chegar ↗',calendar:'Adicionar ao calendário ↗',poster:'Descarregar o cartaz ↓',ticketInfo:'Bilhetes e novidades',ticketTitle:'Até ao concerto.',ticketIntro:'Deixa o teu email para receber novidades sobre os bilhetes e o concerto.',buy:'Comprar na Vivaticket ↗',email:'O teu email',notify:'Avisar-me',finePrint:'Apenas novidades do concerto. Para cancelar, responde a um email com “CANCELLAMI”.',close:'Fechar',audioOn:'Ativar música',audioOff:'Silenciar música',audioError:'Áudio indisponível. Tenta novamente.',pending:'A enviar…',success:'Estás na lista. Enviaremos novidades por email.',error:'Não foi possível concluir a inscrição. Tenta novamente.'},
    fr: {info:'Le concert',language:'Langue',tickets:'Billets',intro:'Une nuit avec une icône du spectacle italien.',when:'Quand',where:'Où',date:'28 décembre 2026',directions:'Itinéraire ↗',calendar:'Ajouter au calendrier ↗',poster:'Télécharger l’affiche ↓',ticketInfo:'Billets et actualités',ticketTitle:'Rendez-vous au concert.',ticketIntro:'Laisse ton email pour recevoir les nouveautés sur les billets et le concert.',buy:'Acheter sur Vivaticket ↗',email:'Ton email',notify:'Me prévenir',finePrint:'Uniquement les actualités du concert. Pour te désinscrire, réponds à un email avec « CANCELLAMI ».',close:'Fermer',audioOn:'Activer la musique',audioOff:'Couper la musique',audioError:'Audio indisponible. Réessaie plus tard.',pending:'Envoi…',success:'Tu es sur la liste. Nous te tiendrons au courant par email.',error:'Inscription impossible. Réessaie plus tard.'}
  };
  const extraCopy = {
    "it": {
      "menu": "Menu", "home": "Home", "merch": "Merchandising", "join": "Iscriviti", "updates": "Ricevi gli aggiornamenti", "soon": "In arrivo",
      "merchIntro": "La collezione dedicata a “The Show Must Go On” è in arrivo. Iscriviti per ricevere le novità e scoprire il lancio dello store.",
      "launchNotify": "Avvisami al lancio", "updatesIntro": "Biglietti, concerto e merchandising. Le novità direttamente nella tua email.",
      "countdownTitle": "COUNTDOWN 28 OTTOBRE", "countdownSubtitle": "Apertura Prevendite Ufficiali",
      "cdDays": "GIORNI", "cdHours": "ORE", "cdMins": "MINUTI", "cdSecs": "SECONDI",
      "updatesPrompt": "Inserisci la mail per rimanere aggiornato", "vivaticketCta": "Biglietti Vivaticket"
    },
    "en": {
      "menu": "Menu", "home": "Home", "merch": "Merchandise", "join": "Join", "updates": "Get the latest news", "soon": "Coming soon",
      "merchIntro": "The “The Show Must Go On” collection is coming soon. Join the list for news and the store launch.",
      "launchNotify": "Notify me at launch", "updatesIntro": "Tickets, concert and merchandise. Get the latest news by email.",
      "countdownTitle": "COUNTDOWN OCTOBER 28", "countdownSubtitle": "Official Ticket Presale",
      "cdDays": "DAYS", "cdHours": "HOURS", "cdMins": "MINS", "cdSecs": "SECS",
      "updatesPrompt": "Enter your email to stay updated", "vivaticketCta": "Vivaticket Tickets"
    },
    "es": {
      "menu": "Menú", "home": "Inicio", "merch": "Merchandising", "join": "Suscríbete", "updates": "Recibe las novedades", "soon": "Próximamente",
      "merchIntro": "La colección “The Show Must Go On” llegará pronto. Suscríbete para conocer las novedades y el lanzamiento de la tienda.",
      "launchNotify": "Avísame del lanzamiento", "updatesIntro": "Entradas, concierto y merchandising. Las novedades en tu email.",
      "countdownTitle": "COUNTDOWN 28 OCTUBRE", "countdownSubtitle": "Venta Oficial de Entradas",
      "cdDays": "DÍAS", "cdHours": "HORAS", "cdMins": "MINS", "cdSecs": "SEGS",
      "updatesPrompt": "Introduce tu email para estar al día", "vivaticketCta": "Entradas Vivaticket"
    },
    "pt": {
      "menu": "Menu", "home": "Início", "merch": "Merchandising", "join": "Subscrever", "updates": "Recebe as novidades", "soon": "Em breve",
      "merchIntro": "A coleção “The Show Must Go On” chega em breve. Subscreve para receber novidades e saber do lançamento da loja.",
      "launchNotify": "Avisar-me no lançamento", "updatesIntro": "Bilhetes, concerto e merchandising. Novidades por email.",
      "countdownTitle": "COUNTDOWN 28 OUTUBRO", "countdownSubtitle": "Venda Oficial de Bilhetes",
      "cdDays": "DIAS", "cdHours": "HORAS", "cdMins": "MINS", "cdSecs": "SEGS",
      "updatesPrompt": "Insere o teu email para ficar a par", "vivaticketCta": "Bilhetes Vivaticket"
    },
    "de": {
      "menu": "Menü", "home": "Startseite", "merch": "Merchandise", "join": "Anmelden", "updates": "Neuigkeiten per E-Mail", "soon": "Demnächst",
      "merchIntro": "Die Kollektion „The Show Must Go On“ erscheint bald. Melde dich für Neuigkeiten und den Start des Shops an.",
      "launchNotify": "Zum Start informieren", "updatesIntro": "Tickets, Konzert und Merchandise. Neuigkeiten direkt per E-Mail.",
      "countdownTitle": "COUNTDOWN 28. OKTOBER", "countdownSubtitle": "Offizieller Vorverkaufsstart",
      "cdDays": "TAGE", "cdHours": "STD", "cdMins": "MIN", "cdSecs": "SEK",
      "updatesPrompt": "E-Mail eingeben, um auf dem Laufenden zu bleiben", "vivaticketCta": "Vivaticket Tickets"
    },
    "fr": {
      "menu": "Menu", "home": "Accueil", "merch": "Merchandising", "join": "M’inscrire", "updates": "Recevoir les nouveautés", "soon": "Bientôt",
      "merchIntro": "La collection « The Show Must Go On » arrive bientôt. Inscris-toi pour les nouveautés et le lancement de la boutique.",
      "launchNotify": "Me prévenir au lancement", "updatesIntro": "Billets, concert et merchandising. Les nouveautés par email.",
      "countdownTitle": "COUNTDOWN 28 OCTOBRE", "countdownSubtitle": "Ouverture Billetterie Officielle",
      "cdDays": "JOURS", "cdHours": "HEURES", "cdMins": "MINS", "cdSecs": "SECS",
      "updatesPrompt": "Entrez votre email pour rester informé", "vivaticketCta": "Billets Vivaticket"
    }
  };
  Object.keys(copy).forEach(lang=>Object.assign(copy[lang],extraCopy[lang]));
  let language = 'it';
  try { const saved = localStorage.getItem('carra_language'); if (copy[saved]) language = saved; } catch {}
  const get = id => document.getElementById(id);
  const audioButton = get('audioButton');
  const forms = [...document.querySelectorAll('[data-subscribe]')];
  const statusFor = form => get(form.querySelector('input').getAttribute('aria-describedby'));
  let activeForm = null;
  let submitting = false;
  let audio;
  let audioPending = false;
  const t = key => copy[language][key];
  function audioLabel() {
    const label = t(audio && !audio.paused ? 'audioOff' : 'audioOn');
    audioButton.setAttribute('aria-label', label); audioButton.title = label;
    audioButton.setAttribute('aria-pressed', String(Boolean(audio && !audio.paused)));
  }
  function setLanguage(value) {
    if (!copy[value]) return;
    language = value; document.documentElement.lang = value; get('language').value = value;
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
    document.querySelectorAll('.close-button[data-close]').forEach(el => el.setAttribute('aria-label', t('close')));
    get('language').setAttribute('aria-label', t('language'));
    document.querySelectorAll('[data-subscribe-status]').forEach(status=>{if(status.dataset.statusKey)status.textContent=t(status.dataset.statusKey);});
    get('homeEmail').setAttribute('aria-label',t('email'));
    if (submitting && activeForm) activeForm.querySelector('button').textContent = t('pending');
    audioLabel();
    try { localStorage.setItem('carra_language',value); } catch {}
  }
  get('language').addEventListener('change',e=>setLanguage(e.target.value));
  setLanguage(language);

  // Pointer depth applies only to separate art layers; the original face is not distorted.
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const scene = document.querySelector('.experience');
  let frame = 0;
  function resetDepth() { scene.style.setProperty('--px','0px'); scene.style.setProperty('--py','0px'); }
  document.addEventListener('pointermove', event => {
    if (motion.matches || !pointer.matches || document.querySelector('dialog[open]')) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      scene.style.setProperty('--px', ((event.clientX / innerWidth - .5) * 9).toFixed(2)+'px');
      scene.style.setProperty('--py', ((event.clientY / innerHeight - .5) * 5).toFixed(2)+'px');
    });
  }, {passive:true});
  document.documentElement.addEventListener('pointerleave',resetDepth);
  motion.addEventListener('change',resetDepth);

  // The native dialog provides focus containment, Escape and background inertness.
  let dialogReturnFocus = null;
  function openDialog(id) {
    if(!document.querySelector('dialog[open]')) dialogReturnFocus=document.activeElement;
    document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
    const dialog = get(id); if (!dialog) return; dialog.showModal();
    get('menuButton').setAttribute('aria-expanded',String(id==='menuDialog'));
    if(id==='newsletterDialog' && !get('updatesForm').hidden) get('updatesEmail').focus();
  }
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]') && dialogReturnFocus?.isConnected && !dialogReturnFocus.closest('dialog'))dialogReturnFocus.focus();}));
  get('menuDialog').addEventListener('close',()=>get('menuButton').setAttribute('aria-expanded','false'));
  document.querySelectorAll('[data-open]').forEach(button=>button.addEventListener('click',()=>openDialog(button.dataset.open)));
  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
  document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',event=>{
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom) dialog.close();
  }));

  // Optional exact event URL; never substitute a general ticketing homepage.
  const configuredUrl = window.CARRA_CONFIG?.ticketUrl;
  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      if(url.protocol === 'https:' && (url.hostname === 'vivaticket.com' || url.hostname.endsWith('.vivaticket.com'))) {
        get('purchaseLink').href = url.href; get('purchaseLink').hidden = false;
      }
    } catch {}
  }

  // Try audible autoplay; browsers that require a gesture are retried on interaction.
  let autoplayWanted = true;
  let resumeAfterVisibility = false;
  audio = new Audio('rumore.mp3');
  audio.loop = true; audio.volume = .35; audio.preload = 'auto';
  audio.addEventListener('pause',audioLabel); audio.addEventListener('play',audioLabel);
  async function playMusic(manual = false) {
    if(audioPending || document.hidden) return;
    audioPending = true;
    get('audioStatus').textContent = '';
    try { await audio.play(); autoplayWanted = false; }
    catch(error) {
      if(error.name === 'NotAllowedError') autoplayWanted = true;
      else if(manual) get('audioStatus').textContent = t('audioError');
    } finally { audioPending = false; audioLabel(); }
  }
  audioButton.addEventListener('click',()=>{
    if(audioPending) return;
    if(!audio.paused) { autoplayWanted = false; resumeAfterVisibility = false; audio.pause(); }
    else playMusic(true);
  });
  function unlockAudio(event) {
    if(!event.isTrusted || event.target.closest?.('#audioButton') || !autoplayWanted) return;
    if(event.type === 'keydown' && (event.ctrlKey || event.metaKey || event.altKey)) return;
    playMusic();
  }
  document.addEventListener('click',unlockAudio);
  document.addEventListener('keydown',unlockAudio);
  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('is-hidden',document.hidden);
    if(document.hidden) { resumeAfterVisibility = !audio.paused; audio.pause(); }
    else if(resumeAfterVisibility || autoplayWanted) { resumeAfterVisibility = false; playMusic(); }
  });
  playMusic();

  function showSubscribed() {
    forms.forEach(form=>{form.hidden=true;const status=statusFor(form);status.dataset.statusKey='success';status.textContent=t('success');});
  }
  forms.forEach(form=>form.addEventListener('submit',async event=>{
    event.preventDefault();
    const email=form.querySelector('input'); email.value=email.value.trim();
    if(submitting || !form.reportValidity()) return;
    const button=form.querySelector('button'),status=statusFor(form);
    submitting=true;activeForm=form;forms.forEach(f=>f.querySelector('button').disabled=true);
    button.textContent=t('pending');form.setAttribute('aria-busy','true');status.dataset.statusKey='';status.textContent='';
    const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),12000);
    try {
      const response=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:email.value}),signal:controller.signal});
      if(!response.ok) throw new Error('Subscription failed');
      const result=await response.json();if(result.success!==true)throw new Error('Invalid response');
      showSubscribed();try{localStorage.setItem('carra_subscribed','true');}catch{}
    } catch {status.dataset.statusKey='error';status.textContent=t('error');}
    finally {
      clearTimeout(timeout);submitting=false;activeForm=null;
      forms.forEach(f=>{const b=f.querySelector('button');b.disabled=false;b.textContent=t(b.dataset.t);});
      form.removeAttribute('aria-busy');
    }
  }));
  try{if(localStorage.getItem('carra_subscribed')==='true')showSubscribed();}catch{}

  get('calendarButton').addEventListener('click',()=>{
    const stamp = new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
    const content = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Carra Hologram//Concert//IT','BEGIN:VEVENT','UID:carra-20261228@raffaellalivefromheaven.com','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:20261228','DTEND;VALUE=DATE:20261229','SUMMARY:Raffaella Carrà - The Show Must Go On','LOCATION:Atlantico - Roma','DESCRIPTION:Official Hologram Concert. Orario da verificare sul biglietto.','END:VEVENT','END:VCALENDAR',''].join('\r\n');
    const url = URL.createObjectURL(new Blob([content],{type:'text/calendar;charset=utf-8'})); const a=document.createElement('a');a.href=url;a.download='Raffaella_Carra_28_dicembre_2026.ics';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });

  // Extend only the outer 20px of scenery. Figure, text and logos keep one scale.
  const poster=document.querySelector('.poster-art');
  const posterFrame=document.querySelector('.poster-frame');
  const posterCanvas=document.querySelector('.poster-canvas');
  const posterContext=posterCanvas.getContext('2d');
  let posterRenderFrame=0;
  const rtlBackgrounds = {};
  for(const orientation of ['desktop','mobile']) {
    const background = new Image();
    background.addEventListener('load',schedulePoster);
    background.src = 'rtl-background-'+orientation+'.png';
    rtlBackgrounds[orientation] = background;
  }
  // Only use the generated background in the caption/logo area, never the figure or titles.
  function cleanRadioArea(context,poster,background,iw,ih,x,y,scale) {
    if(!background.complete || !background.naturalWidth) return;
    const desktop=iw>ih;
    const regions=desktop?[[664,712,184,19],[707,730,102,101]]:[[332,1102,199,20],[377,1124,109,109]];
    for(const [left,top,width,height] of regions) {
      const patch=document.createElement('canvas');patch.width=width+24;patch.height=height+24;
      const ctx=patch.getContext('2d');
      ctx.drawImage(background,(left-12)*background.naturalWidth/iw,(top-12)*background.naturalHeight/ih,(width+24)*background.naturalWidth/iw,(height+24)*background.naturalHeight/ih,0,0,patch.width,patch.height);
      ctx.globalCompositeOperation='destination-in';
      for(const horizontal of [true,false]) {
        const length=horizontal?patch.width:patch.height;
        const gradient=ctx.createLinearGradient(0,0,horizontal?length:0,horizontal?0:length);
        gradient.addColorStop(0,'transparent');gradient.addColorStop(12/length,'black');gradient.addColorStop(1-12/length,'black');gradient.addColorStop(1,'transparent');
        ctx.fillStyle=gradient;ctx.fillRect(0,0,patch.width,patch.height);
      }
      context.drawImage(patch,x+(left-12)*scale,y+(top-12)*scale,patch.width*scale,patch.height*scale);
    }
    // Copy the original round logo itself, shifted down by only a few pixels.
    const [cx,cy,r,shift]=desktop?[758,780,46,14]:[431,1177,49,20];
    context.save();context.beginPath();context.arc(x+cx*scale,y+(cy+shift)*scale,r*scale,0,Math.PI*2);context.clip();
    context.drawImage(poster,cx-r,cy-r,r*2,r*2,x+(cx-r)*scale,y+(cy-r+shift)*scale,r*2*scale,r*2*scale);context.restore();
  }
  function renderPoster(){
    posterRenderFrame=0;
    if(!poster.complete||!poster.naturalWidth||!posterContext)return;
    const bounds=posterFrame.getBoundingClientRect(),w=bounds.width,h=bounds.height;
    if(!w||!h)return;
    const ratio=Math.min(devicePixelRatio||1,2),iw=poster.naturalWidth,ih=poster.naturalHeight;
    posterCanvas.width=Math.round(w*ratio);posterCanvas.height=Math.round(h*ratio);
    posterContext.setTransform(ratio,0,0,ratio,0,0);
    posterContext.imageSmoothingEnabled=true;posterContext.imageSmoothingQuality='high';
    const scale=Math.min(w/iw,h/ih),x=(w-iw*scale)/2,y=(h-ih*scale)/2,edge=20;
    const sx=[0,edge,iw-edge,iw],sy=[0,edge,ih-edge,ih];
    const dx=[0,x+edge*scale,x+(iw-edge)*scale,w],dy=[0,y+edge*scale,y+(ih-edge)*scale,h];
    for(let row=0;row<3;row++)for(let col=0;col<3;col++){
      posterContext.drawImage(poster,sx[col],sy[row],sx[col+1]-sx[col],sy[row+1]-sy[row],dx[col],dy[row],dx[col+1]-dx[col],dy[row+1]-dy[row]);
    }
    cleanRadioArea(posterContext,poster,rtlBackgrounds[iw>ih?'desktop':'mobile'],iw,ih,x,y,scale);
    document.documentElement.style.setProperty('--poster-ticket-y',(bounds.top+y+ih*scale*.636)+'px');
    posterFrame.style.setProperty('--poster-x', x.toFixed(2)+'px');
    posterFrame.style.setProperty('--poster-y', y.toFixed(2)+'px');
    posterFrame.style.setProperty('--poster-w', (iw*scale).toFixed(2)+'px');
    posterFrame.style.setProperty('--poster-h', (ih*scale).toFixed(2)+'px');
    posterFrame.classList.add('is-rendered');
  }
  function schedulePoster(){if(!posterRenderFrame)posterRenderFrame=requestAnimationFrame(renderPoster);}
  poster.addEventListener('load',schedulePoster);
  new ResizeObserver(schedulePoster).observe(posterFrame);
  window.addEventListener('resize',schedulePoster);
  schedulePoster();

  // Live countdown to 28 Ottobre
  function updateCountdown() {
    const targetConfig = window.CARRA_CONFIG?.countdownTarget || '2026-10-28T00:00:00+02:00';
    let target = new Date(targetConfig);
    const now = new Date();
    if (isNaN(target.getTime())) {
      target = new Date('2026-10-28T00:00:00+02:00');
    }
    let diff = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
    const d = Math.floor(diff / 86400);
    diff %= 86400;
    const h = Math.floor(diff / 3600);
    diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;

    const pad = n => String(n).padStart(2, '0');
    const elD = get('cdDays');
    const elH = get('cdHours');
    const elM = get('cdMins');
    const elS = get('cdSecs');

    if (elD && elD.textContent !== String(d)) elD.textContent = String(d);
    if (elH && elH.textContent !== pad(h)) elH.textContent = pad(h);
    if (elM && elM.textContent !== pad(m)) elM.textContent = pad(m);
    if (elS && elS.textContent !== pad(s)) elS.textContent = pad(s);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Subtle interactive sparkle enhancement when cursor is near the Carrà title
  const sparklesLayer = document.querySelector('.carra-sparkles');
  if (sparklesLayer) {
    document.addEventListener('pointermove', event => {
      if (document.hidden || motion.matches) return;
      const b = sparklesLayer.getBoundingClientRect();
      if (!b.width || !b.height) return;
      const inMarquee = event.clientY >= b.top - 20 &&
                        event.clientY <= b.top + b.height * 0.38 &&
                        event.clientX >= b.left - 20 &&
                        event.clientX <= b.right + 20;
      sparklesLayer.classList.toggle('is-hovered', inMarquee);
    }, { passive: true });
  }
})();
