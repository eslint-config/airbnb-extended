import nextConfig from '@/configs/next/config';
import reactRecommendedConfig from '@/configs/react/recommended';
import nextRecommendedExtensionsConfig from '@/extensions/next/recommended';

import type { Linter } from 'eslint';

const nextRecommendedConfig = [
  ...reactRecommendedConfig,
  ...Object.values(nextConfig),
  ...nextRecommendedExtensionsConfig,
] as Linter.Config[];

export default nextRecommendedConfig;
