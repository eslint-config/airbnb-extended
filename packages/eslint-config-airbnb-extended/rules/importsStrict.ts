import { allFiles, defineConfigObject } from '@/utils';

const importsStrictRules = defineConfigObject({
  name: 'airbnb/config/import-x/strict',
  files: allFiles,
  rules: {
    // enforce a consistent style for type specifiers (inline or top-level)
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md
    'import-x/consistent-type-specifier-style': ['error', 'prefer-top-level'],

    // Reports if a module's default export is unnamed
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-anonymous-default-export.md
    'import-x/no-anonymous-default-export': [
      'error',
      {
        allowArray: true,
        allowObject: true,
      },
    ],

    // disallow namespace imports
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/no-namespace.md
    'import-x/no-namespace': 'error',

    // ensure absolute imports are above relative imports and that unassigned imports are ignored
    // https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md
    'import-x/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
          'object',
          ['unknown', 'type'],
        ],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
        distinctGroup: true,
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          orderImportKind: 'asc',
          caseInsensitive: true,
        },
        named: {
          enabled: true,
          import: true,
          export: true,
          require: true,
          cjsExports: true,
          types: 'types-last',
        },
        warnOnUnassignedImports: true,
        sortTypesGroup: true,
        'newlines-between-types': 'always',
      },
    ],
  },
});

export default importsStrictRules;
