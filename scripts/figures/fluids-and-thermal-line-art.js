/**
 * Remaining fluid schematics and thermal companion figures in chapters 11–15.
 * Physical curves, coin microstates, thermal resistances, and entropy changes
 * are computed here; no raster image is embedded in the generated SVGs.
 */
import { COLORS, Plot, Svg } from './svg.js';

const INK = COLORS.text;
const BLUE = COLORS.blue;
const RED = COLORS.red;
const PALE = '#edf4f8';
const WATER = '#dcecf5';
const GRAY = '#657382';

function label(s, x, y, value, o = {}) {
  s.text(x, y, value, { size: 20, math: false, ...o });
}
function title(s, value, subtitle) {
  label(s, s.width / 2, 28, value, { size: 26, weight: 'bold' });
  if (subtitle) label(s, s.width / 2, 65, subtitle, { size: 18, color: GRAY });
}
function dimension(s, x1, y1, x2, y2, value, { dx = 0, dy = -18 } = {}) {
  s.arrow(x1, y1, x2, y2, { width: 1.4, head: 8, start: true });
  const horizontal = Math.abs(x2 - x1) > Math.abs(y2 - y1);
  for (const [x, y] of [
    [x1, y1],
    [x2, y2],
  ]) {
    s.line(
      x - (horizontal ? 0 : 6),
      y - (horizontal ? 6 : 0),
      x + (horizontal ? 0 : 6),
      y + (horizontal ? 6 : 0)
    );
  }
  label(s, (x1 + x2) / 2 + dx, (y1 + y2) / 2 + dy, value, { size: 19 });
}
function vessel(s, x, y, w, h, level) {
  s.rect(x, level, w, y + h - level, { fill: WATER });
  s.polyline(
    [
      [x, y],
      [x, y + h],
      [x + w, y + h],
      [x + w, y],
    ],
    { color: GRAY, width: 3 }
  );
  s.line(x, level, x + w, level, { color: BLUE, width: 1.5 });
}
function pipe(s, points, { width = 18, fill = WATER } = {}) {
  s.polyline(points, { color: GRAY, width: width + 3 });
  s.polyline(points, { color: fill, width });
}

/** Spectral hemispherical exitance, MW m^-2 micrometer^-1; lambda is in nm. */
export function spectralExitance(wavelengthNm, temperature) {
  if (!(wavelengthNm > 0 && temperature > 0)) return 0;
  const h = 6.62607015e-34;
  const c = 299792458;
  const k = 1.380649e-23;
  const wavelength = wavelengthNm * 1e-9;
  return (
    ((2 * Math.PI * h * c ** 2) /
      (wavelength ** 5 * Math.expm1((h * c) / (wavelength * k * temperature)))) *
    1e-12
  );
}
export function microstates(coins = 5) {
  return Array.from({ length: coins + 1 }, (_, heads) =>
    Array.from({ length: 2 ** coins }, (_, mask) =>
      Array.from({ length: coins }, (_, bit) => (mask & (1 << bit) ? 'H' : 'T')).join('')
    ).filter(sequence => [...sequence].filter(face => face === 'H').length === heads)
  );
}
export function wallProfile(hot = 20, cold = 0) {
  // Series path through the insulation bay, excluding studs and surface films.
  const layers = [
    { name: 'Gypsum', thickness: 0.0125, k: 0.17 },
    { name: 'Insulation', thickness: 0.09, k: 0.04 },
    { name: 'Brick', thickness: 0.1, k: 0.72 },
  ];
  const resistance = layers.reduce((sum, layer) => sum + layer.thickness / layer.k, 0);
  const flux = (hot - cold) / resistance;
  let distance = 0;
  let temperature = hot;
  const points = [[distance, temperature]];
  for (const layer of layers) {
    distance += layer.thickness;
    temperature -= (flux * layer.thickness) / layer.k;
    points.push([distance, temperature]);
  }
  return { layers, resistance, flux, points };
}

