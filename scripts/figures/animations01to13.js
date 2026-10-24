/** Animated companions for the chapter 1–13 illustration review.
 * Existing artwork remains intact above each companion. All motion is analytic,
 * self-contained SMIL, with an independently drawn static fallback for print and
 * reduced motion. No image scripts, external fonts, or runtime dependencies.
 */
import {
  C,
  f,
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
  axes,
  panel,
  standalone,
  appendAnimation,
} from './animation-svg.js';
import {
  carMotion,
  elevatorMotion,
  frictionMotion,
  circularMotion,
  hydraulicMotion,
  pipeSpeed,
  skaterMotion,
  fragmentMotion,
  rocketMotion,
  venturiPosition,
  displacementPaths,
  pathProgress,
} from './animation-models.js';

const car = (x, y, color = C.red) =>
  rect(x - 18, y - 10, 36, 17, color) +
  rect(x - 10, y - 19, 20, 9, C.fill) +
  dot(x - 10, y + 8, 5, C.ink) +
  dot(x + 10, y + 8, 5, C.ink);
const person = (x, y) =>
  dot(x, y - 70, 11, C.ink) +
  line(x, y - 59, x, y - 24, C.ink, 5) +
  line(x, y - 48, x - 20, y - 32, C.ink, 4) +
  line(x, y - 48, x + 20, y - 32, C.ink, 4) +
  line(x, y - 24, x - 14, y, C.ink, 4) +
  line(x, y - 24, x + 14, y, C.ink, 4);
const ballPath = (fn, t, color = C.blue, r = 7) => {
  const [x, y] = fn(t);
  return dot(x, y, r, color);
};
const spring = (x, y, length, height = 10) =>
  path(
    Array.from({ length: 17 }, (_, i) => [
      x + (length * i) / 16,
      y + (i === 0 || i === 16 ? 0 : i % 2 ? height : -height),
    ]),
    C.guide
  );

function target(t, precise) {
  const pts = precise
    ? [
        [-82, 48],
        [-78, 62],
        [-94, 65],
        [-88, 78],
      ]
    : [
        [-52, -30],
        [52, 30],
        [-30, 52],
        [30, -52],
      ];
  const center = [250, 170];
  let body = '';
  for (let i = 5; i >= 1; i--)
    body += `<circle cx="250" cy="170" r="${i * 24}" fill="${i % 2 ? C.red : 'white'}"/>`;
  pts.forEach(([x, y], i) => {
    body += visible(t > (i + 1) * 0.14, dot(center[0] + x, center[1] + y, 7, C.ink));
  });
  const mx = pts.reduce((s, p) => s + p[0], 0) / 4,
    my = pts.reduce((s, p) => s + p[1], 0) / 4;
  body += visible(
    t > 0.65,
    line(250 + mx - 12, 170 + my, 250 + mx + 12, 170 + my, C.blue, 3) +
      line(250 + mx, 158 + my, 250 + mx, 182 + my, C.blue, 3)
  );
  body +=
    text(520, 120, 'Black dots: repeated measurements', 19, C.ink, 'start') +
    text(520, 162, 'Blue cross: their mean', 19, C.blue, 'start');
  body += text(
    520,
    215,
    precise ? 'Small spread, systematic offset' : 'Wide spread, mean near target',
    19,
    C.ink,
    'start'
  );
  return panel(
    precise ? 'High precision, low accuracy' : 'Low precision, accurate on average',
    body,
    'The mean and spread describe different properties of repeated measurements.'
  );
}

function meter(t) {
  let body = line(130, 210, 770, 210, C.ink, 3);
  for (let i = 0; i <= 10; i++)
    body +=
      line(130 + i * 64, 200, 130 + i * 64, 220) + text(130 + i * 64, 245, String(i * 10), 14);
  body +=
    text(800, 245, 'cm', 16) +
    arrow(130, 150, 640, 0, C.gold, 2) +
    dot(130 + 640 * t, 150, 9, C.gold);
  body +=
    text(450, 95, 'Light in vacuum: c = 299 792 458 m/s', 20) +
    text(450, 285, '1 m / c = 1 / 299 792 458 s ≈ 3.34 ns', 19);
  return panel(
    'One meter, defined by the travel time of light',
    body,
    'The visible pulse is greatly slowed down; the physical transit time is 3.34 ns.'
  );
}

function uncertainty(t) {
  const X = v => 100 + (v - 24.4) * 580;
  let b = axes(100, 265, 700, 190, 'Length (cm)', '');
  for (let i = 0; i <= 6; i++) {
    const v = 24.4 + i * 0.2;
    b += text(X(v), 291, v.toFixed(1), 15);
  }
  b += line(X(25), 70, X(25), 265, C.guide, 2, '5 4') + text(X(25), 57, 'Accepted: 25.00 cm', 17);
  for (const [value, err, y, label] of [
    [25.1, 0.3, 140, 'A: 25.1 ± 0.3 cm'],
    [24.62, 0.05, 210, 'B: 24.62 ± 0.05 cm'],
  ]) {
    const q = clamp((t - (y === 140 ? 0.1 : 0.4)) * 3),
      color = y === 140 ? C.blue : C.red;
    b +=
      text(790, y - 23, label, 17, C.ink, 'end') +
      dot(X(value), y, 5, color) +
      line(X(value - err * q), y, X(value + err * q), y, color, 4);
    for (const sign of [-1, 1])
      b += line(X(value + sign * err * q), y - 8, X(value + sign * err * q), y + 8, color, 2);
  }
  return panel(
    'Compare uncertainty intervals with the accepted value',
    b,
    'A includes the accepted value. B is more precise, but misses it.'
  );
}

function cars(t) {
  let b = text(700, 68, 'Velocity v', 16, C.green) + text(810, 68, 'Acceleration a', 16, C.purple);
  for (let i = 0; i < 4; i++) {
    const s = carMotion(t * 3, i),
      y = 105 + i * 54,
      x = (i < 2 ? 120 : 450) + s.x;
    b +=
      line(65, y + 17, 510, y + 17, C.grid) +
      car(x, y) +
      arrow(600, y, s.v * 0.75, 0, C.green) +
      arrow(790, y, s.a * 3, 0, C.purple);
    b +=
      text(560, y + 5, ['(a)', '(b)', '(c)', '(d)'][i], 16) +
      text(90, y - 19, i === 0 || i === 3 ? 'speeding up' : 'slowing down', 13, C.guide, 'start');
  }
  return panel(
    'Acceleration changes velocity, including its sign',
    b,
    'All four motions share the same clock; negative acceleration can increase speed.'
  );
}

