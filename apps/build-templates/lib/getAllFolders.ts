import type { GetContentParams } from '@/lib/getContent';

interface FolderMeta extends Partial<
  Pick<GetContentParams, 'language' | 'languagePreference' | 'strictConfig'>
> {
  config?: GetContentParams['type'];
  hasPrettier?: NonNullable<GetContentParams['configurations']>['prettier'];
}

interface Folder {
  meta?: FolderMeta;
  data?: Folders;
  cond?: (folder: Required<Pick<Folder, 'meta'>>) => boolean;
}

export type Folders = Record<string, Folder>;

export interface GetFolder {
  path: string;
  meta: FolderMeta;
}

type GetAllFoldersOutput = GetFolder[];

type GetAllFolders = (folders: Folders, prefix: string[], meta?: FolderMeta) => GetAllFoldersOutput;

const getAllFolders: GetAllFolders = (folders, prefix, meta = {}) =>
  Object.entries(folders).reduce<GetAllFoldersOutput>((acc, val) => {
    const [key, value] = val;

    const prefixes = [...prefix, key];
    const condition = value.cond ? value.cond({ meta }) : true;

    const values = (() => {
      if (value.data && condition) {
        return Object.entries(value.data).reduce<GetAllFoldersOutput>((subAcc, subVal) => {
          const [subKey, subValue] = subVal;

          const subFolders = { [subKey]: subValue };
          const subMeta = { ...meta, ...value.meta, ...subValue.meta };
          const subCondition = subValue.cond ? subValue.cond({ meta: subMeta }) : true;

          if (subCondition) subAcc.push(...getAllFolders(subFolders, prefixes, subMeta));

          return subAcc;
        }, []);
      }

      return [
        {
          path: prefixes.join('/'),
          meta,
        },
      ];
    })();

    acc.push(...values);
    return acc;
  }, []);

export default getAllFolders;
