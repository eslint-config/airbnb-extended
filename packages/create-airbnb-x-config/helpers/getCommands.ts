import { formatters, packageManagers } from '@/constants';

import type { GetCommands } from '@/helpers/@types/getCommands.types';

const getCommands: GetCommands = (args) => {
  const { formatter, packageManager } = args;

  const pmInstallationCommand = {
    [packageManagers.NPM]: 'install',
    [packageManagers.YARN]: 'add',
    [packageManagers.PNPM]: 'install',
    [packageManagers.BUN]: 'add',
  };

  const commands = [
    packageManager,
    pmInstallationCommand[packageManager],
    '-D',
    'eslint',
    '@eslint/compat',
    '@eslint/js',
    'eslint-config-airbnb-extended',
  ];

  if (formatter === formatters.PRETTIER) {
    commands.push('prettier', 'eslint-plugin-prettier', 'eslint-config-prettier');
  }

  return commands;
};

export default getCommands;