function distance(t) {
  let b = '';
  displacementPaths.forEach((p, i) => {
    const y = 90 + i * 54;
    const { x, distance: s } = pathProgress(p, t);
    const X = v => 90 + v * 40;
    b +=
      line(90, y, 570, y, C.grid) +
      dot(X(x), y) +
      line(X(p[0]), y + 12, X(x), y + 12, C.blue, 4) +
      text(65, y + 5, 'ABCD'[i], 17);
    b +=
      rect(660, y - 13, s * 8, 8, C.gold, 'none') +
      text(640, y + 15, 'distance', 13, C.gold, 'end') +
      arrow(660, y + 15, (x - p[0]) * 8, 0, C.blue);
  });
  return panel(
    'Follow the route; compare distance with displacement',
    b,
    'Gold accumulates path length. Blue shows signed displacement from the start.'
  );
}

function fall(t) {
  const X = 150,
    Y = 75,
    scale = 145;
  let b = line(80, 278, 245, 278, C.ink) + text(160, 55, 'Released from rest', 17);
  for (let i = 0; i <= 5; i++)
    b += visible(t >= i / 5, dot(X, Y + scale * (i / 5) ** 2, 3, C.guide));
  b += dot(X, Y + scale * t * t, 9, C.blue);
  for (const [ox, kind, label, color] of [
    [330, 2, 'Downward distance (m)', C.blue],
    [610, 1, 'Downward speed (m/s)', C.green],
  ]) {
    const h = 145;
    b +=
      axes(ox, 260, 220, 180, 'Time (s)', label) +
      path(
        series(q => [ox + 200 * q, 260 - h * q ** kind]),
        color
      );
    b += dot(ox + 200 * t, 260 - h * t ** kind, 6, color);
    for (let i = 0; i <= 5; i++) b += text(ox + i * 40, 285, (i * 0.1).toFixed(1), 13);
  }
  return panel(
    'Free fall: position and velocity share one clock',
    b,
    'After 0.50 s: downward distance 1.225 m, speed 4.90 m/s; g = 9.80 m/s².'
  );
}

function vectorAddition(t) {
  const q = clamp(t * 1.7),
    x = 180 + 230 * q,
    y = 250;
  let b =
    axes(180, 250, 470, 180, 'x', 'y') +
    arrow(180, 250, 230, 0, C.blue) +
    arrow(x, y, 0, (-230 * 5) / 9, C.purple);
  b +=
    visible(t > 0.65, arrow(180, 250, 230, (-230 * 5) / 9, C.green)) +
    text(305, 235, 'A: 9 units east', 17, C.blue) +
    text(x + 20, y - 60, 'B', 22, C.purple);
  b +=
    text(650, 110, 'Translate B; do not rotate it.', 18) +
    text(650, 150, 'Then draw R = A + B.', 18, C.green);
  return panel(
    'Build a vector sum head to tail',
    b,
    'A = 9 units east, B = 5 units north. B keeps its magnitude and direction throughout.'
  );
}

function boat(t) {
  const x = 190 + 360 * t,
    y = 270 - 170 * t;
  let b =
    rect(130, 70, 600, 215, C.fill, 'none') +
    line(130, 70, 730, 70, C.green, 7) +
    line(130, 285, 730, 285, C.green, 7);
  for (let i = 0; i < 5; i++) b += arrow(155 + i * 110, 102, 50, 0, C.guide, 1.5);
  b +=
    path(
      [
        [190, 270],
        [550, 100],
      ],
      C.guide
    ) +
    polygon(
      [
        [x, y - 12],
        [x + 9, y + 7],
        [x - 9, y + 7],
      ],
      C.gold,
      C.ink
    ) +
    arrow(x, y, 0, -60, C.blue) +
    arrow(x, y - 60, 126, 0, C.purple) +
    arrow(x, y, 126, -60, C.green);
  b +=
    dot(190 + 360 * t, 270, 4, C.purple) +
    text(760, 100, 'Water drift', 16, C.purple) +
    text(760, 140, 'Boat in water', 16, C.blue) +
    text(760, 180, 'Ground velocity', 16, C.green);
  return panel(
    'River current changes the boat’s ground track',
    b,
    'Constant velocities: ground velocity = boat relative to water + water relative to bank.'
  );
}

function ship(t) {
  let b = '';
  for (const shore of [false, true]) {
    const ox = shore ? 485 : 60,
      cx = ox + 100 + (shore ? 180 * t : 0),
      cy = 260;
    b +=
      text(ox + 165, 62, shore ? 'Observer on shore' : 'Observer on ship', 19) +
      rect(ox, 265, 330, 35, C.fill, 'none');
    b +=
      polygon(
        [
          [cx - 55, cy],
          [cx + 65, cy],
          [cx + 45, cy + 18],
          [cx - 35, cy + 18],
        ],
        C.gold,
        C.ink
      ) + line(cx, cy, cx, 110, C.ink, 3);
    const px = ox + 100 + (shore ? 180 * t : 0),
      py = 110 + 145 * t * t;
    b +=
      dot(px, py, 7, C.red) +
      path(
        series(q => [ox + 100 + (shore ? 180 * q : 0), 110 + 145 * q * q]),
        C.guide
      );
  }
  return panel(
    'One falling object, two reference frames',
    b,
    'Constant ship speed, no air resistance: both observers agree on the fall time.'
  );
}

