import type { ConfigObject, ConfigPlugin, ConfigRaw } from '@/types/common.types';

// Defining single config object

type DefineConfigObject = (args: ConfigObject) => ConfigRaw;

export const defineConfigObject: DefineConfigObject = (args) => args;

// Defining plugin

type DefineConfigPlugin = (args: ConfigPlugin) => ConfigRaw;

export const defineConfigPlugin: DefineConfigPlugin = (args) => args;

// Defining config array

export { defineConfig as defineConfigArray } from 'eslint/config';
