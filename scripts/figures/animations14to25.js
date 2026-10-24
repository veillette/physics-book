/** Eleven animated companions selected from the chapter 14–25 review. */
import {
  C,
  dot,
  line,
  rect,
  text,
  path,
  arrow,
  visible,
  panel,
  appendAnimation,
} from './animation-svg.js';
import {
  wallProbe,
  heatPumpEnergy,
  entropyTransfer,
  interferenceState,
  coulombPair,
  pointEquipotential,
  uniformEquipotential,
  electronCharge,
  carrierCurrent,
  wireGeometry,
  resistiveAC,
  batteryLoad,
  spectrumState,
} from './animation-models14to25.js';

// Fixed glyph structure lets SMIL animate numerical readouts without scripts.
// Leading zeroes keep the display width constant; digits switch without overlap.
function number(x, y, value, integers = 2, decimals = 1, signed = false) {
  const digits = Math.round(Math.abs(value) * 10 ** decimals)
    .toString()
    .padStart(integers + decimals, '0');
  let result = '',
    offset = 0;
  if (signed) {
    result += visible(value >= 0, text(x, y, '+', 19));
    result += visible(value < 0, text(x, y, '−', 19));
    offset += 13;
  }
  for (let i = 0; i < integers + decimals; i += 1) {
    if (i === integers && decimals) {
      result += text(x + offset, y, '.', 19);
      offset += 7;
    }
    for (let digit = 0; digit < 10; digit += 1) {
      result += visible(Number(digits[i]) === digit, text(x + offset, y, digit, 19));
    }
    offset += 12;
  }
  return result;
}
const points = fn => Array.from({ length: 121 }, (_, i) => fn(i / 120));
const readout = (x, y, label, value, integers = 2, decimals = 1, signed = false) =>
  text(x, y, label, 17, C.guide, 'start') + number(x + 115, y, value, integers, decimals, signed);

function wallScene(t) {
  const s = wallProbe(t),
    { wall } = s;
  const width = wall.points.at(-1)[0],
    sx = x => 85 + (630 * x) / width;
  const sy = temperature => 285 - 8 * temperature;
  const colors = ['#f3ead5', '#e6f1f7', '#e8b6a8'];
  let body = text(400, 65, 'Steady conduction: equal heat flux in every layer', 19);
  wall.layers.forEach((layer, i) => {
    const start = wall.points[i][0],
      end = wall.points[i + 1][0];
    body += rect(sx(start), 92, sx(end) - sx(start), 204, colors[i], C.grid);
    body += text((sx(start) + sx(end)) / 2, 85, layer.name, 14);
    body += arrow((sx(start) + sx(end)) / 2 - 14, 107, 28, 0, C.red);
  });
  body += path(
    wall.points.map(([x, temperature]) => [sx(x), sy(temperature)]),
    C.red,
    'none',
    3
  );
  body += line(sx(s.x), 115, sx(s.x), 296, C.blue, 2, '5 4');
  body += dot(sx(s.x), sy(s.temperature), 7, C.blue);
  body += text(48, sy(20) + 5, '20°C', 15) + text(48, sy(0) + 5, '0°C', 15);
  body += text(795, 143, 'Probe T (°C)', 17) + number(764, 175, s.temperature);
  body += text(795, 228, 'Flux (W/m²)', 17) + number(764, 260, s.flux);
  return panel(
    'Temperature through a composite wall',
    body,
    'The probe follows the piecewise linear temperature profile. Low conductivity produces a steeper gradient; heat flux is constant.'
  );
}

function heatPumpScene(t) {
  const s = heatPumpEnergy(t);
  let body = rect(75, 100, 160, 85, '#e6f1f7') + text(155, 136, 'Cold reservoir', 18);
  body += rect(345, 100, 160, 85, '#edf2e9') + text(425, 136, 'Heat pump', 18);
  body += rect(615, 100, 190, 85, '#fbe7df') + text(710, 136, 'Warm reservoir', 18);
  body += arrow(235, 155, 110, 0, C.blue, 5) + arrow(505, 155, 110, 0, C.red, 6);
  body += arrow(425, 239, 0, -54, C.green, 4) + text(425, 266, 'Electrical work W', 17);
  body += text(155, 215, 'Q cold (J)', 17) + number(131, 247, s.cold, 3, 0);
  body += number(407, 298, s.work, 3, 0);
  body += text(710, 215, 'Q hot (J)', 17) + number(686, 247, s.hot, 3, 0);
  body += text(450, 66, 'Q hot = Q cold + W', 22);
  return panel(
    'Heat-pump energy accounting',
    body,
    'Illustrative cycle: 300 J transferred from the cold side plus 100 J of work delivers 400 J. Heating COP = 4; energy is conserved.'
  );
}

