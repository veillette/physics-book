/** Analytic models used by the chapter 1–13 animated teaching figures.
 * Time is physical seconds unless the argument is explicitly a progress fraction.
 */
export function carMotion(t, index) {
  const v0 = [24, 72, -72, -24][index];
  const a = [12, -12, 12, -12][index];
  return { x: v0 * t + (a * t * t) / 2, v: v0 + a * t, a };
}

export const displacementPaths = [
  [0, 7],
  [12, 7],
  [2, 10, 8, 10],
  [9, 3, 5],
];

export function pathProgress(points, progress) {
  const total = points.slice(1).reduce((sum, x, i) => sum + Math.abs(x - points[i]), 0);
  const distance = total * progress;
  let remaining = distance,
    x = points[0];
  for (let i = 1; i < points.length; i += 1) {
    const segment = points[i] - points[i - 1],
      step = Math.min(Math.abs(segment), remaining);
    x += Math.sign(segment) * step;
    remaining -= step;
  }
  return { x, distance };
}

export function elevatorMotion(t) {
  const a0 = 1.2,
    ramp = 1 / a0,
    cruise = 2;
  if (t < ramp) return { y: 0.5 * a0 * t * t, v: a0 * t, a: a0, normal: 825 };
  if (t < ramp + cruise) return { y: 0.5 / a0 + t - ramp, v: 1, a: 0, normal: 735 };
  const dt = Math.min(t - ramp - cruise, ramp);
  return { y: 0.5 / a0 + cruise + dt - 0.5 * a0 * dt * dt, v: 1 - a0 * dt, a: -a0, normal: 645 };
}

// 10 kg crate, mu_s = 0.5, mu_k = 0.3, g = 10 m/s²; applied force ramps at 20 N/s.
export function frictionMotion(t) {
  const force = 20 * t,
    slip = Math.max(0, t - 2.5);
  const friction = t <= 2.5 ? force : 30;
  return {
    force,
    friction,
    x: slip * slip + slip ** 3 / 3,
    v: 2 * slip + slip * slip,
    a: (force - friction) / 10,
  };
}

export function circularMotion(t) {
  const omega = 0.4 + 0.12 * t,
    theta = 0.4 * t + 0.06 * t * t;
  const r = 1;
  const p = [r * Math.cos(theta), r * Math.sin(theta)];
  const v = [-omega * Math.sin(theta), omega * Math.cos(theta)];
  const at = [-0.12 * Math.sin(theta), 0.12 * Math.cos(theta)];
  const ar = [-omega * omega * Math.cos(theta), -omega * omega * Math.sin(theta)];
  return { p, v, at, ar, a: at.map((n, i) => n + ar[i]), omega, theta };
}

export function hydraulicMotion(progress) {
  const a1 = 1,
    a2 = 4,
    f1 = 100,
    dx1 = 0.4 * progress;
  return { a1, a2, f1, f2: (f1 * a2) / a1, dx1, dx2: (dx1 * a1) / a2 };
}

export function pipeSpeed(radiusFraction, viscous = true) {
  // Units of mean speed; circular-tube, cross-section (not diameter) average is one.
  return viscous ? 2 * (1 - radiusFraction ** 2) : 1;
}

export function venturiHeight(x) {
  return x <= 320 || x >= 530 ? 150 : 50 + (100 * Math.abs(x - 425)) / 105;
}

// Invert the exact integral of area along each linear taper. Equal time steps
// displace equal volumes; area is proportional to the square of tube diameter.
export function venturiPosition(progress) {
  const slope = 100 / 105,
    wide = 150 ** 2;
  const taper = (150 ** 3 - 50 ** 3) / (3 * slope);
  let volume = progress * (wide * 480 + 2 * taper);
  if (volume <= wide * 220) return 100 + volume / wide;
  volume -= wide * 220;
  if (volume <= taper) return 320 + (150 - Math.cbrt(150 ** 3 - 3 * slope * volume)) / slope;
  volume -= taper;
  if (volume <= taper) return 425 + (Math.cbrt(50 ** 3 + 3 * slope * volume) - 50) / slope;
  return 530 + (volume - taper) / wide;
}

export function skaterMotion(t) {
  // Two unit point masses, radius decreases linearly from 1 to 1/2 in four seconds.
  const radius = 1 - t / 8,
    inertia = 2 * radius * radius,
    momentum = 1;
  const omega = momentum / inertia;
  const theta = 4 * (1 / radius - 1);
  return { radius, inertia, omega, theta, momentum, kinetic: 0.5 * inertia * omega ** 2 };
}

export function fragmentMotion(t) {
  // Separation at 1 s, masses 1 and 2, equal and opposite impulses.
  const center = [t, 2 * t - 0.5 * t * t],
    dt = Math.max(0, t - 1);
  return {
    center,
    first: [center[0] - dt * 0.5, center[1] + dt * 0.5],
    second: [center[0] + dt * 0.25, center[1] - dt * 0.25],
  };
}

export function rocketMotion(t) {
  const mass = 10 - t,
    exhaustSpeed = 2,
    gravity = 0.05;
  const v = exhaustSpeed * Math.log(10 / mass) - gravity * t;
  const y = exhaustSpeed * (t + mass * Math.log(mass / 10)) - 0.5 * gravity * t * t;
  return { mass, v, y, exhaustSpeed, gravity };
}
