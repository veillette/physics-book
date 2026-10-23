/**
 * Chapter 34: frontiers of physics — cosmology, general relativity and black
 * holes, and superconductivity.
 *
 * In the expansion figures every galaxy recedes from every other with a speed
 * proportional to its distance (Hubble's law), so the arrows grow with
 * distance. The cosmic microwave spectrum is the Planck curve for 2.725 K,
 * plotted per unit wavelength (peak near 1.06 mm) and normalized to its
 * peak. The timeline uses present-day values: atoms form at about
 * 3.8 × 10^5 y, and the universe is now 1.38 × 10^10 y old. Light bending and
 * the equivalence-principle beam are exaggerated so the curvature shows. The
 * mercury data are Onnes's 1911 resistance measurements.
 */
import { earth, observer } from './ch28.js';
import { COLORS, Plot, Svg, fmt } from './svg.js';

const GO = '#7bc142';
const CURVE = COLORS.maroon;
const SPACE = ['#a487c8', '#6b4c99'];

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

/** A seeded random-number generator, so figures regenerate identically. */
function random(seed) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
}

/** A purple field of white stars filling the rectangle. */
function starfield(svg, x, y, w, h, { n = 140, seed = 5, fill = SPACE } = {}) {
  const id = `space34_${seed}`;
  define(
    svg,
    id,
    `<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.75"><stop offset="0" stop-color="${fill[0]}"/><stop offset="1" stop-color="${fill[1]}"/></radialGradient>`
  );
  svg.rect(x, y, w, h, { fill: `url(#${id})` });
  const rnd = random(seed);
  for (let k = 0; k < n; k += 1) {
    svg.circle(x + rnd() * w, y + rnd() * h, 1 + 2 * rnd(), { fill: '#ffffff' });
  }
}

/** A small spiral galaxy: a bright core and two arms, flattened by `tilt` and turned by `rot` degrees. */
function galaxy(svg, x, y, r, { tilt = 0.6, rot = 0, color = '#cfe0ff' } = {}) {
  const arms = [0, Math.PI].map(phase => {
    const pts = [];
    for (let k = 0; k <= 40; k += 1) {
      const a = (k / 40) * 3.2;
      const rr = r * 0.15 * Math.exp(0.6 * a);
      pts.push([rr * Math.cos(a + phase), rr * Math.sin(a + phase) * tilt]);
    }
    return pts.map(([u, v]) => `${fmt(u)},${fmt(v)}`).join(' ');
  });
  svg.add(
    `<g transform="translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(rot)})"><ellipse rx="${fmt(r * 1.05)}" ry="${fmt(r * 1.05 * tilt)}" fill="${color}" fill-opacity="0.35"/>${arms.map(p => `<polyline points="${p}" fill="none" stroke="${color}" stroke-width="${fmt(r * 0.22)}" stroke-linecap="round"/><polyline points="${p}" fill="none" stroke="#f3a8c8" stroke-width="${fmt(r * 0.06)}" stroke-dasharray="1 4"/>`).join('')}<ellipse rx="${fmt(r * 0.28)}" ry="${fmt(r * 0.28 * tilt)}" fill="#ffffff"/></g>`
  );
}

/** A star symbol: a small spiky disk. */
function star(svg, x, y, r, { fill = '#f6c844', stroke = '#d08a10', opacity = 1 } = {}) {
  const pts = [];
  for (let k = 0; k < 16; k += 1) {
    const a = (Math.PI * k) / 8 - Math.PI / 2;
    const rr = k % 2 ? r * 0.5 : r;
    pts.push(`${fmt(x + rr * Math.cos(a))},${fmt(y + rr * Math.sin(a))}`);
  }
  svg.add(
    `<polygon points="${pts.join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="1" opacity="${opacity}"/>`
  );
}

/** The Sun: a glowing yellow disk with a ragged corona. */
function sun(svg, x, y, r) {
  define(
    svg,
    'sun34',
    '<radialGradient id="sun34" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#f7b733"/><stop offset="0.65" stop-color="#fcd65c"/><stop offset="1" stop-color="#fff2b8"/></radialGradient>'
  );
  const pts = [];
  for (let k = 0; k < 48; k += 1) {
    const a = (2 * Math.PI * k) / 48;
    const rr = r * (k % 2 ? 1.12 : 1.3);
    pts.push(`${fmt(x + rr * Math.cos(a))},${fmt(y + rr * Math.sin(a))}`);
  }
  svg.add(`<polygon points="${pts.join(' ')}" fill="#fde69a"/>`);
  svg.circle(x, y, r * 1.1, { fill: 'url(#sun34)' });
}

/**
 * Galaxies receding from the center (cx, cy) by Hubble's law: each arrow
 * points away from the center with length proportional to the distance.
 */
