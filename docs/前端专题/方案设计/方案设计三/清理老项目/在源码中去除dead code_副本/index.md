# 在源码中去除dead code\_副本

## 目录

- [依赖收集过程](#依赖收集过程)
- [标记过程](#标记过程)

[ 滑动验证页面  https://segmentfault.com/a/1190000041912948](https://segmentfault.com/a/1190000041912948 " 滑动验证页面  https://segmentfault.com/a/1190000041912948")

在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件：

1、使用 `ESM` 规范编写模块代码

2、配置 `optimization.usedExports` 为 `true`，启动标记功能

3、启动代码优化功能，可以通过如下方式实现：

- 配置 `mode = production`
- 配置 `optimization.minimize = true`
- 提供 `optimization.minimizer` 数组

```javascript 
module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: 'buildle.js'
  },
  cache: false,
  optimization: {
    usedExports: true,// 是否启用标记
    minimize: false, // 是否压缩
  }
};

```


## 依赖收集过程

1、将模块的所有 `ESM` 导出语句转换为 `Dependency` 对象，并记录到 `module` 对象的 `dependencies` 集合，转换规则：

- 具名导出转换为 HarmonyExportSpecifierDependency 对象
- default 导出转换为 HarmonyExportExpressionDependency 对象

FlagDependencyExportsPlugin.js

![](./assets/image/image_hUkY9d0YcA.png)

2、所有模块都编译完毕后，触发 compilation.hooks.finishModules 钩子，开始执行FlagDependencyExportsPlugin 插件回调

3、FlagDependencyExportsPlugin 插件从 entry 开始读取 ModuleGraph 中存储的模块信息，遍历所有 module 对象

4、遍历 module 对象的 dependencies 数组，找到所有 HarmonyImportXXXDependency 类型的依赖对象，将其转换为 ExportInfo 对象并记录到 ModuleGraph 体系中

经过 FlagDependencyExportsPlugin 插件处理后，所有 ESM 风格的 export 语句都会记录在 ModuleGraph 体系内，后续操作就可以从 ModuleGraph 中直接读取出模块的导出值

## 标记过程

1、触发 compilation.hooks.optimizeDependencies 钩子，开始执行 FlagDependencyUsagePlugin 插件逻辑

FlagDependencyUsagePlugin.js

1. 触发 compilation.hooks.optimizeDependencies 钩子，开始执行 FlagDependencyUsagePlugin 插件逻辑
2. 在 FlagDependencyUsagePlugin 插件中，从 entry 开始逐步遍历 ModuleGraph 存储的所有 module 对象
3. 遍历 module 对象对应的 exportInfo 数组
4. 为每一个 exportInfo 对象执行 compilation.getDependencyReferencedExports 方法，确定其对应的 dependency 对象有否被其它模块使用
5. 被任意模块使用到的导出值，调用 exportInfo.setUsedConditionally 方法将其标记为已被使用。
6. exportInfo.setUsedConditionally 内部修改 exportInfo.\_usedInRuntime 属性，记录该导出被如何使用

2、最终通过 ConcatenatedModule.codeGeneration 生成 ESM 的代码，最后通过 JavaScriptModulesPlugins.renderMain 生成最终的代码

![](./assets/image/image_bGHatcSC5Y.png)

[ Tree Shaking | webpack 中文文档 | webpack中文文档 | webpack中文网 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://www.webpackjs.com/guides/tree-shaking/](https://www.webpackjs.com/guides/tree-shaking/ " Tree Shaking | webpack 中文文档 | webpack中文文档 | webpack中文网 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://www.webpackjs.com/guides/tree-shaking/")

[ Webpack 原理系列九：Tree-Shaking 实现原理 - 知乎 一、什么是 Tree ShakingTree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实… https://zhuanlan.zhihu.com/p/403901557](https://zhuanlan.zhihu.com/p/403901557 " Webpack 原理系列九：Tree-Shaking 实现原理 - 知乎 一、什么是 Tree ShakingTree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实… https://zhuanlan.zhihu.com/p/403901557")

[ 滑动验证页面  https://segmentfault.com/a/1190000041912948](https://segmentfault.com/a/1190000041912948 " 滑动验证页面  https://segmentfault.com/a/1190000041912948")

[webpack-deadcode-plugin](./webpack-deadcode-plugin/index.md "webpack-deadcode-plugin")

[tree shaking原理](<./tree shaking原理/index.md> "tree shaking原理")

[umi](IT/前端专题/方案设计/方案设计三/清理老项目/在源码中去除dead%20code_副本/umi/umi.md "umi")

[webpack](IT/前端专题/方案设计/方案设计三/清理老项目/在源码中去除dead%20code_副本/webpack/webpack.md "webpack")
