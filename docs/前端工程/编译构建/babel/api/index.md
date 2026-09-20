# api

## 目录

- [Babel api 介绍](#Babel-api-介绍)

## Babel api 介绍

之前介绍了 babel 的编译流程和 AST，我们就大概知道了 babel 做了什么。但是还需要了解下 babel 的 api，然后通过这些 api 来操作 AST，完成代码的转换。

我们知道 babel 的编译**流程分为三步：parse、transform、generate**，每一步都暴露了一些 api 出来。

- parse 阶段有 **@babel/parser，功能是把源码转成 AST**
- transform 阶段有 @babel/traverse，**可以遍历 AST，并调用 visitor 函数修改 AS**T，修改 AST 自然涉及到 AST 的判断、创建、修改等，这时候就需要 @babel/types 了，当需要**批量创建 AST** 的时候可以使用 @babel/template 来简化 AST 创建逻辑。
- generate 阶段会把\*\* AST 打印为目标代码字符串，同时生成 sourcemap\*\*，需要 @babel/generator 包，中途遇到错误想打印代码位置的时候，可以使用 @babel/code-frame 包
- babel 的**整体功能通过 @babel/core 提供，基于上面的包完成 babel 整体的编译流程，并应用 plugin 和 preset**。

**这些包的 api 都可以在**[**文档**](https://link.juejin.cn?target=https://babel.docschina.org/docs/en/babel-parser/ "文档")**里查看。**

[@babel/parser](./@babel-parser/index.md "@babel/parser")

[@babel/traverse](./@babel-traverse/index.md "@babel/traverse")

[@babel/types](./@babel-types/index.md "@babel/types")

[@babel/generator](./@babel-generator/index.md "@babel/generator")

[@babel/template](./@babel-template/index.md "@babel/template")

[@babel/core](./@babel-core/index.md "@babel/core")
