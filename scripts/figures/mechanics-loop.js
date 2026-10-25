/** Shared clothoid geometry for the original loop and its motion companion. */
export function teardropLoop() {
  const length = 1100,
    steps = 1000;
  const heading = u =>
    u <= 0.5 ? Math.PI - 4 * Math.PI * u * u : -Math.PI + 4 * Math.PI * (1 - u) ** 2;
  const points = [[610, 480]];
  for (let k = 0; k < steps; k++) {
    const a = heading((k + 0.5) / steps),
      p = points.at(-1);
    points.push([p[0] + (length / steps) * Math.cos(a), p[1] - (length / steps) * Math.sin(a)]);
  }
  return { length, steps, heading, points };
}
