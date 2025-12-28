import { allFiles, defineConfigObject } from '@/utils';

const nodeGlobalsRules = defineConfigObject({
  name: 'airbnb/config/node/globals',
  files: allFiles,
  rules: {
    // Enforce either Buffer or require("buffer").Buffer
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/buffer.md
    'n/prefer-global/buffer': ['error', 'always'],

    // Enforce either console or require("console")
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/console.md
    'n/prefer-global/console': ['error', 'always'],

    // Enforce either process or require("process")
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/process.md
    'n/prefer-global/process': ['error', 'always'],

    // Enforce either TextDecoder or require("util").TextDecoder
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-decoder.md
    'n/prefer-global/text-decoder': ['error', 'always'],

    // Enforce either TextEncoder or require("util").TextEncoder
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/text-encoder.md
    'n/prefer-global/text-encoder': ['error', 'always'],

    // Enforce either URLSearchParams or require("url").URLSearchParams
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url-search-params.md
    'n/prefer-global/url-search-params': ['error', 'always'],

    // Enforce either URL or require("url").URL
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-global/url.md
    'n/prefer-global/url': ['error', 'always'],
  },
});

export default nodeGlobalsRules;
