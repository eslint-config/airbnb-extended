import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { rootPath } from '@/utils';

describe('utils/strings/paths', () => {
  it('is the absolute path of the folder the CLI runs in', () => {
    expect(path.isAbsolute(rootPath)).toBe(true);
    expect(rootPath).toBe(path.resolve(process.cwd()));
  });

  it('has no trailing separator, so it can be joined with a slash', () => {
    expect(rootPath.endsWith(path.sep)).toBe(false);
  });
});
