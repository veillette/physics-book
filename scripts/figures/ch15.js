/**
 * Chapter 15: thermodynamics — the first law, simple processes, heat engines,
 * heat pumps, and entropy.
 *
 * PV diagrams are computed rather than sketched: isotherms are PV = const and
 * adiabats PV^γ = const (γ = 5/3), so the Carnot cycle's four corners close
 * exactly and an adiabat is always steeper than the isotherm through the same
 * point. Exercise graphs use the values the problems state.
 *
 * In the engine and heat-pump diagrams the widths of the heat and work arrows
 * are proportional to the energies they carry, so Q_h = W + Q_c can be read
 * from the drawing; the numbered Carnot engines of 15.6 use their numbers.
 */
import { rng, scatter, within } from './ch13.js';
import { curve, gradient, heatArrow, heatPolygon } from './ch14.js';
import { earth } from './ch28.js';
import { COLORS, Plot, Svg, fmt } from './svg.js';

const ARROW = COLORS.black;
const SALMON = '#ef8a68';
const PALE = '#fde6db';
const WBLUE = '#8ea3cc';
const HOT_FILL = '#fbe1d3';
const HOT_EDGE = '#ee9a7a';
const COLD_FILL = '#dfe5f1';
const COLD_EDGE = '#8a9fcf';
const LOOP = '#c4aad3';
const LOOP_EDGE = '#6a3d9a';
const ISO = '#1aa6b7';
const RED = '#e0155d';
const GAMMA = 5 / 3;

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** Sans-serif label with italic variables (OpenStax style). */
function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, math: false, italic: true, ...o });
}

function labs(svg, x, y, list, o = {}) {
  svg.lines(x, y, list, { size: 22, math: false, italic: true, gap: 27, ...o });
}

function reservoir(svg, x, y, w, h, hot) {
  svg.rect(x, y, w, h, {
    fill: hot ? HOT_FILL : COLD_FILL,
    stroke: hot ? HOT_EDGE : COLD_EDGE,
    width: 1.5,
  });
}

/** The pale glowing disk that stands for an engine or a heat pump. */
function ball(svg, cx, cy, r) {
  svg.gradients = (svg.gradients || 0) + 1;
  const id = `r${svg.gradients}`;
  svg.add(
    `<defs><radialGradient id="${id}"><stop offset="0" stop-color="#fdeee8"/><stop offset="0.75" stop-color="#fbf0d2"/><stop offset="1" stop-color="#f8e7b4"/></radialGradient></defs>`
  );
  svg.circle(cx, cy, r, { fill: `url(#${id})`, stroke: '#eadb9e', width: 1.5 });
}

