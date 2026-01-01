import { configs, legacyConfigs, runtimes } from '@cli/constants';

import {
  defaultConfig,
  gitignoreCode,
  imports,
  jsConfig,
  nodeConfig,
  prettierConfig,
  reactConfig,
  startingComments,
  typescriptConfig,
} from '@/lib/configs';
import { languagePreferences } from '@/lib/constants';
import contentFormatter from '@/lib/contentFormatter';

import type { strictConfigs } from '@cli/constants';
import type { ValueOf } from '@cli/types/lib.types';

interface GetContentConfigurations {
  prettier: boolean;
}

export interface GetContentParams {
  type: ValueOf<typeof configs>;
  language: ValueOf<typeof runtimes> | ValueOf<typeof legacyConfigs>;
  languagePreference: ValueOf<typeof languagePreferences>;
  configurations: GetContentConfigurations;
  strictConfig: ValueOf<typeof strictConfigs>[];
}

type GetContent = (params: GetContentParams) => string;

const getContent: GetContent = (params) => {
  const { type, language, languagePreference, configurations } = params;
  const isLegacy = type === configs.LEGACY;

  const reactArray =
    (isLegacy &&
      ([legacyConfigs.REACT, legacyConfigs.REACT_HOOKS] as string[]).includes(language)) ||
    (!isLegacy && ([runtimes.REACT, runtimes.NEXT] as string[]).includes(language))
      ? [...reactConfig(params), '']
      : [];

  const typescriptArray =
    languagePreference === languagePreferences.TYPESCRIPT ? [...typescriptConfig(params), ''] : [];

  const nodeArray = !isLegacy && language === runtimes.NODE ? [...nodeConfig, ''] : [];

  const prettierArray = configurations.prettier ? [...prettierConfig, ''] : [];

  const defaultConfigArray = [...defaultConfig(params), ''];

  const content = contentFormatter([
    ...startingComments,
    '',
    ...imports(params),
    '',
    ...gitignoreCode,
    '',
    ...jsConfig(params),
    '',
    ...reactArray,
    ...nodeArray,
    ...typescriptArray,
    ...prettierArray,
    ...defaultConfigArray,
  ]);

  return content.join('\n');
};

export default getContent;
