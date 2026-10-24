/**
 * Chapter 16: Hooke's law, simple harmonic motion, the pendulum, damping,
 * resonance, and superposition of waves.
 *
 * Every curve is computed from its equation: x = X cos ωt and its
 * derivatives, the damped solutions, the driven-oscillator amplitude
 * X(f) ∝ 1/√((f0² − f²)² + (bf)²), and sums of sine waves for interference,
 * standing waves and beats. For readers who allow motion, the oscillators,
 * waves and wavefronts move: the reference circle, the block of 16.3 and
 * 16.5 in its last stage, the strip-chart recorder, the pendulum, the gull on
 * its wave, the waves of 16.10 and the two speakers of 16.11. The still
 * figure is the one the text describes.
 */
import { COLORS, Plot, Svg, fmt, morph, rad, smilAnimate, smilList } from './svg.js';

const WAVE = '#3f9a2b';
const CURVE = COLORS.maroon;
const FORCE = '#e0245e';
const VEL = COLORS.green;
const BLOCK = '#b9aeb6';
const BLOCK_EDGE = '#5b5157';
const FLOOR = '#d9cbb6';
const BALL = '#e0484d';
const STRING = '#d8c89a';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 17, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** Coil spring between two points (any direction), with a fixed point count. */
function coil(svg, P, Q, { n = 9, r = 14, color = '#333333', width = 2.2, lead = 10 } = {}) {
  const L = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const ux = (Q[0] - P[0]) / L;
  const uy = (Q[1] - P[1]) / L;
  const pts = [P];
  const body = L - 2 * lead;
  const m = n * 16;
  for (let k = 0; k <= m; k += 1) {
    const s = lead + (body * k) / m;
    const w = r * Math.sin((2 * Math.PI * k) / 16);
    pts.push([P[0] + ux * s - uy * w, P[1] + uy * s + ux * w]);
  }
  pts.push(Q);
  svg.polyline(pts, { color, width });
}

/**
 * Arrow from (x1, y1) to (x2, y2) that is always a line and a head, however
 * short, so that frames of an animation have the same elements.
 */
function vec(svg, x1, y1, x2, y2, { color, width = 3, head = 14 } = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const h = Math.min(head, L);
  const [ux, uy] = L > 1e-9 ? [(x2 - x1) / L, (y2 - y1) / L] : [1, 0];
  const [bx, by] = [x2 - ux * h, y2 - uy * h];
  const half = h * 0.42;
  svg.line(x1, y1, bx, by, { color, width });
  svg.polygon(
    [
      [x2, y2],
      [bx - uy * half, by + ux * half],
      [bx + uy * half, by - ux * half],
    ],
    { fill: color }
  );
}

/** Times 0 to `period` in `n` equal steps, the last closing the loop. */
function cycle(period, n) {
  return Array.from({ length: n + 1 }, (_, k) => (period * k) / n);
}

/** Horizontal tick with a label below it. */
function tick(svg, x, y, label, { size = 18 } = {}) {
  svg.line(x, y - 8, x, y + 8, { color: COLORS.black, width: 1.4 });
  lab(svg, x, y + 26, label, { size });
}

/** Free-body diagram: dot with N up, w down, and an optional horizontal F. */
function fbd(svg, x, y, F = 0) {
  svg.circle(x, y, 5, { fill: COLORS.maroon });
  svg.arrow(x, y - 6, x, y - 46, { color: COLORS.black, width: 1.8, head: 11 });
  svg.arrow(x, y + 6, x, y + 46, { color: COLORS.black, width: 1.8, head: 11 });
  lab(svg, x + 10, y - 32, '**N**', { anchor: 'start', size: 19 });
  lab(svg, x + 10, y + 34, '**w**', { anchor: 'start', size: 19 });
  if (F) {
    svg.arrow(x + Math.sign(F) * 8, y, x + F, y, { color: COLORS.black, width: 1.8, head: 12 });
    lab(svg, x + F / 2, y - 18, '**F**', { size: 19 });
  }
}

/**
 * Block on a spring on a frictionless surface, with the wall at x0. The
 * block's left face is at eq + d (d in pixels from equilibrium).
 */
function massSpring(svg, x0, y, d, { eq = 230 } = {}) {
  svg.polygon(
    [
      [x0, y - 90],
      [x0 + 14, y - 90],
      [x0 + 14, y - 12],
      [x0 + 420, y - 12],
      [x0 + 420, y],
      [x0, y],
    ],
    { fill: FLOOR }
  );
  const bx = x0 + eq + d;
  coil(svg, [x0 + 14, y - 40], [bx, y - 40], { n: 7, r: 22, lead: 12 });
  svg.rect(bx, y - 68, 56, 56, { fill: BLOCK, stroke: BLOCK_EDGE, width: 1.5 });
  lab(svg, bx + 28, y - 40, 'm', { halo: false });
  return bx;
}

/** The five stages of a block oscillating on a spring (16.3 Fig. 1 and 16.5 Fig. 1). */
function springStages(svg, { energy }) {
  const X = 70;
  const stages = [
    { x: 0, y: 150, d: X, v: 0, F: -1, cap: '(a)', E: '½kX^2' },
    { x: 500, y: 150, d: 0, v: -1, F: 0, cap: '(b)', E: '½m(−v_{max})^2' },
    { x: 0, y: 340, d: -X, v: 0, F: 1, cap: '(c)', E: '½k(−X)^2' },
    { x: 500, y: 340, d: 0, v: 1, F: 0, cap: '(d)', E: '½mv_{max}^2' },
    { x: 250, y: 530, d: X, v: 0, F: -1, cap: '(e)', E: '½kX^2' },
  ];
  for (const s of stages) {
    if (s.cap === '(e)') {
      // (e) The cycle repeats: for readers who allow motion, the block keeps
      // oscillating, its force and velocity arrows changing as it goes.
      const frames = Array.from({ length: 41 }, (_, k) => (2 * Math.PI * k) / 40);
      svg.animated(
        (ph, moving) => (moving ? liveStage(svg, s, X, ph, energy) : stage(svg, s, X, energy)),
        frames,
        { dur: '3.2s' }
      );
      continue;
    }
    stage(svg, s, X, energy);
  }
}

/** One stage of `springStages`, at rest at its labeled position. */
function stage(svg, s, X, energy) {
  {
    const bx = massSpring(svg, s.x, s.y, s.d);
    const eq = s.x + 230;
    tick(svg, eq, s.y, 'x = 0');
    if (s.d) tick(svg, eq + s.d, s.y, s.d > 0 ? 'x = X' : 'x = −X');
    if (s.F) {
      const x1 = s.F < 0 ? bx + 40 : bx + 16;
      svg.arrow(x1, s.y - 86, x1 + s.F * 80, s.y - 86, { color: FORCE, width: 5, head: 20 });
      lab(svg, x1 + s.F * 40 + (s.F < 0 ? 64 : -64), s.y - 86, '**F**', { size: 21 });
      lab(svg, bx + 28 + s.F * -10, s.y - 112, 'v = 0', { size: 20 });
    } else {
      lab(svg, bx + 28, s.y - 112, 'F = 0', { size: 20 });
      svg.arrow(bx + 28 - s.v * 20, s.y - 86, bx + 28 + s.v * 60, s.y - 86, {
        color: VEL,
        width: 4,
        head: 17,
      });
      lab(svg, bx + 28 + s.v * 92, s.y - 86, s.v > 0 ? '+v_{max}' : '−v_{max}', { size: 20 });
    }
    if (s.d === X && s.cap === '(a)' && !energy) lab(svg, s.x + 110, s.y - 82, 'k', { size: 21 });
    if (energy) lab(svg, s.x + 400, s.y - 50, s.E, { anchor: 'start', size: 21 });
    else fbd(svg, s.x + 430, s.y - 50, s.F * 70);
    caption(svg, s.x + 230, s.y + 54, s.cap);
  }
}

/**
 * The stage `s` in motion at phase `ph` of x = X cos ph: the spring force,
 * proportional to −x, and the velocity, with the free-body diagram, or with
 * bars for the elastic potential and kinetic energy.
 */
function liveStage(svg, s, X, ph, energy) {
  const d = X * Math.cos(ph);
  const bx = massSpring(svg, s.x, s.y, d);
  const eq = s.x + 230;
  tick(svg, eq, s.y, 'x = 0');
  tick(svg, eq + X, s.y, 'x = X');
  tick(svg, eq - X, s.y, 'x = −X');
  const c = bx + 28;
  const F = -80 * Math.cos(ph);
  const v = -80 * Math.sin(ph);
  vec(svg, c, s.y - 86, c + F, s.y - 86, { color: FORCE, width: 5, head: 20 });
  lab(svg, c + F, s.y - 104, '**F**', { size: 21 });
  vec(svg, c, s.y - 124, c + v, s.y - 124, { color: VEL, width: 4, head: 17 });
  lab(svg, c + v, s.y - 142, '**v**', { size: 21 });
  caption(svg, eq, s.y + 54, s.cap);
  if (energy) {
    const [x0, base, top] = [s.x + 410, s.y - 4, s.y - 104];
    svg.line(x0 - 8, top, x0 + 82, top, { color: COLORS.black, width: 1.2, dash: '5 4' });
    svg.line(x0 - 8, base, x0 + 82, base, { color: COLORS.black, width: 1.4 });
    const pe = (base - top) * Math.cos(ph) ** 2;
    const ke = base - top - pe;
    svg.rect(x0, base - pe, 30, pe, { fill: FORCE });
    svg.rect(x0 + 44, base - ke, 30, ke, { fill: VEL });
    lab(svg, x0 + 15, base + 18, 'PE_s', { size: 17 });
    lab(svg, x0 + 59, base + 18, 'KE', { size: 17, italic: false });
    lab(svg, x0 + 90, top, 'E', { size: 18, anchor: 'start' });
  } else {
    const [x, y] = [s.x + 430, s.y - 50];
    svg.circle(x, y, 5, { fill: COLORS.maroon });
    svg.arrow(x, y - 6, x, y - 46, { color: COLORS.black, width: 1.8, head: 11 });
    svg.arrow(x, y + 6, x, y + 46, { color: COLORS.black, width: 1.8, head: 11 });
    lab(svg, x + 10, y - 32, '**N**', { anchor: 'start', size: 19 });
    lab(svg, x + 10, y + 34, '**w**', { anchor: 'start', size: 19 });
    const f = -70 * Math.cos(ph);
    vec(svg, x, y, x + f, y, { color: COLORS.black, width: 1.8, head: 12 });
    lab(svg, x + f, y - 18, '**F**', { size: 19 });
  }
}

/** A sine-curve polyline through the plot. */
function curve(g, f, x0, x1, { color = CURVE, width = 3, n = 200 } = {}) {
  g.fn(f, x0, x1, { color, width, n });
}

