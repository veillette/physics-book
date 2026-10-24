/**
 * Chapter 22: magnetic forces on moving charges and currents, the paths of
 * charges in uniform fields, and forces between currents.
 *
 * Most of these are exercise figures, so each one shows exactly what the
 * question gives and nothing it asks for. Field into the page is a row of
 * ⊗ marks and out of the page a row of ⊙ marks; velocities are green,
 * currents blue, forces red and field lines magenta, as in the text. Curved
 * paths in a uniform field are circular arcs, turning clockwise or
 * counterclockwise as the original shows.
 *
 * 22.5 Fig. 2 is redrawn from the raster: a negative charge circles
 * clockwise in a field into the page, its velocity tangent to the circle and
 * the magnetic force toward the center. For readers who allow motion the
 * charge goes round carrying its v and F, and in the 22.5 questions each
 * particle travels along its path.
 */
import { COLORS, Svg, morph, rad } from './svg.js';

const FIELD = '#d81b60';
const FORCE = '#e0245e';
const VEL = '#4caf2a';
const CURR = '#1f8fd1';
const MARK = ['#f2a07b', '#fbd3ba', '#d9733f'];

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/** A ⊙ or ⊗ field mark: shaded disk with a dot (out) or a cross (in). */
function mark(svg, x, y, out, { r = 19, colors = MARK } = {}) {
  svg.circle(x, y, r, { fill: colors[0], stroke: colors[2], width: 1.2 });
  svg.circle(x, y, r * 0.66, { fill: colors[1] });
  if (out) svg.circle(x, y, r * 0.2, { fill: COLORS.black });
  else {
    const d = r * 0.36;
    svg.line(x - d, y - d, x + d, y + d, { color: COLORS.black, width: 2 });
    svg.line(x - d, y + d, x + d, y - d, { color: COLORS.black, width: 2 });
  }
}

/** A grid of field marks, columns × rows, starting at (x, y). */
function grid(svg, x, y, cols, rows, out, { dx = 52, dy = 60, r = 19 } = {}) {
  for (let i = 0; i < cols; i += 1)
    for (let j = 0; j < rows; j += 1) mark(svg, x + i * dx, y + j * dy, out, { r });
}

/** Velocity or current going into (out = false) or out of the page: a colored ring. */
function endOn(svg, x, y, out, color) {
  const ring = color === VEL ? ['#ffffff', '#ffffff', VEL] : ['#ffffff', '#ffffff', CURR];
  svg.circle(x, y, 19, { fill: color, stroke: color });
  mark(svg, x, y, out, { r: 13, colors: ring });
}

function arrow(svg, x1, y1, x2, y2, color, width = 3) {
  svg.arrow(x1, y1, x2, y2, { color, width, head: 16 });
}

/** Parallel field lines from (x1, y1) to (x2, y2), stepped by (sx, sy). */
function lines(svg, n, [x1, y1], [x2, y2], [sx, sy]) {
  for (let k = 0; k < n; k += 1)
    arrow(svg, x1 + k * sx, y1 + k * sy, x2 + k * sx, y2 + k * sy, FIELD, 2);
}

/**
 * Six panels: a velocity (or current) in field out of the page, field to the
 * right, field into the page, field right with motion left, field up with
 * motion into the page, field left with motion out of the page.
 */
