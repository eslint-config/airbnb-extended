import config from '@airbnb-extended/eslint-config/base';

export default [...config, 
   // Disable Dependencies Import Issue for Templates ESLint Files
  {
    name: 'x/import-x/disable-extraneous-deps',
    files: ['templates/**/eslint.config.mjs'],
    rules: {
      'import-x/no-extraneous-dependencies': 'off',
    },
  },
];
