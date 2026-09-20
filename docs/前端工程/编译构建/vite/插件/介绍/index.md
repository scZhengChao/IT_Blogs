# 介绍

## 目录

- [1. 什么是 vite 插件](#1-什么是-vite-插件)
- [2. 为什么要写 vite 插件](#2-为什么要写-vite-插件)
- [快速体验](#快速体验)
- [创建 vite 插件通用模板](#创建-vite-插件通用模板)
  - [1. 初始化](#1-初始化)
  - [2. 配置 eslint 和 prettier（可选）](#2-配置-eslint-和-prettier可选)
  - [3. 新增 src/index.ts 入口](#3-新增-srcindexts-入口)
  - [4. 创建 examples 目录](#4-创建-examples-目录)
  - [5. 配置 examples/vite-vue3 项目](#5-配置-examplesvite-vue3-项目)
  - [6. 安装 tsup 配置运行命令](#6-安装-tsup-配置运行命令)
  - [7. 开发环境运行](#7-开发环境运行)
  - [8. 发布](#8-发布)
- [vite 的插件钩子 hooks 们](#vite-的插件钩子-hooks-们)
  - [1. vite 独有的钩子](#1-vite-独有的钩子)
  - [2. vite 与 rollup 的通用钩子之构建阶段](#2-vite-与-rollup-的通用钩子之构建阶段)
  - [3. vite 与 rollup 的通用钩子之输出阶段](#3-vite-与-rollup-的通用钩子之输出阶段)
  - [4. 插件钩子函数 hooks 的执行顺序（如下图）](#4-插件钩子函数-hooks-的执行顺序如下图)
  - [5. 插件的执行顺序](#5-插件的执行顺序)

## 1. 什么是 vite 插件

`vite` 其实就是一个由原生 `ES Module` 驱动的新型 Web 开发前端构建工具。

`vite 插件` \*\*就可以很好的扩展 ****`vite`**** 自身不能做到的事情，\*\*比如 `文件图片的压缩`、 `对 commonjs 的支持`、 `打包进度条` 等等。

## 2. 为什么要写 vite 插件

相信在座的每位同学，到现在对 `webpack` 的相关配置以及常用插件都了如指掌了吧；

`vite` 作为一个新型的前端构建工具，它还很年轻，也有很多扩展性，那么为什么我们不趁现在与它一起携手前进呢？做一些于你于我于大家更有意义的事呢？

# 快速体验

要想写一个插件，那必须从创建一个项目开始，下面的 `vite 插件通用模板` 大家以后写插件可以直接clone使用；

**插件通用模板 github：**[**体验入口**](https://link.juejin.cn?target=https://github.com/jeddygong/vite-templates/tree/master/vite-plugin-template "体验入口")

**插件 github：**[**体验入口**](https://link.juejin.cn?target=https://github.com/jeddygong/vite-plugin-progress "体验入口")

> yarn > npm > cnpm

长话短说，直接开干 \~

# 创建 `vite 插件通用模板`

## 1. 初始化

**1.1** 创建一个文件夹并且初始化：初始化按照提示操作即可

```typescript 
mkdir vite-plugin-progress && cd vite-plugin-progress && pnpm init 
```


**1.2** 安装 `typescript`

```typescript 
pnpm i typescript @types/node -D
```


**1.3** 配置 `tsconfig.json`

```typescript 
{
  "compilerOptions": {
    "module": "ESNext",
    "target": "esnext",
    "moduleResolution": "node",
    "strict": true,
    "declaration": true,
    "noUnusedLocals": true,
    "esModuleInterop": true,
    "outDir": "dist",
    "lib": ["ESNext"],
    "sourceMap": false,
    "noEmitOnError": true,
    "noImplicitAny": false
  },
  "include": [
    "src/*",
    "*.d.ts"
  ],
  "exclude": [
    "node_modules",
    "examples",
    "dist"
  ]
}
```


**1.4** 安装 `vite`

```typescript 
// 进入 package.json
{
    ...
    "devDependencies": {
        "vite": "*"
    }
    ...
}
```


## 2. 配置 `eslint` 和 `prettier`（可选）

1. 安装 `eslint`
   ```typescript 
   pnpm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
   ```

2. 配置 `.eslintrc`：[配置连接](https://link.juejin.cn?target=https://github.com/jeddygong/vite-plugin-progress/blob/main/.eslintrc "配置连接")
3. 安装 `prettier` （可选）
   ```typescript 
   pnpm i prettier eslint-config-prettier eslint-plugin-prettier --save-dev
   ```

4. 配置 `.prettierrc` ：[配置连接](https://link.juejin.cn?target=https://github.com/jeddygong/vite-templates/blob/master/vite-plugin-template/.prettierrc "配置连接")

## 3. 新增 `src/index.ts` 入口

```typescript 
import type { PluginOption } from 'vite';

export default function vitePluginTemplate(): PluginOption {
  return {
    // 插件名称
    name: 'vite-plugin-template',

    // pre 会较于 post 先执行
    enforce: 'pre', // post

    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: 'build', // apply 亦可以是一个函数

    config(config, { command }) {
      console.log('这里是config钩子');
    },

    configResolved(resolvedConfig) {
      console.log('这里是configResolved钩子');
    },

    configureServer(server) {
      console.log('这里是configureServer钩子');
    },

    transformIndexHtml(html) {
      console.log('这里是transformIndexHtml钩子');
    },
  }
}
```


**其中的 vite 插件函数钩子会在下面详细详解 \~**

到这里，那么我们的基本模版就建好了，但是我们现在思考一下，我们应该怎么去运行这个插件呢？

那么我们就需要创建一些 `examples` 例子来运行这个代码了；

## 4. 创建 examples 目录

我这里创建了三套项目 demo，大家直接 copy 就行了，这里就不详细介绍了

1. [vite-react](https://link.juejin.cn/?target=https://github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-react "vite-react")
2. [vite-vue2](https://link.juejin.cn/?target=https://github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-vue2 "vite-vue2")
3. [vite-vue3](https://link.juejin.cn/?target=https://github.com/jeddygong/vite-templates/tree/master/vite-plugin-template/examples/vite-vue3 "vite-vue3")

如果你的插件需要多跑一些 demo，自行创建项目即可；
**那么下面我们就需要配置 examples 下的项目与当前根目录的插件做一个联调了（下面以 examples/vite-vue3 为例）。**

## 5. 配置 `examples/vite-vue3` 项目

1. 修改 examples/vite-vue3/package.json

```typescript 
{
    ...
    "devDependencies": {
        ...
        "vite": "link:../../node_modules/vite",
        "vite-plugin-template": "link:../../"
    }
}
```


**上面意思就是说：**

- 要把 `examples/vite-vue3` 项目中的 vite 版本与根目录 `vite-plugin-template` 的版本一致；
- 同时要把 `examples/vite-vue3` 项目中的 `vite-plugin-template` 指向你当前根目录所开发的插件；

1. 引入插件： `examples/vite-vue3/vite.config.ts`

```typescript 
import template from 'vite-plugin-template';

export default defineConfig({
    ...
    plugins: [vue(), template()],
    ...
});
```


1. 安装： `cd examples/vite-vue3 && pnpm install`

```typescript 
cd examples/vite-vue3 && pnpm install
```


**思考：**

到这里，我们再思考一下，我们把 `examples/vite-vue3` 中的项目配置好了，但是我们应该怎么去运行呢？

直接去 `examples/vite-vue3` 目录下运行 `pnpm run build` 或者 `pnpm run dev` ？

这样显然是不能运行成功的，因为我们的vite-plugin-template根目录下的 `src/index.ts` 是没法直接运行的，所以我们需要把 `.ts` 文件转义成 `.js` 文件；

那么我们怎么处理呢？

那么我们不得不去试着用用一个轻小且无需配置的工具 `tsup` 了。

## 6. 安装 `tsup` 配置运行命令

**`tsup`**\*\* 是一个轻小且无需配置的，由 ****`esbuild`**** 支持的构建工具；\*\*

同时它可以直接把 `.ts、.tsx` 转成不同格式 `esm、cjs、iife` 的工具；

1. 安装 `tsup`

```typescript 
pnpm i tsup -D
```


1. 在根目录下的 `package.json` 中配置

```typescript 
{
  ...
  "scripts": {
    "dev": "pnpm run build --watch --ignore-watch examples",
    "build": "tsup src/index.ts --dts --format cjs,esm",
    "example:react": "cd examples/vite-react && pnpm run build",
    "example:vue2": "cd examples/vite-vue2 && pnpm run build",
    "example:vue3": "cd examples/vite-vue3 && pnpm run build"
  },
  ...
}
```


## 7. 开发环境运行

1. `开发环境运行`：实时监听文件修改后重新打包（热更新）
   ```typescript 
   pnpm run dev
   ```

2. 运行 `examples` 中的任意一个项目（以 vite-vue3 为例）
   ```typescript 
   pnpm run example:vue3
   ```


**注意：**

> 如果你的插件只会在 build 时运行，那就设置 `"example:vue3": "cd examples/vite-vue3 && pnpm run build"` ；
>
> 反之就运行 `pnpm run dev`

1. 输出：

![](./image/image_K33rszfvjE.png)

**到这里你就可以 ****`边开发边运行`**** 了，尤雨溪看了都说爽歪歪 \~**

> 我用的lerna；尤其擅长本地构建插件；软连接直接依赖；比他这个link 要好一点

## 8. 发布

1. 安装 `bumpp` 添加版本控制与 tag

```typescript 
pnpm i bumpp -D
```


1. 配置 `package.json`

```typescript 
{
  ...
  "scripts": {
    ...
    "prepublishOnly": "pnpm run build",
    "release": "npx bumpp --push --tag --commit && pnpm publish",
  },
  ...
}
```


1. 开发完插件后运行发布

```typescript 
# 第一步
pnpm run prepublishOnly

# 第二步
pnpm run release
```


那么到这里，我们的 `vite 插件模板` 就已经写好了，大家可以直接克隆 [vite-plugin-template 模板](https://link.juejin.cn/?target=https://github.com/jeddygong/vite-templates/tree/master/vite-plugin-template "vite-plugin-template 模板") 使用；

如果你对 `vite 的插件钩子` 和 `实现一个真正的 vite 插件` 感兴趣可以继续往下面看；

# vite 的插件钩子 hooks 们

## 1. vite 独有的钩子

1. `enforce` ：值可以是`pre` 或 `post` ， `pre` 会较于 `post` 先执行；
2. `apply` ：值可以是 `build` 或 `serve`  亦可以是一个函数，指明它们仅在 `build` 或 `serve` 模式时调用；
3. `config(config, env)` ：可以在 vite 被解析之前修改 vite 的相关配置。钩子接收原始用户配置 config 和一个描述配置环境的变量env；
4. `configResolved(resolvedConfig)` ：在解析 vite 配置后调用。使用这个钩子读取和存储最终解析的配置。当插件需要根据运行的命令做一些不同的事情时，它很有用。
5. `configureServer(server)` ：主要用来配置开发服务器，为 dev-server (connect 应用程序) 添加自定义的中间件；
6. `transformIndexHtml(html)` ：转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文；
7. `handleHotUpdate(ctx)`：执行自定义HMR更新，可以通过ws往客户端发送自定义的事件；

## 2. vite 与 rollup 的通用钩子之构建阶段

1. `options(options)` ：在服务器启动时被调用：获取、操纵Rollup选项，严格意义上来讲，它执行于属于构建阶段之前；
2. `buildStart(options)`：在每次开始构建时调用；
3. `resolveId(source, importer, options)`：在每个传入模块请求时被调用，创建自定义确认函数，可以用来定位第三方依赖；
4. `load(id)`：在每个传入模块请求时被调用，可以自定义加载器，可用来返回自定义的内容；
5. `transform(code, id)`：在每个传入模块请求时被调用，主要是用来转换单个模块；
6. `buildEnd(error?: Error)`：在构建阶段结束后被调用，此处构建结束只是代表所有模块转义完成；

## 3. vite 与 rollup 的通用钩子之输出阶段

1. `outputOptions(options)`：接受输出参数；
2. `renderStart(outputOptions, inputOptions)`：每次 bundle.generate 和 bundle.write 调用时都会被触发；
3. `augmentChunkHash(chunkInfo)`：用来给 chunk 增加 hash；
4. `renderChunk(code, chunk, options)`：转译单个的chunk时触发。rollup 输出每一个chunk文件的时候都会调用；
5. `generateBundle(options, bundle, isWrite)`：在调用 bundle.write 之前立即触发这个 hook；
6. `writeBundle(options, bundle)`：在调用 bundle.write后，所有的chunk都写入文件后，最后会调用一次 writeBundle；
7. `closeBundle()`：在服务器关闭时被调用

## 4. 插件钩子函数 hooks 的执行顺序（如下图）

![](./image/image_vrqWdYgBVD.png)

## 5. 插件的执行顺序

1. 别名处理Alias
2. 用户插件设置`enforce: 'pre'`
3. vite 核心插件
4. 用户插件未设置`enforce`
5. vite 构建插件
6. 用户插件设置`enforce: 'post'`
7. vite 构建后置插件(minify, manifest, reporting)
