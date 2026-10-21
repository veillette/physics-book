import { C, Sketch } from './sketch.js';
import { axesAt, caption, ccw, comp, divider, force, hinge, K, pivot, unit } from './mechanics.js';

/**
 * An extended-body free-body diagram: a rigid bar (beam, lever, limb) with
 * the forces drawn where they act, the lever arms dimensioned below it, a
 * small +x / +y axes indicator, and a curved arrow marking counterclockwise
 * torques as positive.
 *
 *   x0, y   – pixel position of the origin of the bar (usually the pivot)
 *   scale   – pixels per unit (units are whatever the problem uses: m or cm)
 *   tilt    – angle of the bar above the horizontal, degrees
 *   bar     – [from, to] extent of the bar, in units along it
 *   support – 'pivot' (triangle under the origin), 'hinge', or none
 *   forces  – [{ at, a, len, label, tip, lab, anchor }]: a force acting at
 *             distance `at` along the bar, pointing at math angle `a`; `tip`
 *             draws it ending at the bar (a push); `lab` places the label
 *   dims    – [{ from, to, label, row }]: horizontal distance between two
 *             points of the bar, drawn `row` rows below it
 */
function lever({
  title,
  desc,
  width = 640,
  height = 320,
  x0,
  y,
  scale,
  tilt = 0,
  bar,
  thick = 10,
  support = 'pivot',
  pivotLabel,
  forces = [],
  dims = [],
  dimY,
  axes = [50, 90],
  ccwAt = [130, 50],
  extra,
}) {
  const s = new Sketch({ width, height, title, desc });
  const [ux, uy] = unit(tilt);
  const P = u => [x0 + ux * u * scale, y + uy * u * scale];
  const [a, b] = bar.map(P);
  s.svg.line(...a, ...b, { color: '#a9c2d9', width: thick, cap: 'round' });
  s.svg.line(...a, ...b, { color: C.body, width: 1.4 });
  if (support === 'pivot') pivot(s, x0, y + thick / 2, { size: 13 });
  if (support === 'hinge') hinge(s, x0, y);
  if (pivotLabel) s.note(x0, y + thick / 2 + 30, pivotLabel);
  const baseY = dimY ?? y + 60;
  for (const d of dims) {
    const yy = baseY + (d.row ?? 0) * 28;
    const xa = P(d.from)[0];
    const xb = P(d.to)[0];
    for (const [xx, u] of [
      [xa, d.from],
      [xb, d.to],
    ])
      s.ref(xx, P(u)[1] + 6, xx, yy + 6);
    s.dim(xa, yy, xb, yy, d.label, { off: -10, size: 14 });
  }
  for (const f of forces) {
    const [px, py] = P(f.at);
    const len = f.len ?? 70;
    let from = [px, py];
    if (f.tip) {
      const [fx, fy] = unit(f.a);
      from = [px - fx * len, py - fy * len];
    }
    force(s, ...from, f.a, len, f.label, f.lab ? { at: f.lab, anchor: f.anchor ?? 'start' } : {});
  }
  if (axes) axesAt(s, ...axes, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
  if (ccwAt) ccw(s, ...ccwAt);
  if (extra) extra(s, P);
  return s.render();
}

/** A point-particle free-body diagram with +x / +y axes. */
function particle({
  title,
  desc,
  width = 460,
  height = 320,
  o = [230, 170],
  forces,
  axes = {},
  extra,
}) {
  const s = new Sketch({ width, height, title, desc });
  axesAt(s, ...o, { xPos: 170, xNeg: 170, yPos: 130, yNeg: 130, ...axes });
  for (const f of forces) {
    const fn = f.dashed ? comp : force;
    fn(s, ...o, f.a, f.len, f.label, f.opts ?? {});
  }
  s.dot(...o, { r: 6 });
  if (extra) extra(s, o);
  return s.render();
}

const WHY = 'counterclockwise torques are positive';

export default {
  // 9.2 Problem 1 — pushing a door open (top view)
  sketch_09_02_p01: () =>
    lever({
      title: 'Top view of the force that opens the door',
      desc: `Top view of the door, hinged at the origin. +x points along the door from the hinges; +y points in the direction of the push, perpendicular to the door. The push F = 55.0 N acts 0.850 m from the hinges, so it turns the door counterclockwise as seen from above (the opening direction), which is taken as positive.`,
      width: 600,
      height: 270,
      x0: 90,
      y: 180,
      scale: 400,
      bar: [0, 1.0],
      thick: 12,
      support: 'hinge',
      pivotLabel: 'hinges',
      forces: [{ at: 0.85, a: 90, len: 90, label: 'F = 55.0 \\rm{N}', tip: true, lab: [440, 262] }],
      dims: [{ from: 0, to: 0.85, label: '0.850 \\rm{m}' }],
      dimY: 250,
      axes: [490, 110],
      ccwAt: [130, 60],
      extra: s => s.note(300, 30, 'top view (looking down on the door)'),
    }),

  // 9.3 Problem 1 — horse leaning against a wall: torques about its feet
  sketch_09_03_p01: () => horseSketch(false),

  // 9.3 Problem 2 — children balanced on a seesaw
  sketch_09_03_p02: () =>
    lever({
      title: 'Free-body diagram of the balanced seesaw',
      desc: `The seesaw pivots at its center (the origin). +x points to the right and +y up, and ${WHY}. The 20.0-kg child sits r_1 to the left of the pivot, so the weight m_1 g gives a counterclockwise (positive) torque; the 30.0-kg child sits r_2 to the right, so m_2 g gives a clockwise (negative) torque. The children are 3.00 m apart.`,
      x0: 330,
      y: 160,
      scale: 150,
      bar: [-1.9, 1.5],
      forces: [
        { at: -1.8, a: 270, len: 60, label: 'm_1 g', lab: [330 - 1.8 * 150 + 10, 214] },
        { at: 1.2, a: 270, len: 80, label: 'm_2 g', lab: [330 + 1.2 * 150 + 10, 234] },
        { at: 0, a: 90, len: 90, label: 'N', tip: false, lab: [340, 80] },
      ],
      dims: [
        { from: -1.8, to: 0, label: 'r_1 = ?' },
        { from: 0, to: 1.2, label: 'r_2' },
        { from: -1.8, to: 1.2, label: '3.00 \\rm{m}', row: 1 },
      ],
      dimY: 262,
      pivotLabel: 'pivot',
      axes: [520, 90],
    }),

  // 9.3 Problem 3 — forces on the horse's feet
  sketch_09_03_p03: () => horseSketch(true),

  // 9.3 Problem 4 — carrying a plank
  sketch_09_03_p04: () =>
    lever({
      title: 'Free-body diagram of the plank held by two hands',
      desc: `The plank is 2.00 m long. The origin (pivot for torques) is at the left end, where F_1 pushes down. +x points along the plank and +y up, and ${WHY}. F_2 pushes up 0.500 m from the end (counterclockwise torque), and the weight W = 196 N acts down at the middle, 1.00 m from the end (clockwise torque).`,
      x0: 120,
      y: 150,
      scale: 220,
      bar: [0, 2],
      support: 'none',
      forces: [
        { at: 0, a: 270, len: 70, label: 'F_1', tip: true, lab: [130, 100] },
        { at: 0.5, a: 90, len: 100, label: 'F_2', lab: [240, 60] },
        { at: 1, a: 270, len: 60, label: 'W = 196 \\rm{N}', lab: [350, 206] },
      ],
      dims: [
        { from: 0, to: 0.5, label: '0.500 \\rm{m}' },
        { from: 0, to: 1, label: '1.00 \\rm{m}', row: 1 },
        { from: 0, to: 2, label: '2.00 \\rm{m}', row: 2 },
      ],
      dimY: 232,
      height: 330,
      axes: [560, 90],
      ccwAt: [440, 50],
      extra: s => s.note(120, 186, 'pivot', { anchor: 'middle' }),
    }),

  // 9.3 Problem 5 — wall held up by braces against the wind
  sketch_09_03_p05: () => {
    const s = new Sketch({
      width: 560,
      height: 360,
      title: 'Free-body diagram of the braced wall in the wind',
      desc: `Side view of the 17.0-m wall, pivoting at its base (the origin). +x points to the right (the direction the wind pushes) and +y up, and ${WHY}. The wind force F_wind acts along +x halfway up, 8.50 m above the base (clockwise torque). Each brace pushes on the wall at 8.50 m along the brace, 35.0° from the wall, up and to the left; its horizontal component F_B sin 35.0° points along −x (counterclockwise torque).`,
    });
    s.ground(40, 520, 320);
    const bx = 260;
    const H = 17;
    const k = 16;
    s.svg.rect(bx - 8, 320 - H * k, 16, H * k, { fill: '#e8dcd0', stroke: C.ground });
    pivot(s, bx, 320 - 2, { size: 10 });
    const yb = 320 - 8.5 * k;
    force(s, bx - 110, yb, 0, 102, 'F_{wind}', { at: [bx - 90, yb - 16] });
    const [ux, uy] = unit(-55);
    const foot = [bx + 8 + ux * 200, yb + uy * 200];
    s.svg.line(bx + 8, yb, ...foot, { color: C.ground, width: 6 });
    force(s, bx + 8, yb, 125, 80, 'F_B', { at: [bx - 50, yb - 70], anchor: 'end' });
    comp(s, bx + 8, yb + 14, 180, 46, 'F_B sin 35.0°', { at: [bx - 40, yb + 40] });
    s.ref(bx + 8, yb - 70, bx + 8, yb);
    s.angle(bx + 8, yb, 40, -90, -55, '35.0°', { lr: 58 });
    s.dim(bx + 60, 320, bx + 60, yb, '8.50 \\rm{m}', { off: 8 });
    s.note(bx, 320 + 22, 'pivot (base)');
    axesAt(s, 60, 90, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
    ccw(s, 140, 50);
    s.note(bx + 120, yb + 120, 'brace (one of 10)', { anchor: 'start' });
    return s.render();
  },

  // 9.3 Problem 6 — chicken held up by the wind
  sketch_09_03_p06: () => {
    const s = new Sketch({
      width: 560,
      height: 300,
      title: 'Free-body diagram of the chicken leaning into the wind',
      desc: `The chicken pivots about its foot (the origin). +x points to the right, the direction the wind blows, and +y up, and ${WHY}. The center of gravity is 9.0 cm to the left of the foot and 20 cm above it. The weight W, acting down at the center of gravity, gives a counterclockwise torque; the wind force F_wind, pushing along +x at the height of the center of gravity, gives a clockwise torque.`,
    });
    s.ground(60, 520, 260);
    const foot = [340, 260];
    const k = 9;
    const cg = [foot[0] - 9 * k, foot[1] - 20 * k];
    pivot(s, foot[0], foot[1] - 12, { size: 12 });
    s.svg.line(...foot, ...cg, { color: C.body, width: 2, dash: '5 4' });
    s.dot(...cg, { name: 'cg', nameDx: 0, nameDy: -16 });
    force(s, cg[0], cg[1], 270, 60, 'W = 24.5 \\rm{N}', {
      at: [cg[0] - 10, cg[1] + 56],
      anchor: 'end',
    });
    force(s, cg[0] - 120, cg[1], 0, 110, 'F_{wind}', { at: [cg[0] - 70, cg[1] - 16] });
    s.dim(cg[0], 286, foot[0], 286, '9.0 \\rm{cm}', { off: -10, size: 14 });
    s.ref(cg[0], cg[1] + 60, cg[0], 292);
    s.dim(foot[0] + 50, foot[1], foot[0] + 50, cg[1], '20 \\rm{cm}', { off: 8 });
    s.ref(cg[0] + 8, cg[1], foot[0] + 56, cg[1]);
    s.note(foot[0] + 14, foot[1] - 16, 'foot (pivot)', { anchor: 'start' });
    axesAt(s, 440, 90, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
    ccw(s, 60, 40);
    return s.render();
  },

  // 9.3 Problem 7 — drawbridge on its hinge and the far shore
  sketch_09_03_p07: () =>
    lever({
      title: 'Free-body diagram of the drawbridge resting on the far shore',
      desc: `The bridge pivots at its hinge (the origin). +x points from the hinge toward the opposite shore and +y up, and ${WHY}. The weight w acts down 1.5 m from the hinge (clockwise torque); the shore pushes up with F_shore 9.0 m from the hinge (counterclockwise torque); the hinge force F_hinge acts at the origin.`,
      x0: 90,
      y: 150,
      scale: 50,
      bar: [0, 9.3],
      support: 'hinge',
      forces: [
        { at: 1.5, a: 270, len: 80, label: 'w', lab: [174, 222] },
        { at: 9, a: 90, len: 50, label: 'F_{shore}', lab: [550, 96] },
        { at: 0, a: 90, len: 80, label: 'F_{hinge}', lab: [100, 76] },
      ],
      dims: [
        { from: 0, to: 1.5, label: '1.5 \\rm{m}' },
        { from: 0, to: 9, label: '9.0 \\rm{m}', row: 1 },
      ],
      dimY: 248,
      axes: [300, 90],
      ccwAt: [400, 50],
      extra: s => {
        s.note(90, 186, 'hinge');
        s.svg.rect(540, 160, 70, 140, { fill: '#e8dcd0', stroke: C.ground });
        s.note(575, 290, 'far shore');
      },
    }),

  // 9.3 Problem 8 — drawbridge with a car, held by cables
  sketch_09_03_p08: () =>
    lever({
      title: 'Free-body diagram of the drawbridge with a car, held by the cables',
      desc: `The bridge pivots at its hinge (the origin). +x points from the hinge toward the opposite shore and +y up, and ${WHY}. The bridge’s weight w_b acts down 1.50 m from the hinge and the car’s weight w_c 3.75 m from it (both clockwise torques). The cable tension T acts 9.00 m from the hinge, 40° above the horizontal and back toward the hinge (counterclockwise torque). The hinge force has components F_hx along +x and F_hy along +y.`,
      height: 340,
      x0: 90,
      y: 180,
      scale: 50,
      bar: [0, 9.3],
      support: 'hinge',
      forces: [
        { at: 1.5, a: 270, len: 70, label: 'w_b', lab: [174, 244] },
        { at: 3.75, a: 270, len: 50, label: 'w_c', lab: [286, 226] },
        { at: 9, a: 140, len: 110, label: 'T', lab: [470, 96] },
        { at: 0, a: 90, len: 80, label: 'F_{hy}', lab: [100, 106] },
        { at: 0, a: 0, len: 50, label: 'F_{hx}', lab: [120, 160] },
      ],
      dims: [
        { from: 0, to: 1.5, label: '1.50 \\rm{m}' },
        { from: 0, to: 3.75, label: '3.75 \\rm{m}', row: 1 },
        { from: 0, to: 9, label: '9.00 \\rm{m}', row: 2 },
      ],
      dimY: 262,
      axes: [300, 90],
      ccwAt: [400, 40],
      extra: s => {
        s.ref(540, 180, 600, 180);
        s.angle(540, 180, 40, 140, 180, '40°', { lr: 56 });
        box3(s, 277, 166);
      },
    }),

  // 9.3 Problem 9 — sandwich board: right half, chain intact
  sketch_09_03_p09: () => boardSketch(true),

  // 9.3 Problem 10 — sandwich board: left half, chain broken
  sketch_09_03_p10: () => boardSketch(false),

  // 9.3 Problem 11 — gymnast doing the splits
  sketch_09_03_p11: () =>
    lever({
      title: 'Free-body diagram of the gymnast doing the splits',
      desc: `The gymnast is treated as a rigid body, with torques taken about her left foot (the origin). +x points from the left foot toward the right foot and +y up, and ${WHY}. Her weight, 700 N, acts down 0.90 m from the left foot (clockwise torque); the floor pushes up on the right foot with N_R, 1.80 m from the left foot (counterclockwise torque), and on the left foot with N_L.`,
      x0: 120,
      y: 190,
      scale: 220,
      bar: [0, 1.8],
      support: 'none',
      forces: [
        { at: 0, a: 90, len: 70, label: 'N_L', lab: [130, 116] },
        { at: 1.8, a: 90, len: 70, label: 'N_R', lab: [526, 116] },
        { at: 0.9, a: 270, len: 70, label: 'w = 700 \\rm{N}', lab: [328, 252] },
      ],
      dims: [
        { from: 0, to: 0.9, label: '0.90 \\rm{m}' },
        { from: 0, to: 1.8, label: '1.80 \\rm{m}', row: 1 },
      ],
      dimY: 280,
      height: 350,
      axes: [470, 90],
      ccwAt: [160, 50],
      extra: s => {
        s.ground(80, 560, 196, { hatch: false });
        s.note(120, 214, 'left foot (pivot)');
        s.note(516, 214, 'right foot');
      },
    }),

  // 9.5 Problem 1 — nail puller
  sketch_09_05_p01: () => nailPuller(false),

  // 9.5 Problem 2 — lever under the mower
  sketch_09_05_p02: () =>
    lever({
      title: 'Free-body diagram of the lever lifting the mower',
      desc: `The 2.0-m lever pivots on the fulcrum (the origin). +x points from the mower end toward your hands and +y up, and ${WHY}. The mower pushes down on the left end with F_o = 2450 N at l_o (counterclockwise torque); you push down on the right end with F_i = 300 N at l_i (clockwise torque); l_o + l_i = 2.0 m.`,
      x0: 150,
      y: 150,
      scale: 210,
      bar: [-0.4, 1.8],
      forces: [
        {
          at: -0.4,
          a: 270,
          len: 80,
          label: 'F_o = 2450 \\rm{N}',
          tip: true,
          lab: [80, 60],
          anchor: 'start',
        },
        {
          at: 1.8,
          a: 270,
          len: 60,
          label: 'F_i = 300 \\rm{N}',
          tip: true,
          lab: [490, 80],
          anchor: 'middle',
        },
      ],
      dims: [
        { from: -0.4, to: 0, label: 'l_o = ?' },
        { from: 0, to: 1.8, label: 'l_i' },
        { from: -0.4, to: 1.8, label: '2.0 \\rm{m}', row: 1 },
      ],
      dimY: 230,
      height: 300,
      axes: [560, 210],
      ccwAt: [250, 50],
      extra: s => {
        s.note(150, 186, 'fulcrum');
        s.note(66, 186, 'mower', { anchor: 'middle' });
      },
    }),

  // 9.5 Problem 3 — wheelbarrow
  sketch_09_05_p03: () =>
    lever({
      title: 'Free-body diagram of the wheelbarrow',
      desc: `Torques are taken about the wheel’s axle (the origin). +x points from the handles toward the wheel and +y up, and ${WHY}. The weight w = 539 N acts down 5.50 cm to the left of the axle (counterclockwise torque); you lift with F_i at the handles, 1.02 m to the left of the axle (clockwise torque); the ground pushes up on the wheel with N.`,
      x0: 520,
      y: 160,
      scale: 380,
      bar: [-1.06, 0.06],
      support: 'none',
      forces: [
        { at: -1.02, a: 90, len: 60, label: 'F_i', lab: [142, 92] },
        { at: -0.055, a: 270, len: 80, label: 'w = 539 \\rm{N}', lab: [458, 236], anchor: 'end' },
        { at: 0, a: 90, len: 90, label: 'N', lab: [530, 76] },
      ],
      dims: [
        { from: -0.055, to: 0, label: '5.50 \\rm{cm}' },
        { from: -1.02, to: 0, label: '1.02 \\rm{m}', row: 1 },
      ],
      dimY: 262,
      height: 330,
      axes: [330, 70],
      ccwAt: [60, 40],
      extra: s => {
        s.svg.circle(520, 182, 22, { fill: 'none', stroke: C.body, width: 2 });
        s.svg.circle(520, 160, 3, { fill: C.body });
        s.note(560, 200, 'axle', { anchor: 'start' });
      },
    }),

  // 9.5 Problem 5 — vertical forces on the nail puller
  sketch_09_05_p05: () => nailPuller(true),

  // 9.5 Problem 6 — pulley system (a)
  sketch_09_05_p06: () =>
    pulleyFBDs({
      title: 'Free-body diagrams for the two-segment pulley',
      desc: 'Two free-body diagrams with +y up. Lower pulley and engine: two rope segments pull up, each with tension T, and the weight W = 1127 N pulls down. Upper pulley: the two segments to the lower pulley and the segment you pull straight down all pull down with T, and the ceiling pushes up with F_ceiling.',
      lower: { ups: 2, label: 'lower pulley + engine', w: 'W = 1127 \\rm{N}' },
      upper: { downs: 3, ups: 0, label: 'upper pulley', youDown: true },
    }),

  // 9.5 Problem 7 — pulley system (c), pulled upward
  sketch_09_05_p07: () =>
    pulleyFBDs({
      title: 'Free-body diagrams for the four-segment pulley pulled upward',
      desc: 'Two free-body diagrams with +y up. Lower block (engine and its pulleys): four rope segments pull up, each with tension T, and the weight W = 1196 N (engine plus pulleys) pulls down. Whole system (engine, pulleys, and rope): the ceiling pushes up with F_ceiling, your upward pull T acts along +y, and W pulls down.',
      lower: { ups: 4, label: 'engine + pulleys', w: 'W = 1196 \\rm{N}' },
      upper: { whole: true, label: 'whole system' },
    }),

  // 9.6 Problem 1 — forearm holding a book: forces
  sketch_09_06_p01: () =>
    forearm({
      title: 'Free-body diagram of the forearm holding a book',
      desc: `The forearm pivots at the elbow (the origin). +x points from the elbow toward the hand and +y up, and ${WHY}. The biceps pulls up with F_B = 470 N, 4.00 cm from the elbow; the forearm’s weight w_a = 24.5 N acts down at 16.0 cm and the book’s weight w_b = 39.2 N at 38.0 cm; the elbow joint pushes down on the forearm with F_E.`,
    }),

  // 9.6 Problem 2 — two muscles pull on the Achilles tendon
  sketch_09_06_p02: () =>
    particle({
      title: 'Vector diagram of the two muscle forces on the Achilles tendon',
      desc: 'Axes with +x to the right and +y up (along the leg). Each muscle pulls on the tendon with 200 N, one at 20° to the left of +y and one at 20° to the right of +y. Their x-components, −68.4 N and +68.4 N, cancel; their y-components add along +y.',
      o: [230, 230],
      axes: { yPos: 200, yNeg: 40, xNote: '', yNote: '(up the leg)' },
      height: 290,
      forces: [
        { a: 110, len: 160, label: '200 \\rm{N}' },
        { a: 70, len: 160, label: '200 \\rm{N}' },
      ],
      extra: (s, o) => {
        s.angle(...o, 70, 90, 110, '20°', { lr: 88 });
        s.angle(...o, 70, 70, 90, '20°', { lr: 88 });
        s.note(o[0] + 14, o[1] + 22, 'tendon', { anchor: 'start' });
      },
    }),

  // 9.6 Problem 3 — tendon forces on the kneecap
  sketch_09_06_p03: () =>
    particle({
      title: 'Vector diagram of the tendon forces on the kneecap',
      desc: 'Axes with +x to the right and +y up. Both tendon forces on the kneecap have magnitude 1250 N and point to the left (−x side): T_1 toward the quadriceps at 55° above the −x axis, and T_2 toward the lower leg at 75° below the −x axis. Their resultant F points 10° below −x (190° from +x).',
      width: 520,
      o: [330, 160],
      height: 330,
      axes: { xPos: 150, xNeg: 290, yPos: 140, yNeg: 150, xNote: '', yNote: '' },
      forces: [
        { a: 125, len: 130, label: 'T_1 = 1250 \\rm{N}' },
        { a: 255, len: 130, label: 'T_2 = 1250 \\rm{N}' },
        { a: 190, len: 110, label: 'F = ?', dashed: true },
      ],
      extra: (s, o) => {
        s.angle(...o, 50, 125, 180, '55°', { lr: 68 });
        s.angle(...o, 60, 180, 255, '75°', { lr: 76, dy: 10 });
        s.note(o[0] + 12, o[1] - 14, 'kneecap', { anchor: 'start' });
      },
    }),

  // 9.6 Problem 4 — leg-exercise machine: lower leg as a lever
  sketch_09_06_p04: () => {
    const s = new Sketch({
      width: 520,
      height: 330,
      title: 'Free-body diagram of the lower leg in the exercise machine',
      desc: `The lower leg is a vertical lever pivoting at the knee (the origin). +x points to the right and +y up, and ${WHY}. The muscle force F_M pulls along −x at r′⊥ = 2.0 cm above the pivot (counterclockwise torque); the machine’s tension T = 98 N pulls along −x at r⊥ = 35 cm below the pivot (clockwise torque).`,
    });
    const x = 330;
    const py = 90;
    const k = 6;
    s.svg.line(x, py - 30, x, py + 40 * k, { color: '#a9c2d9', width: 12, cap: 'round' });
    s.svg.line(x, py - 30, x, py + 40 * k, { color: C.body, width: 1.4 });
    s.svg.circle(x, py, 5, { fill: '#ffffff', stroke: C.axis, width: 2 });
    s.note(x + 16, py + 22, 'knee (pivot)', { anchor: 'start' });
    force(s, x, py - 2 * k, 180, 150, 'F_M', { at: [x - 160, py - 2 * k], anchor: 'end' });
    force(s, x, py + 35 * k, 180, 80, 'T = 98 \\rm{N}', {
      at: [x - 90, py + 35 * k],
      anchor: 'end',
    });
    s.dim(x + 40, py - 2 * k, x + 40, py, '', {});
    s.label(x + 50, py - 18, 'r′_⊥ = 2.0 \\rm{cm}', { anchor: 'start', size: 14 });
    s.dim(x + 40, py, x + 40, py + 35 * k, 'r_⊥ = 35 \\rm{cm}', { off: 8, size: 14 });
    axesAt(s, 60, 290, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
    ccw(s, 70, 40);
    s.note(330, 20, '(2.0 cm drawn larger for clarity)');
    return s.render();
  },

  // 9.6 Problem 5 — forces on the head at the drafting board
  sketch_09_06_p05: () =>
    particle({
      title: 'Vector diagram of the forces on the head',
      desc: 'Axes with +x to the right (toward the face) and +y up. All three forces act through the center of mass: the weight W = 50 N along −y; the muscle force F_M = 60 N at 33° below +x; and the unknown vertebral force F_V, up and to the left at an unknown angle θ above the −x axis.',
      width: 560,
      forces: [
        { a: 270, len: 80, label: 'W = 50 \\rm{N}' },
        { a: -33, len: 110, label: 'F_M = 60 \\rm{N}' },
        { a: 121.3, len: 130, label: 'F_V = ?', dashed: true },
      ],
      axes: { xNote: '(toward the face)', yNote: '(up)' },
      extra: (s, o) => {
        s.angle(...o, 54, -33, 0, '33°', { lr: 74 });
        s.angle(...o, 44, 121.3, 180, 'θ', { lr: 60 });
      },
    }),

  // 9.6 Problem 6 — forearm lowered to 30° below the horizontal
  sketch_09_06_p06: () =>
    forearm({
      tilt: -30,
      title: 'Free-body diagram of the forearm lowered 30° below the horizontal',
      desc: `The forearm pivots at the elbow (the origin) and points 30° below the horizontal. +x points to the right and +y up, and ${WHY}. As in Figure 1, the biceps force F_B is vertical (up, 4.00 cm along the forearm) and the weights w_a (at 16.0 cm) and w_b (at 38.0 cm) are vertical (down). The perpendicular lever arm of each vertical force is its distance along the forearm times cos 30°.`,
    }),

  // 9.6 Problem 7 — head held erect
  sketch_09_06_p07: () =>
    lever({
      title: 'Free-body diagram of the head held erect',
      desc: `Torques are taken about the atlanto-occipital joint (the origin), with the face to the right. +x points toward the face and +y up, and ${WHY}. The weight W = 50 N acts down 2.5 cm in front of the pivot (clockwise torque); the neck muscles pull down with F_m 5.0 cm behind it (counterclockwise torque); the joint pushes up with F_J at the pivot.`,
      x0: 310,
      y: 160,
      scale: 34,
      bar: [-5.6, 3.1],
      forces: [
        { at: -5, a: 270, len: 60, label: 'F_m', lab: [146, 222] },
        { at: 2.5, a: 270, len: 90, label: 'W = 50 \\rm{N}', lab: [405, 250] },
        { at: 0, a: 90, len: 90, label: 'F_J', lab: [320, 80] },
      ],
      dims: [
        { from: -5, to: 0, label: '5.0 \\rm{cm}' },
        { from: 0, to: 2.5, label: '2.5 \\rm{cm}' },
      ],
      dimY: 280,
      height: 310,
      axes: [470, 80],
      ccwAt: [90, 50],
      extra: s => s.note(310, 196, 'pivot'),
    }),

  // 9.6 Problem 8 — standing on the toes
  sketch_09_06_p08: () =>
    lever({
      title: 'Free-body diagram of the foot when standing on the toes',
      desc: `Torques are taken about the ankle pivot (the origin), with the toes to the right. +x points toward the toes and +y up, and ${WHY}. The Achilles tendon pulls up with F_A, 4.0 cm behind the pivot (clockwise torque); the floor pushes up on the ball of the foot with N = 735 N, 12 cm in front of it (counterclockwise torque); the pivot force F_P on the foot points down.`,
      x0: 230,
      y: 170,
      scale: 22,
      bar: [-5, 13],
      support: 'none',
      forces: [
        { at: -4, a: 90, len: 90, label: 'F_A', lab: [150, 90] },
        { at: 12, a: 90, len: 60, label: 'N = 735 \\rm{N}', lab: [500, 104] },
        { at: 0, a: 270, len: 100, label: 'F_P', lab: [240, 270] },
      ],
      dims: [
        { from: -4, to: 0, label: '4.0 \\rm{cm}' },
        { from: 0, to: 12, label: '12 \\rm{cm}' },
      ],
      dimY: 214,
      height: 310,
      axes: [40, 290],
      ccwAt: [300, 50],
      extra: s => {
        s.svg.polygon(
          [
            [230, 170],
            [221, 156],
            [239, 156],
          ],
          { fill: '#999999', stroke: C.axis, width: 1.2 }
        );
        s.note(244, 150, 'ankle (pivot)', { anchor: 'start' });
      },
    }),

  // 9.6 Problem 9 — father lifting his child with his leg
  sketch_09_06_p09: () =>
    lever({
      title: 'Free-body diagram of the lower leg lifting the child',
      desc: `The lower leg pivots at the knee (the origin). +x points from the knee toward the foot and +y up, and ${WHY}. The quadriceps force F_Q acts 2.0 cm from the knee (perpendicular lever arm) and gives a counterclockwise torque; the leg’s weight w_leg = 39.2 N acts down at 20.0 cm and the child’s weight w_child = 98 N at 38.0 cm (clockwise torques).`,
      x0: 120,
      y: 140,
      scale: 11,
      bar: [-1, 42],
      support: 'hinge',
      forces: [
        { at: 2, a: 110, len: 100, label: 'F_Q', lab: [96, 40] },
        { at: 20, a: 270, len: 60, label: 'w_{leg}', lab: [350, 196] },
        { at: 38, a: 270, len: 90, label: 'w_{child}', lab: [550, 226] },
      ],
      dims: [
        { from: 0, to: 2, label: '' },
        { from: 0, to: 20, label: '20.0 \\rm{cm}', row: 1 },
        { from: 0, to: 38, label: '38.0 \\rm{cm}', row: 2 },
      ],
      dimY: 200,
      height: 300,
      width: 660,
      axes: [580, 70],
      ccwAt: [240, 40],
      extra: s => {
        s.note(120, 166, 'knee');
        s.label(112, 204, '2.0 \\rm{cm}', { size: 13, anchor: 'end' });
      },
    }),

  // 9.6 Problem 10 — masseter muscle and the bullet
  sketch_09_06_p10: () =>
    lever({
      title: 'Free-body diagram of the jaw biting the bullet',
      desc: `The jaw pivots at the jaw joint (the origin), with the teeth to the right. +x points toward the teeth and +y up, and ${WHY}. The masseter pulls up with F_M = 200 N, 2.9 cm from the joint (counterclockwise torque); the bullet pushes down on the teeth with F_T, 5.0 cm from the joint (clockwise torque); the joint pushes down with F_J.`,
      x0: 140,
      y: 160,
      scale: 70,
      bar: [0, 5.4],
      support: 'hinge',
      forces: [
        { at: 2.9, a: 90, len: 100, label: 'F_M = 200 \\rm{N}', lab: [355, 70] },
        { at: 5, a: 270, len: 70, label: 'F_T', lab: [500, 226] },
        { at: 0, a: 270, len: 60, label: 'F_J', lab: [150, 216] },
      ],
      dims: [
        { from: 0, to: 2.9, label: '2.9 \\rm{cm}' },
        { from: 0, to: 5, label: '5.0 \\rm{cm}', row: 1 },
      ],
      dimY: 250,
      height: 320,
      axes: [560, 90],
      ccwAt: [60, 50],
      extra: s => s.note(140, 140, 'jaw joint'),
    }),

  // 9.6 Problem 12 — push-up: forces on the hands
  sketch_09_06_p12: () =>
    lever({
      title: 'Free-body diagram of the push-up',
      desc: `The body is a rigid lever pivoting at the toes (the origin). +x points from the feet toward the head and +y up, and ${WHY}. Her weight W = 490 N acts down 0.90 m from the toes (clockwise torque); the floor pushes up on the two hands with a total of 2F_hand, 1.50 m from the toes (counterclockwise torque).`,
      x0: 90,
      y: 190,
      scale: 230,
      tilt: 10,
      bar: [0, 1.75],
      forces: [
        { at: 0.9, a: 270, len: 60, label: 'W = 490 \\rm{N}', lab: [310, 210] },
        { at: 1.5, a: 90, len: 90, label: '2F_{hand}', lab: [440, 50] },
      ],
      dims: [
        { from: 0, to: 0.9, label: '0.90 \\rm{m}' },
        { from: 0, to: 1.5, label: '1.50 \\rm{m}', row: 1 },
      ],
      dimY: 250,
      height: 320,
      width: 600,
      axes: [520, 210],
      ccwAt: [120, 50],
      extra: s => s.note(90, 230, 'toes (pivot)'),
    }),

  // 9.6 Problem 13 — ball hits a palm tree
  sketch_09_06_p13: () => {
    const s = new Sketch({
      width: 520,
      height: 360,
      title: 'Free-body diagram of the palm tree struck by the ball',
      desc: `The tree pivots about its base at ground level (the origin). +x points in the direction the ball was moving and +y up, and ${WHY}. The ball pushes the top of the tree along +x with F_ball = 250 N, 2.0 m above the base (clockwise torque); the soil pushes the root tip along +x with F_root, 0.20 m below the base (counterclockwise torque).`,
    });
    const bx = 230;
    const gy = 270;
    const k = 110;
    s.ground(60, 470, gy);
    s.svg.line(bx, gy + 0.2 * k, bx, gy - 2 * k, { color: '#8d6e63', width: 10, cap: 'round' });
    pivot(s, bx + 14, gy - 2, { size: 0 });
    s.svg.circle(bx, gy, 4, { fill: C.axis });
    s.note(bx - 14, gy - 10, 'base (pivot)', { anchor: 'end' });
    force(s, bx - 100, gy - 2 * k, 0, 94, 'F_{ball} = 250 \\rm{N}', {
      at: [bx - 60, gy - 2 * k - 18],
    });
    force(s, bx - 80, gy + 0.2 * k, 0, 74, 'F_{root}', {
      at: [bx - 90, gy + 0.2 * k],
      anchor: 'end',
    });
    s.dim(bx + 50, gy, bx + 50, gy - 2 * k, '2.0 \\rm{m}', { off: 8 });
    s.dim(bx + 50, gy, bx + 50, gy + 0.2 * k, '', {});
    s.label(bx + 60, gy + 12, '0.20 \\rm{m}', { anchor: 'start', size: 14 });
    axesAt(s, 400, 210, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
    ccw(s, 340, 40);
    return s.render();
  },

  // 9.6 Problem 14 — seesaw with an impossible seat
  sketch_09_06_p14: () =>
    lever({
      title: 'Free-body diagram of the seesaw with the second child off the end',
      desc: `The 3.00-m seesaw pivots at its center (the origin), so each side is 1.50 m long. +x points to the right and +y up, and ${WHY}. The 30.0-kg child sits 1.40 m to the left of the pivot (counterclockwise torque); the 18.0-kg child would have to sit r_2 to the right (clockwise torque), beyond the 1.50-m end of the board.`,
      x0: 300,
      y: 160,
      scale: 110,
      bar: [-1.5, 1.5],
      forces: [
        { at: -1.4, a: 270, len: 80, label: 'm_1 g', lab: [146, 236] },
        { at: 2.33, a: 270, len: 50, label: 'm_2 g', lab: [566, 206] },
      ],
      dims: [
        { from: -1.4, to: 0, label: '1.40 \\rm{m}' },
        { from: 0, to: 2.33, label: 'r_2 = ?' },
        { from: -1.5, to: 1.5, label: '3.00 \\rm{m}', row: 1 },
      ],
      dimY: 262,
      height: 320,
      width: 640,
      axes: [520, 70],
      ccwAt: [100, 50],
      extra: s => {
        s.note(300, 196, 'pivot');
        s.dot(300 + 2.33 * 110, 160, { open: true, r: 6 });
        s.note(556, 140, 'off the board?', { anchor: 'middle' });
      },
    }),
};

/** A small car on the bridge, centered at (x, y) on the deck. */
function box3(s, x, y) {
  s.svg.rect(x - 22, y - 12, 44, 14, { fill: '#d6e4f0', stroke: C.body, width: 1.5, rx: 3 });
  s.note(x + 30, y - 18, 'car', { anchor: 'start' });
}

/** Horse leaning on the wall (9.3 Problems 1 and 3). */
function horseSketch(feet) {
  const s = new Sketch({
    width: 640,
    height: 340,
    title: feet
      ? 'Free-body diagram of the forces on the horse and on each foot'
      : 'Free-body diagram of the horse leaning on the wall',
    desc: feet
      ? 'Rear view with the wall on the left. +x points away from the wall and +y up. On the horse and rider: the wall pushes along +x with F_wall = 1.43 × 10³ N, 1.2 m up; the weight w = 4900 N acts down; each of the two feet on the ground gets N_foot along +y and friction f_foot along −x, toward the wall. The force on each foot, F_foot, is the sum of N_foot and f_foot, tilted from the vertical toward the wall by θ.'
      : `Rear view with the wall on the left. Torques are taken about the horse’s feet (the origin). +x points away from the wall and +y up, and ${WHY}. The weight w = 4900 N acts down 0.35 m from the feet, on the wall side (counterclockwise torque); the wall pushes horizontally along +x with F_wall, 1.2 m above the ground (clockwise torque).`,
  });
  const gy = 300;
  const fx = 330;
  const k = 150;
  s.ground(80, 540, gy);
  s.svg.rect(70, 40, 20, gy - 40, { fill: '#e8dcd0', stroke: C.ground });
  s.note(80, 30, 'wall');
  const cg = [fx - 0.35 * k, gy - 1.4 * k];
  s.svg.ellipse(cg[0] + 10, cg[1], 70, 50, { fill: '#eef2f6', stroke: '#9aa7b4', width: 1.5 });
  s.svg.line(fx - 10, gy, cg[0] + 20, cg[1] + 40, { color: '#9aa7b4', width: 6 });
  s.svg.line(fx + 10, gy, cg[0] + 30, cg[1] + 40, { color: '#9aa7b4', width: 6 });
  s.dot(...cg, { name: 'cg', nameDx: -24, nameDy: -10 });
  force(s, 90, gy - 1.2 * k, 0, 70, 'F_{wall}', { at: [110, gy - 1.2 * k - 18], anchor: 'start' });
  force(s, cg[0], cg[1], 270, 90, 'w', { at: [cg[0] - 10, cg[1] + 80], anchor: 'end' });
  if (feet) {
    force(s, fx, gy, 90, 70, null);
    s.label(fx + 8, gy - 60, 'N_{foot} (each)', { color: K.force, anchor: 'start', size: 15 });
    force(s, fx, gy, 180, 34, null);
    s.label(fx - 38, gy + 18, 'f_{foot}', { color: K.force, size: 15 });
    comp(s, fx, gy, 106.3, 73, null);
    s.label(fx - 30, gy - 86, 'F_{foot}', { color: K.comp, size: 15 });
    s.angle(fx, gy, 40, 90, 106.3, 'θ', { lr: 54 });
  } else {
    s.svg.polygon(
      [
        [fx, gy],
        [fx - 8, gy + 12],
        [fx + 8, gy + 12],
      ],
      { fill: '#999999', stroke: C.axis, width: 1.2 }
    );
    s.note(fx + 14, gy - 8, 'feet (pivot)', { anchor: 'start' });
    s.dim(cg[0], gy + 26, fx, gy + 26, '0.35 \\rm{m}', { off: -9, size: 14 });
    s.dim(150, gy, 150, gy - 1.2 * k, '1.2 \\rm{m}', { off: 8, size: 14 });
    ccw(s, 420, 60);
  }
  axesAt(s, 440, 160, { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0, xNote: '(away from wall)' });
  return s.render();
}

/** One half of the sandwich board (9.3 Problems 9 and 10). */
function boardSketch(chain) {
  const s = new Sketch({
    width: 560,
    height: 400,
    title: chain
      ? 'Free-body diagram of the right half of the sandwich board'
      : 'Free-body diagram of the left half of the sandwich board, chain broken',
    desc: chain
      ? `Right half of the sign, with torques taken about the hinge (the origin) at the top. +x points to the right (outward) and +y up, and ${WHY}. The foot is 0.550 m right of and 1.30 m below the hinge; the ground pushes up there with N = 39.2 N (counterclockwise torque). The half’s weight w/2 = 39.2 N acts down 0.275 m right of the hinge, and the chain pulls along −x with T, 0.500 m below the hinge (both clockwise torques). The other half pushes on the hinge along +x.`
      : `Left half of the sign with the chain broken, torques taken about its foot (the origin). +x points to the right (toward the center) and +y up, and ${WHY}. The weight W = 39.2 N acts down 0.275 m right of the foot (clockwise torque); the other half pushes horizontally along −x on the hinge, 1.30 m above the foot (counterclockwise torque); friction f on the foot points along +x and N along +y.`,
  });
  const k = 180;
  const gy = 320;
  s.ground(40, 520, gy);
  if (chain) {
    const H = [200, gy - 1.3 * k];
    const F = [H[0] + 0.55 * k, gy];
    s.svg.line(...H, ...F, { color: '#a9c2d9', width: 12, cap: 'round' });
    s.svg.line(H[0], H[1], H[0] - 0.55 * k, gy, { color: '#dddddd', width: 8 });
    hinge(s, ...H);
    const cgp = [H[0] + 0.275 * k, H[1] + 0.65 * k];
    const ch = [H[0] + (0.5 / 1.3) * 0.55 * k, H[1] + 0.5 * k];
    force(s, ...F, 90, 70, 'N', { at: [F[0] + 10, F[1] - 60], anchor: 'start' });
    force(s, ...cgp, 270, 60, 'w/2', { at: [cgp[0] + 10, cgp[1] + 50], anchor: 'start' });
    force(s, ...ch, 180, 70, 'T', { at: [ch[0] - 80, ch[1] - 6], anchor: 'end' });
    force(s, ...H, 0, 60, 'F_{hinge}', { at: [H[0] + 66, H[1] - 6], anchor: 'start' });
    s.dim(H[0], gy + 22, F[0], gy + 22, '0.550 \\rm{m}', { off: -9, size: 14 });
    s.dim(470, H[1], 470, gy, '1.30 \\rm{m}', { off: 8, size: 14 });
    s.dim(130, H[1], 130, ch[1], '0.500 \\rm{m}', { off: -60, size: 14 });
    s.ref(H[0] + 8, H[1], 476, H[1]);
    s.ref(130, ch[1], ch[0], ch[1]);
    s.note(H[0] - 14, H[1] - 14, 'hinge (pivot)', { anchor: 'end' });
    ccw(s, 360, 40);
  } else {
    const Fo = [150, gy];
    const H = [Fo[0] + 0.55 * k, gy - 1.3 * k];
    s.svg.line(...Fo, ...H, { color: '#a9c2d9', width: 12, cap: 'round' });
    s.svg.line(H[0], H[1], H[0] + 0.55 * k, gy, { color: '#dddddd', width: 8 });
    const cgp = [Fo[0] + 0.275 * k, gy - 0.65 * k];
    force(s, ...cgp, 270, 60, 'W', { at: [cgp[0] + 10, cgp[1] + 50], anchor: 'start' });
    force(s, ...H, 180, 60, 'F_{h}', { at: [H[0] - 66, H[1] - 8], anchor: 'end' });
    force(s, ...Fo, 90, 70, 'N', { at: [Fo[0] - 10, Fo[1] - 60], anchor: 'end' });
    force(s, ...Fo, 0, 50, 'f', { at: [Fo[0] + 54, Fo[1] - 12], anchor: 'start' });
    s.svg.polygon(
      [
        [Fo[0], gy],
        [Fo[0] - 8, gy + 12],
        [Fo[0] + 8, gy + 12],
      ],
      { fill: '#999999', stroke: C.axis, width: 1.2 }
    );
    s.note(Fo[0], gy + 30, 'foot (pivot)');
    s.dim(Fo[0], gy + 50, cgp[0], gy + 50, '0.275 \\rm{m}', { off: -9, size: 14 });
    s.ref(cgp[0], cgp[1] + 60, cgp[0], gy + 56);
    s.dim(480, H[1], 480, gy, '1.30 \\rm{m}', { off: 8, size: 14 });
    s.ref(H[0] + 8, H[1], 486, H[1]);
    s.note(H[0] + 14, H[1] - 14, 'hinge', { anchor: 'start' });
    ccw(s, 60, 40);
  }
  axesAt(s, ...(chain ? [40, 200] : [440, 110]), { xPos: 46, xNeg: 0, yPos: 46, yNeg: 0 });
  return s.render();
}

/** Nail puller (9.5 Problems 1 and 5), oriented as in Figure 1. */
function nailPuller(withWeight) {
  return lever({
    title: withWeight
      ? 'Free-body diagram of the vertical forces on the nail puller'
      : 'Free-body diagram of the nail puller',
    desc: withWeight
      ? 'Vertical forces on the nail puller, with +y up. Your hand pushes down with F_i = 50 N at the handle; the nail pushes down on the claw with F_n = 1250 N (the reaction to the 1250-N pull on the nail); the puller’s weight W = 20.6 N acts down; the supporting surface pushes up at the pivot with N.'
      : `The nail puller pivots where it rests on the board (the origin), with the handle to the left. +x points from the handle toward the claw and +y up, and ${WHY}. Your hand pushes down with F_i at l_i = 45 cm from the pivot (counterclockwise torque); the nail pushes down on the claw with F_n at l_o = 1.8 cm on the other side (clockwise torque). The puller in turn pulls up on the nail with F_o = 1250 N.`,
    x0: 470,
    y: 160,
    scale: 9,
    bar: [-46, 3],
    forces: withWeight
      ? [
          { at: -45, a: 270, len: 60, label: 'F_i = 50 \\rm{N}', tip: true, lab: [74, 80] },
          { at: 1.8, a: 270, len: 90, label: 'F_n = 1250 \\rm{N}', tip: true, lab: [494, 50] },
          { at: -20, a: 270, len: 40, label: 'W', lab: [298, 216] },
          { at: 0, a: 90, len: 70, label: 'N', tip: true, lab: [456, 234], anchor: 'end' },
        ]
      : [
          { at: -45, a: 270, len: 60, label: 'F_i', tip: true, lab: [74, 80] },
          { at: 1.8, a: 270, len: 90, label: 'F_n', tip: true, lab: [494, 50] },
        ],
    dims: withWeight
      ? []
      : [
          { from: -45, to: 0, label: 'l_i = 45 \\rm{cm}', row: 1 },
          { from: 0, to: 1.8, label: '' },
        ],
    dimY: 214,
    height: withWeight ? 290 : 340,
    width: 620,
    axes: withWeight ? [540, 260] : [300, 320],
    ccwAt: withWeight ? null : [200, 50],
    extra: s => {
      s.note(470, 196, 'pivot');
      if (!withWeight) s.label(500, 214, 'l_o = 1.8 \\rm{cm}', { anchor: 'start', size: 14 });
      s.note(60, 186, 'handle', { anchor: 'start' });
      s.note(560, 160, 'claw', { anchor: 'start' });
    },
  });
}

/** Forearm with the book (9.6 Problems 1 and 6). */
function forearm({ title, desc, tilt = 0 }) {
  const c = Math.cos((tilt * Math.PI) / 180);
  return lever({
    title,
    desc,
    x0: 100,
    y: tilt ? 110 : 160,
    scale: 11,
    tilt,
    bar: [-1, 40],
    support: 'hinge',
    forces: [
      {
        at: 4,
        a: 90,
        len: 90,
        label: 'F_B = 470 \\rm{N}',
        lab: [100 + 4 * 11 * c + 10, (tilt ? 110 : 160) - 70],
      },
      {
        at: 16,
        a: 270,
        len: 40,
        label: 'w_a',
        lab: [100 + 16 * 11 * c + 10, (tilt ? 110 + 16 * 11 * 0.5 : 160) + 40],
      },
      {
        at: 38,
        a: 270,
        len: 55,
        label: 'w_b',
        lab: [100 + 38 * 11 * c + 10, (tilt ? 110 + 38 * 11 * 0.5 : 160) + 50],
      },
      { at: 0, a: 270, len: 70, label: 'F_E', lab: [80, (tilt ? 110 : 160) + 70], anchor: 'end' },
    ],
    dims: [
      { from: 0, to: 4, label: '' },
      { from: 0, to: 16, label: tilt ? '(16.0 \\rm{cm}) cos 30°' : '16.0 \\rm{cm}', row: 1 },
      { from: 0, to: 38, label: tilt ? '(38.0 \\rm{cm}) cos 30°' : '38.0 \\rm{cm}', row: 2 },
    ],
    dimY: tilt ? 330 : 250,
    height: tilt ? 420 : 340,
    width: 620,
    axes: [520, tilt ? 80 : 90],
    ccwAt: [300, 40],
    extra: s => {
      s.note(100, (tilt ? 110 : 160) - 18, 'elbow', { anchor: 'end' });
      s.label(
        100 + 4 * 11 * c + 8,
        (tilt ? 330 : 250) + 2,
        tilt ? '(4.00 \\rm{cm}) cos 30°' : '4.00 \\rm{cm}',
        { anchor: 'start', size: 13 }
      );
    },
  });
}

/** Two point free-body diagrams side by side for the pulley problems. */
function pulleyFBDs({ title, desc, lower, upper }) {
  const s = new Sketch({ width: 620, height: 340, title, desc });
  axesAt(s, 40, 300, { xPos: 0.01, xNeg: 0, yPos: 50, yNeg: 0, noX: true, yNote: '(up)' });
  caption(s, 70, 26, lower.label);
  const o1 = [170, 170];
  const n = lower.ups;
  for (let i = 0; i < n; i += 1) {
    const dx = (i - (n - 1) / 2) * 16;
    force(s, o1[0] + dx, o1[1], 90, 90, null);
  }
  s.label(o1[0] + 8 * n + 8, o1[1] - 80, `${n}T`, { color: K.force, anchor: 'start' });
  force(s, ...o1, 270, 110, lower.w, { at: [o1[0] + 10, o1[1] + 104], anchor: 'start' });
  s.dot(...o1, { r: 6 });
  divider(s, 330, 20, 320);
  caption(s, 350, 26, upper.label);
  const o2 = [470, 170];
  if (upper.whole) {
    force(s, o2[0] - 8, o2[1], 90, 100, 'F_{ceiling}', {
      at: [o2[0] - 16, o2[1] - 96],
      anchor: 'end',
    });
    force(s, o2[0] + 8, o2[1], 90, 30, 'T', { at: [o2[0] + 16, o2[1] - 30], anchor: 'start' });
    s.note(o2[0] + 16, o2[1] - 12, '(your pull)', { anchor: 'start' });
    force(s, ...o2, 270, 110, 'W', { at: [o2[0] + 10, o2[1] + 104], anchor: 'start' });
  } else {
    force(s, ...o2, 90, 110, 'F_{ceiling}', { at: [o2[0] + 10, o2[1] - 100], anchor: 'start' });
    for (let i = 0; i < upper.downs; i += 1) {
      force(s, o2[0] + (i - 1) * 16, o2[1], 270, 50, null);
    }
    s.label(o2[0] + 36, o2[1] + 44, '3T', { color: K.force, anchor: 'start' });
    s.note(o2[0], o2[1] + 96, '(2 segments + your pull)');
  }
  s.dot(...o2, { r: 6 });
  return s.render();
}
