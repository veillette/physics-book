/** Seven mechanics companions. Original figures remain above the inset. */
import {
  C,
  f,
  dot,
  line,
  rect,
  text,
  path,
  arrow,
  visible,
  readout,
  panel,
  appendAnimation,
} from './animation-svg.js';
import {
  inclineState,
  skierState,
  turnState,
  loopGeometry,
  loopState,
  leverState,
  reelState,
  impactState,
} from './animation-models-mechanics-extra.js';
const options = { discreteAttributes: ['opacity', 'fill', 'stroke'] };
const circle = (x, y, r, color = C.guide) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${color}" stroke-width="2"/>`;

function incline(t) {
  const s = inclineState(t),
    cx = 300,
    cy = 165,
    c = Math.cos(s.angle),
    sn = Math.sin(s.angle),
    k = 1.2;
  const [px, py] = s.along.map(v => k * v),
    [nx, ny] = s.into.map(v => k * v);
  let body = line(cx - 115 * c, cy + 115 * sn, cx + 115 * c, cy - 115 * sn, C.guide, 5);
  body +=
    line(cx + px, cy + py, cx, cy + 120, C.grid, 1.5, '5 4') +
    line(cx + nx, cy + ny, cx, cy + 120, C.grid, 1.5, '5 4');
  body +=
    arrow(cx, cy, px, py, C.blue) +
    arrow(cx, cy, nx, ny, C.green) +
    arrow(cx, cy, 0, 120, C.red) +
    dot(cx, cy, 5, C.ink);
  body +=
    text(115, 311, 'Blue: downhill', 16, C.blue) +
    text(310, 311, 'Green: into plane', 16, C.green) +
    text(493, 311, 'Red: weight', 16, C.red);
  body +=
    readout(610, 95, 'Angle (°)', s.degrees, 2, 1) +
    readout(610, 155, 'w ∥ (N)', s.parallel, 2, 1) +
    readout(610, 215, 'w ⊥ (N)', s.perpendicular, 2, 1) +
    text(720, 281, 'w ∥² + w ⊥² = w²', 20);
  return panel(
    'Changing the incline changes the components, not the weight',
    body,
    'Angle sweep 10° → 60° with weight fixed at 100 N. All vectors share one scale. Components add to the vertical weight; the point marks their common origin, not a sliding block.'
  );
}
function skier(t) {
  const s = skierState(t),
    c = Math.cos(s.angle),
    sn = Math.sin(s.angle);
  const x = 465 - 14 * s.distance * c,
    y = 300 - 365 * Math.tan(s.angle) + 14 * s.distance * sn,
    k = 0.13;
  let body = line(100, 300, 550, 300 - 450 * Math.tan(s.angle), C.guide, 4);
  body +=
    line(x - 15 * c, y + 15 * sn, x + 15 * c, y - 15 * sn, C.ink, 4) +
    line(x, y, x - 20 * sn, y - 20 * c, C.blue, 5) +
    dot(x - 25 * sn, y - 25 * c, 6, C.blue);
  body +=
    arrow(x, y, 0, k * s.weight, C.red) +
    arrow(x, y, -k * s.normal * sn, -k * s.normal * c, C.blue) +
    // Friction (45 N) is about 8% of N, so it is drawn five times larger.
    arrow(x, y, 5 * k * s.friction * c, -5 * k * s.friction * sn, C.green, 3);
  body +=
    text(300, 61, 'Blue N; red weight (same scale); green friction × 5', 16) +
    readout(610, 91, 't (s)', s.time, 1, 2) +
    readout(610, 136, 'N (N)', s.normal, 3, 1) +
    readout(610, 181, 'f_k (N)', s.friction, 2, 1) +
    readout(610, 226, 'a (m/s²)', s.acceleration, 1, 2) +
    readout(610, 271, 'v (m/s)', s.speed, 2, 2);
  return panel(
    'Gravity and kinetic friction determine the skier’s acceleration',
    body,
    'Book example: 62 kg, 25° slope, 45 N friction. Illustrative initial speed 1 m/s; no air drag. Equal intervals are equal model times. N balances the perpendicular weight component.'
  );
}
function turning(t) {
  let body = '';
  for (const [radius, color] of [
    [30, C.blue],
    [60, C.red],
  ]) {
    const s = turnState(t, radius),
      x = 295 + 2 * s.x,
      y = 180 - 2 * s.y;
    body +=
      circle(295, 180, 2 * radius, color) +
      dot(x, y, 7, color) +
      arrow(
        x,
        y,
        -0.012 * s.force * Math.cos(s.angle),
        0.012 * s.force * Math.sin(s.angle),
        color,
        3
      );
  }
  body += dot(295, 180, 3, C.ink) + text(300, 315, 'Blue: r = 30 m; red: r = 60 m', 18);
  body +=
    readout(610, 90, 'v (m/s)', 12, 2, 1) +
    readout(610, 150, 'F 30 (N)', turnState(t, 30).force, 4, 0) +
    readout(610, 210, 'F 60 (N)', turnState(t, 60).force, 4, 0) +
    text(720, 278, 'F = mv²/r', 23);
  return panel(
    'Doubling the turning radius halves the required force at the same speed',
    body,
    'Two 1000 kg cars at 12 m/s over the same 12 s. Radii and force arrows use common scales. The larger circle turns through fewer radians; an available tire force must meet the requirement.'
  );
}
const loopMinX = Math.min(...loopGeometry.points.map(p => p[0])),
  loopMinY = Math.min(...loopGeometry.points.map(p => p[1]));
