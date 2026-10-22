/**
 * Chapter 2 (one-dimensional kinematics): number lines, "knowns" sketches, and
 * position / velocity / acceleration graphs.
 *
 * Graph data follow the worked examples and solutions in the text, so values a
 * student reads off a graph agree with the numbers used in the solutions.
 */
import { COLORS, Plot, Svg, fmt, smilAnimate } from './svg.js';

const POS = COLORS.position;
const VEL = COLORS.velocity;
const ACC = COLORS.accel;

const one = v => v.toFixed(1);
const two = v => v.toFixed(2);

/** Horizontal arrow helper for the "knowns" sketches. */
function harrow(svg, x1, x2, y, color) {
  svg.arrow(x1, y, x2, y, { color, width: 3, head: 15 });
}

/** Vertical arrow helper. */
function varrow(svg, x, y1, y2, color) {
  svg.arrow(x, y1, x, y2, { color, width: 3, head: 15 });
}

/** A labeled segment |———| used to show an interval along the x axis. */
function interval(svg, x1, x2, y, { tick = 26 } = {}) {
  svg.line(x1, y, x2, y, { color: COLORS.black, width: 2 });
  svg.line(x1, y - tick / 2, x1, y + tick / 2, { color: COLORS.black, width: 2 });
  svg.line(x2, y - tick / 2, x2, y + tick / 2, { color: COLORS.black, width: 2 });
}

/** Simple fraction: numerator over a bar over denominator, centered at x. */
function fraction(svg, x, y, num, den, { size = 17, width = 34 } = {}) {
  svg.text(x, y - size * 0.62, num, { size });
  svg.line(x - width / 2, y, x + width / 2, y, { color: COLORS.text, width: 1.2 });
  svg.text(x, y + size * 0.72, den, { size });
}

/**
 * Standard data-graph panel. Returns the Plot; `top` lets several panels share
 * one SVG (stacked graphs).
 */
function panel(svg, { top = 0, left = 85, width, height = 260, ...opts }) {
  return new Plot(svg, { x: left, y: top + 50, w: width, h: height, ...opts });
}

/** Three stacked graphs (x, v, a vs. t) in one SVG. */
function stacked(title, desc, specs, { width = 560, panelH = 230, gap = 330 } = {}) {
  const svg = new Svg({ width, height: specs.length * gap + 10, title, desc });
  specs.forEach((spec, k) => {
    const g = panel(svg, { top: k * gap, width: width - 125, height: panelH, ...spec.plot });
    g.axes({ box: spec.box, ...spec.axes });
    spec.draw(g, svg, k * gap);
    if (spec.tag) svg.text(16, k * gap + panelH + 112, spec.tag, { size: 15, math: false });
  });
  return svg.render();
}

/** One graph in its own SVG. */
function single(title, desc, plot, axes, draw, { width = 600, height = 380 } = {}) {
  const svg = new Svg({ width, height, title, desc });
  const g = panel(svg, { width: width - 125, height: height - 120, ...plot });
  g.axes(axes);
  draw(g, svg);
  return svg.render();
}

/** Sketch graph with arrowed axes, no numbers (conceptual questions). */
function sketch(title, plot, axes, draw, { width = 540, height = 400 } = {}) {
  const svg = new Svg({ width, height, title });
  const g = new Plot(svg, { x: 70, y: 30, w: width - 110, h: height - 100, ...plot });
  g.axes({ arrows: true, titleSize: 17, yTitleOffset: 28, xTitleOffset: 34, ...axes });
  draw(g, svg);
  return svg.render();
}

const TRACE_DUR = '8s';

/** Vertical time cursor and a dot on the curve. Hidden unless motion is allowed. */
function timeTrace(g, samples, ys, { dur = TRACE_DUR, color, keyTimes } = {}) {
  const xs = samples.map(t => g.X(t));
  const py = ys.map(y => g.Y(y));
  const x0 = xs[0];
  const top = g.y;
  const bot = g.y + g.h;
  const opt = { dur, keyTimes };
  g.svg.motionGroup(
    `<line x1="${fmt(x0)}" y1="${fmt(top)}" x2="${fmt(x0)}" y2="${fmt(bot)}" stroke="#222222" stroke-width="1.4" stroke-dasharray="5 4">${smilAnimate('x1', xs, opt)}${smilAnimate('x2', xs, opt)}</line><circle cx="${fmt(x0)}" cy="${fmt(py[0])}" r="5.5" fill="${color}" stroke="#ffffff" stroke-width="1.6">${smilAnimate('cx', xs, opt)}${smilAnimate('cy', py, opt)}</circle>`
  );
}

/** Points labeled with letters above (or at a given offset). */
function letters(g, svg, pts, names, offsets = {}) {
  pts.forEach(([x, y], k) => {
    const [dx, dy] = offsets[names[k]] || [0, -18];
    svg.text(g.X(x) + dx, g.Y(y) + dy, names[k], { size: 18, italic: false });
  });
}

// Jet-car data used in sections 2.8 (Figures 3, 5, 14, 15) and the table in
// Figure 5: x = 200 + 15t + 2.5t² m, v = 15 + 5t m/s, a = 5.0 m/s².
const JET_T = [0, 5, 10, 15, 20, 25, 30];
const jetX = t => 200 + 15 * t + 2.5 * t * t;
const jetV = t => 15 + 5 * t;

// Jet car approaching top speed (Figure 6, and Figures 16–17 in the problems).
const TOP_V = [
  [0, 165],
  [10, 210],
  [20, 228],
  [30, 239],
  [40, 246.5],
  [50, 249],
  [60, 249.7],
  [70, 250],
];
const TOP_A = [
  [0, 5],
  [10, 3.2],
  [20, 1.4],
  [30, 0.7],
  [40, 0.45],
  [50, 0.15],
  [60, 0],
  [70, 0],
];
// Position (km) from integrating the velocity, starting at 2.9 km.
const TOP_X = (() => {
  const out = [[0, 2.9]];
  for (let k = 1; k < TOP_V.length; k += 1) {
    const dt = TOP_V[k][0] - TOP_V[k - 1][0];
    const dx = ((TOP_V[k][1] + TOP_V[k - 1][1]) / 2) * dt;
    out.push([TOP_V[k][0], out[k - 1][1] + dx / 1000]);
  }
  return out;
})();

const range = (a, b, step) => {
  const out = [];
  for (let v = a; v <= b + 1e-9; v += step) out.push(Number(v.toFixed(6)));
  return out;
};

// Detailed scene helpers used by the chapter 2 redraws.
function lecturer(svg, x, feet, shirt = '#ff6b9d') {
  svg.circle(x, feet - 82, 12, { fill: '#ffcc99', stroke: COLORS.black });
  svg.path(`M ${x - 12} ${feet - 82} Q ${x - 18} ${feet - 106} ${x + 9} ${feet - 95}`, {
    color: '#795548',
    width: 6,
  });
  svg.rect(x - 14, feet - 66, 28, 39, { fill: shirt, stroke: COLORS.black, rx: 3 });
  svg.polyline(
    [
      [x - 8, feet - 27],
      [x - 12, feet],
      [x - 20, feet],
    ],
    { color: '#607d8b', width: 8 }
  );
  svg.polyline(
    [
      [x + 8, feet - 27],
      [x + 12, feet],
      [x + 20, feet],
    ],
    { color: '#607d8b', width: 8 }
  );
  svg.polyline(
    [
      [x + 14, feet - 57],
      [x + 27, feet - 48],
      [x + 37, feet - 65],
    ],
    { color: '#ffcc99', width: 7 }
  );
}

function positionAxis(svg, X, y, positions) {
  svg.arrow(70, y, 620, y, { color: COLORS.black, head: 12 });
  svg.text(640, y, '+x', { size: 18 });
  for (const [v, label] of positions) {
    svg.line(X(v), y - 6, X(v), y + 6);
    svg.text(X(v), y + 22, label, { size: 18 });
    svg.text(X(v), y + 45, `${v.toFixed(1)} \\rm{m}`, { size: 17 });
  }
}

function airplane(svg, x, y, scale = 1) {
  const P = (a, b) => [x + a * scale, y + b * scale];
  svg.polygon([P(-100, 0), P(-115, -30), P(-100, -30), P(-70, 0)], {
    fill: '#90caf9',
    stroke: COLORS.axis,
  });
  svg.ellipse(x, y, 120 * scale, 17 * scale, { fill: '#e3f2fd', stroke: COLORS.axis });
  svg.polygon([P(-15, 0), P(-65, 35), P(-40, 35), P(35, 0)], {
    fill: '#90caf9',
    stroke: COLORS.axis,
  });
  for (let i = -65; i <= 65; i += 20) {
    svg.rect(x + i * scale, y - 8 * scale, 9 * scale, 8 * scale, {
      fill: '#ffffff',
      stroke: COLORS.axis,
      width: 1,
    });
  }
  svg.ellipse(x + 95 * scale, y - 4 * scale, 9 * scale, 5 * scale, {
    fill: '#81d4fa',
    stroke: COLORS.axis,
    width: 1,
  });
}

function car(svg, x, y, color, facing = 1) {
  svg.rect(x - 25, y - 12, 50, 24, { fill: color, stroke: COLORS.black, width: 2, rx: 3 });
  svg.polygon(
    [
      [x - 17, y - 12],
      [x - 12, y - 24],
      [x + 10, y - 24],
      [x + 20, y - 12],
    ],
    { fill: color, stroke: COLORS.black }
  );
  for (const dx of [-9, 4])
    svg.rect(x + dx, y - 21, 9, 8, { fill: '#81d4fa', stroke: COLORS.black, width: 1 });
  for (const dx of [-15, 15]) svg.circle(x + dx, y + 12, 6, { fill: COLORS.black });
  svg.rect(x + facing * 23 - 2, y - 7, 4, 5, { fill: '#fff59d' });
}

function subway(both) {
  const svg = new Svg({
    width: 720,
    height: both ? 440 : 230,
    title: both ? 'Subway train displacements' : 'Leftward subway trip',
    desc: both
      ? 'The train moves from 4.70 to 6.70 km, displacement +2.00 km, and in a separate trip from 5.25 to 3.75 km, displacement −1.50 km. Train size and travel distance use different scales.'
      : 'The train moves left from 5.25 km to 3.75 km, displacement −1.50 km. Train size and travel distance use different scales.',
  });
  const draw = (top, rightward) => {
    const y = top + 110;
    const initial = rightward ? 260 : 460;
    const final = rightward ? 540 : 250;
    const front = rightward ? initial : final;
    const left = rightward ? front - 200 : front;
    for (let i = 0; i < 3; i++) {
      const cx = left + i * 68;
      svg.rect(cx, y - 30, 62, 42, { fill: '#4fc3f7', stroke: COLORS.black, width: 2, rx: 5 });
      for (const dx of [8, 35])
        svg.rect(cx + dx, y - 23, 20, 22, {
          fill: '#ffffff',
          stroke: COLORS.black,
          width: 1,
          rx: 2,
        });
      for (const dx of [14, 48]) svg.circle(cx + dx, y + 17, 6, { fill: COLORS.black });
    }
    svg.line(45, y + 25, 655, y + 25, { color: '#8d6e63', width: 4 });
    for (let x = 50; x < 650; x += 22)
      svg.line(x, y + 22, x, y + 32, { color: '#8d6e63', width: 3 });
    svg.arrow(45, y + 55, 660, y + 55, { head: 12 });
    svg.text(685, y + 55, 'x (km)', { size: 16, math: false });
    // Broken coordinate axis avoids suggesting the small origin-to-train gap
    // shares the travel-distance scale.
    svg.text(50, y + 78, '0', { size: 16 });
    svg.text(115, y + 55, '//', { size: 20, math: false });
    for (const [x, label] of [
      [initial, rightward ? 'x_0 = 4.70 \\rm{km}' : 'x′_0 = 5.25 \\rm{km}'],
      [final, rightward ? 'x_{\\rm{f}} = 6.70 \\rm{km}' : 'x′_{\\rm{f}} = 3.75 \\rm{km}'],
    ]) {
      svg.line(x, top + 65, x, y + 65, { color: COLORS.guide, dash: '4 4', width: 1 });
      svg.text(x, y + 86, label, { size: 17 });
    }
    harrow(svg, initial, final, top + 60, POS);
    svg.text(
      (initial + final) / 2,
      top + 32,
      rightward ? 'Δx = +2.00 \\rm{km}' : 'Δx′ = −1.50 \\rm{km}',
      { size: 19 }
    );
    if (both) svg.text(25, top + 30, rightward ? '(a)' : '(b)', { size: 20, math: false });
  };
  if (both) draw(0, true);
  draw(both ? 210 : 0, false);
  svg.text(360, both ? 428 : 218, 'Train size and travel distance use different scales.', {
    size: 14,
    math: false,
  });
  return svg.render();
}

