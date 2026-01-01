import { allFiles, defineConfigObject } from '@/utils';

const strictRules = defineConfigObject({
  name: 'airbnb/config/strict',
  files: allFiles,
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
});

export default strictRules;
