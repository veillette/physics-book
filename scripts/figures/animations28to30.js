/** Sixteen companions for relativity, quantum physics, and atomic physics. */
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
  number,
  readout,
  panel,
  standalone,
  appendAnimation,
} from './animation-svg.js';
import { spectral } from './ch24.js';
import {
  gamma,
  lightClock,
  simultaneousEvents,
  contractedRod,
  addVelocity,
  relativisticState,
  planck,
  blackbodyReference,
  blackbodyState,
  photoelectricState,
  comptonState,
  diffractionBinProbability,
  diffractionHits,
  diffractionState,
  matterState,
  rutherfordTracks,
  scatteringPoint,
  hydrogenState,
  orbitWave,
  rubyState,
  pauliState,
} from './animation-models28to30.js';

const opts = { discreteAttributes: ['opacity', 'fill', 'stroke'] };
const points = (fn, count = 160) => Array.from({ length: count + 1 }, (_, i) => fn(i / count));
const circle = (x, y, r, color = C.grid) =>
  `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="none" stroke="${color}"/>`;
const wave = (x, y, length, cycles, phase = 0, color = C.blue) =>
  path(
    points(q => [x + length * q, y - 10 * Math.sin(2 * Math.PI * cycles * q + phase)]),
    color,
    'none',
    2
  );

function clockScene(t) {
  const s = lightClock(t),
    left = 155,
    ground = 435,
    scale = 135;
  let body =
    text(175, 67, 'Clock rest frame', 18) + text(560, 67, 'Frame moving relative to the clock', 18);
  body +=
    line(left, 120, left, 255, C.grid, 2) +
    path(
      [
        [ground, 255],
        [ground + scale * 0.6 * gamma(0.6), 120],
        [ground + scale * 0.6 * 2 * gamma(0.6), 255],
      ],
      C.grid,
      'none',
      2
    );
  for (const y of [120, 255]) {
    body += line(left - 33, y, left + 33, y, C.guide, 5);
    body += line(ground + scale * s.x - 33, y, ground + scale * s.x + 33, y, C.guide, 5);
  }
  body +=
    dot(left, 255 - scale * s.y, 7, C.red) + dot(ground + scale * s.x, 255 - scale * s.y, 7, C.red);
  body += readout(60, 305, 'Δτ (D/c)', s.proper, 1, 2) + readout(450, 305, 'Δt (D/c)', s.lab, 1, 2);
  body += text(790, 176, 'v = 0.60c', 17) + text(790, 221, 'γ = 1.25', 17);
  return panel(
    'A moving light clock takes longer between the same events',
    body,
    'Mirror spacing D is transverse to motion. Both photons move at c in their respective frames; the ground-frame mirrors move with the clock. Δt = γΔτ.'
  );
}

function simultaneityScene(t) {
  const s = simultaneousEvents(t);
  let body = '';
  for (const [cx, title] of [
    [205, 'Lamp rest frame'],
    [610, 'Ground frame'],
  ]) {
    body += arrow(cx - 110, 185, 220, 0, C.guide, 1) + arrow(cx, 287, 0, -210, C.guide, 1);
    body +=
      text(cx, 64, title, 18) +
      text(cx + 125, 191, 'x/L0', 14) +
      text(cx + 12, 83, 'ct/L0', 14, '#222222', 'start');
  }
  body += line(145, 185, 265, 185, C.blue, 2) + dot(170, 185, 7, C.blue) + dot(240, 185, 7, C.red);
  body += text(165, 217, 'Rear', 15) + text(245, 217, 'Front', 15);
  body += line(
    610 - (70 * s.g) / 2,
    185 + (90 * s.g * s.beta) / 2,
    610 + (70 * s.g) / 2,
    185 - (90 * s.g * s.beta) / 2,
    C.purple,
    2
  );
  body +=
    dot(610 + 70 * s.rear.x, 185 - 90 * s.rear.time, 7, C.blue) +
    dot(610 + 70 * s.front.x, 185 - 90 * s.front.time, 7, C.red);
  body +=
    readout(40, 304, 'v/c', s.beta, 1, 2) +
    readout(363, 304, 'ct rear/L0', s.rear.time, 1, 2, true) +
    readout(665, 304, 'ct front/L0', s.front.time, 1, 2, true);
  return panel(
    'The same two emissions need not be simultaneous',
    body,
    'The lamps emit at t′ = 0 at x′ = ±L0/2. Lorentz transformation gives ground times ±γvL0/(2c²). These are synchronized-clock coordinates, not light-arrival delays.'
  );
}

