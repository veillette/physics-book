/**
 * Chapter 23: induction circuits, back emf, transformer pulses, RL growth and
 * decay, reactance, and RLC resonance.
 *
 * Curves come from their equations: I = I0(1 − e^{−t/τ}) and I0 e^{−t/τ} for
 * an RL circuit, a quarter-cycle lead of voltage over current in an inductor
 * and lag in a capacitor (V = cos ωt with I = sin ωt or −sin ωt), and the
 * series-RLC resonance I_rms ∝ 1/√(R² + (X_L − X_C)²). Lettered points on
 * the AC graphs fall every quarter period, as the text describes them.
 *
 * For readers who allow motion, a cursor runs along the time axis of the
 * transformer, AC and RLC graphs with a dot on each curve, charges slosh back
 * and forth in the simple AC circuit, and the RL switch moves from 1 to 2 as
 * the current grows and then decays.
 */
import {
  CURRENT,
  WIRE,
  acSource,
  capacitor,
  cell,
  ground,
  inductor,
  resistor,
  wire,
} from './circuit.js';
import { COLORS, Plot, Svg, smilAnimate } from './svg.js';

const VOLT = '#6cc04a';
const AMP = COLORS.maroon;
const WAVE = '#1fa8d8';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 18, math: false });
}

/** Blank the wire from P to Q under a symbol `span` long, then draw it. */
function on(svg, span, P, Q, draw) {
  const len = Math.hypot(Q[0] - P[0], Q[1] - P[1]);
  const [ux, uy] = [(Q[0] - P[0]) / len, (Q[1] - P[1]) / len];
  const a = (len - span) / 2;
  svg.line(P[0] + ux * a, P[1] + uy * a, Q[0] - ux * a, Q[1] - uy * a, {
    color: '#ffffff',
    width: 8,
  });
  draw(P, Q);
}

function box(svg, L, T, R, B) {
  wire(svg, [
    [L, T],
    [R, T],
    [R, B],
    [L, B],
    [L, T],
  ]);
}

/** Voltage across an element: a vertical double arrow broken around its label. */
function across(svg, x, y1, y2, label) {
  const m = (y1 + y2) / 2;
  svg.arrow(x, m - 20, x, y1, { color: COLORS.black, width: 1.6, head: 11 });
  svg.arrow(x, m + 20, x, y2, { color: COLORS.black, width: 1.6, head: 11 });
  lab(svg, x + 6, m, label, { anchor: 'start' });
}

/** An AC source driving one element, and the graph of its voltage and current. */
function acPair({ title, desc, element, label, vLabel, current, letters, axis }) {
  const svg = new Svg({ width: 880, height: 390, title, desc });
  const [L, T, R, B] = [60, 70, 300, 290];
  box(svg, L, T, R, B);
  on(svg, 40, [L, 155], [L, 205], (P, Q) => acSource(svg, P, Q, { r: 20 }));
  lab(svg, L - 30, 180, 'V', { anchor: 'end' });
  on(svg, element === 'C' ? 16 : 70, [R, 145], [R, 215], (P, Q) => {
    if (element === 'L') inductor(svg, Q, P, { size: 70, n: 3, flip: true });
    else if (element === 'C') capacitor(svg, P, Q, { gap: 14, plate: 52 });
    else resistor(svg, P, Q, { size: 70, amp: 11 });
  });
  lab(svg, R - 26, 180, label, { anchor: 'end' });
  across(svg, R + 34, 140, 220, vLabel);
  caption(svg, 180, 350, '(a)');
  // One and three-quarter cycles, V = V0 cos ωt and the current as given.
  const g = new Plot(svg, {
    x: 470,
    y: 50,
    w: 370,
    h: 240,
    xRange: [0, 1.8],
    yRange: [-1.15, 1.15],
  });
  g.axes({ arrows: true });
  const w = 2 * Math.PI;
  g.fn(t => 0.78 * Math.cos(w * t), 0, 1.72, { color: VOLT, width: 3 });
  g.fn(t => current(w * t), 0, 1.72, { color: AMP, width: 3 });
  letters.forEach((s, k) => {
    const [x, y] = g.P((k + 1) / 4, 0);
    svg.circle(x, y, 5, { fill: COLORS.black });
    note(svg, x, y + 22, s);
  });
  for (const [t, v, s] of axis.slice(0, 2)) lab(svg, ...g.P(t, v), s);
  lab(svg, g.X(0) - 12, g.Y(1.15), axis[2][2], { anchor: 'end' });
  lab(svg, g.X(0) - 12, g.Y(0), '0', { anchor: 'end', size: 22 });
  lab(svg, g.X(1.8) + 22, g.Y(0), 't');
  caption(svg, g.X(0.9), 350, '(b)');
  // The cursor takes 3 s per cycle, so the quarter-cycle shift is easy to follow.
  sweep(
    svg,
    [[g, g.Y(1.15), g.Y(-1.15)]],
    [
      [g, t => 0.78 * Math.cos(w * t), VOLT],
      [g, t => current(w * t), AMP],
    ],
    0,
    1.72,
    { run: 5.2, n: 86 }
  );
  return svg.render();
}

