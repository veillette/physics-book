/** Second batch of animated companions for chapters 1–13.
 * Same contract as animations01to13.js: analytic, self-contained SMIL with an
 * independently drawn static frame for print and reduced motion. Source figures
 * narrower than 450 units get a standalone companion instead of an inset, so the
 * original drawing is not enlarged with it.
 */
import {
  C,
  clamp,
  dot,
  line,
  rect,
  text,
  path,
  polygon,
  arrow,
  visible,
  series,
  panel,
  standalone,
  appendAnimation,
} from './animation-svg.js';
import {
  trainMotion,
  jetCarMotion,
  topSpeedMotion,
  constantAcceleration,
  vectorSum,
  tightropeTension,
  twoWireTensions,
  exchangeMotion,
  dragFall,
  startingForce,
  tendonStress,
  ellipsePoint,
  inverseSquare,
  hillHeight,
  coastingLength,
  coastingEnergy,
  coastingDistance,
  rockOnSpring,
  rockInDirt,
  elasticCollision,
  darkRoomCollision,
  bicepsForce,
  poleHandForces,
  sandwichChainTension,
  twinSkaters,
  merryGoRound,
  hullDraft,
  arterialPressure,
  cuffPressure,
  channelPosition,
  subcriticalIsotherm,
  oxygenVolume,
  waterDensity,
  tireState,
} from './animation-models.js';

const rad = degrees => (degrees * Math.PI) / 180;
// Linear maps from data to drawing coordinates for a plot box with origin (ox, oy).
const plot = (ox, oy, w, h, [x0, x1], [y0, y1]) => ({
  X: v => ox + ((v - x0) / (x1 - x0)) * w,
  Y: v => oy - ((v - y0) / (y1 - y0)) * h,
});
// Readouts must keep constant text across frames, so every value is drawn and
// only the current one is visible.
const pick = (x, y, labels, index, size = 17, color = C.ink, anchor = 'middle') =>
  labels.map((label, i) => visible(i === index, text(x, y, label, size, color, anchor))).join('');
const nearest = (values, v) =>
  values.reduce((best, x, i) => (Math.abs(x - v) < Math.abs(values[best] - v) ? i : best), 0);
// Horizontal bar that never receives a negative width.
const bar = (x, y, w, h, color) =>
  w >= 0 ? rect(x, y, w, h, color, 'none') : rect(x + w, y, -w, h, color, 'none');
const vbar = (x, y, h, w, color) =>
  h >= 0 ? rect(x, y - h, w, h, color, 'none') : rect(x, y, w, -h, color, 'none');
// Opacity that is zero near both ends of a cycle, so wrap-around jumps stay hidden.
const fadeEnds = phase => clamp((phase - 0.04) / 0.06) * clamp((0.96 - phase) / 0.06);
const wrap = x => x - Math.floor(x);
// Reflecting motion between lo and hi; continuous in time.
const bounce = (x, lo, hi) => {
  const span = hi - lo,
    u = wrap((x - lo) / (2 * span)) * 2 * span;
  return lo + (u <= span ? u : 2 * span - u);
};
const stick = (x, y, scale = 1, color = C.ink) =>
  dot(x, y - 62 * scale, 9 * scale, color) +
  line(x, y - 53 * scale, x, y - 22 * scale, color, 4) +
  line(x, y - 45 * scale, x - 16 * scale, y - 30 * scale, color, 3) +
  line(x, y - 45 * scale, x + 16 * scale, y - 30 * scale, color, 3) +
  line(x, y - 22 * scale, x - 12 * scale, y, color, 3) +
  line(x, y - 22 * scale, x + 12 * scale, y, color, 3);
// Axis labels sit inside the plot box: below the axis they would fall outside the clip.
const axes2 = (x, y, w, h, xLabel, yLabel) =>
  arrow(x, y, w, 0, C.ink, 1.5) +
  arrow(x, y, 0, -h, C.ink, 1.5) +
  text(x + w, y - 8, xLabel, 14, C.ink, 'end') +
  text(x + 8, y - h + 10, yLabel, 14, C.ink, 'start');
const SUP = {
  '-': '⁻',
  0: '⁰',
  1: '¹',
  2: '²',
  3: '³',
  4: '⁴',
  5: '⁵',
  6: '⁶',
  7: '⁷',
  8: '⁸',
  9: '⁹',
};
const power = n => `10${String(n).replace(/./g, ch => SUP[ch])}`;

// ── Chapter 1 ────────────────────────────────────────────────────────────────

function scales(t) {
  const lo = -15,
    hi = 26,
    X = e => 70 + ((e - lo) / (hi - lo)) * 760,
    e = lo + (hi - lo) * t;
  const objects = [
    [-15, 'proton'],
    [-10, 'atom'],
    [-7, 'virus'],
    [-5, 'cell'],
    [0, 'person'],
    [7, 'Earth'],
    [8.58, 'Earth–Moon'],
    [11.2, 'Earth–Sun'],
    [16, 'light-year'],
    [21, 'Milky Way'],
    [26, 'observable universe'],
  ];
  let b = line(70, 215, 830, 215, C.ink, 2);
  for (let n = lo; n <= hi; n += 1) b += line(X(n), 209, X(n), n % 5 ? 215 : 223, C.ink, 1);
  for (let n = -15; n <= 25; n += 5) b += text(X(n), 245, power(n), 15);
  b += text(830, 270, 'meters', 14, C.guide, 'end');
  objects.forEach(([value, name], i) => {
    const y = 185 - (i % 3) * 32;
    b +=
      line(X(value), y + 6, X(value), 212, C.grid, 1) +
      dot(X(value), 212, 4, C.guide) +
      visible(e >= value, dot(X(value), 212, 6, C.gold)) +
      text(X(value), y, name, 14, C.ink, i === objects.length - 1 ? 'end' : 'middle');
  });
  b += line(X(e), 80, X(e), 228, C.blue, 2) + dot(X(e), 215, 7, C.blue);
  const passed = objects.reduce((n, [value], i) => (e >= value ? i : n), 0);
  b +=
    text(450, 300, 'Now passing:', 16, C.guide, 'end') +
    pick(
      460,
      300,
      objects.map(([, name]) => name),
      passed,
      18,
      C.blue,
      'start'
    );
  return panel(
    'Zoom through 41 orders of magnitude',
    b,
    'Logarithmic scale: each tick is ten times the last. Sizes and distances are orders of magnitude, from a proton to the observable universe.'
  );
}

function cesiumClock(t) {
  const wave = series(
    q => [100 + 600 * q, 140 - 45 * Math.sin(2 * Math.PI * (10 * q - 6 * t))],
    240
  );
  let b =
    text(400, 70, 'Cesium-133 transition frequency: 9 192 631 770 Hz', 18) +
    path(wave, C.purple, 'none', 2.5) +
    line(100, 140, 700, 140, C.grid, 1);
  b += rect(100, 225, 600, 26, 'white', C.ink) + bar(100, 225, 600 * t, 26, C.gold);
  for (let i = 0; i <= 10; i += 1)
    b +=
      line(100 + 60 * i, 251, 100 + 60 * i, 260, C.ink, 1) +
      text(100 + 60 * i, 278, (i / 10).toFixed(1), 13);
  b +=
    text(400, 212, 'Counted cycles accumulate into elapsed time', 16) +
    text(720, 244, '1 s =', 16, C.ink, 'start') +
    text(720, 266, '9 192 631 770 cycles', 14, C.ink, 'start') +
    text(400, 300, 'Elapsed time (s)', 14, C.guide);
  return panel(
    'An atomic clock counts oscillations',
    b,
    'The wave is slowed by about a billion times. The second is defined as exactly 9 192 631 770 periods of this cesium radiation.'
  );
}

// ── Chapter 2 ────────────────────────────────────────────────────────────────

function train(t) {
  const time = 50 * t,
    s = trainMotion(time),
    trackX = x => 70 + (x / 290) * 760;
  let b = line(70, 112, 830, 112, C.ink, 2);
  for (let x = 0; x <= 250; x += 50)
    b +=
      line(trackX(x), 112, trackX(x), 120, C.ink, 1) + text(trackX(x), 136, `${x} m`, 12, C.guide);
  b +=
    rect(trackX(s.x) - 34, 88, 34, 22, C.red) +
    arrow(trackX(s.x) - 17, 78, s.v * 9, 0, C.green) +
    arrow(trackX(s.x) - 17, 64, s.a * 40, 0, C.purple);
  const graphs = [
    ['Position (m)', [0, 290], q => trainMotion(q).x, C.blue],
    ['Velocity (m/s)', [0, 9], q => trainMotion(q).v, C.green],
    ['Acceleration (m/s²)', [-1.2, 0.6], q => trainMotion(q).a, C.purple],
  ];
  graphs.forEach(([label, range, fn, color], i) => {
    const ox = 80 + i * 275,
      g = plot(ox, 300, 220, 120, [0, 50], range);
    b +=
      axes2(ox, 300, 225, 128, 't (s)', '') +
      text(ox + 110, 162, label, 14, color) +
      (range[0] < 0 ? line(ox, g.Y(0), ox + 220, g.Y(0), C.grid, 1) : '') +
      path(
        series(q => [g.X(50 * q), g.Y(fn(50 * q))], 100),
        C.grid,
        'none',
        2
      ) +
      path(
        series(q => [g.X(time * q), g.Y(fn(time * q))], 100),
        color,
        'none',
        2.5
      ) +
      dot(g.X(time), g.Y(fn(time)), 5, color);
  });
  const phase = time < 20 ? 0 : time < 40 ? 1 : time < 48 ? 2 : 3;
  b += pick(
    830,
    66,
    [
      'Speeding up: a = +0.417 m/s²',
      'Constant velocity: a = 0',
      'Slowing: a = −1.04 m/s²',
      'Stopped',
    ],
    phase,
    15,
    C.ink,
    'end'
  );
  return panel(
    'One clock drives the train and all three graphs',
    b,
    'Subway train: 0 to 30 km/h in 20 s, cruise to 40 s, stop at 48 s. The slope of each graph is the value plotted on the next one.'
  );
}

function jetArea(t) {
  const time = 30 * t,
    s = jetCarMotion(time),
    v = plot(90, 295, 330, 210, [0, 30], [0, 170]),
    x = plot(520, 295, 330, 210, [0, 30], [0, 3200]);
  const area = [
    [v.X(0), v.Y(0)],
    ...series(q => [v.X(time * q), v.Y(jetCarMotion(time * q).v)], 30),
    [v.X(time), v.Y(0)],
  ];
  let b =
    axes2(90, 295, 340, 220, 't (s)', 'v (m/s)') +
    polygon(area, C.fill, C.blue) +
    line(v.X(0), v.Y(15), v.X(30), v.Y(165), C.green, 2.5) +
    dot(v.X(time), v.Y(s.v), 6, C.green);
  b +=
    axes2(520, 295, 340, 220, 't (s)', 'x (m)') +
    path(
      series(q => [x.X(30 * q), x.Y(jetCarMotion(30 * q).x)]),
      C.grid,
      'none',
      2
    ) +
    path(
      series(q => [x.X(time * q), x.Y(jetCarMotion(time * q).x)]),
      C.ink,
      'none',
      2.5
    ) +
    line(x.X(0), x.Y(200), x.X(30), x.Y(200), C.guide, 1, '5 4') +
    line(x.X(time), x.Y(200), x.X(time), x.Y(s.x), C.blue, 5) +
    dot(x.X(time), x.Y(s.x), 6, C.ink);
  for (const n of [0, 10, 20, 30])
    b += text(v.X(n), 314, String(n), 12) + text(x.X(n), 314, String(n), 12);
  b +=
    text(250, 100, 'Shaded area = Δx', 17, C.blue) +
    text(690, 100, 'Blue bar = x − 200 m = Δx', 17, C.blue) +
    text(690, 270, 'x₀ = 200 m', 13, C.guide);
  return panel(
    'Area under the velocity graph is the displacement',
    b,
    'Jet car with constant acceleration: v = 15 + 5.0t m/s, x = 200 + 15t + 2.5t² m. The shaded area and the blue bar always match.'
  );
}

