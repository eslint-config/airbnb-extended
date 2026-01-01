import { Command, Option } from 'commander';

import {
  configs,
  eslintConfigName,
  formatters,
  languages,
  legacyConfigs,
  packageManagers,
  runtimes,
  strictConfigs,
  stringBooleans,
} from '@/constants';
import { name, version } from '@/package.json';

import type { StrictConfigType } from '@/constants/@types/index.types';
import type {
  GetProgramOptions,
  GetProgramOptionsOutput,
  PartialProgramOptions,
} from '@/helpers/@types/getProgramOptions.types';

const getProgramOptions: GetProgramOptions = () => {
  /**
   * Program Command
   * @example: pnpm cli:start --config extended --lang javascript --formatter prettier --runtime react --strict import react --pm pnpm --create-eslint-file --skip-install
   */
  const program = new Command()
    .name(name)
    .version(version, '-v, --version', 'Output the current version of create-airbnb-x-config.')
    .helpOption('-h, --help', 'Display this help message.')

    // Config
    .addOption(
      new Option('--config <config>', 'Explicitly tell the CLI to use selected config.').choices(
        Object.values(configs),
      ),
    )

    // Language
    .addOption(
      new Option(
        '--lang, --language <lang>',
        'Generate configuration for a selected language project.',
      ).choices(Object.values(languages)),
    )

    // Formatters
    .addOption(
      new Option(
        '--formatter <formatter>',
        'Include selected formatter for specific linting rules.',
      ).choices(Object.values(formatters)),
    )

    // Runtimes
    .addOption(
      new Option('--runtime <runtime>', 'Include selected runtime for specific linting rules.')
        .choices(Object.values(runtimes))
        .conflicts(['legacy-config']),
    )

    // Strict Config
    .addOption(
      new Option(
        '--strict, --strict-config <config...>',
        'Include the selected strict ESLint config.',
      )
        .choices(Object.values(strictConfigs))
        .argParser<string[]>((value, previous) => [...new Set([...(previous || []), value])])
        .conflicts(['legacy-config']),
    )

    // Legacy Config
    .addOption(
      new Option('--legacy, --legacy-config <config>', 'Include the selected legacy ESLint config.')
        .choices(Object.values(legacyConfigs))
        .conflicts(['runtime', 'strict-config']),
    )

    // Package Manager
    .addOption(
      new Option(
        '--pm, --package-manager <pm>',
        'Explicitly tell the CLI to use selected package manager.',
      ).choices(Object.values(packageManagers)),
    )

    // Create Eslint File
    .addOption(
      new Option(
        '--create-eslint-file [bool]',
        `Explicitly tell the CLI to create ${eslintConfigName} file.`,
      ).choices(Object.values(stringBooleans)),
    )

    // Skip Install
    .addOption(
      new Option(
        '--skip-install [bool]',
        'Explicitly tell the CLI to skip installing packages.',
      ).choices(Object.values(stringBooleans)),
    );

  // Core options
  const opts = program.parse().opts<PartialProgramOptions>();

  // Program options
  const programOptions = {
    ...opts,
    ...(opts.strictConfig === undefined
      ? null
      : {
          strictConfig: opts.strictConfig.reduce<StrictConfigType[]>((acc, val) => {
            const { language, runtime } = opts;

            const isImportConfig = val === strictConfigs.IMPORT;
            const isReactConfig =
              runtime &&
              ([runtimes.REACT, runtimes.NEXT] as string[]).includes(runtime) &&
              val === strictConfigs.REACT;

            const isTypeScriptConfig =
              language === languages.TYPESCRIPT && val === strictConfigs.TYPESCRIPT;

            if (isImportConfig || isReactConfig || isTypeScriptConfig) acc.push(val);

            return acc;
          }, []),
        }),
    ...(opts.createEslintFile === undefined
      ? null
      : {
          createEslintFile:
            opts.createEslintFile === true ? stringBooleans.TRUE : opts.createEslintFile,
        }),
    ...(opts.skipInstall === undefined
      ? null
      : {
          skipInstall: opts.skipInstall === true ? stringBooleans.TRUE : opts.skipInstall,
        }),
  } as GetProgramOptionsOutput;

  return programOptions;
};

export default getProgramOptions;
