/** Three priority simulations: water heating, drainage and settled resonance. */
export const clamp = t => Math.max(0, Math.min(1, t));
export const sample = (fn, n = 160) => Array.from({ length: n + 1 }, (_, i) => fn(i / n));

// Book data in cal/g and degrees Celsius, at approximately one atmosphere.
export const heatingBreaks = [0, 10, 89.8, 189.8, 728.8, 738.44];
export const heatingTemperatures = [-20, 0, 0, 100, 100, 120];
export function heatingAtHeat(heat) {
  const q = Math.max(0, Math.min(heatingBreaks.at(-1), heat));
  let phase = 0;
  while (phase < 4 && q >= heatingBreaks[phase + 1]) phase++;
  const fraction = (q - heatingBreaks[phase]) / (heatingBreaks[phase + 1] - heatingBreaks[phase]);
  const temperature =
    heatingTemperatures[phase] +
    fraction * (heatingTemperatures[phase + 1] - heatingTemperatures[phase]);
  const ice = phase === 0 ? 1 : phase === 1 ? 1 - fraction : 0;
  const vapor = phase === 4 ? 1 : phase === 3 ? fraction : 0;
  return { heat: q, phase, fraction, temperature, ice, liquid: 1 - ice - vapor, vapor };
}
export function heatingState(t) {
  // Equal playback durations per stage, deliberately not a uniform-time clock.
  const q = 5 * clamp(t),
    stage = Math.min(4, Math.floor(q)),
    fraction = q - stage;
  return heatingAtHeat(
    heatingBreaks[stage] + fraction * (heatingBreaks[stage + 1] - heatingBreaks[stage])
  );
}

export const tank = { area: 0.5, outletArea: 0.002, initialHead: 2, outletHeight: 0.5, g: 9.8 };
export const drainDuration =
  (Math.sqrt((2 * tank.initialHead) / tank.g) * tank.area) / tank.outletArea;
export function drainAtTime(time) {
  const elapsed = Math.max(0, Math.min(drainDuration, time));
  const head = tank.initialHead * (1 - elapsed / drainDuration) ** 2,
    speed = Math.sqrt(2 * tank.g * head),
    flow = tank.outletArea * speed;
  const flightTime = Math.sqrt((2 * tank.outletHeight) / tank.g);
  return {
    time: elapsed,
    head,
    speed,
    flow,
    flightTime,
    range: speed * flightTime,
    active: head > 1e-12,
    drained: tank.area * (tank.initialHead - head),
  };
}
export const drainState = t => drainAtTime(clamp(t) * drainDuration);
export const jetPoint = (s, fraction) => {
  const time = s.flightTime * fraction;
  return [s.speed * time, tank.outletHeight - (tank.g * time ** 2) / 2];
};

// x'' + b x' + x = cos(r t), with omega0 = 1 and F0/k = 1.
export const dampingValues = [0.1, 0.2, 0.4];
export const resonanceRatios = [0.5, 0.8, 1, 1.2, 1.5];
export function response(ratio, damping) {
  const amplitude = 1 / Math.hypot(1 - ratio ** 2, damping * ratio);
  const lag = Math.atan2(damping * ratio, 1 - ratio ** 2);
  return { amplitude, lag };
}
export const resonancePeakRatio = b => Math.sqrt(1 - b ** 2 / 2);
export const resonanceScale = response(resonancePeakRatio(0.1), 0.1).amplitude;
export function resonanceState(t) {
  const q = 5 * clamp(t),
    stage = Math.min(4, Math.floor(q)),
    local = q - stage;
  const ratio = resonanceRatios[stage],
    time = 2 * Math.PI * local;
  return {
    stage,
    local,
    ratio,
    time,
    phase: ratio * time,
    responses: dampingValues.map(b => {
      const s = response(ratio, b),
        phase = ratio * time - s.lag;
      return {
        ...s,
        damping: b,
        position: s.amplitude * Math.cos(phase),
        velocity: -ratio * s.amplitude * Math.sin(phase),
        acceleration: -(ratio ** 2) * s.amplitude * Math.cos(phase),
      };
    }),
  };
}
