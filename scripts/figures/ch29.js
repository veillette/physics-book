/**
 * Chapter 29: the electromagnetic spectrum against frequency, wavelength, and
 * photon energy (section 29.3). It replaces a raster original that carried a
 * third-party copyright notice.
 *
 * The frequency axis is logarithmic. Wavelength labels come from λ = c/f and
 * photon-energy labels from E = hf, so the three scales agree by construction.
 */
import { COLORS, Svg } from './svg.js';

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
};
