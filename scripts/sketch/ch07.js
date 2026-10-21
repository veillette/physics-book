import { C, Sketch } from './sketch.js';
import {
  acc,
  axesAt,
  box,
  caption,
  ccw,
  comp,
  disp,
  divider,
  force,
  hAxis,
  K,
  pivot,
  ramp,
  spring,
  vel,
  wall,
} from './mechanics.js';

export default {
  // 7.1 Problem 3 — elevator car lifted 40.0 m at constant speed
  sketch_07_01_p03: () => {
    const s = new Sketch({
      width: 460,
      height: 340,
      title: 'Sketch of the elevator car lifted at constant speed',
      desc: 'A vertical +y axis points up, with the origin at the car’s starting position and a tick at 40.0 m. The car rises 40.0 m: the displacement d points along +y. Forces on the car: cable tension T along +y, weight w = mg and friction f along −y. The speed is constant, so a = 0.',
    });
    s.axis(70, 325, 70, 34, {
      label: '+y',
      note: '(up)',
      origin: [70, 240],
      ticks: [[70, 80, '40.0 \\rm{m}']],
    });
    s.svg.line(152, 40, 152, 300, { color: C.ground, width: 1.5 });
    s.svg.line(248, 40, 248, 300, { color: C.ground, width: 1.5 });
    s.ref(76, 80, 160, 80);
    box(s, 200, 80, 70, 50, 0, { fill: '#ffffff' });
    s.note(200, 84, 'after');
    box(s, 200, 240, 70, 50, 0);
    s.note(200, 244, 'car');
    force(s, 200, 215, 90, 55, 'T', { at: [212, 168], anchor: 'start' });
    force(s, 186, 265, 270, 48, 'w = mg', { at: [178, 306], anchor: 'end' });
    force(s, 216, 265, 270, 28, 'f', { at: [226, 290], anchor: 'start' });
    disp(s, 300, 240, 90, 160, 'd = 40.0 \\rm{m}', { at: [310, 160], anchor: 'start' });
    s.label(340, 40, 'a = 0', { color: K.acc, anchor: 'start' });
    s.note(340, 60, '(constant speed)', { anchor: 'start' });
    return s.render();
  },

  // 7.1 Problem 5 — man pushes a crate 4.00 m up a 20.0° ramp
  sketch_07_01_p05: () => {
    const s = new Sketch({
      width: 620,
      height: 300,
      title: 'Sketch of the crate pushed up the ramp',
      desc: 'A ramp rises at 20.0° to the right. +x points up the ramp, the direction of the push and of the motion; a vertical +y axis (up) measures height, with 0 at the bottom of the ramp and 1.37 m at the top. The crate moves d = 4.00 m along +x while the man pushes it with F = 500 N, also along +x. Both the crate and the man rise h = d sin 20.0° = 1.37 m.',
    });
    const P = ramp(s, 60, 250, 380, 20);
    s.angle(60, 250, 44, 0, 20, '20.0°', { lr: 64 });
    box(s, ...P(30, 18), 40, 34, 20, { fill: '#ffffff' });
    box(s, ...P(372, 18), 40, 34, 20, { fill: '#ffffff' });
    const crate = P(220, 18);
    box(s, ...crate, 40, 34, 20, { name: 'crate', nameDy: -30 });
    s.dot(...P(165, 10), { name: 'man', nameDy: -18 });
    force(s, crate[0] + 20, crate[1] - 7, 20, 70, 'F = 500 \\rm{N}', {
      at: [crate[0] + 70, crate[1] + 22],
    });
    disp(s, ...P(30, 72), 20, 342, null);
    s.label(...P(200, 92), 'd = 4.00 \\rm{m}', { color: K.disp });
    axesAt(s, 70, 70, { angle: 20, xPos: 80, xNeg: 0, noY: true, xNote: '(up the ramp)' });
    s.axis(520, 270, 520, 60, { label: '+y', note: '(up)', origin: [520, 250] });
    s.svg.line(515, 112, 525, 112, { color: C.axis, width: 1.6 });
    s.label(530, 112, 'h = 1.37 \\rm{m}', { size: 14, color: C.axis, anchor: 'start' });
    s.ref(440, 112, 514, 112);
    return s.render();
  },

  // 7.1 Problem 6 — boy pulls the wagon at 30.0° above the horizontal
  sketch_07_01_p06: () => {
    const s = new Sketch({
      width: 500,
      height: 270,
      title: 'Sketch of the wagon pulled at an angle',
      desc: 'Axes with +x horizontal in the direction of motion and +y up. The pull F = 50.0 N points 30.0° above +x; its x-component F cos 30.0° lies along +x. The displacement d = 30.0 m lies along +x.',
    });
    s.ground(60, 360, 200, { hatch: false });
    s.axes2(60, 240, {
      xNeg: 0,
      xPos: 300,
      yNeg: 0,
      yPos: 190,
      xNote: '(direction of motion)',
      yNote: '(up)',
    });
    box(s, 180, 183, 74, 30, 0, { name: 'wagon and child', nameDy: -26 });
    const [ox, oy] = [217, 175];
    s.ref(ox, oy, ox + 120, oy);
    comp(s, ox, oy, 0, 95, 'F cos 30.0°', { at: [ox + 50, oy + 16] });
    force(s, ox, oy, 30, 115, 'F = 50.0 \\rm{N}');
    s.angle(ox, oy, 40, 0, 30, '30.0°', { lr: 58 });
    disp(s, 150, 60, 0, 240, 'd = 30.0 \\rm{m}', { at: [270, 44] });
    return s.render();
  },

  // 7.1 Problem 7 — shopper pushes a cart 25.0° below the horizontal
  sketch_07_01_p07: () => {
    const s = new Sketch({
      width: 500,
      height: 300,
      title: 'Sketch of the grocery cart pushed downward at an angle',
      desc: 'Axes with +x horizontal in the direction of motion and +y up. The shopper’s push F points 25.0° below +x. Friction f = 35.0 N points along −x, the weight w along −y, and the normal force N along +y. The displacement d = 20.0 m lies along +x; the speed is constant.',
    });
    s.ground(60, 360, 210, { hatch: false });
    s.axes2(60, 260, {
      xNeg: 0,
      xPos: 300,
      yNeg: 0,
      yPos: 215,
      xNote: '(direction of motion)',
      yNote: '(up)',
    });
    box(s, 270, 190, 76, 36, 0, { name: 'cart', nameDy: -46 });
    // The push arrives at the back of the cart, pointing 25.0° below +x.
    const tail = [141, 130];
    force(s, ...tail, -25, 100, null);
    s.label(tail[0] - 6, tail[1] - 10, 'F', { color: K.force, anchor: 'end' });
    s.ref(tail[0], tail[1], tail[0] + 80, tail[1]);
    s.angle(tail[0], tail[1], 52, -25, 0, '25.0°', { lr: 70, dy: 4 });
    force(s, 232, 205, 180, 60, 'f = 35.0 \\rm{N}', { at: [200, 230], anchor: 'end' });
    force(s, 286, 172, 90, 50, 'N', { at: [296, 126], anchor: 'start' });
    force(s, 254, 208, 270, 40, 'w', { at: [246, 240], anchor: 'end' });
    disp(s, 160, 70, 0, 230, 'd = 20.0 \\rm{m}', { at: [275, 54] });
    return s.render();
  },

  // 7.1 Problem 8 — rescue sled lowered down a 60.0° slope
  sketch_07_01_p08: () => {
    const s = new Sketch({
      width: 620,
      height: 330,
      title: 'Sketch of the rescue sled lowered down the slope',
      desc: 'A 60.0° slope descends to the right. Tilted axes: +x points down the slope, the direction of motion, and +y points perpendicular to the slope, away from it. Forces on the sled: rope tension T and friction f point up the slope (−x), the normal force N along +y, and the weight w straight down, whose component along +x is mg sin 60.0°. The displacement d = 30.0 m points along +x; the speed is constant.',
    });
    const P = ramp(s, 400, 300, 150, 60, { dir: -1 });
    s.angle(400, 300, 38, 120, 180, '60.0°', { lr: 56 });
    const c = P(150, 20);
    box(s, ...c, 44, 22, -60, { name: 'sled', nameDx: 40, nameDy: 2 });
    comp(s, ...c, -60, 78, 'mg sin 60.0°', { at: [392, 242], anchor: 'start' });
    force(s, ...c, 270, 75, 'w = mg', { at: [c[0] - 10, c[1] + 72], anchor: 'end' });
    force(s, ...c, 30, 52, 'N');
    force(s, ...c, 120, 72, 'T');
    force(s, ...P(132, 4), 120, 40, 'f', { dx: -16, dy: 4 });
    disp(s, ...P(255, 80), -60, 170, null);
    s.label(...P(160, 105), 'd = 30.0 \\rm{m}', { color: K.disp, anchor: 'start' });
    axesAt(s, 440, 80, {
      angle: -60,
      xPos: 80,
      xNeg: 0,
      yPos: 60,
      yNeg: 0,
      xNote: '(down the slope)',
      yNote: '(out of the slope)',
    });
    return s.render();
  },

  // 7.2 Problem 4 — car braked to rest over 120 m, or by an abutment in 2.00 m
  sketch_07_02_p04: () => {
    const s = new Sketch({
      width: 600,
      height: 260,
      title: 'Sketch of the car brought to rest',
      desc: 'A horizontal +x axis points in the direction the car moves, with the origin where the stopping force starts to act. The car starts with v_0 = +25.0 m/s (90.0 km/h) and stops (v = 0) after a distance d: 120 m in part (a), 2.00 m in part (b). The stopping force F on the car points along −x, opposite to the displacement.',
    });
    s.ground(40, 470, 128, { hatch: false });
    hAxis(s, 40, 460, 170, {
      note: '(direction of motion)',
      origin: [90, '0'],
      ticks: [[420, 'd']],
    });
    box(s, 90, 114, 52, 24, 0, { fill: '#ffffff' });
    vel(s, 66, 86, 0, 50, 'v_0', { at: [91, 70] });
    box(s, 255, 114, 52, 24, 0);
    force(s, 229, 114, 180, 70, 'F', { at: [190, 96] });
    box(s, 420, 114, 52, 24, 0, { fill: '#ffffff' });
    s.note(90, 146, 'start');
    s.note(255, 146, 'car (braking)');
    s.note(420, 146, 'stopped');
    s.lines(90, 210, ['v_0 = +25.0 \\rm{m/s}']);
    s.lines(255, 210, ['(a)  d = 120 \\rm{m}', '(b)  d = 2.00 \\rm{m}']);
    s.lines(420, 210, ['v = 0']);
    return s.render();
  },

  // 7.2 Problem 7 — sprinter speeds up against a headwind
  sketch_07_02_p07: () => {
    const s = new Sketch({
      width: 600,
      height: 240,
      title: 'Sketch of the sprinter accelerating into a headwind',
      desc: 'A horizontal +x axis points in the direction the sprinter runs. Over d = 25.0 m the speed rises from v_i = +2.00 m/s to v_f = +8.00 m/s. Forces on the sprinter along x: the track pushes forward with F_sprinter along +x (the reaction to his backward push on the track) and the headwind pushes back with F_wind = 30.0 N along −x.',
    });
    s.ground(40, 470, 120, { hatch: false });
    hAxis(s, 40, 460, 160, {
      note: '(direction of running)',
      origin: [90, '0'],
      ticks: [[420, '25.0 \\rm{m}']],
    });
    s.dot(90, 106, { open: true });
    vel(s, 76, 76, 0, 30, 'v_i', { at: [91, 60] });
    s.dot(255, 106, { name: 'sprinter', nameDy: 26 });
    force(s, 255, 106, 0, 75, 'F_{sprinter}');
    force(s, 255, 106, 180, 45, 'F_{wind}', { at: [200, 84] });
    s.dot(420, 106, { open: true });
    vel(s, 390, 76, 0, 90, 'v_f', { at: [435, 60] });
    s.lines(90, 200, ['v_i = +2.00 \\rm{m/s}']);
    s.lines(255, 200, ['F_{wind} = 30.0 \\rm{N}']);
    s.lines(420, 200, ['v_f = +8.00 \\rm{m/s}']);
    return s.render();
  },

  // 7.3 Problem 5 — toy car coasts up a frictionless track
  sketch_07_03_p05: () => {
    const s = new Sketch({
      width: 520,
      height: 270,
      title: 'Sketch of the toy car coasting up the track',
      desc: 'A vertical +y axis points up, with y = 0 at the car’s starting level and a tick at 0.180 m. The car starts with v_0 = 2.00 m/s and coasts up the frictionless track to a point 0.180 m higher, where its speed v_f is unknown.',
    });
    s.axis(60, 250, 60, 34, {
      label: '+y',
      note: '(up)',
      origin: [60, 220],
      ticks: [[60, 110, '0.180 \\rm{m}']],
    });
    s.svg.path('M 90 228 L 200 228 C 280 228 300 118 380 118 L 490 118', {
      color: C.ground,
      width: 2.5,
    });
    s.ref(66, 220, 120, 220);
    s.ref(66, 110, 410, 110);
    s.dot(140, 220, { name: 'toy car', nameDy: 24 });
    vel(s, 140, 196, 0, 60, 'v_0 = 2.00 \\rm{m/s}', { at: [170, 182] });
    s.dot(440, 110, { open: true });
    vel(s, 440, 86, 0, 30, 'v_f = ?', { at: [455, 70] });
    s.note(330, 210, 'frictionless');
    return s.render();
  },

  // 7.3 Problem 6 — skier descends 70.0 m along a 30° slope
  sketch_07_03_p06: () => {
    const s = new Sketch({
      width: 580,
      height: 300,
      title: 'Sketch of the skier on the 30° slope',
      desc: 'A frictionless 30° slope descends to the right. A vertical +y axis (up) measures height, with y = 0 at the bottom and 35.0 m at the start. A tilted +x axis points down the slope, the direction of motion. The skier travels d = 70.0 m along +x, starting with v_0 = 0 in part (a) or 2.50 m/s in part (b); the final speed v and time t are unknown. The acceleration a = g sin 30° points along +x.',
    });
    const P = ramp(s, 500, 270, 360, 30, { dir: -1 });
    s.angle(500, 270, 46, 150, 180, '30°', { lr: 64 });
    s.axis(80, 285, 80, 34, {
      label: '+y',
      note: '(up)',
      origin: [80, 270],
      ticks: [[80, 62, '35.0 \\rm{m}']],
    });
    s.ref(86, 62, 140, 62);
    const top = P(405, 8);
    const bottom = P(25, 8);
    s.dot(...top, { name: 'start', nameDy: -18 });
    s.dot(...bottom, { open: true });
    s.lines(top[0] + 20, top[1] - 42, ['(a)  v_0 = 0', '(b)  v_0 = 2.50 \\rm{m/s}'], {
      anchor: 'start',
      size: 15,
      gap: 19,
    });
    s.lines(bottom[0] + 14, bottom[1] - 40, ['v = ?', 't = ?'], {
      anchor: 'start',
      size: 15,
      gap: 19,
    });
    disp(s, ...P(380, -20), -30, 310, null);
    s.label(...P(230, -44), 'd = 70.0 \\rm{m}', { color: K.disp });
    acc(s, ...P(200, 70), -30, 60, 'a = g sin 30°', { dy: 6 });
    axesAt(s, 400, 40, { angle: -30, xPos: 80, xNeg: 0, noY: true, xNote: '(down the slope)' });
    return s.render();
  },

  // 7.4 Problem 1 — subway train stopped by a spring bumper
  sketch_07_04_p01: () => {
    const s = new Sketch({
      width: 680,
      height: 280,
      title: 'Sketch of the train compressing the spring bumper',
      desc: 'A horizontal +x axis points in the direction the train moves, with the origin where the train first touches the spring. At first contact the train moves with v = +0.500 m/s. When it stops (v = 0), it has moved x = 0.400 m along +x and compressed the spring by that amount; the spring force on the train points along −x.',
    });
    wall(s, 490, 40, 200);
    s.ground(50, 490, 102, { hatch: false });
    s.ground(50, 490, 192, { hatch: false });
    box(s, 320, 85, 120, 34, 0, { name: 'train', nameDx: -80, nameDy: 5 });
    spring(s, 380, 85, 490, 85, { coils: 7 });
    vel(s, 280, 50, 0, 60, 'v = +0.500 \\rm{m/s}', { at: [380, 38] });
    s.note(130, 60, 'first contact', { anchor: 'start' });
    box(s, 370, 175, 120, 34, 0);
    spring(s, 430, 175, 490, 175, { coils: 7, amp: 9 });
    force(s, 360, 175, 180, 70, 'F_{spring}', { at: [270, 158] });
    s.note(130, 150, 'stopped: v = 0', { anchor: 'start' });
    s.ref(380, 104, 380, 230);
    s.ref(430, 194, 430, 230);
    hAxis(s, 60, 520, 238, {
      note: '(direction of motion)',
      origin: [380, '0'],
      ticks: [[430, '0.400 \\rm{m}']],
    });
    return s.render();
  },

  // 7.4 Problem 2 — pogo stick
  sketch_07_04_p02: () => {
    const s = new Sketch({
      width: 460,
      height: 320,
      title: 'Sketch of the pogo-stick jump',
      desc: 'A vertical +y axis points up, with y = 0 at the child’s position when the spring is fully compressed by 0.120 m. There the child is momentarily at rest (v = 0). At the top of the jump, at the unknown height y = h, the child is again at rest.',
    });
    s.ground(90, 420, 290);
    s.axis(60, 300, 60, 34, {
      label: '+y',
      note: '(up)',
      origin: [60, 240],
      ticks: [[60, 80, 'h']],
    });
    spring(s, 160, 288, 160, 254, { coils: 4, amp: 7, lead: 4 });
    s.ref(66, 240, 150, 240);
    s.ref(66, 80, 150, 80);
    s.dot(160, 240, { name: 'child + stick', nameDy: -18 });
    s.dot(160, 80, { open: true });
    s.lines(240, 232, ['v = 0', 'spring compressed 0.120 \\rm{m}'], {
      anchor: 'start',
      size: 15,
      gap: 20,
    });
    s.lines(240, 72, ['v = 0', 'y = h = ?'], { anchor: 'start', size: 15, gap: 20 });
    return s.render();
  },

  // 7.5 Problem 1 — skier coasts up a 2.50-m rise with friction
  sketch_07_05_p01: () =>
    slopeClimb({
      title: 'Sketch of the skier coasting up the rise',
      desc: 'A slope rises at 35° to a height of 2.50 m. A vertical +y axis (up) has y = 0 at the bottom and 2.50 m at the top. A tilted +x axis points up the slope, the direction of motion. The skier starts at the bottom with v_i = 12.0 m/s and travels d = 4.36 m along the slope; kinetic friction f points down the slope (−x). The final speed v_f at the top is unknown.',
      angle: 35,
      angleLabel: '35°',
      height: '2.50 \\rm{m}',
      d: 'd = 4.36 \\rm{m}',
      vi: 'v_i = 12.0 \\rm{m/s}',
      vf: 'v_f = ?',
      name: 'skier',
    }),

  // 7.5 Problem 2 — car coasts up a 2.5° hill
  sketch_07_05_p02: () =>
    slopeClimb({
      title: 'Sketch of the car coasting up the hill',
      desc: 'A hill rises at 2.5° (drawn steeper for clarity). A vertical +y axis (up) has y = 0 at the starting point. A tilted +x axis points up the hill, the direction of motion. The car starts with v_i = 110 km/h = 30.6 m/s and coasts until it stops (v = 0) at height h: 47.6 m without friction (a), 22.0 m in reality (b), after d = 504 m along the slope. Friction f points down the slope (−x).',
      angle: 25,
      angleLabel: '2.5°',
      height: 'h',
      d: 'd = 504 \\rm{m}',
      vi: 'v_i = 30.6 \\rm{m/s}',
      vf: 'v = 0',
      name: 'car',
      note: '(slope drawn steeper than 2.5°)',
      knowns: ['(a)  h = ?  (without friction)', '(b)  h = 22.0 \\rm{m}'],
    }),

  // 7.6 Problem 2 — rock thrown from a 20.0-m bridge in any direction
  sketch_07_06_p02: () => {
    const s = new Sketch({
      width: 600,
      height: 340,
      title: 'Sketch of a rock thrown from the bridge in three directions',
      desc: 'A vertical +y axis points up, with y = 0 at the water surface and 20.0 m at the bridge. The rock leaves the bridge at v_0 = 15.0 m/s, thrown upward at an angle, horizontally, or downward at an angle; each path ends at the water (y = 0) with an unknown speed v_f.',
    });
    const P = (x, y) => [150 + 10 * x, 300 - 10 * y];
    s.water(66, 580, 300);
    s.axis(60, 320, 60, 34, {
      label: '+y',
      note: '(up)',
      origin: [60, 300],
      ticks: [[60, 100, '20.0 \\rm{m}']],
    });
    s.svg.rect(66, 100, 84, 12, { fill: '#e8dcd0', stroke: C.ground });
    s.svg.rect(96, 112, 22, 188, { fill: '#e8dcd0', stroke: C.ground });
    s.note(108, 90, 'bridge');
    for (const a of [40, 0, -40]) {
      const vx = 15 * Math.cos((a * Math.PI) / 180);
      const vy = 15 * Math.sin((a * Math.PI) / 180);
      const t1 = (vy + Math.sqrt(vy * vy + 2 * 9.8 * 20)) / 9.8;
      const pts = [];
      for (let i = 0; i <= 50; i += 1) {
        const t = (t1 * i) / 50;
        pts.push(P(vx * t, 20 + vy * t - 4.9 * t * t));
      }
      s.path(pts);
      s.dot(...P(vx * t1, 0), { open: true, r: 5 });
      vel(s, 150, 100, a, 55, null);
    }
    s.dot(150, 100, { r: 6 });
    s.label(290, 26, 'v_0 = 15.0 \\rm{m/s}', { color: K.vel, anchor: 'start' });
    s.label(370, 324, 'v_f = ?', { anchor: 'end' });
    s.note(378, 324, '(the same for every direction)', { anchor: 'start' });
    return s.render();
  },

  // 7.7 Problem 8 — dragster accelerates against friction
  sketch_07_07_p08: () => {
    const s = new Sketch({
      width: 600,
      height: 250,
      title: 'Sketch of the dragster run',
      desc: 'A horizontal +x axis points in the direction the dragster moves, with the origin at the start. It starts from rest and reaches v = +110 m/s at x = 400 m after 7.30 s. Forces along x: the driving force F along +x and friction f = 1200 N along −x.',
    });
    s.ground(40, 470, 124, { hatch: false });
    hAxis(s, 40, 460, 164, {
      note: '(direction of motion)',
      origin: [90, '0'],
      ticks: [[420, '400 \\rm{m}']],
    });
    box(s, 90, 112, 50, 22, 0, { fill: '#ffffff' });
    box(s, 255, 112, 50, 22, 0);
    force(s, 280, 112, 0, 70, 'F');
    force(s, 230, 112, 180, 60, 'f', { at: [176, 96] });
    box(s, 420, 112, 50, 22, 0, { fill: '#ffffff' });
    vel(s, 396, 82, 0, 70, 'v', { at: [430, 66] });
    s.note(255, 142, 'dragster');
    s.lines(90, 204, ['t = 0', 'v_0 = 0']);
    s.lines(255, 204, ['f = 1200 \\rm{N}']);
    s.lines(420, 204, ['t = 7.30 \\rm{s}', 'v = +110 \\rm{m/s}']);
    return s.render();
  },

  // 7.7 Problem 13 — car climbs a 2.00° slope at constant speed
  sketch_07_07_p13: () => {
    const s = new Sketch({
      width: 600,
      height: 300,
      title: 'Sketch of the car climbing the slope at constant speed',
      desc: 'A slope rises to the right at 2.00° (drawn steeper for clarity). Tilted axes: +x points up the slope, the direction of motion, and +y perpendicular to the slope. Forces on the car: the driving force F along +x; friction and air resistance f = 600 N along −x; the weight w straight down, with component mg sin θ along −x; and the normal force N along +y. The velocity v = 30.0 m/s along +x is constant, so a = 0.',
    });
    const angle = 15;
    const P = ramp(s, 40, 270, 500, angle);
    s.angle(40, 270, 60, 0, angle, '2.00°', { lr: 80 });
    const c = P(270, 16);
    box(s, ...c, 64, 26, angle);
    force(s, ...P(302, 16), angle, 75, 'F');
    force(s, ...P(238, 6), 180 + angle, 60, null);
    s.label(...P(190, -22), 'f = 600 \\rm{N}', { color: K.force });
    comp(s, ...c, 180 + angle, 70, 'mg sin θ', { dy: -14, dx: -6 });
    force(s, ...c, 270, 60, 'w', { at: [c[0] - 10, c[1] + 56], anchor: 'end' });
    force(s, ...c, 90 + angle, 70, 'N');
    vel(s, ...P(250, 90), angle, 80, 'v = 30.0 \\rm{m/s} (constant)', { dy: -4 });
    axesAt(s, 120, 90, {
      angle,
      xPos: 80,
      xNeg: 0,
      yPos: 60,
      yNeg: 0,
      xNote: '(up the slope)',
      yNote: '(out of the slope)',
    });
    s.note(420, 290, '(slope drawn steeper than 2.00°)');
    return s.render();
  },

  // 7.8 Problem 3 — shot put: accelerated and raised 0.800 m
  sketch_07_08_p03: () => {
    const s = new Sketch({
      width: 460,
      height: 280,
      title: 'Sketch of the shot being put',
      desc: 'A vertical +y axis points up, with y = 0 where the shot starts from rest. After 1.20 s it is released 0.800 m higher, at y = +0.800 m, moving at 14.0 m/s.',
    });
    s.ground(80, 430, 262);
    s.axis(60, 272, 60, 34, {
      label: '+y',
      note: '(up)',
      origin: [60, 210],
      ticks: [[60, 90, '0.800 \\rm{m}']],
    });
    s.ref(66, 210, 150, 210);
    s.ref(66, 90, 250, 90);
    s.dot(160, 210, { name: 'shot', nameDy: 24 });
    s.lines(190, 210, ['t = 0,  v_0 = 0'], { anchor: 'start', size: 15 });
    s.path('M 160 210 Q 190 120 260 90');
    s.dot(260, 90, { open: true });
    vel(s, 260, 90, 40, 70, 'v = 14.0 \\rm{m/s}');
    s.lines(270, 120, ['t = 1.20 \\rm{s}'], { anchor: 'start', size: 15 });
    return s.render();
  },

  // 7.8 Problem 9 — person jumps from a ledge and lands stiffly
  sketch_07_08_p09: () => {
    const s = new Sketch({
      width: 600,
      height: 320,
      title: 'Sketch of the landing after a jump from a ledge',
      desc: 'A vertical +y axis points up, with y = 0 at ground level where the feet first touch. The person starts at rest 0.600 m up, falls to the ground, then stops while moving a further distance d down (1.50 cm in part a, 0.300 m in part b; drawn larger). During the stop the displacement points along −y; the ground pushes up with N along +y and the weight w = mg points along −y.',
    });
    s.cliff(80, 150, 70, 300);
    s.ground(150, 580, 230);
    s.axis(60, 300, 60, 34, {
      label: '+y',
      note: '(up)',
      origin: [60, 230],
      ticks: [
        [60, 70, '0.600 \\rm{m}'],
        [60, 270, '−d'],
      ],
    });
    s.ref(66, 270, 210, 270);
    s.dot(120, 62, { name: 'person', nameDy: -16 });
    s.lines(175, 40, ['v = 0'], { anchor: 'start', size: 15 });
    s.path('M 128 62 Q 180 70 200 230');
    s.dot(200, 230, { open: true });
    s.lines(214, 214, ['feet touch:  y = 0'], { anchor: 'start', size: 15 });
    s.dot(200, 270, { open: true });
    s.lines(214, 286, ['stopped:  y = −d,  v = 0'], { anchor: 'start', size: 15 });
    disp(s, 180, 232, 270, 38, 'd', { at: [172, 252], anchor: 'end' });
    // Forces during the stop, drawn at the side.
    s.note(470, 60, 'forces while stopping');
    s.dot(470, 150);
    force(s, 470, 150, 90, 70, 'N', { at: [482, 86], anchor: 'start' });
    force(s, 470, 150, 270, 40, 'w = mg', { at: [482, 186], anchor: 'start' });
    return s.render();
  },

  // 7.9 Problem 1 — push-up: torques about the feet
  sketch_07_09_p01: () => {
    const s = new Sketch({
      width: 560,
      height: 280,
      title: 'Sketch of the push-up with torques about the feet',
      desc: 'The woman’s body is a rigid plank pivoting at her feet. +x points to the right (from feet toward head), +y points up, and counterclockwise torques are positive. Her weight w = 490 N acts down at 0.900 m from the feet, giving a clockwise (negative) torque; the floor pushes up on her hands with F at 1.50 m from the feet, giving a counterclockwise (positive) torque.',
    });
    s.ground(40, 520, 214);
    const feet = [90, 206];
    const k = 220;
    s.svg.line(feet[0], feet[1], feet[0] + 1.75 * k, feet[1] - 70, {
      color: C.body,
      width: 9,
      cap: 'round',
    });
    pivot(s, feet[0], feet[1] - 4, { size: 10 });
    s.note(feet[0], feet[1] + 26, 'feet (pivot)');
    const wx = feet[0] + 0.9 * k;
    const fx = feet[0] + 1.5 * k;
    const yAt = x => feet[1] - ((x - feet[0]) / (1.75 * k)) * 70;
    force(s, wx, yAt(wx), 270, 44, 'w', { at: [wx - 10, yAt(wx) + 26], anchor: 'end' });
    s.svg.line(fx, yAt(fx), fx, 214, { color: C.body, width: 5 });
    force(s, fx + 16, 214, 90, 80, 'F', { at: [fx + 28, 176], anchor: 'start' });
    s.dim(feet[0], 244, wx, 244, '0.900 \\rm{m}', { off: -9 });
    s.dim(feet[0], 270, fx, 270, '1.50 \\rm{m}', { off: -9 });
    s.ref(wx, 210, wx, 250);
    s.ref(fx, 214, fx, 276);
    s.svg.text(0, 0, '');
    axesAt(s, 60, 90, { xPos: 50, xNeg: 0, yPos: 50, yNeg: 0 });
    ccw(s, 200, 60);
    return s.render();
  },

  // 7.9 Problem 2 — skier climbs a 3.0° slope, then speeds up on the level
  sketch_07_09_p02: () => {
    const s = new Sketch({
      width: 720,
      height: 300,
      title: 'Sketch of the skier on the slope and on the level',
      desc: 'Two panels. (a) On the 3.0° slope (drawn steeper): +x points up the slope, the direction of motion. The snow pushes the skier forward with F along +x (the reaction to his backward push); air resistance F_air = 25.0 N and the weight component mg sin θ point along −x. He moves at a constant 2.00 m/s. (c) On level snow: +x points in the direction of motion; F along +x and F_air along −x; the speed rises from 2.00 m/s to 10.0 m/s.',
    });
    caption(s, 14, 24, '(a) climbing the slope');
    const P = ramp(s, 30, 270, 330, 14);
    s.angle(30, 270, 50, 0, 14, '3.0°', { lr: 70 });
    const c = P(200, 10);
    s.dot(...c, { name: 'skier', nameDy: 24 });
    force(s, ...c, 14, 70, 'F');
    force(s, ...P(200, 22), 194, 50, 'F_{air}', { dy: -10 });
    comp(s, ...P(200, -3), 194, 55, null);
    s.label(...P(150, -24), 'mg sin θ', { color: K.comp, size: 14 });
    vel(s, ...P(160, 70), 14, 60, 'v = 2.00 \\rm{m/s}', { dy: -6 });
    axesAt(s, 60, 110, { angle: 14, xPos: 70, xNeg: 0, noY: true, xNote: '(up the slope)' });
    s.note(200, 292, '(slope drawn steeper than 3.0°)');
    divider(s, 390, 10, 290);
    caption(s, 404, 24, '(c) on level snow');
    s.ground(410, 690, 200, { hatch: false });
    s.dot(540, 192, { name: 'skier', nameDy: 26 });
    force(s, 540, 192, 0, 70, 'F');
    force(s, 540, 192, 180, 50, 'F_{air}', { at: [478, 176] });
    vel(s, 500, 130, 0, 80, null);
    s.label(540, 112, '2.00 \\rm{m/s} → 10.0 \\rm{m/s}', { color: K.vel });
    hAxis(s, 420, 600, 250, { note: '(direction of motion)' });
    return s.render();
  },

  // 7.9 Problem 3 — swimmer accelerates against water resistance
  sketch_07_09_p03: () => {
    const s = new Sketch({
      width: 560,
      height: 220,
      title: 'Sketch of the forces on the swimmer',
      desc: 'A horizontal +x axis points in the direction the swimmer moves. The water pushes him forward with F = 80.0 N along +x (the reaction to the backward push of his arms); water resistance, 45.0 N at the start, points along −x. His speed rises from 1.25 m/s to 2.50 m/s in 5.00 s.',
    });
    s.water(40, 440, 120);
    s.dot(240, 112, { name: 'swimmer', nameDy: 30 });
    force(s, 240, 112, 0, 90, 'F = 80.0 \\rm{N}', { at: [300, 96] });
    force(s, 240, 112, 180, 60, 'F_{resist}', { at: [190, 96] });
    vel(s, 210, 60, 0, 60, null);
    s.label(240, 44, '1.25 \\rm{m/s} → 2.50 \\rm{m/s}', { color: K.vel });
    hAxis(s, 40, 420, 170, { note: '(direction of motion)' });
    s.lines(240, 204, ['F_{resist} = 45.0 \\rm{N}  (initially)']);
    return s.render();
  },

  // 7.9 Problem 5 — elevator accelerated upward against friction
  sketch_07_09_p05: () => {
    const s = new Sketch({
      width: 460,
      height: 340,
      title: 'Sketch of the elevator accelerating upward',
      desc: 'A vertical +y axis points up, with the origin at the elevator’s starting position (at rest) and a tick at 20.0 m. Forces on the elevator: cable force F_cable along +y, weight w = mg and friction f = 200 N along −y. The acceleration a = +0.800 m/s² points along +y; the displacement d = 20.0 m points along +y; the final speed is unknown.',
    });
    s.axis(70, 325, 70, 34, {
      label: '+y',
      note: '(up)',
      origin: [70, 240],
      ticks: [[70, 80, '20.0 \\rm{m}']],
    });
    s.svg.line(152, 40, 152, 300, { color: C.ground, width: 1.5 });
    s.svg.line(248, 40, 248, 300, { color: C.ground, width: 1.5 });
    s.ref(76, 80, 160, 80);
    box(s, 200, 80, 70, 50, 0, { fill: '#ffffff' });
    s.note(200, 84, 'v = ?');
    box(s, 200, 240, 70, 50, 0);
    s.note(200, 244, 'v_0 = 0');
    force(s, 200, 215, 90, 60, 'F_{cable}', { at: [212, 165], anchor: 'start' });
    force(s, 186, 265, 270, 48, 'w = mg', { at: [178, 306], anchor: 'end' });
    force(s, 216, 265, 270, 26, 'f', { at: [226, 290], anchor: 'start' });
    disp(s, 300, 240, 90, 160, 'd = 20.0 \\rm{m}', { at: [310, 160], anchor: 'start' });
    acc(s, 380, 110, 90, 50, 'a = +0.800 \\rm{m/s}^2', { at: [380, 46] });
    return s.render();
  },

  // 7.9 Problem 10 — basketball player's jump
  sketch_07_09_p10: () => {
    const s = new Sketch({
      width: 560,
      height: 320,
      title: 'Sketch of the basketball player’s jump',
      desc: 'A vertical +y axis points up, with y = 0 at the center of gravity’s normal standing height, where the feet leave the floor. Crouched: y = −0.400 m, at rest. Leaving the floor: y = 0, speed v unknown, directed along +y. Top of the jump: y = +0.950 m, v = 0. During the push-off the floor pushes up with F along +y and the weight w = mg points along −y.',
    });
    const Y = y => 210 - y * 140;
    s.axis(90, 300, 90, 34, {
      label: '+y',
      note: '(up)',
      origin: [90, Y(0)],
      ticks: [
        [90, Y(0.95), '0.950 \\rm{m}'],
        [90, Y(-0.4), '−0.400 \\rm{m}'],
      ],
    });
    for (const y of [0.95, 0, -0.4]) s.ref(96, Y(y), 150, Y(y));
    s.dot(160, Y(-0.4), { name: 'crouched', nameDx: 0, nameDy: 22 });
    s.lines(190, Y(-0.4), ['v = 0'], { anchor: 'start', size: 15 });
    s.dot(160, Y(0), { open: true });
    vel(s, 140, Y(0), 90, 50, 'v = ?', { at: [132, Y(0) - 40], anchor: 'end' });
    s.lines(190, Y(0), ['feet leave the floor'], { anchor: 'start', size: 15 });
    s.dot(160, Y(0.95), { open: true });
    s.lines(190, Y(0.95), ['top:  v = 0'], { anchor: 'start', size: 15 });
    s.note(450, 120, 'forces during push-off');
    s.dot(450, 200);
    force(s, 450, 200, 90, 60, 'F', { at: [462, 146], anchor: 'start' });
    force(s, 450, 200, 270, 40, 'w = mg', { at: [462, 236], anchor: 'start' });
    return s.render();
  },
};

