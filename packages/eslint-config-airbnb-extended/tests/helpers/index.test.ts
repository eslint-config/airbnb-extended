import { describe, expect, it } from 'vitest';

import { helpers } from '@/helpers';
import { createAutoTypeScriptImportResolver } from '@/helpers/createAutoTypeScriptImportResolver';
import { getDevDepsList } from '@/helpers/getDevDepsList';
import { getImportSettings } from '@/helpers/getImportSettings';
import * as extensions from '@/utils/extensions';

describe('helpers (public)', () => {
  it('exposes only the public helpers', () => {
    expect(Object.keys(helpers).toSorted((a, b) => a.localeCompare(b))).toStrictEqual([
      'createAutoTypeScriptImportResolver',
      'extensions',
      'getDevDepsList',
      'getImportSettings',
    ]);
  });

  it('does not expose the internal stylistic helper', () => {
    expect(helpers).not.toHaveProperty('getStylisticLegacyConfig');
  });

  it('exposes the real functions', () => {
    expect(helpers.createAutoTypeScriptImportResolver).toBe(createAutoTypeScriptImportResolver);
    expect(helpers.getDevDepsList).toBe(getDevDepsList);
    expect(helpers.getImportSettings).toBe(getImportSettings);
  });

  it('exposes every export of utils/extensions', () => {
    expect(helpers.extensions).toBe(extensions);
    expect(new Set(Object.keys(helpers.extensions))).toStrictEqual(
      new Set([
        'allFiles',
        'jsExtensions',
        'jsExtensionsResolver',
        'jsExtensionsRule',
        'jsExtensionsWithReact',
        'jsFileWithoutReact',
        'jsFiles',
        'tsExtensions',
        'tsExtensionsResolver',
        'tsExtensionsRule',
        'tsExtensionsWithReact',
        'tsExtensionsWithReactDTS',
        'tsFileWithoutReact',
        'tsFiles',
      ]),
    );
  });
});