function elevator(t) {
  const time = t * (2 / 1.2 + 2),
    s = elevatorMotion(time),
    dy = -s.y * 38;
  let b =
    rect(130, 65, 225, 240, 'none', C.grid) +
    rect(160, 185 + dy, 165, 110, 'none', C.ink) +
    rect(218, 275 + dy, 50, 9, C.blue) +
    person(243, 275 + dy);
  b +=
    text(245, 310, 'Elevator moving upward', 16) +
    dot(520, 170, 7, C.ink) +
    arrow(520, 170, 0, 88, C.red) +
    arrow(520, 170, 0, -s.normal / 8.35, C.blue);
  b +=
    text(560, 258, 'w = 735 N', 18, C.red, 'start') +
    text(560, 85, 'Fₛ = scale reading', 18, C.blue, 'start');
  for (const [show, label, n] of [
    [time < 1 / 1.2, 'Accelerating upward: a = +1.20 m/s²', 'Fₛ = 825 N'],
    [time >= 1 / 1.2 && time < 1 / 1.2 + 2, 'Constant upward speed: a = 0', 'Fₛ = 735 N'],
    [time >= 1 / 1.2 + 2, 'Slowing while moving upward: a = −1.20 m/s²', 'Fₛ = 645 N'],
  ]) {
    b += visible(show, text(635, 140, label, 16) + text(635, 190, n, 24, C.blue));
  }
  return panel(
    'A scale measures normal force, not velocity',
    b,
    'Person: 75.0 kg, g = 9.80 m/s². Fₛ − mg = ma; weight stays constant.'
  );
}

function swimmer(t) {
  const contact = t < 0.35,
    q = Math.min(t / 0.35, 1),
    x = 640 - (contact ? 55 * q * q : 55 + (110 / 0.35) * (t - 0.35)),
    y = 180,
    feet = contact ? 760 : x + 175;
  let b =
    rect(70, 80, 720, 220, C.fill, 'none') +
    rect(760, 80, 20, 220, C.guide) +
    dot(x - 80, y, 12, C.ink) +
    line(x - 67, y, x, y, C.ink, 8) +
    line(x, y, feet, y + 12, C.ink, 5);
  b += visible(contact, arrow(760, 140, 65, 0, C.red) + arrow(feet, y + 12, -65, 0, C.blue));
  b +=
    text(450, 65, 'Contact forces act on different objects', 18) +
    text(170, 120, 'Force on swimmer', 17, C.blue) +
    text(760, 115, 'Force on wall', 17, C.red);
  b += visible(!contact, text(420, 260, 'After contact: coasting, no wall force', 19));
  return panel(
    'Newton’s third law: pushing off a wall',
    b,
    'Equal and opposite contact forces. Vertical weight and buoyancy balance; drag is neglected.'
  );
}

function sled(t) {
  const x = 130 + 400 * t * t,
    y = 235;
  let b =
    line(70, 260, 810, 260, C.ink) +
    rect(x - 30, y - 20, 70, 26, C.gold) +
    dot(x - 15, y + 10, 7, C.ink) +
    dot(x + 25, y + 10, 7, C.ink);
  for (let i = 0; i < 4; i++) b += arrow(x - 25, y - 45 - i * 17, 70, 0, C.red, 2);
  b +=
    arrow(x, y, -45, 0, C.purple) +
    arrow(x + 20, y, 0, -80, C.blue) +
    arrow(x + 20, y, 0, 80, C.green);
  b +=
    text(640, 100, '4 equal thrusts →', 18, C.red) +
    text(640, 145, '← friction', 18, C.purple) +
    text(640, 190, 'Fnet = 4T − f > 0', 20) +
    text(640, 225, 'N = w', 20);
  return panel(
    'Rocket sled: net force changes speed',
    b,
    'Constant-mass idealization over a short interval: x − x₀ = ½at²; vertical forces balance.'
  );
}

function friction(t) {
  const s = frictionMotion(4 * t),
    x = 140 + 70 * s.x;
  let b =
    line(80, 260, 570, 260, C.ink) +
    rect(x - 25, 205, 50, 50, C.gold) +
    arrow(x, 225, s.force * 1.4, 0, C.blue) +
    arrow(x, 248, -s.friction * 1.4, 0, C.red);
  b +=
    axes(620, 270, 200, 180, 'Time (s)', 'Force (N)') +
    path(
      series(q => [620 + 190 * q, 270 - 160 * q]),
      C.blue
    );
  b +=
    path(
      [
        [620, 270],
        [620 + (190 * 2.5) / 4, 170],
        [620 + (190 * 2.5) / 4, 210],
        [810, 210],
      ],
      C.red
    ) +
    dot(620 + 190 * t, 270 - s.force * 2, 5, C.blue) +
    dot(620 + 190 * t, 270 - s.friction * 2, 5, C.red);
  b +=
    visible(t <= 0.625, text(300, 110, 'Sticking: friction matches the push', 18)) +
    visible(t > 0.625, text(300, 110, 'Sliding: kinetic friction = 30 N', 18));
  return panel(
    'Static friction adjusts until the crate slips',
    b,
    'Blue: push. Red: friction magnitude. 10 kg crate; g = 10 m/s², μₛ = 0.5, μₖ = 0.3.'
  );
}

function hooke(t) {
  const q = t < 0.5 ? 2 * t : 2 * (1 - t),
    extension = 120 * q;
  let b =
    line(90, 100, 90, 260, C.ink, 5) +
    spring(90, 180, 120 + extension) +
    rect(210 + extension, 160, 40, 40, C.gold) +
    arrow(250 + extension, 180, 65 * q, 0, C.blue);
  b +=
    axes(540, 270, 250, 170, 'Force F (N)', 'Extension ΔL (m)') +
    path(
      [
        [540, 270],
        [760, 100],
      ],
      C.red
    ) +
    dot(540 + 220 * q, 270 - 170 * q, 7, C.red);
  b += text(290, 100, 'Load, then unload', 19) + text(670, 72, 'Elastic region only', 17);
  return panel(
    'Hooke’s law: reversible deformation',
    b,
    'The companion stays within the linear elastic region: ΔL = F/k.'
  );
}

function strain(t) {
  const q = 0.5 - 0.5 * Math.cos(2 * Math.PI * t);
  let b = '';
  for (const sign of [1, -1]) {
    const cx = sign === 1 ? 260 : 650,
      h = 130 + sign * 40 * q,
      w = 70;
    b +=
      rect(cx - w / 2, 165 - 65, w, 130, 'none', C.grid) +
      rect(cx - w / 2, 165 - h / 2, w, h, C.fill) +
      arrow(cx, 165 - h / 2, 0, -sign * 55, C.red) +
      arrow(cx, 165 + h / 2, 0, sign * 55, C.red);
    b += text(
      cx,
      290,
      sign === 1 ? 'Tension: length increases' : 'Compression: length decreases',
      18
    );
  }
  return panel(
    'Small elastic strains under tension and compression',
    b,
    'Deformation is exaggerated; the original gray outline marks the unloaded length.'
  );
}

