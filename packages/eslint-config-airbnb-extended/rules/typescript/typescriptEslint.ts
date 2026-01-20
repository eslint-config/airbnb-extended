import { bestPracticesInternalRules } from '@/rules/best-practices';
import { errorsInternalRules } from '@/rules/errors';
import { es6InternalRules } from '@/rules/es6';
import { styleInternalRules } from '@/rules/style';
import { variablesInternalRules } from '@/rules/variables';
import { defineConfigObject, tsFiles } from '@/utils';

const typescriptEslintRules = defineConfigObject({
  name: 'airbnb/config/typescript/typescript-eslint',
  files: tsFiles,
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    // Require that function overload signatures be consecutive.
    // https://typescript-eslint.io/rules/adjacent-overload-signatures
    '@typescript-eslint/adjacent-overload-signatures': 'off',

    // Require consistently using either T[] or Array<T> for arrays.
    // https://typescript-eslint.io/rules/array-type
    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
        readonly: 'array',
      },
    ],

    // Disallow awaiting a value that is not a Thenable.
    // https://typescript-eslint.io/rules/await-thenable
    '@typescript-eslint/await-thenable': 'off',

    // Disallow @ts-<directive> comments or require descriptions after directives.
    // https://typescript-eslint.io/rules/ban-ts-comment
    // Recommended by the TypeScript Eslint team
    '@typescript-eslint/ban-ts-comment': 'off',

    // Disallow // tslint:<rule-flag> comments.
    // https://typescript-eslint.io/rules/ban-tslint-comment
    '@typescript-eslint/ban-tslint-comment': 'error',

    // Enforce that literals on classes are exposed in a consistent style.
    // https://typescript-eslint.io/rules/class-literal-property-style
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],

    // Enforce that class methods utilize this.
    // https://typescript-eslint.io/rules/class-methods-use-this
    '@typescript-eslint/class-methods-use-this': 'off',

    // Enforce specifying generic type arguments on type annotation or constructor name of a constructor call.
    // https://typescript-eslint.io/rules/consistent-generic-constructors
    '@typescript-eslint/consistent-generic-constructors': 'off',

    // Require or disallow the Record type.
    // https://typescript-eslint.io/rules/consistent-indexed-object-style
    '@typescript-eslint/consistent-indexed-object-style': 'error',

    // Require return statements to either always or never specify values.
    // https://typescript-eslint.io/rules/consistent-return
    // Not recommended by the TypeScript Eslint team due to "noImplicitReturns" TypeScript rule
    '@typescript-eslint/consistent-return': 'off',

    // Enforce consistent usage of type assertions.
    // https://typescript-eslint.io/rules/consistent-type-assertions
    '@typescript-eslint/consistent-type-assertions': 'off',

    // Enforce type definitions to consistently use either interface or type.
    // https://typescript-eslint.io/rules/consistent-type-definitions
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Enforce consistent usage of type exports.
    // https://typescript-eslint.io/rules/consistent-type-exports
    '@typescript-eslint/consistent-type-exports': 'off',

    // Enforce consistent usage of type imports.
    // https://typescript-eslint.io/rules/consistent-type-imports
    '@typescript-eslint/consistent-type-imports': 'off',

    // Enforce default parameters to be last.
    // https://typescript-eslint.io/rules/default-param-last
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': bestPracticesInternalRules['default-param-last'],

    // Enforce dot notation whenever possible.
    // https://typescript-eslint.io/rules/dot-notation
    'dot-notation': 'off',
    '@typescript-eslint/dot-notation': [
      bestPracticesInternalRules['dot-notation'][0],
      {
        ...bestPracticesInternalRules['dot-notation'][1],
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
        allowIndexSignaturePropertyAccess: false,
      },
    ],

    // Require explicit return types on functions and class methods.
    // https://typescript-eslint.io/rules/explicit-function-return-type
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Require explicit accessibility modifiers on class properties and methods.
    // https://typescript-eslint.io/rules/explicit-member-accessibility
    '@typescript-eslint/explicit-member-accessibility': 'off',

    // Require explicit return and argument types on exported functions' and classes' public class methods.
    // https://typescript-eslint.io/rules/explicit-module-boundary-types
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Require or disallow initialization in variable declarations.
    // https://typescript-eslint.io/rules/init-declarations
    '@typescript-eslint/init-declarations': 'off',

    // Enforce a maximum number of parameters in function definitions.
    // https://typescript-eslint.io/rules/max-params
    '@typescript-eslint/max-params': 'off',

    // Require a consistent member declaration order.
    // https://typescript-eslint.io/rules/member-ordering
    // Not recommended by the TypeScript Eslint team due to "eslint-plugin-perfectionist"
    '@typescript-eslint/member-ordering': 'off',

    // Enforce using a particular method signature syntax.
    // https://typescript-eslint.io/rules/method-signature-style
    '@typescript-eslint/method-signature-style': 'off',

    // Enforce naming conventions for everything across a codebase.
    // https://typescript-eslint.io/rules/naming-convention
    camelcase: 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],

    // Disallow generic Array constructors.
    // https://typescript-eslint.io/rules/no-array-constructor
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': styleInternalRules['no-array-constructor'],

    // Disallow using the delete operator on array values.
    // https://typescript-eslint.io/rules/no-array-delete
    '@typescript-eslint/no-array-delete': 'off',

    // Require .toString() and .toLocaleString() to only be called on objects which provide useful information when stringified.
    // https://typescript-eslint.io/rules/no-base-to-string
    '@typescript-eslint/no-base-to-string': 'off',

    // Disallow non-null assertion in locations that may be confusing.
    // https://typescript-eslint.io/rules/no-confusing-non-null-assertion
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',

    // Require expressions of type void to appear in statement position.
    // https://typescript-eslint.io/rules/no-confusing-void-expression
    '@typescript-eslint/no-confusing-void-expression': 'off',

    // Disallow using code marked as @deprecated.
    // https://typescript-eslint.io/rules/no-deprecated
    '@typescript-eslint/no-deprecated': 'off',

    // Disallow duplicate class members.
    // https://typescript-eslint.io/rules/no-dupe-class-members
    // Not recommended by the TypeScript Eslint team
    '@typescript-eslint/no-dupe-class-members': 'off',

    // Disallow duplicate enum member values.
    // https://typescript-eslint.io/rules/no-duplicate-enum-values
    '@typescript-eslint/no-duplicate-enum-values': 'error',

    // Disallow duplicate constituents of union or intersection types.
    // https://typescript-eslint.io/rules/no-duplicate-type-constituents
    '@typescript-eslint/no-duplicate-type-constituents': 'off',

    // Disallow using the delete operator on computed key expressions.
    // https://typescript-eslint.io/rules/no-dynamic-delete
    '@typescript-eslint/no-dynamic-delete': 'off',

    // Disallow empty functions.
    // https://typescript-eslint.io/rules/no-empty-function
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': bestPracticesInternalRules['no-empty-function'],

    // Disallow accidentally using the "empty object" type.
    // https://typescript-eslint.io/rules/no-empty-object-type
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'never',
        allowObjectTypes: 'never',
      },
    ],

    // Disallow the any type.
    // https://typescript-eslint.io/rules/no-explicit-any
    // Recommended by the TypeScript Eslint team
    '@typescript-eslint/no-explicit-any': 'off',

    // Disallow extra non-null assertions.
    // https://typescript-eslint.io/rules/no-extra-non-null-assertion
    '@typescript-eslint/no-extra-non-null-assertion': 'error',

    // Disallow classes used as namespaces.
    // https://typescript-eslint.io/rules/no-extraneous-class
    '@typescript-eslint/no-extraneous-class': 'off',

    // Require Promise-like statements to be handled appropriately.
    // https://typescript-eslint.io/rules/no-floating-promises
    '@typescript-eslint/no-floating-promises': 'off',

    // Disallow iterating over an array with a for-in loop.
    // https://typescript-eslint.io/rules/no-for-in-array
    '@typescript-eslint/no-for-in-array': 'error',

    // Disallow the use of eval()-like functions.
    // https://typescript-eslint.io/rules/no-implied-eval
    'no-implied-eval': 'off',
    'no-new-func': 'off',
    '@typescript-eslint/no-implied-eval': bestPracticesInternalRules['no-implied-eval'],

    // Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers.
    // https://typescript-eslint.io/rules/no-import-type-side-effects
    '@typescript-eslint/no-import-type-side-effects': 'off',

    // Disallow explicit type declarations for variables or parameters initialized to a number, string, or boolean.
    // https://typescript-eslint.io/rules/no-inferrable-types
    '@typescript-eslint/no-inferrable-types': [
      'error',
      {
        ignoreParameters: false,
        ignoreProperties: false,
      },
    ],

    // Disallow this keywords outside of classes or class-like objects.
    // https://typescript-eslint.io/rules/no-invalid-this
    '@typescript-eslint/no-invalid-this': 'off',

    // Disallow void type outside of generic or return types.
    // https://typescript-eslint.io/rules/no-invalid-void-type
    '@typescript-eslint/no-invalid-void-type': 'off',

    // Disallow function declarations that contain unsafe references inside loop statements.
    // https://typescript-eslint.io/rules/no-loop-func
    'no-loop-func': 'off',
    '@typescript-eslint/no-loop-func': bestPracticesInternalRules['no-loop-func'],

    // Disallow magic numbers.
    // https://typescript-eslint.io/rules/no-magic-numbers
    '@typescript-eslint/no-magic-numbers': 'off',

    // Disallow the void operator except when used to discard a value.
    // https://typescript-eslint.io/rules/no-meaningless-void-operator
    '@typescript-eslint/no-meaningless-void-operator': 'off',

    // Enforce valid definition of new and constructor.
    // https://typescript-eslint.io/rules/no-misused-new
    '@typescript-eslint/no-misused-new': 'error',

    // Disallow Promises in places not designed to handle them.
    // https://typescript-eslint.io/rules/no-misused-promises
    '@typescript-eslint/no-misused-promises': 'off',

    // Disallow using the spread operator when it might cause unexpected behavior.
    // https://typescript-eslint.io/rules/no-misused-spread
    '@typescript-eslint/no-misused-spread': 'off',

    // Disallow enums from having both number and string members.
    // https://typescript-eslint.io/rules/no-mixed-enums
    '@typescript-eslint/no-mixed-enums': 'error',

    // Disallow TypeScript namespaces.
    // https://typescript-eslint.io/rules/no-namespace
    '@typescript-eslint/no-namespace': [
      'error',
      {
        allowDeclarations: false,
        allowDefinitionFiles: true,
      },
    ],

    // Disallow non-null assertions in the left operand of a nullish coalescing operator.
    // https://typescript-eslint.io/rules/no-non-null-asserted-nullish-coalescing
    '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'off',

    // Disallow non-null assertions after an optional chain expression.
    // https://typescript-eslint.io/rules/no-non-null-asserted-optional-chain
    // Recommended by the TypeScript Eslint team
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',

    // Disallow non-null assertions using the ! postfix operator.
    // https://typescript-eslint.io/rules/no-non-null-assertion
    '@typescript-eslint/no-non-null-assertion': 'off',

    // Disallow variable redeclaration.
    // https://typescript-eslint.io/rules/no-redeclare
    '@typescript-eslint/no-redeclare': 'off',

    // Disallow members of unions and intersections that do nothing or override type information.
    // https://typescript-eslint.io/rules/no-redundant-type-constituents
    '@typescript-eslint/no-redundant-type-constituents': 'off',

    // Disallow invocation of require().
    // https://typescript-eslint.io/rules/no-require-imports
    '@typescript-eslint/no-require-imports': [
      'error',
      {
        allow: [],
        allowAsImport: false,
      },
    ],

    // Disallow specified modules when loaded by import.
    // https://typescript-eslint.io/rules/no-restricted-imports
    '@typescript-eslint/no-restricted-imports': 'off',

    // Disallow certain types.
    // https://typescript-eslint.io/rules/no-restricted-types
    '@typescript-eslint/no-restricted-types': 'off',

    // Disallow variable declarations from shadowing variables declared in the outer scope.
    // https://typescript-eslint.io/rules/no-shadow
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': variablesInternalRules['no-shadow'],

    // Disallow aliasing this.
    // https://typescript-eslint.io/rules/no-this-alias
    '@typescript-eslint/no-this-alias': [
      'error',
      {
        allowDestructuring: true,
        allowedNames: ['self', 'that'],
      },
    ],

    // Disallow unnecessary equality comparisons against boolean literals.
    // https://typescript-eslint.io/rules/no-unnecessary-boolean-literal-compare
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',

    // Disallow conditionals where the type is always truthy or always falsy.
    // https://typescript-eslint.io/rules/no-unnecessary-condition
    '@typescript-eslint/no-unnecessary-condition': 'off',

    // Disallow unnecessary assignment of constructor property parameter.
    // https://typescript-eslint.io/rules/no-unnecessary-parameter-property-assignment
    '@typescript-eslint/no-unnecessary-parameter-property-assignment': 'error',

    // Disallow unnecessary namespace qualifiers.
    // https://typescript-eslint.io/rules/no-unnecessary-qualifier
    '@typescript-eslint/no-unnecessary-qualifier': 'error',

    // Disallow unnecessary template expressions.
    // https://typescript-eslint.io/rules/no-unnecessary-template-expression
    '@typescript-eslint/no-unnecessary-template-expression': 'error',

    // Disallow type arguments that are equal to the default.
    // https://typescript-eslint.io/rules/no-unnecessary-type-arguments
    '@typescript-eslint/no-unnecessary-type-arguments': 'error',

    // Disallow type assertions that do not change the type of an expression.
    // https://typescript-eslint.io/rules/no-unnecessary-type-assertion
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',

    // Disallow unnecessary constraints on generic types.
    // https://typescript-eslint.io/rules/no-unnecessary-type-constraint
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // Disallow conversion idioms when they do not change the type or value of the expression.
    // https://typescript-eslint.io/rules/no-unnecessary-type-conversion
    '@typescript-eslint/no-unnecessary-type-conversion': 'off',

    // Disallow type parameters that aren't used multiple times.
    // https://typescript-eslint.io/rules/no-unnecessary-type-parameters
    '@typescript-eslint/no-unnecessary-type-parameters': 'off',

    // Disallow calling a function with a value with type any.
    // https://typescript-eslint.io/rules/no-unsafe-argument
    '@typescript-eslint/no-unsafe-argument': 'off',

    // Disallow assigning a value with type any to variables and properties.
    // https://typescript-eslint.io/rules/no-unsafe-assignment
    '@typescript-eslint/no-unsafe-assignment': 'off',

    // Disallow calling a value with type any.
    // https://typescript-eslint.io/rules/no-unsafe-call
    '@typescript-eslint/no-unsafe-call': 'off',

    // Disallow unsafe declaration merging.
    // https://typescript-eslint.io/rules/no-unsafe-declaration-merging
    '@typescript-eslint/no-unsafe-declaration-merging': 'error',

    // Disallow comparing an enum value with a non-enum value.
    // https://typescript-eslint.io/rules/no-unsafe-enum-comparison
    '@typescript-eslint/no-unsafe-enum-comparison': 'error',

    // Disallow using the unsafe built-in Function type.
    // https://typescript-eslint.io/rules/no-unsafe-function-type
    '@typescript-eslint/no-unsafe-function-type': 'error',

    // Disallow member access on a value with type any.
    // https://typescript-eslint.io/rules/no-unsafe-member-access
    '@typescript-eslint/no-unsafe-member-access': 'off',

    // Disallow returning a value with type any from a function.
    // https://typescript-eslint.io/rules/no-unsafe-return
    '@typescript-eslint/no-unsafe-return': 'off',

    // Disallow type assertions that narrow a type.
    // https://typescript-eslint.io/rules/no-unsafe-type-assertion
    '@typescript-eslint/no-unsafe-type-assertion': 'off',

    // Require unary negation to take a number.
    // https://typescript-eslint.io/rules/no-unsafe-unary-minus
    '@typescript-eslint/no-unsafe-unary-minus': 'error',

    // Disallow unused expressions.
    // https://typescript-eslint.io/rules/no-unused-expressions
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': bestPracticesInternalRules['no-unused-expressions'],

    'no-unused-private-class-members': 'off',
    '@typescript-eslint/no-unused-private-class-members':
      errorsInternalRules['no-unused-private-class-members'],

    // Disallow unused variables.
    // https://typescript-eslint.io/rules/no-unused-vars
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': variablesInternalRules['no-unused-vars'],

    // Disallow the use of variables before they are defined.
    // https://typescript-eslint.io/rules/no-use-before-define
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': variablesInternalRules['no-use-before-define'],

    // Disallow unnecessary constructors.
    // https://typescript-eslint.io/rules/no-useless-constructor
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': es6InternalRules['no-useless-constructor'],

    // Disallow default values that will never be used.
    // https://typescript-eslint.io/rules/no-useless-default-assignment
    '@typescript-eslint/no-useless-default-assignment': 'off',

    // Disallow empty exports that don't change anything in a module file.
    // https://typescript-eslint.io/rules/no-useless-empty-export
    '@typescript-eslint/no-useless-empty-export': 'off',

    // Disallow using confusing built-in primitive class wrappers.
    // https://typescript-eslint.io/rules/no-wrapper-object-types
    '@typescript-eslint/no-wrapper-object-types': 'error',

    // Enforce non-null assertions over explicit type assertions.
    // https://typescript-eslint.io/rules/non-nullable-type-assertion-style
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',

    // Disallow throwing non-Error values as exceptions.
    // https://typescript-eslint.io/rules/only-throw-error
    'no-throw-literal': 'off',
    '@typescript-eslint/only-throw-error': bestPracticesInternalRules['no-throw-literal'],

    // Require or disallow parameter properties in class constructors.
    // https://typescript-eslint.io/rules/parameter-properties
    '@typescript-eslint/parameter-properties': 'off',

    // Enforce the use of as const over literal type.
    // https://typescript-eslint.io/rules/prefer-as-const
    '@typescript-eslint/prefer-as-const': 'error',

    // Require destructuring from arrays and/or objects.
    // https://typescript-eslint.io/rules/prefer-destructuring
    'prefer-destructuring': 'off',
    '@typescript-eslint/prefer-destructuring': es6InternalRules['prefer-destructuring'],

    // Require each enum member value to be explicitly initialized.
    // https://typescript-eslint.io/rules/prefer-enum-initializers
    '@typescript-eslint/prefer-enum-initializers': 'off',

    // Enforce the use of Array.prototype.find() over Array.prototype.filter() followed by [0] when looking for a single result.
    // https://typescript-eslint.io/rules/prefer-find
    '@typescript-eslint/prefer-find': 'error',

    // Enforce the use of for-of loop over the standard for loop where possible.
    // https://typescript-eslint.io/rules/prefer-for-of
    '@typescript-eslint/prefer-for-of': 'off',

    // Enforce using function types instead of interfaces with call signatures.
    // https://typescript-eslint.io/rules/prefer-function-type
    '@typescript-eslint/prefer-function-type': 'error',

    // Enforce includes method over indexOf method.
    // https://typescript-eslint.io/rules/prefer-includes
    '@typescript-eslint/prefer-includes': 'off',

    // Require all enum members to be literal values.
    // https://typescript-eslint.io/rules/prefer-literal-enum-member
    '@typescript-eslint/prefer-literal-enum-member': 'off',

    // Require using the namespace keyword over module keyword to declare custom TypeScript modules.
    // https://typescript-eslint.io/rules/prefer-namespace-keyword
    '@typescript-eslint/prefer-namespace-keyword': 'error',

    // Enforce using the nullish coalescing operator instead of logical assignments or chaining.
    // https://typescript-eslint.io/rules/prefer-nullish-coalescing
    '@typescript-eslint/prefer-nullish-coalescing': 'off',

    // Enforce using concise optional chain expressions instead of chained logical ands, negated logical ors, or empty objects.
    // https://typescript-eslint.io/rules/prefer-optional-chain
    '@typescript-eslint/prefer-optional-chain': 'off',

    // Require using Error objects as Promise rejection reasons.
    // https://typescript-eslint.io/rules/prefer-promise-reject-errors
    '@typescript-eslint/prefer-promise-reject-errors': 'off',

    // Require private members to be marked as readonly if they're never modified outside of the constructor.
    // https://typescript-eslint.io/rules/prefer-readonly
    '@typescript-eslint/prefer-readonly': 'off',

    // Require function parameters to be typed as readonly to prevent accidental mutation of inputs.
    // https://typescript-eslint.io/rules/prefer-readonly-parameter-types
    '@typescript-eslint/prefer-readonly-parameter-types': 'off',

    // Enforce using type parameter when calling Array#reduce instead of using a type assertion.
    // https://typescript-eslint.io/rules/prefer-reduce-type-parameter
    '@typescript-eslint/prefer-reduce-type-parameter': 'off',

    // Enforce RegExp#exec over String#match if no global flag is provided.
    // https://typescript-eslint.io/rules/prefer-regexp-exec
    '@typescript-eslint/prefer-regexp-exec': 'off',

    // Enforce that this is used when only this type is returned.
    // https://typescript-eslint.io/rules/prefer-return-this-type
    '@typescript-eslint/prefer-return-this-type': 'off',

    // Enforce using String#startsWith and String#endsWith over other equivalent methods of checking substrings.
    // https://typescript-eslint.io/rules/prefer-string-starts-ends-with
    '@typescript-eslint/prefer-string-starts-ends-with': 'off',

    // Require any function or method that returns a Promise to be marked async.
    // https://typescript-eslint.io/rules/promise-function-async
    '@typescript-eslint/promise-function-async': 'off',

    // Enforce that get() types should be assignable to their equivalent set() type.
    // https://typescript-eslint.io/rules/related-getter-setter-pairs
    '@typescript-eslint/related-getter-setter-pairs': 'off',

    // Require Array#sort and Array#toSorted calls to always provide a compareFunction.
    // https://typescript-eslint.io/rules/require-array-sort-compare
    '@typescript-eslint/require-array-sort-compare': 'off',

    // Disallow async functions which do not return promises and have no await expression.
    // https://typescript-eslint.io/rules/require-await
    '@typescript-eslint/require-await': 'off',

    // Require both operands of addition to be the same type and be bigint, number, or string.
    // https://typescript-eslint.io/rules/restrict-plus-operands
    '@typescript-eslint/restrict-plus-operands': 'off',

    // Enforce template literal expressions to be of string type.
    // https://typescript-eslint.io/rules/restrict-template-expressions
    '@typescript-eslint/restrict-template-expressions': 'off',

    // Enforce consistent awaiting of returned promises.
    // https://typescript-eslint.io/rules/return-await
    '@typescript-eslint/return-await': ['error', 'in-try-catch'],

    // Disallow certain types in boolean expressions.
    // https://typescript-eslint.io/rules/strict-boolean-expressions
    '@typescript-eslint/strict-boolean-expressions': 'off',

    // Disallow passing a value-returning function in a position accepting a void function.
    // https://typescript-eslint.io/rules/strict-void-return
    '@typescript-eslint/strict-void-return': 'off',

    // Require switch-case statements to be exhaustive.
    // https://typescript-eslint.io/rules/switch-exhaustiveness-check
    '@typescript-eslint/switch-exhaustiveness-check': 'off',

    // Disallow certain triple slash directives in favor of ES6-style import declarations.
    // https://typescript-eslint.io/rules/triple-slash-reference
    '@typescript-eslint/triple-slash-reference': [
      'error',
      {
        lib: 'always',
        path: 'never',
        types: 'prefer-import',
      },
    ],

    // Require type annotations in certain places.
    // https://typescript-eslint.io/rules/typedef
    '@typescript-eslint/typedef': 'off',

    // Enforce unbound methods are called with their expected scope.
    // https://typescript-eslint.io/rules/unbound-method
    '@typescript-eslint/unbound-method': 'off',

    // Disallow two overloads that could be unified into one with a union or an optional/rest parameter.
    // https://typescript-eslint.io/rules/unified-signatures
    '@typescript-eslint/unified-signatures': 'off',

    // Enforce typing arguments in Promise rejection callbacks as unknown.
    // https://typescript-eslint.io/rules/use-unknown-in-catch-callback-variable
    '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
  },
});

