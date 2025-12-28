import config from '@airbnb-extended/eslint-config/base';
import { defineConfig } from '@airbnb-extended/eslint-config/utils';

export default defineConfig([
  ...config,
  // Disable Dependencies Import Issue for Templates ESLint Files
  {
    name: 'x/import-x/disable-rules',
    files: ['templates/**/eslint.config.mjs'],
    rules: {
      'import-x/no-unresolved': 'off',
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
]);