function sixCases(kind) {
  const isV = kind === 'v';
  const color = isV ? VEL : CURR;
  const name = isV ? '**v**' : '**I**';
  const svg = new Svg({
    width: 900,
    height: 620,
    title: isV ? 'Six charges moving through magnetic fields' : 'Six currents in magnetic fields',
    desc: isV
      ? '(a) Field B out of the page; a positive charge moves down. (b) B to the right; v up. (c) B into the page; v to the right. (d) B to the right; v to the left. (e) B up; v into the page. (f) B to the left; v out of the page.'
      : '(a) Field B out of the page; current I down. (b) B to the right; I up. (c) B into the page; I to the right. (d) B to the right; I to the left. (e) B up; I into the page. (f) B to the left; I out of the page.',
  });
  // (a) Field out, motion down.
  grid(svg, 60, 50, 4, 3, true, { dx: 44, dy: 72, r: 18 });
  arrow(svg, 126, 20, 126, 222, color);
  lab(svg, 222, 50, '**B**_{out}', { anchor: 'start', size: 20 });
  lab(svg, 126, 246, name, { size: 22 });
  caption(svg, 126, 280, '(a)');
  // (b) Field right, motion up.
  lines(svg, 3, [330, 60], [430, 60], [0, 72]);
  lab(svg, 444, 50, '**B**', { anchor: 'start', size: 22 });
  arrow(svg, 380, 236, 380, 22, color);
  lab(svg, 380, 8 + 6, name, { size: 22 });
  caption(svg, 380, 280, '(b)');
  // (c) Field in, motion right.
  grid(svg, 590, 40, 3, 4, false, { dx: 44, dy: 60, r: 18 });
  lab(svg, 702, 40, '**B**_{in}', { anchor: 'start', size: 20 });
  arrow(svg, 562, 130, 700, 130, color);
  lab(svg, 712, 130, name, { anchor: 'start', size: 22 });
  caption(svg, 634, 280, '(c)');
  // (d) Field right, motion left.
  lines(svg, 4, [60, 340], [210, 340], [0, 56]);
  lab(svg, 222, 330, '**B**', { anchor: 'start', size: 22 });
  arrow(svg, 200, 424, 74, 424, color);
  lab(svg, 58, 424, name, { anchor: 'end', size: 22 });
  caption(svg, 136, 580, '(d)');
  // (e) Field up, motion into the page.
  lines(svg, 4, [320, 530], [320, 330], [52, 0]);
  lab(svg, 488, 340, '**B**', { anchor: 'start', size: 22 });
  endOn(svg, 398, 420, false, color);
  lab(svg, 398, 462, `${name}_{in}`, { size: 22 });
  caption(svg, 398, 580, '(e)');
  // (f) Field left, motion out of the page.
  lines(svg, 3, [800, 350], [620, 350], [0, 68]);
  lab(svg, 612, 504, '**B**', { anchor: 'end', size: 22 });
  endOn(svg, 700, 384, true, color);
  lab(svg, 726, 384, `${name}_{out}`, { anchor: 'start', size: 22 });
  caption(svg, 710, 580, '(f)');
  return svg.render();
}

/** Three panels of a force in a field: B out with F up, B right with F up, B in with F left. */
function threeForces(about) {
  const svg = new Svg({
    width: 900,
    height: 420,
    title: `Magnetic forces on ${about}`,
    desc: `(a) Field B out of the page and force F up. (b) Field B to the right and force F up. (c) Field B into the page and force F to the left.`,
  });
  grid(svg, 50, 90, 4, 3, true, { dx: 72, dy: 104, r: 22 });
  arrow(svg, 158, 330, 158, 40, FORCE, 3.5);
  lab(svg, 158, 26, '**F**', { size: 26 });
  lab(svg, 298, 324, '**B**_{out}', { anchor: 'start', size: 24 });
  caption(svg, 160, 400, '(a)');
  lines(svg, 3, [340, 110], [480, 110], [0, 96]);
  arrow(svg, 400, 340, 400, 46, FORCE, 3.5);
  lab(svg, 400, 30, '**F**', { size: 26 });
  lab(svg, 492, 94, '**B**', { anchor: 'start', size: 24 });
  caption(svg, 410, 400, '(b)');
  grid(svg, 590, 80, 3, 4, false, { dx: 66, dy: 82, r: 22 });
  lab(svg, 754, 80, '**B**_{in}', { anchor: 'start', size: 24 });
  arrow(svg, 780, 203, 586, 203, FORCE, 3.5);
  lab(svg, 572, 203, '**F**', { anchor: 'end', size: 26 });
  caption(svg, 656, 400, '(c)');
  return svg.render();
}

/**
 * Three panels of a velocity (or current) and a force at right angles:
 * motion up with F left, motion down with F into the page, F up with motion left.
 */
