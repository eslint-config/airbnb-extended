import reactRecommendedConfig from '@/configs/react/recommended';
import reactTypescriptConfig from '@/configs/react/typescript';

import type { Linter } from 'eslint';

const react = {
  recommended: reactRecommendedConfig as Linter.Config[],
  typescript: reactTypescriptConfig as Linter.Config[],
  all: [...reactRecommendedConfig, ...reactTypescriptConfig] as Linter.Config[],
} as const;

export default react;
