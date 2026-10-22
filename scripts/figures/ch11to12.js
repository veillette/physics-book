/**
 * Chapters 11 and 12: fluid statics and fluid dynamics — pressure with
 * depth, hydraulics, gauges, buoyancy, surface tension and capillarity, flow
 * rate and continuity, Bernoulli devices, viscosity, Poiseuille flow, drag,
 * diffusion and osmosis.
 *
 * Quantities that the figures show are computed where the text gives them:
 * capillary heights scale as 1/r, streamlines narrowing in a tube keep the
 * flow rate Av fixed, the viscous velocity profile is parabolic, and the
 * flow around a slowly moving sphere uses a qualitative, symmetric
 * streamline sketch. The higher-speed panels show separation and a wake.
 */
import { COLORS, Svg, fmt, rad } from './svg.js';

const WATER = '#c7e3f3';
const WATER_EDGE = '#7fb6d6';
const GLASS = '#9fd0de';
const FORCE = '#e0245e';
const FLOW = '#1aa0b0';
const GREEN = '#5aa832';
const PISTON = '#7dbb3a';
const MERCURY = '#b9c4d6';
const PIPE = ['#f1eaf5', '#b9a6c9'];

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** Vertical double-headed dimension with end ticks. */
function vdim(svg, x, y1, y2, label, { side = 1, size = 24 } = {}) {
  svg.arrow(x, y1 + 1, x, y2 - 1, { color: COLORS.black, width: 1.5, head: 11, start: true });
  for (const y of [y1, y2]) svg.line(x - 10, y, x + 10, y, { color: COLORS.black, width: 1.4 });
  lab(svg, x + side * 16, (y1 + y2) / 2, label, { anchor: side > 0 ? 'start' : 'end', size });
}

/** Horizontal double-headed dimension with end ticks. */
function hdim(svg, x1, x2, y, label, { size = 24, below = false } = {}) {
  svg.arrow(x1 + 1, y, x2 - 1, y, { color: COLORS.black, width: 1.5, head: 11, start: true });
  for (const x of [x1, x2]) svg.line(x, y - 10, x, y + 10, { color: COLORS.black, width: 1.4 });
  lab(svg, (x1 + x2) / 2, below ? y + 26 : y - 18, label, { size });
}

/** Open-topped container: walls from (x0, top) down to bottom, filled to `level`. */
function beaker(svg, x0, x1, top, bottom, level, { fill = WATER, edge = GLASS } = {}) {
  svg.rect(x0, level, x1 - x0, bottom - level, { fill });
  svg.polyline(
    [
      [x0, top],
      [x0, bottom],
      [x1, bottom],
      [x1, top],
    ],
    { color: edge, width: 4, join: 'round' }
  );
}

/** Pipe seen from the side, shaded top to bottom, with an elliptical end at x0. */
function pipe(svg, x0, x1, yc, r, { colors = PIPE, openRight = true } = {}) {
  // IDs depend on geometry, so filtered and full generation produce identical files.
  const id = `pipe_${x0}_${x1}_${yc}_${r}`;
  svg.add(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${colors[1]}"/><stop offset="0.4" stop-color="${colors[0]}"/><stop offset="0.65" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></linearGradient></defs>`
  );
  const e = r * 0.3;
  svg.add(
    `<path d="M ${x0} ${yc - r} L ${x1} ${yc - r} ${openRight ? `A ${e} ${r} 0 0 1 ${x1} ${yc + r}` : `L ${x1} ${yc + r}`} L ${x0} ${yc + r} Z" fill="url(#${id})" stroke="#8d7ca0" stroke-width="1.5"/>`
  );
  svg.ellipse(x0, yc, e, r, { fill: colors[0], stroke: '#8d7ca0', width: 1.5 });
}

/** Cross-section ellipse through a pipe at x. */
function ring(svg, x, yc, r, { dash, fill = '#ffffff', opacity = 0.35, stroke = '#8d7ca0' } = {}) {
  svg.add(
    `<ellipse cx="${x}" cy="${yc}" rx="${r * 0.3}" ry="${r}" fill="${fill}" fill-opacity="${opacity}" stroke="${stroke}" stroke-width="1.6"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
  );
}

/** Polyline with an arrowhead at fraction `at`. */
function streamline(svg, pts, { color = FLOW, width = 2.5, at = [0.5] } = {}) {
  svg.polyline(pts, { color, width });
  for (const f of at) {
    const k = Math.max(2, Math.min(pts.length - 3, Math.floor(pts.length * f)));
    svg.arrow(...pts[k - 2], ...pts[k + 2], { color, width, head: 13 });
  }
}

/** A swirl (eddy) marker. */
function eddy(svg, x, y, s = 1, { color = FLOW } = {}) {
  const pts = [];
  for (let k = 0; k <= 16; k += 1) {
    const a = rad(40 + k * 18 * s);
    const r = 9 - k * 0.3;
    pts.push([x + r * Math.cos(a), y - r * Math.sin(a)]);
  }
  svg.polyline(pts.slice(0, -2), { color, width: 2 });
  svg.arrow(...pts[13], ...pts[16], { color, width: 2, head: 7 });
}

/** Deterministic pseudo-random numbers (Park–Miller). */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** Piston: a slab with a rod rising from its middle. */
function piston(svg, x0, x1, y, { h = 26, rod = 70, fill = PISTON } = {}) {
  const m = (x0 + x1) / 2;
  if (rod) svg.rect(m - 9, y - rod, 18, rod, { fill: '#9b86b4', stroke: '#5f4f78', width: 1.2 });
  svg.rect(x0, y, x1 - x0, h, { fill, stroke: '#4f7f22', width: 1.5 });
}

/** The two piston figures of 11.8 (also 11.9). */
function negativePressure() {
  const svg = new Svg({
    width: 660,
    height: 520,
    title: 'Negative pressure in a liquid',
    desc: '(a) A piston resting on a liquid in a closed cylinder is pulled up with force F. The liquid, stuck to the piston, is stretched slightly and put under tension, so its absolute pressure is negative: P = −F/A, where A is the piston’s area. (b) Pulled harder with force F′, the liquid separates and a gap opens beneath the piston; this sets an experimental limit on how negative the pressure in the liquid can be.',
  });
  for (const [x0, cap, sep] of [
    [40, '(a)', false],
    [360, '(b)', true],
  ]) {
    const x1 = x0 + 250;
    const T = 70;
    const B = 450;
    const py = sep ? 150 : 210;
    if (sep) {
      svg.path(
        `M ${x0 + 4} ${py + 26} L ${x1 - 4} ${py + 26} L ${x1 - 4} ${py + 46} C ${x1 - 60} ${py + 60} ${x0 + 130} ${py + 36} ${x0 + 4} ${py + 54} Z`,
        { color: '#7d8cc4', width: 1.4, fill: '#dfe3f3' }
      );
      svg.path(
        `M ${x0 + 4} ${py + 120} C ${x0 + 70} ${py + 96} ${x0 + 140} ${py + 132} ${x1 - 4} ${py + 104} L ${x1 - 4} ${B} L ${x0 + 4} ${B} Z`,
        { color: '#7d8cc4', width: 1.4, fill: '#dfe3f3' }
      );
    } else {
      svg.rect(x0 + 4, py + 26, x1 - x0 - 8, B - py - 26, { fill: '#dfe3f3' });
    }
    svg.polyline(
      [
        [x0, T],
        [x0, B],
        [x1, B],
        [x1, T],
      ],
      { color: GLASS, width: 4 }
    );
    piston(svg, x0 + 4, x1 - 4, py, { rod: 80 });
    const len = sep ? 130 : 90;
    svg.arrow((x0 + x1) / 2, py - 20, (x0 + x1) / 2, py - 20 - len, {
      color: FORCE,
      width: 5,
      head: 20,
    });
    lab(svg, (x0 + x1) / 2 + 20, py - 40 - len / 2, sep ? '**F**′' : '**F**', { anchor: 'start' });
    if (!sep) {
      lab(svg, (x0 + x1) / 2 - 30, 340, 'P = ', { anchor: 'end' });
      lab(svg, (x0 + x1) / 2 - 4, 320, '−F');
      svg.line((x0 + x1) / 2 - 24, 342, (x0 + x1) / 2 + 18, 342, {
        color: COLORS.text,
        width: 1.6,
      });
      lab(svg, (x0 + x1) / 2 - 4, 366, 'A');
      svg.leader(x0 - 20, 300, x0 + 30, py + 30, { bend: -0.3, width: 1.5 });
      lab(svg, x0 - 20, 304, 'A', { anchor: 'end', size: 20 });
    }
    caption(svg, (x0 + x1) / 2, 492, cap);
  }
  return svg.render();
}

/** Catmull-Rom curve through the points, sampled `n` times per segment. */
function through(points, n = 12) {
  const P = k => points[Math.max(0, Math.min(points.length - 1, k))];
  const out = [points[0]];
  for (let k = 0; k < points.length - 1; k += 1) {
    const [p0, p1, p2, p3] = [P(k - 1), P(k), P(k + 1), P(k + 2)];
    for (let j = 1; j <= n; j += 1) {
      const t = j / n;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push(
        [0, 1].map(
          i =>
            0.5 *
            (2 * p1[i] +
              (p2[i] - p0[i]) * t +
              (2 * p0[i] - 5 * p1[i] + 4 * p2[i] - p3[i]) * t2 +
              (3 * p1[i] - p0[i] - 3 * p2[i] + p3[i]) * t3)
        )
      );
    }
  }
  return out;
}

/** Curve through the points with an arrowhead at its end. */
function flowArrow(svg, points, { color = FLOW, width = 2.5 } = {}) {
  const pts = through(points);
  svg.polyline(pts.slice(0, -2), { color, width });
  svg.arrow(...pts.at(-4), ...pts.at(-1), { color, width, head: 14 });
}

/** A curling flow arrow: an arc of radius r about (x, y) from a1 to a2 (degrees, y down). */
function curl(svg, x, y, r, a1, a2, { color = FLOW, width = 2.5 } = {}) {
  const pts = [];
  for (let k = 0; k <= 20; k += 1) {
    const a = rad(a1 + ((a2 - a1) * k) / 20);
    pts.push([x + r * Math.cos(a), y + r * Math.sin(a)]);
  }
  svg.polyline(pts.slice(0, -3), { color, width });
  svg.arrow(...pts[16], ...pts[20], { color, width, head: 11 });
}

/** Smooth closed outline through n points around (cx, cy) at radii r(1 ± wobble). */
function blobPath(cx, cy, r, rnd, { n = 7, wobble = 0.25, stretch = 1 } = {}) {
  const pts = [];
  for (let k = 0; k < n; k += 1) {
    const a = (2 * Math.PI * k) / n;
    const rr = r * (1 - wobble + 2 * wobble * rnd());
    pts.push([cx + rr * stretch * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  const P = k => pts[(k + n) % n];
  const f = ([x, y]) => `${fmt(x)} ${fmt(y)}`;
  let d = `M ${f(pts[0])}`;
  for (let k = 0; k < n; k += 1) {
    const [p0, p1, p2, p3] = [P(k - 1), P(k), P(k + 1), P(k + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${f(c1)} ${f(c2)} ${f(p2)}`;
  }
  return `${d} Z`;
}

/** Radial gradient with a white highlight, for molecules drawn as shaded blobs. */
function shadeDef(svg, id, mid, edge) {
  svg.add(
    `<defs><radialGradient id="${id}" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="${mid}"/><stop offset="1" stop-color="${edge}"/></radialGradient></defs>`
  );
}

