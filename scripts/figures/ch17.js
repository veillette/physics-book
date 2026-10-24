/**
 * Chapter 17: sound waves from a string and a tuning fork, the Mach cone,
 * resonance in closed and open tubes, the equal-loudness curves, audiograms,
 * and the middle-ear lever.
 *
 * Air pressure is drawn as shading: darker bands are compressions (solid
 * lines at their centers) and paler bands rarefactions (dashed lines). The
 * shading comes from the pressure of a wave sent out by the source, so the
 * bands sit where the wave would put them. Tube resonances shade the air by
 * its displacement amplitude, |sin| from a closed end or |cos| from an open
 * one, inside the ± envelope. The equal-loudness curves are digitized from
 * the original figure (scripts/figures/data/equal-loudness.json) so that the
 * section's worked readings still hold.
 *
 * For readers who allow motion, the sound waves move out from the string and
 * the tuning fork, the moving and supersonic sources send out their waves as
 * they go, the pulse of 17.5 runs along the tube, and the air in the
 * resonating tubes swings back and forth.
 */
import fs from 'fs';
import { fileURLToPath } from 'url';
import { COLORS, Plot, Svg, fmt, morph, rad, smilAnimate, smilList } from './svg.js';

const LOUDNESS = JSON.parse(
  fs.readFileSync(fileURLToPath(new URL('./data/equal-loudness.json', import.meta.url)), 'utf8')
).curves;

const AIR_HI = [120, 146, 205];
const AIR_LO = [232, 240, 226];
const TUBE = '#efd9a4';
const TUBE_EDGE = '#c99a2e';
const AIR_DISP = [64, 140, 110];
const ENVELOPE = '#1aa6b7';
const FORK = '#9a9da3';
const FORK_EDGE = '#5f6369';
const CLAMP = '#e2b27c';
const CURVE = '#8b1a2b';

let gradientId = 0;

function lab(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 22, ...o });
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 18, math: false, ...o });
}

/** Times 0 to `period` in `n` equal steps, the last closing the loop. */
const cycle = (period, n) => Array.from({ length: n + 1 }, (_, k) => (period * k) / n);

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = c => `rgb(${c.join(',')})`;

/**
 * Horizontal gradient whose color at fraction u of its width is `shade(u)`
 * (0 pale, 1 dark). Returns the url() for a fill.
 */
function gradient(svg, shade, { lo = AIR_LO, hi = AIR_HI, n = 160, x1 = 0, x2 = 1 } = {}) {
  gradientId += 1;
  const id = `g17_${gradientId}`;
  const stops = [];
  for (let k = 0; k <= n; k += 1) {
    const u = k / n;
    stops.push(
      `<stop offset="${(u * 100).toFixed(2)}%" stop-color="${rgb(mix(lo, hi, Math.max(0, Math.min(1, shade(u)))))}"/>`
    );
  }
  svg.add(
    `<defs><linearGradient id="${id}" x1="${x1}" y1="0" x2="${x2}" y2="0">${stops.join('')}</linearGradient></defs>`
  );
  return `url(#${id})`;
}

/** Radial gradient: shade(u) at fraction u of radius r about (cx, cy). */
function radial(svg, cx, cy, r, shade, { n = 160 } = {}) {
  gradientId += 1;
  const id = `g17_${gradientId}`;
  const stops = [];
  for (let k = 0; k <= n; k += 1) {
    const u = k / n;
    stops.push(
      `<stop offset="${(u * 100).toFixed(2)}%" stop-color="${rgb(mix(AIR_LO, AIR_HI, Math.max(0, Math.min(1, shade(u)))))}"/>`
    );
  }
  svg.add(
    `<defs><radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${r}">${stops.join('')}</radialGradient></defs>`
  );
  return `url(#${id})`;
}

/** Double-headed dimension arrow with end ticks and a label above it. */
function dim(svg, x1, x2, y, label, { size = 20, below = false } = {}) {
  svg.arrow(x1 + 1, y, x2 - 1, y, { color: COLORS.black, width: 1.4, head: 10, start: true });
  for (const x of [x1, x2]) svg.line(x, y - 9, x, y + 9, { color: COLORS.black, width: 1.3 });
  lab(svg, (x1 + x2) / 2, below ? y + 22 : y - 16, label, { size });
}

/** A tuning fork standing upright, with tines `gap` apart, base of the tines at y. */
function fork(svg, cx, y, { gap = 26, tine = 120, w = 18, stem = 150, spread = 0 } = {}) {
  const l = cx - gap / 2 - w - spread;
  const r = cx + gap / 2 + spread;
  svg.path(
    `M ${l} ${y - tine} L ${l + w} ${y - tine} L ${l + w + spread} ${y} Q ${cx} ${y + 16} ${r - spread} ${y} L ${r} ${y - tine} L ${r + w} ${y - tine} L ${r + w - spread * 0.2} ${y + 6} Q ${cx} ${y + 50} ${l + spread * 0.2} ${y + 6} Z`,
    { color: FORK_EDGE, width: 1.5, fill: FORK }
  );
  svg.rect(cx - 9, y + 18, 18, stem, { fill: FORK, stroke: FORK_EDGE, width: 1.5, rx: 8 });
  svg.path(`M ${cx - 9} ${y + 22} Q ${cx} ${y + 34} ${cx + 9} ${y + 22}`, {
    color: FORK,
    width: 6,
  });
}

/** A short wide clamp holding the string. */
function clamp(svg, cx, cy) {
  svg.rect(cx - 50, cy - 16, 100, 32, { fill: CLAMP, stroke: '#b06d3a', width: 1.5, rx: 3 });
}

/**
 * Sound from a vibrating string at x = xs, vertical between yTop and yBot.
 * `p(d, side)` is the pressure (−1 … 1) a distance d from the string on the
 * side (+1 right, −1 left), or null beyond the wave's front.
 */
function stringField(svg, xs, yTop, yBot, x0, x1, p, { lineAt = [] } = {}) {
  const W = x1 - x0;
  // Undisturbed air is pale; compressions shade darker, rarefactions paler still.
  const shade = u => {
    const x = x0 + u * W;
    const d = Math.abs(x - xs);
    const v = p(d, x >= xs ? 1 : -1);
    if (v === null) return 0.22;
    return v > 0 ? 0.22 + 0.68 * v : 0.22 + 0.22 * v;
  };
  const fill = gradient(svg, shade, { n: 220 });
  // The pressure region bows outward, like the original's wedge of air.
  const bow = 26;
  svg.path(
    `M ${x0} ${yTop - bow} Q ${xs} ${yTop + bow} ${x1} ${yTop - bow} L ${x1} ${yBot + bow} Q ${xs} ${yBot - bow} ${x0} ${yBot + bow} Z`,
    { color: 'none', width: 0, fill }
  );
  bandLines(svg, xs, yTop, yBot, lineAt);
}

/** Solid lines at compression centers ('c') and dashed ones at rarefactions ('r'). */
function bandLines(svg, xs, yTop, yBot, lineAt) {
  for (const [x, kind] of lineAt) {
    svg.path(
      `M ${fmt(x)} ${yTop - 6} Q ${fmt(x + (x > xs ? 1 : -1) * 18)} ${(yTop + yBot) / 2} ${fmt(x)} ${yBot + 6}`,
      {
        color: kind === 'c' ? '#5d6fb3' : '#6a3d9a',
        width: kind === 'c' ? 2.4 : 2.2,
        dash: kind === 'c' ? undefined : '8 6',
      }
    );
  }
}

/** Pressure of a wave the string started at t = 0, at time t (periods), wavelength lam (px). */
const fromString = (t, lam) => (d, side) => {
  const tau = t - d / lam;
  if (tau < 0) return null;
  return side * Math.sin(2 * Math.PI * tau);
};

/** Centers of the compressions ('c') and rarefactions ('r') of `fromString`. */
function bands(xs, t, lam, x0, x1) {
  const out = [];
  for (const side of [1, -1]) {
    for (let k = -4; k < 12; k += 0.5) {
      // side·sin(2π(t − d/λ)) = ±1 where t − d/λ = 1/4 + k/2.
      const tau = 0.25 + k;
      const d = (t - tau) * lam;
      if (d < 4 || tau < 0) continue;
      const x = xs + side * d;
      if (x < x0 + 6 || x > x1 - 6) continue;
      const kind = side * Math.sin(2 * Math.PI * tau) > 0 ? 'c' : 'r';
      out.push([x, kind]);
    }
  }
  return out;
}

/**
 * For readers who allow motion: the sound from a string at xs, as two strips
 * of shaded air that slide outward from it. In the strips' own frame the
 * pressure is p(d′, side) at a distance d′ from the string, drawn for d′ from
 * `a` to `b`; `shift` lists their outward offsets (px) at `keyTimes`, and
 * `shown` their opacities. Clipped to the bowed region of `stringField`.
 */