function angularSpeed(t) {
  const theta = -2 * Math.PI * t,
    cx = 235,
    cy = 180;
  let b = '';
  for (const [r, color] of [
    [55, C.blue],
    [105, C.red],
  ]) {
    b += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}"/>`;
    b +=
      line(cx, cy, cx + r * Math.cos(theta), cy + r * Math.sin(theta), color) +
      dot(cx + r * Math.cos(theta), cy + r * Math.sin(theta), 7, color);
  }
  b +=
    text(630, 115, 'Both markers: same angular speed ω', 20) +
    text(630, 165, 'Outer radius = 2 × inner radius', 19) +
    text(630, 210, 'Outer speed = 2 × inner speed', 19, C.red) +
    text(630, 265, 'v = rω     Δs = rΔθ', 22);
  return panel(
    'Equal angles, unequal distances',
    b,
    'Two points on the same rigid disk complete each revolution together.'
  );
}

function banked(t) {
  const a = (25 * Math.PI) / 180,
    n = 105,
    ox = 250,
    oy = 230;
  let b =
    line(80, 275, 420, 115, C.ink, 5) +
    car(250, 180, C.blue) +
    arrow(ox, oy, -n * Math.sin(a), -n * Math.cos(a), C.blue) +
    arrow(ox, oy, 0, n * Math.cos(a), C.red);
  b += visible(
    t > 0.15,
    arrow(ox, oy, -n * Math.sin(a), 0, C.green) +
      line(ox - n * Math.sin(a), oy, ox - n * Math.sin(a), oy - n * Math.cos(a), C.guide, 1, '4 4')
  );
  const theta = 2 * Math.PI * t,
    cx = 650,
    cy = 185,
    r = 85,
    x = cx + r * Math.cos(theta),
    y = cy + r * Math.sin(theta);
  b += `<circle cx="650" cy="185" r="85" fill="none" stroke="${C.grid}"/>${dot(x, y, 8, C.blue)}${arrow(x, y, (cx - x) * 0.65, (cy - y) * 0.65, C.green)}${text(650, 62, 'Plan view: car turning', 18)}`;
  b += text(230, 75, 'Rear-view force components', 18);
  return panel(
    'A banked road supplies inward force',
    b,
    'Frictionless design speed: N cos θ = mg, N sin θ = mv²/r. Green is a component of N.'
  );
}

function frames(t) {
  let b = '';
  for (const rotating of [true, false]) {
    const cx = rotating ? 250 : 650,
      cy = 180,
      r = 80,
      angle = 1.2 * t;
    // Inertial release: (r, ωrt). Rotate the coordinates back by ωt for the rotating view.
    const xx = r,
      yy = r * angle,
      x = rotating ? xx * Math.cos(angle) + yy * Math.sin(angle) : xx,
      y = rotating ? -xx * Math.sin(angle) + yy * Math.cos(angle) : yy;
    b += `<circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="${C.grid}"/>${dot(cx + x, cy - y, 7, C.red)}`;
    b += path(
      series(q => {
        const a = 1.2 * q;
        return [
          cx + (rotating ? r * Math.cos(a) + r * a * Math.sin(a) : r),
          cy - (rotating ? -r * Math.sin(a) + r * a * Math.cos(a) : r * a),
        ];
      }),
      C.guide
    );
    const rim = rotating ? 0 : angle;
    b +=
      line(cx, cy, cx + r * Math.cos(rim), cy - r * Math.sin(rim), C.blue) +
      text(cx, 62, rotating ? 'Rotating coordinates' : 'Inertial coordinates', 20);
  }
  return panel(
    'Release from a rotating disk',
    b,
    'After release, real horizontal net force is zero: straight in the inertial view, curved in the rotating view.'
  );
}

function work(t) {
  let b = '';
  for (const variable of [false, true]) {
    const x0 = variable ? 520 : 90,
      Y = 265,
      force = q => (variable ? 30 + 100 * q : 85);
    b += axes(x0, Y, 285, 180, 'Displacement x (m)', 'Parallel force (N)');
    b += path(
      [[x0, Y], ...series(q => [x0 + 260 * t * q, Y - force(t * q)]), [x0 + 260 * t, Y]],
      'none',
      C.fill,
      0
    );
    b +=
      path(
        series(q => [x0 + 260 * q, Y - force(q)]),
        C.blue
      ) +
      line(x0 + 260 * t, Y, x0 + 260 * t, 65, C.red, 2) +
      text(x0 + 125, 95, variable ? 'Variable force' : 'Constant force', 18);
  }
  return panel(
    'Work accumulates as signed area under F∥ versus x',
    b,
    'The moving red cursor is displacement; shaded area is work, measured in joules.'
  );
}

function frictionWork(t) {
  let b = '';
  for (const long of [false, true]) {
    const ox = long ? 500 : 90,
      fn = q => [ox + 220 * q, 240 - 110 * q + (long ? 65 * Math.sin(Math.PI * q) : 0)];
    b +=
      path(series(fn), C.guide) +
      ballPath(fn, t, C.blue) +
      text(ox + 110, 75, long ? 'Longer route' : 'Short route', 19);
    const points = series(q => fn(t * q));
    const length = points
      .slice(1)
      .reduce((sum, p, i) => sum + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0);
    b +=
      rect(ox, 290, length * 0.65, 10, C.gold, 'none') +
      text(ox + 110, 318, 'Energy dissipated ∝ path length', 14, C.gold);
  }
  return panel(
    'Frictional work depends on path length',
    b,
    'Same endpoints, same friction magnitude: a longer path transfers more mechanical energy to heat.'
  );
}

function conservative(t) {
  let b = '';
  for (const curve of [false, true]) {
    const ox = curve ? 510 : 90,
      fn = q => [ox + 220 * q + (curve ? 35 * Math.sin(Math.PI * q) : 0), 270 - 160 * q];
    b +=
      path(series(fn), C.guide) +
      ballPath(fn, t, C.red) +
      text(ox + 100, 75, curve ? 'Curved route' : 'Straight incline', 19);
    b +=
      rect(ox, 290, 220 * (1 - t), 9, C.blue, 'none') +
      rect(ox + 220 * (1 - t), 290, 220 * t, 9, C.gold, 'none');
  }
  b +=
    text(450, 110, 'Compare at equal heights: same speed', 19) +
    text(450, 150, 'K + U = constant', 23);
  return panel(
    'Mechanical energy depends on height, not the route',
    b,
    'Equal-height comparison (not equal-time motion). Blue: kinetic energy; gold: gravitational energy.'
  );
}

