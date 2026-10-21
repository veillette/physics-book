import { C, Sketch } from './sketch.js';
import { acc, axesAt, box, caption, force, hAxis, K, unit, vel, wall } from './mechanics.js';

/**
 * A one-dimensional momentum sketch: one row per moment (before, during,
 * after), each with its objects on a track, and a +x axis along the bottom.
 *
 *   rows: [{ caption, objs }]
 *   objs: [{ x, name, shape, w, open, v, vLabel, F, FLabel }]
 *     v      – signed length (px) of the velocity arrow, positive along +x;
 *              0 with a vLabel prints the label alone ("v_2 = 0")
 *     F      – signed length (px) of a force on the object, drawn from its
 *              side; FLabel labels it
 *   wallAt – pixel x of a fixed wall on the right of every row
 */
function rows1D({
  title,
  desc,
  width = 620,
  rows,
  note = '(direction of motion)',
  wallAt,
  rowH = 112,
}) {
  const top = 70;
  const axisY = top + rows.length * rowH - 50;
  const s = new Sketch({ width, height: axisY + 40, title, desc });
  const right = width - 150;
  rows.forEach((row, k) => {
    const y = top + k * rowH;
    s.ground(40, wallAt ?? right + 10, y + 16, { hatch: false });
    if (wallAt) wall(s, wallAt, y - 40, y + 16);
    if (row.caption) caption(s, 14, y - 44, row.caption);
    for (const o of row.objs) {
      const w = o.w ?? 50;
      if (o.shape === 'dot') {
        s.dot(o.x, y + 15 - (o.r ?? 8), { open: o.open, r: o.r ?? 8 });
      } else {
        box(s, o.x, y + 3, w, 26, 0, { fill: o.open ? '#ffffff' : '#d6e4f0' });
      }
      if (o.name) s.note(o.x, y + 34, o.name);
      if (o.v) {
        vel(s, o.x - o.v / 2, y - 26, 0, o.v, null);
        if (o.vLabel) s.label(o.x, y - 44, o.vLabel, { color: K.vel });
      } else if (o.vLabel) {
        s.label(o.x, y - 30, o.vLabel, { color: K.vel });
      }
      if (o.F) {
        const half = o.shape === 'dot' ? 8 : w / 2;
        const x0 = o.x + (o.F > 0 ? half : -half);
        force(s, x0, y + 3, o.F > 0 ? 0 : 180, Math.abs(o.F), null);
        if (o.FLabel) {
          s.label(x0 + o.F / 2, y - 12, o.FLabel, { color: K.force, size: 15 });
        }
      }
    }
  });
  hAxis(s, 40, right, axisY, { note });
  return s.render();
}

/** A vertical rocket: +y up, thrust up, weight down, exhaust down. */
function rocket({ title, desc, lines }) {
  const s = new Sketch({ width: 520, height: 330, title, desc });
  s.axis(60, 310, 60, 30, { label: '+y', note: '(up)' });
  const x = 200;
  s.svg.polygon(
    [
      [x, 70],
      [x + 18, 100],
      [x + 18, 200],
      [x - 18, 200],
      [x - 18, 100],
    ],
    { fill: '#d6e4f0', stroke: C.body, width: 2 }
  );
  s.svg.polygon(
    [
      [x - 12, 200],
      [x + 12, 200],
      [x, 240],
    ],
    { fill: '#f5b041', stroke: '#d35400', width: 1.5 }
  );
  force(s, x + 34, 150, 90, 80, 'F_{thrust}', { at: [x + 46, 92], anchor: 'start' });
  force(s, x + 34, 160, 270, 50, 'mg', { at: [x + 46, 206], anchor: 'start' });
  vel(s, x - 40, 220, 270, 70, 'v_e', { at: [x - 50, 270], anchor: 'end' });
  s.note(x - 40, 304, 'exhaust gas');
  acc(s, x - 60, 130, 90, 50, 'a', { at: [x - 70, 104], anchor: 'end' });
  s.lines(330, 120, lines, { anchor: 'start', size: 15, gap: 22 });
  return s.render();
}

/** Axes for a two-dimensional sketch, with notes, through pixel (ox, oy). */
function plane2D(s, ox, oy, opts) {
  axesAt(s, ox, oy, { xPos: 190, xNeg: 150, yPos: 120, yNeg: 110, ...opts });
}

/** A velocity arrow of pixel length `len` at math angle `a`, from (x, y). */
const v2 = (s, x, y, a, len, label, opts) => vel(s, x, y, a, len, label, opts);

