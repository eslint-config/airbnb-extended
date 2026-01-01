import { runtimes, strictConfigs } from '@cli/constants';

import { languagePreferences, subFolders } from '@/lib/constants';

import type { Folders } from '@/lib/getAllFolders';

const strictDefaultSubFolders = {
  [subFolders.STRICT]: {
    data: {
      [subFolders.STRICT_IMPORT]: {
        meta: {
          strictConfig: [strictConfigs.IMPORT],
        },
      },
      [subFolders.STRICT_IMPORT_REACT]: {
        meta: {
          strictConfig: [strictConfigs.IMPORT, strictConfigs.REACT],
        },
        cond: ({ meta }) => {
          if (meta.language) {
            return ([runtimes.REACT, runtimes.NEXT] as string[]).includes(meta.language);
          }

          return false;
        },
      },
      [subFolders.STRICT_IMPORT_TYPESCRIPT]: {
        meta: {
          strictConfig: [strictConfigs.IMPORT, strictConfigs.TYPESCRIPT],
        },
        cond: ({ meta }) => meta.languagePreference === languagePreferences.TYPESCRIPT,
      },
      [subFolders.STRICT_IMPORT_REACT_TYPESCRIPT]: {
        meta: {
          strictConfig: [strictConfigs.IMPORT, strictConfigs.REACT, strictConfigs.TYPESCRIPT],
        },
        cond: ({ meta }) => {
          if (meta.language) {
            const tsCond = meta.languagePreference === languagePreferences.TYPESCRIPT;
            const reactCond = ([runtimes.REACT, runtimes.NEXT] as string[]).includes(meta.language);

            return tsCond && reactCond;
          }

          return false;
        },
      },
      [subFolders.STRICT_REACT]: {
        meta: {
          strictConfig: [strictConfigs.REACT],
        },
        cond: ({ meta }) => {
          if (meta.language) {
            return ([runtimes.REACT, runtimes.NEXT] as string[]).includes(meta.language);
          }

          return false;
        },
      },
      [subFolders.STRICT_REACT_TYPESCRIPT]: {
        meta: {
          strictConfig: [strictConfigs.REACT, strictConfigs.TYPESCRIPT],
        },
        cond: ({ meta }) => {
          if (meta.language) {
            const tsCond = meta.languagePreference === languagePreferences.TYPESCRIPT;
            const reactCond = ([runtimes.REACT, runtimes.NEXT] as string[]).includes(meta.language);

            return tsCond && reactCond;
          }

          return false;
        },
      },
      [subFolders.STRICT_TYPESCRIPT]: {
        meta: {
          strictConfig: [strictConfigs.TYPESCRIPT],
        },
        cond: ({ meta }) => meta.languagePreference === languagePreferences.TYPESCRIPT,
      },
    },
    meta: {},
  },
} satisfies Folders;

interface GetDefaultSubFoldersParams {
  strict: boolean;
}

type GetDefaultSubFolders = (params: GetDefaultSubFoldersParams) => Folders;

const getDefaultSubFolders: GetDefaultSubFolders = ({ strict }) => {
  const defaultFolders = {
    ...(strict ? strictDefaultSubFolders : null),
    [subFolders.DEFAULT]: {
      meta: {},
    },
  };

  const defaultLanguagePreferencesSubFolders = {
    [subFolders.JAVASCRIPT]: {
      data: defaultFolders,
      meta: {
        languagePreference: languagePreferences.JAVASCRIPT,
      },
    },
    [subFolders.TYPESCRIPT]: {
      data: defaultFolders,
      meta: {
        languagePreference: languagePreferences.TYPESCRIPT,
      },
    },
  } satisfies Folders;

  return {
    ...defaultLanguagePreferencesSubFolders,
    [subFolders.PRETTIER]: {
      data: defaultLanguagePreferencesSubFolders,
      meta: {
        hasPrettier: true,
      },
    },
  } satisfies Folders;
};

export default getDefaultSubFolders;