function entropyScene(t) {
  const s = entropyTransfer(t);
  let body = text(200, 74, 'Heat transferred Q (J)', 18) + number(177, 106, s.heat, 4, 0);
  body += rect(85, 135, 230, 54, '#fbe7df') + text(200, 168, 'Hot reservoir: 600 K', 17);
  body += arrow(200, 195, 0, 43, C.red, 5);
  body += rect(85, 246, 230, 54, '#e6f1f7') + text(200, 279, 'Cold reservoir: 250 K', 17);
  body += text(620, 67, 'Entropy change (J/K)', 18);
  body += line(535, 83, 535, 274, C.guide, 1, '4 4');
  const rows = [
    ['Hot', s.hot, C.red],
    ['Cold', s.cold, C.blue],
    ['Total', s.total, C.green],
  ];
  rows.forEach(([label, value, color], i) => {
    const y = 109 + i * 69;
    body += text(400, y + 7, label, 17);
    body += rect(535 + Math.min(0, value) * 12, y - 15, Math.abs(value) * 12, 24, color, 'none');
    body += number(773, y + 7, value, 2, 2, true);
  });
  body += text(619, 301, 'ΔS hot = −Q/600;  ΔS cold = Q/250', 17);
  return panel(
    'Entropy rises when heat flows between unequal temperatures',
    body,
    'Equal heat leaves the hot reservoir and enters the cold one. The cold reservoir gains more entropy than the hot one loses.'
  );
}

function interferenceScene(t) {
  const phase = 2 * Math.PI * t;
  let body = text(330, 63, 'Fixed-instant snapshots; equal wavelength', 17);
  const rows = [
    [110, C.blue, 'Wave 1', 'first'],
    [185, C.red, 'Wave 2', 'second'],
    [267, C.purple, 'Sum', 'sum'],
  ];
  rows.forEach(([y, color, label, key]) => {
    body += line(120, y, 600, y, C.grid, 1);
    body += text(70, y + 5, label, 16);
    body += path(
      points(p => [120 + 480 * p, y - 22 * interferenceState(p * 4 * Math.PI, phase)[key]]),
      color,
      'none',
      3
    );
  });
  body += text(747, 110, 'Phase δ (degrees)', 17) + number(717, 143, 360 * t, 3, 0);
  body +=
    text(747, 206, 'Sum amplitude / A', 17) +
    number(725, 239, interferenceState(0, phase).amplitude, 1, 2);
  return panel(
    'Interference changes with relative phase',
    body,
    'The two sinusoidal waves share a frequency and wavelength. Varying the phase parameter gives a sum amplitude of 2A |cos(δ/2)|.'
  );
}

function coulombScene(t) {
  let body = text(245, 69, 'Like charges repel', 19) + text(655, 69, 'Unlike charges attract', 19);
  for (const [i, unlike] of [false, true].entries()) {
    const s = coulombPair(t, unlike),
      left = 145 + 420 * i,
      right = left + s.r * 1400;
    body += dot(left, 177, 16, C.red) + text(left, 183, '+', 21, '#ffffff');
    body +=
      dot(right, 177, 16, unlike ? C.blue : C.red) +
      text(right, 183, unlike ? '−' : '+', 21, '#ffffff');
    body += arrow(left, 128, s.leftForce * 1e6 * 42, 0, C.green);
    body += arrow(right, 128, s.rightForce * 1e6 * 42, 0, C.green);
    body += line(left, 214, right, 214, C.guide, 1);
    body += text((left + right) / 2, 238, 'r', 17);
  }
  body += readout(90, 293, 'r (cm)', coulombPair(t).r * 100);
  body += readout(465, 293, '|F| (μN)', Math.abs(coulombPair(t).rightForce) * 1e6, 1, 2);
  return panel(
    'Coulomb force falls with the square of separation',
    body,
    'Each charge has magnitude 1 nC. Doubling r from 8 to 16 cm divides both force magnitudes by four; the forces remain equal and opposite.'
  );
}

