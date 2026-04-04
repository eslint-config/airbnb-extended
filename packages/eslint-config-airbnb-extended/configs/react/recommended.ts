import { reactConfig } from '@/configs/react/config';
import { reactRecommendedExtensionsConfig } from '@/extensions/react/recommended';
import { defineConfigArray } from '@/utils';

export const reactRecommendedConfig = defineConfigArray([
  ...Object.values(reactConfig),
  ...reactRecommendedExtensionsConfig,
]);
