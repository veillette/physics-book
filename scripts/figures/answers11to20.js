/**
 * Graphs for answers in chapters 11–20 that ask for one (outside the field
 * sketches of sections 18.7 and 19.4, which live in fields18to19.js).
 *
 * Names follow concept_CC_SS_pNN for problems and concept_CC_SS_qNN for
 * conceptual questions, using the book’s own section numbering.
 */
import { COLORS, Plot, Svg } from './svg.js';

// Exact point-charge fields and midpoint tracing, following fields18to19.js.
function answerField(sources) {
  return (x, y) =>
    sources.reduce(
      ([ex, ey], source) => {
        const dx = x - source.x;
        const dy = y - source.y;
        const r3 = Math.hypot(dx, dy) ** 3;
        return [ex + (source.q * dx) / r3, ey + (source.q * dy) / r3];
      },
      [0, 0]
    );
}

function answerTrace(sources, x, y, sign, box) {
  const field = answerField(sources);
  const points = [[x, y]];
  const step = 0.8;
  for (let k = 0; k < 6000; k += 1) {
    const a = field(x, y);
    const am = Math.hypot(...a);
    if (!am) break;
    const b = field(x + (sign * step * a[0]) / am / 2, y + (sign * step * a[1]) / am / 2);
    const bm = Math.hypot(...b);
    if (!bm) break;
    x += (sign * step * b[0]) / bm;
    y += (sign * step * b[1]) / bm;
    points.push([x, y]);
    if (x < box.x || x > box.x + box.w || y < box.y || y > box.y + box.h) break;
    if (sources.some(source => Math.hypot(x - source.x, y - source.y) < 10)) break;
  }
  return points;
}

function answerLine(svg, points, reverse = false) {
  svg.polyline(points, { color: COLORS.red, width: 1.5 });
  const i = Math.floor(points.length * 0.55);
  if (i < 4) return;
  let a = points[Math.max(i - 12, 0)];
  let b = points[Math.min(i + 12, points.length - 1)];
  if (reverse) [a, b] = [b, a];
  svg.arrow(...a, ...b, { color: COLORS.red, width: 1.5, head: 8 });
}

function answerCharge(svg, x, y, positive) {
  svg.circle(x, y, 10, { fill: positive ? COLORS.red : COLORS.blue });
  svg.text(x, y, positive ? '+' : '−', { color: '#ffffff', size: 17, math: false });
}

function radialAnswer(svg, x, y, n, inward, radius = 110) {
  for (let k = 0; k < n; k += 1) {
    const a = (2 * Math.PI * k) / n;
    const near = [x + 17 * Math.cos(a), y + 17 * Math.sin(a)];
    const far = [x + radius * Math.cos(a), y + radius * Math.sin(a)];
    svg.line(...near, ...far, { color: COLORS.red, width: 1.4 });
    const r1 = inward ? radius * 0.7 : radius * 0.48;
    const r2 = inward ? radius * 0.48 : radius * 0.7;
    svg.arrow(
      x + r1 * Math.cos(a),
      y + r1 * Math.sin(a),
      x + r2 * Math.cos(a),
      y + r2 * Math.sin(a),
      { color: COLORS.red, width: 1.4, head: 8 }
    );
  }
}

