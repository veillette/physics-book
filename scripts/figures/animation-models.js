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

// Second chapter 1–13 batch. Units are SI unless the comment says otherwise.

// Subway train of Figure_02_04_10: 0 → 30 km/h in 20 s, cruise, stop in 8 s.
export function trainMotion(t) {
  const vmax = 30 / 3.6,
    a1 = vmax / 20,
    a2 = -vmax / 8;
  if (t <= 20) return { x: 0.5 * a1 * t * t, v: a1 * t, a: a1 };
  const x20 = 0.5 * a1 * 400;
  if (t <= 40) return { x: x20 + vmax * (t - 20), v: vmax, a: 0 };
  const s = Math.min(t, 48) - 40,
    x40 = x20 + vmax * 20;
  return { x: x40 + vmax * s + 0.5 * a2 * s * s, v: vmax + a2 * s, a: t <= 48 ? a2 : 0 };
}

// Jet car of Figure_02_08_03: x = 200 + 15t + 2.5t² m.
export function jetCarMotion(t) {
  return { x: 200 + 15 * t + 2.5 * t * t, v: 15 + 5 * t, a: 5 };
}

// Smooth model of the tabulated top-speed run: a(0) = 5 m/s², v → 250 m/s.
export function topSpeedMotion(t) {
  const tau = 17,
    decay = Math.exp(-t / tau);
  return {
    x: 2900 + 250 * t - 85 * tau * (1 - decay),
    v: 250 - 85 * decay,
    a: (85 / tau) * decay,
  };
}

export function constantAcceleration(v0, a, t) {
  return { x: v0 * t + 0.5 * a * t * t, v: v0 + a * t, a };
}

export function vectorSum(vectors) {
  const parts = vectors.map(([magnitude, degrees]) => {
    const r = (degrees * Math.PI) / 180;
    return [magnitude * Math.cos(r), magnitude * Math.sin(r)];
  });
  const x = parts.reduce((s, p) => s + p[0], 0),
    y = parts.reduce((s, p) => s + p[1], 0);
  return { parts, x, y, magnitude: Math.hypot(x, y), degrees: (Math.atan2(y, x) * 180) / Math.PI };
}

// Symmetric sag: each half of the wire carries T with 2T sin θ = w.
export function tightropeTension(weight, degrees) {
  return weight / (2 * Math.sin((degrees * Math.PI) / 180));
}

// Two wires at θ1 and θ2 above the horizontal hold a weight w in equilibrium.
export function twoWireTensions(weight, deg1, deg2) {
  const [a, b] = [deg1, deg2].map(d => (d * Math.PI) / 180);
  const t1 = weight / (Math.sin(a) + (Math.cos(a) * Math.sin(b)) / Math.cos(b));
  return { t1, t2: (t1 * Math.cos(a)) / Math.cos(b) };
}

// A ball of mass m thrown at speed u (relative to ground) between two skaters of mass M.
export function exchangeMotion(t, { m = 0.6, M = 60, u = 10, throwAt = 0.5, catchAt = 1.5 } = {}) {
  const recoil = (m * u) / M,
    caught = (m * u) / (M + m);
  const a = -recoil * Math.max(0, t - throwAt);
  const ballX = t < throwAt ? 0 : Math.min(u * (t - throwAt), u * (catchAt - throwAt));
  const b = u * (catchAt - throwAt) + caught * Math.max(0, t - catchAt);
  return {
    thrower: a,
    ball: t < catchAt ? ballX : b,
    catcher: t < catchAt ? u * (catchAt - throwAt) : b,
    momentum:
      M * (t < throwAt ? 0 : -recoil) +
      (t < catchAt ? m * (t < throwAt ? 0 : u) : (M + m) * caught),
  };
}

// Skydiver with quadratic drag: m dv/dt = mg − ½ρCAv², starting from rest.
export function dragFall(t, { m = 75, rho = 1.21, C = 0.7, A = 0.18, g = 9.8 } = {}) {
  const vt = Math.sqrt((2 * m * g) / (rho * C * A)),
    s = (g * t) / vt;
  const v = vt * Math.tanh(s);
  return {
    vt,
    v,
    y: ((vt * vt) / g) * Math.log(Math.cosh(s)),
    drag: 0.5 * rho * C * A * v * v,
    weight: m * g,
  };
}

