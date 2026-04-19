/* ============================================================
   DENENDRO PORTFOLIO v3.2 — main.js
   ============================================================ */
'use strict';

/* 1. CUSTOM CURSOR — desktop only */
(function () {
  /* Skip on touch/mobile devices */
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cur || !ring) return;
  document.addEventListener('mousemove', (e) => {
    const t = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    cur.style.transform  = t;
    ring.style.transform = t;
  });
  document.querySelectorAll('a, button, .skill-tag').forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
  });
})();

/* 2. SCROLL PROGRESS BAR */
(function () {
  const prog = document.getElementById('progress');
  if (!prog) return;
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    prog.style.transform = `scaleX(${d.scrollTop / (d.scrollHeight - d.clientHeight)})`;
  }, { passive: true });
})();

/* 3. NAVBAR SCROLL STATE */
(function () {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* 4. ACTIVE NAV LINKS */
(function () {
  const ids   = ['filmography','videography','photography','contact'];
  const links = document.querySelectorAll('[data-nav]');
  function update() {
    let active = '';
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = id;
    });
    links.forEach(a => a.classList.toggle('active', a.dataset.nav === active));
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* 5. SCROLL REVEAL */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* 6. PARALLAX BG WORDS */
(function () {
  const words = document.querySelectorAll('.bg-word');
  if (!words.length) return;
  window.addEventListener('scroll', () => {
    words.forEach(el => {
      const pct = el.parentElement.getBoundingClientRect().top / window.innerHeight;
      el.style.transform = `translateY(${pct * 40}px)`;
    });
  }, { passive: true });
})();

/* 7. FILM STILLS — subtle Ken Burns on hover */
(function () {
  document.querySelectorAll('.film-still-wrap').forEach(wrap => {
    const img = wrap.querySelector('.still-img');
    if (!img) return;
    img.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    wrap.addEventListener('mouseenter', () => { img.style.transform = 'scale(1.05)'; });
    wrap.addEventListener('mouseleave', () => { img.style.transform = 'scale(1)'; });
  });
})();
