import nodeRecommendedExtensionsConfig from '@/extensions/node/recommended';
import type { Linter } from 'eslint';

const nodeExtensions = {
  recommended: nodeRecommendedExtensionsConfig as Linter.Config[],
} as const;

export default nodeExtensions;
