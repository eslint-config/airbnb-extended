import { rules as prettierConfigRules } from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

import { defineConfig } from '../eslint-utils.js';

export const prettierConfig = defineConfig([
  // Prettier plugin
  {
    name: 'prettier/plugin/config',
    plugins: {
      prettier: prettierPlugin,
    },
  },
  // Prettier config
  {
    name: 'prettier/config',
    rules: {
      ...prettierConfigRules,
      'prettier/prettier': 'error',
    },
  },
]);