function topSpeed(t) {
  const time = 4 + 60 * t,
    s = topSpeedMotion(time),
    v = plot(90, 295, 360, 220, [0, 70], [160, 260]),
    a = plot(530, 295, 320, 220, [0, 70], [0, 5.5]);
  let b =
    axes2(90, 295, 370, 230, 't (s)', 'v (m/s)') +
    path(
      series(q => [v.X(70 * q), v.Y(topSpeedMotion(70 * q).v)]),
      C.green,
      'none',
      2.5
    );
  const t0 = time - 10,
    t1 = time + 10;
  b +=
    line(v.X(t0), v.Y(s.v - 10 * s.a), v.X(t1), v.Y(s.v + 10 * s.a), C.ink, 2) +
    line(v.X(t0), v.Y(s.v - 10 * s.a), v.X(t1), v.Y(s.v - 10 * s.a), C.guide, 1, '4 3') +
    line(v.X(t1), v.Y(s.v - 10 * s.a), v.X(t1), v.Y(s.v + 10 * s.a), C.guide, 1, '4 3') +
    dot(v.X(time), v.Y(s.v), 6, C.ink);
  b +=
    axes2(530, 295, 330, 230, 't (s)', 'a (m/s²)') +
    path(
      series(q => [a.X(70 * q), a.Y(topSpeedMotion(70 * q).a)]),
      C.grid,
      'none',
      2
    ) +
    path(
      series(q => [a.X(time * q), a.Y(topSpeedMotion(time * q).a)]),
      C.purple,
      'none',
      2.5
    ) +
    dot(a.X(time), a.Y(s.a), 6, C.purple) +
    line(v.X(time), v.Y(s.v), a.X(time), a.Y(s.a), C.grid, 1, '3 4');
  for (const n of [0, 20, 40, 60])
    b += text(v.X(n), 314, String(n), 12) + text(a.X(n), 314, String(n), 12);
  b +=
    text(270, 98, 'Tangent slope = a', 17) +
    text(690, 98, 'Slope read off at each time', 17, C.purple);
  return panel(
    'The tangent flattens as the jet car nears top speed',
    b,
    'Smooth model of the tabulated run: v = 250 − 85e^(−t/17 s) m/s, so a starts at 5.0 m/s² and falls toward zero.'
  );
}

// Shared drawing for the "knowns" sketches: object, its v and a arrows, and v(t).
function knowns({
  title,
  note,
  v0,
  a,
  duration,
  scale,
  vScale,
  aScale,
  start = 450,
  vertical,
  units,
  vLabel,
  aLabel,
}) {
  return t => {
    const time = duration * t,
      s = constantAcceleration(v0, a, time),
      end = constantAcceleration(v0, a, duration);
    const along = x => (vertical ? [160, 80 - x * scale] : [start + x * scale, 120]);
    let b = '';
    if (vertical)
      b += line(160, 70, 160, 315, C.grid, 2) + text(160, 60, 'release point', 13, C.guide);
    else b += line(70, 120, 830, 120, C.grid, 2);
    for (let i = 0; i <= 4; i += 1) {
      const [px, py] = along(constantAcceleration(v0, a, (duration * i) / 4).x);
      b += visible(time >= (duration * i) / 4 - 1e-9, dot(px, py, 3, C.guide));
    }
    const [x, y] = along(s.x);
    const vArrow = vertical ? [0, -s.v * vScale] : [s.v * vScale, 0],
      aArrow = vertical ? [0, -a * aScale] : [a * aScale, 0];
    b +=
      dot(x, y, 10, C.red) +
      arrow(vertical ? x + 25 : x, vertical ? y : y - 28, ...vArrow, C.green) +
      arrow(vertical ? x + 45 : x, vertical ? y : y + 30, ...aArrow, C.purple);
    const g = plot(
      vertical ? 360 : 430,
      vertical ? 300 : 305,
      vertical ? 420 : 380,
      110,
      [0, duration],
      [Math.min(0, v0, end.v), Math.max(0, v0, end.v)]
    );
    b +=
      line(g.X(0), g.Y(0), g.X(duration), g.Y(0), C.grid, 1) +
      line(g.X(0), g.Y(Math.min(0, v0, end.v)), g.X(0), g.Y(Math.max(0, v0, end.v)), C.ink, 1.5) +
      line(g.X(0), g.Y(v0), g.X(duration), g.Y(end.v), C.grid, 2) +
      line(g.X(0), g.Y(v0), g.X(time), g.Y(s.v), C.green, 2.5) +
      dot(g.X(time), g.Y(s.v), 5, C.green) +
      text(
        g.X(duration),
        g.Y(Math.max(0, v0, end.v)) - 8,
        `t (s), 0 to ${duration}`,
        12,
        C.guide,
        'end'
      ) +
      text(g.X(0) - 8, g.Y(Math.max(0, v0, end.v)) + 4, `v (${units})`, 12, C.green, 'end');
    b +=
      text(vertical ? 360 : 80, vertical ? 95 : 175, vLabel, 16, C.green, 'start') +
      text(vertical ? 360 : 80, vertical ? 125 : 200, aLabel, 16, C.purple, 'start');
    return panel(title, b, note);
  };
}

const horse = knowns({
  title: 'Racehorse: velocity grows westward',
  note: 'From rest to 15.0 m/s west in 1.80 s: a = −8.33 m/s². Gray dots mark equal time intervals; +x is east.',
  v0: 0,
  a: -15 / 1.8,
  duration: 1.8,
  scale: 28,
  vScale: 9,
  aScale: 9,
  start: 640,
  units: 'm/s',
  vLabel: 'Green: velocity, 0 → −15.0 m/s',
  aLabel: 'Purple: constant acceleration, west',
});
const subway = knowns({
  title: 'Subway train: velocity shrinks to zero',
  note: 'From 30.0 km/h (8.33 m/s) to rest in 8.00 s: a = −1.04 m/s², opposite the velocity. Gray dots mark equal time intervals.',
  v0: 30 / 3.6,
  a: -30 / 3.6 / 8,
  duration: 8,
  scale: 9.5,
  vScale: 9,
  aScale: 40,
  units: 'm/s',
  vLabel: 'Green: velocity, 8.33 m/s → 0',
  aLabel: 'Purple: acceleration points backward',
});
const rockDown = knowns({
  title: 'Rock thrown down: speed keeps growing',
  note: 'v₀ = −13.0 m/s and a = −9.80 m/s² point the same way, so the speed rises to 22.8 m/s after 1.00 s. +y is up.',
  v0: -13,
  a: -9.8,
  duration: 1,
  scale: 9,
  vScale: 3.5,
  aScale: 3.5,
  vertical: true,
  units: 'm/s',
  vLabel: 'Green: velocity, −13.0 → −22.8 m/s',
  aLabel: 'Purple: a = −9.80 m/s², unchanged',
});

function proportional(t) {
  const time = (1 / 1.2) * t,
    g = plot(470, 300, 360, 230, [0, 6], [0, 5]),
    speeds = [1.2, 2.4, 3.6, 4.8];
  let b = '';
  speeds.forEach((v, i) => {
    const y = 90 + i * 55;
    b +=
      line(70, y + 14, 400, y + 14, C.grid, 1) +
      dot(80 + 60 * v * time, y, 8, [C.blue, C.green, C.purple, C.red][i]) +
      text(70, y - 14, `${v.toFixed(1)} m/s`, 13, C.guide, 'start');
  });
  for (let m = 0; m <= 5; m += 1) b += text(80 + 60 * m, 318, `${m} m`, 12, C.guide);
  b +=
    axes2(470, 300, 370, 240, 'v̄ (m/s)', 'Δx (m)') +
    line(g.X(0), g.Y(0), g.X(6), g.Y(6 * time), C.ink, 2, '5 4');
  speeds.forEach((v, i) => {
    b += dot(g.X(v), g.Y(v * time), 6, [C.blue, C.green, C.purple, C.red][i]);
  });
  b += text(650, 82, 'Slope of the line = elapsed time t', 16);
  return panel(
    'For a given time, displacement is proportional to average velocity',
    b,
    'Δx = v̄t. All four runners share one clock; at t = 0.833 s the points match the figure: 1.2 m/s → 1 m, 4.8 m/s → 4 m.'
  );
}

// ── Chapter 3 ────────────────────────────────────────────────────────────────

function walker(t) {
  const block = 36,
    ox = 110,
    oy = 300,
    walked = 14 * t,
    wx = Math.min(walked, 9),
    wy = Math.max(0, walked - 9);
  let b = '';
  for (let i = 0; i <= 9; i += 1)
    b += line(ox + i * block, oy, ox + i * block, oy - 5 * block, C.grid, 1);
  for (let j = 0; j <= 5; j += 1)
    b += line(ox, oy - j * block, ox + 9 * block, oy - j * block, C.grid, 1);
  b +=
    path(
      [
        [ox, oy],
        [ox + wx * block, oy],
        [ox + wx * block, oy - wy * block],
      ],
      C.gold,
      'none',
      5
    ) +
    arrow(ox, oy, wx * block, -wy * block, C.blue, 2.5) +
    dot(ox + wx * block, oy - wy * block, 7, C.ink);
  const hx = ox + 9 * block * t,
    hy = oy - 5 * block * t;
  b +=
    line(ox, oy, ox + 9 * block, oy - 5 * block, C.purple, 1.5, '6 5') +
    rect(hx - 12, hy - 6, 24, 10, C.purple) +
    line(hx - 18, hy - 9, hx + 18, hy - 9, C.purple, 2);
  b += rect(560, 120, 280, 18, 'white', C.grid) + bar(560, 120, 20 * walked, 18, C.gold);
  b +=
    rect(560, 200, 280, 18, 'white', C.grid) + bar(560, 200, 20 * Math.hypot(wx, wy), 18, C.blue);
  b +=
    text(560, 110, 'Walker’s distance → 14 blocks', 15, C.gold, 'start') +
    text(560, 190, 'Walker’s displacement → 10.3 blocks', 15, C.blue, 'start') +
    text(560, 250, 'Helicopter: straight 10.3 blocks', 15, C.purple, 'start') +
    text(560, 272, 'at 29.1° north of east', 15, C.purple, 'start');
  return panel(
    'Distance walked versus straight-line displacement',
    b,
    'Walker: 9 blocks east, then 5 north. The helicopter and the walker arrive together; only the walker’s path length reaches 14 blocks.'
  );
}

function rotatingVector(t) {
  const theta = 2 * Math.PI * t,
    ox = 220,
    oy = 185,
    A = 120,
    ax = A * Math.cos(theta),
    ay = A * Math.sin(theta);
  let b = `${
    line(ox - 150, oy, ox + 150, oy, C.ink, 1.5) + line(ox, oy + 125, ox, oy - 132, C.ink, 1.5)
  }<circle cx="${ox}" cy="${oy}" r="${A}" fill="none" stroke="${C.grid}" stroke-width="1"/>${arrow(
    ox,
    oy,
    ax,
    0,
    C.blue,
    4
  )}${arrow(ox + ax, oy, 0, -ay, C.red, 4)}${arrow(ox, oy, ax, -ay, C.ink, 3)}${text(
    ox + 158,
    oy + 5,
    'x',
    15,
    C.ink,
    'start'
  )}${text(ox + 8, oy - 122, 'y', 15, C.ink, 'start')}`;
  const g = plot(470, 185, 380, 110, [0, 2 * Math.PI], [0, 1]);
  b +=
    line(470, 185, 850, 185, C.ink, 1.5) +
    path(
      series(q => [g.X(theta * q), g.Y(Math.cos(theta * q))], 90),
      C.blue,
      'none',
      2.5
    ) +
    path(
      series(q => [g.X(theta * q), g.Y(Math.sin(theta * q))], 90),
      C.red,
      'none',
      2.5
    ) +
    dot(g.X(theta), g.Y(Math.cos(theta)), 5, C.blue) +
    dot(g.X(theta), g.Y(Math.sin(theta)), 5, C.red);
  for (const [v, label] of [
    [Math.PI / 2, '90°'],
    [Math.PI, '180°'],
    [1.5 * Math.PI, '270°'],
    [2 * Math.PI, '360°'],
  ])
    b += line(g.X(v), 180, g.X(v), 190, C.ink, 1) + text(g.X(v), 312, label, 12);
  b +=
    text(480, 70, 'Aₓ / A = cos θ', 16, C.blue, 'start') +
    text(680, 70, 'Aᵧ / A = sin θ', 16, C.red, 'start');
  const quadrant = Math.min(3, Math.floor(theta / (Math.PI / 2)));
  b += pick(
    385,
    305,
    ['Aₓ > 0, Aᵧ > 0', 'Aₓ < 0, Aᵧ > 0', 'Aₓ < 0, Aᵧ < 0', 'Aₓ > 0, Aᵧ < 0'],
    quadrant,
    15,
    C.ink,
    'end'
  );
  return panel(
    'Components follow the vector around a full turn',
    b,
    'Aₓ = A cos θ and Aᵧ = A sin θ; each component changes sign in two quadrants. The magnitude A never changes.'
  );
}

