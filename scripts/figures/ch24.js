/**
 * Chapter 24: electromagnetic waves — the fields of a wave leaving an
 * antenna, interference from two antennas, the spectrum, AM and FM, and the
 * energy a wave carries.
 *
 * Waves are drawn from their equations. The E and B fields are in phase and
 * perpendicular, with E × B along the direction of travel. Two antennas a
 * distance d = 5λ/3 apart interfere constructively where crest meets crest,
 * along directions with d sin θ = mλ. The AM wave is the carrier times the
 * audio envelope; the FM wave's phase is the integral of a frequency that
 * follows the audio. Spectrum colors come from wavelength.
 *
 * For readers who allow motion, the plane waves travel along c, the fronts
 * from the two antennas spread outward with their points of constructive
 * interference, the ELF signal runs down to the submarine, a cursor reads
 * across the AM and FM graphs, and the slowed electron sends out its X ray.
 */
import { COLORS, Svg, fmt, marching, morph, smilAnimate, smilList } from './svg.js';

const EFIELD = '#1f78c8';
const BFIELD = '#e0246e';
const PLANE = '#bfe8ef';
const PLANE_EDGE = '#4fc3d6';
const WAVE = COLORS.maroon;

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

/**
 * A stretch of plane wave in oblique view, starting at (ox, oy): x along the
 * direction of travel, y up (E), z toward the viewer (B), so E × B points
 * along +x. `len` is the length drawn and A the field amplitude, in pixels.
 * With `animate`, readers who allow motion see the fields travel along +x,
 * one wavelength every 2.4 s, the arrows at each x growing and shrinking.
 */
function planeWave(svg, ox, oy, { len, lambda, A, halfPlane = 1.35, animate = false }) {
  const ex = [0.96, 0.27];
  const ez = [-0.5, 0.42];
  const P = (x, y, z) => [ox + x * ex[0] + z * ez[0], oy + x * ex[1] - y + z * ez[1]];
  const h = A * halfPlane;
  const [x0, x1] = [-0.12 * len, 1.1 * len];
  const plane = pts =>
    svg.add(
      `<polygon points="${pts.map(p => p.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${PLANE}" fill-opacity="0.45" stroke="${PLANE_EDGE}" stroke-width="1.5"/>`
    );
  plane([P(x0, 0, -h), P(x1, 0, -h), P(x1, 0, h), P(x0, 0, h)]);
  plane([P(x0, -h, 0), P(x1, -h, 0), P(x1, h, 0), P(x0, h, 0)]);
  const f = (x, phase = 0) => A * Math.sin((2 * Math.PI * x) / lambda - phase);
  const field = (which, x, v) => (which === 'E' ? P(x, v, 0) : P(x, 0, v));
  const curve = (which, from = 0) =>
    Array.from({ length: 121 }, (_, i) => {
      const x = from + ((len - from) * i) / 120;
      return field(which, x, f(x));
    });
  // The moving frames draw every arrow, however short, so that each frame has
  // the same elements.
  const arrows = (which, phase, moving) => {
    for (let i = 1; i < 18; i += 1) {
      const x = (len * i) / 18;
      let v = f(x, phase);
      if (!moving && Math.abs(v) < A * 0.18) continue;
      if (Math.abs(v) < 0.5) v = v < 0 ? -0.5 : 0.5;
      svg.arrow(...P(x, 0, 0), ...field(which, x, v), {
        color: which === 'E' ? EFIELD : BFIELD,
        width: 2.4,
        head: 12,
      });
    }
  };
  const still = () => {
    arrows('B', 0, false);
    svg.polyline(curve('B'), { color: BFIELD, width: 2.6 });
    arrows('E', 0, false);
    svg.polyline(curve('E'), { color: EFIELD, width: 2.6 });
  };
  if (!animate) {
    still();
    return { P, x0, x1, h };
  }
  svg.still(still);
  // A wavelength more of each curve slides along +x through a window over
  // the drawn stretch: in the oblique view a shift along x is a translation.
  svg.waves = (svg.waves || 0) + 1;
  const id = `wave${svg.waves}`;
  const window = which =>
    [
      field(which, 0, -2 * A),
      field(which, len, -2 * A),
      field(which, len, 2 * A),
      field(which, 0, 2 * A),
    ]
      .map(p => p.map(fmt).join(','))
      .join(' ');
  svg.add(
    `<defs><clipPath id="${id}E"><polygon points="${window('E')}"/></clipPath><clipPath id="${id}B"><polygon points="${window('B')}"/></clipPath></defs>`
  );
  const dur = '2.4s';
  const [dx, dy] = [P(lambda, 0, 0)[0] - P(0, 0, 0)[0], P(lambda, 0, 0)[1] - P(0, 0, 0)[1]];
  const slide = which =>
    `<g clip-path="url(#${id}${which})"><g><animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" values="0 0;${fmt(dx)} ${fmt(dy)}"/>${svg.capture(
      () =>
        svg.polyline(curve(which, -lambda), { color: which === 'E' ? EFIELD : BFIELD, width: 2.6 })
    )}</g></g>`;
  const phases = Array.from({ length: 17 }, (_, k) => (2 * Math.PI * k) / 16);
  const turning = which =>
    morph(
      phases.map(ph => svg.capture(() => arrows(which, ph, true))),
      { dur }
    );
  svg.motionGroup(turning('B') + slide('B') + turning('E') + slide('E'));
  return { P, x0, x1, h };
}

