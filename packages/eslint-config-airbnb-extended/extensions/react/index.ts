import reactRecommendedExtensionsConfig from '@/extensions/react/recommended';
import reactTypescriptExtensionsConfig from '@/extensions/react/typescript';

const reactExtensions = {
  recommended: reactRecommendedExtensionsConfig,
  typescript: reactTypescriptExtensionsConfig,
} as const;

export default reactExtensions;