/** Points of a quarter turn of radius r from angle a1 to a2 (radians, y down) about (cx, cy). */
function turn(cx, cy, r, a1, a2, n = 16) {
  const pts = [];
  for (let k = 0; k <= n; k += 1) {
    const a = a1 + ((a2 - a1) * k) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

const WAVE = { amp: 4, period: 52, taper: false };

/**
 * A heat engine between reservoirs: Q_h leaves the hot reservoir and splits in
 * the engine into W (turning right) and Q_c (down to the cold reservoir). The
 * widths qc, qf, and w are proportional to the energies; a nonzero qf peels a
 * friction loss Q_f off beside Q_c.
 */
function engine(
  svg,
  cx,
  top,
  { qc = 36, w = 30, qf = 0, reach = 190, labels = {}, carnot = 0 } = {}
) {
  const L = { th: 'T_h', tc: 'T_c', qh: 'Q_h', qc: 'Q_c', w: 'W', ...labels };
  const cy = top + 228;
  reservoir(svg, cx - 100, top, 200, 110, true);
  reservoir(svg, cx - 100, top + 350, 200, 110, false);
  ball(svg, cx, cy, 98);
  const total = qc + qf + w;
  const xl = cx - total / 2;
  const [y0, yEnd] = [top + 52, top + 428];
  const xc = xl + qc / 2;
  const xf = xl + qc + qf / 2;
  const xw = xl + qc + qf + w / 2;
  const split = qf ? 16 : 0;
  const rr = w / 2 + 16;
  const wPath = [[xw, y0], ...turn(xw + rr, cy - rr, rr, Math.PI, Math.PI / 2), [cx + reach, cy]];
  if (carnot) {
    // The Carnot engine's larger W, outlined: it takes `carnot` more from Q_c.
    const xb = xw - carnot / 2;
    const rb = (w + carnot) / 2 + 16;
    const { poly } = heatPolygon(
      [[xb, y0], ...turn(xb + rb, cy - rb, rb, Math.PI, Math.PI / 2), [cx + reach + 20, cy]],
      { w: w + carnot, ...WAVE }
    );
    svg.add(
      `<polygon points="${poly.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(' ')}" fill="none" stroke="#c0392b" stroke-width="1.5" stroke-dasharray="6 5"/>`
    );
  }
  heatArrow(
    svg,
    [
      [xc, y0],
      [xc, cy + 10],
      [xc - split, cy + 50],
      [xc - split, yEnd],
    ],
    { w: qc, ...WAVE }
  );
  if (qf)
    heatArrow(
      svg,
      [
        [xf, y0],
        [xf, cy + 10],
        [xf + split, cy + 50],
        [xf + split, yEnd],
      ],
      { w: qf, ...WAVE }
    );
  heatArrow(svg, wPath, { w, ...WAVE, color: WBLUE, fade: PALE });
  lab(svg, cx, top + 26, L.th, { halo: false });
  lab(svg, cx, top + 437, L.tc, { halo: false });
  if (L.qh) lab(svg, cx, top + 84, L.qh, { halo: false });
  if (L.qc) lab(svg, xc - split, yEnd - 34, L.qc, { halo: false, size: 20 });
  if (L.w) lab(svg, cx + reach - 34, cy, L.w, { halo: false, anchor: 'end' });
  return { cy, xc: xc - split, xf: xf + split, xw, y0, yEnd, top };
}

/**
 * A heat pump (or refrigerator): Q_c rises from the cold reservoir and joins
 * the work W' brought in from the right; together they deliver Q_h = Q_c + W'
 * to the hot reservoir. A nonzero qf diverts part of the input work W to the
 * cold reservoir as friction heat Q_f.
 */
function pump(svg, cx, top, { qc = 30, w = 30, qf = 0, from = 230, labels = {} } = {}) {
  const L = { th: 'T_h', tc: 'T_c', qh: 'Q_h', qc: 'Q_c', w: 'W', ...labels };
  const cy = top + 228;
  reservoir(svg, cx - 100, top, 200, 110, true);
  reservoir(svg, cx - 100, top + 350, 200, 110, false);
  ball(svg, cx, cy, 98);
  const total = qc + w;
  const xl = cx - total / 2;
  const xc = xl + qc / 2;
  const xw = xl + qc + w / 2;
  const [yJoin, tip] = [top + 92, top + 30];
  const join = { ...WAVE, anchor: 'end', noHead: true };
  heatArrow(
    svg,
    [
      [xc, top + 430],
      [xc, yJoin],
    ],
    { w: qc, ...join }
  );
  const rr = w / 2 + 16;
  heatArrow(
    svg,
    [[cx + 120, cy], ...turn(xw + rr, cy - rr, rr, Math.PI / 2, Math.PI), [xw, yJoin]],
    { w, ...join }
  );
  if (qf) {
    const yq = cy + w / 2 + qf / 2;
    const xq = cx + 60;
    heatArrow(
      svg,
      [[cx + 120, yq], ...curve([cx + 100, yq], [xq, yq], [xq, yq + 40]), [xq, top + 430]],
      {
        w: qf,
        ...WAVE,
      }
    );
    lab(svg, xq, top + 400, 'Q_f', { halo: false, size: 20 });
  }
  svg.polygon(
    [
      [cx - total * 0.85, yJoin + 1],
      [cx, tip],
      [cx + total * 0.85, yJoin + 1],
    ],
    { fill: SALMON }
  );
  heatArrow(
    svg,
    [
      [cx + from, cy + qf / 2],
      [cx + 105, cy + qf / 2],
    ],
    { w: w + qf, amp: 2, waves: 1, fade: '#f7b49c' }
  );
  lab(svg, cx, top + 26, L.th, { halo: false });
  lab(svg, cx, top + 437, L.tc, { halo: false });
  lab(svg, cx, yJoin - 18, L.qh, { halo: false });
  lab(svg, xc, top + 395, L.qc, { halo: false, size: 20 });
  lab(svg, cx + from - 30, cy + qf / 2, L.w, { halo: false, anchor: 'end' });
  return { cy, xw, xc };
}

/** PV axes with arrowheads: P up the left, V along the bottom. */
function pvAxes(svg, x, y, w, h, opts = {}) {
  const g = new Plot(svg, { x, y, w, h, xRange: [0, 1], yRange: [0, 1], ...opts });
  svg.arrow(x, y + h, x + w + 16, y + h, { color: COLORS.axis, width: 1.6, head: 12 });
  svg.arrow(x, y + h, x, y - 16, { color: COLORS.axis, width: 1.6, head: 12 });
  lab(svg, x - 14, y - 10, 'P', { anchor: 'end' });
  lab(svg, x + w + 14, y + h + 26, 'V');
  return g;
}

/** An arrowhead at fraction f along a polyline, pointing along it. */
function midArrow(svg, pts, f = 0.5, color = LOOP_EDGE, size = 13) {
  let total = 0;
  const seg = pts.slice(1).map((p, k) => {
    const d = Math.hypot(p[0] - pts[k][0], p[1] - pts[k][1]);
    total += d;
    return d;
  });
  let s = total * f;
  let k = 0;
  while (k < seg.length - 1 && s > seg[k]) {
    s -= seg[k];
    k += 1;
  }
  const [a, b] = [pts[k], pts[k + 1]];
  const [ux, uy] = [(b[0] - a[0]) / seg[k], (b[1] - a[1]) / seg[k]];
  const [x, y] = [a[0] + ux * s, a[1] + uy * s];
  svg.polygon(
    [
      [x + ux * size * 0.6, y + uy * size * 0.6],
      [x - ux * size * 0.4 - uy * size * 0.4, y - uy * size * 0.4 + ux * size * 0.4],
      [x - ux * size * 0.4 + uy * size * 0.4, y - uy * size * 0.4 - ux * size * 0.4],
    ],
    { fill: color }
  );
}

/** Sample f(v) from v0 to v1 into pixel points on plot g. */
function trace(g, f, v0, v1, n = 80) {
  const pts = [];
  for (let k = 0; k <= n; k += 1) {
    const v = v0 + ((v1 - v0) * k) / n;
    pts.push(g.P(v, f(v)));
  }
  return pts;
}

function dot(svg, [x, y], r = 5.5) {
  svg.circle(x, y, r, { fill: ARROW });
}

/** A vertical curly brace from y1 to y2 at x; `open` is +1 (pointing right) or −1. */
function vbrace(svg, x, y1, y2, open = 1) {
  const m = (y1 + y2) / 2;
  const d = 10 * open;
  svg.path(
    `M ${x - d} ${y1} Q ${x} ${y1} ${x} ${y1 + 12} L ${x} ${m - 10} Q ${x} ${m} ${x + d} ${m} Q ${x} ${m} ${x} ${m + 10} L ${x} ${y2 - 12} Q ${x} ${y2} ${x - d} ${y2}`,
    { color: ARROW, width: 1.5 }
  );
}

/** A straight, unwaved "work" arrow (flat band with a head). */
function workArrow(svg, a, b, w, { color = SALMON, fade = PALE } = {}) {
  heatArrow(svg, [a, b], { w, amp: 0, color, fade });
}

/** A side-on sedan facing right, its wheels resting on y. */
function car(svg, x, y) {
  const body = '#6fb3b8';
  const edge = '#3f7f84';
  svg.path(
    `M ${x} ${y - 30} L ${x + 4} ${y - 58} Q ${x + 30} ${y - 66} ${x + 70} ${y - 70} L ${x + 110} ${y - 108} Q ${x + 160} ${y - 118} ${x + 210} ${y - 106} L ${x + 255} ${y - 72} Q ${x + 300} ${y - 66} ${x + 312} ${y - 50} L ${x + 316} ${y - 26} Q ${x + 310} ${y - 14} ${x + 296} ${y - 14} L ${x + 18} ${y - 14} Q ${x} ${y - 14} ${x} ${y - 30} Z`,
    { color: edge, width: 1.5, fill: body }
  );
  svg.path(
    `M ${x + 118} ${y - 100} Q ${x + 140} ${y - 108} ${x + 168} ${y - 106} L ${x + 168} ${y - 74} L ${x + 92} ${y - 72} Z`,
    {
      color: edge,
      width: 1.2,
      fill: '#c9d8f0',
    }
  );
  svg.path(
    `M ${x + 178} ${y - 106} Q ${x + 210} ${y - 104} ${x + 240} ${y - 74} L ${x + 178} ${y - 74} Z`,
    {
      color: edge,
      width: 1.2,
      fill: '#c9d8f0',
    }
  );
  svg.line(x + 172, y - 74, x + 172, y - 20, { color: edge, width: 1.2 });
  for (const wx of [x + 65, x + 255]) {
    svg.circle(wx, y - 22, 24, { fill: '#3a3a3a' });
    svg.circle(wx, y - 22, 13, { fill: '#c7c8ca' });
    svg.circle(wx, y - 22, 5, { fill: '#6d6e71' });
  }
}

/** A horizontal piston and cylinder with a crank (15.2), for the three-stroke panels. */
function pistonPanel(svg, top, { px, ghost, pinAngle, extras }) {
  const [x0, cyl, h] = [70, top + 120, 170];
  const gas = '#fbe1d3';
  svg.rect(x0, cyl - h / 2, px - x0, h, { fill: gas });
  svg.path(
    `M ${px + 72} ${cyl - h / 2} L ${x0} ${cyl - h / 2} L ${x0} ${cyl + h / 2} L ${px + 72} ${cyl + h / 2}`,
    {
      color: HOT_EDGE,
      width: 1.5,
    }
  );
  if (ghost) {
    svg.add(
      `<ellipse cx="${ghost}" cy="${cyl}" rx="18" ry="${h / 2 - 4}" fill="none" stroke="#9a8f99" stroke-width="2.5" stroke-dasharray="7 5"/>`
    );
  }
  // Crank: a fixed wheel with the rod on a pin at `pinAngle` (degrees, math convention).
  const [wx, wy, R] = [430, cyl, 42];
  const pin = [
    wx + R * Math.cos((pinAngle * Math.PI) / 180),
    wy - R * Math.sin((pinAngle * Math.PI) / 180),
  ];
  svg.rect(wx - 28, wy - 62, 56, 124, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1.2, rx: 6 });
  svg.circle(wx, wy, 36, { fill: '#a7a9ac', stroke: '#6d6e71', width: 1.2 });
  svg.line(px + 72, cyl, ...pin, { color: '#8a8c8f', width: 18, cap: 'round' });
  svg.circle(...pin, 16, { fill: '#f3dcb0', stroke: '#b98f50', width: 1.5 });
  svg.circle(...pin, 7, { fill: '#8a8c8f' });
  svg.circle(wx, wy, 18, { fill: '#111111' });
  // The piston: a short drum seen from the left.
  const drum = gradient(
    svg,
    [
      [0, '#2e2e2e'],
      [0.35, '#9a9c9f'],
      [0.6, '#e6e7e8'],
      [1, '#6d6e71'],
    ],
    { x1: 0, y1: 0, x2: 0, y2: 1 }
  );
  svg.rect(px, cyl - h / 2 + 2, 72, h - 4, { fill: drum });
  svg.ellipse(px + 72, cyl, 16, h / 2 - 2, { fill: '#6d6e71', stroke: '#333333', width: 1 });
  svg.ellipse(px, cyl, 20, h / 2 - 2, { fill: '#f2f2f2', stroke: '#6d6e71', width: 1.5 });
  extras({ cyl, h, x0, wx, wy });
}

/** A four-stroke engine cylinder (15.3) with crank angle θ (degrees clockwise from top). */
function strokePanel(
  svg,
  x0,
  { theta, gas, intake = false, exhaust = false, spark = false, arrow, arrowColor = ARROW }
) {
  const cx = x0 + 125;
  const wall = '#4a7fc0';
  // Block: the cylinder above a wider crankcase with chamfered corners.
  const outline = [
    [x0 + 45, 100],
    [x0 + 45, 300],
    [x0 + 15, 330],
    [x0 + 15, 470],
    [x0 + 45, 500],
    [x0 + 205, 500],
    [x0 + 235, 470],
    [x0 + 235, 330],
    [x0 + 205, 300],
    [x0 + 205, 100],
  ];
  svg.polygon(outline, { fill: '#dfe8f3' });
  svg.polyline(outline, { color: wall, width: 7 });
  // Piston motion from the crank: pin at radius R, rod length Lr.
  const [R, Lr, crankY] = [48, 175, 405];
  const t = (theta * Math.PI) / 180;
  const pin = [cx + R * Math.sin(t), crankY - R * Math.cos(t)];
  const pistonPinY = crankY - R * Math.cos(t) - Math.sqrt(Lr * Lr - (R * Math.sin(t)) ** 2);
  const pTop = pistonPinY - 45;
  if (gas) svg.rect(x0 + 49, 100, 152, pTop - 100, { fill: gas });
  // Head with valves and plug.
  svg.rect(x0 + 10, 72, 230, 14, { fill: '#9a9c9f', stroke: '#6d6e71', width: 1 });
  svg.rect(x0 + 49, 86, 152, 14, { fill: '#c7c8ca' });
  const valve = (vx, open, dir) => {
    const drop = open ? 18 : 0;
    svg.line(vx - dir * 18, 50, vx, 92 + drop, { color: '#c62828', width: 7, cap: 'round' });
    svg.polygon(
      [
        [vx - 18, 96 + drop],
        [vx + 18, 96 + drop],
        [vx + 10, 88 + drop],
        [vx - 10, 88 + drop],
      ],
      { fill: '#c62828' }
    );
  };
  valve(x0 + 85, intake, -1);
  valve(x0 + 165, exhaust, 1);
  svg.polygon(
    [
      [cx - 16, 86],
      [cx + 16, 86],
      [cx, 112],
    ],
    { fill: '#bcbec0', stroke: '#6d6e71', width: 1 }
  );
  svg.rect(cx - 7, 30, 14, 56, { fill: '#555555' });
  if (spark) {
    for (let k = 0; k < 10; k += 1) {
      const a = Math.PI * (0.1 + (0.8 * k) / 9);
      svg.line(
        cx + 10 * Math.cos(a),
        116 + 10 * Math.sin(a),
        cx + 26 * Math.cos(a),
        116 + 26 * Math.sin(a),
        { color: '#f4b400', width: 2.5 }
      );
    }
  }
  // Crank path, rod, pin, piston.
  svg.add(
    `<circle cx="${cx}" cy="${crankY}" r="${R + 18}" fill="none" stroke="${ARROW}" stroke-width="1.4" stroke-dasharray="6 6"/>`
  );
  svg.circle(cx, crankY, 24, { fill: '#f3dcb0', stroke: '#b98f50', width: 2 });
  svg.circle(cx, crankY, 11, { fill: '#a7a9ac' });
  svg.line(cx, pistonPinY, ...pin, { color: '#8a8c8f', width: 16, cap: 'round' });
  svg.circle(...pin, 14, { fill: '#8a8c8f', stroke: '#555555', width: 1.2 });
  const metal = gradient(svg, [
    [0, '#555555'],
    [0.45, '#e6e7e8'],
    [1, '#555555'],
  ]);
  svg.rect(cx - 74, pTop, 148, 85, { fill: metal, stroke: '#333333', width: 1.2, rx: 4 });
  if (arrow)
    svg.arrow(cx, arrow > 0 ? pTop + 15 : pTop + 70, cx, arrow > 0 ? pTop + 70 : pTop + 15, {
      color: arrowColor,
      width: 3.5,
      head: 16,
    });
  // Rotation arrow (clockwise) on the dashed crank path.
  const a1 = t + 0.9;
  const a2 = t + 1.6;
  const pts = [];
  for (let k = 0; k <= 12; k += 1) {
    const a = a1 + ((a2 - a1) * k) / 12;
    pts.push([cx + (R + 18) * Math.sin(a), crankY - (R + 18) * Math.cos(a)]);
  }
  svg.polyline(pts, { color: ARROW, width: 2 });
  svg.arrow(...pts.at(-2), ...pts.at(-1), { color: ARROW, width: 2, head: 11 });
}

/** The Otto cycle (15.3): adiabats through C–D and A–B between volumes vB and vA. */
function ottoCycle(svg, x, y, { pC, pA, labels }) {
  const g = pvAxes(svg, x, y, 420, 380);
  const [vB, vA] = [0.25, 0.7];
  // Data P on [0, 1]: P = k / V^γ along each adiabat.
  const kCD = pC * vB ** GAMMA;
  const kAB = pA * vA ** GAMMA;
  const top = trace(g, v => kCD / v ** GAMMA, vB, vA);
  const bottom = trace(g, v => kAB / v ** GAMMA, vA, vB);
  const pts = [...top, ...bottom];
  svg.polygon(pts, { fill: LOOP });
  svg.polyline([...top, ...bottom, top[0]], { color: LOOP_EDGE, width: 3 });
  midArrow(svg, top, 0.35);
  midArrow(svg, bottom, 0.5);
  midArrow(svg, [bottom.at(-1), top[0]], 0.6);
  midArrow(svg, [top.at(-1), bottom[0]], 0.6);
  const [A, B, C, D] = [bottom[0], bottom.at(-1), top[0], top.at(-1)];
  for (const p of [A, B, C, D]) dot(svg, p);
  for (const p of [A, B])
    svg.line(p[0], p[1], p[0], g.Y(0), { color: ARROW, width: 1.5, dash: '6 5' });
  if (labels) {
    svg.line(C[0], C[1], B[0], B[1], { color: ARROW, width: 1.5, dash: '6 5' });
    svg.line(D[0], D[1], A[0], A[1], { color: ARROW, width: 1.5, dash: '6 5' });
  }
  lab(svg, A[0] + 12, A[1] + 14, 'A', { anchor: 'start', italic: false });
  lab(svg, B[0] - 12, B[1] + 4, 'B', { anchor: 'end', italic: false });
  lab(svg, C[0] - 12, C[1], 'C', { anchor: 'end', italic: false });
  lab(svg, D[0] + 12, D[1] - 16, 'D', { anchor: 'start', italic: false });
  return { g, A, B, C, D, top, bottom };
}

/** Carnot cycle points (γ = 5/3): A → B isotherm at Th, B → C adiabat, C → D isotherm at Tc, D → A adiabat. */
function carnotCycle(g, { vA = 1, vB = 2, ratio = 0.7, pA = 1 } = {}) {
  const k = 1 / (GAMMA - 1);
  const vC = vB * (1 / ratio) ** k;
  const vD = vA * (1 / ratio) ** k;
  const kh = pA * vA;
  const kc = ratio * kh;
  const pB = kh / vB;
  const ad1 = pB * vB ** GAMMA;
  const ad2 = pA * vA ** GAMMA;
  return {
    v: { vA, vB, vC, vD },
    AB: trace(g, v => kh / v, vA, vB),
    BC: trace(g, v => ad1 / v ** GAMMA, vB, vC),
    CD: trace(g, v => kc / v, vC, vD),
    DA: trace(g, v => ad2 / v ** GAMMA, vD, vA),
    hot: v => kh / v,
    cold: v => kc / v,
  };
}

/**
 * Heat arrows and process labels for a Carnot cycle on plot g: Q_h at the hot
 * isotherm and Q_c at the cold one, pointing down for an engine and up for the
 * same cycle run backward as a heat pump.
 */
function carnotLabels(svg, g, cyc, reversed) {
  const vh = 1.4;
  const vc = 3.6;
  const arrow = (v, f, len, w, label, size) => {
    const [x, y] = g.P(v, f(v));
    const [a, b] = reversed ? [y + len * 0.35, y - len * 0.65] : [y - len * 0.65, y + len * 0.35];
    heatArrow(
      svg,
      [
        [x, a],
        [x, b],
      ],
      { w }
    );
    lab(svg, x, b + (reversed ? 26 : -26), label, { halo: false, size });
  };
  arrow(vh, cyc.hot, 150, 34, 'Q_h', 20);
  arrow(vc, cyc.cold, 100, 22, 'Q_c', 18);
  const note = (x, y, list, to) => {
    labs(svg, x, y, list, { anchor: 'start', italic: false, size: 20, gap: 24 });
    svg.squiggle(x - 4, y + 4, ...to, { waves: 1, amp: 4 });
  };
  note(g.X(3.0), g.Y(0.78), ['Isotherm \\it{T}_h'], g.P(2.4, cyc.hot(2.4)));
  note(
    g.X(4.1),
    g.Y(0.5),
    reversed ? ['Adiabatic', 'compression'] : ['Adiabatic', 'expansion'],
    cyc.BC[40]
  );
  note(g.X(4.25), g.Y(0.22), ['Isotherm \\it{T}_c'], cyc.CD[25]);
  // In the shaded area under the cycle: left of the line at A there is no room.
  labs(
    svg,
    g.X(1.08),
    g.Y(0.2),
    reversed ? ['Adiabatic', 'expansion'] : ['Adiabatic', 'compression'],
    {
      anchor: 'start',
      italic: false,
      size: 20,
      gap: 24,
    }
  );
  svg.squiggle(g.X(1.2), g.Y(0.2) - 14, ...cyc.DA[55], { waves: 1, amp: 4 });
}

/** A sun: a disk with a ring of pointed rays. */
function sun(svg, cx, cy, r, { rays = 24, long = 0.55 } = {}) {
  const pts = [];
  for (let k = 0; k < rays * 2; k += 1) {
    const a = (k * Math.PI) / rays;
    const rr = k % 2 ? r : r * (1 + long);
    pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
  }
  svg.polygon(pts, { fill: '#fbd53a' });
  svg.circle(cx, cy, r, { fill: '#fde68a', stroke: '#f6c21c', width: 1.5 });
}

export default {
  // 15.1 Fig. 2 — the first law: heat in, work out, internal energy
  Figure_15_01_02: () => {
    const svg = new Svg({
      width: 900,
      height: 280,
      title: 'The first law of thermodynamics',
      desc: 'A system, drawn as an ellipse, receives heat Q (a wavy arrow in) and does work W (a straight arrow out); its internal energy changes by ΔU = Q − W. At the right: Q is the net heat, Q = Q_in − Q_out, and W is the net work, W = W_out − W_in.',
    });
    svg.ellipse(250, 150, 175, 108, { fill: '#ecdca5', stroke: '#d9c57f', width: 1.5 });
    heatArrow(
      svg,
      [
        [18, 262],
        [185, 62],
      ],
      { w: 42 }
    );
    workArrow(svg, [270, 40], [440, 215], 40);
    lab(svg, 55, 155, 'Q');
    labs(svg, 235, 125, ['System', 'Δ\\it{U} = \\it{Q} − \\it{W}'], { size: 23 });
    lab(svg, 405, 140, 'W');
    heatArrow(
      svg,
      [
        [490, 112],
        [555, 30],
      ],
      { w: 34 }
    );
    lab(svg, 470, 48, 'Q_{in}', { anchor: 'end' });
    lab(svg, 585, 62, '−');
    lab(svg, 612, 62, 'Q_{out}', { anchor: 'start' });
    heatArrow(
      svg,
      [
        [815, 26],
        [750, 108],
      ],
      { w: 34 }
    );
    lab(svg, 840, 62, '= \\it{Q}', { anchor: 'start' });
    workArrow(svg, [495, 150], [565, 245], 32);
    lab(svg, 590, 205, 'W_{out}', { anchor: 'start' });
    lab(svg, 672, 205, '−');
    workArrow(svg, [775, 258], [705, 165], 32);
    lab(svg, 795, 205, 'W_{in} = \\it{W}', { anchor: 'start' });
    return svg.render();
  },

  // 15.1 Fig. 3 — two processes with the same change in internal energy
  Figure_15_01_03: () => {
    const svg = new Svg({
      width: 700,
      height: 1130,
      title: 'Two processes with the same ΔU',
      desc: '(a) A system takes in Q_in = 40 J and gives off Q_out = −25 J of heat (net 15 J in); it has W_in = −4 J of work done on it and does W_out = 10 J (net 6 J out), so ΔU = Q − W = 15 J − 6 J = +9 J. (b) A different system gives off 150 J of heat (Q_out = −150 J) while 159 J of work is done on it (W = −159 J), so ΔU = −150 J − (−159 J) = +9 J, the same change.',
    });
    const J = '\\rm{ J}';
    // (a)
    svg.circle(340, 270, 200, { fill: 'none', stroke: LOOP_EDGE, width: 2.5 });
    lab(svg, 340, 100, 'System', { size: 22 });
    heatArrow(
      svg,
      [
        [30, 190],
        [255, 215],
      ],
      { w: 46 }
    );
    lab(svg, 25, 128, `Q_{in} = 40${J}`, { anchor: 'start' });
    heatArrow(
      svg,
      [
        [250, 335],
        [70, 425],
      ],
      { w: 30 }
    );
    lab(svg, 20, 345, `Q_{out} = −25${J}`, { anchor: 'start' });
    vbrace(svg, 285, 160, 360, 1);
    labs(svg, 320, 245, [`15${J}`, '\\rm{in}'], { size: 22 });
    workArrow(svg, [650, 80], [530, 165], 18);
    lab(svg, 690, 42, `W_{in} = −4${J}`, { anchor: 'end' });
    workArrow(svg, [540, 265], [675, 335], 36);
    lab(svg, 690, 385, `W_{out} = 10${J}`, { anchor: 'end' });
    vbrace(svg, 515, 135, 290, -1);
    labs(svg, 475, 200, [`6${J}`, 'out'], { size: 22 });
    lab(svg, 340, 515, `Δ\\it{U} = \\it{Q} − \\it{W} = 15${J} − 6${J} = +9${J}`, { size: 22 });
    caption(svg, 340, 555, '(a)');
    // (b)
    svg.circle(340, 830, 200, { fill: 'none', stroke: LOOP_EDGE, width: 2.5 });
    lab(svg, 340, 660, 'System', { size: 22 });
    workArrow(svg, [610, 660], [470, 770], 50);
    lab(svg, 690, 630, `W = −159${J}`, { anchor: 'end' });
    labs(svg, 440, 800, [`159${J}`, '\\rm{in}'], { size: 22 });
    heatArrow(
      svg,
      [
        [290, 860],
        [70, 990],
      ],
      { w: 46 }
    );
    lab(svg, 30, 1020, `Q_{out} = −150${J}`, { anchor: 'start' });
    labs(svg, 345, 895, [`150${J}`, 'out'], { size: 22 });
    lab(svg, 340, 1070, `Δ\\it{U} = \\it{Q} − \\it{W} = −150${J} − (−159${J}) = +9${J}`, {
      size: 22,
    });
    caption(svg, 340, 1110, '(b)');
    return svg.render();
  },

  // 15.1 Fig. 4 — the first law applied to people and plants
  Figure_15_01_04: () => {
    const svg = new Svg({
      width: 900,
      height: 570,
      title: 'Metabolism and the first law',
      desc: '(a) A person takes in food energy and gives off heat Q and does work W: ΔU = −Q − W + food energy. (b) A plant takes in energy Q_in from sunlight and gives off heat Q_out; the change in its internal energy is the stored food energy.',
    });
    const grass = (x0, x1) => svg.rect(x0, 485, x1 - x0, 22, { fill: '#cfe3b3' });
    grass(40, 350);
    grass(450, 880);
    // (a) A person.
    const px = 195;
    svg.rect(px - 52, 260, 104, 215, { fill: '#b7863b', stroke: '#8a6224', width: 1.2, rx: 4 });
    svg.line(px, 290, px, 475, { color: '#8a6224', width: 1.5 });
    svg.rect(px - 60, 115, 120, 160, { fill: '#fbf1b6', stroke: '#d9c97a', width: 1.2, rx: 14 });
    svg.rect(px - 80, 125, 26, 150, { fill: '#fbf1b6', stroke: '#d9c97a', width: 1.2, rx: 12 });
    svg.rect(px + 54, 125, 26, 150, { fill: '#fbf1b6', stroke: '#d9c97a', width: 1.2, rx: 12 });
    svg.rect(px - 12, 95, 24, 24, { fill: '#9a6a44' });
    svg.ellipse(px, 72, 26, 33, { fill: '#9a6a44', stroke: '#7a4e2e', width: 1 });
    svg.path(
      `M ${px - 26} 66 Q ${px - 20} 32 ${px} 36 Q ${px + 24} 34 ${px + 26} 62 Q ${px + 10} 50 ${px - 26} 66 Z`,
      { color: 'none', width: 0, fill: '#3a2414' }
    );
    for (const s of [-1, 1])
      svg.ellipse(px + s * 26, 478, 22, 9, { fill: '#5a3a1e', stroke: 'none', width: 0 });
    svg.polyline(
      [
        [100, 92],
        [px, 92],
        [px, 140],
      ],
      { color: ARROW, width: 2.5 }
    );
    svg.arrow(px, 140, px, 205, { color: ARROW, width: 2.5, head: 14 });
    lab(svg, 95, 92, 'Food', { anchor: 'end', italic: false });
    heatArrow(
      svg,
      [
        [px + 20, 205],
        [px + 135, 135],
      ],
      { w: 34, color: '#f06a4c' }
    );
    lab(svg, px + 115, 105, 'Q');
    workArrow(svg, [px - 75, 275], [35, 225], 26, { color: '#6aaab5', fade: '#e3f1f3' });
    lab(svg, 55, 200, 'W');
    lab(svg, 205, 25, 'Δ\\it{U} = −\\it{Q} − \\it{W} + food energy', { size: 24 });
    caption(svg, 195, 545, '(a)');
    // (b) A flower in sunlight.
    sun(svg, 520, 175, 42, { long: 0.7 });
    lab(svg, 520, 176, 'Sun', { italic: false, halo: false });
    heatArrow(
      svg,
      [
        [565, 180],
        [665, 225],
      ],
      { w: 30, color: '#e7b33a', fade: '#fbecc1' }
    );
    lab(svg, 625, 172, 'Q_{in}');
    const [fx, fy] = [720, 275];
    svg.path(`M ${fx} ${fy + 40} C ${fx - 20} ${fy + 120} ${fx + 25} ${fy + 160} ${fx + 5} 485`, {
      color: '#4f8f2f',
      width: 8,
    });
    svg.path(
      `M ${fx + 2} 400 C ${fx - 40} 370 ${fx - 70} 380 ${fx - 85} 400 C ${fx - 60} 415 ${fx - 30} 415 ${fx + 2} 400 Z`,
      { color: '#4f8f2f', width: 1.5, fill: '#77b84a' }
    );
    svg.path(
      `M ${fx + 8} 380 C ${fx + 40} 350 ${fx + 70} 355 ${fx + 85} 370 C ${fx + 60} 395 ${fx + 30} 395 ${fx + 8} 380 Z`,
      { color: '#4f8f2f', width: 1.5, fill: '#77b84a' }
    );
    for (let k = 0; k < 20; k += 1) {
      const a = (k * Math.PI) / 10;
      svg.add(
        `<ellipse cx="${fmt(fx + 44 * Math.cos(a))}" cy="${fmt(fy + 44 * Math.sin(a))}" rx="26" ry="9" transform="rotate(${fmt((a * 180) / Math.PI)} ${fmt(fx + 44 * Math.cos(a))} ${fmt(fy + 44 * Math.sin(a))})" fill="#a8b7ea" stroke="#5b6fb8" stroke-width="1"/>`
      );
    }
    svg.circle(fx, fy, 26, { fill: '#f5e6a8', stroke: '#d4b84a', width: 1.5 });
    heatArrow(
      svg,
      [
        [800, 315],
        [885, 350],
      ],
      { w: 26, color: '#4f9fb0', fade: '#dff0f3' }
    );
    lab(svg, 850, 300, 'Q_{out}');
    lab(svg, 665, 25, 'Δ\\it{U} = stored food energy', { size: 24 });
    caption(svg, 665, 545, '(b)');
    return svg.render();
  },

  // 15.2 Fig. 1 — a cyclical heat engine
  Figure_15_02_02: () => {
    const svg = new Svg({
      width: 760,
      height: 1020,
      title: 'A heat engine',
      desc: 'A heat engine, drawn as a circle, takes in heat Q_in (a wide wavy arrow from above), does work W (an arrow to the right), and gives off heat Q_out (a narrower wavy arrow below). Over a cycle ΔU = 0, so W = Q_in − Q_out.',
    });
    ball(svg, 285, 520, 265);
    // Widths in proportion: Q_in = W + Q_out.
    heatArrow(
      svg,
      [
        [285, 0],
        [285, 415],
      ],
      { w: 100, amp: 6, waves: 3.5 }
    );
    workArrow(svg, [420, 548], [752, 548], 60);
    heatArrow(
      svg,
      [
        [285, 680],
        [285, 1012],
      ],
      { w: 40, amp: 5, waves: 3 }
    );
    lab(svg, 330, 410, 'Q_{in}', { anchor: 'start' });
    labs(svg, 215, 515, ['Δ\\it{U} = 0', '⇒ \\it{W} = \\it{Q}_{in} − \\it{Q}_{out}'], {
      size: 26,
      gap: 38,
    });
    lab(svg, 700, 548, 'W', { size: 26, halo: false });
    lab(svg, 325, 1000, 'Q_{out}', { anchor: 'start' });
    lab(svg, 630, 225, 'Heat engine', { italic: false, size: 26 });
    svg.squiggle(565, 245, 455, 300, { waves: 1.5, amp: 6 });
    return svg.render();
  },

  // 15.2 Fig. 2 — heat into a gas, work out through a piston, heat out
  Figure_15_02_03: () => pistonStrokes(),
  Figure_15_02_09: () => pistonStrokes(),

  // 15.2 Fig. 3 — isobaric expansion of a gas in a cylinder
  Figure_15_02_04: () => {
    const svg = new Svg({
      width: 640,
      height: 880,
      title: 'Isobaric expansion',
      desc: 'A vertical cylinder of gas of volume V with a piston of area A on top. Heat Q_in flows into the gas, which pushes up on the piston with force F = PA and raises it a distance d at constant pressure. The volume increases by ΔV = Ad, and the work done is W_out = Fd = PAd = PΔV.',
    });
    const [cx, rx, ry] = [310, 210, 46];
    const gas = gradient(
      svg,
      [
        [0, '#9fcde8'],
        [1, '#eaf5fb'],
      ],
      { x1: 0, y1: 0, x2: 0, y2: 1 }
    );
    // Back wall, gas, then the near half of the cylinder wall.
    svg.rect(cx - rx - 30, 130, 2 * rx + 60, 620, {
      fill: '#c7c8ca',
      stroke: '#8a8c8f',
      width: 1.5,
    });
    svg.rect(cx - rx, 130, 2 * rx, 620, { fill: '#6d6e71' });
    svg.rect(cx - rx, 330, 2 * rx, 420, { fill: gas });
    svg.ellipse(cx, 750, rx, ry, { fill: '#eaf5fb', stroke: 'none', width: 0 });
    svg.path(
      `M ${cx - rx - 30} 750 A ${rx + 30} ${ry + 10} 0 0 0 ${cx + rx + 30} 750 L ${cx + rx + 30} 770 A ${rx + 30} ${ry + 10} 0 0 1 ${cx - rx - 30} 770 Z`,
      {
        color: '#8a8c8f',
        width: 1.5,
        fill: '#c7c8ca',
      }
    );
    // Initial piston position, dashed.
    for (const y of [410, 440]) {
      svg.add(
        `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#333333" stroke-width="1.5" stroke-dasharray="7 5"/>`
      );
    }
    // Piston and rod.
    svg.path(
      `M ${cx - rx} 300 L ${cx - rx} 330 A ${rx} ${ry} 0 0 0 ${cx + rx} 330 L ${cx + rx} 300 Z`,
      { color: '#6fa8cc', width: 1.5, fill: '#a9d3ec' }
    );
    svg.ellipse(cx, 300, rx, ry, { fill: '#cde6f5', stroke: '#6fa8cc', width: 1.5 });
    const rod = gradient(svg, [
      [0, '#8fbfdc'],
      [0.5, '#eaf5fb'],
      [1, '#8fbfdc'],
    ]);
    svg.rect(cx - 45, 10, 90, 290, { fill: rod, stroke: '#6fa8cc', width: 1.5 });
    svg.ellipse(cx, 10, 45, 12, { fill: '#cde6f5', stroke: '#6fa8cc', width: 1.5 });
    // Top rim of the cylinder.
    svg.path(
      `M ${cx - rx - 30} 130 A ${rx + 30} ${ry + 10} 0 0 0 ${cx + rx + 30} 130 L ${cx + rx + 30} 150 A ${rx + 30} ${ry + 10} 0 0 1 ${cx - rx - 30} 150 Z`,
      {
        color: '#8a8c8f',
        width: 1.5,
        fill: '#c7c8ca',
      }
    );
    svg.ellipse(cx, 130, rx + 30, ry + 10, { fill: 'none', stroke: '#8a8c8f', width: 1.5 });
    svg.ellipse(cx, 130, rx, ry, { fill: 'none', stroke: '#8a8c8f', width: 1.5 });
    // Labels.
    svg.line(10, 330, 70, 330, { color: ARROW, width: 1.2 });
    svg.line(10, 440, 70, 440, { color: ARROW, width: 1.2 });
    svg.arrow(30, 332, 30, 438, { color: ARROW, width: 1.5, head: 11, start: true });
    svg.rect(18, 372, 24, 26, { fill: '#ffffff' });
    lab(svg, 30, 385, 'd');
    svg.arrow(cx - 10, 745, cx - 10, 500, { color: RED, width: 5, head: 22 });
    lab(svg, cx - 40, 690, '**F**', { size: 26, halo: false });
    lab(svg, cx + 110, 570, '\\it{F} = \\it{PA}', { size: 26, halo: false });
    lab(svg, cx + 110, 660, 'V', { size: 26, halo: false });
    lab(svg, 590, 450, 'A', { size: 26 });
    svg.squiggle(575, 450, cx + 150, 430, { waves: 1, amp: 5 });
    lab(svg, 560, 60, 'Δ\\it{V} = \\it{Ad}', { size: 26 });
    svg.leader(560, 80, cx + 160, 395, { bend: -0.25 });
    heatArrow(
      svg,
      [
        [15, 815],
        [150, 660],
      ],
      { w: 40 }
    );
    lab(svg, 30, 845, 'Q_{in}', { size: 24 });
    lab(svg, cx, 862, '\\it{W}_{out} = \\it{Fd} = \\it{PAd} = \\it{P}Δ\\it{V}', { size: 26 });
    return svg.render();
  },

  // 15.2 Fig. 4 — work in an isobaric process is the area PΔV
  Figure_15_02_05: () => {
    const svg = new Svg({
      width: 880,
      height: 680,
      title: 'Isobaric process on a PV diagram',
      desc: 'A PV diagram of an isobaric (constant-pressure) process from A to B at pressure P. The work done, the area of the rectangle under the line AB, is Area = PΔV = Work, where ΔV is the change in volume.',
    });
    const [x0, y0, x1, yP] = [110, 600, 790, 300];
    const [xA, xB] = [330, 760];
    svg.rect(xA, yP, xB - xA, y0 - yP, { fill: LOOP });
    svg.arrow(x0, y0, x1 + 50, y0, { color: ARROW, width: 2.5, head: 18 });
    svg.arrow(x0, y0, x0, 30, { color: ARROW, width: 2.5, head: 18 });
    lab(svg, x0 - 30, 40, 'P', { size: 32 });
    lab(svg, x1 + 50, y0 - 40, 'V', { size: 32 });
    svg.line(x0, yP, xA, yP, { color: ARROW, width: 1.5, dash: '7 6' });
    lab(svg, x0 - 25, yP, 'P', { size: 32 });
    svg.line(xA, yP, xB, yP, { color: LOOP_EDGE, width: 3 });
    midArrow(
      svg,
      [
        [xA, yP],
        [xB, yP],
      ],
      0.6,
      LOOP_EDGE,
      18
    );
    dot(svg, [xA, yP], 6);
    dot(svg, [xB, yP], 6);
    lab(svg, xA, yP - 30, 'A', { size: 30, italic: false });
    lab(svg, xB, yP - 30, 'B', { size: 30, italic: false });
    lab(svg, 520, 185, 'Isobaric', { size: 32, italic: false });
    svg.squiggle(470, 205, 440, yP - 4, { waves: 1, amp: 6 });
    svg.arrow(xA + 25, yP + 4, xA + 25, y0 - 4, {
      color: ARROW,
      width: 1.8,
      head: 14,
      start: true,
    });
    svg.rect(xA + 12, 425, 28, 34, { fill: LOOP });
    lab(svg, xA + 26, 442, 'P', { size: 30, halo: false });
    lab(svg, 560, 440, 'Area = \\it{P}Δ\\it{V} = Work', { size: 30, halo: false });
    svg.line(xA, y0, xA, 655, { color: ARROW, width: 1.5 });
    svg.line(xB, y0, xB, 655, { color: ARROW, width: 1.5 });
    svg.arrow(xA + 2, 640, xB - 2, 640, { color: ARROW, width: 1.8, head: 14, start: true });
    svg.rect(505, 622, 80, 36, { fill: '#ffffff' });
    lab(svg, 545, 640, 'Δ\\it{V}', { size: 30 });
    return svg.render();
  },

  // 15.2 Fig. 5 — work as the area under a PV curve, in either direction
  Figure_15_02_06: () => {
    const svg = new Svg({
      width: 640,
      height: 1010,
      title: 'Work as the area under a PV curve',
      desc: '(a) A process from A to B on a PV diagram, divided into narrow strips. Each strip of width ΔV_i has area P_i(ave) ΔV_i = W_i, so the total work W_out = ΣW_i is the area under the curve. (b) Going the other way along the same path, from B to A, the work done on the gas is W_in = −W_out.',
    });
    const P = v => 0.2 / (v + 0.1) + 0.08;
    const panel = (y, filled) => {
      const g = pvAxes(svg, 50, y + 40, 540, 330, { xRange: [0, 1.1], yRange: [0, 1] });
      const [vA, vB] = [0.18, 0.78];
      const pts = trace(g, P, vA, vB);
      if (filled) {
        svg.polygon([[g.X(vA), g.Y(0)], ...pts, [g.X(vB), g.Y(0)]], { fill: LOOP });
        svg.polyline([[g.X(vA), g.Y(0)], pts[0]], { color: LOOP_EDGE, width: 2 });
        svg.polyline([[g.X(vB), g.Y(0)], pts.at(-1)], { color: LOOP_EDGE, width: 2 });
        svg.polyline(pts, { color: LOOP_EDGE, width: 3 });
        midArrow(svg, [...pts].reverse(), 0.55);
      } else {
        const n = 7;
        const dv = (vB - vA) / n;
        for (let k = 0; k < n; k += 1) {
          const v = vA + k * dv;
          const p = P(v + dv / 2);
          svg.rect(g.X(v), g.Y(p), g.X(v + dv) - g.X(v), g.Y(0) - g.Y(p), {
            fill: k ? 'none' : '#b9d6df',
            stroke: '#a3122a',
            width: 4,
          });
        }
        svg.polyline(pts, { color: ARROW, width: 2 });
        const x1 = g.X(vA + dv);
        svg.line(g.X(vA), g.Y(0) + 4, g.X(vA), g.Y(0) + 26, { color: ARROW, width: 1.2 });
        svg.line(x1, g.Y(0) + 4, x1, g.Y(0) + 26, { color: ARROW, width: 1.2 });
        svg.arrow(g.X(vA) + 1, g.Y(0) + 16, x1 - 1, g.Y(0) + 16, {
          color: ARROW,
          width: 1.3,
          head: 8,
          start: true,
        });
        lab(svg, (g.X(vA) + x1) / 2, g.Y(0) + 42, 'Δ\\it{V}_1');
        lab(svg, g.X(vA) + 25, g.Y(P(vA + dv / 2)) - 18, '\\it{P}_{1(ave)}', { anchor: 'start' });
        lab(svg, g.X(0.35), g.Y(0) + 46, '\\it{P}_{1(ave)} Δ\\it{V}_1 = \\it{W}_1', {
          anchor: 'start',
        });
        svg.squiggle(g.X(0.36), g.Y(0) + 30, g.X(vA + dv / 2), g.Y(0.25), { waves: 1, amp: 5 });
        labs(svg, g.X(1.05), y + 30, ['\\it{W}_{out} = Σ\\it{W}_i = total area', 'under curve'], {
          anchor: 'end',
        });
      }
      dot(svg, pts[0]);
      dot(svg, pts.at(-1));
      lab(svg, pts[0][0] - 2, pts[0][1] - 22, 'A', { italic: false });
      lab(svg, pts.at(-1)[0] + 16, pts.at(-1)[1], 'B', { italic: false, anchor: 'start' });
      if (filled)
        labs(svg, g.X(1.05), y + 30, ['\\it{W}_{in} = −\\it{W}_{out}', 'for same path'], {
          anchor: 'end',
        });
    };
    panel(10, false);
    caption(svg, 320, 490, '(a)');
    panel(510, true);
    caption(svg, 320, 990, '(b)');
    return svg.render();
  },

  // 15.2 Fig. 6 — work depends on path; net work around a cycle
  Figure_15_02_07: () => {
    const svg = new Svg({
      width: 620,
      height: 1250,
      title: 'Work along different paths and around cycles',
      desc: '(a) Two paths from A to C: ABC (isobaric then isochoric) and ADC (isochoric then isobaric). The work is the area under each path, so W_ABC > W_ADC. (b) A cycle ABCDA with P_AB = 1.5 × 10⁶ N/m², P_CD = 2 × 10⁵ N/m², and ΔV = 500 cm³: the net work W_tot = W_out + W_in is the area enclosed. (c) For any cycle, the net work W is the area inside the loop.',
    });
    const ORANGE = '#f08a5a';
    // (a)
    {
      const g = pvAxes(svg, 60, 30, 500, 300);
      const [xA, xB, yAB, yDC] = [g.X(0.1), g.X(0.5), g.Y(0.8), g.Y(0.35)];
      svg.rect(xA, yAB, xB - xA, yDC - yAB, { fill: LOOP });
      svg.rect(xA, yDC, xB - xA, g.Y(0) - yDC, { fill: '#a5b5d6' });
      for (const x of [xA, xB]) {
        svg.line(x, yAB, x, g.Y(0), { color: ORANGE, width: 3 });
        midArrow(
          svg,
          [
            [x, yAB],
            [x, yDC],
          ],
          0.5,
          ORANGE
        );
      }
      for (const y of [yAB, yDC]) {
        svg.line(xA, y, xB, y, { color: LOOP_EDGE, width: 3 });
        midArrow(
          svg,
          [
            [xA, y],
            [xB, y],
          ],
          0.55
        );
      }
      for (const [p, s, a] of [
        [[xA, yAB], 'A', 'end'],
        [[xB, yAB], 'B', 'start'],
        [[xB, yDC], 'C', 'start'],
        [[xA, yDC], 'D', 'end'],
      ]) {
        dot(svg, p);
        lab(svg, p[0] + (a === 'end' ? -14 : 14), p[1], s, { italic: false, anchor: a });
      }
      lab(svg, 290, 15, 'Isobaric', { italic: false });
      svg.squiggle(270, 30, 250, yAB - 4, { waves: 1, amp: 4 });
      svg.leader(305, 32, 275, yDC - 4, { bend: 0.08 });
      lab(svg, 400, 268, 'Isochoric', { italic: false, anchor: 'start' });
      svg.squiggle(395, 268, xB + 4, yDC + 22, { waves: 1, amp: 4 });
      svg.squiggle(395, 280, xA + 6, 280, { waves: 1, amp: 4 });
      lab(svg, 400, 50, '\\it{W}_{ABC} > \\it{W}_{ADC}', { anchor: 'start' });
      caption(svg, 310, 385, '(a)');
    }
    // (b) To scale: 1.5 × 10⁶ and 2 × 10⁵ N/m².
    {
      const g = pvAxes(svg, 60, 450, 500, 320, { xRange: [0, 1], yRange: [0, 1.8] });
      const [xA, xB] = [g.X(0.33), g.X(0.8)];
      const [yAB, yCD] = [g.Y(1.5), g.Y(0.2)];
      svg.rect(xA, yAB, xB - xA, yCD - yAB, { fill: LOOP });
      svg.rect(xA, yCD, xB - xA, g.Y(0) - yCD, { fill: '#9fc9b0' });
      svg.line(xA, yCD, xA, g.Y(0), { color: '#3f9a6b', width: 2 });
      svg.line(xB, yCD, xB, g.Y(0), { color: '#3f9a6b', width: 2 });
      const loop = [
        [xA, yAB],
        [xB, yAB],
        [xB, yCD],
        [xA, yCD],
        [xA, yAB],
      ];
      svg.polyline(loop, { color: '#a3122a', width: 3 });
      for (let k = 0; k < 4; k += 1) midArrow(svg, [loop[k], loop[k + 1]], 0.5, '#a3122a');
      for (const [p, s, a] of [
        [[xA, yAB], 'A', 'end'],
        [[xB, yAB], 'B', 'start'],
        [[xB, yCD], 'C', 'start'],
        [[xA, yCD], 'D', 'end'],
      ]) {
        dot(svg, p);
        lab(svg, p[0] + (a === 'end' ? -14 : 14), p[1] + (s === 'D' ? 16 : -14), s, {
          italic: false,
          anchor: a,
        });
      }
      for (const y of [yAB, yCD])
        svg.line(g.x, y, xA, y, { color: ARROW, width: 1.5, dash: '6 5' });
      labs(svg, g.x + 8, yAB - 52, ['\\it{P}_{AB}', '1.5 × 10^6 \\rm{N/m}^2'], {
        anchor: 'start',
        size: 20,
        gap: 24,
      });
      labs(svg, g.x + 8, yCD - 52, ['\\it{P}_{CD}', '2 × 10^5 \\rm{N/m}^2'], {
        anchor: 'start',
        size: 20,
        gap: 24,
      });
      lab(svg, xB + 8, g.Y(1.0), '\\it{W}_{tot} = \\it{W}_{out} + \\it{W}_{in}', {
        anchor: 'start',
        size: 20,
      });
      svg.line(xB + 20, g.Y(0.9), xB, g.Y(0.75), { color: ARROW, width: 1.2 });
      svg.line(xA, g.Y(0) + 4, xA, g.Y(0) + 40, { color: ARROW, width: 1.2 });
      svg.line(xB, g.Y(0) + 4, xB, g.Y(0) + 40, { color: ARROW, width: 1.2 });
      svg.arrow(xA + 2, g.Y(0) + 26, xB - 2, g.Y(0) + 26, {
        color: ARROW,
        width: 1.5,
        head: 11,
        start: true,
      });
      svg.rect((xA + xB) / 2 - 85, g.Y(0) + 40, 170, 30, { fill: '#ffffff' });
      lab(svg, (xA + xB) / 2, g.Y(0) + 56, 'Δ\\it{V} = 500 \\rm{cm}^3');
      caption(svg, 310, 860, '(b)');
    }
    // (c)
    {
      const g = pvAxes(svg, 60, 920, 500, 280);
      const [cx, cy, rx, ry] = [g.X(0.45), g.Y(0.45), 125, 80];
      svg.ellipse(cx, cy, rx, ry, { fill: LOOP, stroke: '#e0607e', width: 3 });
      midArrow(
        svg,
        [
          [cx - 10, cy - ry],
          [cx + 10, cy - ry],
        ],
        0.5,
        '#e0607e',
        15
      );
      midArrow(
        svg,
        [
          [cx + 10, cy + ry],
          [cx - 10, cy + ry],
        ],
        0.5,
        '#e0607e',
        15
      );
      lab(svg, g.x + 20, g.y + 5, '\\it{W} = area inside loop', { anchor: 'start' });
      svg.squiggle(g.x + 110, g.y + 20, cx - 20, cy, { waves: 1, amp: 5 });
      caption(svg, 310, 1235, '(c)');
    }
    return svg.render();
  },

  // 15.2 Fig. 7 — isothermal and adiabatic expansion, and a cycle between them
  Figure_15_02_08: () => {
    const svg = new Svg({
      width: 640,
      height: 1130,
      title: 'Isothermal and adiabatic processes',
      desc: '(a) From the same starting point A, an isothermal expansion (PV = constant) ends at B and an adiabatic expansion (PV^γ = constant) ends at C, at the same final volume but a lower pressure: the adiabat falls more steeply, so it does less work. (b) A cycle: isothermal expansion A to B, isochoric cooling B to C, and adiabatic compression C back to A. The net work is the area between the curves.',
    });
    const panel = (y, cycle) => {
      const g = pvAxes(svg, 40, y + 30, 560, 420, { xRange: [0, 3.6], yRange: [0, 1.15] });
      const [vA, vB, pA] = [1, 3.4, 1];
      const iso = trace(g, v => (pA * vA) / v, vA, vB);
      const ad = trace(g, v => (pA * vA ** GAMMA) / v ** GAMMA, vA, vB);
      svg.polygon([[g.X(vA), g.Y(0)], ...ad, [g.X(vB), g.Y(0)]], { fill: '#ddd0e6' });
      svg.polygon([...iso, ...[...ad].reverse()], { fill: LOOP });
      svg.line(g.X(vA), g.Y(0), ...iso[0], { color: ARROW, width: 2.5 });
      svg.line(g.X(vB), g.Y(0), ...iso.at(-1), { color: ARROW, width: 2.5 });
      svg.polyline(iso, { color: ISO, width: 3 });
      svg.polyline(ad, { color: LOOP_EDGE, width: 3 });
      midArrow(svg, iso, 0.4, ISO, 16);
      midArrow(svg, cycle ? [...ad].reverse() : ad, cycle ? 0.62 : 0.38, LOOP_EDGE, 16);
      if (cycle) midArrow(svg, [iso.at(-1), ad.at(-1)], 0.6, ISO, 16);
      for (const p of [iso[0], iso.at(-1), ad.at(-1)]) dot(svg, p);
      lab(svg, iso[0][0] - 4, iso[0][1] - 22, 'A', { italic: false });
      lab(svg, iso.at(-1)[0] + 16, iso.at(-1)[1], 'B', { italic: false, anchor: 'start' });
      lab(svg, ad.at(-1)[0] + 16, ad.at(-1)[1] - 4, 'C', { italic: false, anchor: 'start' });
      lab(svg, g.X(2.6), g.Y(0.55), 'Isothermal', { italic: false });
      svg.squiggle(g.X(2.3), g.Y(0.5), ...trace(g, v => 1 / v, 2.05, 2.05, 1)[0], {
        waves: 1,
        amp: 4,
      });
      // Clear of the vertical line at A.
      lab(svg, g.X(1.6), g.Y(0.08), 'Adiabatic', { italic: false });
      svg.squiggle(g.X(1.97), g.Y(0.1), ...trace(g, v => v ** -GAMMA, 2.4, 2.4, 1)[0], {
        waves: 1,
        amp: 4,
      });
      // Below the adiabat, pointing at BC: inside the band it would sit on the curve.
      if (cycle) {
        lab(svg, g.X(2.9), g.Y(0.08), 'Isochoric', { italic: false });
        svg.squiggle(g.X(3.08), g.Y(0.13), g.X(3.4) - 3, g.Y(0.24), { waves: 1, amp: 4 });
      }
    };
    panel(0, false);
    caption(svg, 320, 545, '(a)');
    panel(570, true);
    caption(svg, 320, 1115, '(b)');
    return svg.render();
  },

  // 15.2 Exercise — two cycles from A
  Figure_15_02_10: () => {
    const svg = new Svg({
      width: 640,
      height: 470,
      title: 'Two cyclical processes',
      desc: 'A PV diagram with two cycles that start and end at A: ABCFA, a rectangle, and ABDEA, a slightly taller rectangle reaching down to a lower pressure along DE. The extra strip FCDE lies below the first rectangle.',
    });
    const g = pvAxes(svg, 40, 30, 570, 390);
    const [x0, x1] = [g.X(0.18), g.X(0.68)];
    const [yA, yF, yE] = [g.Y(0.95), g.Y(0.3), g.Y(0.16)];
    svg.rect(x0, yA, x1 - x0, yF - yA, { fill: LOOP, stroke: ARROW, width: 1.5 });
    svg.rect(x0, yF, x1 - x0, yE - yF, { fill: '#e4d9ec', stroke: ARROW, width: 1.5 });
    for (const [x, y, s, a] of [
      [x0, yA, 'A', 'end'],
      [x1, yA, 'B', 'start'],
      [x1, yF, 'C', 'start'],
      [x1, yE, 'D', 'start'],
      [x0, yE, 'E', 'end'],
      [x0, yF, 'F', 'end'],
    ]) {
      lab(svg, x + (a === 'end' ? -14 : 14), y, s, { italic: false, anchor: a, size: 26 });
    }
    return svg.render();
  },

  // 15.2 Exercise — the cycle ABCDA, with the diagonal DB
  Figure_15_02_11: () => {
    const svg = new Svg({
      width: 760,
      height: 660,
      title: 'Cycle on a PV diagram with values',
      desc: 'A PV diagram with pressure in units of 10⁶ N/m² and volume in 10⁻³ m³. A is at (1.0, 2.6), B at (4.0, 2.0), C at (4.0, 0.6), and D at (1.0, 1.0). Straight lines join A to B, B to C, C to D, and D to A; a green line joins D to B.',
    });
    const g = new Plot(svg, { x: 190, y: 60, w: 520, h: 480, xRange: [0, 4.6], yRange: [0, 3.6] });
    svg.arrow(g.x, g.y + g.h, g.x + g.w + 10, g.y + g.h, { color: ARROW, width: 3, head: 18 });
    svg.arrow(g.x, g.y + g.h, g.x, g.y - 30, { color: ARROW, width: 3, head: 18 });
    for (let k = 1; k * 0.5 < 4.5; k += 1)
      svg.line(g.X(k * 0.5), g.Y(0), g.X(k * 0.5), g.Y(0) - 12, { color: ARROW, width: 1.5 });
    for (let k = 1; k * 0.5 < 3.5; k += 1)
      svg.line(g.x, g.Y(k * 0.5), g.x + 12, g.Y(k * 0.5), { color: ARROW, width: 1.5 });
    const P = { A: [1, 2.6], B: [4, 2], C: [4, 0.6], D: [1, 1] };
    const px = k => g.P(...P[k]);
    const dash = { color: ARROW, width: 1.5, dash: '7 6' };
    for (const k of 'ABCD') {
      svg.line(g.x, px(k)[1], ...px(k), dash);
      svg.text(g.x - 18, px(k)[1], P[k][1].toFixed(1), { size: 24, math: false, anchor: 'end' });
    }
    for (const k of 'DC') svg.line(px(k)[0], px(k)[1], px(k)[0], g.Y(0), dash);
    svg.text(g.X(1), g.Y(0) + 40, '1.0', { size: 24, math: false });
    svg.text(g.X(4), g.Y(0) + 40, '4.0', { size: 24, math: false });
    svg.polyline([px('A'), px('B'), px('C'), px('D'), px('A')], { color: LOOP_EDGE, width: 4 });
    svg.line(...px('D'), ...px('B'), { color: '#5ab43c', width: 4 });
    for (const [k, dx, dy] of [
      ['A', -32, -24],
      ['B', 30, 0],
      ['C', 30, 0],
      ['D', -30, -26],
    ]) {
      dot(svg, px(k), 8);
      svg.text(px(k)[0] + dx, px(k)[1] + dy, k, { size: 26, math: false });
    }
    lab(svg, g.x - 10, 22, 'P', { size: 26 });
    svg.text(g.x - 70, 60, '(10^6 N/m^2)', { size: 24, math: false });
    svg.text(g.x + 400, g.Y(0) + 100, '\\it{V} (10^{−3} m^3)', { size: 24, math: false });
    return svg.render();
  },

  // 15.3 Fig. 1 — processes that go only one way
  Figure_15_03_02: () => {
    const svg = new Svg({
      width: 880,
      height: 900,
      title: 'Spontaneous one-way processes',
      desc: '(a) Heat Q flows by itself from a hot region to a cold one. (b) A car moving with velocity v brakes to a stop, v_f = 0, converting its kinetic energy to heat Q. (c) A puff of air released into an evacuated box spreads out to a uniform distribution. None of these happens in reverse on its own.',
    });
    // (a)
    svg.rect(170, 10, 265, 245, { fill: '#fde6e1' });
    svg.rect(435, 10, 265, 245, { fill: '#e9eef5' });
    lab(svg, 300, 52, 'Hot', { italic: false });
    lab(svg, 565, 52, 'Cold', { italic: false });
    heatArrow(
      svg,
      [
        [295, 155],
        [590, 155],
      ],
      { w: 70, amp: 6, waves: 3 }
    );
    lab(svg, 430, 158, 'Heat', { italic: false, halo: false });
    lab(svg, 525, 158, 'Q', { halo: false });
    caption(svg, 435, 285, '(a)');
    // (b)
    svg.rect(10, 465, 860, 8, { fill: '#e8c79d' });
    car(svg, 15, 465);
    svg.arrow(325, 415, 425, 415, { color: '#4caf50', width: 4, head: 20 });
    lab(svg, 355, 385, '**v**');
    car(svg, 480, 465);
    lab(svg, 805, 375, '\\it{v}_f = 0', { anchor: 'start' });
    heatArrow(
      svg,
      [
        [745, 470],
        [815, 497],
      ],
      { w: 20 }
    );
    lab(svg, 830, 500, 'Q', { anchor: 'start' });
    caption(svg, 435, 525, '(b)');
    // (c)
    const box = x => svg.rect(x, 580, 245, 255, { fill: '#fad8a3', stroke: '#e0b26a', width: 1.5 });
    const bottle = x =>
      svg.path(
        `M ${x} 832 L ${x} 735 Q ${x} 712 ${x + 16} 708 L ${x + 16} 696 Q ${x + 20} 690 ${x + 24} 696 L ${x + 24} 708 Q ${x + 40} 712 ${x + 40} 735 L ${x + 40} 832 Z`,
        {
          color: '#8e6fb5',
          width: 1.5,
          fill: '#d3c4e6',
        }
      );
    box(175);
    bottle(185);
    const burst = [];
    for (let k = 0; k < 24; k += 1) {
      const a = (k * Math.PI) / 12;
      const r = k % 2 ? 18 : 30;
      burst.push([250 + r * Math.cos(a), 660 + r * Math.sin(a)]);
    }
    svg.polygon(burst, { fill: '#8fd3f2' });
    svg.circle(250, 660, 14, { fill: '#ffffff' });
    svg.line(208, 697, 236, 670, { color: '#8fd3f2', width: 4 });
    const rand = rng(6);
    for (let k = 0; k < 9; k += 1) {
      const a = -Math.PI * 0.9 + (k / 8) * Math.PI * 1.4;
      const pts = [];
      let [x, y] = [250 + 32 * Math.cos(a), 660 + 32 * Math.sin(a)];
      for (let j = 0; j < 4; j += 1) {
        pts.push([x, y]);
        x += 14 * Math.cos(a) + (rand() - 0.5) * 14;
        y += 14 * Math.sin(a) + (rand() - 0.5) * 14;
      }
      svg.polyline(pts, { color: ARROW, width: 1.3, dash: '4 3' });
      svg.arrow(...pts.at(-1), x, y, { color: ARROW, width: 1.3, head: 8 });
    }
    labs(svg, 240, 745, ['Puff of air'], { italic: false, anchor: 'start', size: 21 });
    lab(svg, 245, 812, 'Vacuum', { italic: false, anchor: 'start', size: 21 });
    box(460);
    bottle(470);
    for (let row = 0; row < 9; row += 1) {
      const y = 600 + row * 22;
      const x0 = row < 5 ? 480 : 540;
      svg.path(`M ${x0} ${y} Q ${(x0 + 690) / 2} ${y + 14} 690 ${y}`, {
        color: ARROW,
        width: 1.3,
        dash: '5 4',
      });
    }
    labs(svg, 640, 790, ['Uniform', 'distribution'], { italic: false, size: 21, gap: 26 });
    caption(svg, 435, 880, '(c)');
    return svg.render();
  },

  // 15.3 Fig. 2 — heat flows hot to cold; an engine diverts some into work
  Figure_15_03_03: () => {
    const svg = new Svg({
      width: 760,
      height: 600,
      title: 'Heat transfer and a heat engine',
      desc: '(a) Heat flows spontaneously from a hot reservoir at T_h to a cold reservoir at T_c. (b) A heat engine takes heat Q_h from the hot reservoir, does work W, and gives heat Q_c to the cold reservoir, so W = Q_h − Q_c.',
    });
    reservoir(svg, 30, 10, 200, 110, true);
    reservoir(svg, 30, 400, 200, 110, false);
    heatArrow(
      svg,
      [
        [130, 70],
        [130, 470],
      ],
      { w: 70, ...WAVE }
    );
    lab(svg, 130, 36, 'T_h', { halo: false });
    lab(svg, 130, 487, 'T_c', { halo: false });
    caption(svg, 130, 545, '(a)');
    engine(svg, 430, 10, { qc: 34, w: 36, reach: 200 });
    lab(svg, 640, 190, 'Heat engine', { italic: false });
    // To the rim of the disc, above the work arrow.
    svg.leader(590, 200, 503, 172, { bend: 0.15 });
    lab(svg, 580, 325, '\\it{W} = \\it{Q}_h − \\it{Q}_c', { anchor: 'start' });
    caption(svg, 430, 545, '(b)');
    return svg.render();
  },

  // 15.3 Fig. 3 — the four-stroke gasoline engine
  Figure_15_03_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 600,
      title: 'Four-stroke gasoline engine',
      desc: '(a) Intake: the piston moves down and the intake valve opens, drawing in an air–fuel mixture. (b) Compression: with both valves closed, the piston moves up and compresses the mixture. (c) Power: a spark ignites the mixture, and the hot gas pushes the piston down with force F = PA. (d) Exhaust: the exhaust valve opens and the piston moves up, pushing out the burned gas. The crankshaft turns clockwise throughout.',
    });
    strokePanel(svg, 0, { theta: 110, gas: '#cbeef1', intake: true, arrow: 1 });
    strokePanel(svg, 250, { theta: 320, gas: '#a8dfe6', arrow: -1 });
    strokePanel(svg, 500, { theta: 30, gas: '#fde3cf', spark: true, arrow: 1, arrowColor: RED });
    strokePanel(svg, 750, { theta: 230, gas: '#f8b8a0', exhaust: true, arrow: -1 });
    svg.arrow(0, 92, 45, 92, { color: ARROW, width: 2, head: 11 });
    labs(svg, 20, 128, ['Air', 'fuel'], { italic: false, size: 20, gap: 22 });
    lab(svg, 225, 140, 'Piston', { italic: false, size: 20, anchor: 'start' });
    svg.arrow(222, 140, 200, 160, { color: ARROW, width: 1.8, head: 10 });
    lab(svg, 625, 18, 'Spark', { italic: false, size: 20 });
    // In the gap between panels (c) and (d), clear of both cylinder walls.
    lab(svg, 713, 210, '\\it{F} = \\it{PA}', { size: 21, anchor: 'start' });
    svg.arrow(955, 92, 1000, 92, { color: ARROW, width: 2, head: 11 });
    lab(svg, 935, 18, 'Exhaust', { italic: false, size: 20 });
    svg.leader(935, 32, 960, 88, { bend: -0.3, arrow: false });
    for (const [k, s] of ['Intake', 'Compression', 'Power', 'Exhaust'].entries()) {
      lab(svg, 125 + 250 * k, 538, s, { italic: false, size: 20 });
      caption(svg, 125 + 250 * k, 572, `(${'abcd'[k]})`);
    }
    return svg.render();
  },

  // 15.3 Fig. 4 — the Otto cycle and its engine diagram
  Figure_15_03_05: () => {
    const svg = new Svg({
      width: 900,
      height: 510,
      title: 'Otto cycle',
      desc: 'A PV diagram of a simplified Otto cycle: adiabatic compression A to B, heating at constant volume B to C (heat Q_h, from the internal energy ΔU of burning fuel), adiabatic expansion C to D, and cooling at constant volume D to A (heat Q_c out). Beside it, the equivalent heat engine: ΔU creates Q_h; W, proportional to the shaded area of the PV diagram, is done; and Q_c goes to the cold reservoir.',
    });
    const { B, C, D, A, top, bottom } = ottoCycle(svg, 40, 40, {
      pC: 0.95,
      pA: 0.03,
      labels: true,
    });
    heatArrow(
      svg,
      [
        [B[0] - 70, (B[1] + C[1]) / 2 + 20],
        [B[0] + 70, (B[1] + C[1]) / 2 + 20],
      ],
      { w: 36 }
    );
    labs(svg, B[0] - 72, (B[1] + C[1]) / 2 - 10, ['Q_h', 'from', 'Δ\\it{U}'], {
      anchor: 'end',
      size: 20,
      gap: 23,
    });
    heatArrow(
      svg,
      [
        [D[0] - 40, (D[1] + A[1]) / 2],
        [D[0] + 90, (D[1] + A[1]) / 2],
      ],
      { w: 30 }
    );
    lab(svg, D[0] + 52, (D[1] + A[1]) / 2, 'Q_c', { halo: false, size: 20 });
    lab(svg, 380, 60, 'Adiabatics', { italic: false });
    svg.squiggle(350, 75, ...top[35], { waves: 1, amp: 4 });
    svg.leader(395, 75, ...bottom[30], { bend: -0.15 });
    engine(svg, 680, 45, {
      qc: 28,
      w: 34,
      reach: 180,
      labels: { th: '', qh: '', qc: 'Q_c', w: '' },
    });
    lab(svg, 680, 25, 'T_h');
    labs(svg, 680, 72, ['Δ\\it{U}', 'creates', '\\it{Q}_h'], { size: 19, gap: 22, halo: false });
    labs(
      svg,
      890,
      335,
      ['\\it{W} proportional', '\\rm{to} shaded area', '\\rm{of} \\it{PV} diagram'],
      {
        anchor: 'end',
        size: 19,
        gap: 23,
      }
    );
    return svg.render();
  },

  // 15.3 Fig. 5 — a hotter, larger Otto cycle does more work
  Figure_15_03_06: () => {
    const svg = new Svg({
      width: 900,
      height: 480,
      title: 'Otto cycle with greater work output',
      desc: 'A PV diagram of an Otto cycle with a higher starting temperature along CD and a lower one along AB than in the previous figure, so the area inside the loop, the net work, is greater. Beside it, the engine diagram: heat Q′_h from the reservoir at T′_h, work W′, and heat Q′_c to the reservoir at T′_c.',
    });
    const { B, C, D, A, top, bottom } = ottoCycle(svg, 40, 40, {
      pC: 1.05,
      pA: 0.018,
      labels: true,
    });
    heatArrow(
      svg,
      [
        [B[0] - 60, (B[1] + C[1]) / 2 - 20],
        [B[0] + 80, (B[1] + C[1]) / 2 - 20],
      ],
      { w: 40 }
    );
    lab(svg, B[0] - 58, (B[1] + C[1]) / 2 - 58, 'Q′_h', { anchor: 'start' });
    heatArrow(
      svg,
      [
        [D[0] - 40, (D[1] + A[1]) / 2],
        [D[0] + 90, (D[1] + A[1]) / 2],
      ],
      { w: 30 }
    );
    lab(svg, D[0] + 52, (D[1] + A[1]) / 2, 'Q′_c', { halo: false, size: 20 });
    lab(svg, 380, 30, 'Adiabatics', { italic: false });
    svg.squiggle(350, 45, ...top[35], { waves: 1, amp: 4 });
    svg.leader(395, 45, ...bottom[30], { bend: -0.12 });
    engine(svg, 680, 15, {
      qc: 26,
      w: 44,
      reach: 180,
      labels: { th: 'T′_h', tc: 'T′_c', qh: 'Q′_h', qc: 'Q′_c', w: 'W′' },
    });
    return svg.render();
  },

  // 15.4 Fig. 1 — the Carnot cycle and its engine
  Figure_15_04_02: () => {
    const svg = new Svg({
      width: 900,
      height: 540,
      title: 'Carnot cycle',
      desc: 'A PV diagram of a Carnot cycle: isothermal expansion A to B at T_h (heat Q_h in), adiabatic expansion B to C, isothermal compression C to D at T_c (heat Q_c out), and adiabatic compression D to A. The dashed extensions are the two isotherms. Beside it, the Carnot engine: Q_h in, W out, Q_c to the cold reservoir.',
    });
    const g = pvAxes(svg, 70, 30, 520, 460, { xRange: [0.5, 5.4], yRange: [0, 1.25] });
    const cyc = carnotCycle(g, { vB: 1.9, ratio: 0.55 });
    const { AB, BC, CD, DA } = cyc;
    svg.polygon([[AB[0][0], g.Y(0)], ...AB, ...BC, [BC.at(-1)[0], g.Y(0)]], { fill: '#d9ecdf' });
    svg.polygon([...AB, ...BC, ...CD, ...DA], { fill: LOOP });
    svg.line(AB[0][0], AB[0][1], AB[0][0], g.Y(0), { color: '#5aa58a', width: 1.5 });
    svg.line(BC.at(-1)[0], BC.at(-1)[1], BC.at(-1)[0], g.Y(0), { color: '#5aa58a', width: 1.5 });
    const dash = { color: ARROW, width: 2, dash: '7 6' };
    svg.polyline(trace(g, cyc.hot, 0.8, cyc.v.vA), dash);
    svg.polyline(trace(g, cyc.hot, cyc.v.vB, 3.2), dash);
    svg.polyline(trace(g, cyc.cold, 1.5, cyc.v.vD), dash);
    svg.polyline(trace(g, cyc.cold, cyc.v.vC, 5.3), dash);
    for (const [pts, c] of [
      [AB, ISO],
      [BC, LOOP_EDGE],
      [CD, ISO],
      [DA, LOOP_EDGE],
    ]) {
      svg.polyline(pts, { color: c, width: 3.5 });
      midArrow(svg, pts, 0.6, c, 16);
    }
    for (const p of [AB[0], BC[0], CD[0], DA[0]]) dot(svg, p);
    lab(svg, AB[0][0] - 14, AB[0][1], 'A', { italic: false, anchor: 'end' });
    lab(svg, BC[0][0] + 12, BC[0][1] - 16, 'B', { italic: false, anchor: 'start' });
    lab(svg, CD[0][0] + 6, CD[0][1] + 22, 'C', { italic: false, anchor: 'start' });
    lab(svg, DA[0][0] - 4, DA[0][1] + 24, 'D', { italic: false });
    carnotLabels(svg, g, cyc, false);
    engine(svg, 760, 25, { qc: 24, w: 22, reach: 130 });
    return svg.render();
  },

  // 15.4 Fig. 2 — a pressurized-water nuclear power plant
  Figure_15_04_03: () => {
    const svg = new Svg({
      width: 900,
      height: 680,
      title: 'Nuclear power plant',
      desc: 'Schematic of a pressurized water reactor power plant. Inside the containment structure, the core in the pressure vessel, with its control rods, heats water that is pumped in a closed loop through the steam generator. Steam from the generator goes along the steam line to the high- and low-pressure turbines, which turn the turbine generator. The spent steam is condensed by cooling water that circulates to the cooling tower, and the condensed water is pumped back to the steam generator.',
    });
    const tube = (pts, { w = 16 } = {}) => {
      svg.polyline(pts, { color: '#7fbfe3', width: w, join: 'round' });
      svg.polyline(pts, { color: '#e3f3fb', width: w - 6, join: 'round' });
    };
    const flow = (x1, y1, x2, y2) =>
      svg.arrow(x1, y1, x2, y2, { color: '#1f6fb5', width: 1.5, head: 8 });
    // Containment.
    svg.path('M 100 650 L 100 380 Q 100 300 180 300 L 340 300 Q 420 300 420 380 L 420 650 Z', {
      color: '#9a9c9f',
      width: 7,
      fill: '#ffffff',
    });
    svg.path('M 115 640 L 115 385 Q 115 315 185 315 L 335 315 Q 405 315 405 385 L 405 640 Z', {
      color: '#6d6e71',
      width: 2,
      fill: 'none',
    });
    // Primary loop: vessel → generator → pump → vessel.
    tube([
      [230, 520],
      [290, 520],
    ]);
    tube([
      [300, 580],
      [300, 615],
      [140, 615],
      [140, 545],
      [178, 545],
    ]);
    // Pressure vessel and core.
    svg.path(
      'M 175 455 Q 175 425 210 425 L 245 425 Q 280 425 280 455 L 280 575 Q 280 605 245 605 L 210 605 Q 175 605 175 575 Z',
      { color: '#5aa0cf', width: 3, fill: '#d6ecf8' }
    );
    svg.rect(210, 505, 36, 36, { fill: '#8a8c8f', stroke: '#555555', width: 1.5 });
    for (const x of [218, 228, 238]) svg.line(x, 505, x, 435, { color: '#333333', width: 2.5 });
    // Steam generator with its U-tube.
    svg.path(
      'M 285 385 Q 285 350 320 350 L 330 350 Q 365 350 365 385 L 365 560 Q 365 590 330 590 L 320 590 Q 285 590 285 560 Z',
      { color: '#5aa0cf', width: 3, fill: '#d6ecf8' }
    );
    for (let k = 0; k < 20; k += 1)
      svg.circle(298 + (k % 5) * 14, 365 + Math.floor(k / 5) * 14, 6, {
        fill: '#ffffff',
        stroke: '#c9e3f2',
        width: 1,
      });
    tube(
      [
        [290, 520],
        [310, 520],
        [310, 450],
        [345, 450],
        [345, 580],
      ],
      { w: 14 }
    );
    flow(150, 590, 150, 560);
    flow(250, 616, 200, 616);
    // Steam line to turbines, condensate back via the pump.
    tube([
      [325, 350],
      [325, 330],
      [530, 330],
      [530, 440],
    ]);
    tube([
      [475, 615],
      [475, 545],
      [365, 545],
    ]);
    flow(420, 331, 460, 331);
    flow(420, 546, 390, 546);
    // Turbine hall with condenser water.
    svg.polygon(
      [
        [460, 440],
        [690, 440],
        [690, 640],
        [460, 640],
      ],
      { fill: '#eef6fb', stroke: '#9a9c9f', width: 2 }
    );
    svg.rect(462, 560, 226, 78, { fill: '#a9d8f2' });
    for (let k = 0; k < 28; k += 1)
      svg.circle(472 + (k % 14) * 16, 452 + Math.floor(k / 14) * 16, 8, {
        fill: '#ffffff',
        stroke: '#d6ecf8',
        width: 1,
      });
    svg.line(480, 500, 760, 500, { color: '#555555', width: 3 });
    const turbine = (x, n) => {
      for (let k = 0; k < n; k += 1) {
        const h = 16 + k * 9;
        svg.rect(x + k * 14, 500 - h, 10, 2 * h, { fill: '#9a9c9f', stroke: '#6d6e71', width: 1 });
      }
    };
    turbine(495, 5);
    turbine(585, 6);
    svg.rect(700, 480, 70, 40, { fill: '#c7c8ca', stroke: '#6d6e71', width: 1.5 });
    for (let k = 0; k < 5; k += 1)
      svg.rect(708 + k * 11, 486, 6, 28, { fill: '#ffffff', stroke: '#6d6e71', width: 0.8 });
    // Cooling water loop to the tower.
    tube([
      [530, 600],
      [790, 600],
      [840, 560],
      [840, 300],
      [790, 220],
      [760, 200],
    ]);
    tube([
      [540, 585],
      [775, 585],
      [815, 550],
      [815, 300],
      [770, 230],
      [740, 205],
    ]);
    svg.path('M 650 200 Q 690 120 680 30 L 830 30 Q 820 120 860 200 Z', {
      color: '#d9a94a',
      width: 1.5,
      fill: '#f6d78f',
    });
    svg.ellipse(755, 200, 105, 18, { fill: '#e9c06a', stroke: '#d9a94a', width: 1.5 });
    svg.ellipse(755, 30, 75, 12, { fill: '#fbe6b5', stroke: '#d9a94a', width: 1.5 });
    // Labels.
    const L = (x, y, list, o = {}) =>
      labs(svg, x, y, list, { italic: false, size: 18, gap: 21, ...o });
    L(755, 120, ['Cooling tower']);
    L(270, 255, ['Containment structure']);
    svg.squiggle(300, 270, 330, 304, { waves: 1, amp: 4 });
    L(160, 345, ['Steel', 'containment']);
    svg.squiggle(125, 380, 104, 400, { waves: 0.8, amp: 3 });
    L(320, 342, ['Steam'], { size: 17 });
    L(225, 400, ['Control', 'rods'], { size: 17 });
    L(395, 405, ['Steam', 'generator'], { anchor: 'start', size: 17 });
    svg.squiggle(393, 420, 366, 440, { waves: 0.8, amp: 3 });
    L(55, 485, ['Pressure', 'vessel'], { size: 17 });
    svg.squiggle(90, 490, 175, 505, { waves: 1, amp: 3 });
    L(227, 580, ['Core'], { size: 17 });
    L(440, 315, ['Steam line'], { size: 17 });
    L(410, 575, ['Pump'], { size: 17 });
    L(580, 365, ['High-pressure', 'turbine'], { size: 17 });
    svg.leader(580, 405, 540, 480, { bend: 0.1 });
    L(690, 400, ['Low-pressure', 'turbine'], { size: 17 });
    svg.leader(690, 440, 640, 470, { bend: 0.1 });
    L(735, 455, ['Turbine', 'generator'], { size: 17 });
    L(790, 635, ['Condenser', 'cooling water'], { size: 17 });
    return svg.render();
  },

  // 15.4 Fig. 3 — real engines fall short of Carnot engines
  Figure_15_04_05: () => {
    const svg = new Svg({
      width: 820,
      height: 580,
      title: 'Real and Carnot engines',
      desc: '(a) A real engine between the same reservoirs converts less of Q_h to work, and gives more to the cold reservoir, than a Carnot engine would; the dashed outline shows the Carnot engine’s larger work output. (b) Friction in the output mechanism turns part of the work, W_f, into heat Q_f that also goes to the cold reservoir.',
    });
    engine(svg, 170, 10, { qc: 46, w: 26, reach: 165, carnot: 18, labels: { w: '' } });
    caption(svg, 170, 555, '(a)');
    const e = engine(svg, 540, 10, { qc: 30, qf: 18, w: 28, reach: 175 });
    lab(svg, e.xf + 4, e.cy + 6, 'W_f', { size: 18, halo: false });
    lab(svg, e.xf, e.yEnd - 30, 'Q_f', { size: 18, halo: false });
    labs(svg, 610, 380, ['Work done', 'against friction', 'goes to cold', 'reservoir'], {
      italic: false,
      anchor: 'start',
      size: 19,
      gap: 22,
    });
    svg.squiggle(605, 380, e.xf + 12, e.cy + 30, { waves: 1, amp: 4 });
    caption(svg, 540, 555, '(b)');
    return svg.render();
  },

  // 15.5 Fig. 1 — a heat pump and the reversed Carnot cycle
  Figure_15_05_01: () => {
    const svg = new Svg({
      width: 900,
      height: 540,
      title: 'Heat pump and reversed Carnot cycle',
      desc: '(a) A heat pump uses work W to take heat Q_c from the cold reservoir at T_c and deliver heat Q_h = Q_c + W to the hot reservoir at T_h. (b) Its ideal cycle is a Carnot cycle run backward: adiabatic expansion A to D, isothermal expansion D to C at T_c (Q_c taken in), adiabatic compression C to B, and isothermal compression B to A at T_h (Q_h given out).',
    });
    pump(svg, 130, 30, { qc: 26, w: 22, from: 200 });
    caption(svg, 130, 520, '(a)');
    const g = pvAxes(svg, 400, 30, 440, 440, { xRange: [0.5, 5.4], yRange: [0, 1.25] });
    const cyc = carnotCycle(g, { vB: 1.9, ratio: 0.55 });
    const { AB, BC, CD, DA } = cyc;
    svg.polygon([...AB, ...BC, ...CD, ...DA], { fill: LOOP });
    svg.polygon(
      [[AB[0][0], g.Y(0)], ...[...DA].reverse(), ...[...CD].reverse(), [CD[0][0], g.Y(0)]],
      { fill: '#ddd0e6' }
    );
    svg.line(AB[0][0], AB[0][1], AB[0][0], g.Y(0), { color: ARROW, width: 1.5 });
    svg.line(CD[0][0], CD[0][1], CD[0][0], g.Y(0), { color: ARROW, width: 1.5 });
    const dash = { color: ARROW, width: 2, dash: '7 6' };
    svg.polyline(trace(g, cyc.hot, 0.8, cyc.v.vA), dash);
    svg.polyline(trace(g, cyc.hot, cyc.v.vB, 3.2), dash);
    svg.polyline(trace(g, cyc.cold, 1.5, cyc.v.vD), dash);
    svg.polyline(trace(g, cyc.cold, cyc.v.vC, 5.3), dash);
    // Run backward: A → D → C → B → A.
    for (const pts of [AB, BC, CD, DA]) {
      svg.polyline(pts, { color: LOOP_EDGE, width: 3.5 });
      midArrow(svg, [...pts].reverse(), 0.5, LOOP_EDGE, 16);
    }
    for (const p of [AB[0], BC[0], CD[0], DA[0]]) dot(svg, p);
    lab(svg, AB[0][0] - 14, AB[0][1], 'A', { italic: false, anchor: 'end' });
    lab(svg, BC[0][0] + 12, BC[0][1] - 16, 'B', { italic: false, anchor: 'start' });
    lab(svg, CD[0][0] + 6, CD[0][1] + 22, 'C', { italic: false, anchor: 'start' });
    lab(svg, DA[0][0] - 4, DA[0][1] + 24, 'D', { italic: false });
    carnotLabels(svg, g, cyc, true);
    caption(svg, 620, 520, '(b)');
    return svg.render();
  },

  // 15.5 Fig. 2 — the four parts of a heat pump
  Figure_15_05_02: () => {
    const svg = new Svg({
      width: 600,
      height: 660,
      title: 'Components of a heat pump',
      desc: 'A heat pump circuit. The working fluid leaves the compressor (4) hot, gives off heat Q_h inside at the condenser (1), passes through the expansion valve (2), and, now cold, absorbs heat Q_c from the outside air at the evaporator (3), outside the wall, before returning to the compressor.',
    });
    const [B, Rd] = ['#1f77c8', '#e53935'];
    const wall = 155;
    svg.line(wall, 0, wall, 660, { color: ARROW, width: 1.5, dash: '6 5' });
    lab(svg, wall - 8, 30, 'Outside', { anchor: 'end', italic: false, weight: 'bold' });
    lab(svg, wall + 10, 30, 'Inside', { anchor: 'start', italic: false, weight: 'bold' });
    const [x3, x1, yTop, yBot] = [170, 428, 183, 503];
    const pipe = (pts, c) => svg.polyline(pts, { color: c, width: 4 });
    pipe(
      [
        [298, yTop],
        [x3 + 10, yTop],
        [x3, yTop + 10],
        [x3, 265],
      ],
      B
    );
    pipe(
      [
        [x3, 420],
        [x3, yBot - 10],
        [x3 + 10, yBot],
        [270, yBot],
      ],
      B
    );
    pipe(
      [
        [326, yTop],
        [x1 - 10, yTop],
        [x1, yTop + 10],
        [x1, 265],
      ],
      Rd
    );
    pipe(
      [
        [x1, 420],
        [x1, yBot - 10],
        [x1 - 10, yBot],
        [326, yBot],
      ],
      Rd
    );
    for (const [x, y, dy, c] of [
      [x3, 215, 1, B],
      [x3, 455, 1, B],
      [x1, 225, -1, Rd],
    ]) {
      svg.polygon(
        [
          [x - 9, y - 14 * dy],
          [x + 9, y - 14 * dy],
          [x, y + 14 * dy],
        ],
        { fill: c }
      );
    }
    svg.polygon(
      [
        [370, yBot - 9],
        [370, yBot + 9],
        [398, yBot],
      ],
      { fill: Rd }
    );
    svg.rect(x3 - 32, 265, 64, 155, { fill: '#d6dcf0', stroke: B, width: 2, rx: 30 });
    svg.rect(x1 - 32, 265, 64, 155, { fill: '#f8b38f', stroke: '#e0663c', width: 2, rx: 30 });
    svg.circle(298, yTop, 28, { fill: '#ffffff', stroke: B, width: 2 });
    svg.line(282, yTop - 16, 314, yTop + 16, { color: '#3f5fb0', width: 8 });
    svg.line(282, yTop + 16, 314, yTop - 16, { color: '#3f5fb0', width: 8 });
    svg.circle(298, yBot, 28, { fill: '#ffffff', stroke: B, width: 2 });
    for (const [x, y, s] of [
      [x1, 322, '1'],
      [298, 133, '2'],
      [x3, 343, '3'],
      [298, yBot, '4'],
    ]) {
      lab(svg, x, y, s, { italic: false, halo: false });
    }
    lab(svg, 298, 105, 'Expansion Valve', { italic: false });
    lab(svg, 465, 305, 'Condenser', { italic: false, anchor: 'start' });
    lab(svg, 298, 560, 'Compressor', { italic: false });
    lab(svg, 65, 383, 'Evaporator', { italic: false });
    workArrow(svg, [10, 342], [130, 342], 20, { color: '#c3cbe8', fade: '#e8ecf7' });
    lab(svg, 72, 310, 'Q_c');
    heatArrow(
      svg,
      [
        [325, 350],
        [512, 350],
      ],
      { w: 22, amp: 0, color: '#ef7a3a', fade: '#ffffff' }
    );
    lab(svg, 520, 352, 'Q_h', { anchor: 'start' });
    return svg.render();
  },

  // 15.5 Fig. 3 — friction in a heat pump
  Figure_15_05_03: () => {
    const svg = new Svg({
      width: 560,
      height: 680,
      title: 'A heat pump with friction',
      desc: 'A heat pump driven by work W. Part of W is done against friction and is lost as heat Q_f to the cold reservoir; the remainder, W′, together with Q_c taken from the cold reservoir, is delivered to the hot reservoir as Q_h.',
    });
    const p = pump(svg, 165, 30, { qc: 30, w: 34, qf: 24, from: 230 });
    lab(svg, p.xw + 20, p.cy - 8, 'W′', { size: 20, halo: false });
    labs(svg, 320, 470, ['Work done', 'against friction', 'is lost to cold', 'reservoir'], {
      italic: false,
      anchor: 'start',
      size: 19,
      gap: 22,
    });
    svg.squiggle(315, 465, 248, 400, { waves: 1, amp: 4 });
    return svg.render();
  },

  // 15.5 Fig. 4 — a heat pump through a wall
  Figure_15_05_04: () => {
    const svg = new Svg({
      width: 760,
      height: 560,
      title: 'Heat pump in a wall',
      desc: 'A heat pump set into a wall. Its outside coil, at T_c = −15 °C, is colder than the outside air at −5 °C, so heat Q_c flows in. Its inside coil, at T_h = 45 °C, is hotter than the inside air at 20 °C, so heat Q_h flows into the room. Work W comes from an electrical outlet.',
    });
    svg.polygon(
      [
        [265, 10],
        [490, 120],
        [490, 555],
        [265, 445],
      ],
      { fill: '#fdeccb', stroke: '#e6c98f', width: 1.5 }
    );
    // Two boxes in oblique view: depth along (70, −40).
    const box = (x, w, front, side, top, edge) => {
      const [y, h, dx, dy] = [270, 120, 75, -42];
      svg.polygon(
        [
          [x, y],
          [x + dx, y + dy],
          [x + w + dx, y + dy],
          [x + w, y],
        ],
        { fill: top, stroke: edge, width: 1.5 }
      );
      svg.polygon(
        [
          [x + w, y],
          [x + w + dx, y + dy],
          [x + w + dx, y + h + dy],
          [x + w, y + h],
        ],
        { fill: side, stroke: edge, width: 1.5 }
      );
      svg.rect(x, y, w, h, { fill: front, stroke: edge, width: 1.5 });
    };
    box(195, 225, '#a9b9e0', '#a9b9e0', '#cfd8ef', '#7a8fc8');
    box(420, 140, '#f3a585', '#f6c1a9', '#fbd7c6', '#e07a52');
    lab(svg, 310, 333, '\\it{T}_c = −15\\rm{°C}', { size: 22, halo: false, rotate: -5 });
    lab(svg, 490, 318, '\\it{T}_h = 45\\rm{°C}', { size: 22, halo: false, rotate: -5 });
    heatArrow(
      svg,
      [
        [95, 330],
        [245, 312],
      ],
      { w: 26 }
    );
    lab(svg, 85, 345, 'Q_c', { anchor: 'end' });
    heatArrow(
      svg,
      [
        [540, 250],
        [740, 228],
      ],
      { w: 30 }
    );
    lab(svg, 700, 190, 'Q_h', { anchor: 'start' });
    heatArrow(
      svg,
      [
        [525, 470],
        [450, 470],
        [450, 395],
      ],
      { w: 26, amp: 0 }
    );
    svg.rect(520, 440, 30, 60, { fill: '#8fc4a4', stroke: '#4f8a66', width: 1.2 });
    labs(svg, 520, 395, ['\\it{W} (from electrical', 'outlet)'], { anchor: 'start' });
    lab(svg, 400, 20, 'Wall', { italic: false });
    svg.squiggle(388, 38, 372, 64, { waves: 0.6, amp: 3 });
    labs(svg, 140, 105, ['Outside air', 'temperature = −5°C'], { italic: false });
    svg.leader(150, 160, 120, 345, { bend: 0.2 });
    labs(svg, 590, 75, ['Inside air', 'temperature = 20°C'], { italic: false });
    svg.leader(560, 130, 600, 245, { bend: 0.3 });
    return svg.render();
  },

  // 15.6 Fig. 1 — entropy change is the same along any path
  Figure_15_06_02: () => {
    const svg = new Svg({
      width: 640,
      height: 560,
      title: 'Entropy change between two states',
      desc: 'Two states of a system, state 1 with entropy S₁ and state 2 with entropy S₂. A reversible process from state 1 to state 2 has ΔS = (Q/T)_rev. An irreversible process between the same states has the same change, ΔS_irrev = ΔS_rev = S₂ − S₁, because entropy is a property of the state.',
    });
    svg.line(150, 115, 470, 115, { color: '#7ab32e', width: 5 });
    svg.polygon(
      [
        [470, 100],
        [470, 130],
        [500, 115],
      ],
      { fill: '#7ab32e' }
    );
    svg.path('M 75 185 L 75 335 Q 75 380 120 380 L 520 380 Q 565 380 565 335 L 565 215', {
      color: LOOP_EDGE,
      width: 5,
    });
    svg.polygon(
      [
        [550, 220],
        [580, 220],
        [565, 190],
      ],
      { fill: LOOP_EDGE }
    );
    svg.circle(75, 115, 72, { fill: '#e3f2c5', stroke: '#9ccf54', width: 2 });
    svg.circle(565, 115, 72, { fill: '#dcd0ea', stroke: '#9a7cc2', width: 2 });
    labs(svg, 75, 100, ['State 1', '\\it{S}_1'], { size: 26, gap: 32, halo: false });
    labs(svg, 565, 100, ['State 2', '\\it{S}_2'], { size: 26, gap: 32, halo: false });
    labs(svg, 320, 30, ['Reversible', 'process'], { italic: false, size: 26, gap: 32 });
    lab(svg, 320, 190, 'Δ\\it{S} = (\\it{Q}/\\it{T})_{rev}', { size: 26 });
    labs(svg, 320, 275, ['Δ\\it{S}_{irrev} = Δ\\it{S}_{rev}', '= \\it{S}_2 − \\it{S}_1'], {
      size: 26,
      gap: 34,
    });
    labs(svg, 320, 440, ['Irreversible', 'process has', 'the same Δ\\it{S}'], {
      italic: false,
      size: 26,
      gap: 32,
    });
    return svg.render();
  },

  // 15.6 Fig. 2 — direct heat transfer versus two reversible steps
  Figure_15_06_03: () => {
    const svg = new Svg({
      width: 880,
      height: 820,
      title: 'Irreversible and reversible heat transfer',
      desc: '(a) Heat Q flows directly from a hot reservoir at T_h to a cold one at T_c, an irreversible process. (b) The same heat leaves the hot reservoir in one reversible process and enters the cold reservoir in another. The entropy change is the same either way: ΔS_irrev = ΔS_rev.',
    });
    reservoir(svg, 40, 10, 240, 150, true);
    reservoir(svg, 40, 465, 240, 150, false);
    heatArrow(
      svg,
      [
        [160, 95],
        [160, 550],
      ],
      { w: 76, amp: 6, period: 50, taper: false }
    );
    lab(svg, 160, 45, 'T_h', { halo: false, size: 26 });
    lab(svg, 160, 130, 'Q', { halo: false, size: 26 });
    lab(svg, 160, 505, 'Q', { halo: false, size: 26 });
    lab(svg, 160, 585, 'T_c', { halo: false, size: 26 });
    labs(svg, 185, 290, ['Direct from', '\\it{T}_h \\rm{to} \\it{T}_c'], {
      anchor: 'start',
      size: 26,
      gap: 32,
    });
    lab(svg, 160, 650, 'Irreversible', { italic: false, size: 26 });
    lab(svg, 160, 740, 'Δ\\it{S}_{irrev} = Δ\\it{S}_{rev}', { size: 26 });
    caption(svg, 160, 795, '(a)');
    reservoir(svg, 455, 10, 240, 150, true);
    reservoir(svg, 455, 465, 240, 150, false);
    lab(svg, 575, 45, 'T_h', { halo: false, size: 26 });
    lab(svg, 575, 585, 'T_c', { halo: false, size: 26 });
    heatArrow(
      svg,
      [
        [560, 120],
        [665, 285],
      ],
      { w: 76, amp: 6, waves: 2 }
    );
    lab(svg, 635, 255, 'Q', { halo: false, size: 26 });
    labs(svg, 705, 215, ['Reversible', 'process'], {
      italic: false,
      anchor: 'start',
      size: 26,
      gap: 32,
    });
    heatArrow(
      svg,
      [
        [490, 410],
        [610, 545],
      ],
      { w: 76, amp: 6, waves: 2 }
    );
    lab(svg, 585, 512, 'Q', { halo: false, size: 26 });
    labs(svg, 650, 375, ['Reversible', 'process'], { italic: false, size: 26, gap: 32 });
    lab(svg, 575, 650, 'Two reversible processes', { italic: false, size: 26 });
    lab(svg, 575, 740, 'Δ\\it{S}_{irrev} = Δ\\it{S}_{rev}', { size: 26 });
    caption(svg, 575, 795, '(b)');
    return svg.render();
  },

  // 15.6 Fig. 3 — the same heat does less work from a cooler reservoir
  Figure_15_06_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 580,
      title: 'Carnot engines and entropy',
      desc: '(a) A Carnot engine between 600 K and 100 K takes in Q_h = 4000 J and does W = 3333 J of work, giving Q_c = 667 J to the cold reservoir. (b) If the 4000 J first flows irreversibly to a reservoir at 250 K, entropy increases, and a Carnot engine from there to 100 K does only W = 2400 J, giving Q_c = 1600 J to the cold reservoir. Greater entropy overall means less work.',
    });
    // Arrow widths: 18 px per 1000 J.
    const k = 18 / 1000;
    const J = '\\rm{ J}';
    engine(svg, 160, 20, {
      qc: 667 * k,
      w: 3333 * k,
      reach: 140,
      labels: {
        th: `\\it{T}_h = 600\\rm{ K}`,
        tc: `\\it{T}_c = 100\\rm{ K}`,
        qh: '',
        qc: '',
        w: '',
      },
    });
    lab(svg, 210, 140, `\\it{Q}_h = 4000${J}`, { anchor: 'start', size: 20 });
    lab(svg, 300, 248, `\\it{W} = 3333${J}`, { anchor: 'start', size: 20 });
    lab(svg, 160, 355, `\\it{Q}_c = 667${J}`, { anchor: 'start', size: 20 });
    lab(svg, 160, 505, 'Carnot engine', { italic: false, size: 20 });
    caption(svg, 160, 560, '(a)');
    reservoir(svg, 460, 20, 200, 110, true);
    heatArrow(
      svg,
      [
        [610, 75],
        [760, 75],
      ],
      { w: 72, amp: 5, waves: 1.5 }
    );
    lab(svg, 520, 75, `\\it{T}_h = 600\\rm{ K}`, { size: 20, halo: false });
    lab(svg, 690, 75, `4000${J}`, { size: 20, halo: false });
    labs(svg, 690, 160, ['Entropy', 'increases'], { italic: false, size: 20, gap: 24 });
    engine(svg, 840, 20, {
      qc: 1600 * k,
      w: 2400 * k,
      reach: 120,
      labels: {
        th: `\\it{T}′_h = 250\\rm{ K}`,
        tc: `\\it{T}_c = 100\\rm{ K}`,
        qh: '',
        qc: '',
        w: '',
      },
    });
    lab(svg, 880, 140, `\\it{Q}′_h = 4000${J}`, { anchor: 'start', size: 20 });
    lab(svg, 960, 280, `\\it{W} = 2400${J}`, { anchor: 'end', size: 20 });
    lab(svg, 870, 355, `\\it{Q}_c = 1600${J}`, { anchor: 'start', size: 20 });
    labs(svg, 840, 505, ['Carnot engine', 'Greater entropy overall'], {
      italic: false,
      size: 20,
      gap: 24,
    });
    caption(svg, 690, 560, '(b)');
    return svg.render();
  },

  // 15.6 Fig. 5 — melting ice: order to disorder
  Figure_15_06_06: () => {
    const svg = new Svg({
      width: 880,
      height: 480,
      title: 'Ice melting: order to disorder',
      desc: 'Molecules in ice are arranged in an ordered, six-fold lattice like a snowflake. When the ice melts, the water molecules move randomly in all directions. The entropy increases, ΔS > 0.',
    });
    const bead = (x, y) => {
      svg.circle(x, y, 7.5, { fill: '#b9c3ea', stroke: '#8592c8', width: 1 });
      svg.circle(x - 2, y - 2.5, 2.4, { fill: '#e7ebfa' });
    };
    const [cx, cy] = [190, 240];
    const beads = [];
    for (let arm = 0; arm < 6; arm += 1) {
      const a = (arm * Math.PI) / 3 + Math.PI / 6;
      const [ux, uy] = [Math.cos(a), Math.sin(a)];
      for (let k = 1; k <= 11; k += 1) beads.push([cx + ux * 15 * k, cy + uy * 15 * k]);
      for (const [at, n] of [
        [4, 4],
        [7, 3],
      ]) {
        for (const s of [-1, 1]) {
          const b = a + (s * Math.PI) / 3;
          for (let j = 1; j <= n; j += 1)
            beads.push([
              cx + ux * 15 * at + Math.cos(b) * 15 * j,
              cy + uy * 15 * at + Math.sin(b) * 15 * j,
            ]);
        }
      }
    }
    bead(cx, cy);
    for (const [x, y] of beads) bead(x, y);
    lab(svg, cx, 25, 'Order', { italic: false });
    lab(svg, cx, 460, 'Ice', { italic: false });
    const pts = curve([400, 210], [490, 140], [560, 190]);
    svg.polyline(pts.slice(0, -4), { color: '#555555', width: 7 });
    svg.arrow(...pts.at(-5), 575, 200, { color: '#555555', width: 7, head: 22 });
    lab(svg, 490, 250, 'Δ\\it{S} > 0', { size: 24 });
    const water = within(
      scatter(14, [630, 140, 220, 200], { seed: 5, gap: 46, vmin: 22, vmax: 52 }),
      [600, 90, 880, 380]
    );
    for (const [x, y, vx, vy] of water) {
      svg.arrow(x, y, x + vx, y + vy, { color: '#6a3d9a', width: 2.2, head: 11 });
      bead(x, y);
    }
    lab(svg, 740, 25, 'Disorder', { italic: false });
    lab(svg, 740, 460, 'Water', { italic: false });
    return svg.render();
  },

  // 15.6 Fig. 6 — the Earth in the flow of energy from the Sun to deep space
  Figure_15_06_07: () => {
    const svg = new Svg({
      width: 880,
      height: 300,
      title: 'Energy flow from the Sun to deep space',
      desc: 'Heat Q flows from the Sun at temperature T_h toward deep space at T_c = 3 K. The Earth sits in this flow: part of the energy, ΔU, is diverted to it, which can decrease the Earth’s entropy locally (ΔS < 0?) while the total entropy still increases.',
    });
    heatArrow(
      svg,
      [
        [95, 135],
        [875, 135],
      ],
      { w: 150, amp: 10, waves: 2, head: 1.45, color: '#b39dce', fade: '#fbe9b4' }
    );
    sun(svg, 75, 125, 62, { rays: 22, long: 0.32 });
    lab(svg, 270, 125, 'Q', { halo: false, size: 24 });
    workArrow(svg, [350, 128], [452, 128], 36, { color: '#ef7a50', fade: '#f9bfa6' });
    lab(svg, 400, 128, 'Δ\\it{U}', { halo: false, size: 20 });
    earth(svg, 495, 128, 36);
    lab(svg, 495, 70, 'Δ\\it{S} < 0?', { halo: false, size: 20 });
    lab(svg, 495, 186, 'Earth', { italic: false, halo: false, size: 20 });
    lab(svg, 790, 128, '\\it{T}_c = 3\\rm{ K}', { halo: false, size: 20 });
    lab(svg, 820, 235, 'Deep space', { italic: false, size: 20 });
    lab(svg, 85, 255, 'T_h', { size: 22 });
    lab(svg, 85, 285, 'Sun', { italic: false, size: 20 });
    return svg.render();
  },

  // 15.7 Fig. 2 — a likely and a highly unlikely state of a gas
  Figure_15_07_02: () => {
    const svg = new Svg({
      width: 620,
      height: 1000,
      title: 'Likely and unlikely states of a gas',
      desc: '(a) Gas molecules spread at random through their container, moving in random directions: a likely state. (b) The same molecules all crowded into one corner of the container: a highly unlikely state.',
    });
    const dotm = (x, y) => svg.circle(x, y, 7, { fill: '#5a9e86', stroke: '#2f6f58', width: 1.5 });
    const draw = list => {
      for (const [x, y, vx, vy] of list)
        svg.arrow(x, y, x + vx, y + vy, { color: ARROW, width: 1.8, head: 12 });
      for (const [x, y] of list) dotm(x, y);
    };
    svg.rect(10, 10, 600, 395, { stroke: ARROW, width: 2 });
    draw(
      within(
        scatter(20, [30, 30, 560, 355], { seed: 31, gap: 70, vmin: 40, vmax: 150 }),
        [12, 12, 608, 403]
      )
    );
    caption(svg, 40, 445, '(a)');
    lab(svg, 310, 445, 'Likely', { italic: false, size: 26 });
    svg.rect(10, 535, 600, 395, { stroke: ARROW, width: 2 });
    draw(
      within(
        scatter(24, [22, 760, 170, 160], { seed: 13, gap: 22, vmin: 25, vmax: 60 }),
        [12, 537, 608, 928]
      )
    );
    caption(svg, 40, 970, '(b)');
    lab(svg, 310, 970, 'Highly unlikely', { italic: false, size: 26 });
    return svg.render();
  },
};