function manometers() {
  const s = new Svg({
    width: 1080,
    height: 590,
    title: 'Three readings of an open-tube manometer',
    desc: 'Each U tube has gas pressure on the left and atmospheric pressure on the right. Equal pressures give equal liquid levels. Positive gauge pressure lowers the left surface; negative gauge pressure raises it. The same horizontal level in connected stationary liquid has the same pressure.',
  });
  title(
    s,
    'Read the difference between the liquid surfaces',
    'The gas connection is on the left; the right arm is open to the atmosphere.'
  );
  for (const [i, heading, left, right, equation] of [
    [0, '(a) Zero gauge pressure', 275, 275, 'P_{gas} = P_{atm}'],
    [1, '(b) Positive gauge pressure', 320, 230, 'P_{gas} = P_{atm} + ρgh'],
    [2, '(c) Negative gauge pressure', 230, 320, 'P_{gas} = P_{atm} − ρgh'],
  ]) {
    const x = i * 360;
    label(s, x + 180, 112, heading, { size: 21, weight: 'bold' });
    label(s, x + 102, 162, 'Gas: P_{gas}', { size: 18 });
    label(s, x + 252, 162, 'Open: P_{atm}', { size: 18 });
    const a = x + 102,
      b = x + 252;
    // Wide U-shaped liquid column and glass outlines, both open at the top.
    s.path(`M ${a} ${left} V 365 Q ${a} 425 ${a + 75} 425 Q ${b} 425 ${b} 365 V ${right}`, {
      color: WATER,
      width: 25,
    });
    for (const offset of [-15, 15]) {
      s.path(
        `M ${a + offset} 190 V 365 Q ${a + offset} ${425 - offset} ${a + 75} ${425 - offset} Q ${b - offset} ${425 - offset} ${b - offset} 365 V 190`,
        { color: GRAY, width: 2 }
      );
    }
    s.line(a - 13, left, a + 13, left, { color: BLUE, width: 2 });
    s.line(b - 13, right, b + 13, right, { color: BLUE, width: 2 });
    s.arrow(a, 194, a, Math.min(left - 14, 220), { width: 1.8 });
    s.arrow(b, 194, b, Math.min(right - 14, 220), { width: 1.8 });
    const level = Math.max(left, right);
    s.line(a - 25, level, b + 25, level, { color: GRAY, dash: '6 5' });
    if (left !== right)
      dimension(s, x + 306, Math.min(left, right), x + 306, level, 'h', { dx: 18, dy: 0 });
    label(s, x + 180, 474, equation, { size: 24 });
    label(
      s,
      x + 180,
      515,
      i === 0 ? 'P_{gauge} = 0' : i === 1 ? 'P_{gauge} = +ρgh' : 'P_{gauge} = −ρgh',
      {
        size: 22,
        color: BLUE,
      }
    );
  }
  label(s, 540, 563, 'Dashed lines mark equal pressure within the same connected liquid at rest.', {
    size: 20,
  });
  return s.render();
}

function hydraulicBrakes() {
  const s = new Svg({
    width: 1080,
    height: 700,
    title: 'Force multiplication in hydraulic brakes',
    desc: 'A 100 N pedal force acts at 0.20 m from a pivot. The master-cylinder pushrod acts 0.040 m from the pivot, producing 500 N. Master diameter 0.500 cm and slave diameter 2.50 cm give an area ratio of 25. Each of four identical slave cylinders produces 12500 N under the ideal model.',
  });
  title(
    s,
    'The lever and the fluid multiply force in two stages',
    'Ideal static model; line heights, areas, displacements, and force arrows are schematic.'
  );
  // Straight pedal lever; perpendicular moment arms have the stated 5:1 ratio.
  s.line(230, 142, 230, 382, { width: 7 });
  s.circle(230, 142, 8, { fill: INK });
  label(s, 230, 112, 'Pivot', { size: 19 });
  s.arrow(65, 382, 215, 382, { color: RED, width: 3 });
  label(s, 119, 346, '100 N', { color: RED, size: 24 });
  dimension(s, 290, 142, 290, 382, '0.20 m', { dx: 50, dy: 0 });
  dimension(s, 170, 142, 170, 190, '0.040 m', { dx: -60, dy: 0 });
  s.line(238, 190, 420, 190, { width: 7, color: GRAY });
  label(s, 410, 142, 'Master cylinder', { size: 22 });
  s.rect(420, 167, 145, 46, { fill: WATER, stroke: GRAY, width: 2 });
  s.line(438, 168, 438, 212, { color: INK, width: 7 });
  s.arrow(353, 236, 435, 236, { color: RED, width: 3 });
  label(s, 457, 270, 'F₁ = 500 N', { color: RED, size: 22 });
  label(s, 489, 309, 'd₁ = 0.500 cm', { size: 21 });
  pipe(s, [
    [565, 190],
    [625, 190],
    [625, 150],
    [625, 495],
  ]);
  for (const [i, yy] of [150, 265, 380, 495].entries()) {
    pipe(s, [
      [625, yy],
      [750, yy],
    ]);
    s.rect(750, yy - 26, 115, 52, { fill: WATER, stroke: GRAY, width: 2 });
    s.line(829, yy - 25, 829, yy + 25, { width: 7 });
    s.arrow(865, yy, 970, yy, { color: RED, width: 3 });
    label(s, 995, yy, `${i + 1}`, { size: 20 });
  }
  label(s, 823, 102, 'Four identical slave cylinders', { size: 21, weight: 'bold' });
  label(s, 823, 550, 'Each d₂ = 2.50 cm; each F₂ = 12,500 N', { size: 20 });
  label(s, 438, 442, 'Same transmitted', { size: 20, color: BLUE });
  label(s, 438, 472, 'pressure increment ΔP', { size: 20, color: BLUE });
  label(s, 540, 612, 'ΔP = F₁/A₁ = F₂/A₂       A₂/A₁ = (d₂/d₁)² = 25', { size: 26 });
  label(s, 540, 660, 'The force gain is balanced by smaller piston travel; energy is conserved.', {
    size: 21,
  });
  return s.render();
}

