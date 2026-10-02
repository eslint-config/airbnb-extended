import { EventEmitter } from 'node:events';

import spawn from 'cross-spawn';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { installPackages } from '@/helpers/installPackages';

vi.mock('cross-spawn', () => ({ default: vi.fn() }));

// eslint-disable-next-line unicorn/prefer-event-target -- a child process is an EventEmitter
const createChild = (): EventEmitter => new EventEmitter();

let child: EventEmitter;

beforeEach(() => {
  child = createChild();
  vi.mocked(spawn).mockReturnValue(child as never);
});

describe('helpers/installPackages', () => {
  it('spawns the package manager with the install arguments', async () => {
    const promise = installPackages({ packageManager: 'pnpm', formatter: 'none' });
    child.emit('close', 0);
    await promise;

    expect(spawn).toHaveBeenCalledTimes(1);
    expect(spawn).toHaveBeenCalledWith(
      'pnpm',
      [
        'install',
        '-D',
        'eslint@^9',
        '@eslint/compat',
        '@eslint/js@^9',
        'eslint-config-airbnb-extended',
      ],
      expect.objectContaining({ stdio: 'inherit' }),
    );
  });

  it('adds the prettier packages', async () => {
    const promise = installPackages({ packageManager: 'yarn', formatter: 'prettier' });
    child.emit('close', 0);
    await promise;

    const [, args] = vi.mocked(spawn).mock.calls[0] ?? [];
    expect(args).toStrictEqual([
      'add',
      '-D',
      'eslint@^9',
      '@eslint/compat',
      '@eslint/js@^9',
      'eslint-config-airbnb-extended',
      'prettier',
      'eslint-plugin-prettier',
      'eslint-config-prettier',
    ]);
  });

  it('runs with a development env and without noise', async () => {
    const promise = installPackages({ packageManager: 'npm', formatter: 'none' });
    child.emit('close', 0);
    await promise;

    const options = (vi.mocked(spawn).mock.calls[0] ?? [])[2];
    expect(options).toMatchObject({
      stdio: 'inherit',
      env: expect.objectContaining({
        ADBLOCK: '1',
        NODE_ENV: 'development',
        DISABLE_OPENCOLLECTIVE: '1',
      }),
    });
  });

  it('keeps the current process env', async () => {
    vi.stubEnv('AIRBNB_X_TEST_VALUE', 'kept');
    const promise = installPackages({ packageManager: 'npm', formatter: 'none' });
    child.emit('close', 0);
    await promise;

    const options = (vi.mocked(spawn).mock.calls[0] ?? [])[2];
    expect((options as { env: NodeJS.ProcessEnv }).env.AIRBNB_X_TEST_VALUE).toBe('kept');
    vi.unstubAllEnvs();
  });

  it('overrides NODE_ENV even when the process runs in production', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    const promise = installPackages({ packageManager: 'pnpm', formatter: 'none' });
    child.emit('close', 0);
    await promise;

    const options = (vi.mocked(spawn).mock.calls[0] ?? [])[2];
    expect((options as { env: NodeJS.ProcessEnv }).env.NODE_ENV).toBe('development');
    vi.unstubAllEnvs();
  });

  it('resolves when the process exits with code 0', async () => {
    const promise = installPackages({ packageManager: 'bun', formatter: 'none' });
    child.emit('close', 0);

    await expect(promise).resolves.toBeUndefined();
  });

  it('rejects with the failed command and the package-failed cause on a non-zero exit', async () => {
    const promise = installPackages({ packageManager: 'npm', formatter: 'none' });
    child.emit('close', 1);

    await expect(promise).rejects.toMatchObject({
      message:
        'npm install -D eslint@^9 @eslint/compat @eslint/js@^9 eslint-config-airbnb-extended',
      cause: 'package-failed',
    });
  });

  it('rejects when the process is killed by a signal', async () => {
    const promise = installPackages({ packageManager: 'npm', formatter: 'none' });
    child.emit('close', null);

    await expect(promise).rejects.toMatchObject({ cause: 'package-failed' });
  });
});
