import { readFileSync, writeFileSync } from 'node:fs';

// Refresh the offline browser module and retain the upstream license.
const source = readFileSync('node_modules/minisearch/dist/es/index.js', 'utf8');
const license = readFileSync('node_modules/minisearch/LICENSE.txt', 'utf8');
writeFileSync(
  'assets/js/minisearch.js',
  `/* @license\n${license}\n*/\n${source.replace(/^\/\/# sourceMappingURL=.*$/m, '').trimEnd()}\n`
);
