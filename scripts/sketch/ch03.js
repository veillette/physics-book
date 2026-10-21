import { C, Sketch } from './sketch.js';

const BLUE = '#1f77c8';
const GREEN = '#2e8b57';
const RED = C.disp;

/**
 * A two-dimensional sketch: x–y axes through the origin (pixel ox, oy), a
 * Frame that maps problem units to pixels, and a `draw` callback that adds the
 * vectors. Positive x is east and positive y is north unless the notes say
 * otherwise.
 */
function plane({
  title,
  desc,
  width,
  height,
  ox,
  oy,
  scale,
  xNeg = 40,
  xPos = 200,
  yNeg = 40,
  yPos = 150,
  xNote = '(east)',
  yNote = '(north)',
  draw,
}) {
  const s = new Sketch({ width, height, title, desc });
  s.axes2(ox, oy, { xNeg, xPos, yNeg, yPos, xNote, yNote });
  const f = s.frame({ ox, oy, scale });
  draw(s, f);
  return s.render();
}

/** Components of a vector of length r at math angle a (deg, CCW from +x). */
const polar = (r, a) => [r * Math.cos((a * Math.PI) / 180), r * Math.sin((a * Math.PI) / 180)];
const add = (p, q) => [p[0] + q[0], p[1] + q[1]];

/**
 * A labeled vector from `from` to `to` (problem units). The label sits `off`
 * pixels to the left of the direction of travel (negative: to the right).
 */
function vec(
  s,
  f,
  from,
  to,
  label,
  { color = RED, off = 16, along = 0.5, width = 3, dash, size = 16 } = {}
) {
  f.vec(from, to, { color, width, dash });
  if (label) f.labelSeg(from, to, label, { off, along, color, size });
  return to;
}

/** Dashed component line from a to b (problem units), optionally labeled. */
function comp(s, f, a, b, label, { color = '#777777', off = 14, size = 14 } = {}) {
  f.line(a, b, { color, width: 1.4, dash: '5 4' });
  if (label) f.labelSeg(a, b, label, { off, color, size });
}

const G = 9.8;

/**
 * A projectile sketch: +x horizontal in the direction of travel and +y up
 * (down when `yDown` is set), with the origin at pixel (ox, oy). Problem
 * coordinates are meters, mapped with sx and sy pixels per meter (sy ≠ sx
 * gives a vertically exaggerated sketch; the caller then notes it).
 * `draw(s, k)` receives the sketch and a kit of helpers:
 *   k.P(x, y)                     – meters → pixels
 *   k.path(x0, y0, vx, vy, t1)    – dashed trajectory from t = 0 to t1
 *   k.v0(x, y, angle, label, len) – launch velocity arrow (angle in degrees above +x)
 *   k.g(px, py, label)            – acceleration arrow and label
 *   k.at(x, y, lines, opts)       – knowns beside a point
 */
function proj({
  title,
  desc,
  width,
  height,
  ox,
  oy,
  sx,
  sy = sx,
  xNeg = 30,
  xPos,
  yNeg = 30,
  yPos,
  xNote = '',
  yNote = '(up)',
  yDown = false,
  ground,
  draw,
}) {
  const s = new Sketch({ width, height, title, desc });
  const P = (x, y) => [ox + x * sx, yDown ? oy + y * sy : oy - y * sy];
  if (ground !== undefined) {
    const [, gy] = P(0, ground);
    s.ground(ox - xNeg, ox + xPos - 24, gy);
  }
  s.axes2(ox, oy, { xNeg, xPos, yNeg, yPos, xNote, yNote, flipY: yDown });
  const sign = yDown ? 1 : -1;
  const k = {
    P,
    path(x0, y0, vx, vy, t1, { color = C.path, dash = '6 5', g = G } = {}) {
      const pts = [];
      for (let i = 0; i <= 60; i += 1) {
        const t = (t1 * i) / 60;
        pts.push(P(x0 + vx * t, y0 + vy * t + (sign === -1 ? -0.5 : 0.5) * g * t * t));
      }
      s.path(pts, { color, dash });
    },
    v0(x, y, angle, label, len = 60, { arc = true, arcLabel, lx = 0, ly = 0 } = {}) {
      const [px, py] = P(x, y);
      const a = (angle * Math.PI) / 180;
      const tx = px + len * Math.cos(a);
      const ty = py - len * Math.sin(a);
      s.vel(px, py, tx, ty, null);
      if (label) s.label(tx + 10 + lx, ty + 12 + ly, label, { anchor: 'start', color: C.vel });
      if (arc && angle !== 0) {
        s.ref(px, py, px + len + 10, py);
        s.angle(px, py, 34, Math.min(0, angle), Math.max(0, angle), arcLabel ?? null, { lr: 50 });
      }
    },
    g(px, py, label = 'a_y = −9.80 \\rm{m/s}^2', { up = false } = {}) {
      // Labels sit to the left of the arrow, so the arrow can hug the right edge.
      s.acc(px, py, px, py + (up ? -40 : 40), null);
      s.label(px - 8, py + 14, label, { anchor: 'end', color: C.acc, size: 15 });
      s.label(px - 8, py + 34, 'a_x = 0', { anchor: 'end', color: C.acc, size: 15 });
    },
    at(x, y, lines, { dx = 10, dy = 0, anchor = 'start', open = true, gap = 19 } = {}) {
      const [px, py] = P(x, y);
      s.dot(px, py, { open, r: 5 });
      lines.forEach((l, i) => s.label(px + dx, py + dy + i * gap, l, { anchor, size: 15 }));
    },
  };
  draw(s, k);
  return s.render();
}

