import globals from 'globals';

import legacyBaseConfig from '@/legacy/configs/base/config';
import { allFiles } from '@/utils';

import type { Linter } from 'eslint';

const legacyBaseLegacyConfig = [
  legacyBaseConfig.bestPractices,
  legacyBaseConfig.errors,
  legacyBaseConfig.node,
  legacyBaseConfig.style,
  legacyBaseConfig.variables,
  {
    name: 'airbnb/config/base-legacy-configurations/legacy',
    files: allFiles,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'comma-dangle': ['error', 'never'],
      'prefer-numeric-literals': 'off',
      'no-restricted-properties': [
        'error',
        {
          object: 'arguments',
          property: 'callee',
          message: 'arguments.callee is deprecated',
        },
        {
          property: '__defineGetter__',
          message: 'Please use Object.defineProperty instead.',
        },
        {
          property: '__defineSetter__',
          message: 'Please use Object.defineProperty instead.',
        },
      ],
      'no-var': 'off',
      'prefer-object-spread': 'off',
      strict: ['error', 'safe'],
    },
  },
] as Linter.Config[];

export default legacyBaseLegacyConfig;
