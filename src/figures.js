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

const CREAM = 'rgba(240,238,230,';
const CRAIL = '#d97757';
const KRAFT = '#d4a27f';

/* fig 1.1 — differentiable auction: samples (left) bid across to the
   experts (right) worth running; winning routes light up */
function buildBidding(host) {
  const W = 320, H = 190;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });

  const samples = [28, 54, 80, 106, 132, 158].map((y) => ({ x: 38, y }));
  const heights = [40, 30, 20, 28, 16];
  const util = [0.85, 0.62, 0.34, 0.52, 0.18];
  let ey = 16;
  const experts = heights.map((h) => {
    const e = { x: 252, y: ey + h / 2, h };
    ey += h + 6;
    return e;
  });

  const edge = (s, e) =>
    `M${s.x + 5},${s.y} C150,${s.y} 150,${e.y} ${experts[0].x - 4},${e.y}`;

  // losing bids first, faint
  const losing = [[0, 2], [0, 4], [1, 1], [2, 0], [2, 3], [3, 1], [4, 4], [4, 0], [5, 3], [1, 4], [5, 0]];
  for (const [si, ei] of losing) {
    svg.appendChild(svgEl('path', {
      d: edge(samples[si], experts[ei]), fill: 'none',
      stroke: CREAM + '0.07)', 'stroke-width': 1,
    }));
  }
  // winning bids on top, in crail
  const winning = [[0, 0], [1, 0], [2, 1], [3, 3], [4, 1], [5, 2]];
  for (const [si, ei] of winning) {
    svg.appendChild(svgEl('path', {
      d: edge(samples[si], experts[ei]), fill: 'none',
      stroke: CRAIL, 'stroke-width': 1.6, opacity: 0.8,
      'stroke-linecap': 'round',
    }));
  }

  samples.forEach((s) => {
    svg.appendChild(svgEl('circle', { cx: s.x, cy: s.y, r: 4, fill: CREAM + '0.85)' }));
  });
  experts.forEach((e, i) => {
    svg.appendChild(svgEl('rect', {
      x: e.x, y: e.y - e.h / 2, width: 32, height: e.h, rx: 3,
      fill: ramp(0.25 + util[i] * 0.7), opacity: 0.92,
    }));
  });
  host.prepend(svg);
}

/* fig 1.2 — a real chessboard: double-fianchetto structure, kraft and
   clay squares, coordinates on the rim squares */
function buildChessboard(host) {
  const PIECES = { K: '♚', Q: '♛', R: '♜', B: '♝', N: '♞', P: '♟' };
  const white = { g1: 'K', f1: 'R', a1: 'R', d1: 'Q', f3: 'N', g2: 'B', b2: 'B' };
  ['a2', 'b3', 'c4', 'd4', 'e3', 'f2', 'g3', 'h2'].forEach((sq) => { white[sq] = 'P'; });
  const black = { g8: 'K', f8: 'R', a8: 'R', d8: 'Q', f6: 'N', g7: 'B', b7: 'B' };
  ['a7', 'b6', 'c5', 'd5', 'e6', 'f7', 'g6', 'h7'].forEach((sq) => { black[sq] = 'P'; });

  const wrap = document.createElement('div');
  wrap.className = 'fig-chess';
  const board = document.createElement('div');
  board.className = 'chess-board';

  const files = 'abcdefgh';
  for (let rank = 8; rank >= 1; rank--) {
    for (let f = 0; f < 8; f++) {
      const sq = files[f] + rank;
      const cell = document.createElement('span');
      const dark = (f + rank) % 2 === 0;
      cell.className = 'chess-cell ' + (dark ? 'dark' : 'light');
      if (white[sq]) {
        cell.textContent = PIECES[white[sq]];
        cell.classList.add('pc-w');
      } else if (black[sq]) {
        cell.textContent = PIECES[black[sq]];
        cell.classList.add('pc-b');
      }
      // rim coordinates, like a tournament board
      if (f === 0) {
        const n = document.createElement('i');
        n.className = 'coord coord-rank';
        n.textContent = rank;
        cell.appendChild(n);
      }
      if (rank === 1) {
        const l = document.createElement('i');
        l.className = 'coord coord-file';
        l.textContent = files[f];
        cell.appendChild(l);
      }
      board.appendChild(cell);
    }
  }
  wrap.appendChild(board);
  host.prepend(wrap);
}

/* fig 1.3 — camps on a map: simplified Africa, hub in the Great Lakes,
   dashed supply routes out to the camps */
