#!/usr/bin/env node

import pc from 'picocolors';
import prompts from 'prompts';

import {
  configs,
  defaults,
  eslintConfigName,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
  strictConfigs,
} from '@/constants';
import createESLintConfigFile from '@/helpers/createEslintConfigFile';
import getArgs from '@/helpers/getArgs';
import getCommands from '@/helpers/getCommands';
import getConfigUrl from '@/helpers/getConfigUrl';
import installPackages from '@/helpers/installPackages';
import { exit, handleSigTerm, onCancel, onPromptState } from '@/utils';

import type { ArgsOutput } from '@/helpers/@types/getArgs.types';

process.on('SIGINT', handleSigTerm);
process.on('SIGTERM', handleSigTerm);

const run = async () => {
  let args = await getArgs();

  if (args.config === null) {
    const { configBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'configBoolean',
        message: 'Config?',
        initial: defaults.config === configs.EXTENDED,
        active: 'Extended',
        inactive: 'Legacy',
        onState: onPromptState,
      },
      {
        onCancel,
      },
    );

    const config = configBoolean ? configs.EXTENDED : configs.LEGACY;
    args = {
      ...args,
      config,
      ...(config === configs.EXTENDED
        ? {
            legacyConfig: null,
          }
        : {
            runtime: null,
          }),
    };
  }

  if (args.language === null) {
    const { languageBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'languageBoolean',
        message: `Are you using ${pc.blue('typescript')}?`,
        initial: defaults.language === languages.TYPESCRIPT,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      {
        onCancel,
      },
    );

    const language = languageBoolean ? languages.TYPESCRIPT : languages.JAVASCRIPT;
    args = { ...args, language };
  }

  if (args.formatter === null) {
    const { formatterBoolean } = await prompts(
      {
        type: 'toggle',
        name: 'formatterBoolean',
        message: `Are you using ${pc.cyan('prettier')}?`,
        initial: defaults.formatter === formatters.PRETTIER,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      {
        onCancel,
      },
    );

    const formatter = formatterBoolean ? formatters.PRETTIER : null;
    args = { ...args, formatter };
  }

  if (args.config === configs.EXTENDED) {
    if (!args.runtime) {
      const { runtime } = await prompts(
        {
          type: 'select',
          name: 'runtime',
          message: 'Are you using?',
          choices: [
            {
              title: 'React/React Router/Remix',
              description: pc.cyanBright(
                'You are using React.js library or Remix ( React Router 7 ) framework',
              ),
              value: runtimes.REACT,
            },
            {
              title: 'Next',
              description: pc.blackBright('You are using Next.js framework'),
              value: runtimes.NEXT,
            },
            {
              title: 'Node',
              description: pc.greenBright('You are using Node or any other frameworks of it'),
              value: runtimes.NODE,
            },
          ],
          onState: onPromptState,
        },
        {
          onCancel,
        },
      );

      args = { ...args, runtime };
    }

    if (!args.strictConfig) {
      const { hasStrictConfig } = await prompts(
        {
          type: 'toggle',
          name: 'hasStrictConfig',
          message: `Do you want to add ${pc.cyan('strict')} configs?`,
          initial: defaults.strictConfig,
          active: 'Yes',
          inactive: 'No',
          onState: onPromptState,
        },
        {
          onCancel,
        },
      );

      if (hasStrictConfig) {
        const { strictConfig } = await prompts(
          {
            type: 'multiselect',
            name: 'strictConfig',
            message: 'Select Strict Configs:',
            min: 1,
            choices: [
              {
                title: 'Import',
                description: pc.yellowBright('Strict Import config'),
                value: strictConfigs.IMPORT,
              },
              ...(args.runtime &&
              ([runtimes.REACT, runtimes.NEXT] as string[]).includes(args.runtime)
                ? [
                    {
                      title: 'React',
                      description: pc.cyanBright('Strict React config'),
                      value: strictConfigs.REACT,
                    },
                  ]
                : []),
              ...(args.language === languages.TYPESCRIPT
                ? [
                    {
                      title: 'TypeScript',
                      description: pc.blueBright('Strict TypeScript config'),
                      value: strictConfigs.TYPESCRIPT,
                    },
                  ]
                : []),
            ],
            onState: onPromptState,
          },
          {
            onCancel,
          },
        );

        args = { ...args, strictConfig };
      } else {
        args = { ...args, strictConfig: null };
      }
    }
  }

  if (args.config === configs.LEGACY) {
    if (!args.legacyConfig) {
      const { legacyConfig } = await prompts(
        {
          type: 'select',
          name: 'legacyConfig',
          message: 'Are you using?',
          choices: [
            {
              title: 'Base Config',
              description: pc.greenBright('eslint-config-airbnb-base'),
              value: legacyConfigs.BASE,
            },
            {
              title: 'React Config',
              description: pc.cyanBright('eslint-config-airbnb'),
              value: legacyConfigs.REACT,
            },
          ],
          onState: onPromptState,
        },
        {
          onCancel,
        },
      );

      args = { ...args, legacyConfig };
    }

    if (args.legacyConfig === legacyConfigs.REACT) {
      const { reactHooks } = await prompts(
        {
          type: 'toggle',
          name: 'reactHooks',
          message: 'Are you using hooks?',
          initial: defaults.legacyReactHooks,
          active: 'Yes',
          inactive: 'No',
          onState: onPromptState,
        },
        {
          onCancel,
        },
      );

      const legacyConfig = reactHooks ? legacyConfigs.REACT_HOOKS : args.legacyConfig;
      args = { ...args, legacyConfig };
    }
  }

  if (args.createEslintFile === null) {
    const { createEslintFile } = await prompts(
      {
        type: 'toggle',
        name: 'createEslintFile',
        message: `Should I create an ${pc.blue(eslintConfigName)} file for you?`,
        initial: defaults.createEslintFile,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      {
        onCancel,
      },
    );

    args = { ...args, createEslintFile };
  }

  if (args.skipInstall === null) {
    const { skipInstall } = await prompts(
      {
        type: 'toggle',
        name: 'skipInstall',
        message: `Do you want to skip the package installation?`,
        initial: defaults.skipInstall,
        active: 'Yes',
        inactive: 'No',
        onState: onPromptState,
      },
      {
        onCancel,
      },
    );

    args = { ...args, skipInstall };
  }

  const newArgs = args as ArgsOutput;
  const commands = getCommands(newArgs);
  const command = commands.join(' ');
  console.log();

  if (args.createEslintFile) await createESLintConfigFile(newArgs);

  if (args.skipInstall) {
    console.log(
      `${pc.yellowBright('No Worries')}, you can install the packages yourself using your ${pc.blue('favourite')} package manager (${newArgs.packageManager}, maybe? 🤔)`,
    );
    console.log();
    console.log(pc.cyan('Command:'));
    console.log(pc.blue(command));
  } else {
    console.log(
      `${pc.blue('Installing')} packages using ${pc.cyanBright(newArgs.packageManager)}, please wait...`,
    );

    await installPackages(newArgs);
    console.log();
    console.log(pc.yellowBright('Installation Completed'));
    console.log();
    console.log(pc.cyan('Executed Command:'));
    console.log(pc.blue(command));
  }

  console.log();
  console.log(pc.cyan(args.createEslintFile ? 'Created Config:' : 'Config:'));
  console.log(getConfigUrl(newArgs)?.url);

  console.log();
};

try {
  await run();
} catch (error) {
  if (error instanceof Error) {
    exit(error);
  } else {
    console.error(error);
  }
}
