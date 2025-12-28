import { defineConfig } from 'eslint/config';
import config from './eslint-base.config.js';

export default defineConfig([
  ...config,
  // Disable Extensions in Module Files
  // {
  //   name: 'x/import-x/disable-extensions-in-module-files',
  //   files: ['**/*.js'],
  //   rules: {
  //     'import-x/extensions': 'off',
  //   },
  // },
]);
