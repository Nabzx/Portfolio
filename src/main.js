import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createHeroField } from './hero.js';
import { buildFigures } from './figures.js';
import { createCursor } from './cursor.js';

gsap.registerPlugin(ScrollTrigger);

document.documentElement.classList.add('js');
window.__gsap = gsap;

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- topbar: blur on scroll, hide on scroll down ---------- */
const topbar = document.getElementById('topbar');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  topbar.classList.toggle('is-scrolled', y > 24);
  if (y > 160 && y > lastY + 4) topbar.classList.add('is-hidden');
  else if (y < lastY - 4 || y <= 160) topbar.classList.remove('is-hidden');
  lastY = y;
}, { passive: true });

/* ---------- figures & cursor ---------- */
buildFigures();
createCursor();

/* ---------- helpers ---------- */
function splitWords(el) {
  el.setAttribute('aria-label', el.textContent.trim());
  Array.from(el.childNodes).forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else {
          const s = document.createElement('span');
          s.className = 'w';
          s.setAttribute('aria-hidden', 'true');
          s.textContent = part;
          frag.appendChild(s);
        }
      });
      el.replaceChild(frag, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BR') {
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      el.insertBefore(s, node);
      s.appendChild(node);
    }
  });
  return el.querySelectorAll(':scope > .w');
}

/* count a stat up from zero — markup already holds the final string */
function countUp(el, delay = 0) {
  if (reducedMotion || el.dataset.counted) return;
  el.dataset.counted = '1';
  const value = parseFloat(el.dataset.count);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const obj = { v: 0 };
  gsap.to(obj, {
    v: value,
    duration: 1.3,
    delay,
    ease: 'power3.out',
    onUpdate() {
      const n = Math.round(obj.v);
      el.textContent = prefix + (n >= 1000 ? n.toLocaleString('en-GB') : n) + suffix;
    },
  });
}

/* ---------- magnetic buttons ---------- */
function magnetize() {
  if (!finePointer || reducedMotion) return;
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}
magnetize();

/* ---------- work accordion ---------- */
function animateRowContent(row) {
  if (row.dataset.animated) return;
  row.dataset.animated = '1';
  const stats = row.querySelectorAll('[data-count]');
  if (reducedMotion) return;
  const figure = row.querySelector('.work-figure');
  const cells = row.querySelectorAll('.fig-heatmap span, .chess-board .chess-cell');
  gsap.fromTo(figure,
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 0.95, ease: 'expo.out', delay: 0.12 }
  );
  if (cells.length) {
    gsap.from(cells, {
      opacity: 0,
      duration: 0.45,
      delay: 0.3,
      ease: 'power1.out',
      stagger: { each: 0.004, from: 'random' },
    });
  }
  stats.forEach((el, i) => countUp(el, 0.35 + i * 0.12));
}

