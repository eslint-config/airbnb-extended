import { defineConfig } from 'eslint/config';
import { describe, expect, it } from 'vitest';

import { allFiles, defineConfigArray, defineConfigObject, defineConfigPlugin } from '@/utils';

describe('utils/functions', () => {
  it('defineConfigObject returns the same object', () => {
    const config = { name: 'test/object', files: allFiles, rules: { semi: 'error' as const } };

    expect(defineConfigObject(config)).toBe(config);
  });

  it('defineConfigPlugin returns the same object', () => {
    const config = { name: 'test/plugin', files: allFiles, plugins: { test: { rules: {} } } };

    expect(defineConfigPlugin(config)).toBe(config);
  });

  it('defineConfigArray is the defineConfig helper of eslint', () => {
    expect(defineConfigArray).toBe(defineConfig);
  });

  it('defineConfigArray flattens nested arrays and keeps the order', () => {
    const first = { name: 'a', rules: { semi: 'error' as const } };
    const second = { name: 'b', rules: { quotes: 'error' as const } };
    const third = { name: 'c', rules: { indent: 'error' as const } };

    const result = defineConfigArray([first, [second, third]]);

    expect(result.map((config) => config.name)).toStrictEqual(['a', 'b', 'c']);
  });
});
