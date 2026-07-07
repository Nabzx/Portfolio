// Generative "paper figures" for the Selected Work section.
// Deterministic (seeded) so the page renders identically on every visit.

const RAMP = ['#2a2622', '#82503c', '#cc785c', '#d97757', '#d4a27f', '#f4ede0'];

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sample the Claude ramp at t ∈ [0,1]
function ramp(t) {
  const clamped = Math.max(0, Math.min(1, t));
  const idx = clamped * (RAMP.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.min(lo + 1, RAMP.length - 1);
  const f = idx - lo;
  const a = RAMP[lo], b = RAMP[hi];
  const ah = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const bh = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = ah.map((v, i) => Math.round(v + (bh[i] - v) * f));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

/* fig 1.1 — attention heatmap: banded diagonal, like cross-attention
   between supply-chain events and provenance claims */
function buildHeatmap(host) {
  const N = 14;
  const rand = mulberry32(41);
  const grid = document.createElement('div');
  grid.className = 'fig-heatmap';
  grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = document.createElement('span');
      const diag = Math.exp(-Math.pow(r - c, 2) / 2.2);
      const band = Math.exp(-Math.pow(r - c + 6, 2) / 5) * 0.38;
      const v = Math.min(1, diag * 0.9 + band + Math.pow(rand(), 2.6) * 0.5);
      cell.style.background = ramp(v * 0.85);
      cell.style.opacity = String(0.25 + v * 0.75);
      grid.appendChild(cell);
    }
  }
  host.prepend(grid);
}

/* fig 1.2 — training + validation loss, noisy exponential decay */
function buildLossCurve(host) {
  const W = 320, H = 190, PAD = 18;
  const rand = mulberry32(7);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg', preserveAspectRatio: 'none' });

  for (let i = 0; i <= 4; i++) {
    const y = PAD + ((H - PAD * 2) / 4) * i;
    svg.appendChild(svgEl('line', {
      x1: PAD, y1: y, x2: W - PAD, y2: y,
      stroke: 'rgba(237,234,226,0.07)', 'stroke-width': 1,
    }));
  }

  const curve = (noise, floor) => {
    let d = '';
    for (let i = 0; i <= 60; i++) {
      const t = i / 60;
      const x = PAD + t * (W - PAD * 2);
      const base = Math.exp(-t * 3.4) * (1 - floor) + floor;
      // SVG y grows downward: high loss sits at the top of the chart
      const y = PAD + (H - PAD * 2) * (1 - base + (rand() - 0.5) * noise * (1 - t * 0.6));
      d += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${Math.min(H - PAD, Math.max(PAD, y)).toFixed(1)}`;
    }
    return d;
  };

  const val = svgEl('path', {
    d: curve(0.09, 0.16), fill: 'none',
    stroke: '#d4a27f', 'stroke-width': 1.4, 'stroke-dasharray': '3 4', opacity: 0.8,
  });
  const train = svgEl('path', {
    d: curve(0.05, 0.06), fill: 'none',
    stroke: '#d97757', 'stroke-width': 2,
    'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  });
  svg.appendChild(val);
  svg.appendChild(train);
  host.prepend(svg);
  return train; // stroke gets draw-on animation
}

/* fig 1.3 — embedding scatter: four gaussian clusters */
function buildScatter(host) {
  const W = 320, H = 190;
  const rand = mulberry32(23);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });
  const clusters = [
    { cx: 78, cy: 60, s: 20, t: 0.95, n: 38 },
    { cx: 220, cy: 52, s: 24, t: 0.75, n: 42 },
    { cx: 130, cy: 138, s: 18, t: 0.55, n: 34 },
    { cx: 252, cy: 128, s: 26, t: 0.35, n: 40 },
  ];
  for (const cl of clusters) {
    for (let i = 0; i < cl.n; i++) {
      const a = rand() * Math.PI * 2;
      const r = (rand() + rand()) * 0.5 * cl.s * 1.9;
      svg.appendChild(svgEl('circle', {
        cx: (cl.cx + Math.cos(a) * r).toFixed(1),
        cy: (cl.cy + Math.sin(a) * r * 0.82).toFixed(1),
        r: (1.6 + rand() * 2.2).toFixed(1),
        fill: ramp(cl.t),
        opacity: (0.55 + rand() * 0.45).toFixed(2),
      }));
    }
  }
  host.prepend(svg);
}

/* fig 1.1 — sparse expert activation: 8 experts × 18 samples, few bids win */
function buildActivation(host) {
  const ROWS = 8, COLS = 18;
  const rand = mulberry32(2026);
  const grid = document.createElement('div');
  grid.className = 'fig-heatmap';
  grid.style.gridTemplateColumns = `repeat(${COLS}, 1fr)`;
  // each sample column routes to 2-3 specialists — emergent specialisation
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('span');
      const specialist = (r === Math.floor(c / 3) % ROWS) || (r === (Math.floor(c / 3) + 3) % ROWS);
      const bid = specialist ? 0.55 + rand() * 0.45 : Math.pow(rand(), 4) * 0.35;
      cell.style.background = ramp(bid * 0.95);
      cell.style.opacity = String(0.25 + bid * 0.75);
      grid.appendChild(cell);
    }
  }
  host.prepend(grid);
}

/* fig 1.2 — evaluation heat over a chessboard */
function buildChessHeat(host) {
  const N = 8;
  const rand = mulberry32(64);
  const hot = [[4, 3], [3, 3], [5, 4], [2, 5], [4, 5]]; // contested centre
  const grid = document.createElement('div');
  grid.className = 'fig-heatmap';
  grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = document.createElement('span');
      const dark = (r + c) % 2 === 1;
      let heat = 0;
      for (const [hr, hc] of hot) {
        heat = Math.max(heat, Math.exp(-((r - hr) ** 2 + (c - hc) ** 2) / 2.4));
      }
      heat = Math.min(1, heat * (0.75 + rand() * 0.35));
      const v = heat * 0.92;
      cell.style.background = v > 0.12 ? ramp(v) : (dark ? '#2b2825' : '#232120');
      cell.style.opacity = String(v > 0.12 ? 0.35 + v * 0.65 : 1);
      grid.appendChild(cell);
    }
  }
  host.prepend(grid);
}

/* fig 1.4 — confusion matrix with an honest diagonal */
function buildConfusion(host) {
  const N = 6;
  const rand = mulberry32(99);
  const grid = document.createElement('div');
  grid.className = 'fig-heatmap';
  grid.style.gridTemplateColumns = `repeat(${N}, 1fr)`;
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const cell = document.createElement('span');
      const v = r === c ? 0.82 + rand() * 0.18 : rand() * 0.2;
      cell.style.background = ramp(v * 0.95);
      cell.style.opacity = String(0.3 + v * 0.7);
      grid.appendChild(cell);
    }
  }
  host.prepend(grid);
}

export function buildFigures() {
  const built = { lossPath: null };
  document.querySelectorAll('[data-figure]').forEach((host) => {
    switch (host.dataset.figure) {
      case 'activation': buildActivation(host); break;
      case 'chessheat': buildChessHeat(host); break;
      case 'heatmap': buildHeatmap(host); break;
      case 'losscurve': built.lossPath = buildLossCurve(host); break;
      case 'scatter': buildScatter(host); break;
      case 'confusion': buildConfusion(host); break;
    }
  });
  return built;
}
