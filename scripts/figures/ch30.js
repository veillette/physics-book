/**
 * Chapter 30: atomic physics — Rutherford's atom, Bohr's hydrogen atom and its
 * spectrum, x rays, laser energy levels, de Broglie waves on orbits, the
 * ground-state probability cloud, the Zeeman effect, space quantization, and
 * the Pauli exclusion principle.
 *
 * Hydrogen is computed: spectral lines from 1/λ = R(1/n_f² − 1/n_i²) with
 * R = 1.097 × 10⁷ m⁻¹ on a linear wavelength scale, levels at
 * E_n = −13.6 eV/n², and orbit radii r_n = n²a_B. The electron cloud's
 * shading is |ψ|² ∝ e^{−2r/a_B}. Allowed angles between L and the z axis have
 * cos θ = m_ℓ/√(ℓ(ℓ + 1)). Laser levels are drawn to scale from the energies
 * the text gives; the x-ray level diagram uses hydrogen-like spacing.
 */
import ch29 from './ch29.js';
import { COLORS, Svg } from './svg.js';

const LEVEL = '#a5182f';
const ORBIT = '#a5182f';
const WAVE = '#7a3fa0';
const PINK = '#e46a9a';
const ATOM = '#a98ccb';

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 24, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

function caption(svg, x, y, s) {
  svg.text(x, y, s, { size: 20, math: false });
}

const rad = d => (d * Math.PI) / 180;

/** Shaded sphere for an electron (or nucleus), radius r. */
function ball(svg, cx, cy, r, { color = '#c9b6e6', edge = '#7b5fae' } = {}) {
  const id = `ball30_${Math.round(cx)}_${Math.round(cy)}_${r}`;
  svg.add(
    `<defs><radialGradient id="${id}" cx="0.38" cy="0.35" r="0.7"><stop offset="0" stop-color="#ffffff"/><stop offset="0.45" stop-color="${color}"/><stop offset="1" stop-color="${edge}"/></radialGradient></defs>`
  );
  svg.circle(cx, cy, r, { fill: `url(#${id})` });
}

/** An energy-level line from x1 to x2 at height y. */
function level(svg, x1, x2, y, { width = 2.4, color = LEVEL } = {}) {
  svg.line(x1, y, x2, y, { color, width });
}

/** The levels from n = 5 up to the ionization limit, crowding together, shaded from red to pale. */
function continuum(svg, x1, x2, Y, { from = 5 } = {}) {
  for (let n = 40; n >= from; n -= 1) {
    const t = Math.min(1, (n - from) / 10);
    const c = `rgb(${Math.round(165 + 80 * t)},${Math.round(24 + 170 * t)},${Math.round(47 + 140 * t)})`;
    level(svg, x1, x2, Y(n), { width: 1.6, color: c });
  }
}