/** A dot on a curve at (x, y), for the moving cursors. */
function bead(svg, x, y, color) {
  svg.circle(x, y, 7, { fill: color, stroke: '#ffffff', width: 1.5 });
}

/**
 * For readers who allow motion: a dashed cursor at time t from y1 down to
 * y2 on each plot of `cursors` ([plot, y1, y2]), with a dot on each curve of
 * `curves` ([plot, f, color]), running from t0 to t1 in `run` seconds.
 */
function sweep(svg, cursors, curves, t0, t1, { run = 6, n = 100 } = {}) {
  svg.animatedOnce(
    (t, moving, shown) => {
      svg.add(`<g opacity="${shown}">`);
      for (const [g, y1, y2] of cursors)
        svg.line(g.X(t), y1, g.X(t), y2, { color: COLORS.black, width: 1.5, dash: '5 4' });
      for (const [g, f, color] of curves) bead(svg, ...g.P(t, f(t)), color);
      svg.add('</g>');
    },
    Array.from({ length: n + 1 }, (_, k) => t0 + ((t1 - t0) * k) / n),
    { run, still: null }
  );
}

/** An RL growth or decay curve with τ to 4τ marked. */
function rlGraph(svg, x, y, { rising }) {
  const g = new Plot(svg, { x, y, w: 260, h: 200, xRange: [0, 4.6], yRange: [0, 1.12] });
  g.axes({ arrows: true });
  const f = rising ? t => 1 - Math.exp(-t) : t => Math.exp(-t);
  for (const k of [1, 2, 3, 4]) {
    const [px, py] = g.P(k, f(k));
    svg.line(px, py, px, g.Y(0), { color: COLORS.guide, width: 1 });
    svg.line(g.X(0), py, px, py, { color: COLORS.guide, width: 1 });
  }
  if (rising) svg.line(g.X(0), g.Y(1), g.X(4.6), g.Y(1), { color: COLORS.guide, width: 1 });
  g.fn(f, rising ? 0 : 0, 4.4, { color: AMP, width: 3 });
  for (const k of [1, 2, 3, 4]) svg.circle(...g.P(k, f(k)), 4, { fill: COLORS.black });
  ['τ = L/R', '2τ', '3τ', '4τ'].forEach((s, i) =>
    lab(svg, g.X(i + 1), g.Y(0) + 20, s, { size: 16 })
  );
  lab(svg, g.X(0), g.Y(0) + 20, '0', { size: 16 });
  lab(svg, g.X(0) - 6, g.Y(0), '0', { anchor: 'end', size: 16 });
  lab(svg, g.X(0) - 6, g.Y(1), 'I_0', { anchor: 'end', size: 16 });
  lab(svg, g.X(0) - 6, g.Y(f(1)), rising ? '0.632I_0' : '0.368I_0', { anchor: 'end', size: 16 });
  lab(svg, g.X(0), g.Y(1.12) - 18, 'I', { size: 18 });
  lab(svg, g.X(4.6) + 18, g.Y(0), 't', { size: 18 });
  return g;
}

