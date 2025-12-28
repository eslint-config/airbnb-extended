import legacyBaseTypescriptConfig from '@/legacy/configs/base/typescript';
import { allFiles, defineConfigArray, tsExtensionsWithReactDTS, tsFiles } from '@/utils';

const legacyReactTypescriptConfig = defineConfigArray([
  ...legacyBaseTypescriptConfig,
  {
    name: 'airbnb/config/react-configurations/typescript/legacy',
    files: tsFiles,
    rules: {
      // Append 'tsx' to Airbnb 'react/jsx-filename-extension' rule
      // Original: ['.jsx']
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
    },
  },
  {
    name: 'airbnb/config/react-configurations/typescript-settings/legacy',
    files: allFiles,
    settings: {
      // Apply special parsing for TypeScript files
      'import/parsers': {
        '@typescript-eslint/parser': tsExtensionsWithReactDTS,
      },
      // Append 'ts' extensions to Airbnb 'import/resolver' setting
      // Prepend 'mjs' to match shared config
      // Original: ['.js', '.jsx', '.json']
      'import/resolver': {
        node: {
          extensions: [...tsExtensionsWithReactDTS, '.json'],
        },
        typescript: true,
      },
      // Append 'ts' extensions to Airbnb 'import/extensions' setting
      // Original: ['.js', '.mjs', '.jsx']
      'import/extensions': tsExtensionsWithReactDTS,
    },
  },
]);

export default legacyReactTypescriptConfig;
