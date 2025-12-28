import { allFiles, defineConfigObject } from '@/utils';

const nodePromisesRules = defineConfigObject({
  name: 'airbnb/config/node/promises',
  files: allFiles,
  rules: {
    // Enforce require("dns").promises
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/dns.md
    'n/prefer-promises/dns': 'error',

    // Enforce require("fs").promises
    // https://github.com/eslint-community/eslint-plugin-n/blob/master/docs/rules/prefer-promises/fs.md
    'n/prefer-promises/fs': 'error',
  },
});

export default nodePromisesRules;
