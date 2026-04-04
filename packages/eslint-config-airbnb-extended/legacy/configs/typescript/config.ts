import { legacyTypescriptBaseRules } from '@/legacy/rules/typescript/typescript';
import { legacyTypescriptOverridesRules } from '@/legacy/rules/typescript/typescriptOverrides';
import { legacyTypescriptSettingsRules } from '@/legacy/rules/typescript/typescriptSettings';

export const legacyTypescriptConfig = {
  base: legacyTypescriptBaseRules,
  overrides: legacyTypescriptOverridesRules,
  settings: legacyTypescriptSettingsRules,
} as const;
