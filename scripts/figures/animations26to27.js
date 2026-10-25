/** Sixteen optics companions. Original illustrations remain available. */
import {
  C,
  f,
  dot,
  line,
  rect,
  text,
  path,
  polygon,
  arrow,
  visible,
  number,
  readout,
  panel,
  standalone,
  appendAnimation,
} from './animation-svg.js';
import {
  wavelength,
  accommodation,
  visionCorrection,
  immersion,
  fiberState,
  telescopePaths,
  pathLength,
  pathPoint,
  chromaticFocus,
  chromaticState,
  sphericalTrace,
  sphericalState,
  huygensState,
  doubleSlit,
  fringeState,
  slitState,
  slitIntensity,
  gratingCount,
  gratingIntensity,
  airyIntensity,
  resolutionState,
  filmState,
  malusState,
  crossedState,
} from './animation-models26to27.js';

const opts = { discreteAttributes: ['opacity'] };
const points = (fn, count = 160) => Array.from({ length: count + 1 }, (_, i) => fn(i / count));
const ellipse = (x, y, rx, ry, fill = C.fill, stroke = C.guide) =>
  `<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(rx)}" ry="${f(ry)}" fill="${fill}" stroke="${stroke}"/>`;
const lens = (x, y, height, width = 13, diverging = false) => {
  const rim = diverging ? width : width / 2,
    bulge = diverging ? -width / 2 : width * 2;
  return `<path d="M ${f(x - rim)} ${f(y - height)} Q ${f(x - bulge)} ${f(y)} ${f(x - rim)} ${f(y + height)} L ${f(x + rim)} ${f(y + height)} Q ${f(x + bulge)} ${f(y)} ${f(x + rim)} ${f(y - height)} Z" fill="${C.fill}" stroke="${C.blue}"/>`;
};

function accommodationScene(t) {
  const s = accommodation(t),
    cx = 270,
    cy = 180,
    xs = 10000,
    ys = 20000;
  let body = ellipse(370, cy, 114, 93, 'none', C.grid) + line(70, cy, 505, cy, C.grid, 1, '4 4');
  body += lens(cx, cy, 74, 11 + 12 * t);
  body += line(470, 125, 470, 237, C.red, 4) + text(470, 263, 'Fixed retina', 16);
  for (const height of [-0.003, 0, 0.003]) {
    const incomingSlope = height * s.vergence - 0.04;
    const outgoingSlope = incomingSlope - s.power * height;
    body += path(
      [
        [cx - 0.018 * xs, cy - ys * (height - incomingSlope * 0.018)],
        [cx, cy - ys * height],
        [cx + xs * s.imageDistance, cy - ys * (height + outgoingSlope * s.imageDistance)],
      ],
      C.blue
    );
  }
  body += arrow(62, cy, 0, -32, C.green) + text(65, 239, 'Object', 16);
  body += arrow(470, cy, 0, 16, C.green, 4) + dot(470, cy + 16, 5, C.blue);
  body += text(320, 75, 'Far object → object at 25 cm', 18);
  body += readout(577, 125, 'Power (D)', s.power);
  body += readout(577, 189, '1/do (D)', s.vergence, 1, 2);
  body += text(709, 258, 'di = 2.00 cm', 19);
  body += text(450, 306, 'P = 1/do + 1/di; retinal image remains inverted', 18);
  return panel(
    'Accommodation keeps the image on the retina',
    body,
    'Equivalent thin eye lens; anatomical shape and object position are schematic. As object distance falls, power rises from 50 to 54 D at fixed di.'
  );
}

