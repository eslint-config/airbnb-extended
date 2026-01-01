import plugin from 'eslint-plugin-react-hooks';

import { allFiles, defineConfigPlugin } from '@/utils';

import type { ConfigPluginObject } from '@/types/common.types';

const reactHooksPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/react-hooks',
  files: allFiles,
  plugins: {
    'react-hooks': plugin,
  } as ConfigPluginObject,
});

export default reactHooksPlugin;
