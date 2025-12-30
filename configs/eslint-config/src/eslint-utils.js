import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import { helpers } from 'eslint-config-airbnb-extended';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export const rootPath = path.resolve(dirname, '..', '..', '..');

export const gitIgnoreFile = includeIgnoreFile(path.resolve(rootPath, '.gitignore'));

export const { getDevDepsList } = helpers;

export { defineConfig, globalIgnores } from 'eslint/config';
