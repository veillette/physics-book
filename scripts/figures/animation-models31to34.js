/** Analytic states for the nuclear, particle and cosmology companions.
 * Animation progress is a parameter sweep unless a model clock is stated.
 */
export const clamp = t => Math.max(0, Math.min(1, t));
export const sample = (fn, n = 120) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));

let seed = 31034;
export const decayTimes = Array.from({ length: 80 }, () => {
  seed = (seed * 16807) % 2147483647;
  return -Math.log(seed / 2147483647) / Math.LN2;
});
export function decayState(t) {
  const time = 4 * clamp(t);
  return { time, expected: 80 * 2 ** -time, remaining: decayTimes.filter(x => x > time).length };
}
export const alphaState = t => ({
  emitted: t >= 0.25,
  separation: 240 * clamp((t - 0.25) / 0.75),
  parent: { A: 238, Z: 92 },
  daughter: { A: 234, Z: 90 },
  alpha: { A: 4, Z: 2 },
});
export const betaProducts = [
  { label: 'p', charge: 1, baryon: 1, lepton: 0 },
  { label: 'e−', charge: -1, baryon: 0, lepton: 1 },
  { label: 'ν̅e', charge: 0, baryon: 0, lepton: -1 },
];
export function bindingState(t) {
  const proton = 938.272088,
    neutron = 939.565421,
    deuteron = 1875.612943;
  const released = t >= 0.5;
  return { proton, neutron, deuteron, binding: proton + neutron - deuteron, released };
}
export function forceState(t) {
  const r = 1 + 4 * clamp(t);
  return { r, nuclear: Math.exp(-(r - 1) / 0.4), coulomb: 1 / r ** 2 };
}
export function barrierTransmission(width, energy = 0.4, height = 1) {
  const kappa = Math.sqrt(height - energy);
  return 1 / (1 + (height ** 2 * Math.sinh(kappa * width) ** 2) / (4 * energy * (height - energy)));
}
export function tunnelingState(t) {
  const width = 0.4 + 2.6 * clamp(t),
    transmission = barrierTransmission(width);
  return { width, energy: 0.4, height: 1, transmission, reflection: 1 - transmission };
}
export const fusionState = t => ({
  reacted: t >= 0.5,
  q: 17.6,
  alphaK: 17.6 / 5,
  neutronK: (4 * 17.6) / 5,
  inputs: [
    { A: 2, Z: 1 },
    { A: 3, Z: 1 },
  ],
  products: [
    { A: 4, Z: 2 },
    { A: 1, Z: 0 },
  ],
});
export const coulombState = t => {
  // Classical radial approach in units kZ1Z2e² = E = 1.
  // The cursor is a separation sweep, not a uniform time step.
  const r = 1 + 4 * Math.abs(2 * clamp(t) - 1);
  return { r, potential: 1 / r, kinetic: 1 - 1 / r };
};
export const fissionProducts = [
  { label: 'Ba-141', A: 141, Z: 56 },
  { label: 'Kr-92', A: 92, Z: 36 },
  ...Array.from({ length: 3 }, () => ({ label: 'n', A: 1, Z: 0 })),
];
export function chainState(t, k) {
  const generation = Math.min(6, Math.floor(6 * clamp(t)));
  return { generation, population: k ** generation };
}

// Thin-gap, nonrelativistic cyclotron: m = qB = qΔV = 1.
// Equal half-turn intervals; acceleration is an instantaneous kick at the gap.
export function cyclotronState(t) {
  const q = 8 * clamp(t),
    turn = Math.min(7, Math.floor(q)),
    phase = q - turn;
  let startY = 0;
  for (let i = 0; i < turn; i++) startY += 2 * (-1) ** i * Math.sqrt(2 * (i + 1));
  const side = (-1) ** turn,
    kinetic = turn + 1,
    radius = Math.sqrt(2 * kinetic);
  return {
    turn,
    phase,
    kinetic,
    radius,
    speed: radius,
    frequency: 1 / (2 * Math.PI),
    x: side * radius * Math.sin(Math.PI * phase),
    y: startY + side * radius * (1 - Math.cos(Math.PI * phase)),
    side,
  };
}
const orbitIntegral = g => Math.sqrt(g * g - 1) - Math.acos(1 / g);
export function synchrotronState(t) {
  const gamma = 1.1 + 0.9 * clamp(t),
    momentum = Math.sqrt(gamma ** 2 - 1),
    beta = momentum / gamma;
  const phase =
    (6 * Math.PI * (orbitIntegral(gamma) - orbitIntegral(1.1))) /
    (orbitIntegral(2) - orbitIntegral(1.1));
  return { gamma, momentum, beta, field: momentum, radius: 1, phase };
}
export function annihilationState(t) {
  const rest = 510.99895,
    kinetic = 100;
  return {
    emitted: t >= 0.5,
    rest,
    kinetic,
    photon: rest + kinetic,
    momentum: Math.sqrt(kinetic * (kinetic + 2 * rest)),
  };
}
export const hadrons = [
  { label: 'Proton: uud', quarks: ['u', 'u', 'd'], thirds: [2, 2, -1], charge: 1 },
  { label: 'Neutron: udd', quarks: ['u', 'd', 'd'], thirds: [2, -1, -1], charge: 0 },
  { label: 'Positive pion: u d̅', quarks: ['u', 'd̅'], thirds: [2, 1], charge: 1 },
  { label: 'Negative pion: d u̅', quarks: ['d', 'u̅'], thirds: [-1, -2], charge: -1 },
];
export function probeState(t) {
  const kinetic = 100 * 1000 ** clamp(t),
    rest = 0.51099895;
  const momentum = Math.sqrt(kinetic * (kinetic + 2 * rest));
  return { kinetic, momentum, wavelength: 1239.841984 / momentum };
}
export function expansionState(t) {
  const scale = 1 + clamp(t),
    hubble = 0.2;
  return { scale, hubble, distances: [1, 2, 3].map(x => x * scale), redshift: scale - 1 };
}
export const arcseconds = (180 * 3600) / Math.PI;
export function parallaxState(t) {
  const angle = 2 * Math.PI * clamp(t),
    distanceAU = 2 * arcseconds;
  const x = Math.cos(angle),
    y = Math.sin(angle);
  return {
    x,
    y,
    distancePC: 2,
    parallax: Math.atan(1 / distanceAU) * arcseconds,
    apparent: -Math.atan2(x, distanceAU - y) * arcseconds,
  };
}
export function elevatorState(t) {
  // c = 1, room width = 1, a = .08: local, low-velocity approximation.
  const time = clamp(t),
    acceleration = 0.08;
  return { time, x: time, lift: (acceleration * time ** 2) / 2, acceleration };
}
export function deflectionState(t) {
  const impact = 1 + 3 * clamp(t),
    gravitationalRadius = 1476.625,
    solarRadius = 6.957e8;
  return { impact, angle: ((4 * gravitationalRadius) / (impact * solarRadius)) * arcseconds };
}
export function superconductingState(t) {
  const temperature = 4.4 - 0.4 * clamp(t),
    critical = 4.2;
  return { temperature, critical, resistance: temperature < critical ? 0 : 1 };
}
