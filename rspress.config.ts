import path from 'node:path';
import { defineConfig } from '@rspress/core';

import { sameNameRoutePlugin } from './scripts/rspress-same-name-route';
import { autoSidebarPlugin } from './scripts/rspress-auto-sidebar';
import { fixImagePath } from './scripts/fix-image-path';

export default defineConfig({
  root: 'docs',

  title: '我的文档',

  description: '文档中心',

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
    remarkPlugins: [
      fixImagePath,
    ],
  },
});