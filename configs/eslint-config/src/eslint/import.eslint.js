import { rules } from 'eslint-config-airbnb-extended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';

const unusedImportConfig = defineConfig([
  // Unused import config
  {
    name: 'unused-imports/config',
    plugins: {
      'unused-imports': unusedImportsPlugin,
    },
    rules: {
      'unused-imports/no-unused-imports': 'error',
    },
  },
]);

export const importConfig = defineConfig([
  // Unused import config
  ...unusedImportConfig,
  // Strict import rules
  rules.base.importsStrict,
  // // Import x config rules
  // {
  //   name: 'x/import-x/rules',
  //   rules: {
  //     'import-x/prefer-default-export': 'off',
  //   },
  // },
  // // Disable the dev deps errors for general files
  // {
  //   name: 'x/import-x/disable-general-dev-deps',
  //   files: ['**/vitest.config.ts', '**/lint-staged.config.js'],
  //   rules: {
  //     'import-x/no-extraneous-dependencies': 'off',
  //   },
  // },
  // // Disable relative packages
  // {
  //   name: 'x/import-x/disable-relative-packages',
  //   files: ['**/**.config.js'],
  //   rules: {
  //     'import-x/no-relative-packages': 'off',
  //   },
  // },
]);
