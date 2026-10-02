import { describe, expect, it } from 'vitest';

import { loadRuleGroups } from '@/tests/fixtures/ruleGroups';
import { serialize } from '@/tests/fixtures/serialize';
import { allFiles, tsFiles } from '@/utils';

/**
 * Snapshot of every rule file. Change a rule, its severity or its options and the snapshot of
 * that file fails, so the change has to be accepted on purpose (`vitest -u`) and shows up in review.
 */

const groups = await loadRuleGroups();
const configGroups = groups.filter((group) => group.isConfigObject);
const files = [...new Set(groups.map((group) => group.file))];

describe('rules (snapshots)', () => {
  it('finds the rule files', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)('%s', async (file) => {
    const fileGroups = groups.filter((group) => group.file === file);

    const snapshot = Object.fromEntries(
      fileGroups
        .filter((group) => group.isConfigObject)
        .map((group) => [group.exportName, serialize(group.value)]),
    );

    await expect(`${JSON.stringify(snapshot, null, 2)}\n`).toMatchFileSnapshot(
      `./__snapshots__/${file
        .replace(/^rules\//, '')
        .replaceAll('/', '.')
        .replace(/\.ts$/, '')}.json`,
    );
  });
});

describe('rules (shape)', () => {
  it('every rule file exports at least one config object', () => {
    for (const file of files) {
      expect(
        configGroups.some((group) => group.file === file),
        file,
      ).toBe(true);
    }
  });

  it.each(configGroups.map((group) => [`${group.file} > ${group.exportName}`, group] as const))(
    '%s is a named config object with files and rules',
    (_title, group) => {
      expect(group.value.name).toMatch(/^airbnb\/config\/[a-z0-9-/]+$/);
      expect(Array.isArray(group.value.files)).toBe(true);
      expect((group.value.files as string[]).length).toBeGreaterThan(0);
      expect(Object.keys(group.rules).length).toBeGreaterThan(0);
    },
  );

  it('uses a unique name for every config object', () => {
    const names = configGroups.map((group) => group.value.name as string);

    expect(names.filter((name, index) => names.indexOf(name) !== index)).toStrictEqual([]);
  });

  it('adds /deprecated to the name of deprecated sets and /experimental to experimental sets', () => {
    for (const group of configGroups) {
      const name = group.value.name as string;

      if (group.kind === 'deprecated') expect(name, group.exportName).toMatch(/\/deprecated$/);
      if (group.kind === 'experimental') expect(name, group.exportName).toMatch(/\/experimental$/);
      if (group.kind === 'active')
        expect(name, group.exportName).not.toMatch(/\/(deprecated|experimental)$/);
    }
  });

  it('applies typescript rule files to typescript files only, and every other rule file to all files', () => {
    for (const group of configGroups) {
      const isTypescriptOnly =
        group.file.startsWith('rules/typescript/typescript') &&
        !group.file.endsWith('typescriptImports.ts');

      if (isTypescriptOnly && group.exportName !== 'typescriptBaseRules') {
        expect(group.value.files, `${group.file} > ${group.exportName}`).toStrictEqual(tsFiles);
      }
    }

    for (const group of configGroups.filter((item) => !item.file.startsWith('rules/typescript/'))) {
      expect(group.value.files, `${group.file} > ${group.exportName}`).toStrictEqual(allFiles);
    }
  });

  it('exports the same rule map as a *InternalRules constant and as a config object', () => {
    const internal = groups.filter((group) => !group.isConfigObject);

    expect(internal.length).toBeGreaterThan(0);

    for (const group of internal) {
      expect(group.exportName).toMatch(/InternalRules$/);

      const twin = configGroups.find(
        (item) =>
          item.file === group.file &&
          item.exportName === group.exportName.replace('InternalRules', 'Rules'),
      );

      expect(twin, `${group.file} > ${group.exportName} has no config object`).toBeDefined();
      expect(twin?.rules, `${group.file} > ${group.exportName}`).toBe(group.value);
    }
  });
});
