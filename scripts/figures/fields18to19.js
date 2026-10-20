/**
 * Field-line and equipotential sketches for the drawing problems of sections
 * 18.7 and 19.4.
 *
 * Nothing here is drawn freehand. Point charges use the exact Coulomb potential
 * and field (in the plane through the charges). Conductors are solved
 * numerically: a finite-difference Laplace solver holds each conductor at a
 * fixed potential, so the equipotentials, the field lines (traced along −∇V),
 * and the surface-charge marks (spaced by the normal field E·n) all come from
 * the same solution. The conductor solutions are two-dimensional (long objects
 * seen end-on), which is enough for a qualitative sketch.
 *
 * Names follow concept_CC_SS_pNN for the NNth problem of section CC.SS.
 */
import { COLORS, Svg } from './svg.js';

const FIELD = COLORS.red;
const EQUIP = COLORS.blue;
const RISE = COLORS.green;
const METAL = '#b0bec5';
const ROD = '#9ad0e6';

/** Panel caption in the top-left corner of a panel that starts at x0. */
function caption(svg, x0, text, { y = 24 } = {}) {
  svg.text(x0 + 12, y, text, { size: 15, math: false, weight: 'bold', anchor: 'start' });
}

function divider(svg, x, height) {
  svg.line(x, 10, x, height - 10, { color: '#cccccc', width: 1 });
}

/** Legend entries: field line (red arrow) and/or equipotential (blue). */
function legend(svg, x, y, { field = true, equip = true } = {}) {
  let yy = y;
  if (field) {
    svg.arrow(x, yy, x + 34, yy, { color: FIELD, width: 1.6, head: 8 });
    svg.text(x + 42, yy, 'field line', { size: 13, math: false, anchor: 'start' });
    yy += 20;
  }
  if (equip) {
    svg.line(x, yy, x + 34, yy, { color: EQUIP, width: 1.6 });
    svg.text(x + 42, yy, 'equipotential', { size: 13, math: false, anchor: 'start' });
  }
}

/** Green arrow labelled "V increases". */
function rising(
  svg,
  x1,
  y1,
  x2,
  y2,
  { label = 'V increases', anchor = 'start', dx = 8, dy = 0 } = {}
) {
  svg.arrow(x1, y1, x2, y2, { color: RISE, width: 2.5, head: 11 });
  svg.text(x2 + dx, y2 + dy, label, { size: 13, color: RISE, anchor });
}

function charge(svg, x, y, label, sign, { r = 12 } = {}) {
  svg.circle(x, y, r, {
    fill: sign > 0 ? COLORS.red : COLORS.blue,
    stroke: COLORS.black,
    width: 1,
  });
  svg.text(x, y, sign > 0 ? '+' : '−', {
    size: 16,
    math: false,
    weight: 'bold',
    color: '#ffffff',
    halo: false,
  });
  if (label) svg.text(x, y + r + 14, label, { size: 15 });
}

// ---------------------------------------------------------------------------
// Point charges: { x, y, q } in pixels; V = Σ q/r in arbitrary units.

function pointPotential(sources, { core = 6 } = {}) {
  return (x, y) => {
    let v = 0;
    for (const s of sources) {
      const r = Math.hypot(x - s.x, y - s.y);
      if (r < core) return NaN;
      v += s.q / r;
    }
    return v;
  };
}

function pointField(sources) {
  return (x, y) => {
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
  };
}

// ---------------------------------------------------------------------------
// Contours by marching squares. Edge crossings are keyed by grid edge, so the
// pieces from neighbouring cells join exactly into polylines.

function sampleGrid(fn, box, step) {
  const nx = Math.round(box.w / step) + 1;
  const ny = Math.round(box.h / step) + 1;
  const v = new Float64Array(nx * ny);
  for (let j = 0; j < ny; j += 1) {
    for (let i = 0; i < nx; i += 1) v[j * nx + i] = fn(box.x + i * step, box.y + j * step);
  }
  return { v, nx, ny, x0: box.x, y0: box.y, step };
}

function contourLines({ v, nx, ny, x0, y0, step }, level) {
  const pos = new Map();
  const adj = new Map();
  const at = (i, j) => v[j * nx + i];
  const edge = (i1, j1, i2, j2) => {
    const id = `${i1},${j1},${i2},${j2}`;
    if (!pos.has(id)) {
      const a = at(i1, j1) - level;
      const b = at(i2, j2) - level;
      const t = a / (a - b);
      pos.set(id, [x0 + (i1 + (i2 - i1) * t) * step, y0 + (j1 + (j2 - j1) * t) * step]);
      adj.set(id, []);
    }
    return id;
  };
  const link = (p, q) => {
    adj.get(p).push(q);
    adj.get(q).push(p);
  };
  for (let j = 0; j < ny - 1; j += 1) {
    for (let i = 0; i < nx - 1; i += 1) {
      const a = at(i, j);
      const b = at(i + 1, j);
      const c = at(i + 1, j + 1);
      const d = at(i, j + 1);
      if ([a, b, c, d].some(Number.isNaN)) continue;
      const [sa, sb, sc, sd] = [a, b, c, d].map(x => x >= level);
      const T = sa !== sb ? edge(i, j, i + 1, j) : null;
      const R = sb !== sc ? edge(i + 1, j, i + 1, j + 1) : null;
      const B = sd !== sc ? edge(i, j + 1, i + 1, j + 1) : null;
      const L = sa !== sd ? edge(i, j, i, j + 1) : null;
      const hits = [T, R, B, L].filter(Boolean);
      if (hits.length === 2) link(hits[0], hits[1]);
      else if (hits.length === 4) {
        const centre = (a + b + c + d) / 4 >= level;
        if (centre === sa) {
          link(T, R);
          link(B, L);
        } else {
          link(L, T);
          link(R, B);
        }
      }
    }
  }
  const used = new Set();
  const lines = [];
  const walk = start => {
    const pts = [pos.get(start)];
    used.add(start);
    let cur = start;
    for (;;) {
      const next = adj.get(cur).find(n => !used.has(n));
      if (!next) {
        if (adj.get(cur).includes(start) && pts.length > 2) pts.push(pos.get(start));
        break;
      }
      used.add(next);
      pts.push(pos.get(next));
      cur = next;
    }
    return pts;
  };
  for (const [id, n] of adj) if (n.length === 1 && !used.has(id)) lines.push(walk(id));
  for (const id of adj.keys()) if (!used.has(id)) lines.push(walk(id));
  return lines.filter(l => l.length > 3);
}

