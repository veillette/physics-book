import { C, Sketch } from './sketch.js';

/**
 * One-dimensional horizontal motion: the object on a track, a +x axis below
 * it, and each state (initial, final, ...) with its knowns listed underneath.
 *
 *   states: [{ x, lines, v, vLabel, open, name }]
 *     x      – pixel position of the object
 *     lines  – knowns for this state, e.g. ['t = 0', 'x_0 = 0', 'v_0 = 0']
 *     v      – signed length (px) of its velocity arrow (0 or omitted: none)
 *   accel: { x, len, label } or a list of them – acceleration arrows drawn
 *          above the track (one per phase of the motion)
 *   ticks  – extra labeled marks on the axis: [[px, label], ...]
 *   origin – pixel x of the origin (default: first state)
 *   flip   – positive direction to the left (rarely needed)
 */
function track({
  title,
  desc,
  width = 600,
  height,
  states,
  accel,
  origin,
  axisFrom = 30,
  axisTo,
  note = '(direction of motion)',
  label = '+x',
  shape = 'block',
  name,
  ticks = [],
  extraHeight = 0,
  extra,
}) {
  const rows = Math.max(...states.map(st => (st.lines || []).length));
  const objY = accel ? 106 : 76;
  const groundY = objY + 16;
  const axisY = groundY + 34;
  const knownY = axisY + 44;
  const s = new Sketch({
    width,
    height: height ?? knownY + rows * 21 + 6 + extraHeight,
    title,
    desc,
  });
  s.ground(axisFrom, (axisTo ?? width - 70) + 10, groundY, { hatch: false });
  s.axis(axisFrom, axisY, axisTo ?? width - 70, axisY, {
    label,
    note,
    origin: [origin ?? states[0].x, axisY],
    ticks: ticks.map(([x, text]) => [x, axisY, text]),
  });
  states.forEach((st, k) => {
    const kind = st.shape ?? shape;
    if (kind === 'none') {
      // drawn by `extra`
    } else if (kind === 'block') {
      s.block(st.x, objY, {
        open: st.open,
        name: k === 0 ? (st.name ?? name) : st.name,
        w: 40,
        h: 22,
      });
    } else {
      s.dot(st.x, objY + 4, {
        open: st.open,
        name: k === 0 ? (st.name ?? name) : st.name,
        nameDy: st.nameDy ?? -16,
      });
    }
    if (st.v) {
      const y = objY - 34;
      s.vel(st.x, y, st.x + st.v, y, st.vLabel, { ly: y - 14, lx: st.x + st.v / 2 });
    }
    if (st.lines) s.lines(st.x + (st.dx ?? 0), knownY, st.lines);
    if (st.mark !== false)
      s.svg.line(st.x, axisY - 5, st.x, axisY + 5, { color: C.axis, width: 1.6 });
  });
  // Acceleration arrows sit above the track, one per phase, each labeled
  // above its arrow (a second label line, if any, goes below it).
  for (const a of [accel].flat().filter(Boolean)) {
    const y = a.y ?? 40;
    const [first, ...rest] = [a.label].flat();
    if (a.len) s.acc(a.x, y, a.x + a.len, y, null);
    const cx = a.lx ?? a.x + (a.len || 0) / 2;
    s.label(cx, y - 15, first, { color: C.acc });
    rest.forEach((line, k) => s.label(cx, y + 17 + k * 19, line, { color: C.acc }));
  }
  if (extra) extra(s, { objY, groundY, axisY, knownY });
  return s.render();
}

/**
 * One-dimensional vertical motion: a y axis on the left (positive up unless
 * `up` is false), the object's states stacked at their heights, and the knowns
 * written to the right of each state.
 *
 *   states: [{ y, lines, v, vLabel, open, dx, name }]
 *     y      – pixel height of the object
 *     v      – signed length (px) of its velocity arrow, positive along +y
 *     dx     – sideways shift, to separate the way up from the way down
 *   accel: { x, y, len, label } – acceleration arrow (len positive along +y)
 *   originY – pixel height of the origin; ticks: [[py, label], ...]
 */
function column({
  title,
  desc,
  width = 480,
  height,
  up = true,
  axisX = 56,
  axisTop = 34,
  axisBottom,
  objX = 150,
  states,
  accel,
  originY,
  label = '+y',
  note,
  ground,
  water,
  ticks = [],
  knownDx = 34,
  extra,
}) {
  const s = new Sketch({ width, height, title, desc });
  const sign = up ? -1 : 1;
  const bottom = axisBottom ?? height - 30;
  if (ground !== undefined) s.ground(axisX + 14, width - 20, ground);
  if (water !== undefined) s.water(axisX + 14, width - 20, water);
  if (up) {
    s.axis(axisX, bottom, axisX, axisTop, { label, note: note ?? '(up)' });
  } else {
    s.axis(axisX, axisTop, axisX, bottom, { label, note: note ?? '(down)' });
  }
  const tick = (py, text) => {
    s.svg.line(axisX - 5, py, axisX + 5, py, { color: C.axis, width: 1.6 });
    if (text) s.label(axisX - 9, py, text, { size: 14, anchor: 'end', color: C.axis });
  };
  if (originY !== undefined) tick(originY, '0');
  for (const [py, text] of ticks) tick(py, text);
  for (const st of states) {
    const x = objX + (st.dx ?? 0);
    s.ref(axisX + 6, st.y, x - 10, st.y);
    s.dot(x, st.y, { open: st.open });
    if (st.v) {
      const vx = x - 20;
      s.vel(vx, st.y, vx, st.y + sign * st.v, null);
      if (st.vLabel) {
        s.label(vx - 6, st.y + (sign * st.v) / 2, st.vLabel, { anchor: 'end', color: C.vel });
      }
    }
    const gap = 20;
    const lines = st.lines || [];
    const y0 = st.y - ((lines.length - 1) * gap) / 2 + (st.ky ?? 0);
    const kx = x + (st.kdx ?? knownDx);
    if (lines.length) s.lines(kx, y0, lines, { anchor: 'start', gap });
    // The object's name heads its list of knowns; a bare state gets it beside the dot.
    if (st.name) {
      if (lines.length) s.note(kx, y0 - 19, st.name, { anchor: 'start', color: C.body });
      else if (st.nameAbove) s.note(x, st.y - 15, st.name, { color: C.body });
      else s.note(x + 13, st.y, st.name, { anchor: 'start', color: C.body });
    }
  }
  // Acceleration arrows, each labeled just above its upper end.
  for (const a of [accel].flat().filter(Boolean)) {
    const ax = a.x ?? width - 70;
    s.acc(ax, a.y, ax, a.y + sign * a.len, null);
    const top = Math.min(a.y, a.y + sign * a.len);
    s.label(ax, top - 12, a.label, { color: C.acc });
  }
  if (extra) extra(s);
  return s.render();
}