function pointScene(t) {
  const s = pointEquipotential(t),
    cx = 250,
    cy = 181,
    scale = 550;
  const x = cx + scale * s.x,
    y = cy - scale * s.y;
  let body = '';
  for (const r of [0.1, 0.15, 0.2])
    body += `<circle cx="${cx}" cy="${cy}" r="${scale * r}" fill="none" stroke="${C.grid}" stroke-width="2"/>`;
  body += dot(cx, cy, 12, C.red) + text(cx, cy + 6, '+', 20, '#ffffff');
  body += path(
    points(p => {
      const q = pointEquipotential(p);
      return [cx + scale * q.x, cy - scale * q.y];
    }),
    C.guide,
    'none',
    1
  );
  body += dot(x, y, 7, C.blue);
  body += arrow(
    x,
    y,
    24 * (0.1 / s.r) ** 2 * Math.cos(s.theta),
    -24 * (0.1 / s.r) ** 2 * Math.sin(s.theta),
    C.red
  );
  body += readout(465, 106, 'r (cm)', 100 * s.r);
  body += readout(465, 164, 'V (V)', s.potential);
  body += readout(465, 222, 'W elec (μJ)', s.work, 1, 2, true);
  body += text(625, 280, 'kQ = 1 V·m;  probe q = +1 μC', 17);
  return panel(
    'Work along and across point-charge equipotentials',
    body,
    'An imposed probe path first circles at constant potential, then moves radially outward. Electric work is −qΔV; tangential motion does no work.'
  );
}

function uniformScene(t) {
  const s = uniformEquipotential(t),
    x = 95 + 1500 * s.x,
    y = 260 - (125 * s.y) / 0.1;
  let body = line(95, 80, 95, 288, C.red, 7) + line(395, 80, 395, 288, C.blue, 7);
  body += text(95, 64, '100 V', 16) + text(395, 64, '0 V', 16);
  for (let i = 1; i < 4; i += 1) body += line(95 + i * 75, 88, 95 + i * 75, 285, C.grid, 2, '5 4');
  for (const yy of [111, 207, 276]) body += arrow(115, yy, 260, 0, C.red, 1.5);
  body += path(
    [
      [170, 260],
      [170, 135],
      [320, 135],
    ],
    C.guide,
    'none',
    2
  );
  body += dot(x, y, 7, C.blue);
  body += readout(465, 111, 'V (V)', s.potential);
  body += readout(465, 174, 'W elec (μJ)', s.work, 2, 1, true);
  body += text(637, 239, 'E = 500 V/m;  q = +1 μC', 17);
  body += text(637, 276, 'Plate separation = 0.20 m', 17);
  return panel(
    'Electric work between parallel plates',
    body,
    'The imposed probe first moves along a vertical equipotential, then along the field. V falls from 75 to 25 V and electric work rises to +50 μJ.'
  );
}

function carrierRow(t, y, positive) {
  let body = rect(85, y - 25, 475, 50, C.fill, C.guide);
  for (let i = 0; i < 7; i += 1) {
    const phase = ((positive ? t : 1 - t) + i / 7) % 1;
    const x = 85 + 475 * phase;
    body += visible(
      phase > 0.04 && phase < 0.96,
      dot(x, y, 9, positive ? C.red : C.blue) + text(x, y + 5, positive ? '+' : '−', 16, '#ffffff')
    );
  }
  body += line(323, y - 36, 323, y + 36, C.guide, 2, '5 4');
  body += arrow(383, y - 44, positive ? 70 : -70, 0, C.blue);
  body += text(623, y + 6, positive ? 'Positive carriers' : 'Electrons', 17, C.ink, 'start');
  body += arrow(665, y - 30, 100, 0, C.green) + text(785, y - 25, 'I', 19);
  return body;
}

