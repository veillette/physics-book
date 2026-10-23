/**
 * Chapter 21: circuit diagrams for series and parallel resistors, emf and
 * internal resistance, Kirchhoff's rules, meters, null measurements, and RC
 * circuits, with the RC charging and discharging curves computed from
 * V = emf(1 − e^{−t/RC}) and V = V_0 e^{−t/RC}.
 *
 * Each circuit is drawn as plain wire first. Elements are then placed on the
 * wire with `on`, which blanks the wire under the symbol so a resistor's
 * zigzag or the gap between cell plates is not crossed by the line beneath.
 * A cell's long (positive) plate faces the second point passed to it.
 */
import {
  CURRENT,
  WIRE,
  acSource,
  bulb,
  capacitor,
  cell,
  currentArrow,
  dot,
  loopArrow,
  meter,
  resistor,
  rheostat,
  switchSymbol,
  wire,
} from './circuit.js';
import { COLORS, Plot, Svg, rad } from './svg.js';

const NODE = COLORS.maroon;
const SHADE = '#dcecf7';

/** Span of the symbol each element draws, so `on` can blank the wire under it. */
const SPAN = {
  R: o => o.size ?? 56,
  rheo: o => o.size ?? 50,
  cell: o => (o.gap ?? 12) + 8,
  C: () => 18,
  meter: o => 2 * (o.r ?? 18),
  ac: () => 36,
  sw: o => o.size ?? 46,
  bulb: o => 2 * (o.r ?? 20),
};

/** Place an element on an existing wire from P to Q. */
function on(svg, kind, P, Q, o = {}) {
  const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const span = SPAN[kind](o);
  const ux = (Q[0] - P[0]) / len;
  const uy = (Q[1] - P[1]) / len;
  const a = (len - span) / 2;
  svg.line(P[0] + ux * a, P[1] + uy * a, Q[0] - ux * a, Q[1] - uy * a, {
    color: '#ffffff',
    width: 7,
  });
  if (kind === 'R') resistor(svg, P, Q, { size: 56, amp: 11, ...o });
  else if (kind === 'rheo') rheostat(svg, P, Q, { amp: 11, ...o });
  else if (kind === 'cell') cell(svg, P, Q, { gap: 13, long: 64, short: 32, ...o });
  else if (kind === 'C') capacitor(svg, P, Q, o);
  else if (kind === 'meter') meter(svg, P, Q, o.letter, o);
  else if (kind === 'ac') acSource(svg, P, Q, o);
  else if (kind === 'sw') switchSymbol(svg, P, Q, o);
  else if (kind === 'bulb') bulb(svg, P, Q, o);
}

/** Closed rectangle of wire. */
function box(svg, L, T, R, B) {
  wire(svg, [
    [L, T],
    [R, T],
    [R, B],
    [L, B],
    [L, T],
  ]);
}

/** Symbol label (R_1, emf, I): serif, italic variables. */
function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, ...o });
}

/** Value label (6.0 Ω, 12 V). */
function val(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 19, ...o });
}

/** Plain annotation. */
function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 15, math: false, ...o });
}

/** Lettered point on a circuit. */
function point(svg, x, y, letter, { dx = 0, dy = -16, anchor = 'middle' } = {}) {
  dot(svg, x, y, { r: 4.5, color: NODE });
  if (letter) svg.text(x + dx, y + dy, `\\rm{${letter}}`, { size: 18, anchor });
}

/** Junction dot. */
function node(svg, x, y) {
  dot(svg, x, y, { r: 4.5, color: NODE });
}

function plus(svg, x, y, sign = '+') {
  svg.text(x, y, sign === '+' ? '+' : '−', { size: 18, math: false });
}

/** Panel caption centered below a panel. */
function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 16, math: false });
}

/** Vertical curly brace at x from y1 to y2, opening to the left. */
function vbrace(svg, x, y1, y2, { depth = 12 } = {}) {
  const m = (y1 + y2) / 2;
  const d = depth;
  svg.path(
    `M ${x} ${y1} Q ${x + d} ${y1} ${x + d} ${y1 + d} L ${x + d} ${m - d} Q ${x + d} ${m} ${x + 2 * d} ${m} Q ${x + d} ${m} ${x + d} ${m + d} L ${x + d} ${y2 - d} Q ${x + d} ${y2} ${x} ${y2}`,
    { color: COLORS.axis, width: 1.6 }
  );
}

/** Horizontal brace under a run from x1 to x2 at y, opening upward. */
function hbrace(svg, x1, x2, y, { depth = 10 } = {}) {
  const m = (x1 + x2) / 2;
  const d = depth;
  svg.path(
    `M ${x1} ${y} Q ${x1} ${y + d} ${x1 + d} ${y + d} L ${m - d} ${y + d} Q ${m} ${y + d} ${m} ${y + 2 * d} Q ${m} ${y + d} ${m + d} ${y + d} L ${x2 - d} ${y + d} Q ${x2} ${y + d} ${x2} ${y}`,
    { color: COLORS.axis, width: 1.6 }
  );
}

/** Rounded current path through `points` (corners rounded with radius rr). */
function roundFlow(svg, points, { rr = 14, color = CURRENT, width = 3, head = true } = {}) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let k = 1; k < points.length - 1; k += 1) {
    const [px, py] = points[k - 1];
    const [cx, cy] = points[k];
    const [nx, ny] = points[k + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const a = [cx - ((cx - px) / l1) * rr, cy - ((cy - py) / l1) * rr];
    const b = [cx + ((nx - cx) / l2) * rr, cy + ((ny - cy) / l2) * rr];
    d += ` L ${a[0]} ${a[1]} Q ${cx} ${cy} ${b[0]} ${b[1]}`;
  }
  const [ex, ey] = points[points.length - 1];
  const [qx, qy] = points[points.length - 2];
  const l = Math.hypot(ex - qx, ey - qy);
  const ux = (ex - qx) / l;
  const uy = (ey - qy) / l;
  if (!head) {
    svg.path(`${d} L ${ex} ${ey}`, { color, width });
    return;
  }
  d += ` L ${ex - ux * 10} ${ey - uy * 10}`;
  svg.path(d, { color, width });
  svg.arrow(ex - ux * 14, ey - uy * 14, ex, ey, { color, width, head: 13 });
}

/** A source of emf with internal resistance r below it, on the left edge x from yTop to yBot. */
function sourceLeft(svg, x, yTop, yBot, { emf = 'emf', r = 'r', plusSign = true, rLabel } = {}) {
  const h = yBot - yTop;
  const cy = yTop + h * 0.32;
  on(svg, 'cell', [x, cy + 25], [x, cy - 25]);
  lab(svg, x - 26, cy + 4, emf, { anchor: 'end' });
  if (plusSign) plus(svg, x - 26, cy - 18);
  if (r) {
    const ry = yTop + h * 0.72;
    on(svg, 'R', [x, ry - 35], [x, ry + 35]);
    lab(svg, x - 18, ry, rLabel || r, { anchor: 'end' });
  }
}

/**
 * A dry cell standing upright, seen slightly from above: gray body, gold band
 * with a chevron edge, and the positive nub at (cx, top).
 */