function correctionScene(t) {
  let body = '';
  for (const [i, hyper] of [false, true].entries()) {
    const s = visionCorrection(t, hyper),
      cy = 125 + i * 128,
      cx = 220;
    body += ellipse(320, cy, 112, 55, 'none', C.grid) + line(65, cy, 471, cy, C.grid, 1);
    body += lens(cx, cy, 43, 8);
    body += visible(t > 0, lens(cx - 35, cy, 43, 3 + 6 * t, !hyper));
    body += line(420, cy - 43, 420, cy + 43, C.red, 3);
    for (const height of [-0.002, 0.002]) {
      const slope = height * s.vergence,
        outgoing = slope - (s.eyePower + s.correction) * height;
      body += path(
        [
          [70, cy - 18000 * (height - 0.015 * slope)],
          [cx, cy - 18000 * height],
          [cx + 250, cy - 18000 * (height + 0.025 * outgoing)],
        ],
        C.blue
      );
    }
    body += dot(cx + 10000 * s.imageDistance, cy, 6, C.green);
    body += text(
      290,
      cy - 61,
      hyper ? 'Hyperopia example · do = 25 cm' : 'Myopia example · distant object',
      17
    );
    body += readout(542, cy - 5, 'Eye P (D)', s.eyePower, 2, 0);
    body += readout(542, cy + 34, 'Lens P (D)', s.correction, 1, 1, true);
  }
  return panel(
    'Opposite correction lenses bring the focus onto the retina',
    body,
    'Lenses-in-contact approximation; lens symbols are separated for readability. Eye power stays fixed. Diverging correction is negative; converging is positive.'
  );
}

function immersionScene(t) {
  const selected = Math.min(2, Math.floor(3 * t));
  let body = text(450, 61, 'Same objective aperture and cover-glass ray in all three cases', 17);
  for (let i = 0; i < 3; i += 1) {
    const s = immersion(i),
      x = 100 + 300 * i,
      endX = x + 90 * Math.tan(s.angle);
    body += rect(x - 75, 215, 170, 66, C.fill, C.grid);
    body += ellipse(x, 125, 90, 9);
    body += text(x + 20, 89, ['Air', 'Water', 'Oil'][i], 18);
    body += visible(selected === i, rect(x - 90, 70, 260, 243, 'none', C.green));
    body += path(
      [
        [x - 50 * Math.tan((35 * Math.PI) / 180), 265],
        [x, 215],
        [endX, 125],
      ],
      selected === i ? C.blue : C.guide,
      'none',
      3
    );
    body += dot(endX, 125, 5, s.collected ? C.green : C.red);
    body += text(x + 25, 304, s.collected ? 'Ray collected' : 'Ray misses objective', 15);
    body += text(x + 8, 178, 'NA', 15) + number(x + 40, 178, s.na, 1, 2);
  }
  return panel(
    'Immersion changes refraction and numerical aperture',
    body,
    'NA = n sin 45°. Cover glass n = 1.52; its ray angle is 35°. Snell’s law sets each emerging angle; this example collects the water and oil rays.'
  );
}

function fiberScene(t) {
  const s = fiberState(t),
    x0 = 190,
    cy = 173,
    scale = 50;
  let body =
    rect(x0, cy - 48, 400, 96, '#e9edf0', C.grid) + rect(x0, cy - 25, 400, 50, C.fill, C.blue);
  body += path(
    [
      [50, cy - 140 * Math.tan(s.alpha)],
      [x0, cy],
    ],
    C.blue,
    'none',
    3
  );
  for (const segment of s.segments) {
    const a = [x0 + scale * segment.start[0], cy + scale * segment.start[1]];
    const b = [x0 + scale * segment.end[0], cy + scale * segment.end[1]];
    body += `<g opacity="${segment.power}">${path([a, b], C.blue, 'none', 3)}</g>`;
    const distance = 590 - b[0];
    body += `<g opacity="${segment.hit ? segment.power * (1 - s.reflectance) : 0}">${path([b, [590, b[1] + segment.sign * distance * Math.tan(s.transmittedAngle)]], C.red, 'none', 3)}</g>`;
  }
  body += text(391, 105, 'Cladding n = 1.46', 17) + text(280, 260, 'Core n = 1.50', 17);
  body += readout(635, 114, 'Entry α (°)', (s.alpha * 180) / Math.PI, 2, 1);
  body += readout(635, 172, 'α max (°)', (s.acceptance * 180) / Math.PI, 2, 1);
  body += readout(635, 230, 'Reflected %', 100 * s.reflectance, 3, 0);
  body += text(450, 304, 'Red: transmitted leakage; blue: core ray', 18);
  return panel(
    'Fiber acceptance follows from total internal reflection',
    body,
    'Ray model in air. Entry refraction and the critical angle determine guidance. Outside the cone, Fresnel reflection remains while some power leaks into cladding.'
  );
}

