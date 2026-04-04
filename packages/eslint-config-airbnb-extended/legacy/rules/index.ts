import { legacyBaseConfig } from '@/legacy/configs/base/config';
import { legacyReactConfig } from '@/legacy/configs/react/config';
import { legacyTypescriptConfig } from '@/legacy/configs/typescript/config';

export const legacyRules = {
  base: legacyBaseConfig,
  react: legacyReactConfig,
  typescript: legacyTypescriptConfig,
} as const;
