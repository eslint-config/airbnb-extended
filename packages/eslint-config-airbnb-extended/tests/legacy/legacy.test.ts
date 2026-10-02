import { describe, expect, it } from 'vitest';

import { legacyConfigs } from '@/legacy/configs';
import { legacyBaseConfig } from '@/legacy/configs/base/config';
import { legacyReactConfig } from '@/legacy/configs/react/config';
import { legacyTypescriptConfig } from '@/legacy/configs/typescript/config';
import { legacyRules } from '@/legacy/rules';
import { findRuleModule, splitRuleId } from '@/tests/fixtures/plugins';
import { loadRuleGroups } from '@/tests/fixtures/ruleGroups';
import { serialize } from '@/tests/fixtures/serialize';
import { allFiles, tsFiles } from '@/utils';

import type { Linter } from 'eslint';

const namesOf = (list: readonly Linter.Config[]) => list.map((config) => config.name);
const valuesNames = (record: Record<string, Linter.Config>) => namesOf(Object.values(record));

const groups = await loadRuleGroups('legacy/rules');
const configGroups = groups.filter((group) => group.isConfigObject);
const files = [...new Set(groups.map((group) => group.file))];

const severities = new Set(['off', 'warn', 'error', 0, 1, 2]);
const getSeverity = (setting: unknown): unknown => (Array.isArray(setting) ? setting[0] : setting);

describe('legacy rules (snapshots)', () => {
  it.each(files)('%s', async (file) => {
    const snapshot = Object.fromEntries(
      groups
        .filter((group) => group.file === file && group.isConfigObject)
        .map((group) => [group.exportName, serialize(group.value)]),
    );

    await expect(`${JSON.stringify(snapshot, null, 2)}\n`).toMatchFileSnapshot(
      `./__snapshots__/rules/${file
        .replace(/^legacy\/rules\//, '')
        .replaceAll('/', '.')
        .replace(/\.ts$/, '')}.json`,
    );
  });
});

describe('legacy rules (shape)', () => {
  it('finds the legacy rule files', () => {
    expect(files).toHaveLength(14);
  });

  it('exports a named config object with files from every rule file', () => {
    for (const file of files) {
      expect(
        configGroups.some((group) => group.file === file),
        file,
      ).toBe(true);
    }

    for (const group of configGroups) {
      expect(group.value.name, group.exportName).toMatch(/^airbnb\/config\/[a-z0-9-/]+\/legacy$/);
      expect((group.value.files as string[]).length, group.exportName).toBeGreaterThan(0);
    }
  });

  it('uses a unique name for every config object', () => {
    const names = configGroups.map((group) => group.value.name as string);

    expect(names.filter((name, index) => names.indexOf(name) !== index)).toStrictEqual([]);
  });

  it('applies the typescript rule files to typescript files, and the others to all files', () => {
    const typescriptOnly = new Set(['legacyTypescriptBaseRules', 'legacyTypescriptOverridesRules']);

    for (const group of configGroups) {
      expect(group.value.files, group.exportName).toStrictEqual(
        typescriptOnly.has(group.exportName) ? tsFiles : allFiles,
      );
    }
  });

  it('exports the same rule map as a *InternalRules constant and as a config object', () => {
    for (const group of groups.filter((item) => !item.isConfigObject)) {
      const twin = configGroups.find(
        (item) =>
          item.file === group.file &&
          item.exportName === group.exportName.replace('InternalRules', 'Rules'),
      );

      expect(twin?.rules, `${group.file} > ${group.exportName}`).toBe(group.value);
    }
  });
});

describe('legacy rules (validity)', () => {
  // The legacy config keeps the rules of `eslint-plugin-import`, which is not part of the extended config.
  const legacyPluginPrefixes = ['import'];

  const allRules = groups.flatMap((group) =>
    Object.entries(group.rules).map(([ruleId, setting]) => ({ group, ruleId, setting })),
  );

  it('uses a valid severity for every rule', () => {
    const invalid = allRules
      .filter(({ setting }) => !severities.has(getSeverity(setting) as never))
      .map(({ group, ruleId }) => `${group.file} > ${ruleId}`);

    expect(invalid).toStrictEqual([]);
  });

  it('only turns on rules that exist, except for the plugin that is not a dependency', () => {
    // The legacy config keeps rules that were removed from ESLint or a plugin, as "off", like the original airbnb config.
    const missing = allRules
      .filter(
        ({ ruleId }) => !legacyPluginPrefixes.some((prefix) => ruleId.startsWith(`${prefix}/`)),
      )
      .filter(({ setting }) => getSeverity(setting) !== 'off' && getSeverity(setting) !== 0)
      .filter(({ ruleId }) => findRuleModule(ruleId) === undefined)
      .map(
        ({ group, ruleId }) =>
          `${group.file} > ${ruleId} (${splitRuleId(ruleId).prefix ?? 'core'})`,
      );

    expect(missing).toStrictEqual([]);
  });
});

