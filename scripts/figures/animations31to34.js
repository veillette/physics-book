/** Nuclear, particle and cosmology scenes, below the original artwork. */
import {
  C,
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
  clamp,
  sample,
  decayTimes,
  decayState,
  alphaState,
  bindingState,
  forceState,
  tunnelingState,
  fusionState,
  coulombState,
  chainState,
  cyclotronState,
  synchrotronState,
  annihilationState,
  hadrons,
  probeState,
  expansionState,
  parallaxState,
  elevatorState,
  deflectionState,
  superconductingState,
} from './animation-models31to34.js';

const opts = { discreteAttributes: ['opacity', 'fill', 'stroke'] };
const circle = (x, y, r, color = C.guide) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${color}" stroke-width="1.5"/>`;
const wave = (x, y, width = 65) =>
  path(
    sample(q => [x + width * q, y + 6 * Math.sin(6 * Math.PI * q)], 60),
    C.red
  );
const ball = (x, y, label, color = C.blue, r = 26) =>
  dot(x, y, r, color) + text(x, y + 6, label, 17, 'white');
const plotAxes = (xlabel, ylabel) =>
  line(85, 290, 550, 290) +
  line(85, 290, 85, 80) +
  text(320, 317, xlabel, 16) +
  text(320, 65, ylabel, 17);

