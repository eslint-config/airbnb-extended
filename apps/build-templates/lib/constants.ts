export const templateConstants = {
  FOLDER_NAME: 'templates',
} as const;

export const languagePreferences = {
  JAVASCRIPT: 'js',
  TYPESCRIPT: 'ts',
} as const;

// One of the constant in CLI (/packages/create-airbnb-x-config/constants/index.ts) is based on this
export const subFolders = {
  ...languagePreferences,
  DEFAULT: 'default',
  PRETTIER: 'prettier',
  BASE: 'base',
  REACT: 'react',
  REACT_HOOKS: 'react-hooks',
  STRICT: 'strict',
  STRICT_IMPORT: 'import',
  STRICT_IMPORT_REACT: 'import-react',
  STRICT_IMPORT_TYPESCRIPT: 'import-typescript',
  STRICT_IMPORT_REACT_TYPESCRIPT: 'import-react-typescript',
  STRICT_REACT: 'react',
  STRICT_REACT_TYPESCRIPT: 'react-typescript',
  STRICT_TYPESCRIPT: 'typescript',
} as const;
