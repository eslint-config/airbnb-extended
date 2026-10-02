import { describe, expect, it } from 'vitest';

import { formatters, packageManagers } from '@/constants/common';
import { getCommands } from '@/helpers/getCommands';

import type { PackageManagerType } from '@/constants/common';

const baseCommands = [
  '-D',
  'eslint@^9',
  '@eslint/compat',
  '@eslint/js@^9',
  'eslint-config-airbnb-extended',
];

const prettierPackages = ['prettier', 'eslint-plugin-prettier', 'eslint-config-prettier'];

const installCommand: Record<PackageManagerType, string> = {
  npm: 'install',
  yarn: 'add',
  pnpm: 'install',
  bun: 'add',
};

describe('helpers/getCommands', () => {
  describe.each(Object.values(packageManagers))('package manager: %s', (packageManager) => {
    it('uses the right install verb and base packages without a formatter', () => {
      expect(getCommands({ packageManager, formatter: formatters.NONE })).toStrictEqual([
        packageManager,
        installCommand[packageManager],
        ...baseCommands,
      ]);
    });

    it('adds the prettier packages when prettier is selected', () => {
      expect(getCommands({ packageManager, formatter: formatters.PRETTIER })).toStrictEqual([
        packageManager,
        installCommand[packageManager],
        ...baseCommands,
        ...prettierPackages,
      ]);
    });
  });

  it('installs everything as dev dependency', () => {
    const commands = getCommands({
      packageManager: packageManagers.NPM,
      formatter: formatters.NONE,
    });

    expect(commands[2]).toBe('-D');
  });

  it('pins eslint and @eslint/js to the 9.x range', () => {
    const commands = getCommands({
      packageManager: packageManagers.PNPM,
      formatter: formatters.NONE,
    });

    expect(commands).toContain('eslint@^9');
    expect(commands).toContain('@eslint/js@^9');
  });

  it('does not mutate between calls', () => {
    const first = getCommands({
      packageManager: packageManagers.NPM,
      formatter: formatters.PRETTIER,
    });
    const second = getCommands({ packageManager: packageManagers.NPM, formatter: formatters.NONE });

    expect(first).toHaveLength(baseCommands.length + 2 + prettierPackages.length);
    expect(second).toHaveLength(baseCommands.length + 2);
  });
});
