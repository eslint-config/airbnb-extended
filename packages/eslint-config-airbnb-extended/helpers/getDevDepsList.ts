import { jsExtensions, tsExtensions } from '@/utils';

type GetDevDepsList = (language: 'javascript' | 'typescript') => string[];

const getDevDepsList: GetDevDepsList = (language) => {
  const extensions = (() => {
    if (language === 'javascript') {
      return [...jsExtensions, ...tsExtensions].map((ext) => ext.slice(1)).join(',');
    }

    if (language === 'typescript') {
      return [...jsExtensions, ...tsExtensions].map((ext) => ext.slice(1)).join(',');
    }

    return [];
  })();

  return [
    'test/**',
    'tests/**',
    'spec/**',
    '**/__tests__/**',
    '**/__mocks__/**',
    `test.{${extensions}}`,
    `test-*.{${extensions}}`,
    `**/*{.,_}{test,spec}.{${extensions}}`,
    `**/jest.config.{${extensions}}`,
    `**/jest.setup.{${extensions}}`,
    `**/vue.config.{${extensions}}`,
    `**/webpack.config.{${extensions}}`,
    `**/webpack.config.*.{${extensions}}`,
    `**/rollup.config.{${extensions}}`,
    `**/rollup.config.*.{${extensions}}`,
    `**/gulpfile.{${extensions}}`,
    `**/gulpfile.*.{${extensions}}`,
    `**/Gruntfile{,.{${extensions}}}`,
    `**/protractor.conf.{${extensions}}`,
    `**/protractor.conf.*.{${extensions}}`,
    `**/karma.conf.{${extensions}}`,
    `**/.eslintrc.{${extensions}}`,
    `**/*.eslint.{${extensions}}`,
    `**/eslint.config.{${extensions}}`,
    `**/prettier.config.{${extensions}}`,
    `**/lint-staged.config.{${extensions}}`,
    `**/vite.config.{${extensions}}`,
    `**/vitest.config.{${extensions}}`,
    `**/tailwind.config.{${extensions}}`,
    `**/tsdown.config.{${extensions}}`,
    `**/tsup.config.{${extensions}}`,
  ];
};

export default getDevDepsList;