function soundStrips(svg, xs, yTop, yBot, x0, x1, t, lam, a, b, { dur, keyTimes, shift, shown }) {
  const p = fromString(t, lam);
  const bow = 26;
  const id = `air_${xs}_${x1}_${yTop}`;
  svg.add(
    `<defs><clipPath id="${id}"><path d="M ${x0} ${yTop - bow} Q ${xs} ${yTop + bow} ${x1} ${yTop - bow} L ${x1} ${yBot + bow} Q ${xs} ${yBot - bow} ${x0} ${yBot + bow} Z"/></clipPath><clipPath id="${id}_r"><rect x="${xs}" y="0" width="${x1 - xs}" height="${yBot + 2 * bow}"/></clipPath><clipPath id="${id}_l"><rect x="${x0}" y="0" width="${xs - x0}" height="${yBot + 2 * bow}"/></clipPath></defs>`
  );
  const level = v => (v === null ? 0.22 : v > 0 ? 0.22 + 0.68 * v : 0.22 + 0.22 * v);
  let out = '';
  for (const side of [1, -1]) {
    const fill = gradient(svg, u => level(p(side > 0 ? a + u * (b - a) : b - u * (b - a), side)), {
      n: 260,
    });
    const strip = svg.capture(() => {
      const [l, r] = side > 0 ? [xs + a, xs + b] : [xs - b, xs - a];
      svg.rect(l, yTop - bow - 4, r - l, yBot - yTop + 2 * bow + 8, { fill });
      // Compression and rarefaction centers, where side·sin 2π(t − d/λ) = ±1,
      // as in `bands`.
      const lines = [];
      for (let k = 0; k < 40; k += 1) {
        const tau = 0.25 + k / 2;
        const d = (t - tau) * lam;
        if (d >= a && d <= b)
          lines.push([xs + side * d, side * Math.sin(2 * Math.PI * tau) > 0 ? 'c' : 'r']);
      }
      bandLines(svg, xs, yTop, yBot, lines);
    });
    const move = shift.map(v => `${fmt(side * v)} 0`).join(';');
    out += `<g clip-path="url(#${id}_${side > 0 ? 'r' : 'l'})"><g>${strip}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" keyTimes="${smilList(keyTimes)}" values="${move}"/>${shown ? smilAnimate('opacity', shown, { dur, keyTimes }) : ''}</g></g>`;
  }
  // Undisturbed air under the strips, for when they fade.
  const calm = svg.capture(() =>
    svg.path(
      `M ${x0} ${yTop - bow} Q ${xs} ${yTop + bow} ${x1} ${yTop - bow} L ${x1} ${yBot + bow} Q ${xs} ${yBot - bow} ${x0} ${yBot + bow} Z`,
      { color: 'none', width: 0, fill: rgb(mix(AIR_LO, AIR_HI, 0.22)) }
    )
  );
  return `${calm}<g clip-path="url(#${id})">${out}</g>`;
}

/**
 * The first moments of 17.1 Figs. 2 and 3: the string starts from rest,
 * swings for `t1` periods while its sound spreads, holds, and relaxes as the
 * sound fades. `bend` is the string's largest bow.
 */
function stringStart(svg, xs, yTop, yBot, x0, x1, lam, t1, bend, { run, marks = [] }) {
  const [hold, rest, fade] = [0.6, 1.8, 0.6];
  const T = hold + run + rest + fade;
  const dur = `${fmt(T)}s`;
  const D = Math.max(x1 - xs, xs - x0);
  const keyTimes = [0, hold / T, (hold + run) / T, (hold + run + rest) / T, 1];
  const strips = soundStrips(svg, xs, yTop, yBot, x0, x1, t1, lam, 0, D + t1 * lam, {
    dur,
    keyTimes,
    shift: [-t1 * lam, -t1 * lam, 0, 0, 0],
    shown: [1, 1, 1, 1, 0],
  });
  const steps = 16;
  const frames = [
    [0, 0],
    [hold, 0],
  ];
  for (let k = 1; k <= steps; k += 1) {
    const t = (t1 * k) / steps;
    frames.push([hold + (run * k) / steps, bend * Math.sin(2 * Math.PI * t)]);
  }
  frames.push([hold + run + rest, bend * Math.sin(2 * Math.PI * t1)], [T, 0]);
  const string = morph(
    frames.map(([, b]) => svg.capture(() => bowedString(svg, xs, yTop + 2, yBot - 2, b))),
    { dur, keyTimes: frames.map(([t]) => t / T) }
  );
  // Lines the still figure marks by hand appear while the motion holds.
  const lines = marks.length
    ? `<g opacity="0">${smilAnimate('opacity', [0, 0, 1, 1, 0], { dur, keyTimes: [0, (hold + run) / T, (hold + run + 0.3) / T, (hold + run + rest) / T, 1] })}${svg.capture(
        () => bandLines(svg, xs, yTop, yBot, marks)
      )}</g>`
    : '';
  return `${strips}${lines}${string}`;
}

/** The vibrating string, bowed by `bend` pixels at its middle. */
function bowedString(svg, xs, yTop, yBot, bend, { width = 3 } = {}) {
  svg.path(`M ${xs} ${yTop} Q ${xs + 2 * bend} ${(yTop + yBot) / 2} ${xs} ${yBot}`, {
    color: COLORS.black,
    width,
  });
}

/** Tube with its closed end at the left (x0) and open end at the right. */
function tube(svg, x0, x1, yc, h, { fill = TUBE, closedLeft = true } = {}) {
  svg.rect(x0, yc - h / 2, x1 - x0, h, { fill, stroke: TUBE_EDGE, width: 1.5 });
  if (closedLeft) svg.ellipse(x0, yc, 10, h / 2, { fill: '#e3c47a', stroke: TUBE_EDGE, width: 2 });
}

/**
 * Air-displacement standing wave in a tube from x0 to x1: `amp(u)` is the
 * displacement amplitude (0 … 1) at fraction u along it. Shades the air and
 * draws the ± envelope.
 */
function tubeMode(svg, x0, x1, yc, h, amp, { closedLeft = true } = {}) {
  const fill = gradient(svg, u => amp(u), { lo: [244, 232, 200], hi: AIR_DISP, n: 200 });
  svg.rect(x0, yc - h / 2, x1 - x0, h, { fill, stroke: TUBE_EDGE, width: 1.5 });
  const top = [];
  const bot = [];
  for (let k = 0; k <= 200; k += 1) {
    const u = k / 200;
    const x = x0 + u * (x1 - x0);
    top.push([x, yc - (h / 2) * 0.92 * amp(u)]);
    bot.push([x, yc + (h / 2) * 0.92 * amp(u)]);
  }
  svg.polyline(top, { color: ENVELOPE, width: 2.2 });
  svg.polyline(bot, { color: ENVELOPE, width: 2.2 });
  if (closedLeft) svg.line(x0, yc - h / 2, x0, yc + h / 2, { color: TUBE_EDGE, width: 4 });
}

/**
 * For readers who allow motion: parcels of air in the tube of `tubeMode`
 * swinging back and forth along it, by `shape(u)` (signed, −1 … 1) at
 * fraction u along the tube, once every `period` seconds.
 */
function airParcels(svg, x0, x1, yc, h, shape, period) {
  const spline = 'calcMode="spline" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"';
  let out = '';
  for (const dy of [-0.27, 0, 0.27]) {
    for (let x = x0 + 9; x < x1 - 4; x += 13) {
      const a = 7 * shape((x - x0) / (x1 - x0));
      out += `<circle cx="${fmt(x)}" cy="${fmt(yc + dy * h)}" r="2.6" fill="#24473a"><animateTransform attributeName="transform" type="translate" dur="${period}s" repeatCount="indefinite" ${spline} values="${fmt(-a)} 0;${fmt(a)} 0;${fmt(-a)} 0"/></circle>`;
    }
  }
  svg.motionGroup(out);
}

/** Frequency axis position for the log scale of the loudness graphs. */
const logPlot = (svg, box, yRange) =>
  new Plot(svg, {
    ...box,
    xRange: [Math.log10(20), Math.log10(20000)],
    yRange,
  });

function loudnessCurve(g, level, opts) {
  g.series(
    LOUDNESS[String(level)].map(([f, L]) => [Math.log10(f), L]),
    { smooth: true, ...opts }
  );
}

/** Audiogram: hearing threshold (dB, increasing downward) versus frequency. */
function audiogram(svg, box, right, left, { bone, legend = false } = {}) {
  const freqs = [250, 500, 1000, 2000, 4000, 8000];
  const g = new Plot(svg, { ...box, xRange: [0, 8250], yRange: [65, -12] });
  for (let f = 250; f <= 8000; f += 250) {
    svg.line(g.X(f), g.Y(-12), g.X(f), g.Y(65), { color: '#bbbbbb', width: f % 1000 ? 0.7 : 1.1 });
  }
  for (let d = -10; d <= 60; d += 5) {
    svg.line(g.X(0), g.Y(d), g.X(8250), g.Y(d), { color: '#bbbbbb', width: d % 20 ? 0.7 : 1.1 });
  }
  svg.rect(g.X(0), g.Y(-12), g.w, g.h, { stroke: COLORS.black, width: 1.2 });
  for (const d of [-10, 0, 20, 40, 60])
    note(svg, g.X(0) - 8, g.Y(d), String(d), { anchor: 'end', size: 16 });
  for (const f of freqs)
    note(svg, g.X(f), g.Y(65) + (f === 500 ? 38 : 18), String(f), { size: 16 });
  note(svg, g.X(4125), g.Y(65) + 62, 'Frequency f (Hz)', { size: 17 });
  svg.text(g.X(0) - 52, g.Y(26), 'Hearing threshold level (dB)', {
    size: 16,
    math: false,
    rotate: -90,
  });
  const R = freqs.map((f, i) => g.P(f, right[i]));
  const L = freqs.map((f, i) => g.P(f, left[i]));
  svg.polyline(L, { color: '#e98b6a', width: 2.5 });
  svg.polyline(R, { color: '#2aa0b5', width: 2.5 });
  for (const [x, y] of L)
    svg.polygon(
      [
        [x, y - 8],
        [x + 8, y],
        [x, y + 8],
        [x - 8, y],
      ],
      { fill: '#8b1a2b', stroke: '#4a0d17', width: 1 }
    );
  for (const [x, y] of R) svg.circle(x, y, 6.5, { fill: '#2aa0b5', stroke: '#14606c', width: 1 });
  if (bone) {
    freqs.forEach((f, i) => {
      note(svg, g.X(f) - 14, g.Y(bone[0][i]), '[', { size: 17 });
      note(svg, g.X(f) + 14, g.Y(bone[1][i]), ']', { size: 17 });
    });
  }
  if (legend) {
    const lx = g.X(500);
    const ly = g.Y(bone ? 36 : 38);
    svg.circle(lx, ly, 6.5, { fill: '#2aa0b5', stroke: '#14606c', width: 1 });
    note(svg, lx + 16, ly, '= right ear', { anchor: 'start', size: 17 });
    svg.polygon(
      [
        [lx, ly + 20],
        [lx + 8, ly + 28],
        [lx, ly + 36],
        [lx - 8, ly + 28],
      ],
      { fill: '#8b1a2b' }
    );
    note(svg, lx + 16, ly + 28, '= left ear', { anchor: 'start', size: 17 });
    if (bone) note(svg, lx - 10, ly + 56, '[ ] = bone conduction', { anchor: 'start', size: 17 });
  }
}