function buildAidMap(host) {
  const W = 320, H = 190;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });

  // faint graticule
  for (let x = 40; x < W; x += 56) {
    svg.appendChild(svgEl('line', { x1: x, y1: 6, x2: x, y2: H - 6, stroke: CREAM + '0.05)', 'stroke-width': 1, 'stroke-dasharray': '2 5' }));
  }
  for (let y = 40; y < H; y += 44) {
    svg.appendChild(svgEl('line', { x1: 8, y1: y, x2: W - 8, y2: y, stroke: CREAM + '0.05)', 'stroke-width': 1, 'stroke-dasharray': '2 5' }));
  }

  // simplified Africa silhouette (normalised points → viewbox)
  const pts = [
    [28, 6], [52, 0], [68, 8], [78, 12], [82, 22], [88, 34],
    [72, 44], [70, 58], [62, 78], [52, 92], [40, 88], [36, 72],
    [38, 58], [30, 48], [34, 40], [20, 36], [8, 28], [12, 16],
  ];
  const X = (nx) => 88 + nx * 1.52;
  const Y = (ny) => 10 + ny * 1.78;
  const d = pts.map(([nx, ny], i) => `${i === 0 ? 'M' : 'L'}${X(nx).toFixed(1)},${Y(ny).toFixed(1)}`).join('') + 'Z';
  svg.appendChild(svgEl('path', {
    d, fill: CREAM + '0.045)', stroke: CREAM + '0.28)',
    'stroke-width': 1.2, 'stroke-linejoin': 'round',
  }));
  // Madagascar
  svg.appendChild(svgEl('ellipse', {
    cx: X(80), cy: Y(70), rx: 5, ry: 11,
    transform: `rotate(18 ${X(80)} ${Y(70)})`,
    fill: CREAM + '0.045)', stroke: CREAM + '0.22)', 'stroke-width': 1,
  }));

  // distribution hub (Great Lakes region) + camps
  const hub = [X(58), Y(48)];
  const camps = [
    [X(52), Y(38)], [X(66), Y(42)], [X(60), Y(58)],
    [X(46), Y(52)], [X(70), Y(52)], [X(34), Y(30)],
  ];
  camps.forEach(([cx, cy]) => {
    svg.appendChild(svgEl('path', {
      d: `M${hub[0]},${hub[1]} L${cx},${cy}`,
      stroke: CRAIL, 'stroke-width': 1, opacity: 0.35, 'stroke-dasharray': '2 4',
    }));
  });
  camps.forEach(([cx, cy], i) => {
    svg.appendChild(svgEl('circle', { cx, cy, r: 6, fill: 'none', stroke: CRAIL, 'stroke-width': 1, opacity: 0.35 }));
    svg.appendChild(svgEl('circle', { cx, cy, r: 2.6, fill: i % 2 ? KRAFT : CRAIL }));
  });
  svg.appendChild(svgEl('rect', {
    x: hub[0] - 3.5, y: hub[1] - 3.5, width: 7, height: 7,
    fill: '#f4ede0', transform: `rotate(45 ${hub[0]} ${hub[1]})`,
  }));

  host.prepend(svg);
}

/* fig 1.4 — one trading session: candles with an upward drift */
function buildCandles(host) {
  const W = 320, H = 190, PAD = 16;
  const rand = mulberry32(1929);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });

  for (let i = 0; i <= 3; i++) {
    const y = PAD + ((H - PAD * 2) / 3) * i;
    svg.appendChild(svgEl('line', { x1: PAD, y1: y, x2: W - PAD, y2: y, stroke: CREAM + '0.06)', 'stroke-width': 1 }));
  }

  const N = 18;
  const bw = 9, gap = (W - PAD * 2 - N * bw) / (N - 1);
  let price = 138;
  let entry = null;
  for (let i = 0; i < N; i++) {
    const drift = -3.1 + (rand() - 0.5) * 16;
    const open = price;
    const close = Math.max(30, Math.min(170, price + drift));
    const hi = Math.min(open, close) - (2 + rand() * 7);
    const lo = Math.max(open, close) + (2 + rand() * 7);
    const x = PAD + i * (bw + gap);
    const up = close < open; // svg y is inverted: lower y = higher price
    svg.appendChild(svgEl('line', {
      x1: x + bw / 2, y1: hi, x2: x + bw / 2, y2: lo,
      stroke: CREAM + '0.3)', 'stroke-width': 1,
    }));
    svg.appendChild(svgEl('rect', {
      x, y: Math.min(open, close), width: bw,
      height: Math.max(2, Math.abs(close - open)), rx: 1,
      fill: up ? CRAIL : '#4d4740', opacity: up ? 0.95 : 0.85,
    }));
    if (entry === null) entry = open;
    price = close;
  }

  // entry level, dashed — everything above it is profit
  svg.appendChild(svgEl('line', {
    x1: PAD, y1: entry, x2: W - PAD, y2: entry,
    stroke: KRAFT, 'stroke-width': 1, 'stroke-dasharray': '3 4', opacity: 0.5,
  }));
  svg.appendChild(svgEl('circle', { cx: W - PAD - bw / 2, cy: price, r: 3.4, fill: '#f4ede0' }));

  host.prepend(svg);
}

