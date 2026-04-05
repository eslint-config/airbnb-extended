import { baseConfig } from '@/configs/base/config';
import { baseRecommendedExtensionsConfig } from '@/extensions/base/recommended';
import { defineConfigArray } from '@/utils';

export const baseRecommendedConfig = defineConfigArray([
  ...Object.values(baseConfig),
  ...baseRecommendedExtensionsConfig,
]);
