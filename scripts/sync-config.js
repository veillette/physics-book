
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const projectRoot = process.cwd();
const packageJsonPath = path.join(projectRoot, 'package.json');
const configYmlPath = path.join(projectRoot, '_config.yml');

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const repoUrl = packageJson.repository;
  const name = packageJson.name;

  // Extract repository name from URL
  const repoName = repoUrl.replace(/https?:\/\/github.com\//, '');


  // Read _config.yml
  const configYml = yaml.load(fs.readFileSync(configYmlPath, 'utf8'));

  // Update config.yml
  configYml.repository = repoName;
  configYml.baseurl = `/${name}`;

  // Write _config.yml
  fs.writeFileSync(configYmlPath, yaml.dump(configYml, {
    lineWidth: -1,
    noRefs: true,
    sortKeys: false,
  }));

  console.log('Successfully synchronized _config.yml with package.json.');

} catch (error) {
  console.error('Error synchronizing config files:', error);
  process.exit(1);
}
