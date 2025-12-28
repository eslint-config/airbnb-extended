const customGeneralESLintConfig = [
  {
    name: 'x/general/rules',
    rules: {
      'no-console': 'off',
      'no-void': 'off',
      'consistent-return': 'off',
      'no-array-constructor': 'off',
      'no-underscore-dangle': [
        'error',
        {
          allow: ['_id'],
        },
      ],
      'no-restricted-syntax': [
        'error',
        'ForStatement',
        'ContinueStatement',
        'DoWhileStatement',
        'WhileStatement',
        'WithStatement',
      ],
    },
  },
  {
    name: 'x/general/ts-only',
    files: ['**/*.{ts,cts,mts,tsx}'],
    ignores: ['docs/**/*.{ts,cts,mts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: "Please use the absolute path '@/*' instead.",
            },
          ],
        },
      ],
    },
  },
];

export default customGeneralESLintConfig;