function apparentWeight() {
  const s = new Svg({
    width: 1000,
    height: 640,
    title: 'A submerged object has a smaller apparent weight',
    desc: 'Two spring balances support the same dense object. In air, tension equals weight with air buoyancy neglected. Submerged and not touching the beaker, the object has the same downward weight but also upward buoyancy, reducing the tension. A separate free-body diagram in each panel shows forces adding to zero.',
  });
  title(
    s,
    'Buoyancy reduces the balance reading',
    'Same object, same weight; equilibrium in both panels. Air buoyancy is neglected.'
  );
  for (const [x, wet] of [
    [0, false],
    [500, true],
  ]) {
    label(s, x + 250, 115, wet ? '(b) Completely submerged' : '(a) In air', {
      size: 23,
      weight: 'bold',
    });
    s.line(x + 70, 154, x + 280, 154, { width: 4 });
    s.rect(x + 138, 165, 74, 130, { stroke: GRAY, width: 2, rx: 8 });
    s.polyline(
      [
        [x + 175, 171],
        [x + 175, 183],
        ...Array.from({ length: 10 }, (_, k) => [x + 175 + (k % 2 ? 18 : -18), 190 + 8 * k]),
        [x + 175, 279],
      ],
      { width: 2 }
    );
    s.line(x + 175, 279, x + 175, 405, { width: 2 });
    if (wet) vessel(s, x + 60, 326, 230, 210, 360);
    s.circle(x + 175, 425, 24, { fill: '#eee7db', stroke: INK, width: 2 });
    s.line(x + 175, 295, x + 175, 401, { width: 2 });
    label(s, x + 371, 184, 'Force diagram', { size: 19 });
    s.circle(x + 365, 348, 6, { fill: INK });
    s.arrow(x + 365, 348, x + 365, 478, { color: RED, width: 3 });
    label(s, x + 390, 459, 'w', { size: 25, color: RED });
    s.arrow(x + 355, 348, x + 355, wet ? 270 : 218, { color: BLUE, width: 3 });
    label(s, x + 332, wet ? 260 : 207, wet ? 'T_{sub}' : 'T_{air}', { size: 22, color: BLUE });
    if (wet) {
      s.arrow(x + 380, 348, x + 380, 296, { color: COLORS.green, width: 3 });
      label(s, x + 412, 294, 'F_B', { size: 22, color: COLORS.green });
    }
    label(s, x + 250, 568, wet ? 'T_{sub} + F_B = w' : 'T_{air} = w', { size: 26 });
  }
  label(s, 500, 616, 'Apparent weight loss: T_{air} − T_{sub} = F_B = ρ_{fluid} g V_{displaced}', {
    size: 25,
  });
  return s.render();
}
function velocityProfiles() {
  const s = new Svg({
    width: 1000,
    height: 600,
    title: 'Uniform and parabolic velocity profiles in a tube',
    desc: 'Two vertical tube cross sections show upward flow. An ideal inviscid uniform-flow model has equal velocity arrows. Fully developed laminar flow of a Newtonian fluid in a circular tube has a parabolic profile with zero speed at both walls, maximum speed at the center, and mean speed equal to half the maximum. Both panels have the same mean speed.',
  });
  title(
    s,
    'Viscosity changes the velocity profile',
    'Upward flow; the two panels have the same mean speed v̄.'
  );
  for (const [cx, viscous] of [
    [250, false],
    [750, true],
  ]) {
    label(
      s,
      cx,
      116,
      viscous ? '(b) Fully developed laminar flow' : '(a) Ideal uniform-flow model',
      { size: 22, weight: 'bold' }
    );
    s.rect(cx - 160, 160, 320, 260, { fill: PALE });
    s.line(cx - 160, 160, cx - 160, 420, { width: 4 });
    s.line(cx + 160, 160, cx + 160, 420, { width: 4 });
    const tips = [];
    for (let j = -8; j <= 8; j += 1) {
      const u = j / 8;
      const length = viscous ? 180 * (1 - u * u) : 90;
      const x = cx + 160 * u;
      tips.push([x, 390 - length]);
      if (j % 2 === 0 && length > 0)
        s.arrow(x, 390, x, 390 - length, { color: BLUE, width: 2.5, head: 10 });
      if (viscous && Math.abs(j) === 8) s.circle(x, 390, 4, { fill: BLUE });
    }
    s.polyline(tips, { color: BLUE, width: 2, dash: '6 5' });
    s.arrow(cx - 200, 385, cx - 200, 220, { width: 2 });
    label(s, cx - 200, 190, 'Flow', { size: 18 });
    label(s, cx, 467, viscous ? 'v(r) = v_{max} [1 − (r/R)²]' : 'v(r) = v̄', { size: 26 });
    label(
      s,
      cx,
      510,
      viscous ? 'v(±R) = 0;   v̄ = v_{max}/2' : 'Uniform here is an idealized assumption.',
      { size: 20 }
    );
  }
  label(
    s,
    500,
    563,
    'Dashed curves join the arrow tips; r is signed distance from the center along the diameter.',
    { size: 19 }
  );
  return s.render();
}

