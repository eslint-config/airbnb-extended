import { defineConfigObject, tsFiles } from '@/utils';

const legacyTypescriptOverridesRules = defineConfigObject({
  name: 'airbnb/config/typescript/overrides/legacy',
  files: tsFiles,
  rules: {
    // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
    // Some of the rules also fail in TypeScript files, for example: https://github.com/typescript-eslint/typescript-eslint/issues/662#issuecomment-507081586
    // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'constructor-super': 'off',
    'getter-return': 'off',
    'no-const-assign': 'off',
    'no-dupe-args': 'off',
    'no-dupe-class-members': 'off',
    'no-dupe-keys': 'off',
    'no-func-assign': 'off',
    'no-import-assign': 'off',
    'no-new-symbol': 'off',
    'no-obj-calls': 'off',
    'no-redeclare': 'off',
    'no-setter-return': 'off',
    'no-this-before-super': 'off',
    'no-undef': 'off',
    'no-unreachable': 'off',
    'no-unsafe-negation': 'off',
    'valid-typeof': 'off',
    // The following rules are enabled in Airbnb config, but are recommended to be disabled within TypeScript projects
    // See: https://github.com/typescript-eslint/typescript-eslint/blob/13583e65f5973da2a7ae8384493c5e00014db51b/docs/linting/TROUBLESHOOTING.md#eslint-plugin-import
    'import/named': 'off',
    'import/no-named-as-default-member': 'off',
    // Disable `import/no-unresolved`, see README.md for details
    'import/no-unresolved': 'off',
  },
});

export default legacyTypescriptOverridesRules;
