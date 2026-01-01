import { parser, plugin } from 'typescript-eslint';

import getDevDepsList from '@/helpers/getDevDepsList';
import { legacyBestPracticesInternalRules } from '@/legacy/rules/best-practices';
import { legacyErrorsInternalRules } from '@/legacy/rules/errors';
import { legacyEs6InternalRules } from '@/legacy/rules/es6';
import { legacyImportsInternalRules } from '@/legacy/rules/imports';
import { legacyStyleInternalRules } from '@/legacy/rules/style';
import { legacyVariablesInternalRules } from '@/legacy/rules/variables';
import { defineConfigObject, tsFiles } from '@/utils';

const legacyTypescriptBaseRules = defineConfigObject({
  name: 'airbnb/config/typescript/legacy',
  files: tsFiles,
  plugins: {
    '@typescript-eslint': plugin,
  },
  languageOptions: {
    parser,
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Replace Airbnb 'brace-style' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/brace-style.md
    // @deprecated and deleted by @typescript-eslint
    // 'brace-style': 'off',
    // '@typescript-eslint/brace-style': legacyStyleInternalRules['brace-style'],

    // Replace Airbnb 'camelcase' rule with '@typescript-eslint/naming-convention'
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
    camelcase: 'off',
    // The `@typescript-eslint/naming-convention` rule allows `leadingUnderscore` and `trailingUnderscore` settings. However, the existing `no-underscore-dangle` rule already takes care of this.
    '@typescript-eslint/naming-convention': [
      'error',
      // Allow camelCase variables (23.2), PascalCase variables (23.8), and UPPER_CASE variables (23.10)
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      // Allow camelCase functions (23.2), and PascalCase functions (23.8)
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      // Airbnb recommends PascalCase for classes (23.3), and although Airbnb does not make TypeScript recommendations, we are assuming this rule would similarly apply to anything "type like", including interfaces, type aliases, and enums
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Replace Airbnb 'comma-dangle' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-dangle.md
    // The TypeScript version also adds 3 new options, all of which should be set to the same value as the base config
    // @deprecated and deleted by @typescript-eslint
    // 'comma-dangle': 'off',
    // '@typescript-eslint/comma-dangle': [
    //   legacyStyleInternalRules['comma-dangle'][0],
    //   {
    //     ...legacyStyleInternalRules['comma-dangle'][1],
    //     enums: legacyStyleInternalRules['comma-dangle'][1].arrays,
    //     generics: legacyStyleInternalRules['comma-dangle'][1].arrays,
    //     tuples: legacyStyleInternalRules['comma-dangle'][1].arrays,
    //   },
    // ],

    // Replace Airbnb 'comma-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/comma-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'comma-spacing': 'off',
    // '@typescript-eslint/comma-spacing': legacyStyleInternalRules['comma-spacing'],

    // Replace Airbnb 'default-param-last' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/default-param-last.md
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': legacyBestPracticesInternalRules['default-param-last'],

    // Replace Airbnb 'dot-notation' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/dot-notation.md
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': legacyBestPracticesInternalRules['dot-notation'],

    // Replace Airbnb 'func-call-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/func-call-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'func-call-spacing': 'off',
    // '@typescript-eslint/func-call-spacing': legacyStyleInternalRules['func-call-spacing'],

    // Replace Airbnb 'indent' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
    // @deprecated and deleted by @typescript-eslint
    // indent: 'off',
    // '@typescript-eslint/indent': legacyStyleInternalRules.indent,

    // Replace Airbnb 'keyword-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/keyword-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'keyword-spacing': 'off',
    // '@typescript-eslint/keyword-spacing': legacyStyleInternalRules['keyword-spacing'],

    // Replace Airbnb 'lines-between-class-members' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/lines-between-class-members.md
    // @deprecated and deleted by @typescript-eslint
    // 'lines-between-class-members': 'off',
    // '@typescript-eslint/lines-between-class-members': legacyStyleInternalRules['lines-between-class-members'],

    // Replace Airbnb 'no-array-constructor' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-array-constructor.md
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': legacyStyleInternalRules['no-array-constructor'],

    // Replace Airbnb 'no-dupe-class-members' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': legacyEs6InternalRules['no-dupe-class-members'],

    // Replace Airbnb 'no-empty-function' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-empty-function.md
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': legacyBestPracticesInternalRules['no-empty-function'],

    // Replace Airbnb 'no-extra-parens' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-parens.md
    'no-extra-parens': 'off',
    '@typescript-eslint/no-extra-parens': legacyErrorsInternalRules['no-extra-parens'],

    // Replace Airbnb 'no-extra-semi' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-extra-semi.md
    // @deprecated and deleted by @typescript-eslint
    // 'no-extra-semi': 'off',
    // '@typescript-eslint/no-extra-semi': legacyErrorsInternalRules['no-extra-semi'],

    // Replace Airbnb 'no-implied-eval' and 'no-new-func' rules with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-implied-eval.md
    'no-implied-eval': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-implied-eval': legacyBestPracticesInternalRules['no-implied-eval'],

    // Replace Airbnb 'no-loss-of-precision' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loss-of-precision.md
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': legacyErrorsInternalRules['no-loss-of-precision'],

    // Replace Airbnb 'no-loop-func' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-loop-func.md
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': legacyBestPracticesInternalRules['no-loop-func'],

    // Replace Airbnb 'no-magic-numbers' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-magic-numbers.md
    'no-magic-numbers': 'off',
    '@typescript-eslint/no-magic-numbers': legacyBestPracticesInternalRules['no-magic-numbers'],

    // Replace Airbnb 'no-redeclare' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-redeclare.md
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': legacyBestPracticesInternalRules['no-redeclare'],

    // Replace Airbnb 'no-shadow' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-shadow.md
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': legacyVariablesInternalRules['no-shadow'],

    // Replace Airbnb 'space-before-blocks' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-blocks.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-before-blocks': 'off',
    // '@typescript-eslint/space-before-blocks': legacyStyleInternalRules['space-before-blocks'],

    // Replace Airbnb 'no-throw-literal' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-throw-literal.md
    // @deprecated and deleted by @typescript-eslint
    // 'no-throw-literal': 'off',
    // '@typescript-eslint/no-throw-literal': legacyBestPracticesInternalRules['no-throw-literal'],

    // Replace Airbnb 'no-unused-expressions' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-expressions.md
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions':
      legacyBestPracticesInternalRules['no-unused-expressions'],

    // Replace Airbnb 'no-unused-vars' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-unused-vars.md
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': legacyVariablesInternalRules['no-unused-vars'],

    // Replace Airbnb 'no-use-before-define' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': legacyVariablesInternalRules['no-use-before-define'],

    // Replace Airbnb 'no-useless-constructor' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-useless-constructor.md
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': legacyEs6InternalRules['no-useless-constructor'],

    // Replace Airbnb 'quotes' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/quotes.md
    // @deprecated and deleted by @typescript-eslint
    // quotes: 'off',
    // '@typescript-eslint/quotes': legacyStyleInternalRules.quotes,

    // Replace Airbnb 'semi' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/semi.md
    // @deprecated and deleted by @typescript-eslint
    // semi: 'off',
    // '@typescript-eslint/semi': legacyStyleInternalRules.semi,

    // Replace Airbnb 'space-before-function-paren' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-before-function-paren.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-before-function-paren': 'off',
    // '@typescript-eslint/space-before-function-paren': legacyStyleInternalRules['space-before-function-paren'],

    // Replace Airbnb 'require-await' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/require-await.md
    'require-await': 'off',
    '@typescript-eslint/require-await': legacyBestPracticesInternalRules['require-await'],

    // Replace Airbnb 'no-return-await' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/return-await.md
    'no-return-await': 'off',
    '@typescript-eslint/return-await': [
      legacyBestPracticesInternalRules['no-return-await'],
      'in-try-catch',
    ],

    // Replace Airbnb 'space-infix-ops' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/space-infix-ops.md
    // @deprecated and deleted by @typescript-eslint
    // 'space-infix-ops': 'off',
    // '@typescript-eslint/space-infix-ops': legacyStyleInternalRules['space-infix-ops'],

    // Replace Airbnb 'object-curly-spacing' rule with '@typescript-eslint' version
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/object-curly-spacing.md
    // @deprecated and deleted by @typescript-eslint
    // 'object-curly-spacing': 'off',
    // '@typescript-eslint/object-curly-spacing': legacyStyleInternalRules['object-curly-spacing'],

    // Append 'ts' and 'tsx' to Airbnb 'import/extensions' rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/extensions.md
    'import/extensions': [
      legacyImportsInternalRules['import/extensions'][0],
      legacyImportsInternalRules['import/extensions'][1],
      {
        ...legacyImportsInternalRules['import/extensions'][2],
        ts: 'never',
        tsx: 'never',
      },
    ],

    // Append 'ts' and 'tsx' extensions to Airbnb 'import/no-extraneous-dependencies' rule
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: getDevDepsList('typescript'),
        optionalDependencies: false,
      },
    ],
  },
});

export default legacyTypescriptBaseRules;
