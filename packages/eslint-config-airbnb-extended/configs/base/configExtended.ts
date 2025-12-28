import baseConfig from '@/configs/base/config';
import importsStrictRules from '@/rules/importsStrict';

const baseConfigExtended = {
  ...baseConfig,
  importsStrict: importsStrictRules,
} as const;

export default baseConfigExtended;
