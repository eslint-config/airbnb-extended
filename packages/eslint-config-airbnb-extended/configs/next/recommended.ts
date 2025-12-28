import nextConfig from '@/configs/next/config';
import reactRecommendedConfig from '@/configs/react/recommended';
import nextRecommendedExtensionsConfig from '@/extensions/next/recommended';
import { defineConfigArray } from '@/utils';

const nextRecommendedConfig = defineConfigArray([
  ...reactRecommendedConfig,
  ...Object.values(nextConfig),
  ...nextRecommendedExtensionsConfig,
]);

export default nextRecommendedConfig;
