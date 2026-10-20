import { FBD, panels } from './fbd.js';

/** Single vertical-force diagram (circular motion at the bottom or top of a path). */
function verticalPanel({
  title,
  desc,
  up,
  down,
  upLen,
  downLen,
  accel,
  name,
  note = '',
  nameUp = false,
  caption = '',
}) {
  const d = new FBD({ title, desc, caption, width: 320, height: 330, cx: 150, cy: 180 });
  d.axes({ xLen: 125, yLen: 130, xNeg: 110, yNeg: 130 });
  for (const [label, len, from] of up) d.force(90, len || upLen, label, { from: from || [0, 0] });
  for (const [label, len, from, labelOpts] of down)
    d.force(270, len || downLen, label, { from: from || [0, 0], labelOpts: labelOpts || {} });
  if (accel) d.accel(accel > 0 ? 90 : 270, 40, { at: accel > 0 ? [-70, 60] : [-70, 100] });
  if (note) d.note(75, -40, note, { size: 13 });
  d.objectLabel(
    name,
    nameUp ? { dx: -10, dy: 24, anchor: 'end' } : { dx: -10, dy: -24, anchor: 'end' }
  );
  if (!accel) d.accel(0, 0, { at: [-70, 100] });
  return d;
}

const vertical = opts => verticalPanel(opts).render();

/**
 * Car (or sled) on a frictionless, ideally banked curve. +x points horizontally
 * toward the center of the curve, +y up. The normal force is tilted θ from the
 * vertical toward the center.
 */
function banked({ theta, wLen = 80, name, note = '', title, desc, friction = null }) {
  const nLen =
    (wLen - (friction ? friction.len * Math.sin((theta * Math.PI) / 180) : 0)) /
    Math.cos((theta * Math.PI) / 180);
  const d = new FBD({ title, desc, width: 440, height: 360, cx: 200, cy: 200 });
  // Faint road surface, rising toward the outside of the curve (to the left).
  const [ux, uy] = FBD.polar(1, 180 - theta);
  const [px, py] = FBD.polar(12, 270 - theta);
  d.guide(px - 150 * ux, py - 150 * uy, px + 170 * ux, py + 170 * uy);
  d.note(-170, -60, 'outside', { size: 12, anchor: 'start' });
  d.note(170, -60, 'center →', { size: 12, anchor: 'end' });
  d.axes({ xLen: 200, yLen: 150, xNeg: 180, yNeg: 130 });
  const Ntip = d.force(90 - theta, nLen, 'N', { labelOpts: { dx: 4 } });
  d.component(0, Ntip[0], 'N sin θ', { labelOpts: { at: [Ntip[0] + 24, -22], anchor: 'start' } });
  d.component(90, Ntip[1], 'N cos θ', {
    from: [-6, 0],
    labelOpts: { at: [-14, Ntip[1] - 10], anchor: 'end' },
  });
  if (friction) d.force(180 - theta, friction.len, friction.label, { labelOpts: { dy: 4 } });
  d.force(270, wLen, 'w');
  d.arc(90 - theta, 90, Math.min(60, nLen * 0.55), 'θ', {
    labelR: Math.min(60, nLen * 0.55) + 14,
    size: 16,
  });
  d.accel(0, 45, { at: [70, -105] });
  if (note) d.note(0, -150, note, { size: 12, italic: true });
  if (name) d.objectLabel(name, { dx: -12, dy: -56, anchor: 'end' });
  return d.render();
}