// Least force at θ above the horizontal that starts a block sliding.
export function startingForce(degrees, push, { mu = 0.1, m = 45, g = 9.8 } = {}) {
  const r = (degrees * Math.PI) / 180,
    sign = push ? -1 : 1;
  const force = (mu * m * g) / (Math.cos(r) + sign * mu * Math.sin(r));
  return { force, normal: m * g - sign * force * Math.sin(r) };
}

// Dimensionless tendon response: toe (quadratic), linear, then fibers fail.
export function tendonStress(strain) {
  const toe = 0.25,
    yieldStrain = 0.65;
  if (strain <= toe) return (strain * strain) / (2 * toe);
  if (strain <= yieldStrain) return strain - toe / 2;
  const peak = yieldStrain - toe / 2,
    q = (strain - yieldStrain) / (1 - yieldStrain);
  return peak * (1 + 0.15 * q - 0.75 * q * q);
}

// String-and-pins ellipse: semi-major a, focal distance c from the center.
export function ellipsePoint(angle, a = 210, c = 125) {
  const b = Math.sqrt(a * a - c * c),
    x = a * Math.cos(angle),
    y = b * Math.sin(angle);
  return { x, y, d1: Math.hypot(x + c, y), d2: Math.hypot(x - c, y) };
}

// Inverse-square attraction in units where F = 1 at r = 1.
export function inverseSquare(r) {
  return 1 / (r * r);
}

// Coasting car over a frictional hill profile, from rest. Heights in m, distance s in m.
const hillProfile = [
  [0, 30],
  [60, 6],
  [90, 14],
  [130, 0],
  [200, 0],
];
export function hillHeight(s) {
  for (let i = 1; i < hillProfile.length; i += 1) {
    const [s0, h0] = hillProfile[i - 1],
      [s1, h1] = hillProfile[i];
    if (s <= s1) {
      const q = (s - s0) / (s1 - s0);
      // The first descent starts at its steepest so the car leaves the top at once.
      const ease = i === 1 ? Math.sin((Math.PI * q) / 2) : 0.5 - 0.5 * Math.cos(Math.PI * q);
      return h0 + (h1 - h0) * ease;
    }
  }
  return 0;
}
export const coastingLength = 200;
// Friction is chosen so the car stops exactly at the pump, s = 200 m.
export function coastingEnergy(s, { m = 1000, g = 9.8 } = {}) {
  const friction = (m * g * hillHeight(0)) / coastingLength,
    potential = m * g * hillHeight(s),
    thermal = friction * s;
  return {
    friction,
    potential,
    thermal,
    kinetic: Math.max(0, m * g * hillHeight(0) - potential - thermal),
    total: m * g * hillHeight(0),
  };
}
// Distance as a function of time by integrating ds/dt = v(s) from rest.
export const coastingTimeline = (() => {
  const samples = [[0, 0]];
  let s = 0.01,
    t = 0;
  while (s < coastingLength - 0.05) {
    const v = Math.sqrt((2 * coastingEnergy(s).kinetic) / 1000);
    const dt = 0.005;
    s += Math.max(v, 0.05) * dt;
    t += dt;
    samples.push([t, Math.min(s, coastingLength)]);
  }
  samples.push([t + 0.5, coastingLength]);
  return samples;
})();
export function coastingDistance(progress) {
  const end = coastingTimeline[coastingTimeline.length - 1][0],
    t = progress * end;
  let lo = 0,
    hi = coastingTimeline.length - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (coastingTimeline[mid][0] <= t) lo = mid;
    else hi = mid;
  }
  const [t0, s0] = coastingTimeline[lo],
    [t1, s1] = coastingTimeline[hi];
  return s0 + ((s1 - s0) * (t - t0)) / (t1 - t0 || 1);
}

