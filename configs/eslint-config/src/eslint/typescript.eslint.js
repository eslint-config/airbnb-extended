import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

import { defineConfig } from '../eslint-utils.js';

export const tsConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Airbnb TypeScript ESLint strict rules
  rules.typescript.typescriptEslintStrict,
]);
