# Monorepo

最后，我们来介绍 monorepo 的概念：简而言之，monorepo 是将**多个项目放到一个 git 仓库的组织方式。**

对于体量较小的 monorepo 仓库，可以通过 pnpm/yarn workspace 来管理；但更多情况下，需要考虑构建缓存、发布流程、依赖管理等复杂的情况，就需要引入专门的 `monorepo` 工具，除了本站点介绍的 EMO 外，社区内还有很多解决方案：

- [Rush](https://rushjs.io/ "Rush"): 每个项目都是一个独立的单体，极易拆卸；同时通过移除根目录下的`node_modules`来避免幻影依赖。
- [Nx](https://nx.dev/ "Nx"): 支持远程缓存等功能，提供集成的开发体验和丰富的插件生态。
- [TurboRepo](https://turborepo.org/ "TurboRepo"): 使用 Rust 语言编写，专注于高性能。

[背景理解](背景理解.md "背景理解")

[原理改造](原理改造.md "原理改造")

[工具](IT/前端专题/包管理器/Monorepo/工具/工具.md "工具")