function currentDirectionScene(t) {
  const body =
    carrierRow(t, 132, true) +
    carrierRow(t, 259, false) +
    text(324, 64, 'Blue arrows: carrier drift; green arrows: conventional current', 16) +
    text(708, 170, 'q > 0, v drift > 0', 16) +
    text(708, 297, 'q < 0, v drift < 0', 16);
  return panel(
    'Carrier drift and conventional current',
    body,
    'I = nqAv drift, using signed q and velocity. Positive carriers moving right and electrons moving left both give current to the right. Drift is enlarged.'
  );
}

function currentCountingScene(t) {
  const n = 8.5e28,
    area = 1e-6,
    speed = 2 / (n * electronCharge * area);
  const current = carrierCurrent(n, electronCharge, area, speed);
  const body =
    carrierRow(t, 168, true) +
    text(324, 85, 'Charge crossing the dashed area: Q = It', 19) +
    readout(80, 262, 'Time (s)', t, 1, 2) +
    readout(447, 262, 'Charge (C)', current * t, 1, 2) +
    text(450, 307, 'I = 2.00 A; n = 8.5 × 10²⁸ m⁻³; A = 1 mm²; v drift ≈ 0.147 mm/s', 16);
  return panel(
    'Counting charge through a wire cross section',
    body,
    'Each dot represents many positive carriers; displayed drift is enlarged. During 1 s, 2 C crosses the area. This is carrier transport, not signal speed.'
  );
}

function resistanceScene(t) {
  const s = wireGeometry(t),
    length = 180 * s.length,
    radius = 23 * Math.sqrt(s.area / 1e-6);
  let body = rect(90, 177 - radius, length, 2 * radius, C.fill, C.blue);
  body += `<ellipse cx="${90 + length}" cy="177" rx="12" ry="${radius}" fill="#c9e3f2" stroke="${C.blue}"/>`;
  body += line(90, 244, 90 + length, 244, C.guide, 1) + text(90 + length / 2, 272, 'Length L', 17);
  body += text(300, 85, 'First increase L; then increase cross-sectional A', 17);
  body += readout(550, 110, 'L (m)', s.length, 1, 2);
  body += readout(550, 159, 'A (mm²)', s.area * 1e6, 1, 2);
  body += readout(550, 208, 'R (Ω)', s.resistance, 1, 2);
  body += readout(550, 257, 'I (A)', s.current, 1, 2);
  body += text(450, 312, 'R = ρL/A;  I = V/R;  ρ = 1 μΩ·m;  V = 5 V', 18);
  return panel(
    'Resistance changes with wire geometry',
    body,
    'Material, temperature, and applied voltage stay fixed. Doubling L doubles R; then doubling A halves R. Radius scales with the square root of area.'
  );
}

function powerScene(t) {
  const time = 2 * t,
    state = resistiveAC(time),
    left = 100,
    width = 460;
  let body = '';
  for (const [y, scale, key, label, color] of [
    [104, 3, 'voltage', 'V', C.blue],
    [184, 15, 'current', 'I', C.green],
    [294, 3, 'power', 'P', C.red],
  ]) {
    body += line(left, y, left + width, y, C.grid, 1) + text(64, y + 5, label, 18);
    body += path(
      points(p => [left + width * p, y - scale * resistiveAC(2 * p)[key]]),
      color,
      'none',
      2.5
    );
    body += dot(left + width * t, y - scale * state[key], 5, color);
  }
  body += line(left, 264, left + width, 264, C.purple, 2, '5 4');
  body += line(left + width * t, 65, left + width * t, 300, C.guide, 1);
  body += readout(625, 106, 'V (V)', state.voltage, 2, 1, true);
  body += readout(625, 181, 'I (A)', state.current, 1, 2, true);
  body += readout(625, 251, 'P (W)', state.power, 2, 1);
  body += text(733, 292, 'Dashed: mean P = 10 W', 16);
  return panel(
    'AC power in a pure resistor',
    body,
    'V and I are in phase: peaks 10 V and 2 A, frequency 1 Hz. P = VI is nonnegative, oscillates at twice the frequency, and averages 10 W. Two seconds shown.'
  );
}

