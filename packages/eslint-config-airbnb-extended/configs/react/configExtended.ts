import reactConfig from '@/configs/react/config';
import reactStrictRules from '@/rules/react/reactStrict';

import type { Linter } from 'eslint';

const reactConfigExtended = {
  ...reactConfig,
  strict: reactStrictRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default reactConfigExtended;
