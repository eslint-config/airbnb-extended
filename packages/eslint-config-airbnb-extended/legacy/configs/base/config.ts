/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */

import legacyBestPracticesRules from '@/legacy/rules/best-practices';
import legacyErrorsRules from '@/legacy/rules/errors';
import legacyEs6Rules from '@/legacy/rules/es6';
import legacyImportsRules from '@/legacy/rules/imports';
import legacyNodeRules from '@/legacy/rules/node';
import legacyStrictRules from '@/legacy/rules/strict';
import legacyStyleRules from '@/legacy/rules/style';
import legacyVariablesRules from '@/legacy/rules/variables';

import type { Linter } from 'eslint';

const legacyBaseConfig = {
  bestPractices: legacyBestPracticesRules as Linter.Config,
  errors: legacyErrorsRules as Linter.Config,
  es6: legacyEs6Rules as Linter.Config,
  imports: legacyImportsRules as Linter.Config,
  node: legacyNodeRules as Linter.Config,
  strict: legacyStrictRules as Linter.Config,
  style: legacyStyleRules as Linter.Config,
  variables: legacyVariablesRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default legacyBaseConfig;
