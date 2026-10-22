/**
 * Chapter 27: wave optics — Huygens's principle, interference and
 * diffraction from slits and gratings, thin films, resolution and
 * polarization.
 *
 * Patterns are computed: double-slit fringes are cos²(πd sin θ/λ) under a
 * single-slit envelope, a grating of N slits gives [sin(Nφ/2)/sin(φ/2)]², and
 * a single slit gives [sin β/β]². Angles in the worked examples are drawn from
 * their answers: a grating of 10 000 lines/cm sends 380 nm and 760 nm light
 * to 22.3° and 49.5°, and a slit with its second minimum at 45° has its first
 * at 20.7°. Wavefronts beyond an opening follow Huygens's construction, and
 * Brewster's angle is arctan 1.5.
 */
import { spectral } from './ch24.js';
import { COLORS, Plot, Svg } from './svg.js';

const LIGHT = '#1fa8d8';
const WAVE = '#5ab43c';
const CURVE = COLORS.maroon;
const BARRIER = ['#e9d7ad', '#b8a073'];
const POL = '#1f7cc8';

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
const unit = a => mul(a, 1 / Math.hypot(...a));
const dir = deg => [Math.cos((deg * Math.PI) / 180), -Math.sin((deg * Math.PI) / 180)];
const sinc2 = b => (Math.abs(b) < 1e-9 ? 1 : (Math.sin(b) / b) ** 2);

function ray(svg, P, Q, { arrow = 0.55, color = LIGHT, width = 2.2, dash } = {}) {
  svg.line(...P, ...Q, { color, width, dash });
  if (arrow) {
    const d = unit(sub(Q, P));
    const M = add(P, mul(sub(Q, P), arrow));
    svg.arrow(...sub(M, mul(d, 10)), ...add(M, mul(d, 6)), { color, width, head: 14 });
  }
}

function dashed(svg, P, Q, { color = COLORS.black, width = 1.4 } = {}) {
  svg.line(...P, ...Q, { color, width, dash: '6 5' });
}

/** Angle mark at `at` between directions u and v, with an optional label. */
function angle(svg, at, u, v, r, label, { labelR = r + 18, size = 22 } = {}) {
  const deg = w => (Math.atan2(-w[1], w[0]) * 180) / Math.PI;
  let [a1, a2] = [deg(u), deg(v)];
  if ((((a2 - a1) % 360) + 360) % 360 > 180) [a1, a2] = [a2, a1];
  svg.arc(...at, r, a1, a2, { color: COLORS.black, width: 1.5 });
  const m = unit(add(unit(u), unit(v)));
  if (label) lab(svg, ...add(at, mul(m, labelR)), label, { size });
}

/** A vertical opaque barrier (tan) from y1 to y2 at x, with gaps [yTop, yBottom]. */
function barrier(svg, x, y1, y2, gaps, { w = 16 } = {}) {
  let y = y1;
  for (const [g1, g2] of [...gaps, [y2, y2]]) {
    if (g1 > y)
      svg.rect(x - w / 2, y, w, g1 - y, { fill: BARRIER[0], stroke: BARRIER[1], width: 1 });
    y = g2;
  }
}

/** A black slit plate: a thick line from y1 to y2 at x with gaps. */
function plate(svg, x, y1, y2, gaps, { width = 5 } = {}) {
  let y = y1;
  for (const [g1, g2] of [...gaps, [y2, y2]]) {
    if (g1 > y) svg.line(x, y, x, g1, { color: COLORS.black, width });
    y = g2;
  }
}

/** A sine wave along the segment P→Q with wavelength lam and amplitude A, starting at phase 0. */
function wavy(svg, P, Q, lam, A, { color = LIGHT, width = 2.6, phase = 0 } = {}) {
  const L = Math.hypot(...sub(Q, P));
  const u = unit(sub(Q, P));
  const n = [-u[1], u[0]];
  const pts = [];
  for (let k = 0; k <= 300; k += 1) {
    const s = (L * k) / 300;
    const y = A * Math.sin((2 * Math.PI * s) / lam + phase);
    pts.push(add(add(P, mul(u, s)), mul(n, y)));
  }
  svg.polyline(pts, { color, width });
}

/** Double-headed arrow centered at C along unit u, half-length h. */
function both(svg, C, u, h, { color = POL, width = 3, head = 14 } = {}) {
  svg.arrow(...sub(C, mul(u, h)), ...add(C, mul(u, h)), { color, width, head, start: true });
}

/** 27.3 Fig. 8 and 27.4 Fig. 6: fringe spacing Δy = xλ/d. */
function fringeSpacing() {
  const svg = new Svg({
    width: 820,
    height: 560,
    title: 'Distance between fringes on a screen',
    desc: 'Two slits a distance d apart are a distance x from a screen. A line at angle θ from the slits reaches the screen a distance y from its center, forming a right triangle with the horizontal line x. For small angles the distance between adjacent fringes is Δy = xλ/d.',
  });
  const O = [70, 300];
  const sx = 660;
  plate(
    svg,
    50,
    120,
    480,
    [
      [272, 284],
      [316, 328],
    ],
    { width: 6 }
  );
  svg.line(sx, 20, sx, 540, { color: COLORS.black, width: 4 });
  const P = [sx, 140];
  svg.line(...O, sx, O[1], { color: '#9b1b30', width: 4 });
  svg.line(...O, ...P, { color: '#9b1b30', width: 4 });
  svg.polyline(
    [
      [sx - 24, O[1]],
      [sx - 24, O[1] - 24],
      [sx, O[1] - 24],
    ],
    { color: COLORS.black, width: 1.4 }
  );
  angle(svg, O, [1, 0], unit(sub(P, O)), 170, 'θ', { labelR: 196 });
  lab(svg, 380, O[1] + 26, 'x');
  lab(svg, sx + 22, 220, 'y', { anchor: 'start' });
  svg.arrow(26, 278, 26, 322, { color: COLORS.black, width: 1.4, head: 9, start: true });
  for (const y of [278, 322]) svg.line(18, y, 34, y, { color: COLORS.black, width: 1.3 });
  // The label sits left of the dimension, clear of the slits.
  lab(svg, 12, 300, 'd', { anchor: 'end', size: 22 });
  lab(svg, sx + 14, P[1], 'Δy = ', { anchor: 'start', size: 22 });
  svg.text(sx + 70, P[1] - 14, 'xλ', { size: 22 });
  svg.line(sx + 54, P[1] + 2, sx + 88, P[1] + 2, { color: COLORS.text, width: 1.4 });
  svg.text(sx + 70, P[1] + 18, 'd', { size: 22 });
  note(svg, sx + 14, 40, 'Screen', { size: 22, anchor: 'start' });
  return svg.render();
}