export default {
  // 3.2 Problem 1 — path A: 3 blocks north, then 1 block east
  sketch_03_02_p01: () =>
    plane({
      title: 'Sketch of path A with its displacement',
      desc: 'Axes with +x east and +y north, origin at the start. Path A goes 3 blocks (360 m) north, then 1 block (120 m) east. The displacement R runs from the origin to (x, y) = (120 m, 360 m); its direction θ is measured from the +y (north) axis toward east.',
      width: 360,
      height: 320,
      ox: 90,
      oy: 270,
      scale: 0.6,
      xNeg: 40,
      xPos: 170,
      yNeg: 30,
      yPos: 245,
      draw: (s, f) => {
        const p1 = vec(s, f, [0, 0], [0, 360], '360 \\rm{m}', { color: BLUE, off: 30, size: 15 });
        vec(s, f, p1, [120, 360], '120 \\rm{m}', { color: BLUE, size: 15 });
        vec(s, f, [0, 0], [120, 360], '**R**', { color: RED, off: -16 });
        f.angle([0, 0], 71.6, 90, 60, 'θ', { labelR: 74 });
      },
    }),

  // 3.2 Problem 2 — path B: 4 east, 3 north, 3 west
  sketch_03_02_p02: () =>
    plane({
      title: 'Sketch of path B with its displacement',
      desc: 'Axes with +x east and +y north, origin at the start. Path B goes 4 blocks (480 m) east, 3 blocks (360 m) north, then 3 blocks (360 m) west, ending at (x, y) = (120 m, 360 m). The displacement R runs from the origin to that point; its direction θ is measured from the +y (north) axis toward east.',
      width: 440,
      height: 320,
      ox: 70,
      oy: 270,
      scale: 0.6,
      xNeg: 30,
      xPos: 320,
      yNeg: 30,
      yPos: 245,
      draw: (s, f) => {
        const p1 = vec(s, f, [0, 0], [480, 0], '480 \\rm{m}', { color: BLUE, off: -18, size: 15 });
        const p2 = vec(s, f, p1, [480, 360], '360 \\rm{m}', { color: BLUE, size: 15, off: 30 });
        vec(s, f, p2, [120, 360], '360 \\rm{m}', { color: BLUE, size: 15 });
        vec(s, f, [0, 0], [120, 360], '**R**', { color: RED, off: 16 });
        f.angle([0, 0], 71.6, 90, 60, 'θ', { labelR: 74 });
      },
    }),

  // 3.2 Problem 3 — components of the hikers' displacement
  sketch_03_02_p03: () =>
    plane({
      title: 'Sketch of the hikers’ displacement and its components',
      desc: 'Axes with +x east and +y north, origin at the cabin. The displacement S is 5.00 km at 40.0° north of east, that is, 40.0° counterclockwise from +x. Its east component S_x lies along +x and its north component S_y is parallel to +y.',
      width: 400,
      height: 300,
      ox: 70,
      oy: 250,
      scale: 50,
      xNeg: 30,
      xPos: 250,
      yNeg: 30,
      yPos: 210,
      draw: (s, f) => {
        const tip = polar(5, 40);
        vec(s, f, [0, 0], tip, '**S** (5.00 \\rm{km})', { color: RED, off: 22 });
        comp(s, f, [0, 0], [tip[0], 0], 'S_x = ?', { off: -16 });
        comp(s, f, [tip[0], 0], tip, 'S_y = ?', { off: -30 });
        f.angle([0, 0], 0, 40, 50, '40.0°', { labelR: 70 });
        f.text([0, 0], 'cabin', { dx: 8, dy: 16, math: false, size: 13, anchor: 'start' });
      },
    }),

  // 3.2 Problem 4 — 18.0 m west, then 25.0 m north
  sketch_03_02_p04: () =>
    plane({
      title: 'Sketch of the walk west then north',
      desc: 'Axes with +x east and +y north, origin at the start. A is 18.0 m west, along −x, ending at (−18.0 m, 0). B is 25.0 m north, along +y, from the tip of A. The resultant R = A + B runs from the origin to (−18.0 m, 25.0 m); its direction θ is measured from the −x (west) axis toward north.',
      width: 400,
      height: 300,
      ox: 260,
      oy: 250,
      scale: 8,
      xNeg: 200,
      xPos: 70,
      yNeg: 30,
      yPos: 220,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], [-18, 0], '**A** (18.0 \\rm{m})', {
          color: BLUE,
          off: 18,
          along: 0.6,
        });
        vec(s, f, a, [-18, 25], '**B** (25.0 \\rm{m})', { color: GREEN, off: 50 });
        vec(s, f, [0, 0], [-18, 25], '**R**', { color: RED, off: -16 });
        f.angle([0, 0], 125.8, 180, 46, 'θ', { labelR: 60 });
      },
    }),

  // 3.2 Problem 5 — A then B
  sketch_03_02_p05: () => walkAB('AB'),

  // 3.2 Problem 6 — B then A
  sketch_03_02_p06: () => walkAB('BA'),

  // 3.2 Problem 7 — subtraction: A − B and B − A
  sketch_03_02_p07: () => {
    const s = new Sketch({
      width: 640,
      height: 360,
      title: 'Sketch of the vector differences A − B and B − A',
      desc: 'Two panels, each with +x east and +y north and the origin at the start. (a) A, 12.0 m at 20.0° west of north (110° from +x), followed by −B, 20.0 m at 40.0° north of east (40° from +x); their sum R′ = A − B ends in the first quadrant. (b) B, 20.0 m at 40.0° south of west (220° from +x), followed by −A, 12.0 m at 20.0° east of south (290° from +x); their sum R″ = B − A ends in the third quadrant, opposite to R′.',
    });
    const A = polar(12, 110);
    const mB = polar(20, 40);
    // (a)
    s.axes2(130, 260, {
      xNeg: 100,
      xPos: 160,
      yNeg: 40,
      yPos: 230,
      xNote: '(east)',
      yNote: '(north)',
    });
    const fa = s.frame({ ox: 130, oy: 260, scale: 8 });
    vec(s, fa, [0, 0], A, '**A**', { color: BLUE, off: 14 });
    vec(s, fa, A, add(A, mB), '−**B**', { color: GREEN, off: 14 });
    vec(s, fa, [0, 0], add(A, mB), "**R**'", { color: RED, off: -16 });
    s.note(130, 345, '(a)  R′ = A − B');
    // (b)
    const B = polar(20, 220);
    const mA = polar(12, 290);
    s.axes2(530, 90, {
      xNeg: 230,
      xPos: 50,
      yNeg: 230,
      yPos: 50,
      xNote: '(east)',
      yNote: '(north)',
      originLabel: '',
    });
    const fb = s.frame({ ox: 530, oy: 90, scale: 8 });
    vec(s, fb, [0, 0], B, '**B**', { color: GREEN, off: -14 });
    vec(s, fb, B, add(B, mA), '−**A**', { color: BLUE, off: -14 });
    vec(s, fb, [0, 0], add(B, mA), "**R**''", { color: RED, off: 18 });
    s.note(450, 345, '(b)  R″ = B − A');
    return s.render();
  },

  // 3.2 Problem 8 — three vectors in two orders
  sketch_03_02_p08: () =>
    plane({
      title: 'Sketch of A + B + C and B + C + A',
      desc: 'Axes with +x and +y, angles measured counterclockwise from +x. A is 10.0 units at 30°, B is 8.0 units at 120°, and C is 6.0 units at 240°. Solid arrows: A, then B, then C, head to tail. Dashed arrows: B, then C, then A. Both chains end at the same point, so the resultant R is the same.',
      width: 420,
      height: 340,
      ox: 150,
      oy: 250,
      scale: 18,
      xNeg: 110,
      xPos: 220,
      yNeg: 60,
      yPos: 225,
      xNote: '',
      yNote: '',
      draw: (s, f) => {
        const A = polar(10, 30);
        const B = polar(8, 120);
        const Cv = polar(6, 240);
        const p1 = vec(s, f, [0, 0], A, '**A**', { color: BLUE, off: -16 });
        const p2 = vec(s, f, p1, add(p1, B), '**B**', { color: GREEN, off: -16 });
        vec(s, f, p2, add(p2, Cv), '**C**', { color: C.alt, off: -16 });
        const q1 = vec(s, f, [0, 0], B, '**B**', {
          color: GREEN,
          off: -14,
          along: 0.3,
          dash: '7 5',
        });
        const q2 = vec(s, f, q1, add(q1, Cv), '**C**', { color: C.alt, off: -14, dash: '7 5' });
        vec(s, f, q2, add(q2, A), '**A**', { color: BLUE, off: 14, along: 0.75, dash: '7 5' });
        vec(s, f, [0, 0], add(add(A, B), Cv), '**R**', { color: RED, off: -14, along: 0.5 });
      },
    }),
  // 3.3 Problem 1 — path C
  sketch_03_03_p01: () =>
    plane({
      title: 'Sketch of path C with its displacement',
      desc: 'Axes with +x east and +y north, origin at the start; each block is 120 m. Path C goes 1 block north, 5 east, 2 south, 1 west, 1 north, and 3 west, ending at (x, y) = (+120 m, 0). The displacement R runs from the origin along +x.',
      width: 360,
      height: 230,
      ox: 70,
      oy: 115,
      scale: 0.36,
      xNeg: 40,
      xPos: 250,
      yNeg: 75,
      yPos: 80,
      draw: (s, f) => {
        const pts = [
          [0, 0],
          [0, 120],
          [600, 120],
          [600, -120],
          [480, -120],
          [480, 0],
          [120, 0],
        ];
        for (let k = 0; k < pts.length - 1; k += 1)
          vec(s, f, pts[k], pts[k + 1], null, { color: BLUE, width: 2.2 });
        vec(s, f, [0, 0], [120, 0], '**R**', { color: RED, off: 14, width: 3.5 });
        f.text([300, 120], 'path C', { dy: -14, color: BLUE, size: 14, math: false });
      },
    }),

  // 3.3 Problem 2 — path D
  sketch_03_03_p02: () =>
    plane({
      title: 'Sketch of path D with its displacement',
      desc: 'Axes with +x east and +y north, origin at the start; each block is 120 m. Path D goes 2 blocks south, 6 east, 4 north, and 1 west, ending at (x, y) = (+600 m, +240 m). The displacement R runs from the origin to that point, at angle θ north of east (counterclockwise from +x).',
      width: 380,
      height: 260,
      ox: 70,
      oy: 125,
      scale: 0.36,
      xNeg: 40,
      xPos: 270,
      yNeg: 105,
      yPos: 100,
      draw: (s, f) => {
        const pts = [
          [0, 0],
          [0, -240],
          [720, -240],
          [720, 240],
          [600, 240],
        ];
        for (let k = 0; k < pts.length - 1; k += 1)
          vec(s, f, pts[k], pts[k + 1], null, { color: BLUE, width: 2.2 });
        vec(s, f, [0, 0], [600, 240], '**R**', { color: RED, off: 14 });
        f.angle([0, 0], 0, 21.8, 60, 'θ', { labelR: 74 });
        f.text([360, -240], 'path D', { dy: 16, color: BLUE, size: 14, math: false });
      },
    }),

  // 3.3 Problem 3 — San Francisco to Sacramento
  sketch_03_03_p03: () =>
    plane({
      title: 'Sketch of the displacement from San Francisco to Sacramento',
      desc: 'Axes with +x east and +y north, origin at San Francisco. The displacement R is 123 km at 45.0° north of east (45.0° counterclockwise from +x). Its east component R_x and north component R_y are both positive.',
      width: 360,
      height: 280,
      ox: 70,
      oy: 230,
      scale: 1.6,
      xNeg: 30,
      xPos: 200,
      yNeg: 30,
      yPos: 190,
      draw: (s, f) => {
        const tip = polar(123, 45);
        vec(s, f, [0, 0], tip, '**R** (123 \\rm{km})', { color: RED, off: 22 });
        comp(s, f, [0, 0], [tip[0], 0], 'R_x = ?', { off: -16, along: 0.7 });
        comp(s, f, [tip[0], 0], tip, 'R_y = ?', { off: -30 });
        f.angle([0, 0], 0, 45, 46, '45.0°', { labelR: 66 });
        f.text([0, 0], 'San Francisco', {
          dx: -14,
          dy: 30,
          math: false,
          size: 12,
          anchor: 'start',
        });
        f.text(tip, 'Sacramento', { dx: -8, dy: -12, math: false, size: 12, anchor: 'end' });
      },
    }),

  // 3.3 Problem 4 — 18.0 m west, then 25.0 m north (analytical)
  sketch_03_03_p04: () => westNorth('AB'),

  // 3.3 Problem 5 — 25.0 m north, then 18.0 m west
  sketch_03_03_p05: () => westNorth('BA'),

  // 3.3 Problem 6 — 7.50 km at 15.0° east of north
  sketch_03_03_p06: () =>
    plane({
      title: 'Sketch of the drive and its east and north legs',
      desc: 'Axes with +x east and +y north, origin at the start. The displacement R is 7.50 km at 15.0° east of north, so it makes 15.0° with the +y axis. Driving its components instead: east R_x then north R_y (dashed, lower right), or north R_y then east R_x (dashed, upper left), reaches the same point.',
      width: 330,
      height: 350,
      ox: 90,
      oy: 310,
      scale: 33,
      xNeg: 40,
      xPos: 150,
      yNeg: 25,
      yPos: 275,
      draw: (s, f) => {
        const tip = polar(7.5, 75);
        vec(s, f, [0, 0], [tip[0], 0], 'R_x', { color: BLUE, width: 2, dash: '6 4', off: -16 });
        vec(s, f, [tip[0], 0], tip, 'R_y', { color: BLUE, width: 2, dash: '6 4', off: -16 });
        vec(s, f, [0, 0], [0, tip[1]], null, { color: GREEN, width: 2, dash: '6 4' });
        vec(s, f, [0, tip[1]], tip, null, { color: GREEN, width: 2, dash: '6 4' });
        vec(s, f, [0, 0], tip, '**R** (7.50 \\rm{km})', { color: RED, off: 14, along: 0.75 });
        f.angle([0, 0], 75, 90, 70, '15.0°', { labelR: 92, dx: 4 });
      },
    }),

  // 3.3 Problem 7 — A − B and B − A (analytical)
  sketch_03_03_p07: () => {
    const s = new Sketch({
      width: 620,
      height: 330,
      title: 'Sketch of the walks for A − B and B − A',
      desc: 'Two panels, each with +x east and +y north and the origin at the start. (a) A, 18.0 m west (−x), then −B, 25.0 m south (−y): R′ = A − B ends at (−18.0 m, −25.0 m), at angle θ south of west. (b) B, 25.0 m north (+y), then −A, 18.0 m east (+x): R″ = B − A ends at (+18.0 m, +25.0 m), opposite to R′.',
    });
    // (a)
    s.axes2(220, 70, {
      xNeg: 190,
      xPos: 60,
      yNeg: 230,
      yPos: 40,
      xNote: '(east)',
      yNote: '(north)',
    });
    const fa = s.frame({ ox: 220, oy: 70, scale: 8 });
    const a = vec(s, fa, [0, 0], [-18, 0], '**A**', { color: BLUE, off: -16 });
    vec(s, fa, a, [-18, -25], '−**B**', { color: GREEN, off: -18 });
    vec(s, fa, [0, 0], [-18, -25], "**R**'", { color: RED, off: 16 });
    fa.angle([0, 0], 180, 234.2, 40, 'θ', { labelR: 54 });
    s.note(140, 318, '(a)  R′ = A − B');
    // (b)
    s.axes2(400, 280, {
      xNeg: 30,
      xPos: 180,
      yNeg: 30,
      yPos: 240,
      xNote: '(east)',
      yNote: '(north)',
    });
    const fb = s.frame({ ox: 400, oy: 280, scale: 8 });
    const b = vec(s, fb, [0, 0], [0, 25], '**B**', { color: GREEN, off: 18 });
    vec(s, fb, b, [18, 25], '−**A**', { color: BLUE, off: 16 });
    vec(s, fb, [0, 0], [18, 25], "**R**''", { color: RED, off: -18 });
    s.note(500, 318, '(b)  R″ = B − A');
    return s.render();
  },

  // 3.3 Problem 8 — triangular plot of land
  sketch_03_03_p08: () =>
    plane({
      title: 'Sketch of the triangular plot',
      desc: 'Axes with +x east and +y north, origin at the west corner. A is 80.0 m at 21.0° south of east (−21.0° from +x); B is 105 m at 11.0° west of north (101° from +x), drawn from the tip of A. The third side C closes the triangle back to the origin, so A + B + C = 0.',
      width: 360,
      height: 345,
      ox: 70,
      oy: 175,
      scale: 1.8,
      xNeg: 40,
      xPos: 230,
      yNeg: 140,
      yPos: 150,
      draw: (s, f) => {
        const A = polar(80, -21);
        const tip = add(A, polar(105, 101));
        vec(s, f, [0, 0], A, '**A** (80.0 \\rm{m})', { color: BLUE, off: -18 });
        vec(s, f, A, tip, '**B** (105 \\rm{m})', { color: GREEN, off: -18, along: 0.55 });
        vec(s, f, tip, [0, 0], '**C** = ?', { color: RED, off: -18 });
        f.angle([0, 0], -21, 0, 56, '21.0°', { labelR: 76, dy: 4 });
      },
    }),

  // 3.3 Problem 9 — 32.0 km at 35.0° south of west, standard and rotated axes
  sketch_03_03_p09: () => {
    const s = new Sketch({
      width: 520,
      height: 380,
      title: 'Sketch of the flight in standard and rotated axes',
      desc: 'Axes with +x east and +y north, origin at the start. The displacement R is 32.0 km at 35.0° south of west (215° from +x). (a) Its west and south components lie along −x and −y. (b) Rotated axes, drawn in orange: +x′ points 45.0° south of west and +y′ points 45.0° west of north; R makes 10.0° with +x′, on the +y′ side.',
    });
    const ox = 400;
    const oy = 140;
    s.axes2(ox, oy, {
      xNeg: 360,
      xPos: 60,
      yNeg: 220,
      yPos: 110,
      xNote: '(east)',
      yNote: '(north)',
    });
    const f = s.frame({ ox, oy, scale: 9.5 });
    const tip = polar(32, 215);
    comp(s, f, [0, 0], [tip[0], 0], 'R_x', { off: 14 });
    comp(s, f, [tip[0], 0], tip, 'R_y', { off: 16 });
    // rotated axes
    const xp = polar(29, 225);
    const yp = polar(16, 135);
    f.vec([0, 0], xp, { color: C.alt, width: 1.6, head: 10 });
    f.vec([0, 0], yp, { color: C.alt, width: 1.6, head: 10 });
    f.text(xp, "+x'", { dx: -6, dy: 14, color: C.alt, size: 16 });
    f.text(yp, "+y'", { dx: -10, dy: -8, color: C.alt, size: 16 });
    vec(s, f, [0, 0], tip, '**R** (32.0 \\rm{km})', { color: RED, off: -18, along: 0.75 });
    f.angle([0, 0], 180, 215, 60, '35.0°', { labelR: 86 });
    f.angle([0, 0], 215, 225, 130, '10.0°', { labelR: 150, color: C.alt });
    return s.render();
  },

  // 3.3 Problem 10 — four-sided plot
  sketch_03_03_p10: () =>
    plane({
      title: 'Sketch of the four-sided plot',
      desc: 'Axes with +x east and +y north, origin at the start of A. A is 4.70 km at 7.5° south of east (−7.5° from +x); B is 2.48 km at 16.0° west of north (106° from +x); C is 3.02 km at 19.0° north of west (161° from +x). The fourth side D closes the figure back to the origin, so A + B + C + D = 0.',
      width: 430,
      height: 300,
      ox: 60,
      oy: 210,
      scale: 60,
      xNeg: 30,
      xPos: 310,
      yNeg: 70,
      yPos: 190,
      draw: (s, f) => {
        const p1 = vec(s, f, [0, 0], polar(4.7, -7.5), '**A**', { color: BLUE, off: -16 });
        const p2 = vec(s, f, p1, add(p1, polar(2.48, 106)), '**B**', { color: GREEN, off: -16 });
        const p3 = vec(s, f, p2, add(p2, polar(3.02, 161)), '**C**', { color: C.alt, off: -16 });
        vec(s, f, p3, [0, 0], '**D** = ?', { color: RED, off: -18 });
      },
    }),

  // 3.3 Problem 11 — Gilligan's seven legs
  sketch_03_03_p11: () =>
    plane({
      title: 'Sketch of Gilligan’s raft trip',
      desc: 'Axes with +x east and +y north, origin at the island. Seven displacements are drawn head to tail (blue): 2.50 km at 45.0° north of west, 4.70 km at 60.0° south of east, 1.30 km at 25.0° south of west, 5.10 km east, 1.70 km at 5.0° east of north, 7.20 km at 55.0° south of west, and 2.80 km at 10.0° north of east. The resultant R runs from the island to the end of the last leg, in the fourth quadrant (south of east).',
      width: 440,
      height: 420,
      ox: 200,
      oy: 120,
      scale: 34,
      xNeg: 160,
      xPos: 190,
      yNeg: 280,
      yPos: 90,
      draw: (s, f) => {
        const legs = [
          [2.5, 135],
          [4.7, -60],
          [1.3, 205],
          [5.1, 0],
          [1.7, 85],
          [7.2, 235],
          [2.8, 10],
        ];
        let p = [0, 0];
        legs.forEach(([r, a], k) => {
          const q = add(p, polar(r, a));
          vec(s, f, p, q, `${k + 1}`, { color: BLUE, width: 2.2, off: 12, size: 13 });
          p = q;
        });
        vec(s, f, [0, 0], p, '**R**', { color: RED, off: -16 });
        f.text([0, 0], 'island', { dx: 8, dy: -12, math: false, size: 12, anchor: 'start' });
      },
    }),

  // 3.4 Problem 1 — projectile hits a raised target after 3.00 s
  sketch_03_04_p01: () =>
    proj({
      title: 'Sketch of the projectile striking the target',
      desc: 'Axes with +x horizontal in the direction of launch and +y up, origin at the launch point on the ground. v_0 = 50.0 m/s at 30.0° above +x. After t = 3.00 s the projectile strikes the target at unknown (x, y). The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 250,
      ox: 50,
      oy: 200,
      sx: 2.2,
      xPos: 370,
      yPos: 170,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 43.3, 25, 3);
        k.v0(0, 0, 30, 'v_0 = 50.0 \\rm{m/s}', 70, { arcLabel: '30.0°' });
        k.at(129.9, 30.9, ['t = 3.00 \\rm{s}', 'x = ?,  y = ?'], { dy: 22, dx: -10 });
        k.g(450, 50);
      },
    }),

  // 3.4 Problem 2 — ball kicked with v0x = 16 m/s, v0y = 12 m/s
  sketch_03_04_p02: () =>
    proj({
      title: 'Sketch of the kicked ball',
      desc: 'Axes with +x horizontal in the direction of the kick and +y up, origin at the kick point on level ground. Initial components v_0x = +16 m/s and v_0y = +12 m/s. The ball reaches maximum height y_max (unknown) and lands at y = 0 at an unknown time, with v_x = 16 m/s and v_y negative. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 250,
      ox: 50,
      oy: 200,
      sx: 8,
      xPos: 350,
      yPos: 160,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 16, 12, 2.449);
        const [px, py] = k.P(0, 0);
        s.vel(px, py, px + 64, py, null, { width: 2, dash: '5 4' });
        s.vel(px, py, px, py - 48, null, { width: 2, dash: '5 4' });
        s.vel(px, py, px + 64, py - 48, null);
        s.label(px + 64, py + 18, 'v_{0x} = +16 \\rm{m/s}', { color: C.vel, size: 14 });
        s.label(px + 6, py - 60, 'v_{0y} = +12 \\rm{m/s}', {
          color: C.vel,
          size: 14,
          anchor: 'start',
        });
        const [tx, ty] = k.P(19.6, 7.35);
        s.svg.line(tx, ty, tx, py, { color: '#999999', width: 1.2, dash: '4 4' });
        s.label(tx + 6, (ty + py) / 2 + 10, 'y_{max} = ?', { anchor: 'start', size: 15 });
        k.at(39.2, 0, ['lands: t = ?,  v = ?'], { dy: 26, dx: 0, anchor: 'middle' });
        k.g(450, 40);
      },
    }),

  // 3.4 Problem 3 — ball thrown horizontally from a 60.0-m building
  sketch_03_04_p03: () =>
    proj({
      title: 'Sketch of the ball thrown horizontally from the building',
      desc: 'Axes with +x horizontal, away from the building, and +y up, origin on the ground at the base of the building. The ball leaves the roof at (0, 60.0 m) with horizontal velocity v_0x (unknown) and v_0y = 0. It lands at (100.0 m, 0) after an unknown time. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 250,
      ox: 130,
      oy: 205,
      sx: 2.6,
      sy: 2.6,
      xPos: 310,
      yPos: 185,
      ground: 0,
      draw: (s, k) => {
        const [, by] = k.P(0, 60);
        s.cliff(40, 130, by, 205);
        k.path(0, 60, 28.57, 0, 3.5);
        k.v0(0, 60, 0, 'v_{0x} = ?', 55, { arc: false, ly: -30 });
        s.label(85, by + 22, 'y_0 = 60.0 \\rm{m}', { size: 15 });
        k.at(100, 0, ['x = 100.0 \\rm{m},  y = 0;  t = ?,  v = ?'], {
          dy: 26,
          dx: 20,
          anchor: 'end',
        });
        k.g(450, 40);
      },
    }),

  // 3.4 Problem 4 — motorcycle jump over buses
  sketch_03_04_p04: () =>
    proj({
      title: 'Sketch of the motorcycle jump over the buses',
      desc: 'Axes with +x horizontal toward the buses and +y up, origin at the top of the takeoff ramp, level with the bus roofs. v_0 = 40.0 m/s at 32.0° above +x. The motorcycle lands back at y = 0 at an unknown range R; each bus is 20.0 m long. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 520,
      height: 230,
      ox: 70,
      oy: 160,
      sx: 2.4,
      xPos: 400,
      yPos: 130,
      draw: (s, k) => {
        s.svg.polygon(
          [
            [20, 200],
            [70, 160],
            [70, 200],
          ],
          { fill: '#e8dcd0', stroke: C.ground }
        );
        for (let i = 0; i < 8; i += 1) {
          const [x1] = k.P(i * 20 + 1, 0);
          s.svg.rect(x1, 162, 20 * 2.4 - 4, 30, { fill: '#f9e79f', stroke: '#b7950b', width: 1 });
        }
        k.path(0, 0, 33.92, 21.2, 4.326);
        k.v0(0, 0, 32, 'v_0 = 40.0 \\rm{m/s}', 60, { arcLabel: '32.0°', lx: -60, ly: -40 });
        k.at(146.8, 0, ['R = ?'], { dy: -16, dx: 6 });
        s.note(270, 212, 'buses, 20.0 m each');
        k.g(490, 40);
      },
    }),

  // 3.4 Problem 5 — archer and the overhanging branch
  sketch_03_04_p05: () =>
    proj({
      title: 'Sketch of the arrow’s path past the branch',
      desc: 'Axes with +x horizontal toward the target and +y up, origin at the release point. v_0 = 35.0 m/s at unknown angle θ above +x; the bull’s-eye is at (75.0 m, 0). Halfway, at x = 37.5 m, a branch is 3.50 m above the release height. The acceleration is a_y = −9.80 m/s², a_x = 0. The vertical scale is exaggerated.',
      width: 520,
      height: 235,
      ox: 50,
      oy: 170,
      sx: 5,
      sy: 10,
      yNeg: 40,
      xPos: 420,
      yPos: 140,
      draw: (s, k) => {
        k.path(0, 0, 33.21, 11.05, 2.258);
        k.v0(0, 0, 33.6, 'v_0 = 35.0 \\rm{m/s}', 70, { arcLabel: 'θ = ?', lx: 4, ly: 6 });
        const [bx, by] = k.P(37.5, 3.5);
        const [, b0] = k.P(37.5, 0);
        s.svg.line(bx - 50, by, bx + 30, by, { color: '#8d5524', width: 4 });
        s.svg.line(bx + 30, by - 30, bx + 30, b0 + 40, { color: '#8d5524', width: 6 });
        s.dim(bx + 44, b0, bx + 44, by, '3.50 \\rm{m}', { lx: bx + 50, anchor: 'start' });
        s.note(260, 222, 'vertical scale exaggerated');
        s.ref(k.P(0, 0)[0], b0, k.P(80, 0)[0], b0);
        s.svg.line(k.P(75, 0)[0], b0 - 18, k.P(75, 0)[0], b0 + 18, { color: C.disp, width: 4 });
        s.label(k.P(75, 0)[0], b0 + 32, '75.0 \\rm{m}', { size: 15 });
        s.label(bx, b0 + 32, '37.5 \\rm{m}', { size: 15 });
        k.g(490, 30);
      },
    }),

  // 3.4 Problem 6 — rugby pass
  sketch_03_04_p06: () =>
    proj({
      title: 'Sketch of the rugby pass',
      desc: 'Axes with +x horizontal in the direction of the pass and +y up, origin at the release point. v_0 = 12.0 m/s at unknown angle θ above +x. The ball is caught at the same height, at (7.00 m, 0). The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 460,
      height: 210,
      ox: 50,
      oy: 160,
      sx: 40,
      xPos: 340,
      yPos: 120,
      draw: (s, k) => {
        k.path(0, 0, 11.63, 2.944, 0.601);
        k.v0(0, 0, 14.2, 'v_0 = 12.0 \\rm{m/s}', 70, { arcLabel: 'θ = ?' });
        k.at(7, 0, ['x = 7.00 \\rm{m},  y = 0'], { dy: 22, dx: 0, anchor: 'middle' });
        k.g(430, 30);
      },
    }),

  // 3.4 Problem 9 — battleship cannon at maximum range
  sketch_03_04_p09: () =>
    proj({
      title: 'Sketch of the shell at maximum range',
      desc: 'Axes with +x horizontal in the direction of fire and +y up, origin at the cannon. For maximum range the shell is fired at 45.0° above +x with unknown speed v_0, rises to an unknown maximum height h, and lands at y = 0 at x = R = 32.0 km. The acceleration is a_y = −9.80 m/s², a_x = 0 (air resistance neglected).',
      width: 500,
      height: 230,
      ox: 50,
      oy: 180,
      sx: 0.0115,
      xPos: 400,
      yPos: 150,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 396, 396, 80.8);
        k.v0(0, 0, 45, 'v_0 = ?', 60, { arcLabel: '45.0°', lx: 30, ly: 14 });
        const [tx, ty] = k.P(16000, 8000);
        s.svg.line(tx, ty, tx, 180, { color: '#999999', width: 1.2, dash: '4 4' });
        s.label(tx + 6, (ty + 180) / 2, 'h = ?', { anchor: 'start', size: 15 });
        k.at(32000, 0, ['R = 32.0 \\rm{km}'], { dy: -16, dx: -6, anchor: 'end' });
        k.g(470, 30);
      },
    }),

  // 3.4 Problem 10 — arrow landing on a cliff
  sketch_03_04_p10: () =>
    proj({
      title: 'Sketch of the arrow shot onto the cliff',
      desc: 'Axes with +x horizontal toward the cliff and +y up, origin on the ground below the archer. The arrow leaves from y_0 = 1.5 m with v_0 = 30 m/s at 60° above horizontal and lands on the top edge of the cliff, of unknown height H, at t = 4.0 s. Its maximum height y_max is unknown. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 520,
      height: 260,
      ox: 100,
      oy: 230,
      sx: 4.5,
      xPos: 340,
      yPos: 205,
      ground: 0,
      draw: (s, k) => {
        const [cx, cy] = k.P(60, 27.1);
        s.cliff(cx, cx + 90, cy, 230);
        k.path(0, 1.5, 15, 25.98, 4);
        k.v0(0, 1.5, 60, 'v_0 = 30 \\rm{m/s}', 55, { arcLabel: '60°' });
        s.label(k.P(0, 1.5)[0] - 8, k.P(0, 1.5)[1], 'y_0 = 1.5 \\rm{m}', {
          anchor: 'end',
          size: 14,
        });
        k.at(60, 27.1, ['t = 4.0 \\rm{s}', 'y = H = ?'], { dx: 12, dy: 24 });
        const [mx, my] = k.P(39.8, 36);
        s.label(mx, my - 12, 'y_{max} = ?', { size: 15 });
        k.g(450, 30);
      },
    }),

  // 3.4 Problem 11 — standing broad jump
  sketch_03_04_p11: () =>
    proj({
      title: 'Sketch of the standing broad jump',
      desc: 'Axes with +x horizontal in the direction of the jump and +y up, origin at the takeoff point. Assumed: takeoff at 45° above +x with speed v_0 (found from the 0.600-m push at 1.25g), landing at the same height, at unknown range R. In flight, a_y = −9.80 m/s², a_x = 0.',
      width: 440,
      height: 210,
      ox: 50,
      oy: 160,
      sx: 160,
      xPos: 330,
      yPos: 120,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 2.711, 2.711, 0.5533);
        k.v0(0, 0, 45, 'v_0 = ?', 60, { arcLabel: '45°', lx: 30, ly: 14 });
        k.at(1.5, 0, ['R = ?'], { dy: -16, dx: 6 });
        k.g(410, 30);
      },
    }),

  // 3.4 Problem 12 — long jump
  sketch_03_04_p12: () =>
    proj({
      title: 'Sketch of the long jump as a projectile',
      desc: 'Axes with +x horizontal in the direction of the jump and +y up, origin at the takeoff point. Assumed: takeoff speed v_0 = 9.5 m/s at 45° above +x, landing at the same height, at unknown maximum range R. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 440,
      height: 210,
      ox: 50,
      oy: 160,
      sx: 30,
      xPos: 330,
      yPos: 120,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 6.718, 6.718, 1.371);
        k.v0(0, 0, 45, 'v_0 = 9.5 \\rm{m/s}', 60, { arcLabel: '45°', lx: 30, ly: 14 });
        k.at(9.21, 0, ['R = ?'], { dy: -16, dx: 6 });
        k.g(410, 30);
      },
    }),

  // 3.4 Problem 13 — tennis serve over the net
  sketch_03_04_p13: () =>
    proj({
      title: 'Sketch of the tennis serve',
      desc: 'Axes with +x horizontal toward the net and +y up, origin on the court directly below the point where the ball is hit. The ball leaves from y_0 = 2.5 m with v_0 = 170 km/h at unknown angle θ below the horizontal. The net, 0.91 m high, is at x = 11.9 m; the service line is 6.40 m beyond the net, at x = 18.3 m. The acceleration is a_y = −9.80 m/s², a_x = 0. The vertical scale is exaggerated.',
      width: 600,
      height: 230,
      ox: 100,
      oy: 190,
      sx: 24,
      sy: 50,
      xPos: 480,
      yPos: 165,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 2.5, 47.2, -3.06, 0.34);
        const [px, py] = k.P(0, 2.5);
        s.ref(px, py, px + 100, py);
        s.vel(px, py, px + 88, py + 19, null);
        s.angle(px, py, 60, -12, 0, 'θ = ?', { lr: 70, dy: 14, dx: 20 });
        s.label(px + 24, py - 16, 'v_0 = 170 \\rm{km/h}', {
          anchor: 'start',
          color: C.vel,
          size: 15,
        });
        s.label(px - 8, py, 'y_0 = 2.5 \\rm{m}', { anchor: 'end', size: 14 });
        const [nx, ny] = k.P(11.9, 0.91);
        s.svg.line(nx, ny, nx, 190, { color: '#333333', width: 3 });
        s.label(nx - 6, ny + 20, 'net: 0.91 \\rm{m}', { anchor: 'end', size: 14 });
        s.label(nx, 210, '11.9 \\rm{m}', { size: 14 });
        const [lx] = k.P(18.3, 0);
        s.svg.line(lx, 184, lx, 196, { color: '#333333', width: 3 });
        s.label(lx, 210, '18.3 \\rm{m}', { size: 14 });
        s.note(lx - 6, 176, 'service line', { anchor: 'end' });
        k.g(530, 30);
      },
    }),

  // 3.4 Problem 14 — quarterback's pass
  sketch_03_04_p14: () =>
    proj({
      title: 'Sketch of the forward pass',
      desc: 'Axes with +x horizontal downfield and +y up, origin at the release point, fixed to the ground. The ball leaves at unknown speed v_0 at 25.0° above +x (relative to the ground) and is caught at the same height at (18.0 m, 0). Its maximum height h above the release point is unknown. The quarterback himself moves backward, in −x, at 2.00 m/s. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 210,
      ox: 70,
      oy: 160,
      sx: 18,
      xPos: 360,
      yPos: 120,
      draw: (s, k) => {
        k.path(0, 0, 13.78, 6.43, 1.312);
        k.v0(0, 0, 25, 'v_0 = ?', 64, { arcLabel: '25.0°', lx: -14, ly: -34 });
        k.at(18, 0, ['x = 18.0 \\rm{m},  y = 0'], { dy: 22, dx: 0, anchor: 'middle' });
        const [tx, ty] = k.P(9, 2.1);
        s.svg.line(tx, ty, tx, 160, { color: '#999999', width: 1.2, dash: '4 4' });
        s.label(tx + 6, ty + 18, 'h = ?', { anchor: 'start', size: 15 });
        s.arrow(60, 190, 20, 190, C.alt, null, { width: 2.2 });
        s.label(66, 190, 'QB: 2.00 \\rm{m/s}', { anchor: 'start', color: C.alt, size: 14 });
        k.g(450, 30);
      },
    }),

  // 3.4 Problem 15 — gun sighted for 100 m, target at 150 m
  sketch_03_04_p15: () =>
    proj({
      title: 'Sketch of the bullet’s path for a gun sighted at 100 m',
      desc: 'Axes with +x horizontal toward the target and +y up, origin at the muzzle. The barrel points a small angle θ above +x so that, with v_0 = 275 m/s, the bullet returns to y = 0 at x = 100.0 m. At x = 150.0 m the bullet is at unknown y, below the aiming line. The acceleration is a_y = −9.80 m/s², a_x = 0. Angles and heights are greatly exaggerated.',
      width: 540,
      height: 220,
      ox: 50,
      oy: 110,
      sx: 2.9,
      sy: 60,
      xPos: 460,
      yPos: 80,
      yNeg: 70,
      draw: (s, k) => {
        k.path(0, 0, 275, 1.786, 0.545);
        k.v0(0, 0, 12, 'v_0 = 275 \\rm{m/s}', 70, { arcLabel: 'θ', lx: -30, ly: -40 });
        k.at(100, 0, ['100.0 \\rm{m}'], { dy: -16, dx: 0, anchor: 'middle' });
        k.at(150, -0.486, ['x = 150.0 \\rm{m}', 'y = ?'], { dy: 20, dx: -8, anchor: 'end' });
        s.note(270, 205, 'not to scale: θ and the drop are exaggerated');
        k.g(170, 140);
      },
    }),

  // 3.4 Problem 16 — fish dropped by the eagle
  sketch_03_04_p16: () =>
    proj({
      title: 'Sketch of the fish falling from the eagle',
      desc: 'Axes with +x horizontal in the eagle’s direction of flight and +y up, origin where the fish is released. The fish starts with v_0x = +3.00 m/s and v_0y = 0 and hits the water at y = −5.00 m with unknown velocity v. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 420,
      height: 260,
      ox: 60,
      oy: 50,
      sx: 34,
      yNeg: 190,
      xPos: 240,
      yPos: 30,
      ground: -5,
      draw: (s, k) => {
        k.path(0, 0, 3, 0, 1.01);
        k.v0(0, 0, 0, 'v_{0x} = +3.00 \\rm{m/s}', 50, { arc: false, ly: 22 });
        k.at(3.03, -5, ['y = −5.00 \\rm{m}', 'v = ?'], { dx: 12, dy: -30 });
        s.svg.line(0, 0, 0, 0);
        k.g(390, 80);
      },
    }),

  // 3.4 Problem 17 — owl drops the mouse
  sketch_03_04_p17: () =>
    proj({
      title: 'Sketch of the mouse falling toward the nest',
      desc: 'Axes with +x east and +y DOWN, origin where the owl drops the mouse. The mouse starts with the owl’s velocity, 3.50 m/s at 30.0° below the horizontal, so v_0x = +3.03 m/s and v_0y = +1.75 m/s. The 30.0-cm nest is centered at x = 4.00 m, y = 12.0 m. The acceleration is a_y = +9.80 m/s² (down), a_x = 0. The question is the mouse’s x when y = 12.0 m.',
      width: 420,
      height: 330,
      ox: 70,
      oy: 50,
      sx: 22,
      xPos: 230,
      yPos: 255,
      xNote: '(east)',
      yNote: '(down)',
      yDown: true,
      draw: (s, k) => {
        k.path(0, 0, 3.031, 1.75, 1.4);
        const [px, py] = k.P(0, 0);
        s.vel(px, py, px + 52, py + 30, null);
        s.label(px + 62, py + 46, 'v_0 = 3.50 \\rm{m/s}', {
          anchor: 'start',
          color: C.vel,
          size: 15,
        });
        s.ref(px, py, px + 70, py);
        s.angle(px, py, 34, -30, 0, '30.0°', { lr: 52, dy: 4 });
        const [nx, ny] = k.P(4, 12);
        s.svg.path(`M ${nx - 14} ${ny} q 14 12 28 0`, { color: '#8d5524', width: 4 });
        s.label(nx + 20, ny + 4, 'nest: x = 4.00 \\rm{m},  y = 12.0 \\rm{m}', {
          anchor: 'start',
          size: 14,
        });
        s.label(nx + 20, ny - 30, 'x = ? when y = 12.0 \\rm{m}', { anchor: 'start', size: 14 });
        k.g(390, 70, 'a_y = +9.80 \\rm{m/s}^2');
      },
    }),

  // 3.4 Problem 18 — soccer ball just clearing the crossbar
  sketch_03_04_p18: () =>
    proj({
      title: 'Sketch of the kick over the crossbar',
      desc: 'Axes with +x horizontal toward the goal and +y up, origin at the kick. The ball leaves at unknown speed v_0 at 40° above +x and just passes over the crossbar at (30 m, 2.4 m). The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 230,
      ox: 50,
      oy: 190,
      sx: 11,
      xPos: 380,
      yPos: 160,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 13.33, 11.19, 2.36);
        k.v0(0, 0, 40, 'v_0 = ?', 60, { arcLabel: '40°', lx: 30, ly: 14 });
        const [gx, gy] = k.P(30, 2.4);
        s.svg.polyline(
          [
            [gx, 190],
            [gx, gy],
            [gx + 26, gy],
            [gx + 26, 190],
          ],
          { color: '#333333', width: 3 }
        );
        k.at(30, 2.4, ['(30 \\rm{m}, 2.4 \\rm{m})'], { dx: 13, dy: 46, anchor: 'middle' });
        k.g(450, 30);
      },
    }),

  // 3.4 Problem 19 — goalkeeper's long kick
  sketch_03_04_p19: () =>
    proj({
      title: 'Sketch of the goalkeeper’s longest kick',
      desc: 'Axes with +x horizontal toward the opponent’s goal and +y up, origin at the kick. For maximum range the ball leaves at 45° above +x with v_0 = 30 m/s and lands at y = 0 at unknown range R; the opponent’s goal is 95 m away. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 480,
      height: 220,
      ox: 50,
      oy: 180,
      sx: 3.6,
      xPos: 380,
      yPos: 150,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 21.21, 21.21, 4.329);
        k.v0(0, 0, 45, 'v_0 = 30 \\rm{m/s}', 60, { arcLabel: '45°', lx: 30, ly: 14 });
        k.at(91.8, 0, ['R = ?'], { dy: -16, dx: -8, anchor: 'end' });
        const [gx] = k.P(95, 0);
        s.svg.polyline(
          [
            [gx, 180],
            [gx, 168],
            [gx + 10, 168],
            [gx + 10, 180],
          ],
          { color: '#333333', width: 3 }
        );
        s.label(gx + 5, 200, '95 \\rm{m}', { size: 14 });
        k.g(450, 30);
      },
    }),

  // 3.4 Problem 20 — free throw
  sketch_03_04_p20: () =>
    proj({
      title: 'Sketch of the free throw',
      desc: 'Axes with +x horizontal toward the basket and +y up, origin at the release point, 2.44 m above the floor. The ball leaves with v_0 = 8.15 m/s at unknown angle θ above +x and enters the basket at (4.57 m, +0.61 m), since the rim is 3.05 m above the floor. The floor is at y = −2.44 m. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 500,
      height: 290,
      ox: 120,
      oy: 160,
      sx: 50,
      xPos: 330,
      yPos: 130,
      yNeg: 125,
      ground: -2.44,
      draw: (s, k) => {
        k.path(0, 0, 5.48, 6.03, 0.834);
        k.v0(0, 0, 47.7, 'v_0 = 8.15 \\rm{m/s}', 64, { arcLabel: 'θ = ?', lx: 30, ly: 20 });
        const [bx, by] = k.P(4.57, 0.61);
        s.svg.line(bx - 12, by, bx + 14, by, { color: '#d35400', width: 3 });
        s.svg.line(bx + 14, by - 40, bx + 14, by + 162, { color: '#555555', width: 3 });
        k.at(4.57, 0.61, ['(4.57 \\rm{m}, +0.61 \\rm{m})'], { dx: -14, dy: -16, anchor: 'end' });
        const [, fy] = k.P(0, -2.44);
        s.dim(70, 160, 70, fy, '2.44 \\rm{m}', { lx: 64, anchor: 'end' });
        k.g(430, 20);
      },
    }),

  // 3.4 Problem 21 — shot put released 2.10 m above the ground
  sketch_03_04_p21: () =>
    proj({
      title: 'Sketch of the shot put',
      desc: 'Axes with +x horizontal in the direction of the throw and +y up, origin on the ground directly below the release point. The shot leaves from y_0 = 2.10 m with unknown speed v_0 at 38.0° above the horizontal and lands at (24.77 m, 0). The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 520,
      height: 220,
      ox: 100,
      oy: 180,
      sx: 14,
      xPos: 380,
      yPos: 150,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 2.1, 12.24, 9.56, 2.023);
        k.v0(0, 2.1, 38, 'v_0 = ?', 60, { arcLabel: '38.0°', lx: 30, ly: 14 });
        s.label(k.P(0, 2.1)[0] - 8, k.P(0, 2.1)[1], 'y_0 = 2.10 \\rm{m}', {
          anchor: 'end',
          size: 14,
        });
        k.at(24.77, 0, ['(24.77 \\rm{m}, 0)'], { dy: -16, dx: -8, anchor: 'end' });
        k.g(450, 30);
      },
    }),

  // 3.4 Problem 22 — running dunk
  sketch_03_04_p22: () =>
    proj({
      title: 'Sketch of the running jump to the basket',
      desc: 'Axes with +x horizontal toward the basket and +y up, origin at the takeoff point on the floor. The player keeps v_x = +5.00 m/s and leaves with unknown v_0y, reaching the top of the jump, 0.750 m up (v_y = 0), exactly under the basket at unknown horizontal distance x. The acceleration is a_y = −9.80 m/s², a_x = 0.',
      width: 440,
      height: 230,
      ox: 60,
      oy: 190,
      sx: 140,
      xPos: 320,
      yPos: 150,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 5, 3.834, 0.391);
        const [px, py] = k.P(0, 0);
        s.vel(px, py, px + 50, py, null, { width: 2, dash: '5 4' });
        s.vel(px, py, px, py - 40, null, { width: 2, dash: '5 4' });
        s.label(px + 50, py + 18, 'v_x = +5.00 \\rm{m/s}', { color: C.vel, size: 14 });
        s.label(px + 6, py - 52, 'v_{0y} = ?', { color: C.vel, size: 14, anchor: 'start' });
        const [tx, ty] = k.P(1.956, 0.75);
        s.svg.line(tx, ty, tx, py, { color: '#999999', width: 1.2, dash: '4 4' });
        k.at(1.956, 0.75, ['top: v_y = 0'], { dx: 12, dy: -8 });
        s.label(tx + 6, (ty + py) / 2 + 8, '0.750 \\rm{m}', { anchor: 'start', size: 14 });
        s.label((px + tx) / 2, py + 20, 'x = ?', { size: 15 });
        s.svg.line(tx - 10, ty - 30, tx + 20, ty - 30, { color: '#d35400', width: 3 });
        s.note(tx + 26, ty - 30, 'basket', { anchor: 'start' });
        k.g(200, 30);
      },
    }),

  // 3.4 Problem 23 — punt with a gust of wind at the top
  sketch_03_04_p23: () =>
    proj({
      title: 'Sketch of the punt and the gust at the top',
      desc: 'Axes with +x horizontal downfield and +y up, origin at the kick on level ground. The ball leaves at unknown speed v_0 at 45.0° above +x; without wind it would land at x = 60.0 m. At the top of its path a gust reduces v_x by 1.50 m/s, so it lands short of 60.0 m, at an unknown distance. The acceleration is a_y = −9.80 m/s², a_x = 0 except during the gust.',
      width: 480,
      height: 230,
      ox: 50,
      oy: 190,
      sx: 6,
      xPos: 380,
      yPos: 160,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 17.146, 17.146, 3.499);
        k.path(30, 15, 15.646, 0, 1.7496, { color: C.disp });
        k.v0(0, 0, 45, 'v_0 = ?', 60, { arcLabel: '45.0°', lx: 30, ly: 14 });
        k.at(60, 0, ['60.0 \\rm{m} (no wind)'], { dy: 24, dx: 0, anchor: 'middle' });
        k.at(57.4, 0, ['with gust: ?'], { dy: -16, dx: -10, anchor: 'end' });
        const [tx, ty] = k.P(30, 15);
        s.arrow(tx + 50, ty - 10, tx + 14, ty - 10, '#1f77c8', null, { width: 2 });
        s.note(tx + 54, ty - 10, 'gust: v_x − 1.50 m/s', { anchor: 'start', color: '#1f77c8' });
        k.g(450, 110);
      },
    }),

  // 3.4 Problem 24 — the trajectory is a parabola
  sketch_03_04_p24: () => generic('Sketch for deriving the trajectory equation', 'y(x) = ?'),

  // 3.4 Problem 25 — range on level ground
  sketch_03_04_p25: () => generic('Sketch for deriving the range equation', 'y = 0 at x = R'),

  // 3.4 Problem 26 — super cannon
  sketch_03_04_p26: () =>
    proj({
      title: 'Sketch of the super cannon at maximum range',
      desc: 'Axes with +x horizontal in the direction of fire and +y up, origin at the cannon. For maximum range on level ground the shell leaves at 45° above +x with v_0 = 4.0 km/s and lands at y = 0 at unknown range R. The model assumes a_y = −9.80 m/s², a_x = 0, no air resistance, and a flat Earth.',
      width: 480,
      height: 220,
      ox: 50,
      oy: 180,
      sx: 0.000215,
      xPos: 380,
      yPos: 150,
      ground: 0,
      draw: (s, k) => {
        k.path(0, 0, 2828, 2828, 577.2);
        k.v0(0, 0, 45, 'v_0 = 4.0 \\rm{km/s}', 60, { arcLabel: '45°', lx: 30, ly: 14 });
        k.at(1.633e6, 0, ['R = ?'], { dy: -16, dx: -8, anchor: 'end' });
        k.g(450, 30);
      },
    }),

  // 3.5 Problem 1 — human-powered flight across the Channel
  sketch_03_05_p01: () =>
    plane({
      title: 'Sketch of the flight and the headwind',
      desc: 'Axes with +x east and +y north. The aircraft’s velocity relative to the Earth, v_p/E = 3.53 m/s, points 45° south of east; the wind’s velocity relative to the Earth, v_a/E = 2.00 m/s, points the opposite way, 45° north of west. Along the line of motion (dashed), the positive direction is the direction of travel, 45° south of east.',
      width: 420,
      height: 320,
      ox: 160,
      oy: 140,
      scale: 40,
      xNeg: 130,
      xPos: 200,
      yNeg: 160,
      yPos: 110,
      draw: (s, f) => {
        const d = polar(1, -45);
        f.line([-2.6 * d[0], -2.6 * d[1]], [4.1 * d[0], 4.1 * d[1]], {
          color: '#999999',
          width: 1.2,
          dash: '4 4',
        });
        f.text([4.1 * d[0], 4.1 * d[1]], '+ (direction of travel)', {
          dx: 6,
          dy: 14,
          math: false,
          size: 12,
          anchor: 'start',
          color: C.note,
        });
        vec(s, f, [0, 0], polar(3.53, -45), '**v**_{p/E} = 3.53 \\rm{m/s}', {
          color: RED,
          off: -16,
          size: 15,
        });
        vec(s, f, [0, 0], polar(2.0, 135), '**v**_{a/E} = 2.00 \\rm{m/s}', {
          color: BLUE,
          off: 16,
          size: 15,
        });
        f.angle([0, 0], -45, 0, 46, '45°', { labelR: 62, dy: 4 });
      },
    }),

  // 3.5 Problem 2 — seagull flying into the wind
  sketch_03_05_p02: () =>
    line1D({
      title: 'Sketch of the seagull flying into the wind',
      desc: 'A +x axis points in the direction the seagull first flies, into the wind. The gull’s velocity relative to the air is +9.00 m/s; the wind’s velocity relative to the Earth is negative (it blows toward −x) with unknown magnitude; the gull’s velocity relative to the Earth is +5.00 m/s (6.00 km in 20.0 min). On the return trip the gull flies toward −x, with the wind.',
      rows: [
        [0, 9, '**v**_{g/a} = +9.00 \\rm{m/s}', BLUE],
        [0, -4, '**v**_{a/E} = ?  (wind, toward −x)', C.alt],
        [0, 5, '**v**_{g/E} = +5.00 \\rm{m/s}', RED],
      ],
      note: '(direction of the outbound flight)',
    }),

  // 3.5 Problem 3 — two marathon runners
  sketch_03_05_p03: () => {
    const s = new Sketch({
      width: 600,
      height: 190,
      title: 'Sketch of the two runners',
      desc: 'A +x axis points toward the finish line, with the origin at the second runner. The front runner is at x = 45.0 m and the finish line at x = 295 m (250 m beyond the front runner). Velocities: second runner +4.20 m/s, front runner +3.50 m/s.',
    });
    const X = m => 60 + m * 1.4;
    const y = 120;
    s.ground(30, 540, y - 22, { hatch: false });
    s.axis(30, y, 590, y, {
      note: '(toward finish)',
      origin: [X(0), y],
      ticks: [
        [X(45), y, '45.0 \\rm{m}'],
        [X(295), y, '295 \\rm{m}'],
      ],
    });
    s.dot(X(0), y - 30, { name: 'second runner', nameDy: -14 });
    s.vel(X(0) + 10, y - 56, X(0) + 70, y - 56, null);
    s.label(X(0) + 76, y - 56, '+4.20 \\rm{m/s}', { anchor: 'start', color: C.vel, size: 14 });
    s.dot(X(45), y - 30, { color: C.alt });
    s.note(X(45) + 10, y - 10, 'front runner', { anchor: 'start', color: C.alt });
    s.vel(X(45) + 10, y - 30, X(45) + 60, y - 30, null);
    s.label(X(45) + 66, y - 30, '+3.50 \\rm{m/s}', { anchor: 'start', color: C.vel, size: 14 });
    s.svg.line(X(295), y - 70, X(295), y - 22, { color: '#222222', width: 3, dash: '6 4' });
    s.note(X(295), y - 78, 'finish');
    return s.render();
  },

  // 3.5 Problem 4 — coin dropped in the airplane
  sketch_03_05_p04: () =>
    proj({
      title: 'Sketch of the coin falling in the moving airplane (Earth frame)',
      desc: 'Earth frame: axes with +x in the airplane’s direction of motion and +y up, origin where the coin is released. The coin starts with the airplane’s horizontal velocity, v_0x = +260 m/s, and v_0y = 0; it falls 1.50 m to the floor (y = −1.50 m) while moving an unknown horizontal distance x. The acceleration is a_y = −9.80 m/s², a_x = 0. The vertical scale is greatly exaggerated.',
      width: 480,
      height: 200,
      ox: 50,
      oy: 60,
      sx: 2.4,
      sy: 60,
      yNeg: 120,
      xPos: 380,
      yPos: 40,
      ground: -1.5,
      draw: (s, k) => {
        k.path(0, 0, 260, 0, 0.553);
        k.v0(0, 0, 0, 'v_{0x} = +260 \\rm{m/s}', 60, { arc: false, ly: 4 });
        k.at(143.9, -1.5, ['y = −1.50 \\rm{m},  x = ?'], { dx: -10, dy: 22, anchor: 'end' });
        s.note(240, 190, 'vertical scale exaggerated');
        k.g(450, 80);
      },
    }),

  // 3.5 Problem 5 — the pass relative to the quarterback
  sketch_03_05_p05: () =>
    plane({
      title: 'Sketch of the pass in the ground frame and the quarterback’s frame',
      desc: 'Axes with +x horizontal downfield and +y up (fixed to the ground). The quarterback’s velocity relative to the ground is v_Q/G = −2.00 m/s (backward). The ball’s velocity relative to the ground, v_b/G, is 15.2 m/s at 25.0° above +x. The ball’s velocity relative to the quarterback is v_b/Q = v_b/G − v_Q/G, drawn as v_b/G followed by +2.00 m/s; its magnitude and angle are unknown.',
      width: 480,
      height: 240,
      ox: 90,
      oy: 190,
      scale: 18,
      xNeg: 70,
      xPos: 330,
      yNeg: 30,
      yPos: 170,
      xNote: '(downfield)',
      yNote: '(up)',
      draw: (s, f) => {
        const b = polar(15.17, 25);
        vec(s, f, [0, 0], [-2, 0], '**v**_{Q/G}', { color: C.alt, off: -18, size: 15 });
        vec(s, f, [0, 0], b, '**v**_{b/G}', { color: BLUE, off: 16, size: 15, along: 0.8 });
        vec(s, f, b, add(b, [2, 0]), '−**v**_{Q/G}', { color: C.alt, off: 16, size: 14 });
        vec(s, f, [0, 0], add(b, [2, 0]), '**v**_{b/Q} = ?', {
          color: RED,
          off: -18,
          along: 0.55,
          size: 15,
        });
        f.angle([0, 0], 0, 25, 60, '25.0°', { labelR: 80, dy: 2 });
      },
    }),

  // 3.5 Problem 6 — ship and ocean current
  sketch_03_05_p06: () =>
    plane({
      title: 'Sketch of the ship’s velocity and the current',
      desc: 'Axes with +x east and +y north. The ship’s velocity relative to the water, v_s/w = 7.00 m/s, points north (+y). The current, v_w/E = 1.50 m/s at 40.0° north of east, is drawn from its tip. Their sum is the ship’s velocity relative to the Earth, v_s/E, unknown.',
      width: 400,
      height: 350,
      ox: 150,
      oy: 315,
      scale: 34,
      xNeg: 40,
      xPos: 170,
      yNeg: 25,
      yPos: 285,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], [0, 7], '**v**_{s/w} = 7.00 \\rm{m/s}', {
          color: BLUE,
          off: 64,
          along: 0.3,
          size: 15,
        });
        const c = vec(s, f, a, add(a, polar(1.5, 40)), '**v**_{w/E}', {
          color: GREEN,
          off: 18,
          size: 15,
        });
        vec(s, f, [0, 0], c, '**v**_{s/E} = ?', { color: RED, off: -18, along: 0.45, size: 15 });
        f.angle(a, 0, 40, 30, '40.0°', { labelR: 46, dx: 8 });
        f.line(a, add(a, [1.6, 0]), { color: '#999999', width: 1.2, dash: '4 4' });
      },
    }),

  // 3.5 Problem 7 — jet in the jet stream (+x west, +y south)
  sketch_03_05_p07: () => {
    const s = new Sketch({
      width: 460,
      height: 300,
      title: 'Sketch of the jet’s velocity with +x west and +y south',
      desc: 'This solution uses +x pointing WEST and +y pointing SOUTH, origin at the airplane. The airplane’s velocity relative to the air, v_p/a = 260 m/s, points 5.0° south of west (just below +x). The wind, v_a/E = 35.0 m/s at 15° south of east, has a negative x-component and a positive y-component. Their sum is v_p/E, unknown.',
    });
    const ox = 400;
    const oy = 70;
    const sc = 1.2;
    const P = ([w, so]) => [ox - w * sc, oy + so * sc];
    // axes: +x to the left (west), +y down (south)
    s.svg.line(ox + 40, oy, ox, oy, { color: C.axis, width: 1.6 });
    s.svg.arrow(ox, oy, ox - 360, oy, { color: C.axis, width: 1.6, head: 11 });
    s.label(ox - 360, oy - 16, '+x', { size: 17, color: C.axis });
    s.note(ox - 336, oy - 16, '(west)', { anchor: 'start' });
    s.svg.line(ox, oy - 40, ox, oy, { color: C.axis, width: 1.6 });
    s.svg.arrow(ox, oy, ox, oy + 190, { color: C.axis, width: 1.6, head: 11 });
    s.label(ox, oy + 206, '+y', { size: 17, color: C.axis });
    s.note(ox + 14, oy + 206, '(south)', { anchor: 'start' });
    s.compassAxes(70, 210, { r: 26 });
    const pa = [259, 22.7];
    const w = [-33.8, 9.07];
    const tip = [pa[0] + w[0], pa[1] + w[1]];
    const [x0, y0] = P([0, 0]);
    const [x1, y1] = P(pa);
    const [x2, y2] = P(tip);
    s.svg.arrow(x0, y0, x1, y1, { color: BLUE, width: 3 });
    s.label((x0 + x1) / 2, (y0 + y1) / 2 - 16, '**v**_{p/a} = 260 \\rm{m/s}', {
      color: BLUE,
      size: 15,
    });
    s.svg.arrow(x1, y1, x2, y2, { color: GREEN, width: 3 });
    s.label(x2 + 30, y2 + 22, '**v**_{a/E} = 35.0 \\rm{m/s}', {
      color: GREEN,
      size: 15,
      anchor: 'start',
    });
    s.svg.arrow(x0, y0, x2, y2, { color: RED, width: 3 });
    s.label((x0 + x2) / 2, (y0 + y2) / 2 + 22, '**v**_{p/E} = ?', { color: RED, size: 15 });
    return s.render();
  },

  // 3.5 Problem 8 — heading needed to go due north
  sketch_03_05_p08: () =>
    plane({
      title: 'Sketch of the heading that makes the ship go due north',
      desc: 'Axes with +x east and +y north. The ship’s velocity relative to the water, v_s/w = 7.00 m/s, points at unknown angle θ west of north. The current, v_w/E = 1.50 m/s at 40.0° north of east, is drawn from its tip. The sum, v_s/E, must point due north (+y), so its x-component is zero.',
      width: 360,
      height: 340,
      ox: 150,
      oy: 300,
      scale: 34,
      xNeg: 90,
      xPos: 140,
      yNeg: 25,
      yPos: 285,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], [-1.15, 6.905], '**v**_{s/w}', {
          color: BLUE,
          off: 18,
          size: 15,
        });
        const c = vec(s, f, a, add(a, polar(1.5, 40)), '**v**_{w/E}', {
          color: GREEN,
          off: -18,
          size: 15,
        });
        vec(s, f, [0, 0], c, '**v**_{s/E} = ?', { color: RED, off: -18, along: 0.4, size: 15 });
        f.angle([0, 0], 90, 99.44, 120, 'θ', { labelR: 134, dx: -4 });
      },
    }),

  // 3.5 Problem 9 — airplane in the jet stream
  sketch_03_05_p09: () =>
    plane({
      title: 'Sketch of the airplane, the air, and the jet stream',
      desc: 'Axes with +x east and +y north. The airplane’s velocity relative to the air, v_p/a, points 5.00° south of west, magnitude unknown. The wind, v_a/E = 45.0 m/s at 20.0° south of east, is drawn from its tip. Their sum, the airplane’s velocity relative to the Earth v_p/E, points 45.0° south of west, magnitude unknown.',
      width: 470,
      height: 260,
      ox: 370,
      oy: 70,
      scale: 5,
      xNeg: 350,
      xPos: 40,
      yNeg: 170,
      yPos: 50,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], polar(63.5, 185), '**v**_{p/a} = ?', {
          color: BLUE,
          off: 16,
          size: 15,
          along: 0.7,
        });
        vec(s, f, a, add(a, polar(45, -20)), '**v**_{a/E} = 45.0 \\rm{m/s}', {
          color: GREEN,
          off: -18,
          size: 15,
        });
        vec(s, f, [0, 0], polar(29.6, 225), '**v**_{p/E} = ?', { color: RED, off: -18, size: 15 });
        f.angle([0, 0], 180, 185, 110, '5.00°', { labelR: 130, dy: -12 });
        f.angle([0, 0], 180, 225, 50, '45.0°', { labelR: 72 });
      },
    }),

  // 3.5 Problem 10 — sandal dropped from the mast
  sketch_03_05_p10: () => {
    const s = new Sketch({
      width: 560,
      height: 280,
      title: 'Sketch of the falling sandal in the ship frame and the shore frame',
      desc: 'Two side views with +x horizontal in the ship’s direction of motion (south) and +y up, origin on the deck at the foot of the mast; the sandal starts at y_0 = 15.0 m. (a) Ship frame: v_0 = 0 and the sandal falls straight down to the deck. (b) Shore frame: the sandal starts with the ship’s velocity, v_0x = +1.75 m/s, and follows a parabola, landing at the foot of the mast, which has moved forward with the ship. In both, a_y = −9.80 m/s².',
    });
    const panel = (ox, label, moving) => {
      const oy = 230;
      const sc = 12;
      s.axes2(ox, oy, {
        xNeg: 30,
        xPos: 180,
        yNeg: 20,
        yPos: 205,
        xNote: '(south)',
        yNote: '(up)',
      });
      s.svg.line(ox, oy, ox, oy - 15 * sc, { color: '#8d6e63', width: 4 });
      s.dot(ox, oy - 15 * sc, { r: 6 });
      s.label(ox + 10, oy - 15 * sc - 14, 'y_0 = 15.0 \\rm{m}', { anchor: 'start', size: 14 });
      if (moving) {
        const pts = [];
        for (let i = 0; i <= 40; i += 1) {
          const t = (1.75 * i) / 40;
          pts.push([ox + 1.75 * t * 40, oy - (15 - 4.9 * t * t) * sc]);
        }
        s.path(pts);
        s.vel(ox, oy - 15 * sc, ox + 50, oy - 15 * sc, null);
        s.label(ox + 56, oy - 15 * sc + 14, 'v_{0x} = +1.75 \\rm{m/s}', {
          anchor: 'start',
          color: C.vel,
          size: 14,
        });
        s.svg.line(ox + 122, oy, ox + 122, oy - 15 * sc, {
          color: '#8d6e63',
          width: 2,
          dash: '4 4',
        });
        s.dot(ox + 122, oy - 4, { open: true, r: 5 });
        s.note(ox + 126, oy - 70, 'mast when it lands', { anchor: 'start' });
      } else {
        s.path([
          [ox + 8, oy - 15 * sc + 8],
          [ox + 8, oy - 6],
        ]);
        s.label(ox + 14, oy - 100, 'v_0 = 0', { anchor: 'start', color: C.vel, size: 14 });
        s.dot(ox + 8, oy - 4, { open: true, r: 5 });
      }
      s.label(ox + 90, oy + 30, label, { size: 15, math: false });
    };
    panel(60, '(a) relative to the ship', false);
    panel(320, '(b) relative to the shore', true);
    return s.render();
  },

  // 3.5 Problem 11 — wind relative to the water
  sketch_03_05_p11: () =>
    plane({
      title: 'Sketch of the wind relative to the water',
      desc: 'Axes with +x east and +y north. The wind relative to the Earth, v_a/E = 4.50 m/s at 50.0° south of west (230° from +x), is followed by the negative of the water’s velocity, −v_w/E (2.20 m/s at 30.0° east of north, reversed). Their sum is the wind relative to the water, v_a/w = v_a/E − v_w/E, unknown.',
      width: 400,
      height: 320,
      ox: 300,
      oy: 90,
      scale: 34,
      xNeg: 270,
      xPos: 60,
      yNeg: 210,
      yPos: 70,
      draw: (s, f) => {
        vec(s, f, [0, 0], polar(2.2, 60), '**v**_{w/E}', { color: BLUE, off: 16, size: 15 });
        const a = vec(s, f, [0, 0], polar(4.5, 230), '**v**_{a/E}', {
          color: GREEN,
          off: -18,
          size: 15,
          along: 0.4,
        });
        const b = vec(s, f, a, add(a, polar(2.2, 240)), '−**v**_{w/E}', {
          color: BLUE,
          off: 16,
          size: 15,
          dash: '7 5',
        });
        vec(s, f, [0, 0], b, '**v**_{a/w} = ?', { color: RED, off: 26, along: 0.7, size: 15 });
      },
    }),

  // 3.5 Problem 14 — swimmer crossing the river
  sketch_03_05_p14: () => {
    const s = new Sketch({
      width: 520,
      height: 260,
      title: 'Sketch of the swimmer crossing the river',
      desc: 'Axes with +x downstream (along the current) and +y straight across the river, origin at the starting point on one bank. The far bank is at y = 25 m; the swimmer lands at x = 40 m. Velocities: swimmer relative to the water v_s/w = 0.5 m/s along +y; current v_w/G along +x, unknown; swimmer relative to the ground v_s/G = v_s/w + v_w/G, unknown.',
    });
    const ox = 60;
    const oy = 220;
    const sc = 7;
    s.water(20, 440, oy - 25 * sc + 14);
    s.svg.line(20, oy, 440, oy, { color: C.ground, width: 2.5 });
    s.svg.line(20, oy - 25 * sc, 440, oy - 25 * sc, { color: C.ground, width: 2.5 });
    s.axes2(ox, oy, {
      xNeg: 30,
      xPos: 370,
      yNeg: 20,
      yPos: 200,
      xNote: '(downstream)',
      yNote: '(across)',
    });
    s.path([
      [ox, oy],
      [ox + 40 * sc, oy - 25 * sc],
    ]);
    s.dot(ox + 40 * sc, oy - 25 * sc, { open: true, r: 5 });
    s.label(ox + 40 * sc + 8, oy - 25 * sc - 14, '(40 \\rm{m}, 25 \\rm{m})', {
      anchor: 'start',
      size: 14,
    });
    s.dim(ox + 330, oy, ox + 330, oy - 25 * sc, '25 \\rm{m}', { lx: ox + 336, anchor: 'start' });
    const v = 90;
    s.svg.arrow(ox, oy, ox, oy - v * 0.5, { color: BLUE, width: 3 });
    s.label(ox + 6, oy - v * 0.5 - 12, '**v**_{s/w} = 0.5 \\rm{m/s}', {
      anchor: 'start',
      color: BLUE,
      size: 14,
    });
    s.svg.arrow(ox, oy, ox + v * 0.8, oy, { color: GREEN, width: 3 });
    s.label(ox + v * 0.8, oy + 18, '**v**_{w/G} = ?', { color: GREEN, size: 14 });
    s.svg.arrow(ox, oy, ox + v * 0.8, oy - v * 0.5, { color: RED, width: 3 });
    s.label(ox + v * 0.8 + 6, oy - v * 0.5 + 4, '**v**_{s/G} = ?', {
      anchor: 'start',
      color: RED,
      size: 14,
    });
    return s.render();
  },

  // 3.5 Problem 15 — Gulf Stream
  sketch_03_05_p15: () =>
    plane({
      title: 'Sketch of the ship and the Gulf Stream',
      desc: 'Axes with +x east and +y north. The ship’s velocity relative to the water, v_s/w = 4.00 m/s at 25.0° west of north, is followed by the stream’s velocity v_w/E (unknown) to reach the ship’s velocity relative to the Earth, v_s/E = 4.80 m/s at 5.00° west of north.',
      width: 360,
      height: 330,
      ox: 160,
      oy: 290,
      scale: 54,
      xNeg: 120,
      xPos: 140,
      yNeg: 25,
      yPos: 275,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], polar(4, 115), '**v**_{s/w}', {
          color: BLUE,
          off: 16,
          size: 15,
        });
        vec(s, f, a, polar(4.8, 95), '**v**_{w/E} = ?', { color: GREEN, off: 16, size: 15 });
        vec(s, f, [0, 0], polar(4.8, 95), '**v**_{s/E}', { color: RED, off: -18, size: 15 });
        f.angle([0, 0], 90, 115, 70, '25.0°', { labelR: 92, dx: -8 });
        f.angle([0, 0], 90, 95, 190, '5.00°', { labelR: 210, dx: 14 });
      },
    }),

  // 3.5 Problem 16 — hockey player shooting at the goal
  sketch_03_05_p16: () =>
    plane({
      title: 'Sketch of the puck’s velocities for the shot on goal',
      desc: 'Axes with +x toward the goal (east) and +y along the player’s motion (north). The player’s velocity relative to the ice is v_P/I = 8.00 m/s along +y. The puck’s velocity relative to the player, v_p/P = 29.0 m/s at unknown angle θ from the player’s direction (+y), plus v_P/I must give a puck velocity relative to the ice, v_p/I, along +x, toward the goal.',
      width: 520,
      height: 220,
      ox: 50,
      oy: 70,
      scale: 12,
      xNeg: 30,
      xPos: 370,
      yNeg: 130,
      yPos: 50,
      xNote: '(toward goal)',
      yNote: '(player’s motion)',
      draw: (s, f) => {
        const pp = [27.87, -8];
        const a = vec(s, f, [0, 0], pp, '**v**_{p/P} = 29.0 \\rm{m/s}', {
          color: BLUE,
          off: -18,
          size: 15,
        });
        vec(s, f, a, [27.87, 0], '**v**_{P/I}', { color: GREEN, off: -16, size: 15 });
        vec(s, f, [0, 0], [27.87, 0], '**v**_{p/I}', { color: RED, off: 16, size: 15, along: 0.6 });
        f.angle([0, 0], -16, 90, 30, 'θ', { labelR: 44 });
      },
    }),

  // 3.5 Problem 17 — supplies shot straight up
  sketch_03_05_p17: () => {
    const s = new Sketch({
      width: 420,
      height: 260,
      title: 'Sketch of the supplies launched straight up',
      desc: 'A vertical +y axis points up, with the origin at the launch point on the Earth’s surface. Launch: y_0 = 0, v_0 unknown (upward). Top: y = 36 000 km = 3.6 × 10⁷ m, v = 0. The model assumes constant a = −9.80 m/s².',
    });
    s.axis(60, 230, 60, 30, { label: '+y', note: '(up)', origin: [60, 210] });
    s.ground(70, 380, 218);
    s.dot(150, 210);
    s.vel(130, 210, 130, 160, null);
    s.label(124, 184, 'v_0', { anchor: 'end', color: C.vel });
    s.lines(170, 172, ['y_0 = 0', 'v_0 = ?'], { anchor: 'start' });
    s.dot(150, 60, { open: true });
    s.ref(66, 60, 140, 60);
    s.lines(170, 50, ['y = 3.6 × 10^7 \\rm{m}', 'v = 0'], { anchor: 'start' });
    s.acc(360, 100, 360, 150, null);
    s.label(360, 86, 'a = −9.80 \\rm{m/s}^2', { color: C.acc });
    return s.render();
  },

  // 3.5 Problem 18 — airliner with a strong tailwind
  sketch_03_05_p18: () =>
    plane({
      title: 'Sketch of the airliner and the tailwind',
      desc: 'Axes with +x east and +y north. The airplane’s velocity relative to the air, v_p/a = 280 m/s, points east. Its velocity relative to the ground, v_p/G = 3000 km / 1.50 h, points 5° south of east. The wind v_a/G = v_p/G − v_p/a, drawn from the tip of v_p/a to the tip of v_p/G, is unknown.',
      width: 520,
      height: 190,
      ox: 50,
      oy: 70,
      scale: 0.7,
      xNeg: 30,
      xPos: 400,
      yNeg: 100,
      yPos: 50,
      draw: (s, f) => {
        const a = vec(s, f, [0, 0], [280, 0], '**v**_{p/a} = 280 \\rm{m/s}', {
          color: BLUE,
          off: 16,
          size: 15,
        });
        const g = polar(555.6, -5);
        vec(s, f, a, g, '**v**_{a/G} = ?', { color: GREEN, off: 16, size: 15 });
        vec(s, f, [0, 0], g, '**v**_{p/G}', { color: RED, off: -16, size: 15, along: 0.35 });
        f.angle([0, 0], -5, 0, 120, '5°', { labelR: 134, dy: 6 });
      },
    }),
};

