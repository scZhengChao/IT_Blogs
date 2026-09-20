# exports

## 目录

- [1. 基本语法](#1-基本语法)
- [2. 条件导出（Conditional Exports）](#2-条件导出Conditional-Exports)
  - [2.1 环境条件](#21-环境条件)
  - [2.2 模块系统条件](#22-模块系统条件)
  - [2.3 嵌套条件](#23-嵌套条件)
- [3. 官方支持的导出条件](#3-官方支持的导出条件)
- [4. 社区常用条件](#4-社区常用条件)
- [5. 子路径导出](#5-子路径导出)
- [6. 禁止未声明的导出](#6-禁止未声明的导出)
- [7. 完整示例](#7-完整示例)
- [8. 最佳实践](#8-最佳实践)
- [9. 注意事项](#9-注意事项)

如果在package.json中定义了exports字段，那么这个字段所定义的**内容就是该npm包的****真实和全部的导出****，优先级会高于main和file等字段。**

```react tsx 
{ 
  "name": "pkg", 
  "exports": { 
      ".": "./main.mjs", 
      "./foo": "./foo.js" 
  } 
}

import { something } from "pkg"; // from "pkg/main.mjs"
const { something } = require("pkg/foo"); // require("pkg/foo.js")
```


从上述的例子来看，exports可以定义不同path的导出。如果存在exports后，以前正常生效的file目录到处会失效，比如require('pkg/package.json')，因为在exports中没有指定，就会报错。

exports还有一个**最大的特点，就是条件引用，比如我们可以根据不同的引用方式或者模块化类型，**来**指定npm包引用不同的入口文件。**

```react tsx 
// package.json 
{ 
   "name":"pkg",
   "main": "./main-require.cjs", 
   "exports": { 
     "import": "./main-module.js", 
     "require": "./main-require.cjs" 
   }, 
   "type": "module" 
 }
```


通过 **require** 引用的就是"./main-require.cjs"，

通过 **import** 引用的就是"./main-module.js"

总结： ***如果存在exports属性，exports属性不仅优先级高于main，同时也高于module和browser字段。***

## 1. 基本语法

```json 
"exports": {
  ".": "./main.js",  // 主入口
  "./feature": "./feature.js"  // 子路径导出
}
```


## 2. 条件导出（Conditional Exports）

### 2.1 环境条件

```json 
"exports": {
  ".": {
    "node": "./node.js",  // Node.js 环境
    "browser": "./browser.js",  // 浏览器环境
    "default": "./universal.js"  // 默认回退
  }
}
```


### 2.2 模块系统条件

```json 
"exports": {
  ".": {
    "import": "./esm.js",  // ESM 导入
    "require": "./cjs.js",  // CommonJS 导入
    "default": "./fallback.js"
  }
}
```


### 2.3 嵌套条件

```json 
"exports": {
  ".": {
    "node": {
      "import": "./node-modern.js",
      "require": "./node-legacy.js"
    },
    "browser": {
      "import": "./browser-modern.js",
      "require": "./browser-legacy.js"
    },
    "default": "./universal.js"
  }
}
```


## 3. 官方支持的导出条件

| 条件                | 说明             |
| ----------------- | -------------- |
| \`"import"\`      | ESM 模块导入时匹配    |
| \`"require"\`     | CommonJS 导入时匹配 |
| \`"node"\`        | Node.js 环境     |
| \`"node-addons"\` | 原生插件场景         |
| \`"browser"\`     | 浏览器环境          |
| \`"default"\`     | 默认回退条件         |

## 4. 社区常用条件

| 条件                | 说明                               |
| ----------------- | -------------------------------- |
| \`"development"\` | 开发环境 (\`NODE\_ENV=development\`) |
| \`"production"\`  | 生产环境 (\`NODE\_ENV=production\`)  |
| \`"types"\`       | TypeScript 类型定义                  |
| \`"deno"\`        | Deno 运行时环境                       |
| \`"worker"\`      | Web Worker 环境                    |

## 5. 子路径导出

```javascript 
"exports": {
  ".": "./main.js",
  "./utils": "./utils/index.js",
  "./package.json": "./package.json"  // 显式暴露 package.json
}
```


## 6. 禁止未声明的导出

```javascript 
"exports": {
  ".": "./main.js"
}
// 这样配置后，只能通过 import 'pkg' 访问，
// import 'pkg/internal' 会报错
```


## 7. 完整示例

```json 
"exports": {
  ".": {
    "types": "./dist/types/index.d.ts",
    "node": {
      "import": "./dist/esm/node.js",
      "require": "./dist/cjs/node.js"
    },
    "browser": {
      "import": "./dist/esm/browser.js",
      "require": "./dist/cjs/browser.js"
    },
    "default": "./dist/esm/index.js"
  },
  "./feature": {
    "types": "./dist/types/feature.d.ts",
    "import": "./dist/esm/feature.js",
    "require": "./dist/cjs/feature.js"
  },
  "./package.json": "./package.json"
}
```


## 8. 最佳实践

1. \*\*始终包含 \*\*​**`"default"`** 作为回退
2. \*\*为 TypeScript 提供 \*\*​**`"types"`** 条件
3. **区分 ESM 和 CommonJS** 导出
4. **明确列出所有可用子路径**
5. **考虑开发/生产环境差异**
6. **测试不同环境的导入行为**

## 9. 注意事项

1. `"exports"`会覆盖 `"main"`和 `"browser"`字段
2. 未声明的子路径无法访问（提高了安全性）
3. Node.js 12+ 才支持此功能
4. 条件匹配是按顺序进行的（第一个匹配的生效）
