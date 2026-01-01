import pc from 'picocolors';

import {
  baseGithubUrl,
  configs,
  eslintConfigName,
  formatters,
  languages,
  subFolders,
} from '@/constants';

import type { GetConfigUrl } from '@/helpers/@types/getConfigUrl.types';

const getConfigUrl: GetConfigUrl = (args) => {
  const { config, language, formatter, strictConfig, runtime, legacyConfig } = args;
  const isLegacy = config === configs.LEGACY;

  const prettierText = formatter === formatters.PRETTIER ? 'prettier' : null;
  const tsOrJsText = language === languages.TYPESCRIPT ? 'ts' : 'js';
  const legacyLanguage = config === configs.EXTENDED ? null : legacyConfig;

  const strictOrDefaultText = (() => {
    if (!strictConfig || strictConfig.length === 0) return [subFolders.DEFAULT];

    const strictFolder = [...strictConfig].sort((a, b) => a.localeCompare(b)).join('-');
    return [subFolders.STRICT, strictFolder];
  })();

  const path = [
    ...(isLegacy ? [configs.LEGACY, legacyLanguage] : [runtime]),
    prettierText,
    tsOrJsText,
    ...strictOrDefaultText,
    eslintConfigName,
  ]
    .filter(Boolean)
    .join('/');

  return {
    path,
    url: pc.blue(`${baseGithubUrl}/${path}`),
  };
};

export default getConfigUrl;
