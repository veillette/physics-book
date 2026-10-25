/** Relativity and quantum/atomic states. Energies explicitly state their units. */
export const hEV = 4.135667696e-15;
export const hcEVnm = 1239.841984;
export const electronRestEV = 510998.95;
export const gamma = beta => 1 / Math.sqrt(1 - beta * beta);

export function lightClock(progress, beta = 0.6) {
  const proper = 2 * progress,
    lab = gamma(beta) * proper;
  return { beta, proper, lab, x: beta * lab, y: proper <= 1 ? proper : 2 - proper };
}
export function simultaneousEvents(progress) {
  const beta = 0.8 * progress,
    g = gamma(beta);
  return {
    beta,
    g,
    rear: { x: -g / 2, time: (-g * beta) / 2 },
    front: { x: g / 2, time: (g * beta) / 2 },
  };
}
export function contractedRod(progress) {
  const beta = 0.95 * progress;
  return { beta, g: gamma(beta), length: 1 / gamma(beta) };
}
export function addVelocity(ship, relative) {
  return (ship + relative) / (1 + ship * relative);
}
export function relativisticState(progress) {
  const beta = 0.97 * progress,
    g = gamma(beta);
  return {
    beta,
    g,
    momentum: g * beta,
    kinetic: g - 1,
    classicalMomentum: beta,
    classicalKinetic: (beta * beta) / 2,
  };
}

export const wienNmK = 2.897771955e6;
export function planck(nm, kelvin) {
  return 1 / (nm ** 5 * Math.expm1(1.438776877e7 / (nm * kelvin)));
}
export const blackbodyReference = planck(wienNmK / 6000, 6000);
export function blackbodyState(progress) {
  const kelvin = 3000 + 3000 * progress;
  return { kelvin, peak: wienNmK / kelvin, power: (kelvin / 3000) ** 4 };
}
export function photoelectricState(progress) {
  const work = 2,
    frequencyRatio = 0.5 + 1.5 * progress,
    photon = work * frequencyRatio;
  return {
    work,
    frequencyRatio,
    frequency: photon / hEV,
    photon,
    emits: photon >= work,
    kinetic: Math.max(0, photon - work),
  };
}
export function comptonState(progress) {
  const theta = Math.PI * progress,
    energy = 100,
    rest = electronRestEV / 1000;
  const scattered = energy / (1 + (energy / rest) * (1 - Math.cos(theta)));
  const photonMomentum = [scattered * Math.cos(theta), scattered * Math.sin(theta)];
  const recoil = [energy - photonMomentum[0], -photonMomentum[1]];
  const kinetic = energy - scattered;
  const shiftPm = hcEVnm * (1 / scattered - 1 / energy); // keV denominators, nm→pm cancel.
  return { theta, energy, scattered, kinetic, rest, photonMomentum, recoil, shiftPm };
}
export const diffractionDensity = u => 2 * Math.sin(5 * Math.PI * u) ** 2;
export function diffractionBinProbability(i, count = 20) {
  const a = i / count,
    b = (i + 1) / count;
  return b - a - (Math.sin(10 * Math.PI * b) - Math.sin(10 * Math.PI * a)) / (10 * Math.PI);
}
export function diffractionSample(count = 240) {
  let seed = 2028;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Array.from({ length: count }, () => {
    let u;
    do u = random();
    while (random() > diffractionDensity(u) / 2);
    return [u, random()];
  });
}
export const diffractionHits = diffractionSample();
export function diffractionState(progress) {
  const count = Math.round(progress * diffractionHits.length),
    bins = Array(20).fill(0);
  for (const [x] of diffractionHits.slice(0, count)) bins[Math.min(19, Math.floor(x * 20))] += 1;
  return { count, bins };
}
export function matterState(progress) {
  const kinetic = 50 + 750 * progress,
    pc = Math.sqrt(kinetic * (kinetic + 2 * electronRestEV));
  return { kinetic, pc, lambda: hcEVnm / pc, beta: pc / (kinetic + electronRestEV) };
}

/** Repulsive Coulomb hyperbolas: k=m=v∞=1, hence E∞=1/2 and a=1.
 * Start/end at r=30. θ decreases along the path; dt = -r² dθ/b.
 */
export function rutherfordTrajectory(b) {
  const e = Math.sqrt(1 + b * b),
    p = b * b,
    limit = Math.acos((1 + p / 30) / e);
  const rotation = Math.PI - Math.acos(1 / e),
    samples = [];
  let elapsed = 0,
    previous;
  for (let i = 0; i <= 400; i += 1) {
    const theta = limit * (1 - (2 * i) / 400),
      r = p / (e * Math.cos(theta) - 1);
    if (previous) elapsed += (((previous.r ** 2 + r ** 2) / 2) * ((2 * limit) / 400)) / b;
    const drDTheta = (p * e * Math.sin(theta)) / (e * Math.cos(theta) - 1) ** 2;
    const radialSpeed = drDTheta * (-b / (r * r));
    samples.push({
      x: r * Math.cos(rotation + theta),
      y: r * Math.sin(rotation + theta),
      r,
      time: elapsed,
      speedSquared: radialSpeed ** 2 + (b / r) ** 2,
    });
    previous = { r };
  }
  return { b, angle: 2 * Math.atan(1 / b), minimum: 1 + e, duration: elapsed, samples };
}
export const rutherfordTracks = [0.3, 1, 3, 8].map(rutherfordTrajectory);
export function scatteringPoint(track, time) {
  const index = track.samples.findIndex(s => s.time >= time);
  if (index === 0) return track.samples[0];
  if (index < 0) return track.samples.at(-1);
  const a = track.samples[index - 1],
    b = track.samples[index],
    q = (time - a.time) / (b.time - a.time);
  return { x: a.x + (b.x - a.x) * q, y: a.y + (b.y - a.y) * q };
}
export function hydrogenState(progress) {
  const stage = Math.min(3, Math.floor(progress * 4)),
    initial = stage + 3,
    final = 2;
  const energy = 13.6 * (1 / final ** 2 - 1 / initial ** 2);
  const local = progress === 1 ? 1 : progress * 4 - stage;
  return { initial, final, energy, lambda: hcEVnm / energy, local, emitted: local >= 0.4 };
}
export function orbitWave(n, theta, progress) {
  return Math.cos(n * theta) * Math.cos(4 * Math.PI * progress);
}
export function rubyState(progress) {
  const pumped = progress >= 0.18,
    relaxed = progress >= 0.3,
    emitted = progress >= 0.65;
  const level = emitted || !pumped ? 0 : relaxed ? 1.79 : 2.3;
  return {
    level,
    pumped,
    relaxed,
    emitted,
    pump: pumped ? 2.3 : 0,
    heat: relaxed ? 0.51 : 0,
    seed: emitted ? 1.79 : 0,
    output: emitted ? 3.58 : 0,
  };
}
export function pauliState(progress) {
  const stage = Math.min(5, Math.floor(6 * progress));
  return {
    stage,
    oneUp: stage >= 1,
    oneDown: stage >= 3,
    twoUp: stage >= 5,
    allowed: [true, false, true, false, true, true][stage],
    trialDown: stage === 2,
    trialTwo: stage >= 4,
  };
}
