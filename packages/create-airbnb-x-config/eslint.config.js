import config from '@airbnb-extended/eslint-config/base';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...config,
  // Disable process.exit() rule for CLI
  // {
  //   name: 'x/unicorn/disable-process-exit-rule-for-cli',
  //   files: ['packages/create-airbnb-x-config/**/*.{ts,tsx}'],
  //   rules: {
  //     'unicorn/no-process-exit': 'off',
  //   },
  // },
]);
