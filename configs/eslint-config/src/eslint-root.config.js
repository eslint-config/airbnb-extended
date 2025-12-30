import { defineConfig } from './eslint-utils.js';

import config from './eslint-base.config.js';

export default defineConfig([
  {
    name: 'x/ignore-everything-except-root',
    ignores: ['apps/**', 'configs/**', 'docs/**', 'packages/**'],
  },
  ...config,
]);