/** Draw the contours of `fn` at the given levels inside `box`. */
function equipotentials(
  svg,
  fn,
  box,
  levels,
  { step = 2, color = EQUIP, width = 1.6, emphasis = [] } = {}
) {
  const grid = sampleGrid(fn, box, step);
  for (const level of levels) {
    const bold = emphasis.includes(level);
    for (const pts of contourLines(grid, level)) {
      svg.polyline(pts, { color, width: bold ? 2.6 : width });
    }
  }
}

// ---------------------------------------------------------------------------
// Field lines: midpoint steps along (sign = +1) or against (−1) the field.

function trace(field, x, y, sign, { box, stop = () => false, step = 2, max = 1500 }) {
  const pts = [[x, y]];
  for (let k = 0; k < max; k += 1) {
    const [ax, ay] = field(x, y);
    const la = Math.hypot(ax, ay);
    if (!la) break;
    const mx = x + (sign * step * ax) / la / 2;
    const my = y + (sign * step * ay) / la / 2;
    const [bx, by] = field(mx, my);
    const lb = Math.hypot(bx, by);
    if (!lb) break;
    x += (sign * step * bx) / lb;
    y += (sign * step * by) / lb;
    pts.push([x, y]);
    if (x < box.x || x > box.x + box.w || y < box.y || y > box.y + box.h) break;
    if (k > 3 && stop(x, y)) break;
  }
  return pts;
}

/** Draw a traced line with an arrowhead pointing along the field. */
function fieldLine(svg, pts, { reverse = false, at = 0.5, color = FIELD, width = 1.5 } = {}) {
  if (pts.length < 8) return;
  svg.polyline(pts, { color, width });
  const k = Math.max(3, Math.min(pts.length - 4, Math.floor(pts.length * at)));
  let P = pts[k - 3];
  let Q = pts[k + 3];
  if (reverse) [P, Q] = [Q, P];
  svg.arrow(...P, ...Q, { color, width, head: 9 });
}

// ---------------------------------------------------------------------------
// Conductor shapes as closed polygons (clockwise on screen).

