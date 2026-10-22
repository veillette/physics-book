/**
 * Chapter 19: parallel-plate fields, equipotentials of point charges,
 * dielectrics, and capacitor networks.
 *
 * Point-charge pictures are computed, not sketched: field lines are traced
 * along E from the exact Coulomb field, and equipotentials are contours of
 * V = Σ kq/r. Each charge sends out a number of lines proportional to its
 * charge, spaced evenly in angle where they leave it, so the line density
 * shows the field strength. Field lines are blue and equipotentials green, as
 * the captions describe.
 */
import { CAPACITOR, cell, wire } from './circuit.js';
import {
  ROD_19,
  capsule,
  charge,
  chargeMarks,
  drawConductor,
  drawRod,
  equipotentials,
  plate,
  pointField,
  pointPotential,
  rodCharges,
  solveLaplace,
  trace,
} from './fields18to19.js';
import { COLORS, Svg } from './svg.js';

const FIELD = COLORS.blue;
const EQUIP = '#2e9a5e';
const METAL = '#cfd3da';
const METAL_EDGE = '#8a9099';
const DIELECTRIC = '#f3dc8a';
const MOLECULE = '#a9dcc2';
const MOLECULE_EDGE = '#3c9a6c';
const GOLD = '#e3b341';
// Ion fill and outline colors for the membrane figure.
const ION = {
  na: ['#c9e4e1', '#3a9a96'],
  k: ['#f7b8a6', '#e07a66'],
  cl: ['#eeeeee', '#a8a8a8'],
};

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 28, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 18, math: false });
}

function sign(svg, x, y, s, { size = 26, color = COLORS.black } = {}) {
  svg.text(x, y, s, { size, math: false, color, halo: false });
}

