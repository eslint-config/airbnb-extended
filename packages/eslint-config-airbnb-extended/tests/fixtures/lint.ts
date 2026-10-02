import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

import { ESLint } from 'eslint';

import type { Linter } from 'eslint';

/** A throw-away project folder, so import rules and file globs see real paths. */
export const createWorkDir = (): { dir: string; remove: () => void } => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'airbnb-x-lint-'));

  return { dir, remove: () => fs.rmSync(dir, { recursive: true, force: true }) };
};

export interface LintOptions {
  /** Config array, as a user would put it in `eslint.config.mjs`. */
  config: Linter.Config[];
  cwd: string;
  filePath: string;
  code: string;
}

export interface LintOutput {
  result: ESLint.LintResult | undefined;
  messages: Linter.LintMessage[];
  ruleIds: Set<string | null>;
  /** Messages that stop the file from being linted, like a parsing error. */
  fatal: Linter.LintMessage[];
}

export const lint = async ({ config, cwd, filePath, code }: LintOptions): Promise<LintOutput> => {
  const eslint = new ESLint({ cwd, overrideConfigFile: true, overrideConfig: config });

  const [result] = await eslint.lintText(code, { filePath: path.join(cwd, filePath) });

  return {
    result,
    messages: result?.messages ?? [],
    ruleIds: new Set((result?.messages ?? []).map((message) => message.ruleId)),
    fatal: (result?.messages ?? []).filter((message) => message.fatal),
  };
};

/** Writes a small typescript project (tsconfig, `@/` alias, a few sources) into `dir`. */
export const writeProject = (dir: string, files: Record<string, string> = {}): void => {
  const all: Record<string, string> = {
    'tsconfig.json': JSON.stringify({
      compilerOptions: {
        target: 'ES2022',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        jsx: 'react-jsx',
        strict: true,
        skipLibCheck: true,
        baseUrl: '.',
        paths: { '@/*': ['./src/*'] },
      },
      include: ['src'],
    }),
    'package.json': JSON.stringify({ name: 'sample', private: true, type: 'module' }),
    'src/foo.ts': 'export const foo = 1;\n',
    'src/foo.js': 'export const foo = 1;\n',
    'src/index.ts': 'export {};\n',
    'src/index.js': 'export {};\n',
    'src/App.tsx': 'export {};\n',
    'src/App.jsx': 'export {};\n',
    ...files,
  };

  for (const [file, content] of Object.entries(all)) {
    const fullPath = path.join(dir, file);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);
  }
};

export interface ResolvedConfig {
  rules: Record<string, unknown[]>;
  languageOptions: Record<string, unknown>;
}

/** The rules ESLint resolves for one file, as `[severity, ...options]` arrays (severity is 0, 1 or 2). */
export const resolveConfig = async (
  config: Linter.Config[],
  cwd: string,
  filePath: string,
): Promise<ResolvedConfig> => {
  const eslint = new ESLint({ cwd, overrideConfigFile: true, overrideConfig: config });
  const resolved = (await eslint.calculateConfigForFile(path.join(cwd, filePath))) as
    { rules?: Record<string, unknown[]>; languageOptions?: Record<string, unknown> } | undefined;

  return { rules: resolved?.rules ?? {}, languageOptions: resolved?.languageOptions ?? {} };
};
