/**
 * Chapter 18: charge, Coulomb's law, electric fields and field lines,
 * conductors in static equilibrium, and applications of electrostatics.
 *
 * Field-line pictures are computed rather than sketched. Point charges use the
 * exact Coulomb field, and each charge sends out (or receives) a number of
 * lines proportional to its charge. A point charge beside a conducting sphere
 * uses the method of images, which is exact outside the sphere. Conductors of
 * other shapes are solved numerically with the Laplace solver in
 * fields18to19.js, and their surface charge marks are spaced by the normal
 * field there, so they crowd where the charge density is greatest.
 */
import {
  ROD_18,
  capsule,
  chargeMarks,
  drawConductor,
  drawRod,
  plate,
  pointField,
  rodCharges,
  signedArea,
  solveLaplace,
  spindle,
  trace,
  walkOutline,
} from './fields18to19.js';
import { COLORS, Svg, rad } from './svg.js';

const FIELD = COLORS.blue;
const FORCE = '#e0245e';
const METAL = '#cfd3da';
const METAL_EDGE = '#8a9099';
const ROD_POS = '#a9c8e6';
const ROD_NEG = '#c98a6b';
const ROD_GOLD = '#e0b85a';
const GOLD = '#e3b341';
const GOLD_EDGE = '#a07a1c';
const SLAB = '#8ea9d1';
const EGG = '#cfe9b8';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 17, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 22, math: false });
}

function sign(svg, x, y, s, { size = 22, color = COLORS.black } = {}) {
  svg.text(x, y, s, { size, math: false, color, halo: false, weight: 'bold' });
}

/** A gradient-free metal sphere with a highlight, as a picture of a conductor. */
function sphere(svg, cx, cy, r) {
  svg.circle(cx, cy, r, { fill: '#b9bec6', stroke: '#6f757d', width: 1.5 });
  svg.circle(cx - r * 0.35, cy - r * 0.38, r * 0.32, { fill: '#e6e9ee' });
}

/** Insulating stand under a sphere whose bottom is at y. */
function stand(svg, cx, y, { h = 50, base = 80 } = {}) {
  svg.rect(cx - 8, y - 4, 16, h, { fill: '#9aa0a8', stroke: '#5f656c', width: 1 });
  svg.rect(cx - base / 2, y + h - 4, base, 12, { fill: '#3b3f44' });
}

/** Charge marks spread over an arc of a circle (angles in degrees, y up). */
function arcMarks(svg, cx, cy, r, angles, s, { size = 26 } = {}) {
  for (const a of angles) {
    sign(svg, cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a)), s, {
      size,
      color: s === '+' ? COLORS.red : COLORS.blue,
    });
  }
}

/** A charged rod drawn as a rounded bar from x1 to x2 at y. */
function rod(svg, x1, x2, y, s, { fill = ROD_POS, h = 30, n = 5 } = {}) {
  svg.rect(x1, y - h / 2, x2 - x1, h, { fill, stroke: '#55606b', width: 1.2, rx: h / 2 });
  for (let k = 0; k < n; k += 1) {
    const x = x1 + ((x2 - x1) * (k + 0.5)) / n;
    sign(svg, x, y + (k % 2 ? 6 : -6), s, { size: 24 });
  }
}

/** Small round point charge with its sign. */
function pcharge(svg, x, y, s, { r = 11, fill = GOLD } = {}) {
  svg.circle(x, y, r, { fill, stroke: GOLD_EDGE, width: 1.5 });
  if (s) svg.text(x, y, s, { size: 15, math: false, weight: 'bold', halo: false });
}

/** Red (positive) or blue (negative) point charge, as in the computed figures. */
export function signedCharge(svg, x, y, q, { r = 12 } = {}) {
  svg.circle(x, y, r, { fill: q > 0 ? COLORS.red : COLORS.blue, stroke: COLORS.black, width: 1 });
  svg.text(x, y, q > 0 ? '+' : '−', {
    size: 16,
    math: false,
    weight: 'bold',
    color: '#ffffff',
    halo: false,
  });
}

/** Horizontal dimension line with end ticks and a centered label above. */
function dim(svg, x1, x2, y, label, { size = 20 } = {}) {
  svg.arrow(x1, y, x2, y, { color: COLORS.black, width: 1.4, head: 11, start: true });
  svg.line(x1, y - 10, x1, y + 10, { color: COLORS.black, width: 1.2 });
  svg.line(x2, y - 10, x2, y + 10, { color: COLORS.black, width: 1.2 });
  lab(svg, (x1 + x2) / 2, y - 16, label, { size });
}

/** A traced line with an arrowhead pointing along the field at fraction `at`. */
function fieldLine(svg, pts, { reverse = false, at = 0.5, color = FIELD, width = 1.8 } = {}) {
  if (pts.length < 10) return;
  svg.polyline(pts, { color, width });
  const k = Math.max(5, Math.min(pts.length - 6, Math.floor(pts.length * at)));
  let P = pts[k - 5];
  let Q = pts[k + 5];
  if (reverse) [P, Q] = [Q, P];
  svg.arrow(...P, ...Q, { color, width, head: 13 });
}

/**
 * Field lines of point charges: `per`·q lines leave each positive charge,
 * evenly spaced in angle; lines arriving at a negative charge from far away
 * are traced back from it (the rest are lines already drawn from positive
 * charges). `inside(x, y)` stops lines at a conductor.
 */
export function pointLines(svg, charges, box, opts = {}) {
  const {
    per = 4,
    at = 0.5,
    offset = 0.5,
    r0 = 14,
    inside = () => false,
    E = pointField(charges),
  } = opts;
  const near = (x, y, s) =>
    inside(x, y) || charges.some(c => Math.sign(c.q) === s && Math.hypot(x - c.x, y - c.y) < 10);
  for (const c of charges) {
    if (c.ghost) continue;
    const n = Math.round(per * Math.abs(c.q));
    for (let k = 0; k < n; k += 1) {
      const a = (2 * Math.PI * (k + offset)) / n;
      const x = c.x + r0 * Math.cos(a);
      const y = c.y + r0 * Math.sin(a);
      if (c.q > 0) {
        const pts = trace(E, x, y, 1, { box, stop: (px, py) => near(px, py, -1), step: 2 });
        fieldLine(svg, pts, { at });
      } else {
        const pts = trace(E, x, y, -1, { box, stop: (px, py) => near(px, py, 1), step: 2 });
        if (near(...pts[pts.length - 1], 1)) continue;
        fieldLine(svg, pts, { at, reverse: true });
      }
    }
  }
}

/** Straight radial lines from (or into) a point charge. */
function radial(svg, cx, cy, n, { r1 = 16, r2 = 110, inward = false, offset = 0, at = 0.6 } = {}) {
  for (let k = 0; k < n; k += 1) {
    const a = (2 * Math.PI * (k + offset)) / n;
    const [ux, uy] = [Math.cos(a), Math.sin(a)];
    svg.line(cx + r1 * ux, cy + r1 * uy, cx + r2 * ux, cy + r2 * uy, { color: FIELD, width: 2 });
    const m = r1 + (r2 - r1) * at;
    const [s, e] = inward ? [m + 10, m - 10] : [m - 10, m + 10];
    svg.arrow(cx + s * ux, cy + s * uy, cx + e * ux, cy + e * uy, {
      color: FIELD,
      width: 2,
      head: 14,
    });
  }
}

/** Field line between plate edges, bowing away from the plates by `bow`. */
function fringeV(svg, x, y1, y2, bow) {
  const m = (y1 + y2) / 2;
  svg.path(
    `M ${x} ${y1} C ${x} ${y1 + (m - y1) * 0.5} ${x + bow} ${m - (m - y1) * 0.4} ${x + bow} ${m} S ${x} ${y2 - (y2 - m) * 0.5} ${x} ${y2}`,
    {
      color: FIELD,
      width: 2,
    }
  );
  const d = y2 > y1 ? 1 : -1;
  svg.arrow(x + bow, m - 12 * d, x + bow, m + 12 * d, { color: FIELD, width: 2, head: 15 });
}

function fringeH(svg, x1, x2, y, bow) {
  const m = (x1 + x2) / 2;
  svg.path(
    `M ${x1} ${y} C ${x1 + (m - x1) * 0.5} ${y} ${m - (m - x1) * 0.4} ${y + bow} ${m} ${y + bow} S ${x2 - (x2 - m) * 0.5} ${y} ${x2} ${y}`,
    {
      color: FIELD,
      width: 2,
    }
  );
  const d = x2 > x1 ? 1 : -1;
  svg.arrow(m - 12 * d, y + bow, m + 12 * d, y + bow, { color: FIELD, width: 2, head: 15 });
}

function vArrowLine(svg, x, y1, y2) {
  svg.line(x, y1, x, y2, { color: FIELD, width: 2 });
  const m = (y1 + y2) / 2;
  const d = y2 > y1 ? 1 : -1;
  svg.arrow(x, m - 12 * d, x, m + 12 * d, { color: FIELD, width: 2, head: 15 });
}

