/**
 * Chapter 33: particle physics — the scale of substructure, exchange
 * particles and Feynman diagrams, accelerators, antimatter, quarks and color,
 * and unification.
 *
 * Nucleons are the shaded spheres of chapter 31 and photons the wave packets
 * of chapter 30. The cyclotron orbit is a chain of semicircles, one per dee,
 * each larger than the last because the particle gains energy at every gap
 * crossing. The Δ⁺⁺ resonance is a Breit–Wigner peak at 200 MeV with a full
 * width at half maximum of 100 MeV, on a smooth background. The Ω⁻ event is
 * traced from the original bubble-chamber drawing.
 */
import { photon } from './ch30.js';
import { NEUTRON, PROTON, nucleon, nucleus } from './ch31.js';
import { COLORS, Plot, Svg, fmt, smoothPath } from './svg.js';

export const PION = ['#f4a3b0', '#b8233c'];
export const CHARGE = ['#c3cedd', '#4b5d78'];
export const ELECTRON = ['#e2d2f2', '#8a6bb8'];
const NEUTRINO = ['#d9934a', '#5a3208'];
const LINE = '#a5182f';
const GO = '#5ab43c';
const EFIELD = '#2a8fd6';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 22, math: false });
}

/** Define a gradient (or other <defs> markup) once per figure. */
function define(svg, id, markup) {
  svg.defined ??= new Set();
  if (svg.defined.has(id)) return;
  svg.defined.add(id);
  svg.add(`<defs>${markup}</defs>`);
}

/** A shaded particle with a centered label (p, n, π⁺, +). */
export function particle(svg, x, y, r, colors, label = '', { size = r * 1.05, math = true } = {}) {
  nucleon(svg, x, y, r, colors);
  if (label) svg.text(x, y + 1, label, { size, math, halo: false });
}

/** Faded copies of a particle trailing behind it, opposite its motion `dir` (±1 in x). */
function trail(svg, x, y, r, colors, dir, { step = r * 0.35, label = '' } = {}) {
  for (const [k, op] of [
    [3, 0.2],
    [2, 0.35],
    [1, 0.55],
  ]) {
    svg.add(
      `<g opacity="${op}">${svg.capture(() => particle(svg, x - dir * k * step, y, r, colors, label))}</g>`
    );
  }
}

/** A filled arrowhead at fraction `at` along P→Q, pointing toward Q. */
function midArrow(svg, [x1, y1], [x2, y2], { at = 0.5, color = LINE, size = 18 } = {}) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / len, (y2 - y1) / len];
  const [tx, ty] = [x1 + (x2 - x1) * at + ux * size * 0.5, y1 + (y2 - y1) * at + uy * size * 0.5];
  const [bx, by] = [tx - ux * size, ty - uy * size];
  const h = size * 0.4;
  svg.polygon(
    [
      [tx, ty],
      [bx - uy * h, by + ux * h],
      [bx + uy * h, by - ux * h],
    ],
    { fill: color }
  );
}

/** A gluon: a coiled line from A to B with n loops of radius a. */
function gluon(svg, [x1, y1], [x2, y2], { n = 6, a = 6, color = COLORS.black, width = 1.8 } = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / L, (y2 - y1) / L];
  const pts = [];
  for (let k = 0; k <= n * 24; k += 1) {
    const s = k / (n * 24);
    const t = 2 * Math.PI * n * s;
    const along = s * (L - 2 * a) + a - a * Math.cos(t);
    const across = a * Math.sin(t);
    pts.push([x1 + ux * along - uy * across, y1 + uy * along + ux * across]);
  }
  svg.polyline(pts, { color, width });
}

/** A short wavy line (a gluon exchanged between quark lines) from A to B. */
function wiggle(svg, [x1, y1], [x2, y2], { waves = 2, amp = 4, color = COLORS.black } = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1);
  const [ux, uy] = [(x2 - x1) / L, (y2 - y1) / L];
  const pts = [];
  for (let k = 0; k <= 30; k += 1) {
    const s = k / 30;
    const w = amp * Math.sin(2 * Math.PI * waves * s);
    pts.push([x1 + ux * L * s - uy * w, y1 + uy * L * s + ux * w]);
  }
  svg.polyline(pts, { color, width: 1.3 });
}

/** Small t (up) and x (right) axes with their origin at (x, y). */
function txAxes(svg, x, y, w, h, size = 30) {
  svg.arrow(x, y, x + w, y, { color: COLORS.black, width: 2, head: 16 });
  svg.arrow(x, y, x, y - h, { color: COLORS.black, width: 2, head: 16 });
  lab(svg, x - 6, y - h + 2, 't', { size, anchor: 'end' });
  lab(svg, x + w, y + size * 0.8, 'x', { size, anchor: 'end' });
}

/**
 * A Feynman diagram on t–x axes: two particles approach, exchange a virtual
 * carrier between vertices V1 and V2, and move apart. Each end is
 * [colors, label] for the particle drawn on that leg, with `labels` placing
 * names beside the particle instead of on it.
 */
function feynman({ title, desc, legs, carrier, carrierLabel, sideLabels }) {
  const svg = new Svg({ width: 560, height: 615, title, desc });
  txAxes(svg, 30, 570, 520, 560);
  const V1 = [225, 330];
  const V2 = [395, 290];
  const ends = { inL: [100, 525], outL: [90, 75], inR: [505, 480], outR: [510, 50] };
  const along = ([x1, y1], [x2, y2], t) => [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t];
  const leg = (from, to) => {
    svg.line(...from, ...to, { color: LINE, width: 4 });
  };
  leg(ends.inL, V1);
  leg(ends.inR, V2);
  svg.arrow(...V1, ...ends.outL, { color: LINE, width: 4, head: 26 });
  svg.arrow(...V2, ...ends.outR, { color: LINE, width: 4, head: 26 });
  svg.line(...V1, ...V2, { color: LINE, width: 4 });
  midArrow(svg, ends.inL, V1, { at: 0.62, size: 24 });
  midArrow(svg, ends.inR, V2, { at: 0.55, size: 24 });
  midArrow(svg, V1, V2, { at: 0.8, size: 24 });
  carrier(svg, ...along(V1, V2, 0.45), (Math.atan2(V1[1] - V2[1], V2[0] - V1[0]) * 180) / Math.PI);
  carrierLabel(svg);
  const spots = {
    inL: along(ends.inL, V1, 0.3),
    outL: along(V1, ends.outL, 0.62),
    inR: along(ends.inR, V2, 0.2),
    outR: along(V2, ends.outR, 0.65),
  };
  for (const [key, [colors, label, r = 30]] of Object.entries(legs)) {
    const [x, y] = spots[key];
    particle(svg, x, y, r, colors, sideLabels ? '' : label, {
      math: label !== '+',
      size: label === '+' ? 30 : 32,
    });
    if (sideLabels) sideLabels(svg, key, x, y, label);
  }
  return svg.render();
}

/** A cylinder seen side-on, centered at (x, y) and tilted by `angle` degrees. */
function cylinder(svg, x, y, angle, len, r, [light, mid, dark], id) {
  define(
    svg,
    id,
    `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${dark}"/><stop offset="0.35" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient>`
  );
  const h = len / 2;
  svg.add(
    `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(angle)})"><path d="M ${fmt(-h)} ${fmt(-r)} L ${fmt(h)} ${fmt(-r)} A ${fmt(r * 0.35)} ${fmt(r)} 0 0 1 ${fmt(h)} ${fmt(r)} L ${fmt(-h)} ${fmt(r)} Z" fill="url(#${id})" stroke="${dark}" stroke-width="1"/><ellipse cx="${fmt(-h)}" cy="0" rx="${fmt(r * 0.35)}" ry="${fmt(r)}" fill="${mid}" stroke="${dark}" stroke-width="1"/></g>`
  );
}

/** A quark: a small pale disk with a colored rim and its flavor inside. */
function quark(svg, x, y, label, color, { r = 17, size = 22 } = {}) {
  svg.circle(x, y, r, { fill: QUARK_FILL[color] ?? '#eeeeee', stroke: QUARK_RIM[color], width: 2 });
  svg.text(x, y + 1, label, { size, halo: false });
}

const QUARK_RIM = {
  R: '#d0263f',
  G: '#2f9a6a',
  B: '#2b6fc4',
  aR: '#1aa6c9',
  aG: '#c2338f',
  aB: '#c9a21a',
};
const QUARK_FILL = {
  R: '#f6b9b9',
  G: '#bfe5d2',
  B: '#bcd3f0',
  aR: '#b9e8f6',
  aG: '#c9b8e6',
  aB: '#f3e2a8',
};

/** A ratio drawn as a stacked fraction centered at x, with its bar at y. */
function frac(svg, x, y, num, den, size = 22) {
  svg.line(x - size * 0.4, y, x + size * 0.4, y, { color: COLORS.black, width: 1.4 });
  svg.text(x, y - size * 0.6, num, { size, math: false, halo: false });
  svg.text(x, y + size * 0.65, den, { size, math: false, halo: false });
}

/** A row of fractions and operators, e.g. ['+', [1, 2], '−', [1, 2], '=', '0']. */
function equation(svg, x, y, parts, size = 22) {
  let cx = x;
  for (const p of parts) {
    if (Array.isArray(p)) {
      frac(svg, cx + size * 0.45, y, ...p, size);
      cx += size * 0.95;
    } else {
      const w = p.length > 1 ? size * 0.6 * p.length : size * 0.95;
      svg.text(cx + w / 2, y, p, { size, math: false, halo: false });
      cx += w;
    }
  }
}

/** A small spiral galaxy-free symbol for a burst of light: a jagged star. */
function burst(svg, x, y, r, { fill = '#f6d34a', stroke = '#d08a10', points = 8 } = {}) {
  const pts = [];
  for (let k = 0; k < points * 2; k += 1) {
    const a = (Math.PI * k) / points - Math.PI / 2;
    const rr = k % 2 ? r * 0.45 : r;
    pts.push([x + rr * Math.cos(a), y + rr * Math.sin(a)]);
  }
  svg.polygon(pts, { fill, stroke, width: 1.5 });
}