function telescopeScene(t) {
  const map = ([x, y]) => [80 + x * 0.5, 40 + y * 0.5];
  const distance = t * Math.max(...telescopePaths.map(pathLength));
  let body = path(
    points(p => {
      const y = 50 + 380 * p;
      return map([-160 + Math.sqrt(800 ** 2 - (y - 240) ** 2), y]);
    }),
    C.guide,
    'none',
    7
  );
  body += line(...map([312, 288]), ...map([412, 188]), C.guide, 7) + ellipse(260, 255, 45, 6);
  for (const route of telescopePaths) {
    body += path(route.map(map), C.blue, 'none', 2);
    const [x, y] = map(pathPoint(route, distance));
    body += visible(distance <= pathLength(route), dot(x, y, 7, C.red));
  }
  body += text(310, 66, 'Primary mirror', 16) + text(143, 177, 'Diagonal', 16);
  body += text(161, 262, 'Eyepiece', 16) + text(265, 316, 'Toward eye', 16);
  body += text(662, 111, '1 · Primary reflects the light', 18);
  body += text(662, 178, '2 · Diagonal folds the path', 18);
  body += text(662, 245, '3 · Eyepiece sends rays onward', 18);
  return panel(
    'Follow light through a reflecting telescope',
    body,
    'Tracers follow the original spherical-mirror ray calculation at equal distance per display time. They mark the path; the telescope receives continuous light.'
  );
}

function chromaticScene(t) {
  const s = chromaticState(t),
    colors = [C.purple, C.green, C.red],
    wavelengths = [410, 555, 700];
  let body = '';
  for (const [i, corrected] of [false, true].entries()) {
    const cy = 115 + 134 * i,
      cx = 225,
      detector = cx + 600 * s.detector;
    body += line(70, cy, 600, cy, C.grid, 1) + lens(cx, cy, 44, 8);
    body += visible(corrected, lens(cx + 15, cy, 44, 5, true));
    for (const height of [-38, 38]) {
      body += line(75, cy, cx, cy + height, C.guide, 1);
      wavelengths.forEach((nm, k) => {
        const focus = chromaticFocus(nm, corrected);
        body += line(cx, cy + height, 600, cy + height * (1 - 0.625 / focus), colors[k], 1.5);
        body += dot(detector, cy + height * (1 - s.detector / focus), 4, colors[k]);
      });
    }
    body += line(detector, cy - 47, detector, cy + 47, C.ink, 2);
    body += text(
      320,
      cy - 54,
      corrected ? 'Illustrative achromatic doublet' : 'Single converging lens',
      17
    );
  }
  body += text(734, 104, 'Detector distance (mm)', 17) + number(706, 141, s.detector * 1000, 3, 0);
  body += text(734, 209, 'Violet · green · red', 17);
  body += text(734, 255, 'Compare spot spread', 17);
  return panel(
    'Scan the focal positions of different colors',
    body,
    'The detector moves; focal positions do not. The doublet model matches red and violet but retains a small secondary spectrum. Geometric spots, not Airy disks.'
  );
}

