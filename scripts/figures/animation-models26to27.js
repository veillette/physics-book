/** Analytic optical states. Distances are SI unless explicitly schematic. */
import { traceSphericalRay, telescopeRayPath } from './ch26.js';

export const wavelength = 550e-9;
export function accommodation(progress) {
  const vergence = 4 * progress,
    imageDistance = 0.02;
  return { vergence, imageDistance, power: 1 / imageDistance + vergence };
}
export function visionCorrection(progress, hyperopic = false) {
  // Equivalent lenses in contact; the eye's own power stays fixed.
  const vergence = hyperopic ? 4 : 0,
    eyePower = hyperopic ? 49 : 55;
  const correction = (50 + vergence - eyePower) * progress;
  return { vergence, eyePower, correction, imageDistance: 1 / (eyePower + correction - vergence) };
}
export const immersionIndices = [1, 1.33, 1.51];
export function immersion(index) {
  const n = immersionIndices[index],
    glassAngle = (35 * Math.PI) / 180;
  const angle = Math.asin((1.52 * Math.sin(glassAngle)) / n);
  const halfAngle = Math.PI / 4;
  return { n, angle, halfAngle, na: n * Math.sin(halfAngle), collected: angle <= halfAngle };
}

export const fiberIndices = { core: 1.5, cladding: 1.46, outside: 1 };
export function fiberState(progress) {
  const { core, cladding, outside } = fiberIndices;
  const alpha = ((5 + 25 * progress) * Math.PI) / 180;
  const beta = Math.asin((outside * Math.sin(alpha)) / core);
  const incidence = Math.PI / 2 - beta,
    critical = Math.asin(cladding / core);
  const acceptance = Math.asin(Math.sqrt(core ** 2 - cladding ** 2) / outside);
  const guided = incidence >= critical;
  let reflectance = 1,
    transmittedAngle = 0;
  if (!guided) {
    const theta = Math.asin((core * Math.sin(incidence)) / cladding);
    const ci = Math.cos(incidence),
      ct = Math.cos(theta);
    const rs = (core * ci - cladding * ct) / (core * ci + cladding * ct);
    const rp = (cladding * ci - core * ct) / (cladding * ci + core * ct);
    reflectance = (rs ** 2 + rp ** 2) / 2;
    transmittedAngle = Math.PI / 2 - theta;
  }
  const segments = [];
  let x = 0,
    y = 0,
    sign = 1,
    power = 1,
    stopped = false;
  for (let i = 0; i < 4; i += 1) {
    const distance = stopped ? 0 : Math.min((sign * 0.5 - y) / (sign * Math.tan(beta)), 8 - x);
    const end = [x + distance, y + sign * distance * Math.tan(beta)];
    const hit = !stopped && end[0] < 8 - 1e-9;
    segments.push({ start: [x, y], end, hit, power, sign });
    [x, y] = end;
    if (hit) {
      sign *= -1;
      power *= reflectance;
    } else stopped = true;
  }
  return {
    alpha,
    beta,
    incidence,
    critical,
    acceptance,
    guided,
    reflectance,
    transmittedAngle,
    segments,
  };
}

export const telescopePaths = [110, 370].map(telescopeRayPath);
export function pathLength(points) {
  return points
    .slice(1)
    .reduce(
      (sum, point, i) => sum + Math.hypot(point[0] - points[i][0], point[1] - points[i][1]),
      0
    );
}
export function pathPoint(points, distance) {
  let remaining = Math.max(0, distance);
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1],
      b = points[i],
      length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (remaining <= length) return a.map((v, k) => v + ((b[k] - v) * remaining) / length);
    remaining -= length;
  }
  return points.at(-1);
}

export function chromaticFocus(nm, corrected = false) {
  // Same singlet model as the original; an illustrative doublet retains small
  // secondary spectrum rather than claiming every color shares one focus.
  const focal = corrected
    ? 0.15 + 0.001 * (1 - ((nm - 555) / 145) ** 2)
    : 0.145 + ((nm - 410) / 290) * 0.015;
  return 1 / (1 / focal - 1 / 0.25);
}
export function chromaticState(progress) {
  return { detector: 0.31 + 0.17 * progress };
}
export function sphericalTrace(height) {
  return traceSphericalRay(150, 240, 165, 230, 120, [20, 165 + height], [1, 0]);
}
const axisCrossing = ray => ray.H2[0] + ((165 - ray.H2[1]) * ray.d2[0]) / ray.d2[1];
export function sphericalState(progress) {
  const aperture = 110 - 80 * progress,
    paraxial = axisCrossing(sphericalTrace(1));
  const edge = sphericalTrace(aperture);
  const blur = Math.abs(edge.H2[1] + ((paraxial - edge.H2[0]) * edge.d2[1]) / edge.d2[0] - 165);
  return { aperture, paraxial, marginal: axisCrossing(edge), blur };
}
export function huygensState(progress) {
  return { time: progress, speed: 1, radius: progress };
}

