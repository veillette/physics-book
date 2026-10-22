/**
 * Chapter 3 (two-dimensional kinematics): vector addition and subtraction,
 * components, city-block maps, and projectile trajectories.
 *
 * Vector diagrams are drawn to scale from the magnitudes and angles in the
 * text, so a ruler-and-protractor reading of a figure agrees with the worked
 * solution.
 */
import {
  COLORS,
  Frame,
  Svg,
  fmt,
  localArrow,
  rad,
  smilAnimate,
  smilMotion,
  smilScaleY,
  smilTranslate,
  timedPath,
} from './svg.js';

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

/**
 * A wooden ruler laid parallel to a direction, as in the textbook's "measure
 * it with a ruler" figures. (x, y) is the pixel point of the zero mark on the
 * edge facing the vector, `angle` the direction in math degrees, `unit` pixels
 * per unit. The ruler sits on the left of the direction (`side: 'left'`) or the
 * right. Ticks every `minor`, longer every `mid`, numbered every `major`, so a
 * reading at the vector's head is the measurement the text quotes.
 */
function ruler(
  svg,
  x,
  y,
  angle,
  { unit, from = -0.5, to, width = 30, minor, mid, major, unitLabel, side = 'left', size = 11 }
) {
  const s = side === 'left' ? -1 : 1;
  const local = svg.capture(() => {
    svg.add(
      `<rect x="${fmt(from * unit)}" y="${fmt(s < 0 ? -width : 0)}" width="${fmt((to - from) * unit)}" height="${fmt(width)}" rx="2" fill="#f6dfb4" stroke="#b5864a" stroke-width="1.5"/>`
    );
    for (let k = 0; k * minor <= to - minor * 0.5; k += 1) {
      const v = k * minor;
      const isMajor = Math.abs(v / major - Math.round(v / major)) < 1e-6;
      const isMid = Math.abs(v / mid - Math.round(v / mid)) < 1e-6;
      const len = isMajor ? 11 : isMid ? 8 : 4.5;
      svg.line(v * unit, 0, v * unit, s * len, { color: '#5a4020', width: 1 });
      if (isMajor && k > 0) {
        svg.text(v * unit, s * width * 0.66, String(Math.round(v)), {
          size,
          math: false,
          halo: false,
        });
      }
    }
    if (unitLabel) {
      svg.text(minor * unit * 2.5, s * width * 0.66, unitLabel, { size, halo: false });
    }
  });
  return svg.add(
    `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(-angle)})">${local}</g>`
  );
}

/**
 * A clear plastic protractor centered at (cx, cy) with radius r: opening upward,
 * or downward when `flip` (turned over to measure an angle below the axis). The
 * black arrow from its center points along `arrow` (math degrees), the
 * direction being measured.
 */
function protractor(svg, cx, cy, r, { flip = false, arrow }) {
  const s = flip ? -1 : 1;
  const sweep = flip ? 0 : 1;
  const ri = r * 0.5;
  const h = r * 0.13;
  const pt = (rr, deg) => [cx + rr * Math.cos(rad(deg)), cy - s * rr * Math.sin(rad(deg))];
  svg.add(
    `<path d="M ${fmt(cx - r)} ${fmt(cy)} A ${fmt(r)} ${fmt(r)} 0 0 ${sweep} ${fmt(cx + r)} ${fmt(cy)} Z M ${fmt(cx - ri)} ${fmt(cy - s * h)} A ${fmt(ri)} ${fmt(ri)} 0 0 ${sweep} ${fmt(cx + ri)} ${fmt(cy - s * h)} Z" fill="#cdeaf4" fill-opacity="0.85" fill-rule="evenodd" stroke="#4fa6c4" stroke-width="1.5"/>`
  );
  const [ax, ay] = [cx + r * 1.45 * Math.cos(rad(arrow)), cy - r * 1.45 * Math.sin(rad(arrow))];
  svg.arrow(cx, cy, ax, ay, { color: BLACK, width: 2.5, head: 13 });
  // Scale on top of the arrow, so the reading under it stays legible.
  for (let deg = 0; deg <= 180; deg += 5) {
    const len = deg % 30 === 0 ? 10 : deg % 10 === 0 ? 7 : 4;
    svg.line(...pt(r, deg), ...pt(r - len, deg), { color: '#2f6f86', width: 1 });
    if (deg % 30 === 0 && deg % 180 !== 0) {
      svg.text(...pt(r - 19, deg), `${deg}`, { size: 9, math: false, color: '#2f6f86' });
    }
  }
  svg.circle(cx, cy, 3.5, { fill: 'none', stroke: BLACK, width: 1.3 });
  return svg.line(cx, cy - 6, cx, cy + 6, { color: BLACK, width: 1 });
}

// ---------------------------------------------------------------------------
// The city walk added head to tail (Figures 3.2.3–3.2.7): 9 units east, then 5
// north, giving D = 10.3 units at 29.1°. One frame size for every panel.
// ---------------------------------------------------------------------------
const WALK_D = [9, 5];

/**
 * Step 1 draws the first leg, step 2 adds the second, step 3 adds the
 * resultant D with a ruler and protractor. `legs: false` draws D alone.
 */
