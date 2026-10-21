/**
 * Figures for the answers to the Conceptual Questions (and a few problems) of
 * chapters 21–25: circuit diagrams, magnetic-force sketches, field lines, and
 * ray diagrams.
 *
 * Names follow concept_CC_SS_qNN for the NNth Conceptual Question of section
 * CC.SS, and concept_CC_SS_pNN for the NNth problem in that section's Problems
 * & Exercises. Ray diagrams apply Snell's law and the law of reflection to the
 * drawn geometry, so the angles in each picture are the ones the answers use.
 */
import {
  WIRE,
  bulb,
  cell,
  currentArrow,
  dot,
  meter,
  resistor,
  switchSymbol,
  unit,
  wire,
} from './circuit.js';
import { COLORS, Plot, Svg, fmt, rad } from './svg.js';

const CURRENT = COLORS.blue;
const FORCE = COLORS.red;
const FIELD = '#c2185b';
const RAY = COLORS.red;
const WATER = '#d6ebf5';

/** Panel caption in the top-left corner of a panel that starts at x0. */
function caption(svg, x0, text, { y = 24 } = {}) {
  svg.text(x0 + 12, y, text, { size: 15, math: false, weight: 'bold', anchor: 'start' });
}

/** A thin rule between panels. */
function divider(svg, x, height) {
  svg.line(x, 10, x, height - 10, { color: '#cccccc', width: 1 });
}

// ---------------------------------------------------------------------------
// Magnetism symbols.

/** Field (or current) into the page: a circled ×. */
function intoPage(svg, x, y, { r = 9, color = FIELD } = {}) {
  svg.circle(x, y, r, { fill: '#ffffff', stroke: color, width: 1.8 });
  const d = r * 0.6;
  svg.line(x - d, y - d, x + d, y + d, { color, width: 1.8 });
  svg.line(x - d, y + d, x + d, y - d, { color, width: 1.8 });
}

/** Field (or current) out of the page: a circled dot. */
function outOfPage(svg, x, y, { r = 9, color = FIELD } = {}) {
  svg.circle(x, y, r, { fill: '#ffffff', stroke: color, width: 1.8 });
  svg.circle(x, y, r * 0.3, { fill: color });
}

/** Magnet pole block with a letter. */
function pole(svg, x, y, w, h, letter) {
  const fill = letter === 'N' ? '#e57373' : '#90a4ae';
  svg.rect(x, y, w, h, { fill, stroke: WIRE, width: 1.5 });
  svg.text(x + w / 2, y + h / 2, letter, {
    size: 26,
    math: false,
    weight: 'bold',
    color: '#ffffff',
    halo: false,
  });
}

// ---------------------------------------------------------------------------
// Optics helpers.

/** Unit vector at angle a (degrees, counterclockwise from +x, y up) in SVG coordinates. */
const dir = a => [Math.cos(rad(a)), -Math.sin(rad(a))];

/** Ray segment with an arrowhead at its middle. */
function ray(svg, P, Q, { color = RAY, width = 2.2, dash, arrow = true } = {}) {
  svg.line(...P, ...Q, { color, width, dash });
  if (!arrow) return;
  const M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  const [ux, uy] = unit(P, Q);
  svg.arrow(M[0] - ux * 6, M[1] - uy * 6, M[0] + ux * 6, M[1] + uy * 6, { color, width, head: 11 });
}

/** Refract direction d (unit, SVG coords) at a surface with unit normal nrm pointing into medium 1. */
function refract(d, nrm, n1, n2) {
  const cosi = -(d[0] * nrm[0] + d[1] * nrm[1]);
  const r = n1 / n2;
  const k = 1 - r * r * (1 - cosi * cosi);
  if (k < 0) return null;
  const c = r * cosi - Math.sqrt(k);
  return [r * d[0] + c * nrm[0], r * d[1] + c * nrm[1]];
}

function reflect(d, nrm) {
  const dn = d[0] * nrm[0] + d[1] * nrm[1];
  return [d[0] - 2 * dn * nrm[0], d[1] - 2 * dn * nrm[1]];
}

/** Intersection of lines P + s·u and Q + t·v. */
function intersect(P, u, Q, v) {
  const den = u[0] * v[1] - u[1] * v[0];
  const s = ((Q[0] - P[0]) * v[1] - (Q[1] - P[1]) * v[0]) / den;
  return [P[0] + s * u[0], P[1] + s * u[1]];
}

/** A simple eye, looking along angle `a` (degrees, y up). */
function eye(svg, x, y, a = 0) {
  svg.add(
    `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(-a)})"><path d="M -14 0 Q 0 -11 14 0 Q 0 11 -14 0 Z" fill="#ffffff" stroke="#222222" stroke-width="1.5"/><circle cx="4" cy="0" r="4.5" fill="#1f77c8"/></g>`
  );
}

/** Stick figure facing +x with feet at (x, y) and height h. */
function person(svg, x, y, h, { color = COLORS.black, dash } = {}) {
  const head = h * 0.065;
  const neck = y - h + 2 * head;
  const hip = y - h * 0.5;
  svg.circle(x, y - h + head, head, { fill: 'none', stroke: color, width: 2 });
  svg.line(x, neck, x, hip, { color, width: 2.5, dash });
  svg.line(x, hip, x - h * 0.06, y, { color, width: 2.5, dash });
  svg.line(x, hip, x + h * 0.06, y, { color, width: 2.5, dash });
  svg.line(x, neck + h * 0.06, x + h * 0.12, hip - h * 0.02, { color, width: 2.5, dash });
  svg.line(x, neck + h * 0.06, x - h * 0.1, hip - h * 0.02, { color, width: 2.5, dash });
}

// ---------------------------------------------------------------------------
// Field lines of point sources (for section 22.11).

function fieldAt(sources, x, y) {
  let ex = 0;
  let ey = 0;
  for (const { x: sx, y: sy, q } of sources) {
    const dx = x - sx;
    const dy = y - sy;
    const r2 = dx * dx + dy * dy;
    const r3 = r2 * Math.sqrt(r2);
    ex += (q * dx) / r3;
    ey += (q * dy) / r3;
  }
  return [ex, ey];
}

/**
 * Trace a field line from (x, y) along (+1) or against (−1) the field, until it
 * leaves the box or comes within `stop` px of a source. Midpoint (RK2) steps.
 */
function trace(sources, x, y, sign, box, { step = 2, stop = 9, max = 900 } = {}) {
  const pts = [[x, y]];
  for (let k = 0; k < max; k += 1) {
    const [ax, ay] = fieldAt(sources, x, y);
    const la = Math.hypot(ax, ay) || 1;
    const mx = x + (sign * step * ax) / la / 2;
    const my = y + (sign * step * ay) / la / 2;
    const [bx, by] = fieldAt(sources, mx, my);
    const lb = Math.hypot(bx, by) || 1;
    x += (sign * step * bx) / lb;
    y += (sign * step * by) / lb;
    pts.push([x, y]);
    if (x < box.x || x > box.x + box.w || y < box.y || y > box.y + box.h) break;
    if (k > 4 && sources.some(s => Math.hypot(x - s.x, y - s.y) < stop)) break;
  }
  return pts;
}

/** Draw a traced line with an arrowhead pointing in the field direction. */
function fieldLine(svg, pts, { color, reverse = false, at = 0.5 } = {}) {
  if (pts.length < 6) return;
  svg.polyline(pts, { color, width: 1.6 });
  const k = Math.max(2, Math.min(pts.length - 3, Math.floor(pts.length * at)));
  let P = pts[k - 2];
  let Q = pts[k + 2];
  if (reverse) [P, Q] = [Q, P];
  svg.arrow(...P, ...Q, { color, width: 1.6, head: 9 });
}

function charge(svg, x, y, sign, { r = 11 } = {}) {
  const fill = sign > 0 ? COLORS.red : sign < 0 ? COLORS.blue : '#8d6e63';
  svg.circle(x, y, r, { fill, stroke: WIRE, width: 1 });
  const label = sign > 0 ? '+' : sign < 0 ? '−' : 'm';
  svg.text(x, y, label, { size: 15, math: false, weight: 'bold', color: '#ffffff', halo: false });
}

// ---------------------------------------------------------------------------
// Graph helper for RC circuits.

function decayGraph(svg, box, { rising, yLabel, top, values, color, title }) {
  const g = new Plot(svg, {
    ...box,
    xRange: [0, 5],
    yRange: [0, 1.1],
    xTicks: [0, 1, 2, 3, 4, 5],
    yTicks: [],
    xFormat: t => (t === 0 ? '0' : t === 1 ? 'τ' : `${t}τ`),
  });
  g.axes({
    xTitle: 't',
    yTitle: yLabel,
    arrows: true,
    titleSize: 16,
    yTitleOffset: 46,
    xTitleOffset: 40,
    title,
  });
  const f = t => (rising ? 1 - Math.exp(-t) : Math.exp(-t));
  g.line(0, 1, 5, 1, { color: COLORS.guide, width: 1.2, dash: '6 4' });
  svg.text(g.X(0) - 8, g.Y(1), top, { size: 15, anchor: 'end' });
  g.fn(f, 0, 5, { color, width: 3 });
  [1, 2].forEach((t, k) => {
    const v = f(t);
    g.line(t, 0, t, v, { color: COLORS.guide, width: 1, dash: '4 3' });
    g.line(0, v, t, v, { color: COLORS.guide, width: 1, dash: '4 3' });
    svg.circle(g.X(t), g.Y(v), 4, { fill: color });
    svg.text(g.X(t) + 8, g.Y(v) - 12, values[k], { size: 14, anchor: 'start' });
  });
  return g;
}

