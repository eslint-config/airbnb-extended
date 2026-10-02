import { afterEach, describe, expect, it } from 'vitest';

import { getProgramOptions } from '@/helpers/getProgramOptions';
import { name, version } from '@/package.json';
import { captureOutput, ExitError, mockProcessExit, setArgv } from '@/tests/fixtures/cli';

let restoreArgv: (() => void) | undefined;

const parse = (...args: string[]) => {
  restoreArgv = setArgv(...args);
  return getProgramOptions();
};

const parseFailure = (...args: string[]) => {
  mockProcessExit();
  const output = captureOutput();

  let error: unknown;
  try {
    parse(...args);
  } catch (error_) {
    error = error_;
  }

  expect(error).toBeInstanceOf(ExitError);
  return { code: (error as ExitError).code, stderr: output.stderr() };
};

afterEach(() => {
  restoreArgv?.();
  restoreArgv = undefined;
});

describe('helpers/getProgramOptions', () => {
  it('returns no options when nothing is passed', () => {
    expect(parse()).toStrictEqual({});
  });

  describe('--config', () => {
    it.each(['extended', 'legacy'])('accepts %s', (config) => {
      expect(parse('--config', config)).toStrictEqual({ config });
    });

    it('rejects an unknown value', () => {
      const { code, stderr } = parseFailure('--config', 'modern');

      expect(code).toBe(1);
      expect(stderr).toContain("argument 'modern' is invalid");
      expect(stderr).toContain('extended, legacy');
    });
  });

  describe('--language', () => {
    it.each(['javascript', 'typescript'])('accepts %s', (language) => {
      expect(parse('--language', language)).toStrictEqual({ language });
    });

    it('accepts the --lang alias', () => {
      expect(parse('--lang', 'javascript')).toStrictEqual({ language: 'javascript' });
    });

    it('rejects an unknown value', () => {
      expect(parseFailure('--language', 'python').code).toBe(1);
    });
  });

  describe('--formatter', () => {
    it.each(['none', 'prettier'])('accepts %s', (formatter) => {
      expect(parse('--formatter', formatter)).toStrictEqual({ formatter });
    });

    it('rejects an unknown value', () => {
      expect(parseFailure('--formatter', 'biome').code).toBe(1);
    });
  });

  describe('--runtime', () => {
    it.each(['react', 'react-router', 'remix', 'next', 'node'])('accepts %s', (runtime) => {
      expect(parse('--runtime', runtime)).toStrictEqual({ runtime });
    });

    it('rejects an unknown value', () => {
      expect(parseFailure('--runtime', 'deno').code).toBe(1);
    });
  });

  describe('--package-manager', () => {
    it.each(['npm', 'yarn', 'pnpm', 'bun'])('accepts %s', (packageManager) => {
      expect(parse('--package-manager', packageManager)).toStrictEqual({ packageManager });
    });

    it('accepts the --pm alias', () => {
      expect(parse('--pm', 'pnpm')).toStrictEqual({ packageManager: 'pnpm' });
    });

    it('rejects an unknown value', () => {
      expect(parseFailure('--pm', 'deno').code).toBe(1);
    });
  });

  describe('--legacy-config', () => {
    it.each(['base', 'react', 'react-hooks'])('accepts %s', (legacyConfig) => {
      expect(parse('--legacy-config', legacyConfig)).toStrictEqual({ legacyConfig });
    });

    it('accepts the --legacy alias', () => {
      expect(parse('--legacy', 'base')).toStrictEqual({ legacyConfig: 'base' });
    });

    it('rejects an unknown value', () => {
      expect(parseFailure('--legacy-config', 'vue').code).toBe(1);
    });
  });

  describe.each(['--create-eslint-file', '--skip-install'])('%s', (flag) => {
    const key = flag === '--create-eslint-file' ? 'createEslintFile' : 'skipInstall';

    it('becomes "true" when passed without a value', () => {
      expect(parse(flag)).toStrictEqual({ [key]: 'true' });
    });

    it('keeps an explicit "true"', () => {
      expect(parse(flag, 'true')).toStrictEqual({ [key]: 'true' });
    });

    it('keeps an explicit "false"', () => {
      expect(parse(flag, 'false')).toStrictEqual({ [key]: 'false' });
    });

    it('rejects values that are not true or false', () => {
      expect(parseFailure(flag, 'yes').code).toBe(1);
    });
  });

  describe('--strict-config', () => {
    it('accepts a single value', () => {
      expect(parse('--strict', 'import')).toStrictEqual({ strictConfig: ['import'] });
    });

    it('accepts the --strict-config name', () => {
      expect(parse('--strict-config', 'import')).toStrictEqual({ strictConfig: ['import'] });
    });

    it('accepts multiple values after one flag', () => {
      expect(
        parse(
          '--language',
          'typescript',
          '--runtime',
          'react',
          '--strict',
          'import',
          'react',
          'typescript',
        ),
      ).toStrictEqual({
        language: 'typescript',
        runtime: 'react',
        strictConfig: ['import', 'react', 'typescript'],
      });
    });

    it('accepts the flag more than once', () => {
      expect(
        parse('--language', 'typescript', '--strict', 'import', '--strict', 'typescript'),
      ).toStrictEqual({ language: 'typescript', strictConfig: ['import', 'typescript'] });
    });

    it('removes duplicate values', () => {
      expect(parse('--strict', 'import', '--strict', 'import')).toStrictEqual({
        strictConfig: ['import'],
      });
    });

    it('collapses to ["none"] when none is part of the list', () => {
      expect(parse('--strict', 'import', 'none')).toStrictEqual({ strictConfig: ['none'] });
      expect(parse('--strict', 'none')).toStrictEqual({ strictConfig: ['none'] });
    });

    // KNOWN BUG: `.argParser()` replaces the validator that `.choices()` adds,
    // so an unknown value is accepted and silently dropped by the filter below.
    // `it.fails` passes while the bug exists and fails once it is fixed.
    // When it fails, change `it.fails` to `it`.
    it.fails('rejects an unknown value', () => {
      expect(parseFailure('--strict', 'vue').code).toBe(1);
    });

    it('currently drops an unknown value without an error (see known bug above)', () => {
      expect(parse('--strict', 'vue')).toStrictEqual({ strictConfig: [] });
    });

    describe('filtering by runtime and language', () => {
      it.each(['react', 'next'])('keeps react strict for the %s runtime', (runtime) => {
        expect(parse('--runtime', runtime, '--strict', 'react')).toStrictEqual({
          runtime,
          strictConfig: ['react'],
        });
      });

      it('drops react strict for the node runtime', () => {
        expect(parse('--runtime', 'node', '--strict', 'react')).toStrictEqual({
          runtime: 'node',
          strictConfig: [],
        });
      });

      it('drops react strict when no runtime is given', () => {
        expect(parse('--strict', 'react')).toStrictEqual({ strictConfig: [] });
      });

      it('drops react strict for react-router and remix because they are not reduced yet', () => {
        // Runtime aliases are only mapped to "react" later, in getArgs.
        expect(parse('--runtime', 'remix', '--strict', 'react')).toStrictEqual({
          runtime: 'remix',
          strictConfig: [],
        });
      });

      it('keeps typescript strict for the typescript language', () => {
        expect(parse('--language', 'typescript', '--strict', 'typescript')).toStrictEqual({
          language: 'typescript',
          strictConfig: ['typescript'],
        });
      });

      it('drops typescript strict for the javascript language', () => {
        expect(parse('--language', 'javascript', '--strict', 'typescript')).toStrictEqual({
          language: 'javascript',
          strictConfig: [],
        });
      });

      it('drops typescript strict when no language is given', () => {
        expect(parse('--strict', 'typescript')).toStrictEqual({ strictConfig: [] });
      });

      it('always keeps import strict', () => {
        expect(
          parse('--runtime', 'node', '--language', 'javascript', '--strict', 'import'),
        ).toStrictEqual({
          runtime: 'node',
          language: 'javascript',
          strictConfig: ['import'],
        });
      });
    });
  });

  describe('conflicts', () => {
    it('rejects --runtime together with --legacy-config', () => {
      const { code, stderr } = parseFailure('--runtime', 'react', '--legacy-config', 'base');

      expect(code).toBe(1);
      expect(stderr).toContain('cannot be used with');
    });

    // KNOWN BUG: `.conflicts(['strict-config'])` uses the flag name, but commander
    // expects the attribute name (`strictConfig`), so the conflict is never raised.
    // When it fails, change `it.fails` to `it`.
    it.fails('rejects --strict-config together with --legacy-config', () => {
      const { code, stderr } = parseFailure('--strict', 'import', '--legacy-config', 'base');

      expect(code).toBe(1);
      expect(stderr).toContain('cannot be used with');
    });

    it('rejects --runtime together with --legacy when the order is reversed', () => {
      expect(parseFailure('--legacy', 'base', '--runtime', 'react').code).toBe(1);
    });
  });

  describe('meta options', () => {
    it.each(['-v', '--version'])('prints the package version for %s', (flag) => {
      mockProcessExit();
      const output = captureOutput();
      restoreArgv = setArgv(flag);

      expect(() => getProgramOptions()).toThrow(ExitError);
      expect(output.stdout().trim()).toBe(version);
    });

    it.each(['-h', '--help'])('prints the usage for %s', (flag) => {
      mockProcessExit();
      const output = captureOutput();
      restoreArgv = setArgv(flag);

      expect(() => getProgramOptions()).toThrow(ExitError);

      const help = output.stdout();
      expect(help).toContain(`Usage: ${name}`);
      for (const option of [
        '--config',
        '--lang, --language',
        '--formatter',
        '--runtime',
        '--strict, --strict-config',
        '--legacy, --legacy-config',
        '--pm, --package-manager',
        '--create-eslint-file',
        '--skip-install',
        '-v, --version',
        '-h, --help',
      ]) {
        expect(help).toContain(option);
      }
    });

    it('rejects an unknown option', () => {
      expect(parseFailure('--unknown').stderr).toContain("unknown option '--unknown'");
    });
  });

  it('combines every option', () => {
    expect(
      parse(
        '--config',
        'extended',
        '--lang',
        'typescript',
        '--formatter',
        'prettier',
        '--runtime',
        'next',
        '--strict',
        'import',
        'react',
        'typescript',
        '--pm',
        'pnpm',
        '--create-eslint-file',
        '--skip-install',
        'false',
      ),
    ).toStrictEqual({
      config: 'extended',
      language: 'typescript',
      formatter: 'prettier',
      runtime: 'next',
      strictConfig: ['import', 'react', 'typescript'],
      packageManager: 'pnpm',
      createEslintFile: 'true',
      skipInstall: 'false',
    });
  });
});