export default {
  // 11.2 Fig. 1 — a ton of feathers balances a ton of bricks
  Figure_11_02_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 350,
      title: 'A ton of feathers and a ton of bricks',
      desc: 'A plank rests on a small support at its middle. A tall, wide pile of feathers sits on the left end and a small stack of bricks on the right end, the same distance from the support, and the plank balances. The two loads have the same mass, but the feathers take up far more room because their density is much lower.',
    });
    const G = 300;
    const rnd = rng(7);
    svg.line(0, G, 1000, G, { color: '#7fae7f', width: 1.5 });
    for (let x = 6; x < 1000; x += 7 + 6 * rnd()) {
      const h = 4 + 8 * rnd();
      svg.line(x, G, x + (rnd() - 0.5) * 8, G - h, { color: '#5f9a6a', width: 1.3 });
    }
    svg.polygon(
      [
        [500, 266],
        [474, G],
        [526, G],
      ],
      { fill: '#d8c79f', stroke: '#a8935f', width: 1.5 }
    );
    svg.rect(0, 250, 1000, 16, { fill: '#d8c79f', stroke: '#a8935f', width: 1.5 });
    // Equal loads balance at equal distances: both centered 325 from the support.
    svg.path('M 10 250 C 0 150 40 30 135 12 C 175 2 235 2 265 30 C 325 80 335 180 340 250 Z', {
      color: '#c9a54a',
      width: 1.5,
      fill: '#f0dca0',
    });
    for (let k = 0; k < 110; k += 1) {
      const y = 30 + 205 * rnd();
      const half = 50 + ((y - 30) / 205) * 105;
      const x = 175 + (2 * rnd() - 1) * half;
      const a = 360 * rnd();
      svg.add(
        `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(a)}) scale(${fmt(0.7 + 0.5 * rnd())})"><path d="M -12 0 Q 0 -6 12 0 Q 0 6 -12 0 Z" fill="#e3bd5c" stroke="#b98f2c" stroke-width="0.8"/><path d="M -16 0 L 12 0" stroke="#a37d24" stroke-width="1"/></g>`
      );
    }
    const [bx, bw, rows, rh, brick] = [771, 108, 5, 12, 27];
    svg.rect(bx, 250 - rows * rh, bw, rows * rh, { fill: '#f1d4d0' });
    for (let r = 0; r < rows; r += 1) {
      const y = 250 - (r + 1) * rh;
      for (let x = bx - (r % 2 ? brick / 2 : 0); x < bx + bw; x += brick) {
        const x0 = Math.max(bx, x);
        const x1 = Math.min(bx + bw, x + brick);
        svg.rect(x0 + 1, y + 1, x1 - x0 - 2, rh - 2, {
          fill: '#c0504d',
          stroke: '#8f2f2c',
          width: 0.8,
        });
      }
    }
    note(svg, 175, 330, '1 ton of feathers', { size: 22 });
    note(svg, 825, 330, '1 ton of bricks', { size: 22 });
    return svg.render();
  },

  // 11.4 Fig. 1 — the bottom supports the weight of the fluid
  Figure_11_04_01: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'The bottom of a container supports the weight of the fluid',
      desc: 'A container holds fluid to a depth h over a bottom area A, so the fluid’s volume is Ah. Its weight w = mg acts downward and is supported entirely by the bottom, since the vertical sides cannot exert an upward shearing force on the fluid.',
    });
    const x0 = 30;
    const x1 = 330;
    svg.rect(x0, 130, x1 - x0, 350, { fill: WATER });
    svg.ellipse((x0 + x1) / 2, 130, (x1 - x0) / 2, 30, {
      fill: '#a9cfe6',
      stroke: WATER_EDGE,
      width: 1.5,
    });
    svg.add(
      `<ellipse cx="${(x0 + x1) / 2}" cy="480" rx="${(x1 - x0) / 2 - 6}" ry="26" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="8 6"/>`
    );
    svg.polyline(
      [
        [x0, 40],
        [x0, 480],
      ],
      { color: GLASS, width: 4 }
    );
    svg.polyline(
      [
        [x1, 40],
        [x1, 480],
      ],
      { color: GLASS, width: 4 }
    );
    svg.add(
      `<path d="M ${x0} 480 A ${(x1 - x0) / 2} 32 0 0 0 ${x1} 480" fill="none" stroke="${GLASS}" stroke-width="4"/>`
    );
    svg.ellipse((x0 + x1) / 2, 40, (x1 - x0) / 2, 24, { fill: 'none', stroke: GLASS, width: 4 });
    lab(svg, (x0 + x1) / 2, 250, '**w** = m**g**');
    svg.arrow((x0 + x1) / 2, 280, (x0 + x1) / 2, 380, { color: FORCE, width: 5, head: 20 });
    vdim(svg, 380, 160, 480, 'h', { side: -1 });
    note(svg, 420, 60, 'Volume = \\it{Ah}', { anchor: 'start', size: 24 });
    svg.leader(420, 116, 290, 140, { bend: 0.3, width: 1.5 });
    lab(svg, 428, 112, 'A', { anchor: 'start' });
    svg.leader(420, 500, 300, 486, { bend: -0.3, width: 1.5 });
    lab(svg, 428, 504, 'A', { anchor: 'start' });
    return svg.render();
  },

  // 11.4 Fig. 2 and problem — the force of water on a dam
  Figure_11_04_02: () => {
    const svg = new Svg({
      width: 920,
      height: 640,
      title: 'Force of water on a dam',
      desc: 'A dam of length L holds back water of depth h. The average pressure on its face is the pressure at the average depth, P̄ = h̄ρg, with h̄ = h/2, and the total force of the water on the dam is F = P̄A, where A = hL is the area of the face in contact with the water.',
    });
    // Oblique view: the dam runs from the front face back along (−d, −d).
    const d = 290;
    const [x0, x1, top, base] = [470, 870, 330, 610];
    svg.add(
      `<defs><linearGradient id="dam11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe3f6"/><stop offset="1" stop-color="#2fa9c9"/></linearGradient></defs>`
    );
    // Reservoir surface and the water's cut face
    const waves = [];
    for (let k = 0; k <= 40; k += 1) {
      const x = x0 - d + 20 + ((x1 - x0) * k) / 40;
      waves.push([x, top - d + 10 + 4 * Math.sin(k * 0.9)]);
    }
    svg.polygon([[x0, top], [x1, top], ...waves.reverse()], {
      fill: '#a9daf2',
      stroke: '#5eb4d6',
      width: 1.5,
    });
    svg.rect(x0, top, x1 - x0, base - top, { fill: 'url(#dam11)' });
    // Dam: sloping downstream face, top, and cut cross section
    const edge = { stroke: '#b58f4a', width: 1.4 };
    const [t0, t1] = [440, x0];
    const foot = 295;
    svg.polygon(
      [
        [t0, top - 5],
        [foot, base],
        [foot - d, base - d],
        [t0 - d, top - 5 - d],
      ],
      { fill: '#f6dca4', ...edge }
    );
    svg.polygon(
      [
        [t0, top - 5],
        [t1, top - 5],
        [t1 - d, top - 5 - d],
        [t0 - d, top - 5 - d],
      ],
      { fill: '#fbecc8', ...edge }
    );
    svg.polygon(
      [
        [t0, top - 5],
        [t1, top - 5],
        [t1, base],
        [foot, base],
      ],
      { fill: '#dcb877', ...edge }
    );
    // L along the top of the dam
    const off = 22;
    const [a, b] = [
      [t1 - d + off * 0.7, top - 5 - d - off * 0.7],
      [t1 + off * 0.7, top - 5 - off * 0.7],
    ];
    svg.arrow(...a, ...b, { color: COLORS.black, width: 1.6, head: 13, start: true });
    for (const [x, y] of [a, b])
      svg.line(x - 12, y + 12, x + 12, y - 12, { color: COLORS.black, width: 1.4 });
    lab(svg, (a[0] + b[0]) / 2 + 20, (a[1] + b[1]) / 2 - 18, 'L', { size: 28 });
    const mid = (top + base) / 2;
    vdim(svg, 452, top, mid, '\\bar{h}', { side: -1, size: 28 });
    vdim(svg, 892, top, base, 'h', { side: -1, size: 28 });
    svg.arrow(560, mid, x0 + 2, mid, { color: FORCE, width: 5, head: 20 });
    lab(svg, 572, mid - 26, '**F**', { size: 28 });
    lab(svg, 600, 380, 'F = \\bar{P}A', { size: 28, anchor: 'start' });
    lab(svg, 740, 380, '\\bar{P} = \\bar{h}\\it{ρg}', { size: 28, anchor: 'start' });
    return svg.render();
  },

  // 11.4 Fig. 3 — the air column over a square meter
  Figure_11_04_03: () => {
    const svg = new Svg({
      width: 560,
      height: 500,
      title: 'Atmospheric pressure from the weight of the air above',
      desc: 'A column of air 1 m² in cross section rises from the ground to the top of the atmosphere, its top drawn dotted because it continues far above the picture. The air in it weighs w = 1.01 × 10⁵ N, so the average atmospheric pressure at sea level is 1.01 × 10⁵ Pa, or 1 atm.',
    });
    const g = 450;
    svg.rect(0, g, 560, 50, { fill: '#e4eedc' });
    svg.line(0, g, 560, g, { color: '#8aa678', width: 2 });
    const [x0, w, d] = [80, 36, 20];
    const col = [
      [x0, g],
      [x0 + w, g],
      [x0 + w + d, g - d],
      [x0 + d, g - d],
    ];
    svg.polygon(col, { fill: '#ffffff', stroke: COLORS.black, width: 1.5 });
    for (const x of [x0, x0 + w, x0 + w + d, x0 + d]) {
      const yb = x === x0 || x === x0 + w ? g : g - d;
      svg.line(x, yb, x, 60, { color: '#a3122a', width: 2.5 });
      svg.line(x, 60, x, 20, { color: '#a3122a', width: 2.5, dash: '3 4' });
    }
    svg.leader(270, 180, x0 + w + d + 4, 186, { bend: 0.4, width: 1.6 });
    lab(svg, 280, 180, 'w = 1.01 × 10^5 \\rm{N}', { anchor: 'start', size: 26 });
    lab(svg, x0 + w + d + 24, g - 4, '1 \\rm{m}^2', { anchor: 'start', size: 26 });
    return svg.render();
  },

  // 11.4 question — sandbags around a leak under a levee
  Figure_11_04_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 560,
      title: 'Sandbags stop a leak under a levee',
      desc: 'A flooding river on the right presses against a levee. Water leaks under the levee and comes up on its far side, where a ring of sandbags has been stacked around the leak. Water inside the sandbags rises at most to the level of the river, shown by a dashed line, and then stops rising.',
    });
    const ground = 440;
    const river = 245;
    const SOIL = '#b9ab9b';
    svg.rect(0, ground, 1000, 120, { fill: SOIL, stroke: '#8f8273', width: 1.5 });
    // River, with a few small waves
    const surface = [];
    for (let x = 700; x <= 1000; x += 5)
      surface.push([x, river - 5 * Math.max(0, Math.sin((x - 700) / 15)) ** 6]);
    svg.polygon([...surface, [1000, ground], [700, ground]], { fill: '#a7cbe6' });
    // Levee
    svg.path(`M 365 ${ground} L 445 228 Q 570 210 700 232 L 765 ${ground} Z`, {
      color: '#8f8273',
      width: 1.5,
      fill: SOIL,
    });
    // Water held inside the sandbags rises to the river's level.
    svg.rect(85, river, 240, ground - river, { fill: '#a7cbe6' });
    for (let row = 0; row < 9; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        svg.rect(87 + col * 60, 214 + row * 25.5, 56, 22, {
          fill: '#cfc8b6',
          stroke: '#8f8a7a',
          width: 1.2,
          rx: 10,
        });
      }
    }
    svg.line(325, river, 440, river, { color: COLORS.black, width: 1.6, dash: '6 5' });
    // Seepage under the levee
    const path = [
      [840, 452],
      [700, 500],
      [560, 510],
      [420, 500],
      [235, 462],
    ];
    for (let k = 0; k < path.length - 1; k += 1) {
      const [p, q] = [path[k], path[k + 1]];
      const [mx, my] = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
      const ang = (Math.atan2(q[1] - p[1], q[0] - p[0]) * 180) / Math.PI;
      svg.add(
        `<ellipse cx="${mx}" cy="${my}" rx="62" ry="15" transform="rotate(${ang.toFixed(1)} ${mx} ${my})" fill="#a7cbe6" stroke="#2a9fd0" stroke-width="2"/>`
      );
      const ux = Math.cos((ang * Math.PI) / 180);
      const uy = Math.sin((ang * Math.PI) / 180);
      svg.arrow(mx - ux * 40, my - uy * 40, mx + ux * 40, my + uy * 40, {
        color: COLORS.black,
        width: 1.8,
        head: 13,
      });
    }
    note(svg, 200, 172, 'Sandbags', { size: 30 });
    note(svg, 505, 360, 'Levee', { size: 30 });
    note(svg, 830, 172, 'Flooding river', { size: 30 });
    note(svg, 425, 32, 'Water rises to', { size: 30 });
    note(svg, 425, 76, 'this level at most', { size: 30 });
    svg.squiggle(415, 106, 378, 238, { amp: 6 });
    return svg.render();
  },

  // 11.5 Fig. 1 — a hydraulic system
  Figure_11_05_01: () => {
    const svg = new Svg({
      width: 620,
      height: 520,
      title: 'A hydraulic system',
      desc: 'Two fluid-filled cylinders capped with pistons and joined by a tube, the hydraulic line. A downward force F1 on the small left piston, of area A1, creates a pressure P1 that is transmitted undiminished through the fluid, so P1 = P2. On the large right piston, of area A2, it produces a much larger upward force F2.',
    });
    const yP = 230;
    svg.rect(24, yP + 22, 150, 158, { fill: WATER });
    svg.rect(174, 330, 190, 46, { fill: WATER });
    svg.rect(364, yP + 22, 230, 260, { fill: WATER });
    svg.polyline(
      [
        [24, 150],
        [24, 410],
        [174, 410],
        [174, 376],
        [364, 376],
        [364, 510],
        [594, 510],
        [594, 150],
      ],
      { color: GLASS, width: 4 }
    );
    svg.polyline(
      [
        [174, 150],
        [174, 330],
        [364, 330],
        [364, 150],
      ],
      { color: GLASS, width: 4 }
    );
    piston(svg, 28, 170, yP, { rod: 0 });
    piston(svg, 368, 590, yP, { rod: 0 });
    svg.arrow(99, 100, 99, yP - 4, { color: FORCE, width: 5, head: 20 });
    lab(svg, 99, 80, '**F**_1');
    svg.arrow(480, yP - 4, 480, 30, { color: FORCE, width: 6, head: 22 });
    lab(svg, 506, 40, '**F**_2', { anchor: 'start' });
    note(svg, 300, 170, 'Piston', { size: 24 });
    svg.leader(270, 182, 150, yP + 2, { bend: -0.3, width: 1.5 });
    svg.leader(330, 182, 400, yP + 2, { bend: 0.3, width: 1.5 });
    lab(svg, 70, 310, 'P_1');
    lab(svg, 480, 310, 'P_2');
    lab(svg, 200, 290, 'A_1', { anchor: 'start', size: 22 });
    svg.leader(200, 280, 140, yP + 28, { bend: 0.3, width: 1.3 });
    lab(svg, 380, 300, 'A_2', { anchor: 'end', size: 22 });
    lab(svg, 304, 404, 'P_1 = P_2');
    return svg.render();
  },

  // 11.6 Fig. 1 — an aneroid gauge
  Figure_11_06_01: () => {
    const svg = new Svg({
      width: 740,
      height: 620,
      title: 'An aneroid pressure gauge',
      desc: 'Pressure P being measured pushes on flexible bellows from the right. The bellows expand, pushing outward with forces F, and move a lever about a pivot; the lever’s long arm is a pointer that moves over a scale marked 0 to 25. A spring on the left resists the motion, so the pointer’s position measures the pressure.',
    });
    const pivot = [220, 360];
    // Everything is drawn 80 px right and 20 px down, inside this group.
    svg.add('<g transform="translate(80 20)">');
    // Scale arc about the pivot.
    const R = 250;
    svg.arc(...pivot, R, 52, 150, { color: COLORS.black, width: 2 });
    svg.arc(...pivot, R + 44, 52, 150, { color: COLORS.black, width: 2 });
    for (let k = 0; k <= 25; k += 1) {
      const a = rad(150 - (98 * k) / 25);
      const l = k % 5 ? 12 : 22;
      svg.line(
        pivot[0] + R * Math.cos(a),
        pivot[1] - R * Math.sin(a),
        pivot[0] + (R + l) * Math.cos(a),
        pivot[1] - (R + l) * Math.sin(a),
        { color: COLORS.black, width: 1.5 }
      );
      if (k % 5 === 0) {
        svg.text(pivot[0] + (R + 32) * Math.cos(a), pivot[1] - (R + 32) * Math.sin(a), String(k), {
          size: 22,
          math: false,
          rotate: 90 - (150 - (98 * k) / 25),
        });
      }
    }
    const ptr = rad(150 - (98 * 8) / 25);
    svg.arrow(...pivot, pivot[0] + (R - 10) * Math.cos(ptr), pivot[1] - (R - 10) * Math.sin(ptr), {
      color: COLORS.black,
      width: 4,
      head: 20,
    });
    svg.line(...pivot, 250, 410, { color: COLORS.black, width: 4 });
    svg.line(250, 410, 300, 410, { color: COLORS.black, width: 4 });
    svg.circle(...pivot, 10, { fill: COLORS.black });
    svg.rect(20, 250, 18, 110, { fill: '#c49a5a' });
    svg.spring(38, 190, 300, { n: 10, r: 18 });
    svg.line(190, 300, 205, 315, { color: COLORS.black, width: 3 });
    // Bellows: folded columns.
    const bx = 300;
    for (let k = 0; k < 5; k += 1) {
      const x = bx + 6 + k * 30;
      svg.polygon(
        [
          [x, 290],
          [x + 15, 260],
          [x + 30, 290],
          [x + 30, 500],
          [x + 15, 530],
          [x, 500],
        ],
        { fill: '#dcc29a', stroke: '#8a6a3a', width: 1.4 }
      );
    }
    svg.rect(bx, 300, 8, 190, { fill: '#c08a3a' });
    svg.rect(bx + 156, 300, 8, 190, { fill: '#c08a3a' });
    svg.arrow(380, 380, 316, 380, { color: FORCE, width: 4, head: 16 });
    svg.arrow(392, 380, 456, 380, { color: FORCE, width: 4, head: 16 });
    lab(svg, 346, 410, '**F**');
    lab(svg, 424, 410, '**F**');
    svg.line(470, 410, 530, 410, { color: COLORS.black, width: 2 });
    svg.line(470, 450, 530, 450, { color: COLORS.black, width: 2 });
    svg.arrow(540, 430, 476, 430, { color: '#6a3d9a', width: 4, head: 16 });
    lab(svg, 552, 430, 'P', { anchor: 'start' });
    note(svg, 90, 352, 'Spring', { size: 22 });
    note(svg, 150, 410, 'Pivot', { size: 22 });
    svg.leader(170, 396, 210, 370, { bend: -0.3, width: 1.4 });
    note(svg, 20, 470, 'Flexible bellows', { anchor: 'start', size: 22 });
    svg.leader(190, 476, 300, 500, { bend: -0.3, width: 1.4 });
    note(svg, 560, 540, 'Pressure', { size: 22 });
    note(svg, 560, 566, 'being measured', { size: 22 });
    svg.leader(540, 524, 520, 452, { bend: -0.3, width: 1.4 });
    svg.add('</g>');
    return svg.render();
  },

  // 11.6 Fig. 4 — a mercury barometer
  Figure_11_06_04: () => {
    const svg = new Svg({
      width: 640,
      height: 580,
      title: 'A mercury barometer',
      desc: 'A glass tube, closed at the top, stands upside down in a dish of mercury, Hg. The space above the mercury in the tube is a vacuum, with absolute pressure zero. Atmospheric pressure P_atm pushing on the open mercury holds the column up to a height h, where the pressure due to the mercury’s weight, P_abs = hρg, equals P_atm.',
    });
    const tx = 270;
    const top = 30;
    const hTop = 130;
    const dish = 480;
    svg.rect(30, dish, 430, 70, { fill: MERCURY });
    svg.polyline(
      [
        [30, 440],
        [30, 560],
        [460, 560],
        [460, 440],
      ],
      { color: GLASS, width: 4 }
    );
    svg.rect(tx - 16, hTop, 32, dish + 30 - hTop, { fill: MERCURY });
    svg.add(
      `<path d="M ${tx - 20} ${dish + 30} L ${tx - 20} ${top + 16} A 20 16 0 0 1 ${tx + 20} ${top + 16} L ${tx + 20} ${dish + 30}" fill="none" stroke="${GLASS}" stroke-width="5"/>`
    );
    vdim(svg, 180, hTop, dish, 'h', { side: -1 });
    svg.line(160, hTop, 250, hTop, { color: COLORS.black, width: 1, dash: '4 3' });
    svg.leader(330, 80, tx + 6, 90, { bend: 0.3, width: 1.4 });
    note(svg, 340, 80, 'Vacuum (\\it{P}_{abs} = 0)', { anchor: 'start', size: 22 });
    svg.arrow(100, 400, 100, dish - 4, { color: FORCE, width: 4, head: 16 });
    lab(svg, 100, 380, 'P_{atm}');
    note(svg, tx + 2, dish + 10, '×', { size: 22 });
    svg.leader(330, 440, tx + 8, dish + 4, { bend: 0.3, width: 1.4 });
    lab(svg, 340, 436, 'P_{abs} = hρg = P_{atm}', { anchor: 'start', size: 22 });
    lab(svg, 400, 520, '\\rm{Hg}');
    return svg.render();
  },

  // 11.7 Fig. 2 — the buoyant force on a submerged cylinder
  Figure_11_07_02: () => {
    const svg = new Svg({
      width: 700,
      height: 560,
      title: 'Origin of the buoyant force',
      desc: 'A cylinder of cross-sectional area A is submerged in a fluid of density ρ, with its top at depth h1 and its bottom at depth h2. The fluid pushes down on the top with force F1 = P1A = h1ρgA and up on the bottom with the larger force F2 = P2A = h2ρgA, because pressure increases with depth. Their difference is the buoyant force, F_B = F2 − F1. The horizontal forces cancel.',
    });
    const x0 = 30;
    const x1 = 330;
    const surf = 110;
    svg.rect(x0, surf, x1 - x0, 410, { fill: '#a9c9dc' });
    svg.ellipse((x0 + x1) / 2, surf, (x1 - x0) / 2, 24, {
      fill: '#b7d6ea',
      stroke: WATER_EDGE,
      width: 1.5,
    });
    for (const x of [x0, x1]) svg.line(x, 30, x, 520, { color: GLASS, width: 4 });
    svg.add(
      `<path d="M ${x0} 520 A ${(x1 - x0) / 2} 28 0 0 0 ${x1} 520" fill="none" stroke="${GLASS}" stroke-width="4"/>`
    );
    const cx = 200;
    const yT = 230;
    const yB = 400;
    svg.rect(cx - 55, yT, 110, yB - yT, { fill: '#dbe9f6', stroke: '#6f8fb0', width: 1.2 });
    for (const y of [yT, yB]) {
      svg.add(
        `<ellipse cx="${cx}" cy="${y}" rx="55" ry="12" fill="#dbe9f6" stroke="#333333" stroke-width="1.6" stroke-dasharray="6 4"/>`
      );
    }
    svg.arrow(cx, yT - 80, cx, yT - 4, { color: FORCE, width: 5, head: 20 });
    svg.arrow(cx, yB + 120, cx, yB + 4, { color: FORCE, width: 5, head: 20 });
    lab(svg, cx + 18, yT - 60, '**F**_1', { anchor: 'start' });
    lab(svg, cx + 18, yB + 90, '**F**_2', { anchor: 'start' });
    vdim(svg, 60, surf, yT, 'h_1', { side: 1 });
    vdim(svg, 90, surf, yB, 'h_2', { side: 1 });
    svg.leader(150, 180, cx - 40, yT - 8, { bend: -0.3, width: 1.4 });
    lab(svg, 140, 178, 'A', { anchor: 'end' });
    svg.leader(140, 450, cx - 40, yB + 10, { bend: 0.3, width: 1.4 });
    lab(svg, 130, 452, 'A', { anchor: 'end' });
    lab(svg, 360, 200, 'F_1 = P_1A = h_1ρgA', { anchor: 'start' });
    lab(svg, 400, 320, 'F_B = F_2 − F_1', { anchor: 'start' });
    lab(svg, 360, 460, 'F_2 = P_2A = h_2ρgA', { anchor: 'start' });
    note(svg, 100, 548, 'Fluid of density ρ', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 11.7 Fig. 3 — free-body diagrams for Archimedes' principle
  Figure_11_07_03: () => {
    const svg = new Svg({
      width: 660,
      height: 470,
      title: 'Archimedes’ principle',
      desc: '(a) An object submerged in a fluid has weight w_obj acting down and a buoyant force F_B acting up; in this case the weight is larger, so the object sinks. (b) If the object is removed, the space it occupied fills with fluid of weight w_fl. That fluid is held up by the same buoyant force, so F_B = w_fl: the buoyant force equals the weight of the fluid displaced. A free-body diagram beside each panel shows the forces.',
    });
    for (const [x0, obj, cap] of [
      [10, true, '(a)'],
      [340, false, '(b)'],
    ]) {
      svg.rect(x0, 10, 310, 420, { fill: '#bcd9df', stroke: '#2a8a96', width: 2 });
      const cx = x0 + 105;
      if (obj) {
        svg.rect(cx - 72, 90, 144, 200, { fill: '#f3a65a', stroke: '#b5651d', width: 1.5 });
        svg.ellipse(cx, 90, 72, 20, { fill: '#f6bb79', stroke: '#b5651d', width: 1.5 });
        svg.add(
          `<path d="M ${cx - 72} 290 A 72 20 0 0 0 ${cx + 72} 290" fill="none" stroke="#b5651d" stroke-width="1.5"/>`
        );
      } else {
        for (const y of [90, 290])
          svg.add(
            `<ellipse cx="${cx}" cy="${y}" rx="72" ry="20" fill="none" stroke="#c0392b" stroke-width="1.8" stroke-dasharray="6 4"/>`
          );
        for (const x of [cx - 72, cx + 72])
          svg.line(x, 90, x, 290, { color: '#c0392b', width: 1.8, dash: '6 4' });
      }
      const wLen = obj ? 110 : 56;
      svg.arrow(cx - 30, 290, cx - 30, 290 + wLen, { color: FORCE, width: 4, head: 16 });
      svg.arrow(cx + 40, 350, cx + 40, 294, { color: FORCE, width: 4, head: 16 });
      lab(svg, cx - 30, 290 + wLen + 22, obj ? '**w**_{obj}' : '**w**_{fl}', { size: 21 });
      lab(svg, cx + 40, 374, '**F**_B', { size: 21 });
      note(svg, x0 + 250, 50, 'Free-body', { size: 18 });
      note(svg, x0 + 250, 72, 'diagram', { size: 18 });
      const fx = x0 + 250;
      svg.circle(fx, 190, 6, { fill: COLORS.black });
      svg.arrow(fx, 184, fx, 130, { color: COLORS.black, width: 2, head: 12 });
      svg.arrow(fx, 196, fx, 196 + (obj ? 96 : 54), { color: COLORS.black, width: 2, head: 12 });
      lab(svg, fx + 12, 150, '**F**_B', { anchor: 'start', size: 20 });
      lab(svg, fx + 12, 236, obj ? '**w**_{obj}' : '**w**_{fl}', { anchor: 'start', size: 20 });
      caption(svg, x0 + 155, 458, cap);
    }
    return svg.render();
  },

  // 11.7 Fig. 5 — a hydrometer
  Figure_11_07_05: () => {
    const svg = new Svg({
      width: 520,
      height: 560,
      title: 'A hydrometer',
      desc: 'A glass hydrometer, air-filled and weighted with lead at the bottom, floats upright in a fluid. Its stem is marked with specific gravities from 0.65 at the top to 1.00 lower down; it floats highest in the densest fluids. Here the fluid surface crosses the stem at 0.87, the fluid’s specific gravity.',
    });
    const surf = 0.87;
    // Stem marks from 0.65 (y = 80) to 1.00 (y = 345), linear in this sketch.
    const Y = sg => 80 + ((sg - 0.65) / 0.35) * 265;
    svg.rect(0, Y(surf), 520, 560 - Y(surf), { fill: '#cfd5e6' });
    svg.add(
      `<path d="M 230 ${Y(1.0) + 40} L 230 40 A 30 30 0 0 1 290 40 L 290 ${Y(1.0) + 40} C 330 ${Y(1.0) + 70} 330 ${Y(1.0) + 140} 260 ${Y(1.0) + 190} C 190 ${Y(1.0) + 140} 190 ${Y(1.0) + 70} 230 ${Y(1.0) + 40} Z" fill="#eef2f8" fill-opacity="0.85" stroke="#7d93b5" stroke-width="2"/>`
    );
    svg.add(
      `<path d="M 210 ${Y(1.0) + 130} Q 260 ${Y(1.0) + 112} 310 ${Y(1.0) + 130} C 300 ${Y(1.0) + 160} 280 ${Y(1.0) + 175} 260 ${Y(1.0) + 188} C 240 ${Y(1.0) + 175} 220 ${Y(1.0) + 160} 210 ${Y(1.0) + 130} Z" fill="#59708a"/>`
    );
    for (let k = 0; k <= 35; k += 1) {
      const sg = 0.65 + k / 100;
      const y = Y(sg);
      svg.line(232, y, 232 + (k % 5 ? 10 : 18), y, { color: '#4a6a94', width: 1.5 });
      if (k % 5 === 0) svg.text(256, y, sg.toFixed(2), { size: 24, math: false, anchor: 'start' });
    }
    note(svg, 340, Y(1.0) + 160, 'lead', { anchor: 'start' });
    note(svg, 340, 120, 'air', { anchor: 'start' });
    return svg.render();
  },

  // 11.8 Fig. 4 — the sliding-wire device
  Figure_11_08_04: () => {
    const svg = new Svg({
      width: 620,
      height: 600,
      title: 'Sliding-wire device for measuring surface tension',
      desc: 'A U-shaped wire frame holds a soap film, closed on the right by a sliding wire of length l. The film’s two surfaces pull the wire to the left, so a force F = γ(2l) to the right is needed to hold it in place; the force stays nearly constant as the film is stretched, until it breaks. A side view shows the film’s two surfaces between the frame and the wire.',
    });
    svg.polyline(
      [
        [520, 60],
        [60, 60],
        [60, 340],
        [520, 340],
      ],
      { color: '#888888', width: 14, join: 'round' }
    );
    svg.rect(68, 68, 300, 264, { fill: '#cbd2ec', stroke: '#9aa6d6', width: 1 });
    svg.rect(366, 40, 16, 320, { fill: '#bfbfbf', stroke: '#777777', width: 1.5, rx: 8 });
    for (const y of [110, 170, 230, 290])
      svg.arrow(260, y, 160, y, { color: FORCE, width: 3, head: 15 });
    svg.arrow(400, 200, 520, 200, { color: FORCE, width: 5, head: 20 });
    lab(svg, 460, 170, 'F = γ(2l)');
    vdim(svg, 560, 60, 340, 'l', { side: 1 });
    note(svg, 180, 440, 'Film surfaces', { size: 22 });
    svg.leader(210, 424, 260, 300, { bend: 0.3, width: 1.4 });
    note(svg, 420, 420, 'Wire', { size: 22 });
    svg.leader(420, 404, 376, 362, { bend: 0.3, width: 1.4 });
    // Side view.
    svg.circle(120, 540, 12, { fill: '#cccccc', stroke: '#777777', width: 1.2 });
    svg.circle(480, 540, 12, { fill: '#cccccc', stroke: '#777777', width: 1.2 });
    svg.path('M 130 534 Q 300 546 470 534', { color: '#5b8fd1', width: 2 });
    svg.path('M 130 546 Q 300 534 470 546', { color: '#5b8fd1', width: 2 });
    note(svg, 300, 580, 'Side view', { size: 22 });
    return svg.render();
  },

  // 11.8 Fig. 5 — two balloons joined by a tube
  Figure_11_08_05: () => {
    const svg = new Svg({
      width: 640,
      height: 260,
      title: 'Two balloons of different sizes joined by a tube',
      desc: 'Left: two balloons on the ends of a tube, a large one with pressure P1 and a small one with pressure P2. Because the pressure in a spherical balloon is inversely proportional to its radius, P2 > P1, and when the valve is opened air flows from the small balloon into the large one. Right: afterward the small balloon has emptied into the large one.',
    });
    const tube = (x0, x1) =>
      svg.polyline(
        [
          [x0, 110],
          [x0, 200],
          [x1, 200],
          [x1, 110],
        ],
        { color: COLORS.black, width: 14, join: 'miter' }
      );
    tube(70, 240);
    svg.polyline(
      [
        [70, 110],
        [70, 200],
        [240, 200],
        [240, 110],
      ],
      { color: '#ffffff', width: 10, join: 'miter' }
    );
    svg.circle(70, 70, 50, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    svg.circle(240, 90, 30, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    lab(svg, 70, 72, 'P_1');
    lab(svg, 240, 92, 'P_2');
    svg.arrow(180, 184, 120, 184, { color: COLORS.black, width: 2, head: 12 });
    lab(svg, 155, 236, 'P_2 > P_1');
    tube(410, 590);
    svg.polyline(
      [
        [410, 110],
        [410, 200],
        [590, 200],
        [590, 110],
      ],
      { color: '#ffffff', width: 10, join: 'miter' }
    );
    svg.circle(410, 60, 58, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    return svg.render();
  },

  // 11.8 Fig. 7 — surface tension versus surface area
  Figure_11_08_07: () => {
    const svg = new Svg({
      width: 680,
      height: 420,
      title: 'Surface tension as a function of surface area',
      desc: 'Surface area versus surface tension. For a detergent and for interstitial fluid the surface tension is the same whatever the area, giving vertical lines; interstitial fluid has the higher surface tension. For lung surfactant the surface tension falls as the area decreases, a sloping line. This keeps small alveoli from collapsing and large ones from over-expanding.',
    });
    svg.arrow(70, 360, 640, 360, { color: COLORS.black, width: 2.5, head: 18 });
    svg.arrow(90, 380, 90, 30, { color: COLORS.black, width: 2.5, head: 18 });
    svg.line(240, 50, 240, 360, { color: COLORS.black, width: 2.5 });
    svg.line(500, 50, 500, 360, { color: COLORS.black, width: 2.5 });
    svg.line(120, 290, 410, 120, { color: COLORS.black, width: 2.5 });
    svg.text(310, 160, 'Lung Surfactant', { size: 22, math: false, rotate: -30 });
    note(svg, 260, 290, 'Detergent', { anchor: 'start', size: 22 });
    note(svg, 520, 250, 'Interstitial', { anchor: 'start', size: 22 });
    note(svg, 520, 276, 'fluid', { anchor: 'start', size: 22 });
    note(svg, 360, 396, 'SURFACE TENSION', { size: 22 });
    svg.text(46, 200, 'SURFACE AREA', { size: 22, math: false, rotate: -90 });
    return svg.render();
  },

  // 11.8 Fig. 9 — mercury depressed and water raised in a tube
  Figure_11_08_09: () => {
    const svg = new Svg({
      width: 720,
      height: 620,
      title: 'Mercury and water in a glass tube',
      desc: '(a) In a glass tube standing in mercury, Hg, the contact angle is about 140°, greater than 90°. Surface tension acts along the mercury surface at the walls, with a net force F_ST downward that depresses the mercury in the tube by a height h; the dashed curve shows the shape the surface would have without this flattening. (b) For water the contact angle is about 0°. Surface tension pulls up along the walls, a net force F_ST upward that raises the water a height h above the outside level.',
    });
    // (a)
    {
      const level = 300;
      const h = 30;
      beaker(svg, 30, 330, 200, 420, level, { fill: '#cbd8ea' });
      svg.rect(140, level, 70, 120, { fill: '#cbd8ea' });
      svg.rect(140, level - 10, 70, 10, { fill: '#ffffff' });
      svg.rect(140, level + h - 10, 70, 10, { fill: '#cbd8ea' });
      svg.rect(140, level, 70, h - 10, { fill: '#ffffff' });
      for (const x of [140, 210]) svg.line(x, 60, x, 400, { color: GLASS, width: 4 });
      svg.path(`M 142 ${level + h} Q 175 ${level + h - 22} 208 ${level + h}`, {
        color: '#4a3a8a',
        width: 2,
        dash: '5 4',
      });
      svg.line(142, level + h, 208, level + h, { color: '#4a6a94', width: 2 });
      vdim(svg, 238, level, level + h, 'h', { side: 1 });
      lab(svg, 100, level + 40, '\\rm{Hg}');
      for (const s of [-1, 1]) {
        const x = s < 0 ? 142 : 208;
        svg.arrow(x, level + h, x + s * 80, level + h + 90, {
          color: FORCE,
          width: 2.5,
          head: 14,
          dash: '6 4',
        });
        lab(svg, x + s * 92, level + h + 112, '**F**_{ST}', { size: 20 });
      }
      svg.arrow(175, level + h, 175, level + h + 180, { color: FORCE, width: 4, head: 18 });
      lab(svg, 190, level + h + 170, 'net **F**_{ST}', { anchor: 'start', size: 21 });
      svg.arc(142, level + h, 30, -45, 95, { color: COLORS.black, width: 1.8 });
      lab(svg, 120, 200, 'θ ∼ 140°', { size: 21 });
      svg.leader(130, 214, 150, level + h - 26, { bend: 0.2, width: 1.3 });
      caption(svg, 180, 606, '(a)');
    }
    // (b)
    {
      const level = 330;
      const h = 110;
      beaker(svg, 420, 700, 240, 440, level, { fill: '#a7d1ea' });
      svg.rect(520, level - h, 70, h, { fill: '#a7d1ea' });
      svg.path(
        `M 522 ${level - h - 14} Q 555 ${level - h + 16} 588 ${level - h - 14} L 588 ${level - h + 4} L 522 ${level - h + 4} Z`,
        { color: 'none', width: 0, fill: '#a7d1ea' }
      );
      svg.rect(520, level - h - 20, 70, 10, { fill: '#ffffff' });
      for (const x of [520, 590]) svg.line(x, 60, x, 420, { color: GLASS, width: 4 });
      svg.path(`M 522 ${level - h - 14} Q 555 ${level - h + 16} 588 ${level - h - 14}`, {
        color: '#4a3a8a',
        width: 2,
        dash: '5 4',
      });
      for (const x of [522, 588])
        svg.arrow(x, level - h - 14, x, level - h - 90, {
          color: FORCE,
          width: 2.5,
          head: 14,
          dash: '6 4',
        });
      lab(svg, 500, level - h - 84, '**F**_{ST}', { anchor: 'end', size: 20 });
      lab(svg, 610, level - h - 84, '**F**_{ST}', { anchor: 'start', size: 20 });
      svg.arrow(555, level - h - 6, 555, level - h - 160, { color: FORCE, width: 4, head: 18 });
      lab(svg, 566, level - h - 160, 'net **F**_{ST}', { anchor: 'start', size: 21 });
      vdim(svg, 616, level - h, level, 'h', { side: 1 });
      lab(svg, 610, level - h - 40, 'θ ∼ 0°', { anchor: 'start', size: 21 });
      lab(svg, 460, level + 60, '\\rm{Water}', { anchor: 'start' });
      caption(svg, 560, 606, '(b)');
    }
    return svg.render();
  },

  // 11.8 Fig. 10 — capillary rise depends on radius and density
  Figure_11_08_10: () => {
    const svg = new Svg({
      width: 760,
      height: 480,
      title: 'Capillary action depends on tube radius and fluid density',
      desc: '(a) Four glass tubes of decreasing radius, the widest about 1.8 cm across, stand in the same liquid. The liquid rises higher in narrower tubes, h ∝ 1/r: negligibly in the widest, up to 4 cm in the narrowest. (b) In two identical tubes, a denser fluid rises less than a less dense fluid, since h ∝ 1/ρ.',
    });
    const level = 380;
    beaker(svg, 20, 400, 300, 420, level, { fill: '#a9d2ec' });
    // Rise h = 4 cm in the narrowest tube (r = 0.1 cm), scaled as 1/r.
    const cm = 22;
    const radii = [0.9, 0.45, 0.22, 0.1];
    let x = 60;
    radii.forEach((r, i) => {
      const w = r * 2 * 30 + 6;
      const h = (4 * cm * 0.1) / r;
      svg.rect(x, level - h, w, h, { fill: '#a9d2ec' });
      for (const xx of [x, x + w]) svg.line(xx, 60, xx, 400, { color: GLASS, width: 3 });
      if (i === 3) vdim(svg, x + w + 30, level - h, level, '4 \\rm{cm}', { side: 1, size: 20 });
      x += w + 46;
      return h;
    });
    note(svg, 20, 30, '∼1.8 cm diameter', { anchor: 'start', size: 18 });
    svg.line(80, 40, 80, 58, { color: COLORS.black, width: 1.2 });
    caption(svg, 210, 466, '(a)');
    for (const [x0, h, fill, name] of [
      [450, 50, '#c7cfe0', 'More dense'],
      [610, 160, '#a9d2ec', 'Less dense'],
    ]) {
      beaker(svg, x0, x0 + 130, 300, 420, level, { fill });
      svg.rect(x0 + 56, level - h, 18, h, { fill });
      for (const xx of [x0 + 56, x0 + 74]) svg.line(xx, 160, xx, 400, { color: GLASS, width: 3 });
      note(svg, x0 + 65, 444, name);
    }
    caption(svg, 595, 466, '(b)');
    return svg.render();
  },

  // 11.8 Fig. 11 — negative pressure
  Figure_11_08_11: negativePressure,

  // 11.9 Fig. 5 — the same piston figure, in the section on pressures in the body
  Figure_11_09_05: negativePressure,

  // 11.9 problem — the arm and shovel of a backhoe
  Figure_11_09_06: () => {
    const svg = new Svg({
      width: 700,
      height: 720,
      title: 'Forces on the arm of a backhoe',
      desc: 'The arm of a backhoe, drawn as a straight bar pivoted at its upper end and tilted 30° from the vertical, with a shovel of dirt at its lower end. A hydraulic piston pushes on the arm with force F, applied 0.30 m from the pivot and perpendicular to the arm. The arm’s weight w_arm acts at its center of mass, 1.10 m from the pivot, and the load’s weight w_load acts 1.70 m from the pivot; both point straight down.',
    });
    const P = [190, 125];
    const s = 230; // px per m
    const dir = [Math.sin(rad(30)), Math.cos(rad(30))];
    const at = d => [P[0] + dir[0] * d * s, P[1] + dir[1] * d * s];
    const n = [dir[1], -dir[0]];
    const [A, B] = [at(-0.08), at(1.75)];
    svg.polygon(
      [
        [A[0] - n[0] * 26, A[1] - n[1] * 26],
        [B[0] - n[0] * 26, B[1] - n[1] * 26],
        [B[0] + n[0] * 40, B[1] + n[1] * 40],
        [A[0] + n[0] * 26, A[1] + n[1] * 26],
      ],
      { fill: '#f0d690', stroke: '#b39437', width: 1.5 }
    );
    // Shovel with dirt.
    const L = at(1.7);
    svg.path(
      `M ${L[0] - 20} ${L[1] - 60} L ${L[0] + 110} ${L[1] - 90} L ${L[0] + 90} ${L[1] + 30} Q ${L[0] + 30} ${L[1] + 70} ${L[0] - 20} ${L[1] + 20} Z`,
      {
        color: '#b39437',
        width: 1.5,
        fill: '#f0d690',
      }
    );
    svg.path(
      `M ${L[0] - 10} ${L[1] - 60} Q ${L[0] + 30} ${L[1] - 130} ${L[0] + 100} ${L[1] - 88} Z`,
      { color: '#6f4a20', width: 1, fill: '#9c6b3a' }
    );
    svg.circle(...P, 9, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    const Fp = at(0.3);
    svg.arrow(Fp[0] - n[0] * 170, Fp[1] - n[1] * 170, Fp[0] - n[0] * 26, Fp[1] - n[1] * 26, {
      color: FORCE,
      width: 4,
      head: 18,
    });
    lab(svg, Fp[0] - n[0] * 170, Fp[1] - n[1] * 170 + 28, '**F**');
    const C = at(1.1);
    svg.circle(...C, 6, { fill: COLORS.black });
    svg.arrow(C[0], C[1], C[0], C[1] + 130, { color: FORCE, width: 4, head: 18 });
    lab(svg, C[0] - 12, C[1] + 126, '**w**_{arm}', { anchor: 'end' });
    svg.circle(...L, 6, { fill: COLORS.black });
    svg.arrow(L[0], L[1], L[0], L[1] + 160, { color: FORCE, width: 4, head: 18 });
    lab(svg, L[0] + 12, L[1] + 156, '**w**_{load}', { anchor: 'start' });
    svg.line(C[0], C[1], C[0], C[1] + 100, { color: COLORS.black, width: 1.3, dash: '5 4' });
    svg.arc(C[0], C[1], 60, -90, -60, { color: COLORS.black, width: 1.6 });
    lab(svg, C[0] + 24, C[1] + 82, '30°', { anchor: 'start', size: 21 });
    // Distances measured along the arm, offset to its upper right.
    for (const [d, off, text] of [
      [0.3, 70, '0.30 \\rm{m}'],
      [1.1, 140, '1.10 \\rm{m}'],
      [1.7, 210, '1.70 \\rm{m}'],
    ]) {
      const p0 = [P[0] + n[0] * off, P[1] + n[1] * off];
      const p1 = [at(d)[0] + n[0] * off, at(d)[1] + n[1] * off];
      svg.arrow(...p0, ...p1, { color: COLORS.black, width: 1.4, head: 10, start: true });
      for (const Q of [p0, p1])
        svg.line(Q[0] - n[0] * 10, Q[1] - n[1] * 10, Q[0] + n[0] * 10, Q[1] + n[1] * 10, {
          color: COLORS.black,
          width: 1.3,
        });
      svg.line(...at(d), p1[0] - n[0] * 10, p1[1] - n[1] * 10, {
        color: COLORS.black,
        width: 0.8,
        dash: '3 3',
      });
      lab(svg, (p0[0] + p1[0]) / 2 + n[0] * 30, (p0[1] + p1[1]) / 2 + n[1] * 30, text, {
        size: 21,
        rotate: -60,
      });
    }
    return svg.render();
  },

  // 12.1 Fig. 1 — flow rate through a uniform pipe
  Figure_12_01_01: () => {
    const svg = new Svg({
      width: 710,
      height: 380,
      title: 'Flow rate through a pipe',
      desc: 'A shaded cylinder of fluid of cross-sectional area A and length d flows past point P in a uniform pipe in time t. The cylinder’s volume is V = Ad and the average velocity is v̄ = d/t, so the flow rate is Q = V/t = Ad/t = Av̄.',
    });
    pipe(svg, 40, 660, 160, 80);
    svg.add('<rect x="210" y="80" width="210" height="160" fill="#e26a7a" fill-opacity="0.45"/>');
    ring(svg, 210, 160, 80, { fill: '#f2a3ae', opacity: 0.9, stroke: '#c0392b' });
    ring(svg, 420, 160, 80, { dash: '6 5', opacity: 0, stroke: '#c0392b' });
    svg.circle(420, 236, 6, { fill: '#c0392b' });
    lab(svg, 424, 268, '\\rm{P}');
    svg.arrow(430, 160, 540, 160, { color: GREEN, width: 5, head: 22 });
    lab(svg, 560, 160, '\\bar{v}', { anchor: 'start', size: 28 });
    hdim(svg, 210, 420, 48, 'd', { size: 28 });
    svg.leader(170, 36, 214, 120, { bend: -0.3, width: 1.6 });
    lab(svg, 160, 34, 'A', { anchor: 'end', size: 28 });
    lab(svg, 60, 310, '\\bar{v} = d/t', { anchor: 'start', size: 28 });
    lab(svg, 300, 330, 'Q = V/t = Ad/t = A\\bar{v}', { anchor: 'start', size: 28 });
    return svg.render();
  },

  // 12.1 Fig. 2 — continuity in a narrowing tube
  Figure_12_01_02: () => {
    const svg = new Svg({
      width: 820,
      height: 240,
      title: 'Flow speeds up where a tube narrows',
      desc: 'Fluid flows to the right through a tube that narrows from area A1 at point 1 to area A2 at point 2. Shaded volumes of the same size are shown at each point; the one in the narrow part is longer. For the same volume to pass both points in the same time, A1v1 = A2v2, so the speed v2 in the narrow part is greater than v1.',
    });
    const R1 = 70;
    const R2 = 40;
    const yc = 110;
    // Tube outline.
    const top = [];
    const bot = [];
    for (let x = 30; x <= 800; x += 4) {
      const t = Math.max(0, Math.min(1, (x - 360) / 80));
      const r = R1 + (R2 - R1) * (0.5 - 0.5 * Math.cos(Math.PI * t));
      top.push([x, yc - r]);
      bot.push([x, yc + r]);
    }
    svg.polygon([...top, ...bot.reverse()], { fill: '#eee6f3', stroke: '#8d7ca0', width: 1.5 });
    const len1 = 90;
    // Equal volumes: A1·len1 = A2·len2.
    const len2 = len1 * (R1 / R2) ** 2;
    svg.add(
      `<rect x="110" y="${yc - R1}" width="${len1}" height="${2 * R1}" fill="#9b86b4" fill-opacity="0.5"/>`
    );
    svg.add(
      `<rect x="500" y="${yc - R2}" width="${len2}" height="${2 * R2}" fill="#9b86b4" fill-opacity="0.5"/>`
    );
    ring(svg, 110, yc, R1, { opacity: 0.5 });
    ring(svg, 500, yc, R2, { opacity: 0.5 });
    // Streamlines follow the tube's shape.
    for (const f of [-0.6, 0, 0.6]) {
      const pts = top.map(([x, y]) => [x, yc + f * (yc - y)]);
      streamline(svg, pts, { at: [0.22, 0.85] });
    }
    svg.arrow(260, yc - 22, 320, yc - 22, { color: GREEN, width: 3.5, head: 14 });
    lab(svg, 330, yc - 22, 'v_1', { anchor: 'start', size: 21 });
    svg.arrow(510, yc - 14, 510 + 60 * (R1 / R2) ** 2, yc - 14, {
      color: GREEN,
      width: 3.5,
      head: 14,
    });
    lab(svg, 710, yc - 14, 'v_2', { anchor: 'start', size: 21 });
    lab(svg, 104, 22, 'A_1', { size: 21 });
    lab(svg, 500, 52, 'A_2', { size: 21 });
    svg.circle(200, yc + R1, 5, { fill: COLORS.black });
    lab(svg, 200, yc + R1 + 22, '1', { size: 21, math: false });
    svg.circle(500 + len2, yc + R2, 5, { fill: COLORS.black });
    lab(svg, 500 + len2, yc + R2 + 22, '2', { size: 21, math: false });
    return svg.render();
  },

  // 12.2 Fig. 4 — measuring flow speed with a manometer
  Figure_12_02_04: () => {
    const svg = new Svg({
      width: 880,
      height: 330,
      title: 'Measuring fluid speed with a manometer',
      desc: '(a) A manometer is connected to two small tubes in a flow. Tube 1 opens facing the flow, creating a dead spot where v1 = 0; tube 2 opens on its side, where the fluid passes at speed v2. By Bernoulli’s principle the pressure is higher at tube 1, and the manometer’s fluid levels differ by h proportional to the dynamic pressure ½ρv2². (b) A Pitot tube combines the two openings in one device, with the same reading.',
    });
    const panel = (x0, pitot, cap) => {
      const ys = [40, 60, 80, 110, 130, 150, 170, 190];
      for (const y of ys) {
        const pts = [];
        for (let x = x0; x <= x0 + 210; x += 4) {
          let yy = y;
          const near1 = pitot ? 120 : 160;
          if (x > x0 + 40 && Math.abs(y - near1) < 30)
            yy = y + Math.sign(y - near1 || 1) * 10 * Math.min(1, (x - x0 - 40) / 30);
          pts.push([x, yy]);
        }
        streamline(svg, pts, { width: 1.8, at: [0.7] });
      }
      // Two continuous channels: the upstream-facing stagnation opening
      // connects to the lower manometer level; the static side port to the higher.
      const left = x0 + 240;
      const right = x0 + 320;
      const stagnationY = pitot ? 120 : 160;
      const staticY = pitot ? 98 : 60;
      const channel = d => {
        svg.path(d, { color: '#9a8bb0', width: 20 });
        svg.path(d, { color: '#eee8f4', width: 16 });
      };
      channel(
        `M ${x0 + 60} ${staticY} L ${right} ${staticY} L ${right} 250 A 40 40 0 0 1 ${left} 250 L ${left} ${stagnationY} L ${x0 + 60} ${stagnationY}`
      );
      // Rounded, closed nose on the static tube; the gap at its top is the side port.
      svg.path(`M ${x0 + 60} ${staticY - 10} Q ${x0 + 40} ${staticY} ${x0 + 60} ${staticY + 10}`, {
        color: '#9a8bb0',
        width: 2,
        fill: '#eee8f4',
      });
      svg.line(x0 + 104, staticY - 10, x0 + 118, staticY - 10, { color: '#ffffff', width: 4 });
      // Mercury remains a single U-shaped column, lower on the high-pressure side.
      svg.path(`M ${left} 185 L ${left} 250 A 40 40 0 0 0 ${right} 250 L ${right} 145`, {
        color: '#9a6fb5',
        width: 16,
      });
      svg.line(left - 10, 185, right + 30, 185, { color: COLORS.black, width: 1.2, dash: '5 4' });
      vdim(svg, right + 30, 145, 185, 'h', { size: 20 });
      lab(svg, x0 + 48, stagnationY, '1', { anchor: 'end', size: 18, math: false });
      lab(svg, x0 + 140, staticY - 22, '2', { size: 18, math: false });
      lab(svg, x0 + 20, 220, 'v_1 = 0', { anchor: 'start', size: 18 });
      lab(svg, x0 + 120, 26, 'v_2', { size: 18 });
      caption(svg, x0 + 190, 316, cap);
    };
    panel(10, false, '(a)');
    panel(440, true, '(b)');
    return svg.render();
  },

  // 12.2 Fig. 5 — a Venturi tube
  Figure_12_02_05: () => {
    const svg = new Svg({
      width: 760,
      height: 400,
      title: 'A Venturi tube',
      desc: 'Fluid flows to the right through a tube with a narrow middle section, the Venturi constriction. The streamlines crowd together in the constriction, where the speed is higher and the pressure lower. That low pressure draws a second fluid, the entrained fluid, in through a narrow side tube on top of the constriction.',
    });
    const yc = 220;
    const r = x => {
      const t = (x - 380) / 160;
      return Math.abs(t) > 1 ? 110 : 110 - 56 * (0.5 + 0.5 * Math.cos(Math.PI * t));
    };
    const top = [];
    const bot = [];
    for (let x = 40; x <= 720; x += 4) {
      top.push([x, yc - r(x)]);
      bot.push([x, yc + r(x)]);
    }
    svg.polygon([...top, ...bot.slice().reverse()], {
      fill: '#cfe7f5',
      stroke: '#8fb7cf',
      width: 2,
    });
    svg.rect(366, 40, 28, yc - r(380) - 38, { fill: '#cfe7f5', stroke: '#8fb7cf', width: 2 });
    svg.rect(368, yc - r(380) - 4, 24, 8, { fill: '#cfe7f5' });
    for (const f of [-0.7, 0, 0.7]) {
      streamline(
        svg,
        top.map(([x]) => [x, yc + f * r(x) * 0.9]),
        { width: 3, at: [0.2, 0.5, 0.85] }
      );
    }
    // The entrained fluid comes down the side tube and turns to join the flow.
    const ent = [];
    for (let k = 0; k <= 40; k += 1) {
      const u = k / 40;
      const x = 380 + 110 * u ** 2;
      const yTop = yc - r(x) + 14;
      ent.push([x, 50 + (yTop - 50) * Math.sqrt(u)]);
    }
    streamline(svg, ent, { width: 3, at: [0.3] });
    note(svg, 430, 30, 'Entrained fluid', { anchor: 'start', size: 26 });
    svg.leader(426, 30, 386, 60, { bend: 0.3, width: 1.5 });
    note(svg, 70, 140, 'Fluid flow', { anchor: 'start', size: 26 });
    svg.arrow(210, 140, 300, 172, { color: COLORS.black, width: 1.8, head: 12 });
    note(svg, 380, 380, 'Venturi constriction', { size: 26 });
    svg.leader(380, 356, 380, yc + r(380) + 4, { bend: 0.3, width: 1.5 });
    return svg.render();
  },

  // 12.3 question — water leaking from an old boot
  Figure_12_03_03: () => {
    const svg = new Svg({
      width: 760,
      height: 560,
      title: 'Water leaking from two holes in a boot',
      desc: 'A rubber boot filled with water to the top has two leaks at the same height near its sole: Leak 1 at the toe, from which water squirts up and to the right, and Leak 2 at the heel, from which water squirts to the left.',
    });
    const leakY = 455;
    svg.path(
      'M 100 50 L 112 470 Q 112 520 140 520 L 590 520 Q 630 514 624 470 Q 614 424 560 416 Q 470 404 425 372 Q 384 344 382 300 L 380 50 Z',
      { color: '#9c8556', width: 2, fill: '#d7c49a' }
    );
    svg.path('M 112 488 L 622 488', { color: '#9c8556', width: 1.6 });
    svg.path('M 380 345 Q 340 360 330 400', { color: '#9c8556', width: 1.2 });
    svg.ellipse(240, 50, 140, 15, { fill: '#bfe0f5', stroke: '#9c8556', width: 2 });
    svg.path('M 102 70 Q 240 92 380 70', { color: '#9c8556', width: 1.4 });
    // Jets: Leak 1 squirts up and right from the toe; Leak 2 sideways from the heel.
    // Both leaks are at the same depth, so the water leaves them at the same speed.
    const jet = (x, vx, vy, len) => {
      for (const s of [0.8, 1, 1.2]) {
        const pts = [];
        for (let t = 0; t <= 1; t += 0.05) {
          pts.push([x + vx * s * t * len, leakY - vy * s * t * len + 1.6 * len * t * t]);
        }
        svg.polyline(pts, { color: '#5fb1e0', width: 1.6 });
      }
    };
    jet(624, 1.1, 1.4, 100);
    jet(111, -1.7, 0.4, 55);
    note(svg, 620, 368, 'Leak 1', { size: 30 });
    note(svg, 70, 382, 'Leak 2', { size: 30 });
    return svg.render();
  },

  // 12.4 Fig. 2 — laminar layers versus turbulence behind an obstruction
  Figure_12_04_02: () => {
    const svg = new Svg({
      width: 930,
      height: 350,
      title: 'Laminar and turbulent flow',
      desc: '(a) Laminar flow over a smooth fixed surface: the fluid moves right in layers that do not mix. The top layer moves fastest, at vt, and each layer below is slower, down to vb next to the surface, because friction acts between the layers and with the surface. (b) An obstruction on the bottom makes the flow turbulent: streamlines that start out smooth break into swirling eddies over and behind it. The fluid approaches at speed v both near the top and near the bottom.',
    });
    // (a) Five layers, slowest at the bottom.
    const bands = ['#7d97c6', '#a3b5d6', '#bcc6e2', '#d6dcec', '#eef1f7'];
    const [ax0, ax1, top, floor] = [5, 410, 10, 230];
    const bh = (floor - top) / bands.length;
    svg.add(
      '<defs><linearGradient id="sand_a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5bf5a"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>'
    );
    svg.rect(ax0, floor, ax1 - ax0, 35, { fill: 'url(#sand_a)' });
    bands.forEach((c, k) => svg.rect(ax0, top + k * bh, ax1 - ax0, bh, { fill: c }));
    const wavy = y =>
      svg.polyline(
        Array.from({ length: 41 }, (_, j) => [
          ax0 + ((ax1 - ax0) * j) / 40,
          y + 1.6 * Math.sin(j * 1.3) + Math.sin(j * 0.45),
        ]),
        { color: '#8a8f9a', width: 1.4 }
      );
    for (let k = 1; k <= bands.length; k += 1) wavy(top + k * bh);
    bands.forEach((_, k) => {
      const yc = top + (k + 0.5) * bh;
      svg.arrow(98, yc, 98 + 40 + 0.6 * (floor - yc), yc, { color: GREEN, width: 2.5, head: 15 });
    });
    lab(svg, 72, top + bh / 2, 'v_t');
    lab(svg, 72, floor - bh / 2, 'v_b');
    svg.squiggle(330, 278, 330, top + 2 * bh, { waves: 2.5, amp: 5 });
    svg.squiggle(378, 278, 378, top + 4 * bh, { waves: 2, amp: 5 });
    note(svg, 300, 296, 'Friction between layers', { size: 20 });
    caption(svg, 207, 334, '(a)');

    // (b) Turbulence over and behind an obstruction.
    svg.add(
      '<defs><linearGradient id="fluid_b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3e6ee"/><stop offset="1" stop-color="#b9c2da"/></linearGradient></defs>'
    );
    svg.path('M 425 40 C 520 30 600 22 680 34 C 760 46 830 6 925 22 L 925 300 L 425 300 Z', {
      color: '#9aa2b4',
      width: 1.2,
      fill: 'url(#fluid_b)',
    });
    const ground = [
      [425, 240],
      [560, 234],
      [582, 212],
      [610, 214],
      [626, 190],
      [652, 162],
      [700, 166],
      [722, 155],
      [790, 158],
      [806, 172],
      [848, 268],
      [925, 272],
    ];
    svg.polygon([...ground, [925, 300], [425, 300]], { fill: '#e5bf5a', stroke: '#c9a03b' });
    const rnd = rng(11);
    for (let k = 0; k < 26; k += 1) {
      const x = 440 + 470 * rnd();
      let y = 0;
      for (let j = 0; j < ground.length - 1; j += 1)
        if (x >= ground[j][0] && x <= ground[j + 1][0])
          y =
            ground[j][1] +
            ((x - ground[j][0]) / (ground[j + 1][0] - ground[j][0])) *
              (ground[j + 1][1] - ground[j][1]);
      const yy = y + 12 + (295 - y - 18) * rnd();
      svg.path(blobPath(x, yy, 4 + 4 * rnd(), rnd, { n: 5, wobble: 0.5, stretch: 2 }), {
        color: 'none',
        width: 0,
        fill: '#c9a03b',
      });
    }
    flowArrow(svg, [
      [425, 52],
      [600, 46],
      [760, 52],
      [925, 60],
    ]);
    flowArrow(svg, [
      [425, 108],
      [520, 84],
      [630, 80],
      [700, 92],
      [736, 116],
    ]);
    flowArrow(svg, [
      [425, 168],
      [500, 128],
      [580, 116],
      [636, 136],
    ]);
    flowArrow(svg, [
      [425, 226],
      [462, 188],
      [505, 182],
      [544, 198],
      [556, 216],
    ]);
    flowArrow(svg, [
      [786, 98],
      [850, 108],
      [920, 150],
    ]);
    for (const [x, y, s] of [
      [596, 210, 1],
      [660, 136, -1],
      [744, 128, 1],
      [800, 140, -1],
      [856, 186, 1],
      [880, 236, -1],
      [690, 44, 1],
      [748, 82, -1],
    ]) {
      curl(svg, x, y, 15, s * -100, s * 110);
      curl(svg, x + 4, y + 2, 11, s * 80 + 180, s * 280 + 180, { color: '#ffffff', width: 3 });
    }
    svg.arrow(445, 32, 630, 32, { color: GREEN, width: 3, head: 16 });
    lab(svg, 436, 32, 'v', { anchor: 'end' });
    svg.arrow(482, 226, 548, 226, { color: GREEN, width: 3, head: 16 });
    lab(svg, 474, 226, 'v', { anchor: 'end' });
    caption(svg, 675, 334, '(b)');
    return svg.render();
  },

  // 12.4 Fig. 3 — laminar flow between two plates
  Figure_12_04_03: () => {
    const svg = new Svg({
      width: 760,
      height: 440,
      title: 'Laminar flow between two plates',
      desc: 'Fluid fills the gap of thickness L between two plates of area A. The bottom plate is fixed. A force F pushes the top plate to the right at speed v, and it drags the fluid along in layers: the layer touching the top plate moves at v, each layer below moves a little slower, and the layer on the fixed bottom plate has v = 0.',
    });
    const n = 9;
    const x0 = 80;
    const yTop = 120;
    const yBot = 380;
    const dx = 18;
    for (let k = n - 1; k >= 0; k -= 1) {
      const y = yTop + ((k + 0.5) * (yBot - yTop)) / n;
      const shift = (n - 1 - k) * dx;
      svg.polygon(
        [
          [x0 + shift, y],
          [x0 + shift + 320, y],
          [x0 + shift + 420, y - 70],
          [x0 + shift + 100, y - 70],
        ],
        { fill: '#a9d6f2', stroke: '#3f8cc2', width: 1 }
      );
    }
    svg.polygon(
      [
        [x0, yBot + 14],
        [x0 + 320, yBot + 14],
        [x0 + 420, yBot - 56],
        [x0 + 100, yBot - 56],
      ],
      { fill: '#7f9a80', stroke: '#4f6a50', width: 1.2 }
    );
    const ts = n * dx;
    svg.polygon(
      [
        [x0 + ts, yTop],
        [x0 + ts + 320, yTop],
        [x0 + ts + 420, yTop - 70],
        [x0 + ts + 100, yTop - 70],
      ],
      { fill: '#9fb4a0', stroke: '#4f6a50', width: 1.5 }
    );
    svg.arrow(x0 + ts - 90, yTop - 26, x0 + ts + 20, yTop - 26, {
      color: FORCE,
      width: 5,
      head: 20,
    });
    lab(svg, x0 + ts - 60, yTop - 50, 'F');
    svg.arrow(x0 + ts + 320, yTop, x0 + ts + 440, yTop, { color: GREEN, width: 4, head: 18 });
    lab(svg, x0 + ts + 452, yTop, 'v', { anchor: 'start' });
    vdim(svg, x0 + 30, yTop, yBot + 14, 'L', { side: -1 });
    lab(svg, x0 + 380, yBot + 34, 'v = 0');
    svg.leader(x0 + ts + 170, 24, x0 + ts + 230, yTop - 36, { bend: 0.3, width: 1.5 });
    lab(svg, x0 + ts + 160, 22, 'A', { anchor: 'end' });
    return svg.render();
  },

  // 12.4 Fig. 5 — Poiseuille flow
  Figure_12_04_05: () => {
    const svg = new Svg({
      width: 680,
      height: 340,
      title: 'Poiseuille flow through a tube',
      desc: 'Fluid of viscosity η flows through a tube of radius r and length l, from the end at higher pressure P2 to the end at lower pressure P1. Arrows across the tube show the parabolic velocity profile of laminar flow: fastest at the center, zero at the walls. The flow rate Q is proportional to the pressure difference P2 − P1 and to r⁴, and inversely proportional to η and l.',
    });
    const yc = 150;
    const R = 110;
    pipe(svg, 90, 600, yc, R);
    for (let k = -4; k <= 4; k += 1) {
      const y = yc + (k / 4.6) * R;
      const v = 1 - (k / 4.6) ** 2;
      svg.arrow(330, y, 330 + 120 * v + 2, y, { color: FLOW, width: 2.5, head: 12 });
    }
    svg.arrow(330, yc + 10, 470, yc + 10, { color: FORCE, width: 5, head: 20 });
    lab(svg, 390, yc - 10, 'Q');
    svg.circle(90, yc + 30, 5, { fill: COLORS.black });
    svg.arrow(90, yc + 30, 104, yc - R + 6, { color: COLORS.black, width: 1.6, head: 10 });
    lab(svg, 112, yc - 30, 'r', { anchor: 'start' });
    lab(svg, 58, yc, 'P_2', { anchor: 'end' });
    lab(svg, 640, yc, 'P_1', { anchor: 'start' });
    note(svg, 240, yc - 70, 'Viscosity η', { size: 26 });
    hdim(svg, 90, 600, yc + R + 40, 'l', { below: true });
    return svg.render();
  },

  // 12.4 question — an air-filled tube near a faucet
  Figure_12_04_08: () => {
    const svg = new Svg({
      width: 880,
      height: 780,
      title: 'Air-filled tube near a water faucet',
      desc: 'A horizontal water pipe leads to a faucet, from which water pours. Just before the faucet a vertical tube, closed at the top, rises from the pipe. Water fills the pipe, and the tube above it stays full of air.',
    });
    const METAL = '#b8bcc2';
    const PIPEW = '#c7e3f3';
    // Closed air tube
    svg.rect(215, 10, 115, 410, { fill: METAL, stroke: '#80858c', width: 1.5, rx: 16 });
    svg.rect(227, 22, 91, 400, { fill: '#f4f6f8', rx: 8 });
    // Pipe and faucet spout, drawn as a stroked tube
    const center = 'M 0 415 L 520 415 Q 640 415 668 520';
    svg.add(`<path d="${center}" fill="none" stroke="#80858c" stroke-width="104"/>`);
    svg.add(`<path d="${center}" fill="none" stroke="${METAL}" stroke-width="100"/>`);
    svg.add(`<path d="${center}" fill="none" stroke="${PIPEW}" stroke-width="78"/>`);
    // Union nut on the pipe
    svg.rect(395, 355, 40, 16, { fill: METAL, stroke: '#80858c', width: 1.2 });
    svg.rect(395, 459, 40, 16, { fill: METAL, stroke: '#80858c', width: 1.2 });
    // Valve: bonnet, stem and handle
    svg.rect(520, 300, 64, 66, { fill: METAL, stroke: '#80858c', width: 1.5, rx: 4 });
    for (let y = 312; y < 362; y += 9)
      svg.line(522, y, 582, y + 4, { color: '#80858c', width: 1.2 });
    svg.rect(512, 278, 80, 24, { fill: '#a3a8af', stroke: '#80858c', width: 1.5, rx: 3 });
    svg.rect(542, 238, 20, 42, { fill: '#a3a8af', stroke: '#80858c', width: 1.5 });
    svg.add(
      '<path d="M 462 226 Q 470 210 552 222 Q 634 210 642 226 Q 634 246 552 236 Q 470 246 462 226 Z" fill="#a3a8af" stroke="#80858c" stroke-width="1.5"/>'
    );
    // Falling stream
    svg.add(
      '<path d="M 629 526 L 707 505 Q 735 640 790 770 L 690 770 Q 645 640 629 526 Z" fill="#bfe0f5" stroke="#7fb6d6" stroke-width="1.5"/>'
    );
    for (const [a, b] of [
      [655, 700],
      [680, 735],
    ]) {
      svg.path(`M ${a} 560 Q ${a + 15} 660 ${b} 760`, { color: '#ffffff', width: 2 });
    }
    note(svg, 440, 72, 'Air', { size: 30, anchor: 'start' });
    svg.squiggle(432, 72, 290, 52, { amp: 6 });
    note(svg, 410, 182, 'Water', { size: 30, anchor: 'start' });
    svg.squiggle(398, 196, 350, 410, { amp: 6 });
    note(svg, 738, 296, 'Faucet', { size: 30, anchor: 'start' });
    svg.squiggle(728, 296, 592, 340, { amp: 6 });
    return svg.render();
  },

  // 12.5 Fig. 1 — laminar and turbulent flow in a narrowed vessel
  Figure_12_05_01: () => {
    const svg = new Svg({
      width: 760,
      height: 420,
      title: 'Laminar and turbulent flow in a blood vessel narrowed by plaque',
      desc: 'Blood flows to the right through a vessel that narrows where plaque, hatched, lines its walls. In the wide part the flow is laminar, smooth streamlines moving at speed v1. Entering the narrow part it speeds up to v2, and further on, at the same mean speed v3 = v2, the flow becomes turbulent, full of eddies. In the transition region the flow can oscillate between laminar and turbulent.',
    });
    const yc = 140;
    const r = x =>
      x < 290 ? 100 : x > 360 ? 52 : 100 - 48 * (0.5 - 0.5 * Math.cos((Math.PI * (x - 290)) / 70));
    svg.line(20, yc - 116, 740, yc - 116, { color: COLORS.black, width: 2 });
    svg.line(20, yc + 116, 740, yc + 116, { color: COLORS.black, width: 2 });
    const top = [];
    const bot = [];
    for (let x = 20; x <= 740; x += 4) {
      top.push([x, yc - r(x)]);
      bot.push([x, yc + r(x)]);
    }
    svg.polygon([...top, ...bot.slice().reverse()], { fill: '#f6c7c7' });
    svg.polyline(top, { color: COLORS.black, width: 1.6 });
    svg.polyline(bot, { color: COLORS.black, width: 1.6 });
    for (let x = 320; x < 740; x += 36) {
      for (const s of [-1, 1]) {
        const y1 = yc + s * (r(x) + 4);
        svg.line(x, y1, x + 22, yc + s * 112, { color: COLORS.black, width: 1.3 });
      }
    }
    for (const f of [-0.75, 0, 0.75]) {
      const pts = top.filter(([x]) => x < 360).map(([x]) => [x, yc + f * r(x)]);
      streamline(svg, pts, { at: [0.35, 0.8] });
    }
    const rnd = rng(5);
    for (let k = 0; k < 16; k += 1)
      eddy(svg, 380 + 340 * rnd(), yc + (rnd() - 0.5) * 80, rnd() > 0.5 ? 1 : -1);
    svg.arrow(70, yc + 20, 120, yc + 20, { color: GREEN, width: 3.5, head: 14 });
    lab(svg, 130, yc + 20, 'v_1', { anchor: 'start' });
    svg.arrow(360, yc + 14, 410, yc + 14, { color: GREEN, width: 3.5, head: 14 });
    lab(svg, 330, yc + 14, 'v_2', { anchor: 'end' });
    svg.arrow(540, yc + 6, 590, yc + 6, { color: GREEN, width: 3.5, head: 14 });
    lab(svg, 560, yc + 30, 'v_3');
    note(svg, 140, yc + 150, 'Laminar', { size: 26 });
    note(svg, 650, yc + 150, 'Turbulent', { size: 26 });
    note(svg, 420, yc + 200, 'Transitional—oscillates between', { size: 24 });
    note(svg, 420, yc + 232, 'laminar and turbulent', { size: 24 });
    return svg.render();
  },

  // 12.5 question — a drain insert divided into four sections
  Figure_12_05_02: () => {
    const svg = new Svg({
      width: 750,
      height: 330,
      title: 'A drain insert with four partitions',
      desc: 'A short, wide ring, like a section of a cylinder, divided into four equal sections by two crossed partitions that meet along its axis. Devices like this sit in drains and increase the flow rate by preventing the water from swirling.',
    });
    const [cx, cy, rx, ry, h] = [375, 95, 350, 78, 110];
    svg.add(
      `<defs><clipPath id="drain12"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"/></clipPath><linearGradient id="ring12" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7fa48f"/><stop offset="0.45" stop-color="#cfe0d5"/><stop offset="1" stop-color="#7fa48f"/></linearGradient></defs>`
    );
    // Inside: back wall, floor and partitions, clipped to the rim.
    svg.ellipse(cx, cy, rx, ry, { fill: '#93b5a1', stroke: 'none', width: 0 });
    const inner = [`<ellipse cx="${cx}" cy="${cy + h}" rx="${rx}" ry="${ry}" fill="#d6e5db"/>`];
    // Each partition is split at the axis into two halves, drawn back to front.
    const halves = [];
    for (const a of [160, 70, 340, 250]) {
      const t = (a * Math.PI) / 180;
      halves.push([cx + rx * Math.cos(t), cy - ry * Math.sin(t)]);
    }
    halves.sort((p, q) => p[1] - q[1]);
    const shades = ['#e9f1ec', '#c9dccf', '#b5cfbe', '#dbe8df'];
    halves.forEach(([x, y], k) => {
      inner.push(
        `<polygon points="${cx},${cy} ${x.toFixed(1)},${y.toFixed(1)} ${x.toFixed(1)},${(y + h).toFixed(1)} ${cx},${cy + h}" fill="${shades[k]}" stroke="#2f3e36" stroke-width="1.5"/>`
      );
    });
    svg.add(`<g clip-path="url(#drain12)">${inner.join('')}</g>`);
    // Outer wall in front
    svg.add(
      `<path d="M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy + h} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy + h} Z" fill="url(#ring12)" stroke="#2f3e36" stroke-width="1.5"/>`
    );
    svg.ellipse(cx, cy, rx, ry, { fill: 'none', stroke: '#2f3e36', width: 1.5 });
    return svg.render();
  },

  // 12.6 Fig. 1 — flow past a sphere at increasing speed
  Figure_12_06_01: () => {
    const svg = new Svg({
      width: 900,
      height: 300,
      title: 'Flow past a sphere at increasing Reynolds number',
      desc: 'The motion of a sphere to the right is equivalent to fluid flowing to the left past it. (a) At low speed (N′_R less than 1) the flow is laminar and the streamlines close smoothly behind the sphere; viscous drag F_V acts to the left. (b) At higher speed the flow separates from the sphere at the separation points and eddies form behind it; the drag F′_V is larger. (c) At still higher speed the wake is fully turbulent and the drag F″_V is larger still.',
    });
    const panel = (x0, kind, cap, F) => {
      const W = 280;
      const H = 250;
      const c = [x0 + W / 2, 130];
      const R = 46;
      svg.rect(x0, 10, W, H, { fill: '#c9e6ef' });
      // Qualitative streamlines ψ = y(1 − R²/(x² + y²)) = const, flowing left.
      for (let k = -6; k <= 6; k += 1) {
        if (k === 0) continue;
        const psi = k * 18;
        const pts = [];
        for (let x = -W / 2 + 4; x <= W / 2 - 4; x += 3) {
          // Solve the symmetric streamline equation outside the sphere silhouette.
          let lo = Math.sqrt(Math.max(0, R * R - x * x));
          let hi = R + Math.abs(psi);
          for (let it = 0; it < 40; it += 1) {
            const mid = (lo + hi) / 2;
            const value = mid * (1 - (R * R) / (x * x + mid * mid));
            if (value < Math.abs(psi)) lo = mid;
            else hi = mid;
          }
          const y = (Math.sign(psi) * (lo + hi)) / 2;
          const wake = kind !== 'a' && x > 0 && Math.abs(y) < R + 24;
          if (wake) {
            if (pts.length > 4) streamline(svg, pts, { width: 1.8, at: [0.5] });
            pts.length = 0;
            continue;
          }
          pts.push([c[0] - x, c[1] - y]);
        }
        if (pts.length > 4) streamline(svg, pts, { width: 1.8, at: [0.3] });
      }
      if (kind !== 'a') {
        const rnd = rng(kind === 'b' ? 3 : 9);
        const n = kind === 'b' ? 7 : 22;
        for (let i = 0; i < n; i += 1) {
          const x = c[0] - R - 8 - rnd() * (kind === 'b' ? 50 : 100);
          const y = c[1] + (rnd() - 0.5) * (kind === 'b' ? 80 : 150);
          eddy(svg, x, y, rnd() > 0.5 ? 1 : -1);
        }
      }
      svg.circle(...c, R, { fill: '#f2b3b8', stroke: '#b46b72', width: 1.5 });
      svg.arrow(c[0] - R, c[1], c[0] - R - 50 - F * 18, c[1], { color: FORCE, width: 4, head: 16 });
      lab(svg, c[0] - R - 30, c[1] + 22, ['F_V', 'F′_V', 'F″_V'][F], { size: 20 });
      if (kind === 'b') {
        for (const s of [-1, 1])
          svg.circle(c[0] - 10, c[1] + s * (R - 2), 4, { fill: COLORS.black });
        note(svg, c[0] + 70, c[1] - 70, 'Separation', { size: 16 });
        note(svg, c[0] + 70, c[1] - 52, 'points', { size: 16 });
      }
      caption(svg, c[0], 286, cap);
    };
    panel(10, 'a', '(a)', 0);
    panel(310, 'b', '(b)', 1);
    panel(610, 'c', '(c)', 2);
    return svg.render();
  },

  // 12.6 Fig. 2 — forces on an object falling through a viscous fluid
  Figure_12_06_02: () => {
    const svg = new Svg({
      width: 640,
      height: 560,
      title: 'Forces on an object falling through a viscous fluid',
      desc: 'An oval object of length L and density ρ_obj falls through a fluid of density ρ_fl. Three forces act on it: its weight w downward, the viscous drag F_V upward, and the buoyant force F_B upward. A free-body diagram beside it shows the same three forces; at terminal velocity they balance.',
    });
    svg.add(
      '<defs><radialGradient id="halo1206"><stop offset="0.55" stop-color="#b8c4e6"/><stop offset="1" stop-color="#ffffff"/></radialGradient></defs><ellipse cx="270" cy="250" rx="260" ry="170" fill="url(#halo1206)"/>'
    );
    svg.path(
      'M 60 250 C 60 200 250 170 380 175 C 440 178 470 210 470 250 C 470 300 430 330 360 330 C 230 330 60 300 60 250 Z',
      {
        color: '#c0392b',
        width: 1.6,
        fill: '#f39a6b',
      }
    );
    svg.arrow(62, 250, 468, 250, { color: COLORS.black, width: 1.8, head: 12, start: true });
    lab(svg, 265, 250, 'L', { size: 28 });
    lab(svg, 400, 290, 'ρ_{obj}', { size: 24 });
    lab(svg, 150, 340, 'ρ_{fl}', { size: 24 });
    svg.arrow(220, 230, 220, 60, { color: FORCE, width: 5, head: 20 });
    lab(svg, 200, 70, '**F**_V', { anchor: 'end' });
    svg.arrow(380, 200, 380, 130, { color: FORCE, width: 5, head: 20 });
    lab(svg, 396, 130, '**F**_B', { anchor: 'start' });
    svg.arrow(260, 270, 260, 510, { color: FORCE, width: 5, head: 20 });
    lab(svg, 276, 520, '**w**', { anchor: 'start' });
    note(svg, 560, 30, 'Free-body', { size: 22 });
    note(svg, 560, 56, 'diagram', { size: 22 });
    svg.circle(560, 250, 6, { fill: COLORS.maroon });
    svg.arrow(560, 244, 560, 91, { color: COLORS.black, width: 2, head: 13 });
    svg.arrow(550, 244, 550, 181, { color: COLORS.black, width: 2, head: 11 });
    svg.arrow(560, 256, 560, 472, { color: COLORS.black, width: 2, head: 13 });
    lab(svg, 572, 160, '**F**_V', { anchor: 'start', size: 22 });
    lab(svg, 540, 214, '**F**_B', { anchor: 'end', size: 22 });
    lab(svg, 572, 380, '**w**', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 12.7 Fig. 1 — a random walk
  Figure_12_07_01: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'A random walk',
      desc: 'The path of a molecule moving randomly through a fluid in time t: a series of straight steps in random directions, from the start point to the finish point. Its net displacement x from start to finish is much smaller than the total distance traveled.',
    });
    const rnd = rng(23);
    const pts = [[360, 420]];
    for (let k = 0; k < 18; k += 1) {
      const [x, y] = pts.at(-1);
      let nx = x;
      let ny = y;
      for (let tries = 0; tries < 20; tries += 1) {
        const a = 2 * Math.PI * rnd();
        const len = 90 + 140 * rnd();
        nx = x + len * Math.cos(a);
        ny = y + len * Math.sin(a);
        if (nx > 30 && nx < 530 && ny > 30 && ny < 470) break;
      }
      pts.push([nx, ny]);
    }
    pts.push([300, 440]);
    for (let k = 0; k < pts.length - 1; k += 1) {
      const [a, b] = [pts[k], pts[k + 1]];
      svg.line(...a, ...b, { color: COLORS.black, width: 2 });
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      svg.arrow(
        m[0] - ((b[0] - a[0]) / L) * 8,
        m[1] - ((b[1] - a[1]) / L) * 8,
        m[0] + ((b[0] - a[0]) / L) * 8,
        m[1] + ((b[1] - a[1]) / L) * 8,
        {
          color: COLORS.black,
          width: 2,
          head: 14,
        }
      );
    }
    const [S, F] = [pts[0], pts.at(-1)];
    svg.line(...S, ...F, { color: COLORS.black, width: 1.6, dash: '6 4' });
    svg.circle(...S, 8, { fill: COLORS.maroon });
    svg.circle(...F, 8, { fill: COLORS.maroon });
    note(svg, S[0] + 14, S[1] + 4, 'Start', { anchor: 'start', size: 24 });
    note(svg, F[0] - 14, F[1] + 26, 'Finish', { anchor: 'end', size: 24 });
    lab(svg, (S[0] + F[0]) / 2, (S[1] + F[1]) / 2 + 26, 'x');
    return svg.render();
  },

  // 12.7 Fig. 2 — diffusion from higher to lower concentration
  Figure_12_07_02: () => {
    const svg = new Svg({
      width: 680,
      height: 480,
      title: 'Diffusion from higher to lower concentration',
      desc: 'A tube of cross-sectional area A holds molecules moving randomly, each with a short arrow showing its direction. Region 1 on the left has a higher concentration C1 than region 2 on the right, C2. Molecules cross the gap Δx between the regions in both directions, but more cross from region 1 to region 2, so the net diffusion is from higher to lower concentration, at a rate proportional to C1 − C2.',
    });
    const yT = 80;
    const yB = 400;
    svg.line(50, yT, 600, yT, { color: COLORS.black, width: 3 });
    svg.line(50, yB, 600, yB, { color: COLORS.black, width: 3 });
    svg.ellipse(600, (yT + yB) / 2, 50, (yB - yT) / 2, {
      fill: 'none',
      stroke: COLORS.black,
      width: 3,
    });
    svg.add(
      `<path d="M 50 ${yT} A 50 ${(yB - yT) / 2} 0 0 0 50 ${yB}" fill="none" stroke="${COLORS.black}" stroke-width="3"/>`
    );
    for (const x of [240, 400])
      svg.path(`M ${x} ${yT} A 50 ${(yB - yT) / 2} 0 0 0 ${x} ${yB}`, {
        color: COLORS.black,
        width: 3,
        dash: '8 6',
      });
    const rnd = rng(13);
    const place = (x0, x1, n) => {
      for (let k = 0; k < n; k += 1) {
        const x = x0 + (x1 - x0) * rnd();
        const y = yT + 20 + (yB - yT - 40) * rnd();
        const a = 2 * Math.PI * rnd();
        svg.arrow(x, y, x + 32 * Math.cos(a), y + 32 * Math.sin(a), {
          color: GREEN,
          width: 2.2,
          head: 10,
        });
        svg.circle(x, y, 7, { fill: '#e2694a', stroke: '#7a2a1a', width: 1 });
      }
    };
    place(40, 220, 30);
    place(240, 390, 10);
    place(410, 570, 4);
    note(svg, 150, 50, 'Region 1', { size: 28 });
    note(svg, 480, 50, 'Region 2', { size: 28 });
    lab(svg, 120, 110, 'C_1');
    lab(svg, 470, 110, 'C_2');
    hdim(svg, 260, 420, 430, 'Δx', { below: true });
    svg.leader(640, 420, 650, 300, { bend: 0.3, width: 1.5 });
    lab(svg, 640, 440, 'A');
    return svg.render();
  },

  // 12.7 Fig. 3 — passage through pores, and dissolving in the membrane
  Figure_12_07_03: () => {
    const svg = new Svg({
      width: 875,
      height: 545,
      title: 'Two ways molecules cross a membrane',
      desc: '(a) A semipermeable membrane drawn as a column of blocks separated by narrow gaps, the pores. Molecules of many sizes lie on both sides. Only the smallest fit through the pores: one small molecule passes right and another passes left, while the large molecules stay where they are. (b) Molecules packed closely on both sides of a solid membrane. A few of them have dissolved in the membrane and are diffusing across it.',
    });
    const BG = '#e3e7f3';
    const MEM = '#a48fb8';
    const MEM_EDGE = '#7d6a93';
    shadeDef(svg, 'mol_pink', '#f6c4c9', '#e48893');
    shadeDef(svg, 'mol_green', '#dcefc8', '#a3d27f');
    const rnd = rng(5);
    const big = (x, y, r, kind, stretch = 1) =>
      svg.path(blobPath(x, y, r, rnd, { stretch }), {
        color: kind === 'pink' ? '#c9606c' : '#6aa84f',
        width: 1.5,
        fill: `url(#mol_${kind})`,
      });
    const small = (x, y, kind) =>
      kind === 'o'
        ? svg.circle(x, y, 9, { fill: '#f4a46e', stroke: '#d9773e', width: 1.2 })
        : svg.circle(x, y, 8, { fill: '#7cc3c3', stroke: '#3e8f92', width: 1.2 });

    // (a) Pores pass only the small molecules.
    svg.rect(0, 0, 410, 500, { fill: BG });
    for (let y = -10; y < 500; y += 90)
      svg.rect(184, y, 50, Math.min(65, 500 - y), { fill: MEM, stroke: MEM_EDGE, width: 1.2 });
    big(60, 90, 30, 'pink');
    big(150, 222, 20, 'pink', 0.7);
    big(82, 400, 30, 'pink');
    big(98, 462, 26, 'pink', 1.3);
    big(338, 145, 32, 'green');
    big(345, 335, 36, 'green', 0.85);
    big(290, 455, 30, 'green');
    svg.circle(145, 104, 8, { fill: '#fbe3e6', stroke: '#c9606c', width: 1.2 });
    svg.circle(78, 186, 6, { fill: '#fbe3e6', stroke: '#c9606c', width: 1.2 });
    svg.circle(140, 352, 12, { fill: '#fbe3e6', stroke: '#c9606c', width: 1.2 });
    for (const [x, y, k] of [
      [45, 240, 'o'],
      [117, 253, 't'],
      [24, 342, 'o'],
      [150, 408, 'o'],
      [316, 34, 'o'],
      [380, 68, 't'],
      [296, 258, 'o'],
      [358, 270, 'o'],
      [294, 390, 'o'],
      [352, 462, 'o'],
    ])
      small(x, y, k);
    // One small molecule crosses each way through the top two pores.
    small(162, 66, 'o');
    svg.arrow(174, 66, 264, 66, { color: '#5b3a7a', width: 2.2, head: 13 });
    small(240, 156, 't');
    svg.arrow(228, 156, 152, 156, { color: '#5b3a7a', width: 2.2, head: 13 });
    note(svg, 282, 102, 'Membrane', { anchor: 'start', size: 22 });
    svg.squiggle(278, 102, 238, 102, { waves: 1.5, amp: 4 });
    note(svg, 286, 238, 'Pore', { anchor: 'start', size: 22 });
    svg.squiggle(282, 238, 238, 246, { waves: 1.5, amp: 4 });
    note(svg, 62, 300, 'Molecules', { size: 22 });
    for (const [x, y] of [
      [48, 254],
      [110, 264],
      [32, 334],
      [128, 346],
      [82, 368],
    ])
      svg.squiggle(62 + (x - 62) * 0.25, 300 + Math.sign(y - 300) * 14, x, y, { waves: 1, amp: 3 });
    caption(svg, 205, 526, '(a)');

    // (b) Molecules that dissolve in the membrane diffuse across it.
    svg.rect(465, 0, 410, 500, { fill: BG });
    svg.add(
      `<defs><linearGradient id="mem_b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${MEM_EDGE}"/><stop offset="0.5" stop-color="${MEM}"/><stop offset="1" stop-color="${MEM_EDGE}"/></linearGradient></defs>`
    );
    svg.rect(640, 0, 50, 500, { fill: 'url(#mem_b)' });
    const r = 11;
    const inBlob = (x, y) => ((x - 566) / 32) ** 2 + ((y - 152) / 48) ** 2 < 1;
    for (let row = 0; row * r * 1.75 < 240; row += 1) {
      const y = 98 + row * r * 1.75;
      for (let x = 512 + (row % 2) * r; x < 815; x += 2 * r) {
        if ((x > 628 && x < 702) || inBlob(x, y)) continue;
        small(x, y, rnd() < 0.12 ? 't' : 'o');
      }
    }
    big(566, 152, 34, 'pink', 0.7);
    for (const [x, y, k] of [
      [652, 108, 'o'],
      [663, 172, 't'],
      [677, 216, 'o'],
      [655, 242, 'o'],
      [668, 282, 'o'],
      [680, 326, 'o'],
    ])
      small(x, y, k);
    caption(svg, 668, 526, '(b)');
    return svg.render();
  },

  // 12.7 Fig. 4 — osmosis through a semipermeable membrane
  Figure_12_07_04: () => {
    const svg = new Svg({
      width: 810,
      height: 410,
      title: 'Osmosis through a semipermeable membrane',
      desc: '(a) Two sugar-water solutions, separated by a semipermeable membrane that passes water (small blue dots) but not sugar (larger red dots). The right side has more sugar, so its water is less concentrated, and water moves by osmosis to the right. (b) The right-hand level rises until the back pressure hρg from the height difference h balances the osmotic flow.',
    });
    const rnd = rng(31);
    const dots = (x0, x1, y0, y1, n, r, color) => {
      for (let k = 0; k < n; k += 1)
        svg.circle(x0 + (x1 - x0) * rnd(), y0 + (y1 - y0) * rnd(), r, { fill: color });
    };
    const tank = (x0, levelL, levelR, sugarL, sugarR) => {
      const x1 = x0 + 330;
      const m = x0 + 165;
      const B = 330;
      svg.rect(x0, levelL, 165, B - levelL, { fill: '#cfe6f6' });
      svg.rect(m, levelR, 165, B - levelR, { fill: '#cfe6f6' });
      dots(x0 + 8, m - 8, levelL + 8, B - 8, Math.round(((B - levelL) / 150) * 30), 3, '#2a9fd0');
      dots(m + 8, x1 - 8, levelR + 8, B - 8, Math.round(((B - levelR) / 150) * 30), 3, '#2a9fd0');
      dots(x0 + 8, m - 8, levelL + 8, B - 8, sugarL, 6, '#e2694a');
      dots(m + 8, x1 - 8, levelR + 8, B - 8, sugarR, 6, '#e2694a');
      svg.line(m, 60, m, B, { color: '#888888', width: 2 });
      svg.polyline(
        [
          [x0, 50],
          [x0, B],
          [x1, B],
          [x1, 50],
        ],
        { color: '#aaaaaa', width: 5 }
      );
    };
    tank(20, 180, 180, 14, 40);
    note(svg, 90, 106, 'Semipermeable', { anchor: 'start', size: 18 });
    note(svg, 90, 128, 'membrane', { anchor: 'start', size: 18 });
    svg.leader(170, 136, 184, 170, { bend: 0.3, width: 1.3 });
    svg.circle(220, 360, 3, { fill: '#2a9fd0' });
    svg.arrow(232, 360, 290, 360, { color: '#2a9fd0', width: 3, head: 12 });
    note(svg, 300, 360, 'Osmosis', { anchor: 'start', size: 20 });
    caption(svg, 185, 392, '(a)');
    tank(410, 230, 110, 14, 40);
    vdim(svg, 560, 110, 230, 'h', { side: 1 });
    svg.circle(430, 352, 3, { fill: '#2a9fd0' });
    svg.arrow(440, 352, 500, 352, { color: '#2a9fd0', width: 3, head: 12 });
    note(svg, 510, 352, 'Osmosis', { anchor: 'start', size: 20 });
    svg.arrow(500, 376, 440, 376, { color: '#e2694a', width: 3, head: 12 });
    note(svg, 510, 376, 'Back pressure = \\it{hρg}', { anchor: 'start', size: 20 });
    caption(svg, 575, 396, '(b)');
    return svg.render();
  },
};
