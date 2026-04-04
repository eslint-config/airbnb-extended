import plugin from 'eslint-plugin-react';

import { allFiles, defineConfigPlugin } from '@/utils';

export const reactPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/react',
  files: allFiles,
  plugins: {
    react: plugin,
  },
});
