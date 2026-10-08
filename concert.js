/* Additional sections share the existing six-language switcher. */
const sectionCopy = {
  it: [
    "IL CONCERTO",
    "Scopri il concerto ↓",
    "UNA NOTTE. UN’ICONA.",
    "Preparati a fare rumore.",
    "L’Official Hologram Concert di Raffaella Carrà. Il 28 dicembre 2026, all’Atlantico di Roma.",
    "QUANDO",
    "Segna la data. Lo show continua.",
    "Aggiungi al calendario ↗",
    "DOVE",
    "La tua prossima notte di musica dal vivo.",
    "Come arrivare ↗",
    "BIGLIETTI",
    "VIVI LO SHOW",
    "Tutte le informazioni sulla prevendita.",
    "Scopri la prevendita ↗",
    "RESTA IN PRIMA FILA",
    "Non perdere<br>il prossimo annuncio.",
    "Date, biglietti e novità. Tutto dalla lista ufficiale.",
    "La tua email",
    "ATTENDI…",
    "Non è stato possibile completare l’iscrizione. Riprova tra qualche istante.",
  ],
  en: [
    "THE CONCERT",
    "Discover the concert ↓",
    "ONE NIGHT. ONE ICON.",
    "Get ready to make some noise.",
    "Raffaella Carrà’s Official Hologram Concert. December 28, 2026, at Atlantico in Rome.",
    "WHEN",
    "Save the date. The show goes on.",
    "Add to calendar ↗",
    "WHERE",
    "Your next night of live music.",
    "Get directions ↗",
    "TICKETS",
    "EXPERIENCE THE SHOW",
    "All the information about pre-sales.",
    "Discover pre-sales ↗",
    "STAY IN THE FRONT ROW",
    "Don’t miss<br>the next announcement.",
    "Dates, tickets and news. From the official list.",
    "Your email",
    "PLEASE WAIT…",
    "We couldn’t complete your subscription. Please try again shortly.",
  ],
  es: [
    "EL CONCIERTO",
    "Descubre el concierto ↓",
    "UNA NOCHE. UN ICONO.",
    "Prepárate para hacer ruido.",
    "El Official Hologram Concert de Raffaella Carrà. El 28 de diciembre de 2026, en Atlantico, Roma.",
    "CUÁNDO",
    "Anota la fecha. El espectáculo continúa.",
    "Añadir al calendario ↗",
    "DÓNDE",
    "Tu próxima noche de música en directo.",
    "Cómo llegar ↗",
    "ENTRADAS",
    "VIVE EL ESPECTÁCULO",
    "Toda la información sobre la preventa.",
    "Descubre la preventa ↗",
    "EN PRIMERA FILA",
    "No te pierdas<br>el próximo anuncio.",
    "Fechas, entradas y noticias de la lista oficial.",
    "Tu email",
    "ESPERA…",
    "No se pudo completar la suscripción. Inténtalo de nuevo en unos instantes.",
  ],
  pt: [
    "O CONCERTO",
    "Descobre o concerto ↓",
    "UMA NOITE. UM ÍCONE.",
    "Prepara-te para fazer barulho.",
    "O Official Hologram Concert de Raffaella Carrà. 28 de dezembro de 2026, no Atlantico, Roma.",
    "QUANDO",
    "Marca a data. O espetáculo continua.",
    "Adicionar ao calendário ↗",
    "ONDE",
    "A tua próxima noite de música ao vivo.",
    "Como chegar ↗",
    "BILHETES",
    "VIVE O ESPETÁCULO",
    "Todas as informações sobre a pré-venda.",
    "Descobre a pré-venda ↗",
    "NA PRIMEIRA FILA",
    "Não percas<br>o próximo anúncio.",
    "Datas, bilhetes e novidades da lista oficial.",
    "O teu email",
    "AGUARDA…",
    "Não foi possível concluir a inscrição. Tenta novamente em instantes.",
  ],
  de: [
    "DAS KONZERT",
    "Konzert entdecken ↓",
    "EINE NACHT. EINE IKONE.",
    "Mach dich bereit für Rumore.",
    "Raffaella Carràs Official Hologram Concert. Am 28. Dezember 2026 im Atlantico in Rom.",
    "WANN",
    "Merke dir das Datum. Die Show geht weiter.",
    "Zum Kalender hinzufügen ↗",
    "WO",
    "Deine nächste Nacht mit Live-Musik.",
    "Anfahrt ↗",
    "TICKETS",
    "ERLEBE DIE SHOW",
    "Alle Informationen zum Vorverkauf.",
    "Vorverkauf entdecken ↗",
    "IN DER ERSTEN REIHE",
    "Verpasse nicht<br>die nächste Ankündigung.",
    "Termine, Tickets und Neuigkeiten aus der offiziellen Liste.",
    "Deine E-Mail",
    "BITTE WARTEN…",
    "Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es gleich noch einmal.",
  ],
  fr: [
    "LE CONCERT",
    "Découvrir le concert ↓",
    "UNE NUIT. UNE ICÔNE.",
    "Préparez-vous à faire du bruit.",
    "L’Official Hologram Concert de Raffaella Carrà. Le 28 décembre 2026 à l’Atlantico, Rome.",
    "QUAND",
    "Notez la date. Le spectacle continue.",
    "Ajouter au calendrier ↗",
    "OÙ",
    "Votre prochaine soirée de musique live.",
    "Itinéraire ↗",
    "BILLETS",
    "VIVEZ LE SPECTACLE",
    "Toutes les informations sur les préventes.",
    "Découvrir les préventes ↗",
    "AU PREMIER RANG",
    "Ne manquez pas<br>la prochaine annonce.",
    "Dates, billets et actualités de la liste officielle.",
    "Votre email",
    "PATIENCE…",
    "L’inscription n’a pas abouti. Veuillez réessayer dans quelques instants.",
  ],
};
const sectionKeys = [
  "navEvent",
  "discover",
  "eventEyebrow",
  "eventHeading",
  "eventIntro",
  "whenLabel",
  "whenText",
  "calendar",
  "whereLabel",
  "whereText",
  "directions",
  "ticketsLabel",
  "ticketHeading",
  "ticketText",
  "ticketDetails",
  "updatesEyebrow",
  "updatesHeading",
  "updatesIntro",
  "emailLabel",
  "pending",
  "formError",
];
Object.entries(sectionCopy).forEach(([code, values]) =>
  sectionKeys.forEach((key, i) => (T[code][key] = values[i])),
);
// Use one fade timer, including fast repeated audio toggles.
let audioFade;
fadeIn = function () {
  clearInterval(audioFade);
  let v = snd.volume;
  audioFade = setInterval(() => {
    v = Math.min(0.65, v + 0.03);
    snd.volume = v;
    if (v >= 0.65) clearInterval(audioFade);
  }, 80);
};
doStop = function () {
  clearInterval(audioFade);
  playing = false;
  abtn.classList.remove("on");
  abtn.setAttribute("aria-pressed", "false");
  if (snd) {
    snd.pause();
    snd.currentTime = 0;
  }
};
let audioPending = false;
doPlay = async function () {
  if (audioPending) return;
  audioPending = true;
  try {
    initSnd();
    snd.volume = 0;
    await snd.play();
    playing = true;
    abtn.classList.add("on");
    abtn.setAttribute("aria-pressed", "true");
    fadeIn();
  } catch {
    playing = false;
    abtn.setAttribute("aria-pressed", "false");
  } finally {
    audioPending = false;
  }
};

