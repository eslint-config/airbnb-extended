import bestPracticesRules from '@/rules/best-practices';
import errorsRules from '@/rules/errors';
import es6Rules from '@/rules/es6';
import importsRules from '@/rules/imports';
import strictRules from '@/rules/strict';
import styleRules from '@/rules/style';
import stylisticRules from '@/rules/stylistic';
import variablesRules from '@/rules/variables';

import type { Linter } from 'eslint';

const baseConfig = {
  bestPractices: bestPracticesRules as Linter.Config,
  errors: errorsRules as Linter.Config,
  es6: es6Rules as Linter.Config,
  imports: importsRules as Linter.Config,
  strict: strictRules as Linter.Config,
  style: styleRules as Linter.Config,
  stylistic: stylisticRules as Linter.Config,
  variables: variablesRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default baseConfig;
