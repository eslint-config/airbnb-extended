import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createNodeResolver } from 'eslint-plugin-import-x';

import {
  jsExtensions,
  jsExtensionsWithReact,
  tsExtensionsResolver,
  tsExtensionsWithReactDTS,
} from '@/utils';

import type { ConfigRaw } from '@/types/common.types';

interface GetImportSettingsParams {
  javascript: boolean;
  typescript: boolean;
  jsx: boolean;
}

type GetImportSettings = (params: GetImportSettingsParams) => ConfigRaw['settings'];

const getImportSettings: GetImportSettings = (params) => {
  const { javascript, typescript, jsx } = params;

  const extensions = (() => {
    if (jsx) {
      if (javascript) return jsExtensionsWithReact;
      if (typescript) return tsExtensionsWithReactDTS;
      return [];
    }

    if (javascript) return jsExtensions;
    if (typescript) return tsExtensionsResolver;
    return [];
  })();

  return {
    'import-x/resolver-next': [
      createNodeResolver({ extensions: [...extensions, '.json'] }),
      ...(typescript
        ? [
            createTypeScriptImportResolver({
              alwaysTryTypes: true,
            }),
          ]
        : []),
    ],
    'import-x/extensions': extensions,
    ...(typescript
      ? {
          // Apply special parsing for TypeScript files
          'import-x/parsers': {
            '@typescript-eslint/parser': extensions,
          },
          // Resolve type definition packages
          'import-x/external-module-folders': ['node_modules', 'node_modules/@types'],
        }
      : null),
  };
};

export default getImportSettings;