function recession(svg, cx, cy, spots, { k = 0.32, head = 18 } = {}) {
  for (const [x, y, r, rot] of spots) {
    galaxy(svg, x, y, r, { rot });
    const [dx, dy] = [x - cx, y - cy];
    const d = Math.hypot(dx, dy);
    if (d < 1) continue;
    const [ux, uy] = [dx / d, dy / d];
    const start = r * 1.1;
    svg.arrow(x + ux * start, y + uy * start, x + ux * (start + k * d), y + uy * (start + k * d), {
      color: GO,
      width: 5,
      head,
    });
  }
}

/** A woman seen from the side, facing right, feet at (x, y), holding a flashlight. */
function person(svg, x, y, s = 1) {
  const P = (dx, dy) => `${fmt(x + dx * s)},${fmt(y - dy * s)}`;
  const poly = (pts, fill, stroke = '#5a4632') =>
    svg.add(
      `<polygon points="${pts.map(p => P(...p)).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="1"/>`
    );
  // Legs and shoes.
  poly(
    [
      [-12, 4],
      [-11, 100],
      [11, 100],
      [8, 4],
    ],
    '#b0773c'
  );
  svg.line(x - s, y - 5 * s, x - s, y - 95 * s, { color: '#7a4f24', width: 1 });
  poly(
    [
      [-16, 0],
      [-14, 6],
      [10, 6],
      [16, 0],
    ],
    '#333333'
  );
  // Coat.
  poly(
    [
      [-16, 92],
      [-18, 175],
      [-8, 186],
      [8, 186],
      [16, 172],
      [14, 92],
    ],
    '#f4f4f6',
    '#9a9aa2'
  );
  // Arm reaching forward to the flashlight.
  poly(
    [
      [2, 178],
      [12, 152],
      [58, 150],
      [58, 140],
      [8, 140],
      [-6, 165],
    ],
    '#f4f4f6',
    '#9a9aa2'
  );
  svg.circle(x + 62 * s, y - 145 * s, 5 * s, { fill: '#a8754a' });
  // Neck, head and hair.
  poly(
    [
      [-4, 184],
      [-4, 196],
      [5, 196],
      [5, 184],
    ],
    '#a8754a'
  );
  svg.circle(x + s, y - 208 * s, 14 * s, { fill: '#a8754a' });
  svg.path(
    `M ${P(-13, 210)} Q ${P(-6, 228)} ${P(10, 220)} L ${P(4, 212)} Q ${P(-6, 214)} ${P(-10, 196)} Z`,
    { color: '#3a2414', width: 1, fill: '#3a2414' }
  );
  svg.circle(x - 15 * s, y - 214 * s, 7 * s, { fill: '#3a2414' });
  // Flashlight.
  svg.add(
    `<polygon points="${P(56, 150)} ${P(80, 151)} ${P(88, 154)} ${P(88, 138)} ${P(80, 141)} ${P(56, 142)}" fill="#c9ccd2" stroke="#6f7580" stroke-width="1"/>`
  );
  return [x + 88 * s, y - 146 * s];
}

/** A flashlight beam from F to the wall at xWall, dropping by `drop` there (a parabola). */
function beam(svg, [fx, fy], xWall, drop, id) {
  define(
    svg,
    id,
    `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe36b" stop-opacity="0.95"/><stop offset="1" stop-color="#fff3b0" stop-opacity="0.75"/></linearGradient>`
  );
  const L = xWall - fx;
  const c = x => fy + drop * ((x - fx) / L) ** 2;
  const w = x => 7 + 16 * ((x - fx) / L);
  const top = [];
  const bottom = [];
  for (let k = 0; k <= 30; k += 1) {
    const x = fx + (L * k) / 30;
    top.push([x, c(x) - w(x)]);
    bottom.unshift([x, c(x) + w(x)]);
  }
  svg.polygon([...top, ...bottom], { fill: `url(#${id})` });
  svg.ellipse(xWall, c(xWall), 6, w(xWall), { fill: '#ffe36b', stroke: '#e0b52a', width: 1 });
  svg.line(fx, fy, xWall, fy, { color: COLORS.black, width: 1.8, dash: '8 6' });
}

