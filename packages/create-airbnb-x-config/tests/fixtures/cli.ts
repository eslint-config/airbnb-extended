import { vi } from 'vitest';

import type { MockInstance } from 'vitest';

/** Thrown by the mocked `process.exit` so the code under test stops like the real one. */
export class ExitError extends Error {
  public readonly code: number | string | null | undefined;

  public constructor(code?: number | string | null) {
    super(`process.exit(${code})`);
    this.code = code;
  }
}

export const mockProcessExit = (): MockInstance<typeof process.exit> =>
  vi.spyOn(process, 'exit').mockImplementation((code?: number | string | null) => {
    throw new ExitError(code);
  });

/** Replaces `process.argv` for one test and returns a restore function. */
export const setArgv = (...args: string[]): (() => void) => {
  const original = process.argv;
  process.argv = ['node', 'create-airbnb-x-config', ...args];

  return () => {
    process.argv = original;
  };
};

/** Collects everything written to stdout and stderr. */
export const captureOutput = (): { stdout: () => string; stderr: () => string } => {
  const stdout: string[] = [];
  const stderr: string[] = [];

  vi.spyOn(process.stdout, 'write').mockImplementation((chunk: string | Uint8Array) => {
    stdout.push(String(chunk));
    return true;
  });

  vi.spyOn(process.stderr, 'write').mockImplementation((chunk: string | Uint8Array) => {
    stderr.push(String(chunk));
    return true;
  });

  return {
    stdout: () => stdout.join(''),
    stderr: () => stderr.join(''),
  };
};
