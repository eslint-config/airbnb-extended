import { reactConfig } from '@/configs/react/config';
import { reactStrictRules } from '@/rules/react/reactStrict';

export const reactConfigExtended = {
  ...reactConfig,
  strict: reactStrictRules,
} as const;
