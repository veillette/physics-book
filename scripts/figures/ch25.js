/**
 * Chapter 25: reflection, refraction, total internal reflection, dispersion,
 * thin lenses and spherical mirrors.
 *
 * Rays are traced, not sketched. Refraction uses Snell's law in vector form
 * and reflection the law of reflection; spherical mirrors reflect each ray
 * from the true circular surface, so a large mirror shows spherical
 * aberration and a small one focuses at R/2. Thin lenses bend rays at their
 * central plane, and the mirror ray diagram uses 1/d_o + 1/d_i = 1/f.
 * Lengths given in the text (13.4 cm and 15.0 cm in 25.4) are drawn to scale.
 */
import { COLORS, Svg } from './svg.js';

const LIGHT = '#1fa8d8';
const GLASS = ['#eef4f0', '#b9cfc3', '#6f8f80'];
const MIRROR = ['#f1f2f6', '#a9abb6', '#6f7280'];

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 18, math: false });
}

const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const unit = a => mul(a, 1 / Math.hypot(...a));
const dir = deg => [Math.cos((deg * Math.PI) / 180), -Math.sin((deg * Math.PI) / 180)];

/** Refract unit direction d at a surface with unit normal nrm (either side), from index n1 to n2. */
function refract(d, nrm, n1, n2) {
  const n = dot(d, nrm) > 0 ? mul(nrm, -1) : nrm;
  const cosi = -dot(n, d);
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null;
  return unit(add(mul(d, eta), mul(n, eta * cosi - Math.sqrt(k))));
}

const reflect = (d, n) => sub(d, mul(n, 2 * dot(d, n)));

/** Where the ray P + t·d meets the line through A and B (t ≥ 0), or null. */
function hit(P, d, A, B) {
  const e = sub(B, A);
  const den = d[0] * e[1] - d[1] * e[0];
  if (Math.abs(den) < 1e-9) return null;
  const w = sub(A, P);
  const t = (w[0] * e[1] - w[1] * e[0]) / den;
  return t >= 0 ? add(P, mul(d, t)) : null;
}

/** A light ray from P to Q, with an arrowhead partway along unless `arrow` is false. */
function ray(svg, P, Q, { arrow = 0.55, dash, color = LIGHT, width = 2.4 } = {}) {
  svg.line(...P, ...Q, { color, width, dash });
  if (arrow) {
    const d = unit(sub(Q, P));
    const M = add(P, mul(sub(Q, P), arrow));
    svg.arrow(...sub(M, mul(d, 10)), ...add(M, mul(d, 6)), { color, width, head: 14 });
  }
}

/** Angle mark between directions u and v (screen vectors) at `at`, with a label. */
function angle(svg, at, u, v, r, label, { labelR = r + 18, size = 22 } = {}) {
  const deg = w => (Math.atan2(-w[1], w[0]) * 180) / Math.PI;
  let [a1, a2] = [deg(u), deg(v)];
  if ((((a2 - a1) % 360) + 360) % 360 > 180) [a1, a2] = [a2, a1];
  svg.arc(...at, r, a1, a2, { color: COLORS.black, width: 1.5 });
  const m = unit(add(unit(u), unit(v)));
  if (label) lab(svg, ...add(at, mul(m, labelR)), label, { size });
}

function dashed(svg, P, Q) {
  svg.line(...P, ...Q, { color: COLORS.black, width: 1.4, dash: '6 5' });
}

/** Thin lens drawn as glass: biconvex or biconcave, centered at (cx, cy), half-height h. */
function lens(svg, cx, cy, h, { concave = false, w = 22 } = {}) {
  const id = `lens_${cx}_${cy}_${h}`;
  svg.add(
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${GLASS[1]}"/><stop offset="0.45" stop-color="${GLASS[0]}"/><stop offset="1" stop-color="${GLASS[1]}"/></linearGradient></defs>`
  );
  const d = concave
    ? `M ${cx - w} ${cy - h} L ${cx + w} ${cy - h} Q ${cx + w * 0.15} ${cy} ${cx + w} ${cy + h} L ${cx - w} ${cy + h} Q ${cx - w * 0.15} ${cy} ${cx - w} ${cy - h} Z`
    : `M ${cx} ${cy - h} Q ${cx + w * 2} ${cy} ${cx} ${cy + h} Q ${cx - w * 2} ${cy} ${cx} ${cy - h} Z`;
  svg.path(d, { color: GLASS[2], width: 1.5, fill: `url(#${id})` });
}

/** A spherical mirror: the arc of radius R about C between angles a1 and a2 (degrees, y up), backed outward. */
function mirror(svg, C, R, a1, a2, { thick = 16, convex = false } = {}) {
  const pts = (r, from, to) =>
    Array.from({ length: 41 }, (_, k) => add(C, mul(dir(from + ((to - from) * k) / 40), r)));
  const back = convex ? R - thick : R + thick;
  const outline = [...pts(R, a1, a2), ...pts(back, a2, a1)];
  svg.polygon(outline, { fill: MIRROR[1], stroke: MIRROR[2], width: 1.2 });
  svg.polyline(pts(R, a1, a2), { color: LIGHT, width: 2.4 });
}

