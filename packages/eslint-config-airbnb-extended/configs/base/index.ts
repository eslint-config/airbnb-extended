import baseRecommendedConfig from '@/configs/base/recommended';
import baseTypescriptConfig from '@/configs/base/typescript';

const base = {
  recommended: baseRecommendedConfig,
  typescript: baseTypescriptConfig,
  all: [...baseRecommendedConfig, ...baseTypescriptConfig],
} as const;

export default base;