const walkSum = vectorSum([
  [53, 20],
  [34, 63],
]);
function componentAddition(t) {
  const k = 3.2,
    ox = 110,
    oy = 300,
    [[ax, ay], [bx, by]] = walkSum.parts;
  const slide = clamp((t - 0.25) / 0.3),
    rise = clamp((t - 0.25) / 0.3);
  let b = axes2(ox, oy, 470, 260, 'x (east)', 'y (north)');
  b +=
    arrow(ox, oy, ax * k, -ay * k, C.red, 3) +
    arrow(ox + ax * k, oy - ay * k, bx * k, -by * k, C.green, 3);
  b +=
    visible(t > 0.08, line(ox, oy - ay * k, ox + ax * k, oy - ay * k, C.red, 1, '4 3')) +
    visible(
      t > 0.08,
      line(ox + ax * k, oy - ay * k, ox + (ax + bx) * k, oy - ay * k, C.green, 1, '4 3')
    );
  // x components slide down onto the axis; y components slide right onto x = Rx.
  const bxY = oy - ay * k * (1 - slide);
  b +=
    arrow(ox, oy + 12, ax * k, 0, C.red, 4) +
    arrow(ox + ax * k, bxY + 12 * slide, bx * k, 0, C.green, 4);
  const ayX = ox + ax * k + bx * k * rise;
  b +=
    arrow(ayX, oy, 0, -ay * k, C.red, 4) +
    arrow(ox + (ax + bx) * k + 12 * rise, oy - ay * k, 0, -by * k, C.green, 4);
  b += visible(t > 0.6, arrow(ox, oy, walkSum.x * k, -walkSum.y * k, C.blue, 3.5));
  b +=
    text(620, 110, 'Rₓ = Aₓ + Bₓ = 65.2 m', 17, C.ink, 'start') +
    text(620, 145, 'Rᵧ = Aᵧ + Bᵧ = 48.4 m', 17, C.ink, 'start') +
    visible(t > 0.6, text(620, 195, 'R = 81.2 m at 36.6°', 18, C.blue, 'start')) +
    text(620, 240, 'A: 53.0 m at 20.0°', 15, C.red, 'start') +
    text(620, 265, 'B: 34.0 m at 63.0°', 15, C.green, 'start');
  return panel(
    'Add vectors by adding their components',
    b,
    'Each component slides along its own axis and keeps its length. Rₓ and Rᵧ then fix the resultant’s magnitude and direction.'
  );
}

const walkDifference = vectorSum([
  [53, 20],
  [34, 243],
]);
function vectorSubtraction(t) {
  const k = 3.0,
    ox = 140,
    oy = 200,
    [[ax, ay]] = walkDifference.parts,
    turn = rad(63 + 180 * clamp((t - 0.15) / 0.35));
  let b =
    line(70, oy, 560, oy, C.ink, 1.5) +
    line(ox, 60, ox, 315, C.ink, 1.5) +
    arrow(ox, oy, ax * k, -ay * k, C.red, 3) +
    arrow(ox + ax * k, oy - ay * k, 34 * k * Math.cos(turn), -34 * k * Math.sin(turn), C.green, 3);
  b +=
    visible(
      t > 0.15 && t < 0.5,
      text(ox + ax * k + 40, oy - ay * k - 70, 'B turns around', 15, C.green)
    ) +
    visible(t >= 0.5, text(ox + ax * k + 22, oy - ay * k + 120, '−B', 18, C.green)) +
    visible(t > 0.6, arrow(ox, oy, walkDifference.x * k, -walkDifference.y * k, C.blue, 3.5));
  b +=
    text(600, 100, '−B: same length, opposite direction', 15, C.green, 'start') +
    text(600, 140, 'Rₓ = Aₓ + (−Bₓ) = 34.4 m', 16, C.ink, 'start') +
    text(600, 170, 'Rᵧ = Aᵧ + (−Bᵧ) = −12.2 m', 16, C.ink, 'start') +
    visible(t > 0.6, text(600, 215, 'R = A − B = 36.5 m', 17, C.blue, 'start')) +
    visible(t > 0.6, text(600, 240, 'at 19.5° south of east', 17, C.blue, 'start'));
  return panel(
    'Subtracting B means adding −B',
    b,
    'A = 53.0 m at 20.0°, B = 34.0 m at 63.0°. Rotating B by 180° gives −B; head-to-tail addition then gives A − B.'
  );
}

// ── Chapter 4 ────────────────────────────────────────────────────────────────

function tightrope(t) {
  const degrees = 30 - 25 * clamp(t / 0.7),
    theta = rad(degrees),
    sag = 300 * Math.tan(theta),
    ratio = tightropeTension(1, degrees),
    k = 36,
    mid = [450, 90 + sag];
  let b =
    rect(120, 85, 30, 230, C.guide, 'none') +
    rect(750, 85, 30, 230, C.guide, 'none') +
    line(150, 90, mid[0], mid[1], C.ink, 2) +
    line(mid[0], mid[1], 750, 90, C.ink, 2) +
    stick(mid[0], mid[1], 0.8);
  b +=
    arrow(mid[0], mid[1], -k * ratio * Math.cos(theta), -k * ratio * Math.sin(theta), C.blue, 3) +
    arrow(mid[0], mid[1], k * ratio * Math.cos(theta), -k * ratio * Math.sin(theta), C.blue, 3) +
    arrow(mid[0], mid[1] + 4, 0, k, C.red, 3);
  b += line(800, 300, 870, 300, C.ink, 1) + vbar(815, 300, 36 * Math.min(ratio, 6), 20, C.blue);
  b +=
    vbar(845, 300, 36 * 0.5, 20, C.red) +
    text(825, 318, 'T', 13, C.blue) +
    text(855, 318, 'w/2', 12, C.red);
  const angles = [30, 25, 20, 15, 10, 5],
    i = nearest(angles, degrees);
  b += pick(
    450,
    305,
    angles.map(a => `θ = ${a}°: T = ${tightropeTension(1, a).toFixed(2)} w`),
    i,
    18,
    C.blue
  );
  return panel(
    'Less sag means much more tension',
    b,
    'T = w / (2 sin θ): the two vertical components must still add to w. At 5.0°, a 70.0-kg walker needs 3.94 kN in each half of the wire.'
  );
}

function trafficLight(t) {
  const k = 0.6,
    { t1, t2 } = twoWireTensions(147, 30, 45),
    L = [300, 190],
    c1 = [k * t1 * Math.cos(rad(30)), k * t1 * Math.sin(rad(30))],
    c2 = [k * t2 * Math.cos(rad(45)), k * t2 * Math.sin(rad(45))],
    w = 147 * k;
  const slide = clamp((t - 0.45) / 0.25),
    lerp = (a, b) => a + (b - a) * slide,
    show = t > 0.25,
    centre = [L[0], L[1] + 31];
  let b =
    rect(80, 70, 20, 245, C.guide, 'none') +
    rect(420, 66, 20, 249, C.guide, 'none') +
    line(100, 75, L[0], L[1], C.ink, 1.5) +
    line(L[0], L[1], 420, 70, C.ink, 1.5) +
    rect(L[0] - 14, L[1], 28, 62, C.ink) +
    dot(L[0], L[1] + 14, 6, C.red) +
    dot(L[0], L[1] + 31, 6, C.gold) +
    dot(L[0], L[1] + 48, 6, C.green);
  b +=
    arrow(L[0], L[1], -c1[0], -c1[1], C.blue, 3) +
    arrow(L[0], L[1], c2[0], -c2[1], C.purple, 3) +
    arrow(centre[0], centre[1], 0, w, C.red, 3);
  b +=
    visible(show, arrow(lerp(L[0], 700), lerp(L[1], 110), -c1[0], 0, C.blue, 2.5)) +
    visible(show, arrow(lerp(L[0], 700), lerp(L[1], 110), c2[0], 0, C.purple, 2.5)) +
    visible(show, arrow(lerp(L[0], 650), lerp(L[1], 300), 0, -c1[1], C.blue, 2.5)) +
    visible(show, arrow(lerp(L[0], 650), lerp(L[1], 300 - c1[1]), 0, -c2[1], C.purple, 2.5)) +
    arrow(720, 300 - w, 0, w, C.red, 2.5);
  b +=
    text(700, 80, 'x: T₁ₓ = T₂ₓ = 93.2 N', 16) +
    text(635, 250, 'T₁ᵧ + T₂ᵧ', 15, C.ink, 'end') +
    text(735, 250, '= w = 147 N', 15, C.red, 'start') +
    text(L[0] - 105, L[1] - 15, 'T₁ = 108 N', 15, C.blue) +
    text(L[0] + 85, L[1] - 20, 'T₂ = 132 N', 15, C.purple, 'start') +
    text(L[0] + 22, L[1] + 110, 'w = 147 N', 15, C.red, 'start');
  return panel(
    'Resolve each tension, then balance x and y separately',
    b,
    '15.0-kg traffic light, wires at 30° and 45°. The horizontal parts cancel; the vertical parts add up to the weight. Force arrows share one scale.'
  );
}

function exchange(t) {
  const time = 3 * t,
    s = exchangeMotion(time, { m: 5, M: 60, u: 6, throwAt: 0.5, catchAt: 1.5 }),
    A = 220 + 50 * s.thrower,
    B = 560 + 50 * (s.catcher - 6),
    ball = 240 + 50 * s.ball;
  let b =
    line(60, 285, 840, 285, C.fill, 6) + stick(A, 280) + stick(B, 280) + dot(ball, 228, 9, C.gold);
  b +=
    arrow(A, 300, (s.thrower < 0 ? -0.5 : 0) * 120, 0, C.blue) +
    arrow(B, 300, (time >= 1.5 ? 30 / 65 : 0) * 120, 0, C.blue);
  const pScale = 2.6,
    inFlight = time >= 0.5 && time < 1.5;
  b +=
    line(650, 70, 650, 170, C.ink, 1) +
    bar(650, 82, (time >= 0.5 ? -30 : 0) * pScale, 16, C.blue) +
    bar(650, 112, (inFlight ? 30 : 0) * pScale, 16, C.gold) +
    bar(650, 142, (time >= 1.5 ? 30 : 0) * pScale, 16, C.purple) +
    text(560, 95, 'thrower', 13, C.blue, 'end') +
    text(560, 125, 'ball', 13, C.gold, 'end') +
    text(560, 155, 'catcher + ball', 13, C.purple, 'end') +
    text(650, 190, 'momentum (kg·m/s); total stays 0', 13, C.guide);
  b += pick(
    300,
    80,
    ['Ready to throw', 'Ball in flight: thrower recoils', 'Caught: both skaters move apart'],
    time < 0.5 ? 0 : time < 1.5 ? 1 : 2,
    17
  );
  return panel(
    'Exchanging a ball pushes two skaters apart',
    b,
    '60-kg skaters on frictionless ice; a 5.0-kg ball thrown at 6.0 m/s. A model of a repulsive force carried by an exchanged object. The ball’s drop is not drawn.'
  );
}

function sameForce(t) {
  const time = 0.6 * t,
    move = m => {
      const a = 30 / m,
        p = Math.min(time, 0.2);
      return 0.5 * a * p * p + a * 0.2 * Math.max(0, time - 0.2);
    };
  const pushing = time < 0.2,
    ballX = 150 + 100 * move(0.62),
    suv = move(1800);
  let b =
    line(70, 140, 840, 140, C.grid, 2) +
    dot(ballX, 120, 18, C.gold) +
    visible(pushing, arrow(ballX - 85, 120, 62, 0, C.red, 3)) +
    text(150, 72, 'Basketball, 0.62 kg', 16, C.ink, 'start');
  b +=
    line(70, 265, 840, 265, C.grid, 2) +
    rect(150 + 100 * suv, 205, 150, 50, C.blue) +
    dot(180 + 100 * suv, 258, 10, C.ink) +
    dot(270 + 100 * suv, 258, 10, C.ink) +
    visible(pushing, arrow(85, 230, 62, 0, C.red, 3)) +
    text(150, 192, 'Stalled SUV, 1800 kg', 16, C.ink, 'start');
  b +=
    line(500, 300, 840, 300, C.ink, 1) +
    dot(520 + 100 * 1000 * suv, 300, 5, C.purple) +
    text(520, 318, 'SUV displacement × 1000', 12, C.purple, 'start') +
    text(660, 170, 'Same 30 N push for 0.20 s', 16, C.red) +
    text(660, 72, 'a = F/m = 48 m/s²', 15, C.ink, 'start') +
    text(660, 192, 'a = F/m = 0.017 m/s²', 15, C.ink, 'start');
  return panel(
    'The same force, very different accelerations',
    b,
    'Red arrows show the push while it lasts. After 0.60 s the ball has moved 4.8 m; the SUV only 1.7 mm (the purple dot shows it magnified 1000 times).'
  );
}

// ── Chapter 5 ────────────────────────────────────────────────────────────────

