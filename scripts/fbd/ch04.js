import { FBD, panels } from './fbd.js';

export default {
  // 4.3 Problem 5 — lawn mower, pushing and then coasting
  fbd_04_03_p05: () => {
    const a = new FBD({ width: 340, height: 300, cx: 160, cy: 160, caption: 'Part 1: pushing' });
    a.axes({ xLen: 145, yLen: 115, xNeg: 125, yNeg: 115 });
    a.force(90, 75, 'N');
    a.force(270, 75, 'w');
    a.force(0, 100, 'F');
    a.force(180, 50, 'f');
    a.accel(0, 50, { at: [45, 80] });
    a.objectLabel('mower', { dx: 8, dy: -20 });
    const b = new FBD({ width: 340, height: 300, cx: 170, cy: 160, caption: 'Part 2: coasting' });
    b.axes({ xLen: 145, yLen: 115, xNeg: 125, yNeg: 115 });
    b.force(90, 75, 'N');
    b.force(270, 75, 'w');
    b.force(180, 50, 'f');
    b.accel(180, 40, { at: [-50, 80] });
    b.objectLabel('mower', { dx: 8, dy: -20 });
    return panels([a, b], {
      title: 'Free-body diagrams of the lawn mower',
      desc: 'Two free-body diagrams with +x to the right and +y up. Part 1, pushing: normal force N up, weight w down, applied force F to the right, friction f to the left; the acceleration points to the right. Part 2, coasting: N up, w down, friction f to the left only; the acceleration points to the left.',
    });
  },
  // 4.3 Problem 7 — rocket sled with one rocket burning
  fbd_04_03_p07: () => {
    const d = new FBD({
      title: 'Free-body diagram of the rocket sled',
      desc: 'Free-body diagram with +x to the right and +y up: thrust T to the right, friction f to the left, normal force N up, weight w down; the acceleration points to the right.',
      width: 380,
      height: 280,
      cx: 170,
      cy: 150,
    });
    d.axes({ xLen: 160, yLen: 105, xNeg: 120, yNeg: 105 });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    d.force(0, 120, 'T');
    d.force(180, 35, 'f');
    d.accel(0, 50, { at: [50, 75] });
    d.objectLabel('sled + rider', { dx: 8, dy: -20 });
    return d.render();
  },

  // 4.3 Problem 9 — child in a wagon pushed by two children
  fbd_04_03_p09: () => {
    const d = new FBD({
      title: 'Free-body diagram of the child in the wagon',
      desc: 'Free-body diagram with +x to the right and +y up: F2 to the right, a slightly shorter F1 to the left, a short friction force f to the left, normal force N up, weight w down; the acceleration points to the right.',
      width: 400,
      height: 290,
      cx: 200,
      cy: 150,
    });
    d.axes({ xLen: 170, yLen: 110, xNeg: 165, yNeg: 110 });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    const scale = 130 / 90; // pixels per newton: F2 = 90 N, F1 = 75 N, f = 12 N
    d.force(0, 90 * scale, 'F_2');
    d.force(180, 75 * scale, 'F_1', { from: [0, 7] });
    d.force(180, 12 * scale, 'f', {
      from: [0, -7],
      labelOpts: { at: [-45, -35] },
    });
    d.accel(0, 40, { at: [40, 85] });
    d.objectLabel('child + wagon', { dx: 10, dy: -42 });
    return d.render();
  },

  // 4.3 Problem 10 — accelerating motorcycle
  fbd_04_03_p10: () => {
    const d = new FBD({
      title: 'Free-body diagram of the motorcycle',
      desc: 'Free-body diagram with +x forward and +y up: F ground to the right, resistive force f to the left, normal force N up, weight w down; the acceleration points to the right.',
      width: 400,
      height: 280,
      cx: 180,
      cy: 150,
    });
    d.axes({ xLen: 170, yLen: 105, xNeg: 130, yNeg: 105 });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    d.force(0, 125, 'F_{ground}');
    d.force(180, 45, 'f');
    d.accel(0, 50, { at: [50, 75] });
    d.objectLabel('motorcycle + rider', { dx: 8, dy: -20 });
    return d.render();
  },

  // 4.3 Problem 11 — seat force on an accelerating rocket-sled passenger
  fbd_04_03_p11: () => {
    const d = new FBD({
      title: 'Free-body diagram of the accelerating passenger',
      desc: 'Free-body diagram with +x forward and +y up: seat force F total at angle theta above +x with dashed components Fx along +x and Fy along +y; weight w down; acceleration to the right.',
      width: 420,
      height: 280,
      cx: 120,
      cy: 150,
    });
    d.axes({ xLen: 240, yLen: 105, xNeg: 90, yNeg: 105 });
    d.component(0, 175, 'F_x', { labelOpts: { dy: -34 } });
    d.component(90, 35, 'F_y', { labelOpts: { dx: -42, dy: 8 } });
    d.force(11.3, 178, 'F_{total}', { labelOpts: { dy: 6 } });
    d.force(270, 35, 'w');
    d.arc(0, 11.3, 70, 'θ', { labelR: 86 });
    d.accel(0, 50, { at: [40, 85] });
    d.objectLabel('passenger', { dx: -10, dy: -24, anchor: 'end' });
    return d.render();
  },

  // 4.3 Problem 12 — seat and belt force on a decelerating passenger
  fbd_04_03_p12: () => {
    const d = new FBD({
      title: 'Free-body diagram of the decelerating passenger',
      desc: 'Free-body diagram with +x forward and +y up: seat-and-belt force F total at angle theta above the -x axis with dashed components Fx along -x and Fy along +y; weight w down; acceleration to the left.',
      width: 420,
      height: 280,
      cx: 290,
      cy: 150,
    });
    d.axes({ xLen: 90, yLen: 105, xNeg: 270, yNeg: 105 });
    d.component(180, 200, 'F_x', { labelOpts: { dy: -34 } });
    d.component(90, 30, 'F_y', { labelOpts: { dy: 8 } });
    d.force(180 - 8.5, 202, 'F_{total}', { labelOpts: { dy: 6 } });
    d.force(270, 30, 'w');
    d.arc(180 - 8.5, 180, 90, 'θ', { labelR: 106 });
    d.accel(180, 50, { at: [-30, 85] });
    d.objectLabel('passenger', { dx: 12, dy: -56 });
    d.note(-80, -112, 'vertical forces and θ not to scale', { size: 13, italic: true });
    return d.render();
  },

  // 4.3 Problem 14 — lunar module on the Moon and on Earth
  fbd_04_03_p14: () => {
    const a = new FBD({ width: 300, height: 340, cx: 140, cy: 185, caption: '(a) Moon: liftoff' });
    a.axes({ xLen: 110, yLen: 120, xNeg: 100, yNeg: 120 });
    a.force(90, 100, 'T');
    a.force(270, 55, 'w_{Moon}');
    a.accel(90, 45, { at: [-70, 60] });
    a.objectLabel('module', { dx: 10, dy: -20 });
    const b = new FBD({
      width: 300,
      height: 340,
      cx: 150,
      cy: 185,
      caption: '(b) Earth: on the ground',
    });
    b.axes({ xLen: 110, yLen: 120, xNeg: 100, yNeg: 120 });
    b.force(90, 30, 'T', { from: [-7, 0], labelOpts: { dx: -48, dy: -4 } });
    b.force(90, 70, 'N', { from: [7, 0] });
    b.force(270, 100, 'w_{Earth}');
    b.accel(0, 0, { at: [-70, 90] });
    b.objectLabel('module', { dx: 10, dy: -20 });
    return panels([a, b], {
      title: 'Free-body diagrams of the lunar module',
      desc: 'Two free-body diagrams with +x to the right and +y up. (a) On the Moon: thrust T up, larger than the weight w Moon pointing down; the acceleration a points up. (b) On Earth, sitting on the ground: thrust T up and normal force N up together balance the weight w Earth pointing down, so a = 0.',
    });
  },
  // 4.4 Problem 2 — rugby players
  fbd_04_04_p02: () => {
    const a = new FBD({
      width: 360,
      height: 300,
      cx: 175,
      cy: 160,
      caption: '(a) Losing player (90.0 kg)',
    });
    a.axes({ xLen: 155, yLen: 110, xNeg: 150, yNeg: 110 });
    a.force(90, 75, 'N_1');
    a.force(270, 75, 'w_1');
    a.force(0, 110, 'F_{push}');
    a.force(180, 95, 'f');
    a.accel(0, 45, { at: [40, 85] });
    a.objectLabel('losing player', { dx: 10, dy: -42 });
    const b = new FBD({
      width: 360,
      height: 300,
      cx: 175,
      cy: 160,
      caption: '(b) Winning player (110 kg)',
    });
    b.axes({ xLen: 155, yLen: 110, xNeg: 150, yNeg: 110 });
    b.force(90, 85, 'N_2');
    b.force(270, 85, 'w_2');
    b.force(0, 128, 'F_{ground}');
    b.force(180, 110, 'F_{reaction}');
    b.accel(0, 45, { at: [40, 85] });
    b.objectLabel('winning player', { dx: 10, dy: -42 });
    return panels([a, b], {
      title: 'Free-body diagrams of the two rugby players',
      desc: 'Two free-body diagrams, both with +x to the right and +y up. (a) Losing player: push F push to the right, a shorter friction force f to the left, normal force N1 up, weight w1 down; acceleration to the right. (b) Winning player: F ground to the right, a slightly shorter F reaction to the left, normal force N2 up, weight w2 down; acceleration to the right.',
    });
  },
  // 4.5 Problem 1 — tug of war
  fbd_04_05_p01: () => {
    const a = new FBD({
      width: 360,
      height: 290,
      cx: 180,
      cy: 150,
      caption: '(a) System: both teams + rope',
    });
    a.axes({ xLen: 155, yLen: 110, xNeg: 155, yNeg: 110 });
    a.force(90, 75, 'N');
    a.force(270, 75, 'w');
    a.force(0, 118, 'F_2');
    a.force(180, 110, 'F_1');
    a.accel(0, 40, { at: [40, 85] });
    a.objectLabel('teams + rope', { dx: 10, dy: -42 });
    const b = new FBD({ width: 360, height: 290, cx: 180, cy: 150, caption: '(b) System: team 1' });
    b.axes({ xLen: 155, yLen: 110, xNeg: 155, yNeg: 110 });
    b.force(90, 60, 'N_1');
    b.force(270, 60, 'w_1');
    b.force(0, 120, 'T');
    b.force(180, 115, 'F_1');
    b.accel(0, 40, { at: [40, 85] });
    b.objectLabel('team 1', { dx: -10, dy: -24, anchor: 'end' });
    return panels([a, b], {
      title: 'Free-body diagrams for the tug of war',
      desc: 'Two free-body diagrams with +x to the right, toward team 2, and +y up. (a) Both teams plus rope: F2 from the ground to the right, slightly shorter F1 to the left, total normal force N up, total weight w down; acceleration to the right. (b) Team 1 alone: rope tension T to the right, F1 to the left, N1 up, w1 down; acceleration to the right.',
    });
  },

  // 4.5 Problem 2 — gymnast on a trampoline
  fbd_04_05_p02: () => {
    const d = new FBD({
      title: 'Free-body diagram of the gymnast on the trampoline',
      desc: 'Free-body diagram with +x to the right and +y up: normal force N up, about twice as long as the weight w pointing down; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 185,
    });
    d.axes({ xLen: 120, yLen: 125, xNeg: 110, yNeg: 120 });
    d.force(90, 105, 'N');
    d.force(270, 60, 'w');
    d.accel(90, 45, { at: [-70, 50] });
    d.objectLabel('gymnast', { dx: 10, dy: -22 });
    return d.render();
  },

  // 4.5 Problem 3 — spider on a vertical and on a horizontal strand
  fbd_04_05_p03: () => {
    const a = new FBD({
      width: 260,
      height: 300,
      cx: 120,
      cy: 155,
      caption: '(a) Vertical strand',
    });
    a.axes({ xLen: 100, yLen: 110, xNeg: 95, yNeg: 110 });
    a.force(90, 55, 'T_{vertical}');
    a.force(270, 55, 'w');
    a.accel(0, 0, { at: [-55, 95] });
    a.objectLabel('spider', { dx: 10, dy: -22 });
    const b = new FBD({
      width: 460,
      height: 300,
      cx: 230,
      cy: 175,
      caption: '(b) Horizontal strand',
    });
    b.axes({ xLen: 200, yLen: 110, xNeg: 200, yNeg: 110 });
    b.force(12, 135, 'T', { labelOpts: { dy: 4 } });
    b.force(168, 135, 'T', { labelOpts: { dy: 4 } });
    b.component(90, 28, 'T sin θ', { from: [6, 0], labelOpts: { dx: 0, dy: 16 } });
    b.component(90, 28, 'T sin θ', { from: [-6, 0], labelOpts: { at: [-14, 40], anchor: 'end' } });
    b.component(0, 132, 'T cos θ', { labelOpts: { dy: -36 } });
    b.component(180, 132, 'T cos θ', { labelOpts: { dy: -36 } });
    b.force(270, 55, 'w');
    b.arc(0, 12, 95, 'θ', { labelR: 108 });
    b.arc(168, 180, 95, 'θ', { labelR: 108 });
    b.accel(0, 0, { at: [-120, 95] });
    b.objectLabel('spider', { dx: -12, dy: -50, anchor: 'end' });
    return panels([a, b], {
      title: 'Free-body diagrams of the spider',
      desc: 'Two free-body diagrams with +x to the right and +y up, both with a = 0. (a) Vertical strand: tension T vertical up, weight w down, equal lengths. (b) Horizontal strand: two tensions T, one up and to the right and one up and to the left, each at angle theta = 12 degrees above the horizontal, with dashed components T cos theta along the x-axis and T sin theta along +y; weight w down.',
    });
  },

  // 4.5 Problem 4 — gymnast climbing a rope
  fbd_04_05_p04: () => {
    const a = new FBD({ width: 280, height: 300, cx: 130, cy: 165, caption: '(a) Constant speed' });
    a.axes({ xLen: 100, yLen: 115, xNeg: 100, yNeg: 115 });
    a.force(90, 75, 'T');
    a.force(270, 75, 'w');
    a.accel(0, 0, { at: [-60, 95] });
    a.objectLabel('gymnast', { dx: 10, dy: -22 });
    const b = new FBD({
      width: 280,
      height: 300,
      cx: 130,
      cy: 165,
      caption: '(b) Accelerating upward',
    });
    b.axes({ xLen: 100, yLen: 115, xNeg: 100, yNeg: 115 });
    b.force(90, 90, 'T');
    b.force(270, 75, 'w');
    b.accel(90, 40, { at: [-60, 45] });
    b.objectLabel('gymnast', { dx: 10, dy: -22 });
    return panels([a, b], {
      title: 'Free-body diagrams of the gymnast on the rope',
      desc: 'Two free-body diagrams with +x to the right and +y up. (a) Constant speed: tension T up and weight w down, equal lengths, a = 0. (b) Accelerating upward: T up, longer than w down; the acceleration points up.',
    });
  },

  // 4.5 Problem 5 — perpendicular force at the center of a flexible medium
  fbd_04_05_p05: () => {
    const d = new FBD({
      title: 'Free-body diagram of the point where the perpendicular force is applied',
      desc: 'Free-body diagram with +x to the right and +y up: two tensions T, one up and to the left and one up and to the right, each at angle theta above the horizontal, with dashed components T cos theta along the x-axis and T sin theta along +y; the applied force F perpendicular points straight down. a = 0.',
      width: 460,
      height: 300,
      cx: 230,
      cy: 160,
    });
    d.axes({ xLen: 200, yLen: 115, xNeg: 200, yNeg: 115 });
    d.force(20, 140, 'T', { labelOpts: { dy: 4 } });
    d.force(160, 140, 'T', { labelOpts: { dy: 4 } });
    d.component(90, 48, 'T sin θ', { from: [6, 0], labelOpts: { dy: 22 } });
    d.component(90, 48, 'T sin θ', { from: [-6, 0], labelOpts: { at: [-14, 60], anchor: 'end' } });
    d.component(0, 131, 'T cos θ', { labelOpts: { dy: -36 } });
    d.component(180, 131, 'T cos θ', { labelOpts: { dy: -36 } });
    d.force(270, 95, 'F_⊥');
    d.arc(0, 20, 85, 'θ', { labelR: 98 });
    d.arc(160, 180, 85, 'θ', { labelR: 98 });
    d.accel(0, 0, { at: [-130, 95] });
    d.objectLabel('point of application', { dx: 10, dy: -50 });
    return d.render();
  },

  // 4.5 Problem 6 — baby on a spring scale
  fbd_04_05_p06: () => {
    const a = new FBD({
      width: 300,
      height: 300,
      cx: 130,
      cy: 160,
      caption: '(b) System: baby + basket',
    });
    a.axes({ xLen: 115, yLen: 115, xNeg: 100, yNeg: 115 });
    a.force(90, 75, 'T_1');
    a.force(270, 75, 'w_{baby}');
    a.accel(0, 0, { at: [-60, 95] });
    a.objectLabel('baby + basket', { dx: -10, dy: -22, anchor: 'end' });
    const b = new FBD({
      width: 320,
      height: 300,
      cx: 140,
      cy: 160,
      caption: '(c) System: baby + basket + scale',
    });
    b.axes({ xLen: 120, yLen: 115, xNeg: 100, yNeg: 115 });
    const babyWeight = 75;
    const scaleWeight = babyWeight * ((0.5 * 9.8) / 55);
    b.force(90, babyWeight + scaleWeight, 'T_2');
    b.force(270, babyWeight, 'w_{baby}', { from: [-7, 0], labelOpts: { dx: -78, dy: -6 } });
    b.force(270, scaleWeight, 'w_{scale}', {
      from: [16, 0],
      labelOpts: { at: [40, -22], anchor: 'start' },
    });
    b.accel(0, 0, { at: [-65, 95] });
    b.objectLabel('baby + basket + scale', { dx: 12, dy: -70 });
    return panels([a, b], {
      title: 'Free-body diagrams for the baby on the scale',
      desc: 'Two free-body diagrams with +x to the right and +y up, both with a = 0. (b) Baby plus basket: tension T1 up and weight w baby down, equal lengths. (c) Baby plus basket plus scale: tension T2 up; weights w baby and a short w scale both pointing down.',
    });
  },
  // 4.6 Problem 1 — rocket accelerating upward against air resistance
  fbd_04_06_p01: () => {
    const d = new FBD({
      title: 'Free-body diagram of the rocket',
      desc: 'Free-body diagram with +x to the right and +y up: thrust T up; air resistance f and weight mg both down, drawn side by side; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 175,
    });
    d.axes({ xLen: 125, yLen: 135, xNeg: 110, yNeg: 120 });
    d.force(90, 118, 'T');
    d.force(270, 46, 'f', { from: [-7, 0], labelOpts: { dx: -32, dy: -4 } });
    d.force(270, 50, 'mg', { from: [7, 0] });
    d.accel(90, 40, { at: [-70, 60] });
    d.objectLabel('rocket', { dx: 10, dy: 24 });
    return d.render();
  },

  // 4.6 Problem 2 — accelerating car
  fbd_04_06_p02: () => {
    const d = new FBD({
      title: 'Free-body diagram of the car',
      desc: 'Free-body diagram with +x forward (to the right) and +y up: forward force from the road F to the right, friction f to the left, normal force N up, weight w down; the acceleration points to the right.',
      width: 380,
      height: 280,
      cx: 170,
      cy: 150,
    });
    d.axes({ xLen: 160, yLen: 105, xNeg: 120, yNeg: 105 });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    d.force(0, 120, 'F');
    d.force(180, 35, 'f');
    d.accel(0, 50, { at: [50, 75] });
    d.objectLabel('car + occupants', { dx: 8, dy: -20 });
    return d.render();
  },

  // 4.6 Problem 3 — high jumper pushing off
  fbd_04_06_p03: () => {
    const d = new FBD({
      title: 'Free-body diagram of the high jumper',
      desc: 'Free-body diagram with +x to the right and +y up: upward force from the ground F, about five times as long as the weight w pointing down; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 210,
    });
    d.axes({ xLen: 125, yLen: 115, xNeg: 110, yNeg: 95 });
    d.force(90, 98, 'F');
    d.force(270, 22, 'w', { labelOpts: { dy: -4 } });
    d.accel(90, 45, { at: [-70, 40] });
    d.objectLabel('jumper', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.6 Problem 4 — gymnast landing on a mat
  fbd_04_06_p04: () => {
    const d = new FBD({
      title: 'Free-body diagram of the landing gymnast',
      desc: 'Free-body diagram with +x to the right and +y up: normal force N from the mat up, eight times as long as the weight w pointing down; the gymnast is moving down but slowing, so the acceleration points up.',
      width: 340,
      height: 340,
      cx: 150,
      cy: 250,
    });
    d.axes({ xLen: 135, yLen: 160, xNeg: 110, yNeg: 75 });
    d.force(90, 136, 'N');
    d.force(270, 17, 'w', { labelOpts: { dy: -6 } });
    d.accel(90, 45, { at: [-70, 70] });
    d.note(100, 90, 'moving down,', { size: 13 });
    d.note(100, 74, 'slowing down', { size: 13 });
    d.objectLabel('gymnast', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.6 Problem 5 — freight train
  fbd_04_06_p05: () => {
    const a = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(a) System: whole train',
    });
    a.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    a.force(90, 65, 'N');
    a.force(270, 65, 'w');
    a.force(0, 130, 'F_{engines}');
    a.force(180, 110, 'f');
    a.accel(0, 40, { at: [40, 80] });
    a.objectLabel('train', { dx: -10, dy: 24, anchor: 'end' });
    const b = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(b) System: cars 38–45',
    });
    b.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    b.force(90, 65, 'N_{sys}');
    b.force(270, 65, 'w_{sys}');
    b.force(0, 120, 'F_{coupling}');
    b.force(180, 102, 'f_{sys}');
    b.accel(0, 40, { at: [40, 80] });
    b.objectLabel('cars 38–45', { dx: -10, dy: 24, anchor: 'end' });
    return panels([a, b], {
      title: 'Free-body diagrams for the freight train',
      desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a) Whole train: F engines from the track to the right, friction f to the left, N up, w down; acceleration to the right. (b) Cars 38 to 45: coupling force F coupling to the right, their share of friction f sys to the left, N sys up, w sys down; acceleration to the right.',
    });
  },

  // 4.6 Problem 6 — tractor pushing an airplane
  fbd_04_06_p06: () => {
    const a = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(a) System: tractor + airplane',
    });
    a.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    a.force(90, 65, 'N');
    a.force(270, 65, 'w');
    a.force(0, 125, 'F');
    a.force(180, 40, 'f_{total}', { labelOpts: { dx: -10 } });
    a.accel(0, 40, { at: [40, 80] });
    a.objectLabel('tractor + airplane', { dx: -10, dy: -30, anchor: 'end' });
    const b = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(b) System: airplane only',
    });
    b.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    b.force(90, 63, 'N');
    b.force(270, 63, 'w');
    b.force(0, 122, 'F_{push}');
    b.force(180, 38, 'f_{airplane}', { labelOpts: { dx: -20 } });
    b.accel(0, 40, { at: [40, 80] });
    b.objectLabel('airplane', { dx: -10, dy: -30, anchor: 'end' });
    return panels([a, b], {
      title: 'Free-body diagrams for the tractor and airplane',
      desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a) Tractor plus airplane: forward force from the pavement F to the right, total resisting force f total to the left, N up, w down; acceleration to the right. (b) Airplane only: push from the tractor F push to the right, resisting force f airplane to the left, N up, w down; acceleration to the right.',
    });
  },

  // 4.6 Problem 7 — car pulling a boat trailer
  fbd_04_06_p07: () => {
    const a = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(a) System: car + boat + trailer',
    });
    a.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    a.force(90, 65, 'N');
    a.force(270, 65, 'w');
    a.force(0, 125, 'F_{road}');
    a.force(180, 60, 'f_{total}');
    a.accel(0, 40, { at: [40, 80] });
    a.objectLabel('car + boat + trailer', { dx: -10, dy: -30, anchor: 'end' });
    const b = new FBD({
      width: 360,
      height: 280,
      cx: 170,
      cy: 145,
      caption: '(b) System: boat + trailer',
    });
    b.axes({ xLen: 165, yLen: 105, xNeg: 150, yNeg: 105 });
    b.force(90, 55, 'N_{boat}');
    b.force(270, 55, 'w_{boat}');
    b.force(0, 90, 'F_{hitch}');
    b.force(180, 58, 'f_{boat}');
    b.accel(0, 40, { at: [40, 80] });
    b.objectLabel('boat + trailer', { dx: -10, dy: -30, anchor: 'end' });
    return panels([a, b], {
      title: 'Free-body diagrams for the car and boat trailer',
      desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a) Car plus boat plus trailer: forward force from the road F road to the right, total resisting force f total to the left, N up, w down; acceleration to the right. (b) Boat plus trailer: hitch force F hitch to the right, resisting force f boat to the left, N boat up, w boat down; acceleration to the right.',
    });
  },

  // 4.6 Problem 9 — snow saucer sled seen from above
  fbd_04_06_p09: () => {
    const d = new FBD({
      title: 'Free-body diagram of the sled seen from above',
      desc: 'Top-view free-body diagram with +x east (to the right) and +y north (up the page): F1 at 45 degrees above +x, F2 at 30 degrees below +x, and friction f pointing opposite the net pull, 12.4 degrees south of west. The acceleration points 12.4 degrees north of east. Vertical forces (weight and normal force) cancel and are not shown.',
      width: 460,
      height: 320,
      cx: 190,
      cy: 165,
    });
    d.axes({
      xLen: 180,
      yLen: 120,
      xNeg: 170,
      yNeg: 120,
      xLabel: '+x (east)',
      yLabel: '+y (north)',
      labelOffset: 18,
    });
    d.force(45, 120, 'F_1');
    d.force(-30, 96, 'F_2', { labelOpts: { dy: 4 } });
    d.force(192.4, 90, 'f', { labelOpts: { dy: -16 } });
    d.arc(0, 45, 45, '45°', { labelR: 64, size: 15 });
    d.arc(-30, 0, 62, '30°', { labelR: 80, size: 15 });
    d.accel(12.4, 50, { at: [-150, 100] });
    d.note(-100, -140, 'view from above', { size: 13, italic: true });
    d.objectLabel('sled + child', { dx: -12, dy: 20, anchor: 'end' });
    return d.render();
  },

  // 4.6 Problem 10 — pulling sideways on the center of a rope to free a car
  fbd_04_06_p10: () => {
    const d = new FBD({
      title: 'Free-body diagram of the center of the rope',
      desc: 'Free-body diagram with +x along the car-to-tree line (to the right, toward the tree) and +y perpendicular to it (up the page): tension T toward the car, up and to the left, and tension T toward the tree, up and to the right, each at a small angle theta above the x-axis, with dashed components T sin theta along +y; the applied force F app points along -y. a = 0.',
      width: 460,
      height: 280,
      cx: 230,
      cy: 120,
    });
    d.axes({ xLen: 200, yLen: 95, xNeg: 200, yNeg: 140 });
    d.force(8, 165, 'T', { labelOpts: { dy: 6 } });
    d.force(172, 165, 'T', { labelOpts: { dy: 6 } });
    d.component(90, 24, 'T sin θ', { from: [6, 0], labelOpts: { dy: 14 } });
    d.component(-270, 24, 'T sin θ', {
      from: [-6, 0],
      labelOpts: { at: [-14, 38], anchor: 'end' },
    });
    d.force(270, 48, 'F_{app}');
    d.arc(0, 8, 120, 'θ', { labelR: 134 });
    d.arc(172, 180, 120, 'θ', { labelR: 134 });
    d.note(-160, -40, 'toward car', { size: 13 });
    d.note(160, -40, 'toward tree', { size: 13 });
    d.accel(0, 0, { at: [-130, 80] });
    d.note(0, -150, 'angle θ exaggerated for clarity', { size: 13, italic: true });
    return d.render();
  },

  // 4.6 Problem 11 — braces pulling on a tooth
  fbd_04_06_p11: () => {
    const d = new FBD({
      title: 'Wire forces on the tooth',
      desc: 'Wire forces only, with +x to the right and +y up (toward the front of the mouth): two tensions T, one down and to the right and one down and to the left, each 15 degrees below the horizontal, with dashed components T cos theta along the x-axis and T sin theta along -y. Their sum, F app, points along -y. Forces from the surrounding tissue are not shown.',
      width: 440,
      height: 290,
      cx: 220,
      cy: 110,
    });
    d.axes({ xLen: 195, yLen: 85, xNeg: 195, yNeg: 150 });
    d.force(-15, 150, 'T', { labelOpts: { dy: -4 } });
    d.force(195, 150, 'T', { labelOpts: { dy: -4 } });
    d.component(0, 145, 'T cos θ', { labelOpts: { dy: 8 } });
    d.component(180, 145, 'T cos θ', { labelOpts: { dy: 8 } });
    d.component(270, 39, 'T sin θ', { from: [6, 0], labelOpts: { dy: -2 } });
    d.component(270, 39, 'T sin θ', {
      from: [-6, 0],
      labelOpts: { at: [-14, -50], anchor: 'end' },
    });
    d.arc(-15, 0, 100, 'θ', { labelR: 114 });
    d.arc(180, 195, 100, 'θ', { labelR: 114 });
    d.note(-130, 60, 'wire forces only', { size: 13 });
    d.objectLabel('tooth', { dx: 10, dy: 14 });
    d.text(0, -165, 'F_{app} = 2T sin θ  (sum of the two tensions, along −y)', {
      size: 16,
      vshift: 6,
    });
    return d.render();
  },

  // 4.6 Problem 12 — Superhero and Trusty Sidekick
  fbd_04_06_p12: () => {
    const h = new FBD({ width: 250, height: 320, cx: 110, cy: 170, caption: 'Superhero' });
    h.axes({ xLen: 105, yLen: 120, xNeg: 90, yNeg: 135 });
    h.force(90, 100, 'T_1');
    h.force(270, 62, 'w_H', { from: [-7, 0], labelOpts: { dx: -38, dy: -6 } });
    h.force(270, 38, 'T_2', { from: [7, 0] });
    h.accel(0, 0, { at: [-55, 110] });
    h.objectLabel('Superhero', { dx: -10, dy: 22, anchor: 'end' });
    const k = new FBD({ width: 230, height: 320, cx: 100, cy: 170, caption: 'Sidekick' });
    k.axes({ xLen: 100, yLen: 120, xNeg: 85, yNeg: 135 });
    k.force(90, 38, 'T_2');
    k.force(270, 38, 'w_S');
    k.accel(0, 0, { at: [-45, 110] });
    k.objectLabel('Sidekick', { dx: -10, dy: 22, anchor: 'end' });
    const b = new FBD({ width: 260, height: 320, cx: 110, cy: 170, caption: 'Both together' });
    b.axes({ xLen: 110, yLen: 120, xNeg: 90, yNeg: 135 });
    b.force(90, 100, 'T_1');
    b.force(270, 100, '(m_H + m_S)g', { labelOpts: { dy: 6 } });
    b.accel(0, 0, { at: [-55, 110] });
    b.objectLabel('both', { dx: -10, dy: 22, anchor: 'end' });
    return panels([h, k, b], {
      title: 'Free-body diagrams for Superhero and Trusty Sidekick',
      desc: 'Three free-body diagrams with +x to the right and +y up, all with a = 0. Superhero: tension T1 up; his weight wH and the pull of the lower rope T2 both down. Sidekick: tension T2 up, weight wS down. Both together: T1 up and combined weight (mH + mS)g down; the lower rope is internal and does not appear.',
    });
  },

  // 4.6 Problem 13 — nurse pushing a cart downward at an angle
  fbd_04_06_p13: () => {
    const d = new FBD({
      title: 'Free-body diagram of the cart',
      desc: 'Free-body diagram with +x forward (to the right) and +y up: applied force F at 35 degrees below +x with dashed components F cos 35 along +x and F sin 35 along -y; friction f along -x; normal force N up; weight w down. a = 0 (constant velocity).',
      width: 440,
      height: 330,
      cx: 200,
      cy: 150,
    });
    d.axes({ xLen: 190, yLen: 120, xNeg: 160, yNeg: 160 });
    const w = 90;
    const friction = w * (60 / (28 * 9.8));
    const angle = (35 * Math.PI) / 180;
    const push = friction / Math.cos(angle);
    const pushY = push * Math.sin(angle);
    d.force(90, w + pushY, 'N');
    d.force(270, w, 'w', { labelOpts: { dx: -34 } });
    d.force(-35, push, 'F', { labelOpts: { at: [35, -42], anchor: 'start' } });
    d.component(0, friction, 'F cos 35°', { labelOpts: { at: [85, 25] } });
    d.component(270, pushY, 'F sin 35°', {
      from: [friction, 0],
      labelOpts: { at: [105, -55] },
    });
    d.force(180, friction, 'f', { labelOpts: { at: [-35, -20] } });
    d.arc(-35, 0, 50, '35°', { labelR: 70, size: 15 });
    d.accel(0, 0, { at: [-100, 90] });
    d.objectLabel('cart', { dx: -10, dy: 24, anchor: 'end' });
    return d.render();
  },
  // 4.7 Problem 1 — flea jumping in a breeze
  fbd_04_07_p01: () => {
    const d = new FBD({
      title: 'Free-body diagram of the jumping flea',
      desc: 'Free-body diagram with +x in the direction of the breeze (to the right) and +y up: force from the ground F ground up, weight w down (about half as long), small breeze force F breeze to the right. The acceleration points up and slightly to the right, 4.67 degrees from vertical.',
      width: 360,
      height: 340,
      cx: 160,
      cy: 200,
    });
    d.axes({ xLen: 150, yLen: 130, xNeg: 120, yNeg: 115 });
    d.force(90, 120, 'F_{ground}');
    d.force(270, 59, 'w');
    d.force(0, 32, 'F_{breeze}', { labelOpts: { dx: 14 } });
    d.accel(85.33, 60, { at: [-80, 20] });
    d.text(40, -128, 'F_{breeze} drawn larger than to scale', { size: 14, vshift: 6 });
    d.objectLabel('flea', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.7 Problem 2 — two muscles pulling on the Achilles tendon
  fbd_04_07_p02: () => {
    const d = new FBD({
      title: 'Forces on the Achilles tendon',
      desc: 'Diagram with +x to the right and +y up: F1 = 200 N pointing up and 20 degrees to the right of +y, F2 = 200 N pointing up and 20 degrees to the left of +y. Dashed horizontal components F1x along +x and F2x along -x cancel.',
      width: 380,
      height: 300,
      cx: 190,
      cy: 240,
    });
    d.axes({ xLen: 165, yLen: 200, xNeg: 165, yNeg: 40 });
    d.force(70, 175, 'F_1');
    d.force(110, 175, 'F_2');
    d.component(0, 60, 'F_{1x}', { labelOpts: { dy: -34 } });
    d.component(180, 60, 'F_{2x}', { labelOpts: { dy: -34 } });
    d.arc(70, 90, 90, '20°', { labelR: 108, size: 15 });
    d.arc(90, 110, 90, '20°', { labelR: 108, size: 15 });
    d.objectLabel('tendon', { dx: 60, dy: 40 });
    return d.render();
  },

  // 4.7 Problem 3 — person held by two ropes near a burning building
  fbd_04_07_p03: () => {
    const d = new FBD({
      title: 'Free-body diagram of the person being rescued',
      desc: 'Free-body diagram with +x to the right and +y up: T1 up and to the left at 15 degrees from +y, T2 to the right at 10 degrees above +x, weight w down. Dashed components of T1: T1 sin 15 along -x and T1 cos 15 along +y. a = 0.',
      width: 420,
      height: 340,
      cx: 200,
      cy: 180,
    });
    d.axes({ xLen: 185, yLen: 140, xNeg: 165, yNeg: 140 });
    const t1 = d.force(105, 128, 'T_1', { labelOpts: { dx: -4 } });
    const t2 = d.force(10, -t1[0] / Math.cos((10 * Math.PI) / 180), 'T_2');
    d.component(180, -t1[0], 'T_1 sin 15°', {
      labelOpts: { at: [-40, -22], anchor: 'end' },
    });
    d.component(90, t1[1], 'T_1 cos 15°', { from: [6, 0], labelOpts: { dy: -20 } });
    d.force(270, t1[1] + t2[1], 'w');
    d.arc(90, 105, 70, '15°', { labelR: 86, size: 15 });
    d.arc(0, 10, 110, '10°', { labelR: 124, size: 15 });
    d.accel(0, 0, { at: [-120, 110] });
    d.objectLabel('person', { dx: 12, dy: -26 });
    return d.render();
  },

  // 4.7 Problem 4 — dolphin slowing down
  fbd_04_07_p04: () => {
    const d = new FBD({
      title: 'Free-body diagram of the dolphin',
      desc: 'Free-body diagram with +x in the direction of motion (to the right) and +y up: drag force F to the left, buoyant force F B up, weight w down; the dolphin moves to the right but slows down, so the acceleration points to the left.',
      width: 380,
      height: 280,
      cx: 200,
      cy: 150,
    });
    d.axes({ xLen: 155, yLen: 105, xNeg: 160, yNeg: 105 });
    d.force(90, 70, 'F_B');
    d.force(270, 70, 'w');
    d.force(180, 60, 'F');
    d.accel(180, 40, { at: [-20, 85] });
    d.note(110, 70, 'moving → (slowing)', { size: 13 });
    d.objectLabel('dolphin', { dx: 10, dy: -26 });
    return d.render();
  },

  // 4.7 Problem 5 — sprinter at the start
  fbd_04_07_p05: () => {
    const d = new FBD({
      title: 'Free-body diagram of the sprinter',
      desc: 'Free-body diagram with +x forward (to the right) and +y up: forward force from the ground F to the right, normal force N up, weight w down; the acceleration points to the right.',
      width: 360,
      height: 280,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 165, yLen: 105, xNeg: 110, yNeg: 105 });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    d.force(0, 66, 'F');
    d.accel(0, 50, { at: [40, 80] });
    d.objectLabel('sprinter', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },

  // 4.7 Problem 6 — large rocket at takeoff
  fbd_04_07_p06: () => {
    const d = new FBD({
      title: 'Free-body diagram of the rocket at takeoff',
      desc: 'Free-body diagram with +x to the right and +y up: thrust F T up, weight w down (a little over half as long); the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 185,
    });
    d.axes({ xLen: 125, yLen: 125, xNeg: 110, yNeg: 115 });
    d.force(90, 105, 'F_T');
    d.force(270, 59, 'w');
    d.accel(90, 40, { at: [-70, 55] });
    d.objectLabel('rocket', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.7 Problem 7 — basketball player pushing off
  fbd_04_07_p07: () => {
    const d = new FBD({
      title: 'Free-body diagram of the basketball player during push-off',
      desc: 'Free-body diagram with +x to the right and +y up: normal force N from the floor up, four times as long as the weight w pointing down; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 200,
    });
    d.axes({ xLen: 125, yLen: 125, xNeg: 110, yNeg: 100 });
    d.force(90, 112, 'N');
    d.force(270, 28, 'w', { labelOpts: { dy: -4 } });
    d.accel(90, 40, { at: [-70, 55] });
    d.objectLabel('player', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.7 Problem 8 — fireworks shell in a vertical mortar
  fbd_04_07_p08: () => {
    const d = new FBD({
      title: 'Free-body diagram of the shell in the mortar',
      desc: 'Free-body diagram with +x to the right and +y up: force from the expanding gases F applied up, very much larger than the weight w pointing down; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 210,
    });
    d.axes({ xLen: 125, yLen: 125, xNeg: 110, yNeg: 95 });
    d.force(90, 112, 'F_{applied}');
    d.force(270, 14, 'w', { labelOpts: { dy: -6 } });
    d.accel(90, 40, { at: [-70, 55] });
    d.note(0, -110, 'w is 1/245 of F_applied (not to scale)', { size: 12, italic: true });
    d.objectLabel('shell', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },

  // 4.7 Problem 9 — shell in a mortar tilted 10° from vertical (tilted axes)
  fbd_04_07_p09: () => {
    const tilt = 80; // tube direction, measured from the horizontal
    const d = new FBD({
      title: 'Free-body diagram of the shell in the tilted mortar',
      desc: 'Free-body diagram with tilted axes: +x along the tube, 10 degrees from vertical, and +y perpendicular to the tube. The force from the gases F points along +x. The weight w points straight down and is split into dashed components mg cos 10 along -x and mg sin 10 along -y. The tube wall pushes with N along +y. The acceleration points along +x.',
      width: 400,
      height: 360,
      cx: 200,
      cy: 210,
    });
    d.axes({ angle: tilt, xLen: 140, yLen: 120, xNeg: 120, yNeg: 120 });
    d.force(tilt, 120, 'F');
    d.force(270, 80, 'w', { labelOpts: { dx: 4 } });
    d.component(tilt + 180, 78.8, 'mg cos 10°', {
      labelOpts: { at: [-26, -100], anchor: 'end', size: 16 },
    });
    d.component(tilt - 90, 13.9, '', {});
    d.text(22, -34, 'mg sin 10°', { size: 16, color: '#c0675e', anchor: 'start', vshift: 6 });
    d.force(tilt + 90, 14, 'N', { labelOpts: { dx: -6, dy: 4 } });
    d.arc(260, 270, 62, '10°', { labelR: 62, size: 14, dx: -14, dy: -10 });
    d.accel(tilt, 45, { at: [70, 60] });
    d.objectLabel('shell', { dx: 22, dy: 30 });
    return d.render();
  },

  // 4.7 Problem 10 — elevator: speeding up, constant velocity, slowing down
  fbd_04_07_p10: () => {
    const build = (caption, tLen, accel) => {
      const d = new FBD({ width: 230, height: 300, cx: 105, cy: 160, caption });
      d.axes({ xLen: 95, yLen: 115, xNeg: 85, yNeg: 115 });
      d.force(90, tLen, 'T');
      d.force(270, 80, 'w');
      if (accel > 0) d.accel(90, 40, { at: [-55, 50] });
      else if (accel < 0) d.accel(270, 30, { at: [-55, 80] });
      else d.accel(0, 0, { at: [-50, 95] });
      return d;
    };
    return panels(
      [
        build('(a) Speeding up', 98, 1),
        build('(b) Constant v', 80, 0),
        build('(c) Slowing down', 72, -1),
      ],
      {
        title: 'Free-body diagrams of the elevator in three phases',
        desc: 'Three free-body diagrams with +x to the right and +y up, each with cable tension T up and weight w down. (a) Speeding up: T longer than w, acceleration up. (b) Constant velocity: T equal to w, a = 0. (c) Slowing down while moving up: T shorter than w, acceleration down.',
      }
    );
  },

  // 4.7 Problem 12 — man on a scale in an accelerating elevator
  fbd_04_07_p12: () => {
    const d = new FBD({
      title: 'Free-body diagram of the man on the scale',
      desc: 'Free-body diagram with +x to the right and +y up: force from the scale F scale up, about 2.5 times as long as the weight w pointing down; the acceleration points up.',
      width: 320,
      height: 330,
      cx: 150,
      cy: 200,
    });
    d.axes({ xLen: 125, yLen: 125, xNeg: 110, yNeg: 100 });
    d.force(90, 110, 'F_{scale}');
    d.force(270, 44, 'w');
    d.accel(90, 40, { at: [-70, 55] });
    d.objectLabel('man', { dx: -10, dy: -22, anchor: 'end' });
    return d.render();
  },
};
