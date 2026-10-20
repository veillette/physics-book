#!/usr/bin/env node
/**
 * Generate the free-body diagrams (SVG) used in the worked solutions of
 * chapters 4–6.
 *
 * Each diagram is defined in scripts/fbd/chNN.js as a function that returns an
 * SVG string. Files are written to resources/fbd_CC_SS_pNN.svg, where CC is the
 * chapter, SS the section, and NN the problem number within that section's
 * Problems & Exercises.
 *
 * Usage:
 *   node scripts/generate-fbd.js            # write every diagram
 *   node scripts/generate-fbd.js 04_03      # only names containing "04_03"
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ch04 from './fbd/ch04.js';
import ch05 from './fbd/ch05.js';
import ch06 from './fbd/ch06.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'resources');
const filter = process.argv[2] || '';

const diagrams = { ...ch04, ...ch05, ...ch06 };
let count = 0;
for (const [name, build] of Object.entries(diagrams)) {
  if (filter && !name.includes(filter)) continue;
  fs.writeFileSync(path.join(outDir, `${name}.svg`), build());
  count += 1;
}
console.log(`Wrote ${count} free-body diagram(s) to resources/`);
