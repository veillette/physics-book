/**
 * Chapter 26: vision, color, microscopes, telescopes and aberrations.
 *
 * Cone and rod absorbance curves use the Govardovskii et al. (2000) visual
 * pigment template at the peak wavelengths the figure labels. In the
 * light-source spectra, the incandescent curve is Planck's law at 2800 K and
 * the He-Ne laser a line at 633 nm; sunlight and fluorescent light have no
 * formula, so they are digitized from the original figure
 * (data/light-sources.json). Aberrations are traced exactly through a lens
 * with spherical faces (n = 1.5), and the telescope reflects each ray from
 * its spherical mirror.
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { spectral } from './ch24.js';
import { COLORS, Plot, Svg } from './svg.js';

const SOURCES = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL('./data/light-sources.json', import.meta.url)), 'utf8')
);

const LIGHT = '#1fa8d8';
const GLASS = ['#eef4f0', '#b9cfc3', '#6f8f80'];
const CURVE = COLORS.maroon;

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit = a => mul(a, 1 / Math.hypot(...a));

function refract(d, nrm, n1, n2) {
  const n = dot(d, nrm) > 0 ? mul(nrm, -1) : nrm;
  const cosi = -dot(n, d);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return unit(add(mul(d, eta), mul(n, eta * cosi - Math.sqrt(k))));
}

const reflect = (d, n) => sub(d, mul(n, 2 * dot(d, n)));

/** Where P + t·d meets the circle (C, R): the nearer crossing if `near`, else the farther. */
function circleHit(P, d, C, R, near) {
  const w = sub(P, C);
  const b = dot(w, d);
  const c = dot(w, w) - R * R;
  const disc = b * b - c;
  if (disc < 0) return null;
  const t = near ? -b - Math.sqrt(disc) : -b + Math.sqrt(disc);
  return add(P, mul(d, t));
}

function ray(svg, P, Q, { arrow = 0.5, color = LIGHT, width = 2.2, dash } = {}) {
  svg.line(...P, ...Q, { color, width, dash });
  if (arrow) {
    const d = unit(sub(Q, P));
    const M = add(P, mul(sub(Q, P), arrow));
    svg.arrow(...sub(M, mul(d, 10)), ...add(M, mul(d, 6)), { color, width, head: 13 });
  }
}

/** Exact two-surface trace, also shared by the spherical-aberration companion. */
export function traceSphericalRay(x1, x2, cy, R, h, P, d) {
  const C1 = [x1 + R, cy],
    C2 = [x2 - R, cy];
  const H1 = circleHit(P, d, C1, R, true);
  if (!H1 || Math.abs(H1[1] - cy) > h) return null;
  const d1 = refract(d, unit(sub(H1, C1)), 1, 1.5);
  const H2 = d1 && circleHit(H1, d1, C2, R, false);
  const d2 = H2 && refract(d1, unit(sub(H2, C2)), 1.5, 1);
  return d2 ? { H1, H2, d2 } : null;
}

/** Existing reflecting-telescope geometry: primary, diagonal, eyepiece. */
export function telescopeRayPath(y) {
  const H = circleHit([40, y], [1, 0], [-160, 240], 800, false);
  const d1 = reflect([1, 0], unit(sub([-160, 240], H)));
  const t = (600 - H[0] - H[1]) / (d1[0] + d1[1]);
  const F = add(H, mul(d1, t));
  const d2 = reflect(d1, unit([1, 1]));
  const L = add(F, mul(d2, (430 - F[1]) / d2[1]));
  return [[40, y], H, F, L, [L[0], 540]];
}

/**
 * A biconvex lens with spherical faces of radius R, vertices at x1 and x2 on
 * the axis y = cy, and half-height h. `trace` sends a ray through it exactly.
 */
function sphericalLens(svg, x1, x2, cy, R, h) {
  const C1 = [x1 + R, cy];
  const C2 = [x2 - R, cy];
  const face = (C, sign) => {
    const pts = [];
    for (let k = 0; k <= 40; k += 1) {
      const y = cy - h + (2 * h * k) / 40;
      pts.push([C[0] + sign * Math.sqrt(R * R - (y - cy) ** 2), y]);
    }
    return pts;
  };
  const left = face(C1, -1);
  const right = face(C2, 1).reverse();
  const id = `slens_${x1}_${cy}`;
  svg.add(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${GLASS[1]}"/><stop offset="0.5" stop-color="${GLASS[0]}"/><stop offset="1" stop-color="${GLASS[1]}"/></linearGradient></defs>`
  );
  svg.polygon([...left, ...right], { fill: `url(#${id})`, stroke: GLASS[2], width: 1.5 });
  // Returns null for a ray that misses the lens or is totally reflected inside it.
  return (P, d) => traceSphericalRay(x1, x2, cy, R, h, P, d);
}