/** sRGB color of light of wavelength `nm`, dimmed toward the ends of the visible range. */
export function spectral(nm) {
  let r;
  let g;
  let b;
  if (nm < 440) [r, g, b] = [(440 - nm) / 60, 0, 1];
  else if (nm < 490) [r, g, b] = [0, (nm - 440) / 50, 1];
  else if (nm < 510) [r, g, b] = [0, 1, (510 - nm) / 20];
  else if (nm < 580) [r, g, b] = [(nm - 510) / 70, 1, 0];
  else if (nm < 645) [r, g, b] = [1, (645 - nm) / 65, 0];
  else [r, g, b] = [1, 0, 0];
  const edge =
    nm < 420 ? 0.55 + (0.45 * (nm - 380)) / 40 : nm > 700 ? 0.55 + (0.45 * (780 - nm)) / 80 : 1;
  const c = v => Math.round(255 * Math.max(0, Math.min(1, v * edge)) ** 0.8);
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

/** 24.3 Fig. 10 and 25.5 Fig. 2: the visible part of the spectrum on a wavelength scale. */
function visibleSpectrum() {
  const svg = new Svg({
    width: 1040,
    height: 230,
    title: 'The visible spectrum',
    desc: 'A wavelength scale from 850 nm on the left to 250 nm on the right. Visible light runs from about 760 nm (red) through orange, yellow, green and blue to about 380 nm (violet), shown as a continuous band of color. Infrared lies at longer wavelengths to the left and ultraviolet at shorter wavelengths to the right.',
  });
  const X = nm => 50 + (850 - nm) * 1.58;
  const [y0, y1] = [140, 180];
  const stops = [];
  for (let nm = 760; nm >= 380; nm -= 10)
    stops.push(`<stop offset="${((760 - nm) / 380).toFixed(3)}" stop-color="${spectral(nm)}"/>`);
  svg.add(
    `<defs><linearGradient id="visible" x1="0" y1="0" x2="1" y2="0">${stops.join('')}</linearGradient></defs>`
  );
  svg.rect(X(760), y0, X(380) - X(760), y1 - y0, { fill: 'url(#visible)' });
  svg.arrow(10, y1, 1000, y1, { color: COLORS.black, width: 1.5, head: 12 });
  for (const nm of [800, 700, 600, 500, 400, 300]) {
    svg.line(X(nm), y1 - 10, X(nm), y1, { color: COLORS.black, width: 1.5 });
    note(svg, X(nm), y1 + 26, String(nm), { size: 20 });
  }
  svg.text(1035, y1 + 26, 'λ \\rm{(nm)}', { size: 20, anchor: 'end' });
  // Color names at their approximate centers.
  for (const [nm, s, dy] of [
    [700, 'Red', 0],
    [615, 'Orange', -22],
    [580, 'Yellow', 0],
    [530, 'Green', -22],
    [470, 'Blue', 0],
    [410, 'Violet', -22],
  ])
    note(svg, X(nm), 118 + dy, s);
  note(svg, X(800), 118, 'Infrared');
  note(svg, X(300) + 30, 118, 'Ultraviolet');
  const [b1, b2] = [X(760), X(380)];
  svg.path(
    `M ${b1} 66 Q ${b1} 56 ${b1 + 10} 56 L ${(b1 + b2) / 2 - 10} 56 Q ${(b1 + b2) / 2} 56 ${(b1 + b2) / 2} 46 Q ${(b1 + b2) / 2} 56 ${(b1 + b2) / 2 + 10} 56 L ${b2 - 10} 56 Q ${b2} 56 ${b2} 66`,
    {
      color: COLORS.axis,
      width: 1.5,
    }
  );
  note(svg, (b1 + b2) / 2, 28, 'Visible light');
  return svg.render();
}

export default {
  // 24.2 Fig. 3 — the wave leaving an antenna: E and B in phase, at right angles
  Figure_24_02_03: () => {
    const svg = new Svg({
      width: 760,
      height: 520,
      title: 'An electromagnetic wave leaving an antenna',
      desc: 'Part of the electromagnetic wave sent out from an antenna, drawn at one instant along one direction. The electric field E, in blue, oscillates in a vertical plane and the magnetic field B, in magenta, in a horizontal plane. The two are in phase and perpendicular to each other and to the direction of travel, marked c.',
    });
    svg.rect(92, 30, 14, 290, { fill: '#c9d3e6', stroke: '#7d8aa6', width: 1, rx: 6 });
    svg.circle(99, 150, 22, { fill: '#ffffff', stroke: COLORS.black, width: 2 });
    svg.path('M 87 150 Q 93 140 99 150 Q 105 160 111 150', { color: COLORS.black, width: 2 });
    const { P } = planeWave(svg, 180, 200, { len: 430, lambda: 286, A: 92, animate: true });
    svg.line(...P(0, 0, 0), ...P(430, 0, 0), { color: COLORS.black, width: 2 });
    svg.arrow(...P(430, 0, 0), ...P(520, 0, 0), { color: '#4caf2a', width: 3, head: 16 });
    lab(svg, ...P(546, 0, 0), 'c');
    svg.text(205, 46, '**E**', { size: 24 });
    svg.text(118, 300, '**B**', { size: 24 });
    return svg.render();
  },

  // 24.2 Fig. 6 — two antennas and their interference pattern
  Figure_24_02_06: () => {
    const svg = new Svg({
      width: 680,
      height: 700,
      title: 'Interference from two broadcast antennas',
      desc: 'An overhead view of two antennas sending the same signal. Solid circles centered on each antenna are crests and dashed circles are troughs. Where a crest from one antenna meets a crest from the other, marked with dots, the waves interfere constructively; these points line up along a few directions, shown by arrows: straight up and down between the antennas and along two diagonals on each side.',
    });
    // d = 5λ/3, so the first-order directions are at sin θ = 3/5 from the bisector.
    const [cx, cy, lam] = [340, 330, 60];
    const d = (5 * lam) / 3;
    const A = [cx - d / 2, cy];
    const B = [cx + d / 2, cy];
    const radii = [30, 90, 150, 210, 270];
    const Rmax = 290;
    svg.add(
      `<defs><radialGradient id="ant0" gradientUnits="userSpaceOnUse" cx="${A[0]}" cy="${A[1]}" r="${Rmax}"><stop offset="0" stop-color="#c7d3ea"/><stop offset="1" stop-color="#e8eef8"/></radialGradient><radialGradient id="ant1" gradientUnits="userSpaceOnUse" cx="${B[0]}" cy="${B[1]}" r="${Rmax}"><stop offset="0" stop-color="#c7d3ea"/><stop offset="1" stop-color="#e8eef8"/></radialGradient></defs>`
    );
    svg.circle(...A, Rmax, { fill: 'url(#ant0)', stroke: '#9fb0d4', width: 1 });
    svg.add(
      `<circle cx="${B[0]}" cy="${B[1]}" r="${Rmax}" fill="url(#ant1)" fill-opacity="0.75" stroke="#9fb0d4" stroke-width="1"/>`
    );
    svg.still(() => {
      for (const S of [A, B])
        for (const r of radii) {
          svg.circle(...S, r, { fill: 'none', stroke: '#7d8fc6', width: 1.6 });
          if (r + lam / 2 < Rmax)
            svg.add(
              `<circle cx="${S[0]}" cy="${S[1]}" r="${r + lam / 2}" fill="none" stroke="#6a3d9a" stroke-width="1.4" stroke-dasharray="6 5"/>`
            );
        }
      // Crest meets crest: intersections of the two families of solid circles.
      for (const ra of radii)
        for (const rb of radii) {
          const u = (ra * ra - rb * rb + d * d) / (2 * d);
          const h2 = ra * ra - u * u;
          if (h2 <= 0) continue;
          for (const s of [1, -1])
            svg.circle(A[0] + u, cy + s * Math.sqrt(h2), 6, { fill: '#a01c38' });
        }
    });
    // For readers who allow motion, every front grows by a wavelength each
    // 3 s, fading in at the antenna and out at the edge, and the points where
    // crest meets crest ride outward along the arrows. Crest k has radius
    // 30 + 60k + s as s runs from 0 to λ; at s = λ crest k stands where crest
    // k + 1 began, so the loop is seamless.
    const ks = [-1, 0, 1, 2, 3, 4];
    const seen = r => Math.max(0, Math.min(1, r / 20, (Rmax + 10 - r) / 30));
    const ring = (S, r, dashed) =>
      svg.add(
        `<circle cx="${S[0]}" cy="${S[1]}" r="${fmt(Math.max(r, 0.5))}" fill="none" stroke="${dashed ? '#6a3d9a' : '#7d8fc6'}" stroke-width="${dashed ? 1.4 : 1.6}"${dashed ? ' stroke-dasharray="6 5"' : ''} opacity="${fmt(seen(r))}"/>`
      );
    const fronts = s => {
      for (const S of [A, B])
        for (const k of ks) {
          ring(S, 30 + 60 * k + s, false);
          ring(S, 60 + 60 * k + s, true);
        }
      for (const ka of ks)
        for (const kb of ks) {
          if (Math.abs(ka - kb) > 1) continue;
          const [ra, rb] = [30 + 60 * ka + s, 30 + 60 * kb + s];
          const u = (ra * ra - rb * rb + d * d) / (2 * d);
          const h2 = ra * ra - u * u;
          const there = ra > 0 && rb > 0 && h2 > 0;
          for (const sg of [1, -1])
            svg.add(
              `<circle cx="${fmt(A[0] + u)}" cy="${fmt(cy + sg * Math.sqrt(Math.max(h2, 0)))}" r="6" fill="#a01c38" opacity="${fmt(there ? Math.min(seen(ra), seen(rb)) : 0)}"/>`
            );
        }
    };
    svg.motionGroup(
      morph(
        Array.from({ length: 31 }, (_, k) => svg.capture(() => fronts((lam * k) / 30))),
        { dur: '3s' }
      )
    );
    for (const S of [A, B])
      svg.rect(S[0] - 9, S[1] - 9, 18, 18, { fill: '#a9a9a9', stroke: '#555555', width: 1 });
    // Directions of constructive interference: d sin θ = 0 and ±λ, measured from the bisector.
    const th = Math.asin(lam / d);
    for (const a of [0, th, -th])
      for (const s of [1, -1]) {
        const [ux, uy] = [Math.sin(a), -s * Math.cos(a)];
        svg.arrow(cx + ux * 30, cy + uy * 30, cx + ux * 320, cy + uy * 320, {
          color: EFIELD,
          width: 3.5,
          head: 20,
        });
      }
    note(svg, 150, 668, 'Direction of', { size: 22 });
    note(svg, 150, 692, 'constructive interference', { size: 22 });
    svg.leader(150, 650, cx + Math.sin(th) * -300, cy + Math.cos(th) * 300 - 6, {
      bend: 0.2,
      width: 1.4,
    });
    svg.leader(170, 650, cx, cy + 320, { bend: 0.2, width: 1.4 });
    svg.circle(472, 668, 6, { fill: '#a01c38' });
    note(svg, 486, 668, '= Constructive', { anchor: 'start', size: 22 });
    note(svg, 486, 692, 'interference', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 24.3 Fig. 1 — the electromagnetic spectrum
  Figure_24_03_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 400,
      title: 'The electromagnetic spectrum',
      desc: 'The electromagnetic spectrum on a logarithmic frequency scale from 1 Hz to beyond 10^24 Hz, with wavelengths from 3 × 10^6 m to 3 × 10^−14 m above. Radio waves run up to about 10^12 Hz and include AM radio near 10^6 Hz and TV and FM radio near 10^8 Hz; microwaves run from about 10^9 to 10^12 Hz; infrared from about 10^11 Hz to the narrow band of visible light near 10^14.7 Hz; ultraviolet from there to about 10^16.5 Hz; X rays from about 10^16 to 10^20 Hz; and gamma rays from about 10^18 Hz upward. Some categories overlap.',
    });
    const X = n => 20 + n * 38; // n = log10(f / Hz)
    const [top, bot] = [96, 340];
    svg.rect(X(0), 150, X(12) - X(0), bot - 150, { fill: '#fbeedd' });
    svg.arrow(10, bot, 990, bot, { color: COLORS.black, width: 1.4, head: 10 });
    svg.arrow(990, top, 10, top, { color: COLORS.black, width: 1.4, head: 10 });
    for (let n = 0; n <= 24; n += 1) {
      svg.line(X(n), bot, X(n), bot - (n % 2 ? 5 : 9), { color: COLORS.black, width: 1.2 });
      svg.line(X(n), top, X(n), top + (n % 2 ? 5 : 9), { color: COLORS.black, width: 1.2 });
      if (n % 2 === 0) svg.text(X(n), bot + 22, `10^{${n}}`, { size: 16, math: false });
    }
    svg.text(990, bot + 46, 'Frequency (Hz)', { size: 16, math: false, anchor: 'end' });
    svg.text(990, top + 26, 'Wavelength', { size: 16, math: false, anchor: 'end' });
    // λ = c/f with c = 3 × 10^8 m/s.
    for (const [n, s, named] of [
      [2, '3 × 10^6 m'],
      [6, '300 m'],
      [10, '3 × 10^{−2} m', '(3 cm)'],
      [14, '3 × 10^{−6} m', '(3 μm)'],
      [18, '3 × 10^{−10} m', '(3 Å)'],
      [22, '3 × 10^{−14} m', '(30 fermis)'],
    ]) {
      svg.text(X(n), top - 18, s, { size: 16, math: false });
      if (named) svg.text(X(n), top - 40, named, { size: 16, math: false });
    }
    const range = (n1, n2, y, s, { dashTo } = {}) => {
      svg.arrow(X(n1), y, X(n2), y, { color: WAVE, width: 2.4, head: 12, start: true });
      if (dashTo) svg.line(X(n2), y, X(dashTo), y, { color: WAVE, width: 2.4, dash: '6 5' });
      svg.text((X(n1) + X(n2)) / 2, y - 14, s, { size: 16, math: false });
    };
    // Ultraviolet's label starts past the visible band instead of centering over it.
    range(0, 12, 174, 'Radio waves');
    range(9, 12, 210, 'Microwaves');
    range(11, 14.6, 138, 'Infrared');
    range(14.9, 16.5, 138, '');
    svg.text(X(14.9) + 6, 124, 'Ultraviolet', { size: 16, math: false, anchor: 'start' });
    range(16, 19.8, 172, 'X rays');
    range(18, 22.8, 210, 'γ rays', { dashTo: 24.5 });
    // AM 0.54–1.6 MHz, TV 54–890 MHz, FM 88–108 MHz.
    svg.rect(X(5.73), 252, X(6.2) - X(5.73), bot - 252, { stroke: COLORS.black, width: 1.2 });
    svg.text(X(5.97), 222, 'AM radio', { size: 15, math: false });
    svg.squiggle(X(5.97), 232, X(5.97), 250, { waves: 1, amp: 3 });
    svg.rect(X(7.94), 312, X(8.03) - X(7.94), bot - 312, { stroke: COLORS.black, width: 1.2 });
    svg.line(X(7.73), 262, X(7.73), bot, { color: COLORS.black, width: 1 });
    svg.line(X(8.95), 262, X(8.95), bot, { color: COLORS.black, width: 1 });
    svg.arrow(X(7.73), 262, X(8.95), 262, { color: WAVE, width: 2.2, head: 9, start: true });
    svg.text(X(8.3), 246, 'TV', { size: 15, math: false });
    svg.text(X(8.3), 290, 'FM radio', { size: 15, math: false });
    // Visible light, 380–760 nm: about 3.9 × 10^14 to 7.9 × 10^14 Hz.
    const vis = [];
    for (let k = 0; k <= 6; k += 1) vis.push(spectral(700 - k * 50));
    vis.forEach((c, k) => svg.rect(X(14.6) + k * 2.2, 100, 2.4, bot - 100, { fill: c }));
    svg.text(X(15.4), 286, 'Visible light', { size: 15, math: false, anchor: 'start' });
    svg.squiggle(X(15.4) - 4, 286, X(14.95), 280, { waves: 1, amp: 3 });
    return svg.render();
  },

  // 24.3 Fig. 4 — an ELF signal reaching a submarine
  Figure_24_03_04: () => {
    const svg = new Svg({
      width: 560,
      height: 560,
      title: 'Extremely low frequency radio reaching a submarine',
      desc: 'A submarine deep under the sea surface receives a radio wave of very long wavelength (extremely low frequency, ELF) coming down from the air above. Shorter wavelengths do not penetrate to any significant depth.',
    });
    svg.add(
      '<defs><linearGradient id="sea24" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="#e3f1f8"/><stop offset="1" stop-color="#c9e4f1"/></linearGradient><linearGradient id="hull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4b6d6"/><stop offset="0.5" stop-color="#7488b4"/><stop offset="1" stop-color="#4f6290"/></linearGradient></defs>'
    );
    svg.rect(0, 50, 560, 510, { fill: 'url(#sea24)' });
    const surf = Array.from({ length: 57 }, (_, i) => [i * 10, 50 + 2.5 * Math.sin(i * 1.3)]);
    svg.polyline(surf, { color: '#6e9fb5', width: 1.5 });
    svg.path('M 490 0 C 470 40 430 60 330 92 C 230 130 180 200 172 300 L 170 440', {
      color: '#1aa6b7',
      width: 6,
    });
    svg.path(
      'M 60 470 Q 60 452 90 450 L 310 446 Q 345 448 345 470 Q 345 492 310 494 L 90 492 Q 60 490 60 470 Z',
      {
        color: '#3f5080',
        width: 1.5,
        fill: 'url(#hull)',
      }
    );
    svg.path('M 190 450 L 196 420 L 232 420 L 236 448 Z', {
      color: '#3f5080',
      width: 1.5,
      fill: '#6a7eab',
    });
    svg.line(222, 420, 222, 404, { color: '#3f5080', width: 3 });
    for (let x = 110; x < 300; x += 14)
      svg.line(x, 466, x + 7, 466, { color: '#3f5080', width: 1.5 });
    // For readers who allow motion, pulses run down the wave's path to the submarine.
    svg.motionGroup(
      marching(
        svg.capture(() =>
          svg.path('M 490 0 C 470 40 430 60 330 92 C 230 130 180 200 172 300 L 170 440', {
            color: '#bdf0f5',
            width: 3,
            dash: '14 40',
          })
        ),
        { dur: '0.9s' }
      )
    );
    note(svg, 410, 246, 'ELF radio wave', { size: 26 });
    svg.squiggle(400, 222, 334, 98, { waves: 1.5, amp: 9 });
    return svg.render();
  },

  // 24.3 Fig. 5 — amplitude modulation
  Figure_24_03_05: () => {
    const svg = new Svg({
      width: 1000,
      height: 360,
      title: 'Amplitude modulation',
      desc: '(a) A carrier wave at the station’s basic frequency. (b) An audio signal at much lower audible frequencies. (c) The amplitude-modulated wave: the carrier’s amplitude follows the audio signal while its frequency stays the same.',
    });
    // A smooth audio envelope made of a few bumps.
    const bump = (t, c, w, h) => h * Math.exp(-(((t - c) / w) ** 2));
    const audio = t =>
      0.18 +
      bump(t, 0.12, 0.07, 0.35) +
      bump(t, 0.48, 0.07, 0.95) +
      bump(t, 0.66, 0.06, 0.5) +
      bump(t, 0.82, 0.05, 0.35);
    const carrier = t => Math.sin(2 * Math.PI * 34 * t);
    const panel = (x0, w, f, { n = 1200, mid, amp, axis = true } = {}) => {
      if (axis) {
        svg.line(x0, mid - amp - 6, x0, mid + amp + 6, { color: COLORS.black, width: 1.5 });
        svg.line(x0, mid, x0 + w, mid, { color: COLORS.black, width: 1.5 });
      }
      const pts = [];
      for (let k = 0; k <= n; k += 1) {
        const t = k / n;
        pts.push([x0 + t * w, mid - amp * f(t)]);
      }
      return pts;
    };
    svg.polyline(panel(40, 240, carrier, { mid: 140, amp: 60 }), { color: WAVE, width: 1.6 });
    caption(svg, 160, 270, 'Carrier');
    caption(svg, 160, 296, '(a)');
    const ga = panel(350, 240, audio, { mid: 200, amp: 120, axis: false });
    svg.line(350, 80, 350, 202, { color: COLORS.black, width: 1.5 });
    svg.line(350, 202, 590, 202, { color: COLORS.black, width: 1.5 });
    svg.polyline(ga, { color: COLORS.black, width: 2 });
    caption(svg, 470, 270, 'Audio');
    caption(svg, 470, 296, '(b)');
    const env = t => audio(t) / 1.15;
    svg.polyline(
      panel(680, 280, t => env(t) * carrier(t), { mid: 140, amp: 110 }),
      { color: WAVE, width: 1.4 }
    );
    svg.polyline(panel(680, 280, env, { mid: 140, amp: 110, axis: false }), {
      color: COLORS.black,
      width: 2,
    });
    svg.polyline(
      panel(680, 280, t => -env(t), { mid: 140, amp: 110, axis: false }),
      { color: COLORS.black, width: 2 }
    );
    // For readers who allow motion, cursors run across the three graphs
    // together, so the modulated amplitude can be seen following the audio.
    const DOT = COLORS.blue;
    svg.animatedOnce(
      (t, moving, shown) => {
        svg.add(`<g opacity="${shown}">`);
        for (const [x0, w, y1, y2] of [
          [40, 240, 74, 206],
          [350, 240, 80, 202],
          [680, 280, 24, 256],
        ])
          svg.line(x0 + t * w, y1, x0 + t * w, y2, {
            color: COLORS.black,
            width: 1.5,
            dash: '5 4',
          });
        svg.circle(350 + 240 * t, 200 - 120 * audio(t), 7, {
          fill: DOT,
          stroke: '#ffffff',
          width: 1.5,
        });
        for (const sg of [1, -1])
          svg.circle(680 + 280 * t, 140 - sg * 110 * env(t), 7, {
            fill: DOT,
            stroke: '#ffffff',
            width: 1.5,
          });
        svg.add('</g>');
      },
      Array.from({ length: 121 }, (_, k) => k / 120),
      { run: 6, still: null }
    );
    caption(svg, 820, 270, 'Amplitude modulated');
    caption(svg, 820, 296, '(c)');
    svg.path('M 500 70 Q 560 0 680 30', { color: '#666666', width: 4 });
    svg.arrow(660, 22, 690, 34, { color: '#666666', width: 4, head: 18 });
    return svg.render();
  },

  // 24.3 Fig. 6 — frequency modulation
  Figure_24_03_06: () => {
    const svg = new Svg({
      width: 640,
      height: 780,
      title: 'Frequency modulation',
      desc: '(a) A carrier wave at the station’s basic frequency. (b) An audio signal at much lower audible frequencies. (c) The frequency-modulated wave: its frequency rises and falls with the audio signal while its amplitude stays the same.',
    });
    const fc = 22;
    const fa = 2.6;
    const audio = t => -Math.cos(2 * Math.PI * fa * t);
    // Phase = 2π ∫ (fc + k·audio) dt.
    const k = 8;
    const fm = t =>
      Math.sin(2 * Math.PI * (fc * t - (k / (2 * Math.PI * fa)) * Math.sin(2 * Math.PI * fa * t)));
    const graph = (y, f, amp, s, c) => {
      svg.line(40, y - amp - 12, 40, y + amp + 12, { color: COLORS.black, width: 2 });
      svg.line(40, y, 610, y, { color: COLORS.black, width: 2 });
      const pts = [];
      for (let i = 0; i <= 2000; i += 1) {
        const t = i / 2000;
        pts.push([40 + t * 570, y - amp * f(t)]);
      }
      svg.polyline(pts, { color: WAVE, width: 2.2 });
      caption(svg, 325, y + amp + 36, s);
      caption(svg, 325, y + amp + 62, c);
    };
    graph(90, t => Math.sin(2 * Math.PI * fc * t), 55, 'Carrier wave', '(a)');
    graph(340, audio, 55, 'Audio signal', '(b)');
    graph(600, fm, 55, 'Frequency modulated', '(c)');
    // For readers who allow motion, a cursor runs down through all three
    // graphs: where the audio signal is high, the FM wave's crests crowd.
    svg.animatedOnce(
      (t, moving, shown) => {
        svg.add(`<g opacity="${shown}">`);
        svg.line(40 + 570 * t, 20, 40 + 570 * t, 670, {
          color: COLORS.black,
          width: 1.5,
          dash: '5 4',
        });
        svg.circle(40 + 570 * t, 340 - 55 * audio(t), 7, {
          fill: COLORS.blue,
          stroke: '#ffffff',
          width: 1.5,
        });
        svg.add('</g>');
      },
      Array.from({ length: 101 }, (_, k) => k / 100),
      { run: 8, still: null }
    );
    svg.path('M 560 380 Q 590 430 562 520', { color: '#555555', width: 2.5 });
    svg.arrow(568, 500, 560, 528, { color: '#555555', width: 2.5, head: 14 });
    return svg.render();
  },

  // 24.3 Fig. 10 — the visible part of the spectrum
  Figure_24_03_10: visibleSpectrum,

  // 25.5 Fig. 2 — the same continuous spectrum of colors
  Figure_25_05_02: visibleSpectrum,

  // 24.3 Fig. 14 — an electron slowed in a material emits an X ray
  Figure_24_03_14: () => {
    const svg = new Svg({
      width: 560,
      height: 520,
      title: 'An electron emitting an X ray as it is slowed',
      desc: 'An energetic electron e− enters a material made of atoms and electrons, drawn as green and purple circles, and is slowed by a collision. The accelerated charge radiates, sending out an X ray shown as a wavy red arrow.',
    });
    svg.add(
      '<defs><radialGradient id="glow24" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#f6c9bf" stop-opacity="0.9"/><stop offset="1" stop-color="#f6c9bf" stop-opacity="0"/></radialGradient></defs>'
    );
    svg.circle(290, 310, 230, { fill: 'url(#glow24)' });
    for (const [x, y, g] of [
      [160, 40, 1],
      [490, 100, 1],
      [380, 150, 1],
      [270, 200, 1],
      [180, 240, 1],
      [410, 270, 1],
      [480, 330, 1],
      [160, 370, 1],
      [355, 390, 1],
      [340, 80, 0],
      [260, 140, 0],
      [110, 180, 0],
      [350, 200, 0],
      [485, 225, 0],
      [295, 315, 0],
      [270, 455, 0],
      [460, 430, 0],
    ])
      svg.circle(x, y, 22, {
        fill: g ? '#7bc86c' : '#b89ad4',
        stroke: g ? '#3c8f3a' : '#6f4c9a',
        width: 1.5,
      });
    svg.still(() => svg.circle(20, 255, 9, { fill: '#a01c38' }));
    lab(svg, 20, 226, 'e^−');
    svg.arrow(30, 257, 268, 310, { color: COLORS.black, width: 1.6, head: 14 });
    const wig = [];
    for (let k = 0; k <= 60; k += 1) {
      const s = k / 60;
      const [x, y] = [225 + s * 110, 330 + s * 90];
      wig.push([x + 9 * Math.sin(s * 14) * 0.6, y - 9 * Math.sin(s * 14) * 0.8]);
    }
    const ray = wig.slice(0, -4);
    const head = () => svg.arrow(...wig.at(-8), 345, 432, { color: '#e0245e', width: 4, head: 20 });
    svg.still(() => {
      svg.polyline(ray, { color: '#e0245e', width: 4 });
      head();
    });
    // For readers who allow motion, the electron flies in, is slowed sharply
    // near an atom and drifts off, and at that moment the X ray leaves.
    const T = 5.2;
    const dur = `${T}s`;
    const k = t => t / T;
    const hit = [262, 309];
    let rayLen = 0;
    for (let i = 1; i < ray.length; i += 1)
      rayLen += Math.hypot(ray[i][0] - ray[i - 1][0], ray[i][1] - ray[i - 1][1]);
    const electron = `<g><animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" calcMode="spline" keyTimes="${smilList([0, k(0.5), k(1.9), k(3.6), 1])}" keySplines="0 0 1 1;0 0 1 1;0 0.6 0.4 1;0 0 1 1" values="20 255;20 255;${hit.join(' ')};248 262;248 262"/>${smilAnimate(
      'opacity',
      [1, 1, 1, 0, 0, 1],
      { dur, keyTimes: [0, k(1.9), k(3), k(3.6), k(4.8), 1] }
    )}<circle r="9" fill="#a01c38"/></g>`;
    const fadeOut = [0, k(1.9), k(4.4), k(4.8), 1];
    const xray = `<g>${smilAnimate('opacity', [1, 1, 1, 0, 0], { dur, keyTimes: fadeOut })}<polyline points="${ray.map(p => p.map(fmt).join(',')).join(' ')}" fill="none" stroke="#e0245e" stroke-width="4" stroke-linejoin="round" stroke-dasharray="${fmt(rayLen)} ${fmt(rayLen)}">${smilAnimate(
      'stroke-dashoffset',
      [rayLen, rayLen, 0, 0],
      { dur, keyTimes: [0, k(1.9), k(2.9), 1] }
    )}</polyline><g>${smilAnimate('opacity', [0, 0, 1, 1], { dur, keyTimes: [0, k(2.8), k(2.9), 1] })}${svg.capture(head)}</g></g>`;
    svg.motionGroup(electron + xray);
    note(svg, 372, 448, 'x ray', { size: 24, anchor: 'start' });
    return svg.render();
  },

  // 24.4 Fig. 1 — doubling the fields quadruples the energy
  Figure_24_04_01: () => {
    const svg = new Svg({
      width: 1000,
      height: 560,
      title: 'Energy of an electromagnetic wave grows as the square of its amplitude',
      desc: 'Two stretches of an electromagnetic wave traveling in the direction c. The first has fields E and B and carries energy Eu. The second has fields 2E and 2B, twice as strong, and carries four times the energy, 4Eu.',
    });
    const a = planeWave(svg, 90, 150, {
      len: 300,
      lambda: 300,
      A: 52,
      halfPlane: 1.6,
      animate: true,
    });
    // The second stretch lies farther along the same line of travel.
    const b = planeWave(svg, ...a.P(490, 0, 0), {
      len: 300,
      lambda: 300,
      A: 104,
      halfPlane: 1.25,
      animate: true,
    });
    svg.line(...a.P(0, 0, 0), ...b.P(300, 0, 0), { color: COLORS.black, width: 2 });
    svg.arrow(...b.P(300, 0, 0), ...b.P(380, 0, 0), { color: '#4caf2a', width: 3, head: 16 });
    lab(svg, ...b.P(410, 0, 0), 'c');
    lab(svg, ...a.P(150, a.h + 26, 0), 'E_u');
    lab(svg, ...b.P(150, b.h + 26, 0), '4E_u');
    const tag = (x, y, s, tx, ty) => {
      svg.text(x, y, s, { size: 24, anchor: 'end' });
      svg.squiggle(x + 4, y, tx, ty, { waves: 1, amp: 4 });
    };
    tag(50, 92, '**E**', ...a.P(12, 30, 0));
    tag(40, 122, '**B**', ...a.P(16, 0, 26));
    tag(490, 226, '2**E**', ...b.P(14, 50, 0));
    tag(480, 268, '2**B**', ...b.P(18, 0, 46));
    return svg.render();
  },
};
