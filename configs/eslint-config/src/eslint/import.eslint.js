import { rules } from 'eslint-config-airbnb-extended';
import unusedImportsPlugin from 'eslint-plugin-unused-imports';

import { defineConfig, getNoExtraneousDependenciesRule } from '../eslint-utils.js';

const unusedImportConfig = defineConfig([
  // Unused Imports config
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
  // Unused Imports config
  ...unusedImportConfig,
  // Strict imports rules
  rules.base.importsStrict,
  // Import X rules
  {
    name: 'x/import-x/rules',
    rules: {
      'import-x/prefer-default-export': 'off',
      'import-x/no-extraneous-dependencies': getNoExtraneousDependenciesRule(),
    },
  },
]);
