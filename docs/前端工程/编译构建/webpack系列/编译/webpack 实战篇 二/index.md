# webpack 实战篇 二

**16.html-webpack-plugin**

```纯文本 
 实战： 
 for(item in entry){ 
     clearBuild.push(`${item}/*`) 
     debConfig.output.path =path.resolve(__dirname,`../build/${item}`) 
     let templist = path.join(config.config.root,`./src/${entry[item].replace(/^.+src\/|\/.+$/g,'')}/${item}/index.html`); 
     if(!config.isFile(templist)){ 
         templist = path.join(config.config.root,`./webpack/${entry[item].replace(/^.+src\/|\/.+$/g,'')}-template/index.html`) 
     } 
     
     // 此处循环添加htmlwebpackplugins 的主要目的为了多入口多出口 https://blog.csdn.net/D_Z_Yong/article/details/102891802 
     debConfig.plugins.push( 
         new HtmlWebpackPlugin({ 
             filename:'index.html', 
             template:templist.replace(/\\/g,'/'), 
             inject:true, 
             title:'平安租赁', 
             host:config.config.distPath, 
             prod:false, 
             module:`${item}.${_version}`, 
             hash:true, 
             //选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多个编译后的 js 文件。 
             // 那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。 
             //chunks 默认会在生成的 html 文件中引用所有的 js 文件，当然你也可以指定引入哪些特定的文件。 
             chunks:[item], 
             minify:{ 
                 removeAttributeQuotes:true, 
                 collapseWhitespace:true, 
                 html5:true, 
                 minifyJS:true, 
                 minifyCSS:true, 
                 minifyURLs:true, 
                 removeComments:true, 
                 removeEmptyAttributes:true, 
             } 
         }) 
     ) 
 } 
 
 index.html： 
     <% if(!htmlWebpackPlugin.options.prod) { %> 
         <script type='text/javascript' src=" <%= htmlWebpackPlugin.options.host %>/vendor.dll.js"></script> 
     <% } %> 
 
 问题： 
 如果注入的 js  和 css 路径有问题； 请修改publicPath
```


\*\*17.打包速度分析  \*\*​

```纯文本 
 webpack 有时候打包很慢，而我们在项目中可能用了很多的 plugin 和 loader，想知道到底是哪个环节慢，下面这个插件可以计算 plugin 和 loader 的耗时。 
     yarn add -D speed-measure-webpack-plugin 
 配置也很简单，把 webpack 配置对象包裹起来即可： 
 const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); 
 const smp = new SpeedMeasurePlugin(); 
 const webpackConfig = smp.wrap({ 
   plugins: [ 
     new MyPlugin(), 
     new MyOtherPlugin() 
   ] 
 }); 
 来看下在项目中引入speed-measure-webpack-plugin后的打包情况：
```


![  ](./assets/image/29488254c745ed024f4821ea76aecd0a_ddHzi0725s.png "  ")

**18.多进程/多实例构建（打包速度）**

```纯文本 
      大家都知道 webpack 是运行在 node 环境中，而 node 是单线程的。webpack 的打包过程是 io 密集和计算密集型的操作，如果能同时 fork 多个进程并行处理各个任务，将会有效的缩短构建时间。平时用的比较多的两个是thread-loader和HappyPack。 
     先来看下 thread-loader 吧，这个也是webpack4官方所推荐的。 
 
 yarn add -D thread-loader 
 thread-loader 会将你的 loader 放置在一个 worker 池里面运行，以达到多线程构建。 
 把这个 loader 放置在其他 loader 之前（如下面示例的位置）， 放置在这个 loader 之后的 loader 就会在一个单独的 worker 池(worker pool)中运行。 
 module.exports = { 
   module: { 
     rules: [ 
       { 
         test: /\.js$/, 
         include: path.resolve("src"), 
         use: [ 
           "thread-loader", 
           // your expensive loader (e.g babel-loader) 
         ] 
       } 
     ] 
   } 
 } 
 
 yarn add -D happypack 
     HappyPack 可以让 Webpack 同一时间处理多个任务，发挥多核 CPU 的能力，将任务分解给多个子进程去并发的执行，子进程处理完后，再把结果发送给主进程。通过多进程模型，来加速代码构建。 

```


![  ](./assets/image/f757d0cc4ffd245f3e2916aaac42c603_44hPNjD22I.png "  ")

```纯文本 
 // webpack.config.js 
 const HappyPack = require('happypack'); 
 
 
 exports.module = { 
   rules: [ 
     { 
       test: /.js$/, 
       // 1) replace your original list of loaders with "happypack/loader": 
       // loaders: [ 'babel-loader?presets[]=es2015' ], 
       use: 'happypack/loader', 
       include: [ /* ... */ ], 
       exclude: [ /* ... */ ] 
     } 
   ] 
 }; 
 
 
 exports.plugins = [ 
   // 2) create the plugin: 
   new HappyPack({ 
     // 3) re-add the loaders you replaced above in #1: 
     loaders: [ 'babel-loader?presets[]=es2015' ] 
   }) 
 ]; 
 这里有一点需要说明的是，HappyPack的作者表示已不再维护此项目，这个可以在github仓库看到： 
 thread-loader 和 happypack 对于小型项目来说打包速度几乎没有影响，甚至可能会增加开销，所以建议尽量在大项目中采用。
