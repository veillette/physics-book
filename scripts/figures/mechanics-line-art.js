/** Remaining mathematical line art in chapters 2, 3, 5 and 9. */
import { COLORS, Plot, Svg, rad } from './svg.js';

const FORCE = '#d52350';
const INK = COLORS.black;
const GUIDE = { color: COLORS.guide, width: 1.3, dash: '6 5' };

function group(svg, id, draw) {
  svg.add(`<g id="${id}">`);
  draw();
  svg.add('</g>');
}

function boat(svg, x, y) {
  svg.path(
    `M ${x} ${y - 22} Q ${x + 19} ${y - 3} ${x + 12} ${y + 22} L ${x - 12} ${y + 22} Q ${x - 19} ${y - 3} ${x} ${y - 22} Z`,
    {
      fill: '#ead0a9',
      color: '#806442',
      width: 1.5,
    }
  );
  svg.line(x - 11, y + 5, x + 11, y + 5, { color: '#806442', width: 3 });
  svg.circle(x, y - 3, 5, { fill: '#486d91' });
}

function riverVelocity(numeric) {
  const svg = new Svg({
    width: 760,
    height: 530,
    title: numeric
      ? 'River crossing at 0.75 m/s in a 1.20 m/s current'
      : 'Adding boat and river velocities',
    desc: 'The boat points north relative to the water. The current flows east. A head-to-tail vector triangle gives the boat’s northeast velocity relative to shore; θ is measured north of east. The boat icons point north while their positions drift northeast.',
  });
  svg.rect(30, 45, 700, 430, { fill: '#e8f5fa' });
  svg.rect(30, 30, 700, 20, { fill: '#c9dfb8' });
  svg.rect(30, 475, 700, 20, { fill: '#c9dfb8' });
  const start = [200, 410];
  const scale = 330;
  const corner = [start[0], start[1] - 0.75 * scale];
  const end = [start[0] + 1.2 * scale, corner[1]];
  for (const t of [0, 0.45, 0.9]) {
    boat(svg, start[0] + t * (end[0] - start[0]), start[1] + t * (end[1] - start[1]));
  }
  group(svg, 'boat-velocity', () =>
    svg.arrow(...start, ...corner, { color: COLORS.blue, width: 3, dash: '7 5' })
  );
  group(svg, 'river-velocity', () =>
    svg.arrow(...corner, ...end, { color: COLORS.blue, width: 3, dash: '7 5' })
  );
  group(svg, 'total-velocity', () =>
    svg.arrow(...start, ...end, { color: COLORS.green, width: 4 })
  );
  svg.text(105, 280, numeric ? 'v_{boat} = 0.75 \\rm{m/s}' : 'v_{boat}', { size: 22 });
  svg.text(400, 128, numeric ? 'v_{river} = 1.20 \\rm{m/s}' : 'v_{river}', { size: 22 });
  svg.text(440, 305, 'v_{tot}', { size: 25, color: COLORS.green });
  svg.line(...start, start[0] + 125, start[1], GUIDE);
  svg.arc(...start, 73, 0, (Math.atan2(0.75, 1.2) * 180) / Math.PI);
  svg.text(287, 385, 'θ', { size: 24 });
  svg.xyIndicator(80, 438, { len: 47 });
  return svg.render();
}

function plane(svg, x, y) {
  svg.polygon(
    [
      [x, y - 30],
      [x + 6, y - 12],
      [x + 37, y + 2],
      [x + 37, y + 9],
      [x + 6, y + 4],
      [x + 5, y + 23],
      [x + 15, y + 29],
      [x - 15, y + 29],
      [x - 5, y + 23],
      [x - 6, y + 4],
      [x - 37, y + 9],
      [x - 37, y + 2],
      [x - 6, y - 12],
    ],
    {
      fill: '#d6c8e6',
      stroke: '#775290',
    }
  );
}

