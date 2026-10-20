/**
 * Chapter 3 (two-dimensional kinematics): vector addition and subtraction,
 * components, city-block maps, and projectile trajectories.
 *
 * Vector diagrams are drawn to scale from the magnitudes and angles in the
 * text, so a ruler-and-protractor reading of a figure agrees with the worked
 * solution.
 */
import { COLORS, Frame, Svg, rad } from './svg.js';

const VEC = COLORS.vector;
const RED = COLORS.red;
const BLUE = COLORS.blue;
const MAROON = COLORS.maroon;
const BLACK = COLORS.black;

const polar = Frame.polar;
const add = (...vs) => vs.reduce(([a, b], [c, d]) => [a + c, b + d], [0, 0]);
const neg = ([a, b]) => [-a, -b];
const dir = ([a, b]) => (Math.atan2(b, a) * 180) / Math.PI;

/** Short perpendicular ticks every `step` units along a vector (a "ruler"). */
function ticks(f, from, r, a, step, { len = 6, color = VEC } = {}) {
  const [ux, uy] = polar(1, a);
  for (let s = step; s < r - step * 0.3; s += step) {
    const [x, y] = f.p(from[0] + ux * s, from[1] + uy * s);
    const nx = -uy * len;
    const ny = -ux * len;
    f.svg.line(x - nx, y - ny, x + nx, y + ny, { color, width: 1.3 });
  }
}

// ---------------------------------------------------------------------------
// City map shared by the "9 blocks east, 5 blocks north" figures.
// ---------------------------------------------------------------------------

const PARKS = new Set(['0,5', '4,5', '5,5', '8,5', '8,4', '8,2', '0,1', '1,0', '5,1', '5,4']);

/** Light-gray city blocks between integer street lines, with a few green parks. */
function cityBlocks(f, { cols = 9, rows = 6, gap = 0.1 } = {}) {
  const s = f.scale;
  for (let i = 0; i < cols; i += 1) {
    for (let j = 0; j < rows; j += 1) {
      const [x, y] = f.p(i + gap, j + 1 - gap);
      const h = j === rows - 1 ? 0.75 : 1 - 2 * gap;
      const park = PARKS.has(`${i},${j}`);
      f.svg.rect(x, y, (1 - 2 * gap) * s, h * s, { fill: park ? '#9ed39a' : '#e3e1e8' });
    }
  }
}

/** The map frame: blocks, street numbers, captions and a compass. */
function cityMap({ title, desc, compassLeft = false, width = 760, height = 330 }) {
  const svg = new Svg({ width, height, title, desc });
  const ox = compassLeft ? 300 : 175;
  const f = new Frame(svg, { ox, oy: 255, scale: 37 });
  cityBlocks(f);
  for (let i = 0; i <= 9; i += 1) {
    const [x, y] = f.p(i, 0);
    svg.text(x, y + 22, String(i), { size: 16, math: false });
  }
  // With the axis on the left, "0" is already labeled on the x axis.
  for (let j = compassLeft ? 1 : 0; j <= 5; j += 1) {
    const [x, y] = f.p(compassLeft ? 0 : 9, j);
    svg.text(x + (compassLeft ? -16 : 16), y, String(j), { size: 16, math: false });
  }
  const [x9] = f.p(9, 0);
  const [, y5] = f.p(0, 5);
  svg.text(x9 + 18, f.oy + 24, 'x', { size: 17 });
  svg.text(compassLeft ? ox - 16 : x9 + 2, y5 - 30, 'y', { size: 17 });
  svg.text(f.p(4.5, 0)[0], f.oy + 52, '9 blocks east', { size: 17, math: false });
  svg.text(x9 + (compassLeft ? 22 : 48), f.p(0, 2.5)[1], '5 blocks north', {
    size: 17,
    math: false,
    rotate: -90,
  });
  svg.text(ox - (compassLeft ? 24 : 18), f.oy, 'Starting point', {
    size: 16,
    math: false,
    anchor: 'end',
  });
  svg.text(x9 - 50, 22, 'Destination', { size: 16, math: false, anchor: 'end' });
  svg.line(x9 - 45, 26, x9 - 2, y5 - 2, { color: BLACK, width: 1.2 });
  svg.compass(compassLeft ? 70 : 680, 130, { r: 32, size: 16 });
  return { svg, f };
}

/** Diagonal path from (0, 0) to (9, 5) with its angle, as a heavy red arrow. */
function diagonal(f, label, { color = RED } = {}) {
  f.vec([0, 0], [9, 5], { color, width: 4.5, head: 20 });
  f.angle([0, 0], 0, dir([9, 5]), 70, null, { color: BLACK });
  f.text([3.3, 0.45], 'θ = 29.1°', { size: 17, anchor: 'start' });
  const [x, y] = f.p(3.3, 2.75);
  f.svg.text(x, y, label, { size: 17, math: false, rotate: -dir([9, 5]) });
}

// ---------------------------------------------------------------------------
// Example 3.1 vectors (woman walking on a field): A = 25.0 m at 49°,
// B = 23.0 m at 15°, C = 32.0 m at −68°; R = 50.8 m at −5.47°.
// ---------------------------------------------------------------------------
const WALK = {
  A: polar(25, 49),
  B: polar(23, 15),
  C: polar(32, -68),
};

function headToTail(order, { withR }) {
  const firstIsC = order[0] === 'C';
  const svg = new Svg({
    width: 560,
    height: firstIsC ? 440 : 360,
    title: withR ? `Resultant of ${order.join(' + ')}` : 'Vectors A, B and C placed head to tail',
    desc: withR
      ? `Vectors ${order.join(', ')} placed head to tail. The resultant R, drawn from the tail of the first to the head of the last, is 50.8 m at 5.47° below the +x axis.`
      : 'Vector A (25.0 m at 49°), then B (23.0 m at 15°) from the head of A, then C (32.0 m at 68° below the horizontal) from the head of B.',
  });
  const f = new Frame(svg, { ox: 40, oy: firstIsC ? 150 : 250, scale: 8 });
  f.axes({ xMin: 0, xMax: 62, yMin: firstIsC ? -26 : -7, yMax: firstIsC ? 16 : 29 });
  let at = [0, 0];
  for (const name of order) {
    const v = WALK[name];
    const tip = add(at, v);
    f.vec(at, tip, { color: VEC, width: 3.5, head: 17 });
    const off = name === 'C' ? -18 : 18;
    f.labelSeg(at, tip, `**${name}**`, { off: name === 'B' ? -20 : off, size: 19 });
    at = tip;
  }
  if (withR) {
    f.vec([0, 0], at, { color: VEC, width: 5, head: 20 });
    f.labelSeg([0, 0], at, '**R**', { off: -24, along: firstIsC ? 0.5 : 0.75, size: 19 });
    f.labelSeg([0, 0], at, '50.8 \\rm{m}', { off: -24, along: firstIsC ? 0.22 : 0.33, size: 18 });
    f.angle([0, 0], dir(at), 0, 32 * 8, null);
    const [x, y] = f.p(...polar(33, -2.7));
    svg.text(x + 28, y - 2, '5.47°', { size: 17, anchor: 'start' });
  }
  return svg.render();
}

// ---------------------------------------------------------------------------
// Example 3.2 vectors (woman sailing): A = 27.5 m at 66°, B = 30.0 m at 112°.
// ---------------------------------------------------------------------------
const SAIL_A = polar(27.5, 66);
const SAIL_B = polar(30, 112);

// ---------------------------------------------------------------------------
// Section 3.3 example: A = 53.0 m at 20.0°, B = 34.0 m at 63.0°.
// ---------------------------------------------------------------------------
const EX_A = polar(53, 20);
const EX_B = polar(34, 63);

/**
 * A + B = R with optional component projections, for Figures 3.3.5–3.3.9.
 * level: 0 = vectors only, 1 = + components, 2 = + R components;
 * numbers: annotate magnitudes and angles.
 */
