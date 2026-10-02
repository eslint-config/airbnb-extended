import config from '@airbnb-extended/eslint-config/base';
import { defineConfig } from '@airbnb-extended/eslint-config/utils';

export default defineConfig([
  ...config,
  // Tests run on the Node version of .nvmrc, not on the oldest supported Node version
  {
    name: 'x/tests/relaxed-rules',
    files: ['tests/**/*.ts', 'vitest.config.ts'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      // Short assertions like `(await resolveConfig()).rules` are easier to read
      'unicorn/no-await-expression-member': 'off',
      // `import * as api from '@/index'` is how a test checks everything that is exported
      'import-x/no-namespace': 'off',
    },
  },
]);
