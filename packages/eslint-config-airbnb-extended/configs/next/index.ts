/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import nextRecommendedConfig from '@/configs/next/recommended';
import nextTypescriptConfig from '@/configs/next/typescript';

import type { Linter } from 'eslint';

const next = {
  recommended: nextRecommendedConfig as Linter.Config[],
  typescript: nextTypescriptConfig as Linter.Config[],
  all: [...nextRecommendedConfig, ...nextTypescriptConfig] as Linter.Config[],
} as const;

export default next;
