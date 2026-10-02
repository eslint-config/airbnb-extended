import { defineBaseConfig } from '@airbnb-extended/vitest-config/base';

export default defineBaseConfig({
  name: 'create-airbnb-x-config',
  root: import.meta.dirname,
  coverageInclude: ['constants/**/*.ts', 'helpers/**/*.ts', 'utils/**/*.ts', 'index.ts'],
});
