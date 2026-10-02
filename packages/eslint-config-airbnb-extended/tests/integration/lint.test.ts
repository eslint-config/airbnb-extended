import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

import { createWorkDir, lint, resolveConfig, writeProject } from '@/tests/fixtures/lint';
import { extendedProfiles, legacyProfiles } from '@/tests/fixtures/profiles';

/**
 * Runs the real ESLint with the configs, the same way a generated eslint.config.mjs does.
 * ESLint validates every rule option while it loads the config, so a wrong option or a rule that
 * does not exist fails here.
 */

const badJs = 'var a = 1;\nconsole.log(a == 1)\n';
const badTs = 'var a: number = 1;\nconsole.log(a == 1)\n';
const component = 'const App = () => <div>{1}</div>;\nexport default App;\n';
const aliasImports =
  "import { foo } from '@/foo';\nimport { missing } from '@/missing';\n\nexport default [foo, missing];\n";

let project: { dir: string; remove: () => void };

beforeEach(() => {
  // Some plugins warn about a missing react install or a missing next pages folder in the temp project.
  vi.spyOn(console, 'warn').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

beforeAll(() => {
  project = createWorkDir();
  writeProject(project.dir, {
    'src/aliased.ts': aliasImports,
    'src/aliased.js':
      "import { foo } from './foo.js';\nimport { missing } from './missing.js';\n\nexport default [foo, missing];\n",
    'middleware.ts': 'export {};\n',
    'src/index.cjs': 'module.exports = {};\n',
    'src/index.mjs': 'export {};\n',
  });
});

afterAll(() => {
  project.remove();
});

const lintFile = async (
  config: Parameters<typeof lint>[0]['config'],
  filePath: string,
  code: string,
) => lint({ config, cwd: project.dir, filePath, code });

describe('integration/lint: extended profiles load and lint without config errors', () => {
  const javascriptFiles = [
    ['src/index.js', badJs],
    ['src/index.mjs', 'export {};\n'],
    ['src/index.cjs', 'module.exports = {};\n'],
  ] as const;

  describe.each(Object.entries(extendedProfiles))('%s', (profile, config) => {
    // Typescript syntax needs the typescript parser, which only the "ts" profiles register.
    const files = profile.includes('ts')
      ? [...javascriptFiles, ['src/index.ts', badTs] as const]
      : javascriptFiles;

    it.each(files)('lints %s', async (filePath, code) => {
      const { fatal, messages } = await lintFile(config, filePath, code);

      expect(fatal).toStrictEqual([]);
      expect(
        messages.filter((message) => /Definition for rule|not found/i.test(message.message)),
      ).toStrictEqual([]);
    });
  });

  describe.each(Object.entries(extendedProfiles).filter(([name]) => /react|next/.test(name)))(
    '%s (jsx)',
    (profile, config) => {
      it('lints a jsx component', async () => {
        const isTypescript = profile.includes('ts');
        const { fatal } = await lintFile(
          config,
          isTypescript ? 'src/App.tsx' : 'src/App.jsx',
          component,
        );

        expect(fatal).toStrictEqual([]);
      });
    },
  );
});

describe('integration/lint: legacy profiles load and lint without config errors', () => {
  describe.each(Object.entries(legacyProfiles))('%s', (profile, config) => {
    const files = profile.endsWith('ts')
      ? ([
          ['src/index.js', badJs],
          ['src/index.ts', badTs],
        ] as const)
      : ([['src/index.js', badJs]] as const);

    it.each(files)('lints %s', async (filePath, code) => {
      const { fatal } = await lintFile(config, filePath, code);

      expect(fatal).toStrictEqual([]);
    });
  });
});

describe('integration/lint: reported rules', () => {
  it('base js reports core, stylistic and import problems', async () => {
    const { ruleIds } = await lintFile(extendedProfiles['base js'] ?? [], 'src/index.js', badJs);

    for (const ruleId of ['no-var', 'no-console', 'eqeqeq', '@stylistic/semi']) {
      expect(ruleIds, ruleId).toContain(ruleId);
    }
  });

  it('base ts reports typescript problems and still the base ones', async () => {
    const { ruleIds } = await lintFile(extendedProfiles['base ts'] ?? [], 'src/index.ts', badTs);

    for (const ruleId of [
      'no-var',
      'no-console',
      'eqeqeq',
      '@stylistic/semi',
      '@typescript-eslint/no-inferrable-types',
    ]) {
      expect(ruleIds, ruleId).toContain(ruleId);
    }
  });

  it('react reports react problems for jsx and tsx', async () => {
    const jsx = await lintFile(extendedProfiles['react js'] ?? [], 'src/App.jsx', component);
    const tsx = await lintFile(extendedProfiles['react ts'] ?? [], 'src/App.tsx', component);

    for (const { ruleIds } of [jsx, tsx]) {
      expect(ruleIds).toContain('react/function-component-definition');
      expect(ruleIds).toContain('react/react-in-jsx-scope');
    }
  });

  it('next does not ask for React in scope', async () => {
    const { ruleIds } = await lintFile(extendedProfiles['next ts'] ?? [], 'src/App.tsx', component);

    expect(ruleIds).toContain('react/function-component-definition');
    expect(ruleIds).not.toContain('react/react-in-jsx-scope');
  });

  it('node reports node problems', async () => {
    const { ruleIds } = await lintFile(
      extendedProfiles['node js'] ?? [],
      'src/index.js',
      "const fs = require('fs');\nprocess.exit(1);\n",
    );

    expect(ruleIds).toContain('n/prefer-node-protocol');
    expect(ruleIds).toContain('n/no-process-exit');
  });

  it('legacy base uses the core stylistic rules, not the @stylistic ones', async () => {
    const { ruleIds } = await lintFile(legacyProfiles['legacy base'] ?? [], 'src/index.js', badJs);

    for (const ruleId of ['no-var', 'no-console', 'eqeqeq'])
      expect(ruleIds, ruleId).toContain(ruleId);
    expect(ruleIds.has('@stylistic/semi')).toBe(false);
  });

  it('legacy react reports react problems', async () => {
    const { ruleIds } = await lintFile(
      legacyProfiles['legacy react ts'] ?? [],
      'src/App.tsx',
      component,
    );

    expect(ruleIds).toContain('react/function-component-definition');
    expect(ruleIds).toContain('react/react-in-jsx-scope');
  });
});

describe('integration/lint: import resolution in a typescript project', () => {
  it('resolves the @/ alias of the tsconfig and reports the missing file', async () => {
    const { messages } = await lintFile(
      extendedProfiles['base ts'] ?? [],
      'src/aliased.ts',
      aliasImports,
    );

    const unresolved = messages.filter((message) => message.ruleId === 'import-x/no-unresolved');

    expect(unresolved).toHaveLength(1);
    expect(unresolved[0]?.line).toBe(2);
    expect(unresolved[0]?.message).toContain('@/missing');
  });

  it('resolves relative javascript imports and reports the missing file', async () => {
    const { messages } = await lintFile(
      extendedProfiles['base js'] ?? [],
      'src/aliased.js',
      "import { foo } from './foo.js';\nimport { missing } from './missing.js';\n\nexport default [foo, missing];\n",
    );

    const unresolved = messages.filter((message) => message.ruleId === 'import-x/no-unresolved');

    expect(unresolved).toHaveLength(1);
    expect(unresolved[0]?.line).toBe(2);
  });
});

describe('integration/lint: resolved settings of extended configs', () => {
  it('turns the core stylistic rules off and the @stylistic rules on', async () => {
    const { rules } = await resolveConfig(
      extendedProfiles['base js'] ?? [],
      project.dir,
      'src/index.js',
    );

    expect(rules.semi).toStrictEqual([0]);
    expect(rules['@stylistic/semi']).toStrictEqual([2, 'always']);
  });

  it('uses the typescript-eslint extension rules for typescript files only', async () => {
    const ts = await resolveConfig(extendedProfiles['base ts'] ?? [], project.dir, 'src/index.ts');
    const js = await resolveConfig(extendedProfiles['base ts'] ?? [], project.dir, 'src/index.js');
    const tsRules = ts.rules;
    const jsRules = js.rules;

    expect(tsRules['no-unused-vars']?.[0]).toBe(0);
    expect(tsRules['@typescript-eslint/no-unused-vars']?.[0]).toBe(1);
    expect(jsRules['no-unused-vars']?.[0]).toBe(1);
  });

  it('turns the type checked rules off for javascript files', async () => {
    const { rules } = await resolveConfig(
      extendedProfiles['base ts'] ?? [],
      project.dir,
      'src/index.js',
    );

    expect(rules['@typescript-eslint/await-thenable']).toStrictEqual([0]);
  });

  it('allows .tsx for jsx in typescript and only .jsx in javascript', async () => {
    const ts = await resolveConfig(extendedProfiles['react ts'] ?? [], project.dir, 'src/App.tsx');
    const js = await resolveConfig(extendedProfiles['react js'] ?? [], project.dir, 'src/App.jsx');

    expect(ts.rules['react/jsx-filename-extension']).toStrictEqual([
      2,
      { extensions: ['.jsx', '.tsx'] },
    ]);
    expect(js.rules['react/jsx-filename-extension']).toStrictEqual([2, { extensions: ['.jsx'] }]);
  });

  it('enables the react hooks and a11y rules for react', async () => {
    const { rules } = await resolveConfig(
      extendedProfiles['react ts'] ?? [],
      project.dir,
      'src/App.tsx',
    );

    expect(rules['react-hooks/rules-of-hooks']).toStrictEqual([2]);
    expect(rules['jsx-a11y/alt-text']?.[0]).toBe(2);
    expect(rules['@stylistic/jsx-quotes']).toStrictEqual([2, 'prefer-double']);
  });

  it('does not require a default export in next middleware, but in other files', async () => {
    const middleware = await resolveConfig(
      extendedProfiles['next ts'] ?? [],
      project.dir,
      'middleware.ts',
    );
    const other = await resolveConfig(
      extendedProfiles['next ts'] ?? [],
      project.dir,
      'src/index.ts',
    );

    expect(middleware.rules['import-x/prefer-default-export']).toStrictEqual([0]);
    expect(other.rules['import-x/prefer-default-export']).toStrictEqual([2]);
  });

  it('adds the next rules and removes the react import rule for next', async () => {
    const { rules } = await resolveConfig(
      extendedProfiles['next ts'] ?? [],
      project.dir,
      'middleware.ts',
    );

    expect(rules['react/react-in-jsx-scope']).toStrictEqual([0]);
    expect(rules['@next/next/no-img-element']?.[0]).toBe(1);
  });

  it('adds the strict import rules only when asked', async () => {
    const plain = await resolveConfig(
      extendedProfiles['base js'] ?? [],
      project.dir,
      'src/index.js',
    );
    const strict = await resolveConfig(
      extendedProfiles['base js + strict import'] ?? [],
      project.dir,
      'src/index.js',
    );

    expect(Object.keys(strict.rules).length).toBeGreaterThanOrEqual(
      Object.keys(plain.rules).length,
    );
    expect(strict.rules).not.toStrictEqual(plain.rules);
  });

  it('uses the commonjs source type for .cjs and the module type for .mjs in node', async () => {
    const cjs = await resolveConfig(
      extendedProfiles['node js'] ?? [],
      project.dir,
      'src/index.cjs',
    );
    const mjs = await resolveConfig(
      extendedProfiles['node js'] ?? [],
      project.dir,
      'src/index.mjs',
    );

    expect(cjs.languageOptions.sourceType).toBe('commonjs');
    expect(mjs.languageOptions.sourceType).toBe('module');
    expect(cjs.rules['n/no-unsupported-features/es-syntax']?.[0]).toBe(2);
    expect(mjs.rules['n/no-unsupported-features/es-syntax']?.[0]).toBe(2);
  });
});
