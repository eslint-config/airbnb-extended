import type { Config } from 'eslint/config';

export type ConfigRaw = Config;

export type ConfigObject = Omit<Config, 'name' | 'files' | 'rules'> & {
  name: NonNullable<Config['name']>;
  files: NonNullable<Config['files']>;
  rules: NonNullable<Config['rules']>;
};

export interface ConfigPlugin extends Pick<Config, 'languageOptions'> {
  name: NonNullable<Config['name']>;
  files: NonNullable<Config['files']>;
  plugins: NonNullable<Config['plugins']>;
}

export type ConfigRules = ConfigObject['rules'];

export type ConfigPluginObject = ConfigPlugin['plugins'];