```


**19.多进程并行压缩代码（编译打包）**

```纯文本 
     通常我们在开发环境，代码构建时间比较快，而构建用于发布到线上的代码时会添加压缩代码这一流程，则会导致计算量大耗时多。 
     webpack默认提供了UglifyJS插件来压缩JS代码，但是它使用的是单线程压缩代码，也就是说多个js文件需要被压缩，它需要一个个文件进行压缩。所以说在正式环境打包压缩代码速度非常慢(因为压缩JS代码需要先把代码解析成用Object抽象表示的AST语法树，再应用各种规则分析和处理AST，导致这个过程耗时非常大) 
 
     所以我们要对压缩代码这一步骤进行优化，常用的做法就是多进程并行压缩。 
     目前有三种主流的压缩方案： 
         * parallel-uglify-plugin 
         * uglifyjs-webpack-plugin 
         * terser-webpack-plugin
```


```纯文本 
 parallel-uglify-plugin 
 
 
 webpack 用 webpack-parallel-uglify-plugin 加速打包报错 
 ERROR in Encountered an error while minifying static/js/0.feb0ac937597219abdc1.js:   `warnings` is not a supported option 
 删除： 或者把warning 拿出去  
 compress：{ 
      warning：false  
 } 
 
 
     上面介绍的HappyPack的思想是使用多个子进程去解析和编译JS,CSS等，这样就可 以并行处理多个子任务 ，多个子任务完成后，再 将结果发到主进程中 ，有了这个思想后，ParallelUglifyPlugin 插件就产生了。 
     当webpack有多个JS文件需要输出和压缩时，原来会使用UglifyJS去一个个压缩并且输出，而 ParallelUglifyPlugin插件则会开启多个子进程，把对多个文件压缩的工作分给多个子进程去完成， 但是每个 子进程还是通过UglifyJS去 压缩代码。并行压缩可以显著的提升效率。 
 yarn add -D webpack-parallel-uglify-plugin 
 
 import ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin'; 
 
 module.exports = { 
   plugins: [ 
     new ParallelUglifyPlugin({ 
       // Optional regex, or array of regex to match file against. Only matching files get minified. 
       // Defaults to /.js$/, any file ending in .js. 
       test, 
       include, // Optional regex, or array of regex to include in minification. Only matching files get minified. 
       exclude, // Optional regex, or array of regex to exclude from minification. Matching files are not minified. 
       cacheDir, // Optional absolute path to use as a cache. If not provided, caching will not be used. 
       workerCount, // Optional int. Number of workers to run uglify. Defaults to num of cpus - 1 or asset count (whichever is smaller) 
       sourceMap, // Optional Boolean. This slows down the compilation. Defaults to false. 
       uglifyJS: { 
         // These pass straight through to uglify-js@3. 
         // Cannot be used with uglifyES. 
         // Defaults to {} if not neither uglifyJS or uglifyES are provided. 
         // You should use this option if you need to ensure es5 support. uglify-js will produce an error message 
         // if it comes across any es6 code that it can't parse. 
       }, 
       uglifyES: { 
         // These pass straight through to uglify-es. 
         // Cannot be used with uglifyJS. 
         // uglify-es is a version of uglify that understands newer es6 syntax. You should use this option if the 
         // files that you're minifying do not need to run in older browsers/versions of node. 
       } 
     }), 
   ], 
 }; 
 webpack-parallel-uglify-plugin已不再维护，这里不推荐使用
