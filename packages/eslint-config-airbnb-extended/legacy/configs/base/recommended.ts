import legacyBaseConfig from '@/legacy/configs/base/config';
import { allFiles } from '@/utils';

import type { Linter } from 'eslint';

const legacyBaseRecommendedConfig = [
  ...Object.values(legacyBaseConfig),
  {
    name: 'airbnb/config/base-configurations/legacy',
    files: allFiles,
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
    },
  },
] as Linter.Config[];

export default legacyBaseRecommendedConfig;