export default {
  // 17.1 Fig. 2 — a string moving right compresses the air ahead of it
  Figure_17_01_02: () => {
    const svg = new Svg({
      width: 640,
      height: 400,
      title: 'A vibrating string compressing the air in front of it',
      desc: 'A string held between two clamps bows to the right as it moves right. It squeezes the air just ahead of it into a compression, a darker band whose center is the solid line, and leaves a rarefaction, a paler band with a dashed center, behind it on the left.',
    });
    const xs = 300;
    const p = fromString(0.25, 300);
    svg.still(() => {
      stringField(svg, xs, 50, 350, 20, 600, p, {
        lineAt: [
          [xs + 70, 'c'],
          [xs - 70, 'r'],
        ],
      });
      bowedString(svg, xs, 52, 348, 18);
    });
    // For readers who allow motion, the string starts from rest and swings
    // right, pushing out the first compression.
    svg.motionGroup(
      stringStart(svg, xs, 50, 350, 20, 600, 300, 0.25, 18, {
        run: 1.4,
        marks: [
          [xs + 70, 'c'],
          [xs - 70, 'r'],
        ],
      })
    );
    svg.arrow(xs + 22, 200, xs + 90, 200, { color: COLORS.black, width: 2, head: 14 });
    clamp(svg, xs, 40);
    clamp(svg, xs, 360);
    note(svg, xs - 150, 120, 'Rarefaction', { size: 24 });
    svg.leader(xs - 180, 136, xs - 76, 200, { bend: 0.3, width: 1.5 });
    note(svg, xs + 200, 360, 'Compression', { size: 24 });
    svg.leader(xs + 200, 340, xs + 76, 270, { bend: -0.3, width: 1.5 });
    note(svg, xs + 160, 90, 'String', { size: 24 });
    svg.leader(xs + 130, 100, xs + 30, 150, { bend: 0.3, width: 1.5 });
    return svg.render();
  },

  // 17.1 Fig. 3 — moving left, it sends out a second compression
  Figure_17_01_03: () => {
    const svg = new Svg({
      width: 640,
      height: 400,
      title: 'The string moving left starts a second compression and rarefaction',
      desc: 'Half a cycle later the string bows to the left as it moves left. It now compresses the air on its left and leaves a rarefaction on its right, while the first compression and rarefaction, shown by the solid and dashed lines farther out, have moved away from the string to the right.',
    });
    const xs = 300;
    const t = 0.75;
    const lam = 300;
    svg.still(() => {
      stringField(svg, xs, 50, 350, 20, 600, fromString(t, lam), {
        lineAt: bands(xs, t, lam, 20, 600),
      });
      bowedString(svg, xs, 52, 348, -18);
    });
    // For readers who allow motion, the string starts from rest and swings
    // right and then left, sending the first compression and rarefaction out.
    svg.motionGroup(stringStart(svg, xs, 50, 350, 20, 600, lam, t, 18, { run: 3 }));
    svg.arrow(xs - 22, 200, xs - 90, 200, { color: COLORS.black, width: 2, head: 14 });
    clamp(svg, xs, 40);
    clamp(svg, xs, 360);
    return svg.render();
  },

  // 17.1 Fig. 4 — after many vibrations, a train of compressions
  Figure_17_01_04: () => {
    const svg = new Svg({
      width: 660,
      height: 600,
      title: 'A sound wave of compressions and rarefactions moving out from a string',
      desc: 'After many vibrations, the string, shown at several positions as it swings left and right, has sent out a series of compressions (darker bands, solid lines) and rarefactions (paler bands, dashed lines) on both sides. Below, a graph of gauge pressure P_gauge versus distance x from the string is a sine wave: positive at compressions, negative at rarefactions, and only slightly different from atmospheric pressure for ordinary sounds.',
    });
    const xs = 330;
    const t = 2.15;
    const lam = 180;
    svg.still(() => {
      stringField(svg, xs, 50, 330, 20, 640, fromString(t, lam), {
        lineAt: bands(xs, t, lam, 20, 640),
      });
      for (const b of [-22, -12, 0, 12, 22]) bowedString(svg, xs, 52, 328, b, { width: 1.8 });
    });
    // For readers who allow motion, the string keeps swinging and the
    // compressions and rarefactions keep moving out, one wavelength per period.
    const P = 1.6;
    const dur = `${P}s`;
    svg.motionGroup(
      `${soundStrips(svg, xs, 50, 330, 20, 640, t, lam, -lam, 330, {
        dur,
        keyTimes: [0, 1],
        shift: [0, lam],
      })}${morph(
        Array.from({ length: 25 }, (_, k) =>
          svg.capture(() =>
            bowedString(svg, xs, 52, 328, 22 * Math.sin(2 * Math.PI * (t + k / 24)))
          )
        ),
        { dur }
      )}`
    );
    svg.arrow(xs - 4, 190, xs - 40, 190, { color: COLORS.black, width: 1.8, head: 11 });
    svg.arrow(xs + 4, 190, xs + 40, 190, { color: COLORS.black, width: 1.8, head: 11 });
    clamp(svg, xs, 40);
    clamp(svg, xs, 340);
    const g = new Plot(svg, {
      x: xs,
      y: 420,
      w: 300,
      h: 140,
      xRange: [0, 300],
      yRange: [-1.2, 1.2],
    });
    g.axes({ arrows: true, xAxisAt: 0 });
    const p = fromString(t, lam);
    svg.still(() =>
      g.fn(x => p(x, 1) ?? 0, 0, Math.min(300, t * lam), {
        color: COLORS.black,
        width: 2.5,
        n: 300,
      })
    );
    svg.add(
      `<defs><clipPath id="graph_17_01_04"><rect x="${g.X(0)}" y="${g.y - 10}" width="300" height="${g.h + 20}"/></clipPath></defs>`
    );
    svg.motionGroup(
      `<g clip-path="url(#graph_17_01_04)"><g>${svg.capture(() =>
        g.fn(x => p(x, 1), -lam, 300, { color: COLORS.black, width: 2.5, n: 360 })
      )}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" values="0 0;${lam} 0"/></g></g>`
    );
    lab(svg, g.X(0) - 8, g.Y(1), '+', { anchor: 'end' });
    lab(svg, g.X(0) - 8, g.Y(0), '0', { anchor: 'end' });
    lab(svg, g.X(0) - 8, g.Y(-1), '−', { anchor: 'end' });
    lab(svg, g.X(300) + 18, g.Y(0) + 4, 'x', { anchor: 'start' });
    lab(svg, g.X(0), g.Y(1.2) - 24, 'P_{gauge}');
    return svg.render();
  },

  // 17.2 Fig. 2 — sound from a tuning fork
  Figure_17_02_02: () => {
    const svg = new Svg({
      width: 760,
      height: 420,
      title: 'A sound wave from a tuning fork',
      desc: 'A tuning fork vibrating at frequency f sends out sound to both sides as curved bands of compression (solid arcs) and rarefaction (dashed arcs). The wave travels outward at speed v_w on each side, and the distance between neighboring compressions is the wavelength λ.',
    });
    const c = [380, 200];
    const lam = 52;
    const R = 270;
    // Shade at distance d, a fraction t of a period after the still.
    const shade = (d, t = 0) =>
      d < 20 ? 0.4 : 0.42 + 0.45 * Math.cos(2 * Math.PI * ((d - 20) / lam - t));
    const fill = radial(svg, ...c, R, u => shade(u * R));
    const wedge = (s, r0 = 0) => {
      const a = rad(36);
      const [cs, sn] = [s * Math.cos(a), Math.sin(a)];
      const sweep = s > 0 ? 1 : 0;
      return `M ${fmt(c[0] + r0 * cs)} ${fmt(c[1] - r0 * sn)} L ${fmt(c[0] + R * cs)} ${fmt(c[1] - R * sn)} A ${R} ${R} 0 0 ${sweep} ${fmt(c[0] + R * cs)} ${fmt(c[1] + R * sn)} L ${fmt(c[0] + r0 * cs)} ${fmt(c[1] + r0 * sn)} A ${r0} ${r0} 0 0 ${1 - sweep} ${fmt(c[0] + r0 * cs)} ${fmt(c[1] - r0 * sn)} Z`;
    };
    const front = (s, r) => {
      const t0 = rad(s > 0 ? -36 : 144);
      const t1 = t0 + rad(72);
      const P = a => `${fmt(c[0] + r * Math.cos(a))} ${fmt(c[1] - r * Math.sin(a))}`;
      return `M ${P(t0)} A ${fmt(Math.abs(r))} ${fmt(Math.abs(r))} 0 0 ${r > 0 ? 0 : 1} ${P(t1)}`;
    };
    svg.still(() => {
      for (const s of [-1, 1]) {
        svg.add(`<path d="${wedge(s)}" fill="${fill}"/>`);
        for (let k = 0; k < 5; k += 1) {
          for (const [off, dash] of [
            [0, undefined],
            [0.5, '6 5'],
          ]) {
            const r = 20 + (k + off) * lam + 6;
            if (r > R - 4) continue;
            const t0 = s > 0 ? -36 : 144;
            svg.arc(...c, r, t0, t0 + 72, { color: dash ? '#6a3d9a' : '#5d6fb3', width: 2, dash });
          }
        }
      }
    });
    // For readers who allow motion, the bands move out from the fork at v_w,
    // one wavelength per period: the shading's stops cycle through their
    // colors, and each front grows by λ before the next takes its place.
    const P = 1.2;
    const dur = `${P}s`;
    const n = 120;
    let stops = '';
    for (let k = 0; k <= n; k += 1) {
      const u = k / n;
      const colors = cycle(1, 12).map(t =>
        rgb(mix(AIR_LO, AIR_HI, Math.max(0, Math.min(1, shade(u * R, t)))))
      );
      stops += `<stop offset="${(u * 100).toFixed(2)}%" stop-color="${colors[0]}"><animate attributeName="stop-color" dur="${dur}" repeatCount="indefinite" values="${colors.join(';')}"/></stop>`;
    }
    let moving = `<defs><radialGradient id="air_17_02_02" gradientUnits="userSpaceOnUse" cx="${c[0]}" cy="${c[1]}" r="${R}">${stops}</radialGradient>`;
    for (const s of [-1, 1])
      moving += `<clipPath id="ring_17_02_02_${s > 0 ? 'r' : 'l'}"><path d="${wedge(s, 20)}"/></clipPath>`;
    moving += '</defs>';
    for (const s of [-1, 1]) {
      moving += `<path d="${wedge(s)}" fill="url(#air_17_02_02)"/>`;
      let fronts = '';
      for (let k = -1; k < 5; k += 1) {
        for (const [off, dash] of [
          [0, ''],
          [0.5, ' stroke-dasharray="6 5"'],
        ]) {
          const r = 20 + (k + off) * lam + 6;
          if (r > R - 4) continue;
          fronts += `<path d="${front(s, r)}" fill="none" stroke="${dash ? '#6a3d9a' : '#5d6fb3'}" stroke-width="2"${dash}><animate attributeName="d" dur="${dur}" repeatCount="indefinite" values="${front(s, r)};${front(s, r + lam)}"/></path>`;
        }
      }
      moving += `<g clip-path="url(#ring_17_02_02_${s > 0 ? 'r' : 'l'})">${fronts}</g>`;
    }
    svg.motionGroup(moving);
    for (const s of [-1, 1]) {
      svg.arrow(c[0] + s * (R + 10), c[1], c[0] + s * (R + 80), c[1], {
        color: COLORS.green,
        width: 4,
        head: 16,
      });
      lab(svg, c[0] + s * (R + 46), c[1] - 22, 'v_w');
    }
    fork(svg, c[0], c[1] + 50, { gap: 16, tine: 110, w: 14, stem: 90 });
    lab(svg, c[0] + 40, c[1] - 10, 'f', { anchor: 'start' });
    const r1 = 20 + 2 * lam + 6;
    dim(svg, c[0] + r1, c[0] + r1 + lam, c[1] - 40, 'λ');
    return svg.render();
  },

  // 17.2 Fig. 4 — a tweeter's short waves and a woofer's long ones
  Figure_17_02_04: () => {
    const svg = new Svg({
      width: 640,
      height: 520,
      title: 'Wavelengths from a tweeter and a woofer',
      desc: 'A loudspeaker cabinet with a small speaker, the tweeter, above a large one, the woofer. Sound waves leave both to the right, drawn as rings: solid rings are compressions and dashed rings rarefactions. The tweeter’s rings are closely spaced (high frequency, small wavelength); the woofer’s are about two and a half times farther apart (small frequency, large wavelength), since both travel at the same speed.',
    });
    svg.add(
      '<defs><linearGradient id="cab_side" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d4d6d9"/><stop offset="1" stop-color="#a9acb1"/></linearGradient><linearGradient id="cab_front" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a9da2"/><stop offset="1" stop-color="#7d8086"/></linearGradient><radialGradient id="cone" cx="0.45" cy="0.45" r="0.6"><stop offset="0" stop-color="#5c6068"/><stop offset="0.7" stop-color="#202226"/><stop offset="1" stop-color="#101113"/></radialGradient></defs>'
    );
    const edge = { stroke: '#3a3c40', width: 3 };
    svg.polygon(
      [
        [20, 110],
        [160, 30],
        [160, 505],
        [20, 440],
      ],
      { fill: 'url(#cab_side)', ...edge }
    );
    svg.polygon(
      [
        [160, 30],
        [300, 50],
        [300, 470],
        [160, 505],
      ],
      { fill: 'url(#cab_front)', ...edge }
    );
    // Drivers on the front face, foreshortened into ellipses.
    const driver = (x, y, rx, ry) => {
      svg.ellipse(x, y, rx, ry, { fill: 'url(#cone)', stroke: '#2a2c30', width: 2 });
      svg.ellipse(x - rx * 0.15, y - ry * 0.05, rx * 0.32, ry * 0.22, {
        fill: '#c9d3ea',
        stroke: '#8a96b4',
        width: 1.2,
      });
    };
    driver(232, 150, 36, 58);
    driver(232, 340, 52, 104);
    // Same speed, so wavelength ∝ 1/f: the woofer's is 2.5 times the tweeter's.
    // Solid rings are compressions, dashed rings the rarefactions between them.
    const ring = (x, cy, r, solid) =>
      svg.add(
        `<ellipse cx="${fmt(x)}" cy="${cy}" rx="${fmt(r * 0.36)}" ry="${r}" fill="none" stroke="${solid ? '#5b7fb8' : '#7a4fa6'}" stroke-width="${solid ? 3 : 2.4}"${solid ? '' : ' stroke-dasharray="7 5"'}/>`
      );
    const lamT = 40;
    for (let k = 0; k < 6; k += 1) ring(262 + (k * lamT) / 2, 150, 28 + 9 * k, k % 2 === 0);
    const lamW = 2.5 * lamT;
    for (let k = 0; k < 3; k += 1) ring(286 + (k * lamW) / 2, 340, 66 + 22 * k, k % 2 === 0);
    note(svg, 490, 62, 'High \\it{f}, small \\it{λ}', { size: 24 });
    note(svg, 490, 488, 'Small \\it{f}, large \\it{λ}', { size: 24 });
    return svg.render();
  },

  // 17.4 Fig. 2 — a moving source crowds its waves ahead of it
  Figure_17_04_03: () => {
    const svg = new Svg({
      width: 700,
      height: 450,
      title: 'Sound waves from a moving source',
      desc: 'A car drives to the right between two observers, X on the left and Y on the right. Its horn emitted a sound wave at each of the numbered points 1 to 5, and each wave spreads out as a circle centered on the point where it was emitted. The car has since moved on, so the circles are crowded together ahead of it, toward Y, and spread apart behind it, toward X. Y hears a shorter wavelength and a higher frequency, X a longer wavelength and a lower frequency. Faded copies of the car show where it was earlier.',
    });
    const G = 385;
    const hy = G - 97;
    // v_s = 0.6 v_w: the points are 27 px apart, the circles 45 px.
    const [step, ratio] = [27, 0.6];
    const xi = i => 312 + step * (i - 1);
    const now = 450;
    const Ri = i => (now - xi(i)) / ratio;
    svg.rect(0, G, 700, 14, { fill: '#d9c9a8' });
    svg.line(0, G, 700, G, { color: '#b8a47c', width: 2 });
    person(svg, 50, G, { hair: '#f2c94c', legs: '#7fa98c' });
    person(svg, 650, G, { hair: '#7a4a2a', legs: '#7fa98c', skirt: true });
    note(svg, 50, G + 40, 'X', { size: 26 });
    note(svg, 650, G + 40, 'Y', { size: 26 });
    svg.add(
      `<defs><clipPath id="air_17_04_03"><rect x="0" y="0" width="700" height="${G}"/></clipPath></defs>`
    );
    const wave = (i, r) =>
      svg.circle(xi(i), hy, r, { fill: 'none', stroke: '#9aa9c9', width: 2.2 });
    const mark = i => {
      svg.circle(xi(i), hy, 6, { fill: '#5b7fb8', stroke: '#2f4f86', width: 1.5 });
      note(svg, xi(i), hy - 20, String(i), { size: 17 });
    };
    const ringLabel = (i, r) =>
      note(svg, xi(i) + r * 0.34, hy - r * 0.94 + 14, String(i), { size: 18 });
    svg.still(() => {
      for (const x of [xi(1), xi(3)])
        svg.add(`<g opacity="0.3">${svg.capture(() => car(svg, x, G))}</g>`);
      svg.add(`<g clip-path="url(#air_17_04_03)">`);
      for (let i = 1; i <= 5; i += 1) wave(i, Ri(i));
      svg.add('</g>');
      car(svg, now, G);
      for (let i = 1; i <= 5; i += 1) {
        mark(i);
        ringLabel(i, Ri(i));
      }
    });
    // For readers who allow motion, the car drives in from the left, sending
    // out a wave at each numbered point; each wave spreads from where it was
    // sent, so the fronts bunch up ahead of the car and spread out behind it.
    const [hold, run, rest, fade] = [0.5, 4.4, 2.2, 0.4];
    const T = hold + run + rest + fade;
    const dur = `${fmt(T)}s`;
    const x0 = xi(1) - 60;
    const at = x => (hold + (run * (x - x0)) / (now - x0)) / T;
    const end = (hold + run) / T;
    let waves = '';
    for (let i = 1; i <= 5; i += 1) {
      const t = at(xi(i));
      waves += `<circle cx="${fmt(xi(i))}" cy="${hy}" r="0" fill="none" stroke="#9aa9c9" stroke-width="2.2">${smilAnimate('r', [0, 0, Ri(i), Ri(i)], { dur, keyTimes: [0, t, end, 1] })}</circle>`;
    }
    let marks = '';
    for (let i = 1; i <= 5; i += 1) {
      const t = at(xi(i));
      marks += `<g opacity="0">${smilAnimate('opacity', [0, 0, 1, 1], { dur, keyTimes: [0, t, t + 0.0001, 1] })}${svg.capture(() => mark(i))}</g>`;
      marks += `<g opacity="0">${smilAnimate('opacity', [0, 0, 1, 1], { dur, keyTimes: [0, end, end + 0.06, 1] })}${svg.capture(() => ringLabel(i, Ri(i)))}</g>`;
    }
    const drive = `<g>${svg.capture(() => car(svg, now, G))}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" keyTimes="0;${fmt(hold / T)};${fmt(end)};1" values="${x0 - now} 0;${x0 - now} 0;0 0;0 0"/></g>`;
    svg.motionGroup(
      `<g>${smilAnimate('opacity', [0, 1, 1, 0], { dur, keyTimes: [0, 0.3 / T, (T - fade) / T, 1] })}<g clip-path="url(#air_17_04_03)">${waves}</g>${drive}${marks}</g>`
    );
    return svg.render();
  },

  // 17.4 Fig. 5 — the Mach cone of a supersonic source
  Figure_17_04_05: () => {
    const svg = new Svg({
      width: 700,
      height: 460,
      title: 'Sound waves from a source moving faster than sound',
      desc: 'A source moving to the right at speed v_s greater than the speed of sound v_w emitted a sound wave at each of the numbered positions 1 to 6. Each wave is a circle centered on the point where it was emitted, and the source has moved ahead of all of them. The circles all touch two straight lines that meet at the source; along these lines, actually a cone in three dimensions, the waves interfere constructively to form a shock wave. The cone’s angle is θ, with sin(θ/2) = v_w/v_s, so a faster source makes a narrower cone.',
    });
    // v_s = 2.4 v_w keeps the cone narrow enough to enclose every wave front.
    const ratio = 2.4;
    const y = 230;
    const S = [640, y];
    const step = 52;
    const half = Math.asin(1 / ratio);
    const xi = i => S[0] - (7 - i) * step;
    const ar = 450;
    const cone = () => {
      // The cone's edges stop at the top and bottom of the figure, past the
      // points where they touch the circles.
      const len = (y - 12) / Math.sin(half);
      for (const s of [1, -1]) {
        svg.line(S[0], y, S[0] - len * Math.cos(half), y - s * len * Math.sin(half), {
          color: COLORS.maroon,
          width: 3,
        });
      }
      // The arc marking θ meets both edges of the cone inside the figure.
      svg.arc(...S, ar, 180 - (half * 180) / Math.PI, 180 + (half * 180) / Math.PI, {
        color: COLORS.black,
        width: 1.8,
      });
      lab(svg, S[0] - ar - 10, y - 40, 'θ', { anchor: 'end', size: 24 });
    };
    // Emitted (S − x)/v_s ago, so its radius is v_w times that.
    const Ri = i => (S[0] - xi(i)) / ratio;
    const ring = i => {
      const a = Math.PI / 2 + half;
      lab(svg, xi(i) + (Ri(i) + 14) * Math.cos(a), y - (Ri(i) + 14) * Math.sin(a), String(i), {
        size: 18,
        math: false,
      });
    };
    const mark = i => {
      svg.circle(xi(i), y, 6, { fill: COLORS.black });
      lab(svg, xi(i), y + 24, String(i), { size: 20, math: false });
    };
    const source = (x = S[0]) => {
      svg.arrow(x - 4, y, x + 30, y, { color: COLORS.green, width: 5, head: 18 });
      lab(svg, x - 6, y + 44, 'v_s > v_w', { anchor: 'start' });
      svg.circle(x, y, 6, { fill: COLORS.black });
    };
    const axis = () => svg.line(30, y, S[0], y, { color: COLORS.black, width: 1.2 });
    svg.still(() => {
      for (let i = 1; i <= 6; i += 1) {
        svg.circle(xi(i), y, Ri(i), { fill: 'none', stroke: '#7b4fa6', width: 2 });
        mark(i);
        ring(i);
      }
      cone();
      axis();
      source();
    });
    // For readers who allow motion, the source flies in from the left. Each
    // wave starts as it passes a numbered point and spreads at v_w, slower
    // than the source; once the source arrives, the cone along which they
    // pile up is drawn.
    const [hold, run, rest, fade] = [0.5, 3.6, 2.6, 0.4];
    const T = hold + run + rest + fade;
    const dur = `${fmt(T)}s`;
    const x0 = xi(1) - step / 2;
    const at = x => (hold + (run * (x - x0)) / (S[0] - x0)) / T;
    const end = (hold + run) / T;
    const appear = (t, o = 0.0001) =>
      smilAnimate('opacity', [0, 0, 1, 1], { dur, keyTimes: [0, t, t + o, 1] });
    let waves = '';
    for (let i = 1; i <= 6; i += 1) {
      const t = at(xi(i));
      waves += `<circle cx="${fmt(xi(i))}" cy="${y}" r="0" fill="none" stroke="#7b4fa6" stroke-width="2">${smilAnimate('r', [0, 0, Ri(i), Ri(i)], { dur, keyTimes: [0, t, end, 1] })}</circle>`;
      waves += `<g opacity="0">${appear(t)}${svg.capture(() => mark(i))}</g>`;
      waves += `<g opacity="0">${appear(end, 0.06)}${svg.capture(() => ring(i))}</g>`;
    }
    waves += `<g opacity="0">${appear(end, 0.06)}${svg.capture(cone)}</g>`;
    waves += `<g>${svg.capture(() => source())}<animateTransform attributeName="transform" type="translate" dur="${dur}" repeatCount="indefinite" keyTimes="0;${fmt(hold / T)};${fmt(end)};1" values="${fmt(x0 - S[0])} 0;${fmt(x0 - S[0])} 0;0 0;0 0"/></g>`;
    svg.motionGroup(
      `${svg.capture(axis)}<g>${smilAnimate('opacity', [0, 1, 1, 0], { dur, keyTimes: [0, 0.3 / T, (T - fade) / T, 1] })}${waves}</g>`
    );
    return svg.render();
  },

  // 17.4 Fig. 6 — the nose and tail booms reach the ground after the plane passes
  Figure_17_04_06: () => {
    const svg = new Svg({
      width: 780,
      height: 700,
      title: 'Two sonic booms from a supersonic aircraft',
      desc: 'A jet flies to the right faster than sound. Two shock-wave cones trail behind it, one from its nose and one from its tail, drawn as shaded wedges that reach down to the ground behind the plane. The observer on the left, inside both cones, has heard both booms and covers their ears. The observer in the middle has just been reached by the nose boom and throws up their arms. The observer on the right, ahead of both cones, has heard nothing yet and wonders what is happening, even though the plane is already past.',
    });
    const G = 600;
    // Mach 1.5: each cone's half-angle θ/2 has sin(θ/2) = vw/vs = 1/1.5.
    const t = Math.tan(Math.asin(1 / 1.5));
    const [nose, tail, y] = [740, 560, 150];
    const cone = apex => [
      [apex, y],
      [apex - y / t, 0],
      [0, 0],
      [0, G],
      [apex - (G - y) / t, G],
    ];
    svg.polygon(cone(nose), { fill: '#e3e6f3' });
    svg.polygon(cone(tail), { fill: '#c6cce6' });
    for (const [apex, color] of [
      [nose, '#9a8fc2'],
      [tail, '#7c6fae'],
    ])
      svg.polyline(
        [
          [apex - y / t, 0],
          [apex, y],
          [apex - (G - y) / t, G],
        ],
        { color, width: 2 }
      );
    svg.add(
      '<defs><linearGradient id="grass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b5d38a"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>'
    );
    svg.rect(0, G, 780, 100, { fill: 'url(#grass)' });
    // The jet spans the two apexes.
    const jet = { fill: '#80858c', stroke: '#4f545b', width: 1.4 };
    svg.polygon(
      [
        [tail - 10, y - 7],
        [nose - 60, y - 9],
        [nose, y],
        [nose - 60, y + 7],
        [tail - 4, y + 8],
      ],
      jet
    );
    svg.polygon(
      [
        [tail - 10, y - 7],
        [tail - 8, y - 40],
        [tail + 6, y - 40],
        [tail + 30, y - 8],
      ],
      jet
    );
    svg.polygon(
      [
        [tail + 50, y + 2],
        [tail + 120, y + 2],
        [tail + 70, y + 12],
        [tail + 40, y + 12],
      ],
      { ...jet, fill: '#6a6f76' }
    );
    svg.polygon(
      [
        [nose - 70, y - 8],
        [nose - 40, y - 5],
        [nose - 66, y - 2],
      ],
      { fill: '#c9d6e6', stroke: '#4f545b', width: 1 }
    );
    const person = (x, shirt, pants, pose) => {
      const hip = G - 36;
      const sh = G - 66;
      for (const s of [-1, 1])
        svg.line(x, hip, x + s * 7, G, { color: pants, width: 6, cap: 'round' });
      svg.line(x, hip, x, sh, { color: shirt, width: 12, cap: 'round' });
      const arm = {
        ears: [
          [14, -6],
          [9, -16],
        ],
        up: [
          [15, -14],
          [22, -30],
        ],
        hips: [
          [13, 12],
          [5, 22],
        ],
      }[pose];
      for (const s of [-1, 1])
        svg.polyline(
          [
            [x + s * 5, sh + 2],
            [x + s * arm[0][0], sh + arm[0][1]],
            [x + s * arm[1][0], sh + arm[1][1]],
          ],
          { color: shirt, width: 5 }
        );
      svg.circle(x, sh - 14, 8, { fill: '#f1c9a5', stroke: '#9b6b4a', width: 1 });
      svg.path(`M ${x - 8} ${sh - 15} Q ${x} ${sh - 28} ${x + 8} ${sh - 15}`, {
        color: '#2a2320',
        width: 4,
      });
    };
    person(36, '#8a62a8', '#b07c2c', 'ears');
    person(212, '#5f8f80', '#4f6fa8', 'up');
    person(418, '#d97a8c', '#e09a3a', 'hips');
    svg.text(418, 500, '?', { size: 34, math: false });
    return svg.render();
  },

  // 17.5 Figs. 3–5 — a pulse from a tuning fork going down a closed tube and back
  Figure_17_05_03: () =>
    pulseInTube({
      direction: -1,
      tip: 0.98,
      spread: 1,
      title: 'A disturbance from a tuning fork moving down a tube closed at one end',
      desc: 'A tuning fork stands at the open right end of a tube closed at its left end. Its tines spread apart, and the disturbance it creates, shaded, moves to the left down the tube.',
    }),
  Figure_17_05_04: () =>
    pulseInTube({
      direction: 1,
      tip: 0.02,
      spread: 0,
      title: 'The disturbance reflecting from the closed end of the tube',
      desc: 'The disturbance reaches the closed left end of the tube and reflects, moving back to the right toward the tuning fork at the open end.',
    }),
  Figure_17_05_05: () =>
    pulseInTube({
      direction: 1,
      tip: 0.02,
      reach: 0.98,
      spread: -1,
      title: 'The reflected disturbance returning to the tuning fork',
      desc: 'The reflected disturbance reaches the open end just as the tuning fork’s tines move together, half a cycle after it was sent. If the tube’s length L is just right, it interferes constructively with the continuing sound from the fork, a standing wave forms, and the air column resonates.',
    }),

  // 17.5 Fig. 6 — the fundamental of a closed tube
  Figure_17_05_06: () => closedTubeSeries(),

  // 17.5 Fig. 9 — the same four modes, repeated with the overtones discussion
  Figure_17_05_09: () => closedTubeSeries(),

  // 17.5 Fig. 7 — the same standing wave, driven near the closed end
  Figure_17_05_07: () => {
    const svg = new Svg({
      width: 820,
      height: 500,
      title: 'The same standing wave driven near the closed end of the tube',
      desc: 'Top: a tube of length L, closed at its left end, with its air in the fundamental mode: no displacement at the closed end and the most at the open end. The tube holds a quarter of a wavelength, λ/4; the rest of the wave, dashed, continues beyond the open end. Below: the same tube with a vibrating tuning fork held over a small hole near its closed end produces the same standing wave, again a quarter wavelength in the tube.',
    });
    const L = 220;
    const x0 = 30;
    tubeMode(svg, x0, x0 + L, 90, 80, u => Math.sin((Math.PI / 2) * u));
    const pts = [];
    const pts2 = [];
    for (let k = 0; k <= 120; k += 1) {
      const u = 1 + (3 * k) / 120;
      const x = x0 + u * L;
      pts.push([x, 90 - 37 * Math.sin((Math.PI / 2) * u)]);
      pts2.push([x, 90 + 37 * Math.sin((Math.PI / 2) * u)]);
    }
    svg.polyline(pts, { color: ENVELOPE, width: 2, dash: '7 6' });
    svg.polyline(pts2, { color: ENVELOPE, width: 2, dash: '7 6' });
    dim(svg, x0, x0 + L, 30, 'L');
    dim(svg, x0, x0 + L, 158, 'λ/4', { below: true });
    // Fork over a hole near the closed end, and the bigger tube.
    const bx = 290;
    const BL = 420;
    tubeMode(svg, bx, bx + BL, 380, 170, u => Math.sin((Math.PI / 2) * u));
    svg.rect(bx + 30, 284, 34, 14, { fill: TUBE, stroke: TUBE_EDGE, width: 1.2 });
    svg.path(
      'M 330 216 L 470 216 Q 500 216 500 232 L 640 232 Q 652 232 652 240 Q 652 248 640 248 L 500 248 Q 500 264 470 264 L 330 264 L 330 252 L 470 252 Q 482 252 482 240 Q 482 228 470 228 L 330 228 Z',
      {
        color: FORK_EDGE,
        width: 1.5,
        fill: FORK,
      }
    );
    for (const yy of [210, 270])
      svg.arrow(350, yy - 18, 350, yy + 18, {
        color: COLORS.black,
        width: 1.6,
        head: 10,
        start: true,
      });
    dim(svg, bx, bx + BL, 490, 'λ/4');
    return svg.render();
  },

  // 17.5 Fig. 8 — the first overtone of a closed tube
  Figure_17_05_08: () => {
    const svg = new Svg({
      width: 640,
      height: 380,
      title: 'The first overtone of a tube closed at one end',
      desc: 'A tube of length L closed at its left end, with its air in the first overtone: no displacement at the closed end, a node a third of the way from the open end, and the most displacement at the open end. Three quarters of a wavelength fit in the tube, (3/4)λ′ = L, so λ′ = 4L/3; the dashed curve continues the wave beyond the open end.',
    });
    const x0 = 40;
    const L = 450;
    tubeMode(svg, x0, x0 + L, 190, 150, u => Math.abs(Math.sin(((3 * Math.PI) / 2) * u)));
    const pts = [];
    const pts2 = [];
    for (let k = 0; k <= 40; k += 1) {
      const u = 1 + (1 / 3) * (k / 40);
      const x = x0 + u * L;
      pts.push([x, 190 - 69 * Math.abs(Math.sin(((3 * Math.PI) / 2) * u))]);
      pts2.push([x, 190 + 69 * Math.abs(Math.sin(((3 * Math.PI) / 2) * u))]);
    }
    svg.polyline(pts, { color: ENVELOPE, width: 2.4, dash: '8 6' });
    svg.polyline(pts2, { color: ENVELOPE, width: 2.4, dash: '8 6' });
    for (const x of [x0, x0 + L]) svg.line(x, 30, x, 350, { color: COLORS.black, width: 1.6 });
    dim(svg, x0, x0 + L, 60, 'L', { size: 28 });
    dim(svg, x0, x0 + L, 320, '¾λ′', { size: 28, below: true });
    return svg.render();
  },

  // 17.5 Fig. 11 — modes of a tube open at both ends
  Figure_17_05_11: () => {
    const svg = new Svg({
      width: 1160,
      height: 300,
      title: 'Resonances of a tube open at both ends',
      desc: 'Four tubes of length L open at both ends, each with its air displacement largest at both ends. Fundamental: half a wavelength fits, λ1 = 2L and f1 = v/2L. First overtone: λ2 = L, f2 = v/L. Second overtone: λ3 = 2L/3, f3 = 3v/2L. Third overtone: λ4 = L/2, f4 = 2v/L.',
    });
    const W = 250;
    const modes = [
      ['Fundamental', 'λ_1 = 2L', 'f_1 = v/2L', '½λ_1'],
      ['First overtone', 'λ_2 = L', 'f_2 = v/L', 'λ_2'],
      ['Second overtone', 'λ_3 = 2L/3', 'f_3 = 3v/2L', 'λ_3'],
      ['Third overtone', 'λ_4 = L/2', 'f_4 = 2v/L', 'λ_4'],
    ];
    modes.forEach(([name, lam, f, seg], i) => {
      const n = i + 1;
      const x0 = 20 + i * (W + 40);
      tubeMode(svg, x0, x0 + W, 110, 70, u => Math.abs(Math.cos(n * Math.PI * u)), {
        closedLeft: false,
      });
      airParcels(svg, x0, x0 + W, 110, 70, u => Math.cos(n * Math.PI * u), fmt(3.2 / n));
      dim(svg, x0, x0 + W, 50, 'L');
      const one = W / (n === 1 ? 1 : n / 2);
      dim(svg, x0, x0 + Math.min(W, one), 170, seg, { below: true });
      note(svg, x0 + W / 2, 236, name);
      lab(svg, x0 + 60, 272, lam, { size: 19 });
      lab(svg, x0 + 190, 272, f, { size: 19 });
    });
    return svg.render();
  },

  // 17.6 Fig. 2 — equal-loudness curves
  Figure_17_06_02: () => {
    const svg = new Svg({
      width: 960,
      height: 680,
      title: 'Equal-loudness curves',
      desc: 'Sound intensity level in decibels versus frequency on a logarithmic scale from 20 Hz to 20 000 Hz, with thirteen equal-loudness curves from 0 to 120 phons in steps of 10. Every sound on one curve seems equally loud. At 1000 Hz each curve passes through the decibel value equal to its phon number. The curves dip lowest near 3000 to 4000 Hz, where the ear is most sensitive, and rise steeply at low frequencies; the 0-phon curve, the threshold of hearing, is about 37 dB at 100 Hz and about −7 dB near 3500 Hz. The curves flatten out at high loudness.',
    });
    const g = logPlot(svg, { x: 100, y: 30, w: 700, h: 540 }, [-12, 132]);
    const fTicks = [
      20, 40, 50, 60, 80, 100, 200, 400, 500, 600, 800, 1000, 2000, 4000, 5000, 6000, 8000, 10000,
      20000,
    ];
    for (const f of fTicks)
      svg.line(g.X(Math.log10(f)), g.Y(-12), g.X(Math.log10(f)), g.Y(132), {
        color: '#c8c8c8',
        width: 1,
        dash: '5 4',
      });
    for (let d = -10; d <= 130; d += 10)
      svg.line(g.X(Math.log10(20)), g.Y(d), g.X(Math.log10(20000)), g.Y(d), {
        color: '#c8c8c8',
        width: 1,
        dash: '5 4',
      });
    g.axes({ arrows: true, xAxisAt: -12 });
    for (const d of [-10, 0, 20, 40, 60, 80, 100, 120])
      note(svg, g.X(Math.log10(20)) - 10, g.Y(d), d < 0 ? `−${-d}` : String(d), {
        anchor: 'end',
        size: 18,
      });
    const show = {
      20: '20',
      50: '50',
      100: '100',
      200: '200',
      500: '500',
      1000: '1000',
      2000: '2000',
      5000: '5000',
      10000: '10 000',
      20000: '20 000',
    };
    for (const [f, t] of Object.entries(show))
      note(svg, g.X(Math.log10(Number(f))), g.Y(-12) + 22, t, { size: 16 });
    note(svg, g.X(Math.log10(632)), g.Y(-12) + 56, 'Frequency f (Hz)', { size: 19 });
    svg.text(40, g.Y(60), 'Sound level (dB)', { size: 19, math: false, rotate: -90 });
    for (let L = 0; L <= 120; L += 10) {
      loudnessCurve(g, L, { color: CURVE, width: 2.4 });
      const last = LOUDNESS[String(L)].at(-1);
      note(svg, g.X(Math.log10(last[0])) + 8, g.Y(last[1]), `${L} phon`, {
        anchor: 'start',
        size: 16,
      });
    }
    return svg.render();
  },

  // 17.6 Fig. 3 — the speech region and hearing-loss thresholds
  Figure_17_06_03: () => {
    const svg = new Svg({
      width: 820,
      height: 560,
      title: 'Conversational speech and the 0, 40 and 60 phon curves',
      desc: 'Intensity level in decibels versus frequency, with the 0-phon curve (the normal threshold of hearing) and the 40- and 60-phon curves from the equal-loudness graph. A shaded band shows where conversational speech lies: from about 200 Hz at 50 to 60 dB down to about 4000 Hz at 35 to 45 dB. All of it is above the 0-phon threshold. Much of it is below the 40-phon curve at the higher frequencies, and nearly all of it is below the 60-phon curve, so a person with a 40-phon loss misses the higher speech frequencies and a person with a 60-phon loss hears almost none of normal speech.',
    });
    const g = logPlot(svg, { x: 100, y: 30, w: 640, h: 440 }, [-20, 125]);
    g.axes({ arrows: true, xAxisAt: -20 });
    for (const d of [-20, 0, 20, 40, 60, 80, 100, 120]) {
      svg.line(g.X(Math.log10(20)) - 5, g.Y(d), g.X(Math.log10(20)), g.Y(d), {
        color: COLORS.black,
        width: 1.2,
      });
      note(svg, g.X(Math.log10(20)) - 10, g.Y(d), d < 0 ? `−${-d}` : String(d), {
        anchor: 'end',
        size: 17,
      });
    }
    for (const f of [62.5, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]) {
      const x = g.X(Math.log10(f));
      svg.line(x, g.Y(-20), x, g.Y(-20) - 6, { color: COLORS.black, width: 1.2 });
      note(svg, x, g.Y(-20) + (f === 2000 || f === 8000 ? 40 : 20), String(f), { size: 16 });
    }
    note(svg, g.X(Math.log10(632)), g.Y(-20) + 72, 'Frequency f (Hz)', { size: 19 });
    svg.text(36, g.Y(50), 'Intensity level (dB)', { size: 19, math: false, rotate: -90 });
    // Speech region, in (log f, dB).
    const speech = [
      [200, 58],
      [300, 61],
      [500, 60],
      [800, 56],
      [1500, 49],
      [2500, 44],
      [3800, 42],
      [4200, 37],
      [3000, 34],
      [1500, 37],
      [800, 44],
      [400, 51],
      [220, 54],
    ].map(([f, d]) => g.P(Math.log10(f), d));
    svg.polygon(speech, { fill: '#c9cede' });
    for (const [L, color, at, dy] of [
      [0, '#5b2a86', 70, -18],
      [40, '#3f9a2b', 60, 22],
      [60, '#e0603a', 100, -18],
    ]) {
      loudnessCurve(g, L, { color, width: 3 });
      const P = g.P(Math.log10(at), LOUDNESS[String(L)].find(([f]) => f >= at)[1]);
      note(svg, P[0] + 10, P[1] + dy, `${L} phon`, { anchor: 'start', size: 18, color });
    }
    note(svg, g.X(Math.log10(2500)), 80, 'Conversational', { size: 18 });
    note(svg, g.X(Math.log10(2500)), 102, 'speech distribution', { size: 18 });
    svg.leader(g.X(Math.log10(2400)), 114, g.X(Math.log10(1600)), g.Y(45), {
      bend: 0.3,
      width: 1.4,
    });
    return svg.render();
  },

  // 17.6 Fig. 4 — three audiograms
  Figure_17_06_04: () => {
    const svg = new Svg({
      width: 760,
      height: 1180,
      title: 'Audiograms of three people',
      desc: 'Hearing threshold level, in decibels relative to the normal threshold and increasing downward, versus frequency from 250 to 8000 Hz, for the right ear (circles) and left ear (diamonds). Top: normal hearing, with both ears within about 5 dB of 0 at every frequency. Middle: a child who suffered hearing loss from a cap gun, with normal thresholds except a sharp dip to about 55 dB at 4000 Hz in both ears. Bottom: presbycusis, age-related hearing loss, with thresholds that worsen steadily with frequency, reaching about 30 to 40 dB at 4000 Hz and 55 to 60 dB at 8000 Hz; brackets show the bone-conduction thresholds.',
    });
    audiogram(svg, { x: 110, y: 30, w: 600, h: 260 }, [5, 5, 0, 0, 0, 0], [5, 0, 0, 5, 3, 5], {
      legend: true,
    });
    audiogram(svg, { x: 110, y: 420, w: 600, h: 260 }, [5, 5, 0, 0, 55, 0], [5, 0, 0, 5, 55, 5]);
    audiogram(
      svg,
      { x: 110, y: 810, w: 600, h: 260 },
      [6, 6, 0, 10, 30, 60],
      [0, 0, 10, 15, 40, 55],
      {
        legend: true,
        bone: [
          [2, 6, 8, 18, 38, 54],
          [5, 0, 2, 12, 31, 54],
        ],
      }
    );
    return svg.render();
  },

  // 17.6 Fig. 6 — the middle ear as a lever
  Figure_17_06_06: () => {
    const svg = new Svg({
      width: 760,
      height: 640,
      title: 'The middle ear’s lever system',
      desc: 'Pressure P1 on the eardrum, of area A1, produces a force F1 = P1A1 on the hammer. The hammer, anvil and stirrup act as a lever pivoted at the top and at the joint between the anvil and the stirrup, so the force F2 delivered by the stirrup to the oval window is larger than F1. The oval window’s area A2 is much smaller than the eardrum’s, so the pressure it creates in the inner ear, P2 = F2/A2, is larger than P1: since F2 > F1 and A2 < A1, P2 > P1.',
    });
    const P = '#6a3d9a';
    const F = '#e0245e';
    svg.rect(250, 22, 140, 26, { fill: '#c3c4c8' });
    svg.line(250, 48, 390, 48, { color: P, width: 2 });
    const top = [320, 48];
    const joint = [320, 285];
    svg.circle(...top, 6, { fill: COLORS.black });
    svg.circle(...joint, 6, { fill: COLORS.black });
    svg.polyline([top, [320, 500], [200, 500]], { color: P, width: 3 });
    svg.line(...joint, 450, 285, { color: P, width: 3 });
    svg.line(200, 430, 200, 580, { color: P, width: 3 });
    svg.line(450, 240, 450, 330, { color: P, width: 3 });
    svg.arrow(110, 505, 190, 505, { color: P, width: 6, head: 22 });
    svg.arrow(212, 475, 280, 475, { color: F, width: 5, head: 18 });
    svg.arrow(330, 300, 440, 300, { color: F, width: 5, head: 18 });
    svg.arrow(462, 285, 720, 285, { color: P, width: 6, head: 22 });
    lab(svg, 98, 505, '**P**_1', { anchor: 'end' });
    lab(svg, 290, 475, '**F**_1', { anchor: 'start' });
    lab(svg, 370, 330, '**F**_2');
    lab(svg, 600, 312, '**P**_2');
    lab(svg, 200, 408, '\\rm{A}_1');
    lab(svg, 450, 218, '\\rm{A}_2');
    lab(svg, 200, 620, 'F_1 = P_1A_1');
    lab(svg, 450, 360, 'P_2 = F_2/A_2');
    note(svg, 150, 380, 'Eardrum', { size: 22 });
    svg.leader(150, 394, 196, 440, { bend: 0.3, width: 1.4 });
    note(svg, 250, 560, 'Hammer', { anchor: 'start', size: 22 });
    svg.leader(248, 548, 230, 504, { bend: -0.3, width: 1.4 });
    note(svg, 380, 450, 'Anvil', { anchor: 'start', size: 22 });
    svg.leader(378, 438, 326, 410, { bend: -0.3, width: 1.4 });
    note(svg, 340, 196, 'Stirrup', { anchor: 'start', size: 22 });
    svg.leader(372, 212, 392, 280, { bend: 0.3, width: 1.4 });
    note(svg, 530, 230, 'Oval window', { anchor: 'start', size: 22 });
    svg.leader(528, 236, 456, 250, { bend: 0.3, width: 1.4 });
    note(svg, 160, 170, 'Pivots', { size: 22 });
    svg.leader(180, 156, 314, 54, { bend: -0.3, width: 1.4 });
    svg.leader(180, 186, 314, 280, { bend: 0.3, width: 1.4 });
    lab(svg, 560, 560, 'F_2 > F_1 \\rm{and} A_2 < A_1', { size: 21 });
    svg.arrow(470, 600, 540, 600, { color: F, width: 3, head: 14 });
    lab(svg, 552, 600, 'P_2 > P_1', { anchor: 'start', size: 21 });
    return svg.render();
  },
};

