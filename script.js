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