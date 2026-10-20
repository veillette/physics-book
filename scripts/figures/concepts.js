/**
 * Figures for the answers to the Conceptual Questions of chapters 1–9.
 *
 * Names follow concept_CC_SS_qNN: chapter, section, and the question's number
 * within that section's Conceptual Questions. The graph answers in section 2.8
 * differentiate the very curves drawn in Figures 9, 10 and 12 (see
 * `splineSlope`), so the sketched velocity and acceleration agree with the
 * slopes a student reads off the question's figure.
 */
import { COLORS, Frame, Plot, Svg, fmt, rad, smoothPath, splineSlope } from './svg.js';

const POS = COLORS.position;
const VEL = COLORS.velocity;
const ACC = COLORS.accel;
const VEC = COLORS.vector;

const minus = s => String(s).replace(/-/g, '−');
const range = (a, b, step) => {
  const out = [];
  for (let v = a; v <= b + 1e-9; v += step) out.push(Number(v.toFixed(6)));
  return out;
};

/** Sketch graph with arrowed axes and no numbers, like the section 2.8 figures. */
function sketchPlot(svg, box, plot, axes) {
  const g = new Plot(svg, { ...box, ...plot });
  g.axes({ arrows: true, titleSize: 17, yTitleOffset: 28, xTitleOffset: 34, ...axes });
  return g;
}

/** Letters beside points of a graph. */
function letters(g, svg, pts, names, offsets = {}) {
  pts.forEach(([x, y], k) => {
    const [dx, dy] = offsets[names[k]] || [0, -18];
    svg.text(g.X(x) + dx, g.Y(y) + dy, names[k], { size: 18, italic: false });
  });
}

/** Short dashed tangent line through (x, y) with slope m, in data units. */
function tangent(g, x, y, m, half, { color = COLORS.black } = {}) {
  g.line(x - half, y - m * half, x + half, y + m * half, { color, width: 1.6, dash: '6 4' });
}

/** A small ball. */
function ball(svg, x, y, { r = 9, fill = '#e0a030' } = {}) {
  svg.circle(x, y, r, { fill, stroke: COLORS.black, width: 1.2 });
}

/** Ground hatching along y from x1 to x2. */
function ground(svg, x1, x2, y) {
  svg.line(x1, y, x2, y, { color: COLORS.black, width: 2 });
  for (let x = x1 + 6; x < x2; x += 14) {
    svg.line(x, y, x - 8, y + 9, { color: COLORS.guide, width: 1 });
  }
}

/** Stick-figure runner facing +x, feet at (x, y), about 90 px tall. */
function runner(svg, x, y, { color = COLORS.black } = {}) {
  const hip = [x, y - 42];
  const neck = [x + 6, y - 74];
  svg.circle(neck[0] + 3, neck[1] - 11, 9, { fill: '#ffffff', stroke: color, width: 2 });
  svg.line(...hip, ...neck, { color, width: 3, cap: 'round' });
  svg.polyline([hip, [x + 14, y - 22], [x + 22, y]], { color, width: 3 });
  svg.polyline([hip, [x - 10, y - 20], [x - 22, y - 8]], { color, width: 3 });
  svg.polyline(
    [
      [neck[0] - 1, neck[1] + 8],
      [x + 20, y - 54],
      [x + 30, y - 66],
    ],
    {
      color,
      width: 3,
    }
  );
  svg.polyline(
    [
      [neck[0] - 1, neck[1] + 8],
      [x - 10, y - 50],
      [x - 20, y - 40],
    ],
    {
      color,
      width: 3,
    }
  );
}

/** Panel caption in the top-left corner of a panel that starts at x0. */
function caption(svg, x0, text, { y = 24 } = {}) {
  svg.text(x0 + 12, y, text, { size: 15, math: false, weight: 'bold', anchor: 'start' });
}

/** A thin rule between panels. */
function divider(svg, x, height) {
  svg.line(x, 10, x, height - 10, { color: '#cccccc', width: 1 });
}

// Section 2.8 question graphs (data copied from scripts/figures/ch02.js).
const FIG9 = [
  [28, 27],
  [56, 115],
  [108, 187],
  [186, 232],
  [289, 248],
  [400, 238],
];
const FIG10 = [
  [12, 93],
  [41, 46],
  [70, 36],
  [128, 117],
  [168, 164],
  [211, 126],
  [258, 107],
  [301, 126],
  [328, 157],
  [366, 210],
  [408, 244],
  [443, 253],
];
const FIG12 = [
  [0, 0],
  [26, 69],
  [50, 117],
  [86, 161],
  [150, 145],
  [204, 164],
  [258, 195],
  [312, 218],
  [358, 168],
  [383, 114],
  [403, 63],
  [424, 0],
];
const SAMPLES = 24;

/** Plot the slope of a sketch curve and mark the lettered points on it. */
function derivativeSketch({ title, desc, points, tension, flat, yTitle, color, offsets }) {
  const exact = splineSlope(points, tension, { horizontalTangents: flat, n: SAMPLES });
  // A short moving average removes the corners that the drawn curve's
  // piecewise construction leaves in its slope; a hand sketch would not show them.
  const slope = exact.map(([x], k) => {
    const half = Math.min(6, k, exact.length - 1 - k); // exact at the ends
    const win = exact.slice(k - half, k + half + 1);
    return [x, win.reduce((sum, w) => sum + w[1], 0) / win.length];
  });
  const lo = Math.min(...slope.map(s => s[1]));
  const hi = Math.max(...slope.map(s => s[1]));
  const pad = (hi - lo) * 0.12;
  const svg = new Svg({ width: 560, height: 420, title, desc });
  const g = sketchPlot(
    svg,
    { x: 70, y: 30, w: 450, h: 330 },
    { xRange: [0, 460], yRange: [lo - pad, hi + pad] },
    { xTitle: 'Time \\it{t}', yTitle }
  );
  g.series(slope, { color, width: 3 });
  const marks = points.map((_, k) => slope[k * SAMPLES]);
  for (const [x, y] of marks) svg.marker(g.X(x), g.Y(y), 'circle', { color, size: 6 });
  letters(g, svg, marks, 'abcdefghijkl'.split('').slice(0, points.length), offsets);
  return svg.render();
}