function entrainmentDevices() {
  const s = new Svg({
    width: 1000,
    height: 900,
    title: 'Four examples of fluid entrainment',
    desc: 'Four labeled line drawings show a gas jet drawing air into a Bunsen burner, an air jet drawing liquid into an atomizer, a fast water stream drawing air through an aspirator side branch, and rising chimney gases drawing room air into a draft hood. Blue arrows mark primary flow and orange arrows mark entrained secondary flow. Chimney draft includes a buoyancy contribution.',
  });
  title(
    s,
    'A primary stream draws in a secondary fluid',
    'Blue: primary flow. Orange: entrained flow. Device geometries are schematic.'
  );
  s.line(500, 100, 500, 800, { color: '#c7d0d9' });
  s.line(35, 452, 965, 452, { color: '#c7d0d9' });
  label(s, 250, 120, '(a) Bunsen burner', { weight: 'bold', size: 23 });
  s.path('M205 185V300H190V337H230V385H270V337H310V300H295V185', { width: 2.5 });
  s.path('M220 185Q225 150 250 133Q275 154 280 185', { color: RED, width: 2 });
  s.arrow(250, 408, 250, 320, { color: BLUE, width: 3 });
  s.arrow(250, 288, 250, 196, { color: BLUE, width: 3 });
  s.arrow(110, 318, 221, 318, { color: COLORS.orange, width: 3 });
  s.arrow(390, 318, 280, 318, { color: COLORS.orange, width: 3 });
  label(s, 250, 430, 'Gas jet', { color: BLUE });
  label(s, 135, 285, 'Air', { color: COLORS.orange });
  label(s, 365, 285, 'Air', { color: COLORS.orange });
  label(s, 750, 120, '(b) Atomizer', { weight: 'bold', size: 23 });
  s.ellipse(605, 240, 45, 32, { stroke: INK, width: 2 });
  pipe(
    s,
    [
      [650, 240],
      [780, 240],
    ],
    { width: 14, fill: 'white' }
  );
  s.arrow(665, 240, 938, 240, { color: BLUE, width: 3 });
  s.rect(771, 331, 120, 85, { fill: WATER, stroke: INK, width: 2, rx: 12 });
  pipe(
    s,
    [
      [824, 388],
      [824, 250],
    ],
    { width: 11 }
  );
  s.arrow(824, 359, 824, 262, { color: COLORS.orange, width: 3 });
  for (let j = 0; j < 7; j += 1)
    s.circle(858 + j * 11, 238 + ((j % 3) - 1) * (j + 2), 2.8, { fill: COLORS.orange });
  label(s, 705, 195, 'Air jet', { color: BLUE });
  label(s, 750, 295, 'Liquid rises', { color: COLORS.orange, size: 19 });
  label(s, 829, 433, 'Perfume', { size: 19 });
  label(s, 250, 491, '(c) Aspirator', { weight: 'bold', size: 23 });
  s.path('M196 530V596L230 640V736H270V640L304 596V530', { fill: PALE, width: 2.5 });
  // The side branch opens into the fast-water throat.
  s.rect(270, 645, 125, 25, { fill: 'white' });
  s.line(270, 645, 395, 645, { width: 2 });
  s.line(270, 670, 395, 670, { width: 2 });
  s.arrow(250, 545, 250, 722, { color: BLUE, width: 3 });
  s.arrow(405, 657, 270, 657, { color: COLORS.orange, width: 3 });
  label(s, 146, 558, 'Water in', { color: BLUE });
  label(s, 365, 615, 'Air in', { color: COLORS.orange });
  label(s, 250, 777, 'Low pressure at the throat', { size: 19 });
  label(s, 750, 491, '(d) Chimney draft hood', { weight: 'bold', size: 23 });
  s.path('M700 530V605L663 659H837L800 605V530', { width: 2.5 });
  s.rect(711, 683, 78, 115, { stroke: INK, fill: PALE, width: 2 });
  s.arrow(750, 775, 750, 552, { color: BLUE, width: 3 });
  s.arrow(583, 672, 716, 672, { color: COLORS.orange, width: 3 });
  s.arrow(916, 672, 784, 672, { color: COLORS.orange, width: 3 });
  label(s, 750, 825, 'Hot exhaust rises', { color: BLUE });
  label(s, 615, 711, 'Room air', { color: COLORS.orange, size: 18 });
  label(s, 886, 711, 'Room air', { color: COLORS.orange, size: 18 });
  label(
    s,
    500,
    875,
    'Jet mixing matters; chimney draft also depends on the buoyancy of the warm gas column.',
    { size: 19 }
  );
  return s.render();
}

