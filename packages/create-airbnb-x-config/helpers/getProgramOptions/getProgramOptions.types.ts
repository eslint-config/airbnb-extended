import type { runtimes } from '@/constants';
import type {
  ConfigType,
  FormatterType,
  LanguageType,
  LegacyConfigType,
  PackageManagerType,
  RuntimeType,
  StrictConfigType,
  StringBooleanType,
} from '@/constants/@types/index.types';

interface ProgramOptions {
  config: ConfigType;
  language: LanguageType;
  formatter: FormatterType;
  runtime: Exclude<RuntimeType, typeof runtimes.REACT_ROUTER | typeof runtimes.REMIX>;
  strictConfig: StrictConfigType[];
  legacyConfig: LegacyConfigType;
  packageManager: PackageManagerType;
  createEslintFile: StringBooleanType | true;
  skipInstall: StringBooleanType | true;
}

export type PartialProgramOptions = Partial<ProgramOptions>;

export type GetProgramOptionsOutput = Partial<
  Omit<ProgramOptions, 'createEslintFile' | 'skipInstall'> & {
    createEslintFile: StringBooleanType;
    skipInstall: StringBooleanType;
  }
>;

export type GetProgramOptions = () => GetProgramOptionsOutput;
