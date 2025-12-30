import config from '../eslint-config/src/eslint-internal.config.js';
import { defineConfig } from '../eslint-config/src/eslint-utils.js';

export default defineConfig([
  ...config,
  // Disable relative packages for ESLint and Lint Staged
  {
    name: 'x/import-x/disable-relative-packages-for-configs',
    files: ['**/eslint.config.js', '**/lint-staged.config.js'],
    rules: {
      'import-x/no-relative-packages': 'off',
    },
  },
]);
