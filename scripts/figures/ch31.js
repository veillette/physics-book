/**
 * Chapter 31: radioactivity and nuclear physics — the nucleus, alpha and beta
 * decay, the uranium-238 decay series, half-life, binding energy, the range of
 * the nuclear force, and tunneling.
 *
 * The decay curve is N = N0(1/2)^{t/t½}. The binding-energy curve joins
 * measured BE/A values of stable nuclides (about 55, from ²H to ²³⁸U), so the
 * ⁴He spike and the peak near ⁵⁶Fe and ⁶²Ni are real. The ²³⁸U series places
 * each nuclide at its (Z, N) with the half-lives and branches of the original
 * figure. Nuclei are close-packed spheres seen in perspective. In the
 * tunneling figure the wave function is sinusoidal outside the barrier and
 * decays exponentially inside it, with value and slope matched at both edges.
 */
import { COLORS, Plot, Svg } from './svg.js';

export const PROTON = ['#7d93c9', '#1f2f5f'];
export const NEUTRON = ['#b6e09a', '#3f8f3a'];
const CURVE = COLORS.maroon;
const GO = '#4caf2a';
const ALPHA = '#c0222f';
const BETA = '#7a4fb0';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, math: false, ...o });
}

/** One shaded nucleon (or other particle) of radius r. */
export function nucleon(svg, x, y, r, [mid, edge]) {
  // IDs depend on geometry, so filtered and full generation produce identical files.
  const id = `n31_${Math.round(x * 10)}_${Math.round(y * 10)}_${r}_${mid.slice(1)}`;
  svg.add(
    `<defs><radialGradient id="${id}" cx="0.36" cy="0.32" r="0.72"><stop offset="0" stop-color="#ffffff"/><stop offset="0.4" stop-color="${mid}"/><stop offset="1" stop-color="${edge}"/></radialGradient></defs>`
  );
  svg.circle(x, y, r, { fill: `url(#${id})` });
}

/**
 * A nucleus of `count` nucleons (`protons` of them protons) packed into a
 * ball, drawn back to front around (cx, cy) with nucleon radius r. The packing
 * and the proton positions are fixed by `seed`, so files regenerate identically.
 */
export function nucleus(svg, cx, cy, count, protons, { r = 12, seed = 1 } = {}) {
  const pts = [];
  // Face-centered cubic lattice points, nearest to the center first.
  for (let i = -4; i <= 4; i += 1)
    for (let j = -4; j <= 4; j += 1)
      for (let k = -4; k <= 4; k += 1)
        if ((i + j + k) % 2 === 0)
          pts.push([i, j, k, i * i + j * j + k * k + 1e-3 * ((i * 7 + j * 3 + k * 5 + seed) % 11)]);
  pts.sort((a, b) => a[3] - b[3]);
  const chosen = pts.slice(0, count);
  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const kinds = chosen.map(() => rnd());
  const order = kinds.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
  const isProton = new Set(order.slice(0, protons).map(([, i]) => i));
  // Neighbors on this lattice are √2 apart, so this spacing lets the spheres just overlap.
  const scale = r * 1.3;
  chosen
    .map((p, i) => ({ p, i }))
    .sort((a, b) => a.p[2] - b.p[2])
    .forEach(({ p, i }) => {
      const x = cx + scale * (p[0] + 0.35 * p[2]);
      const y = cy + scale * (p[1] - 0.25 * p[2]);
      nucleon(svg, x, y, r, isProton.has(i) ? PROTON : NEUTRON);
    });
}

/** A small labeled particle (electron, positron, neutrino) with its arrow. */
function particle(svg, x, y, r, colors, label, [dx, dy], { labelDx = 18, labelDy = 0 } = {}) {
  nucleon(svg, x, y, r, colors);
  svg.arrow(x + dx * 0.25, y + dy * 0.25, x + dx, y + dy, { color: GO, width: 3.5, head: 18 });
  lab(svg, x + labelDx, y + labelDy, label, { anchor: 'start', size: 26 });
}

