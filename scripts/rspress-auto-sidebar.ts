import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarGroup {
  text: string;
  link?: string;
  items: SidebarItem[];
  collapsible?: boolean;
  collapsed?: boolean;
}

type Sidebar = Record<string, SidebarGroup[]>;

const documentContentCache = new Map<string, boolean>();
const directoryLinkCache = new Map<string, string | undefined>();

function isMarkdown(name: string) {
  return /\.(md|mdx)$/i.test(name);
}

function getFileName(name: string) {
  return name.replace(/\.(md|mdx)$/i, '');
}

function getEntries(dir: string) {
  return fs
    .readdirSync(dir, {
      withFileTypes: true,
    })
    .filter(entry => {
      if (entry.name.startsWith('.')) return false;
      if (entry.name === '_meta.json') return false;
      return true;
    })
    .sort((a, b) => {
      // 目录在前
      if (a.isDirectory() && !b.isDirectory()) return -1;
      if (!a.isDirectory() && b.isDirectory()) return 1;

      return a.name.localeCompare(b.name, 'zh-CN');
    });
}

/**
 * 当前目录是否存在：
 *
 *   xxx/
 *     xxx.md
 *
 * 如果存在，则这个目录本身有一个特殊首页：
 *
 *   /xxx/
 */
function getSameNamePage(dir: string) {
  const dirName = path.basename(dir);

  const md = path.join(dir, `${dirName}.md`);
  const mdx = path.join(dir, `${dirName}.mdx`);

  if (fs.existsSync(md)) return md;
  if (fs.existsSync(mdx)) return mdx;

  return undefined;
}

/**
 * 当前目录下是否存在真正的 Markdown 页面。
 *
 * 注意：
 *   xxx/xxx.md 不算普通子页面，
 *   因为它代表 xxx 目录自己的首页。
 */
function hasDirectMarkdown(dir: string) {
  return getEntries(dir).some(entry => {
    if (!entry.isFile()) return false;
    if (!isMarkdown(entry.name)) return false;

    const fileName = getFileName(entry.name);

    if (fileName === 'index') return false;

    const parentName = path.basename(dir);

    if (fileName === parentName) return false;

    return true;
  });
}

/**
 * 当前目录下面是否存在有意义的文档内容。
 *
 * 纯 image / images / assets 等资源目录会被过滤掉。
 */
function hasDocumentContent(dir: string): boolean {
  const cachedResult = documentContentCache.get(dir);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (getSameNamePage(dir)) {
    documentContentCache.set(dir, true);
    return true;
  }

  if (hasDirectMarkdown(dir)) {
    documentContentCache.set(dir, true);
    return true;
  }

  const hasContent = getEntries(dir).some(entry => {
    if (!entry.isDirectory()) return false;

    return hasDocumentContent(
      path.join(dir, entry.name),
    );
  });

  documentContentCache.set(dir, hasContent);
  return hasContent;
}

/**
 * Finds the first page that can represent a directory in the sidebar.
 *
 * A same-name page or index page is preferred. Legacy directories without
 * either page fall back to their first descendant Markdown route.
 */
function getDirectoryLink(
  dir: string,
  relativeDir: string,
): string | undefined {
  if (directoryLinkCache.has(dir)) {
    return directoryLinkCache.get(dir);
  }

  if (
    getSameNamePage(dir) ||
    fs.existsSync(path.join(dir, 'index.md')) ||
    fs.existsSync(path.join(dir, 'index.mdx'))
  ) {
    const link = `/${relativeDir}/`;

    directoryLinkCache.set(dir, link);
    return link;
  }

  for (const entry of getEntries(dir)) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isFile() && isMarkdown(entry.name)) {
      const fileName = getFileName(entry.name);
      const link = `/${[relativeDir, fileName]
        .filter(Boolean)
        .join('/')}`;

      directoryLinkCache.set(dir, link);
      return link;
    }

    if (entry.isDirectory()) {
      const childRelativeDir = relativeDir
        ? `${relativeDir}/${entry.name}`
        : entry.name;
      const childLink = getDirectoryLink(
        entryPath,
        childRelativeDir,
      );

      if (childLink) {
        directoryLinkCache.set(dir, childLink);
        return childLink;
      }
    }
  }

  directoryLinkCache.set(dir, undefined);
  return undefined;
}

