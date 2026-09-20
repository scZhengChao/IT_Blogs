import path from 'node:path';
import { defineConfig } from '@rspress/core';

import { sameNameRoutePlugin } from './scripts/rspress-same-name-route';
import { autoSidebarPlugin } from './scripts/rspress-auto-sidebar';
import { fixImagePath } from './scripts/fix-image-path';

export default defineConfig({
  root: 'docs',

  title: '我的文档',

  description: '文档中心',

  route: {
    // Historical attachment files live beside articles and must not become pages.
    extensions: ['.md', '.mdx'],
  },

  builderConfig: {
    source: {
      // A legacy tracking pixel is GIF data stored with a .php suffix.
      assetsInclude: /\.php$/,
    },
  },

  globalStyles: path.resolve(
    process.cwd(),
    'styles/global.css',
  ),

  globalUIComponents: [
    path.resolve(
      process.cwd(),
      'components/GlobalBreadcrumb.tsx',
    ),
  ],

  themeConfig: {
    socialLinks: [],
  },

  plugins: [
    autoSidebarPlugin(),
    sameNameRoutePlugin(),
  ],

  markdown: {
    image: {
      checkDeadImages: false,
    },
    link: {
      checkDeadLinks: false,
    },
    shiki: {
      // Preserve unknown historical fence labels as readable plain text.
      fallbackLanguage: 'text',
    },
    remarkPlugins: [
      fixImagePath,
    ],
  },
});
