import { defineConfig } from 'eslint/config';

import { generalConfig } from './eslint/general.eslint.js';
import { importConfig } from './eslint/import.eslint.js';
import { jsConfig } from './eslint/javascript.eslint.js';
import { prettierConfig } from './eslint/prettier.eslint.js';
import { tsConfig } from './eslint/typescript.eslint.js';
import { gitIgnoreFile } from './eslint/utils.eslint.js';

export default defineConfig([
  gitIgnoreFile,
  ...jsConfig,
  ...tsConfig,
  ...importConfig,
  ...generalConfig,
  ...prettierConfig,
]);
