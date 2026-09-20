# 更换 monorepo 源码引用的方式

## 目录

- [4.1 司内主项目的构建方式和源码引用方案](#41-司内主项目的构建方式和源码引用方案)
  - [解释exports](#解释exports)
- [5.1 SDK 构建工具替换、monorepo源码引用](#51-SDK-构建工具替换monorepo源码引用)

> 我们的一个 monorepo 项目中，SDK 子项目通过 **alias**被其他项目引入 \*\*（从源码引入而不是从dist）**时**无法模块化 \*\*（alias本身很冗长），与此同时，目前的项目打包速度也偏慢，因此考虑更换 monorepo 源码引用的方式，同时更换 SDK 子项目的构建工具。

在这里我们通过图来进一步 get 这个需求：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/894d7acfd96b4cbaa9c6d2f3b82f0dcd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2012\&h=1614\&s=169614\&e=png\&b=bcf7c6)

## 4.1 司内主项目的构建方式和源码引用方案

我们先来看看两个项目的构建方式

- 项目A：司内的构建工具，内核基于 `Webpack`
- 项目B-SDK：`Gulp` + `Babel`

其中 `项目B-SDK` 通过在 `package.json` 中配置 `export` 字段导出路径，与此同时 `项目A` 中的 `tsconfig.json` 中的 `references` 配置字段指向了 `项目B-SDK` 依赖。

听起来是不是有点绕，我们先来解释一下这些字段的作用：

#### 解释exports

通过在 package.json 文件中的 `exports` 字段中指定特定的属性，可以定义模块的导出路径。

```json 
{
  "name": "my-package",
  "exports": {
    ".": {
      "import": "./src/index.js",
      "require": "./dist/index.js",
      "default": "./dist/index.js"
    },
    "./utils": {
      "import": "./src/utils.js",
      "require": "./dist/utils.js"
    }
  }
}

```


`.` 表示默认导出，而 `./utils` 表示一个特定的导出路径

我们再结合 monorepo，给出案例：

```markdown title="项目结构"

my-monorepo/
  packages/
    package-a/
      package.json
      src/
        index.js
    package-b/
      package.json
      src/
        index.js

```


```json title="package-a/package.json"
{
  "name": "package-a",
  "exports": {
    "./count": "./src/count.js"
  }
}

```


```javascript title="package-b/src/index.js"
import { someFunction } from 'package-a/count';

```


注意，别名的引用要通过 `tsconfig` 配置（compilerOptions 中的 path）

[什么是 references](<../../../../../前端基础/TS/tsconfig/references/什么是 references/index.md> "什么是 references")

注意事项：

1. 所有被引用的项目都应该设置 `"composite": true` 在它们的 `compilerOptions` 中，这样它们才能被其他项目引用。
2. 引用的项目会生成 `.d.ts` 声明文件，这些文件会被依赖它的项目使用，以了解类型信息。

在了解两个字段的作用后，我们再来通过一张图来搞清整个源码引用的流程：

![](./assets/image/image_R4KUPUIZ8K.png)

## 5.1 SDK 构建工具替换、monorepo源码引用

这个需求其实就是之前长篇大论的部分，其中对于构建工具的替换暂且忽略（没啥好说的，虽然挺坐牢），我们主要讲讲我是如何实现了 `monorepo` 的源码引用方案。
**alias 配置**
首先需要调整 `alias` 的配置，我们只需要在 `SDK` 的 `tsconfig` 中配置 `path` 字段，即可实现别名引用（这个是给编译工具读取的），与此同时，`SDK` 的构建工具 `x` 内置了自动读取 `tsconfig` 配置处理为自己的 `alias` 配置的功能，因此无需在 `x` 中额外配置 `alias`。

```json 
"@sdk/*": "./src/*",
"$componet-a/*": "./src/module/ui/componet-a/*",
"$componet-b/*": "./src/module/ui/componet-b/*",

```


与此同时，我们可以在 `A` 中的 `tsconfig` 配置 `SDK` 包的别名引用，这样可以让 `lint` 的 `fix` 支持从 `SDK` 引入（说白了就是让编译器读懂，虽然 `export` 也做到了这个功能，但是没法让 `lint` 获取）

```markdown 
"@/*": "./src/*",
"@sdk/*": "../sdk/src/*",

```