export default {
  // 34.1 Fig. 4 — Hubble's law: redshift grows with distance
  Figure_34_01_04: () => {
    const svg = new Svg({
      width: 520,
      height: 380,
      title: 'Redshift versus distance for galaxies',
      desc: 'Redshift versus distance d for many galaxies. The points scatter about a straight line through the origin: the farther away a galaxy is, the larger its redshift, so the universe is expanding.',
    });
    const g = new Plot(svg, { x: 80, y: 40, w: 400, h: 310, xRange: [0, 1], yRange: [-0.12, 1] });
    g.axes({ arrows: true, xAxisAt: 0 });
    const rnd = random(11);
    for (let k = 0; k < 30; k += 1) {
      const d = 0.03 + 0.95 * (k / 29) ** 0.9;
      const z = 0.85 * d + (rnd() - 0.5) * 0.24;
      svg.circle(g.X(d), g.Y(z), 5, { fill: COLORS.black });
    }
    g.line(0, 0, 0.96, 0.82, { color: CURVE, width: 3 });
    note(svg, 70, g.Y(0), '0', { anchor: 'end', size: 22 });
    svg.lines(70, 30, ['Red', 'shift'], { size: 22, math: false, anchor: 'end' });
    svg.text(480, g.Y(0) + 34, 'Distance (\\it{d})', { size: 22, math: false, anchor: 'end' });
    return svg.render();
  },

  // 34.1 Fig. 5 — galaxies recede as space expands
  Figure_34_01_05: () => {
    const svg = new Svg({
      width: 700,
      height: 700,
      title: 'Galaxies receding as space expands',
      desc: 'Galaxies scattered through space around the Milky Way (MW). Each has an arrow pointing directly away from the Milky Way, longer for more distant galaxies: recession speed is proportional to distance. An observer in any other galaxy would see the same pattern.',
    });
    starfield(svg, 0, 0, 700, 700, { n: 220, seed: 3 });
    const [cx, cy] = [330, 355];
    galaxy(svg, cx, cy, 30, { rot: -15 });
    note(svg, cx + 42, cy, 'MW', { anchor: 'start', size: 26, halo: false, color: '#111111' });
    recession(svg, cx, cy, [
      [255, 285, 28, 20],
      [262, 405, 16, -30],
      [325, 420, 16, 0],
      [400, 320, 12, 60],
      [380, 190, 18, 10],
      [440, 220, 16, -40],
      [200, 160, 20, 30],
      [90, 315, 16, 0],
      [120, 450, 22, 60],
      [230, 480, 18, -20],
      [345, 510, 16, 40],
      [480, 545, 22, -10],
      [510, 460, 18, 20],
      [560, 340, 22, 50],
      [610, 490, 18, -30],
      [590, 105, 16, 30],
      [180, 60, 18, -10],
      [235, 640, 20, 10],
    ]);
    return svg.render();
  },

  // 34.1 Fig. 6 — the expanding universe and the cosmic microwave background
  Figure_34_01_06: () => {
    const svg = new Svg({
      width: 520,
      height: 880,
      title: 'The Big Bang and the cosmic microwave spectrum',
      desc: '(a) After the Big Bang, a hot dense early state, the universe expands and cools; galaxies form within it and recede from one another with speeds proportional to their separation. (b) The spectrum of the cosmic microwave background, intensity versus wavelength from 0.5 to 10 mm on a logarithmic scale: measured points lie exactly on the blackbody curve for T = 2.725 K, which peaks near 1 mm.',
    });
    // (a) The flash, then the expanding universe.
    const pts = [];
    for (let k = 0; k < 18; k += 1) {
      const a = (Math.PI * k) / 9;
      const rr = k % 2 ? 22 : 44;
      pts.push(`${fmt(55 + rr * Math.cos(a))},${fmt(190 + rr * Math.sin(a))}`);
    }
    svg.add(
      `<polygon points="${pts.join(' ')}" fill="#fbd27a" stroke="#f0a23c" stroke-width="2"/>`
    );
    svg.circle(55, 190, 14, { fill: '#e8582a' });
    define(
      svg,
      'universe34',
      '<radialGradient id="universe34" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#5a3e8f"/><stop offset="0.85" stop-color="#7b5cae"/><stop offset="1" stop-color="#b9a3d9" stop-opacity="0"/></radialGradient>'
    );
    const [ux, uy] = [285, 185];
    svg.circle(ux, uy, 165, { fill: 'url(#universe34)' });
    galaxy(svg, ux, uy, 16, { rot: 20 });
    recession(
      svg,
      ux,
      uy,
      [
        [255, 175, 10, 0],
        [300, 215, 10, 40],
        [215, 115, 16, 30],
        [310, 80, 20, 0],
        [380, 130, 16, -40],
        [370, 255, 14, 20],
        [230, 290, 14, -20],
        [175, 210, 12, 60],
      ],
      { k: 0.55, head: 16 }
    );
    caption(svg, 240, 395, '(a)');
    // (b) The Planck spectrum, B_λ ∝ λ^−5 / (e^{hc/λkT} − 1), with T = 2.725 K.
    const T = 2.725;
    const B = lam => lam ** -5 / Math.expm1(14.388 / (lam * T)); // λ in mm; hc/k = 14.388 mm·K
    const peak = B(2.898 / T);
    const I = lam => B(lam) / peak;
    const g = new Plot(svg, {
      x: 75,
      y: 440,
      w: 360,
      h: 370,
      xRange: [Math.log10(0.5), 1.05],
      yRange: [0, 1.2],
      yTicks: [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2],
      yFormat: v => v.toFixed(1),
    });
    for (const v of [0.5, 1, 2, 5, 10]) {
      svg.line(g.X(Math.log10(v)), g.Y(0), g.X(Math.log10(v)), g.Y(1.2), {
        color: COLORS.grid,
        width: 1,
      });
    }
    g.axes({ arrows: true, size: 20 });
    for (const v of [0.5, 1, 2, 5, 10]) {
      svg.line(g.X(Math.log10(v)), g.Y(0), g.X(Math.log10(v)), g.Y(0) + 6, {
        color: COLORS.axis,
        width: 1.2,
      });
      note(svg, g.X(Math.log10(v)), g.Y(0) + 24, String(v), { size: 20 });
    }
    g.fn(x => I(10 ** x), Math.log10(0.5), 1, { n: 200, color: '#e8733a', width: 2 });
    for (let k = 0; k <= 42; k += 1) {
      const x = Math.log10(0.5) + ((1 - Math.log10(0.5)) * k) / 42;
      svg.rect(g.X(x) - 4.5, g.Y(I(10 ** x)) - 4.5, 9, 9, { fill: '#8e1b23' });
    }
    lab(svg, g.X(0.02) - 16, g.Y(1.2) - 22, 'I', { size: 22 });
    svg.text(g.X(1.05) + 4, g.Y(0) + 24, '\\it{λ} (mm)', {
      size: 20,
      math: false,
      anchor: 'start',
    });
    svg.text(g.X(0.18), g.Y(0.86), 'Blackbody, \\it{T} = 2.725 K', {
      size: 20,
      math: false,
      anchor: 'start',
    });
    caption(svg, 255, 868, '(b)');
    return svg.render();
  },

  // 34.1 Fig. 8 — the history of the universe
  Figure_34_01_08: () => {
    const svg = new Svg({
      width: 1000,
      height: 700,
      title: 'The evolution of the universe',
      desc: 'A timeline of the universe on a compressed, roughly logarithmic scale, widening to the right like the expanding universe, with time across the top and the typical particle energy along the bottom. From the left: a hypothetical theory-of-everything era near 10^−43 s and 10^19 GeV with complete symmetry; a proposed grand-unified era; spontaneous symmetry breaking and inflation, 10^−35 to 10^−32 s; the electroweak era of leptons, quarks, W and Z bosons and photons down to 100 GeV at 10^−11 s; then leptons, hadrons and photons through the quark, lepton and photon eras and nucleosynthesis (10^−6 s to 100 s); light nuclei and atoms by about 3.8 × 10^5 y; stars and protogalaxies near 10^8 y; galaxies by 10^9 y; the Earth at about 9.2 × 10^9 y, life by about 10^10 y, and now, 1.38 × 10^10 y.',
    });
    const top = 220;
    const bottom = x =>
      x < 155
        ? 245 + (x - 40) * (25 / 115)
        : x < 210
          ? 270 + (x - 155) * (125 / 55)
          : 395 + (x - 210) * (95 / 775);
    const X1 = 985;
    const stops = [
      [40, '#ffffff'],
      [150, '#ffffff'],
      [210, '#4aa3e0'],
      [330, '#86c9e6'],
      [440, '#b5dca4'],
      [580, '#fbf07e'],
      [690, '#f8c454'],
      [770, '#f08a3c'],
      [820, '#d9402a'],
      [870, '#6a3a2a'],
      [890, '#161616'],
      [X1, '#161616'],
    ];
    define(
      svg,
      'era34',
      `<linearGradient id="era34" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="${X1}" y2="0">${stops.map(([x, c]) => `<stop offset="${fmt((x - 40) / (X1 - 40))}" stop-color="${c}"/>`).join('')}</linearGradient>`
    );
    const edge = [];
    for (let x = 40; x <= X1; x += 5) edge.push([x, bottom(x)]);
    svg.polygon([[40, top], [X1, top], ...edge.reverse()], {
      fill: 'url(#era34)',
      stroke: COLORS.black,
      width: 1.5,
    });
    // The hypothetical earliest era: a speckled patch.
    const rnd = random(4);
    for (let k = 0; k < 40; k += 1)
      svg.circle(48 + rnd() * 40, top + 4 + rnd() * 20, 1.5 + rnd() * 2, {
        fill: rnd() < 0.5 ? '#222222' : '#888888',
      });
    // Galaxies in the present era.
    for (const [x, y, r, rot] of [
      [905, 250, 10, 0],
      [930, 290, 9, 40],
      [960, 260, 9, -30],
      [910, 330, 11, 70],
      [945, 360, 10, 10],
      [970, 320, 8, 50],
      [915, 400, 10, -20],
      [960, 420, 9, 30],
    ])
      galaxy(svg, x, y, r, { rot, color: '#b8c8ff' });
    // Era boundaries.
    for (const x of [155, 210, 580, 820, 878, 925, 950, 978])
      svg.line(x, top, x, bottom(x), {
        color: x > 880 ? '#ffffff' : '#333333',
        width: 1.2,
        dash: '5 4',
      });
    // Times above.
    const tlab = (x, s) => svg.text(x, top - 14, s, { size: 17, math: false });
    tlab(68, '10^{−43} s');
    tlab(195, '10^{−35}–10^{−32} s');
    tlab(580, '10^{−11} s');
    tlab(632, '10^{−6} s');
    tlab(683, '10^{−4} s');
    tlab(728, '10 s');
    tlab(772, '100 s');
    // Eras and late times, written upward.
    const up = (x, lines, y0 = top - 40) =>
      lines.forEach((s, k) =>
        svg.text(x + (k - (lines.length - 1) / 2) * 20, y0, s, {
          size: 17,
          math: false,
          rotate: -90,
          anchor: 'start',
        })
      );
    up(632, ['Quark era']);
    up(683, ['Lepton era']);
    up(728, ['Photon era']);
    up(772, ['Nucleosynthesis']);
    up(820, ['3.8 × 10^5 y Atomic era'], top - 8);
    up(866, ['10^8 y Stars and', 'protogalaxies'], top - 8);
    up(905, ['10^9 y Galaxies'], top - 8);
    up(932, ['9.2 × 10^9 y Earth'], top - 8);
    up(955, ['~10^{10} y Life'], top - 8);
    up(980, ['1.38 × 10^{10} y Now'], top - 8);
    // Energies along the lower edge.
    const elab = (x, s, dy = 22) => svg.text(x, bottom(x) + dy, s, { size: 17, math: false });
    elab(70, '10^{19} GeV');
    elab(240, '10^{14} GeV');
    elab(580, '100 GeV', 26);
    elab(655, '1 GeV', 26);
    // Contents of each era, written downward from the lower edge.
    const down = (x, lines, gap = 12) =>
      lines.forEach((s, k) =>
        svg.text(x + (k - (lines.length - 1) / 2) * 20, bottom(x) + gap + (x === 70 ? 30 : 0), s, {
          size: 17,
          math: false,
          rotate: -90,
          anchor: 'end',
        })
      );
    down(70, ['Complete symmetry,', 'identical particles']);
    down(125, ['Leptons, gluons, quarks,', 'weak bosons, photons'], 40);
    down(180, ['Spontaneous symmetry', 'breaking. Inflation'], 40);
    down(400, ['Leptons, quarks, \\it{W}^±, \\it{Z}^0, photons'], 30);
    down(580, ['Leptons, hadrons, photons'], 46);
    down(820, ['Light nuclei'], 14);
    down(850, ['Atoms'], 14);
    down(885, ['Stars,', 'protogalaxies, galaxies'], 14);
    svg.text(120, top + 30, 'GUT', { size: 17, math: false });
    svg.text(62, top - 40, 'TOE', { size: 17, math: false });
    svg.text(400, top + 50, 'Electroweak', { size: 20, math: false, halo: false });
    return svg.render();
  },

  // 34.1 Fig. 9 — measuring a star's distance by parallax
  Figure_34_01_09: () => {
    const svg = new Svg({
      width: 460,
      height: 810,
      title: 'Parallax of a nearby star',
      desc: 'A star 4 light years from the Sun, far above the plane of the Earth’s orbit (not to scale). From the Earth at opposite sides of its orbit, six months apart, the lines of sight to the star make angles θ1 and θ2 with the line through the Sun. The known diameter of the orbit and these angles fix the distance to the star.',
    });
    const S = [230, 50];
    const [cx, cy] = [230, 690];
    const [L, R] = [
      [30, cy],
      [430, cy],
    ];
    svg.ellipse(cx, cy, 200, 40, { stroke: COLORS.black, width: 1.5 });
    svg.line(...L, ...R, { color: COLORS.black, width: 1.5 });
    svg.line(...S, ...L, { color: COLORS.black, width: 1.5 });
    svg.line(...S, ...R, { color: COLORS.black, width: 1.5 });
    // Direction of the Earth's motion around the orbit.
    const orbitAt = (x, side) => [x, cy + side * 40 * Math.sqrt(1 - ((x - cx) / 200) ** 2)];
    svg.arrow(...orbitAt(150, 1), ...orbitAt(175, 1), {
      color: COLORS.black,
      width: 1.5,
      head: 12,
    });
    svg.arrow(...orbitAt(330, -1), ...orbitAt(305, -1), {
      color: COLORS.black,
      width: 1.5,
      head: 12,
    });
    svg.arrow(cx, S[1] + 22, cx, cy - 20, { color: COLORS.black, width: 2, head: 16, start: true });
    note(svg, cx, 370, '4 ly', { size: 24 });
    svg.polyline(
      [
        [cx, cy - 18],
        [cx + 18, cy - 18],
        [cx + 18, cy],
      ],
      { color: COLORS.black, width: 1.5 }
    );
    const ang = (Math.atan2(cy - S[1], S[0] - L[0]) * 180) / Math.PI;
    svg.arc(...L, 46, 0, ang, { color: COLORS.black, width: 1.5 });
    svg.arc(...R, 46, 180 - ang, 180, { color: COLORS.black, width: 1.5 });
    lab(svg, L[0] + 60, cy - 52, 'θ_1', { size: 24 });
    lab(svg, R[0] - 60, cy - 52, 'θ_2', { size: 24 });
    star(svg, ...S, 13);
    note(svg, S[0] + 22, S[1], 'Star', { anchor: 'start', size: 22 });
    sun(svg, cx, cy, 11);
    note(svg, cx + 22, cy + 18, 'Sun', { anchor: 'start', size: 22 });
    svg.circle(R[0] - 2, R[1] - 3, 9, { fill: '#62b6e0', stroke: '#2f6f9e', width: 1.5 });
    note(svg, R[0] - 10, R[1] + 46, 'Earth', { size: 22 });
    svg.line(30, 755, 30, 779, { color: COLORS.black, width: 2 });
    svg.line(430, 755, 430, 779, { color: COLORS.black, width: 2 });
    svg.arrow(32, 767, 428, 767, { color: COLORS.black, width: 2, head: 14, start: true });
    note(svg, cx, 796, 'Diameter of orbit', { size: 22 });
    return svg.render();
  },

  // 34.2 Fig. 1 — the equivalence principle: light bends in an accelerating elevator and on Earth
  Figure_34_02_01: () => {
    const svg = new Svg({
      width: 560,
      height: 855,
      title: 'Light in an accelerating elevator and on the Earth',
      desc: '(a) A person in an elevator accelerating upward shines a flashlight horizontally at the far wall. The beam strikes the wall below the dashed horizontal line through the flashlight, because the elevator accelerates up while the light crosses it. (b) The same happens in a room at rest on the Earth: gravity bends the light downward by the same amount. The bending is greatly exaggerated.',
    });
    const room = (oy, { moving }) => {
      const [x1, x2, y1, y2] = [30, 530, oy + 70, oy + 360];
      svg.rect(x1, y1, x2 - x1, y2 - y1, {
        fill: moving ? '#eceaf0' : '#fbe7c2',
        stroke: '#8a8f99',
        width: 2,
      });
      svg.rect(x1, y2, x2 - x1, 12, {
        fill: moving ? '#b9b6c2' : '#c9a46a',
        stroke: '#8a8f99',
        width: 1.5,
      });
      if (moving) {
        // The elevator doors form the far wall; motion lines below show it rising.
        svg.rect(x2 - 14, y1 + 30, 14, y2 - y1 - 30, {
          fill: '#d4d8de',
          stroke: '#8a8f99',
          width: 1.2,
        });
        for (const dy of [26, 42, 58])
          svg.line(x1 + 10, y2 + dy, x2 - 10, y2 + dy, {
            color: '#b9b6c2',
            width: 2,
            dash: '14 10',
          });
        svg.arrow(280, oy + 55, 280, oy + 8, { color: '#ef8a1c', width: 7, head: 22 });
        note(svg, 300, oy + 22, 'Accelerated up', { anchor: 'start', size: 26 });
      } else {
        svg.rect(x2 - 14, y1 + 60, 14, y2 - y1 - 60, {
          fill: '#d8b48a',
          stroke: '#8a6a44',
          width: 1.2,
        });
        svg.rect(0, y2 + 12, 560, 60, { fill: '#a9d88e' });
        note(svg, 130, y2 + 46, 'Earth', { size: 26 });
      }
      const f = person(svg, 120, y2, 1);
      beam(svg, f, x2 - 14, 34, moving ? 'beamA34' : 'beamB34');
    };
    room(0, { moving: true });
    caption(svg, 22, 30, '(a)');
    room(420, { moving: false });
    caption(svg, 22, 450, '(b)');
    return svg.render();
  },

  // 34.2 Fig. 2 — starlight bent by the Sun
  Figure_34_02_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 515,
      title: 'Starlight bent by the Sun',
      desc: 'Light from a distant star passes close to the Sun and is bent toward it on its way to an observer on the Earth. Tracing the arriving ray straight back, the observer sees the star at an apparent position farther from the Sun than its actual position. The distances are not to scale.',
    });
    const T = [320, 140]; // where the ray grazes the Sun
    const E = [880, 248]; // the observer's eye
    const slope = (E[1] - T[1]) / (E[0] - T[0]);
    const actual = [75, 165];
    const apparent = [75, T[1] - (T[0] - 75) * slope];
    const ray = '#1aa6c9';
    sun(svg, 320, 200, 42);
    svg.path(
      `M ${actual[0] + 10} ${actual[1]} Q 200 ${fmt(T[1] - 120 * slope)} ${T[0]} ${T[1]} L ${E[0]} ${E[1]}`,
      {
        color: ray,
        width: 2.5,
      }
    );
    svg.line(apparent[0] + 10, apparent[1], T[0], T[1], { color: ray, width: 2.5, dash: '10 7' });
    star(svg, ...actual, 12);
    star(svg, ...apparent, 12, { opacity: 0.55 });
    svg.lines(75, 30, ['Apparent', 'position'], { size: 26, math: false });
    svg.lines(75, 205, ['Actual', 'star'], { size: 26, math: false });
    note(svg, 385, 200, 'Sun', { anchor: 'start', size: 26 });
    earth(svg, 880, 375, 58);
    observer(svg, 880, 318, 1.9);
    svg.lines(880, 470, ['Earth-bound', 'observer'], { size: 24, math: false });
    svg.line(75, 278, 75, 312, { color: COLORS.black, width: 2 });
    svg.line(320, 278, 320, 312, { color: COLORS.black, width: 2 });
    svg.arrow(77, 295, 318, 295, { color: COLORS.black, width: 2, head: 16, start: true });
    svg.lines(198, 345, ['Very large', 'distance', '(not to scale)'], { size: 24, math: false });
    return svg.render();
  },

  // 34.2 Fig. 4 — a black hole pulling matter from a companion star
  Figure_34_02_04: () => {
    const svg = new Svg({
      width: 875,
      height: 415,
      title: 'Black hole with an accretion disk',
      desc: 'A black hole pulls matter from a companion star. The matter spirals in through a hot accretion disk around the hole, where it emits X-rays, and some is ejected in two narrow jets along the disk’s axis.',
    });
    starfield(svg, 0, 0, 875, 415, { n: 160, seed: 9 });
    define(
      svg,
      'star34',
      '<radialGradient id="star34" cx="0.45" cy="0.45" r="0.55"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#9fe0fb"/><stop offset="1" stop-color="#1f8fd6"/></radialGradient><linearGradient id="stream34" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe8fb"/><stop offset="1" stop-color="#ffffff"/></linearGradient><linearGradient id="jet34" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="0.5" stop-color="#ffffff"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></linearGradient>'
    );
    const [hx, hy] = [590, 180];
    // Jets along the axis.
    svg.add(
      `<polygon points="${hx},20 ${hx + 6},${hy} ${hx},400 ${hx - 6},${hy}" fill="url(#jet34)"/>`
    );
    // The stream of matter the star loses, then the star in front of its start.
    svg.path(
      `M 180 95 C 360 120 420 175 ${hx - 55} ${hy - 6} L ${hx - 52} ${hy + 8} C 420 205 360 260 180 255 Z`,
      { color: 'none', width: 0, fill: 'url(#stream34)', opacity: 0.85 }
    );
    for (let k = 0; k < 9; k += 1) {
      const y0 = 110 + k * 16;
      svg.path(
        `M 180 ${y0} C 340 ${y0 + (175 - y0) * 0.4} 430 ${hy} ${hx - 50} ${hy + (k - 4) * 1.2}`,
        {
          color: '#e8f7ff',
          width: 1.2,
        }
      );
    }
    svg.ellipse(180, 175, 125, 115, { fill: 'url(#star34)', stroke: 'none', width: 0 });
    // The accretion disk around the hole.
    svg.ellipse(hx, hy, 56, 17, { fill: '#eef3ff', stroke: '#c9d6f0', width: 1.5 });
    svg.ellipse(hx, hy, 34, 10, { fill: '#c8d4ee', stroke: 'none', width: 0 });
    svg.ellipse(hx, hy, 14, 5, { fill: '#1a1024', stroke: 'none', width: 0 });
    note(svg, 175, 175, 'Star', { size: 34, halo: false, color: '#11324a' });
    note(svg, 440, 70, 'Black hole', { size: 30 });
    svg.squiggle(520, 85, hx - 8, hy - 6, { waves: 1, amp: 8 });
    note(svg, 700, 335, 'Accretion disk', { size: 30 });
    svg.squiggle(660, 310, hx + 30, hy + 16, { waves: 1, amp: 8 });
    return svg.render();
  },

  // 34.2 Fig. 8 — Hawking radiation
  Figure_34_02_08: () => {
    const svg = new Svg({
      width: 720,
      height: 660,
      title: 'Hawking radiation from a black hole',
      desc: 'A rough picture of Hawking radiation. Particle–antiparticle pairs appear just outside a black hole’s event horizon. Sometimes one member falls in while the other escapes: an electron escapes while its positron falls in, and a proton escapes while its antiproton falls in. Sometimes both fall in, as for a muon pair. Sometimes both escape, and an escaping electron and positron annihilate into gamma rays that escape. The escaping radiation carries away energy, reducing the black hole’s mass.',
    });
    starfield(svg, 0, 0, 720, 660, { n: 260, seed: 2, fill: ['#e2d6ee', '#cdbde0'] });
    const [cx, cy, R] = [350, 260, 100];
    define(
      svg,
      'hole34',
      '<radialGradient id="hole34" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#2a1236"/><stop offset="0.45" stop-color="#6b4688"/><stop offset="1" stop-color="#cdbde0" stop-opacity="0"/></radialGradient>'
    );
    svg.circle(cx, cy, R * 1.6, { fill: 'url(#hole34)' });
    svg.circle(cx, cy, R, { fill: 'none', stroke: '#f1e8fa', width: 2.5 });
    svg.add(
      `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#7a5aa0" stroke-width="2" stroke-dasharray="8 6"/>`
    );
    const l = (x, y, s, o = {}) => lab(svg, x, y, s, { size: 26, ...o });
    const go = (x1, y1, x2, y2, bend = 0.25) => svg.leader(x1, y1, x2, y2, { bend, width: 2 });
    note(svg, cx - 20, 60, 'Black hole', { size: 26 });
    go(cx - 20, 78, cx, cy - 20, 0.15);
    note(svg, 600, 260, 'Event', { size: 24, anchor: 'start' });
    note(svg, 600, 288, 'horizon', { size: 24, anchor: 'start' });
    go(595, 268, cx + R + 4, cy + 10, -0.15);
    // Electron escapes, positron falls in.
    l(445, 150, 'e^−');
    go(470, 140, 560, 115, -0.2);
    svg.text(568, 112, '\\it{e}^− escapes', { anchor: 'start', size: 24, math: false });
    l(470, 190, 'e^+');
    go(462, 205, cx + 60, cy - 30, -0.2);
    // Proton escapes, antiproton falls in.
    l(225, 232, 'p');
    go(212, 232, 140, 234, 0.1);
    svg.text(132, 234, '\\it{p} escapes', { anchor: 'end', size: 24, math: false });
    l(200, 185, '\\bar{p}');
    go(215, 182, cx - 65, cy - 15, 0.25);
    // Muon pair: both fall in.
    l(420, 395, 'μ');
    l(470, 360, '\\bar{μ}');
    go(412, 380, cx + 40, cy + 70, 0.2);
    go(462, 345, cx + 75, cy + 45, 0.2);
    svg.lines(500, 400, ['(both may', 'fall in)'], { size: 24, math: false, anchor: 'start' });
    // Electron–positron pair: both escape and annihilate.
    l(315, 400, 'e^+');
    l(360, 400, 'e^−');
    go(350, 385, cx + 22, cy + 82, -0.2);
    svg.arrow(310, 418, 310, 455, { color: COLORS.black, width: 2, head: 12 });
    l(340, 475, 'e^+ + e^−');
    const wavy = (x1, y1, x2, y2) => {
      const L = Math.hypot(x2 - x1, y2 - y1);
      const [ux, uy] = [(x2 - x1) / L, (y2 - y1) / L];
      const pts = [];
      for (let k = 0; k <= 40; k += 1) {
        const s = (0.85 * L * k) / 40;
        const w = 5 * Math.sin((2 * Math.PI * 3 * k) / 40);
        pts.push([x1 + ux * s - uy * w, y1 + uy * s + ux * w]);
      }
      svg.polyline(pts, { color: '#a5182f', width: 2.5 });
      svg.arrow(...pts.at(-1), x2, y2, { color: '#a5182f', width: 2.5, head: 16 });
    };
    wavy(310, 495, 270, 560);
    wavy(375, 495, 420, 560);
    l(265, 585, 'γ');
    l(425, 585, 'γ');
    svg.text(345, 625, '(annihilation \\it{γ}’s escape)', { size: 24, math: false });
    return svg.render();
  },

  // 34.6 Fig. 1 — the superconducting transition of mercury
  Figure_34_06_01: () => {
    const svg = new Svg({
      width: 750,
      height: 560,
      title: 'Resistance of mercury near 4.2 K',
      desc: 'Resistance R of a mercury sample versus temperature T from 4.1 to 4.4 K. Above 4.2 K the resistance is about 0.12 to 0.14 Ω; at 4.2 K it drops abruptly to less than 10^−5 Ω, the superconducting transition.',
    });
    const g = new Plot(svg, {
      x: 130,
      y: 40,
      w: 570,
      h: 440,
      xRange: [4.03, 4.46],
      yRange: [0, 0.165],
      xTicks: [4.1, 4.2, 4.3, 4.4],
      yTicks: [0.05, 0.1, 0.15],
      yFormat: v => v.toFixed(2),
    });
    g.axes({ arrows: true, size: 24 });
    note(svg, g.X(4.03) - 12, g.Y(0), '0', { anchor: 'end', size: 24 });
    // Axis break.
    for (const dx of [0, 10])
      svg.line(g.X(4.05) + dx - 6, g.Y(0) + 10, g.X(4.05) + dx + 6, g.Y(0) - 10, {
        color: COLORS.axis,
        width: 1.5,
      });
    const data = [
      [4.165, 0.002],
      [4.183, 0.002],
      [4.201, 0.009],
      [4.233, 0.118],
      [4.358, 0.137],
      [4.403, 0.14],
    ];
    g.series(data.slice(0, 3), { color: CURVE, width: 3 });
    g.series(data.slice(2, 4), { color: CURVE, width: 3, dash: '8 6' });
    g.series(data.slice(3), { color: CURVE, width: 3 });
    for (const [t, r] of data) svg.circle(g.X(t), g.Y(r), 7, { fill: COLORS.black });
    note(svg, g.X(4.12), g.Y(0.1), 'Mercury', { size: 28 });
    lab(svg, g.X(4.06), g.Y(0.033), 'R < 10^{−5} \\rm{Ω}', { anchor: 'start', size: 26 });
    svg.squiggle(g.X(4.13), g.Y(0.026), g.X(4.18), g.Y(0.002) - 8, { waves: 1, amp: 5 });
    lab(svg, g.X(4.03) - 70, 22, 'R \\rm{(Ω)}', { anchor: 'start', size: 26 });
    lab(svg, g.X(4.42), g.Y(0) + 34, 'T \\rm{(K)}', { anchor: 'start', size: 26 });
    return svg.render();
  },
};
