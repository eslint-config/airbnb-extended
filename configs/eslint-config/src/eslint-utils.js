import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { helpers } from 'eslint-config-airbnb-extended';

const dirname = path.dirname(fileURLToPath(import.meta.url));

const rootPath = path.resolve(dirname, '..', '..', '..');

export const gitIgnoreFile = includeIgnoreFile(path.resolve(rootPath, '.gitignore'));

// export const rootFolders = readdirSync(rootPath, { withFileTypes: true })
//   .filter((dirent) => dirent.isDirectory())
//   .map((dirent) => `**/${dirent.name}`)
//   .filter((folder) => !gitIgnoreFile.ignores.includes(folder));

export const { getDevDepsList } = helpers;

export { defineConfig, globalIgnores } from 'eslint/config';
