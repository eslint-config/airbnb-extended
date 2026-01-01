import type { GetProgramOptionsOutput } from '@/helpers/@types/getProgramOptions.types';
import type { SetNonNullable } from '@/types/lib.types';

// Get Config

export type GetConfig = (opts: GetProgramOptionsOutput) => GetArgsOutput['config'];

// Get Language

export type GetLanguage = (opts: GetProgramOptionsOutput) => GetArgsOutput['language'];

// Get Formatter

export type GetFormatter = (opts: GetProgramOptionsOutput) => GetArgsOutput['formatter'];

// Get Runtime

export type GetRuntime = (opts: GetProgramOptionsOutput) => GetArgsOutput['runtime'];

// Get Strict Config

export type GetStrictConfig = (opts: GetProgramOptionsOutput) => GetArgsOutput['strictConfig'];

// Get Legacy Config

export type GetLegacyConfig = (opts: GetProgramOptionsOutput) => GetArgsOutput['legacyConfig'];

// Get Package Manger

export type GetPackageManagerFromOpts = (
  opts: GetProgramOptionsOutput,
) => Promise<GetArgsOutput['packageManager']>;

// Get Create Eslint File

export type GetCreateEslintFile = (
  opts: GetProgramOptionsOutput,
) => GetArgsOutput['createEslintFile'];

// Get Skip Install

export type GetSkipInstall = (opts: GetProgramOptionsOutput) => GetArgsOutput['skipInstall'];

// Get Args

interface GetArgsOutput {
  config: GetProgramOptionsOutput['config'] | null;
  language: GetProgramOptionsOutput['language'] | null;
  formatter: GetProgramOptionsOutput['formatter'] | null;
  runtime: GetProgramOptionsOutput['runtime'] | null;
  strictConfig: GetProgramOptionsOutput['strictConfig'] | null;
  legacyConfig: GetProgramOptionsOutput['legacyConfig'] | null;
  packageManager: GetProgramOptionsOutput['packageManager'];
  createEslintFile: boolean | null;
  skipInstall: boolean | null;
}

export type GetArgs = () => Promise<GetArgsOutput>;

export type ArgsOutput = SetNonNullable<GetArgsOutput>;