function sphericalScene(t) {
  const s = sphericalState(t),
    cy = 165,
    map = ([x, y]) => [35 + 0.7 * x, 25 + 0.7 * y];
  const detector = map([s.paraxial, cy])[0],
    stop = map([90, cy])[0],
    axisY = map([0, cy])[1];
  const left = points(p => {
    const y = cy - 120 + 240 * p;
    return map([380 - Math.sqrt(230 ** 2 - (y - cy) ** 2), y]);
  }, 40);
  const right = points(p => {
    const y = cy + 120 - 240 * p;
    return map([10 + Math.sqrt(230 ** 2 - (y - cy) ** 2), y]);
  }, 40);
  let body = polygon([...left, ...right], C.fill, C.blue) + line(45, axisY, 590, axisY, C.grid, 1);
  body += rect(stop - 3, 45, 6, axisY - 0.7 * s.aperture - 45, C.ink, 'none');
  body += rect(
    stop - 3,
    axisY + 0.7 * s.aperture,
    6,
    270 - axisY - 0.7 * s.aperture,
    C.ink,
    'none'
  );
  for (const height of [-110, -80, -50, -20, 0, 20, 50, 80, 110]) {
    const ray = sphericalTrace(height),
      end = [770, ray.H2[1] + ((770 - ray.H2[0]) * ray.d2[1]) / ray.d2[0]];
    body += path(
      [
        [20, cy + height],
        [90, cy + height],
      ].map(map),
      C.blue
    );
    body += visible(
      Math.abs(height) <= s.aperture,
      path([[90, cy + height], ray.H1, ray.H2, end].map(map), C.blue) +
        dot(
          detector,
          map([s.paraxial, ray.H2[1] + ((s.paraxial - ray.H2[0]) * ray.d2[1]) / ray.d2[0]])[1],
          3,
          C.red
        )
    );
  }
  body +=
    line(detector, 65, detector, 245, C.red, 2) + text(detector, 278, 'Fixed image plane', 16);
  body +=
    text(730, 97, 'Pupil diameter (%)', 17) + number(709, 132, (s.aperture / 110) * 100, 3, 0);
  body +=
    text(730, 194, 'Relative geometric blur', 17) +
    number(715, 230, s.blur / sphericalState(0).blur, 1, 2);
  body += text(450, 307, 'Same spherical lens; iris blocks outer rays', 18);
  return panel(
    'Stopping down reduces spherical aberration',
    body,
    'Exact spherical-surface traces, with the screen near the paraxial focus. This isolates geometric blur; very small apertures also cause diffraction (chapter 27).'
  );
}

function huygensScene(t) {
  const s = huygensState(t),
    x = 150,
    radius = 170 * s.radius;
  let body = line(x, 68, x, 302, C.guide, 2);
  for (let i = 0; i < 7; i += 1) {
    const y = 83 + 34 * i;
    body += path(
      points(
        p => [
          x + radius * Math.cos(-Math.PI / 2 + Math.PI * p),
          y + radius * Math.sin(-Math.PI / 2 + Math.PI * p),
        ],
        40
      ),
      C.blue,
      'none',
      1
    );
    body += dot(x, y, 3, C.guide);
  }
  body += rect(40, 42, 440, 38, '#ffffff', 'none');
  body += line(x + radius, 82, x + radius, 302, C.green, 4);
  body += text(95, 63, 'Old front', 16) + text(357, 63, 'New front: envelope', 16);
  body += arrow(x, 297, radius, 0, C.red, 2);
  body += text(683, 113, 'Every wavelet has radius vt', 19);
  body += readout(580, 181, 't (units)', s.time, 1, 2);
  body += readout(580, 244, 'vt (units)', s.radius, 1, 2);
  return panel(
    'Huygens wavelets construct the next plane wavefront',
    body,
    'All sources on the old front emit simultaneously in the same medium. Equal wavelet radii grow as vt; their common tangent advances at the wave speed.'
  );
}

