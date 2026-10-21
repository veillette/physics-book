#!/usr/bin/env node
/**
 * Generate the line-art figures (graphs, vector diagrams, geometry) that
 * replaced raster originals in chapters 2–9 and the electromagnetic spectrum of
 * section 29.3, plus the figures in the answers to
 * the Conceptual Questions of chapters 1–9 (scripts/figures/concepts.js) and
 * chapters 21–25 (scripts/figures/concepts21to25.js), and the field-line and
 * equipotential sketches of sections 18.7 and 19.4 (scripts/figures/fields18to19.js).
 *
 * Each figure is defined in scripts/figures/chNN.js as a function that returns
 * an SVG string, keyed by its file name (e.g. Figure_02_08_05). Files are
 * written to resources/<name>.svg. The drawing primitives live in
 * scripts/figures/svg.js.
 *
 * Usage:
 *   node scripts/generate-figures.js            # write every figure
 *   node scripts/generate-figures.js 02_08      # only names containing "02_08"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ch02 from './figures/ch02.js';
import ch03 from './figures/ch03.js';
import projectileToSatellite from './figures/projectile-to-satellite.js';
import ch04to07 from './figures/ch04to07.js';
import ch08 from './figures/ch08.js';
import ch09 from './figures/ch09.js';
import ch29 from './figures/ch29.js';
import concepts from './figures/concepts.js';
import concepts21to25 from './figures/concepts21to25.js';
import fields18to19 from './figures/fields18to19.js';
import answers11to20 from './figures/answers11to20.js';
import completion from './figures/solution-completion.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'resources');
const filter = process.argv[2] || '';

const figures = {
  ...ch02,
  ...ch03,
  ...projectileToSatellite,
  ...ch04to07,
  ...ch08,
  ...ch09,
  ...ch29,
  ...concepts,
  ...concepts21to25,
  ...fields18to19,
  ...answers11to20,
  ...completion,
};
let count = 0;
for (const [name, build] of Object.entries(figures)) {
  if (filter && !name.includes(filter)) continue;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), build());
  count += 1;
}
console.log(`Wrote ${count} figure(s) to resources/`);
