// ── Navigation ──
const navLinks = document.querySelectorAll('.nav-link');
const pages    = document.querySelectorAll('.page');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));

  const target = document.getElementById('pg-' + pageId);

  if (target) {
    target.classList.add('active');

    if (pageId === 'publications') {
      const saved = localStorage.getItem('pubFilter') || 'all';
      setFilter(saved);
    }

    target.querySelectorAll(
      '.home-section, .quote-block, .hero, .pub-card, .update-item, .contact-card, .contact-intro, .pub-header'
    ).forEach(el => {
      el.classList.remove('fade-in');
      requestAnimationFrame(() => observer.observe(el));
    });
  }

  navLinks.forEach(l => {
    if (l.dataset.page === pageId) l.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});


// ── Publication filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const pubCards   = document.querySelectorAll('.pub-card');

function setFilter(filter) {
  // update active button
  filterBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });

  // filter logic
  pubCards.forEach(card => {
    const type = card.dataset.type;
    let show = false;

    if (filter === 'featured') {
      show = type === 'featured';
    } else if (filter === 'all') {
      show = type === 'featured' || type === 'publication';
    } else if (filter === 'other') {
      show = type === 'other';
    }

    card.classList.toggle('hidden', !show);
  });

  pubCards.forEach(card => {
    if (!card.classList.contains('hidden')) {
      card.classList.remove('fade-in');
      requestAnimationFrame(() => observer.observe(card));
    }
  });

  // save preference
  localStorage.setItem('pubFilter', filter);
}

// button clicks
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setFilter(btn.dataset.filter);
  });
});


// ── Lightbox ──
const lightbox       = document.getElementById('lightbox');
const lightboxClose  = document.getElementById('lightbox-close');
const avatarImg      = document.getElementById('avatar-img');