function components({ level, numbers, scaleA = EX_A, scaleB = EX_B, title, desc }) {
  const svg = new Svg({ width: 690, height: 430, title, desc });
  const f = new Frame(svg, { ox: 255, oy: 320, scale: 3.7 });
  const R = add(scaleA, scaleB);
  f.axes({ xMin: -4, xMax: R[0] + (level >= 2 ? 34 : 14), yMin: -4, yMax: R[1] + 12 });
  svg.compass(60, 70, { r: 26, size: 15 });
  const dash = '5 4';
  if (level >= 1) {
    // Guides from vector tips to the axes.
    f.line(scaleA, [scaleA[0], -14], { color: BLACK, width: 1, dash });
    f.line(R, [R[0], -(level >= 2 ? 24 : 14)], { color: BLACK, width: 1, dash });
    f.line(scaleA, [-14, scaleA[1]], { color: BLACK, width: 1, dash });
    f.line(R, [-14, R[1]], { color: BLACK, width: 1, dash });
    if (level >= 2) f.line(R, [R[0] + 28, R[1]], { color: BLACK, width: 1, dash });
    f.line([0, 0], [0, -14], { color: BLACK, width: 1, dash });
    f.line([0, 0], [-14, 0], { color: BLACK, width: 1, dash });
    // x components below the axis, y components left of it.
    f.vec([0, -10], [scaleA[0], -10], { color: RED, width: 2, dash, head: 11 });
    f.vec([scaleA[0], -10], [R[0], -10], { color: BLUE, width: 2, dash, head: 11 });
    f.vec([-10, 0], [-10, scaleA[1]], { color: RED, width: 2, dash, head: 11 });
    f.vec([-10, scaleA[1]], [-10, R[1]], { color: BLUE, width: 2, dash, head: 11 });
    const ax = numbers ? 'A_x = 49.8 \\rm{m}' : '**A**_x';
    const bx = numbers ? 'B_x = 15.4 \\rm{m}' : '**B**_x';
    const ay = numbers ? 'A_y = 18.1 \\rm{m}' : '**A**_y';
    const by = numbers ? 'B_y = 30.3 \\rm{m}' : '**B**_y';
    f.text([scaleA[0] / 2, -10], ax, { dy: 18, size: 16 });
    f.text([(scaleA[0] + R[0]) / 2, -10], bx, { dy: 18, dx: numbers ? 14 : 0, size: 16 });
    f.text([-10, scaleA[1] / 2], ay, { dx: -12, size: 16, anchor: 'end' });
    f.text([-10, (scaleA[1] + R[1]) / 2], by, { dx: -12, size: 16, anchor: 'end' });
  }
  if (level >= 2) {
    f.vec([0, -20], [R[0], -20], { color: BLACK, width: 1.4, head: 10 });
    f.vec([R[0] + 24, 0], [R[0] + 24, R[1]], { color: BLACK, width: 1.4, head: 10 });
    const rx = numbers ? 'R_x = A_x + B_x = 65.2 \\rm{m}' : 'R_x = A_x + B_x';
    const ry = numbers ? 'R_y = A_y + B_y = 48.4 \\rm{m}' : 'R_y = A_y + B_y';
    f.text([R[0] / 2, -20], rx, { dy: 18, size: 16 });
    f.text([R[0] + 24, R[1] / 2], ry, { dx: 14, size: 16, rotate: -90 });
  }
  f.vec([0, 0], scaleA, { color: RED, width: 3.5, head: 16 });
  f.vec(scaleA, R, { color: BLUE, width: 3.5, head: 16 });
  f.vec([0, 0], R, { color: BLACK, width: 3.5, head: 16 });
  f.labelSeg([0, 0], scaleA, '**A**', {
    off: numbers ? 16 : -18,
    along: numbers ? 0.45 : 0.55,
    size: 18,
  });
  f.labelSeg(scaleA, R, '**B**', { off: -18, along: numbers ? 0.85 : 0.6, size: 18 });
  f.labelSeg([0, 0], R, '**R**', { off: -18, along: 0.6, size: 18 });
  f.text([R[0] * 0.38, R[1] + 4], '**A** + **B** = **R**', { size: 18 });
  if (numbers) {
    f.angle([0, 0], 0, 20, 70, 'θ_\\rm{A} = 20.0°', { labelR: 92, dx: 26, dy: 2 });
    f.angle([0, 0], 20, dir(R), 50, null);
    f.text(polar(32, 52), 'θ = 36.6°', { size: 15, anchor: 'end' });
    f.line(scaleA, add(scaleA, [10, 0]), { color: BLACK, width: 1 });
    f.angle(scaleA, 0, 63, 26, null);
    f.text([R[0] + 2, scaleA[1] + 4], 'θ_\\rm{B} = 63.0°', { size: 16, anchor: 'start' });
    f.text(scaleA, 'A = 53.0 \\rm{m}', { dx: 4, dy: 30, size: 16, anchor: 'start' });
    f.text([R[0] + 2, scaleA[1] + EX_B[1] * 0.55], 'B = 34.0 \\rm{m}', {
      size: 16,
      anchor: 'start',
    });
    if (level >= 2)
      f.labelSeg([0, 0], R, 'R = 81.2 \\rm{m}', {
        off: 16,
        along: 0.62,
        size: 16,
        rotate: -dir(R),
      });
  }
  return svg.render();
}

/** A vector with dashed x and y components (Figures 3.3.1, 3.3.2 and 3.3.4). */
function resolve({ title, desc, xLabel, yLabel, extra }) {
  const svg = new Svg({ width: 340, height: 400, title, desc });
  const f = new Frame(svg, { ox: 38, oy: 350, scale: 1 });
  const A = polar(330, 60);
  f.axes({ xMin: 0, xMax: 230, yMin: -12, yMax: 320 });
  f.vec([0, 0], [A[0], 0], { color: RED, width: 2, dash: '6 4', head: 13 });
  f.vec([A[0], 0], A, { color: RED, width: 2, dash: '6 4', head: 13 });
  f.vec([0, 0], A, { color: RED, width: 4, head: 20 });
  f.rightAngle([A[0], 0], 180, 90, 18);
  f.angle([0, 0], 0, 60, 34, 'θ', { labelR: 50, size: 18 });
  f.labelSeg([0, 0], A, '**A**', { off: 20, size: 19 });
  f.text([A[0] / 2, 0], xLabel, { dy: 24, size: 18 });
  f.text([A[0], A[1] * 0.5], yLabel, { dx: 14, size: 18, anchor: 'start' });
  if (extra) extra(f, svg, A);
  return svg.render();
}

