import {
  configs,
  formatters,
  languages,
  legacyConfigs,
  runtimes,
  strictConfigs,
} from '@/constants/common';

import type { GetConfigUrlParams } from '@/helpers/getConfigUrl';

/**
 * Every answer set the CLI is allowed to produce.
 * It mirrors the rules in `getProgramOptions` and in the prompts of `index.ts`:
 * - `react` strict is only offered for react and next
 * - `typescript` strict is only offered for typescript
 * - `import` strict is always offered
 */

const formatterList = [formatters.PRETTIER, formatters.NONE] as const;
const languageList = [languages.TYPESCRIPT, languages.JAVASCRIPT] as const;
const runtimeList = [runtimes.REACT, runtimes.NEXT, runtimes.NODE] as const;

const getStrictOptions = (
  runtime: (typeof runtimeList)[number],
  language: (typeof languageList)[number],
): (
  typeof strictConfigs.IMPORT | typeof strictConfigs.REACT | typeof strictConfigs.TYPESCRIPT
)[] => [
  strictConfigs.IMPORT,
  ...(runtime === runtimes.NODE ? [] : [strictConfigs.REACT]),
  ...(language === languages.TYPESCRIPT ? [strictConfigs.TYPESCRIPT] : []),
];

const getSubsets = <T>(items: T[]): T[][] =>
  items.reduce<T[][]>((acc, item) => [...acc, ...acc.map((subset) => [...subset, item])], [[]]);

export const extendedCombinations: GetConfigUrlParams[] = runtimeList.flatMap((runtime) =>
  languageList.flatMap((language) =>
    formatterList.flatMap((formatter) =>
      getSubsets(getStrictOptions(runtime, language)).map((strictConfig) => ({
        config: configs.EXTENDED,
        runtime,
        language,
        formatter,
        strictConfig,
        legacyConfig: null as never,
      })),
    ),
  ),
);

export const legacyCombinations: GetConfigUrlParams[] = [
  legacyConfigs.BASE,
  legacyConfigs.REACT,
  legacyConfigs.REACT_HOOKS,
].flatMap((legacyConfig) =>
  languageList.flatMap((language) =>
    formatterList.map((formatter) => ({
      config: configs.LEGACY,
      legacyConfig,
      language,
      formatter,
      runtime: null as never,
      strictConfig: null as never,
    })),
  ),
);
