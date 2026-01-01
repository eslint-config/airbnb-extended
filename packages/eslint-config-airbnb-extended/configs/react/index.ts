import reactRecommendedConfig from '@/configs/react/recommended';
import reactTypescriptConfig from '@/configs/react/typescript';

const react = {
  recommended: reactRecommendedConfig,
  typescript: reactTypescriptConfig,
  all: [...reactRecommendedConfig, ...reactTypescriptConfig],
} as const;

export default react;