/* fig 1.5 — four heartbeats; the third one is the reason the model exists */
function buildECG(host) {
  const W = 320, H = 190, BASE = 108;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });

  for (let x = 24; x < W; x += 24) {
    svg.appendChild(svgEl('line', { x1: x, y1: 16, x2: x, y2: H - 16, stroke: CREAM + '0.04)', 'stroke-width': 1 }));
  }

  const beat = (x0, spike, wide) =>
    `L${x0},${BASE} L${x0 + 6},${BASE - 5} L${x0 + 10},${BASE} ` +
    `L${x0 + 14},${BASE + 7} L${x0 + 18 + wide},${BASE - spike} L${x0 + 22 + wide * 2},${BASE + 12} ` +
    `L${x0 + 27 + wide * 2},${BASE} L${x0 + 38 + wide * 2},${BASE - 8} L${x0 + 46 + wide * 2},${BASE}`;

  const healthy = `M8,${BASE} ` + beat(26, 52, 0) + beat(98, 50, 0) + ` L170,${BASE}`;
  svg.appendChild(svgEl('path', { d: healthy, fill: 'none', stroke: CREAM + '0.55)', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));

  // the anomalous beat — shallow, widened, flagged
  const anomaly = `M170,${BASE} ` + beat(178, 26, 7) + ` L258,${BASE}`;
  svg.appendChild(svgEl('path', { d: anomaly, fill: 'none', stroke: CRAIL, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
  svg.appendChild(svgEl('circle', { cx: 202, cy: BASE - 26, r: 9, fill: 'none', stroke: CRAIL, 'stroke-width': 1, opacity: 0.5 }));

  const tail = `M258,${BASE} ` + beat(266, 48, 0);
  svg.appendChild(svgEl('path', { d: tail, fill: 'none', stroke: CREAM + '0.55)', 'stroke-width': 1.5, 'stroke-linejoin': 'round' }));

  // risk threshold
  svg.appendChild(svgEl('line', {
    x1: 8, y1: BASE - 34, x2: W - 8, y2: BASE - 34,
    stroke: KRAFT, 'stroke-width': 1, 'stroke-dasharray': '3 4', opacity: 0.45,
  }));

  host.prepend(svg);
}

/* fig 1.6 — speech in, structure out: waveform → outlined notes */
function buildTranscript(host) {
  const W = 320, H = 190;
  const rand = mulberry32(432);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, class: 'fig-svg' });

  // waveform
  const N = 34;
  for (let i = 0; i < N; i++) {
    const x = 14 + i * 3.9;
    const loud = Math.sin(i * 0.55) ** 2 * (0.4 + rand() * 0.6);
    const h = 4 + loud * 52;
    svg.appendChild(svgEl('rect', {
      x, y: 95 - h / 2, width: 2.2, height: h, rx: 1,
      fill: loud > 0.55 ? CRAIL : CREAM + '0.3)', opacity: loud > 0.55 ? 0.8 : 1,
    }));
  }

  // arrow
  svg.appendChild(svgEl('path', {
    d: 'M158,95 L184,95 M177,88 L184,95 L177,102',
    fill: 'none', stroke: CRAIL, 'stroke-width': 1.6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
  }));

  // structured outline: heading, points, sub-points
  const lines = [
    [198, 52, 92, CRAIL, 0.95, 7],
    [198, 70, 78, CREAM + '0.4)', 1, 5],
    [206, 84, 66, CREAM + '0.25)', 1, 5],
    [206, 98, 72, CREAM + '0.25)', 1, 5],
    [198, 116, 58, KRAFT, 0.8, 6],
    [206, 130, 70, CREAM + '0.25)', 1, 5],
    [206, 144, 52, CREAM + '0.25)', 1, 5],
  ];
  for (const [x, y, w, fill, op, h] of lines) {
    svg.appendChild(svgEl('rect', { x, y, width: w, height: h, rx: 2, fill, opacity: op }));
  }

  host.prepend(svg);
}

export function buildFigures() {
  document.querySelectorAll('[data-figure]').forEach((host) => {
    switch (host.dataset.figure) {
      case 'bidding': buildBidding(host); break;
      case 'chessboard': buildChessboard(host); break;
      case 'aidmap': buildAidMap(host); break;
      case 'candles': buildCandles(host); break;
      case 'ecg': buildECG(host); break;
      case 'transcript': buildTranscript(host); break;
    }
  });
}
