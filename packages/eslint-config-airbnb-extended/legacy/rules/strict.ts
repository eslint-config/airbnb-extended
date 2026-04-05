import { allFiles, defineConfigObject } from '@/utils';

export const legacyStrictRules = defineConfigObject({
  name: 'airbnb/config/strict/legacy',
  files: allFiles,
  rules: {
    // babel inserts `'use strict';` for us
    strict: ['error', 'never'],
  },
});
