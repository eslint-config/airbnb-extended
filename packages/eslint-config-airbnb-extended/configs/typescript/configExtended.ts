import { typescriptConfig } from '@/configs/typescript/config';
import { typescriptEslintStrictRules } from '@/rules/typescript/typescriptEslintStrict';

export const typescriptConfigExtended = {
  ...typescriptConfig,
  typescriptEslintStrict: typescriptEslintStrictRules,
} as const;