/** Deterministic pseudo-random numbers (Park–Miller). */
function rng(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** Round ion of the given kind, with an optional label inside. */
function ion(svg, x, y, kind, { r = 22, label, stroke } = {}) {
  const [fill, edge] = ION[kind];
  svg.circle(x, y, r, { fill, stroke: stroke || edge, width: stroke ? 3 : 1.5 });
  if (label) svg.text(x, y, label, { size: 22, math: false, halo: false });
}

/** Horizontal force arrow with its label at the tail end. */
function forceArrow(svg, x1, x2, y, label, { gap = 10 } = {}) {
  svg.arrow(x1, y, x2, y, { color: COLORS.black, width: 1.6, head: 12 });
  const left = x2 > x1;
  note(svg, x1 + (left ? -gap : gap), y, label, { anchor: left ? 'end' : 'start', size: 24 });
}

/** Vertical metal plate from y1 to y2 with its left edge at x. */
function metalPlate(svg, x, y1, y2, { w = 26 } = {}) {
  svg.rect(x, y1, w, y2 - y1, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
}

/** A traced line with a large arrowhead pointing along the field at fraction `at`. */
function fieldLine(svg, pts, { reverse = false, at = 0.5, color = FIELD, width = 1.8 } = {}) {
  if (pts.length < 10) return;
  svg.polyline(pts, { color, width });
  const k = Math.max(5, Math.min(pts.length - 6, Math.floor(pts.length * at)));
  let P = pts[k - 5];
  let Q = pts[k + 5];
  if (reverse) [P, Q] = [Q, P];
  svg.arrow(...P, ...Q, { color, width, head: 14 });
}

/** Horizontal field line from x1 to x2 at y with its arrowhead in the middle. */
function hLine(svg, x1, x2, y, { color = FIELD } = {}) {
  svg.line(x1, y, x2, y, { color, width: 2 });
  const m = (x1 + x2) / 2;
  const d = x2 > x1 ? 1 : -1;
  svg.arrow(m - 15 * d, y, m + 15 * d, y, { color, width: 2.2, head: 18 });
}

/** Fringe line between plate ends, bowing away from the plates by `bow`. */
function fringe(svg, x1, x2, y, bow, { color = FIELD } = {}) {
  const m = (x1 + x2) / 2;
  svg.path(
    `M ${x1} ${y} C ${x1 + (m - x1) * 0.5} ${y} ${m - (m - x1) * 0.4} ${y + bow} ${m} ${y + bow} S ${x2 - (x2 - m) * 0.5} ${y} ${x2} ${y}`,
    { color, width: 2 }
  );
  const d = x2 > x1 ? 1 : -1;
  svg.arrow(m - 15 * d, y + bow, m + 15 * d, y + bow, { color, width: 2.2, head: 18 });
}

/**
 * Field lines of point charges. Each positive charge sends out `per`·q lines
 * evenly spaced in angle; each negative charge receives `per`·|q| lines, of
 * which only those arriving from far away are drawn (the rest are the lines
 * already drawn from the positive charges).
 */
function pointFieldLines(svg, charges, box, { per = 4, at = 0.5, offset = 0.5, r0 = 14 } = {}) {
  const E = pointField(charges);
  const near = (x, y, s) =>
    charges.some(c => Math.sign(c.q) === s && Math.hypot(x - c.x, y - c.y) < 10);
  for (const c of charges) {
    const n = Math.round(per * Math.abs(c.q));
    for (let k = 0; k < n; k += 1) {
      const a = (2 * Math.PI * (k + offset)) / n;
      const x = c.x + r0 * Math.cos(a);
      const y = c.y + r0 * Math.sin(a);
      if (c.q > 0) {
        const pts = trace(E, x, y, 1, { box, stop: (px, py) => near(px, py, -1), step: 2 });
        fieldLine(svg, pts, { at, color: FIELD, width: 1.8 });
      } else {
        const pts = trace(E, x, y, -1, { box, stop: (px, py) => near(px, py, 1), step: 2 });
        if (near(...pts[pts.length - 1], 1)) continue;
        fieldLine(svg, pts, { at, color: FIELD, width: 1.8, reverse: true });
      }
    }
  }
}

/** First point below (x, y) where fn crosses `level`, scanning downward. */
function crossingBelow(fn, x, y, level) {
  let prev = fn(x, y);
  for (let yy = y + 1; yy < y + 600; yy += 1) {
    const v = fn(x, yy);
    if ((prev - level) * (v - level) <= 0) return yy;
    prev = v;
  }
  return y;
}

/** Capacitor on a straight wire from P to Q (the wire is drawn first). */
function cap(svg, P, Q, { plate: len = 44, gap = 14 } = {}) {
  const L = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const ux = (Q[0] - P[0]) / L;
  const uy = (Q[1] - P[1]) / L;
  const C = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  svg.line(
    C[0] - (ux * gap) / 2,
    C[1] - (uy * gap) / 2,
    C[0] + (ux * gap) / 2,
    C[1] + (uy * gap) / 2,
    {
      color: '#ffffff',
      width: 7,
    }
  );
  for (const s of [-1, 1]) {
    const E = [C[0] + (s * ux * gap) / 2, C[1] + (s * uy * gap) / 2];
    svg.line(
      E[0] + (uy * len) / 2,
      E[1] - (ux * len) / 2,
      E[0] - (uy * len) / 2,
      E[1] + (ux * len) / 2,
      {
        color: CAPACITOR,
        width: 4.5,
      }
    );
  }
}

function seg(svg, ...pts) {
  wire(svg, pts);
}

/** Curved gray arrow from one panel to the next. */
function stepArrow(svg, x1, y1, x2, y2, bend) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - bend;
  svg.path(`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`, { color: '#777777', width: 3 });
  const a = Math.atan2(y2 - my, x2 - mx);
  svg.arrow(
    x2 - Math.cos(a) * 22,
    y2 - Math.sin(a) * 22,
    x2 + Math.cos(a) * 4,
    y2 + Math.sin(a) * 4,
    {
      color: '#777777',
      width: 3,
      head: 16,
    }
  );
}

export default {
  // 19.1 Fig. 1 — a charge between plates is like a mass rolling downhill
  Figure_19_01_01: () => {
    const svg = new Svg({
      width: 700,
      height: 770,
      title: 'A charge accelerated by an electric field, compared with a mass rolling downhill',
      desc: 'Top: a positive charge +q starts at point A near a positively charged plate on the left and is pushed by the uniform field, drawn as blue field lines running right, toward point B at a hole in the negatively charged plate on the right. The electric potential energy it loses becomes kinetic energy: ΔPE_elec = ΔKE. Bottom: a mass m rolling down a grassy slope converts gravitational potential energy to kinetic energy in the same way: ΔPE_grav = ΔKE.',
    });
    const [xl, xr] = [60, 650];
    svg.add(
      '<defs><linearGradient id="plate19" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c4c4cc"/><stop offset="0.5" stop-color="#ececf0"/><stop offset="1" stop-color="#b4b4be"/></linearGradient></defs>'
    );
    svg.rect(6, 50, xl - 6, 500, { fill: 'url(#plate19)', stroke: METAL_EDGE, width: 1.2 });
    svg.rect(xr, 50, 50, 252, { fill: 'url(#plate19)', stroke: METAL_EDGE, width: 1.2 });
    svg.rect(xr, 346, 50, 204, { fill: 'url(#plate19)', stroke: METAL_EDGE, width: 1.2 });
    fringe(svg, xl, xr, 104, -40);
    for (const y of [184, 254, 372, 464]) hLine(svg, xl, xr, y);
    fringe(svg, xl, xr, 522, 40);
    for (const y of [104, 184, 254, 372, 464, 522]) {
      sign(svg, 33, y, '+');
      sign(svg, xr + 25, y, '−');
    }
    svg.circle(200, 324, 26, { fill: '#f2a3ae', stroke: '#c0566a', width: 1.5 });
    lab(svg, 200, 324, '+q', { size: 24, halo: false });
    svg.arrow(228, 324, xr, 324, { color: COLORS.black, width: 1.8, head: 14 });
    note(svg, 200, 282, 'A', { size: 26 });
    note(svg, xr - 18, 286, 'B', { size: 26 });
    note(svg, 520, 24, 'ΔPE_{elec} = ΔKE', { size: 26 });
    // The hill.
    svg.path(
      'M 0 638 C 60 620 140 615 200 640 C 270 668 300 715 360 735 C 450 742 600 738 700 742 L 700 770 L 0 770 Z',
      { color: 'none', width: 0, fill: '#4a8a5c' }
    );
    for (const [x, y] of [
      [72, 626],
      [410, 739],
      [460, 739],
      [672, 740],
    ])
      svg.path(
        `M ${x - 10} ${y} Q ${x - 4} ${y - 14} ${x - 14} ${y - 22} M ${x} ${y} Q ${x + 2} ${y - 16} ${x + 10} ${y - 24} M ${x + 8} ${y} Q ${x + 14} ${y - 10} ${x + 22} ${y - 12}`,
        {
          color: '#4a8a5c',
          width: 2,
        }
      );
    svg.circle(205, 664 - 24, 23, { fill: '#f4a77e', stroke: '#c46a3c', width: 1.5 });
    lab(svg, 205, 640, 'm', { size: 24, halo: false });
    svg.arrow(232, 652, 318, 690, { color: COLORS.black, width: 1.8, head: 14 });
    note(svg, 565, 668, 'ΔPE_{grav} = ΔKE', { size: 26 });
    return svg.render();
  },

  // 19.1 Fig. 3 — an electron gun
  Figure_19_01_03: () => {
    const svg = new Svg({
      width: 540,
      height: 800,
      title: 'An electron gun',
      desc: 'Two vertical metal plates. Plate A on the left is negative and plate B on the right is positive, with a small hole in its middle. The electric field lines run straight from B to A, pointing left, and bow outward at the top and bottom ends. An electron e⁻ starts next to plate A, is accelerated to the right through the hole in B, and leaves with kinetic energy KE = qV.',
    });
    const ax = 20;
    const bx = 300;
    const w = 26;
    metalPlate(svg, ax, 10, 790, { w });
    metalPlate(svg, bx, 30, 370, { w });
    metalPlate(svg, bx, 410, 770, { w });
    const ys = [104, 186, 268, 350, 430, 512, 594, 676];
    for (const y of ys) hLine(svg, bx, ax + w, y);
    fringe(svg, bx, ax + w, 44, -30);
    fringe(svg, bx, ax + w, 744, 30);
    for (const y of [44, ...ys, 744]) {
      sign(svg, ax + w / 2, y, '−');
      sign(svg, bx + w / 2, y, '+');
    }
    svg.circle(84, 390, 15, { fill: '#a98bd0', stroke: '#6b4f99', width: 1.5 });
    svg.text(84, 390, 'e^−', { size: 18, halo: false });
    svg.arrow(104, 390, 520, 390, { color: COLORS.black, width: 2, head: 16 });
    lab(svg, 440, 360, '\\rm{KE} = qV');
    lab(svg, ax + w / 2, 340, '\\rm{A}');
    lab(svg, bx + w / 2, 470, '\\rm{B}', { halo: false });
    return svg.render();
  },

  // 19.2 Fig. 1 — E = V/d between parallel plates
  Figure_19_02_01: () => {
    const svg = new Svg({
      width: 470,
      height: 800,
      title: 'Uniform field between parallel conducting plates',
      desc: 'Two vertical plates a distance d apart. Plate A on the left is positive and plate B on the right is negative, with potential difference ΔV = V_AB between them. Evenly spaced field lines E run straight from A to B and bow outward at the top and bottom ends. A charge q moved from A to B has work W = qV_AB done on it by the field, and the field strength is E = V_AB/d.',
    });
    const ax = 20;
    const bx = 240;
    const w = 26;
    metalPlate(svg, ax, 60, 730, { w });
    metalPlate(svg, bx, 60, 730, { w });
    const ys = [150, 225, 290, 360, 430, 500, 570, 640];
    for (const y of ys) hLine(svg, ax + w, bx, y);
    fringe(svg, ax + w, bx, 90, -30);
    fringe(svg, ax + w, bx, 700, 30);
    for (const y of [90, ...ys, 700]) {
      sign(svg, ax + w / 2, y, '+');
      sign(svg, bx + w / 2, y, '−');
    }
    lab(svg, (ax + bx + w) / 2, 26, 'ΔV = V_{AB}');
    lab(svg, (ax + bx + w) / 2, 116, '**E**');
    svg.circle(72, 325, 16, { fill: '#e3b341', stroke: '#a07a1c', width: 1.5 });
    svg.text(72, 325, 'q', { size: 20, halo: false });
    svg.arrow(92, 325, bx - 4, 325, { color: COLORS.black, width: 2, head: 15 });
    lab(svg, ax + w / 2, 325, '\\rm{A}', { halo: false });
    lab(svg, bx + w / 2, 325, '\\rm{B}', { halo: false });
    lab(svg, bx + w + 18, 325, 'W = qV_{AB}', { anchor: 'start' });
    svg.path('M 322 470 Q 280 444 214 462', { color: COLORS.black, width: 1.6 });
    svg.arrow(226, 458, 200, 466, { color: COLORS.black, width: 1.6, head: 12 });
    lab(svg, 330, 470, 'E = ', { anchor: 'start' });
    lab(svg, 418, 448, 'V_{AB}');
    svg.line(392, 472, 446, 472, { color: COLORS.text, width: 1.6 });
    lab(svg, 418, 498, 'd');
    svg.arrow(ax + w / 2, 765, bx + w / 2, 765, {
      color: COLORS.black,
      width: 1.6,
      head: 12,
      start: true,
    });
    for (const x of [ax + w / 2, bx + w / 2])
      svg.line(x, 750, x, 780, { color: COLORS.black, width: 1.4 });
    lab(svg, (ax + bx + w) / 2, 765, 'd');
    return svg.render();
  },

  // 19.4 Fig. 1 — a point charge with its field lines and equipotentials
  Figure_19_04_01: () => {
    const svg = new Svg({
      width: 440,
      height: 440,
      title: 'Field lines and equipotentials of a point charge',
      desc: 'A positive point charge Q at the center. Twelve straight field lines, in blue, point radially outward. Four green equipotential circles surround the charge, drawn for equal steps of potential, so they are closest together near the charge, where the field is strongest. The field lines cross every equipotential at right angles.',
    });
    const c = [220, 220];
    // V ∝ 1/r: circles for V = 1, 2, 3, 4 units.
    for (const V of [1, 2, 3, 4])
      svg.circle(...c, 196 / V, { fill: 'none', stroke: EQUIP, width: 2.4 });
    for (let k = 0; k < 12; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 12;
      const [ux, uy] = [Math.cos(a), Math.sin(a)];
      svg.line(c[0] + 16 * ux, c[1] + 16 * uy, c[0] + 212 * ux, c[1] + 212 * uy, {
        color: FIELD,
        width: 2,
      });
      svg.arrow(c[0] + 120 * ux, c[1] + 120 * uy, c[0] + 150 * ux, c[1] + 150 * uy, {
        color: FIELD,
        width: 2.2,
        head: 18,
      });
    }
    charge(svg, ...c, '', 1, { r: 13 });
    lab(svg, c[0] + 24, c[1] + 22, 'Q', { anchor: 'start' });
    return svg.render();
  },

  // 19.4 Fig. 2 — equal and opposite charges
  Figure_19_04_02: () => {
    const W = 680;
    const H = 460;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field lines and equipotentials of two equal and opposite charges',
      desc: 'A negative charge on the left and an equal positive charge on the right. Computed field lines, in blue, leave the positive charge and curve around to end on the negative charge; the outermost ones loop wide or leave the picture. Computed green equipotentials are closed loops around each charge, nearly circular close to it and flattened toward the middle, plus a straight zero-potential line midway between the charges. The equipotentials cross the field lines at right angles. The potential is most positive near the positive charge and most negative near the negative charge.',
    });
    const charges = [
      { x: 240, y: 230, q: -1 },
      { x: 440, y: 230, q: 1 },
    ];
    const box = { x: 4, y: 4, w: W - 8, h: H - 8 };
    const V = pointPotential(
      charges.map(c => ({ ...c, q: c.q * 100 })),
      { core: 8 }
    );
    const levels = [0.35, 0.6, 1, 1.6, 2.6, 4.2];
    equipotentials(svg, V, box, [...levels, 0, ...levels.map(l => -l)], { color: EQUIP, width: 2 });
    pointFieldLines(svg, charges, box, { per: 16, at: 0.5 });
    for (const c of charges) charge(svg, c.x, c.y, '', c.q, { r: 13 });
    return svg.render();
  },

  // 19.4 Fig. 3 — equipotentials measured around two equal negative charges
  Figure_19_04_03: () => {
    const W = 1240;
    const H = 560;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials and field lines of two equal negative charges',
      desc: '(a) Equipotential lines as they might be measured in the laboratory: a small circle at −10 V around each of two points, a dumbbell-shaped line at −5 V enclosing both, and a larger oval at −2 V around everything. (b) The same equipotentials with the field lines drawn perpendicular to them. The field lines come in from all directions and end on two equal negative charges, one at the center of each −10 V circle; none run between the charges.',
    });
    // Two charges 2a apart with V = −K/r1 − K/r2. K = 2.6a puts the saddle
    // between them at −5.2 V, so the −5 V line just encloses both charges.
    const a = 100;
    const K = 2.6 * a;
    const cy = 260;
    for (const [k, cx] of [
      [0, 310],
      [1, 930],
    ]) {
      const charges = [
        { x: cx - a, y: cy, q: -1 },
        { x: cx + a, y: cy, q: -1 },
      ];
      const V = pointPotential(
        charges.map(c => ({ ...c, q: c.q * K })),
        { core: 6 }
      );
      const box = { x: cx - 306, y: 6, w: 612, h: 516 };
      equipotentials(svg, V, box, [-10, -5, -2], { color: EQUIP, width: 2.4 });
      if (k === 0) {
        // Labels sit on their lines; the white halo opens a gap in the line.
        for (const c of charges) {
          const y10 = crossingBelow(V, c.x, c.y + 8, -10);
          note(svg, c.x, y10, '−10 V', { size: 19 });
          note(svg, c.x, crossingBelow(V, c.x, y10 + 4, -5), '−5 V', { size: 19 });
        }
        note(svg, cx, crossingBelow(V, cx, cy, -2), '−2 V', { size: 19 });
        caption(svg, cx, 546, '(a)');
      } else {
        pointFieldLines(svg, charges, box, { per: 20, at: 0.45, offset: 0.5 });
        for (const c of charges) charge(svg, c.x, c.y, '', -1, { r: 12 });
        caption(svg, cx, 546, '(b)');
      }
    }
    return svg.render();
  },

  // 19.4 Fig. 4 — field and equipotentials between two plates
  Figure_19_04_04: () => {
    const svg = new Svg({
      width: 470,
      height: 600,
      title: 'Field and equipotential lines between two metal plates',
      desc: 'Plate A on the left is positive at 100 V and plate B on the right is negative at 0 V. Blue field lines run straight across from A to B, evenly spaced, and bow outward at the ends. Green equipotential lines at 75 V, 50 V and 25 V are straight, evenly spaced, and parallel to the plates, crossing the field lines at right angles.',
    });
    const ax = 30;
    const bx = 400;
    const w = 26;
    const T = 70;
    const B = 560;
    const x0 = ax + w;
    const x1 = bx;
    [75, 50, 25].forEach((v, k) => {
      const x = x0 + ((x1 - x0) * (k + 1)) / 4;
      svg.line(x, T - 20, x, B + 20, { color: EQUIP, width: 2.4 });
      note(svg, x, T - 36, `${v} V`);
    });
    metalPlate(svg, ax, T, B, { w });
    metalPlate(svg, bx, T, B, { w });
    const ys = [];
    for (let y = T + 60; y < B - 40; y += 54) ys.push(y);
    for (const y of ys) hLine(svg, x0, x1, y);
    fringe(svg, x0, x1, T + 20, -34);
    fringe(svg, x0, x1, B - 20, 34);
    for (const y of [T + 20, ...ys, B - 20]) {
      sign(svg, ax + w / 2, y, '+');
      sign(svg, bx + w / 2, y, '−');
    }
    note(svg, ax + w / 2, T - 36, '100 V');
    note(svg, bx + w / 2, T - 36, '0 V');
    return svg.render();
  },

  // 19.4 problem — two equal positive charges
  Figure_19_04_05: () => {
    const W = 680;
    const H = 440;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field lines of two equal positive charges',
      desc: 'Two equal positive charges +q side by side. Computed field lines leave each charge in all directions and curve away from the other charge; no line runs between them, and midway there is a point where the field is zero.',
    });
    const charges = [
      { x: 220, y: 220, q: 1 },
      { x: 460, y: 220, q: 1 },
    ];
    pointFieldLines(svg, charges, { x: 4, y: 4, w: W - 8, h: H - 8 }, { per: 18, at: 0.4 });
    for (const c of charges) charge(svg, c.x, c.y, '', 1, { r: 14 });
    lab(svg, 220, 254, '+q');
    lab(svg, 460, 254, '+q');
    return svg.render();
  },

  // 19.4 problem — q1 = −4q and q2 = +q
  Figure_19_04_06: () => {
    const W = 680;
    const H = 440;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field lines near two charges q1 and q2',
      desc: 'Two charges, q1 on the left and q2 on the right. Computed field lines point away from q2 and toward q1. Four times as many lines end on q1 as leave q2: every line leaving q2 curves over to end on q1, and the rest come in to q1 from far away.',
    });
    const charges = [
      { x: 240, y: 220, q: -4 },
      { x: 440, y: 220, q: 1 },
    ];
    pointFieldLines(svg, charges, { x: 4, y: 4, w: W - 8, h: H - 8 }, { per: 5, at: 0.5 });
    charge(svg, 240, 220, '', -1, { r: 16 });
    charge(svg, 440, 220, '', 1, { r: 13 });
    lab(svg, 240, 258, 'q_1');
    lab(svg, 440, 254, 'q_2');
    return svg.render();
  },

  // 19.4 problem — a negatively charged oblong conductor
  Figure_19_04_07: () => {
    const W = 760;
    const H = 250;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'A negatively charged conductor',
      desc: 'A long conductor with flat sides and rounded ends carries negative charge, shown as minus signs on its surface. The charge is computed for a conductor at uniform potential, so the signs crowd together around the curved ends and are spread out along the flat sides.',
    });
    const poly = capsule(W / 2, H / 2, 700, 190);
    const pad = 320;
    const sol = solveLaplace({
      box: { x: -pad, y: -pad, w: W + 2 * pad, h: H + 2 * pad },
      step: 3,
      conductors: [{ poly, V: -1 }],
      outer: () => 0,
      radius: (H + 2 * pad) / 2 - 6,
    });
    drawConductor(svg, poly, { fill: GOLD });
    chargeMarks(svg, poly, sol.E, { count: 26, inset: 16, size: 26 });
    return svg.render();
  },

  // 19.4 problem — two tilted plates
  Figure_19_04_08: () => {
    const svg = new Svg({
      width: 600,
      height: 420,
      title: 'Two conducting plates, closer together at one end',
      desc: 'Two flat conducting plates seen edge on. The top plate tilts upward to the right; the bottom plate is nearly horizontal. They are closest together at the left end and farthest apart at the right. The top plate is positive and the bottom plate has an equal amount of negative charge.',
    });
    const top = plate([40, 250], [560, 40], 36);
    const bottom = plate([40, 330], [580, 370], 36);
    drawConductor(svg, top, { fill: METAL });
    drawConductor(svg, bottom, { fill: METAL });
    return svg.render();
  },

  // 19.4 problem — a nonuniformly charged insulating rod
  Figure_19_04_09: () => {
    const svg = new Svg({
      width: 480,
      height: 480,
      title: 'A charged insulating rod',
      desc: 'A diagonal insulating rod marked with plus signs. Most of the positive charge is crowded near its upper-right end, a few charges are in the middle, and one is at the lower-left end.',
    });
    const [x1, y1, x2, y2] = [40, 450, 440, 40];
    drawRod(svg, x1, y1, x2, y2, rodCharges(x1, y1, x2, y2, ROD_19));
    return svg.render();
  },

  // 19.5 Fig. 2 — field lines in a parallel-plate capacitor
  Figure_19_05_02: () => {
    const svg = new Svg({
      width: 400,
      height: 720,
      title: 'Field lines in a parallel-plate capacitor',
      desc: 'Two vertical plates connected to a battery: the left plate to the positive terminal, carrying charge +Q, and the right plate to the negative terminal, carrying −Q. Evenly spaced field lines start on the positive charges and end on the negative charges, bowing outward at the ends. The field strength E is proportional to Q.',
    });
    const lx = 70;
    const rx = 290;
    const w = 22;
    const T = 50;
    const B = 520;
    metalPlate(svg, lx, T, B, { w });
    metalPlate(svg, rx, T, B, { w });
    const ys = [];
    for (let y = T + 50; y <= B - 40; y += 30) ys.push(y);
    for (const y of ys) hLine(svg, lx + w, rx, y);
    fringe(svg, lx + w, rx, T + 18, -26);
    fringe(svg, lx + w, rx, B - 14, 26);
    for (const y of [T + 18, ...ys, B - 14]) {
      sign(svg, lx + w / 2, y, '+', { size: 17 });
      sign(svg, rx + w / 2, y, '−', { size: 17 });
    }
    lab(svg, lx + w / 2, T - 24, '+Q');
    lab(svg, rx + w / 2, T - 24, '−Q');
    lab(svg, (lx + rx + w) / 2, B + 34, 'E ∝ Q');
    const yb = 650;
    seg(svg, [lx + w / 2, B], [lx + w / 2, yb], [rx + w / 2, yb], [rx + w / 2, B]);
    svg.line(180, yb, 220, yb, { color: '#ffffff', width: 7 });
    cell(svg, [235, yb], [165, yb], { gap: 14, long: 64, short: 32 });
    note(svg, 160, yb - 44, '+', { size: 22 });
    note(svg, 240, yb - 44, '−', { size: 22 });
    note(svg, 200, yb + 50, 'battery');
    return svg.render();
  },

  // 19.5 Fig. 5 — a dielectric between the plates
  Figure_19_05_05: () => {
    const svg = new Svg({
      width: 680,
      height: 1060,
      title: 'Polarization of a dielectric in a capacitor',
      desc: '(a) Between a plate with charge +Q on the left and a plate with −Q on the right, the molecules of the dielectric are polarized: each oval molecule has its negative end toward the positive plate and its positive end toward the negative plate. The result is a layer of negative charge on the dielectric surface facing the positive plate and positive charge on the surface facing the negative plate. (b) Field lines leave the +Q plate. Some cross the whole gap; the others end on the negative surface charge of the dielectric, and matching lines start again on its positive surface charge and end on the −Q plate. Fewer lines cross the dielectric, so the field inside it is weaker.',
    });
    // (a)
    {
      const T = 80;
      const B = 500;
      metalPlate(svg, 30, T, B, { w: 30 });
      metalPlate(svg, 620, T, B, { w: 30 });
      for (let y = T + 25; y < B; y += 38) {
        sign(svg, 45, y, '+');
        sign(svg, 635, y, '−');
      }
      lab(svg, 45, T - 26, '+Q');
      lab(svg, 635, T - 26, '−Q');
      const rows = 11;
      for (let j = 0; j < rows; j += 1) {
        const y = 110 + j * 34;
        const odd = j % 2 === 1;
        const n = odd ? 4 : 5;
        const x0 = odd ? 216 : 176;
        for (let i = 0; i < n; i += 1) {
          const x = x0 + i * 80;
          svg.ellipse(x, y, 40, 16, { fill: MOLECULE, stroke: MOLECULE_EDGE, width: 1.5 });
          sign(svg, x - 20, y, '−', { size: 17 });
          sign(svg, x + 20, y, '+', { size: 17 });
        }
      }
      svg.leader(370, 46, 342, 92, { bend: 0.4, width: 1.4 });
      note(svg, 380, 46, 'Polarized molecule', { anchor: 'start' });
      svg.leader(110, 560, 150, 452, { bend: 0.4, width: 1.4 });
      note(svg, 30, 580, 'Negative charge on surface', { anchor: 'start' });
      svg.leader(560, 560, 516, 452, { bend: -0.4, width: 1.4 });
      note(svg, 650, 580, 'Positive charge on surface', { anchor: 'end' });
      caption(svg, 340, 622, '(a)');
    }
    // (b)
    {
      const T = 660;
      const B = 1010;
      const lx = 30;
      const rx = 620;
      const w = 30;
      svg.rect(130, T + 6, 420, B - T - 12, { fill: DIELECTRIC, stroke: '#d4b54a', width: 1.2 });
      metalPlate(svg, lx, T, B, { w });
      metalPlate(svg, rx, T, B, { w });
      for (let y = T + 20; y < B; y += 38) {
        sign(svg, lx + w / 2, y, '+');
        sign(svg, rx + w / 2, y, '−');
      }
      lab(svg, lx + w / 2, T - 24, '+Q');
      lab(svg, rx + w / 2, T - 24, '−Q');
      for (let k = 0; k < 9; k += 1) {
        const y = T + 20 + k * 38.5;
        if (k % 2 === 0) hLine(svg, lx + w, rx, y);
        else {
          hLine(svg, lx + w, 130, y);
          hLine(svg, 550, rx, y);
          sign(svg, 152, y, '−', { size: 22 });
          sign(svg, 528, y, '+', { size: 22 });
        }
      }
      caption(svg, 340, 1046, '(b)');
    }
    return svg.render();
  },

  // 19.5 question — ions on either side of a cell membrane
  Figure_19_05_08: () => {
    const W = 1000;
    const H = 700;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Ion separation across a cell membrane',
      desc: 'A curved cell membrane separates the outside of a cell, at left, from the inside, at right. Outside there are many sodium ions, Na+, and chloride ions, Cl−; inside there are many potassium ions, K+, with fewer of the others. The membrane is permeable to K+ and Cl− but not to Na+. K+ diffuses out of the cell and Cl− diffuses in, leaving a layer of positive charge on the outer surface of the membrane and negative charge on the inner surface. The resulting Coulomb force opposes further diffusion: it pushes K+ back in and Cl− back out, and it pulls Na+ inward, which the membrane blocks. A voltage is set up across the membrane.',
    });
    // The membrane is an annulus about a center off to the lower right.
    const [cx, cy] = [1150, 640];
    const [r1, r2] = [655, 735];
    svg.add(
      `<defs><linearGradient id="out19" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fb4d6"/><stop offset="0.6" stop-color="#d5dbe8"/></linearGradient><radialGradient id="in19" cx="${cx}" cy="${cy}" r="${r1}" gradientUnits="userSpaceOnUse"><stop offset="0.5" stop-color="#f4c97c"/><stop offset="1" stop-color="#fbe7c2"/></radialGradient></defs>`
    );
    svg.rect(0, 0, W, H, { fill: 'url(#out19)' });
    svg.circle(cx, cy, r1, { fill: 'url(#in19)' });
    svg.add(
      `<path d="M ${cx - r2} ${cy} a ${r2} ${r2} 0 1 0 ${2 * r2} 0 a ${r2} ${r2} 0 1 0 ${-2 * r2} 0 Z M ${cx - r1} ${cy} a ${r1} ${r1} 0 1 0 ${2 * r1} 0 a ${r1} ${r1} 0 1 0 ${-2 * r1} 0 Z" fill="#f2a6c4" fill-rule="evenodd" stroke="#e0457b" stroke-width="2" stroke-dasharray="3 3"/>`
    );
    // Keep ions clear of the labels, the force arrows and the labeled ions.
    const clear = [
      [30, 195, 425, 292],
      [265, 300, 425, 348],
      [610, 378, 995, 470],
      [830, 172, 980, 228],
      [15, 582, 370, 695],
      [780, 0, 1000, 48],
    ];
    const labeled = [
      [350, 145, 'na', 'Na^+'],
      [740, 340, 'k', 'K^+'],
      [345, 447, 'cl', 'Cl^−'],
    ];
    const rand = rng(1905);
    for (let y = 30; y < H; y += 50) {
      for (let x = 25 + ((y / 50) % 2) * 25; x < W; x += 52) {
        const px = x + (rand() - 0.5) * 18;
        const py = y + (rand() - 0.5) * 18;
        const p = rand();
        const kindRoll = rand();
        const d = Math.hypot(px - cx, py - cy);
        if (d > r1 - 40 && d < r2 + 40) continue;
        if (clear.some(([a, b, c, e]) => px > a && px < c && py > b && py < e)) continue;
        if (labeled.some(([lx, ly]) => Math.hypot(px - lx, py - ly) < 52)) continue;
        let kind;
        if (d > r2) {
          if (p < 0.3 || px < 110) continue;
          if (py < 330) kind = kindRoll < 0.78 ? 'na' : 'k';
          else kind = kindRoll < 0.85 ? 'cl' : 'na';
        } else {
          if (p < 0.12) continue;
          if (kindRoll < 0.6) kind = 'k';
          else if (kindRoll < 0.8) kind = 'na';
          else kind = 'cl';
          if (py > 470 && kindRoll > 0.45) kind = 'cl';
        }
        ion(svg, px, py, kind);
      }
    }
    // Surface charge: + on the outer face, − on the inner face.
    for (let a = 186; a <= 268; a += 7) {
      const t = (a * Math.PI) / 180;
      for (const [r, s] of [
        [r2 + 18, '+'],
        [r1 - 18, '−'],
      ]) {
        const [x, y] = [cx + r * Math.cos(t), cy + r * Math.sin(t)];
        if (y > 20 && y < H - 10) sign(svg, x, y, s, { size: 24 });
      }
    }
    for (const [x, y, kind, label] of labeled) {
      ion(svg, x, y, kind, { r: 26, label, stroke: kind === 'k' ? '#c62828' : undefined });
    }
    // K+ leaks out and Cl− leaks in.
    svg.path('M 718 326 C 640 270 560 230 525 180', { color: COLORS.black, width: 1.8 });
    svg.arrow(533, 192, 522, 174, { color: COLORS.black, width: 1.8, head: 12 });
    svg.path('M 372 462 C 420 520 520 500 540 462', { color: COLORS.black, width: 1.8 });
    svg.arrow(535, 474, 545, 455, { color: COLORS.black, width: 1.8, head: 12 });
    forceArrow(svg, 275, 410, 224, 'Coulomb force');
    forceArrow(svg, 215, 345, 270, 'Diffusion');
    forceArrow(svg, 840, 975, 404, 'Coulomb force');
    forceArrow(svg, 770, 640, 448, 'Diffusion');
    forceArrow(svg, 175, 40, 608, 'Coulomb force');
    forceArrow(svg, 195, 325, 662, 'Diffusion');
    note(svg, 345, 324, 'Outside', { size: 26, weight: 'bold' });
    note(svg, 905, 200, 'Inside', { size: 26, weight: 'bold' });
    note(svg, 905, 24, 'Membrane', { size: 24 });
    svg.squiggle(840, 26, 708, 92, { amp: 6 });
    return svg.render();
  },

  // 19.6 Fig. 3 — reducing a series-parallel capacitor network
  Figure_19_06_03: () => {
    const svg = new Svg({
      width: 940,
      height: 300,
      title: 'Reducing a combination of capacitors',
      desc: '(a) C1 = 1 μF and C2 = 5 μF in series on the left branch, in parallel with C3 = 8 μF on the right branch. (b) C1 and C2 are replaced by their series equivalent C_S, which is in parallel with C3 = 8 μF. (c) The single total capacitance C_tot = C_S + C_3.',
    });
    const T = 50;
    const B = 230;
    const box = (L, R) => seg(svg, [L, T], [R, T], [R, B], [L, B], [L, T]);
    // (a)
    box(70, 200);
    cap(svg, [70, T], [70, 140]);
    cap(svg, [70, 140], [70, B]);
    cap(svg, [200, T], [200, B]);
    lab(svg, 40, 95, 'C_1', { anchor: 'end' });
    note(svg, 100, 95, '1 μF', { anchor: 'start' });
    lab(svg, 40, 185, 'C_2', { anchor: 'end' });
    note(svg, 100, 185, '5 μF', { anchor: 'start' });
    lab(svg, 230, 125, 'C_3', { anchor: 'start' });
    note(svg, 230, 152, '8 μF', { anchor: 'start' });
    caption(svg, 135, 280, '(a)');
    stepArrow(svg, 230, 40, 360, 40, 40);
    // (b)
    box(400, 540);
    cap(svg, [400, T], [400, B]);
    cap(svg, [540, T], [540, B]);
    lab(svg, 370, 140, 'C_S', { anchor: 'end' });
    lab(svg, 570, 125, 'C_3', { anchor: 'start' });
    note(svg, 570, 152, '8 μF', { anchor: 'start' });
    caption(svg, 470, 280, '(b)');
    stepArrow(svg, 580, 40, 690, 40, 40);
    // (c)
    seg(svg, [720, T], [720, B]);
    cap(svg, [720, T], [720, B]);
    lab(svg, 754, 140, 'C_{tot} = C_S + C_3', { anchor: 'start', size: 20 });
    caption(svg, 720, 280, '(c)');
    return svg.render();
  },

  // 19.6 problem — 10 μF ∥ 2.5 μF, in series with 0.30 μF
  Figure_19_06_04: () => {
    const svg = new Svg({
      width: 500,
      height: 420,
      title: 'Capacitors in series and parallel',
      desc: 'A 10 μF capacitor and a 2.5 μF capacitor in parallel, and that pair in series with a 0.30 μF capacitor below it.',
    });
    seg(svg, [250, 20], [250, 60]);
    seg(svg, [130, 60], [370, 60], [370, 240], [130, 240], [130, 60]);
    seg(svg, [250, 240], [250, 400]);
    cap(svg, [130, 60], [130, 240]);
    cap(svg, [370, 60], [370, 240]);
    cap(svg, [250, 270], [250, 370]);
    lab(svg, 98, 150, '10 \\rm{μF}', { anchor: 'end' });
    lab(svg, 402, 150, '2.5 \\rm{μF}', { anchor: 'start' });
    lab(svg, 282, 320, '0.30 \\rm{μF}', { anchor: 'start' });
    return svg.render();
  },

  // 19.6 problem — 0.30 μF and 10 μF in series, in parallel with 2.5 μF
  Figure_19_06_05: () => {
    const svg = new Svg({
      width: 520,
      height: 400,
      title: 'Capacitors in series and parallel',
      desc: 'A 0.30 μF capacitor and a 10 μF capacitor in series on the left branch, and that pair in parallel with a 2.5 μF capacitor on the right branch.',
    });
    seg(svg, [250, 20], [250, 60]);
    seg(svg, [150, 60], [350, 60], [350, 340], [150, 340], [150, 60]);
    seg(svg, [250, 340], [250, 380]);
    cap(svg, [150, 60], [150, 200]);
    cap(svg, [150, 200], [150, 340]);
    cap(svg, [350, 60], [350, 340]);
    lab(svg, 118, 130, '0.30 \\rm{μF}', { anchor: 'end' });
    lab(svg, 118, 270, '10 \\rm{μF}', { anchor: 'end' });
    lab(svg, 382, 200, '2.5 \\rm{μF}', { anchor: 'start' });
    return svg.render();
  },

  // 19.6 problem — a larger series-parallel network
  Figure_19_06_06: () => {
    const svg = new Svg({
      width: 740,
      height: 420,
      title: 'A combination of series and parallel capacitors',
      desc: 'Three branches between a top wire and a bottom wire. Left: 5.0 μF in series with 3.5 μF. Middle: 8.0 μF. Right: 1.5 μF in series with a parallel pair of 0.75 μF and 15 μF.',
    });
    const T = 70;
    const B = 340;
    const J = 200;
    seg(svg, [300, 20], [300, T]);
    seg(svg, [300, B], [300, 400]);
    seg(svg, [140, T], [480, T]);
    seg(svg, [140, B], [600, B]);
    seg(svg, [140, T], [140, B]);
    seg(svg, [300, T], [300, B]);
    seg(svg, [480, T], [480, B]);
    seg(svg, [480, J], [600, J], [600, B]);
    cap(svg, [140, T], [140, J]);
    cap(svg, [140, J], [140, B]);
    cap(svg, [300, T], [300, B]);
    cap(svg, [480, T], [480, J]);
    cap(svg, [480, J], [480, B]);
    cap(svg, [600, J], [600, B]);
    svg.circle(480, J, 4.5, { fill: COLORS.black });
    lab(svg, 108, 135, '5.0 \\rm{μF}', { anchor: 'end' });
    lab(svg, 108, 270, '3.5 \\rm{μF}', { anchor: 'end' });
    lab(svg, 268, 205, '8.0 \\rm{μF}', { anchor: 'end' });
    lab(svg, 512, 135, '1.5 \\rm{μF}', { anchor: 'start' });
    lab(svg, 448, 270, '0.75 \\rm{μF}', { anchor: 'end' });
    lab(svg, 632, 270, '15 \\rm{μF}', { anchor: 'start' });
    return svg.render();
  },
};
