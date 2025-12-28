import reactBaseRules from '@/rules/react/react';
import reactHooksRules from '@/rules/react/reactHooks';
import reactJsxA11yRules from '@/rules/react/reactJsxA11y';
import reactStylisticRules from '@/rules/react/reactStylistic';

const reactConfig = {
  base: reactBaseRules,
  jsxA11y: reactJsxA11yRules,
  hooks: reactHooksRules,
  stylistic: reactStylisticRules,
} as const;

export default reactConfig;