const loopMap = p => [150 + 0.65 * (p[0] - loopMinX), 90 + 0.65 * (p[1] - loopMinY)];
function loop(t) {
  const s = loopState(t),
    [x, y] = loopMap(s.position),
    nx = Math.sin(s.heading),
    ny = Math.cos(s.heading);
  // 1.6 px per m/s² keeps the weight arrow visible beyond the car dot; the
  // largest normal force (5.7 mg) is then about 90 px.
  let body = path(loopGeometry.points.map(loopMap), C.guide, 'none', 4) + dot(x, y, 5, C.purple);
  body +=
    arrow(x, y, 1.6 * s.normalPerMass * nx, 1.6 * s.normalPerMass * ny, C.blue) +
    arrow(x, y, 0, 1.6 * 9.8, C.red, 3);
  body +=
    text(315, 60, 'Blue: track normal; red: weight', 17) +
    text(315, 313, 'Equal model times; actual teardrop geometry', 17);
  body +=
    readout(610, 91, 't (s)', s.time, 1, 2) +
    readout(610, 143, 'v (m/s)', s.speed, 2, 2) +
    readout(610, 195, 'N / mg', s.normalPerMass / 9.8, 1, 2) +
    readout(610, 247, 'h (m)', s.height, 2, 2) +
    text(720, 300, '½v² + gh = constant', 19);
  return panel(
    'Speed, curvature and gravity together set the force from the track',
    body,
    'Frictionless point car; entry speed 22 m/s; 0.05 m per original drawing unit. Time follows ds/v. N remains positive; normal and weight arrows use one force-per-mass scale.'
  );
}
function lever(t) {
  const s = leverState(t),
    cx = 350,
    cy = 215,
    k = 380;
  const input = [cx - k * s.inputArm * Math.cos(s.angle), cy + k * s.inputArm * Math.sin(s.angle)];
  const output = [
    cx + k * s.outputArm * Math.cos(s.angle),
    cy - k * s.outputArm * Math.sin(s.angle),
  ];
  let body =
    line(80, 300, 530, 300, C.guide, 4) +
    line(...input, ...output, C.guide, 9) +
    dot(cx, cy, 6, C.gold);
  body +=
    line(output[0], output[1], output[0], 300, C.ink, 3) +
    line(output[0] - 7, output[1], output[0] + 7, output[1], C.ink, 3);
  body +=
    arrow(input[0], input[1], 0, 0.24 * s.inputForce, C.red) +
    arrow(output[0], output[1], 0, 0.24 * s.outputForce, C.red) +
    arrow(cx, cy, 0, -0.24 * s.reaction, C.blue) +
    arrow(output[0] + 32, output[1], 0, -0.24 * s.outputForce, C.green);
  body +=
    text(300, 65, 'Red: on lever; green: on nail; blue: pivot reaction', 15) +
    readout(610, 96, 'F in (N)', s.inputForce, 2, 0) +
    readout(610, 141, 'F out (N)', s.outputForce, 3, 0) +
    readout(610, 186, 'In (cm)', 100 * s.inputTravel, 2, 2) +
    readout(610, 231, 'Out (cm)', 100 * s.outputTravel, 1, 2) +
    readout(610, 276, 'Work (J)', s.inputWork, 2, 2);
  return panel(
    'A lever gains force by moving its input farther than its output',
    body,
    'Ideal rigid lever, vertical endpoint forces, arm lengths 0.60 and 0.10 m. Endpoint arcs are schematic nail-puller motion; readouts use vertical travel. F in Δy in = F out Δy out.'
  );
}
function reel(t) {
  const s = reelState(t),
    cx = 145,
    cy = 160,
    r = 54,
    marker = 225 + 1200 * s.distance;
  let body =
    circle(cx, cy, r, C.guide) +
    dot(cx, cy, 6, C.ink) +
    line(cx, cy, cx + r * Math.cos(s.angle), cy - r * Math.sin(s.angle), C.blue, 3) +
    dot(cx + r * Math.cos(s.angle), cy - r * Math.sin(s.angle), 5, C.blue);
  body +=
    line(cx, cy + r, 560, cy + r, C.green, 3) +
    rect(marker - 3, cy + r - 7, 6, 14, C.red, 'none') +
    arrow(505, cy + r, 48, 0, C.green) +
    text(300, 270, 'Line mark: x = rθ, v = rω, a = rα', 19);
  body +=
    readout(610, 86, 't (s)', s.time, 1, 2) +
    readout(610, 132, 'τ (mN m)', s.torque * 1000, 1, 2) +
    readout(610, 178, 'α (rad/s²)', s.alpha, 1, 2) +
    readout(610, 224, 'ω (rad/s)', s.omega, 1, 2) +
    readout(610, 270, 'x (cm)', s.distance * 100, 2, 2) +
    text(300, 315, 'Constant pull torque: τ = T r = Iα', 20);
  return panel(
    'A pull on the line accelerates both the reel and the unwinding line',
    body,
    'Radius 4.5 cm, I = 0.002 kg m², T = 0.040 N; starts at rest. Fixed radius, no slip or drag. Reel and line share a distance scale. Pulling work becomes rotational kinetic energy.'
  );
}
function impact(t) {
  const s = impactState(t),
    cx = 310,
    cy = 270,
    scale = 130;
  const tip = [
    cx + scale * s.length * Math.sin(s.angle),
    cy - scale * s.length * Math.cos(s.angle),
  ];
  const disk = [cx + scale * s.disk[0], cy - scale * s.disk[1]];
  let body =
    line(cx, cy, ...tip, C.guide, 9) +
    dot(...disk, 10, C.blue) +
    dot(cx, cy, 6, C.gold) +
    text(275, 307, 'Fixed pivot: external force, zero torque about pivot', 16);
  body +=
    visible(!s.hit, arrow(disk[0] + 15, disk[1], 2 * s.speed, 0, C.blue)) +
    visible(s.hit, arrow(...disk, 2 * s.diskVelocity[0], -2 * s.diskVelocity[1], C.blue));
  body +=
    readout(610, 90, 'L pivot', s.angularMomentum, 1, 2) +
    readout(610, 145, 'K (J)', s.kinetic, 2, 2) +
    readout(610, 200, 'Lost K (J)', s.dissipated, 2, 2) +
    readout(610, 255, 'ω (rad/s)', s.hit ? s.omega : 0, 1, 2);
  body +=
    visible(!s.hit, text(310, 68, 'Before impact', 19)) +
    visible(s.hit, text(310, 68, 'Disk and stick rotate together', 19));
  return panel(
    'An inelastic impact conserves angular momentum about the pivot',
    body,
    'Book values: 0.050 kg disk at 30 m/s; 2.00 kg uniform rod, 1.20 m. Disk treated as a point mass. Approach playback is slowed more than rotation. L units: kg m²/s; kinetic energy decreases.'
  );
}
const scenes = {
  Figure_04_05_03: incline,
  Figure_05_01_03: skier,
  Figure_06_03_04: turning,
  Figure_06_03_10: loop,
  Figure_09_05_01: lever,
  Figure_10_02_01: reel,
  Figure_10_06_02: impact,
};
export const animationNamesMechanicsExtra = Object.keys(scenes);
export function animateMechanicsExtra(name, svg) {
  return scenes[name] ? appendAnimation(svg, scenes[name], options) : svg;
}
