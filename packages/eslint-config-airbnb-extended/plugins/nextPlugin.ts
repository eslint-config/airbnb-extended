import plugin from '@next/eslint-plugin-next';

import { allFiles, defineConfigPlugin } from '@/utils';

const nextPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/next',
  files: allFiles,
  plugins: {
    '@next/next': plugin,
  },
});

export default nextPlugin;