function openLightbox() {
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (avatarImg) {
  avatarImg.addEventListener('click', () => {
    if (avatarImg.style.display !== 'none') openLightbox();
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
}


// ── Scroll fade-in  ──
const fadeEls = document.querySelectorAll(
  '.home-section, .quote-block, .hero, .pub-card, .update-item, .contact-card, .contact-intro, .pub-header'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => observer.observe(el));

// ── HP Easter egg ──
const hpQuotes = [
  { text: "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.", cite: "— Albus Dumbledore" },
  { text: "It does not do to dwell on dreams and forget to live.", cite: "— Albus Dumbledore" },
  { text: "We are only as strong as we are united, as weak as we are divided.", cite: "— Albus Dumbledore" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", cite: "— Albus Dumbledore" },
  { text: "It is our choices, Harry, that show what we truly are, far more than our abilities.", cite: "— Albus Dumbledore" },
  { text: "After all this time? Always.", cite: "— Severus Snape" },
  { text: "To the well-organized mind, death is but the next great adventure.", cite: "— Albus Dumbledore" },
];

const houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

let quoteIndex = 0;
let tooltipTimeout = null;

const eggTrigger = document.getElementById('nav-easter-egg');

const tooltip = document.createElement('div');
tooltip.className = 'easter-tooltip';
tooltip.innerHTML = `
  <div class="easter-tooltip-wand">✦ from the pensieve</div>
  <div class="easter-tooltip-text"></div>
  <div class="easter-tooltip-cite"></div>
`;
document.body.appendChild(tooltip);

const tooltipText = tooltip.querySelector('.easter-tooltip-text');
const tooltipCite = tooltip.querySelector('.easter-tooltip-cite');

function showTooltip() {
  const q = hpQuotes[quoteIndex % hpQuotes.length];
  quoteIndex++;

  tooltipText.textContent = `"${q.text}"`;
  tooltipCite.textContent = q.cite;

  tooltip.classList.remove(...houses);
  const house = houses[Math.floor(Math.random() * houses.length)];
  tooltip.classList.add(house);

  tooltip.classList.add('show');
  clearTimeout(tooltipTimeout);
  tooltipTimeout = setTimeout(() => tooltip.classList.remove('show'), 4000);
}

if (eggTrigger) {
  eggTrigger.addEventListener('mouseenter', showTooltip);

  eggTrigger.addEventListener('mouseleave', () => {
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => tooltip.classList.remove('show'), 400);
  });

  eggTrigger.addEventListener('click', showTooltip);
}

// ── BTS easter egg ──
const btsQuotes = [
  { text: "Go on your path, even if you live for a day. Do something. Put away your weakness.", cite: "— BTS, No More Dream" },
  { text: "If you can't fly, then run. If you can't run, then walk. If you can't walk, then crawl.", cite: "— BTS, Not Today (original quote by Martin Luther King Jr.)" },
  { text: "Life is a sculpture that you cast as you make mistakes and learn from them.", cite: "— RM, BTS" },
  { text: "Don't be trapped in someone else's dream.", cite: "— BTS, N.O" },
  { text: "Dream: you will fully bloom after all the hardships.", cite: "— Suga, BTS" },
  { text: "Run faster than those dark clouds.", cite: "— BTS, Life Goes On" },
];

let btsIndex = Math.floor(Math.random() * btsQuotes.length);
let btsTooltipTimeout = null;

const armyTrigger = document.getElementById('bts-army');

const btsTooltip = document.createElement('div');
btsTooltip.className = 'bts-tooltip';
btsTooltip.innerHTML = `
  <div class="bts-tooltip-label">✦ from the magic shop</div>
  <div class="bts-tooltip-text"></div>
  <div class="bts-tooltip-cite"></div>
`;
document.body.appendChild(btsTooltip);

const btsText = btsTooltip.querySelector('.bts-tooltip-text');
const btsCite = btsTooltip.querySelector('.bts-tooltip-cite');

function showBtsTooltip() {
  const q = btsQuotes[btsIndex % btsQuotes.length];
  btsIndex++;
  btsText.textContent = `"${q.text}"`;
  btsCite.textContent = q.cite;

  const rect = armyTrigger.getBoundingClientRect();
  btsTooltip.style.top = (rect.bottom + 10) + 'px';
  btsTooltip.style.left = Math.min(rect.left, window.innerWidth - 300) + 'px';

  btsTooltip.classList.add('show');
  armyTrigger.classList.add('active');
  clearTimeout(btsTooltipTimeout);
  btsTooltipTimeout = setTimeout(hideBtsTooltip, 4000);
}

function hideBtsTooltip() {
  btsTooltip.classList.remove('show');
  armyTrigger.classList.remove('active');
}

if (armyTrigger) {
  armyTrigger.addEventListener('mouseenter', showBtsTooltip);
  armyTrigger.addEventListener('mouseleave', () => {
    clearTimeout(btsTooltipTimeout);
    btsTooltipTimeout = setTimeout(hideBtsTooltip, 400);
  });
  armyTrigger.addEventListener('click', showBtsTooltip);
}


// Stars easter egg
const dot = document.getElementById("secret-dot");

let clickCount = 0;

const messages = {
  1: "hey you found this feature!",
  5: "isn't the stars pretty",
  10: "are you having fun?",
  20: "okay you stayed long enough",
  30: "please stop. you got works to do",
  50: "alright... you win. you found the ultimate easter egg. congrats!"
};

// create message element
const msg = document.createElement("div");
msg.className = "secret-message";
document.body.appendChild(msg);

dot.addEventListener("click", () => {
  clickCount++;

  const star = document.createElement("div");
  star.className = "star";
  star.textContent = "✦";

  star.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(star);

  setTimeout(() => star.remove(), 1200);

  if (messages[clickCount]) {
    msg.textContent = messages[clickCount];
    msg.classList.add("show");

    setTimeout(() => {
      msg.classList.remove("show");
    }, 2000);
  }

  if (clickCount >= 30) return;
});