function hArrowLine(svg, x1, x2, y) {
  svg.line(x1, y, x2, y, { color: FIELD, width: 2 });
  const m = (x1 + x2) / 2;
  const d = x2 > x1 ? 1 : -1;
  svg.arrow(m - 12 * d, y, m + 12 * d, y, { color: FIELD, width: 2, head: 15 });
}

/** Egg-shaped conductor: rounded on the left, more sharply curved on the right. */
function egg(cx, cy, { a = 62, b = 42, n = 90 } = {}) {
  const pts = [];
  for (let k = 0; k < n; k += 1) {
    const t = (2 * Math.PI * k) / n;
    pts.push([cx + a * Math.cos(t), cy - b * Math.sin(t) * (1 - 0.32 * Math.cos(t))]);
  }
  return pts;
}

/** Lines leaving a charged conductor, spaced by the flux through its surface. */
function fluxLines(svg, sol, poly, view, count, { at = 0.55 } = {}) {
  const orient = signedArea(poly) > 0 ? 1 : -1;
  const flux = (x, y, nx, ny) => {
    const [ex, ey] = sol.E(x + nx * 3, y + ny * 3);
    return Math.max(0, ex * nx + ey * ny);
  };
  let total = 0;
  walkOutline(poly, orient, (x, y, nx, ny, ds) => {
    total += flux(x, y, nx, ny) * ds;
  });
  const quantum = total / count;
  let acc = quantum / 2;
  walkOutline(poly, orient, (x, y, nx, ny, ds) => {
    acc += flux(x, y, nx, ny) * ds;
    if (acc >= quantum) {
      acc -= quantum;
      const pts = trace(sol.E, x + nx * 3, y + ny * 3, 1, { box: view, step: 2 });
      fieldLine(svg, pts, { at });
    }
  });
}

/** Charged conductor alone, held at V = 1 inside a grounded far boundary. */
function chargedConductor(poly, view) {
  const pad = 320;
  const box = { x: view.x - pad, y: view.y - pad, w: view.w + 2 * pad, h: view.h + 2 * pad };
  return solveLaplace({
    box,
    step: 3,
    conductors: [{ poly, V: 1 }],
    outer: () => 0,
    radius: Math.min(box.w, box.h) / 2 - 6,
  });
}