function batteryScene(t) {
  const s = batteryLoad(t);
  let body = path(
    [
      [110, 137],
      [110, 95],
      [373, 95],
      [373, 250],
      [110, 250],
      [110, 182],
    ],
    C.ink
  );
  body += line(90, 137, 130, 137, C.red, 4) + line(99, 153, 121, 153, C.red, 3);
  body += text(66, 185, '12 V', 16);
  body += rect(178, 82, 65, 26, '#fbe7df') + text(210, 64, 'r = 1 Ω', 17);
  body += rect(358, 143, 30, 64, '#e6f1f7') + text(426, 181, 'R load', 16);
  body += arrow(265, 95, 55, 0, C.green) + text(292, 78, 'I', 17);
  body += readout(80, 298, 'R (Ω)', s.load, 2, 1) + readout(310, 298, 'I (A)', s.current, 1, 2);
  body += rect(561, 263 - 12 * s.terminal, 86, 12 * s.terminal, C.blue, 'none');
  body += rect(561, 263 - 12 * s.emf, 86, 12 * s.loss, C.red, 'none');
  body += text(604, 90, 'ε = 12 V', 18) + text(697, 133, 'Ir', 17, C.red);
  body += text(715, 220, 'V terminal', 17, C.blue);
  body += number(680, 252, s.terminal, 2, 2) + text(759, 252, 'V', 17);
  return panel(
    'A real battery under a changing load',
    body,
    'I = ε/(R + r) and V terminal = ε − Ir. As load resistance rises, current and internal voltage loss fall; terminal voltage approaches the emf.'
  );
}

function scientific(x, y, value) {
  let exponent = Math.floor(Math.log10(value));
  if (value / 10 ** exponent >= 9.95) exponent += 1;
  const mantissa = value / 10 ** exponent;
  return (
    number(x, y, mantissa, 1, 1) +
    text(x + 77, y, '× 10', 19) +
    number(x + 114, y - 10, exponent, 2, 0, true)
  );
}
function spectrumScene(t) {
  const s = spectrumState(t);
  let body =
    text(450, 65, 'Frequency selector (logarithmic)', 18) + line(90, 110, 810, 110, C.guide, 2);
  for (const exponent of [6, 10, 14, 18, 22]) {
    const x = 90 + (720 * (exponent - 6)) / 16;
    body += line(x, 102, x, 119, C.guide, 2) + text(x, 142, `10^${exponent} Hz`, 15);
  }
  body += dot(90 + 720 * t, 110, 8, C.red);
  body += line(85, 232, 440, 232, C.grid, 1);
  body += path(
    points(p => [85 + 355 * p, 232 - 38 * Math.sin(4 * Math.PI * p - 8 * Math.PI * t)]),
    C.blue,
    'none',
    3
  );
  body += text(85, 294, '0', 16) + text(262, 294, '1', 16) + text(440, 294, '2', 16);
  body += text(264, 316, 'Distance / local wavelength', 15);
  body += text(525, 203, 'f (Hz)', 17, C.guide, 'start') + scientific(628, 203, s.frequency);
  body += text(525, 260, 'λ (m)', 17, C.guide, 'start') + scientific(628, 260, s.wavelength);
  return panel(
    'Wavelength and frequency across the spectrum',
    body,
    'In vacuum, fλ = 299,792,458 m/s. Each state rescales distance by λ and time by 1/f; the local wave clock is illustrative, not a fixed physical scale.'
  );
}

const scenes = {
  companion_14_composite_wall: wallScene,
  Figure_15_05_01: heatPumpScene,
  companion_15_entropy_budget: entropyScene,
  Figure_16_10_03: interferenceScene,
  Figure_18_03_02: coulombScene,
  Figure_19_04_01: pointScene,
  Figure_19_04_04: uniformScene,
  Figure_20_01_03: currentDirectionScene,
  Figure_20_01_06: currentCountingScene,
  Figure_20_03_01: resistanceScene,
  Figure_20_05_03: powerScene,
  Figure_21_02_05: batteryScene,
  Figure_24_03_01: spectrumScene,
};
export const animationNames14to25 = Object.keys(scenes);
export function animateFigure14to25(name, svg) {
  return scenes[name]
    ? appendAnimation(svg, scenes[name], { discreteAttributes: ['opacity'] })
    : svg;
}