export default {
  // 21.1 Q5 — a switch wired in parallel with the bulb
  concept_21_01_q05: () => {
    const W = 760;
    const H = 330;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'A switch wired in parallel with a bulb',
      desc: 'Two circuit diagrams. Left: switch open, all of the current flows through the bulb, which lights. Right: switch closed, nearly all of the current flows through the switch, which shorts out the bulb, and a large current flows through the battery and its internal resistance.',
    });
    [false, true].forEach((closed, k) => {
      const x0 = k * (W / 2);
      if (k) divider(svg, x0, H);
      caption(svg, x0, closed ? '(b) Switch closed: bulb off' : '(a) Switch open: bulb on');
      const L = x0 + 70;
      const M = x0 + 200;
      const R = x0 + 310;
      const T = 70;
      const B = 280;
      wire(svg, [
        [L, T + 60],
        [L, T],
        [R, T],
        [R, T + 50],
      ]);
      wire(svg, [
        [R, B - 50],
        [R, B],
        [L, B],
        [L, B - 50],
      ]);
      cell(svg, [L, T + 110], [L, T + 60]);
      resistor(svg, [L, B - 50], [L, T + 110]);
      svg.text(L - 14, T + 85, 'emf', { size: 15, anchor: 'end', math: false, italic: true });
      svg.text(L - 14, B - 75, 'r', { size: 17, anchor: 'end' });
      dot(svg, M, T);
      dot(svg, M, B);
      switchSymbol(svg, [M, T], [M, B], { closed });
      bulb(svg, [R, T + 50], [R, B - 50], { lit: !closed });
      svg.text(R + 34, (T + B) / 2, 'R', { size: 17, anchor: 'start' });
      svg.text(M + 14, (T + B) / 2 + 34, 'switch', { size: 13, math: false, anchor: 'start' });
      if (closed) {
        currentArrow(svg, L + 30, T - 12, M - 20, T - 12);
        currentArrow(svg, M - 14, T + 30, M - 14, T + 70);
        currentArrow(svg, M - 20, B + 12, L + 30, B + 12);
        svg.text((L + M) / 2, T - 26, 'large I', { size: 14, math: false, color: CURRENT });
        svg.text(R + 28, (T + B) / 2 + 40, 'I ≈ 0', { size: 14, anchor: 'start', color: CURRENT });
      } else {
        currentArrow(svg, L + 30, T - 12, R - 30, T - 12);
        currentArrow(svg, R + 14, T + 6, R + 14, T + 46);
        currentArrow(svg, R - 30, B + 12, L + 30, B + 12);
        svg.text((L + R) / 2, T - 26, 'I', { size: 16, color: CURRENT });
        svg.text(M - 12, (T + B) / 2 - 30, 'no current', {
          size: 13,
          math: false,
          anchor: 'end',
          color: CURRENT,
        });
      }
    });
    return svg.render();
  },

  // 21.2 Q6 — four 12-V batteries arranged for 24 V and for 12 V
  concept_21_02_q06: () => {
    const W = 760;
    const H = 360;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Four 12-volt batteries connected for 24 volts and for 12 volts',
      desc: 'Two arrangements of four 12-volt batteries. Left, for 24 volts: two pairs of batteries, each pair connected in series, with the two pairs connected in parallel. Right, for 12 volts: all four batteries connected in parallel.',
    });
    const terminals = (xl, xr, yb, label) => {
      wire(svg, [
        [xl, yb],
        [xl, yb + 40],
      ]);
      wire(svg, [
        [xr, yb],
        [xr, yb + 40],
      ]);
      svg.circle(xl, yb + 46, 6, { fill: '#ffffff', stroke: WIRE, width: 2 });
      svg.circle(xr, yb + 46, 6, { fill: '#ffffff', stroke: WIRE, width: 2 });
      svg.text(xl, yb + 70, '−', { size: 20, math: false, weight: 'bold' });
      svg.text(xr, yb + 70, '+', { size: 20, math: false, weight: 'bold' });
      svg.text((xl + xr) / 2, yb + 50, label, { size: 18, math: false, weight: 'bold' });
    };
    // (a) two series pairs in parallel
    caption(svg, 0, '(a) 24 V: series pairs in parallel');
    {
      const xl = 60;
      const xr = 320;
      const rows = [100, 190];
      wire(svg, [
        [xl, rows[0]],
        [xl, 250],
      ]);
      wire(svg, [
        [xr, rows[0]],
        [xr, 250],
      ]);
      for (const y of rows) {
        dot(svg, xl, y);
        dot(svg, xr, y);
        cell(svg, [xl, y], [190, y]);
        cell(svg, [190, y], [xr, y]);
        svg.text(125, y - 26, '12 V', { size: 14, math: false });
        svg.text(255, y - 26, '12 V', { size: 14, math: false });
      }
      terminals(xl, xr, 250, '24 V');
    }
    divider(svg, W / 2, H);
    caption(svg, W / 2, '(b) 12 V: all four in parallel');
    {
      const xl = W / 2 + 90;
      const xr = W / 2 + 290;
      const rows = [70, 120, 170, 220];
      wire(svg, [
        [xl, rows[0]],
        [xl, 250],
      ]);
      wire(svg, [
        [xr, rows[0]],
        [xr, 250],
      ]);
      for (const y of rows) {
        dot(svg, xl, y);
        dot(svg, xr, y);
        cell(svg, [xl, y], [xr, y]);
        svg.text((xl + xr) / 2 + 40, y - 12, '12 V', { size: 13, math: false, anchor: 'start' });
      }
      terminals(xl, xr, 250, '12 V');
    }
    return svg.render();
  },

  // 21.4 Problem 12 — a voltmeter in parallel with a 75.0-kΩ resistor
  concept_21_04_p12: () => {
    const svg = new Svg({
      width: 600,
      height: 300,
      title: 'Voltmeter connected across a resistor',
      desc: 'Circuit diagram: a 75.0-kilohm resistor connected in a circuit, with a 1.00-megohm voltmeter connected in parallel across it.',
    });
    const L = 80;
    const R = 280;
    const V = 430;
    const T = 50;
    const B = 250;
    wire(svg, [
      [L, T + 70],
      [L, T],
      [V, T],
      [V, T + 70],
    ]);
    wire(svg, [
      [V, B - 70],
      [V, B],
      [L, B],
      [L, B - 70],
    ]);
    cell(svg, [L, T + 130], [L, T + 70]);
    wire(svg, [
      [L, T + 130],
      [L, B - 70],
    ]);
    svg.text(L - 24, T + 100, 'emf', { size: 15, anchor: 'end', math: false, italic: true });
    dot(svg, R, T);
    dot(svg, R, B);
    resistor(svg, [R, T], [R, B], { size: 70 });
    svg.text(R - 18, (T + B) / 2, 'R = 75.0 kΩ', { size: 15, anchor: 'end', math: false });
    meter(svg, [V, T + 70], [V, B - 70], 'V');
    svg.text(V + 26, (T + B) / 2, 'R_V = 1.00 MΩ', { size: 15, anchor: 'start' });
    return svg.render();
  },

  // 21.6 Q4 — charge versus time for charging and discharging
  concept_21_06_q04: () => {
    const svg = new Svg({
      width: 760,
      height: 330,
      title: 'Charge versus time for a charging and a discharging capacitor',
      desc: 'Two graphs of charge versus time. Left, charging: the charge rises from zero, reaching 0.632 Q at one time constant and 0.865 Q at two, and approaching Q along a horizontal asymptote. Right, discharging: the charge falls from Q zero, to 0.368 Q zero at one time constant and 0.135 Q zero at two, and approaches zero.',
    });
    decayGraph(
      svg,
      { x: 80, y: 50, w: 270, h: 210 },
      {
        rising: true,
        yLabel: 'Charge q',
        top: 'Q',
        values: ['0.632Q', '0.865Q'],
        color: COLORS.blue,
        title: 'Charging',
      }
    );
    decayGraph(
      svg,
      { x: 460, y: 50, w: 270, h: 210 },
      {
        rising: false,
        yLabel: 'Charge q',
        top: 'Q_0',
        values: ['0.368Q_0', '0.135Q_0'],
        color: COLORS.red,
        title: 'Discharging',
      }
    );
    return svg.render();
  },

  // 21.6 Q7 — resistor voltage and current while charging
  concept_21_06_q07: () => {
    const svg = new Svg({
      width: 760,
      height: 330,
      title: 'Resistor voltage and current while a capacitor charges',
      desc: 'Two graphs for the charging circuit, both decaying exponentials. Left: the potential difference across the resistor falls from the emf at time zero to 0.368 times the emf at one time constant and 0.135 times the emf at two. Right: the current falls from emf over R at time zero to 0.368 and 0.135 of that value at one and two time constants.',
    });
    decayGraph(
      svg,
      { x: 80, y: 50, w: 270, h: 210 },
      {
        rising: false,
        yLabel: 'Voltage V_R',
        top: 'emf',
        values: ['0.368 emf', '0.135 emf'],
        color: COLORS.green,
        title: 'Voltage across R',
      }
    );
    decayGraph(
      svg,
      { x: 470, y: 50, w: 260, h: 210 },
      {
        rising: false,
        yLabel: 'Current I',
        top: 'emf/R',
        values: ['0.368 I_0', '0.135 I_0'],
        color: COLORS.orange,
        title: 'Current',
      }
    );
    return svg.render();
  },

  // 22.5 Q3 — cosmic rays arriving at the equator
  concept_22_05_q03: () => {
    const W = 760;
    const H = 380;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Deflection of cosmic rays by Earth’s magnetic field at the equator',
      desc: 'A cross section of Earth with its magnetic field lines running from south to north, horizontal at the equator. A proton heading straight down toward the equator is deflected toward the east; an electron is deflected toward the west; a neutron passes straight through.',
    });
    caption(svg, 0, '(a) Earth’s field (side view)');
    const cx = 190;
    const cy = 205;
    const Re = 70;
    for (const k of [1.5, 1.95, 2.4]) {
      // Dipole field line r = k·Re·cos²(latitude), drawn on both sides.
      for (const side of [1, -1]) {
        const pts = [];
        for (let lat = -80; lat <= 80; lat += 2) {
          const r = k * Re * Math.cos(rad(lat)) ** 2;
          if (r < Re) continue;
          pts.push([cx + side * r * Math.cos(rad(lat)), cy - r * Math.sin(rad(lat))]);
        }
        svg.polyline(pts, { color: FIELD, width: 1.6 });
        const m = Math.floor(pts.length / 2);
        svg.arrow(...pts[m - 1], ...pts[m + 1], { color: FIELD, width: 1.6, head: 9 });
      }
    }
    svg.circle(cx, cy, Re, { fill: '#cfe3ea', stroke: WIRE, width: 2 });
    svg.line(cx - Re, cy, cx + Re, cy, { color: COLORS.guide, width: 1, dash: '5 4' });
    svg.text(cx, cy - Re - 14, 'geographic N', { size: 13, math: false });
    svg.text(cx, cy + Re + 16, 'geographic S', { size: 13, math: false });
    svg.text(cx, cy + 16, 'equator', { size: 12, math: false });
    svg.text(cx + 2.4 * Re - 12, cy - 40, '**B**', { size: 17, anchor: 'end' });
    svg.arrow(cx + 175, cy - 150, cx + Re + 4, cy - 4, {
      color: COLORS.orange,
      width: 2.5,
      head: 11,
    });
    svg.text(cx + 175, cy - 162, 'incoming particles', { size: 13, math: false });

    divider(svg, W / 2 - 10, H);
    caption(svg, W / 2 - 10, '(b) At the equator, looking north');
    const x0 = W / 2 + 20;
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < 5; j += 1) intoPage(svg, x0 + 20 + i * 60, 70 + j * 55, { r: 7 });
    }
    svg.text(x0 + 320, 52, '**B** north (into page)', { size: 14, anchor: 'end' });
    const gy = 330;
    svg.rect(x0, gy, 340, 16, { fill: '#c8b38a' });
    svg.text(x0 + 6, gy + 32, 'W', { size: 15, math: false, weight: 'bold', anchor: 'start' });
    svg.text(x0 + 334, gy + 32, 'E', { size: 15, math: false, weight: 'bold', anchor: 'end' });
    const mid = x0 + 170;
    const paths = [
      { dx: 120, color: COLORS.red, label: 'proton → east' },
      { dx: 0, color: COLORS.guide, label: 'neutron' },
      { dx: -120, color: COLORS.blue, label: 'electron → west' },
    ];
    paths.forEach(({ dx, color, label }, k) => {
      const sx = mid - (k - 1) * 18;
      const d = `M ${fmt(sx)} 60 Q ${fmt(sx)} 220 ${fmt(sx + dx)} ${gy - 4}`;
      svg.path(d, { color, width: 2.6 });
      svg.arrow(sx + dx * 0.82, gy - 40, sx + dx, gy - 4, { color, width: 2.6, head: 11 });
      svg.text(sx + dx + (dx > 0 ? -6 : dx < 0 ? 6 : 0), dx ? gy - 30 : gy - 70, label, {
        size: 13,
        math: false,
        anchor: dx > 0 ? 'end' : dx < 0 ? 'start' : 'middle',
        color,
      });
    });
    svg.arrow(mid - 150, 95, mid - 150, 150, { color: COLORS.black, width: 2, head: 10 });
    svg.text(mid - 158, 122, '**v**', { size: 16, anchor: 'end' });
    return svg.render();
  },

  // 22.7 Q1 — electrons carrying the current between the poles
  concept_22_07_q01: () => {
    const svg = new Svg({
      width: 600,
      height: 340,
      title: 'Force on the electrons in a wire between magnet poles',
      desc: 'Cross-section view between the magnet poles: the magnetic field points to the right. Electrons in the wire move into the page, opposite to the conventional current, which points out of the page. For the electrons, v cross B points down, so the force on the negative electrons, and therefore on the wire, points up.',
    });
    pole(svg, 30, 90, 90, 160, 'N');
    pole(svg, 480, 90, 90, 160, 'S');
    for (const y of [115, 170, 225]) {
      svg.arrow(130, y, 470, y, { color: FIELD, width: 2, head: 11 });
    }
    svg.text(455, 100, '**B**', { size: 17 });
    const cx = 300;
    const cy = 170;
    svg.circle(cx, cy, 30, { fill: '#f0d9b5', stroke: WIRE, width: 2 });
    outOfPage(svg, cx - 12, cy, { r: 9, color: CURRENT });
    intoPage(svg, cx + 13, cy + 2, { r: 8, color: '#555555' });
    svg.arrow(cx, cy - 34, cx, cy - 120, { color: FORCE, width: 3.5, head: 14 });
    svg.text(cx + 12, cy - 112, '**F** on wire (up)', { size: 15, anchor: 'start', math: false });
    svg.text(cx - 20, cy + 102, 'I out of page', {
      size: 14,
      math: false,
      anchor: 'end',
      color: CURRENT,
    });
    svg.text(cx + 20, cy + 102, 'electrons into page', {
      size: 14,
      math: false,
      anchor: 'start',
      color: '#555555',
    });
    svg.lines(300, 310, ['electrons: v × B points down; q < 0 reverses it, so F points up'], {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 22.8 Q1 — forces on the top and bottom of the motor loop
  concept_22_08_q01: () => {
    const svg = new Svg({
      width: 600,
      height: 420,
      title: 'Forces on the top and bottom segments of a motor loop',
      desc: 'Front view of the motor loop, tilted at an angle phi to the magnetic field, which points to the right. On the top segment the current points into the page and to the right, and the force on it is straight down; on the bottom segment the current is reversed and the force is straight up. Both forces are parallel to the vertical axis of rotation, so they produce no torque about it.',
    });
    // Oblique projection: x right, y into the page (drawn up-right), z up.
    const O = [300, 215];
    const P = ([x, y, z]) => [O[0] + x + 0.45 * y, O[1] - z - 0.3 * y];
    const phi = 35;
    const w = 190;
    const l = 230;
    const u = [Math.cos(rad(phi)), Math.sin(rad(phi)), 0];
    const at = (s, z) => P([u[0] * s, u[1] * s, z]);
    svg.line(...P([0, 0, 190]), ...P([0, 0, -190]), {
      color: COLORS.guide,
      width: 1.5,
      dash: '8 5',
    });
    svg.text(...P([0, 0, 200]).map((v, i) => (i ? v - 6 : v)), 'axis', { size: 13, math: false });
    for (const z of [-80, 0, 80]) {
      svg.arrow(...P([-270, 120, z]), ...P([230, 120, z]), { color: FIELD, width: 1.6, head: 10 });
    }
    svg.text(...P([200, 120, 100]), '**B**', { size: 17, anchor: 'start' });
    const corners = [at(-w / 2, -l / 2), at(-w / 2, l / 2), at(w / 2, l / 2), at(w / 2, -l / 2)];
    svg.polygon(corners, { fill: '#fff3e0', opacity: 0.6 });
    svg.polyline([...corners, corners[0]], { color: '#b8860b', width: 4 });
    const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const along = (A, B, color = CURRENT) => {
      const M = mid(A, B);
      const [ux, uy] = unit(A, B);
      svg.arrow(M[0] - ux * 12, M[1] - uy * 12, M[0] + ux * 12, M[1] + uy * 12, {
        color,
        width: 3,
        head: 12,
      });
    };
    along(corners[0], corners[1]);
    along(corners[1], corners[2]);
    along(corners[2], corners[3]);
    along(corners[3], corners[0]);
    const top = mid(corners[1], corners[2]);
    const bot = mid(corners[3], corners[0]);
    svg.arrow(top[0], top[1] - 4, top[0], top[1] + 70, { color: FORCE, width: 3.5, head: 14 });
    svg.arrow(bot[0], bot[1] + 4, bot[0], bot[1] - 70, { color: FORCE, width: 3.5, head: 14 });
    svg.text(top[0] + 12, top[1] + 50, '**F**_{top}', { size: 16, anchor: 'start' });
    svg.text(bot[0] + 12, bot[1] - 50, '**F**_{bottom}', { size: 16, anchor: 'start' });
    svg.text(...mid(corners[0], corners[1]).map((v, i) => (i ? v : v - 16)), 'I', {
      size: 16,
      color: CURRENT,
      anchor: 'end',
    });
    svg.lines(
      300,
      395,
      ['Both forces are parallel to the axis, so they exert no torque about it.'],
      {
        size: 14,
        math: false,
      }
    );
    return svg.render();
  },

  // 22.9 Q1 — the loop's own field and the torque on it, seen from above
  concept_22_09_q01: () => {
    const svg = new Svg({
      width: 620,
      height: 380,
      title: 'A motor loop as a magnet, viewed from above',
      desc: 'Top view of the motor loop between the N pole on the left and the S pole on the right, with the field pointing right. The loop’s current comes up out of the page at its left edge and goes down into the page at its right edge. By the right-hand rule its own field points up the page, so its north face is the back face. The force on the left edge points up the page and the force on the right edge points down the page, turning the loop clockwise until its north face points at the S pole.',
    });
    caption(svg, 0, 'Viewed from above');
    pole(svg, 20, 110, 80, 170, 'N');
    pole(svg, 520, 110, 80, 170, 'S');
    for (const y of [130, 260]) svg.arrow(110, y, 510, y, { color: FIELD, width: 1.8, head: 10 });
    svg.text(495, 118, '**B**', { size: 16 });
    const cx = 310;
    const cy = 195;
    svg.line(cx - 110, cy, cx + 110, cy, { color: '#b8860b', width: 6 });
    outOfPage(svg, cx - 110, cy, { r: 10, color: CURRENT });
    intoPage(svg, cx + 110, cy, { r: 10, color: CURRENT });
    svg.text(cx - 110, cy + 28, 'I up', { size: 13, math: false, color: CURRENT });
    svg.text(cx + 110, cy + 28, 'I down', { size: 13, math: false, color: CURRENT });
    svg.arrow(cx - 110, cy - 14, cx - 110, cy - 80, { color: FORCE, width: 3, head: 13 });
    svg.arrow(cx + 110, cy + 14, cx + 110, cy + 80, { color: FORCE, width: 3, head: 13 });
    svg.text(cx - 100, cy - 70, '**F**', { size: 16, anchor: 'start' });
    svg.text(cx + 100, cy + 72, '**F**', { size: 16, anchor: 'end' });
    svg.arrow(cx, cy - 6, cx, cy - 95, { color: COLORS.green, width: 3, head: 13 });
    svg.text(cx + 8, cy - 104, 'loop’s own field', {
      size: 13,
      math: false,
      anchor: 'start',
      color: COLORS.green,
    });
    svg.text(cx - 30, cy - 18, 'N face', { size: 14, math: false, weight: 'bold', anchor: 'end' });
    svg.text(cx - 30, cy + 20, 'S face', { size: 14, math: false, weight: 'bold', anchor: 'end' });
    // Clockwise rotation arrow.
    const r = 150;
    svg.arc(cx, cy, r, 125, 160, { color: COLORS.accel, width: 2.2 });
    const end = [cx + r * Math.cos(rad(125)), cy - r * Math.sin(rad(125))];
    const prev = [cx + r * Math.cos(rad(132)), cy - r * Math.sin(rad(132))];
    svg.arrow(...prev, ...end, { color: COLORS.accel, width: 2.2, head: 11 });
    svg.text(cx - 140, cy - 125, 'clockwise', { size: 13, math: false, color: COLORS.accel });
    svg.lines(310, 335, ['The loop’s N face turns toward the S pole: unlike poles attract.'], {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 22.10 Q4 — two current loops as magnets
  concept_22_10_q04: () => {
    const W = 720;
    const H = 380;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Forces between two current loops',
      desc: 'Side view of two horizontal current loops, one above the other. Left: both currents circulate in the same direction; facing segments carry parallel currents and attract, and each loop’s north face (on top) faces the other loop’s south face. Right: currents in opposite directions; facing segments carry antiparallel currents and repel, and the loops’ like poles face each other.',
    });
    const loop = (cx, cy, ccw) => {
      svg.ellipse(cx, cy, 110, 28, { stroke: '#b8860b', width: 4 });
      // Front edge (bottom of the ellipse): counterclockwise from above runs to the right.
      const s = ccw ? 1 : -1;
      svg.arrow(cx - 14 * s, cy + 28, cx + 14 * s, cy + 28, { color: CURRENT, width: 3, head: 12 });
      svg.text(cx + 120, cy, 'I', { size: 16, color: CURRENT, anchor: 'start' });
      svg.text(cx - 125, cy - 18, ccw ? 'N' : 'S', {
        size: 16,
        math: false,
        weight: 'bold',
        anchor: 'end',
      });
      svg.text(cx - 125, cy + 20, ccw ? 'S' : 'N', {
        size: 16,
        math: false,
        weight: 'bold',
        anchor: 'end',
      });
    };
    [
      [0, true, 'attract'],
      [W / 2, false, 'repel'],
    ].forEach(([x0, same, word]) => {
      if (x0) divider(svg, x0, H);
      caption(svg, x0, same ? '(a) Same direction: attract' : '(b) Opposite directions: repel');
      const cx = x0 + 200;
      loop(cx, 110, same);
      loop(cx, 260, true);
      if (word === 'attract') {
        svg.arrow(cx, 150, cx, 180, { color: FORCE, width: 3, head: 12 });
        svg.arrow(cx, 222, cx, 192, { color: FORCE, width: 3, head: 12 });
      } else {
        svg.arrow(cx, 180, cx, 145, { color: FORCE, width: 3, head: 12 });
        svg.arrow(cx, 192, cx, 228, { color: FORCE, width: 3, head: 12 });
      }
      svg.text(cx + 14, 186, word, { size: 14, math: false, anchor: 'start', color: FORCE });
      svg.lines(
        cx,
        330,
        [same ? 'unlike poles (S over N) face each other' : 'like poles (N and N) face each other'],
        {
          size: 13,
          math: false,
        }
      );
    });
    return svg.render();
  },

  // 22.11 Q6 — gravitational, electric, and magnetic field lines
  concept_22_11_q06: () => {
    const W = 760;
    const H = 640;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Gravitational, electric, and magnetic field lines',
      desc: 'Four field-line drawings. (a) Gravitational field of two masses: all lines point inward, ending on the masses, and the region between them has a point of zero field. (b) Electric field of a positive and a negative charge: lines start on the positive charge and end on the negative charge, many of them crossing the gap between the two. (c) Electric field of two positive charges: lines start on both charges and point outward, bending away from each other, with a point of zero field midway between them. (d) Magnetic field of a bar magnet: lines leave the north pole, loop around to the south pole outside the magnet, and continue from south to north inside it, forming closed loops.',
    });
    divider(svg, W / 2, H);
    svg.line(10, H / 2, W - 10, H / 2, { color: '#cccccc', width: 1 });
    const panel = (i, j, title, sources, { color, outward, from }) => {
      const box = { x: (i * W) / 2 + 8, y: (j * H) / 2 + 36, w: W / 2 - 16, h: H / 2 - 44 };
      caption(svg, (i * W) / 2, title, { y: (j * H) / 2 + 24 });
      const n = 14;
      for (const s of sources.filter(from)) {
        for (let k = 0; k < n; k += 1) {
          const a = (2 * Math.PI * (k + 0.5)) / n;
          const pts = trace(
            sources,
            s.x + 12 * Math.cos(a),
            s.y + 12 * Math.sin(a),
            outward ? 1 : -1,
            box
          );
          fieldLine(svg, pts, { color, reverse: !outward, at: 0.4 });
        }
      }
      return box;
    };
    const cxL = W / 4;
    const cxR = (3 * W) / 4;
    const yT = H / 4 + 14;
    const yB = (3 * H) / 4 + 14;
    // (a) Two masses act like two negative charges: lines end on them.
    const masses = [
      { x: cxL - 70, y: yT, q: -1 },
      { x: cxL + 70, y: yT, q: -1 },
    ];
    panel(0, 0, '(a) Two masses', masses, {
      color: COLORS.accel,
      outward: false,
      from: () => true,
    });
    masses.forEach(m => charge(svg, m.x, m.y, 0, { r: 13 }));
    // (b) Positive and negative charges.
    const dipole = [
      { x: cxR - 70, y: yT, q: 1 },
      { x: cxR + 70, y: yT, q: -1 },
    ];
    panel(1, 0, '(b) + and − charges', dipole, {
      color: COLORS.red,
      outward: true,
      from: s => s.q > 0,
    });
    dipole.forEach(c => charge(svg, c.x, c.y, c.q));
    // (c) Two positive charges.
    const pair = [
      { x: cxL - 70, y: yB, q: 1 },
      { x: cxL + 70, y: yB, q: 1 },
    ];
    panel(0, 1, '(c) Two + charges', pair, { color: COLORS.red, outward: true, from: () => true });
    pair.forEach(c => charge(svg, c.x, c.y, c.q));
    // (d) Bar magnet: outside, the field of poles at the magnet's ends; inside, S to N.
    const half = 70;
    const poles = [
      { x: cxR + half - 8, y: yB, q: 1 },
      { x: cxR - half + 8, y: yB, q: -1 },
    ];
    const box = { x: W / 2 + 8, y: H / 2 + 36, w: W / 2 - 16, h: H / 2 - 44 };
    caption(svg, W / 2, '(d) Bar magnet', { y: H / 2 + 24 });
    for (let k = 0; k < 14; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 14;
      if (Math.cos(a) < -0.2) continue; // lines leave through the N end
      const pts = trace(
        poles,
        poles[0].x + 12 * Math.cos(a),
        poles[0].y + 12 * Math.sin(a),
        1,
        box,
        { stop: 10 }
      );
      fieldLine(svg, pts, { color: FIELD, at: 0.45 });
    }
    // Lines that return to the S end from beyond the left edge of the panel.
    for (let k = 0; k < 14; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 14;
      if (Math.cos(a) > -0.6) continue;
      const pts = trace(
        poles,
        poles[1].x + 12 * Math.cos(a),
        poles[1].y + 12 * Math.sin(a),
        -1,
        box,
        { stop: 10 }
      );
      if (pts.some(([x]) => x > cxR - half)) continue;
      fieldLine(svg, pts, { color: FIELD, reverse: true, at: 0.45 });
    }
    svg.rect(cxR - half, yB - 18, half, 36, { fill: '#90a4ae', stroke: WIRE, width: 1.5 });
    svg.rect(cxR, yB - 18, half, 36, { fill: '#e57373', stroke: WIRE, width: 1.5 });
    for (const dy of [-8, 8]) {
      svg.arrow(cxR - half + 14, yB + dy, cxR + half - 14, yB + dy, {
        color: '#ffffff',
        width: 1.6,
        head: 8,
      });
    }
    svg.text(cxR - half / 2, yB, 'S', { size: 18, math: false, weight: 'bold', color: '#222222' });
    svg.text(cxR + half / 2, yB, 'N', { size: 18, math: false, weight: 'bold', color: '#222222' });
    return svg.render();
  },

  // 23.1 Q2 — Lenz's law for a magnet thrust into a coil
  concept_23_01_q02: () => {
    const svg = new Svg({
      width: 560,
      height: 460,
      title: 'Induced current when a magnet is pushed into a coil',
      desc: 'A bar magnet with its north pole pointing up is pushed upward into a horizontal coil. The magnet’s field points up through the coil and is increasing. The induced current, clockwise viewed from above, produces a downward field inside the coil, making the coil’s lower face a north pole that faces the magnet’s north pole, so the coil repels the magnet with a downward force that opposes its motion.',
    });
    const cx = 250;
    const cy = 150;
    // Magnet's field lines spreading up through the coil.
    for (const dx of [-50, -25, 0, 25, 50]) {
      svg.path(`M ${cx + dx * 0.3} 300 Q ${cx + dx * 0.6} 180 ${cx + dx * 1.8} 50`, {
        color: FIELD,
        width: 1.6,
      });
      svg.arrow(cx + dx * 1.45, 90, cx + dx * 1.7, 60, { color: FIELD, width: 1.6, head: 9 });
    }
    svg.text(cx + 105, 55, '**B**_{magnet} (increasing)', {
      size: 15,
      anchor: 'start',
      color: FIELD,
    });
    // Coil: back half, then front half over the field lines.
    svg.path(`M ${cx - 120} ${cy} A 120 32 0 0 1 ${cx + 120} ${cy}`, {
      color: '#b8860b',
      width: 5,
    });
    svg.path(`M ${cx - 120} ${cy} A 120 32 0 0 0 ${cx + 120} ${cy}`, {
      color: '#b8860b',
      width: 5,
    });
    // Clockwise seen from above: the front edge carries current to the left.
    svg.arrow(cx + 20, cy + 32, cx - 20, cy + 32, { color: CURRENT, width: 3.5, head: 13 });
    svg.text(cx, cy + 56, 'induced I (clockwise from above)', {
      size: 14,
      math: false,
      color: CURRENT,
    });
    // Induced field inside the coil.
    svg.arrow(cx - 80, cy - 70, cx - 80, cy + 10, { color: COLORS.green, width: 3, head: 12 });
    svg.text(cx - 88, cy - 60, '**B**_{induced}', { size: 15, anchor: 'end', color: COLORS.green });
    svg.text(cx + 140, cy + 6, 'lower face of coil = N', {
      size: 14,
      math: false,
      anchor: 'start',
    });
    // Magnet below the coil.
    svg.rect(cx - 18, 300, 36, 60, { fill: '#e57373', stroke: WIRE, width: 1.5 });
    svg.rect(cx - 18, 360, 36, 60, { fill: '#90a4ae', stroke: WIRE, width: 1.5 });
    svg.text(cx, 322, 'N', {
      size: 18,
      math: false,
      weight: 'bold',
      color: '#ffffff',
      halo: false,
    });
    svg.text(cx, 392, 'S', {
      size: 18,
      math: false,
      weight: 'bold',
      color: '#ffffff',
      halo: false,
    });
    svg.arrow(cx - 60, 400, cx - 60, 320, { color: COLORS.black, width: 2.5, head: 12 });
    svg.text(cx - 70, 360, '**v**', { size: 16, anchor: 'end' });
    svg.arrow(cx + 50, 320, cx + 50, 400, { color: FORCE, width: 3.5, head: 13 });
    svg.text(cx + 60, 370, '**F** on magnet', { size: 15, anchor: 'start', math: false });
    return svg.render();
  },

  // 23.2 Q2 — a particle passing through a pickup coil
  concept_23_02_q02: () => {
    const svg = new Svg({
      width: 600,
      height: 440,
      title: 'Flux and induced voltage as a charged particle passes a coil',
      desc: 'Top: the magnetic flux through the coil versus time, a symmetric peak centered on the instant the particle passes through the coil. Bottom: the induced voltage versus time, a positive pulse while the flux is rising and an equal negative pulse while it is falling, crossing zero at the instant the particle passes.',
    });
    const flux = u => 1 / (1 + u * u) ** 1.5;
    const volt = u => (3 * -u) / (1 + u * u) ** 2.5 / 0.86;
    const g1 = new Plot(svg, { x: 90, y: 40, w: 440, h: 140, xRange: [-4, 4], yRange: [0, 1.15] });
    g1.axes({
      yTitle: 'Flux Φ',
      arrows: true,
      titleSize: 15,
      yTitleOffset: 30,
      xLabelsAtAxis: true,
    });
    g1.fn(flux, -4, 4, { color: COLORS.accel });
    const g2 = new Plot(svg, {
      x: 90,
      y: 230,
      w: 440,
      h: 170,
      xRange: [-4, 4],
      yRange: [-1.15, 1.15],
    });
    g2.axes({ yTitle: 'Voltage', arrows: true, titleSize: 15, yTitleOffset: 30 });
    g2.fn(volt, -4, 4, { color: COLORS.blue });
    svg.text(g2.X(4) + 20, g2.Y(0), 't', { size: 17 });
    for (const g of [g1, g2])
      g.line(0, g.yRange[0], 0, g.yRange[1], { color: COLORS.guide, width: 1, dash: '5 4' });
    svg.text(g1.X(0) + 8, g1.Y(1.12), 'particle passes coil', {
      size: 13,
      math: false,
      anchor: 'start',
    });
    svg.text(g2.X(-1.7), g2.Y(0.95), 'flux rising', { size: 13, math: false });
    svg.text(g2.X(1.7), g2.Y(-0.95), 'flux falling', { size: 13, math: false });
    return svg.render();
  },

  // 23.5 Q1 — emfs in the two sides of a generator loop
  concept_23_05_q01: () => {
    const svg = new Svg({
      width: 620,
      height: 400,
      title: 'Emfs in the sides of a generator loop',
      desc: 'Front view of a generator loop between N on the left and S on the right, with the field pointing right. The left side moves out of the page and the right side moves into the page. RHR-1 gives a force on positive charges up along the left side and down along the right side, so both emfs drive current the same way around the loop and add.',
    });
    pole(svg, 20, 80, 80, 240, 'N');
    pole(svg, 520, 80, 80, 240, 'S');
    for (const y of [110, 200, 290])
      svg.arrow(110, y, 510, y, { color: FIELD, width: 1.6, head: 10 });
    svg.text(495, 98, '**B**', { size: 16 });
    const L = 220;
    const R = 400;
    const T = 90;
    const B = 310;
    svg.line(310, 40, 310, 360, { color: COLORS.guide, width: 1.4, dash: '8 5' });
    svg.text(318, 46, 'axis', { size: 13, math: false, anchor: 'start' });
    svg.rect(L, T, R - L, B - T, { stroke: '#b8860b', width: 5 });
    outOfPage(svg, L - 32, 200, { r: 10, color: COLORS.black });
    intoPage(svg, R + 32, 200, { r: 10, color: COLORS.black });
    svg.text(L - 32, 230, '**v** out', { size: 14, math: false });
    svg.text(R + 32, 230, '**v** in', { size: 14, math: false });
    svg.arrow(L, 230, L, 160, { color: FORCE, width: 3.5, head: 14 });
    svg.arrow(R, 160, R, 230, { color: FORCE, width: 3.5, head: 14 });
    svg.text(L + 12, 150, 'emf up', { size: 14, math: false, anchor: 'start', color: FORCE });
    svg.text(R - 12, 250, 'emf down', { size: 14, math: false, anchor: 'end', color: FORCE });
    svg.arrow(290, T, 330, T, { color: CURRENT, width: 3, head: 12 });
    svg.arrow(330, B, 290, B, { color: CURRENT, width: 3, head: 12 });
    svg.text(310, T - 16, 'I', { size: 16, color: CURRENT });
    svg.lines(310, 380, ['Both emfs drive current the same way around the loop, so they add.'], {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 25.2 Q1 — specular reflection from oily skin, diffuse reflection from powder
  concept_25_02_q01: () => {
    const W = 760;
    const H = 300;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Specular and diffuse reflection',
      desc: 'Left: light reflecting from smooth, oily skin; all the surface perpendiculars are parallel, so parallel incoming rays leave parallel and the reflection is a concentrated glare. Right: light reflecting from a layer of powder grains; the perpendiculars point in many directions, so the reflected rays are scattered in all directions and no shine is seen.',
    });
    const yS = 230;
    const inc = dir(-60); // incoming rays travel down and to the right
    const drawRays = (x0, surface) => {
      for (let k = 0; k < 6; k += 1) {
        const hx = x0 + 100 + k * 37;
        const { y, n } = surface(hx);
        const start = [hx - inc[0] * 170, y - inc[1] * 170];
        ray(svg, start, [hx, y], { color: COLORS.orange });
        const out = reflect(inc, n);
        if (out[1] < -0.05)
          ray(svg, [hx, y], [hx + out[0] * 120, y + out[1] * 120], { color: RAY });
      }
    };
    caption(svg, 0, '(a) Smooth, oily skin: specular');
    svg.rect(30, yS, 330, 40, { fill: '#f3d2b5' });
    svg.line(30, yS, 360, yS, { color: WIRE, width: 2 });
    drawRays(0, () => ({ y: yS, n: [0, -1] }));
    divider(svg, W / 2, H);
    caption(svg, W / 2, '(b) Powdered skin: diffuse');
    // Bumpy surface y = yS + A·sin(kx + φ); the normal comes from its slope.
    const A = 5;
    const kx = 0.075;
    const bump = x => yS + A * Math.sin(kx * x + 1.3 * Math.sin(0.05 * x));
    const slope = x => (bump(x + 0.5) - bump(x - 0.5)) / 1;
    const pts = [];
    for (let x = W / 2 + 30; x <= W - 20; x += 2) pts.push([x, bump(x)]);
    svg.polygon([...pts, [W - 20, yS + 40], [W / 2 + 30, yS + 40]], { fill: '#f3d2b5' });
    svg.polyline(pts, { color: WIRE, width: 2 });
    drawRays(W / 2, x => {
      const m = slope(x);
      const len = Math.hypot(m, 1);
      return { y: bump(x), n: [m / len, -1 / len] };
    });
    return svg.render();
  },

  // 25.3 Q5 — apparent depth
  concept_25_03_q05: () => {
    const svg = new Svg({
      width: 560,
      height: 440,
      title: 'Apparent depth of an object under water',
      desc: 'A stone on the bottom of a pond, 2.00 meters deep. Two rays from the stone bend away from the perpendicular as they leave the water and enter an observer’s eye. Traced straight back, the rays appear to come from a point 1.50 meters below the surface, so the stone appears shallower than it is.',
    });
    const yW = 170;
    const depth = 220;
    const S = [200, yW + depth];
    svg.rect(20, yW, 520, depth + 30, { fill: WATER });
    svg.line(20, yW, 540, yW, { color: COLORS.blue, width: 2 });
    svg.rect(20, S[1] + 8, 520, 22, { fill: '#c8b38a' });
    svg.circle(S[0], S[1], 9, { fill: '#7f7f7f', stroke: WIRE, width: 1 });
    const n = 1.333;
    const exits = [];
    // Nearly vertical rays, as for an observer looking down into the water.
    for (const a of [6, 11]) {
      const d = [Math.sin(rad(a)), -Math.cos(rad(a))];
      const P = [S[0] + (depth * d[0]) / -d[1], yW];
      ray(svg, S, P);
      const out = refract(d, [0, 1], n, 1);
      ray(svg, P, [P[0] + out[0] * 140, P[1] + out[1] * 140]);
      exits.push([P, out]);
    }
    const I = intersect(exits[0][0], exits[0][1], exits[1][0], exits[1][1]);
    for (const [P] of exits) svg.line(...P, ...I, { color: RAY, width: 1.4, dash: '6 4' });
    svg.circle(I[0], I[1], 9, { fill: '#bdbdbd', stroke: WIRE, width: 1 });
    svg.text(I[0] - 16, I[1], 'apparent position', { size: 14, math: false, anchor: 'end' });
    svg.text(S[0] - 16, S[1] - 2, 'stone', { size: 14, math: false, anchor: 'end' });
    const top = exits[1][0][0] + exits[1][1][0] * 140;
    eye(svg, top - 10, yW + exits[1][1][1] * 140 - 12, -90);
    // Depth labels, to scale: the paraxial apparent depth is d/1.333.
    const xd = 470;
    svg.arrow(xd, yW, xd, S[1], { color: COLORS.black, width: 1.4, head: 9, start: true });
    svg.text(xd + 8, (yW + S[1]) / 2, 'd = 2.00 \\rm{m}', { size: 14, anchor: 'start' });
    svg.arrow(xd - 50, yW, xd - 50, I[1], {
      color: COLORS.guide,
      width: 1.4,
      head: 9,
      start: true,
    });
    svg.text(xd - 58, (yW + I[1]) / 2, 'd_{app} = 1.50 \\rm{m}', { size: 14, anchor: 'end' });
    svg.text(30, yW - 14, 'air, n = 1.00', { size: 14, anchor: 'start' });
    svg.text(30, yW + 18, 'water, n = 1.333', { size: 14, anchor: 'start' });
    return svg.render();
  },

  // 25.3 Q6 — legs look short in a pool
  concept_25_03_q06: () => {
    const svg = new Svg({
      width: 600,
      height: 440,
      title: 'Why legs look short in a pool',
      desc: 'A person standing in a pool, seen by an observer at the side of the pool. Rays from the feet bend away from the perpendicular as they leave the water, so the observer traces them back to an image of the feet higher than the real feet. The legs below the surface appear shortened to about three quarters of their real length.',
    });
    const yW = 220;
    const yF = 400;
    const xP = 430;
    svg.rect(150, yW, 430, yF - yW + 20, { fill: WATER });
    svg.line(150, yW, 580, yW, { color: COLORS.blue, width: 2 });
    svg.rect(20, yW, 130, yF - yW + 20, { fill: '#d7ccc8' });
    person(svg, xP, yF, 330);
    const E = [270, 30];
    eye(svg, E[0], E[1], -60);
    const n = 1.333;
    const F = [xP, yF];
    // Surface point where a ray from the feet refracts toward `target` (Snell's law, by bisection).
    const solve = target => {
      const miss = x => {
        const sinW = (F[0] - x) / Math.hypot(F[0] - x, F[1] - yW);
        const sinA = (x - target[0]) / Math.hypot(x - target[0], yW - target[1]);
        return n * sinW - sinA;
      };
      let a = target[0] + 1;
      let b = F[0] - 1;
      for (let k = 0; k < 60; k += 1) {
        const m = (a + b) / 2;
        if (miss(a) * miss(m) <= 0) b = m;
        else a = m;
      }
      return [(a + b) / 2, yW];
    };
    // Two neighboring rays reaching the eye; their back-extensions meet at the image of the feet.
    const E2 = [E[0] + 6, E[1]];
    const P = solve(E);
    const P2 = solve(E2);
    ray(svg, F, P);
    ray(svg, P, E);
    const I = intersect(P, unit(E, P), P2, unit(E2, P2));
    svg.line(P[0], P[1], I[0], I[1], { color: RAY, width: 1.4, dash: '6 4' });
    const hip = yF - 330 * 0.5;
    const leg = x => [x, yW];
    for (const s of [-1, 1]) {
      const at = leg(xP + (s * 330 * 0.06 * (yW - hip)) / (yF - hip));
      svg.line(...at, I[0] + s * 330 * 0.06 * ((I[1] - yW) / (yF - yW)), I[1], {
        color: COLORS.guide,
        width: 2.5,
        dash: '6 4',
      });
    }
    svg.circle(I[0], I[1], 4, { fill: RAY });
    svg.text(I[0] - 14, I[1] + 4, 'apparent feet', { size: 14, math: false, anchor: 'end' });
    svg.text(xP + 26, yF - 4, 'real feet', { size: 14, math: false, anchor: 'start' });
    svg.line(P[0], P[1] - 40, P[0], P[1] + 40, { color: COLORS.guide, width: 1, dash: '3 3' });
    svg.text(E[0] - 16, E[1] + 4, 'observer', { size: 13, math: false, anchor: 'end' });
    svg.text(570, yW + 18, 'water', { size: 14, math: false, anchor: 'end' });
    return svg.render();
  },

  // 25.3 Q8 — refraction into a negative-index material
  concept_25_03_q08: () => {
    const svg = new Svg({
      width: 560,
      height: 420,
      title: 'Refraction into a material with a negative index',
      desc: 'A ray in air strikes a surface at 40 degrees to the perpendicular. In an ordinary material of index 1.3, it refracts to 29.6 degrees on the opposite side of the perpendicular and continues forward. In a material of index negative 1.3, it refracts to 29.6 degrees on the same side of the perpendicular as the incident ray, bending back toward the side it came from.',
    });
    const O = [280, 200];
    svg.rect(20, O[1], 520, 200, { fill: '#e8eaf6' });
    svg.line(20, O[1], 540, O[1], { color: WIRE, width: 2 });
    svg.line(O[0], 30, O[0], 390, { color: COLORS.guide, width: 1.3, dash: '6 4' });
    const t1 = 40;
    const t2 = (Math.asin(Math.sin(rad(t1)) / 1.3) * 180) / Math.PI;
    const L = 200;
    const A = [O[0] - L * Math.sin(rad(t1)), O[1] - L * Math.cos(rad(t1))];
    ray(svg, A, O);
    const pos = [O[0] + L * Math.sin(rad(t2)), O[1] + L * Math.cos(rad(t2))];
    const neg = [O[0] - L * Math.sin(rad(t2)), O[1] + L * Math.cos(rad(t2))];
    ray(svg, O, pos, { color: COLORS.guide, dash: '8 5' });
    ray(svg, O, neg, { color: RAY, width: 2.8 });
    svg.arc(O[0], O[1], 60, 90, 90 + t1, { color: WIRE });
    svg.text(O[0] - 34, O[1] - 74, '40.0°', { size: 14 });
    svg.arc(O[0], O[1], 70, 270 - t2, 270, { color: RAY });
    svg.text(O[0] - 26, O[1] + 92, '29.6°', { size: 14, color: RAY });
    svg.text(pos[0] + 6, pos[1] - 6, 'n = +1.3', {
      size: 15,
      anchor: 'start',
      color: COLORS.guide,
    });
    svg.text(neg[0] - 6, neg[1] - 6, 'n = −1.3', { size: 15, anchor: 'end', color: RAY });
    svg.text(40, O[1] - 16, 'air, n = 1.00', { size: 14, anchor: 'start' });
    svg.text(530, O[1] + 24, 'material', { size: 14, math: false, anchor: 'end' });
    return svg.render();
  },

  // 25.4 Q4 — a desert mirage
  concept_25_04_q04: () => {
    const svg = new Svg({
      width: 700,
      height: 340,
      title: 'How a mirage forms over a hot road',
      desc: 'Light from the sky travels down at a shallow angle toward a hot road. In each lower, hotter layer the index of refraction is smaller, so the ray bends away from the vertical until it travels horizontally, then curves upward into the observer’s eye. The observer sees an image of the sky below the horizon, on the road, which looks like a pool of water.',
    });
    const yR = 280;
    const bands = ['#fffdf5', '#fff6e0', '#ffedc8', '#ffe2ad'];
    svg.rect(20, 20, 660, 155, { fill: '#e3f2fd' });
    bands.forEach((c, k) => svg.rect(20, 175 + k * 26, 660, 26, { fill: c }));
    svg.rect(20, yR, 660, 30, { fill: '#7d7d7d' });
    svg.text(30, yR + 18, 'hot road', {
      size: 13,
      math: false,
      anchor: 'start',
      color: '#ffffff',
      halo: false,
    });
    svg.text(200, 190, 'cooler air, larger n', { size: 13, math: false, anchor: 'start' });
    svg.text(30, 270, 'hot air, smaller n', { size: 13, math: false, anchor: 'start' });
    // A curved ray, y = yMin − c·(x − x0)², from the sky down to just above the road and up to the eye.
    const x0 = 330;
    const yMin = 268;
    const c = 0.0011;
    const f = x => yMin - c * (x - x0) ** 2;
    const xE = 610;
    const pts = [];
    for (let x = 30; x <= xE; x += 5) pts.push([x, f(x)]);
    svg.polyline(pts, { color: RAY, width: 2.4 });
    svg.arrow(...pts[20], ...pts[23], { color: RAY, width: 2.4, head: 11 });
    svg.arrow(...pts[90], ...pts[93], { color: RAY, width: 2.4, head: 11 });
    const E = [xE, f(xE)];
    const slope = -2 * c * (xE - x0);
    eye(svg, E[0] + 10, E[1], 180 + (Math.atan(slope) * 180) / Math.PI);
    person(svg, 650, yR, (yR - E[1]) / 0.87);
    // The eye traces the arriving ray straight back, to a point on the road.
    const xi = E[0] + (yR - E[1]) / slope;
    svg.line(...E, xi, yR, { color: RAY, width: 1.4, dash: '6 4' });
    svg.ellipse(xi, yR - 4, 60, 6, { fill: '#9ecae1', stroke: '#6baed6', width: 1 });
    svg.text(xi, yR + 18, 'image of the sky (looks like water)', {
      size: 13,
      math: false,
      color: '#ffffff',
      halo: false,
    });
    svg.text(30, pts[0][1] - 16, 'light from the sky', { size: 13, math: false, anchor: 'start' });
    return svg.render();
  },

  // 25.6 Q2 — double reflection from a sheet of glass
  concept_25_06_q02: () => {
    const svg = new Svg({
      width: 680,
      height: 420,
      title: 'Double image from the two surfaces of a glass sheet',
      desc: 'Light from an object reflects from both the front and back surfaces of a sheet of glass. The two reflected rays leave parallel to each other but slightly offset, so the eye sees two images, one from each surface, the second slightly behind and displaced from the first.',
    });
    const xf = 300;
    const t = 40;
    const xb = xf + t;
    svg.rect(xf, 20, t, 370, { fill: '#d9f0f7', stroke: COLORS.blue, width: 1.5 });
    svg.text(xf + t / 2, 406, 'glass', { size: 13, math: false });
    const O = [170, 330];
    svg.circle(O[0], O[1], 8, { fill: COLORS.orange, stroke: WIRE, width: 1 });
    svg.text(O[0] - 14, O[1], 'object', { size: 14, math: false, anchor: 'end' });
    const n = 1.52;
    // A ray from O at angle a (degrees above +x): into the glass, off the back surface, and out of the front.
    const path2 = a => {
      const d = dir(a);
      const P1 = [xf, O[1] + ((xf - O[0]) * d[1]) / d[0]];
      const din = refract(d, [-1, 0], 1, n);
      const P2 = [xb, P1[1] + ((xb - xf) * din[1]) / din[0]];
      const dref = [-din[0], din[1]];
      const P3 = [xf, P2[1] + ((xf - xb) * dref[1]) / dref[0]];
      const dout = refract(dref, [1, 0], n, 1);
      return { P1, P2, P3, dout };
    };
    const d1 = dir(35);
    const Q1 = [xf, O[1] + ((xf - O[0]) * d1[1]) / d1[0]];
    const r1 = [-d1[0], d1[1]];
    const E = [Q1[0] + r1[0] * 160, Q1[1] + r1[1] * 160];
    // Choose the second ray's angle so that its exit ray also reaches the eye.
    const miss = a => {
      const { P3, dout } = path2(a);
      return P3[1] + ((E[0] - P3[0]) / dout[0]) * dout[1] - E[1];
    };
    let lo = 20;
    let hi = 34.9;
    for (let k = 0; k < 60; k += 1) {
      const m = (lo + hi) / 2;
      if (miss(lo) * miss(m) <= 0) hi = m;
      else lo = m;
    }
    const p = path2((lo + hi) / 2);
    ray(svg, O, Q1);
    ray(svg, Q1, E);
    ray(svg, O, p.P1, { color: COLORS.blue });
    svg.line(...p.P1, ...p.P2, { color: COLORS.blue, width: 2 });
    svg.line(...p.P2, ...p.P3, { color: COLORS.blue, width: 2 });
    ray(svg, p.P3, E, { color: COLORS.blue });
    eye(svg, E[0] - 10, E[1] - 4, (Math.atan2(-(Q1[1] - E[1]), Q1[0] - E[0]) * 180) / Math.PI);
    // Image 1 is the mirror image of O in the front surface; image 2 lies on the back-extension of the second ray.
    const I1 = [2 * xf - O[0], O[1]];
    svg.line(...Q1, ...I1, { color: RAY, width: 1.4, dash: '6 4' });
    const I2 = intersect(p.P3, p.dout, I1, [1, 0]);
    svg.line(...p.P3, ...I2, { color: COLORS.blue, width: 1.4, dash: '6 4' });
    svg.circle(...I1, 7, { fill: '#ffffff', stroke: RAY, width: 2 });
    svg.circle(...I2, 7, { fill: '#ffffff', stroke: COLORS.blue, width: 2 });
    svg.text(I1[0], I1[1] + 26, 'image from front surface', { size: 13, math: false, color: RAY });
    svg.text(I2[0] + 10, I2[1] - 16, 'image from back surface', {
      size: 13,
      math: false,
      anchor: 'start',
      color: COLORS.blue,
    });
    return svg.render();
  },

  // 25.7 Q7 — a case 1 image larger than the object
  concept_25_07_q07: () => {
    const svg = new Svg({
      width: 720,
      height: 400,
      title: 'Ray diagram: object between f and 2f of a converging lens',
      desc: 'Ray diagram for a converging lens with focal length 10 centimeters and an object 15 centimeters away, between f and 2f. Three principal rays from the tip of the object meet 30 centimeters on the other side of the lens, forming a real, inverted image twice as tall as the object.',
    });
    const s = 12; // px per cm
    const L = [270, 150];
    const X = cm => L[0] + cm * s;
    const f = 10;
    const dO = 15;
    const dI = 1 / (1 / f - 1 / dO);
    const hO = 4;
    const hI = (-dI / dO) * hO;
    const Y = cm => L[1] - cm * s;
    svg.line(20, L[1], 700, L[1], { color: COLORS.guide, width: 1.2 });
    svg.ellipse(L[0], L[1], 10, 125, { fill: '#d9f0f7', stroke: COLORS.blue, width: 1.5 });
    for (const [x, lab] of [
      [-f, 'F'],
      [f, 'F'],
      [-2 * f, '2F'],
      [2 * f, '2F'],
    ]) {
      svg.circle(X(x), L[1], 3.5, { fill: WIRE });
      svg.text(X(x), L[1] + 18, lab, { size: 14, math: false });
    }
    const tip = [X(-dO), Y(hO)];
    const img = [X(dI), Y(hI)];
    svg.arrow(X(-dO), L[1], ...tip, { color: COLORS.green, width: 3.5, head: 13 });
    svg.arrow(X(dI), L[1], ...img, { color: COLORS.accel, width: 3.5, head: 13 });
    // Ray 1: parallel, then through the far focal point.
    ray(svg, tip, [L[0], tip[1]]);
    ray(svg, [L[0], tip[1]], img);
    // Ray 2: straight through the center.
    ray(svg, tip, img, { color: COLORS.orange });
    // Ray 3: through the near focal point, then parallel.
    const hit3 = [L[0], img[1]];
    ray(svg, tip, hit3, { color: COLORS.blue });
    ray(svg, hit3, img, { color: COLORS.blue });
    svg.text(X(-dO), Y(hO) - 16, 'object', { size: 14, math: false });
    svg.text(X(dI) - 8, Y(hI) + 22, 'image (m = −2.00)', { size: 14, anchor: 'end' });
    svg.brace(X(-dO), L[0] - 4, L[1] + 150, { up: false, depth: 10 });
    svg.text((X(-dO) + L[0]) / 2, L[1] + 176, 'd_o = 15.0 \\rm{cm}', { size: 14 });
    svg.brace(L[0] + 4, X(dI), L[1] + 150, { up: false, depth: 10 });
    svg.text((L[0] + X(dI)) / 2, L[1] + 176, 'd_i = 30.0 \\rm{cm}', { size: 14 });
    return svg.render();
  },

  // 25.7 Q9 — two mirrors to see the back of your head
  concept_25_07_q09: () => {
    const svg = new Svg({
      width: 600,
      height: 420,
      title: 'Seeing the back of your head with two mirrors',
      desc: 'Top view of a person standing between two flat mirrors, one behind the head and one held in front. Light from the back of the head reflects from the rear mirror, travels forward past the head to the front mirror, and reflects back into the eyes, so the person sees an image of the back of their head.',
    });
    const C = [260, 290];
    const r = 40;
    svg.circle(...C, r, { fill: '#f3d2b5', stroke: WIRE, width: 2 });
    svg.polygon(
      [
        [C[0] + r - 2, C[1] - 8],
        [C[0] + r + 12, C[1]],
        [C[0] + r - 2, C[1] + 8],
      ],
      { fill: '#f3d2b5', stroke: WIRE, width: 1.5 }
    );
    svg.text(C[0], C[1] + r + 20, 'head (facing right)', { size: 13, math: false });
    const Eye = [C[0] + 28, C[1] - 26];
    svg.circle(...Eye, 4, { fill: COLORS.blue });
    const Bk = [C[0] - r, C[1]];
    const xm = 120;
    svg.line(xm, 90, xm, 390, { color: COLORS.blue, width: 6 });
    svg.text(xm - 10, 100, 'rear mirror', { size: 13, math: false, anchor: 'end' });
    const M1 = [xm, C[1] - 45];
    const d1 = unit(Bk, M1);
    const d2 = [-d1[0], d1[1]];
    // Hand mirror where the reflected ray reaches x = 470.
    const M2 = [470, M1[1] + ((470 - M1[0]) * d2[1]) / d2[0]];
    const d3 = unit(M2, Eye);
    // The mirror's normal bisects the reversed incoming ray and the outgoing ray.
    const nx = d3[0] - d2[0];
    const ny = d3[1] - d2[1];
    const nl = Math.hypot(nx, ny);
    const tx = -ny / nl;
    const ty = nx / nl;
    svg.line(M2[0] - tx * 45, M2[1] - ty * 45, M2[0] + tx * 45, M2[1] + ty * 45, {
      color: COLORS.blue,
      width: 6,
    });
    svg.text(M2[0] - 40, M2[1] - 30, 'hand mirror', { size: 13, math: false, anchor: 'end' });
    ray(svg, Bk, M1);
    ray(svg, M1, M2);
    ray(svg, M2, Eye);
    svg.circle(...Bk, 4, { fill: RAY });
    svg.text(Bk[0] - 6, Bk[1] + 22, 'back of head', { size: 13, math: false, anchor: 'end' });
    svg.text(Eye[0] + 10, Eye[1] - 10, 'eye', { size: 13, math: false, anchor: 'start' });
    svg.text(580, 400, 'Top view', { size: 15, math: false, weight: 'bold', anchor: 'end' });
    return svg.render();
  },

  // 25.7 Q10 — how tall a full-length mirror must be
  concept_25_07_q10: () => {
    const svg = new Svg({
      width: 620,
      height: 440,
      title: 'Minimum height of a full-length mirror',
      desc: 'A person 1.80 meters tall stands in front of a flat wall mirror. The ray from the toes reflects into the eye from a point at half the eye height, and the ray from the top of the head reflects from a point halfway between the eye and the top of the head. The mirror needs to extend only between these two points, 0.90 meters, half the person’s height, whatever the distance from the mirror.',
    });
    const s = 200; // px per m
    const yF = 400;
    const Y = m => yF - m * s;
    const xP = 150;
    const xM = 330;
    const xI = 2 * xM - xP;
    svg.line(40, yF, 600, yF, { color: WIRE, width: 2 });
    person(svg, xP, yF, 1.8 * s);
    person(svg, xI, yF, 1.8 * s, { color: '#9e9e9e', dash: '6 4' });
    const eyeY = Y(1.7);
    svg.circle(xP + 4, eyeY, 3.5, { fill: COLORS.blue });
    svg.line(xM, Y(0.85), xM, Y(1.75), { color: COLORS.blue, width: 7 });
    svg.line(xM, Y(0), xM, Y(2.0), { color: COLORS.blue, width: 1, dash: '3 4' });
    const toe = [xP + 10, yF];
    const top = [xP, Y(1.8)];
    const E = [xP + 4, eyeY];
    ray(svg, toe, [xM, Y(0.85)]);
    ray(svg, [xM, Y(0.85)], E);
    ray(svg, top, [xM, Y(1.75)], { color: COLORS.orange });
    ray(svg, [xM, Y(1.75)], E, { color: COLORS.orange });
    svg.line(xM, Y(0.85), 2 * xM - toe[0], yF, { color: RAY, width: 1.3, dash: '6 4' });
    svg.line(xM, Y(1.75), 2 * xM - top[0], top[1], {
      color: COLORS.orange,
      width: 1.3,
      dash: '6 4',
    });
    svg.text(xM + 12, Y(1.3), 'mirror 0.90 \\rm{m}', { size: 14, anchor: 'start' });
    svg.text(xM + 12, Y(0.85) + 4, '0.85 \\rm{m}', { size: 13, anchor: 'start' });
    svg.text(xM + 12, Y(1.75) - 4, '1.75 \\rm{m}', { size: 13, anchor: 'start' });
    svg.text(xP - 16, eyeY, 'eyes 1.70 \\rm{m}', { size: 13, anchor: 'end' });
    svg.text(xP - 16, Y(1.8) - 6, '1.80 \\rm{m}', { size: 13, anchor: 'end' });
    svg.text(xI, Y(1.8) - 20, 'image', { size: 13, math: false, color: '#757575' });
    return svg.render();
  },
};