/** Before | After panels for a decay: parent on the left, daughter on the right. */
function decayPanels(svg, { title, parent, daughter, extras }) {
  if (title) lab(svg, 250, 28, title, { size: 28 });
  note(svg, 30, 80, 'Before', { anchor: 'start', size: 26 });
  note(svg, 285, 80, 'After', { size: 26 });
  svg.line(170, 70, 170, 290, { color: COLORS.black, width: 2 });
  nucleus(svg, 75, 170, ...parent);
  note(svg, 75, 262, 'Parent', { size: 26 });
  nucleus(svg, 285, 170, ...daughter);
  note(svg, 285, 262, 'Daughter', { size: 26 });
  extras();
}

/** Measured binding energy per nucleon (MeV) of stable nuclides: [name, A, BE/A]. */
export const BE = [
  ['2H', 2, 1.112],
  ['3He', 3, 2.573],
  ['4He', 4, 7.074],
  ['6Li', 6, 5.332],
  ['7Li', 7, 5.606],
  ['9Be', 9, 6.463],
  ['10B', 10, 6.475],
  ['11B', 11, 6.928],
  ['12C', 12, 7.68],
  ['14N', 14, 7.476],
  ['16O', 16, 7.976],
  ['19F', 19, 7.779],
  ['20Ne', 20, 8.032],
  ['23Na', 23, 8.112],
  ['24Mg', 24, 8.261],
  ['27Al', 27, 8.332],
  ['28Si', 28, 8.448],
  ['31P', 31, 8.481],
  ['32S', 32, 8.493],
  ['35Cl', 35, 8.52],
  ['40Ca', 40, 8.551],
  ['45Sc', 45, 8.619],
  ['48Ti', 48, 8.723],
  ['51V', 51, 8.742],
  ['52Cr', 52, 8.776],
  ['55Mn', 55, 8.765],
  ['56Fe', 56, 8.79],
  ['59Co', 59, 8.768],
  ['62Ni', 62, 8.795],
  ['63Cu', 63, 8.752],
  ['64Zn', 64, 8.736],
  ['74Ge', 74, 8.725],
  ['80Se', 80, 8.711],
  ['84Kr', 84, 8.717],
  ['88Sr', 88, 8.733],
  ['90Zr', 90, 8.71],
  ['98Mo', 98, 8.635],
  ['107Ag', 107, 8.554],
  ['120Sn', 120, 8.505],
  ['130Te', 130, 8.43],
  ['138Ba', 138, 8.393],
  ['140Ce', 140, 8.376],
  ['152Sm', 152, 8.244],
  ['158Gd', 158, 8.202],
  ['175Lu', 175, 8.069],
  ['180Hf', 180, 8.035],
  ['184W', 184, 8.005],
  ['197Au', 197, 7.916],
  ['200Hg', 200, 7.906],
  ['208Pb', 208, 7.868],
  ['209Bi', 209, 7.848],
  ['226Ra', 226, 7.662],
  ['232Th', 232, 7.615],
  ['238U', 238, 7.57],
];

/**
 * Binding energy per nucleon versus mass number for stable nuclides. `fusion`, if given, is
 * called with the Svg and Plot to add annotations (31.6 Fig. 3 uses none; 32.5 Fig. 2 adds one).
 */
