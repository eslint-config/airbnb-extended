import { configs, legacyConfigs, runtimes } from '@cli/constants';

import { subFolders, templateConstants } from '@/lib/constants';
import getAllFolders from '@/lib/getAllFolders';
import getDefaultSubFolders from '@/lib/getDefaultSubFolders';

import type { Folders } from '@/lib/getAllFolders';

type GetFolders = () => ReturnType<typeof getAllFolders>;

const getFolders: GetFolders = () => {
  const folders = {
    [configs.LEGACY]: {
      data: {
        [subFolders.BASE]: {
          data: getDefaultSubFolders({ strict: false }),
          meta: {
            language: legacyConfigs.BASE,
          },
        },
        [subFolders.REACT]: {
          data: getDefaultSubFolders({ strict: false }),
          meta: {
            language: legacyConfigs.REACT,
          },
        },
        [subFolders.REACT_HOOKS]: {
          data: getDefaultSubFolders({ strict: false }),
          meta: {
            language: legacyConfigs.REACT_HOOKS,
          },
        },
      },
      meta: {
        config: configs.LEGACY,
      },
    },
    [runtimes.REACT]: {
      data: getDefaultSubFolders({ strict: true }),
      meta: {
        config: configs.EXTENDED,
        language: runtimes.REACT,
      },
    },
    [runtimes.NEXT]: {
      data: getDefaultSubFolders({ strict: true }),
      meta: {
        config: configs.EXTENDED,
        language: runtimes.NEXT,
      },
    },
    [runtimes.NODE]: {
      data: getDefaultSubFolders({ strict: true }),
      meta: {
        config: configs.EXTENDED,
        language: runtimes.NODE,
      },
    },
  } satisfies Folders;

  return getAllFolders(folders, [templateConstants.FOLDER_NAME]);
};

export default getFolders;
