import fsPromise from 'node:fs/promises';

import fetch from 'node-fetch';

import { baseGithubRawUrl, eslintConfigName } from '@/constants';
import getConfigUrl from '@/helpers/getConfigUrl';
import { rootPath } from '@/utils';

import type { CreateESLintConfigFile } from '@/helpers/@types/createEslintConfigFile.types';

const createESLintConfigFile: CreateESLintConfigFile = async (args) => {
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

export default createESLintConfigFile;