function torricelli() {
  const s = new Svg({
    width: 1000,
    height: 660,
    title: 'Torricelli outflow from a large open reservoir',
    desc: 'Water drains from a small side opening into the atmosphere. The large free surface is at height h1 and the outlet center at h2, with h=h1-h2. Both have atmospheric pressure. Negligible free-surface speed and negligible losses give outlet speed square root of 2gh. A schematic parabolic jet leaves the outlet horizontally.',
  });
  title(
    s,
    'Pressure cancels between the free surface and the outlet',
    'Large reservoir, small opening, incompressible flow, and negligible losses.'
  );
  s.rect(160, 170, 390, 340, { fill: WATER });
  s.path('M160 120V510H550V433M550 406V120', { width: 3 });
  s.line(160, 170, 550, 170, { color: BLUE, width: 2 });
  s.line(550, 406, 595, 406, { width: 3 });
  s.line(550, 433, 595, 433, { width: 3 });
  const jet = Array.from({ length: 91 }, (_, i) => [
    595 + i * 2.8,
    419.5 + 0.0018 * (i * 2.8) ** 2,
  ]);
  s.polyline(jet, { color: BLUE, width: 8 });
  s.circle(360, 170, 5, { fill: INK });
  label(s, 363, 138, '1: P₁ = P_{atm}; v₁ ≈ 0', { size: 23 });
  s.circle(570, 419.5, 5, { fill: INK });
  label(s, 755, 350, '2: P₂ = P_{atm}', { size: 23 });
  s.arrow(610, 390, 780, 390, { color: BLUE, width: 3 });
  label(s, 695, 443, 'v₂', { size: 25, color: BLUE });
  dimension(s, 97, 170, 97, 419.5, 'h = h₁ − h₂', { dx: 0, dy: 0 });
  s.line(118, 170, 158, 170, { dash: '5 5', color: GRAY });
  s.line(118, 419.5, 545, 419.5, { dash: '5 5', color: GRAY });
  s.line(150, 550, 918, 550, { color: GRAY, dash: '6 5' });
  label(s, 870, 580, 'Height datum', { size: 18, color: GRAY });
  dimension(s, 916, 170, 916, 550, 'h₁', { dx: 22, dy: 0 });
  dimension(s, 870, 419.5, 870, 550, 'h₂', { dx: 21, dy: 0 });
  label(s, 500, 620, 'ρgh₁ = ½ρv₂² + ρgh₂       ⇒       v₂ = √(2gh)', { size: 27 });
  return s.render();
}

function expansionJoint() {
  const s = new Svg({
    width: 1000,
    height: 620,
    title: 'A bridge expansion joint closes as the deck warms',
    desc: 'Two identical bridge sections expand toward a central gap. Dashed outlines show their colder endpoints; outer reference points stay fixed. If each section has initial length L and expands by alpha L delta T, the central gap shrinks by twice that amount. Changes are exaggerated.',
  });
  title(
    s,
    'Leave room for thermal expansion',
    'Two identical sections expand toward the joint; changes are exaggerated.'
  );
  for (const [y, warm] of [
    [190, false],
    [370, true],
  ]) {
    const e = warm ? 25 : 0;
    label(s, 500, y - 65, warm ? '(b) Warmer by ΔT' : '(a) Initial temperature', {
      size: 22,
      weight: 'bold',
    });
    s.rect(100, y, 350 + e, 45, { fill: PALE, stroke: INK, width: 2 });
    s.rect(550 - e, y, 350 + e, 45, { fill: PALE, stroke: INK, width: 2 });
    for (const x of [100, 900]) {
      s.line(x, y - 18, x, y + 67, { width: 2 });
      label(s, x, y + 94, 'Fixed reference', { size: 17 });
    }
    dimension(s, 450 + e, y - 20, 550 - e, y - 20, warm ? 'g' : 'g₀');
    if (warm) {
      for (const x of [450, 550]) s.line(x, y - 40, x, y + 66, { dash: '6 4', color: GRAY });
      s.arrow(390, y + 22, 472, y + 22, { color: RED, width: 3 });
      s.arrow(610, y + 22, 528, y + 22, { color: RED, width: 3 });
      label(s, 413, y + 66, 'ΔL', { size: 21, color: RED });
      label(s, 588, y + 66, 'ΔL', { size: 21, color: RED });
    } else {
      dimension(s, 100, y + 67, 450, y + 67, 'L', { dy: 22 });
      dimension(s, 550, y + 67, 900, y + 67, 'L', { dy: 22 });
    }
  }
  label(s, 500, 535, 'Each section: ΔL = αLΔT       Remaining gap: g = g₀ − 2αLΔT', { size: 25 });
  label(
    s,
    500,
    582,
    'This symmetric model fixes the outer ends and allows motion at the central joint.',
    { size: 20 }
  );
  return s.render();
}