/** Three stacked waveforms: wave 1, wave 2 and their sum. */
function superposition(
  svg,
  f1,
  f2,
  { y0 = 40, h = 70, gap = 110, w = 520, x0 = 30, labels = true, span = 3 } = {}
) {
  const rows = [f1, f2, x => f1(x) + f2(x)];
  const names = ['Wave 1', 'Wave 2', 'Resultant'];
  return rows.map((f, i) => {
    const g = new Plot(svg, {
      x: x0,
      y: y0 + i * gap,
      w,
      h,
      xRange: [0, span],
      yRange: [-2.2, 2.2],
    });
    svg.line(x0, g.Y(0), x0 + w, g.Y(0), { color: COLORS.black, width: 1.8 });
    curve(g, f, 0, span, { color: WAVE, width: 3 });
    if (labels) note(svg, x0 + w + 12, g.Y(0), names[i], { anchor: 'start', size: 19 });
    return g;
  });
}

/** Double-headed amplitude marker from the axis to value v at x, labeled. */
function ampMark(svg, g, x, v, label) {
  const px = g.X(x);
  svg.arrow(px, g.Y(0), px, g.Y(v), { color: COLORS.black, width: 1.3, head: 9, start: true });
  lab(svg, px + 8, g.Y(v / 2), label, { anchor: 'start', size: 18 });
}

/** Vertical double-headed dimension from y1 to y2 at x, with end ticks. */
function vdim(svg, x, y1, y2, label, { side = 1, size = 22 } = {}) {
  svg.arrow(x, y1 + 1, x, y2 - 1, { color: COLORS.black, width: 1.5, head: 11, start: true });
  for (const y of [y1, y2]) svg.line(x - 10, y, x + 10, y, { color: COLORS.black, width: 1.4 });
  lab(svg, x + side * 14, (y1 + y2) / 2, label, { anchor: side > 0 ? 'start' : 'end', size });
}

/** A gull floating with its waterline at (x, y), looking right. */
function gull(svg, x, y, { dash } = {}) {
  const edge = { color: '#555b63', width: 1.4, dash };
  svg.path(
    `M ${x - 30} ${y - 10} Q ${x - 26} ${y + 4} ${x} ${y + 4} Q ${x + 24} ${y + 3} ${x + 30} ${y - 12} Q ${x + 18} ${y - 22} ${x - 4} ${y - 21} Q ${x - 22} ${y - 20} ${x - 30} ${y - 10} Z`,
    { ...edge, fill: '#ffffff' }
  );
  svg.path(
    `M ${x - 34} ${y - 14} Q ${x - 8} ${y - 26} ${x + 14} ${y - 15} Q ${x - 4} ${y - 4} ${x - 34} ${y - 14} Z`,
    { ...edge, fill: '#9aa0a8' }
  );
  for (const [dx, dy] of [
    [-20, -14],
    [-10, -16],
    [0, -14],
  ])
    svg.circle(x + dx, y + dy, 2.2, { fill: '#4a4f57' });
  svg.circle(x + 26, y - 28, 10, { fill: '#ffffff', stroke: '#555b63', width: 1.4 });
  svg.polygon(
    [
      [x + 35, y - 31],
      [x + 48, y - 27],
      [x + 35, y - 24],
    ],
    { fill: '#f2c230', stroke: '#c9971a', width: 1 }
  );
  svg.circle(x + 29, y - 31, 1.8, { fill: COLORS.black });
}

