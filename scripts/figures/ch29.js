/**
 * Chapter 29: blackbody radiation, the photoelectric and Compton effects, x-ray
 * spectra, the building up of an electron diffraction pattern, wave packets,
 * and the electromagnetic spectrum against frequency, wavelength, and photon
 * energy (section 29.3, whose raster original carried a third-party copyright
 * notice).
 *
 * The spectrum's frequency axis is logarithmic. Wavelength labels come from
 * λ = c/f and photon-energy labels from E = hf, so the three scales agree by
 * construction. Blackbody curves are Planck's law drawn to one scale, so the
 * 3000 K curve is 1/32 the height of the 6000 K one. The x-ray continuum is
 * Kramers' law with low-frequency absorption, plus molybdenum's Kα and Kβ
 * lines; electron arrival points are drawn at random from the cos² intensity.
 */
import { spectral } from './ch24.js';
import { COLORS, Plot, Svg } from './svg.js';

const BAND = COLORS.maroon;
const RADIO_FILL = '#fbeedd';
const C = 3e8; // m/s, rounded as in the text
const H_EV = 4.14e-15; // eV·s

const X0 = 40;
const DECADE = 34;
const x = n => X0 + DECADE * n; // n = log10(f / Hz)
const AXIS_TOP = 100;
const AXIS_BOTTOM = 360;

/** "3 × 10^{-2}" markup for a power-of-ten value with mantissa m. */
function sci(value) {
  const exp = Math.floor(Math.log10(value) + 1e-9);
  const m = Number((value / 10 ** exp).toPrecision(3));
  return `${m} × 10^{${exp}}`;
}

/** Wavelength label for f = 10^n Hz, with a friendly unit beneath in parentheses. */
function wavelength(n) {
  const lambda = C / 10 ** n;
  const named = { 10: '3 cm', 14: '3 μm', 18: '3 Å', 22: '30 fm' }[n];
  return { main: `${sci(lambda)} m`, named };
}

/** Photon energy for f = 10^n Hz in eV, keV, or MeV, whichever reads best. */
function energy(n) {
  const e = H_EV * 10 ** n;
  const trim = v => Number(v.toPrecision(3)).toString();
  if (e >= 1e5) return `${trim(e / 1e6)} MeV`;
  if (e >= 1e3) return `${trim(e / 1e3)} keV`;
  if (e >= 0.1) return `${trim(e)} eV`;
  return `${sci(e)} eV`;
}

/** Double-headed band arrow from log-frequency n1 to n2 at height y, labeled above. */
function band(svg, n1, n2, y, label, { labelDy = -16 } = {}) {
  svg.arrow(x(n1), y, x(n2), y, { color: BAND, width: 2.5, head: 12, start: true });
  svg.text((x(n1) + x(n2)) / 2, y + labelDy, label, { size: 15, math: false });
}

const GO = '#5ab43c';

/** A photon as a wave packet: a peach ellipse holding a few cycles of a wave, tilted by `angle` degrees. */
function packet(svg, cx, cy, angle, cycles = 4.5, { rx = 80, ry = 34 } = {}) {
  const pts = [];
  for (let k = 0; k <= 200; k += 1) {
    const t = -1 + (2 * k) / 200;
    const env = Math.exp(-((t * 1.6) ** 2));
    pts.push([t * rx * 0.85, -ry * 0.75 * env * Math.sin(Math.PI * cycles * t)]);
  }
  const d = pts.map(([x, y], k) => `${k ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  svg.add(
    `<g transform="translate(${cx} ${cy}) rotate(${-angle})"><ellipse rx="${rx}" ry="${ry}" fill="#f6cdb4" stroke="#8a3a1c" stroke-width="2.5"/><path d="${d}" fill="none" stroke="#1d5f8a" stroke-width="6"/><path d="${d}" fill="none" stroke="#5ec4ec" stroke-width="3"/></g>`
  );
}

/**
 * An electron as a shaded lavender sphere of radius 24·s at (cx, cy);
 * `wave` draws the wave inside it.
 */
function electron(svg, cx, cy, s = 1, wave = false) {
  const id = `el_${Math.round(cx)}_${Math.round(cy)}`;
  svg.add(
    `<defs><radialGradient id="${id}" cx="0.4" cy="0.35" r="0.65"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="#c9b6e6"/><stop offset="1" stop-color="#7b5fae"/></radialGradient></defs>`
  );
  svg.circle(cx, cy, 24 * s, {
    fill: `url(#${id})`,
    stroke: wave ? '#1d5f8a' : 'none',
    width: wave ? 4 : 0,
  });
  if (wave) {
    const pts = [];
    for (let k = 0; k <= 120; k += 1) {
      const t = -1 + (2 * k) / 120;
      pts.push([
        cx + t * 18 * s,
        cy - 13 * s * Math.exp(-((t * 1.4) ** 2)) * Math.cos(Math.PI * 2.5 * t),
      ]);
    }
    svg.polyline(pts, { color: '#1d5f8a', width: 6 });
    svg.polyline(pts, { color: '#5ec4ec', width: 3 });
  }
}