export default {
  // 3.1 — walking 9 blocks east and 5 blocks north
  Figure_03_01_02: () => {
    const { svg, f } = cityMap({
      title: 'Walking 9 blocks east and 5 blocks north',
      desc: 'A city map with streets numbered 0 to 9 east and 0 to 5 north. The path runs 9 blocks east from the starting point at the origin, then 5 blocks north to the destination.',
    });
    f.vec([0, 0], [9, 0], { color: COLORS.accel, width: 4.5, head: 20 });
    f.vec([9, 0], [9, 5], { color: COLORS.accel, width: 4.5, head: 20 });
    f.rightAngle([9, 0], 180, 90, 16);
    return svg.render();
  },

  // 3.1 — the straight-line path is 10.3 blocks at 29.1°
  Figure_03_01_04: () => {
    const { svg, f } = cityMap({
      title: 'Straight-line path of 10.3 blocks at 29.1°',
      desc: 'The east and north legs of the walk (9 blocks east, 5 blocks north) and the straight-line path from start to destination: 10.3 blocks at θ = 29.1° north of east.',
    });
    f.vec([0, 0], [9, 0], { color: RED, width: 4.5, head: 20 });
    f.vec([9, 0], [9, 5], { color: RED, width: 4.5, head: 20 });
    f.rightAngle([9, 0], 180, 90, 16);
    diagonal(f, 'Path 10.3 blocks');
    return svg.render();
  },

  // 3.2 — a displacement vector of 10.3 blocks at 29.1°
  Figure_03_02_02: () => {
    const { svg, f } = cityMap({
      title: 'Displacement of 10.3 blocks at 29.1° north of east',
      desc: 'A city map with x (east) and y (north) axes. The displacement from the starting point to the destination, 9 blocks east and 5 blocks north, is an arrow 10.3 blocks long at 29.1° north of east.',
      compassLeft: true,
    });
    f.vec([0, 0], [9.6, 0], { color: RED, width: 3, head: 16 });
    f.vec([0, 0], [0, 5.6], { color: RED, width: 3, head: 16 });
    diagonal(f, 'Path 10.3 blocks');
    return svg.render();
  },

  // 3.2 Step 1 — the first vector, 9 units east
  Figure_03_02_05: () => {
    const svg = new Svg({
      width: 360,
      height: 360,
      title: 'Step 1: the first vector',
      desc: 'A vector 9 units long along the +x axis (θ = 0°), with unit tick marks.',
    });
    const f = new Frame(svg, { ox: 30, oy: 280, scale: 28 });
    f.axes({ xMin: 0, xMax: 11, yMin: -0.9, yMax: 9.3 });
    for (let k = 1; k <= 9; k += 1) f.line([k, 0], [k, -0.3], { color: BLACK, width: 1.3 });
    f.vec([0, 0], [9, 0], { color: VEC, width: 4, head: 18 });
    f.text([0.8, 0.6], 'θ = 0°', { size: 18, anchor: 'start' });
    f.text([4.5, -1.6], '9 \\rm{units}', { size: 18 });
    return svg.render();
  },

  // 3.2 Step 2 — the second vector placed at the head of the first
  Figure_03_02_06: () => {
    const svg = new Svg({
      width: 360,
      height: 360,
      title: 'Step 2: the second vector placed head to tail',
      desc: 'A vector 9 units along +x, followed by a vector 5 units in the +y direction starting at the head of the first.',
    });
    const f = new Frame(svg, { ox: 30, oy: 280, scale: 28 });
    f.axes({ xMin: 0, xMax: 11, yMin: -0.9, yMax: 9.3 });
    f.vec([0, 0], [9, 0], { color: VEC, width: 4, head: 18 });
    f.vec([9, 0], [9, 5], { color: VEC, width: 4, head: 18 });
    return svg.render();
  },

  // 3.2 Example — the three displacement vectors drawn separately
  Figure_03_02_08: () => {
    const svg = new Svg({
      width: 1000,
      height: 330,
      title: 'Displacement vectors A, B and C',
      desc: 'A is 25 m at θA = 49° above the +x axis; B is 23.0 m at θB = 15°; C is 32.0 m at θC = 68° below the +x axis. A compass shows north up and east to the right.',
    });
    const s = 5.4;
    // A
    let f = new Frame(svg, { ox: 35, oy: 245, scale: s });
    f.axes({ xMin: 0, xMax: 48, yMin: -9, yMax: 42 });
    f.vec([0, 0], WALK.A, { color: VEC, width: 3.5, head: 16 });
    ticks(f, [0, 0], 25, 49, 5);
    f.labelSeg([0, 0], WALK.A, '25 \\rm{m}', {
      off: 22,
      along: 0.45,
      size: 17,
      rotate: -49,
      italic: false,
    });
    f.labelSeg([0, 0], WALK.A, '**A**', { off: -20, along: 0.8, size: 19 });
    f.angle([0, 0], 0, 49, 100, null);
    f.text([25, 3.4], 'θ_\\rm{A} = 49°', { size: 17, anchor: 'start' });
    // B
    f = new Frame(svg, { ox: 360, oy: 245, scale: s });
    f.axes({ xMin: 0, xMax: 48, yMin: -9, yMax: 42 });
    f.vec([0, 0], WALK.B, { color: VEC, width: 3.5, head: 16 });
    ticks(f, [0, 0], 23, 15, 5);
    f.labelSeg([0, 0], WALK.B, '23.0 \\rm{m}', { off: 20, along: 0.45, size: 17, rotate: -15 });
    f.labelSeg([0, 0], WALK.B, '**B**', { off: 24, along: 0.85, size: 19 });
    f.angle([0, 0], 0, 15, 100, null);
    f.text([25, 3.4], 'θ_\\rm{B} = 15°', { size: 17, anchor: 'start' });
    // C
    f = new Frame(svg, { ox: 680, oy: 72, scale: s });
    f.axes({ xMin: 0, xMax: 33, yMin: -6, yMax: 10 });
    f.vec([0, 0], WALK.C, { color: VEC, width: 3.5, head: 16 });
    ticks(f, [0, 0], 32, -68, 5);
    f.labelSeg([0, 0], WALK.C, '32.0 \\rm{m}', { off: 22, along: 0.45, size: 17, rotate: 68 });
    f.labelSeg([0, 0], WALK.C, '**C**', { off: -22, along: 0.5, size: 19 });
    f.angle([0, 0], -68, 0, 30, null);
    f.text([7, -3.2], 'θ_\\rm{C} = 68°', { size: 17, anchor: 'start' });
    svg.compass(940, 140, { r: 30, size: 16 });
    return svg.render();
  },

  // 3.2 Example — A, B and C head to tail
  Figure_03_02_09: () => headToTail(['A', 'B', 'C'], { withR: false }),

  // 3.2 Example — the resultant R
  Figure_03_02_10: () => headToTail(['A', 'B', 'C'], { withR: true }),

  // 3.2 Example — adding in a different order gives the same R
  Figure_03_02_12: () => headToTail(['C', 'A', 'B'], { withR: true }),

  // 3.2 — the negative of a vector
  Figure_03_02_13: () => {
    const svg = new Svg({
      width: 190,
      height: 240,
      title: 'A vector B and its negative −B',
      desc: 'Two parallel arrows of equal length: B points up and to the right; −B points down and to the left.',
    });
    svg.arrow(10, 222, 148, 8, { color: VEC, width: 3.5, head: 20 });
    svg.arrow(176, 32, 38, 228, { color: VEC, width: 3.5, head: 20 });
    svg.text(52, 98, '**B**', { size: 21 });
    svg.text(140, 145, '−**B**', { size: 21 });
    return svg.render();
  },

  // 3.2 Example — the two legs of the sailing trip
  Figure_03_02_14: () => {
    const svg = new Svg({
      width: 720,
      height: 260,
      title: 'Vectors A and B for the sailing trip',
      desc: 'A is 27.5 m at 66° above the horizontal; B is 30.0 m at 112°.',
    });
    svg.xyIndicator(35, 190, { len: 85 });
    const s = 5.6;
    let f = new Frame(svg, { ox: 235, oy: 190, scale: s });
    f.line([-6, 0], [14, 0], { color: BLACK, width: 1.5 });
    f.vec([0, 0], SAIL_A, { color: VEC, width: 3.5, head: 18 });
    f.angle([0, 0], 0, 66, 34, '66°', { labelR: 48, dx: 6 });
    f.labelSeg([0, 0], SAIL_A, '**A**', { off: 22, along: 0.8, size: 19 });
    f.text([12, 14], 'A = 27.5 \\rm{m}', { size: 19, anchor: 'start' });
    f = new Frame(svg, { ox: 540, oy: 190, scale: s });
    f.line([-6, 0], [6, 0], { color: BLACK, width: 1.5 });
    f.vec([0, 0], SAIL_B, { color: VEC, width: 3.5, head: 18 });
    f.angle([0, 0], 0, 112, 34, '112°', { labelR: 52, dx: 12 });
    f.labelSeg([0, 0], SAIL_B, '**B**', { off: -22, along: 0.8, size: 19 });
    f.text([10, 14], 'B = 30.0 \\rm{m}', { size: 19, anchor: 'start' });
    return svg.render();
  },

  // 3.2 Example — the opposite of B
  Figure_03_02_15: () => {
    const svg = new Svg({
      width: 340,
      height: 300,
      title: 'The vector −B',
      desc: '−B is 30.0 m long and points 68° below the horizontal; the dotted line continues in the direction of B, 112° above the horizontal.',
    });
    svg.xyIndicator(35, 100, { len: 85 });
    const f = new Frame(svg, { ox: 210, oy: 98, scale: 6 });
    f.line([-5, 0], [20, 0], { color: BLACK, width: 1.5 });
    const mB = neg(SAIL_B);
    f.vec([0, 0], mB, { color: VEC, width: 3.5, head: 18 });
    f.line([0, 0], polar(6.5, 112), { color: VEC, width: 3.5, dash: '4 4' });
    f.angle([0, 0], 0, 112, 32, '112°', { labelR: 32, dx: 30, dy: -18 });
    f.angle([0, 0], -68, 0, 46, '68°', { labelR: 66, dx: 8 });
    f.labelSeg([0, 0], mB, '−**B**', { off: -24, along: 0.62, size: 19 });
    return svg.render();
  },

  // 3.2 Example — A − B
  Figure_03_02_16: () => {
    const svg = new Svg({
      width: 470,
      height: 280,
      title: 'A + (−B) = R',
      desc: 'A (27.5 m at 66°) followed by −B (30.0 m at 68° below the horizontal) gives the resultant R = 23.0 m at 7.5° below the horizontal.',
    });
    svg.xyIndicator(30, 160, { len: 85 });
    const f = new Frame(svg, { ox: 200, oy: 160, scale: 4.8 });
    const R = add(SAIL_A, neg(SAIL_B));
    f.line([-3, 0], [31, 0], { color: BLACK, width: 1.5 });
    f.vec([0, 0], SAIL_A, { color: VEC, width: 3.5, head: 17 });
    f.vec(SAIL_A, R, { color: VEC, width: 3.5, head: 17 });
    f.vec([0, 0], R, { color: VEC, width: 3.5, head: 17 });
    f.labelSeg([0, 0], SAIL_A, '**A**', { off: 20, size: 19 });
    f.labelSeg(SAIL_A, R, '−**B**', { off: -22, along: 0.4, size: 19 });
    f.labelSeg([0, 0], R, '**R**', { off: -22, along: 0.3, size: 19 });
    f.angle([0, 0], dir(R), 0, 72, null);
    f.text([10, 4], '7.5°', { size: 17 });
    f.text([22, -8], 'R = 23.0 \\rm{m}', { size: 18, anchor: 'start' });
    f.text([26, 25], '**A** − **B** = **R**', { size: 19, anchor: 'start' });
    return svg.render();
  },

  // 3.2 Example — A + B (the location of the dock)
  Figure_03_02_17: () => {
    const svg = new Svg({
      width: 440,
      height: 360,
      title: 'A + B = R′',
      desc: 'A (27.5 m at 66°) followed by B (30.0 m at 112°) gives R′ = 52.9 m at 90.1°, almost due north.',
    });
    svg.xyIndicator(30, 320, { len: 85 });
    const f = new Frame(svg, { ox: 270, oy: 320, scale: 5.6 });
    const R = add(SAIL_A, SAIL_B);
    f.line([-2, 0], [12, 0], { color: BLACK, width: 1.5 });
    f.line(SAIL_A, add(SAIL_A, [9, 0]), { color: BLACK, width: 1.5 });
    f.vec([0, 0], SAIL_A, { color: VEC, width: 3.5, head: 17 });
    f.vec(SAIL_A, R, { color: VEC, width: 3.5, head: 17 });
    f.vec([0, 0], R, { color: VEC, width: 3.5, head: 17 });
    f.labelSeg([0, 0], SAIL_A, '**A**', { off: -18, along: 0.6, size: 19 });
    f.labelSeg(SAIL_A, R, '**B**', { off: -22, along: 0.55, size: 19 });
    f.labelSeg([0, 0], R, '**R′**', { off: 24, along: 0.55, size: 19 });
    f.angle(SAIL_A, 0, 112, 22, '112°', { labelR: 30, dx: 30, dy: 2 });
    f.angle([0, 0], 0, 66, 22, '66°', { labelR: 34, dx: 8, dy: 26 });
    f.angle([0, 0], 0, 90.1, 52, '90.1°', { labelR: 52, dx: 46, dy: -8 });
    f.text([-3, 20], 'R′ = 52.9 \\rm{m}', { size: 18, anchor: 'end' });
    f.text([-6, 44], '**A** + **B** = **R′**', { size: 19, anchor: 'end' });
    return svg.render();
  },

  // 3.2 / 3.3 Problems — paths A–D on a city map (blocks 120 m on a side)
  Figure_03_02_20: () => cityPaths(),
  Figure_03_03_11: () => cityPaths(),

  // 3.2 / 3.3 Problems — 18.0 m west then 25.0 m north
  Figure_03_02_21: () => westNorth(),
  Figure_03_03_13: () => westNorth(),

  // 3.2 Problems — 12.0 m at 20° west of north, then 20.0 m at 40° south of west
  Figure_03_02_22: () => {
    const svg = new Svg({
      width: 470,
      height: 330,
      title: 'Two displacements A and B and their sum R',
      desc: 'A is 12 m at 20° west of north; B is 20 m at 40° south of west, starting at the head of A. The resultant R runs from the origin to the head of B, at angle θ below the −x axis.',
    });
    const f = new Frame(svg, { ox: 280, oy: 265, scale: 10 });
    const A = polar(12, 110);
    const B = polar(20, 220);
    const R = add(A, B);
    f.axes({ xMin: -21, xMax: 9, yMin: -4, yMax: 21 });
    svg.compass(405, 85, { r: 30, size: 16 });
    f.line(A, add(A, [-6, 0]), { color: BLACK, width: 1.2, dash: '4 3' });
    f.line(R, [0, R[1]], { color: BLACK, width: 1.2 });
    f.vec([0, 0], A, { color: MAROON, width: 3, head: 15 });
    f.vec(A, R, { color: MAROON, width: 3, head: 15 });
    f.vec([0, 0], R, { color: MAROON, width: 4, head: 18 });
    f.labelSeg([0, 0], A, '**A**', { off: -16, along: 0.65, size: 19 });
    f.labelSeg([0, 0], A, 'A = 12 \\rm{m}', { off: 40, along: 0.35, size: 17 });
    f.labelSeg(A, R, '**B**', { off: -18, along: 0.4, size: 19 });
    f.labelSeg(A, R, 'B = 20 \\rm{m}', { off: -42, along: 0.75, size: 17 });
    f.labelSeg([0, 0], R, '**R**', { off: 18, along: 0.5, size: 19 });
    f.angle(A, 180, 220, 28, '40°', { labelR: 30, dx: -4, dy: -22 });
    f.angle([0, 0], 90, 110, 56, null);
    f.text([2.5, 5.8], '20°', { size: 17, anchor: 'start' });
    f.angle([0, 0], 180, dir(R), 120, 'θ', { labelR: 108, dy: -8 });
    f.text([-17, 13], '**A** + **B** = **R**', { size: 19 });
    return svg.render();
  },

  // 3.2 Problems — two velocities adding to v_tot
  Figure_03_02_23: () => {
    const svg = new Svg({
      width: 420,
      height: 360,
      title: 'Velocities vA and vB adding to vtot',
      desc: 'vA points 22.5° above the +x axis. vB starts at the head of vA. Their sum vtot = 6.72 m/s makes 26.5° with vA and 23.0° with vB.',
    });
    const f = new Frame(svg, { ox: 40, oy: 300, scale: 46 });
    const vA = polar(3.47, 22.5);
    const vB = polar(3.96, 72);
    const vT = add(vA, vB);
    f.axes({ xMin: 0, xMax: 7.6, yMin: -0.3, yMax: 6.1 });
    f.vec([0, 0], vA, { color: VEL3, width: 4, head: 18 });
    f.vec(vA, vT, { color: VEL3, width: 4, head: 18 });
    f.vec([0, 0], vT, { color: VEL3, width: 4, head: 20 });
    f.text(vA, '**v**_A', { dx: 16, dy: 14, size: 19, anchor: 'start' });
    f.labelSeg(vA, vT, '**v**_B', { off: -22, along: 0.6, size: 19 });
    f.labelSeg([0, 0], vT, '**v**_\\rm{tot}', { off: 26, along: 0.55, size: 19 });
    f.angle([0, 0], 0, 22.5, 80, '22.5°', { labelR: 100, dy: 4, dx: -6 });
    f.angle([0, 0], 22.5, 49, 120, '26.5°', { labelR: 100, dy: 2 });
    f.angle(vT, 229, 252, 70, '23.0°', { labelR: 92, dy: 6 });
    f.text([0.3, 5.75], 'v_\\rm{tot} = 6.72 \\rm{m/s}', { size: 18, anchor: 'start' });
    svg.leader(...f.p(1.6, 5.45), ...f.p(2.95, 3.5), { bend: 0.35 });
    f.text([4.6, 6.3], '**v**_\\rm{tot} = **v**_A + **v**_B', { size: 18 });
    return svg.render();
  },

  // 3.3 — components of a vector
  Figure_03_03_01: () =>
    resolve({
      title: 'A vector and its x and y components',
      desc: 'Vector A at angle θ above the +x axis is the sum of a horizontal component Ax along the x axis and a vertical component Ay; together they form a right triangle.',
      xLabel: '**A**_x',
      yLabel: '**A**_y',
      extra: (f, svg) => svg.text(250, 22, '**A**_x + **A**_y = **A**', { size: 19 }),
    }),

  // 3.3 — the components in terms of A and θ
  Figure_03_03_02: () =>
    resolve({
      title: 'Components of a vector: Ax = A cos θ and Ay = A sin θ',
      desc: 'Vector A at angle θ above the +x axis with components Ax = A cos θ along x and Ay = A sin θ along y.',
      xLabel: 'A_x = A cos θ',
      yLabel: 'A_y = A sin θ',
      extra: (f, svg) => svg.text(250, 22, '**A**_x + **A**_y = **A**', { size: 19 }),
    }),

  // 3.3 — components of the 10.3-block displacement
  Figure_03_03_03: () => {
    const { svg, f } = cityMap({
      title: 'Components of the 10.3-block displacement',
      desc: 'The displacement A = 10.3 blocks at θ = 29.1° has components Ax = A cos θ = 9.0 blocks east and Ay = A sin θ = 5.0 blocks north.',
      compassLeft: true,
      width: 900,
      height: 420,
    });
    f.vec([0, 0], [9, 0], { color: RED, width: 4.5, head: 20 });
    f.vec([0, 0], [0, 5], { color: RED, width: 4.5, head: 20 });
    diagonal(f, 'A = 10.3 blocks');
    svg.lines(
      690,
      120,
      ['A_y = A sin θ', '= (10.3 \\rm{blocks})(sin 29.1°)', '= 5.0 \\rm{blocks north}'],
      {
        size: 17,
        anchor: 'start',
      }
    );
    svg.lines(
      300,
      330,
      ['A_x = A cos θ', '= (10.3 \\rm{blocks})(cos 29.1°)', '= 9.0 \\rm{blocks east}'],
      {
        size: 17,
        anchor: 'start',
      }
    );
    return svg.render();
  },

  // 3.3 — magnitude and direction from the components
  Figure_03_03_04: () => {
    const svg = new Svg({
      width: 300,
      height: 380,
      title: 'Magnitude and direction from the components',
      desc: 'A vector A with components Ax and Ay. Its magnitude is A = √(Ax² + Ay²) and its direction is θ = tan⁻¹(Ay/Ax).',
    });
    const f = new Frame(svg, { ox: 15, oy: 330, scale: 1 });
    const A = polar(360, 55);
    f.vec([0, 0], [A[0], 0], { color: RED, width: 2, dash: '6 4', head: 13 });
    f.vec([A[0], 0], A, { color: RED, width: 2, dash: '6 4', head: 13 });
    f.vec([0, 0], A, { color: RED, width: 4, head: 20 });
    f.angle([0, 0], 0, 55, 40, 'θ', { labelR: 56, dx: -4, size: 18 });
    f.labelSeg([0, 0], A, '**A**', { off: -18, along: 0.6, size: 19 });
    f.labelSeg([0, 0], A, 'A = √(A_x^2 + A_y^2)', { off: 20, along: 0.45, size: 17, rotate: -55 });
    f.text([A[0] / 2, 0], '**A**_x', { dy: 18, size: 19 });
    f.text([A[0], A[1] * 0.45], '**A**_y', { dx: -12, size: 19, anchor: 'end' });
    f.text([A[0] * 0.66, A[1] * 0.22], 'θ = tan^{−1}(A_y/A_x)', { size: 17 });
    return svg.render();
  },

  // 3.3 — adding A and B
  Figure_03_03_05: () =>
    components({
      level: 0,
      title: 'Two vectors A and B adding to R',
      desc: 'Vector A starts at the origin; B starts at the head of A; the resultant R goes from the tail of A to the head of B.',
    }),

  // 3.3 — components of A and B
  Figure_03_03_06: () =>
    components({
      level: 1,
      title: 'Components of A and B',
      desc: 'Vectors A and B with their x components Ax and Bx drawn along the x axis and their y components Ay and By along the y axis.',
    }),

  // 3.3 — components of R
  Figure_03_03_07: () =>
    components({
      level: 2,
      title: 'Components of the resultant R',
      desc: 'The x component of the resultant is Rx = Ax + Bx and its y component is Ry = Ay + By.',
    }),

  // 3.3 Example — A = 53.0 m at 20.0°, B = 34.0 m at 63.0°
  Figure_03_03_08: () =>
    components({
      level: 0,
      numbers: true,
      title: 'Adding A = 53.0 m at 20.0° and B = 34.0 m at 63.0°',
      desc: 'A is 53.0 m at θA = 20.0° and B is 34.0 m at θB = 63.0°. The resultant R points at θ = 36.6°.',
    }),

  // 3.3 Example — the same addition by components
  Figure_03_03_09: () =>
    components({
      level: 2,
      numbers: true,
      title: 'Adding A and B by components',
      desc: 'Ax = 49.8 m, Bx = 15.4 m, so Rx = 65.2 m; Ay = 18.1 m, By = 30.3 m, so Ry = 48.4 m. The resultant is R = 81.2 m at θ = 36.6°.',
    }),

  // 3.3 — subtracting B from A by components
  Figure_03_03_10: () => {
    const svg = new Svg({
      width: 580,
      height: 370,
      title: 'A − B = R by components',
      desc: 'A at angle θA above the +x axis, followed by −B, gives R below the x axis at angle θ. Along x, Rx = Ax + (−Bx); along y, Ry = Ay + (−By).',
    });
    const f = new Frame(svg, { ox: 230, oy: 160, scale: 4.2 });
    const mB = neg(EX_B);
    const R = add(EX_A, mB);
    f.axes({ xMin: -3, xMax: 60, yMin: -18, yMax: 30 });
    svg.compass(70, 240, { r: 28, size: 15 });
    const dash = '5 4';
    f.line(EX_A, [-24, EX_A[1]], { color: BLACK, width: 1, dash });
    f.line(R, [-24, R[1]], { color: BLACK, width: 1, dash });
    f.line(EX_A, [EX_A[0], -34], { color: BLACK, width: 1, dash });
    f.line(R, [R[0], -34], { color: BLACK, width: 1, dash });
    f.line([0, 0], [0, -34], { color: BLACK, width: 1, dash });
    f.vec([-8, 0], [-8, EX_A[1]], { color: RED, width: 2, dash, head: 11 });
    f.vec([-20, EX_A[1]], [-20, R[1]], { color: BLUE, width: 2, dash, head: 11 });
    f.vec([-8, 0], [-8, R[1]], { color: BLACK, width: 1.5, head: 10 });
    f.vec([0, -24], [EX_A[0], -24], { color: RED, width: 2, dash, head: 11 });
    f.vec([0, -31], [R[0], -31], { color: BLACK, width: 1.5, head: 10 });
    f.vec([EX_A[0], -31], [R[0], -31], { color: BLUE, width: 2, dash, head: 11 });
    f.text([-8, EX_A[1] / 2], '**A**_y', { dx: -6, size: 17, anchor: 'end' });
    f.text([-20, 9], '−**B**_y', { dx: -6, size: 17, anchor: 'end' });
    f.text([-8, R[1] / 2], '**R**_y', { dx: -6, size: 17, anchor: 'end' });
    f.text([EX_A[0] * 0.4, -24], '**A**_x', { dy: 13, size: 17 });
    f.text([R[0] / 2, -31], '**R**_x', { dy: 14, size: 17 });
    f.text([(EX_A[0] + R[0]) / 2, -31], '−**B**_x', { dy: 16, size: 17 });
    f.vec([0, 0], EX_A, { color: RED, width: 3.5, head: 16 });
    f.vec(EX_A, R, { color: BLUE, width: 3.5, head: 16 });
    f.vec([0, 0], R, { color: BLACK, width: 3.5, head: 16 });
    f.labelSeg([0, 0], EX_A, '**A**', { off: -16, along: 0.55, size: 18 });
    f.labelSeg(EX_A, R, '−**B**', { off: 22, along: 0.3, size: 18 });
    f.labelSeg([0, 0], R, '**R**', { off: 16, along: 0.75, size: 18 });
    f.angle([0, 0], 0, 20, 70, 'θ_\\rm{A}', { labelR: 84, dy: 2 });
    f.angle([0, 0], dir(R), 0, 46, 'θ', { labelR: 58 });
    f.text([42, 27], '**A** − **B** = **R**', { size: 19 });
    return svg.render();
  },

  // 3.3 Problems — triangular plot of land
  Figure_03_03_14: () => {
    const A = polar(80, -21);
    const B = polar(105, 101);
    const AB = add(A, B);
    const svg = new Svg({
      width: 480,
      height: 370,
      title: 'Triangle of displacements A + B + C = 0',
      desc: 'A is 80 m at 21° below the +x axis. B is 105 m at 11° west of north, starting at the head of A. C, of unknown length and direction θ, closes the triangle back to the origin.',
    });
    const f = new Frame(svg, { ox: 30, oy: 250, scale: 2.6 });
    f.axes({ xMin: 0, xMax: 110, yMin: -5, yMax: 84 });
    svg.compass(420, 250, { r: 30, size: 16 });
    f.line(A, [A[0], 30], { color: BLACK, width: 1, dash: '4 3' });
    f.line(AB, add(AB, [-28, 0]), { color: BLACK, width: 1, dash: '4 3' });
    f.vec([0, 0], A, { color: MAROON, width: 3, head: 15 });
    f.vec(A, AB, { color: MAROON, width: 3, head: 15 });
    f.vec(AB, [0, 0], { color: MAROON, width: 3, head: 15 });
    f.labelSeg([0, 0], A, '**A**', { off: 16, along: 0.5, size: 19 });
    f.labelSeg([0, 0], A, 'A = 80 \\rm{m}', { off: -26, along: 0.55, size: 17 });
    f.labelSeg(A, AB, '**B**', { off: 18, along: 0.62, size: 19 });
    f.labelSeg(A, AB, 'B = 105 \\rm{m}', { off: -50, along: 0.6, size: 17 });
    f.labelSeg(AB, [0, 0], '**C**', { off: -18, along: 0.35, size: 19 });
    f.labelSeg(AB, [0, 0], 'C = ? \\rm{m}', { off: -36, along: 0.55, size: 17 });
    f.angle([0, 0], -21, 0, 70, '21°', { labelR: 54, dy: 10, dx: 14 });
    f.angle(A, 90, 101, 70, '11°', { labelR: 80, dx: 6 });
    f.angle(AB, 180, dir(neg(AB)) + 360, 22, 'θ = ?', { labelR: 40, dx: -16, dy: -2 });
    f.text([AB[0], AB[1]], '**A** + **B** + **C** = 0', { dy: -16, size: 18 });
    return svg.render();
  },

  // 3.3 Problems — quadrilateral A + B + C + D = 0
  Figure_03_03_15: () => {
    const A = polar(4.7, -7.5);
    const B = polar(2.48, 106);
    const C = polar(3.02, 161);
    const P0 = [-2.2, -1.0];
    const P1 = add(P0, A);
    const P2 = add(P1, B);
    const P3 = add(P2, C);
    const svg = new Svg({
      width: 440,
      height: 290,
      title: 'Four displacements A + B + C + D = 0',
      desc: 'A is 4.70 km at 7.5° below the horizontal; B is 2.48 km at 16° west of north; C is 3.02 km at 19° north of west; D, of unknown length and direction θ, closes the path.',
    });
    const f = new Frame(svg, { ox: 160, oy: 130, scale: 55 });
    f.axes({ xMin: -2.6, xMax: 2.9, yMin: -2.1, yMax: 2.1 });
    svg.compass(385, 62, { r: 28, size: 15 });
    f.line(P0, add(P0, [0.9, 0]), { color: BLACK, width: 1, dash: '4 3' });
    f.line(P1, add(P1, [0, 0.8]), { color: BLACK, width: 1, dash: '4 3' });
    f.line(P2, add(P2, [-0.6, 0]), { color: BLACK, width: 1, dash: '4 3' });
    f.line(P3, add(P3, [0, -0.7]), { color: BLACK, width: 1, dash: '4 3' });
    f.vec(P0, P1, { color: MAROON, width: 3, head: 15 });
    f.vec(P1, P2, { color: MAROON, width: 3, head: 15 });
    f.vec(P2, P3, { color: MAROON, width: 3, head: 15 });
    f.vec(P3, P0, { color: MAROON, width: 3, head: 15 });
    f.labelSeg(P0, P1, '**A**', { off: -16, along: 0.6, size: 18 });
    f.labelSeg(P0, P1, 'A = 4.70 \\rm{km}', { off: -18, along: 0.1, size: 16 });
    f.labelSeg(P1, P2, '**B**', { off: 18, along: 0.5, size: 18 });
    f.text(P1, 'B = 2.48 \\rm{km}', { dx: 10, dy: -30, size: 16, anchor: 'start' });
    f.labelSeg(P2, P3, '**C**', { off: 18, along: 0.55, size: 18 });
    f.labelSeg(P2, P3, 'C = 3.02 \\rm{km}', { off: -18, along: 0.25, size: 16 });
    f.labelSeg(P3, P0, '**D**', { off: 18, along: 0.4, size: 18 });
    f.text(P3, 'D = ? \\rm{km}', { dx: -18, dy: -16, size: 16, anchor: 'end' });
    f.angle(P0, 0, 7.5, 40, null);
    f.text(P0, '7.5°', { dx: 64, dy: -14, size: 15 });
    f.angle(P1, 90, 106, 36, '16°', { labelR: 46, dx: 6 });
    f.angle(P2, 161, 180, 30, '19°', { labelR: 20, dx: -18, dy: 10 });
    f.angle(P3, dir(add(P0, neg(P3))), 270, 30, 'θ = ?', { labelR: 34, dx: 16, dy: 8 });
    f.text([0.35, 2.0], '**A** + **B** + **C** + **D** = 0', { size: 17, anchor: 'start' });
    return svg.render();
  },

  // 3.3 Problems — A = 40 km at 60°, B = 30 km at 15°
  Figure_03_03_16: () => {
    const A = polar(40, 60);
    const B = polar(30, 15);
    const R = add(A, B);
    const svg = new Svg({
      width: 430,
      height: 300,
      title: 'Vectors A and B adding to an unknown R',
      desc: 'A is 40 km at θA = 60°; B is 30 km at θB = 15°, starting at the head of A. The resultant R has unknown magnitude and direction θ.',
    });
    const f = new Frame(svg, { ox: 25, oy: 255, scale: 4.6 });
    f.axes({ xMin: 0, xMax: 70, yMin: -3, yMax: 48 });
    svg.compass(360, 160, { r: 30, size: 16 });
    f.line(A, add(A, [14, 0]), { color: BLACK, width: 1, dash: '4 3' });
    f.vec([0, 0], A, { color: MAROON, width: 3, head: 15 });
    f.vec(A, R, { color: MAROON, width: 3, head: 15 });
    f.vec([0, 0], R, { color: MAROON, width: 4, head: 18 });
    f.labelSeg([0, 0], A, '**A**', { off: 16, along: 0.55, size: 19 });
    f.text(polar(30, 60), 'A = 40 \\rm{km}', { dx: -12, dy: -4, size: 17, anchor: 'end' });
    f.labelSeg(A, R, '**B**', { off: 16, along: 0.85, size: 19 });
    f.text(A, 'B = 30 \\rm{km}', { dx: -8, dy: -22, size: 17, anchor: 'end' });
    f.labelSeg([0, 0], R, '**R**', { off: 16, along: 0.5, size: 19 });
    f.labelSeg([0, 0], R, 'R = ?', { off: -16, along: 0.78, size: 17 });
    f.angle([0, 0], 0, 60, 60, 'θ_\\rm{A} = 60°', { labelR: 52, dx: 30, dy: 6 });
    f.angle([0, 0], 0, dir(R), 160, 'θ = ?', { labelR: 140, dx: 10 });
    f.angle(A, 0, 15, 50, null);
    f.text(add(A, [14, 9]), 'θ_\\rm{B} = 15°', { size: 16 });
    f.text([55, 43], '**A** + **B** = **R**', { size: 18, anchor: 'start' });
    return svg.render();
  },

  // 3.4 — velocity components along a projectile's path
  Figure_03_04_02: () => projectileComponents(),

  // 3.4 Example — fireworks shell
  Figure_03_04_03: () => {
    const svg = new Svg({
      width: 400,
      height: 400,
      title: 'Trajectory of a fireworks shell',
      desc: 'A shell launched at θ0 = 75° above the horizontal reaches a maximum height h = 233 m at a horizontal distance x = 125 m, where it explodes.',
    });
    const f = new Frame(svg, { ox: 125, oy: 345, scale: 1.27 });
    f.axes({ xMin: 0, xMax: 190, yMin: -3, yMax: 260 });
    const h = 233;
    const xh = 125;
    // Parabola with its vertex at (125, 233) passing through the origin.
    const y = x => h - (h / (xh * xh)) * (x - xh) ** 2;
    const pts = [];
    for (let x = 0; x <= xh; x += 2) pts.push(f.p(x, y(x)));
    svg.polyline(pts, { color: COLORS.accel, width: 2 });
    f.line([0, h], [xh, h], { color: BLACK, width: 1.2, dash: '6 4' });
    f.line([xh, h], [xh, 0], { color: BLACK, width: 1.2, dash: '6 4' });
    // Starburst at the top.
    const [cx, cy] = f.p(xh, h);
    const burst = ['#e57373', '#f4a261', '#81c784', '#64b5f6', '#ba68c8'];
    for (let k = 0; k < 16; k += 1) {
      const a = rad(k * 22.5);
      svg.line(
        cx + 10 * Math.cos(a),
        cy + 10 * Math.sin(a),
        cx + 40 * Math.cos(a),
        cy + 40 * Math.sin(a),
        {
          color: burst[k % burst.length],
          width: 3,
          dash: '5 4',
          cap: 'round',
        }
      );
    }
    f.pvec([0, 0], 110, 75, { color: COLORS.velocity, width: 4, head: 18 });
    f.text(polar(85, 75), '**v**_0', { dx: 18, size: 19, anchor: 'start' });
    f.angle([0, 0], 0, 75, 34, null);
    f.text([12, 22], 'θ_0 = 75°', { size: 18, anchor: 'start' });
    f.text([0, h], 'h = 233 \\rm{m}', { dx: -10, size: 18, anchor: 'end' });
    f.text([xh / 2, 0], 'x = 125 \\rm{m}', { dy: 20, size: 18 });
    return svg.render();
  },

  // 3.4 — range for different speeds and angles
  Figure_03_04_05: () => {
    const g = 9.8;
    const svg = new Svg({
      width: 620,
      height: 640,
      title: 'Range of a projectile on level ground',
      desc: '(a) At 45°, launch speeds of 30, 40 and 50 m/s give ranges of 91.8 m, 163 m and 255 m. (b) At 50 m/s, launch angles of 15° and 75° both give a range of 128 m, and 45° gives the maximum range of 255 m.',
    });
    const traj = (f, v, deg, color) => {
      const c = Math.cos(rad(deg));
      const t = Math.tan(rad(deg));
      const R = (v * v * Math.sin(rad(2 * deg))) / g;
      const pts = [];
      for (let k = 0; k <= 80; k += 1) {
        const x = (R * k) / 80;
        pts.push(f.p(x, x * t - (g * x * x) / (2 * v * v * c * c)));
      }
      svg.polyline(pts, { color, width: 2.5 });
      const H = (v * v * Math.sin(rad(deg)) ** 2) / (2 * g);
      f.line([R / 2, 0], [R / 2, H], { color: BLACK, width: 1, dash: '4 3' });
      f.pvec([0, 0], v * 1.25, deg, { color, width: 3.5, head: 15 });
      return R;
    };
    const span = (f, R, y, label) => {
      f.line([0, y + 3], [0, y - 3], { color: BLACK, width: 1 });
      f.line([R, y + 3], [R, y - 3], { color: BLACK, width: 1 });
      f.vec([0, y], [R, y], { color: BLACK, width: 1.2, head: 9, start: true });
      const [x, py] = f.p(R / 2, y);
      svg.rect(x - 55, py - 10, 110, 20, { fill: '#ffffff' });
      svg.text(x, py, label, { size: 16 });
    };
    const colors = [COLORS.red, COLORS.vector, COLORS.green];
    // (a)
    let f = new Frame(svg, { ox: 60, oy: 175, scale: 1.75 });
    f.line([-5, 0], [300, 0], { color: BLACK, width: 1.5 });
    [30, 40, 50].forEach((v, k) => {
      traj(f, v, 45, colors[k]);
      const [lx, ly] = f.p(...polar(v * 1.25, 45));
      svg.text(lx - 12, ly - 2, `${v} \\rm{m/s}`, { size: 15, anchor: 'end' });
    });
    f.angle([0, 0], 0, 45, 30, '45°', { labelR: 20, dx: 30, dy: 2 });
    span(f, 91.8, -14, 'R = 91.8 \\rm{m}');
    span(f, 163, -28, 'R = 163 \\rm{m}');
    span(f, 255, -42, 'R = 255 \\rm{m}');
    svg.text(20, 270, '(a)', { size: 16, math: false });
    svg.xyIndicator(530, 75, { len: 50, size: 16 });
    // (b)
    f = new Frame(svg, { ox: 60, oy: 520, scale: 1.75 });
    f.line([-5, 0], [300, 0], { color: BLACK, width: 1.5 });
    [15, 45, 75].forEach((deg, k) => traj(f, 50, deg, colors[k]));
    f.angle([0, 0], 0, 15, 110, '15°', { labelR: 124 });
    f.angle([0, 0], 0, 45, 80, '45°', { labelR: 94 });
    f.angle([0, 0], 0, 75, 50, '75°', { labelR: 64, dx: 4 });
    f.text(polar(66, 80), 'v_0 = 50 \\rm{m/s}', { dx: -6, dy: -8, size: 16, anchor: 'end' });
    span(f, 128, -14, 'R = 128 \\rm{m}');
    span(f, 255, -32, 'R = 255 \\rm{m}');
    svg.text(20, 625, '(b)', { size: 16, math: false });
    return svg.render();
  },

  // 3.5 — a velocity and its components
  Figure_03_05_03: () => {
    const svg = new Svg({
      width: 400,
      height: 280,
      title: 'A velocity and its x and y components',
      desc: 'A velocity v at angle θ above the +x axis with horizontal component vx and vertical component vy.',
    });
    const f = new Frame(svg, { ox: 35, oy: 238, scale: 1 });
    const v = polar(305, 28);
    f.axes({ xMin: 0, xMax: 350, yMin: -2, yMax: 225 });
    f.vec([0, 0], [v[0], 0], { color: BLUE, width: 2.5, dash: '6 4', head: 15 });
    f.vec([v[0], 0], v, { color: RED, width: 2.5, dash: '6 4', head: 15 });
    f.vec([0, 0], v, { color: COLORS.accel, width: 2.5, head: 18 });
    f.angle([0, 0], 0, 28, 60, 'θ', { labelR: 74, dy: -2, size: 19 });
    f.labelSeg([0, 0], v, '**v**', { off: 18, size: 20 });
    f.text([v[0] / 2, 0], '**v**_x', { dy: 20, size: 20 });
    f.text([v[0], v[1] / 2], '**v**_y', { dx: 14, size: 20, anchor: 'start' });
    return svg.render();
  },
};

