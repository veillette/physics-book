/** Physical states for the eleven low-effort animation proposals. SI units. */
import { wallProfile } from './fluids-and-thermal-line-art.js';

export function wallProbe(progress) {
  const wall = wallProfile();
  const x = progress * wall.points.at(-1)[0];
  const index = Math.min(wall.layers.length - 1, wall.points.findIndex(p => p[0] >= x) - 1);
  const layer = Math.max(0, index);
  const [start, temperature] = wall.points[layer];
  return {
    x,
    temperature: temperature - (wall.flux * (x - start)) / wall.layers[layer].k,
    flux: wall.flux,
    wall,
  };
}

export function heatPumpEnergy(progress) {
  return { cold: 300 * progress, work: 100 * progress, hot: 400 * progress };
}

export function entropyTransfer(progress) {
  const heat = 4000 * progress;
  const hot = -heat / 600,
    cold = heat / 250;
  return { heat, hot, cold, total: hot + cold };
}

export function interferenceState(x, phase) {
  const first = Math.sin(x),
    second = Math.sin(x + phase);
  return { first, second, sum: first + second, amplitude: 2 * Math.abs(Math.cos(phase / 2)) };
}

export function coulombPair(progress, unlike = false) {
  const r = 0.08 + 0.08 * progress,
    q1 = 1e-9,
    q2 = (unlike ? -1 : 1) * 1e-9;
  const rightForce = (8.9875517923e9 * q1 * q2) / (r * r);
  return { r, leftForce: -rightForce, rightForce };
}

export function pointEquipotential(progress) {
  const radial = Math.max(0, 2 * progress - 1);
  const r = 0.1 + 0.1 * radial,
    theta = 2 * Math.PI * Math.min(2 * progress, 1);
  const potential = 1 / r,
    charge = 1e-6;
  return {
    r,
    theta,
    x: r * Math.cos(theta),
    y: r * Math.sin(theta),
    potential,
    work: -charge * (potential - 10),
  };
}

export function uniformEquipotential(progress) {
  const x = 0.05 + 0.1 * Math.max(0, 2 * progress - 1);
  const y = 0.1 * Math.min(2 * progress, 1);
  const potential = 100 - 500 * x;
  return { x, y, potential, work: -1e-6 * (potential - 75) };
}

export const electronCharge = 1.602176634e-19;
export function carrierCurrent(n, charge, area, velocity) {
  return n * charge * area * velocity;
}

export function wireGeometry(progress) {
  const length = 1 + Math.min(2 * progress, 1);
  const area = 1e-6 * (1 + Math.max(2 * progress - 1, 0));
  const resistivity = 1e-6,
    voltage = 5;
  const resistance = (resistivity * length) / area;
  return { length, area, resistivity, voltage, resistance, current: voltage / resistance };
}

export function resistiveAC(time) {
  const phase = 2 * Math.PI * time;
  const voltage = 10 * Math.sin(phase),
    current = 2 * Math.sin(phase);
  return { voltage, current, power: voltage * current, meanPower: 10 };
}

export function batteryLoad(progress) {
  const emf = 12,
    internal = 1,
    load = 1 + 11 * progress;
  const current = emf / (load + internal);
  return { emf, internal, load, current, terminal: current * load, loss: current * internal };
}

export function spectrumState(progress) {
  const frequency = 10 ** (6 + 16 * progress),
    c = 299792458;
  return { frequency, wavelength: c / frequency, c };
}