export default {
  Figure_29_03_01() {
    const svg = new Svg({
      width: 1020,
      height: 420,
      title: 'The electromagnetic spectrum',
      desc: 'The electromagnetic spectrum on a logarithmic frequency axis from 1 hertz to beyond 10 to the 24 hertz, with the matching wavelength and photon energy on a second axis above. Double-headed arrows mark the ranges of radio waves (up to 10 to the 12 hertz, with AM radio, TV, FM radio, and microwaves inside it), infrared, ultraviolet, X rays, and gamma rays. Visible light is a very narrow rainbow band near 5 times 10 to the 14 hertz, between infrared and ultraviolet.',
    });
    const right = x(26);

    // Radio-wave region and the visible band.
    svg.rect(x(0), 195, x(12) - x(0), AXIS_BOTTOM - 195, { fill: RADIO_FILL });
    const rainbow = ['#e53935', '#fb8c00', '#fdd835', '#43a047', '#1e88e5', '#7e57c2'];
    const [v1, v2] = [Math.log10(4e14), Math.log10(7.5e14)];
    const stripe = (x(v2) - x(v1)) / rainbow.length;
    rainbow.forEach((fill, k) =>
      svg.rect(x(v1) + k * stripe, 140, stripe, AXIS_BOTTOM - 140, { fill })
    );

    // Top axis: wavelength above, photon energy below.
    svg.line(x(0), AXIS_TOP, right, AXIS_TOP, { color: COLORS.axis, width: 1.5 });
    for (let n = 0; n <= 26; n += 2) {
      svg.line(x(n), AXIS_TOP - 6, x(n), AXIS_TOP + 6, { color: COLORS.axis, width: 1.3 });
    }
    for (const n of [2, 6, 10, 14, 18, 22]) {
      const { main, named } = wavelength(n);
      svg.text(x(n), AXIS_TOP - 22, main, { size: 14, math: false });
      if (named) svg.text(x(n), AXIS_TOP - 46, `(${named})`, { size: 14, math: false });
    }
    for (const n of [2, 6, 10, 14, 16, 18, 20, 22]) {
      const dy = n === 20 ? 42 : 22;
      svg.text(x(n), AXIS_TOP + dy, energy(n), { size: 14, math: false });
    }
    svg.text(right + 8, AXIS_TOP - 22, 'Wavelength', { size: 14, math: false, anchor: 'start' });
    svg.lines(right + 8, AXIS_TOP + 22, ['Photon', 'energy'], {
      size: 14,
      math: false,
      anchor: 'start',
      gap: 17,
    });

    // Bottom axis: frequency.
    svg.line(x(0), AXIS_BOTTOM, right, AXIS_BOTTOM, { color: COLORS.axis, width: 1.5 });
    for (let n = 0; n <= 26; n += 1) {
      const len = n % 2 ? 4 : 7;
      svg.line(x(n), AXIS_BOTTOM - len, x(n), AXIS_BOTTOM + len, {
        color: COLORS.axis,
        width: 1.3,
      });
      if (n % 2 === 0 && n <= 24) {
        svg.text(x(n), AXIS_BOTTOM + 24, `10^{${n}}`, { size: 15, math: false });
      }
    }
    svg.text(right, AXIS_BOTTOM + 52, 'Frequency (Hz)', { size: 15, math: false, anchor: 'end' });

    // Bands, from the text's ranges in section 24.4.
    band(svg, Math.log10(3e11), v1, 175, 'Infrared');
    band(svg, v2, 17, 175, 'Ultraviolet');
    band(svg, 0, 12, 220, 'Radio waves');
    band(svg, 16, 20, 220, 'X rays');
    band(svg, 9, 12, 262, 'Microwaves');
    // Gamma rays have no upper limit: an arrow that trails off into dashes.
    svg.arrow(x(24), 262, x(18), 262, { color: BAND, width: 2.5, head: 12 });
    svg.line(x(24), 262, x(25.8), 262, { color: BAND, width: 2.5, dash: '7 5' });
    svg.text(x(21), 246, '\\it{γ} rays', { size: 15, math: false });

    // Broadcast bands inside the radio region.
    const [am1, am2] = [Math.log10(540e3), Math.log10(1.6e6)];
    svg.rect(x(am1), 300, x(am2) - x(am1), AXIS_BOTTOM - 300, {
      fill: '#ffffff',
      stroke: COLORS.axis,
      width: 1.3,
    });
    svg.line(x(am1), 300, x(am2), 300, { color: BAND, width: 3 });
    svg.text(x(am1) - 30, 262, 'AM radio', { size: 15, math: false });
    svg.leader(x(am1) - 20, 272, (x(am1) + x(am2)) / 2, 297, { bend: 0.2 });

    const [tv1, tv2] = [Math.log10(54e6), Math.log10(890e6)];
    for (const n of [tv1, tv2]) {
      svg.line(x(n), 298, x(n), AXIS_BOTTOM, { color: COLORS.axis, width: 1.2 });
    }
    band(svg, tv1, tv2, 298, 'TV');

    const [fm1, fm2] = [Math.log10(88e6), Math.log10(108e6)];
    svg.rect(x(fm1), 340, x(fm2) - x(fm1), AXIS_BOTTOM - 340, {
      fill: '#ffffff',
      stroke: BAND,
      width: 1.5,
    });
    svg.text(x(7.4), 324, 'FM radio', { size: 15, math: false, anchor: 'end' });
    svg.squiggle(x(7.4) + 4, 324, (x(fm1) + x(fm2)) / 2, 338, { amp: 3, waves: 1 });

    svg.text(x(16) + 30, 318, 'Visible light', { size: 15, math: false, anchor: 'start' });
    svg.squiggle(x(16) + 24, 318, x(v2) + 2, 300, { amp: 4 });

    return svg.render();
  },

  // 29.1 Fig. 1 — blackbody spectra at three temperatures
  Figure_29_01_01: () => {
    const svg = new Svg({
      width: 820,
      height: 600,
      title: 'Blackbody radiation curves',
      desc: 'EM radiation intensity versus wavelength for a blackbody at 6000 K (white hot), 4000 K and 3000 K (red hot), drawn to scale from Planck’s law. The 6000 K curve peaks near 480 nm, inside the visible range; cooler bodies radiate far less, and their peaks move to longer wavelengths: about 720 nm at 4000 K and 970 nm, in the infrared, at 3000 K. Ultraviolet lies to the left of the visible band and infrared to the right.',
    });
    // Planck's law per unit wavelength, in units of the 6000 K peak.
    const planck = (nm, T) => 1 / (nm ** 5 * (Math.exp(1.43877e7 / (nm * T)) - 1));
    const peak = planck(2.8978e6 / 6000, 6000);
    const g = new Plot(svg, {
      x: 110,
      y: 60,
      w: 600,
      h: 380,
      xRange: [0, 3200],
      yRange: [0, 1.08],
      xTicks: [0, 1000, 2000, 3000],
    });
    // The visible band, 380 to 760 nm, as a strip of color behind the curves.
    for (let nm = 380; nm < 760; nm += 5)
      svg.rect(g.X(nm), g.Y(1.08), g.X(nm + 5) - g.X(nm) + 0.4, g.h, { fill: spectral(nm + 2.5) });
    g.axes({ arrows: true, size: 20 });
    for (const T of [6000, 4000, 3000])
      g.fn(nm => planck(nm, T) / peak, 60, 3150, { n: 600, color: COLORS.maroon, width: 3 });
    svg.text(g.X(560) + 0, g.Y(1.08) - 14, 'V', { size: 20, math: false });
    svg.text(g.X(740), g.Y(1.08) - 14, 'R', { size: 20, math: false });
    const tag = (nm, T, s, dx, dy) => {
      const P = g.P(nm, planck(nm, T) / peak);
      svg.text(P[0] + dx, P[1] + dy, s, { size: 20, math: false, anchor: 'start' });
      svg.squiggle(P[0] + dx - 4, P[1] + dy + 6, P[0] + 3, P[1] - 3, { waves: 1, amp: 4 });
    };
    tag(900, 6000, '6000 K (white hot)', 70, -70);
    tag(1100, 4000, '4000 K', 120, -110);
    tag(1500, 3000, '3000 K (red hot)', 100, -90);
    svg.text(g.X(3200) + 30, g.Y(0) + 4, 'λ \\rm{(nm)}', { size: 20, anchor: 'start' });
    svg.text(g.X(0) - 4, g.Y(1.08) - 16, 'I', { size: 22, anchor: 'end' });
    svg.text(46, g.Y(0.54), 'EM radiation intensity', { size: 20, math: false, rotate: -90 });
    // UV and the visible range below the axis.
    svg.text(g.X(200), g.Y(0) + 56, 'UV', { size: 20, math: false });
    svg.line(g.X(250), g.Y(0) + 42, g.X(330), g.Y(0) + 6, { color: COLORS.axis, width: 1.2 });
    svg.arrow(g.X(380), g.Y(0) + 20, g.X(760), g.Y(0) + 20, {
      color: COLORS.axis,
      width: 1.4,
      head: 9,
      start: true,
    });
    svg.text(g.X(560), g.Y(0) + 88, 'Visible', { size: 20, math: false });
    svg.text(g.X(560), g.Y(0) + 112, 'range', { size: 20, math: false });
    svg.line(g.X(560), g.Y(0) + 72, g.X(570), g.Y(0) + 24, { color: COLORS.axis, width: 1.2 });
    svg.text(g.X(2000), g.Y(0) + 56, 'IR', { size: 20, math: false });
    return svg.render();
  },

  // 29.2 Fig. 3 — kinetic energy of photoelectrons versus frequency
  Figure_29_02_03: () => {
    const svg = new Svg({
      width: 820,
      height: 600,
      title: 'The photoelectric effect',
      desc: 'Kinetic energy KE_e of ejected electrons versus the frequency f of the light. No electrons are ejected below the threshold frequency f0 = BE/h; above it, KE_e = hf − BE rises in a straight line whose slope is Planck’s constant h.',
    });
    const g = new Plot(svg, { x: 120, y: 60, w: 620, h: 400, xRange: [0, 4], yRange: [0, 3] });
    g.axes({ arrows: true });
    // KE = h(f − f0) with f0 = 1 in the axis units.
    svg.line(...g.P(1, 0), ...g.P(3.85, 2.85), { color: COLORS.maroon, width: 4 });
    svg.text(g.X(0) - 14, g.Y(0), '0', { size: 26, math: false, anchor: 'end' });
    svg.text(g.X(0), g.Y(0) + 36, '0', { size: 26, math: false });
    svg.text(g.X(4) + 24, g.Y(0) + 4, 'f', { size: 30 });
    svg.text(g.X(0) - 4, g.Y(3) - 22, '\\rm{KE}_e', { size: 30, anchor: 'end' });
    svg.text(g.X(1.8), g.Y(2.4), '\\rm{KE}_e = hf − \\rm{BE}', { size: 30 });
    svg.text(g.X(1) - 6, g.Y(0) + 36, 'f_0 = ', { size: 28, anchor: 'end' });
    svg.text(g.X(1) + 22, g.Y(0) + 22, '\\rm{BE}', { size: 28 });
    svg.line(g.X(1) - 6, g.Y(0) + 38, g.X(1) + 50, g.Y(0) + 38, { color: COLORS.text, width: 1.8 });
    svg.text(g.X(1) + 22, g.Y(0) + 62, 'h', { size: 28 });
    return svg.render();
  },

  // 29.3 Fig. 4 — an x-ray spectrum: bremsstrahlung and characteristic lines
  Figure_29_03_04: () => {
    const svg = new Svg({
      width: 760,
      height: 580,
      title: 'X-ray spectrum',
      desc: 'X-ray intensity versus frequency when energetic electrons strike a molybdenum anode at 26 kV. The smooth bremsstrahlung curve rises, levels off and falls to zero at the maximum frequency fmax, where qV = hfmax. Two sharp peaks, characteristic of the anode, stand above it at about two-thirds and three-quarters of fmax.',
    });
    const g = new Plot(svg, { x: 90, y: 60, w: 600, h: 380, xRange: [0, 1.2], yRange: [0, 1.15] });
    g.axes({ arrows: true });
    // Kramers' law I ∝ (fmax − f), cut down at low frequency by absorption in the anode and
    // tube window, modeled here as a factor f^1.5.
    const brems = f => (f >= 1 ? 0 : 2.6 * (1 - f) * f ** 1.5);
    // Mo Kα (17.5 keV) and Kβ (19.6 keV) lines at 26 kV: 0.672 and 0.754 of fmax.
    const line = (f, c, h) => h * Math.exp(-(((f - c) / 0.0035) ** 2));
    g.fn(f => brems(f) + line(f, 0.672, 0.62) + line(f, 0.754, 0.28), 0.04, 1, {
      n: 1600,
      color: COLORS.maroon,
      width: 3,
    });
    svg.text(g.X(1), g.Y(0) + 30, 'f_{max}', { size: 28 });
    svg.text(g.X(1.2) + 22, g.Y(0) + 4, 'f', { size: 30 });
    svg.text(g.X(0) + 12, g.Y(1.15) - 4, 'I', { size: 30, anchor: 'start' });
    svg.text(42, g.Y(0.55), 'X-ray intensity', { size: 26, math: false, rotate: -90 });
    svg.text(g.X(0.8), g.Y(0) + 80, 'qV = hf_{max}', { size: 28 });
    return svg.render();
  },

  // 29.4 Fig. 2 — the Compton effect
  Figure_29_04_02: () => {
    const svg = new Svg({
      width: 800,
      height: 700,
      title: 'The Compton effect',
      desc: 'A photon of energy E = hf and wavelength λ strikes an electron e− at rest and scatters off at a right angle as a photon of lower energy E′ = hf′ and longer wavelength λ′. The electron recoils with kinetic energy KE_e = E − E′, carrying the momentum the photon lost.',
    });
    // Incoming photon down and to the right; scattered photon up and to the right with 0.8 of its momentum.
    const e = [380, 420];
    const pin = [0.707, 0.707];
    const pout = [0.8 * 0.707, -0.8 * 0.707];
    const recoil = [pin[0] - pout[0], pin[1] - pout[1]];
    const r = Math.hypot(...recoil);
    const u = [recoil[0] / r, recoil[1] / r];
    const before = [e[0] - 210 * pin[0], e[1] - 210 * pin[1]];
    const after = [e[0] + 240 * 0.707, e[1] - 240 * 0.707];
    svg.arrow(
      before[0] + 50 * pin[0],
      before[1] + 50 * pin[1],
      e[0] - 24 * pin[0],
      e[1] - 24 * pin[1],
      {
        color: GO,
        width: 5,
        head: 22,
      }
    );
    // The scattered photon has less energy, so a longer wavelength: fewer cycles in the same packet.
    packet(svg, ...before, 45, 6);
    svg.arrow(e[0] + 40 * 0.707, e[1] - 40 * 0.707, after[0] + 60 * 0.707, after[1] - 60 * 0.707, {
      color: GO,
      width: 5,
      head: 22,
    });
    packet(svg, ...after, -45, 4);
    electron(svg, ...e);
    // After the collision the electron moves off along the recoil direction.
    const moved = [e[0] + 130 * u[0], e[1] + 130 * u[1]];
    electron(svg, ...moved, 1);
    svg.arrow(
      moved[0] + 24 * u[0],
      moved[1] + 24 * u[1],
      moved[0] + 150 * u[0],
      moved[1] + 150 * u[1],
      {
        color: GO,
        width: 5,
        head: 22,
      }
    );
    svg.text(150, 60, 'E = hf', { size: 32 });
    svg.text(before[0] - 80, before[1] + 40, 'λ', { size: 30, anchor: 'end' });
    svg.text(before[0] - 80, before[1] + 78, 'Before', { size: 30, math: false, anchor: 'end' });
    svg.text(e[0] - 30, e[1] + 4, 'Before', { size: 30, math: false, anchor: 'end' });
    svg.text(e[0] + 30, e[1] + 4, 'e^−', { size: 30, anchor: 'start' });
    svg.text(after[0] + 40, after[1] - 140, "E' = hf'", { size: 32 });
    svg.text(after[0] + 90, after[1] + 40, "λ'", { size: 30, anchor: 'start' });
    svg.text(after[0] + 90, after[1] + 78, 'After', { size: 30, math: false, anchor: 'start' });
    svg.text(moved[0] + 50, moved[1] - 4, 'After', { size: 30, math: false, anchor: 'start' });
    svg.text(moved[0] + 50, moved[1] + 50, "\\rm{KE}_e = E − E'", { size: 30, anchor: 'start' });
    return svg.render();
  },

  // 29.7 Fig. 1 — electrons arrive one at a time and build a diffraction pattern
  Figure_29_07_01: () => {
    const svg = new Svg({
      width: 880,
      height: 700,
      title: 'Building up an electron diffraction pattern',
      desc: 'Three records of where electrons strike a screen: after 40, 200 and 2000 electrons. Each electron lands at a single, unpredictable spot, but as more arrive they collect into five bands. Below, the intensity predicted from the de Broglie waves has a maximum at each band.',
    });
    // Five cos² fringes; each electron's position is drawn from that distribution.
    const fringes = 5;
    const I = u => Math.sin(Math.PI * fringes * u) ** 2;
    let seed = 2026;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const [x0, w] = [210, 640];
    [
      [40, 20],
      [200, 160],
      [2000, 300],
    ].forEach(([n, y0]) => {
      svg.rect(x0, y0, w, 120, { stroke: COLORS.black, width: 1.5 });
      for (let k = 0; k < n; k += 1) {
        let u;
        do u = rnd();
        while (rnd() > I(u));
        svg.circle(x0 + 6 + u * (w - 12), y0 + 6 + rnd() * 108, n > 1000 ? 2.4 : 3, {
          fill: COLORS.black,
        });
      }
      svg.text(x0 - 16, y0 + 48, String(n), { size: 22, math: false, anchor: 'end' });
      svg.text(x0 - 16, y0 + 76, 'electrons', { size: 22, math: false, anchor: 'end' });
    });
    const g = new Plot(svg, { x: x0, y: 480, w, h: 170, xRange: [0, 1], yRange: [0, 1.1] });
    svg.arrow(x0, 650, x0, 470, { color: COLORS.black, width: 1.5, head: 10 });
    svg.arrow(x0, 650, x0 + w + 20, 650, { color: COLORS.black, width: 1.5, head: 10 });
    g.fn(I, 0, 1, { n: 400, color: COLORS.maroon, width: 3 });
    svg.text(x0 - 22, 565, 'Intensity', { size: 20, math: false, rotate: -90 });
    return svg.render();
  },

  // 29.8 Fig. 1 — an electron and a photon both have wave properties
  Figure_29_08_01: () => {
    const svg = new Svg({
      width: 640,
      height: 560,
      title: 'Wave properties of an electron and a photon',
      desc: 'Top: an electron e−, a particle with mass, drawn as a sphere containing a wave, moves at speed v. Bottom: a photon, which has no mass, drawn as a wave packet, moves at the speed of light c. Both have wavelengths and both behave as particles.',
    });
    electron(svg, 150, 150, 1.9, true);
    svg.arrow(195, 150, 590, 150, { color: GO, width: 8, head: 34 });
    svg.text(150, 52, 'e^−', { size: 44 });
    svg.text(560, 220, 'v', { size: 44 });
    packet(svg, 160, 420, 0, 9);
    svg.arrow(250, 420, 590, 420, { color: GO, width: 8, head: 34 });
    svg.text(560, 490, 'c', { size: 44 });
    return svg.render();
  },
};
