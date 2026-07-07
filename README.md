# Nabil Shah — Portfolio v3 · "Best checkpoint"

A single-page portfolio styled as a living research paper in a Claude Code
palette: warm terminal black, terracotta crail (#D97757), ivory text and the
✳ glyph. The three.js hero converges 12,000 particles from random noise into
a loss landscape — warm-black valleys, terracotta slopes, ivory peaks — while
a HUD ticks down to "best checkpoint saved". Motto: becoming the best version
of myself.

## Run

```bash
npm install
npm run dev      # http://localhost:5180
npm run build    # outputs to dist/
```

## Stack

- Vite + vanilla JS
- three.js — hero particle field (custom shaders, `src/hero.js`)
- GSAP + ScrollTrigger — intro timeline, typed section labels, per-section
  scroll animations, magnetic buttons (`src/main.js`)
- Custom terminal-caret cursor, desktop only (`src/cursor.js`)
- Generative SVG/CSS "paper figures" (`src/figures.js`)

## Content to personalise

Copy that was written as editable placeholder — adjust to taste in `index.html`:

- Project descriptions in §1 (Minexx details, eval harness, dissertation topic)
- §2 research/writing entries (representative titles — replace with real ones)
- GitHub / LinkedIn / X links in the contact section (currently `href="#"`)

## Accessibility & performance

- `prefers-reduced-motion` skips all animation and shows the converged state
- Canvas pauses when off-screen or the tab is hidden; DPR capped at 1.75
- Particle count drops on small/touch screens
- Keyboard focus rings, skip link, semantic landmarks throughout
