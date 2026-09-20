# roadhog

## 目录

- [roadhogrc.js ](#roadhogrcjs-)
- [webpack.config.js](#webpackconfigjs)
- [环境变量](#环境变量)

[ npm: roadhog Cli tool for serve and build react app, based on create-react-app, support JSON pattern config.. Latest version: 0.6.1, last published: 4 years ago. Start using roadhog in your project by running \`npm https://www.npmjs.com/package/roadhog](https://www.npmjs.com/package/roadhog " npm: roadhog Cli tool for serve and build react app, based on create-react-app, support JSON pattern config.. Latest version: 0.6.1, last published: 4 years ago. Start using roadhog in your project by running `npm https://www.npmjs.com/package/roadhog")

[ roadhog 介绍\_hzxOnlineOk的博客-CSDN博客 官方网站：https://www.npmjs.com/package/roadhog一:roadhogroadhog 是一个 cli 工具，提供server、build和test三个命令，分别用于本地调试和构建，并且提供了特别易用的mock 功能。命令行体验和 create-react-app 一致，配置略有不同，比如默认开启css modules，然后还提供了JS... https://blog.csdn.net/hzxOnlineOk/article/details/100976848](https://blog.csdn.net/hzxOnlineOk/article/details/100976848 " roadhog 介绍_hzxOnlineOk的博客-CSDN博客 官方网站：https://www.npmjs.com/package/roadhog一:roadhogroadhog 是一个 cli 工具，提供server、build和test三个命令，分别用于本地调试和构建，并且提供了特别易用的mock 功能。命令行体验和 create-react-app 一致，配置略有不同，比如默认开启css modules，然后还提供了JS... https://blog.csdn.net/hzxOnlineOk/article/details/100976848")

[ roadhog/README\_zh-cn.md at master · sorrycc/roadhog 🐷 Cli tool for creating react apps, configurable version of create-react-app. - roadhog/README\_zh-cn.md at master · sorrycc/roadhog https://github.com/sorrycc/roadhog/blob/master/README\_zh-cn.md](https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md " roadhog/README_zh-cn.md at master · sorrycc/roadhog 🐷 Cli tool for creating react apps, configurable version of create-react-app. - roadhog/README_zh-cn.md at master · sorrycc/roadhog https://github.com/sorrycc/roadhog/blob/master/README_zh-cn.md")

# \*\*roadhogrc.js \*\*

**有些时候 .webpackrc.js无法配置；需要新建 .roadhogrc.js 配置**

例如output

```javascript 
import path from "path";


export default {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[hash:8].js',//动态import文件名
  },
}

```


# webpack.config.js

```javascript 
const CompressionPlugin = require("compression-webpack-plugin");

module.exports=(config,{webpack})=>{
  config.plugins.unshift(
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',//算法
      test: /\.js$|\.css$/,
      threshold: 1024, // 只处理比这个值大的资源。按字节计算
      minRatio: 0.9, // 只有压缩率小于这个值的资源才会被处理
    })
  )
  return config
}

注意：Build failed: Cannot read property 'thisCompilation' of undefined
 webpack3对应的compression-webpack-plugin版本只能是1.1.2
webpack4对应的compression-webpack-plugin版本^2.0.0
 


```


# 环境变量

有时候我们在代码里需要根据环境变量来决定一些逻辑。常见的比如，在测试环境访问的后端url跟正式环境是不一样的。

不依赖框架的话，应当是基于webpack的define-plugin实现。如文档中所示的：

```typescript 
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true),
  VERSION: JSON.stringify('5fa3b9'),
  BROWSER_SUPPORTS_HTML5: true,
  TWO: '1+1',
  'typeof window': JSON.stringify('object')
});

```


回到dva。 &#x20;
dva核心是个基于redux封装的数据流方案，也可以当成一个轻量级框架。从框架的角度来讲，它其实很轻很轻，几乎没怎么管数据流之外的事情，只是简单地集成了少许几个库形成一个框架。

roadhog是个服务于框架的命令行工具，主要就是提供dev、build 和 test 等命令，屏蔽了webpack的复杂配置，提供了自己的相对简单的配置能力。

显然，这里的变量配置应当由roadhog来处理。不要像我当初一样觉得dva是个框架就应该有相关功能 *(:зゝ∠)*

善用搜索引擎，从roadhog文档 - define和相关讨论容易找到方案。roadhog提供了`define`选项做`DefinePlugin`的事情。具体使用:编辑`.webpacrc.js`

```typescript 
export default {
    define: {
        'process.env': {},
        'process.env.NODE_ENV': process.env.NODE_ENV,
        'process.env.API_ENV': process.env.API_ENV,
    },
}
```


```typescript 
"build": "cross-env ESLINT=none  roadhog build",
"build:test": "cross-env NODE_ENV_AUDIT=test ESLINT=none roadhog build & node switchNgOptions.js",

```
