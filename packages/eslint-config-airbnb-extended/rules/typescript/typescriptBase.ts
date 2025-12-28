import { defineConfigObject, tsFiles } from '@/utils';

const typescriptBaseRules = defineConfigObject({
  name: 'airbnb/config/typescript/base',
  files: tsFiles,
  rules: {
    // The following rules are enabled in Airbnb config, but are already checked (more thoroughly) by the TypeScript compiler
    // Rules are inspired by: https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/eslint-recommended-raw.ts
    // no-var, prefer-const, prefer-rest-params and prefer-spread is already declared in previous configs
    'constructor-super': 'off', // ts(2335) & ts(2377)
    'getter-return': 'off', // ts(2378)
    'no-class-assign': 'off', // ts(2629)
    'no-const-assign': 'off', // ts(2588)
    'no-dupe-args': 'off', // ts(2300)
    'no-dupe-class-members': 'off', // ts(2393) & ts(2300)
    'no-dupe-keys': 'off', // ts(1117)
    'no-func-assign': 'off', // ts(2630)
    'no-import-assign': 'off', // ts(2632) & ts(2540)
    'no-new-symbol': 'off', // ts(7009)
    'no-obj-calls': 'off', // ts(2349)
    'no-redeclare': 'off', // ts(2451)
    'no-setter-return': 'off', // ts(2408)
    'no-this-before-super': 'off', // ts(2376) & ts(17009)
    'no-undef': 'off', // ts(2304) & ts(2552)
    'no-unreachable': 'off', // ts(7027)
    'no-unsafe-negation': 'off', // ts(2365) & ts(2322) & ts(2358)
    'no-with': 'off', // ts(1101) & ts(2410)
    'valid-typeof': 'off',
  },
});

export default typescriptBaseRules;
