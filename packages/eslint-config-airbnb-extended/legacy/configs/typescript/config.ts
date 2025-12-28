/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import legacyTypescriptBaseRules from '@/legacy/rules/typescript/typescript';
import legacyTypescriptOverridesRules from '@/legacy/rules/typescript/typescriptOverrides';
import legacyTypescriptSettingsRules from '@/legacy/rules/typescript/typescriptSettings';

import type { Linter } from 'eslint';

const legacyTypescriptConfig = {
  base: legacyTypescriptBaseRules as Linter.Config,
  overrides: legacyTypescriptOverridesRules as Linter.Config,
  settings: legacyTypescriptSettingsRules as Linter.Config,
} as const;

export default legacyTypescriptConfig;
