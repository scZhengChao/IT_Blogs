# cross-env

## 目录

- [cross-env](#cross-env)
- [process](#process)
  - [process对象提供一系列属性，用于返回系统信息。](#process对象提供一系列属性用于返回系统信息)
  - [process.env.NODE\_ENV的作用](#processenvNODE_ENV的作用)
- [webpack4之前](#webpack4之前)
- [webpack4版本之后](#webpack4版本之后)
  - [注意【关键点，勿混淆】：](#注意关键点勿混淆)
    - [举个栗子：](#举个栗子)
    - [再举个栗子：](#再举个栗子)
- [小结：](#小结)
  - [webpack4新特性mode](#webpack4新特性mode)
    - [1. production](#1-production)
    - [2. development](#2-development)
    - [3. none](#3-none)
    - [小结](#小结)

**环境变量 mode  cross-env  DefinePlugin**

[https://www.cnblogs.com/fe-linjin/p/11963765.html](https://www.cnblogs.com/fe-linjin/p/11963765.html "https://www.cnblogs.com/fe-linjin/p/11963765.html")  一篇优秀好文

# cross-env

> 这里又个坑；  cross-env NODE\_ENV=uat   && npm run build. ;**不能这么写；不能有&&**&#x20;

```typescript 
npm i cross-env   （优点跨平台；兼容）

# 在不同平台上设置环境变量的方式不同，用cross-env统一设置环境变量  
"dev": "cross-env NODE_ENV=development node ./webpack/server.js ",
"build": "cross-env NODE_ENV=production node ./webpack/build.js ",
"build:uat": "cross-env NODE_ENV=uat node ./webpack/build.js ",
"build:sit": "cross-env NODE_ENV=sit node ./webpack/build.js ",


"dev": " set NODE_ENV=development&&nodemon app.js",             window
"dev-linux": " export NODE_ENV=development&&nodemon app.js",               linux

```


- **DefinePlugin和mode****选项定义的NODE\_ENV 作用于webpack入口文件下的业务代码****，通常为src文件夹下的代码**
- \*\*而 npm脚本里的设置****多用于配置相关****，例如在webpack.config.js里区分环境配置不同插件。\*\***只能在当前脚本中生效，是个runtime**

```typescript 
const webpack = require('webpack');
module.exports  = {
    entry: {
         app: './src/app'
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 这里需要注意的是，值对应的格式必须是" "XXXX" "这种格式，所以会用 JSON.stringify 进行转换。
        })
    ]
};

webpack4版本之后可以通过mode选项实现
module.exports = {
    // 定义环境变量
    mode: 'development',
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    },
};



```


> 举个栗子：
> 例如webpack.config.js的mode我们设置为production，而脚本中执行NODE\_ENV=development，那么在模块当中NODE\_ENV的值为production，而配置文件webpack.config.js中的NODE\_ENV的值为development

> 再举个栗子：
> 如果没有在npm script脚本中
> 设置NODE\_ENV，但在webpack.config.js中设置了mode，那么我们在webpack.config.js中console出process.env.NODE\_ENV的值就是undefined，因此如下代码可能就达不到我们想要的效果

# process

process是Node的一个全局变量，提供了当前Node进程的信息，它可以在脚本的任意位置使用，不需要通过require命令加载

#### process对象提供一系列属性，用于返回系统信息。

- process.argv：返回当前进程的命令行参数数组。
- process.env：返回一个对象，成员为当前Shell的环境变量，比如process.env.HOME。
- process.installPrefix：node的安装路径的前缀，比如/usr/local，则node的执行文件目录为/usr/local/bin/node。
- process.pid：当前进程的进程号。
- process.platform：当前系统平台，比如Linux。
- process.title：默认值为“node”，可以自定义该值。
- process.version：Node的版本，比如v0.10.18。

### process.env.NODE\_ENV的作用

1.这个变量并不是 process.env 直接就有的，而是通过设置得到的。其实，更准确的来说是**前端工程化过程中大家约定俗成的做法**，尤其是webpack构建前端工程时，会经常使用。

2.其值通常为“production”（生产环境）和“development”（开发环境），或者“prod”和“dev”，以此来区分不同环境下的逻辑行为

```javascript 
if (process.env.NODE_ENV === 'development') { 
    //开发环境 do something
} else {
    //生产环境 do something
}

```


那这个属性是什么时候赋值给process.env的呢？

以webpack的工程为例，通常是运行脚本时来做这件事，例如package.json中的脚本：

```json 
"scripts": {
    "build": "cross-env NODE_ENV=production node build/webpack.prod.js",
    "start": "cross-env NODE_ENV=development node build/webpack.dev.js"
},

```


这样，**就可以在webpack.config.js中使用process.env.NODE\_ENV了**，但是**要注意不能在webpack.config.js引入的模块中使用，要想在模块当中直接使用，我们还需要一些配置。**

# webpack4之前

webpack4之前可以使用DefinePlugin插件配置

```javascript 
// webpack.config.js
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app'
    },
    output: {
        path: 'dist',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // 这里需要注意的是，值对应的格式必须是" "XXXX" "这种格式，所以会用 JSON.stringify 进行转换。
        })
    ]
}

```


# webpack4版本之后

webpack4版本之后可以通过mode选项实现

```javascript 
module.exports = {
    // 定义环境变量
    mode: 'development',
    // JavaScript 执行入口文件
    entry: './main.js',
    output: {
        // 把所有依赖的模块合并输出到一个 bundle.js 文件
        filename: 'bundle.js',
        // 输出文件都放到 dist 目录下
        path: path.resolve(__dirname, './dist'),
    }, 
};


```


### 注意【关键点，勿混淆】：

**通过npm script设置的NODE\_ENV和通过DefinePlugin、mode选项定义的NODE\_ENV是两个相互独立的变量**

NODE\_ENV=developmen这种方式定义的NODE\_ENV**只能在当前脚本中生效，是个runtime**。

#### 举个栗子：

例如webpack.config.js的mode我们设置为production，而脚本中执行NODE\_ENV=development，那么在模块当中NODE\_ENV的值为production，而配置文件webpack.config.js中的NODE\_ENV的值为development

#### 再举个栗子：

如果没有在npm script脚本中\
设置NODE\_ENV，但在webpack.config.js中设置了mode **，那么我们在webpack.config.js中console出process.env.NODE\_ENV的值就是undefined，因此**如下代码可能就达不到我们想要的效果

# 小结：

- DefinePlugin和mode选项定义的NODE\_ENV 作用于webpack入口文件下的业务代码，通常为src文件夹下的代码
- 而 npm脚本里的设置多用于配置相关，例如在webpack.config.js里区分环境配置不同插件。

### webpack4新特性mode

设置 mode ，可以让 webpack 自动调起相应的内置优化。

```javascript 
module.exports = {
  // 可以是 none、development、production
  // 默认为 production
  mode: 'production'
}

```


或在命令行里配置：

```json 
"build:prod": "webpack --config config/webpack.prod.config.js --mode production"

```


那么，在设置了mode之后，webpack4 会同步配置 process.env.NODE\_ENV 为 development 或 production 。

webpack4 支持零配置使用，这里的零配置就是指，mode 以及 entry （默认为 src/index.js）都可以通过入口文件指定，并且 webpack4 针对对不同的 mode 内置相应的优化策略。

#### 1. production

配置：

```javascript 
// webpack.prod.config.js
module.exports = {
  mode: 'production',
}

```


相当于默认内置了：

```javascript 
// webpack.prod.config.js
module.exports = {
  performance: {
    // 性能设置,文件打包过大时，会报警告
    hints: 'warning'
  },
  output: {
    // 打包时，在包中不包含所属模块的信息的注释
    pathinfo: false
  },
  optimization: {
    // 不使用可读的模块标识符进行调试
    namedModules: false,
    // 不使用可读的块标识符进行调试
    namedChunks: false,
    // 设置 process.env.NODE_ENV 为 production
    nodeEnv: 'production',
    // 标记块是否是其它块的子集
    // 控制加载块的大小（加载较大块时，不加载其子集）
    flagIncludedChunks: true,
    // 标记模块的加载顺序，使初始包更小
    occurrenceOrder: true,
    // 启用副作用
    sideEffects: true,
    // 确定每个模块的使用导出，
    // 不会为未使用的导出生成导出
    // 最小化的消除死代码
    // optimization.usedExports 收集的信息将被其他优化或代码生成所使用
    usedExports: true,
    // 查找模块图中可以安全的连接到其它模块的片段
    concatenateModules: true,
    // SplitChunksPlugin 配置项
    splitChunks: {
      // 默认 webpack4 只会对按需加载的代码做分割
      chunks: 'async',
      // 表示在压缩前的最小模块大小,默认值是30kb
      minSize: 30000,
      minRemainingSize: 0,
      // 旨在与HTTP/2和长期缓存一起使用 
      // 它增加了请求数量以实现更好的缓存
      // 它还可以用于减小文件大小，以加快重建速度。
      maxSize: 0,
      // 分割一个模块之前必须共享的最小块数
      minChunks: 1,
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 6,
      // 入口的最大并行请求数
      maxInitialRequests: 4,
      // 界定符
      automaticNameDelimiter: '~',
      // 块名最大字符数
      automaticNameMaxLength: 30,
      cacheGroups: { // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // 当打包时，遇到错误编译，将不会把打包文件输出
    // 确保 webpack 不会输入任何错误的包
    noEmitOnErrors: true,
    checkWasmTypes: true,
    // 使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: true,
  },
  plugins: [
    // 使用 terser 来优化 JavaScript
    new TerserPlugin(/* ... */),
    // 定义环境变量
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }),
    // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。
    // 这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin()
  ]
}


```


#### 2. development

配置：

```javascript 
// webpack.dev.config.js
module.exports = {
  mode: 'development',
}


```


相当于默认内置了：

```javascript 
// webpack.dev.config.js
module.exports = {
  devtool: 'eval',
  cache: true,
  performance: {
    // 性能设置,文件打包过大时，不报错和警告，只做提示
    hints: false
  },
  output: {
    // 打包时，在包中包含所属模块的信息的注释
    pathinfo: true
  },
  optimization: {
    // 使用可读的模块标识符进行调试
    namedModules: true,
    // 使用可读的块标识符进行调试
    namedChunks: true,
    // 设置 process.env.NODE_ENV 为 development
    nodeEnv: 'development',
    // 不标记块是否是其它块的子集
    flagIncludedChunks: false,
    // 不标记模块的加载顺序
    occurrenceOrder: false,
    // 不启用副作用
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    // 当打包时，遇到错误编译，仍把打包文件输出
    noEmitOnErrors: false,
    checkWasmTypes: false,
    // 不使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: false,
    removeAvailableModules: false
  },
  plugins: [
    // 当启用 HMR 时，使用该插件会显示模块的相对路径
    // 建议用于开发环境
    new webpack.NamedModulesPlugin(),
    // webpack 内部维护了一个自增的 id，每个 chunk 都有一个 id。
    // 所以当增加 entry 或者其他类型 chunk 的时候，id 就会变化，
    // 导致内容没有变化的 chunk 的 id 也发生了变化
    // NamedChunksPlugin 将内部 chunk id 映射成一个字符串标识符（模块的相对路径）
    // 这样 chunk id 就稳定了下来
    new webpack.NamedChunksPlugin(),
    // 定义环境变量
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
  ]
}

```


#### 3. none

不进行任何默认优化选项。

```javascript 
// webpack.com.config.js
module.exports = {
  performance: {
   // 性能设置,文件打包过大时，不报错和警告，只做提示
   hints: false
  },
  optimization: {
    // 不标记块是否是其它块的子集
    flagIncludedChunks: false,
    // 不标记模块的加载顺序
    occurrenceOrder: false,
    // 不启用副作用
    sideEffects: false,
    usedExports: false,
    concatenateModules: false,
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    // 当打包时，遇到错误编译，仍把打包文件输出
    noEmitOnErrors: false,
    checkWasmTypes: false,
    // 不使用 optimization.minimizer || TerserPlugin 来最小化包
    minimize: false,
  },
  plugins: []
}

```


#### 小结

`production` 模式下给你更好的用户体验：

- 较小的输出包体积
- 浏览器中更快的代码执行速度
- 忽略开发中的代码
- 不公开源代码或文件路径
- 易于使用的输出资产

`development` 模式会给予你最好的开发体验：

- 浏览器调试工具
- 快速增量编译可加快开发周期
- 运行时提供有用的错误消息
