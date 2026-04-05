import { parser, plugin } from 'typescript-eslint';

import { allFiles, defineConfigPlugin } from '@/utils';

export const typescriptEslintPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/typescript-eslint',
  files: allFiles,
  plugins: {
    '@typescript-eslint': plugin,
  },
  languageOptions: {
    parser,
  },
});