export default {
  // 16.1 Fig. 1 — a ruler oscillating about equilibrium
  Figure_16_01_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 300,
      title: 'A plastic ruler oscillating about its equilibrium position',
      desc: 'Five stages of a ruler clamped at its lower end. (a) Released from the left of equilibrium, the restoring force F points right. (b) At the equilibrium position the force is zero but the ruler moves right with velocity v. (c) Displaced to the right, the restoring force points left and slows it. (d) At equilibrium again, the force is zero and it moves left. (e) Back at the starting position, ready to repeat; without damping the motion continues.',
    });
    const stages = [
      { d: -60, F: 1, v: 0, cap: '(a)' },
      { d: 0, F: 0, v: 1, cap: '(b)' },
      { d: 60, F: -1, v: 0, cap: '(c)' },
      { d: 0, F: 0, v: -1, cap: '(d)' },
      { d: -60, F: 1, v: 0, cap: '(e)' },
    ];
    stages.forEach((s, i) => {
      const x = 140 + i * 196;
      const base = 250;
      const top = 70;
      svg.line(x, base, x, top - 10, { color: '#999999', width: 1.2, dash: '5 4' });
      svg.path(
        `M ${x} ${base} Q ${x} ${(base + top) / 2} ${x + s.d} ${top + Math.abs(s.d) * 0.12}`,
        {
          color: '#c75a4a',
          width: 6,
        }
      );
      svg.rect(x - 14, base, 28, 16, { fill: '#555555' });
      const tipX = x + s.d;
      if (s.F) {
        svg.arrow(tipX - s.F * 4 - (s.F > 0 ? 50 : -50), top - 8, tipX - s.F * 6, top - 8, {
          color: FORCE,
          width: 4,
          head: 16,
        });
        lab(svg, tipX - s.F * 60, top - 30, '**F**', { size: 20 });
      } else {
        lab(svg, x, top - 52, 'F = 0', { size: 18 });
        svg.arrow(x + s.v * 10, top - 8, x + s.v * 62, top - 8, { color: VEL, width: 4, head: 16 });
        lab(svg, x + s.v * 40, top - 28, '**v**', { size: 20 });
      }
      caption(svg, x, 290, s.cap);
    });
    svg.leader(70, 214, 136, 190, { bend: -0.3, width: 1.3 });
    note(svg, 8, 232, 'Equilibrium', { anchor: 'start', size: 15 });
    note(svg, 8, 250, 'position', { anchor: 'start', size: 15 });
    return svg.render();
  },

  // 16.1 Fig. 2 — measuring k from hanging weights
  Figure_16_01_03: () => {
    const svg = new Svg({
      width: 820,
      height: 760,
      title: 'Measuring a spring’s force constant',
      desc: '(a) A graph of the restoring force F, equal to the weight supported, versus the displacement x of a spring, for masses of 0 to 0.500 kg: weights 0, 0.98, 1.96, 2.94, 3.92 and 4.90 N give displacements 0, 0.025, 0.050, 0.076, 0.099 and 0.127 m. The points lie on a straight line through the origin, so the spring obeys Hooke’s law; the slope, rise over run, is the force constant k, about 39 N/m. (b) The same data table, and a spring hanging from a support, unstretched at x = 0 and stretched to x1 and x2 by masses m1 and m2 whose weights are w1 and w2.',
    });
    const data = [
      [0, 0, 0],
      [0.1, 0.98, 0.025],
      [0.2, 1.96, 0.05],
      [0.3, 2.94, 0.076],
      [0.4, 3.92, 0.099],
      [0.5, 4.9, 0.127],
    ];
    const k = data.reduce((s, d) => s + d[1] * d[2], 0) / data.reduce((s, d) => s + d[2] * d[2], 0);
    const g = new Plot(svg, {
      x: 110,
      y: 50,
      w: 300,
      h: 260,
      xRange: [0, 0.14],
      yRange: [0, 5.4],
      xTicks: [0, 0.05, 0.1],
      yTicks: [0, 2, 4],
      xFormat: v => (v ? v.toFixed(3).replace(/0$/, '') : '0'),
      yFormat: v => v.toFixed(1),
    });
    g.axes({ xTitle: 'Displacement x (m)', yTitle: 'Force F (N)', arrows: true, yTitleOffset: 56 });
    g.fn(x => k * x, 0, 0.135, { color: CURVE, width: 2.5 });
    for (const [, w, x] of data) svg.circle(...g.P(x, w), 5, { fill: COLORS.black });
    // Rise over run on the fitted line.
    const [ax, ay] = g.P(0.02, k * 0.02);
    const [bx, by] = g.P(0.12, k * 0.12);
    svg.line(ax, ay, bx, ay, { color: COLORS.guide, width: 1.4, dash: '5 4' });
    svg.line(bx, ay, bx, by, { color: COLORS.guide, width: 1.4, dash: '5 4' });
    note(svg, (ax + bx) / 2, ay + 18, 'run', { size: 16 });
    note(svg, bx + 8, (ay + by) / 2, 'rise', { anchor: 'start', size: 16 });
    lab(svg, g.X(0.012), g.Y(5.1), 'k = slope = ', { anchor: 'start', size: 19 });
    svg.text(g.X(0.084), g.Y(5.1) - 12, 'rise', { size: 16, math: false });
    svg.line(g.X(0.071), g.Y(5.1) + 1, g.X(0.097), g.Y(5.1) + 1, {
      color: COLORS.text,
      width: 1.2,
    });
    svg.text(g.X(0.084), g.Y(5.1) + 14, 'run', { size: 16, math: false });
    caption(svg, 30, 30, 'a)');
    const table = (x, y) => {
      const cols = ['m (kg)', 'w (N)', 'x (m)'];
      cols.forEach((c, i) => svg.text(x + 40 + i * 86, y, c, { size: 17 }));
      svg.line(x, y + 14, x + 258, y + 14, { color: COLORS.black, width: 1.2 });
      for (const i of [1, 2])
        svg.line(x + i * 86, y - 14, x + i * 86, y + 12 + data.length * 26, {
          color: COLORS.black,
          width: 1.2,
        });
      data.forEach((d, j) => {
        [d[0].toFixed(3), d[1].toFixed(2), d[2].toFixed(3)].forEach((v, i) => {
          svg.text(x + 40 + i * 86, y + 36 + j * 26, v, { size: 16, math: false });
        });
      });
    };
    table(500, 70);
    caption(svg, 30, 420, 'b)');
    table(60, 460);
    // Hanging springs.
    const top = 420;
    svg.rect(450, top, 340, 26, { fill: '#9a9a9a' });
    const x0 = top + 120;
    const springs = [
      { x: 510, end: x0 },
      { x: 620, end: x0 + 40, m: 'm_1', w: 'w_1' },
      { x: 730, end: x0 + 80, m: 'm_2', w: 'w_2' },
    ];
    for (const s of springs) {
      coil(svg, [s.x, top + 26], [s.x, s.end], { n: 8, r: 16, lead: 8 });
      if (s.m) {
        svg.rect(s.x - 22, s.end, 44, 22, { fill: '#e7a39a', stroke: '#9a4a40', width: 1.2 });
        lab(svg, s.x, s.end + 11, s.m, { size: 17, halo: false });
        svg.arrow(s.x, s.end + 24, s.x, s.end + 90, { color: FORCE, width: 3, head: 14 });
        lab(svg, s.x + 12, s.end + 80, s.w, { anchor: 'start', size: 18 });
      }
    }
    [
      [x0, 'x = 0'],
      [x0 + 40, 'x_1'],
      [x0 + 80, 'x_2'],
    ].forEach(([y, l]) => {
      svg.line(480, y, 790, y, { color: COLORS.guide, width: 1, dash: '4 4' });
      lab(svg, 474, y, l, { anchor: 'end', size: 18 });
    });
    return svg.render();
  },

  // 16.1 Fig. 4 — work as the area under F versus x
  Figure_16_01_05: () => {
    const svg = new Svg({
      width: 900,
      height: 400,
      title: 'Work done deforming a Hooke’s-law spring',
      desc: 'A graph of the applied force F_app = kx versus displacement, a straight line through the origin. The work done to reach displacement x is the shaded triangle under the line. Method A: W = ½bh = ½kx·x = ½kx². Method B: the average force is ½kx, shown by a dashed line halfway up, so W = (½kx)(x) = ½kx².',
    });
    const g = new Plot(svg, {
      x: 170,
      y: 30,
      w: 400,
      h: 300,
      xRange: [0, 1.15],
      yRange: [0, 1.15],
    });
    const P = g.P(1, 1);
    svg.polygon([g.P(0, 0), g.P(1, 0), P], { fill: '#c9cbe6' });
    g.axes({ arrows: true });
    g.fn(x => x, 0, 1.1, { color: CURVE, width: 3 });
    svg.line(g.X(0), g.Y(0.5), g.X(1), g.Y(0.5), { color: COLORS.black, width: 1.4, dash: '6 4' });
    svg.arrow(P[0] + 14, g.Y(0) - 2, P[0] + 14, P[1] + 2, {
      color: COLORS.black,
      width: 1.4,
      head: 11,
      start: true,
    });
    lab(svg, P[0] + 26, g.Y(0.5), 'F = kx', { anchor: 'start', size: 20 });
    svg.arrow(g.X(0) + 2, g.Y(0) + 26, g.X(1) - 2, g.Y(0) + 26, {
      color: COLORS.black,
      width: 1.4,
      head: 11,
      start: true,
    });
    lab(svg, g.X(0.5), g.Y(0) + 8, 'x', { size: 20 });
    note(svg, g.X(0.5), g.Y(0) + 54, 'Displacement = x', { size: 18 });
    lab(svg, g.X(0) - 8, g.Y(0.5), 'F_{app} = ½kx', { anchor: 'end', size: 19 });
    lab(svg, g.X(1.15) + 8, g.Y(0) + 4, 'x', { anchor: 'start', size: 20 });
    svg.text(24, 180, 'Applied force = F_{app}', { size: 18, rotate: -90 });
    const mx = 640;
    note(svg, mx, 80, 'Method A', { anchor: 'start', size: 18 });
    lab(svg, mx, 116, 'W = ½bh = ½kx·x', { anchor: 'start', size: 20 });
    lab(svg, mx, 152, 'W = ½kx^2', { anchor: 'start', size: 20 });
    note(svg, mx, 210, 'Method B', { anchor: 'start', size: 18 });
    lab(svg, mx, 246, 'W = f·x = (½kx)(x)', { anchor: 'start', size: 20 });
    lab(svg, mx, 282, 'W = ½kx^2', { anchor: 'start', size: 20 });
    return svg.render();
  },

  // 16.3 Fig. 1 — a block oscillating on a spring
  Figure_16_03_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 600,
      title: 'An object on a spring as a simple harmonic oscillator',
      desc: 'Five stages of a block of mass m on a spring of force constant k on a frictionless surface, each with its free-body diagram. (a) At x = X the block is momentarily at rest and the spring force F points left, toward equilibrium. (b) At x = 0 the force is zero and the block moves left at its maximum speed, −v_max. (c) At x = −X it is momentarily at rest and F points right. (d) At x = 0 the force is zero and it moves right at +v_max. (e) Back at x = X, the cycle repeats. In every stage the normal force N and the weight w balance.',
    });
    springStages(svg, { energy: false });
    note(svg, 430, 12, 'Free-body diagrams', { size: 17 });
    return svg.render();
  },

  // 16.3 Fig. 3 — a strip-chart record of vertical oscillation
  Figure_16_03_03: () => {
    const svg = new Svg({
      width: 700,
      height: 440,
      title: 'Recording simple harmonic motion on a moving strip of paper',
      desc: 'An object of mass m hangs from a spring and bounces up and down between X and −X. A pen on the object draws on a strip of paper that moves steadily to the right between two rollers, leaving a sine wave with period T along the time axis t.',
    });
    const y0 = 270;
    const X = 80;
    svg.rect(150, y0 - 130, 460, 260, { fill: '#f6e5b8', stroke: '#b89b52', width: 1.5 });
    for (const x of [130, 630]) {
      svg.rect(x - 22, y0 - 150, 44, 300, {
        fill: '#c9ccd2',
        stroke: '#6f757d',
        width: 1.5,
        rx: 10,
      });
    }
    const px = 240;
    const T = 200;
    const trace = from => {
      const pts = [];
      for (let x = from; x <= 600; x += 2)
        pts.push([x, y0 - X * Math.cos((2 * Math.PI * (x - px)) / T)]);
      return pts;
    };
    svg.still(() => svg.polyline(trace(px), { color: '#2a9fae', width: 3 }));
    // For readers who allow motion, the paper carries the trace to the right
    // at one period's length per period while the pen bobs at x = px.
    svg.add(
      `<defs><clipPath id="paper_16_03_03"><rect x="${px}" y="${y0 - 130}" width="${600 - px}" height="260"/></clipPath></defs>`
    );
    svg.motionGroup(
      `<g clip-path="url(#paper_16_03_03)"><g>${svg.capture(() =>
        svg.polyline(trace(px - T), { color: '#2a9fae', width: 3 })
      )}<animateTransform attributeName="transform" type="translate" dur="2s" repeatCount="indefinite" values="0 0;${T} 0"/></g></g>`
    );
    svg.arrow(px, y0, 640, y0, { color: COLORS.black, width: 1.6, head: 13 });
    lab(svg, 652, y0, 't', { anchor: 'start' });
    svg.line(px + T, y0 - 8, px + T, y0 + 8, { color: COLORS.black, width: 1.6 });
    lab(svg, px + T, y0 + 28, 'T');
    svg.line(px, y0 - X, px, y0 + X, { color: COLORS.black, width: 1.4 });
    lab(svg, px - 30, y0 - X, 'X', { anchor: 'end' });
    lab(svg, px - 30, y0, '0', { anchor: 'end' });
    lab(svg, px - 30, y0 + X, '−X', { anchor: 'end' });
    for (const y of [y0 - X, y0 + X])
      svg.line(px - 8, y, px + 8, y, { color: COLORS.black, width: 1.4 });
    svg.rect(200, 10, 90, 20, { fill: '#9a9a9a' });
    // The mass, with its pen at the bottom center, at height y0 − X cos ωt.
    svg.animated(
      t => {
        const yp = y0 - X * Math.cos((2 * Math.PI * t) / 2);
        coil(svg, [px, 30], [px, yp - 40], { n: 8, r: 16, lead: 8 });
        svg.rect(px - 22, yp - 40, 44, 40, {
          fill: '#c9ccd2',
          stroke: '#555555',
          width: 1.5,
          rx: 4,
        });
        lab(svg, px, yp - 20, 'm', { halo: false });
      },
      cycle(2, 32),
      { dur: '2s' }
    );
    svg.arrow(px + 46, y0 - X - 60, px + 46, y0 - X + 10, {
      color: COLORS.black,
      width: 1.6,
      head: 12,
      start: true,
    });
    svg.arrow(380, 420, 470, 420, { color: COLORS.black, width: 1.8, head: 13 });
    note(svg, 374, 420, 'Motion of paper', { anchor: 'end', size: 18 });
    return svg.render();
  },

  // 16.3 Fig. 4 — x, v and a versus t for an object on a spring
  Figure_16_03_04: () => {
    const svg = new Svg({
      width: 700,
      height: 1270,
      title: 'Position, velocity and acceleration of an object oscillating on a spring',
      desc: 'Top: snapshots of an object on a vertical spring at equal time steps, moving from x = +X down through x = 0 to x = −X and back, with green arrows showing its velocity when it passes x = 0. Graphs: the position x = X cos(2πt/T) starts at its maximum X, with period T; the velocity starts at zero and goes negative, between −v_max and v_max; the acceleration starts at its most negative value, −a_max, always opposite the displacement. Bottom: a spring of unstrained length, the same spring stretched to its equilibrium position by the hanging object, and the object oscillating between x = +X and x = −X about that equilibrium.',
    });
    // Snapshots: ten springs at t = 0, T/4, …, with x = X cos(ωt).
    const X = 52;
    const yEq = 180;
    for (let k = 0; k < 10; k += 1) {
      const x = 40 + k * 56;
      const ph = (Math.PI / 2) * k;
      const y = yEq - X * Math.cos(ph);
      svg.rect(x - 16, 8, 32, 10, { fill: '#c9b99a' });
      coil(svg, [x, 18], [x, y - 12], { n: 10, r: 9, width: 1.6, lead: 6 });
      svg.circle(x, y, 12, { fill: BALL, stroke: '#8a1c20', width: 1 });
      const v = -Math.sin(ph);
      if (Math.abs(v) > 0.5)
        svg.arrow(x, y + 14 * v * -1 + (v > 0 ? -18 : 18), x, y + (v > 0 ? -64 : 64), {
          color: VEL,
          width: 3,
          head: 13,
        });
    }
    lab(svg, 600, yEq - X, 'x = +X', { anchor: 'start' });
    lab(svg, 600, yEq, 'x = 0', { anchor: 'start' });
    lab(svg, 600, yEq + X, 'x = −X', { anchor: 'start' });
    const graph = (y, f, top, bottom, name, label) => {
      const g = new Plot(svg, { x: 110, y, w: 420, h: 130, xRange: [0, 2.4], yRange: [-1.3, 1.3] });
      g.axes({ arrows: true, xAxisAt: 0 });
      g.fn(f, 0, 2.4, { color: CURVE, width: 3, n: 240 });
      for (const t of [0.5, 1, 1.5, 2])
        svg.line(g.X(t), g.Y(0) - 5, g.X(t), g.Y(0) + 5, { color: COLORS.black, width: 1.3 });
      for (const [v, l] of [
        [1, top],
        [0, '0'],
        [-1, bottom],
      ]) {
        svg.line(g.X(0) - 5, g.Y(v), g.X(0) + 5, g.Y(v), { color: COLORS.black, width: 1.3 });
        lab(svg, g.X(0) - 10, g.Y(v), l, { anchor: 'end', size: 19 });
      }
      lab(svg, g.X(1), g.Y(0) + 26, 'T', { size: 19 });
      lab(svg, g.X(2), g.Y(0) + 26, '2T', { size: 19 });
      lab(svg, g.X(2.4) + 16, g.Y(0) + 4, 't', { size: 20 });
      lab(svg, g.X(0), g.Y(1.3) - 18, label, { size: 20 });
      return g;
    };
    const w = 2 * Math.PI;
    const g1 = graph(300, t => Math.cos(w * t), 'X', '−X', 'Position', 'x');
    svg.leader(g1.X(0.4), g1.Y(1.2), g1.X(0.04), g1.Y(1), { bend: 0.3, width: 1.3 });
    note(svg, g1.X(0.42), g1.Y(1.25), 'Position', { anchor: 'start' });
    svg.arrow(g1.X(1), g1.Y(1.15), g1.X(2), g1.Y(1.15), {
      color: COLORS.black,
      width: 1.4,
      head: 11,
      start: true,
    });
    lab(svg, g1.X(1.5), g1.Y(1.15) - 16, 'T', { size: 19 });
    svg.line(g1.X(2), g1.Y(1), g1.X(2.4), g1.Y(1), {
      color: COLORS.guide,
      width: 1.2,
      dash: '5 4',
    });
    svg.arrow(g1.X(2.3), g1.Y(0) - 2, g1.X(2.3), g1.Y(1) + 2, {
      color: COLORS.black,
      width: 1.3,
      head: 9,
      start: true,
    });
    note(svg, g1.X(2.34), g1.Y(0.55), 'Amplitude X', { anchor: 'start', size: 16 });
    const g2 = graph(500, t => -Math.sin(w * t), 'v_{max}', '−v_{max}', 'Velocity', 'v');
    svg.leader(g2.X(1.1), g2.Y(1.2), g2.X(0.98), g2.Y(0.15), { bend: 0.3, width: 1.3 });
    note(svg, g2.X(1.12), g2.Y(1.25), 'Velocity', { anchor: 'start' });
    const g3 = graph(700, t => -Math.cos(w * t), 'a_{max}', '−a_{max}', 'Acceleration', 'a');
    svg.leader(g3.X(0.65), g3.Y(1.25), g3.X(0.52), g3.Y(1.02), { bend: 0.3, width: 1.3 });
    note(svg, g3.X(0.67), g3.Y(1.3), 'Acceleration', { anchor: 'start' });
    // Unstrained, equilibrium and oscillating springs.
    const top = 900;
    for (const x of [200, 360, 520]) svg.rect(x - 60, top, 120, 14, { fill: '#c9b99a' });
    coil(svg, [200, top + 14], [200, top + 120], { n: 10, r: 14, width: 1.8 });
    svg.circle(200, top + 132, 14, { fill: BALL, stroke: '#8a1c20', width: 1 });
    svg.path(
      `M 140 ${top + 150} Q 170 ${top + 120} 214 ${top + 128} L 222 ${top + 150} Q 180 ${top + 168} 130 ${top + 162} Z`,
      {
        color: '#9a7a4a',
        width: 1.2,
        fill: '#e2c48e',
      }
    );
    svg.arrow(110, top + 20, 110, top + 120, {
      color: COLORS.black,
      width: 1.5,
      head: 10,
      start: true,
    });
    note(svg, 100, top + 70, 'Unstrained', { anchor: 'end' });
    note(svg, 100, top + 92, 'length', { anchor: 'end' });
    const eqY = top + 260;
    coil(svg, [360, top + 14], [360, eqY - 14], { n: 10, r: 14, width: 1.8 });
    svg.circle(360, eqY, 14, { fill: BALL, stroke: '#8a1c20', width: 1 });
    note(svg, 330, eqY - 6, 'Equilibrium', { anchor: 'end' });
    note(svg, 330, eqY + 16, 'position', { anchor: 'end' });
    svg.line(214, top + 132, 440, top + 132, { color: COLORS.guide, width: 1.2, dash: '5 4' });
    coil(svg, [520, top + 14], [520, eqY - 80 - 14], { n: 10, r: 14, width: 1.8 });
    for (const d of [-80, -40, 0, 40, 80]) {
      svg.add(
        `<circle cx="520" cy="${eqY + d}" r="14" fill="${BALL}" fill-opacity="${d ? 0.35 : 0.9}" stroke="#8a1c20" stroke-dasharray="${d ? '3 2' : ''}"/>`
      );
    }
    svg.line(374, eqY, 620, eqY, { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.line(534, eqY - 80, 620, eqY - 80, { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.line(534, eqY + 80, 620, eqY + 80, { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.arrow(580, eqY - 78, 580, eqY - 2, {
      color: COLORS.black,
      width: 2,
      head: 12,
      start: true,
    });
    svg.arrow(580, eqY + 2, 580, eqY + 78, {
      color: COLORS.black,
      width: 2,
      head: 12,
      start: true,
    });
    lab(svg, 568, eqY - 40, 'X', { anchor: 'end' });
    lab(svg, 568, eqY + 40, 'X', { anchor: 'end' });
    lab(svg, 626, eqY - 80, 'x = +X', { anchor: 'start', size: 19 });
    lab(svg, 626, eqY, 'x = 0', { anchor: 'start', size: 19 });
    lab(svg, 626, eqY + 80, 'x = −X', { anchor: 'start', size: 19 });
    return svg.render();
  },

  // 16.4 Fig. 1 — the simple pendulum
  Figure_16_04_01: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'Forces on a simple pendulum',
      desc: 'A pendulum bob of mass m hangs from a string of length L, displaced by angle θ from the vertical dashed equilibrium line; s is the arc length from equilibrium. The tension T acts along the string toward the pivot and the weight w = mg acts straight down. The component of the weight perpendicular to the string, −mg sin θ, points along the arc toward equilibrium: it is the restoring force.',
    });
    const P = [210, 40];
    const L = 300;
    const th = 22;
    const B = [P[0] + L * Math.sin(rad(th)), P[1] + L * Math.cos(rad(th))];
    svg.rect(20, 18, 520, 22, { fill: '#b9bcc2' });
    svg.line(P[0], P[1], P[0], P[1] + L + 40, { color: COLORS.maroon, width: 1.8, dash: '7 5' });
    // The pendulum at angle θ, which motion replaces.
    svg.still(() => {
      svg.line(...P, ...B, { color: COLORS.black, width: 2.2 });
      svg.arc(...P, 60, -90, -90 + th, { color: COLORS.black, width: 1.8 });
      lab(svg, P[0] + 12, P[1] + 84, 'θ', { anchor: 'start' });
      lab(svg, (P[0] + B[0]) / 2 + 14, (P[1] + B[1]) / 2 - 10, 'L', { anchor: 'start' });
      // Arc length s from equilibrium to the bob.
      svg.arc(...P, L, -90, -90 + th, { color: COLORS.maroon, width: 1.8, dash: '6 4' });
      lab(
        svg,
        P[0] + (L + 22) * Math.sin(rad(th / 2)),
        P[1] + (L + 22) * Math.cos(rad(th / 2)),
        's'
      );
      const u = [Math.sin(rad(th)), Math.cos(rad(th))];
      svg.arrow(B[0] - u[0] * 16, B[1] - u[1] * 16, B[0] - u[0] * 100, B[1] - u[1] * 100, {
        color: FORCE,
        width: 4,
        head: 18,
      });
      lab(svg, B[0] - u[0] * 70 + 22, B[1] - u[1] * 70, '**T**', { anchor: 'start' });
      svg.arrow(B[0], B[1] + 16, B[0], B[1] + 150, { color: FORCE, width: 4, head: 18 });
      lab(svg, B[0] + 14, B[1] + 140, 'w = mg', { anchor: 'start' });
      // Restoring component, perpendicular to the string, toward equilibrium.
      const t = [-Math.cos(rad(th)), Math.sin(rad(th))];
      const len = 150 * Math.sin(rad(th));
      svg.arrow(
        B[0] + t[0] * 16,
        B[1] + t[1] * 16,
        B[0] + t[0] * (16 + len),
        B[1] + t[1] * (16 + len),
        { color: FORCE, width: 3, head: 15 }
      );
      lab(svg, B[0] + t[0] * (16 + len) - 4, B[1] + t[1] * (16 + len) + 44, '−mg \\rm{sin} θ', {
        anchor: 'end',
      });
      svg.line(B[0], B[1], B[0] - u[0] * -110, B[1] + u[1] * 110, {
        color: COLORS.black,
        width: 1.4,
        dash: '6 4',
      });
      svg.arc(...B, 54, -90, -90 + th, { color: COLORS.black, width: 1.6 });
      lab(svg, B[0] + 10, B[1] + 74, 'θ', { anchor: 'start', size: 20 });
      svg.circle(...B, 16, { fill: '#3d7fc0', stroke: '#1d4f80', width: 1.5 });
      lab(svg, B[0] + 22, B[1] - 6, 'm', { anchor: 'start' });
    });
    // For readers who allow motion, the pendulum swings between ±θ. The
    // weight stays the same; its restoring component −mg sin θ shrinks to zero
    // at the bottom and reverses, always pointing back toward equilibrium.
    const swing = a => {
      const bob = [P[0] + L * Math.sin(rad(a)), P[1] + L * Math.cos(rad(a))];
      const along = [Math.sin(rad(a)), Math.cos(rad(a))];
      const across = [-Math.cos(rad(a)), Math.sin(rad(a))];
      svg.line(...P, ...bob, { color: COLORS.black, width: 2.2 });
      vec(
        svg,
        bob[0] - along[0] * 16,
        bob[1] - along[1] * 16,
        bob[0] - along[0] * 100,
        bob[1] - along[1] * 100,
        {
          color: FORCE,
          width: 4,
          head: 18,
        }
      );
      lab(svg, bob[0] - along[0] * 70 + 22, bob[1] - along[1] * 70, '**T**', { anchor: 'start' });
      vec(svg, bob[0], bob[1] + 16, bob[0], bob[1] + 150, { color: FORCE, width: 4, head: 18 });
      lab(svg, bob[0] + 14, bob[1] + 140, 'w = mg', { anchor: 'start' });
      const r = 150 * Math.sin(rad(a));
      vec(
        svg,
        bob[0] + across[0] * 16 * Math.sign(r || 1),
        bob[1] + across[1] * 16 * Math.sign(r || 1),
        bob[0] + across[0] * (16 * Math.sign(r || 1) + r),
        bob[1] + across[1] * (16 * Math.sign(r || 1) + r),
        {
          color: FORCE,
          width: 3,
          head: 15,
        }
      );
      svg.circle(...bob, 16, { fill: '#3d7fc0', stroke: '#1d4f80', width: 1.5 });
      lab(svg, bob[0] + 22, bob[1] - 6, 'm', { anchor: 'start' });
    };
    const frames = cycle(2.4, 40).map(t => th * Math.cos((2 * Math.PI * t) / 2.4));
    svg.motionGroup(
      morph(
        frames.map(a => svg.capture(() => swing(a))),
        { dur: '2.4s' }
      )
    );
    return svg.render();
  },

  // 16.5 Fig. 1 — energy in simple harmonic motion
  Figure_16_05_01: () => energyStages(),

  // 16.7 — the same figure repeated in the damping section
  Figure_16_07_04: () => energyStages(),

  // 16.6 Fig. 2 — the reference circle
  Figure_16_06_03: () => {
    const svg = new Svg({
      width: 640,
      height: 580,
      title: 'Uniform circular motion and its projection',
      desc: 'A point P moves counterclockwise around a circle of radius X with constant angular velocity ω. The radius to P makes angle θ with the x axis. Its projection onto the x axis is at x, and the vertical distance from P to the axis is √(X² − x²). The velocity of P, of magnitude v_max, is tangent to the circle, and its x component is v: the velocity triangle is similar to the displacement triangle. As P goes around, its projection on the x axis moves back and forth in simple harmonic motion.',
    });
    const c = [300, 290];
    const R = 220;
    svg.circle(...c, R, { fill: 'none', stroke: '#6a3d9a', width: 3 });
    svg.arrow(c[0] - R - 20, c[1], c[0] + R + 40, c[1], {
      color: COLORS.black,
      width: 1.6,
      head: 12,
    });
    lab(svg, c[0] + R + 50, c[1], 'x', { anchor: 'start' });
    svg.arc(c[0] - 150, c[1] - 30, 44, 140, 250, { color: '#2a9fae', width: 3 });
    svg.arrow(
      c[0] - 150 + 44 * Math.cos(rad(240)),
      c[1] - 30 - 44 * Math.sin(rad(240)),
      c[0] - 150 + 44 * Math.cos(rad(256)),
      c[1] - 30 - 44 * Math.sin(rad(256)),
      {
        color: '#2a9fae',
        width: 3,
        head: 14,
      }
    );
    lab(svg, c[0] - 196, c[1] - 30, 'ω', { anchor: 'end' });
    const draw = (deg, moving) => {
      const a = rad(deg);
      const P = [c[0] + R * Math.cos(a), c[1] - R * Math.sin(a)];
      const F = [P[0], c[1]];
      const v = 0.42 * R;
      const V = [P[0] - v * Math.sin(a), P[1] - v * Math.cos(a)];
      svg.line(...c, ...P, { color: COLORS.maroon, width: 3 });
      svg.line(...P, ...F, { color: COLORS.black, width: 1.6, dash: '6 4' });
      svg.arrow(...c, F[0] - Math.sign(F[0] - c[0]) * 2, c[1], {
        color: COLORS.maroon,
        width: 2.5,
        head: 12,
        start: true,
      });
      svg.arrow(...P, ...V, { color: VEL, width: 3.5, head: 16 });
      svg.arrow(...P, V[0], P[1], { color: VEL, width: 2.5, head: 13 });
      svg.circle(...P, 7, { fill: COLORS.black });
      svg.circle(...F, 7, { fill: '#2a9fae' });
      lab(svg, P[0] + 14 * Math.cos(a), P[1] - 14 * Math.sin(a) - 10, '\\rm{P}', {
        anchor: 'start',
      });
      lab(svg, V[0] - 8, V[1] - 16, '**v**_{max}', { anchor: 'end' });
      lab(svg, (P[0] + V[0]) / 2, P[1] + 24, '**v**', { size: 20 });
      // The side labels travel with P, so the animation keeps them too; the θ
      // arc changes shape as θ passes 180°, so only the still shows it.
      lab(svg, (c[0] + P[0]) / 2 - 22, (c[1] + P[1]) / 2, 'X', { anchor: 'end' });
      lab(svg, (c[0] + F[0]) / 2, c[1] + 26, 'x');
      lab(svg, P[0] + 12, (P[1] + c[1]) / 2, '√(X^2 − x^2)', { anchor: 'start' });
      if (!moving) {
        svg.arc(...c, 46, 0, deg, { color: COLORS.black, width: 1.8 });
        lab(svg, c[0] + 56 * Math.cos(a / 2), c[1] - 56 * Math.sin(a / 2), 'θ');
      }
    };
    const frames = [];
    for (let k = 0; k < 36; k += 1) frames.push(72 + k * 10);
    svg.animated(draw, frames, { still: 0, dur: '6s' });
    note(
      svg,
      c[0],
      c[1] + R + 34,
      'Its projection on the x axis undergoes simple harmonic motion.'
    );
    return svg.render();
  },

  // 16.7 Fig. 2 — an underdamped oscillator
  Figure_16_07_02: () => {
    const svg = new Svg({
      width: 720,
      height: 320,
      title: 'Displacement of a lightly damped harmonic oscillator',
      desc: 'Displacement x versus time t for a harmonic oscillator with a small amount of damping: x = X e^(−t/τ) cos(2πt/T). The amplitude, shown by the decaying envelope, slowly decreases, but the period T stays the same from cycle to cycle.',
    });
    const T = 1;
    const tau = 4.2;
    const g = new Plot(svg, {
      x: 50,
      y: 30,
      w: 620,
      h: 250,
      xRange: [0, 8.2],
      yRange: [-1.1, 1.1],
    });
    g.axes({ xAxisAt: 0 });
    g.fn(t => Math.exp(-t / tau), 0, 8, { color: '#7b5aa6', width: 2 });
    g.fn(t => -Math.exp(-t / tau), 0, 8, { color: '#7b5aa6', width: 2 });
    g.fn(t => Math.exp(-t / tau) * Math.cos((2 * Math.PI * t) / T), 0, 8, {
      color: '#2a9fae',
      width: 3,
      n: 600,
    });
    lab(svg, g.X(8.2) + 10, g.Y(0), 't', { anchor: 'start' });
    lab(svg, g.X(0), g.Y(1.1) - 14, 'x');
    lab(svg, g.X(0) - 8, g.Y(0), '0', { anchor: 'end', size: 19 });
    svg.arrow(g.X(0.5), g.Y(0) - 2, g.X(0.5), g.Y(Math.exp(-0.5 / tau)) + 2, {
      color: COLORS.black,
      width: 1.3,
      head: 9,
      start: true,
    });
    lab(svg, g.X(0.5) + 8, g.Y(0.5), 'x', { anchor: 'start', size: 19 });
    for (const [t0, y] of [
      [0, 1.06],
      [5, 0.98],
    ]) {
      svg.arrow(g.X(t0), g.Y(y), g.X(t0 + T), g.Y(y), {
        color: COLORS.black,
        width: 1.3,
        head: 9,
        start: true,
      });
      lab(svg, g.X(t0 + T / 2), g.Y(y) - 14, 'T', { size: 19 });
    }
    return svg.render();
  },

  // 16.7 Fig. 3 — critically damped and overdamped oscillators
  Figure_16_07_03: () => {
    const svg = new Svg({
      width: 560,
      height: 360,
      title: 'Critically damped and overdamped oscillators',
      desc: 'Displacement x versus time t for two oscillators released from rest at X0. Curve A, critically damped, returns to equilibrium at x = 0 in the shortest possible time without overshooting. Curve B, overdamped, also returns without overshooting but takes longer.',
    });
    const g = new Plot(svg, { x: 60, y: 30, w: 450, h: 280, xRange: [0, 6], yRange: [0, 1.15] });
    g.axes({ arrows: true });
    // Critically damped (ω0 = 1.4): x = X0(1 + ω0 t)e^(−ω0 t).
    const w0 = 1.4;
    g.fn(t => (1 + w0 * t) * Math.exp(-w0 * t), 0, 5.8, { color: COLORS.orange, width: 3.5 });
    // Overdamped, same ω0 with damping ratio 2.2: roots r1, r2 of r² + 2ζω0 r + ω0² = 0.
    const z = 2.2;
    const r1 = -w0 * (z - Math.sqrt(z * z - 1));
    const r2 = -w0 * (z + Math.sqrt(z * z - 1));
    g.fn(t => (r2 * Math.exp(r1 * t) - r1 * Math.exp(r2 * t)) / (r2 - r1), 0, 5.8, {
      color: '#6a3d9a',
      width: 3.5,
    });
    lab(svg, g.X(0) - 8, g.Y(1), 'X_0', { anchor: 'end' });
    lab(svg, g.X(0), g.Y(1.15) - 18, 'x');
    lab(svg, g.X(6) + 14, g.Y(0), 't', { anchor: 'start' });
    lab(svg, g.X(1.55), g.Y(0.52), 'A', { anchor: 'start', size: 24 });
    lab(svg, g.X(3.3), g.Y(0.42), 'B', { anchor: 'start', size: 24 });
    return svg.render();
  },

  // 16.8 Fig. 2 — driving a paddle ball at three frequencies
  Figure_16_08_02: () => {
    const svg = new Svg({
      width: 760,
      height: 400,
      title: 'A paddle ball driven at three frequencies',
      desc: 'A finger moves up and down, holding a rubber band from which a ball hangs. Driven at a low frequency or at a high frequency, the ball oscillates with a small amplitude, swinging through 2X. Driven at the natural frequency f0 of the ball on the rubber band, the ball oscillates with a much larger amplitude: resonance.',
    });
    [
      [130, 'low f', 30],
      [380, 'f_0', 88],
      [630, 'high f', 26],
    ].forEach(([x, f, A]) => {
      svg.rect(x - 110, 30, 150, 50, { fill: '#e8c9a6', stroke: '#a3805a', width: 1.4, rx: 24 });
      svg.arrow(x + 64, 40, x + 64, 74, { color: '#2a9fae', width: 2, head: 9, start: true });
      lab(svg, x + 76, 56, f, { anchor: 'start', size: 19 });
      const yb = 220;
      svg.line(x, 80, x, yb - 18, { color: '#555555', width: 2 });
      for (const d of [-A, A]) {
        svg.add(
          `<circle cx="${x}" cy="${yb + d}" r="20" fill="#2a9fae" fill-opacity="0.25" stroke="#2a9fae" stroke-dasharray="4 3"/>`
        );
      }
      svg.circle(x, yb, 20, { fill: '#2a9fae', stroke: '#1d6b75', width: 1.5 });
      svg.arrow(x + 44, yb - A, x + 44, yb + A, {
        color: COLORS.black,
        width: 1.5,
        head: 11,
        start: true,
      });
      lab(svg, x + 54, yb, '2X', { anchor: 'start', size: 19 });
    });
    return svg.render();
  },

  // 16.8 Fig. 3 — resonance curves for three amounts of damping
  Figure_16_08_03: () => {
    const svg = new Svg({
      width: 720,
      height: 440,
      title: 'Amplitude of a driven oscillator versus driving frequency',
      desc: 'Amplitude X of the same oscillator, with natural frequency f0, as a function of the driving frequency f, for small, medium and heavy damping. Each curve peaks at resonance, when the driving frequency is close to f0. The less the damping, the taller and narrower the peak; double arrows show each curve’s width at half its height.',
    });
    const g = new Plot(svg, { x: 80, y: 40, w: 520, h: 320, xRange: [0, 2], yRange: [0, 1.1] });
    g.axes({ arrows: true });
    const amp = b => f => 1 / Math.sqrt((1 - f * f) ** 2 + (b * f) ** 2);
    const curves = [
      { b: 0.1, name: 'Small damping', color: COLORS.green },
      { b: 0.2, name: 'Medium damping', color: COLORS.red },
      { b: 0.4, name: 'Heavy damping', color: '#6a3d9a' },
    ];
    const peak0 = amp(0.1)(Math.sqrt(1 - 0.1 ** 2 / 2));
    for (const c of curves) {
      const A = f => amp(c.b)(f) / peak0;
      g.fn(A, 0.12, 1.9, { color: c.color, width: 3, n: 500 });
      // Width at half the peak height, found numerically.
      let fp = 0;
      let mx = 0;
      for (let f = 0.5; f < 1.5; f += 0.0005) if (A(f) > mx) [mx, fp] = [A(f), f];
      const half = mx / 2;
      let lo = fp;
      while (A(lo) > half) lo -= 0.0005;
      let hi = fp;
      while (A(hi) > half) hi += 0.0005;
      svg.arrow(g.X(lo), g.Y(half), g.X(hi), g.Y(half), {
        color: COLORS.black,
        width: 1.4,
        head: 9,
        start: true,
      });
      const fl = fp + 0.06;
      svg.leader(g.X(fl + 0.22), g.Y(mx * 0.96), g.X(fl), g.Y(A(fl)), { bend: 0.25, width: 1.2 });
      note(svg, g.X(fl + 0.24), g.Y(mx * 0.96), c.name, { anchor: 'start' });
    }
    for (const [f, l] of [
      [0.5, 'f_0/2'],
      [1, 'f_0'],
      [1.5, '3f_0/2'],
    ]) {
      svg.line(g.X(f), g.Y(0) - 5, g.X(f), g.Y(0) + 5, { color: COLORS.black, width: 1.3 });
      lab(svg, g.X(f), g.Y(0) + 26, l, { size: 20 });
    }
    lab(svg, g.X(2) + 14, g.Y(0), 'f', { anchor: 'start' });
    note(svg, g.X(2), g.Y(0) + 52, 'Driving frequency', { anchor: 'end' });
    lab(svg, g.X(0) - 4, g.Y(1.1) - 16, '\\rm{Amplitude} X', { anchor: 'start', size: 19 });
    return svg.render();
  },

  // 16.9 Fig. 2 — a gull bobbing on an idealized ocean wave
  Figure_16_09_02: () => {
    const svg = new Svg({
      width: 880,
      height: 400,
      title: 'An idealized ocean wave',
      desc: 'A sinusoidal water wave with two crests and two troughs moves right at speed vw. A dashed line marks the undisturbed water level. Crests rise a height X above it and troughs dip X below it, labeled −X, so a sea gull floating in a trough sits 2X below where it was on the crest; its earlier position is shown faded above. The wavelength λ is the distance between adjacent crests.',
    });
    const [y0, X, lam, x0] = [150, 72, 420, 120];
    // The wave moves right at one wavelength per period P.
    const P = 2.4;
    const Y = (x, t = 0) => y0 - X * Math.cos(2 * Math.PI * ((x - x0) / lam - t / P));
    svg.add(
      '<defs><linearGradient id="sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fcbee"/><stop offset="0.5" stop-color="#d2eaf8"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>'
    );
    const xg = 352;
    const sea = (from = 0) => {
      const pts = [];
      for (let x = from; x <= 880; x += 5) pts.push([x, Y(x)]);
      svg.polygon([...pts, [880, 400], [from, 400]], { fill: 'url(#sea)' });
      svg.polyline(pts, { color: '#1aa6b7', width: 2.5 });
    };
    const marks = () => {
      for (const x of [x0, x0 + lam])
        svg.line(x, 22, x, y0 - X - 6, { color: COLORS.guide, width: 1, dash: '3 4' });
      svg.arrow(x0 + 1, 22, x0 + lam - 1, 22, {
        color: COLORS.black,
        width: 1.5,
        head: 12,
        start: true,
      });
      for (const x of [x0, x0 + lam]) svg.line(x, 12, x, 32, { color: COLORS.black, width: 1.4 });
      lab(svg, x0 + lam / 2, 22, 'λ');
      vdim(svg, x0, y0 - X, y0, 'X');
      vdim(svg, x0 + 1.5 * lam, y0, y0 + X, '−X', { side: -1 });
      vdim(svg, 314, y0 - X, y0 + X, '2X', { side: -1 });
    };
    svg.still(() => {
      sea();
      svg.line(0, y0, 880, y0, { color: COLORS.black, width: 1.5, dash: '7 5' });
      marks();
      // The gull rides the surface: a full 2X from crest to trough.
      svg.add(
        `<g opacity="0.5">${svg.capture(() => gull(svg, xg, Y(xg) - 2 * X, { dash: '4 3' }))}</g>`
      );
      gull(svg, xg, Y(xg));
    });
    // For readers who allow motion, the wave runs right through two periods
    // while the gull only bobs up and down; the measurements show while the
    // wave pauses where the still figure has it.
    const [hold, run, fade] = [1.6, 2 * P, 0.3];
    const T = hold + run + fade;
    const dur = `${fmt(T)}s`;
    const k1 = [0, hold / T, (hold + run) / T, 1];
    const wave = `<g>${svg.capture(() => sea(-2 * lam))}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" keyTimes="${k1.map(fmt).join(';')}" values="0 0;0 0;${2 * lam} 0;${2 * lam} 0"/></g>`;
    const bob = [0];
    const bobTimes = [0];
    for (let k = 0; k <= 48; k += 1) {
      bob.push(Y(xg, (run * k) / 48) - Y(xg));
      bobTimes.push((hold + (run * k) / 48) / T);
    }
    bob.push(0);
    bobTimes.push(1);
    const rider = `<g>${svg.capture(() => gull(svg, xg, Y(xg)))}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" keyTimes="${smilList(bobTimes)}" values="${bob.map(d => `0 ${fmt(d)}`).join(';')}"/></g>`;
    const shown = smilAnimate('opacity', [1, 1, 0, 0, 1], {
      dur,
      keyTimes: [0, (hold - fade) / T, hold / T, (hold + run) / T, 1],
    });
    svg.motionGroup(
      `${wave}${svg.capture(() =>
        svg.line(0, y0, 880, y0, { color: COLORS.black, width: 1.5, dash: '7 5' })
      )}<g>${shown}${svg.capture(marks)}</g>${rider}`
    );
    svg.arrow(610, 92, 710, 92, { color: COLORS.green, width: 3, head: 16 });
    lab(svg, 652, 70, 'v_w');
    return svg.render();
  },

  // 16.10 Fig. 2 — pure constructive interference
  Figure_16_10_02: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'Pure constructive interference',
      desc: 'Two identical waves, each of amplitude X, arrive exactly in phase: crest on crest and trough on trough. They add to a resultant with twice the amplitude, 2X, and the same wavelength.',
    });
    const f = x => Math.sin(2 * Math.PI * x);
    const [g1, g2, g3] = superposition(svg, f, f, {
      y0: 20,
      h: 90,
      gap: 120,
      span: 2.75,
      x0: 60,
      w: 500,
    });
    for (const g of [g1, g2]) {
      ampMark(svg, g, 0.25, 1, 'X');
      ampMark(svg, g, 0.75, -1, '−X');
    }
    ampMark(svg, g3, 0.25, 2, '2X');
    ampMark(svg, g3, 0.75, -2, '−2X');
    return svg.render();
  },

  // 16.10 Fig. 3 — pure destructive interference
  Figure_16_10_03: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'Pure destructive interference',
      desc: 'Two identical waves, each of amplitude X, arrive exactly out of phase: the crests of one line up with the troughs of the other. They cancel completely, and the resultant has zero amplitude.',
    });
    const [g1, g2] = superposition(
      svg,
      x => Math.sin(2 * Math.PI * x),
      x => -Math.sin(2 * Math.PI * x),
      { y0: 20, h: 90, gap: 120, span: 2.75, x0: 60, w: 500 }
    );
    ampMark(svg, g1, 0.25, 1, 'X');
    ampMark(svg, g1, 0.75, -1, '−X');
    ampMark(svg, g2, 0.25, -1, '−X');
    ampMark(svg, g2, 0.75, 1, 'X');
    return svg.render();
  },

  // 16.10 Fig. 4 — superposition of non-identical waves
  Figure_16_10_04: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'Superposition of non-identical waves',
      desc: 'Wave 1 has a long wavelength and large amplitude; wave 2 has a wavelength one fifth as long and a smaller amplitude. Their sum, the resultant, is an irregular wave: in some places the two add (constructive interference) and in others they partly cancel (destructive interference).',
    });
    superposition(
      svg,
      x => 1.4 * Math.sin(2 * Math.PI * x * 0.45),
      x => 0.45 * Math.sin(2 * Math.PI * x * 2.25 + 0.6),
      { y0: 20, h: 90, gap: 120, span: 2.75, x0: 60, w: 500 }
    );
    return svg.render();
  },

  // 16.10 Fig. 5 — a standing wave from two counter-propagating waves
  Figure_16_10_05: () => {
    const svg = new Svg({
      width: 900,
      height: 400,
      title: 'Standing wave formed by two waves traveling in opposite directions',
      desc: 'Five snapshots at t = 0, T/4, T/2, 3T/4 and T. In each, wave 1 moves left and wave 2 moves right, and the resultant below them is their sum. The resultant oscillates in place: its nodes, marked by vertical lines, never move, and its amplitude swings from twice that of each wave (constructive interference) through zero (destructive interference) and back.',
    });
    const times = ['0', 'T/4', 'T/2', '3T/4', 'T'];
    svg.still(() =>
      times.forEach((tl, i) => {
        const t = i / 4;
        const x0 = 90 + i * 160;
        const w = 140;
        const w1 = x => Math.sin(2 * Math.PI * (x + t));
        const w2 = x => Math.sin(2 * Math.PI * (x - t));
        const rows = [w1, w2, x => w1(x) + w2(x)];
        rows.forEach((f, j) => {
          const g = new Plot(svg, {
            x: x0,
            y: 40 + j * 100,
            w,
            h: j === 2 ? 110 : 60,
            xRange: [0, 1],
            yRange: j === 2 ? [-2.2, 2.2] : [-1.2, 1.2],
          });
          svg.line(x0, g.Y(0), x0 + w, g.Y(0), { color: COLORS.black, width: 1.2 });
          g.fn(f, 0, 1, { color: WAVE, width: 2.5 });
        });
        for (const xn of [0, 0.5, 1])
          svg.line(x0 + w * xn, 30, x0 + w * xn, 360, { color: '#7bb26b', width: 1.2 });
        svg.arrow(x0 + 90, 30, x0 + 50, 30, { color: '#2a9fae', width: 2.5, head: 11 });
        svg.arrow(x0 + 50, 130, x0 + 90, 130, { color: '#2a9fae', width: 2.5, head: 11 });
        lab(svg, x0 + w / 2, 384, `t = ${tl}`, { size: 19 });
      })
    );
    for (const [y, l] of [
      [70, 'Wave 1'],
      [170, 'Wave 2'],
      [295, 'Resultant'],
    ]) {
      note(svg, 82, y, l, { anchor: 'end', size: 15 });
    }
    // For readers who allow motion, one wide panel replaces the snapshots:
    // the two waves run through each other and the resultant oscillates in
    // place between its fixed nodes, while a marker runs along a time line
    // through the five snapshot times.
    const [x0, w, span, P] = [90, 790, 2.5, 3.2];
    const ruler = [180, 820];
    const dur = `${P}s`;
    const row = (j, f, from, to) => {
      const g = new Plot(svg, {
        x: x0,
        y: 40 + j * 100,
        w,
        h: j === 2 ? 110 : 60,
        xRange: [0, span],
        yRange: j === 2 ? [-2.2, 2.2] : [-1.2, 1.2],
      });
      const axis = svg.capture(() =>
        svg.line(x0, g.Y(0), x0 + w, g.Y(0), { color: COLORS.black, width: 1.2 })
      );
      const curve = svg.capture(() => g.fn(f, from, to, { color: WAVE, width: 2.5, n: 300 }));
      return { y: g.Y(0), axis, curve };
    };
    const sine = x => Math.sin(2 * Math.PI * x);
    const lambda = w / span;
    // Wave 1 slides left and wave 2 right, one wavelength per period.
    const travel = (j, dx, from, to) => {
      const { axis, curve } = row(j, sine, from, to);
      return `${axis}<g clip-path="url(#panel_16_10_05)"><g>${curve}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" values="0 0;${fmt(dx)} 0"/></g></g>`;
    };
    // Their sum, 2 sin kx cos ωt, stays in place and swells and shrinks.
    const sum = row(2, x => 2 * sine(x), 0, span);
    const scales = cycle(P, 48).map(t => `1 ${fmt(Math.cos((2 * Math.PI * t) / P))}`);
    const standing = `${sum.axis}<g transform="translate(0 ${fmt(sum.y)})"><g><animateTransform attributeName="transform" type="scale" dur="${dur}" repeatCount="indefinite" values="${scales.join(';')}"/><g transform="translate(0 ${fmt(-sum.y)})">${sum.curve.replace('<polyline', '<polyline vector-effect="non-scaling-stroke"')}</g></g></g>`;
    const fixed = svg.capture(() => {
      for (let k = 0; k <= 2 * span; k += 1) {
        const x = x0 + (w * k) / (2 * span);
        svg.line(x, 30, x, 360, { color: '#7bb26b', width: 1.2 });
      }
      const mid = x0 + w / 2;
      svg.arrow(mid + 20, 30, mid - 20, 30, { color: '#2a9fae', width: 2.5, head: 11 });
      svg.arrow(mid - 20, 130, mid + 20, 130, { color: '#2a9fae', width: 2.5, head: 11 });
      svg.line(ruler[0], 380, ruler[1], 380, { color: COLORS.black, width: 1.4 });
      times.forEach((tl, i) => {
        const x = ruler[0] + ((ruler[1] - ruler[0]) * i) / 4;
        svg.line(x, 372, x, 388, { color: COLORS.black, width: 1.4 });
        lab(svg, x, 360, `t = ${tl}`, { size: 17 });
      });
    });
    svg.motionGroup(
      `<defs><clipPath id="panel_16_10_05"><rect x="${x0}" y="0" width="${w}" height="400"/></clipPath></defs><rect x="${x0 - 2}" y="0" width="${900 - x0 + 2}" height="400" fill="#ffffff"/>${fixed}${travel(0, -lambda, 0, span + 1)}${travel(1, lambda, -1, span)}${standing}<circle cx="${ruler[0]}" cy="380" r="7" fill="#2a9fae">${smilAnimate('cx', ruler, { dur })}</circle>`
    );
    return svg.render();
  },

  // 16.10 Fig. 6 — a string in its fundamental mode
  Figure_16_10_06: () => {
    const svg = new Svg({
      width: 820,
      height: 420,
      title: 'A string vibrating at its fundamental frequency',
      desc: 'A string of length L fixed at both ends vibrates in a single loop: nodes at the ends and an antinode in the middle. Its wavelength is λ1 = 2L, twice the string length, shown by the dashed continuation of the wave beyond the right end, and its frequency is f1 = v_w/2L.',
    });
    const L = 320;
    const x0 = 90;
    const yc = 160;
    const A = 70;
    for (const x of [x0, x0 + L])
      svg.rect(x - 8, 40, 16, 250, { fill: '#9ccbd6', stroke: '#5e8d98', width: 1 });
    const ghost = [];
    for (let k = 0; k <= 60; k += 1)
      ghost.push([x0 + L + (L * k) / 60, yc + A * Math.sin((Math.PI * k) / 60)]);
    svg.polyline(ghost, { color: STRING, width: 4, dash: '7 6' });
    const ghost2 = ghost.map(([x, y]) => [x, 2 * yc - y]);
    svg.polyline(ghost2, { color: STRING, width: 4, dash: '7 6' });
    standingString(svg, x0, L, yc, A, 1);
    svg.arrow(x0, 30, x0 + L, 30, { color: COLORS.black, width: 1.5, head: 12, start: true });
    lab(svg, x0 + L / 2, 16, 'L');
    svg.arrow(x0, 318, x0 + 2 * L, 318, { color: COLORS.black, width: 1.5, head: 12, start: true });
    svg.line(x0 + 2 * L, 304, x0 + 2 * L, 332, { color: COLORS.black, width: 1.5 });
    lab(svg, x0 + L, 300, 'λ_1');
    note(svg, x0 + L / 2, 356, 'Fundamental', { size: 20 });
    lab(svg, x0 + 60, 390, 'f_1 = v_w/2L', { size: 21 });
    lab(svg, x0 + 280, 390, 'λ_1 = 2L', { size: 21 });
    svg.leader(x0 + 40, 70, x0 + 30, yc - 14, { bend: -0.3, width: 1.3 });
    note(svg, x0 + 40, 62, 'Loop', { anchor: 'start' });
    svg.leader(x0 + L / 2, 66, x0 + L / 2 + 4, yc - A - 4, { bend: 0.3, width: 1.3 });
    note(svg, x0 + L / 2, 54, 'Antinode');
    svg.leader(x0 + L - 40, 64, x0 + L - 4, yc - 4, { bend: 0.3, width: 1.3 });
    note(svg, x0 + L - 40, 56, 'Node', { anchor: 'middle' });
    return svg.render();
  },

  // 16.10 Fig. 7 — the first two overtones
  Figure_16_10_07: () => {
    const svg = new Svg({
      width: 820,
      height: 360,
      title: 'The first and second overtones of a string',
      desc: 'Left: the first overtone, with two loops and a node in the middle; its wavelength is λ2 = L and its frequency f2 = v_w/L = 2f1. Right: the second overtone, with three loops and two interior nodes; λ3 = 2L/3 and f3 = 3v_w/2L = 3f1. Arrows point to the interior nodes.',
    });
    [
      [60, 2, 'First overtone', 'f_2 = v_w/L = 2f_1', 'λ_2 = L', 'λ_2'],
      [450, 3, 'Second overtone', 'f_3 = 3v_w/2L = 3f_1', 'λ_3 = 2L/3', 'λ_3'],
    ].forEach(([x0, n, name, f, lam, lamLabel]) => {
      const L = 300;
      const yc = 150;
      for (const x of [x0, x0 + L])
        svg.rect(x - 7, 40, 14, 220, { fill: '#9ccbd6', stroke: '#5e8d98', width: 1 });
      standingString(svg, x0, L, yc, 48, n);
      svg.arrow(x0, 28, x0 + L, 28, { color: COLORS.black, width: 1.5, head: 12, start: true });
      lab(svg, x0 + L / 2, 14, 'L');
      const lw = (2 * L) / n;
      svg.arrow(x0, 238, x0 + lw, 238, { color: COLORS.black, width: 1.5, head: 12, start: true });
      lab(svg, x0 + lw / 2, 222, lamLabel);
      note(svg, x0 + L / 2, 280, name, { size: 19 });
      lab(svg, x0 + 70, 320, f, { size: 19 });
      lab(svg, x0 + 250, 320, lam, { size: 19 });
      for (let k = 1; k < n; k += 1) {
        svg.leader(x0 + L / 2, 80, x0 + (L * k) / n, yc - 4, { bend: 0.2, width: 1.2 });
      }
      note(svg, x0 + L / 2, 72, 'Nodes');
    });
    return svg.render();
  },

  // 16.10 Fig. 8 — beats
  Figure_16_10_08: () => {
    const svg = new Svg({
      width: 860,
      height: 300,
      title: 'Beats from two waves of slightly different frequency',
      desc: 'Two waves of equal amplitude and slightly different frequencies f1 and f2 (wavelengths λ1 and λ2), and their sum. The resultant alternates in time between destructive interference, where the waves are out of phase and it nearly vanishes, and constructive interference, where they are in phase and it has twice the amplitude: its amplitude rises and falls periodically.',
    });
    const x0 = 40;
    const w = 640;
    const f1 = 12;
    const f2 = 13;
    const rows = [
      [t => Math.sin(2 * Math.PI * f1 * t), 'Wave 1', 'f_1, λ_1', 50],
      [t => Math.sin(2 * Math.PI * f2 * t), 'Wave 2', 'f_2, λ_2', 100],
      [t => Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t), 'Resultant', '', 170],
    ];
    for (const [f, name, fl, y] of rows) {
      const h = name === 'Resultant' ? 70 : 34;
      const g = new Plot(svg, {
        x: x0,
        y: y - h / 2,
        w,
        h,
        xRange: [0, 1.5],
        yRange: name === 'Resultant' ? [-2, 2] : [-1, 1],
      });
      svg.line(x0, y, x0 + w, y, { color: COLORS.black, width: 1 });
      g.fn(f, 0, 1.5, { color: WAVE, width: 2.2, n: 900 });
      note(svg, x0 + w + 12, y, name, { anchor: 'start', size: 18 });
      if (fl) lab(svg, x0 + 40, y - 26, fl, { anchor: 'start', size: 17 });
    }
    // Phases: in phase at t = 0, 1; out of phase at t = 0.5 (beat frequency 1).
    for (const t of [0.5, 1])
      svg.line(x0 + (w * t) / 1.5, 30, x0 + (w * t) / 1.5, 220, {
        color: COLORS.black,
        width: 1.2,
      });
    note(svg, x0 + (w * 0.5) / 1.5, 246, 'Destructive', { size: 17 });
    note(svg, x0 + w / 1.5, 246, 'Constructive', { size: 17 });
    note(svg, x0 + w / 2, 280, 'Time', { size: 18 });
    // For readers who allow motion, a time cursor sweeps along, riding each
    // wave: the two ride in step at the constructive line and opposite at the
    // destructive one.
    const fs = rows.map(([f]) => f);
    const ys = rows.map(([, name, , y]) => [y, name === 'Resultant' ? 35 / 2 : 17]);
    svg.motionGroup(
      morph(
        cycle(1.5, 300).map(t =>
          svg.capture(() => {
            const x = x0 + (w * t) / 1.5;
            svg.line(x, 30, x, 220, { color: '#2a9fae', width: 2, dash: '5 4' });
            fs.forEach((f, i) => {
              const [y, a] = ys[i];
              svg.circle(x, y - a * f(t), 5.5, { fill: '#c62828', stroke: '#ffffff', width: 1.5 });
            });
          })
        ),
        { dur: '9s' }
      )
    );
    return svg.render();
  },

  // 16.11 Fig. 2 — two stereo speakers interfering in a room
  Figure_16_11_02: () => {
    const svg = new Svg({
      width: 740,
      height: 470,
      title: 'Interference of sound from two speakers',
      desc: 'Two speakers high in the left and right corners aim beams of sound down and toward each other. In each beam, solid arcs centered on its speaker are compressions and dashed arcs halfway between them are rarefactions. The shading of each beam is strongest near its speaker. Where the beams overlap, the points where a compression from one speaker meets a compression from the other are marked with glowing dots: there the waves interfere constructively.',
    });
    const [lam, r0, R, half] = [62, 46, 420, 24];
    const sources = [
      [64, 56, 54],
      [576, 56, 126],
    ];
    const at = ([x, y], r, a) => [x + r * Math.cos(rad(a)), y + r * Math.sin(rad(a))];
    const arcPts = (S, r, a) =>
      Array.from({ length: 31 }, (_, k) => at(S, r, a - half + (2 * half * k) / 30));
    sources.forEach(([x, y, a], i) => {
      svg.add(
        `<defs><radialGradient id="beam${i}" gradientUnits="userSpaceOnUse" cx="${x}" cy="${y}" r="${R}"><stop offset="0" stop-color="#7c8ccc" stop-opacity="0.75"/><stop offset="1" stop-color="#7c8ccc" stop-opacity="0.1"/></radialGradient></defs>`
      );
      svg.polygon([...arcPts([x, y], r0 - 20, a), ...arcPts([x, y], R, a).reverse()], {
        fill: `url(#beam${i})`,
      });
    });
    // The wavefronts and the constructive spots, which motion replaces.
    const drawnAt = svg.items.length;
    sources.forEach(([x, y, a]) => {
      for (let r = r0; r <= R; r += lam) {
        svg.polyline(arcPts([x, y], r, a), { color: '#4d5ea8', width: 1.8 });
        if (r + lam / 2 <= R)
          svg.polyline(arcPts([x, y], r + lam / 2, a), {
            color: '#6a3d9a',
            width: 1.8,
            dash: '7 5',
          });
      }
    });
    // Compression meets compression: intersections of the two families of solid arcs.
    const [[x1, y1], [x2]] = sources;
    const d = x2 - x1;
    const inside = ([x, y], [sx, sy, a]) => {
      const ang = (Math.atan2(y - sy, x - sx) * 180) / Math.PI;
      return Math.abs(ang - a) <= half && Math.hypot(x - sx, y - sy) <= R;
    };
    svg.add(
      '<defs><radialGradient id="glow"><stop offset="0" stop-color="#c2185b" stop-opacity="0.75"/><stop offset="1" stop-color="#c2185b" stop-opacity="0"/></radialGradient></defs>'
    );
    const spot = (x, y) => {
      svg.circle(x, y, 17, { fill: 'url(#glow)' });
      svg.circle(x, y, 4.5, { fill: '#9b0d3a' });
    };
    for (let ra = r0; ra <= R; ra += lam)
      for (let rb = r0; rb <= R; rb += lam) {
        const u = (ra * ra - rb * rb + d * d) / (2 * d);
        const h2 = ra * ra - u * u;
        if (h2 <= 0) continue;
        const P = [x1 + u, y1 + Math.sqrt(h2)];
        if (inside(P, sources[0]) && inside(P, sources[1]) && P[1] < 450) spot(...P);
      }
    const fronts = svg.items.splice(drawnAt).join('');
    svg.still(() => svg.add(fronts));
    // For readers who allow motion, each front moves out one wavelength per
    // period, and the places where compressions meet travel outward along
    // the fixed lines of constructive interference.
    const P = 1.4;
    const dur = `${P}s`;
    const arcD = ([x, y, a], r) => {
      const [p, q] = [at([x, y], r, a - half), at([x, y], r, a + half)];
      return `M ${fmt(p[0])} ${fmt(p[1])} A ${fmt(r)} ${fmt(r)} 0 0 1 ${fmt(q[0])} ${fmt(q[1])}`;
    };
    let moving = '<defs>';
    sources.forEach(([x, y, a], i) => {
      const beam = [...arcPts([x, y], r0 - 20, a), ...arcPts([x, y], R, a).reverse()];
      moving += `<clipPath id="beam_16_11_02_${i}"><polygon points="${beam.map(p => p.map(fmt).join(',')).join(' ')}"/></clipPath>`;
    });
    moving += '</defs>';
    sources.forEach((S, i) => {
      let arcs = '';
      for (let k = 0, r = r0 - lam; r <= R; k += 1, r += lam / 2) {
        const dash = k % 2 ? ' stroke-dasharray="7 5"' : '';
        const color = k % 2 ? '#6a3d9a' : '#4d5ea8';
        arcs += `<path d="${arcD(S, r)}" fill="none" stroke="${color}" stroke-width="1.8"${dash}><animate attributeName="d" dur="${dur}" repeatCount="indefinite" values="${arcD(S, r)};${arcD(S, r + lam)}"/></path>`;
      }
      moving += `<g clip-path="url(#beam_16_11_02_${i})">${arcs}</g>`;
    });
    const phases = cycle(lam, 12);
    const meets = [];
    for (let ra = r0 - lam; ra <= R; ra += lam)
      for (let rb = r0 - lam; rb <= R; rb += lam) {
        const path = phases.map(sh => {
          const [A, B] = [ra + sh, rb + sh];
          const u = (A * A - B * B + d * d) / (2 * d);
          const h2 = A * A - u * u;
          return h2 > 0 ? [x1 + u, y1 + Math.sqrt(h2)] : null;
        });
        if (path.every(Boolean)) meets.push(path);
      }
    // A spot shows only while it is inside both beams.
    const spots = morph(
      phases.map((_, f) =>
        svg.capture(() =>
          meets.forEach(path => {
            const P = path[f];
            const shown = inside(P, sources[0]) && inside(P, sources[1]) && P[1] < 450;
            svg.add(`<g opacity="${shown ? 1 : 0}">`);
            spot(...P);
            svg.add('</g>');
          })
        )
      ),
      { dur }
    );
    moving += spots;
    svg.motionGroup(moving);
    for (const [x, y, a] of sources)
      svg.add(
        `<g transform="translate(${x} ${y}) rotate(${a})"><rect x="-46" y="-28" width="44" height="56" rx="4" fill="#3b3b3d" stroke="#1e1e20" stroke-width="1.5"/><rect x="-6" y="-24" width="8" height="48" rx="2" fill="#8a8c90"/></g>`
      );
    const rare = at(sources[1], r0 + 1.5 * lam, 126 - half);
    const comp = at(sources[1], r0 + 2 * lam, 126 - half);
    note(svg, 600, rare[1] - 30, 'Rarefaction', { anchor: 'start', size: 20 });
    svg.squiggle(640, rare[1] - 18, rare[0] + 4, rare[1], { waves: 1.5, amp: 4 });
    note(svg, 600, comp[1] + 40, 'Compression', { anchor: 'start', size: 20 });
    svg.squiggle(640, comp[1] + 28, comp[0] + 4, comp[1], { waves: 1.5, amp: 4 });
    spot(545, 425);
    note(svg, 568, 425, '= Constructive', { anchor: 'start', size: 20 });
    return svg.render();
  },
};