/** Thin lens outline (biconvex), centered at (cx, cy), half-height h; `horizontal` lays it on its side. */
function thinLens(svg, cx, cy, h, { w = 18, horizontal = false } = {}) {
  const d = horizontal
    ? `M ${cx - h} ${cy} Q ${cx} ${cy - 2 * w} ${cx + h} ${cy} Q ${cx} ${cy + 2 * w} ${cx - h} ${cy} Z`
    : `M ${cx} ${cy - h} Q ${cx + 2 * w} ${cy} ${cx} ${cy + h} Q ${cx - 2 * w} ${cy} ${cx} ${cy - h} Z`;
  const id = `tlens_${cx}_${cy}`;
  svg.add(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="${horizontal ? 0 : 1}" y2="${horizontal ? 1 : 0}"><stop offset="0" stop-color="${GLASS[1]}"/><stop offset="0.5" stop-color="${GLASS[0]}"/><stop offset="1" stop-color="${GLASS[1]}"/></linearGradient></defs>`
  );
  svg.path(d, { color: GLASS[2], width: 1.5, fill: `url(#${id})` });
}

/** Govardovskii (2000) A1 pigment template: alpha band plus beta band, for peak wavelength lm. */
function pigment(lm) {
  const a = 0.8795 + 0.0459 * Math.exp(-((lm - 300) ** 2) / 11940);
  const alpha = l => {
    const x = lm / l;
    return (
      1 /
      (Math.exp(69.7 * (a - x)) +
        Math.exp(28 * (0.922 - x)) +
        Math.exp(-14.9 * (1.104 - x)) +
        0.674)
    );
  };
  const lb = 189 + 0.315 * lm;
  const bb = -40.5 + 0.195 * lm;
  const raw = l => alpha(l) + 0.26 * Math.exp(-(((l - lb) / bb) ** 2));
  return l => raw(l) / raw(lm);
}

export default {
  // 26.2 Fig. 4 — an astigmatism chart
  Figure_26_02_04: () => {
    const svg = new Svg({
      width: 600,
      height: 600,
      title: 'Astigmatism test chart',
      desc: 'A wheel of twelve spokes around a central cross, each spoke made of three parallel black lines. If the lines along some directions look darker or sharper than others, the eye has an astigmatism.',
    });
    const [cx, cy] = [300, 300];
    for (let k = 0; k < 12; k += 1) {
      const a = (k * Math.PI) / 6;
      const [ux, uy] = [Math.cos(a), Math.sin(a)];
      for (const off of [-12, 0, 12]) {
        const [ox, oy] = [-uy * off, ux * off];
        svg.line(cx + ux * 70 + ox, cy + uy * 70 + oy, cx + ux * 285 + ox, cy + uy * 285 + oy, {
          color: COLORS.black,
          width: 5,
        });
      }
    }
    svg.line(cx - 14, cy, cx + 14, cy, { color: COLORS.black, width: 2.5 });
    svg.line(cx, cy - 14, cx, cy + 14, { color: COLORS.black, width: 2.5 });
    return svg.render();
  },

  // 26.3 Fig. 2 — absorbance of the three cones and the rods
  Figure_26_03_02: () => {
    const svg = new Svg({
      width: 980,
      height: 640,
      title: 'Absorbance of the cones and rods',
      desc: 'Normalized absorbance versus wavelength from about 360 to 700 nm. The short-wavelength (blue) cones peak at 420 nm, the rods at 498 nm, the medium-wavelength (green) cones at 534 nm and the long-wavelength (red) cones at 564 nm. Each curve rises to 100 at its peak and falls away on both sides, with a low shoulder at short wavelengths. A color bar beneath runs from violet through blue, cyan, green and yellow to red.',
    });
    const g = new Plot(svg, {
      x: 110,
      y: 90,
      w: 760,
      h: 380,
      xRange: [355, 715],
      yRange: [0, 105],
      yTicks: [0, 50, 100],
    });
    g.axes({ size: 18 });
    for (let nm = 360; nm <= 700; nm += 20) {
      svg.line(g.X(nm), g.Y(0), g.X(nm), g.Y(0) + (nm % 100 === 0 ? 10 : 6), {
        color: COLORS.axis,
        width: 1.2,
      });
      if (nm % 100 === 0) svg.text(g.X(nm), g.Y(0) + 28, String(nm), { size: 18, math: false });
    }
    svg.text(40, g.Y(52), 'Normalized absorbance', {
      size: 18,
      math: false,
      weight: 'bold',
      rotate: -90,
    });
    const curves = [
      [420, '#3e64a8', 360, 600, false],
      [498, COLORS.black, 400, 610, true],
      [534, '#9fcc3b', 400, 650, false],
      [564, '#e2245e', 400, 680, false],
    ];
    for (const [lm, color, from, to, dotted] of curves)
      g.fn(t => 100 * pigment(lm)(t), from, to, {
        n: 300,
        color,
        width: dotted ? 3.5 : 3,
        dash: dotted ? '2 5' : undefined,
      });
    for (const [x, y, s] of [
      [420, 116, '420 nm'],
      [498, 116, '498 nm'],
      [534, 116, '534 nm'],
      [564, 116, '564 nm'],
    ])
      note(svg, g.X(x) + (x === 534 ? 6 : x === 564 ? 14 : 0), g.Y(y) + 0, s, { size: 18 });
    note(svg, g.X(388), g.Y(103), 'Blue cones', { size: 18 });
    note(svg, g.X(478), g.Y(103), 'Rods', { size: 18 });
    note(svg, g.X(536), g.Y(108), 'Green', { size: 18 });
    note(svg, g.X(536), g.Y(101), 'cones', { size: 18 });
    note(svg, g.X(578), g.Y(108), 'Red', { size: 18 });
    note(svg, g.X(578), g.Y(101), 'cones', { size: 18 });
    note(svg, g.X(508), g.Y(10), 'Short', { size: 18 });
    note(svg, g.X(632), g.Y(18), 'Medium', { size: 18 });
    note(svg, g.X(688), g.Y(18), 'Long', { size: 18 });
    // Color bar beneath the wavelength axis.
    const stops = [];
    for (let nm = 360; nm <= 700; nm += 10)
      stops.push(
        `<stop offset="${((nm - 355) / 360).toFixed(3)}" stop-color="${spectral(Math.max(385, Math.min(nm, 760)))}"/>`
      );
    svg.add(
      `<defs><linearGradient id="bar26" x1="0" y1="0" x2="1" y2="0">${stops.join('')}</linearGradient></defs>`
    );
    svg.rect(g.X(355), 530, g.w, 40, { fill: 'url(#bar26)', stroke: COLORS.axis, width: 1 });
    for (const [nm, s] of [
      [395, 'Violet'],
      [445, 'Blue'],
      [490, 'Cyan'],
      [528, 'Green'],
      [570, 'Yellow'],
      [640, 'Red'],
    ])
      svg.text(g.X(nm), 550, s, {
        size: 18,
        math: false,
        weight: 'bold',
        color: '#ffffff',
        halo: false,
      });
    svg.text(g.X(535), 600, 'Wavelength (nm)', { size: 18, math: false, weight: 'bold' });
    return svg.render();
  },

  // 26.3 Fig. 4 — emission spectra of four light sources
  Figure_26_03_04: () => {
    const svg = new Svg({
      width: 880,
      height: 660,
      title: 'Emission spectra of light sources',
      desc: 'Relative intensity versus wavelength from 400 to 700 nm. Curve A, average sunlight at Earth’s surface, is fairly flat, between about 80 and 125. Curve B, a fluorescent lamp, is a broad hump with sharp spikes near 405, 436, 546 and 578 nm. Curve C, an incandescent bulb, rises steadily from about 15 at 400 nm to about 190 at 700 nm. Curve D, a helium-neon laser, is a single narrow spike at 633 nm reaching about 210.',
    });
    const g = new Plot(svg, {
      x: 120,
      y: 40,
      w: 680,
      h: 500,
      xRange: [400, 730],
      yRange: [0, 235],
      yTicks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220],
    });
    g.axes({ arrows: true, size: 20 });
    for (const nm of [400, 500, 600, 700]) {
      svg.line(g.X(nm), g.Y(0), g.X(nm), g.Y(0) + 8, { color: COLORS.axis, width: 1.2 });
      note(svg, g.X(nm), g.Y(0) + 30, String(nm), { size: 22 });
    }
    note(svg, g.X(560), g.Y(0) + 62, 'Wavelength (nm)', { size: 22 });
    svg.text(46, g.Y(118), 'Relative intensity', { size: 22, math: false, rotate: -90 });
    // C: Planck's law at 2800 K, scaled to 193 at 700 nm.
    const planck = nm => 1 / (nm ** 5 * (Math.exp(1.43877e7 / (nm * 2800)) - 1));
    g.fn(nm => (193 * planck(nm)) / planck(700), 400, 700, { n: 200, color: '#1aa6a6', width: 3 });
    g.series(SOURCES.sun, { color: '#ef7d57', width: 2.6 });
    g.series(SOURCES.fluorescent, { color: '#5ab43c', width: 2.6 });
    // D: the He-Ne line at 632.8 nm, a narrow peak that stays above the axis
    // (a smoothed polyline overshot below zero).
    g.fn(nm => 208 * Math.exp(-(((nm - 632.8) / 1.1) ** 2)), 628.8, 636.8, {
      n: 120,
      color: '#8b1a2b',
      width: 3,
    });
    note(svg, g.X(480), g.Y(160), 'A (sun)', { size: 22 });
    svg.squiggle(g.X(480), g.Y(150), g.X(478), g.Y(128), { waves: 1, amp: 4 });
    note(svg, g.X(555), g.Y(218), 'B (fluorescent)', { size: 22 });
    svg.squiggle(g.X(545), g.Y(208), g.X(549), g.Y(184), { waves: 1, amp: 4 });
    note(svg, g.X(560), g.Y(15), 'C (incandescent)', { size: 22 });
    // Curve C passes 88 at 552 nm, so the leader stops just under it.
    svg.squiggle(g.X(545), g.Y(28), g.X(552), g.Y(82), { waves: 1, amp: 4 });
    note(svg, g.X(650), g.Y(227), 'D (He-Ne)', { size: 22 });
    svg.squiggle(g.X(642), g.Y(218), g.X(635), g.Y(200), { waves: 1, amp: 4 });
    return svg.render();
  },

  // 26.3 Fig. 5 — edges look sharper than they are
  Figure_26_03_05: () => {
    const svg = new Svg({
      width: 520,
      height: 820,
      title: 'Edge enhancement in vision',
      desc: 'Five strips of gray, each uniformly shaded, from black to light gray. Below them, the actual light intensity is a staircase of flat steps. Lowest, the signals from the rods and cones overshoot at each edge, making each strip look darker on its dark side and lighter on its light side.',
    });
    const shades = ['#050505', '#474747', '#7f7f7f', '#ababab', '#d8d8d8'];
    shades.forEach((c, k) => svg.rect(120 + k * 70, 20, 70, 220, { fill: c }));
    const steps = (y0, spike) => {
      svg.arrow(120, y0 + 170, 120, y0, { color: COLORS.black, width: 1.5, head: 10 });
      svg.arrow(120, y0 + 170, 500, y0 + 170, { color: COLORS.black, width: 1.5, head: 10 });
      const pts = [];
      for (let k = 0; k < 5; k += 1) {
        const level = y0 + 140 - k * 26;
        const x0 = 120 + k * 70;
        for (let j = 0; j <= 30; j += 1) {
          const u = j / 30;
          // A sharp overshoot after each edge, relaxing back to the step.
          const over = spike && k > 0 ? 18 * Math.exp(-u * 9) : 0;
          pts.push([x0 + u * 70, level - over]);
        }
      }
      svg.polyline(pts, { color: CURVE, width: 3 });
    };
    steps(280, false);
    steps(540, true);
    svg.text(60, 365, 'Actual light', { size: 18, math: false, rotate: -90 });
    svg.text(84, 365, 'intensities', { size: 18, math: false, rotate: -90 });
    svg.text(60, 620, 'Signal intensities', { size: 18, math: false, rotate: -90 });
    svg.text(84, 620, 'from rods and cones', { size: 18, math: false, rotate: -90 });
    return svg.render();
  },

  // 26.4 Fig. 3 — numerical aperture: the acceptance angle
  Figure_26_04_03: () => {
    const svg = new Svg({
      width: 760,
      height: 470,
      title: 'Acceptance angle of a microscope objective',
      desc: '(a) Rays from a point P spread to the edges of an objective lens; θ is half the angle of the cone of rays the lens accepts, measured from the axis. The numerical aperture is NA = n sin θ. (b) A cone of light from a specimen enters a microscope objective of diameter D; α is half the acceptance angle.',
    });
    const P = [80, 210];
    const L = [330, 210];
    const h = 95;
    svg.line(P[0], 90, P[0], 330, { color: COLORS.black, width: 2 });
    svg.line(P[0], P[1], 420, P[1], { color: COLORS.black, width: 1.5, dash: '7 5' });
    thinLens(svg, L[0], L[1], h, { w: 26 });
    svg.line(...P, L[0] - 6, L[1] - h, { color: LIGHT, width: 2 });
    svg.line(...P, L[0] - 6, L[1] + h, { color: LIGHT, width: 2 });
    svg.circle(...P, 6, { fill: COLORS.black });
    const half = (Math.atan2(h, L[0] - 6 - P[0]) * 180) / Math.PI;
    svg.arc(...P, 90, -half, 0, { color: COLORS.black, width: 1.5 });
    lab(svg, P[0] + 106, P[1] + 22, 'θ');
    lab(svg, P[0] - 22, P[1] - 18, 'P', { anchor: 'end' });
    caption(svg, 240, 440, '(a)');
    // (b) Objective and the cone of light from the specimen.
    const [cx, top, focus] = [600, 40, 380];
    svg.add(
      '<defs><linearGradient id="cone26" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6b25c"/><stop offset="0.5" stop-color="#fde3b9"/><stop offset="1" stop-color="#f6b25c"/></linearGradient></defs>'
    );
    svg.rect(cx - 70, top, 140, 30, { fill: '#bcc8d6', stroke: '#7d8aa6', width: 1.2 });
    svg.rect(cx - 56, top + 30, 112, 80, { fill: '#d9b98d', stroke: '#8a6a40', width: 1.2 });
    svg.rect(cx - 62, top + 108, 124, 26, { fill: '#5b9fd8', stroke: '#2f6aa0', width: 1.5 });
    svg.polygon(
      [
        [cx - 50, top + 134],
        [cx + 50, top + 134],
        [cx, focus],
      ],
      { fill: 'url(#cone26)', opacity: 0.9 }
    );
    svg.rect(cx - 100, focus, 200, 14, { fill: '#5b7fc4', stroke: '#2f4f8a', width: 1.2 });
    svg.line(cx, top - 20, cx, focus + 30, { color: COLORS.black, width: 1.4 });
    svg.arrow(cx - 40, top + 176, cx + 40, top + 176, {
      color: COLORS.black,
      width: 1.6,
      head: 10,
      start: true,
    });
    lab(svg, cx + 64, top + 176, 'D');
    svg.arc(cx, focus, 120, 90, 90 + (Math.atan2(50, focus - top - 134) * 180) / Math.PI, {
      color: COLORS.black,
      width: 1.5,
    });
    svg.arrow(cx + 40, focus - 120, cx + 6, focus - 120, {
      color: COLORS.black,
      width: 1.4,
      head: 9,
    });
    lab(svg, cx + 54, focus - 120, 'α');
    note(svg, cx - 120, focus - 120, 'Light', { anchor: 'end' });
    note(svg, cx - 120, focus - 94, 'Cone', { anchor: 'end' });
    svg.line(cx - 112, focus - 114, cx - 26, focus - 114, { color: COLORS.black, width: 1.4 });
    caption(svg, cx, 440, '(b)');
    return svg.render();
  },

  // 26.4 Fig. 4 — the acceptance angle of an optical fiber
  Figure_26_04_04: () => {
    const svg = new Svg({
      width: 880,
      height: 270,
      title: 'Acceptance angle of an optical fiber',
      desc: 'A ray enters the end of an optical fiber at the edge of its cone of acceptance, making angle αmax with the axis, bends toward the axis as it enters the core, and is guided along the core by total internal reflection at the boundary with the cladding. The two lines bounding the full acceptance angle meet at the fiber’s end.',
    });
    svg.add(
      '<defs><linearGradient id="core26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fb4c9"/><stop offset="0.12" stop-color="#d9eff7"/><stop offset="0.5" stop-color="#f4fbfd"/><stop offset="0.88" stop-color="#d9eff7"/><stop offset="1" stop-color="#9fb4c9"/></linearGradient></defs>'
    );
    const [L, T, B] = [440, 90, 210];
    // Cladding around a core of higher index; the ray reflects at their boundary.
    const clad = 16;
    const [cT, cB] = [T + clad, B - clad];
    svg.rect(L, T, 430, B - T, { fill: '#b4c6d4', stroke: '#8aa0b5', width: 1.5, rx: 8 });
    svg.rect(L, cT, 430, cB - cT, { fill: 'url(#core26)' });
    const C = [L, 150];
    // The acceptance cone: lines at ±αmax from the center of the fiber's end.
    const a = 15;
    const t = Math.tan((a * Math.PI) / 180);
    svg.line(...C, C[0] - 330, C[1] - 330 * t, { color: COLORS.black, width: 1.5 });
    svg.line(...C, C[0] - 330, C[1] + 330 * t, { color: COLORS.black, width: 1.5 });
    svg.line(C[0] - 260, C[1], C[0], C[1], { color: COLORS.black, width: 1.5, dash: '8 6' });
    // The ray arrives at αmax, just inside the lower edge of the cone, refracts
    // toward the axis at the end face and reflects totally at the cladding.
    const E = [L, 136];
    const dIn = unit([1, -t]);
    ray(svg, sub(E, mul(dIn, 340)), E, { arrow: 0.6 });
    const d1 = refract(dIn, [-1, 0], 1, 1.5);
    const H = add(E, mul(d1, (cT - E[1]) / d1[1]));
    ray(svg, E, H, { arrow: 0.6 });
    const d2 = [d1[0], -d1[1]];
    ray(svg, H, add(H, mul(d2, (L + 424 - H[0]) / d2[0])), { arrow: 0.6 });
    svg.arc(...C, 300, 180 - a, 180 + a, { color: COLORS.black, width: 1.5 });
    // αmax is marked on the upper half of the cone, clear of the ray below.
    svg.arc(...C, 150, 180 - a, 180, { color: COLORS.black, width: 1.5 });
    lab(svg, C[0] - 196, C[1] - 18, 'α_{max}', { size: 20 });
    note(svg, 60, 120, 'full acceptance', { size: 18 });
    note(svg, 60, 142, 'angle', { size: 18 });
    note(svg, 520, 60, 'cladding', { size: 18 });
    svg.line(530, 70, 540, T + 8, { color: COLORS.black, width: 1.2 });
    note(svg, 500, 250, 'core', { size: 18 });
    svg.line(505, 236, 530, 180, { color: COLORS.black, width: 1.2 });
    return svg.render();
  },

  // 26.4 Fig. 5 — oil and water immersion let more rays reach the objective
  Figure_26_04_05: () => {
    const svg = new Svg({
      width: 560,
      height: 440,
      title: 'Immersion objectives',
      desc: 'Rays leave a specimen on a cover glass at the same angle and refract into the medium between the cover glass and the objective. In air (a) the ray bends far from the axis and misses the objective; in water (b), n = 1.33, it bends less; in oil (c), n = 1.51, almost not at all, so more rays enter the objective.',
    });
    const [gTop, gBot] = [330, 370];
    svg.add(
      '<defs><linearGradient id="cover26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b9fd8"/><stop offset="0.5" stop-color="#e8f4fc"/><stop offset="1" stop-color="#5b9fd8"/></linearGradient><linearGradient id="drop26" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9d4f2"/><stop offset="1" stop-color="#3f86c6"/></linearGradient></defs>'
    );
    svg.path('M 220 270 Q 300 170 380 270 Z', {
      color: '#3f86c6',
      width: 1.5,
      fill: 'url(#drop26)',
    });
    svg.line(160, 270, 500, 270, { color: '#9fd4e0', width: 3 });
    svg.rect(160, gTop, 340, gBot - gTop, { fill: 'url(#cover26)', stroke: '#2f6aa0', width: 1.5 });
    const P = [330, 364];
    svg.line(330, 20, 330, P[1], { color: COLORS.black, width: 2 });
    // The same 35° ray in the glass (n = 1.52) refracts into each medium.
    const a = (35 * Math.PI) / 180;
    for (const [n, side, label] of [
      [1.0, -1, '(a)'],
      [1.33, 1, '(b)'],
      [1.51, 1, '(c)'],
    ]) {
      const dGlass = [side * Math.sin(a), -Math.cos(a)];
      const S = add(P, mul(dGlass, (gTop - P[1]) / dGlass[1]));
      const d = refract(dGlass, [0, 1], 1.52, n);
      const E = add(S, mul(d, n === 1.51 ? 290 : 250));
      svg.line(...P, ...S, { color: COLORS.black, width: 2.5 });
      svg.line(...S, ...E, { color: COLORS.black, width: 2.5 });
      lab(svg, E[0] + side * 16, E[1] - 14, label, { math: false, size: 26 });
    }
    svg.circle(...P, 6, { fill: COLORS.black });
    note(svg, 200, 70, 'objective', { size: 26 });
    svg.line(210, 86, 268, 236, { color: COLORS.black, width: 2 });
    note(svg, 150, 290, 'immersion', { size: 26, anchor: 'end' });
    note(svg, 150, 352, 'cover glass', { size: 26, anchor: 'end' });
    return svg.render();
  },

  // 26.5 Fig. 3 — a reflecting telescope
  Figure_26_05_03: () => {
    const svg = new Svg({
      width: 680,
      height: 560,
      title: 'A reflecting telescope',
      desc: 'Parallel rays from a distant object strike a large concave mirror, the objective, which reflects them toward its focal point. A small flat mirror at 45° intercepts them and sends them down through an eyepiece lens, which makes them parallel again for the eye.',
    });
    const V = [640, 240];
    const R = 800;
    const C = [V[0] - R, V[1]];
    // The objective: a spherical mirror of radius 800, so f = 400.
    const arc = [];
    const back = [];
    for (let k = 0; k <= 40; k += 1) {
      const y = 50 + (380 * k) / 40;
      const x = C[0] + Math.sqrt(R * R - (y - V[1]) ** 2);
      arc.push([x, y]);
      back.push([x + 22, y]);
    }
    svg.polygon([...arc, ...back.reverse()], { fill: '#c9cad2', stroke: '#7d8090', width: 1.2 });
    svg.polyline(arc, { color: LIGHT, width: 2.4 });
    // Flat mirror on the line x + y = 600, crossing the axis at x = 360.
    const M1 = [312, 288];
    const M2 = [412, 188];
    svg.polygon([M1, M2, add(M2, [-10, -10]), add(M1, [-10, -10])], {
      fill: '#c9cad2',
      stroke: '#7d8090',
      width: 1.2,
    });
    svg.line(...M1, ...M2, { color: LIGHT, width: 2.4 });
    const lensY = 430;
    thinLens(svg, 360, lensY, 90, { horizontal: true, w: 10 });
    for (const y of [110, 370]) {
      const [, H, F, L] = telescopeRayPath(y);
      ray(svg, [40, y], H, { arrow: 0.55 });
      ray(svg, H, F, { arrow: 0.5 });
      ray(svg, F, L, { arrow: 0.35 });
      ray(svg, L, [L[0], 540], { arrow: 0.6 });
    }
    note(svg, 470, 26, 'Concave', { size: 22 });
    note(svg, 470, 52, 'mirror', { size: 22 });
    note(svg, 470, 78, '(objective)', { size: 22 });
    note(svg, 190, 420, 'Eyepiece', { size: 22 });
    note(svg, 190, 446, '(lens)', { size: 22 });
    return svg.render();
  },

  // 26.6 Fig. 1 — chromatic aberration and the achromatic doublet
  Figure_26_06_01: () => {
    const svg = new Svg({
      width: 760,
      height: 920,
      title: 'Chromatic aberration',
      desc: '(a) White light from a point passes through a single converging lens. Violet light is bent more than red, so it focuses closer to the lens (V) than red light does (R), and the colors spread into fans. (b) An achromatic doublet, a converging lens cemented to a weaker diverging lens of different glass, brings white light of all colors to one focus.',
    });
    const colors = [700, 640, 590, 550, 500, 450, 410].map(nm => [nm, spectral(nm)]);
    // (a) A source at 250 from the lens; f runs from 145 (violet) to 160 (red).
    const [cx, cy] = [270, 230];
    const S = [20, cy];
    const fOf = nm => 145 + ((nm - 410) / 290) * 15;
    const imageX = nm => cx + 1 / (1 / fOf(nm) - 1 / (cx - S[0]));
    thinLens(svg, cx, cy, 150, { w: 16 });
    for (const h of [-140, 140]) {
      const P = [cx, cy + h];
      ray(svg, S, P, { arrow: 0.55 });
      for (const [nm, c] of colors) {
        const I = [imageX(nm), cy];
        const d = unit(sub(I, P));
        svg.line(...P, ...add(I, mul(d, 70)), { color: c, width: 3 });
      }
    }
    ray(svg, S, [700, cy], { arrow: 0.2 });
    const V = [imageX(410), cy];
    const Rr = [imageX(700), cy];
    svg.circle(...V, 6, { fill: '#7b1c38' });
    svg.circle(...Rr, 6, { fill: '#7b1c38' });
    svg.circle(...S, 6, { fill: '#7b1c38' });
    lab(svg, V[0] - 14, cy - 26, 'V', { math: false, size: 22 });
    lab(svg, Rr[0] + 12, cy - 26, 'R', { math: false, size: 22 });
    for (const [x, y, tx, ty] of [
      [90, 120, 130, 170],
      [200, 150, 215, 220],
      [90, 340, 130, 290],
      [620, 380, 600, 240],
    ]) {
      note(svg, x, y, 'White', { size: 20 });
      svg.squiggle(x, y + 12, tx, ty, { waves: 1, amp: 4 });
    }
    caption(svg, 270, 420, '(a)');
    // (b) An achromatic doublet: every color meets at one focus.
    const [cx2, cy2] = [270, 690];
    thinLens(svg, cx2 - 12, cy2, 150, { w: 16 });
    svg.path(
      `M ${cx2 + 4} ${cy2 - 150} L ${cx2 + 34} ${cy2 - 150} Q ${cx2 + 10} ${cy2} ${cx2 + 34} ${cy2 + 150} L ${cx2 + 4} ${cy2 + 150} Q ${cx2 + 28} ${cy2} ${cx2 + 4} ${cy2 - 150} Z`,
      {
        color: GLASS[2],
        width: 1.5,
        fill: '#c9d9cf',
      }
    );
    const Fd = [cx2 + 260, cy2];
    for (const h of [-130, 0, 130]) {
      ray(svg, [40, cy2 + h], [cx2 - 6, cy2 + h], { arrow: 0.6 });
      if (!h) {
        ray(svg, [cx2 + 30, cy2], [700, cy2], { arrow: false });
        continue;
      }
      colors.forEach(([, c], k) => {
        const P = [cx2 + 30, cy2 + h + (k - 3) * 3 * Math.sign(h)];
        svg.line(...P, ...Fd, { color: c, width: 3 });
      });
    }
    svg.circle(...Fd, 6, { fill: '#7b1c38' });
    for (const [x, y, tx, ty] of [
      [120, 570, 130, 556],
      [120, 650, 130, 686],
      [120, 790, 130, 816],
      [560, 630, Fd[0], Fd[1] - 8],
    ]) {
      note(svg, x, y, 'White', { size: 20 });
      if (y !== 570) svg.squiggle(x, y + 12, tx, ty, { waves: 1, amp: 4 });
    }
    caption(svg, 270, 890, '(b)');
    return svg.render();
  },

  // 26.6 Fig. 2 — coma
  Figure_26_06_02: () => {
    const svg = new Svg({
      width: 840,
      height: 440,
      title: 'Coma',
      desc: 'Parallel rays from an off-axis point strike a converging lens at an angle. Traced through the lens’s spherical surfaces, rays through different parts of the lens cross at different points, so there is no single focus and the image is smeared.',
    });
    // Faces of radius 260, 80 apart on the axis, leave a 10-unit rim at h = 130.
    const trace = sphericalLens(svg, 170, 250, 260, 260, 130);
    const d = unit([Math.cos((18 * Math.PI) / 180), -Math.sin((18 * Math.PI) / 180)]);
    for (const h of [-100, -50, 0, 50, 100]) {
      const P = add([210, 260 + h], mul(d, -240));
      const traced = trace(P, d);
      if (!traced) continue;
      const { H1, H2, d2 } = traced;
      ray(svg, P, H1, { arrow: 0.5 });
      ray(svg, H1, H2, { arrow: false });
      ray(svg, H2, add(H2, mul(d2, 560)), { arrow: false });
    }
    return svg.render();
  },

  // 26.6 Fig. 3 — spherical aberration
  Figure_26_06_03: () => {
    const svg = new Svg({
      width: 780,
      height: 330,
      title: 'Spherical aberration',
      desc: 'Parallel rays at different heights pass through a converging lens with spherical surfaces. Rays through the outer zones of the lens are bent more and cross the axis closer to the lens than rays near the axis, so there is no single focal point.',
    });
    const trace = sphericalLens(svg, 150, 240, 165, 230, 120);
    for (const h of [-110, -75, -40, 0, 40, 75, 110]) {
      const P = [20, 165 + h];
      const traced = trace(P, [1, 0]);
      if (!traced) continue;
      const { H1, H2, d2 } = traced;
      ray(svg, P, H1, { arrow: 0.5 });
      ray(svg, H1, H2, { arrow: false });
      ray(svg, H2, add(H2, mul(d2, (770 - H2[0]) / d2[0])), { arrow: false });
    }
    return svg.render();
  },
};
