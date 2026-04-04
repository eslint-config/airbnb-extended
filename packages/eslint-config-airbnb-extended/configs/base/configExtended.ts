import { baseConfig } from '@/configs/base/config';
import { importsStrictRules } from '@/rules/importsStrict';

export const baseConfigExtended = {
  ...baseConfig,
  importsStrict: importsStrictRules,
} as const;
