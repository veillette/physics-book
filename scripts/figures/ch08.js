/**
 * Chapter 8: impulse as the area under a force–time graph, scattering from a
 * proton, the "system of interest" diagrams of one-dimensional elastic and
 * inelastic collisions, and the two-dimensional collision diagrams of
 * section 8.6, conservation of momentum, and rocket propulsion.
 */
import { COLORS, Plot, Svg, morph, rad } from './svg.js';

const BLACK = COLORS.black;
const VEL = COLORS.velocity;
const TEAL = '#2aa1b3';
const TEAL_LIGHT = '#d3ebf0';
const PURPLE = '#4b2a7b';
const PURPLE_LIGHT = '#ddd3e8';
const ORANGE = '#d9532b';
const GHOST = '#c9bedb';
const GHOST_ORANGE = '#f2c2ae';
const SURFACE = '#d3e9f5';
const TRACK = '#e6c784';
const TRACK_EDGE = '#b8913d';

/** A point mass: a white disk with a thick colored rim and its label inside. */
function mass(svg, x, y, label, { r = 34, size = 22, color = PURPLE } = {}) {
  svg.circle(x, y, r, { fill: '#ffffff', stroke: color, width: 6 });
  if (label) svg.text(x, y, label, { size, halo: false });
}

/** Velocity arrow along x from x1 to x2 at height y, labeled above its middle. */
function velocity(svg, x1, x2, y, label, { size = 24, dy = -24 } = {}) {
  svg.arrow(x1, y, x2, y, { color: VEL, width: 4, head: 16 });
  if (label) svg.text((x1 + x2) / 2, y + dy, label, { size });
}

/** Point on an ellipse at parameter angle `deg` (counterclockwise, y up). */
function onEllipse(cx, cy, rx, ry, deg) {
  return [cx + rx * Math.cos(rad(deg)), cy - ry * Math.sin(rad(deg))];
}

/** "System of interest" ellipse with its label and squiggle at angle `at`. */
function system(svg, cx, cy, rx, ry, { label = [cx + rx * 0.55, cy - ry - 60], at = 50 } = {}) {
  svg.ellipse(cx, cy, rx, ry, { stroke: BLACK, width: 2 });
  svg.text(label[0], label[1], 'System of interest', { size: 22, math: false });
  const [tx, ty] = onEllipse(cx, cy, rx, ry, at);
  svg.squiggle(label[0], label[1] + 16, tx, ty - 3);
}

/** A gray block of side s standing on y = base, with its top and left faces showing. */
function block(svg, x, base, s, label) {
  const d = s * 0.15;
  const top = base - s;
  svg.polygon(
    [
      [x, top],
      [x + s, top],
      [x + s - d, top - d],
      [x - d, top - d],
    ],
    { fill: '#dadada', stroke: '#555555', width: 1 }
  );
  svg.polygon(
    [
      [x, top],
      [x - d, top - d],
      [x - d, base - d],
      [x, base],
    ],
    { fill: '#7f7f7f', stroke: '#555555', width: 1 }
  );
  svg.rect(x, top, s, s, { fill: '#b3b3b3', stroke: '#555555', width: 1 });
  svg.text(x + s / 2, top + s * 0.4, label, { size: 24, halo: false });
}

/** Pale blue frictionless surface: a slanted strip under the blocks. */
function surface(svg, x1, x2, y) {
  svg.polygon(
    [
      [x1 + 25, y - 12],
      [x2 + 25, y - 12],
      [x2 - 15, y + 12],
      [x1 - 15, y + 12],
    ],
    { fill: SURFACE }
  );
}

/** Air-track glider of width w on y = base, its dark fin at the right end. */
function glider(svg, x, base, label, { w = 150, h = 52 } = {}) {
  svg.polygon(
    [
      [x, base],
      [x + w, base],
      [x + w - 14, base - h],
      [x + 14, base - h],
    ],
    { fill: '#a8d5dd', stroke: '#3c8f9c', width: 2 }
  );
  svg.line(x + 30, base - h + 10, x + w - 30, base - h + 10, { color: '#3c8f9c', width: 2 });
  svg.polygon(
    [
      [x + w - 46, base],
      [x + w - 2, base],
      [x + w - 24, base - h + 16],
    ],
    { fill: '#2f8292' }
  );
  svg.text(x + w * 0.38, base - h * 0.42, label, { size: 24, halo: false });
}

/** Air track: a tan bar whose top surface is at y. */
function track(svg, x1, x2, y) {
  svg.rect(x1, y, x2 - x1, 30, { fill: TRACK });
  svg.line(x1, y, x2, y, { color: TRACK_EDGE, width: 2 });
}

