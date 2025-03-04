import { join } from 'path';
import net from 'node:net';
import { type RouteMeta, type RspressPlugin } from '@rspress/shared';
import { createRsbuild, mergeRsbuildConfig } from '@rsbuild/core';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginReact } from '@rsbuild/plugin-react';
import { isEqual, cloneDeep } from 'lodash';
import { remarkCodeToDemo } from './remarkPlugin';
import { staticPath } from './constant';
import type { Options, StartServerResult } from './types';
import { generateEntry } from './generate-entry';
import { demoRuntimeModule, demos } from './virtual-module';

// global variables which need to be initialized in plugin
let routeMeta: RouteMeta[];

/**
 * The plugin is used to preview component.
 */
export function pluginPreview(options?: Options): RspressPlugin {
  const {
    isMobile = false,
    iframeOptions = {},
    iframePosition = 'follow',
    defaultRenderMode = 'preview',
  } = options ?? {};
  const previewMode = options?.previewMode ?? isMobile ? 'iframe' : 'internal';
  const {
    devPort = 7890,
    framework = 'react',
    position = iframePosition,
    builderConfig = {},
  } = iframeOptions;
  const globalUIComponents =
    iframePosition === 'fixed'
      ? [join(staticPath, 'global-components', 'Device.tsx')]
      : [];
  const getRouteMeta = () => routeMeta;
  let lastDemos: typeof demos;
  let devServer: StartServerResult;
  const port = devPort;
  return {
    name: '@rspress/plugin-preview',
    config(config) {
      config.markdown = config.markdown || {};
      config.markdown.mdxRs = false;
      return config;
    },
    routeGenerated(routes: RouteMeta[]) {
      // init routeMeta
      routeMeta = routes;
    },
    async beforeBuild(_, isProd) {
      if (!isProd) {
        try {
          await new Promise((resolve, reject) => {
            const server = net.createServer();
            server.unref();
            server.on('error', reject);
            server.listen({ port, host: '0.0.0.0' }, () => {
              server.close(resolve);
            });
          });
        } catch (e: any) {
          if (e.code !== 'EADDRINUSE') {
            throw e;
          } else {
            throw new Error(
              `Port "${port}" is occupied, please choose another one.`,
            );
          }
        }
      }
    },
    async afterBuild(config, isProd) {
      if (isEqual(demos, lastDemos)) {
        return;
      }
      lastDemos = cloneDeep(demos);
      await devServer?.server?.close();
      const sourceEntry = generateEntry(demos, framework, position);
      const outDir = join(config.outDir ?? 'doc_build', '~demo');
      if (Object.keys(sourceEntry).length === 0) {
        return;
      }
      const rsbuildConfig = mergeRsbuildConfig(
        {
          dev: {
            progressBar: false,
          },
          server: {
            port: devPort,
            printUrls: () => undefined,
            strictPort: true,
          },
          performance: {
            printFileSize: false,
          },
          source: {
            alias: config?.builderConfig?.source?.alias,
            entry: sourceEntry,
          },
          output: {
            distPath: {
              root: outDir,
            },
          },
          tools: {
            rspack: {
              output: {
                publicPath: '/~demo',
              },
            },
          },
        },
        builderConfig,
      );
      const rsbuildInstance = await createRsbuild({
        rsbuildConfig,
      });
      if (framework === 'solid') {
        rsbuildInstance.addPlugins([
          pluginBabel({
            include: /\.(?:jsx|tsx)$/,
          }),
          pluginSolid(),
        ]);
      }
      if (framework === 'react') {
        rsbuildInstance.addPlugins([pluginReact()]);
      }
      if (isProd) {
        rsbuildInstance.build();
      } else {
        devServer = await rsbuildInstance.startDevServer();
      }
    },
    builderConfig: {
      source: {
        include: [join(__dirname, '..')],
      },
      tools: {
        rspack: {
          plugins: [demoRuntimeModule],
        },
        bundlerChain(chain) {
          chain.module
            .rule('Raw')
            .resourceQuery(/raw/)
            .type('asset/source')
            .end();

          chain.resolve.extensions.prepend('.md').prepend('.mdx');
        },
      },
      plugins: [
        {
          name: 'close-demo-server',
          setup: api => {
            api.onCloseDevServer(async () => {
              await devServer?.server?.close();
            });
          },
        },
      ],
    },
    extendPageData(pageData, isProd) {
      if (!isProd) {
        pageData.devPort = port;
      }
    },
    markdown: {
      remarkPlugins: [
        [
          remarkCodeToDemo,
          {
            getRouteMeta,
            position,
            previewMode,
            defaultRenderMode,
          },
        ],
      ],
      globalComponents: [
        join(staticPath, 'global-components', 'Container.tsx'),
      ],
    },
    globalUIComponents,
    globalStyles: join(staticPath, 'global-styles', `${previewMode}.css`),
  };
}

export type { Options };