// Rock (1 kg) dropped 1 m onto a spring (k = 100 N/m) that returns it; g = 9.8 m/s².
// y is the height above the relaxed spring top, positive upward.
export function rockOnSpring(t, { m = 1, k = 100, h = 1, g = 9.8 } = {}) {
  const t1 = Math.sqrt((2 * h) / g),
    v1 = g * t1,
    omega = Math.sqrt(k / m),
    eq = (m * g) / k,
    amplitude = Math.hypot(eq, v1 / omega),
    phase = Math.atan2(v1 / omega, eq),
    contact = (2 * Math.PI - 2 * phase) / omega,
    period = 2 * t1 + contact;
  const time = t % period;
  let y, v;
  if (time < t1) {
    y = h - 0.5 * g * time * time;
    v = -g * time;
  } else if (time < t1 + contact) {
    const angle = omega * (time - t1) + phase;
    y = -eq + amplitude * Math.cos(angle);
    v = -amplitude * omega * Math.sin(angle);
  } else {
    const dt = time - t1 - contact;
    y = v1 * dt - 0.5 * g * dt * dt;
    v = v1 - g * dt;
  }
  const compression = Math.max(0, -y);
  return {
    y,
    v,
    period,
    gravitational: m * g * y,
    kinetic: 0.5 * m * v * v,
    elastic: 0.5 * k * compression * compression,
  };
}

// One-dimensional elastic collision with the second body at rest.
export function elasticCollision(m1, m2, v) {
  return { v1: ((m1 - m2) / (m1 + m2)) * v, v2: ((2 * m1) / (m1 + m2)) * v };
}

// Example 8.6: m1 = 0.250 kg at 2.00 m/s; leaves at 1.50 m/s, 45°; m2 = 0.400 kg.
export function darkRoomCollision() {
  const m1 = 0.25,
    m2 = 0.4,
    v1 = 2,
    v1f = 1.5,
    th1 = Math.PI / 4;
  const px = m1 * v1 - m1 * v1f * Math.cos(th1),
    py = -m1 * v1f * Math.sin(th1);
  return {
    m1,
    m2,
    v1,
    v1f,
    th1,
    v2f: Math.hypot(px, py) / m2,
    th2: Math.atan2(py, px),
  };
}

// Example 9.1: forearm 2.50 kg at 0.160 m, book 4.00 kg at r, biceps at 0.0400 m.
export function bicepsForce(r, g = 9.8) {
  return (0.16 * 2.5 * g + r * 4 * g) / 0.04;
}

// Uniform 5.00 kg pole; hands 0.900 m apart, cg at x from the left hand (+ toward the right hand).
export function poleHandForces(x, { weight = 49, span = 0.9 } = {}) {
  const right = (weight * x) / span;
  return { right, left: weight - right };
}

// Sandwich board: each 4.00 kg half pivots at the hinge; chain fixed on the boards.
export function sandwichChainTension(halfAngle) {
  const length = Math.hypot(0.55, 1.3),
    chain = 0.5 / Math.cos(Math.atan(0.55 / 1.3));
  return ((39.2 * length) / (2 * chain)) * Math.tan(halfAngle);
}

// Two equal skaters (m, speed v, lines 2r apart) link hands at t = 0 and spin about their CM.
export function twinSkaters(t, { v = 1, r = 1 } = {}) {
  if (t < 0) return { a: [v * t, r], b: [-v * t, -r], omega: 0 };
  const angle = (v / r) * t;
  return {
    a: [r * Math.sin(angle), r * Math.cos(angle)],
    b: [-r * Math.sin(angle), -r * Math.cos(angle)],
    omega: v / r,
  };
}

// Gyroscope precession Ω = τ / L with τ = mgd and L = Iω.
export function precessionRate({ m, g = 9.8, d, inertia, omega }) {
  return (m * g * d) / (inertia * omega);
}

// Example 10.3 merry-go-round: uniform 50.0 kg, R = 1.50 m disk pushed with 250 N.
export function merryGoRound(r, degrees, extraInertia = 0) {
  const inertia = 0.5 * 50 * 1.5 * 1.5 + extraInertia,
    torque = r * 250 * Math.sin((degrees * Math.PI) / 180);
  return { inertia, torque, alpha: torque / inertia };
}

