import { allFiles, defineConfigObject } from '@/utils';

const nodeBaseRules = defineConfigObject({
  name: 'airbnb/config/node/base',
  files: allFiles,
  rules: {
    // Require return statements after callbacks
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/callback-return.md
    'n/callback-return': 'off',

    // Enforce either module.exports or exports
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/exports-style.md
    'n/exports-style': [
      'error',
      'module.exports',
      {
        allowBatchAssign: false,
      },
    ],

    // Enforce the style of file extensions in import declarations
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/file-extension-in-import.md
    // Off due to 'import-x/extensions'
    'n/file-extension-in-import': 'off',

    // Require require() calls to be placed at top-level module scope
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/global-require.md
    'n/global-require': 'error',

    // Require error handling in callbacks
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/handle-callback-err.md
    'n/handle-callback-err': 'off',

    // Require correct usage of hashbang
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/hashbang.md
    'n/hashbang': 'error',

    // Enforce Node.js-style error-first callback pattern is followed
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-callback-literal.md
    'n/no-callback-literal': 'off',

    // Disallow deprecated APIs
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-deprecated-api.md
    'n/no-deprecated-api': 'error',

    // Disallow the assignment to exports
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-exports-assign.md
    'n/no-exports-assign': 'error',

    // Disallow import declarations which import extraneous modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-import.md
    // Off due to 'import-x/no-extraneous-dependencies'
    'n/no-extraneous-import': 'off',

    // Disallow require() expressions which import extraneous modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-extraneous-require.md
    // Off due to 'import-x/no-extraneous-dependencies'
    'n/no-extraneous-require': 'off',

    // Disallow import declarations which import non-existence modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-import.md
    // Off due to 'import-x/no-unresolved'
    'n/no-missing-import': 'off',

    // Disallow require() expressions which import non-existence modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-missing-require.md
    // Off due to 'import-x/no-unresolved'
    'n/no-missing-require': 'off',

    // Disallow require calls to be mixed with regular variable declarations
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-mixed-requires.md
    'n/no-mixed-requires': 'off',

    // Disallow new operators with calls to require
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-new-require.md
    'n/no-new-require': 'error',

    // Disallow string concatenation with __dirname and __filename
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-path-concat.md
    'n/no-path-concat': 'error',

    // Disallow the use of process.env
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-env.md
    'n/no-process-env': 'off',

    // Disallow the use of process.exit()
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-process-exit.md
    'n/no-process-exit': 'error',

    // Disallow specified modules when loaded by import declarations
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-import.md
    // Off due to 'no-restricted-imports'
    'n/no-restricted-import': 'off',

    // Disallow specified modules when loaded by require
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-restricted-require.md
    // Off due to 'no-restricted-imports'
    'n/no-restricted-require': 'off',

    // Disallow synchronous methods
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-sync.md
    'n/no-sync': [
      'error',
      {
        allowAtRootLevel: false,
        ignores: [],
      },
    ],

    // Disallow top-level await in published modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-top-level-await.md
    'n/no-top-level-await': 'off',

    // Disallow bin files that npm ignores
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-bin.md
    'n/no-unpublished-bin': 'error',

    // Disallow import declarations which import private modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-import.md
    // Off due to 'import-x/no-extraneous-dependencies'
    'n/no-unpublished-import': 'off',

    // Disallow require() expressions which import private modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-unpublished-require.md
    // Off due to 'import-x/no-extraneous-dependencies'
    'n/no-unpublished-require': 'off',

    // Enforce using the node: protocol when importing Node.js builtin modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-node-protocol.md
    'n/prefer-node-protocol': 'error',

    // Require that process.exit() expressions use the same code path as throw
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/process-exit-as-throw.md
    'n/process-exit-as-throw': 'error',
  },
});

export const deprecatedNodeBaseRules = defineConfigObject({
  name: 'airbnb/config/node/base/deprecated',
  files: allFiles,
  rules: {
    // Disallow third-party modules which are hiding core modules
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/no-hide-core-modules.md
    // @deprecated
    'n/no-hide-core-modules': 'off',

    // Require correct usage of hashbang
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/shebang.md
    // @deprecated
    'n/shebang': 'off',
  },
});

export default nodeBaseRules;
