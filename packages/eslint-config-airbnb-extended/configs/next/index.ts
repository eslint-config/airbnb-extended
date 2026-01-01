import nextRecommendedConfig from '@/configs/next/recommended';
import nextTypescriptConfig from '@/configs/next/typescript';

const next = {
  recommended: nextRecommendedConfig,
  typescript: nextTypescriptConfig,
  all: [...nextRecommendedConfig, ...nextTypescriptConfig],
} as const;

export default next;