export default {
  // 23.2 problem — three loops near a coil
  Figure_23_02_05: () => {
    const svg = new Svg({
      width: 520,
      height: 440,
      title: 'Three loops near a coil',
      desc: 'A coil of many turns is in a circuit with a cell and an open switch. Three single loops lie nearby: loop 1 to the left of the coil, loop 2 to the right, and loop 3 above it.',
    });
    const [L, T, R, B] = [80, 210, 420, 380];
    box(svg, L, T, R, B);
    on(svg, 130, [185, T], [315, T], () =>
      svg.spring(185, 315, T, { n: 6, r: 32, color: '#333333', width: 3 })
    );
    on(svg, 60, [130, B], [190, B], (P, Q) => {
      svg.circle(...P, 5, { fill: '#a01c38' });
      svg.circle(...Q, 5, { fill: '#a01c38' });
      svg.line(...P, Q[0] - 4, Q[1] - 26, { color: WIRE, width: 2.5 });
    });
    on(svg, 20, [255, B], [275, B], (P, Q) => cell(svg, P, Q, { gap: 16, long: 66, short: 36 }));
    note(svg, 238, B - 24, '−', { size: 24 });
    note(svg, 296, B - 26, '+', { size: 24 });
    const loop = (x, y) => {
      svg.ellipse(x, y, 20, 46, { stroke: '#777777', width: 9 });
      svg.ellipse(x, y, 20, 46, { stroke: '#d4d4d4', width: 4 });
    };
    loop(36, 272);
    loop(468, 280);
    loop(250, 72);
    note(svg, 28, 338, '1', { size: 26 });
    note(svg, 462, 346, '2', { size: 26 });
    note(svg, 250, 140, '3', { size: 26 });
    return svg.render();
  },

  // 23.6 Fig. 1 — a motor's back emf opposing the driving emf
  Figure_23_06_01: () => {
    const svg = new Svg({
      width: 560,
      height: 470,
      title: 'Back emf in a DC motor',
      desc: 'A series circuit: a 120 V driving emf, an open switch, the resistance R of the motor coil, and a variable back emf drawn opposite to the driving emf. The back emf ranges from 0 to 120 V and could be greater if the motor is overspun.',
    });
    const [L, T, R, B] = [70, 170, 400, 360];
    box(svg, L, T, R, B);
    on(svg, 60, [110, T], [180, T], (P, Q) => resistor(svg, P, Q, { size: 60, amp: 11 }));
    lab(svg, 145, T + 36, 'R');
    // The two emfs face opposite ways around the loop.
    on(svg, 24, [300, T], [276, T], (P, Q) => cell(svg, P, Q, { gap: 22, long: 90, short: 46 }));
    svg.arrow(240, T + 30, 350, T - 32, { color: COLORS.black, width: 2.5, head: 18 });
    note(svg, 330, T + 70, 'Back emf', { size: 24 });
    note(svg, 290, 46, '0 ⟶ 120 V', { size: 24 });
    note(svg, 290, 80, 'Could be greater if overspun', { size: 24 });
    on(svg, 60, [120, B], [180, B], (P, Q) => {
      svg.circle(...P, 5, { fill: '#a01c38' });
      svg.circle(...Q, 5, { fill: '#a01c38' });
      svg.line(...P, Q[0] - 4, Q[1] - 26, { color: WIRE, width: 2.5 });
    });
    on(svg, 24, [300, B], [276, B], (P, Q) => cell(svg, P, Q, { gap: 22, long: 110, short: 46 }));
    note(svg, 312, B + 22, '120 V', { size: 24, anchor: 'start' });
    note(svg, 300, B + 80, 'Driving emf', { size: 24 });
    return svg.render();
  },

  // 23.7 Fig. 4 — switched DC into a transformer, and the spikes that come out
  Figure_23_07_04: () => {
    const svg = new Svg({
      width: 720,
      height: 640,
      title: 'Switched DC input and the transformer output',
      desc: 'Top: the primary voltage Vp versus time t, a direct voltage switched on and off in a train of square pulses, never negative. Bottom: the secondary voltage Vs: a sharp positive spike each time the input switches on and a sharp negative spike each time it switches off, because only a changing current induces an emf.',
    });
    const edges = [
      [0.1, 0.27],
      [0.42, 0.59],
      [0.74, 0.91],
    ];
    const smooth = (t, a) => 1 / (1 + Math.exp(-(t - a) / 0.006));
    const vp = t => edges.reduce((s, [a, b]) => s + smooth(t, a) - smooth(t, b), 0);
    // The secondary voltage follows dVp/dt: spikes at the switching edges.
    const vs = t => {
      const h = 1e-4;
      return ((vp(t + h) - vp(t - h)) / (2 * h)) * 0.024;
    };
    const gs = [];
    for (const [y, f, name] of [
      [40, vp, 'V_p'],
      [360, vs, 'V_s'],
    ]) {
      const g = new Plot(svg, {
        x: 80,
        y,
        w: 580,
        h: 220,
        xRange: [0, 1.05],
        yRange: name === 'V_p' ? [-0.15, 1.25] : [-1.25, 1.25],
      });
      g.axes({ arrows: true, xAxisAt: 0 });
      g.fn(f, 0, 1.02, { n: 1600, color: AMP, width: 3 });
      gs.push([g, f]);
      lab(svg, g.X(0) - 12, g.Y(0), '0', { anchor: 'end', size: 22 });
      lab(svg, g.X(0) - 10, y - 4, name, { anchor: 'end' });
      lab(svg, g.X(1.05) + 22, g.Y(0), 't');
    }
    // The cursor shows each spike in Vs lining up with a switching edge in Vp.
    sweep(
      svg,
      [[gs[0][0], 40, 580]],
      gs.map(([g, f]) => [g, f, AMP]),
      0,
      1.02,
      { run: 6, n: 408 }
    );
    return svg.render();
  },

  // 23.8 Fig. 1 — the simplest AC circuit
  Figure_23_08_01: () => {
    const svg = new Svg({
      width: 560,
      height: 380,
      title: 'A simple AC circuit',
      desc: 'An AC voltage source V connected across a single resistance R, with no safety features.',
    });
    const [L, T, R, B] = [100, 40, 460, 340];
    box(svg, L, T, R, B);
    on(svg, 56, [L, 160], [L, 220], (P, Q) => acSource(svg, P, Q, { r: 28 }));
    lab(svg, L - 40, 190, 'V', { anchor: 'end', size: 32 });
    on(svg, 90, [R, 145], [R, 235], (P, Q) => resistor(svg, P, Q, { size: 90, amp: 16 }));
    lab(svg, R + 24, 190, 'R', { anchor: 'start', size: 32 });
    // For readers who allow motion, the charges in the wires surge one way
    // round the loop and then the other, in step with the source.
    const offsets = Array.from({ length: 25 }, (_, k) => 18 * Math.sin((2 * Math.PI * k) / 24));
    const slosh = pts =>
      `<polyline points="${pts.map(p => p.join(',')).join(' ')}" fill="none" stroke="${CURRENT}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="0 30">${smilAnimate('stroke-dashoffset', offsets, { dur: '2.4s' })}</polyline>`;
    svg.motionGroup(
      slosh([
        [L, 162],
        [L, T],
        [R, T],
        [R, 145],
      ]) +
        slosh([
          [R, 235],
          [R, B],
          [L, B],
          [L, 218],
        ])
    );
    return svg.render();
  },

  // 23.9 Fig. 3 — switching an inductor to charge a capacitor
  Figure_23_09_03: () => {
    const svg = new Svg({
      width: 560,
      height: 470,
      title: 'Charging a capacitor by switching an inductor',
      desc: 'An inductor L joins two switch points. From each, a switch blade connects either to a capacitor C (solid arrows) or to a battery of voltage V (dashed arrows). Rapidly switching the inductor from the battery to the capacitor induces an emf of several thousand volts, which charges the capacitor.',
    });
    const [nl, nr, y] = [[30, 250], [530, 250], 250];
    wire(svg, [nl, [30, 40], [530, 40], nr]);
    on(svg, 150, [205, 40], [355, 40], (P, Q) =>
      inductor(svg, P, Q, { size: 150, n: 3, width: 3 })
    );
    lab(svg, 280, 84, 'L', { size: 34 });
    wire(svg, [
      [110, 180],
      [450, 180],
    ]);
    on(svg, 20, [270, 180], [290, 180], (P, Q) => capacitor(svg, P, Q, { gap: 20, plate: 60 }));
    lab(svg, 280, 236, 'C', { size: 34 });
    wire(svg, [
      [110, 330],
      [450, 330],
    ]);
    on(svg, 20, [270, 330], [290, 330], (P, Q) =>
      cell(svg, P, Q, { gap: 20, long: 100, short: 50 })
    );
    lab(svg, 280, 410, 'V', { size: 34 });
    for (const [n, s] of [
      [nl, 1],
      [nr, -1],
    ]) {
      svg.circle(...n, 6, { fill: '#a01c38' });
      svg.arrow(n[0] + s * 6, y - 6, n[0] + s * 78, 182, {
        color: COLORS.black,
        width: 2,
        head: 14,
      });
      svg.arrow(n[0] + s * 6, y + 6, n[0] + s * 78, 328, {
        color: COLORS.black,
        width: 2,
        head: 14,
        dash: '7 5',
      });
    }
    return svg.render();
  },

  // 23.9 Fig. 5 — the inductor symbol
  Figure_23_09_05: () => {
    const svg = new Svg({
      width: 500,
      height: 92,
      title: 'Circuit symbol for an inductor',
      desc: 'The circuit symbol for an inductor: a straight lead, three adjoining half-loops, and another straight lead.',
    });
    inductor(svg, [10, 70], [490, 70], { size: 180, n: 3, width: 4 });
    svg.line(10, 70, 160, 70, { color: WIRE, width: 4 });
    svg.line(340, 70, 490, 70, { color: WIRE, width: 4 });
    return svg.render();
  },

  // 23.10 Fig. 1 — an RL circuit switched on and off
  Figure_23_10_01: () => {
    const svg = new Svg({
      width: 1040,
      height: 320,
      title: 'Current growth and decay in an RL circuit',
      desc: '(a) A resistor R and inductor L in series with a battery through a two-position switch. In position 1 the battery drives a current that grows; in position 2 the battery is cut out and the current decays as energy is lost in the resistor. (b) In position 1 the current rises from zero toward I0, reaching 0.632 I0 after one time constant τ = L/R and nearly I0 by 4τ. (c) In position 2 the current falls from I0 to 0.368 I0 after one time constant and nearly to zero by 4τ.',
    });
    const [L, T, R] = [70, 50, 300];
    const [y2, y1, pivot] = [175, 250, [L, 220]];
    wire(svg, [
      [L, 140],
      [L, T],
      [R, T],
      [R, y1],
      [L + 44, y1],
    ]);
    wire(svg, [
      [L + 44, y2],
      [R, y2],
    ]);
    wire(svg, [[L, 140], pivot]);
    on(svg, 70, [140, T], [230, T], (P, Q) => inductor(svg, P, Q, { size: 70, n: 3 }));
    lab(svg, 185, T - 30, 'L');
    on(svg, 56, [L, 70], [L, 130], (P, Q) => resistor(svg, P, Q, { size: 56, amp: 9 }));
    lab(svg, L - 18, 100, 'R', { anchor: 'end' });
    on(svg, 20, [215, y1], [195, y1], (P, Q) => cell(svg, P, Q, { gap: 16, long: 60, short: 30 }));
    svg.still(() => {
      svg.arrow(...pivot, L + 42, y1 - 2, { color: COLORS.black, width: 2, head: 12 });
      svg.arrow(...pivot, L + 42, y2 + 2, { color: COLORS.black, width: 2, head: 12, dash: '6 4' });
    });
    note(svg, L + 30, y1 + 8, '1', { anchor: 'end', size: 18 });
    note(svg, L + 30, y2 - 10, '2', { anchor: 'end', size: 18 });
    caption(svg, 185, 302, '(a)');
    const gb = rlGraph(svg, 440, 40, { rising: true });
    caption(svg, 570, 302, '(b)');
    const gc = rlGraph(svg, 760, 40, { rising: false });
    caption(svg, 890, 302, '(c)');
    // For readers who allow motion, the switch rests at 1 while a dot runs up
    // the growth curve, swings to 2, and a dot runs down the decay curve.
    const blade = u => {
      const [a1, a2] = [y1 - 2, y2 + 2].map(y => Math.atan2(y - pivot[1], L + 42 - pivot[0]));
      const [r1, r2] = [y1 - 2, y2 + 2].map(y => Math.hypot(L + 42 - pivot[0], y - pivot[1]));
      const [a, r] = [a1 + (a2 - a1) * u, r1 + (r2 - r1) * u];
      return [pivot[0] + r * Math.cos(a), pivot[1] + r * Math.sin(a)];
    };
    const steps = Array.from({ length: 23 }, (_, k) => k / 5);
    const frames = [
      ...steps.map(t => ({ u: 0, tb: t, tc: 0, on: 'b' })),
      ...[1, 2, 3, 4].map(j => ({ u: j / 4, tb: 4.4, tc: 0, on: '' })),
      ...steps.map(t => ({ u: 1, tb: 4.4, tc: t, on: 'c' })),
    ];
    svg.animatedOnce(
      ({ u, tb, tc, on }, moving, shown) => {
        svg.add(`<g opacity="${shown}">`);
        svg.arrow(...pivot, ...blade(u), { color: COLORS.black, width: 2.5, head: 12 });
        svg.add(`<g opacity="${on === 'b' ? 1 : 0.3}">`);
        bead(svg, ...gb.P(tb, 1 - Math.exp(-tb)), AMP);
        svg.add(`</g><g opacity="${on === 'c' ? 1 : 0.3}">`);
        bead(svg, ...gc.P(tc, Math.exp(-tc)), AMP);
        svg.add('</g></g>');
      },
      frames,
      { run: 10, still: null }
    );
    return svg.render();
  },

  // 23.11 Fig. 1 — AC voltage across an inductor leads the current
  Figure_23_11_01: () =>
    acPair({
      title: 'An AC voltage source driving an inductor',
      desc: '(a) An AC source V in series with an inductor L of negligible resistance; V_L is the voltage across the inductor. (b) The voltage V starts at its maximum while the current I starts at zero and peaks a quarter cycle later: the voltage leads the current by 90°. Points a to e mark successive quarter periods.',
      element: 'L',
      label: 'L',
      vLabel: 'V_L',
      current: wt => Math.sin(wt),
      letters: ['a', 'b', 'c', 'd', 'e'],
      axis: [
        [0.32, 1.06, 'I'],
        [0.1, 0.48, 'V'],
        [0, 1.36, 'V_L, I_L'],
      ],
    }),

  // 23.11 Fig. 2 — AC voltage across a capacitor lags the current
  Figure_23_11_02: () =>
    acPair({
      title: 'An AC voltage source driving a capacitor',
      desc: '(a) An AC source V in series with a capacitor C of negligible resistance; V_C is the voltage across the capacitor. (b) The voltage V starts at its maximum while the current I starts at zero and goes negative first, peaking a quarter cycle before the voltage: the voltage follows the current by 90°. Points a to e mark successive quarter periods.',
      element: 'C',
      label: 'C',
      vLabel: 'V_C',
      current: wt => -Math.sin(wt),
      letters: ['a', 'b', 'c', 'd', 'e'],
      axis: [
        [0.3, -1.08, 'I'],
        [0.1, 0.5, 'V'],
        [0, 1.36, 'V_C, I_C'],
      ],
    }),

  // 23.11 Fig. 3 — AC voltage across a resistor is in phase with the current
  Figure_23_11_03: () =>
    acPair({
      title: 'An AC voltage source driving a resistor',
      desc: '(a) An AC source V in series with a resistor R; V_R is the voltage across the resistor. (b) The voltage V and current I rise and fall exactly together: they are in phase. Points a to f mark successive quarter periods.',
      element: 'R',
      label: 'R',
      vLabel: 'V_R',
      current: wt => Math.cos(wt),
      letters: ['a', 'b', 'c', 'd', 'e', 'f'],
      axis: [
        [0.06, 1.08, 'I'],
        [-0.04, 0.42, 'V'],
        [0, 1.36, 'V_R, I_R'],
      ],
    }),

  // 23.11 Fig. 4 — a capacitor as a filter between two circuits
  Figure_23_11_04: () => {
    const svg = new Svg({
      width: 620,
      height: 560,
      title: 'Capacitors coupling two circuits',
      desc: '(a) Circuit 1 sends a signal to circuit 2 through a capacitor C connected in series between them. (b) Circuit 1 is wired directly to circuit 2, and a capacitor C connects the line between them to ground. Each circuit is grounded.',
    });
    const panel = (y0, series) => {
      svg.rect(40, y0, 120, 120, { fill: '#d5daf0', stroke: '#6b76a8', width: 1.5 });
      svg.rect(440, y0, 120, 120, { fill: '#d9e9b8', stroke: '#7d9a46', width: 1.5 });
      note(svg, 100, y0 + 48, 'Circuit');
      note(svg, 100, y0 + 74, '1');
      note(svg, 500, y0 + 48, 'Circuit');
      note(svg, 500, y0 + 74, '2');
      ground(svg, 100, y0 + 120, { drop: 22 });
      ground(svg, 500, y0 + 120, { drop: 22 });
      const yw = y0 + 60;
      wire(svg, [
        [160, yw],
        [440, yw],
      ]);
      if (series) {
        on(svg, 14, [293, yw], [307, yw], (P, Q) => capacitor(svg, P, Q, { gap: 14, plate: 40 }));
        lab(svg, 300, yw - 38, 'C');
      } else {
        wire(svg, [
          [300, yw],
          [300, yw + 74],
        ]);
        svg.circle(300, yw, 4, { fill: WIRE });
        capacitor(svg, [300, yw + 74], [300, yw + 74 + 30], { gap: 14, plate: 40 });
        ground(svg, 300, yw + 104, { drop: 10 });
        lab(svg, 330, yw + 96, 'C', { anchor: 'start' });
      }
      svg.arrow(176, yw + 18, 236, yw + 18, { color: COLORS.black, width: 1.4, head: 10 });
      note(svg, 206, yw + 42, 'Signal', { size: 18 });
    };
    panel(30, true);
    caption(svg, 300, 240, '(a)');
    panel(300, false);
    caption(svg, 300, 545, '(b)');
    return svg.render();
  },

  // 23.12 Fig. 1 — an RLC series circuit
  Figure_23_12_01: () => {
    const svg = new Svg({
      width: 640,
      height: 500,
      title: 'An RLC series circuit',
      desc: 'A resistor R, an inductor L and a capacitor C in series with an AC voltage source V = V0 sin 2πft. The voltages across them are V_R, V_L and V_C, and the same alternating current I flows through all three.',
    });
    const [L, T, R, B] = [300, 120, 520, 400];
    box(svg, L, T, R, B);
    on(svg, 46, [L, 237], [L, 283], (P, Q) => acSource(svg, P, Q, { r: 23 }));
    lab(svg, L - 36, 260, 'V = V_0 \\rm{sin} 2πft', { anchor: 'end' });
    on(svg, 70, [375, T], [445, T], (P, Q) => resistor(svg, P, Q, { size: 70, amp: 11 }));
    lab(svg, 410, T + 34, 'R');
    on(svg, 84, [R, 218], [R, 302], (P, Q) => inductor(svg, Q, P, { size: 84, n: 3, flip: true }));
    lab(svg, R - 26, 260, 'L', { anchor: 'end' });
    on(svg, 16, [402, B], [418, B], (P, Q) => capacitor(svg, P, Q, { gap: 16, plate: 56 }));
    lab(svg, 410, B - 42, 'C');
    const hdim = (x1, x2, y, s, below) => {
      svg.arrow(x1 + 1, y, x2 - 1, y, { color: COLORS.black, width: 1.4, head: 10, start: true });
      for (const x of [x1, x2]) svg.line(x, y - 9, x, y + 9, { color: COLORS.black, width: 1.3 });
      lab(svg, (x1 + x2) / 2, below ? y + 24 : y - 22, s);
    };
    hdim(375, 445, T - 46, 'V_R');
    hdim(390, 430, B + 44, 'V_C', true);
    svg.arrow(R + 50, 260, R + 50, 219, { color: COLORS.black, width: 1.4, head: 10 });
    svg.arrow(R + 50, 260, R + 50, 301, { color: COLORS.black, width: 1.4, head: 10 });
    for (const y of [218, 302]) svg.line(R + 41, y, R + 59, y, { color: COLORS.black, width: 1.3 });
    lab(svg, R + 70, 260, 'V_L', { anchor: 'start' });
    // The current alternates, so the arrow points both ways around the loop.
    svg.path('M 362 200 L 440 200 Q 462 200 462 222 L 462 298 Q 462 320 440 320 L 362 320', {
      color: CURRENT,
      width: 5,
    });
    svg.arrow(380, 200, 340, 200, { color: CURRENT, width: 5, head: 22 });
    svg.arrow(380, 320, 340, 320, { color: CURRENT, width: 5, head: 22 });
    lab(svg, 444, 260, 'I', { anchor: 'end' });
    return svg.render();
  },

  // 23.12 Fig. 2 — the voltages in an RLC circuit and their sum
  Figure_23_12_02: () => {
    const svg = new Svg({
      width: 780,
      height: 600,
      title: 'Voltages in an RLC circuit compared with the current',
      desc: 'Left, five graphs against time: the current I; V_R, in phase with I; V_L, leading I by a quarter cycle; V_C, lagging I by a quarter cycle; and their sum V. Dashed lines mark the times of a current maximum and minimum. Right: I and V together; the total voltage leads the current by a phase angle between 0 and 90°, here because V_L is larger than V_C.',
    });
    // Amplitudes: V_R 0.8, V_L 1.0, V_C 0.6, so V = 0.8 sin + 0.4 cos leads I by 26.6°.
    const w = 2 * Math.PI;
    const rows = [
      ['I', t => 0.55 * Math.sin(w * t), VOLT],
      ['V_R', t => 0.8 * Math.sin(w * t), WAVE],
      ['V_L', t => Math.cos(w * t), WAVE],
      ['V_C', t => -0.6 * Math.cos(w * t), WAVE],
      ['V', t => 0.8 * Math.sin(w * t) + 0.4 * Math.cos(w * t), WAVE],
    ];
    const graph = (x, y, f, name, color, w0 = 260) => {
      const g = new Plot(svg, { x, y, w: w0, h: 90, xRange: [0, 2.1], yRange: [-1.1, 1.1] });
      svg.line(g.X(0), g.Y(1.1), g.X(0), g.Y(-1.1), { color: COLORS.axis, width: 1.3 });
      svg.line(g.X(0), g.Y(0), g.X(2.1), g.Y(0), { color: COLORS.axis, width: 1.3 });
      g.fn(f, 0, 2.05, { color, width: 2.6 });
      lab(svg, g.X(0) - 6, g.Y(0.85), name, { anchor: 'end', size: 20 });
      lab(svg, g.X(2.1) + 14, g.Y(0), 't', { size: 20 });
      return g;
    };
    const gs = rows.map(([name, f, color], i) => graph(60, 20 + i * 112, f, name, color));
    const top = gs[0];
    for (const t of [0.25, 0.75])
      svg.line(top.X(t), top.Y(1.1), top.X(t), gs[4].Y(-1.1), {
        color: COLORS.black,
        width: 1.1,
        dash: '5 4',
      });
    const gi = graph(500, 200, rows[0][1], 'I', VOLT, 240);
    const gv = graph(500, 300, rows[4][1], 'V', WAVE, 240);
    // Peaks of I and of V, to show the lead.
    const lead = Math.atan2(0.4, 0.8) / w;
    for (const t of [0.25, 1.25]) {
      svg.line(gi.X(t), gi.Y(1.1), gi.X(t), gv.Y(-1.1), {
        color: COLORS.black,
        width: 1.1,
        dash: '5 4',
      });
      svg.line(gv.X(t - lead), gi.Y(1.1), gv.X(t - lead), gv.Y(-1.1), {
        color: COLORS.black,
        width: 1.1,
        dash: '5 4',
      });
    }
    sweep(
      svg,
      [
        [top, top.Y(1.1), gs[4].Y(-1.1)],
        [gi, gi.Y(1.1), gv.Y(-1.1)],
      ],
      [
        ...rows.map(([, f, color], i) => [gs[i], f, color]),
        [gi, rows[0][1], VOLT],
        [gv, rows[4][1], WAVE],
      ],
      0,
      2.05,
      { run: 6.2, n: 82 }
    );
    svg.path('M 360 40 Q 470 40 500 170', { color: '#666666', width: 5 });
    svg.arrow(492, 150, 502, 178, { color: '#666666', width: 5, head: 20 });
    svg.path('M 360 560 Q 470 560 500 430', { color: '#666666', width: 5 });
    svg.arrow(492, 450, 502, 422, { color: '#666666', width: 5, head: 20 });
    return svg.render();
  },

  // 23.12 Fig. 3 — resonance curves for small and large resistance
  Figure_23_12_03: () => {
    const svg = new Svg({
      width: 760,
      height: 480,
      title: 'Resonance in RLC circuits',
      desc: 'Rms current I_rms versus driving frequency f for two series RLC circuits that differ only in resistance. Both peak at the resonant frequency f0, but the circuit with large resistance has a lower and broader peak than the one with small resistance.',
    });
    // I_rms ∝ 1/√(R² + (X_L − X_C)²), with f in units of f0, so X_L − X_C ∝ f − 1/f.
    const curve = r => f => 1 / Math.sqrt(r * r + (f - 1 / f) ** 2);
    const g = new Plot(svg, { x: 70, y: 30, w: 640, h: 380, xRange: [0, 3.2], yRange: [0, 2.3] });
    g.axes({ arrows: true });
    g.fn(curve(0.5), 0.12, 3.1, { n: 400, color: AMP, width: 3.5 });
    g.fn(curve(0.8), 0.12, 3.1, { n: 400, color: AMP, width: 3.5 });
    svg.line(g.X(1), g.Y(2.05), g.X(1), g.Y(0), { color: COLORS.black, width: 1.5, dash: '7 5' });
    lab(svg, g.X(1), g.Y(0) + 26, 'f_0', { size: 28 });
    lab(svg, g.X(3.2) + 18, g.Y(0), 'f', { size: 28 });
    lab(svg, g.X(0) - 10, g.Y(2.15), 'I_{rms}', { anchor: 'end', size: 28 });
    note(svg, g.X(1.45), g.Y(1.25), 'Small resistance', { anchor: 'start', size: 26 });
    note(svg, g.X(1.2), g.Y(0.42), 'Large resistance', { anchor: 'start', size: 26 });
    return svg.render();
  },
};