export default {
  // 8.1 Problem 5 — runaway train car brought to rest
  sketch_08_01_p05: () =>
    rows1D({
      title: 'Sketch of the train car brought to rest',
      desc: 'A horizontal +x axis points in the direction the train car moves. Initially it moves at v_i = +5.4 m/s; the stopping force F = 1500 N acts on it along −x. Finally it is at rest, v_f = 0, after an unknown time Δt.',
      rows: [
        {
          caption: 'initially',
          objs: [
            {
              x: 250,
              name: 'train car',
              v: 70,
              vLabel: 'v_i = +5.4 \\rm{m/s}',
              F: -70,
              FLabel: 'F = 1500 \\rm{N}',
            },
          ],
        },
        { caption: 'after Δt = ?', objs: [{ x: 380, open: true, vLabel: 'v_f = 0' }] },
      ],
    }),

  // 8.2 Problem 2 — passenger stopped by the seat belt
  sketch_08_02_p02: () =>
    rows1D({
      title: 'Sketch of the passenger stopped by the seat belt',
      desc: 'A horizontal +x axis points in the direction the car was moving. The passenger starts with v_i = +10 m/s; the seat belt pushes on him along −x. After Δt = 0.26 s he is at rest, v_f = 0.',
      rows: [
        {
          caption: 'initially',
          objs: [
            {
              x: 250,
              shape: 'dot',
              name: 'passenger',
              v: 70,
              vLabel: 'v_i = +10 \\rm{m/s}',
              F: -70,
              FLabel: 'F_{belt}',
            },
          ],
        },
        {
          caption: 'after 0.26 s',
          objs: [{ x: 380, shape: 'dot', open: true, vLabel: 'v_f = 0' }],
        },
      ],
    }),

  // 8.2 Problem 5 — bumper car rebounds from the rail
  sketch_08_02_p05: () =>
    rows1D({
      title: 'Sketch of the bumper car hitting the side rail',
      desc: 'A horizontal +x axis points toward the rail, the bumper car’s initial direction of motion. Before: v_i = +2.80 m/s. During the 0.200-s contact the rail pushes on the car with F = 4000 N along −x. After: the velocity v_f is unknown (it turns out negative, away from the rail).',
      wallAt: 470,
      rows: [
        {
          caption: 'before',
          objs: [{ x: 300, name: 'bumper car', v: 60, vLabel: 'v_i = +2.80 \\rm{m/s}' }],
        },
        { caption: 'during contact', objs: [{ x: 444, F: -70, FLabel: 'F = 4000 \\rm{N}' }] },
        { caption: 'after', objs: [{ x: 300, open: true, vLabel: 'v_f = ?' }] },
      ],
      note: '(toward the rail)',
    }),

  // 8.2 Problem 10 — rugby player hits a padded goalpost
  sketch_08_02_p10: () =>
    rows1D({
      title: 'Sketch of the rugby player colliding with the goalpost',
      desc: 'A horizontal +x axis points in the player’s initial direction of motion, toward the goalpost. Before: v_i = +8.00 m/s. During the collision the post pushes back on him with F = 1.76 × 10⁴ N along −x for 5.50 × 10⁻² s. After: the velocity v_f is unknown.',
      wallAt: 470,
      rows: [
        {
          caption: 'before',
          objs: [{ x: 300, shape: 'dot', name: 'player', v: 70, vLabel: 'v_i = +8.00 \\rm{m/s}' }],
        },
        {
          caption: 'during contact',
          objs: [{ x: 460, shape: 'dot', F: -80, FLabel: 'F = 1.76 × 10^4 \\rm{N}' }],
        },
        { caption: 'after', objs: [{ x: 300, shape: 'dot', open: true, vLabel: 'v_f = ?' }] },
      ],
      note: '(toward the post)',
    }),

  // 8.2 Problem 11 — fire-hose water stopped by a wall
  sketch_08_02_p11: () => {
    const s = new Sketch({
      width: 600,
      height: 240,
      title: 'Sketch of the water from the fire hose striking the wall',
      desc: 'A horizontal +x axis points from the hose toward the wall. The water arrives with v_i = +42.0 m/s at 50.0 kg/s and is stopped (v_f = 0). The wall pushes on the water along −x; by Newton’s third law the water pushes on the wall along +x.',
    });
    wall(s, 430, 50, 170);
    s.svg.rect(40, 96, 70, 22, { fill: '#cfd8dc', stroke: C.body });
    s.note(75, 136, 'hose');
    for (let y = 100; y <= 114; y += 7)
      s.svg.line(110, y, 428, y, { color: C.water, width: 2.5, dash: '10 6' });
    vel(s, 180, 70, 0, 80, 'v_i = +42.0 \\rm{m/s}', { at: [220, 52] });
    s.label(380, 66, 'v_f = 0', { color: K.vel });
    force(s, 426, 140, 180, 70, 'F_{wall on water}', { at: [350, 158] });
    force(s, 434, 140, 0, 60, 'F_{water on wall}', { at: [440, 186], anchor: 'start' });
    hAxis(s, 40, 440, 214, { note: '(toward the wall)' });
    return s.render();
  },

  // 8.2 Problem 14 — ball bounces off a vertical wall
  sketch_08_02_p14: () => {
    const s = new Sketch({
      width: 600,
      height: 330,
      title: 'Sketch of the ball bouncing off the wall',
      desc: 'Axes with +x horizontal toward the wall and +y up. The ball arrives with v_i = 10 m/s at 60° above +x and leaves with v_f = 10 m/s at 60° above −x. The y-components are equal; the x-component reverses from +5.00 m/s to −5.00 m/s, so the impulse J from the wall points along −x.',
    });
    const wx = 400;
    wall(s, wx, 40, 310);
    axesAt(s, 60, 290, {
      xPos: 80,
      xNeg: 0,
      yPos: 70,
      yNeg: 0,
      xNote: '(toward the wall)',
      yNote: '(up)',
    });
    const hit = [wx - 6, 180];
    const [ux, uy] = unit(60);
    const start = [hit[0] - ux * 120, hit[1] - uy * 120];
    s.path([start, hit]);
    s.dot(...start, { r: 6 });
    v2(s, ...start, 60, 56, 'v_i', { dx: -4 });
    s.ref(...start, start[0] + 44, start[1]);
    s.angle(...start, 30, 0, 60, '60°', { lr: 46 });
    const [rx, ry] = unit(120);
    const out = [hit[0] + rx * 120, hit[1] + ry * 120];
    s.path([hit, out]);
    s.dot(...out, { open: true, r: 6 });
    v2(s, ...out, 120, 56, 'v_f', { dx: 4 });
    s.ref(...out, out[0] - 44, out[1]);
    s.angle(...out, 30, 120, 180, '60°', { lr: 46 });
    force(s, hit[0] - 4, hit[1], 180, 60, 'J', { at: [hit[0] - 74, hit[1]], anchor: 'end' });
    s.note(hit[0] - 74, hit[1] + 20, '(impulse from wall)', { anchor: 'end' });
    s.lines(424, 110, ['v_i = 10 \\rm{m/s}', 'v_f = 10 \\rm{m/s}', 'm = 0.055 \\rm{kg}'], {
      anchor: 'start',
      size: 15,
      gap: 22,
    });
    return s.render();
  },

  // 8.2 Problem 16 — punter kicks a dropped ball
  sketch_08_02_p16: () => {
    const s = new Sketch({
      width: 620,
      height: 320,
      title: 'Sketch of the ball kicked by the punter',
      desc: 'Axes with +x horizontal in the direction of the kick and +y up. Just before the kick the ball moves straight down at v_i = 4.43 m/s (after falling 1.00 m from rest), so v_iy is negative. Just after, it moves at v_f = 18 m/s at 55° above +x. The impulse J from the foot, of unknown size, points up and forward at an unknown angle θ.',
    });
    const o = [220, 190];
    plane2D(s, ...o, {
      xPos: 220,
      xNeg: 150,
      yPos: 150,
      yNeg: 110,
      xNote: '(direction of the kick)',
      yNote: '(up)',
    });
    v2(s, o[0], o[1] - 80, 270, 74, 'v_i = 4.43 \\rm{m/s}', {
      at: [o[0] - 10, o[1] - 50],
      anchor: 'end',
    });
    v2(s, ...o, 55, 140, 'v_f = 18 \\rm{m/s}');
    s.angle(...o, 50, 0, 55, '55°', { lr: 68 });
    force(s, ...o, 62, 90, null);
    s.label(o[0] + 18, o[1] - 100, 'J = ?', { color: K.force, anchor: 'start' });
    s.dot(...o, { r: 6, name: 'ball', nameDx: -24, nameDy: 18 });
    s.note(o[0] - 10, o[1] - 105, 'just before', { anchor: 'end' });
    return s.render();
  },

  // 8.3 Problem 1 — train cars couple
  sketch_08_03_p01: () =>
    rows1D({
      title: 'Sketch of the two train cars coupling',
      desc: 'A horizontal +x axis points in the direction the first car moves. Before: car 1 (150 000 kg) moves at v_1 = +0.300 m/s and car 2 (110 000 kg) moves toward it at v_2 = −0.120 m/s. After coupling they move together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, w: 80, name: 'car 1', v: 60, vLabel: 'v_1 = +0.300 \\rm{m/s}' },
            { x: 370, w: 70, name: 'car 2', v: -36, vLabel: 'v_2 = −0.120 \\rm{m/s}' },
          ],
        },
        {
          caption: 'after',
          objs: [{ x: 280, w: 150, name: 'cars 1 + 2', open: true, vLabel: 'v_f = ?' }],
        },
      ],
    }),

  // 8.3 Problem 2 — clay models stick together
  sketch_08_03_p02: () =>
    rows1D({
      title: 'Sketch of the clay models sticking together',
      desc: 'A horizontal +x axis points in the direction the first model slides. Before: model 1 (0.200 kg) moves at v_1 = +0.750 m/s and model 2 (0.350 kg) is at rest. After they stick, they move together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, name: 'model 1', v: 60, vLabel: 'v_1 = +0.750 \\rm{m/s}' },
            { x: 370, name: 'model 2', vLabel: 'v_2 = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [{ x: 300, w: 100, open: true, name: 'models 1 + 2', vLabel: 'v_f = ?' }],
        },
      ],
    }),

  // 8.3 Problem 4 — car hits a deer running the same way
  sketch_08_03_p04: () =>
    rows1D({
      title: 'Sketch of the car hitting the deer',
      desc: 'A horizontal +x axis points in the direction both are moving. Before: the car (900 kg) moves at +30.0 m/s and the deer (150 kg) ahead of it at +12.0 m/s. After, the deer stays on the car and they move together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, w: 70, name: 'car', v: 90, vLabel: 'v_{car} = +30.0 \\rm{m/s}' },
            { x: 370, w: 36, name: 'deer', v: 40, vLabel: 'v_{deer} = +12.0 \\rm{m/s}' },
          ],
        },
        {
          caption: 'after',
          objs: [{ x: 320, w: 90, open: true, name: 'car + deer', vLabel: 'v_f = ?' }],
        },
      ],
    }),

  // 8.4 Problem 1 — identical objects exchange velocities
  sketch_08_04_p01: () =>
    rows1D({
      title: 'Sketch of the elastic collision of two identical objects',
      desc: 'A horizontal +x axis points in the direction object 1 moves. Before: object 1 (mass m) moves at +v and object 2 (mass m) is at rest. After: object 1 is at rest and object 2 moves at +v.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, shape: 'dot', r: 12, name: '1', v: 70, vLabel: 'v_1 = +v' },
            { x: 330, shape: 'dot', r: 12, name: '2', vLabel: 'v_2 = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [
            { x: 230, shape: 'dot', r: 12, open: true, name: '1', vLabel: 'v′_1 = 0' },
            { x: 400, shape: 'dot', r: 12, open: true, name: '2', v: 70, vLabel: 'v′_2 = +v' },
          ],
        },
      ],
    }),

  // 8.4 Problem 2 — satellites collide elastically
  sketch_08_04_p02: () =>
    rows1D({
      title: 'Sketch of the satellites colliding elastically',
      desc: 'Frame in which satellite 2 is at rest before the collision. A horizontal +x axis points in the direction satellite 1 approaches. Before: satellite 1 (4.00 × 10³ kg) moves at v_1 = +0.250 m/s and satellite 2 (7.50 × 10³ kg) is at rest. After: the velocities v′_1 and v′_2 are unknown; their difference is the final relative velocity.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, w: 50, name: 'satellite 1', v: 60, vLabel: 'v_1 = +0.250 \\rm{m/s}' },
            { x: 350, w: 70, name: 'satellite 2', vLabel: 'v_2 = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [
            { x: 170, w: 50, open: true, name: 'satellite 1', vLabel: 'v′_1 = ?' },
            { x: 370, w: 70, open: true, name: 'satellite 2', vLabel: 'v′_2 = ?' },
          ],
        },
      ],
      note: '(satellite 1’s motion)',
    }),

  // 8.4 Problem 3 — puck bounces elastically off the goalie
  sketch_08_04_p03: () =>
    rows1D({
      title: 'Sketch of the puck bouncing off the goalie',
      desc: 'A horizontal +x axis points in the puck’s initial direction, toward the goalie. Before: the puck (0.150 kg) moves at v_1 = +35.0 m/s and the goalie (70.0 kg) is at rest. After the elastic collision the puck rebounds (v′_1 negative) and the goalie moves along +x; both velocities are unknown.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 160, shape: 'dot', r: 6, name: 'puck', v: 80, vLabel: 'v_1 = +35.0 \\rm{m/s}' },
            { x: 380, w: 40, name: 'goalie', vLabel: 'v_2 = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [
            { x: 260, shape: 'dot', r: 6, open: true, name: 'puck', v: -80, vLabel: 'v′_1 = ?' },
            { x: 390, w: 40, open: true, name: 'goalie', v: 24, vLabel: 'v′_2 = ?' },
          ],
        },
      ],
      note: '(toward the goalie)',
    }),

  // 8.5 Problem 1 — billiard ball rebounds from the bumper
  sketch_08_05_p01: () =>
    rows1D({
      title: 'Sketch of the billiard ball rebounding from the bumper',
      desc: 'A horizontal +x axis points in the ball’s initial direction, toward the bumper. Before: v_i = +3.00 m/s. During the 0.0150-s contact the bumper pushes the ball along −x. After: v_f = −2.40 m/s, moving away from the bumper.',
      wallAt: 470,
      rows: [
        {
          caption: 'before',
          objs: [{ x: 300, shape: 'dot', name: 'ball', v: 75, vLabel: 'v_i = +3.00 \\rm{m/s}' }],
        },
        {
          caption: 'during contact',
          objs: [{ x: 460, shape: 'dot', F: -70, FLabel: 'F_{avg} = ?' }],
        },
        {
          caption: 'after',
          objs: [{ x: 300, shape: 'dot', open: true, v: -60, vLabel: 'v_f = −2.40 \\rm{m/s}' }],
        },
      ],
      note: '(toward the bumper)',
    }),

  // 8.5 Problem 2 — skater caught by a stationary skater
  sketch_08_05_p02: () =>
    rows1D({
      title: 'Sketch of the skater being caught',
      desc: 'A horizontal +x axis points in the leaping skater’s direction of motion. Before: skater 1 (60.0 kg) moves at v_1 = +4.00 m/s and skater 2 (75.0 kg) is at rest. After the catch they move together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            {
              x: 170,
              shape: 'dot',
              name: '60.0-kg skater',
              v: 70,
              vLabel: 'v_1 = +4.00 \\rm{m/s}',
            },
            { x: 370, shape: 'dot', name: '75.0-kg skater', vLabel: 'v_2 = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [{ x: 330, shape: 'dot', r: 10, open: true, name: 'together', vLabel: 'v_f = ?' }],
        },
      ],
    }),

  // 8.5 Problem 4 — battleship fires a shell aft
  sketch_08_05_p04: () =>
    rows1D({
      title: 'Sketch of the battleship firing a shell aft',
      desc: 'A horizontal +x axis points in the direction the shell is fired (toward the rear of the ship). Before: ship and shell are at rest. After: the shell moves at v_shell = +575 m/s and the ship recoils with unknown velocity v_ship (along −x).',
      rows: [
        { caption: 'before', objs: [{ x: 260, w: 160, name: 'ship + shell', vLabel: 'v = 0' }] },
        {
          caption: 'after',
          objs: [
            { x: 230, w: 160, open: true, name: 'ship', v: -30, vLabel: 'v_{ship} = ?' },
            {
              x: 420,
              shape: 'dot',
              r: 5,
              open: true,
              name: 'shell',
              v: 90,
              vLabel: 'v_{shell} = +575 \\rm{m/s}',
            },
          ],
        },
      ],
      note: '(direction of the shell)',
    }),

  // 8.5 Problem 5 — docking satellites seen from two frames
  sketch_08_05_p05: () =>
    rows1D({
      title: 'Sketch of the docking satellites in two frames of reference',
      desc: 'A horizontal +x axis points from satellite 2 toward satellite 1 in both frames. (a) Frame where satellite 1 is at rest: satellite 2 (7.50 × 10³ kg) approaches at v_2 = +0.250 m/s; after docking both move at unknown v_f. (c) Frame where satellite 2 is at rest: satellite 1 (4.00 × 10³ kg) approaches at v_1 = −0.250 m/s; after docking both move at unknown v_f.',
      rows: [
        {
          caption: '(a) before',
          objs: [
            { x: 170, w: 70, name: 'satellite 2', v: 60, vLabel: 'v_2 = +0.250 \\rm{m/s}' },
            { x: 370, w: 50, name: 'satellite 1', vLabel: 'v_1 = 0' },
          ],
        },
        {
          caption: '(a) after docking',
          objs: [{ x: 300, w: 120, open: true, name: 'docked', vLabel: 'v_f = ?' }],
        },
        {
          caption: '(c) before',
          objs: [
            { x: 170, w: 70, name: 'satellite 2', vLabel: 'v_2 = 0' },
            { x: 370, w: 50, name: 'satellite 1', v: -60, vLabel: 'v_1 = −0.250 \\rm{m/s}' },
          ],
        },
        {
          caption: '(c) after docking',
          objs: [{ x: 240, w: 120, open: true, name: 'docked', vLabel: 'v_f = ?' }],
        },
      ],
      note: '(from satellite 2 toward 1)',
    }),

  // 8.5 Problem 6 — scrap metal dumped into a moving freight car
  sketch_08_05_p06: () => {
    const s = new Sketch({
      width: 600,
      height: 290,
      title: 'Sketch of scrap metal dropped into the freight car',
      desc: 'A horizontal +x axis points in the direction the freight car coasts. Before: the car (30 000 kg) moves at +0.850 m/s, and the scrap (110 000 kg) falls straight down, so its x-velocity is zero. After: the loaded car moves with unknown velocity v_f.',
    });
    caption(s, 14, 26, 'before');
    s.ground(40, 470, 116, { hatch: false });
    box(s, 160, 100, 90, 30, 0);
    s.note(160, 136, 'freight car');
    vel(s, 130, 70, 0, 60, null);
    s.label(160, 54, 'v_{car} = +0.850 \\rm{m/s}', { color: K.vel });
    s.svg.polygon(
      [
        [300, 30],
        [380, 30],
        [355, 60],
        [325, 60],
      ],
      { fill: '#cfd8dc', stroke: C.body }
    );
    s.note(400, 44, 'hopper', { anchor: 'start' });
    for (const [x, y] of [
      [332, 76],
      [346, 90],
      [338, 102],
    ])
      s.svg.rect(x, y, 7, 7, { fill: '#7f8c8d' });
    vel(s, 368, 70, 270, 34, null);
    s.label(376, 86, 'v_{scrap,x} = 0', { color: K.vel, anchor: 'start', size: 15 });
    caption(s, 14, 152, 'after');
    s.ground(40, 470, 210, { hatch: false });
    box(s, 300, 194, 90, 30, 0, { fill: '#ffffff' });
    s.note(300, 230, 'car + scrap');
    s.label(300, 164, 'v_f = ?', { color: K.vel });
    hAxis(s, 40, 450, 250, { note: '(direction of motion)' });
    return s.render();
  },

  // 8.5 Problem 7 — satellite and launcher pushed apart by explosive bolts
  sketch_08_05_p07: () =>
    rows1D({
      title: 'Sketch of the satellite separating from its launcher',
      desc: 'Frame in which both are at rest before separation. A horizontal +x axis points in the direction the satellite moves after separation. After: the satellite (4800 kg) moves with v_1 along +x and the launcher (1500 kg) with v_2 along −x; both are unknown, and 5000 J of kinetic energy is supplied.',
      rows: [
        {
          caption: 'before',
          objs: [{ x: 300, w: 170, name: 'launcher + satellite', vLabel: 'v = 0' }],
        },
        {
          caption: 'after',
          objs: [
            { x: 180, w: 60, open: true, name: 'launcher', v: -70, vLabel: 'v_2 = ?' },
            { x: 400, w: 90, open: true, name: 'satellite', v: 30, vLabel: 'v_1 = ?' },
          ],
        },
      ],
      note: '(satellite’s motion)',
    }),

  // 8.5 Problem 8 — rifle recoil
  sketch_08_05_p08: () =>
    rows1D({
      title: 'Sketch of the rifle recoiling as the bullet is fired',
      desc: 'A horizontal +x axis points in the direction the bullet is fired. Before: rifle and bullet are at rest. After: the bullet (0.0250 kg) moves at +550 m/s and the rifle (3.00 kg, or 28.0 kg held against the shoulder) recoils with unknown velocity along −x.',
      rows: [
        { caption: 'before', objs: [{ x: 250, w: 140, name: 'rifle + bullet', vLabel: 'v = 0' }] },
        {
          caption: 'after',
          objs: [
            { x: 220, w: 140, open: true, name: 'rifle', v: -40, vLabel: 'v_{rifle} = ?' },
            {
              x: 410,
              shape: 'dot',
              r: 4,
              open: true,
              name: 'bullet',
              v: 90,
              vLabel: 'v_{bullet} = +550 \\rm{m/s}',
            },
          ],
        },
      ],
      note: '(direction of the bullet)',
    }),

  // 8.5 Problem 9 — plutonium decays into helium and uranium
  sketch_08_05_p09: () =>
    rows1D({
      title: 'Sketch of the plutonium decay',
      desc: 'A horizontal +x axis points in the direction the helium nucleus moves. Before: the plutonium-239 nucleus is at rest. After: the helium-4 nucleus moves with v_He along +x and the uranium-235 nucleus recoils with v_U along −x; both are unknown.',
      rows: [
        {
          caption: 'before',
          objs: [{ x: 300, shape: 'dot', r: 14, name: 'Pu-239', vLabel: 'v = 0' }],
        },
        {
          caption: 'after',
          objs: [
            { x: 240, shape: 'dot', r: 13, open: true, name: 'U-235', v: -30, vLabel: 'v_U = ?' },
            { x: 400, shape: 'dot', r: 4, open: true, name: 'He-4', v: 90, vLabel: 'v_{He} = ?' },
          ],
        },
      ],
      note: '(direction of the helium)',
    }),

  // 8.5 Problem 11 — football players collide head-on
  sketch_08_05_p11: () =>
    rows1D({
      title: 'Sketch of the football players colliding head-on',
      desc: 'A horizontal +x axis points in the first player’s direction of motion. Before: player 1 (95.0 kg) moves at v_1 = +6.00 m/s and player 2 (115 kg) at v_2 = −3.50 m/s, toward each other. After, they cling together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 170, shape: 'dot', name: 'player 1', v: 80, vLabel: 'v_1 = +6.00 \\rm{m/s}' },
            { x: 380, shape: 'dot', name: 'player 2', v: -47, vLabel: 'v_2 = −3.50 \\rm{m/s}' },
          ],
        },
        {
          caption: 'after',
          objs: [{ x: 280, shape: 'dot', r: 10, open: true, name: 'together', vLabel: 'v_f = ?' }],
        },
      ],
    }),

  // 8.5 Problem 13 — performer catches a cannon ball
  sketch_08_05_p13: () =>
    rows1D({
      title: 'Sketch of the performer catching the cannon ball',
      desc: 'A horizontal +x axis points in the direction of the cannon ball’s horizontal motion. Before: the ball (10.0 kg) moves at v_x = +8.00 m/s and the performer (65.0 kg) is at rest on roller skates. After the catch they move together with unknown velocity v_f.',
      rows: [
        {
          caption: 'before',
          objs: [
            {
              x: 170,
              shape: 'dot',
              r: 7,
              name: 'cannon ball',
              v: 70,
              vLabel: 'v_{ball} = +8.00 \\rm{m/s}',
            },
            { x: 370, shape: 'dot', r: 10, name: 'performer', vLabel: 'v = 0' },
          ],
        },
        {
          caption: 'after',
          objs: [
            {
              x: 330,
              shape: 'dot',
              r: 11,
              open: true,
              name: 'performer + ball',
              vLabel: 'v_f = ?',
            },
          ],
        },
      ],
    }),

  // 8.5 Problem 14 — clown throws a barbell
  sketch_08_05_p14: () =>
    rows1D({
      title: 'Sketch of the clown throwing the barbell',
      desc: 'A horizontal +x axis points in the direction the barbell is thrown. Before: the clown (80.0 kg) and barbell are at rest. After: the barbell moves at +10.0 m/s and the clown recoils at −0.500 m/s; the barbell’s mass is unknown.',
      rows: [
        {
          caption: 'before',
          objs: [{ x: 280, shape: 'dot', r: 11, name: 'clown + barbell', vLabel: 'v = 0' }],
        },
        {
          caption: 'after',
          objs: [
            {
              x: 230,
              shape: 'dot',
              r: 10,
              open: true,
              name: 'clown',
              v: -30,
              vLabel: 'v_{clown} = −0.500 \\rm{m/s}',
            },
            {
              x: 420,
              shape: 'dot',
              r: 6,
              open: true,
              name: 'barbell',
              v: 80,
              vLabel: 'v_{barbell} = +10.0 \\rm{m/s}',
            },
          ],
        },
      ],
      note: '(direction of the throw)',
    }),

  // 8.6 Problem 1 — identical pucks scatter at right angles
  sketch_08_06_p01: () => {
    const s = new Sketch({
      width: 680,
      height: 330,
      title: 'Sketch of the two pucks scattering',
      desc: 'Axes with +x along the incoming puck’s velocity and +y perpendicular to it on the table, origin at the collision point. Before: puck 1 moves at v_1 = 6.00 m/s along +x toward puck 2 at rest. After: puck 1 moves at θ_1 = 30.0° above +x with unknown speed v′_1, and puck 2 moves at θ_2 = −60.0°, that is 60.0° below +x, with unknown speed v′_2.',
    });
    const o = [260, 170];
    plane2D(s, ...o, {
      xPos: 230,
      xNeg: 220,
      yPos: 140,
      yNeg: 140,
      xNote: '(incoming direction)',
      yNote: '',
    });
    s.dot(o[0] - 150, o[1], { open: true, name: 'puck 1', nameDy: 22 });
    v2(s, o[0] - 150, o[1] - 24, 0, 80, 'v_1 = 6.00 \\rm{m/s}', { at: [o[0] - 110, o[1] - 42] });
    s.dot(...o, { r: 7 });
    s.note(o[0] - 12, o[1] + 22, 'puck 2 (at rest)', { anchor: 'end' });
    v2(s, ...o, 30, 130, 'v′_1 = ?');
    v2(s, ...o, -60, 110, 'v′_2 = ?');
    s.angle(...o, 56, 0, 30, '30.0°', { lr: 76 });
    s.angle(...o, 48, -60, 0, '60.0°', { lr: 68 });
    return s.render();
  },

  // 8.6 Problem 3 — cannon recoils as it fires at 20.0°
  sketch_08_06_p03: () => {
    const s = new Sketch({
      width: 680,
      height: 300,
      title: 'Sketch of the cannon recoiling as it fires',
      desc: 'Axes with +x horizontal in the direction of the shell’s horizontal motion and +y up. Before: cannon and shell are at rest. After: the shell (15.0 kg) leaves at 480 m/s, 20.0° above +x, with components v_x = v cos 20.0° along +x and v_y along +y; the cannon (3000 kg) recoils horizontally with unknown velocity along −x.',
    });
    s.ground(40, 560, 240);
    plane2D(s, 230, 200, {
      xPos: 230,
      xNeg: 190,
      yPos: 160,
      yNeg: 30,
      xNote: '(shell’s horizontal motion)',
      yNote: '(up)',
    });
    box(s, 190, 222, 90, 30, 0, { name: 'cannon', nameDy: 30 });
    s.svg.line(220, 212, 290, 186, { color: C.body, width: 10, cap: 'round' });
    vel(s, 140, 222, 180, 50, 'v_{cannon} = ?', { at: [110, 262] });
    const o = [330, 172];
    s.dot(...o, { r: 5, name: 'shell', nameDy: 20 });
    vel(s, ...o, 20, 140, 'v = 480 \\rm{m/s}');
    s.ref(...o, o[0] + 160, o[1]);
    s.angle(...o, 60, 0, 20, '20.0°', { lr: 80 });
    return s.render();
  },

  // 8.6 Problem 4 — bowling ball scatters a pin
  sketch_08_06_p04: () => {
    const s = new Sketch({
      width: 680,
      height: 330,
      title: 'Sketch of the bowling ball scattering the pin',
      desc: 'Axes with +x along the ball’s initial velocity and +y perpendicular to it on the lane, origin at the collision. Before: the ball (5.50 kg) moves at 9.00 m/s along +x; the pin (0.850 kg) is at rest. After: the pin moves at 15.0 m/s at 85.0° above +x; the ball’s final velocity (magnitude v′ and angle θ, expected below +x) is unknown.',
    });
    const o = [270, 180];
    plane2D(s, ...o, {
      xPos: 220,
      xNeg: 230,
      yPos: 140,
      yNeg: 120,
      xNote: '(ball’s initial direction)',
      yNote: '',
    });
    s.dot(o[0] - 160, o[1], { r: 11, open: true, name: 'ball', nameDy: 26 });
    v2(s, o[0] - 160, o[1] - 30, 0, 80, 'v = 9.00 \\rm{m/s}', { at: [o[0] - 120, o[1] - 48] });
    s.dot(...o, { r: 6 });
    s.note(o[0] - 12, o[1] + 22, 'pin', { anchor: 'end' });
    v2(s, ...o, 85, 120, 'v′_{pin} = 15.0 \\rm{m/s}', {
      at: [o[0] + 22, o[1] - 112],
      anchor: 'start',
    });
    v2(s, ...o, -14.7, 140, 'v′_{ball} = ?', { dy: 8 });
    s.angle(...o, 46, 0, 85, '85.0°', { lr: 64, dx: 6 });
    s.angle(...o, 70, -14.7, 0, 'θ = ?', { lr: 96 });
    return s.render();
  },

  // 8.6 Problem 5 — helium nucleus scatters from a gold nucleus
  sketch_08_06_p05: () => {
    const s = new Sketch({
      width: 680,
      height: 330,
      title: 'Sketch of the helium nucleus scattering from the gold nucleus',
      desc: 'Axes with +x along the helium nucleus’s initial velocity and +y perpendicular to it, origin at the gold nucleus, initially at rest. After the elastic collision the helium nucleus moves at 120° from +x (above the axis) with unknown speed v′_He; the gold nucleus recoils at an unknown angle θ_Au, below +x, with unknown speed v′_Au.',
    });
    const o = [300, 180];
    plane2D(s, ...o, {
      xPos: 180,
      xNeg: 250,
      yPos: 140,
      yNeg: 120,
      xNote: '(incoming direction)',
      yNote: '',
    });
    s.dot(o[0] - 190, o[1], { r: 5, open: true, name: 'He', nameDy: 22 });
    v2(s, o[0] - 200, o[1] - 26, 0, 80, 'v_{He} = 1.55 × 10^7 \\rm{m/s}', {
      at: [o[0] - 160, o[1] - 44],
    });
    s.dot(...o, { r: 12 });
    s.note(o[0] - 14, o[1] + 30, 'Au (at rest)', { anchor: 'end' });
    v2(s, ...o, 120, 140, 'v′_{He} = ?');
    v2(s, ...o, -29.5, 80, 'v′_{Au} = ?');
    s.angle(...o, 40, 0, 120, '120°', { lr: 58 });
    s.angle(...o, 60, -29.5, 0, 'θ_{Au}', { lr: 84 });
    return s.render();
  },

  // 8.6 Problem 6 — cars collide at an icy intersection
  sketch_08_06_p06: () => {
    const s = new Sketch({
      width: 600,
      height: 360,
      title: 'Sketch of the two cars colliding at the intersection',
      desc: 'Axes with +x east and +y north, origin at the intersection. Car 1 (1200 kg) approaches moving due south, v_1y = −8.00 m/s. Car 2 (850 kg) approaches moving due west, v_2x = −17.0 m/s. After they stick together, they move with unknown velocity v_f at an unknown angle θ south of west.',
    });
    const o = [300, 170];
    plane2D(s, ...o, {
      xPos: 200,
      xNeg: 230,
      yPos: 140,
      yNeg: 150,
      xNote: '(east)',
      yNote: '(north)',
    });
    box(s, o[0], o[1] - 105, 26, 44, 0);
    s.note(o[0] - 22, o[1] - 105, 'car 1', { anchor: 'end' });
    vel(s, o[0] + 26, o[1] - 125, 270, 60, 'v_1 = 8.00 \\rm{m/s}', {
      at: [o[0] + 36, o[1] - 100],
      anchor: 'start',
    });
    box(s, o[0] + 120, o[1], 44, 26, 0);
    s.note(o[0] + 120, o[1] - 22, 'car 2');
    vel(s, o[0] + 150, o[1] + 30, 180, 90, 'v_2 = 17.0 \\rm{m/s}', { at: [o[0] + 104, o[1] + 52] });
    s.dot(...o, { r: 7 });
    vel(s, ...o, 213.6, 130, 'v_f = ?', { dx: -4, dy: 6 });
    s.angle(...o, 60, 180, 213.6, 'θ', { lr: 76 });
    s.note(o[0] - 140, o[1] + 120, 'after: cars 1 + 2 together');
    return s.render();
  },

  // 8.6 Problem 8 — hockey player recoils after hitting the puck
  sketch_08_06_p08: () =>
    rows1D({
      title: 'Sketch of the hockey player recoiling',
      desc: 'A horizontal +x axis points in the direction the puck moves, toward the goal 15.0 m away. Before: player and puck are at rest. After: the puck (0.150 kg) moves at +45.0 m/s and the player (90.0 kg) recoils with unknown velocity along −x; the distance he recoils while the puck travels 15.0 m is unknown.',
      rows: [
        {
          caption: 'before',
          objs: [
            { x: 160, shape: 'dot', r: 10, name: 'player', vLabel: 'v = 0' },
            { x: 190, shape: 'dot', r: 4, vLabel: '' },
          ],
        },
        {
          caption: 'after',
          objs: [
            {
              x: 140,
              shape: 'dot',
              r: 10,
              open: true,
              name: 'player',
              v: -30,
              vLabel: 'v_{player} = ?',
            },
            {
              x: 420,
              shape: 'dot',
              r: 4,
              open: true,
              name: 'puck at the goal',
              v: 80,
              vLabel: 'v_{puck} = +45.0 \\rm{m/s}',
            },
          ],
        },
      ],
      note: '(direction of the puck)',
    }),

  // 8.7 Problem 2 — rocket lifting off from the Moon
  sketch_08_07_p02: () =>
    rocket({
      title: 'Sketch of the rocket lifting off from the Moon',
      desc: 'A vertical +y axis points up. The thrust F_thrust on the rocket points along +y; the weight mg, with g = 1.6 m/s² on the Moon, points along −y; the exhaust gas leaves along −y at v_e = 2.20 × 10³ m/s. The acceleration a points along +y.',
      lines: [
        'm = 5000 \\rm{kg}',
        'Δm/Δt = 8.00 \\rm{kg/s}',
        'v_e = 2.20 × 10^3 \\rm{m/s}',
        'g = 1.6 \\rm{m/s}^2  (Moon)',
      ],
    }),

  // 8.7 Problem 5 — derive the vertical acceleration of a rocket
  sketch_08_07_p05: () =>
    rocket({
      title: 'Sketch of the forces on a rising rocket',
      desc: 'A vertical +y axis points up. The thrust F_thrust = v_e Δm/Δt on the rocket points along +y; the weight mg points along −y; the exhaust gas leaves along −y at speed v_e. The acceleration a points along +y.',
      lines: ['F_{thrust} = v_e Δm/Δt', 'ΣF_y = F_{thrust} − mg', 'a = ?'],
    }),

  // 8.7 Problem 6 — rocket limited to 7g
  sketch_08_07_p06: () =>
    rocket({
      title: 'Sketch of the rocket accelerating at 7g',
      desc: 'A vertical +y axis points up. The thrust F_thrust on the rocket points along +y; the weight mg points along −y; the exhaust gas leaves along −y at v_e = 2.40 × 10³ m/s. The acceleration a = 7g = +68.6 m/s² points along +y.',
      lines: [
        'm = 75 000 \\rm{kg}',
        'v_e = 2.40 × 10^3 \\rm{m/s}',
        'a = 7g = +68.6 \\rm{m/s}^2',
        'Δm/Δt = ?',
      ],
    }),

  // 8.7 Problem 9 — squid recoils by ejecting fluid
  sketch_08_07_p09: () =>
    rows1D({
      title: 'Sketch of the squid ejecting fluid',
      desc: 'A horizontal +x axis points in the direction the squid recoils. Before: the squid is at rest. During and after the 0.100-s ejection, 0.250 kg of fluid moves along −x at 10.0 m/s, friction f = 5.00 N on the squid points along −x, and the squid (4.75 kg after ejection) moves along +x with unknown velocity v.',
      rows: [
        { caption: 'before', objs: [{ x: 280, w: 70, name: 'squid (5.00 kg)', vLabel: 'v = 0' }] },
        {
          caption: 'after ejection',
          objs: [
            {
              x: 240,
              shape: 'dot',
              r: 6,
              open: true,
              name: 'fluid (0.250 kg)',
              v: -70,
              vLabel: 'v_{fluid} = −10.0 \\rm{m/s}',
            },
            {
              x: 410,
              w: 70,
              open: true,
              name: 'squid (4.75 kg)',
              v: 40,
              vLabel: 'v = ?',
              F: -50,
              FLabel: 'f',
            },
          ],
        },
      ],
      note: '(direction of recoil)',
    }),
};