document.querySelectorAll('[data-accordion]').forEach((row) => {
  const head = row.querySelector('.work-head');
  const panel = row.querySelector('.work-panel');

  function open() {
    row.classList.add('is-open');
    head.setAttribute('aria-expanded', 'true');
    if (reducedMotion) {
      panel.style.height = 'auto';
    } else {
      gsap.fromTo(panel, { height: 0 }, {
        height: 'auto',
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
    animateRowContent(row);
  }

  function close() {
    row.classList.remove('is-open');
    head.setAttribute('aria-expanded', 'false');
    if (reducedMotion) {
      panel.style.height = '0px';
    } else {
      gsap.to(panel, {
        height: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => ScrollTrigger.refresh(),
      });
    }
  }

  head.addEventListener('click', () => {
    row.classList.contains('is-open') ? close() : open();
  });

  // the row marked open in markup animates its content when scrolled to
  if (row.classList.contains('is-open')) {
    ScrollTrigger.create({
      trigger: row,
      start: 'top 76%',
      once: true,
      onEnter: () => animateRowContent(row),
    });
  }
});

/* ---------- hero field + load sequence ---------- */
const canvas = document.getElementById('hero-canvas');
const field = createHeroField(canvas, { reducedMotion });

const hudEpoch = document.getElementById('hud-epoch');
const hudLoss = document.getElementById('hud-loss');
const hudStatus = document.getElementById('hud-status');

if (reducedMotion) {
  // Everything lands instantly; the field is already converged.
  gsap.set('.reveal-load, .reveal', { opacity: 1 });
  hudEpoch.textContent = 'epoch 847';
  hudLoss.textContent = 'loss 0.0031';
  hudStatus.textContent = 'best checkpoint saved';
} else {
  gsap.set('.hero-title .line-inner', { yPercent: 110 });
  gsap.set('.hero-motto, .hero-sub', { y: 14 });

  const convergence = { p: 0 };
  const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, paused: true });

  // Don't burn the intro in a background tab — play it when the visitor arrives.
  if (document.visibilityState === 'visible') {
    intro.play();
  } else {
    document.addEventListener('visibilitychange', function onVisible() {
      if (document.visibilityState === 'visible') {
        document.removeEventListener('visibilitychange', onVisible);
        intro.play();
      }
    });
  }
  window.__intro = intro;

  intro
    .to(convergence, {
      p: 1,
      duration: 2.6,
      ease: 'power2.inOut',
      onUpdate() {
        field.setProgress(convergence.p);
        const epoch = Math.round(convergence.p * 847);
        const loss = 2.3081 * Math.pow(1 - convergence.p, 2.2) + 0.0031;
        hudEpoch.textContent = `epoch ${String(epoch).padStart(3, '0')}`;
        hudLoss.textContent = `loss ${loss.toFixed(4)}`;
        if (convergence.p >= 1) hudStatus.textContent = 'best checkpoint saved';
      },
    }, 0)
    .to('.hero-title .line-inner', {
      yPercent: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power4.out',
    }, 0.45)
    .to('.hero-eyebrow', { opacity: 1, duration: 0.7 }, 0.4)
    .to('.hero-motto', { opacity: 1, y: 0, duration: 0.8 }, 0.95)
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, 1.1)
    .to('.hero-proof', { opacity: 1, duration: 0.8 }, 1.25)
    .to('.hero-cta', { opacity: 1, duration: 0.8 }, 1.4);

  /* hero content drifts up as you scroll away */
  gsap.to('.hero-inner', {
    yPercent: -14,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  /* ---------- typed section labels ---------- */
  document.querySelectorAll('.section-label .label-text').forEach((label) => {
    const full = label.textContent;
    const state = { n: 0 };
    label.dataset.full = full;
    label.textContent = '';
    ScrollTrigger.create({
      trigger: label,
      start: 'top 88%',
      once: true,
      onEnter() {
        label.classList.add('typing');
        gsap.to(state, {
          n: full.length,
          duration: Math.min(1.4, full.length * 0.05),
          ease: 'none',
          snap: { n: 1 },
          onUpdate: () => { label.textContent = full.slice(0, state.n); },
          onComplete: () => { label.classList.remove('typing'); },
        });
      },
    });
  });

  /* section rules draw outward */
  gsap.utils.toArray('.section-rule').forEach((el) => {
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
  });

  /* abstract: words illuminate as you read down */
  const abstractWords = splitWords(document.querySelector('.abstract-text'));
  gsap.fromTo(abstractWords,
    { opacity: 0.13 },
    {
      opacity: 1,
      stagger: 0.05,
      ease: 'none',
      scrollTrigger: {
        trigger: '.abstract-text',
        start: 'top 78%',
        end: 'top 26%',
        scrub: 0.5,
      },
    }
  );

  /* work rows drop in */
  gsap.fromTo('.work-row',
    { y: 26, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#work', start: 'top 74%' },
    }
  );

  /* research entries slide in */
  gsap.fromTo('.pub-item',
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.14,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.pub-list', start: 'top 80%' },
    }
  );

  /* experience entries rise, chips count up */
  gsap.utils.toArray('.xp-item').forEach((item, i) => {
    gsap.fromTo(item,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            item.querySelectorAll('[data-count]').forEach((el, j) => countUp(el, 0.3 + j * 0.12));
          },
        },
      }
    );
  });

  /* model card: bio fades, rows cascade */
  gsap.fromTo('.modelcard-bio',
    { y: 26, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.modelcard', start: 'top 78%' },
    }
  );
  gsap.fromTo('.mc-row',
    { y: 22, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.modelcard-table', start: 'top 80%' },
    }
  );

  /* contact: words rise */
  const contactWords = splitWords(document.querySelector('.contact-display'));
  gsap.fromTo(contactWords,
    { y: 74, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: '.contact-display', start: 'top 82%' },
    }
  );
  gsap.fromTo('.contact-actions',
    { y: 24, opacity: 0 },
    {
      y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.contact-actions', start: 'top 88%' },
    }
  );
}
