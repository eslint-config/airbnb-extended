import nextPlugin from '@next/eslint-plugin-next';
import stylisticPlugin from '@stylistic/eslint-plugin';
import importXPlugin from 'eslint-plugin-import-x';
import reactJsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import nodePlugin from 'eslint-plugin-n';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import { plugin as typescriptEslintPlugin } from 'typescript-eslint';

import importsRules, { deprecatedImportsRules } from '@/rules/imports';
import nextBaseRules from '@/rules/next/nextBase';
import nextCoreWebVitalsRules from '@/rules/next/nextCoreWebVitals';
import nodeBaseRules, { deprecatedNodeBaseRules } from '@/rules/node/nodeBase';
import nodeGlobalsRules from '@/rules/node/nodeGlobals';
import nodeNoUnsupportedFeaturesRules from '@/rules/node/nodeNoUnsupportedFeatures';
import nodePromisesRules from '@/rules/node/nodePromises';
import reactBaseRules, { deprecatedReactBaseRules } from '@/rules/react/react';
import reactHooksRules from '@/rules/react/reactHooks';
import reactJsxA11yRules, { deprecatedReactJsxA11yRules } from '@/rules/react/reactJsxA11y';
import reactStylisticRules, { deprecatedReactStylisticRules } from '@/rules/react/reactStylistic';
import stylisticRules, { deprecatedStylisticRules } from '@/rules/stylistic';
import typescriptEslintRules, {
  deprecatedTypescriptEslintRules,
} from '@/rules/typescript/typescriptEslint';
import typescriptStylisticRules from '@/rules/typescript/typescriptStylistic';

const getRulesArray = (prefix: string, arr: string[]) =>
  arr.filter((rule) => rule.startsWith(prefix));

const checkImportsUpdates = async () => {
  const prefix = 'import-x/';

  const localRules = getRulesArray(prefix, Object.keys(importsRules.rules));
  const deprecatedLocalRules = getRulesArray(prefix, Object.keys(deprecatedImportsRules.rules));
  const remoteRules = Object.keys(importXPlugin.rules);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`Import X Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkNodeUpdates = async () => {
  const prefix = 'n/';

  const localRules = getRulesArray(prefix, [
    ...Object.keys(nodeBaseRules.rules),
    ...Object.keys(nodeGlobalsRules.rules),
    ...Object.keys(nodePromisesRules.rules),
    ...Object.keys(nodeNoUnsupportedFeaturesRules.rules),
  ]);

  const deprecatedLocalRules = getRulesArray(prefix, Object.keys(deprecatedNodeBaseRules.rules));
  const remoteRules = nodePlugin.rules ? Object.keys(nodePlugin.rules) : [];

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`Node Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactUpdates = async () => {
  const prefix = 'react/';

  const localRules = getRulesArray(prefix, Object.keys(reactBaseRules.rules));
  const deprecatedLocalRules = getRulesArray(prefix, Object.keys(deprecatedReactBaseRules.rules));
  const remoteRules = Object.keys(reactPlugin.rules);

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`React Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactJsxA11yUpdates = async () => {
  const prefix = 'jsx-a11y/';

  const localRules = getRulesArray(prefix, Object.keys(reactJsxA11yRules.rules));
  const deprecatedLocalRules = getRulesArray(
    prefix,
    Object.keys(deprecatedReactJsxA11yRules.rules),
  );

  const remoteRules = reactJsxA11yPlugin.rules ? Object.keys(reactJsxA11yPlugin.rules) : [];

  if (localRules.length + deprecatedLocalRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter(
    (item) => ![...localRules, ...deprecatedLocalRules].includes(`${prefix}${item}`),
  );

  throw new Error(`React JSX A11y Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkReactHooksUpdates = async () => {
  const prefix = 'react-hooks/';

  const localRules = getRulesArray(prefix, Object.keys(reactHooksRules.rules));
  const remoteRules = Object.keys(reactHooksPlugin.rules);

  // FIXME: ISSUE
  if (localRules.length !== remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`React Hooks Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkNextUpdates = async () => {
  const prefix = '@next/next/';

  const localRules = [
    ...new Set(
      getRulesArray(prefix, [
        ...Object.keys(nextBaseRules.rules),
        ...Object.keys(nextCoreWebVitalsRules.rules),
      ]),
    ),
  ];

  const remoteRules = Object.keys(nextPlugin.rules);

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`Next Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkStylisticUpdates = async () => {
  const prefix = '@stylistic/';

  const localRules = getRulesArray(prefix, [
    ...new Set([
      ...Object.keys(stylisticRules.rules),
      ...Object.keys(deprecatedStylisticRules.rules),
      ...Object.keys(typescriptStylisticRules.rules),
      ...Object.keys(reactStylisticRules.rules),
      ...Object.keys(deprecatedReactStylisticRules.rules),
    ]),
  ]);

  const remoteRules = Object.keys(stylisticPlugin.rules);

  if (localRules.length === remoteRules.length) return true;

  const updatedRules = remoteRules.filter((item) => !localRules.includes(`${prefix}${item}`));

  throw new Error(`Stylistic Plugin Updated with ${updatedRules.join(', ')}`);
};

const checkTypescriptEslintUpdates = async () => {
  const prefix = '@typescript-eslint/';

  const localRules = getRulesArray(prefix, [
    ...Object.keys(typescriptEslintRules.rules),
    ...Object.keys(deprecatedTypescriptEslintRules.rules),
  ]);

  const remoteRules =
    'rules' in typescriptEslintPlugin && typescriptEslintPlugin.rules
      ? Object.keys(typescriptEslintPlugin.rules)
      : [];

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
