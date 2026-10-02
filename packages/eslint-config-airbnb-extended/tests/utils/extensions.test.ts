import { describe, expect, it } from 'vitest';

import {
  allFiles,
  jsExtensions,
  jsExtensionsResolver,
  jsExtensionsRule,
  jsExtensionsWithReact,
  jsFiles,
  jsFileWithoutReact,
  tsExtensions,
  tsExtensionsResolver,
  tsExtensionsRule,
  tsExtensionsWithReact,
  tsExtensionsWithReactDTS,
  tsFiles,
  tsFileWithoutReact,
} from '@/utils';

describe('utils/extensions', () => {
  it('lists the javascript extensions', () => {
    expect(jsExtensions).toStrictEqual(['.js', '.cjs', '.mjs']);
    expect(jsExtensionsWithReact).toStrictEqual(['.js', '.cjs', '.mjs', '.jsx']);
    expect(jsExtensionsResolver).toStrictEqual(['.js', '.cjs', '.mjs', '.json']);
  });

  it('lists the typescript extensions', () => {
    expect(tsExtensions).toStrictEqual(['.ts', '.cts', '.mts']);
    expect(tsExtensionsWithReact).toStrictEqual(['.ts', '.cts', '.mts', '.tsx']);
    expect(tsExtensionsWithReactDTS).toStrictEqual(['.ts', '.cts', '.mts', '.tsx', '.d.ts']);
    expect(tsExtensionsResolver).toStrictEqual(['.ts', '.cts', '.mts', '.d.ts']);
  });

  it('builds the import extension rule options without the dot', () => {
    expect(jsExtensionsRule).toStrictEqual({
      js: 'never',
      cjs: 'never',
      mjs: 'never',
      jsx: 'never',
    });
    expect(tsExtensionsRule).toStrictEqual({
      ts: 'never',
      cts: 'never',
      mts: 'never',
      tsx: 'never',
    });
  });

  it('builds the file globs', () => {
    expect(jsFileWithoutReact).toStrictEqual(['**/*.js', '**/*.cjs', '**/*.mjs']);
    expect(jsFiles).toStrictEqual(['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx']);
    expect(tsFileWithoutReact).toStrictEqual(['**/*.ts', '**/*.cts', '**/*.mts', '**/*.d.ts']);
    expect(tsFiles).toStrictEqual(['**/*.ts', '**/*.cts', '**/*.mts', '**/*.tsx', '**/*.d.ts']);
  });

  it('allFiles is every javascript and typescript glob', () => {
    expect(allFiles).toStrictEqual([...jsFiles, ...tsFiles]);
    expect(allFiles).toHaveLength(9);
  });

  it('has no duplicated glob', () => {
    expect(new Set(allFiles).size).toBe(allFiles.length);
  });

  it('only contains extensions that start with a dot', () => {
    for (const extension of [
      ...jsExtensionsWithReact,
      ...tsExtensionsWithReactDTS,
      ...jsExtensionsResolver,
    ]) {
      expect(extension.startsWith('.')).toBe(true);
    }
  });
});
