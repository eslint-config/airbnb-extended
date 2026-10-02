import path from 'node:path';

import { describe, expect, it } from 'vitest';

import { getDevDepsList } from '@/helpers/getDevDepsList';

const extensions = 'js,cjs,mjs,ts,cts,mts';

describe('helpers/getDevDepsList', () => {
  it.each(['javascript', 'typescript'] as const)(
    'returns the dev dependency globs for %s',
    async (language) => {
      await expect(JSON.stringify(getDevDepsList(language), null, 2)).toMatchFileSnapshot(
        `./__snapshots__/getDevDepsList.${language}.json`,
      );
    },
  );

  it('uses both javascript and typescript extensions for both languages', () => {
    expect(getDevDepsList('javascript')).toStrictEqual(getDevDepsList('typescript'));
    expect(getDevDepsList('javascript').join('\n')).toContain(`{${extensions}}`);
  });

  it('starts with the test folders', () => {
    expect(getDevDepsList('typescript').slice(0, 5)).toStrictEqual([
      'test/**',
      'tests/**',
      'spec/**',
      '**/__tests__/**',
      '**/__mocks__/**',
    ]);
  });

  it('returns a new array each time', () => {
    const first = getDevDepsList('typescript');
    first.push('changed');

    expect(getDevDepsList('typescript')).not.toContain('changed');
  });

  it('has no duplicated glob', () => {
    const list = getDevDepsList('typescript');

    expect(new Set(list).size).toBe(list.length);
  });

  describe('matches the files that may import dev dependencies', () => {
    const list = getDevDepsList('typescript');
    const matches = (file: string) => list.some((pattern) => path.matchesGlob(file, pattern));

    it.each([
      'tests/foo.ts',
      'src/__tests__/foo.ts',
      'src/foo.test.ts',
      'src/foo.spec.tsx'.replace('.tsx', '.ts'),
      'src/foo_test.js',
      'jest.config.js',
      'packages/app/jest.setup.ts',
      'webpack.config.js',
      'webpack.config.prod.js',
      'rollup.config.mjs',
      'vite.config.ts',
      'vitest.config.mts',
      'tailwind.config.ts',
      'tsdown.config.ts',
      'tsup.config.ts',
      'drizzle.config.ts',
      'eslint.config.mjs',
      'prettier.config.js',
      'lint-staged.config.js',
      'gulpfile.js',
      'Gruntfile.js',
      'karma.conf.js',
      'apps/web/.eslintrc.js',
    ])('matches %s', (file) => {
      expect(matches(file)).toBe(true);
    });

    it.each(['src/index.ts', 'src/components/Button.ts', 'lib/utils.js', 'app/page.ts'])(
      'does not match %s',
      (file) => {
        expect(matches(file)).toBe(false);
      },
    );
  });
});