export function bindingEnergy({ title = 'Binding energy per nucleon', desc, fusion } = {}) {
  const svg = new Svg({
    width: 760,
    height: 600,
    title,
    desc:
      desc ??
      'Average binding energy per nucleon, BE/A in MeV, versus mass number A for stable nuclei. It rises steeply from 1.1 MeV for ²H, with a spike at ⁴He (7.07 MeV) above ⁶Li and ⁷Li, to a broad peak of about 8.8 MeV near A = 60 (⁵⁶Fe and ⁶²Ni), then falls slowly to 7.6 MeV at ²³⁸U as Coulomb repulsion grows.',
  });
  const g = new Plot(svg, {
    x: 110,
    y: 50,
    w: 600,
    h: 440,
    xRange: [0, 250],
    yRange: [0, 9.8],
    xTicks: [0, 50, 100, 150, 200],
    yTicks: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
  g.axes({ arrows: true, size: 18 });
  g.series(
    BE.map(([, A, v]) => [A, v]),
    { color: COLORS.black, width: 1.6 }
  );
  for (const [, A, v] of BE) svg.circle(...g.P(A, v), 2.6, { fill: COLORS.black });
  const tagged = {
    '2H': [14, 6],
    '3He': [16, 0],
    '4He': [-2, -16],
    '6Li': [14, 10],
    '7Li': [14, 0],
    '11B': [14, 8],
    '12C': [-6, -14],
    '16O': [-8, -14],
    '20Ne': [-12, -22],
    '24Mg': [0, -30],
    '40Ca': [0, 22],
    '56Fe': [0, 22],
    '62Ni': [4, -22],
    '64Zn': [10, 22],
    '84Kr': [0, 22],
    '98Mo': [0, 22],
    '130Te': [0, 22],
    '152Sm': [0, 22],
    '175Lu': [0, 22],
    '200Hg': [0, 22],
    '226Ra': [0, 22],
    '238U': [6, 22],
  };
  for (const [name, A, v] of BE) {
    const t = tagged[name];
    if (!t) continue;
    const [, mass, sym] = name.match(/^(\d+)([A-Za-z]+)$/);
    const withMass = [
      '2H',
      '3He',
      '4He',
      '6Li',
      '7Li',
      '11B',
      '12C',
      '16O',
      '20Ne',
      '24Mg',
      '62Ni',
      '238U',
    ].includes(name);
    const [x, y] = g.P(A, v);
    svg.text(x + t[0], y + t[1], withMass ? `^{${mass}}\\rm{${sym}}` : `\\rm{${sym}}`, {
      size: 16,
      anchor: t[0] > 8 ? 'start' : t[0] < -4 ? 'end' : 'middle',
    });
  }
  svg.text(g.X(250) + 20, g.Y(0) + 4, 'A', { size: 22, anchor: 'start' });
  svg.text(g.X(125), g.Y(0) + 54, 'Mass number', { size: 20, math: false });
  svg.text(40, g.Y(4.9), 'Binding energy per nucleon, BE/\\it{A} (MeV)', {
    size: 20,
    math: false,
    rotate: -90,
  });
  if (fusion) fusion(svg, g);
  return svg.render();
}

export default {
  // 31.3 Fig. 2 — a model of the nucleus
  Figure_31_03_02: () => {
    const svg = new Svg({
      width: 500,
      height: 200,
      title: 'A model of the nucleus',
      desc: 'A nucleus drawn as a tight cluster of spheres: protons in blue and neutrons in green.',
    });
    nucleus(svg, 100, 100, 26, 12, { r: 15, seed: 3 });
    nucleon(svg, 290, 62, 16, PROTON);
    note(svg, 320, 62, 'Proton', { anchor: 'start', size: 30 });
    nucleon(svg, 290, 138, 16, NEUTRON);
    note(svg, 320, 138, 'Neutron', { anchor: 'start', size: 30 });
    return svg.render();
  },

  // 31.4 Fig. 1 — the uranium-238 decay series
  Figure_31_04_01: () => {
    const svg = new Svg({
      width: 680,
      height: 1000,
      title: 'The uranium-238 decay series',
      desc: 'Nuclides of the uranium-238 decay series plotted by proton number Z (80 to 92) and neutron number N (124 to 146). Alpha decays (red arrows) lower Z and N by 2 each; beta decays (purple arrows) raise Z by 1 and lower N by 1. 238U (4.5 × 10^9 y) α→ 234Th (24 d) β→ 234Pa (6.7 h) β→ 234U (2.5 × 10^5 y) α→ 230Th (7.5 × 10^4 y) α→ 226Ra (1600 y) α→ 222Rn (3.8 d) α→ 218Po (3.1 m), which branches by α to 214Pb or by β to 218At (2 s). The chain continues through 214Bi, 214Po, 210Tl, 210Pb (22 y), 210Bi (5 d), 206Hg, 206Tl and 210Po (138 d) to stable 206Pb.',
    });
    const X = z => 70 + (z - 79) * 42;
    const Y = n => 960 - (n - 123) * 40;
    svg.arrow(X(79), Y(123), X(79), Y(147) - 6, { color: COLORS.black, width: 1.5, head: 10 });
    svg.arrow(X(79), Y(123), X(93) + 14, Y(123), { color: COLORS.black, width: 1.5, head: 10 });
    for (let z = 80; z <= 92; z += 1) {
      svg.line(X(z), Y(123), X(z), Y(123) + 6, { color: COLORS.axis, width: 1 });
      svg.text(X(z), Y(123) + 22, String(z), { size: 15, math: false });
    }
    for (let n = 124; n <= 146; n += 1) {
      svg.line(X(79) - 6, Y(n), X(79), Y(n), { color: COLORS.axis, width: 1 });
      svg.text(X(79) - 10, Y(n), String(n), { size: 15, math: false, anchor: 'end' });
    }
    svg.text(X(93) + 22, Y(123) + 4, 'Z', { size: 20, anchor: 'start' });
    svg.text(X(79), Y(147) - 20, 'N', { size: 20 });
    const nuc = {
      U238: [92, 146],
      Th234: [90, 144],
      Pa234: [91, 143],
      U234: [92, 142],
      Th230: [90, 140],
      Ra226: [88, 138],
      Rn222: [86, 136],
      Po218: [84, 134],
      At218: [85, 133],
      Rn218: [86, 132],
      Pb214: [82, 132],
      Bi214: [83, 131],
      Po214: [84, 130],
      Tl210: [81, 129],
      Pb210: [82, 128],
      Bi210: [83, 127],
      Po210: [84, 126],
      Hg206: [80, 126],
      Tl206: [81, 125],
      Pb206: [82, 124],
    };
    const P = k => [X(nuc[k][0]), Y(nuc[k][1])];
    // [from, to, half-life label, label offset]
    const steps = [
      ['U238', 'Th234', '4.5 × 10^9 \\rm{y}', [26, 6]],
      ['Th234', 'Pa234', '24 \\rm{d}', [-34, 14]],
      ['Pa234', 'U234', '6.7 \\rm{h}', [-34, 12]],
      ['U234', 'Th230', '2.5 × 10^5 \\rm{y}', [40, 6]],
      ['Th230', 'Ra226', '7.5 × 10^4 \\rm{y}', [40, 6]],
      ['Ra226', 'Rn222', '1600 \\rm{y}', [36, 6]],
      ['Rn222', 'Po218', '3.8 \\rm{d}', [30, 6]],
      ['Po218', 'Pb214', '3.1 \\rm{m}', [-30, -14]],
      ['Po218', 'At218', '', [0, 0]],
      ['At218', 'Bi214', '2 \\rm{s}', [-14, 14]],
      ['At218', 'Rn218', '2 \\rm{s}', [20, -6]],
      ['Rn218', 'Po214', '35 \\rm{ms}', [30, 6]],
      ['Pb214', 'Bi214', '27 \\rm{m}', [6, -10]],
      ['Bi214', 'Po214', '21 \\rm{m}', [14, -14]],
      ['Bi214', 'Tl210', '21 \\rm{m}', [-30, 0]],
      ['Po214', 'Pb210', '0.16 \\rm{ms}', [40, 6]],
      ['Tl210', 'Pb210', '1.3 \\rm{m}', [-28, 6]],
      ['Pb210', 'Bi210', '22 \\rm{y}', [-10, 14]],
      ['Pb210', 'Hg206', '22 \\rm{y}', [-30, -8]],
      ['Bi210', 'Po210', '5 \\rm{d}', [14, -10]],
      ['Bi210', 'Tl206', '5 \\rm{d}', [16, 8]],
      ['Po210', 'Pb206', '138 \\rm{d}', [32, 6]],
      ['Hg206', 'Tl206', '8.2 \\rm{m}', [-30, 2]],
      ['Tl206', 'Pb206', '4.2 \\rm{m}', [10, -10]],
    ];
    for (const [a, b, s, [dx, dy]] of steps) {
      const [A, B] = [P(a), P(b)];
      const alpha = nuc[a][0] - nuc[b][0] === 2;
      const L = Math.hypot(B[0] - A[0], B[1] - A[1]);
      const u = [(B[0] - A[0]) / L, (B[1] - A[1]) / L];
      svg.arrow(A[0] + u[0] * 5, A[1] + u[1] * 5, B[0] - u[0] * 5, B[1] - u[1] * 5, {
        color: alpha ? ALPHA : BETA,
        width: 2,
        head: 10,
      });
      if (s) svg.text((A[0] + B[0]) / 2 + dx, (A[1] + B[1]) / 2 + dy, s, { size: 15 });
    }
    for (const k of Object.keys(nuc)) {
      const [x, y] = P(k);
      svg.circle(x, y, 4, { fill: COLORS.black });
      const [, sym, A] = k.match(/^([A-Za-z]+)(\d+)$/);
      const right = [
        'Pa234',
        'U234',
        'At218',
        'Rn218',
        'Po214',
        'Pb210',
        'Bi210',
        'Po210',
        'Tl206',
        'Pb206',
      ].includes(k);
      svg.text(x + (right ? 8 : -8), y - 12, `^{${A}}\\rm{${sym}}`, {
        size: 16,
        anchor: right ? 'start' : 'end',
      });
    }
    svg.arrow(X(84) + 30, 70, X(84) - 10, 110, { color: ALPHA, width: 2, head: 10 });
    svg.text(X(84) + 40, 92, 'α decay', { size: 18, anchor: 'start' });
    svg.arrow(X(84) - 4, 132, X(84) + 16, 152, { color: BETA, width: 2, head: 10 });
    svg.text(X(84) + 40, 142, 'β decay', { size: 18, anchor: 'start' });
    return svg.render();
  },

  // 31.4 Fig. 2 — alpha decay
  Figure_31_04_02: () => {
    const svg = new Svg({
      width: 620,
      height: 300,
      title: 'Alpha decay',
      desc: 'Before: a parent nucleus. After: a daughter nucleus with two fewer protons and two fewer neutrons, and an alpha particle (two protons and two neutrons) moving away.',
    });
    decayPanels(svg, {
      parent: [26, 12, { r: 12, seed: 5 }],
      daughter: [22, 10, { r: 12, seed: 5 }],
      extras: () => {
        nucleon(svg, 420, 178, 11, NEUTRON);
        nucleon(svg, 436, 170, 11, PROTON);
        nucleon(svg, 428, 160, 11, NEUTRON);
        nucleon(svg, 412, 166, 11, PROTON);
        svg.arrow(452, 168, 600, 168, { color: GO, width: 3.5, head: 18 });
        lab(svg, 430, 214, 'α', { size: 30 });
      },
    });
    return svg.render();
  },

  // 31.4 Fig. 4 — beta-minus decay
  Figure_31_04_04: () => {
    const svg = new Svg({
      width: 560,
      height: 300,
      title: 'Beta-minus decay',
      desc: 'Before: a parent nucleus. After: a daughter nucleus with one more proton and one fewer neutron, and an electron e− and an antineutrino moving away.',
    });
    decayPanels(svg, {
      title: 'β^− \\rm{decay}',
      parent: [26, 11, { r: 12, seed: 7 }],
      daughter: [26, 12, { r: 12, seed: 7 }],
      extras: () => {
        particle(svg, 395, 140, 9, ['#d8c9ea', '#6f5aa0'], 'e^−', [60, -50], {
          labelDx: 70,
          labelDy: -46,
        });
        particle(svg, 395, 220, 8, ['#d2a46a', '#5f3a14'], '\\bar{ν}_e', [60, 50], {
          labelDx: 70,
          labelDy: 46,
        });
      },
    });
    return svg.render();
  },

  // 31.4 Fig. 5 — beta-plus decay
  Figure_31_04_05: () => {
    const svg = new Svg({
      width: 560,
      height: 300,
      title: 'Beta-plus decay',
      desc: 'Before: a parent nucleus. After: a daughter nucleus with one fewer proton and one more neutron, and a positron e+ and a neutrino moving away.',
    });
    decayPanels(svg, {
      title: 'β^+ \\rm{decay}',
      parent: [26, 13, { r: 12, seed: 9 }],
      daughter: [26, 12, { r: 12, seed: 9 }],
      extras: () => {
        particle(svg, 395, 140, 9, ['#cfe0f6', '#3a5f9a'], 'e^+', [60, -50], {
          labelDx: 70,
          labelDy: -46,
        });
        particle(svg, 395, 220, 8, ['#d2a46a', '#5f3a14'], 'ν_e', [60, 50], {
          labelDx: 70,
          labelDy: 46,
        });
      },
    });
    return svg.render();
  },

  // 31.5 Fig. 1 — radioactive decay over ten half-lives
  Figure_31_05_01: () => {
    const svg = new Svg({
      width: 760,
      height: 600,
      title: 'Radioactive decay',
      desc: 'The number of radioactive nuclei, N, starting from 1,000,000, versus time in multiples of the half-life t1/2. Each half-life halves the number: 500,000 after one half-life, 250,000 after two, 125,000 after three, down to 977 after ten. The curve is an exponential decay, and a table beside it lists the values.',
    });
    const g = new Plot(svg, {
      x: 110,
      y: 60,
      w: 600,
      h: 400,
      xRange: [0, 10.6],
      yRange: [0, 1080],
      yTicks: [0, 125, 250, 500, 750, 1000],
    });
    g.axes({ arrows: true, size: 20 });
    g.fn(t => 1000 * 0.5 ** t, 0, 10, { n: 400, color: CURVE, width: 3.5 });
    for (let k = 0; k <= 10; k += 1) {
      svg.circle(...g.P(k, 1000 * 0.5 ** k), 5, { fill: COLORS.black });
      if (k) svg.text(g.X(k), g.Y(0) + 26, k === 1 ? 't_{1/2}' : `${k}t_{1/2}`, { size: 18 });
    }
    for (const k of [1, 2, 3]) {
      const [x, y] = g.P(k, 1000 * 0.5 ** k);
      svg.line(g.X(0), y, x, y, { color: COLORS.black, width: 1.2, dash: '5 4' });
      svg.line(x, y, x, g.Y(0), { color: COLORS.black, width: 1.2, dash: '5 4' });
    }
    svg.text(g.X(5.3), g.Y(0) + 62, 'Time in multiples of \\it{t}_{1/2}', {
      size: 22,
      math: false,
    });
    svg.text(40, g.Y(540), 'Number of nuclides, \\it{N} × 10^3', {
      size: 22,
      math: false,
      rotate: -90,
    });
    // The table of values.
    const [tx, ty] = [480, 70];
    svg.rect(tx - 10, ty - 30, 260, 370, { fill: '#ffffff' });
    svg.text(tx + 50, ty, 'Time', { size: 20, math: false });
    svg.text(tx + 180, ty, 'N', { size: 20 });
    svg.line(tx, ty + 14, tx + 240, ty + 14, { color: COLORS.black, width: 1.4 });
    svg.line(tx + 100, ty - 22, tx + 100, ty + 330, { color: COLORS.black, width: 1.4 });
    for (let k = 0; k <= 10; k += 1) {
      const y = ty + 40 + k * 28;
      svg.text(tx + 90, y, k === 0 ? '0' : k === 1 ? 't_{1/2}' : `${k}t_{1/2}`, {
        size: 18,
        anchor: 'end',
      });
      svg.text(tx + 236, y, Math.round(1e6 * 0.5 ** k).toLocaleString('en-US'), {
        size: 18,
        math: false,
        anchor: 'end',
      });
    }
    return svg.render();
  },

  // 31.6 Fig. 3 — binding energy per nucleon
  Figure_31_06_03: () => bindingEnergy(),

  // 31.6 Fig. 4 — the short range of the nuclear force
  Figure_31_06_04: () => {
    const svg = new Svg({
      width: 600,
      height: 280,
      title: 'The range of the nuclear force',
      desc: 'A nucleus drawn as a cluster of nucleons. A dashed circle around one nucleon at its edge shows the range of the nuclear force: only the nucleons inside the circle feel that nucleon’s nuclear attraction directly.',
    });
    nucleus(svg, 260, 150, 30, 14, { r: 13, seed: 11 });
    svg.add(
      `<circle cx="226" cy="146" r="40" fill="none" stroke="${COLORS.black}" stroke-width="2" stroke-dasharray="6 5"/>`
    );
    note(svg, 20, 30, 'Nucleons inside range', { anchor: 'start', size: 24 });
    note(svg, 20, 58, 'feel nuclear force directly', { anchor: 'start', size: 24 });
    svg.squiggle(150, 74, 214, 130, { waves: 1.5, amp: 5 });
    note(svg, 300, 240, 'Range of nuclear force', { anchor: 'start', size: 24 });
    svg.squiggle(296, 236, 232, 186, { waves: 1.5, amp: 5 });
    return svg.render();
  },

  // 31.7 Fig. 1 — a marble trapped in a volcano's crater
  Figure_31_07_01: () => {
    const svg = new Svg({
      width: 640,
      height: 300,
      title: 'A marble trapped in a crater',
      desc: 'A marble rolls in a bowl at the top of a volcano. It has enough kinetic energy to reach the dashed line but not to get over the rim, so it is trapped. If it could find a tunnel through the side, shown shaded, it would escape, roll downhill and gain kinetic energy.',
    });
    svg.add(
      '<defs><linearGradient id="volcano31" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3b48f"/><stop offset="1" stop-color="#fde7da"/></linearGradient></defs>'
    );
    svg.path('M 0 290 L 250 40 Q 320 110 390 40 L 640 290 Z', {
      color: '#c97a4a',
      width: 1.5,
      fill: 'url(#volcano31)',
    });
    // The marble reaches the height of the dashed line, below the rim.
    svg.line(255, 54, 385, 54, { color: COLORS.black, width: 1.4, dash: '6 4' });
    svg.add('<path d="M 352 64 L 392 64 L 414 86 L 372 86 Z" fill="#9a9a9a" opacity="0.85"/>');
    for (let x = 356; x < 412; x += 6) svg.line(x, 64, x + 18, 86, { color: '#5a5a5a', width: 1 });
    svg.circle(272, 66, 11, { fill: '#7ac06a', stroke: '#3f7f3a', width: 1.5 });
    svg.circle(430, 112, 11, { fill: '#7ac06a', stroke: '#3f7f3a', width: 1.5 });
    svg.arrow(432, 126, 446, 150, { color: COLORS.black, width: 2, head: 11 });
    return svg.render();
  },

  // 31.7 Fig. 2 — the potential energy of an alpha particle and a nucleus
  Figure_31_07_02: () => {
    const svg = new Svg({
      width: 560,
      height: 500,
      title: 'Potential energy of an alpha particle near a nucleus',
      desc: 'Total potential energy versus distance r from the center of a nucleus. Inside the nucleus the attractive nuclear force makes a deep well; at its edge the energy rises sharply to the top of the Coulomb barrier, then falls off as 1/r outside, where the repulsive Coulomb force acts. An alpha particle inside, with energy shown by a dashed line, lacks the energy to get over the rim; outside, an alpha particle of the same energy is pushed away.',
    });
    const g = new Plot(svg, { x: 70, y: 40, w: 460, h: 400, xRange: [0, 6], yRange: [-1.2, 1.4] });
    g.axes({ arrows: true, xAxisAt: 0 });
    // Square well to R = 1, then a steep rise to the barrier top and Coulomb 1/r beyond.
    const R = 1.4;
    const pe = r =>
      r < R - 0.12 ? -1 : r < R ? -1 + (2.2 * (r - R + 0.12)) / 0.12 : 1.2 * (R / r) ** 0.9;
    g.fn(pe, 0, 6, { n: 800, color: CURVE, width: 3 });
    const E = 0.55;
    const rOut = R / (E / 1.2) ** (1 / 0.9);
    svg.line(g.X(0), g.Y(E), g.X(R - 0.06), g.Y(E), {
      color: COLORS.black,
      width: 1.4,
      dash: '6 4',
    });
    svg.line(g.X(rOut), g.Y(E), g.X(6), g.Y(E), { color: COLORS.black, width: 1.4, dash: '6 4' });
    svg.circle(g.X(R - 0.25), g.Y(E) - 9, 9, { fill: '#c0222f', stroke: '#7b1022', width: 1.5 });
    svg.circle(g.X(3.4), g.Y(pe(3.4)) - 9, 9, { fill: '#c0222f', stroke: '#7b1022', width: 1.5 });
    svg.text(g.X(0) - 8, g.Y(0), '0', { size: 20, math: false, anchor: 'end' });
    svg.text(g.X(0) - 6, g.Y(1.4) - 10, '\\rm{PE}_{tot}', { size: 22, anchor: 'end' });
    svg.text(g.X(6) + 14, g.Y(0) + 4, 'r', { size: 24, anchor: 'start' });
    svg.lines(g.X(0.05), g.Y(E) + 26, ['Alpha', 'particle', 'inside'], {
      size: 20,
      math: false,
      anchor: 'start',
    });
    svg.lines(g.X(3.9), g.Y(1.15), ['Alpha', 'particle', 'outside'], {
      size: 20,
      math: false,
      anchor: 'start',
    });
    svg.lines(g.X(2.4), 30, ['Repulsive', 'Coulomb', 'force'], { size: 20, math: false });
    svg.squiggle(g.X(2.4), 94, g.X(2.0), g.Y(pe(2.0)) - 6, { waves: 1, amp: 4 });
    svg.lines(g.X(2.2), g.Y(-0.6), ['Attractive', 'nuclear', 'force'], {
      size: 20,
      math: false,
      anchor: 'start',
    });
    svg.squiggle(g.X(2.15), g.Y(-0.6), g.X(R - 0.03), g.Y(-0.4), { waves: 1, amp: 4 });
    return svg.render();
  },

  // 31.7 Fig. 3 — the wave function leaks through the barrier
  Figure_31_07_03: () => {
    const svg = new Svg({
      width: 680,
      height: 320,
      title: 'Quantum tunneling',
      desc: 'A potential barrier and the wave function of a particle. Inside the nucleus, on the left, the wave function is a sinusoid of wavelength λ = h/p. Inside the barrier it decreases exponentially rather than dropping to zero. Outside, on the right, it is again sinusoidal with the same wavelength but much smaller amplitude, so there is a small chance of finding the particle outside: it can tunnel through.',
    });
    // The line y0 is the particle's energy. The barrier rises steeply on the nucleus side and
    // falls slowly outside; it is higher than the energy only between x1 and x2.
    const y0 = 170;
    const [peak, height, below] = [320, 170, 40];
    const h = x => height * Math.exp(-(((x - peak) / (x < peak ? 30 : 90)) ** 2));
    const x1 = peak - 30 * Math.sqrt(Math.log(height / below));
    const x2 = peak + 90 * Math.sqrt(Math.log(height / below));
    const pts = [];
    for (let x = 230; x <= 660; x += 2) pts.push([x, y0 + below - h(x)]);
    svg.polyline(pts, { color: CURVE, width: 3 });
    svg.line(20, y0, 660, y0, { color: COLORS.black, width: 1.2 });
    // ψ: a cos(k(x−x1)) − (κa/k) sin(k(x−x1)) on the left, a e^{−κ(x−x1)} inside, matched on the right too.
    const k = (2 * Math.PI) / 70;
    const kappa = 0.009;
    const a = 18;
    const b = a * Math.exp(-kappa * (x2 - x1));
    const psi = x =>
      x < x1
        ? a * Math.cos(k * (x - x1)) - ((kappa * a) / k) * Math.sin(k * (x - x1))
        : x < x2
          ? a * Math.exp(-kappa * (x - x1))
          : b * Math.cos(k * (x - x2)) - ((kappa * b) / k) * Math.sin(k * (x - x2));
    const w = [];
    for (let x = 20; x <= 660; x += 1.5) w.push([x, y0 - psi(x)]);
    svg.polyline(w, { color: '#1aa6a6', width: 2.6 });
    svg.line(x1, y0 + 30, x1, y0 + 14, { color: COLORS.black, width: 1.2 });
    svg.line(x2, y0 + 30, x2, y0 + 14, { color: COLORS.black, width: 1.2 });
    svg.arrow(x1 + 2, y0 + 22, x2 - 2, y0 + 22, {
      color: COLORS.black,
      width: 1.2,
      head: 8,
      start: true,
    });
    note(svg, (x1 + x2) / 2, y0 + 44, 'Quantum tunnel', { size: 18 });
    note(svg, 520, 30, 'Potential barrier', { size: 18, anchor: 'start' });
    svg.squiggle(516, 30, peak + 8, y0 + below - height + 4, { waves: 1, amp: 3 });
    note(svg, 470, 80, 'Exponential decrease', { size: 18, anchor: 'start' });
    note(svg, 470, 100, 'inside barrier', { size: 18, anchor: 'start' });
    svg.squiggle(466, 96, (x1 + x2) / 2, y0 - 6, { waves: 1, amp: 3 });
    note(svg, 20, 90, 'Wave function', { size: 18, anchor: 'start' });
    svg.text(20, 112, '\\rm{inside} λ = h/p', { size: 18, anchor: 'start' });
    svg.squiggle(90, 122, 120, y0 - 16, { waves: 1, amp: 3 });
    note(svg, 520, 240, 'Wave function', { size: 18, anchor: 'start' });
    svg.text(520, 262, '\\rm{outside} λ = h/p', { size: 18, anchor: 'start' });
    svg.squiggle(516, 236, 480, y0 + 6, { waves: 1, amp: 3 });
    return svg.render();
  },
};
