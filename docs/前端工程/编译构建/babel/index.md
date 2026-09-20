# babel

## 目录

- [Babel 基本原理与作用](#Babel-基本原理与作用)
- [作用](#作用)
- [基本原理](#基本原理)
- [Babel的流程](#Babel的流程)
- [配置和使用](#配置和使用)
  - [1）单个软件包在 .babelrc 中配置](#1单个软件包在-babelrc-中配置)
  - [2）vue中，在babel.config.js中配置](#2vue中在babelconfigjs中配置)
  - [3）配置browserslist](#3配置browserslist)

# Babel 基本原理与作用

`Babel` 是一个 `JS 编译器`，把我们的代码转成浏览器可以运行的代码

# **作用**

babel 主要用于将新版本的代码转换为向后兼容的js语法(`Polyfill` 方式)，以便能够运行在各版本的浏览器或其他环境中

# **基本原理**

核心就是 `AST (抽象语法树)`

首先将源码转成抽象语法树，然后对语法树进行处理生成新的语法树，最后将新语法树生成新的 JS 代码

# **Babel的流程**

**3 个阶段： parsing (解析)、transforming (转换)、generating (生成)**

1）通过`babylon`将js转化成ast (抽象语法树)

2）通过`babel-traverse`是一个对ast进行遍历，使用babel插件转化成新的ast

3）通过`babel-generator`将ast生成新的js代码

# 配置和使用

#### **1）单个软件包在 ****`.babelrc`**** 中配置**

```typescript 
.babelrc {
  // 预设: Babel 官方做了一些预设的插件集，称之为 Preset，我们只需要使用对应的 Preset 就可以了
  "presets": [],
   // babel和webpack类似，主要是通过plugin插件进行代码转化的，如果不配置插件，babel会将代码原样返回
  "plugins": []
}
```


#### **2）vue中，在babel.config.js中配置**

配置babel-plugin-component插件，按需引入elementUI

```typescript 
module.exports = {
   presets: ["@vue/app"], 
    // 配置babel-plugin-component插件
   plugins: [
        [
    "component",
    {
      libraryName: "element-ui",
      styleLibraryName: "theme-chalk"
  }
     ]
  ]
};

```


#### **3）配置**\*\*`browserslist`\*\*

`browserslist` 用来控制要兼容浏览器版本，配置的范围越具体，就可以更精确控制`Polyfill`转化后的体积大小

```typescript 
"browserslist": [
   // 全球超过1%人使用的浏览器
   "> 1%",
   //  所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本
   "last 2 versions",
   // chrome 版本大于70
   "chrome >= 70"  
   // 排除部分版本
   "not ie <= 8"
]

```


[插件开发](IT/前端工程/编译构建/babel/插件开发/插件开发.md "插件开发")

[ Babel 入门教程 - 阮一峰的网络日志  https://www.ruanyifeng.com/blog/2016/01/babel.html](https://www.ruanyifeng.com/blog/2016/01/babel.html " Babel 入门教程 - 阮一峰的网络日志  https://www.ruanyifeng.com/blog/2016/01/babel.html")

[ 使用指南 · Babel 中文网 Babel 工具链是由大量的工具组成的，无论你是 “最终用户” 还是在集成 Babel，这些工具都简化了 Babel 的使用。本文是对这些工具的使用方法的快速介绍，你可以在文档的 “用法” 章节了解到更多信息。 https://www.babeljs.cn/docs/usage](https://www.babeljs.cn/docs/usage " 使用指南 · Babel 中文网 Babel 工具链是由大量的工具组成的，无论你是 “最终用户” 还是在集成 Babel，这些工具都简化了 Babel 的使用。本文是对这些工具的使用方法的快速介绍，你可以在文档的 “用法” 章节了解到更多信息。 https://www.babeljs.cn/docs/usage")

[ Babel 是什么？ · Babel 中文网 ## Babel 是一个 JavaScript 编译器 https://www.babeljs.cn/docs/](https://www.babeljs.cn/docs/ " Babel 是什么？ · Babel 中文网 ## Babel 是一个 JavaScript 编译器 https://www.babeljs.cn/docs/")

[api](IT/前端工程/编译构建/babel/api/api.md "api")

[方案](IT/前端工程/编译构建/babel/方案/方案.md "方案")

[AST](./AST/index.md "AST")

[基础](IT/前端工程/编译构建/babel/基础/基础.md "基础")

[ Babel · The compiler for next generation JavaScript The compiler for next generation JavaScript https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie\_mob%2011\&build=\&builtIns=false\&corejs=3.21\&spec=false\&loose=false\&code\_lz=MYGwhgzhAECyCeBhcVoG8BQ1pmMAplAPYBO0AtvAEJFEj5gB20AvNAGZggT4YC-GDMCKMIAF2hj85AA6tojfAHc4SFBAAUASiEiIdfADoQRAOYaA5OwCWJcRYA0k6TMOUaBpjoxTZb6rT0TPJiJACu-ADcuqIGxmaWPMKMACaOzn7ugQyMWkA\&debug=false\&forceAllTransforms=false\&modules=false\&shippedProposals=false\&evaluate=true\&fileSize=false\&timeTravel=false\&sourceType=module\&lineWrap=false\&presets=env%2Creact\&prettier=false\&targets=\&version=7.24.7\&externalPlugins=\&assumptions=%7B%7D](https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011\&build=\&builtIns=false\&corejs=3.21\&spec=false\&loose=false\&code_lz=MYGwhgzhAECyCeBhcVoG8BQ1pmMAplAPYBO0AtvAEJFEj5gB20AvNAGZggT4YC-GDMCKMIAF2hj85AA6tojfAHc4SFBAAUASiEiIdfADoQRAOYaA5OwCWJcRYA0k6TMOUaBpjoxTZb6rT0TPJiJACu-ADcuqIGxmaWPMKMACaOzn7ugQyMWkA\&debug=false\&forceAllTransforms=false\&modules=false\&shippedProposals=false\&evaluate=true\&fileSize=false\&timeTravel=false\&sourceType=module\&lineWrap=false\&presets=env%2Creact\&prettier=false\&targets=\&version=7.24.7\&externalPlugins=\&assumptions=%7B%7D " Babel · The compiler for next generation JavaScript The compiler for next generation JavaScript https://babeljs.io/repl#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011\&build=\&builtIns=false\&corejs=3.21\&spec=false\&loose=false\&code_lz=MYGwhgzhAECyCeBhcVoG8BQ1pmMAplAPYBO0AtvAEJFEj5gB20AvNAGZggT4YC-GDMCKMIAF2hj85AA6tojfAHc4SFBAAUASiEiIdfADoQRAOYaA5OwCWJcRYA0k6TMOUaBpjoxTZb6rT0TPJiJACu-ADcuqIGxmaWPMKMACaOzn7ugQyMWkA\&debug=false\&forceAllTransforms=false\&modules=false\&shippedProposals=false\&evaluate=true\&fileSize=false\&timeTravel=false\&sourceType=module\&lineWrap=false\&presets=env%2Creact\&prettier=false\&targets=\&version=7.24.7\&externalPlugins=\&assumptions=%7B%7D")
