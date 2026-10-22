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

/** Gray insulated cable through `points`, with its corners rounded to radius r. */
export function cable(svg, points, { r = 18, color = '#8c8c90', width = 4 } = {}) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let k = 1; k < points.length - 1; k += 1) {
    const [px, py] = points[k - 1];
    const [cx, cy] = points[k];
    const [nx, ny] = points[k + 1];
    const l1 = Math.hypot(cx - px, cy - py);
    const l2 = Math.hypot(nx - cx, ny - cy);
    const rr = Math.min(r, l1 / 2, l2 / 2);
    const a = [cx - ((cx - px) / l1) * rr, cy - ((cy - py) / l1) * rr];
    const b = [cx + ((nx - cx) / l2) * rr, cy + ((ny - cy) / l2) * rr];
    d += ` L ${a[0]} ${a[1]} Q ${cx} ${cy} ${b[0]} ${b[1]}`;
  }
  const [ex, ey] = points[points.length - 1];
  svg.path(`${d} L ${ex} ${ey}`, { color, width });
}

/**
 * A car battery seen from the front left and above, scaled by s, with the
 * front-left corner of its top face at (x, y). `left` is the sign of the left
 * terminal, and `label` is written on the front. The battery reaches up 62·s
 * above y and down 280·s below it, and 520·s to the right of x. Returns the
 * tops of the terminal posts, { pos, neg }, where wires attach.
 */
export function carBattery(svg, x, y, { s = 1, left = '+', label, signs = true } = {}) {
  const [W, H, D, R, lid] = [380, 280, 140, 62, 26];
  if (!svg.batteryDefs) {
    svg.batteryDefs = true;
    svg.add(
      '<defs><linearGradient id="batt_front" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6b6b9"/><stop offset="1" stop-color="#8e8e92"/></linearGradient><linearGradient id="batt_gold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c99a2e"/><stop offset="0.4" stop-color="#f6dc8a"/><stop offset="1" stop-color="#b8892a"/></linearGradient></defs>'
    );
  }
  // A point on the top face: u across the front, v back into the page.
  const top = (u, v) => [u * W + v * D, -v * R];
  const posts = [top(0.16, 0.55), top(0.84, 0.55)];
  const edge = { stroke: '#4a4a4e', width: 2 };
  const inner = svg.capture(() => {
    svg.polygon(
      [
        [W, lid],
        [W + D, lid - R],
        [W + D, H - R],
        [W, H],
      ],
      { fill: '#a9a9ad', ...edge }
    );
    svg.polygon(
      [
        [W + 0.18 * D, lid + 26 - 0.18 * R],
        [W + 0.85 * D, lid + 26 - 0.85 * R],
        [W + 0.85 * D, H - 40 - 0.85 * R],
        [W + 0.18 * D, H - 40 - 0.18 * R],
      ],
      { fill: '#cdb9de', stroke: '#7d6a93', width: 1.5 }
    );
    svg.polygon(
      [
        [0, lid],
        [W, lid],
        [W, H],
        [W - 26, H],
        [W - 36, H - 14],
        [36, H - 14],
        [26, H],
        [0, H],
      ],
      { fill: 'url(#batt_front)', ...edge }
    );
    for (let k = 0; k < 7; k += 1)
      svg.rect(30 + k * 52, lid + 24, 10, H - lid - 66, { fill: '#45454a', rx: 5 });
    svg.polygon(
      [
        [0, 0],
        [W, 0],
        [W, lid],
        [0, lid],
      ],
      { fill: '#3d3d41', ...edge }
    );
    svg.polygon(
      [
        [W, 0],
        [W + D, -R],
        [W + D, lid - R],
        [W, lid],
      ],
      { fill: '#2c2c30', ...edge }
    );
    svg.polygon([top(0, 0), top(1, 0), top(1, 1), top(0, 1)], { fill: '#dcdadc', ...edge });
    svg.polygon([top(0.32, 0.22), top(0.64, 0.22), top(0.64, 0.78), top(0.32, 0.78)], {
      fill: '#b9a0d6',
      stroke: '#8a74a8',
      width: 1.2,
    });
    const [gx, gy] = top(0.7, 0.72);
    svg.ellipse(gx, gy, 9, 4.5, { fill: '#4cbb4c', stroke: '#2f7d2f', width: 1 });
    posts.forEach(([bx, by], i) => {
      svg.ellipse(bx, by, 16, 6, { fill: '#bdbbbd', stroke: '#8a8a8e', width: 1 });
      svg.rect(bx - 9, by - 24, 18, 24, { fill: 'url(#batt_gold)', stroke: '#9a7420', width: 1 });
      svg.ellipse(bx, by - 24, 9, 3.5, { fill: '#f6e3a4', stroke: '#9a7420', width: 1 });
      if (signs) {
        const sign = (i === 0) === (left === '+') ? '+' : '−';
        svg.text(bx - 26, by - 30, sign, { size: 34, math: false });
      }
    });
    if (label) svg.text(W * 0.42, H * 0.6, label, { size: 44, halo: false });
  });
  svg.add(`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`);
  const [lp, rp] = posts.map(([bx, by]) => [x + s * bx, y + s * (by - 24)]);
  return left === '+' ? { pos: lp, neg: rp } : { pos: rp, neg: lp };
}