export const deprecatedTypescriptEslintRules = defineConfigObject({
  name: 'airbnb/config/typescript/typescript-eslint/deprecated',
  files: tsFiles,
  rules: {
    // Disallow the declaration of empty interfaces.
    // https://typescript-eslint.io/rules/no-empty-interface
    '@typescript-eslint/no-empty-interface': 'off',

    // Disallow literal numbers that lose precision.
    // https://typescript-eslint.io/rules/no-loss-of-precision
    '@typescript-eslint/no-loss-of-precision': 'off',

    // Disallow type aliases.
    // https://typescript-eslint.io/rules/no-type-alias
    '@typescript-eslint/no-type-alias': 'off',

    // Disallow require statements except in import statements.
    // https://typescript-eslint.io/rules/no-var-requires
    '@typescript-eslint/no-var-requires': 'off',

    // Enforce using @ts-expect-error over @ts-ignore.
    // https://typescript-eslint.io/rules/prefer-ts-expect-error
    '@typescript-eslint/prefer-ts-expect-error': 'off',

    // Enforce constituents of a type union/intersection to be sorted alphabetically.
    // https://typescript-eslint.io/rules/sort-type-constituents
    '@typescript-eslint/sort-type-constituents': 'off',
  },
});

export default typescriptEslintRules;
