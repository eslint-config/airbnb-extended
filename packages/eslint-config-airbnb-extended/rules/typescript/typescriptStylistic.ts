import stylisticRules from '@/rules/stylistic';
import { tsFiles } from '@/utils';

import type { Linter } from 'eslint';

const typescriptStylisticRules = {
  name: 'airbnb/config/typescript/typescript-stylistic',
  files: tsFiles,
  rules: {
    // require trailing commas in multiline object literals
    // https://eslint.style/rules/comma-dangle
    '@stylistic/comma-dangle': [
      stylisticRules.rules['@stylistic/comma-dangle'][0],
      {
        ...stylisticRules.rules['@stylistic/comma-dangle'][1],
        enums: stylisticRules.rules['@stylistic/comma-dangle'][1].arrays,
        generics: stylisticRules.rules['@stylistic/comma-dangle'][1].arrays,
        tuples: stylisticRules.rules['@stylistic/comma-dangle'][1].arrays,
      },
    ],

    // enforce consistent member delimiter style
    // https://eslint.style/rules/member-delimiter-style
    '@stylistic/member-delimiter-style': 'error',

    // require spaces around operators
    // https://eslint.style/rules/space-infix-ops
    '@stylistic/space-infix-ops': [
      stylisticRules.rules['@stylistic/space-infix-ops'][0],
      {
        ...stylisticRules.rules['@stylistic/space-infix-ops'][1],
        ignoreTypes: false,
      },
    ],

    // enforce consistent spacing in type annotation
    // https://eslint.style/rules/type-annotation-spacing
    '@stylistic/type-annotation-spacing': 'error',

    // enforce consistent spacing inside TypeScript type generics
    // https://eslint.style/rules/type-generic-spacing
    '@stylistic/type-generic-spacing': 'error',

    // Expect space before the type declaration in the named tuple.
    // https://eslint.style/rules/type-named-tuple-spacing
    '@stylistic/type-named-tuple-spacing': 'off',
  },
} satisfies Linter.Config;

export default typescriptStylisticRules;