function lengthScene(t) {
  const s = contractedRod(t),
    x = 505 + 20 * t,
    width = 290 * s.length;
  let body =
    text(230, 79, 'Rod rest frame', 19) + text(658, 79, 'Frame in which the rod moves', 19);
  body += rect(75, 135, 290, 65, C.fill, C.blue) + rect(x, 135, width, 65, C.fill, C.blue);
  for (const end of [75, 365, x, x + width]) body += line(end, 119, end, 219, C.guide, 2);
  body +=
    text(220, 244, 'Proper length L0', 18) +
    text(x + width / 2, 244, 'L = L0/γ', 18) +
    arrow(x, 110, 75 * s.beta, 0, C.green, 3);
  body +=
    readout(65, 300, 'v/c', s.beta, 1, 2) +
    readout(355, 300, 'γ', s.g, 1, 2) +
    readout(640, 300, 'L/L0', s.length, 1, 2);
  return panel(
    'Length contracts along the direction of motion',
    body,
    'Each observer measures both endpoints at the same time in that observer’s frame. Transverse size stays fixed. This is measured length, not a photographic appearance.'
  );
}

function velocityScene(t) {
  const ship = 0.8 * t,
    relative = 0.75,
    u = addVelocity(ship, relative),
    scale = 310,
    x = 120;
  let body = text(355, 69, 'Forward launch: u′ = 0.75c in the ship frame', 18);
  body +=
    line(x + scale, 89, x + scale, 285, C.red, 2, '5 4') + text(x + scale, 310, 'c', 18, C.red);
  for (const [y, value, label, color] of [
    [120, ship, 'Ship v', C.guide],
    [185, u, 'Relativistic u', C.blue],
    [253, ship + relative, 'Classical sum', C.gold],
  ]) {
    body += arrow(x, y, scale * value, 0, color, 4) + text(x, y - 18, label, 15, C.ink, 'start');
  }
  body += readout(635, 121, 'v/c', ship, 1, 2) + readout(635, 184, 'u/c', u, 1, 3);
  body += text(757, 250, 'For u′ = c: u = c', 17);
  return panel(
    'Relativistic velocity addition keeps subluminal speeds below c',
    body,
    'u/c = (v/c + u′/c)/(1 + vu′/c²). The gold classical sum is a comparison, not a possible launch speed. Light remains at c for every ship speed shown.'
  );
}

function relativisticGraph(t, energy) {
  const s = relativisticState(t),
    key = energy ? 'kinetic' : 'momentum',
    classical = energy ? 'classicalKinetic' : 'classicalMomentum';
  const x = b => 90 + 480 * b,
    y = value => 282 - 44 * value;
  let body = line(90, 282, 580, 282, C.ink, 1.5) + line(90, 70, 90, 282, C.ink, 1.5);
  body += path(
    points(p => {
      const z = relativisticState(p);
      return [x(z.beta), y(z[key])];
    }),
    C.red,
    'none',
    3
  );
  body += path(
    points(p => {
      const z = relativisticState(p);
      return [x(z.beta), y(z[classical])];
    }),
    C.green,
    'none',
    2
  );
  body +=
    line(x(s.beta), 75, x(s.beta), 282, C.guide, 1, '4 4') +
    dot(x(s.beta), y(s[key]), 6, C.red) +
    dot(x(s.beta), y(s[classical]), 5, C.green);
  for (const b of [0, 0.5, 1]) body += text(x(b), 305, String(b), 15);
  for (const value of [0, 1, 2, 3, 4])
    body += line(85, y(value), 95, y(value), C.ink, 1) + text(68, y(value) + 5, String(value), 14);
  body += text(554, 321, 'v/c', 15) + text(320, 62, energy ? 'K / mc²' : 'p / mc', 18);
  body +=
    readout(630, 113, 'v/c', s.beta, 1, 2) +
    readout(630, 175, energy ? 'K / mc²' : 'p / mc', s[key], 1, 2);
  body +=
    text(747, 238, 'Red: relativistic', 17, C.red) +
    text(747, 274, 'Green: classical', 17, C.green);
  return panel(
    energy
      ? 'Relativistic kinetic energy grows rapidly near c'
      : 'Relativistic momentum grows rapidly near c',
    body,
    energy
      ? 'K = (γ − 1)mc², compared with ½mv²; the rest energy mc² is excluded from K. The cursor stops at 0.97c; reaching c requires unbounded energy.'
      : 'p = γmv, compared with mv. Momentum is normalized by mc. The cursor stops at 0.97c, where the relativistic and classical predictions differ strongly.'
  );
}

