# Nabil Shah — Portfolio

A monochrome, sumi-e-inspired portfolio built with [Astro](https://astro.build). No frameworks, no accent colours — sumi ink on washi paper, with a live multi-agent ink simulation in the hero.

## Commands

```bash
npm install     # once
npm run dev     # dev server at http://localhost:4321
npm run build   # static build into dist/
npm run preview # serve the production build locally
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).

## Swapping in your real portrait

The hero portrait is `public/portrait.svg` (currently an ink-wash placeholder).

1. Drop your manga-style portrait into `public/` (e.g. `portrait.png` — ideally on a transparent or near-white background, roughly 4:5 portrait ratio).
2. Update the one reference in `src/pages/index.astro`: change `src="/portrait.svg"` to `src="/portrait.png"`.
3. The image uses `mix-blend-mode: multiply`, so whites melt into the paper and the figure integrates with the ink field automatically. If your portrait has a solid background you don't want, remove the blend rule in the `.hero-portrait img` style block.

## Editing content

All copy lives in two places:

- **`src/pages/index.astro`** — hero, about, featured projects, the additional-projects grid (`additional` array — add an object to add a card), experience timeline (`timeline` array), research statement, skills, contact.
- **`src/pages/projects/*.astro`** — the three featured project pages. Copy one to add a fourth; each page sets its own `next` link to chain them.

Shared design tokens (colours, type scale, spacing) are in `src/styles/global.css`.

## The hero animation

`src/components/InkAgents.astro` renders simple agents that wander, then gradually align into flowing streams — emergence, drawn in ink. It pauses off-screen and when the tab is hidden, and renders a static composition for users with reduced motion enabled.