/** A photon drawn as a wave packet at (cx, cy), tilted by `angle` degrees. */
export function photon(svg, cx, cy, angle = 0, { rx = 40, ry = 16, cycles = 3 } = {}) {
  const pts = [];
  for (let k = 0; k <= 80; k += 1) {
    const t = -1 + (2 * k) / 80;
    pts.push([
      t * rx * 0.8,
      -ry * 0.7 * Math.exp(-((t * 1.5) ** 2)) * Math.sin(Math.PI * cycles * t),
    ]);
  }
  const d = pts.map(([x, y], k) => `${k ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
  svg.add(
    `<g transform="translate(${cx} ${cy}) rotate(${-angle})"><ellipse rx="${rx}" ry="${ry}" fill="#f6cdb4" stroke="#8a3a1c" stroke-width="2"/><path d="${d}" fill="none" stroke="#1d5f8a" stroke-width="3.5"/><path d="${d}" fill="none" stroke="#5ec4ec" stroke-width="1.6"/></g>`
  );
}

/** A spin arrow through an electron at (x, y): up for +1/2, down for −1/2. */
function spinning(svg, x, y, up, r = 11) {
  svg.arrow(x, y + (up ? 22 : -22), x, y + (up ? -24 : 24), {
    color: COLORS.black,
    width: 1.5,
    head: 8,
  });
  ball(svg, x, y, r);
}

/** Wavelength in nm of hydrogen's line from n_i down to n_f. */
const lambda = (nf, ni) => 1e9 / (1.097e7 * (1 / nf ** 2 - 1 / ni ** 2));

export default {
  // 30.2 Fig. 8 — alpha particles among the atoms of the gold foil
  Figure_30_02_08: () => {
    const svg = new Svg({
      width: 640,
      height: 600,
      title: 'Alpha particles passing through gold atoms',
      desc: 'An expanded view of the atoms in a gold foil, drawn as circles about 10^−10 m across with a dot at each center for the nucleus (much larger than scale). Most alpha particles pass straight through; one passing close to a nucleus is deflected, and one striking a nucleus nearly head on bounces back.',
    });
    const R = 48;
    const atoms = [];
    for (let row = 0; row < 5; row += 1)
      for (let col = 0; col < 5; col += 1) {
        const x = 150 + col * 2 * R + (row % 2) * R;
        const y = 130 + row * R * Math.sqrt(3);
        if (Math.hypot(x - 330, y - 300) < 230) atoms.push([x, y]);
      }
    for (const [x, y] of atoms) {
      svg.circle(x, y, R, { fill: ATOM, stroke: '#6f5aa0', width: 1.5 });
      svg.circle(x, y, 4, { fill: '#2f4f6a' });
    }
    // Straight through, midway between two rows of nuclei.
    const gapY = 130 + 1.5 * R * Math.sqrt(3);
    svg.arrow(20, gapY, 610, gapY, { color: COLORS.black, width: 2, head: 16 });
    // Deflected by a near miss.
    const near = atoms.reduce((a, b) =>
      Math.hypot(b[0] - 330, b[1] - 170) < Math.hypot(a[0] - 330, a[1] - 170) ? b : a
    );
    svg.line(20, near[1] - 4, near[0] - 20, near[1] - 4, { color: COLORS.black, width: 2 });
    svg.arrow(near[0] - 20, near[1] - 4, near[0] + 230, near[1] + 150, {
      color: COLORS.black,
      width: 2,
      head: 16,
    });
    // Backscattered from a nearly head-on collision.
    const hit = atoms.reduce((a, b) =>
      Math.hypot(b[0] - 200, b[1] - 440) < Math.hypot(a[0] - 200, a[1] - 440) ? b : a
    );
    svg.line(40, hit[1], hit[0], hit[1], { color: COLORS.black, width: 2 });
    svg.arrow(hit[0], hit[1], hit[0] - 120, hit[1] + 70, {
      color: COLORS.black,
      width: 2,
      head: 16,
    });
    // Size of one atom.
    const top = atoms.reduce((a, b) => (b[1] < a[1] ? b : a));
    svg.arrow(top[0] - R + 1, 50, top[0] + R - 1, 50, {
      color: COLORS.black,
      width: 1.8,
      head: 12,
      start: true,
    });
    for (const x of [top[0] - R, top[0] + R])
      svg.line(x, 36, x, top[1], { color: COLORS.black, width: 1.4 });
    lab(svg, top[0], 22, '10^{−10} \\rm{m}', { size: 26 });
    return svg.render();
  },

  // 30.2 Fig. 9 — Rutherford's planetary atom
  Figure_30_02_09: () => {
    const svg = new Svg({
      width: 640,
      height: 290,
      title: 'Rutherford’s planetary model of the atom',
      desc: 'Electrons e− circle a small, positive nucleus in orbits much larger than the nucleus, like planets around the Sun. Most of the atom is empty space.',
    });
    const [cx, cy] = [320, 140];
    for (const [rx, ry] of [
      [180, 72],
      [240, 104],
      [300, 134],
    ])
      svg.ellipse(cx, cy, rx, ry, { stroke: COLORS.black, width: 2 });
    ball(svg, cx + 10, cy, 7, { color: '#9cc3e6', edge: '#2f5f8a' });
    svg.text(cx - 10, cy + 1, '+', { size: 26, math: false });
    for (const [rx, ry, a, dir] of [
      [180, 72, 75, -1],
      [240, 104, 250, 1],
      [300, 134, 70, -1],
    ]) {
      const P = [cx + rx * Math.cos(rad(a)), cy + ry * Math.sin(rad(a))];
      const T = [-rx * Math.sin(rad(a)) * dir, ry * Math.cos(rad(a)) * dir];
      const L = Math.hypot(...T);
      svg.arrow(
        P[0] + (T[0] / L) * 20,
        P[1] + (T[1] / L) * 20,
        P[0] + (T[0] / L) * 60,
        P[1] + (T[1] / L) * 60,
        {
          color: COLORS.black,
          width: 2,
          head: 12,
        }
      );
      ball(svg, ...P, 13);
      lab(svg, P[0], P[1] + 1, 'e^−', { size: 20, halo: false });
    }
    return svg.render();
  },

  // 30.3 Fig. 3 — the Lyman, Balmer and Paschen series
  Figure_30_03_03: () => {
    const svg = new Svg({
      width: 1000,
      height: 340,
      title: 'The hydrogen spectrum',
      desc: 'Hydrogen’s spectral lines on a linear wavelength scale from 0 to about 1900 nm. The Lyman series (n_f = 1) lies between 91 and 122 nm in the ultraviolet. The Balmer series (n_f = 2) runs from 365 to 656 nm, with its longest line, from n_i = 3, at 656 nm. The Paschen series (n_f = 3) runs from 820 nm to 1875 nm, its longest line coming from n_i = 4. Each series crowds together toward its short-wavelength limit.',
    });
    const X = nm => 18 + nm * 0.5;
    const [top, bot] = [140, 230];
    svg.line(10, top, 990, top, { color: COLORS.axis, width: 1.4 });
    svg.line(10, bot, 990, bot, { color: COLORS.axis, width: 1.4 });
    svg.line(20, 50, 400, 50, { color: COLORS.axis, width: 1.4 });
    svg.arrow(590, 50, 980, 50, { color: COLORS.axis, width: 1.4, head: 10 });
    note(svg, 495, 50, 'Wavelength, \\it{λ}', { size: 22 });
    for (const nf of [1, 2, 3]) {
      for (let ni = nf + 1; ni <= nf + 40; ni += 1)
        svg.line(X(lambda(nf, ni)), top, X(lambda(nf, ni)), bot, {
          color: PINK,
          width: ni > nf + 8 ? 0.8 : 1.6,
        });
      svg.line(X(lambda(nf, 1e6)), top, X(lambda(nf, 1e6)), bot, { color: PINK, width: 1.6 });
    }
    // Wavelength labels at the series limits and longest lines.
    for (const [nm, dx] of [
      [lambda(1, 1e6), -10],
      [lambda(1, 2), 10],
      [lambda(2, 1e6), 0],
      [lambda(2, 3), 0],
      [lambda(3, 1e6), 0],
      [lambda(3, 4), 0],
    ])
      svg.text(X(nm) + dx, top - 8, `${Math.round(nm)} nm`, {
        size: 18,
        math: false,
        rotate: -90,
        anchor: 'start',
      });
    for (const [nf, ni] of [
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 4],
      [3, 5],
      [3, 6],
    ]) {
      const x = X(lambda(nf, ni));
      const last = nf === 3 && ni === 4;
      const lx = x + (ni === nf + 1 ? (last ? -34 : 34) : 0);
      svg.text(lx, top - 14, `n_i = ${ni}`, { size: 16, anchor: last ? 'end' : 'start' });
      if (ni === nf + 1) svg.squiggle(lx - 2, top - 8, x + 1, top + 14, { waves: 1, amp: 3 });
    }
    const brace = (x1, x2) =>
      svg.path(
        `M ${x1} ${bot + 6} Q ${x1} ${bot + 14} ${x1 + 8} ${bot + 14} L ${(x1 + x2) / 2 - 6} ${bot + 14} Q ${(x1 + x2) / 2} ${bot + 14} ${(x1 + x2) / 2} ${bot + 22} Q ${(x1 + x2) / 2} ${bot + 14} ${(x1 + x2) / 2 + 6} ${bot + 14} L ${x2 - 8} ${bot + 14} Q ${x2} ${bot + 14} ${x2} ${bot + 6}`,
        {
          color: COLORS.axis,
          width: 1.4,
        }
      );
    brace(X(lambda(1, 1e6)) - 4, X(lambda(1, 2)) + 4);
    brace(X(lambda(2, 1e6)), X(lambda(2, 3)));
    brace(X(lambda(3, 1e6)), X(lambda(3, 4)));
    note(svg, X(106), bot + 40, 'Lyman', { size: 18 });
    note(svg, X(106), bot + 60, 'series', { size: 18 });
    svg.text(X(106), bot + 82, 'n_f = 1', { size: 18 });
    note(svg, X(510), bot + 40, 'Balmer series', { size: 18 });
    svg.text(X(510), bot + 62, 'n_f = 2', { size: 18 });
    note(svg, X(1350), bot + 40, 'Paschen series', { size: 18 });
    svg.text(X(1350), bot + 62, 'n_f = 3', { size: 18 });
    return svg.render();
  },

  // 30.3 Fig. 4 — quantized orbits and the photon an electron emits
  Figure_30_03_04: () => {
    const svg = new Svg({
      width: 760,
      height: 760,
      title: 'Bohr’s quantized orbits',
      desc: 'Allowed electron orbits around a nucleus, with radii in proportion to n² for n = 1 to 5. An electron dropping from orbit E4 to E2, or from an outer orbit Ei to the innermost orbit Ef, gives up the difference in energy as a photon of frequency f, with ΔE = Ei − Ef = hf.',
    });
    const [cx, cy] = [370, 400];
    const r = n => 13 * n * n;
    for (let n = 1; n <= 5; n += 1)
      svg.circle(cx, cy, r(n), { fill: 'none', stroke: ORBIT, width: 3 });
    ball(svg, cx, cy, 6, { color: '#9cc3e6', edge: '#2f5f8a' });
    const at = (n, a) => [cx + r(n) * Math.cos(rad(a)), cy - r(n) * Math.sin(rad(a))];
    // E4 → E2, and Ei (n = 5) → Ef (n = 1).
    const A4 = at(4, 100);
    const A2 = at(2, 100);
    svg.arrow(...A4, A2[0], A2[1] - 2, { color: COLORS.black, width: 1.8, head: 12 });
    const Ai = at(5, 55);
    const Af = at(1, 55);
    svg.arrow(...Ai, ...Af, { color: COLORS.black, width: 1.8, head: 12 });
    lab(svg, A4[0] - 4, A4[1] - 22, 'E_4');
    lab(svg, A2[0] - 30, A2[1] + 6, 'E_2');
    lab(svg, Ai[0] + 8, Ai[1] - 22, 'E_i');
    lab(svg, cx + 34, cy + 6, 'E_f');
    photon(svg, cx + r(4) + 40, cy, 0);
    svg.arrow(cx + r(4) + 84, cy, cx + r(5) + 70, cy, { color: COLORS.black, width: 2, head: 14 });
    lab(svg, cx + r(4) + 40, cy + 40, 'f');
    lab(svg, 380, 34, 'ΔE = E_i − E_f = hf', { size: 28 });
    return svg.render();
  },

  // 30.3 Fig. 5 — hydrogen's energy-level diagram
  Figure_30_03_05: () => {
    const svg = new Svg({
      width: 640,
      height: 720,
      title: 'Energy-level diagram for hydrogen',
      desc: 'The energy levels of hydrogen’s electron, E_n = −13.6 eV/n², drawn to scale, with energy increasing upward. The levels crowd together toward n = ∞ at the top. An arrow shows the electron dropping from n = 4 to n = 2.',
    });
    const Y = n => 690 - 610 * (1 - 1 / (n * n));
    svg.arrow(80, 700, 80, 30, { color: COLORS.black, width: 1.6, head: 12 });
    lab(svg, 66, 30, 'E', { anchor: 'end' });
    for (let n = 1; n <= 4; n += 1) level(svg, 80, 520, Y(n));
    continuum(svg, 80, 520, Y);
    // Levels 4, 5 and ∞ are closer together than a line of text, so their labels
    // are spread apart and tied to their levels by short leaders.
    for (const [n, s, dy] of [
      [1, 'n = 1', 0],
      [2, 'n = 2', 0],
      [3, 'n = 3', 0],
      [4, 'n = 4', 2],
      [5, 'n = 5', -9],
      [1e6, 'n = ∞', -30],
    ]) {
      if (dy) svg.line(522, Y(n), 546, Y(n) + dy, { color: COLORS.guide, width: 1 });
      lab(svg, dy ? 550 : 540, Y(n) + dy, s, { anchor: 'start', size: 22 });
    }
    svg.arrow(260, Y(4), 260, Y(2), { color: COLORS.black, width: 1.6, head: 12 });
    lab(svg, 276, (Y(4) + Y(2)) / 2, 'E_4 → E_2', { anchor: 'start', size: 22 });
    return svg.render();
  },

  // 30.3 Fig. 6 — the allowed orbits, to scale
  Figure_30_03_06: () => {
    const svg = new Svg({
      width: 760,
      height: 760,
      title: 'Allowed electron orbits in hydrogen',
      desc: 'The first four allowed orbits of hydrogen’s electron, drawn to scale: their radii r1, r2, r3 and r4 grow as n², in the ratio 1 : 4 : 9 : 16.',
    });
    const [cx, cy] = [380, 380];
    const r = n => 22 * n * n;
    for (let n = 1; n <= 4; n += 1)
      svg.circle(cx, cy, r(n), { fill: 'none', stroke: ORBIT, width: 3.5 });
    for (const [n, a] of [
      [1, 120],
      [2, 0],
      [3, -60],
      [4, -110],
    ]) {
      const P = [cx + r(n) * Math.cos(rad(a)), cy - r(n) * Math.sin(rad(a))];
      svg.arrow(cx, cy, ...P, { color: COLORS.black, width: 1.8, head: n === 1 ? 8 : 13 });
      const L = [cx + (r(n) + 22) * Math.cos(rad(a)), cy - (r(n) + 22) * Math.sin(rad(a))];
      lab(svg, ...L, `r_${n}`, { size: 26 });
    }
    return svg.render();
  },

  // 30.3 Fig. 7 — hydrogen's levels with the three series
  Figure_30_03_07: () => {
    const svg = new Svg({
      width: 560,
      height: 860,
      title: 'Hydrogen energy levels and spectral series',
      desc: 'Hydrogen’s energy levels drawn to scale: −13.6 eV for n = 1, −3.40 eV for n = 2, −1.51 eV for n = 3, −0.85 eV for n = 4, −0.54 eV for n = 5, up to 0 for n = ∞. Downward arrows show transitions ending on n = 1 (the Lyman series), on n = 2 (the Balmer series) and on n = 3 (the Paschen series).',
    });
    const Y = n => 820 - 780 * (1 - 1 / (n * n));
    const [x1, x2] = [130, 430];
    svg.arrow(x1, 840, x1, 18, { color: COLORS.black, width: 1.6, head: 10 });
    lab(svg, x1 - 12, 22, 'E', { anchor: 'end', size: 20 });
    for (let n = 1; n <= 4; n += 1) level(svg, x1, x2, Y(n), { width: 1.8 });
    continuum(svg, x1, x2, Y);
    for (const n of [1, 2, 3, 4, 5]) {
      const E = -13.6 / (n * n);
      svg.text(
        x1 - 6,
        Y(n) + (n === 5 ? -6 : 0),
        `${E.toFixed(2)
          .replace('-', '−')
          .replace(/^−13\.60/, '−13.6')} eV`,
        {
          size: 16,
          math: false,
          anchor: 'end',
        }
      );
      svg.text(x2 + 10, Y(n) + (n === 5 ? -6 : 0), `n = ${n}`, { size: 16, anchor: 'start' });
    }
    svg.text(x1 - 6, Y(1e6) - 4, '0', { size: 16, math: false, anchor: 'end' });
    svg.text(x2 + 10, Y(1e6) - 10, 'n = ∞', { size: 16, anchor: 'start' });
    const series = (nf, x0, name, dy) => {
      for (let k = 0; k < 5; k += 1) {
        const ni = nf + 1 + k;
        const x = x0 + k * 7;
        svg.arrow(x, Y(ni), x, Y(nf), { color: COLORS.black, width: 1.1, head: 7 });
      }
      note(svg, x0 + 14, Y(nf) + dy, name, { size: 16 });
    };
    series(1, 160, 'Lyman series', 18);
    series(2, 260, 'Balmer series', 20);
    series(3, 360, 'Paschen series', 18);
    return svg.render();
  },

  // 30.4 Fig. 1 — the same x-ray spectrum as 29.3 Fig. 4
  Figure_30_04_01: ch29.Figure_29_03_04,

  // 30.4 Fig. 2 — characteristic x rays: K and L lines
  Figure_30_04_02: () => {
    const svg = new Svg({
      width: 760,
      height: 720,
      title: 'Characteristic x-ray transitions',
      desc: 'Inner-shell energy levels of a heavy atom: K (n = 1) at the bottom, then L (n = 2), M (n = 3), N (n = 4) and higher levels crowding together. An electron dropping from L to a vacancy in K emits a Kα x ray; from M to K, a Kβ x ray. Drops from M and N to a vacancy in L give Lα and Lβ x rays.',
    });
    const Y = n => 690 - 640 * (1 - 1 / (n * n));
    const [x1, x2] = [60, 600];
    for (let n = 1; n <= 3; n += 1) level(svg, x1, x2, Y(n), { width: 3 });
    continuum(svg, x1, x2, Y, { from: 4 });
    for (const [n, s] of [
      [1, 'K  n = 1'],
      [2, 'L  n = 2'],
      [3, 'M  n = 3'],
      [4, 'N  n = 4'],
    ])
      lab(svg, x2 + 20, Y(n), s, { anchor: 'start', size: 26 });
    const drop = (x, from, to, s) => {
      svg.arrow(x, Y(from), x, Y(to), { color: COLORS.black, width: 3, head: 22 });
      lab(svg, x - 14, (Y(from) + Y(to)) / 2 - (to === 1 && from === 3 ? 120 : 0), s, {
        anchor: 'end',
        size: 26,
      });
    };
    drop(200, 2, 1, 'K_α');
    drop(280, 3, 1, 'K_β');
    drop(390, 3, 2, 'L_α');
    drop(470, 4, 2, 'L_β');
    return svg.render();
  },

  // 30.5 Fig. 9 — helium and neon levels in a He-Ne laser
  Figure_30_05_09: () => {
    const svg = new Svg({
      width: 800,
      height: 420,
      title: 'Energy levels in a helium-neon laser',
      desc: 'Helium’s first excited state is 20.61 eV above its ground state, and neon’s metastable state is 20.66 eV above its ground state, drawn to scale. A collision transfers energy from excited helium to neon, putting neon in its metastable state. Neon then drops 1.96 eV to a lower level, emitting laser light, before returning to its ground state.',
    });
    // 13 px per eV above the ground state at y = 330.
    // 12.5 px per eV, with the ground states at y = 370.
    const E = e => 370 - 12.5 * e;
    level(svg, 150, 330, E(0));
    level(svg, 150, 330, E(20.61));
    level(svg, 400, 580, E(0));
    level(svg, 400, 580, E(20.66));
    level(svg, 400, 580, E(18.7));
    svg.arrow(190, E(0), 190, E(20.61) + 1, { color: COLORS.black, width: 2, head: 13 });
    note(svg, 196, E(10), '20.61 eV', { anchor: 'start', size: 18 });
    svg.arrow(430, E(0), 430, E(20.66) + 1, {
      color: COLORS.black,
      width: 1.4,
      head: 10,
      start: true,
    });
    note(svg, 436, E(10), '20.66 eV', { anchor: 'start', size: 18 });
    svg.arrow(540, E(20.66), 540, E(18.7), { color: COLORS.black, width: 2, head: 12 });
    note(svg, 532, (E(20.66) + E(18.7)) / 2, '1.96 eV', { anchor: 'end', size: 18 });
    svg.arrow(560, E(18.7), 560, E(0) - 1, { color: COLORS.black, width: 1.6, head: 12 });
    note(svg, 140, E(20.61), 'First', { anchor: 'end', size: 18 });
    note(svg, 140, E(0), 'Ground state', { anchor: 'end', size: 18 });
    note(svg, 590, E(20.66), 'Metastable', { anchor: 'start', size: 18 });
    note(svg, 240, E(0) + 22, 'Helium', { size: 18 });
    note(svg, 490, E(0) + 22, 'Neon', { size: 18 });
    svg.path(`M 300 ${E(21.5)} Q 360 ${E(25.5)} 420 ${E(21.5)}`, { color: '#666666', width: 4 });
    svg.arrow(406, E(22.2), 422, E(21.2), { color: '#666666', width: 4, head: 16 });
    note(svg, 360, E(25.8) - 8, 'Collision transfers energy', { size: 18 });
    return svg.render();
  },

  // 30.5 Fig. 16 — ruby laser levels
  Figure_30_05_16: () => {
    const svg = new Svg({
      width: 640,
      height: 520,
      title: 'Energy levels of a ruby laser',
      desc: 'Energy levels of chromium ions in an aluminum oxide crystal (ruby), drawn to scale: the ground state at 0.0 eV, a metastable first excited state at 1.79 eV, a second at 2.3 eV and a third at 3.0 eV.',
    });
    const E = e => 440 - 130 * e;
    for (const [e, left, right, sub] of [
      [0, 'Ground state', '0.0 eV'],
      [1.79, 'First', 'Metastable', '1.79 eV'],
      [2.3, 'Second', '2.3 eV'],
      [3.0, 'Third', '3.0 eV'],
    ]) {
      level(svg, 180, 460, E(e), { width: 2.6 });
      note(svg, 170, E(e), left, { anchor: 'end', size: 24 });
      note(svg, 470, E(e), right, { anchor: 'start', size: 24 });
      if (sub) note(svg, 470, E(e) + 30, sub, { anchor: 'start', size: 24 });
    }
    note(svg, 320, 480, 'Ruby (Cr^{3+} in Al_2O_3 crystal)', { size: 24 });
    return svg.render();
  },

  // 30.5 Fig. 17 — neodymium glass laser levels
  Figure_30_05_17: () => {
    const svg = new Svg({
      width: 640,
      height: 520,
      title: 'Energy levels of a neodymium glass laser',
      desc: 'Energy levels of neodymium ions in glass, drawn to scale: the ground state at 0 eV, a first state at 0.50 eV, a metastable second state at 1.67 eV and a group of levels near 2.1 eV. Atoms pumped into the group drop to the metastable state, then emit 1.17 eV photons (1.06 μm) as they drop to the first state.',
    });
    const E = e => 470 - 210 * e;
    const [x1, x2] = [180, 440];
    for (const e of [0, 0.5, 1.67]) level(svg, x1, x2, E(e), { width: 2.6 });
    for (const d of [-8, 0, 8]) level(svg, x1, x2, E(2.1) + d, { width: 2.2 });
    for (const [e, left, right] of [
      [0, '0 eV', 'Ground state'],
      [0.5, '0.50 eV', 'First'],
      [1.67, '1.67 eV', 'Metastable'],
      [2.1, '2.1 eV', 'Group'],
    ]) {
      note(svg, x1 - 12, E(e), left, { anchor: 'end', size: 24 });
      note(svg, x2 + 12, E(e), right, { anchor: 'start', size: 24 });
    }
    note(svg, x2 + 12, E(1.67) + 30, 'second', { anchor: 'start', size: 24 });
    svg.arrow(250, E(1.67), 250, E(0.5), { color: COLORS.black, width: 4, head: 24 });
    note(svg, 266, (E(1.67) + E(0.5)) / 2 - 60, '1.17 eV (1.06 μm)', { anchor: 'start', size: 24 });
    return svg.render();
  },

  // 30.6 Fig. 0 — standing waves on a string and on orbits
  Figure_30_06_00: () => {
    const svg = new Svg({
      width: 1000,
      height: 500,
      title: 'Electron waves on orbits',
      desc: '(a) Standing waves on a string fixed at both ends. (b) An allowed orbit: the electron’s wave fits a whole number of wavelengths around the circumference, 2πr = nλ, and joins itself smoothly (constructive interference). (c) A forbidden orbit: the circumference is not a whole number of wavelengths, 2πr′ ≠ nλ′, so the wave does not join up and cancels itself (destructive interference).',
    });
    // (a) Six loops between two walls.
    const [ax1, ax2, ay] = [40, 820, 90];
    for (const x of [ax1 - 18, ax2]) svg.rect(x, ay - 50, 18, 100, { fill: '#555555' });
    for (const A of [34, 18, -18, -34]) {
      const pts = [];
      for (let k = 0; k <= 300; k += 1) {
        const t = k / 300;
        pts.push([ax1 + t * (ax2 - ax1), ay - A * Math.sin(6 * Math.PI * t)]);
      }
      svg.polyline(pts, { color: WAVE, width: 1.6 });
    }
    caption(svg, 430, 160, '(a)');
    const orbit = (cx, cy, r, k, turns, cap, title, eq) => {
      svg.circle(cx, cy, r, { fill: 'none', stroke: COLORS.black, width: 2 });
      const pts = [];
      for (let i = 0; i <= 600 * turns; i += 1) {
        const t = (2 * Math.PI * i) / 600;
        const rr = r + 14 * Math.sin(k * t);
        pts.push([cx + rr * Math.cos(t), cy - rr * Math.sin(t)]);
      }
      svg.polyline(pts, { color: WAVE, width: 2 });
      svg.circle(cx, cy, 4, { fill: COLORS.black });
      svg.line(cx, cy, cx + r * 0.7, cy - r * 0.7, {
        color: COLORS.black,
        width: 1.2,
        dash: '5 4',
      });
      lab(svg, cx + r * 0.42, cy - r * 0.2, cap === '(b)' ? 'r' : "r'", { size: 22 });
      note(svg, cx + r + 30, cy - r + 10, title[0], { anchor: 'start', size: 18 });
      note(svg, cx + r + 30, cy - r + 32, title[1], { anchor: 'start', size: 18 });
      lab(svg, cx + r + 40, cy + 10, eq, { anchor: 'start', size: 20 });
      svg.text(cx + r + 40, cy + 36, 'n = \\rm{integer}', { size: 20, anchor: 'start' });
      caption(svg, cx, 480, cap);
    };
    // Allowed: exactly 4 wavelengths around. Forbidden: 4.6, traced twice so the mismatch shows.
    orbit(170, 330, 100, 4, 1, '(b)', ['Allowed orbit,', 'constructive interference'], '2πr = nλ');
    orbit(
      640,
      330,
      110,
      4.6,
      2,
      '(c)',
      ['Forbidden orbit,', 'destructive interference'],
      "2πr' ≠ nλ'"
    );
    return svg.render();
  },

  // 30.6 Fig. 1 — three and four wavelengths around the third and fourth orbits
  Figure_30_06_01: () => {
    const svg = new Svg({
      width: 640,
      height: 680,
      title: 'Standing electron waves on the third and fourth orbits',
      desc: 'The third and fourth allowed orbits, with radii r3 and r4 in the ratio 9 : 16, shown as dashed circles. The electron’s wave fits exactly three wavelengths, λ3, around the third orbit and four, λ4, around the fourth.',
    });
    const [cx, cy] = [320, 350];
    const R = n => 15.5 * n * n;
    for (const n of [3, 4]) {
      svg.add(
        `<circle cx="${cx}" cy="${cy}" r="${R(n)}" fill="none" stroke="${COLORS.black}" stroke-width="1.6" stroke-dasharray="7 5"/>`
      );
      const pts = [];
      for (let i = 0; i <= 720; i += 1) {
        const t = (2 * Math.PI * i) / 720;
        const rr = R(n) + 22 * Math.cos(n * t + (n === 3 ? Math.PI / 2 : 0));
        pts.push([cx + rr * Math.cos(t), cy - rr * Math.sin(t)]);
      }
      svg.polyline(pts, { color: WAVE, width: 3.5 });
    }
    svg.circle(cx, cy, 5, { fill: '#2f4f6a' });
    svg.arrow(cx, cy, cx + R(3) * Math.cos(rad(60)), cy - R(3) * Math.sin(rad(60)), {
      color: COLORS.black,
      width: 2,
      head: 13,
    });
    lab(svg, cx + 40, cy - 70, 'r_3', { size: 28 });
    svg.arrow(cx, cy, cx + R(4) - 2, cy, { color: COLORS.black, width: 2, head: 13 });
    lab(svg, cx + R(4) - 40, cy - 22, 'r_4', { size: 28 });
    // One wavelength marked on each orbit.
    const arcLabel = (n, a1, a2, s, out) => {
      const r = R(n) + out;
      svg.arc(cx, cy, r, a1, a2, { color: COLORS.black, width: 2 });
      for (const a of [a1, a2])
        svg.line(
          cx + (r - 14) * Math.cos(rad(a)),
          cy - (r - 14) * Math.sin(rad(a)),
          cx + (r + 14) * Math.cos(rad(a)),
          cy - (r + 14) * Math.sin(rad(a)),
          {
            color: COLORS.black,
            width: 1.6,
          }
        );
      const m = rad((a1 + a2) / 2);
      lab(svg, cx + (r + 22) * Math.cos(m), cy - (r + 22) * Math.sin(m), s, { size: 28 });
    };
    arcLabel(4, 45, 135, 'λ_4', 46);
    arcLabel(3, 210, 330, 'λ_3', 54);
    return svg.render();
  },

  // 30.6 Fig. 2 — hydrogen's ground-state probability cloud
  Figure_30_06_02: () => {
    const svg = new Svg({
      width: 760,
      height: 600,
      title: 'Probability cloud of hydrogen’s ground state',
      desc: 'The electron cloud of hydrogen in its ground state (n = 1, ℓ = 0, mℓ = 0), shaded in proportion to the probability density |ψ|², which falls off as e^{−2r/aB} from the nucleus at the center. A dashed circle marks the Bohr radius r1 = aB, the most probable distance of the electron from the nucleus; the electron can be closer or farther, but is very unlikely to be far away.',
    });
    const [cx, cy, aB] = [560, 300, 80];
    const stops = [];
    for (let k = 0; k <= 30; k += 1) {
      const r = (k / 30) * 2.4;
      stops.push(
        `<stop offset="${(r / 2.4).toFixed(3)}" stop-color="#f26b3a" stop-opacity="${Math.exp(-2 * r).toFixed(3)}"/>`
      );
    }
    svg.add(
      `<defs><radialGradient id="cloud30" cx="0.5" cy="0.5" r="0.5">${stops.join('')}</radialGradient></defs>`
    );
    svg.circle(cx, cy, 2.4 * aB, { fill: 'url(#cloud30)' });
    svg.line(cx, cy, cx, 40, { color: COLORS.black, width: 1.6 });
    svg.line(cx, cy, 740, cy, { color: COLORS.black, width: 1.6 });
    svg.line(cx, cy, cx - 170, cy + 170, { color: COLORS.black, width: 1.6 });
    svg.add(
      `<circle cx="${cx}" cy="${cy}" r="${aB}" fill="none" stroke="${COLORS.black}" stroke-width="1.6" stroke-dasharray="6 5"/>`
    );
    ball(svg, cx, cy, 9, { color: '#9cc3e6', edge: '#2f5f8a' });
    svg.arrow(cx, cy, cx - aB * 0.7, cy - aB * 0.7, { color: COLORS.black, width: 2, head: 12 });
    note(svg, 640, 50, 'Nucleus', { size: 26 });
    svg.squiggle(640, 66, cx + 6, cy - 10, { waves: 1.5, amp: 6 });
    lab(svg, 200, 210, 'r_1 = a_B', { size: 28 });
    svg.lines(200, 250, ['Most probable', 'distance for', 'the electron'], {
      size: 28,
      math: false,
    });
    svg.squiggle(310, 220, cx - aB * 0.55, cy - aB * 0.4, { waves: 1.5, amp: 6 });
    svg.lines(720, 500, ['n = 1', 'ℓ = 0', 'm_ℓ = 0'], { size: 28, anchor: 'end' });
    return svg.render();
  },

  // 30.7 Fig. 0 — the Zeeman effect
  Figure_30_07_00: () => {
    const svg = new Svg({
      width: 760,
      height: 520,
      title: 'The Zeeman effect',
      desc: 'Two spectral lines (a) with no external magnetic field, (b) in a magnetic field, where the left line splits into three and the right line into five, and (c) in a large field, where the split lines are farther apart. The splitting grows in proportion to the field.',
    });
    const rows = [
      [40, 0, '(a)', 'B_{ext} = 0'],
      [220, 1, '(b)', 'B_{ext} ≠ 0'],
      [400, 2.2, '(c)', '\\rm{Large} B_{ext}'],
    ];
    for (const [y, B, cap, s] of rows) {
      svg.line(70, y, 620, y, { color: COLORS.black, width: 1.6 });
      svg.line(70, y + 110, 620, y + 110, { color: COLORS.black, width: 1.6 });
      for (const [x, n] of [
        [165, 3],
        [520, 5],
      ])
        for (let m = -(n - 1) / 2; m <= (n - 1) / 2; m += 1)
          svg.line(x + m * 6 * B, y, x + m * 6 * B, y + 110, { color: '#d81b60', width: 2.5 });
      caption(svg, 30, y + 55, cap);
      lab(svg, 640, y + 55, s, { anchor: 'start', size: 26 });
    }
    for (const x of [165, 520]) {
      svg.line(x, 150, x, 220, { color: COLORS.black, width: 1.4, dash: '6 5' });
      svg.line(x, 330, x, 400, { color: COLORS.black, width: 1.4, dash: '6 5' });
    }
    return svg.render();
  },

  // 30.7 Fig. 1 — an orbiting electron's angular momentum and magnetic field
  Figure_30_07_01: () => {
    const svg = new Svg({
      width: 680,
      height: 700,
      title: 'Orbital angular momentum and magnetic field',
      desc: 'An electron e− circles a nucleus in an orbit of radius r, drawn in perspective. As a current loop it produces a magnetic field B_orb along its axis. B_orb points along the same line as the orbital angular momentum L_orb but in the opposite direction, because the electron’s charge is negative.',
    });
    const C = [300, 330];
    const tilt = -16;
    svg.add(
      `<ellipse cx="${C[0]}" cy="${C[1]}" rx="270" ry="80" transform="rotate(${tilt} ${C[0]} ${C[1]})" fill="none" stroke="${COLORS.black}" stroke-width="2.5"/>`
    );
    // The axis is perpendicular to the orbit's plane, leaning with the tilt.
    const u = [Math.sin(rad(-tilt)) * 0.9, -Math.cos(rad(-tilt))];
    svg.arrow(...C, C[0] + 280 * u[0], C[1] + 280 * u[1], { color: '#f08ab0', width: 5, head: 30 });
    svg.arrow(...C, C[0] - 300 * u[0], C[1] - 300 * u[1], { color: '#d81b60', width: 5, head: 30 });
    const E = [
      C[0] + 230 * Math.cos(rad(tilt + 4)),
      C[1] + 230 * Math.sin(rad(tilt + 4)) * 0.3 - 4,
    ];
    svg.arrow(...C, E[0] - 20, E[1], { color: COLORS.black, width: 2, head: 14 });
    svg.circle(...C, 7, { fill: COLORS.black });
    svg.arrow(E[0] + 18, E[1] - 6, E[0] + 110, E[1] - 54, { color: '#4caf2a', width: 3, head: 16 });
    ball(svg, ...E, 18);
    lab(svg, E[0], E[1] + 1, 'e^−', { size: 22, halo: false });
    lab(svg, (C[0] + E[0]) / 2 + 10, E[1] - 26, 'r', { size: 30 });
    lab(svg, C[0] + 280 * u[0] + 40, C[1] + 280 * u[1] + 10, '**L**_{orb}', { size: 32 });
    lab(svg, C[0] - 300 * u[0] + 56, C[1] - 300 * u[1] - 16, '**B**_{orb}', { size: 32 });
    return svg.render();
  },

  // 30.7 Fig. 2 — the allowed angles of L for ℓ = 2
  Figure_30_07_02: () => {
    const svg = new Svg({
      width: 420,
      height: 760,
      title: 'Allowed directions of orbital angular momentum',
      desc: 'An external magnetic field B_ext lies along the z axis. The orbital angular momentum L_orb, of magnitude √6 ħ for ℓ = 2, can point only at angles whose cosines are mℓ/√6 for mℓ = 2, 1, 0, −1 and −2: about 35°, 66°, 90°, 114° and 145° from the field.',
    });
    const O = [70, 400];
    svg.arrow(O[0], 740, O[0], 30, { color: COLORS.black, width: 2, head: 14 });
    svg.text(O[0] - 4, 22, '**B**_{ext}', { size: 22, anchor: 'start' });
    svg.text(O[0] + 6, 52, '(\\it{z}-axis)', { size: 20, math: false, anchor: 'start' });
    const L = 300;
    for (const m of [2, 1, 0, -1, -2]) {
      const th = Math.acos(m / Math.sqrt(6));
      svg.arrow(...O, O[0] + L * Math.sin(th), O[1] - L * Math.cos(th), {
        color: '#f08ab0',
        width: 2.5,
        head: 18,
      });
    }
    const th2 = Math.acos(2 / Math.sqrt(6));
    lab(svg, O[0] + L * Math.sin(th2) - 10, O[1] - L * Math.cos(th2) + 40, '**L**_{orb}', {
      size: 24,
      anchor: 'start',
    });
    return svg.render();
  },

  // 30.7 Fig. 3 — fine structure: lines are doublets
  Figure_30_07_03: () => {
    const svg = new Svg({
      width: 640,
      height: 580,
      title: 'Fine structure',
      desc: 'Two spectral lines that look single at ordinary resolution are each revealed, under magnification, to be a close pair of lines: a doublet. The splitting comes from the interaction of the electron’s intrinsic magnetic field with its orbital magnetic field.',
    });
    svg.line(40, 30, 600, 30, { color: COLORS.black, width: 2 });
    svg.line(40, 170, 600, 170, { color: COLORS.black, width: 2 });
    for (const x of [185, 405]) svg.line(x, 30, x, 170, { color: '#d81b60', width: 3.5 });
    for (const [x, cx, sign] of [
      [185, 135, -1],
      [405, 485, 1],
    ]) {
      svg.path(`M ${x - sign * 10} 176 Q ${cx + sign * 10} 200 ${cx} 330`, {
        color: '#555555',
        width: 10,
      });
      svg.arrow(cx + sign * 4, 310, cx, 360, { color: '#555555', width: 10, head: 34 });
      svg.add(`<clipPath id="mag30_${cx}"><circle cx="${cx}" cy="460" r="100"/></clipPath>`);
      svg.circle(cx, 460, 100, { fill: '#ffffff', stroke: COLORS.black, width: 2.5 });
      const inner = svg.capture(() => {
        svg.line(cx - 110, 400, cx + 110, 400, { color: COLORS.black, width: 2 });
        svg.line(cx - 110, 520, cx + 110, 520, { color: COLORS.black, width: 2 });
        for (const d of [-6, 6])
          svg.line(cx - 10 + d, 400, cx - 10 + d, 520, { color: '#d81b60', width: 3 });
      });
      svg.add(`<g clip-path="url(#mag30_${cx})">${inner}</g>`);
    }
    return svg.render();
  },

  // 30.8 Fig. 1 — space quantization for ℓ = 1
  Figure_30_08_01: () => {
    const svg = new Svg({
      width: 640,
      height: 820,
      title: 'Space quantization of angular momentum',
      desc: 'For ℓ = 1 the angular momentum L has magnitude √2 ħ and its z-component Lz can be only ħ, 0 or −ħ (mℓ = 1, 0, −1). L therefore lies at θ1 = 45°, θ2 = 90° or θ3 = 135° from the z axis, anywhere around a cone; the shaded circles show where the tip of L can be.',
    });
    const O = [300, 420];
    const L = 260;
    svg.arrow(O[0], 800, O[0], 20, { color: COLORS.black, width: 1.6, head: 12 });
    svg.text(O[0] - 10, 20, '\\it{z}-axis', { size: 24, math: false, anchor: 'end' });
    for (const m of [1, 0, -1]) {
      const th = Math.acos(m / Math.sqrt(2));
      const tip = [O[0] + L * Math.sin(th), O[1] - L * Math.cos(th)];
      const rx = L * Math.sin(th);
      svg.add(
        `<path d="M ${O[0] - rx} ${tip[1]} A ${rx} ${rx * 0.16} 0 0 0 ${O[0]} ${tip[1] + rx * 0.16} L ${O[0]} ${tip[1] - rx * 0.16} A ${rx} ${rx * 0.16} 0 0 0 ${O[0] - rx} ${tip[1]} Z" fill="#d6d6d6"/>`
      );
      svg.ellipse(O[0], tip[1], rx, rx * 0.16, { stroke: COLORS.black, width: 1.6 });
      svg.arrow(...O, ...tip, { color: '#f08ab0', width: 4, head: 22 });
      if (m) {
        svg.arrow(O[0], O[1], O[0], tip[1], {
          color: '#f08ab0',
          width: 1.8,
          head: 12,
          dash: '6 5',
        });
        svg.line(O[0], tip[1], tip[0], tip[1], { color: COLORS.black, width: 1.2, dash: '5 4' });
        lab(svg, O[0] - 14, (O[1] + tip[1]) / 2 + 20 * m, '**L**_z', { anchor: 'end', size: 24 });
      }
      lab(svg, tip[0] - 40, tip[1] + (m === 1 ? 50 : m === 0 ? -20 : -50), '**L**', { size: 24 });
      lab(
        svg,
        m === 0 ? O[0] + 150 : O[0] - 14,
        tip[1] + (m === 1 ? 40 : m === 0 ? 40 : -40),
        `m_ℓ = ${m === -1 ? '−1' : m}`,
        {
          anchor: m === 0 ? 'start' : 'end',
          size: 24,
        }
      );
    }
    // Each label sits in the last 45° of its own arc, so the three land in
    // different gaps between the L vectors instead of on top of one another.
    for (const [m, r, s] of [
      [1, 50, 'θ_1'],
      [0, 76, 'θ_2'],
      [-1, 102, 'θ_3'],
    ]) {
      const th = (Math.acos(m / Math.sqrt(2)) * 180) / Math.PI;
      svg.arc(...O, r, 90 - th, 90, { color: COLORS.black, width: 1.5 });
      const a = rad(90 - th + 22.5);
      lab(svg, O[0] + (r + 16) * Math.cos(a), O[1] - (r + 16) * Math.sin(a), s, { size: 22 });
    }
    return svg.render();
  },

  // 30.9 Fig. 2 — allowed and forbidden electron arrangements
  Figure_30_09_02: () => {
    const svg = new Svg({
      width: 640,
      height: 780,
      title: 'The Pauli exclusion principle',
      desc: 'Electrons drawn with arrows for spin up (ms = +1/2) or spin down (ms = −1/2) in the n = 1 and n = 2 shells. Allowed: one electron in n = 1 with either spin; two in n = 1 with opposite spins; and two opposite spins in n = 1 with a third electron, of either spin, in n = 2. Not allowed: two electrons in n = 1 with the same spin, or three electrons in n = 1, since n = 1 holds only two.',
    });
    lab(svg, 110, 60, '\\rm{Key:}', { size: 24, anchor: 'end' });
    spinning(svg, 150, 50, true);
    lab(svg, 176, 50, '\\rm{Spin up} (m_s = +½)', { anchor: 'start', size: 24 });
    spinning(svg, 150, 110, false);
    lab(svg, 176, 110, '\\rm{Spin down} (m_s = −½)', { anchor: 'start', size: 24 });
    const panel = (y0, title, configs) => {
      note(svg, 40, y0, title, { anchor: 'start', size: 24 });
      const rows = [
        [y0 + 60, 'n = 2', 2],
        [y0 + 140, 'n = 1', 1],
      ];
      for (const [y, s] of rows) svg.text(40, y, s, { size: 22, anchor: 'start' });
      configs.forEach((c, i) => {
        const x = 130 + i * 102;
        for (const [y, , n] of rows) {
          svg.line(x, y, x + 84, y, { color: COLORS.black, width: 1.5 });
          const spins = c[n === 1 ? 0 : 1] || [];
          spins.forEach((up, k) =>
            spinning(svg, x + 42 + (k - (spins.length - 1) / 2) * 26, y, up)
          );
        }
      });
    };
    panel(200, 'Allowed', [
      [[true]],
      [[false]],
      [[true, false]],
      [[true, false], [true]],
      [[true, false], [false]],
    ]);
    panel(480, 'Not allowed', [
      [[true, true]],
      [[false, false]],
      [[true, false, true]],
      [[true, false, false]],
    ]);
    return svg.render();
  },

  // 30.9 table — the quantum numbers of the n = 2 shell
  Figure_30_09_04: () => {
    const svg = new Svg({
      width: 760,
      height: 440,
      title: 'Quantum numbers of the n = 2 shell',
      desc: 'A table of every allowed set of quantum numbers for n = 2. The 2s subshell (ℓ = 0, mℓ = 0, ms = ±1/2) holds 2 electrons; the 2p subshell (ℓ = 1, mℓ = 1, 0, −1, each with ms = ±1/2) holds 6; the shell holds 8 in all.',
    });
    const cols = [40, 105, 170, 240, 330, 445, 560];
    const heads = ['n', 'ℓ', 'm_ℓ', 'm_s', '\\rm{Subshell}', '\\rm{Total in}', '\\rm{Total in}'];
    heads.forEach((h, i) => svg.text(cols[i], 60, h, { size: 22, weight: 'bold' }));
    svg.text(cols[5], 86, '\\rm{subshell}', { size: 22, weight: 'bold' });
    svg.text(cols[6], 86, '\\rm{shell}', { size: 22, weight: 'bold' });
    svg.line(10, 104, 610, 104, { color: COLORS.black, width: 2 });
    const rows = [
      [0, 0, '+1/2'],
      [0, 0, '−1/2'],
      [1, 1, '+1/2'],
      [1, 1, '−1/2'],
      [1, 0, '+1/2'],
      [1, 0, '−1/2'],
      [1, -1, '+1/2'],
      [1, -1, '−1/2'],
    ];
    const Y = k => 134 + k * 37;
    rows.forEach(([l, m, s], k) => {
      for (const [i, v] of [
        [0, '2'],
        [1, String(l)],
        [2, m < 0 ? '−1' : String(m)],
        [3, s],
      ])
        svg.text(cols[i], Y(k), v, { size: 22, math: false });
    });
    const brace = (x, y1, y2) =>
      svg.path(
        `M ${x} ${y1} Q ${x + 8} ${y1} ${x + 8} ${y1 + 8} L ${x + 8} ${(y1 + y2) / 2 - 6} L ${x + 14} ${(y1 + y2) / 2} L ${x + 8} ${(y1 + y2) / 2 + 6} L ${x + 8} ${y2 - 8} Q ${x + 8} ${y2} ${x} ${y2}`,
        {
          color: COLORS.black,
          width: 1.5,
        }
      );
    brace(275, Y(0) - 14, Y(1) + 14);
    brace(275, Y(2) - 14, Y(7) + 14);
    brace(500, Y(0) - 14, Y(7) + 14);
    svg.text(cols[4], (Y(0) + Y(1)) / 2, '2s', { size: 22 });
    svg.text(cols[4], (Y(2) + Y(7)) / 2, '2p', { size: 22 });
    svg.text(cols[5], (Y(0) + Y(1)) / 2, '2', { size: 22, math: false });
    svg.text(cols[5], (Y(2) + Y(7)) / 2, '6', { size: 22, math: false });
    svg.text(cols[6], (Y(0) + Y(7)) / 2, '8', { size: 22, math: false });
    return svg.render();
  },

  // 30.9 — the meaning of 2p³
  Figure_30_09_05: () => {
    const svg = new Svg({
      width: 420,
      height: 160,
      title: 'Reading electron configuration notation',
      desc: 'In the notation 2p³, the 2 is the principal quantum number n, the letter p stands for the angular momentum quantum number ℓ, and the superscript 3 is the number of electrons in that subshell.',
    });
    svg.text(60, 72, '2p^3', { size: 34 });
    svg.arrow(26, 130, 52, 92, { color: COLORS.black, width: 1.8, head: 12 });
    lab(svg, 18, 140, 'n', { size: 26 });
    svg.arrow(150, 132, 92, 92, { color: COLORS.black, width: 1.8, head: 12 });
    lab(svg, 160, 140, 'ℓ \\rm{symbol}', { size: 26, anchor: 'start' });
    svg.arrow(150, 40, 98, 56, { color: COLORS.black, width: 1.8, head: 12 });
    note(svg, 160, 36, 'number of electrons', { size: 24, anchor: 'start' });
    return svg.render();
  },
};
