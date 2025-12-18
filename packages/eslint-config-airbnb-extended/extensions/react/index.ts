import reactRecommendedExtensionsConfig from '@/extensions/react/recommended';
import reactTypescriptExtensionsConfig from '@/extensions/react/typescript';

import type { Linter } from 'eslint';

const reactExtensions = {
  recommended: reactRecommendedExtensionsConfig as Linter.Config[],
  typescript: reactTypescriptExtensionsConfig as Linter.Config[],
} as const;

export default reactExtensions;