function threeFields(kind) {
  const isV = kind === 'v';
  const color = isV ? VEL : CURR;
  const name = isV ? '**v**' : '**I**';
  const svg = new Svg({
    width: 860,
    height: 360,
    title: isV ? 'Forces on moving charges, field unknown' : 'Forces on currents, field unknown',
    desc: isV
      ? '(a) Velocity v up and force F to the left. (b) Velocity v down and force F into the page. (c) Force F up and velocity v to the left.'
      : '(a) Current I up and force F to the left. (b) Current I down and force F into the page. (c) Force F up and current I to the left.',
  });
  arrow(svg, 230, 260, 230, 60, color, 3.5);
  lab(svg, 252, 76, name, { anchor: 'start', size: 26 });
  arrow(svg, 230, 260, 30, 260, FORCE, 3.5);
  lab(svg, 30, 296, '**F**', { size: 26 });
  caption(svg, 140, 330, '(a)');
  arrow(svg, 360, 50, 360, 262, color, 3.5);
  svg.circle(360, 34, 15, { fill: FORCE });
  svg.circle(360, 34, 9.5, { fill: '#f7b3c4' });
  svg.line(354, 28, 366, 40, { color: COLORS.black, width: 2 });
  svg.line(354, 40, 366, 28, { color: COLORS.black, width: 2 });
  lab(svg, 382, 34, '**F**_{in}', { anchor: 'start', size: 26 });
  lab(svg, 382, 160, name, { anchor: 'start', size: 26 });
  caption(svg, 360, 330, '(b)');
  arrow(svg, 760, 260, 760, 70, FORCE, 3.5);
  lab(svg, 782, 82, '**F**', { anchor: 'start', size: 26 });
  arrow(svg, 760, 260, 520, 260, color, 3.5);
  lab(svg, 520, 296, name, { size: 26 });
  caption(svg, 640, 330, '(c)');
  return svg.render();
}

/**
 * Circular arc from angle a1 to a2 (degrees, y down, so increasing is
 * clockwise) with an arrowhead. Returns the points along it.
 */
