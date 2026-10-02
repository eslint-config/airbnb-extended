import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createAutoTypeScriptImportResolver } from '@/helpers/createAutoTypeScriptImportResolver';

import type { createTypeScriptImportResolver as createResolver } from 'eslint-import-resolver-typescript';

type CreateResolver = typeof createResolver;

const real = vi.hoisted(() => ({ create: undefined as unknown as CreateResolver }));
const { createTypeScriptImportResolver } = vi.hoisted(() => ({
  createTypeScriptImportResolver: vi.fn(),
}));

// Wraps the real resolver factory, so resolving is real and calls can be counted.
vi.mock('eslint-import-resolver-typescript', async (importOriginal) => {
  const original = await importOriginal<{ createTypeScriptImportResolver: CreateResolver }>();
  real.create = original.createTypeScriptImportResolver;

  return { ...original, createTypeScriptImportResolver };
});

let root: string;

const write = (file: string, content = '') => {
  const fullPath = path.join(root, file);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
  return fullPath;
};

const tsconfig = (paths: Record<string, string[]>) =>
  JSON.stringify({ compilerOptions: { baseUrl: '.', paths } });

beforeAll(() => {
  root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'airbnb-x-resolver-')));

  write('app-a/tsconfig.json', tsconfig({ '@a/*': ['./src/*'] }));
  write('app-a/index.ts', 'export {};');
  write('app-a/other.ts', 'export {};');
  write('app-a/src/foo.ts', 'export const foo = 1;');

  write('app-b/tsconfig.json', tsconfig({ '@b/*': ['./lib/*'] }));
  write('app-b/index.ts', 'export {};');
  write('app-b/lib/bar.ts', 'export const bar = 1;');

  write('no-config/index.ts', 'export {};');
  write('no-config/local.ts', 'export {};');
});

afterAll(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

beforeEach(() => {
  createTypeScriptImportResolver.mockImplementation(real.create);
});

describe('helpers/createAutoTypeScriptImportResolver', () => {
  describe('with the project option', () => {
    it('returns the plain typescript resolver and passes alwaysTryTypes', () => {
      const resolver = createAutoTypeScriptImportResolver({ project: './tsconfig.json' });

      expect(createTypeScriptImportResolver).toHaveBeenCalledTimes(1);
      expect(createTypeScriptImportResolver).toHaveBeenCalledWith({
        alwaysTryTypes: true,
        project: './tsconfig.json',
      });
      expect(resolver.name).not.toBe('eslint-import-resolver-typescript/auto');
    });

    it('lets the user turn alwaysTryTypes off', () => {
      createAutoTypeScriptImportResolver({ project: './tsconfig.json', alwaysTryTypes: false });

      expect(createTypeScriptImportResolver).toHaveBeenCalledWith({
        alwaysTryTypes: false,
        project: './tsconfig.json',
      });
    });
  });

  describe('without the project option', () => {
    it('returns an auto resolver and creates nothing until a file is resolved', () => {
      const resolver = createAutoTypeScriptImportResolver();

      expect(resolver).toMatchObject({
        interfaceVersion: 3,
        name: 'eslint-import-resolver-typescript/auto',
      });
      expect(typeof resolver.resolve).toBe('function');
      expect(createTypeScriptImportResolver).not.toHaveBeenCalled();
    });

    it('uses the closest tsconfig of the importing file', () => {
      const resolver = createAutoTypeScriptImportResolver();

      expect(resolver.resolve('@a/foo', path.join(root, 'app-a/index.ts'))).toMatchObject({
        found: true,
        path: path.join(root, 'app-a/src/foo.ts'),
      });
      expect(resolver.resolve('@b/bar', path.join(root, 'app-b/index.ts'))).toMatchObject({
        found: true,
        path: path.join(root, 'app-b/lib/bar.ts'),
      });
    });

    it('does not mix the paths of different tsconfig files', () => {
      const resolver = createAutoTypeScriptImportResolver();

      expect(resolver.resolve('@b/bar', path.join(root, 'app-a/index.ts'))).toMatchObject({
        found: false,
      });
      expect(resolver.resolve('@a/foo', path.join(root, 'app-b/index.ts'))).toMatchObject({
        found: false,
      });
    });

    it('creates one resolver per tsconfig and reuses it', () => {
      const resolver = createAutoTypeScriptImportResolver();

      resolver.resolve('@a/foo', path.join(root, 'app-a/index.ts'));
      resolver.resolve('@a/foo', path.join(root, 'app-a/other.ts'));
      expect(createTypeScriptImportResolver).toHaveBeenCalledTimes(1);
      expect(createTypeScriptImportResolver).toHaveBeenLastCalledWith({
        alwaysTryTypes: true,
        project: path.join(root, 'app-a/tsconfig.json'),
      });

      resolver.resolve('@b/bar', path.join(root, 'app-b/index.ts'));
      expect(createTypeScriptImportResolver).toHaveBeenCalledTimes(2);
    });

    it('passes the other options to the created resolvers', () => {
      const resolver = createAutoTypeScriptImportResolver({
        alwaysTryTypes: false,
        conditionNames: ['import'],
      });

      resolver.resolve('@a/foo', path.join(root, 'app-a/index.ts'));

      expect(createTypeScriptImportResolver).toHaveBeenCalledWith({
        alwaysTryTypes: false,
        conditionNames: ['import'],
        project: path.join(root, 'app-a/tsconfig.json'),
      });
    });

    it('still resolves relative imports when there is no tsconfig', () => {
      const resolver = createAutoTypeScriptImportResolver();
      // The temp folder has no tsconfig above it, so the resolver is created without `project`.
      const result = resolver.resolve('./local', path.join(root, 'no-config/index.ts'));

      expect(result).toMatchObject({ found: true, path: path.join(root, 'no-config/local.ts') });
      expect(createTypeScriptImportResolver).toHaveBeenCalledWith({ alwaysTryTypes: true });
    });

    it('keeps the cache per resolver instance', () => {
      const first = createAutoTypeScriptImportResolver();
      const second = createAutoTypeScriptImportResolver();

      first.resolve('@a/foo', path.join(root, 'app-a/index.ts'));
      second.resolve('@a/foo', path.join(root, 'app-a/index.ts'));

      expect(createTypeScriptImportResolver).toHaveBeenCalledTimes(2);
    });
  });
});
