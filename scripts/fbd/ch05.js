import { FBD, panels } from './fbd.js';

/**
 * Free-body diagram of an object on an incline, with tilted axes:
 * +x along the slope (downhill or uphill) and +y perpendicular to it, away
 * from the surface. The weight is drawn straight down together with its dashed
 * components along the axes.
 *
 * opts.theta      - angle used for drawing (may be exaggerated)
 * opts.xDir       - 'down' (+x points downhill) or 'up' (+x points uphill)
 * opts.friction   - { dir: 'up' | 'down', label, len } or null
 * opts.accel      - 'up' | 'down' | 0 (direction along the slope, or none)
 * opts.thetaLabel - label for the incline angle (default θ)
 * opts.note       - optional italic note at the bottom
 */
function incline({
  theta,
  xDir,
  friction = null,
  accel = 0,
  thetaLabel = 'θ',
  note = '',
  name = '',
  title,
  desc,
}) {
  const W = 110;
  const s = Math.sin((theta * Math.PI) / 180);
  const c = Math.cos((theta * Math.PI) / 180);
  // Down-slope +x: the slope descends to the right. Up-slope +x: it rises to the right.
  const downhill = xDir === 'down' ? -theta : 180 + theta;
  const uphill = downhill + 180;
  const normal = xDir === 'down' ? 90 - theta : 90 + theta;
  const xAxis = xDir === 'down' ? downhill : uphill;
  const right = xDir === 'down';

  const d = new FBD({ title, desc, width: 440, height: 370, cx: 220, cy: 175 });
  // Faint surface line just below the dot.
  const [px, py] = FBD.polar(14, normal + 180);
  const [ux, uy] = FBD.polar(1, downhill);
  d.guide(px - 190 * ux, py - 190 * uy, px + 190 * ux, py + 190 * uy);
  d.axes({ angle: xAxis, xLen: 170, yLen: 140, xNeg: 150, yNeg: 140 });

  d.force(normal, W * c, 'N', { labelOpts: { dx: right ? 4 : -40 } });
  d.force(270, W, 'w', { labelOpts: { dx: right ? 4 : -32 } });
  d.component(downhill, W * s, `mg sin ${thetaLabel}`, {
    labelOpts: {
      at: FBD.polar(W * s + 10, downhill, 0, -24),
      anchor: right ? 'start' : 'end',
      size: 16,
    },
  });
  d.component(normal + 180, W * c, `mg cos ${thetaLabel}`, {
    labelOpts: {
      at: FBD.polar(W * c + 18, normal + 180, right ? -50 : 50, 0),
      anchor: 'middle',
      size: 16,
    },
  });
  if (friction) {
    const dir = friction.dir === 'up' ? uphill : downhill;
    d.force(dir, friction.len || 45, friction.label, { from: FBD.polar(4, normal) });
  }
  const arcFrom = right ? 270 - theta : 270;
  d.arc(arcFrom, arcFrom + theta, 64, thetaLabel, {
    labelR: 64,
    size: 16,
    dx: right ? -12 : 12,
    dy: -16,
  });
  if (accel) {
    const dir = accel === 'up' ? uphill : downhill;
    d.accel(dir, 45, { at: right ? [90, 110] : [-150, 40] });
  } else {
    d.accel(0, 0, { at: right ? [-120, 110] : [120, 110] });
  }
  if (note) d.note(0, -188, note, { size: 12, italic: true });
  if (name) d.objectLabel(name, { dx: right ? 50 : -50, dy: 22, anchor: right ? 'start' : 'end' });
  return d.render();
}

