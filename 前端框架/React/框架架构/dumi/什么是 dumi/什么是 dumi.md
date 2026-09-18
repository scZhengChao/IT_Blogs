# 什么是 dumi

## 目录

- [特性](#特性)

dumi，中文发音**嘟米**，是一款为组件开发场景而生的静态站点框架，与[father](https://github.com/umijs/father "father")一起为开发者提供一站式的组件开发体验，**father 负责组件源码构建，而 dumi 负责组件开发及组件文档生成。**

## 特性

全新的 dumi 2.0 主要具备以下特性：

- 🚀**更好的编译性能**：通过结合使用[Umi 4 MFSU](https://umijs.org/blog/mfsu-faster-than-vite "Umi 4 MFSU")、esbuild、SWC、持久缓存等方案，带来比 dumi 1.x 更快的编译速度
- 🔍**内置全文搜索**：不需要接入任何三方服务，标题、正文、demo 等内容均可被搜索，支持多关键词搜索，且不会带来产物体积的增加
- 🎨**全新主题系统**：为主题包增加插件、国际化等能力的支持，且参考[Docusaurus](https://docusaurus.io/docs/swizzling "Docusaurus")为主题用户提供局部覆盖能力，更强更易用
- 🚥**约定式路由增强**：通过拆分路由概念、简化路由配置等方式，让路由生成一改 dumi 1.x 的怪异、繁琐，更加符合直觉
- 💡**资产元数据 2.0**：在 1.x 及 JSON Schema 的基础上对资产属性定义结构进行全新设计，为资产的流通提供更多可能
- 💎**继续为组件研发而生**：**提供与全新的 NPM 包研发工具**[**father 4**](https://github.com/umijs/father "father 4")**集成的脚手架，为开发者提供一站式的研发体验**