function windVelocity(numeric) {
  const svg = new Svg({
    width: 760,
    height: 620,
    title: numeric
      ? 'Finding the wind velocity from the airplane’s ground velocity'
      : 'A northbound airplane drifts west in a headwind',
    desc: 'The airplane’s air velocity points north. The wind vector points southwest from its tip. Their sum points 20° west of north, or 110° counterclockwise from east. In the numerical example the airspeed is 45.0 m/s and the ground speed is 38.0 m/s; the wind components are −13.0 m/s eastward and −9.29 m/s northward.',
  });
  const origin = [470, 500];
  const scale = 8;
  const north = [470, 500 - 45 * scale];
  const end = [470 - 38 * Math.sin(rad(20)) * scale, 500 - 38 * Math.cos(rad(20)) * scale];
  for (const t of [0.18, 0.52, 0.86]) {
    plane(svg, origin[0] + t * (end[0] - origin[0]), origin[1] + t * (end[1] - origin[1]));
  }
  group(svg, 'plane-velocity', () =>
    svg.arrow(...origin, ...north, { color: COLORS.blue, width: 3, dash: '7 5' })
  );
  group(svg, 'wind-velocity', () =>
    svg.arrow(...north, ...end, { color: COLORS.orange, width: 4 })
  );
  group(svg, 'total-velocity', () =>
    svg.arrow(...origin, ...end, { color: COLORS.green, width: 4 })
  );
  // Labels sit just beside their arrows: v_p to the right of the north arrow,
  // v_tot to the left of the ground-velocity arrow at 70% of its length.
  svg.text(origin[0] + 14, 290, numeric ? 'v_p = 45.0 \\rm{m/s}' : 'v_p', {
    size: 24,
    anchor: 'start',
  });
  const totAt = [origin[0] + 0.7 * (end[0] - origin[0]), origin[1] + 0.7 * (end[1] - origin[1])];
  svg.text(totAt[0] - 16, totAt[1], numeric ? 'v_{tot} = 38.0 \\rm{m/s}' : 'v_{tot}', {
    size: 24,
    anchor: 'end',
  });
  svg.text(368, 153, 'v_w', { size: 24, color: COLORS.orange });
  svg.line(...north, north[0] - 150, north[1]);
  const windAngle = (Math.atan2(end[1] - north[1], north[0] - end[0]) * 180) / Math.PI;
  svg.arc(...north, 48, 180, 180 + windAngle);
  svg.text(409, 156, 'θ', { size: 23 });
  svg.line(origin[0] - 150, origin[1], origin[0] + 135, origin[1]);
  svg.arc(...origin, 60, 90, 110);
  svg.text(448, 420, numeric ? '20.0°' : '20°', { size: 21 });
  if (numeric) {
    svg.arc(...origin, 100, 0, 110);
    svg.text(540, 415, '110°', { size: 21 });
    svg.arc(...origin, 125, 110, 180);
    svg.text(350, 444, '70°', { size: 21 });
  }
  svg.xyIndicator(95, 515, { len: 70, size: 18, xLabel: 'x (east)', yLabel: 'y (north)' });
  return svg.render();
}

