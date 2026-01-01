import plugin from 'eslint-plugin-react';

import { allFiles, defineConfigPlugin } from '@/utils';

const reactPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/react',
  files: allFiles,
  plugins: {
    react: plugin,
  },
});

export default reactPlugin;
