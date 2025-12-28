/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import legacyBaseLegacyConfig from '@/legacy/configs/base/legacy';
import legacyBaseRecommendedConfig from '@/legacy/configs/base/recommended';
import legacyBaseTypescriptConfig from '@/legacy/configs/base/typescript';

import type { Linter } from 'eslint';

const legacyBase = {
  legacy: legacyBaseLegacyConfig as Linter.Config[],
  recommended: legacyBaseRecommendedConfig as Linter.Config[],
  typescript: legacyBaseTypescriptConfig as Linter.Config[],
} as const;

export default legacyBase;
