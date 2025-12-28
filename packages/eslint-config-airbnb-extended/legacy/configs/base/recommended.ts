import legacyBaseConfig from '@/legacy/configs/base/config';
import { allFiles, defineConfigArray } from '@/utils';

const legacyBaseRecommendedConfig = defineConfigArray([
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
]);

export default legacyBaseRecommendedConfig;
