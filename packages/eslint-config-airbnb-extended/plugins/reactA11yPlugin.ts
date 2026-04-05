import plugin from 'eslint-plugin-jsx-a11y';

import { allFiles, defineConfigPlugin } from '@/utils';

export const reactA11yPlugin = defineConfigPlugin({
  name: 'airbnb/config/plugin/react-a11y',
  files: allFiles,
  plugins: {
    'jsx-a11y': plugin,
  },
});
