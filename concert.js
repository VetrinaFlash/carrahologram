'use strict';
(() => {
  const copy = {
    it: {info:'Il concerto',language:'Lingua',tickets:'Biglietti',intro:'Una notte con l’icona dello spettacolo italiano.',when:'Quando',where:'Dove',date:'28 dicembre 2026',directions:'Come arrivare ↗',calendar:'Aggiungi al calendario ↗',poster:'Scarica la locandina ↓',ticketInfo:'Biglietti e aggiornamenti',ticketTitle:'Ci vediamo sotto il palco.',ticketIntro:'Lascia la tua email per ricevere le novità sui biglietti e sul concerto.',buy:'Acquista su Vivaticket ↗',email:'La tua email',notify:'Avvisami',finePrint:'Solo aggiornamenti sul concerto. Per cancellarti, rispondi a una nostra email con “CANCELLAMI”.',close:'Chiudi',audioOn:'Attiva la musica',audioOff:'Disattiva la musica',audioError:'Audio non disponibile. Riprova tra poco.',pending:'Invio…',success:'Sei nella lista. Ti aggiorneremo via email.',error:'Iscrizione non riuscita. Riprova tra poco.'},
    en: {info:'The concert',language:'Language',tickets:'Tickets',intro:'A night with an icon of Italian entertainment.',when:'When',where:'Where',date:'28 December 2026',directions:'Get directions ↗',calendar:'Add to calendar ↗',poster:'Download the poster ↓',ticketInfo:'Tickets and updates',ticketTitle:'See you at the show.',ticketIntro:'Leave your email to receive ticket and concert updates.',buy:'Buy on Vivaticket ↗',email:'Your email',notify:'Notify me',finePrint:'Concert updates only. To unsubscribe, reply to one of our emails with “CANCELLAMI”.',close:'Close',audioOn:'Play music',audioOff:'Mute music',audioError:'Audio is unavailable. Please try again.',pending:'Sending…',success:'You’re on the list. We’ll keep you updated by email.',error:'Could not subscribe. Please try again.'},
    es: {info:'El concierto',language:'Idioma',tickets:'Entradas',intro:'Una noche con un icono del espectáculo italiano.',when:'Cuándo',where:'Dónde',date:'28 de diciembre de 2026',directions:'Cómo llegar ↗',calendar:'Añadir al calendario ↗',poster:'Descargar el cartel ↓',ticketInfo:'Entradas y novedades',ticketTitle:'Nos vemos en el concierto.',ticketIntro:'Deja tu email para recibir novedades sobre las entradas y el concierto.',buy:'Comprar en Vivaticket ↗',email:'Tu email',notify:'Avísame',finePrint:'Solo novedades del concierto. Para darte de baja, responde a un email con “CANCELLAMI”.',close:'Cerrar',audioOn:'Activar música',audioOff:'Silenciar música',audioError:'Audio no disponible. Inténtalo de nuevo.',pending:'Enviando…',success:'Estás en la lista. Te informaremos por email.',error:'No se pudo completar la inscripción. Inténtalo de nuevo.'},
    pt: {info:'O concerto',language:'Idioma',tickets:'Bilhetes',intro:'Uma noite com um ícone do espetáculo italiano.',when:'Quando',where:'Onde',date:'28 de dezembro de 2026',directions:'Como chegar ↗',calendar:'Adicionar ao calendário ↗',poster:'Descarregar o cartaz ↓',ticketInfo:'Bilhetes e novidades',ticketTitle:'Até ao concerto.',ticketIntro:'Deixa o teu email para receber novidades sobre os bilhetes e o concerto.',buy:'Comprar na Vivaticket ↗',email:'O teu email',notify:'Avisar-me',finePrint:'Apenas novidades do concerto. Para cancelar, responde a um email com “CANCELLAMI”.',close:'Fechar',audioOn:'Ativar música',audioOff:'Silenciar música',audioError:'Áudio indisponível. Tenta novamente.',pending:'A enviar…',success:'Estás na lista. Enviaremos novidades por email.',error:'Não foi possível concluir a inscrição. Tenta novamente.'},
    de: {info:'Das Konzert',language:'Sprache',tickets:'Tickets',intro:'Ein Abend mit einer Ikone der italienischen Unterhaltung.',when:'Wann',where:'Wo',date:'28. Dezember 2026',directions:'Anfahrt ↗',calendar:'Zum Kalender hinzufügen ↗',poster:'Poster herunterladen ↓',ticketInfo:'Tickets und Neuigkeiten',ticketTitle:'Wir sehen uns beim Konzert.',ticketIntro:'Hinterlasse deine E-Mail-Adresse für Neuigkeiten zu Tickets und Konzert.',buy:'Bei Vivaticket kaufen ↗',email:'Deine E-Mail-Adresse',notify:'Informieren',finePrint:'Nur Konzertneuigkeiten. Zum Abmelden antworte auf eine unserer E-Mails mit „CANCELLAMI“.',close:'Schließen',audioOn:'Musik einschalten',audioOff:'Musik ausschalten',audioError:'Audio ist nicht verfügbar. Bitte erneut versuchen.',pending:'Senden…',success:'Du bist auf der Liste. Neuigkeiten kommen per E-Mail.',error:'Anmeldung fehlgeschlagen. Bitte erneut versuchen.'},
    fr: {info:'Le concert',language:'Langue',tickets:'Billets',intro:'Une nuit avec une icône du spectacle italien.',when:'Quand',where:'Où',date:'28 décembre 2026',directions:'Itinéraire ↗',calendar:'Ajouter au calendrier ↗',poster:'Télécharger l’affiche ↓',ticketInfo:'Billets et actualités',ticketTitle:'Rendez-vous au concert.',ticketIntro:'Laisse ton email pour recevoir les nouveautés sur les billets et le concert.',buy:'Acheter sur Vivaticket ↗',email:'Ton email',notify:'Me prévenir',finePrint:'Uniquement les actualités du concert. Pour te désinscrire, réponds à un email avec « CANCELLAMI ».',close:'Fermer',audioOn:'Activer la musique',audioOff:'Couper la musique',audioError:'Audio indisponible. Réessaie plus tard.',pending:'Envoi…',success:'Tu es sur la liste. Nous te tiendrons au courant par email.',error:'Inscription impossible. Réessaie plus tard.'}
  };
  const extraCopy = {"it": {"menu": "Menu", "home": "Home", "merch": "Merchandising", "join": "Iscriviti", "updates": "Ricevi gli aggiornamenti", "soon": "In arrivo", "merchIntro": "La collezione dedicata a “The Show Must Go On” è in arrivo. Iscriviti per ricevere le novità e scoprire il lancio dello store.", "launchNotify": "Avvisami al lancio", "updatesIntro": "Biglietti, concerto e merchandising. Le novità direttamente nella tua email."}, "en": {"menu": "Menu", "home": "Home", "merch": "Merchandise", "join": "Join the list", "updates": "Get the latest news", "soon": "Coming soon", "merchIntro": "The “The Show Must Go On” collection is coming soon. Join the list for news and the store launch.", "launchNotify": "Notify me at launch", "updatesIntro": "Tickets, concert and merchandise. Get the latest news by email."}, "es": {"menu": "Menú", "home": "Inicio", "merch": "Merchandising", "join": "Suscríbete", "updates": "Recibe las novedades", "soon": "Próximamente", "merchIntro": "La colección “The Show Must Go On” llegará pronto. Suscríbete para conocer las novedades y el lanzamiento de la tienda.", "launchNotify": "Avísame del lanzamiento", "updatesIntro": "Entradas, concierto y merchandising. Las novedades en tu email."}, "pt": {"menu": "Menu", "home": "Início", "merch": "Merchandising", "join": "Subscrever", "updates": "Recebe as novidades", "soon": "Em breve", "merchIntro": "A coleção “The Show Must Go On” chega em breve. Subscreve para receber novidades e saber do lançamento da loja.", "launchNotify": "Avisar-me no lançamento", "updatesIntro": "Bilhetes, concerto e merchandising. Novidades por email."}, "de": {"menu": "Menü", "home": "Startseite", "merch": "Merchandise", "join": "Anmelden", "updates": "Neuigkeiten per E-Mail", "soon": "Demnächst", "merchIntro": "Die Kollektion „The Show Must Go On“ erscheint bald. Melde dich für Neuigkeiten und den Start des Shops an.", "launchNotify": "Zum Start informieren", "updatesIntro": "Tickets, Konzert und Merchandise. Neuigkeiten direkt per E-Mail."}, "fr": {"menu": "Menu", "home": "Accueil", "merch": "Merchandising", "join": "M’inscrire", "updates": "Recevoir les nouveautés", "soon": "Bientôt", "merchIntro": "La collection « The Show Must Go On » arrive bientôt. Inscris-toi pour les nouveautés et le lancement de la boutique.", "launchNotify": "Me prévenir au lancement", "updatesIntro": "Billets, concert et merchandising. Les nouveautés par email."}};
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

  audioButton.addEventListener('click',async()=>{
    if(audioPending) return;
    get('audioStatus').textContent = '';
    if(!audio) { audio = new Audio('rumore.mp4'); audio.loop = true; audio.volume = .35; audio.preload = 'none'; audio.addEventListener('pause',audioLabel); audio.addEventListener('play',audioLabel); }
    if(!audio.paused) { audio.pause(); audioLabel(); return; }
    audioPending = true;
    try { await audio.play(); } catch { get('audioStatus').textContent = t('audioError'); }
    finally { audioPending = false; audioLabel(); }
  });
  document.addEventListener('visibilitychange',()=>{
    document.body.classList.toggle('is-hidden', document.hidden);
    if(document.hidden && audio) audio.pause();
  });

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
})();
