import { defineConfig } from '../eslint-utils.js';
import { configs, plugins, rules } from 'eslint-config-airbnb-extended';

export const tsConfig = defineConfig([
  // TypeScript ESLint plugin
  plugins.typescriptEslint,
  // Airbnb base TypeScript config
  ...configs.base.typescript,
  // Airbnb TypeScript ESLint strict rules
  rules.typescript.typescriptEslintStrict,
]);
