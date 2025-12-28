import { configs } from 'typescript-eslint';

import getImportSettings from '@/helpers/getImportSettings';
import getStylisticLegacyConfig from '@/helpers/getStylisticLegacyConfig';
import { defineConfigArray, jsFiles, tsFiles, tsFileWithoutReact } from '@/utils';

const baseTypescriptExtensionsConfig = defineConfigArray([
  {
    name: 'airbnb/config/base-typescript-settings-extensions-configurations',
    files: tsFileWithoutReact,
    settings: getImportSettings({ javascript: false, typescript: true, jsx: false }),
  },
  {
    name: 'airbnb/config/base-typescript-disable-legacy-stylistic-ts-config',
    files: tsFiles,
    ...getStylisticLegacyConfig('typescript'),
  },
  {
    ...configs.disableTypeChecked,
    name: 'airbnb/config/base-typescript-disable-type-checked',
    files: jsFiles,
  },
]);

export default baseTypescriptExtensionsConfig;