/** 3.2 Problems 5 and 6: A = 12.0 m at 20° W of N, B = 20.0 m at 40° S of W. */
function walkAB(order) {
  const A = polar(12, 110);
  const B = polar(20, 220);
  const first = order === 'AB' ? A : B;
  const second = order === 'AB' ? B : A;
  const names = order === 'AB' ? ['**A**', '**B**'] : ['**B**', '**A**'];
  const colors = order === 'AB' ? [BLUE, GREEN] : [GREEN, BLUE];
  return plane({
    title: order === 'AB' ? 'Sketch of the walk A then B' : 'Sketch of the walk B then A',
    desc: `Axes with +x east and +y north, origin at the start. A is 12.0 m at 20.0° west of north (110° counterclockwise from +x); B is 20.0 m at 40.0° south of west (220° from +x). The legs are drawn head to tail, ${order === 'AB' ? 'A first, then B' : 'B first, then A'}. The resultant R runs from the origin to the end of the second leg, just south of the −x (west) axis; its direction θ is measured from west toward south.`,
    width: 460,
    height: 330,
    ox: 330,
    oy: order === 'AB' ? 200 : 140,
    scale: 11,
    xNeg: 280,
    xPos: 60,
    yNeg: order === 'AB' ? 110 : 170,
    yPos: order === 'AB' ? 170 : 110,
    draw: (s, f) => {
      const p1 = vec(s, f, [0, 0], first, names[0], {
        color: colors[0],
        off: order === 'AB' ? 16 : -16,
      });
      vec(s, f, p1, add(first, second), names[1], {
        color: colors[1],
        off: order === 'AB' ? 16 : -16,
      });
      const R = add(A, B);
      vec(s, f, [0, 0], R, '**R**', { color: RED, off: -16, along: 0.45 });
      f.angle([0, 0], 180, 184.65, 120, 'θ', { labelR: 150, dy: 14 });
    },
  });
}

