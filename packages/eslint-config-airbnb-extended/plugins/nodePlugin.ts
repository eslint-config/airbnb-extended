import plugin from 'eslint-plugin-n';

import { allFiles, defineConfigPlugin } from '@/utils';

export const nodePlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/node',
  files: allFiles,
  plugins: {
    n: plugin,
  },
});
