import typescriptBaseRules from '@/rules/typescript/typescriptBase';
import typescriptEslintRules from '@/rules/typescript/typescriptEslint';
import typescriptImportsRules from '@/rules/typescript/typescriptImports';
import typescriptStylisticRules from '@/rules/typescript/typescriptStylistic';

import type { Linter } from 'eslint';

const typescriptConfig = {
  base: typescriptBaseRules,
  stylistic: typescriptStylisticRules,
  typescriptEslint: typescriptEslintRules,
  imports: typescriptImportsRules,
} satisfies Record<string, Linter.Config>;

export default typescriptConfig;
