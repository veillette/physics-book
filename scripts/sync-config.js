#!/usr/bin/env node

/**
 * sync-config.js
 *
 * Synchronizes _config.yml with package.json settings.
 * Updates repository URL and baseurl based on package.json values.
 *
 * Usage:
 *   node scripts/sync-config.js [options]
 *
 * Options:
 *   --dry-run   Show what would be changed without making changes
 *   --help      Show this help message
 */

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

import { printHeader, printDivider, printSuccess, printSummary } from './lib/reporter.js';

import { runCli, STANDARD_FLAGS } from './lib/cli.js';

import { getBaseDir, readFile, writeFile } from './lib/files.js';

/**
 * Config synchronizer class.
 */
class ConfigSynchronizer {
  constructor(options = {}) {
    this.baseDir = getBaseDir(import.meta.url);
    this.packageJsonPath = path.join(this.baseDir, 'package.json');
    this.configYmlPath = path.join(this.baseDir, '_config.yml');
    this.dryRun = options.dryRun || false;

    this.stats = {
      changes: 0,
      errors: 0,
    };
  }

  async run() {
    printHeader('🔄', 'Config Synchronizer');

    if (this.dryRun) {
      console.log('(DRY RUN - no changes will be made)\n');
    }

    try {
      // Read package.json
      if (!fs.existsSync(this.packageJsonPath)) {
        console.error(`Error: package.json not found: ${this.packageJsonPath}`);
        this.stats.errors++;
        return false;
      }

      const packageJson = JSON.parse(readFile(this.packageJsonPath));
      const repoUrl = packageJson.repository;
      const name = packageJson.name;

      console.log(`Package name: ${name}`);
      console.log(`Repository:   ${repoUrl}\n`);

      // Read _config.yml
      if (!fs.existsSync(this.configYmlPath)) {
        console.error(`Error: _config.yml not found: ${this.configYmlPath}`);
        this.stats.errors++;
        return false;
      }

      const configYml = yaml.load(readFile(this.configYmlPath));

      // Extract repository name from URL
      const repoName = repoUrl.replace(/https?:\/\/github.com\//, '');

      // Check what needs to change
      const changes = [];

      if (configYml.repository !== repoName) {
        changes.push({
          field: 'repository',
          from: configYml.repository,
          to: repoName,
        });
        configYml.repository = repoName;
      }

      const newBaseurl = `/${name}`;
      if (configYml.baseurl !== newBaseurl) {
        changes.push({
          field: 'baseurl',
          from: configYml.baseurl,
          to: newBaseurl,
        });
        configYml.baseurl = newBaseurl;
      }

      if (changes.length === 0) {
        console.log('No changes needed - config is already in sync');
      } else {
        console.log('Changes to apply:');
        for (const change of changes) {
          console.log(`  ${change.field}: "${change.from}" -> "${change.to}"`);
          this.stats.changes++;
        }

        if (!this.dryRun) {
          // Write _config.yml
          const yamlOutput = yaml.dump(configYml, {
            lineWidth: -1,
            noRefs: true,
            sortKeys: false,
          });
          writeFile(this.configYmlPath, yamlOutput);
        }
      }

      this.printResults();
      return true;
    } catch (error) {
      console.error(`Error: ${error.message}`);
      this.stats.errors++;
      return false;
    }
  }

  printResults() {
    printDivider();

    if (this.stats.changes > 0) {
      if (this.dryRun) {
        console.log(`\n${this.stats.changes} change(s) would be made`);
        console.log('\n⚠️ DRY RUN - Use without --dry-run to apply changes');
      } else {
        printSuccess('Config synchronized successfully!');
      }
    } else {
      printSuccess('Config is already in sync!');
    }

    printDivider();
    printSummary(this.stats.errors, 0);
  }
}

// CLI Configuration
runCli({
  name: 'sync-config',
  description: `Synchronizes _config.yml with package.json settings.

Updates:
- repository: from package.json repository URL
- baseurl: from package.json name`,
  flags: {
    dryRun: STANDARD_FLAGS.dryRun,
  },
  examples: [
    'node scripts/sync-config.js',
    'node scripts/sync-config.js --dry-run',
  ],
  run: async options => {
    const synchronizer = new ConfigSynchronizer(options);
    return synchronizer.run();
  },
});
