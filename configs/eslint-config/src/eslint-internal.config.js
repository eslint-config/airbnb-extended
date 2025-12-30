import config from './eslint-base.config.js';
import { defineConfig } from './eslint-utils.js';

export default defineConfig([
  ...config,
  // // Disable Extensions in Module Files
  // {
  //   name: 'x/import-x/disable-extensions-in-module-files',
  //   files: ['**/*.js'],
  //   rules: {
  //     'import-x/extensions': 'off',
  //   },
  // },
  // // Disable the dev deps errors for general files
  // {
  //   name: 'x/import-x/disable-general-dev-deps',
  //   files: ['**/vitest.config.ts', '**/lint-staged.config.js'],
  //   rules: {
  //     'import-x/no-extraneous-dependencies': 'off',
  //   },
  // },
  // Disable relative packages
  {
    name: 'x/import-x/disable-relative-packages',
    files: ['**/**.config.js'],
    rules: {
      'import-x/no-relative-packages': 'off',
    },
  },
]);
