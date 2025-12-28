import nodeBaseRules from '@/rules/node/nodeBase';
import nodeGlobalsRules from '@/rules/node/nodeGlobals';
import nodeNoUnsupportedFeaturesRules from '@/rules/node/nodeNoUnsupportedFeatures';
import nodePromisesRules from '@/rules/node/nodePromises';

const nodeConfig = {
  base: nodeBaseRules,
  globals: nodeGlobalsRules,
  promises: nodePromisesRules,
  noUnsupportedFeatures: nodeNoUnsupportedFeaturesRules,
} as const;

export default nodeConfig;