function walkStep(svg, f, step, { legs = true } = {}) {
  f.axes({ xMin: 0, xMax: 11, yMin: -0.9, yMax: step === 3 ? 10 : 9.3 });
  if (step === 1) {
    for (let k = 1; k <= 9; k += 1) f.line([k, 0], [k, -0.3], { color: BLACK, width: 1.3 });
  }
  if (legs) f.vec([0, 0], [9, 0], { color: VEC, width: 4, head: 18 });
  if (step === 1) {
    f.text([0.8, 0.6], 'θ = 0°', { size: 18, anchor: 'start' });
    f.text([4.5, -1.6], '9 \\rm{units}', { size: 18 });
  }
  if (step >= 2 && legs) f.vec([9, 0], WALK_D, { color: VEC, width: 4, head: 18 });
  if (step < 3) return;
  const a = dir(WALK_D);
  ticks(f, [0, 0], Math.hypot(...WALK_D), a, 1);
  f.vec([0, 0], WALK_D, { color: VEC, width: 4, head: 18 });
  if (legs) f.rightAngle([9, 0], 180, 90, 14);
  f.angle([0, 0], 0, a, 46, null);
  f.text([2.0, 0.5], 'θ = 29.1°', { size: 17, anchor: 'start' });
  f.labelSeg([0, 0], WALK_D, '10.3 \\rm{units}', {
    off: 16,
    along: 0.6,
    size: 17,
    rotate: -a,
  });
  if (legs) f.labelSeg([0, 0], WALK_D, '**D**', { off: -18, along: 0.72, size: 18 });
  // The ruler's zero lines up with the tail of D, so its head reads 10.3.
  const [nx, ny] = polar(1.5, a + 90);
  const [rx, ry] = f.p(nx, ny);
  ruler(svg, rx, ry, a, { unit: f.scale, to: 12.6, minor: 0.2, mid: 0.5, major: 1 });
  const [px, py] = f.p(4.5, -1.5);
  protractor(svg, px, py + 70, 66, { arrow: a });
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

function headToTail(order, { withR, measure = false }) {
  const firstIsC = order[0] === 'C';
  const svg = new Svg({
    width: 560,
    height: firstIsC ? 440 : measure ? 480 : 360,
    title: measure
      ? 'Measuring the resultant R with a ruler and a protractor'
      : withR
        ? `Resultant of ${order.join(' + ')}`
        : 'Vectors A, B and C placed head to tail',
    desc: measure
      ? 'Vectors A, B and C placed head to tail, with the resultant R from the tail of A to the head of C. A ruler laid alongside R, its zero at the tail, reads 50.8 m at the head. A protractor turned upside down below it, with an arrow parallel to R, reads 5.47° below the +x axis.'
      : withR
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
  if (measure) {
    // Ruler below R with its zero at the tail; the protractor is turned over
    // because R points below the axis.
    const a = dir(at);
    const [rx, ry] = f.p(...polar(5.2, a - 90));
    ruler(svg, rx, ry, a, {
      unit: f.scale,
      from: -1.5,
      to: 56,
      minor: 1,
      mid: 5,
      major: 10,
      unitLabel: 'm',
      side: 'right',
    });
    protractor(svg, 230, 375, 66, { flip: true, arrow: a });
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
/**
 * Two identical balls released together, one from rest and one with a
 * horizontal velocity, drawn at five equal time steps. Positions and arrows use
 * one clock: x = vx·t, y = g·t²/2, and each arrow is its velocity times `k`, so
 * the vertical arrows grow in step with the drop between positions.
 */
function fallSideBySide() {
  const svg = new Svg({
    width: 375,
    height: 585,
    title: 'A dropped ball and a ball thrown horizontally',
    desc: 'Two identical balls fall side by side, shown at five equal time intervals. The red ball on the left falls from rest; the blue ball on the right has a constant horizontal velocity. At each instant both balls are at the same height with the same, steadily growing, downward velocity, so the vertical motion does not depend on the horizontal motion.',
  });
  const GREEN = COLORS.green;
  const RED_FILL = '#f28b82';
  const BLUE_FILL = '#6cc4e8';
  const vx = 48; // px per time unit
  const g = 28; // px per time unit squared
  const k = 0.8; // arrow length per (px per time unit)
  const xr = 30;
  const x0 = xr + 30; // the blue ball starts just right of the red one
  const y0 = 22;
  const times = [1.5, 2.5, 3.5, 4.5, 5.5];
  const y = t => y0 + (g * t * t) / 2;
  const xb = t => x0 + vx * t;
  const ball = (x, yy, fill, stroke) =>
    `<circle cx="${fmt(x)}" cy="${fmt(yy)}" r="11" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;

  // One strobe position: dotted level line, velocity arrows, then the balls on top.
  const position = t => {
    const yy = y(t);
    svg.line(xr, yy, xb(t), yy, { color: '#999999', width: 3, dash: '3 5' });
    svg.arrow(xr, yy, xr, yy + g * t * k, { color: GREEN, width: 3.5, head: 15 });
    svg.arrow(xb(t), yy, xb(t), yy + g * t * k, { color: GREEN, width: 3.5, head: 15 });
    svg.arrow(xb(t), yy, xb(t) + vx * k, yy, { color: BLACK, width: 3.5, head: 15 });
    svg.add(ball(xr, yy, RED_FILL, RED));
    svg.add(ball(xb(t), yy, BLUE_FILL, BLUE));
  };
  svg.still(() => times.forEach(position));

  // Both balls fall from the top for 5.5 time units, then hold. Each strobe
  // position appears as the moving balls reach it and stays until the loop ends.
  const T = 8;
  const S = 1.1; // seconds per time unit
  const DUR = `${T}s`;
  const at = t => (t * S) / T;
  const samples = [];
  for (let t = 0; t <= 5.5 + 1e-9; t += 0.1) samples.push(t);
  const keyTimes = [...samples.map(at), 1];
  const hold = list => [...list, list.at(-1)];
  const opt = { dur: DUR, keyTimes };
  const ghosts = times
    .map(t => {
      const show = at(t);
      const drawn = svg.capture(() => position(t));
      return `<g opacity="0">${smilAnimate('opacity', [0, 0, 1, 1], { dur: DUR, keyTimes: [0, show, show + 0.0001, 1] })}${drawn}</g>`;
    })
    .join('');
  const fall = hold(samples.map(t => [0, y(t)]));
  const across = hold(samples.map(t => [xb(t) - xr, y(t)]));
  const vyArrow = localArrow(0, 1, GREEN, {
    width: 3.5,
    head: 15,
    lengths: hold(samples.map(t => g * t * k)),
    ...opt,
  });
  const vxArrow = localArrow(vx * k, 0, BLACK, { width: 3.5, head: 15 });
  const level = `<line x1="0" y1="0" x2="${x0 - xr}" y2="0" stroke="#999999" stroke-width="3" stroke-dasharray="3 5">${smilAnimate('x2', hold(samples.map(t => xb(t) - xr)), opt)}</line>`;
  svg.motionGroup(
    `${ghosts}<g transform="translate(${xr} 0)"><g>${smilTranslate(fall, opt)}${level}${vyArrow}${ball(0, 0, RED_FILL, RED)}</g><g>${smilTranslate(across, opt)}${vyArrow}${vxArrow}${ball(0, 0, BLUE_FILL, BLUE)}</g></g>`
  );
  return svg.render();
}

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

  // 3.1 — a dropped ball and a ball thrown horizontally fall side by side
  Figure_03_01_05: () => fallSideBySide(),

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

  // 3.2 — measuring the resultant D with a ruler and a protractor
  Figure_03_02_03: () => {
    const svg = new Svg({
      width: 400,
      height: 450,
      title: 'Measuring a vector with a ruler and a protractor',
      desc: 'The displacement D drawn from the origin at θ = 29.1° above the +x axis, with unit tick marks. A ruler laid alongside it, its zero at the tail, reads 10.3 units at the head. A protractor below the axes, with an arrow parallel to D, reads 29.1°.',
    });
    walkStep(svg, new Frame(svg, { ox: 50, oy: 300, scale: 28 }), 3, { legs: false });
    return svg.render();
  },

  // 3.2 — the head-to-tail method in three steps
  Figure_03_02_04: () => {
    const svg = new Svg({
      width: 1200,
      height: 480,
      title: 'Head-to-tail method for the city walk',
      desc: '(a) The first displacement: 9 units along +x, θ = 0°. (b) The second displacement, 5 units in the +y direction, drawn from the head of the first. (c) The resultant D from the tail of the first to the head of the second, at a right angle corner; a ruler alongside D reads 10.3 units and a protractor reads θ = 29.1°.',
    });
    ['(a)', '(b)', '(c)'].forEach((label, k) => {
      walkStep(svg, new Frame(svg, { ox: 50 + 400 * k, oy: 300, scale: 28 }), k + 1);
      svg.text(205 + 400 * k, 460, label, { size: 17, math: false, weight: 'bold' });
    });
    return svg.render();
  },

  // 3.2 — step 3 of the head-to-tail method on its own
  Figure_03_02_07: () => {
    const svg = new Svg({
      width: 400,
      height: 480,
      title: 'Step 3: draw the resultant and measure it',
      desc: 'The resultant D drawn from the tail of the 9-unit east leg to the head of the 5-unit north leg. A ruler alongside D reads 10.3 units, and a protractor reads θ = 29.1° above the +x axis.',
    });
    walkStep(svg, new Frame(svg, { ox: 50, oy: 300, scale: 28 }), 3);
    svg.text(205, 460, '(c)', { size: 17, math: false, weight: 'bold' });
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
    walkStep(svg, new Frame(svg, { ox: 30, oy: 280, scale: 28 }), 1);
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
    walkStep(svg, new Frame(svg, { ox: 30, oy: 280, scale: 28 }), 2);
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

  // 3.2 Example — measuring R with a ruler and an upside-down protractor
  Figure_03_02_11: () => headToTail(['A', 'B', 'C'], { withR: true, measure: true }),

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
    // One physical clock for all six launches, followed by a landing pause.
    const clock = (2 * 50 * Math.sin(rad(75))) / g + 1.2;
    const duration = `${clock}s`;
    const svg = new Svg({
      width: 1000,
      height: 840,
      title: 'Range of a projectile on level ground',
      desc: '(a) At 45°, launch speeds of 30, 40 and 50 m/s give ranges of 91.8 m, 163 m and 255 m. (b) At 50 m/s, launch angles of 15° and 75° both give a range of 128 m, and 45° gives the maximum range of 255 m. All six projectiles launch together on a shared clock and stop on landing; the animation repeats. The 75° launch rises higher and stays aloft longer than the 15° launch. Air resistance is neglected.',
    });
    const text = (x, y, label, options = {}) =>
      svg.text(x, y, label, { size: 19, math: false, halo: false, anchor: 'start', ...options });
    const launches = [];
    const traj = (f, v, deg, color) => {
      const vx = v * Math.cos(rad(deg));
      const vy = v * Math.sin(rad(deg));
      const flight = (2 * vy) / g;
      const R = vx * flight;
      // Sample equal times, then convert to path-length fractions for SMIL.
      // Constant speed along the curve would give incorrect projectile motion.
      const pts = Array.from({ length: 121 }, (_, k) => {
        const t = (flight * k) / 120;
        return f.p(vx * t, Math.max(0, vy * t - (g * t * t) / 2));
      });
      const path = timedPath(pts);
      path.keyTimes = [...path.keyTimes.map(t => (t * flight) / clock), 1];
      path.keyPoints.push(1);
      svg.polyline(pts, { color, width: 3 });
      f.line([R / 2, 0], [R / 2, (vy * vy) / (2 * g)], {
        color: '#a5afb9',
        width: 1,
        dash: '4 5',
      });
      f.pvec([0, 0], v * 0.7, deg, { color, width: 2.5, head: 10 });
      launches.push({ path, color, apex: pts[60] });
      return R;
    };
    const span = (f, R, y, label, color) => {
      f.line([0, y + 3], [0, y - 3], { color, width: 1 });
      f.line([R, y + 3], [R, y - 3], { color, width: 1 });
      f.vec([0, y], [R, y], { color, width: 1.2, head: 8, start: true });
      const [x, py] = f.p(R / 2, y);
      svg.rect(x - 65, py - 12, 130, 24, { fill: '#ffffff' });
      svg.text(x, py, label, { size: 18, color });
    };
    const colors = ['#c13747', '#2563b5', '#087e83'];
    const legend = (y, k, label, detail) => {
      svg.line(704, y - 6, 733, y - 6, { color: colors[k], width: 3 });
      text(748, y, label, { color: colors[k], weight: 'bold' });
      text(748, y + 27, detail, { size: 17, color: '#526173' });
    };
    text(30, 35, 'Trajectories on level ground', { size: 27, weight: 'bold' });
    text(30, 66, 'All projectiles launch together and stop when they reach the ground.', {
      size: 18,
      color: '#526173',
    });
    // (a)
    text(30, 108, '(a) Same angle: 45°', { size: 22, weight: 'bold' });
    let f = new Frame(svg, { ox: 65, oy: 285, scale: 2.2 });
    f.line([-5, 0], [275, 0], { color: BLACK, width: 1.5 });
    [30, 40, 50].forEach((v, k) => {
      const R = traj(f, v, 45, colors[k]);
      span(f, R, -14 - k * 15, `R = ${k === 0 ? '91.8' : Math.round(R)} \\rm{m}`, colors[k]);
      legend(163 + k * 74, k, `${v} m/s`, `Range: ${k === 0 ? '91.8' : Math.round(R)} m`);
    });
    f.angle([0, 0], 0, 45, 26, '45°', { labelR: 39 });
    svg.xyIndicator(620, 177, { len: 32, size: 17 });
    svg.line(30, 409, 970, 409, { color: '#dce3e9', width: 1 });
    // (b)
    text(30, 446, '(b) Same initial speed: 50 m/s', { size: 22, weight: 'bold' });
    f = new Frame(svg, { ox: 65, oy: 735, scale: 2.2 });
    f.line([-5, 0], [275, 0], { color: BLACK, width: 1.5 });
    const ranges = [15, 45, 75].map((deg, k) => {
      const R = traj(f, 50, deg, colors[k]);
      legend(496 + k * 74, k, `${deg}° launch`, `Range: ${Math.round(R)} m`);
      return R;
    });
    span(f, ranges[0], -14, 'R = 128 \\rm{m}', colors[0]);
    span(f, ranges[1], -29, 'R = 255 \\rm{m}', colors[1]);
    text(704, 700, '15° and 75°: same range,', { size: 18, color: '#526173' });
    text(704, 726, 'different heights and flight times.', { size: 18, color: '#526173' });
    // Keep complete paths and apex markers in reduced motion and print.
    launches.forEach(({ path, color, apex }) => {
      svg.still(() => svg.circle(...apex, 7, { fill: color, stroke: '#ffffff', width: 2 }));
      svg.motionGroup(
        `<g>${smilMotion(path.path, { dur: duration, keyPoints: path.keyPoints, keyTimes: path.keyTimes })}<circle r="7" fill="${color}" stroke="#ffffff" stroke-width="2"/></g>`
      );
    });
    text(30, 830, 'Animation repeats. Air resistance is neglected.', {
      size: 16,
      color: '#526173',
    });
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

  // 3.2 / 3.3 — shared displacement diagram
  Figure_03_02_19: () => sanFranciscoSacramentoMap(),
  Figure_03_03_12: () => sanFranciscoSacramentoMap(),

  // 3.4 — displacement and its components on a projectile trajectory
  Figure_03_04_01: () => {
    const svg = new Svg({
      width: 540,
      height: 340,
      title: 'Soccer ball projectile trajectory',
      desc: 'A soccer player kicks a ball along a parabola. The displacement s to a ball on the descending path makes angle θ above horizontal, with horizontal component x and vertical component y.',
    });
    const f = new Frame(svg, { ox: 80, oy: 280, scale: 30 });
    f.axes({ xMin: 0, xMax: 14, yMin: 0, yMax: 8, xLabel: 'x', yLabel: 'y' });
    const v0 = 12;
    const vx = v0 * Math.cos(rad(60));
    const vy0 = v0 * Math.sin(rad(60));
    const g = 9.8;
    const tMax = (2 * vy0) / g;
    const position = t => [vx * t, vy0 * t - 0.5 * g * t * t];
    svg.polyline(
      Array.from({ length: 61 }, (_, k) => f.p(...position((tMax * k) / 60))),
      {
        color: RED,
        width: 2.5,
      }
    );
    drawPerson(svg, 62, 268, { size: 1.2, bodyColor: '#5ba3d0', facing: 'right' });
    const [x, y] = position(tMax * 0.65);
    f.vec([0, 0], [x, 0], { color: VEC, width: 2.5, head: 12, dash: '5 4' });
    f.vec([x, 0], [x, y], { color: VEC, width: 2.5, head: 12, dash: '5 4' });
    f.vec([0, 0], [x, y], { color: VEC, width: 3.5, head: 14 });
    f.rightAngle([x, 0], 180, 90, 12);
    f.angle([0, 0], 0, dir([x, y]), 45, 'θ', { labelR: 65, size: 18 });
    f.text([x / 2, 0], 'x', { dy: 22, size: 20 });
    f.text([x, y / 2], 'y', { dx: 20, size: 20 });
    f.labelSeg([0, 0], [x, y], '**s**', { off: 18, along: 0.65, size: 20 });
    // Successive positions and the black panels retain the soccer-ball context.
    for (const fraction of [0.16, 0.32, 0.48, 0.65]) {
      const [px, py] = f.p(...position(tMax * fraction));
      svg.circle(px, py, 9, { fill: '#ffffff', stroke: BLACK, width: 1.8 });
      svg.polygon(
        Array.from({ length: 5 }, (_, k) => [
          px + 3.5 * Math.cos(rad(72 * k - 90)),
          py + 3.5 * Math.sin(rad(72 * k - 90)),
        ]),
        { fill: BLACK }
      );
      for (let angle = -90; angle < 270; angle += 72) {
        svg.line(
          px + 3.5 * Math.cos(rad(angle)),
          py + 3.5 * Math.sin(rad(angle)),
          px + 8.5 * Math.cos(rad(angle)),
          py + 8.5 * Math.sin(rad(angle)),
          { color: BLACK, width: 1 }
        );
      }
    }
    return svg.render();
  },

  // 3.4 — the hot-rock example, with one scale for positions and one for velocities
  Figure_03_04_04: () => {
    const svg = new Svg({
      width: 740,
      height: 430,
      title: 'Volcano rock trajectory',
      desc: 'A rock launches at 25.0 m/s, 35° above horizontal, and strikes the slope 20.0 m below launch after about 3.96 s. The impact velocity points about 50.1° below horizontal. Both velocity arrows share a scale.',
    });
    const vx = 25 * Math.cos(rad(35));
    const vy0 = 25 * Math.sin(rad(35));
    const g = 9.8;
    const yEnd = -20;
    const t = (vy0 + Math.sqrt(vy0 * vy0 - 2 * g * yEnd)) / g;
    const xEnd = vx * t;
    const vyEnd = vy0 - g * t;
    const f = new Frame(svg, { ox: 85, oy: 130, scale: 5.5 });
    const terrain = [
      [-10, -4],
      [-5, -2],
      [0, 0],
      [7, -2],
      [14, -6],
      [28, -9],
      [45, -12],
      [62, -16],
      [xEnd, yEnd],
      [105, -20],
      [105, -48],
      [-10, -48],
    ];
    svg.polygon(
      terrain.map(p => f.p(...p)),
      { fill: '#d4a373', stroke: '#8b6f47', width: 1.8 }
    );
    svg.polygon(
      [
        [28, -9],
        [45, -12],
        [62, -16],
        [xEnd, yEnd],
        [105, -20],
        [105, -25],
        [xEnd, -24],
        [62, -20],
        [45, -16],
      ].map(p => f.p(...p)),
      { fill: '#9fc784', stroke: 'none' }
    );
    svg.xyIndicator(34, 85, { len: 35, size: 16 });
    f.line([0, 0], [xEnd + 15, 0], { color: BLACK, width: 1.2, dash: '5 4' });
    f.line([xEnd, yEnd], [xEnd + 15, yEnd], { color: BLACK, width: 1.2, dash: '5 4' });
    svg.vdimension(...f.p(xEnd + 15, 0), f.p(0, yEnd)[1], '', { tick: 14 });
    f.text([xEnd + 15, yEnd / 2], '20.0 \\rm{m}', { dx: 16, size: 17, anchor: 'start' });
    svg.polyline(
      Array.from({ length: 61 }, (_, k) => {
        const tk = (t * k) / 60;
        return f.p(vx * tk, vy0 * tk - 0.5 * g * tk * tk);
      }),
      { color: RED, width: 2.8 }
    );
    svg.circle(...f.p(0, 0), 4, { fill: BLACK });
    svg.polygon(
      [
        [-1.8, 0],
        [-1.2, 1.2],
        [0.5, 1.4],
        [1.7, 0.2],
        [1, -1.1],
        [-1, -1.3],
      ].map(([x, y]) => f.p(xEnd + x, yEnd + y)),
      { fill: '#a69c86', stroke: '#756b59' }
    );
    const vScale = 0.65;
    f.vec([0, 0], [vx * vScale, vy0 * vScale], { color: VEC, width: 3, head: 13 });
    f.vec([xEnd, yEnd], [xEnd + vx * vScale, yEnd + vyEnd * vScale], {
      color: VEC,
      width: 3,
      head: 13,
    });
    f.angle([0, 0], 0, 35, 40, '35°', { labelR: 62, size: 16 });
    // Svg.arc sweeps counterclockwise: start below horizontal for the small impact angle.
    f.angle([xEnd, yEnd], dir([vx, vyEnd]), 0, 32, 'θ', { labelR: 48, size: 18 });
    f.text([vx * vScale * 0.6, vy0 * vScale * 0.6], '**v**_0 = 25.0 \\rm{m/s}', {
      dx: 22,
      dy: -34,
      size: 17,
    });
    f.text([xEnd + vx * vScale * 0.6, yEnd + vyEnd * vScale * 0.6], '**v**', {
      dx: -18,
      dy: 8,
      size: 20,
    });
    return svg.render();
  },

  // 3.5 — the ship frame and the shore frame show the same landing event
  Figure_03_05_05: () => {
    const svg = new Svg({
      width: 760,
      height: 430,
      title: 'Binoculars dropped from a moving ship',
      desc: 'Left: in the ship frame, binoculars fall vertically onto the mast base. Right: in the shore frame, a faded ship marks release and a solid ship marks impact. The binoculars follow a parabola to the advancing mast base.',
    });
    svg.rect(0, 300, 760, 130, { fill: '#5ba3d0' });
    svg.rect(0, 365, 760, 65, { fill: '#3d7ba8' });
    for (const y of [352, 382, 412]) {
      svg.polyline(
        Array.from({ length: 191 }, (_, k) => [4 * k, y + 4 * Math.sin(k / 4)]),
        { color: '#bce6f5', width: 1.8 }
      );
    }
    svg.line(355, 50, 355, 345, { color: '#a0a0a0', width: 1, dash: '4 4' });
    svg.text(175, 28, '(a) Observer on ship', { size: 18, math: false, weight: 'bold' });
    svg.text(550, 28, '(b) Observer on shore', { size: 18, math: false, weight: 'bold' });
    const top = 125;
    const deck = 290;
    function ship(mastX, faded = false) {
      const art = svg.capture(() => {
        svg.polygon(
          [
            [mastX - 85, deck],
            [mastX + 90, deck],
            [mastX + 65, 324],
            [mastX - 60, 324],
          ],
          { fill: '#cd8b62', stroke: '#8b5a3c', width: 2 }
        );
        svg.line(mastX, deck, mastX, top - 15, { color: '#5d4e37', width: 4 });
        svg.polygon(
          [
            [mastX + 5, top + 8],
            [mastX + 65, deck - 8],
            [mastX + 5, deck - 8],
          ],
          { fill: '#f4e7d7', stroke: '#8b7355', width: 1.5 }
        );
        svg.polygon(
          [
            [mastX - 7, top + 20],
            [mastX - 60, deck - 8],
            [mastX - 7, deck - 8],
          ],
          { fill: '#f9eddc', stroke: '#8b7355', width: 1.5 }
        );
        drawPerson(svg, mastX - 12, top - 5, { size: 0.65, bodyColor: '#89c5e8', facing: 'right' });
      });
      svg.add(
        `<g opacity="${faded ? 0.3 : 1}" aria-label="${faded ? 'Ship at release' : 'Ship at impact'}">${art}</g>`
      );
    }
    ship(180);
    const initialMast = 465;
    const advance = 175;
    ship(initialMast, true);
    ship(initialMast + advance);
    svg.polyline(
      [
        [180, top],
        [180, deck],
      ],
      { color: BLUE, width: 2.8, dash: '6 4' }
    );
    const path = Array.from({ length: 41 }, (_, k) => {
      const t = k / 40;
      return [initialMast + advance * t, top + (deck - top) * t * t];
    });
    svg.polyline(path, { color: RED, width: 2.8, dash: '6 4' });
    for (const t of [0, 0.35, 0.7, 1]) {
      binoculars(svg, 180, top + (deck - top) * t * t);
      binoculars(svg, initialMast + advance * t, top + (deck - top) * t * t);
    }
    svg.arrow(180, 185, 180, 228, { color: BLUE, width: 2.5, head: 11 });
    svg.arrow(initialMast, 345, initialMast + advance, 345, { color: BLACK, width: 2, head: 12 });
    svg.text(550, 364, 'Ship advances during the fall', { size: 14, math: false });
    svg.text(initialMast, 65, 'Release', { size: 14, math: false });
    svg.text(initialMast + advance, 65, 'Impact', { size: 14, math: false });
    svg.rect(0, 392, 118, 38, { fill: '#7cb665' });
    drawPerson(svg, 64, 409, { size: 0.9, bodyColor: '#e89', facing: 'right' });
    return svg.render();
  },

  // 3.5 — magnified cabin inset and an equal-scale Earth-frame trajectory
  Figure_03_05_06: () => {
    const svg = new Svg({
      width: 780,
      height: 500,
      title: 'Coin dropped in an airplane, viewed in two frames',
      desc: 'A magnified cabin shows a vertical 1.50 m drop in the plane frame. In the ground frame the plane advances about 144 m while the coin falls 1.50 m along a nearly horizontal parabola, ending at the floor of the advanced cabin. Ground-frame horizontal and vertical distances use the same scale.',
    });
    svg.text(390, 25, '(a) Observer in plane — magnified cabin', {
      size: 18,
      math: false,
      weight: 'bold',
    });
    svg.rect(90, 55, 230, 145, { fill: '#eeeeee', stroke: '#666666', width: 2 });
    svg.rect(105, 65, 85, 42, { fill: '#b8d4f0', stroke: '#6699cc', width: 1.5 });
    svg.rect(210, 65, 95, 42, { fill: '#b8d4f0', stroke: '#6699cc', width: 1.5 });
    svg.rect(110, 143, 55, 13, { fill: '#d4a373', stroke: '#8b6f47' });
    svg.line(110, 156, 110, 190, { color: '#666666', width: 3 });
    drawPerson(svg, 150, 145, { size: 0.9, bodyColor: '#f4a9b8', facing: 'right', sitting: true });
    const release = 125;
    const floor = 190;
    svg.line(95, floor, 315, floor, { color: '#666666', width: 3 });
    svg.polyline(
      [
        [188, release],
        [188, floor],
      ],
      { color: RED, width: 2.5, dash: '4 3' }
    );
    for (const t of [0, 0.5, 1])
      svg.circle(188, release + (floor - release) * t * t, 3, {
        fill: '#ffd700',
        stroke: '#946300',
        width: 1,
      });
    svg.arrow(210, 142, 210, 182, { color: BLUE, width: 2.5, head: 10 });
    svg.text(235, 162, '**v**', { size: 18 });
    svg.vdimension(350, release, floor, '', { tick: 12 });
    svg.text(370, 155, '1.50 \\rm{m}', { size: 16, anchor: 'start' });
    svg.text(480, 120, 'v_y = −5.42 \\rm{m/s}', { size: 18, anchor: 'start' });
    svg.text(480, 150, 'Straight down to the floor', { size: 16, math: false, anchor: 'start' });
    svg.text(390, 235, '(b) Observer on ground — equal distance scales', {
      size: 18,
      math: false,
      weight: 'bold',
    });
    const g = 9.8;
    const duration = Math.sqrt((2 * 1.5) / g);
    const scale = 2.8;
    const advance = 260 * duration * scale;
    const coinX = 170;
    const coinY = 325.8;
    const floorY = coinY + 1.5 * scale;
    function plane(x, faded = false) {
      const art = svg.capture(() => {
        svg.polygon(
          [
            [x, 303],
            [x + 25, 309],
            [x + 190, 309],
            [x + 230, 326],
            [x + 194, 342],
            [x + 20, 342],
            [x + 7, 333],
          ],
          { fill: '#eeeeee', stroke: '#666666', width: 1.5 }
        );
        svg.polygon(
          [
            [x + 80, 337],
            [x + 125, 366],
            [x + 145, 366],
            [x + 120, 337],
          ],
          { fill: '#bbbbbb', stroke: '#777777', width: 1.2 }
        );
        for (let wx = 45; wx <= 180; wx += 23)
          svg.rect(x + wx, 314, 12, 7, { fill: '#b8d4f0', stroke: '#6699cc', width: 0.8 });
        svg.line(x + 90, floorY, x + 170, floorY, { color: '#555555', width: 1.6 });
        drawPerson(svg, x + 123, floorY - 2, { size: 0.16, bodyColor: '#f4a9b8', facing: 'right' });
      });
      svg.add(
        `<g opacity="${faded ? 0.35 : 1}" aria-label="Plane at ${faded ? 'release' : 'impact'}">${art}</g>`
      );
    }
    plane(40, true);
    plane(40 + advance);
    const path = Array.from({ length: 61 }, (_, k) => {
      const t = (duration * k) / 60;
      return [coinX + scale * 260 * t, coinY + scale * 0.5 * g * t * t];
    });
    svg.polyline(path, { color: RED, width: 2.5 });
    svg.circle(coinX, coinY, 3, { fill: '#ffd700', stroke: '#946300', width: 1 });
    svg.circle(coinX + advance, floorY, 3, { fill: '#ffd700', stroke: '#946300', width: 1 });
    svg.arrow(540, 275, 650, 275, { color: BLUE, width: 2.5, head: 12 });
    svg.text(595, 258, '260 \\rm{m/s}', { size: 16 });
    svg.text(170, 286, 'Release', { size: 14, math: false });
    svg.text(coinX + advance, 390, 'Coin reaches cabin floor', { size: 15, math: false });
    svg.leader(coinX + advance, 376, coinX + advance, floorY + 4, { bend: 0.12 });
    svg.text(355, 410, '≈144 m forward; 1.50 m down', { size: 16, math: false });
    svg.rect(0, 478, 780, 22, { fill: '#7cb665' });
    drawPerson(svg, 70, 470, { size: 0.9, bodyColor: '#ffa07a', facing: 'right' });
    return svg.render();
  },

  // 3.5 — signed distances and recession velocities relative to the Milky Way
  Figure_03_05_07: () => {
    const svg = new Svg({
      width: 1150,
      height: 210,
      title: 'Five galaxies along a line showing Hubble expansion',
      desc: 'Galaxies 1 and 2 lie 300 and 150 Mly left of the Milky Way; galaxies 4 and 5 lie 190 and 450 Mly right. Velocities are −4500, −2200, 0, +2830, and +6700 km/s. Positions and velocity arrows each share a scale.',
    });
    svg.line(45, 105, 1125, 105, { color: '#999999', width: 1, dash: '3 5' });
    const galaxies = [
      { d: -300, v: -4500, label: '1' },
      { d: -150, v: -2200, label: '2' },
      { d: 0, v: 0, label: '3' },
      { d: 190, v: 2830, label: '4' },
      { d: 450, v: 6700, label: '5' },
    ];
    for (const galaxy of galaxies) {
      const x = 470 + 1.25 * galaxy.d;
      drawGalaxy(svg, x, 105);
      svg.text(x, 28, `Galaxy ${galaxy.label}`, { size: 17, math: false });
      svg.text(x, 52, galaxy.d === 0 ? 'MW' : `${Math.abs(galaxy.d)} Mly`, {
        size: 16,
        math: false,
      });
      if (galaxy.v)
        svg.arrow(x, 105, x + 0.012 * galaxy.v, 105, { color: VEL3, width: 3, head: 9 });
      svg.text(x, 175, `v_{${galaxy.label}} = ${galaxy.v} \\rm{km/s}`, { size: 16 });
    }
    return svg.render();
  },

  // 3.5 — player plus southeast puck velocity gives an eastward resultant
  Figure_03_05_08: () => {
    const svg = new Svg({
      width: 720,
      height: 400,
      title: 'Hockey player shoots backward relative to north to hit an eastward goal',
      desc: 'Player velocity is 8.00 m/s north. The puck velocity relative to the player is 29.0 m/s, with components about 27.9 m/s east and 8.00 m/s south. Head-to-tail addition gives a purely eastward velocity toward the center of the goal. θ is measured from north, about 106°.',
    });
    const f = new Frame(svg, { ox: 185, oy: 225, scale: 13 });
    f.axes({ xMin: -2, xMax: 35, yMin: -7, yMax: 13, xLabel: 'x', yLabel: 'y' });
    const vx = Math.sqrt(29 ** 2 - 8 ** 2);
    const origin = [0, 0];
    const playerTip = [0, 8];
    const resultTip = [vx, 0];
    const [goalX, goalY] = f.p(...resultTip);
    svg.rect(goalX, goalY - 32, 48, 64, { fill: '#fff', stroke: '#cc0000', width: 3 });
    for (let k = 1; k < 4; k += 1) {
      svg.line(goalX, goalY - 32 + 16 * k, goalX + 48, goalY - 32 + 16 * k, {
        color: '#cc0000',
        width: 1,
      });
      svg.line(goalX + 12 * k, goalY - 32, goalX + 12 * k, goalY + 32, {
        color: '#cc0000',
        width: 1,
      });
    }
    svg.text(goalX + 63, goalY, 'Goal', { size: 17, math: false, anchor: 'start' });
    drawPerson(svg, 168, 244, { size: 1.1, bodyColor: '#5ba3d0', facing: 'right' });
    svg.line(177, 239, 187, 226, { color: '#8b6f47', width: 3 });
    svg.circle(...f.p(...origin), 4, { fill: BLACK });
    f.vec(origin, playerTip, { color: VEL3, width: 3.5, head: 14 });
    f.vec(playerTip, resultTip, { color: MAROON, width: 3.5, head: 14 });
    f.vec(origin, resultTip, { color: VEC, width: 3.5, head: 14 });
    f.text([0, 4], '**v**_{\\rm{player}}', { dx: -28, dy: -10, size: 18, anchor: 'end' });
    f.text([0, 4], '8.00 \\rm{m/s}', { dx: -28, dy: 14, size: 16, anchor: 'end' });
    f.labelSeg(playerTip, resultTip, '**v**_{\\rm{puck}} = 29.0 \\rm{m/s}', { off: 24, size: 18 });
    f.text([vx / 2, 0], '**v**_{\\rm{tot}}', { dy: 28, size: 18 });
    f.text([vx / 2, 0], '\\rm{relative to ice}', { dy: 51, size: 16 });
    f.line(playerTip, [0, 12.3], { color: BLACK, width: 1.2, dash: '4 3' });
    f.line(playerTip, [vx, 8], { color: '#888888', width: 1, dash: '4 3' });
    f.angle(playerTip, dir([vx, -8]), 90, 42, 'θ = ?', { labelR: 68, size: 18 });
    f.rightAngle(origin, 0, 90, 14);
    svg.compass(660, 90, { r: 24, size: 15 });
    svg.text(360, 27, '**v**_{\\rm{player}} + **v**_{\\rm{puck}} = **v**_{\\rm{tot}}', {
      size: 19,
    });
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

  // One clock for the whole figure. vx stays put; vy scales through zero at the top.
  const DUR = '10s';
  const flight = [];
  for (let k = 0; k <= 40; k += 1) flight.push(pos((8 * k) / 40));
  const trail = timedPath(flight);
  const Lvx = vx * sc;
  const Lvy = vy0 * sc;
  const mover = `<circle r="11" fill="#c0392b" stroke="#ffffff" stroke-width="2"/>`;
  const vxArrow = localArrow(Lvx, 0, BLUE2, { width: 3, head: 12 });
  const vyArrow = `<g>${smilScaleY(1, -1, { dur: DUR })}${localArrow(0, -Lvy, ORANGE, { width: 3, head: 12 })}</g>`;
  svg.motionGroup(
    `${smilMotion(trail.path, { dur: DUR, rotate: '0', keyPoints: trail.keyPoints, keyTimes: trail.keyTimes })}${mover}${vxArrow}${vyArrow}`
  );
  const row = [];
  for (let t = 0; t <= 8; t += 0.5) row.push([50 + t * 84, by]);
  svg.motionGroup(`<g>${smilTranslate(row, { dur: DUR })}${mover}${vxArrow}</g>`);
  const rise = [];
  const riseTimes = [];
  for (let t = 0; t <= 4; t += 0.5) {
    rise.push([90, top + (height(4) - height(t))]);
    riseTimes.push(t / 8);
  }
  rise.push([190, top]);
  riseTimes.push(0.508);
  for (let t = 4.5; t <= 8; t += 0.5) {
    rise.push([190, top + (height(4) - height(t))]);
    riseTimes.push(t / 8);
  }
  svg.motionGroup(
    `<g>${smilTranslate(rise, { dur: DUR, keyTimes: riseTimes })}${mover}${vyArrow}</g>`
  );
  svg.motionGroup(
    `<circle cx="${dx}" cy="${dy}" r="18" fill="none" stroke="${PURPLE}" stroke-width="3" opacity="0">${smilAnimate('opacity', [0, 0, 1, 0], { dur: DUR, keyTimes: [0, 0.78, 0.92, 1] })}</circle>`
  );
  return svg.render();
}

/** San Francisco to Sacramento map (Figures 3.2.19 and 3.3.12). */
function sanFranciscoSacramentoMap() {
  const svg = new Svg({
    width: 460,
    height: 420,
    title: 'San Francisco to Sacramento displacement',
    desc: 'A circle of radius 123 km centered on San Francisco. Sacramento lies on the circumference at 45° north of east. A compass rose shows cardinal directions.',
  });
  const cx = 200;
  const cy = 220;
  const r = 123;
  const scale = 1.3;
  const rPx = r * scale;
  svg.circle(cx, cy, rPx, { fill: 'none', stroke: BLACK, width: 2 });
  svg.circle(cx, cy, 5, { fill: RED, stroke: 'none' });
  svg.text(cx, cy + 20, 'San Francisco', { size: 15, anchor: 'middle', math: false });
  const angle = 45;
  const sacX = cx + rPx * Math.cos(rad(angle));
  const sacY = cy - rPx * Math.sin(rad(angle));
  svg.circle(sacX, sacY, 5, { fill: RED, stroke: 'none' });
  svg.text(sacX, sacY - 12, 'Sacramento', { size: 15, anchor: 'middle', math: false });
  svg.arrow(cx, cy, sacX, sacY, { color: BLUE, width: 3, head: 14 });
  svg.text((cx + sacX) / 2 - 30, (cy + sacY) / 2 - 28, 'S', { size: 18, weight: 'bold' });
  svg.text((cx + sacX) / 2 - 30, (cy + sacY) / 2 - 10, 'S = 123 km', {
    size: 14,
    anchor: 'middle',
    math: false,
  });
  const arcR = 50;
  svg.arc(cx, cy, arcR, 0, angle, { color: BLACK, width: 1.5 });
  svg.text(cx + arcR + 22, cy - 10, '45°', { size: 15, math: false });
  svg.text(cx + 120, cy + 16, 'East', { size: 14, math: false });
  svg.line(cx, cy, cx + 120, cy, { color: BLACK, width: 1.5, dash: '5 4' });
  svg.compass(395, 65, { r: 32, size: 16 });
  return svg.render();
}

/** Helper to draw a simple stick figure person. */
function drawPerson(
  svg,
  x,
  y,
  { size = 1, bodyColor = '#ffa07a', facing = 'left', sitting = false } = {}
) {
  const s = size;
  svg.circle(x, y - 32 * s, 8 * s, { fill: bodyColor, stroke: '#8b4513', width: 1.5 * s });
  svg.line(x, y - 24 * s, x, y - 8 * s, { color: '#8b4513', width: 2.5 * s });
  if (sitting) {
    svg.line(x, y - 8 * s, x - 10 * s, y, { color: '#8b4513', width: 2.5 * s });
    svg.line(x, y - 8 * s, x + 10 * s, y, { color: '#8b4513', width: 2.5 * s });
  } else {
    svg.line(x, y - 8 * s, x - 6 * s, y + 8 * s, { color: '#8b4513', width: 2.5 * s });
    svg.line(x, y - 8 * s, x + 6 * s, y + 8 * s, { color: '#8b4513', width: 2.5 * s });
  }
  const armDir = facing === 'right' ? 1 : -1;
  svg.line(x, y - 18 * s, x + armDir * 12 * s, y - 10 * s, { color: '#8b4513', width: 2.5 * s });
  svg.line(x, y - 18 * s, x - armDir * 8 * s, y - 12 * s, { color: '#8b4513', width: 2.5 * s });
}

/** Helper to draw a stylized spiral galaxy. */
function drawGalaxy(svg, x, y) {
  const spiral = [];
  for (let t = 0; t <= 12; t += 0.2) {
    const r = 2 + t * 1.5;
    const angle = t * 0.8;
    spiral.push([x + r * Math.cos(angle), y + r * Math.sin(angle)]);
  }
  svg.polyline(spiral, { color: '#9db4d0', width: 2, fill: 'none' });
  const spiral2 = [];
  for (let t = 0; t <= 12; t += 0.2) {
    const r = 2 + t * 1.5;
    const angle = t * 0.8 + Math.PI;
    spiral2.push([x + r * Math.cos(angle), y + r * Math.sin(angle)]);
  }
  svg.polyline(spiral2, { color: '#9db4d0', width: 2, fill: 'none' });
  svg.circle(x, y, 6, { fill: '#e8d4a0', stroke: 'none' });
  svg.circle(x, y, 3, { fill: '#ffffff', stroke: 'none', opacity: 0.8 });
}

/** A recognizable binocular marker centered on the falling object's position. */
function binoculars(svg, x, y) {
  svg.line(x - 4, y, x + 4, y, { color: '#263e49', width: 3 });
  for (const dx of [-4, 4]) {
    svg.rect(x + dx - 2.5, y - 4, 5, 8, { fill: '#4a90a4', stroke: '#263e49', width: 1 });
    svg.circle(x + dx, y + 3, 2.5, { fill: '#b8d4f0', stroke: '#263e49', width: 1 });
  }
}
