import path from 'path';
import { pathToFileURL } from 'url';
import type { Rspack } from '@rsbuild/core';
import { createProcessor } from '@mdx-js/mdx';
import { isProduction, type Header, type UserConfig } from '@rspress/shared';
import { logger } from '@rspress/shared/logger';
import { loadFrontMatter } from '@rspress/shared/node-utils';
import fs from 'fs-extra';
import type { RouteService } from '../route/RouteService';
import {
  normalizePath,
  escapeMarkdownHeadingIds,
  flattenMdxContent,
} from '../utils';
import { PluginDriver } from '../PluginDriver';
import { TEMP_DIR } from '../constants';
import { RuntimeModuleID } from '../runtimeModule';
import { createMDXOptions } from './options';
import { TocItem } from './remarkPlugins/toc';
import { checkLinks } from './remarkPlugins/checkDeadLink';

interface LoaderOptions {
  config: UserConfig;
  docDirectory: string;
  checkDeadLinks: boolean;
  routeService: RouteService;
  pluginDriver: PluginDriver;
}

export interface PageMeta {
  toc: TocItem[];
  title: string;
  frontmatter?: Record<string, any>;
}

export async function triggerReload() {
  const siteDataModulePath = path.join(
    TEMP_DIR,
    'runtime',
    `${RuntimeModuleID.SiteData}.mjs`,
  );
  const { default: siteData } = await import(
    pathToFileURL(siteDataModulePath).href
  );
  await fs.writeFile(
    siteDataModulePath,
    `export default ${JSON.stringify({
      ...siteData,
      timestamp: Date.now().toString(),
    })}`,
  );
}

export function createCheckPageMetaUpdateFn() {
  const pageMetaMap = new Map<string, string>();
  return (modulePath: string, pageMeta: PageMeta) => {
    const prevMeta = pageMetaMap.get(modulePath);
    const deserializedMeta = JSON.stringify(pageMeta);
    pageMetaMap.set(modulePath, deserializedMeta);

    if (!prevMeta) {
      return;
    }

    if (prevMeta !== deserializedMeta) {
      setTimeout(async () => {
        logger.info(
          `⭐️ Page metadata changed, rspress will trigger page reload...`,
        );
        await triggerReload();
      });
    }
  };
}

const checkPageMetaUpdate = createCheckPageMetaUpdateFn();

export default async function mdxLoader(
  context: Rspack.LoaderContext<LoaderOptions>,
  source: string,
  callback: Rspack.LoaderContext['callback'],
) {
  const options = context.getOptions();
  const filepath = context.resourcePath;
  const { alias } = context._compiler.options.resolve;
  context.cacheable(true);
  let pageMeta = {
    title: '',
    toc: [],
  } as PageMeta;

  const { config, docDirectory, checkDeadLinks, routeService, pluginDriver } =
    options;

  const { frontmatter, content } = loadFrontMatter(
    source,
    filepath,
    docDirectory,
    true,
  );

  // preprocessor
  const preprocessedContent = escapeMarkdownHeadingIds(
    await flattenMdxContent(content, filepath, alias as Record<string, string>),
  );

  let enableMdxRs;
  const mdxRs = config?.markdown?.mdxRs ?? true;
  if (typeof mdxRs === 'object') {
    enableMdxRs =
      typeof mdxRs?.include === 'function' ? mdxRs.include(filepath) : true;
  } else {
    enableMdxRs = mdxRs;
  }

  try {
    let compileResult: string;
    if (!enableMdxRs) {
      const mdxOptions = await createMDXOptions(
        docDirectory,
        config,
        checkDeadLinks,
        routeService,
        filepath,
        pluginDriver,
      );
      const compiler = createProcessor(mdxOptions);

      compiler.data('pageMeta', {
        toc: [],
        title: '',
      });
      const vFile = await compiler.process({
        value: preprocessedContent,
        path: filepath,
      });

      compileResult = String(vFile);
      const compilationMeta = compiler.data('pageMeta') as {
        toc: Header[];
        title: string;
      };
      pageMeta = {
        toc: compilationMeta.toc,
        title: frontmatter.title || compilationMeta.title || '',
        frontmatter,
      } as PageMeta;
    } else {
      const { compile } = require('@rspress/mdx-rs');

      // TODO: Cannot get correct toc from mdx which has internal components
      const { toc, links, title, code } = await compile({
        value: preprocessedContent,
        filepath,
        root: docDirectory,
        development: process.env.NODE_ENV !== 'production',
      });

      compileResult = code;
      pageMeta = {
        toc,
        title: frontmatter.title || title || '',
        frontmatter,
      };
      // We should check dead links in mdx-rs mode
      if (checkDeadLinks) {
        checkLinks(links, filepath, docDirectory, routeService);
      }
    }

    // If page meta changed, we trigger page reload to ensure the page is up to date.
    if (!isProduction()) {
      checkPageMetaUpdate(filepath, pageMeta);
    }

    const result = `const frontmatter = ${JSON.stringify(frontmatter)};
${compileResult}
MDXContent.__RSPRESS_PAGE_META = {};

MDXContent.__RSPRESS_PAGE_META["${encodeURIComponent(
      normalizePath(path.relative(docDirectory, filepath)),
    )}"] = ${JSON.stringify(pageMeta)};
`;
    callback(null, result);
  } catch (e) {
    logger.error(`MDX compile error: ${e.message} in ${filepath}`);
    callback({ message: e.message, name: `${filepath} compile error` });
  }
}
