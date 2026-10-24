/**
 * Chapter 20: current in a wire, simple circuits, resistivity, the
 * superconducting transition of mercury, AC voltage and power, electrical
 * hazards, and the electrocardiogram.
 *
 * AC curves are V0 sin 2πft and their product with I0 sin 2πft. The mercury
 * graph and the shock-threshold curves follow the points of the original
 * figures, which the text quotes (Tc ≈ 4.2 K; sensation near 1 mA and "can’t
 * let go" near 15 mA at 60 Hz). The ECG is a sum of smooth P, Q, R, S and T
 * pulses repeating at 80 beats per minute, the pace of the original trace.
 *
 * For readers who allow motion, a free electron zigzags along its slow drift,
 * and a cursor runs along the AC voltage curve.
 */
import {
  CELL,
  CURRENT,
  WIRE,
  acSource,
  cable,
  carBattery,
  cell,
  headlight,
  resistor,
  wire,
} from './circuit.js';
import { COLORS, Plot, Svg, fmt, rad, smilAnimate, smilList } from './svg.js';

const POS = '#2a9fae';
const NEG = '#e0245e';
const CHARGE = '#5b8fd1';
const FIELD = '#1f77c8';
const CURVE = COLORS.maroon;
const GREEN = '#5aa832';
const HEART = '#ef8a6a';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 25, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/**
 * A length of wire seen at a slant: a cylinder from x0 to x1 about yc with
 * radius r, shaded top to bottom, with its near cut face at the left and a
 * curved break at the right.
 */
function cylinder(svg, x0, x1, yc, r, { fill = ['#f2f1f4', '#bdb8c4'] } = {}) {
  // IDs depend on geometry, so filtered and full generation produce identical files.
  const id = `cyl20_${x0}_${x1}_${yc}_${r}`;
  svg.add(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fill[1]}"/><stop offset="0.35" stop-color="${fill[0]}"/><stop offset="0.7" stop-color="${fill[0]}"/><stop offset="1" stop-color="${fill[1]}"/></linearGradient></defs>`
  );
  const e = r * 0.35;
  svg.add(
    `<path d="M ${x0} ${yc - r} L ${x1} ${yc - r} A ${e} ${r} 0 0 1 ${x1} ${yc + r} L ${x0} ${yc + r} Z" fill="url(#${id})" stroke="#9a94a3" stroke-width="1.5"/>`
  );
  svg.ellipse(x0, yc, e, r, { fill: '#d9d6de', stroke: '#9a94a3', width: 1.5 });
}

/** Cross-section ring of area A through the cylinder at x. */
function section(svg, x, yc, r, { dash } = {}) {
  svg.add(
    `<ellipse cx="${x}" cy="${yc}" rx="${r * 0.35}" ry="${r}" fill="#ffffff" fill-opacity="0.35" stroke="#9a94a3" stroke-width="1.5"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`
  );
}

/** A labeled round charge. */
function charge(svg, x, y, s, { fill = CHARGE, r = 20, color = '#ffffff' } = {}) {
  svg.circle(x, y, r, { fill, stroke: '#3a5a8a', width: 1 });
  svg.text(x, y, s, { size: r * 1.25, halo: false, color });
}

/** Ring-shaped charge with a sign, as in the original's (+) and (−) markers. */
function ringCharge(svg, x, y, s, color) {
  svg.circle(x, y, 11, { fill: '#ffffff', stroke: color, width: 3.5 });
  svg.text(x, y, s, { size: 14, math: false, weight: 'bold', halo: false });
}

/** Symbol on a straight run of wire, from P to Q. */
function on(svg, draw, P, Q) {
  svg.line(...P, ...Q, { color: '#ffffff', width: 7 });
  draw(P, Q);
}

/** Rectangular loop of wire. */
function box(svg, L, T, R, B) {
  wire(svg, [
    [L, T],
    [R, T],
    [R, B],
    [L, B],
    [L, T],
  ]);
}

/** Curved current arrow clockwise about (cx, cy). */
function arc(svg, cx, cy, r, a1, a2, { color = CURRENT, width = 4 } = {}) {
  const pts = [];
  for (let k = 0; k <= 30; k += 1) {
    const a = rad(a1 + ((a2 - a1) * k) / 30);
    pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
  }
  svg.polyline(pts.slice(0, -3), { color, width });
  svg.arrow(...pts[26], ...pts[30], { color, width, head: 18 });
}

/** Smooth pulse used to build the ECG. */
const bump = (t, t0, w, h) => h * Math.exp(-(((t - t0) / w) ** 2));

/** Lead II voltage (mV) at time t (s), one beat every 0.75 s. */
function ecg(t) {
  const u = ((t % 0.75) + 0.75) % 0.75;
  return (
    bump(u, 0.16, 0.035, 0.2) +
    bump(u, 0.275, 0.008, -0.08) +
    bump(u, 0.31, 0.012, 1.0) +
    bump(u, 0.34, 0.01, -0.33) +
    bump(u, 0.56, 0.06, 0.27)
  );
}

/**
 * Arterial pressure (mm Hg) through one beat, as points of a smooth curve:
 * the diastolic minimum just before the QRS complex reaches the arteries,
 * the systolic peak, and the dicrotic notch.
 */
const PRESSURE = [
  [0, 112],
  [0.08, 98],
  [0.18, 89],
  [0.3, 85],
  [0.42, 83],
  [0.48, 90],
  [0.54, 115],
  [0.61, 125],
  [0.67, 121],
  [0.72, 112],
  [0.76, 113],
  [0.8, 108],
];

