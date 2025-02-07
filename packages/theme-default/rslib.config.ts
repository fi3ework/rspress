import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import path from 'node:path';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { type LibConfig, defineConfig } from '@rslib/core';
const require = createRequire(import.meta.url);

const COMMON_EXTERNALS = [
  'virtual-routes-ssr',
  'virtual-routes',
  'virtual-search-index-hash',
  'virtual-site-data',
  'virtual-global-styles',
  'virtual-global-components',
  'virtual-search-hooks',
  '@rspress/runtime',
  '@theme',
  /@theme-assets\//,
  'virtual-i18n-text',
  'virtual-prism-languages',
];

export default defineConfig({
  lib: [
    // {
    //   format: 'esm',
    //   plugins: [pluginReact(), pluginSvgr(), pluginSass()],
    //   source: {
    //     define: {
    //       __non_webpack_public_path__: '__webpack_public_path__',
    //     },
    //     entry: {
    //       bundle: './src/index.ts',
    //     },
    //   },
    //   output: {
    //     target: 'web',
    //     externals: COMMON_EXTERNALS,
    //     cssModules: {
    //       localIdentName: '[local]_[hash:hex:5]',
    //     },
    //     copy: {
    //       patterns: [
    //         {
    //           from: './.theme-entry.js',
    //           to: './index.js',
    //           context: __dirname,
    //         },
    //         {
    //           from: './.theme-entry.d.ts',
    //           to: './index.d.ts',
    //           context: __dirname,
    //         },
    //       ],
    //     },
    //   },
    // },
    // {
    //   source: {
    //     entry: {
    //       'source-build-plugin': './src/node/source-build-plugin.ts',
    //     },
    //   },
    //   format: 'esm',
    //   syntax: 'es2020',
    //   output: {
    //     distPath: {
    //       root: 'dist/node',
    //     },
    //     externals: ['tailwindcss'],
    //   },
    // },
    // pre-built svg files
    {
      format: 'esm',
      syntax: 'es2020',
      bundle: true,
      plugins: [pluginReact(), pluginSvgr()],
      source: {
        entry: {
          assets: ['src/assets/arrow-down.svg'],
        },
      },
      output: {
        distPath: {
          root: 'dist/assets',
        },
      },
    },
  ],
});