function freeFall() {
  const svg = new Svg({
    width: 1000,
    height: 1170,
    title: 'Position, velocity and acceleration of a ball released from rest',
    desc: 'At equal 0.1 s intervals the ball falls increasingly far. With upward positive and g = 9.8 m/s², y = −4.9t², v = −9.8t and a = −9.8 m/s². The table and all three graphs show the same motion from 0 to 0.5 s.',
  });
  const times = Array.from({ length: 6 }, (_, i) => i / 10);
  svg.text(205, 28, 'Equal time intervals', { size: 22, math: false, weight: 'bold' });
  svg.arrow(80, 200, 80, 65, { width: 1.5 });
  svg.text(58, 58, '+y', { size: 21 });
  svg.line(145, 80, 310, 80, GUIDE);
  group(svg, 'falling-ball', () => {
    times.forEach(t => {
      const y = 80 + 330 * (t / 0.5) ** 2;
      svg.circle(200, y, 6, { fill: '#8799a7', stroke: INK });
      svg.text(238, y, `${t.toFixed(1)} s`, { size: 13, math: false, anchor: 'start' });
    });
  });
  svg.text(200, 448, 'Released from rest', { size: 18, math: false });
  const xs = [505, 675, 845];
  svg.rect(420, 62, 510, 310, { fill: '#f3f7fa', stroke: '#a5b1bb' });
  ['y (m)', 'v (m/s)', 't (s)'].forEach((s, i) => svg.text(xs[i], 90, s, { size: 23 }));
  svg.line(420, 115, 930, 115);
  [590, 760].forEach(x => svg.line(x, 62, x, 372, { color: '#a5b1bb' }));
  times.forEach((t, i) => {
    const minus = s => s.replace('-', '−');
    const y = 140 + i * 42;
    [
      t === 0 ? '0' : minus((-4.9 * t * t).toFixed(3)),
      t === 0 ? '0' : minus((-9.8 * t).toFixed(2)),
      t.toFixed(1),
    ].forEach((s, k) => svg.text(xs[k], y, s, { size: 21, math: false }));
  });
  const specs = [
    {
      id: 'position-graph',
      x: 290,
      y: 515,
      w: 550,
      h: 210,
      range: [-1.4, 0],
      ticks: [-1.4, -1.2, -1, -0.8, -0.6, -0.4, -0.2, 0],
      fn: t => -4.9 * t * t,
      color: COLORS.position,
      title: 'Position vs. time',
      label: 'Position, y (m)',
    },
    {
      id: 'velocity-graph',
      x: 100,
      y: 890,
      w: 340,
      h: 200,
      range: [-6, 0],
      ticks: [-6, -5, -4, -3, -2, -1, 0],
      fn: t => -9.8 * t,
      color: COLORS.velocity,
      title: 'Velocity vs. time',
      label: 'Velocity, v (m/s)',
    },
    {
      id: 'acceleration-graph',
      x: 605,
      y: 890,
      w: 340,
      h: 200,
      range: [-10, 0],
      ticks: [-10, -8, -6, -4, -2, 0],
      fn: () => -9.8,
      color: COLORS.accel,
      title: 'Acceleration vs. time',
      label: 'Acceleration, a (m/s^2)',
    },
  ];
  for (const s of specs) {
    group(svg, s.id, () => {
      const plot = new Plot(svg, {
        x: s.x,
        y: s.y,
        w: s.w,
        h: s.h,
        xRange: [0, 0.6],
        yRange: s.range,
        xTicks: [...times, 0.6],
        yTicks: s.ticks,
      });
      plot.axes({
        title: s.title,
        xTitle: 'Time, t (s)',
        yTitle: s.label,
        xLabelsAtAxis: true,
        size: 16,
        titleSize: 20,
        yTitleOffset: 65,
        xTitleOffset: 45,
      });
      plot.fn(s.fn, 0, 0.5, { color: s.color });
      for (const t of times) {
        svg.marker(plot.X(t), plot.Y(s.fn(t)), 'diamond', { color: s.color, size: 5 });
      }
    });
  }
  return svg.render();
}

function strings() {
  const svg = new Svg({
    width: 780,
    height: 650,
    title: 'Equal loads stretch three strings by different amounts',
    desc: 'Strings of the same initial length L₀ support equal weights. Thin nylon stretches most, thicker nylon stretches less, and steel stretches least. The shaded extensions are below a common initial-length reference line. Upward support forces and downward weights have equal magnitude.',
  });
  svg.rect(50, 85, 680, 45, { fill: '#cbd7e4', stroke: '#698199' });
  const initialEnd = 395;
  svg.line(90, initialEnd, 700, initialEnd, GUIDE);
  [
    { x: 190, extension: 55, width: 8, color: '#c7a43b', label: ['Thin nylon'] },
    { x: 410, extension: 28, width: 16, color: '#c7a43b', label: ['Thicker nylon'] },
    { x: 630, extension: 7, width: 8, color: '#78828b', label: ['Steel'] },
  ].forEach(({ x, extension, width, color, label }) => {
    svg.lines(x, 32, label, { size: 20, math: false });
    svg.rect(x - width / 2, 130, width, initialEnd - 130, { fill: color, stroke: INK, width: 1 });
    svg.rect(x - width / 2, initialEnd, width, extension, {
      fill: '#dce5ee',
      stroke: INK,
      width: 1,
    });
    const end = initialEnd + extension;
    svg.line(x, end, x, end + 18);
    svg.circle(x, end + 25, 7, { fill: 'none', stroke: INK });
    svg.rect(x - 34, end + 32, 68, 55, { fill: '#b8adb7', stroke: '#776d75' });
    svg.arrow(x, 130, x, 60, { color: FORCE, width: 3.5 });
    svg.text(x + 21, 72, 'w', { size: 24 });
    svg.arrow(x, end + 87, x, end + 157, { color: FORCE, width: 3.5 });
    svg.text(x + 21, end + 128, 'w', { size: 24 });
  });
  svg.vdimension(115, 130, initialEnd, 'L_0');
  svg.vdimension(115, initialEnd, initialEnd + 55, 'ΔL');
  return svg.render();
}