const VEL3 = '#5cb531';

/** City map with walking paths A–D (Figures 3.2.20 and 3.3.11). */
function cityPaths() {
  const svg = new Svg({
    width: 470,
    height: 250,
    title: 'Paths taken by four people walking in a city',
    desc: 'All blocks are 120 m on a side. Path A: 3 blocks north, 1 block east. Path B: 4 blocks east, 3 north, 3 west. Path C (starting one block north of the start of A and one block east): 1 north, 5 east, 2 south, 1 west, 1 north, 3 west. Path D (from the same start as C): 2 south, 6 east, 4 north, 1 west.',
  });
  // Street (i, j) → pixels: vertical streets i = 0..7, horizontal streets j = -1..3.
  const s = 39;
  const ox = 140;
  const oy = 160;
  const P = (i, j) => [ox + i * s, oy - j * s];
  const g = 6; // half the street width
  for (let i = -1; i <= 7; i += 1) {
    for (let j = -1; j <= 3; j += 1) {
      const [x, y] = P(i, j + 1);
      const park = (i === 6 && j === 3) || (i === 6 && j === 0) || (i === -1 && j === -1);
      svg.rect(x + g, y + g, s - 2 * g, s - 2 * g, { fill: park ? '#bfe0a8' : '#dcdcdc' });
    }
  }
  const path = (pts, color, w = 2.5) => {
    const px = pts.map(([i, j]) => P(i, j));
    svg.polyline(px.slice(0, -1).concat([px[px.length - 1]]), { color, width: w });
    const [a, b] = px.slice(-2);
    svg.arrow(a[0], a[1], b[0], b[1], { color, width: w, head: 12 });
  };
  path(
    [
      [0, 0],
      [0, 3],
      [1, 3],
    ],
    '#55b62f'
  );
  path(
    [
      [0, 0],
      [4, 0],
      [4, 3],
      [1, 3],
    ],
    '#a3132b'
  );
  path(
    [
      [1, 1],
      [1, 2],
      [6, 2],
      [6, 0],
      [5, 0],
      [5, 1],
      [2, 1],
    ],
    '#6a3d9a'
  );
  path(
    [
      [1, 1],
      [1, -1],
      [7, -1],
      [7, 3],
      [6, 3],
    ],
    '#1aa3b8'
  );
  for (const [i, j] of [
    [0, 0],
    [1, 1],
  ]) {
    svg.circle(...P(i, j), 4.5, { fill: BLACK });
  }
  const tag = (i, j, name) => {
    const [x, y] = P(i, j);
    svg.rect(x - 9, y - 10, 18, 20, { fill: '#ffffff' });
    svg.text(x, y, name, { size: 16, math: false });
  };
  tag(0, 1.9, 'A');
  tag(2.9, 0, 'B');
  tag(3, 2, 'C');
  tag(1, -0.35, 'D');
  svg.text(70, P(0, 0)[1], 'Start', { size: 16, math: false, anchor: 'end' });
  svg.line(76, P(0, 0)[1], P(0, 0)[0] - 8, P(0, 0)[1], { color: BLACK, width: 1 });
  svg.compass(48, 55, { r: 22, size: 14 });
  return svg.render();
}

