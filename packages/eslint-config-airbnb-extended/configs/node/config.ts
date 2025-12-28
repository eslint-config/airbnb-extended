import nodeBaseRules from '@/rules/node/nodeBase';
import nodeGlobalsRules from '@/rules/node/nodeGlobals';
import nodeNoUnsupportedFeaturesRules from '@/rules/node/nodeNoUnsupportedFeatures';
import nodePromisesRules from '@/rules/node/nodePromises';

import type { Linter } from 'eslint';

const nodeConfig = {
  base: nodeBaseRules as Linter.Config,
  globals: nodeGlobalsRules as Linter.Config,
  promises: nodePromisesRules as Linter.Config,
  noUnsupportedFeatures: nodeNoUnsupportedFeaturesRules as Linter.Config,
} satisfies Record<string, Linter.Config>;

export default nodeConfig;
