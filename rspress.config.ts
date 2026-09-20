import path from 'node:path';
import { defineConfig } from '@rspress/core';

import {
  rehypeLazyImages,
  remarkLazyImages,
} from './scripts/rehype-lazy-images';
import { autoSidebarPlugin } from './scripts/rspress-auto-sidebar';

export default defineConfig({
  root: 'docs',

  title: 'IT Notes',

  description: 'Engineering knowledge base',

  route: {
    // Local assets may include Markdown downloads and must never become pages.
    exclude: ['**/assets/**'],
    /*
     * Route content is already emitted as one lazy chunk per document. Enable
     * intent-based prefetch now that sidebars are shallow, so hover/touch can
     * warm the next page without downloading the whole library.
     */
    prefetchLink: true,
  },

  builderConfig: {
    output: {
      /*
       * Keep nearby assets available at the same relative URL in doc_build,
       * including files that are stored as downloads but not linked by a page.
       */
      copy: [
        {
          from: '**/assets/**/*',
          context: path.resolve(process.cwd(), 'docs'),
          noErrorOnMissing: true,
          // Attachments are opaque downloads and must not be parsed or minified.
          info: {
            minimized: true,
          },
        },
      ],
    },
  },

  search: {
    mode: 'local',
    codeBlocks: false,
  },

  globalStyles: path.resolve(
    process.cwd(),
    'styles/global.css',
  ),

  themeConfig: {
    darkMode: true,
    nav: [
      {
        text: 'Frontend',
        items: [
          { text: '基础', link: '/前端基础/' },
          { text: '框架', link: '/前端框架/' },
          { text: '工程', link: '/前端工程/' },
          { text: '平台', link: '/前端平台/' },
          { text: '专题', link: '/前端专题/' },
        ],
        position: 'left',
      },
      {
        text: 'Languages',
        items: [
          { text: 'Go', link: '/go语言学习/' },
          { text: 'Java', link: '/java学习/' },
          { text: 'Python', link: '/python学习/' },
          { text: 'Rust', link: '/rust学习/' },
        ],
        position: 'left',
      },
      {
        text: 'Backend',
        items: [
          { text: '服务端', link: '/服务端/' },
          { text: 'Docker', link: '/docker学习/' },
          { text: '网络运维', link: '/网络服务运维/' },
        ],
        position: 'left',
      },
      {
        text: 'Systems',
        items: [
          { text: 'Linux', link: '/liunx学习/' },
          { text: '技术杂谈', link: '/技术杂谈/' },
        ],
        position: 'left',
      },
    ],
    socialLinks: [],
  },

  plugins: [
    autoSidebarPlugin(),
  ],

  markdown: {
    remarkPlugins: [remarkLazyImages],
    rehypePlugins: [rehypeLazyImages],
    link: {
      checkDeadLinks: false,
    },
    shiki: {
      // Preserve unknown historical fence labels as readable plain text.
      fallbackLanguage: 'text',
    },
  },
});
