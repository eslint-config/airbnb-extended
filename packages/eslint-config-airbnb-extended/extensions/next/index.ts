import nextRecommendedExtensionsConfig from '@/extensions/next/recommended';

import type { Linter } from 'eslint';

const nextExtensions = {
  recommended: nextRecommendedExtensionsConfig as Linter.Config[],
} as const;

export default nextExtensions;
