import stylistic from '@stylistic/eslint-plugin';

import type { ConfigRaw } from '@/types/common.types';

type GetStylisticLegacyConfigLanguage = 'javascript' | 'typescript' | 'react';

type GetStylisticLegacyConfig = (language: GetStylisticLegacyConfigLanguage) => ConfigRaw;

const getStylisticLegacyConfig: GetStylisticLegacyConfig = (language) => {
  const legacyConfig = stylistic.configs['disable-legacy'];
  const REACT = 'react/';
  const TYPESCRIPT = '@typescript-eslint/';

  const rules = Object.entries(legacyConfig.rules ?? {}).reduce<ConfigRaw['rules'] | null>(
    (acc, [key, value]) => {
      if (language === 'javascript') {
        const condition = !key.startsWith(REACT) && !key.startsWith(TYPESCRIPT);

        return {
          ...acc,
          ...(condition ? { [key]: value } : null),
        };
      }

      if (language === 'typescript') {
        const condition = key.startsWith(TYPESCRIPT);

        return {
          ...acc,
          ...(condition ? { [key]: value } : null),
        };
      }

      if (language === 'react') {
        const condition = key.startsWith(REACT);

        return {
          ...acc,
          ...(condition ? { [key]: value } : null),
        };
      }

      return null;
    },
    {},
  );

  return rules ? { ...legacyConfig, rules } : legacyConfig;
};

export default getStylisticLegacyConfig;