function blackbodyScene(t) {
  const s = blackbodyState(t),
    x = nm => 85 + (480 * (nm - 200)) / 2800,
    y = i => 280 - 180 * i;
  let body = line(85, 280, 580, 280, C.ink, 1.5) + line(85, 75, 85, 280, C.ink, 1.5);
  for (const value of [0, 0.5, 1]) body += text(65, y(value) + 5, String(value), 14);
  body += path(
    points(p => {
      const nm = 200 + 2800 * p;
      return [x(nm), y(planck(nm, s.kelvin) / blackbodyReference)];
    }, 260),
    C.red,
    'none',
    3
  );
  body += dot(x(s.peak), y(planck(s.peak, s.kelvin) / blackbodyReference), 6, C.blue);
  for (const nm of [500, 1500, 2500]) body += text(x(nm), 304, String(nm), 15);
  body += text(520, 321, 'λ (nm)', 15) + text(319, 64, 'Spectral radiance / 6000 K peak', 17);
  body +=
    readout(615, 113, 'T (K)', s.kelvin, 4, 0) +
    readout(615, 178, 'λ peak (nm)', s.peak, 3, 0) +
    readout(615, 245, 'P/P 3000K', s.power, 2, 1);
  return panel(
    'A hotter blackbody peaks at a shorter wavelength',
    body,
    'Planck spectrum on one fixed vertical scale. Wien’s law sets λ peak T; total power over all wavelengths follows T⁴. The total-power ratio is not a truncated-plot integral.'
  );
}

function photoelectricScene(t) {
  const s = photoelectricState(t),
    x = q => 95 + 230 * q,
    y = k => 280 - 80 * k;
  let body = line(90, 280, 570, 280, C.ink, 1.5) + line(95, 78, 95, 280, C.ink, 1.5);
  for (const value of [0, 1, 2]) body += text(74, y(value) + 5, String(value), 14);
  body += line(x(1), 280, x(2), y(2), C.blue, 3) + line(x(1), 100, x(1), 280, C.grid, 1, '4 4');
  body += visible(s.emits, dot(x(s.frequencyRatio), y(s.kinetic), 7, C.blue));
  body += visible(!s.emits, dot(x(s.frequencyRatio), 280, 7, C.red));
  body +=
    text(320, 65, 'Maximum electron kinetic energy (eV)', 17) +
    text(550, 318, 'f/f0', 15) +
    text(x(1), 304, '1', 15) +
    text(x(2), 304, '2', 15);
  body +=
    readout(630, 112, 'hf (eV)', s.photon, 1, 2) + readout(630, 166, 'Work (eV)', s.work, 1, 2);
  body += visible(s.emits, readout(630, 220, 'K max (eV)', s.kinetic, 1, 2));
  body += visible(!s.emits, text(754, 220, 'No emission', 20, C.red));
  body += text(749, 280, 'f0 = work / h', 17);
  return panel(
    'Photoelectric emission has a frequency threshold',
    body,
    'Illustrative work function 2.00 eV. Below threshold no photoelectron is emitted; above it K max = hf − work. More intensity cannot remove this one-photon threshold.'
  );
}

