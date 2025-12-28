import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const gitignorePath = path.resolve(dirname, '..', '..', '..', '..', '.gitignore');

export const gitIgnoreFile = includeIgnoreFile(gitignorePath);
