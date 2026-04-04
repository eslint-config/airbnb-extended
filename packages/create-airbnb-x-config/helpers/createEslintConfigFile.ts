import fsPromise from 'node:fs/promises';

import fetch from 'node-fetch';

import { baseGithubRawUrl, eslintConfigName } from '@/constants/common';
import { getConfigUrl } from '@/helpers/getConfigUrl';
import { rootPath } from '@/utils';

import { GetConfigUrlParams } from '@/helpers/getConfigUrl/getConfigUrl.types';

export const createESLintConfigFile = async (args: GetConfigUrlParams): Promise<void> => {
  try {
    const config = getConfigUrl(args);
    if (!config) return;

    const { path: configPath } = config;
    const url = `${baseGithubRawUrl}/${configPath}`;

    const res = await fetch(url);
    const data = await res.text();

    await fsPromise.writeFile(`${rootPath}/${eslintConfigName}`, data, {
      encoding: 'utf8',
    });
  } catch (error) {
    console.error(error);
  }
};