/** A simple eye in profile, looking left, centered at (x, y). */
function eye(svg, x, y, s = 1) {
  define(
    svg,
    'skin33',
    '<radialGradient id="skin33" cx="0.3" cy="0.5" r="0.8"><stop offset="0" stop-color="#f8dc8c"/><stop offset="1" stop-color="#f8dc8c" stop-opacity="0"/></radialGradient>'
  );
  svg.add(
    `<g transform="translate(${fmt(x)} ${fmt(y)}) scale(${fmt(s)})"><ellipse cx="14" cy="0" rx="34" ry="38" fill="url(#skin33)"/><path d="M -16 0 Q 4 -22 22 -16 L 22 16 Q 4 22 -16 0 Z" fill="#ffffff" stroke="#6b5530" stroke-width="1.5"/><ellipse cx="-3" cy="0" rx="7" ry="11" fill="#3d8fc9" stroke="#1f4f75" stroke-width="1"/><circle cx="-5" cy="-1" r="3.5" fill="#111111"/><path d="M -18 -2 Q 2 -27 24 -20" fill="none" stroke="#6b5530" stroke-width="3"/></g>`
  );
}

export default {
  // 33.0 Fig. 2 — substructure from solid to quark
  Figure_33_00_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 235,
      title: 'Substructure of matter from solid to quark',
      desc: 'A chain of ever smaller structures, each an enlarged piece of the one before: a solid block; a molecule, about 10^−9 m; an atom, about 10^−10 m, with electrons orbiting a tiny nucleus; a nucleus of protons and neutrons, 10^−14 to 10^−15 m; a nucleon, about 10^−15 m, made of three quarks bound by gluons; and a quark, smaller than 10^−18 m, with a gluon.',
    });
    // Solid block in perspective.
    svg.polygon(
      [
        [10, 40],
        [95, 40],
        [130, 15],
        [45, 15],
      ],
      { fill: '#e9ebef', stroke: '#8a8f99', width: 1.2 }
    );
    svg.polygon(
      [
        [95, 40],
        [130, 15],
        [130, 140],
        [95, 165],
      ],
      { fill: '#9fa5b0', stroke: '#6f7580', width: 1.2 }
    );
    svg.rect(10, 40, 85, 125, { fill: '#c7cbd3', stroke: '#6f7580', width: 1.2 });
    svg.rect(100, 70, 16, 16, { fill: '#ffffff', stroke: '#6f7580', width: 1 });
    // Molecule: four atoms joined by bonds.
    const mol = [
      [255, 48],
      [220, 92],
      [290, 92],
      [255, 136],
    ];
    for (const [a, b] of [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [1, 2],
    ])
      svg.line(...mol[a], ...mol[b], { color: '#9aa0aa', width: 7 });
    for (const [x, y] of mol) particle(svg, x, y, 20, ['#c9daf4', '#5f7fb8']);
    // Atom: three orbits around a nucleus.
    const atom = [400, 92];
    for (const [rot, color] of [
      [0, '#6c3fa0'],
      [60, '#2bb07a'],
      [-60, '#e2643a'],
    ]) {
      svg.add(
        `<ellipse cx="${atom[0]}" cy="${atom[1]}" rx="18" ry="66" transform="rotate(${rot} ${atom[0]} ${atom[1]})" fill="none" stroke="${color}" stroke-width="2.5"/>`
      );
    }
    svg.circle(...atom, 5, { fill: '#7fa86a' });
    for (const [dx, dy] of [
      [-2, -62],
      [-38, 30],
      [55, -5],
    ])
      svg.circle(atom[0] + dx, atom[1] + dy, 5, { fill: '#8a1f2f' });
    // Nucleus.
    nucleus(svg, 545, 92, 19, 9, { r: 12, seed: 3 });
    // Nucleon: three quarks and a gluon.
    define(
      svg,
      'nucleon33',
      '<radialGradient id="nucleon33" cx="0.4" cy="0.38" r="0.65"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9c8ea"/></radialGradient>'
    );
    svg.circle(718, 92, 55, { fill: 'url(#nucleon33)', stroke: '#bba6d6', width: 1 });
    svg.circle(703, 63, 7, { fill: '#ffffff', stroke: '#3f9a2b', width: 3 });
    svg.circle(752, 98, 7, { fill: '#ffffff', stroke: '#ef7d22', width: 3 });
    svg.circle(700, 125, 7, { fill: '#ffffff', stroke: '#1f77c8', width: 3 });
    wiggle(svg, [713, 66], [745, 92], { waves: 3, amp: 3 });
    svg.path('M 745 108 Q 735 125 712 122', { color: COLORS.black, width: 1.5 });
    svg.arrow(714, 122, 708, 121, { color: COLORS.black, width: 1.5, head: 9 });
    svg.path('M 696 70 Q 680 90 693 112', { color: COLORS.black, width: 1.5 });
    svg.arrow(692, 108, 694, 114, { color: COLORS.black, width: 1.5, head: 9 });
    // Quark with a gluon loop.
    svg.ellipse(874, 56, 12, 19, { stroke: COLORS.black, width: 1.5 });
    svg.circle(880, 38, 4, { fill: '#c62874' });
    nucleon(svg, 862, 98, 28, ['#d8f2c6', '#62b542']);
    svg.leader(935, 30, 886, 37, { bend: 0.15 });
    note(svg, 940, 30, 'Gluon', { anchor: 'start', size: 20 });
    // Curved arrows from each object to the enlarged piece of it.
    for (const [x1, x2] of [
      [118, 205],
      [282, 375],
      [440, 520],
      [585, 675],
      [745, 845],
    ]) {
      svg.path(`M ${x1} 60 Q ${(x1 + x2) / 2} -5 ${x2 - 6} 32`, {
        color: '#333333',
        width: 3,
      });
      svg.arrow(x2 - 14, 22, x2, 38, { color: '#333333', width: 3, head: 15 });
    }
    // Sizes and names.
    const rows = [
      [70, '', 'Solid'],
      [255, '10^{−9} \\rm{m}', 'Molecule'],
      [400, '10^{−10} \\rm{m}', 'Atom'],
      [545, '10^{−14}–10^{−15} \\rm{m}', 'Nucleus'],
      [718, '10^{−15} \\rm{m}', 'Nucleon'],
      [862, '<10^{−18} \\rm{m}', 'Quark'],
    ];
    for (const [x, size, name] of rows) {
      if (size) svg.text(x, 180, size, { size: 20, math: false });
      note(svg, x, 212, name, { size: 20 });
    }
    return svg.render();
  },

  // 33.1 Fig. 1 — a proton and a neutron exchange a pion
  Figure_33_01_01: () => {
    const svg = new Svg({
      width: 460,
      height: 610,
      title: 'Pion exchange between a proton and a neutron',
      desc: 'Four snapshots, top to bottom, of a proton on the left and a neutron on the right. The proton creates a positive pion and becomes a neutron; the pion travels to the right and is absorbed by the neutron, which becomes a proton.',
    });
    const [L, R, r] = [70, 390, 46];
    const rows = [60, 215, 375, 540];
    particle(svg, L, rows[0], r, PROTON, 'p');
    particle(svg, R, rows[0], r, NEUTRON, 'n');
    particle(svg, L, rows[1], r, NEUTRON, 'n');
    trail(svg, 190, rows[1], 38, PION, 1);
    particle(svg, 190, rows[1], 38, PION, 'π^+');
    svg.arrow(230, rows[1], 300, rows[1], { color: COLORS.black, width: 2.5, head: 20 });
    particle(svg, R, rows[1], r, NEUTRON, 'n');
    particle(svg, L, rows[2], r, NEUTRON, 'n');
    trail(svg, 270, rows[2], 38, PION, 1);
    particle(svg, 270, rows[2], 38, PION, 'π^+');
    svg.arrow(310, rows[2], 342, rows[2], { color: COLORS.black, width: 2.5, head: 20 });
    particle(svg, R, rows[2], r, NEUTRON, 'n');
    particle(svg, L, rows[3], r, NEUTRON, 'n');
    particle(svg, R, rows[3], r, PROTON, 'p');
    return svg.render();
  },

  // 33.2 Fig. 1 — exchange of a virtual photon, and why it cannot be watched
  Figure_33_02_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 420,
      title: 'Virtual photon exchange between two charges',
      desc: '(a) Four snapshots of two positive charges. The left charge emits a photon and recoils to the left; the photon travels to the right charge, which then recoils to the right, so the charges repel. (b) If an eye intercepts the photon on its way, the photon is absorbed by the eye and never reaches the second charge, so the force is not transmitted: the exchanged photon cannot be observed without disrupting it.',
    });
    const r = 30;
    const charge = (x, y) => particle(svg, x, y, r, CHARGE, '+', { math: false, size: 30 });
    const moving = (x, y, dir) => {
      trail(svg, x, y, r, CHARGE, dir, { step: 14, label: '+' });
      charge(x, y);
    };
    // (a)
    charge(245, 40);
    charge(425, 40);
    moving(205, 130, -1);
    svg.arrow(170, 130, 105, 130, { color: COLORS.black, width: 2.5, head: 18 });
    photon(svg, 300, 112, 0, { rx: 30, ry: 15, cycles: 2.5 });
    charge(425, 130);
    note(svg, 135, 70, 'Photon', { size: 24 });
    svg.squiggle(195, 72, 268, 105, { waves: 1, amp: 5 });
    moving(150, 220, -1);
    svg.arrow(115, 220, 50, 220, { color: COLORS.black, width: 2.5, head: 18 });
    photon(svg, 365, 215, 0, { rx: 30, ry: 15, cycles: 2.5 });
    charge(425, 220);
    moving(90, 320, -1);
    svg.arrow(55, 320, 5, 320, { color: COLORS.black, width: 2.5, head: 18 });
    moving(470, 320, 1);
    svg.arrow(505, 320, 565, 320, { color: COLORS.black, width: 2.5, head: 18 });
    caption(svg, 280, 395, '(a)');
    // (b)
    const [bl, br] = [705, 950];
    for (const y of [50, 170, 290]) {
      charge(bl, y);
      charge(br, y);
    }
    photon(svg, 790, 50, 0, { rx: 34, ry: 17, cycles: 2.5 });
    eye(svg, 880, 50);
    photon(svg, 830, 170, 0, { rx: 34, ry: 17, cycles: 2.5 });
    eye(svg, 880, 170);
    eye(svg, 880, 290);
    svg.text(872, 245, '!', { size: 30, math: false, weight: 'bold' });
    caption(svg, 830, 395, '(b)');
    return svg.render();
  },

  // 33.2 Fig. 2 — Feynman diagram for photon exchange
  Figure_33_02_02: () =>
    feynman({
      title: 'Feynman diagram of virtual photon exchange',
      desc: 'A Feynman diagram with time t up and position x to the right. Two positive charges approach each other, exchange a virtual photon (drawn as a wave packet) between two vertices, and then move apart: the electromagnetic force is repulsive.',
      legs: {
        inL: [CHARGE, '+'],
        outL: [CHARGE, '+'],
        inR: [CHARGE, '+'],
        outR: [CHARGE, '+'],
      },
      carrier: (svg, x, y, a) => photon(svg, x, y, a, { rx: 34, ry: 15, cycles: 2.5 }),
      carrierLabel: svg => svg.lines(320, 375, ['Virtual', 'photon'], { size: 26, math: false }),
    }),

  // 33.2 Fig. 3 — Feynman diagram for pion exchange
  Figure_33_02_03: () =>
    feynman({
      title: 'Feynman diagram of virtual pion exchange',
      desc: 'A Feynman diagram with time t up and position x to the right. A proton and a neutron approach each other and exchange a virtual positive pion. The proton becomes a neutron at the first vertex, and the neutron becomes a proton when it absorbs the pion: the strong nuclear force is carried by the pion.',
      legs: {
        inL: [PROTON, 'p'],
        outL: [NEUTRON, 'n'],
        inR: [NEUTRON, 'n'],
        outR: [PROTON, 'p'],
      },
      carrier: (svg, x, y) => particle(svg, x, y, 22, PION, 'π^+', { size: 22 }),
      carrierLabel: svg => note(svg, 320, 370, 'Virtual', { size: 26 }),
    }),

  // 33.3 Fig. 2 — a cyclotron
  Figure_33_03_02: () => {
    const svg = new Svg({
      width: 760,
      height: 560,
      title: 'A cyclotron',
      desc: 'Two hollow D-shaped plates, the dees, lie side by side with a gap between them. A uniform magnetic field B passes down through both. An alternating voltage across the gap gives an electric field E there, pointing from one dee to the other. Charged particles follow semicircular paths inside the dees, gain energy each time they cross the gap, and so spiral outward in ever larger semicircles until they leave as an external beam.',
    });
    const [cx, cy, rx, ry, T, g] = [380, 250, 330, 125, 42, 38];
    const k = ry / rx;
    const h = ry * Math.sqrt(1 - (g / rx) ** 2);
    define(
      svg,
      'dee33',
      '<linearGradient id="dee33" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b4b8c0"/><stop offset="0.5" stop-color="#e2e4e8"/><stop offset="1" stop-color="#a4a8b0"/></linearGradient><radialGradient id="deeTop33" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stop-color="#f4f5f7"/><stop offset="1" stop-color="#cfd2d8"/></radialGradient>'
    );
    const P = (u, v) => [cx + u, cy + v * k];
    // Front walls, then top faces.
    svg.path(
      `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx - g} ${cy + h} L ${cx - g} ${cy + h + T} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy + T} Z`,
      { color: '#6f7580', width: 1.5, fill: 'url(#dee33)' }
    );
    svg.path(
      `M ${cx + g} ${cy + h} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy + T} A ${rx} ${ry} 0 0 1 ${cx + g} ${cy + h + T} Z`,
      { color: '#6f7580', width: 1.5, fill: 'url(#dee33)' }
    );
    svg.path(`M ${cx - g} ${cy - h} A ${rx} ${ry} 0 0 0 ${cx - g} ${cy + h} Z`, {
      color: '#6f7580',
      width: 1.5,
      fill: 'url(#deeTop33)',
    });
    svg.path(`M ${cx + g} ${cy - h} A ${rx} ${ry} 0 0 1 ${cx + g} ${cy + h} Z`, {
      color: '#6f7580',
      width: 1.5,
      fill: 'url(#deeTop33)',
    });
    // Orbit: semicircles that alternate between the dees, each larger after a gap crossing.
    // In the right dee the particle moves toward the viewer, in the left dee away.
    const orbit = [];
    let v = -40;
    let exit;
    for (let n = 0; n <= 8; n += 1) {
      const R = 34 + 28 * n;
      const right = n % 2 === 0;
      const center = right ? v + R : v - R;
      // The last orbit stops halfway, at the outer edge, where the beam is taken out.
      const steps = n === 8 ? 20 : 40;
      for (let j = 0; j <= steps; j += 1) {
        const a = (Math.PI * j) / 40;
        if (right) orbit.push(P(g + R * Math.sin(a), center - R * Math.cos(a)));
        else orbit.push(P(-g - R * Math.sin(a), center + R * Math.cos(a)));
      }
      v = right ? center + R : center - R;
      if (n === 8) exit = [P(g + R, center), P(g + R, center + 290)];
    }
    svg.polyline(orbit, { color: COLORS.black, width: 1.6, dash: '6 5' });
    svg.arrow(...exit[0], ...exit[1], { color: COLORS.black, width: 1.6, dash: '6 5', head: 12 });
    // Magnetic field down through the dees.
    for (const [u, v] of [
      [-230, -40],
      [-120, -150],
      [-150, 140],
      [-250, 120],
      [230, -40],
      [120, -150],
      [150, 140],
      [250, 120],
    ]) {
      const [x, y] = P(u, v);
      svg.ellipse(x, y, 16, 10, { stroke: '#d0267a', width: 2, fill: '#ffffff' });
      svg.line(x - 11, y - 7, x + 11, y + 7, { color: '#d0267a', width: 1.8 });
      svg.line(x - 11, y + 7, x + 11, y - 7, { color: '#d0267a', width: 1.8 });
    }
    // Electric field across the gap.
    for (const v of [-210, -150, -90, -30, 30, 90, 150]) {
      const [, y] = P(0, v);
      svg.arrow(cx - g - 22, y, cx + g + 26, y, { color: EFIELD, width: 8, head: 22 });
    }
    // Alternating source wired to the two dees.
    const src = [cx, cy - h - 70];
    svg.circle(...src, 20, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    svg.path(
      `M ${src[0] - 12} ${src[1]} Q ${src[0] - 6} ${src[1] - 10} ${src[0]} ${src[1]} T ${src[0] + 12} ${src[1]}`,
      { color: COLORS.black, width: 2 }
    );
    const tapL = P(-g - 40, -h / k + 22);
    const tapR = P(g + 40, -h / k + 22);
    svg.polyline([[src[0] - 20, src[1]], [tapL[0], src[1]], tapL], {
      color: COLORS.black,
      width: 2,
      join: 'miter',
    });
    svg.polyline([[src[0] + 20, src[1]], [tapR[0], src[1]], tapR], {
      color: COLORS.black,
      width: 2,
      join: 'miter',
    });
    svg.circle(...tapL, 6, { fill: COLORS.black });
    svg.circle(...tapR, 6, { fill: COLORS.black });
    note(svg, cx, cy - h - 25, 'Gap', { size: 24 });
    lab(svg, 120, 120, '**B**', { size: 30 });
    lab(svg, 700, 150, '**B**', { size: 30 });
    lab(svg, 255, 70, '**E**', { size: 30 });
    svg.squiggle(268, 92, cx - g + 4, P(0, -150)[1] - 6, { waves: 1, amp: 6 });
    // Labels below.
    note(svg, 410, 470, '“Dees”', { size: 24 });
    svg.squiggle(360, 470, 230, cy + h + T * 0.5 - 4, { waves: 1, amp: 6 });
    svg.squiggle(462, 470, 560, cy + h + T * 0.4 + 4, { waves: 1, amp: 6 });
    note(svg, 640, 535, 'External beam', { size: 24 });
    svg.squiggle(640, 515, exit[1][0] - 4, exit[1][1] - 20, { waves: 1, amp: 6 });
    return svg.render();
  },

  // 33.3 Fig. 3 — a synchrotron ring and its drift tubes
  Figure_33_03_03: () => {
    const svg = new Svg({
      width: 1000,
      height: 360,
      title: 'Synchrotron ring and drift tubes',
      desc: '(a) A synchrotron: a ring of evenly spaced accelerating tubes around a circular beam path. (b) A proton between two tubes is pushed forward by the electric field E from the positive tube behind it toward the negative tube ahead. (c) After the proton enters the tube and coasts through it, the voltages reverse, so the field in the next gap again pushes it forward.',
    });
    // (a) The ring, tubes at the back first.
    const [cx, cy, rx, ry] = [225, 150, 205, 92];
    const blue = ['#86d4f0', '#2a9fd6', '#0f5f86'];
    const tubes = [];
    for (let n = 0; n < 28; n += 1) {
      const a = (2 * Math.PI * n) / 28 + 0.06;
      tubes.push(a);
    }
    const tube = a => {
      const [x, y] = [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
      const ang = (Math.atan2(ry * Math.cos(a), -rx * Math.sin(a)) * 180) / Math.PI;
      const s = 0.85 + 0.15 * Math.sin(a);
      cylinder(svg, x, y, ang, 30 * s, 9 * s, blue, 'blue33');
    };
    tubes.filter(a => Math.sin(a) < 0).forEach(tube);
    svg.ellipse(cx, cy, rx, ry, { stroke: '#ef8a5a', width: 2.5 });
    tubes.filter(a => Math.sin(a) >= 0).forEach(tube);
    caption(svg, 225, 335, '(a)');
    // (b), (c) Three copper tubes along a gently curving beam line.
    const copper = ['#f3cba4', '#cf8f5c', '#7a4a26'];
    const panel = (ox, signs, gapAt, fields) => {
      const centers = [
        [ox, 262],
        [ox + 88, 158],
        [ox + 150, 50],
      ];
      svg.path(smoothPath([[ox - 50, 315], ...centers, [ox + 172, 5]], 0.5), {
        color: COLORS.black,
        width: 1.5,
      });
      for (const [k, [x, y]] of centers.entries()) {
        const next = centers[Math.min(k + 1, 2)];
        const prev = centers[Math.max(k - 1, 0)];
        const ang = (Math.atan2(next[1] - prev[1], next[0] - prev[0]) * 180) / Math.PI;
        cylinder(svg, x, y, ang + 180, 84, 22, copper, 'copper33');
        note(svg, x + [-40, -38, -40][k], y + [-15, -48, -40][k], signs[k], {
          size: 26,
          anchor: 'end',
        });
      }
      const [a, b] = [centers[gapAt], centers[gapAt + 1]];
      const p = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      particle(svg, ...p, 10, ['#d3dbe8', '#5a6a88']);
      lab(svg, p[0] + 18, p[1] + 20, 'p^+', { anchor: 'start', size: 24 });
      for (const [x1, y1, x2, y2, lx, ly] of fields) {
        svg.arrow(x1, y1, x2, y2, { color: EFIELD, width: 6, head: 18 });
        lab(svg, lx, ly, '**E**', { size: 26 });
      }
    };
    panel(540, ['+', '−', '+'], 0, [[510, 200, 550, 165, 488, 172]]);
    panel(795, ['−', '+', '−'], 1, [
      [868, 95, 893, 58, 845, 68],
      [800, 172, 770, 208, 748, 168],
    ]);
    caption(svg, 590, 335, '(b)');
    caption(svg, 845, 335, '(c)');
    return svg.render();
  },

  // 33.3 Fig. 4 — Fermilab's two rings
  Figure_33_03_04: () => {
    const svg = new Svg({
      width: 1000,
      height: 320,
      title: 'Fermilab’s main ring and Tevatron',
      desc: 'A schematic, not to scale, of Fermilab. Protons from a proton source and antiprotons from an antiproton source are fed into the main ring, then into the Tevatron ring below it. Protons circulate one way and antiprotons the other, and the two beams collide inside a collision detector.',
    });
    const tubeStroke = d => {
      svg.path(d, { color: '#a07c50', width: 17 });
      svg.path(d, { color: '#ecd5ae', width: 12 });
    };
    const ell = ({ c: [x, y], rx, ry }, a1, a2) => {
      const pts = [];
      for (let k = 0; k <= 80; k += 1) {
        const a = a1 + ((a2 - a1) * k) / 80;
        pts.push([x + rx * Math.cos(a), y + ry * Math.sin(a)]);
      }
      return pts;
    };
    const poly = pts => `M ${pts.map(([x, y]) => `${fmt(x)} ${fmt(y)}`).join(' L ')}`;
    // Small arrows along a loop: protons (blue) one way, antiprotons (red) the other.
    const arrows = (ring, n, a1 = 0, a2 = 2 * Math.PI) => {
      for (let k = 0; k < n; k += 1) {
        const a = a1 + ((a2 - a1) * (k + 0.5)) / n;
        const { c, rx, ry } = ring;
        const p = [c[0] + rx * Math.cos(a), c[1] + ry * Math.sin(a)];
        const t = [-rx * Math.sin(a), ry * Math.cos(a)];
        const L = Math.hypot(...t);
        const [ux, uy] = [t[0] / L, t[1] / L];
        const off = 2.6;
        svg.arrow(
          p[0] - ux * 9 - uy * off,
          p[1] - uy * 9 + ux * off,
          p[0] + ux * 9 - uy * off,
          p[1] + uy * 9 + ux * off,
          {
            color: '#3d6fb8',
            width: 1.4,
            head: 7,
          }
        );
        svg.arrow(
          p[0] + ux * 9 + uy * off,
          p[1] + uy * 9 - ux * off,
          p[0] - ux * 9 + uy * off,
          p[1] - uy * 9 - ux * off,
          {
            color: '#d23a2a',
            width: 1.4,
            head: 7,
          }
        );
      }
    };
    const main = { c: [640, 105], rx: 330, ry: 68 };
    const tev = { c: [650, 175], rx: 320, ry: 68 };
    const psrc = { c: [165, 72], rx: 110, ry: 26 };
    const asrc = { c: [160, 250], rx: 125, ry: 30 };
    // Back halves of the big rings.
    for (const ring of [tev, main]) {
      tubeStroke(poly(ell(ring, Math.PI, 2 * Math.PI)));
      arrows(ring, 7, Math.PI, 2 * Math.PI);
    }
    // Collision detector on the back of the Tevatron.
    const [bx, by] = [560, 95];
    svg.polygon(
      [
        [bx, by],
        [bx + 50, by],
        [bx + 65, by - 14],
        [bx + 15, by - 14],
      ],
      { fill: '#f2f2f4', stroke: '#8a8f99', width: 1 }
    );
    svg.polygon(
      [
        [bx + 50, by],
        [bx + 65, by - 14],
        [bx + 65, by + 34],
        [bx + 50, by + 48],
      ],
      { fill: '#b9bdc6', stroke: '#8a8f99', width: 1 }
    );
    svg.rect(bx, by, 50, 48, { fill: '#dcdfe5', stroke: '#8a8f99', width: 1 });
    burst(svg, bx + 25, by + 24, 20, { points: 9 });
    // Sources and transfer lines.
    tubeStroke(poly(ell(psrc, 0, 2 * Math.PI)));
    arrows(psrc, 5);
    tubeStroke(poly(ell(asrc, 0, 2 * Math.PI)));
    arrows(asrc, 5);
    tubeStroke('M 255 88 Q 300 105 340 128');
    tubeStroke('M 270 236 Q 320 200 380 160');
    tubeStroke('M 545 170 Q 580 210 610 241');
    tubeStroke('M 770 168 Q 730 210 700 241');
    // Front halves.
    for (const ring of [tev, main]) {
      tubeStroke(poly(ell(ring, 0, Math.PI)));
      arrows(ring, 7, 0, Math.PI);
    }
    note(svg, 150, 22, 'Proton source', { size: 22 });
    note(svg, 880, 22, 'Main ring', { size: 22 });
    note(svg, 600, 18, 'Collision detector', { size: 22 });
    svg.line(600, 30, 597, 80, { color: COLORS.black, width: 1.2 });
    note(svg, 150, 305, 'Antiproton source', { size: 22 });
    note(svg, 890, 290, 'Tevatron ring', { size: 22 });
    return svg.render();
  },

  // 33.3 Fig. 5 — the Stanford Linear Accelerator and its collider
  Figure_33_03_05: () => {
    const svg = new Svg({
      width: 720,
      height: 590,
      title: 'The Stanford Linear Collider',
      desc: 'A schematic of SLAC. Electrons from an electron booster and positrons made at a positron source travel down a 3.2-kilometer linear accelerator, after the positrons are cooled in damping rings. At the end, magnets bend the electrons one way and the positrons the other around two arcs, so the beams meet head on inside the Mark II particle detector. Solid lines are electrons and dashed lines positrons.',
    });
    const BEAM = '#1f86c8';
    const L0 = [255, 300];
    const L1 = [560, 55];
    const L = Math.hypot(L1[0] - L0[0], L1[1] - L0[1]);
    const u = [(L1[0] - L0[0]) / L, (L1[1] - L0[1]) / L];
    const nrm = [u[1], -u[0]];
    const at = (s, o = 0) => [L0[0] + u[0] * s + nrm[0] * o, L0[1] + u[1] * s + nrm[1] * o];
    // A magnet: a small box along a beam.
    const magnet = ([x, y], angle) => {
      svg.add(
        `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(angle)})"><rect x="-16" y="-8" width="32" height="16" fill="#c8ccd3" stroke="#6f7580" stroke-width="1.2"/><polygon points="-16,-8 -10,-13 22,-13 16,-8" fill="#e6e8ec" stroke="#6f7580" stroke-width="1"/></g>`
      );
    };
    // Electrons: booster down the linac, then the right-hand arc to the detector.
    svg.line(...at(L), ...at(0), { color: BEAM, width: 2.5 });
    midArrow(svg, at(L), at(0), { at: 0.35, color: BEAM, size: 14 });
    const D = [150, 425];
    // Cubic Bézier arcs, sampled so the bending magnets sit on them.
    const bez = (P, t) => {
      const m = 1 - t;
      const w = [m * m * m, 3 * m * m * t, 3 * m * t * t, t * t * t];
      return [0, 1].map(i => w.reduce((acc, wk, k) => acc + wk * P[k][i], 0));
    };
    const along = (P, t) => {
      const [a, b] = [bez(P, t - 0.01), bez(P, t + 0.01)];
      return [bez(P, t), (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI];
    };
    const eP = [L0, [330, 370], [330, 470], [D[0] + 50, D[1] + 15]];
    svg.path(
      `M ${eP[0].join(' ')} C ${eP
        .slice(1)
        .map(q => q.join(' '))
        .join(', ')}`,
      {
        color: BEAM,
        width: 2.5,
      }
    );
    midArrow(svg, bez(eP, 0.84), bez(eP, 0.9), { color: BEAM, size: 14 });
    // Positrons: from the source back up to the damping ring, down the linac, and around the left arc.
    const src = at(150, 0);
    svg.polyline([src, at(150, -20), at(L - 25, -20)], { color: BEAM, width: 2, dash: '7 5' });
    midArrow(svg, at(150, -20), at(L - 25, -20), { at: 0.5, color: BEAM, size: 14 });
    svg.line(...at(L - 25, -20), ...at(L - 20, 10), { color: BEAM, width: 2, dash: '7 5' });
    svg.line(...at(L - 20, 10), ...at(0, 10), { color: BEAM, width: 2, dash: '7 5' });
    midArrow(svg, at(L - 20, 10), at(0, 10), { at: 0.6, color: BEAM, size: 14 });
    const pP = [at(0, 10), [120, 250], [-10, 300], [D[0] - 50, D[1] - 20]];
    svg.path(
      `M ${pP[0].join(' ')} C ${pP
        .slice(1)
        .map(q => q.join(' '))
        .join(', ')}`,
      {
        color: BEAM,
        width: 2.5,
        dash: '7 5',
      }
    );
    midArrow(svg, bez(pP, 0.84), bez(pP, 0.9), { color: BEAM, size: 14 });
    // Bending magnets along both arcs.
    for (const t of [0.3, 0.5, 0.7]) magnet(...along(eP, t));
    for (const t of [0.22, 0.42, 0.6, 0.76]) magnet(...along(pP, t));
    // Mark II detector: an octagonal drum.
    const oct = (cx, cy, r) =>
      Array.from({ length: 8 }, (_, k) => [
        cx + r * 0.8 * Math.cos((Math.PI * (k + 0.5)) / 4),
        cy + r * Math.sin((Math.PI * (k + 0.5)) / 4),
      ]);
    svg.polygon(oct(D[0] + 18, D[1] - 10, 62), { fill: '#a3a8b1', stroke: '#5f656c', width: 1.2 });
    svg.polygon(oct(D[0], D[1], 62), { fill: '#d3d6dc', stroke: '#5f656c', width: 1.2 });
    svg.ellipse(D[0], D[1], 28, 36, { fill: '#8f949c', stroke: '#5f656c', width: 1.2 });
    for (let k = 0; k < 6; k += 1) {
      const a = (Math.PI * k) / 6;
      svg.add(
        `<ellipse cx="${D[0]}" cy="${D[1]}" rx="24" ry="7" transform="rotate(${fmt((a * 180) / Math.PI)} ${D[0]} ${D[1]})" fill="none" stroke="${BEAM}" stroke-width="1.3"/>`
      );
    }
    svg.lines(D[0] - 5, 512, ['Mark II', 'particle', 'detector'], { size: 20, math: false });
    // Booster, positron source and damping ring.
    svg.add(
      `<g transform="translate(${fmt(at(L + 22)[0])} ${fmt(at(L + 22)[1])}) rotate(${fmt((Math.atan2(u[1], u[0]) * 180) / Math.PI)})"><rect x="-18" y="-9" width="36" height="18" fill="#d3d6dc" stroke="#5f656c" stroke-width="1.2"/></g>`
    );
    svg.circle(...src, 13, { fill: '#c8ccd3', stroke: '#5f656c', width: 1.2 });
    svg.circle(...src, 6, { fill: '#8f949c' });
    const ring = at(L - 22, -48);
    svg.ellipse(...ring, 16, 9, { stroke: BEAM, width: 2 });
    svg.ellipse(ring[0], ring[1] - 5, 16, 9, { stroke: BEAM, width: 1.2 });
    svg.line(...at(L - 25, -20), ring[0] + 6, ring[1] + 8, { color: BEAM, width: 1.5 });
    // Length of the linac.
    const off = 60;
    svg.line(...at(0, off - 12), ...at(0, off + 12), { color: COLORS.black, width: 2 });
    svg.line(...at(L, off - 12), ...at(L, off + 12), { color: COLORS.black, width: 2 });
    svg.arrow(...at(2, off), ...at(L - 2, off), {
      color: COLORS.black,
      width: 2,
      head: 16,
      start: true,
    });
    svg.lines(285, 85, ['Linear', 'accelerator', '3.2 km'], { size: 20, math: false });
    // Labels.
    note(svg, 640, 30, 'Electron', { size: 20, anchor: 'start' });
    note(svg, 640, 54, 'booster', { size: 20, anchor: 'start' });
    svg.squiggle(636, 34, at(L + 40)[0], at(L + 40)[1] - 2, { waves: 1, amp: 3 });
    svg.lines(590, 112, ['Damping', 'rings'], { size: 20, math: false, anchor: 'start' });
    svg.squiggle(586, 112, ring[0] + 18, ring[1], { waves: 1, amp: 3 });
    note(svg, 400, 255, 'Positron source', { size: 20, anchor: 'start' });
    svg.squiggle(398, 252, src[0] + 14, src[1] + 6, { waves: 1, amp: 3 });
    svg.text(...at(225, -42), 'e^+', { size: 20 });
    svg.text(...at(60, 30), 'e^+', { size: 20 });
    svg.text(350, 430, 'e^−', { size: 20 });
    svg.text(15, 380, 'e^+', { size: 20 });
    const mag = along(pP, 0.22)[0];
    note(svg, 160, 222, 'Magnets', { size: 20 });
    svg.squiggle(160, 236, mag[0] + 4, mag[1] - 10, { waves: 1, amp: 3 });
    // Legend.
    svg.arrow(445, 405, 520, 405, { color: BEAM, width: 2.5, head: 14 });
    svg.arrow(445, 440, 520, 440, { color: BEAM, width: 2, head: 14, dash: '7 5' });
    svg.text(530, 405, 'Electrons (\\it{e}^−)', { size: 20, math: false, anchor: 'start' });
    svg.text(530, 440, 'Positrons (\\it{e}^+)', { size: 20, math: false, anchor: 'start' });
    return svg.render();
  },

  // 33.4 Fig. 2 — electron–positron annihilation
  Figure_33_04_02: () => {
    const svg = new Svg({
      width: 640,
      height: 600,
      title: 'Electron–positron annihilation',
      desc: 'Top: an electron and a positron head toward each other. Bottom: after they annihilate, two photons fly off in opposite directions, carrying away their energy and momentum.',
    });
    particle(svg, 75, 35, 24, ELECTRON, '−', { math: false, size: 30 });
    lab(svg, 30, 62, 'e^−', { size: 30 });
    svg.arrow(110, 45, 285, 112, { color: GO, width: 4.5, head: 26 });
    particle(svg, 565, 238, 24, CHARGE, '+', { math: false, size: 30 });
    lab(svg, 520, 268, 'e^+', { size: 30 });
    svg.arrow(525, 215, 348, 145, { color: GO, width: 4.5, head: 26 });
    // The flash and the photons.
    for (let k = 0; k < 14; k += 1) {
      const a = (2 * Math.PI * k) / 14 + 0.2;
      const r1 = 18 + (k % 3) * 6;
      svg.line(
        312 + r1 * Math.cos(a),
        490 + r1 * Math.sin(a),
        312 + (r1 + 22) * Math.cos(a),
        490 + (r1 + 22) * Math.sin(a),
        {
          color: COLORS.black,
          width: 1.5,
        }
      );
    }
    const ang = (Math.atan2(80, 290) * 180) / Math.PI;
    photon(svg, 230, 512, ang, { rx: 38, ry: 18, cycles: 2.5 });
    photon(svg, 400, 462, ang, { rx: 38, ry: 18, cycles: 2.5 });
    svg.arrow(436, 452, 615, 395, { color: GO, width: 4.5, head: 26 });
    svg.arrow(194, 522, 15, 578, { color: GO, width: 4.5, head: 26 });
    note(svg, 290, 572, 'Photon', { size: 30 });
    note(svg, 480, 508, 'Photon', { size: 30 });
    return svg.render();
  },

  // 33.5 Fig. 1 — quark content of the proton, neutron and pions
  Figure_33_05_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 340,
      title: 'Quark composition of the nucleons and pions',
      desc: 'The proton is uud, the neutron udd, the positive pion u and anti-d, and the negative pion anti-u and d, each quark with its color and spin. Below each, the quark spins add to the particle spin (1/2 for the nucleons, 0 for the pions) and the quark charges add to its charge: +2/3 + 2/3 − 1/3 = 1 for the proton, +2/3 − 1/3 − 1/3 = 0 for the neutron, +2/3 + 1/3 = +1 for the positive pion, and −2/3 − 1/3 = −1 for the negative pion.',
    });
    const big = (x, colors) => {
      define(
        svg,
        `big33_${x}`,
        `<radialGradient id="big33_${x}" cx="0.38" cy="0.32" r="0.75"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="${colors[0]}"/><stop offset="1" stop-color="${colors[1]}"/></radialGradient>`
      );
      svg.circle(x, 80, 72, { fill: `url(#big33_${x})` });
    };
    // A quark with its spin arrow (up or down) and its color label.
    const q = (x, y, label, color, up, tag, tagAt) => {
      svg.arrow(x, y + (up ? -12 : 12), x, y + (up ? -48 : 48), {
        color: COLORS.black,
        width: 1.6,
        head: 10,
      });
      quark(svg, x, y, label, color, { r: 14, size: 20 });
      svg.text(x + tagAt[0], y + tagAt[1], tag, { size: 20, color: QUARK_RIM[color], halo: false });
    };
    big(225, ['#aebbd9', '#5f6f9a']);
    q(185, 80, 'u', 'B', true, 'B', [-16, 20]);
    q(222, 102, 'd', 'G', false, 'G', [2, -28]);
    q(262, 76, 'u', 'R', true, 'R', [16, 20]);
    big(490, ['#7fb267', '#2f6a2a']);
    q(450, 70, 'u', 'G', false, 'G', [0, -24]);
    q(485, 102, 'd', 'B', true, 'B', [0, 26]);
    q(525, 75, 'd', 'R', true, 'R', [8, 24]);
    big(722, ['#f6b3bc', '#d9707f']);
    q(690, 80, 'u', 'R', true, 'R', [0, 26]);
    q(752, 80, '\\bar{d}', 'aR', false, '\\bar{R}', [0, -26]);
    big(915, ['#f6cfae', '#d49a72']);
    // The antiquark carries the anticolor, as the d̄ of the π⁺ does.
    q(880, 80, '\\bar{u}', 'aG', true, '\\bar{G}', [0, 26]);
    q(943, 80, 'd', 'G', false, 'G', [0, -26]);
    // Names, spins and charges.
    note(svg, 20, 230, 'Spin', { anchor: 'start', size: 20 });
    note(svg, 20, 300, 'Charge', { anchor: 'start', size: 20 });
    const half = [1, 2];
    const third = [1, 3];
    const two = [2, 3];
    const cols = [
      [
        'Proton',
        145,
        [half, '+', half, '−', half, '=', half],
        ['+', two, '+', two, '−', third, '=', '1'],
      ],
      [
        'Neutron',
        400,
        ['−', half, '+', half, '+', half, '=', half],
        ['+', two, '−', third, '−', third, '=', '0'],
      ],
      ['π^+', 655, ['+', half, '−', half, '=', '0'], ['+', two, '+', third, '=', '+1']],
      ['π^−', 860, ['+', half, '−', half, '=', '0'], ['−', two, '−', third, '=', '−1']],
    ];
    for (const [name, x, spin, charge] of cols) {
      const cx = { 145: 225, 400: 490, 655: 722, 860: 915 }[x];
      if (name.startsWith('π')) svg.text(cx, 180, name, { size: 22 });
      else note(svg, cx, 180, name, { size: 22 });
      equation(svg, x, 230, spin, 20);
      equation(svg, x, 300, charge, 20);
    }
    return svg.render();
  },

  // 33.5 Fig. 2 — the bubble-chamber event that revealed the Ω⁻
  Figure_33_05_02: () => {
    const svg = new Svg({
      width: 560,
      height: 700,
      title: 'Tracks of the first Ω⁻ event',
      desc: 'A tracing of the bubble-chamber photograph of the first Ω⁻. An incoming K⁻ strikes a proton, making a K⁺ and a neutral K⁰ (dashed, as neutral particles leave no track) and the Ω⁻. The Ω⁻ travels a short way and decays into a Ξ⁰ and a π⁻. The Ξ⁰ decays into a Λ⁰ and a neutral pion, which at once gives two gamma rays; each gamma ray later makes an electron–positron pair. The Λ⁰ decays into a proton and a π⁻. A 10-cm scale bar is shown.',
    });
    // Coordinates are those of the original drawing, scaled to this figure.
    const s = 0.72;
    const S = pts => pts.map(([x, y]) => [x * s + 10, y * s + 10]);
    const solid = pts => svg.path(smoothPath(S(pts), 0.5), { color: COLORS.black, width: 2 });
    const dashed = pts =>
      svg.path(smoothPath(S(pts), 0.5), { color: COLORS.black, width: 2, dash: '8 6' });
    solid([
      [115, 950],
      [127, 795],
    ]); // K⁻
    solid([
      [127, 795],
      [133, 500],
      [128, 300],
      [100, 120],
      [60, 0],
    ]); // K⁺
    dashed([
      [127, 795],
      [97, 590],
    ]); // K⁰
    solid([
      [127, 795],
      [145, 745],
    ]); // Ω⁻
    solid([
      [145, 745],
      [300, 728],
      [450, 726],
      [600, 740],
      [740, 772],
    ]); // π⁻
    dashed([
      [145, 745],
      [162, 655],
    ]); // Ξ⁰
    dashed([
      [162, 655],
      [500, 510],
    ]); // γ
    solid([
      [500, 510],
      [620, 430],
      [700, 360],
      [748, 285],
    ]); // e⁺e⁻ pair
    solid([
      [500, 510],
      [620, 485],
      [740, 505],
    ]);
    dashed([
      [162, 655],
      [135, 232],
    ]); // γ
    // The other member of the pair curls into a tight spiral.
    const spiral = [];
    for (let k = 0; k <= 120; k += 1) {
      const a = (-Math.PI * 2.85 * k) / 120;
      const r = 67 - 22 * (k / 120);
      spiral.push([68 + r * Math.cos(a), 232 + r * Math.sin(a)]);
    }
    svg.polyline(S(spiral), { color: COLORS.black, width: 2 });
    dashed([
      [162, 655],
      [188, 365],
    ]); // Λ⁰
    solid([
      [188, 365],
      [243, 5],
    ]); // p
    solid([
      [188, 365],
      [160, 250],
      [145, 145],
      [138, 0],
    ]); // π⁻
    solid([
      [135, 232],
      [142, 175],
      [170, 110],
      [243, 5],
    ]);
    const L = (x, y, t) => svg.text(x * s + 10, y * s + 10, t, { size: 28 });
    L(40, 925, 'K^−');
    L(40, 715, 'K^0');
    L(195, 770, 'Ω^−');
    L(200, 690, 'Ξ^0');
    L(450, 700, 'π^−');
    L(350, 560, 'γ');
    L(165, 410, 'γ');
    L(215, 500, 'Λ^0');
    L(80, 465, 'K^+');
    L(265, 160, 'p');
    L(180, 35, 'π^−');
    const [bx, by] = [250 * s + 10, 880 * s + 10];
    svg.line(bx, by, bx + 105 * s, by, { color: COLORS.black, width: 2 });
    svg.line(bx, by - 10, bx, by + 10, { color: COLORS.black, width: 2 });
    svg.line(bx + 105 * s, by - 10, bx + 105 * s, by + 10, { color: COLORS.black, width: 2 });
    note(svg, bx + 52 * s, by + 24, '10 cm', { size: 20 });
    return svg.render();
  },

  // 33.5 Fig. 3 — electrons scattering from the quarks inside a proton
  Figure_33_05_03: () => {
    const svg = new Svg({
      width: 760,
      height: 620,
      title: 'Electrons scattering from quarks in a proton',
      desc: 'Five high-energy electrons enter a proton from the left. Two pass straight through. The other three strike the proton’s point-like quarks, two up quarks and a down quark, and are scattered through large angles, showing that the proton has internal structure.',
    });
    define(
      svg,
      'proton33',
      '<radialGradient id="proton33" cx="0.35" cy="0.3" r="0.75"><stop offset="0" stop-color="#e6ecf6"/><stop offset="0.35" stop-color="#94a6c8"/><stop offset="1" stop-color="#4c5f86"/></radialGradient>'
    );
    svg.circle(360, 300, 250, { fill: 'url(#proton33)' });
    const e = (pts, [lx, ly]) => {
      svg.polyline(pts.slice(0, -1), { color: COLORS.black, width: 2, join: 'miter' });
      svg.arrow(...pts.at(-2), ...pts.at(-1), { color: COLORS.black, width: 2, head: 20 });
      lab(svg, lx, ly, 'e^−', { size: 30 });
    };
    e(
      [
        [0, 155],
        [250, 155],
        [90, 75],
      ],
      [125, 45]
    );
    e(
      [
        [30, 215],
        [680, 215],
      ],
      [715, 215]
    );
    e(
      [
        [20, 290],
        [750, 290],
      ],
      [725, 262]
    );
    e(
      [
        [20, 320],
        [470, 320],
        [615, 85],
      ],
      [655, 90]
    );
    e(
      [
        [0, 365],
        [235, 365],
        [80, 490],
      ],
      [130, 520]
    );
    quark(svg, 285, 155, 'u', 'B', { r: 26, size: 30 });
    quark(svg, 265, 375, 'u', 'G', { r: 30, size: 32 });
    quark(svg, 495, 345, 'd', 'R', { r: 30, size: 32 });
    note(svg, 360, 595, 'Proton', { size: 30 });
    return svg.render();
  },

  // 33.5 Fig. 5 — color combinations of a baryon and a meson
  Figure_33_05_05: () => {
    const svg = new Svg({
      width: 1000,
      height: 215,
      title: 'Colors of the quarks in a baryon and a meson',
      desc: 'A baryon contains three quarks, one red, one green and one blue; the three colors add to white. A meson contains a quark and an antiquark, red and antired; a color and its anticolor also add to white. Hadrons are always white.',
    });
    note(svg, 10, 45, 'Baryon', { anchor: 'start', size: 24 });
    svg.circle(205, 105, 100, { fill: 'none', stroke: COLORS.black, width: 2 });
    const tagged = (x, y, sub, color, tag) => {
      svg.circle(x, y, 21, { fill: QUARK_FILL[color], stroke: QUARK_RIM[color], width: 2 });
      svg.text(x, y + 1, `q_{${sub}}`, { size: 26, halo: false });
      svg.text(x, y + 42, tag, { size: 24, color: QUARK_RIM[color], halo: false });
    };
    tagged(158, 62, 1, 'R', 'R');
    tagged(270, 72, 2, 'G', 'G');
    tagged(212, 140, 3, 'B', 'B');
    // Overlapping color disks: the colors together make white.
    const blend = (pts, labels, fills, rims) => {
      const id = `mix33_${pts[0][0]}`;
      svg.add(
        `<defs><clipPath id="${id}">${pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="33"/>`).join('')}</clipPath></defs>`
      );
      pts.forEach(([x, y], k) =>
        svg.add(
          `<circle cx="${x}" cy="${y}" r="33" fill="${fills[k]}" fill-opacity="0.75" stroke="${rims[k]}" stroke-width="1.5"/>`
        )
      );
      return id;
    };
    blend(
      [
        [392, 84],
        [430, 96],
        [404, 122],
      ],
      [],
      ['#f3a79a', '#8fd0ae', '#9cb6e6'],
      ['#d0263f', '#2f9a6a', '#2b6fc4']
    );
    // The region common to all three is white.
    svg.add(
      '<defs><clipPath id="c33a"><circle cx="392" cy="84" r="33"/></clipPath><clipPath id="c33b"><circle cx="430" cy="96" r="33"/></clipPath></defs><g clip-path="url(#c33a)"><g clip-path="url(#c33b)"><circle cx="404" cy="122" r="33" fill="#ffffff"/></g></g>'
    );
    svg.text(380, 74, 'R', { size: 24, color: '#d0263f', halo: false });
    svg.text(446, 94, 'G', { size: 24, color: '#2f9a6a', halo: false });
    svg.text(402, 140, 'B', { size: 24, color: '#2b6fc4', halo: false });
    note(svg, 555, 45, 'Meson', { anchor: 'start', size: 24 });
    svg.circle(750, 105, 100, { fill: 'none', stroke: COLORS.black, width: 2 });
    tagged(712, 75, 1, 'R', 'R');
    tagged(818, 75, 2, 'aR', '\\bar{R}');
    blend(
      [
        [930, 92],
        [968, 92],
      ],
      [],
      ['#f3a79a', '#8fdcf0'],
      ['#d0263f', '#1aa6c9']
    );
    svg.add(
      '<defs><clipPath id="c33c"><circle cx="930" cy="92" r="33"/></clipPath></defs><g clip-path="url(#c33c)"><circle cx="968" cy="92" r="33" fill="#ffffff"/></g>'
    );
    svg.text(918, 92, 'R', { size: 24, color: '#d0263f', halo: false });
    svg.text(982, 92, '\\bar{R}', { size: 24, color: '#1a8cb0', halo: false });
    return svg.render();
  },

  // 33.5 Fig. 7 — the Δ⁺⁺ resonance in π⁺–p scattering
  Figure_33_05_07: () => {
    const svg = new Svg({
      width: 880,
      height: 480,
      title: 'The Δ⁺⁺ resonance',
      desc: 'Number of π⁺ + p → π⁺ + p interactions versus the kinetic energy of the π⁺, from 0 to about 850 MeV. The curve rises steeply to a sharp peak at 200 MeV, where the short-lived Δ⁺⁺ is formed, falls to a broad minimum near 500 MeV, and rises gently again. The peak’s full width at half maximum is about 100 MeV.',
    });
    const g = new Plot(svg, {
      x: 60,
      y: 20,
      w: 790,
      h: 360,
      xRange: [0, 950],
      yRange: [0, 1.12],
      xTicks: [200, 400, 600, 800],
    });
    // A Breit–Wigner peak (Γ = 100 MeV) on a smooth background, cut off at low energy.
    const bw = T => 1 / (1 + ((T - 200) / 50) ** 2);
    const f = T =>
      (0.85 * bw(T) + 0.15 + 0.13 * Math.exp(-(((T - 780) / 180) ** 2))) *
      (T > 30 ? 1 - Math.exp(-(((T - 30) / 60) ** 2)) : 0);
    g.axes({ arrows: true, size: 22 });
    g.fn(f, 0, 850, { n: 400, color: COLORS.maroon, width: 3.5 });
    // Half-maximum points of the peak.
    const peak = f(200);
    const solve = (a, b) => {
      for (let k = 0; k < 60; k += 1) {
        const m = (a + b) / 2;
        if (f(m) - peak / 2 > 0 === f(a) - peak / 2 > 0) a = m;
        else b = m;
      }
      return (a + b) / 2;
    };
    const [t1, t2] = [solve(100, 200), solve(200, 330)];
    svg.line(g.X(t1), g.Y(peak / 2) - 12, g.X(t1), g.Y(peak / 2) + 12, {
      color: COLORS.black,
      width: 2,
    });
    svg.line(g.X(t2), g.Y(peak / 2) - 12, g.X(t2), g.Y(peak / 2) + 12, {
      color: COLORS.black,
      width: 2,
    });
    svg.arrow(g.X(t1) + 1, g.Y(peak / 2), g.X(t2) - 1, g.Y(peak / 2), {
      color: COLORS.black,
      width: 2,
      head: 14,
      start: true,
    });
    note(svg, g.X(290), g.Y(0.72), 'Width ≈ 100 MeV', { anchor: 'start', size: 24 });
    svg.squiggle(g.X(287), g.Y(0.72), g.X(210), g.Y(peak / 2) - 4, { waves: 1, amp: 5 });
    lab(svg, g.X(270), g.Y(1.06), 'Δ^{++}', { anchor: 'start', size: 26 });
    svg.squiggle(g.X(265), g.Y(1.06), g.X(205), g.Y(peak) - 6, { waves: 1, amp: 4 });
    lab(svg, g.X(320), g.Y(0.88), 'π^+ + p → π^+ + p', { anchor: 'start', size: 26 });
    svg.text(28, g.Y(0.5), 'Number of interactions', { size: 22, math: false, rotate: -90 });
    svg.text(g.X(475), 460, 'KE of \\it{π}^+ (MeV)', { size: 22, math: false });
    return svg.render();
  },

  // 33.5 Fig. 8 — quark-flow diagram of π⁺ + p → Δ⁺⁺
  Figure_33_05_08: () => {
    const svg = new Svg({
      width: 500,
      height: 540,
      title: 'Quark diagram of π⁺ + p → Δ⁺⁺',
      desc: 'The π⁺ (an up quark and an anti-down quark) and the proton (down, up, up) combine. The pion’s anti-down quark annihilates with the proton’s down quark, exchanging gluons with the other quarks, and the three remaining up quarks form the Δ⁺⁺.',
    });
    const circ = (x, y, label) => {
      svg.circle(x, y, 18, { fill: '#ffffff', stroke: COLORS.black, width: 1.8 });
      svg.text(x, y + 1, label, { size: 22, halo: false });
    };
    svg.ellipse(250, 92, 225, 40, { stroke: COLORS.black, width: 2 });
    svg.ellipse(115, 445, 88, 36, { stroke: COLORS.black, width: 2 });
    svg.ellipse(355, 445, 130, 36, { stroke: COLORS.black, width: 2 });
    const up = (x1, x2) => {
      svg.line(x1, 427, x2, 110, { color: COLORS.black, width: 2 });
      midArrow(svg, [x1, 427], [x2, 110], { at: 0.12, color: COLORS.black, size: 16 });
      midArrow(svg, [x1, 427], [x2, 110], { at: 0.85, color: COLORS.black, size: 16 });
    };
    up(75, 75);
    up(365, 335);
    up(430, 415);
    svg.path('M 150 427 Q 150 300 217 300 Q 285 300 285 427', { color: COLORS.black, width: 2 });
    midArrow(svg, [150, 427], [150, 380], { color: COLORS.black, size: 16 });
    midArrow(svg, [285, 427], [285, 380], { color: COLORS.black, size: 16 });
    gluon(svg, [75, 270], [168, 322], { n: 6, a: 6 });
    gluon(svg, [267, 322], [362, 270], { n: 6, a: 6 });
    circ(75, 92, 'u');
    circ(335, 92, 'u');
    circ(415, 92, 'u');
    circ(75, 445, 'u');
    circ(150, 445, '\\bar{d}');
    circ(285, 445, 'd');
    circ(365, 445, 'u');
    circ(430, 445, 'u');
    lab(svg, 250, 30, 'Δ^{++}', { size: 28 });
    lab(svg, 115, 510, 'π^+', { size: 28 });
    lab(svg, 355, 510, 'p', { size: 28 });
    return svg.render();
  },

  // 33.6 Fig. 1 — Feynman diagram for Z⁰ exchange
  Figure_33_06_01: () =>
    feynman({
      title: 'Feynman diagram of virtual Z⁰ exchange',
      desc: 'A Feynman diagram with time t up and position x to the right. An electron and an electron neutrino approach each other, exchange a virtual Z⁰ boson, and move apart: the weak nuclear force acting between them.',
      legs: {
        inL: [ELECTRON, 'e^−', 26],
        outL: [ELECTRON, 'e^−', 26],
        inR: [NEUTRINO, 'ν_e', 14],
        outR: [NEUTRINO, 'ν_e', 14],
      },
      carrier: (svg, x, y) => svg.circle(x, y, 9, { fill: '#1aa68a' }),
      carrierLabel: svg => lab(svg, 295, 345, 'Z^0', { size: 30 }),
      sideLabels: (svg, key, x, y, label) => {
        const at = {
          inL: [x + 10, y + 50],
          outL: [x + 32, y - 75],
          inR: [x + 8, y + 42],
          outR: [x + 50, y - 72],
        }[key];
        lab(svg, ...at, label, { size: 30, anchor: 'middle' });
      },
    }),

  // 33.6 Fig. 3 — pion exchange at the level of quarks
  Figure_33_06_03: () => {
    const svg = new Svg({
      width: 800,
      height: 730,
      title: 'Pion exchange between nucleons, at the quark level',
      desc: 'A quark-level Feynman diagram of the interaction in which a proton and a neutron exchange a π⁺. A d–anti-d pair is created near the proton (d, u, u). One of the proton’s up quarks leaves with the anti-down quark as a π⁺, and the new down quark stays behind, so the proton becomes a neutron (d, u, d). At the neutron (d, d, u), the anti-down quark annihilates with a down quark and the up quark stays, so the neutron becomes a proton (u, d, u). Wavy lines are gluons exchanged among the quarks.',
    });
    const W = 800;
    // Quark lines of the left nucleon bow toward the center; the right ones mirror them.
    const Lq = (k, t) => {
      const [b, c, e] = [
        [160 + 34 * k, 600],
        [370 + 34 * k, 360],
        [160 + 34 * k, 125],
      ];
      const m = 1 - t;
      return [
        m * m * b[0] + 2 * m * t * c[0] + t * t * e[0],
        m * m * b[1] + 2 * m * t * c[1] + t * t * e[1],
      ];
    };
    const Rq = (k, t) => {
      const [x, y] = Lq(k, t);
      return [W - x, y];
    };
    const span = (f, k, t1, t2, n = 30) =>
      Array.from({ length: n + 1 }, (_, j) => f(k, t1 + ((t2 - t1) * j) / n));
    const draw = pts => svg.path(smoothPath(pts, 0.5), { color: COLORS.black, width: 1.6 });
    const ahead = (pts, at) => {
      const i = Math.max(1, Math.round((pts.length - 1) * at));
      midArrow(svg, pts[i - 1], pts[i], { at: 1, color: COLORS.black, size: 14 });
    };
    const C = [352, 418]; // a d–anti-d pair is created
    const A = [452, 372]; // the anti-d annihilates with the neutron's d
    const U = [400, 330]; // the pion's up quark
    // Spectator quarks pass straight through.
    for (const f of [Lq, Rq])
      for (const k of [0, 1]) {
        const pts = span(f, k, 0, 1);
        draw(pts);
        ahead(pts, 0.3);
        ahead(pts, 0.75);
      }
    // The proton's up quark leaves in the pion and ends in the new proton.
    const u = [...span(Lq, 2, 0, 0.42, 12), U, [440, 322], ...span(Rq, 2, 0.66, 1, 12)];
    draw(u);
    ahead(u, 0.25);
    ahead(u, 0.85);
    // One down-quark line: up from the neutron to A, back in time as the anti-d to C,
    // and up again as the d that ends in the new neutron.
    const dIn = [...span(Rq, 2, 0, 0.42, 12), A];
    const dOut = [C, ...span(Lq, 2, 0.6, 1, 12)];
    draw(dIn);
    ahead(dIn, 0.4);
    svg.line(...A, ...C, { color: COLORS.black, width: 1.6 });
    midArrow(svg, A, C, { at: 0.75, color: COLORS.black, size: 14 });
    draw(dOut);
    ahead(dOut, 0.75);
    // Gluons between neighboring quarks.
    for (const t of [0.12, 0.2, 0.8, 0.88]) {
      wiggle(svg, Lq(0, t), Lq(1, t), { waves: 2, amp: 3 });
      wiggle(svg, Rq(0, t), Rq(1, t), { waves: 2, amp: 3 });
    }
    for (const t of [0.16, 0.84]) {
      wiggle(svg, Lq(1, t), Lq(2, t), { waves: 2, amp: 3 });
      wiggle(svg, Rq(1, t), Rq(2, t), { waves: 2, amp: 3 });
    }
    // The nucleons, with their quarks at the ends of the lines.
    const nucl = (f, t, colors, quarks) => {
      const [x, y] = f(1, t);
      particle(svg, x, y + (t < 0.5 ? 6 : -6), 70, colors);
      quarks.forEach(([label, color], k) =>
        quark(svg, ...f(k, t), label, color, { r: 15, size: 20 })
      );
    };
    nucl(Lq, 0.02, PROTON, [
      ['d', 'R'],
      ['u', 'G'],
      ['u', 'B'],
    ]);
    nucl(Lq, 0.98, NEUTRON, [
      ['d', 'R'],
      ['u', 'G'],
      ['d', 'B'],
    ]);
    nucl(Rq, 0.02, NEUTRON, [
      ['u', 'G'],
      ['d', 'R'],
      ['d', 'B'],
    ]);
    nucl(Rq, 0.98, PROTON, [
      ['u', 'G'],
      ['d', 'R'],
      ['u', 'B'],
    ]);
    // The pion: the up quark and the anti-down quark traveling together.
    const dbar = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2];
    svg.add(
      `<ellipse cx="${fmt((U[0] + dbar[0]) / 2)}" cy="${fmt((U[1] + dbar[1]) / 2)}" rx="26" ry="58" transform="rotate(${fmt((Math.atan2(dbar[0] - U[0], U[1] - dbar[1]) * 180) / Math.PI)} ${fmt((U[0] + dbar[0]) / 2)} ${fmt((U[1] + dbar[1]) / 2)})" fill="none" stroke="#1aa6c9" stroke-width="2"/>`
    );
    quark(svg, ...U, 'u', 'B', { r: 15, size: 20 });
    quark(svg, ...dbar, '\\bar{d}', 'aR', { r: 15, size: 20 });
    lab(svg, U[0] - 34, U[1] - 34, 'π^+', { size: 24 });
    // Pair creation and annihilation callouts.
    const pair = (x, y, text) => {
      quark(svg, x - 26, y, 'd', 'B', { r: 15, size: 20 });
      svg.text(x, y, '+', { size: 22, math: false, halo: false });
      quark(svg, x + 26, y, '\\bar{d}', 'aR', { r: 15, size: 20 });
      note(svg, x, y + 34, text, { size: 22 });
    };
    pair(360, 500, 'Created');
    svg.squiggle(360, 480, C[0], C[1] + 8, { waves: 1, amp: 5 });
    pair(440, 590, 'Annihilate');
    svg.squiggle(458, 570, A[0] + 2, A[1] + 10, { waves: 1.5, amp: 5 });
    txAxes(svg, 20, 690, 80, 80, 24);
    const [tl, tr] = [Lq(1, 1)[0], Rq(1, 1)[0]];
    note(svg, tl, 25, 'Neutron', { size: 24 });
    note(svg, tr, 25, 'Proton', { size: 24 });
    note(svg, tl, 705, 'Proton', { size: 24 });
    note(svg, tr, 705, 'Neutron', { size: 24 });
    return svg.render();
  },

  // 33.6 Fig. 4 — the strengths of the forces converging at high energy
  Figure_33_06_04: () => {
    const svg = new Svg({
      width: 900,
      height: 450,
      title: 'Unification of the forces at high energy',
      desc: 'A schematic of the relative strengths of the four forces versus energy on a logarithmic scale. The electromagnetic and weak forces merge into the electroweak force near 100 GeV. The electroweak and strong forces are proposed to merge (GUT) near 10^15 GeV, and all four, including gravity, might merge (TOE) near 10^19 GeV.',
    });
    const g = new Plot(svg, {
      x: 120,
      y: 30,
      w: 700,
      h: 320,
      xRange: [-1, 21],
      yRange: [0, 340],
    });
    g.axes({ arrows: true });
    const curve = pts => g.series(pts, { color: COLORS.maroon, width: 3, smooth: true });
    curve([
      [-0.2, 318],
      [5, 232],
      [10, 180],
      [15, 146],
      [19, 116],
      [21, 98],
    ]);
    curve([
      [-0.2, 153],
      [1, 140],
      [2, 134],
    ]);
    curve([
      [-0.2, 80],
      [0.9, 116],
      [2, 134],
    ]);
    curve([
      [2, 134],
      [8, 134],
      [15, 146],
    ]);
    curve([
      [-0.2, 18],
      [6, 68],
      [13, 103],
      [19, 116],
    ]);
    for (const [x, y] of [
      [2, 134],
      [15, 146],
      [19, 116],
    ])
      svg.circle(g.X(x), g.Y(y), 5.5, { fill: COLORS.black });
    for (const [x, t] of [
      [2, '100'],
      [15, '10^{15}'],
      [19, '10^{19}'],
    ]) {
      svg.line(g.X(x), g.Y(0), g.X(x), g.Y(0) + 7, { color: COLORS.axis, width: 1.5 });
      svg.text(g.X(x), g.Y(0) + 30, t, { size: 22, math: false });
    }
    const n = (x, y, t) => note(svg, g.X(x), g.Y(y), t, { size: 22 });
    n(2.5, 300, 'Strong');
    n(1, 175, 'EM');
    n(1.8, 80, 'Weak');
    n(8, 158, 'Electroweak');
    n(10, 60, 'Gravity');
    n(15, 175, 'GUT');
    n(19.2, 145, 'TOE');
    note(svg, 840, g.Y(0) + 4, 'GeV', { anchor: 'start', size: 22 });
    note(svg, g.X(10), 430, 'Energy', { size: 22 });
    note(svg, 108, 30, 'Strength', { anchor: 'end', size: 22 });
    return svg.render();
  },

  // 33.6 Fig. 6 — a cosmic-ray air shower
  Figure_33_06_06: () => {
    const svg = new Svg({
      width: 875,
      height: 550,
      title: 'A cosmic-ray air shower',
      desc: 'An extremely energetic cosmic ray enters the Earth’s atmosphere and collides with a nucleus high above the ground, creating a spray of particles. Each of these creates further particles, so a shower spreading over a large area reaches the Earth’s surface.',
    });
    define(
      svg,
      'sky33',
      '<linearGradient id="sky33" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#cfe6f5"/><stop offset="0.75" stop-color="#f6dcd8"/></linearGradient><linearGradient id="sea33" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9dd0ee"/><stop offset="1" stop-color="#5aa8dc"/></linearGradient>'
    );
    svg.rect(0, 0, 875, 550, { fill: 'url(#sky33)' });
    // The Earth's curved surface: a wide arc, land along its rim and a few continents.
    const R = 1900;
    const [ex, ey] = [440, 380 + R];
    svg.circle(ex, ey, R, { fill: '#96cc74' });
    svg.circle(ex, ey, R - 22, { fill: 'url(#sea33)' });
    for (const [x, y, w, h] of [
      [180, 470, 90, 30],
      [560, 455, 120, 40],
      [470, 520, 70, 25],
      [760, 500, 90, 45],
    ])
      svg.ellipse(x, y, w, h, { fill: '#a6d483', stroke: 'none', width: 0 });
    // The shower: a fixed branching tree, regenerated identically every time.
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const branch = (x, y, angle, len, depth) => {
      const x2 = x + len * Math.cos(angle);
      const y2 = y + len * Math.sin(angle);
      svg.line(x, y, x2, y2, { color: COLORS.black, width: 2 - depth * 0.3 });
      if (depth >= 3) return;
      const n = depth === 0 ? 2 : 2 + Math.round(rnd());
      for (let k = 0; k < n; k += 1) {
        const a = angle + (k - (n - 1) / 2) * (0.5 - depth * 0.08) + (rnd() - 0.5) * 0.15;
        branch(x2, y2, a, len * (0.45 + 0.15 * rnd()), depth + 1);
      }
    };
    const origin = [570, 305];
    for (const a of [2.35, 2.05, 1.8, 1.55, 1.3, 1.05, 0.75])
      branch(...origin, a, 75 + 40 * rnd(), 1);
    svg.line(805, 10, origin[0], origin[1], { color: COLORS.black, width: 2 });
    midArrow(svg, [805, 10], origin, { at: 0.42, color: COLORS.black, size: 18 });
    svg.lines(710, 160, ['Extremely', 'energetic', 'cosmic ray'], {
      size: 24,
      math: false,
      anchor: 'start',
    });
    note(svg, 25, 368, 'Atmosphere', { anchor: 'start', size: 24 });
    note(svg, 25, 495, 'Earth’s surface', { anchor: 'start', size: 24 });
    return svg.render();
  },
};
