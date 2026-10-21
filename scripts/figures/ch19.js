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
  charge,
  drawConductor,
  drawRod,
  equipotentials,
  plate,
  pointField,
  pointPotential,
  rodCharges,
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
