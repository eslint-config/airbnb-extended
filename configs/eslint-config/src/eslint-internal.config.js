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
]);