let modalReturnFocus = null;
openModal = function (id) {
  const backdrop = document.getElementById(id);
  if (!backdrop) return;
  modalReturnFocus = document.activeElement;
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
  document.querySelector("main").inert = true;
  document.querySelector(".site-header").inert = true;
  const dialog = backdrop.querySelector('[role="dialog"]');
  dialog.setAttribute("aria-labelledby", id + "Title");
  backdrop.querySelector(".modal-title").id = id + "Title";
  backdrop.querySelector(".modal-close").focus();
};
closeModal = function (id) {
  const backdrop = document.getElementById(id);
  if (!backdrop || !backdrop.classList.contains("active")) return;
  backdrop.classList.remove("active");
  document.body.style.overflow = "";
  document.querySelector("main").inert = false;
  document.querySelector(".site-header").inert = false;
  if (modalReturnFocus && modalReturnFocus.isConnected)
    modalReturnFocus.focus({ preventScroll: true });
};
document.addEventListener("keydown", (event) => {
  const active = document.querySelector(".modal-backdrop.active");
  if (active && event.key === "Tab") {
    const focusable = [
      ...active.querySelectorAll('button,a[href],input,[tabindex="0"]'),
    ].filter((el) => !el.disabled);
    const first = focusable[0],
      last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
// A date-only calendar entry: no unconfirmed show time is implied.
document.getElementById("calendarButton").addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Raffaella Concert//IT",
    "BEGIN:VEVENT",
    "UID:carra-20261228@raffaellalivefromheaven.com",
    "DTSTAMP:20261008T000000Z",
    "DTSTART;VALUE=DATE:20261228",
    "DTEND;VALUE=DATE:20261229",
    "SUMMARY:Raffaella Carrà - The Show Must Go On",
    "LOCATION:Atlantico - Roma",
    "DESCRIPTION:Official Hologram Concert. Orario da confermare.",
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
  const url = URL.createObjectURL(
    new Blob([ics], { type: "text/calendar;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "raffaella-carra-28-dicembre-2026.ics";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
const originalLanguageSwitch = L;
L = function (code) {
  originalLanguageSwitch(code);
  try {
    localStorage.setItem("carra_language", lang);
  } catch {}
};
let savedLanguage = "it";
try {
  savedLanguage = localStorage.getItem("carra_language") || "it";
} catch {}
L(T[savedLanguage] ? savedLanguage : "it");
const header = document.querySelector(".site-header");
window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 40),
  { passive: true },
);
// Keep current section visible in navigation without competing with modal links.
const sectionObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        document
          .querySelectorAll(
            '.nav-link[href="#stageViewport"],.nav-link[href="#concert"]',
          )
          .forEach((link) => {
            const on = link.getAttribute("href") === "#" + entry.target.id;
            link.classList.toggle("active", on);
            if (on) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      }
    }
  },
  { rootMargin: "-20% 0px -60% 0px" },
);
["stageViewport", "concert"].forEach((id) =>
  sectionObserver.observe(document.getElementById(id)),
);
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    document.getElementById("mobileDrawer").classList.remove("open");
    document
      .querySelector(".mobile-menu-btn")
      .setAttribute("aria-expanded", "false");
  }
});
