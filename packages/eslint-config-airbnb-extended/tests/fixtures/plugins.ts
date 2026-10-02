import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import importXPlugin from 'eslint-plugin-import-x';
import reactJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { plugin as typescriptEslintPlugin } from 'typescript-eslint';

export interface RuleModule {
  meta?: { deprecated?: unknown; type?: string; schema?: unknown };
}

const toRuleMap = (plugin: unknown): Record<string, RuleModule> =>
  (plugin as { rules?: Record<string, RuleModule> }).rules ?? {};

/** Rules that every installed plugin really ships, grouped by the prefix used in a rule id. */
export const pluginRules: Record<string, Record<string, RuleModule>> = {
  '@next/next': toRuleMap(nextPlugin),
  '@stylistic': toRuleMap(stylisticPlugin),
  '@typescript-eslint': toRuleMap(typescriptEslintPlugin),
  'import-x': toRuleMap(importXPlugin),
  'jsx-a11y': toRuleMap(reactJsxA11yPlugin),
  n: toRuleMap(nodePlugin),
  react: toRuleMap(reactPlugin),
  'react-hooks': toRuleMap(reactHooksPlugin),
};

export const coreRules: Record<string, RuleModule> = Object.fromEntries(builtinRules);

export const pluginPrefixes = Object.keys(pluginRules);

/** `@stylistic/semi` -> `{ prefix: '@stylistic', name: 'semi' }`, `semi` -> `{ prefix: null, name: 'semi' }`. */
export const splitRuleId = (ruleId: string): { prefix: string | null; name: string } => {
  const prefix = pluginPrefixes.find((item) => ruleId.startsWith(`${item}/`));

  return prefix
    ? { prefix, name: ruleId.slice(prefix.length + 1) }
    : { prefix: null, name: ruleId };
};

export const findRuleModule = (ruleId: string): RuleModule | undefined => {
  const { prefix, name } = splitRuleId(ruleId);

  return (prefix ? pluginRules[prefix] : coreRules)?.[name];
};

export const isDeprecated = (ruleId: string): boolean =>
  Boolean(findRuleModule(ruleId)?.meta?.deprecated);