function impulse(t) {
  const x0 = 135,
    Y = 280,
    W = 540,
    H = 175,
    force = q => H * Math.sin(Math.PI * q) ** 2,
    mean = H / 2;
  let b = axes(x0, Y, W + 55, 210, 'Time t (s)', 'Force F (N)');
  b += path(
    [[x0, Y], ...series(q => [x0 + W * t * q, Y - force(t * q)]), [x0 + W * t, Y]],
    'none',
    C.fill,
    0
  );
  b +=
    path(
      series(q => [x0 + W * q, Y - force(q)]),
      C.blue
    ) +
    path(
      [
        [x0, Y],
        [x0, Y - mean],
        [x0 + W, Y - mean],
        [x0 + W, Y],
      ],
      C.purple
    );
  b +=
    line(x0 + W * t, Y, x0 + W * t, 60, C.red, 2) +
    text(750, 120, 'Actual pulse', 17, C.blue) +
    text(750, 180, 'Equivalent mean', 17, C.purple);
  return panel(
    'Impulse is the accumulated force–time area',
    b,
    'The rectangle and complete pulse have equal total area; their partial areas need not be equal.'
  );
}

function rocket(t) {
  const time = 4 * t,
    s = rocketMotion(time),
    x = 270,
    y = 280 - 90 * s.y;
  let b =
    polygon(
      [
        [x, y - 35],
        [x - 18, y + 15],
        [x + 18, y + 15],
      ],
      C.blue,
      C.ink
    ) + arrow(x + 45, y, 0, -s.v * 100, C.green);
  for (let i = 0; i < 24; i++) {
    const ti = i / 6,
      dt = Math.max(0, time - ti),
      e = rocketMotion(ti),
      vy = e.v - e.exhaustSpeed;
    b += visible(
      time >= ti,
      dot(x, 280 - 90 * (e.y + vy * dt - 0.5 * e.gravity * dt * dt), 4, C.gold)
    );
  }
  b +=
    text(610, 110, 'Mass decreases as exhaust leaves.', 19) +
    text(610, 160, 'vₑ is relative to the rocket.', 19) +
    text(610, 210, 'm dv/dt = ṁout vₑ − mg', 23) +
    rect(535, 250, (150 * s.mass) / 10, 10, C.gold, 'none') +
    text(610, 290, 'Remaining rocket mass', 17, C.gold);
  return panel(
    'Rocket thrust is momentum exchange with exhaust',
    b,
    'Illustrative model: constant mass flow and exhaust speed, with downward gravity included.'
  );
}

function fragments(t) {
  const time = 2.8 * t,
    s = fragmentMotion(time),
    P = p => [120 + 200 * p[0], 270 - 75 * p[1]];
  let b = path(
    series(q => P(fragmentMotion(q * 2.8).center)),
    C.guide
  );
  b += visible(time < 1, dot(...P(s.center), 11, C.blue));
  b += visible(time >= 1, dot(...P(s.first), 7, C.red) + dot(...P(s.second), 10, C.blue));
  b +=
    dot(...P(s.center), 3, C.ink) +
    text(680, 75, 'm₁ : m₂ = 1 : 2', 20) +
    text(680, 115, 'Black dot: center of mass', 17);
  return panel(
    'Fragments separate; their center of mass keeps its trajectory',
    b,
    'Equal and opposite separation impulses. Both fragments experience the same gravitational acceleration.'
  );
}

function tipping(t) {
  const angle = 0.8 * t,
    cx = 300,
    cy = 280,
    L = 185,
    w = 32;
  const P = (x, y) => [
    cx + x * Math.cos(angle) + y * Math.sin(angle),
    cy - x * Math.sin(angle) + y * Math.cos(angle),
  ];
  const cg = P(w / 2, -L / 2),
    base = P(w, 0),
    tip = P(w / 2, -L - 20);
  let b =
    line(130, 280, 480, 280, C.ink) +
    polygon([P(0, 0), base, P(w, -L), tip, P(0, -L)], C.gold, C.ink);
  b +=
    dot(cx, cy, 5, C.ink) +
    dot(...cg, 5, C.red) +
    arrow(...cg, 0, 90, C.red) +
    line(cg[0], cg[1], cg[0], 280, C.guide, 1, '5 4');
  b +=
    text(670, 110, 'Pivot: contact edge', 19) +
    text(670, 155, 'Watch the vertical weight line.', 18) +
    visible(cg[0] > cx, text(670, 210, 'Restoring torque', 22, C.blue)) +
    visible(cg[0] <= cx, text(670, 210, 'Overturning torque', 22, C.red));
  return panel(
    'Tipping starts when the center of mass passes the support edge',
    b,
    'The tilt is imposed for comparison; this is not a free-fall timing model.'
  );
}

function neutral(t) {
  const x = 210 + 260 * t;
  let b = `${line(120, 255, 740, 255, C.ink)}<circle cx="${f(x)}" cy="210" r="45" fill="${C.gold}" stroke="${C.ink}"/>${dot(x, 210, 4, C.red)}${arrow(x, 210, 0, 45, C.red)}`;
  b +=
    line(100, 210, 760, 210, C.guide, 1, '5 5') +
    text(450, 80, 'Place at any position, then release from rest.', 20) +
    text(450, 120, 'Center-of-mass height stays the same.', 19);
  return panel(
    'Neutral equilibrium on a level surface',
    b,
    'Positions are compared by repositioning; no restoring torque appears. Motion between positions is imposed.'
  );
}