/** 18.0 m west then 25.0 m north (Figures 3.2.21 and 3.3.13). */
function westNorth() {
  const svg = new Svg({
    width: 420,
    height: 300,
    title: 'Displacements A (west) and B (north) adding to R',
    desc: 'A points west from the origin along the −x axis; B points north from the head of A; R runs from the origin to the head of B, at angle θ from the −x axis.',
  });
  const f = new Frame(svg, { ox: 185, oy: 240, scale: 7.2 });
  const A = [-18, 0];
  const R = [-18, 25];
  f.axes({ xMin: -21, xMax: 11, yMin: -4, yMax: 28 });
  svg.compass(345, 175, { r: 30, size: 16 });
  f.vec([0, 0], A, { color: MAROON, width: 3, head: 15 });
  f.vec(A, R, { color: MAROON, width: 3, head: 15 });
  f.vec([0, 0], R, { color: MAROON, width: 4, head: 18 });
  f.text([-9, 0], '**A**', { dy: 18, size: 19 });
  f.text([-18, 12.5], '**B**', { dx: -18, size: 19 });
  f.labelSeg([0, 0], R, '**R**', { off: -16, along: 0.55, size: 19 });
  f.angle([0, 0], dir(R), 180, 36, 'θ', { labelR: 48, size: 18 });
  f.text([2, 22], '**A** + **B** = **R**', { size: 19, anchor: 'start' });
  return svg.render();
}