export function doubleSlit(progress) {
  const d = 0.0002,
    screen = 1,
    y = (2 * progress - 1) * 0.00825;
  const upper = Math.hypot(screen, y - d / 2),
    lower = Math.hypot(screen, y + d / 2);
  const difference = lower - upper,
    phase = (2 * Math.PI * difference) / wavelength;
  return { d, screen, y, upper, lower, difference, phase, intensity: Math.cos(phase / 2) ** 2 };
}
export function fringeState(progress) {
  const lambda = (450 + 200 * Math.min(3 * progress, 1)) * 1e-9;
  const d = (0.2 + 0.2 * Math.max(0, Math.min(3 * progress - 1, 1))) * 1e-3;
  const screen = 1 + Math.max(0, 3 * progress - 2);
  return { lambda, d, screen, spacing: (screen * lambda) / d };
}
export function sincSquared(beta) {
  return Math.abs(beta) < 1e-9 ? 1 : (Math.sin(beta) / beta) ** 2;
}
export function slitState(progress) {
  const width = (6 - 4 * progress) * wavelength;
  return { width, firstMinimum: wavelength / width };
}
export function slitIntensity(sinTheta, width) {
  return sincSquared((Math.PI * width * sinTheta) / wavelength);
}
export function gratingCount(progress) {
  return [2, 4, 8, 16][Math.min(3, Math.floor(4 * progress))];
}
export function gratingIntensity(order, count) {
  const denominator = Math.sin(Math.PI * order);
  return Math.abs(denominator) < 1e-10
    ? 1
    : (Math.sin(count * Math.PI * order) / (count * denominator)) ** 2;
}

// Use the convergent series near the origin, then the integer-order integral
// representation. Quadrature avoids subtracting enormous alternating terms for
// the outer rings of a larger aperture. Both branches are deterministic.
export function besselJ1(x) {
  if (Math.abs(x) > 16) {
    let integral = 0;
    const count = 512;
    for (let k = 0; k < count; k += 1) {
      const tau = (Math.PI * (k + 0.5)) / count;
      integral += Math.cos(tau - x * Math.sin(tau));
    }
    return integral / count;
  }
  let term = x / 2,
    sum = term;
  for (let k = 1; k < 80; k += 1) {
    term *= (-x * x) / (4 * k * (k + 1));
    sum += term;
    if (Math.abs(term) < 1e-15) break;
  }
  return sum;
}
export const airyFirstZero = 3.8317059702075125;
export function airyIntensity(rayleighUnits, aperture = 1) {
  const u = airyFirstZero * rayleighUnits * aperture;
  return Math.abs(u) < 1e-9 ? 1 : ((2 * besselJ1(u)) / u) ** 2;
}
export function resolutionState(progress) {
  const separation = 2.2 - 1.7 * Math.min(2 * progress, 1);
  const aperture = 1 + 2 * Math.max(0, 2 * progress - 1);
  return { separation, aperture, rayleighRatio: separation * aperture };
}

export function filmState(progress) {
  const index = 1.5,
    thickness = (wavelength / index) * progress;
  const propagationPhase = (4 * Math.PI * index * thickness) / wavelength;
  const first = -0.2,
    second = 0.8 * 0.2 * 1.2; // Fresnel r12, t12 r23 t21 at normal incidence.
  const real = first + second * Math.cos(propagationPhase),
    imaginary = second * Math.sin(propagationPhase);
  return {
    index,
    thickness,
    propagationPhase,
    first,
    second,
    real,
    imaginary,
    reflectance: real ** 2 + imaginary ** 2,
  };
}
export function malusState(progress) {
  const theta = Math.PI * progress,
    field = Math.cos(theta);
  return { theta, field, intensity: field ** 2 };
}
export function crossedState(progress) {
  const theta = (Math.PI / 2) * progress,
    first = 0.5;
  const middle = first * Math.cos(theta) ** 2,
    final = middle * Math.sin(theta) ** 2;
  return { theta, first, middle, final };
}