/** 3.3 Problems 4 and 5: A = 18.0 m west, B = 25.0 m north, in either order. */
function westNorth(order) {
  return plane({
    title:
      order === 'AB' ? 'Sketch of the walk west then north' : 'Sketch of the walk north then west',
    desc: `Axes with +x east and +y north, origin at the start. A is 18.0 m west (along −x) and B is 25.0 m north (along +y), drawn head to tail with ${order === 'AB' ? 'A first' : 'B first'}. The resultant R runs from the origin to (x, y) = (−18.0 m, +25.0 m); its direction θ is measured from the +y (north) axis toward west.`,
    width: 400,
    height: 300,
    ox: 260,
    oy: 250,
    scale: 8,
    xNeg: 200,
    xPos: 70,
    yNeg: 30,
    yPos: 220,
    draw: (s, f) => {
      if (order === 'AB') {
        const a = vec(s, f, [0, 0], [-18, 0], '**A** (18.0 \\rm{m})', {
          color: BLUE,
          off: 18,
          along: 0.6,
        });
        vec(s, f, a, [-18, 25], '**B** (25.0 \\rm{m})', { color: GREEN, off: 50 });
      } else {
        const b = vec(s, f, [0, 0], [0, 25], '**B** (25.0 \\rm{m})', { color: GREEN, off: -52 });
        vec(s, f, b, [-18, 25], '**A** (18.0 \\rm{m})', { color: BLUE, off: -16 });
      }
      vec(s, f, [0, 0], [-18, 25], '**R**', { color: RED, off: order === 'AB' ? -16 : 16 });
      f.angle([0, 0], 90, 125.8, 70, 'θ', { labelR: 84 });
    },
  });
}