function dot2(svg, P) {
  svg.circle(...P, 5.5, { fill: '#c0392b', stroke: '#7b1c14', width: 1 });
}

/** Horizontal dimension from x1 to x2 at y with a label above (or below). */
function hdim(svg, x1, x2, y, label, { below = false, size = 22 } = {}) {
  svg.arrow(Math.min(x1, x2) + 1, y, Math.max(x1, x2) - 1, y, {
    color: COLORS.black,
    width: 1.4,
    head: 10,
    start: true,
  });
  for (const x of [x1, x2]) svg.line(x, y - 9, x, y + 9, { color: COLORS.black, width: 1.3 });
  lab(svg, (x1 + x2) / 2, below ? y + 22 : y - 18, label, { size });
}

function vdim(svg, x, y1, y2, label, { side = 1, size = 22 } = {}) {
  svg.arrow(x, Math.min(y1, y2) + 1, x, Math.max(y1, y2) - 1, {
    color: COLORS.black,
    width: 1.4,
    head: 10,
    start: true,
  });
  for (const y of [y1, y2]) svg.line(x - 9, y, x + 9, y, { color: COLORS.black, width: 1.3 });
  lab(svg, x + side * 14, (y1 + y2) / 2, label, { anchor: side > 0 ? 'start' : 'end', size });
}

/** Expanded view of one ray crossing a wedge of lens glass (n = 1.5), with the normals at both faces. */
function lensSlice(svg, { top, x1, x2, len, tilt, y, xStart, xEnd }) {
  // Faces tilt by `tilt` degrees: outward normals lean up (converging wedge) or down (diverging).
  const nL = dir(180 - tilt);
  const nR = dir(tilt);
  const fL = [nL[1], -nL[0]];
  const fR = [-nR[1], nR[0]];
  const A1 = [x1, top];
  const A2 = add(A1, mul(fL[1] > 0 ? fL : mul(fL, -1), len));
  const B1 = [x2, top];
  const B2 = add(B1, mul(fR[1] > 0 ? fR : mul(fR, -1), len));
  svg.polygon([A1, B1, B2, A2], { fill: GLASS[1], stroke: GLASS[2], width: 1.5 });
  const P = [xStart, y];
  const d0 = [1, 0];
  const H1 = hit(P, d0, A1, A2);
  const d1 = refract(d0, nL, 1, 1.5);
  const H2 = hit(H1, d1, B1, B2);
  const d2 = refract(d1, nR, 1.5, 1);
  const E = add(H2, mul(d2, (xEnd - H2[0]) / d2[0]));
  ray(svg, P, H1);
  ray(svg, H1, H2, { arrow: false });
  ray(svg, H2, E);
  dashed(svg, add(H1, mul(nL, 46)), sub(H1, mul(nL, 46)));
  dashed(svg, add(H2, mul(nR, 46)), sub(H2, mul(nR, 46)));
  return { H1, H2, d0, d1, d2, nL, nR, E };
}