export default {
  // 2.1 Check Your Understanding — two displacements along an east–west axis
  Figure_02_01_04: () => {
    const svg = new Svg({
      width: 680,
      height: 250,
      title: 'Displacements of a cyclist along the x axis',
      desc: 'The cyclist rides from x0 3 km west (displacement Δx1 = −3 km), then 2 km east to xf (Δx2 = +2 km). A compass shows east as +x and west as −x.',
    });
    const x0 = 275;
    const k = 83; // pixels per km
    const xf = x0 - k;
    const left = x0 - 3 * k;
    svg.line(left, 128, x0, 128, { color: COLORS.red, width: 1.5 });
    for (const x of [left, xf, x0]) svg.line(x, 96, x, 160, { color: COLORS.red, width: 1.5 });
    harrow(svg, x0, left, 92, COLORS.black);
    harrow(svg, left, xf, 146, COLORS.black);
    svg.brace(left, x0, 72, { up: true, depth: 14 });
    svg.brace(left, xf, 168, { up: false, depth: 14 });
    svg.text((left + x0) / 2, 38, 'Δx_1 = −3 \\rm{km}', { size: 19 });
    svg.text((left + xf) / 2, 215, 'Δx_2 = +2 \\rm{km}', { size: 19 });
    svg.text(xf + 10, 146, 'x_\\rm{f}', { size: 19, anchor: 'start' });
    svg.text(x0 + 10, 146, 'x_0', { size: 19, anchor: 'start' });
    // Compass: east is +x.
    const cx = 512;
    const cy = 128;
    svg.line(cx - 55, cy, cx, cy, { color: COLORS.black, width: 1.5 });
    harrow(svg, cx, cx + 68, cy, COLORS.black);
    svg.line(cx, cy, cx, cy + 55, { color: COLORS.black, width: 1.5 });
    varrow(svg, cx, cy, cy - 75, COLORS.black);
    svg.text(cx, cy - 92, 'N', { size: 18, italic: false });
    svg.text(cx, cy + 72, 'S', { size: 18, italic: false });
    svg.text(cx + 75, cy, 'E(+\\it{x})', { size: 18, anchor: 'start', italic: false });
    svg.text(cx - 60, cy, 'W(−\\it{x})', { size: 18, anchor: 'end', italic: false });
    return svg.render();
  },

  // 2.1 Problems — four displacement paths on a number line
  Figure_02_01_05: () => {
    const svg = new Svg({
      width: 380,
      height: 275,
      title: 'Displacement paths A, B, C and D',
      desc: 'A number line from 0 to 12 m. Path A goes from 0 to 7 m. Path B goes from 12 m to 7 m. Path C goes from 2 m to 10 m, back to 8 m, then to 10 m. Path D goes from 9 m to 3 m, then to 5 m.',
    });
    const X = v => 47 + v * 20;
    svg.arrow(40, 182, 345, 182, { color: COLORS.black, width: 1.8, head: 12 });
    for (let v = 0; v <= 12; v += 2) {
      svg.line(X(v), 176, X(v), 188, { color: COLORS.black, width: 1.5 });
      svg.text(X(v), 204, String(v), { size: 17 });
    }
    svg.text(185, 238, 'displacement x (\\rm{m})', { size: 18 });

    const loop = (color, d, end) => {
      svg.path(d, { color, width: 3 });
      svg.arrow(end[0], end[1], end[2], end[1], { color, width: 3, head: 13 });
    };
    // A: 0 → 7
    svg.circle(X(0), 52, 5, { fill: '#7cc242' });
    harrow(svg, X(0), X(7), 52, '#7cc242');
    svg.text(X(0), 30, 'A', { size: 19, italic: false });
    // B: 12 → 7
    svg.circle(X(12), 72, 5, { fill: '#2b3990' });
    harrow(svg, X(12), X(7), 72, '#2b3990');
    svg.text(X(12), 50, 'B', { size: 19, italic: false });
    // C: 2 → 10 → 8 → 10
    const cy = 117;
    const cColor = '#be1e2d';
    svg.circle(X(2), cy, 5, { fill: cColor });
    loop(
      cColor,
      `M ${X(2)} ${cy} L ${X(10)} ${cy} A 4 4 0 0 0 ${X(10)} ${cy - 8} L ${X(8)} ${cy - 8} A 4 4 0 0 1 ${X(8)} ${cy - 16} L ${X(9.2)} ${cy - 16}`,
      [X(9.1), cy - 16, X(10)]
    );
    svg.text(X(2), cy - 22, 'C', { size: 19, italic: false });
    // D: 9 → 3 → 5
    const dy = 162;
    const dColor = '#f15a24';
    svg.circle(X(9), dy, 5, { fill: dColor });
    loop(
      dColor,
      `M ${X(9)} ${dy} L ${X(3)} ${dy} A 4 4 0 0 1 ${X(3)} ${dy - 8} L ${X(4.2)} ${dy - 8}`,
      [X(4.1), dy - 8, X(5)]
    );
    svg.text(X(9), dy - 22, 'D', { size: 19, italic: false });
    return svg.render();
  },

  // 2.2 — the usual one-dimensional coordinate system
  Figure_02_02_02: () => {
    const svg = new Svg({
      width: 260,
      height: 250,
      title: 'Coordinate system for one-dimensional motion',
      desc: 'Arrows pointing right and up mark the +x and +y directions; left is −x and down is −y.',
    });
    svg.line(60, 130, 130, 130, { color: COLORS.black, width: 2 });
    harrow(svg, 130, 195, 130, COLORS.black);
    svg.line(122, 195, 122, 130, { color: COLORS.black, width: 2 });
    varrow(svg, 122, 130, 58, COLORS.black);
    svg.text(205, 130, '+x', { size: 20, anchor: 'start' });
    svg.text(50, 130, '−x', { size: 20, anchor: 'end' });
    svg.text(122, 40, '+y', { size: 20 });
    svg.text(122, 215, '−y', { size: 20 });
    return svg.render();
  },

  // 2.3 — position, velocity and speed for a round trip
  Figure_02_03_04: () =>
    stacked(
      'Position, velocity and speed versus time for a round trip',
      'Position rises linearly from 0 to 3 km at 0.25 h and returns to 0 at 0.5 h. Velocity is +12 km/h for the first 0.25 h and −12 km/h for the second. Speed is a constant 12 km/h.',
      [
        {
          plot: {
            xRange: [0, 0.6],
            yRange: [0, 3.5],
            xTicks: range(0.1, 0.6, 0.1),
            yTicks: [0, 1, 2, 3],
            xFormat: one,
          },
          axes: {
            title: 'Position vs. Time',
            xTitle: 'Time (hours)',
            yTitle: 'Position (km)',
            yTitleOffset: 45,
          },
          draw: g => {
            g.series(
              [
                [0, 0],
                [0.25, 3],
                [0.5, 0],
              ],
              { color: POS, marker: 'diamond' }
            );
            timeTrace(g, [0, 0.25, 0.5], [0, 3, 0], { color: POS, keyTimes: [0, 0.5, 1] });
          },
        },
        {
          plot: {
            xRange: [0, 0.6],
            yRange: [-15, 15],
            xTicks: range(0.1, 0.6, 0.1),
            yTicks: range(-15, 15, 5),
            xFormat: one,
          },
          axes: {
            title: 'Velocity vs. Time',
            xTitle: 'Time (hours)',
            yTitle: 'Velocity (km/h)',
            xLabelsAtAxis: true,
            yTitleOffset: 50,
          },
          draw: g => {
            g.series(
              [
                [0, 12],
                [0.25, 12],
                [0.25, -12],
                [0.5, -12],
              ],
              { color: VEL, marker: 'diamond' }
            );
            timeTrace(g, [0, 0.25, 0.26, 0.5], [12, 12, -12, -12], {
              color: VEL,
              keyTimes: [0, 0.5, 0.52, 1],
            });
          },
        },
        {
          plot: {
            xRange: [0, 0.6],
            yRange: [0, 14],
            xTicks: range(0.1, 0.6, 0.1),
            yTicks: range(0, 14, 2),
            xFormat: one,
          },
          axes: {
            title: 'Speed vs. Time',
            xTitle: 'Time (hours)',
            yTitle: 'Speed (km/h)',
            yTitleOffset: 45,
          },
          draw: g => {
            g.series(
              [
                [0, 12],
                [0.25, 12],
                [0.5, 12],
              ],
              { color: POS, marker: 'diamond' }
            );
            timeTrace(g, [0, 0.5], [12, 12], { color: POS });
          },
        },
      ]
    ),

  // 2.4 Example — knowns for a racehorse leaving the gate (west is negative)
  Figure_02_04_05: () => {
    const svg = new Svg({
      width: 620,
      height: 246,
      title: 'Knowns for the racehorse',
      desc: 'The acceleration a is unknown and points west. The horse starts at rest (v0 = 0) and ends with vf = −15.0 m/s, pointing west. A compass shows north as +y and east as +x.',
    });
    svg.text(130, 46, 'a = ?', { size: 19 });
    harrow(svg, 205, 60, 70, ACC);
    svg.circle(148, 118, 7, { fill: VEL });
    svg.text(148, 142, 'v_0 = 0', { size: 19 });
    harrow(svg, 235, 30, 175, VEL);
    svg.text(140, 198, 'v_\\rm{f} = −15.0 \\rm{m/s}', { size: 19 });
    const cx = 455;
    const cy = 125;
    svg.line(cx - 68, cy, cx, cy, { color: COLORS.black, width: 1.5 });
    harrow(svg, cx, cx + 70, cy, COLORS.black);
    svg.line(cx, cy + 60, cx, cy, { color: COLORS.black, width: 1.5 });
    varrow(svg, cx, cy, cy - 72, COLORS.black);
    svg.text(cx, cy - 88, 'N (+y)', { size: 18 });
    svg.text(cx, cy + 80, 'S (−y)', { size: 18 });
    svg.text(cx + 78, cy, 'E (+x)', { size: 18, anchor: 'start' });
    svg.text(cx - 75, cy, 'W (−x)', { size: 18, anchor: 'end' });
    return svg.render();
  },

  // 2.4 — instantaneous vs. average acceleration
  Figure_02_04_06: () => {
    const svg = new Svg({
      width: 1000,
      height: 480,
      title: 'Instantaneous and average acceleration',
      desc: '(a) Acceleration varies only slightly about its average value of about 1.75 m/s². (b) Acceleration changes abruptly between values from −4 to +5 m/s² over 6 s.',
    });
    // (a)
    const a = new Plot(svg, {
      x: 70,
      y: 150,
      w: 330,
      h: 90,
      xRange: [0, 5.2],
      yRange: [0, 2.6],
      xTicks: [1, 2, 3, 4, 5],
      yTicks: [1, 2],
      xFormat: one,
      yFormat: one,
    });
    a.axes({ arrows: true, xLabelsAtAxis: true });
    svg.text(a.X(0) - 9, a.Y(0) + 17, '0.0', { size: 14, math: false, anchor: 'end' });
    svg.text(a.X(0) - 10, a.Y(2.6) - 22, 'a (\\rm{m/s}^2)', { size: 17, anchor: 'start' });
    svg.text(a.X(5.2) + 22, a.Y(0) + 17, 't (\\rm{s})', { size: 17, anchor: 'start' });
    a.line(0, 1.75, 4.9, 1.75, { color: COLORS.black, width: 1.5 });
    a.series(
      [
        [0, 1.45],
        [0.6, 2.05],
        [1.3, 1.78],
        [1.95, 1.45],
        [2.7, 1.85],
        [3.5, 2.05],
        [4.3, 1.88],
        [4.85, 1.35],
      ],
      { color: ACC, smooth: true }
    );
    svg.text(a.X(3.7), a.Y(0.7), '\\bar{a} = \\rm{Average}', { size: 17, anchor: 'start' });
    svg.text(235, 455, '(a)', { size: 16, math: false });

    // (b)
    const b = new Plot(svg, {
      x: 560,
      y: 60,
      w: 380,
      h: 360,
      xRange: [0, 6.5],
      yRange: [-5.5, 5.5],
      xTicks: [1, 2, 3, 4, 5, 6],
      yTicks: range(-5, 5, 1),
      xFormat: one,
      yFormat: one,
    });
    b.axes({ arrows: true, xLabelsAtAxis: true });
    svg.text(b.X(0) - 10, b.Y(5.5) - 22, 'a (\\rm{m/s}^2)', { size: 17, anchor: 'start' });
    svg.text(b.X(6.5) + 22, b.Y(0) + 17, 't (\\rm{s})', { size: 17, anchor: 'start' });
    b.series(
      [
        [0, 3],
        [1, 3],
        [1, -2],
        [3, -2],
        [3, 0],
        [4.2, 0],
        [4.2, 1.5],
        [4.8, 1.5],
        [4.8, 5],
        [5.5, 5],
        [5.5, -4],
        [6, -4],
        [6, -0.8],
      ],
      { color: ACC }
    );
    svg.text(750, 455, '(b)', { size: 16, math: false });
    return svg.render();
  },

  // 2.4 Example — subway train speeding up (knowns)
  Figure_02_04_08: () => {
    const svg = new Svg({
      width: 510,
      height: 220,
      title: 'Knowns for the accelerating subway train',
      desc: 'The train starts at v0 = 0 km/h and reaches vf = 30.0 km/h to the right; the acceleration a points right and is unknown.',
    });
    svg.circle(130, 33, 7, { fill: VEL });
    svg.text(130, 60, 'v_0 = 0 \\rm{km/h}', { size: 19 });
    harrow(svg, 28, 242, 95, VEL);
    svg.text(130, 120, 'v_\\rm{f} = 30.0 \\rm{km/h}', { size: 19 });
    harrow(svg, 80, 203, 157, ACC);
    svg.text(130, 190, 'a = ?', { size: 19 });
    svg.xyIndicator(390, 155, { len: 70 });
    return svg.render();
  },

  // 2.4 Example — subway train slowing down (knowns)
  Figure_02_04_09: () => {
    const svg = new Svg({
      width: 510,
      height: 218,
      title: 'Knowns for the decelerating subway train',
      desc: 'The train starts at v0 = 30.0 km/h to the right and stops (vf = 0 km/h); the acceleration a points left and is unknown.',
    });
    harrow(svg, 25, 240, 35, VEL);
    svg.text(130, 58, 'v_0 = 30.0 \\rm{km/h}', { size: 19 });
    svg.circle(122, 95, 7, { fill: VEL });
    svg.text(130, 125, 'v_\\rm{f} = 0 \\rm{km/h}', { size: 19 });
    harrow(svg, 150, 68, 160, ACC);
    svg.text(115, 185, 'a = ?', { size: 19 });
    svg.xyIndicator(392, 154, { len: 70 });
    return svg.render();
  },

  // 2.4 — graphs for the subway train (Examples 4 and 5)
  Figure_02_04_10: () => {
    const a1 = 30 / 3.6 / 20; // 0 → 30 km/h in 20 s
    const vmax = 30 / 3.6;
    const a2 = -vmax / 8; // 30 km/h → 0 in 8 s
    const x = t => {
      if (t <= 20) return 0.5 * a1 * t * t;
      const x20 = 0.5 * a1 * 400;
      if (t <= 40) return x20 + vmax * (t - 20);
      const x40 = x20 + vmax * 20;
      const s = t - 40;
      return x40 + vmax * s + 0.5 * a2 * s * s;
    };
    const v = t => (t <= 20 ? a1 * t : t <= 40 ? vmax : vmax + a2 * (t - 40));
    const ts = [0, 5, 10, 15, 20, 30, 40, 42, 44, 46, 48];
    return stacked(
      'Position, velocity and acceleration of the subway train',
      'The train speeds up at 0.417 m/s² for 20 s to 8.33 m/s (30 km/h), travels at constant velocity until 40 s, then slows at −1.04 m/s² and stops at 48 s, about 283 m from its start.',
      [
        {
          plot: {
            xRange: [0, 60],
            yRange: [0, 300],
            xTicks: range(0, 60, 10),
            yTicks: range(0, 300, 50),
          },
          axes: {
            title: 'Position vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Position (m)',
            yTitleOffset: 50,
          },
          draw: g => {
            g.fn(x, 0, 48, { color: POS });
            for (const t of ts) g.svg.marker(g.X(t), g.Y(x(t)), 'square', { color: POS });
          },
        },
        {
          plot: {
            xRange: [0, 60],
            yRange: [0, 9],
            xTicks: range(0, 60, 10),
            yTicks: range(0, 9, 1),
          },
          axes: {
            title: 'Velocity vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Velocity (m/s)',
            yTitleOffset: 40,
          },
          draw: g =>
            g.series(
              ts.map(t => [t, v(t)]),
              { color: VEL, marker: 'triangle' }
            ),
        },
        {
          plot: {
            xRange: [0, 60],
            yRange: [-1.2, 0.6],
            xTicks: range(0, 60, 10),
            yTicks: range(-1.2, 0.6, 0.2),
            yFormat: one,
          },
          axes: {
            title: 'Acceleration vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Acceleration (m/s²)',
            xLabelsAtAxis: true,
            yTitleOffset: 50,
          },
          draw: g => {
            g.series(
              [
                [0, a1],
                [20, a1],
                [20, 0],
                [40, 0],
                [40, a2],
                [48, a2],
              ],
              { color: ACC }
            );
            for (const t of ts)
              g.svg.marker(g.X(t), g.Y(t < 20 ? a1 : t < 40 ? 0 : a2), 'x', { color: ACC });
          },
        },
      ]
    );
  },

  // 2.4 Example — train moving left, slowing down (knowns)
  Figure_02_04_12: () => {
    const svg = new Svg({
      width: 510,
      height: 215,
      title: 'Knowns for the train slowing while moving left',
      desc: 'The train starts at v0 = −20 km/h (to the left) and stops (vf = 0 km/h); the acceleration a points right and is unknown.',
    });
    harrow(svg, 240, 28, 33, VEL);
    svg.text(130, 56, 'v_0 = −20 \\rm{km/h}', { size: 19 });
    svg.circle(143, 93, 7, { fill: VEL });
    svg.text(150, 125, 'v_\\rm{f} = 0 \\rm{km/h}', { size: 19 });
    harrow(svg, 112, 195, 157, ACC);
    svg.text(150, 185, 'a = ?', { size: 19 });
    svg.xyIndicator(392, 154, { len: 70 });
    return svg.render();
  },

  // 2.5 Example — jogger: displacement from average velocity (knowns)
  Figure_02_05_02: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for finding position from average velocity',
      desc: 'Motion from x0 to an unknown position x with average velocity 4.00 m/s to the right.',
    });
    svg.text(195, 40, '\\bar{v} = 4.00 \\rm{m/s}', { size: 19 });
    harrow(svg, 145, 255, 70, VEL);
    interval(svg, 37, 345, 107, { tick: 50 });
    svg.text(40, 152, 'x_0', { size: 19 });
    svg.text(350, 152, 'x = ?', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.5 — displacement is proportional to average velocity for a given time
  Figure_02_05_03: () => {
    const svg = new Svg({
      width: 461,
      height: 446,
      title: 'Displacement versus average velocity for a given time',
      desc: 'A straight line through the origin: for a fixed time t, the displacement Δx increases in proportion to the average velocity.',
    });
    const g = new Plot(svg, { x: 62, y: 98, w: 370, h: 290, xRange: [0, 6.2], yRange: [0, 5.2] });
    g.axes({
      xTitle: 'Average velocity, \\it{v̄} (m/s)',
      yTitle: 'Displacement, Δ\\it{x} (m)',
      yTitleOffset: 30,
      xTitleOffset: 28,
      titleSize: 17,
    });
    svg.text(231, 36, 'Displacement vs. Velocity', { size: 18, math: false, weight: 'bold' });
    svg.text(231, 60, 'for a given time, \\it{t}', { size: 18, math: false, weight: 'bold' });
    g.series(
      range(0, 5, 1).map(k => [k * 1.2, k]),
      { color: VEL, marker: 'diamond', markerSize: 7 }
    );
    return svg.render();
  },

  // 2.5 Example — airplane landing (knowns)
  Figure_02_05_04: () => {
    const svg = new Svg({
      width: 511,
      height: 209,
      title: 'Knowns for the landing airplane',
      desc: 'Initial velocity 70.0 m/s to the right, acceleration −1.50 m/s² to the left, final velocity unknown and to the right.',
    });
    harrow(svg, 33, 248, 37, VEL);
    svg.text(140, 60, 'v_0 = 70.0 \\rm{m/s}', { size: 19 });
    harrow(svg, 198, 65, 97, ACC);
    svg.text(140, 120, 'a = −1.50 \\rm{m/s}^2', { size: 19 });
    harrow(svg, 63, 220, 155, VEL);
    svg.text(140, 180, 'v_\\rm{f} = ?', { size: 19 });
    svg.xyIndicator(392, 147, { len: 70 });
    return svg.render();
  },

  // 2.5 Example — dragster: displacement (knowns)
  Figure_02_05_08: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for the dragster displacement',
      desc: 'Motion from x0 to an unknown position x with acceleration 26.0 m/s² to the right.',
    });
    interval(svg, 37, 345, 52, { tick: 50 });
    svg.text(40, 98, 'x_0', { size: 19 });
    svg.text(350, 98, 'x = ?', { size: 19 });
    harrow(svg, 147, 255, 115, ACC);
    svg.text(225, 142, 'a = 26.0 \\rm{m/s}^2', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.5 Example — dragster: final velocity (knowns)
  Figure_02_05_09: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for the dragster final velocity',
      desc: 'Motion from initial velocity v0 to an unknown final velocity v with acceleration 26.0 m/s² to the right.',
    });
    interval(svg, 37, 345, 52, { tick: 50 });
    svg.text(40, 98, 'v_0', { size: 19 });
    svg.text(350, 98, 'v = ?', { size: 19 });
    harrow(svg, 147, 255, 115, ACC);
    svg.text(225, 142, 'a = 26.0 \\rm{m/s}^2', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.5 Example — braking distance on dry and wet pavement (knowns)
  Figure_02_05_10: () => {
    const svg = new Svg({
      width: 456,
      height: 253,
      title: 'Knowns for the braking car',
      desc: 'A car moving at 30.0 m/s stops (vf = 0 m/s) over an unknown distance Δx, with acceleration −7.00 m/s² on dry pavement or −5.00 m/s² on wet pavement.',
    });
    svg.text(225, 42, 'Δx = ?', { size: 19 });
    interval(svg, 70, 380, 78, { tick: 50 });
    svg.text(105, 128, 'v_0 = 30.0 \\rm{m/s}', { size: 19 });
    svg.text(385, 128, 'v_\\rm{f} = 0 \\rm{m/s}', { size: 19 });
    harrow(svg, 25, 200, 153, VEL);
    svg.circle(380, 153, 7, { fill: VEL });
    svg.text(230, 186, 'a_\\rm{dry} = −7.00 \\rm{m/s}^2', { size: 19 });
    svg.text(230, 214, 'a_\\rm{wet} = −5.00 \\rm{m/s}^2', { size: 19 });
    return svg.render();
  },

  // 2.5 Example — time to travel 200 m (knowns)
  Figure_02_05_12: () => {
    const svg = new Svg({
      width: 413,
      height: 289,
      title: 'Knowns for finding the time to travel 200 m',
      desc: 'Starting at x0 = 0 with v0 = 10.0 m/s and acceleration 2.00 m/s² to the right, the object reaches x = 200 m at an unknown time t and with unknown velocity v.',
    });
    svg.text(180, 40, 't = ?', { size: 19 });
    interval(svg, 65, 297, 78, { tick: 50 });
    svg.text(30, 128, 'x_0 = 0', { size: 19, anchor: 'start' });
    svg.text(30, 155, 'v_0 = 10.0 \\rm{m/s}', { size: 19, anchor: 'start' });
    svg.text(268, 128, 'x = 200 \\rm{m}', { size: 19, anchor: 'start' });
    svg.text(268, 155, 'v = ?', { size: 19, anchor: 'start' });
    harrow(svg, 30, 160, 186, VEL);
    harrow(svg, 222, 388, 186, VEL);
    svg.text(200, 226, 'a = 2.00 \\rm{m/s}^2', { size: 19 });
    harrow(svg, 170, 253, 256, ACC);
    return svg.render();
  },

  // 2.5 Problems — position of an object accelerating at 4.50 m/s² from rest
  Figure_02_05_13: () =>
    single(
      'Position versus time for constant acceleration from rest',
      'Parabola x = 2.25 t² m: 0 m at 0 s, 2.25 m at 1 s, 9 m at 2 s, 20.25 m at 3 s, 36 m at 4 s and 56.25 m at 5 s.',
      { xRange: [0, 6], yRange: [0, 60], xTicks: range(0, 6, 1), yTicks: range(0, 60, 10) },
      { title: 'Position vs. Time', xTitle: 'Time (s)', yTitle: 'Position (m)', yTitleOffset: 45 },
      g => {
        g.fn(t => 2.25 * t * t, 0, 5, { color: POS });
        for (let t = 0; t <= 5; t += 1)
          g.svg.marker(g.X(t), g.Y(2.25 * t * t), 'diamond', { color: POS });
      },
      { width: 640, height: 400 }
    ),

  // 2.7 Example — rock thrown upward (knowns)
  Figure_02_07_02: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for a rock thrown straight up',
      desc: 'Initial velocity 13.0 m/s upward; acceleration −9.8 m/s² downward.',
    });
    svg.text(100, 82, 'v_0 = 13.0 \\rm{m/s}', { size: 19 });
    varrow(svg, 190, 138, 28, VEL);
    varrow(svg, 250, 62, 125, ACC);
    svg.text(330, 82, 'a = −9.8 \\rm{m/s}^2', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.7 — position, velocity and acceleration of the rock thrown upward
  Figure_02_07_03: () => {
    const y = t => 13 * t - 4.9 * t * t;
    const v = t => 13 - 9.8 * t;
    const ts = Array.from({ length: 25 }, (_, k) => (3 * k) / 24);
    return stacked(
      'Vertical position, velocity and acceleration of a rock thrown upward',
      'Position y = 13t − 4.9t² rises to about 8.6 m near 1.3 s and is −5.1 m at 3 s. Velocity falls linearly from 13 m/s to −16.4 m/s. Acceleration is constant at −9.8 m/s².',
      [
        {
          plot: {
            xRange: [0, 4],
            yRange: [-6, 10],
            xTicks: range(0, 4, 1),
            yTicks: range(-6, 10, 2),
          },
          axes: {
            title: 'Position vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Vertical Position (m)',
            xLabelsAtAxis: true,
            yTitleOffset: 42,
          },
          draw: g => {
            g.fn(y, 0, 3, { color: POS });
            for (let t = 0; t <= 3; t += 0.5)
              g.svg.marker(g.X(t), g.Y(y(t)), 'diamond', { color: POS });
            timeTrace(g, ts, ts.map(y), { color: POS });
          },
        },
        {
          plot: {
            xRange: [0, 4],
            yRange: [-20, 15],
            xTicks: range(0, 4, 1),
            yTicks: range(-20, 15, 5),
          },
          axes: {
            title: 'Velocity vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Velocity (m/s)',
            xLabelsAtAxis: true,
            yTitleOffset: 45,
          },
          draw: g => {
            g.series(
              [0, 1, 2, 3].map(t => [t, v(t)]),
              { color: VEL, marker: 'diamond' }
            );
            timeTrace(g, ts, ts.map(v), { color: VEL });
          },
        },
        {
          plot: {
            xRange: [0, 4],
            yRange: [-12, 0],
            xTicks: range(0, 4, 1),
            yTicks: range(-12, 0, 2),
          },
          axes: {
            title: 'Acceleration vs. Time',
            xTitle: 'Time (s)',
            yTitle: 'Acceleration (m/s²)',
            xLabelsAtAxis: true,
            yTitleOffset: 45,
          },
          draw: g => {
            g.series(
              [0, 1, 2, 3].map(t => [t, -9.8]),
              { color: ACC, marker: 'diamond' }
            );
            timeTrace(
              g,
              ts,
              ts.map(() => -9.8),
              { color: ACC }
            );
          },
        },
      ]
    );
  },

  // 2.7 Example — rock thrown downward (knowns)
  Figure_02_07_04: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for a rock thrown straight down',
      desc: 'Initial velocity −13.0 m/s downward; acceleration −9.8 m/s² downward.',
    });
    svg.text(105, 82, 'v_0 = −13.0 \\rm{m/s}', { size: 19 });
    varrow(svg, 192, 38, 145, VEL);
    varrow(svg, 250, 62, 125, ACC);
    svg.text(330, 82, 'a = −9.8 \\rm{m/s}^2', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.7 Example — finding g from a dropped object (knowns)
  Figure_02_07_07: () => {
    const svg = new Svg({
      width: 573,
      height: 175,
      title: 'Knowns for a dropped object',
      desc: 'The object starts at rest (v0 = 0 m/s); the downward acceleration a is unknown.',
    });
    svg.text(100, 82, 'v_0 = 0 \\rm{m/s}', { size: 19 });
    svg.circle(192, 82, 8, { fill: VEL });
    varrow(svg, 250, 62, 125, ACC);
    svg.text(300, 82, 'a = ?', { size: 19 });
    svg.xyIndicator(455, 128, { len: 70 });
    return svg.render();
  },

  // 2.8 — slope and intercept of a straight line
  Figure_02_08_01: () => {
    const svg = new Svg({
      width: 520,
      height: 310,
      title: 'A straight-line graph',
      desc: 'The line y = mx + b crosses the vertical axis at the intercept b and has slope m = rise/run = Δy/Δx.',
    });
    const ox = 135;
    const oy = 262;
    svg.arrow(ox, oy, 360, oy, { color: COLORS.black, width: 1.8, head: 12 });
    svg.arrow(ox, oy, ox, 38, { color: COLORS.black, width: 1.8, head: 12 });
    svg.text(370, oy, 'x', { size: 20, anchor: 'start' });
    svg.text(ox, 24, 'y', { size: 20 });
    svg.text(ox, oy + 20, '0', { size: 18 });
    const b = 50;
    const m = 0.6;
    const y = x => oy - b - m * (x - ox);
    svg.line(115, y(115), 330, y(330), { color: COLORS.position, width: 3.5 });
    // b as a double-headed arrow from the axis to the intercept
    svg.line(ox, oy - b, ox + 22, oy - b, { color: COLORS.black, width: 1.5 });
    svg.arrow(ox + 13, oy - 2, ox + 13, oy - b + 2, {
      color: COLORS.black,
      width: 1.5,
      head: 8,
      start: true,
    });
    svg.text(ox + 30, oy - b / 2, 'b', { size: 19, anchor: 'start' });
    svg.text(ox - 28, oy - b - 14, 'b', { size: 19 });
    svg.text(70, 135, 'Intercept', { size: 18, math: false });
    svg.leader(70, 150, ox - 6, oy - b - 6, { bend: 0.4 });
    svg.text(225, 50, 'y = mx + b', { size: 19 });
    svg.leader(220, 66, 242, y(242) - 4, { bend: -0.6 });
    svg.text(258, 185, 'Slope =', { size: 18, anchor: 'end' });
    fraction(svg, 288, 185, '\\rm{rise}', '\\rm{run}', { size: 18, width: 38 });
    svg.text(318, 185, '=', { size: 18 });
    fraction(svg, 345, 185, 'Δy', 'Δx', { size: 18, width: 30 });
    svg.text(372, 185, '= m', { size: 18, anchor: 'start' });
    return svg.render();
  },

  // 2.8 — position of the jet car moving at constant velocity
  Figure_02_08_02: () => {
    const svg = new Svg({
      width: 820,
      height: 440,
      title: 'Position versus time for a jet car at constant velocity',
      desc: 'A straight line x = x0 + v̄t starting at x0 = 400 m. It passes through 525 m at 0.50 s and 2000 m at 6.40 s, so its slope, the average velocity, is Δx/Δt = 250 m/s.',
    });
    const g = new Plot(svg, {
      x: 150,
      y: 40,
      w: 600,
      h: 290,
      xRange: [0, 8.6],
      yRange: [0, 2700],
      xTicks: [1, 2, 3, 4, 5, 6, 7, 8],
      yTicks: [800, 1200, 1600, 2000, 2400],
    });
    g.axes({
      arrows: true,
      size: 16,
      xTitle: 'Time \\it{t} (s)',
      yTitle: 'Position, \\it{x} (m)',
      yTitleOffset: 85,
      xTitleOffset: 75,
      titleSize: 17,
    });
    svg.text(g.X(0) - 9, g.Y(525), '525', { size: 16, math: false, anchor: 'end' });
    svg.line(g.X(0) - 5, g.Y(525), g.X(0), g.Y(525), { color: COLORS.axis, width: 1.2 });
    svg.text(g.X(0) - 12, g.Y(0) + 22, '0', { size: 16, math: false });
    const x = t => 400 + 250 * t;
    g.line(0, x(0), 8, x(8), { color: COLORS.black, width: 3.5 });
    const dash = '6 5';
    g.line(0, 2000, 7, 2000, { color: COLORS.black, width: 1.3, dash });
    g.line(0, 525, 7, 525, { color: COLORS.black, width: 1.3, dash });
    svg.line(g.X(0.5), g.Y(525), g.X(0.5), g.Y(0) + 45, { color: COLORS.black, width: 1.3, dash });
    svg.line(g.X(6.4), g.Y(2000), g.X(6.4), g.Y(0) + 45, { color: COLORS.black, width: 1.3, dash });
    svg.text(g.X(0.5), g.Y(0) + 62, '0.50', { size: 16, math: false });
    svg.text(g.X(6.4), g.Y(0) + 62, '6.40', { size: 16, math: false });
    svg.arrow(g.X(0.5), g.Y(400), g.X(6.4), g.Y(400), {
      color: COLORS.black,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.rect(g.X(3.45) - 18, g.Y(400) - 11, 36, 22, { fill: '#ffffff' });
    svg.text(g.X(3.45), g.Y(400), 'Δt', { size: 19 });
    svg.arrow(g.X(6.65), g.Y(525), g.X(6.65), g.Y(2000), {
      color: COLORS.black,
      width: 1.3,
      head: 10,
      start: true,
    });
    svg.rect(g.X(6.65) - 16, g.Y(1260) - 12, 32, 24, { fill: '#ffffff' });
    svg.text(g.X(6.65), g.Y(1260), 'Δx', { size: 19 });
    svg.text(g.X(4.1), g.Y(1050), 'Slope = \\bar{v} =', { size: 18, anchor: 'end' });
    fraction(svg, g.X(4.1) + 25, g.Y(1050), 'Δx', 'Δt', { size: 18, width: 30 });
    svg.text(g.X(4.55), g.Y(2550), 'x = x_0 + \\bar{v}t', { size: 18, anchor: 'end' });
    svg.leader(g.X(4.6), g.Y(2520), g.X(6.4) + 6, g.Y(2000) - 6, { bend: -0.35 });
    svg.text(75, g.Y(0) + 40, 'x_0 = 400', { size: 18 });
    svg.leader(70, g.Y(0) + 24, g.X(0) - 4, g.Y(400) + 3, { bend: -0.4 });
    return svg.render();
  },

  // 2.8 — jet car with constant acceleration
  Figure_02_08_03: () =>
    stacked(
      'Position, velocity and acceleration of the jet car with constant acceleration',
      '(a) Position x = 200 + 15t + 2.5t² m curves upward; tangent lines at P (t = 10 s) and Q (t = 25 s) give the velocity. (b) Velocity rises linearly from 15 m/s to 165 m/s, so its slope a is constant. (c) Acceleration is 5.0 m/s² throughout.',
      [
        {
          tag: '(a)',
          plot: {
            xRange: [0, 40],
            yRange: [0, 3500],
            xTicks: range(0, 40, 10),
            yTicks: range(0, 3500, 500),
          },
          axes: {
            box: true,
            title: 'Jet Car Position',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Position, \\it{x} (m)',
            yTitleOffset: 55,
          },
          draw: (g, svg) => {
            g.fn(jetX, 0, 30, { color: COLORS.black, width: 2.5 });
            for (const t of JET_T)
              svg.marker(g.X(t), g.Y(jetX(t)), 'diamond', { color: COLORS.black });
            const tangent = (t0, a, b) => {
              const s = jetV(t0);
              g.line(a, jetX(t0) + s * (a - t0), b, jetX(t0) + s * (b - t0), {
                color: COLORS.black,
                width: 1.5,
              });
              const y0 = jetX(t0) + s * (a - t0);
              const y1 = jetX(t0) + s * (b - t0);
              g.line(a, y0, b, y0, { color: COLORS.black, width: 1.3, dash: '4 3' });
              g.line(b, y0, b, y1, { color: COLORS.black, width: 1.3, dash: '4 3' });
              return [y0, y1];
            };
            const [p0, p1] = tangent(10, 5, 13);
            const [q0, q1] = tangent(25, 20.5, 30);
            g.text(9.5, jetX(10) + 230, 'P', { size: 17, italic: false });
            g.text(23.3, jetX(25) + 230, 'Q', { size: 17, italic: false });
            svg.text(g.X(10.6), g.Y(p0) - 10, 'Δt_\\rm{P}', { size: 15 });
            svg.text(g.X(13) + 4, g.Y((p0 + p1) / 2), 'Δx_\\rm{P}', { size: 17, anchor: 'start' });
            svg.text(g.X(25.2), g.Y(q0) + 16, 'Δt_\\rm{Q}', { size: 17 });
            svg.text(g.X(30) + 4, g.Y((q0 + q1) / 2), 'Δx_\\rm{Q}', { size: 17, anchor: 'start' });
            g.text(10, 2400, 'Slope = v', { size: 17 });
          },
        },
        {
          tag: '(b)',
          plot: {
            xRange: [0, 40],
            yRange: [0, 180],
            xTicks: range(0, 40, 10),
            yTicks: range(0, 180, 20),
          },
          axes: {
            box: true,
            title: 'Jet Car Velocity',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Velocity, \\it{v} (m/s)',
            yTitleOffset: 50,
          },
          draw: g => {
            g.series(
              JET_T.map(t => [t, jetV(t)]),
              { color: VEL, marker: 'diamond' }
            );
            g.text(9, 80, 'P', { size: 17, italic: false });
            g.text(23.5, 155, 'Q', { size: 17, italic: false });
            g.text(10, 120, 'Slope = a', { size: 17 });
          },
        },
        {
          tag: '(c)',
          plot: {
            xRange: [0, 40],
            yRange: [0, 6],
            xTicks: range(0, 40, 10),
            yTicks: range(0, 6, 1),
          },
          axes: {
            box: true,
            title: 'Jet Car Acceleration',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Acceleration, \\it{a} (m/s²)',
            yTitleOffset: 45,
          },
          draw: g =>
            g.series(
              JET_T.map(t => [t, 5]),
              { color: ACC, marker: 'diamond' }
            ),
        },
      ],
      { gap: 340 }
    ),

  // 2.8 Example — instantaneous velocity from the slope at a point
  Figure_02_08_05: () => {
    const svg = new Svg({
      width: 820,
      height: 470,
      title: 'Slope of the position graph at P and Q',
      desc: 'Position of the jet car, x = 200 + 15t + 2.5t² m, with tangent lines at P (t = 10 s) and at Q (t = 25 s). The tangent at Q runs from 1300 m at 19 s to 3120 m at 32 s, a slope of 140 m/s. A table lists t (s) and x (m): 0, 200; 5, 338; 10, 600; 15, 988; 20, 1500; 25, 2138; 30, 2900.',
    });
    const g = new Plot(svg, {
      x: 120,
      y: 40,
      w: 420,
      h: 340,
      xRange: [0, 37],
      yRange: [0, 3300],
      xTicks: range(0, 30, 5),
      yTicks: range(0, 3000, 500),
    });
    g.axes({
      arrows: true,
      size: 17,
      xTitle: 'Time, \\it{t} (s)',
      yTitle: 'Position, \\it{x} (m)',
      yTitleOffset: 75,
      xTitleOffset: 50,
      titleSize: 18,
    });
    g.fn(jetX, 0, 31, { color: POS, width: 3.5 });
    const tangent = (t0, a, b) => {
      const s = jetV(t0);
      const y0 = jetX(t0) + s * (a - t0);
      const y1 = jetX(t0) + s * (b - t0);
      g.line(a, y0, b, y1, { color: COLORS.black, width: 1.5 });
      g.line(a, y0, b, y0, { color: COLORS.black, width: 1.3, dash: '6 4' });
      g.line(b, y0, b, y1, { color: COLORS.black, width: 1.3, dash: '6 4' });
      return [y0, y1];
    };
    const [p0, p1] = tangent(10, 3, 17.5);
    const [q0, q1] = tangent(25, 19, 32);
    svg.circle(g.X(10), g.Y(jetX(10)), 6, { fill: COLORS.black });
    svg.circle(g.X(25), g.Y(jetX(25)), 6, { fill: COLORS.black });
    g.text(9, jetX(10) + 300, 'P', { size: 20, italic: false });
    g.text(23.6, jetX(25) + 300, 'Q', { size: 20, italic: false });
    svg.text(g.X(10.5), g.Y(p0) - 18, 'Δt_\\rm{P}', { size: 19 });
    svg.text(g.X(17.5) + 10, g.Y((p0 + p1) / 2) + 25, 'Δx_\\rm{P}', { size: 19, anchor: 'start' });
    svg.text(g.X(25.5), g.Y(q0) + 20, 'Δt_\\rm{Q}', { size: 19 });
    svg.text(g.X(32) + 10, g.Y((q0 + q1) / 2), 'Δx_\\rm{Q}', { size: 19, anchor: 'start' });
    g.text(9, 2000, 'Slope = v', { size: 19 });
    // Data table
    const tx = 640;
    const rows = JET_T.map(t => [t, Math.round(jetX(t))]);
    svg.text(tx - 25, 62, 't (\\rm{s})', { size: 18 });
    svg.text(tx + 70, 62, 'x (\\rm{m})', { size: 18 });
    svg.line(tx - 70, 80, tx + 115, 80, { color: COLORS.black, width: 1.3 });
    svg.line(tx + 15, 45, tx + 15, 360, { color: COLORS.black, width: 1.3 });
    rows.forEach(([t, x], k) => {
      svg.text(tx - 5, 105 + k * 37, String(t), { size: 18, anchor: 'end', math: false });
      svg.text(tx + 100, 105 + k * 37, String(x), { size: 18, anchor: 'end', math: false });
    });
    // A chord through t0 ± h is parallel to the tangent and offset by 2.5 h²,
    // so shrinking h lands it on the tangent already drawn.
    const secantDur = '12s';
    const secantPass = (t0, a, b, keyTimes, hs, opacity) => {
      const line = hs.map(h => {
        const s = jetV(t0);
        const off = 2.5 * h * h;
        const yL = jetX(t0) + off + s * (a - t0);
        const yR = jetX(t0) + off + s * (b - t0);
        return [g.X(a), g.Y(yL), g.X(b), g.Y(yR)];
      });
      const left = hs.map(h => [g.X(t0 - h), g.Y(jetX(t0 - h))]);
      const right = hs.map(h => [g.X(t0 + h), g.Y(jetX(t0 + h))]);
      const opt = { dur: secantDur, keyTimes };
      return `<g opacity="${opacity[0]}">${smilAnimate('opacity', opacity, opt)}<line x1="${fmt(line[0][0])}" y1="${fmt(line[0][1])}" x2="${fmt(line[0][2])}" y2="${fmt(line[0][3])}" stroke="${COLORS.blue}" stroke-width="2.4" stroke-linecap="round">${smilAnimate(
        'y1',
        line.map(p => p[1]),
        opt
      )}${smilAnimate(
        'y2',
        line.map(p => p[3]),
        opt
      )}</line><circle cx="${fmt(left[0][0])}" cy="${fmt(left[0][1])}" r="5" fill="${COLORS.blue}">${smilAnimate(
        'cx',
        left.map(p => p[0]),
        opt
      )}${smilAnimate(
        'cy',
        left.map(p => p[1]),
        opt
      )}</circle><circle cx="${fmt(right[0][0])}" cy="${fmt(right[0][1])}" r="5" fill="${COLORS.blue}">${smilAnimate(
        'cx',
        right.map(p => p[0]),
        opt
      )}${smilAnimate(
        'cy',
        right.map(p => p[1]),
        opt
      )}</circle></g>`;
    };
    svg.motionGroup(
      secantPass(
        10,
        3,
        17.5,
        [0, 0.12, 0.24, 0.36, 0.44, 0.5, 1],
        [7, 4.5, 2.4, 1, 0, 0, 0],
        [1, 1, 1, 1, 1, 0, 0]
      ) +
        secantPass(
          25,
          19,
          32,
          [0, 0.5, 0.56, 0.68, 0.8, 0.92, 0.98, 1],
          [7, 7, 7, 4, 2, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 0, 0]
        )
    );
    return svg.render();
  },

  // 2.8 — jet car approaching top speed (non-constant acceleration)
  Figure_02_08_06: () =>
    stacked(
      'Position, velocity and acceleration of the jet car as it reaches top speed',
      '(a) Position rises almost linearly from 2.9 km to about 19.2 km over 70 s. (b) Velocity rises from 165 m/s and levels off at 250 m/s; a tangent at 25 s runs from 210 m/s at 1 s to 260 m/s at 51 s, a slope of 1.0 m/s². (c) Acceleration falls from 5.0 m/s² to zero.',
      [
        {
          tag: '(a)',
          plot: {
            xRange: [0, 80],
            yRange: [0, 25],
            xTicks: range(0, 80, 10),
            yTicks: range(0, 25, 5),
          },
          axes: {
            box: true,
            title: 'Jet Car Position',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Position, \\it{x} (km)',
            yTitleOffset: 45,
          },
          draw: g => g.series(TOP_X, { color: COLORS.black, marker: 'diamond' }),
        },
        {
          tag: '(b)',
          plot: {
            xRange: [0, 80],
            yRange: [160, 260],
            xTicks: range(0, 80, 10),
            yTicks: range(160, 260, 10),
          },
          axes: {
            box: true,
            title: 'Jet Car Velocity',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Velocity, \\it{v} (m/s)',
            yTitleOffset: 50,
          },
          draw: (g, svg) => {
            g.line(1, 210, 51, 260, { color: COLORS.black, width: 2 });
            g.line(1, 210, 51, 210, { color: COLORS.black, width: 1.2 });
            g.line(51, 210, 51, 260, { color: COLORS.black, width: 1.2 });
            g.series(TOP_V, { color: VEL, marker: 'diamond', smooth: true });
            svg.text(g.X(26), g.Y(210) + 18, 'Δt', { size: 18 });
            svg.text(g.X(51) + 8, g.Y(235), 'Δv', { size: 18, anchor: 'start' });
          },
        },
        {
          tag: '(c)',
          plot: {
            xRange: [0, 80],
            yRange: [-1, 6],
            xTicks: range(0, 80, 10),
            yTicks: range(-1, 6, 1),
          },
          axes: {
            box: true,
            title: 'Jet Car Acceleration',
            xTitle: 'Time, \\it{t} (s)',
            yTitle: 'Acceleration, \\it{a} (m/s²)',
            yTitleOffset: 45,
            xAxisAt: -1,
          },
          draw: g => g.series(TOP_A, { color: ACC, marker: 'diamond', smooth: true }),
        },
      ],
      { gap: 340 }
    ),

  // 2.8 Check Your Understanding — ship coming into harbor (v vs. t)
  Figure_02_08_07: () =>
    sketch(
      'Velocity versus time for a ship coming into harbor',
      { xRange: [0, 10], yRange: [0, 4] },
      { arrows: false },
      (g, svg) => {
        g.series(
          [
            [0, 3.2],
            [1.9, 3.2],
            [3.6, 1.2],
            [7.3, 0],
          ],
          { color: VEL, width: 3.5 }
        );
        svg.text(g.X(0) - 18, g.Y(2), 'v', { size: 20 });
        svg.text(g.X(5), g.Y(0) + 22, 't', { size: 20 });
      },
      { width: 330, height: 190 }
    ),

  // 2.8 Check Your Understanding — ship's acceleration (a vs. t)
  Figure_02_08_08: () =>
    sketch(
      'Acceleration versus time for the ship',
      { xRange: [0, 10], yRange: [-2, 2] },
      {},
      (g, svg) => {
        const seg = (a, b, v) => g.line(a, v, b, v, { color: ACC, width: 3.5 });
        seg(0, 2, 0);
        seg(2.1, 3.8, -1.2);
        seg(4.1, 7.6, -0.6);
        svg.text(g.X(0) - 18, g.Y(1.6), 'a', { size: 20 });
        svg.text(g.X(10) + 6, g.Y(0) + 22, 't', { size: 20 });
      },
      { width: 330, height: 190 }
    ),

  // 2.8 Conceptual — position graph with points a–e
  Figure_02_08_09: () =>
    sketch(
      'Position versus time with points a through e',
      { xRange: [0, 450], yRange: [0, 300] },
      { xTitle: 'Time \\it{t}', yTitle: 'Position \\it{x}' },
      (g, svg) => {
        const pts = [
          [28, 27],
          [56, 115],
          [108, 187],
          [186, 232],
          [289, 248],
          [400, 238],
        ];
        g.series(pts, {
          color: POS,
          smooth: true,
          horizontalTangents: [4], // d: zero instantaneous velocity
          marker: 'circle',
          markerSize: 6,
        });
        letters(g, svg, pts.slice(1), ['a', 'b', 'c', 'd', 'e'], { a: [-6, -20] });
      },
      { width: 545, height: 410 }
    ),

  // 2.8 Conceptual — position graph with points a–l
  Figure_02_08_10: () =>
    sketch(
      'Position versus time with points a through l',
      { xRange: [0, 450], yRange: [0, 300] },
      { xTitle: 'Time \\it{t}', yTitle: 'Position \\it{x}' },
      (g, svg) => {
        const pts = [
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
        g.series(pts, {
          color: POS,
          smooth: true,
          tension: 0.35,
          horizontalTangents: [2, 4, 6, 11], // c, e, g, l: zero velocity
          marker: 'circle',
          markerSize: 6,
        });
        letters(g, svg, pts, 'abcdefghijkl'.split(''), {
          a: [6, -22],
          b: [4, -22],
          c: [4, -20],
          d: [-14, -16],
          f: [6, -20],
          i: [-6, -20],
          j: [-6, -20],
          k: [-8, -20],
        });
      },
      { width: 535, height: 410 }
    ),

  // 2.8 Conceptual — velocity graph with points P and Q
  Figure_02_08_11: () => {
    const svg = new Svg({
      width: 560,
      height: 390,
      title: 'Velocity versus time with points P and Q',
      desc: 'A velocity curve whose slope increases with time. Point P is at (t1, v1) and point Q at (t2, v2).',
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
    g.fn(v, 0.6, 10.4, { color: POS, width: 3.5 });
    const t1 = 2.3;
    const t2 = 9.6;
    for (const [t, sub, name] of [
      [t1, '1', 'P'],
      [t2, '2', 'Q'],
    ]) {
      svg.line(g.X(0) - 12, g.Y(v(t)), g.X(t), g.Y(v(t)), {
        color: COLORS.black,
        width: 1.3,
        dash: '6 4',
      });
      svg.line(g.X(t), g.Y(v(t)), g.X(t), g.Y(0) + 12, {
        color: COLORS.black,
        width: 1.3,
        dash: '6 4',
      });
      svg.text(g.X(0) - 20, g.Y(v(t)), `v_${sub}`, { size: 19, anchor: 'end' });
      svg.text(g.X(t), g.Y(0) + 30, `t_${sub}`, { size: 19 });
      svg.text(g.X(t) + 6, g.Y(v(t)) - 13, name, { size: 18, anchor: 'start', italic: false });
    }
    return svg.render();
  },

  // 2.8 Conceptual — velocity graph with points a–l
  Figure_02_08_12: () =>
    sketch(
      'Velocity versus time with points a through l',
      { xRange: [0, 450], yRange: [0, 300] },
      { xTitle: 'Time \\it{t}', yTitle: 'Velocity \\it{v}' },
      (g, svg) => {
        const pts = [
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
        g.series(pts, {
          color: VEL,
          smooth: true,
          horizontalTangents: [3, 4, 7], // d, e, h: zero acceleration
          marker: 'circle',
          markerSize: 6,
        });
        letters(g, svg, pts, 'abcdefghijkl'.split(''), {
          a: [-12, -14],
          b: [-10, -16],
          c: [-10, -16],
          i: [8, -16],
          j: [12, -14],
          k: [14, -12],
          l: [10, -20],
        });
      },
      { width: 535, height: 410 }
    ),

  // 2.8 Conceptual — elevator velocity
  Figure_02_08_13: () =>
    single(
      'Velocity versus time for an elevator',
      'Velocity rises from 0 to 3 m/s over the first 3 s, stays at 3 m/s until 18 s, then falls to zero at 23 s.',
      {
        xRange: [0, 25],
        yRange: [0, 3.5],
        xTicks: range(0, 25, 5),
        yTicks: range(0, 3.5, 0.5),
        yFormat: one,
      },
      {
        title: 'Velocity vs. Time',
        xTitle: 'Time \\it{t} (s)',
        yTitle: 'Velocity \\it{v} (m/s)',
        yTitleOffset: 45,
      },
      g =>
        g.series(
          [
            [0, 0],
            [3, 3],
            [18, 3],
            [23, 0],
          ],
          { color: VEL, width: 3.5 }
        ),
      { width: 640, height: 400 }
    ),

  // 2.8 Problems — jet car position (constant acceleration)
  Figure_02_08_14: () =>
    single(
      'Position versus time for the jet car',
      'Position 200 m at 0 s, 338 m at 5 s, 600 m at 10 s, 988 m at 15 s, 1500 m at 20 s, 2138 m at 25 s and 2900 m at 30 s.',
      { xRange: [0, 35], yRange: [0, 3500], xTicks: range(0, 35, 5), yTicks: range(0, 3500, 500) },
      { title: 'Position vs. Time', xTitle: 'Time (s)', yTitle: 'Position (m)', yTitleOffset: 55 },
      g => {
        g.fn(jetX, 0, 30, { color: POS });
        for (const t of JET_T) g.svg.marker(g.X(t), g.Y(jetX(t)), 'diamond', { color: POS });
      },
      { width: 680, height: 400 }
    ),

  // 2.8 Problems — jet car velocity (constant acceleration)
  Figure_02_08_15: () =>
    single(
      'Velocity versus time for the jet car',
      'A straight line from 15 m/s at 0 s to 165 m/s at 30 s: a constant acceleration of 5.0 m/s².',
      { xRange: [0, 35], yRange: [0, 180], xTicks: range(0, 35, 5), yTicks: range(0, 180, 20) },
      {
        title: 'Velocity vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Velocity (m/s)',
        yTitleOffset: 48,
      },
      g =>
        g.series(
          JET_T.map(t => [t, jetV(t)]),
          { color: VEL, marker: 'diamond' }
        ),
      { width: 680, height: 400 }
    ),

  // 2.8 Problems — position of a slowly moving object
  Figure_02_08_16: () =>
    single(
      'Position versus time',
      'Position 2.80 m at 0 s, 4.70 m at 10 s, 6.96 m at 20 s, 9.40 m at 30 s, 11.7 m at 40 s, 14.5 m at 50 s, 16.7 m at 60 s and 19.3 m at 70 s.',
      { xRange: [0, 80], yRange: [0, 25], xTicks: range(0, 80, 10), yTicks: range(0, 25, 5) },
      { title: 'Position vs. Time', xTitle: 'Time (s)', yTitle: 'Position (m)', yTitleOffset: 45 },
      g =>
        g.series(
          [
            [0, 2.8],
            [10, 4.7],
            [20, 6.96],
            [30, 9.4],
            [40, 11.7],
            [50, 14.5],
            [60, 16.7],
            [70, 19.3],
          ],
          { color: POS, marker: 'diamond' }
        ),
      { width: 680, height: 380 }
    ),

  // 2.8 Problems — velocity of the jet car approaching top speed
  Figure_02_08_17: () =>
    single(
      'Velocity versus time',
      'Velocity 165 m/s at 0 s, 210 m/s at 10 s, 228 m/s at 20 s, 242 m/s at 30 s, 248 m/s at 40 s, 251 m/s at 50 s and 254 m/s at 60 and 70 s.',
      { xRange: [0, 80], yRange: [0, 300], xTicks: range(0, 80, 10), yTicks: range(0, 300, 50) },
      {
        title: 'Velocity vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Velocity (m/s)',
        yTitleOffset: 50,
      },
      g =>
        g.series(
          [
            [0, 165],
            [10, 210],
            [20, 228],
            [30, 242],
            [40, 248],
            [50, 251],
            [60, 254],
            [70, 254],
          ],
          { color: VEL, marker: 'diamond' }
        ),
      { width: 680, height: 400 }
    ),

  // 2.8 Problems — subway shuttle position (km)
  Figure_02_08_18: () => {
    // Constant 2.0 m/s for 10 s, then 1.2 m/s² for 10 s (see the worked solution).
    const x = t => (t <= 10 ? 4.7 + 0.002 * t : 4.72 + 0.002 * (t - 10) + 0.0006 * (t - 10) ** 2);
    return single(
      'Position versus time for the subway shuttle train',
      'Position 4.70 km at 0 s, 4.72 km at 10 s and 4.80 km at 20 s. The graph is a straight line for the first 10 s and curves smoothly upward after that.',
      {
        xRange: [0, 25],
        yRange: [4.68, 4.82],
        xTicks: range(0, 25, 5),
        yTicks: range(4.68, 4.82, 0.02),
        yFormat: two,
      },
      { title: 'Position vs. Time', xTitle: 'Time (s)', yTitle: 'Position (km)', yTitleOffset: 55 },
      g => {
        g.fn(x, 0, 20, { color: POS });
        for (const t of [0, 10, 20]) g.svg.marker(g.X(t), g.Y(x(t)), 'diamond', { color: POS });
      },
      { width: 640, height: 420 }
    );
  },

  // 2.8 Problems — jogger position
  Figure_02_08_19: () =>
    single(
      'Position versus time for a jogger',
      'Position rises from 0 to about 17.6 m at 5 s, falls to about 2.5 m between 10 and 12.5 s, then rises to 25 m at 20 s.',
      { xRange: [0, 25], yRange: [0, 30], xTicks: range(0, 25, 5), yTicks: range(0, 30, 5) },
      { title: 'Position vs. Time', xTitle: 'Time (s)', yTitle: 'Position (m)', yTitleOffset: 45 },
      g =>
        g.series(
          [
            [0, 0],
            [2.5, 10],
            [5.2, 17.6],
            [7.7, 10],
            [10.2, 2.5],
            [12.6, 2.5],
            [15, 5],
            [20, 25],
          ],
          { color: POS, marker: 'diamond', markerSize: 6, smooth: true }
        ),
      { width: 640, height: 420 }
    ),

  // 2.8 Problems — jogger velocity
  Figure_02_08_20: () =>
    single(
      'Velocity versus time for a jogger',
      'Velocity is about 4 m/s for the first 2.5 s, falls through zero at 5 s to about −3.6 m/s at 8 s, then rises through zero near 11 s to about 4.3 m/s at 20 s.',
      { xRange: [0, 25], yRange: [-5, 6], xTicks: range(0, 25, 5), yTicks: range(-5, 6, 1) },
      {
        title: 'Velocity vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Velocity (m/s)',
        yTitleOffset: 45,
        xLabelsAtAxis: true,
      },
      g =>
        g.series(
          [
            [0, 4],
            [2.5, 4],
            [5, 0],
            [8, -3.6],
            [10.4, -0.4],
            [12.5, 0.65],
            [15, 3],
            [17.5, 4],
            [20, 4.3],
          ],
          { color: VEL, marker: 'diamond', smooth: true }
        ),
      { width: 640, height: 470 }
    ),

  // 2.8 Problems — jogger acceleration
  Figure_02_08_21: () =>
    single(
      'Acceleration versus time for a jogger',
      'Acceleration starts at 4 m/s², falls to −4 m/s² at 5 s, rises to 4 m/s² near 8.75 s, returns to zero at 10 s, peaks at 2 m/s² at 15 s and settles near zero by 20 s.',
      { xRange: [0, 25], yRange: [-5, 5], xTicks: range(0, 25, 5), yTicks: range(-5, 5, 1) },
      {
        title: 'Acceleration vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Acceleration (m/s²)',
        yTitleOffset: 45,
        xLabelsAtAxis: true,
      },
      g =>
        g.series(
          [
            [0, 4],
            [5, -4],
            [7.5, 0],
            [8.75, 4],
            [10, 0],
            [12.5, 0],
            [15, 2],
            [16, 0.5],
            [20, -0.1],
          ],
          { color: ACC, marker: 'diamond', smooth: true }
        ),
      { width: 680, height: 460 }
    ),

  // 2.8 Problems — sprinter velocity
  Figure_02_08_22: () =>
    single(
      'Velocity versus time for a sprinter',
      'Velocity rises linearly from 0 to 12 m/s in the first 4 s, then stays at 12 m/s through 10 s.',
      { xRange: [0, 12], yRange: [0, 14], xTicks: range(0, 12, 2), yTicks: range(0, 14, 2) },
      {
        title: 'Runner Velocity vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Velocity (m/s)',
        yTitleOffset: 45,
        box: true,
      },
      g =>
        g.series(
          [
            [0, 0],
            [2, 6],
            [4, 12],
            [6, 12],
            [8, 12],
            [10, 12],
          ],
          { color: VEL, marker: 'diamond' }
        ),
      { width: 680, height: 420 }
    ),

  // 2.8 Problems — piecewise-linear position
  Figure_02_08_23: () =>
    single(
      'Position versus time with four straight segments',
      'Straight segments through (0 s, 0 m), (2 s, 2 m), (3 s, −3 m), (5 s, −3 m) and (6 s, −2 m).',
      { xRange: [0, 7], yRange: [-4, 3], xTicks: range(0, 7, 1), yTicks: range(-4, 3, 1) },
      {
        title: 'Position vs. Time',
        xTitle: 'Time (s)',
        yTitle: 'Position (m)',
        yTitleOffset: 45,
        xLabelsAtAxis: true,
      },
      g =>
        g.series(
          [
            [0, 0],
            [2, 2],
            [3, -3],
            [5, -3],
            [6, -2],
          ],
          { color: VEL, marker: 'diamond' }
        ),
      { width: 680, height: 420 }
    ),

  // 2.1 — Both figures use 70 px/m and the same viewport width, so the
  // passenger's −4.0 m arrow is twice the professor's +2.0 m arrow.
  Figure_02_01_02: () => {
    const svg = new Svg({
      width: 680,
      height: 350,
      title: 'Professor displacement along a whiteboard',
      desc: 'The professor moves right from 1.5 m to 3.5 m, a displacement of +2.0 m.',
    });
    const X = v => 100 + v * 70;
    svg.rect(120, 25, 450, 180, { fill: '#e8f5e9', stroke: COLORS.axis, width: 3 });
    svg.text(470, 65, 'Whiteboard', { size: 16, math: false });
    lecturer(svg, X(1.5), 200);
    lecturer(svg, X(3.5), 200);
    svg.text(X(1.5), 225, 'Initial', { size: 16, math: false });
    svg.text(X(3.5), 225, 'Final', { size: 16, math: false });
    harrow(svg, X(1.5), X(3.5), 275, POS);
    svg.text(X(2.5), 250, 'Δx = x_{\\rm{f}} − x_0 = +2.0 \\rm{m}', { size: 18 });
    positionAxis(svg, X, 290, [
      [1.5, 'x_0'],
      [3.5, 'x_{\\rm{f}}'],
    ]);
    return svg.render();
  },

  Figure_02_01_03: () => {
    const svg = new Svg({
      width: 680,
      height: 350,
      title: 'Passenger displacement relative to the airplane',
      desc: 'A passenger moves from his seat at 6.0 m to the rear at 2.0 m. His displacement is −4.0 m, twice the magnitude of the professor’s displacement.',
    });
    const X = v => 100 + v * 70;
    // Cabin cutaway, with the moving passenger at both actual endpoints.
    svg.rect(180, 20, 420, 160, { fill: '#e3f2fd', stroke: COLORS.axis, width: 2, rx: 12 });
    for (const x of [290, 370, 450, 530]) {
      svg.rect(x, 45, 28, 30, { fill: '#ffffff', stroke: COLORS.axis, rx: 4 });
      svg.rect(x - 5, 115, 16, 40, { fill: '#90a4ae', stroke: COLORS.axis, rx: 3 });
      svg.rect(x, 145, 42, 12, { fill: '#90a4ae', stroke: COLORS.axis, rx: 3 });
    }
    lecturer(svg, X(2), 170, '#2196f3');
    // Seated initial state, directly above x0.
    svg.circle(X(6), 99, 11, { fill: '#ffcc99', stroke: COLORS.black });
    svg.polyline(
      [
        [X(6), 113],
        [X(6), 139],
        [X(6) + 25, 139],
        [X(6) + 28, 164],
      ],
      { color: '#2196f3', width: 9 }
    );
    svg.text(X(2), 195, 'Final: rear', { size: 16, math: false });
    svg.text(X(6), 195, 'Initial: seat', { size: 16, math: false });
    airplane(svg, 340, 218, 0.55);
    harrow(svg, X(6), X(2), 275, POS);
    svg.text(X(4), 250, 'Δx = x_{\\rm{f}} − x_0 = −4.0 \\rm{m}', { size: 18 });
    positionAxis(svg, X, 290, [
      [2, 'x_{\\rm{f}}'],
      [6, 'x_0'],
    ]);
    return svg.render();
  },

  // 2.3 — Include the brief forward segment as well as rearward motion.
  Figure_02_03_02: () => {
    const svg = new Svg({
      width: 720,
      height: 420,
      title: 'Segments of an airplane passenger’s trip',
      desc: 'The passenger moves rearward, rearward again, briefly forward, and then rearward to the final position. The sum of these four displacements is the net rearward displacement.',
    });
    airplane(svg, 360, 80, 2.3);
    svg.text(120, 125, 'Rear', { size: 16, math: false });
    svg.text(600, 125, 'Front', { size: 16, math: false });
    const positions = [550, 440, 330, 420, 250];
    const colors = [POS, COLORS.orange, COLORS.green, COLORS.blue];
    positions.slice(0, -1).forEach((x, i) => {
      const y = 170 + 45 * i;
      harrow(svg, x, positions[i + 1], y, colors[i]);
      svg.text((x + positions[i + 1]) / 2, y - 20, `Δx_{\\rm{${'abcd'[i]}}}`, { size: 17 });
      if (i < 3)
        svg.line(positions[i + 1], y + 5, positions[i + 1], y + 40, {
          color: COLORS.guide,
          dash: '4 4',
          width: 1,
        });
    });
    harrow(svg, positions[0], positions[4], 360, POS);
    svg.text(400, 337, 'Δx_{\\rm{tot}}', { size: 18 });
    svg.arrow(80, 380, 675, 380, { color: COLORS.black, head: 12 });
    svg.text(690, 380, 'x', { size: 18 });
    for (const [x, label] of [
      [550, 'x_0'],
      [250, 'x_{\\rm{f}}'],
    ]) {
      svg.line(x, 372, x, 388);
      svg.text(x, 405, label, { size: 18 });
    }
    return svg.render();
  },

  Figure_02_03_03: () => {
    const svg = new Svg({
      width: 600,
      height: 300,
      title: 'Round trip to the store',
      desc: 'Home and store are 3 km apart. The round trip covers 6 km in 30 min; net displacement and average velocity are zero.',
    });
    svg.rect(0, 225, 600, 75, { fill: '#c8e6c9' });
    svg.rect(60, 180, 80, 50, { fill: '#ffd54f', stroke: COLORS.black, width: 2 });
    svg.polygon(
      [
        [50, 180],
        [100, 140],
        [150, 180],
      ],
      { fill: '#ff6f00', stroke: COLORS.black, width: 2 }
    );
    for (const x of [75, 115]) svg.rect(x, 195, 14, 18, { fill: '#81d4fa', stroke: COLORS.black });
    svg.rect(93, 202, 14, 28, { fill: '#8d6e63', stroke: COLORS.black });
    svg.text(100, 260, 'Home', { size: 18, math: false });
    svg.rect(430, 170, 100, 60, { fill: '#e1bee7', stroke: COLORS.black, width: 2 });
    for (const x of [435, 485]) svg.rect(x, 175, 40, 30, { fill: '#81d4fa', stroke: COLORS.black });
    svg.rect(468, 205, 24, 25, { fill: '#8d6e63', stroke: COLORS.black });
    svg.text(480, 260, 'Store', { size: 18, math: false });
    harrow(svg, 100, 480, 85, COLORS.black);
    harrow(svg, 480, 100, 120, COLORS.black);
    svg.text(290, 60, '3.0 \\rm{km} each way', { size: 18 });
    svg.text(300, 25, 'Δx_{\\rm{tot}} = 0 \\rm{km}', { size: 20, color: POS });
    svg.text(300, 285, 'Distance traveled = 6 km; elapsed time = 30 min', {
      size: 16,
      math: false,
    });
    return svg.render();
  },

  Figure_02_04_03: () => {
    const svg = new Svg({
      width: 720,
      height: 600,
      title: 'Velocity and acceleration in four cases',
      desc: 'Rightward motion speeds up with rightward acceleration and slows with leftward acceleration. Leftward motion slows with rightward acceleration and speeds up with leftward acceleration.',
    });
    const cases = [
      [1, 1, 'Speeding up'],
      [1, -1, 'Slowing down'],
      [-1, 1, 'Slowing down'],
      [-1, -1, 'Speeding up'],
    ];
    cases.forEach(([v, a, label], i) => {
      const y = 85 + i * 140;
      car(svg, 180, y, '#ff8a80', v);
      svg.text(75, y, `(${'abcd'[i]})`, { size: 20, math: false });
      // Common origins and separate rows keep arrows clear of the cars.
      harrow(svg, 390, 390 + v * 85, y - 20, VEL);
      harrow(svg, 390, 390 + a * 65, y + 30, ACC);
      svg.text(500, y - 20, 'v', { size: 20, color: VEL });
      svg.text(500, y + 30, 'a', { size: 20, color: ACC });
      svg.text(600, y, label, { size: 16, math: false });
    });
    svg.arrow(560, 25, 650, 25, { head: 10 });
    svg.text(680, 25, '+x', { size: 17 });
    return svg.render();
  },

  Figure_02_04_07: () => subway(true),
  Figure_02_04_11: () => subway(false),

  Figure_02_05_05: () => {
    const svg = new Svg({
      width: 720,
      height: 330,
      title: 'Airplane slowing under constant acceleration',
      desc: 'At 0 s the velocity is +70.0 m/s; at 40.0 s it is +10.0 m/s. Equal leftward acceleration vectors represent −1.50 m/s² in both states. Velocity vectors have a 7:1 length ratio.',
    });
    [70, 10].forEach((v, i) => {
      const y = 85 + 155 * i;
      airplane(svg, 140, y, 0.9);
      harrow(svg, 285, 285 + 4.5 * v, y - 10, VEL);
      svg.text(285, y - 38, `${i ? 'v' : 'v_0'} = ${v.toFixed(1)} \\rm{m/s}`, {
        size: 18,
        anchor: 'start',
        color: VEL,
      });
      harrow(svg, 365, 285, y + 40, ACC);
      svg.text(390, y + 40, 'a = −1.50 \\rm{m/s}^2', { size: 18, anchor: 'start', color: ACC });
      svg.text(140, y + 50, i ? 't = 40.0 \\rm{s}' : 't_0 = 0 \\rm{s}', { size: 18 });
    });
    return svg.render();
  },

  // 2.5 — All four stopping intervals share an origin and a 4.8 px/m scale.
  Figure_02_05_11: () => {
    const svg = new Svg({
      width: 760,
      height: 700,
      title: 'Braking and total stopping distances',
      desc: 'At 30.0 m/s, braking distances are 64.3 m dry and 90.0 m wet. A 0.500 s reaction adds 15.0 m, making total stopping distances 79.3 m and 105 m.',
    });
    const X = m => 160 + m * 4.8;
    const cases = [
      [64.3, false, 'Dry', POS],
      [90, false, 'Wet', COLORS.blue],
      [79.3, true, 'Dry', POS],
      [105, true, 'Wet', COLORS.blue],
    ];
    svg.text(380, 25, 'Initial speed: 30.0 m/s', { size: 19, math: false });
    cases.forEach(([total, reaction, road, color], i) => {
      const y = 100 + i * 140;
      svg.text(30, y - 22, road, { size: 18, math: false, anchor: 'start' });
      svg.text(30, y + 3, reaction ? 'With reaction' : 'Braking only', {
        size: 15,
        math: false,
        anchor: 'start',
      });
      svg.line(X(0) - 35, y + 20, X(110), y + 20, { color: COLORS.guide });
      if (reaction) {
        svg.rect(X(0), y - 35, X(15) - X(0), 55, { fill: '#fff9c4', stroke: COLORS.orange });
        svg.text((X(0) + X(15)) / 2, y - 45, '15.0 m', { size: 16, math: false });
        svg.line(X(15), y - 35, X(15), y + 27, { color: COLORS.orange, dash: '4 4' });
      }
      car(svg, X(0), y, color);
      car(svg, X(total), y, color);
      const brakeStart = reaction ? 15 : 0;
      interval(svg, X(brakeStart), X(total), y + 40, { tick: 12 });
      svg.text(
        (X(brakeStart) + X(total)) / 2,
        y + 60,
        `${(total - brakeStart).toFixed(1)} m braking`,
        { size: 16, math: false }
      );
      if (reaction) {
        interval(svg, X(0), X(total), y + 83, { tick: 12 });
        svg.text((X(0) + X(total)) / 2, y + 102, `${total} m total`, {
          size: 17,
          math: false,
          color,
        });
      }
    });
    svg.arrow(X(0) - 25, 660, X(113), 660, { head: 10 });
    for (const m of [0, 15, 50, 100]) {
      svg.line(X(m), 654, X(m), 666);
      svg.text(X(m), 682, String(m), { size: 16 });
    }
    svg.text(715, 660, 'x (m)', { size: 16, math: false });
    return svg.render();
  },

  // 2.7 — The two launch directions from Examples 1 and 2.
  Figure_02_07_05: () => {
    const svg = new Svg({
      width: 940,
      height: 590,
      title: 'Rocks thrown upward and downward from a cliff',
      desc: 'Upward launch at +13.0 m/s: at 1, 2 and 3 s the positions are 8.10, 6.40 and −5.10 m and velocities are +3.20, −6.60 and −16.4 m/s. Downward launch at −13.0 m/s also reaches −5.10 m at −16.4 m/s. Up is positive; acceleration is −9.80 m/s² in both panels.',
    });
    const Y = m => 300 - m * 16;
    const drawPanel = (offset, upward) => {
      const L = x => offset + x;
      svg.rect(L(12), 45, 446, 495, { fill: '#e3f2fd' });
      svg.text(L(230), 25, upward ? '(a) Thrown upward' : '(b) Thrown downward', {
        size: 20,
        math: false,
      });
      svg.rect(L(30), 365, 115, 175, { fill: '#c8a882', stroke: COLORS.axis });
      svg.rect(L(30), 365, 115, 10, { fill: '#8bc34a' });
      lecturer(svg, L(115), 365, '#4db6ac');
      // Hand and rock meet at the y = 0 reference level.
      svg.polyline(
        [
          [L(125), 315],
          [L(145), 300],
          [L(180), 300],
        ],
        { color: '#ffcc99', width: 8 }
      );
      svg.arrow(L(40), 285, L(40), 65, { head: 10 });
      svg.text(L(40), 55, '+y', { size: 17 });
      svg.line(L(155), Y(0), L(430), Y(0), { color: POS, dash: '5 4' });
      svg.text(L(425), Y(0) - 15, 'y_0 = 0', { size: 17, anchor: 'end' });
      svg.line(L(155), Y(-5.1), L(430), Y(-5.1), { color: POS, dash: '5 4' });
      svg.text(L(230), 512, 'a = −9.80 \\rm{m/s}^2', { size: 18, color: ACC });
      if (upward) {
        // Slight lateral separation makes the ascent/descent legible; motion
        // is vertical, not a horizontal projectile (as in the raster original).
        const apex = 13 ** 2 / (2 * 9.8);
        svg.path(
          `M ${L(180)} ${Y(0)} L ${L(180)} ${Y(apex) + 20} Q ${L(180)} ${Y(apex)} ${L(200)} ${Y(apex)} Q ${L(220)} ${Y(apex)} ${L(220)} ${Y(apex) + 20} L ${L(220)} 470`,
          { color: COLORS.guide, width: 1.5 }
        );
        [
          [0, 0, 13, 180],
          [1, 8.1, 3.2, 180],
          [2, 6.4, -6.6, 220],
          [3, -5.1, -16.4, 220],
        ].forEach(([t, pos, v, x]) => {
          svg.circle(L(x), Y(pos), 5, { fill: COLORS.black });
          varrow(svg, L(x), Y(pos), Y(pos) - v * 4, VEL);
          const left = t < 2;
          const labelY = t === 0 ? Y(pos) - 65 : Y(pos);
          if (t === 0)
            svg.line(L(165), labelY + 26, L(x) - 7, Y(pos) - 7, { color: COLORS.guide, width: 1 });
          svg.text(L(left ? 165 : 245), labelY - 10, `t = ${t.toFixed(2)} \\rm{s}`, {
            size: 15,
            anchor: left ? 'end' : 'start',
          });
          svg.text(
            L(left ? 165 : 245),
            labelY + 12,
            `v = ${v > 0 ? '+' : '−'}${Math.abs(v).toFixed(t === 3 ? 1 : 2)} \\rm{m/s}`,
            { size: 15, anchor: left ? 'end' : 'start', color: VEL }
          );
          if (t > 0)
            svg.text(
              L(left ? 165 : 245),
              Y(pos) + 34,
              `y = ${pos < 0 ? '−' : ''}${Math.abs(pos).toFixed(2)} \\rm{m}`,
              { size: 15, anchor: left ? 'end' : 'start' }
            );
        });
      } else {
        svg.line(L(180), Y(0), L(180), 470, { color: COLORS.guide });
        for (const [pos, v] of [
          [0, -13],
          [-5.1, -Math.sqrt(13 ** 2 + 2 * 9.8 * 5.1)],
        ]) {
          svg.circle(L(180), Y(pos), 5, { fill: COLORS.black });
          varrow(svg, L(180), Y(pos), Y(pos) - v * 4, VEL);
          svg.text(L(205), Y(pos) + 20, `v = −${Math.abs(v).toFixed(1)} \\rm{m/s}`, {
            size: 17,
            anchor: 'start',
            color: VEL,
          });
          if (pos)
            svg.text(L(205), Y(pos) + 48, 'y = −5.10 \\rm{m}', { size: 17, anchor: 'start' });
        }
      }
    };
    drawPanel(0, true);
    drawPanel(470, false);
    svg.text(
      470,
      565,
      'Same velocity at the same height below release; trajectory legs separated for clarity.',
      { size: 17, math: false }
    );
    return svg.render();
  },
};