/** 3.4 Problems 24 and 25: a generic launch from the origin. */
function generic(title, landing) {
  return proj({
    title,
    desc: `Axes with +x horizontal in the direction of launch and +y up, origin at the launch point. The projectile leaves with speed v_0 at angle θ_0 above +x, so v_0x = v_0 cos θ_0 and v_0y = v_0 sin θ_0. The acceleration is a_y = −g, a_x = 0. Landing condition: ${landing}.`,
    width: 460,
    height: 220,
    ox: 60,
    oy: 170,
    sx: 7,
    xPos: 340,
    yPos: 140,
    draw: (s, k) => {
      k.path(0, 0, 14, 14, 2.857);
      const [px, py] = k.P(0, 0);
      s.vel(px, py, px + 56, py, null, { width: 2, dash: '5 4' });
      s.vel(px, py, px, py - 56, null, { width: 2, dash: '5 4' });
      k.v0(0, 0, 45, 'v_0', 79, { arcLabel: 'θ_0' });
      s.label(px + 56, py + 18, 'v_{0x} = v_0 cos θ_0', {
        color: C.vel,
        size: 14,
        anchor: 'start',
      });
      s.label(px + 8, py - 70, 'v_{0y} = v_0 sin θ_0', { color: C.vel, size: 14, anchor: 'start' });
      k.at(40, 0, [landing], { dy: -16, dx: -8, anchor: 'end' });
      k.g(430, 30, 'a_y = −g');
    },
  });
}

/** One-dimensional relative-velocity sketch: a +x axis and stacked velocity arrows. */
function line1D({ title, desc, rows, note }) {
  const unit = 20;
  const s = new Sketch({ width: 520, height: 70 + rows.length * 40, title, desc });
  const ox = 170;
  rows.forEach(([from, to, label, color], k) => {
    const y = 30 + k * 40;
    s.svg.arrow(ox + from * unit, y, ox + to * unit, y, { color, width: 3 });
    s.label(to > 0 ? ox + to * unit + 8 : ox + 8, to > 0 ? y : y - 14, label, {
      anchor: 'start',
      color,
      size: 15,
    });
  });
  const ay = 40 + rows.length * 40 - 10;
  s.axis(40, ay, 480, ay, { note, origin: [ox, ay] });
  return s.render();
}
