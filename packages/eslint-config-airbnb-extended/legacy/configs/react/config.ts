/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import legacyReactBaseRules from '@/legacy/rules/react/react';
import legacyReactHooksRules from '@/legacy/rules/react/reactHooks';
import legacyReactJsxA11yRules from '@/legacy/rules/react/reactJsxA11y';

import type { Linter } from 'eslint';

const legacyReactConfig = {
  base: legacyReactBaseRules as Linter.Config,
  jsxA11y: legacyReactJsxA11yRules as Linter.Config,
  hooks: legacyReactHooksRules as Linter.Config,
} as const;

export default legacyReactConfig;
