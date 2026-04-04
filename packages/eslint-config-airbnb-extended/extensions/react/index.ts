import { reactRecommendedExtensionsConfig } from '@/extensions/react/recommended';
import { reactTypescriptExtensionsConfig } from '@/extensions/react/typescript';

export const reactExtensions = {
  recommended: reactRecommendedExtensionsConfig,
  typescript: reactTypescriptExtensionsConfig,
} as const;
