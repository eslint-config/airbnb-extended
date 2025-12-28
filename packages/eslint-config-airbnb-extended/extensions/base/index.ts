/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import baseRecommendedExtensionsConfig from '@/extensions/base/recommended';
import baseTypescriptExtensionsConfig from '@/extensions/base/typescript';

import type { Linter } from 'eslint';

const baseExtensions = {
  recommended: baseRecommendedExtensionsConfig as Linter.Config[],
  typescript: baseTypescriptExtensionsConfig as Linter.Config[],
} as const;

export default baseExtensions;