function terminal(t) {
  const time = 30 * t,
    s = dragFall(time),
    y = 70 + (s.y / 2500) * 170,
    g = plot(440, 295, 400, 220, [0, 30], [0, 110]);
  let b = line(120, 70, 120, 245, C.grid, 2);
  for (const h of [0, 500, 1000, 1500, 2000, 2500])
    b +=
      line(112, 70 + (h / 2500) * 170, 120, 70 + (h / 2500) * 170, C.ink, 1) +
      text(106, 74 + (h / 2500) * 170, `${h} m`, 11, C.guide, 'end');
  b +=
    dot(170, y, 9, C.ink) +
    line(155, y + 4, 185, y + 4, C.ink, 4) +
    arrow(170, y + 12, 0, 50, C.red, 3) +
    arrow(170, y - 12, 0, (-50 * s.drag) / s.weight, C.blue, 3) +
    text(200, y + 50, 'weight', 13, C.red, 'start') +
    text(200, y - 14, 'drag', 13, C.blue, 'start');
  b +=
    axes2(440, 295, 410, 230, 't (s)', 'v (m/s)') +
    line(g.X(0), g.Y(s.vt), g.X(30), g.Y(s.vt), C.guide, 1, '6 4') +
    text(g.X(30), g.Y(s.vt) - 8, 'v_t = 98 m/s (350 km/h)', 13, C.guide, 'end') +
    path(
      series(q => [g.X(time * q), g.Y(dragFall(time * q).v)]),
      C.green,
      'none',
      2.5
    ) +
    dot(g.X(time), g.Y(s.v), 6, C.green);
  for (const n of [0, 10, 20, 30]) b += text(g.X(n), 314, String(n), 12);
  b += text(700, 262, 'Drag ½ρCAv² grows until it equals mg', 15, C.blue);
  return panel(
    'Drag grows with speed until it balances weight',
    b,
    '75-kg skydiver feet first: ρ = 1.21 kg/m³, C = 0.70, A = 0.18 m². Net force and acceleration fall to zero at the terminal velocity.'
  );
}

function pushPull(t) {
  const degrees = 40 * clamp(t / 0.9),
    r = rad(degrees),
    push = startingForce(degrees, true),
    pull = startingForce(degrees, false),
    k = 1.5;
  let b = '';
  for (const [ox, s, isPush] of [
    [150, push, true],
    [380, pull, false],
  ]) {
    b += line(ox - 90, 250, ox + 110, 250, C.ink, 2) + rect(ox - 30, 200, 60, 50, C.fill, C.ink);
    const L = s.force * k;
    if (isPush)
      b += arrow(
        ox - 30 - L * Math.cos(r),
        200 - L * Math.sin(r),
        L * Math.cos(r),
        L * Math.sin(r),
        C.red,
        3
      );
    else b += arrow(ox + 30, 210, L * Math.cos(r), -L * Math.sin(r), C.red, 3);
    b +=
      arrow(ox, 250, 0, (-s.normal * 70) / 441, C.blue, 3) +
      text(ox, 290, isPush ? 'Push: N = mg + F sin θ' : 'Pull: N = mg − F sin θ', 14) +
      text(ox, 312, isPush ? 'more normal force' : 'less normal force', 13, C.guide);
  }
  const g = plot(560, 270, 290, 190, [0, 40], [40, 66]);
  b +=
    axes2(560, 270, 300, 200, 'θ (°)', 'F needed (N)') +
    path(
      series(q => [g.X(40 * q), g.Y(startingForce(40 * q, true).force)]),
      C.red,
      'none',
      2.5
    ) +
    path(
      series(q => [g.X(40 * q), g.Y(startingForce(40 * q, false).force)]),
      C.purple,
      'none',
      2.5
    ) +
    line(g.X(degrees), g.Y(40), g.X(degrees), g.Y(66), C.grid, 1) +
    dot(g.X(degrees), g.Y(push.force), 5, C.red) +
    dot(g.X(degrees), g.Y(pull.force), 5, C.purple) +
    dot(g.X(25), g.Y(51.0), 4, C.ink) +
    dot(g.X(25), g.Y(46.5), 4, C.ink) +
    text(g.X(25) - 6, g.Y(51.0) - 8, '51.0 N', 12, C.red, 'end') +
    text(g.X(25) + 6, g.Y(46.5) + 16, '46.5 N', 12, C.purple, 'start') +
    text(g.X(40), g.Y(66) + 18, 'push', 13, C.red, 'end') +
    text(g.X(40), g.Y(40) - 10, 'pull', 13, C.purple, 'end');
  for (const n of [0, 10, 20, 30, 40]) b += text(g.X(n), 288, String(n), 11);
  return panel(
    'Pulling at an angle beats pushing',
    b,
    '45.0-kg ice block, μₛ = 0.10. The force angle sweeps from 0° to 40°; dots mark the exercise’s 25° answers.'
  );
}

function tendon(t) {
  const strain = t,
    stress = tendonStress(strain),
    g = plot(520, 290, 330, 210, [0, 1], [0, 0.6]);
  let b = rect(50, 85, 24, 190, C.guide, 'none');
  const right = 90 + 300 * (1 + 0.25 * strain),
    crimp = 9 * clamp(1 - strain / 0.25);
  b += rect(right, 85, 24, 190, C.guide, 'none');
  for (let i = 0; i < 5; i += 1) {
    const y = 110 + i * 35,
      breakAt = 0.68 + 0.06 * i,
      gap = 34 * clamp((strain - breakAt) / 0.08),
      cut = 0.5 + (i - 2) * 0.06,
      half = gap / (2 * (right - 74)),
      // One parameter along the whole fiber, so both halves share the crimp.
      fiber = (u0, u1) =>
        path(
          series(q => {
            const u = u0 + (u1 - u0) * q;
            return [74 + (right - 74) * u, y + crimp * Math.sin(2 * Math.PI * 6 * u)];
          }, 30),
          C.red,
          'none',
          4
        );
    b += fiber(0, cut - half) + fiber(cut + half, 1);
  }
  b +=
    axes2(520, 290, 340, 220, 'Strain', 'Stress') +
    path(
      series(q => [g.X(q), g.Y(tendonStress(q))], 90),
      C.grid,
      'none',
      2.5
    ) +
    path(
      series(q => [g.X(strain * q), g.Y(tendonStress(strain * q))], 90),
      C.ink,
      'none',
      3
    ) +
    dot(g.X(strain), g.Y(stress), 6, C.red) +
    line(g.X(0.25), 290, g.X(0.25), 80, C.grid, 1, '3 3') +
    line(g.X(0.65), 290, g.X(0.65), 80, C.grid, 1, '3 3');
  const region = strain < 0.25 ? 0 : strain < 0.65 ? 1 : 2;
  b += pick(
    250,
    310,
    [
      'Toe region: crimped fibers straighten',
      'Linear region: straight fibers stretch',
      'Failure region: fibers tear one by one',
    ],
    region,
    16
  );
  return panel(
    'Why a tendon’s stress–strain curve starts soft',
    b,
    'Schematic, not calibrated: wavy collagen fibers straighten with little force, then stretch elastically, then fail. Extension is exaggerated.'
  );
}

// ── Chapter 6 ────────────────────────────────────────────────────────────────

