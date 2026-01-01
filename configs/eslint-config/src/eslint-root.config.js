import { readdirSync } from 'node:fs';

import config from './eslint-base.config.js';
import { defineConfig, gitIgnoreFile, globalIgnores, rootPath } from './eslint-utils.js';

export const rootFolders = readdirSync(rootPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => `**/${dirent.name}`)
  .filter((folder) => !gitIgnoreFile.ignores.includes(folder));

export default defineConfig([
  // Ignores every everything except root files
  {
    ...globalIgnores(rootFolders),
    name: 'x/ignore-everything-except-root-files',
  },
  ...config,
]);
