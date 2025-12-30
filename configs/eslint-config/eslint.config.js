import config from './src/eslint-internal.config.js';
import { defineConfig } from './src/eslint-utils.js';

export default defineConfig([
  ...config,
  // Disable relative packages for Prettier and Lint Staged
  {
    name: 'x/import-x/disable-relative-packages-for-configs',
    files: ['**/prettier.config.js', '**/lint-staged.config.js'],
    rules: {
      'import-x/no-relative-packages': 'off',
    },
  },
]);
