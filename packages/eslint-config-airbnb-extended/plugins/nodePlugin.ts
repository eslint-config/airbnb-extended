import plugin from 'eslint-plugin-n';

import { allFiles, defineConfigPlugin } from '@/utils';

const nodePlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/node',
  files: allFiles,
  plugins: {
    n: plugin,
  },
});

export default nodePlugin;
