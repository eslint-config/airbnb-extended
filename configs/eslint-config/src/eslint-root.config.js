import config from './eslint-base.config.js';
import { defineConfig, globalIgnores } from './eslint-utils.js';

export default defineConfig([
  // Ignores every everything except root files
  {
    ...globalIgnores(['apps/**', 'configs/**', 'docs/**', 'packages/**']),
    name: 'x/ignore-everything-except-root-files',
  },
  ...config,
]);
