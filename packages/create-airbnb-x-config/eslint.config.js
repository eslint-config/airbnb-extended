import config from '@airbnb-extended/eslint-config/base';
import { defineConfig } from '@airbnb-extended/eslint-config/utils';

export default defineConfig([
  ...config,
  // Disable process.exit() rule for CLI
  {
    name: 'x/unicorn/disable-process-exit-rule-for-cli',
    rules: {
      'unicorn/no-process-exit': 'off',
    },
  },
]);