function radianDefinition(t) {
  const theta = 2 * Math.PI * t,
    cx = 210,
    cy = 185,
    r = 110;
  let b = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="2"/>${line(
    cx,
    cy,
    cx + r,
    cy,
    C.ink,
    2
  )}${path(
    series(q => [cx + r * Math.cos(theta * q), cy - r * Math.sin(theta * q)], 90),
    C.gold,
    'none',
    6
  )}${line(cx, cy, cx + r * Math.cos(theta), cy - r * Math.sin(theta), C.blue, 3)}${dot(
    cx,
    cy,
    4,
    C.ink
  )}${text(
    cx + r / 2,
    cy + 20,
    'r',
    16
  )}${visible(theta >= 1, text(cx + (r + 22) * Math.cos(0.5), cy - (r + 22) * Math.sin(0.5), '1 rad', 13, C.gold))}`;
  const k = 0.6;
  b +=
    line(420, 150, 420 + 2 * Math.PI * r * k, 150, C.grid, 14) +
    line(420, 150, 420 + theta * r * k, 150, C.gold, 14);
  for (let n = 1; n <= 6; n += 1)
    b +=
      line(420 + n * r * k, 140, 420 + n * r * k, 160, C.ink, 1) +
      text(420 + n * r * k, 180, `${n}r`, 13);
  b +=
    line(420 + 2 * Math.PI * r * k, 132, 420 + 2 * Math.PI * r * k, 168, C.red, 2) +
    text(420 + 2 * Math.PI * r * k, 124, '2πr', 14, C.red) +
    text(420, 110, 'Arc length Δs laid out straight', 15, C.ink, 'start');
  const values = Array.from({ length: 13 }, (_, i) => i * 0.5).concat([2 * Math.PI]);
  b += pick(
    600,
    245,
    values.map(v => `Δθ = Δs / r = ${v.toFixed(2)} rad = ${Math.round((v * 180) / Math.PI)}°`),
    nearest(values, theta),
    18,
    C.blue
  );
  return panel(
    'An angle in radians counts radius lengths of arc',
    b,
    'One radian is the angle whose arc equals the radius. A full turn fits 2π ≈ 6.28 radius lengths, so 360° = 2π rad.'
  );
}

function stringEllipse(t) {
  const angle = 2 * Math.PI * t,
    cx = 300,
    cy = 185,
    c = 150,
    p = ellipsePoint(angle, 200, c),
    P = [cx + p.x, cy - p.y];
  let b =
    path(
      series(q => {
        const e = ellipsePoint(angle * q, 200, c);
        return [cx + e.x, cy - e.y];
      }, 90),
      C.ink,
      'none',
      2.5
    ) +
    line(cx - c, cy, P[0], P[1], C.gold, 2) +
    line(P[0], P[1], cx + c, cy, C.gold, 2) +
    dot(cx - c, cy, 6, C.red) +
    dot(cx + c, cy, 6, C.blue) +
    dot(P[0], P[1], 7, C.purple) +
    text(cx - c, cy + 24, 'f₁', 15, C.red) +
    text(cx + c, cy + 24, 'f₂', 15, C.blue);
  const k = 0.6;
  b +=
    bar(570, 150, p.d1 * k, 20, C.red) +
    bar(570 + p.d1 * k, 150, p.d2 * k, 20, C.blue) +
    line(570, 140, 570, 180, C.ink, 1) +
    line(570 + 400 * k, 140, 570 + 400 * k, 180, C.ink, 1) +
    text(690, 125, 'd₁ + d₂ = 2a, always', 17) +
    text(690, 210, 'red: pencil to f₁ · blue: pencil to f₂', 13, C.guide);
  return panel(
    'A taut loop of string draws an ellipse',
    b,
    'The pencil keeps the string taut, so the two distances to the pins always add to the same length. Planets follow such curves with the Sun at one focus.'
  );
}

function inverseSquareForce(t) {
  const r = 2 - Math.cos(2 * Math.PI * t),
    unit = 75,
    xM = 290 - (unit * r) / 2,
    xm = 290 + (unit * r) / 2,
    F = inverseSquare(r),
    g = plot(560, 290, 290, 210, [1, 3], [0, 1]);
  let b =
    dot(xM, 185, 26, C.blue) +
    dot(xm, 185, 12, C.red) +
    line(xM, 230, xm, 230, C.guide, 1) +
    text((xM + xm) / 2, 250, 'r', 16) +
    arrow(xM, 140, 120 * F, 0, C.blue, 3) +
    arrow(xm, 155, -120 * F, 0, C.red, 3) +
    text(xM, 225, 'M', 15) +
    text(xm, 215, 'm', 15);
  b +=
    axes2(560, 290, 300, 220, 'r', 'F') +
    path(
      series(q => [g.X(1 + 2 * q), g.Y(inverseSquare(1 + 2 * q))]),
      C.ink,
      'none',
      2.5
    ) +
    dot(g.X(r), g.Y(F), 6, C.purple);
  for (const [n, label] of [
    [1, 'r₀: F₀'],
    [2, '2r₀: F₀/4'],
    [3, '3r₀: F₀/9'],
  ])
    b += text(g.X(n), 308, label, 12);
  b += text(290, 300, 'F = GmM / r²', 17);
  return panel(
    'Gravitational force falls with the square of distance',
    b,
    'Equal and opposite forces act on m and M at every separation. Doubling r divides F by four.'
  );
}

function flatCurve(t) {
  let b = '';
  for (const [cx, R, turns, f, label] of [
    [230, 110, 1, 30, 'radius r'],
    [640, 55, 2, 60, 'radius r/2'],
  ]) {
    const a = 2 * Math.PI * turns * t,
      x = cx + R * Math.cos(a),
      y = 185 - R * Math.sin(a);
    b += `<circle cx="${cx}" cy="185" r="${R}" fill="none" stroke="${C.grid}" stroke-width="12"/>${dot(
      cx,
      185,
      3,
      C.ink
    )}${dot(x, y, 9, C.red)}${arrow(x, y, -55 * Math.sin(a), -55 * Math.cos(a), C.green, 3)}${arrow(
      x,
      y,
      -f * Math.cos(a),
      f * Math.sin(a),
      C.purple,
      3
    )}${text(cx, 320, label, 15)}`;
  }
  b +=
    text(435, 90, 'Same speed v', 16, C.green) +
    text(435, 120, 'f = mv²/r', 16, C.purple) +
    text(435, 260, 'Half the radius:', 15) +
    text(435, 282, 'twice the friction', 15, C.purple);
  return panel(
    'Friction points to the center of a flat curve',
    b,
    'Green: velocity, tangent to the path. Purple: static friction, the centripetal force. At the same speed, a tighter curve needs more of it.'
  );
}

// ── Chapter 7 ────────────────────────────────────────────────────────────────

function coasting(t) {
  const s = coastingDistance(t),
    e = coastingEnergy(s),
    X = d => 70 + d * 3,
    Y = h => 290 - h * 6,
    k = 220 / e.total;
  let b =
    path(
      series(q => [X(coastingLength * q), Y(hillHeight(coastingLength * q))], 120),
      C.ink,
      'none',
      3
    ) +
    rect(X(200) + 22, Y(0) - 46, 22, 46, C.red) +
    rect(X(200) + 26, Y(0) - 40, 14, 12, C.fill, 'none') +
    rect(X(s) - 16, Y(hillHeight(s)) - 20, 32, 14, C.blue) +
    dot(X(s) - 9, Y(hillHeight(s)) - 4, 4, C.ink) +
    dot(X(s) + 9, Y(hillHeight(s)) - 4, 4, C.ink);
  const base = 300;
  b +=
    vbar(730, base, e.thermal * k, 40, C.red) +
    vbar(730, base - e.thermal * k, e.potential * k, 40, C.blue) +
    vbar(730, base - (e.thermal + e.potential) * k, e.kinetic * k, 40, C.green) +
    rect(730, base - 220, 40, 220, 'none', C.ink) +
    text(780, 110, 'kinetic', 14, C.green, 'start') +
    text(780, 135, 'potential', 14, C.blue, 'start') +
    text(780, 160, 'thermal', 14, C.red, 'start') +
    text(750, 70, 'Total fixed', 14, C.ink);
  return panel(
    'Friction turns mechanical energy into thermal energy',
    b,
    'Car from rest at 30 m; constant friction chosen so it stops at the pump. KE + PE falls as thermal energy grows, but the total stays the same.'
  );
}

function rocks(t) {
  const time = 2.14 * t,
    spring = rockOnSpring(time, { k: 400 }),
    dirt = rockInDirt(time),
    k = 140,
    total = 9.8 * 1.4,
    eScale = 200 / total;
  let b = '';
  for (const [ox, s, onSpring] of [
    [170, spring, true],
    [560, dirt, false],
  ]) {
    const height = s.y + 0.4,
      top = 290 - k * Math.min(0.4, height);
    b +=
      line(ox - 80, 290, ox + 80, 290, C.ink, 2) +
      line(ox - 60, 290 - k * 1.4, ox + 60, 290 - k * 1.4, C.grid, 1, '5 4');
    if (onSpring)
      b += path(
        Array.from({ length: 13 }, (_, i) => [
          ox + (i === 0 || i === 12 ? 0 : i % 2 ? 14 : -14),
          290 - ((290 - top) * i) / 12,
        ]),
        C.guide,
        'none',
        2.5
      );
    else b += rect(ox - 70, 290 - k * 0.4, 140, k * 0.4, C.gold, 'none');
    b += dot(ox, 290 - k * height - 14, 14, C.ink);
    const thermal = onSpring ? 0 : total - s.kinetic - 9.8 * height,
      stored = onSpring ? s.elastic : thermal,
      pe = 9.8 * height;
    b +=
      vbar(ox + 110, 300, pe * eScale, 28, C.blue) +
      vbar(ox + 110, 300 - pe * eScale, s.kinetic * eScale, 28, C.green) +
      vbar(
        ox + 110,
        300 - (pe + s.kinetic) * eScale,
        stored * eScale,
        28,
        onSpring ? C.purple : C.red
      ) +
      rect(ox + 110, 100, 28, 200, 'none', C.ink) +
      text(ox, 58, onSpring ? 'Spring: conservative' : 'Soil: nonconservative', 17);
  }
  b +=
    text(820, 150, 'gravitational PE', 13, C.blue, 'end') +
    text(820, 172, 'kinetic', 13, C.green, 'end') +
    text(820, 194, 'spring PE', 13, C.purple, 'end') +
    text(820, 216, 'thermal, sound', 13, C.red, 'end');
  return panel(
    'Conservative versus nonconservative forces',
    b,
    'Same 1.00-kg rock dropped 1.00 m. The spring (k = 400 N/m) returns it to its starting height; the soil stops it, and the energy leaves as heat and sound.'
  );
}

// ── Chapter 8 ────────────────────────────────────────────────────────────────

function backscatter(t) {
  const time = -1 + 2 * t,
    after = elasticCollision(1, 5, 1),
    contact = 450 - 30;
  const ve = time < 0 ? 1 : after.v1,
    vq = time < 0 ? 0 : after.v2,
    xe = contact + 200 * ve * time,
    xq = 450 + 200 * vq * Math.max(0, time);
  let b =
    line(70, 160, 840, 160, C.grid, 1) +
    dot(xq, 160, 22, C.purple) +
    dot(xe, 160, 8, C.blue) +
    arrow(xe, 125, 60 * ve, 0, C.blue, 3) +
    arrow(xq, 118, 60 * vq, 0, C.purple, 3) +
    text(xq, 205, 'target, 5m', 14, C.purple) +
    text(xe, 100, 'projectile, m', 14, C.blue);
  const k = 120;
  b +=
    line(450, 225, 450, 305, C.ink, 1) +
    bar(450, 232, k * ve, 16, C.blue) +
    bar(450, 256, k * 5 * vq, 16, C.purple) +
    bar(450, 280, k, 16, C.ink) +
    text(350, 245, 'projectile', 13, C.blue, 'end') +
    text(350, 269, 'target', 13, C.purple, 'end') +
    text(350, 293, 'total', 13, C.ink, 'end');
  b += pick(720, 90, ['Before: p = mv', 'After: −2/3 mv and +5/3 mv'], time < 0 ? 0 : 1, 16);
  return panel(
    'Bouncing back gives the target extra momentum',
    b,
    'Elastic head-on collision with a target five times as massive. The projectile reverses, so the target carries more than the incoming momentum; the total is unchanged.'
  );
}

function darkRoom(t) {
  const time = -1.5 + 3 * t,
    c = darkRoomCollision(),
    k = 70,
    P = [300, 185];
  const m1 =
      time < 0
        ? [P[0] + k * c.v1 * time, P[1]]
        : [P[0] + k * c.v1f * time * Math.cos(c.th1), P[1] - k * c.v1f * time * Math.sin(c.th1)],
    m2 =
      time < 0
        ? P
        : [
            P[0] + k * c.v2f * time * Math.cos(c.th2) + 23,
            P[1] - k * c.v2f * time * Math.sin(c.th2),
          ];
  let b =
    rect(170, 75, 270, 225, C.ink, 'none', 0.14) +
    text(305, 95, 'dark room', 13, C.guide) +
    dot(m2[0] + (time < 0 ? 23 : 0), m2[1], 13, C.red) +
    dot(m1[0], m1[1], 10, C.blue);
  const s = 400,
    O = [560, 230],
    p1 = [s * c.m1 * c.v1f * Math.cos(c.th1), -s * c.m1 * c.v1f * Math.sin(c.th1)],
    p2 = [s * c.m2 * c.v2f * Math.cos(c.th2), -s * c.m2 * c.v2f * Math.sin(c.th2)];
  b +=
    arrow(O[0], O[1], s * c.m1 * c.v1, 0, C.ink, 3) +
    text(O[0] + 100, O[1] + 24, 'p_tot = 0.500 kg·m/s', 14) +
    visible(time >= 0, arrow(O[0], O[1], ...p1, C.blue, 3)) +
    visible(time >= 0, arrow(O[0] + p1[0], O[1] + p1[1], ...p2, C.red, 3)) +
    visible(time >= 0, text(O[0] + 30, O[1] - 110, 'p₁′', 15, C.blue)) +
    visible(time >= 0, text(O[0] + 190, O[1] - 60, 'p₂′', 15, C.red, 'start'));
  b +=
    text(560, 70, 'v₁′ = 1.50 m/s at 45.0°', 14, C.blue, 'start') +
    text(560, 92, 'v₂′ = 0.886 m/s at −48.5°', 14, C.red, 'start');
  return panel(
    'Momentum components are conserved in a glancing collision',
    b,
    'm₁ = 0.250 kg enters at 2.00 m/s; m₂ = 0.400 kg starts at rest. Afterward p₁′ and p₂′ add head to tail to the original momentum.'
  );
}

// ── Chapter 9 ────────────────────────────────────────────────────────────────

const smooth = q => q * q * (3 - 2 * q);

function forearm(t) {
  const r = 0.1 + 0.28 * clamp(t / 0.8),
    FB = bicepsForce(r),
    elbow = [110, 210],
    X = d => elbow[0] + 1000 * d,
    k = 1 / 3.2;
  let b =
    line(elbow[0], elbow[1], 70, 70, C.guide, 12) +
    rect(elbow[0], elbow[1] - 8, 420, 16, C.gold) +
    dot(elbow[0], elbow[1], 9, C.ink) +
    line(X(0.04), elbow[1] - 8, 90, 90, C.red, 6) +
    arrow(X(0.04), elbow[1] - 8, 0, -FB * k, C.red, 3) +
    arrow(X(0.16), elbow[1] + 8, 0, 24.5 * k + 6, C.ink, 2.5) +
    rect(X(r) - 22, elbow[1] - 40, 44, 32, C.blue) +
    arrow(X(r), elbow[1] + 8, 0, 39.2 * k + 6, C.blue, 2.5);
  b +=
    text(X(0.04) + 12, 70, 'F_B (biceps)', 14, C.red, 'start') +
    text(X(0.16), elbow[1] + 48, 'arm 24.5 N', 13, C.ink) +
    text(X(r), elbow[1] - 48, 'book 39.2 N', 13, C.blue) +
    text(elbow[0], elbow[1] + 34, 'pivot', 13, C.guide);
  const radii = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.38];
  b += pick(
    700,
    150,
    radii.map(d => `Book at ${Math.round(100 * d)} cm`),
    nearest(radii, r),
    17
  );
  b += pick(
    700,
    185,
    radii.map(
      d => `F_B = ${Math.round(bicepsForce(d))} N = ${(bicepsForce(d) / 63.7).toFixed(1)} × weight`
    ),
    nearest(radii, r),
    17,
    C.red
  );
  b +=
    bar(580, 230, FB * 0.5, 16, C.red) +
    bar(580, 256, 63.7 * 0.5, 16, C.ink) +
    text(575, 268, 'w', 13, C.ink, 'end') +
    text(575, 243, 'F_B', 13, C.red, 'end');
  return panel(
    'A short lever arm makes the biceps work hard',
    b,
    'Biceps 4.00 cm from the elbow; forearm 2.50 kg at 16.0 cm. Torques about the elbow balance: F_B = (r₂w_a + r₃w_b)/r₁, 470 N with the book at 38.0 cm.'
  );
}

function pole(t) {
  const x =
      t < 0.4 ? 0.45 + 0.15 * smooth(clamp(t / 0.3)) : 0.6 - 1.1 * smooth(clamp((t - 0.4) / 0.35)),
    { left, right } = poleHandForces(x),
    k = 160,
    hl = 420,
    hr = hl + 0.9 * k,
    cg = hl + x * k,
    y = 175,
    fScale = 1.5;
  // A 4.0-m pole: both hands stay on it for every cg position shown.
  let b =
    stick(hl + 72, 300, 1.6, C.grid) +
    rect(cg - 2 * k, y - 5, 4 * k, 10, C.gold) +
    dot(hl, y, 7, C.ink) +
    dot(hr, y, 7, C.ink) +
    arrow(hl, y + (left >= 0 ? -6 : 6), 0, -left * fScale, C.blue, 3) +
    arrow(hr, y + (right >= 0 ? -6 : 6), 0, -right * fScale, C.purple, 3) +
    arrow(cg, y + 6, 0, 49 * fScale, C.red, 3) +
    text(cg, y + 105, 'w = 49.0 N at the cg', 13, C.red) +
    text(hl, 318, 'left hand', 13, C.blue) +
    text(hr, 318, 'right hand', 13, C.purple);
  const xs = [0.45, 0.5, 0.6, 0.3, 0, -0.25, -0.5],
    i = nearest(xs, x);
  b += pick(
    720,
    80,
    xs.map(v => `F_L = ${poleHandForces(v).left.toFixed(1).replace('-', '−')} N`),
    i,
    16,
    C.blue
  );
  b += pick(
    720,
    105,
    xs.map(v => `F_R = ${poleHandForces(v).right.toFixed(1).replace('-', '−')} N`),
    i,
    16,
    C.purple
  );
  b += visible(right < -2, text(720, 135, 'Right hand pushes down', 15, C.purple));
  return panel(
    'Where the cg sits decides how the hands share the load',
    b,
    'Uniform 5.00-kg pole, hands 0.900 m apart. F_L + F_R = w and torques about either hand balance; with the cg outside the hands, one hand pushes down.'
  );
}

function sandwich(t) {
  const deg = 12 + 23 * clamp(t / 0.85),
    phi = rad(deg),
    L = Math.hypot(0.55, 1.3) * 175,
    hinge = [270, 300 - L * Math.cos(phi)],
    feet = [270 - L * Math.sin(phi), 270 + L * Math.sin(phi)],
    frac = 0.5 / Math.cos(Math.atan(0.55 / 1.3)) / Math.hypot(0.55, 1.3),
    T = sandwichChainTension(phi);
  const cl = [hinge[0] + (feet[0] - hinge[0]) * frac, hinge[1] + (300 - hinge[1]) * frac],
    cr = [hinge[0] + (feet[1] - hinge[0]) * frac, cl[1]];
  let b =
    line(60, 300, 480, 300, C.ink, 2) +
    line(hinge[0], hinge[1], feet[0], 300, C.gold, 9) +
    line(hinge[0], hinge[1], feet[1], 300, C.gold, 9) +
    dot(hinge[0], hinge[1], 6, C.ink) +
    line(cl[0], cl[1], cr[0], cr[1], C.guide, 2, '4 3') +
    arrow(cl[0], cl[1], 1.5 * T, 0, C.red, 3) +
    arrow(cr[0], cr[1], -1.5 * T, 0, C.red, 3);
  const g = plot(560, 290, 290, 210, [10, 36], [0, 40]);
  b +=
    axes2(560, 290, 300, 220, 'half-angle (°)', 'T (N)') +
    path(
      series(q => [g.X(10 + 26 * q), g.Y(sandwichChainTension(rad(10 + 26 * q)))]),
      C.red,
      'none',
      2.5
    ) +
    dot(g.X(deg), g.Y(T), 6, C.red) +
    dot(g.X(22.93), g.Y(21.6), 4, C.ink) +
    text(g.X(22.93) - 6, g.Y(21.6) - 10, 'exercise: 21.6 N', 12, C.ink, 'end');
  for (const n of [10, 20, 30]) b += text(g.X(n), 308, String(n), 11);
  return panel(
    'Spreading the legs raises the chain tension',
    b,
    'Each 4.00-kg half pivots about the hinge; the chain is fixed to the boards. Torque balance gives T ∝ tan of the half-angle.'
  );
}

// ── Chapter 10 ───────────────────────────────────────────────────────────────

function twins(t) {
  const time = -2.5 + 5.5 * t,
    s = twinSkaters(time),
    u = 65,
    O = [330, 185],
    P = ([x, y]) => [O[0] + u * x, O[1] - u * y];
  const [ax, ay] = P(s.a),
    [bx, by] = P(s.b);
  let b = `${
    line(O[0] - 2.5 * u, O[1] - u, O[0], O[1] - u, C.grid, 1, '6 5') +
    line(O[0] + 2.5 * u, O[1] + u, O[0], O[1] + u, C.grid, 1, '6 5')
  }<circle cx="${O[0]}" cy="${O[1]}" r="${u}" fill="none" stroke="${C.grid}" stroke-width="1"/>${visible(
    time >= 0,
    line(ax, ay, bx, by, C.ink, 3)
  )}${dot(O[0], O[1], 3, C.ink)}${dot(ax, ay, 12, C.blue)}${dot(bx, by, 12, C.red)}`;
  const va = time < 0 ? [1, 0] : [Math.cos(time), -Math.sin(time)];
  b +=
    arrow(ax, ay, 50 * va[0], -50 * va[1], C.green, 2.5) +
    arrow(bx, by, -50 * va[0], 50 * va[1], C.green, 2.5);
  b +=
    text(680, 110, 'Before: L = 2mvr', 17) +
    text(680, 140, 'After: L = Iω = (2mr²)(v/r)', 17) +
    text(680, 180, 'Same angular momentum', 16, C.green) +
    pick(
      680,
      230,
      ['Gliding in straight lines', 'Hands linked: spinning'],
      time < 0 ? 0 : 1,
      17,
      C.purple
    );
  return panel(
    'Linking hands turns straight-line motion into a spin',
    b,
    'Equal skaters, equal speeds, paths 2r apart. With no external torque, angular momentum about the center of mass is the same before and after.'
  );
}

function gyroscope(t) {
  const phi = 2 * Math.PI * t,
    P = [300, 155],
    d = 150,
    depth = 0.35,
    c = [P[0] + d * Math.cos(phi), P[1] + d * Math.sin(phi) * depth],
    R = 55,
    u = [-Math.sin(phi), Math.cos(phi)],
    disk = Array.from({ length: 24 }, (_, i) => {
      const a = (2 * Math.PI * i) / 24;
      return [
        c[0] + R * Math.cos(a) * u[0],
        c[1] + R * Math.cos(a) * u[1] * depth - R * Math.sin(a),
      ];
    }),
    spin = 8 * Math.PI * t,
    mark = [
      c[0] + R * Math.cos(spin) * u[0],
      c[1] + R * Math.cos(spin) * u[1] * depth - R * Math.sin(spin),
    ];
  let b =
    line(P[0], P[1], P[0], 300, C.guide, 6) +
    line(P[0] - 60, 300, P[0] + 60, 300, C.guide, 6) +
    line(P[0], P[1], c[0], c[1], C.ink, 4) +
    polygon(disk, C.fill, C.ink) +
    dot(mark[0], mark[1], 5, C.red) +
    arrow(c[0], c[1], 80 * Math.cos(phi), 80 * Math.sin(phi) * depth, C.green, 3.5) +
    arrow(c[0], c[1], 0, 70, C.red, 2.5) +
    arrow(P[0], P[1], 70 * u[0], 70 * u[1] * depth, C.purple, 3.5);
  const T = [720, 185];
  b += `<circle cx="${T[0]}" cy="${T[1]}" r="80" fill="none" stroke="${C.grid}" stroke-width="1"/>${dot(
    T[0],
    T[1],
    4,
    C.ink
  )}${arrow(T[0], T[1], 80 * Math.cos(phi), 80 * Math.sin(phi), C.green, 3)}${arrow(
    T[0] + 80 * Math.cos(phi),
    T[1] + 80 * Math.sin(phi),
    35 * u[0],
    35 * u[1],
    C.purple,
    3
  )}${text(T[0], 80, 'Seen from above', 15)}${text(T[0], 300, 'ΔL points along τ', 14, C.purple)}`;
  b +=
    text(60, 250, 'L (spin)', 14, C.green, 'start') +
    text(60, 272, 'τ = r × w', 14, C.purple, 'start') +
    text(60, 294, 'w', 14, C.red, 'start');
  return panel(
    'Torque turns a gyroscope’s angular momentum sideways',
    b,
    'Gravity’s torque is horizontal and perpendicular to L, so L swings around instead of tipping down: precession at Ω = τ / L. Oblique view; rates schematic.'
  );
}

function merry(t) {
  const time = 1.5 * t,
    cases = [
      [1.5, 90, '(a) edge, perpendicular'],
      [0.75, 90, '(b) half radius'],
      [1.5, 30, '(c) edge, 30° from radius'],
    ];
  let b = '';
  cases.forEach(([r, deg, label], i) => {
    const s = merryGoRound(r, deg),
      theta = 0.5 * s.alpha * time * time,
      cx = 160 + i * 290,
      cy = 175,
      R = 85;
    b += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="${C.fill}" stroke="${C.ink}" stroke-width="2"/>`;
    for (let k = 0; k < 4; k += 1) {
      const a = theta + (k * Math.PI) / 2;
      b += line(cx, cy, cx + R * Math.cos(a), cy - R * Math.sin(a), C.guide, 2);
    }
    const a = theta + Math.PI,
      pr = (R * r) / 1.5,
      p = [cx + pr * Math.cos(a), cy - pr * Math.sin(a)],
      er = [Math.cos(a), -Math.sin(a)],
      et = [-Math.sin(a), -Math.cos(a)],
      fr = rad(deg),
      F = [
        -Math.cos(fr) * er[0] + Math.sin(fr) * et[0],
        -Math.cos(fr) * er[1] + Math.sin(fr) * et[1],
      ];
    b +=
      dot(p[0], p[1], 6, C.red) +
      arrow(p[0] - 60 * F[0], p[1] - 60 * F[1], 60 * F[0], 60 * F[1], C.red, 3) +
      text(cx, 295, label, 15) +
      text(
        cx,
        318,
        `τ = ${Number(s.torque.toPrecision(4))} N·m, α = ${s.alpha.toFixed(2)} rad/s²`,
        14,
        C.purple
      );
  });
  return panel(
    'Torque, not force alone, sets the angular acceleration',
    b,
    'The same 250-N push on a 50.0-kg, 1.50-m merry-go-round (I = 56.3 kg·m²). Halving the lever arm, or pushing at 30° to the radius, halves τ = rF sin θ.'
  );
}