```


```纯文本 
 uglifyjs-webpack-plugin 
 yarn add -D uglifyjs-webpack-plugin 
 
 const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); 
 
 module.exports = { 
   plugins: [ 
     new UglifyJsPlugin({ 
       uglifyOptions: { 
         warnings: false, 
         parse: {}, 
         compress: {}, 
         ie8: false 
       }, 
       parallel: true 
     }) 
   ] 
 }; 
 其实它和上面的parallel-uglify-plugin类似，也可通过设置parallel: true开启多进程压缩。
```


```纯文本 
 terser-webpack-plugin 
 不知道你有没有发现：webpack4 已经默认支持 ES6语法的压缩。 
 而这离不开terser-webpack-plugin。 
 yarn add -D terser-webpack-plugin 
 
 const TerserPlugin = require('terser-webpack-plugin'); 
 
 module.exports = { 
   optimization: { 
     minimize: true, 
     minimizer: [ 
       new TerserPlugin({ 
         parallel: 4, 
       }), 
     ], 
   }, 
 };
```


**20.预编译资源模块（编译打包）**

```纯文本 
 什么是预编译资源模块？ 
     在使用 webpack 进行打包时候，对于依赖的第三方库，比如 vue，vuex等这些不会修改的依赖 ，我们可以让它和我们自己编写的代码分开打包，这样做的好处是每 次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库 。 
     那么第三方库在 第一次打包的时候只打包一次 ，以后 只要我们不升级第三方包的时候，那么webpack就不会对这些库去打包 ，这样的可以 快速的提高打包的速度 。其实也就是预编译资源模块。 
 webpack中，我们可以结合DllPlugin 和 DllReferencePlugin插件来实现。 
 
 DllPlugin是什么？ 
 
     它能把第三方库代码分离开，并且每次文件更改的时候，它只会打包该项目自身的代码。所以打包速度会更快。 
      DLLPlugin  插件是在一个 额外独立的webpack设置中创建一个只有dll的bundle ，也就是说我们在项目根目录下除了有webpack.config.js，还会 新建一个webpack.dll.j s文件。 
     webpack.dll.js的作用是把所有的 第三方库依赖打包到一个bundle的dll 文件里面，还会生成一个名为  manifest.json文件 。该 manifest.json的作用是用来让 DllReferencePlugin 映射到相关的依赖上去的。 
 
 DllReferencePlugin又是什么？ 
 
     这个插件是 在webpack.config.js 中使用的，该插件的作用是把刚刚在 webpack.dll.js 中打包生成的 dll 文件引用到 需要的预编译的依赖上 来。 
     什么意思呢？就是说在webpack.dll.js中打包后比如会生成  vendor.dll.js文件和vendor-manifest.json文件，vendor.dll.js文件包含了所有的第三方库文件 ， vendor- m anifest.json文件会包含所有库代码的一个索引 ，当在使用 webpack.config.js文件打包DllReferencePlugin插件的时候，会使用该DllReferencePlugin插件读取vendor-manifest.json文件，看看是否有该第三方库。 
     vendor-manifest.json文件就是一个第三方库的映射而已。 
 
 怎么在项目中使用？ 
     上面说了这么多，主要是为了方便大家对于 预编译资源模块和DllPlugin 和、DllReferencePlugin插件作用的理解 （我第一次使用看了好久才明白～～） 
 先来看下完成的项目目录结构：
```


![  ](./assets/image/5e674b635a7d893267a0a6f130d792ba_a_SU-iFyU0.png "  ")

```纯文本 
 主要在两块配置，分别是 webpack.dll.js 和 webpack.config.js （对应这里我是webpack.base.js）
