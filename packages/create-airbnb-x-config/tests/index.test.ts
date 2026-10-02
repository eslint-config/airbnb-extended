import { stripVTControlCharacters } from 'node:util';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ExitError, mockProcessExit } from '@/tests/fixtures/cli';

import type { ArgsOutput, GetArgs } from '@/helpers/getArgs';

vi.mock('prompts', () => ({ default: vi.fn() }));
vi.mock('@/helpers/getArgs', () => ({ getArgs: vi.fn() }));
vi.mock('@/helpers/createEslintConfigFile', () => ({ createESLintConfigFile: vi.fn() }));
vi.mock('@/helpers/installPackages', () => ({ installPackages: vi.fn() }));

type Args = Awaited<ReturnType<GetArgs>>;
type Question = Record<string, unknown> & { name: string };

/** Args as returned by `getArgs` when the user passed no flag at all. */
const noFlags: Args = {
  config: null,
  language: null,
  formatter: null,
  runtime: null,
  strictConfig: null,
  legacyConfig: null,
  packageManager: 'pnpm',
  createEslintFile: null,
  skipInstall: null,
};

/** Args as returned by `getArgs` when the user passed every flag. */
const allFlags: Args = {
  config: 'extended',
  language: 'typescript',
  formatter: 'prettier',
  runtime: 'react',
  strictConfig: ['import'],
  legacyConfig: null,
  packageManager: 'pnpm',
  createEslintFile: true,
  skipInstall: true,
};

let logs: string[];
let errors: unknown[];

const text = (value: unknown) => stripVTControlCharacters(String(value));

/**
 * Loads `index.ts` fresh (it runs on import) with the given flags and prompt answers.
 * `answers` is keyed by the prompt `name`.
 */
const runCli = async (args: Partial<Args>, answers: Record<string, unknown> = {}) => {
  vi.resetModules();

  const prompts = (await import('prompts')).default as unknown as ReturnType<typeof vi.fn>;
  const { getArgs } = await import('@/helpers/getArgs');
  const { createESLintConfigFile } = await import('@/helpers/createEslintConfigFile');
  const { installPackages } = await import('@/helpers/installPackages');
  const utils = await import('@/utils');

  vi.mocked(getArgs).mockResolvedValue({ ...noFlags, ...args });
  vi.mocked(createESLintConfigFile).mockResolvedValue();
  vi.mocked(installPackages).mockResolvedValue();

  const asked: Question[] = [];
  prompts.mockImplementation(async (question: Question) => {
    asked.push(question);

    if (!(question.name in answers)) {
      throw new Error(`Unexpected prompt: ${question.name}`);
    }

    return { [question.name]: answers[question.name] };
  });

  await import('@/index');

  return {
    asked,
    askedNames: asked.map((question) => question.name),
    prompts,
    createESLintConfigFile: vi.mocked(createESLintConfigFile),
    installPackages: vi.mocked(installPackages),
    utils,
    output: () => logs.map(text).join('\n'),
  };
};

beforeEach(() => {
  logs = [];
  errors = [];
  vi.spyOn(console, 'log').mockImplementation((...parts: unknown[]) => {
    logs.push(parts.map(String).join(' '));
  });
  vi.spyOn(console, 'error').mockImplementation((...parts: unknown[]) => {
    errors.push(...parts);
  });
  vi.spyOn(process, 'on').mockImplementation((() => process) as never);
});

afterEach(() => {
  vi.resetModules();
});

