import fs from 'node:fs';
import path from 'node:path';
import type { RspressPlugin } from '@rspress/core';

interface SidebarItem {
  text: string;
  link: string;
}

interface SidebarGroup {
  text: string;
  items: SidebarItem[];
  collapsible: boolean;
}

type Sidebar = Record<string, SidebarGroup[]>;

function isMarkdown(fileName: string) {
  return /\.(md|mdx)$/i.test(fileName);
}

function getPageName(fileName: string) {
  return fileName.replace(/\.(md|mdx)$/i, '');
}

function getEntries(directory: string) {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .filter(entry =>
      !entry.name.startsWith('.') &&
      entry.name !== '_meta.json' &&
      entry.name !== 'assets',
    )
    .sort((left, right) => {
      if (left.isDirectory() !== right.isDirectory()) {
        return left.isDirectory() ? -1 : 1;
      }

      return left.name.localeCompare(right.name, 'zh-CN');
    });
}

function hasIndexPage(directory: string) {
  return (
    fs.existsSync(path.join(directory, 'index.md')) ||
    fs.existsSync(path.join(directory, 'index.mdx'))
  );
}

/**
 * Caches document checks because every directory participates in both sidebar
 * generation and child-link discovery. The cache is cleared on every config
 * reload so newly added documents remain visible during development.
 */
function createDocumentScanner() {
  const contentCache = new Map<string, boolean>();
  const linkCache = new Map<string, string | undefined>();

  function hasDocumentContent(directory: string): boolean {
    const cachedResult = contentCache.get(directory);

    if (cachedResult !== undefined) {
      return cachedResult;
    }

    const hasContent = getEntries(directory).some(entry => {
      if (entry.isFile()) {
        return isMarkdown(entry.name);
      }

      return (
        entry.isDirectory() &&
        hasDocumentContent(path.join(directory, entry.name))
      );
    });

    contentCache.set(directory, hasContent);
    return hasContent;
  }

  /**
   * Resolves the route used when a directory is selected. Standard index pages
   * are preferred; legacy attachment-only directories fall back to their first
   * reachable article.
   */
  function getDirectoryLink(
    directory: string,
    relativeDirectory: string,
  ): string | undefined {
    if (linkCache.has(directory)) {
      return linkCache.get(directory);
    }

    if (hasIndexPage(directory)) {
      const link = `/${relativeDirectory}/`;

      linkCache.set(directory, link);
      return link;
    }

    for (const entry of getEntries(directory)) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isFile() && isMarkdown(entry.name)) {
        const link = `/${[
          relativeDirectory,
          getPageName(entry.name),
        ]
          .filter(Boolean)
          .join('/')}`;

        linkCache.set(directory, link);
        return link;
      }

      if (entry.isDirectory()) {
        const childRelativeDirectory = relativeDirectory
          ? `${relativeDirectory}/${entry.name}`
          : entry.name;
        const childLink = getDirectoryLink(
          entryPath,
          childRelativeDirectory,
        );

        if (childLink) {
          linkCache.set(directory, childLink);
          return childLink;
        }
      }
    }

    linkCache.set(directory, undefined);
    return undefined;
  }

  return {
    getDirectoryLink,
    hasDocumentContent,
  };
}

/**
 * Generates a shallow sidebar for the current route. Only direct folders and
 * direct pages are included, which keeps the browser payload and rendered DOM
 * bounded even when the library contains thousands of documents.
 */
function buildSidebar(rootDirectory: string): Sidebar {
  const sidebar: Sidebar = {};
  const scanner = createDocumentScanner();

  function buildGroups(
    directory: string,
    relativeDirectory: string,
  ) {
    const folders: SidebarItem[] = [];
    const pages: SidebarItem[] = [];

    for (const entry of getEntries(directory)) {
      const entryPath = path.join(directory, entry.name);

      if (
        entry.isDirectory() &&
        scanner.hasDocumentContent(entryPath)
      ) {
        const childRelativeDirectory = relativeDirectory
          ? `${relativeDirectory}/${entry.name}`
          : entry.name;
        const link = scanner.getDirectoryLink(
          entryPath,
          childRelativeDirectory,
        );

        if (link) {
          folders.push({
            text: entry.name,
            link,
          });
        }

        continue;
      }

      if (
        entry.isFile() &&
        isMarkdown(entry.name) &&
        getPageName(entry.name).toLowerCase() !== 'index'
      ) {
        pages.push({
          text: getPageName(entry.name),
          link: `/${[
            relativeDirectory,
            getPageName(entry.name),
          ]
            .filter(Boolean)
            .join('/')}`,
        });
      }
    }

    return [
      folders.length > 0 && {
        text: relativeDirectory ? 'Folders' : 'Library',
        items: folders,
        collapsible: false,
      },
      pages.length > 0 && {
        text: 'Pages',
        items: pages,
        collapsible: false,
      },
    ].filter(Boolean) as SidebarGroup[];
  }

  function walk(
    directory: string,
    relativeDirectory: string,
  ) {
    if (!scanner.hasDocumentContent(directory)) {
      return;
    }

    const routePath = relativeDirectory
      ? `/${relativeDirectory}/`
      : '/';

    sidebar[routePath] = buildGroups(
      directory,
      relativeDirectory,
    );

    for (const entry of getEntries(directory)) {
      if (!entry.isDirectory()) {
        continue;
      }

      const childDirectory = path.join(
        directory,
        entry.name,
      );

      if (!scanner.hasDocumentContent(childDirectory)) {
        continue;
      }

      walk(
        childDirectory,
        relativeDirectory
          ? `${relativeDirectory}/${entry.name}`
          : entry.name,
      );
    }
  }

  walk(rootDirectory, '');
  return sidebar;
}

export function autoSidebarPlugin(): RspressPlugin {
  return {
    name: 'auto-sidebar',

    config(config) {
      const rootDirectory = path.resolve(
        process.cwd(),
        config.root || 'docs',
      );

      if (!fs.existsSync(rootDirectory)) {
        throw new Error(
          `[auto-sidebar] Document directory not found: ${rootDirectory}`,
        );
      }

      const sidebar = buildSidebar(rootDirectory);

      console.log(
        `[auto-sidebar] Generated ${Object.keys(sidebar).length} sidebars`,
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
