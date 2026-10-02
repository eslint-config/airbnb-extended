#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const version = process.argv[2];

if (!version || !/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
  console.error('Usage: pnpm bump <version>   (example: pnpm bump 3.3.0)');
  process.exit(1);
}

const root = path.resolve(import.meta.dirname, '..');
const workspaceFolders = ['apps', 'configs', 'packages'];

const files = [
  path.join(root, 'package.json'),
  path.join(root, 'docs/package.json'),
  ...workspaceFolders.flatMap((folder) =>
    fs
      .readdirSync(path.join(root, folder), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(root, folder, entry.name, 'package.json'))
      .filter((file) => fs.existsSync(file)),
  ),
];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  const previous = json.version;
  json.version = version;
  fs.writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`);
  console.log(`${path.relative(root, file)}: ${previous} -> ${version}`);
}

console.log('\nNext: update CHANGELOG.md, then run `pnpm install` and `pnpm test`.');
