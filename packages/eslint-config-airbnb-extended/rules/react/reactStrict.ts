import { allFiles, defineConfigObject } from '@/utils';

const reactStrictRules = defineConfigObject({
  name: 'airbnb/config/react/strict',
  files: allFiles,
  rules: {
    // This rule enforces onChange or readonly attribute for checked property of input elements.
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/checked-requires-onchange-or-readonly.md
    'react/checked-requires-onchange-or-readonly': 'error',

    // Enforce a specific function type for function components
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],

    // Ensure destructuring and symmetric naming of useState hook value and setter variables
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
    'react/hook-use-state': [
      'error',
      {
        allowDestructuredState: true,
      },
    ],

    // Ensures inline tags are not rendered without spaces between them
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-child-element-spacing.md
    'react/jsx-child-element-spacing': 'warn',

    // Enforce shorthand or standard form for React fragments
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-fragments.md
    'react/jsx-fragments': ['error', 'element'],

    // Validate JSX has key prop when in array or iterator
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
    // Turned off because it has too many false positives
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: false,
        warnOnDuplicates: true,
      },
    ],

    // Prevent problematic leaked values from being rendered
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-leaked-render.md
    'react/jsx-no-leaked-render': 'error',

    // Enforce propTypes declarations alphabetical sorting
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/sort-prop-types.md
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: false,
        shorthandFirst: true,
        shorthandLast: false,
        multiline: 'last',
        ignoreCase: true,
        noSortAlphabetically: false,
        reservedFirst: ['key', 'ref'],
        locale: 'auto',
      },
    ],

    // Prevent usage of UNSAFE_ methods
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
    'react/no-unsafe': 'error',

    // Require stateless functions when not using lifecycle methods, setState or ref
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
    'react/prefer-stateless-function': [
      'error',
      {
        ignorePureComponents: false,
      },
    ],

    // Prevent missing props validation in a React component definition
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/prop-types.md
    // Disabling it because prop-types are deprecated
    'react/prop-types': 'off',
  },
});

export default reactStrictRules;
