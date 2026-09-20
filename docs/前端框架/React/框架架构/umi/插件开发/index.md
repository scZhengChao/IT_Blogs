# 插件开发

## 目录

- [核心概念](#核心概念)

插件开发：

[   https://umijs.org/docs/guides/plugins](https://umijs.org/docs/guides/plugins "   https://umijs.org/docs/guides/plugins")

**插件api**：

[   https://umijs.org/docs/api/plugin-api](https://umijs.org/docs/api/plugin-api "   https://umijs.org/docs/api/plugin-api")

## 核心概念

&#x20;       插件的本质就是**一个方法**，该方法**接收了一个参数**：`api`。在插件中，你可以调用 `api` 提供的方法进行**一些 hook 的注册**，随后 Umi 会在**特定的时机执行这些** `hook`。

**参考：**

[ Umi 插件实战教程\_萧然似我的博客-CSDN博客 引言笔者最近开发了一款 umi 插件：plugin-umi-cmdk\[1\],该插件的功能主要是：在 umi 项目里可以方便的集成 cmd + k ，实现菜单等搜索。主体功能并不复杂，但是在集成作为 umi 插件过程中踩了不少坑，主要是 umi 官方文档的， 开发插件 | UmiJS\[2\]实属写得烂，看完之后根本无法上手。所以写一篇完整的插件开发教程，手把手上手 umi 插件开发。准备工作创建项目新 https://blog.csdn.net/qq\_22833925/article/details/130497975](https://blog.csdn.net/qq_22833925/article/details/130497975 " Umi 插件实战教程_萧然似我的博客-CSDN博客 引言笔者最近开发了一款 umi 插件：plugin-umi-cmdk\[1],该插件的功能主要是：在 umi 项目里可以方便的集成 cmd + k ，实现菜单等搜索。主体功能并不复杂，但是在集成作为 umi 插件过程中踩了不少坑，主要是 umi 官方文档的， 开发插件 | UmiJS\[2]实属写得烂，看完之后根本无法上手。所以写一篇完整的插件开发教程，手把手上手 umi 插件开发。准备工作创建项目新 https://blog.csdn.net/qq_22833925/article/details/130497975")

[插件api](./插件api/index.md "插件api")

[工具包](IT/前端框架/React/框架架构/umi/插件开发/工具包/工具包.md "工具包")

[知识储备](./知识储备/index.md "知识储备")

[用例](IT/前端框架/React/框架架构/umi/插件开发/用例/用例.md "用例")