function comptonScene(t) {
  const s = comptonState(t),
    cx = 215,
    cy = 245,
    scale = 1.85;
  const tip = [cx + scale * s.photonMomentum[0], cy - scale * s.photonMomentum[1]],
    end = [cx + scale * s.energy, cy];
  let body =
    arrow(cx, cy, scale * s.energy, 0, C.red, 3) +
    arrow(cx, cy, tip[0] - cx, tip[1] - cy, C.blue, 3) +
    arrow(tip[0], tip[1], end[0] - tip[0], end[1] - tip[1], C.green, 3);
  body += text(280, 65, 'Momentum vectors form a closed triangle', 18);
  body +=
    text(276, 280, 'Red: incoming photon', 16, C.red) +
    text(276, 302, 'Blue: outgoing photon; green: recoil', 16);
  body +=
    readout(620, 102, 'Angle (°)', 180 * t, 3, 0) +
    readout(620, 150, 'E′ (keV)', s.scattered, 3, 1) +
    readout(620, 198, 'K e (keV)', s.kinetic, 2, 1) +
    readout(620, 246, 'Δλ (pm)', s.shiftPm, 1, 2);
  return panel(
    'Compton scattering conserves energy and vector momentum',
    body,
    'A 100 keV photon scatters from an initially resting electron. E = E′ + K e; electron rest energy is retained in the recoil relation. Vector lengths represent momentum.'
  );
}

function diffractionScene(t) {
  const s = diffractionState(t),
    x = u => 85 + 490 * u;
  let body = rect(85, 86, 490, 98, '#f4f7fa', C.grid);
  diffractionHits.forEach(([u, v], i) => {
    body += visible(i < s.count, dot(x(u), 93 + 84 * v, 2.2, C.ink));
  });
  for (let i = 0; i < 20; i++)
    body += rect(x(i / 20) + 1, 297 - s.bins[i] * 2, 22, s.bins[i] * 2, C.blue, 'none', 0.65);
  body +=
    path(
      Array.from({ length: 20 }, (_, i) => [
        x((i + 0.5) / 20),
        297 - 2 * s.count * diffractionBinProbability(i),
      ]),
      C.red,
      'none',
      2
    ) + line(85, 297, 575, 297, C.ink, 1);
  body +=
    text(332, 65, 'Simulated detection positions', 18) +
    text(335, 213, 'Counts per bin: blue observed, red expected', 16);
  body +=
    readout(628, 135, 'Detections', s.count, 3, 0) +
    text(750, 207, 'Each dot: one detection', 17) +
    text(750, 258, 'No path between dots', 17);
  body += text(330, 319, 'Screen position (normalized)', 15);
  body += line(85, 217, 85, 297, C.ink, 1);
  for (const count of [0, 20, 40]) body += text(64, 302 - 2 * count, String(count), 14);
  return panel(
    'Individual detections build an interference pattern',
    body,
    'A fixed seeded sample uses probability density 2 sin²(5πx), 0 ≤ x ≤ 1. Successive frames reveal small groups of independent detections; dots are not an electron trajectory.'
  );
}

function matterScene(t) {
  const s = matterState(t);
  let body = '';
  for (const [y, label, color] of [
    [125, 'Electron amplitude (schematic)', C.blue],
    [240, 'Photon field (schematic)', C.red],
  ]) {
    body +=
      line(75, y, 550, y, C.grid, 1) +
      wave(75, y, 470, 0.4 / s.lambda, 0, color) +
      text(313, y - 32, label, 17);
  }
  body +=
    readout(620, 106, 'K e (eV)', s.kinetic, 3, 0) +
    readout(620, 164, 'λ (nm)', s.lambda, 1, 3) +
    readout(620, 221, 'v e / c', s.beta, 1, 3) +
    text(750, 282, 'Photon speed: c', 18);
  return panel(
    'Equal wavelength means equal momentum, not equal speed',
    body,
    'Instantaneous phase profiles on a fixed 0.40 nm spatial span. λ = h/p for both particles; the electron uses relativistic momentum. Curves do not show literal particle motion.'
  );
}

