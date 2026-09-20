# 快速开始

## 目录

- [一、什么是 rollup](#一什么是-rollup)
- [二、为什么是 rollup](#二为什么是-rollup)
- [三、支持打包的文件格式](#三支持打包的文件格式)
- [四、快速开始](#四快速开始)
  - [1. 安装](#1-安装)
  - [2. 基础打包](#2-基础打包)
  - [3. 引入外部资源](#3-引入外部资源)
    - [3.1 resolve 插件](#31-resolve-插件)
    - [3.2 external 属性](#32-external-属性)
    - [3.3 external 插件](#33-external-插件)
  - [4. 引入 CommonJs 模块](#4-引入-CommonJs-模块)
    - [4.1 CommonJs 插件](#41-CommonJs-插件)
  - [5. 引入 Sass 资源](#5-引入-Sass-资源)
    - [5.1 打包支持 sass 文件](#51-打包支持-sass-文件)
    - [5.2 css 加前缀](#52-css-加前缀)
    - [5.3 css 压缩](#53-css-压缩)
    - [5.4 抽离单独的 css 文件](#54-抽离单独的-css-文件)
  - [6. 引入 Typescript 资源](#6-引入-Typescript-资源)
    - [6.1 typescript 插件](#61-typescript-插件)
    - [6.2 导出类型声明文件](#62-导出类型声明文件)
  - [7. 打包产物清除调试代码](#7-打包产物清除调试代码)
  - [8. 打包输出文件保留原始模块结构](#8-打包输出文件保留原始模块结构)
  - [9. 按需加载](#9-按需加载)

## 一、什么是 `rollup`

`rollup` 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

## 二、为什么是 `rollup`

为什么是 `rollup` 而不是 `webpack` 呢？

`rollup`的特色是 `ES6` 模块和代码 `Tree-shaking`，这些 `webpack` 同样支持，除此之外 `webpack` 还支持热模块替换、代码分割、静态资源导入等更多功能。

当开发应用时当然优先选择的是 `webpack`，但是若你项目只需要打包出一个简单的 `bundle` 包，并是基于 `ES6` 模块开发的，可以考虑使用 `rollup`。

**`rollup`**\*\* 相比 ****`webpack`****，它更少的功能和更简单的 api，是我们在打包类库时选择它的原因。\*\*

## 三、支持打包的文件格式

rollup 支持的打包文件的格式有 amd, cjs, es\esm, iife, umd。其中，amd 为 AMD 标准，cjs 为 CommonJS 标准，esm\es 为 ES 模块标准，iife 为立即调用函数， umd 同时支持 amd、cjs 和 iife。

## 四、快速开始

### 1. 安装

```typescript 
npm install --global rollup

```


### 2. 基础打包

新增文件 `src/main.js`：

```typescript 
// src/main.js
import foo from "./foo.js";
export default function () {
  console.log(foo);
}
```


新增文件 `src/foo.js`：

```typescript 
export default "hello world!";
```


项目根目录下新增文件 `rollup.config.js`：

```typescript 
export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
};
```


运行命令：

```typescript 
rollup -c
```


得到产物 `bundle.js`：

### 3. 引入外部资源

更新 `src/main.js`，添加外部资源 `lodash-es` 引入：

```typescript 
// src/main.js
import foo from "./foo.js";

import { sum } from "lodash-es";

export default function () {
  console.log(foo);
  console.log(sum[(1, 2)]);
}
```


再次打包 `rollup -c`，发现有报错 `(!) Unresolved dependencies`：

![](./image/image_04tRwZd7eH.png)

这是因为当项目中引入外部资源时，如 npm 包，`rollup` 不知道如何打破常规去处理这些依赖。

有 2 种方法引入外部资源：

- 添加插件 `@rollup/plugin-node-resolve` 将我们编写的源码与依赖的第三方库进行合并；
- 配置 external 属性，告诉 rollup.js 哪些是外部的类库。

#### 3.1 resolve 插件

`@rollup/plugin-node-resolve` 插件让 rollup 能够处理外部依赖。

```typescript 
//安装：
yarn add @rollup/plugin-node-resolve -D
//更新 rollup.config.js：
import resolve from "@rollup/plugin-node-resolve";
export default {
  plugins: [resolve()],
};


```


重新打包得到产物，已经包含了 `lodash-es`：

```typescript 
"use strict";

var foo = "hello world!";

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
    index = -1,
    length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
}

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
  return array && array.length ? baseSum(array, identity) : 0;
}

// src/main.js

function main() {
  console.log(foo);
  console.log(sum([1, 2]));
}

module.exports = main;
```


#### 3.2 external 属性

有些场景下，虽然我们使用了 resolve 插件，但可能我们仍然想要某些库保持外部引用状态，这时我们就需要使用 external 属性，来告诉 rollup.js 哪些是外部的类库。

```typescript 
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "esm",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs()],
  external: ["react"],
};
```


#### 3.3 external 插件

每个类库都要手动添加至 externals 未免太麻烦，这时候可以用 `rollup-plugin-node-externals` 插件，自动将外部类库声明为 externals。

安装： yarn add rollup-plugin-node-externals -D

```typescript 
import externals from "rollup-plugin-node-externals";

export default [
  {
    plugins: [
      externals({
        devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
      }),
    ],
  },
];
```


### 4. 引入 CommonJs 模块

#### 4.1 CommonJs 插件

rollup.js 编译源码中的模块引用默认只支持 ES6+的模块方式 import/export。然而大量的 npm 模块是基于 CommonJS 模块方式，这就导致了大量 npm 模块不能直接编译使用。

需要添加 @rollup/plugin-commonjs 插件来支持基于 CommonJS 模块方式 npm 包。

安装： yarn add @rollup/plugin-commonjs -D

```typescript 
import commonjs from "@rollup/plugin-commonjs";

export default {
  plugins: [commonjs()],
};
```


更新 src/foo.js：

```typescript 
module.exports = {
  text: "hello world!",
};
```


### 5. 引入 Sass 资源

rollup-plugin-postcss 默认集成了对 scss、less、stylus 的支持。

安装：yarn add rollup-plugin-postcss -D

更新 rollup.config.js：

```typescript 
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "esm",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs(), postcss()],
  external: ["react"],
};
```


#### 5.1 打包支持 sass 文件

新增 `src/foo.scss`：

```sass (scss)  
body {
  background-color: red;
  display: flex;
}
```


更新 `src/main.js`：

```typescript 
// src/main.js
import foo from "./foo.js";
import "./foo.scss";

export default function () {
  console.log(foo.text);
}
```


打包产物：

```typescript 
"use strict";

var foo = {
  text: "hello world!",
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === "undefined") {
    return;
  }

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body {\n  background-color: red;\n}";
styleInject(css_248z);

// src/main.js

function main() {
  console.log(foo.text);
}

module.exports = main;
```


#### 5.2 css 加前缀

安装：yarn add autoprefixer -D

更新 packages.json：

```typescript 

  "browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```


更新 rollup.config.js：

```typescript 
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "test",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({
      plugins: [autoprefixer()],
    }),
  ],
  external: ["react"],
};
```


![](./image/image_uqH5mHTLcb.png)

#### 5.3 css 压缩

安装：yarn add cssnano -D

更新 rollup.config.js：

```typescript 
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "test",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({
      plugins: [autoprefixer(), cssnano()],
    }),
  ],
  external: ["react"],
};
```


![](./image/image_OZPKYynlQA.png)

#### 5.4 抽离单独的 css 文件

更新 `rollup.config.js`：

```typescript 
export default [
  {
    plugins: [
      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: "css/index.css",
      }),
    ],
  },
];
```


![](./image/image_w8b1HJwvrv.png)

### 6. 引入 Typescript 资源

#### 6.1 typescript 插件

修改 `src/foo.js` -> `src/foo.ts`：

```typescript 
//src/foo.ts
export default {
  text: "hello world!",
};

// src/main.js
import foo from "./foo.ts";
import "./foo.scss";

export default function () {
  console.log(foo.text);
}

```


安装：yarn add @rollup/plugin-typescript -D

```typescript 
import typescript from "@rollup/plugin-typescript";
export default [
  {
    plugins: [typescript()];
  }
];
```


成功支持 Ts 文件导出：

![](./image/image_OcUXtFTziF.png)

#### 6.2 导出类型声明文件

更新 rollup.config.js：

```typescript 
import typescript from "@rollup/plugin-typescript";
export default [
  {
    plugins: [
        typescript({
            outDir: "dist",
            declaration: true,
            declarationDir: "dist",
        })
    ];
  }
];
```


成功支持类型声明文件导出：

![](./image/image_1EokHZc2Oi.png)

### 7. 打包产物清除调试代码

插件 `@rollup/plugin-strip` 用于从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等。

安装：yarn add @rollup/plugin-strip -D

更新 rollup.config.js：

```typescript 
import strip from "@rollup/plugin-strip";
export default [
  {
    plugins: [
        strip()
    ];
  }
];
```


### 8. 打包输出文件保留原始模块结构

上面我们的 output 配置是这样的：

```typescript 
output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
  }
```


打包产物如下：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbade42b786b41a7b957d66052396733~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

那么怎么才能把 index.js、index2.js 改成 foo/index.js、hello/index.js 呢？

修改 output，更新 rollup.config.js：

```typescript 
output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
    exports: 'named', // 指定导出模式（自动、默认、命名、无）
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
  },
```


这时打包产物就和源码的结构一致了：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfa326d7746a41fda5fa8fabd141c93b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 9. 按需加载

rollup 支持输出格式为 `es` 模块化，就会按模块输出。

所以我们上面的配置已经实现了按需加载了。