// ── Chapter 11 ───────────────────────────────────────────────────────────────

function phases(t) {
  let b = '';
  const boxes = [60, 340, 620];
  boxes.forEach(
    (ox, i) =>
      (b +=
        rect(ox, 85, 220, 205, 'white', C.ink) +
        text(ox + 110, 70, ['Solid', 'Liquid', 'Gas'][i], 18))
  );
  const site = (i, j) => [boxes[0] + 44 + 44 * i, 120 + 44 * j],
    atom = (i, j) => {
      const [x, y] = site(i, j),
        n = i * 4 + j;
      return [
        x + 4 * Math.sin(2 * Math.PI * (5 * t + n * 0.37)),
        y + 4 * Math.cos(2 * Math.PI * (5 * t + n * 0.61)),
      ];
    };
  for (let i = 0; i < 4; i += 1)
    for (let j = 0; j < 4; j += 1) {
      const [x, y] = atom(i, j);
      if (i < 3) b += line(x, y, ...atom(i + 1, j), C.guide, 1.5);
      if (j < 3) b += line(x, y, ...atom(i, j + 1), C.guide, 1.5);
    }
  for (let i = 0; i < 4; i += 1) for (let j = 0; j < 4; j += 1) b += dot(...atom(i, j), 10, C.blue);
  for (let n = 0; n < 14; n += 1) {
    const cx = boxes[1] + 35 + (n % 5) * 38,
      cy = 165 + Math.floor(n / 5) * 40,
      x =
        cx +
        16 * Math.sin(2 * Math.PI * (t + n * 0.23)) +
        5 * Math.sin(2 * Math.PI * (3 * t + n * 0.41)),
      y = cy + 12 * Math.cos(2 * Math.PI * (t + n * 0.17));
    b += dot(x, y, 10, C.green);
  }
  for (let n = 0; n < 6; n += 1) {
    const x = bounce(
        boxes[2] + 20 + n * 31 + 520 * t * (n % 2 ? 1 : -1) * (1 + n * 0.1),
        boxes[2] + 10,
        boxes[2] + 210
      ),
      y = bounce(100 + n * 29 + 380 * t * (n % 3 ? 1 : -1), 95, 280);
    b += dot(x, y, 10, C.red);
  }
  b +=
    text(170, 312, 'vibrate about fixed sites', 14, C.guide) +
    text(450, 312, 'close together; neighbors change', 14, C.guide) +
    text(730, 312, 'far apart, free flight', 14, C.guide);
  return panel(
    'Particles in a solid, a liquid, and a gas',
    b,
    'Schematic motion, not to scale. Bonds (gray lines) keep solid atoms near their sites; liquid particles stay close but slip past one another.'
  );
}