function gasLawComparison() {
  const s = new Svg({
    width: 1080,
    height: 690,
    title: 'Which quantities stay fixed in the ideal gas laws?',
    desc: 'Three before-and-after pairs compare a fixed amount of gas. Boyle law: at fixed temperature, doubling absolute pressure halves volume. Charles law: at fixed absolute pressure, doubling Kelvin temperature doubles volume. Fixed-volume law: doubling Kelvin temperature doubles absolute pressure. Piston drawings are schematic and a locked piston marks fixed volume.',
  });
  title(
    s,
    'Change one condition while keeping the others fixed',
    'All panels contain a fixed amount of ideal gas; pressure is absolute and temperature is in kelvins.'
  );
  const panels = [
    {
      title: '(a) Boyle’s law',
      fixed: 'Fixed T and N',
      volumes: [150, 75],
      states: ['P, V, T', '2P, V/2, T'],
      law: 'PV = constant',
      lock: false,
    },
    {
      title: '(b) Charles’s law',
      fixed: 'Fixed P and N',
      volumes: [75, 150],
      states: ['P, V, T', 'P, 2V, 2T'],
      law: 'V/T = constant',
      lock: false,
    },
    {
      title: '(c) Fixed-volume law',
      fixed: 'Fixed V and N',
      volumes: [120, 120],
      states: ['P, V, T', '2P, V, 2T'],
      law: 'P/T = constant',
      lock: true,
    },
  ];
  panels.forEach((p, i) => {
    const x = i * 360;
    label(s, x + 180, 117, p.title, { size: 23, weight: 'bold' });
    label(s, x + 180, 160, p.fixed, { size: 21, color: BLUE });
    p.volumes.forEach((height, j) => {
      const cx = x + 100 + j * 160;
      s.rect(cx - 48, 450 - height, 96, height, { fill: WATER });
      s.path(`M ${cx - 48} 245 V450 H${cx + 48} V245`, { width: 2.5 });
      s.line(cx - 47, 450 - height, cx + 47, 450 - height, { width: 7, color: GRAY });
      s.line(cx, 450 - height, cx, 420 - height, { width: 4, color: GRAY });
      label(s, cx, 495, j ? 'After' : 'Before', { size: 19 });
      label(s, cx, 536, p.states[j], { size: 20 });
      if (p.lock) {
        s.line(cx - 63, 450 - height, cx - 49, 450 - height, { width: 6 });
        s.line(cx + 49, 450 - height, cx + 63, 450 - height, { width: 6 });
      }
    });
    s.arrow(x + 157, 221, x + 203, 221, { width: 2 });
    label(s, x + 180, 591, p.law, { size: 25 });
    if (p.lock) label(s, x + 180, 637, 'Pistons locked in place', { size: 18, color: GRAY });
  });
  label(s, 540, 673, 'Each comparison follows directly from PV = Nk_BT.', { size: 20 });
  return s.render();
}
function blackbodySpectra() {
  const s = new Svg({
    width: 1100,
    height: 650,
    title: 'Calculated blackbody spectra at three temperatures',
    desc: 'Planck-law spectral exitance versus wavelength from zero to 3500 nanometers, on a common linear scale in megawatts per square meter per micrometer. The 6000 K, 4000 K, and 3000 K peaks are at approximately 483, 724, and 966 nanometers. A shaded band marks approximately 380 to 750 nanometers as visible light. Hotter blackbodies have a higher peak and a shorter peak wavelength.',
  });
  title(
    s,
    'A hotter blackbody radiates more at every wavelength',
    'Planck’s law; all three curves use the same linear vertical scale.'
  );
  const g = new Plot(s, {
    x: 120,
    y: 125,
    w: 690,
    h: 370,
    xRange: [0, 3500],
    yRange: [0, 110],
    xTicks: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
    yTicks: [0, 20, 40, 60, 80, 100],
  });
  s.rect(g.X(380), 125, g.X(750) - g.X(380), 370, { fill: '#f0ecd9' });
  g.axes({
    xTitle: 'Wavelength λ (nm)',
    yTitle: 'Spectral exitance (MW m⁻² μm⁻¹)',
    size: 18,
    titleSize: 20,
    yTitleOffset: 77,
    xTitleOffset: 51,
    grid: true,
  });
  for (const [i, temperature, color, dash] of [
    [0, 6000, RED, undefined],
    [1, 4000, BLUE, '10 5'],
    [2, 3000, INK, '3 5'],
  ]) {
    const points = Array.from({ length: 1001 }, (_, j) => [
      1 + j * 3.499,
      spectralExitance(1 + j * 3.499, temperature),
    ]);
    g.series(points, { color, dash, width: 3 });
    const peak = 2.897771955e6 / temperature;
    s.circle(g.X(peak), g.Y(spectralExitance(peak, temperature)), 4.5, { fill: color });
    const ly = 175 + i * 105;
    s.line(850, ly, 895, ly, { color, dash, width: 3 });
    label(s, 912, ly, `${temperature} K`, { size: 22, color, anchor: 'start' });
    label(s, 850, ly + 37, `λ_{peak} ≈ ${Math.round(peak)} nm`, { size: 20, anchor: 'start' });
  }
  label(s, g.X(565), 105, 'Visible', { size: 18 });
  label(s, 550, 594, 'Wien’s displacement law: λ_{peak} T ≈ 2.898 × 10⁶ nm·K', { size: 25 });
  label(
    s,
    550,
    630,
    'Visible band shown approximately as 380–750 nm; spectrum extends beyond this plot.',
    { size: 19 }
  );
  return s.render();
}

