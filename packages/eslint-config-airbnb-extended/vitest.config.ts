import { defineBaseConfig } from '@airbnb-extended/vitest-config/base';

export default defineBaseConfig({
  name: 'eslint-config-airbnb-extended',
  root: import.meta.dirname,
  testTimeout: 30_000,
  coverageInclude: [
    'configs/**/*.ts',
    'extensions/**/*.ts',
    'helpers/**/*.ts',
    'legacy/**/*.ts',
    'plugins/**/*.ts',
    'rules/**/*.ts',
    'utils/**/*.ts',
    'index.ts',
    'legacy.ts',
  ],
});