function doubleSlitScene(t) {
  const s = doubleSlit(t),
    y = 180 - (s.y / 0.00825) * 105;
  let body =
    line(100, 73, 100, 106, C.ink, 6) +
    line(100, 122, 100, 238, C.ink, 6) +
    line(100, 254, 100, 300, C.ink, 6);
  body += line(510, 65, 510, 302, C.ink, 3);
  body += path(
    [
      [100, 114],
      [510, y],
    ],
    C.blue,
    'none',
    2.5
  );
  body += path(
    [
      [100, 246],
      [510, y],
    ],
    C.red,
    'none',
    2.5
  );
  body += dot(510, y, 7, C.green);
  body += text(77, 119, 'S1', 16) + text(77, 251, 'S2', 16);
  body += text(325, 68, 'Probe scans a screen 1 m away', 18);
  body += readout(606, 101, 'y (mm)', 1000 * s.y, 1, 2, true);
  body += readout(606, 150, 'Δℓ / λ', s.difference / wavelength, 1, 2, true);
  body += readout(606, 199, 'I / I max', s.intensity, 1, 2);
  const cx = 701,
    cy = 267;
  body += ellipse(cx, cy, 33, 33, 'none', C.grid);
  body += arrow(cx, cy, 33, 0, C.blue, 2);
  body += arrow(cx, cy, 33 * Math.cos(s.phase), -33 * Math.sin(s.phase), C.red, 2);
  body += text(802, 274, 'Phase', 16);
  return panel(
    'Double-slit brightness follows the two path lengths',
    body,
    'Coherent equal-amplitude slits: d = 0.20 mm, λ = 550 nm. Exact path difference sets Δφ = 2πΔℓ/λ and I/I max = cos²(Δφ/2). Diagram spacing is exaggerated.'
  );
}

function fringeScene(t) {
  const s = fringeState(t),
    dy = s.spacing * 1000 * 13,
    slitGap = s.d * 40000,
    screenX = 385 + 80 * s.screen;
  let body =
    line(100, 76, 100, 180 - slitGap / 2 - 2, C.ink, 6) +
    line(100, 180 - slitGap / 2 + 2, 100, 180 + slitGap / 2 - 2, C.ink, 6) +
    line(100, 180 + slitGap / 2 + 2, 100, 296, C.ink, 6);
  body += line(screenX, 70, screenX, 298, C.ink, 2);
  for (let m = -2; m <= 2; m += 1) {
    body += rect(screenX - 40, 180 + m * dy - 4, 80, 8, C.red, 'none');
  }
  body += line(100, 180, screenX - 40, 180 + dy, C.guide, 1, '5 4');
  body +=
    arrow(screenX + 55, 180, 0, dy, C.blue, 2) + arrow(screenX + 55, 180 + dy, 0, -dy, C.blue, 2);
  body += text(330, 63, 'Wavelength → separation → screen distance', 16);
  body += readout(610, 111, 'λ (nm)', s.lambda * 1e9, 3, 0);
  body += readout(610, 158, 'd (mm)', s.d * 1000, 1, 2);
  body += readout(610, 205, 'L (m)', s.screen, 1, 2);
  body += readout(610, 252, 'Δy (mm)', s.spacing * 1000, 1, 2);
  body += text(325, 310, 'Fringe ruler: Δy ≈ Lλ/d', 18);
  return panel(
    'Fringe spacing responds to one parameter at a time',
    body,
    'Each stage holds the other parameters fixed. Fraunhofer, small-angle, narrow-slit model; wavelength changes do not represent a single traveling wave changing color.'
  );
}

