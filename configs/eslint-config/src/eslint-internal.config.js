import config from './eslint-base.config.js';
import { defineConfig } from './eslint-utils.js';

export default defineConfig([
  ...config,
  // Disable extensions in module files
  {
    name: 'x/import-x/disable-extensions-in-module-files',
    files: ['**/*.js'],
    rules: {
      'import-x/extensions': 'off',
    },
  },
  // Disable relative packages for ESLint, Prettier and Lint Staged
  {
    name: 'x/import-x/disable-relative-packages-for-configs',
    files: ['**/eslint.config.js', '**/prettier.config.js', '**/lint-staged.config.js'],
    rules: {
      'import-x/no-relative-packages': 'off',
    },
  },
]);
