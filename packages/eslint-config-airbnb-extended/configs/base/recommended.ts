import baseConfig from '@/configs/base/config';
import baseRecommendedExtensionsConfig from '@/extensions/base/recommended';
import { defineConfigArray } from '@/utils';

const baseRecommendedConfig = defineConfigArray([
  ...Object.values(baseConfig),
  ...baseRecommendedExtensionsConfig,
]);

export default baseRecommendedConfig;