function rutherfordScene(t) {
  const colors = [C.red, C.blue, C.green, C.purple],
    map = s => [300 + 5 * s.x, 230 - 5 * s.y];
  const time = t * Math.max(...rutherfordTracks.map(track => track.duration));
  let body = dot(300, 230, 7, C.gold) + text(316, 256, 'Nucleus', 16, C.ink, 'start');
  rutherfordTracks.forEach((track, i) => {
    body += path(track.samples.map(map), colors[i], 'none', 1.5);
    const [x, y] = map(scatteringPoint(track, time));
    body += visible(time <= track.duration, dot(x, y, 5, colors[i]));
    body +=
      text(670, 100 + 47 * i, `b/a = ${track.b}`, 17, colors[i]) +
      number(746, 100 + 47 * i, (track.angle * 180) / Math.PI, 3, 0);
  });
  body +=
    text(760, 65, 'Deflection (°)', 17) + text(300, 307, 'Repulsive Coulomb trajectories', 18);
  return panel(
    'A smaller impact parameter produces stronger nuclear scattering',
    body,
    'Classical point-nucleus model: cot(θ/2) = b/a, a = Zz k e²/(2K∞). Dots use equal elapsed model time along Coulomb hyperbolas. Nuclear size is enlarged; electrons are omitted.'
  );
}

function hydrogenScene(t) {
  const s = hydrogenState(t),
    y = n => 75 + 204 / n ** 2,
    color = spectral(s.lambda);
  let body = '';
  for (let n = 1; n <= 6; n++)
    body +=
      line(110, y(n), 450, y(n), C.guide, 1.5) +
      visible(n <= 2 || n === s.initial, text(80, y(n) + 5, `n=${n}`, 16));
  body += arrow(320, y(s.initial), 0, y(2) - y(s.initial), color, 3);
  for (let n = 1; n <= 6; n++)
    body += visible(n === (s.emitted ? 2 : s.initial), dot(195, y(n), 7, C.blue));
  body += visible(
    s.emitted && s.local < 0.9,
    wave(480 + 50 * Math.max(0, (s.local - 0.4) / 0.6), 250, 60, 3, 0, color)
  );
  body +=
    readout(613, 105, 'n initial', s.initial, 1, 0) +
    readout(613, 153, 'n final', 2, 1, 0) +
    readout(613, 207, 'Eγ (eV)', s.energy, 1, 2) +
    readout(613, 262, 'λ (nm)', s.lambda, 3, 1);
  body += text(310, 65, 'E n = −13.6 eV / n²', 18);
  return panel(
    'Hydrogen energy gaps produce separate Balmer lines',
    body,
    'Selected transitions n = 3, 4, 5, 6 → 2. The atom occupies discrete energy levels; the arrow marks the energy gap, not intermediate allowed energies or a spatial electron path.'
  );
}

function orbitScene(t) {
  let body = '';
  for (const [n, cx] of [
    [3, 235],
    [4, 650],
  ]) {
    const r = 6 * n * n;
    body +=
      circle(cx, 180, r, C.guide) +
      path(
        points(q => {
          const angle = 2 * Math.PI * q,
            radius = r + 11 * orbitWave(n, angle, t);
          return [cx + radius * Math.cos(angle), 180 - radius * Math.sin(angle)];
        }, 240),
        C.purple,
        'none',
        3
      );
    body += text(cx, 68, `n = ${n} wavelengths`, 19) + text(cx, 301, 'r ∝ n²; 2πr = nλ', 18);
  }
  return panel(
    'An integer number of wavelengths closes smoothly around a ring',
    body,
    'Historical Bohr–de Broglie boundary-condition model. Radial displacement draws wave amplitude, not an electron orbit. The phase clock is illustrative; no electron tracer is shown.'
  );
}

function rubyScene(t) {
  const s = rubyState(t),
    y = e => 286 - 65 * e;
  let body = '';
  for (const e of [0, 1.79, 2.3, 3])
    body += line(95, y(e), 390, y(e), C.guide, 2) + text(410, y(e) + 5, `${e} eV`, 16);
  for (const e of [0, 1.79, 2.3]) body += visible(s.level === e, dot(215, y(e), 7, C.blue));
  body += visible(t < 0.3, arrow(140, y(0), 0, y(2.3) - y(0), C.blue, 3));
  body += visible(t >= 0.18 && t < 0.65, arrow(315, y(2.3), 0, y(1.79) - y(2.3), C.gold, 3));
  body += visible(s.emitted, arrow(315, y(1.79), 0, y(0) - y(1.79), C.red, 3));
  const q = Math.max(0, (t - 0.65) / 0.35);
  body += visible(t >= 0.5 && !s.emitted, wave(615 - (130 * (t - 0.5)) / 0.15, 166, 75, 3));
  body += visible(
    s.emitted,
    wave(560 + 120 * q, 166, 75, 3, 0, C.red) + wave(560 + 120 * q, 218, 75, 3, 0, C.red)
  );
  body +=
    text(690, 72, 'Pump → relax → stimulate', 18) +
    text(690, 119, 'Matched outgoing mode and phase', 16);
  body += text(692, 278, '1.79 eV per emitted photon', 17);
  return panel(
    'A ruby-laser cycle releases stored excitation energy',
    body,
    'Rounded book levels: pump 2.30 eV, nonradiative loss 0.51 eV, metastable energy 1.79 eV. A 1.79 eV seed stimulates two outgoing photons; pump + seed = heat + output.'
  );
}