export default {
  // 18.1 Fig. 3 — the planetary model of the atom
  Figure_18_01_03: () => {
    const svg = new Svg({
      width: 520,
      height: 520,
      title: 'The planetary model of the atom',
      desc: 'A simplified, not-to-scale atom: a small positive nucleus of protons and neutrons at the center, with three negative electrons e⁻ moving on elliptical orbits around it in different planes, like planets around the sun.',
    });
    const c = [260, 260];
    const orbits = [
      { rot: 90, color: '#6a3d9a', t: 0.5 },
      { rot: 18, color: COLORS.orange, t: 3.6 },
      { rot: -22, color: '#2e9a6a', t: 0.9 },
    ];
    const pt = (rot, t, rx = 225, ry = 72) => {
      const x = rx * Math.cos(t);
      const y = ry * Math.sin(t);
      const r = rad(rot);
      return [c[0] + x * Math.cos(r) - y * Math.sin(r), c[1] - (x * Math.sin(r) + y * Math.cos(r))];
    };
    for (const o of orbits) {
      const pts = [];
      for (let k = 0; k <= 120; k += 1) pts.push(pt(o.rot, (2 * Math.PI * k) / 120));
      svg.polyline(pts, { color: o.color, width: 3 });
      svg.arrow(...pt(o.rot, o.t + 1.1), ...pt(o.rot, o.t + 1.25), {
        color: o.color,
        width: 3,
        head: 18,
      });
      const [ex, ey] = pt(o.rot, o.t);
      svg.circle(ex, ey, 8, { fill: '#8b1a1a' });
      lab(svg, ex + 14, ey + 22, 'e^−', { anchor: 'start' });
    }
    const nucleus = [
      [0, 0, 1],
      [-11, -6, 0],
      [11, -6, 1],
      [-11, 7, 1],
      [11, 7, 0],
      [0, -13, 0],
      [0, 13, 1],
    ];
    for (const [dx, dy, p] of nucleus) {
      svg.circle(c[0] + dx, c[1] + dy, 8, {
        fill: p ? COLORS.red : '#9aa0a8',
        stroke: '#333333',
        width: 0.8,
      });
      if (p)
        svg.text(c[0] + dx, c[1] + dy, '+', {
          size: 11,
          math: false,
          color: '#ffffff',
          halo: false,
          weight: 'bold',
        });
    }
    return svg.render();
  },

  // 18.2 Fig. 3 — charging two spheres by induction
  Figure_18_02_03: () => {
    const svg = new Svg({
      width: 560,
      height: 820,
      title: 'Charging by induction',
      desc: '(a) Two neutral metal spheres on insulating stands touch each other. (b) A positively charged rod brought near the left sphere attracts negative charge to its near side, leaving positive charge on the far side of the right sphere. (c) The spheres are separated while the rod is still near, so the left sphere keeps a negative charge and the right sphere a positive one. (d) After the rod is removed, the spheres keep equal and opposite charges, which gather on the sides facing each other.',
    });
    const r = 46;
    const rows = [
      { y: 80, gap: 2 * r, rod: false, cap: '(a)' },
      { y: 280, gap: 2 * r, rod: true, cap: '(b)' },
      { y: 480, gap: 2 * r + 50, rod: true, cap: '(c)' },
      { y: 680, gap: 2 * r + 50, rod: false, cap: '(d)', after: true },
    ];
    for (const row of rows) {
      const x1 = 270;
      const x2 = x1 + row.gap;
      for (const x of [x1, x2]) {
        stand(svg, x, row.y + r, { h: 46, base: 70 });
        sphere(svg, x, row.y, r);
      }
      if (row.rod) {
        rod(svg, 40, x1 - r - 26, row.y - 4, '+');
        arcMarks(svg, x1, row.y, r - 10, [150, 172, 194, 216], '−');
        arcMarks(svg, x2, row.y, r - 10, [-36, -12, 12, 36], '+');
      } else if (row.after) {
        arcMarks(svg, x1, row.y, r - 10, [-36, -12, 12, 36], '−');
        arcMarks(svg, x2, row.y, r - 10, [144, 168, 192, 216], '+');
      }
      caption(svg, (x1 + x2) / 2, row.y + r + 70, row.cap);
    }
    return svg.render();
  },

  // 18.2 Fig. 4 — charging one sphere by induction through a ground
  Figure_18_02_04: () => {
    const svg = new Svg({
      width: 800,
      height: 600,
      title: 'Charging by induction using a ground connection',
      desc: '(a) A positively charged rod near a neutral metal sphere polarizes it: negative charge on the side near the rod, positive charge on the far side. (b) The sphere is grounded, and electrons flow up from the earth and cancel the positive charge on the far side. (c) The ground connection is broken; the sphere keeps its excess negative charge, still held on the near side by the rod. (d) With the rod removed, the excess negative charge spreads out over the sphere.',
    });
    const r = 64;
    const panels = [
      { x: 0, y: 0, cap: '(a)', rodOn: true, neg: [150, 180, 210], pos: [-30, 0, 30] },
      { x: 400, y: 0, cap: '(b)', rodOn: true, neg: [150, 180, 210], pos: [], ground: true },
      { x: 0, y: 300, cap: '(c)', rodOn: true, neg: [150, 180, 210], pos: [] },
      { x: 400, y: 300, cap: '(d)', rodOn: false, neg: [100, 220, 340] },
    ];
    for (const p of panels) {
      const cx = p.x + 230;
      const cy = p.y + 100;
      stand(svg, cx, cy + r, { h: 60, base: 90 });
      sphere(svg, cx, cy, r);
      if (p.rodOn) rod(svg, p.x + 20, p.x + 140, cy - 28, '+', { h: 34 });
      arcMarks(svg, cx, cy, r - 14, p.neg, '−', { size: 24 });
      if (p.pos) arcMarks(svg, cx, cy, r - 14, p.pos, '+', { size: 24 });
      if (p.ground) {
        const gx = cx + 120;
        svg.polyline(
          [
            [cx + r, cy],
            [gx, cy],
            [gx, cy + 110],
          ],
          { color: COLORS.black, width: 2 }
        );
        for (const [k, half] of [
          [0, 18],
          [7, 12],
          [14, 6],
        ]) {
          svg.line(gx - half, cy + 110 + k, gx + half, cy + 110 + k, {
            color: COLORS.black,
            width: 2,
          });
        }
        note(svg, gx, cy + 152, 'Ground');
        svg.arrow(gx + 18, cy + 80, gx + 18, cy + 20, { color: COLORS.blue, width: 2.5, head: 13 });
        lab(svg, gx + 26, cy + 56, 'e^−', { anchor: 'start', color: COLORS.blue });
      }
      caption(svg, cx, cy + r + 96, p.cap);
    }
    return svg.render();
  },

  // 18.2 Fig. 5 — polarization of a neutral insulator, and induction in a conductor
  Figure_18_02_05: () => {
    const svg = new Svg({
      width: 560,
      height: 700,
      title: 'Charged objects attract neutral objects by polarizing them',
      desc: '(a) A positive rod near a neutral insulator: each molecule shifts slightly, with its negative side toward the rod. (b) A negative rod near the insulator: each molecule turns its positive side toward the rod. In both cases the nearer, unlike charges are attracted more strongly than the farther, like charges are repelled, so the insulator is attracted. (c) A negative rod near a neutral conductor: free electrons are pushed to the far side, leaving positive charge on the near side, and the conductor is attracted.',
    });
    const rows = [
      { y: 40, rod: '+', fill: ROD_POS, mol: ['−', '+'], cap: '(a)' },
      { y: 260, rod: '−', fill: ROD_NEG, mol: ['+', '−'], cap: '(b)' },
      { y: 480, rod: '−', fill: ROD_GOLD, conductor: true, cap: '(c)' },
    ];
    for (const row of rows) {
      const bx = 300;
      const by = row.y;
      svg.rect(bx, by, 220, 170, { fill: SLAB, stroke: '#5b7aa5', width: 1.2 });
      rod(svg, 30, 260, by + 85, row.rod, { fill: row.fill, h: 44, n: 5 });
      if (row.conductor) {
        for (const y of [by + 35, by + 85, by + 135]) {
          sign(svg, bx + 28, y, '+', { size: 26 });
          sign(svg, bx + 192, y, '−', { size: 26 });
        }
      } else {
        for (const x of [bx + 55, bx + 165]) {
          for (const y of [by + 35, by + 85, by + 135]) {
            svg.circle(x, y, 22, { fill: '#e8ebef', stroke: '#555555', width: 1.2 });
            sign(svg, x - 9, y, row.mol[0], { size: 20 });
            sign(svg, x + 9, y, row.mol[1], { size: 20 });
          }
        }
      }
      caption(svg, 545, by + 196, row.cap);
    }
    return svg.render();
  },

  // 18.3 Fig. 2 — Coulomb forces on two point charges
  Figure_18_03_02: () => {
    const svg = new Svg({
      width: 800,
      height: 170,
      title: 'Coulomb forces between two point charges',
      desc: 'The force between point charges q1 and q2 a distance r apart. (a) Two negative charges repel: F21 on q1 points away from q2, and F12 on q2 points away from q1. (b) A negative q1 and a positive q2 attract: the forces point toward each other. In each case the two forces are equal in magnitude and opposite in direction, as Newton’s third law requires.',
    });
    const y = 110;
    caption(svg, 20, 30, '(a)');
    signedCharge(svg, 160, y, -1);
    signedCharge(svg, 300, y, -1);
    svg.arrow(148, y, 40, y, { color: FORCE, width: 4, head: 18 });
    svg.arrow(312, y, 420, y, { color: FORCE, width: 4, head: 18 });
    lab(svg, 80, y - 26, '**F**_{21}');
    lab(svg, 370, y - 26, '**F**_{12}');
    dim(svg, 160, 300, y - 50, 'r');
    lab(svg, 160, y + 32, 'q_1');
    lab(svg, 300, y + 32, 'q_2');
    caption(svg, 460, 30, '(b)');
    signedCharge(svg, 520, y, -1);
    signedCharge(svg, 740, y, 1);
    svg.arrow(532, y, 620, y, { color: FORCE, width: 4, head: 18 });
    svg.arrow(728, y, 640, y, { color: FORCE, width: 4, head: 18 });
    lab(svg, 576, y + 32, '**F**_{21}');
    lab(svg, 684, y + 32, '**F**_{12}');
    dim(svg, 520, 740, y - 50, 'r');
    lab(svg, 500, y + 32, 'q_1', { anchor: 'end' });
    lab(svg, 760, y + 32, 'q_2', { anchor: 'start' });
    return svg.render();
  },

  // 18.3 Fig. 3 — charge separation in a water molecule
  Figure_18_03_03: () => {
    const svg = new Svg({
      width: 320,
      height: 340,
      title: 'Charge separation in a water molecule',
      desc: 'The outer electron cloud of a neutral water molecule, shaded, is concentrated around the oxygen atom. The oxygen carries a net charge −2q and each hydrogen a net charge +q; the two O–H bonds make an angle of 104°. Water is therefore a polar molecule.',
    });
    const O = [120, 170];
    const H1 = [O[0] + 105 * Math.cos(rad(52)), O[1] - 105 * Math.sin(rad(52))];
    const H2 = [O[0] + 105 * Math.cos(rad(52)), O[1] + 105 * Math.sin(rad(52))];
    svg.add(
      '<defs><radialGradient id="cloud18"><stop offset="0" stop-color="#1f8f8a" stop-opacity="0.85"/><stop offset="1" stop-color="#1f8f8a" stop-opacity="0.15"/></radialGradient></defs>'
    );
    svg.add(
      `<path d="M ${O[0] - 75} ${O[1]} C ${O[0] - 70} ${O[1] - 90} ${H1[0] - 40} ${H1[1] - 60} ${H1[0] + 10} ${H1[1] - 36} C ${H1[0] + 60} ${H1[1] - 10} ${H1[0] + 30} ${H1[1] + 40} ${O[0] + 40} ${O[1] - 10} C ${O[0] + 50} ${O[1]} ${O[0] + 50} ${O[1]} ${O[0] + 40} ${O[1] + 10} C ${H2[0] + 30} ${H2[1] - 40} ${H2[0] + 60} ${H2[1] + 10} ${H2[0] + 10} ${H2[1] + 36} C ${H2[0] - 40} ${H2[1] + 60} ${O[0] - 70} ${O[1] + 90} ${O[0] - 75} ${O[1]} Z" fill="url(#cloud18)"/>`
    );
    for (const H of [H1, H2]) svg.line(...O, ...H, { color: COLORS.black, width: 2, dash: '6 4' });
    svg.arc(...O, 34, -52, 52, { color: COLORS.black, width: 2 });
    lab(svg, O[0] + 42, O[1], '104°', { anchor: 'start', size: 20 });
    for (const P of [O, H1, H2]) svg.circle(...P, 6, { fill: COLORS.black });
    lab(svg, O[0] - 4, O[1] - 24, '\\rm{O}');
    lab(svg, O[0] - 14, O[1] + 4, '−2q', { anchor: 'end' });
    lab(svg, H1[0] + 14, H1[1], '+q', { anchor: 'start' });
    lab(svg, H1[0] - 4, H1[1] - 24, '\\rm{H}');
    lab(svg, H2[0] + 14, H2[1], '+q', { anchor: 'start' });
    lab(svg, H2[0] - 4, H2[1] + 26, '\\rm{H}');
    return svg.render();
  },

  // 18.4 Fig. 2 — the force of a field on two different test charges
  Figure_18_04_02: () => {
    const svg = new Svg({
      width: 520,
      height: 320,
      title: 'The Coulomb force field of a positive charge acting on two test charges',
      desc: '(a) A positive test charge q1 a distance r from a positive charge Q is repelled: the force F1 points away from Q. (b) A negative test charge q2, larger in magnitude than q1, at the same distance r is attracted: the force F2 points toward Q and is larger than F1.',
    });
    for (const [y, cap, s, len] of [
      [100, '(a)', '+', 100],
      [250, '(b)', '−', -170],
    ]) {
      signedCharge(svg, 60, y, 1, { r: 13 });
      lab(svg, 60, y + 34, 'Q');
      pcharge(svg, 360, y, s === '+' ? '++' : '−−', {
        r: 14,
        fill: s === '+' ? '#f2a7a7' : '#a9c4ea',
      });
      lab(svg, 360, y + 36, s === '+' ? 'q_1' : 'q_2');
      svg.arrow(len > 0 ? 376 : 344, y, 360 + len + (len > 0 ? 16 : -16), y, {
        color: FORCE,
        width: 5,
        head: 20,
      });
      lab(svg, 360 + len / 2 + (len > 0 ? 16 : -16), y - 28, s === '+' ? '**F**_1' : '**F**_2');
      dim(svg, 60, 360, y - 48, 'r');
      caption(svg, 210, y + 34, cap);
    }
    return svg.render();
  },

  // 18.5 Fig. 2 — field arrows and field lines of a point charge
  Figure_18_05_02: () => {
    const svg = new Svg({
      width: 800,
      height: 400,
      title: 'Two representations of the field of a positive charge',
      desc: '(a) Arrows show the field of a positive charge Q at two distances in eight directions: the arrows point away from Q and are much shorter farther out, since the field falls off as 1/r². (b) The standard representation: continuous field lines radiating from Q, with arrows showing the field direction. The lines are closer together where the field is stronger.',
    });
    const a = [200, 200];
    for (let k = 0; k < 8; k += 1) {
      const t = (2 * Math.PI * k) / 8;
      const [ux, uy] = [Math.cos(t), Math.sin(t)];
      for (const [r, len] of [
        [32, 72],
        [130, 72 * (32 / 130) ** 2 * 3],
      ]) {
        svg.arrow(a[0] + r * ux, a[1] + r * uy, a[0] + (r + len) * ux, a[1] + (r + len) * uy, {
          color: FIELD,
          width: r > 50 ? 2 : 3,
          head: r > 50 ? 10 : 15,
          dash: r > 50 ? '5 3' : undefined,
        });
      }
    }
    signedCharge(svg, ...a, 1);
    lab(svg, a[0] - 14, a[1] - 24, 'Q', { anchor: 'end' });
    caption(svg, 200, 385, '(a)');
    const b = [600, 200];
    radial(svg, ...b, 8, { r1: 16, r2: 180, at: 0.55 });
    signedCharge(svg, ...b, 1);
    lab(svg, b[0] - 14, b[1] - 24, 'Q', { anchor: 'end' });
    caption(svg, 600, 385, '(b)');
    return svg.render();
  },

  // 18.5 Fig. 3 — three point charges
  Figure_18_05_03: () => {
    const svg = new Svg({
      width: 800,
      height: 300,
      title: 'Field lines of three point charges',
      desc: '(a) A positive charge: eight field lines point radially outward. (b) A negative charge of equal magnitude: eight field lines point radially inward. (c) A larger negative charge: twice as many lines point inward, showing the stronger field.',
    });
    [
      [135, '(a)', 1, 8],
      [400, '(b)', -1, 8],
      [665, '(c)', -1, 16],
    ].forEach(([cx, cap, q, n]) => {
      radial(svg, cx, 140, n, { r1: 16, r2: 120, inward: q < 0, at: 0.6 });
      signedCharge(svg, cx, 140, q, { r: n > 8 ? 15 : 12 });
      caption(svg, cx, 290, cap);
    });
    return svg.render();
  },

  // 18.5 worked example — adding the fields of two charges at the origin
  Figure_18_05_04: () => {
    const svg = new Svg({
      width: 680,
      height: 560,
      title: 'Adding electric fields at the origin',
      desc: 'Charge q1 = +5.0 nC is on the y axis 2.00 cm below the origin O, and q2 = +10 nC is on the x axis 4.00 cm to the right of O. At O the field E1 = 1.13 × 10⁵ N/C from q1 points in the +y direction, and the field E2 = 0.56 × 10⁵ N/C from q2 points in the −x direction. They add to E_tot = 1.26 × 10⁵ N/C, pointing up and to the left at 63.4° above the −x axis.',
    });
    const O = [420, 400];
    const cm = 50;
    const k = 8.99e9;
    const E1 = (k * 5e-9) / 0.02 ** 2;
    const E2 = (k * 10e-9) / 0.04 ** 2;
    const s = 230 / 1e5;
    const P1 = [O[0], O[1] - E1 * s];
    const P2 = [O[0] - E2 * s, O[1]];
    const Pt = [P2[0], P1[1]];
    svg.polygon([O, P2, Pt, P1], { fill: '#c9b6dc', opacity: 0.7 });
    svg.arrow(O[0] - 200, O[1], O[0] + 240, O[1], { color: COLORS.axis, width: 1.4, head: 11 });
    svg.arrow(O[0], O[1] + 140, O[0], 60, { color: COLORS.axis, width: 1.4, head: 11 });
    lab(svg, O[0] + 250, O[1], 'x', { anchor: 'start' });
    lab(svg, O[0] + 12, 56, 'y', { anchor: 'start' });
    svg.arrow(...O, ...P1, { color: FIELD, width: 4, head: 20 });
    svg.arrow(...O, ...P2, { color: FIELD, width: 4, head: 20 });
    svg.arrow(...O, ...Pt, { color: FIELD, width: 4, head: 20 });
    lab(svg, O[0] + 14, (O[1] + P1[1]) / 2, '**E**_1 = 1.13 × 10^5 \\rm{N/C}', {
      anchor: 'start',
      size: 20,
    });
    lab(svg, O[0] - 34, O[1] + 34, '**E**_2 = 0.56 × 10^5 \\rm{N/C}', { anchor: 'end', size: 21 });
    lab(svg, Pt[0] - 10, Pt[1] - 22, '**E**_{tot} = 1.26 × 10^5 \\rm{N/C}', {
      anchor: 'start',
      size: 20,
    });
    const ang = (Math.atan(E1 / E2) * 180) / Math.PI;
    svg.arc(...O, 46, 180 - ang, 180, { color: COLORS.black, width: 1.8 });
    lab(svg, O[0] - 64, O[1] - 26, `${ang.toFixed(1)}°`, { anchor: 'end', size: 19 });
    lab(svg, O[0] + 10, O[1] + 20, '\\rm{O}', { anchor: 'start', size: 21 });
    const q1 = [O[0], O[1] + 2 * cm];
    const q2 = [O[0] + 4 * cm, O[1]];
    svg.circle(...q1, 6, { fill: COLORS.black });
    svg.circle(...q2, 6, { fill: COLORS.black });
    lab(svg, q1[0] + 14, q1[1], 'q_1 = +5.0 \\rm{nC}', { anchor: 'start', size: 19 });
    lab(svg, q2[0] - 4, q2[1] - 24, 'q_2 = +10 \\rm{nC}', { size: 19 });
    lab(svg, (O[0] + q2[0]) / 2 + 20, O[1] + 26, '4.00 \\rm{cm}', { size: 19 });
    lab(svg, O[0] - 12, (O[1] + q1[1]) / 2 + 8, '2.00 \\rm{cm}', { anchor: 'end', size: 19 });
    return svg.render();
  },

  // 18.5 Fig. 4 — the resultant field of two positive charges
  Figure_18_05_05: () => {
    const svg = new Svg({
      width: 640,
      height: 620,
      title: 'Resultant field of two positive point charges',
      desc: 'Computed field lines of two positive charges q1 and q2. At a point P above q1, the fields E1 from q1 and E2 from q2 add to a total field E that is tangent to the field line through P. At a point P′ below and between the charges, E′1 and E′2 add to E′, again tangent to the line there.',
    });
    const charges = [
      { x: 230, y: 360, q: 1 },
      { x: 430, y: 360, q: 1 },
    ];
    const box = { x: 4, y: 4, w: 632, h: 612 };
    pointLines(svg, charges, box, { per: 14, at: 0.42 });
    for (const c of charges) signedCharge(svg, c.x, c.y, 1, { r: 14 });
    lab(svg, 230, 398, 'q_1');
    lab(svg, 430, 398, 'q_2');
    const vec = (P, names, scale) => {
      const parts = charges.map(c => {
        const dx = P[0] - c.x;
        const dy = P[1] - c.y;
        const r3 = Math.hypot(dx, dy) ** 3;
        return [(dx / r3) * scale, (dy / r3) * scale];
      });
      const tot = [parts[0][0] + parts[1][0], parts[0][1] + parts[1][1]];
      // Each label sits just past its arrow's tip, nudged to one side.
      const tag = (v, name, side, size) => {
        const L = Math.hypot(...v);
        const [ux, uy] = [v[0] / L, v[1] / L];
        lab(
          svg,
          P[0] + v[0] + ux * 18 - uy * side * 16,
          P[1] + v[1] + uy * 18 + ux * side * 16,
          name,
          { size }
        );
      };
      parts.forEach((v, i) => {
        svg.arrow(...P, P[0] + v[0], P[1] + v[1], { color: COLORS.black, width: 2.2, head: 13 });
        tag(v, names[i], i ? 1 : -1, 20);
      });
      svg.arrow(...P, P[0] + tot[0], P[1] + tot[1], { color: COLORS.black, width: 3.5, head: 17 });
      tag(tot, names[2], 0, 22);
      svg.circle(...P, 6, { fill: COLORS.black });
    };
    vec([245, 190], ['**E**_1', '**E**_2', '**E**'], 3.4e6);
    lab(svg, 262, 196, '\\rm{P}', { anchor: 'start' });
    vec([400, 500], ['**E**′_1', '**E**′_2', '**E**′'], 1.4e6);
    lab(svg, 386, 500, '\\rm{P}′', { anchor: 'end' });
    return svg.render();
  },

  // 18.5 Fig. 5 — two negative charges; two opposite charges
  Figure_18_05_06: () => {
    const svg = new Svg({
      width: 560,
      height: 870,
      title: 'Field lines of two like charges and of two opposite charges',
      desc: '(a) Two negative charges −q: computed field lines come in from all directions and end on the charges, curving away from the region between them, where the field is weak. (b) A positive charge +q and a negative charge −q: field lines leave +q and curve around to end on −q; the field between them is strong.',
    });
    pointLines(
      svg,
      [
        { x: 170, y: 200, q: -1 },
        { x: 390, y: 200, q: -1 },
      ],
      { x: 4, y: 4, w: 552, h: 392 },
      { per: 16, at: 0.5 }
    );
    signedCharge(svg, 170, 200, -1);
    signedCharge(svg, 390, 200, -1);
    lab(svg, 170, 234, '−q');
    lab(svg, 390, 234, '−q');
    caption(svg, 280, 412, '(a)');
    pointLines(
      svg,
      [
        { x: 170, y: 620, q: 1 },
        { x: 390, y: 620, q: -1 },
      ],
      { x: 4, y: 424, w: 552, h: 392 },
      { per: 16, at: 0.5 }
    );
    signedCharge(svg, 170, 620, 1);
    signedCharge(svg, 390, 620, -1);
    lab(svg, 170, 654, '+q');
    lab(svg, 390, 654, '−q');
    caption(svg, 280, 852, '(b)');
    return svg.render();
  },

  // 18.5 conceptual question — a field over three regions
  Figure_18_05_07: () => {
    const svg = new Svg({
      width: 520,
      height: 380,
      title: 'An electric field extending over three regions',
      desc: 'Five field lines run from left to right through regions I, II and III. In region I they are straight, parallel and closely spaced. In region II two of the lines end at points, which are negative charges. The middle line continues straight. In region III the top and bottom lines curve away from the middle, so the lines are farther apart and the field is weaker.',
    });
    const ys = [110, 150, 190, 230, 270];
    const xEnd = 210;
    ys.forEach((y, i) => {
      if (i === 1 || i === 3) {
        svg.line(20, y, xEnd - 6, y, { color: FIELD, width: 2.5 });
        svg.arrow(50, y, 80, y, { color: FIELD, width: 2.5, head: 15 });
        svg.circle(xEnd, y, 6, { fill: COLORS.black });
      } else if (i === 2) {
        svg.line(20, y, 500, y, { color: FIELD, width: 2.5 });
        svg.arrow(50, y, 80, y, { color: FIELD, width: 2.5, head: 15 });
        svg.arrow(300, y, 330, y, { color: FIELD, width: 2.5, head: 15 });
      } else {
        const s = i === 0 ? -1 : 1;
        svg.path(`M 20 ${y} L 160 ${y} C 250 ${y} 330 ${y + s * 24} 470 ${y + s * 86}`, {
          color: FIELD,
          width: 2.5,
        });
        svg.arrow(50, y, 80, y, { color: FIELD, width: 2.5, head: 15 });
        svg.arrow(458, y + s * 80, 478, y + s * 90, { color: FIELD, width: 2.5, head: 15 });
      }
    });
    for (const [x, t] of [
      [70, 'I'],
      [210, 'II'],
      [380, 'III'],
    ]) {
      svg.text(x, 360, t, { size: 26, math: false });
    }
    return svg.render();
  },

  // 18.5 problem — a point charge beside a charged conducting sphere
  Figure_18_05_08: () => {
    const svg = new Svg({
      width: 640,
      height: 440,
      title: 'Field lines near a point charge and a charged conducting sphere',
      desc: 'A small positive charge on the left and a larger negatively charged conducting sphere on the right. Field lines leave the positive charge in all directions. About half of them curve over and end on the sphere, meeting its surface at right angles; the rest go off to large distances. Twice as many lines leave the point charge as end on the sphere.',
    });
    // Point charge +2Q at distance D from the center of a sphere of radius R
    // carrying −Q: image −2Q·R/D at R²/D from the center, plus the rest of the
    // sphere's charge at its center. Exact outside the sphere.
    const q = { x: 190, y: 220, q: 2 };
    const S = { x: 420, y: 220, R: 85 };
    const D = S.x - q.x;
    const qi = (-q.q * S.R) / D;
    const charges = [
      q,
      { x: S.x - (S.R * S.R) / D, y: S.y, q: qi, ghost: true },
      { x: S.x, y: S.y, q: -1 - qi, ghost: true },
    ];
    const inside = (x, y) => Math.hypot(x - S.x, y - S.y) < S.R;
    pointLines(svg, charges, { x: 4, y: 4, w: 632, h: 432 }, { per: 14, at: 0.3, inside });
    sphere(svg, S.x, S.y, S.R);
    arcMarks(svg, S.x, S.y, S.R - 14, [150, 170, 190, 210, 130, 230], '−', { size: 22 });
    signedCharge(svg, q.x, q.y, 1, { r: 11 });
    return svg.render();
  },

  // 18.6 Fig. 3 — a hydrogen bond between water molecules
  Figure_18_06_03: () => {
    const svg = new Svg({
      width: 560,
      height: 170,
      title: 'A hydrogen bond between two water molecules',
      desc: 'Two water molecules. The oxygen of the left molecule carries a partial negative charge δ−, and a hydrogen of the right molecule carries a partial positive charge δ+. The attraction between them, a hydrogen bond, is shown as a dashed line.',
    });
    const T = (x, y, s) => svg.text(x, y, s, { size: 34, math: false });
    T(60, 50, 'H');
    T(150, 100, 'O');
    T(60, 150, 'H');
    svg.line(78, 62, 132, 90, { color: COLORS.black, width: 2.5 });
    svg.line(78, 138, 132, 112, { color: COLORS.black, width: 2.5 });
    svg.line(176, 100, 320, 100, { color: COLORS.black, width: 2.5, dash: '10 7' });
    T(340, 100, 'H');
    svg.line(362, 100, 420, 100, { color: COLORS.black, width: 2.5 });
    T(440, 100, 'O');
    svg.line(460, 114, 500, 146, { color: COLORS.black, width: 2.5 });
    T(516, 154, 'H');
    svg.text(172, 58, 'δ^−', { size: 26 });
    svg.text(344, 58, 'δ^+', { size: 26 });
    return svg.render();
  },

  // 18.7 Fig. 2 — field components at a conductor's surface
  Figure_18_07_02: () => {
    const svg = new Svg({
      width: 440,
      height: 640,
      title: 'Electric field at the surface of a conductor',
      desc: '(a) An electric field E at a conductor’s surface, drawn with its component E⊥ perpendicular to the surface and E∥ parallel to it. The parallel component exerts a force F∥ = qE∥ on a free charge q at the surface, moving it along the surface. (b) In static equilibrium the charges have moved until the field is perpendicular to the surface, so there is no parallel force.',
    });
    const S = [200, 230];
    svg.arc(200, 230 + 420, 420, 60, 120, { color: COLORS.black, width: 2 });
    const tip = [320, 50];
    svg.line(S[0], S[1], S[0], tip[1], { color: FIELD, width: 2, dash: '6 4' });
    svg.arrow(S[0], tip[1] + 12, S[0], tip[1], { color: FIELD, width: 2, head: 13 });
    svg.line(S[0], S[1], tip[0], S[1], { color: FIELD, width: 2, dash: '6 4' });
    svg.arrow(tip[0] - 12, S[1], tip[0], S[1], { color: FIELD, width: 2, head: 13 });
    svg.line(S[0], tip[1], tip[0], tip[1], { color: COLORS.black, width: 1.2, dash: '5 4' });
    svg.line(tip[0], tip[1], tip[0], S[1], { color: COLORS.black, width: 1.2, dash: '5 4' });
    svg.arrow(...S, ...tip, { color: FIELD, width: 3.5, head: 18 });
    lab(svg, S[0] - 12, 140, '**E**_⊥', { anchor: 'end' });
    lab(svg, 278, 150, '**E**', { anchor: 'start' });
    lab(svg, 290, S[1] - 20, '**E**_∥');
    pcharge(svg, S[0], S[1] + 22, '+', { r: 11 });
    svg.arrow(S[0] + 14, S[1] + 22, S[0] + 100, S[1] + 22, { color: FORCE, width: 4, head: 17 });
    lab(svg, S[0], S[1] + 56, 'q');
    lab(svg, S[0] + 60, S[1] + 60, '**F**_∥ = q**E**_∥', { anchor: 'start', size: 20 });
    caption(svg, 22, 300, '(a)');
    const S2 = [200, 560];
    svg.arc(200, 560 + 420, 420, 60, 120, { color: COLORS.black, width: 2 });
    svg.arrow(S2[0], S2[1], S2[0], 380, { color: FIELD, width: 3.5, head: 18 });
    lab(svg, S2[0] + 18, 460, '**E**', { anchor: 'start' });
    pcharge(svg, S2[0], S2[1], '+', { r: 11 });
    lab(svg, S2[0], S2[1] + 34, 'q');
    caption(svg, 22, 620, '(b)');
    return svg.render();
  },

  // 18.7 Fig. 3 — a conducting sphere in a uniform field
  Figure_18_07_03: () => {
    const W = 640;
    const H = 420;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'A conducting sphere in an originally uniform electric field',
      desc: 'Computed field lines around a neutral conducting sphere placed in a field that points to the right and was uniform before the sphere was there. Free charges in the sphere move until the field lines meet its surface at right angles: lines end on negative charge induced on the left side and start again on positive charge induced on the right side. There is no field inside the sphere, and far away the field is uniform again.',
    });
    const c = [320, 210];
    const R = 75;
    // Exact: V = −E0·x·(1 − R³/r³) in the plane through the center.
    const E = (x, y) => {
      const dx = x - c[0];
      const dy = y - c[1];
      const r2 = dx * dx + dy * dy;
      const r5 = r2 * r2 * Math.sqrt(r2);
      const R3 = R ** 3;
      return [1 + (R3 * (2 * dx * dx - dy * dy)) / r5, (3 * R3 * dx * dy) / r5];
    };
    const inside = (x, y) => Math.hypot(x - c[0], y - c[1]) < R;
    const view = { x: 0, y: 0, w: W, h: H };
    for (let y = 14; y < H; y += 26) {
      const pts = trace(E, 1, y, 1, { box: view, stop: inside, step: 2 });
      fieldLine(svg, pts, { at: 0.18 });
      if (inside(...pts[pts.length - 1])) {
        const mirror = pts.map(([x, yy]) => [2 * c[0] - x, yy]).reverse();
        fieldLine(svg, mirror, { at: 0.82 });
      }
    }
    svg.circle(...c, R, { fill: GOLD, stroke: GOLD_EDGE, width: 1.5 });
    for (const a of [0, 30, -30, 58, -58]) {
      sign(svg, c[0] + (R - 18) * Math.cos(rad(a)), c[1] - (R - 18) * Math.sin(rad(a)), '+', {
        size: 24,
      });
      sign(svg, c[0] - (R - 18) * Math.cos(rad(a)), c[1] - (R - 18) * Math.sin(rad(a)), '−', {
        size: 24,
      });
    }
    return svg.render();
  },

  // 18.7 Fig. 4 — a charged conducting sphere
  Figure_18_07_04: () => {
    const svg = new Svg({
      width: 400,
      height: 400,
      title: 'A positively charged conducting sphere',
      desc: 'Excess positive charges spread uniformly over the surface of a conducting sphere. The field lines leave the surface at right angles and point radially outward, like the field of a point charge at the center. There is no field inside.',
    });
    const c = [200, 200];
    const R = 70;
    radial(svg, ...c, 8, { r1: R, r2: 190, at: 0.6 });
    svg.circle(...c, R, { fill: '#efe3c8', stroke: '#a68e5a', width: 1.5 });
    svg.circle(c[0] - 24, c[1] - 26, 22, { fill: '#fbf6ea' });
    for (let k = 0; k < 8; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 8;
      sign(svg, c[0] + (R - 18) * Math.cos(a), c[1] + (R - 18) * Math.sin(a), '+', { size: 22 });
    }
    return svg.render();
  },

  // 18.7 Fig. 5 — two oppositely charged plates
  Figure_18_07_05: () => {
    const svg = new Svg({
      width: 560,
      height: 260,
      title: 'Field between two oppositely charged metal plates',
      desc: 'An upper metal plate with positive charge and a lower plate with an equal negative charge. Between them the field lines are straight, evenly spaced and point down from the positive plate to the negative plate, so the field is uniform; near the ends the lines bow outward.',
    });
    const L = 70;
    const R = 490;
    svg.rect(L, 26, R - L, 20, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    svg.rect(L, 214, R - L, 20, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    const xs = [];
    for (let x = L + 50; x <= R - 50; x += 40) xs.push(x);
    for (const x of xs) vArrowLine(svg, x, 46, 214);
    fringeV(svg, L + 10, 46, 214, -44);
    fringeV(svg, R - 10, 46, 214, 44);
    for (const x of [L + 10, ...xs, R - 10]) {
      sign(svg, x, 36, '+', { size: 18 });
      sign(svg, x, 224, '−', { size: 18 });
    }
    return svg.render();
  },

  // 18.7 Fig. 6 — charge gathers where a conductor is most sharply curved
  Figure_18_07_07: () => {
    const W = 960;
    const H = 340;
    const svg = new Svg({
      width: W,
      height: H,
      title: 'Charge concentrates where a conductor is most sharply curved',
      desc: '(a) On an egg-shaped conductor, identical pairs of charges at the blunt left end and the sharp right end repel with equal forces F, but the component F∥ parallel to the surface is larger at the blunt end, so charges are pushed away from it and toward the sharper end. (b) Computed charge marks and field lines of the charged conductor: the charge, and the field, are densest at the sharply curved right end. (c) Computed field lines of the neutral conductor in an originally uniform field: the induced charge, and the field just outside, are greatest at the sharply curved end.',
    });
    // (a)
    {
      const cx = 160;
      const cy = 160;
      svg.polygon(egg(cx, cy), { fill: EGG, stroke: COLORS.black, width: 1.5 });
      const pairs = [
        { x: cx - 58, up: [cx - 50, cy - 26], dn: [cx - 50, cy + 26] },
        { x: cx + 58, up: [cx + 54, cy - 14], dn: [cx + 54, cy + 14] },
      ];
      for (const p of pairs) {
        for (const [P, s] of [
          [p.up, -1],
          [p.dn, 1],
        ]) {
          svg.circle(...P, 6, { fill: '#ffffff', stroke: COLORS.black, width: 1.2 });
          svg.text(...P, '+', { size: 11, math: false, halo: false });
          svg.arrow(P[0], P[1] + s * 8, P[0], P[1] + s * 110, {
            color: FORCE,
            width: 2.5,
            head: 13,
          });
        }
      }
      // Surface tangent components: larger at the blunt end.
      svg.arrow(cx - 50, cy - 34, cx - 30, cy - 92, { color: FORCE, width: 2.5, head: 12 });
      svg.arrow(cx - 50, cy + 34, cx - 30, cy + 92, { color: FORCE, width: 2.5, head: 12 });
      svg.arrow(cx + 54, cy - 22, cx + 44, cy - 52, { color: FORCE, width: 2.5, head: 11 });
      svg.arrow(cx + 54, cy + 22, cx + 44, cy + 52, { color: FORCE, width: 2.5, head: 11 });
      lab(svg, cx - 72, cy - 80, '**F**', { anchor: 'end', size: 20 });
      lab(svg, cx - 22, cy - 92, '**F**_∥', { anchor: 'start', size: 20 });
      lab(svg, cx + 72, cy - 80, '**F**', { anchor: 'start', size: 20 });
      lab(svg, cx + 34, cy - 66, '**F**_∥', { anchor: 'end', size: 20 });
      caption(svg, cx, 326, '(a)');
    }
    // (b)
    {
      const cx = 480;
      const cy = 160;
      const poly = egg(cx, cy);
      const view = { x: 330, y: 10, w: 300, h: 300 };
      const sol = chargedConductor(poly, view);
      fluxLines(svg, sol, poly, view, 26);
      drawConductor(svg, poly, { fill: EGG });
      chargeMarks(svg, poly, sol.E, { count: 20, inset: 8, size: 14 });
      caption(svg, cx, 326, '(b)');
    }
    // (c)
    {
      const cx = 800;
      const cy = 160;
      const poly = egg(cx, cy);
      const view = { x: 652, y: 10, w: 304, h: 300 };
      const pad = 280;
      const sol = solveLaplace({
        box: { x: view.x - pad, y: view.y - pad, w: view.w + 2 * pad, h: view.h + 2 * pad },
        step: 3,
        conductors: [{ poly, V: 0 }],
        outer: x => -(x - cx),
      });
      for (let y = view.y + 12; y < view.y + view.h; y += 22) {
        const pts = trace(sol.E, view.x + 1, y, 1, { box: view, stop: sol.inConductor, step: 2 });
        fieldLine(svg, pts, { at: 0.2 });
      }
      const orient = signedArea(poly) > 0 ? 1 : -1;
      let total = 0;
      const flux = (x, y, nx, ny) => {
        const [ex, ey] = sol.E(x + nx * 3, y + ny * 3);
        return Math.max(0, ex * nx + ey * ny);
      };
      walkOutline(poly, orient, (x, y, nx, ny, ds) => {
        total += flux(x, y, nx, ny) * ds;
      });
      // The egg is not mirror-symmetric, so the lines leaving its right side
      // are spaced by the outward flux there, as many as end on its left side.
      let ending = 0;
      for (let y = view.y + 12; y < view.y + view.h; y += 22) {
        const pts = trace(sol.E, view.x + 1, y, 1, { box: view, stop: sol.inConductor, step: 2 });
        if (sol.inConductor(...pts[pts.length - 1])) ending += 1;
      }
      const quantum = total / Math.max(1, ending);
      let acc = quantum / 2;
      walkOutline(poly, orient, (x, y, nx, ny, ds) => {
        acc += flux(x, y, nx, ny) * ds;
        if (acc >= quantum) {
          acc -= quantum;
          fieldLine(svg, trace(sol.E, x + nx * 3, y + ny * 3, 1, { box: view, step: 2 }), {
            at: 0.7,
          });
        }
      });
      drawConductor(svg, poly, { fill: EGG });
      chargeMarks(svg, poly, sol.E, { count: 16, inset: 8, size: 14 });
      caption(svg, cx, 326, '(c)');
    }
    return svg.render();
  },

  // 18.7 Fig. 7 — a pointed conductor
  Figure_18_07_08: () => {
    const svg = new Svg({
      width: 380,
      height: 560,
      title: 'A very pointed charged conductor',
      desc: 'A tall, cone-shaped positively charged conductor. Most of the excess charge is crowded at the sharp tip, and the field lines there are densely packed, fanning out from the point, so the field is very strong at the tip. Along the broad lower part a few charges are spread out and a few field lines leave the surface at right angles, so the field there is weak.',
    });
    const tip = [190, 150];
    const baseL = [158, 540];
    const baseR = [222, 540];
    // A dense fan of lines from the tip, each leaving the rounded point radially.
    for (let k = 0; k < 15; k += 1) {
      const a = rad(12 + (156 * k) / 14);
      const [ux, uy] = [Math.cos(a), -Math.sin(a)];
      const r2 = 150;
      svg.line(tip[0] + 6 * ux, tip[1] + 6 * uy, tip[0] + r2 * ux, tip[1] + r2 * uy, {
        color: FIELD,
        width: 1.8,
      });
      svg.arrow(tip[0] + 96 * ux, tip[1] + 96 * uy, tip[0] + 118 * ux, tip[1] + 118 * uy, {
        color: FIELD,
        width: 1.8,
        head: 12,
      });
    }
    // Sparse lines leaving the sides at right angles.
    const side = (P, Q, t, s) => {
      const x = P[0] + (Q[0] - P[0]) * t;
      const y = P[1] + (Q[1] - P[1]) * t;
      const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
      const nx = (s * (Q[1] - P[1])) / len;
      const ny = (s * -(Q[0] - P[0])) / len;
      svg.line(x, y, x + 150 * nx, y + 150 * ny, { color: FIELD, width: 1.8 });
      svg.arrow(x + 90 * nx, y + 90 * ny, x + 112 * nx, y + 112 * ny, {
        color: FIELD,
        width: 1.8,
        head: 12,
      });
      return [x, y, nx, ny];
    };
    const marks = [];
    for (const t of [0.4, 0.75]) {
      marks.push(side(tip, baseL, t, 1));
      marks.push(side(tip, baseR, t, -1));
    }
    svg.polygon(
      [baseL, [tip[0] - 3, tip[1] + 6], [tip[0], tip[1]], [tip[0] + 3, tip[1] + 6], baseR],
      {
        fill: '#b8bdc6',
        stroke: COLORS.black,
        width: 1.5,
      }
    );
    for (const [x, y, nx, ny] of marks)
      sign(svg, x - nx * 10, y - ny * 10, '+', { size: 18, color: COLORS.red });
    for (const [dx, dy] of [
      [0, 18],
      [-3, 32],
      [3, 32],
      [0, 46],
      [-5, 60],
      [5, 60],
    ]) {
      sign(svg, tip[0] + dx, tip[1] + dy, '+', { size: 13, color: COLORS.red });
    }
    return svg.render();
  },

  // 18.7 conceptual question — is this object a conductor?
  Figure_18_07_11: () => {
    const svg = new Svg({
      width: 440,
      height: 300,
      title: 'Field lines passing through an object',
      desc: 'An irregularly shaped object in an external electric field. The field lines enter the object at one end, continue through it, and leave at the other end; they do not meet its surface at right angles.',
    });
    svg.path(
      'M 160 120 C 170 90 220 92 250 100 C 285 108 290 140 280 170 C 272 196 240 200 210 192 C 175 186 150 170 160 120 Z',
      { color: '#c0392b', width: 2, fill: '#f6c9b8' }
    );
    const lines = [
      'M 20 60 C 140 50 300 50 420 70',
      'M 20 110 C 100 110 140 118 180 122 C 230 128 280 112 420 120',
      'M 20 150 C 100 150 150 148 200 150 C 250 152 290 156 420 160',
      'M 20 190 C 110 192 160 176 220 172 C 270 168 320 190 420 196',
      'M 20 250 C 160 270 300 250 420 230',
    ];
    for (const d of lines) svg.path(d, { color: FIELD, width: 2.2 });
    for (const [x, y] of [
      [80, 57],
      [80, 111],
      [80, 150],
      [80, 192],
      [80, 256],
    ]) {
      svg.arrow(x - 10, y, x + 10, y, { color: FIELD, width: 2.2, head: 13 });
    }
    for (const [x, y] of [
      [370, 65],
      [370, 118],
      [370, 158],
      [370, 192],
      [370, 238],
    ]) {
      svg.arrow(x - 10, y, x + 10, y + (y > 200 ? -2 : 1), { color: FIELD, width: 2.2, head: 13 });
    }
    return svg.render();
  },

  // 18.7 problem — four charges at the corners of a square, one at the center
  Figure_18_07_12: () => {
    const svg = new Svg({
      width: 380,
      height: 380,
      title: 'Four point charges on the corners of a square and one at its center',
      desc: 'Point charges qa at the top left, qb at the top right, qc at the bottom left and qd at the bottom right corners of a square, with a charge q at its center.',
    });
    svg.rect(60, 60, 260, 260, { stroke: '#999999', width: 1.2 });
    for (const [x, y, l, dx] of [
      [60, 60, 'q_a', 1],
      [320, 60, 'q_b', 1],
      [60, 320, 'q_c', 1],
      [320, 320, 'q_d', 1],
      [190, 190, 'q', 1],
    ]) {
      pcharge(svg, x, y, '', { r: 13, fill: '#f7e24a' });
      lab(svg, x + 18 * dx, y + 6, l, { anchor: 'start', size: 26 });
    }
    return svg.render();
  },

  // 18.7 problem — a rounded oblong conductor
  Figure_18_07_13: () => {
    const svg = new Svg({
      width: 400,
      height: 150,
      title: 'A rounded oblong conductor',
      desc: 'A neutral metal conductor shaped like a capsule: a long body with flat sides and rounded, semicircular ends.',
    });
    drawConductor(svg, capsule(200, 75, 340, 90), { fill: METAL });
    return svg.render();
  },

  // 18.7 problem — a lens-shaped conductor with pointed ends
  Figure_18_07_14: () => {
    const svg = new Svg({
      width: 400,
      height: 150,
      title: 'A pointed oblong conductor',
      desc: 'A neutral metal conductor shaped like a lens: two broad curved sides that meet in sharp points at the left and right ends.',
    });
    drawConductor(svg, spindle(200, 75, 340, 100), { fill: METAL });
    return svg.render();
  },

  // 18.7 problem — two non-parallel plates
  Figure_18_07_15: () => {
    const svg = new Svg({
      width: 600,
      height: 420,
      title: 'Two conducting plates, closer together at one end',
      desc: 'Two flat conducting plates seen edge on. The top plate tilts upward to the right; the bottom plate is nearly horizontal. They are closest together at the left end and farthest apart at the right.',
    });
    drawConductor(svg, plate([40, 250], [560, 70], 36), { fill: METAL });
    drawConductor(svg, plate([40, 330], [580, 360], 36), { fill: METAL });
    return svg.render();
  },

  // 18.7 problem — a nonuniformly charged insulating rod
  Figure_18_07_16: () => {
    const svg = new Svg({
      width: 480,
      height: 480,
      title: 'A charged insulating rod',
      desc: 'A diagonal insulating rod marked with plus signs. Most of the positive charge is crowded near its upper-right end, a few charges are in the middle, and one is at the lower-left end.',
    });
    const [x1, y1, x2, y2] = [40, 450, 440, 40];
    drawRod(svg, x1, y1, x2, y2, rodCharges(x1, y1, x2, y2, ROD_18));
    return svg.render();
  },

  // 18.7 problem — charges along the x axis
  Figure_18_07_17: () => {
    const svg = new Svg({
      width: 720,
      height: 230,
      title: 'Point charges along the x axis',
      desc: '(a) Charges +q at 3.00 cm, −2q at 8.00 cm and +q at 11.0 cm along the x axis. (b) Charges −2q at 1.00 cm, +q at 5.00 cm, +3q at 8.00 cm and −q at 14.0 cm.',
    });
    const X = cm => 70 + cm * 35;
    const axis = (y, list, cap) => {
      svg.arrow(X(-0.5), y, X(15.6), y, { color: COLORS.black, width: 1.6, head: 12 });
      for (let k = 0; k <= 15; k += 1)
        svg.line(X(k), y - 7, X(k), y + 7, { color: COLORS.black, width: 1.3 });
      for (const k of [0, 5, 10]) note(svg, X(k), y - 22, String(k));
      lab(svg, X(15.6) + 10, y - 2, 'x \\rm{(cm)}', { anchor: 'start', size: 18 });
      for (const [cm, l] of list) {
        svg.circle(X(cm), y, 8, { fill: COLORS.red, stroke: '#7a1818', width: 1 });
        lab(svg, X(cm), y + 28, l, { size: 20 });
      }
      note(svg, 26, y, cap);
    };
    axis(
      60,
      [
        [3, '+q'],
        [8, '−2q'],
        [11, '+q'],
      ],
      '(a)'
    );
    axis(
      170,
      [
        [1, '−2q'],
        [5, '+q'],
        [8, '+3q'],
        [14, '−q'],
      ],
      '(b)'
    );
    return svg.render();
  },

  // 18.7 problem — charges on an equilateral triangle
  Figure_18_07_18: () => {
    const svg = new Svg({
      width: 400,
      height: 380,
      title: 'Point charges at the corners of an equilateral triangle',
      desc: 'Point charges qa at the top corner, qb at the lower right corner and qc at the lower left corner of an equilateral triangle 25.0 cm on a side.',
    });
    const s = 300;
    const A = [200, 50];
    const B = [200 + s / 2, 50 + (s * Math.sqrt(3)) / 2];
    const C = [200 - s / 2, B[1]];
    svg.polygon([A, B, C], { fill: 'none', stroke: '#999999', width: 1.2 });
    for (const [P, l, dx, dy, anchor] of [
      [A, 'q_a', 20, 4, 'start'],
      [B, 'q_b', 20, 4, 'start'],
      [C, 'q_c', -20, 4, 'end'],
    ]) {
      pcharge(svg, ...P, '', { r: 13, fill: '#f7e24a' });
      lab(svg, P[0] + dx, P[1] + dy, l, { anchor, size: 26 });
    }
    return svg.render();
  },

  // 18.8 problem — plates that accelerate electrons through a hole
  Figure_18_08_07: () => {
    const svg = new Svg({
      width: 320,
      height: 560,
      title: 'Parallel plates accelerating an electron',
      desc: 'A negatively charged plate on the left and a positively charged plate on the right with a hole in its middle. The field lines run straight from the positive plate to the negative plate, pointing left, and bow outward at the top and bottom ends. An electron e⁻ between the plates is accelerated to the right, toward the hole.',
    });
    const ax = 20;
    const bx = 250;
    const w = 22;
    svg.rect(ax, 20, w, 520, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    svg.rect(bx, 20, w, 235, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    svg.rect(bx, 305, w, 235, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    const ys = [80, 130, 180, 230, 330, 380, 430, 480];
    for (const y of ys) hArrowLine(svg, bx, ax + w, y);
    fringeH(svg, bx, ax + w, 36, -22);
    fringeH(svg, bx, ax + w, 524, 22);
    sign(svg, ax + w / 2, 30, '−', { size: 20 });
    sign(svg, ax + w / 2, 530, '−', { size: 20 });
    for (const y of [36, ...ys, 524]) sign(svg, bx + w / 2, y, '+', { size: 20 });
    svg.circle(90, 280, 14, { fill: '#a98bd0', stroke: '#6b4f99', width: 1.5 });
    svg.text(90, 280, 'e^−', { size: 16, halo: false });
    svg.arrow(106, 280, 316, 280, { color: COLORS.black, width: 2, head: 15 });
    return svg.render();
  },

  // 18.8 problem — a charged ball hanging in a horizontal field
  Figure_18_08_08: () => {
    const svg = new Svg({
      width: 320,
      height: 400,
      title: 'A charged ball hanging in a horizontal electric field',
      desc: 'A charged ball q hangs from a string attached to a support. A horizontal electric field points to the right, and the ball is pushed to the right so that the string makes an angle of 8.00° with the vertical.',
    });
    const P = [110, 36];
    const L = 310;
    const B = [P[0] + L * Math.sin(rad(8)), P[1] + L * Math.cos(rad(8))];
    for (const y of [90, 150, 210, 270, 340]) hArrowLine(svg, 10, 310, y);
    svg.rect(30, 16, 260, 20, { fill: '#d9b46c', stroke: '#9a7a3a', width: 1.2 });
    svg.line(P[0], P[1], P[0], B[1] + 10, { color: COLORS.black, width: 1.5, dash: '6 5' });
    svg.line(...P, ...B, { color: COLORS.black, width: 3 });
    svg.arc(...P, 70, -90, -82, { color: COLORS.black, width: 1.6 });
    lab(svg, P[0] - 6, P[1] + 92, '8°', { anchor: 'end', size: 22 });
    svg.circle(...B, 20, { fill: '#c7cbd2', stroke: '#6f757d', width: 1.5 });
    lab(svg, B[0], B[1] + 2, 'q', { halo: false });
    return svg.render();
  },

  // 18.8 problem — an electron deflected between plates
  Figure_18_08_10: () => {
    const svg = new Svg({
      width: 580,
      height: 280,
      title: 'An electron deflected between charged plates',
      desc: 'Two parallel horizontal plates, positive on top and negative on the bottom, with the field between them pointing down. An electron enters from the left moving horizontally with velocity v0. The upward electric force bends its path into a parabola curving toward the positive plate, and it leaves with velocity v1 at an angle θ above the horizontal.',
    });
    const L = 160;
    const R = 460;
    const T = 70;
    const B = 210;
    svg.rect(L, T - 22, R - L, 22, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    svg.rect(L, B, R - L, 22, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    for (let x = L + 20; x < R; x += 50) {
      sign(svg, x, T - 11, '+', { size: 18 });
      sign(svg, x, B + 11, '−', { size: 18 });
      vArrowLine(svg, x + 5, T, B);
    }
    const y0 = 150;
    const rise = 34;
    const k = rise / (R - L) ** 2;
    const pts = [];
    for (let x = L; x <= R; x += 4) pts.push([x, y0 - k * (x - L) ** 2]);
    svg.line(70, y0, L, y0, { color: '#c0392b', width: 2.5 });
    svg.polyline(pts, { color: '#c0392b', width: 2.5 });
    const slope = 2 * k * (R - L);
    const ex = 560;
    const ey = y0 - rise - slope * (ex - R);
    svg.line(R, y0 - rise, ex - 30, ey + slope * 30, { color: '#c0392b', width: 2.5 });
    svg.arrow(ex - 70, ey + slope * 70, ex, ey, { color: COLORS.green, width: 3, head: 15 });
    lab(svg, ex - 10, ey - 18, '**v**_1', { anchor: 'end' });
    svg.arrow(70, y0, 140, y0, { color: COLORS.green, width: 3, head: 15 });
    lab(svg, 104, y0 + 24, '**v**_0');
    svg.text(56, y0, 'e^−', { size: 20, anchor: 'end' });
    svg.line(R, y0 - rise, ex - 10, y0 - rise, { color: COLORS.black, width: 1.2, dash: '5 4' });
    const th = (Math.atan(slope) * 180) / Math.PI;
    svg.arc(R, y0 - rise, 70, 0, th, { color: COLORS.black, width: 1.5 });
    lab(svg, R + 80, y0 - rise - 8, 'θ', { anchor: 'start', size: 20 });
    svg.xyIndicator(30, 60, { len: 40 });
    return svg.render();
  },

  // 18.8 Fig. — the Millikan oil-drop experiment
  Figure_18_08_11: () => {
    const svg = new Svg({
      width: 540,
      height: 300,
      title: 'The Millikan oil-drop experiment',
      desc: 'A small oil drop carrying charge q0 floats between two horizontal plates, positive on top and negative on the bottom, whose field points down. Because the drop’s excess charge is negative, the electric force on it is upward and can balance its weight. An observer watches the drop through a microscope from the side.',
    });
    const L = 200;
    const R = 500;
    const T = 50;
    const B = 250;
    svg.rect(L, T - 22, R - L, 22, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    svg.rect(L, B, R - L, 22, { fill: METAL, stroke: METAL_EDGE, width: 1.5 });
    for (let x = L + 20; x < R; x += 54) {
      sign(svg, x, T - 11, '+', { size: 18 });
      sign(svg, x, B + 11, '−', { size: 18 });
      vArrowLine(svg, x + 6, T, B);
    }
    svg.circle(382, 150, 16, { fill: '#f0a040', stroke: '#a0611c', width: 1.5 });
    lab(svg, 382, 152, 'q_0', { size: 18, halo: false });
    svg.rect(100, 128, 80, 44, { fill: '#e8d36a', stroke: '#9a8a2a', width: 1.2, rx: 6 });
    svg.ellipse(180, 150, 6, 22, { fill: '#cfe8ef', stroke: '#6a8a96', width: 1.2 });
    svg.ellipse(62, 150, 26, 16, { fill: '#ffffff', stroke: '#444444', width: 1.5 });
    svg.circle(72, 150, 9, { fill: '#3a7fc0' });
    svg.circle(74, 150, 4, { fill: COLORS.black });
    note(svg, 140, 196, 'microscope', { size: 18 });
    return svg.render();
  },

  // 18.8 problem — four charges on a square supporting a fifth above it
  Figure_18_08_12: () => {
    const svg = new Svg({
      width: 560,
      height: 400,
      title: 'Four charges on a horizontal square supporting a fifth charge above',
      desc: 'Four equal charges q on the corners of a horizontal square of side d, drawn in perspective, with dashed sides and diagonals. A fifth charge Q sits directly above the center of the square at a height d.',
    });
    const A = [60, 350];
    const Bp = [360, 350];
    const C = [500, 220];
    const D = [200, 220];
    const M = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    const Q = [M[0], M[1] - 200];
    for (const [P1, P2] of [
      [A, Bp],
      [Bp, C],
      [C, D],
      [D, A],
      [A, C],
      [Bp, D],
    ]) {
      svg.line(...P1, ...P2, { color: COLORS.black, width: 1.6, dash: '7 5' });
    }
    svg.line(...M, ...Q, { color: COLORS.black, width: 1.6 });
    for (const P of [A, Bp, C, D]) pcharge(svg, ...P, '', { r: 13, fill: '#f7e24a' });
    pcharge(svg, ...Q, '', { r: 14, fill: '#f7e24a' });
    lab(svg, Q[0] + 20, Q[1] - 8, 'Q', { anchor: 'start', size: 26 });
    lab(svg, A[0] + 4, A[1] + 32, 'q', { size: 24 });
    lab(svg, Bp[0] + 4, Bp[1] + 32, 'q', { size: 24 });
    lab(svg, C[0] + 24, C[1] + 4, 'q', { anchor: 'start', size: 24 });
    lab(svg, D[0] - 4, D[1] - 26, 'q', { size: 24 });
    lab(svg, (A[0] + Bp[0]) / 2, A[1] + 30, 'd', { size: 24 });
    lab(svg, (Bp[0] + C[0]) / 2 + 22, (Bp[1] + C[1]) / 2 + 6, 'd', { anchor: 'start', size: 24 });
    lab(svg, M[0] + 16, (M[1] + Q[1]) / 2, 'd', { anchor: 'start', size: 24 });
    return svg.render();
  },
};
