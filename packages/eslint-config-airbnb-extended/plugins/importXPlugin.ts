import plugin from 'eslint-plugin-import-x';

import { allFiles, defineConfigPlugin } from '@/utils';

import type { ConfigPluginObject } from '@/types/common.types';

export const importXPluginConfig = defineConfigPlugin({
  name: 'airbnb/config/plugin/import-x',
  files: allFiles,
  plugins: {
    'import-x': plugin,
  } as unknown as ConfigPluginObject,
});