function crank(t) {
  const theta = -2 * Math.PI * t,
    cx = 320,
    cy = 180,
    r = 90,
    small = 30;
  let b = '';
  for (const [radius, color] of [
    [r, C.blue],
    [small, C.red],
  ]) {
    b += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${C.grid}"/>`;
    b +=
      line(cx, cy, cx + radius * Math.cos(theta), cy + radius * Math.sin(theta), color, 3) +
      dot(cx + radius * Math.cos(theta), cy + radius * Math.sin(theta), 6, color);
  }
  b +=
    text(650, 105, 'Input radius = 3 × output radius', 20) +
    text(650, 155, 'Input rim travels 3 × farther.', 19, C.blue) +
    text(650, 205, 'Output force is 3 × larger.', 19, C.red) +
    text(650, 260, 'Fᵢdᵢ = Fₒdₒ', 24);
  return panel(
    'Crank mechanical advantage trades force for distance',
    b,
    'Ideal rigid wheel and axle, balanced torques: Fᵢrᵢ = Fₒrₒ.'
  );
}

function acceleration(t) {
  const s = circularMotion(t * 6),
    cx = 280,
    cy = 180,
    r = 95,
    x = cx + r * s.p[0],
    y = cy - r * s.p[1];
  let b = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.grid}"/>${dot(x, y, 7, C.ink)}`;
  for (const [v, color, scale] of [
    [s.v, C.green, 65],
    [s.at, C.gold, 110],
    [s.ar, C.purple, 110],
    [s.a, C.blue, 110],
  ])
    b += arrow(x, y, v[0] * scale, -v[1] * scale, color);
  b +=
    text(665, 90, 'Green: tangential velocity', 18, C.green) +
    text(665, 130, 'Gold: tangential acceleration', 18, C.gold) +
    text(665, 170, 'Purple: radial acceleration', 18, C.purple) +
    text(665, 210, 'Blue: total acceleration', 18, C.blue) +
    text(665, 270, 'aᵣ = v²/r     aₜ = rα', 22);
  return panel(
    'Acceleration changes speed and direction',
    b,
    'Constant positive angular acceleration; vector origins follow the moving point. Acceleration arrows share one scale.'
  );
}

function rolling(t) {
  let b = '';
  for (let i = 0; i < 3; i++) {
    const inertia = [0, 0.35, 1][i],
      x = 130 + (500 * t * t) / (1 + inertia),
      y = 105 + i * 70,
      r = 19,
      theta = i === 0 ? 0 : (x - 130) / r;
    b += `${line(100, y + 25, 770, y + 25, C.grid)}<circle cx="${f(x)}" cy="${y}" r="${r}" fill="${C.fill}" stroke="${C.ink}"/>`;
    b +=
      line(x, y, x + r * Math.cos(theta), y + r * Math.sin(theta), C.blue, 3) +
      text(790, y + 5, ['slides', 'rolls: thin', 'rolls: thick'][i], 16);
  }
  return panel(
    'Soup-can race: translation shares energy with rotation',
    b,
    'Progress along equal inclines. Rolling: v = Rω; ideal effective inertia is smaller for the thin soup.'
  );
}

function skater(t) {
  const s = skaterMotion(4 * t),
    cx = 320,
    cy = 185,
    r = s.radius * 105,
    a = s.theta;
  const p = [r * Math.cos(a), -r * Math.sin(a)];
  let b = `<circle cx="${cx}" cy="${cy}" r="110" fill="none" stroke="${C.grid}"/>${dot(cx, cy, 15, C.ink)}${line(cx - p[0], cy - p[1], cx + p[0], cy + p[1], C.ink, 5)}${dot(cx + p[0], cy + p[1], 12, C.blue)}${dot(cx - p[0], cy - p[1], 12, C.blue)}`;
  b +=
    text(650, 100, 'Top view: two masses pulled inward', 19) +
    text(650, 150, 'I decreases; ω increases.', 22) +
    text(650, 205, 'Angular momentum Iω is constant.', 19) +
    text(650, 260, 'Internal work increases kinetic energy.', 17);
  return panel(
    'Skater model: conserve angular momentum',
    b,
    'Two equal point masses; negligible central inertia and external torque. Their separation is halved.'
  );
}

function hydraulics(t) {
  const s = hydraulicMotion(t),
    y1 = 145 + 150 * s.dx1,
    y2 = 145 - 150 * s.dx2;
  let b =
    rect(150, y1, 70, 280 - y1, C.fill, 'none') +
    rect(500, y2, 280, 280 - y2, C.fill, 'none') +
    rect(150, 260, 630, 20, C.fill, 'none');
  b +=
    line(150, 80, 150, 280, C.ink) +
    line(220, 80, 220, 260, C.ink) +
    line(500, 80, 500, 260, C.ink) +
    line(780, 80, 780, 280, C.ink) +
    line(150, 280, 780, 280, C.ink);
  b +=
    line(150, y1, 220, y1, C.ink, 6) +
    line(500, y2, 780, y2, C.ink, 6) +
    arrow(185, y1 - 18, 0, 18, C.red) +
    arrow(640, y2, 0, -72, C.blue);
  b +=
    text(185, 65, 'A₁', 20) +
    text(640, 65, 'A₂ = 4A₁', 20) +
    text(185, 310, 'F₁ = 100 N', 18, C.red) +
    text(640, 310, 'F₂ = 400 N', 18, C.blue);
  return panel(
    'Hydraulic multiplication conserves fluid volume',
    b,
    'Ideal pressure increment: F₁/A₁ = F₂/A₂. Small piston travels four times farther; weight/head neglected.'
  );
}

function buoyancy(t) {
  const top = 95 + 100 * t,
    bottom = top + 80,
    waterY = 190,
    fraction = clamp((bottom - waterY) / 80),
    force = 60 * fraction;
  let b =
    rect(140, waterY, 260, 100, C.fill, 'none') +
    rect(230, top, 70, 80, C.gold) +
    arrow(265, bottom, 0, -force, C.blue);
  b +=
    rect(575, 290 - 80 * fraction, 70, 80 * fraction, C.fill, C.blue) +
    arrow(610, 290 - 40 * fraction, 0, force, C.red);
  b +=
    text(270, 70, 'Lower object into liquid', 19) +
    text(630, 70, 'Equal displaced-fluid volume', 19) +
    text(630, 120, 'Fᵦ = ρfluid gVsubmerged', 22);
  return panel(
    'Buoyant force equals the displaced fluid’s weight',
    b,
    'The object is lowered externally. Buoyancy increases during entry, then stays constant when fully submerged.'
  );
}