/** Horizontal-surface diagram: forces along x, N and w along y. */
function flat({
  caption = '',
  forces,
  accel = 0,
  name = '',
  nLabel = 'N',
  wLabel = 'w',
  nLen = 70,
  width = 360,
}) {
  const d = new FBD({ width, height: 280, cx: width / 2 - 10, cy: 145, caption });
  d.axes({ xLen: width / 2 - 25, yLen: 105, xNeg: width / 2 - 35, yNeg: 105 });
  d.force(90, nLen, nLabel);
  d.force(270, nLen, wLabel);
  for (const [angle, len, label, labelOpts = {}] of forces)
    d.force(angle, len, label, { labelOpts });
  if (accel) d.accel(accel > 0 ? 0 : 180, 40, { at: [40, 80] });
  else d.accel(0, 0, { at: [60, 85] });
  if (name) d.objectLabel(name, { dx: -10, dy: -28, anchor: 'end' });
  return d;
}

export default {
  // 5.1 Problem 4 — crate on a wood floor
  fbd_05_01_p04: () =>
    panels(
      [
        flat({
          caption: '(a) At rest, about to slip',
          forces: [
            [0, 110, 'F'],
            [180, 110, 'f_{s(max)}'],
          ],
          name: 'crate',
        }),
        flat({
          caption: '(b) Sliding',
          forces: [
            [0, 110, 'F'],
            [180, 66, 'f_k'],
          ],
          accel: 1,
          name: 'crate',
        }),
      ],
      {
        title: 'Free-body diagrams of the crate',
        desc: 'Two free-body diagrams with +x in the direction of the push (to the right) and +y up, each with normal force N up and weight w down. (a) At rest: applied force F to the right balanced by maximum static friction f s max to the left; a = 0. (b) Sliding: the same F to the right and a smaller kinetic friction f k to the left; acceleration to the right.',
      }
    ),

  // 5.1 Problem 5 — truck accelerating, and the cabinet in its bed
  fbd_05_01_p05: () =>
    panels(
      [
        flat({ caption: '(a) Truck', forces: [[0, 55, 'f_{s(max)}']], accel: 1, name: 'truck' }),
        flat({
          caption: '(b) Cabinet in the truck bed',
          forces: [[0, 55, 'f_s']],
          accel: 1,
          name: 'cabinet',
          nLabel: 'N_{cab}',
          wLabel: 'w_{cab}',
        }),
      ],
      {
        title: 'Free-body diagrams of the truck and the cabinet',
        desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a) Truck: normal force N up, weight w down, and static friction from the road on the drive wheels f s max pointing forward; acceleration forward. (b) Cabinet: normal force N cab up, weight w cab down, and static friction from the truck bed f s pointing forward; acceleration forward.',
      }
    ),

  // 5.1 Problem 6 — dog sled
  fbd_05_01_p06: () =>
    panels(
      [
        flat({
          caption: '(a), (b) System: dogs + sled',
          forces: [
            [0, 125, 'F_{dogs}'],
            [180, 30, 'f_k', { dx: -18 }],
          ],
          accel: 1,
          name: 'dogs + sled',
        }),
        flat({
          caption: '(c) System: sled only',
          forces: [
            [0, 80, 'T'],
            [180, 30, 'f_k', { dx: -18 }],
          ],
          accel: 1,
          name: 'sled',
          nLabel: 'N_{sled}',
          wLabel: 'w_{sled}',
          nLen: 55,
        }),
      ],
      {
        title: 'Free-body diagrams for the dog sled',
        desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a, b) Dogs plus sled: forward push from the snow F dogs to the right, kinetic friction on the runners f k to the left, N up, w down; acceleration forward. (c) Sled only: coupling force T to the right, f k to the left, N sled up, w sled down; acceleration forward.',
      }
    ),

  // 5.1 Problem 7 — skater pushed by two others
  fbd_05_01_p07: () => {
    const d = flat({
      forces: [
        [0, 110, 'F_{tot}'],
        [180, 45, 'f_k'],
      ],
      accel: 1,
      name: 'skater',
      width: 380,
    });
    d.title = 'Free-body diagram of the skater';
    d.desc =
      'Free-body diagram with +x along the total push F tot and +y up: F tot along +x, kinetic friction f k along -x, normal force N up, weight w down; acceleration along +x.';
    return d.render();
  },

  // 5.1 Problem 8 — frictionless incline
  fbd_05_01_p08: () =>
    incline({
      theta: 25,
      xDir: 'down',
      accel: 'down',
      name: 'object',
      title: 'Free-body diagram on a frictionless incline',
      desc: 'Free-body diagram with tilted axes: +x down the slope and +y perpendicular to the slope, away from it. Normal force N along +y, weight w straight down with dashed components mg sin theta along +x and mg cos theta along -y. The acceleration points down the slope.',
    }),

  // 5.1 Problem 9 — incline with kinetic friction
  fbd_05_01_p09: () =>
    incline({
      theta: 25,
      xDir: 'down',
      friction: { dir: 'up', label: 'f_k', len: 32 },
      accel: 'down',
      name: 'object',
      title: 'Free-body diagram on an incline with friction',
      desc: 'Free-body diagram with tilted axes: +x down the slope and +y perpendicular to the slope, away from it. Normal force N along +y, kinetic friction f k up the slope (along -x), weight w straight down with dashed components mg sin theta along +x and mg cos theta along -y. The acceleration points down the slope.',
    }),

  // 5.1 Problem 10 — snowboarder going up a slope
  fbd_05_01_p10: () =>
    incline({
      theta: 20,
      xDir: 'up',
      friction: { dir: 'down', label: 'f_k', len: 30 },
      accel: 'down',
      name: 'snowboarder',
      note: 'moving up the slope; angle exaggerated (actual 5.0°)',
      title: 'Free-body diagram of the snowboarder going uphill',
      desc: 'Free-body diagram with tilted axes: +x up the slope and +y perpendicular to the slope, away from it. Normal force N along +y; kinetic friction f k down the slope (along -x); weight w straight down with dashed components mg sin theta down the slope (along -x) and mg cos theta along -y. The snowboarder moves up the slope, but the acceleration points down the slope.',
    }),

  // 5.1 Problem 11 — skier going down a 10° slope
  fbd_05_01_p11: () =>
    incline({
      theta: 22,
      xDir: 'down',
      friction: { dir: 'up', label: 'f_k', len: 28 },
      accel: 'down',
      name: 'skier',
      note: 'angle exaggerated (actual 10.0°)',
      title: 'Free-body diagram of the skier',
      desc: 'Free-body diagram with tilted axes: +x down the slope and +y perpendicular to the slope, away from it. Normal force N along +y, kinetic friction f k up the slope (along -x), weight w straight down with dashed components mg sin theta along +x and mg cos theta along -y. The acceleration points down the slope (it is zero at the constant-velocity angle of part b).',
    }),

  // 5.1 Problem 12 — object at rest on an incline, on the verge of slipping
  fbd_05_01_p12: () =>
    incline({
      theta: 30,
      xDir: 'down',
      friction: { dir: 'up', label: 'f_s', len: 55 },
      accel: 0,
      name: 'object',
      title: 'Free-body diagram of an object resting on an incline',
      desc: 'Free-body diagram with tilted axes: +x down the slope and +y perpendicular to the slope, away from it. Normal force N along +y, static friction f s up the slope (along -x) equal in length to the weight component mg sin theta along +x, weight w straight down with dashed components mg sin theta and mg cos theta. a = 0.',
    }),

  // 5.1 Problem 13 — car braking while heading down a slope
  fbd_05_01_p13: () =>
    incline({
      theta: 20,
      xDir: 'up',
      friction: { dir: 'up', label: 'f_{s(max)}', len: 100 },
      accel: 'up',
      name: 'car',
      note: 'car moving down the slope while braking; angle exaggerated (actual 6°)',
      title: 'Free-body diagram of the braking car on a downhill slope',
      desc: 'Free-body diagram with tilted axes: +x up the slope and +y perpendicular to the slope, away from it. Normal force N along +y; maximum static friction f s max up the slope (along +x); weight w straight down with dashed components mg sin theta down the slope (along -x) and mg cos theta along -y. The car moves down the slope but slows, so its acceleration points up the slope.',
    }),

  // 5.1 Problem 14 — car accelerating up a slope (two-wheel drive)
  fbd_05_01_p14: () =>
    incline({
      theta: 20,
      xDir: 'up',
      friction: { dir: 'up', label: 'f_{s(max)}', len: 70 },
      accel: 'up',
      name: 'car',
      note: 'friction acts only on the drive wheels; angle exaggerated (actual 4°)',
      title: 'Free-body diagram of the car accelerating uphill',
      desc: 'Free-body diagram with tilted axes: +x up the slope and +y perpendicular to the slope, away from it. Normal force N along +y; static friction from the road on the drive wheels f s max up the slope (along +x); weight w straight down with dashed components mg sin theta along -x and mg cos theta along -y. The acceleration points up the slope.',
    }),

  // 5.1 Problem 16 — freight train
  fbd_05_01_p16: () =>
    panels(
      [
        flat({
          caption: '(a) System: whole train',
          forces: [
            [0, 130, 'F_{total}'],
            [180, 50, 'f'],
          ],
          accel: 1,
          name: 'train',
        }),
        flat({
          caption: '(b) System: cars 38–45',
          forces: [
            [0, 110, 'T'],
            [180, 42, 'f_{8 cars}'],
          ],
          accel: 1,
          name: 'cars 38–45',
          nLabel: 'N_{8 cars}',
          wLabel: 'w_{8 cars}',
        }),
      ],
      {
        title: 'Free-body diagrams for the freight train',
        desc: 'Two free-body diagrams with +x forward (to the right) and +y up. (a) Whole train: F total from the track to the right, friction f to the left, N up, w down; acceleration forward. (b) Cars 38 to 45: coupling force T to the right, their friction f 8 cars to the left, N up, w down; acceleration forward.',
      }
    ),

  // 5.1 Problem 17 — mountain climber on a vertical rock face
  fbd_05_01_p17: () => {
    const d = new FBD({
      title: 'Free-body diagram of the mountain climber',
      desc: 'Free-body diagram with +x away from the cliff (to the right; the cliff is on the left) and +y up: rope tension T up and toward the cliff at 31 degrees from +y; the cliff force on her feet F leg up and away from the cliff at 15 degrees above +x, with dashed components N along +x and f along +y; weight w down. a = 0.',
      width: 440,
      height: 340,
      cx: 230,
      cy: 180,
    });
    d.guide(-200, -150, -200, 150);
    d.note(-192, 140, 'cliff', { size: 13, anchor: 'start' });
    d.axes({ xLen: 180, yLen: 140, xNeg: 170, yNeg: 140 });
    const w = 127;
    const ropeAngle = (31 * Math.PI) / 180;
    const legAngle = (15 * Math.PI) / 180;
    const tension = w / (Math.cos(ropeAngle) + Math.sin(ropeAngle) * Math.tan(legAngle));
    d.force(121, tension, 'T');
    const leg = d.force(15, (tension * Math.sin(ropeAngle)) / Math.cos(legAngle), 'F_{leg}', {
      labelOpts: { at: [95, 48], anchor: 'start' },
    });
    d.component(0, leg[0], 'N', { labelOpts: { at: [35, -28] } });
    d.component(90, leg[1], 'f', {
      from: [leg[0], 0],
      labelOpts: { at: [82, 6], anchor: 'start' },
    });
    d.force(270, w, 'w');
    d.arc(90, 121, 70, '31°', { labelR: 88, size: 15 });
    d.arc(0, 15, 50, '15°', { labelR: 65, size: 15, dx: 4, dy: -20 });
    d.accel(0, 0, { at: [110, 110] });
    d.objectLabel('climber', { dx: -12, dy: -30, anchor: 'end' });
    return d.render();
  },

  // 5.1 Problem 18 — pushing a block of ice downward at 25°
  fbd_05_01_p18: () => {
    const d = new FBD({
      title: 'Free-body diagram of the pushed block of ice',
      desc: 'Free-body diagram with +x forward (to the right) and +y up: applied force F at 25 degrees below +x with dashed components F cos 25 along +x and F sin 25 along -y; friction f along -x; normal force N up; weight w down.',
      width: 440,
      height: 330,
      cx: 210,
      cy: 150,
    });
    d.axes({ xLen: 185, yLen: 125, xNeg: 165, yNeg: 160 });
    d.force(90, 110, 'N');
    d.force(270, 105, 'w', { labelOpts: { dx: -34 } });
    d.force(-25, 125, 'F');
    d.component(0, 113, 'F cos 25°');
    d.component(270, 53, 'F sin 25°', { from: [113, 0] });
    d.force(180, 60, 'f');
    d.arc(-25, 0, 55, '25°', { labelR: 75, size: 15 });
    d.text(-195, -150, 'f = f_{s(max)} in (a),  f = f_k in (b)', {
      size: 15,
      anchor: 'start',
      vshift: 6,
    });
    d.objectLabel('block', { dx: 12, dy: 24 });
    return d.render();
  },

  // 5.1 Problem 19 — pulling a block of ice upward at 25°
  fbd_05_01_p19: () => {
    const d = new FBD({
      title: 'Free-body diagram of the pulled block of ice',
      desc: 'Free-body diagram with +x forward (to the right) and +y up: applied force F at 25 degrees above +x with dashed components F cos 25 along +x and F sin 25 along +y; friction f along -x; normal force N up (shorter than w); weight w down.',
      width: 440,
      height: 330,
      cx: 210,
      cy: 175,
    });
    d.axes({ xLen: 185, yLen: 135, xNeg: 165, yNeg: 135 });
    d.force(90, 95, 'N', { from: [-6, 0], labelOpts: { dx: -34 } });
    d.force(270, 105, 'w');
    d.force(25, 125, 'F');
    d.component(0, 113, 'F cos 25°', { labelOpts: { dy: -36 } });
    d.component(90, 53, 'F sin 25°', { from: [113, 0] });
    d.force(180, 60, 'f');
    d.arc(0, 25, 55, '25°', { labelR: 75, size: 15 });
    d.text(-195, -125, 'f = f_{s(max)} in (a),  f = f_k in (b)', {
      size: 15,
      anchor: 'start',
      vshift: 6,
    });
    d.objectLabel('block', { dx: -10, dy: -28, anchor: 'end' });
    return d.render();
  },
  // 5.2 Problem 1 — skydiver at terminal velocity
  fbd_05_02_p01: () => {
    const d = new FBD({
      title: 'Free-body diagram of the skydiver at terminal velocity',
      desc: 'Free-body diagram with +x to the right and +y up: drag force F D up and weight mg down, equal lengths; the skydiver moves down at constant velocity, so a = 0.',
      width: 320,
      height: 300,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 125, yLen: 115, xNeg: 110, yNeg: 115 });
    d.force(90, 85, 'F_D');
    d.force(270, 85, 'mg');
    d.accel(0, 0, { at: [-70, 95] });
    d.note(80, -30, 'moving down,', { size: 13 });
    d.note(80, -46, 'constant speed', { size: 13 });
    d.objectLabel('skydiver', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },

  // 5.2 Problem 8 — bacterium sinking at terminal velocity in water
  fbd_05_02_p08: () => {
    const d = new FBD({
      title: 'Free-body diagram of the sinking bacterium',
      desc: 'Free-body diagram with +x to the right and +y up: Stokes drag F s up and buoyant force F B up, drawn side by side, together balancing the weight w pointing down; a = 0 at terminal velocity.',
      width: 320,
      height: 300,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 125, yLen: 115, xNeg: 110, yNeg: 115 });
    d.force(90, 16, '', { from: [-7, 0] });
    d.text(-14, 26, 'F_s', { anchor: 'end', vshift: 6 });
    d.force(90, 80, 'F_B', { from: [7, 0] });
    d.force(270, 96, 'w');
    d.accel(0, 0, { at: [-70, 95] });
    d.text(0, -128, 'F_s is about 1/11 of w', { size: 15, vshift: 6 });
    d.objectLabel('bacterium', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },
};
