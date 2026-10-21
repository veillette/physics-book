/**
 * Circuit symbols shared by the chapter 21 figures and the chapter 21–25
 * Conceptual Question answers.
 *
 * Each element is drawn centered on the straight segment from P to Q, with
 * lead wires filling the rest of the segment, so a circuit is a list of corner
 * points joined by `wire` and elements placed on the straight runs between
 * them. Elements return the points where their symbol starts and ends, which
 * places labels beside them.
 */
import { COLORS } from './svg.js';

export const WIRE = COLORS.black;
export const CURRENT = COLORS.blue;
export const CELL = COLORS.red;
export const CAPACITOR = '#1b7a4a';

export function unit(P, Q) {
  const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  return [(Q[0] - P[0]) / len, (Q[1] - P[1]) / len, len];
}

/** Lead wires from P and Q to an element of length `size` centered between them. */
export function leads(svg, P, Q, size) {
  const [ux, uy, len] = unit(P, Q);
  const a = (len - size) / 2;
  const A = [P[0] + ux * a, P[1] + uy * a];
  const B = [Q[0] - ux * a, Q[1] - uy * a];
  svg.line(...P, ...A, { color: WIRE, width: 2 });
  svg.line(...B, ...Q, { color: WIRE, width: 2 });
  return { A, B, ux, uy, nx: -uy, ny: ux };
}

export function wire(svg, points) {
  svg.polyline(points, { color: WIRE, width: 2 });
}

export function resistor(svg, P, Q, { size = 50, color = WIRE, amp = 8 } = {}) {
  const { A, ux, uy, nx, ny } = leads(svg, P, Q, size);
  const pts = [A];
  const n = 6;
  for (let k = 0; k < n; k += 1) {
    const t = (k + 0.5) * (size / n);
    const s = k % 2 === 0 ? amp : -amp;
    pts.push([A[0] + ux * t + nx * s, A[1] + uy * t + ny * s]);
  }
  pts.push([A[0] + ux * size, A[1] + uy * size]);
  svg.polyline(pts, { color, width: 2 });
}

/** Resistor with an arrow through it: a variable resistor (rheostat). */
export function rheostat(svg, P, Q, { size = 50, amp = 8 } = {}) {
  resistor(svg, P, Q, { size, amp });
  const [ux, uy] = unit(P, Q);
  const C = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
  const nx = -uy;
  const ny = ux;
  const h = size * 0.55;
  svg.arrow(
    C[0] - ux * h + nx * 18,
    C[1] - uy * h + ny * 18,
    C[0] + ux * h - nx * 18,
    C[1] + uy * h - ny * 18,
    { color: WIRE, width: 1.6, head: 10 }
  );
}

/** Cell with its positive (long) plate toward Q. */
export function cell(svg, P, Q, { gap = 10, long = 34, short = 18 } = {}) {
  const { A, B, nx, ny } = leads(svg, P, Q, gap);
  svg.line(
    A[0] - (nx * short) / 2,
    A[1] - (ny * short) / 2,
    A[0] + (nx * short) / 2,
    A[1] + (ny * short) / 2,
    {
      color: CELL,
      width: 5,
    }
  );
  svg.line(
    B[0] - (nx * long) / 2,
    B[1] - (ny * long) / 2,
    B[0] + (nx * long) / 2,
    B[1] + (ny * long) / 2,
    {
      color: CELL,
      width: 3,
    }
  );
}

/** Two equal parallel plates. */
export function capacitor(svg, P, Q, { gap = 12, plate = 34 } = {}) {
  const { A, B, nx, ny } = leads(svg, P, Q, gap);
  for (const E of [A, B]) {
    svg.line(
      E[0] - (nx * plate) / 2,
      E[1] - (ny * plate) / 2,
      E[0] + (nx * plate) / 2,
      E[1] + (ny * plate) / 2,
      { color: CAPACITOR, width: 4 }
    );
  }
}