function pauliScene(t) {
  const s = pauliState(t),
    cy = s.trialTwo ? 126 : 246;
  let body =
    rect(260, 206, 130, 78, 'none', C.guide) +
    rect(260, 86, 130, 78, 'none', C.guide) +
    text(325, 196, '1s: n=1, ℓ=0, mℓ=0', 15) +
    text(325, 78, '2s: n=2, ℓ=0, mℓ=0', 15);
  body +=
    visible(s.oneUp, arrow(302, 269, 0, -44, C.blue, 3)) +
    visible(s.oneDown, arrow(350, 225, 0, 44, C.blue, 3)) +
    visible(s.twoUp, arrow(302, 149, 0, -44, C.blue, 3));
  body += visible(
    s.stage < 5,
    arrow(
      150,
      cy + (s.trialDown ? -22 : 22),
      0,
      s.trialDown ? 44 : -44,
      s.allowed ? C.green : C.red,
      3
    )
  );
  body += visible(s.stage < 5, arrow(178, cy, 65, 0, C.guide, 1));
  const labels = [
    'Add the first 1s electron',
    'Same 1s and same spin: blocked',
    'Opposite 1s spin: allowed',
    'Third 1s electron: blocked',
    'Use another spatial orbital',
    '1s pair plus one 2s electron',
  ];
  labels.forEach((label, i) => {
    body += visible(s.stage === i, text(450, 62, label, 20, s.allowed ? C.green : C.red));
  });
  body +=
    text(690, 210, 'Each spatial orbital:', 18) + text(690, 248, 'at most two opposite spins', 17);
  return panel(
    'Pauli exclusion prevents duplicate sets of four quantum numbers',
    body,
    'Arrows label spin projection, not spinning charged balls. A rejected trial never enters the occupied state. Changing to 2s changes n, so a third electron can occupy it.'
  );
}

const scenes = {
  Figure_28_04_05: velocityScene,
  Figure_28_05_02: t => relativisticGraph(t, false),
  Figure_28_06_03: t => relativisticGraph(t, true),
  Figure_29_01_01: blackbodyScene,
  Figure_29_02_03: photoelectricScene,
  Figure_29_04_02: comptonScene,
  Figure_29_07_01: diffractionScene,
  Figure_29_08_01: matterScene,
  Figure_30_02_08: rutherfordScene,
  Figure_30_03_07: hydrogenScene,
  Figure_30_06_01: orbitScene,
  Figure_30_05_16: rubyScene,
  Figure_30_09_02: pauliScene,
};
export const animationNames28to30 = Object.keys(scenes);
export function animateFigure28to30(name, svg) {
  return scenes[name] ? appendAnimation(svg, scenes[name], opts) : svg;
}
const companion = (title, desc, draw) => () => standalone(title, desc, draw, opts);
export default {
  companion_28_02_light_clock: companion(
    'Light-clock time dilation',
    'The same photon emission, reflection, and return are shown in the clock rest frame and a frame where the clock moves at 0.6c. The moving mirrors and the light positions obey the Lorentz transformation.',
    clockScene
  ),
  companion_28_02_simultaneity: companion(
    'Relativity of simultaneity',
    'Two emissions at opposite ends of a train occur at the same train-frame coordinate time. Lorentz-transformed event coordinates give different ground-frame times, distinct from signal-arrival delays.',
    simultaneityScene
  ),
  companion_28_03_length: companion(
    'Measuring a moving rod',
    'The rest length of a rod is compared with its length in a frame where it moves. Endpoint measurements are simultaneous in each measuring frame. Only the dimension along motion contracts.',
    lengthScene
  ),
};
