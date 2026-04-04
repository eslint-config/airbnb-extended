import { legacyBaseLegacyConfig } from '@/legacy/configs/base/legacy';
import { legacyBaseRecommendedConfig } from '@/legacy/configs/base/recommended';
import { legacyBaseTypescriptConfig } from '@/legacy/configs/base/typescript';

export const legacyBase = {
  legacy: legacyBaseLegacyConfig,
  recommended: legacyBaseRecommendedConfig,
  typescript: legacyBaseTypescriptConfig,
} as const;
