const screens = [...document.querySelectorAll(".screen")];
const journeyLinks = [...document.querySelectorAll(".journey-nav a")];
const confettiLayer = document.querySelector("#confetti-layer");
const envelopeButton = document.querySelector("#open-envelope");
const letterTitle = document.querySelector("#letter-title");
const letterCopy = document.querySelector("#letter-copy");
const blowButton = document.querySelector("#blow-button");
const birthdayReveal = document.querySelector("#birthday-reveal");
const celebrationBurst = document.querySelector("#celebration-burst");
const nextNote = document.querySelector("#next-note");
const cakeScreen = document.querySelector("#cake");

const colors = ["#f5d68c", "#f19bb4", "#c8b8fb", "#a9d8e8", "#fff4d6", "#d9a8e8"];
const validScreens = new Set(screens.map((screen) => screen.id));
let envelopeOpened = false;
let candlesBlown = false;
let currentScreenId = null;

function showScreen() {
  const requested = window.location.hash.slice(1);
  const screenId = validScreens.has(requested) ? requested : "letter";

  if (!validScreens.has(requested)) {
    window.history.replaceState(null, "", "#letter");
  }

  if (screenId === "letter" && currentScreenId && currentScreenId !== "letter") {
    envelopeOpened = false;
    candlesBlown = false;
    envelopeButton.classList.remove("opening");
    envelopeButton.querySelector(".envelope-hint").textContent = "OPEN YOUR SUN-KISSED LETTER";
    letterTitle.innerHTML = "A special delivery<br>from the <em>Sun</em><br>to the <em>Star</em>";
    letterCopy.innerHTML = "The Sun has sent a little something across the galaxy,<br>and it has your name written in stardust.";
    document.querySelector("#cake-hint").hidden = false;
    cakeScreen.classList.remove("celebrated");
    birthdayReveal.hidden = true;
    celebrationBurst.replaceChildren();
    nextNote.hidden = true;
    document.querySelector("#cake-hint").textContent = "Tap the button to blow out the candles.";
  }

  currentScreenId = screenId;

  for (const screen of screens) {
    const active = screen.id === screenId;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  }

  for (const link of journeyLinks) {
    if (link.hash === `#${screenId}`) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function celebrate() {
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < 120; index += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[index % colors.length];
    piece.style.setProperty("--drift", `${Math.random() * 220 - 110}px`);
    piece.style.animationDelay = `${Math.random() * 1.1}s`;
    fragment.append(piece);
  }
  confettiLayer.replaceChildren(fragment);
  window.setTimeout(() => confettiLayer.replaceChildren(), 5000);
}

function launchPartyEmojis() {
  const partyEmojis = ["💖", "🌸", "💗", "🌼", "💕", "🌷", "✨", "💐", "💝", "🌺"];
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 36; index += 1) {
    const emoji = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 36;
    const distance = 90 + Math.random() * 150;
    emoji.className = "party-emoji";
    emoji.textContent = partyEmojis[index % partyEmojis.length];
    emoji.style.setProperty("--travel-x", `${Math.cos(angle) * distance}px`);
    emoji.style.setProperty("--travel-y", `${Math.sin(angle) * distance}px`);
    emoji.style.setProperty("--spin", `${Math.random() * 90 - 45}deg`);
    emoji.style.animationDelay = `${Math.random() * 0.45}s`;
    fragment.append(emoji);
  }

  celebrationBurst.replaceChildren(fragment);
  window.setTimeout(() => celebrationBurst.replaceChildren(), 3500);
}

envelopeButton.addEventListener("click", () => {
  if (envelopeOpened) return;
  envelopeOpened = true;
  envelopeButton.classList.add("opening");
  letterTitle.innerHTML = "From the Sun,<br>to its brightest<br><em>Star</em>";
  letterCopy.innerHTML = "A little sunshine, a whole lot of love,<br>and a birthday surprise made just for you.";
  envelopeButton.querySelector(".letter-paper").innerHTML = "<span>From the Sun</span><span>To the Star</span>";
  envelopeButton.querySelector(".envelope-hint").textContent = "A LITTLE SUNSHINE IS ON ITS WAY...";
  window.setTimeout(() => { window.location.hash = "surprise"; }, 2000);
});

blowButton.addEventListener("click", () => {
  if (candlesBlown) return;
  candlesBlown = true;
  cakeScreen.classList.add("celebrated");
  birthdayReveal.hidden = false;
  nextNote.hidden = false;
  document.querySelector("#cake-hint").hidden = true;
  celebrate();
  launchPartyEmojis();
});

window.addEventListener("hashchange", showScreen);
showScreen();
