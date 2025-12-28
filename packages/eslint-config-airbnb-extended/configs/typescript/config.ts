import typescriptBaseRules from '@/rules/typescript/typescriptBase';
import typescriptEslintRules from '@/rules/typescript/typescriptEslint';
import typescriptImportsRules from '@/rules/typescript/typescriptImports';
import typescriptStylisticRules from '@/rules/typescript/typescriptStylistic';

import type { Linter } from 'eslint';

const typescriptConfig = {
  base: typescriptBaseRules as Linter.Config,
  stylistic: typescriptStylisticRules as Linter.Config,
  typescriptEslint: typescriptEslintRules as Linter.Config,
  imports: typescriptImportsRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default typescriptConfig;