/** 17.5 Figs. 3–5: a tuning fork at the open end of a closed tube, with its pulse. */
/**
 * A red sports car seen from its left side, driving right, with its horn at
 * (x, ground − 97): the point the waves of 17.4 Fig. 2 come from.
 */
function car(svg, x, ground) {
  const k = 0.8;
  const P = (dx, dy) => `${fmt(x + k * dx)} ${fmt(ground + dy)}`;
  svg.path(
    `M ${P(-200, -26)} L ${P(-204, -78)} L ${P(-150, -88)} L ${P(-70, -96)} Q ${P(-20, -122)} ${P(40, -98)} L ${P(120, -72)} L ${P(178, -62)} Q ${P(196, -50)} ${P(190, -30)} L ${P(184, -24)} Z`,
    { color: '#6d1018', width: 2, fill: '#b5232f' }
  );
  svg.path(`M ${P(-60, -94)} Q ${P(-18, -116)} ${P(30, -97)} L ${P(66, -84)} L ${P(-60, -84)} Z`, {
    color: '#6d1018',
    width: 1.5,
    fill: '#dfe9f2',
  });
  svg.line(x - k * 196, ground - 58, x + k * 176, ground - 50, { color: '#ffffff', width: 3 });
  for (const dx of [-120, 124]) {
    svg.circle(x + k * dx, ground - 22, 24, { fill: '#2b2b2e' });
    svg.circle(x + k * dx, ground - 22, 12, { fill: '#c9cbd0', stroke: '#6f7278', width: 1.5 });
  }
}

