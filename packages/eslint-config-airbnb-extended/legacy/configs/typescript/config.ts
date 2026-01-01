import legacyTypescriptBaseRules from '@/legacy/rules/typescript/typescript';
import legacyTypescriptOverridesRules from '@/legacy/rules/typescript/typescriptOverrides';
import legacyTypescriptSettingsRules from '@/legacy/rules/typescript/typescriptSettings';

const legacyTypescriptConfig = {
  base: legacyTypescriptBaseRules,
  overrides: legacyTypescriptOverridesRules,
  settings: legacyTypescriptSettingsRules,
} as const;

export default legacyTypescriptConfig;