export default {
  // 8.2 — an actual force and the constant effective force with equal impulse
  Figure_08_02_01: () => {
    const svg = new Svg({
      width: 680,
      height: 470,
      title: 'Actual and effective force versus time',
      desc: 'A graph of force F versus time t. The actual force rises smoothly from zero at t1 to a peak midway between t1 and t2 and falls back to zero at t2. The effective force Feff is constant from t1 to t2 at half the peak value. The area under the actual-force curve equals the area of the Feff rectangle, so both forces deliver the same impulse.',
    });
    const t1 = 0.1;
    const t2 = 1;
    const g = new Plot(svg, { x: 90, y: 40, w: 520, h: 340, xRange: [0, 1.1], yRange: [0, 2.3] });
    // F = 2 Feff sin²(π(t − t1)/(t2 − t1)) averages exactly Feff over [t1, t2].
    const actual = t => 2 * Math.sin((Math.PI * (t - t1)) / (t2 - t1)) ** 2;
    const curve = [];
    for (let k = 0; k <= 120; k += 1) {
      const t = t1 + ((t2 - t1) * k) / 120;
      curve.push(g.P(t, actual(t)));
    }
    svg.polygon([g.P(t1, 0), g.P(t1, 1), g.P(t2, 1), g.P(t2, 0)], { fill: PURPLE_LIGHT });
    svg.polygon([g.P(t1, 0), ...curve, g.P(t2, 0)], { fill: TEAL, opacity: 0.22 });
    svg.polyline(curve, { color: TEAL, width: 4 });
    g.line(0, 1, t2, 1, { color: BLACK, width: 2, dash: '7 5' });
    g.line(t1, 0, t1, 1, { color: PURPLE, width: 3.5 });
    g.line(t2, 0, t2, 1, { color: PURPLE, width: 3.5 });
    g.axes({ arrows: true });
    svg.text(g.X(0) - 4, g.Y(2.3) - 22, 'F', { size: 26 });
    svg.text(g.X(1.1) + 26, g.Y(0) + 4, 't', { size: 26 });
    svg.text(g.X(t1), g.Y(0) + 30, 't_1', { size: 24 });
    svg.text(g.X(t2), g.Y(0) + 30, 't_2', { size: 24 });
    svg.text(g.X(0) - 10, g.Y(1), 'F_{eff}', { size: 24, anchor: 'end' });
    svg.text(g.X(0.3) - 30, g.Y(2.05), 'F_{actual}', { size: 24 });
    svg.leader(g.X(0.3) - 20, g.Y(2.05) + 18, g.X(0.36), g.Y(actual(0.36)) - 6, { bend: 0.4 });
    return svg.render();
  },

  // 8.3 — electrons scattering from a target, and from a quark inside a proton
  Figure_08_03_03: () => {
    const svg = new Svg({
      width: 1000,
      height: 760,
      title: 'Electrons scattering from a target and from a quark in a proton',
      desc: 'Top: a beam of electrons strikes a macroscopic target. Most electrons pass through and continue to the right, but one scatters straight back to the left. Below, an enlarged view of a small region of the target: an electron strikes a quark inside a proton. The quark recoils forward and the electron bounces back.',
    });
    svg.add(
      [
        '<defs>',
        '<linearGradient id="zoom-08-03-03" x1="0" y1="0" x2="0" y2="1">',
        '<stop offset="0" stop-color="#d4a838" stop-opacity="0.95"/>',
        '<stop offset="1" stop-color="#d4a838" stop-opacity="0"/>',
        '</linearGradient>',
        '<radialGradient id="proton-08-03-03" cx="0.35" cy="0.3" r="0.75">',
        '<stop offset="0" stop-color="#f4f6fb"/>',
        '<stop offset="1" stop-color="#5a6f96"/>',
        '</radialGradient>',
        '<radialGradient id="electron-08-03-03" cx="0.35" cy="0.3" r="0.75">',
        '<stop offset="0" stop-color="#ece4f4"/>',
        '<stop offset="1" stop-color="#8a6aae"/>',
        '</radialGradient>',
        '</defs>',
      ].join('')
    );
    const beam = { color: VEL, width: 4 };
    const slope = 0.19;
    // Two electrons pass behind the target and continue to the right.
    svg.line(60, 10, 600, 10 + 540 * slope, beam);
    svg.line(0, 60, 560, 60 + 560 * slope, beam);
    svg.line(0, 125, 478, 125 + 478 * slope, beam);
    // The magnified region: a fading cone from the small box down to the proton.
    svg.polygon(
      [
        [508, 236],
        [542, 236],
        [810, 520],
        [250, 520],
      ],
      { fill: 'url(#zoom-08-03-03)' }
    );
    svg.polygon(
      [
        [478, 190],
        [640, 30],
        [640, 98],
        [478, 266],
      ],
      { fill: '#d4a838', stroke: PURPLE, width: 1.5 }
    );
    svg.rect(508, 212, 34, 24, { stroke: PURPLE, width: 1.5 });
    svg.arrow(610, 10 + 610 * slope, 990, 10 + 990 * slope, { ...beam, head: 20 });
    svg.arrow(565, 60 + 565 * slope, 965, 60 + 965 * slope, { ...beam, head: 20 });
    svg.arrow(530, 125 + 530 * slope, 935, 125 + 935 * slope, { ...beam, head: 20 });
    svg.arrow(474, 214, 145, 214, { ...beam, head: 20 });
    svg.text(10, 160, 'e^{−}', { size: 28, anchor: 'start' });
    svg.text(905, 130, 'e^{−}′\\rm{s}', { size: 28, anchor: 'start' });
    svg.lines(790, 22, ['Macroscopic', 'target'], { size: 24, math: false });
    svg.squiggle(742, 60, 646, 96, { waves: 1, amp: 5 });

    // Enlarged view: electron, quark, proton.
    svg.circle(630, 590, 122, { fill: 'url(#proton-08-03-03)' });
    svg.circle(180, 577, 26, { fill: 'url(#electron-08-03-03)' });
    svg.text(180, 577, 'e^{−}', { size: 24, halo: false });
    svg.line(222, 577, 530, 577, { color: VEL, width: 3 });
    svg.arrow(222, 577, 375, 577, { color: VEL, width: 3, head: 18 });
    svg.line(533, 590, 240, 616, { color: VEL, width: 3 });
    svg.arrow(533, 590, 420, 600, { color: VEL, width: 3, head: 18 });
    svg.circle(558, 577, 24, { fill: '#f6b3b9', stroke: '#d2505c', width: 3 });
    svg.circle(552, 571, 8, { fill: '#fbe3e5' });
    svg.arrow(752, 578, 858, 578, { color: VEL, width: 3, head: 18 });
    svg.lines(665, 562, ['Quark', 'recoils'], { size: 24, math: false, halo: false });
    svg.text(705, 742, 'Proton', { size: 24, math: false });
    return svg.render();
  },

  // 8.4 — an elastic one-dimensional collision, drawn to scale for m2 = 3m1
  Figure_08_04_01: () => {
    const svg = new Svg({
      width: 760,
      height: 850,
      title: 'An elastic one-dimensional two-object collision',
      desc: 'Before: on a frictionless surface, block m1 moves right with velocity v1 and catches up with the larger block m2, which moves right more slowly with velocity v2. Net F = 0 and p1 + p2 = ptot. After: m1 moves left with velocity v1′ and m2 moves right with velocity v2′; p1′ + p2′ = ptot. The collision is elastic, so KE1′ + KE2′ = KE1 + KE2. The arrows are drawn to scale for m2 = 3m1 with v1 = 4 units and v2 = 0.5 unit, which gives v1′ = −1.25 units and v2′ = 2.25 units. Each panel is circled as the system of interest.',
    });
    const unit = 40;
    const s1 = 80;
    const s2 = 115; // the cube root of 3 times s1
    // Animation: the Before blocks run from where they are drawn until m1
    // meets m2 at x = contact, then the After blocks leave that same contact
    // and stop where they are drawn, so the After panel starts exactly where
    // the Before panel ends. One speed scale serves both panels, so the motion
    // keeps the ratios of the arrows. The Before arrows fade as the blocks
    // start, before the long v1 arrow can run over m2.
    const speed = 30; // pixels per second per velocity unit
    const [tIn, tOut] = [1.8, 1.8];
    const contact = 90 + 4 * speed * tIn;
    const moveIn = t => [contact - 4 * speed * (tIn - t), contact + s1 - 0.5 * speed * (tIn - t)];
    const moveOut = t => [contact - 1.25 * speed * t, contact + s1 + 2.25 * speed * t];
    const before = moveIn(0);
    const after = moveOut(tOut);
    const [hold, fade, T] = [0.6, 0.45, 7];
    const dur = `${T}s`;
    const pair = (base, isAfter, [x1, x2, shown]) => {
      // m₂'s shaded side face is on its left; drawing m₂ first lets m₁ cover
      // it at contact instead of the face overlapping m₁.
      block(svg, x2, base, s2, 'm_2');
      block(svg, x1, base, s1, 'm_1');
      const y1 = base - s1 / 2;
      const y2 = base - s2 / 2;
      svg.add(`<g opacity="${shown}">`);
      if (isAfter) {
        velocity(svg, x1, x1 - 1.25 * unit, y1, 'v′_1');
        velocity(svg, x2 + s2, x2 + s2 + 2.25 * unit, y2, 'v′_2');
      } else {
        velocity(svg, x1 + s1, x1 + s1 + 4 * unit, y1, 'v_1');
        velocity(svg, x2 + s2, x2 + s2 + 0.5 * unit, y2);
        svg.text(x2 + s2 + 0.5 * unit + 8, y2, 'v_2', { size: 24, anchor: 'start' });
      }
      svg.add('</g>');
    };
    const panel = (y0, isAfter) => {
      system(svg, 380, y0 + 245, 360, 128, { label: [590, y0 + 30], at: 38 });
      svg.text(85, y0 + 128, isAfter ? 'After' : 'Before', {
        size: 24,
        math: false,
        anchor: 'start',
      });
      svg.text(380, y0 + 160, isAfter ? 'p′_1 + p′_2 = p_{tot}' : 'p_1 + p_2 = p_{tot}', {
        size: 26,
      });
      const base = y0 + 322;
      surface(svg, 70, 715, base);
      svg.text(380, base + 28, 'Frictionless surface', { size: 22, math: false });
      const draw = f => pair(base, isAfter, f);
      if (isAfter) {
        const met = [...moveOut(0), 1];
        const end = [...after, 1];
        svg.animated(draw, [met, met, end, end], {
          still: 2,
          dur,
          keyTimes: [0, (hold + tIn) / T, (hold + tIn + tOut) / T, 1],
        });
      } else {
        const start = [...before, 1];
        const met = [...moveIn(tIn), 0];
        svg.animated(draw, [start, start, [...moveIn(fade), 0], met, met], {
          dur,
          keyTimes: [0, hold / T, (hold + fade) / T, (hold + tIn) / T, 1],
        });
      }
    };
    panel(0, false);
    svg.text(330, 72, 'net **F** = 0', { size: 26, math: false });
    panel(450, true);
    svg.text(310, 530, '\\rm{Elastic ⇒ KE′}_1 + \\rm{KE′}_2 = \\rm{KE}_1 + \\rm{KE}_2', {
      size: 24,
      math: false,
    });
    return svg.render();
  },

  // 8.5 — equal masses meet head-on and stick together
  Figure_08_05_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 370,
      title: 'A perfectly inelastic one-dimensional collision',
      desc: '(a) Before: two blocks of equal mass m on a frictionless surface move toward each other with velocities v and −v. Net F = 0, p1 + p2 = 0, and the internal kinetic energy is KEint = mv². (b) After: the blocks are stuck together and at rest, v = 0, so p1′ + p2′ = 0 and KE′int = 0. Each panel is circled as the system of interest.',
    });
    const s = 92;
    const base = 272;
    // (a)
    system(svg, 285, 222, 265, 100, { label: [330, 22], at: 70 });
    svg.text(20, 112, 'Before', { size: 24, math: false, anchor: 'start' });
    svg.text(205, 76, '\\rm{KE}_{int} = mv^2', { size: 25 });
    svg.text(470, 84, 'net **F** = 0', { size: 24, math: false });
    svg.text(235, 138, 'p_1 + p_2 = 0', { size: 25 });
    surface(svg, 55, 520, base);
    // Animation: each block closes the gap at speed v until they meet. The
    // arrows fade before their heads cross.
    const speed = 60; // pixels per second
    const gap = 405 - (75 + s);
    const [hold, fade, T] = [0.6, 0.5, 5.5];
    const meet = hold + gap / (2 * speed);
    const toward = ([dx, shown]) => {
      // Right block first, so the left block covers its side face at contact.
      block(svg, 405 - dx, base, s, 'm');
      block(svg, 75 + dx, base, s, 'm');
      svg.add(`<g opacity="${shown}">`);
      velocity(svg, 75 + s + dx, 245 + dx, base - s / 2, 'v');
      velocity(svg, 395 - dx, 325 - dx, base - s / 2, '−v');
      svg.add('</g>');
    };
    svg.animated(
      toward,
      [
        [0, 1],
        [0, 1],
        [speed * fade, 0],
        [gap / 2, 0],
        [gap / 2, 0],
      ],
      {
        dur: `${T}s`,
        keyTimes: [0, hold / T, (hold + fade) / T, meet / T, 1],
      }
    );
    svg.text(285, 300, 'Frictionless surface', { size: 22, math: false });
    svg.text(285, 352, '(a)', { size: 22, math: false });
    // (b)
    system(svg, 790, 222, 195, 100, { label: [870, 22], at: 60 });
    svg.text(588, 112, 'After', { size: 24, math: false, anchor: 'start' });
    svg.text(700, 76, '\\rm{KE′}_{int} = 0', { size: 25 });
    svg.text(770, 142, 'p′_1 + p′_2 = 0', { size: 25 });
    surface(svg, 610, 960, base);
    block(svg, 690 + s, base, s, 'm');
    block(svg, 690, base, s, 'm');
    svg.text(925, base - s / 2, 'v = 0', { size: 25 });
    svg.text(790, 300, 'Frictionless surface', { size: 22, math: false });
    svg.text(790, 352, '(b)', { size: 22, math: false });
    return svg.render();
  },

  // 8.5 — Example 2: a spring between two gliders on an air track
  Figure_08_05_03: () => {
    const svg = new Svg({
      width: 1000,
      height: 810,
      title: 'Two gliders on an air track pushed apart by a spring',
      desc: 'Before: on a frictionless air track, glider m1, carrying a compressed spring, moves right with velocity v1 = 2.00 m/s toward glider m2, which moves left with v2 = −0.500 m/s. Net F = 0 and p1 + p2 = ptot. After: the spring has uncoiled, m1 moves left with v1′ = −4.00 m/s, and m2 moves right with v2′ = 3.70 m/s; p1′ + p2′ = ptot and KE′int > KEint. The velocity arrows are drawn to scale. Each panel is circled as the system of interest.',
    });
    const unit = 45; // pixels per m/s
    // Animation: the Before gliders close until the spring touches m2; the
    // After gliders leave that contact, the spring uncoiling against m2 until
    // it reaches full length, and stop where they are drawn.
    const speed = 30; // pixels per second per m/s
    const before = [95, 555];
    const after = [185, 560];
    const [short, long] = [110, 200]; // spring length, compressed and uncoiled
    const tIn = (before[1] - before[0] - 150 - short) / (2.5 * speed);
    const tOut = (after[1] - after[0] - 150 - short) / (7.7 * speed);
    const tFull = (long - short) / (7.7 * speed);
    const [hold, T] = [0.6, 5.5];
    const dur = `${T}s`;
    const moveIn = t => [before[0] + 2 * speed * t, before[1] - 0.5 * speed * t, short];
    const moveOut = t => {
      const x1 = after[0] + 4 * speed * (tOut - t);
      const x2 = after[1] - 3.7 * speed * (tOut - t);
      return [x1, x2, Math.min(x2 - x1 - 150, long)];
    };
    const pair = (base, isAfter, [x1, x2, length]) => {
      glider(svg, x1, base, 'm_1');
      glider(svg, x2, base, 'm_2');
      svg.spring(x1 + 150, x1 + 150 + length, base - 34);
      const vy = base - 80;
      const [v1, v2] = isAfter ? [-4, 3.7] : [2, -0.5];
      velocity(svg, x1 + 75, x1 + 75 + v1 * unit, vy, isAfter ? 'v′_1' : 'v_1');
      velocity(svg, x2 + 75, x2 + 75 + v2 * unit, vy, isAfter ? 'v′_2' : 'v_2');
    };
    const panel = (y0, isAfter) => {
      const [cx, cy, rx, ry] = [440, y0 + 195, 370, 145];
      system(svg, cx, cy, rx, ry, { label: [820, y0 + 22], at: 35 });
      svg.text(160, y0 + 22, isAfter ? 'After' : 'Before', { size: 24, math: false });
      svg.text(440, y0 + 98, isAfter ? 'p′_1 + p′_2 = p_{tot}' : 'p_1 + p_2 = p_{tot}', {
        size: 26,
      });
      const base = y0 + 225;
      track(svg, 60, 800, base);
      const draw = f => pair(base, isAfter, f);
      if (isAfter) {
        const contact = moveOut(0);
        const end = moveOut(tOut);
        svg.animated(draw, [contact, contact, moveOut(tFull), end, end], {
          still: 3,
          dur,
          keyTimes: [0, (hold + tIn) / T, (hold + tIn + tFull) / T, (hold + tIn + tOut) / T, 1],
        });
      } else {
        const start = moveIn(0);
        const contact = moveIn(tIn);
        svg.animated(draw, [start, start, contact, contact], {
          dur,
          keyTimes: [0, hold / T, (hold + tIn) / T, 1],
        });
      }
      svg.text(700, base + 75, 'Frictionless surface', { size: 22, math: false });
      svg.squiggle(610, base + 66, 470, base + 4);
      return base;
    };
    panel(0, false);
    svg.text(400, 22, 'net **F** = 0', { size: 24, math: false });
    const base = panel(410, true);
    svg.text(440, 432, '\\rm{KE′}_{int} > \\rm{KE}_{int}', { size: 25 });
    svg.text(110, base + 75, 'Uncoiled spring', { size: 22, math: false });
    svg.squiggle(190, base + 60, 420, base - 14, { waves: 1 });
    return svg.render();
  },

  // 8.6 — a two-dimensional collision in the laboratory frame
  Figure_08_06_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 600,
      title: 'A two-dimensional collision',
      desc: 'Before: mass m1 moves along the x axis with velocity v1 toward m2, which is at rest (v2 = 0), so p1 = ptot; net F = 0. After: m1 moves off with velocity v1′ at angle θ1 above the x axis and m2 moves off with velocity v2′ at angle θ2 below it, so p1′ + p2′ = ptot. The system of interest is circled before and after the collision. An x–y axis indicator shows x to the right and y up.',
    });
    const O = [418, 300];
    const r = 34;
    const guide = { color: BLACK, width: 2, dash: '7 5' };
    // System outlines: an ellipse before, a stadium after.
    svg.ellipse(235, 300, 225, 130, { stroke: BLACK, width: 2 });
    svg.rect(470, 25, 270, 530, { stroke: BLACK, width: 2, rx: 135 });
    svg.line(O[0] - 92, O[1], 770, O[1], guide);

    const along = (deg, d) => [O[0] + d * Math.cos(rad(deg)), O[1] - d * Math.sin(rad(deg))];
    svg.line(...O, ...along(32, 250 - r), guide);
    svg.line(...O, ...along(-26, 250 - r), guide);
    svg.still(() => {
      const leg = (deg, d, color, ghost, label) => {
        mass(svg, ...along(deg, d - 70), '', { r, color: ghost });
        mass(svg, ...along(deg, d - 35), '', { r, color: ghost });
        mass(svg, ...along(deg, d), label, { r, color });
        const tip = along(deg, d + 105);
        svg.arrow(...along(deg, d + r + 4), ...tip, { color: VEL, width: 4, head: 18 });
        return tip;
      };
      const t1 = leg(32, 250, PURPLE, GHOST, 'm_1');
      const t2 = leg(-26, 250, ORANGE, GHOST_ORANGE, 'm_2');
      svg.text(t1[0] - 50, t1[1] - 18, '**v′**_1', { size: 26 });
      svg.text(t2[0] + 10, t2[1] - 12, '**v′**_2', { size: 26, anchor: 'start' });
      mass(svg, 55, O[1], '', { r, color: GHOST });
      mass(svg, 90, O[1], '', { r, color: GHOST });
      mass(svg, 125, O[1], 'm_1', { r });
      svg.arrow(125 + r + 4, O[1], 320, O[1], { color: VEL, width: 4, head: 18 });
      svg.text(245, O[1] - 30, '**v**_1', { size: 26 });
      mass(svg, ...O, 'm_2', { r, color: ORANGE });
    });

    // Animation: m1 comes in along the axis until it touches m2, then both
    // leave and reach the places the still draws them at the same time. The
    // masses are point-like in the drawing, so m1 leaves from its contact
    // point at about 25° and meets the θ1 line where it is drawn. The speeds
    // conserve momentum along both axes for m2 ≈ 1.2 m1 (the figure leaves the
    // masses unstated), so m1 comes in about twice as fast as either leaves.
    const start = [125, O[1]];
    const contact = [O[0] - 2 * r, O[1]];
    const end1 = along(32, 250);
    const end2 = along(-26, 250);
    const tOut = 3;
    const out1 = [end1[0] - contact[0], end1[1] - contact[1]];
    const v1Out = Math.hypot(...out1) / tOut;
    const v2Out = 250 / tOut;
    const away = Math.atan2(-out1[1], out1[0]);
    const m2PerM1 = (v1Out * Math.sin(away)) / (v2Out * Math.sin(rad(26)));
    const v1In = v1Out * Math.cos(away) + m2PerM1 * v2Out * Math.cos(rad(26));
    const tIn = (contact[0] - start[0]) / v1In;
    const [hold, T] = [0.6, 6];
    const dir1 = [Math.cos(away), -Math.sin(away)];
    const dir2 = [Math.cos(rad(-26)), -Math.sin(rad(-26))];
    const ray = (p, u, d) => [p[0] + u[0] * d, p[1] + u[1] * d];
    const lerp = (p, q, s) => [p[0] + (q[0] - p[0]) * s, p[1] + (q[1] - p[1]) * s];
    const scene = ([p1, p2, shownIn, shownOut]) => {
      svg.add(`<g opacity="${shownIn}">`);
      svg.arrow(p1[0] + r + 4, p1[1], p1[0] + 195, p1[1], { color: VEL, width: 4, head: 18 });
      svg.text(p1[0] + 120, p1[1] - 30, '**v**_1', { size: 26 });
      svg.add(`</g><g opacity="${shownOut}">`);
      const t1 = ray(p1, dir1, 105);
      const t2 = ray(p2, dir2, 105);
      svg.arrow(...ray(p1, dir1, r + 4), ...t1, { color: VEL, width: 4, head: 18 });
      svg.arrow(...ray(p2, dir2, r + 4), ...t2, { color: VEL, width: 4, head: 18 });
      svg.text(t1[0] - 50, t1[1] - 18, '**v′**_1', { size: 26 });
      svg.text(t2[0] + 10, t2[1] - 12, '**v′**_2', { size: 26, anchor: 'start' });
      svg.add('</g>');
      mass(svg, ...p1, 'm_1', { r });
      mass(svg, ...p2, 'm_2', { r, color: ORANGE });
    };
    // The incoming arrow fades as its head nears m2; the outgoing ones appear
    // just after contact.
    const fadeFrom = (150 - start[0]) / v1In;
    const fadeTo = (190 - start[0]) / v1In;
    const inAt = t => [lerp(start, contact, t / tIn), O];
    const outAt = s => [lerp(contact, end1, s), lerp(O, end2, s)];
    const frames = [
      [...inAt(0), 1, 0],
      [...inAt(0), 1, 0],
      [...inAt(fadeFrom), 1, 0],
      [...inAt(fadeTo), 0, 0],
      [...inAt(tIn), 0, 0],
      [...outAt(0.1 / tOut), 0, 1],
      [...outAt(1), 0, 1],
      [...outAt(1), 0, 1],
    ];
    const times = [0, hold, hold + fadeFrom, hold + fadeTo, hold + tIn, hold + tIn + 0.1];
    times.push(hold + tIn + tOut, T);
    svg.motionGroup(
      morph(
        frames.map(f => svg.capture(() => scene(f))),
        { dur: `${T}s`, keyTimes: times.map(t => t / T) }
      )
    );
    // Angles on top, so the moving masses pass under them.
    svg.arc(...O, 95, 0, 32, { color: BLACK, width: 2 });
    svg.arc(...O, 95, -26, 0, { color: BLACK, width: 2 });
    svg.text(O[0] + 120 * Math.cos(rad(16)), O[1] - 120 * Math.sin(rad(16)), 'θ_1', { size: 26 });
    svg.text(O[0] + 120 * Math.cos(rad(-13)), O[1] - 120 * Math.sin(rad(-13)), 'θ_2', { size: 26 });

    svg.text(235, 212, '**v**_2 = 0', { size: 26 });
    svg.text(235, 380, 'net **F** = 0', { size: 26, math: false });

    svg.text(110, 80, 'Before', { size: 26, math: false });
    svg.text(110, 128, '**p**_1 = **p**_{tot}', { size: 26, math: false });
    svg.text(870, 50, 'After', { size: 26, math: false });
    svg.text(870, 92, '**p′**_1 + **p′**_2 = **p**_{tot}', { size: 26, math: false });
    svg.xyIndicator(295, 125, { len: 100, size: 26 });
    svg.lines(200, 522, ['System of interest', '(before collision)'], { size: 22, math: false });
    svg.squiggle(190, 500, 215, 433, { waves: 1, amp: 6 });
    svg.lines(875, 465, ['System of interest', '(after collision)'], { size: 22, math: false });
    svg.squiggle(850, 442, 765, 380, { waves: 1, amp: 6 });
    return svg.render();
  },
  // 8.6 — Example 1: m1 scatters off an unseen m2 inside a dark room
  Figure_08_06_02: () => {
    const svg = new Svg({
      width: 760,
      height: 770,
      title: 'A collision in a dark room',
      desc: 'Net F = 0. Before: p1 = ptot. After: p1′ + p2′ = ptot. Mass m1 moves to the right with velocity v1 into a dark room, where it strikes m2 = 0.400 kg, initially at rest (v2 = 0). Mass m1 leaves through the top of the room with velocity v1′ at θ1 = 45° above its incoming direction. The final velocity v2′ and angle θ2 of m2 are unknown. An x–y axis indicator shows x to the right and y up.',
    });
    svg.text(380, 28, 'net **F** = 0', { size: 26, math: false });
    svg.text(210, 98, 'Before', { size: 26, math: false });
    svg.text(210, 136, '**p**_1 = **p**_{tot}', { size: 26, math: false });
    svg.text(510, 98, 'After', { size: 26, math: false });
    svg.text(510, 136, '**p′**_1 + **p′**_2 = **p**_{tot}', { size: 26, math: false });
    svg.xyIndicator(65, 305, { len: 120, size: 26 });

    // The room: a light square whose teal walls have gaps where m1 passes.
    const [left, top, side] = [258, 448, 297];
    const right = left + side;
    const bottom = top + side;
    const yIn = 600;
    const hit = [340, yIn];
    const exitX = hit[0] + (yIn - top); // the 45° path crosses the top wall here
    svg.rect(left, top, side, side, { fill: TEAL_LIGHT });
    const wall = { color: TEAL, width: 5, cap: 'square' };
    svg.line(left, top, left, yIn - 40, wall);
    svg.line(left, yIn + 40, left, bottom, wall);
    svg.line(left, bottom, right, bottom, wall);
    svg.line(right, bottom, right, yIn + 40, wall);
    svg.line(right, yIn - 40, right, top, wall);
    svg.line(right, top, exitX + 30, top, wall);
    svg.line(exitX - 40, top, left, top, wall);

    const guide = { color: BLACK, width: 1.5, dash: '6 5' };
    svg.line(hit[0] - 60, yIn, 680, yIn, guide);
    const d = 225;
    const after = [hit[0] + d, yIn - d];
    const r = 38;
    const out = [Math.cos(rad(45)), -Math.sin(rad(45))];
    svg.line(...hit, after[0] - out[0] * r, after[1] - out[1] * r, guide);
    // Measure θ1 just inside the wall, where the outgoing path crosses y = top + 18.
    const vertex = [exitX - 18, top + 18];
    svg.line(...vertex, 680, vertex[1], guide);
    svg.arc(...vertex, 55, 0, 45, { color: BLACK, width: 2 });
    svg.text(exitX + 120, top - 30, 'θ_1 = 45°', { size: 25, anchor: 'start' });

    mass(svg, 72, yIn, 'm_1', { r });
    svg.arrow(72 + r + 4, yIn, hit[0] - 62, yIn, { color: VEL, width: 4, head: 18 });
    svg.text(155, yIn - 26, '**v**_1', { size: 26 });
    mass(svg, ...after, 'm_1', { r });
    svg.arrow(
      after[0] + out[0] * (r + 4),
      after[1] + out[1] * (r + 4),
      after[0] + out[0] * 150,
      after[1] + out[1] * 150,
      {
        color: VEL,
        width: 4,
        head: 18,
      }
    );
    svg.text(after[0] + 66, after[1] - 18, '**v′**_1', { size: 26 });

    svg.text(20, 412, 'm_2 = 0.400 \\rm{kg}    v_2 = 0', { size: 25, anchor: 'start' });
    svg.leader(150, 432, 325, 525, { bend: 0.35 });
    svg.text(left + side / 2, bottom - 50, 'v′_2 = ?    θ_2 = ?', { size: 25 });
    return svg.render();
  },

  // 8.6 — Conceptual Question 3: a small object glances off a massive cube
  Figure_08_06_03: () => {
    const svg = new Svg({
      width: 1010,
      height: 530,
      title: 'A small object scattering from a massive cube',
      desc: 'Before: mass m1 moves to the right with velocity v1 along a horizontal line a distance b, the impact parameter, above the center of a massive cube M2 at rest (v2 = 0). The cube is turned so the face that m1 strikes slopes up at 30°. After: m1 leaves along a line at angle θ1 = ? above its incoming direction with velocity v1′, while the cube stays essentially at rest (v2′ ≈ 0). An x–y axis indicator shows x to the right and y up.',
    });
    // Cube turned α = 30° counterclockwise; m1 strikes its upper-left face.
    const C = [425, 418];
    const s = 82; // half the side
    const alpha = 30;
    const corner = a => [
      C[0] + s * Math.SQRT2 * Math.cos(rad(alpha + a)),
      C[1] - s * Math.SQRT2 * Math.sin(rad(alpha + a)),
    ];
    const b = 0.7 * s;
    // Along the face from its midpoint, the height above C is s cos α + t sin α.
    const t = (b - s * Math.cos(rad(alpha))) / Math.sin(rad(alpha));
    const H = [C[0] + s * Math.cos(rad(alpha + 90)) + t * Math.cos(rad(alpha)), C[1] - b];
    // An elastic bounce off a fixed face at α turns the path through 2α.
    const theta = 2 * alpha;
    const out = [Math.cos(rad(theta)), -Math.sin(rad(theta))];

    const guide = { color: BLACK, width: 1.5, dash: '6 5' };
    svg.line(20, H[1], 1000, H[1], guide);
    svg.line(20, C[1], C[0], C[1], guide);
    svg.polygon([corner(45), corner(135), corner(225), corner(315)], {
      fill: TEAL_LIGHT,
      stroke: TEAL,
      width: 4,
    });
    svg.line(20, C[1], C[0] - 8, C[1], guide);
    svg.circle(...C, 6, { fill: TEAL });
    svg.text(C[0], C[1] - 24, 'M_2', { size: 24, halo: false });

    const r = 36;
    const d = 245;
    const after = [H[0] + out[0] * d, H[1] + out[1] * d];
    svg.line(...H, after[0] - out[0] * r, after[1] - out[1] * r, guide);
    svg.arc(...H, 165, 0, theta, { color: BLACK, width: 2 });
    svg.text(
      H[0] + 185 * Math.cos(rad(theta / 2)),
      H[1] - 185 * Math.sin(rad(theta / 2)),
      'θ_1 = ?',
      {
        size: 24,
        anchor: 'start',
      }
    );

    svg.text(25, 172, 'Before', { size: 25, math: false, anchor: 'start' });
    mass(svg, 50, H[1], 'm_1', { r });
    svg.arrow(50 + r + 4, H[1], 186, H[1], { color: VEL, width: 4, head: 18 });
    svg.text(120, H[1] - 30, '**v**_1', { size: 25 });
    svg.text(268, H[1] - 30, '**v**_2 = 0', { size: 25 });
    svg.arrow(236, H[1] + 4, 236, C[1] - 4, { color: BLACK, width: 1.5, head: 10, start: true });
    svg.line(222, C[1], 250, C[1], { color: BLACK, width: 1.5 });
    svg.line(222, H[1], 250, H[1], { color: BLACK, width: 1.5 });
    svg.text(258, (H[1] + C[1]) / 2, 'b', { size: 25, anchor: 'start' });
    svg.text(C[0] + 115, C[1] - 10, '**v′**_2 ≈ 0', { size: 25, anchor: 'start' });

    svg.text(after[0] - 50, after[1] - 62, 'After', { size: 25, math: false });
    mass(svg, ...after, 'm_1', { r });
    svg.arrow(
      after[0] + out[0] * (r + 4),
      after[1] + out[1] * (r + 4),
      after[0] + out[0] * 120,
      after[1] + out[1] * 120,
      {
        color: VEL,
        width: 4,
        head: 18,
      }
    );
    svg.text(after[0] + 70, after[1] + 10, '**v′**_1', { size: 25, anchor: 'start' });
    svg.xyIndicator(790, 268, { len: 110, size: 25 });
    return svg.render();
  },

  // 8.3 — two-car collision diagram (conservation of momentum)
  Figure_08_03_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 860,
      title: 'Two cars colliding on a frictionless surface',
      desc: 'Before: car m1 (brown) moves right with velocity v1 and momentum p1, catching up to car m2 (tan) moving right more slowly with velocity v2 and momentum p2. The system of interest (both cars) is circled; net F = 0 and p1 + p2 = ptot. After: m1 moves right more slowly with v1′ and p1′, and m2 moves right faster with v2′ and p2′; p1′ + p2′ = ptot.',
    });
    // Car: a simple SUV drawn with polygons.
    const car = (x, y, color, label, vLabel, vx) => {
      const c1 = color === 'brown' ? '#a0532c' : '#d4c4a0';
      const c2 = color === 'brown' ? '#7b3d1f' : '#b39f7a';
      const glass = '#b8d9e8';
      // Roof, windshield and hood distinguish the right-facing SUV.
      svg.polygon(
        [
          [x, y + 22],
          [x + 12, y],
          [x + 95, y],
          [x + 112, y + 25],
          [x + 135, y + 30],
          [x + 140, y + 40],
          [x + 140, y + 60],
          [x, y + 60],
        ],
        { fill: c1, stroke: c2, width: 2 }
      );
      // Windows
      svg.polygon(
        [
          [x + 20, y + 8],
          [x + 45, y + 8],
          [x + 45, y + 35],
          [x + 22, y + 35],
        ],
        { fill: glass, stroke: c2, width: 1.5 }
      );
      svg.polygon(
        [
          [x + 52, y + 8],
          [x + 75, y + 8],
          [x + 73, y + 35],
          [x + 52, y + 35],
        ],
        { fill: glass, stroke: c2, width: 1.5 }
      );
      svg.polygon(
        [
          [x + 82, y + 8],
          [x + 92, y + 8],
          [x + 103, y + 27],
          [x + 82, y + 27],
        ],
        { fill: glass, stroke: c2, width: 1.5 }
      );
      // Wheels
      svg.circle(x + 30, y + 60, 12, { fill: '#333333', stroke: '#000000', width: 2 });
      svg.circle(x + 110, y + 60, 12, { fill: '#333333', stroke: '#000000', width: 2 });
      svg.circle(x + 30, y + 60, 6, { fill: '#bbbbbb' });
      svg.circle(x + 110, y + 60, 6, { fill: '#bbbbbb' });
      svg.rect(x + 130, y + 36, 9, 8, { fill: '#fff0b3', stroke: c2, width: 1 });
      svg.line(x + 128, y + 54, x + 142, y + 54, { color: '#555555', width: 4 });
      // Motion blur
      for (let i = 0; i < 3; i++) {
        svg.line(x - 25 - i * 15, y + 30, x - 10 - i * 15, y + 30, {
          color: c1,
          width: 2,
          opacity: 0.4 - i * 0.1,
        });
      }
      // Label on car
      svg.circle(x + 70, y + 35, 18, { fill: PURPLE, stroke: '#ffffff', width: 2 });
      svg.text(x + 70, y + 35, label, { size: 20, halo: false, color: '#ffffff' });
      // Velocity arrow and label
      svg.arrow(x + 140, y + 30, x + 140 + vx, y + 30, { color: VEL, width: 4, head: 16 });
      svg.text(x + 140 + vx / 2, y + 5, vLabel, { size: 24 });
    };

    // Before panel
    svg.text(80, 75, 'Before', { size: 26, math: false, anchor: 'start' });
    svg.rect(50, 105, 900, 250, { stroke: BLACK, width: 2, rx: 60 });
    svg.text(800, 30, 'System of interest', { size: 22, math: false });
    svg.arrow(800, 48, 800, 105, { color: BLACK, width: 1.5, head: 8 });
    svg.text(500, 135, 'p_1 + p_2 = p_{tot}', { size: 26 });
    svg.text(730, 80, 'net **F** = 0', { size: 24, math: false });
    surface(svg, 50, 950, 340);
    car(120, 260, 'brown', 'm_1', '**v**_1', 90);
    car(450, 260, 'tan', 'm_2', '**v**_2', 60);

    // After panel
    svg.text(80, 530, 'After', { size: 26, math: false, anchor: 'start' });
    svg.rect(50, 560, 900, 250, { stroke: BLACK, width: 2, rx: 60 });
    svg.text(800, 485, 'System of interest', { size: 22, math: false });
    svg.arrow(800, 503, 800, 560, { color: BLACK, width: 1.5, head: 8 });
    svg.text(500, 590, 'p′_1 + p′_2 = p_{tot}', { size: 26 });
    surface(svg, 50, 950, 795);
    car(150, 715, 'brown', 'm_1', '**v′**_1', 70);
    car(480, 715, 'tan', 'm_2', '**v′**_2', 80);
    return svg.render();
  },

  // 8.3 — space probe projectile motion with separation
  Figure_08_03_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 800,
      title: 'Space probe separating in flight',
      desc: 'With no air resistance, gravity bends the trajectory downward. Before separation the probe center of mass lies on the parabola. After separation, two equal-mass fragments lie on opposite sides of their combined center of mass, which continues on the same parabola. Total horizontal momentum remains constant; vertical momentum changes under the downward external force −Mg, with y positive upward.',
    });
    // SVG y increases downward: positive curvature represents downward gravity.
    const yAt = x => 180 + 0.0019 * (x - 500) ** 2;
    const trajectory = [];
    for (let x = 100; x <= 900; x += 5) trajectory.push([x, yAt(x)]);
    svg.add('<g id="cm-trajectory">');
    svg.polyline(trajectory, { color: '#777777', width: 2, dash: '6 4' });
    svg.add('</g>');

    // The intact probe and its two fragments retain the same orientation.
    const angle = (Math.atan(2 * 0.0019 * (260 - 500)) * 180) / Math.PI;
    const fragment = (x, y, front) => {
      svg.add(`<g transform="translate(${x} ${y}) rotate(${angle})">`);
      svg.rect(-27, -16, 54, 32, { fill: '#b5bec4', stroke: '#555555', width: 2 });
      svg.line(-15, -11, -15, 11, { color: '#666666', width: 3 });
      if (front) {
        svg.polygon(
          [
            [27, -16],
            [55, 0],
            [27, 16],
          ],
          { fill: '#3b7ea8', stroke: '#285873' }
        );
      } else {
        svg.polygon(
          [
            [-27, -12],
            [-45, -28],
            [-45, 28],
            [-27, 12],
          ],
          {
            fill: '#3b7ea8',
            stroke: '#285873',
          }
        );
      }
      svg.add('</g>');
    };
    const cmDot = (x, y, id) => {
      svg.add(`<g id="${id}">`);
      svg.circle(x, y, 5, { fill: ORANGE, stroke: '#ffffff', width: 1 });
      svg.text(x + 16, y + 8, 'CM', { size: 22, math: false, anchor: 'start' });
      svg.add('</g>');
    };

    svg.text(140, 70, 'Before separation', { size: 26, math: false, anchor: 'start' });
    svg.ellipse(260, yAt(260), 110, 105, { stroke: BLACK, width: 2 });
    svg.add(`<g id="intact-probe" transform="translate(260 ${yAt(260)}) rotate(${angle})">`);
    svg.rect(-54, -16, 108, 32, { fill: '#b5bec4', stroke: '#555555', width: 2 });
    svg.polygon(
      [
        [54, -16],
        [82, 0],
        [54, 16],
      ],
      { fill: '#3b7ea8', stroke: '#285873' }
    );
    svg.polygon(
      [
        [-54, -12],
        [-72, -28],
        [-72, 28],
        [-54, 12],
      ],
      {
        fill: '#3b7ea8',
        stroke: '#285873',
      }
    );
    svg.line(0, -16, 0, 16, { color: '#555555', width: 2 });
    svg.add('</g>');
    cmDot(260, yAt(260), 'before-cm');
    svg.text(185, 420, 'System of interest', { size: 21, math: false });
    svg.arrow(225, 404, 240, yAt(260) + 105, { color: BLACK, width: 1.5, head: 8 });

    const [cx, cy] = [735, yAt(735)];
    svg.text(620, 70, 'After separation', { size: 26, math: false, anchor: 'start' });
    svg.ellipse(cx, cy, 145, 165, { stroke: TEAL, width: 2 });
    // Equal masses make the combined CM the midpoint, not either fragment.
    const pieces = [
      [cx - 50, cy + 55],
      [cx + 50, cy - 55],
    ];
    svg.line(...pieces[0], ...pieces[1], { color: TEAL, width: 1.5, dash: '4 4' });
    svg.add('<g id="probe-fragments">');
    pieces.forEach(([x, y], i) => {
      fragment(x, y, i === 1);
      svg.circle(x, y, 3, { fill: BLACK });
      svg.text(x - 40, y - 30, 'm', { size: 22 });
    });
    svg.add('</g>');
    cmDot(cx, cy, 'after-cm');
    svg.text(720, 490, 'System: both fragments', { size: 21, math: false });
    svg.arrow(730, 472, 735, cy + 165, { color: TEAL, width: 1.5, head: 8 });

    for (const x of [145, 600]) {
      svg.text(x, 565, 'p_x = constant', { size: 25, anchor: 'start' });
      svg.text(x, 610, 'F_{x,net} = 0', { size: 25, anchor: 'start' });
      svg.text(x, 665, 'p_y ≠ constant', { size: 25, anchor: 'start' });
      svg.text(x, 710, 'F_{y,net} = −Mg ≠ 0', { size: 25, anchor: 'start' });
    }
    svg.arrow(45, 500, 115, 500, { color: BLACK, width: 2, head: 10 });
    svg.arrow(45, 500, 45, 430, { color: BLACK, width: 2, head: 10 });
    svg.text(120, 520, 'x', { size: 21 });
    svg.text(45, 414, 'y', { size: 21 });
    svg.text(
      500,
      770,
      'M = total probe mass; equal-mass fragments shown; air resistance neglected',
      {
        size: 20,
        math: false,
      }
    );
    return svg.render();
  },

  // 8.5 — the puck and goalie in the worked inelastic-collision example
  Figure_08_05_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 900,
      title: 'A goalie catches a hockey puck',
      desc: 'Before: a 0.150-kg puck moves right at 35.0 m/s toward a stationary 70.0-kg goalie on frictionless ice. After catching the puck, the goalie and puck move together to the right at 0.0748 m/s. Total momentum is conserved. Kinetic energy decreases from 91.9 J to 0.196 J, with about 91.7 J converted to thermal energy and sound. Velocity arrows show direction only, not a common scale.',
    });
    const puck = (x, y) => {
      svg.rect(x - 14, y - 5, 28, 10, { fill: '#222222', stroke: '#000000' });
      svg.ellipse(x, y - 5, 14, 4, { fill: '#555555', stroke: '#000000', width: 1 });
    };
    // Crouching goalie, facing left: helmet, mask, catching glove, pads and stick.
    const goalie = (x, base, caught) => {
      const green = '#2d7a4f';
      const edge = '#193e2b';
      svg.polygon(
        [
          [x + 5, base - 125],
          [x + 65, base - 140],
          [x + 105, base - 65],
          [x + 42, base - 45],
          [x - 15, base - 85],
        ],
        { fill: green, stroke: edge, width: 3 }
      );
      svg.line(x + 12, base - 110, x + 78, base - 75, { color: '#ffffff', width: 6 });
      svg.circle(x - 12, base - 125, 26, { fill: green, stroke: edge, width: 3 });
      svg.rect(x - 35, base - 138, 25, 35, { fill: '#dfdfc4', stroke: edge, width: 2, rx: 7 });
      for (const d of [0, 10, 20]) {
        svg.line(x - 34, base - 133 + d, x - 10, base - 133 + d, { color: '#777777', width: 1 });
      }
      svg.polyline(
        [
          [x + 14, base - 94],
          [x - 32, base - 65],
          [x - 84, base - 44],
        ],
        {
          color: edge,
          width: 24,
        }
      );
      svg.ellipse(x - 100, base - 40, 30, 23, { fill: green, stroke: edge, width: 3 });
      svg.rect(x + 15, base - 48, 110, 38, { fill: green, stroke: edge, width: 3, rx: 16 });
      svg.rect(x - 5, base - 30, 125, 27, { fill: '#4a9068', stroke: edge, width: 3, rx: 12 });
      for (const dx of [20, 45, 70, 95]) {
        svg.line(x + dx, base - 43, x + dx + 8, base - 13, { color: '#bbd8c7', width: 2 });
      }
      svg.line(x + 5, base + 1, x + 125, base + 1, { color: BLACK, width: 4 });
      svg.polyline(
        [
          [x - 40, base - 48],
          [x - 150, base + 2],
          [x - 185, base + 2],
        ],
        {
          color: '#a88c51',
          width: 6,
        }
      );
      svg.text(x + 48, base - 99, 'm_2', { size: 24, color: '#ffffff', halo: false });
      if (caught) puck(x - 112, base - 40);
    };
    for (const [base, after] of [
      [350, false],
      [760, true],
    ]) {
      svg.text(70, base - 300, after ? 'After the catch' : 'Before the catch', {
        size: 26,
        math: false,
        anchor: 'start',
      });
      svg.text(790, base - 300, 'System: puck + goalie', { size: 22, math: false });
      svg.rect(60, base - 255, 880, 280, { stroke: BLACK, width: 2, rx: 65 });
      surface(svg, 80, 920, base + 18);
      svg.text(
        500,
        base - 220,
        after ? 'p′_1 + p′_2 = p_{tot}' : 'p_1 = p_{tot};   F_{x,net} = 0',
        { size: 26 }
      );
      svg.text(
        500,
        base - 175,
        after ? '\\rm{KE}′ = 0.196 \\rm{J} < \\rm{KE}' : '\\rm{KE} = ½m_1v_1^2 = 91.9 \\rm{J}',
        { size: 24 }
      );
      goalie(610, base, after);
      svg.text(800, base - 105, 'm_2 = 70.0 \\rm{kg}', { size: 23 });
      if (after) {
        svg.text(340, base - 75, 'Caught puck', { size: 22, math: false });
        svg.arrow(420, base - 65, 484, base - 40, { color: BLACK, width: 1.5, head: 8 });
        velocity(svg, 755, 815, base - 35, 'v′', { size: 24 });
        svg.text(500, base + 68, 'v′_1 = v′_2 = v′ = 0.0748 \\rm{m/s}', { size: 25 });
      } else {
        puck(190, base - 8);
        svg.text(220, base - 95, 'm_1 = 0.150 \\rm{kg}', { size: 23 });
        velocity(svg, 210, 385, base - 8, 'v_1 = 35.0 \\rm{m/s}', { size: 24, dy: -37 });
        svg.text(810, base - 45, 'v_2 = 0', { size: 25 });
        svg.text(500, base + 68, 'Frictionless ice surface', { size: 22, math: false });
      }
    }
    svg.text(500, 874, 'Velocity arrows indicate direction; lengths are not to scale.', {
      size: 21,
      math: false,
    });
    return svg.render();
  },

  // 8.7 — rocket + gas system and the equal-and-opposite internal forces
  Figure_08_07_01: () => {
    const svg = new Svg({
      width: 1100,
      height: 950,
      title: 'Rocket propulsion and Newton’s third law',
      desc: 'At time t, the rocket and fuel have mass m and upward Earth-frame velocity v. At t + Δt, the rocket has mass m − Δm and velocity v + Δv; the expelled gas has mass Δm and Earth-frame velocity v − ve, downward in this example. The net external force on the whole rocket-plus-gas system is −mg. The gas pushes the rocket upward with Freac; the rocket pushes the gas downward with Fexpel of the same magnitude. Rocket and gas weights both point downward. Exhaust speed ve is measured relative to the rocket.',
    });
    svg.add(
      '<defs><radialGradient id="exhaust-08-07-01"><stop offset="0" stop-color="#fff5e6"/><stop offset="0.5" stop-color="#ffcc66"/><stop offset="1" stop-color="#ff8800" stop-opacity="0"/></radialGradient></defs>'
    );
    const rocket = (x, y, label) => {
      svg.ellipse(x, y + 150, 45, 65, { fill: 'url(#exhaust-08-07-01)', stroke: 'none' });
      svg.rect(x - 30, y, 60, 120, { fill: '#c0c0c0', stroke: '#666666', width: 2 });
      svg.polygon(
        [
          [x, y - 40],
          [x - 30, y],
          [x + 30, y],
        ],
        { fill: '#e0e0e0', stroke: '#666666', width: 2 }
      );
      svg.circle(x, y + 30, 12, { fill: '#4a90e2', stroke: '#2a5a8a', width: 2 });
      for (const sign of [-1, 1]) {
        svg.polygon(
          [
            [x + sign * 30, y + 100],
            [x + sign * 55, y + 130],
            [x + sign * 30, y + 120],
          ],
          {
            fill: '#a0a0a0',
            stroke: '#666666',
            width: 2,
          }
        );
      }
      // Put long mass labels beside the body rather than squeezing them into it.
      svg.text(x - 55, y + 65, label, { size: 25, anchor: 'end' });
    };
    svg.text(220, 55, '(a) At time t', { size: 26, math: false });
    svg.text(640, 55, '(b) At time t + Δt', { size: 26, math: false });
    svg.rect(80, 130, 280, 420, { stroke: BLACK, width: 2, rx: 110 });
    svg.rect(470, 115, 350, 435, { stroke: TEAL, width: 2, rx: 100 });
    rocket(220, 220, 'm');
    rocket(630, 185, 'm − Δm');
    svg.arrow(300, 310, 300, 210, { color: VEL, width: 4, head: 16 });
    svg.text(320, 255, '**v**', { size: 26, anchor: 'start' });
    svg.arrow(740, 275, 740, 135, { color: VEL, width: 4, head: 16 });
    svg.text(765, 205, '**v** + Δ**v**', { size: 25, anchor: 'start' });
    svg.circle(630, 465, 30, { fill: '#ffcc66', stroke: ORANGE, width: 2 });
    svg.text(630, 465, 'Δm', { size: 23, halo: false });
    svg.arrow(700, 455, 700, 530, { color: VEL, width: 4, head: 16 });
    svg.text(725, 495, '**v** − **v**_e', { size: 24, anchor: 'start' });
    svg.text(220, 585, 'System: rocket + fuel', { size: 23, math: false });
    svg.text(650, 585, 'System: rocket + expelled gas', { size: 23, math: false });
    svg.lines(950, 245, ['Net external force', 'on the whole system'], {
      size: 21,
      math: false,
      gap: 30,
    });
    svg.arrow(950, 315, 950, 420, { color: COLORS.blue, width: 4, head: 16 });
    svg.text(950, 450, 'F_{y,net} = −mg', { size: 25 });

    svg.text(280, 650, 'Rocket free-body diagram', { size: 24, math: false });
    svg.circle(280, 785, 7, { fill: BLACK });
    svg.add('<g id="rocket-reaction">');
    svg.arrow(280, 785, 280, 685, { color: ORANGE, width: 4, head: 16 });
    svg.text(315, 730, '**F**_{reac}', { size: 25, anchor: 'start' });
    svg.add('</g>');
    svg.arrow(280, 785, 280, 845, { color: COLORS.blue, width: 4, head: 16 });
    svg.text(315, 825, 'w_r = (m − Δm)g', { size: 24, anchor: 'start' });

    svg.text(780, 650, 'Forces on expelled gas', { size: 24, math: false });
    svg.ellipse(780, 740, 40, 20, { fill: '#ffcc66', stroke: ORANGE, width: 2 });
    svg.text(780, 738, 'Δm', { size: 21, halo: false });
    svg.add('<g id="gas-expulsion">');
    svg.arrow(760, 760, 760, 860, { color: ORANGE, width: 4, head: 16 });
    svg.text(735, 815, '**F**_{expel}', { size: 25, anchor: 'end' });
    svg.add('</g>');
    svg.arrow(800, 760, 800, 805, { color: COLORS.blue, width: 4, head: 16 });
    svg.text(825, 790, 'w_g = Δmg', { size: 24, anchor: 'start' });
    svg.text(550, 895, '**F**_{reac} = −**F**_{expel}', { size: 25 });
    svg.text(
      550,
      930,
      'Velocities are relative to Earth; exhaust speed vₑ is relative to the rocket.',
      { size: 19, math: false }
    );
    return svg.render();
  },
};
