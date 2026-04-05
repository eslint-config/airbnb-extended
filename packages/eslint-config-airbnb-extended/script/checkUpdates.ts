import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importXPlugin from 'eslint-plugin-import-x';
import reactJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { plugin as typescriptEslintPlugin } from 'typescript-eslint';

import { deprecatedImportsRules, importsRules } from '@/rules/imports';
import { nextBaseRules } from '@/rules/next/nextBase';
import { nextCoreWebVitalsRules } from '@/rules/next/nextCoreWebVitals';
import { deprecatedNodeBaseRules, nodeBaseRules } from '@/rules/node/nodeBase';
import { nodeGlobalsRules } from '@/rules/node/nodeGlobals';
import { nodeNoUnsupportedFeaturesRules } from '@/rules/node/nodeNoUnsupportedFeatures';
import { nodePromisesRules } from '@/rules/node/nodePromises';
import { deprecatedReactBaseRules, reactBaseRules } from '@/rules/react/react';
import { reactHooksRules } from '@/rules/react/reactHooks';
import { deprecatedReactJsxA11yRules, reactJsxA11yRules } from '@/rules/react/reactJsxA11y';
import {
  deprecatedReactStylisticRules,
  experimentalReactStylisticRules,
  reactStylisticRules,
} from '@/rules/react/reactStylistic';
import { experimentalStylisticRules, stylisticRules } from '@/rules/stylistic';
import {
  deprecatedTypescriptEslintRules,
  typescriptEslintRules,
} from '@/rules/typescript/typescriptEslint';
import { typescriptStylisticRules } from '@/rules/typescript/typescriptStylistic';

const getRulesArray = (prefix: string, arr: string[]) =>
  arr.filter((rule) => rule.startsWith(prefix));

const getRules = (obj: Partial<Record<'rules', unknown>>) => Object.keys(obj.rules ?? {});

const checkImportsUpdates = async () => {
  const prefix = 'import-x/';

  const localRules = getRulesArray(prefix, getRules(importsRules));
  const deprecatedLocalRules = getRulesArray(prefix, getRules(deprecatedImportsRules));
  const remoteRules = getRules(importXPlugin);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`Import X Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkNodeUpdates = async () => {
  const prefix = 'n/';

  const localRules = getRulesArray(prefix, [
    ...getRules(nodeBaseRules),
    ...getRules(nodeGlobalsRules),
    ...getRules(nodePromisesRules),
    ...getRules(nodeNoUnsupportedFeaturesRules),
  ]);

  const deprecatedLocalRules = getRulesArray(prefix, getRules(deprecatedNodeBaseRules));
  const remoteRules = getRules(nodePlugin);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`Node Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactUpdates = async () => {
  const prefix = 'react/';

  const localRules = getRulesArray(prefix, getRules(reactBaseRules));
  const deprecatedLocalRules = getRulesArray(prefix, getRules(deprecatedReactBaseRules));
  const remoteRules = getRules(reactPlugin);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`React Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactJsxA11yUpdates = async () => {
  const prefix = 'jsx-a11y/';

  const localRules = getRulesArray(prefix, getRules(reactJsxA11yRules));
  const deprecatedLocalRules = getRulesArray(prefix, getRules(deprecatedReactJsxA11yRules));
  const remoteRules = getRules(reactJsxA11yPlugin);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`React JSX A11y Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactHooksUpdates = async () => {
  const prefix = 'react-hooks/';

  // FIXME REGULAR CHECKS TO REACT SITE
  const ignoredRules = new Set([
    'hooks',
    'capitalized-calls',
    'void-use-memo',
    'memoized-effect-dependencies',
    'no-deriving-state-in-effects',
    'invariant',
    'todo',
    'syntax',
    'rule-suppression',
    'automatic-effect-dependencies',
    'fire',
    'fbt',
  ]);

  const localRules = getRulesArray(prefix, getRules(reactHooksRules));
  const remoteRules = getRules(reactHooksPlugin).filter((item) => !ignoredRules.has(item));

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`React Hooks Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkNextUpdates = async () => {
  const prefix = '@next/next/';

  const localRules = [
    ...new Set(
      getRulesArray(prefix, [...getRules(nextBaseRules), ...getRules(nextCoreWebVitalsRules)]),
    ),
  ];

  const remoteRules = getRules(nextPlugin);

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`Next Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkStylisticUpdates = async () => {
  const prefix = '@stylistic/';

  const localRules = getRulesArray(prefix, [
    ...new Set([
      ...getRules(stylisticRules),
      ...getRules(experimentalStylisticRules),
      ...getRules(typescriptStylisticRules),
      ...getRules(reactStylisticRules),
      ...getRules(deprecatedReactStylisticRules),
      ...getRules(experimentalReactStylisticRules),
    ]),
  ]);

  const remoteRules = getRules(stylisticPlugin);

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`Stylistic Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkTypescriptEslintUpdates = async () => {
  const prefix = '@typescript-eslint/';

  const localRules = getRulesArray(prefix, [
    ...getRules(typescriptEslintRules),
    ...getRules(deprecatedTypescriptEslintRules),
  ]);

  const remoteRules = 'rules' in typescriptEslintPlugin ? getRules(typescriptEslintPlugin) : [];

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`Typescript Eslint Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkUpdates = async () => {
  await checkImportsUpdates();
  await checkNodeUpdates();
  await checkReactUpdates();
  await checkReactJsxA11yUpdates();
  await checkReactHooksUpdates();
  await checkNextUpdates();
  await checkStylisticUpdates();
  await checkTypescriptEslintUpdates();

  console.log('Done');

  return true;
};

// noinspection JSIgnoredPromiseFromCall
checkUpdates();
