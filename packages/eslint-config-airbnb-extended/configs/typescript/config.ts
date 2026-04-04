import { typescriptBaseRules } from '@/rules/typescript/typescriptBase';
import { typescriptEslintRules } from '@/rules/typescript/typescriptEslint';
import { typescriptImportsRules } from '@/rules/typescript/typescriptImports';
import { typescriptStylisticRules } from '@/rules/typescript/typescriptStylistic';

export const typescriptConfig = {
  base: typescriptBaseRules,
  stylistic: typescriptStylisticRules,
  typescriptEslint: typescriptEslintRules,
  imports: typescriptImportsRules,
} as const;