function decayScene(t) {
  const s = decayState(t),
    x = u => 85 + 112 * u,
    y = n => 290 - 2.4 * n;
  let body =
    plotAxes('Time / half-life', 'Expected survivors (curve); one sample (dots)') +
    path(
      sample(q => [x(4 * q), y(80 * 2 ** (-4 * q))]),
      C.blue
    ) +
    dot(x(s.time), y(s.expected), 6, C.red);
  for (let i = 0; i <= 4; i++) body += text(x(i), 307, String(i), 13);
  for (const n of [0, 40, 80]) body += text(65, y(n) + 5, String(n), 14);
  decayTimes.forEach((time, i) => {
    body += dot(
      625 + (i % 10) * 22,
      85 + Math.floor(i / 10) * 20,
      5,
      time > s.time ? C.blue : C.grid
    );
  });
  body +=
    readout(615, 267, 'Sample left', s.remaining, 2, 0) +
    readout(615, 307, 'Mean left', s.expected, 2, 1);
  return panel(
    'Half of the expected survivors remain after each half-life',
    body,
    'A fixed seeded sample of 80 independent lifetimes fluctuates around N = N0 × 2^(−t/t½). A gray dot has decayed; the blue curve is the ensemble expectation.'
  );
}
function alphaScene(t) {
  const s = alphaState(t),
    d = s.separation;
  let body =
    visible(!s.emitted, ball(325, 174, 'U-238', C.purple, 47)) +
    visible(
      s.emitted,
      ball(325 - (d * 4) / 238, 174, 'Th-234', C.blue, 43) +
        ball(325 + (d * 234) / 238, 174, 'α', C.red, 18)
    );
  body +=
    text(325, 270, '238 = 234 + 4; 92 = 90 + 2', 20) +
    text(719, 113, 'Mass number A: conserved', 18) +
    text(719, 159, 'Charge Z: conserved', 18) +
    text(719, 218, 'Opposite recoil momenta', 18) +
    text(719, 261, '|vα / vTh| ≈ 234 / 4', 17);
  return panel(
    'Alpha decay conserves nucleon count, charge and momentum',
    body,
    'U-238 → Th-234 + He-4. The two-body recoil uses masses proportional to A; sizes and speeds are schematic. The alpha is not drawn as a pre-existing orbiting object.'
  );
}
function betaScene(t) {
  const emitted = t >= 0.35,
    q = clamp((t - 0.35) / 0.65);
  let body =
    visible(!emitted, ball(275, 165, 'n', C.green, 30)) +
    visible(emitted, ball(275, 165, 'p', C.blue, 30));
  body += visible(
    emitted,
    ball(340 + 160 * q, 145 - 45 * q, 'e−', C.red, 18) +
      ball(340 + 160 * q, 220 + 35 * q, 'ν̅e', C.purple, 18)
  );
  body += text(275, 292, 'In a nucleus: A stays fixed, Z increases by 1', 18);
  [
    ['Charge / e', '0 = +1 − 1 + 0'],
    ['Baryon number', '1 = 1 + 0 + 0'],
    ['Lepton number', '0 = 0 + 1 − 1'],
  ].forEach(([label, value], i) => {
    body += text(717, 90 + i * 75, label, 18, C.guide) + text(717, 118 + i * 75, value, 19);
  });
  return panel(
    'Beta-minus decay includes an electron antineutrino',
    body,
    'n → p + e− + ν̅e. The weak interaction changes a neutron into a proton. Paths only separate the labels; no particular energy sharing or recoil geometry is implied.'
  );
}
function bindingScene(t) {
  const s = bindingState(t),
    q = clamp((t - 0.5) / 0.5);
  let body = visible(
    !s.released,
    ball(170 + 85 * clamp(2 * t), 160, 'p', C.blue) +
      ball(390 - 85 * clamp(2 * t), 160, 'n', C.green)
  );
  body += visible(s.released, ball(280, 160, 'D', C.purple, 34) + wave(340 + 100 * q, 125));
  body +=
    text(280, 284, 'p + n → deuteron + γ', 20) +
    readout(590, 98, 'm p c²', s.proton, 3, 3) +
    readout(590, 145, 'm n c²', s.neutron, 3, 3) +
    readout(590, 192, 'm D c²', s.deuteron, 4, 3) +
    readout(590, 253, 'BE (MeV)', s.binding, 1, 3) +
    text(710, 299, 'BE = (m p + m n − m D)c²', 18);
  return panel(
    'A bound nucleus has less rest mass than its separate nucleons',
    body,
    'Mass energies are in MeV. Binding releases 2.225 MeV in the zero-input-kinetic-energy limit, shared by photon and recoil. The wave symbol marks radiation, not a calculated photon path.'
  );
}
function forceScene(t) {
  const s = forceState(t),
    x = r => 85 + 110 * (r - 1),
    y = v => 290 - 190 * v;
  let body = plotAxes(
    'Separation / reference distance',
    'Relative force magnitude (each starts at 1)'
  );
  body +=
    path(
      sample(q => {
        const u = forceState(q);
        return [x(u.r), y(u.nuclear)];
      }),
      C.green
    ) +
    path(
      sample(q => {
        const u = forceState(q);
        return [x(u.r), y(u.coulomb)];
      }),
      C.red
    ) +
    line(x(s.r), 85, x(s.r), 290, C.guide, 1, '4 4') +
    dot(x(s.r), y(s.nuclear), 5, C.green) +
    dot(x(s.r), y(s.coulomb), 5, C.red);
  body +=
    text(717, 101, 'Short-range attraction', 18, C.green) +
    text(717, 144, 'exp[−(r/r0 − 1)/0.4]', 17, C.green) +
    text(717, 213, 'Long-range repulsion', 18, C.red) +
    text(717, 256, '(r0/r)²', 20, C.red);
  for (let i = 1; i <= 5; i++) body += text(x(i), 307, String(i), 13);
  return panel(
    'Nuclear attraction falls away faster than Coulomb repulsion',
    body,
    'A qualitative range comparison for r ≥ r0. The nuclear curve is an illustrative exponential, not a fitted nucleon potential; both magnitudes are normalized independently.'
  );
}
function tunnelScene(t) {
  const s = tunnelingState(t),
    w = 110 * s.width;
  let body =
    line(70, 270, 560, 270) +
    rect(160, 100, w, 170, C.fill, C.guide) +
    line(70, 202, 560, 202, C.red, 2, '6 4') +
    text(100, 191, 'E', 18, C.red) +
    text(160 + w / 2, 85, 'V0 = 1', 18);
  body +=
    arrow(80, 240, 63, 0, C.blue) +
    text(104, 299, 'Incident flux', 16) +
    text(340, 299, 'Barrier width increases', 18);
  body +=
    readout(600, 101, 'Width a', s.width, 1, 2) +
    text(718, 152, 'Flux fractions: R + T = 1', 18) +
    rect(615, 179, 215, 25, C.grid, 'none') +
    rect(615, 179, 215 * s.transmission, 25, C.blue, 'none') +
    readout(600, 239, 'T', s.transmission, 1, 3) +
    readout(600, 291, 'R', s.reflection, 1, 3);
  return panel(
    'A thicker barrier reduces quantum transmission',
    body,
    'Exact stationary rectangular-barrier transmission at E/V0 = 0.4, with ℏ²/(2m) = V0 = 1. T and R are probability-current fractions; no trajectory inside the barrier is assigned.'
  );
}
function fusionScene(t) {
  const s = fusionState(t),
    q = clamp((t - 0.5) / 0.5);
  let body = visible(
    !s.reacted,
    ball(130 + 125 * clamp(2 * t), 170, 'D', C.blue) +
      ball(430 - 125 * clamp(2 * t), 170, 'T', C.green)
  );
  body += visible(
    s.reacted,
    ball(280 - 45 * q, 170, 'He-4', C.purple, 30) + ball(330 + 180 * q, 170, 'n', C.green, 14)
  );
  body +=
    text(280, 277, 'A: 2 + 3 = 4 + 1; Z: 1 + 1 = 2 + 0', 18) +
    text(718, 79, 'D + T → He-4 + n', 21) +
    readout(600, 139, 'Q (MeV)', s.q, 2, 1) +
    readout(600, 202, 'K He-4', s.alphaK, 1, 2) +
    readout(600, 265, 'K n', s.neutronK, 2, 2);
  return panel(
    'Deuterium–tritium fusion releases binding energy',
    body,
    'Q ≈ 17.6 MeV, negligible input kinetic energy. Opposite product momenta divide kinetic energy in inverse proportion to masses, approximated by A: about 3.5 and 14.1 MeV. Positions are schematic.'
  );
}
function coulombScene(t) {
  const s = coulombState(t),
    x = r => 100 + 86 * r,
    y = v => 290 - 180 * v;
  let body =
    plotAxes('Separation (normalized)', 'Energy / conserved total energy') +
    path(
      sample(q => {
        const r = 1 + 4 * q;
        return [x(r), y(1 / r)];
      }),
      C.red
    ) +
    line(85, y(1), 550, y(1), C.guide, 1, '5 4') +
    dot(x(s.r), y(s.potential), 7, C.red) +
    dot(x(s.r), y(1), 5, C.blue) +
    line(x(s.r), y(1), x(s.r), y(s.potential), C.blue, 4);
  body +=
    readout(600, 110, 'U / E', s.potential, 1, 2) +
    readout(600, 170, 'K / E', s.kinetic, 1, 2) +
    text(716, 232, 'Classical turning point: K = 0', 17) +
    text(716, 280, 'U + K = E', 20);
  return panel(
    'Coulomb repulsion converts approach kinetic energy into potential',
    body,
    'Classical radial approach and return with U ∝ 1/r, stopping at U = E. The cursor sweeps separation, not equal times. Fusion below a barrier additionally requires quantum tunneling.'
  );
}
function fissionScene(t) {
  const absorbed = t >= 0.25,
    split = t >= 0.55,
    q = clamp((t - 0.55) / 0.45);
  let body =
    visible(!absorbed, ball(115 + 210 * clamp(t / 0.25), 160, 'n', C.green, 13)) +
    visible(!split, ball(325, 160, 'U', C.purple, 43));
  body +=
    visible(!absorbed, text(325, 228, 'U-235 + n', 20)) +
    visible(absorbed && !split, text(325, 228, 'Excited U-236', 20));
  body += visible(
    split,
    ball(280 - 85 * q, 160, 'Ba-141', C.blue, 34) + ball(370 + 100 * q, 160, 'Kr-92', C.red, 29)
  );
  for (let i = 0; i < 3; i++) {
    const a = [-1.8, -0.9, 1.2][i];
    body += visible(
      split,
      ball(325 + (65 + 70 * q) * Math.cos(a), 160 + (65 + 70 * q) * Math.sin(a), 'n', C.green, 12)
    );
  }
  body +=
    text(325, 310, 'One possible fission channel', 18) +
    text(716, 98, 'U-235 + n → Ba-141 + Kr-92 + 3n', 16) +
    text(716, 166, 'A: 235 + 1 = 141 + 92 + 3', 18) +
    text(716, 227, 'Z: 92 = 56 + 36', 20) +
    text(716, 287, 'Products vary between fissions', 17);
  return panel(
    'Neutron absorption can lead to fission and additional neutrons',
    body,
    'A schematic sequence, not a calculated nuclear shape or fragment trajectory. This channel conserves A and Z; fragment kinetic energy, photons and later beta decays are omitted.'
  );
}
function chainScene(t) {
  const x = g => 85 + 74 * g,
    y = n => 290 - (180 * n) / 12;
  let body = plotAxes('Neutron generation', 'Expected population / initial population');
  for (const [k, color] of [
    [0.7, C.blue],
    [1, C.green],
    [1.5, C.red],
  ]) {
    body += path(
      Array.from({ length: 7 }, (_, g) => [x(g), y(k ** g)]),
      color
    );
    const s = chainState(t, k);
    for (let g = 0; g <= 6; g++)
      body += visible(s.generation === g, dot(x(g), y(k ** g), 6, color));
  }
  for (let g = 0; g <= 6; g++) body += text(x(g), 307, String(g), 13);
  for (const n of [0, 6, 12]) body += text(65, y(n) + 5, String(n), 13);
  body +=
    text(717, 106, 'k = 0.7: decreases', 20, C.blue) +
    text(717, 177, 'k = 1: steady mean', 20, C.green) +
    text(717, 248, 'k = 1.5: grows', 20, C.red);
  return panel(
    'The effective multiplication factor determines a chain reaction’s trend',
    body,
    'Expected populations obey N(g) = N0 k^g; dots advance in discrete generations. Leakage and capture are included in k. This mean model omits fluctuations, delayed neutrons and feedback.'
  );
}
function cyclotronScene(t) {
  const s = cyclotronState(t),
    map = u => [300 + 26 * u.x, 210 - 26 * u.y];
  let body =
    rect(190, 75, 108, 225, C.fill, C.grid) +
    rect(302, 75, 108, 225, C.fill, C.grid) +
    path(
      sample(q => map(cyclotronState(q)), 640),
      C.guide,
      'none',
      1.3
    ) +
    dot(...map(s), 6, C.red);
  body +=
    arrow(300 - 28 * s.side, 311, 56 * s.side, 0, C.blue) +
    text(300, 65, 'E reverses each half-turn; B into page', 17) +
    readout(600, 114, 'K / qΔV', s.kinetic, 1, 0) +
    readout(600, 174, 'r (units)', s.radius, 1, 2) +
    text(715, 237, 'r = mv / qB', 21) +
    text(715, 287, 'f = qB / (2πm): constant', 18);
  return panel(
    'A cyclotron adds energy at the gap and bends the path inside the dees',
    body,
    'Nonrelativistic thin-gap model: m = qB = qΔV = 1. Equal intervals are equal half-turns; energy changes only at the gap. Relativistic loss of synchronism is excluded.'
  );
}
function synchrotronScene(t) {
  const s = synchrotronState(t),
    cx = 295,
    cy = 190,
    r = 104;
  let body =
    circle(cx, cy, r, C.blue) +
    rect(cx - 18, cy - r - 12, 36, 24, C.gold, 'none') +
    dot(cx + r * Math.cos(s.phase), cy - r * Math.sin(s.phase), 7, C.red) +
    text(cx, cy + 6, 'Fixed orbit radius', 20);
  body +=
    readout(600, 98, 'γ', s.gamma, 1, 2) +
    readout(600, 153, 'p / mc', s.momentum, 1, 2) +
    readout(600, 208, 'B / B0', s.field, 1, 2) +
    readout(600, 263, 'v / c', s.beta, 1, 2) +
    text(295, 318, 'B0 = mc / (qR); p = qBR', 17);
  return panel(
    'A synchrotron raises its magnetic field as momentum increases',
    body,
    'Fixed R, with relativistic p = mc√(γ² − 1). The field follows p; revolution frequency follows v. A continuous ramp approximates many RF kicks; the gold marker locates an RF cavity.'
  );
}
function annihilationScene(t) {
  const s = annihilationState(t),
    inQ = clamp(2 * t),
    outQ = clamp(2 * t - 1);
  let body =
    visible(
      !s.emitted,
      ball(110 + 190 * inQ, 180, 'e−', C.blue, 22) + ball(490 - 190 * inQ, 180, 'e+', C.red, 22)
    ) + visible(s.emitted, wave(230 - 145 * outQ, 180, 55) + wave(315 + 145 * outQ, 180, 55));
  body +=
    text(300, 283, 'Equal, opposite momenta in the center-of-momentum frame', 16) +
    readout(600, 101, 'K each (keV)', s.kinetic, 3, 0) +
    readout(600, 160, 'Eγ (keV)', s.photon, 3, 1) +
    text(720, 227, '2(mc² + K) = 2Eγ', 20) +
    text(720, 281, 'Total momentum = 0', 19);
  return panel(
    'Electron–positron annihilation produces two opposite photons',
    body,
    'A two-photon channel with 100 keV input kinetic energy per particle in the center-of-momentum frame. Each photon has about 611 keV; 511 keV applies when initial kinetic energy is negligible.'
  );
}
function quarkScene(t) {
  const stage = Math.min(3, Math.floor(4 * t));
  let body = '';
  hadrons.forEach((h, i) => {
    let group = text(310, 81, h.label, 22);
    h.quarks.forEach((q, j) => {
      const x = 190 + 120 * j;
      group +=
        ball(x, 166, q, C.purple, 30) +
        text(x, 228, `${h.thirds[j] > 0 ? '+' : '−'}${Math.abs(h.thirds[j])}/3 e`, 21);
    });
    group +=
      text(715, 147, `Total charge: ${h.charge > 0 ? '+' : ''}${h.charge} e`, 25) +
      text(715, 213, h.quarks.length === 3 ? 'Three valence quarks' : 'Quark + antiquark', 20);
    body += visible(stage === i, group);
  });
  body += text(450, 296, 'Antiquarks have the opposite electric charge to their quarks', 19);
  return panel(
    'Valence-quark charges add to the observed hadron charge',
    body,
    'Examples change discretely, not by transmutation. Positions and purple circles identify valence content, not quark paths, color charge or spin structure.'
  );
}
function probeScene(t) {
  const s = probeState(t),
    lambdaPixels = Math.max(8, Math.min(150, 100 * s.wavelength));
  let body =
    circle(330, 170, 65, C.guide) +
    text(330, 265, 'Reference radius: 1 fm', 18) +
    path(
      sample(q => [85 + 480 * q, 165 + 13 * Math.sin((2 * Math.PI * 480 * q) / lambdaPixels)], 600),
      C.blue
    );
  body +=
    readout(600, 101, 'K (MeV)', s.kinetic, 6, 0) +
    readout(600, 169, 'λ (fm)', s.wavelength, 2, 3) +
    text(720, 230, 'λ = h / p', 22) +
    text(720, 282, 'More momentum → shorter λ', 18);
  return panel(
    'Higher-energy electrons provide shorter probe wavelengths',
    body,
    'Relativistic momentum sets λ = h/p. Wavelength drawing is clipped at both display limits; readouts retain the physical value. Scattering resolution also depends on momentum transfer.'
  );
}
function expansionScene(t) {
  const s = expansionState(t),
    cx = 285,
    cy = 180;
  let body = '';
  for (let i = -2; i <= 2; i++)
    for (let j = -1; j <= 1; j++) {
      const dx = i * 53 * s.scale,
        dy = j * 49 * s.scale;
      body +=
        dot(cx + dx, cy + dy, 7, i === 0 && j === 0 ? C.red : C.blue) +
        visible(i !== 0 || j !== 0, arrow(cx + dx, cy + dy, dx * 0.12, dy * 0.12, C.guide, 1));
    }
  body +=
    readout(600, 101, 'a / a emit', s.scale, 1, 2) +
    readout(600, 165, 'Redshift z', s.redshift, 1, 2) +
    path(
      sample(q => [615 + 210 * q, 210 + 6 * Math.sin((2 * Math.PI * 210 * q) / (24 * s.scale))]),
      C.red
    ) +
    text(720, 253, 'D = a χ; v = H D', 22) +
    text(720, 299, '1 + z = a obs / a emit', 19) +
    text(285, 313, 'Fixed galaxy sizes; growing unbound separations', 17);
  return panel(
    'Expansion stretches galaxy separations and photon wavelengths',
    body,
    'Fixed comoving positions, scale factor 1 → 2. Arrows show recession with common H; the wave shows wavelength stretching. No cosmic age scale or physical expansion center is implied.'
  );
}
function parallaxScene(t) {
  const s = parallaxState(t),
    ex = 285 + 95 * s.x,
    ey = 248 - 22 * s.y;
  let body =
    path(
      sample(q => [285 + 95 * Math.cos(2 * Math.PI * q), 248 - 22 * Math.sin(2 * Math.PI * q)]),
      C.guide
    ) +
    line(ex, ey, 285, 76, C.blue, 1.5) +
    dot(285, 248, 10, C.gold) +
    dot(285, 76, 8, C.red) +
    dot(ex, ey, 7, C.blue);
  body +=
    text(330, 82, 'Star', 16) +
    text(285, 299, 'Earth: 1 AU orbital radius', 18) +
    readout(600, 106, 'd (pc)', s.distancePC, 1, 1) +
    readout(600, 167, 'p (arcsec)', s.parallax, 1, 3) +
    readout(600, 228, 'Offset (″)', s.apparent, 1, 3, true) +
    text(720, 284, 'Six months: opposite offsets', 18);
  return panel(
    'Earth’s annual motion changes the apparent direction to a nearby star',
    body,
    'A star at 2 pc has parallax p ≈ 0.5 arcsec. The orbit is drawn in perspective; distance and angles are enlarged. Parallax p is the half-angle; opposite extremes differ by about 2p.'
  );
}
function elevatorScene(t) {
  const s = elevatorState(t),
    x = 80 + 320 * s.x,
    shift = 1700 * s.lift;
  let body =
    text(255, 65, 'Initial inertial frame', 18) +
    text(665, 65, 'Coordinates attached to the room', 18);
  body +=
    rect(70, 115 - shift, 340, 185, 'none', C.guide) +
    line(80, 160, 400, 160, C.grid, 1, '4 4') +
    dot(x, 160, 6, C.red) +
    arrow(450, 180, 0, -55, C.blue);
  body +=
    rect(490, 115, 340, 185, 'none', C.guide) +
    line(500, 160, 820, 160, C.grid, 1, '4 4') +
    path(
      sample(q => [500 + 320 * q, 160 + (1700 * 0.08 * q ** 2) / 2]),
      C.red,
      'none',
      1.5
    ) +
    dot(500 + 320 * s.x, 160 + shift, 6, C.red);
  return panel(
    'An accelerating room rises while a light pulse crosses it',
    body,
    'Local approximation: Δy = a t²/2 and x = ct. The same pulse is straight in the initial inertial frame and curves downward in room coordinates. Vertical displacement is enlarged relative to width.'
  );
}
function deflectionScene(t) {
  const s = deflectionState(t),
    b = 24 + 23 * s.impact,
    bend = 82 / s.impact,
    y = 242 - b;
  let body =
    dot(295, 242, 22, C.gold) +
    text(295, 292, 'Sun', 18) +
    path(
      [
        [80, y],
        [295, y],
        [535, y + bend],
      ],
      C.blue,
      'none',
      3
    ) +
    line(295, y, 535, y, C.guide, 1, '5 4') +
    arrow(295, 242, 0, -b, C.red, 1.5) +
    text(278, 242 - b / 2, 'b', 17, C.red);
  body +=
    readout(600, 109, 'b / R Sun', s.impact, 1, 2) +
    readout(600, 183, 'Angle (″)', s.angle, 1, 3) +
    text(719, 255, 'α = 4GM / (bc²)', 22);
  return panel(
    'Starlight passing closer to the Sun is deflected more',
    body,
    'Weak-field general relativity gives about 1.75 arcsec at the solar limb. The broken ray is schematic with exaggerated bending; it is not a numerical geodesic or a drawing to scale.'
  );
}
function superconductingScene(t) {
  const s = superconductingState(t),
    x = temp => 85 + 1125 * (temp - 4),
    y = r => 288 - 170 * r;
  let body =
    plotAxes('Temperature (K)', 'Idealized R / normal-state R') +
    path(
      [
        [x(4), y(0)],
        [x(4.2), y(0)],
        [x(4.2), y(1)],
        [x(4.4), y(1)],
      ],
      C.blue
    ) +
    visible(s.resistance === 0, dot(x(s.temperature), y(0), 7, C.red)) +
    visible(s.resistance !== 0, dot(x(s.temperature), y(1), 7, C.red));
  for (const temp of [4, 4.1, 4.2, 4.3, 4.4]) body += text(x(temp), 306, temp.toFixed(1), 13);
  body +=
    readout(600, 112, 'T (K)', s.temperature, 1, 2) +
    visible(s.resistance === 0, text(720, 199, 'Superconducting: R = 0', 20, C.green)) +
    visible(s.resistance !== 0, text(720, 199, 'Normal state: R > 0', 20, C.red)) +
    text(720, 271, 'Mercury: Tc ≈ 4.2 K', 20);
  return panel(
    'Cooling below the critical temperature removes electrical resistance',
    body,
    'An idealized step illustrates mercury, not a fit to the transition width or normal-state resistance. Current and magnetic field are assumed below their critical limits.'
  );
}

const scenes = {
  Figure_31_04_02: alphaScene,
  Figure_31_04_04: betaScene,
  Figure_31_05_01: decayScene,
  Figure_31_06_03: bindingScene,
  Figure_31_06_04: forceScene,
  Figure_31_07_03: tunnelScene,
  Figure_32_05_02: fusionScene,
  Figure_32_05_03: coulombScene,
  Figure_32_06_02: fissionScene,
  Figure_32_06_03: chainScene,
  Figure_33_03_02: cyclotronScene,
  Figure_33_03_03: synchrotronScene,
  Figure_33_04_02: annihilationScene,
  Figure_33_05_01: quarkScene,
  Figure_33_05_03: probeScene,
  Figure_34_01_05: expansionScene,
  Figure_34_01_09: parallaxScene,
  Figure_34_02_01: elevatorScene,
  Figure_34_02_02: deflectionScene,
  Figure_34_06_01: superconductingScene,
};
export const animationNames31to34 = Object.keys(scenes);
export function animateFigure31to34(name, svg) {
  return scenes[name] ? appendAnimation(svg, scenes[name], opts) : svg;
}