function cylinder(svg, x, top, bottom) {
  svg.rect(x - 45, top, 90, bottom - top, { fill: '#d0e3f2', stroke: '#547fa3' });
  svg.path(`M ${x - 45} ${bottom} A 45 13 0 0 0 ${x + 45} ${bottom}`, {
    color: '#547fa3',
    fill: '#d0e3f2',
  });
  svg.ellipse(x, top, 45, 13, { fill: '#e8f2fa', stroke: '#547fa3' });
}

function tensionCompression() {
  const svg = new Svg({
    width: 850,
    height: 560,
    title: 'Tension and compression of a rod',
    desc: 'Two equal opposing axial forces stretch a rod in tension and shorten an identical rod in compression. Dotted outlines show the original top at length L₀. The change ΔL has equal magnitude for small elastic deformations under the same force magnitude.',
  });
  [false, true].forEach((compression, i) => {
    const x = 235 + i * 395;
    const originalTop = 175;
    const top = originalTop + (compression ? 35 : -35);
    const bottom = 400;
    svg.ellipse(x, originalTop, 45, 13, { stroke: '#777777', width: 1.3 });
    svg.line(x - 45, originalTop, x - 45, top, GUIDE);
    svg.line(x + 45, originalTop, x + 45, top, GUIDE);
    cylinder(svg, x, top, bottom);
    // Draw the original outline on top of the filled cylinder as a dashed guide.
    svg.path(`M ${x - 45} ${originalTop} A 45 13 0 1 1 ${x + 45} ${originalTop}`, { ...GUIDE });
    group(svg, compression ? 'compression-forces' : 'tension-forces', () => {
      svg.arrow(x, compression ? top - 90 : top, x, compression ? top : top - 90, {
        color: FORCE,
        width: 4,
      });
      svg.arrow(x, compression ? bottom + 90 : bottom, x, compression ? bottom : bottom + 90, {
        color: FORCE,
        width: 4,
      });
    });
    svg.text(x + 24, top - 58, 'F', { size: 25 });
    svg.text(x + 24, bottom + 58, 'F', { size: 25 });
    svg.vdimension(x - 95, originalTop, bottom, 'L_0');
    svg.vdimension(x + 95, Math.min(top, originalTop), Math.max(top, originalTop), 'ΔL', {
      size: 21,
    });
    svg.text(x, 535, compression ? '(b) Compression' : '(a) Tension', { size: 23, math: false });
  });
  return svg.render();
}

function compressedCube() {
  const svg = new Svg({
    width: 720,
    height: 590,
    title: 'A cube compressed by inward forces on every face',
    desc: 'Equal inward forces F act normally on all six faces of a cube. Its original volume V₀ decreases to V₀ − ΔV. Solid edges show the original cube and dashed edges the smaller compressed cube; A marks a face area.',
  });
  const cube = (s, dashed) => {
    const point = (u, v, w) => [360 + s * (u * 130 - w * 80), 290 + s * (v * 130 - w * 65)];
    const style = {
      color: dashed ? '#677583' : '#79538e',
      width: dashed ? 1.5 : 2.3,
      dash: dashed ? '6 5' : undefined,
    };
    for (let axis = 0; axis < 3; axis += 1) {
      for (const a of [-1, 1]) {
        for (const b of [-1, 1]) {
          const p = [a, b];
          p.splice(axis, 0, -1);
          const q = [...p];
          q[axis] = 1;
          svg.line(...point(...p), ...point(...q), style);
        }
      }
    }
    return point;
  };
  const p = cube(1, false);
  cube(0.72, true);
  // Opposing force pairs are parallel to each projected coordinate axis.
  group(svg, 'compression-forces', () => {
    for (let axis = 0; axis < 3; axis += 1) {
      for (const sign of [-1, 1]) {
        const outer = [0, 0, 0];
        const face = [0, 0, 0];
        outer[axis] = sign * 1.65;
        face[axis] = sign;
        const a = p(...outer);
        const b = p(...face);
        svg.arrow(...a, ...b, { color: FORCE, width: 3.5 });
        svg.text(a[0] + 16, a[1] - 14, 'F', { size: 25 });
      }
    }
  });
  svg.text(585, 60, 'Volume V_0', { size: 22 });
  svg.leader(540, 75, ...p(1, -1, -1));
  svg.text(575, 120, 'Volume V_0 − ΔV', { size: 22 });
  svg.leader(530, 135, 360 + 0.72 * 210, 290 - 0.72 * 65);
  svg.text(168, 70, 'A', { size: 25 });
  svg.leader(180, 84, 330, 152);
  return svg.render();
}