// The same rock stops in 5 cm of soil with uniform deceleration and stays there.
export function rockInDirt(t, { m = 1, h = 1, depth = 0.05, g = 9.8 } = {}) {
  const t1 = Math.sqrt((2 * h) / g),
    v1 = g * t1,
    stop = (2 * depth) / v1;
  let y, v;
  if (t < t1) {
    y = h - 0.5 * g * t * t;
    v = -g * t;
  } else if (t < t1 + stop) {
    const dt = t - t1,
      a = v1 / stop;
    y = -(v1 * dt - 0.5 * a * dt * dt);
    v = -(v1 - a * dt);
  } else {
    y = -depth;
    v = 0;
  }
  return { y, v, kinetic: 0.5 * m * v * v, gravitational: m * g * y };
}

// Channel position after a fraction of the throughput passes, for flux v·w = constant.
export function channelPosition(progress, width, x0, x1, steps = 400) {
  const cumulative = [0];
  const dx = (x1 - x0) / steps;
  for (let i = 0; i < steps; i += 1)
    cumulative.push(cumulative[i] + width(x0 + (i + 0.5) * dx) * dx);
  const target = progress * cumulative[steps];
  let i = 0;
  while (i < steps - 1 && cumulative[i + 1] < target) i += 1;
  const q = (target - cumulative[i]) / (cumulative[i + 1] - cumulative[i] || 1);
  return x0 + (i + q) * dx;
}

// Box hull floating in fresh water: draft d satisfies ρ A d = total mass.
export function hullDraft(totalMass, area, rho = 1000) {
  return totalMass / (rho * area);
}

// Arterial pressure (mm Hg): 120/80 at 1.2 beats/s, rapid rise then exponential runoff.
export function arterialPressure(t) {
  const phase = (t * 1.2) % 1,
    floor = Math.exp(-5 * 0.85);
  const wave =
    phase < 0.15
      ? Math.sin((Math.PI * phase) / 0.3)
      : (Math.exp(-5 * (phase - 0.15)) - floor) / (1 - floor);
  return 80 + 40 * wave;
}
export function cuffPressure(t) {
  return 160 - 10 * t;
}

// Continuity across a 2D gap: speed ∝ 1/width.
export function gapSpeed(width, upstreamWidth, upstreamSpeed = 1) {
  return (upstreamSpeed * upstreamWidth) / width;
}

// Idealized isotherm below Tc: ideal vapor, flat coexistence, steep liquid branch.
export function subcriticalIsotherm(v, { vl = 1, vg = 4, psat = 1, liquidStiffness = 12 } = {}) {
  if (v >= vg) return { pressure: (psat * vg) / v, liquidFraction: 0 };
  if (v >= vl) return { pressure: psat, liquidFraction: (vg - v) / (vg - vl) };
  return { pressure: psat + liquidStiffness * (vl - v), liquidFraction: 1 };
}

// Constant-pressure volume of an oxygen sample: ideal gas above −183 °C.
export function oxygenVolume(celsius) {
  if (celsius > -183) return (celsius + 273.15) / 273.15;
  // Liquid and solid oxygen occupy about 1/800 and 1/940 of the 0 °C gas volume.
  if (celsius > -218) return 0.00125;
  return 0.00106;
}

// Quadratic fit to freshwater density (g/cm³) between 0 and 12 °C, maximum at 4 °C.
export function waterDensity(celsius) {
  return 0.99997 - 8.0e-6 * (celsius - 4) ** 2;
}

// Tire: fill to full volume at atmospheric pressure, add air at fixed volume, then heat.
export function tireState(progress, { atm = 101, fullGauge = 220, warm = 50 } = {}) {
  if (progress < 1 / 3) return { volume: 0.4 + 1.8 * progress, gauge: 0, celsius: 20, stage: 0 };
  if (progress < 2 / 3)
    return { volume: 1, gauge: fullGauge * (3 * progress - 1), celsius: 20, stage: 1 };
  const celsius = 20 + (warm - 20) * (3 * progress - 2);
  return {
    volume: 1,
    gauge: ((fullGauge + atm) * (celsius + 273.15)) / 293.15 - atm,
    celsius,
    stage: 2,
  };
}