```


```纯文本 
 webpack.dll.js 
 
 const path = require('path'); 
 const webpack = require('webpack'); 
 
 module.exports = { 
   mode: 'production', 
   entry: { 
     vendors: ['lodash', 'jquery'], 
     react: ['react', 'react-dom'] 
   }, 
   output: { 
     filename: '[name].dll.js', 
     path: path.resolve(__dirname, './dll'), 
     library: '[name]' 
   }, 
   plugins: [ 
     new webpack.DllPlugin({ 
       name: '[name]', 
       path: path.resolve(__dirname, './dll/[name].manifest.json') 
     }) 
   ] 
 } 
 这里我拆了两部分： 
     vendors（存放了lodash、jquery等）和 
     react（存放了 react 相关的库，react、react-dom等） 
 
 
 
 webpack.config.js(对应我这里就是webpack.base.js) 
 const path = require("path"); 
 const fs = require('fs'); 
 // ... 
 const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin'); 
 const webpack = require('webpack'); 
 
 
 const plugins = [ 
   // ... 
 ]; 
 
 
 const files = fs.readdirSync(path.resolve(__dirname, './dll')); 
 files.forEach(file => { 
   if(/.*\.dll.js/.test(file)) { 
     plugins.push(new AddAssetHtmlWebpackPlugin({ 
        filepath: path.resolve(__dirname, './dll', file)  //添加 dll包在html里 
     })) 
   } 
   if(/.*\.manifest.json/.test(file)) { 
     plugins.push(new webpack.DllReferencePlugin({ 
        manifest: path.resolve(__dirname, './dll', file) // 在webpack里添加映射索引     
     })) 
   } 
 }) 
 
 
 module.exports = { 
   entry: { 
     main: "./src/index.js" 
   }, 
   module: { 
     rules: [] 
   }, 
   plugins, 
 
 
   output: { 
     // publicPath: "./", 
     path: path.resolve(__dirname, "dist") 
   } 
 } 
 
 
 最后在package.json里面再添加一条脚本就可以了： 
 "scripts": { 
     "build:dll": "webpack --config ./webpack.dll.js", 
  },
```


**21.利用缓存提高二次构建速度（编译打包）**

```纯文本 
 一般来说，对于 静态资源，我们都希望浏览器能够进行缓存 ，那样以后进入页面就可以直接使用缓存资源，页面打开速度会显著加快，既提高了用户的体验也节省了宽带资源。 
     当然浏览器缓存方法有很多种，这里只简单讨论下在webpack中如何利用缓存来提升二次构建速度。 
 在webpack中利用缓存一般有以下几种思路： 
     * babel-loader开启缓存 
     * 使用cache-loader 
     * 使用hard-source-webpack-plugin
```


```纯文本 
 babel-loader 
 babel-loader在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积冗余，同时也会减慢编译效率。 
 
 可以加上cacheDirectory参数开启缓存： 
 { 
     test: /\.js$/, 
     exclude: /node_modules/, 
     use: [{ 
       loader: "babel-loader", 
       options: { 
         cacheDirectory: true 
       } 
     }], 
   },
```


```纯文本 
 cache-loader 
     在一些性能开销较大的 loader 之前添加此 loader，以将结果缓存到磁盘里。 
 
 yarn add -D cache-loader 
 cache-loader 的配置很简单，放在其他 loader 之前即可。修改Webpack 的配置如下: 
 module.exports = { 
   module: { 
     rules: [ 
       { 
         test: /\.ext$/, 
         use: [ 
           'cache-loader', 
           ...loaders 
         ], 
         include: path.resolve('src') 
       } 
     ] 
   } 
 } 
 请注意，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。
```


```纯文本 
 hard-source-webpack-plugin 
     HardSourceWebpackPlugin 为模块提供了中间缓存，缓存默认的存放路径是: node_modules/.cache/hard-source。 
     配置 hard-source-webpack-plugin后， 首次构建时间并不会有太大的变化，但是从第二次开始，构建时间大约可以减少 80%左右。 
 
 yarn add -D hard-source-webpack-plugin 
 // webpack.config.js 
 var HardSourceWebpackPlugin = require('hard-source-webpack-plugin'); 
 
 module.exports = { 
   entry: // ... 
   output: // ... 
   plugins: [ 
     new HardSourceWebpackPlugin() 
   ] 
 } 
 
 webpack5中会内置hard-source-webpack-plugin