describe('legacy configs', () => {
  it('exposes the legacy configs', () => {
    expect(Object.keys(legacyConfigs)).toStrictEqual(['base', 'react']);
    expect(Object.keys(legacyConfigs.base)).toStrictEqual(['legacy', 'recommended', 'typescript']);
    expect(Object.keys(legacyConfigs.react)).toStrictEqual([
      'legacy',
      'base',
      'recommended',
      'hooks',
      'typescript',
    ]);
  });

  it('exposes the legacy rules', () => {
    expect(Object.keys(legacyRules)).toStrictEqual(['base', 'react', 'typescript']);
    expect(legacyRules.base).toBe(legacyBaseConfig);
    expect(legacyRules.react).toBe(legacyReactConfig);
    expect(legacyRules.typescript).toBe(legacyTypescriptConfig);
  });

  const all = [
    ['base.legacy', legacyConfigs.base.legacy],
    ['base.recommended', legacyConfigs.base.recommended],
    ['base.typescript', legacyConfigs.base.typescript],
    ['react.legacy', legacyConfigs.react.legacy],
    ['react.base', legacyConfigs.react.base],
    ['react.recommended', legacyConfigs.react.recommended],
    ['react.hooks', legacyConfigs.react.hooks],
    ['react.typescript', legacyConfigs.react.typescript],
  ] as const;

  describe.each(all)('%s', (title, list) => {
    it('matches the snapshot', async () => {
      await expect(`${JSON.stringify(serialize(list), null, 2)}\n`).toMatchFileSnapshot(
        `./__snapshots__/configs/${title}.json`,
      );
    });

    it('is a flat list of named config objects with unique names', () => {
      const names = namesOf(list);

      expect(list.length).toBeGreaterThan(0);
      expect(new Set(names).size).toBe(names.length);
      for (const config of list) {
        expect(Array.isArray(config)).toBe(false);
        expect(config.name).toMatch(/^airbnb\/config\//);
      }
    });
  });

  describe('composition', () => {
    it('base.recommended = every base rule group + the module/ecma settings', () => {
      expect(namesOf(legacyConfigs.base.recommended)).toStrictEqual([
        ...valuesNames(legacyBaseConfig),
        'airbnb/config/base-configurations/legacy',
      ]);
    });

    it('base.typescript = every typescript rule group', () => {
      expect(namesOf(legacyConfigs.base.typescript)).toStrictEqual(
        valuesNames(legacyTypescriptConfig),
      );
    });

    it('base.legacy is the old non-module style: no-var off, strict safe, no trailing commas', () => {
      const override = legacyConfigs.base.legacy.at(-1);

      expect(override?.name).toBe('airbnb/config/base-legacy-configurations/legacy');
      expect(override?.rules).toMatchObject({
        'comma-dangle': ['error', 'never'],
        'no-var': 'off',
        'prefer-object-spread': 'off',
        strict: ['error', 'safe'],
      });
      expect(override?.languageOptions?.globals).toMatchObject({ window: false, process: false });
    });

    it('react.recommended = base.recommended + react + jsx-a11y', () => {
      expect(namesOf(legacyConfigs.react.recommended)).toStrictEqual([
        ...namesOf(legacyConfigs.base.recommended),
        legacyReactConfig.base.name,
        legacyReactConfig.jsxA11y.name,
      ]);
    });

    it('react.hooks is only the hooks rules', () => {
      expect(namesOf(legacyConfigs.react.hooks)).toStrictEqual([legacyReactConfig.hooks.name]);
    });

    it('react.typescript = base typescript + the react typescript overrides', () => {
      expect(namesOf(legacyConfigs.react.typescript)).toStrictEqual([
        ...namesOf(legacyConfigs.base.typescript),
        'airbnb/config/react-configurations/typescript/legacy',
        'airbnb/config/react-configurations/typescript-settings/legacy',
      ]);
    });

    it('react.typescript allows jsx in .tsx files', () => {
      expect(
        legacyConfigs.react.typescript.find(
          (config) => config.rules?.['react/jsx-filename-extension'],
        )?.rules?.['react/jsx-filename-extension'],
      ).toStrictEqual(['error', { extensions: ['.jsx', '.tsx'] }]);
    });
  });
});
