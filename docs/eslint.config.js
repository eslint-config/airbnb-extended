import config from '@airbnb-extended/eslint-config/base';
import { defineConfig, getDevDepsList } from '@airbnb-extended/eslint-config/utils';

export default defineConfig([
  ...config,
  {
    name: 'x/import-x/modify-no-extraneous-dependencies',
    rules: {
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: getDevDepsList('typescript'),
          optionalDependencies: false,
          whitelist: ['vitepress', 'vitepress-plugin-group-icons'],
        },
      ],
    },
  },
]);
