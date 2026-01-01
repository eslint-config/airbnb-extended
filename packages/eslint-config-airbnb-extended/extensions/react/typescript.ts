import getImportSettings from '@/helpers/getImportSettings';
import { defineConfigArray, tsFiles } from '@/utils';

const reactTypescriptExtensionsConfig = defineConfigArray([
  {
    name: 'airbnb/config/react-typescript-react',
    files: tsFiles,
    rules: {
      // only .jsx and .tsx files may have JSX
      // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
    },
  },
  {
    name: 'airbnb/config/react-typescript-settings-extensions-configurations',
    files: tsFiles,
    settings: getImportSettings({ javascript: false, typescript: true, jsx: true }),
  },
]);

export default reactTypescriptExtensionsConfig;
