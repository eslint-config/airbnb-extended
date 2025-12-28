import { allFiles } from '@/utils';

import type { Linter } from 'eslint';

const reactStylisticRules = {
  name: 'airbnb/config/react/stylistic',
  files: allFiles,
  rules: {
    // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
    // https://eslint.style/rules/jsx-child-element-spacing
    // Off due to 'react/jsx-child-element-spacing'
    '@stylistic/jsx-child-element-spacing': 'off',

    // Enforce the closing bracket location for JSX multiline elements.
    // https://eslint.style/rules/jsx-closing-bracket-location
    // Off due to 'react/jsx-closing-bracket-location'
    '@stylistic/jsx-closing-bracket-location': 'off',

    // Enforce the closing tag location for multiline JSX elements.
    // https://eslint.style/rules/jsx-closing-tag-location
    // Off due to 'react/jsx-closing-tag-location'
    '@stylistic/jsx-closing-tag-location': 'off',

    // Disallow unnecessary JSX expressions when literals alone are sufficient or enforce JSX expressions on literals in JSX children or attributes.
    // https://eslint.style/rules/jsx-curly-brace-presence
    // Off due to 'react/jsx-curly-brace-presence'
    '@stylistic/jsx-curly-brace-presence': 'off',

    // Enforce consistent linebreaks in curly braces in JSX attributes and expressions.
    // https://eslint.style/rules/jsx-curly-newline
    // Off due to 'react/jsx-curly-newline'
    '@stylistic/jsx-curly-newline': 'off',

    // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions.
    // https://eslint.style/rules/jsx-curly-spacing
    // Off due to 'react/jsx-curly-spacing'
    '@stylistic/jsx-curly-spacing': 'off',

    // Enforce or disallow spaces around equal signs in JSX attributes.
    // https://eslint.style/rules/jsx-equals-spacing
    // Off due to 'react/jsx-equals-spacing'
    '@stylistic/jsx-equals-spacing': 'off',

    // Enforce the proper position of the first property in JSX.
    // https://eslint.style/rules/jsx-first-prop-new-line
    // Off due to 'react/jsx-first-prop-new-line'
    '@stylistic/jsx-first-prop-new-line': 'off',

    // Enforce line breaks before and after JSX elements when they are used as arguments to a function.
    // https://eslint.style/rules/jsx-function-call-newline
    '@stylistic/jsx-function-call-newline': 'off',

    // Enforce props indentation in JSX.
    // https://eslint.style/rules/jsx-indent-props
    // Off due to 'react/jsx-indent-props'
    '@stylistic/jsx-indent-props': 'off',

    // Enforce a maximum of props on a single line in JSX.
    // https://eslint.style/rules/jsx-max-props-per-line
    // Off due to 'react/jsx-max-props-per-line'
    '@stylistic/jsx-max-props-per-line': 'off',

    // Require or prevent a new line after jsx elements and expressions
    // https://eslint.style/rules/jsx-newline
    // Off due to 'react/jsx-newline'
    '@stylistic/jsx-newline': 'off',

    // Require one JSX element per line.
    // https://eslint.style/rules/jsx-one-expression-per-line
    // Off due to 'react/jsx-one-expression-per-line'
    '@stylistic/jsx-one-expression-per-line': 'off',

    // Enforces coding style that user-defined JSX components are defined and referenced in PascalCase.
    // https://eslint.style/rules/jsx-pascal-case
    // Off due to 'react/jsx-pascal-case'
    '@stylistic/jsx-pascal-case': 'off',

    // Disallow multiple spaces between inline JSX props.
    // https://eslint.style/rules/jsx-props-no-multi-spaces
    // Off due to 'react/jsx-props-no-multi-spaces'
    '@stylistic/jsx-props-no-multi-spaces': 'off',

    // specify whether double or single quotes should be used in JSX attributes
    // https://eslint.style/rules/jsx-quotes
    // Off due to 'react/jsx-quotes' rule
    '@stylistic/jsx-quotes': 'off',

    // Disallow extra closing tags for components without children.
    // https://eslint.style/rules/jsx-self-closing-comp
    // Off due to 'react/self-closing-comp'
    '@stylistic/jsx-self-closing-comp': 'off',

    // Enforce props alphabetical sorting.
    // https://eslint.style/rules/jsx-sort-props
    // Off due to 'react/jsx-sort-props'
    '@stylistic/jsx-sort-props': 'off',

    // Enforce whitespace in and around the JSX opening and closing brackets.
    // https://eslint.style/rules/jsx-tag-spacing
    // Off due to 'react/jsx-tag-spacing'
    '@stylistic/jsx-tag-spacing': 'off',

    // Disallow missing parentheses around multiline JSX.
    // https://eslint.style/rules/jsx-wrap-multilines
    // Off due to 'react/jsx-wrap-multilines'
    '@stylistic/jsx-wrap-multilines': 'off',
  },
} satisfies Linter.Config;

export const deprecatedReactStylisticRules = {
  name: 'airbnb/config/react/stylistic/deprecated',
  files: allFiles,
  rules: {
    // Enforce JSX indentation.
    // https://eslint.style/rules/jsx-indent
    // Off due to 'react/jsx-indent'
    '@stylistic/jsx-indent': 'off',
  },
} satisfies Linter.Config;

export default reactStylisticRules;
