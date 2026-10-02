import fsPromise from 'node:fs/promises';

import fetch from 'node-fetch';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { baseGithubRawUrl, eslintConfigName } from '@/constants/common';
import { createESLintConfigFile } from '@/helpers/createEslintConfigFile';
import { rootPath } from '@/utils';

import type { GetConfigUrlParams } from '@/helpers/getConfigUrl';

vi.mock('node-fetch', () => ({ default: vi.fn() }));
vi.mock('node:fs/promises', () => ({ default: { writeFile: vi.fn() } }));

const args: GetConfigUrlParams = {
  config: 'extended',
  language: 'typescript',
  formatter: 'prettier',
  runtime: 'react',
  strictConfig: ['import'],
  legacyConfig: null as never,
};

const mockResponse = (body: string) =>
  vi.mocked(fetch).mockResolvedValue({ text: async () => body } as never);

beforeEach(() => {
  vi.mocked(fsPromise.writeFile).mockResolvedValue();
  mockResponse('export default [];');
});

describe('helpers/createEslintConfigFile', () => {
  it('downloads the template from the raw github url', async () => {
    await createESLintConfigFile(args);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${baseGithubRawUrl}/react/prettier/ts/strict/import/eslint.config.mjs`,
    );
  });

  it('writes the downloaded text to eslint.config.mjs in the current folder', async () => {
    await createESLintConfigFile(args);

    expect(fsPromise.writeFile).toHaveBeenCalledWith(
      `${rootPath}/${eslintConfigName}`,
      'export default [];',
      { encoding: 'utf8' },
    );
  });

  it('downloads legacy templates from the legacy folder', async () => {
    await createESLintConfigFile({
      ...args,
      config: 'legacy',
      legacyConfig: 'react-hooks',
      formatter: 'none',
      strictConfig: null as never,
    });

    expect(fetch).toHaveBeenCalledWith(
      `${baseGithubRawUrl}/legacy/react-hooks/ts/default/eslint.config.mjs`,
    );
  });

  it('logs the error and does not throw when the download fails', async () => {
    const error = new Error('network down');
    vi.mocked(fetch).mockRejectedValue(error);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(createESLintConfigFile(args)).resolves.toBeUndefined();

    expect(consoleError).toHaveBeenCalledWith(error);
    expect(fsPromise.writeFile).not.toHaveBeenCalled();
  });

  it('logs the error and does not throw when the file cannot be written', async () => {
    const error = new Error('EACCES');
    vi.mocked(fsPromise.writeFile).mockRejectedValue(error);
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(createESLintConfigFile(args)).resolves.toBeUndefined();

    expect(consoleError).toHaveBeenCalledWith(error);
  });

  // KNOWN BUG: a 404 from github is not checked (`res.ok`), so the error page text
  // ("404: Not Found") is written into eslint.config.mjs.
  // When it fails, change `it.fails` to `it`.
  it.fails('does not write the file when github answers with an error status', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => '404: Not Found',
    } as never);
    vi.spyOn(console, 'error').mockImplementation(() => {});

    await createESLintConfigFile(args);

    expect(fsPromise.writeFile).not.toHaveBeenCalled();
  });
});
