#!/usr/bin/env node
/**
 * Generate the line-art figures (graphs, vector diagrams, geometry) that
 * replaced raster originals in chapters 2–10, the fluids figures of chapters 11
 * and 12, the temperature, gas-law, and kinetic-theory figures of chapter 13,
 * the heat and heat-transfer figures of chapter 14, the thermodynamics figures
 * of chapter 15, the oscillation and wave figures
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
 *   node scripts/generate-figures.js --check    # exit 1 if resources/ is out of date
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
import ch13 from './figures/ch13.js';
import fluidsAndThermalLineArt from './figures/fluids-and-thermal-line-art.js';
import ch14 from './figures/ch14.js';
import ch15 from './figures/ch15.js';
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
import animations01to13, { animateFigure, animationNames } from './figures/animations01to13.js';
import { animateFigure14to25, animationNames14to25 } from './figures/animations14to25.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'resources');
const args = process.argv.slice(2);
const check = args.includes('--check');
const filter = args.find(a => !a.startsWith('--')) || '';

const modules = {
  ch02,
  ch03,
  projectileToSatellite,
  ch04to07,
  worldEnergy,
  ch08,
  ch09,
  ch10,
  mechanicsLineArt,
  mechanicsSketches,
  ch11to12,
  ch13,
  fluidsAndThermalLineArt,
  ch14,
  ch15,
  ch16,
  ch17,
  ch18,
  ch19,
  ch20,
  ch21,
  ch22,
  ch23,
  ch24,
  ch25,
  ch26,
  ch27,
  ch28,
  ch29,
  ch30,
  ch31,
  ch32,
  ch33,
  ch34,
  concepts,
  concepts21to25,
  fields18to19,
  answers11to20,
  completion,
  animations01to13,
};

// A plain object spread would let a later module silently replace a figure
// with the same name, so merge by hand and refuse duplicates.
const figures = {};
const source = {};
for (const [module, entries] of Object.entries(modules)) {
  for (const [name, build] of Object.entries(entries)) {
    if (source[name]) {
      console.error(`Figure ${name} is defined in both ${source[name]} and ${module}.`);
      process.exit(1);
    }
    figures[name] = build;
    source[name] = module;
  }
}

let count = 0;
const stale = [];
const leftovers = [];
for (const [name, build] of Object.entries(figures)) {
  if (filter && !name.includes(filter)) continue;
  const file = path.join(outDir, `${name}.svg`);
  const svg = animateFigure14to25(name, animateFigure(name, build()));
  if (check) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== svg) stale.push(name);
  } else {
    fs.writeFileSync(file, svg);
  }
  // The raster a figure replaced should be deleted with the switch to SVG.
  for (const ext of ['jpg', 'jpeg', 'png', 'webp', 'gif']) {
    if (fs.existsSync(path.join(outDir, `${name}.${ext}`))) leftovers.push(`${name}.${ext}`);
  }
  count += 1;
}
const animationRegistryFile = path.join(root, 'assets/js/animated-figure-names.js');
const animationRegistry = `// Generated by scripts/generate-figures.js; do not edit.\nexport const animatedFigureNames = new Set([\n${[...animationNames, ...Object.keys(animations01to13), ...animationNames14to25].map(name => `  '${name}.svg',`).join('\n')}\n]);\n`;
if (check) {
  if (
    !fs.existsSync(animationRegistryFile) ||
    fs.readFileSync(animationRegistryFile, 'utf8') !== animationRegistry
  ) {
    stale.push('assets/js/animated-figure-names.js');
  }
} else {
  fs.writeFileSync(animationRegistryFile, animationRegistry);
}
if (leftovers.length) {
  console.warn(
    `Rasters replaced by generated SVGs are still in resources/:\n  ${leftovers.join('\n  ')}`
  );
}
if (check) {
  if (stale.length) {
    console.error(
      `${stale.length} of ${count} figure(s) differ from the generator; run npm run generate:figures:\n  ${stale.join('\n  ')}`
    );
    process.exit(1);
  }
  console.log(`All ${count} figure(s) in resources/ match the generator.`);
} else {
  console.log(`Wrote ${count} figure(s) to resources/`);
}