function singleSlitScene(t) {
  const s = slitState(t),
    half = (s.width / wavelength) * 7;
  let body = line(105, 72, 105, 180 - half, C.ink, 9) + line(105, 180 + half, 105, 302, C.ink, 9);
  body += arrow(42, 180, 53, 0, C.blue, 3);
  body += line(315, 70, 315, 301, C.guide, 2);
  const minimumY = 205 * Math.tan(Math.asin(s.firstMinimum));
  body +=
    line(110, 180, 315, 180 - minimumY, C.blue, 1.5) +
    line(110, 180, 315, 180 + minimumY, C.blue, 1.5);
  body += rect(309, 180 - minimumY, 12, 2 * minimumY, C.red, 'none', 0.3);
  body += text(207, 65, 'Central band widens', 17);
  body += line(420, 280, 850, 280, C.ink, 1.5) + line(635, 85, 635, 280, C.grid, 1);
  body += path(
    points(p => [420 + 430 * p, 280 - 170 * slitIntensity(-0.9 + 1.8 * p, s.width)], 360),
    C.red,
    'none',
    3
  );
  body += text(635, 72, 'I / I central peak', 17);
  for (const u of [-0.8, 0, 0.8]) body += text(635 + (430 / 1.8) * u, 302, String(u), 15);
  body += text(817, 320, 'sin θ', 15);
  body += text(181, 255, 'a / λ', 17) + number(165, 286, s.width / wavelength, 1, 2);
  return panel(
    'A narrower slit spreads the far-field pattern',
    body,
    'Fixed λ = 550 nm; a decreases from 6λ to 2λ. I/I central peak = (sin β/β)², β = πa sin θ/λ. First minima: sin θ = ±λ/a. Each curve is peak-normalized.'
  );
}

function gratingScene(t) {
  const n = gratingCount(t);
  let body = text(205, 66, 'Same spacing d; more illuminated slits', 17);
  for (let j = 0; j < 16; j += 1) {
    const y = 180 + (j - 7.5) * 12;
    body += visible(
      Math.abs(j - 7.5) < n / 2,
      line(155, y - 3, 155, y + 3, C.blue, 5) + arrow(165, y, 122, 0, C.blue, 1)
    );
  }
  body += text(330, 179, 'N =', 18) + number(365, 179, n, 2, 0);
  body += line(430, 280, 850, 280, C.ink, 1.5);
  for (const count of [2, 4, 8, 16]) {
    body += visible(
      n === count,
      path(
        points(p => [430 + 420 * p, 280 - 175 * gratingIntensity(-1.4 + 2.8 * p, count)], 560),
        C.purple,
        'none',
        3
      )
    );
  }
  for (const order of [-1, 0, 1]) {
    const x = 640 + (order * 420) / 2.8;
    body += line(x, 91, x, 280, C.grid, 1, '5 4') + text(x, 303, String(order), 16);
  }
  body += text(640, 70, 'I / I max(N)', 18) + text(793, 321, 'd sin θ / λ', 15);
  return panel(
    'More slits sharpen the principal grating maxima',
    body,
    'N steps through 2, 4, 8, 16 at fixed d and λ. Ideal narrow slits; each curve is normalized to its own peak. Maxima stay at integer d sin θ/λ.'
  );
}

function rayleighScene(t) {
  const s = resolutionState(t),
    x = angle => 310 + angle * 80;
  const component = (angle, sign) => airyIntensity(angle - (sign * s.separation) / 2, s.aperture);
  let body = text(320, 69, 'Two incoherent, equal-brightness point sources', 17);
  body += text(320, 90, 'Intensity / one-source peak', 15);
  body +=
    text(115, 111, 'Source 1', 14, C.blue) +
    text(270, 111, 'Source 2', 14, C.gold) +
    text(430, 111, 'Sum', 14, C.purple);
  for (const intensity of [0, 1, 2]) body += text(55, 287 - 80 * intensity, String(intensity), 14);
  body += line(70, 282, 550, 282, C.ink, 1.5);
  for (const [sign, color] of [
    [-1, C.blue],
    [1, C.gold],
  ]) {
    body += path(
      points(p => {
        const angle = -3 + 6 * p;
        return [x(angle), 282 - 80 * component(angle, sign)];
      }, 300),
      color,
      'none',
      2
    );
    body += line(
      x((sign * s.separation) / 2),
      90,
      x((sign * s.separation) / 2),
      282,
      C.grid,
      1,
      '5 4'
    );
  }
  body += path(
    points(p => {
      const angle = -3 + 6 * p;
      return [x(angle), 282 - 80 * (component(angle, -1) + component(angle, 1))];
    }, 300),
    C.purple,
    'none',
    3
  );
  for (const angle of [-2, 0, 2]) body += text(x(angle), 304, String(angle), 15);
  body += text(442, 321, 'Angle / initial θR', 15);
  body += readout(610, 112, 'D / D0', s.aperture, 1, 2);
  body += readout(610, 166, 'Gap / θR', s.rayleighRatio, 1, 2);
  body += text(738, 225, 'Rayleigh separation = 1', 16);
  body += visible(s.rayleighRatio >= 1, text(738, 269, 'At or above criterion', 18, C.green));
  body += visible(s.rayleighRatio < 1, text(738, 269, 'Below criterion', 18, C.red));
  return panel(
    'Resolution depends on separation and aperture',
    body,
    'First close the sources; then enlarge D at fixed gap. Circular-aperture Airy intensities add (purple). θR ≈ 1.22λ/D; profiles normalized to one source’s peak.'
  );
}

