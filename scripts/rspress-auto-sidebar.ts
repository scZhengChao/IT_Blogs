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
  if (getSameNamePage(dir)) {
    return true;
  }

  if (hasDirectMarkdown(dir)) {
    return true;
  }

  return getEntries(dir).some(entry => {
    if (!entry.isDirectory()) return false;

    return hasDocumentContent(
      path.join(dir, entry.name),
    );
  });
}

/**
 * 生成某一个目录对应的 SidebarGroup。
 */
function buildGroup(
  dir: string,
  relativeDir: string,
): SidebarGroup[] {
  const entries = getEntries(dir);

  const groups: SidebarGroup[] = [];

  /*
   * 1. 当前目录下的 Markdown 文件
   */
  const directFiles: SidebarItem[] = [];

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!isMarkdown(entry.name)) continue;

    const fileName = getFileName(entry.name);

    // index.md 是目录首页，不作为普通 sidebar item
    if (fileName === 'index') {
      continue;
    }

    // xxx/xxx.md 是这个目录自己的首页
    if (fileName === path.basename(dir)) {
      continue;
    }

    const link =
      '/' +
      [
        relativeDir,
        fileName,
      ]
        .filter(Boolean)
        .join('/');

    directFiles.push({
      text: fileName,
      link,
    });
  }

  /*
   * 普通 Markdown 文件放到当前目录的一个 group 中
   */
  if (directFiles.length > 0) {
    groups.push({
      text:
        relativeDir === ''
          ? '文档'
          : path.basename(dir),
      items: directFiles,
      collapsible: false,
    });
  }

  /*
   * 2. 当前目录下面的子目录
   */
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const childDir = path.join(dir, entry.name);

    // 过滤 image / assets 等纯资源目录
    if (!hasDocumentContent(childDir)) {
      continue;
    }

    const childRelativeDir = relativeDir
      ? `${relativeDir}/${entry.name}`
      : entry.name;

    const sameNamePage = getSameNamePage(childDir);

    const childGroups = buildGroup(
      childDir,
      childRelativeDir,
    );

    /*
     * 子目录有自己的 xxx/xxx.md
     *
     * 例如：
     *
     * rust/
     *   rust.md
     *
     * 那么：
     *
     * rust
     *   ↓
     * /rust/
     */
    groups.push({
      text: entry.name,
      ...(sameNamePage
        ? {
            link: `/${childRelativeDir}/`,
          }
        : {}),
      items: childGroups.flatMap(
        group => group.items,
      ),
      collapsible: true,
      collapsed: false,
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

    sidebar[routePath] = buildGroup(
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