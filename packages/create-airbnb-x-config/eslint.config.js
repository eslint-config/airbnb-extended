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
  // Tests run on the Node version of .nvmrc, not on the oldest supported Node version
  {
    name: 'x/tests/relaxed-rules',
    files: ['tests/**/*.ts', 'vitest.config.ts'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      // Short assertions like `(await getArgs()).config` are easier to read
      'unicorn/no-await-expression-member': 'off',
      // Small helpers like `.map(text)` are fine in tests
      'unicorn/no-array-callback-reference': 'off',
    },
  },
]);
