// Custom cursor: a small ivory dot with a lazily trailing ring.
// The ring warms to crail and grows over interactive elements.
// Desktop fine-pointer only; never created under reduced motion.

import gsap from 'gsap';

export function createCursor() {
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduced) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  dot.setAttribute('aria-hidden', 'true');
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  ring.setAttribute('aria-hidden', 'true');
  document.body.append(dot, ring);
  document.documentElement.classList.add('has-cursor');

  const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const dotPos = { ...target };
  const ringPos = { ...target };
  let seen = false;

  const setDotX = gsap.quickSetter(dot, 'x', 'px');
  const setDotY = gsap.quickSetter(dot, 'y', 'px');
  const setRingX = gsap.quickSetter(ring, 'x', 'px');
  const setRingY = gsap.quickSetter(ring, 'y', 'px');

  window.addEventListener('pointermove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    if (!seen) {
      seen = true;
      dotPos.x = ringPos.x = target.x;
      dotPos.y = ringPos.y = target.y;
      dot.classList.add('is-active');
      ring.classList.add('is-active');
    }
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', () => {
    dot.classList.remove('is-active');
    ring.classList.remove('is-active');
    seen = false;
  });

  gsap.ticker.add(() => {
    dotPos.x += (target.x - dotPos.x) * 0.5;
    dotPos.y += (target.y - dotPos.y) * 0.5;
    ringPos.x += (target.x - ringPos.x) * 0.14;
    ringPos.y += (target.y - ringPos.y) * 0.14;
    setDotX(dotPos.x - 3);
    setDotY(dotPos.y - 3);
    setRingX(ringPos.x - 18);
    setRingY(ringPos.y - 18);
  });

  // Over anything interactive: dot swells into a crail blob, ring blooms
  const HOVERABLE = 'a, button, [data-magnetic]';
  document.addEventListener('pointerover', (e) => {
    if (e.target.closest(HOVERABLE)) {
      dot.classList.add('is-hover');
      ring.classList.add('is-hover');
      gsap.to(dot, { scale: 3.4, duration: 0.3, ease: 'power3.out' });
      gsap.to(ring, { scale: 1.7, duration: 0.3, ease: 'power3.out' });
    }
  });
  document.addEventListener('pointerout', (e) => {
    if (e.target.closest(HOVERABLE)) {
      dot.classList.remove('is-hover');
      ring.classList.remove('is-hover');
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power3.out' });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power3.out' });
    }
  });
  document.addEventListener('pointerdown', () => {
    gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power2.out' });
  });
  document.addEventListener('pointerup', () => {
    gsap.to(ring, { scale: ring.classList.contains('is-hover') ? 1.7 : 1, duration: 0.25, ease: 'power3.out' });
  });
}