/** Local pencil coordinates: base at v=0, length along +v (screen y up). */
function pencil(svg, { pivot, angle, tipDown, flatPivot = false }) {
  const c = Math.cos(rad(angle));
  const s = Math.sin(rad(angle));
  const at = (u, v) => [pivot[0] + u * c - v * s, pivot[1] - u * s - v * c];
  const half = 33;
  const shift = flatPivot ? half : 0;
  const shape = tipDown
    ? [
        [-half, 310],
        [half, 310],
        [half, 85],
        [0, 0],
        [-half, 85],
      ]
    : [
        [-half, 0],
        [half, 0],
        [half, 225],
        [0, 310],
        [-half, 225],
      ];
  svg.polygon(
    shape.map(([u, v]) => at(u + shift, v)),
    { fill: '#e6c884', stroke: '#947647', width: 2 }
  );
  if (tipDown) {
    svg.polygon([at(-12, 30), at(12, 30), at(0, 0)], { fill: '#444444' });
  } else {
    svg.polygon([at(-12 + shift, 280), at(12 + shift, 280), at(shift, 310)], { fill: '#444444' });
  }
  svg.line(...at(shift - 12, tipDown ? 85 : 0), ...at(shift - 12, tipDown ? 310 : 225), {
    color: '#c9a354',
    width: 2,
  });
  return at(shift, 145);
}

function stability({ angle = 0, tipDown = false, tilted = false, title, desc }) {
  const svg = new Svg({ width: 700, height: 535, title, desc });
  const pivot = [275, 405];
  svg.rect(95, 405, 355, 16, { fill: '#ded8e6' });
  const cg = pencil(svg, { pivot, angle, tipDown, flatPivot: tilted && !tipDown });
  svg.line(cg[0], cg[1], cg[0], pivot[1], GUIDE);
  group(svg, 'weight', () => svg.arrow(...cg, cg[0], cg[1] + 80, { color: FORCE, width: 4 }));
  svg.circle(...cg, 5, { fill: INK });
  svg.text(cg[0] + 31, cg[1] - 5, 'CG', { size: 20, math: false });
  svg.text(cg[0] + 24, cg[1] + 58, 'w', { size: 25 });
  group(svg, 'normal', () => svg.arrow(pivot[0], 485, ...pivot, { color: FORCE, width: 4 }));
  svg.text(pivot[0] + 29, 458, 'N', { size: 25 });
  svg.circle(...pivot, 5, { fill: INK });
  svg.text(113, 363, 'Pivot point', { size: 20, math: false });
  svg.leader(160, 378, ...pivot);
  const torque = cg[0] < pivot[0] ? 'τ_{ccw}' : 'τ_{cw}';
  svg.text(285, 40, tilted ? torque : 'τ = 0', { size: 26 });
  svg.text(560, 120, 'Free-body', { size: 21, math: false });
  svg.text(560, 147, 'diagram', { size: 21, math: false });
  svg.arrow(555, 266, 555, 192, { width: 2 });
  svg.arrow(555, 266, 555, 340, { width: 2 });
  svg.circle(555, 266, 5, { fill: FORCE });
  svg.text(582, 211, 'N', { size: 24 });
  svg.text(582, 321, 'w', { size: 24 });
  return svg.render();
}

