export const jsExtensions = ['.js', '.cjs', '.mjs'];

export const jsExtensionsWithReact = [...jsExtensions, '.jsx'];

export const jsExtensionsResolver = [...jsExtensions, '.json'];

export const jsExtensionsRule = Object.fromEntries(
  Object.values(jsExtensionsWithReact).map((val) => [val.slice(1), 'never']),
);

export const tsExtensions = ['.ts', '.cts', '.mts'];

export const tsExtensionsWithReact = [...tsExtensions, '.tsx'];

export const tsExtensionsWithReactDTS = [...tsExtensionsWithReact, '.d.ts'];

export const tsExtensionsResolver = [...tsExtensions, '.d.ts'];

export const tsExtensionsRule = Object.fromEntries(
  Object.values(tsExtensionsWithReact).map((val) => [val.slice(1), 'never']),
);

// ESLINT CONFIG FILES

export const jsFiles = jsExtensionsWithReact.map((val) => `**/*${val}`);

export const jsFileWithoutReact = jsExtensions.map((val) => `**/*${val}`);

export const tsFiles = tsExtensionsWithReactDTS.map((val) => `**/*${val}`);

export const tsFileWithoutReact = tsExtensionsResolver.map((val) => `**/*${val}`);

export const allFiles = [...jsFiles, ...tsFiles];
