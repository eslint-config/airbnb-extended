import js from '@eslint/js';
import promisePlugin from 'eslint-plugin-promise';
import unicornPlugin from 'eslint-plugin-unicorn';

import { configs, plugins } from 'eslint-config-airbnb-extended';
import { defineConfig } from 'eslint/config';

const promiseConfig = defineConfig([
  // Promise config
  promisePlugin.configs['flat/recommended'],
]);

const unicornConfig = defineConfig([
  // Unicorn config
  unicornPlugin.configs.recommended,
  // Unicorn config rules
  {
    name: 'x/unicorn/rules',
    rules: {
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true,
          },
          multipleFileExtensions: false,
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/consistent-function-scoping': 'off',
      // NOTE: REMOVE WHEN WE SHIFT TO NODE 20
      'unicorn/no-array-sort': 'off',
    },
  },
]);

export const jsConfig = defineConfig([
  // ESLint recommended rules
  {
    name: 'js/config',
    ...js.configs.recommended,
  },
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
  // Promise config
  ...promiseConfig,
  // Unicorn config
  ...unicornConfig,
]);