function manometer(t) {
  const diff = 60 * Math.sin(2 * Math.PI * t),
    left = 175 + diff / 2,
    right = 175 - diff / 2;
  let b =
    path(
      [
        [245, 80],
        [245, 260],
        [355, 260],
        [355, 80],
      ],
      C.ink,
      'none',
      4
    ) +
    rect(247, left, 25, 260 - left, C.fill, 'none') +
    rect(328, right, 25, 260 - right, C.fill, 'none') +
    rect(247, 235, 106, 25, C.fill, 'none');
  b +=
    line(235, left, 420, left, C.guide, 1, '4 4') + line(320, right, 420, right, C.guide, 1, '4 4');
  b +=
    text(235, 62, 'Gas', 18) +
    text(370, 62, 'Atmosphere', 18) +
    text(650, 120, 'ΔP = Pgas − Patm', 23) +
    text(650, 165, 'ΔP = ρg (h right − h left)', 19) +
    text(650, 220, 'Read the difference between the levels.', 17);
  return panel(
    'Gauge pressure can be positive, zero, or negative',
    b,
    'Quasi-static imposed pressure changes. Connected liquid volume is conserved; h is height upward.'
  );
}

function venturi(t) {
  const walls = [
    [100, 120],
    [320, 120],
    [425, 170],
    [530, 120],
    [790, 120],
    [790, 270],
    [530, 270],
    [425, 220],
    [320, 270],
    [100, 270],
  ];
  let b =
    polygon(walls, C.fill, C.guide) +
    rect(412, 70, 26, 100, 'white', C.guide) +
    text(570, 85, 'Side inlet: higher-pressure reservoir', 16) +
    arrow(425, 80, 0, 70, C.purple);
  // Circular tube: tracer speed is inversely proportional to the local area.
  for (let i = 0; i < 7; i++) {
    const q = (t + i / 7) % 1,
      x = venturiPosition(q);
    b += dot(x, 195, 4, C.blue, q > 0.04 && q < 0.96 ? 1 : 0);
  }
  const inletPhase = (3 * t) % 1;
  b +=
    dot(425, 85 + 85 * inletPhase, 4, C.purple, inletPhase > 0.08 && inletPhase < 0.92 ? 1 : 0) +
    text(450, 300, 'Faster throat flow → lower static pressure → entrainment', 19);
  return panel(
    'A Venturi draws fluid into the constriction',
    b,
    'Steady flow with negligible entrained volume. The side tube is an inlet, not a manometer.'
  );
}

function osmosis(t) {
  const transfer = 40 * clamp(t * 2),
    left = 180 + transfer,
    right = 180 - transfer;
  let b =
    rect(180, left, 250, 290 - left, C.fill, 'none') +
    rect(435, right, 250, 290 - right, C.fill, 'none') +
    rect(430, 90, 5, 200, C.purple);
  b +=
    path(
      [
        [180, 90],
        [180, 290],
        [685, 290],
        [685, 90],
      ],
      C.ink,
      'none',
      3
    ) +
    text(305, 65, 'Dilute side', 20) +
    text(560, 65, 'Concentrated side', 20);
  for (let i = 0; i < 20; i++) {
    const side = i < 5 ? 0 : 1,
      x = (side ? 465 : 210) + ((i * 43) % 190),
      surface = side ? right : left;
    b += dot(x, surface + 15 + (((i * 17) % 65) / 65) * (270 - surface - 15), 5, C.gold);
  }
  for (let i = 0; i < 8; i++) {
    const q = (t * 3 + i / 8) % 1,
      net = t < 0.5,
      forward = i < (net ? 6 : 4);
    const x = forward ? 380 + 100 * q : 480 - 100 * q;
    b += dot(x, 230 + i * 7, 3, C.blue, q > 0.08 && q < 0.92 ? 1 : 0);
  }
  b += visible(t < 0.5, arrow(393, 120, 80, 0, C.blue, 2));
  b += visible(t >= 0.5, text(450, 110, 'Equal mean water exchange; zero net flow', 17));
  b += text(340, 315, 'Blue: water', 14, C.blue) + text(560, 315, 'Gold: solute', 14, C.gold);
  return panel(
    'Osmosis reaches a dynamic equilibrium',
    b,
    'Water crosses both ways; solute stays blocked. Height difference grows until ρgΔh balances osmotic pressure.'
  );
}

function profile(t) {
  let b = '';
  for (const viscous of [false, true]) {
    const ox = viscous ? 540 : 110;
    b +=
      rect(ox, 85, 240, 205, C.fill, 'none') +
      line(ox, 85, ox, 290, C.ink, 3) +
      line(ox + 240, 85, ox + 240, 290, C.ink, 3) +
      text(ox + 120, 65, viscous ? 'Parabolic profile' : 'Uniform ideal flow', 19);
    for (let i = 0; i <= 8; i++) {
      const r = -1 + i / 4,
        speed = pipeSpeed(r, viscous);
      for (let j = 0; j < 5; j++) {
        const y = 270 + 55 * j - 150 * t * speed;
        b += visible(y >= 90 && y <= 285, dot(ox + 120 + 120 * r, y, 4, C.blue));
      }
    }
  }
  return panel(
    'Tracer rows reveal the velocity profile',
    b,
    'Same circular-tube mean speed: viscous center moves twice as fast as the uniform row; wall tracers stay still.'
  );
}

function evaporation(t) {
  let b = '';
  for (const closed of [false, true]) {
    const ox = closed ? 530 : 100,
      surface = 200;
    b +=
      rect(ox, surface, 250, 95, C.fill, 'none') +
      path(
        [
          [ox, 80],
          [ox, 295],
          [ox + 250, 295],
          [ox + 250, 80],
        ],
        C.ink,
        'none',
        3
      );
    if (closed) b += line(ox, 80, ox + 250, 80, C.gold, 6);
    b += text(ox + 125, 60, closed ? 'Sealed: saturated vapor' : 'Open: vapor escapes', 19);
    for (let i = 0; i < 12; i++) {
      const q = (t * (0.8 + i * 0.07) + i * 0.197) % 1;
      b += dot(ox + 20 + ((i * 47) % 210), 215 + 60 * (1 - Math.abs(2 * q - 1)), 4, C.blue);
    }
    for (let i = 0; i < 4; i++) {
      const q = (t * 1.8 + i / 4) % 1,
        x = ox + 40 + i * 50;
      const y = closed ? 210 - 115 * (1 - Math.abs(2 * q - 1)) : 210 - 120 * q;
      b += dot(x, y, 5, C.red, closed ? 1 : q > 0.05 && q < 0.95 ? 1 - q : 0);
    }
    b += text(
      ox + 125,
      320,
      closed ? 'Equal mean escape and return rates' : 'Open reservoir: continuing net evaporation',
      14,
      C.guide
    );
  }
  return panel(
    'Liquid and vapor exchange molecules',
    b,
    'Schematic ensemble at fixed temperature. Saturation means zero net exchange, not stationary molecules.'
  );
}