describe('index (cli flow)', () => {
  describe('process signals', () => {
    it('exits cleanly on SIGINT and SIGTERM', async () => {
      const { utils } = await runCli(allFlags);

      expect(process.on).toHaveBeenCalledWith('SIGINT', utils.handleSigTerm);
      expect(process.on).toHaveBeenCalledWith('SIGTERM', utils.handleSigTerm);
    });
  });

  describe('when every flag is passed', () => {
    it('asks nothing', async () => {
      const { prompts } = await runCli(allFlags);

      expect(prompts).not.toHaveBeenCalled();
    });

    it('skips the install and prints the command to run', async () => {
      const { installPackages, output } = await runCli(allFlags);

      expect(installPackages).not.toHaveBeenCalled();
      expect(output()).toContain('No Worries');
      expect(output()).toContain('(pnpm, maybe?');
      expect(output()).toContain('Command:');
      expect(output()).toContain(
        'pnpm install -D eslint@^9 @eslint/compat @eslint/js@^9 eslint-config-airbnb-extended prettier eslint-plugin-prettier eslint-config-prettier',
      );
    });

    it('creates the eslint config file with the final args', async () => {
      const { createESLintConfigFile } = await runCli(allFlags);

      expect(createESLintConfigFile).toHaveBeenCalledTimes(1);
      expect(createESLintConfigFile).toHaveBeenCalledWith(allFlags);
    });

    it('prints the created config url', async () => {
      const { output } = await runCli(allFlags);

      expect(output()).toContain('Created Config:');
      expect(output()).toContain(
        'https://github.com/eslint-config/airbnb-extended/tree/master/apps/build-templates/templates/react/prettier/ts/strict/import/eslint.config.mjs',
      );
    });
  });

  describe('config prompt', () => {
    it('asks as a toggle with Extended as the default', async () => {
      const { asked } = await runCli({ ...allFlags, config: null }, { configBoolean: true });

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'configBoolean',
        message: 'Config?',
        initial: true,
        active: 'Extended',
        inactive: 'Legacy',
      });
    });

    it('goes the extended way when the user picks Extended', async () => {
      const { askedNames, createESLintConfigFile } = await runCli(
        { ...allFlags, config: null, legacyConfig: 'base' },
        { configBoolean: true },
      );

      expect(askedNames).toStrictEqual(['configBoolean']);
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ config: 'extended', legacyConfig: null, runtime: 'react' }),
      );
    });

    it('goes the legacy way when the user picks Legacy and clears the runtime', async () => {
      const { askedNames, createESLintConfigFile } = await runCli(
        { ...allFlags, config: null, legacyConfig: 'base' },
        { configBoolean: false },
      );

      expect(askedNames).toStrictEqual(['configBoolean']);
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ config: 'legacy', runtime: null, legacyConfig: 'base' }),
      );
    });
  });

  describe('language prompt', () => {
    it('asks as a toggle with TypeScript as the default', async () => {
      const { asked } = await runCli({ ...allFlags, language: null }, { languageBoolean: true });

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'languageBoolean',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      });
      expect(text(asked[0]?.message)).toBe('Are you using typescript?');
    });

    it.each([
      [true, 'typescript'],
      [false, 'javascript'],
    ])('maps %s to %s', async (answer, language) => {
      const { createESLintConfigFile } = await runCli(
        { ...allFlags, language: null },
        { languageBoolean: answer },
      );

      expect(createESLintConfigFile).toHaveBeenCalledWith(expect.objectContaining({ language }));
    });
  });

  describe('formatter prompt', () => {
    it('asks as a toggle with prettier as the default', async () => {
      const { asked } = await runCli({ ...allFlags, formatter: null }, { formatterBoolean: true });

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'formatterBoolean',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      });
      expect(text(asked[0]?.message)).toBe('Are you using prettier?');
    });

    it.each([
      [true, 'prettier'],
      [false, null],
    ])('maps %s to %s', async (answer, formatter) => {
      const { createESLintConfigFile } = await runCli(
        { ...allFlags, formatter: null },
        { formatterBoolean: answer },
      );

      expect(createESLintConfigFile).toHaveBeenCalledWith(expect.objectContaining({ formatter }));
    });

    it('does not ask when the flag is "none" and clears the value', async () => {
      const { prompts, createESLintConfigFile, output } = await runCli({
        ...allFlags,
        formatter: 'none',
      });

      expect(prompts).not.toHaveBeenCalled();
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ formatter: null }),
      );
      expect(output()).not.toContain('prettier');
    });
  });

  describe('runtime prompt', () => {
    it('asks as a select with react, next and node', async () => {
      const { asked } = await runCli({ ...allFlags, runtime: null }, { runtime: 'react' });

      expect(asked[0]).toMatchObject({
        type: 'select',
        name: 'runtime',
        message: 'Are you using?',
      });
      expect(
        (asked[0]?.choices as { title: string; value: string }[]).map(({ title, value }) => [
          title,
          value,
        ]),
      ).toStrictEqual([
        ['React/React Router/Remix', 'react'],
        ['Next', 'next'],
        ['Node', 'node'],
      ]);
    });

    it.each(['react', 'next', 'node'])('uses the %s answer', async (runtime) => {
      const { createESLintConfigFile } = await runCli(
        { ...allFlags, runtime: null, strictConfig: ['import'] },
        { runtime },
      );

      expect(createESLintConfigFile).toHaveBeenCalledWith(expect.objectContaining({ runtime }));
    });

    it('does not ask when a runtime is passed', async () => {
      const { askedNames } = await runCli({ ...allFlags, runtime: 'next' });

      expect(askedNames).not.toContain('runtime');
    });

    it('does not ask for a runtime in the legacy config', async () => {
      const { askedNames } = await runCli({
        ...allFlags,
        config: 'legacy',
        runtime: null,
        legacyConfig: 'base',
      });

      expect(askedNames).not.toContain('runtime');
    });
  });

  describe('strict config prompts', () => {
    it('asks as a toggle with No as the default', async () => {
      const { asked } = await runCli(
        { ...allFlags, strictConfig: null },
        { hasStrictConfig: false },
      );

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'hasStrictConfig',
        initial: false,
        active: 'Yes',
        inactive: 'No',
      });
      expect(text(asked[0]?.message)).toBe('Do you want to add strict configs?');
    });

    it('sets strict config to null when the user says no', async () => {
      const { askedNames, createESLintConfigFile } = await runCli(
        { ...allFlags, strictConfig: null },
        { hasStrictConfig: false },
      );

      expect(askedNames).toStrictEqual(['hasStrictConfig']);
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ strictConfig: null }),
      );
    });

    it('does not ask when the flag is "none" and clears the value', async () => {
      const { prompts, createESLintConfigFile } = await runCli({
        ...allFlags,
        strictConfig: ['none'],
      });

      expect(prompts).not.toHaveBeenCalled();
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ strictConfig: null }),
      );
    });

    it('does not ask when "none" is mixed with other values', async () => {
      const { prompts } = await runCli({ ...allFlags, strictConfig: ['import', 'none'] });

      expect(prompts).not.toHaveBeenCalled();
    });

    it('does not ask when strict values are passed', async () => {
      const { prompts, createESLintConfigFile } = await runCli({
        ...allFlags,
        strictConfig: ['import', 'react'],
      });

      expect(prompts).not.toHaveBeenCalled();
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ strictConfig: ['import', 'react'] }),
      );
    });

    describe('when the user wants strict configs', () => {
      const choicesFor = async (args: Partial<Args>) => {
        const { asked } = await runCli(
          { ...allFlags, strictConfig: null, ...args },
          { hasStrictConfig: true, strictConfig: ['import'] },
        );

        const question = asked[1] as Question & {
          choices: { title: string; value: string }[];
        };

        return { question, values: question.choices.map(({ value }) => value) };
      };

      it('asks as a multiselect with at least one required', async () => {
        const { question } = await choicesFor({});

        expect(question).toMatchObject({
          type: 'multiselect',
          name: 'strictConfig',
          message: 'Select Strict Configs:',
          min: 1,
        });
      });

      it.each([
        ['react', 'typescript', ['import', 'react', 'typescript']],
        ['next', 'typescript', ['import', 'react', 'typescript']],
        ['node', 'typescript', ['import', 'typescript']],
        ['react', 'javascript', ['import', 'react']],
        ['next', 'javascript', ['import', 'react']],
        ['node', 'javascript', ['import']],
      ] as const)('offers the right choices for %s + %s', async (runtime, language, expected) => {
        const { values } = await choicesFor({ runtime, language });

        expect(values).toStrictEqual(expected);
      });

      it('uses the selected values', async () => {
        const { createESLintConfigFile } = await runCli(
          { ...allFlags, strictConfig: null },
          { hasStrictConfig: true, strictConfig: ['import', 'typescript'] },
        );

        expect(createESLintConfigFile).toHaveBeenCalledWith(
          expect.objectContaining({ strictConfig: ['import', 'typescript'] }),
        );
      });

      it('offers the react choice after the runtime was answered in a prompt', async () => {
        const { asked } = await runCli(
          { ...allFlags, runtime: null, strictConfig: null },
          { runtime: 'next', hasStrictConfig: true, strictConfig: ['react'] },
        );

        const strictQuestion = asked.find((question) => question.name === 'strictConfig');
        expect(
          (strictQuestion?.choices as { value: string }[]).map(({ value }) => value),
        ).toContain('react');
      });

      it('never offers react for the node runtime answered in a prompt', async () => {
        const { asked } = await runCli(
          { ...allFlags, runtime: null, strictConfig: null },
          { runtime: 'node', hasStrictConfig: true, strictConfig: ['import'] },
        );

        const strictQuestion = asked.find((question) => question.name === 'strictConfig');
        expect(
          (strictQuestion?.choices as { value: string }[]).map(({ value }) => value),
        ).not.toContain('react');
      });
    });

    it('does not ask about strict configs in the legacy config', async () => {
      const { askedNames } = await runCli({
        ...allFlags,
        config: 'legacy',
        legacyConfig: 'base',
        strictConfig: null,
      });

      expect(askedNames).not.toContain('hasStrictConfig');
    });
  });

  describe('legacy config prompts', () => {
    const legacyFlags: Partial<Args> = {
      ...allFlags,
      config: 'legacy',
      runtime: null,
      strictConfig: null,
    };

    it('asks as a select with base and react', async () => {
      const { asked } = await runCli(
        { ...legacyFlags, legacyConfig: null },
        { legacyConfig: 'base' },
      );

      expect(asked[0]).toMatchObject({
        type: 'select',
        name: 'legacyConfig',
        message: 'Are you using?',
      });
      expect(
        (asked[0]?.choices as { title: string; value: string }[]).map(({ title, value }) => [
          title,
          value,
        ]),
      ).toStrictEqual([
        ['Base Config', 'base'],
        ['React Config', 'react'],
      ]);
    });

    it('does not ask for the legacy config when it is passed', async () => {
      const { askedNames } = await runCli({ ...legacyFlags, legacyConfig: 'base' });

      expect(askedNames).toStrictEqual([]);
    });

    it('does not ask about hooks for the base config', async () => {
      const { askedNames, createESLintConfigFile } = await runCli(
        { ...legacyFlags, legacyConfig: null },
        { legacyConfig: 'base' },
      );

      expect(askedNames).toStrictEqual(['legacyConfig']);
      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ legacyConfig: 'base' }),
      );
    });

    it('asks about hooks for the react config, with Yes as the default', async () => {
      const { asked } = await runCli(
        { ...legacyFlags, legacyConfig: null },
        { legacyConfig: 'react', reactHooks: true },
      );

      expect(asked[1]).toMatchObject({
        type: 'toggle',
        name: 'reactHooks',
        message: 'Are you using hooks?',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      });
    });

    it.each([
      [true, 'react-hooks'],
      [false, 'react'],
    ])('maps the hooks answer %s to %s', async (reactHooks, legacyConfig) => {
      const { createESLintConfigFile } = await runCli(
        { ...legacyFlags, legacyConfig: null },
        { legacyConfig: 'react', reactHooks },
      );

      expect(createESLintConfigFile).toHaveBeenCalledWith(
        expect.objectContaining({ legacyConfig }),
      );
    });

    it('asks about hooks when react is passed as a flag', async () => {
      const { askedNames } = await runCli(
        { ...legacyFlags, legacyConfig: 'react' },
        { reactHooks: true },
      );

      expect(askedNames).toStrictEqual(['reactHooks']);
    });

    it('does not ask about hooks when react-hooks is passed as a flag', async () => {
      const { askedNames } = await runCli({ ...legacyFlags, legacyConfig: 'react-hooks' });

      expect(askedNames).toStrictEqual([]);
    });

    it('does not ask for the legacy config in the extended config', async () => {
      const { askedNames } = await runCli(allFlags);

      expect(askedNames).not.toContain('legacyConfig');
    });
  });

  describe('create eslint file prompt', () => {
    it('asks as a toggle with Yes as the default', async () => {
      const { asked } = await runCli(
        { ...allFlags, createEslintFile: null },
        { createEslintFile: true },
      );

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'createEslintFile',
        initial: true,
        active: 'Yes',
        inactive: 'No',
      });
      expect(text(asked[0]?.message)).toBe('Should I create an eslint.config.mjs file for you?');
    });

    it('creates the file and prints "Created Config:" on yes', async () => {
      const { createESLintConfigFile, output } = await runCli(
        { ...allFlags, createEslintFile: null },
        { createEslintFile: true },
      );

      expect(createESLintConfigFile).toHaveBeenCalledTimes(1);
      expect(output()).toContain('Created Config:');
    });

    it('does not create the file and prints "Config:" on no', async () => {
      const { createESLintConfigFile, output } = await runCli(
        { ...allFlags, createEslintFile: null },
        { createEslintFile: false },
      );

      expect(createESLintConfigFile).not.toHaveBeenCalled();
      expect(output()).not.toContain('Created Config:');
      expect(output()).toContain('Config:');
    });

    it('does not ask when the flag is false', async () => {
      const { prompts, createESLintConfigFile } = await runCli({
        ...allFlags,
        createEslintFile: false,
      });

      expect(prompts).not.toHaveBeenCalled();
      expect(createESLintConfigFile).not.toHaveBeenCalled();
    });
  });

  describe('skip install prompt', () => {
    it('asks as a toggle with No as the default', async () => {
      const { asked } = await runCli({ ...allFlags, skipInstall: null }, { skipInstall: true });

      expect(asked[0]).toMatchObject({
        type: 'toggle',
        name: 'skipInstall',
        message: 'Do you want to skip the package installation?',
        initial: false,
        active: 'Yes',
        inactive: 'No',
      });
    });

    it('prints the command and does not install when the user skips', async () => {
      const { installPackages, output } = await runCli(
        { ...allFlags, skipInstall: null },
        { skipInstall: true },
      );

      expect(installPackages).not.toHaveBeenCalled();
      expect(output()).toContain('No Worries');
      expect(output()).not.toContain('Installing');
    });

    it('installs the packages when the user does not skip', async () => {
      const { installPackages, output } = await runCli(
        { ...allFlags, skipInstall: null },
        { skipInstall: false },
      );

      expect(installPackages).toHaveBeenCalledTimes(1);
      expect(installPackages).toHaveBeenCalledWith({ ...allFlags, skipInstall: false });
      expect(output()).toContain('Installing packages using pnpm, please wait...');
      expect(output()).toContain('Installation Completed');
      expect(output()).toContain('Executed Command:');
      expect(output()).not.toContain('No Worries');
    });

    it('creates the file before it installs the packages', async () => {
      const calls: string[] = [];
      vi.resetModules();
      const { createESLintConfigFile } = await import('@/helpers/createEslintConfigFile');
      const { installPackages } = await import('@/helpers/installPackages');
      const { getArgs } = await import('@/helpers/getArgs');
      vi.mocked(getArgs).mockResolvedValue({ ...allFlags, skipInstall: false });
      vi.mocked(createESLintConfigFile).mockImplementation(async () => {
        calls.push('file');
      });
      vi.mocked(installPackages).mockImplementation(async () => {
        calls.push('install');
      });

      await import('@/index');

      expect(calls).toStrictEqual(['file', 'install']);
    });

    it('does not install the prettier packages when no formatter is used', async () => {
      const { output } = await runCli({ ...allFlags, formatter: 'none' });

      expect(output()).toContain(
        'pnpm install -D eslint@^9 @eslint/compat @eslint/js@^9 eslint-config-airbnb-extended',
      );
      expect(output()).not.toContain('eslint-plugin-prettier');
    });

    it.each([
      ['npm', 'npm install -D'],
      ['yarn', 'yarn add -D'],
      ['pnpm', 'pnpm install -D'],
      ['bun', 'bun add -D'],
    ] as const)('prints the %s command', async (packageManager, expected) => {
      const { output } = await runCli({ ...allFlags, packageManager });

      expect(output()).toContain(expected);
      expect(output()).toContain(`(${packageManager}, maybe?`);
    });
  });

  describe('prompt options', () => {
    it('passes the cancel handler and the state handler to every prompt', async () => {
      const { asked, prompts, utils } = await runCli(noFlags, {
        configBoolean: true,
        languageBoolean: true,
        formatterBoolean: true,
        runtime: 'react',
        hasStrictConfig: true,
        strictConfig: ['import'],
        createEslintFile: true,
        skipInstall: true,
      });

      expect(asked.length).toBeGreaterThan(0);
      for (const [question, options] of prompts.mock.calls as [Question, unknown][]) {
        expect(question.onState).toBe(utils.onPromptState);
        expect(options).toStrictEqual({ onCancel: utils.onCancel });
      }
    });

    it('asks the questions in a fixed order for the extended config', async () => {
      const { askedNames } = await runCli(noFlags, {
        configBoolean: true,
        languageBoolean: true,
        formatterBoolean: true,
        runtime: 'react',
        hasStrictConfig: true,
        strictConfig: ['import'],
        createEslintFile: true,
        skipInstall: true,
      });

      expect(askedNames).toStrictEqual([
        'configBoolean',
        'languageBoolean',
        'formatterBoolean',
        'runtime',
        'hasStrictConfig',
        'strictConfig',
        'createEslintFile',
        'skipInstall',
      ]);
    });

    it('asks the questions in a fixed order for the legacy config', async () => {
      const { askedNames } = await runCli(noFlags, {
        configBoolean: false,
        languageBoolean: false,
        formatterBoolean: false,
        legacyConfig: 'react',
        reactHooks: true,
        createEslintFile: true,
        skipInstall: true,
      });

      expect(askedNames).toStrictEqual([
        'configBoolean',
        'languageBoolean',
        'formatterBoolean',
        'legacyConfig',
        'reactHooks',
        'createEslintFile',
        'skipInstall',
      ]);
    });
  });

  describe('full answers to the final config', () => {
    it('answers everything for an extended next + javascript + no formatter setup', async () => {
      const { createESLintConfigFile, output } = await runCli(noFlags, {
        configBoolean: true,
        languageBoolean: false,
        formatterBoolean: false,
        runtime: 'next',
        hasStrictConfig: true,
        strictConfig: ['import', 'react'],
        createEslintFile: true,
        skipInstall: true,
      });

      expect(createESLintConfigFile).toHaveBeenCalledWith({
        config: 'extended',
        language: 'javascript',
        formatter: null,
        runtime: 'next',
        strictConfig: ['import', 'react'],
        legacyConfig: null,
        packageManager: 'pnpm',
        createEslintFile: true,
        skipInstall: true,
      } satisfies ArgsOutput | Record<string, unknown>);
      expect(output()).toContain('next/js/strict/import-react/eslint.config.mjs');
    });

    it('answers everything for a legacy react-hooks + typescript + prettier setup', async () => {
      const { createESLintConfigFile, output } = await runCli(noFlags, {
        configBoolean: false,
        languageBoolean: true,
        formatterBoolean: true,
        legacyConfig: 'react',
        reactHooks: true,
        createEslintFile: true,
        skipInstall: true,
      });

      expect(createESLintConfigFile).toHaveBeenCalledWith({
        config: 'legacy',
        language: 'typescript',
        formatter: 'prettier',
        runtime: null,
        strictConfig: null,
        legacyConfig: 'react-hooks',
        packageManager: 'pnpm',
        createEslintFile: true,
        skipInstall: true,
      });
      expect(output()).toContain('legacy/react-hooks/prettier/ts/default/eslint.config.mjs');
    });
  });

  describe('errors', () => {
    const runWithInstallError = async (error: unknown) => {
      mockProcessExit();
      vi.resetModules();

      const { getArgs } = await import('@/helpers/getArgs');
      const { createESLintConfigFile } = await import('@/helpers/createEslintConfigFile');
      const { installPackages } = await import('@/helpers/installPackages');

      vi.mocked(getArgs).mockResolvedValue({ ...allFlags, skipInstall: false });
      vi.mocked(createESLintConfigFile).mockResolvedValue();
      vi.mocked(installPackages).mockRejectedValue(error);

      return import('@/index');
    };

    it('aborts with exit code 1 when the install fails', async () => {
      const failure = new Error('pnpm install -D eslint', { cause: 'package-failed' });

      await expect(runWithInstallError(failure)).rejects.toThrow(ExitError);

      expect(process.exit).toHaveBeenCalledWith(1);
      expect(logs.map(text)).toContain('Aborting installation.');
      expect(logs.map(text)).toContain('pnpm install -D eslint has failed.');
    });

    it('asks to report a bug for an unexpected error', async () => {
      await expect(runWithInstallError(new Error('boom'))).rejects.toThrow(ExitError);

      expect(logs.map(text)).toContain('Aborting installation.');
      expect(
        logs
          .map(text)
          .some((line) => line.includes('Unexpected error. Please report it as a bug:')),
      ).toBe(true);
    });

    it('prints a thrown value that is not an Error and does not exit', async () => {
      const exitSpy = mockProcessExit();

      await runWithInstallError('plain string failure');

      expect(errors).toContain('plain string failure');
      expect(exitSpy).not.toHaveBeenCalled();
    });

    it('aborts when reading the flags fails', async () => {
      mockProcessExit();
      vi.resetModules();
      const { getArgs } = await import('@/helpers/getArgs');
      vi.mocked(getArgs).mockRejectedValue(new Error('bad flags'));

      await expect(import('@/index')).rejects.toThrow(ExitError);
      expect(logs.map(text)).toContain('Aborting installation.');
    });
  });
});
