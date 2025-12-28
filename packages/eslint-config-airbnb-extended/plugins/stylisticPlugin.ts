import plugin from '@stylistic/eslint-plugin';

import { allFiles, defineConfigPlugin } from '@/utils';

const stylisticPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/stylistic',
  files: allFiles,
  plugins: {
    '@stylistic': plugin,
  },
});

export default stylisticPlugin;