/**
 * A car headlight facing right, scaled by s, with the middle of its socket at
 * (x, y), where the two wires come in.
 */
export function headlight(svg, x, y, { s = 1 } = {}) {
  if (!svg.headlightDefs) {
    svg.headlightDefs = true;
    svg.add(
      '<defs><linearGradient id="lamp_body" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e9096"/><stop offset="0.45" stop-color="#eeeff2"/><stop offset="1" stop-color="#55575c"/></linearGradient><radialGradient id="lamp_face" cx="0.45" cy="0.45" r="0.6"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#fbf08a"/><stop offset="1" stop-color="#f1d625"/></radialGradient><clipPath id="lamp_clip"><ellipse cx="215" cy="0" rx="82" ry="155"/></clipPath></defs>'
    );
  }
  const inner = svg.capture(() => {
    svg.rect(-6, -26, 46, 52, { fill: 'url(#lamp_body)', stroke: '#55575c', width: 1.5, rx: 10 });
    svg.path('M 36 -24 Q 90 -110 210 -156 L 210 156 Q 90 110 36 24 Z', {
      color: '#55575c',
      width: 1.5,
      fill: 'url(#lamp_body)',
    });
    svg.ellipse(215, 0, 82, 155, { fill: 'url(#lamp_face)', stroke: '#3f4145', width: 3 });
    const grid = [];
    for (let k = -4; k <= 4; k += 1) grid.push(`M ${215 + k * 19} -160 L ${215 + k * 19} 160`);
    for (let k = -7; k <= 7; k += 1) grid.push(`M 120 ${k * 21} L 310 ${k * 21}`);
    svg.add(
      `<path d="${grid.join(' ')}" stroke="#c9ccd8" stroke-width="2" fill="none" clip-path="url(#lamp_clip)"/>`
    );
  });
  svg.add(`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`);
}

/**
 * Inductor: n half-loops between P and Q, bulging to the side opposite the
 * segment's left-hand normal (above a left-to-right wire) unless `flip`.
 */
export function inductor(
  svg,
  P,
  Q,
  { size = 66, n = 3, color = WIRE, width = 2.5, flip = false } = {}
) {
  const { A, ux, uy } = leads(svg, P, Q, size);
  const r = size / (2 * n);
  let d = `M ${A[0]} ${A[1]}`;
  for (let k = 1; k <= n; k += 1)
    d += ` A ${r} ${r} 0 0 ${flip ? 0 : 1} ${A[0] + ux * 2 * r * k} ${A[1] + uy * 2 * r * k}`;
  svg.path(d, { color, width });
}