function shipLoad(t) {
  const lands = [0, 1, 2, 3].map(i => 0.1 + 0.17 * i + 0.13),
    loaded = lands.reduce((n, at) => n + clamp((t - at) / 0.02), 0),
    draft = hullDraft(6.0e6 + 2.5e6 * loaded, 2000),
    k = 10,
    water = 205,
    deck = water - (12 - draft) * k;
  let b =
    rect(40, water, 820, 115, C.fill, 'none') +
    rect(250, deck, 320, 12 * k, C.gold, C.ink) +
    line(40, water, 860, water, C.blue, 2) +
    rect(690, 70, 14, 250, C.guide, 'none') +
    line(697, 70, 470, 70, C.guide, 6);
  [0, 1, 2, 3].forEach(i => {
    const start = lands[i] - 0.13,
      q = clamp((t - start) / 0.13),
      x = 290 + 70 * i,
      y = q < 1 ? 85 + (deck - 34 - 85) * q : deck - 34;
    const hanging = t >= start && t < lands[i];
    b +=
      visible(t >= start, rect(x - 25, y, 50, 34, C.red, C.ink)) +
      visible(hanging, line(x, 70, x, y, C.ink, 1.5));
  });
  b +=
    arrow(410, water + draft * k, 0, -18 - draft * 9, C.blue, 3) +
    arrow(440, deck + 30, 0, 18 + draft * 9, C.red, 3) +
    text(400, water + draft * k + 18, 'buoyant force', 13, C.blue, 'end') +
    text(450, deck + 60, 'total weight', 13, C.red, 'start');
  const loads = [0, 1, 2, 3, 4];
  b += pick(
    60,
    310,
    loads.map(
      n =>
        `${n} load${n === 1 ? '' : 's'}: draft ${hullDraft(6.0e6 + 2.5e6 * n, 2000).toFixed(2)} m`
    ),
    Math.round(loaded),
    15,
    C.ink,
    'start'
  );
  return panel(
    'A loaded ship floats lower',
    b,
    'Flat-sided hull, 2000 m² waterline area, 6000 t empty; each load 2500 t. It sinks until the displaced water’s weight equals the ship’s total weight.'
  );
}

function cuff(t) {
  const time = 10 * t,
    g = plot(80, 290, 450, 210, [0, 10], [50, 175]),
    pc = cuffPressure(time),
    state = pc > 120 ? 0 : pc > 80 ? 1 : 2;
  let b =
    axes2(80, 290, 460, 220, 't (s)', 'mm Hg') +
    path(
      series(q => [g.X(10 * q), g.Y(arterialPressure(10 * q))], 320),
      C.red,
      'none',
      1.5
    ) +
    line(g.X(0), g.Y(160), g.X(10), g.Y(60), C.blue, 2.5) +
    line(g.X(time), g.Y(50), g.X(time), g.Y(175), C.grid, 1) +
    dot(g.X(time), g.Y(pc), 6, C.blue);
  for (const p of [80, 120])
    b +=
      line(g.X(0), g.Y(p), g.X(10), g.Y(p), C.guide, 1, '4 4') +
      text(g.X(0) - 6, g.Y(p) + 4, String(p), 12, C.guide, 'end');
  b +=
    dot(g.X(4), g.Y(120), 5, C.ink) +
    dot(g.X(8), g.Y(80), 5, C.ink) +
    text(g.X(4) + 8, g.Y(120) - 40, 'first sound: systolic', 13, C.ink, 'start') +
    text(g.X(8) - 8, g.Y(80) - 40, 'last sound: diastolic', 13, C.ink, 'end') +
    text(g.X(10), g.Y(60) - 10, 'cuff', 13, C.blue, 'end') +
    text(g.X(1), g.Y(132), 'artery', 13, C.red);
  const open = [0, 0.5, 1][state];
  b += `<circle cx="720" cy="170" r="95" fill="${C.fill}" stroke="${C.blue}" stroke-width="10"/>${rect(
    700,
    170 - 18 * open,
    40,
    36 * open,
    C.red,
    'none'
  )}${line(700, 170, 740, 170, C.red, 2)}`;
  b += pick(
    720,
    300,
    [
      'Cuff above systolic: artery closed, silent',
      'Between: spurts of turbulent flow, sounds',
      'Below diastolic: steady flow, silent',
    ],
    state,
    15
  );
  return panel(
    'Reading blood pressure as the cuff deflates',
    b,
    'Schematic 120/80 mm Hg pulse. Sounds start when cuff pressure drops below the peak (systolic) and stop when it drops below the minimum (diastolic).'
  );
}

// ── Chapter 12 ───────────────────────────────────────────────────────────────

const gapWidth = x =>
  x < 300 || x > 620
    ? 140
    : x < 380
      ? 140 - (80 * (x - 300)) / 80
      : x <= 540
        ? 60
        : 60 + (80 * (x - 540)) / 80;
function passing(t) {
  let b =
    rect(380, 95, 340, 55, C.purple, C.ink) +
    rect(380, 205, 160, 40, C.blue, C.ink) +
    text(550, 128, 'truck', 15, 'white') +
    text(460, 230, 'car', 15, 'white') +
    arrow(600, 152, 0, 18, C.red, 3) +
    arrow(500, 203, 0, -18, C.red, 3);
  for (let j = 0; j < 7; j += 1) {
    for (const [row, y] of [
      [0, 70],
      [2, 275],
    ]) {
      const p = wrap(1.2 * t + j / 7 + row * 0.05);
      b += dot(60 + 780 * p, y, 5, C.guide, fadeEnds(p));
    }
    const p = wrap(1.2 * t + j / 7);
    b += dot(channelPosition(p, gapWidth, 60, 840), 177, 5, C.ink, fadeEnds(p));
  }
  b +=
    text(60, 112, 'Air speeds up in the gap', 15, C.ink, 'start') +
    text(60, 134, '→ lower pressure there', 15, C.red, 'start') +
    text(60, 240, 'Red: net push toward the gap', 14, C.red, 'start') +
    text(850, 230, 'v ∝ 1 / gap width', 14, C.guide, 'end') +
    text(450, 312, 'Viewed from above, in the vehicles’ frame: air streams past', 14, C.guide);
  return panel(
    'Passing a truck: faster air, lower pressure',
    b,
    'Tracers in the narrow gap move 2.3 times faster to carry the same flow. Bernoulli: the faster stream has lower pressure, so the vehicles are pushed together.'
  );
}

function laminar(t) {
  let b = rect(60, 80, 360, 220, 'white', C.ink) + line(60, 300, 420, 300, C.ink, 5);
  for (let i = 0; i < 5; i += 1) {
    const y = 280 - 45 * i,
      speed = (i + 1) / 5;
    b += arrow(70, y, 40 * speed, 0, C.guide, 2);
    for (let j = 0; j < 4; j += 1) {
      const p = wrap(1.6 * speed * t + j / 4);
      b += dot(120 + 290 * p, y, 6, C.blue, fadeEnds(p));
    }
  }
  b +=
    rect(480, 80, 380, 220, 'white', C.ink) +
    line(480, 300, 860, 300, C.ink, 5) +
    polygon(
      [
        [590, 300],
        [610, 262],
        [640, 258],
        [655, 300],
      ],
      C.guide
    );
  for (const y of [110, 160, 210]) {
    for (let j = 0; j < 3; j += 1) {
      const p = wrap(1.6 * t + j / 3);
      b += dot(490 + 100 * p, y + 50 * (y === 210 ? 0 : 0), 6, C.blue, fadeEnds(p));
    }
  }
  for (const [cx, cy, r, w] of [
    [690, 255, 24, 3],
    [765, 225, 30, -2],
    [830, 260, 22, 4],
    [720, 160, 20, -3],
  ]) {
    b += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}" stroke-width="1"/>`;
    for (let j = 0; j < 3; j += 1) {
      const a = 2 * Math.PI * (w * t + j / 3);
      b += dot(cx + r * Math.cos(a), cy + r * Math.sin(a), 5, C.red);
    }
  }
  b +=
    text(240, 70, '(a) Laminar: layers slide, no mixing', 15) +
    text(670, 70, '(b) Turbulent: eddies mix the fluid', 15) +
    text(65, 316, 'slowest at the wall', 13, C.guide, 'start');
  return panel(
    'Smooth layers versus swirling eddies',
    b,
    'Schematic tracers. In laminar flow each layer keeps its own speed. Past an obstruction the flow breaks into eddies.'
  );
}

function membrane(t) {
  const pores = [125, 190, 255];
  let b = rect(70, 80, 760, 220, 'white', C.ink);
  const edges = [80, ...pores.flatMap(y => [y - 9, y + 9]), 300];
  for (let i = 0; i < edges.length; i += 2)
    b += rect(436, edges[i], 28, edges[i + 1] - edges[i], C.gold, C.ink);
  pores.forEach((y, i) => {
    for (let j = 0; j < 2; j += 1) {
      const x = bounce(100 + 300 * j + 900 * t * (j ? -1 : 1) * (1 + 0.15 * i), 82, 818);
      b += dot(x, y, 5, C.blue);
    }
  });
  [100, 160, 220, 280].forEach((y, i) => {
    const left = bounce(120 + 1100 * t * (1 + 0.1 * i), 85, 422),
      right = bounce(780 - 1100 * t * (1 + 0.12 * i), 478, 815);
    b += dot(left, y - 8, 13, C.red) + dot(right, y + 4, 13, C.red);
  });
  b +=
    text(250, 318, 'small molecules: pass through pores', 14, C.blue) +
    text(650, 318, 'large molecules: bounce back', 14, C.red);
  return panel(
    'A semipermeable membrane sorts by size',
    b,
    'Schematic, not to scale. Molecules smaller than the pores cross in both directions; larger ones always reflect.'
  );
}

// ── Chapter 13 ───────────────────────────────────────────────────────────────

const dome = v => 1.5 - 0.5 * ((v - 2.2) / (v < 2.2 ? 1.2 : 1.8)) ** 2;
function pvIsotherm(t) {
  const V = 7.5 - 6.65 * t,
    s = subcriticalIsotherm(V),
    g = plot(80, 295, 440, 225, [0, 8], [0, 3]);
  let b =
    polygon(
      series(q => [g.X(0.3 + 4.9 * q), g.Y(Math.max(0, dome(0.3 + 4.9 * q)))]),
      C.fill,
      'none'
    ) +
    axes2(80, 295, 450, 235, 'V', 'P') +
    path(
      series(q => [g.X(2.1 + 5.9 * q), g.Y(6.3 / (2.1 + 5.9 * q))]),
      C.guide,
      'none',
      1.5
    ) +
    text(g.X(7.6), g.Y(6.3 / 7.6) - 10, 'T > T_c', 12, C.guide, 'end') +
    path(
      series(q => [g.X(0.85 + 6.65 * q), g.Y(subcriticalIsotherm(0.85 + 6.65 * q).pressure)], 120),
      C.grid,
      'none',
      2.5
    ) +
    path(
      series(
        q => [g.X(7.5 - (7.5 - V) * q), g.Y(subcriticalIsotherm(7.5 - (7.5 - V) * q).pressure)],
        120
      ),
      C.red,
      'none',
      3
    ) +
    dot(g.X(V), g.Y(s.pressure), 7, C.red) +
    text(g.X(2.4), g.Y(0.55), 'liquid + vapor', 13, C.guide);
  const k = 30,
    top = 300 - k * V;
  b +=
    rect(640, 70, 120, 230, 'none', C.ink) +
    rect(642, top, 116, 300 - top, '#cfe4f5', 'none') +
    rect(642, 300 - k * s.liquidFraction, 116, k * s.liquidFraction, C.blue, 'none') +
    rect(632, top - 12, 136, 12, C.guide) +
    line(700, top - 12, 700, 50, C.guide, 6);
  b += pick(
    700,
    320,
    ['Vapor: P rises as V shrinks', 'Condensing at constant P', 'Liquid: P rises steeply'],
    s.liquidFraction === 0 ? 0 : s.liquidFraction < 1 ? 1 : 2,
    15
  );
  return panel(
    'Compressing a vapor below the critical temperature',
    b,
    'Schematic isotherm at T < T_c. Across the shaded region vapor condenses at constant pressure (dark blue: liquid); above T_c no liquid ever separates.'
  );
}

function absoluteZero(t) {
  const T = 100 - 330 * clamp(t / 0.7),
    g = plot(90, 290, 470, 220, [-300, 120], [0, 1.45]),
    V = oxygenVolume(T);
  let b =
    axes2(90, 290, 480, 230, 'T (°C)', 'V / V₀') +
    visible(
      T < -183,
      line(g.X(-183), g.Y(oxygenVolume(-182.9)), g.X(-273.15), g.Y(0), C.ink, 2, '6 5')
    ) +
    path(
      series(q => {
        const Tq = 100 + (T - 100) * q;
        return [g.X(Tq), g.Y(oxygenVolume(Tq))];
      }, 160),
      C.blue,
      'none',
      3
    ) +
    dot(g.X(T), g.Y(V), 7, C.red);
  for (const [n, label] of [
    [-273.15, '−273.15'],
    [-183, '−183'],
    [0, '0'],
    [100, '100'],
  ])
    b += line(g.X(n), 285, g.X(n), 295, C.ink, 1) + text(g.X(n), 310, label, 12);
  b += text(g.X(-273.15) + 5, g.Y(0.45), 'absolute zero', 12, C.ink, 'start');
  const k = 150;
  b +=
    rect(680, 70, 110, 220, 'none', C.ink) +
    rect(682, 290 - k * V, 106, k * V, T > -183 ? '#cfe4f5' : C.blue, 'none') +
    rect(672, 290 - k * V - 12, 130, 12, C.guide);
  b += pick(
    735,
    318,
    ['Gas: V ∝ T + 273.15', 'Liquid oxygen', 'Solid oxygen'],
    T > -183 ? 0 : T > -218 ? 1 : 2,
    15
  );
  return panel(
    'Cooling a gas at constant pressure points to absolute zero',
    b,
    'Oxygen sample. The ideal-gas line, extended (dashed), reaches zero volume at −273.15 °C; real oxygen condenses at −183 °C and freezes at −218 °C.'
  );
}

