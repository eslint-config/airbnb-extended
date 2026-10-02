import nodePlugin from 'eslint-plugin-n';
import { configs as typescriptEslintConfigs } from 'typescript-eslint';
import { describe, expect, it } from 'vitest';

import { extensions } from '@/extensions';
import { getImportSettings } from '@/helpers/getImportSettings';
import { styleInternalRules } from '@/rules/style';
import { serialize } from '@/tests/fixtures/serialize';
import { allFiles, jsFiles, jsFileWithoutReact, tsFiles, tsFileWithoutReact } from '@/utils';

import type { Linter } from 'eslint';

type Config = Linter.Config;

const byName = (configs: readonly Config[], name: string): Config => {
  const found = configs.find((config) => config.name === name);
  if (!found) throw new Error(`Config "${name}" not found`);
  return found;
};

describe('extensions', () => {
  it('exposes the extensions of every target', () => {
    expect(Object.keys(extensions)).toStrictEqual(['base', 'react', 'next', 'node']);
    expect(Object.keys(extensions.base)).toStrictEqual(['recommended', 'typescript']);
    expect(Object.keys(extensions.react)).toStrictEqual(['recommended', 'typescript']);
    expect(Object.keys(extensions.next)).toStrictEqual(['recommended']);
    expect(Object.keys(extensions.node)).toStrictEqual(['recommended']);
  });

  const all = [
    ['base/recommended', extensions.base.recommended],
    ['base/typescript', extensions.base.typescript],
    ['react/recommended', extensions.react.recommended],
    ['react/typescript', extensions.react.typescript],
    ['next/recommended', extensions.next.recommended],
    ['node/recommended', extensions.node.recommended],
  ] as const;

  describe.each(all)('%s', (title, configs) => {
    it('matches the snapshot', async () => {
      await expect(JSON.stringify(serialize(configs), null, 2)).toMatchFileSnapshot(
        `./__snapshots__/${title.replace('/', '.')}.json`,
      );
    });

    it('gives every config a unique airbnb/config/ name and a files list', () => {
      const names = configs.map((config) => config.name);

      expect(new Set(names).size).toBe(names.length);
      for (const config of configs) {
        expect(config.name).toMatch(/^airbnb\/config\//);
        expect(config.files?.length).toBeGreaterThan(0);
      }
    });
  });

  describe('base/recommended', () => {
    const configs = extensions.base.recommended;

    it('keeps the config order', () => {
      expect(configs.map((config) => config.name)).toStrictEqual([
        'airbnb/config/base-configurations',
        'airbnb/config/base-settings-extensions-configurations',
        'airbnb/config/base-disable-legacy-stylistic-js-config',
      ]);
    });

    it('sets ecmaVersion 2018 as module and the import-x ignore list', () => {
      const config = byName(configs, 'airbnb/config/base-configurations');

      expect(config.files).toStrictEqual(allFiles);
      expect(config.languageOptions?.parserOptions).toStrictEqual({
        ecmaVersion: 2018,
        sourceType: 'module',
      });
      expect(config.settings).toStrictEqual({
        'import-x/core-modules': [],
        'import-x/ignore': ['node_modules', String.raw`\.(coffee|scss|css|less|hbs|svg|json)$`],
      });
    });

    it('configures the import settings for plain javascript files', () => {
      const config = byName(configs, 'airbnb/config/base-settings-extensions-configurations');

      expect(config.files).toStrictEqual(jsFileWithoutReact);
      expect(serialize(config.settings)).toStrictEqual(
        serialize(getImportSettings({ javascript: true, typescript: false, jsx: false })),
      );
    });

    it('turns off the legacy stylistic rules of core ESLint', () => {
      const config = byName(configs, 'airbnb/config/base-disable-legacy-stylistic-js-config');

      expect(config.files).toStrictEqual(allFiles);
      expect(Object.keys(config.rules ?? {}).length).toBeGreaterThan(0);
      expect(Object.keys(config.rules ?? {}).every((id) => !id.includes('/'))).toBe(true);
    });
  });

  describe('base/typescript', () => {
    const configs = extensions.base.typescript;

    it('keeps the config order', () => {
      expect(configs.map((config) => config.name)).toStrictEqual([
        'airbnb/config/base-typescript-settings-extensions-configurations',
        'airbnb/config/base-typescript-disable-legacy-stylistic-ts-config',
        'airbnb/config/base-typescript-disable-type-checked',
      ]);
    });

    it('configures the import settings for typescript files', () => {
      const config = byName(
        configs,
        'airbnb/config/base-typescript-settings-extensions-configurations',
      );

      expect(config.files).toStrictEqual(tsFileWithoutReact);
      expect(serialize(config.settings)).toStrictEqual(
        serialize(getImportSettings({ javascript: false, typescript: true, jsx: false })),
      );
    });

    it('turns off the legacy stylistic rules of typescript-eslint', () => {
      const config = byName(
        configs,
        'airbnb/config/base-typescript-disable-legacy-stylistic-ts-config',
      );

      expect(config.files).toStrictEqual(tsFiles);
      expect(Object.keys(config.rules ?? {}).length).toBeGreaterThan(0);
      expect(
        Object.keys(config.rules ?? {}).every((id) => id.startsWith('@typescript-eslint/')),
      ).toBe(true);
    });

    it('turns off the type checked rules for javascript files', () => {
      const config = byName(configs, 'airbnb/config/base-typescript-disable-type-checked');

      expect(config.files).toStrictEqual(jsFiles);
      expect(config.rules).toStrictEqual(typescriptEslintConfigs.disableTypeChecked.rules);
      expect(config.languageOptions).toStrictEqual(
        (typescriptEslintConfigs.disableTypeChecked as Linter.Config).languageOptions,
      );
    });
  });

  describe('react/recommended', () => {
    const configs = extensions.react.recommended;

    it('keeps the config order', () => {
      expect(configs.map((config) => config.name)).toStrictEqual([
        'airbnb/config/react-settings-extensions-configurations',
        'airbnb/config/react-configurations',
        'airbnb/config/react-stylistic',
      ]);
    });

    it('configures the import settings for javascript files with jsx', () => {
      const config = byName(configs, 'airbnb/config/react-settings-extensions-configurations');

      expect(config.files).toStrictEqual(jsFiles);
      expect(serialize(config.settings)).toStrictEqual(
        serialize(getImportSettings({ javascript: true, typescript: false, jsx: true })),
      );
    });

    it('allows the redux devtools variable on top of the base no-underscore-dangle options', () => {
      const rule = byName(configs, 'airbnb/config/react-configurations').rules?.[
        'no-underscore-dangle'
      ];
      const base = styleInternalRules['no-underscore-dangle'];

      expect(rule).toStrictEqual([
        'error',
        { ...base[1], allow: [...base[1].allow, '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] },
      ]);
    });

    it('allows the react lifecycle methods in class-methods-use-this', () => {
      const rule = byName(configs, 'airbnb/config/react-configurations').rules?.[
        'class-methods-use-this'
      ];

      expect(rule).toStrictEqual([
        'error',
        {
          exceptMethods: [
            'render',
            'getInitialState',
            'getDefaultProps',
            'getChildContext',
            'componentWillMount',
            'UNSAFE_componentWillMount',
            'componentDidMount',
            'componentWillReceiveProps',
            'UNSAFE_componentWillReceiveProps',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'UNSAFE_componentWillUpdate',
            'componentDidUpdate',
            'componentWillUnmount',
            'componentDidCatch',
            'getSnapshotBeforeUpdate',
          ],
        },
      ]);
    });

    it('prefers double quotes in jsx', () => {
      expect(byName(configs, 'airbnb/config/react-stylistic').rules).toStrictEqual({
        '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      });
    });
  });

  describe('react/typescript', () => {
    const configs = extensions.react.typescript;

    it('keeps the config order', () => {
      expect(configs.map((config) => config.name)).toStrictEqual([
        'airbnb/config/react-typescript-react',
        'airbnb/config/react-typescript-settings-extensions-configurations',
      ]);
    });

    it('allows jsx only in .jsx and .tsx files', () => {
      const config = byName(configs, 'airbnb/config/react-typescript-react');

      expect(config.files).toStrictEqual(tsFiles);
      expect(config.rules).toStrictEqual({
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
      });
    });

    it('configures the import settings for typescript files with jsx', () => {
      const config = byName(
        configs,
        'airbnb/config/react-typescript-settings-extensions-configurations',
      );

      expect(config.files).toStrictEqual(tsFiles);
      expect(serialize(config.settings)).toStrictEqual(
        serialize(getImportSettings({ javascript: false, typescript: true, jsx: true })),
      );
    });
  });

  describe('next/recommended', () => {
    const configs = extensions.next.recommended;

    it('does not require a default export in route handlers and middleware', () => {
      const config = byName(configs, 'airbnb/config/next-import-x');

      expect(config.files).toStrictEqual(['**/app/**/route.ts', '**/middleware.ts']);
      expect(config.rules).toStrictEqual({ 'import-x/prefer-default-export': 'off' });
    });

    it('turns off the react import rules for the new jsx runtime', () => {
      const config = byName(configs, 'airbnb/config/next-react-jsx-runtime');

      expect(config.files).toStrictEqual(allFiles);
      expect(config.rules).toStrictEqual({
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
      });
    });
  });

  describe('node/recommended', () => {
    const configs = extensions.node.recommended;
    const flat = nodePlugin.configs;

    it('keeps the config order', () => {
      expect(configs.map((config) => config.name)).toStrictEqual([
        'airbnb/config/node-configurations',
        'airbnb/config/node-configurations-for-module',
        'airbnb/config/node-configurations-for-script',
      ]);
    });

    it.each([
      ['airbnb/config/node-configurations', allFiles, 'flat/recommended'],
      [
        'airbnb/config/node-configurations-for-module',
        ['**/*.mjs', '**/*.mts'],
        'flat/recommended-module',
      ],
      [
        'airbnb/config/node-configurations-for-script',
        ['**/*.cjs', '**/*.cts'],
        'flat/recommended-script',
      ],
    ] as const)('%s uses the %s config of eslint-plugin-n', (name, files, key) => {
      const config = byName(configs, name);
      const source = flat[key];

      expect(config.files).toStrictEqual(files);
      expect(config.languageOptions).toStrictEqual(source.languageOptions);
      expect(Object.keys(config.rules ?? {})).toStrictEqual([
        'n/no-unsupported-features/es-syntax',
      ]);
      expect(config.rules?.['n/no-unsupported-features/es-syntax']).toStrictEqual(
        source.rules?.['n/no-unsupported-features/es-syntax'],
      );
    });
  });
});