/** 15.2 Fig. 2 — heat in at constant volume, expansion doing work, compression with heat out. */
function pistonStrokes() {
  const svg = new Svg({
    width: 560,
    height: 1250,
    title: 'Heat, work, and internal energy in a piston engine',
    desc: '(a) Heat Q_in is added to the gas while the piston is held still, so ΔU_a = Q_in; the gas pushes on the piston with force F = PA. (b) The gas expands, pushing the piston a distance d and doing work W_out = Fd on the crank, so ΔU_b = −W_out. (c) The piston is pushed back the distance d by a smaller force F′, so W_in = F′d with F′ < F, while heat Q_out leaves the gas.',
  });
  pistonPanel(svg, 100, {
    px: 175,
    pinAngle: 200,
    extras: ({ cyl }) => {
      heatArrow(
        svg,
        [
          [130, 0],
          [130, cyl - 30],
        ],
        { w: 52, amp: 5, waves: 2.5 }
      );
      lab(svg, 130, cyl - 80, 'Q_{in}', { halo: false });
      svg.arrow(20, cyl + 15, 165, cyl + 15, { color: RED, width: 4, head: 20 });
      lab(svg, 105, cyl - 15, '**F**', { halo: false });
      lab(svg, 130, cyl + 55, '\\it{F} = \\it{PA}', { halo: false });
      lab(svg, 160, cyl + 125, 'Δ\\it{U}_a = \\it{Q}_{in}');
      caption(svg, 280, cyl + 170, '(a)');
    },
  });
  pistonPanel(svg, 520, {
    px: 260,
    ghost: 175,
    pinAngle: 340,
    extras: ({ cyl, h }) => {
      svg.line(175, cyl - h / 2 - 34, 175, cyl - h / 2, { color: ARROW, width: 1.2 });
      svg.line(260, cyl - h / 2 - 34, 260, cyl - h / 2, { color: ARROW, width: 1.2 });
      svg.arrow(177, cyl - h / 2 - 20, 258, cyl - h / 2 - 20, {
        color: ARROW,
        width: 1.5,
        head: 10,
        start: true,
      });
      lab(svg, 217, cyl - h / 2 - 40, 'd');
      svg.arrow(30, cyl + 15, 250, cyl + 15, { color: RED, width: 4, head: 20 });
      lab(svg, 200, cyl - 15, '**F**', { halo: false });
      lab(svg, 395, cyl - 130, '\\it{Fd} = \\it{W}_{out}', { anchor: 'start' });
      const arc = curve([395, cyl - 90], [520, cyl - 80], [500, cyl + 40]);
      svg.polyline(arc.slice(0, -2), { color: ARROW, width: 1.8 });
      svg.arrow(...arc.at(-3), ...arc.at(-1), { color: ARROW, width: 1.8, head: 11 });
      lab(svg, 220, cyl + 125, 'Δ\\it{U}_b = −\\it{W}_{out}');
      caption(svg, 280, cyl + 170, '(b)');
    },
  });
  pistonPanel(svg, 920, {
    px: 175,
    ghost: 260,
    pinAngle: 200,
    extras: ({ cyl, h }) => {
      svg.line(175, cyl - h / 2 - 34, 175, cyl - h / 2, { color: ARROW, width: 1.2 });
      svg.line(260, cyl - h / 2 - 34, 260, cyl - h / 2, { color: ARROW, width: 1.2 });
      svg.arrow(177, cyl - h / 2 - 20, 258, cyl - h / 2 - 20, {
        color: ARROW,
        width: 1.5,
        head: 10,
        start: true,
      });
      lab(svg, 217, cyl - h / 2 - 40, 'd');
      svg.arrow(380, cyl - 30, 265, cyl - 30, { color: RED, width: 4, head: 20 });
      lab(svg, 340, cyl - 58, '**F**′', { halo: false });
      labs(svg, 470, cyl - 150, ['\\it{W}_{in} = \\it{F}′\\it{d}', '\\it{F}′ < \\it{F}'], {
        gap: 28,
      });
      const arc = curve([500, cyl + 40], [500, cyl + 110], [400, cyl + 110]);
      svg.polyline(arc.slice(0, -2), { color: ARROW, width: 1.8 });
      svg.arrow(...arc.at(-3), ...arc.at(-1), { color: ARROW, width: 1.8, head: 11 });
      heatArrow(
        svg,
        [
          [160, cyl - 10],
          [60, cyl + 120],
        ],
        { w: 48, amp: 5, waves: 1.5 }
      );
      lab(svg, 130, cyl + 118, 'Q_{out}', { anchor: 'start' });
      caption(svg, 280, cyl + 170, '(c)');
    },
  });
  return svg.render();
}
