/**
 * Geometric sketches in chapters 3–9 that were drawn as raster line art: the
 * cabin-to-lake displacement, the dipole field, rough surfaces, the sheared
 * nail, the vinyl record, Earth–Moon orbits and tides, path-dependent erasing,
 * the sliding player on a 5° slope, and the hockey-stick equilibrium and torque
 * diagrams.
 */
import { pointLines, signedCharge } from './ch18.js';
import { COLORS, Svg, rad, smoothPath, splineSegments } from './svg.js';

const FORCE = '#d52350';
const FORCE_LIGHT = '#ef7f8f';
const TURN = '#7b1d4f';
const SPIN = '#1b9ad6';
const VELOCITY = '#4aa52e';
const INK = COLORS.black;
const GUIDE = { color: COLORS.guide, width: 1.4, dash: '6 5' };

function group(svg, id, draw) {
  svg.add(`<g id="${id}">`);
  draw();
  svg.add('</g>');
}

function note(svg, x, y, s, o = {}) {
  svg.text(x, y, s, { size: 20, math: false, ...o });
}

/** Point at angle a (degrees, counterclockwise from +x with y up) on a circle. */
function polar(cx, cy, r, a) {
  return [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
}

/** Circular arc from a1 to a2 (either sense) with an arrowhead at a2. */
function arcArrow(svg, cx, cy, r, a1, a2, { color = TURN, width = 3, head = 16 } = {}) {
  const n = 48;
  const pts = Array.from({ length: n + 1 }, (_, k) => polar(cx, cy, r, a1 + ((a2 - a1) * k) / n));
  const back = (Math.sign(a2 - a1) * (1.8 * head * 180)) / (Math.PI * r);
  svg.polyline(
    [
      ...pts.filter((_, k) => Math.abs(((a2 - a1) * k) / n) < Math.abs(a2 - a1) - Math.abs(back)),
      polar(cx, cy, r, a2 - back),
    ],
    { color, width }
  );
  svg.arrow(...polar(cx, cy, r, a2 - back), ...polar(cx, cy, r, a2), { color, width, head });
}

/** Points along the spline that `smoothPath` draws through `points`. */
function splinePoints(points, n = 24) {
  const out = [];
  for (const [p1, c1, c2, p2] of splineSegments(points)) {
    for (let j = 0; j < n; j += 1) {
      const s = j / n;
      const u = 1 - s;
      out.push(
        [0, 1].map(
          i => u * u * u * p1[i] + 3 * u * u * s * c1[i] + 3 * u * s * s * c2[i] + s ** 3 * p2[i]
        )
      );
    }
  }
  out.push(points.at(-1));
  return out;
}

/** Arrowhead along a sampled curve at fraction `at` of its samples. */
function curveArrow(svg, pts, at, { color = INK, width = 2, head = 14 } = {}) {
  const k = Math.max(2, Math.min(pts.length - 3, Math.floor(pts.length * at)));
  svg.arrow(...pts[k - 2], ...pts[k + 2], { color, width, head });
}

// ---------------------------------------------------------------------------
// 3.2: cabin to lake

function tree(svg, x, y, s = 1) {
  svg.rect(x - 3 * s, y - 8 * s, 6 * s, 10 * s, { fill: '#7a5a3a' });
  for (const [dy, w] of [
    [0, 17],
    [-14, 13],
    [-26, 9],
  ]) {
    svg.polygon(
      [
        [x - w * s, y - 6 * s + dy * s],
        [x + w * s, y - 6 * s + dy * s],
        [x, y - 26 * s + dy * s],
      ],
      { fill: '#5d9b78', stroke: '#3f7558', width: 1 }
    );
  }
}

function cabin(svg, x, y) {
  svg.rect(x, y - 52, 92, 52, { fill: '#c9733f', stroke: '#7c3f1d', width: 1.5 });
  for (let k = 1; k < 6; k += 1) {
    svg.line(x, y - 52 + k * 8.7, x + 92, y - 52 + k * 8.7, { color: '#8e4a24', width: 1.2 });
  }
  svg.polygon(
    [
      [x - 8, y - 50],
      [x + 46, y - 82],
      [x + 100, y - 50],
    ],
    { fill: '#9b4f2a', stroke: '#6b3015', width: 1.5 }
  );
  svg.rect(x + 36, y - 34, 20, 34, { fill: '#6b3a1d' });
}

function cabinToLake() {
  const svg = new Svg({
    width: 800,
    height: 440,
    title: 'Two paths from a cabin to a lake with one displacement',
    desc: 'A cabin sits at the origin of x–y axes, with north up. The displacement vector S, 5.0 km long, points 40° north of east to a lake. Path 1 wanders east below and across S before reaching the lake; Path 2 loops north and over the top. Both paths have the same displacement S.',
  });
  const O = [200, 380];
  const E = polar(...O, 400, 40);
  svg.ellipse(E[0] + 20, E[1] - 12, 72, 24, { fill: '#9fd5ee', stroke: '#6aaed0', width: 1.5 });
  for (const [x, y, s] of [
    [335, 362, 0.9],
    [365, 374, 1],
    [395, 360, 0.85],
    [550, 245, 0.85],
    [577, 228, 1],
  ]) {
    tree(svg, x, y, s);
  }
  const path1 = splinePoints([
    O,
    [270, 300],
    [380, 270],
    [470, 320],
    [590, 300],
    [625, 200],
    [560, 130],
    E,
  ]);
  const path2 = splinePoints([O, [130, 230], [175, 95], [330, 45], [520, 40], [615, 80], E]);
  for (const pts of [path1, path2]) {
    svg.polyline(pts, { color: INK, width: 2 });
    curveArrow(svg, pts, 0.55);
  }
  cabin(svg, O[0] - 135, O[1] + 30);
  svg.arrow(...O, O[0] + 85, O[1], { color: INK, width: 1.8, head: 12 });
  svg.arrow(...O, O[0], O[1] - 85, { color: INK, width: 1.8, head: 12 });
  svg.text(O[0] + 98, O[1] + 4, 'x', { size: 22 });
  svg.text(O[0] - 14, O[1] - 92, 'y', { size: 22 });
  group(svg, 'displacement', () =>
    svg.arrow(...O, ...E, { color: '#7b1145', width: 4.5, head: 22 })
  );
  svg.circle(...E, 5, { fill: INK });
  svg.arc(...O, 62, 0, 40);
  svg.text(O[0] + 82, O[1] - 26, '40°', { size: 20 });
  svg.text(388, 196, '**S**', { size: 26 });
  svg.text(462, 238, 'S = 5.0 \\rm{km}', { size: 22 });
  note(svg, 625, 342, 'Path 1');
  note(svg, 110, 60, 'Path 2');
  svg.compass(730, 110, { r: 32, size: 18 });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 4.8: dipole field

function dipoleField() {
  const svg = new Svg({
    width: 640,
    height: 500,
    title: 'Field lines between a positive and a negative charge',
    desc: 'Computed electric field lines of equal and opposite point charges +q (left) and −q (right). Every line leaves +q and either ends on −q or leaves the picture; lines from far away also converge on −q. The arrows point from the positive toward the negative charge, the direction of the force on a positive test charge.',
  });
  const charges = [
    { x: 215, y: 250, q: 1 },
    { x: 425, y: 250, q: -1 },
  ];
  pointLines(svg, charges, { x: 4, y: 4, w: 632, h: 492 }, { per: 18, at: 0.4, r0: 16 });
  for (const c of charges) signedCharge(svg, c.x, c.y, c.q, { r: 15 });
  svg.text(215, 288, '+q', { size: 24 });
  svg.text(425, 288, '−q', { size: 24 });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 5.1: rough surfaces

const ROUGH_UPPER = x =>
  8 * Math.sin(x / 23) + 6 * Math.sin(x / 9.7 + 1) + 3.5 * Math.sin(x / 4.9 + 2);
const ROUGH_LOWER = x =>
  9 * Math.sin(x / 31 + 0.5) + 5.5 * Math.sin(x / 8.1 + 2.5) + 3.5 * Math.sin(x / 4.3 + 1);

function roughPair(svg, top, { contact, arrow, label }) {
  const [x0, x1] = [60, 620];
  const depth = 18;
  const mean = top + 100;
  const bottom = mean + 95;
  const xs = Array.from({ length: (x1 - x0) / 2 + 1 }, (_, k) => x0 + 2 * k);
  // The gap closes until `contact` of the length touches; touching asperities
  // are flattened against each other.
  const overlap = xs.map(x => ROUGH_UPPER(x) + ROUGH_LOWER(x)).sort((a, b) => b - a);
  const gap = overlap[Math.floor(contact * overlap.length)];
  const upper = xs.map(x => [x, mean + ROUGH_UPPER(x)]);
  const lower = xs.map((x, k) => [x, Math.max(mean + gap - ROUGH_LOWER(x), upper[k][1])]);

  svg.polygon(
    [
      [x0, bottom],
      [x0 - depth, bottom - depth],
      [x0 - depth, mean + gap - depth],
      [x0, mean + gap],
    ],
    { fill: '#93b8a5' }
  );
  svg.polygon([...lower, [x1, bottom], [x0, bottom]], {
    fill: '#bcd8c8',
    stroke: '#5d7f6c',
    width: 1.5,
  });
  svg.polygon(
    [
      [x0, top],
      [x0 - depth, top - depth],
      [x1 - depth, top - depth],
      [x1, top],
    ],
    { fill: '#8f9399' }
  );
  svg.polygon(
    [
      [x0, top],
      [x0 - depth, top - depth],
      [x0 - depth, mean - depth],
      [x0, mean],
    ],
    { fill: '#73777d' }
  );
  svg.polygon([[x0, top], [x1, top], ...upper.slice().reverse()], {
    fill: '#cfd2d6',
    stroke: '#5f646a',
    width: 1.5,
  });
  // Mark the patches of actual contact.
  let run = [];
  const flush = () => {
    if (run.length > 1) svg.polyline(run, { color: '#1d2a33', width: 4.5 });
    run = [];
  };
  upper.forEach((p, k) => {
    if (lower[k][1] - p[1] < 0.5) run.push(p);
    else flush();
  });
  flush();

  const cx = 340;
  group(svg, `${label}-top-force`, () =>
    svg.arrow(cx, top - depth - 8 - arrow, cx, top - depth - 6, {
      color: FORCE,
      width: 5,
      head: 20,
    })
  );
  group(svg, `${label}-bottom-force`, () =>
    svg.arrow(cx, bottom + 8 + arrow, cx, bottom + 6, { color: FORCE_LIGHT, width: 5, head: 20 })
  );
  svg.text(cx + 30, top - depth - 6 - arrow / 2, 'N', { size: 26, math: false, weight: 'bold' });
  svg.text(cx + 30, bottom + 8 + arrow / 2, 'N', { size: 26, math: false, weight: 'bold' });
  svg.lines(785, mean - 16, [`${label === 'small' ? 'Small' : 'Large'} normal`, 'force'], {
    size: 25,
    math: false,
  });
  return { mean };
}

function roughSurfaces() {
  const svg = new Svg({
    width: 900,
    height: 880,
    title: 'Real contact between rough surfaces grows with the normal force',
    desc: 'Two pairs of blocks with rough faces are pressed together by normal forces N. With a small normal force only a few high points touch, so the area of actual contact (dark segments) is a small part of the total area. With a larger normal force, drawn with longer arrows, the high points flatten and many more patches touch, so the contact area and the friction are larger.',
  });
  roughPair(svg, 110, { contact: 0.06, arrow: 62, label: 'small' });
  roughPair(svg, 560, { contact: 0.4, arrow: 110, label: 'large' });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 5.3: nail in shear

function shearedNail() {
  const svg = new Svg({
    width: 760,
    height: 740,
    title: 'A nail bent in shear by a hanging picture',
    desc: 'Side view of a nail 1.50 mm thick through a wall, with L₀ = 5.00 mm sticking out and a picture hanger at its head. The weight w of the picture pulls the head down, and the wall pushes up with an equal force w at the wall face, so equal and opposite forces act across opposite cross sections. Dashed lines show the unbent nail; the head drops by Δx = 1.80 μm, drawn greatly exaggerated.',
  });
  const [wall0, wall1] = [285, 345];
  const [top, bot] = [284, 336];
  const head = 520;
  const sag = 22;
  svg.rect(wall0, 20, wall1 - wall0, 680, { fill: '#ecd6a8', stroke: '#c7a96b', width: 1.5 });
  svg.polygon(
    [
      [15, (top + bot) / 2],
      [62, top],
      [wall1, top],
      [head, top + sag],
      [head, bot + sag],
      [wall1, bot],
      [62, bot],
    ],
    { fill: '#bccde0', stroke: '#5f7690', width: 1.8 }
  );
  svg.line(wall1, top, head, top, GUIDE);
  svg.line(wall1, bot, head + 105, bot, GUIDE);
  svg.rect(head, 235, 36, 245, { fill: '#a8783f', stroke: '#6f4a22', width: 1.5, rx: 4 });
  svg.rect(head + 38, top + sag - 34, 34, 120, {
    fill: '#b3c5da',
    stroke: '#5f7690',
    width: 1.8,
    rx: 9,
  });
  svg.line(head + 72, bot + sag, head + 105, bot + sag, { color: INK, width: 1.4 });
  svg.vdimension(222, top, bot, '', { size: 18, tick: 14 });
  svg.text(150, (top + bot) / 2, '1.50 \\rm{mm}', { size: 22 });
  svg.text(615, 210, 'Δx = 1.80 \\rm{μm}', { size: 22 });
  svg.squiggle(690, 228, head + 108, bot + sag / 2);
  svg.arrow(head + 100, bot - 30, head + 100, bot, { color: INK, width: 1.4, head: 10 });
  svg.arrow(head + 100, bot + sag + 30, head + 100, bot + sag, {
    color: INK,
    width: 1.4,
    head: 10,
  });
  svg.arrow(wall1 + 1, 420, head - 1, 420, { color: INK, width: 1.6, head: 12, start: true });
  svg.line(wall1, 400, wall1, 440, { color: INK, width: 1.4 });
  svg.line(head, 400, head, 440, { color: INK, width: 1.4 });
  svg.squiggle(415, 685, 450, 428, { waves: 2 });
  svg.text(450, 712, 'L_0 = 5.00 \\rm{mm}', { size: 24 });
  group(svg, 'wall-force', () =>
    svg.arrow(wall1, 560, wall1, bot + 3, { color: FORCE_LIGHT, width: 5, head: 20 })
  );
  group(svg, 'weight', () =>
    svg.arrow(head + 18, 480, head + 18, 650, { color: FORCE, width: 5, head: 20 })
  );
  svg.text(wall1 - 30, 480, '**w**', { size: 26 });
  svg.text(head + 50, 600, '**w**', { size: 26 });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 6.1: vinyl record

function fly(svg, x, y, a) {
  // `a` is the direction the fly faces, in screen degrees.
  svg.add(`<g transform="translate(${x} ${y}) rotate(${a})">`);
  svg.ellipse(-9, -8, 13, 7, { fill: '#ffffff', stroke: INK, width: 1.2 });
  svg.ellipse(-9, 8, 13, 7, { fill: '#ffffff', stroke: INK, width: 1.2 });
  svg.ellipse(-4, 0, 13, 6, { fill: '#2f6b3d', stroke: INK, width: 1.2 });
  svg.circle(11, 0, 6, { fill: '#e8e8e8', stroke: INK, width: 1.2 });
  svg.add('</g>');
}

function vinylRecord() {
  const svg = new Svg({
    width: 760,
    height: 760,
    title: 'Velocity of a fly on a rotating record',
    desc: 'A record turns clockwise with angular velocity ω. Flies sit at the top and right edge, each a distance r from the center. Each fly’s velocity v is tangent to the circle and perpendicular to its radius: to the right at the top and downward at the right edge.',
  });
  const C = [360, 400];
  const R = 330;
  svg.circle(...C, R, { fill: '#77797c', stroke: '#4f5154', width: 2 });
  for (const r of [300, 270, 238, 205, 175]) {
    svg.circle(...C, r, { fill: 'none', stroke: '#5f6164', width: 1.2 });
  }
  svg.circle(...C, 142, { fill: '#2f3133' });
  svg.circle(...C, 125, { fill: '#e07c62' });
  svg.circle(...C, 5, { fill: '#ffffff', stroke: INK, width: 1 });
  const top = [C[0], C[1] - R + 22];
  const right = [C[0] + R - 22, C[1]];
  svg.line(...C, top[0], C[1] - R - 15, { color: INK, width: 2.5 });
  svg.line(...C, C[0] + R + 15, C[1], { color: INK, width: 2.5 });
  svg.text(C[0] - 25, C[1] - 90, 'r', { size: 30 });
  svg.text(C[0] + 85, C[1] - 25, 'r', { size: 30 });
  fly(svg, ...top, 0);
  fly(svg, ...right, 90);
  group(svg, 'top-velocity', () =>
    svg.arrow(top[0], C[1] - R - 15, top[0] + 170, C[1] - R - 15, {
      color: VELOCITY,
      width: 4,
      head: 20,
    })
  );
  group(svg, 'right-velocity', () =>
    svg.arrow(C[0] + R + 15, C[1], C[0] + R + 15, C[1] + 170, {
      color: VELOCITY,
      width: 4,
      head: 20,
    })
  );
  svg.text(top[0] + 85, C[1] - R - 42, 'v', { size: 30 });
  svg.text(C[0] + R + 40, C[1] + 100, 'v', { size: 30 });
  group(svg, 'spin', () => arcArrow(svg, ...C, 80, -20, -160, { color: SPIN, width: 5, head: 20 }));
  svg.text(C[0] + 25, C[1] + 45, 'ω', { size: 30, halo: false });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 6.5: orbits and tides

function moon(svg, x, y, r, sunward = 0) {
  svg.circle(x, y, r, { fill: '#55595f', stroke: '#33363a', width: 1.2 });
  const lit = Array.from({ length: 31 }, (_, k) => polar(x, y, r, sunward - 90 + 6 * k));
  svg.polygon(lit, { fill: '#e6e8eb' });
  for (const [dx, dy, s] of [
    [-0.3, -0.35, 0.16],
    [0.3, -0.1, 0.12],
    [-0.1, 0.35, 0.14],
    [0.38, 0.4, 0.1],
  ]) {
    svg.circle(x + dx * r, y + dy * r, s * r, { fill: '#9ca1a8' });
  }
  svg.circle(x, y, r, { fill: 'none', stroke: '#33363a', width: 1.2 });
}

function sun(svg, x, y, r, { label = 'Sun' } = {}) {
  const pts = Array.from({ length: 36 }, (_, k) => polar(x, y, k % 2 ? r : r + 17, k * 10));
  svg.polygon(pts, { fill: '#efbd37', stroke: '#c8901a', width: 1.2 });
  svg.circle(x, y, r - 3, { fill: '#d8b65e' });
  note(svg, x, y, label, { size: 22, halo: false });
}

function earthOrbits() {
  const svg = new Svg({
    width: 1000,
    height: 600,
    title: 'Earth and the Moon orbit their common center of mass',
    desc: '(a) The Moon orbits counterclockwise, and Earth’s center moves on a small dashed circle around the Earth–Moon center of mass (CM), which lies inside Earth. (b) The center of mass follows a smooth ellipse around the Sun, while Earth’s own path wiggles about it once a month (exaggerated). Not to scale.',
  });
  // (a) Earth's center circles the CM, which lies about 3/4 of Earth's radius out.
  const CM = [195, 290];
  const earth = [155, 290];
  svg.circle(...CM, 195, { fill: 'none', stroke: INK, width: 1.8 });
  arcArrow(svg, ...CM, 195, 115, 122, { color: INK, width: 1.8, head: 14 });
  svg.circle(...earth, 55, { fill: '#a9d7ef', stroke: '#5b9fc4', width: 1.5 });
  svg.arc(...CM, 40, 0, 359.9, { color: INK, width: 1.6, dash: '6 4' });
  group(svg, 'earth-wobble', () =>
    arcArrow(svg, ...CM, 52, 215, 290, { color: SPIN, width: 4, head: 14 })
  );
  svg.circle(...earth, 4, { fill: INK });
  note(svg, earth[0] - 20, earth[1] + 78, 'Earth', { size: 18 });
  svg.circle(...CM, 4, { fill: INK });
  svg.text(CM[0] + 22, CM[1] - 4, 'CM', { size: 18, math: false, anchor: 'start' });
  moon(svg, CM[0] + 195, CM[1], 20, 0);
  group(svg, 'moon-orbit', () =>
    arcArrow(svg, ...CM, 225, 8, 40, { color: SPIN, width: 4, head: 16 })
  );
  note(svg, 300, 500, '(not to scale)');
  note(svg, 195, 580, '(a)', { size: 22 });

  // (b) Twelve-and-a-bit lunar months per orbit, drawn as twelve wiggles.
  const S = [715, 290];
  const [a, b] = [260, 175];
  const orbit = t => [S[0] + a * Math.cos(t), S[1] - b * Math.sin(t)];
  const wiggle = Array.from({ length: 721 }, (_, k) => {
    const t = (2 * Math.PI * k) / 720;
    const [x, y] = orbit(t);
    const [dx, dy] = [-a * Math.sin(t), -b * Math.cos(t)];
    const len = Math.hypot(dx, dy);
    const off = 18 * Math.sin(12 * t);
    return [x + (off * dy) / len, y - (off * dx) / len];
  });
  svg.ellipse(...S, a, b, { stroke: INK, width: 1.8 });
  svg.arrow(...orbit(1.95), ...orbit(2.05), { color: INK, width: 1.8, head: 14 });
  svg.polyline(wiggle, { color: '#4fae2e', width: 3.5 });
  svg.circle(...S, 16, { fill: '#e2b04f', stroke: '#b9862a', width: 1.2 });
  note(svg, S[0], S[1] + 38, 'Sun', { size: 22 });
  svg.lines(840, 24, ['Earth’s path has', '“wiggles” (exaggerated)'], { size: 20, math: false });
  svg.squiggle(800, 62, ...wiggle[Math.round((1.37 / (2 * Math.PI)) * 720)], { waves: 1 });
  svg.lines(870, 515, ['Earth–Moon center of mass', 'follows elliptical path'], {
    size: 20,
    math: false,
  });
  svg.squiggle(860, 495, ...orbit(-1.25), { waves: 1 });
  note(svg, 715, 580, '(b)', { size: 22 });
  return svg.render();
}

/** Earth inside its tidal bulge; `tall` turns the bulge vertical. */
function tidalEarth(svg, x, y, { rx, ry, r, tall = false }) {
  svg.ellipse(x, y, tall ? ry : rx, tall ? rx : ry, {
    fill: '#a8d4f0',
    stroke: '#6aa9d1',
    width: 1.5,
  });
  svg.circle(x, y, r, { fill: '#e3e8d1', stroke: '#6aa9d1', width: 1.5 });
  note(svg, x, y - r * 0.3, 'Earth', { size: 22, halo: false });
  arcArrow(svg, x, y, r * 0.72, 238, 302, { color: SPIN, width: 3.5, head: 14 });
}

function tides() {
  const svg = new Svg({
    width: 880,
    height: 300,
    title: 'The Moon raises two tidal bulges',
    desc: 'Earth, rotating counterclockwise, sits inside an ocean stretched into an ellipse along the line to the Moon. High tides are on the sides nearest and farthest from the Moon, and low tides are at right angles to that line. The Moon, at right, moves upward in its counterclockwise orbit. Not to scale.',
  });
  group(svg, 'bulge', () => tidalEarth(svg, 195, 150, { rx: 150, ry: 112, r: 92 }));
  note(svg, 195, 20, 'Low tide', { size: 22 });
  note(svg, 195, 282, 'Low tide', { size: 22 });
  svg.lines(18, 135, ['High', 'tide'], { size: 22, math: false, anchor: 'start' });
  svg.lines(372, 135, ['High', 'tide'], { size: 22, math: false, anchor: 'start' });
  moon(svg, 830, 165, 26, 180);
  svg.arrow(830, 136, 830, 30, { color: VELOCITY, width: 4, head: 18 });
  note(svg, 830, 230, 'Moon', { size: 22 });
  note(svg, 560, 270, '(not to scale)');
  return svg.render();
}

function springNeapTides() {
  const svg = new Svg({
    width: 760,
    height: 640,
    title: 'Spring and neap tides',
    desc: 'The Sun is far to the right in each panel. (a) New moon: the Moon lies between Earth and the Sun, and the two tides add to a large bulge along the Sun–Earth line, a spring tide. (b) Full moon: the Moon is on the far side, and the bulge is again along that line, another spring tide. (c) Quarter moon: the Moon is at right angles to the Sun line; the smaller solar tide partly cancels the lunar one, and the weaker bulge points toward the Moon, a neap tide. The Moon moves counterclockwise and is lit on the side facing the Sun.',
  });
  const rows = [
    { y: 85, moonAt: [262, 85], v: [0, -1], tall: false, tide: 'spring tide', tag: '(a)' },
    { y: 270, moonAt: [32, 265], v: [0, 1], tall: false, tide: 'spring tide', tag: '(b)' },
    { y: 450, moonAt: [148, 578], v: [1, 0], tall: true, tide: 'neap tide', tag: '(c)' },
  ];
  for (const { y, moonAt, v, tall, tide, tag } of rows) {
    group(svg, `bulge-${tag[1]}`, () =>
      tidalEarth(svg, 150, y, { rx: tall ? 70 : 82, ry: tall ? 60 : 56, r: 46, tall })
    );
    moon(svg, ...moonAt, 15, 0);
    svg.arrow(
      moonAt[0] + v[0] * 17,
      moonAt[1] + v[1] * 17,
      moonAt[0] + v[0] * 62,
      moonAt[1] + v[1] * 62,
      {
        color: VELOCITY,
        width: 3,
        head: 14,
      }
    );
    note(
      svg,
      tag === '(b)' ? 32 : moonAt[0] + (tag === '(c)' ? 0 : 0),
      tag === '(b)' ? 335 : moonAt[1] + 42,
      'Moon'
    );
    note(svg, 150, tall ? y + 92 : y + 82, tide);
    note(svg, 440, y + 70, tag);
    sun(svg, 670, y - 10, 55);
  }
  return svg.render();
}

// ---------------------------------------------------------------------------
// 7.5: path-dependent erasing and sliding up a slope

function smiley(svg, x, y) {
  svg.circle(x, y, 90, { fill: '#f9d34f' });
  svg.circle(x - 30, y - 30, 11, { fill: '#454545' });
  svg.circle(x + 30, y - 30, 11, { fill: '#454545' });
  svg.path(`M ${x - 58} ${y + 5} Q ${x} ${y + 85} ${x + 58} ${y + 5}`, {
    color: '#454545',
    width: 4,
  });
}

function erasedPath(svg, points) {
  const d = smoothPath(points);
  for (const [color, width] of [
    ['#b8b48f', 40],
    ['#d8d7c9', 33],
    ['#ffffff', 26],
  ]) {
    svg.add(
      `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`
    );
  }
}

function erasing() {
  const svg = new Svg({
    width: 760,
    height: 310,
    title: 'The work done by friction depends on the path',
    desc: 'Two identical happy faces are erased from point A to point B. (a) A straight diagonal stroke erases a narrow band. (b) A winding stroke between the same points erases much more of the face. More work is done against friction along the longer path.',
  });
  for (const [x, points, tag] of [
    [
      180,
      [
        [-138, 98],
        [132, -100],
      ],
      '(a)',
    ],
    [
      560,
      [
        [-138, 98],
        [-95, 45],
        [-55, -75],
        [-20, 30],
        [10, 60],
        [30, -110],
        [65, 10],
        [120, -25],
        [132, -100],
      ],
      '(b)',
    ],
  ]) {
    const y = 140;
    smiley(svg, x, y);
    const pts = points.map(([dx, dy]) => [x + dx, y + dy]);
    erasedPath(svg, pts);
    const A = [x - 158, y + 118];
    const B = [x + 152, y - 120];
    svg.circle(...A, 5, { fill: '#9e1b2c' });
    svg.circle(...B, 5, { fill: '#9e1b2c' });
    svg.text(A[0] - 2, A[1] + 25, 'A', { size: 22, math: false });
    svg.text(B[0] + 20, B[1] + 2, 'B', { size: 22, math: false });
    note(svg, x, 295, tag, { size: 22 });
  }
  return svg.render();
}

function slidingUpSlope() {
  const svg = new Svg({
    width: 980,
    height: 270,
    title: 'A player slides to a stop up a 5° slope',
    desc: 'A baseball player slides head first up a hill inclined at 5.00° and stops after sliding a distance d along it. A right triangle has hypotenuse d along the slope, the 5° angle at its lower right, and vertical side h = d sin 5°, the height gained.',
  });
  const slope = rad(5);
  const [x1, y1] = [950, 205];
  const yAt = x => y1 - (x1 - x) * Math.tan(slope);
  const x0 = 330;
  svg.polygon(
    [
      [0, 0],
      [980, 0],
      [980, yAt(980)],
      [0, yAt(0)],
    ],
    { fill: '#bfe3c9' }
  );
  svg.polygon(
    [
      [0, yAt(0)],
      [980, yAt(980)],
      [980, 270],
      [0, 270],
    ],
    { fill: '#eadcc5' }
  );
  // The player lies along the slope; s runs down the slope, n away from it.
  const s0 = [95, yAt(95)];
  const P = (s, n) => [
    s0[0] + s * Math.cos(slope) + n * Math.sin(slope),
    s0[1] + s * Math.sin(slope) - n * Math.cos(slope),
  ];
  const limb = (a, b, w, color) => {
    svg.line(...P(...a), ...P(...b), { color: '#2b3e52', width: w + 4, cap: 'round' });
    svg.line(...P(...a), ...P(...b), { color, width: w, cap: 'round' });
  };
  limb([10, 12], [120, 22], 13, '#f0c9a4');
  limb([130, 26], [270, 30], 34, '#f3f5f8');
  limb([270, 30], [370, 26], 24, '#f3f5f8');
  limb([370, 26], [400, 66], 18, '#2f6fb2');
  limb([398, 66], [430, 78], 12, '#2b3e52');
  svg.circle(...P(118, 50), 21, { fill: '#2f6fb2', stroke: '#1f4777', width: 2 });
  svg.circle(...P(103, 44), 9, { fill: '#f0c9a4' });
  svg.line(...P(-60, 0), x0, yAt(x0), { color: INK, width: 3.5, dash: '14 9' });
  group(svg, 'slope', () => {
    svg.line(x0, yAt(x0), x1, y1, { color: INK, width: 3.5 });
    svg.line(x0, yAt(x0), x0, y1, { color: INK, width: 3.5 });
    svg.line(x0, y1, x1, y1, { color: INK, width: 3.5 });
  });
  svg.arc(x1, y1, 210, 175, 180, { width: 2 });
  svg.text(660, 145, 'd', { size: 28 });
  svg.text(175, 175, 'h = d \\rm{sin} 5°', { size: 26 });
  svg.arrow(260, 175, x0 - 6, 175, { color: INK, width: 1.6, head: 12 });
  svg.text(625, 245, '5°', { size: 24 });
  svg.arrow(650, 238, x1 - 205, y1 - 9, { color: INK, width: 1.6, head: 12 });
  return svg.render();
}

// ---------------------------------------------------------------------------
// 9.1 and 9.2: hockey sticks

/**
 * An ice hockey stick: the shaft runs from `foot`, on the blade's midline, at
 * `angle` degrees above the horizontal; the blade extends `blade` px to the
 * left. Returns at(u, v), the point u along the shaft axis and v to its right.
 */
function hockeyStick(svg, { foot, angle, length, blade = 200, w = 46, tapes = [] }) {
  const [c, s] = [Math.cos(rad(angle)), Math.sin(rad(angle))];
  const at = (u, v) => [foot[0] + u * c + v * s, foot[1] - u * s + v * c];
  const yb = foot[1] + w / 2;
  const right = (yb - foot[1] - c * (w / 2)) / -s;
  const left = (yb - w - foot[1] + c * (w / 2)) / -s;
  const xl = at(left, -w / 2)[0] - blade;
  svg.polygon(
    [
      [xl, yb - w],
      [xl, yb],
      at(right, w / 2),
      at(length, w / 2),
      at(length + 7, w / 4),
      at(length - 3, 0),
      at(length + 6, -w / 4),
      at(length, -w / 2),
      at(left, -w / 2),
    ],
    { fill: '#f4d48f', stroke: '#c49a50', width: 2 }
  );
  for (const [u1, u2] of tapes) {
    svg.polygon([at(u1, -w / 2 - 3), at(u1, w / 2 + 3), at(u2, w / 2 + 3), at(u2, -w / 2 - 3)], {
      fill: '#aeb3b9',
      stroke: '#6e737a',
      width: 2,
    });
    for (let u = u1 + 8; u < u2 - 4; u += 9) {
      svg.line(...at(u, -w / 2 - 3), ...at(u, w / 2 + 3), { color: '#878c93', width: 1.3 });
    }
  }
  return at;
}

/** Free-body diagram: a dot with forces to the left and right. */
function horizontalFbd(svg, x, y) {
  note(svg, x, y - 52, 'Free-body diagram', { size: 24 });
  svg.arrow(x - 8, y, x - 115, y, { color: INK, width: 2, head: 14 });
  svg.arrow(x + 8, y, x + 115, y, { color: INK, width: 2, head: 14 });
  svg.circle(x, y, 8, { fill: '#b01e2f' });
  svg.text(x - 65, y + 32, '**F**', { size: 26 });
  svg.text(x + 65, y + 32, '**F**', { size: 26 });
}

/** Horizontal force on the shaft surface at axis distance u (side ±1). */
function shaftPush(svg, at, u, side, id, { reach = 185, w = 46, angle = 76 } = {}) {
  const [x, y] = at(u, 0);
  const edge = x + (side * (w / 2)) / Math.sin(rad(angle));
  const tip = edge + side * 3;
  group(svg, id, () =>
    svg.arrow(tip + side * reach, y, tip, y, { color: FORCE, width: 5, head: 22 })
  );
  return [tip + (side * reach) / 2, y + 38];
}

const STICK = {
  angle: 76,
  length: 470,
  blade: 190,
  tapes: [
    [275, 410],
    [120, 162],
  ],
};

function stickEquilibrium() {
  const svg = new Svg({
    width: 780,
    height: 620,
    title: 'Equal and opposite forces on one line hold a hockey stick in equilibrium',
    desc: 'A hockey stick lies flat on frictionless ice. Two equal horizontal forces F push on opposite sides of the shaft along the same line of action, so the net force is zero and there is no torque; the stick remains stationary. The free-body diagram shows the two forces F in opposite directions.',
  });
  note(svg, 390, 38, 'Equilibrium: remains stationary', { size: 28 });
  const at = hockeyStick(svg, { foot: [330, 555], ...STICK });
  for (const [side, id] of [
    [-1, 'left-force'],
    [1, 'right-force'],
  ]) {
    const [x, y] = shaftPush(svg, at, 200, side, id);
    svg.text(x, y, '**F**', { size: 28 });
  }
  svg.text(300, 150, 'net **F** = 0', { size: 26, math: false });
  horizontalFbd(svg, 610, 525);
  return svg.render();
}

function stickRotation() {
  const svg = new Svg({
    width: 1000,
    height: 620,
    title: 'Equal and opposite forces on different lines make a hockey stick rotate',
    desc: 'The same two forces F act on the shaft at different heights: the upper one pushes right on the left side and the lower one pushes left on the right side. The net force is still zero, but together they produce a clockwise torque, so the stick’s rotation accelerates clockwise. The free-body diagram is unchanged.',
  });
  note(svg, 500, 38, 'Nonequilibrium: rotation accelerates', { size: 28 });
  const at = hockeyStick(svg, { foot: [380, 560], ...STICK });
  const upper = shaftPush(svg, at, 360, -1, 'upper-force');
  const lower = shaftPush(svg, at, 95, 1, 'lower-force');
  svg.text(...upper, '**F**', { size: 28 });
  svg.text(...lower, '**F**', { size: 28 });
  for (const [u, side] of [
    [330, -1],
    [100, 1],
  ]) {
    for (const k of [0, 1, 2]) {
      const v = side * (36 + 9 * k);
      svg.line(...at(u - 70 + 10 * k, v), ...at(u + 60 - 10 * k, v), {
        color: '#8f959c',
        width: 1.4,
      });
    }
  }
  const C = at(235, 0);
  group(svg, 'spin', () => {
    arcArrow(svg, ...C, 275, 62, 10, { color: TURN, width: 4, head: 20 });
    arcArrow(svg, ...C, 275, 222, 170, { color: TURN, width: 4, head: 20 });
  });
  svg.text(310, 150, 'net **F** = 0', { size: 26, math: false });
  horizontalFbd(svg, 815, 480);
  return svg.render();
}

/** Line of action of F through P: the foot of the perpendicular from O. */
function perpendicularFoot(O, P, f) {
  const t = (O[0] - P[0]) * f[0] + (O[1] - P[1]) * f[1];
  return [P[0] + t * f[0], P[1] + t * f[1]];
}

function torqueStick() {
  const svg = new Svg({
    width: 960,
    height: 650,
    title: 'Torque on a hockey stick about two pivots',
    desc: '(a) A nail at A near the end of the blade is the pivot. A force F pushes left and slightly up on the shaft. r runs from A to the point of application, θ is the angle between F and the line from that point to A, and r⊥ is the perpendicular distance from A to the line of action of F. The stick would rotate counterclockwise about A. (b) With the nail at B near the top of the shaft and the same force applied below it, the perpendicular distance r⊥ runs down the shaft and the stick would rotate clockwise about B.',
  });
  const f = [-Math.cos(rad(18)), -Math.sin(rad(18))];
  const panels = [
    {
      foot: [365, 560],
      pivot: 'A',
      u: 230,
      pin: at => [at(0, 0)[0] - 150, at(0, 0)[1] + 2],
      tag: '(a)',
    },
    { foot: [745, 575], pivot: 'B', u: 160, pin: at => at(395, 0), tag: '(b)' },
  ];
  for (const { foot, pivot, u, pin, tag } of panels) {
    const at = hockeyStick(svg, {
      foot,
      angle: tag === '(a)' ? 76 : 82,
      length: 420,
      blade: tag === '(a)' ? 190 : 210,
      tapes:
        tag === '(a)'
          ? [
              [260, 390],
              [90, 130],
            ]
          : [
              [200, 330],
              [70, 115],
            ],
    });
    const O = pin(at);
    const P = at(u, 23);
    const Q = perpendicularFoot(O, P, f);
    group(svg, `force-${pivot}`, () =>
      svg.arrow(P[0] - f[0] * 125, P[1] - f[1] * 125, P[0] + 1, P[1], {
        color: FORCE,
        width: 5,
        head: 22,
      })
    );
    svg.text(P[0] + 92, P[1] + 56, '**F**', { size: 28 });
    svg.line(...P, ...Q, { color: INK, width: 2 });
    svg.line(...O, ...Q, { ...GUIDE, color: INK });
    group(svg, `pivot-${pivot}`, () =>
      svg.circle(...O, 10, { fill: '#c5c9ce', stroke: '#5d6269', width: 2 })
    );
    const ang = (A, B) => (Math.atan2(A[1] - B[1], B[0] - A[0]) * 180) / Math.PI;
    const radius = Math.hypot(Q[0] - O[0], Q[1] - O[1]);
    if (pivot === 'A') {
      svg.line(...O, ...P, { ...GUIDE, color: INK });
      const toF = ang(P, Q);
      const toA = ang(P, O) + (ang(P, O) < toF ? 360 : 0);
      svg.arc(...P, 46, toF, toA, { color: INK, width: 2 });
      svg.text(...polar(...P, 66, (toF + toA) / 2), 'θ', { size: 26 });
      const mid = [O[0] + 0.4 * (P[0] - O[0]), O[1] + 0.4 * (P[1] - O[1])];
      svg.text(mid[0] + 14, mid[1] + 24, 'r', { size: 28 });
      svg.text((O[0] + Q[0]) / 2 - 22, (O[1] + Q[1]) / 2, 'r_⊥', { size: 28 });
      group(svg, 'spin-A', () =>
        arcArrow(svg, ...O, Math.min(radius, 195), ang(O, Q) + 22, ang(O, Q) + 95, {
          color: TURN,
          width: 4,
          head: 20,
        })
      );
      svg.text(O[0] + 30, O[1] + 4, 'A', { size: 26, math: false });
      note(svg, O[0] - 70, O[1] - 75, 'Nail', { size: 24 });
      svg.squiggle(O[0] - 55, O[1] - 58, O[0] - 11, O[1] - 7);
    } else {
      svg.text(O[0] - 60, (O[1] + Q[1]) / 2, 'r_⊥', { size: 28 });
      group(svg, 'spin-B', () =>
        arcArrow(svg, ...O, 140, 215, 120, { color: TURN, width: 4, head: 20 })
      );
      svg.text(O[0] + 34, O[1] + 4, 'B', { size: 26, math: false });
      note(svg, O[0] + 100, O[1] - 85, 'Nail', { size: 24 });
      svg.squiggle(O[0] + 85, O[1] - 68, O[0] + 9, O[1] - 8);
    }
    note(svg, tag === '(a)' ? 300 : 730, 632, tag, { size: 24 });
  }
  return svg.render();
}

export default {
  Figure_03_02_18: cabinToLake,
  Figure_04_08_01: dipoleField,
  Figure_05_01_04: roughSurfaces,
  Figure_05_03_08: shearedNail,
  Figure_06_01_05: vinylRecord,
  Figure_06_05_04: earthOrbits,
  Figure_06_05_05: tides,
  Figure_06_05_06: springNeapTides,
  Figure_07_05_01: erasing,
  Figure_07_05_05: slidingUpSlope,
  Figure_09_01_03: stickEquilibrium,
  Figure_09_01_04: stickRotation,
  Figure_09_02_02: torqueStick,
};