function compositeWall() {
  const { layers, flux, points } = wallProfile();
  const s = new Svg({
    width: 1000,
    height: 790,
    title: 'Temperature drops across an insulated composite wall',
    desc: 'A series model of a wall at steady state has gypsum 1.25 cm thick with conductivity 0.17, insulation 9 cm with conductivity 0.04, and brick 10 cm with conductivity 0.72 watts per meter kelvin. The material surfaces are at 20 and 0 Celsius. The calculated heat flux is approximately 8.12 watts per square meter. Temperature is continuous at ideal interfaces and drops most steeply in the insulation. Studs, air films, and contact resistances are excluded.',
  });
  title(
    s,
    'Most of the temperature drop occurs across the insulation',
    'Example series path through an insulation bay, at steady state. Material values are illustrative.'
  );
  const x0 = 160,
    scale = 3300;
  const colors = ['#ece8df', '#e0edf5', '#eee2d9'];
  layers.forEach((layer, i) => {
    const x = x0 + points[i][0] * scale,
      width = layer.thickness * scale;
    s.rect(x, 160, width, 140, { fill: colors[i], stroke: GRAY, width: 1.5 });
    if (i === 0) {
      label(s, 80, 111, 'Gypsum', { size: 20 });
      s.leader(80, 127, x + width / 2, 160, { arrow: false });
      label(s, 80, 142, '1.25 cm', { size: 18 });
    } else {
      label(s, x + width / 2, 190, layer.name, { size: 22 });
      label(s, x + width / 2, 235, `${layer.thickness * 100} cm`, { size: 22 });
    }
  });
  label(s, x0, 332, '20 °C', { size: 22, anchor: 'end', color: RED });
  label(s, x0 + points.at(-1)[0] * scale, 332, '0 °C', { size: 22, anchor: 'start', color: BLUE });
  s.arrow(850, 230, 960, 230, { color: RED, width: 3 });
  label(s, 907, 275, 'Heat flow', { size: 19 });
  const g = new Plot(s, {
    x: x0,
    y: 395,
    w: points.at(-1)[0] * scale,
    h: 220,
    xRange: [0, points.at(-1)[0] * 100],
    yRange: [0, 20],
    xTicks: [0, 5, 10, 15, 20],
    yTicks: [0, 5, 10, 15, 20],
  });
  layers.forEach((layer, i) =>
    s.rect(g.X(points[i][0] * 100), 395, layer.thickness * scale, 220, { fill: colors[i] })
  );
  g.axes({
    xTitle: 'Distance through wall (cm)',
    yTitle: 'Temperature (°C)',
    grid: true,
    size: 18,
    titleSize: 20,
    xTitleOffset: 50,
    yTitleOffset: 65,
  });
  g.series(
    points.map(([x, t]) => [x * 100, t]),
    { color: RED, width: 3 }
  );
  points.forEach(([x, t]) => s.circle(g.X(x * 100), g.Y(t), 4, { fill: RED }));
  label(s, 500, 704, `q″ = (T_h − T_c) / Σ(d_i/k_i) ≈ ${flux.toFixed(2)} W/m²`, { size: 25 });
  label(s, 500, 744, 'k (W/m·K): gypsum 0.17; insulation 0.040; brick 0.72.', { size: 20 });
  label(
    s,
    500,
    777,
    'Ideal contact; no studs or air-film resistance. Temperatures shown are wall-surface temperatures.',
    { size: 18 }
  );
  return s.render();
}

