import { detect } from 'package-manager-detector/detect';
import { describe, expect, it, vi } from 'vitest';

import { getPackageManager } from '@/helpers/getPackageManager';

vi.mock('package-manager-detector/detect', () => ({ detect: vi.fn() }));

const mockDetect = (name: string | null) =>
  vi.mocked(detect).mockResolvedValue(name === null ? null : ({ name, agent: name } as never));

describe('helpers/getPackageManager', () => {
  it.each(['pnpm', 'yarn', 'bun', 'npm'])('returns %s when it is detected', async (name) => {
    mockDetect(name);

    await expect(getPackageManager()).resolves.toBe(name);
  });

  it('falls back to npm when nothing is detected', async () => {
    mockDetect(null);

    await expect(getPackageManager()).resolves.toBe('npm');
  });

  it.each(['deno', 'yarn@berry', 'unknown'])(
    'falls back to npm for the %s manager',
    async (name) => {
      mockDetect(name);

      await expect(getPackageManager()).resolves.toBe('npm');
    },
  );

  it('calls the detector once', async () => {
    mockDetect('pnpm');
    await getPackageManager();

    expect(detect).toHaveBeenCalledTimes(1);
  });
});
