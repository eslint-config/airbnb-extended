import fs from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

import * as extended from '@/index';
import * as legacy from '@/legacy';
import { packageRoot } from '@/tests/fixtures/ruleGroups';

interface PackageJson {
  name: string;
  version: string;
  type: string;
  types: string;
  exports: Record<string, string>;
  engines: { node: string };
  dependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  peerDependenciesMeta: Record<string, { optional: boolean }>;
}

const readJson = (file: string): PackageJson =>
  JSON.parse(fs.readFileSync(file, 'utf8')) as PackageJson;

const pkg = readJson(path.join(packageRoot, 'package.json'));
const cliPkg = readJson(path.join(packageRoot, '../create-airbnb-x-config/package.json'));

describe('package.json', () => {
  it('is an ESM package with two entries', () => {
    expect(pkg.type).toBe('module');
    expect(pkg.exports).toStrictEqual({
      '.': './dist/index.mjs',
      './legacy': './dist/legacy.mjs',
      './package.json': './package.json',
    });
    expect(pkg.types).toBe('./dist/index.d.mts');
  });

  it('builds the two entries that it exports', () => {
    const tsdown = fs.readFileSync(path.join(packageRoot, 'tsdown.config.ts'), 'utf8');

    expect(tsdown).toContain("entry: ['index.ts', 'legacy.ts']");
  });

  it('needs eslint 9 as a required peer dependency', () => {
    expect(pkg.peerDependencies.eslint).toBe('^9.0.0');
    expect(pkg.peerDependenciesMeta.eslint.optional).toBe(false);
  });

  it('is released with the same version as the cli', () => {
    expect(pkg.version).toBe(cliPkg.version);
  });

  it('keeps the node range of the cli', () => {
    expect(pkg.engines.node).toBe(cliPkg.engines.node);
  });

  it('depends on every plugin that the config registers', () => {
    for (const dependency of [
      '@next/eslint-plugin-next',
      '@stylistic/eslint-plugin',
      'eslint-plugin-import-x',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-n',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'typescript-eslint',
      'eslint-import-resolver-typescript',
      'get-tsconfig',
      'globals',
      'confusing-browser-globals',
    ]) {
      expect(pkg.dependencies, dependency).toHaveProperty(dependency);
    }
  });

  it('does not list eslint itself as a dependency', () => {
    expect(pkg.dependencies).not.toHaveProperty('eslint');
  });
});

const distDir = path.join(packageRoot, 'dist');
const hasDist = fs.existsSync(path.join(distDir, 'index.mjs'));

// Only runs after `pnpm build`, so the suite also works on a fresh clone.
describe.skipIf(!hasDist)('built package (dist)', () => {
  it('has every file that package.json points to', () => {
    for (const file of [pkg.exports['.'], pkg.exports['./legacy'], pkg.types]) {
      expect(fs.existsSync(path.join(packageRoot, file)), file).toBe(true);
    }
    expect(fs.existsSync(path.join(distDir, 'legacy.d.mts'))).toBe(true);
  });

  it('exports the same names as the source', async () => {
    const builtExtended = (await import(path.join(distDir, 'index.mjs'))) as Record<
      string,
      unknown
    >;
    const builtLegacy = (await import(path.join(distDir, 'legacy.mjs'))) as Record<string, unknown>;

    expect(Object.keys(builtExtended).toSorted()).toStrictEqual(Object.keys(extended).toSorted());
    expect(Object.keys(builtLegacy).toSorted()).toStrictEqual(Object.keys(legacy).toSorted());
  });

  it('has the same configs as the source', async () => {
    const builtExtended = (await import(path.join(distDir, 'index.mjs'))) as typeof extended;
    const names = (list: readonly { name?: string }[]) => list.map((config) => config.name);

    expect(names(builtExtended.configs.base.all)).toStrictEqual(names(extended.configs.base.all));
    expect(names(builtExtended.configs.react.all)).toStrictEqual(names(extended.configs.react.all));
    expect(names(builtExtended.configs.next.all)).toStrictEqual(names(extended.configs.next.all));
    expect(names(builtExtended.configs.node.recommended)).toStrictEqual(
      names(extended.configs.node.recommended),
    );
  });

  it('has the same rules as the source', async () => {
    const builtExtended = (await import(path.join(distDir, 'index.mjs'))) as typeof extended;

    expect(builtExtended.rules.base.bestPractices.rules).toStrictEqual(
      extended.rules.base.bestPractices.rules,
    );
    expect(builtExtended.rules.typescript.typescriptEslint.rules).toStrictEqual(
      extended.rules.typescript.typescriptEslint.rules,
    );
  });
});
