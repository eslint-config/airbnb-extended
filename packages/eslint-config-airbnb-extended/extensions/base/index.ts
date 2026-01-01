import baseRecommendedExtensionsConfig from '@/extensions/base/recommended';
import baseTypescriptExtensionsConfig from '@/extensions/base/typescript';

const baseExtensions = {
  recommended: baseRecommendedExtensionsConfig,
  typescript: baseTypescriptExtensionsConfig,
} as const;

export default baseExtensions;