/**
 * Projectile with velocity vectors and components at equal time steps (a),
 * the horizontal motion alone (b), the vertical motion alone (c), and the
 * recombined velocity at landing (d). Positions are computed from the motion
 * itself: equal horizontal steps, and vertical steps that follow y = v0y t − g t²/2.
 */
function projectileComponents() {
  const svg = new Svg({
    width: 900,
    height: 1270,
    title: 'Velocity components of a projectile',
    desc: '(a) A projectile launched at θ0 above the horizontal: at each instant its velocity v has a constant horizontal component vx and a vertical component vy that shrinks to zero at the top and then grows downward; it returns to launch height with vy = −v0y and θ = −θ0. (b) The horizontal motion alone: the same vx at every step. (c) The vertical motion alone: vy decreases on the way up and increases on the way down. (d) Adding vx and vy gives v at angle θ below the horizontal.',
  });
  const PURPLE = '#9b5fa0';
  const ORANGE = COLORS.orange;
  const BLUE2 = '#1f77c8';
  const sc = 0.55; // arrow length per (px per step)
  const vx = 70;
  const g = 36;
  const vy0 = 4 * g;
  const height = t => vy0 * t - (g * t * t) / 2;
  const vy = t => vy0 - g * t;
  const ox = 70;
  const oy = 420;
  const pos = t => [ox + vx * t, oy - height(t)];
  const ball = (x, y) => svg.circle(x, y, 9, { fill: '#555555', stroke: '#333333', width: 1 });
  const dashArrow = (x1, y1, x2, y2, color) =>
    svg.arrow(x1, y1, x2, y2, { color, width: 3, dash: '4 3', head: 12 });

  // (a) the trajectory
  svg.arrow(ox - 10, oy, ox + 760, oy, { color: BLACK, width: 1.5, head: 11 });
  svg.arrow(ox, oy + 80, ox, 90, { color: BLACK, width: 1.5, head: 11 });
  svg.text(ox + 772, oy, 'x', { size: 19, anchor: 'start' });
  svg.text(ox - 16, 96, 'y', { size: 19 });
  const pts = [];
  for (let t = 0; t <= 9.05; t += 0.1) pts.push(pos(t));
  svg.polyline(pts, { color: '#bbbbbb', width: 1.5, dash: '3 4' });
  for (let t = 0; t <= 9; t += 1) {
    const [x, y] = pos(t);
    const ex = x + vx * sc;
    const ey = y - vy(t) * sc;
    dashArrow(x, y, ex, y, BLUE2);
    if (t !== 4) dashArrow(x, y, x, ey, ORANGE);
    svg.arrow(x, y, ex, ey, { color: PURPLE, width: 3.5, head: 14 });
    ball(x, y);
    const first = t === 0;
    if (!first) svg.text(ex + 6, y + 14, '**v**_x', { size: 16, anchor: 'start' });
    if (t !== 4 && t !== 8 && Math.abs(vy(t)) * sc > 24) {
      svg.text(x - 7, (y + ey) / 2, first ? '**v**_\\rm{0y}' : '**v**_y', {
        size: 16,
        anchor: 'end',
      });
    }
    svg.text(ex + 4, ey + (vy(t) > 0 ? -8 : 12), first ? '**v**_0' : '**v**', {
      size: 16,
      anchor: 'start',
    });
  }
  const launch = (Math.atan2(vy0, vx) * 180) / Math.PI;
  svg.arc(ox, oy, 26, 0, launch, { color: BLACK });
  svg.text(ox + 30, oy - 20, 'θ_0', { size: 17, anchor: 'start' });
  const [x8, y8] = pos(8);
  svg.arc(x8, y8, 26, -launch, 0, { color: BLACK });
  svg.text(x8 + 34, y8 + 30, 'θ = −θ_0', { size: 17, anchor: 'start' });
  svg.text(x8 - 10, y8 + 62, 'v_y = −v_\\rm{0y}', { size: 17, anchor: 'end' });
  svg.text(30, oy + 60, '(a)', { size: 16, math: false });

  // (b) the horizontal motion alone
  const by = 790;
  for (let k = 0; k < 10; k += 1) {
    const x = 50 + k * 84;
    dashArrow(x, by, x + vx * sc, by, BLUE2);
    ball(x, by);
    svg.text(x + 18, by + 26, '**v**_x', { size: 16 });
  }
  svg.text(30, by + 52, '(b)', { size: 16, math: false });

  // (c) the vertical motion alone: rising on the left, falling on the right
  const top = 890;
  const column = (x, times, labelFirst) => {
    for (const t of times) {
      const y = top + (height(4) - height(t));
      const len = vy(t) * sc;
      dashArrow(x, y, x, y - len, ORANGE);
      ball(x, y);
      const name = labelFirst && t === times[0] ? '**v**_\\rm{0y}' : '**v**_y';
      svg.text(x - 10, y - len / 2, name, { size: 16, anchor: 'end' });
    }
  };
  column(90, [0, 1, 2, 3], true);
  column(190, [5, 6, 7, 8], false);
  svg.text(140, top - 30, '(c)', { size: 16, math: false });

  // (d) adding vx and vy at the landing point
  const dx = 480;
  const dy = 960;
  const k = 0.85;
  svg.arrow(dx - 40, dy, dx + 160, dy, { color: BLACK, width: 1.5, head: 10 });
  svg.arrow(dx, dy + 150, dx, dy - 80, { color: BLACK, width: 1.5, head: 10 });
  svg.text(dx + 170, dy, 'x', { size: 18, anchor: 'start' });
  svg.text(dx - 14, dy - 82, 'y', { size: 18 });
  const lx = vx * k;
  const ly = -vy(8) * k;
  dashArrow(dx, dy, dx + lx, dy, BLUE2);
  dashArrow(dx + lx, dy, dx + lx, dy + ly, ORANGE);
  svg.arrow(dx, dy, dx + lx, dy + ly, { color: PURPLE, width: 3.5, head: 15 });
  svg.text(dx + lx / 2, dy - 16, '**v**_x', { size: 17 });
  svg.text(dx + lx + 10, dy + ly / 2, '**v**_y', { size: 17, anchor: 'start' });
  svg.text(dx + lx / 2 - 12, dy + ly * 0.6, '**v**', { size: 17, anchor: 'end' });
  svg.arc(dx, dy, 30, -launch, 0, { color: BLACK });
  svg.text(dx + 22, dy + 40, 'θ', { size: 17 });
  svg.text(dx - 90, dy, '(d)', { size: 16, math: false });
  return svg.render();
}
