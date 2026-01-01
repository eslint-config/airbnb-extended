import config from '@airbnb-extended/eslint-config/base';
import {
  defineConfig,
  getNoExtraneousDependenciesRule,
} from '@airbnb-extended/eslint-config/utils';

export default defineConfig([
  ...config,
  {
    name: 'x/import-x/modify-no-extraneous-dependencies',
    rules: {
      'import-x/no-extraneous-dependencies': getNoExtraneousDependenciesRule([
        'vitepress',
        'vitepress-plugin-group-icons',
      ]),
    },
  },
]);
