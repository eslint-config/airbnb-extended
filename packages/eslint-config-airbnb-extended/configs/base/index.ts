/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import baseRecommendedConfig from '@/configs/base/recommended';
import baseTypescriptConfig from '@/configs/base/typescript';

import type { Linter } from 'eslint';

const base = {
  recommended: baseRecommendedConfig as Linter.Config[],
  typescript: baseTypescriptConfig as Linter.Config[],
  all: [...baseRecommendedConfig, ...baseTypescriptConfig] as Linter.Config[],
} as const;

export default base;
