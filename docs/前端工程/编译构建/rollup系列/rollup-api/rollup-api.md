# rollup-api

## 目录

- [如何学习](#如何学习)

[   https://juejin.cn/post/7209262585005572153](https://juejin.cn/post/7209262585005572153 "   https://juejin.cn/post/7209262585005572153")

[ 简介 | rollup.js 中文文档 | rollup.js中文网 Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中。 https://www.rollupjs.com/](https://www.rollupjs.com/ " 简介 | rollup.js 中文文档 | rollup.js中文网 Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中。 https://www.rollupjs.com/")

[   https://www.rollupjs.com/configuration-options/](https://www.rollupjs.com/configuration-options/ "   https://www.rollupjs.com/configuration-options/")

# 如何学习

一般我们实际使用场景是不会通过命令行去编译某个文件，而是针对整个项目去编译构建，因此一个完整`Rollup`构建项目主要有以下几个部分组成：

- `rollup` npm包，用于执行构建命令源头，可以安装本地项目，也可以安装全局命令，但是一般是跟着项目走
- `rollup.config.js` roll的配置文件，是所有命令的入口，也是学习Rollup的核心基础之一
- 插件部分，rollup有丰富的插件生态，如：Babel 编译代码，运行 JSON 文件等，可以让rollup完成更多复杂构建功能
- 输出插件，在rollup代码分析完成之后，才可以修改代码相关事项

这基本上就是`Rollup`项目构建所组成的部分了，接下来我们进行一一学习。

[插件](IT/前端工程/编译构建/rollup系列/rollup-api/插件/插件.md "插件")

[开发插件](开发插件.md "开发插件")

[配置](IT/前端工程/编译构建/rollup系列/rollup-api/配置/配置.md "配置")

[文章](文章.md "文章")

[常见问题](IT/前端工程/编译构建/rollup系列/rollup-api/常见问题/常见问题.md "常见问题")
