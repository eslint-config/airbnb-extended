import { describe, expect, it } from 'vitest';

import {
  findRuleModule,
  isDeprecated,
  pluginPrefixes,
  splitRuleId,
} from '@/tests/fixtures/plugins';
import { loadRuleGroups } from '@/tests/fixtures/ruleGroups';

/**
 * Checks every rule of every rule file against the plugin versions that are installed:
 * the rule must exist, the severity must be valid and deprecated rules must stay off.
 */

const groups = await loadRuleGroups();
const severities = new Set(['off', 'warn', 'error', 0, 1, 2]);

const getSeverity = (setting: unknown): unknown => (Array.isArray(setting) ? setting[0] : setting);

const allRules = groups.flatMap((group) =>
  Object.entries(group.rules).map(([ruleId, setting]) => ({ group, ruleId, setting })),
);

/** Which rule prefixes a rule file may use. `null` is the core of ESLint. */
const allowedPrefixes: Record<string, (string | null)[]> = {
  'rules/best-practices.ts': [null],
  'rules/errors.ts': [null],
  'rules/es6.ts': [null],
  'rules/strict.ts': [null],
  'rules/style.ts': [null],
  'rules/variables.ts': [null],
  'rules/stylistic.ts': ['@stylistic'],
  'rules/imports.ts': ['import-x'],
  'rules/importsStrict.ts': ['import-x'],
  'rules/next/nextBase.ts': ['@next/next'],
  'rules/next/nextCoreWebVitals.ts': ['@next/next'],
  'rules/node/nodeBase.ts': ['n'],
  'rules/node/nodeGlobals.ts': ['n'],
  'rules/node/nodeNoUnsupportedFeatures.ts': ['n'],
  'rules/node/nodePromises.ts': ['n'],
  'rules/react/react.ts': ['react'],
  'rules/react/reactHooks.ts': ['react-hooks'],
  'rules/react/reactJsxA11y.ts': ['jsx-a11y'],
  'rules/react/reactStrict.ts': ['react'],
  'rules/react/reactStylistic.ts': ['@stylistic'],
  'rules/typescript/typescriptBase.ts': [null, '@typescript-eslint'],
  // Also turns off the core rule that each typescript-eslint extension rule replaces.
  'rules/typescript/typescriptEslint.ts': [null, '@typescript-eslint'],
  'rules/typescript/typescriptEslintStrict.ts': ['@typescript-eslint'],
  'rules/typescript/typescriptImports.ts': ['import-x'],
  'rules/typescript/typescriptStylistic.ts': ['@stylistic'],
};

describe('rules (validity)', () => {
  it('checks a lot of rules', () => {
    expect(allRules.length).toBeGreaterThan(500);
  });

  it('knows the allowed prefixes of every rule file', () => {
    const files = [...new Set(groups.map((group) => group.file))];

    expect(files.filter((file) => !(file in allowedPrefixes))).toStrictEqual([]);
    expect(Object.keys(allowedPrefixes).filter((file) => !files.includes(file))).toStrictEqual([]);
  });

  it('only uses the rule prefixes that belong to the file', () => {
    const wrong = allRules
      .filter(
        ({ group, ruleId }) => !allowedPrefixes[group.file]?.includes(splitRuleId(ruleId).prefix),
      )
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(wrong).toStrictEqual([]);
  });

  it('only uses prefixes of known plugins', () => {
    const unknown = allRules
      .filter(({ ruleId }) => ruleId.includes('/') && splitRuleId(ruleId).prefix === null)
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(unknown, `Known prefixes: ${pluginPrefixes.join(', ')}`).toStrictEqual([]);
  });

  it('only configures rules that exist in the installed plugin or in ESLint', () => {
    const missing = allRules
      .filter(({ ruleId }) => findRuleModule(ruleId) === undefined)
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(missing).toStrictEqual([]);
  });

  it('uses a valid severity for every rule', () => {
    const invalid = allRules
      .filter(({ setting }) => !severities.has(getSeverity(setting) as never))
      .map(({ group, ruleId, setting }) => `${group.file} > ${ruleId}: ${JSON.stringify(setting)}`);

    expect(invalid).toStrictEqual([]);
  });

  it('keeps rule options as the second item of an array', () => {
    const invalid = allRules
      .filter(({ setting }) => Array.isArray(setting) && setting.length === 0)
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(invalid).toStrictEqual([]);
  });

  it('keeps every deprecated set switched off', () => {
    const enabled = allRules
      .filter(({ group }) => group.kind === 'deprecated')
      .filter(({ setting }) => getSeverity(setting) !== 'off' && getSeverity(setting) !== 0)
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(enabled).toStrictEqual([]);
  });

  it('keeps every experimental set switched off', () => {
    const enabled = allRules
      .filter(({ group }) => group.kind === 'experimental')
      .filter(({ setting }) => getSeverity(setting) !== 'off' && getSeverity(setting) !== 0)
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(enabled).toStrictEqual([]);
  });

  /**
   * Rules that are deprecated by their plugin but still switched on on purpose.
   * Move the rule to a `deprecated*` set (and turn it off) or keep it here with a reason.
   * An entry that is no longer deprecated or no longer enabled fails the test below, so the list stays honest.
   */
  const knownDeprecatedButEnabled = new Set([
    // Deprecated in eslint-plugin-react-hooks, still reported by the plugin.
    'react-hooks/component-hook-factories',
    // Deprecated in favour of the core rule, but the core rule is switched off for typescript.
    '@typescript-eslint/no-loop-func',
  ]);

  const enabledDeprecated = [
    ...new Set(
      allRules
        .filter(({ group }) => group.kind === 'active')
        .filter(({ setting }) => getSeverity(setting) !== 'off' && getSeverity(setting) !== 0)
        .filter(({ ruleId }) => isDeprecated(ruleId))
        .map(({ ruleId }) => ruleId),
    ),
  ];

  it('does not enable a rule that its plugin has deprecated, except the known ones', () => {
    expect(
      enabledDeprecated.filter((ruleId) => !knownDeprecatedButEnabled.has(ruleId)),
    ).toStrictEqual([]);
  });

  it('keeps the list of known deprecated-but-enabled rules up to date', () => {
    expect(
      [...knownDeprecatedButEnabled].filter((ruleId) => !enabledDeprecated.includes(ruleId)),
    ).toStrictEqual([]);
  });
});