export default {
  // 20.1 Fig. 1 — current as a flow of charge through an area
  Figure_20_01_01: () => {
    const svg = new Svg({
      width: 680,
      height: 340,
      title: 'Current is the rate of flow of charge',
      desc: 'Charges q move to the right along a section of wire and pass through a cross-sectional area A. The current is the charge that flows through A per unit time; one ampere is one coulomb through the area each second.',
    });
    note(svg, 340, 28, 'Current = flow of charge', { size: 26 });
    cylinder(svg, 40, 630, 200, 100);
    section(svg, 320, 200, 100);
    for (const [x, y] of [
      [270, 145],
      [140, 175],
      [195, 235],
      [230, 275],
    ]) {
      charge(svg, x, y, 'q');
      svg.arrow(x + 18, y, x + 220, y, { color: WIRE, width: 2, head: 15 });
    }
    svg.leader(470, 72, 344, 140, { bend: 0.3, width: 1.6 });
    lab(svg, 480, 66, 'A', { anchor: 'start' });
    return svg.render();
  },

  // 20.1 Fig. 2 — a battery lighting a headlight, and its schematic
  Figure_20_01_02: () => {
    const svg = new Svg({
      width: 580,
      height: 960,
      title: 'A simple circuit and its schematic',
      desc: '(a) A battery of voltage V lights a headlight through two wires. Conventional current I leaves the positive terminal, goes up through one wire and the headlight, and returns down the other wire to the negative terminal. (b) The schematic of the same circuit: the battery is the pair of parallel red lines, the wires are straight lines, and the load is a zigzag resistor. Current I circulates clockwise, out of the positive terminal and through the load.',
    });
    // (a) The picture.
    const { pos, neg } = carBattery(svg, 110, 300, { s: 0.6 });
    headlight(svg, 400, 92, { s: 0.45 });
    cable(svg, [pos, [pos[0], 77], [400, 77]], { width: 5 });
    cable(svg, [neg, [neg[0], 107], [400, 107]], { width: 5 });
    svg.arrow(174, 210, 174, 146, { color: CURRENT, width: 3, head: 14 });
    lab(svg, 156, 180, 'I', { anchor: 'end' });
    svg.arrow(368, 160, 368, 224, { color: CURRENT, width: 3, head: 14 });
    lab(svg, 386, 194, 'I', { anchor: 'start' });
    note(svg, 480, 180, 'Headlight');
    note(svg, 300, 490, '\\it{V} battery');
    caption(svg, 50, 490, '(a)');
    // (b) The schematic.
    box(svg, 150, 580, 430, 900);
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 70, amp: 11 }), [250, 580], [330, 580]);
    on(svg, (P, Q) => cell(svg, P, Q, { gap: 13, long: 60, short: 30 }), [310, 900], [250, 900]);
    lab(svg, 258, 858, '+');
    lab(svg, 304, 864, '−');
    lab(svg, 280, 944, 'V');
    arc(svg, 290, 740, 105, 235, 125);
    arc(svg, 290, 740, 105, 55, -55);
    lab(svg, 200, 740, 'I', { anchor: 'end' });
    lab(svg, 380, 740, 'I', { anchor: 'start' });
    caption(svg, 50, 944, '(b)');
    return svg.render();
  },

  // 20.1 Fig. 3 — positive and negative carriers, the same conventional current
  Figure_20_01_03: () => {
    const svg = new Svg({
      width: 640,
      height: 620,
      title: 'Positive and negative charges give the same conventional current',
      desc: '(a) Positive charges move to the right, in the direction of the electric field E, through a cross-sectional area A of a wire; the conventional current I is also to the right. (b) Negative charges move to the left, opposite the field, through the area A; the conventional current I is still to the right, in the direction of the field.',
    });
    for (const [y0, s, cap] of [
      [40, 1, '(a)'],
      [340, -1, '(b)'],
    ]) {
      const yc = y0 + 130;
      cylinder(svg, 70, 560, yc, 85);
      section(svg, 300, yc, 85);
      const pts = [
        [140, yc - 50],
        [430, yc - 50],
        [500, yc + 2],
        [180, yc + 52],
        [370, yc + 52],
      ];
      for (const [x, y] of pts) {
        ringCharge(svg, x, y, s > 0 ? '+' : '−', s > 0 ? POS : NEG);
        if (s > 0) svg.arrow(x + 14, y, x + 90, y, { color: WIRE, width: 2, head: 13 });
        else svg.arrow(x - 14, y, x - 90, y, { color: WIRE, width: 2, head: 13 });
      }
      svg.arrow(240, y0 + 10, 330, y0 + 10, { color: CURRENT, width: 3.5, head: 15 });
      lab(svg, 222, y0 + 10, 'I', { anchor: 'end' });
      svg.arrow(350, yc + 120, 440, yc + 120, { color: FIELD, width: 3.5, head: 15 });
      lab(svg, 332, yc + 120, '**E**', { anchor: 'end' });
      svg.leader(460, y0 + 12, 308, yc - 50, { bend: 0.3, width: 1.5 });
      lab(svg, 470, y0 + 8, 'A', { anchor: 'start' });
      caption(svg, 34, yc + 110, cap);
    }
    return svg.render();
  },

  // 20.1 Fig. 4 — as one electron is pushed in, another leaves
  Figure_20_01_04: () => {
    const svg = new Svg({
      width: 680,
      height: 280,
      title: 'Electrons entering and leaving a length of wire',
      desc: 'A length of wire holds free electrons. Two electrons are being pushed in at the left end, each with a faded trail and an arrow to the right, and at the same moment two electrons leave at the right end, also moving right. The other electrons inside stay spread out, because their mutual repulsion lets the number in the wire change hardly at all.',
    });
    cylinder(svg, 70, 600, 140, 105);
    const electron = (x, y, { moving = false } = {}) => {
      if (moving)
        for (const [dx, op] of [
          [-26, 0.25],
          [-13, 0.5],
        ])
          svg.add(
            `<circle cx="${x + dx}" cy="${y}" r="17" fill="${NEG}" fill-opacity="${op}" stroke="${NEG}" stroke-opacity="${op}"/>`
          );
      charge(svg, x, y, 'e^−', { fill: NEG, r: 17 });
      if (moving) svg.arrow(x + 20, y, x + 84, y, { color: WIRE, width: 2, head: 13 });
    };
    // Entering at the left, leaving at the right.
    electron(70, 92, { moving: true });
    electron(110, 196, { moving: true });
    electron(560, 86, { moving: true });
    electron(585, 186, { moving: true });
    for (const [x, y] of [
      [300, 60],
      [380, 104],
      [220, 140],
      [400, 172],
      [290, 214],
      [480, 226],
      [500, 120],
    ])
      electron(x, y);
    return svg.render();
  },

  // 20.1 Fig. 4 — the zigzag path of a free electron and its drift
  Figure_20_01_05: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'The path of a free electron in a conductor',
      desc: 'A free electron e⁻ in a wire moves along a random zigzag path, changing direction at each collision with other electrons and atoms. Its average velocity, the drift velocity v_d, is to the right, opposite the electric field E, which points left. The conventional current I is in the direction of E.',
    });
    cylinder(svg, 40, 640, 170, 110);
    // One electron's path: straight flights between collisions in random
    // directions, with a net drift to the right.
    const pts = [
      [95, 210],
      [160, 110],
      [215, 245],
      [140, 160],
      [265, 140],
      [300, 255],
      [245, 210],
      [360, 95],
      [395, 230],
      [330, 175],
      [450, 140],
      [420, 255],
      [520, 90],
      [560, 215],
      [490, 180],
      [600, 130],
    ];
    for (let k = 0; k < pts.length - 1; k += 1) {
      svg.arrow(...pts[k], ...pts[k + 1], { color: WIRE, width: 1.6, head: 10 });
    }
    svg.still(() => charge(svg, ...pts[0], 'e^−', { fill: '#a98bd0', r: 17 }));
    // For readers who allow motion, the electron races along its zigzag at a
    // steady speed while a marker on the wire advances at the drift velocity,
    // the electron's average progress: far slower than the electron itself.
    const along = [0];
    for (let k = 1; k < pts.length; k += 1)
      along.push(along[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
    const [hold, run, rest, fade] = [0.5, 6, 1, 0.4];
    const T = hold + run + rest + fade;
    const dur = `${fmt(T)}s`;
    const keyTimes = [
      0,
      ...along.map(d => (hold + (run * d) / along.at(-1)) / T),
      (T - fade) / T,
      1,
    ];
    const hold3 = v => [v[0], ...v, v.at(-1), v.at(-1)];
    const xs = hold3(pts.map(p => p[0]));
    const ys = hold3(pts.map(p => p[1]));
    const electron = svg.capture(() => charge(svg, 0, 0, 'e^−', { fill: '#a98bd0', r: 17 }));
    const moves = xs.map((x, k) => `${fmt(x)} ${fmt(ys[k])}`).join(';');
    const ends = [0, hold / T, (hold + run) / T, (T - fade) / T, 1];
    const [d0, d1] = [pts[0][0], pts.at(-1)[0]];
    const drift = `<g>${smilAnimate('opacity', [1, 1, 1, 1, 0], { dur, keyTimes: ends })}<line x1="${d0}" y1="66" x2="${d0}" y2="284" stroke="${GREEN}" stroke-width="2" stroke-dasharray="6 5">${smilAnimate('x1', [d0, d0, d1, d1, d1], { dur, keyTimes: ends })}${smilAnimate('x2', [d0, d0, d1, d1, d1], { dur, keyTimes: ends })}</line></g>`;
    svg.motionGroup(
      `${drift}<g><animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" calcMode="linear" keyTimes="${smilList(keyTimes)}" values="${moves}"/>${smilAnimate('opacity', [1, 1, 0], { dur, keyTimes: [0, (T - fade) / T, 1] })}${electron}</g>`
    );
    svg.arrow(300, 30, 380, 30, { color: GREEN, width: 3.5, head: 15 });
    lab(svg, 340, 12, '**v**_d');
    svg.arrow(420, 315, 260, 315, { color: FIELD, width: 3.5, head: 15 });
    lab(svg, 340, 338, '**E**', { size: 20 });
    svg.arrow(420, 362, 260, 362, { color: CURRENT, width: 2, head: 12 });
    lab(svg, 440, 362, 'I', { anchor: 'start', size: 20 });
    return svg.render();
  },

  // 20.1 Fig. 5 — the charges in a length x = v_d t leave in time t
  Figure_20_01_06: () => {
    const svg = new Svg({
      width: 660,
      height: 340,
      title: 'Charges in a volume Ax of wire',
      desc: 'Charges q drift to the right with drift velocity v_d through a wire of cross-sectional area A. All the charges in the shaded volume Ax, between the cross section at the left and the dashed cross section a distance x = v_d t to its right, pass through the right-hand cross section in time t.',
    });
    cylinder(svg, 30, 640, 200, 115);
    svg.add('<rect x="160" y="85" width="250" height="230" fill="#c9cbe6" fill-opacity="0.45"/>');
    section(svg, 160, 200, 115);
    section(svg, 410, 200, 115, { dash: '7 5' });
    for (const [x, y] of [
      [240, 115],
      [275, 160],
      [180, 175],
      [195, 265],
      [280, 295],
      [330, 300],
      [380, 290],
    ]) {
      charge(svg, x, y, 'q');
    }
    charge(svg, 355, 215, 'q');
    svg.arrow(375, 215, 470, 215, { color: GREEN, width: 4, head: 17 });
    lab(svg, 480, 215, 'v_d', { anchor: 'start' });
    svg.arrow(162, 52, 408, 52, { color: WIRE, width: 1.8, head: 13, start: true });
    for (const x of [160, 410]) svg.line(x, 36, x, 68, { color: WIRE, width: 1.6 });
    lab(svg, 285, 34, 'x = v_dt');
    svg.leader(64, 50, 150, 160, { bend: -0.3, width: 1.5 });
    lab(svg, 48, 40, 'A');
    svg.leader(520, 40, 300, 150, { bend: 0.3, width: 1.5 });
    note(svg, 530, 34, 'volume = \\it{Ax}', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 20.1 problem — the SPEAR storage ring
  Figure_20_01_08: () => {
    const svg = new Svg({
      width: 660,
      height: 320,
      title: 'Electrons circulating in the SPEAR storage ring',
      desc: 'A doughnut-shaped storage ring 72 m in diameter, its tube marked by dashed cross sections of area A. Electrons, drawn as small spheres, circulate around the ring; the current I = 20 A points opposite to their motion.',
    });
    // Torus seen from above at a slant: the ring's plane is squashed by k.
    const [cx, cy, R, rho, k, cv] = [330, 150, 255, 46, 1 / 3, 0.94];
    const at = (t, s = 0, rr = rho) => [
      cx + R * Math.cos(t) + rr * Math.cos(s) * Math.cos(t),
      cy + R * k * Math.sin(t) + rr * Math.cos(s) * k * Math.sin(t) - rr * Math.sin(s) * cv,
    ];
    const deg = d => (d * Math.PI) / 180;
    const [ox, oy, ix, iy] = [R + rho, R * k + rho * cv, R - rho, R * k - rho * cv];
    svg.add(
      '<defs><linearGradient id="ring20" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3dde4"/><stop offset="1" stop-color="#8ea4b2"/></linearGradient></defs>'
    );
    svg.add(
      `<path d="M ${cx - ox} ${cy} a ${ox} ${oy} 0 1 0 ${2 * ox} 0 a ${ox} ${oy} 0 1 0 ${-2 * ox} 0 Z M ${cx - ix} ${cy} a ${ix} ${iy} 0 1 0 ${2 * ix} 0 a ${ix} ${iy} 0 1 0 ${-2 * ix} 0 Z" fill="url(#ring20)" fill-rule="evenodd" stroke="#4f6472" stroke-width="1.5"/>`
    );
    for (let t = 0; t < 360; t += 15) {
      const pts = [];
      for (let s = 0; s <= 360; s += 10) pts.push(at(deg(t), deg(s)));
      svg.polyline(pts, { color: COLORS.black, width: 1.2, dash: '5 4' });
    }
    // 72 m between the tube's center lines at the far left and right.
    const [L, Rt] = [at(Math.PI, 0, 0), at(0, 0, 0)];
    svg.arrow(L[0] + 1, cy - 12, Rt[0] - 1, cy - 12, {
      color: WIRE,
      width: 1.6,
      head: 13,
      start: true,
    });
    for (const x of [L[0], Rt[0]]) svg.line(x, cy - 30, x, cy + 6, { color: WIRE, width: 1.6 });
    lab(svg, cx, cy - 32, '72 \\rm{m}');
    // Electrons on the near side move left; the current points the other way.
    for (const t of [118, 128, 138, 148, 158]) {
      const [x, y] = at(deg(t), deg(-20), rho * 0.5);
      svg.circle(x, y, 9, { fill: '#b79ad6', stroke: '#6d4b93', width: 1.2 });
    }
    const e1 = at(deg(122), deg(-75), rho * 0.6);
    const e2 = at(deg(146), deg(-75), rho * 0.6);
    svg.arrow(...e1, ...e2, { color: WIRE, width: 1.8, head: 12 });
    lab(svg, (e1[0] + e2[0]) / 2 + 4, (e1[1] + e2[1]) / 2 + 20, 'e^−', { size: 22 });
    const i1 = at(deg(64), deg(-10), rho * 0.4);
    const i2 = at(deg(46), deg(-10), rho * 0.4);
    svg.arrow(...i1, ...i2, { color: CURRENT, width: 3.5, head: 15 });
    lab(svg, i2[0] - 10, i2[1] - 30, 'I = 20 \\rm{A}', { size: 24 });
    svg.squiggle(560, 296, ...at(deg(40), deg(-60), rho * 0.9), { amp: 5 });
    lab(svg, 570, 296, '\\rm{Area} A', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 20.2 Fig. 1 — a battery driving a resistor
  Figure_20_02_01: () => {
    const svg = new Svg({
      width: 560,
      height: 400,
      title: 'A simple electric circuit',
      desc: 'A battery of voltage V, shown as two parallel red lines with its positive terminal on top, is connected by wires to a resistor R. Current I flows clockwise, out of the positive terminal, through R and back to the negative terminal.',
    });
    const L = 140;
    const T = 50;
    const R = 420;
    const B = 360;
    box(svg, L, T, R, B);
    on(svg, (P, Q) => cell(svg, P, Q, { gap: 22, long: 110, short: 64 }), [L, 225], [L, 175]);
    lab(svg, 470, 60, 'I = ', { anchor: 'end', size: 28 });
    lab(svg, 492, 40, 'V', { size: 28 });
    svg.line(476, 62, 508, 62, { color: COLORS.text, width: 1.8 });
    lab(svg, 492, 86, 'R', { size: 28 });
    lab(svg, L - 46, 155, '+', { size: 26 });
    lab(svg, L - 30, 240, '−', { size: 26 });
    lab(svg, L - 60, 205, 'V', { anchor: 'end', size: 28 });
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 90, amp: 14 }), [R, 150], [R, 270]);
    lab(svg, R + 26, 210, 'R', { anchor: 'start', size: 28 });
    arc(svg, 280, 190, 110, 150, 30);
    lab(svg, 290, 118, 'I', { size: 28 });
    return svg.render();
  },

  // 20.2 Fig. 2 — a voltmeter across the resistor
  Figure_20_02_02: () => {
    const svg = new Svg({
      width: 680,
      height: 380,
      title: 'The voltage across the resistor equals the battery voltage',
      desc: 'A battery drives current I = V/R clockwise through a resistor R. A voltmeter connected across the resistor reads the voltage drop V = IR = 18 V, which equals the battery’s output voltage.',
    });
    const L = 170;
    const T = 40;
    const R = 400;
    const B = 300;
    box(svg, L, T, R, B);
    on(svg, (P, Q) => cell(svg, P, Q, { gap: 14, long: 60, short: 34 }), [L, 150], [L, 110]);
    lab(svg, L - 40, 96, '+', { size: 24 });
    lab(svg, L - 30, 166, '−', { size: 24 });
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 70, amp: 12 }), [R, 85], [R, 175]);
    lab(svg, R + 20, 130, 'R', { anchor: 'start', size: 24 });
    arc(svg, 290, 140, 80, 140, 40);
    wire(svg, [
      [R, 70],
      [620, 70],
      [620, 150],
    ]);
    wire(svg, [
      [R, 190],
      [470, 190],
      [470, 262],
      [560, 262],
      [560, 230],
    ]);
    svg.rect(500, 150, 160, 80, { fill: '#dbe6f2', stroke: '#5f7a99', width: 1.8 });
    svg.rect(545, 162, 70, 34, { fill: '#ffffff', stroke: '#444444', width: 1.4 });
    svg.line(560, 190, 600, 172, { color: COLORS.black, width: 1.5 });
    note(svg, 580, 214, 'Voltmeter', { size: 18 });
    lab(svg, R + 16, 58, '+', { anchor: 'start', size: 22 });
    lab(svg, R + 16, 204, '−', { anchor: 'start', size: 22 });
    lab(svg, 40, 60, 'I = ', { size: 26 });
    lab(svg, 90, 43, 'V', { size: 26 });
    svg.line(75, 63, 105, 63, { color: COLORS.text, width: 1.6 });
    lab(svg, 90, 83, 'R', { size: 26 });
    lab(svg, 285, 350, 'V = IR = 18 \\rm{V}', { size: 24 });
    return svg.render();
  },

  // 20.3 Fig. 1 — resistance of a uniform cylinder
  Figure_20_03_01: () => {
    const svg = new Svg({
      width: 680,
      height: 320,
      title: 'Resistance of a uniform cylinder',
      desc: 'A uniform cylinder of length L, cross-sectional area A and resistivity ρ is equivalent to a resistor R = ρL/A. The longer the cylinder, the greater its resistance; the larger its area, the smaller its resistance.',
    });
    cylinder(svg, 90, 520, 170, 65, { fill: ['#d9ecfb', '#3b78c2'] });
    svg.ellipse(90, 170, 23, 65, { fill: '#e8f3fc', stroke: '#2e64a6', width: 2 });
    svg.add(
      '<ellipse cx="520" cy="170" rx="23" ry="65" fill="none" stroke="#2e64a6" stroke-width="1.6" stroke-dasharray="6 5"/>'
    );
    lab(svg, 300, 172, 'ρ = \\rm{resistivity}', { size: 26 });
    svg.arrow(92, 72, 518, 72, { color: WIRE, width: 1.8, head: 14, start: true });
    for (const x of [90, 520]) svg.line(x, 56, x, 104, { color: WIRE, width: 1.6 });
    lab(svg, 300, 54, 'L = \\rm{length}', { size: 26 });
    lab(svg, 20, 36, 'A = \\rm{area}', { anchor: 'start', size: 26 });
    svg.leader(50, 54, 90, 150, { bend: -0.3, width: 1.6 });
    svg.text(560, 172, '=', { size: 32, math: false });
    wire(svg, [
      [580, 170],
      [670, 170],
    ]);
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 56, amp: 14 }), [590, 170], [660, 170]);
    lab(svg, 625, 214, 'R', { size: 26 });
    lab(svg, 300, 270, 'R = ρ', { anchor: 'end', size: 28 });
    lab(svg, 322, 250, 'L', { size: 28 });
    svg.line(306, 272, 338, 272, { color: COLORS.text, width: 1.8 });
    lab(svg, 322, 296, 'A', { size: 28 });
    return svg.render();
  },

  // 20.3 Fig. 2 — superconducting transition of mercury
  Figure_20_03_02: () => {
    const svg = new Svg({
      width: 600,
      height: 540,
      title: 'Resistance of mercury near its superconducting transition',
      desc: 'Resistance R in ohms of a mercury sample versus temperature T from 4.0 to 4.4 K. Below the critical temperature Tc of about 4.2 K the resistance is zero: mercury is a superconductor. At Tc the resistance jumps, shown dashed, to about 0.11 Ω, and above it rises nearly linearly with temperature, to about 0.135 Ω at 4.37 K. Dots mark measured points.',
    });
    const g = new Plot(svg, {
      x: 140,
      y: 30,
      w: 380,
      h: 400,
      xRange: [4.0, 4.45],
      yRange: [0, 0.165],
      xTicks: [4.0, 4.1, 4.2, 4.3, 4.4],
      yTicks: [0, 0.025, 0.05, 0.075, 0.1, 0.125, 0.15],
      xFormat: v => v.toFixed(1),
      yFormat: v => (v ? v.toFixed(3) : '0'),
    });
    g.axes({
      arrows: true,
      size: 22,
      xTitle: 'T (K)',
      yTitle: 'R (Ω)',
      yTitleOffset: 96,
      titleSize: 24,
      xTitleOffset: 54,
    });
    const Tc = 4.2;
    g.line(4.0, 0, Tc, 0, { color: CURVE, width: 4 });
    svg.line(g.X(Tc), g.Y(0), g.X(4.21), g.Y(0.108), {
      color: COLORS.black,
      width: 4,
      dash: '5 5',
    });
    g.fn(T => 0.108 + (T - 4.21) * 0.155, 4.21, 4.39, { color: CURVE, width: 4 });
    for (const [T, R] of [
      [4.14, 0],
      [4.235, 0.1118],
      [4.31, 0.1235],
      [4.365, 0.132],
    ]) {
      svg.circle(...g.P(T, R), 6, { fill: COLORS.black });
    }
    lab(svg, g.X(4.1), g.Y(0.13), '\\rm{Hg}', { size: 26 });
    svg.leader(g.X(4.13), g.Y(0.03), g.X(Tc) - 4, g.Y(0.003), { bend: 0.4, width: 1.5 });
    lab(svg, g.X(4.12), g.Y(0.036), 'T_c', { anchor: 'end' });
    return svg.render();
  },

  // 20.3 question — resistance along a bar and across it
  Figure_20_03_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 380,
      title: 'Current along a bar and across it',
      desc: '(a) A battery of voltage V drives current I along the length of a rectangular bar, which has resistance R along that path. (b) The same battery drives current I′ across the width of the same bar, along a much shorter path of larger cross section. The resistance R′ and current I′ for that path are to be found.',
    });
    const TOP = '#e4e8ee';
    const FRONT = '#b9c0ca';
    const END = '#8d96a3';
    // Bar with its top-back-left corner at (x, y): length l, depth offset (d, dd), height h.
    const bar = (x, y, l, d, dd, h) => {
      const edge = { stroke: '#5d6673', width: 1.4 };
      svg.polygon(
        [
          [x, y],
          [x + l, y],
          [x + l + d, y + dd],
          [x + d, y + dd],
        ],
        { fill: TOP, ...edge }
      );
      svg.polygon(
        [
          [x + d, y + dd],
          [x + l + d, y + dd],
          [x + l + d, y + dd + h],
          [x + d, y + dd + h],
        ],
        { fill: FRONT, ...edge }
      );
      svg.polygon(
        [
          [x, y],
          [x + d, y + dd],
          [x + d, y + dd + h],
          [x, y + h],
        ],
        { fill: END, ...edge }
      );
    };
    const flow = (d, arrows) => {
      svg.path(d, { color: CURRENT, width: 3 });
      for (const [x1, y1, x2, y2] of arrows)
        svg.arrow(x1, y1, x2, y2, { color: CURRENT, width: 3, head: 18 });
    };
    const battery = x => {
      // Long (positive) plate on the left, as in both panels.
      svg.rect(x - 4, 195, 9, 140, { fill: CELL });
      svg.rect(x + 31, 230, 9, 60, { fill: CELL });
      note(svg, x - 22, 254, '+', { size: 28 });
      note(svg, x + 56, 254, '−', { size: 28 });
      lab(svg, x + 18, 360, 'V', { size: 28 });
    };
    // (a) along the length
    bar(65, 95, 280, 30, 60, 65);
    flow('M 225 248 L 30 248 Q 8 248 8 226 L 8 186 Q 8 162 32 162 L 72 162', [[50, 162, 80, 162]]);
    svg.line(80, 162, 370, 162, { color: COLORS.black, width: 1.8, dash: '7 5' });
    flow('M 370 162 L 445 162 Q 470 162 490 196 L 508 226 Q 520 248 494 248 L 265 248', [
      [388, 162, 430, 162],
    ]);
    battery(230);
    svg.arrow(67, 72, 343, 72, { color: COLORS.black, width: 1.6, head: 13, start: true });
    for (const x of [65, 345]) svg.line(x, 50, x, 92, { color: COLORS.black, width: 1.4 });
    lab(svg, 205, 72, 'R', { size: 28 });
    lab(svg, 36, 140, 'I', { size: 28 });
    // (b) across the width
    bar(660, 95, 280, 30, 60, 65);
    flow(
      'M 725 248 L 640 248 Q 610 248 596 222 L 540 92 Q 528 52 570 52 L 742 52 Q 768 52 790 92',
      [[776, 72, 798, 100]]
    );
    svg.line(798, 100, 862, 208, { color: COLORS.black, width: 1.8, dash: '7 5' });
    flow('M 852 190 L 872 222 Q 885 248 860 248 L 765 248', [[854, 192, 876, 226]]);
    battery(730);
    svg.line(822, 30, 822, 104, { color: COLORS.black, width: 1.4 });
    svg.line(855, 30, 855, 150, { color: COLORS.black, width: 1.4 });
    svg.arrow(824, 70, 853, 92, { color: COLORS.black, width: 1.4, head: 9, start: true });
    lab(svg, 868, 34, 'R′ = ?', { anchor: 'start', size: 26 });
    lab(svg, 660, 30, 'I′ = ?', { anchor: 'start', size: 26 });
    caption(svg, 450, 330, '(a)');
    caption(svg, 960, 330, '(b)');
    return svg.render();
  },

  // 20.4 problem — a cold vaporizer
  Figure_20_04_04: () => {
    const svg = new Svg({
      width: 625,
      height: 780,
      title: 'A cold vaporizer',
      desc: 'A cold vaporizer: a box-shaped base holds a clear water reservoir under a round cap, and vapor rises from the top. An enlarged view of the reservoir shows the circuit inside: an AC voltage source connected to two electrodes that dip into the water, so the current passes through the water itself, which acts as the resistance R.',
    });
    const BODY = '#f2dfb8';
    const EDGE = '#c9ae7c';
    const WATER = '#bfe0f5';
    // Vapor
    for (const [x, y, r] of [
      [242, 60, 22],
      [262, 92, 28],
      [236, 128, 30],
      [258, 166, 32],
    ]) {
      svg.add(`<circle cx="${x}" cy="${y}" r="${r}" fill="#9ccbef" fill-opacity="0.35"/>`);
    }
    // Base: top face, right face, front face
    const edge = { stroke: EDGE, width: 1.6 };
    svg.polygon(
      [
        [20, 300],
        [400, 300],
        [460, 250],
        [80, 250],
      ],
      { fill: '#f7ead0', ...edge }
    );
    svg.polygon(
      [
        [400, 300],
        [460, 250],
        [460, 360],
        [400, 420],
      ],
      { fill: '#e6cf9f', ...edge }
    );
    svg.rect(20, 300, 380, 120, { fill: BODY, stroke: EDGE, width: 1.6 });
    svg.line(20, 340, 400, 340, { color: EDGE, width: 1.2 });
    // Reservoir, seen through a window in the base
    svg.rect(190, 255, 110, 150, { fill: '#ffffff', stroke: '#8ab4d4', width: 2, rx: 8 });
    svg.rect(192, 300, 106, 103, { fill: WATER, rx: 6 });
    for (const x of [222, 268]) svg.line(x, 262, x, 390, { color: '#5c8fb8', width: 3 });
    // Cap
    svg.rect(170, 205, 150, 50, { fill: BODY, stroke: EDGE, width: 1.6 });
    svg.ellipse(245, 255, 75, 16, { fill: BODY, stroke: EDGE, width: 1.6 });
    svg.ellipse(245, 205, 75, 16, { fill: '#f7ead0', stroke: EDGE, width: 1.6 });
    svg.rect(232, 198, 26, 14, { fill: 'none', stroke: EDGE, width: 1.4, rx: 3 });
    // Magnified view
    const [mx, my, mr] = [455, 620, 140];
    svg.line(192, 400, mx - mr * 0.94, my + mr * 0.33, { color: COLORS.black, width: 1.6 });
    svg.line(298, 262, mx + mr * 0.6, my - mr * 0.8, { color: COLORS.black, width: 1.6 });
    svg.add(
      `<defs><clipPath id="lens20"><circle cx="${mx}" cy="${my}" r="${mr}"/></clipPath></defs>`
    );
    svg.circle(mx, my, mr, { fill: '#ffffff' });
    svg.add(
      `<rect x="${mx - mr}" y="${my}" width="${2 * mr}" height="${mr}" fill="${WATER}" clip-path="url(#lens20)"/>`
    );
    svg.circle(mx, my, mr, { fill: 'none', stroke: COLORS.black, width: 2 });
    const [l, r] = [mx - 20, mx + 20];
    svg.path(
      `M ${l} ${my + 120} L ${l} ${my - 50} L ${l - 30} ${my - 50} Q ${mx - 85} ${my - 50} ${mx - 85} ${my - 80} Q ${mx - 85} ${my - 110} ${mx - 50} ${my - 110} L ${mx + 50} ${my - 110} Q ${mx + 85} ${my - 110} ${mx + 85} ${my - 80} Q ${mx + 85} ${my - 50} ${r + 30} ${my - 50} L ${r} ${my - 50} L ${r} ${my + 120}`,
      { color: WIRE, width: 3 }
    );
    acSource(svg, [mx - 22, my - 110], [mx + 22, my - 110], { r: 17 });
    note(svg, mx, my - 72, 'AC V', { size: 24 });
    lab(svg, mx, my + 60, 'R', { size: 28 });
    return svg.render();
  },

  // 20.5 Fig. 1 — DC and AC voltage and current
  Figure_20_05_01: () => {
    const svg = new Svg({
      width: 560,
      height: 720,
      title: 'DC and AC voltage and current versus time',
      desc: '(a) For a DC source, the voltage V_DC and current I_DC are constant in time. (b) For 60-Hz AC, the voltage oscillates between V0 and −V0 and the current between I0 and −I0; both are sinusoidal and in phase in a simple resistance circuit.',
    });
    const a = new Plot(svg, { x: 120, y: 40, w: 360, h: 220, xRange: [0, 1], yRange: [-0.3, 1] });
    svg.arrow(a.X(0), a.Y(0), a.X(1.05), a.Y(0), { color: COLORS.axis, width: 1.5, head: 11 });
    svg.arrow(a.X(0), a.Y(-0.3), a.X(0), a.Y(1.05), { color: COLORS.axis, width: 1.5, head: 11 });
    a.line(0, 0.78, 0.95, 0.78, { color: GREEN, width: 3.5 });
    a.line(0, 0.4, 0.95, 0.4, { color: CURVE, width: 3.5 });
    lab(svg, a.X(0.97), a.Y(0.78), 'V_{DC}', { anchor: 'start' });
    lab(svg, a.X(0.97), a.Y(0.4), 'I_{DC}', { anchor: 'start' });
    lab(svg, a.X(0) - 12, a.Y(0), '0', { anchor: 'end' });
    lab(svg, a.X(1.05) + 4, a.Y(0) + 26, 't');
    lab(svg, a.X(0), a.Y(1.05) - 18, 'V, I');
    caption(svg, 30, 30, '(a)');
    const b = new Plot(svg, {
      x: 120,
      y: 370,
      w: 360,
      h: 300,
      xRange: [0, 1],
      yRange: [-1.15, 1.15],
    });
    svg.arrow(b.X(0), b.Y(0), b.X(1.05), b.Y(0), { color: COLORS.axis, width: 1.5, head: 11 });
    svg.arrow(b.X(0), b.Y(-1.15), b.X(0), b.Y(1.2), { color: COLORS.axis, width: 1.5, head: 11 });
    const w = 2 * Math.PI * 1.25;
    b.fn(t => Math.sin(w * t), 0, 0.85, { color: GREEN, width: 3.5 });
    b.fn(t => 0.5 * Math.sin(w * t), 0, 0.85, { color: CURVE, width: 3.5 });
    for (const [v, l] of [
      [1, 'V_0'],
      [0.5, 'I_0'],
      [-0.5, '−I_0'],
      [-1, '−V_0'],
    ]) {
      const t = v > 0 ? 0.2 : 0.6;
      svg.line(b.X(0), b.Y(v), b.X(t), b.Y(v), { color: COLORS.guide, width: 1.2, dash: '5 4' });
      lab(svg, b.X(0) - 12, b.Y(v), l, { anchor: 'end' });
    }
    lab(svg, b.X(1.05) + 4, b.Y(0) + 26, 't');
    lab(svg, b.X(0), b.Y(1.2) - 18, 'V, I');
    caption(svg, 30, 340, '(b)');
    return svg.render();
  },

  // 20.5 Fig. 2 — AC voltage and its polarity
  Figure_20_05_02: () => {
    const svg = new Svg({
      width: 560,
      height: 600,
      title: 'The voltage of an AC source',
      desc: 'The potential difference V = V0 sin 2πft between the terminals of an AC source, drawn as a sine wave between +V0 and −V0 versus time t. At the positive peaks the source’s left terminal is positive, as in the circuit drawn above the graph; at the negative peaks the polarity is reversed, as in the circuit drawn below.',
    });
    const g = new Plot(svg, {
      x: 90,
      y: 200,
      w: 400,
      h: 220,
      xRange: [0, 3.1],
      yRange: [-1.25, 1.25],
    });
    svg.arrow(g.X(0), g.Y(0), g.X(3.2), g.Y(0), { color: COLORS.axis, width: 1.5, head: 11 });
    svg.line(g.X(0), g.Y(-1.3), g.X(0), g.Y(1.3), { color: COLORS.axis, width: 1.5 });
    g.fn(t => Math.sin(2 * Math.PI * t), 0, 2.85, { color: CURVE, width: 3.5, n: 300 });
    for (const v of [1, -1])
      svg.line(g.X(0), g.Y(v), g.X(3.1), g.Y(v), { color: COLORS.guide, width: 1.2, dash: '6 4' });
    lab(svg, g.X(0) - 10, g.Y(1), '+V_0', { anchor: 'end' });
    lab(svg, g.X(0) - 10, g.Y(-1), '−V_0', { anchor: 'end' });
    lab(svg, g.X(0), g.Y(1.3) - 16, 'V');
    lab(svg, g.X(3.2) + 8, g.Y(0) + 4, 't', { anchor: 'start' });
    const inset = (cx, cy, plusLeft) => {
      wire(svg, [
        [cx - 45, cy + 40],
        [cx - 70, cy + 40],
        [cx - 70, cy - 40],
        [cx + 70, cy - 40],
        [cx + 70, cy + 40],
        [cx + 45, cy + 40],
      ]);
      resistor(svg, [cx - 50, cy - 40], [cx + 50, cy - 40], { size: 70, amp: 12 });
      acSource(svg, [cx - 45, cy + 40], [cx + 45, cy + 40], { r: 18 });
      lab(svg, cx - 34, cy + 22, plusLeft ? '+' : '−', { size: 22 });
      lab(svg, cx + 34, cy + 22, plusLeft ? '−' : '+', { size: 22 });
    };
    svg.still(() => {
      inset(220, 80, true);
      inset(320, 520, false);
    });
    // For readers who allow motion, a cursor runs along the curve, and the
    // circuit whose polarity matches the sign of V at that moment stands out.
    const span = 2.85;
    const dur = `${fmt(2.4 * span)}s`;
    const ts = Array.from({ length: 161 }, (_, k) => (span * k) / 160);
    const lit = positive => {
      const keys = [0];
      const vals = [positive ? 1 : 0.3];
      for (let t = 0.5; t < span; t += 0.5) {
        keys.push(t / span);
        vals.push((Math.round(2 * t) % 2 === 0) === positive ? 1 : 0.3);
      }
      return `<animate attributeName="opacity" dur="${dur}" repeatCount="indefinite" calcMode="discrete" keyTimes="${smilList(keys)}" values="${smilList(vals)}"/>`;
    };
    const cursor = svg.capture(() =>
      svg.line(g.X(0), g.Y(1.25), g.X(0), g.Y(-1.25), { color: '#2a9fae', width: 2, dash: '5 4' })
    );
    svg.motionGroup(
      `<g>${lit(true)}${svg.capture(() => inset(220, 80, true))}</g><g>${lit(false)}${svg.capture(
        () => inset(320, 520, false)
      )}</g><g><animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" values="0 0;${fmt(g.X(span) - g.X(0))} 0"/>${cursor}</g><circle cx="${g.X(0)}" cy="${g.Y(0)}" r="7" fill="#2a9fae" stroke="#ffffff" stroke-width="1.5">${smilAnimate(
        'cx',
        ts.map(t => g.X(t)),
        { dur }
      )}${smilAnimate(
        'cy',
        ts.map(t => g.Y(Math.sin(2 * Math.PI * t))),
        { dur }
      )}</circle>`
    );
    for (const t of [1.25, 2.25])
      svg.arrow(220, 126, g.X(t), g.Y(1) - 10, { color: COLORS.black, width: 1.6, head: 12 });
    for (const t of [1.75, 2.75])
      svg.arrow(320, 476, g.X(t), g.Y(-1) + 10, { color: COLORS.black, width: 1.6, head: 12 });
    return svg.render();
  },

  // 20.5 Fig. 3 — AC power
  Figure_20_05_03: () => {
    const svg = new Svg({
      width: 620,
      height: 380,
      title: 'AC power as a function of time',
      desc: 'The power P = I0V0 sin²(2πft) delivered to a resistance by an AC source, versus time t. Because the voltage and current are in phase, the power is never negative: it oscillates between zero and I0V0 at twice the source frequency. The average power, shown dashed, is ½I0V0.',
    });
    const g = new Plot(svg, { x: 150, y: 40, w: 420, h: 280, xRange: [0, 2.6], yRange: [0, 1.15] });
    g.axes({ arrows: true });
    g.fn(t => Math.sin(Math.PI * t) ** 2, 0, 2.5, { color: CURVE, width: 3.5, n: 300 });
    for (const v of [1, 0.5])
      svg.line(g.X(0), g.Y(v), g.X(2.6), g.Y(v), { color: COLORS.black, width: 1.4, dash: '7 5' });
    lab(svg, g.X(0) - 10, g.Y(1), 'I_0V_0', { anchor: 'end' });
    lab(svg, g.X(0) - 10, g.Y(0.5), '½I_0V_0', { anchor: 'end' });
    lab(svg, g.X(0), g.Y(1.15) - 18, 'P');
    lab(svg, g.X(2.6) + 18, g.Y(0) + 6, 't', { anchor: 'start' });
    note(svg, g.X(2.2), 30, 'Average power', { size: 20 });
    svg.leader(g.X(2.2), 44, g.X(2.05), g.Y(0.5) - 2, { bend: 0.2, width: 1.5 });
    return svg.render();
  },

  // 20.6 Fig. 1 — a short circuit in a toaster cord
  Figure_20_06_01: () => {
    const svg = new Svg({
      width: 700,
      height: 520,
      title: 'A short circuit',
      desc: '(a) A toaster of resistance R is plugged into an AC outlet. Worn insulation lets the two wires of its cord touch, through a small resistance r. (b) The schematic: the AC source drives the low resistance r in parallel with the toaster’s R, so a very large current flows through r and the cord overheats.',
    });
    // (a) outlet, plug, cord, toaster.
    svg.rect(30, 60, 110, 110, { fill: '#ffffff', stroke: '#444444', width: 1.6, rx: 10 });
    acSource(svg, [30, 115], [80, 115], { r: 16 });
    svg.rect(95, 90, 60, 50, { fill: '#cfd1d6', stroke: '#777777', width: 1.4 });
    for (const y of [105, 125]) svg.rect(140, y - 3, 22, 6, { fill: '#c8a23a' });
    svg.rect(160, 104, 380, 22, { fill: '#c9cbd0', stroke: '#888888', width: 1.2, rx: 4 });
    for (const y of [111, 119]) svg.line(165, y, 600, y, { color: '#555555', width: 1.4 });
    resistor(svg, [355, 115], [395, 115], { size: 18, amp: 4 });
    lab(svg, 375, 150, 'r', { size: 22 });
    svg.rect(560, 30, 120, 180, { fill: '#c5d1e3', stroke: '#6f7f99', width: 2, rx: 22 });
    for (const x of [585, 640])
      svg.rect(x, 50, 20, 140, { fill: '#e2c48e', stroke: '#9a7a3a', width: 1.2, rx: 6 });
    resistor(svg, [598, 115], [652, 115], { size: 40, amp: 8 });
    lab(svg, 625, 86, 'R', { size: 22 });
    caption(svg, 350, 230, '(a)');
    // (b) schematic.
    const L = 200;
    const M = 330;
    const R = 460;
    const T = 280;
    const B = 460;
    box(svg, L, T, R, B);
    wire(svg, [
      [M, T],
      [M, B],
    ]);
    on(svg, (P, Q) => acSource(svg, P, Q, { r: 18 }), [L, 330], [L, 410]);
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 56, amp: 10 }), [M, 330], [M, 410]);
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 56, amp: 10 }), [R, 330], [R, 410]);
    lab(svg, M + 18, 370, 'r', { anchor: 'start' });
    lab(svg, R + 18, 370, 'R', { anchor: 'start' });
    caption(svg, 330, 500, '(b)');
    return svg.render();
  },

  // 20.6 Fig. 3 — a fuse or circuit breaker in series
  Figure_20_06_03: () => {
    const svg = new Svg({
      width: 520,
      height: 380,
      title: 'A circuit with a fuse or circuit breaker',
      desc: 'An AC voltage source V, a fuse or circuit breaker, and a resistance R connected in series. The fuse or breaker acts as an automatic switch that opens when the sustained current is too large.',
    });
    const L = 80;
    const T = 30;
    const R = 420;
    const B = 350;
    wire(svg, [
      [L, 70],
      [L, T],
      [R, T],
      [R, B],
      [L, B],
      [L, 270],
    ]);
    on(svg, (P, Q) => acSource(svg, P, Q, { r: 26 }), [L, 270], [L, 196]);
    wire(svg, [
      [L, 196],
      [L, 150],
    ]);
    svg.path(
      `M ${L} 150 C ${L - 40} 135 ${L - 40} 100 ${L} 85 C ${L + 40} 70 ${L + 40} 40 ${L} 70`,
      { color: WIRE, width: 2.5 }
    );
    for (const y of [70, 150]) svg.circle(L, y, 7, { fill: '#ffffff', stroke: WIRE, width: 2 });
    note(svg, L + 40, 80, 'Fuse or', { anchor: 'start', size: 30 });
    note(svg, L + 40, 120, 'circuit breaker', { anchor: 'start', size: 30 });
    on(svg, (P, Q) => resistor(svg, P, Q, { size: 100, amp: 22 }), [R, 160], [R, 290]);
    lab(svg, R + 34, 225, 'R', { anchor: 'start', size: 30 });
    lab(svg, L - 40, 233, 'V', { anchor: 'end', size: 30 });
    return svg.render();
  },

  // 20.6 Fig. 4 — thresholds of sensation and "can't let go" versus frequency
  Figure_20_06_05: () => {
    const svg = new Svg({
      width: 680,
      height: 460,
      title: 'Shock-current thresholds versus frequency',
      desc: 'Average current in milliamperes versus frequency from 10 Hz to 10 000 Hz on a logarithmic scale. The threshold of sensation is lowest, about 1 mA, near 60 to 100 Hz and rises to about 14 mA at 10 000 Hz. The “can’t let go” current is about 15 mA near 60 to 100 Hz, rising to about 25 mA at 1000 Hz and about 75 mA at 10 000 Hz. The lower the value, the more sensitive the body is at that frequency; the body is most sensitive near the 50 to 60 Hz of household power.',
    });
    const g = new Plot(svg, { x: 110, y: 30, w: 500, h: 340, xRange: [1, 4.2], yRange: [0, 88] });
    for (const f of [60, 100, 1000, 10000])
      svg.line(g.X(Math.log10(f)), g.Y(0), g.X(Math.log10(f)), g.Y(82), {
        color: COLORS.black,
        width: 1,
        dash: '5 4',
      });
    for (let d = 10; d <= 80; d += 10)
      svg.line(g.X(1), g.Y(d), g.X(4), g.Y(d), { color: COLORS.black, width: 1, dash: '5 4' });
    g.axes({ arrows: true });
    for (let d = 0; d <= 80; d += 10) note(svg, g.X(1) - 10, g.Y(d), String(d), { anchor: 'end' });
    for (const [f, t] of [
      [10, '10'],
      [60, '60'],
      [100, '100'],
      [1000, '1000'],
      [10000, '10 000'],
    ]) {
      note(svg, g.X(Math.log10(f)) + (f === 60 ? -10 : f === 100 ? 12 : 0), g.Y(0) + 24, t);
    }
    note(svg, g.X(2.5), g.Y(0) + 58, 'Frequency (Hz)', { size: 20 });
    svg.text(40, g.Y(40), 'Current (mA)', { size: 20, math: false, rotate: -90 });
    const letGo = [
      [10, 17.5],
      [30, 15.8],
      [60, 15],
      [100, 15.2],
      [300, 17.5],
      [1000, 25],
      [3000, 42],
      [10000, 76],
    ];
    const feel = [
      [10, 4.2],
      [30, 2.5],
      [60, 1.3],
      [100, 1.4],
      [300, 2.3],
      [1000, 4],
      [3000, 7.5],
      [10000, 14],
    ];
    g.series(
      letGo.map(([f, i]) => [Math.log10(f), i]),
      { color: '#3fae8a', width: 3.5, smooth: true }
    );
    g.series(
      feel.map(([f, i]) => [Math.log10(f), i]),
      { color: CURVE, width: 3.5, smooth: true }
    );
    note(svg, g.X(2.95), g.Y(60), 'Can’t let go', { size: 20 });
    svg.leader(g.X(3.05), g.Y(56), g.X(3.37), g.Y(41), { bend: 0.3, width: 1.4 });
    // Placed under the "can't let go" curve, clear of it.
    note(svg, g.X(2.45), g.Y(11.5), 'Threshold', { size: 20 });
    note(svg, g.X(2.45), g.Y(6.3), 'of sensation', { size: 20 });
    svg.leader(g.X(2.9), g.Y(8), g.X(3.45), g.Y(7.6), { bend: -0.25, width: 1.4 });
    return svg.render();
  },

  // 20.7 Fig. 3 — the action potential and the ion movements behind it
  Figure_20_07_03: () => {
    const svg = new Svg({
      width: 1000,
      height: 620,
      title: 'An action potential',
      desc: 'The voltage inside a nerve cell, V_inside in millivolts, versus time t in milliseconds. It rests near −90 mV, then about 2.6 ms in rises steeply to a peak near +50 mV at about 4.1 ms (depolarization), falls to about −107 mV near 5.4 ms (repolarization), and recovers to its resting value. Windows above the curve show the membrane: at rest the outside is positive and the inside negative; during depolarization Na+ ions cross inward and the charges reverse; during repolarization K+ ions cross outward and the outside becomes positive again; over the long term, active transport pumps Na+ out and K+ back in.',
    });
    const g = new Plot(svg, {
      x: 125,
      y: 245,
      w: 870,
      h: 320,
      xRange: [0, 8.6],
      yRange: [-115, 62],
      xTicks: [1, 2, 3, 4, 5, 6, 7, 8],
      yTicks: [50, 25, 0, -25, -50, -75, -100],
    });
    g.axes({ arrows: true, xAxisAt: -115, size: 16 });
    g.line(0, 0, 8.6, 0, { color: COLORS.axis, width: 1.2 });
    lab(svg, 995, 604, 't \\rm{(ms)}', { size: 19, anchor: 'end' });
    lab(svg, 30, 222, 'V_{inside} \\rm{(mV)}', { size: 19, anchor: 'start' });
    for (const t of [0.5, 1.5, 2.9, 3.75, 4.5, 5.5])
      svg.line(g.X(t), 202, g.X(t), g.Y(-115), { color: COLORS.black, width: 1.1, dash: '5 4' });
    // Rest, the rise to the peak, the undershoot, and recovery (values from the text's description),
    // joined by a monotone cubic so the curve never overshoots between points.
    const knots = [
      [0, -92],
      [2.6, -92],
      [2.95, -84],
      [3.25, -60],
      [3.55, -18],
      [3.85, 25],
      [4.1, 47],
      [4.7, -22],
      [5.0, -82],
      [5.4, -107],
      [5.8, -103],
      [6.2, -97],
      [6.6, -93],
      [7.3, -94],
      [8.6, -94],
    ];
    const slope = knots
      .slice(0, -1)
      .map(([t, v], i) => (knots[i + 1][1] - v) / (knots[i + 1][0] - t));
    const m = knots.map((_, i) =>
      i === 0 || i === knots.length - 1 || slope[i - 1] * slope[i] <= 0
        ? 0
        : 2 / (1 / slope[i - 1] + 1 / slope[i])
    );
    const V = t => {
      let i = 0;
      while (i < knots.length - 2 && t > knots[i + 1][0]) i += 1;
      const [[t0, v0], [t1, v1]] = [knots[i], knots[i + 1]];
      const h = t1 - t0;
      const u = (t - t0) / h;
      return (
        (2 * u ** 3 - 3 * u ** 2 + 1) * v0 +
        (u ** 3 - 2 * u ** 2 + u) * h * m[i] +
        (-2 * u ** 3 + 3 * u ** 2) * v1 +
        (u ** 3 - u ** 2) * h * m[i + 1]
      );
    };
    g.fn(V, 0, 8.6, { n: 600, color: CURVE, width: 3 });

    // Membrane windows.
    let seed = 5;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const ion = (x, y, kind) => {
      const na = kind === 'Na';
      svg.circle(x, y, 15, {
        fill: na ? '#bfe3dd' : '#ef8f8f',
        stroke: na ? '#3c9a8f' : '#b53b3b',
        width: 1.5,
      });
      svg.text(x, y, na ? '\\rm{Na}^+' : '\\rm{K}^+', { size: 13, halo: false });
    };
    const pump = (x, y1, y2) =>
      svg.arrow(x, y1, x, y2, { color: COLORS.black, width: 1.6, head: 11 });
    const panel = (cx, i, outside) => {
      const x0 = cx - 50;
      svg.add(
        `<defs><clipPath id="cell${i}"><rect x="${x0}" y="10" width="100" height="190"/></clipPath></defs>`
      );
      const bubbles = svg.capture(() => {
        svg.rect(x0, 10, 100, 98, { fill: '#c6d7e6' });
        svg.rect(x0, 133, 100, 67, { fill: '#f5cfa2' });
        for (let k = 0; k < 14; k += 1)
          svg.circle(x0 + 100 * rnd(), 10 + 98 * rnd(), 12 + 5 * rnd(), {
            fill: '#dfeaf2',
            stroke: '#a9c3d4',
            width: 1,
          });
        for (let k = 0; k < 10; k += 1)
          svg.circle(x0 + 100 * rnd(), 133 + 67 * rnd(), 12 + 5 * rnd(), {
            fill: rnd() < 0.5 ? '#f2b49a' : '#f8dcc7',
            stroke: '#e0a17f',
            width: 1,
          });
      });
      svg.add(`<g clip-path="url(#cell${i})">${bubbles}</g>`);
      svg.rect(x0, 108, 100, 25, { fill: '#f3b6cf', stroke: '#d77aa3', width: 1.2 });
      const [top, bottom] = outside === '+' ? ['+', '−'] : ['−', '+'];
      for (let k = 0; k < 5; k += 1) {
        svg.text(x0 + 12 + k * 19, 96, top, { size: 18, math: false, halo: false });
        svg.text(x0 + 12 + k * 19, 146, bottom, { size: 18, math: false, halo: false });
      }
    };
    panel(225, 0, '+');
    ion(207, 50, 'Na');
    ion(207, 178, 'K');
    panel(460, 1, '−');
    ion(470, 46, 'Na');
    pump(470, 62, 160);
    ion(470, 176, 'Na');
    ion(432, 176, 'K');
    panel(630, 2, '+');
    ion(640, 36, 'K');
    pump(640, 160, 52);
    ion(640, 176, 'K');
    ion(606, 60, 'Na');
    ion(606, 176, 'Na');
    // Long term: the pump moves Na+ back out and K+ back in.
    panel(935, 3, '+');
    ion(920, 48, 'Na');
    pump(920, 164, 64);
    ion(920, 180, 'Na');
    ion(952, 32, 'K');
    pump(952, 48, 162);
    ion(952, 178, 'K');
    svg.arrow(275, 120, 409, 120, { color: COLORS.black, width: 1.6, head: 12 });
    svg.arrow(511, 120, 579, 120, { color: COLORS.black, width: 1.6, head: 12 });
    for (const [x, y, s, bold] of [
      [62, 64, 'Outside', true],
      [76, 86, 'cell', false],
      [52, 120, 'Membrane', false],
      [62, 150, 'Inside', true],
      [76, 172, 'cell', false],
    ])
      note(svg, x, y, s, { size: 17, weight: bold ? 'bold' : undefined });
    for (const y of [75, 120, 161]) svg.squiggle(112, y, 172, y, { waves: 1.5, amp: 4 });
    note(svg, 225, 220, 'Resting', { size: 17 });
    note(svg, 460, 220, 'Depolarization', { size: 17 });
    note(svg, 630, 220, 'Repolarization', { size: 17 });
    note(svg, 935, 220, 'Long-term', { size: 17 });
    note(svg, 935, 242, 'active transport', { size: 17 });
    return svg.render();
  },

  // 20.7 Fig. 6 — Einthoven's triangle and the depolarization vector
  Figure_20_07_07: () => {
    const svg = new Svg({
      width: 640,
      height: 580,
      title: 'Einthoven’s triangle and the heart’s voltage vector',
      desc: 'Electrodes RA (right arm) and LA (left arm) at the top corners and LL (left leg) at the bottom corner of a triangle around the heart. A wave of depolarization spreading from the top of the heart leaves its outer surface negative above the wavefront and positive below. The wave is represented by a voltage vector pointing down and slightly to the left of the page’s vertical. Each pair of electrodes measures the component of this vector along its side of the triangle: lead I along RA to LA, lead II along RA to LL, and lead III along LA to LL. Lead II, nearly parallel to the vector, records the largest signal.',
    });
    const RA = [70, 70];
    const LA = [570, 70];
    const LL = [320, 520];
    svg.polygon([RA, LA, LL], { fill: 'none', stroke: COLORS.black, width: 3 });
    for (const [P, l, dx, dy, anchor] of [
      [RA, 'RA', -14, 0, 'end'],
      [LA, 'LA', 14, 0, 'start'],
      [LL, 'LL', 0, 30, 'middle'],
    ]) {
      svg.circle(...P, 8, { fill: COLORS.black });
      note(svg, P[0] + dx, P[1] + dy, l, { anchor, size: 24 });
    }
    // Heart outline.
    svg.path(
      'M 230 140 C 260 110 360 120 400 110 C 450 100 470 140 455 200 C 440 270 420 330 360 370 C 330 390 300 380 270 350 C 240 320 215 260 210 210 C 206 175 210 155 230 140 Z',
      {
        color: COLORS.black,
        width: 1.8,
        fill: HEART,
      }
    );
    svg.path('M 214 190 C 260 220 330 220 370 170 C 390 145 410 125 420 112', {
      color: COLORS.black,
      width: 1.6,
    });
    for (const [x, y] of [
      [240, 155],
      [275, 180],
      [305, 150],
      [340, 160],
      [360, 135],
      [395, 135],
      [250, 185],
    ]) {
      note(svg, x, y, '−', { size: 22, weight: 'bold' });
    }
    for (const [x, y] of [
      [430, 150],
      [415, 185],
      [440, 215],
      [260, 245],
      [310, 245],
      [370, 230],
      [290, 290],
      [340, 290],
      [405, 280],
      [270, 320],
      [330, 335],
      [380, 320],
    ]) {
      note(svg, x, y, '+', { size: 22, weight: 'bold' });
    }
    const A = [325, 175];
    const B = [365, 300];
    svg.arrow(...A, ...B, { color: COLORS.black, width: 5, head: 20 });
    // Projections of the vector onto the three leads.
    const sides = [
      [RA, LA, 'I'],
      [RA, LL, 'II'],
      [LA, LL, 'III'],
    ];
    for (const [P, Q, name] of sides) {
      const ux = (Q[0] - P[0]) / Math.hypot(Q[0] - P[0], Q[1] - P[1]);
      const uy = (Q[1] - P[1]) / Math.hypot(Q[0] - P[0], Q[1] - P[1]);
      const proj = X => {
        const t = (X[0] - P[0]) * ux + (X[1] - P[1]) * uy;
        return [P[0] + t * ux, P[1] + t * uy];
      };
      const a = proj(A);
      const b = proj(B);
      svg.line(...A, ...a, { color: COLORS.black, width: 1.3, dash: '5 4' });
      svg.line(...B, ...b, { color: COLORS.black, width: 1.3, dash: '5 4' });
      svg.arrow(...a, ...b, { color: COLORS.black, width: 5, head: 18 });
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      const nx = -uy;
      const ny = ux;
      const out = name === 'I' ? -1 : name === 'II' ? 1 : -1;
      note(svg, m[0] + out * nx * 30, m[1] + out * ny * 30, name, { size: 24 });
    }
    return svg.render();
  },

  // 20.7 Fig. 7 — a lead II ECG with arterial blood pressure
  Figure_20_07_08: () => {
    const svg = new Svg({
      width: 680,
      height: 640,
      title: 'A lead II ECG with the corresponding arterial blood pressure',
      desc: 'Top: arterial blood pressure in mm Hg versus time t over two heartbeats of 0.75 s each, swinging between a diastolic minimum of about 83 mm Hg and a systolic maximum of about 125 mm Hg, with a small dicrotic notch after each peak. Bottom: the lead II ECG voltage in millivolts over the same time. Each beat shows a small P wave, the sharp QRS complex peaking at about 1.0 mV at R, and a broad T wave. The systolic peak in pressure follows shortly after the QRS complex, which is caused by the depolarization and contraction of the ventricles.',
    });
    const top = new Plot(svg, {
      x: 130,
      y: 30,
      w: 490,
      h: 230,
      xRange: [0, 1.6],
      yRange: [60, 130],
      xTicks: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5],
      yTicks: [60, 80, 100, 120],
      xFormat: v => (v * 2 === Math.round(v * 2) ? v.toFixed(1) : ''),
    });
    top.axes({ arrows: true, size: 17 });
    const pts = [];
    for (const c of [0, 0.75])
      for (const [t, p] of PRESSURE) if (c + t <= 1.6) pts.push([c + t, p]);
    const dedup = pts.filter((p, i) => i === 0 || p[0] > pts[i - 1][0] + 1e-6);
    top.series(dedup, { color: '#e0533a', width: 3, smooth: true });
    note(svg, top.X(0.6), top.Y(130) - 6, 'Systolic', { size: 18 });
    note(svg, top.X(0.4), top.Y(76), 'Diastolic', { size: 18 });
    svg.text(46, top.Y(95), 'Arterial blood', { size: 17, math: false, rotate: -90 });
    svg.text(70, top.Y(95), 'pressure (mm Hg)', { size: 17, math: false, rotate: -90 });
    lab(svg, top.X(1.6) + 10, top.Y(60) + 24, 't \\rm{(s)}', { anchor: 'start', size: 19 });
    const bot = new Plot(svg, {
      x: 130,
      y: 360,
      w: 490,
      h: 230,
      xRange: [0, 1.6],
      yRange: [-0.6, 1.25],
      xTicks: [0.25, 0.5, 0.75, 1.0, 1.25, 1.5],
      yTicks: [-0.5, 0, 0.5, 1.0],
      xFormat: v => (v * 2 === Math.round(v * 2) ? v.toFixed(1) : ''),
      yFormat: v => (v ? v.toFixed(1).replace('-', '−') : '0'),
    });
    bot.axes({ arrows: true, size: 17, xLabelsAtAxis: true });
    bot.fn(t => ecg(t + 0.0), 0, 1.55, { color: '#e0533a', width: 2.5, n: 1200 });
    for (const [t, v, l, dy] of [
      [0.16, 0.2, 'P', -20],
      [0.275, -0.08, 'Q', 22],
      [0.31, 1.0, 'R', -18],
      [0.34, -0.33, 'S', 20],
      [0.56, 0.27, 'T', -20],
    ]) {
      note(svg, bot.X(t) + (l === 'Q' ? -10 : l === 'S' ? 8 : 0), bot.Y(v) + dy, l, { size: 18 });
    }
    svg.text(46, bot.Y(0.3), 'Lead II voltage', { size: 17, math: false, rotate: -90 });
    svg.text(70, bot.Y(0.3), '(mV)', { size: 17, math: false, rotate: -90 });
    lab(svg, bot.X(1.6) + 10, bot.Y(0) + 4, 't \\rm{(s)}', { anchor: 'start', size: 19 });
    return svg.render();
  },
};