/**
 * An object coasting up a straight slope: vertical +y axis (up) at the left,
 * a tilted +x axis up the slope, friction down the slope.
 */
function slopeClimb({ title, desc, angle, angleLabel, height, d, vi, vf, name, note, knowns }) {
  const s = new Sketch({ width: 560, height: 300, title, desc });
  const x0 = 150;
  const y0 = 250;
  const run = 230;
  const P = ramp(s, x0, y0, run, angle);
  const topY = y0 - run * Math.tan((angle * Math.PI) / 180);
  s.ground(86, x0, y0, { hatch: false });
  s.svg.line(x0 + run, topY, 530, topY, { color: C.ground, width: 2.2 });
  s.angle(x0, y0, 44, 0, angle, angleLabel, { lr: 62 });
  s.axis(76, 280, 76, 34, {
    label: '+y',
    note: '(up)',
    origin: [76, y0],
    ticks: [[76, topY, height]],
  });
  s.ref(82, topY, x0 + run, topY);
  s.dot(110, y0 - 8, { name, nameDy: 24 });
  vel(s, 100, y0 - 34, 0, 50, vi, { at: [96, y0 - 52], anchor: 'start' });
  const mid = P(140, 8);
  s.dot(...mid, { r: 5 });
  force(s, ...mid, 180 + angle, 50, 'f', { dy: 6 });
  s.dot(440, topY - 8, { open: true });
  s.label(440, topY - 30, vf);
  disp(s, ...P(70, -14), angle, 175, null);
  s.label(...P(170, -36), d, { color: K.disp });
  axesAt(s, 400, 232, { angle, xPos: 70, xNeg: 0, noY: true, xNote: '(up the slope)' });
  if (note) s.note(330, 290, note);
  if (knowns) s.lines(250, 66, knowns, { anchor: 'middle', size: 15, gap: 19 });
  return s.render();
}