/** A standing observer with feet at (x, ground). */
function person(svg, x, ground, { hair, legs, skirt = false }) {
  const skin = '#f2c9a0';
  if (skirt) {
    svg.polygon(
      [
        [x - 12, ground - 70],
        [x + 12, ground - 70],
        [x + 20, ground - 44],
        [x - 20, ground - 44],
      ],
      { fill: legs }
    );
    for (const dx of [-7, 7])
      svg.line(x + dx, ground - 44, x + dx, ground - 4, { color: skin, width: 6 });
  } else {
    for (const dx of [-7, 7])
      svg.line(x + dx, ground - 70, x + dx, ground - 4, { color: legs, width: 11 });
  }
  for (const dx of [-8, 8]) svg.rect(x + dx - 7, ground - 6, 14, 6, { fill: '#555555', rx: 2 });
  svg.rect(x - 16, ground - 116, 32, 48, { fill: '#ffffff', stroke: '#9a9a9a', width: 1.2, rx: 6 });
  for (const dx of [-21, 21])
    svg.line(x + dx, ground - 110, x + dx, ground - 74, { color: skin, width: 7 });
  svg.circle(x, ground - 132, 14, { fill: skin });
  svg.path(
    `M ${x - 15} ${ground - 132} Q ${x} ${ground - 158} ${x + 15} ${ground - 132} Q ${x} ${ground - 142} ${x - 15} ${ground - 132} Z`,
    {
      color: hair,
      width: 1,
      fill: hair,
    }
  );
}