export default {
  // 14.3 P7 — temperature versus time for 0.200 kg of ice heated to steam
  concept_14_03_p07: () => {
    const svg = new Svg({
      width: 680,
      height: 420,
      title: 'Heating ice to steam: temperature versus time',
      desc: 'Temperature in degrees Celsius versus time in seconds for 0.200 kg of ice heated at a constant 20.0 kJ/s. The ice warms from −20 °C to 0 °C in 0.418 s; the temperature stays at 0 °C while the ice melts, until 3.76 s; the water warms from 0 °C to 100 °C, reaching it at 7.95 s; the temperature stays at 100 °C while the water boils, until 30.5 s; finally the steam warms from 100 °C to 130 °C, reaching it at 31.0 s. The two flat plateaus are the phase changes; the boiling plateau is by far the longest because the latent heat of vaporization is largest.',
    });
    const t = [0, 0.418, 3.758, 7.944, 30.504, 30.96];
    const T = [-20, 0, 0, 100, 100, 130];
    const g = new Plot(svg, {
      x: 90,
      y: 40,
      w: 540,
      h: 290,
      xRange: [0, 33],
      yRange: [-30, 140],
      xTicks: [0, 5, 10, 15, 20, 25, 30],
      yTicks: [-20, 0, 20, 40, 60, 80, 100, 120, 140],
    });
    g.axes({ xTitle: 'Time, t (s)', yTitle: 'Temperature, T (°C)', yTitleOffset: 58 });
    g.series(
      t.map((x, k) => [x, T[k]]),
      { color: COLORS.red, width: 3 }
    );
    for (let k = 0; k < t.length; k += 1) {
      const [px, py] = [g.X(t[k]), g.Y(T[k])];
      svg.circle(px, py, 3.5, { fill: COLORS.red });
    }
    g.text(2.1, 12, 'ice melts', { size: 13, math: false });
    g.text(1.4, -12, 'ice warms', { size: 13, math: false, anchor: 'start' });
    g.text(6.6, 50, 'water warms', { size: 13, math: false, anchor: 'start' });
    g.text(19.2, 110, 'water boils (22.6 s)', { size: 13, math: false });
    g.text(30.4, 136, 'steam warms', { size: 13, math: false, anchor: 'end' });
    svg.text(360, 400, 'Constant heating rate 20.0 kJ/s; the plateaus are the phase changes.', {
      size: 14,
      math: false,
    });
    return svg.render();
  },
  concept_18_05_p01: () => {
    const svg = new Svg({
      width: 650,
      height: 350,
      title: 'Radial fields of positive q and negative 3q',
      desc: 'Two separate point-charge sketches on the same line-count scale: eight equally spaced radial electric field lines point outward from positive q, and twenty-four equally spaced radial lines point inward toward negative 3q.',
    });
    radialAnswer(svg, 165, 175, 8, false);
    radialAnswer(svg, 485, 175, 24, true);
    answerCharge(svg, 165, 175, true);
    answerCharge(svg, 485, 175, false);
    svg.text(165, 28, '(a) +q: eight outgoing lines', { math: false, size: 16 });
    svg.text(485, 28, '(b) −3q: twenty-four incoming lines', { math: false, size: 15 });
    svg.text(325, 330, 'The line count represents charge magnitude on a common scale.', {
      math: false,
      size: 14,
    });
    return svg.render();
  },
  concept_18_05_p02: () => {
    const svg = new Svg({
      width: 840,
      height: 360,
      title: 'Like-charge and neutral-pair far fields',
      desc: 'Far-field sketches for Figure 5, with Figure 4 for comparison: two equal negative charges act approximately like a single negative 2q charge with inward radial lines; an equal positive and negative pair has curved dipole lines from positive to negative; two positive charges act approximately like their positive total charge with outward radial lines.',
    });
    radialAnswer(svg, 140, 175, 12, true, 105);
    answerCharge(svg, 140, 175, false);
    svg.text(140, 26, 'Figure 5(a): net −2q', { math: false, size: 15 });
    svg.text(140, 305, 'Far field: inward monopole', { math: false, size: 14 });
    const sources = [
      { x: 395, y: 175, q: 1 },
      { x: 445, y: 175, q: -1 },
    ];
    for (let k = 0; k < 12; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 12;
      answerLine(
        svg,
        answerTrace(sources, 395 + 12 * Math.cos(a), 175 + 12 * Math.sin(a), 1, {
          x: 285,
          y: 45,
          w: 270,
          h: 240,
        })
      );
    }
    sources.forEach(source => answerCharge(svg, source.x, source.y, source.q > 0));
    svg.text(420, 26, 'Figure 5(b): net zero', { math: false, size: 15 });
    svg.text(420, 305, 'Far field: dipole, from + to −', { math: false, size: 14 });
    radialAnswer(svg, 700, 175, 12, false, 105);
    answerCharge(svg, 700, 175, true);
    svg.text(700, 26, 'Figure 4: net q₁ + q₂ > 0', { math: false, size: 15 });
    svg.text(700, 305, 'Far field: outward monopole', { math: false, size: 14 });
    svg.text(
      420,
      342,
      'View at distances much greater than the separation; the middle panel also resolves the pair.',
      { math: false, size: 13 }
    );
    return svg.render();
  },
  concept_18_05_p03: () => {
    const svg = new Svg({
      width: 470,
      height: 360,
      title: 'Far field of a positive 2Q and negative Q pair',
      desc: 'A distant view of a positive 2Q and negative Q pair: the unresolved pair is marked with net charge positive Q, and radial electric field arrows point outward from it, showing the leading far field.',
    });
    radialAnswer(svg, 235, 175, 12, false, 115);
    answerCharge(svg, 235, 175, true);
    svg.text(235, 25, '+2Q − Q = +Q', { math: false, size: 19 });
    svg.text(235, 325, 'Far away: outward field of the net positive charge', {
      math: false,
      size: 15,
    });
    return svg.render();
  },
  concept_18_05_p04: () => {
    const svg = new Svg({
      width: 700,
      height: 470,
      title: 'Field of positive q and negative 3q',
      desc: 'Electric field lines computed from a positive q point charge on the left and a negative 3q point charge on the right. Six lines leave the positive charge and terminate on the negative charge, while twelve additional lines arrive from the outer boundary, so three times as many lines enter the negative charge as leave the positive charge.',
    });
    const sources = [
      { x: 240, y: 235, q: 1 },
      { x: 450, y: 235, q: -3 },
    ];
    const box = { x: 12, y: 45, w: 676, h: 370 };
    for (let k = 0; k < 6; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 6;
      answerLine(svg, answerTrace(sources, 240 + 12 * Math.cos(a), 235 + 12 * Math.sin(a), 1, box));
    }
    // Trace backward from the negative charge, retaining only the infinity-fed
    // basin. The other basin is already represented by the six positive seeds.
    const incoming = [];
    for (let k = 0; k < 720; k += 1) {
      const a = (2 * Math.PI * (k + 0.5)) / 720;
      const points = answerTrace(sources, 450 + 12 * Math.cos(a), 235 + 12 * Math.sin(a), -1, box);
      const [x, y] = points.at(-1);
      if (x < box.x || x > box.x + box.w || y < box.y || y > box.y + box.h) incoming.push(points);
    }
    for (let k = 0; k < 12; k += 1) {
      answerLine(svg, incoming[Math.floor(((k + 0.5) * incoming.length) / 12)], true);
    }
    answerCharge(svg, 240, 235, true);
    answerCharge(svg, 450, 235, false);
    svg.text(240, 265, '+q', { math: false, size: 18 });
    svg.text(450, 265, '−3q', { math: false, size: 18 });
    svg.text(350, 24, 'Six outgoing lines; eighteen incoming lines', { math: false, size: 17 });
    svg.text(
      350,
      449,
      'Additional incoming lines continue to infinity; arrows follow the exact Coulomb field.',
      { math: false, size: 14 }
    );
    return svg.render();
  },
  concept_18_06_q01: () => {
    const svg = new Svg({
      width: 640,
      height: 460,
      title: 'Electric field in a thin charged cell membrane',
      desc: 'A spherical cell cross section has negative charge on the inner membrane surface and positive charge on the outer surface. Electric field arrows point radially inward only within the thin membrane; the cytoplasm and exterior are labeled zero field in the equal-and-opposite-total-charge thin-membrane model.',
    });
    const cx = 300;
    const cy = 225;
    svg.circle(cx, cy, 155, { fill: '#fff4dd', stroke: COLORS.red });
    svg.circle(cx, cy, 125, { fill: '#eef7ff', stroke: COLORS.blue });
    for (let k = 0; k < 16; k += 1) {
      const a = (2 * Math.PI * k) / 16;
      svg.text(cx + 164 * Math.cos(a), cy + 164 * Math.sin(a), '+', {
        math: false,
        size: 18,
        color: COLORS.red,
      });
      svg.text(cx + 115 * Math.cos(a), cy + 115 * Math.sin(a), '−', {
        math: false,
        size: 18,
        color: COLORS.blue,
      });
      svg.arrow(
        cx + 151 * Math.cos(a),
        cy + 151 * Math.sin(a),
        cx + 129 * Math.cos(a),
        cy + 129 * Math.sin(a),
        { color: COLORS.red, head: 7, width: 1.8 }
      );
    }
    svg.text(cx, cy - 12, 'Cell interior: E = 0', { math: false, size: 17 });
    svg.text(cx, cy + 15, 'cytoplasm', { math: false, size: 15 });
    svg.text(526, 96, 'Exterior: E = 0', { math: false, size: 16 });
    svg.text(320, 25, 'Thin membrane: outer +σ, inner −σ; field points inward', {
      math: false,
      size: 17,
    });
    svg.text(320, 414, 'σ = 2.5 × 10⁻⁶ C/m²; equal and opposite total charges assumed', {
      math: false,
      size: 15,
    });
    svg.text(320, 440, 'Membrane thickness exaggerated for visibility.', { math: false, size: 14 });
    return svg.render();
  },
};