function lake(t) {
  const Ts = 12 - 12 * clamp(t / 0.7),
    g = plot(80, 290, 340, 220, [0, 12], [0.9994, 1.0]),
    ice = 14 * clamp((t - 0.68) / 0.12);
  let b =
    axes2(80, 290, 350, 230, 'T (°C)', 'ρ (g/cm³)') +
    path(
      series(q => [g.X(12 * q), g.Y(waterDensity(12 * q))]),
      C.ink,
      'none',
      2.5
    ) +
    line(g.X(4), g.Y(0.9994), g.X(4), g.Y(1.0), C.grid, 1, '4 4') +
    dot(g.X(Ts), g.Y(waterDensity(Ts)), 7, C.blue) +
    text(g.X(4), g.Y(1.0) - 6, 'max at 4 °C', 12, C.guide);
  for (const n of [0, 4, 8, 12]) b += text(g.X(n), 308, String(n), 12);
  b +=
    rect(500, 110, 360, 190, C.fill, C.ink) +
    rect(500, 110, 360, ice, 'white', C.blue) +
    line(500, 110, 860, 110, C.blue, 2);
  for (const x of [560, 680, 800])
    b += visible(Ts > 4, arrow(x, 135, 0, 120, C.blue, 2) + arrow(x + 30, 255, 0, -120, C.red, 2));
  const temps = Array.from({ length: 13 }, (_, i) => 12 - i);
  b +=
    text(505, 100, 'surface:', 14, C.ink, 'start') +
    pick(
      570,
      100,
      temps.map(n => `${n} °C`),
      nearest(temps, Ts),
      14,
      C.blue,
      'start'
    ) +
    text(505, 290, 'bottom:', 14, C.ink, 'start') +
    pick(
      565,
      290,
      temps.map(n => `${Math.max(4, n)} °C`),
      nearest(temps, Ts),
      14,
      C.blue,
      'start'
    );
  b += pick(
    680,
    322,
    [
      'Colder surface water is denser: it sinks, mixing the lake',
      'Below 4 °C the surface is lighter: it stays on top',
      'Ice forms on top; the deep water stays at 4 °C',
    ],
    Ts > 4 ? 0 : ice > 0 ? 2 : 1,
    13
  );
  return panel(
    'Why lakes freeze from the top down',
    b,
    'Quadratic fit to freshwater density between 0 and 12 °C (±0.00005 g/cm³). The density change is tiny, but enough to drive or stop convection.'
  );
}

function tire(t) {
  const s = tireState(t),
    cx = 210,
    ry = 100 * (0.55 + 0.45 * ((s.volume - 0.4) / 0.6)),
    cy = 290 - ry;
  let b =
    line(60, 290, 380, 290, C.ink, 2) +
    polygon(
      series(q => [cx + 100 * Math.cos(2 * Math.PI * q), cy + ry * Math.sin(2 * Math.PI * q)], 36),
      C.ink
    ) +
    dot(cx, cy, 45, C.guide) +
    dot(cx, cy, 12, C.ink);
  const G = [610, 160],
    angle = rad(210 - (240 * s.gauge) / 300);
  b += `<circle cx="${G[0]}" cy="${G[1]}" r="85" fill="white" stroke="${C.ink}" stroke-width="3"/>`;
  for (let p = 0; p <= 300; p += 50) {
    const a = rad(210 - (240 * p) / 300);
    b +=
      line(
        G[0] + 70 * Math.cos(a),
        G[1] - 70 * Math.sin(a),
        G[0] + 82 * Math.cos(a),
        G[1] - 82 * Math.sin(a),
        C.ink,
        2
      ) + text(G[0] + 55 * Math.cos(a), G[1] - 55 * Math.sin(a) + 5, String(p), 11);
  }
  b +=
    line(G[0], G[1], G[0] + 68 * Math.cos(angle), G[1] - 68 * Math.sin(angle), C.red, 3) +
    dot(G[0], G[1], 5, C.ink) +
    text(G[0], G[1] + 40, 'gauge kPa', 12, C.guide);
  b +=
    visible(
      s.stage < 2,
      rect(380, 120, 20, 70, C.blue) +
        line(390, 120, 390, 95, C.ink, 3) +
        line(370, 95, 410, 95, C.ink, 4) +
        text(390, 210, 'pump', 13, C.blue)
    ) +
    visible(
      s.stage === 2,
      polygon(
        [
          [370, 290],
          [390, 245],
          [410, 290],
        ],
        C.gold
      ) + text(390, 235, 'heating', 13, C.red)
    );
  const gauges = Array.from({ length: 27 }, (_, i) => 10 * i),
    temps = [20, 25, 30, 35, 40, 45, 50];
  b +=
    pick(
      780,
      140,
      gauges.map(p => `${p} kPa`),
      nearest(gauges, s.gauge),
      18,
      C.red
    ) +
    pick(
      780,
      175,
      temps.map(n => `${n} °C`),
      nearest(temps, s.celsius),
      16,
      C.ink
    );
  b += pick(
    450,
    318,
    [
      'Flat tire: added air mostly fills out the volume',
      'Fixed volume: more air means more pressure',
      'Fixed volume and air: warmer means more pressure',
    ],
    s.stage,
    15
  );
  return panel(
    'Three ways to change a tire’s pressure',
    b,
    'Ideal gas, P ∝ NT/V. Gauge pressure stays near zero until the tire is full; then it rises with the amount of air, and with absolute temperature.'
  );
}

// Inline companions appended below existing generated figures, keyed by figure name.
const scenes = {
  Figure_02_04_10: train,
  Figure_02_08_03: jetArea,
  Figure_02_08_06: topSpeed,
  Figure_02_04_05: horse,
  Figure_02_04_09: subway,
  Figure_02_07_04: rockDown,
  Figure_02_05_03: proportional,
  Figure_03_01_04: walker,
  Figure_03_03_07: componentAddition,
  Figure_03_03_10: vectorSubtraction,
  Figure_04_05_07: tightrope,
  Figure_05_03_05: tendon,
  Figure_06_06_01: stringEllipse,
  Figure_06_05_02: inverseSquareForce,
  Figure_06_03_01: flatCurve,
  Figure_07_06_02: coasting,
  Figure_08_03_03: backscatter,
  Figure_08_06_02: darkRoom,
  Figure_09_03_14: sandwich,
  Figure_12_04_02: laminar,
  Figure_12_07_03: membrane,
  Figure_13_05_04: pvIsotherm,
  Figure_13_05_01: absoluteZero,
  Figure_13_02_03: lake,
  Figure_13_03_03: tire,
};

export function animateFigure01to13extra(name, svg) {
  const draw = scenes[name];
  return draw ? appendAnimation(svg, draw) : svg;
}

export const animationNames01to13extra = Object.keys(scenes);

const companion = (title, desc, draw) => () => standalone(title, desc, draw);
export default {
  companion_01_02_scales: companion(
    'Orders of magnitude from a proton to the universe',
    'A marker sweeps a logarithmic length axis from 10 to the minus 15 meters to 10 to the 26 meters, passing a proton, an atom, a virus, a cell, a person, Earth, the Earth–Moon and Earth–Sun distances, a light-year, the Milky Way and the observable universe.',
    scales
  ),
  companion_01_02_cesium: companion(
    'An atomic clock counts cesium oscillations',
    'A slowed wave represents the cesium-133 radiation. A bar fills as cycles are counted; 9 192 631 770 cycles make exactly one second.',
    cesiumClock
  ),
  companion_03_03_components: companion(
    'Vector components through a full rotation',
    'Vector A turns through 360 degrees while its x component A cos theta and y component A sin theta grow, shrink and change sign; a graph traces both against the angle.',
    rotatingVector
  ),
  companion_04_07_traffic_light: companion(
    'Balancing the forces on a traffic light',
    'A 15.0-kilogram traffic light hangs from wires at 30 and 45 degrees. Tensions of 108 and 132 newtons are resolved into components; the horizontal components cancel at 93.2 newtons each and the vertical components add to the 147-newton weight.',
    trafficLight
  ),
  companion_04_08_exchange: companion(
    'Two skaters exchange a ball',
    'A 60-kilogram skater throws a 5.0-kilogram ball at 6.0 meters per second and recoils; the second skater catches it and moves away. Momentum bars show the total stays zero.',
    exchange
  ),
  companion_04_03_same_force: companion(
    'One push on a basketball and on an SUV',
    'The same 30-newton push for 0.20 seconds accelerates a 0.62-kilogram basketball 4.8 meters in 0.60 seconds but moves an 1800-kilogram SUV only 1.7 millimeters.',
    sameForce
  ),
  companion_05_02_terminal: companion(
    'A skydiver approaches terminal velocity',
    'A 75-kilogram skydiver falls from rest. Drag grows with the square of speed until it equals the weight; the velocity graph levels off at 98 meters per second.',
    terminal
  ),
  companion_05_01_push_pull: companion(
    'Pushing versus pulling a block of ice',
    'As the angle of the applied force grows, pushing down at the angle increases the normal force, while pulling up at the angle reduces it, so pulling always needs less force to start the block. At 25 degrees the starting forces are 51.0 and 46.5 newtons.',
    pushPull
  ),
  companion_06_01_radian: companion(
    'Measuring an angle in radians',
    'A radius sweeps a full circle while the arc it traces is laid out straight and measured in radius lengths; a full turn is 2 pi, about 6.28 radians.',
    radianDefinition
  ),
  companion_07_05_rocks: companion(
    'A rock dropped on a spring and on soil',
    'Two identical rocks fall 1.00 meter. The spring stores and returns the energy so the rock bounces back to its starting height; the soil stops the rock and the mechanical energy becomes thermal energy and sound.',
    rocks
  ),
  companion_09_06_forearm: companion(
    'Biceps force as a book slides along the forearm',
    'A book moves from 10 to 38 centimeters from the elbow. Because the biceps attaches only 4.00 centimeters from the pivot, its force grows from 196 to 470 newtons, more than seven times the supported weight.',
    forearm
  ),
  companion_09_04_pole: companion(
    'Hand forces on a pole as its center of gravity moves',
    'A 49.0-newton pole is held with hands 0.900 meters apart. As its center of gravity moves from midway, toward the right hand, then outside the left hand, the hand forces change, and the right hand ends up pushing down.',
    pole
  ),
  companion_10_06_twins: companion(
    'Twin skaters link hands and spin',
    'Two equal skaters glide on parallel paths, link hands, and rotate about their center of mass. Their angular momentum is the same before and after.',
    twins
  ),
  companion_10_07_gyroscope: companion(
    'Gyroscope precession',
    'A spinning gyroscope supported at one end of its axle precesses about the vertical. Gravity’s torque is horizontal and perpendicular to the angular momentum, so the angular momentum turns sideways; a top view shows the change along the torque.',
    gyroscope
  ),
  companion_10_03_merry: companion(
    'Three ways to push a merry-go-round',
    'The same 250-newton push is applied at the edge perpendicular to the radius, at half the radius, and at the edge 30 degrees from the radius. The first gives 6.67 radians per second squared; the other two give half as much.',
    merry
  ),
  companion_11_01_phases: companion(
    'Particle motion in solids, liquids and gases',
    'Solid atoms vibrate about fixed sites linked by bonds, liquid particles stay in contact while changing neighbors, and gas particles fly freely and bounce off the walls.',
    phases
  ),
  companion_11_07_ship: companion(
    'Loading a ship lowers it in the water',
    'Four cargo loads are lowered onto a flat-sided ship. Each adds weight, and the ship settles until the buoyant force equals its total weight; the draft grows from 3.00 to 8.00 meters.',
    shipLoad
  ),
  companion_11_06_cuff: companion(
    'Measuring blood pressure with a cuff',
    'As cuff pressure falls from 160 to 60 millimeters of mercury, the artery stays closed above the systolic 120, opens in turbulent spurts that make sounds between 120 and 80, and flows smoothly and silently below the diastolic 80.',
    cuff
  ),
  companion_12_02_passing: companion(
    'Air flow between a car and a truck',
    'Seen from above, air streams past a car beside a truck. Tracers in the narrow gap move faster, so the pressure there is lower and the vehicles are pushed toward each other.',
    passing
  ),
};