/**
 * Builds a shallow menu for one directory.
 *
 * Each route receives only its siblings and direct child directories. This
 * keeps navigation predictable and prevents thousands of repeated descendant
 * items from being serialized into every sidebar entry.
 */
function buildGroups(
  dir: string,
  relativeDir: string,
): SidebarGroup[] {
  const entries = getEntries(dir);
  const groups: SidebarGroup[] = [];
  const directFiles: SidebarItem[] = [];
  const childDirectories: SidebarItem[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!isMarkdown(entry.name)) continue;

    const fileName = getFileName(entry.name);

    if (
      fileName === 'index' ||
      fileName === path.basename(dir)
    ) {
      continue;
    }

    directFiles.push({
      text: fileName,
      link: `/${[relativeDir, fileName]
        .filter(Boolean)
        .join('/')}`,
    });
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const childDir = path.join(dir, entry.name);

    if (!hasDocumentContent(childDir)) {
      continue;
    }

    const childRelativeDir = relativeDir
      ? `${relativeDir}/${entry.name}`
      : entry.name;
    const link = getDirectoryLink(
      childDir,
      childRelativeDir,
    );

    if (link) {
      childDirectories.push({
        text: entry.name,
        link,
      });
    }
  }

  if (childDirectories.length > 0) {
    groups.push({
      text: relativeDir ? 'Folders' : 'Library',
      items: childDirectories,
      collapsible: false,
    });
  }

  if (directFiles.length > 0) {
    groups.push({
      text: 'Pages',
      items: directFiles,
      collapsible: false,
    });
  }

  return groups;
}

/**
 * 为整个 docs 目录生成 sidebar。
 *
 * Sidebar 的 key 是当前路径。
 *
 * 例如：
 *
 * /
 * /rust/
 * /rust/学习/
 * /java/
 *
 * 每一级都有自己的 sidebar。
 */
function buildSidebar(
  rootDir: string,
): Sidebar {
  const sidebar: Sidebar = {};

  function walk(
    currentDir: string,
    relativeDir: string,
  ) {
    if (!hasDocumentContent(currentDir)) {
      return;
    }

    const routePath = relativeDir
      ? `/${relativeDir}/`
      : '/';

    sidebar[routePath] = buildGroups(
      currentDir,
      relativeDir,
    );

    for (const entry of getEntries(currentDir)) {
      if (!entry.isDirectory()) continue;

      const childDir = path.join(
        currentDir,
        entry.name,
      );

      if (!hasDocumentContent(childDir)) {
        continue;
      }

      const childRelativeDir = relativeDir
        ? `${relativeDir}/${entry.name}`
        : entry.name;

      walk(
        childDir,
        childRelativeDir,
      );
    }
  }

  walk(rootDir, '');

  return sidebar;
}

export function autoSidebarPlugin(): RspressPlugin {
  return {
    name: 'auto-sidebar',

    config(config) {
      /*
       * Config hooks can run again during development restarts. Clearing the
       * scan caches ensures newly added or removed documents are discovered.
       */
      documentContentCache.clear();
      directoryLinkCache.clear();

      const root = config.root || 'docs';

      const rootDir = path.resolve(
        process.cwd(),
        root,
      );

      if (!fs.existsSync(rootDir)) {
        throw new Error(
          `[auto-sidebar] 文档目录不存在：${rootDir}`,
        );
      }

      const sidebar = buildSidebar(rootDir);

      console.log(
        `[auto-sidebar] 生成 ${Object.keys(sidebar).length} 个 sidebar`,
      );

      return {
        ...config,

        themeConfig: {
          ...config.themeConfig,
          sidebar,
        },
      };
    },
  };
}