function coinMicrostates() {
  const groups = microstates();
  const s = new Svg({
    width: 1000,
    height: 900,
    title: 'All 32 equally likely microstates of five fair coins',
    desc: 'Five labeled coin positions give 32 distinct sequences of heads and tails. Grouped by total heads from zero through five, the numbers of sequences are 1, 5, 10, 10, 5, and 1. Each displayed sequence occurs exactly once. The probability of a macrostate is its multiplicity divided by 32.',
  });
  title(
    s,
    'Count microstates, then compare macrostates',
    'Five independent fair coins; positions in every sequence run from coin 1 to coin 5.'
  );
  let y = 137;
  groups.forEach((sequences, heads) => {
    const rows = Math.ceil(sequences.length / 5);
    if (heads % 2 === 0) s.rect(25, y - 34, 950, rows * 82, { fill: PALE, rx: 5 });
    label(s, 102, y + 2, `${heads} ${heads === 1 ? 'head' : 'heads'}`, {
      size: 22,
      weight: 'bold',
    });
    label(s, 102, y + 36, `Ω = ${sequences.length}`, { size: 21, color: BLUE });
    sequences.forEach((sequence, j) => {
      const x = 224 + (j % 5) * 150;
      const row = Math.floor(j / 5);
      [...sequence].forEach((face, k) => {
        const cx = x + k * 24,
          cy = y + row * 82;
        s.circle(cx, cy, 10.5, {
          fill: face === 'H' ? '#dce9f5' : 'white',
          stroke: INK,
          width: 1.2,
        });
        label(s, cx, cy, face, { size: 13, weight: 'bold', halo: false });
      });
    });
    y += rows * 82 + 6;
  });
  label(s, 500, 838, 'Multiplicity Ω: 1, 5, 10, 10, 5, 1       Total: 32', { size: 25 });
  label(s, 500, 878, 'P(macrostate) = Ω/32; each individual sequence has probability 1/32.', {
    size: 21,
  });
  return s.render();
}

function entropyBudget() {
  const q = 4000,
    hot = 600,
    cold = 250;
  const values = [-q / hot, q / cold, q / cold - q / hot];
  const s = new Svg({
    width: 1100,
    height: 670,
    title: 'Entropy accounting for heat flowing from hot to cold',
    desc: 'Four thousand joules flow from a reservoir at 600 kelvin to one at 250 kelvin. Reservoir temperatures remain fixed. The hot reservoir loses 6.67 joules per kelvin, the cold gains 16, and total entropy increases by 9.33 joules per kelvin. Signed bars share the same scale.',
  });
  title(
    s,
    'The cold reservoir gains more entropy than the hot one loses',
    'A transfer of Q = 4000 J; both reservoir temperatures remain fixed.'
  );
  s.rect(40, 142, 290, 110, { fill: '#f6e9df', stroke: INK, width: 2, rx: 4 });
  label(s, 185, 179, 'Hot reservoir', { size: 23, weight: 'bold' });
  label(s, 185, 221, 'T_h = 600 K', { size: 24 });
  s.arrow(185, 267, 185, 408, { color: RED, width: 6, head: 18 });
  label(s, 280, 332, '4000 J', { size: 21 });
  s.rect(40, 424, 290, 110, { fill: WATER, stroke: INK, width: 2, rx: 4 });
  label(s, 185, 459, 'Cold reservoir', { size: 23, weight: 'bold' });
  label(s, 185, 501, 'T_c = 250 K', { size: 24 });
  const X = v => 620 + ((v + 10) / 30) * 430;
  s.line(X(0), 151, X(0), 493, { color: GRAY, dash: '6 5' });
  ['Hot reservoir', 'Cold reservoir', 'Total'].forEach((name, i) => {
    const y = 211 + i * 119,
      value = values[i];
    label(s, 598, y, name, { size: 21, anchor: 'end' });
    s.rect(Math.min(X(0), X(value)), y - 23, Math.abs(X(value) - X(0)), 46, {
      fill: value < 0 ? RED : i === 1 ? BLUE : '#386b50',
    });
    label(
      s,
      value < 0 ? X(value) - 13 : X(value) + 13,
      y,
      `${value > 0 ? '+' : '−'}${Math.abs(value).toFixed(2)}`,
      { size: 21, anchor: value < 0 ? 'end' : 'start' }
    );
  });
  s.line(X(-10), 523, X(20), 523, { width: 1.5 });
  for (const v of [-10, 0, 10, 20]) {
    s.line(X(v), 523, X(v), 531);
    label(s, X(v), 552, String(v).replace('-', '−'), { size: 19 });
  }
  label(s, 835, 591, 'Entropy change ΔS (J/K)', { size: 22 });
  label(s, 550, 641, 'ΔS_{total} = −Q/T_h + Q/T_c = Q(1/T_c − 1/T_h) > 0', { size: 26 });
  return s.render();
}

export default {
  Figure_11_06_02: manometers,
  Figure_11_05_02: hydraulicBrakes,
  Figure_11_07_07: apparentWeight,
  Figure_12_04_04: velocityProfiles,
  Figure_12_02_02: entrainmentDevices,
  Figure_12_03_01: torricelli,
  companion_13_expansion_joint: expansionJoint,
  companion_13_gas_laws: gasLawComparison,
  Figure_14_07_02: blackbodySpectra,
  companion_14_composite_wall: compositeWall,
  companion_15_coin_microstates: coinMicrostates,
  companion_15_entropy_budget: entropyBudget,
};
