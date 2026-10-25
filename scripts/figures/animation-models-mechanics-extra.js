/** Physical states for seven mechanics companions. SI units unless stated. */
import { teardropLoop } from './mechanics-loop.js';
export const g = 9.8;
export const clamp = t => Math.min(1, Math.max(0, t));
export const sample = (fn, n = 120) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));

export function inclineState(t) {
  const degrees = 10 + 50 * clamp(t),
    angle = (degrees * Math.PI) / 180,
    weight = 100;
  const parallel = weight * Math.sin(angle),
    perpendicular = weight * Math.cos(angle);
  return {
    degrees,
    angle,
    weight,
    parallel,
    perpendicular,
    along: [-parallel * Math.cos(angle), parallel * Math.sin(angle)],
    into: [perpendicular * Math.sin(angle), perpendicular * Math.cos(angle)],
  };
}
export function skierState(t) {
  const time = 3 * clamp(t),
    mass = 62,
    angle = (25 * Math.PI) / 180,
    friction = 45;
  const weight = mass * g,
    normal = weight * Math.cos(angle),
    acceleration = (weight * Math.sin(angle) - friction) / mass;
  return {
    time,
    mass,
    angle,
    weight,
    normal,
    friction,
    mu: friction / normal,
    acceleration,
    speed: 1 + acceleration * time,
    distance: time + (acceleration * time ** 2) / 2,
  };
}
export function turnState(t, radius) {
  const time = 12 * clamp(t),
    speed = 12,
    mass = 1000,
    angle = (speed * time) / radius;
  return {
    time,
    speed,
    mass,
    radius,
    angle,
    force: (mass * speed ** 2) / radius,
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

export const loopGeometry = teardropLoop();
export const loopMetresPerUnit = 0.05;
export const loopEntrySpeed = 22;
const ds = (loopGeometry.length / loopGeometry.steps) * loopMetresPerUnit;
const heights = loopGeometry.points.map(p => (480 - p[1]) * loopMetresPerUnit);
const speeds = heights.map(h => Math.sqrt(loopEntrySpeed ** 2 - 2 * g * h));
export const loopTimes = [0];
for (let i = 1; i <= loopGeometry.steps; i++)
  loopTimes.push(loopTimes[i - 1] + (ds * (1 / speeds[i - 1] + 1 / speeds[i])) / 2);
export function loopState(t) {
  const time = clamp(t) * loopTimes.at(-1);
  let lo = 0,
    hi = loopGeometry.steps;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (loopTimes[mid] <= time) lo = mid;
    else hi = mid;
  }
  const q = (time - loopTimes[lo]) / (loopTimes[hi] - loopTimes[lo]);
  const u = (lo + q) / loopGeometry.steps;
  const position = loopGeometry.points[lo].map((v, i) => v + q * (loopGeometry.points[hi][i] - v));
  const heading = loopGeometry.heading(u),
    height = (480 - position[1]) * loopMetresPerUnit;
  const speedSquared = loopEntrySpeed ** 2 - 2 * g * height;
  const curvature = (8 * Math.PI * Math.min(u, 1 - u)) / (loopGeometry.length * loopMetresPerUnit);
  const normalPerMass = speedSquared * curvature - g * Math.cos(heading);
  return {
    time,
    u,
    position,
    heading,
    height,
    curvature,
    speed: Math.sqrt(speedSquared),
    normalPerMass,
    kineticPerMass: speedSquared / 2,
    potentialPerMass: g * height,
  };
}
export function leverState(t) {
  const angle0 = -0.22,
    angle = angle0 + 0.44 * clamp(t),
    inputArm = 0.6,
    outputArm = 0.1;
  const outputForce = 300,
    inputForce = (outputForce * outputArm) / inputArm;
  const rise = Math.sin(angle) - Math.sin(angle0),
    inputTravel = inputArm * rise,
    outputTravel = outputArm * rise;
  return {
    angle,
    inputArm,
    outputArm,
    inputForce,
    outputForce,
    inputTravel,
    outputTravel,
    reaction: inputForce + outputForce,
    inputWork: inputForce * inputTravel,
    outputWork: outputForce * outputTravel,
  };
}
export function reelState(t) {
  const time = 3.5 * clamp(t),
    radius = 0.045,
    inertia = 0.002,
    tension = 0.04;
  const torque = tension * radius,
    alpha = torque / inertia,
    omega = alpha * time,
    angle = (alpha * time ** 2) / 2;
  const distance = radius * angle;
  return {
    time,
    radius,
    inertia,
    tension,
    torque,
    alpha,
    omega,
    angle,
    distance,
    speed: radius * omega,
    acceleration: radius * alpha,
    kinetic: (inertia * omega ** 2) / 2,
    work: tension * distance,
  };
}
export function impactState(t) {
  const mass = 0.05,
    rodMass = 2,
    length = 1.2,
    speed = 30;
  const inertia = (mass + rodMass / 3) * length ** 2,
    angularMomentum = mass * speed * length;
  const omega = angularMomentum / inertia,
    initialKinetic = (mass * speed ** 2) / 2,
    finalKinetic = (inertia * omega ** 2) / 2;
  // Both phases obey SI time, with a larger playback slowdown before impact.
  const progress = clamp(t),
    hitTime = 0.04;
  const time =
    progress < 0.35 ? (hitTime * progress) / 0.35 : hitTime + (0.62 * (progress - 0.35)) / 0.65;
  const hit = progress >= 0.35;
  const angle = hit ? omega * (time - hitTime) : 0;
  const disk = hit
    ? [length * Math.sin(angle), length * Math.cos(angle)]
    : [speed * (time - hitTime), length];
  const diskVelocity = hit
    ? [omega * length * Math.cos(angle), -omega * length * Math.sin(angle)]
    : [speed, 0];
  const rodVelocity = [
    ((omega * length) / 2) * Math.cos(angle),
    ((-omega * length) / 2) * Math.sin(angle),
  ];
  const linearMomentum = hit
    ? diskVelocity.map((v, i) => mass * v + rodMass * rodVelocity[i])
    : [mass * speed, 0];
  return {
    time,
    hitTime,
    hit,
    angle,
    disk,
    diskVelocity,
    mass,
    rodMass,
    length,
    speed,
    inertia,
    omega,
    angularMomentum,
    initialKinetic,
    finalKinetic,
    kinetic: hit ? finalKinetic : initialKinetic,
    dissipated: hit ? initialKinetic - finalKinetic : 0,
    linearMomentum,
  };
}