function neutralStability() {
  const svg = new Svg({
    width: 760,
    height: 620,
    title: 'Neutral equilibrium of a sphere and a pencil lying flat',
    desc: 'A sphere and a horizontal pencil have their weight and normal force on the same vertical line. Each center of gravity stays at constant height during a small displacement along the horizontal surface, so gravity produces no restoring or overturning torque.',
  });
  [185, 465].forEach(y => svg.rect(45, y, 405, 14, { fill: '#ded8e6' }));
  svg.circle(245, 110, 75, { fill: '#e9d6a4', stroke: '#947647', width: 2 });
  svg.polygon(
    [
      [110, 405],
      [360, 405],
      [410, 435],
      [360, 465],
      [110, 465],
    ],
    { fill: '#e6c884', stroke: '#947647', width: 2 }
  );
  svg.polygon(
    [
      [395, 426],
      [410, 435],
      [395, 444],
    ],
    { fill: '#444444' }
  );
  [
    { y: 110, base: 185, label: '(a) Sphere' },
    { y: 435, base: 465, label: '(b) Pencil lying flat' },
  ].forEach(({ y, base, label }, i) => {
    const x = 245;
    svg.circle(x, y, 5, { fill: INK });
    svg.text(x - 30, y - 15, 'CG', { size: 19, math: false });
    const weightLength = Math.min(62, base - y - 3);
    svg.arrow(x, y, x, y + weightLength, { color: FORCE, width: 3.5 });
    svg.text(x + 25, y + weightLength / 2, 'w', { size: 23 });
    svg.arrow(x, base + 78, x, base, { color: FORCE, width: 3.5 });
    svg.text(x + 25, base + 60, 'N', { size: 23 });
    svg.circle(x, base, 4, { fill: INK });
    svg.text(405, base + 45, 'Pivot point', { size: 18, math: false });
    svg.leader(365, base + 33, x, base);
    svg.text(245, i === 0 ? 297 : 588, label, { size: 20, math: false });
    svg.text(560, y - 45, 'τ = 0', { size: 25 });
    svg.arrow(560, y + 30, 560, y - 20);
    svg.arrow(560, y + 30, 560, y + 80);
    svg.circle(560, y + 30, 4, { fill: FORCE });
    svg.text(583, y - 5, 'N', { size: 22 });
    svg.text(583, y + 65, 'w', { size: 22 });
    svg.text(560, y - 78, 'Free-body diagram', { size: 18, math: false });
  });
  return svg.render();
}

export default {
  Figure_02_07_06: freeFall,
  Figure_03_05_01: () => riverVelocity(false),
  Figure_03_05_09: () => riverVelocity(true),
  Figure_03_05_02: () => windVelocity(false),
  Figure_03_05_04: () => windVelocity(true),
  Figure_05_03_02: strings,
  Figure_05_03_03: tensionCompression,
  Figure_05_03_09: compressedCube,
  Figure_09_03_02: () =>
    stability({
      title: 'A pencil in stable equilibrium on its flat end',
      desc: 'A vertical pencil rests on its flat end. Weight and normal force are collinear, and the net force and torque are zero.',
    }),
  Figure_09_03_03: () =>
    stability({
      angle: 8,
      tilted: true,
      title: 'A small tilt produces a restoring torque',
      desc: 'A pencil on its flat end tilts slightly left about the left base corner. Its center of gravity remains to the right of the pivot, so its weight produces a clockwise restoring torque.',
    }),
  Figure_09_03_04: () =>
    stability({
      angle: 30,
      tilted: true,
      title: 'A large tilt overturns the pencil',
      desc: 'A pencil on its flat end tilts beyond the point where its center of gravity lies above the pivot. The weight acts to the left of the pivot and produces counterclockwise torque, increasing the tilt.',
    }),
  Figure_09_03_05: () =>
    stability({
      tipDown: true,
      title: 'A pencil balanced on its tip is in unstable equilibrium',
      desc: 'A perfectly vertical pencil balances on its tip. The weight and normal force are collinear and the torque is zero, but a small tilt makes the pencil fall.',
    }),
  Figure_09_03_06: () =>
    stability({
      angle: 15,
      tipDown: true,
      tilted: true,
      title: 'A small tilt grows in unstable equilibrium',
      desc: 'A pencil balanced on its tip tilts left. Its weight acts to the left of the pivot and produces counterclockwise torque, increasing the displacement.',
    }),
  Figure_09_03_07: neutralStability,
};