function dryCell(svg, cx, top, h, r) {
  if (!svg.cellDefs) {
    svg.cellDefs = true;
    const grad = (id, stops) =>
      `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${stops
        .map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`)
        .join('')}</linearGradient>`;
    svg.add(
      `<defs>${grad('cell_body', [
        [0, '#8c8f96'],
        [0.35, '#eceef2'],
        [0.7, '#b3b6bd'],
        [1, '#7a7d84'],
      ])}${grad('cell_gold', [
        [0, '#b8892a'],
        [0.35, '#f6d684'],
        [0.7, '#dcae45'],
        [1, '#a8791c'],
      ])}</defs>`
    );
  }
  const e = r * 0.28;
  const edge = '#6f7178';
  svg.path(
    `M ${cx - r} ${top} L ${cx - r} ${top + h} A ${r} ${e} 0 0 0 ${cx + r} ${top + h} L ${cx + r} ${top} Z`,
    { color: edge, width: 1.2, fill: 'url(#cell_body)' }
  );
  const band = h * 0.38;
  svg.path(
    `M ${cx - r} ${top} L ${cx - r} ${top + band} L ${cx} ${top + band + r * 0.32} L ${cx + r} ${top + band} L ${cx + r} ${top} Z`,
    { color: '#9a7420', width: 1, fill: 'url(#cell_gold)' }
  );
  svg.ellipse(cx, top, r, e, { fill: '#c9ccd2', stroke: edge, width: 1.2 });
  svg.ellipse(cx, top, r * 0.82, e * 0.82, { fill: '#dfe1e5', stroke: '#a6a9b0', width: 1 });
  svg.ellipse(cx, top, r * 0.14, e * 0.4, { fill: '#7f93a8', stroke: '#56687c', width: 1 });
}

// ---------------------------------------------------------------------------
// RC curves.

const rcGraph = (svg, box_, { rising }) => {
  const g = new Plot(svg, {
    ...box_,
    xRange: [0, 4.6],
    yRange: [0, 1.12],
  });
  g.axes({ arrows: true });
  const f = rising ? t => 1 - Math.exp(-t) : t => Math.exp(-t);
  for (const k of [1, 2, 3, 4]) {
    const [px, py] = g.P(k, f(k));
    svg.line(px, py, px, g.Y(0), { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.line(g.X(0), py, px, py, { color: COLORS.guide, width: 1.2, dash: '5 4' });
  }
  if (rising)
    svg.line(g.X(0), g.Y(1), g.X(4.6), g.Y(1), { color: COLORS.guide, width: 1.2, dash: '5 4' });
  g.fn(f, 0, 4.4, { color: COLORS.maroon, width: 3 });
  for (const k of [1, 2, 3, 4]) svg.circle(...g.P(k, f(k)), 4.5, { fill: COLORS.black });
  const ticks = ['τ = RC', '2τ', '3τ', '4τ'];
  ticks.forEach((t, i) => val(svg, g.X(i + 1), g.Y(0) + 22, t));
  val(svg, g.X(0), g.Y(0) + 22, '0');
  val(svg, g.X(4.6) + 14, g.Y(0) + 4, 't', { size: 20 });
  val(svg, g.X(0) - 8, g.Y(0), '0', { anchor: 'end' });
  return g;
};

/** The two-loop circuit of the 21.3 worked example (also a problem figure). */
function kirchhoffExample() {
  const svg = new Svg({
    width: 600,
    height: 600,
    title: 'Two-loop circuit for the Kirchhoff’s rules example',
    desc: 'Junctions a on the left and e on the right. Top branch from a: up through R2 = 2.5 ohms, then along the top through b, emf1 = 18 V with its positive terminal toward c, c, r1 = 0.5 ohm and d, then down to e. Middle branch: R1 = 6.0 ohms between a and e. Bottom branch from a: down, then along the bottom through h, emf2 = 45 V with its positive terminal toward g, g, r2 = 0.5 ohm and f, then up through R3 = 1.5 ohms to e. Assumed currents: I2 around the top branch from a toward e, I1 through R1 from e toward a, and I3 around the bottom branch from a toward e.',
  });
  const L = 120;
  const R = 480;
  const T = 110;
  const M = 310;
  const B = 500;
  box(svg, L, T, R, B);
  wire(svg, [
    [L, M],
    [R, M],
  ]);
  point(svg, L, M, 'a', { dx: -16, dy: 0, anchor: 'end' });
  point(svg, R, M, 'e', { dx: 16, dy: 0, anchor: 'start' });
  on(svg, 'R', [L, 160], [L, 260]);
  lab(svg, L - 20, 196, 'R_2', { anchor: 'end' });
  val(svg, L - 20, 224, '2.5 Ω', { anchor: 'end' });
  point(svg, 190, T, 'b', { dy: -20 });
  on(svg, 'cell', [215, T], [255, T]);
  lab(svg, 240, T - 66, 'emf_1 = 18 \\rm{V}');
  plus(svg, 264, T - 30);
  point(svg, 280, T, 'c', { dy: -20 });
  on(svg, 'R', [310, T], [390, T]);
  lab(svg, 350, T - 28, 'r_1');
  val(svg, 350, T + 30, '0.5 Ω');
  point(svg, 420, T, 'd', { dy: -20 });
  on(svg, 'R', [250, M], [350, M]);
  lab(svg, 300, M - 30, 'R_1');
  val(svg, 300, M + 32, '6.0 Ω');
  on(svg, 'R', [R, 360], [R, 450]);
  lab(svg, R + 20, 392, 'R_3', { anchor: 'start' });
  val(svg, R + 20, 420, '1.5 Ω', { anchor: 'start' });
  point(svg, 190, B, 'h', { dy: -20 });
  on(svg, 'cell', [215, B], [255, B]);
  lab(svg, 240, B + 66, 'emf_2 = 45 \\rm{V}');
  plus(svg, 264, B - 30);
  point(svg, 280, B, 'g', { dy: -20 });
  on(svg, 'R', [310, B], [390, B]);
  val(svg, 350, B + 30, '0.5 Ω');
  lab(svg, 350, B - 28, 'r_2');
  point(svg, 420, B, 'f', { dy: -20 });
  // Assumed currents.
  roundFlow(svg, [
    [L + 30, M - 20],
    [L + 30, T + 30],
    [178, T + 30],
  ]);
  lab(svg, L + 44, T + 56, 'I_2', { anchor: 'start' });
  roundFlow(svg, [
    [432, T + 30],
    [R - 30, T + 30],
    [R - 30, 230],
  ]);
  lab(svg, R - 44, T + 60, 'I_2', { anchor: 'end' });
  currentArrow(svg, 235, M - 26, 160, M - 26);
  lab(svg, 198, M - 52, 'I_1');
  currentArrow(svg, L + 30, M + 18, L + 30, M + 90);
  lab(svg, L + 44, M + 50, 'I_3', { anchor: 'start' });
  currentArrow(svg, 175, B - 52, 260, B - 52);
  lab(svg, 218, B - 76, 'I_3');
  roundFlow(svg, [
    [432, B - 30],
    [R - 30, B - 30],
    [R - 30, 380],
  ]);
  lab(svg, R - 44, B - 56, 'I_3', { anchor: 'end' });
  return svg.render();
}

/** RC circuit for 21.6 Figs. 1 and 2: R on top, the source (when charging) on the left, C on the right, a closed switch below. */
function rcCircuit(svg, { charging }) {
  const L = 80;
  const R = 300;
  const T = 70;
  const B = 270;
  box(svg, L, T, R, B);
  if (charging) {
    on(svg, 'cell', [L, 195], [L, 145]);
    plus(svg, L - 22, 130);
    plus(svg, L - 22, 210, '−');
    lab(svg, L - 30, 170, 'emf', { anchor: 'end', size: 18 });
  }
  on(svg, 'R', [150, T], [230, T]);
  lab(svg, 190, T - 28, 'R');
  on(svg, 'C', [R, 195], [R, 145]);
  lab(svg, R - 24, 170, 'C', { anchor: 'end' });
  val(svg, R + 20, 140, '+q', { anchor: 'start' });
  val(svg, R + 20, 200, '−q', { anchor: 'start' });
  lab(svg, R + 54, 170, 'V', { anchor: 'start' });
  on(svg, 'sw', [150, B], [230, B], { closed: true, size: 56 });
  note(svg, 190, B + 28, 'Switch');
  if (charging) {
    loopArrow(svg, 190, 175, 78, 150, 30);
    loopArrow(svg, 190, 165, 78, -30, -150);
    lab(svg, 190, 125, 'I');
    lab(svg, 190, 215, 'I');
  } else {
    loopArrow(svg, 190, 190, 78, 30, 150);
    lab(svg, 190, 140, 'I');
  }
  caption(svg, 190, 346, '(a)');
}

export default {
  // 21.1 Fig. 1 — series and parallel connections
  Figure_21_01_01: () => {
    const svg = new Svg({
      width: 720,
      height: 380,
      title: 'Resistors in series and in parallel',
      desc: '(a) Four resistors, R1 through R4, connected end to end along a single path. (b) The same four resistors connected side by side between two common wires, so each has its own path.',
    });
    const y = 60;
    wire(svg, [
      [40, y],
      [680, y],
    ]);
    [1, 2, 3, 4].forEach((k, i) => {
      const cx = 120 + i * 160;
      on(svg, 'R', [cx - 50, y], [cx + 50, y], { size: 60 });
      lab(svg, cx, y + 34, `R_${k}`);
    });
    caption(svg, 360, 125, '(a)');
    const T = 200;
    const B = 320;
    const xs = [160, 293, 426, 560];
    wire(svg, [
      [360, 170],
      [360, T],
    ]);
    wire(svg, [
      [xs[0], T],
      [xs[3], T],
    ]);
    wire(svg, [
      [xs[0], B],
      [xs[3], B],
    ]);
    wire(svg, [
      [360, B],
      [360, B + 30],
    ]);
    xs.forEach((x, i) => {
      wire(svg, [
        [x, T],
        [x, B],
      ]);
      on(svg, 'R', [x, T + 20], [x, B - 20], { size: 60 });
      lab(svg, x + 18, (T + B) / 2, `R_${i + 1}`, { anchor: 'start' });
    });
    caption(svg, 360, 368, '(b)');
    return svg.render();
  },

  // 21.1 Fig. 2 — three resistors in series and their equivalent
  Figure_21_01_02: () => {
    const svg = new Svg({
      width: 720,
      height: 310,
      title: 'Three resistors in series and the equivalent series resistance',
      desc: 'Left: a voltage source V drives a current I clockwise through R1 on the top, R2 on the right, and R3 on the bottom. Right, after an equals sign: the same source drives the same current I through a single resistance Rs.',
    });
    const draw = (L, R, series) => {
      const T = 50;
      const B = 250;
      box(svg, L, T, R, B);
      on(svg, 'cell', [L, 175], [L, 125]);
      plus(svg, L - 22, 112);
      lab(svg, L - 28, 150, 'V', { anchor: 'end' });
      const mx = (L + R) / 2;
      if (series) {
        on(svg, 'R', [mx - 50, T], [mx + 50, T]);
        lab(svg, mx, T - 26, 'R_1');
        on(svg, 'R', [R, 100], [R, 200]);
        lab(svg, R + 18, 150, 'R_2', { anchor: 'start' });
        on(svg, 'R', [mx - 50, B], [mx + 50, B]);
        lab(svg, mx, B + 28, 'R_3');
      } else {
        on(svg, 'R', [R, 100], [R, 200]);
        lab(svg, R + 18, 150, 'R_s', { anchor: 'start' });
      }
      loopArrow(svg, mx, 160, 62, 160, 20);
      lab(svg, mx, 130, 'I');
    };
    draw(60, 290, true);
    svg.text(370, 150, '=', { size: 36, math: false });
    draw(470, 650, false);
    return svg.render();
  },

  // 21.1 Fig. 4 — reducing a combination circuit step by step
  Figure_21_01_04: () => {
    const svg = new Svg({
      width: 780,
      height: 600,
      title: 'Reducing a combination of series and parallel resistors',
      desc: 'Five circuits connected by arrows. First: a source feeds R1, then R7 to the bottom wire, then R2, R3 and R4 in parallel (circled as Rp), then R5 and R6 in parallel (circled as Rp′). Second: Rp and Rp′ replace those groups and are circled together as their series sum Rs. Third: R7 and Rs are circled as their parallel combination Rp″. Fourth: R1 and Rp″ are circled as their series sum Rs′. Fifth: the source drives the single equivalent resistance Rs′.',
    });
    const S = 40;
    const ring = (cx, cy, rx, ry, rot, label, lx, ly) => {
      svg.add(
        `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${cx} ${cy})" fill="none" stroke="#555555" stroke-width="1.6" stroke-dasharray="6 4"/>`
      );
      lab(svg, lx, ly, label, { size: 19, anchor: 'start' });
    };
    const src = (x, T, B) => on(svg, 'cell', [x, (T + B) / 2 + 22], [x, (T + B) / 2 - 22]);
    const step = (x1, y1, x2, y2, bend) => {
      const mx = (x1 + x2) / 2 + bend[0];
      const my = (y1 + y2) / 2 + bend[1];
      svg.path(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`, { color: '#777777', width: 3 });
      const ang = Math.atan2(y2 - my, x2 - mx);
      svg.arrow(
        x2 - Math.cos(ang) * 12,
        y2 - Math.sin(ang) * 12,
        x2 + Math.cos(ang) * 4,
        y2 + Math.sin(ang) * 4,
        {
          color: '#777777',
          width: 3,
          head: 14,
        }
      );
    };

    // First circuit.
    {
      const L = 30;
      const T = 110;
      const B = 270;
      const n1 = 150;
      wire(svg, [
        [n1, T],
        [L, T],
        [L, B],
        [355, B],
        [355, 250],
      ]);
      src(L, T, B);
      on(svg, 'R', [L + 20, T], [n1 - 10, T], { size: S });
      lab(svg, (L + n1) / 2 + 5, T + 26, 'R_1', { size: 18 });
      wire(svg, [
        [n1, T],
        [n1, B],
      ]);
      on(svg, 'R', [n1, T + 40], [n1, B - 40], { size: S });
      lab(svg, n1 + 16, (T + B) / 2, 'R_7', { size: 18, anchor: 'start' });
      // R2, R3, R4 in parallel.
      wire(svg, [
        [n1, T],
        [195, T],
      ]);
      wire(svg, [
        [195, 70],
        [195, 150],
      ]);
      wire(svg, [
        [295, 70],
        [295, 150],
      ]);
      [70, 110, 150].forEach((yy, i) => {
        wire(svg, [
          [195, yy],
          [295, yy],
        ]);
        on(svg, 'R', [215, yy], [275, yy], { size: S });
        lab(svg, 268, yy - 16, `R_${i + 2}`, { size: 17, anchor: 'start' });
      });
      ring(245, 110, 78, 66, 0, 'R_p', 318, 52);
      // R5 and R6 in parallel.
      wire(svg, [
        [295, T],
        [355, T],
        [355, 160],
      ]);
      wire(svg, [
        [320, 160],
        [390, 160],
        [390, 250],
        [320, 250],
        [320, 160],
      ]);
      on(svg, 'R', [320, 175], [320, 235], { size: S });
      on(svg, 'R', [390, 175], [390, 235], { size: S });
      lab(svg, 307, 205, 'R_5', { size: 17, anchor: 'end' });
      lab(svg, 404, 205, 'R_6', { size: 17, anchor: 'start' });
      ring(355, 205, 72, 66, 0, 'R′_p', 414, 140);
    }
    step(425, 70, 470, 88, [0, -26]);

    // Second circuit: Rp in series with Rp′, together Rs.
    {
      const L = 480;
      const T = 90;
      const R = 720;
      const B = 230;
      const n1 = 590;
      box(svg, L, T, R, B);
      src(L, T, B);
      on(svg, 'R', [L + 15, T], [n1 - 15, T], { size: S });
      lab(svg, (L + n1) / 2, T - 28, 'R_1', { size: 18 });
      wire(svg, [
        [n1, T],
        [n1, B],
      ]);
      on(svg, 'R', [n1, T + 40], [n1, B - 40], { size: S });
      lab(svg, n1 + 16, (T + B) / 2, 'R_7', { size: 18, anchor: 'start' });
      on(svg, 'R', [640, T], [700, T], { size: S });
      lab(svg, 670, T - 30, 'R_p', { size: 18 });
      on(svg, 'R', [R, 130], [R, 190], { size: S });
      lab(svg, R - 22, 196, 'R′_p', { size: 18, anchor: 'end' });
      ring(694, 138, 72, 28, 50, 'R_s', 744, 84);
    }
    step(752, 228, 742, 288, [22, 0]);

    // Third circuit: R7 in parallel with Rs, together Rp″.
    {
      const L = 480;
      const T = 300;
      const R = 720;
      const B = 430;
      const n1 = 590;
      box(svg, L, T, R, B);
      src(L, T, B);
      on(svg, 'R', [L + 15, T], [n1 - 15, T], { size: S });
      lab(svg, (L + n1) / 2, T - 28, 'R_1', { size: 18 });
      wire(svg, [
        [n1, T],
        [n1, B],
      ]);
      on(svg, 'R', [n1, T + 35], [n1, B - 35], { size: S });
      lab(svg, n1 + 16, (T + B) / 2, 'R_7', { size: 18, anchor: 'start' });
      on(svg, 'R', [R, T + 35], [R, B - 35], { size: S });
      lab(svg, R - 14, (T + B) / 2, 'R_s', { size: 18, anchor: 'end' });
      ring(655, 368, 108, 46, 0, 'R″_p', 736, 368);
    }
    step(610, 440, 575, 476, [14, 10]);

    // Fourth circuit: R1 in series with Rp″, together Rs′.
    {
      const L = 410;
      const T = 470;
      const R = 560;
      const B = 580;
      box(svg, L, T, R, B);
      src(L, T, B);
      on(svg, 'R', [L + 40, T], [R - 40, T], { size: S });
      lab(svg, (L + R) / 2 - 30, T + 24, 'R_1', { size: 18 });
      on(svg, 'R', [R, T + 25], [R, B - 25], { size: S });
      lab(svg, R - 14, (T + B) / 2 + 2, 'R″_p', { size: 18, anchor: 'end' });
      ring(525, 500, 70, 34, 42, 'R′_s', 584, 520);
    }
    step(592, 560, 636, 556, [0, 24]);

    // Fifth circuit: the single equivalent resistance.
    {
      const L = 650;
      const T = 470;
      const R = 750;
      const B = 580;
      box(svg, L, T, R, B);
      src(L, T, B);
      on(svg, 'R', [R, T + 25], [R, B - 25], { size: S });
      lab(svg, R - 14, (T + B) / 2, 'R′_s', { size: 18, anchor: 'end' });
    }
    return svg.render();
  },

  // 21.1 Fig. 5 — R1 in series with R2 ∥ R3
  Figure_21_01_05: () => {
    const svg = new Svg({
      width: 720,
      height: 340,
      title: 'R2 and R3 in parallel, in series with R1',
      desc: 'A 12.0 V source on the left drives current I through R1 = 1.00 ohm on the top wire. The current then splits into I2 through R2 = 6.00 ohms and I3 through R3 = 13.0 ohms, which are in parallel on the right. The voltage V1 across R1 and the voltage Vp = V − V1 across the parallel pair are unknown.',
    });
    const L = 110;
    const T = 90;
    const R = 470;
    const B = 300;
    const xm = 310;
    box(svg, L, T, R, B);
    wire(svg, [
      [xm, T],
      [xm, B],
    ]);
    node(svg, xm, T);
    node(svg, xm, B);
    on(svg, 'cell', [L, 220], [L, 170]);
    plus(svg, L - 22, 160);
    val(svg, L - 26, 195, '12.0 \\rm{V}', { anchor: 'end' });
    on(svg, 'R', [170, T], [260, T]);
    lab(svg, 215, T + 30, 'R_1');
    val(svg, 215, T - 26, '1.00 Ω');
    val(svg, 215, T - 54, 'V_1 = ?');
    on(svg, 'R', [xm, 150], [xm, 240]);
    lab(svg, xm - 18, 180, 'R_2', { anchor: 'end' });
    val(svg, xm - 18, 206, '6.00 Ω', { anchor: 'end' });
    on(svg, 'R', [R, 150], [R, 240]);
    lab(svg, R + 18, 180, 'R_3', { anchor: 'start' });
    val(svg, R + 18, 206, '13.0 Ω', { anchor: 'start' });
    currentArrow(svg, L + 22, 280, L + 22, 236);
    lab(svg, L + 32, 262, 'I = ?', { anchor: 'start', size: 18 });
    currentArrow(svg, xm + 20, 160, xm + 20, 214);
    lab(svg, xm + 30, 186, 'I_2 = ?', { anchor: 'start', size: 18 });
    currentArrow(svg, R - 20, 160, R - 20, 214);
    lab(svg, R - 30, 186, 'I_3', { anchor: 'end', size: 18 });
    vbrace(svg, R + 82, T, B);
    val(svg, R + 112, (T + B) / 2, 'V_p = V − V_1 = ?', { anchor: 'start' });
    return svg.render();
  },

  // 21.1 Fig. 7 — a switch in series with R
  Figure_21_01_07: () => {
    const svg = new Svg({
      width: 420,
      height: 330,
      title: 'A switch in series with a resistance and a voltage source',
      desc: 'A source of emf with internal resistance r on the left, a resistance R on the top wire, and an open switch on the right wire, all in one loop.',
    });
    const L = 110;
    const T = 60;
    const R = 330;
    const B = 300;
    box(svg, L, T, R, B);
    sourceLeft(svg, L, T, B, { plusSign: false });
    on(svg, 'R', [180, T], [260, T], { size: 60 });
    lab(svg, 220, T - 28, 'R', { size: 24 });
    on(svg, 'sw', [R, 130], [R, 230], { size: 60 });
    return svg.render();
  },

  // 21.1 Fig. 8 — a switch wired in parallel with R by mistake
  Figure_21_01_08: () => {
    const svg = new Svg({
      width: 440,
      height: 330,
      title: 'A switch wired in parallel with a resistance',
      desc: 'A source of emf with internal resistance r on the left. The resistance R and an open switch are connected side by side across the source, so closing the switch would short out R.',
    });
    const L = 110;
    const T = 50;
    const R = 360;
    const B = 300;
    const xm = 235;
    box(svg, L, T, R, B);
    wire(svg, [
      [xm, T],
      [xm, B],
    ]);
    node(svg, xm, T);
    node(svg, xm, B);
    sourceLeft(svg, L, T, B, { plusSign: false });
    on(svg, 'R', [xm, 130], [xm, 220], { size: 70 });
    lab(svg, xm + 20, 175, 'R', { size: 24, anchor: 'start' });
    on(svg, 'sw', [R, 120], [R, 230], { size: 70 });
    return svg.render();
  },

  // 21.1 problem — insulators on a transmission tower
  Figure_21_01_09: () => {
    const svg = new Svg({
      width: 520,
      height: 550,
      title: 'Insulators holding a transmission line on a grounded tower',
      desc: 'A grounded steel lattice tower with a ground conductor at its peak. A string of ceramic insulators hangs from the end of its cross arm and holds a 240-kV, 500-A transmission line. Each insulator provides a resistance of 1.00 × 10^9 Ω.',
    });
    const STEEL = '#4a4f57';
    svg.add(
      '<defs><linearGradient id="sky21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eaf4fb"/><stop offset="1" stop-color="#a9d3ee"/></linearGradient></defs>'
    );
    svg.rect(320, 0, 200, 525, { fill: 'url(#sky21)' });
    svg.rect(320, 525, 200, 18, { fill: '#8a6a45' });
    svg.rect(360, 470, 70, 55, { fill: '#9a9da3', stroke: '#5f636a', width: 1.5 });
    svg.rect(370, 480, 50, 45, { fill: '#6b6f76' });
    // Legs taper from the footing to the cross arm, braced by a zigzag.
    const leg = (side, y) => 395 + side * (12 + ((y - 120) / 350) * 22);
    for (const side of [-1, 1])
      svg.line(leg(side, 470), 470, leg(side, 120), 120, { color: STEEL, width: 3 });
    const zig = [];
    for (let k = 0; k <= 12; k += 1) {
      const y = 470 - (k * 350) / 12;
      zig.push([leg(k % 2 ? 1 : -1, y), y]);
    }
    svg.polyline(zig, { color: STEEL, width: 1.8 });
    for (let k = 1; k < 12; k += 2)
      svg.line(leg(-1, zig[k][1]), zig[k][1], leg(1, zig[k][1]), zig[k][1], {
        color: STEEL,
        width: 1.2,
      });
    // Peak carrying the ground conductor
    svg.polyline(
      [
        [leg(-1, 120), 120],
        [395, 42],
        [leg(1, 120), 120],
      ],
      { color: STEEL, width: 3 }
    );
    svg.polyline(
      [
        [leg(-1, 120), 120],
        [401, 90],
        [389, 66],
      ],
      { color: STEEL, width: 1.6 }
    );
    svg.circle(395, 36, 6, { fill: COLORS.black });
    // Cross arm: two chords joined by a zigzag
    const top = x => 98 + ((x - 330) / 152) * 2;
    const bot = x => 124 - ((x - 330) / 152) * 22;
    svg.line(330, top(330), 482, top(482), { color: STEEL, width: 3 });
    svg.line(330, bot(330), 482, bot(482), { color: STEEL, width: 3 });
    const arm = [];
    for (let k = 0; k <= 10; k += 1) {
      const x = 330 + (k * 152) / 10;
      arm.push([x, k % 2 ? top(x) : bot(x)]);
    }
    svg.polyline(arm, { color: STEEL, width: 1.6 });
    // Insulator string and the line conductors
    svg.line(482, 102, 482, 166, { color: '#6b3d1f', width: 2 });
    for (let y = 108; y <= 162; y += 6)
      svg.ellipse(482, y, 8, 2.6, { fill: '#8b5a2b', stroke: '#5a3416', width: 1 });
    for (const x of [476, 490]) svg.circle(x, 174, 5, { fill: COLORS.black });
    // Labels
    note(svg, 290, 36, 'Ground conductor', { anchor: 'end', size: 19 });
    svg.arrow(298, 36, 386, 36, { color: COLORS.black, width: 1.5, head: 11 });
    note(svg, 290, 160, 'Insulators each provide', { anchor: 'end', size: 19 });
    note(svg, 290, 188, '1.00 × 10^9 Ω Resistance', { anchor: 'end', size: 19 });
    svg.arrow(298, 160, 472, 140, { color: COLORS.black, width: 1.5, head: 11 });
    note(svg, 290, 298, '240 kV, 500 A', { anchor: 'end', size: 19 });
    note(svg, 290, 324, 'Transmission line', { anchor: 'end', size: 19 });
    svg.line(298, 298, 488, 298, { color: COLORS.black, width: 1.5 });
    for (const x of [476, 490])
      svg.arrow(488, 298, x, 182, { color: COLORS.black, width: 1.5, head: 11 });
    return svg.render();
  },

  // 21.2 Fig. 2 — a dry cell's emf and internal resistance
  Figure_21_02_02: () => {
    const svg = new Svg({
      width: 620,
      height: 640,
      title: 'A dry cell modeled as an emf and an internal resistance',
      desc: 'A carbon-zinc dry cell is drawn beside its schematic: a source of emf (long plate positive, at the top) in series with an internal resistance r, between the two output terminals. The terminal voltage V measured across the terminals is V = emf − Ir, where I is the current through the cell, shown flowing up.',
    });
    const x = 330;
    const [tTop, tBot] = [90, 470];
    svg.line(120, 150, x, tTop, { color: WIRE, width: 1.6 });
    svg.line(120, 400, x, tBot, { color: WIRE, width: 1.6 });
    dryCell(svg, 120, 150, 250, 95);
    wire(svg, [
      [x, 0],
      [x, 640],
    ]);
    on(svg, 'cell', [x, 225], [x, 175]);
    plus(svg, x + 38, 162);
    plus(svg, x + 38, 230, '−');
    lab(svg, x + 50, 200, 'emf', { anchor: 'start' });
    on(svg, 'R', [x, 285], [x, 375]);
    lab(svg, x + 22, 330, 'r', { anchor: 'start' });
    node(svg, x, tTop);
    node(svg, x, tBot);
    svg.arrow(510, tTop + 10, 510, tBot - 10, {
      color: COLORS.black,
      width: 1.8,
      head: 14,
      start: true,
    });
    lab(svg, 510, (tTop + tBot) / 2, 'V = emf − Ir', { size: 24 });
    currentArrow(svg, x + 18, 620, x + 18, 550);
    lab(svg, x + 36, 590, 'I', { anchor: 'start' });
    return svg.render();
  },

  // 21.2 Fig. 8 — two cells in series
  Figure_21_02_08: () => {
    const svg = new Svg({
      width: 560,
      height: 640,
      title: 'Two voltage sources in series',
      desc: 'Two dry cells are stacked, the positive terminal of the lower one touching the negative end of the upper one. Beside them, the schematic shows the same series connection: emf1 with internal resistance r1, then emf2 with internal resistance r2. The emfs add and so do the internal resistances.',
    });
    const x = 400;
    const [tTop, tBot] = [50, 600];
    svg.line(110, 170, x, tTop, { color: WIRE, width: 1.6 });
    svg.line(110, 450, x, tBot, { color: WIRE, width: 1.6 });
    dryCell(svg, 110, 310, 140, 55);
    dryCell(svg, 110, 170, 140, 55);
    wire(svg, [
      [x, tTop],
      [x, tBot],
    ]);
    on(svg, 'cell', [x, 130], [x, 80]);
    lab(svg, x + 40, 104, 'emf_1', { anchor: 'start' });
    on(svg, 'R', [x, 180], [x, 270]);
    lab(svg, x + 22, 225, 'r_1', { anchor: 'start' });
    on(svg, 'cell', [x, 360], [x, 310]);
    lab(svg, x + 40, 334, 'emf_2', { anchor: 'start' });
    on(svg, 'R', [x, 420], [x, 510]);
    lab(svg, x + 22, 465, 'r_2', { anchor: 'start' });
    for (const y of [tTop, 155, 290, 385, tBot]) node(svg, x, y);
    return svg.render();
  },

  // 21.2 Fig. 11 — a two-cell flashlight and its schematic
  Figure_21_02_11: () => {
    const svg = new Svg({
      width: 900,
      height: 440,
      title: 'A flashlight with two cells in series',
      desc: 'Left: two dry cells stacked in series light a bulb connected across them. Right: the schematic, with emf1 and internal resistance r1 in series with emf2 and internal resistance r2, driving current I through the load resistance R_load. I = (emf1 + emf2)/(r1 + r2 + R_load).',
    });
    // (a) The flashlight.
    const bx = 230;
    wire(svg, [
      [80, 70],
      [80, 34],
      [bx, 34],
      [bx, 174],
    ]);
    wire(svg, [
      [bx, 244],
      [bx, 400],
      [80, 400],
      [80, 320],
    ]);
    dryCell(svg, 80, 195, 125, 48);
    dryCell(svg, 80, 70, 125, 48);
    for (let a = 0; a < 360; a += 30) {
      const c = Math.cos(rad(a));
      const s = Math.sin(rad(a));
      if (s > 0.6) continue;
      svg.line(bx + c * 30, 196 - s * 30, bx + c * 42, 196 - s * 42, {
        color: COLORS.orange,
        width: 2,
      });
    }
    svg.circle(bx, 196, 22, { fill: '#fff1a8', stroke: '#c9a227', width: 1.5 });
    svg.path(`M ${bx - 6} 214 L ${bx - 4} 194 L ${bx + 4} 194 L ${bx + 6} 214`, {
      color: '#8a6d1a',
      width: 1.4,
    });
    svg.rect(bx - 11, 216, 22, 26, { fill: '#a9acb3', stroke: '#6f7178', width: 1.2, rx: 2 });
    for (const y of [222, 229, 236])
      svg.line(bx - 11, y, bx + 11, y, { color: '#6f7178', width: 1 });
    svg.path('M 272 262 Q 320 300 372 226', { color: '#555555', width: 5 });
    svg.arrow(360, 246, 378, 216, { color: '#555555', width: 5, head: 20 });

    // (b) The schematic.
    const [L, T, R, B] = [440, 30, 620, 420];
    box(svg, L, T, R, B);
    on(svg, 'cell', [L, 150], [L, 100]);
    lab(svg, L + 40, 124, 'emf_1', { anchor: 'start' });
    on(svg, 'R', [L, 170], [L, 240]);
    lab(svg, L + 20, 205, 'r_1', { anchor: 'start' });
    on(svg, 'cell', [L, 300], [L, 250]);
    lab(svg, L + 40, 274, 'emf_2', { anchor: 'start' });
    on(svg, 'R', [L, 330], [L, 400]);
    lab(svg, L + 20, 365, 'r_2', { anchor: 'start' });
    on(svg, 'R', [R, 185], [R, 265]);
    lab(svg, R + 18, 225, 'R_{load}', { anchor: 'start' });
    loopArrow(svg, 540, 130, 70, 150, 30);
    lab(svg, 540, 46, 'I');
    lab(svg, 704, 62, 'I = ', { anchor: 'end' });
    svg.text(792, 46, 'emf_1 + emf_2', { size: 20 });
    svg.line(708, 64, 878, 64, { color: COLORS.text, width: 1.5 });
    svg.text(792, 84, 'r_1 + r_2 + R_{load}', { size: 20 });
    return svg.render();
  },

  // 21.2 Fig. 5 — a voltage source and its load
  Figure_21_02_05: () => {
    const svg = new Svg({
      width: 480,
      height: 320,
      title: 'A voltage source with internal resistance and a load',
      desc: 'A source of emf with internal resistance r on the left drives current I clockwise through a load resistance R_load on the right. I = emf/(R_load + r).',
    });
    const L = 100;
    const T = 70;
    const R = 300;
    const B = 290;
    box(svg, L, T, R, B);
    sourceLeft(svg, L, T, B, { plusSign: false });
    on(svg, 'R', [R, 140], [R, 220], { size: 64 });
    lab(svg, R + 18, 180, 'R_{load}', { anchor: 'start' });
    loopArrow(svg, 200, 190, 80, 150, 30);
    lab(svg, 200, 132, 'I');
    lab(svg, 330, 40, 'I = ', { anchor: 'end', size: 22 });
    svg.text(380, 28, 'emf', { size: 20 });
    svg.line(335, 42, 425, 42, { color: COLORS.text, width: 1.5 });
    svg.text(380, 60, 'R_{load} + r', { size: 20 });
    return svg.render();
  },

  // 21.2 Fig. 9 — early batteries: voltaic piles and a crown of cups
  Figure_21_02_09: () => {
    const svg = new Svg({
      width: 1000,
      height: 230,
      title: 'Batteries made of many cells',
      desc: 'Left: two voltaic piles, stacks of alternating copper and zinc disks, joined at the top by a metal bar, with strips from their bases dipping into cups of electrolyte. Right: a crown of cups, a row of cups of electrolyte joined by arched strips that are copper at one end and zinc at the other, so each cup holds a copper plate and a zinc plate and the cells are in series.',
    });
    const COPPER = '#c8643c';
    const ZINC = '#b4b6bb';
    const cup = (x, w, top, h) => {
      const inset = w * 0.12;
      svg.path(
        `M ${x} ${top} L ${x + inset} ${top + h} Q ${x + w / 2} ${top + h + 10} ${x + w - inset} ${top + h} L ${x + w} ${top} Z`,
        { color: '#c99a2e', width: 1.5, fill: '#f7e3a3' }
      );
      svg.ellipse(x + w / 2, top + 4, w / 2 - 2, 6, {
        fill: '#fbefc6',
        stroke: '#c99a2e',
        width: 1,
      });
      svg.ellipse(x + w / 2, top, w / 2, 7, { stroke: '#8ec5dc', width: 1.6 });
    };
    // Voltaic piles: copper and zinc disks, alternating.
    const pile = (cx, base) => {
      svg.ellipse(cx, base + 6, 42, 9, { fill: '#4a4a4e', stroke: '#2e2e30', width: 1 });
      for (let k = 0; k < 16; k += 1) {
        const y = base - k * 10;
        const fill = k % 2 ? ZINC : COPPER;
        svg.rect(cx - 36, y - 8, 72, 8, { fill, stroke: '#6d5040', width: 0.8 });
        svg.ellipse(cx, y - 8, 36, 7, {
          fill: k % 2 ? '#dedfe2' : '#e09a78',
          stroke: '#6d5040',
          width: 0.8,
        });
      }
    };
    cup(10, 100, 150, 55);
    cup(340, 105, 150, 55);
    svg.path('M 140 168 Q 100 150 70 210', { color: '#8a4a2a', width: 9 });
    svg.path('M 140 168 Q 100 150 70 210', { color: COPPER, width: 6 });
    svg.path('M 305 168 Q 345 150 372 210', { color: '#77797e', width: 9 });
    svg.path('M 305 168 Q 345 150 372 210', { color: '#d9dadd', width: 6 });
    pile(168, 176);
    pile(272, 176);
    svg.rect(166, 14, 108, 6, { fill: '#3d3d41' });
    // Crown of cups: each arch is a copper–zinc strip, so the cells add in series.
    const cups = [
      [488, 108],
      [622, 70],
      [712, 70],
      [802, 70],
      [892, 108],
    ];
    const plates = cups.map(([x, w], i) => {
      cup(x, w, 140, 72);
      const out = [];
      if (i > 0) out.push([x + w * 0.32, ZINC]);
      if (i < cups.length - 1) out.push([x + w * (i === 0 ? 0.78 : 0.68), COPPER]);
      return out;
    });
    for (let i = 0; i < cups.length - 1; i += 1) {
      const [xa] = plates[i].at(-1);
      const [xb] = plates[i + 1][0];
      const mid = (xa + xb) / 2;
      svg.path(`M ${xa} 160 L ${xa} 128 Q ${xa} 96 ${mid} 96`, { color: COPPER, width: 6 });
      svg.path(`M ${mid} 96 Q ${xb} 96 ${xb} 128 L ${xb} 160`, { color: '#8f9196', width: 6 });
    }
    for (const list of plates)
      for (const [x, color] of list)
        svg.rect(x - 6, 152, 12, 26, { fill: color, stroke: '#4a4a4e', width: 1, rx: 2 });
    return svg.render();
  },

  // 21.2 Fig. 10 — two sources with opposing emfs
  Figure_21_02_10: () => {
    const svg = new Svg({
      width: 520,
      height: 320,
      title: 'Two voltage sources in series with their emfs opposed',
      desc: 'Two sources of emf, emf1 with internal resistance r1 on the left and emf2 with internal resistance r2 on the right, are joined in a loop with their positive terminals both at the top, so their emfs oppose. The current is I = (emf1 − emf2)/(r1 + r2).',
    });
    const L = 110;
    const T = 70;
    const R = 340;
    const B = 290;
    box(svg, L, T, R, B);
    sourceLeft(svg, L, T, B, { emf: 'emf_1', r: 'r_1' });
    on(svg, 'cell', [R, 165], [R, 115]);
    plus(svg, R - 26, 100);
    lab(svg, R + 26, 145, 'emf_2', { anchor: 'start' });
    on(svg, 'R', [R, 200], [R, 270]);
    lab(svg, R + 18, 235, 'r_2', { anchor: 'start' });
    lab(svg, 384, 40, 'I = ', { anchor: 'end', size: 22 });
    svg.text(440, 28, 'emf_1 − emf_2', { size: 19 });
    svg.line(388, 42, 492, 42, { color: COLORS.text, width: 1.5 });
    svg.text(440, 60, 'r_1 + r_2', { size: 19 });
    return svg.render();
  },

  // 21.2 Fig. 12 — two identical emfs in parallel
  Figure_21_02_12: () => {
    const svg = new Svg({
      width: 560,
      height: 470,
      title: 'Two voltage sources with identical emfs in parallel',
      desc: 'Top: two sources, each with the same emf, with internal resistances r1 and r2, connected in parallel across a load R_load. An arrow points to the equivalent circuit below: a single source of the same emf with a total internal resistance r_tot across R_load, where r_tot is less than r1 or r2.',
    });
    // Parallel sources.
    {
      const T = 40;
      const B = 210;
      wire(svg, [
        [40, T],
        [300, T],
        [300, B],
        [40, B],
        [40, T],
      ]);
      wire(svg, [
        [150, T],
        [150, B],
      ]);
      node(svg, 150, T);
      node(svg, 150, B);
      for (const [x, r] of [
        [40, 'r_1'],
        [150, 'r_2'],
      ]) {
        on(svg, 'cell', [x, 110], [x, 70]);
        lab(svg, x + 24, 86, 'emf', { anchor: 'start', size: 18 });
        on(svg, 'R', [x, 140], [x, 195], { size: 44 });
        lab(svg, x + 16, 168, r, { anchor: 'start' });
      }
      on(svg, 'R', [300, 90], [300, 160]);
      lab(svg, 318, 125, 'R_{load}', { anchor: 'start' });
    }
    svg.path('M 370 100 Q 440 150 400 250', { color: '#777777', width: 5 });
    svg.arrow(404, 236, 398, 262, { color: '#777777', width: 5, head: 20 });
    // Equivalent.
    {
      const L = 40;
      const T = 280;
      const R = 200;
      const B = 450;
      box(svg, L, T, R, B);
      on(svg, 'cell', [L, 350], [L, 310]);
      lab(svg, L + 24, 326, 'emf', { anchor: 'start', size: 18 });
      on(svg, 'R', [L, 380], [L, 435], { size: 44 });
      lab(svg, L + 16, 408, 'r_{tot}', { anchor: 'start' });
      on(svg, 'R', [R, 330], [R, 400]);
      lab(svg, R + 18, 365, 'R_{load}', { anchor: 'start' });
      val(svg, 330, 420, 'r_{tot} < r_1 \\rm{or} r_2', { anchor: 'start', size: 19 });
    }
    return svg.render();
  },

  // 21.2 problem — 12.0 V and 18.0 V sources joined positive to positive
  Figure_21_02_14: () => {
    const svg = new Svg({
      width: 520,
      height: 300,
      title: 'Two batteries connected positive terminal to positive terminal',
      desc: 'A loop with two sources whose positive terminals are both at the top: emf1 = 12.0 V with internal resistance r1 = 1.0 ohm on the left, and emf2 = 18.0 V with internal resistance r2 = 0.5 ohm on the right.',
    });
    const L = 170;
    const R = 350;
    const T = 50;
    const B = 260;
    box(svg, L, T, R, B);
    for (const [x, side, e, r] of [
      [L, -1, 'emf_1 = 12.0 \\rm{V}', 'r_1 = 1.0 Ω'],
      [R, 1, 'emf_2 = 18.0 \\rm{V}', 'r_2 = 0.5 Ω'],
    ]) {
      on(svg, 'cell', [x, 125], [x, 75]);
      plus(svg, x - side * 24, 64);
      val(svg, x + side * 28, 100, e, { anchor: side < 0 ? 'end' : 'start' });
      on(svg, 'R', [x, 160], [x, 235]);
      val(svg, x + side * 20, 198, r, { anchor: side < 0 ? 'end' : 'start' });
    }
    return svg.render();
  },

  // 21.3 Fig. 1 — a circuit that does not reduce to series and parallel parts
  Figure_21_03_01: () => {
    const svg = new Svg({
      width: 480,
      height: 560,
      title: 'A circuit that cannot be reduced to series and parallel combinations',
      desc: 'Three branches between two junctions on the left and right. The top branch has emf1 with internal resistance r1, joined to the left junction through R2. The middle branch is the single resistor R1. The bottom branch has emf2 with internal resistance r2, joined to the right junction through R3.',
    });
    const L = 110;
    const R = 380;
    const T = 80;
    const M = 300;
    const B = 500;
    box(svg, L, T, R, B);
    wire(svg, [
      [L, M],
      [R, M],
    ]);
    node(svg, L, M);
    node(svg, R, M);
    on(svg, 'cell', [160, T], [210, T]);
    lab(svg, 185, T + 44, 'emf_1');
    on(svg, 'R', [255, T], [345, T]);
    lab(svg, 300, T + 32, 'r_1');
    on(svg, 'R', [L, 140], [L, 240]);
    lab(svg, L - 20, 190, 'R_2', { anchor: 'end' });
    on(svg, 'R', [200, M], [290, M]);
    lab(svg, 245, M + 32, 'R_1');
    on(svg, 'R', [R, 360], [R, 450]);
    lab(svg, R + 20, 405, 'R_3', { anchor: 'start' });
    on(svg, 'cell', [160, B], [210, B]);
    lab(svg, 185, B + 44, 'emf_2');
    on(svg, 'R', [255, B], [345, B]);
    lab(svg, 300, B + 32, 'r_2');
    return svg.render();
  },

  // 21.3 Fig. 2 — the junction rule
  Figure_21_03_02: () => {
    const svg = new Svg({
      width: 480,
      height: 400,
      title: 'The junction rule',
      desc: 'Current I1 = 11 A flows into junction a from the right. Current I2 = 7 A leaves upward and I3 = 4 A leaves downward, so I1 = I2 + I3.',
    });
    const a = [200, 190];
    const thick = { color: CURRENT, width: 4, head: 18 };
    svg.line(a[0], 30, a[0], 320, { color: CURRENT, width: 4 });
    svg.line(a[0], a[1], 440, a[1], { color: CURRENT, width: 4 });
    svg.arrow(a[0], 120, a[0], 60, thick);
    svg.arrow(a[0], 250, a[0], 300, thick);
    svg.arrow(400, a[1], 320, a[1], thick);
    dot(svg, ...a, { r: 7, color: COLORS.black });
    lab(svg, a[0] - 22, a[1], '\\rm{a}', { anchor: 'end', size: 24 });
    lab(svg, a[0] + 22, 70, 'I_2 = 7 \\rm{A}', { anchor: 'start', size: 24 });
    lab(svg, 330, a[1] - 34, 'I_1 = 11 \\rm{A}', { anchor: 'start', size: 24 });
    lab(svg, a[0] + 22, 290, 'I_3 = 4 \\rm{A}', { anchor: 'start', size: 24 });
    lab(svg, 40, 362, 'I_1 = I_2 + I_3', { anchor: 'start', size: 26 });
    return svg.render();
  },

  // 21.3 Fig. 3 — the loop rule, as a schematic and as a potential "roller coaster"
  Figure_21_03_03: () => {
    const svg = new Svg({
      width: 760,
      height: 1040,
      title: 'The loop rule',
      desc: '(a) A series circuit: an 18 V emf with internal resistance r = 0.5 Ω drives a current I = 2.0 A clockwise through R1 = 6.0 Ω and R2 = 2.5 Ω. The potential is 0 V on the negative side of the emf and 18 V on its positive side, 17 V after r, 5 V after R1, and 0 V again after R2, so the 18 V rise is matched by drops of 1 V, 12 V and 5 V. (b) The same loop in perspective, with the height of a wall above each point of the circuit showing the potential there: the emf raises the charge from 0 to 18 V, and r, R1 and R2 lower it back to 0, like a roller coaster.',
    });
    // Potentials follow from I = 2.0 A: drops of 1 V across r, 12 V across R1, 5 V across R2.
    const I = 2.0;
    const Vr = 18 - I * 0.5;
    const V1 = Vr - I * 6.0;
    // (a) Schematic.
    const [L, T, R, B] = [150, 70, 650, 460];
    box(svg, L, T, R, B);
    on(svg, 'cell', [300, T], [350, T]);
    on(svg, 'R', [420, T], [540, T], { size: 70 });
    on(svg, 'R', [330, B], [460, B], { size: 70 });
    on(svg, 'R', [L, 200], [L, 320], { size: 70 });
    for (const [x, y, s, dx, dy] of [
      [250, T, '0 \\rm{V}', 0, 26],
      [390, T, '18 \\rm{V}', 0, 26],
      [560, T, `${Vr} \\rm{V}`, 0, 26],
      [310, B, `${V1} \\rm{V}`, 0, 26],
      [480, B, `${Vr} \\rm{V}`, 0, 26],
      [L, 175, '0 \\rm{V}', -14, 0],
      [L, 345, `${V1} \\rm{V}`, -14, 0],
    ]) {
      node(svg, x, y);
      val(svg, x + dx, y + dy, s, { anchor: dx < 0 ? 'end' : 'middle' });
    }
    lab(svg, 480, T - 30, 'r = 0.5 Ω');
    lab(svg, 395, B - 36, 'R_1 = 6.0 Ω');
    lab(svg, L + 26, 260, 'R_2 = 2.5 Ω', { anchor: 'start' });
    loopArrow(svg, 400, 300, 180, 150, 30);
    lab(svg, 400, 160, 'emf = 18 \\rm{V}');
    lab(svg, 560, 240, 'I = 2.0 \\rm{A}', { anchor: 'start' });
    caption(svg, 400, 510, '(a)');

    // (b) Each point of the loop (u along, v into the page) raised by its potential.
    const [W, D, k] = [500, 330, 9];
    const P = (u, v, V = 0) => [40 + u + 0.5 * v, 770 + 0.5 * v - k * V];
    const [c0, r0, r1, a0, a1, b0, b1] = [150, 260, 400, 380, 170, 230, 100];
    // Corners and element ends, clockwise from the back left corner: [u, v, V, element to next].
    const loop = [
      [0, 0, 0, 'w'],
      [c0 - 14, 0, 0, 'cell'],
      [c0 + 14, 0, 18, 'w'],
      [r0, 0, 18, 'R'],
      [r1, 0, Vr, 'w'],
      [W, 0, Vr, 'w'],
      [W, D, Vr, 'w'],
      [a0, D, Vr, 'R'],
      [a1, D, V1, 'w'],
      [0, D, V1, 'w'],
      [0, b0, V1, 'R'],
      [0, b1, 0, 'w'],
      [0, 0, 0, 'w'],
    ];
    svg.add(
      '<defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7ec9c"/><stop offset="1" stop-color="#fffbe6"/></linearGradient></defs>'
    );
    const wall = i => {
      const [[pu, pv, pV], [qu, qv, qV]] = [loop[i], loop[i + 1]];
      svg.polygon([P(pu, pv), P(qu, qv), P(qu, qv, qV), P(pu, pv, pV)], {
        fill: 'url(#wall)',
        stroke: '#6b6033',
        width: 1.2,
      });
    };
    // Back walls first, then the sides, then the front ones, so nearer walls cover farther ones.
    for (const i of [0, 1, 2, 3, 4, 9, 10, 11, 5, 6, 7, 8]) wall(i);
    for (let i = 0; i < loop.length - 1; i += 1) {
      const [p, q] = [loop[i], loop[i + 1]];
      const [A, Bq] = [P(p[0], p[1]), P(q[0], q[1])];
      if (p[3] === 'R')
        resistor(svg, A, Bq, { size: Math.hypot(Bq[0] - A[0], Bq[1] - A[1]) * 0.7 });
      else if (p[3] === 'cell') cell(svg, A, Bq, { gap: 10, long: 46, short: 24 });
      else svg.line(...A, ...Bq, { color: WIRE, width: 2 });
    }
    for (const [u, v, V, s, dx, dy] of [
      [c0 - 14, 0, 0, '0', -6, 22],
      [c0 + 14, 0, 18, '18 \\rm{V}', 10, 22],
      [r1, 0, Vr, `${Vr} \\rm{V}`, 0, 22],
      [a0, D, Vr, `${Vr} \\rm{V}`, 0, 22],
      [a1, D, V1, `${V1} \\rm{V}`, 0, 22],
      [0, b0, V1, `${V1} \\rm{V}`, -14, 10],
      [0, b1, 0, '0', -14, 4],
    ]) {
      const base = P(u, v);
      const high = P(u, v, V);
      if (V > 0) svg.line(...base, ...high, { color: '#6b6033', width: 1.2 });
      node(svg, ...high);
      if (V > 0) node(svg, ...base);
      val(svg, base[0] + dx, base[1] + dy, s, { anchor: dx < 0 ? 'end' : 'middle' });
    }
    lab(svg, ...P(c0 - 24, 0, 7), 'emf', { size: 20, anchor: 'end' });
    lab(svg, ...P((r0 + r1) / 2, -34, 0), 'r', { size: 20 });
    lab(svg, ...P((a0 + a1) / 2, D + 50, 0), 'R_1', { size: 20 });
    lab(svg, ...P(-34, (b0 + b1) / 2, 0), 'R_2', { size: 20 });
    const [s0, s1] = [P(170, 120), P(390, 120)];
    svg.path(
      `M ${s0[0]} ${s0[1]} Q ${(s0[0] + s1[0]) / 2} ${s0[1] - 70} ${s1[0] - 8} ${s1[1] - 6}`,
      {
        color: CURRENT,
        width: 3.5,
      }
    );
    svg.arrow(s1[0] - 22, s1[1] - 16, s1[0], s1[1], { color: CURRENT, width: 3.5, head: 15 });
    lab(svg, s1[0] + 14, s1[1] + 4, 'I = 2.0 \\rm{A}', { anchor: 'start' });
    caption(svg, 400, 1020, '(b)');
    return svg.render();
  },

  // 21.3 Fig. 4 — sign of the potential change across R and emf, traversing a to b
  Figure_21_03_04: () => {
    const svg = new Svg({
      width: 820,
      height: 440,
      title: 'Potential changes across resistors and sources traversed from a to b',
      desc: 'Four elements, each traversed from a to b. A resistor carrying current I from a to b: ΔV = Vb − Va = −IR. A resistor carrying current from b to a: ΔV = +IR. A source with its negative terminal toward a and positive toward b: ΔV = +emf. A source with its positive terminal toward a: ΔV = −emf.',
    });
    const panel = (x0, y0, kind, eq) => {
      note(svg, x0 + 10, y0, 'Direction of traverse a', { anchor: 'start', size: 16 });
      svg.arrow(x0 + 200, y0, x0 + 300, y0, { color: COLORS.black, width: 1.5, head: 10 });
      note(svg, x0 + 316, y0, 'b', { anchor: 'start', size: 16 });
      const y = y0 + 110;
      const xa = x0 + 60;
      const xb = x0 + 330;
      wire(svg, [
        [xa, y],
        [xb, y],
      ]);
      point(svg, xa, y, 'a', { dy: -20 });
      point(svg, xb, y, 'b', { dy: -20 });
      const mx = (xa + xb) / 2;
      if (kind === 'R+' || kind === 'R-') {
        on(svg, 'R', [mx - 40, y], [mx + 40, y]);
        lab(svg, mx - 34, y - 24, 'R');
        if (kind === 'R+')
          svg.arrow(mx - 50, y - 50, mx + 40, y - 50, { color: CURRENT, width: 5, head: 18 });
        else svg.arrow(mx + 50, y - 50, mx - 40, y - 50, { color: CURRENT, width: 5, head: 18 });
        lab(svg, mx, y - 72, 'I');
      } else {
        const toB = kind === 'E+';
        on(svg, 'cell', toB ? [mx - 25, y] : [mx + 25, y], toB ? [mx + 25, y] : [mx - 25, y]);
        lab(svg, mx, y - 40, 'emf', { size: 18 });
        plus(svg, mx - 24, y - 16, toB ? '−' : '+');
        plus(svg, mx + 24, y - 16, toB ? '+' : '−');
      }
      lab(svg, x0 + 195, y + 62, eq, { size: 21 });
    };
    panel(0, 26, 'R+', 'ΔV = V_b − V_a = −IR');
    panel(410, 26, 'R-', 'ΔV = V_b − V_a = +IR');
    panel(0, 236, 'E+', 'ΔV = V_b − V_a = +emf');
    panel(410, 236, 'E-', 'ΔV = V_b − V_a = −emf');
    return svg.render();
  },

  // 21.3 Fig. 5 — the worked example with specified emfs and resistances
  Figure_21_03_05: () => kirchhoffExample(),

  // 21.3 problem — the same circuit as Fig. 5
  Figure_21_03_09: () => kirchhoffExample(),

  // 21.3 problem — three currents entering a junction
  Figure_21_03_06: () => {
    const svg = new Svg({
      width: 560,
      height: 320,
      title: 'Three currents entering a T junction',
      desc: 'A T junction with I1 flowing in from above, I2 flowing in from the left, and I3 flowing in from the right.',
    });
    const J = [280, 260];
    wire(svg, [
      [40, J[1]],
      [520, J[1]],
    ]);
    wire(svg, [
      [J[0], 30],
      [J[0], J[1]],
    ]);
    node(svg, ...J);
    const thick = { color: CURRENT, width: 4, head: 18 };
    svg.arrow(J[0], 90, J[0], 170, thick);
    svg.arrow(80, J[1], 180, J[1], thick);
    svg.arrow(480, J[1], 380, J[1], thick);
    lab(svg, J[0] + 22, 110, 'I_1', { anchor: 'start', size: 24 });
    lab(svg, 130, J[1] - 30, 'I_2', { size: 24 });
    lab(svg, 430, J[1] - 30, 'I_3', { size: 24 });
    return svg.render();
  },

  // 21.3 problem — four emfs, two loops
  Figure_21_03_07: () => {
    const svg = new Svg({
      width: 800,
      height: 600,
      title: 'A two-loop circuit with four sources',
      desc: 'Corners a (top left), c (top right), d (bottom right) and f (bottom left), with junctions b on the top wire and e on the bottom wire joined by a middle branch. Left branch f to a: emf1 = 18 V with r1 = 0.5 ohm. Top: R1 = 20 ohms from a to b and R3 = 8 ohms from b to c. Middle branch b to e: R2 = 6 ohms, point g, emf2 = 3.0 V and r2 = 0.25 ohm. Right branch c to d: emf3 = 12 V and r3 = 0.5 ohm. Bottom: R4 = 15 ohms from f to e, then emf4 = 24 V and r4 = 0.75 ohm from e to d. Currents I1 flows from a toward b, then splits into I2 toward c and I3 down the middle branch.',
    });
    const L = 90;
    const M = 420;
    const R = 710;
    const T = 70;
    const B = 550;
    box(svg, L, T, R, B);
    wire(svg, [
      [M, T],
      [M, B],
    ]);
    on(svg, 'R', [180, T], [290, T]);
    lab(svg, 235, T - 30, 'R_1');
    val(svg, 235, T + 32, '20 Ω');
    on(svg, 'R', [560, T], [670, T]);
    lab(svg, 615, T - 30, 'R_3');
    val(svg, 615, T + 32, '8 Ω');
    on(svg, 'R', [L, 140], [L, 230]);
    lab(svg, L - 20, 185, 'r_1', { anchor: 'end' });
    val(svg, L + 20, 185, '0.5 Ω', { anchor: 'start' });
    on(svg, 'cell', [L, 305], [L, 265]);
    lab(svg, L - 30, 290, 'emf_1', { anchor: 'end' });
    val(svg, L + 30, 290, '18 \\rm{V}', { anchor: 'start' });
    on(svg, 'R', [M, 170], [M, 260]);
    lab(svg, M - 20, 215, 'R_2', { anchor: 'end' });
    val(svg, M + 20, 215, '6 Ω', { anchor: 'start' });
    point(svg, M, 300, 'g', { dx: 16, dy: 0, anchor: 'start' });
    on(svg, 'cell', [M, 325], [M, 365]);
    lab(svg, M - 30, 345, 'emf_2', { anchor: 'end' });
    val(svg, M + 30, 345, '3.0 \\rm{V}', { anchor: 'start' });
    on(svg, 'R', [M, 410], [M, 500]);
    lab(svg, M - 20, 455, 'r_2', { anchor: 'end' });
    val(svg, M + 20, 455, '0.25 Ω', { anchor: 'start' });
    on(svg, 'cell', [R, 260], [R, 300]);
    lab(svg, R - 30, 280, 'emf_3', { anchor: 'end' });
    val(svg, R + 30, 280, '12 \\rm{V}', { anchor: 'start' });
    on(svg, 'R', [R, 380], [R, 470]);
    lab(svg, R - 20, 425, 'r_3', { anchor: 'end' });
    val(svg, R + 20, 425, '0.5 Ω', { anchor: 'start' });
    on(svg, 'R', [180, B], [290, B]);
    lab(svg, 235, B - 30, 'R_4');
    val(svg, 235, B + 32, '15 Ω');
    on(svg, 'cell', [510, B], [550, B]);
    lab(svg, 530, B - 42, 'emf_4');
    val(svg, 530, B + 40, '24 \\rm{V}');
    on(svg, 'R', [590, B], [680, B]);
    lab(svg, 635, B - 30, 'r_4');
    val(svg, 635, B + 32, '0.75 Ω');
    point(svg, L, T, 'a', { dx: -16, dy: 0, anchor: 'end' });
    point(svg, M, T, 'b', { dy: -18 });
    point(svg, R, T, 'c', { dx: 16, dy: 0, anchor: 'start' });
    point(svg, R, B, 'd', { dx: 16, dy: 0, anchor: 'start' });
    point(svg, M, B, 'e', { dy: 22 });
    point(svg, L, B, 'f', { dx: -16, dy: 0, anchor: 'end' });
    currentArrow(svg, 300, T + 34, 390, T + 34);
    lab(svg, 345, T + 62, 'I_1');
    currentArrow(svg, 445, T + 34, 540, T + 34);
    lab(svg, 492, T + 62, 'I_2');
    currentArrow(svg, M + 26, T + 44, M + 26, T + 104);
    lab(svg, M + 40, T + 96, 'I_3', { anchor: 'start' });
    return svg.render();
  },

  // 21.3 problem — four emfs, three branches with many labeled points
  Figure_21_03_08: () => {
    const svg = new Svg({
      width: 880,
      height: 680,
      title: 'A two-loop circuit with four sources and labeled points a to l',
      desc: 'Junctions a on the left and e on the right are joined by three branches. Top branch, from a up through R1 = 5.0 ohms, along the top through points b, emf1 = 24.0 V, c, r1 = 0.10 ohm and d, then down through R5 = 20 ohms to e. Middle branch from a: emf2 = 48.0 V, point k, r2 = 0.50 ohm, point l and R2 = 40 ohms to e. Bottom branch from a down through R3 = 78 ohms, along the bottom through j, emf3 = 6.0 V, i, r3 = 0.05 ohm and h, then up through g, emf4 = 36.0 V, f and r4 = 0.20 ohm to e. Currents I1 flows up through R1, I2 to the right through the middle branch, and I3 up through R3.',
    });
    const L = 140;
    const R = 680;
    const T = 110;
    const M = 340;
    const B = 610;
    box(svg, L, T, R, B);
    wire(svg, [
      [L, M],
      [R, M],
    ]);
    point(svg, L, M, 'a', { dx: -16, dy: 0, anchor: 'end' });
    point(svg, R, M, 'e', { dx: 16, dy: 0, anchor: 'start' });
    // Top branch.
    on(svg, 'R', [L, 160], [L, 280]);
    lab(svg, L - 22, 205, 'R_1', { anchor: 'end' });
    val(svg, L - 22, 232, '5.0 Ω', { anchor: 'end' });
    point(svg, 200, T, 'b', { dy: -20 });
    on(svg, 'cell', [240, T], [280, T]);
    lab(svg, 268, T - 64, 'emf_1 = 24.0 \\rm{V}');
    point(svg, 315, T, 'c', { dy: -20 });
    on(svg, 'R', [345, T], [425, T]);
    lab(svg, 385, T - 28, 'r_1');
    val(svg, 385, T + 30, '0.10 Ω');
    point(svg, 455, T, 'd', { dy: -20 });
    on(svg, 'R', [R, 170], [R, 290]);
    lab(svg, R + 22, 215, 'R_5', { anchor: 'start' });
    val(svg, R + 22, 242, '20 Ω', { anchor: 'start' });
    // Middle branch.
    on(svg, 'cell', [230, M], [270, M]);
    lab(svg, 300, M - 64, 'emf_2 = 48.0 \\rm{V}');
    point(svg, 310, M, 'k', { dy: -20 });
    on(svg, 'R', [340, M], [420, M]);
    lab(svg, 380, M - 28, 'r_2');
    val(svg, 380, M + 30, '0.50 Ω');
    point(svg, 450, M, 'l', { dy: -20 });
    on(svg, 'R', [490, M], [610, M]);
    lab(svg, 550, M - 30, 'R_2');
    val(svg, 550, M + 32, '40 Ω');
    // Bottom branch.
    on(svg, 'R', [L, 400], [L, 520]);
    lab(svg, L - 22, 448, 'R_3', { anchor: 'end' });
    val(svg, L - 22, 475, '78 Ω', { anchor: 'end' });
    point(svg, 190, B, 'j', { dy: 24 });
    on(svg, 'cell', [270, B], [230, B]);
    lab(svg, 320, B - 50, 'emf_3 = 6.0 \\rm{V}', { anchor: 'start' });
    point(svg, 310, B, 'i', { dy: 24 });
    on(svg, 'R', [340, B], [420, B]);
    lab(svg, 380, B - 28, 'r_3');
    val(svg, 380, B + 30, '0.05 Ω');
    point(svg, 455, B, 'h', { dy: 24 });
    on(svg, 'R', [R, 370], [R, 450]);
    lab(svg, R + 22, 400, 'r_4', { anchor: 'start' });
    val(svg, R + 22, 427, '0.20 Ω', { anchor: 'start' });
    point(svg, R, 480, 'f', { dx: 16, dy: 0, anchor: 'start' });
    on(svg, 'cell', [R, 545], [R, 505]);
    lab(svg, R + 34, 525, 'emf_4 = 36.0 \\rm{V}', { anchor: 'start' });
    point(svg, R, 570, 'g', { dx: 16, dy: 0, anchor: 'start' });
    currentArrow(svg, L + 28, 300, L + 28, 236);
    lab(svg, L + 40, 284, 'I_1', { anchor: 'start' });
    currentArrow(svg, L + 12, M + 32, L + 82, M + 32);
    lab(svg, L + 40, M + 58, 'I_2');
    currentArrow(svg, L + 28, 540, L + 28, 476);
    lab(svg, L + 40, 524, 'I_3', { anchor: 'start' });
    return svg.render();
  },

  // 21.4 Fig. 3 — an ammeter in series
  Figure_21_04_03: () => {
    const svg = new Svg({
      width: 520,
      height: 340,
      title: 'An ammeter placed in series',
      desc: 'A single loop with an ammeter A on the left side, R1 between points c and d and R2 between points e and f on the top, and on the bottom a source of emf between points b and a followed by its internal resistance r. All the current flows through the ammeter.',
    });
    const L = 70;
    const R = 450;
    const T = 70;
    const B = 280;
    box(svg, L, T, R, B);
    point(svg, 120, T, 'c', { dy: -22 });
    on(svg, 'R', [130, T], [220, T]);
    lab(svg, 175, T + 32, 'R_1');
    point(svg, 230, T, 'd', { dy: -22 });
    point(svg, 280, T, 'e', { dy: -22 });
    on(svg, 'R', [290, T], [380, T]);
    lab(svg, 335, T + 32, 'R_2');
    point(svg, 390, T, 'f', { dy: -22 });
    on(svg, 'meter', [L, 130], [L, 220], { letter: 'A', r: 28, fill: '#c9cfe6' });
    point(svg, 120, B, 'b', { dy: -22 });
    on(svg, 'cell', [170, B], [140, B]);
    lab(svg, 152, B + 40, 'emf');
    on(svg, 'R', [210, B], [290, B]);
    lab(svg, 250, B + 30, 'r');
    point(svg, 320, B, 'a', { dy: -22 });
    return svg.render();
  },

  // 21.4 Fig. 4 — a voltmeter is a galvanometer in series with a large R
  Figure_21_04_04: () => {
    const svg = new Svg({
      width: 680,
      height: 150,
      title: 'A voltmeter built from a galvanometer',
      desc: 'A voltmeter V is equivalent to a large resistance R in series with a galvanometer G whose internal resistance is r.',
    });
    const y = 80;
    wire(svg, [
      [20, y],
      [160, y],
    ]);
    on(svg, 'meter', [50, y], [130, y], { letter: 'V', r: 30, fill: '#d4e8c2' });
    svg.text(195, y, '=', { size: 32, math: false });
    wire(svg, [
      [230, y],
      [660, y],
    ]);
    on(svg, 'R', [270, y], [360, y]);
    lab(svg, 315, y - 34, 'R');
    on(svg, 'R', [390, y], [480, y]);
    lab(svg, 435, y - 34, 'r');
    on(svg, 'meter', [520, y], [600, y], { letter: 'G', r: 30, fill: '#f3d9a4' });
    return svg.render();
  },

  // 21.4 Fig. 5 — an ammeter is a galvanometer with a shunt
  Figure_21_04_05: () => {
    const svg = new Svg({
      width: 620,
      height: 330,
      title: 'An ammeter built from a galvanometer and a shunt resistance',
      desc: 'Current I_tot enters on the left and divides. A small current I_G passes through the galvanometer G and its internal resistance r on the upper branch; most of the current, I, passes through the small shunt resistance R on the lower branch. The currents rejoin as I_tot on the right.',
    });
    const L = 150;
    const R = 470;
    const T = 60;
    const B = 270;
    const y = 165;
    box(svg, L, T, R, B);
    wire(svg, [
      [30, y],
      [L, y],
    ]);
    wire(svg, [
      [R, y],
      [590, y],
    ]);
    on(svg, 'R', [190, T], [270, T]);
    lab(svg, 230, T - 28, 'r');
    on(svg, 'meter', [300, T], [380, T], { letter: 'G', r: 28, fill: '#f3d9a4' });
    on(svg, 'R', [270, B], [350, B]);
    lab(svg, 310, B + 30, 'R');
    roundFlow(svg, [
      [40, y - 10],
      [L + 16, y - 10],
      [L + 16, T + 40],
      [R - 16, T + 40],
      [R - 16, y - 10],
      [580, y - 10],
    ]);
    // The lower branch splits off the incoming current and rejoins it, so it
    // starts and ends on the upper path instead of carrying its own arrowhead.
    roundFlow(
      svg,
      [
        [L + 16, y - 10],
        [L + 16, B - 34],
        [R - 16, B - 34],
        [R - 16, y - 10],
      ],
      { head: false }
    );
    for (const yy of [T + 40, B - 34]) {
      svg.arrow(290, yy, 330, yy, { color: CURRENT, width: 3, head: 15 });
    }
    lab(svg, 60, y - 38, 'I_{tot}', { anchor: 'start' });
    lab(svg, 540, y - 38, 'I_{tot}');
    lab(svg, L + 40, T + 70, 'I_G', { anchor: 'start' });
    lab(svg, R - 40, T + 70, 'I_G', { anchor: 'end' });
    lab(svg, L + 40, B - 62, 'I', { anchor: 'start' });
    lab(svg, R - 40, B - 62, 'I', { anchor: 'end' });
    return svg.render();
  },

  // 21.4 Fig. 6 — voltmeter resistance in parallel with the device
  Figure_21_04_06: () => {
    const svg = new Svg({
      width: 800,
      height: 300,
      title: 'Effect of voltmeter resistance on the circuit',
      desc: '(a) Desired: a voltmeter in parallel with R, where the voltmeter resistance is much larger than R, so the combination is approximately R. (b) To be avoided: a voltmeter whose resistance equals R, so the combination R in parallel with R equals R/2.',
    });
    const par = (x, left) => {
      const T = 70;
      const B = 210;
      wire(svg, [
        [x + 40, 30],
        [x + 40, T],
      ]);
      box(svg, x, T, x + 80, B);
      wire(svg, [
        [x + 40, B],
        [x + 40, 250],
      ]);
      if (left === 'V')
        on(svg, 'meter', [x, 110], [x, 170], { letter: 'V', r: 22, fill: '#d4e8c2' });
      else on(svg, 'R', [x, 105], [x, 175], { size: 54 });
      if (left === 'R') lab(svg, x + 16, 140, 'R', { anchor: 'start' });
      on(svg, 'R', [x + 80, 105], [x + 80, 175], { size: 54 });
      lab(svg, x + 96, 140, 'R', { anchor: 'start' });
    };
    const single = (x, label) => {
      wire(svg, [
        [x, 30],
        [x, 250],
      ]);
      on(svg, 'R', [x, 105], [x, 175], { size: 54 });
      lab(svg, x + 16, 140, label, { anchor: 'start' });
    };
    par(40, 'V');
    svg.text(165, 140, '≈', { size: 28, math: false });
    single(200, 'R');
    note(svg, 110, 272, 'Desired', { size: 15 });
    caption(svg, 110, 292, '(a)');
    svg.line(290, 20, 290, 290, { color: '#cccccc', width: 1 });
    par(330, 'V');
    svg.text(455, 140, '=', { size: 28, math: false });
    par(480, 'R');
    svg.text(605, 140, '=', { size: 28, math: false });
    single(640, 'R/2');
    note(svg, 520, 272, 'To be avoided', { size: 15 });
    caption(svg, 520, 292, '(b)');
    return svg.render();
  },

  // 21.4 Fig. 7 — ammeter resistance in series with the device
  Figure_21_04_07: () => {
    const svg = new Svg({
      width: 760,
      height: 320,
      title: 'Effect of ammeter resistance on the circuit',
      desc: '(a) Desired: an ammeter in series with R, where the ammeter resistance is much smaller than R, so the total is approximately R. (b) To be avoided: an ammeter whose resistance equals R, so the total R + R equals 2R.',
    });
    const chain = (x, lower, label) => {
      wire(svg, [
        [x, 30],
        [x, 260],
      ]);
      on(svg, 'R', [x, 55], [x, 125], { size: 54 });
      lab(svg, x + 16, 90, 'R', { anchor: 'start' });
      if (lower === 'A')
        on(svg, 'meter', [x, 170], [x, 220], { letter: 'A', r: 22, fill: '#c9cfe6' });
      else {
        on(svg, 'R', [x, 160], [x, 230], { size: 54 });
        lab(svg, x + 16, 195, label, { anchor: 'start' });
      }
    };
    const single = (x, label) => {
      wire(svg, [
        [x, 30],
        [x, 260],
      ]);
      on(svg, 'R', [x, 110], [x, 180], { size: 54 });
      lab(svg, x + 16, 145, label, { anchor: 'start' });
    };
    chain(70, 'A');
    svg.text(140, 145, '≈', { size: 28, math: false });
    single(190, 'R');
    note(svg, 130, 286, 'Desired', { size: 15 });
    caption(svg, 130, 308, '(a)');
    svg.line(270, 20, 270, 310, { color: '#cccccc', width: 1 });
    chain(350, 'A');
    svg.text(420, 145, '=', { size: 28, math: false });
    chain(470, 'R', 'R');
    svg.text(540, 145, '=', { size: 28, math: false });
    single(590, '2R');
    note(svg, 470, 286, 'To be avoided', { size: 15 });
    caption(svg, 470, 308, '(b)');
    return svg.render();
  },

  // 21.4 problem — an ammeter connected directly across a source
  Figure_21_04_08: () => {
    const svg = new Svg({
      width: 500,
      height: 300,
      title: 'An ammeter connected directly across a voltage source',
      desc: 'A source of emf with internal resistance r on the left, connected directly to an ammeter A on the right with nothing else in the circuit. Labeled "Do not do this!"',
    });
    const L = 110;
    const R = 330;
    const T = 40;
    const B = 260;
    box(svg, L, T, R, B);
    sourceLeft(svg, L, T, B, { plusSign: false });
    on(svg, 'meter', [R, 110], [R, 190], { letter: 'A', r: 28, fill: '#c9cfe6' });
    note(svg, 350, 90, 'Do \\it{not} do this!', { anchor: 'start', size: 20 });
    return svg.render();
  },

  // 21.4 problem — locating meters in a three-branch circuit
  Figure_21_04_09: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'A source driving R1 in parallel with R2 and R3 in series',
      desc: 'Top points a, b and c and bottom points h, g and f. The left branch from h to a has emf = 90 V with internal resistance r = 0.25 ohm. The middle branch from b to g has R1 = 3.0 ohms between points i and j. The right branch from c to f has R2 = 6.0 ohms, points d and e, then R3 = 1.5 ohms.',
    });
    const xs = [150, 360, 560];
    const T = 60;
    const B = 330;
    box(svg, xs[0], T, xs[2], B);
    wire(svg, [
      [xs[1], T],
      [xs[1], B],
    ]);
    on(svg, 'cell', [xs[0], 160], [xs[0], 120]);
    val(svg, xs[0] - 30, 140, 'emf = 90 \\rm{V}', { anchor: 'end' });
    on(svg, 'R', [xs[0], 210], [xs[0], 290]);
    val(svg, xs[0] - 20, 250, 'r = 0.25 Ω', { anchor: 'end' });
    point(svg, xs[1], 110, 'i', { dx: 16, dy: 0, anchor: 'start' });
    on(svg, 'R', [xs[1], 155], [xs[1], 235]);
    val(svg, xs[1] + 22, 195, 'R_1 = 3.0 Ω', { anchor: 'start' });
    point(svg, xs[1], 280, 'j', { dx: 16, dy: 0, anchor: 'start' });
    on(svg, 'R', [xs[2], 75], [xs[2], 155]);
    val(svg, xs[2] + 22, 115, 'R_2 = 6.0 Ω', { anchor: 'start' });
    point(svg, xs[2], 180, 'd', { dx: 16, dy: 0, anchor: 'start' });
    point(svg, xs[2], 220, 'e', { dx: 16, dy: 0, anchor: 'start' });
    on(svg, 'R', [xs[2], 240], [xs[2], 320]);
    val(svg, xs[2] + 22, 280, 'R_3 = 1.5 Ω', { anchor: 'start' });
    ['a', 'b', 'c'].forEach((p, k) => point(svg, xs[k], T, p, { dy: -20 }));
    ['h', 'g', 'f'].forEach((p, k) => point(svg, xs[k], B, p, { dy: 24 }));
    return svg.render();
  },

  // 21.4 problem — a voltmeter across a source
  Figure_21_04_10: () => {
    const svg = new Svg({
      width: 440,
      height: 270,
      title: 'A voltmeter connected across the terminals of a source',
      desc: 'A source of emf with internal resistance r, with a voltmeter V connected across its terminals. Current I flows clockwise around the loop.',
    });
    const L = 60;
    const R = 380;
    const T = 60;
    const B = 190;
    box(svg, L, T, R, B);
    on(svg, 'meter', [180, T], [260, T], { letter: 'V', r: 28, fill: '#d4e8c2' });
    on(svg, 'cell', [170, B], [130, B]);
    note(svg, 150, B + 44, 'emf', { size: 20, italic: true });
    on(svg, 'R', [240, B], [320, B]);
    lab(svg, 280, B + 32, 'r');
    node(svg, L, B);
    node(svg, R, B);
    loopArrow(svg, 220, 175, 60, 145, 35);
    lab(svg, 200, 104, 'I');
    return svg.render();
  },

  // 21.4 problem — an ammeter in series with a load
  Figure_21_04_11: () => {
    const svg = new Svg({
      width: 440,
      height: 110,
      title: 'An ammeter with internal resistance in series with a load',
      desc: 'An ammeter A with internal resistance r in series with a load resistance R.',
    });
    const y = 50;
    wire(svg, [
      [20, y],
      [420, y],
    ]);
    on(svg, 'meter', [80, y], [160, y], { letter: 'A', r: 28, fill: '#c9cfe6' });
    on(svg, 'R', [200, y], [280, y]);
    lab(svg, 240, y + 34, 'r');
    on(svg, 'R', [310, y], [390, y]);
    lab(svg, 350, y + 34, 'R');
    return svg.render();
  },

  // 21.5 Fig. 1 — an analog voltmeter draws current
  Figure_21_05_01: () => {
    const svg = new Svg({
      width: 800,
      height: 330,
      title: 'An analog voltmeter draws current from the source it measures',
      desc: 'Left: a source of emf with internal resistance r connected to a voltmeter V, with current I flowing clockwise. Right, after an equals sign: the same circuit with the voltmeter drawn as a galvanometer G with internal resistance rG in series with a large resistance R, carrying the same current I.',
    });
    const draw = (L, R, inside) => {
      const T = 70;
      const B = 280;
      box(svg, L, T, R, B);
      inside(T);
      on(svg, 'cell', [L + 80, B], [L + 40, B]);
      plus(svg, L + 40, B - 34);
      lab(svg, L + 60, B + 40, 'emf');
      on(svg, 'R', [L + 130, B], [L + 210, B]);
      lab(svg, L + 170, B + 32, 'r');
      loopArrow(svg, (L + R) / 2, 210, 72, 160, 25);
      lab(svg, (L + R) / 2 + 10, 160, 'I');
    };
    draw(60, 320, T =>
      on(svg, 'meter', [150, T], [230, T], { letter: 'V', r: 28, fill: '#d4e8c2' })
    );
    svg.text(400, 175, '=', { size: 36, math: false });
    draw(470, 740, T => {
      on(svg, 'meter', [480, T], [550, T], { letter: 'G', r: 26, fill: '#f3d9a4' });
      on(svg, 'R', [570, T], [640, T], { size: 50 });
      lab(svg, 605, T + 32, 'r_G');
      on(svg, 'R', [655, T], [725, T], { size: 50 });
      lab(svg, 690, T + 32, 'R');
    });
    return svg.render();
  },

  // 21.5 Fig. 2 — the potentiometer
  Figure_21_05_02: () => {
    const svg = new Svg({
      width: 820,
      height: 740,
      title: 'The potentiometer, a null measurement device',
      desc: '(a) A source of emf with internal resistance r passes a constant current I through a long wire resistor R. (b) An unknown emf_x, in series with a galvanometer G and its resistance rG, is connected from the left end of R to a sliding contact. The contact is moved until G reads zero; then emf_x = I R_x, where R_x is the resistance between the left end and the contact.',
    });
    const top = (L, R, T) => {
      on(svg, 'cell', [L + 70, T], [L + 30, T]);
      plus(svg, L + 22, T - 38);
      lab(svg, L + 72, T - 44, 'emf', { anchor: 'start' });
      on(svg, 'R', [L + 170, T], [L + 260, T]);
      lab(svg, L + 215, T - 30, 'r');
    };
    // (a)
    {
      const L = 40;
      const R = 340;
      const T = 80;
      const B = 400;
      box(svg, L, T, R, B);
      top(L, R, T);
      on(svg, 'R', [80, B], [300, B], { size: 150 });
      lab(svg, 190, B + 32, 'R');
      loopArrow(svg, 190, 210, 110, 205, 290);
      lab(svg, 290, 330, 'I');
      caption(svg, 190, 470, '(a)');
    }
    // (b)
    {
      const L = 440;
      const R = 780;
      const T = 80;
      const B = 400;
      box(svg, L, T, R, B);
      top(L, R, T);
      const r0 = 520;
      const r1 = 700;
      on(svg, 'R', [r0 - 10, B], [r1 + 10, B], { size: r1 - r0 });
      lab(svg, 640, B + 32, 'R');
      loopArrow(svg, 610, 210, 110, 205, 290);
      lab(svg, 715, 330, 'I');
      const xs = 600;
      svg.arrow(r0, B - 40, xs, B - 40, { color: COLORS.black, width: 1.5, head: 9, start: true });
      svg.line(r0, B - 50, r0, B - 14, { color: COLORS.black, width: 1 });
      svg.line(xs, B - 50, xs, B - 14, { color: COLORS.black, width: 1 });
      lab(svg, (r0 + xs) / 2, B - 62, 'R_x');
      // Galvanometer loop.
      const yb = 690;
      wire(svg, [
        [L, B],
        [L, yb],
        [xs, yb],
        [xs, 500],
      ]);
      svg.arrow(xs, 470, xs, B + 12, { color: COLORS.black, width: 2.5, head: 14 });
      wire(svg, [
        [xs, 500],
        [xs, 470],
      ]);
      on(svg, 'meter', [xs, 520], [xs, 580], { letter: 'G', r: 28, fill: '#f3d9a4' });
      on(svg, 'R', [xs, 600], [xs, 670], { size: 50 });
      lab(svg, xs + 20, 635, 'r_G', { anchor: 'start' });
      on(svg, 'cell', [L + 80, yb], [L + 40, yb]);
      plus(svg, L + 30, yb + 32);
      lab(svg, L + 60, yb - 40, 'emf_x');
      lab(svg, 650, 540, 'emf_x = IR_x', { anchor: 'start' });
      lab(svg, 650, 575, '\\rm{if} G = 0', { anchor: 'start' });
      caption(svg, 610, 730, '(b)');
    }
    return svg.render();
  },

  // 21.5 Fig. 3 — measuring R with an ammeter and voltmeter
  Figure_21_05_03: () => {
    const svg = new Svg({
      width: 820,
      height: 440,
      title: 'Two ways of measuring resistance with standard meters',
      desc: '(a) A source of emf with internal resistance r drives current I through an ammeter A and a resistance R; R = V/I is calculated assuming the terminal voltage V is constant. (b) The same circuit with a voltmeter V connected across the source, so the terminal voltage is measured rather than assumed.',
    });
    const draw = (L, withV) => {
      const R = L + 280;
      const T = 60;
      const B = 300;
      box(svg, L, T, R, B);
      on(svg, 'meter', [L + 100, T], [L + 180, T], { letter: 'A', r: 24, fill: '#c9cfe6' });
      on(svg, 'R', [R, 130], [R, 220]);
      lab(svg, R + 18, 175, 'R', { anchor: 'start' });
      lab(svg, R + 40, 80, 'R = ', { anchor: 'end' });
      lab(svg, R + 58, 66, 'V', { size: 19 });
      svg.line(R + 46, 82, R + 70, 82, { color: COLORS.text, width: 1.4 });
      lab(svg, R + 58, 98, 'I', { size: 19 });
      on(svg, 'cell', [L + 85, B], [L + 45, B]);
      lab(svg, L + 65, B + 40, 'emf');
      on(svg, 'R', [L + 130, B], [L + 210, B]);
      lab(svg, L + 170, B - 30, 'r');
      if (withV) {
        wire(svg, [
          [L, B],
          [L, 380],
          [L + 240, 380],
          [L + 240, B],
        ]);
        node(svg, L + 240, B);
        on(svg, 'meter', [L + 80, 380], [L + 160, 380], { letter: 'V', r: 22, fill: '#d4e8c2' });
        note(svg, L + 120, 414, 'V measured', { size: 16 });
      } else {
        hbrace(svg, L + 30, L + 230, B + 54);
        note(svg, L + 130, B + 100, 'V assumed constant', { size: 16 });
        loopArrow(svg, L + 120, 190, 80, 210, 110);
        lab(svg, L + 66, 196, 'I');
      }
    };
    draw(60, false);
    caption(svg, 200, 432, '(a)');
    draw(470, true);
    caption(svg, 610, 432, '(b)');
    return svg.render();
  },

  // 21.5 Fig. 4 — the Wheatstone bridge
  Figure_21_05_04: () => {
    const svg = new Svg({
      width: 660,
      height: 430,
      title: 'The Wheatstone bridge',
      desc: 'Four resistors form a diamond of two paths from point a on the left to point c on the right: variable R3 then Rx along the top through point b, and R1 then R2 along the bottom through point d. A galvanometer G with resistance rG and a switch connects b to d. A source of emf with internal resistance r drives current I into a and out of c. Current I2 flows along the top path and I1 along the bottom path.',
    });
    const L = 90;
    const R = 570;
    const T = 70;
    const B = 300;
    const xm = 330;
    const y = 185;
    box(svg, L, T, R, B);
    wire(svg, [
      [xm, T],
      [xm, B],
    ]);
    wire(svg, [
      [L, y],
      [30, y],
      [30, 390],
      [630, 390],
      [630, y],
      [R, y],
    ]);
    on(svg, 'rheo', [140, T], [260, T], { size: 60 });
    lab(svg, 190, T - 34, 'R_3');
    on(svg, 'R', [400, T], [520, T], { size: 60 });
    lab(svg, 460, T - 30, 'R_x');
    on(svg, 'R', [140, B], [260, B], { size: 60 });
    lab(svg, 200, B + 32, 'R_1');
    on(svg, 'R', [400, B], [520, B], { size: 60 });
    lab(svg, 460, B + 32, 'R_2');
    on(svg, 'meter', [xm, 100], [xm, 160], { letter: 'G', r: 26, fill: '#f3d9a4' });
    on(svg, 'R', [xm, 180], [xm, 230], { size: 44 });
    lab(svg, xm + 18, 205, 'r_G', { anchor: 'start' });
    on(svg, 'sw', [xm, 240], [xm, 290], { size: 40 });
    point(svg, xm, T, 'b', { dy: -20 });
    point(svg, xm, B, 'd', { dy: 24 });
    point(svg, L, y, 'a', { dx: -12, dy: 24, anchor: 'end' });
    point(svg, R, y, 'c', { dx: 12, dy: 24, anchor: 'start' });
    on(svg, 'cell', [300, 390], [260, 390]);
    plus(svg, 252, 360);
    lab(svg, 280, 428 - 6, 'emf');
    on(svg, 'R', [370, 390], [450, 390]);
    lab(svg, 410, 420, 'r');
    currentArrow(svg, 34, y - 16, 82, y - 16);
    lab(svg, 50, y - 40, 'I');
    currentArrow(svg, R + 8, y - 16, 626, y - 16);
    lab(svg, 610, y - 40, 'I');
    roundFlow(svg, [
      [L + 14, y - 10],
      [L + 14, T + 16],
      [xm - 30, T + 16],
    ]);
    roundFlow(svg, [
      [xm + 30, T + 16],
      [R - 14, T + 16],
      [R - 14, y - 10],
    ]);
    roundFlow(svg, [
      [L + 14, y + 10],
      [L + 14, B - 16],
      [xm - 30, B - 16],
    ]);
    roundFlow(svg, [
      [xm + 30, B - 16],
      [R - 14, B - 16],
      [R - 14, y + 10],
    ]);
    lab(svg, L + 30, 120, 'I_2', { anchor: 'start' });
    lab(svg, R - 30, 120, 'I_2', { anchor: 'end' });
    lab(svg, L + 30, 250, 'I_1', { anchor: 'start' });
    lab(svg, R - 30, 250, 'I_1', { anchor: 'end' });
    return svg.render();
  },

  // 21.6 Fig. 1 — charging a capacitor
  Figure_21_06_01: () => {
    const svg = new Svg({
      width: 880,
      height: 360,
      title: 'Charging a capacitor through a resistor',
      desc: '(a) A source of emf, a resistor R, a capacitor C and a switch in series; when the switch closes, current I flows clockwise and the capacitor plates acquire charges +q and −q. (b) The capacitor voltage V rises from 0 toward the emf, reaching 0.632 emf at one time constant τ = RC and coming closer at 2τ, 3τ and 4τ.',
    });
    rcCircuit(svg, { charging: true });
    svg.path('M 330 70 Q 360 20 420 30', { color: '#777777', width: 4 });
    svg.arrow(405, 28, 428, 32, { color: '#777777', width: 4, head: 16 });
    const g = rcGraph(svg, { x: 520, y: 70, w: 320, h: 210 }, { rising: true });
    note(svg, g.X(0), 30, 'V on capacitor', { size: 17 });
    val(svg, g.X(0) - 8, g.Y(1), 'emf', { anchor: 'end' });
    val(svg, g.X(0) - 8, g.Y(1 - Math.exp(-1)), '0.632 emf', { anchor: 'end' });
    caption(svg, 680, 346, '(b)');
    return svg.render();
  },

  // 21.6 Fig. 2 — discharging a capacitor
  Figure_21_06_02: () => {
    const svg = new Svg({
      width: 880,
      height: 360,
      title: 'Discharging a capacitor through a resistor',
      desc: '(a) A charged capacitor C, a resistor R and a switch in series; when the switch closes, current I flows counterclockwise as the capacitor discharges. (b) The capacitor voltage V falls from V0, reaching 0.368 V0 at one time constant τ = RC and approaching zero at 2τ, 3τ and 4τ.',
    });
    rcCircuit(svg, { charging: false });
    const g = rcGraph(svg, { x: 520, y: 70, w: 320, h: 210 }, { rising: false });
    note(svg, g.X(0), 30, 'V on capacitor', { size: 17 });
    val(svg, g.X(0) - 8, g.Y(1), 'V_0', { anchor: 'end' });
    val(svg, g.X(0) - 8, g.Y(Math.exp(-1)), '0.368V_0', { anchor: 'end' });
    caption(svg, 680, 346, '(b)');
    return svg.render();
  },

  // 21.6 Fig. 4 — a relaxation oscillator that flashes a bulb
  Figure_21_06_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 660,
      title: 'An RC circuit that makes a lamp flash periodically',
      desc: '(a) Left, charging: the lamp has a very high resistance, so current from the source flows through R and charges C. Right, discharging: once the capacitor voltage reaches the lamp threshold, the lamp’s resistance drops and the capacitor discharges through it, lighting it. (b) The capacitor voltage rises along a charging curve to the bulb threshold, then repeatedly drops quickly as the lamp flashes and recharges to the threshold, giving a sawtooth.',
    });
    const circuit = (x0, discharging) => {
      const L = x0;
      const xm = x0 + 160;
      const R = x0 + 320;
      const T = 60;
      const B = 240;
      svg.rect(discharging ? L : xm, T, 160, B - T, { fill: SHADE });
      box(svg, L, T, R, B);
      wire(svg, [
        [xm, T],
        [xm, B],
      ]);
      on(svg, 'cell', [L, 175], [L, 125]);
      plus(svg, L - 20, 110);
      plus(svg, L - 20, 190, '−');
      lab(svg, L - 26, 150, 'emf', { anchor: 'end', size: 18 });
      on(svg, 'R', [L + 40, T], [L + 120, T]);
      lab(svg, L + 80, T - 28, 'R');
      on(svg, 'C', [xm, 175], [xm, 125]);
      lab(svg, xm - 24, 150, 'C', { anchor: 'end' });
      val(svg, xm - 24, 118, '+q', { anchor: 'end' });
      val(svg, xm - 24, 184, '−q', { anchor: 'end' });
      on(svg, 'bulb', [R, 120], [R, 180], { r: 24, lit: discharging });
      on(svg, 'sw', [L + 50, B], [L + 120, B], { closed: true, size: 50 });
      if (discharging) {
        note(svg, R + 40, 150, 'Low R', { anchor: 'start' });
        roundFlow(svg, [
          [xm + 22, 125],
          [xm + 22, T + 20],
          [R - 60, T + 20],
        ]);
        roundFlow(svg, [
          [R - 22, 200],
          [R - 22, B - 18],
          [xm + 60, B - 18],
        ]);
        lab(svg, xm + 40, 98, 'I', { anchor: 'start' });
        note(svg, (L + R) / 2, B + 36, 'Discharging');
      } else {
        note(svg, R + 34, 140, 'Bulb', { anchor: 'start' });
        note(svg, R + 34, 160, 'high \\it{R}', { anchor: 'start' });
        roundFlow(svg, [
          [L + 22, 130],
          [L + 22, T + 20],
          [L + 90, T + 20],
        ]);
        roundFlow(svg, [
          [xm - 18, 205],
          [xm - 18, B - 18],
          [L + 100, B - 18],
        ]);
        lab(svg, L + 34, 108, 'I', { anchor: 'start' });
        note(svg, (L + R) / 2, B + 36, 'Charging');
      }
    };
    circuit(90, false);
    circuit(590, true);
    caption(svg, 510, 316, '(a)');

    const th = 0.85;
    const low = 0.6;
    const g = new Plot(svg, { x: 360, y: 370, w: 330, h: 220, xRange: [0, 6.4], yRange: [0, 1.1] });
    g.axes({ arrows: true });
    const pts = [];
    const tUp = -Math.log(1 - th);
    for (let k = 0; k <= 60; k += 1) {
      const t = (tUp * k) / 60;
      pts.push(g.P(t, 1 - Math.exp(-t)));
    }
    // Fast discharge through the lit bulb (time constant 0.06), then recharge
    // through R from `low` back to the threshold.
    const tauBulb = 0.06;
    const tDown = tauBulb * Math.log(th / low);
    const tRe = Math.log((1 - low) / (1 - th));
    let t0 = tUp;
    for (let cycle = 0; cycle < 4; cycle += 1) {
      for (let k = 1; k <= 8; k += 1) {
        const s = (tDown * k) / 8;
        pts.push(g.P(t0 + s, th * Math.exp(-s / tauBulb)));
      }
      t0 += tDown;
      for (let k = 1; k <= 24; k += 1) {
        const s = (tRe * k) / 24;
        pts.push(g.P(t0 + s, 1 - (1 - low) * Math.exp(-s)));
      }
      t0 += tRe;
    }
    svg.line(g.X(0), g.Y(th), g.X(6.4), g.Y(th), { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.polyline(pts, { color: COLORS.maroon, width: 3 });
    note(svg, g.X(0) - 10, g.Y(th) - 10, 'Bulb', { anchor: 'end' });
    note(svg, g.X(0) - 10, g.Y(th) + 10, 'threshold', { anchor: 'end' });
    lab(svg, g.X(0) - 14, g.Y(1.1) - 4, 'V', { anchor: 'end' });
    lab(svg, g.X(6.4) + 18, g.Y(0) + 4, 't');
    caption(svg, 525, 646, '(b)');
    return svg.render();
  },

  // 21.6 problem — a bleeder resistor
  Figure_21_06_05: () => {
    const svg = new Svg({
      width: 520,
      height: 280,
      title: 'A bleeder resistor across a capacitor',
      desc: 'An electronic circuit, drawn as a box, with a capacitor C and a bleeder resistor R_bl connected in parallel across it.',
    });
    const T = 50;
    const B = 230;
    svg.rect(40, 30, 130, 220, { fill: '#d6dcef', stroke: WIRE, width: 2 });
    note(svg, 105, 140, 'Circuit', { size: 20 });
    wire(svg, [
      [170, T],
      [440, T],
      [440, B],
      [170, B],
    ]);
    wire(svg, [
      [300, T],
      [300, B],
    ]);
    on(svg, 'C', [300, 165], [300, 115]);
    lab(svg, 276, 140, 'C', { anchor: 'end', size: 22 });
    on(svg, 'R', [440, 100], [440, 180], { size: 64 });
    lab(svg, 462, 140, 'R_{bl}', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 21.6 problem — a capacitor and resistor that keep a circuit powered briefly
  Figure_21_06_07: () => {
    const svg = new Svg({
      width: 640,
      height: 300,
      title: 'An electronic circuit with a capacitor and resistor in parallel',
      desc: 'An electronic circuit, a capacitor C = 80 microfarads and a resistor R = 250 kilohms are connected in parallel. A switch on the top wire, between the electronic circuit and the capacitor, disconnects them.',
    });
    const T = 40;
    const B = 260;
    wire(svg, [
      [105, 100],
      [105, T],
      [520, T],
      [520, B],
      [105, B],
      [105, 220],
    ]);
    svg.rect(30, 100, 160, 120, { fill: '#ffffff', stroke: WIRE, width: 2 });
    note(svg, 110, 145, 'Electronic', { size: 20 });
    note(svg, 110, 172, 'circuit', { size: 20 });
    on(svg, 'sw', [180, T], [270, T], { size: 56 });
    wire(svg, [
      [330, T],
      [330, B],
    ]);
    node(svg, 330, T);
    node(svg, 330, B);
    on(svg, 'C', [330, 175], [330, 125]);
    lab(svg, 304, 135, 'C', { anchor: 'end', size: 22 });
    val(svg, 304, 165, '80 \\rm{μF}', { anchor: 'end', size: 20 });
    on(svg, 'R', [520, 110], [520, 190], { size: 64 });
    lab(svg, 542, 135, 'R', { anchor: 'start', size: 22 });
    val(svg, 542, 165, '250 \\rm{kΩ}', { anchor: 'start', size: 20 });
    return svg.render();
  },
};
