import { allFiles, defineConfigObject } from '@/utils';

import type { ConfigRules } from '@/types/common.types';

export const styleInternalRules = {
  // require camel case names
  camelcase: [
    'error',
    {
      properties: 'never',
      ignoreDestructuring: false,
    },
  ],

  // enforce or disallow capitalization of the first letter of a comment
  // https://eslint.org/docs/latest/rules/capitalized-comments
  'capitalized-comments': [
    'off',
    'never',
    {
      line: {
        ignorePattern: '.*',
        ignoreInlineComments: true,
        ignoreConsecutiveComments: true,
      },
      block: {
        ignorePattern: '.*',
        ignoreInlineComments: true,
        ignoreConsecutiveComments: true,
      },
    },
  ],

  // enforces consistent naming when capturing the current execution context
  'consistent-this': 'off',

  // requires function names to match the name of the variable or property to which they are
  // assigned
  // https://eslint.org/docs/latest/rules/func-name-matching
  'func-name-matching': [
    'off',
    'always',
    {
      includeCommonJSModuleExports: false,
      considerPropertyDescriptor: true,
    },
  ],

  // require function expressions to have a name
  // https://eslint.org/docs/latest/rules/func-names
  'func-names': 'warn',

  // enforces use of function declarations or expressions
  // https://eslint.org/docs/latest/rules/func-style
  // TODO: enable
  'func-style': ['off', 'expression'],

  // disallow specified identifiers
  // https://eslint.org/docs/latest/rules/id-denylist
  'id-denylist': 'off',

  // this option enforces minimum and maximum identifier lengths
  // (variable names, property names etc.)
  'id-length': 'off',

  // require identifiers to match the provided regular expression
  'id-match': 'off',

  // Require or disallow logical assignment logical operator shorthand
  // https://eslint.org/docs/latest/rules/logical-assignment-operators
  // TODO, semver-major: enable
  'logical-assignment-operators': [
    'off',
    'always',
    {
      enforceForIfStatements: true,
    },
  ],

  // specify the maximum depth that blocks can be nested
  'max-depth': ['off', 4],

  // specify the max number of lines in a file
  // https://eslint.org/docs/latest/rules/max-lines
  'max-lines': [
    'off',
    {
      max: 300,
      skipBlankLines: true,
      skipComments: true,
    },
  ],

  // enforce a maximum function length
  // https://eslint.org/docs/latest/rules/max-lines-per-function
  'max-lines-per-function': [
    'off',
    {
      max: 50,
      skipBlankLines: true,
      skipComments: true,
      IIFEs: true,
    },
  ],

  // specify the maximum depth callbacks can be nested
  'max-nested-callbacks': 'off',

  // limits the number of parameters that can be used in the function declaration.
  'max-params': ['off', 3],

  // specify the maximum number of statement allowed in a function
  'max-statements': ['off', 10],

  // require a capital letter for constructors
  'new-cap': [
    'error',
    {
      newIsCap: true,
      newIsCapExceptions: [],
      capIsNew: false,
      capIsNewExceptions: ['Immutable.Map', 'Immutable.Set', 'Immutable.List'],
    },
  ],

  // disallow use of the Array constructor
  'no-array-constructor': 'error',

  // disallow use of bitwise operators
  // https://eslint.org/docs/latest/rules/no-bitwise
  'no-bitwise': 'error',

  // disallow use of the continue statement
  // https://eslint.org/docs/latest/rules/no-continue
  'no-continue': 'error',

  // disallow comments inline after code
  'no-inline-comments': 'off',

  // disallow if as the only statement in an else block
  // https://eslint.org/docs/latest/rules/no-lonely-if
  'no-lonely-if': 'error',

  // disallow use of chained assignment expressions
  // https://eslint.org/docs/latest/rules/no-multi-assign
  'no-multi-assign': 'error',

  // disallow negated conditions
  // https://eslint.org/docs/latest/rules/no-negated-condition
  'no-negated-condition': 'off',

  // disallow nested ternary expressions
  'no-nested-ternary': 'error',

  // disallow use of unary operators, ++ and --
  // https://eslint.org/docs/latest/rules/no-plusplus
  'no-plusplus': 'error',

  // disallow certain syntax forms
  // https://eslint.org/docs/latest/rules/no-restricted-syntax
  'no-restricted-syntax': [
    'error',
    {
      selector: 'ForInStatement',
      message:
        'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
    },
    {
      selector: 'ForOfStatement',
      message:
        'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
    },
    {
      selector: 'LabeledStatement',
      message:
        'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
    },
    {
      selector: 'WithStatement',
      message:
        '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
    },
  ],

  // disallow the use of ternary operators
  'no-ternary': 'off',

  // disallow dangling underscores in identifiers
  // https://eslint.org/docs/latest/rules/no-underscore-dangle
  'no-underscore-dangle': [
    'error',
    {
      allow: [],
      allowAfterThis: false,
      allowAfterSuper: false,
      enforceInMethodNames: true,
    },
  ],

  // disallow the use of Boolean literals in conditional expressions
  // also, prefer `a || b` over `a ? a : b`
  // https://eslint.org/docs/latest/rules/no-unneeded-ternary
  'no-unneeded-ternary': [
    'error',
    {
      defaultAssignment: false,
    },
  ],

  // allow just one var statement per function
  'one-var': ['error', 'never'],

  // require assignment operator shorthand where possible or prohibit it entirely
  // https://eslint.org/docs/latest/rules/operator-assignment
  'operator-assignment': ['error', 'always'],

  // Disallow the use of Math.pow in favor of the ** operator
  // https://eslint.org/docs/latest/rules/prefer-exponentiation-operator
  'prefer-exponentiation-operator': 'error',

  // Prefer use of an object spread over Object.assign
  // https://eslint.org/docs/latest/rules/prefer-object-spread
  'prefer-object-spread': 'error',

  // requires object keys to be sorted
  'sort-keys': [
    'off',
    'asc',
    {
      caseSensitive: false,
      natural: true,
    },
  ],

  // sort variables within the same declaration block
  'sort-vars': 'off',

  // require or disallow the Unicode Byte Order Mark
  // https://eslint.org/docs/latest/rules/unicode-bom
  'unicode-bom': ['error', 'never'],
} satisfies ConfigRules;

const styleRules = defineConfigObject({
  name: 'airbnb/config/style',
  files: allFiles,
  rules: styleInternalRules,
});

export default styleRules;
