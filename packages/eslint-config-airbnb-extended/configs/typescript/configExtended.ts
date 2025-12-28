import typescriptConfig from '@/configs/typescript/config';
import typescriptEslintStrictRules from '@/rules/typescript/typescriptEslintStrict';

const typescriptConfigExtended = {
  ...typescriptConfig,
  typescriptEslintStrict: typescriptEslintStrictRules,
} as const;

export default typescriptConfigExtended;