function thinFilmScene(t) {
  const s = filmState(t),
    top = 127,
    bottom = top + 110 * t;
  let body = rect(80, top, 300, bottom - top, C.fill, C.blue);
  body += line(80, bottom, 380, bottom, C.guide, 2);
  body += text(231, 86, 'Air / film / air; normal incidence', 17);
  body += text(230, 112, 'Top reflection: π phase reversal', 16, C.red);
  body += text(230, 270, 'Bottom reflection: no reversal', 16, C.blue);
  body += text(230, (top + bottom) / 2 + 5, 'n = 1.50', 17);
  body += line(403, top, 403, bottom, C.ink, 2) + text(433, (top + bottom) / 2 + 5, 't', 18);
  body += text(230, 309, 't (nm)', 17) + number(295, 309, s.thickness * 1e9, 3, 0);
  const cx = 680,
    cy = 230,
    scale = 190;
  body += ellipse(cx + scale * s.first, cy, scale * s.second, scale * s.second, 'none', C.grid);
  body += arrow(cx, cy, scale * s.first, 0, C.red);
  body += arrow(
    cx + scale * s.first,
    cy,
    scale * s.second * Math.cos(s.propagationPhase),
    -scale * s.second * Math.sin(s.propagationPhase),
    C.blue
  );
  body += arrow(cx, cy, scale * s.real, -scale * s.imaginary, C.purple, 2);
  body += text(698, 92, 'Two reflected field contributions', 17);
  body += readout(571, 137, 'Reflected %', s.reflectance * 100, 2, 2);
  body += text(699, 302, 'Purple: resultant reflected field', 16);
  return panel(
    'Film thickness changes the reflected phase',
    body,
    'Two-beam Fresnel approximation, λ0 = 550 nm. Propagation adds 4πnt/λ0; reflection adds a relative π shift. Further internal reflections are omitted; thickness is schematic.'
  );
}

function malusScene(t) {
  const s = malusState(t),
    ux = Math.sin(s.theta),
    uy = -Math.cos(s.theta);
  let body = arrow(95, 195, 0, -73, C.blue, 4) + text(95, 265, 'Incident E', 18);
  body += arrow(138, 190, 125, 0, C.guide, 1);
  body += ellipse(350, 190, 69, 69, 'none', C.grid);
  body += line(350 - 65 * ux, 190 - 65 * uy, 350 + 65 * ux, 190 + 65 * uy, C.guide, 3);
  body += arrow(350, 190, 73 * s.field * ux, 73 * s.field * uy, C.purple, 4);
  body += arrow(555, 190, 73 * s.field * ux, 73 * s.field * uy, C.purple, 4);
  body += text(350, 89, 'Rotating analyzer', 18) + text(555, 265, 'Projected E', 18);
  body += text(330, 301, 'θ (°)', 17) + number(383, 301, 180 * t, 3, 0);
  body += rect(729, 260 - 140 * s.intensity, 54, 140 * s.intensity, C.green, 'none');
  body += text(756, 88, 'I / I in', 18) + number(740, 300, s.intensity, 1, 2);
  return panel(
    'Malus’s law: project the field, then square it',
    body,
    'Linearly polarized input. The transmitted field is its signed projection onto the analyzer axis; intensity is nonnegative and proportional to cos²θ.'
  );
}

