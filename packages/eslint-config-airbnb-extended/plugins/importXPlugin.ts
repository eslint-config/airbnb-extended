import plugin from 'eslint-plugin-import-x';

import { allFiles, defineConfigPlugin } from '@/utils';

export const importXPluginConfig = defineConfigPlugin({
  name: 'airbnb/config/plugin/import-x',
  files: allFiles,
  plugins: {
    'import-x': plugin,
  },
});
