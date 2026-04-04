import { allFiles, defineConfigObject } from '@/utils';

export const strictRules = defineConfigObject({
  name: 'airbnb/config/strict',
  files: allFiles,
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
});
