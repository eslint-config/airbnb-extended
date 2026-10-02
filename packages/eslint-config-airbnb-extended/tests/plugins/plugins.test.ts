import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importXPlugin from 'eslint-plugin-import-x';
import reactJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { parser, plugin as typescriptEslintPlugin } from 'typescript-eslint';
import { describe, expect, it } from 'vitest';

import { plugins } from '@/plugins';
import { allFiles } from '@/utils';

describe('plugins', () => {
  it('exposes the plugin configs in a fixed order', () => {
    expect(Object.keys(plugins)).toStrictEqual([
      'stylistic',
      'importX',
      'node',
      'react',
      'reactA11y',
      'reactHooks',
      'next',
      'typescriptEslint',
    ]);
  });

  it.each([
    ['stylistic', 'airbnb/config/plugin/stylistic', '@stylistic', stylisticPlugin],
    ['importX', 'airbnb/config/plugin/import-x', 'import-x', importXPlugin],
    ['node', 'airbnb/config/plugin/node', 'n', nodePlugin],
    ['react', 'airbnb/config/plugin/react', 'react', reactPlugin],
    ['reactA11y', 'airbnb/config/plugin/react-a11y', 'jsx-a11y', reactJsxA11yPlugin],
    ['reactHooks', 'airbnb/config/plugin/react-hooks', 'react-hooks', reactHooksPlugin],
    ['next', 'airbnb/config/plugin/next', '@next/next', nextPlugin],
    [
      'typescriptEslint',
      'airbnb/config/plugin/typescript-eslint',
      '@typescript-eslint',
      typescriptEslintPlugin,
    ],
  ] as const)(
    '%s registers the installed plugin under its rule prefix',
    (key, name, prefix, plugin) => {
      const config = plugins[key];

      expect(config.name).toBe(name);
      expect(config.files).toStrictEqual(allFiles);
      expect(Object.keys(config.plugins ?? {})).toStrictEqual([prefix]);
      expect(config.plugins?.[prefix]).toBe(plugin);
    },
  );

  it('only the typescript plugin sets a parser', () => {
    expect(plugins.typescriptEslint.languageOptions?.parser).toBe(parser);

    for (const [key, config] of Object.entries(plugins)) {
      if (key !== 'typescriptEslint') expect(config).not.toHaveProperty('languageOptions');
    }
  });

  it('has unique names that start with airbnb/config/plugin/', () => {
    const names = Object.values(plugins).map((config) => config.name);

    expect(new Set(names).size).toBe(names.length);
    for (const name of names) expect(name).toMatch(/^airbnb\/config\/plugin\/[a-z0-9-]+$/);
  });

  it('every registered plugin ships rules', () => {
    for (const config of Object.values(plugins)) {
      for (const plugin of Object.values(config.plugins ?? {})) {
        expect(Object.keys((plugin as { rules?: object }).rules ?? {}).length).toBeGreaterThan(0);
      }
    }
  });
});
