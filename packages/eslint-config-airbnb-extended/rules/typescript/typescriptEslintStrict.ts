import { defineConfigObject, tsFiles } from '@/utils';

const typescriptEslintStrictRules = defineConfigObject({
  name: 'airbnb/config/typescript/typescript-eslint/strict',
  files: tsFiles,
  rules: {
    // Require that function overload signatures be consecutive.
    // https://typescript-eslint.io/rules/adjacent-overload-signatures
    '@typescript-eslint/adjacent-overload-signatures': 'error',

    // Disallow awaiting a value that is not a Thenable.
    // https://typescript-eslint.io/rules/await-thenable
    '@typescript-eslint/await-thenable': 'error',

    // Disallow @ts-<directive> comments or require descriptions after directives.
    // https://typescript-eslint.io/rules/ban-ts-comment
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        minimumDescriptionLength: 3,
        'ts-check': false,
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
      },
    ],

    // Enforce specifying generic type arguments on type annotation or constructor name of a constructor call.
    // https://typescript-eslint.io/rules/consistent-generic-constructors
    '@typescript-eslint/consistent-generic-constructors': ['error', 'constructor'],

    // Enforce consistent usage of type assertions.
    // https://typescript-eslint.io/rules/consistent-type-assertions
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        arrayLiteralTypeAssertions: 'allow',
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow',
      },
    ],

    // Enforce consistent usage of type exports.
    // https://typescript-eslint.io/rules/consistent-type-exports
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: false,
      },
    ],

    // Enforce consistent usage of type imports.
    // https://typescript-eslint.io/rules/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: true,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],

    // Require explicit return and argument types on exported functions' and classes' public class methods.
    // https://typescript-eslint.io/rules/explicit-module-boundary-types
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: false,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: [],
        allowHigherOrderFunctions: true,
        allowOverloadFunctions: false,
        allowTypedFunctionExpressions: true,
      },
    ],

    // Enforce using a particular method signature syntax.
    // https://typescript-eslint.io/rules/method-signature-style
    '@typescript-eslint/method-signature-style': ['error', 'property'],

    // Disallow using the delete operator on array values.
    // https://typescript-eslint.io/rules/no-array-delete
    '@typescript-eslint/no-array-delete': 'error',

    // Require expressions of type void to appear in statement position.
    // https://typescript-eslint.io/rules/no-confusing-void-expression
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      {
        ignoreArrowShorthand: true,
        ignoreVoidOperator: true,
        ignoreVoidReturningFunctions: false,
      },
    ],

    // Disallow duplicate constituents of union or intersection types.
    // https://typescript-eslint.io/rules/no-duplicate-type-constituents
    '@typescript-eslint/no-duplicate-type-constituents': [
      'error',
      {
        ignoreIntersections: false,
        ignoreUnions: false,
      },
    ],

    // Disallow the any type.
    // https://typescript-eslint.io/rules/no-explicit-any
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: false,
        ignoreRestArgs: false,
      },
    ],

    // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers.
    // https://typescript-eslint.io/rules/no-import-type-side-effects
    '@typescript-eslint/no-import-type-side-effects': 'error',

    // Disallow void type outside of generic or return types.
    // https://typescript-eslint.io/rules/no-invalid-void-type
    '@typescript-eslint/no-invalid-void-type': [
      'error',
      {
        allowAsThisParameter: false,
        allowInGenericTypeArguments: true,
      },
    ],

    // Disallow Promises in places not designed to handle them.
    // https://typescript-eslint.io/rules/no-misused-promises
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksConditionals: true,
        checksSpreads: true,
        checksVoidReturn: false,
      },
    ],

    // Disallow using the spread operator when it might cause unexpected behavior.
    // https://typescript-eslint.io/rules/no-misused-spread
    '@typescript-eslint/no-misused-spread': [
      'error',
      {
        allow: [],
      },
    ],

    // Disallow non-null assertions in the left operand of a nullish coalescing operator.
    // https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'warn',

    // Disallow non-null assertions after an optional chain expression.
    // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Disallow non-null assertions using the ! postfix operator.
    // https://typescript-eslint.io/rules/no-non-null-assertion
    '@typescript-eslint/no-non-null-assertion': 'error',

    // Disallow members of unions and intersections that do nothing or override type information.
    // https://typescript-eslint.io/rules/no-redundant-type-constituents
    '@typescript-eslint/no-redundant-type-constituents': 'error',

    // Disallow unnecessary equality comparisons against boolean literals.
    // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',

    // Disallow returning a value with type any from a function.
    // https://typescript-eslint.io/rules/no-unsafe-return
    '@typescript-eslint/no-unsafe-return': 'error',

    // Disallow empty exports that don't change anything in a module file.
    // https://typescript-eslint.io/rules/no-useless-empty-export
    '@typescript-eslint/no-useless-empty-export': 'error',

    // Enforce the use of for-of loop over the standard for loop where possible.
    // https://typescript-eslint.io/rules/prefer-for-of
    '@typescript-eslint/prefer-for-of': 'error',

    // Enforce includes method over indexOf method.
    // https://typescript-eslint.io/rules/prefer-includes
    '@typescript-eslint/prefer-includes': 'warn',

    // Enforce using the nullish coalescing operator instead of logical assignments or chaining.
    // https://typescript-eslint.io/rules/prefer-nullish-coalescing
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    // Enforce using concise optional chain expressions instead of chained logical ands, negated logical ors, or empty objects.
    // https://typescript-eslint.io/rules/prefer-optional-chain
    '@typescript-eslint/prefer-optional-chain': 'error',

    // Enforce using type parameter when calling Array#reduce instead of using a type assertion.
    // https://typescript-eslint.io/rules/prefer-reduce-type-parameter
    '@typescript-eslint/prefer-reduce-type-parameter': 'error',

    // Enforce RegExp#exec over String#match if no global flag is provided.
    // https://typescript-eslint.io/rules/prefer-regexp-exec
    '@typescript-eslint/prefer-regexp-exec': 'error',

    // Enforce using String#startsWith and String#endsWith over other equivalent methods of checking substrings.
    // https://typescript-eslint.io/rules/prefer-string-starts-ends-with
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',

    // Require any function or method that returns a Promise to be marked async.
    // https://typescript-eslint.io/rules/promise-function-async
    '@typescript-eslint/promise-function-async': 'error',

    // Require Array#sort and Array#toSorted calls to always provide a compareFunction.
    // https://typescript-eslint.io/rules/require-array-sort-compare
    '@typescript-eslint/require-array-sort-compare': 'error',

    // Disallow two overloads that could be unified into one with a union or an optional/rest parameter.
    // https://typescript-eslint.io/rules/unified-signatures
    '@typescript-eslint/unified-signatures': [
      'error',
      {
        ignoreDifferentlyNamedParameters: false,
        ignoreOverloadsWithDifferentJSDoc: false,
      },
    ],
  },
});

export default typescriptEslintStrictRules;
