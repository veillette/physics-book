#!/usr/bin/env node
/**
 * Generate the line-art figures (graphs, vector diagrams, geometry) that
 * replaced raster originals in chapters 2–7, plus the figures in the answers to
 * the chapter 1–5 Conceptual Questions (scripts/figures/concepts.js).
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
import ch04to07 from './figures/ch04to07.js';
import concepts from './figures/concepts.js';
import completion from './figures/solution-completion.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'resources');
const filter = process.argv[2] || '';

const figures = { ...ch02, ...ch03, ...ch04to07, ...concepts, ...completion };
let count = 0;
for (const [name, build] of Object.entries(figures)) {
  if (filter && !name.includes(filter)) continue;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), build());
  count += 1;
}
console.log(`Wrote ${count} figure(s) to resources/`);
