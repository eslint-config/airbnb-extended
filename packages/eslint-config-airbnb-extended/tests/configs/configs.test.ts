import { describe, expect, it } from 'vitest';

import { configs } from '@/configs';
import { baseConfig } from '@/configs/base/config';
import { baseConfigExtended } from '@/configs/base/configExtended';
import { nextConfig } from '@/configs/next/config';
import { nodeConfig } from '@/configs/node/config';
import { reactConfig } from '@/configs/react/config';
import { reactConfigExtended } from '@/configs/react/configExtended';
import { typescriptConfig } from '@/configs/typescript/config';
import { typescriptConfigExtended } from '@/configs/typescript/configExtended';
import { extensions } from '@/extensions';

import type { Linter } from 'eslint';

const namesOf = (list: readonly Linter.Config[]) => list.map((config) => config.name);
const valuesNames = (record: Record<string, Linter.Config>) => namesOf(Object.values(record));

describe('configs', () => {
  it('exposes the configs of every target', () => {
    expect(Object.keys(configs)).toStrictEqual(['base', 'react', 'next', 'node']);
    expect(Object.keys(configs.base)).toStrictEqual(['recommended', 'typescript', 'all']);
    expect(Object.keys(configs.react)).toStrictEqual(['recommended', 'typescript', 'all']);
    expect(Object.keys(configs.next)).toStrictEqual(['recommended', 'typescript', 'all']);
    expect(Object.keys(configs.node)).toStrictEqual(['recommended']);
  });

  it('has no typescript config for node', () => {
    expect(configs.node).not.toHaveProperty('typescript');
    expect(configs.node).not.toHaveProperty('all');
  });

  describe.each([
    ['base', configs.base],
    ['react', configs.react],
    ['next', configs.next],
  ] as const)('%s', (target, group) => {
    it('all is recommended followed by typescript', () => {
      expect(namesOf(group.all)).toStrictEqual([
        ...namesOf(group.recommended),
        ...namesOf(group.typescript),
      ]);
    });

    it.each(['recommended', 'typescript'] as const)(
      '%s matches the snapshot of config names',
      async (key) => {
        await expect(`${JSON.stringify(namesOf(group[key]), null, 2)}\n`).toMatchFileSnapshot(
          `./__snapshots__/${target}.${key}.names.json`,
        );
      },
    );
  });

  it('node recommended matches the snapshot of config names', async () => {
    await expect(
      `${JSON.stringify(namesOf(configs.node.recommended), null, 2)}\n`,
    ).toMatchFileSnapshot('./__snapshots__/node.recommended.names.json');
  });

  describe.each([
    ['base.recommended', configs.base.recommended],
    ['base.typescript', configs.base.typescript],
    ['base.all', configs.base.all],
    ['react.recommended', configs.react.recommended],
    ['react.typescript', configs.react.typescript],
    ['react.all', configs.react.all],
    ['next.recommended', configs.next.recommended],
    ['next.typescript', configs.next.typescript],
    ['next.all', configs.next.all],
    ['node.recommended', configs.node.recommended],
  ] as const)('%s', (_title, list) => {
    it('is a flat list of config objects with a name', () => {
      expect(list.length).toBeGreaterThan(0);
      for (const config of list) {
        expect(Array.isArray(config)).toBe(false);
        expect(typeof config.name).toBe('string');
        expect(config.name).toMatch(/^airbnb\/config\//);
      }
    });

    it('has unique config names', () => {
      const names = namesOf(list);

      expect(names.filter((name, index) => names.indexOf(name) !== index)).toStrictEqual([]);
    });

    it('does not register any plugin, plugins come from `plugins`', () => {
      for (const config of list) expect(config).not.toHaveProperty('plugins');
    });

    it('applies every config to some files', () => {
      for (const config of list) expect(config.files?.length, config.name).toBeGreaterThan(0);
    });
  });

  describe('composition', () => {
    it('base.recommended = base rule groups + base recommended extensions', () => {
      expect(namesOf(configs.base.recommended)).toStrictEqual([
        ...valuesNames(baseConfig),
        ...namesOf(extensions.base.recommended),
      ]);
    });

    it('base.typescript = typescript rule groups + base typescript extensions', () => {
      expect(namesOf(configs.base.typescript)).toStrictEqual([
        ...valuesNames(typescriptConfig),
        ...namesOf(extensions.base.typescript),
      ]);
    });

    it('react.recommended = react rule groups + react recommended extensions', () => {
      expect(namesOf(configs.react.recommended)).toStrictEqual([
        ...valuesNames(reactConfig),
        ...namesOf(extensions.react.recommended),
      ]);
    });

    it('react.typescript = react typescript extensions', () => {
      expect(namesOf(configs.react.typescript)).toStrictEqual(namesOf(extensions.react.typescript));
    });

    it('next.recommended = react.recommended + next rule groups + next extensions', () => {
      expect(namesOf(configs.next.recommended)).toStrictEqual([
        ...namesOf(configs.react.recommended),
        ...valuesNames(nextConfig),
        ...namesOf(extensions.next.recommended),
      ]);
    });

    it('next.typescript is the same as react.typescript', () => {
      expect(namesOf(configs.next.typescript)).toStrictEqual(namesOf(configs.react.typescript));
    });

    it('node.recommended = node rule groups + node extensions', () => {
      expect(namesOf(configs.node.recommended)).toStrictEqual([
        ...valuesNames(nodeConfig),
        ...namesOf(extensions.node.recommended),
      ]);
    });

    it('the rule groups are the same objects as in the rule files', () => {
      for (const [key, rule] of Object.entries(baseConfig)) {
        expect(
          configs.base.recommended.find((config) => config.name === rule.name)?.rules,
          key,
        ).toStrictEqual(rule.rules);
      }
    });
  });

  describe('strict rule groups are opt-in', () => {
    it.each([
      ['base importsStrict', baseConfigExtended.importsStrict],
      ['react strict', reactConfigExtended.strict],
      ['typescript typescriptEslintStrict', typescriptConfigExtended.typescriptEslintStrict],
    ])('%s is not part of any ready made config', (_title, strictConfig) => {
      const everything = [
        ...configs.base.all,
        ...configs.react.all,
        ...configs.next.all,
        ...configs.node.recommended,
      ];

      expect(namesOf(everything)).not.toContain(strictConfig.name);
    });

    it('the extended groups add exactly one strict group to the plain groups', () => {
      expect(Object.keys(baseConfigExtended).filter((key) => !(key in baseConfig))).toStrictEqual([
        'importsStrict',
      ]);
      expect(Object.keys(reactConfigExtended).filter((key) => !(key in reactConfig))).toStrictEqual(
        ['strict'],
      );
      expect(
        Object.keys(typescriptConfigExtended).filter((key) => !(key in typescriptConfig)),
      ).toStrictEqual(['typescriptEslintStrict']);
    });
  });
});
