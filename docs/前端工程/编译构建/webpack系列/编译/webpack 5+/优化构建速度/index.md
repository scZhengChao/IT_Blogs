# 优化构建速度

## 目录

- [简介](#简介)
- [优化构建速度](#优化构建速度)
  - [定向查找](#定向查找)
    - [resolve.modules](#resolvemodules)
    - [resolve.extensions](#resolveextensions)
  - [减少执行构建的模块](#减少执行构建的模块)
    - [合理配置 noParse](#合理配置-noParse)
    - [合理配置 IgnorePlugin](#合理配置-IgnorePlugin)
    - [合理配置 externals](#合理配置-externals)
    - [合理配置 loader 的 include、exclude](#合理配置-loader-的-includeexclude)
  - [并行构建以提升总体速度](#并行构建以提升总体速度)
    - [HappyPack](#HappyPack)
    - [Thread-loader](#Thread-loader)
  - [并行压缩提高构建效率](#并行压缩提高构建效率)
    - [UglifyjsWebpackPlugin、TerserWebpackPlugin 开启 paralle](#UglifyjsWebpackPluginTerserWebpackPlugin-开启-paralle)
    - [ParallelUglifyPlugin (已过时)](#ParallelUglifyPlugin-已过时)
  - [合理使用缓存](#合理使用缓存)
    - [babel-loader 开启缓存](#babel-loader-开启缓存)
    - [cache-loader](#cache-loader)
    - [HardSourceWebpackPlugin (已过时)](#HardSourceWebpackPlugin-已过时)
    - [webpack5 配置 cache.type](#webpack5-配置-cachetype)

# 简介

说到`webpack`的`性能优化`，其实就是从`时间层面`与`体积层面`入手。对于`时间层面`主要就是优化`webpack`的构建速度（**缩短构建时间**）。对于`体积层面`主要就是优化`webpack`的构建结果（**缩小构建结果**）。

> 本文使用的 webpack 版本为 5.74.0、webpack-cli 的版本为 4.10.0

# 优化构建速度

对于 **优化构建速度** 我们可以从 `定向查找`、`减少执行构建的模块`、`并行构建以提升总体速度`、`并行压缩提高构建效率`、`合理使用缓存`几个方面入手。

![](./assets/image/image_VAOaHGCU-R.png)

## 定向查找

`webpack` 的 `resolve` 配置了模块会按照什么规则如何被解析，`webpack` 提供合理的默认值，但是还是可能会修改一些解析的细节。我们来看下如何修改 `resolve` 配置加快构建速度。

### resolve.modules

`webpack` 的 `resolve.modules` 配置用于指定 `webpack` 去哪些目录下**寻找第三方模块**。其默认值是 `['node_modules']`，`webpack` 在寻找的时候，会先去当前目录的 `./node_modules` 下去查找，没有找到就会再去上一级目录 `../node_modules` 中去找，直到找到为止。

所以如果我们项目的**第三方依赖模块放置的位置没有变更**的话，可以使用**绝对路径减少查找的时间**，配置如下：

```typescript 
module.export = {
  resolve: {
    // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
    // __diename 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}

```


### resolve.extensions

`extensions` 是我们常用的一个配置，适用于指定在**导入语句没有带文件后缀时**，可以按照配置的列表，自动补上后缀。我们应该根据我们项目中文件的实际使用情况设置后缀列表，将使用**频率高的放在前面、同时后缀列表也要尽可能的少，减少没有必要的匹配**。

同时，我们在源码中写导入语句的时候，尽量带上后缀，避免查找过程。

```typescript 
module.export = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}

```


`extensions`的默认值是`['.js', '.json', '.wasm']`，所以不写文件后缀的话，它会依次匹配`'.js', '.json', '.wasm'`，如果都没匹配上的话才会报错。

还需要注意的是如果配置了`extensions`会替代默认值，如果**还需要使用默认值**，需要配置`...`。

```typescript 
module.export = {
  resolve: {
    // 相当于 '.js', '.json', '.wasm', '.ts', '.tsx'
    extensions: ["...", '.ts', '.tsx'],
  }
}

```


## 减少执行构建的模块

我们都知道，`webpack` 的构建过程是从 `entry` 出发，然后**依次递归解析出文件的导入语句**。在遇到导入语句的时候，要判断是否需要使用设置的 `loader` 去处理文件。因为这里**涉及到了递归操作**，所以在文件较少的时候性能问题可能不明显，在我们的项目逐步壮大有很多文件之后，依赖关系就会变得复杂，这个时候递归的速度的问题就会慢慢暴露出来了。所以我们先要缩小文件的搜索范围。

**缩小文件的搜索范围主要从以下几个方面入手**

### 合理配置 noParse

`noParse` 配置的意思是让 `webpack` 忽略没有模块化的文件，比如 `JQuery、lodash`。而这些三方库里面没有其他依赖，可以通过配置`noParse`不去解析这些文件，提高打包效率。

需要注意的是，被忽略掉的文件中如果包含 `import、require、define` 等模块化语句时，在构建产物中也会包含，浏览器无法识别的时候就会报错。所以配置`noParse`的时候**一定要清楚这个模块里面是否使用了**`import、require、export` **等模块化语句**。

比如笔者入口文件使用了 `lodash`和`jquery`。

```typescript 
import _ from "lodash";
import $ from "jquery";

console.log(_.join(["a", "b", "c"], "-"));
console.log($);

```


在没配置`noParse`的时候构建时间为 3778ms

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dbcadd4abcd47bb9fc0b92a4a1bc1a0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当配置`noParse`后

```javascript 
module.export = {
  module: {
    noParse: /jquery|lodash/,
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
      }
    ],
  },
}
```


构建时间为 3052ms

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84cee9e5ffff4b6da9033d638000fa88~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 合理配置 IgnorePlugin

有的依赖包，除了项目所需要的模块外，还会**附带一些多余的模块**。典型的例子就是 `moment` 这个包，一般情况下在构建时会自动引入其 `local` 目录下的多国语言包。

但是对于大多数情况而言，项目中只需要引入本国语言包即可，而 `webpack` 提供的 `IgnorePlugin` 即可在**构建模块时直接删除那些需要被排除的模块**，从而**提升模块的构建速度，并减少产物体积**。

比如笔者入口文件使用了 `moment`。

```javascript 
import moment from "moment";

// 设置中文
moment.locale("zh-cn");
let time = moment().endOf("day").fromNow();
console.log(time);

```


在没配置 `IgnorePlugin`的时候构建结果体积和时间分别为1.65mb、1082ms

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35c57d8eca574bfea6da982f258844ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当配置`IgnorePlugin`后

```javascript 
module.export = {
  plugins: [
    new webpack.IgnorePlugin(/^./locale$/, /moment$/)
  ]
}

```


构建结果体积和时间分别为1.1mb、831ms

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a632ec0e2ead49eebbd9904d3f62521c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以发现配置`IgnorePlugin`不仅可以优化构建速度还可以优化构建结果。

### 合理配置 externals

`externals` 会告诉 `Webpack` **无需打包哪些库文件。**

比如笔者入口文件使用了 `jquery`。

```javascript 
import $ from "jquery";

console.log($);

```


在没配置 `externals`的时候构建结果体积和时间分别为320kb、622ms

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94f3caf6fc8e417ba8af10f3f6b3a649~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当配置`externals`后

```javascript 
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>

```


将 `jQuery` 配置在 `externals` 中，告诉 `webpack` 将 `JQuery` 模块从构建过程中移除。

```javascript 
module.exports = {
  //...
  externals: {
    jquery: '$',
  },
};

```


构建结果体积和时间分别为5.36kb、616ms

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7c56bde65f84525b5804810813ff915~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以发现配置`externals`不仅可以优化构建速度还可以优化构建结果。

上面我们的`cdn`是手动引入的，如果使用的包很多的话一个个手动加就很麻烦了，有没有办法能自动添加呢？

那就得借助 `html-webpack-externals-plugin` 插件**动态配置cdn**了。

我们来改造下，将之前在`index.html`里面的`cdn`删除掉，并将`webpack.config.js`里面配置的`externals`删除，然后直接使用`html-webpack-externals-plugin`插件。

```javascript 
// webpack.config.js

const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

plugins: [
  
  new HtmlWebpackExternalsPlugin({
    externals: [
      {
        module: "jquery",
        entry: "http://libs.baidu.com/jquery/2.0.0/jquery.min.js",
        global: "$",
      },
    ],
  }),
]

```


再次构建，可以发现`cdn`被自动引入到了`index.html`

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0140ee6808b64cb9ad1ff0dfcde0a515~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样后续有新的`cdn`我们就可以直接在`HtmlWebpackExternalsPlugin`里面配置就可以啦。

正所谓有利就有弊，使用`cdn`的好处就是能减小构建后包的体积，但是依赖网络，依赖`cdn`的稳定性，所以这方面也需要权衡一下。

### 合理配置 loader 的 include、exclude

`loader` 对**文件的转换是个耗时的操作**，并且 `loader` 的**配置会批量命中多个文件**，所以我们需要根据自己的项目**尽可能的精准命中**哪些文件是需要被 loader 处理的。

webpack 提供了 `test、include、exclude` 三个配置项来命中 loader 。

`include` 的意思是只对命中的模块使用特定的 `loader` 进行处理，`exclude` 的意思是指定排除的文件，不使用该 `loader` 进行处理。

比如，我们只想对**根目录 src 下的 js 文件**使用 `babel-loader` 进行处理可以这样设置：

```javascript 
//webpack.config.js
const path = require('path');
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')]
      }
    ]
  },
}

```


或者我们想排除`node_modules`目录下的`js`使用 `babel-loader` 进行处理可以这样设置：

```javascript 
//webpack.config.js
const path = require('path');
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/, //排除 node_modules 目录
      }
    ]
  },
}

```


比如笔者入口文件使用了 `jquery`。

```javascript 
import $ from "jquery";

console.log($);

```


在没有配置`exclude: /node_modules/` 构建时间为1647ms

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3435eaa429d45dab8841878a41ac9a6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

配置了`exclude: /node_modules/` 构建时间为628ms，时间缩短了一倍，提升还是相当大的。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6add80c8cf7e41ea9d7f32079df8e3f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 并行构建以提升总体速度

默认情况下，webpack 是**单线程模型**，一次只能处理一个任务，在文件过多时会导致构建速度变慢。所以在减少了需要执行构建的模块和降低了单个模块的构建速度之外，我们还可以**并行构建**，让 webpack 同时处理多个任务，发挥**多核 CPU 的优势**。

### HappyPack

`HappyPack` 是一个老牌的 `webpack` 并行处理任务的插件。其可以在 `loader` 的执行过程由单进程扩展为多进程模式。将任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程。从而**加速代码构建**（但是**仅限于对 loader 的处理**）。

`HappyPack` 会**自动进行分解和管理任务**，我们在使用的时候只需要接入 `HappyPack` 插件即可。我们需要将通过 `Loader` 处理的文件先交给 `happyPack/loader` 去处理。**每实例化一个** `HappyPack`，就是告诉 `HappyPack` **创建一个进程池**来管理生成的子进程对象。其使用姿势如下：

```javascript 
const HappyPack = require('happypack') // 需要安装
const happyThreadPool = HappyPack.ThreadPool({size: 3})

module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        // 用 HappyPack 的 loader 替换当前 loaders:
        loader: 'happypack/loader?id=happyBabel',
      }
    ]
  },
  plugins: [
    new HappyPack({
      // id 标识 happypack 处理那一类文件
      id: 'happyBabel',
      // 配置loader
      loaders: [{
        loader: 'babel-loader?cacheDirectory=true'
      }],
      // 共享进程池
      threadPool: happyThreadPool,
      // 日志输出
      verbose: true
    })
  ]
}

```


为了充分发挥多核的优势，笔者在入口文件使用了`jquery、lodash、moment`

```javascript 
import _ from "lodash";
import $ from "jquery";
import moment from "moment";

console.log(_.join(["a", "b", "c"], "-"));
console.log($);

// 设置中文
moment.locale("zh-cn");
let time = moment().endOf("day").fromNow();
console.log(time);

document.getElementById("root").innerHTML = time;

```


在没配置`HappyPack`的情况下构建时间为5009ms

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e798e33c01c49e3a26aaf5fa12c2508~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

配置了`HappyPack`的情况下构建时间为3325ms，有了一定的提升

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7d12ac6e04b4218aed93cfb44a4e0e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### Thread-loader

`Thread-loader` 和 `HappyPack` 类似，会创建多个 `worker` 池进行**并发执行构建任务**，但是使用起来更为简单。只要将这个 `loader` 放置在其他 `loader`之前， 放置在这个 `Thread-loader` **之后的 loader 就会在一个单独的 worker 池**(worker pool) 中运行。

其使用姿势如下：

```javascript 
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          // 开启多进程打包。 
          {
            loader: 'thread-loader', // 需要安装
            options: {
              workers: 3 // 进程3个
            }
          },
          {
            loader: 'babel-loader',
          }
        ]
      }
    ]
  }
}

```


上面的例子，我们改成使用`thread-loader`构建时间为3205ms。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/920d90c9af9642a7b684522ffa317d12~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在 [webpack 官网](https://link.juejin.cn?target= "webpack 官网") 中也有提示，每个 worker 都是一个**单独的有 600ms 限制**的 `node.js` 进程。同时跨进程的数据交换也会被限制。所以**建议**仅在**耗时的 loader 上使用**。

只有在**代码量很多的时候**开启多进程构建才会有明显的提升，如果项目很简单，代码量少可能会适得其反。所以使用前需要斟酌，不要为了优化而优化。

## 并行压缩提高构建效率

前面说了并行构建，下面来说说并行压缩。

在看并行压缩前，笔者建议你先看看文章后面写的**优化构建结果里面的压缩js代码片段**。了解有哪些压缩js的方式后再来看并行压缩可能会理解的顺畅点。

压缩js主要使用 [uglifyjs-webpack-plugin](https://link.juejin.cn?target= "uglifyjs-webpack-plugin") 和 [terser-webpack-plugin](https://link.juejin.cn?target= "terser-webpack-plugin") 插件。这两个插件都可以设置 `parallel` 参数**启用多进程并行**来提高构建速度。

### UglifyjsWebpackPlugin、TerserWebpackPlugin 开启 paralle

```javascript 
// webpack.config.js
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({parallel: true}), // 开启多进程
      // new TerserPlugin({ parallel: true }), // 默认已经开启，其实无需设置
    ],
  },
};

```


### ~~ParallelUglifyPlugin (已过时)~~

[ParallelUglifyPlugin](https://link.juejin.cn?target=https://www.npmjs.com/package/webpack-parallel-uglify-plugin "ParallelUglifyPlugin") 和 `HappyPack` 类似，都是通过并行处理任务的方式提升构建速度。

但是 `ParallelUglifyPlugin` 是作用在代码压缩阶段。和处理 Loader 一样，webpack 在使用 `UglifyJS` 进行压缩的时候也是只能一个一个进行处理。`ParallelUglifyPlugin` 所要做的就是开启多个子进程并行处理任务，将任务分配给多个子进程完成，每个子进程分别使用 `UglifyJS` 进行压缩。

这个插件有三四年没更新了，也基本不会用到，我们了解即可。目前压缩js的主流还是`terser-webpack-plugin`。

## 合理使用缓存

在优化的方案中，缓存也是其中重要的一环。在构建过程中，我们可以通过**使用缓存提升二次打包速度**。主要有以下几种方式：

### babel-loader 开启缓存

我们知道，前端代码里面js文件占大头，所以编译`js`的`babel`就默认支持了缓存的配置。我们可以使用 `cacheDirectory`参数开启缓存。

`cacheDirectory` 的默认值为 `false`。当有设置时，**指定的目录**将用来缓存 `loader` 的执行结果。之后的 `webpack` 构建，将会尝试读取缓存，来避免在每次执行时，可能产生的、高性能消耗的 `Babel` 重新编译过程(recompilation process)。

如果**设置了一个空值** `(loader: 'babel-loader?cacheDirectory')` 或者 `true (loader: 'babel-loader?cacheDirectory=true')`，`loader`将**使用默认的缓存目录** `node_modules/.cache/babel-loader`，如果在任何根目录下都没有找到 `node_modules` 目录，将会**降级回退到操作系统默认的临时文件目录**。

比如笔者的入口文件使用了如下代码

```javascript 
import _ from "lodash";
import $ from "jquery";
import moment from "moment";

console.log(_.join(["a", "b", "c"], "-"));
console.log($);

// 设置中文
moment.locale("zh-cn");
let time = moment().endOf("day").fromNow();
console.log(time);

document.getElementById("root").innerHTML = time;

```


配置好`bable-loader`的缓存`cacheDirectory`

```javascript 
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          }
        ]
      }
    ]
  }
}

```


在第一构建的时候花费的时间为4995ms

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa615d8bb8f3480d83b63fd73385a9c9~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

构建完后在`.cache`目录下产生了缓存文件。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/532ca0ec34e54f4ba0164f542bd60268~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

第二次构建的时候花费的时间为1722ms，**大大缩短了构建时间**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec84bdf4a9194e07b7509d6cf94e54f5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### cache-loader

没有**缓存配置的loader该**怎么使用缓存呢？那就得借助 `cache-loader`啦。

其使用姿势如下：

```javascript 
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          'cache-loader', //需要安装
          "babel-loader"
        ],
      }
    ]
  }
}

```


还是上面的例子，配置好`cache-loader`后，第一次构建时间为5287ms

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b409518fce544989b4e8aa4a9af63283~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

构建完后在`.cache`目录下产生了缓存文件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/132e2aedd9a0441d928fb1aae15bb59e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

第二次构建的时候花费的时间为1041ms，大大缩短了构建时间。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a108ac4dc66497c8b13cdabe5ec5327~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### ~~HardSourceWebpackPlugin (已过时)~~

`HardSourceWebpackPlugin` 的作用是为模块提供中间缓存，缓存默认的存放在是 `node_modules/.cache/hard-source` 中。

因为 [HardSourceWebpackPlugin](https://link.juejin.cn?target=https://github.com/mzgoddard/hard-source-webpack-plugin "HardSourceWebpackPlugin") 四五年没更新了，并且在`webpack5`中会报错(已废弃不支持)。这里笔者就不再举例了，了解即可。

### webpack5 配置 cache.type

`webpack5`新增的`cache`属性，可以**开启磁盘缓存**，默认将编译结果缓存在 `node_modules/.cache/webpack`目录下。

`cache` 会在`开发` 模式被设置成 `type: 'memory'` 而且在 `生产` 模式中**被禁用**。 `cache: true` 与 `cache: { type: 'memory' }` 配置作用一致。 传入 `false` 会禁用缓存。当将 `cache.type` 设置为 `'filesystem'` 就可以进行**缓存的自定义配置**。更多详情可以查看[cache 官方文档](https://link.juejin.cn?target=https://webpack.docschina.org/configuration/cache/ "cache 官方文档")

我们配置好，再次构建可以看到`.cache/webpack` 下生成了缓存文件

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/041c575949a94394bca9dc88a0bfca83~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

并且构建时间由856ms 缩短到 210ms

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee23d818f3614b6abd3c18d2ac3fe14e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

当然缓存也是不能**盲目使用，也是需要斟酌**，因为保存和读取这些缓存文件也会有一些时间开销，所以建议只**对性能开销较大**的 `loader` 采用改缓存优化。