export default {
  // 2.3 Problem 7 — drive from home to the university
  sketch_02_03_p07: () => {
    const s = new Sketch({
      width: 560,
      height: 300,
      title: 'Sketch of the trip from home to the university',
      desc: 'Axes with +x east and +y north, origin at home. The road (dashed) is 12.0 km long; the straight-line displacement Δx (red) from home to the university is 10.3 km at 25.0° south of east, that is, 25.0° below the +x axis. The return trip ends back at the origin, so the round-trip displacement is zero.',
    });
    const ox = 80;
    const oy = 110;
    s.axes2(ox, oy, {
      xNeg: 30,
      xPos: 400,
      yNeg: 150,
      yPos: 70,
      xNote: '(east)',
      yNote: '(north)',
    });
    const L = 380;
    const ex = ox + L * Math.cos((25 * Math.PI) / 180);
    const ey = oy + L * Math.sin((25 * Math.PI) / 180);
    s.path(`M ${ox} ${oy} C ${ox + 150} ${oy - 20} ${ex - 160} ${ey - 140} ${ex} ${ey}`);
    s.disp(ox, oy, ex, ey, null, { width: 3 });
    s.label(ox + 150, oy + 95, 'Δ**x**: 10.3 \\rm{km}', { color: C.disp, anchor: 'end' });
    s.angle(ox, oy, 70, -25, 0, '25.0°', { lr: 92, dy: 2 });
    s.dot(ox, oy, { name: 'home', nameDy: -14, nameDx: -24 });
    s.dot(ex, ey, { name: 'university', nameDy: 22 });
    s.note(ex - 60, oy + 40, 'road: 12.0 km, 18.0 min', { anchor: 'start' });
    return s.render();
  },

  // 2.3 Problem 10 — quarterback's three runs
  sketch_02_03_p10: () => {
    const s = new Sketch({
      width: 660,
      height: 250,
      title: 'Sketch of the quarterback’s three intervals',
      desc: 'A horizontal +x axis points down the field (forward), with the origin where the quarterback starts. Interval 1: Δx_1 = +15.0 m in 2.50 s, ending at x = 15.0 m. Interval 2: pushed backward, Δx_2 = −3.00 m in 1.75 s, ending at x = 12.0 m. Interval 3: Δx_3 = +21.0 m in 5.20 s, ending at x = 33.0 m.',
    });
    const X = m => 70 + m * 11;
    const ay = 180;
    s.ground(30, 610, ay - 26, { hatch: false });
    s.axis(30, ay, 600, ay, {
      note: '(forward, down the field)',
      origin: [X(0), ay],
      ticks: [
        [X(12), ay, '12.0', { side: 1 }],
        [X(15), ay, '15.0'],
        [X(33), ay, '33.0 \\rm{m}'],
      ],
    });
    const rows = [
      [0, 15, 40, 'Δx_1 = +15.0 \\rm{m},  Δt_1 = 2.50 \\rm{s}'],
      [15, 12, 82, 'Δx_2 = −3.00 \\rm{m},  Δt_2 = 1.75 \\rm{s}'],
      [12, 33, 124, 'Δx_3 = +21.0 \\rm{m},  Δt_3 = 5.20 \\rm{s}'],
    ];
    for (const [a, b, y, label] of rows) {
      s.disp(X(a), y, X(b), y, null);
      s.svg.line(X(a), y - 6, X(a), y + 6, { color: C.disp, width: 1.5 });
      s.label(b > a ? X(b) + 10 : X(a) + 10, y, label, {
        anchor: 'start',
        color: C.disp,
        size: 15,
      });
    }
    s.dot(X(0), ay - 34, { name: 'start', nameDy: -14 });
    return s.render();
  },

  // 2.4 Problem 1 — cheetah accelerating from rest
  sketch_02_04_p01: () =>
    track({
      title: 'Sketch of the accelerating cheetah',
      desc: 'A horizontal +x axis points in the direction the cheetah runs, with the origin at its starting point. Initial state: t = 0, v_0 = 0. Final state: t = 7.00 s, v = +30.0 m/s. The acceleration a, unknown, points in the +x direction.',
      name: 'cheetah',
      shape: 'dot',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        {
          x: 420,
          v: 90,
          vLabel: 'v = +30.0 \\rm{m/s}',
          lines: ['t = 7.00 \\rm{s}', 'v = +30.0 \\rm{m/s}'],
        },
      ],
      accel: { x: 210, len: 70, label: 'a = ?' },
    }),
  // 2.4 Problem 2 — Stapp's rocket sled: speeding up, then stopping
  sketch_02_04_p02: () =>
    track({
      title: 'Sketch of the rocket sled run',
      desc: 'A horizontal +x axis points in the direction the sled travels, with the origin at its starting point. Start: t = 0, v_0 = 0. End of the burn: t = 5.00 s, v = +282 m/s. Stop: t = 6.40 s, v = 0. While speeding up the acceleration a_1 points in +x; while stopping a_2 points in −x.',
      name: 'sled',
      states: [
        { x: 80, lines: ['t_0 = 0', 'v_0 = 0'] },
        { x: 300, v: 80, vLabel: 'v_1', lines: ['t_1 = 5.00 \\rm{s}', 'v_1 = +282 \\rm{m/s}'] },
        { x: 470, lines: ['t_2 = 6.40 \\rm{s}', 'v_2 = 0'] },
      ],
      accel: [
        { x: 150, len: 60, label: 'a_1 = ?' },
        { x: 420, len: -50, label: 'a_2 = ?' },
      ],
    }),

  // 2.4 Problem 3 — commuter backing out of the garage
  sketch_02_04_p03: () =>
    track({
      title: 'Sketch of the car backing out of the garage',
      desc: 'A horizontal +x axis points in the direction the car backs out of the garage (away from the garage), with the origin where the car starts. Start: t = 0, v_0 = 0. After backing up: v_1 = +2.00 m/s at an unknown time. Stopped 0.800 s later: v_2 = 0. While speeding up a_1 = +1.40 m/s² (in +x); while braking a_2 is unknown and points in −x.',
      name: 'car',
      note: '(direction the car backs out)',
      states: [
        { x: 110, lines: ['t_0 = 0', 'v_0 = 0'] },
        { x: 300, v: 60, vLabel: 'v_1', lines: ['t_1 = ?', 'v_1 = +2.00 \\rm{m/s}'] },
        { x: 460, lines: ['t_2 = t_1 + 0.800 \\rm{s}', 'v_2 = 0'] },
      ],
      accel: [
        { x: 170, len: 50, label: 'a_1 = +1.40 \\rm{m/s}^2' },
        { x: 470, len: -45, label: 'a_2 = ?' },
      ],
      extra: (s, { groundY }) => {
        s.svg.rect(20, groundY - 70, 46, 70, { fill: '#eeeeee', stroke: C.ground, width: 1.5 });
        s.note(43, groundY - 78, 'garage');
      },
    }),

  // 2.4 Problem 4 — missile boost phase
  sketch_02_04_p04: () =>
    track({
      title: 'Sketch of the missile boost phase',
      desc: 'A +x axis points along the missile’s direction of travel, with the origin at the launch point. Start: t = 0, v_0 = 0. End of boost: t = 60.0 s, v = +6.50 km/s. The average acceleration, unknown, points in +x.',
      name: 'missile',
      shape: 'dot',
      states: [
        { x: 90, lines: ['t_0 = 0', 'v_0 = 0'] },
        { x: 420, v: 100, vLabel: 'v', lines: ['t = 60.0 \\rm{s}', 'v = +6.50 \\rm{km/s}'] },
      ],
      accel: { x: 210, len: 70, label: '\\bar{a} = ?' },
    }),

  // 2.5 Problem 1 — sprinter leaving the blocks
  sketch_02_05_p01: () =>
    track({
      title: 'Sketch of the sprinter',
      desc: 'A horizontal +x axis points down the track in the direction the sprinter runs, with the origin at the starting blocks. Start: t = 0, x_0 = 0, v_0 = 0. After 2.40 s: v unknown. The acceleration a = +4.50 m/s² points in +x.',
      name: 'sprinter',
      shape: 'dot',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 400, v: 70, vLabel: 'v', lines: ['t = 2.40 \\rm{s}', 'x = ?', 'v = ?'] },
      ],
      accel: { x: 200, len: 60, label: 'a = +4.50 \\rm{m/s}^2' },
    }),

  // 2.5 Problem 2 — baseball stopped by a mitt
  sketch_02_05_p02: () =>
    track({
      title: 'Sketch of the ball stopping in the mitt',
      desc: 'A horizontal +x axis points in the direction the ball travels, with the origin where the ball first touches the mitt. At contact: t = 0, v_0 unknown and positive. Stopped: t = 1.85 ms, v = 0. The acceleration points in −x, against the motion: a = −2.10 × 10⁴ m/s².',
      name: 'ball',
      shape: 'dot',
      note: '(direction the ball travels)',
      states: [
        { x: 200, v: 90, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = ?'] },
        { x: 400, lines: ['t = 1.85 \\rm{ms}', 'v = 0'] },
      ],
      accel: { x: 360, len: -70, label: 'a = −2.10 × 10^4 \\rm{m/s}^2' },
      extra: (s, { objY }) => {
        s.svg.path(`M 415 ${objY - 22} q 18 22 0 44`, { color: '#8d5524', width: 5 });
        s.note(440, objY - 22, 'mitt', { anchor: 'start' });
      },
    }),

  // 2.5 Problem 3 — bullet in the barrel
  sketch_02_05_p03: () =>
    track({
      title: 'Sketch of the bullet in the gun barrel',
      desc: 'A horizontal +x axis points along the barrel toward the muzzle, with the origin at the firing chamber. Start: t = 0, v_0 = 0. At the muzzle: t = 8.10 × 10⁻⁴ s, v unknown. The acceleration a = +6.20 × 10⁵ m/s² points in +x.',
      name: 'bullet',
      shape: 'dot',
      note: '(toward the muzzle)',
      states: [
        { x: 90, nameDy: 30, lines: ['t_0 = 0', 'v_0 = 0'] },
        { x: 430, v: 70, vLabel: 'v', lines: ['t = 8.10 × 10^{-4} \\rm{s}', 'v = ?'] },
      ],
      accel: { x: 200, len: 60, label: 'a = +6.20 × 10^5 \\rm{m/s}^2' },
      extra: (s, { objY }) => {
        s.svg.rect(70, objY - 8, 360, 24, { stroke: C.ground, width: 1.5 });
        s.note(250, objY - 18, 'barrel');
      },
    }),

  // 2.5 Problem 4 — light-rail train: speeding up, braking
  sketch_02_05_p04: () =>
    track({
      title: 'Sketch of the light-rail train',
      desc: 'A horizontal +x axis points in the direction the train travels, with the origin where it starts. Start: v_0 = 0. At top speed: v_1 = +80.0 km/h = +22.2 m/s. Stopped: v_2 = 0. Speeding up, a = +1.35 m/s² points in +x. Braking, the acceleration points in −x: a = −1.65 m/s² normally (part b), or unknown when the stop takes 8.30 s (part c).',
      name: 'train',
      width: 640,
      states: [
        { x: 80, lines: ['v_0 = 0'] },
        { x: 250, v: 80, vLabel: 'v_1', lines: ['v_1 = +22.2 \\rm{m/s}', '(80.0 \\rm{km/h})'] },
        { x: 500, lines: ['v_2 = 0'] },
      ],
      accel: [
        { x: 150, len: 70, label: '(a)  a = +1.35 \\rm{m/s}^2' },
        {
          x: 480,
          len: -70,
          label: ['(b)  a = −1.65 \\rm{m/s}^2', '(c)  a = ?,  Δt = 8.30 \\rm{s}'],
        },
      ],
    }),

  // 2.5 Problem 5 — car entering the freeway
  sketch_02_05_p05: () =>
    track({
      title: 'Sketch of the car entering the freeway',
      desc: 'A horizontal +x axis points in the direction the car travels, with the origin where the car starts from rest. Start: t = 0, x_0 = 0, v_0 = 0. After 12.0 s: x and v unknown. The acceleration a = +2.40 m/s² points in +x.',
      name: 'car',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 420, v: 80, vLabel: 'v', lines: ['t = 12.0 \\rm{s}', 'x = ?', 'v = ?'] },
      ],
      accel: { x: 200, len: 60, label: 'a = +2.40 \\rm{m/s}^2' },
    }),

  // 2.5 Problem 6 — runner slowing after the finish
  sketch_02_05_p06: () =>
    track({
      title: 'Sketch of the runner slowing down',
      desc: 'A horizontal +x axis points in the direction the runner is moving, with the origin where she starts to slow down. Start: t = 0, x_0 = 0, v_0 = +9.00 m/s. After 5.00 s: x and v unknown. The acceleration points in −x: a = −2.00 m/s².',
      name: 'runner',
      shape: 'dot',
      states: [
        { x: 90, v: 80, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +9.00 \\rm{m/s}'] },
        { x: 420, lines: ['t = 5.00 \\rm{s}', 'x = ?', 'v = ?'] },
      ],
      accel: { x: 330, len: -60, label: 'a = −2.00 \\rm{m/s}^2' },
    }),

  // 2.5 Problem 7 — blood leaving the left ventricle
  sketch_02_05_p07: () =>
    track({
      title: 'Sketch of blood accelerated by the heart',
      desc: 'A +x axis points in the direction the blood flows, with the origin where the blood starts from rest. Start: t = 0, x_0 = 0, v_0 = 0. After moving 1.80 cm: x = 1.80 cm, v = +30.0 cm/s, t unknown. The acceleration points in +x.',
      name: 'blood',
      shape: 'dot',
      note: '(direction of blood flow)',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        {
          x: 400,
          v: 70,
          vLabel: 'v',
          lines: ['t = ?', 'x = 1.80 \\rm{cm}', 'v = +30.0 \\rm{cm/s}'],
        },
      ],
      accel: { x: 200, len: 60, label: 'a = ?' },
    }),

  // 2.5 Problem 8 — slap shot
  sketch_02_05_p08: () =>
    track({
      title: 'Sketch of the puck during the slap shot',
      desc: 'A horizontal +x axis points in the direction the puck moves, with the origin where the stick starts to accelerate it. Start: t = 0, x_0 = 0, v_0 = +8.00 m/s. End of the shot: t = 3.33 × 10⁻² s, v = +40.0 m/s, x unknown.',
      name: 'puck',
      shape: 'dot',
      states: [
        { x: 90, v: 30, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +8.00 \\rm{m/s}'] },
        {
          x: 400,
          v: 110,
          vLabel: 'v',
          lines: ['t = 3.33 × 10^{-2} \\rm{s}', 'x = ?', 'v = +40.0 \\rm{m/s}'],
        },
      ],
      accel: { x: 200, len: 60, label: 'a = ?' },
    }),

  // 2.5 Problem 9 — motorcycle from rest to 26.8 m/s
  sketch_02_05_p09: () =>
    track({
      title: 'Sketch of the accelerating motorcycle',
      desc: 'A horizontal +x axis points in the direction the motorcycle travels, with the origin where it starts from rest. Start: t = 0, x_0 = 0, v_0 = 0. After 3.90 s: v = +26.8 m/s, x unknown. The acceleration, unknown, points in +x.',
      name: 'motorcycle',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 420, v: 90, vLabel: 'v', lines: ['t = 3.90 \\rm{s}', 'x = ?', 'v = +26.8 \\rm{m/s}'] },
      ],
      accel: { x: 200, len: 60, label: 'a = ?' },
    }),

  // 2.5 Problem 10 — freight train speeding up, then stopping
  sketch_02_05_p10: () =>
    track({
      title: 'Sketch of the freight train',
      desc: 'A horizontal +x axis points in the direction the train travels, with the origin where it starts to speed up. Start: t = 0, v_0 = +4.00 m/s. After 480 s: v_1 unknown. Stopped: v_2 = 0 at an unknown time. Speeding up, a_1 = +0.0500 m/s² points in +x; braking, a_2 = −0.550 m/s² points in −x.',
      name: 'train',
      width: 640,
      states: [
        { x: 80, v: 25, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +4.00 \\rm{m/s}'] },
        { x: 300, v: 80, vLabel: 'v_1', lines: ['t_1 = 480 \\rm{s}', 'x_1 = ?', 'v_1 = ?'] },
        { x: 500, lines: ['t_2 = ?', 'x_2 = ?', 'v_2 = 0'] },
      ],
      accel: [
        { x: 160, len: 60, label: 'a_1 = +0.0500 \\rm{m/s}^2' },
        { x: 430, len: -60, label: 'a_2 = −0.550 \\rm{m/s}^2' },
      ],
    }),

  // 2.5 Problem 11 — fireworks shell in the launch tube
  sketch_02_05_p11: () =>
    track({
      title: 'Sketch of the fireworks shell in its launch tube',
      desc: 'A +x axis points along the launch tube in the direction the shell moves, with the origin where the shell starts from rest. Start: t = 0, x_0 = 0, v_0 = 0. At the end of the tube: x = 0.250 m, v = +65.0 m/s, t unknown. The acceleration, unknown, points in +x.',
      name: 'shell',
      shape: 'dot',
      note: '(along the launch tube)',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        {
          x: 420,
          v: 90,
          vLabel: 'v',
          lines: ['t = ?', 'x = 0.250 \\rm{m}', 'v = +65.0 \\rm{m/s}'],
        },
      ],
      accel: { x: 200, len: 60, label: 'a = ?' },
    }),

  // 2.5 Problem 12 — swan taking off
  sketch_02_05_p12: () =>
    track({
      title: 'Sketch of the swan taking off',
      desc: 'A horizontal +x axis points in the direction the swan runs across the water, with the origin where it starts from rest. Start: t = 0, x_0 = 0, v_0 = 0. Takeoff: v = +6.00 m/s, x and t unknown. The acceleration a = +0.350 m/s² points in +x.',
      name: 'swan',
      shape: 'dot',
      states: [
        { x: 90, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 420, v: 70, vLabel: 'v', lines: ['t = ?', 'x = ?', 'v = +6.00 \\rm{m/s}'] },
      ],
      accel: { x: 200, len: 60, label: 'a = +0.350 \\rm{m/s}^2' },
    }),

  // 2.5 Problem 13 — woodpecker's head stopping against the tree
  sketch_02_05_p13: () =>
    track({
      title: 'Sketch of the woodpecker’s head stopping',
      desc: 'A horizontal +x axis points toward the tree, in the direction the head moves, with the origin where the beak first touches the bark. At contact: t = 0, x_0 = 0, v_0 = +0.600 m/s. The head stops at x = 2.00 mm; the brain stops at x = 4.50 mm. The acceleration points in −x, away from the tree.',
      name: 'head',
      shape: 'dot',
      note: '(toward the tree)',
      width: 660,
      axisTo: 540,
      states: [
        { x: 110, v: 70, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +0.600 \\rm{m/s}'] },
        { x: 330, open: true, lines: ['head: v = 0', 'x = 2.00 \\rm{mm}'] },
        { x: 470, open: true, name: 'brain', lines: ['brain: v = 0', 'x = 4.50 \\rm{mm}'] },
      ],
      accel: { x: 300, len: -60, label: 'a = ?' },
      extra: (s, { objY }) => {
        s.svg.rect(600, objY - 70, 26, 86, { fill: '#c8a27a', stroke: '#8d5524', width: 1.5 });
        s.note(613, objY - 78, 'tree');
      },
    }),

  // 2.5 Problem 14 — football player hitting the padded goalpost
  sketch_02_05_p14: () =>
    track({
      title: 'Sketch of the player stopping against the goalpost',
      desc: 'A horizontal +x axis points in the direction the player runs, toward the goalpost, with the origin where he first touches the padding. At contact: t = 0, x_0 = 0, v_0 = +7.50 m/s. Stopped: x = 0.350 m, v = 0. The acceleration points in −x.',
      name: 'player',
      shape: 'dot',
      axisTo: 500,
      states: [
        { x: 110, v: 80, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +7.50 \\rm{m/s}'] },
        { x: 400, lines: ['t = ?', 'x = 0.350 \\rm{m}', 'v = 0'] },
      ],
      accel: { x: 330, len: -60, label: 'a = ?' },
      extra: (s, { objY }) => {
        s.svg.rect(420, objY - 60, 24, 76, { fill: '#f4d03f', stroke: '#9a7d0a', width: 1.5 });
        s.note(432, objY - 68, 'goalpost');
      },
    }),

  // 2.5 Problem 15 — airman stopped by trees and snow
  sketch_02_05_p15: () =>
    column({
      title: 'Sketch of the airman stopping in the trees and snow',
      desc: 'A vertical +y axis points down, in the direction of motion, with the origin where the airman first hits the trees. At impact: y_0 = 0, v_0 = +54 m/s (downward). Stopped: y = 3.0 m, v = 0. The acceleration, unknown, points up (−y).',
      height: 300,
      up: false,
      axisTop: 40,
      axisBottom: 250,
      originY: 80,
      ticks: [[210, '3.0 \\rm{m}']],
      ground: 210,
      states: [
        {
          y: 80,
          v: 60,
          vLabel: 'v_0',
          name: 'airman',
          nameDx: 0,
          lines: ['y_0 = 0', 'v_0 = +54 \\rm{m/s}'],
        },
        { y: 202, open: true, lines: ['y = 3.0 \\rm{m}', 'v = 0'], ky: -16 },
      ],
      accel: { y: 170, len: -60, label: 'a = ?' },
      extra: s => {
        s.note(330, 226, 'snow and branches', { anchor: 'middle' });
      },
    }),

  // 2.5 Problem 16 — squirrel falling and stopping
  sketch_02_05_p16: () =>
    column({
      title: 'Sketch of the falling squirrel',
      desc: 'A vertical +y axis points down, with the origin at the branch the squirrel falls from. Start: y_0 = 0, v_0 = 0. Just before landing: y_1 = 3.0 m, v_1 unknown and positive (downward), while a = +9.80 m/s² (downward). It then stops 2.0 cm lower, at y_2 = 3.0 m + 0.020 m, with v_2 = 0, while the acceleration, unknown, points up (−y).',
      width: 540,
      height: 350,
      up: false,
      axisTop: 40,
      axisBottom: 290,
      originY: 70,
      ticks: [[232, '3.0 \\rm{m}']],
      ground: 240,
      states: [
        { y: 70, name: 'squirrel', lines: ['y_0 = 0', 'v_0 = 0'] },
        { y: 232, open: true, lines: ['y_1 = 3.0 \\rm{m}', 'v_1 = ?'], ky: -24 },
      ],
      accel: [
        { y: 90, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
        { y: 225, len: -40, label: 'stopping: a = ?' },
      ],
      extra: s => {
        s.svg.line(100, 78, 165, 78, { color: '#8d5524', width: 4 });
        s.note(330, 262, 'Stops 2.0 cm lower: y_2 = 3.0 m + 0.020 m, v_2 = 0', {
          anchor: 'middle',
        });
      },
    }),

  // 2.5 Problem 17 — express train passing through a station
  sketch_02_05_p17: () =>
    track({
      title: 'Sketch of the train passing through the station',
      desc: 'A horizontal +x axis points in the direction the train travels, with the origin at the entrance of the 210-m station. At t = 0 the nose is at x_0 = 0 with v_0 = +22.0 m/s, and the 130-m train trails behind it. The nose leaves the station at x = 210 m; the end of the train leaves when the nose is at x = 340 m. The acceleration points in −x: a = −0.150 m/s².',
      width: 660,
      axisFrom: 20,
      states: [
        {
          x: 170,
          v: 60,
          vLabel: 'v_0',
          name: 'nose',
          lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +22.0 \\rm{m/s}'],
        },
        { x: 395, open: true, shape: 'dot', lines: ['x_1 = 210 \\rm{m}', 't_1 = ?', 'v_1 = ?'] },
        { x: 535, open: true, shape: 'dot', lines: ['x_2 = 340 \\rm{m}', 't_2 = ?', 'v_2 = ?'] },
      ],
      accel: { x: 300, len: -60, label: 'a = −0.150 \\rm{m/s}^2' },
      extra: (s, { objY, groundY }) => {
        // station platform from x = 0 to 210 m
        s.svg.rect(170, groundY - 4, 225, 8, { fill: '#bbbbbb' });
        s.note(282, groundY + 18, 'station (210 m)');
        // the train at t = 0: 130 m long, nose at x = 0
        s.svg.rect(30, objY - 11, 140, 22, { fill: '#d6e4f0', stroke: C.body, width: 2, rx: 4 });
        s.note(100, objY - 22, 'train (130 m)');
      },
      shape: 'none',
    }),

  // 2.5 Problem 18 — dragster
  sketch_02_05_p18: () =>
    track({
      title: 'Sketch of the dragster run',
      desc: 'A horizontal +x axis points down the strip, with the origin at the starting line. Start: t = 0, x_0 = 0, v_0 = 0. Part (a): after 4.45 s, v = +145 m/s and the average acceleration is unknown. Part (b): at x = 402 m, v is unknown. The acceleration points in +x.',
      name: 'dragster',
      width: 640,
      states: [
        { x: 80, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 290, v: 70, vLabel: 'v', lines: ['(a)', 't = 4.45 \\rm{s}', 'v = +145 \\rm{m/s}'] },
        { x: 500, open: true, lines: ['(b)', 'x = 402 \\rm{m}', 'v = ?'] },
      ],
      accel: { x: 150, len: 60, label: 'a = ?' },
    }),

  // 2.5 Problem 19 — bicycle sprint to the finish
  sketch_02_05_p19: () =>
    track({
      title: 'Sketch of the bicycle sprint',
      desc: 'A horizontal +x axis points toward the finish line, with the origin where the winner starts to accelerate. Winner: t = 0, x_0 = 0, v_0 = +11.5 m/s, a = +0.500 m/s² for 7.00 s, then constant speed (a = 0). The other racer (orange) starts 5.00 m ahead, at x = 5.00 m, moving at a constant +11.8 m/s. The finish line is at x = 300 m.',
      width: 660,
      name: 'winner',
      shape: 'dot',
      extraHeight: 30,
      states: [
        { x: 90, v: 45, vLabel: 'v_0', lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = +11.5 \\rm{m/s}'] },
        {
          x: 290,
          open: true,
          v: 60,
          vLabel: 'v_1',
          lines: ['t_1 = 7.00 \\rm{s}', 'x_1 = ?', 'v_1 = ?'],
        },
        { x: 560, shape: 'none', lines: ['finish', 'x = 300 \\rm{m}'] },
      ],
      ticks: [[140, '5.00 \\rm{m}']],
      accel: [
        { x: 160, len: 50, label: 'a = +0.500 \\rm{m/s}^2' },
        { x: 420, len: 0, label: 'then a = 0' },
      ],
      extra: (s, { objY, groundY, knownY }) => {
        s.svg.line(560, groundY - 70, 560, groundY, { color: '#222222', width: 3, dash: '6 4' });
        s.dot(140, objY + 4, { color: C.alt });
        s.label(
          330,
          knownY + 72,
          'other racer (orange): x_0 = 5.00 \\rm{m}, v = +11.8 \\rm{m/s} (constant)',
          { color: C.alt }
        );
      },
    }),

  // 2.5 Problem 20 — Burt Munro's record run
  sketch_02_05_p20: () =>
    track({
      title: 'Sketch of the record motorcycle run',
      desc: 'A horizontal +x axis points along the 5.00-mi course, with the origin at the start. Start: t = 0, x_0 = 0, v_0 = 0. Phase 1: a = +6.706 m/s² (0 to 60.0 mi/h in 4.00 s) until v_1 = +82.07 m/s (183.58 mi/h), at unknown t_1 and x_1. Phase 2: constant speed, a = 0, to the end of the course at x = 8047 m, at unknown time t.',
      name: 'motorcycle',
      width: 660,
      states: [
        { x: 80, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 250, v: 80, vLabel: 'v_1', lines: ['t_1 = ?', 'x_1 = ?', 'v_1 = +82.07 \\rm{m/s}'] },
        { x: 540, v: 80, vLabel: 'v_1', lines: ['t = ?', 'x = 8047 \\rm{m}'] },
      ],
      accel: [
        { x: 120, len: 50, label: 'a = +6.706 \\rm{m/s}^2' },
        { x: 400, len: 0, label: 'a = 0', anchor: 'middle' },
      ],
    }),

  // 2.5 Problem 21 — Usain Bolt's 100-m and 200-m races
  sketch_02_05_p21: () =>
    track({
      title: 'Sketch of the sprint model',
      desc: 'A horizontal +x axis points along the track, with the origin at the start. Start: t = 0, x_0 = 0, v_0 = 0. Phase 1: constant acceleration a (unknown, in +x) for 3.00 s up to the maximum speed v (unknown). Phase 2: constant speed v, a = 0, to the finish: x = 100 m at t = 9.69 s, or x = 200 m at t = 19.30 s.',
      name: 'sprinter',
      shape: 'dot',
      width: 640,
      states: [
        { x: 80, lines: ['t_0 = 0', 'x_0 = 0', 'v_0 = 0'] },
        { x: 240, v: 70, vLabel: 'v', lines: ['t_1 = 3.00 \\rm{s}', 'v = ?'] },
        {
          x: 520,
          v: 70,
          vLabel: 'v',
          lines: [
            '(a) x = 100 \\rm{m}, t = 9.69 \\rm{s}',
            '(b) x = 200 \\rm{m}, t = 19.30 \\rm{s}',
          ],
          dx: -30,
        },
      ],
      accel: [
        { x: 120, len: 50, label: 'a = ?' },
        { x: 390, len: 0, label: 'a = 0', anchor: 'middle' },
      ],
    }),

  // 2.7 Problem 1 — ball thrown straight up at 15.0 m/s
  sketch_02_07_p01: () => {
    const Y = m => 300 - m * 16;
    const times = [
      ['0.500', 6.28, 10.1],
      ['1.00', 10.1, 5.2],
      ['1.50', 11.5, 0.3],
      ['2.00', 10.4, -4.6],
    ];
    return column({
      title: 'Sketch of the ball thrown straight up',
      desc: 'A vertical +y axis points up, with the origin at the point of release. Release: t = 0, y_0 = 0, v_0 = +15.0 m/s. The ball’s position y and velocity v are wanted at t = 0.500, 1.00, 1.50, and 2.00 s (open circles; the last one is on the way down). The acceleration is a = −9.80 m/s² throughout.',
      width: 520,
      height: 360,
      axisTop: 40,
      axisBottom: 330,
      originY: Y(0),
      objX: 120,
      states: [
        {
          y: Y(0),
          v: 60,
          vLabel: 'v_0',
          name: 'ball',
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +15.0 \\rm{m/s}'],
          ky: -40,
        },
        ...times.map(([t, y, v], k) => ({
          y: Y(y),
          dx: 70 + k * 55,
          open: true,
          v: v * 4,
          name: `${t} s`,
          nameAbove: true,
        })),
      ],
      accel: { y: 120, len: -60, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.ground(70, 300, Y(0) + 8);
        s.note(300, 345, 'At each time: y = ?, v = ?');
      },
    });
  },

  // 2.7 Problem 2 — rock thrown down from the bridge
  sketch_02_07_p02: () => {
    const Y = m => 110 + m * 3.2;
    const ys = [8.23, 18.9, 32.0, 47.6, 65.6];
    const ts = ['0.500', '1.00', '1.50', '2.00', '2.50'];
    return column({
      title: 'Sketch of the rock thrown down from the bridge',
      desc: 'A vertical +y axis points down, with the origin at the bridge roadway where the rock is released. Release: t = 0, y_0 = 0, v_0 = +14.0 m/s (downward). The water is at y = 70.0 m. The rock’s position y and velocity v are wanted at t = 0.500, 1.00, 1.50, 2.00, and 2.50 s. The acceleration is a = +9.80 m/s² (downward).',
      width: 540,
      height: 400,
      up: false,
      axisTop: 40,
      axisBottom: 370,
      originY: Y(0),
      ticks: [[Y(70), '70.0 \\rm{m}']],
      water: Y(70),
      objX: 130,
      states: [
        {
          y: Y(0),
          v: 30,
          vLabel: 'v_0',
          name: 'rock',
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +14.0 \\rm{m/s}'],
          ky: -30,
        },
        ...ys.map((y, k) => ({ y: Y(y), dx: 100 + k * 40, open: true, name: `${ts[k]} s` })),
      ],
      accel: { y: 120, len: 60, label: 'a = +9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.rect(66, Y(0) + 8, 54, 10, { fill: '#bbbbbb' });
        s.note(93, Y(0) + 32, 'bridge');
        s.note(390, Y(70) + 22, 'At each time: y = ?, v = ?');
      },
    });
  },

  // 2.7 Problem 3 — basketball player jumping
  sketch_02_07_p03: () =>
    column({
      title: 'Sketch of the basketball player’s jump',
      desc: 'A vertical +y axis points up, with the origin at the player’s starting height on the floor. Takeoff: y_0 = 0, v_0 unknown (upward). Top of the jump: y = 1.25 m, v = 0. The acceleration is a = −9.80 m/s².',
      height: 300,
      axisTop: 40,
      axisBottom: 280,
      originY: 240,
      ticks: [[100, '1.25 \\rm{m}']],
      ground: 248,
      states: [
        {
          y: 240,
          v: 50,
          vLabel: 'v_0',
          name: 'player',
          nameDy: 18,
          nameDx: 30,
          lines: ['y_0 = 0', 'v_0 = ?'],
          ky: -14,
        },
        { y: 100, open: true, name: 'top', lines: ['y = 1.25 \\rm{m}', 'v = 0'] },
      ],
      accel: { y: 140, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
    }),

  // 2.7 Problem 4 — life preserver thrown down from a helicopter
  sketch_02_07_p04: () =>
    column({
      title: 'Sketch of the life preserver thrown down',
      desc: 'A vertical +y axis points down, with the origin where the rescuer releases the life preserver. Release: t = 0, y_0 = 0, v_0 = +1.40 m/s (downward). At the water: t = 1.8 s, y unknown. The acceleration is a = +9.80 m/s² (downward).',
      height: 320,
      up: false,
      axisTop: 40,
      axisBottom: 290,
      originY: 90,
      water: 240,
      states: [
        {
          y: 90,
          v: 25,
          vLabel: 'v_0',
          name: 'life preserver (released from the helicopter)',
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +1.40 \\rm{m/s}'],
        },
        { y: 228, open: true, lines: ['t = 1.8 \\rm{s}', 'y = ?'], ky: -14 },
      ],
      accel: { y: 110, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
      extra: s => {
        s.note(330, 262, 'water');
      },
    }),

  // 2.7 Problem 5 — dolphin jumping straight up
  sketch_02_07_p05: () =>
    column({
      title: 'Sketch of the dolphin’s jump',
      desc: 'A vertical +y axis points up, with the origin at the water surface. Leaving the water: t = 0, y_0 = 0, v_0 = +13.0 m/s. At the top: y unknown, v = 0. Back at the water (part c): y = 0, t unknown. The acceleration is a = −9.80 m/s² throughout.',
      width: 560,
      height: 320,
      axisTop: 40,
      axisBottom: 300,
      originY: 250,
      water: 250,
      states: [
        {
          y: 250,
          v: 60,
          vLabel: 'v_0',
          name: 'dolphin',
          nameDy: 18,
          nameDx: 34,
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +13.0 \\rm{m/s}'],
          ky: -40,
        },
        { y: 80, open: true, name: 'top', lines: ['y = ?', 'v = 0'] },
        { y: 250, dx: 200, open: true, lines: ['(c) back at water:', 'y = 0, t = ?'], ky: -40 },
      ],
      accel: { y: 110, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
    }),

  // 2.7 Problem 6 — swimmer bouncing off the diving board
  sketch_02_07_p06: () =>
    column({
      title: 'Sketch of the dive from the board',
      desc: 'A vertical +y axis points up, with the origin at the diving board. Takeoff: t = 0, y_0 = 0, v_0 = +4.00 m/s. Highest point: y unknown, v = 0. Feet reach the water: y = −1.80 m, t and v unknown (v is negative, downward). The acceleration is a = −9.80 m/s² throughout.',
      width: 540,
      height: 330,
      axisTop: 40,
      axisBottom: 310,
      originY: 170,
      ticks: [[270, '−1.80 \\rm{m}']],
      water: 270,
      states: [
        {
          y: 170,
          v: 50,
          vLabel: 'v_0',
          name: 'swimmer',
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +4.00 \\rm{m/s}'],
          ky: -10,
        },
        { y: 70, dx: 60, open: true, name: 'top', lines: ['y_{top} = ?', 'v = 0'] },
        {
          y: 262,
          dx: 120,
          open: true,
          v: -45,
          vLabel: 'v',
          lines: ['y = −1.80 \\rm{m}', 't = ?,  v = ?'],
          ky: -30,
        },
      ],
      accel: { y: 100, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.rect(70, 178, 100, 8, { fill: '#8d6e63' });
        s.note(110, 200, 'board');
      },
    }),

  // 2.7 Problem 7 — rock thrown up (then down) from a cliff
  sketch_02_07_p07: () =>
    column({
      title: 'Sketch of the rock thrown from the cliff',
      desc: 'A vertical +y axis points up, with the origin at the top of the cliff where the rock is released. Part (a): v_0 = +8.00 m/s (thrown up); the rock rises, falls past the cliff top, and hits the ground at t = 2.35 s at unknown y (negative, below the origin). Part (b): v_0 = −8.00 m/s (thrown down); the time to reach the same ground level is unknown. The acceleration is a = −9.80 m/s² throughout.',
      width: 560,
      height: 360,
      axisTop: 40,
      axisBottom: 340,
      originY: 130,
      ticks: [[300, 'y = ?']],
      objX: 170,
      states: [
        {
          y: 130,
          v: 50,
          vLabel: 'v_0',
          name: 'rock',
          kdx: 120,
          lines: ['t_0 = 0,  y_0 = 0', '(a) v_0 = +8.00 \\rm{m/s}', '(b) v_0 = −8.00 \\rm{m/s}'],
          ky: -20,
        },
        { y: 60, dx: 40, open: true },
        {
          y: 300,
          dx: 90,
          open: true,
          kdx: 30,
          lines: ['(a) t = 2.35 \\rm{s}', '(b) t = ?'],
          ky: -30,
        },
      ],
      accel: { y: 150, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.cliff(70, 170, 138, 308);
        s.ground(70, 520, 308);
        s.path('M 170 130 Q 210 0 260 300');
      },
    }),

  // 2.7 Problem 8 — shot put straight up
  sketch_02_07_p08: () =>
    column({
      title: 'Sketch of the shot put straight up',
      desc: 'A vertical +y axis points up, with the origin at the ground. Release: t = 0, y_0 = 2.20 m, v_0 = +11.0 m/s. The shot comes back down to the top of the putter’s head at y = 1.80 m at an unknown time t. The acceleration is a = −9.80 m/s².',
      width: 520,
      height: 340,
      axisTop: 40,
      axisBottom: 320,
      originY: 290,
      ticks: [
        [180, '2.20 \\rm{m}'],
        [200, '1.80 \\rm{m}'],
      ],
      ground: 290,
      objX: 150,
      states: [
        {
          y: 180,
          v: 60,
          vLabel: 'v_0',
          name: 'shot',
          nameDy: -14,
          nameDx: 22,
          lines: ['t_0 = 0', 'y_0 = 2.20 \\rm{m}', 'v_0 = +11.0 \\rm{m/s}'],
          ky: -30,
        },
        { y: 200, dx: 80, open: true, v: -40, vLabel: 'v', lines: ['y = 1.80 \\rm{m}', 't = ?'] },
      ],
      accel: { y: 90, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        // the putter: a stick figure whose head top is at 1.80 m
        s.svg.circle(230, 219, 12, { fill: 'none', stroke: C.body, width: 2 });
        s.svg.line(230, 231, 230, 262, { color: C.body, width: 2 });
        s.svg.line(230, 262, 218, 290, { color: C.body, width: 2 });
        s.svg.line(230, 262, 242, 290, { color: C.body, width: 2 });
        s.note(244, 270, 'putter', { anchor: 'start' });
      },
    }),

  // 2.7 Problem 9 — ball passing a tree branch twice
  sketch_02_07_p09: () =>
    column({
      title: 'Sketch of the ball passing the branch twice',
      desc: 'A vertical +y axis points up, with the origin at the point of release. Release: t = 0, y_0 = 0, v_0 = +15.0 m/s. The ball passes the branch at y = 7.00 m twice, on the way up at t_1 and on the way down at t_2 (both unknown). The acceleration is a = −9.80 m/s².',
      width: 520,
      height: 330,
      axisTop: 40,
      axisBottom: 310,
      originY: 270,
      ticks: [[150, '7.00 \\rm{m}']],
      objX: 140,
      states: [
        {
          y: 270,
          v: 60,
          vLabel: 'v_0',
          name: 'ball',
          nameDy: 18,
          nameDx: 26,
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = +15.0 \\rm{m/s}'],
          ky: -30,
        },
        { y: 150, dx: 0, open: true, v: 30, lines: [] },
        {
          y: 150,
          dx: 100,
          open: true,
          v: -30,
          lines: ['y = 7.00 \\rm{m}', 'up: t_1 = ?', 'down: t_2 = ?'],
        },
      ],
      accel: { y: 80, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.line(66, 158, 118, 158, { color: '#8d5524', width: 4 });
        s.note(92, 174, 'branch');
        s.ground(70, 360, 278);
      },
    }),

  // 2.7 Problem 10 — kangaroo jump
  sketch_02_07_p10: () =>
    column({
      title: 'Sketch of the kangaroo’s jump',
      desc: 'A vertical +y axis points up, with the origin at the ground. Takeoff: t = 0, y_0 = 0, v_0 unknown (upward). Top: y = 2.50 m, v = 0. Landing: y = 0 at an unknown time. The acceleration is a = −9.80 m/s².',
      width: 520,
      height: 300,
      axisTop: 40,
      axisBottom: 280,
      originY: 240,
      ticks: [[90, '2.50 \\rm{m}']],
      ground: 248,
      states: [
        {
          y: 240,
          v: 50,
          vLabel: 'v_0',
          name: 'kangaroo',
          nameDy: 18,
          nameDx: 30,
          lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = ?'],
          ky: -30,
        },
        { y: 90, open: true, name: 'top', lines: ['y = 2.50 \\rm{m}', 'v = 0'] },
        { y: 240, dx: 190, open: true, lines: ['landing:', 'y = 0, t = ?'], ky: -30 },
      ],
      accel: { y: 110, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
    }),

  // 2.7 Problem 11 — falling rock at Mt. Arapiles
  sketch_02_07_p11: () =>
    column({
      title: 'Sketch of the rock falling toward the hiker',
      desc: 'A vertical +y axis points down, with the origin where the rock breaks loose, 105 m above the hiker. Start: t = 0, y_0 = 0, v_0 = 0. The hiker hears the break when sound has traveled 105 m, and sees the rock 1.50 s later, at t = 1.81 s, when it is at unknown y. The hiker’s head is at y = 105 m. The acceleration is a = +9.80 m/s² (downward).',
      width: 540,
      height: 350,
      up: false,
      axisTop: 40,
      axisBottom: 320,
      originY: 60,
      ticks: [[280, '105 \\rm{m}']],
      objX: 170,
      states: [
        { y: 60, name: 'rock', lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = 0'] },
        {
          y: 110,
          open: true,
          v: 30,
          vLabel: 'v',
          lines: ['seen at t = 0.306 \\rm{s} + 1.50 \\rm{s}', 'y = ?'],
          ky: 12,
        },
        {
          y: 272,
          dx: 0,
          open: true,
          lines: ['hiker’s head: y = 105 \\rm{m}', 'impact time = ?'],
          ky: -24,
        },
      ],
      accel: { y: 160, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
      extra: s => {
        s.cliff(70, 140, 50, 290);
        s.ground(140, 500, 290);
      },
    }),

  // 2.7 Problem 12 — object dropped from 75.0 m
  sketch_02_07_p12: () =>
    column({
      title: 'Sketch of the object dropped from 75.0 m',
      desc: 'A vertical +y axis points down, with the origin at the release point, 75.0 m above the ground. Release: t = 0, y_0 = 0, v_0 = 0. After the first second: t = 1.00 s, y unknown. At the ground: y = 75.0 m, v unknown. The acceleration is a = +9.80 m/s² (downward).',
      height: 340,
      up: false,
      axisTop: 40,
      axisBottom: 310,
      originY: 80,
      ticks: [[270, '75.0 \\rm{m}']],
      ground: 270,
      states: [
        { y: 80, name: 'object', lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = 0'], ky: -10 },
        { y: 125, open: true, lines: ['t = 1.00 \\rm{s}: y = ?'] },
        { y: 262, open: true, v: 45, vLabel: 'v', lines: ['y = 75.0 \\rm{m}', 'v = ?'], ky: -20 },
      ],
      accel: { y: 150, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
    }),

  // 2.7 Problem 13 — boulder falling from Half Dome
  sketch_02_07_p13: () =>
    column({
      title: 'Sketch of the boulder falling from the cliff',
      desc: 'A vertical +y axis points down, with the origin at the top of the 250-m cliff. Start: t = 0, y_0 = 0, v_0 = 0. At the ground: y = 250 m, v unknown (positive, downward). The acceleration is a = +9.80 m/s² (downward). The tourist stands at the bottom.',
      width: 520,
      height: 340,
      up: false,
      axisTop: 40,
      axisBottom: 310,
      originY: 60,
      ticks: [[270, '250 \\rm{m}']],
      objX: 170,
      states: [
        { y: 60, name: 'boulder', lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = 0'] },
        { y: 262, open: true, v: 45, vLabel: 'v', lines: ['y = 250 \\rm{m}', 'v = ?'], ky: -20 },
      ],
      accel: { y: 130, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
      extra: s => {
        s.cliff(70, 140, 50, 270);
        s.ground(140, 500, 270);
        s.note(330, 290, 'tourist at the bottom');
      },
    }),

  // 2.7 Problem 14 — ball passing a window on the way up
  sketch_02_07_p14: () =>
    column({
      title: 'Sketch of the ball passing the window',
      desc: 'A vertical +y axis points up, with the origin at the ground where the ball is thrown. Launch: y_0 = 0, v_0 unknown (upward). The window’s bottom is at y = 7.50 m and its top at y = 9.50 m; the ball takes 0.312 s to rise from bottom to top. The acceleration is a = −9.80 m/s².',
      width: 540,
      height: 340,
      axisTop: 40,
      axisBottom: 320,
      originY: 290,
      ticks: [
        [140, '7.50 \\rm{m}'],
        [100, '9.50 \\rm{m}'],
      ],
      ground: 298,
      objX: 150,
      states: [
        {
          y: 290,
          v: 60,
          vLabel: 'v_0',
          name: 'ball',
          nameDy: 18,
          nameDx: 26,
          lines: ['y_0 = 0', 'v_0 = ?'],
          ky: -30,
        },
        {
          y: 140,
          open: true,
          v: 35,
          vLabel: 'v_b',
          lines: ['bottom: y = 7.50 \\rm{m}', 'v_b = ?'],
          ky: 14,
        },
        {
          y: 100,
          open: true,
          lines: ['top: y = 9.50 \\rm{m}', '0.312 \\rm{s} after the bottom'],
          ky: -24,
        },
      ],
      accel: { y: 190, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.rect(126, 100, 48, 40, { stroke: '#7f8c8d', width: 1.5 });
        s.note(150, 92, 'window');
      },
    }),

  // 2.7 Problem 15 — rock dropped into a well
  sketch_02_07_p15: () =>
    column({
      title: 'Sketch of the rock dropped into the well',
      desc: 'A vertical +y axis points down, with the origin at the top of the well where the rock is released. Release: t = 0, y_0 = 0, v_0 = 0. The water is at an unknown depth d. The rock falls for t_fall, then the splash sound travels back up at 332.00 m/s for t_sound; the total is 2.0000 s. The acceleration is a = +9.80 m/s² (downward).',
      width: 540,
      height: 340,
      up: false,
      axisTop: 40,
      axisBottom: 310,
      originY: 60,
      ticks: [[260, 'd = ?']],
      objX: 150,
      states: [
        { y: 60, name: 'rock', kdx: 70, lines: ['t_0 = 0', 'y_0 = 0', 'v_0 = 0'] },
        {
          y: 252,
          open: true,
          kdx: 70,
          lines: ['splash: y = d', 't_{fall} + t_{sound} = 2.0000 \\rm{s}'],
          ky: -24,
        },
      ],
      accel: { y: 120, len: 55, label: 'a = +9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.line(110, 60, 110, 270, { color: C.ground, width: 2 });
        s.svg.line(190, 60, 190, 270, { color: C.ground, width: 2 });
        s.water(110, 190, 260);
        s.svg.arrow(200, 240, 200, 90, { color: C.alt, width: 1.6, head: 9, dash: '5 4' });
        s.label(208, 160, 'sound, 332.00 \\rm{m/s}', { anchor: 'start', color: C.alt, size: 14 });
      },
    }),

  // 2.7 Problem 16 — steel ball bouncing on the floor
  sketch_02_07_p16: () =>
    column({
      title: 'Sketch of the bouncing steel ball',
      desc: 'A vertical +y axis points up, with the origin at the floor. Falling: y_0 = 1.50 m, v_0 = 0; just before impact, y = 0 and v_1 is unknown (negative, downward). Rebounding: just after leaving the floor, y = 0 and v_2 is unknown (positive, upward); at the top of the rebound, y = 1.45 m and v = 0. The acceleration is a = −9.80 m/s² while the ball is in the air; during the 8.00 × 10⁻⁵ s contact it is unknown.',
      width: 560,
      height: 330,
      axisTop: 40,
      axisBottom: 310,
      originY: 270,
      ticks: [
        [70, '1.50 \\rm{m}'],
        [80, ''],
      ],
      ground: 278,
      objX: 130,
      states: [
        { y: 70, name: 'drop', lines: ['y_0 = 1.50 \\rm{m}', 'v_0 = 0'], ky: -20 },
        { y: 270, v: -50, vLabel: 'v_1', lines: ['y = 0', 'v_1 = ?'], ky: -26 },
        { y: 270, dx: 170, open: true, v: 50, vLabel: 'v_2', lines: ['y = 0', 'v_2 = ?'], ky: -26 },
        { y: 80, dx: 170, open: true, name: 'top', lines: ['y = 1.45 \\rm{m}', 'v = 0'] },
      ],
      accel: { y: 150, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.note(490, 222, '(in the air)', { color: C.acc });
      },
    }),

  // 2.7 Problem 17 — coin dropped from a rising balloon
  sketch_02_07_p17: () =>
    column({
      title: 'Sketch of the coin released from the rising balloon',
      desc: 'A vertical +y axis points up, with the origin at the ground. Release: t = 0, y_0 = 300 m, v_0 = +10.0 m/s (the balloon’s upward velocity). Top of the coin’s path: y unknown, v = 0. At t = 4.00 s: y and v unknown. At the ground: y = 0, t unknown. The acceleration is a = −9.80 m/s².',
      width: 560,
      height: 360,
      axisTop: 40,
      axisBottom: 340,
      originY: 300,
      ticks: [[110, '300 \\rm{m}']],
      ground: 308,
      objX: 140,
      states: [
        {
          y: 110,
          v: 40,
          vLabel: 'v_0',
          name: 'coin',
          nameDy: 18,
          nameDx: 22,
          lines: ['t_0 = 0', 'y_0 = 300 \\rm{m}', 'v_0 = +10.0 \\rm{m/s}'],
          ky: 34,
        },
        {
          y: 80,
          dx: 60,
          open: true,
          name: 'top',
          nameDy: -14,
          lines: ['y_{top} = ?', 'v = 0'],
          ky: -14,
        },
        {
          y: 200,
          dx: 150,
          open: true,
          v: -30,
          vLabel: 'v',
          lines: ['t = 4.00 \\rm{s}', 'y = ?, v = ?'],
        },
        { y: 300, dx: 150, open: true, lines: ['y = 0, t = ?'], ky: -12 },
      ],
      accel: { y: 130, len: -55, label: 'a = −9.80 \\rm{m/s}^2' },
      extra: s => {
        s.svg.ellipse(140, 66, 22, 26, { stroke: C.body, width: 1.5 });
        s.note(140, 32, 'balloon');
      },
    }),
};
