import legacyReactBaseRules from '@/legacy/rules/react/react';
import legacyReactHooksRules from '@/legacy/rules/react/reactHooks';
import legacyReactJsxA11yRules from '@/legacy/rules/react/reactJsxA11y';

const legacyReactConfig = {
  base: legacyReactBaseRules,
  jsxA11y: legacyReactJsxA11yRules,
  hooks: legacyReactHooksRules,
} as const;

export default legacyReactConfig;