export default {
  // 27.2 Fig. 2 — Huygens's principle for a plane wave
  Figure_27_02_02: () => {
    const svg = new Svg({
      width: 400,
      height: 780,
      title: 'Huygens’s principle applied to a straight wavefront',
      desc: 'Each point on an old straight wavefront is a source of a semicircular wavelet of radius s = vt. The new wavefront, a time t later, is the line tangent to all the wavelets, a distance s = vt ahead, and the wave moves in the direction of the arrow.',
    });
    const [x0, s] = [170, 50];
    svg.line(x0, 30, x0, 750, { color: LIGHT, width: 3 });
    svg.line(x0 + s, 30, x0 + s, 750, { color: LIGHT, width: 3 });
    for (const y of [110, 190, 270, 350, 430, 510, 590, 670]) {
      svg.arc(x0, y, s, -90, 90, { color: '#9a9a9a', width: 1.5 });
      svg.circle(x0, y, 6, { fill: '#1a9aa0' });
    }
    svg.arrow(70, 390, 300, 390, { color: COLORS.black, width: 2, head: 14 });
    svg.arrow(x0 + 4, 190 - 6, x0 + s * Math.cos(0.5) - 2, 190 - s * Math.sin(0.5) - 2, {
      color: COLORS.black,
      width: 1.4,
      head: 10,
    });
    lab(svg, 310, 236, 's = vt', { anchor: 'start', size: 22 });
    svg.squiggle(304, 236, x0 + 30, 172, { waves: 1, amp: 4 });
    note(svg, 270, 20, 'New wavefront', { size: 22 });
    svg.squiggle(276, 32, x0 + s + 2, 120, { waves: 1, amp: 4 });
    note(svg, 90, 280, 'Old wavefront', { size: 22 });
    svg.squiggle(110, 264, x0 - 4, 150, { waves: 1, amp: 5 });
    return svg.render();
  },

  // 27.2 Fig. 4 — refraction by Huygens's principle
  Figure_27_02_04: () => {
    const svg = new Svg({
      width: 760,
      height: 470,
      title: 'Huygens’s principle and refraction',
      desc: 'A wavefront strikes the surface between medium 1 and medium 2 at an angle. In medium 2 the wave is slower, so the wavelet spreading from a point on the surface travels only v2t in the time the wave travels v1t in medium 1. The wavefront bends, and the ray, perpendicular to the wavefronts, refracts from angle θ1 to angle θ2 measured from the perpendicular to the surface.',
    });
    // v1/v2 = 1.4 and θ1 = 35°, so sin θ2 = sin 35° / 1.4 and θ2 = 24.2°.
    const ys = 240;
    const O = [400, ys];
    const th1 = (35 * Math.PI) / 180;
    const th2 = Math.asin(Math.sin(th1) / 1.4);
    svg.rect(20, ys, 720, 220, { fill: '#d9efe1' });
    svg.line(20, ys, 740, ys, { color: LIGHT, width: 3 });
    dashed(svg, [O[0], 40], [O[0], 440]);
    const dIn = [Math.sin(th1), Math.cos(th1)];
    const dOut = [Math.sin(th2), Math.cos(th2)];
    // Wavefronts meet the surface every λ1/sin θ1 = λ2/sin θ2 along it.
    const lam1 = 80;
    const lam2 = lam1 / 1.4;
    const step = lam1 / Math.sin(th1);
    const perpIn = [dIn[1], -dIn[0]];
    const perpOut = [dOut[1], -dOut[0]];
    for (let k = -2; k <= 2; k += 1) {
      const P = [O[0] + k * step, ys];
      svg.line(...P, ...add(P, mul(perpIn, -240)), { color: '#6a3d9a', width: 1.6 });
      svg.line(...P, ...add(P, mul(perpOut, 240)), { color: '#6a3d9a', width: 1.6 });
    }
    ray(svg, sub(O, mul(dIn, 230)), O, { arrow: 0.6, width: 3 });
    ray(svg, O, add(O, mul(dOut, 200)), { arrow: 0.7, width: 3 });
    // Wavelets: radius v1t above the surface and v2t below it.
    const Pw = [O[0] - step, ys];
    svg.arc(...Pw, lam2, 180, 360, { color: '#6a3d9a', width: 2 });
    angle(svg, O, [0, -1], mul(dIn, -1), 90, 'θ_1', { labelR: 114 });
    angle(svg, O, [0, 1], dOut, 60, 'θ_2', { labelR: 82 });
    const W1 = [O[0] + 70, ys - 140];
    svg.arrow(...W1, ...add(W1, mul(dIn, lam1)), {
      color: COLORS.black,
      width: 1.5,
      head: 10,
      start: true,
    });
    lab(svg, W1[0] + 44, W1[1] + 44, 'v_1t', { anchor: 'start' });
    const W2 = add(Pw, mul(perpOut, -10));
    svg.arrow(...W2, ...add(W2, mul(dOut, lam2)), {
      color: COLORS.black,
      width: 1.5,
      head: 10,
      start: true,
    });
    lab(svg, W2[0] - 20, W2[1] + 40, 'v_2t', { anchor: 'end' });
    note(svg, 180, 120, 'Ray', { size: 24 });
    note(svg, 640, 60, 'Wavefront', { size: 24 });
    note(svg, 90, ys - 18, 'Surface', { size: 24 });
    note(svg, 660, ys - 18, 'Medium 1', { size: 24 });
    note(svg, 660, ys + 24, 'Medium 2', { size: 24 });
    return svg.render();
  },

  // 27.2 Fig. 6 — waves through openings of three sizes
  Figure_27_02_06: () => {
    const svg = new Svg({
      width: 1000,
      height: 520,
      title: 'Diffraction through openings of different sizes',
      desc: 'Straight wavefronts pass through three openings. (a) Through an opening much wider than the wavelength, the wavefronts stay mostly straight and bend only at their edges. (b) Through a smaller opening they bend more. (c) Through an opening about as wide as the wavelength, they spread out as nearly circular waves. Beyond each opening the wavefront is the Huygens envelope: straight across the opening and circular around its edges.',
    });
    const lam = 32;
    [
      [10, 320],
      [345, 120],
      [680, 34],
    ].forEach(([x0, open], i) => {
      svg.rect(x0, 20, 310, 470, { fill: '#e3e8f1' });
      const xb = x0 + 150;
      const [g1, g2] = [255 - open / 2, 255 + open / 2];
      for (let k = 1; k <= 3; k += 1)
        svg.line(xb - k * lam, 20, xb - k * lam, 490, { color: LIGHT, width: 3 });
      for (let k = 1; k <= 4; k += 1) {
        const r = k * lam - 8;
        const top = [];
        for (let a = -75; a <= 0; a += 5)
          top.push([
            xb + 8 + r * Math.cos((a * Math.PI) / 180),
            g1 + r * Math.sin((a * Math.PI) / 180),
          ]);
        const bot = [];
        for (let a = 0; a <= 75; a += 5)
          bot.push([
            xb + 8 + r * Math.cos((a * Math.PI) / 180),
            g2 + r * Math.sin((a * Math.PI) / 180),
          ]);
        svg.polyline(
          [...top, ...bot].filter(([, y]) => y > 22 && y < 488),
          { color: LIGHT, width: 3 }
        );
      }
      svg.rect(xb - 8, 20, 16, g1 - 20, { fill: BARRIER[0], stroke: BARRIER[1], width: 1 });
      svg.rect(xb - 8, g2, 16, 490 - g2, { fill: BARRIER[0], stroke: BARRIER[1], width: 1 });
      if (i === 0) {
        for (const y of [60, 255, 450])
          svg.arrow(x0 + 20, y, xb - 12, y, { color: COLORS.black, width: 1.6, head: 11 });
        svg.arrow(xb + 30, 150, xb + 130, 100, { color: COLORS.black, width: 1.6, head: 11 });
        svg.arrow(xb + 30, 360, xb + 130, 410, { color: COLORS.black, width: 1.6, head: 11 });
      }
      if (i === 2)
        svg.arrow(x0 + 40, 255, xb - 4, 255, { color: COLORS.black, width: 1.6, head: 11 });
      caption(svg, x0 + 155, 510, ['(a)', '(b)', '(c)'][i]);
    });
    return svg.render();
  },

  // 27.3 Fig. 2 — in phase and out of phase
  Figure_27_03_02: () => {
    const svg = new Svg({
      width: 760,
      height: 900,
      title: 'Constructive and destructive interference',
      desc: '(a) Two identical waves of amplitude x in phase add to a resultant of amplitude 2x: constructive interference. (b) When the crests of wave 2 line up with the troughs of wave 1, the waves cancel and the resultant is zero: destructive interference.',
    });
    const lam = 160;
    const X = 30;
    const row = (y, A, phase, name, marks) => {
      svg.line(40, y, 640, y, { color: COLORS.black, width: 1.4 });
      const pts = [];
      for (let k = 0; k <= 300; k += 1) {
        const x = 40 + (600 * k) / 300;
        pts.push([x, y - A * Math.sin((2 * Math.PI * (x - 40)) / lam + phase)]);
      }
      svg.polyline(pts, { color: WAVE, width: 3 });
      note(svg, 652, y, name, { anchor: 'start', size: 18 });
      for (const [x, v, s] of marks) {
        if (!v) continue;
        svg.arrow(x, y, x, y - v, { color: COLORS.black, width: 1.2, head: 8, start: true });
        lab(svg, x + 8, y - v / 2, s, { anchor: 'start', size: 18 });
      }
    };
    const xa = 40 + lam / 4;
    const xb = 40 + (3 * lam) / 4;
    // (a) In phase.
    row(80, X, 0, 'Wave 1', [
      [xa, X, 'x'],
      [xb, -X, '−x'],
    ]);
    row(180, X, 0, 'Wave 2', [
      [xa, X, 'x'],
      [xb, -X, '−x'],
    ]);
    row(300, 2 * X, 0, 'Resultant', [
      [xa, 2 * X, '2x'],
      [xb, -2 * X, '−2x'],
    ]);
    caption(svg, 340, 410, '(a)');
    // (b) Half a wavelength apart.
    row(520, X, 0, 'Wave 1', [
      [xa, X, 'x'],
      [xb, -X, '−x'],
    ]);
    row(620, X, Math.PI, 'Wave 2', [
      [xa, -X, '−x'],
      [xb, X, 'x'],
    ]);
    svg.line(40, 760, 640, 760, { color: WAVE, width: 3 });
    note(svg, 652, 760, 'Resultant', { anchor: 'start', size: 18 });
    caption(svg, 340, 870, '(b)');
    return svg.render();
  },

  // 27.3 Fig. 4 — paths differing by λ/2 and by λ
  Figure_27_03_04: () => {
    const svg = new Svg({
      width: 880,
      height: 540,
      title: 'Path differences at the screen',
      desc: 'Waves from two slits travel to the same point on a screen at angle θ. (a) Their paths differ by half a wavelength, so a crest of one meets a trough of the other: dark, destructive interference. (b) Their paths differ by a whole wavelength, so they arrive in step: bright, constructive interference.',
    });
    const lam = 60;
    const panel = (x0, target, cap, title1, title2) => {
      const S1 = [x0 + 30, 300];
      const S2 = [x0 + 30, 400];
      const sx = x0 + 400;
      barrier(
        svg,
        x0 + 30,
        260,
        460,
        [
          [292, 308],
          [392, 408],
        ],
        { w: 18 }
      );
      barrier(svg, sx + 8, 40, 470, [], { w: 14 });
      // Find the point on the screen where the path difference equals `target`.
      let lo = 40;
      let hi = 350;
      for (let k = 0; k < 60; k += 1) {
        const y = (lo + hi) / 2;
        const diff = Math.hypot(sx - S2[0], y - S2[1]) - Math.hypot(sx - S1[0], y - S1[1]);
        if (diff > target) lo = y;
        else hi = y;
      }
      const P = [sx, (lo + hi) / 2];
      const M = [x0 + 30, 350];
      wavy(svg, S1, P, lam, 14);
      wavy(svg, S2, P, lam, 14);
      svg.line(...M, ...P, { color: COLORS.black, width: 1.4, dash: '6 5' });
      svg.line(...M, sx, 350, { color: COLORS.black, width: 1.4 });
      angle(svg, M, [1, 0], unit(sub(P, M)), 110, 'θ', { labelR: 90 });
      svg.rect(sx - 6, P[1] - 8, 12, 16, { fill: COLORS.black });
      const u = unit(sub(P, S2));
      const n = [-u[1], u[0]];
      const A = add(add(S2, mul(u, 30)), mul(n, -26));
      svg.arrow(...A, ...add(A, mul(u, lam)), {
        color: COLORS.black,
        width: 1.4,
        head: 9,
        start: true,
      });
      lab(svg, ...add(add(A, mul(u, lam / 2)), mul(n, -18)), 'λ', { size: 22 });
      note(svg, x0 + 200, 40, title1, { size: 22 });
      note(svg, x0 + 200, 66, title2, { size: 22 });
      svg.squiggle(x0 + 290, 70, P[0] - 8, P[1] - 4, { waves: 1, amp: 4 });
      caption(svg, x0 + 200, 520, cap);
    };
    panel(0, lam / 2, '(a)', 'Dark', '(destructive interference)');
    panel(440, lam, '(b)', 'Bright', '(constructive interference)');
    return svg.render();
  },

  // 27.3 Fig. 5 — the path difference d sin θ
  Figure_27_03_05: () => {
    const svg = new Svg({
      width: 760,
      height: 700,
      title: 'Path-length difference from two slits',
      desc: 'Two slits S1 and S2 a distance d apart send rays ℓ1 and ℓ2 at the same angle θ to a distant point on a screen. Dropping a perpendicular from S1 to the lower ray marks off the extra distance the lower ray travels, Δℓ = d sin θ.',
    });
    const S1 = [90, 280];
    const S2 = [90, 420];
    const th = 26;
    const u = dir(th);
    plate(
      svg,
      90,
      120,
      690,
      [
        [270, 290],
        [410, 430],
      ],
      { width: 7 }
    );
    svg.line(700, 30, 700, 690, { color: COLORS.black, width: 4 });
    const P = [700, 50];
    const B1 = add(S1, mul(u, 280));
    const B2 = add(S2, mul(u, 280));
    ray(svg, S1, B1, { arrow: 0.7 });
    ray(svg, S2, B2, { arrow: 0.7 });
    ray(svg, add(B1, mul(u, 30)), P, { arrow: 0.45 });
    ray(svg, add(B2, mul(u, 30)), P, { arrow: 0.45 });
    // Break marks: the screen is much farther away than drawn.
    for (const off of [0, 14]) {
      const C = add(
        add(S1, S2).map(v => v / 2),
        mul(u, 296 + off)
      );
      svg.path(
        `M ${C[0] - 14} ${C[1] - 120} Q ${C[0] + 6} ${C[1] - 60} ${C[0] - 10} ${C[1]} Q ${C[0] - 24} ${C[1] + 60} ${C[0] - 4} ${C[1] + 120}`,
        {
          color: COLORS.black,
          width: 3,
        }
      );
    }
    dashed(svg, S1, [S1[0] + 110, S1[1]]);
    dashed(svg, S2, [S2[0] + 110, S2[1]]);
    // The perpendicular from S1 to the lower ray.
    const F = add(S2, mul(u, (S1[1] - S2[1]) * -Math.sin((th * Math.PI) / 180)));
    svg.line(...S1, ...F, { color: COLORS.black, width: 1.6 });
    angle(svg, S1, [1, 0], u, 52, 'θ', { labelR: 72 });
    angle(svg, S2, [1, 0], u, 52, 'θ', { labelR: 72 });
    angle(svg, S1, [0, 1], unit(sub(F, S1)), 46, 'θ', { labelR: 64 });
    lab(svg, F[0] - 26, F[1] + 4, 'Δℓ', { size: 22 });
    svg.arrow(70, 292, 70, 408, { color: COLORS.black, width: 1.6, head: 11, start: true });
    lab(svg, 52, 350, 'd', { size: 28 });
    lab(svg, S1[0] - 26, S1[1] - 22, 'S_1', { size: 26 });
    lab(svg, S2[0] - 26, S2[1] + 30, 'S_2', { size: 26 });
    lab(svg, 640, 60, 'ℓ_1', { size: 26 });
    lab(svg, 646, 120, 'ℓ_2', { size: 26 });
    lab(svg, 250, 560, 'Δℓ = d \\rm{sin} θ', { size: 28 });
    note(svg, 730, 20, 'Screen', { size: 24, anchor: 'end' });
    return svg.render();
  },

  // 27.3 Fig. 6 — the double-slit pattern
  Figure_27_03_06: () => {
    const svg = new Svg({
      width: 880,
      height: 520,
      title: 'The double-slit interference pattern',
      desc: 'Left: light from two slits a distance d apart reaches a screen a distance x away. The intensity on the screen peaks at the center and at angles θ1 and θ2, a distance y1 and y2 from the center, with the peaks growing dimmer away from the center. Right: the pattern of bright fringes as seen on the screen.',
    });
    // cos² fringes, spaced 44 apart, under a single-slit envelope whose first zero is 4.5 fringes out.
    const spacing = 44;
    const I = y => Math.cos((Math.PI * y) / spacing) ** 2 * sinc2((Math.PI * y) / (4.5 * spacing));
    const [x0, sx, cy] = [40, 480, 260];
    barrier(
      svg,
      x0,
      140,
      380,
      [
        [244, 252],
        [268, 276],
      ],
      { w: 16 }
    );
    svg.line(sx, 30, sx, 470, { color: COLORS.black, width: 2 });
    const pts = [];
    for (let k = -210; k <= 210; k += 1) pts.push([sx - 80 * I(k), cy + k]);
    svg.polyline(pts, { color: CURVE, width: 2.4 });
    const O = [x0 + 8, cy];
    svg.line(...O, sx, cy, { color: COLORS.black, width: 1.3 });
    for (const m of [1, 2]) {
      const P = [sx, cy - m * spacing];
      dashed(svg, O, P);
      svg.line(sx, P[1], sx + 50 + (m - 1) * 26, P[1], { color: COLORS.black, width: 1 });
      svg.arrow(sx + 40 + (m - 1) * 26, cy, sx + 40 + (m - 1) * 26, P[1], {
        color: COLORS.black,
        width: 1.2,
        head: 8,
      });
      lab(svg, sx + 54 + (m - 1) * 26, P[1] + 16, `y_${m}`, { anchor: 'start', size: 18 });
      angle(svg, O, [1, 0], unit(sub(P, O)), 220 + 70 * m, `θ_${m}`, {
        labelR: 210 + 70 * m,
        size: 18,
      });
    }
    svg.arrow(16, 252, 16, 268, { color: COLORS.black, width: 1.2, head: 6, start: true });
    lab(svg, 6, 236, 'd', { size: 18 });
    svg.arrow(x0 + 2, 490, sx - 2, 490, { color: COLORS.black, width: 1.4, head: 10, start: true });
    lab(svg, (x0 + sx) / 2, 476, 'x', { size: 20 });
    // The fringes as they look on the screen.
    svg.rect(640, 40, 200, 440, { fill: '#050505' });
    for (let k = -210; k <= 210; k += 2) {
      const v = Math.round(255 * I(k));
      if (v > 6) svg.rect(670, cy + k, 140, 2.2, { fill: `rgb(${v},${v},${v})` });
    }
    svg.arrow(612, cy, 664, cy, { color: COLORS.black, width: 2, head: 12 });
    svg.arrow(866, cy, 816, cy, { color: COLORS.black, width: 2, head: 12 });
    return svg.render();
  },

  // 27.3 problem — fringe spacing Δy = xλ/d
  Figure_27_03_08: fringeSpacing,

  // 27.4 problem — the same analysis for a grating
  Figure_27_04_06: fringeSpacing,

  // 27.4 Fig. 1 — a grating spreads white light into orders
  Figure_27_04_01: () => {
    const svg = new Svg({
      width: 880,
      height: 520,
      title: 'Diffraction grating orders',
      desc: '(a) White light falls on a diffraction grating, a barrier with many evenly spaced slits, and leaves in several directions. (b) Straight through is the central white maximum; on either side are first-order rainbows and, farther out, fainter and broader second-order rainbows.',
    });
    barrier(
      svg,
      140,
      140,
      380,
      [
        [228, 236],
        [244, 252],
        [260, 268],
        [276, 284],
        [292, 300],
      ],
      { w: 20 }
    );
    ray(svg, [10, 264], [128, 264], { arrow: 0.6 });
    const ends = [
      [460, 90, 'Second-order', 'rainbow', 2],
      [460, 180, 'First-order', 'rainbow', 1],
      [460, 264, 'Central', 'white', 0],
      [460, 350, 'First-order', 'rainbow', 1],
      [460, 440, 'Second-order', 'rainbow', 2],
    ];
    for (const [x, y, s1, s2, order] of ends) {
      ray(svg, [152, 264 + (y - 264) * 0.08], [x - 8, y], { arrow: 0.97 });
      const bx = 480;
      if (order === 0)
        svg.rect(bx, y - 12, 50, 24, { fill: '#ffffff', stroke: COLORS.black, width: 1.5 });
      else
        [700, 620, 580, 540, 490, 440, 400].forEach((nm, k) => {
          svg.add(
            `<rect x="${bx}" y="${(y - 21 + k * 6).toFixed(1)}" width="50" height="6" fill="${spectral(nm)}" fill-opacity="${order === 2 ? 0.5 : 1}"/>`
          );
        });
      note(svg, 550, y - 12, s1, { anchor: 'start', size: 22 });
      note(svg, 550, y + 14, s2, { anchor: 'start', size: 22 });
    }
    caption(svg, 140, 480, '(a)');
    caption(svg, 600, 500, '(b)');
    return svg.render();
  },

  // 27.4 Fig. 3 — double slit versus grating
  Figure_27_04_03: () => {
    const svg = new Svg({
      width: 560,
      height: 760,
      title: 'Intensity patterns of a double slit and a grating',
      desc: '(a) The double slit gives broad maxima of equal height at m = 0 and m = ±1. (b) A grating with the same slit spacing has its principal maxima at the same angles, but they are much narrower and sharper, with small secondary maxima between them.',
    });
    // φ = 2πd sin θ/λ; principal maxima at φ = 2πm. Grating: N = 6 slits.
    const N = 6;
    const grating = p => {
      const s = Math.sin(p / 2);
      return Math.abs(s) < 1e-6 ? 1 : (Math.sin((N * p) / 2) / (N * s)) ** 2;
    };
    for (const [y0, f, title, cap] of [
      [60, p => Math.cos(p / 2) ** 2, 'Double slit', '(a)'],
      [420, grating, 'Grating', '(b)'],
    ]) {
      const g = new Plot(svg, {
        x: 40,
        y: y0,
        w: 480,
        h: 200,
        xRange: [-1.5, 1.5],
        yRange: [0, 1.08],
      });
      svg.line(g.X(-1.5), g.Y(0), g.X(1.5), g.Y(0), { color: COLORS.axis, width: 1.5 });
      g.fn(m => f(2 * Math.PI * m), -1.5, 1.5, { n: 900, color: CURVE, width: 3 });
      for (const m of [-1, 0, 1]) {
        svg.line(g.X(m), g.Y(0) - 8, g.X(m), g.Y(0) + 8, { color: COLORS.axis, width: 1.5 });
        lab(svg, g.X(m), g.Y(0) + 30, `m = ${Math.abs(m)}`, { size: 22 });
      }
      note(svg, 280, y0 - 26, title, { size: 22 });
      caption(svg, 280, g.Y(0) + 70, cap);
    }
    return svg.render();
  },

  // 27.4 Fig. 4 — path differences in a grating
  Figure_27_04_04: () => {
    const svg = new Svg({
      width: 520,
      height: 820,
      title: 'Path differences for a diffraction grating',
      desc: 'Rays arrive at a grating whose slits are a distance d apart and leave at angle θ. Each ray travels Δℓ = d sin θ farther than the one below it, so the waves from every slit arrive in phase when d sin θ = mλ.',
    });
    const x = 190;
    const d = 100;
    const th = 36;
    const u = dir(-th);
    const gaps = [120, 220, 320, 420, 520];
    plate(
      svg,
      x,
      40,
      760,
      gaps.map(y => [y - 6, y + 6]),
      { width: 6 }
    );
    dashed(svg, [x, 120], [500, 120]);
    for (const y of gaps) {
      ray(svg, [40, y], [x - 4, y], { arrow: 0.8 });
      ray(svg, [x, y], add([x, y], mul(u, 360)), { arrow: 0.6 });
    }
    // The wavefront from each lower slit meets the ray above it after an extra Δℓ = d sin θ.
    const dl = d * Math.sin((th * Math.PI) / 180);
    const n = [u[1], -u[0]];
    gaps.slice(0, -1).forEach((y, k) => {
      const Q = [x, y];
      const F = add(Q, mul(u, dl));
      dashed(svg, [x, y + d], F);
      if (k === 0) {
        const A = add(Q, mul(n, 26));
        svg.arrow(...A, ...add(A, mul(u, dl)), {
          color: COLORS.black,
          width: 1.4,
          head: 9,
          start: true,
        });
        dashed(svg, Q, add(Q, mul(n, 34)));
        dashed(svg, F, add(F, mul(n, 34)));
      } else {
        svg.arrow(...add(Q, mul(n, 10)), ...add(F, mul(n, 10)), {
          color: COLORS.black,
          width: 1.4,
          head: 9,
          start: true,
        });
        lab(svg, ...add(add(Q, mul(u, dl / 2)), mul(n, 30)), 'Δℓ', { size: 22 });
      }
    });
    lab(svg, 390, 34, 'Δℓ = d \\rm{sin} θ', { size: 24 });
    angle(svg, [x, 120], [1, 0], u, 70, 'θ', { labelR: 94 });
    angle(svg, [x, 520], [0, -1], unit(sub(add([x, 420], mul(u, dl)), [x, 520])), 40, 'θ', {
      labelR: 58,
    });
    svg.arrow(170, 226, 170, 314, { color: COLORS.black, width: 1.4, head: 10, start: true });
    lab(svg, 154, 270, 'd', { size: 28 });
    return svg.render();
  },

  // 27.4 example — first-order rainbow from a grating, 2.00 m away
  Figure_27_04_05: () => {
    const svg = new Svg({
      width: 560,
      height: 780,
      title: 'First-order spectrum on a screen',
      desc: 'White light leaves a grating with 10 000 lines per centimeter and falls on a screen 2.00 m away. In first order, violet light leaves at angle θV and red light at the larger angle θR, reaching distances yV and yR from the center of the screen; the rainbow between them appears above and below the center. The angles and distances are the quantities to find.',
    });
    // d = 1.00 μm: θV = arcsin 0.380 = 22.3°, θR = arcsin 0.760 = 49.5°; 1 m = 120 px.
    const k = 120;
    const G = [80, 400];
    const sx = G[0] + 2 * k;
    const yV = 2 * k * Math.tan(Math.asin(0.38));
    const yR = 2 * k * Math.tan(Math.asin(0.76));
    svg.line(G[0], 300, G[0], 500, { color: COLORS.black, width: 6 });
    svg.line(sx, 40, sx, 760, { color: COLORS.black, width: 2 });
    dashed(svg, G, [sx + 30, G[1]]);
    for (const s of [-1, 1]) {
      for (const y of [yV, yR]) ray(svg, G, [sx, G[1] + s * y], { arrow: 0.6 });
      for (let nm = 380; nm < 760; nm += 10) {
        const y1 = 2 * k * Math.tan(Math.asin(nm / 1000));
        const y2 = 2 * k * Math.tan(Math.asin((nm + 10) / 1000));
        const top = G[1] + s * (s > 0 ? y1 : y2);
        svg.rect(sx, Math.min(top, G[1] + s * (s > 0 ? y2 : y1)), 26, Math.abs(y2 - y1) + 0.6, {
          fill: spectral(nm + 5),
        });
      }
    }
    angle(svg, G, [1, 0], unit([2 * k, -yR]), 120, '', {});
    angle(svg, G, [1, 0], unit([2 * k, -yV]), 80, '', {});
    lab(svg, G[0] + 92, G[1] - 120, 'θ_R = ?', { anchor: 'start', size: 22 });
    lab(svg, G[0] + 100, G[1] - 22, 'θ_V = ?', { anchor: 'start', size: 22 });
    svg.arrow(G[0] + 2, G[1] + 40, sx - 2, G[1] + 40, {
      color: COLORS.black,
      width: 1.4,
      head: 10,
      start: true,
    });
    lab(svg, G[0] + k, G[1] + 64, 'x = 2.00 \\rm{m}', { size: 22 });
    for (const [y, x, s] of [
      [yV, sx + 70, 'y_V = ?'],
      [yR, sx + 140, 'y_R = ?'],
    ]) {
      svg.arrow(x, G[1] - 2, x, G[1] - y + 2, {
        color: COLORS.black,
        width: 1.4,
        head: 10,
        start: true,
      });
      svg.line(x - 12, G[1] - y, x + 12, G[1] - y, { color: COLORS.black, width: 1.3 });
      svg.line(x - 12, G[1], x + 12, G[1], { color: COLORS.black, width: 1.3 });
      lab(svg, x - 12, G[1] - y / 2, s, { anchor: 'end', size: 22 });
    }
    note(svg, G[0] + 10, 280, 'Grating', { size: 22 });
    note(svg, sx, 776 - 6, 'Screen', { size: 22 });
    return svg.render();
  },

  // 27.5 Fig. 1 — the single-slit pattern
  Figure_27_05_01: () => {
    const svg = new Svg({
      width: 480,
      height: 520,
      title: 'Single-slit diffraction',
      desc: '(a) Light passes through a single slit of width D. (b) The intensity on a distant screen has a broad, bright central maximum with much dimmer maxima on either side, shown as a graph and as the pattern of red fringes seen on the screen.',
    });
    barrier(svg, 80, 20, 460, [[220, 270]], { w: 22 });
    svg.arrow(44, 222, 44, 268, { color: COLORS.black, width: 1.6, head: 9, start: true });
    lab(svg, 26, 245, 'D', { size: 26 });
    caption(svg, 80, 500, '(a)');
    const cy = 245;
    const s = 46;
    svg.line(330, 20, 330, 470, { color: COLORS.black, width: 2 });
    const pts = [];
    for (let k = -225; k <= 225; k += 1) pts.push([330 - 130 * sinc2((Math.PI * k) / s), cy + k]);
    svg.polyline(pts, { color: CURVE, width: 2.6 });
    for (let k = -225; k <= 225; k += 2) {
      const v = Math.pow(sinc2((Math.PI * k) / s), 0.3);
      svg.rect(345, cy + k, 70, 2.2, {
        fill: `rgb(${Math.round(255 * v)},${Math.round(30 * v)},${Math.round(30 * v)})`,
      });
    }
    caption(svg, 330, 500, '(b)');
    return svg.render();
  },

  // 27.5 Fig. 3 — single-slit intensity versus sin θ
  Figure_27_05_03: () => {
    const svg = new Svg({
      width: 640,
      height: 480,
      title: 'Single-slit intensity',
      desc: 'Intensity versus sin θ for a single slit of width D. The central maximum is twice as wide as the others, and the intensity falls to zero at sin θ = ±λ/D, ±2λ/D, ±3λ/D. The secondary maxima are much dimmer than the central one.',
    });
    const g = new Plot(svg, {
      x: 40,
      y: 40,
      w: 540,
      h: 260,
      xRange: [-3.7, 3.7],
      yRange: [0, 1.15],
    });
    svg.arrow(g.X(-3.7), g.Y(0), g.X(3.7) + 20, g.Y(0), {
      color: COLORS.black,
      width: 2,
      head: 14,
    });
    svg.line(g.X(0), g.Y(0), g.X(0), g.Y(1.15), { color: COLORS.black, width: 2 });
    g.fn(t => sinc2(Math.PI * t), -3.6, 3.6, { n: 900, color: CURVE, width: 3.2 });
    lab(svg, g.X(0) + 14, g.Y(1.12), 'Intensity', { math: false, anchor: 'start', size: 26 });
    lab(svg, 630, g.Y(0) - 26, '\\rm{sin} θ', { size: 26, anchor: 'end' });
    lab(svg, g.X(0), g.Y(0) + 26, '0', { size: 24 });
    for (const m of [-3, -2, -1, 1, 2, 3]) {
      const x = g.X(m);
      const low = Math.abs(m) === 2;
      svg.line(x, g.Y(0) - 8, x, g.Y(0) + (low ? 50 : 8), { color: COLORS.black, width: 1.4 });
      const y = g.Y(0) + (low ? 92 : 40);
      const num = Math.abs(m) === 1 ? 'λ' : `${Math.abs(m)}λ`;
      if (m < 0) svg.text(x - 26, y + 10, '−', { size: 26, math: false });
      svg.text(x, y - 4, num, { size: 26 });
      svg.line(x - 16, y + 10, x + 16, y + 10, { color: COLORS.text, width: 1.5 });
      svg.text(x, y + 30, 'D', { size: 26 });
    }
    return svg.render();
  },

  // 27.5 example — a slit with its second minimum at 45°
  Figure_27_05_04: () => {
    const svg = new Svg({
      width: 520,
      height: 780,
      title: 'Minima of a single slit',
      desc: 'Light of wavelength λ passes through a slit of width D. Rays leave the slit straight ahead and at the first and second minima on each side: the second minimum at θ2 = 45° and the first at an angle θ1 to be found. The intensity on the screen is shown along it.',
    });
    // D/λ = 2/sin 45°, so the first minimum is at sin θ1 = sin 45°/2.
    const ratio = 2 / Math.sin(Math.PI / 4);
    const th1 = Math.asin(Math.sin(Math.PI / 4) / 2);
    const O = [100, 400];
    const sx = 420;
    const L = sx - O[0];
    plate(svg, O[0], 230, 570, [[386, 414]], { width: 4 });
    svg.line(sx, 40, sx, 760, { color: COLORS.black, width: 2 });
    ray(svg, [30, O[1]], [O[0] - 4, O[1]], { arrow: 0.7 });
    lab(svg, 40, O[1] - 22, 'λ', { size: 22 });
    for (const a of [0, th1, Math.PI / 4])
      for (const s of a ? [1, -1] : [1])
        ray(svg, O, [sx, O[1] - s * L * Math.tan(a)], { arrow: false });
    const pts = [];
    for (let y = -360; y <= 360; y += 1) {
      const t = Math.atan(-y / L);
      pts.push([sx + 70 * sinc2(Math.PI * ratio * Math.sin(t)), O[1] + y]);
    }
    svg.polyline(pts, { color: CURVE, width: 2.6 });
    angle(svg, O, [1, 0], unit([L, -L]), 130, '', {});
    angle(svg, O, [1, 0], unit([L, -L * Math.tan(th1)]), 90, '', {});
    lab(svg, O[0] + 132, O[1] - 104, 'θ_2 = 45°', { anchor: 'start', size: 20 });
    lab(svg, O[0] + 98, O[1] - 18, 'θ_1 = ?', { anchor: 'start', size: 20 });
    svg.arrow(O[0] - 18, 388, O[0] - 18, 412, {
      color: COLORS.black,
      width: 1.2,
      head: 7,
      start: true,
    });
    lab(svg, O[0] - 32, O[1] + 34, 'D', { size: 22 });
    note(svg, sx - 20, 30, 'Screen', { size: 20 });
    note(svg, sx + 30, 730, 'Intensity', { size: 20 });
    note(svg, sx + 30, 754, 'on screen', { size: 20 });
    return svg.render();
  },

  // 27.6 Fig. 7 — a focal point versus a focal region
  Figure_27_06_07: () => {
    const svg = new Svg({
      width: 760,
      height: 640,
      title: 'Geometric and wave-optics focus',
      desc: '(a) In geometric optics, parallel rays through a lens cross at a single focal point. (b) Wave optics shows that the light converges only to a focal region of finite width, because of diffraction, and then spreads again.',
    });
    for (const [cy, wave, cap, s1, s2, below] of [
      [150, false, '(a)', 'Focal', 'point', 'Geometric optics focus'],
      [460, true, '(b)', 'Focal', 'region', 'Wave optics focus'],
    ]) {
      svg.ellipse(170, cy, 24, 120, { fill: '#7fc6d8', stroke: '#2f6f86', width: 1.5 });
      for (const s of [-1, 1]) {
        svg.arrow(30, cy + s * 95, 150, cy + s * 95, { color: COLORS.black, width: 1.8, head: 13 });
        if (!wave)
          svg.arrow(194, cy + s * 95, 700, cy - s * 95, {
            color: COLORS.black,
            width: 1.8,
            head: 13,
          });
        else {
          // A waist of half-width w0: y = w0·√(1 + (z/zR)²).
          const pts = [];
          for (let x = 194; x <= 690; x += 4) {
            const z = (x - 442) / 248;
            pts.push([x, cy + s * Math.sqrt(16 ** 2 + (95 ** 2 - 16 ** 2) * z * z)]);
          }
          svg.polyline(pts, { color: COLORS.black, width: 1.8 });
          svg.arrow(...pts.at(-2), 700, cy + s * 97, { color: COLORS.black, width: 1.8, head: 13 });
        }
      }
      note(svg, 450, cy - 60, s1, { size: 20 });
      note(svg, 450, cy - 36, s2, { size: 20 });
      note(svg, 450, cy + 70, below, { size: 20 });
      caption(svg, 20, cy + 130, cap);
    }
    return svg.render();
  },

  // 27.7 Fig. 2 — reflections from the two surfaces of a thin film
  Figure_27_07_02: () => {
    const svg = new Svg({
      width: 520,
      height: 780,
      title: 'Reflection from a thin film',
      desc: 'Light in medium n1 strikes a thin film of thickness t and index n2 lying on medium n3. Ray 1 reflects from the top surface of the film; the rest refracts into the film, reflects from its bottom surface and comes back out as ray 2, parallel to ray 1. The two rays interfere.',
    });
    const [y1, y2] = [330, 530];
    svg.rect(60, y1, 380, y2 - y1, { fill: '#e2e6f5' });
    svg.rect(60, y2, 380, 220, { fill: '#e2e2e2' });
    for (const y of [y1, y2]) svg.line(60, y, 440, y, { color: '#9a9a9a', width: 1.5 });
    svg.line(60, 750, 440, 750, { color: '#9a9a9a', width: 1.5 });
    // n2 = 1.50 and an incident angle of 25°.
    const th = (25 * Math.PI) / 180;
    const th2 = Math.asin(Math.sin(th) / 1.5);
    const A = [220, y1];
    const dIn = [Math.sin(th), Math.cos(th)];
    ray(svg, sub(A, mul(dIn, 300)), A, { arrow: 0.55 });
    const r1 = [Math.sin(th), -Math.cos(th)];
    ray(svg, A, add(A, mul(r1, 300)), { arrow: 0.85 });
    const B = [A[0] + (y2 - y1) * Math.tan(th2), y2];
    ray(svg, A, B, { arrow: 0.6 });
    const C = [B[0] + (y2 - y1) * Math.tan(th2), y1];
    ray(svg, B, C, { arrow: 0.6 });
    ray(svg, C, add(C, mul(r1, 300)), { arrow: 0.85 });
    note(svg, 120, 30, 'Incident', { size: 22 });
    note(svg, 120, 56, 'light', { size: 22 });
    note(svg, ...add(add(A, mul(r1, 300)), [-12, -6]), '1', { size: 22, anchor: 'end' });
    note(svg, ...add(add(C, mul(r1, 300)), [14, -6]), '2', { size: 22, anchor: 'start' });
    svg.arrow(470, y1 + 2, 470, y2 - 2, { color: COLORS.black, width: 1.4, head: 10, start: true });
    for (const y of [y1, y2]) svg.line(458, y, 482, y, { color: COLORS.black, width: 1.3 });
    lab(svg, 488, (y1 + y2) / 2, 't', { anchor: 'start' });
    lab(svg, 80, y1 - 40, 'n_1', { anchor: 'start' });
    lab(svg, 80, (y1 + y2) / 2, 'n_2', { anchor: 'start' });
    lab(svg, 80, y2 + 80, 'n_3', { anchor: 'start' });
    return svg.render();
  },

  // 27.8 Fig. 4 — unpolarized light
  Figure_27_08_04: () => {
    const svg = new Svg({
      width: 720,
      height: 640,
      title: 'Unpolarized light',
      desc: 'A thin arrow shows the direction of a ray of unpolarized light. Bold arrows from a point on the ray show the directions of the electric fields E of the individual waves in the ray: since the light is unpolarized, they point in all directions perpendicular to the ray.',
    });
    const C = [300, 320];
    svg.line(60, 200, ...C, { color: POL, width: 1.6 });
    svg.arrow(...C, 660, 500, { color: POL, width: 1.6, head: 14 });
    for (let k = 0; k < 8; k += 1) {
      const u = dir(k * 45);
      svg.arrow(...C, ...add(C, mul(u, 220)), { color: POL, width: 4.5, head: 26 });
    }
    for (const a of [90, 45, 0, -45]) {
      const P = add(C, mul(dir(a), 240));
      svg.text(P[0] + 18, P[1], '**E**', { size: 26, math: false, weight: 'bold' });
    }
    note(svg, 160, 40, 'Random polarization', { size: 26 });
    note(svg, 560, 560, 'Direction of ray', { size: 26 });
    note(svg, 560, 592, '(of propagation)', { size: 26 });
    return svg.render();
  },

  // 27.8 Fig. 7 — a filter passes E cos θ
  Figure_27_08_07: () => {
    const svg = new Svg({
      width: 640,
      height: 380,
      title: 'Transmission through a polarizing filter',
      desc: 'Polarized light with its electric field E at angle θ to a filter’s axis approaches the filter. Only the component parallel to the axis, E cos θ, is transmitted.',
    });
    svg.line(20, 120, 620, 330, { color: LIGHT, width: 1.8 });
    svg.arrow(560, 309, 620, 330, { color: LIGHT, width: 1.8, head: 14 });
    // The field at θ = 35° from the vertical, and its component along the vertical axis.
    const C = [130, 158];
    const th = 35;
    const u = dir(90 - th);
    both(svg, C, u, 110, { width: 4, head: 20 });
    both(svg, C, [0, -1], 110 * Math.cos((th * Math.PI) / 180), { width: 4, head: 20 });
    const tipE = add(C, mul(u, 110));
    const tipV = add(C, [0, -110 * Math.cos((th * Math.PI) / 180)]);
    dashed(svg, tipV, tipE);
    svg.arc(...C, 60, 90 - th, 90, { color: COLORS.black, width: 1.5 });
    lab(svg, C[0] + 26, C[1] - 72, 'θ', { size: 26 });
    lab(svg, tipE[0] + 20, tipE[1] + 6, 'E', { size: 26 });
    lab(svg, C[0] - 20, C[1] + 130, 'E \\rm{cos} θ', { size: 26 });
    // The filter, seen at a slant, with its vertical axis.
    svg.polygon(
      [
        [360, 150],
        [430, 120],
        [430, 290],
        [360, 330],
      ],
      { fill: '#e9e9ee', stroke: COLORS.black, width: 2.5 }
    );
    for (let k = 1; k < 7; k += 1) {
      const x = 360 + k * 10;
      svg.line(x, 150 - k * 4.3, x, 330 - k * 5.7, { color: '#b5b5c0', width: 2 });
    }
    both(svg, [404, 228], [0, -1], 60, { color: COLORS.black, width: 1.8, head: 12 });
    note(svg, 470, 40, 'Polarizing filter', { size: 24 });
    svg.squiggle(440, 54, 400, 128, { waves: 1, amp: 4 });
    note(svg, 470, 150, 'Axis', { size: 24, anchor: 'start' });
    svg.squiggle(466, 150, 414, 180, { waves: 1, amp: 3 });
    both(svg, [540, 290], [0, -1], 110 * Math.cos((th * Math.PI) / 180), { width: 4, head: 20 });
    lab(svg, 560, 210, 'E \\rm{cos} θ', { anchor: 'start', size: 26 });
    return svg.render();
  },

  // 27.8 Fig. 8 — reflection partly polarizes light
  Figure_27_08_08: () => {
    const svg = new Svg({
      width: 660,
      height: 560,
      title: 'Polarization by reflection',
      desc: 'Unpolarized light in air strikes a glass surface. The reflected light is partially polarized, mostly perpendicular to the plane of the paper (dots), and the refracted light is partially polarized, mostly in the plane of the paper (arrows). At Brewster’s angle, θ = arctan 1.5 = 56.3°, the reflected and refracted rays are perpendicular and the reflected light is completely polarized.',
    });
    const ys = 300;
    svg.rect(10, ys, 640, 250, { fill: '#a9dde3', stroke: '#5ab4c0', width: 1.5 });
    const O = [230, ys];
    const thB = Math.atan(1.5);
    const thT = Math.PI / 2 - thB;
    const dIn = [Math.sin(thB), Math.cos(thB)];
    const dR = [Math.sin(thB), -Math.cos(thB)];
    const dT = [Math.sin(thT), Math.cos(thT)];
    svg.line(...sub(O, mul(dIn, 330)), ...O, { color: COLORS.black, width: 2 });
    svg.arrow(...sub(O, mul(dIn, 120)), ...sub(O, mul(dIn, 100)), {
      color: COLORS.black,
      width: 2,
      head: 12,
    });
    svg.line(...O, ...add(O, mul(dR, 330)), { color: COLORS.black, width: 2 });
    svg.arrow(...add(O, mul(dR, 300)), ...add(O, mul(dR, 330)), {
      color: COLORS.black,
      width: 2,
      head: 12,
    });
    svg.line(...O, ...add(O, mul(dT, 230)), { color: COLORS.black, width: 2 });
    svg.arrow(...add(O, mul(dT, 210)), ...add(O, mul(dT, 236)), {
      color: COLORS.black,
      width: 2,
      head: 12,
    });
    // Unpolarized: field directions all around the incoming ray.
    const S = sub(O, mul(dIn, 210));
    for (let k = 0; k < 4; k += 1)
      both(svg, S, dir(k * 45 + 10), 60, { color: COLORS.black, width: 1.8, head: 10 });
    for (let k = 1; k <= 4; k += 1) {
      const P = add(O, mul(dR, 60 * k));
      svg.circle(...P, 6, { fill: COLORS.black });
      both(svg, P, [-dR[1], dR[0]], 18, { color: COLORS.black, width: 1.6, head: 8 });
    }
    for (let k = 1; k <= 5; k += 1) {
      const P = add(O, mul(dT, 34 * k));
      svg.circle(...P, 4, { fill: COLORS.black });
      both(svg, P, [-dT[1], dT[0]], 34, { color: COLORS.black, width: 1.6, head: 9 });
    }
    note(svg, 120, 30, 'Unpolarized light', { size: 22 });
    note(svg, 520, 30, 'Partially polarized light', { size: 22 });
    note(svg, 520, 236, 'Perpendicular to', { size: 22 });
    note(svg, 520, 262, 'plane of paper', { size: 22 });
    svg.squiggle(436, 236, ...add(add(O, mul(dR, 120)), [10, 4]), { waves: 1, amp: 3 });
    note(svg, 60, ys - 22, 'Air', { size: 22 });
    note(svg, 60, ys + 26, 'Glass', { size: 22 });
    note(svg, 470, 500, 'Partially polarized light', { size: 22 });
    return svg.render();
  },

  // 27.8 Fig. 15 — a birefringent crystal splits a beam
  Figure_27_08_15: () => {
    const svg = new Svg({
      width: 760,
      height: 360,
      title: 'Birefringence',
      desc: 'An unpolarized beam enters a birefringent crystal such as calcite and splits in two. The ordinary ray o goes straight through, polarized perpendicular to the page; the extraordinary ray e is bent, polarized in the plane of the page, and leaves parallel to the o ray but displaced.',
    });
    const [L, T, Bm] = [300, 110, 330];
    const dx = 90;
    const dy = 60;
    svg.polygon(
      [
        [L, T],
        [L + dx, T - dy],
        [L + dx + 200, T - dy],
        [L + 200, T],
      ],
      { fill: '#f6ead2', stroke: '#c9b07a', width: 1.5 }
    );
    svg.polygon(
      [
        [L + 200, T],
        [L + dx + 200, T - dy],
        [L + dx + 200, Bm - dy],
        [L + 200, Bm],
      ],
      { fill: '#ecdcb9', stroke: '#c9b07a', width: 1.5 }
    );
    svg.add(
      `<rect x="${L}" y="${T}" width="200" height="${Bm - T}" fill="#f3e5c6" fill-opacity="0.8" stroke="#c9b07a" stroke-width="1.5"/>`
    );
    const yo = 180;
    const ye = 250;
    svg.line(20, yo, 740, yo, { color: LIGHT, width: 2.4 });
    svg.line(L, yo, L + 120, ye, { color: LIGHT, width: 2.4 });
    svg.line(L + 120, ye, 740, ye, { color: LIGHT, width: 2.4 });
    const oblique = [0.82, -0.57];
    for (const x of [60, 160, 230]) {
      both(svg, [x, yo], [0, -1], 36, { color: LIGHT, width: 2, head: 9 });
      both(svg, [x + 30, yo], oblique, 34, { color: LIGHT, width: 2, head: 9 });
    }
    for (const x of [400, 480, 560, 640, 700])
      both(svg, [x, yo], oblique, 34, { color: LIGHT, width: 2, head: 9 });
    for (const x of [360, 440, 520, 600, 680])
      both(svg, [x, ye], [0, -1], 36, { color: LIGHT, width: 2, head: 9 });
    lab(svg, 748, yo + 4, 'o', { anchor: 'start', size: 26 });
    lab(svg, 748, ye + 4, 'e', { anchor: 'start', size: 26 });
    return svg.render();
  },
};
