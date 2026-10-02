import { describe, expect, it } from 'vitest';

import { coreRules, pluginRules, splitRuleId } from '@/tests/fixtures/plugins';
import { loadRuleGroups } from '@/tests/fixtures/ruleGroups';

/**
 * Same idea as `script/checkUpdates.ts` (it runs before every build), but it names the exact rules:
 * - a rule that a plugin ships but the config does not know about
 * - a rule that the config sets but the plugin no longer ships
 *
 * If one fails after a plugin upgrade, add the new rule to the matching file in `rules/`
 * (or to its `deprecated*` set), then update the docs.
 */

const groups = await loadRuleGroups();
const localRuleIds = new Set(groups.flatMap((group) => Object.keys(group.rules)));

/**
 * Rules of eslint-plugin-react-hooks that are part of the React Compiler.
 * They are not configured on purpose. Keep in sync with `script/checkUpdates.ts`.
 */
const ignoredReactHooksRules = new Set([
  'hooks',
  'capitalized-calls',
  'void-use-memo',
  'memoized-effect-dependencies',
  'no-deriving-state-in-effects',
  'invariant',
  'todo',
  'syntax',
  'rule-suppression',
  'automatic-effect-dependencies',
  'fire',
  'fbt',
  'exhaustive-effect-dependencies',
  'memo-dependencies',
]);

describe.each(Object.entries(pluginRules))('plugin %s', (prefix, rules) => {
  const remote = Object.keys(rules).filter(
    (name) => !(prefix === 'react-hooks' && ignoredReactHooksRules.has(name)),
  );

  it('has a rule in the config for every rule that the plugin ships', () => {
    const missing = remote.filter((name) => !localRuleIds.has(`${prefix}/${name}`));

    expect(missing, `Add these to rules/ : ${missing.join(', ')}`).toStrictEqual([]);
  });

  it('does not set a rule that the plugin does not ship', () => {
    const extra = [...localRuleIds]
      .filter((ruleId) => splitRuleId(ruleId).prefix === prefix)
      .filter((ruleId) => !(splitRuleId(ruleId).name in rules));

    expect(extra).toStrictEqual([]);
  });
});

describe('eslint core', () => {
  it('does not set a core rule that eslint no longer ships', () => {
    const extra = [...localRuleIds].filter(
      (ruleId) => splitRuleId(ruleId).prefix === null && !(ruleId in coreRules),
    );

    expect(extra).toStrictEqual([]);
  });
});