function bubbles(t) {
  const radius = 7 + 19 * t,
    y = t < 0.75 ? 270 - radius : 270 - radius - (140 * (t - 0.75)) / 0.25;
  let b = `${
    rect(220, 95, 210, 190, C.fill, 'none') +
    path(
      [
        [220, 75],
        [220, 285],
        [430, 285],
        [430, 75],
      ],
      C.ink,
      'none',
      3
    )
  }<circle cx="325" cy="${f(y)}" r="${f(radius)}" fill="white" stroke="${C.blue}" stroke-width="2"/>`;
  b +=
    polygon(
      [
        [300, 310],
        [325, 290],
        [350, 310],
      ],
      C.gold
    ) +
    text(650, 110, 'Initial bubble: air + water vapor', 19) +
    text(650, 155, 'Heating raises the vapor pressure.', 18) +
    text(650, 200, 'At boiling, vapor sustains bubble growth.', 17);
  return panel(
    'Heating a bubble of air saturated with water vapor',
    b,
    'Schematic heating sequence at 1 atm. Early bubbles are not pure steam; expansion is exaggerated.'
  );
}

function phaseDiagram(t) {
  const X = 180,
    Y = 285;
  let b = axes(X, Y, 510, 210, 'Temperature T (°C)', 'Pressure P (atm)');
  b +=
    path(
      [
        [X + 10, Y - 5],
        [X + 100, Y - 65],
        [X + 220, Y - 105],
        [X + 360, Y - 170],
        [X + 460, Y - 200],
      ],
      C.red
    ) +
    line(X + 100, Y - 65, X + 70, Y - 195, C.blue) +
    text(X + 35, Y - 125, 'solid', 18) +
    text(X + 180, Y - 150, 'liquid', 18) +
    text(X + 340, Y - 35, 'gas', 18);
  b +=
    line(X, Y - 130, X + 460, Y - 130, C.guide, 1, '5 4') +
    dot(X + 460 * t, Y - 130, 8, C.ink) +
    dot(X + 100, Y - 65, 5, C.purple) +
    text(X + 90, Y - 35, 'Triple point', 14, C.purple);
  return panel(
    'Follow a constant-pressure path across phase boundaries',
    b,
    'Schematic water phase diagram; nonlinear axes. The marker moves from solid through liquid to gas.'
  );
}

// Key one image per multi-stage idea, retaining earlier static construction stages.
const scenes = {
  concept_01_03_q01: uncertainty,
  Figure_02_04_03: cars,
  Figure_02_01_05: distance,
  Figure_02_07_06: fall,
  Figure_03_02_07: vectorAddition,
  Figure_03_05_01: boat,
  Figure_03_05_05: ship,
  Figure_05_01_01: friction,
  Figure_05_03_01: hooke,
  Figure_05_03_03: strain,
  Figure_06_01_03: angularSpeed,
  Figure_06_03_03: banked,
  Figure_06_04_02: frames,
  Figure_07_02_01: work,
  Figure_07_05_01: frictionWork,
  Figure_07_04_03: conservative,
  Figure_08_02_01: impulse,
  Figure_08_07_01: rocket,
  Figure_08_03_02: fragments,
  Figure_09_03_04: tipping,
  Figure_09_03_07: neutral,
  Figure_09_05_03: crank,
  Figure_10_01_03: acceleration,
  Figure_10_04_06: rolling,
  Figure_11_05_01: hydraulics,
  Figure_11_07_03: buoyancy,
  Figure_11_06_02: manometer,
  Figure_12_02_05: venturi,
  Figure_12_07_04: osmosis,
  Figure_12_04_04: profile,
  Figure_13_06_01: evaporation,
  Figure_13_06_02: bubbles,
  Figure_13_05_05: phaseDiagram,
};

export function animateFigure(name, svg) {
  const draw = scenes[name];
  if (!draw) return svg;
  return appendAnimation(svg, draw);
}

export const animationNames = Object.keys(scenes);
export default {
  Figure_01_03_03: () =>
    standalone(
      'Accuracy with low precision',
      'Repeated measurements scatter around the true target. Their mean is near the center, but their spread is wide.',
      t => target(t, false)
    ),
  Figure_01_03_04: () =>
    standalone(
      'Precision with a systematic offset',
      'Repeated measurements cluster away from the target center. Their mean is offset even though their spread is small.',
      t => target(t, true)
    ),
  Figure_01_02_04: () =>
    standalone(
      'The meter and the speed of light',
      'A light pulse crosses one meter in a vacuum in exactly one divided by 299792458 seconds. The displayed transit is greatly slowed down.',
      meter
    ),
  companion_04_07_elevator: () =>
    standalone(
      'Apparent weight in an upward elevator',
      'A 75 kilogram person has a constant weight of 735 newtons. The scale reads 825 newtons during upward acceleration, 735 at constant velocity, and 645 while slowing upward.',
      elevator
    ),
  companion_04_04_swimmer: () =>
    standalone(
      'A swimmer pushes off a wall',
      'During contact the swimmer and wall exert equal and opposite forces on each other. Both contact forces disappear on separation; the swimmer continues moving when drag is neglected.',
      swimmer
    ),
  companion_04_03_sled: () =>
    standalone(
      'Net thrust accelerates a sled',
      'Four equal thrust forces oppose a smaller friction force. Net horizontal force is positive, while normal force balances weight. A constant-mass short-interval model shows increasing speed.',
      sled
    ),
  companion_10_05_skater: () =>
    standalone(
      'A skater modeled by two rotating masses',
      'Two equal masses are pulled inward symmetrically with negligible external torque. Their moment of inertia decreases and angular speed increases, conserving angular momentum while internal work increases kinetic energy.',
      skater
    ),
};