export function switchSymbol(svg, P, Q, { closed = false, size = 46 } = {}) {
  const { A, B, ux, uy, nx, ny } = leads(svg, P, Q, size);
  svg.circle(...A, 3.5, { fill: WIRE });
  svg.circle(...B, 3.5, { fill: WIRE });
  if (closed) svg.line(...A, ...B, { color: WIRE, width: 2.5 });
  else
    svg.line(...A, A[0] + ux * size * 0.9 + nx * 20, A[1] + uy * size * 0.9 + ny * 20, {
      color: WIRE,
      width: 2.5,
    });
}

export function bulb(svg, P, Q, { lit = true, r = 20 } = {}) {
  const { A, B } = leads(svg, P, Q, 2 * r);
  const C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  svg.circle(...C, r, { fill: lit ? '#fff3b0' : '#e6e6e6', stroke: WIRE, width: 2 });
  if (lit) {
    for (let a = 0; a < 360; a += 45) {
      const c = Math.cos((a * Math.PI) / 180);
      const s = Math.sin((a * Math.PI) / 180);
      svg.line(C[0] + c * (r + 5), C[1] - s * (r + 5), C[0] + c * (r + 13), C[1] - s * (r + 13), {
        color: COLORS.orange,
        width: 2,
      });
    }
  }
  svg.polyline(
    [
      A,
      [C[0], C[1] - r * 0.55],
      [C[0] + 6, C[1] - r * 0.25],
      [C[0] - 6, C[1]],
      [C[0] + 6, C[1] + r * 0.25],
      [C[0], C[1] + r * 0.55],
      B,
    ],
    { color: WIRE, width: 1.8 }
  );
}

/** Voltmeter (V), ammeter (A) or galvanometer (G): a lettered circle. */
export function meter(svg, P, Q, letter, { r = 18, fill = '#ffffff' } = {}) {
  const { A, B } = leads(svg, P, Q, 2 * r);
  const C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  svg.circle(...C, r, { fill, stroke: WIRE, width: 2 });
  svg.text(C[0], C[1], letter, { size: 18, math: false, weight: 'bold', halo: false });
}

/** AC voltage source: a circle with one cycle of a sine wave in it. */
export function acSource(svg, P, Q, { r = 18 } = {}) {
  const { A, B } = leads(svg, P, Q, 2 * r);
  const C = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
  svg.circle(...C, r, { fill: '#ffffff', stroke: WIRE, width: 2 });
  const pts = [];
  for (let k = 0; k <= 24; k += 1) {
    const t = k / 24;
    pts.push([C[0] - r * 0.6 + t * r * 1.2, C[1] - Math.sin(t * 2 * Math.PI) * r * 0.35]);
  }
  svg.polyline(pts, { color: WIRE, width: 1.8 });
}

/** Ground symbol hanging below (x, y). */
export function ground(svg, x, y, { drop = 14 } = {}) {
  svg.line(x, y, x, y + drop, { color: WIRE, width: 2 });
  for (const [k, half] of [
    [0, 14],
    [6, 9],
    [12, 4],
  ]) {
    svg.line(x - half, y + drop + k, x + half, y + drop + k, { color: WIRE, width: 2 });
  }
}

export function dot(svg, x, y, { r = 4, color = WIRE } = {}) {
  svg.circle(x, y, r, { fill: color });
}

/** Short current arrow along a wire. */
export function currentArrow(svg, x1, y1, x2, y2, { color = CURRENT } = {}) {
  svg.arrow(x1, y1, x2, y2, { color, width: 3, head: 12 });
}

/**
 * Curved current arrow: an arc of radius r about (cx, cy) from angle a1 to a2
 * (degrees, counterclockwise from +x with y up), with the head at a2.
 */
export function loopArrow(svg, cx, cy, r, a1, a2, { color = CURRENT, width = 3 } = {}) {
  const pts = [];
  const n = 30;
  for (let k = 0; k <= n; k += 1) {
    const a = ((a1 + ((a2 - a1) * k) / n) * Math.PI) / 180;
    pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
  }
  svg.polyline(pts.slice(0, -2), { color, width });
  svg.arrow(...pts[n - 3], ...pts[n], { color, width, head: 13 });
}
