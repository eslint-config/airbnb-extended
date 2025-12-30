import { configs, plugins } from 'eslint-config-airbnb-extended';

import { defineConfig } from '../eslint-utils.js';

export const nodeConfig = defineConfig([
  // Node plugin
  plugins.node,
  // Airbnb Node recommended config
  ...configs.node.recommended,
  // Node rules
  {
    name: 'x/n/rules',
    rules: {
      'n/no-process-exit': 'off',
      'n/no-sync': 'off',
      'n/hashbang': 'off',
    },
  },
]);