export default {
  // 25.2 Fig. 1 — the law of reflection
  Figure_25_02_01: () => {
    const svg = new Svg({
      width: 620,
      height: 500,
      title: 'The law of reflection',
      desc: 'A ray strikes a flat surface and reflects. The incident ray makes angle θi with the perpendicular to the surface at the point where it strikes, and the reflected ray makes angle θr with the same perpendicular, on the other side; θr = θi.',
    });
    const O = [265, 405];
    const th = 30;
    const inc = add(O, mul(dir(90 + th), 330));
    const ref = add(O, mul(dir(90 - th), 330));
    svg.polygon(
      [
        O,
        add(O, mul(dir(90 + th), 220)),
        add(O, mul(dir(90), 236)),
        add(O, mul(dir(90 - th), 220)),
      ],
      {
        fill: '#c4e6f6',
      }
    );
    svg.polygon(
      [
        [10, 385],
        [390, 385],
        [520, 435],
        [140, 435],
      ],
      { fill: '#e3ecf7', stroke: '#7d93bf', width: 1.5 }
    );
    svg.polygon(
      [
        [140, 435],
        [520, 435],
        [520, 458],
        [140, 458],
      ],
      { fill: '#8fa6d3', stroke: '#6b80ad', width: 1.5 }
    );
    svg.polygon(
      [
        [10, 385],
        [140, 435],
        [140, 458],
        [10, 408],
      ],
      { fill: '#a9bce0', stroke: '#6b80ad', width: 1.5 }
    );
    dashed(svg, O, [O[0], 92]);
    ray(svg, inc, O, { arrow: 0.12 });
    ray(svg, O, ref, { arrow: 0.92 });
    const r = 205;
    svg.arc(...O, r, 90, 90 + th, { color: COLORS.black, width: 2.5 });
    svg.arc(...O, r, 90 - th, 90, { color: COLORS.black, width: 2.5 });
    for (const s of [1, -1]) {
      const end = add(O, mul(dir(90 + s * th), r));
      const back = add(O, mul(dir(90 + s * (th - 4)), r));
      svg.arrow(...back, ...end, { color: COLORS.black, width: 2.5, head: 14 });
    }
    lab(svg, ...add(O, mul(dir(90 + th / 2), r + 24)), 'θ_i');
    lab(svg, ...add(O, mul(dir(90 - th / 2), r + 24)), 'θ_r');
    note(svg, 265, 28, 'Perpendicular', { size: 26 });
    note(svg, 265, 62, 'to surface', { size: 26 });
    note(svg, 130, 106, 'Incident ray', { size: 26 });
    note(svg, 404, 106, 'Reflected ray', { size: 26 });
    note(svg, 58, 352, 'Surface', { size: 26 });
    return svg.render();
  },

  // 25.2 Fig. 7 — a corner reflector
  Figure_25_02_07: () => {
    const svg = new Svg({
      width: 600,
      height: 620,
      title: 'A corner reflector',
      desc: 'Two mirrors meet at a right angle. A ray reflects from the lower mirror, making equal angles θ1 with its normal, then from the upper mirror, making equal angles θ2 with that normal, and leaves parallel to the incoming ray but traveling in the opposite direction.',
    });
    const C = [545, 330];
    const uA = dir(120);
    const uB = dir(210);
    // Normals point into the open side of the corner.
    const nA = [-0.866, 0.5];
    const nB = [-0.5, -0.866];
    const plate = (u, n, len) => {
      const E = add(C, mul(u, len));
      svg.polygon([C, E, sub(E, mul(n, 16)), sub(C, mul(n, 16))], {
        fill: MIRROR[1],
        stroke: MIRROR[2],
        width: 1.2,
      });
      svg.line(...C, ...E, { color: LIGHT, width: 2.4 });
    };
    plate(uA, unit(nA), 360);
    plate(uB, unit(nB), 400);
    const d0 = unit([1, -0.052]);
    const P0 = [40, 420];
    const H1 = hit(P0, d0, C, add(C, uB));
    const d1 = reflect(d0, unit(nB));
    const H2 = hit(H1, d1, C, add(C, uA));
    const d2 = reflect(d1, unit(nA));
    const E = add(H2, mul(d2, 450));
    ray(svg, P0, H1);
    ray(svg, H1, H2, { arrow: false });
    ray(svg, H2, E);
    for (const [H, n, din, dout, s] of [
      [H1, unit(nB), d0, d1, 'θ_1'],
      [H2, unit(nA), d1, d2, 'θ_2'],
    ]) {
      svg.line(...H, ...add(H, mul(n, 60)), { color: COLORS.black, width: 1.4 });
      angle(svg, H, n, mul(din, -1), 40, s, { labelR: 64 });
      angle(svg, H, n, dout, 30, s, { labelR: 52 });
    }
    return svg.render();
  },

  // 25.2 Fig. 8 — a flat mirror keeps rays diverging at the same angle
  Figure_25_02_08: () => {
    const svg = new Svg({
      width: 1000,
      height: 640,
      title: 'Reflection from a flat mirror',
      desc: 'Two rays leave a point at angle θ to each other and strike a flat mirror at two places, each reflecting with equal angles to the normal (θ1 and θ1, θ2 and θ2). The reflected rays still diverge at angle θ. Extended backward as dashed lines, they meet at a point behind the mirror, where they also make angle θ.',
    });
    const y = 300;
    svg.rect(60, y, 930, 26, { fill: '#c9d6ec', stroke: '#7d93bf', width: 1.5 });
    svg.line(60, y, 990, y, { color: LIGHT, width: 2.4 });
    const S = [110, 40];
    const Si = [110, 2 * y - 40];
    const H = [
      [380, y],
      [620, y],
    ];
    for (const [k, Hk] of H.entries()) {
      const din = unit(sub(Hk, S));
      const dout = [din[0], -din[1]];
      ray(svg, S, Hk);
      ray(svg, Hk, add(Hk, mul(dout, 360)), { arrow: 0.45 });
      svg.line(...Hk, ...Si, { color: LIGHT, width: 2, dash: '8 6' });
      dashed(svg, Hk, [Hk[0], y - 60]);
      const s = `θ_${k + 1}`;
      angle(svg, Hk, [0, -1], mul(din, -1), 32, s, { labelR: 56 });
      angle(svg, Hk, [0, -1], dout, 32, s, { labelR: 56 });
    }
    const d1 = unit(sub(H[0], S));
    const d2 = unit(sub(H[1], S));
    angle(svg, S, d1, d2, 70, '');
    lab(svg, S[0] + 150, S[1] + 6, 'θ', { size: 26 });
    svg.squiggle(S[0] + 138, S[1] + 6, ...add(S, mul(unit(add(d1, d2)), 72)), { waves: 1, amp: 3 });
    angle(svg, Si, [d1[0], -d1[1]], [d2[0], -d2[1]], 70, '');
    lab(svg, Si[0] + 150, Si[1] - 6, 'θ', { size: 26 });
    svg.squiggle(
      Si[0] + 138,
      Si[1] - 6,
      ...add(Si, mul(unit([d1[0] + d2[0], -(d1[1] + d2[1])]), 72)),
      {
        waves: 1,
        amp: 3,
      }
    );
    svg.circle(...S, 7, { fill: LIGHT });
    return svg.render();
  },

  // 25.3 Fig. 6 — through a second medium into a third
  Figure_25_03_06: () => {
    const svg = new Svg({
      width: 700,
      height: 720,
      title: 'Refraction through an intermediate medium',
      desc: 'A ray in medium n1 strikes a layer of medium n2 at angle θ1, bends toward the normal to θ2, and then enters medium n3 at angle θ3. A dashed line shows the path the ray would take if medium n2 were not there: it has the same final direction θ3, but the actual ray is displaced sideways by Δx (exaggerated).',
    });
    // n1 = 1.00, n2 = 1.60, n3 = 1.20 with θ1 = 40°.
    const [n1, n2, n3] = [1.0, 1.6, 1.2];
    const [y1, y2, yb] = [200, 420, 660];
    svg.rect(30, y1, 640, y2 - y1, { fill: '#e6ebf7' });
    svg.rect(30, y2, 640, yb + 40 - y2, { fill: '#e2e2e2' });
    svg.line(30, y1, 670, y1, { color: COLORS.black, width: 1.5 });
    svg.line(30, y2, 670, y2, { color: COLORS.black, width: 1.5 });
    const P1 = [250, y1];
    const d0 = unit([Math.sin((40 * Math.PI) / 180), Math.cos((40 * Math.PI) / 180)]);
    const d1 = refract(d0, [0, -1], n1, n2);
    const P2 = add(P1, mul(d1, (y2 - y1) / d1[1]));
    const d2 = refract(d1, [0, -1], n2, n3);
    const P3 = add(P2, mul(d2, (yb - y2) / d2[1]));
    const dd = refract(d0, [0, -1], n1, n3);
    const Q2 = add(P1, mul(dd, (y2 - y1) / dd[1]));
    const Q3 = add(P1, mul(dd, (yb - y1) / dd[1]));
    ray(svg, sub(P1, mul(d0, 230)), P1, { arrow: 0.5 });
    ray(svg, P1, P2, { arrow: 0.75 });
    ray(svg, P2, P3, { arrow: 0.6 });
    ray(svg, P1, Q3, { dash: '8 6', arrow: 0.62 });
    for (const P of [P1, P2, Q2]) dashed(svg, sub(P, [0, 36]), add(P, [0, 36]));
    angle(svg, P1, [0, -1], mul(d0, -1), 30, 'θ_1', { labelR: 52 });
    angle(svg, P1, [0, 1], d1, 30, 'θ_2', { labelR: 52 });
    angle(svg, P2, [0, -1], mul(d1, -1), 30, 'θ_2', { labelR: 52 });
    angle(svg, P2, [0, 1], d2, 30, 'θ_3', { labelR: 52 });
    angle(svg, Q2, [0, 1], dd, 30, 'θ_3', { labelR: 52 });
    hdim(svg, P3[0], Q3[0], yb + 20, 'Δx', { below: true });
    for (const [y, s] of [
      [y1 - 22, 'n_1'],
      [y1 + 90, 'n_2'],
      [y2 + 24, 'n_3'],
    ])
      lab(svg, 46, y, s, { anchor: 'start' });
    return svg.render();
  },

  // 25.4 problem — a ray in a liquid at the critical angle
  Figure_25_04_09: () => {
    const svg = new Svg({
      width: 680,
      height: 500,
      title: 'Total internal reflection at a liquid surface',
      desc: 'A light ray from a point 15.0 cm below the surface of a liquid of index n1 travels up to the surface, striking it 13.4 cm away horizontally, at the critical angle θc, and is totally reflected back into the liquid. Above the surface is medium n2.',
    });
    // 24 px per cm: 15.0 cm deep, 13.4 cm across.
    const k = 24;
    const top = 60;
    const O = [500, top + 15 * k];
    const H = [O[0] - 13.4 * k, top];
    svg.add(
      '<defs><linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde9d6"/><stop offset="1" stop-color="#f6a965"/></linearGradient></defs>'
    );
    svg.rect(0, top, 680, 500 - top, { fill: 'url(#liquid)' });
    svg.line(0, top, 680, top, { color: '#e3a35c', width: 2 });
    const d = unit(sub(H, O));
    ray(svg, O, H, { arrow: 0.5 });
    ray(svg, H, add(H, mul([d[0], -d[1]], 130)), { arrow: 0.7 });
    dashed(svg, H, [H[0], top + 70]);
    angle(svg, H, [0, 1], mul(d, -1), 34, 'θ_c', { labelR: 56 });
    svg.circle(...O, 6, { fill: LIGHT });
    vdim(svg, O[0], top, O[1], '15.0 \\rm{cm}', { side: 1 });
    hdim(svg, H[0], O[0], top - 24, '13.4 \\rm{cm}');
    lab(svg, 20, top - 26, 'n_2', { anchor: 'start' });
    lab(svg, 20, top + 30, 'n_1', { anchor: 'start' });
    return svg.render();
  },

  // 25.4 problem — a ray entering the end of a fiber
  Figure_25_04_10: () => {
    const svg = new Svg({
      width: 1000,
      height: 360,
      title: 'A ray entering the end of an optical fiber',
      desc: 'A ray in medium n1 strikes the flat end of a fiber of index n2 at angle θ1 to the fiber’s axis, refracts to angle θ2, and then strikes the side of the fiber at angle θ3 to its normal, where it may be totally internally reflected.',
    });
    svg.add(
      '<defs><linearGradient id="fiber" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fa894"/><stop offset="0.5" stop-color="#ffffff"/><stop offset="1" stop-color="#7fa894"/></linearGradient></defs>'
    );
    const [L, T, B] = [260, 100, 300];
    svg.rect(L, T, 740, B - T, { fill: 'url(#fiber)', stroke: '#5f7f70', width: 2 });
    // n2 = 1.50, θ1 = 40°: θ2 = 25.4° and θ3 = 64.6°, beyond the 41.8° critical angle.
    const E = [L, 230];
    const d0 = dir(40);
    const d1 = refract(d0, [-1, 0], 1, 1.5);
    const H = add(E, mul(d1, (T - E[1]) / d1[1]));
    const d2 = [d1[0], -d1[1]];
    ray(svg, sub(E, mul(d0, 170)), E, { arrow: 0.6 });
    ray(svg, E, H, { arrow: 0.55 });
    ray(svg, H, add(H, mul(d2, 200)), { arrow: 0.75 });
    dashed(svg, [L - 70, E[1]], [L + 200, E[1]]);
    dashed(svg, [H[0], T - 50], [H[0], T + 40]);
    angle(svg, E, [-1, 0], mul(d0, -1), 34, 'θ_1', { labelR: 58 });
    angle(svg, E, [1, 0], d1, 70, 'θ_2', { labelR: 92 });
    angle(svg, H, [0, 1], mul(d1, -1), 30, 'θ_3', { labelR: 54 });
    lab(svg, L - 30, T + 40, 'n_1');
    lab(svg, L + 40, T + 40, 'n_2');
    return svg.render();
  },

  // 25.5 Fig. 6 — dispersion by a 60° prism
  Figure_25_05_06: () => {
    const svg = new Svg({
      width: 1000,
      height: 540,
      title: 'Dispersion by a prism',
      desc: 'White light strikes one face of an equilateral glass prism (all angles 60°) at an incident angle of 45°. Inside, it separates into colors; red light of 660 nm is bent least and violet light of 410 nm most, and they emerge from the far face at angles θR and θV. The spread is exaggerated for clarity.',
    });
    const BL = [90, 500];
    const BR = [560, 500];
    const AP = [325, 500 - 470 * Math.sin(Math.PI / 3)];
    svg.add(
      '<defs><linearGradient id="prism" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9fb8aa"/><stop offset="0.45" stop-color="#eef4f0"/><stop offset="1" stop-color="#8eab9c"/></linearGradient></defs>'
    );
    svg.polygon([AP, BL, BR], { fill: 'url(#prism)', stroke: GLASS[2], width: 2 });
    const H = add(AP, mul(sub(BL, AP), 0.25));
    const nOut = unit([-Math.sin(Math.PI / 3), -0.5]);
    const d0 = dir(15);
    ray(svg, sub(H, mul(d0, 140)), H, { arrow: 0.5 });
    dashed(svg, add(H, mul(nOut, 50)), sub(H, mul(nOut, 50)));
    angle(svg, H, nOut, mul(d0, -1), 34, '45°', { labelR: 58, size: 22 });
    // Crown-glass indices (1.512 red, 1.530 violet) spread by 0.06 each way so the colors separate visibly.
    for (const [n, color, name, wl] of [
      [1.452, '#e0245e', 'Red', '(660 nm)'],
      [1.59, '#6a1b9a', 'Violet', '(410 nm)'],
    ]) {
      const d1 = refract(d0, nOut, 1, n);
      const X = hit(H, d1, AP, BR);
      const nR = unit([Math.sin(Math.PI / 3), -0.5]);
      const d2 = refract(d1, nR, n, 1);
      const E = add(X, mul(d2, 240));
      ray(svg, H, X, { color, arrow: 0.6 });
      ray(svg, X, E, { color, arrow: 0.6 });
      note(svg, ...add(E, [14, 4]), name, { anchor: 'start', size: 24 });
      note(svg, ...add(E, [14, 32]), wl, { anchor: 'start', size: 24 });
    }
    note(svg, 50, 162, 'Incident', { size: 24 });
    note(svg, 50, 190, 'light', { size: 24 });
    for (const [P, a1, a2] of [
      [AP, 240, 300],
      [BL, 0, 60],
      [BR, 120, 180],
    ]) {
      svg.arc(...P, 40, a1, a2, { color: COLORS.black, width: 1.5 });
      const m = dir((a1 + a2) / 2);
      lab(svg, ...add(P, mul(m, 62)), '60°', { size: 22 });
    }
    return svg.render();
  },

  // 25.6 Fig. 1 — a converging lens brings parallel rays to its focal point
  Figure_25_06_01: () => {
    const svg = new Svg({
      width: 900,
      height: 340,
      title: 'Parallel rays through a converging lens',
      desc: 'Left: an expanded view of ray 1 crossing a wedge of lens glass; it bends toward the normal on entering (θ1 to θ2) and away from it on leaving (θ2′ to θ1′), so it is turned toward the axis. Right: rays 1, 2 and 3 enter a converging lens parallel to its axis; ray 2 on the axis is undeviated, and rays 1 and 3 cross the axis at the focal point F, a distance f from the lens.',
    });
    const s = lensSlice(svg, {
      top: 50,
      x1: 150,
      x2: 240,
      len: 220,
      tilt: 16,
      y: 120,
      xStart: 20,
      xEnd: 370,
    });
    angle(svg, s.H1, s.nL, mul(s.d0, -1), 30, 'θ_1', { labelR: 50, size: 20 });
    angle(svg, s.H1, mul(s.nL, -1), s.d1, 30, 'θ_2', { labelR: 50, size: 20 });
    angle(svg, s.H2, mul(s.nR, -1), mul(s.d1, -1), 30, "θ'_2", { labelR: 50, size: 20 });
    angle(svg, s.H2, s.nR, s.d2, 30, "θ'_1", { labelR: 50, size: 20 });
    note(svg, 20, 106, '1', { size: 20 });
    note(svg, s.E[0], s.E[1] + 22, '1', { size: 20 });
    // Main lens: f = 150.
    const [cx, cy, f] = [620, 170, 150];
    lens(svg, cx, cy, 130);
    const F = [cx + f, cy];
    for (const [h, l] of [
      [-75, '1'],
      [0, '2'],
      [75, '3'],
    ]) {
      const P = [cx, cy + h];
      ray(svg, [440, cy + h], P, { arrow: 0.5 });
      const end = add(P, mul(unit(sub(F, P)), 250));
      ray(svg, P, end, { arrow: 0.35 });
      note(svg, 452, cy + h - 16, l, { size: 20 });
      note(svg, end[0] + 10, end[1], l, { size: 20, anchor: 'start' });
    }
    note(svg, 436, cy, 'Axis', { size: 20, anchor: 'end' });
    dot2(svg, [cx, cy]);
    dot2(svg, F);
    note(svg, F[0], cy + 26, 'F', { size: 20 });
    hdim(svg, cx, F[0], cy - 26, 'f', { size: 20 });
    return svg.render();
  },

  // 25.6 Fig. 3 — a diverging lens spreads parallel rays from its focal point
  Figure_25_06_03: () => {
    const svg = new Svg({
      width: 900,
      height: 860,
      title: 'Parallel rays through a diverging lens',
      desc: 'Top: an expanded view of ray 1 crossing a wedge of diverging-lens glass; it bends at each face so that it is turned away from the axis. Bottom: rays 1, 2 and 3 enter a diverging lens parallel to its axis; ray 2 on the axis is undeviated, and rays 1 and 3 spread out as if they came from the focal point F, a distance f in front of the lens. The dashed lines are extensions, not rays.',
    });
    const s = lensSlice(svg, {
      top: 30,
      x1: 360,
      x2: 520,
      len: 160,
      tilt: -14,
      y: 100,
      xStart: 80,
      xEnd: 840,
    });
    angle(svg, s.H1, s.nL, mul(s.d0, -1), 40, 'θ_1', { labelR: 62, size: 22 });
    angle(svg, s.H1, mul(s.nL, -1), s.d1, 40, 'θ_2', { labelR: 62, size: 22 });
    angle(svg, s.H2, mul(s.nR, -1), mul(s.d1, -1), 40, "θ'_2", { labelR: 62, size: 22 });
    angle(svg, s.H2, s.nR, s.d2, 40, "θ'_1", { labelR: 62, size: 22 });
    note(svg, 100, 80, '1', { size: 24 });
    note(svg, s.E[0], s.E[1] - 22, '1', { size: 24 });
    // Main lens: f = 190.
    const [cx, cy, f] = [450, 560, 190];
    lens(svg, cx, cy, 230, { concave: true, w: 40 });
    const F = [cx - f, cy];
    for (const [h, l] of [
      [-110, '1'],
      [0, '2'],
      [110, '3'],
    ]) {
      const P = [cx, cy + h];
      ray(svg, [140, cy + h], P, { arrow: 0.5 });
      const u = unit(sub(P, F));
      const end = add(P, mul(u, 360));
      ray(svg, P, end, { arrow: 0.6 });
      if (h) svg.line(...F, ...P, { color: LIGHT, width: 2, dash: '8 6' });
      note(svg, 150, cy + h - 22, l, { size: 24 });
      note(svg, end[0] + 4, end[1] + (h < 0 ? -18 : h > 0 ? 22 : -20), l, { size: 24 });
    }
    note(svg, 92, cy, 'Axis', { size: 24 });
    note(svg, 840, cy + 50, 'Axis', { size: 24 });
    svg.squiggle(830, cy + 32, 812, cy + 6, { waves: 1, amp: 3 });
    dot2(svg, [cx, cy]);
    dot2(svg, F);
    note(svg, F[0], cy - 24, 'F', { size: 24 });
    hdim(svg, F[0], cx, cy + 26, 'f', { size: 22, below: true });
    return svg.render();
  },

  // 25.6 Fig. 5 — the same focal length on either side
  Figure_25_06_05: () => {
    const svg = new Svg({
      width: 720,
      height: 860,
      title: 'Thin lenses have the same focal length on either side',
      desc: '(a) Parallel rays entering a converging lens from the right cross at its focal point F, a distance f to the left. (b) Parallel rays entering a diverging lens from the right spread out as if they came from its focal point F, a distance f to the right.',
    });
    const f = 200;
    const rows = [
      [190, false, '(a)'],
      [620, true, '(b)'],
    ];
    for (const [cy, concave, cap] of rows) {
      const cx = 420;
      lens(svg, cx, cy, 130, { concave, w: concave ? 28 : 22 });
      const F = concave ? [cx + f, cy] : [cx - f, cy];
      for (const h of [-75, 0, 75]) {
        const P = [cx, cy + h];
        ray(svg, [700, cy + h], P, { arrow: 0.5 });
        const u = concave ? unit(sub(P, F)) : unit(sub(F, P));
        ray(svg, P, add(P, mul(u, concave ? 380 : 420)), { arrow: 0.3 });
        if (concave && h) svg.line(...P, ...F, { color: LIGHT, width: 2, dash: '8 6' });
      }
      dot2(svg, [cx, cy]);
      dot2(svg, F);
      note(svg, F[0], cy + 28, 'F', { size: 22 });
      hdim(svg, Math.min(cx, F[0]), Math.max(cx, F[0]), cy - 30, 'f', { size: 22 });
      caption(svg, 420, cy + 175, cap);
    }
    return svg.render();
  },

  // 25.6 Fig. 6 — a ray through the center of a thin lens is undeviated
  Figure_25_06_06: () => {
    const svg = new Svg({
      width: 420,
      height: 920,
      title: 'Rays through the centers of thin lenses',
      desc: '(a) A ray through the center of a converging lens and (b) a ray through the center of a diverging lens are each shifted only slightly and emerge parallel to their original paths, shown as shaded lines; for a thin lens the shift is neglected.',
    });
    for (const [cy, concave] of [
      [220, false],
      [690, true],
    ]) {
      const cx = 210;
      lens(svg, cx, cy, 200, { concave, w: concave ? 30 : 34 });
      const u = dir(40);
      const A = sub([cx, cy], mul(u, 300));
      const B = add([cx, cy], mul(u, 300));
      svg.line(...A, ...B, { color: '#bfe6f5', width: 7 });
      // A slight sideways shift inside the glass, then parallel to the original path.
      const shift = [5, 5];
      const P1 = sub([cx, cy], mul(u, 30));
      const P2 = add([cx, cy], mul(u, 30));
      ray(svg, A, P1, { arrow: 0.5 });
      ray(svg, P1, add(P2, shift), { arrow: false });
      ray(svg, add(P2, shift), add(B, shift), { arrow: 0.6 });
    }
    return svg.render();
  },

  // 25.7 Fig. 2 — spherical aberration, and the focus of a small mirror
  Figure_25_07_02: () => {
    const svg = new Svg({
      width: 1000,
      height: 460,
      title: 'Parallel rays reflected by spherical mirrors',
      desc: '(a) Parallel rays reflected from a large spherical mirror do not all cross at one point: rays far from the axis cross closer to the mirror. (b) A spherical mirror that is small compared with its radius of curvature focuses parallel rays, including rays 1, 2 and 3, to a common focal point F, a distance f from the mirror.',
    });
    const traceAll = (C, R, heights, xStop) => {
      for (const h of heights) {
        const y = C[1] + h;
        const x = C[0] + Math.sqrt(R * R - h * h);
        const P = [x, y];
        const n = unit(sub(C, P));
        const r = reflect([1, 0], n);
        ray(svg, [xStop.from, y], P, { arrow: 0.45 });
        const t = (xStop.to - x) / r[0];
        ray(svg, P, add(P, mul(r, t)), { arrow: false });
      }
    };
    // (a) R = 300, rays up to 200 from the axis (about 42° around the mirror).
    const Ca = [190, 220];
    mirror(svg, Ca, 300, -45, 45);
    traceAll(Ca, 300, [-200, -160, -120, -80, -40, 40, 80, 120, 160, 200], { from: 20, to: 40 });
    caption(svg, 250, 448, '(a)');
    // (b) R = 560 and rays within 130 of the axis: F is at R/2.
    const Cb = [420, 220];
    const R = 560;
    mirror(svg, Cb, R, -14, 14, { thick: 18 });
    const V = [Cb[0] + R, Cb[1]];
    const F = [Cb[0] + R / 2, Cb[1]];
    traceAll(Cb, R, [-120, -80, -40, 0, 40, 80, 120], { from: 560, to: 660 });
    for (const [h, l] of [
      [-40, '1'],
      [0, '2'],
      [40, '3'],
    ])
      note(svg, 572, Cb[1] + h - 12, l, { size: 18 });
    dot2(svg, F);
    note(svg, F[0], F[1] + 24, 'F', { size: 18 });
    svg.line(F[0], F[1] + 36, F[0], 410, { color: COLORS.black, width: 1.2 });
    svg.line(V[0], 380, V[0], 410, { color: COLORS.black, width: 1.2 });
    hdim(svg, F[0], V[0], 400, 'f', { size: 20 });
    caption(svg, 780, 448, '(b)');
    return svg.render();
  },

  // 25.7 Fig. 3 — a convex mirror's virtual focal point
  Figure_25_07_03: () => {
    const svg = new Svg({
      width: 720,
      height: 760,
      title: 'Parallel rays reflected by a convex mirror',
      desc: 'Parallel rays, including rays 1, 2 and 3, strike a small convex mirror and reflect outward, diverging. Extended backward as dashed lines, the reflected rays seem to come from a focal point F behind the mirror, a distance f from it. Convex mirrors have a negative focal length.',
    });
    const R = 500;
    const C = [800, 360];
    const V = [C[0] - R, C[1]];
    const F = [C[0] - R / 2, C[1]];
    mirror(svg, C, R, 155, 205, { convex: true, thick: 24 });
    for (const h of [-165, -110, -55, 0, 55, 110, 165]) {
      const y = C[1] + h;
      const x = C[0] - Math.sqrt(R * R - h * h);
      const P = [x, y];
      const n = unit(sub(P, C));
      const r = reflect([1, 0], n);
      ray(svg, [30, y], P, { arrow: 0.45 });
      ray(svg, P, add(P, mul(r, h ? 240 : 220)), { arrow: 0.6 });
      const back = mul(r, -1);
      svg.line(...P, ...add(P, mul(back, (F[0] + 40 - x) / back[0])), {
        color: LIGHT,
        width: 2,
        dash: '8 6',
      });
    }
    for (const [h, l] of [
      [-110, '1'],
      [0, '2'],
      [110, '3'],
    ])
      note(svg, 60, C[1] + h - 18, l, { size: 22 });
    dot2(svg, F);
    note(svg, F[0], F[1] - 26, 'F', { size: 22 });
    svg.line(V[0], C[1] + 120, V[0], 690, { color: COLORS.black, width: 1.2 });
    svg.line(F[0], C[1] + 10, F[0], 690, { color: COLORS.black, width: 1.2 });
    hdim(svg, V[0], F[0], 680, 'f');
    note(svg, (V[0] + F[0]) / 2, 720, '(negative)', { size: 20 });
    return svg.render();
  },

  // 25.7 Fig. 4 — case 1 image in a concave mirror
  Figure_25_07_04: () => {
    const svg = new Svg({
      width: 820,
      height: 560,
      title: 'Ray diagram for a concave mirror, object beyond the focal point',
      desc: 'An object of height ho stands a distance do in front of a concave mirror, farther than the focal length f. Ray 1 from its tip approaches parallel to the axis and reflects through the focal point F; ray 2 strikes the center of the mirror and reflects at an equal angle; ray 3 passes through F and reflects parallel to the axis. They meet at the tip of a real, inverted, enlarged image of height hi a distance di in front of the mirror.',
    });
    // f = 150, d_o = 230: d_i = 1/(1/f − 1/d_o) = 431, h_i = −h_o d_i/d_o.
    const [f, dO, hO] = [150, 230, 60];
    const dI = 1 / (1 / f - 1 / dO);
    const hI = (-hO * dI) / dO;
    const V = [770, 300];
    const F = [V[0] - f, V[1]];
    const C = [V[0] - 2 * f, V[1]];
    svg.line(20, V[1], 815, V[1], { color: COLORS.black, width: 1.5 });
    mirror(svg, C, 2 * f, -40, 40, { thick: 18 });
    const O = [V[0] - dO, V[1]];
    const I = [V[0] - dI, V[1]];
    const tip = [O[0], O[1] - hO];
    const itip = [I[0], I[1] - hI];
    const objArrow = (P, h, color) =>
      svg.arrow(P[0], P[1], P[0], P[1] - h, { color, width: 4, head: 16 });
    // Ray 1: parallel, then through F.
    const M1 = [V[0], tip[1]];
    ray(svg, tip, M1, { arrow: 0.5 });
    ray(svg, M1, add(itip, mul(unit(sub(itip, M1)), 50)), { arrow: 0.3 });
    // Ray 2: to the vertex, reflected symmetrically.
    ray(svg, tip, V, { arrow: 0.5 });
    ray(svg, V, add(itip, mul(unit(sub(itip, V)), 50)), { arrow: 0.3 });
    // Ray 3: through F, then parallel.
    const M3 = [V[0], tip[1] + ((F[1] - tip[1]) / (F[0] - tip[0])) * (V[0] - tip[0])];
    ray(svg, tip, M3, { arrow: 0.3 });
    ray(svg, M3, [itip[0] - 50, M3[1]], { arrow: 0.3 });
    objArrow(O, hO, '#d9a21b');
    objArrow(I, hI, '#d9a21b');
    dot2(svg, F);
    note(svg, F[0], F[1] - 24, 'F', { size: 22 });
    lab(svg, O[0] - 14, O[1] - hO / 2, 'h_o', { anchor: 'end' });
    lab(svg, I[0] - 14, I[1] - hI / 2, 'h_i', { anchor: 'end' });
    hdim(svg, O[0], V[0], 170, 'd_o');
    hdim(svg, F[0], V[0], 340, 'f', { below: true });
    hdim(svg, I[0], V[0], 470, 'd_i', { below: true });
    for (const [P, l] of [
      [[(tip[0] + M1[0]) / 2 + 40, tip[1] - 16], '1'],
      [[(tip[0] + V[0]) / 2 - 30, (tip[1] + V[1]) / 2 - 14], '2'],
      [[tip[0] + 36, tip[1] + 6], '3'],
      [[itip[0] + 160, itip[1] - 54], '1'],
      [[itip[0] + 230, itip[1] - 6], '2'],
      [[itip[0] + 200, M3[1] + 20], '3'],
    ])
      note(svg, ...P, l, { size: 22 });
    return svg.render();
  },
};
