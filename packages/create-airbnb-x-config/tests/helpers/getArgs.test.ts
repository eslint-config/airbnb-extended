import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getArgs } from '@/helpers/getArgs';
import { getPackageManager } from '@/helpers/getPackageManager';
import { getProgramOptions } from '@/helpers/getProgramOptions';

vi.mock('@/helpers/getProgramOptions', () => ({ getProgramOptions: vi.fn() }));
vi.mock('@/helpers/getPackageManager', () => ({ getPackageManager: vi.fn() }));

const withOptions = (options: Record<string, unknown>) =>
  vi.mocked(getProgramOptions).mockReturnValue(options);

const emptyArgs = {
  config: null,
  language: null,
  formatter: null,
  runtime: null,
  strictConfig: null,
  legacyConfig: null,
  packageManager: 'detected-pm',
  createEslintFile: null,
  skipInstall: null,
};

beforeEach(() => {
  vi.mocked(getPackageManager).mockResolvedValue('detected-pm' as never);
  withOptions({});
});

describe('helpers/getArgs', () => {
  it('returns null for every unanswered option and detects the package manager', async () => {
    await expect(getArgs()).resolves.toStrictEqual(emptyArgs);
    expect(getPackageManager).toHaveBeenCalledTimes(1);
  });

  it('returns the full argument set in a fixed key order', async () => {
    expect(Object.keys(await getArgs())).toStrictEqual([
      'config',
      'language',
      'formatter',
      'runtime',
      'strictConfig',
      'legacyConfig',
      'packageManager',
      'createEslintFile',
      'skipInstall',
    ]);
  });

  describe('config', () => {
    it.each(['extended', 'legacy'])('keeps %s', async (config) => {
      withOptions({ config });

      expect((await getArgs()).config).toBe(config);
    });

    it('returns null for an unknown value', async () => {
      withOptions({ config: 'modern' });

      expect((await getArgs()).config).toBeNull();
    });
  });

  describe('language', () => {
    it.each(['javascript', 'typescript'])('keeps %s', async (language) => {
      withOptions({ language });

      expect((await getArgs()).language).toBe(language);
    });

    it('returns null for an unknown value', async () => {
      withOptions({ language: 'python' });

      expect((await getArgs()).language).toBeNull();
    });
  });

  describe('formatter', () => {
    it.each(['none', 'prettier'])('keeps %s', async (formatter) => {
      withOptions({ formatter });

      expect((await getArgs()).formatter).toBe(formatter);
    });

    it('returns null for an unknown value', async () => {
      withOptions({ formatter: 'biome' });

      expect((await getArgs()).formatter).toBeNull();
    });
  });

  describe('runtime', () => {
    it.each([
      ['react', 'react'],
      ['react-router', 'react'],
      ['remix', 'react'],
      ['next', 'next'],
      ['node', 'node'],
    ])('maps %s to %s', async (runtime, expected) => {
      withOptions({ runtime });

      expect((await getArgs()).runtime).toBe(expected);
    });

    it('returns null for an unknown value', async () => {
      withOptions({ runtime: 'deno' });

      expect((await getArgs()).runtime).toBeNull();
    });
  });

  describe('strictConfig', () => {
    it('keeps a list with values', async () => {
      withOptions({ strictConfig: ['import', 'react'] });

      expect((await getArgs()).strictConfig).toStrictEqual(['import', 'react']);
    });

    it('keeps the "none" marker so the prompt flow can skip the question', async () => {
      withOptions({ strictConfig: ['none'] });

      expect((await getArgs()).strictConfig).toStrictEqual(['none']);
    });

    it('returns null for an empty list', async () => {
      withOptions({ strictConfig: [] });

      expect((await getArgs()).strictConfig).toBeNull();
    });

    it('returns null when it is missing', async () => {
      expect((await getArgs()).strictConfig).toBeNull();
    });
  });

  describe('legacyConfig', () => {
    it.each(['base', 'react', 'react-hooks'])('keeps %s', async (legacyConfig) => {
      withOptions({ legacyConfig });

      expect((await getArgs()).legacyConfig).toBe(legacyConfig);
    });

    it('returns null for an unknown value', async () => {
      withOptions({ legacyConfig: 'vue' });

      expect((await getArgs()).legacyConfig).toBeNull();
    });
  });

  describe('packageManager', () => {
    it.each(['npm', 'yarn', 'pnpm', 'bun'])(
      'uses %s from the options without detecting',
      async (packageManager) => {
        withOptions({ packageManager });

        expect((await getArgs()).packageManager).toBe(packageManager);
        expect(getPackageManager).not.toHaveBeenCalled();
      },
    );

    it('detects the package manager when the option is unknown', async () => {
      withOptions({ packageManager: 'deno' });

      expect((await getArgs()).packageManager).toBe('detected-pm');
      expect(getPackageManager).toHaveBeenCalledTimes(1);
    });
  });

  describe.each([['createEslintFile'], ['skipInstall']] as const)('%s', (key) => {
    it('turns "true" into true', async () => {
      withOptions({ [key]: 'true' });

      expect((await getArgs())[key]).toBe(true);
    });

    it('turns "false" into false', async () => {
      withOptions({ [key]: 'false' });

      expect((await getArgs())[key]).toBe(false);
    });

    it('returns null when it is missing', async () => {
      expect((await getArgs())[key]).toBeNull();
    });

    it('returns false for any other value', async () => {
      withOptions({ [key]: 'maybe' });

      expect((await getArgs())[key]).toBe(false);
    });
  });

  it('maps a full set of options', async () => {
    withOptions({
      config: 'extended',
      language: 'typescript',
      formatter: 'prettier',
      runtime: 'remix',
      strictConfig: ['import', 'react'],
      packageManager: 'bun',
      createEslintFile: 'true',
      skipInstall: 'false',
    });

    await expect(getArgs()).resolves.toStrictEqual({
      config: 'extended',
      language: 'typescript',
      formatter: 'prettier',
      runtime: 'react',
      strictConfig: ['import', 'react'],
      legacyConfig: null,
      packageManager: 'bun',
      createEslintFile: true,
      skipInstall: false,
    });
  });
});