function capsule(cx, cy, length, height, n = 40) {
  const r = height / 2;
  const a = length / 2 - r;
  const pts = [];
  for (let k = 0; k <= n; k += 1) {
    const t = -Math.PI / 2 + (Math.PI * k) / n;
    pts.push([cx + a + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  for (let k = 0; k <= n; k += 1) {
    const t = Math.PI / 2 + (Math.PI * k) / n;
    pts.push([cx - a + r * Math.cos(t), cy + r * Math.sin(t)]);
  }
  return pts;
}

/** Lens with pointed ends: two circular arcs through (cx ± length/2, cy). */
function spindle(cx, cy, length, height, n = 60) {
  const h = length / 2;
  const s = height / 2;
  const R = (h * h + s * s) / (2 * s);
  const pts = [];
  for (const side of [1, -1]) {
    for (let k = 0; k <= n; k += 1) {
      const x = side * (-h + (2 * h * k) / n);
      const y = side * -(Math.sqrt(R * R - x * x) - (R - s));
      pts.push([cx + x, cy + y]);
    }
  }
  return pts;
}

/** Thin plate as a rotated rectangle from P to Q with the given thickness. */
function plate(P, Q, thick) {
  const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const nx = (-(Q[1] - P[1]) / len) * (thick / 2);
  const ny = ((Q[0] - P[0]) / len) * (thick / 2);
  return [
    [P[0] - nx, P[1] - ny],
    [Q[0] - nx, Q[1] - ny],
    [Q[0] + nx, Q[1] + ny],
    [P[0] + nx, P[1] + ny],
  ];
}

function inside(poly, x, y) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

function signedArea(poly) {
  let a = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i, i += 1) {
    a += poly[j][0] * poly[i][1] - poly[i][0] * poly[j][1];
  }
  return a / 2;
}

// ---------------------------------------------------------------------------
// Finite-difference Laplace solver (SOR). `conductors` is a list of
// { poly, V }; `outer(x, y)` gives the potential on the domain boundary, and
// cells farther than `radius` from the centre (if given) are held at it too.

function solveLaplace({ box, step, conductors, outer, radius, iters = 4000, omega = 1.94 }) {
  const nx = Math.round(box.w / step) + 1;
  const ny = Math.round(box.h / step) + 1;
  const v = new Float64Array(nx * ny);
  const fixed = new Uint8Array(nx * ny);
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  for (let j = 0; j < ny; j += 1) {
    for (let i = 0; i < nx; i += 1) {
      const x = box.x + i * step;
      const y = box.y + j * step;
      const k = j * nx + i;
      v[k] = outer(x, y);
      const c = conductors.find(cd => inside(cd.poly, x, y));
      if (c) {
        v[k] = c.V;
        fixed[k] = 2;
      } else if (i === 0 || j === 0 || i === nx - 1 || j === ny - 1) fixed[k] = 1;
      else if (radius && Math.hypot(x - cx, y - cy) > radius) fixed[k] = 1;
    }
  }
  for (let it = 0; it < iters; it += 1) {
    let change = 0;
    for (let j = 1; j < ny - 1; j += 1) {
      for (let i = 1; i < nx - 1; i += 1) {
        const k = j * nx + i;
        if (fixed[k]) continue;
        const target = (v[k - 1] + v[k + 1] + v[k - nx] + v[k + nx]) / 4;
        const d = omega * (target - v[k]);
        v[k] += d;
        change = Math.max(change, Math.abs(d));
      }
    }
    if (change < 1e-7) break;
  }
  const V = (x, y) => {
    const fi = (x - box.x) / step;
    const fj = (y - box.y) / step;
    const i = Math.min(nx - 2, Math.max(0, Math.floor(fi)));
    const j = Math.min(ny - 2, Math.max(0, Math.floor(fj)));
    const s = fi - i;
    const t = fj - j;
    const k = j * nx + i;
    return (
      v[k] * (1 - s) * (1 - t) +
      v[k + 1] * s * (1 - t) +
      v[k + nx] * (1 - s) * t +
      v[k + nx + 1] * s * t
    );
  };
  const E = (x, y) => [
    -(V(x + step, y) - V(x - step, y)) / (2 * step),
    -(V(x, y + step) - V(x, y - step)) / (2 * step),
  ];
  const inConductor = (x, y) => conductors.some(cd => inside(cd.poly, x, y));
  // Contour sampling hides the conductors' interiors.
  const display = (x, y) => (inConductor(x, y) ? NaN : V(x, y));
  return { V, E, inConductor, display };
}

/**
 * Surface-charge marks: walk the outline and drop a "+" or "−" each time the
 * accumulated |E·n| ds reaches `quantum`, so mark spacing shows the density.
 */
function chargeMarks(svg, poly, E, { count, offset = 4, inset = 9, size = 15 }) {
  const orient = signedArea(poly) > 0 ? 1 : -1;
  const sigmaAt = (x, y, nx, ny) => {
    const [ex, ey] = E(x + nx * offset, y + ny * offset);
    return ex * nx + ey * ny;
  };
  let total = 0;
  walkOutline(poly, orient, (x, y, nx, ny, ds) => {
    total += Math.abs(sigmaAt(x, y, nx, ny)) * ds;
  });
  const quantum = total / count;
  let acc = quantum / 2;
  walkOutline(poly, orient, (x, y, nx, ny, ds) => {
    const sigma = sigmaAt(x, y, nx, ny);
    acc += Math.abs(sigma) * ds;
    if (acc >= quantum) {
      acc -= quantum;
      svg.text(x - nx * inset, y - ny * inset, sigma > 0 ? '+' : '−', {
        size,
        math: false,
        weight: 'bold',
        color: sigma > 0 ? COLORS.red : COLORS.blue,
        halo: false,
      });
    }
  });
}

/** Call fn(x, y, nx, ny, ds) at small steps around the outline (outward normal). */
function walkOutline(poly, orient, fn) {
  for (let i = 0; i < poly.length; i += 1) {
    const P = poly[i];
    const Q = poly[(i + 1) % poly.length];
    const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
    if (len < 1e-9) continue;
    // Outward normal for a polygon whose signed area has sign `orient`.
    const nx = (orient * (Q[1] - P[1])) / len;
    const ny = (orient * -(Q[0] - P[0])) / len;
    const n = Math.max(1, Math.ceil(len / 1.5));
    for (let k = 0; k < n; k += 1) {
      const t = (k + 0.5) / n;
      fn(P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t, nx, ny, len / n);
    }
  }
}

function drawConductor(svg, poly, { fill = METAL } = {}) {
  svg.polygon(poly, { fill, stroke: COLORS.black, width: 1.5 });
}

// ---------------------------------------------------------------------------
// Conductor in a uniform field (18.7 P1 and P2).

function conductorInField(poly, { W, H, title, desc, note }) {
  const svg = new Svg({ width: W, height: H, title, desc });
  const view = { x: 0, y: 40, w: W, h: H - 40 };
  const pad = 260;
  const box = { x: -pad, y: view.y - pad, w: W + 2 * pad, h: view.h + 2 * pad };
  const cx = W / 2;
  const E0 = 1;
  const sol = solveLaplace({
    box,
    step: 3,
    conductors: [{ poly, V: 0 }],
    outer: x => -E0 * (x - cx),
  });
  // Field lines start evenly spaced on the left edge (uniform field there).
  const stop = (x, y) => sol.inConductor(x, y);
  const lines = [];
  for (let y = view.y + 14; y < view.y + view.h; y += 22) {
    lines.push(trace(sol.E, 1, y, 1, { box: view, stop, step: 2 }));
  }
  for (const pts of lines) {
    const hit = sol.inConductor(...pts[pts.length - 1]);
    fieldLine(svg, pts, { at: 0.25 });
    // The arrangement is antisymmetric about x = cx, so a line that ends on the
    // conductor's left end is mirrored by one leaving its right end.
    if (hit) {
      const mirror = pts.map(([x, y]) => [2 * cx - x, y]).reverse();
      fieldLine(svg, mirror, { at: 0.75 });
    }
  }
  drawConductor(svg, poly);
  chargeMarks(svg, poly, sol.E, { count: 30 });
  caption(svg, 0, title);
  svg.arrow(W - 150, 24, W - 70, 24, { color: FIELD, width: 2.5, head: 11 });
  svg.text(W - 60, 24, '**E**_0', { size: 17, anchor: 'start' });
  svg.text(W / 2, H - 14, note, { size: 13, math: false });
  return svg.render();
}

// ---------------------------------------------------------------------------
// Two non-parallel charged plates (18.7 P3 and 19.4 P7).

function platesSolution({ top, bottom, W, H }) {
  const box = { x: -300, y: -300, w: W + 600, h: H + 600 };
  return solveLaplace({
    box,
    step: 3,
    conductors: [
      { poly: top, V: 1 },
      { poly: bottom, V: -1 },
    ],
    outer: () => 0,
    radius: Math.min(box.w, box.h) / 2 - 6,
  });
}

// ---------------------------------------------------------------------------
// Charged insulating rod (18.7 P4 and 19.4 P8): fixed point charges along a
// diagonal rod, crowded toward its upper end.

function rodCharges(x1, y1, x2, y2, fractions) {
  return fractions.map(f => ({ x: x1 + (x2 - x1) * f, y: y1 + (y2 - y1) * f, q: 1 }));
}

function drawRod(svg, x1, y1, x2, y2, charges) {
  svg.line(x1, y1, x2, y2, { color: ROD, width: 16, cap: 'round' });
  svg.line(x1, y1, x2, y2, { color: '#5aa9c9', width: 1.5, cap: 'round' });
  for (const c of charges) {
    svg.text(c.x, c.y, '+', {
      size: 17,
      math: false,
      weight: 'bold',
      color: COLORS.black,
      halo: false,
    });
  }
}

function rodFieldLines(svg, charges, box, { perCharge = 5 } = {}) {
  const field = pointField(charges);
  const stop = (x, y) => charges.some(c => Math.hypot(x - c.x, y - c.y) < 3);
  for (const c of charges) {
    for (let k = 0; k < perCharge; k += 1) {
      const a = (2 * Math.PI * (k + 0.25)) / perCharge;
      const pts = trace(field, c.x + 5 * Math.cos(a), c.y + 5 * Math.sin(a), 1, {
        box,
        stop,
        step: 2,
      });
      fieldLine(svg, pts, { at: 0.55, width: 1.3 });
    }
  }
}

// Positions along the rod from its lower-left end (0) to its upper-right end
// (1), read from the question figures.
const ROD_18 = [0.02, 0.4, 0.44, 0.67, 0.82, 0.85, 0.88, 0.9, 0.92, 0.94, 0.96, 0.98];
const ROD_19 = [0.02, 0.38, 0.42, 0.45, 0.6, 0.82, 0.86, 0.88, 0.91, 0.94, 0.96, 0.98];

// ---------------------------------------------------------------------------

export default {
  // 18.7 P1 — rounded oblong conductor in a field parallel to its long axis
  concept_18_07_p01: () =>
    conductorInField(capsule(330, 210, 300, 90), {
      W: 660,
      H: 380,
      title: 'Rounded conductor in a uniform field',
      desc: 'Computed field lines around a neutral, rounded oblong conductor placed in a field that was uniform and pointing to the right. Far away the lines are straight and evenly spaced. Near the conductor they bend so that they meet its surface at right angles: lines crowd into the left end, where negative charge is induced, and crowd out of the right end, where positive charge is induced. Along the long flat sides the lines are sparse and few charges sit there, so the field near the sides is small. There is no field inside the conductor.',
      note: 'Lines crowd at the ends; the field near the long sides is small.',
    }),

  // 18.7 P2 — pointed (lens-shaped) conductor in the same field
  concept_18_07_p02: () =>
    conductorInField(spindle(330, 210, 320, 100), {
      W: 660,
      H: 380,
      title: 'Pointed conductor in a uniform field',
      desc: 'Computed field lines around a neutral, lens-shaped conductor with pointed ends, placed in a field that was uniform and pointing to the right. The lines meet the surface at right angles. They are concentrated very strongly at the two sharp tips, where the induced charge is most dense: negative at the left tip, positive at the right tip. Along the broad curved sides the lines are sparse, so the field there is small. There is no field inside the conductor.',
      note: 'Charge and field concentrate at the sharp tips; the sides see a weak field.',
    }),

  // 18.7 P3 — field between two non-parallel plates
  concept_18_07_p03: () => {
    const W = 640;
    const H = 440;
    const top = plate([150, 205], [470, 95], 22);
    const bottom = plate([150, 285], [480, 305], 22);
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field between two tilted plates',
      desc: 'Computed field lines between two conducting plates that are closest together at the left and spread apart toward the right. The top plate is positive and the bottom plate negative. Field lines leave the top plate at right angles and arrive at the bottom plate at right angles, curving between them. The lines are most crowded, and the field strongest, where the plates are closest. Positive charge sits mainly on the lower face of the top plate and negative charge on the upper face of the bottom plate, with the greatest density at the narrow left end and at the corners; little charge is on the outer faces. Fringe lines bulge outward beyond the open right end and around the edges.',
    });
    const sol = platesSolution({ top, bottom, W, H });
    const view = { x: 10, y: 40, w: W - 20, h: H - 70 };
    const stop = (x, y) => sol.inConductor(x, y);
    // Start lines along the top plate's outline, spaced by the field there, so
    // their density shows the field strength.
    const orient = signedArea(top) > 0 ? 1 : -1;
    const flux = (x, y, nx, ny) => {
      const [ex, ey] = sol.E(x + nx * 3, y + ny * 3);
      return ex * nx + ey * ny;
    };
    let total = 0;
    walkOutline(top, orient, (x, y, nx, ny, ds) => {
      total += flux(x, y, nx, ny) * ds;
    });
    const quantum = total / 34;
    let acc = quantum / 2;
    walkOutline(top, orient, (x, y, nx, ny, ds) => {
      acc += flux(x, y, nx, ny) * ds;
      if (acc >= quantum) {
        acc -= quantum;
        const pts = trace(sol.E, x + nx * 3, y + ny * 3, 1, { box: view, stop, step: 2 });
        fieldLine(svg, pts, { at: 0.5 });
      }
    });
    drawConductor(svg, top);
    drawConductor(svg, bottom);
    chargeMarks(svg, top, sol.E, { count: 44, inset: 5, size: 13 });
    chargeMarks(svg, bottom, sol.E, { count: 44, inset: 5, size: 13 });
    caption(svg, 0, 'Charged plates: top +, bottom −');
    svg.text(W / 2, H - 16, 'Strongest field, and most charge, where the plates are closest.', {
      size: 13,
      math: false,
    });
    return svg.render();
  },

  // 18.7 P4 — field lines of the nonuniformly charged insulating rod
  concept_18_07_p04: () => {
    const W = 520;
    const H = 520;
    const [x1, y1, x2, y2] = [110, 440, 400, 110];
    const charges = rodCharges(x1, y1, x2, y2, ROD_18);
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field lines of a charged insulating rod',
      desc: 'Computed field lines of a diagonal insulating rod whose positive charges are crowded near its upper-right end, with a few in the middle and one at the lower-left end. Lines start on the charges and run outward. They are dense around the heavily charged upper end and sparse elsewhere. Lines leaving the middle and lower parts of the rod do not leave at right angles: they are pushed away from the crowded upper end and tilt downward along the rod. Far from the rod the lines spread out radially, as from a single positive charge.',
    });
    drawRod(svg, x1, y1, x2, y2, charges);
    rodFieldLines(svg, charges, { x: 0, y: 36, w: W, h: H - 36 });
    drawRod(svg, x1, y1, x2, y2, charges);
    caption(svg, 0, 'Charged insulating rod');
    svg.text(W - 12, H - 16, 'Lines need not leave the rod at right angles.', {
      size: 13,
      math: false,
      anchor: 'end',
    });
    return svg.render();
  },

  // 19.4 P1 — equipotentials of +q and of −3q, drawn at the same ΔV
  concept_19_04_p01: () => {
    const W = 760;
    const H = 400;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of +q and of −3q',
      desc: 'Two panels drawn with the same potential step between neighbouring equipotentials. (a) A charge +q: the equipotentials are concentric circles at +1, +2, +3, and +4 units, crowding together toward the charge; the potential increases inward. (b) A charge −3q: the circles at every whole-number potential from −3 to −12 units are also concentric; with the same step, the circles are three times as far out for a given potential, so three times as many fit in a given region because the charge is three times larger, and the potential increases outward, away from the charge. Radial field lines point outward from +q and inward toward −3q.',
    });
    divider(svg, W / 2, H);
    const R = 150;
    const panels = [
      { cx: W / 4, q: 1, label: '+q', levels: [1, 2, 3, 4], title: '(a) Charge +q' },
      {
        cx: (3 * W) / 4,
        q: -3,
        label: '−3q',
        levels: [-3, -4, -5, -6, -7, -8, -9, -10, -11, -12],
        title: '(b) Charge −3q',
      },
    ];
    const cy = 220;
    for (const p of panels) {
      caption(svg, p.cx - W / 4, p.title);
      for (let k = 0; k < 8; k += 1) {
        const a = (2 * Math.PI * (k + 0.5)) / 8;
        const pts = [
          [p.cx + 16 * Math.cos(a), cy + 16 * Math.sin(a)],
          [p.cx + 172 * Math.cos(a), cy + 172 * Math.sin(a)],
        ];
        svg.line(...pts[0], ...pts[1], { color: FIELD, width: 1, dash: '4 4' });
        const [P, Q] = p.q > 0 ? pts : [pts[1], pts[0]];
        const m = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2];
        const u = [(Q[0] - P[0]) / 156, (Q[1] - P[1]) / 156];
        svg.arrow(m[0] - u[0] * 8, m[1] - u[1] * 8, m[0] + u[0] * 8, m[1] + u[1] * 8, {
          color: FIELD,
          width: 1,
          head: 8,
        });
      }
      for (const L of p.levels) {
        const r = (R * Math.abs(p.q)) / Math.abs(L);
        if (r > 170) continue;
        svg.circle(p.cx, cy, r, { fill: 'none', stroke: EQUIP, width: 1.6 });
        // Label every circle in (a), but only some of the crowded circles in (b).
        if (p.q < 0 && ![-3, -4, -6, -12].includes(L)) continue;
        svg.text(p.cx + r * 0.71 + 4, cy - r * 0.71 - 6, `${L > 0 ? '+' : '−'}${Math.abs(L)}`, {
          size: 12,
          math: false,
          color: EQUIP,
          anchor: 'start',
        });
      }
      charge(svg, p.cx, cy, '', p.q);
      svg.text(p.cx + 22, cy + 18, p.label, { size: 15, anchor: 'start' });
      if (p.q > 0) rising(svg, p.cx - 150, cy + 120, p.cx - 60, cy + 40, { dx: -96, dy: 26 });
      else rising(svg, p.cx - 60, cy + 40, p.cx - 150, cy + 120, { dx: -10, dy: 18 });
    }
    svg.text(W / 2, H - 14, 'Same potential step ΔV between neighbouring circles in both panels', {
      size: 13,
      math: false,
    });
    return svg.render();
  },

  // 19.4 P2 — two equal positive charges: saddle point and figure eight
  concept_19_04_p02: () => {
    const W = 640;
    const H = 440;
    const a = 80;
    const cx = W / 2;
    const cy = 235;
    const src = [
      { x: cx - a, y: cy, q: 1 },
      { x: cx + a, y: cy, q: 1 },
    ];
    const V0 = 2 / a;
    const V = pointPotential(src, { core: 13 });
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of two equal positive charges',
      desc: 'Computed equipotentials of two equal positive charges. Close to each charge they are small circles. The equipotential through the midpoint, drawn heavier, is a figure eight whose two lobes enclose the two charges and cross at the midpoint, where the field is zero (a saddle point of the potential). Lower potentials give single closed curves around both charges, pinched at the waist at first and becoming nearly circular farther out. The perpendicular bisector is not an equipotential: the potential is highest at the midpoint along it. Faint field lines run outward from both charges, crossing every equipotential at right angles. The potential increases toward either charge.',
    });
    const field = pointField(src);
    const view = { x: 0, y: 40, w: W, h: H - 70 };
    const stop = (x, y) => src.some(s => Math.hypot(x - s.x, y - s.y) < 4);
    for (const s of src) {
      for (let k = 0; k < 12; k += 1) {
        const ang = (2 * Math.PI * (k + 0.5)) / 12;
        const pts = trace(field, s.x + 14 * Math.cos(ang), s.y + 14 * Math.sin(ang), 1, {
          box: view,
          stop,
        });
        fieldLine(svg, pts, { at: 0.75, color: '#e57373', width: 1 });
      }
    }
    // The saddle contour V = V0 is drawn as the two contours just above and just
    // below it, which together trace the figure eight crossing at the midpoint
    // (a grid contour exactly at a saddle splits into two separated loops).
    const saddle = [V0 * 0.998, V0 * 1.002];
    const levels = [0.5, 0.62, 0.78, 0.9, 1.15, 1.4, 1.9].map(f => f * V0);
    equipotentials(svg, V, view, [...levels, ...saddle], { emphasis: saddle });
    src.forEach(s => charge(svg, s.x, s.y, '+q', 1));
    svg.circle(cx, cy, 3.5, { fill: COLORS.black });
    svg.leader(cx + 70, cy - 120, cx + 3, cy - 4);
    svg.text(cx + 74, cy - 126, 'saddle point, E = 0', { size: 13, math: false, anchor: 'start' });
    rising(svg, cx - a - 190, cy + 130, cx - a - 40, cy + 30, { dx: -150, dy: 120 });
    caption(svg, 0, 'Two equal positive charges');
    legend(svg, W - 170, 22);
    return svg.render();
  },

  // 19.4 P3 — q1 = −4q and q2 = +q near each other
  concept_19_04_p03: () => {
    const W = 680;
    const H = 460;
    const d = 200;
    const x1 = 230;
    const cy = 245;
    const src = [
      { x: x1, y: cy, q: -4 },
      { x: x1 + d, y: cy, q: 1 },
    ];
    const unit = 1 / d;
    const V = pointPotential(src, { core: 13 });
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of −4q and +q',
      desc: 'Computed equipotentials of a charge q1 = −4q on the left and q2 = +q a distance d to its right. The zero-potential equipotential, drawn heavier, is a circle around the smaller positive charge: it crosses the line between the charges one fifth of the way from q2 to q1, and crosses the axis again d/3 beyond q2; its radius is 4d/15. Inside it, positive equipotentials are small loops around q2. Outside it, the potential is negative: small loops surround q1 closely, and farther out closed curves enclose both charges and the zero circle. No equipotential connects the two charges. Faint field lines run from q2 to q1 and in toward q1 from far away. The potential increases toward q2 and away from q1.',
    });
    const field = pointField(src);
    const view = { x: 0, y: 40, w: W, h: H - 70 };
    const stop = (x, y) => src.some(s => Math.hypot(x - s.x, y - s.y) < 4);
    for (const s of src) {
      const n = s.q > 0 ? 8 : 18;
      for (let k = 0; k < n; k += 1) {
        const ang = (2 * Math.PI * (k + 0.5)) / n;
        const pts = trace(
          field,
          s.x + 14 * Math.cos(ang),
          s.y + 14 * Math.sin(ang),
          s.q > 0 ? 1 : -1,
          {
            box: view,
            stop,
          }
        );
        if (s.q < 0 && pts.some(([x, y]) => Math.hypot(x - src[1].x, y - src[1].y) < 20)) continue;
        fieldLine(svg, pts, { at: 0.6, color: '#e57373', width: 1, reverse: s.q < 0 });
      }
    }
    const levels = [-30, -16, -10, -6, -4, -2.5, 0, 2, 5, 10].map(f => f * unit);
    equipotentials(svg, V, view, levels, { emphasis: [0] });
    charge(svg, src[0].x, cy, 'q_1 = −4q', -1);
    charge(svg, src[1].x, cy, 'q_2 = +q', 1);
    svg.text(src[1].x + 82, cy - 70, 'V = 0', { size: 14, color: EQUIP, anchor: 'start' });
    rising(svg, x1 - 60, cy - 80, x1 - 150, cy - 150, { dx: -30, dy: -16 });
    rising(svg, src[1].x + 30, cy - 34, src[1].x + 12, cy - 13, { dx: 4, dy: -32 });
    caption(svg, 0, 'Charges −4q and +q');
    legend(svg, W - 170, 22);
    return svg.render();
  },

  // 19.4 P4 — the same charges seen from far away
  concept_19_04_p04: () => {
    const W = 640;
    const H = 460;
    const cx = W / 2;
    const cy = 245;
    const d = 12;
    const src = [
      { x: cx - d / 2, y: cy, q: -4 },
      { x: cx + d / 2, y: cy, q: 1 },
    ];
    const V = pointPotential(src, { core: 3 });
    const R1 = 200;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Far-field equipotentials of −4q and +q',
      desc: 'Seen from far away, the charges −4q and +q, drawn as a tiny pair at the centre, act like a single charge −3q. Computed equipotentials at equal potential steps, −1, −2, −3, and −4 units, are circles centred on the pair at radii in the ratio 1 : 1/2 : 1/3 : 1/4, so the gaps between neighbouring circles grow with distance (roughly as r squared). The potential is negative and increases outward, toward zero at infinity.',
    });
    const unit = 3 / R1;
    equipotentials(
      svg,
      V,
      { x: 0, y: 40, w: W, h: H - 70 },
      [-1, -2, -3, -4].map(f => f * unit)
    );
    for (const n of [1, 2, 3, 4]) {
      svg.text(cx + (R1 / n) * 0.71 + 4, cy - (R1 / n) * 0.71 - 6, `−${n}`, {
        size: 12,
        math: false,
        color: EQUIP,
        anchor: 'start',
      });
    }
    svg.circle(src[0].x, cy, 4, { fill: COLORS.blue });
    svg.circle(src[1].x, cy, 2.5, { fill: COLORS.red });
    svg.leader(cx - 90, cy + 70, cx - 6, cy + 4);
    svg.text(cx - 94, cy + 78, 'q_1 and q_2, net −3q', { size: 13, anchor: 'end' });
    rising(svg, cx + 60, cy + 40, cx + 200, cy + 150, { dx: -200, dy: 22 });
    caption(svg, 0, 'Far from −4q and +q');
    svg.text(W / 2, H - 14, 'Equal steps ΔV: the circles get farther apart with distance.', {
      size: 13,
      math: false,
    });
    return svg.render();
  },

  // 19.4 P5 — opposite charges, negative three times as large
  concept_19_04_p05: () => {
    const W = 680;
    const H = 460;
    const d = 200;
    const x1 = 230;
    const cy = 245;
    const src = [
      { x: x1, y: cy, q: -3 },
      { x: x1 + d, y: cy, q: 1 },
    ];
    const unit = 1 / d;
    const V = pointPotential(src, { core: 13 });
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of −3q and +q',
      desc: 'Computed equipotentials of a charge −3q on the left and +q a distance d to its right. The zero equipotential, drawn heavier, is a circle around the positive charge: it crosses the line between the charges a quarter of the way from +q to −3q, and crosses the axis again d/2 beyond +q; its radius is 3d/8. Inside it, positive equipotentials are loops around +q. Outside it, the potential is negative: loops surround −3q closely, and farther out closed curves enclose both charges, becoming circles like those of a single charge −2q. Faint field lines run from +q to −3q and in toward −3q from far away. The potential increases toward the positive charge and away from the negative charge.',
    });
    const field = pointField(src);
    const view = { x: 0, y: 40, w: W, h: H - 70 };
    const stop = (x, y) => src.some(s => Math.hypot(x - s.x, y - s.y) < 4);
    for (const s of src) {
      const n = s.q > 0 ? 8 : 16;
      for (let k = 0; k < n; k += 1) {
        const ang = (2 * Math.PI * (k + 0.5)) / n;
        const pts = trace(
          field,
          s.x + 14 * Math.cos(ang),
          s.y + 14 * Math.sin(ang),
          s.q > 0 ? 1 : -1,
          {
            box: view,
            stop,
          }
        );
        if (s.q < 0 && pts.some(([x, y]) => Math.hypot(x - src[1].x, y - src[1].y) < 20)) continue;
        fieldLine(svg, pts, { at: 0.6, color: '#e57373', width: 1, reverse: s.q < 0 });
      }
    }
    const levels = [-24, -12, -7, -4.5, -3, -1.8, 0, 2, 5, 10].map(f => f * unit);
    equipotentials(svg, V, view, levels, { emphasis: [0] });
    charge(svg, src[0].x, cy, '−3q', -1);
    charge(svg, src[1].x, cy, '+q', 1);
    svg.text(src[1].x + 98, cy - 78, 'V = 0', { size: 14, color: EQUIP, anchor: 'start' });
    rising(svg, x1 - 60, cy - 80, x1 - 150, cy - 150, { dx: -30, dy: -16 });
    rising(svg, src[1].x + 34, cy - 40, src[1].x + 12, cy - 13, { dx: 6, dy: -38 });
    caption(svg, 0, 'Charges −3q and +q');
    legend(svg, W - 170, 22);
    return svg.render();
  },

  // 19.4 P6 — negatively charged oblong conductor
  concept_19_04_p06: () => {
    const W = 680;
    const H = 460;
    const cx = W / 2;
    const cy = 245;
    const body = capsule(cx, cy, 240, 80);
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of a negatively charged conductor',
      desc: 'Computed equipotentials around a negatively charged, rounded oblong conductor. The conductor itself is one equipotential. The nearest equipotentials follow its oblong shape and are most crowded off the rounded ends, where the negative surface charge, shown by minus signs, is most dense and the field is strongest. Farther out they become rounder, and far away they are circles centred on the object, like those of a point charge. Faint field lines point inward, meeting the conductor at right angles. The potential increases outward, away from the conductor.',
    });
    const box = { x: cx - 600, y: cy - 600, w: 1200, h: 1200 };
    const sol = solveLaplace({
      box,
      step: 3,
      conductors: [{ poly: body, V: -1 }],
      outer: () => 0,
      radius: 594,
    });
    const view = { x: 0, y: 40, w: W, h: H - 70 };
    const stop = (x, y) => sol.inConductor(x, y);
    for (let k = 0; k < 28; k += 1) {
      const ang = (2 * Math.PI * (k + 0.5)) / 28;
      const pts = trace(sol.E, cx + 330 * Math.cos(ang), cy + 330 * Math.sin(ang), 1, {
        box: { x: -40, y: -40, w: W + 80, h: H + 80 },
        stop,
      });
      const shown = pts.filter(
        ([x, y]) => x > view.x && x < view.x + view.w && y > view.y && y < view.y + view.h
      );
      fieldLine(svg, shown, { at: 0.4, color: '#e57373', width: 1 });
    }
    equipotentials(svg, sol.display, view, [-0.9, -0.8, -0.7, -0.6, -0.5, -0.4], { step: 2 });
    drawConductor(svg, body, { fill: '#e0b14a' });
    chargeMarks(svg, body, sol.E, { count: 22, inset: 9 });
    rising(svg, cx + 150, cy - 60, cx + 270, cy - 150, { dx: -50, dy: -14 });
    caption(svg, 0, 'Negatively charged conductor');
    legend(svg, W - 170, 22);
    svg.text(
      W / 2,
      H - 14,
      'Near: the shape of the conductor. Far: circles, like a point charge.',
      {
        size: 13,
        math: false,
      }
    );
    return svg.render();
  },

  // 19.4 P7 — equipotentials around two tilted plates
  concept_19_04_p07: () => {
    const W = 640;
    const H = 460;
    const top = plate([150, 250], [470, 115], 22);
    const bottom = plate([150, 330], [480, 352], 22);
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials around two tilted plates',
      desc: 'Computed equipotentials around two conducting plates that are closest at the left and spread apart toward the right; the top plate is positive and the bottom plate negative. Between the plates the equipotentials fan out from the narrow left end like the ribs of a partly open fan: they are crowded together where the plates are closest, so the field is strongest there, and spread apart toward the open right end. Around the outer edges they curve around the plates. Positive charge, shown by plus signs, sits mainly on the lower face of the top plate, and negative charge on the upper face of the bottom plate, most densely at the narrow end and at the corners. The potential increases from the bottom plate toward the top plate.',
    });
    const sol = platesSolution({ top, bottom, W, H });
    const view = { x: 0, y: 40, w: W, h: H - 70 };
    const levels = [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8];
    equipotentials(svg, sol.display, view, levels, { step: 2 });
    drawConductor(svg, top);
    drawConductor(svg, bottom);
    chargeMarks(svg, top, sol.E, { count: 44, inset: 5, size: 13 });
    chargeMarks(svg, bottom, sol.E, { count: 44, inset: 5, size: 13 });
    rising(svg, 560, 330, 560, 230, { dx: 8, dy: -10 });
    caption(svg, 0, 'Charged plates: top +, bottom −');
    legend(svg, W - 170, 22, { field: false });
    svg.text(
      W / 2,
      H - 14,
      'Crowded equipotentials where the plates are closest: strongest field.',
      {
        size: 13,
        math: false,
      }
    );
    return svg.render();
  },

  // 19.4 P8 — the rod again: (a) field lines, (b) equipotentials
  concept_19_04_p08: () => {
    const W = 800;
    const H = 440;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Field lines and equipotentials of a charged insulating rod',
      desc: 'Two computed panels for a diagonal insulating rod whose positive charges are crowded near its upper-right end, with a few in the middle and one at the lower-left end. (a) Field lines start on the charges and run outward; they are dense near the heavily charged end, and lines from the middle and lower parts tilt away from that end instead of leaving at right angles. (b) Equipotentials: small, closely spaced loops wrap the heavily charged end; the lower contours cross the rod, because an insulator surface is not an equipotential; farther out the contours become larger, rounder closed curves around the whole rod. The potential increases toward the rod and is highest at the heavily charged end. Equipotentials and field lines cross at right angles.',
    });
    divider(svg, W / 2, H);
    for (const [k, title] of [
      [0, '(a) Field lines'],
      [1, '(b) Equipotentials'],
    ]) {
      const x0 = (k * W) / 2;
      const [x1, y1, x2, y2] = [x0 + 90, 380, x0 + 320, 120];
      const charges = rodCharges(x1, y1, x2, y2, ROD_19);
      const view = { x: x0 + 4, y: 36, w: W / 2 - 8, h: H - 44 };
      drawRod(svg, x1, y1, x2, y2, charges);
      if (k === 0) rodFieldLines(svg, charges, view);
      else {
        const V = pointPotential(charges, { core: 4 });
        equipotentials(svg, V, view, [0.075, 0.095, 0.12, 0.16, 0.22, 0.32, 0.5, 0.8]);
        rising(svg, x0 + 380, 230, x0 + 330, 175, { dx: -60, dy: 70 });
      }
      drawRod(svg, x1, y1, x2, y2, charges);
      caption(svg, x0, title);
    }
    return svg.render();
  },

  // 19.4 P9 — fair-weather field above negatively charged ground
  concept_19_04_p09: () => {
    const W = 600;
    const H = 400;
    const g = 330;
    const s = 80; // px per m
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Fair-weather field above the ground',
      desc: 'The ground carries negative charge, shown by minus signs along its surface. The electric field lines are vertical, evenly spaced, and point down toward the ground; the field is 113 V/m. The equipotentials are horizontal lines parallel to the ground, equally spaced for equal potential steps: 0 V at the ground, 113 V at 1 m, 226 V at 2 m, and 339 V at 3 m. The potential increases with height.',
    });
    svg.rect(30, g, W - 60, 40, { fill: '#c8b38e' });
    for (let x = 50; x < W - 40; x += 34) {
      svg.text(x, g + 12, '−', {
        size: 17,
        math: false,
        weight: 'bold',
        color: COLORS.blue,
        halo: false,
      });
    }
    for (let x = 70; x < W - 160; x += 60) {
      svg.arrow(x, 50, x, g - 2, { color: FIELD, width: 1.6, head: 9 });
    }
    for (const m of [0, 1, 2, 3]) {
      const y = g - m * s;
      if (m) svg.line(40, y, W - 150, y, { color: EQUIP, width: 2 });
      svg.text(W - 140, m ? y : y - 14, `${m} \\rm{m}:  ${113 * m} \\rm{V}`, {
        size: 14,
        anchor: 'start',
      });
    }
    svg.text(W / 2 - 50, g + 28, 'ground, σ = −1.00 \\rm{nC/m}^2', { size: 14 });
    rising(svg, 25, g - 30, 25, g - 200, {
      label: 'V increases',
      dx: -6,
      dy: -14,
      anchor: 'start',
    });
    svg.text(110, 36, '**E** = 113 \\rm{V/m}, downward', { size: 14, anchor: 'start' });
    return svg.render();
  },

  // 19.4 P10 — electric ray as a dipole, alone and near a conducting hull
  concept_19_04_p10: () => {
    const W = 800;
    const H = 420;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Equipotentials of an electric ray',
      desc: 'Two computed panels treating the electric ray as a dipole, positive head on the right and negative tail on the left. (a) In open water: nearly circular equipotentials surround each end; the zero-potential equipotential is the straight perpendicular bisector between head and tail; positive loops lie on the head side and negative loops on the tail side, and no equipotential encloses both ends. Larger loops have smaller potentials and are pinched toward the middle, never becoming circles around the ray. (b) Above a grounded conducting hull along the bottom: the hull is itself the zero equipotential, and the equipotentials between the ray and the hull are flattened and squeezed to run along it, while those above the ray look much as in (a). The potential increases toward the head and away from the tail.',
    });
    divider(svg, W / 2, H);
    const levels = [
      -0.06, -0.025, -0.012, -0.006, -0.0032, -0.0018, 0, 0.0018, 0.0032, 0.006, 0.012, 0.025, 0.06,
    ];
    for (const k of [0, 1]) {
      const x0 = (k * W) / 2;
      const cx = x0 + W / 4;
      const cy = k ? 255 : 220;
      const a = 45;
      const ray = [
        { x: cx - a, y: cy, q: -1 },
        { x: cx + a, y: cy, q: 1 },
      ];
      const hull = 330;
      const src = k ? [...ray, ...ray.map(s => ({ x: s.x, y: 2 * hull - s.y, q: -s.q }))] : ray;
      const V = pointPotential(src, { core: 10 });
      const view = { x: x0 + 4, y: 40, w: W / 2 - 8, h: (k ? hull : H - 10) - 40 };
      equipotentials(svg, V, view, levels, { emphasis: [0] });
      if (k) {
        svg.rect(x0 + 6, hull, W / 2 - 12, 40, { fill: METAL, stroke: COLORS.black, width: 1.2 });
        svg.text(cx, hull + 22, 'conducting hull (grounded, V = 0)', { size: 13 });
      }
      svg.ellipse(cx, cy, a + 22, 16, { stroke: '#8d6e63', width: 1.2 });
      charge(svg, ray[0].x, cy, '', -1, { r: 10 });
      charge(svg, ray[1].x, cy, '', 1, { r: 10 });
      svg.text(ray[0].x, cy - 26, 'tail', { size: 13, math: false });
      svg.text(ray[1].x, cy - 26, 'head', { size: 13, math: false });
      caption(svg, x0, k ? '(b) Near a conducting hull' : '(a) In open water');
    }
    rising(svg, 330, 360, 268, 236, { label: 'V increases toward the head', dx: -150, dy: 140 });
    return svg.render();
  },
};
