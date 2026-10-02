import { stripVTControlCharacters } from 'node:util';

import { describe, expect, it } from 'vitest';

import {
  baseGithubUrl,
  configs,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
  strictConfigs,
} from '@/constants/common';
import { getConfigUrl } from '@/helpers/getConfigUrl';
import { extendedCombinations, legacyCombinations } from '@/tests/fixtures/combinations';

import type { GetConfigUrlParams } from '@/helpers/getConfigUrl';

const extended = (overrides: Partial<GetConfigUrlParams> = {}): GetConfigUrlParams => ({
  config: configs.EXTENDED,
  language: languages.TYPESCRIPT,
  formatter: formatters.PRETTIER,
  runtime: runtimes.REACT,
  strictConfig: null as never,
  legacyConfig: null as never,
  ...overrides,
});

const legacy = (overrides: Partial<GetConfigUrlParams> = {}): GetConfigUrlParams => ({
  config: configs.LEGACY,
  language: languages.TYPESCRIPT,
  formatter: formatters.PRETTIER,
  runtime: null as never,
  strictConfig: null as never,
  legacyConfig: legacyConfigs.BASE,
  ...overrides,
});

const pathOf = (params: GetConfigUrlParams) => getConfigUrl(params)?.path;

describe('helpers/getConfigUrl', () => {
  describe('extended config', () => {
    it.each([
      [{ runtime: runtimes.REACT }, 'react/prettier/ts/default/eslint.config.mjs'],
      [{ runtime: runtimes.NEXT }, 'next/prettier/ts/default/eslint.config.mjs'],
      [{ runtime: runtimes.NODE }, 'node/prettier/ts/default/eslint.config.mjs'],
      [
        { runtime: runtimes.REACT, formatter: formatters.NONE },
        'react/ts/default/eslint.config.mjs',
      ],
      [
        { runtime: runtimes.REACT, language: languages.JAVASCRIPT },
        'react/prettier/js/default/eslint.config.mjs',
      ],
      [
        { runtime: runtimes.NODE, language: languages.JAVASCRIPT, formatter: formatters.NONE },
        'node/js/default/eslint.config.mjs',
      ],
    ] as [Partial<GetConfigUrlParams>, string][])(
      'builds the path for %j',
      (overrides, expected) => {
        expect(pathOf(extended(overrides))).toBe(expected);
      },
    );

    it('uses the default folder when strict config is null', () => {
      expect(pathOf(extended({ strictConfig: null as never }))).toContain('/default/');
    });

    it('uses the default folder when strict config is an empty list', () => {
      expect(pathOf(extended({ strictConfig: [] }))).toContain('/default/');
    });

    it('uses the strict folder with the selected strict config', () => {
      expect(pathOf(extended({ strictConfig: [strictConfigs.IMPORT] }))).toBe(
        'react/prettier/ts/strict/import/eslint.config.mjs',
      );
    });

    it('sorts multiple strict configs alphabetically and joins them with a dash', () => {
      expect(
        pathOf(
          extended({
            strictConfig: [strictConfigs.TYPESCRIPT, strictConfigs.REACT, strictConfigs.IMPORT],
          }),
        ),
      ).toBe('react/prettier/ts/strict/import-react-typescript/eslint.config.mjs');
    });

    it('does not mutate the strict config list while sorting', () => {
      const strictConfig = [strictConfigs.TYPESCRIPT, strictConfigs.IMPORT];
      pathOf(extended({ strictConfig }));

      expect(strictConfig).toStrictEqual([strictConfigs.TYPESCRIPT, strictConfigs.IMPORT]);
    });

    it('ignores the legacy config value', () => {
      expect(pathOf(extended({ legacyConfig: legacyConfigs.REACT }))).toBe(
        'react/prettier/ts/default/eslint.config.mjs',
      );
    });
  });

  describe('legacy config', () => {
    it.each([
      [{ legacyConfig: legacyConfigs.BASE }, 'legacy/base/prettier/ts/default/eslint.config.mjs'],
      [{ legacyConfig: legacyConfigs.REACT }, 'legacy/react/prettier/ts/default/eslint.config.mjs'],
      [
        { legacyConfig: legacyConfigs.REACT_HOOKS },
        'legacy/react-hooks/prettier/ts/default/eslint.config.mjs',
      ],
      [
        { legacyConfig: legacyConfigs.BASE, formatter: formatters.NONE },
        'legacy/base/ts/default/eslint.config.mjs',
      ],
      [
        { legacyConfig: legacyConfigs.BASE, language: languages.JAVASCRIPT },
        'legacy/base/prettier/js/default/eslint.config.mjs',
      ],
    ] as [Partial<GetConfigUrlParams>, string][])(
      'builds the path for %j',
      (overrides, expected) => {
        expect(pathOf(legacy(overrides))).toBe(expected);
      },
    );

    it('ignores the runtime value', () => {
      expect(pathOf(legacy({ runtime: runtimes.NEXT }))).toBe(
        'legacy/base/prettier/ts/default/eslint.config.mjs',
      );
    });

    it('does not use the strict folder even when strict config is passed', () => {
      expect(pathOf(legacy({ strictConfig: [strictConfigs.IMPORT] }))).toBe(
        'legacy/base/prettier/ts/strict/import/eslint.config.mjs',
      );
    });
  });

  describe('url', () => {
    it('is the github tree url of the template path', () => {
      const result = getConfigUrl(extended());

      expect(stripVTControlCharacters(result?.url ?? '')).toBe(
        `${baseGithubUrl}/react/prettier/ts/default/eslint.config.mjs`,
      );
    });

    it('always ends with the config file name', () => {
      for (const params of [...extendedCombinations, ...legacyCombinations]) {
        const result = getConfigUrl(params);

        expect(result?.path.endsWith('/eslint.config.mjs')).toBe(true);
        expect(stripVTControlCharacters(result?.url ?? '').endsWith(result?.path ?? '')).toBe(true);
      }
    });
  });

  it('never returns an empty segment or a double slash', () => {
    for (const params of [...extendedCombinations, ...legacyCombinations]) {
      const result = getConfigUrl(params);

      expect(result?.path).not.toMatch(/\/\/|^\/|null|undefined/);
    }
  });

  it('gives a different path for every different answer set', () => {
    const paths = [...extendedCombinations, ...legacyCombinations].map(pathOf);

    expect(new Set(paths).size).toBe(paths.length);
  });
});
