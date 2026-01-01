import {
  configs,
  formatters,
  languages,
  legacyConfigs,
  packageManagers,
  runtimes,
  stringBooleans,
} from '@/constants';
import getPackageManager from '@/helpers/getPackageManager';
import getProgramOptions from '@/helpers/getProgramOptions';

import type {
  GetArgs,
  GetConfig,
  GetCreateEslintFile,
  GetFormatter,
  GetLanguage,
  GetLegacyConfig,
  GetPackageManagerFromOpts,
  GetRuntime,
  GetSkipInstall,
  GetStrictConfig,
} from '@/helpers/@types/getArgs.types';

// Get Config

const getConfig: GetConfig = (opts) => {
  const { config } = opts;

  if (config === configs.EXTENDED) return configs.EXTENDED;
  if (config === configs.LEGACY) return configs.LEGACY;
  return null;
};

// Get Language

const getLanguage: GetLanguage = (opts) => {
  const { language } = opts;

  if (language === languages.JAVASCRIPT) return languages.JAVASCRIPT;
  if (language === languages.TYPESCRIPT) return languages.TYPESCRIPT;
  return null;
};

// Get Formatter

const getFormatter: GetFormatter = (opts) => {
  const { formatter } = opts;

  if (formatter === formatters.PRETTIER) return formatters.PRETTIER;
  return null;
};

// Get Runtime

const getRuntime: GetRuntime = (opts) => {
  const { runtime } = opts;

  if (
    runtime &&
    ([runtimes.REACT, runtimes.REACT_ROUTER, runtimes.REMIX] as string[]).includes(runtime)
  ) {
    return runtimes.REACT;
  }

  if (runtime === runtimes.NEXT) return runtimes.NEXT;
  if (runtime === runtimes.NODE) return runtimes.NODE;
  return null;
};

// Get Strict Config

const getStrictConfig: GetStrictConfig = (opts) => {
  const { strictConfig } = opts;

  return strictConfig?.length ? strictConfig : null;
};

// Get Legacy Config

const getLegacyConfig: GetLegacyConfig = (opts) => {
  const { legacyConfig } = opts;

  if (legacyConfig === legacyConfigs.BASE) return legacyConfigs.BASE;
  if (legacyConfig === legacyConfigs.REACT) return legacyConfigs.REACT;
  if (legacyConfig === legacyConfigs.REACT_HOOKS) return legacyConfigs.REACT_HOOKS;
  return null;
};

// Get Package Manger from Opts

const getPackageManagerFromOpts: GetPackageManagerFromOpts = async (opts) => {
  const { packageManager } = opts;

  if (packageManager === packageManagers.NPM) return packageManagers.NPM;
  if (packageManager === packageManagers.YARN) return packageManagers.YARN;
  if (packageManager === packageManagers.PNPM) return packageManagers.PNPM;
  if (packageManager === packageManagers.BUN) return packageManagers.BUN;
  return getPackageManager();
};

// Get Eslint File

const getCreateEslintFile: GetCreateEslintFile = (opts) => {
  const { createEslintFile } = opts;

  return createEslintFile ? createEslintFile === stringBooleans.TRUE : null;
};

// Get Skip Install

const getSkipInstall: GetSkipInstall = (opts) => {
  const { skipInstall } = opts;

  return skipInstall ? skipInstall === stringBooleans.TRUE : null;
};

// Get Args

const getArgs: GetArgs = async () => {
  const opts = getProgramOptions();

  return {
    config: getConfig(opts),
    language: getLanguage(opts),
    formatter: getFormatter(opts),
    runtime: getRuntime(opts),
    strictConfig: getStrictConfig(opts),
    legacyConfig: getLegacyConfig(opts),
    packageManager: await getPackageManagerFromOpts(opts),
    createEslintFile: getCreateEslintFile(opts),
    skipInstall: getSkipInstall(opts),
  };
};

export default getArgs;