/** 16.5 Fig. 1: the spring stages labeled with the energy stored at each. */
function energyStages() {
  const svg = new Svg({
    width: 1000,
    height: 600,
    title: 'Energy in simple harmonic motion',
    desc: 'Five stages of a block of mass m on a spring on a frictionless surface. (a) At x = X the block is at rest and all the energy is elastic potential energy, ½kX². (b) At x = 0 the spring force is zero and all the energy is kinetic energy, ½m(−v_max)². (c) At x = −X the block is at rest again and the energy is ½k(−X)². (d) At x = 0 moving the other way, the energy is ½mv_max². (e) Back at x = X, the energy is ½kX² once more. The total energy is the same at every stage.',
  });
  springStages(svg, { energy: true });
  return svg.render();
}

/**
 * A string fixed at both ends in its nth mode: the dashed envelope, the string
 * at its largest displacement, and (for readers who allow motion) the string
 * oscillating through a cycle.
 */
function standingString(svg, x0, L, yc, A, n) {
  const shape = s => {
    const pts = [];
    for (let k = 0; k <= 80; k += 1)
      pts.push([x0 + (L * k) / 80, yc - s * A * Math.sin((n * Math.PI * k) / 80)]);
    return pts;
  };
  svg.polyline(shape(-1), { color: STRING, width: 4, dash: '7 6' });
  const draw = s => svg.polyline(shape(s), { color: STRING, width: 5 });
  const frames = [];
  for (let k = 0; k < 24; k += 1) frames.push(Math.cos((2 * Math.PI * k) / 24));
  svg.animated(draw, frames, { still: 0, dur: '1.6s' });
}
