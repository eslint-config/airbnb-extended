import { describe, expect, it } from 'vitest';

import { getImportSettings } from '@/helpers/getImportSettings';

import type { GetImportSettingsParams } from '@/helpers/getImportSettings';

interface Resolver {
  name?: string;
  interfaceVersion: number;
  resolve: unknown;
}

const resolversOf = (params: GetImportSettingsParams) =>
  (getImportSettings(params)?.['import-x/resolver-next'] ?? []) as Resolver[];

describe('helpers/getImportSettings', () => {
  describe.each([
    {
      title: 'javascript',
      params: { javascript: true, typescript: false, jsx: false },
      extensions: ['.js', '.cjs', '.mjs'],
    },
    {
      title: 'javascript + jsx',
      params: { javascript: true, typescript: false, jsx: true },
      extensions: ['.js', '.cjs', '.mjs', '.jsx'],
    },
    {
      title: 'typescript',
      params: { javascript: false, typescript: true, jsx: false },
      extensions: ['.ts', '.cts', '.mts', '.d.ts'],
    },
    {
      title: 'typescript + jsx',
      params: { javascript: false, typescript: true, jsx: true },
      extensions: ['.ts', '.cts', '.mts', '.tsx', '.d.ts'],
    },
  ])('$title', ({ params, extensions }) => {
    it('sets the import extensions', () => {
      expect(getImportSettings(params)?.['import-x/extensions']).toStrictEqual(extensions);
    });

    it('sets a node resolver that also resolves json', () => {
      const [nodeResolver] = resolversOf(params);

      expect(nodeResolver?.name).toBe('eslint-plugin-import-x:node');
      expect(nodeResolver?.interfaceVersion).toBe(3);
      expect(typeof nodeResolver?.resolve).toBe('function');
    });

    it(
      params.typescript
        ? 'adds the typescript resolver, parsers and type folders'
        : 'does not add typescript settings',
      () => {
        const settings = getImportSettings(params) ?? {};

        if (params.typescript) {
          expect(resolversOf(params).map((resolver) => resolver.name)).toStrictEqual([
            'eslint-plugin-import-x:node',
            'eslint-import-resolver-typescript/auto',
          ]);
          expect(settings['import-x/parsers']).toStrictEqual({
            '@typescript-eslint/parser': extensions,
          });
          expect(settings['import-x/external-module-folders']).toStrictEqual([
            'node_modules',
            'node_modules/@types',
          ]);
        } else {
          expect(resolversOf(params)).toHaveLength(1);
          expect(settings).not.toHaveProperty('import-x/parsers');
          expect(settings).not.toHaveProperty('import-x/external-module-folders');
        }
      },
    );
  });

  it('returns no extensions when neither javascript nor typescript is selected', () => {
    expect(
      getImportSettings({ javascript: false, typescript: false, jsx: false })?.[
        'import-x/extensions'
      ],
    ).toStrictEqual([]);
    expect(
      getImportSettings({ javascript: false, typescript: false, jsx: true })?.[
        'import-x/extensions'
      ],
    ).toStrictEqual([]);
  });

  it('prefers the javascript extensions when javascript and typescript are both selected', () => {
    expect(
      getImportSettings({ javascript: true, typescript: true, jsx: false })?.[
        'import-x/extensions'
      ],
    ).toStrictEqual(['.js', '.cjs', '.mjs']);
  });

  it('uses the given typescript resolver options instead of the auto resolver', () => {
    const resolvers = resolversOf({
      javascript: false,
      typescript: true,
      jsx: false,
      typescriptResolver: { project: './tsconfig.json' },
    });

    expect(resolvers).toHaveLength(2);
    expect(resolvers[1]?.name).not.toBe('eslint-import-resolver-typescript/auto');
    expect(resolvers[1]?.interfaceVersion).toBe(3);
  });

  it('ignores the typescript resolver options when typescript is off', () => {
    expect(
      resolversOf({
        javascript: true,
        typescript: false,
        jsx: false,
        typescriptResolver: { project: './tsconfig.json' },
      }),
    ).toHaveLength(1);
  });

  it('creates a new settings object each call', () => {
    const params = { javascript: true, typescript: false, jsx: false };

    expect(getImportSettings(params)).not.toBe(getImportSettings(params));
  });
});