export default {
  // 6.2 Problem 12 — rider at the bottom of the Viking-ship ride
  fbd_06_02_p12: () =>
    vertical({
      title: 'Free-body diagram of the rider at the bottom of the arc',
      desc: 'Free-body diagram with +x to the right and +y up (toward the center of the circle): normal force N from the seat up, five times as long as the weight w pointing down; the centripetal acceleration points up, toward the pivot.',
      up: [['N', 115]],
      down: [['w', 23]],
      accel: 1,
      name: 'rider',
      note: 'center of circle ↑',
    }),

  // 6.2 Problem 13 — child at the bottom of a swing
  fbd_06_02_p13: () =>
    vertical({
      title: 'Free-body diagram of the child at the bottom of the swing',
      desc: 'Free-body diagram with +x to the right and +y up (toward the pivot): force from the seat N up, about five times as long as the weight w pointing down; the centripetal acceleration points up.',
      up: [['N', 115]],
      down: [['w', 22]],
      accel: 1,
      name: 'child',
      note: 'pivot ↑',
    }),

  // 6.3 Problem 1 — child on a merry-go-round
  fbd_06_03_p01: () => {
    const d = new FBD({
      title: 'Free-body diagram of the child on the merry-go-round',
      desc: 'Free-body diagram with +x horizontally toward the center of the merry-go-round and +y up: centripetal force from the ride F c along +x, normal force N up, weight w down; the acceleration points toward the center.',
      width: 400,
      height: 290,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 205, yLen: 110, xNeg: 110, yNeg: 110 });
    d.note(150, -18, 'toward center →', { size: 12, anchor: 'end' });
    d.force(90, 60, 'N');
    d.force(270, 60, 'w');
    d.force(0, 134, 'F_c');
    d.accel(0, 45, { at: [50, 75] });
    d.objectLabel('child', { dx: -10, dy: -26, anchor: 'end' });
    d.note(60, -120, 'lengths drawn for part (a)', { size: 12, italic: true });
    return d.render();
  },

  // 6.3 Problem 3 — ideally banked highway curve
  fbd_06_03_p03: () =>
    banked({
      theta: 20,
      name: 'car',
      note: 'banking angle exaggerated (actual 4.14°)',
      title: 'Free-body diagram of a car on an ideally banked curve',
      desc: 'Free-body diagram with +x horizontally toward the center of the curve and +y up: normal force N tilted theta from the vertical toward the center, with dashed components N sin theta along +x and N cos theta along +y; weight w down. No friction. The acceleration points toward the center.',
    }),

  // 6.3 Problem 4 — curve banked at 20.0°
  fbd_06_03_p04: () =>
    banked({
      theta: 20,
      name: 'car',
      title: 'Free-body diagram of a car on a curve banked at 20 degrees',
      desc: 'Free-body diagram with +x horizontally toward the center of the curve and +y up: normal force N tilted 20 degrees from the vertical toward the center, with dashed components N sin theta along +x and N cos theta along +y; weight w down. No friction. The acceleration points toward the center.',
    }),

  // 6.3 Problem 5 — bobsled on a turn banked at 75.0°
  fbd_06_03_p05: () =>
    banked({
      theta: 75,
      wLen: 40,
      name: 'bobsled',
      title: 'Free-body diagram of the bobsled on a turn banked at 75 degrees',
      desc: 'Free-body diagram with +x horizontally toward the center of the turn and +y up: normal force N tilted 75 degrees from the vertical toward the center, nearly horizontal, with dashed components N sin theta along +x and N cos theta along +y; a short weight w down. No friction. The acceleration points toward the center.',
    }),

  // 6.3 Problem 6 — bicycle leaning into a turn
  fbd_06_03_p06: () => {
    const d = new FBD({
      title: 'Free-body diagram of the bicycle and rider in a turn',
      desc: 'Free-body diagram with +x horizontally toward the center of the turn and +y up: normal force N up, friction f along +x toward the center, weight w down. The total ground force F, the sum of N and f, lies along the dashed line tilted theta from the vertical. The acceleration points toward the center.',
      width: 400,
      height: 330,
      cx: 160,
      cy: 180,
    });
    d.axes({ xLen: 200, yLen: 130, xNeg: 120, yNeg: 130 });
    d.note(150, -18, 'toward center →', { size: 12, anchor: 'end' });
    const tan = 0.49;
    d.force(90, 100, 'N');
    d.force(0, 100 * tan, 'f', { labelOpts: { dy: -34 } });
    d.force(270, 100, 'w');
    d.guide(0, 0, 100 * tan * 1.25, 125);
    d.text(100 * tan * 1.25 + 6, 125, 'F = N + f', { size: 16, anchor: 'start', vshift: 6 });
    d.arc(90 - 26.1, 90, 55, 'θ', { labelR: 70, size: 16 });
    d.accel(0, 45, { at: [80, 50] });
    d.objectLabel('bicycle + rider', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },

  // 6.3 Problem 7 — centrifuge cage
  fbd_06_03_p07: () => {
    const d = new FBD({
      title: 'Free-body diagram of the centrifuge cage',
      desc: 'Free-body diagram with +x horizontally toward the center of rotation and +y up: force of the arm F inward and upward at angle theta above +x, with dashed components F cos theta along +x and F sin theta along +y; weight mg down. The acceleration points toward the center.',
      width: 420,
      height: 300,
      cx: 120,
      cy: 150,
    });
    d.axes({ xLen: 260, yLen: 110, xNeg: 90, yNeg: 110 });
    d.note(250, -40, 'toward center →', { size: 12, anchor: 'end' });
    d.force(15, 200, 'F');
    d.component(0, 193, 'F cos θ', { labelOpts: { dy: -36 } });
    d.component(90, 52, 'F sin θ', { from: [193, 0] });
    d.force(270, 52, 'mg');
    d.arc(0, 15, 90, 'θ', { labelR: 104, size: 16 });
    d.accel(0, 45, { at: [40, 85] });
    d.note(150, -110, 'angle exaggerated (actual 5.71°)', { size: 12, italic: true });
    d.objectLabel('cage', { dx: -10, dy: 24, anchor: 'end' });
    return d.render();
  },

  // 6.3 Problem 8 — banked curve taken slower than the ideal speed
  fbd_06_03_p08: () => {
    const theta = (15 * Math.PI) / 180;
    const wLen = 80;
    const accelerationRatio = (20 / 3.6) ** 2 / (100 * 9.8);
    // f / mg = sin θ − (v²/rg) cos θ, from vertical and radial force balance.
    const frictionLen = wLen * (Math.sin(theta) - accelerationRatio * Math.cos(theta));
    return banked({
      theta: 15,
      wLen,
      name: 'car',
      friction: { label: 'f', len: frictionLen },
      note: 'slower than ideal: friction points up the slope',
      title: 'Free-body diagram of a car on a banked curve below the ideal speed',
      desc: 'Free-body diagram with +x horizontally toward the center of the curve and +y up: normal force N tilted theta from the vertical toward the center, with dashed components N sin theta along +x and N cos theta along +y; friction f along the road surface, up the slope (away from the center and upward); weight w down. The acceleration points toward the center.',
    });
  },

  // 6.3 Problem 9 — roller coaster at the top of a loop
  fbd_06_03_p09: () =>
    vertical({
      title: 'Free-body diagram of a passenger at the top of the loop',
      desc: 'Free-body diagram with +x to the right and +y up: the seat (above the upside-down passenger) pushes down with N, and the weight w also points down; N is half as long as w. The centripetal acceleration points down, toward the center of the loop.',
      up: [],
      down: [
        ['N', 40, [-7, 0], { dx: -40, dy: -4 }],
        ['w', 80, [7, 0]],
      ],
      accel: -1,
      name: 'passenger',
      nameUp: true,
      note: 'center of loop ↓',
    }),

  // 6.3 Problem 10 — car on an unbanked curve
  fbd_06_03_p10: () => {
    const d = new FBD({
      title: 'Free-body diagram of a car on an unbanked curve',
      desc: 'Free-body diagram with +x horizontally toward the center of the curve and +y up: static friction f s along +x, normal force N up, weight w down; the acceleration points toward the center.',
      width: 400,
      height: 290,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 205, yLen: 110, xNeg: 110, yNeg: 110 });
    d.note(150, -18, 'toward center →', { size: 12, anchor: 'end' });
    d.force(90, 70, 'N');
    d.force(270, 70, 'w');
    d.force(0, 120, 'f_s');
    d.accel(0, 45, { at: [50, 75] });
    d.objectLabel('car', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },

  // 6.3 Conceptual Question 5 — the car at the top of a vertical loop
  fbd_06_03_q05: () =>
    panels(
      [
        verticalPanel({
          caption: '(a) faster than √(rg)',
          up: [],
          down: [
            ['F_{track}', 45, [-7, 0], { dx: -78, dy: -4 }],
            ['w', 80, [7, 0]],
          ],
          accel: -1,
          name: 'car',
          nameUp: true,
          note: 'center of loop ↓',
        }),
        verticalPanel({
          caption: '(b) slower than √(rg)',
          up: [['F_{track}', 35]],
          down: [['w', 80]],
          accel: -1,
          name: 'car',
          nameUp: true,
          note: 'center of loop ↓',
        }),
      ],
      {
        title: 'Free-body diagrams of the car at the top of the loop',
        desc: 'Two free-body diagrams of the upside-down car at the top of the loop, with +x to the right and +y up; the center of the loop is below the car. (a) Faster than the speed at which gravity alone suffices: the track pushes down on the car with F track, adding to the weight w; both point toward the center. (b) Slower: the track (through the safety wheels) pushes up on the car with F track, smaller than w. In both cases the centripetal acceleration points down, toward the center.',
      }
    ),

  // 6.3 Conceptual Question 6 — force of the car on the passenger at the top of the loop
  fbd_06_03_q06: () =>
    panels(
      [
        verticalPanel({
          caption: '(a) v = √(rg)',
          up: [],
          down: [['w', 80]],
          accel: -1,
          name: 'passenger',
          nameUp: true,
          note: 'center of loop ↓',
        }),
        verticalPanel({
          caption: '(b) v > √(rg)',
          up: [],
          down: [
            ['N_{seat}', 45, [-7, 0], { dx: -70, dy: -4 }],
            ['w', 80, [7, 0]],
          ],
          accel: -1,
          name: 'passenger',
          nameUp: true,
          note: 'center of loop ↓',
        }),
        verticalPanel({
          caption: '(c) v < √(rg)',
          up: [['F_{bar}', 35]],
          down: [['w', 80]],
          accel: -1,
          name: 'passenger',
          nameUp: true,
          note: 'center of loop ↓',
        }),
      ],
      {
        title: 'Free-body diagrams of the passenger at the top of the loop',
        desc: 'Three free-body diagrams of the upside-down passenger at the top of the loop, with +x to the right and +y up; the center of the loop is below. (a) At the speed where gravity alone supplies the centripetal force, only the weight w acts; the car exerts no force. (b) Faster: the seat, which is above the passenger, pushes down with N seat in addition to w. (c) Slower: the safety bar or harness pulls up on the passenger with F bar, smaller than w. In all three the acceleration points down, toward the center.',
      }
    ),

  // 6.3 Conceptual Question 7 — skater turning on ice
  fbd_06_03_q07: () => {
    const d = new FBD({
      title: 'Free-body diagram of a skater turning on a circle',
      desc: 'Free-body diagram with +x horizontally toward the center of the circle and +y up: the ice pushes sideways on the edge of the blade with static friction f s along +x, toward the center; normal force N up; weight w down. The friction force is the centripetal force, and the acceleration points toward the center.',
      width: 400,
      height: 290,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 205, yLen: 110, xNeg: 110, yNeg: 110 });
    d.note(150, -18, 'toward center →', { size: 12, anchor: 'end' });
    d.force(90, 80, 'N');
    d.force(270, 80, 'w');
    d.force(0, 70, 'f_s');
    d.accel(0, 45, { at: [50, 75] });
    d.objectLabel('skater', { dx: -10, dy: -26, anchor: 'end' });
    return d.render();
  },

  // 6.3 Conceptual Question 9 — passenger on an ideally banked curve
  fbd_06_03_q09: () =>
    banked({
      theta: 20,
      name: 'passenger',
      note: 'ideal speed: no sideways friction from the seat',
      title: 'Free-body diagram of a passenger on an ideally banked curve',
      desc: 'Free-body diagram of the passenger with +x horizontally toward the center of the curve and +y up: the seat pushes with N perpendicular to the seat, which is tilted with the road by the banking angle theta, with dashed components N sin theta along +x and N cos theta along +y; weight w down. No sideways friction is needed. The acceleration points toward the center.',
    }),

  // 6.4 Conceptual Question 3 — rider pinned to the wall of a rotating barrel
  fbd_06_04_q03: () => {
    const d = new FBD({
      title: 'Free-body diagram of a rider in the rotating barrel',
      desc: 'Free-body diagram with +x horizontally toward the axis of the barrel and +y up: the wall pushes the rider toward the axis with the normal force N along +x, which is the centripetal force; static friction from the wall f s points up and balances the weight w, which points down. The acceleration points toward the axis.',
      width: 420,
      height: 300,
      cx: 150,
      cy: 150,
    });
    d.axes({ xLen: 225, yLen: 115, xNeg: 110, yNeg: 115 });
    d.note(150, -18, 'toward axis →', { size: 12, anchor: 'end' });
    d.guide(-12, -110, -12, 110);
    d.note(-20, 100, 'wall', { size: 12, anchor: 'end' });
    d.force(0, 150, 'N');
    d.force(90, 75, 'f_s');
    d.force(270, 75, 'w');
    d.accel(0, 45, { at: [60, 80] });
    d.objectLabel('rider', { dx: 12, dy: 24, anchor: 'start' });
    return d.render();
  },
};
