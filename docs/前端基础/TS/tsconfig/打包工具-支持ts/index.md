# 打包工具-支持ts

## 目录

- [4.1 Rollup + TypeScript](#41-Rollup--TypeScript)
- [4.2 Webpack + TypeScript](#42-Webpack--TypeScript)
- [4.3 Babel + TypeScript](#43-Babel--TypeScript)
- [4.4 ESbuild + TypeScript](#44-ESbuild--TypeScript)

## 4.1 Rollup + TypeScript

在 Rollup 打包中，我们一般只需要添加 @rollup/plugin-typescript\[12] 插件即可，该插件会默认读取项目根目录下的 `tsconfig.json` 配置文件。

Rollup 的配置就像这样：

```typescript 
// file: rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [typescript()]
};
```


结合其源码：

![](./image/image_XLo0WbI8f5.png)

因为 typescript 声明了是 peerDependencies，因此会采用项目中安装的 typescript 版本，即是使用我们项目中的 TS 编译器。

通过阅读 @rollup/plugin-typescript 源码，可以看到该插件会默认使我们自己项目中的 tsconfig.json 文件作为 TSC 编译的配置，但会做一些配置预设覆盖：

会调用 ts.parseJsonConfigFileContent() 方法，将 FORCED\_COMPILER\_OPTIONS 值 merge 到用户的自定义配置中。

![](./image/image_hyVGhtBK5l.png)

通过英文解释看到，因为需要 TSC 编译获得 JS 产物，所以会将 noEmit 设置为 false，也就是 TSC 编译会输出文件，但为什么我们在输出目录却没有看到对应的 TSC 产物呐？

![](./image/image_3mKuMUNhDU.png)

但是如果开启了 declaration，则会将 TSC 解析得到的 \*.d.ts 文件输出到指定目录。

## 4.2 Webpack + TypeScript

在 Webpack 中的 TypeScript\[13] 官方文档中，指明了需要安装：`typescript` 和 `ts-loader` 两个模块。

配置 Webpack 并支持 TypeScript 的配置如下：

```typescript 
// file: webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

```


可以看出 Webpack 主要是依赖 `ts-loader` 实现对 TypeScript 语法的编译支持，再看看对 `ts-loader` 的介绍：

![](./image/image_hkeQZPlMbQ.png)

换句话说，ts-loader 实际调用了 TSC 来编译 TS 文件，TSC 的配置依赖于你项目中的 tsconfig.json 文件。

如果使用了 Babel，则可以使用 @babel/preset-typescript\[14] 来处理，但 Babel 不会做 TS 类型校验，在打包工具 Rollup 和 Webpack 中都可以引入 Babel，那么接下来看看 Babel 是如何处理 TypeScript 的吧！

## 4.3 Babel + TypeScript

Babel 处理 TS 需要安装 @babel/preset-typescript 模块，然后在 babel 项目配置文件中声明:

```typescript 
// 配置说明：https://babeljs.io/docs/en/babel-preset-typescript
{
  "presets": ["@babel/preset-typescript"]
}

```


但 **Babel 中只会对 TS 代码转为 JS 代码（通过 parse TS 文件为 AST，并直接移除类型信息，然后打印目标代码）**，不会去**做 TS 类型检查，所以 Babel 编译 TS 文件相较于 TSC 的速度更快！**

同时，因为 Babel 会根据不同的兼容环境，按需引入 pollyfill，比 TSC 直接引入 `core-js` 更优雅，**因此使用了 Babel 打包的体积也会更小。**

TS 类型检查工作可以交给代码编辑器承担，当然同时可以新增 TS 检查的命令：

```typescript 
// package.json
{
  "script": {
    "tsCheck": "tsc --noEmit",
  }
}

```


可以把类型检查放到特定的 npm scripts 生命周期之前，另外其实也可以将类型检查放到 git commit 阶段，用于做必要的 TS 类型检查，保证项目的正确性。

## 4.4 ESbuild + TypeScript

通过 Vite 体会到了 ESbuild\[15] 带来的开发热更新“极速”体验，针对 TS 项目，ESbuild 和 Babel 是相同的编译策略，即**仅编译，不校验类型**。

ESbuild 处理 TypeScript\[16] 同样可以带来飞一般的感觉！

> Vite 使用 esbuild 将 TypeScript 转译到 JavaScript，约是 tsc 速度的 20\~30 倍，同时 HMR 更新反映到浏览器的时间小于 50ms。—— Vite Docs\[17]

但在 ESbuild 中需要启用 tsconfig 中的 `isolatedModules` 功能，然后在类型引入的时候需要替换，规则参考如下：

```typescript 
// old
import { UserType } from './types';

// new
import type { UserType } from './types';
```


因为 ESbuild 是单独编译每个文件，无法判断引入的是 Type（类型） 还是 值，所以**需要开发者显示地声明是“Type”。**

同时还需要启用 `esModuleInterop` 功能，用于支持 ESM 模块合成默认导入，以兼容 CJS 和 ESM 规范。

另外 ESbuild 不支持：`emitDecoratorMetadat`、`const enum` 类型和 `*.d.ts` 文件

此外，关注到兼容性处理这方面，Bable 和 ESbuild 是类似的，因此会存在兼容性问题：

![](./image/image_arVvWsIhxe.png)

对于装饰器处理不支持，因为 TS 是 JS 的超集，ESnext 的规范提案某些还不是稳定的，因此如果有这方面诉求的项目，可以借助 TSC 做预编译，例如使用 Rollup 的 typescript 插件 或 Webpack 的 ts-loader 方式。