function pathArc(svg, cx, cy, r, a1, a2, { color = COLORS.black, width = 1.8 } = {}) {
  const pts = [];
  for (let k = 0; k <= 60; k += 1) {
    const a = rad(a1 + ((a2 - a1) * k) / 60);
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  svg.polyline(pts.slice(0, -2), { color, width });
  svg.arrow(...pts.at(-4), ...pts.at(-1), { color, width, head: 12 });
  return pts;
}

/**
 * For readers who allow motion: a gray particle (its charge is what the
 * question asks) travels along each path at the same steady speed, stopping
 * at the end of its arrow, then all fade and start again.
 */
function travel(svg, paths) {
  const sums = paths.map(pts => {
    const d = [0];
    for (let i = 1; i < pts.length; i += 1)
      d.push(d[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
    return d;
  });
  const longest = Math.max(...sums.map(d => d.at(-1)));
  const at = (pts, d, s) => {
    const k = Math.max(
      1,
      d.findIndex(x => x >= s)
    );
    if (s >= d.at(-1)) return pts.at(-1);
    const f = (s - d[k - 1]) / (d[k] - d[k - 1]);
    return [0, 1].map(i => pts[k - 1][i] + f * (pts[k][i] - pts[k - 1][i]));
  };
  svg.animatedOnce(
    (s, moving, shown) => {
      svg.add(`<g opacity="${shown}">`);
      paths.forEach((pts, i) =>
        svg.circle(...at(pts, sums[i], s * longest), 9, {
          fill: '#666666',
          stroke: '#ffffff',
          width: 2,
        })
      );
      svg.add('</g>');
    },
    Array.from({ length: 41 }, (_, k) => k / 40),
    { run: 3.2, still: null }
  );
}

export default {
  // 22.4 problem — direction of the force in six cases
  Figure_22_04_03: () => sixCases('v'),

  // 22.4 problem — direction of a negative charge's velocity in three cases
  Figure_22_04_04: () => threeForces('negative charges'),

  // 22.4 problem — the field that produces each force
  Figure_22_04_05: () => threeFields('v'),

  // 22.5 Fig. 2 — a negative charge circling in a field into the page
  Figure_22_05_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 740,
      title: 'A negative charge moving in a circle in a magnetic field',
      desc: 'A magnetic field B points into the page, shown by a grid of circled crosses. A negative charge −q moves clockwise around a circle. It is drawn at five points around the circle: at each, its velocity v is a green arrow tangent to the circle and the magnetic force F is a red arrow pointing toward the center, so the velocity changes direction but not magnitude.',
    });
    for (let i = 0; i < 8; i += 1)
      for (let j = 0; j < 7; j += 1) mark(svg, 25 + i * 108, 75 + j * 98, false, { r: 20 });
    const [cx, cy, r] = [405, 370, 245];
    svg.circle(cx, cy, r, { fill: 'none', stroke: COLORS.black, width: 2 });
    svg.circle(cx, cy, 5, { fill: COLORS.black });
    mark(svg, 920, 630, false, { r: 20 });
    lab(svg, 948, 630, '**B**_{in}', { anchor: 'start', size: 30 });
    // The charge at angle θ (degrees, counterclockwise from +x with y up):
    // velocity tangent and clockwise, force toward the center.
    const charge = (th, top) => {
      const [c, s] = [Math.cos(rad(th)), Math.sin(rad(th))];
      const [x, y] = [cx + r * c, cy - r * s];
      const [vx, vy] = [s, c];
      svg.arrow(x, y, cx + 62 * c, cy - 62 * s, { color: FORCE, width: 4, head: 26 });
      svg.arrow(x, y, x + 120 * vx, y + 120 * vy, { color: VEL, width: 5, head: 28 });
      svg.circle(x, y, 10, { fill: '#f4a77e', stroke: '#c46a3c', width: 1.5 });
      // Labels sit beside each arrow, on its clockwise side.
      lab(svg, x + 135 * vx - 18 * c, y + 135 * vy + 18 * s, '**v**', { size: 30 });
      lab(svg, cx + 150 * c + 28 * s, cy - 150 * s + 28 * c, '**F**', { size: 30 });
      if (top) lab(svg, x + 34 * c, y - 34 * s, '−q', { size: 30 });
    };
    const spots = [90, 18, -54, -126, -198];
    svg.still(() => spots.forEach((th, i) => charge(th, i === 0)));
    // For readers who allow motion, one charge goes round, carrying its
    // velocity and the force on it.
    svg.motionGroup(
      morph(
        Array.from({ length: 73 }, (_, k) => svg.capture(() => charge(90 - 5 * k, true))),
        { dur: '7s' }
      )
    );
    return svg.render();
  },

  // 22.5 question — signs of three charges in a field into the page
  Figure_22_05_09: () => {
    const svg = new Svg({
      width: 520,
      height: 520,
      title: 'Three charged particles in a magnetic field',
      desc: 'A magnetic field points into the page. Three particles enter from the bottom moving up: particle a curves to the left, particle b goes straight, and particle c curves to the right.',
    });
    grid(svg, 50, 50, 4, 4, false, { dx: 122, dy: 140, r: 26 });
    lab(svg, 484, 50, '**B**_{in}', { anchor: 'start', size: 26 });
    const R = 900;
    // a turns left (counterclockwise), c turns right (clockwise), b goes straight.
    const a = pathArc(svg, 130 - R, 470, R, 0, -16.5);
    svg.arrow(233, 476, 233, 96, { color: COLORS.black, width: 1.8, head: 12 });
    const c = pathArc(svg, 336 + R, 470, R, 180, 196.5);
    lab(svg, 112, 486, 'a', { size: 28 });
    lab(svg, 250, 488, 'b', { size: 28 });
    lab(svg, 356, 486, 'c', { size: 28 });
    travel(svg, [
      a,
      [
        [233, 476],
        [233, 96],
      ],
      c,
    ]);
    return svg.render();
  },

  // 22.5 question — two paths in a field out of the page
  Figure_22_05_10: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'Two charged particles circling in a magnetic field',
      desc: 'A magnetic field points out of the page. Particle a, moving up from the bottom, curves clockwise along an arc of large radius. Particle b curves clockwise along an arc of much smaller radius.',
    });
    grid(svg, 50, 50, 4, 4, true, { dx: 122, dy: 140, r: 26 });
    lab(svg, 470, 50, '**B**_{out}', { anchor: 'start', size: 26 });
    // Both turn clockwise; a's radius is much larger than b's.
    const a = pathArc(svg, 110 + 900, 400, 900, 180, 197);
    const b = pathArc(svg, 233, 260, 55, 80, 300);
    lab(svg, 112, 440, 'a', { size: 28 });
    lab(svg, 252, 338, 'b', { size: 28 });
    travel(svg, [a, b]);
    return svg.render();
  },

  // 22.7 problem — direction of the force on six currents
  Figure_22_07_05: () => sixCases('I'),

  // 22.7 problem — direction of the current in three cases
  Figure_22_07_06: () => threeForces('currents'),

  // 22.7 problem — the field that produces each force on a current
  Figure_22_07_07: () => threeFields('I'),

  // 22.10 problem — three parallel wires
  Figure_22_10_02: () => {
    const svg = new Svg({
      width: 560,
      height: 560,
      title: 'Three parallel wires',
      desc: 'Three long parallel wires run diagonally across the page. The outer wires carry currents I1 and I3 in opposite directions: I1 toward the lower left and I3 toward the upper right. The middle wire carries current I2, whose direction is not shown.',
    });
    const dir = [Math.cos(rad(-45)), Math.sin(rad(-45))];
    const wire = (ox, oy, w, color = COLORS.black) =>
      svg.line(ox - 330 * dir[0], oy - 330 * dir[1], ox + 330 * dir[0], oy + 330 * dir[1], {
        color,
        width: w,
      });
    const at = (ox, oy, s) => [ox + s * dir[0], oy + s * dir[1]];
    wire(170, 250, 2);
    wire(270, 310, 4);
    wire(350, 370, 2);
    // Blue stretches with arrows show the outer currents, opposite to each other.
    svg.line(...at(170, 250, 250), ...at(170, 250, 40), { color: CURR, width: 5 });
    svg.arrow(...at(170, 250, 80), ...at(170, 250, 30), { color: CURR, width: 5, head: 20 });
    svg.line(...at(350, 370, -260), ...at(350, 370, -60), { color: CURR, width: 5 });
    svg.arrow(...at(350, 370, -100), ...at(350, 370, -50), { color: CURR, width: 5, head: 20 });
    // Labels sit just off each wire, between it and its neighbor.
    lab(svg, ...at(170 + 24, 250 + 24, 150), '**I**_1', { size: 30 });
    lab(svg, ...at(270 - 24, 310 - 24, -40), '**I**_2', { size: 30 });
    lab(svg, ...at(350 - 24, 370 - 24, -160), '**I**_3', { size: 30 });
    return svg.render();
  },

  // 22.10 Fig. 3 — two current loops
  Figure_22_10_03: () => {
    const svg = new Svg({
      width: 520,
      height: 560,
      title: 'Two current loops on a common axis',
      desc: 'Two horizontal current loops, one above the other, share a vertical axis drawn as a dashed line. Each carries a current circulating in the same sense, shown by an arrow on the loop. Loops carrying currents exert forces and torques on each other.',
    });
    svg.line(260, 10, 260, 550, { color: COLORS.black, width: 1.5, dash: '6 5' });
    svg.add(
      '<defs><linearGradient id="sheet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7f93c9"/><stop offset="0.55" stop-color="#ffffff"/><stop offset="1" stop-color="#7f93c9"/></linearGradient></defs>'
    );
    for (const y of [140, 400]) {
      svg.polygon(
        [
          [40, y],
          [260, y - 60],
          [480, y],
          [260, y + 60],
        ],
        { fill: 'url(#sheet)', opacity: 0.85 }
      );
      svg.ellipse(260, y, 110, 38, { stroke: CURR, width: 5 });
      svg.arrow(276, y + 38, 316, y + 34, { color: CURR, width: 5, head: 18 });
    }
    return svg.render();
  },

  // 22.10 problem — a long wire above a rectangular loop
  Figure_22_10_04: () => {
    const svg = new Svg({
      width: 900,
      height: 420,
      title: 'A long straight wire near a rectangular current loop',
      desc: 'A long straight wire at the top carries I1 = 15.0 A to the right. Below it, 7.50 cm away, is the top of a rectangular loop 30.0 cm wide and 10.0 cm tall carrying I2 = 30.0 A counterclockwise: right along the bottom, up the right side, left along the top and down the left side.',
    });
    // 30.0 cm by 10.0 cm loop, 7.50 cm below the wire, at 15 px per cm.
    const s = 15;
    const [L, T] = [200, 70 + 7.5 * s];
    const [R, B] = [L + 30 * s, T + 10 * s];
    svg.line(20, 70, 880, 70, { color: CURR, width: 2.5 });
    svg.arrow(400, 70, 450, 70, { color: CURR, width: 2.5, head: 18 });
    lab(svg, 430, 42, 'I_1 = 15.0 \\rm{A}');
    svg.rect(L, T, R - L, B - T, { stroke: CURR, width: 2.5 });
    svg.arrow((L + R) / 2 + 25, T, (L + R) / 2 - 25, T, { color: CURR, width: 2.5, head: 18 });
    svg.arrow((L + R) / 2 - 25, B, (L + R) / 2 + 25, B, { color: CURR, width: 2.5, head: 18 });
    lab(svg, (L + R) / 2, B - 26, 'I_2 = 30.0 \\rm{A}');
    const dimV = (x, y1, y2) => {
      svg.arrow(x, y1 + 1, x, y2 - 1, { color: COLORS.black, width: 1.4, head: 10, start: true });
      for (const y of [y1, y2]) svg.line(x - 10, y, x + 10, y, { color: COLORS.black, width: 1.4 });
    };
    dimV(R - 6, 70, T);
    lab(svg, R + 12, (70 + T) / 2, '7.50 \\rm{cm}', { anchor: 'start', size: 22 });
    dimV(L - 30, T, B);
    lab(svg, L - 44, (T + B) / 2, '10.0 \\rm{cm}', { anchor: 'end', size: 22 });
    // The dimension line breaks around its label instead of running through it.
    const mid = (L + R) / 2;
    for (const [from, to] of [
      [mid - 48, L + 1],
      [mid + 48, R - 1],
    ])
      svg.arrow(from, B + 40, to, B + 40, { color: COLORS.black, width: 1.4, head: 10 });
    for (const x of [L, R]) svg.line(x, B + 30, x, B + 50, { color: COLORS.black, width: 1.4 });
    lab(svg, mid, B + 40, '30.0 \\rm{cm}', { size: 22 });
    return svg.render();
  },

  // 22.10 problem — three wires on a triangle, four on a square
  Figure_22_10_05: () => {
    const svg = new Svg({
      width: 960,
      height: 420,
      title: 'Parallel wires at the corners of a triangle and a square',
      desc: '(a) Three parallel wires seen end on at the corners of an equilateral triangle 10.0 cm on a side. The top wire carries 5.00 A out of the page; the bottom left carries 10.0 A into the page and the bottom right 20.0 A into the page. (b) Four parallel wires at the corners of a square 20.0 cm on a side. The top two each carry 10.0 A out of the page; the bottom two each carry 5.00 A into the page.',
    });
    const dimLine = (P, Q, label, off) => {
      const [dx, dy] = [Q[0] - P[0], Q[1] - P[1]];
      const L = Math.hypot(dx, dy);
      const [ux, uy] = [dx / L, dy / L];
      const [nx, ny] = [-uy * off, ux * off];
      const A = [P[0] + ux * 26 + nx, P[1] + uy * 26 + ny];
      const B = [Q[0] - ux * 26 + nx, Q[1] - uy * 26 + ny];
      svg.arrow(...A, ...B, { color: CURR, width: 1.6, head: 11, start: true });
      const a = (Math.atan2(dy, dx) * 180) / Math.PI;
      const rot = a > 90 || a < -90 ? a + 180 : a;
      svg.text((A[0] + B[0]) / 2 + nx * 0.9, (A[1] + B[1]) / 2 + ny * 0.9, label, {
        size: 18,
        rotate: Math.abs(rot) < 1 ? undefined : rot,
      });
    };
    // (a) Equilateral triangle, side 10.0 cm.
    const side = 220;
    const A0 = [80, 330];
    const A1 = [80 + side, 330];
    const A2 = [80 + side / 2, 330 - side * Math.sin(rad(60))];
    dimLine(A0, A1, '10.0 \\rm{cm}', 20);
    dimLine(A1, A2, '10.0 \\rm{cm}', 20);
    dimLine(A2, A0, '10.0 \\rm{cm}', 20);
    mark(svg, ...A2, true, { r: 18 });
    mark(svg, ...A0, false, { r: 18 });
    mark(svg, ...A1, false, { r: 18 });
    lab(svg, A2[0] + 28, A2[1] - 8, '5.00 \\rm{A}', { anchor: 'start', size: 20 });
    lab(svg, A0[0] - 6, A0[1] + 40, '10.0 \\rm{A}', { size: 20 });
    lab(svg, A1[0] + 6, A1[1] + 40, '20.0 \\rm{A}', { size: 20 });
    caption(svg, 190, 405, '(a)');
    // (b) Square, side 20.0 cm.
    const [L, T, S] = [560, 70, 260];
    const corners = [
      [L, T, true, '10.0 \\rm{A}'],
      [L + S, T, true, '10.0 \\rm{A}'],
      [L, T + S, false, '5.00 \\rm{A}'],
      [L + S, T + S, false, '5.00 \\rm{A}'],
    ];
    dimLine([L, T], [L + S, T], '20.0 \\rm{cm}', 22);
    dimLine([L, T + S], [L + S, T + S], '20.0 \\rm{cm}', -22);
    dimLine([L, T + S], [L, T], '20.0 \\rm{cm}', -22);
    dimLine([L + S, T], [L + S, T + S], '20.0 \\rm{cm}', -22);
    for (const [x, y, out, s] of corners) {
      mark(svg, x, y, out, { r: 18 });
      lab(svg, x + (x === L ? -26 : 26), y + (y === T ? -24 : 30), s, {
        anchor: x === L ? 'end' : 'start',
        size: 20,
      });
    }
    caption(svg, L + S / 2, 405, '(b)');
    return svg.render();
  },

  // 22.11 problem — field to the left and right of three currents
  Figure_22_11_03: () => {
    const svg = new Svg({
      width: 600,
      height: 500,
      title: 'Field on either side of a current',
      desc: 'Three panels, each with a vertical line dividing Left from Right. (a) A current I runs up. (b) An electron moves up with velocity v. (c) A current I runs down.',
    });
    const panel = (x, draw, cap) => {
      svg.text(x - 8, 26, 'Left', { size: 24, math: false, anchor: 'end' });
      svg.text(x + 8, 26, 'Right', { size: 24, math: false, anchor: 'start' });
      svg.line(x, 4, x, 440, { color: COLORS.black, width: 1.5 });
      draw(x);
      caption(svg, x, 476, cap);
    };
    panel(
      100,
      x => {
        svg.line(x, 440, x, 120, { color: CURR, width: 4 });
        svg.arrow(x, 160, x, 100, { color: CURR, width: 4, head: 22 });
        lab(svg, x + 24, 116, '**I**', { anchor: 'start' });
      },
      '(a)'
    );
    panel(
      300,
      x => {
        svg.line(x, 440, x, 120, { color: VEL, width: 4 });
        svg.arrow(x, 160, x, 100, { color: VEL, width: 4, head: 22 });
        lab(svg, x + 24, 116, '**v**', { anchor: 'start' });
        svg.circle(x, 260, 8, { fill: '#e67e22' });
        lab(svg, x + 22, 256, 'e^−', { anchor: 'start' });
      },
      '(b)'
    );
    panel(
      500,
      x => {
        svg.line(x, 4, x, 340, { color: CURR, width: 4 });
        svg.arrow(x, 290, x, 350, { color: CURR, width: 4, head: 22 });
        lab(svg, x + 24, 330, '**I**', { anchor: 'start' });
      },
      '(c)'
    );
    return svg.render();
  },

  // 22.11 problem — a current loop beside a straight wire
  Figure_22_11_06: () => {
    const svg = new Svg({
      width: 640,
      height: 400,
      title: 'A current loop and a straight wire',
      desc: 'A circular loop of radius R carries current I1, shown by an arrow circulating clockwise on the loop. A long straight wire carrying current I2 runs diagonally from lower left to upper right just below the loop, in the same plane; the direction of I2 is not shown.',
    });
    const [cx, cy, R] = [210, 175, 120];
    svg.circle(cx, cy, R, { fill: 'none', stroke: CURR, width: 5 });
    // Clockwise (increasing angle with y down): arrowhead on the upper right of the loop.
    const on = a => [cx + R * Math.cos(rad(a)), cy + R * Math.sin(rad(a))];
    svg.arrow(...on(-44), ...on(-24), { color: CURR, width: 5, head: 26 });
    // The wire is tangent to the loop at its lower right.
    const t = rad(-33);
    const u = [Math.cos(t), Math.sin(t)];
    const P = [cx - R * Math.sin(t), cy + R * Math.cos(t)];
    svg.line(P[0] - 260 * u[0], P[1] - 260 * u[1], P[0] + 400 * u[0], P[1] + 400 * u[1], {
      color: CURR,
      width: 5,
    });
    svg.circle(cx, cy, 6, { fill: COLORS.black });
    svg.line(cx, cy, cx + R * Math.cos(rad(122)), cy + R * Math.sin(rad(122)), {
      color: COLORS.black,
      width: 2,
    });
    lab(svg, cx + 8, cy + 66, 'R', { size: 34 });
    lab(svg, cx + 150, cy - 130, '**I**_1', { size: 36 });
    lab(svg, 500, 220, '**I**_2', { size: 36 });
    return svg.render();
  },
};
