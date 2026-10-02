import { defineConfig } from 'vitest/config';

interface BaseConfigOptions {
  name: string;
  root: string;
  coverageInclude: string[];
  testTimeout?: number;
}

/**
 * @see https://vitest.dev/config/
 */
export const defineBaseConfig = (options: BaseConfigOptions): ReturnType<typeof defineConfig> => {
  const { name, root, coverageInclude, testTimeout } = options;

  return defineConfig({
    resolve: {
      alias: [{ find: /^@\//, replacement: `${root}/` }],
    },
    test: {
      name,
      environment: 'node',
      include: ['tests/**/*.test.ts'],
      ...(testTimeout ? { testTimeout } : null),
      clearMocks: true,
      restoreMocks: true,
      coverage: {
        provider: 'v8',
        include: coverageInclude,
        exclude: ['**/*.types.ts', 'tests/**'],
      },
    },
  });
};