```


**22.缩小构建目标/减少文件搜素范围（编译打包）**

```纯文本 
 有时候我们的项目中会用到很多模块，但有些模块其实是不需要被解析的。这时我们就可以通过缩小构建目标或者减少文件搜索范围的方式来对构建做适当的优化。 
 
 缩小构建目标 
 
 const path = require('path'); 
 module.exports = { 
   ... 
   module: { 
     rules: [ 
       { 
         test: /\.js$/, 
         exclude: /node_modules/, 
         // include: path.resolve('src'), 
         use: ['babel-loader'] 
       } 
     ] 
   } 
 这里babel-loader就会排除对node_modules下对应 js 的解析，提升构建速度。 
 
 减少文件搜索范围 
 
 这个主要是resolve相关的配置，用来设置模块如何被解析。通过resolve的配置，可以帮助Webpack快速查找依赖，也可以替换对应的依赖。 
     * resolve.modules：告诉 webpack 解析模块时应该搜索的目录 
     * resolve.mainFields：当从 npm 包中导入模块时（例如，import * as React from 'react'），此选项将决定在 package.json 中使用哪个字段导入模块。根据 webpack 配置中指定的 target 不同，默认值也会有所不同 
     * resolve.mainFiles：解析目录时要使用的文件名，默认是index 
     * resolve.extensions：文件扩展名 
 
 // webpack.config.js 
 const path = require('path'); 
 module.exports = { 
   ... 
   resolve: { 
     alias: { 
       react: path.resolve(__dirname, './node_modules/react/umd/react.production.min.js') 
     }, //直接指定react搜索模块，不设置默认会一层层的搜寻 
     modules: [path.resolve(__dirname, 'node_modules')], //限定模块路径 
     extensions: ['.js'], //限定文件扩展名 
     mainFields: ['main'] //限定模块入口文件名
```


**23.动态polyfill服务（这个方式不太好，可以看以前我写的按需引入）**

```纯文本 
 介绍动态Polyfill前，我们先来看下什么是babel-polyfill。
```


```纯文本 
 什么是 babel-polyfill? 
 
 babel只负责语法转换，比如将ES6的语法转换成ES5。但如果有些对象、方法，浏览器本身不支持，比如： 
     * 全局对象：Promise、WeakMap 等。 
     * 全局静态函数：Array.from、Object.assign 等。 
     * 实例方法：比如 Array.prototype.includes 等。 
 此时，需要引入babel-polyfill来模拟实现这些对象、方法。 
 这种一般也称为垫片。
```


```纯文本 
 怎么使用babel-polyfill？ 
 
 使用也非常简单，在webpack.config.js文件作如下配置就可以了： 
 module.exports = { 
   entry: ["@babel/polyfill", "./app/js"], 
 };
```


```纯文本 
 为什么还要用动态Polyfill？ 
 
     babel-polyfill由于是一次性全部导入整个polyfill，所以用起来很方便，但与此同时也带来了一个大问题：文件很大，所以后续的方案都是针对这个问题做的优化。 
 来看下打包后babel-polyfill的占比：
```


![  ](./assets/image/1b3a091b552c8dabb19b4a513fd01beb_QG_mNqtkQa.png "  ")

```纯文本 
 介于上述原因，动态Polyfill服务诞生了。通过一张图来了解下Polyfill Service的原理
```


![  ](./assets/image/ffe583ec20a8022b4499342712718e4a_xgbKIsQXLI.png "  ")

```纯文本 
 每次打开页面，浏览器都会向Polyfill Service发送请求，Polyfill Service识别 User Agent，下发不同的 Polyfill，做到按需加载Polyfill的效果。
```


```纯文本 
 怎么使用动态Polyfill服务？ 
 
 采用官方提供的服务地址即可： 
 //访问url，根据User Agent 直接返回浏览器所需的 polyfills 
 https://polyfill.io/v3/polyfill.min.js
```


**25. 压缩图片**

```纯文本 
 https://mp.weixin.qq.com/s/5LzXEb7d9-F8XB_LqyNYVg  很好的一篇文章；对webpack 的 架构 和 laoder/plugin 也有很深的理解  有时间在看下理解下 
 https://github.com/JowayYoung/tinyimg-webpack-plugin   作者的github 地址 
 
 必须依赖webpack 4.0.0以上和webpack-cli 3.0.0以上 
 npm i tinyimg-webpack-plugin 
 
 在webpack.config.js或webpack配置插入以下代码。 
 const TinyimgPlugin = require("tinyimg-webpack-plugin"); 
 module.exports = { 
     plugins: [ 
         new TinyimgPlugin({ 
             enabled: process.env.NODE_ENV === "production", 
             logged: true 
         }) 
     ]};
```


| 配置      | 功能     | 格式         | 描述          |
| ------- | ------ | ---------- | ----------- |
| enabled | 是否启用插件 | true/false | 建议只在生产环境下开启 |
| logged  | 是否打印日志 | true/false | 打印压缩图像相关信息  |
