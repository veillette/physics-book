/** Three priority companions with unchanged original diagrams above them. */
import {
  C,
  dot,
  line,
  rect,
  text,
  path,
  visible,
  readout,
  panel,
  appendAnimation,
} from './animation-svg.js';
import {
  sample,
  heatingBreaks,
  heatingTemperatures,
  heatingState,
  tank,
  drainState,
  jetPoint,
  dampingValues,
  resonanceRatios,
  response,
  resonanceScale,
  resonanceState,
} from './animation-models-thermal-waves.js';
const options = { discreteAttributes: ['opacity', 'fill', 'stroke'] };

function heating(t) {
  const s = heatingState(t),
    x = q => 80 + (465 * q) / 750,
    y = temp => 287 - (temp + 20) * 1.35;
  let body =
    line(80, 287, 550, 287) +
    line(80, 287, 80, 83) +
    path(
      heatingBreaks.map((q, i) => [x(q), y(heatingTemperatures[i])]),
      C.blue,
      'none',
      3
    ) +
    dot(x(s.heat), y(s.temperature), 7, C.red);
  for (const q of [0, 200, 400, 600]) body += text(x(q), 303, String(q), 13);
  for (const temp of [-20, 0, 100])
    body += line(74, y(temp), 80, y(temp), C.ink, 1) + text(57, y(temp) + 5, String(temp), 14);
  body += text(310, 65, 'Temperature (°C)', 18) + text(320, 318, 'Heat added per gram (cal/g)', 15);
  const labels = [
    'Warming ice',
    'Melting: ice + water',
    'Warming liquid water',
    'Boiling: water + steam',
    'Warming steam',
  ];
  labels.forEach((label, i) => {
    body += visible(s.phase === i, text(722, 70, label, 19));
  });
  body +=
    readout(610, 116, 'Q/m (cal/g)', s.heat, 3, 1) +
    readout(610, 159, 'T (°C)', s.temperature, 3, 1, true) +
    text(730, 192, 'Mass fractions', 16, C.guide);
  for (const [i, [label, fraction, color]] of [
    ['Ice', s.ice, C.blue],
    ['Liquid', s.liquid, C.green],
    ['Vapor', s.vapor, C.red],
  ].entries()) {
    body +=
      text(632, 219 + i * 37, label, 15) +
      rect(666, 206 + i * 37, 166, 15, C.grid, 'none') +
      rect(666, 206 + i * 37, 166 * fraction, 15, color, 'none');
  }
  return panel(
    'Added heat changes phase while temperature stays on a plateau',
    body,
    'Book heat capacities and latent heats at about 1 atm. Playback gives each stage equal time, not equal heat input. Bars show mass fractions, not phase volumes; no heat loss is included.'
  );
}

function draining(t) {
  const s = drainState(t),
    floor = 310,
    scale = 85,
    outlet = floor - scale * tank.outletHeight,
    level = outlet - scale * s.head;
  let body =
    rect(90, level, 110, floor - level, C.fill, 'none') +
    line(90, 65, 90, floor, C.guide, 3) +
    line(90, floor, 200, floor, C.guide, 3) +
    line(200, 65, 200, outlet - 3, C.guide, 3) +
    line(200, outlet + 3, 200, floor, C.guide, 3) +
    line(90, level, 200, level, C.blue, 2);
  body +=
    line(65, floor, 550, floor, C.ink, 1.5) +
    visible(
      s.active,
      path(
        sample(q => {
          const p = jetPoint(s, q);
          return [200 + scale * p[0], floor - scale * p[1]];
        }, 60),
        C.blue,
        'none',
        3
      )
    );
  body +=
    text(340, 70, 'Open to atmosphere', 18) +
    text(145, 299, 'Water', 16, C.blue) +
    text(270, outlet - 15, 'Outlet', 16) +
    visible(!s.active, text(390, 215, 'Level reached outlet', 20));
  body +=
    readout(610, 93, 't (s)', s.time, 3, 1) +
    readout(610, 138, 'Head (m)', s.head, 1, 2) +
    readout(610, 183, 'v (m/s)', s.speed, 1, 2) +
    readout(610, 228, 'Q (L/s)', s.flow * 1000, 2, 2) +
    readout(610, 273, 'Out (L)', s.drained * 1000, 4, 0);
  return panel(
    'A draining tank loses head, so its jet slows and shortens',
    body,
    'Ideal quasi-steady flow: A = 0.50 m², outlet a = 0.0020 m², initial head 2 m. Outlet is 0.50 m above ground. No losses or air drag; water below the outlet remains. Model time is slowed.'
  );
}

function resonance(t) {
  const s = resonanceState(t),
    colors = [C.green, C.red, C.purple],
    x = r => 80 + 235 * r,
    y = a => 290 - (185 * a) / resonanceScale;
  let body =
    line(80, 290, 550, 290) +
    line(80, 290, 80, 85) +
    text(315, 65, 'Amplitude / (F0/k)', 18) +
    text(320, 320, 'Driving frequency / natural frequency', 16);
  for (const r of [0, 0.5, 1, 1.5, 2]) body += text(x(r), 307, String(r), 13);
  for (const a of [0, 5, 10]) body += text(62, y(a) + 5, String(a), 13);
  dampingValues.forEach((b, j) => {
    body += path(
      sample(q => [x(2 * q), y(response(2 * q, b).amplitude)], 240),
      colors[j],
      'none',
      2
    );
    resonanceRatios.forEach((r, i) => {
      body += visible(s.stage === i, dot(x(r), y(response(r, b).amplitude), 6, colors[j]));
    });
    const cx = 620 + 90 * j,
      cy = 210 + (58 * s.responses[j].position) / resonanceScale;
    body +=
      line(cx - 18, 105, cx + 18, 105, C.guide, 3) +
      path(
        sample(
          q => [
            cx + (q === 0 || q === 1 ? 0 : 7 * Math.sin(16 * Math.PI * q)),
            105 + (cy - 116) * q,
          ],
          32
        ),
        colors[j],
        'none',
        2
      ) +
      dot(cx, cy, 10, colors[j]) +
      text(cx, 298, `b = ${b}`, 16, colors[j]);
  });
  body +=
    text(716, 65, 'Same drive; different damping', 16) + readout(650, 93, 'f / f0', s.ratio, 1, 1);
  return panel(
    'The steady response grows near resonance and shrinks with damping',
    body,
    'Five separately settled states of x″ + b x′ + x = cos(rt). Each advances 2π/ω0 model seconds; the phase clock resets between examples. Settling transients are omitted.'
  );
}
const scenes = { Figure_12_03_01: draining, Figure_14_03_03: heating, Figure_16_08_03: resonance };
export const animationNamesThermalWaves = Object.keys(scenes);
export function animateThermalWaves(name, svg) {
  return scenes[name] ? appendAnimation(svg, scenes[name], options) : svg;
}