export default {
  // 1.1 Q7–Q9 — where classical physics, relativity and quantum mechanics apply
  concept_01_01_q07: () => {
    const svg = new Svg({
      width: 640,
      height: 470,
      title: 'Realms of physics by size and speed',
      desc: 'Object size (from 10^-15 m to 10^6 m, logarithmic) plotted against speed as a fraction of the speed of light (10^-8 to 1, logarithmic). Large, slow objects are in the realm of classical physics; objects near the speed of light need relativity; objects smaller than about 10^-8 m need quantum mechanics; small and fast objects need relativistic quantum mechanics. A car (30 m/s) and an orbiting satellite (7500 m/s, v/c = 2.5 × 10^-5) fall well inside the classical region; an electron in an atom falls in the quantum region, and a proton in an accelerator in the relativistic quantum region.',
    });
    const g = new Plot(svg, {
      x: 110,
      y: 30,
      w: 490,
      h: 340,
      xRange: [-8, 0],
      yRange: [-15, 6],
      xTicks: [-8, -6, -4, -2, 0],
      yTicks: [-15, -10, -5, 0, 5],
      xFormat: t => (t === 0 ? '1' : `10^{${minus(t)}}`),
      yFormat: t => (t === 0 ? '1' : `10^{${minus(t)}}`),
    });
    const region = (x1, x2, y1, y2, fill, label, sub, narrow) => {
      svg.rect(g.X(x1), g.Y(y2), g.X(x2) - g.X(x1), g.Y(y1) - g.Y(y2), { fill });
      const cx = (g.X(x1) + g.X(x2)) / 2;
      const cy = (g.Y(y1) + g.Y(y2)) / 2;
      const size = narrow ? 12 : 16;
      svg.text(cx, cy - 10, label, { size, math: false, weight: 'bold' });
      if (sub) svg.lines(cx, cy + 10, sub.split('\n'), { size: narrow ? 12 : 13, math: false });
    };
    const vB = -1.2; // a few percent of c; the boundaries are gradual
    const sB = -8; // about 10 nm
    region(-8, vB, sB, 6, '#dcebf5', 'Classical physics', '(Newton’s laws)');
    region(vB, 0, sB, 6, '#f8e3cc', 'Relativity', '', true);
    region(-8, vB, -15, sB, '#dff0d8', 'Quantum mechanics', '');
    region(vB, 0, -15, sB, '#e8def0', 'Relativistic', 'quantum\nmechanics', true);
    g.line(vB, -15, vB, 6, { color: COLORS.guide, width: 1.5, dash: '6 4' });
    g.line(-8, sB, 0, sB, { color: COLORS.guide, width: 1.5, dash: '6 4' });
    g.axes({
      box: true,
      xAxisAt: -15,
      xTitle: 'Speed as a fraction of the speed of light, \\it{v}/\\it{c}',
      yTitle: 'Size of object (m)',
      yTitleOffset: 70,
      xTitleOffset: 46,
    });
    const point = (x, y, label, { dx = 10, anchor = 'start', dy = 0 } = {}) => {
      svg.marker(g.X(x), g.Y(y), 'circle', { color: COLORS.red, size: 6 });
      svg.text(g.X(x) + dx, g.Y(y) + dy, label, { size: 13, math: false, anchor });
    };
    point(Math.log10(30 / 3e8), 0.6, 'car, 30 \\rm{m/s}');
    point(Math.log10(7500 / 3e8), 1, 'satellite, 7500 \\rm{m/s}', { dy: -14, dx: -8 });
    point(Math.log10(1 / 137), -9.5, 'electron in atom', { dx: 0, dy: -16, anchor: 'middle' });
    point(-0.0005, -14.3, 'accelerator proton', { dx: -14, anchor: 'end' });
    return svg.render();
  },

  // 1.3 Q1 — accuracy versus uncertainty
  concept_01_03_q01: () => {
    const svg = new Svg({
      width: 600,
      height: 260,
      title: 'Two measurements of a 25.00 cm length',
      desc: 'A number line from 24.4 cm to 25.6 cm with the accepted value, 25.00 cm, marked by a dashed line. Measurement A, 25.1 ± 0.3 cm, has a wide uncertainty bar that includes 25.00 cm. Measurement B, 24.62 ± 0.05 cm, has a narrow bar that lies entirely below 25.00 cm: it is precise but not accurate.',
    });
    const g = new Plot(svg, {
      x: 40,
      y: 30,
      w: 520,
      h: 160,
      xRange: [24.4, 25.6],
      yRange: [0, 3],
      xTicks: range(24.4, 25.6, 0.2),
      xFormat: t => t.toFixed(1),
    });
    g.line(24.4, 0, 25.6, 0, { color: COLORS.axis, width: 1.5 });
    for (const t of g.xTicks) {
      g.line(t, 0, t, 0.12, { color: COLORS.axis, width: 1.2 });
      g.text(t, -0.35, t.toFixed(1), { size: 14, math: false });
    }
    svg.text(g.X(25.0), g.Y(0) + 48, 'Length (cm)', { size: 15, math: false, weight: 'bold' });
    g.line(25.0, 0, 25.0, 3, { color: COLORS.guide, width: 1.5, dash: '6 4' });
    g.text(25.0, 2.9, 'accepted value 25.00 cm', { size: 14, math: false });
    const bar = (x, dx, y, color, label) => {
      g.line(x - dx, y, x + dx, y, { color, width: 3 });
      g.line(x - dx, y - 0.15, x - dx, y + 0.15, { color, width: 3 });
      g.line(x + dx, y - 0.15, x + dx, y + 0.15, { color, width: 3 });
      svg.marker(g.X(x), g.Y(y), 'circle', { color, size: 6 });
      g.text(x, y + 0.42, label, { size: 14, math: false });
    };
    bar(25.1, 0.3, 1.9, COLORS.blue, 'A: 25.1 ± 0.3 cm (accurate)');
    bar(24.62, 0.05, 0.9, COLORS.red, 'B: 24.62 ± 0.05 cm (precise, not accurate)');
    return svg.render();
  },

  // 2.1 Q1 (and 2.3 Q2) — distance, displacement, and magnitude of displacement
  concept_02_01_q01: () => {
    const svg = new Svg({
      width: 640,
      height: 250,
      title: 'A walk to the store and partway back',
      desc: 'A number line in kilometers with east positive. The walker goes from home at x = 0 to a store at x = 4.0 km, then walks 1.5 km back west to x = 2.5 km. The distance traveled is 5.5 km, the displacement is +2.5 km (2.5 km east), and the magnitude of the displacement is 2.5 km.',
    });
    const g = new Plot(svg, {
      x: 60,
      y: 20,
      w: 470,
      h: 180,
      xRange: [-0.5, 5.2],
      yRange: [0, 4],
    });
    svg.arrow(g.X(-0.5), g.Y(0.6), g.X(5.4), g.Y(0.6), {
      color: COLORS.axis,
      width: 1.5,
      head: 10,
    });
    svg.text(g.X(5.4) + 6, g.Y(0.6), '+\\it{x} (east)', { size: 15, anchor: 'start' });
    for (const t of range(0, 5, 1)) {
      g.line(t, 0.5, t, 0.7, { color: COLORS.axis, width: 1.2 });
      g.text(t, 0.2, `${t}`, { size: 14, math: false });
    }
    svg.text(g.X(2.25), g.Y(0) + 18, 'Position (km)', { size: 14, math: false });
    g.text(0, 1.05, 'home', { size: 14, math: false });
    g.text(4, 1.05, 'store', { size: 14, math: false });
    const [ax0, ay] = g.P(0, 3.4);
    svg.arrow(ax0, ay, g.X(4), ay, { color: POS, width: 3, head: 13 });
    svg.text(g.X(2), ay - 16, '1: 4.0 km east', { size: 15, math: false });
    const by = g.Y(2.6);
    svg.arrow(g.X(4), by, g.X(2.5), by, { color: POS, width: 3, head: 13 });
    svg.text(g.X(3.25), by - 16, '2: 1.5 km west', { size: 15, math: false });
    const dy = g.Y(1.65);
    svg.arrow(g.X(0), dy, g.X(2.5), dy, { color: VEC, width: 4, head: 15 });
    svg.text(g.X(1.25), dy - 17, 'Δx = +2.5 \\rm{km}', { size: 16 });
    g.line(0, 0.6, 0, 3.6, { color: COLORS.guide, width: 1, dash: '4 4' });
    g.line(2.5, 0.6, 2.5, 2.8, { color: COLORS.guide, width: 1, dash: '4 4' });
    g.line(4, 0.6, 4, 3.6, { color: COLORS.guide, width: 1, dash: '4 4' });
    return svg.render();
  },

  // 2.4 Q1 — constant speed with nonzero acceleration (uniform circular motion)
  concept_02_04_q01: () => {
    const svg = new Svg({
      width: 460,
      height: 400,
      title: 'Uniform circular motion',
      desc: 'A car moves around a circular track of radius 50 m at a constant speed of 20 m/s. At three positions the velocity arrow (green) is tangent to the circle and has the same length, while the acceleration arrow (purple) points toward the center. The speed is constant but the direction of the velocity changes, so the acceleration is not zero.',
    });
    const f = new Frame(svg, { ox: 210, oy: 205, scale: 1 });
    svg.circle(210, 205, 130, { fill: 'none', stroke: COLORS.guide, width: 2 });
    svg.circle(210, 205, 3.5, { fill: COLORS.guide });
    f.labelSeg([0, 0], [130 * Math.cos(-2.4), 130 * Math.sin(-2.4)], 'r = 50 \\rm{m}', {
      off: 14,
      size: 15,
    });
    f.line([0, 0], [130 * Math.cos(-2.4), 130 * Math.sin(-2.4)], {
      color: COLORS.guide,
      width: 1,
      dash: '4 4',
    });
    for (const deg of [90, -20, 200]) {
      const p = Frame.polar(130, deg);
      svg.circle(...f.p(...p), 8, { fill: '#2b5797' });
      f.pvec(p, 85, deg + 90, { color: VEL });
      f.pvec(p, 60, deg + 180, { color: ACC });
    }
    f.text(Frame.polar(130, 90), '**v**', { dx: -60, dy: -14, size: 19, color: VEL });
    f.text(Frame.polar(130, 90), '**a**', { dx: 16, dy: 40, size: 19, color: ACC });
    svg.text(16, 372, 'speed v = 20 m/s everywhere;', { size: 14, math: false, anchor: 'start' });
    svg.text(16, 390, 'a = v^2/r = 8.0 \\rm{m/s}^2 toward the center', {
      size: 14,
      math: false,
      anchor: 'start',
    });
    return svg.render();
  },

  // 2.4 Q4 — subway train moving left and stopping
  concept_02_04_q04: () => {
    const svg = new Svg({
      width: 560,
      height: 220,
      title: 'A subway train slowing to a stop while moving left',
      desc: 'A train moves to the left, in the negative x direction, so its velocity arrow points left. It is slowing down, so its acceleration arrow points to the right, in the positive x direction: the acceleration is positive.',
    });
    svg.rect(190, 70, 200, 60, { fill: '#cfe3ea', stroke: COLORS.black, width: 2, rx: 10 });
    for (const x of [215, 265, 315])
      svg.rect(x, 82, 34, 22, { fill: '#ffffff', stroke: COLORS.black });
    svg.circle(225, 136, 9, { fill: COLORS.black });
    svg.circle(355, 136, 9, { fill: COLORS.black });
    svg.line(30, 146, 530, 146, { color: COLORS.black, width: 2 });
    svg.arrow(180, 52, 70, 52, { color: VEL, width: 4, head: 15 });
    svg.text(125, 30, '**v** (v < 0)', { size: 17, color: VEL });
    svg.arrow(400, 52, 500, 52, { color: ACC, width: 4, head: 15 });
    svg.text(450, 30, '**a** (a > 0)', { size: 17, color: ACC });
    svg.arrow(230, 190, 350, 190, { color: COLORS.axis, width: 1.5, head: 10 });
    svg.text(358, 190, '+x', { size: 17, anchor: 'start' });
    return svg.render();
  },

  // 2.7 Q1–Q3 (and 2.4 Q3) — a rock thrown straight up
  concept_02_07_q01: () => {
    const svg = new Svg({
      width: 600,
      height: 420,
      title: 'A rock thrown straight up: velocity and acceleration',
      desc: 'Three snapshots of a rock thrown straight up, with +y up. On the way up at height h the velocity points up; at the top the velocity is zero; on the way down at the same height h the velocity points down with the same length as on the way up. At all three snapshots the acceleration arrow points down with the same length: a = −g = −9.80 m/s².',
    });
    ground(svg, 20, 580, 360);
    const hY = 250;
    svg.line(90, hY, 560, hY, { color: COLORS.guide, width: 1.2, dash: '6 4' });
    svg.text(560, hY - 14, 'height h', { size: 14, math: false, anchor: 'end' });
    svg.arrow(50, 355, 50, 60, { color: COLORS.axis, width: 1.5, head: 10 });
    svg.text(50, 46, '+y', { size: 17 });
    const snap = (x, y, v, label) => {
      ball(svg, x, y);
      if (v) svg.arrow(x - 22, y, x - 22, y - v, { color: VEL, width: 3.5, head: 13 });
      svg.arrow(x + 22, y, x + 22, y + 60, { color: ACC, width: 3.5, head: 13 });
      svg.text(x, 396, label, { size: 15, math: false, baseline: 'alphabetic' });
    };
    snap(170, hY, 90, 'on the way up');
    svg.text(140, hY - 50, 'v > 0', { size: 15, color: VEL, anchor: 'end' });
    snap(330, 100, 0, 'at the top');
    svg.text(330, 70, 'v = 0', { size: 16, color: VEL });
    snap(490, hY, -90, 'on the way down');
    svg.text(460, hY + 60, 'v < 0', { size: 15, color: VEL, anchor: 'end' });
    for (const [x, y] of [
      [170, hY],
      [330, 100],
      [490, hY],
    ]) {
      svg.text(x + 30, y + 40, 'a = −g', { size: 15, color: ACC, anchor: 'start' });
    }
    svg.text(300, 20, 'a = −g = −9.80 \\rm{m/s}^2 at every instant, including the top', {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 2.8 Q1 — tangents on the Figure 9 position graph
  concept_02_08_q01: () => {
    const svg = new Svg({
      width: 545,
      height: 410,
      title: 'Tangent lines on the position graph of Figure 9',
      desc: 'The position-versus-time curve of Figure 9 with dashed tangent lines at points a, d and e. The tangent at a is the steepest (greatest velocity), the tangent at d is horizontal (zero velocity), and the tangent at e slopes slightly downward (negative velocity).',
    });
    const g = sketchPlot(
      svg,
      { x: 70, y: 30, w: 435, h: 310 },
      { xRange: [0, 450], yRange: [0, 300] },
      { xTitle: 'Time \\it{t}', yTitle: 'Position \\it{x}' }
    );
    g.series(FIG9, {
      color: POS,
      smooth: true,
      horizontalTangents: [4],
      marker: 'circle',
      markerSize: 6,
    });
    const slope = splineSlope(FIG9, 0.5, { horizontalTangents: [4], n: SAMPLES });
    for (const k of [1, 4, 5]) tangent(g, FIG9[k][0], FIG9[k][1], slope[k * SAMPLES][1], 45);
    letters(g, svg, FIG9.slice(1), ['a', 'b', 'c', 'd', 'e'], { a: [-14, -10], d: [0, -20] });
    svg.text(g.X(56) + 36, g.Y(115) + 18, 'steepest', { size: 13, math: false, anchor: 'start' });
    svg.text(g.X(289), g.Y(248) + 22, 'slope = 0', { size: 13, math: false });
    svg.text(g.X(400), g.Y(238) + 22, 'slope < 0', { size: 13, math: false });
    return svg.render();
  },

  // 2.8 Q2 — velocity versus time from the Figure 10 position graph
  concept_02_08_q02: () =>
    derivativeSketch({
      title: 'Velocity versus time for the position graph of Figure 10',
      desc: 'Velocity (the slope of Figure 10) versus time, with points a through l. The velocity is negative at a and b, zero at c, largest at d (with i nearly as large), zero at e, negative at f, zero at g, positive at h, i, j and k, and zero again at l.',
      points: FIG10,
      tension: 0.35,
      flat: [2, 4, 6, 11],
      yTitle: 'Velocity \\it{v}',
      color: VEL,
      offsets: { a: [12, -14], c: [-8, -18], e: [8, -18], g: [-6, -18], l: [-6, -18] },
    }),

  // 2.8 Q3 — tangents on the Figure 11 velocity graph
  concept_02_08_q03: () => {
    const svg = new Svg({
      width: 560,
      height: 420,
      title: 'Tangent lines on the velocity graph of Figure 11',
      desc: 'The velocity curve of Figure 11 with dashed tangent lines at P and Q. The tangent at Q is steeper than the tangent at P, so the acceleration (the slope) is larger at Q: the acceleration increases with time.',
    });
    const g = new Plot(svg, { x: 105, y: 30, w: 410, h: 272, xRange: [0, 10], yRange: [0, 10] });
    g.axes({
      arrows: true,
      xTitle: 'Time \\it{t}',
      yTitle: 'Velocity \\it{v}',
      titleSize: 17,
      yTitleOffset: 72,
      xTitleOffset: 55,
    });
    const v = t => 1.2 + 0.11 * (t - 1) * (t - 1);
    const dv = t => 0.22 * (t - 1);
    g.fn(v, 0.6, 9.9, { color: POS, width: 3.5 });
    for (const [t, name, sub] of [
      [2.3, 'P', '1'],
      [8.8, 'Q', '2'],
    ]) {
      tangent(g, t, v(t), dv(t), 1.4);
      svg.marker(g.X(t), g.Y(v(t)), 'circle', { color: POS, size: 6 });
      svg.text(g.X(t) - 6, g.Y(v(t)) - 16, name, { size: 18, italic: false, anchor: 'end' });
      svg.text(g.X(t) + (sub === '1' ? 14 : -12), g.Y(v(t)) + 26, `slope = a_${sub}`, {
        size: 16,
        anchor: sub === '1' ? 'start' : 'end',
      });
    }
    svg.text(310, 405, 'a_2 > a_1: the acceleration increases with time', {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 2.8 Q4 — acceleration versus time from the Figure 12 velocity graph
  concept_02_08_q04: () =>
    derivativeSketch({
      title: 'Acceleration versus time for the velocity graph of Figure 12',
      desc: 'Acceleration (the slope of Figure 12) versus time, with points a through l. The acceleration is greatest at a and decreases through b and c to zero at d; it is negative between d and e, zero at e, small and positive at f and g, zero at h, and increasingly negative at i, j, k and l.',
      points: FIG12,
      tension: 0.5,
      flat: [3, 4, 7],
      yTitle: 'Acceleration \\it{a}',
      color: ACC,
      offsets: { a: [14, -8], d: [-6, -18], h: [0, -18], l: [-14, 4] },
    }),

  // 2.8 Q5 — elevator position and acceleration
  concept_02_08_q05: () => {
    const svg = new Svg({
      width: 600,
      height: 640,
      title: 'Position and acceleration of the elevator',
      desc: '(a) Position versus time: a parabola curving upward from 0 to 4.5 m during the first 3 s, a straight line rising to 49.5 m at 18 s, and a parabola curving downward that levels off at 57.0 m at 23 s. (b) Acceleration versus time: 1.0 m/s² from 0 to 3 s, zero from 3 s to 18 s, and −0.60 m/s² from 18 s to 23 s.',
    });
    const x = t => {
      if (t <= 3) return 0.5 * t * t;
      if (t <= 18) return 4.5 + 3 * (t - 3);
      const s = t - 18;
      return 49.5 + 3 * s - 0.3 * s * s;
    };
    const p = new Plot(svg, {
      x: 90,
      y: 40,
      w: 460,
      h: 210,
      xRange: [0, 25],
      yRange: [0, 60],
      xTicks: range(0, 25, 5),
      yTicks: range(0, 60, 10),
    });
    p.axes({
      title: '(a) Position vs. Time',
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Position \\it{x} (m)',
      yTitleOffset: 50,
      grid: true,
    });
    p.fn(x, 0, 23, { color: POS, width: 3.5 });
    p.line(23, 57, 25, 57, { color: POS, width: 3.5 });
    for (const [t, label, dx] of [
      [3, '4.5 \\rm{m}', 34],
      [18, '49.5 \\rm{m}', -34],
      [23, '57.0 \\rm{m}', -2],
    ]) {
      svg.marker(p.X(t), p.Y(x(t)), 'circle', { color: POS, size: 5 });
      svg.text(p.X(t) + dx, p.Y(x(t)) + (t === 3 ? 4 : -16), label, { size: 14, math: false });
    }
    const a = new Plot(svg, {
      x: 90,
      y: 380,
      w: 460,
      h: 190,
      xRange: [0, 25],
      yRange: [-1, 1.5],
      xTicks: range(0, 25, 5),
      yTicks: [-1, -0.5, 0, 0.5, 1, 1.5],
      yFormat: v => v.toFixed(1),
    });
    a.axes({
      title: '(b) Acceleration vs. Time',
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Acceleration \\it{a} (m/s^2)',
      yTitleOffset: 50,
      grid: true,
    });
    a.series(
      [
        [0, 1],
        [3, 1],
        [3, 0],
        [18, 0],
        [18, -0.6],
        [23, -0.6],
        [23, 0],
        [25, 0],
      ],
      { color: ACC, width: 3.5 }
    );
    svg.text(a.X(1.5), a.Y(1) - 14, '+1.0', { size: 14, math: false });
    svg.text(a.X(20.5), a.Y(-0.6) + 16, '−0.60', { size: 14, math: false });
    return svg.render();
  },

  // 2.8 Q6 — cylinder rolling up and back down an incline
  concept_02_08_q06: () => {
    const svg = new Svg({
      width: 560,
      height: 880,
      title: 'Position, velocity and acceleration of a cylinder rolling up and down an incline',
      desc: 'Three stacked graphs for a cylinder pushed up an incline with v0 = +2.0 m/s and a constant acceleration of −1.0 m/s², with +x up the slope. Position is a downward-opening parabola that peaks at 2.0 m at 2.0 s and returns to 0 at 4.0 s. Velocity is a straight line falling from +2.0 m/s through zero at 2.0 s to −2.0 m/s at 4.0 s. Acceleration is a horizontal line at −1.0 m/s².',
    });
    const box = top => ({ x: 95, y: top, w: 420, h: 190, xRange: [0, 4], xTicks: range(0, 4, 1) });
    const xs = new Plot(svg, {
      ...box(40),
      yRange: [0, 2.5],
      yTicks: range(0, 2.5, 0.5),
      yFormat: v => v.toFixed(1),
    });
    xs.axes({
      title: '(a) Position',
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Position \\it{x} (m)',
      yTitleOffset: 52,
      grid: true,
    });
    xs.fn(t => 2 * t - 0.5 * t * t, 0, 4, { color: POS, width: 3.5 });
    xs.text(2, 2.0 + 0.25, 'highest point, v = 0', { size: 13, math: false });
    const vs = new Plot(svg, {
      ...box(330),
      yRange: [-2.5, 2.5],
      yTicks: range(-2, 2, 1),
      yFormat: v => v.toFixed(1),
    });
    vs.axes({
      title: '(b) Velocity',
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Velocity \\it{v} (m/s)',
      yTitleOffset: 52,
      grid: true,
    });
    vs.fn(t => 2 - t, 0, 4, { color: VEL, width: 3.5 });
    vs.text(0.95, 1.6, 'going up', { size: 13, math: false });
    vs.text(3.1, -0.4, 'coming down', { size: 13, math: false });
    const as = new Plot(svg, {
      ...box(620),
      yRange: [-1.5, 0.5],
      yTicks: [-1.5, -1, -0.5, 0, 0.5],
      yFormat: v => v.toFixed(1),
    });
    as.axes({
      title: '(c) Acceleration',
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Accel. \\it{a} (m/s^2)',
      yTitleOffset: 52,
      grid: true,
    });
    as.line(0, -1, 4, -1, { color: ACC, width: 3.5 });
    as.text(2, -0.75, 'constant, down the slope', { size: 13, math: false });
    return svg.render();
  },

  // 3.2 Q4 — two paths, one displacement
  concept_03_02_q04: () => {
    const svg = new Svg({
      width: 520,
      height: 400,
      title: 'Two paths from the cabin to the lake with the same displacement',
      desc: 'From the cabin at the lower left, Path 1 (7.5 km) and Path 2 (8.2 km) wind along different routes to the same spot on the lake at the upper right. A single straight arrow S from the cabin to the lake, 5.0 km long at 40° north of east, is the displacement for both campers.',
    });
    const f = new Frame(svg, { ox: 90, oy: 330, scale: 66 });
    const lake = Frame.polar(5, 40);
    const [lx, ly] = f.p(...lake);
    svg.ellipse(lx + 40, ly - 22, 85, 45, { fill: '#cfe3f5', stroke: '#5d8fc0', width: 2 });
    svg.text(lx + 70, ly - 34, 'lake', { size: 15, math: false });
    const path = pts =>
      svg.path(smoothPath(pts.map(q => f.p(...q))), {
        color: COLORS.guide,
        width: 2.2,
        dash: '7 5',
      });
    path([
      [0, 0],
      [1.2, -0.3],
      [2.4, 0.4],
      [2.9, 1.5],
      [3.4, 2.0],
      [lake[0], lake[1]],
    ]);
    path([
      [0, 0],
      [-0.3, 1.2],
      [0.4, 2.3],
      [1.4, 2.6],
      [2.2, 3.5],
      [3.1, 3.5],
      [lake[0], lake[1]],
    ]);
    f.text([2.6, 0.25], 'Path 1, 7.5 km', { size: 14, math: false, anchor: 'start', dx: 14 });
    f.text([0.3, 2.9], 'Path 2, 8.2 km', { size: 14, math: false, anchor: 'end', dx: -6 });
    f.vec([0, 0], lake, { color: VEC, width: 4, head: 16 });
    f.labelSeg([0, 0], lake, '**S** = 5.0 \\rm{km}', {
      off: 30,
      along: 0.5,
      size: 17,
      anchor: 'end',
    });
    f.line([0, 0], [1.6, 0], { color: COLORS.guide, width: 1.2, dash: '4 4' });
    f.angle([0, 0], 0, 40, 46, '40°', { size: 15 });
    svg.rect(68, 318, 34, 24, { fill: '#c8a27a', stroke: COLORS.black });
    svg.polygon(
      [
        [64, 318],
        [85, 302],
        [106, 318],
      ],
      { fill: '#8b5a2b', stroke: COLORS.black, width: 1 }
    );
    svg.text(85, 362, 'cabin', { size: 15, math: false });
    svg.compass(450, 330, { r: 24, size: 13 });
    return svg.render();
  },

  // 3.2 Q6 — when do two steps return you to the start, and how far can they take you?
  concept_03_02_q06: () => {
    const svg = new Svg({
      width: 720,
      height: 250,
      title: 'Two steps A and B: zero, intermediate, and maximum resultant',
      desc: 'Three panels with steps A and B of 3.0 m each, drawn head to tail. Left: B points opposite to A, so the resultant R is zero and you are back at the start. Middle: B at an angle to A gives a resultant shorter than 6.0 m. Right: B in the same direction as A gives the largest resultant, R = A + B = 6.0 m.',
    });
    const panel = (x0, title) => {
      caption(svg, x0, title);
      return new Frame(svg, { ox: x0 + 40, oy: 160, scale: 28 });
    };
    let f = panel(0, 'Opposite: R = 0');
    f.vec([0, 0.5], [6, 0.5], { color: COLORS.red });
    f.vec([6, -0.5], [0, -0.5], { color: COLORS.blue });
    f.text([3, 0.5], '**A** (3.0 \\rm{m})', { dy: -18, size: 16 });
    f.text([3, -0.5], '**B** (3.0 \\rm{m})', { dy: 22, size: 16 });
    svg.circle(...f.p(0, 0), 5, { fill: COLORS.black });
    f.text([0, 0], 'start = end', { dy: 62, dx: 40, size: 13, math: false });
    divider(svg, 240, 250);
    f = panel(240, 'At an angle: R < A + B');
    const tip = f.vec([0, 0], [3.6, 0], { color: COLORS.red });
    const end = f.pvec(tip, 3.6, 70, { color: COLORS.blue });
    f.vec([0, 0], end, { color: VEC, width: 3.5 });
    f.text([1.8, 0], '**A**', { dy: 18, size: 16 });
    f.labelSeg(tip, end, '**B**', { off: -16, size: 16 });
    f.labelSeg([0, 0], end, '**R**', { off: 16, size: 16 });
    divider(svg, 480, 250);
    f = panel(480, 'Same direction: R = A + B');
    f.vec([0, 0.6], [3, 0.6], { color: COLORS.red });
    f.vec([3, 0.6], [6, 0.6], { color: COLORS.blue });
    f.vec([0, -0.6], [6, -0.6], { color: VEC, width: 3.5 });
    f.text([1.5, 0.6], '**A**', { dy: -18, size: 16 });
    f.text([4.5, 0.6], '**B**', { dy: -18, size: 16 });
    f.text([3, -0.6], '**R** (6.0 \\rm{m})', { dy: 22, size: 16 });
    return svg.render();
  },

  // 3.2 Q8 — vectors of different magnitudes adding to zero
  concept_03_02_q08: () => {
    const svg = new Svg({
      width: 600,
      height: 270,
      title: 'Unequal vectors: two cannot cancel, three can',
      desc: 'Left: steps of 4.0 m east and 2.0 m west leave a resultant of 2.0 m east, never zero. Right: three steps of 3.0 m, 4.0 m and 5.0 m placed head to tail form a closed right triangle, so their sum is zero and you return to the start.',
    });
    caption(svg, 0, 'Two unequal steps: R ≠ 0');
    let f = new Frame(svg, { ox: 40, oy: 150, scale: 50 });
    f.vec([0, 0.5], [4, 0.5], { color: COLORS.red });
    f.vec([4, -0.3], [2, -0.3], { color: COLORS.blue });
    f.vec([0, -1.1], [2, -1.1], { color: VEC, width: 3.5 });
    f.text([2, 0.5], '**A** = 4.0 \\rm{m}', { dy: -18, size: 16 });
    f.text([3, -0.3], '**B** = 2.0 \\rm{m}', { dy: 20, dx: 30, size: 16 });
    f.text([1, -1.1], '**R** = 2.0 \\rm{m}', { dy: 22, size: 16 });
    divider(svg, 290, 270);
    caption(svg, 290, 'Three steps: A + B + C = 0');
    f = new Frame(svg, { ox: 350, oy: 225, scale: 42 });
    const a = f.vec([0, 0], [4, 0], { color: COLORS.red });
    const b = f.vec(a, [4, 3], { color: COLORS.blue });
    f.vec(b, [0, 0], { color: COLORS.green });
    f.rightAngle([4, 0], 180, 90, 12);
    f.text([2, 0], '**A** = 4.0 \\rm{m}', { dy: 18, size: 16 });
    f.text([4, 1.5], '**B** = 3.0 \\rm{m}', { dx: 14, size: 16, anchor: 'start' });
    f.labelSeg(b, [0, 0], '**C** = 5.0 \\rm{m}', { off: 26, size: 16 });
    return svg.render();
  },

  // 3.3 Q1 — largest and smallest resultant of two vectors
  concept_03_03_q01: () => {
    const svg = new Svg({
      width: 720,
      height: 250,
      title: 'Resultant of A = 4.0 m and B = 3.0 m at three relative directions',
      desc: 'Left: A and B parallel give the largest resultant, R = A + B = 7.0 m. Middle: A and B perpendicular give R = 5.0 m. Right: A and B antiparallel give the smallest resultant, R = A − B = 1.0 m, in the direction of A.',
    });
    caption(svg, 0, 'Parallel: R = A + B');
    let f = new Frame(svg, { ox: 25, oy: 150, scale: 28 });
    const t = f.vec([0, 0.6], [4, 0.6], { color: COLORS.red });
    f.vec(t, [7, 0.6], { color: COLORS.blue });
    f.vec([0, -0.6], [7, -0.6], { color: VEC, width: 3.5 });
    f.text([2, 0.6], '**A**', { dy: -18, size: 16 });
    f.text([5.5, 0.6], '**B**', { dy: -18, size: 16 });
    f.text([3.5, -0.6], 'R = 7.0 \\rm{m}', { dy: 22, size: 16 });
    divider(svg, 240, 250);
    caption(svg, 240, 'Perpendicular');
    f = new Frame(svg, { ox: 300, oy: 200, scale: 28 });
    const t2 = f.vec([0, 0], [4, 0], { color: COLORS.red });
    f.vec(t2, [4, 3], { color: COLORS.blue });
    f.vec([0, 0], [4, 3], { color: VEC, width: 3.5 });
    f.rightAngle([4, 0], 180, 90, 10);
    f.text([2, 0], '**A**', { dy: 18, size: 16 });
    f.text([4, 1.5], '**B**', { dx: 14, size: 16 });
    f.labelSeg([0, 0], [4, 3], 'R = 5.0 \\rm{m}', { off: 22, size: 16, along: 0.4, anchor: 'end' });
    divider(svg, 480, 250);
    caption(svg, 480, 'Antiparallel: R = A − B');
    f = new Frame(svg, { ox: 530, oy: 150, scale: 28 });
    f.vec([0, 0.6], [4, 0.6], { color: COLORS.red });
    f.vec([4, -0.2], [1, -0.2], { color: COLORS.blue });
    f.vec([0, -1.1], [1, -1.1], { color: VEC, width: 3.5 });
    f.text([2, 0.6], '**A**', { dy: -18, size: 16 });
    f.text([2.5, -0.2], '**B**', { dy: 18, size: 16 });
    f.text([0.5, -1.1], 'R = 1.0 \\rm{m}', { dy: 22, dx: 30, size: 16 });
    return svg.render();
  },

  // 3.3 Q2 — a nonzero vector with a zero component
  concept_03_03_q02: () => {
    const svg = new Svg({
      width: 340,
      height: 290,
      title: 'A displacement due north has a zero x-component',
      desc: 'On x–y axes with x east and y north, a displacement A of 5.0 km points straight along +y. Its y-component is 5.0 km and its x-component is zero.',
    });
    const f = new Frame(svg, { ox: 120, oy: 240, scale: 36 });
    f.axes({
      xMin: -1.5,
      xMax: 5,
      yMin: -0.8,
      yMax: 6,
      xLabel: 'x (east)',
      yLabel: 'y (north)',
      size: 16,
    });
    f.vec([0, 0], [0, 5], { color: VEC, width: 4, head: 16 });
    f.text([0, 3], '**A** = 5.0 \\rm{km} north', { dx: 14, size: 16, anchor: 'start' });
    f.text([0, 1.7], 'A_x = 0', { dx: 14, size: 16, anchor: 'start' });
    f.text([0, 1.0], 'A_y = 5.0 \\rm{km}', { dx: 14, size: 16, anchor: 'start' });
    return svg.render();
  },

  // 3.3 Q3 — components are legs of a right triangle
  concept_03_03_q03: () => {
    const svg = new Svg({
      width: 400,
      height: 270,
      title: 'A vector and its components form a right triangle',
      desc: 'A vector A of magnitude 5.0 m at 37° above the +x axis is the hypotenuse of a right triangle whose legs are its components, Ax = A cos θ = 4.0 m and Ay = A sin θ = 3.0 m. Each leg is shorter than the hypotenuse.',
    });
    const f = new Frame(svg, { ox: 60, oy: 210, scale: 60 });
    f.vec([0, 0], [4, 3], { color: VEC, width: 4, head: 16 });
    f.vec([0, 0], [4, 0], { color: COLORS.red, width: 2.5, dash: '7 4' });
    f.vec([4, 0], [4, 3], { color: COLORS.blue, width: 2.5, dash: '7 4' });
    f.rightAngle([4, 0], 180, 90, 12);
    f.angle([0, 0], 0, 36.87, 48, 'θ = 37°', { labelR: 80, size: 15 });
    f.labelSeg([0, 0], [4, 3], '**A** = 5.0 \\rm{m}', { off: 22, size: 17 });
    f.text([2, 0], 'A_x = A cos θ = 4.0 \\rm{m}', { dy: 22, size: 15 });
    f.text([4, 1.5], 'A_y = A sin θ', { dx: 12, size: 15, anchor: 'start' });
    f.text([4, 1.5], '= 3.0 \\rm{m}', { dx: 12, dy: 20, size: 15, anchor: 'start' });
    return svg.render();
  },

  // 3.4 Q1–Q2 — velocity and acceleration along a projectile's path
  concept_03_04_q01: () => {
    const svg = new Svg({
      width: 640,
      height: 400,
      title: 'Velocity and acceleration along a projectile’s path',
      desc: 'A projectile launched at 20 m/s and 53° above level ground. At five instants the velocity is drawn with its components: the horizontal component is always 12 m/s, while the vertical component goes from +16 m/s at launch to 0 at the top and −16 m/s at landing. The speed is smallest at the top (12 m/s) and largest at launch and landing (20 m/s). The acceleration is g = 9.80 m/s² straight down at every point.',
    });
    const vx = 12;
    const vy0 = 16;
    const g = 9.8;
    const T = (2 * vy0) / g;
    const S = 13; // px per m for positions
    const V = 4.2; // px per m/s for velocity arrows
    const f = new Frame(svg, { ox: 55, oy: 330, scale: S });
    ground(svg, 30, 620, 330);
    const pos = t => [vx * t, vy0 * t - 0.5 * g * t * t];
    const pts = [];
    for (let k = 0; k <= 80; k += 1) pts.push(f.p(...pos((T * k) / 80)));
    svg.polyline(pts, { color: COLORS.guide, width: 2, dash: '6 4' });
    const times = [0, T / 4, T / 2, (3 * T) / 4, T];
    times.forEach((t, k) => {
      const [x, y] = f.p(...pos(t));
      const vy = vy0 - g * t;
      svg.arrow(x, y, x + vx * V, y, { color: VEL, width: 2, dash: '5 3', head: 10 });
      if (Math.abs(vy) > 0.1)
        svg.arrow(x, y, x, y - vy * V, { color: VEL, width: 2, dash: '5 3', head: 10 });
      svg.arrow(x, y, x + vx * V, y - vy * V, { color: VEL, width: 3.5, head: 13 });
      svg.arrow(x, y, x, y + 9.8 * V * 0.55, { color: ACC, width: 3, head: 11 });
      ball(svg, x, y, { r: 6 });
      const speed = Math.hypot(vx, vy);
      if (k === 2) return;
      const [dx, dy] = [[20, 44], [-16, 30], null, [24, -20], [-20, 40]][k];
      svg.text(x + dx, y + dy, `v = ${speed.toFixed(0)} m/s`, {
        size: 13,
        math: false,
        anchor: dx > 0 ? 'start' : 'end',
      });
    });
    const [tx, ty] = f.p(...pos(T / 2));
    svg.text(tx, ty - 28, 'top: v_y = 0, so v = v_x = 12 m/s (minimum)', { size: 13, math: false });
    svg.arrow(20, 30, 50, 30, { color: VEL, width: 3.5, head: 12 });
    svg.text(58, 30, 'velocity **v**', { size: 14, anchor: 'start' });
    svg.arrow(20, 54, 50, 54, { color: VEL, width: 2, dash: '5 3', head: 10 });
    svg.text(58, 54, 'components v_x, v_y', { size: 14, anchor: 'start' });
    svg.arrow(20, 78, 50, 78, { color: ACC, width: 3, head: 11 });
    svg.text(58, 78, '**a** = **g** (9.80 \\rm{m/s}^2 down)', { size: 14, anchor: 'start' });
    return svg.render();
  },

  // 3.4 Q3 — complementary launch angles give the same range
  concept_03_04_q03: () => {
    const svg = new Svg({
      width: 620,
      height: 360,
      title: 'Two launch angles with the same range',
      desc: 'Two trajectories launched at 20 m/s land 35.3 m away. The 30° path is low (maximum height 5.1 m) and takes 2.0 s; the 60° path is high (maximum height 15.3 m) and takes 3.5 s.',
    });
    const v0 = 20;
    const g = 9.8;
    const S = 13.5;
    const f = new Frame(svg, { ox: 60, oy: 300, scale: S });
    ground(svg, 30, 600, 300);
    const draw = (deg, color, label) => {
      const vx = v0 * Math.cos((deg * Math.PI) / 180);
      const vy = v0 * Math.sin((deg * Math.PI) / 180);
      const T = (2 * vy) / g;
      const pts = [];
      for (let k = 0; k <= 80; k += 1) {
        const t = (T * k) / 80;
        pts.push(f.p(vx * t, vy * t - 0.5 * g * t * t));
      }
      svg.polyline(pts, { color, width: 3 });
      const H = (vy * vy) / (2 * g);
      f.text([(vx * T) / 2, H], label, { dy: -16, size: 14, math: false, color });
      return [vx * T, T, H];
    };
    const [R] = draw(30, COLORS.blue, '30°: height 5.1 \\rm{m}, time 2.0 \\rm{s}');
    draw(60, COLORS.red, '60°: height 15.3 \\rm{m}, time 3.5 \\rm{s}');
    f.angle([0, 0], 0, 30, 40, '30°', { size: 14, color: COLORS.blue });
    f.angle([0, 0], 30, 60, 64, '60°', { size: 14, color: COLORS.red, labelR: 78 });
    const [x1, y1] = f.p(0, -1.6);
    const [x2] = f.p(R, 0);
    svg.arrow(x1, y1, x2, y1, { color: COLORS.axis, width: 1.5, head: 9, start: true });
    svg.text((x1 + x2) / 2, y1 + 16, 'same range R = 35.3 m (v_0 = 20 m/s)', {
      size: 14,
      math: false,
    });
    return svg.render();
  },

  // 3.4 Q4 — two coins leave the table together
  concept_03_04_q04: () => {
    const svg = new Svg({
      width: 520,
      height: 430,
      title: 'Two coins leaving a table at the same time',
      desc: 'Snapshots every 0.10 s of two coins leaving a 1.0 m high table edge at the same instant. The nudged coin falls straight down; the flicked coin, launched horizontally at 1.5 m/s, follows a parabola. At every instant both coins are at the same height (dashed lines), and both land after 0.45 s, the flicked one 0.68 m farther out.',
    });
    const S = 300; // px per m
    const ox = 110;
    const oy = 70;
    svg.rect(0, oy, ox, 14, { fill: '#c8a27a', stroke: COLORS.black });
    svg.rect(ox - 20, oy + 14, 12, S - 14, { fill: '#c8a27a', stroke: COLORS.black });
    ground(svg, 0, 510, oy + S);
    const g = 9.8;
    const T = Math.sqrt(2 / g);
    const times = [0, 0.1, 0.2, 0.3, 0.4, T];
    for (const t of times) {
      const y = oy - 6 + 0.5 * g * t * t * S;
      const x2 = ox + 8 + 1.5 * t * S;
      svg.line(ox + 8, y, x2, y, { color: COLORS.guide, width: 1, dash: '4 4' });
      svg.ellipse(ox + 8, y, 7, 3.5, { fill: '#e0b040', stroke: COLORS.black, width: 1 });
      svg.ellipse(x2, y, 7, 3.5, { fill: '#e0b040', stroke: COLORS.black, width: 1 });
      if (t > 0) svg.text(505, y, `${t.toFixed(2)} s`, { size: 12, math: false, anchor: 'end' });
    }
    svg.text(ox + 8, oy - 30, 'nudged', { size: 14, math: false });
    svg.arrow(ox + 30, oy - 12, ox + 80, oy - 12, { color: VEL, width: 2.5, head: 10 });
    svg.text(ox + 88, oy - 12, '1.5 m/s (flicked)', { size: 14, math: false, anchor: 'start' });
    svg.text(ox + 8 + 1.5 * T * S, oy + S + 22, 'both land at t = 0.45 s', {
      size: 14,
      math: false,
    });
    svg.arrow(30, oy + 14, 30, oy + S, { color: COLORS.axis, width: 1.2, head: 8, start: true });
    svg.text(26, oy + 150, '1.0 m', { size: 13, math: false, anchor: 'end', rotate: -90 });
    return svg.render();
  },

  // 3.5 Q3 — ball thrown backward from a pickup truck
  concept_03_05_q03: () => {
    const svg = new Svg({
      width: 700,
      height: 300,
      title: 'A ball thrown backward from a moving truck',
      desc: 'Left, in the truck’s frame: the ball leaves the thrower at 10 m/s backward and curves down and away behind the truck. Right, in the ground frame: the truck moves forward at 10 m/s and the ball, whose horizontal velocity relative to the ground is 10 m/s − 10 m/s = 0, falls straight down.',
    });
    const truck = x0 => {
      svg.rect(x0, 170, 150, 40, { fill: '#cfe3ea', stroke: COLORS.black, width: 2 });
      svg.rect(x0 + 150, 140, 50, 70, { fill: '#cfe3ea', stroke: COLORS.black, width: 2 });
      svg.circle(x0 + 30, 214, 13, { fill: COLORS.black });
      svg.circle(x0 + 165, 214, 13, { fill: COLORS.black });
      runner(svg, x0 + 40, 170);
    };
    caption(svg, 0, 'Seen from the truck');
    ground(svg, 10, 340, 227);
    truck(150);
    const startX = 190;
    const startY = 108;
    const path = [];
    for (let k = 0; k <= 40; k += 1) {
      const t = (0.55 * k) / 40;
      path.push([startX - 10 * t * 26, startY + 0.5 * 9.8 * t * t * 26]);
    }
    svg.polyline(path, { color: COLORS.red, width: 2.5, dash: '6 4' });
    ball(svg, startX, startY, { r: 6 });
    svg.arrow(startX - 12, startY - 22, startX - 72, startY - 22, {
      color: VEL,
      width: 3,
      head: 12,
    });
    svg.text(startX - 42, startY - 42, '10 m/s back', { size: 13, math: false });
    divider(svg, 350, 300);
    caption(svg, 350, 'Seen from the roadside');
    ground(svg, 360, 690, 227);
    truck(470);
    const bx = 510;
    svg.line(bx, startY, bx, 220, { color: COLORS.red, width: 2.5, dash: '6 4' });
    ball(svg, bx, startY, { r: 6 });
    svg.arrow(560, 70, 640, 70, { color: VEL, width: 3, head: 12 });
    svg.text(600, 52, 'truck: 10 m/s', { size: 13, math: false });
    svg.text(bx - 12, 82, 'ball: v_x = 0', { size: 13, math: false, anchor: 'end' });
    return svg.render();
  },

  // 3.5 Q4 — a jogger's hat falls off
  concept_03_05_q04: () => {
    const svg = new Svg({
      width: 700,
      height: 300,
      title: 'Path of a jogger’s falling hat in two frames',
      desc: 'Left, in the jogger’s frame: the hat falls straight down from the back of the jogger’s head and lands just behind the heels. Right, as seen by a stationary observer: the jogger runs forward and the hat follows a parabola forward, keeping pace with the jogger, landing behind the jogger’s heels at the jogger’s new position.',
    });
    caption(svg, 0, 'Jogger’s frame');
    ground(svg, 10, 340, 250);
    runner(svg, 170, 250);
    const hatX = 166;
    const hatY = 152;
    svg.line(hatX, hatY, hatX, 244, { color: COLORS.red, width: 2.5, dash: '6 4' });
    svg.rect(hatX - 10, hatY - 8, 20, 8, { fill: COLORS.red });
    svg.text(hatX - 16, 200, 'straight down', { size: 13, math: false, anchor: 'end' });
    divider(svg, 350, 300);
    caption(svg, 350, 'Stationary observer');
    ground(svg, 360, 690, 250);
    runner(svg, 410, 250);
    runner(svg, 600, 250);
    svg.arrow(450, 80, 540, 80, { color: VEL, width: 3, head: 12 });
    svg.text(495, 62, 'jogger and hat', { size: 13, math: false });
    const path = [];
    for (let k = 0; k <= 40; k += 1) {
      const s = k / 40;
      path.push([406 + 190 * s, hatY + 92 * s * s]);
    }
    svg.polyline(path, { color: COLORS.red, width: 2.5, dash: '6 4' });
    svg.rect(406 - 10, hatY - 8, 20, 8, { fill: COLORS.red });
    svg.text(520, 220, 'parabola', { size: 13, math: false });
    return svg.render();
  },

  // 3.5 Q5 — clod of dirt falling from a truck
  concept_03_05_q05: () => {
    const svg = new Svg({
      width: 440,
      height: 300,
      title: 'Velocity of the clod relative to the truck and to the ground',
      desc: 'Vector diagram: the clod’s velocity relative to the truck, v_CT, points straight down. Adding the truck’s velocity relative to the ground, v_TG, which points horizontally forward, gives the clod’s velocity relative to the ground, v_CG, which points forward and down.',
    });
    const f = new Frame(svg, { ox: 110, oy: 50, scale: 1 });
    const vtg = f.vec([0, 0], [200, 0], { color: COLORS.blue });
    f.vec(vtg, [200, -190], { color: COLORS.red });
    f.vec([0, 0], [200, -190], { color: VEC, width: 4 });
    f.text([100, 0], '**v**_{TG} (truck rel. ground)', { dy: -18, size: 16 });
    f.text([200, -95], '**v**_{CT}', { dx: 14, size: 17, anchor: 'start' });
    f.text([200, -95], '(clod rel. truck)', {
      dx: 14,
      dy: 22,
      size: 13,
      math: false,
      anchor: 'start',
    });
    f.labelSeg([0, 0], [200, -190], '**v**_{CG}', { off: 22, size: 17, along: 0.55 });
    f.text([75, -122], '(clod rel. ground)', { size: 13, math: false, anchor: 'end' });
    f.rightAngle([200, 0], 180, 270, 12);
    return svg.render();
  },

  // 4.3 Q10 — the basketball with gravity included
  concept_04_03_q10: () => {
    const svg = new Svg({
      width: 420,
      height: 300,
      title: 'Net force on the basketball with gravity included',
      desc: 'The player’s horizontal push F and the ball’s weight w add head to tail. The net external force F_net points to the right and below the horizontal.',
    });
    const f = new Frame(svg, { ox: 90, oy: 90, scale: 1 });
    f.line([-40, 0], [260, 0], { color: COLORS.guide, width: 1.2, dash: '5 4' });
    const tip = f.vec([0, 0], [220, 0], { color: COLORS.red });
    f.vec(tip, [220, -110], { color: COLORS.red });
    f.vec([0, 0], [220, -110], { color: VEC, width: 4 });
    svg.circle(90, 90, 14, { fill: '#e07020', stroke: COLORS.black, width: 1.2 });
    f.text([110, 0], '**F** (push)', { dy: -18, size: 17 });
    f.text([220, -55], '**w** = m**g**', { dx: 14, size: 17, anchor: 'start' });
    f.labelSeg([0, 0], [220, -110], '**F**_{net}', { off: 22, size: 17, along: 0.55 });
    f.angle([0, 0], -26.57, 0, 60);
    f.text([110, -55], '(below horizontal)', { dx: -40, dy: 44, size: 13, math: false });
    return svg.render();
  },

  // 5.1 Q4 — stick–slip friction
  concept_05_01_q04: () => {
    const svg = new Svg({
      width: 600,
      height: 360,
      title: 'Friction force during stick–slip motion',
      desc: 'Friction force on the chalk versus time. During each stick phase the static friction grows until it reaches the maximum μs N; the chalk then breaks loose and the friction drops to the smaller kinetic value μk N while it slips. The chalk sticks again and the cycle repeats rapidly, producing a sawtooth pattern whose vibration is heard as a screech.',
    });
    const g = new Plot(svg, { x: 80, y: 30, w: 470, h: 250, xRange: [0, 10], yRange: [0, 1.25] });
    g.axes({
      arrows: true,
      xTitle: 'Time \\it{t}',
      yTitle: 'Friction force \\it{f}',
      titleSize: 16,
      yTitleOffset: 30,
      xTitleOffset: 34,
    });
    const fs = 1.0;
    const fk = 0.6;
    g.line(0, fs, 10, fs, { color: COLORS.guide, width: 1.2, dash: '6 4' });
    g.line(0, fk, 10, fk, { color: COLORS.guide, width: 1.2, dash: '6 4' });
    svg.text(g.X(10) + 6, g.Y(fs), 'μ_s N', { size: 16, anchor: 'start' });
    svg.text(g.X(10) + 6, g.Y(fk), 'μ_k N', { size: 16, anchor: 'start' });
    const pts = [[0, 0]];
    let t = 0;
    for (let k = 0; k < 4; k += 1) {
      const climb = k === 0 ? 1.6 : 1.0;
      pts.push([t + climb, fs]);
      pts.push([t + climb + 0.05, fk]);
      pts.push([t + climb + 0.9, fk]);
      t += climb + 0.9;
    }
    // Each stick phase climbs back from the kinetic level to the static maximum.
    g.series(pts, { color: COLORS.red, width: 3 });
    g.text(2.85, 0.9, 'stick', { size: 14, math: false, anchor: 'end' });
    g.text(3.55, 0.5, 'slip', { size: 14, math: false });
    return svg.render();
  },

  // 5.1 Q3 — braking force as a car comes to a stop
  concept_05_01_q03: () => {
    const svg = new Svg({
      width: 640,
      height: 360,
      title: 'Braking force as a car comes to a stop',
      desc: 'Braking force on the car versus time for two drivers. Firm pedal: while the wheels turn, the brake pads slide on the discs and the force stays at the kinetic value μk N; just as the car stops, the pads stop sliding and grip with static friction, so the force jumps up toward μs N and then drops abruptly to zero, which is felt as a jerk. Eased pedal: the driver lowers the pad force N near the end, so the braking force tapers to a small value before the car stops and the final change is small.',
    });
    const g = new Plot(svg, { x: 80, y: 40, w: 480, h: 230, xRange: [0, 10], yRange: [0, 1.3] });
    g.axes({
      arrows: true,
      xTitle: 'Time \\it{t}',
      yTitle: 'Braking force \\it{f}',
      titleSize: 16,
      yTitleOffset: 30,
      xTitleOffset: 34,
    });
    const fk = 0.75;
    const fs = 1.1;
    g.line(0, fs, 10, fs, { color: COLORS.guide, width: 1.2, dash: '6 4' });
    g.line(0, fk, 10, fk, { color: COLORS.guide, width: 1.2, dash: '6 4' });
    svg.text(g.X(10) + 6, g.Y(fs), 'μ_s N', { size: 16, anchor: 'start' });
    svg.text(g.X(10) + 6, g.Y(fk), 'μ_k N', { size: 16, anchor: 'start' });
    // Firm pedal: kinetic friction, a grab at the stop, then nothing.
    g.series(
      [
        [0, fk],
        [7.6, fk],
        [7.85, fs],
        [7.9, 0],
        [9.6, 0],
      ],
      { color: COLORS.red, width: 3 }
    );
    // Eased pedal: the force is tapered before the car stops.
    const eased = t => {
      if (t < 5.8) return fk - 0.012;
      if (t < 7.9) return 0.1 + (fk - 0.112) * (0.5 + 0.5 * Math.cos((Math.PI * (t - 5.8)) / 2.1));
      return t < 7.95 ? 0.1 * (1 - (t - 7.9) / 0.05) : 0;
    };
    g.fn(eased, 0, 9.6, { n: 240, color: COLORS.blue, width: 3, dash: '8 5' });
    g.text(7.75, 1.2, 'grab: jerk', { size: 14, math: false, color: COLORS.red, anchor: 'end' });
    g.text(2.5, fk + 0.09, 'pads slide: kinetic friction', { size: 14, math: false });
    g.text(6.4, 0.3, 'pedal eased', { size: 14, math: false, color: COLORS.blue, anchor: 'end' });
    svg.text(g.X(7.88), g.Y(0) + 16, 'car stops', { size: 13, math: false });
    svg.line(80, 330, 110, 330, { color: COLORS.red, width: 3 });
    svg.text(118, 330, 'firm pedal', { size: 14, math: false, anchor: 'start' });
    svg.line(250, 330, 280, 330, { color: COLORS.blue, width: 3, dash: '8 5' });
    svg.text(288, 330, 'pedal eased near the stop', { size: 14, math: false, anchor: 'start' });
    return svg.render();
  },

  // 5.2 Q2 — drag proportional to v and to v²
  concept_05_02_q02: () => {
    const svg = new Svg({
      width: 600,
      height: 380,
      title: 'Drag force proportional to speed and to speed squared',
      desc: 'Drag force versus speed. The straight line F = bv (Stokes drag) dominates at low speeds, for small objects, and in viscous fluids, where the flow is smooth (laminar). The parabola F = ½CρAv² grows faster and dominates at high speeds and for large objects, where the flow is turbulent. The two curves cross at one speed; below it the linear law is larger, above it the quadratic law is larger.',
    });
    const g = new Plot(svg, { x: 80, y: 40, w: 440, h: 260, xRange: [0, 4], yRange: [0, 4] });
    g.axes({
      arrows: true,
      xTitle: 'Speed \\it{v}',
      yTitle: 'Drag force \\it{F}_\\rm{D}',
      titleSize: 16,
      yTitleOffset: 30,
      xTitleOffset: 34,
    });
    g.fn(v => v, 0, 4, { color: COLORS.blue, width: 3 });
    g.fn(v => (v * v) / 2, 0, 2.83, { color: COLORS.red, width: 3 });
    g.line(2, 0, 2, 2, { color: COLORS.guide, width: 1.2, dash: '5 4' });
    g.text(3.35, 2.95, 'F = bv', { size: 17, anchor: 'start' });
    g.text(2.6, 3.75, 'F = ½\\it{C}ρ\\it{A}v^2', { size: 17, anchor: 'end' });
    g.text(1, 3.0, 'linear law larger:', { size: 13, math: false });
    g.text(1, 2.75, 'slow, small, viscous', { size: 13, math: false });
    g.text(1, 2.5, '(laminar flow)', { size: 13, math: false });
    g.text(3.3, 1.2, 'quadratic law larger:', { size: 13, math: false });
    g.text(3.3, 0.95, 'fast, large objects', { size: 13, math: false });
    g.text(3.3, 0.7, '(turbulent flow)', { size: 13, math: false });
    return svg.render();
  },

  // 6.3 Q3 — the passenger keeps going straight while the car turns
  concept_06_03_q03: () => {
    const svg = new Svg({
      width: 560,
      height: 400,
      title: 'Why you seem to be thrown outward in a turning car',
      desc: 'Top view of a car turning left along a circular arc. The dashed straight line shows the path the passenger would follow if no force acted on her, tangent to the curve. The car turns away from that line, so the door moves inward into her and pushes her toward the center of the curve with the centripetal force. Relative to the car she seems to slide outward, but no outward force acts on her.',
    });
    const cx = 120;
    const cy = 360;
    const R = 300;
    svg.path(
      `M ${cx + R} ${cy} A ${R} ${R} 0 0 0 ${fmt(cx + R * Math.cos(rad(60)))} ${fmt(cy - R * Math.sin(rad(60)))}`,
      { color: COLORS.black, width: 2.5 }
    );
    svg.circle(cx, cy, 5, { fill: COLORS.black });
    svg.text(cx - 8, cy - 16, 'center of curve', { size: 13, math: false, anchor: 'start' });
    const a = 25;
    const P = [cx + R * Math.cos(rad(a)), cy - R * Math.sin(rad(a))];
    // Straight-line (inertial) path, tangent to the curve at P.
    const t = [-Math.sin(rad(a)), -Math.cos(rad(a))];
    svg.line(P[0], P[1], P[0] + t[0] * 240, P[1] + t[1] * 240, {
      color: COLORS.guide,
      width: 2,
      dash: '8 5',
    });
    svg.text(P[0] + t[0] * 150 + 14, P[1] + t[1] * 150 - 8, 'path with no force', {
      size: 13,
      math: false,
      anchor: 'start',
    });
    // Car outline at P, aligned with the velocity.
    const ang = (Math.atan2(t[1], t[0]) * 180) / Math.PI;
    svg.add(
      `<g transform="translate(${fmt(P[0])} ${fmt(P[1])}) rotate(${fmt(ang)})"><rect x="-34" y="-17" width="68" height="34" rx="8" fill="#cfe3ea" stroke="#222222" stroke-width="1.5"/><circle cx="2" cy="-6" r="6" fill="#e0a030" stroke="#222222" stroke-width="1"/></g>`
    );
    svg.arrow(P[0] + t[0] * 40, P[1] + t[1] * 40, P[0] + t[0] * 95, P[1] + t[1] * 95, {
      color: VEL,
      width: 3,
    });
    svg.text(P[0] + t[0] * 95 - 18, P[1] + t[1] * 95 + 6, '**v**', { size: 18, anchor: 'end' });
    // Force of the door on the passenger: toward the center.
    const inward = [cx - P[0], cy - P[1]];
    const L = Math.hypot(...inward);
    const u = [inward[0] / L, inward[1] / L];
    svg.arrow(P[0] - t[0] * 2 + u[0] * 18, P[1] + u[1] * 18, P[0] + u[0] * 95, P[1] + u[1] * 95, {
      color: COLORS.red,
      width: 3.5,
    });
    svg.text(P[0] + u[0] * 100 - 4, P[1] + u[1] * 100 + 20, '**F**_c \\rm{(door on passenger)}', {
      size: 15,
      anchor: 'end',
    });
    svg.text(30, 30, 'top view; the car turns left', { size: 14, math: false, anchor: 'start' });
    return svg.render();
  },

  // 6.3 Q8 — the lunch box on the merry-go-round
  concept_06_03_q08: () => {
    const svg = new Svg({
      width: 560,
      height: 470,
      title: 'Path of the lunch box released on a merry-go-round',
      desc: 'Top view of a merry-go-round turning clockwise. The lunch box is released at point P, halfway out, moving with the platform’s velocity at that point, which is tangent to its circle. In Earth’s frame it slides in a straight line along that tangent, path B. Meanwhile the platform turns clockwise underneath it, so the trail it leaves in the dust starts out radially outward and then curves counterclockwise, to the left of its direction of travel, until it reaches the edge.',
    });
    const cx = 230;
    const cy = 215;
    const S = 85; // px per unit; edge at 2, P at 1
    const f = new Frame(svg, { ox: cx, oy: cy, scale: S });
    svg.circle(cx, cy, 2 * S, { fill: '#f6e6dc', stroke: COLORS.black, width: 2 });
    svg.circle(cx, cy, S, { fill: 'none', stroke: COLORS.guide, width: 1 });
    svg.circle(cx, cy, 4, { fill: COLORS.black });
    // Clockwise rotation arrow near the top edge.
    svg.arc(cx, cy, 2 * S + 18, 70, 130, { color: COLORS.blue, width: 2.5 });
    const [ax, ay] = [cx + (2 * S + 18) * Math.cos(rad(70)), cy - (2 * S + 18) * Math.sin(rad(70))];
    svg.arrow(ax - 8, ay - 3.5, ax, ay, { color: COLORS.blue, width: 2.5, head: 12 });
    svg.text(cx - 20, cy - 2 * S - 32, 'ω (clockwise)', { size: 16, color: COLORS.blue });
    // Earth frame: straight line along the tangent (clockwise at 3 o'clock is −y).
    f.vec([1, 0], [1, -2.1], { color: COLORS.red, width: 3 });
    f.text([1, -2.1], 'B: path in Earth’s frame', {
      dx: 10,
      dy: 8,
      size: 14,
      math: false,
      anchor: 'start',
      color: COLORS.red,
    });
    // Trail on the platform: rotate the straight path back by the platform's turn.
    const pts = [];
    for (let k = 0; k <= 80; k += 1) {
      const tau = (Math.sqrt(3) * k) / 80;
      pts.push(f.p(Math.cos(tau) + tau * Math.sin(tau), Math.sin(tau) - tau * Math.cos(tau)));
    }
    svg.polyline(pts, { color: COLORS.green, width: 3, dash: '7 4' });
    const end = pts[pts.length - 1];
    svg.arrow(pts[pts.length - 6][0], pts[pts.length - 6][1], end[0], end[1], {
      color: COLORS.green,
      width: 3,
      head: 12,
    });
    svg.text(end[0] - 8, end[1] - 16, 'trail left in the dust', {
      size: 14,
      math: false,
      color: COLORS.green,
      anchor: 'end',
    });
    svg.circle(...f.p(1, 0), 6, { fill: COLORS.black });
    f.text([1, 0], 'P', { dx: -14, dy: -12, size: 18 });
    svg.text(280, 455, 'top view', { size: 14, math: false });
    return svg.render();
  },

  // 6.3 Q10 — what stretches the string
  concept_06_03_q10: () => {
    const svg = new Svg({
      width: 600,
      height: 300,
      title: 'Forces on the mass and on the string',
      desc: 'Top view of a mass circling a nail on a frictionless table. Separate force diagrams: the string pulls the mass toward the nail with tension T (the centripetal force). By Newton’s third law the mass pulls the string outward with an equal force T. The nail pulls the other end of the string inward with T. The two equal and opposite pulls at its ends are what stretch the string.',
    });
    const y = 140;
    // Nail, string, and mass, drawn apart to show the forces on each.
    svg.circle(70, y, 9, { fill: '#888888', stroke: COLORS.black });
    svg.text(70, y + 32, 'nail', { size: 14, math: false });
    svg.line(170, y, 400, y, { color: COLORS.black, width: 3 });
    svg.text(285, y + 20, 'string', { size: 14, math: false });
    svg.circle(520, y, 20, { fill: '#e0a030', stroke: COLORS.black });
    svg.text(545, y + 36, 'mass', { size: 14, math: false, anchor: 'start' });
    // On the string: nail pulls in, mass pulls out.
    svg.arrow(170, y, 120, y, { color: COLORS.red, width: 3.5 });
    svg.text(140, y - 22, 'T \\rm{(nail on string)}', { size: 14, anchor: 'middle' });
    svg.arrow(400, y, 450, y, { color: COLORS.red, width: 3.5 });
    svg.text(415, y - 22, 'T \\rm{(mass on string)}', { size: 14, anchor: 'middle' });
    // On the mass: string pulls toward the nail.
    svg.arrow(500, y, 462, y, { color: COLORS.red, width: 3.5 });
    svg.text(470, y + 26, 'T \\rm{(string on mass)}', { size: 14, anchor: 'end' });
    svg.text(470, y + 46, 'centripetal force', { size: 13, math: false, anchor: 'end' });
    svg.text(300, 230, 'the mass pulls outward on the string because the string pulls it inward', {
      size: 14,
      math: false,
    });
    svg.text(300, 254, '(Newton’s third law); pulled at both ends, the string stretches', {
      size: 14,
      math: false,
    });
    svg.arrow(520, y - 24, 520, y - 84, { color: VEL, width: 3 });
    svg.text(530, y - 74, '**v**', { size: 17, anchor: 'start' });
    svg.text(20, 30, 'top view, pieces drawn apart', { size: 14, math: false, anchor: 'start' });
    return svg.render();
  },

  // 6.5 Q3 — gravity speeds a satellite up or slows it down on an ellipse
  concept_06_05_q03: () => {
    const svg = new Svg({
      width: 620,
      height: 420,
      title: 'Forces on a satellite in an elliptical orbit',
      desc: 'An elliptical orbit with the planet at one focus; the satellite moves counterclockwise. The only force on the satellite is gravity, pointing toward the planet. At a point where the satellite approaches the planet, the force has a component along the velocity (dashed), so the satellite speeds up. At a point where it moves away, the force has a component opposite the velocity, so it slows down. At the closest and farthest points the force is perpendicular to the velocity and the speed is momentarily neither increasing nor decreasing.',
    });
    const ox = 330;
    const oy = 220;
    const a = 220;
    const b = 140;
    const c = Math.sqrt(a * a - b * b);
    const f = new Frame(svg, { ox, oy, scale: 1 });
    svg.ellipse(ox, oy, a, b, { stroke: COLORS.guide, width: 2 });
    const planet = [-c, 0];
    svg.circle(...f.p(...planet), 16, { fill: COLORS.blue, stroke: COLORS.black });
    f.text(planet, 'planet', { dy: 32, size: 14, math: false });
    const at = (t, name, side) => {
      const P = [a * Math.cos(rad(t)), b * Math.sin(rad(t))];
      const v = [-a * Math.sin(rad(t)), b * Math.cos(rad(t))];
      const vl = Math.hypot(...v);
      const vu = [v[0] / vl, v[1] / vl];
      const d = [planet[0] - P[0], planet[1] - P[1]];
      const dl = Math.hypot(...d);
      const Fu = [d[0] / dl, d[1] / dl];
      const FL = 110;
      f.vec(P, [P[0] + vu[0] * 95, P[1] + vu[1] * 95], { color: VEL, width: 3 });
      f.text([P[0] + vu[0] * 95, P[1] + vu[1] * 95], '**v**', { dx: 0, dy: side * -16, size: 17 });
      f.vec(P, [P[0] + Fu[0] * FL, P[1] + Fu[1] * FL], { color: COLORS.red, width: 3.5 });
      f.text([P[0] + Fu[0] * FL, P[1] + Fu[1] * FL], '**F**', { dx: 4, dy: side * 20, size: 17 });
      const par = (Fu[0] * vu[0] + Fu[1] * vu[1]) * FL;
      f.vec(P, [P[0] + vu[0] * par, P[1] + vu[1] * par], {
        color: COLORS.red,
        width: 2,
        dash: '5 3',
      });
      svg.circle(...f.p(...P), 8, { fill: '#e0a030', stroke: COLORS.black });
      f.text(P, name, { dx: 16, dy: side * -26, size: 14, math: false, anchor: 'start' });
    };
    at(65, 'approaching: speeds up', 1);
    at(-65, 'receding: slows down', -1);
    svg.text(70, 30, 'F: gravity toward the planet', {
      size: 14,
      math: false,
      anchor: 'start',
      color: COLORS.red,
    });
    svg.text(70, 52, 'dashed: component of F along v', {
      size: 14,
      math: false,
      anchor: 'start',
      color: COLORS.red,
    });
    // Direction of travel (counterclockwise) at the far end of the orbit.
    svg.arrow(ox + a, oy + 10, ox + a, oy - 14, { color: COLORS.guide, width: 2, head: 12 });
    return svg.render();
  },

  // 7.4 Q2 — potential energy of the diving board during a dive
  concept_07_04_q02: () => {
    const svg = new Svg({
      width: 620,
      height: 360,
      title: 'Elastic potential energy of a diving board during a dive',
      desc: 'Sketch of the diving board’s elastic potential energy versus time. It is zero before the swimmer steps on, rises as she walks out and the board bends under her weight, rises to a maximum when she drives the board down to its lowest point, and then decreases to zero as the board straightens and launches her, reaching zero when her feet leave the board.',
    });
    const g = new Plot(svg, { x: 80, y: 40, w: 480, h: 220, xRange: [0, 10], yRange: [0, 1.15] });
    g.axes({
      arrows: true,
      xTitle: 'Time \\it{t}',
      yTitle: 'Potential energy PE_\\rm{el}',
      titleSize: 16,
      yTitleOffset: 30,
      xTitleOffset: 34,
    });
    const pts = [
      [0, 0],
      [1, 0],
      [3, 0.3],
      [4.5, 0.3],
      [6.3, 1],
      [8, 0],
      [9.5, 0],
    ];
    g.series(pts, {
      color: COLORS.red,
      width: 3,
      smooth: true,
      tension: 0.25,
      horizontalTangents: [0, 1, 3, 4, 5, 6],
    });
    const marks = [
      [1, 0, 'steps on'],
      [3.75, 0.3, 'standing at the end'],
      [6.3, 1, 'lowest point: maximum'],
      [8, 0, 'feet leave'],
    ];
    for (const [x, y, s] of marks) {
      svg.circle(g.X(x), g.Y(y), 4.5, { fill: COLORS.black });
      g.text(x, y + 0.09, s, { size: 13, math: false });
    }
    return svg.render();
  },

  // 8.2 Q1 — same impulse, different collision times
  concept_08_02_q01: () => {
    const svg = new Svg({
      width: 620,
      height: 380,
      title: 'Force on a child’s head hitting tile and carpet',
      desc: 'Force versus time for a child’s head (3.0 kg at 3.0 m/s) stopping on a tile floor and on a padded carpet. Both pulses have the same area, the impulse 9.0 kg·m/s, because the change in momentum is the same. On tile the head stops in about 2 ms, so the force is a tall narrow spike with an average of 4500 N. On carpet it stops in about 20 ms, so the force is ten times smaller, about 450 N on average, spread over ten times as long.',
    });
    const g = new Plot(svg, {
      x: 90,
      y: 40,
      w: 460,
      h: 240,
      xRange: [0, 25],
      yRange: [0, 8],
      xTicks: [0, 5, 10, 15, 20, 25],
      yTicks: [0, 2, 4, 6, 8],
    });
    g.axes({ xTitle: 'Time, t (ms)', yTitle: 'Force, F (kN)', yTitleOffset: 50 });
    const half = (peak, T) => t => (t <= T ? peak * Math.sin((Math.PI * t) / T) : 0);
    // Peak of a half-sine pulse with impulse J and duration T is πJ/(2T).
    g.fn(half((Math.PI * 9.0) / (2 * 0.002) / 1000, 2), 0, 2, { color: COLORS.red, width: 3 });
    g.fn(half((Math.PI * 9.0) / (2 * 0.02) / 1000, 20), 0, 20, { color: COLORS.blue, width: 3 });
    g.text(3, 6.6, 'tile: Δt ≈ 2 ms, average force 4500 N', {
      size: 14,
      math: false,
      anchor: 'start',
    });
    g.text(11, 1.35, 'carpet: Δt ≈ 20 ms, average force 450 N', { size: 14, math: false });
    g.text(14, 4.5, 'same area under each curve:', { size: 14, math: false });
    g.text(14, 3.95, 'impulse = Δp = 9.0 kg·m/s', { size: 14, math: false });
    return svg.render();
  },

  // 8.6 Q1 — scattering from a cube face and from a sphere
  concept_08_06_q01: () => {
    const svg = new Svg({
      width: 720,
      height: 380,
      title: 'Elastic scattering from a massive cube and a massive sphere',
      desc: 'Two panels. (a) A massive cube whose struck face is tilted 20 degrees from the vertical. Two incoming paths with different impact parameters b both reflect from the flat face with equal angles of incidence and reflection, so both leave at the same angle θ1 = 40 degrees: for a flat face θ1 does not depend on b. (b) A massive sphere of radius R. The normal at the point of impact depends on b: a head-on hit (b = 0) bounces straight back (θ1 = 180°), b = R/2 leaves at 120 degrees, b = 0.87R leaves at 60 degrees, and a grazing hit (b near R) is barely deflected. For the sphere θ1 = 180° − 2 arcsin(b/R).',
    });
    const ray = (P, dir, len, opts = {}) => {
      svg.arrow(P[0], P[1], P[0] + dir[0] * len, P[1] - dir[1] * len, {
        color: VEL,
        width: 2.5,
        head: 11,
        ...opts,
      });
    };
    // (a) Cube turned α = 25° counterclockwise: its top face is a ramp at α.
    svg.text(20, 26, '(a) massive cube', {
      size: 16,
      math: false,
      weight: 'bold',
      anchor: 'start',
    });
    const C = [235, 235];
    const s = 120;
    const alpha = 25;
    const corner = (dx, dy) => {
      const c = Math.cos(rad(alpha));
      const si = Math.sin(rad(alpha));
      return [C[0] + dx * c - dy * si, C[1] - (dx * si + dy * c)];
    };
    svg.polygon(
      [corner(-s / 2, -s / 2), corner(s / 2, -s / 2), corner(s / 2, s / 2), corner(-s / 2, s / 2)],
      {
        fill: COLORS.fill,
        stroke: COLORS.black,
      }
    );
    const up = [Math.cos(rad(2 * alpha)), Math.sin(rad(2 * alpha))];
    for (const k of [-0.3, 0.15]) {
      const H = corner(k * s, s / 2);
      svg.line(30, H[1], H[0], H[1], { color: VEL, width: 2.5 });
      ray([30, H[1]], [1, 0], 60);
      svg.line(H[0], H[1], H[0] + up[0] * 130, H[1] - up[1] * 130, {
        color: COLORS.red,
        width: 2.5,
      });
      ray([H[0] + up[0] * 100, H[1] - up[1] * 100], up, 40, { color: COLORS.red });
    }
    // A lower path strikes the left face instead and goes back down to the left.
    const back = [Math.cos(rad(180 + 2 * alpha)), Math.sin(rad(180 + 2 * alpha))];
    const L0 = corner(-s / 2, 0.1 * s);
    svg.line(30, L0[1], L0[0], L0[1], { color: VEL, width: 2.5 });
    ray([30, L0[1]], [1, 0], 60);
    svg.line(L0[0], L0[1], L0[0] + back[0] * 90, L0[1] - back[1] * 90, {
      color: COLORS.red,
      width: 2.5,
      dash: '6 4',
    });
    const T0 = corner(-0.3 * s, s / 2);
    svg.line(T0[0], T0[1], T0[0] + 120, T0[1], { color: COLORS.guide, width: 1.2, dash: '5 4' });
    svg.arc(T0[0], T0[1], 70, 0, 2 * alpha, { color: COLORS.axis });
    svg.text(T0[0] + 84, T0[1] - 26, 'θ_1', { size: 16 });
    svg.text(200, 332, 'same face, any b: θ_1 = 2α = 50°', { size: 15 });
    svg.text(200, 356, '(α = angle of the struck face to the incoming path)', {
      size: 13,
      math: false,
    });
    // (b) Sphere.
    svg.line(380, 20, 380, 360, { color: '#cccccc', width: 1 });
    svg.text(400, 26, '(b) massive sphere', {
      size: 16,
      math: false,
      weight: 'bold',
      anchor: 'start',
    });
    const O = [590, 220];
    const R = 70;
    svg.circle(O[0], O[1], R, { fill: COLORS.fill, stroke: COLORS.black });
    svg.circle(O[0], O[1], 3, { fill: COLORS.black });
    const cases = [
      [0, '180°'],
      [0.5, '120°'],
      [0.87, '60°'],
    ];
    for (const [bb, lab] of cases) {
      const yHit = O[1] - bb * R;
      const xHit = O[0] - Math.sqrt(R * R - (bb * R) ** 2);
      const th = 180 - (2 * Math.asin(bb) * 180) / Math.PI;
      const d = [Math.cos(rad(th)), Math.sin(rad(th))];
      svg.line(400, yHit + (bb === 0 ? 4 : 0), xHit, yHit + (bb === 0 ? 4 : 0), {
        color: VEL,
        width: 2.5,
      });
      ray([400, yHit + (bb === 0 ? 4 : 0)], [1, 0], 40);
      const L = bb === 0 ? 120 : 95;
      const P0 = [xHit, yHit - (bb === 0 ? 4 : 0)];
      svg.line(P0[0], P0[1], P0[0] + d[0] * L, P0[1] - d[1] * L, { color: COLORS.red, width: 2.5 });
      svg.arrow(
        P0[0] + d[0] * (L - 30),
        P0[1] - d[1] * (L - 30),
        P0[0] + d[0] * L,
        P0[1] - d[1] * L,
        { color: COLORS.red, width: 2.5, head: 11 }
      );
      svg.text(P0[0] + d[0] * (L + 16), P0[1] - d[1] * (L + 16) - (bb === 0 ? 10 : 0), lab, {
        size: 14,
        math: false,
      });
    }
    svg.text(560, 330, 'θ_1 = 180° − 2 arcsin(b/R)', { size: 15 });
    svg.text(560, 354, 'b = 0, R/2, 0.87R shown', { size: 13, math: false });
    return svg.render();
  },
};
