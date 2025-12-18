import reactBaseRules from '@/rules/react/react';
import reactHooksRules from '@/rules/react/reactHooks';
import reactJsxA11yRules from '@/rules/react/reactJsxA11y';
import reactStylisticRules from '@/rules/react/reactStylistic';

import type { Linter } from 'eslint';

const reactConfig = {
  base: reactBaseRules as Linter.Config,
  jsxA11y: reactJsxA11yRules as Linter.Config,
  hooks: reactHooksRules as Linter.Config,
  stylistic: reactStylisticRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default reactConfig;
