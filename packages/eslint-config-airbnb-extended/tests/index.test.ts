import { describe, expect, it } from 'vitest';

import { configs } from '@/configs';
import { extensions } from '@/extensions';
import { helpers } from '@/helpers';
import * as extended from '@/index';
import * as legacy from '@/legacy';
import { legacyConfigs } from '@/legacy/configs';
import { legacyRules } from '@/legacy/rules';
import { plugins } from '@/plugins';
import { rules } from '@/rules';

/** Shape of an object as a tree of keys, so a renamed or removed export is visible in one diff. */
const keyTree = (value: unknown, depth: number): unknown => {
  if (Array.isArray(value)) return `[array of ${value.length}]`;

  if (depth === 0 || typeof value !== 'object' || value === null) return null;

  return Object.fromEntries(
    Object.entries(value)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, keyTree(item, depth - 1)]),
  );
};

describe('public api: eslint-config-airbnb-extended', () => {
  it('exports configs, extensions, helpers, plugins and rules', () => {
    expect(Object.keys(extended).toSorted()).toStrictEqual([
      'configs',
      'extensions',
      'helpers',
      'plugins',
      'rules',
    ]);
  });

  it('re-exports the internal objects', () => {
    expect(extended.configs).toBe(configs);
    expect(extended.extensions).toBe(extensions);
    expect(extended.helpers).toBe(helpers);
    expect(extended.plugins).toBe(plugins);
    expect(extended.rules).toBe(rules);
  });

  it('keeps the shape of the public api', async () => {
    await expect(`${JSON.stringify(keyTree(extended, 4), null, 2)}
`).toMatchFileSnapshot('./__snapshots__/api.extended.json');
  });
});

describe('public api: eslint-config-airbnb-extended/legacy', () => {
  it('exports configs and rules', () => {
    expect(Object.keys(legacy).toSorted()).toStrictEqual(['configs', 'rules']);
  });

  it('re-exports the internal objects', () => {
    expect(legacy.configs).toBe(legacyConfigs);
    expect(legacy.rules).toBe(legacyRules);
  });

  it('keeps the shape of the public api', async () => {
    await expect(`${JSON.stringify(keyTree(legacy, 3), null, 2)}
`).toMatchFileSnapshot('./__snapshots__/api.legacy.json');
  });
});
