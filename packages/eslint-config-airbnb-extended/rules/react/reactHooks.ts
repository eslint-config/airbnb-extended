import { allFiles, defineConfigObject } from '@/utils';

export const reactHooksRules = defineConfigObject({
  name: 'airbnb/config/react-hooks',
  files: allFiles,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  rules: {
    // Validates that dependency arrays for React hooks contain all necessary dependencies.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/exhaustive-deps
    'react-hooks/exhaustive-deps': 'error',

    // Validates that components and hooks follow the Rules of Hooks.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/rules-of-hooks
    'react-hooks/rules-of-hooks': 'error',

    // Validates against higher order functions defining nested components or hooks. Components and hooks should be defined at the module level.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/component-hook-factories
    'react-hooks/component-hook-factories': 'error',

    // Validates the compiler configuration options.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/config
    'react-hooks/config': 'error',

    // Validates usage of Error Boundaries instead of try/catch for errors in child components.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/error-boundaries
    'react-hooks/error-boundaries': 'error',

    // Validates configuration of gating mode.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/gating
    'react-hooks/gating': 'error',

    // Validates against assignment/mutation of globals during render, part of ensuring that side effects must run outside of render.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/globals
    'react-hooks/globals': 'error',

    // Validates against mutating props, state, and other values that are immutable.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
    'react-hooks/immutability': 'error',

    // Validates against usage of libraries which are incompatible with memoization (manual or automatic).
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/incompatible-library
    'react-hooks/incompatible-library': 'warn',

    // Validates that existing manual memoization is preserved by the compiler. React Compiler will only compile components and hooks if its inference matches or exceeds the existing manual memoization.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/preserve-manual-memoization
    'react-hooks/preserve-manual-memoization': 'error',

    // Validates that components/hooks are pure by checking that they do not call known-impure functions.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/purity
    'react-hooks/purity': 'error',

    // Validates correct usage of refs, not reading/writing during render. See the “pitfalls” section in useRef() usage.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/refs
    'react-hooks/refs': 'error',

    // Validates against calling setState synchronously in an effect, which can lead to re-renders that degrade performance.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-effect
    'react-hooks/set-state-in-effect': 'error',

    // Validates against unconditionally setting state during render, which can trigger additional renders and potential infinite render loops.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/set-state-in-render
    'react-hooks/set-state-in-render': 'error',

    // Validates that components are static, not recreated every render. Components that are recreated dynamically can reset state and trigger excessive re-rendering.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/static-components
    'react-hooks/static-components': 'error',

    // Validates against syntax that React Compiler does not support. If you need to, you can still use this syntax outside of React, such as in a standalone utility function.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/unsupported-syntax
    'react-hooks/unsupported-syntax': 'warn',

    // Validates that the useMemo hook is used with a return value. See useMemo docs for more information.
    // https://react.dev/reference/eslint-plugin-react-hooks/lints/use-memo
    'react-hooks/use-memo': 'error',
  },
});
