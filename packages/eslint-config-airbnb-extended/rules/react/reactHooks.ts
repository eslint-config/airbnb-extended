import { allFiles, defineConfigObject } from '@/utils';

const reactHooksRules = defineConfigObject({
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
  },
});

export default reactHooksRules;
