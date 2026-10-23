#!/usr/bin/env node
/**
 * Generate the line-art figures (graphs, vector diagrams, geometry) that
 * replaced raster originals in chapters 2–10, the fluids figures of chapters 11
 * and 12, the oscillation and wave figures
 * of chapter 16, the sound and hearing figures of chapter 17, the
 * electrostatics figures of
 * chapter 18, the field, equipotential and capacitor figures of chapter 19, the circuit diagrams of chapter 21
 * (whose symbols live in scripts/figures/circuit.js), the magnetic-force figures
 * of chapter 22, the induction and AC-circuit figures of chapter 23, the
 * electromagnetic-wave figures of chapter 24, the ray-optics figures of
 * chapter 25, the vision and optical-instrument figures of chapter 26, the
 * wave-optics figures of chapter 27, the relativity figures of chapter 28, the
 * atomic-physics figures of chapter 30, the nuclear-physics figures of chapters 31
 * and 32, the particle-physics figures of chapter 33, the cosmology and
 * frontier figures of chapter 34, and the electromagnetic
 * spectrum of section 29.3, plus the figures in the answers to
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
import worldEnergy from './figures/world-energy.js';
import ch08 from './figures/ch08.js';
import ch09 from './figures/ch09.js';
import ch10 from './figures/ch10.js';
import mechanicsLineArt from './figures/mechanics-line-art.js';
import mechanicsSketches from './figures/mechanics-sketches.js';
import ch11to12 from './figures/ch11to12.js';
import ch16 from './figures/ch16.js';
import ch17 from './figures/ch17.js';
import ch18 from './figures/ch18.js';
import ch19 from './figures/ch19.js';
import ch20 from './figures/ch20.js';
import ch21 from './figures/ch21.js';
import ch22 from './figures/ch22.js';
import ch23 from './figures/ch23.js';
import ch24 from './figures/ch24.js';
import ch25 from './figures/ch25.js';
import ch26 from './figures/ch26.js';
import ch27 from './figures/ch27.js';
import ch28 from './figures/ch28.js';
import ch29 from './figures/ch29.js';
import ch30 from './figures/ch30.js';
import ch31 from './figures/ch31.js';
import ch32 from './figures/ch32.js';
import ch33 from './figures/ch33.js';
import ch34 from './figures/ch34.js';
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
  ...worldEnergy,
  ...ch08,
  ...ch09,
  ...ch10,
  ...mechanicsLineArt,
  ...mechanicsSketches,
  ...ch11to12,
  ...ch16,
  ...ch17,
  ...ch18,
  ...ch19,
  ...ch20,
  ...ch21,
  ...ch22,
  ...ch23,
  ...ch24,
  ...ch25,
  ...ch26,
  ...ch27,
  ...ch28,
  ...ch29,
  ...ch30,
  ...ch31,
  ...ch32,
  ...ch33,
  ...ch34,
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