function pulseInTube({ direction, tip, reach = 0.55, spread, title, desc }) {
  const svg = new Svg({ width: 760, height: 360, title, desc });
  const x0 = 30;
  const x1 = 470;
  const yc = 150;
  const h = 180;
  tube(svg, x0, x1, yc, h);
  // The pulse is a wedge from its tip to its front, shaded darker toward the front.
  const L = x1 - x0;
  const tipX = x0 + tip * L;
  const frontX = direction < 0 ? x0 + (tip - 0.62) * L : x0 + reach * L;
  const fill = gradient(svg, u => (direction < 0 ? 1 - u : u) * 0.9, {
    lo: [250, 250, 250],
    hi: [126, 146, 205],
    n: 60,
  });
  const wedge = (a, b) =>
    `<path d="M ${fmt(a)} ${yc} Q ${fmt((a + b) / 2)} ${yc - h * 0.4} ${fmt(b)} ${yc - h * 0.42} Q ${fmt(b - direction * 10)} ${yc} ${fmt(b)} ${yc + h * 0.42} Q ${fmt((a + b) / 2)} ${yc + h * 0.4} ${fmt(a)} ${yc} Z" fill="${fill}" stroke="#7d8cc4" stroke-width="1.2"/>`;
  const fx = 640;
  const fy = 210;
  const tines = { gap: 30, tine: 170, w: 22, stem: 120 };
  // For readers who allow motion, the pulse runs along the tube to where the
  // still figure has it: in from the open end (spread > 0), back from the
  // closed end (spread 0), or on to the open end (spread < 0), while the
  // fork's tines move apart or together.
  const [from, to] =
    spread > 0
      ? [
          [tipX + (x1 - frontX), x1],
          [tipX, frontX],
        ]
      : spread === 0
        ? [
            [tipX - (frontX - x0), x0],
            [tipX, frontX],
          ]
        : [
            [tipX, x0 + 0.55 * L],
            [tipX, frontX],
          ];
  svg.add(
    `<defs><clipPath id="tube_${title.length}_${spread}"><rect x="${x0}" y="${yc - h / 2}" width="${L}" height="${h}"/></clipPath></defs>`
  );
  const open = 8;
  svg.animatedOnce(
    (f, moving, shown) => {
      if (!moving) {
        svg.add(wedge(tipX, frontX));
        fork(svg, fx, fy, tines);
        return;
      }
      const at = k => from[k] + (to[k] - from[k]) * f;
      svg.add(`<g opacity="${shown}"><g clip-path="url(#tube_${title.length}_${spread})">`);
      svg.add(wedge(at(0), at(1)));
      svg.add('</g></g>');
      const sp = spread > 0 ? open * f : spread < 0 ? open * (1 - f) : 0;
      fork(svg, fx, fy, { ...tines, spread: sp });
    },
    Array.from({ length: 25 }, (_, k) => k / 24),
    { run: 2.2, hold: 0.6 }
  );
  if (direction < 0)
    svg.arrow(x0 + 0.9 * L, yc, x0 + 0.62 * L, yc, { color: COLORS.black, width: 2, head: 15 });
  else
    svg.arrow(frontX + 6, yc, frontX + (reach > 0.9 ? 90 : 70), yc, {
      color: COLORS.black,
      width: 2,
      head: 15,
    });
  if (spread > 0) {
    svg.arrow(fx - 34, 70, fx - 140, 70, { color: COLORS.black, width: 2, head: 15 });
    svg.arrow(fx + 34, 70, fx + 110, 70, { color: COLORS.black, width: 2, head: 15 });
  } else if (spread < 0) {
    svg.arrow(fx - 120, 70, fx - 46, 70, { color: COLORS.black, width: 2, head: 15 });
    svg.arrow(fx + 110, 70, fx + 46, 70, { color: COLORS.black, width: 2, head: 15 });
  }
  if (reach > 0.9) dim(svg, x0, x1, 300, 'L', { below: true });
  return svg.render();
}

