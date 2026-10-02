import stylistic from '@stylistic/eslint-plugin';
import { describe, expect, it } from 'vitest';

import { getStylisticLegacyConfig } from '@/helpers/getStylisticLegacyConfig';

const allLegacyRules = Object.keys(stylistic.configs['disable-legacy'].rules ?? {});

const ruleIdsOf = (language: 'javascript' | 'typescript' | 'react') =>
  Object.keys(getStylisticLegacyConfig(language).rules ?? {});

describe('helpers/getStylisticLegacyConfig', () => {
  it('has legacy rules to disable', () => {
    expect(allLegacyRules.length).toBeGreaterThan(0);
  });

  describe('javascript', () => {
    it('keeps only the core rules', () => {
      const ruleIds = ruleIdsOf('javascript');

      expect(ruleIds.length).toBeGreaterThan(0);
      expect(
        ruleIds.filter((id) => id.startsWith('react/') || id.startsWith('@typescript-eslint/')),
      ).toStrictEqual([]);
    });
  });

  describe('typescript', () => {
    it('keeps only the @typescript-eslint rules', () => {
      const ruleIds = ruleIdsOf('typescript');

      expect(ruleIds.length).toBeGreaterThan(0);
      expect(ruleIds.every((id) => id.startsWith('@typescript-eslint/'))).toBe(true);
    });
  });

  describe('react', () => {
    it('keeps only the react rules', () => {
      const ruleIds = ruleIdsOf('react');

      expect(ruleIds.length).toBeGreaterThan(0);
      expect(ruleIds.every((id) => id.startsWith('react/'))).toBe(true);
    });
  });

  it('splits the stylistic disable-legacy rules without losing or repeating one', () => {
    const merged = [...ruleIdsOf('javascript'), ...ruleIdsOf('typescript'), ...ruleIdsOf('react')];

    expect(merged.toSorted((a, b) => a.localeCompare(b))).toStrictEqual(
      allLegacyRules.toSorted((a, b) => a.localeCompare(b)),
    );
  });

  it.each(['javascript', 'typescript', 'react'] as const)(
    'keeps the original setting of every %s rule',
    (language) => {
      const original = stylistic.configs['disable-legacy'].rules ?? {};
      const { rules } = getStylisticLegacyConfig(language);

      for (const [ruleId, setting] of Object.entries(rules ?? {})) {
        expect(setting).toBe(original[ruleId]);
      }
    },
  );

  it.each(['javascript', 'typescript', 'react'] as const)(
    'switches every %s rule off',
    (language) => {
      for (const setting of Object.values(getStylisticLegacyConfig(language).rules ?? {})) {
        expect([0, 'off']).toContain(setting);
      }
    },
  );

  it.each(['javascript', 'typescript', 'react'] as const)(
    'keeps the other keys of the stylistic config for %s',
    (language) => {
      const withoutRules = (config: object) =>
        Object.fromEntries(Object.entries(config).filter(([key]) => key !== 'rules'));

      expect(withoutRules(getStylisticLegacyConfig(language))).toStrictEqual(
        withoutRules(stylistic.configs['disable-legacy']),
      );
    },
  );

  it('does not change the stylistic config itself', () => {
    const before = Object.keys(stylistic.configs['disable-legacy'].rules ?? {}).length;
    getStylisticLegacyConfig('javascript');

    expect(Object.keys(stylistic.configs['disable-legacy'].rules ?? {})).toHaveLength(before);
  });
});
