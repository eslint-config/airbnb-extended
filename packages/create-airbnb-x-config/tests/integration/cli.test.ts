import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { stripVTControlCharacters } from 'node:util';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { version } from '@/package.json';

/**
 * Runs the real CLI entry (`index.ts`) in a child process, the same way `pnpm dev` does.
 * Every flag is passed, so no prompt is shown and nothing is installed or downloaded.
 */

const packageRoot = path.resolve(import.meta.dirname, '../..');
const tsxBin = path.join(packageRoot, 'node_modules/.bin/tsx');

let workDir: string;

beforeAll(() => {
  workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'airbnb-x-cli-'));
});

afterAll(() => {
  fs.rmSync(workDir, { recursive: true, force: true });
});

const runCli = (...args: string[]) => {
  const result = spawnSync(tsxBin, [path.join(packageRoot, 'index.ts'), ...args], {
    cwd: workDir,
    encoding: 'utf8',
    env: {
      ...process.env,
      NO_COLOR: '1',
      TSX_TSCONFIG_PATH: path.join(packageRoot, 'tsconfig.json'),
    },
  });

  return {
    status: result.status,
    stdout: stripVTControlCharacters(result.stdout),
    stderr: stripVTControlCharacters(result.stderr),
  };
};

describe('integration/cli', () => {
  it('prints the version', () => {
    const { status, stdout } = runCli('--version');

    expect(status).toBe(0);
    expect(stdout.trim()).toBe(version);
  });

  it('prints the help', () => {
    const { status, stdout } = runCli('--help');

    expect(status).toBe(0);
    expect(stdout).toContain('Usage: create-airbnb-x-config');
    expect(stdout).toContain('--skip-install');
  });

  it('prints the command and the config url without installing or creating a file', () => {
    const { status, stdout } = runCli(
      '--config',
      'extended',
      '--lang',
      'typescript',
      '--formatter',
      'prettier',
      '--runtime',
      'next',
      '--strict',
      'import',
      'react',
      'typescript',
      '--pm',
      'pnpm',
      '--create-eslint-file',
      'false',
      '--skip-install',
    );

    expect(status).toBe(0);
    expect(stdout).toContain('No Worries');
    expect(stdout).toContain(
      'pnpm install -D eslint@^9 @eslint/compat @eslint/js@^9 eslint-config-airbnb-extended prettier eslint-plugin-prettier eslint-config-prettier',
    );
    expect(stdout).toContain(
      'https://github.com/eslint-config/airbnb-extended/tree/master/apps/build-templates/templates/next/prettier/ts/strict/import-react-typescript/eslint.config.mjs',
    );
    expect(fs.readdirSync(workDir)).toStrictEqual([]);
  });

  it('works for the legacy config', () => {
    const { status, stdout } = runCli(
      '--config',
      'legacy',
      '--legacy',
      'react-hooks',
      '--lang',
      'javascript',
      '--formatter',
      'none',
      '--pm',
      'yarn',
      '--create-eslint-file',
      'false',
      '--skip-install',
    );

    expect(status).toBe(0);
    expect(stdout).toContain(
      'yarn add -D eslint@^9 @eslint/compat @eslint/js@^9 eslint-config-airbnb-extended',
    );
    expect(stdout).toContain('legacy/react-hooks/js/default/eslint.config.mjs');
  });

  it('exits with code 1 for an invalid option value', () => {
    const { status, stderr } = runCli('--config', 'modern');

    expect(status).toBe(1);
    expect(stderr).toContain("argument 'modern' is invalid");
  });
});