/** 17.5 Figs. 6 and 9: the fundamental and first three overtones of a closed tube. */
function closedTubeSeries() {
  const svg = new Svg({
    width: 1160,
    height: 300,
    title: 'Resonances of a tube closed at one end',
    desc: 'Four tubes of length L closed at the left end, each with no air displacement at the closed end and the most at the open end. Fundamental: a quarter wavelength fits, λ1 = 4L, f1 = v/4L. First overtone: three quarters of a wavelength, λ2 = 4L/3, f2 = 3v/4L. Second overtone: λ3 = 4L/5, f3 = 5v/4L. Third overtone: λ4 = 4L/7, f4 = 7v/4L.',
  });
  const W = 250;
  const modes = [
    ['Fundamental', 'λ_1 = 4L', 'f_1 = v/4L', '¼λ_1'],
    ['First overtone', 'λ_2 = 4L/3', 'f_2 = 3v/4L', '¾λ_2'],
    ['Second overtone', 'λ_3 = 4L/5', 'f_3 = 5v/4L', 'λ_3'],
    ['Third overtone', 'λ_4 = 4L/7', 'f_4 = 7v/4L', 'λ_4'],
  ];
  modes.forEach(([name, lam, f, seg], i) => {
    const m = 2 * i + 1;
    const x0 = 20 + i * (W + 40);
    tubeMode(svg, x0, x0 + W, 110, 70, u => Math.abs(Math.sin(((m * Math.PI) / 2) * u)));
    // The air swings most at the open end and not at all at the closed one,
    // m times as often as in the fundamental.
    airParcels(svg, x0, x0 + W, 110, 70, u => Math.sin(((m * Math.PI) / 2) * u), fmt(3.2 / m));
    dim(svg, x0, x0 + W, 170, 'L', { below: true });
    const span = i === 0 || i === 1 ? W : (4 * W) / m;
    dim(svg, x0, x0 + span, 50, seg);
    note(svg, x0 + W / 2, 236, name);
    lab(svg, x0 + 60, 272, lam, { size: 19 });
    lab(svg, x0 + 190, 272, f, { size: 19 });
  });
  return svg.render();
}
