import type {
  configs,
  formatters,
  languages,
  legacyConfigs,
  packageManagers,
  runtimes,
  strictConfigs,
  stringBooleans,
} from '@/constants';
import type { ValueOf } from '@/types/lib.types';

export type ConfigType = ValueOf<typeof configs>;

export type LanguageType = ValueOf<typeof languages>;

export type FormatterType = ValueOf<typeof formatters>;

export type RuntimeType = ValueOf<typeof runtimes>;

export type StrictConfigType = ValueOf<typeof strictConfigs>;

export type LegacyConfigType = ValueOf<typeof legacyConfigs>;

export type PackageManagerType = ValueOf<typeof packageManagers>;

export type StringBooleanType = ValueOf<typeof stringBooleans>;
