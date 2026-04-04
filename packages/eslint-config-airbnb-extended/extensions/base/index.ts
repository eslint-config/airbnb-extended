import { baseRecommendedExtensionsConfig } from '@/extensions/base/recommended';
import { baseTypescriptExtensionsConfig } from '@/extensions/base/typescript';

export const baseExtensions = {
  recommended: baseRecommendedExtensionsConfig,
  typescript: baseTypescriptExtensionsConfig,
} as const;
