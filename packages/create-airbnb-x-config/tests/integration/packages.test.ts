import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { formatters, packageManagers } from '@/constants/common';
import { getCommands } from '@/helpers/getCommands';
import { name, version } from '@/package.json';

/**
 * Keeps the CLI in sync with the config package and the generated templates:
 * - the packages that the CLI installs must be the packages that a template imports
 * - the CLI and the config are released with the same version
 */

const repoRoot = path.resolve(import.meta.dirname, '../../../..');
const templatesRoot = path.join(repoRoot, 'apps/build-templates/templates');
interface PackageJson {
  name: string;
  version: string;
  peerDependencies: Record<string, string>;
}

const configPkg = JSON.parse(
  fs.readFileSync(
    path.join(repoRoot, 'packages/eslint-config-airbnb-extended/package.json'),
    'utf8',
  ),
) as PackageJson;

const listTemplates = (dir: string): string[] =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? listTemplates(fullPath) : [fullPath];
  });

/** `eslint@^9` -> `eslint`, `@eslint/js@^9` -> `@eslint/js` */
const toPackageName = (specifier: string) => specifier.replace(/(?<=.)@.*$/, '');

/** `eslint/config` -> `eslint`, `@eslint/compat` -> `@eslint/compat`, `node:path` -> `node:path` */
const toImportedPackage = (specifier: string) => {
  const parts = specifier.split('/');
  return specifier.startsWith('@') ? parts.slice(0, 2).join('/') : (parts[0] ?? specifier);
};

const installed = (formatter: string) =>
  new Set(
    getCommands({ packageManager: packageManagers.PNPM, formatter: formatter as 'none' })
      .slice(3)
      .map(toPackageName),
  );

describe('integration/packages', () => {
  it('is named like the folder and the bin', () => {
    expect(name).toBe('create-airbnb-x-config');
  });

  it('has the same version as eslint-config-airbnb-extended', () => {
    expect(version).toBe(configPkg.version);
  });

  it('installs eslint in the major version that the config supports', () => {
    expect(configPkg.peerDependencies.eslint.startsWith('^9')).toBe(true);
    expect(getCommands({ packageManager: 'npm', formatter: 'none' })).toContain('eslint@^9');
    expect(getCommands({ packageManager: 'npm', formatter: 'none' })).toContain('@eslint/js@^9');
  });

  it('installs the config package by its published name', () => {
    expect(getCommands({ packageManager: 'npm', formatter: 'none' })).toContain(configPkg.name);
  });

  describe.each(listTemplates(templatesRoot).filter((file) => file.endsWith('eslint.config.mjs')))(
    '%s',
    (file) => {
      const relative = path.relative(templatesRoot, file).split(path.sep).join('/');
      const source = fs.readFileSync(file, 'utf8');
      const imports = [...source.matchAll(/^import[\s\S]*?from '([^']+)';$/gm)].map((match) =>
        toImportedPackage(match[1] ?? ''),
      );
      const usesPrettier = relative.split('/').includes('prettier');

      it('only imports packages that the CLI installs (or node built-ins)', () => {
        const available = installed(usesPrettier ? formatters.PRETTIER : formatters.NONE);
        const missing = imports.filter((item) => !item.startsWith('node:') && !available.has(item));

        expect(missing).toStrictEqual([]);
      });

      it('imports the prettier packages exactly when the path has the prettier folder', () => {
        expect(imports.includes('eslint-plugin-prettier')).toBe(usesPrettier);
        expect(imports.includes('eslint-config-prettier')).toBe(usesPrettier);
      });
    },
  );
});