function crossedScene(t) {
  const s = crossedState(t),
    angles = [0, s.theta, Math.PI / 2],
    fractions = [s.first, s.middle, s.final];
  let body = text(450, 65, 'Unpolarized input I0; first and last axes stay crossed', 18);
  body += text(450, 87, 'Green arrows: transmitted field amplitude', 15, C.green);
  for (let i = 0; i < 3; i += 1) {
    const x = 150 + 300 * i,
      theta = angles[i],
      ux = Math.sin(theta),
      uy = -Math.cos(theta);
    body += ellipse(x, 157, 61, 61, C.fill, C.blue);
    body += line(x - 51 * ux, 157 - 51 * uy, x + 51 * ux, 157 + 51 * uy, C.blue, 4);
    body += arrow(
      x,
      157,
      63 * Math.sqrt(fractions[i]) * ux,
      63 * Math.sqrt(fractions[i]) * uy,
      C.green,
      4
    );
    body += text(x, 247, ['First: 0°', 'Middle: θ', 'Last: 90°'][i], 17);
    body += number(x - 28, 285, 100 * fractions[i], 2, 1) + text(x + 43, 285, '% I0', 16);
    if (i < 2) body += arrow(x + 75, 157, 150, 0, C.guide, 2);
  }
  body += text(450, 307, 'θ (°)', 16) + number(492, 307, 90 * t, 2, 0);
  return panel(
    'A middle polarizer transmits light through crossed filters',
    body,
    'Sequential projections: I out/I0 = ½ cos²θ sin²θ. Maximum is 1/8 at 45°; transmission is zero at 0°, 90°, or with the middle filter removed (ideal filters).'
  );
}

const scenes = {
  Figure_26_04_05: immersionScene,
  Figure_26_04_04: fiberScene,
  Figure_26_05_03: telescopeScene,
  Figure_26_06_01: chromaticScene,
  Figure_26_06_03: sphericalScene,
  Figure_27_02_02: huygensScene,
  Figure_27_03_05: doubleSlitScene,
  Figure_27_03_08: fringeScene,
  Figure_27_05_03: singleSlitScene,
  Figure_27_04_03: gratingScene,
  Figure_27_07_02: thinFilmScene,
  Figure_27_08_07: malusScene,
};
export const animationNames26to27 = Object.keys(scenes);
export function animateFigure26to27(name, svg) {
  return scenes[name] ? appendAnimation(svg, scenes[name], opts) : svg;
}
const companion = (title, desc, draw) => () => standalone(title, desc, draw, opts);
export default {
  companion_27_08_crossed_polarizers: companion(
    'A middle polarizer between crossed filters',
    'With unpolarized incident light, a middle filter rotates between two crossed outer filters. Sequential projections produce zero transmission at either endpoint and a maximum of one eighth of incident intensity at 45 degrees.',
    crossedScene
  ),
  companion_26_01_accommodation: companion(
    'Accommodation of the eye',
    'An equivalent thin eye lens increases power from 50 to 54 diopters while maintaining an inverted image at a fixed retina 2 centimeters behind the lens.',
    accommodationScene
  ),
  companion_26_02_vision_correction: companion(
    'Correcting myopia and hyperopia',
    'Two schematic eyes keep their power fixed while a negative or positive correction moves the focus onto the retina. The model treats the correction and eye as lenses in contact.',
    correctionScene
  ),
  companion_27_06_rayleigh: companion(
    'Resolving two point sources',
    'Two mutually incoherent equal-brightness point sources have circular-aperture Airy intensity profiles. First their separation shrinks; then a larger aperture narrows each profile at fixed separation.',
    rayleighScene
  ),
};
