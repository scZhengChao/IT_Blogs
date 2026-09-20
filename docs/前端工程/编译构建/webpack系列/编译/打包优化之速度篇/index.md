# 打包优化之速度篇

## 目录

- [减小文件搜索范围](#减小文件搜索范围)
  - [配置 resolve.modules](#配置-resolvemodules)
  - [设置 test & include & exclude](#设置-test--include--exclude)
- [增强代码代码压缩工具](#增强代码代码压缩工具)
- [用 Happypack 来加速代码构建](#用-Happypack-来加速代码构建)
- [设置 babel 的 cacheDirectory 为true](#设置-babel-的-cacheDirectory-为true)
- [设置 noParse](#设置-noParse)
- [拷贝静态文件](#拷贝静态文件)

## **减小文件搜索范围**[](https://www.jeffjade.com/2017/08/12/125-webpack-package-optimization-for-speed/#%E5%87%8F%E5%B0%8F%E6%96%87%E4%BB%B6%E6%90%9C%E7%B4%A2%E8%8C%83%E5%9B%B4 "")

### **配置 resolve.modules**[](https://www.jeffjade.com/2017/08/12/125-webpack-package-optimization-for-speed/#%E9%85%8D%E7%BD%AE-resolve-modules "")

```纯文本 
 function   resolve   (dir)  { 
    return  path. join (__dirname,  '..' , dir) 
 } 
 
 module.exports = { 
    resolve : { 
     extension s:  [ '.js' ,  '.vue' ,  '.json' ], 
     module s:  [ 
        resolve ( 'src' ), 
        resolve ( 'node_modules' ) 
     ], 
     alia s:  { 
        'vue$' :  'vue/dist/vue.common.js' , 
        'src' :  resolve ( 'src' ), 
        'assets' :  resolve ( 'src/assets' ), 
        'components' :  resolve ( 'src/components' ), 
       // ... 
        'store' :  resolve ( 'src/store' ) 
     } 
   }, 
   ... 
 }
```


### **设置 test & include & exclude**

> **test：** 必须满足的条件（正则表达式，不要加引号，匹配要处理的文件）**exclude：** 不能满足的条件（排除不处理的目录）**include：** 导入的文件将由加载程序转换的路径或文件数组（把要处理的目录包括进来）**loader：** 一串“！”分隔的装载机（2.0版本以上，”-loader”不可以省略）**loaders：** 作为字符串的装载器阵列

```纯文本 
 module: { 
   preLoaders: [ 
     { 
       test:  /\.js$/ , 
       loader:  'eslint' , 
        include : [resolve( 'src' )], 
        exclude :  /node_modules/ 
     }, 
     { 
       test:  /\.svg$/ , 
       loader:  'svgo?'  + JSON.stringify(svgoConfig)， 
        include : [resolve( 'src/assets/icons' )], 
        exclude :  /node_modules/ 
     } 
   ], 
   loaders: [ 
     { 
       test:  /\.vue$/ , 
       loader:  'vue-loader' , 
        include : [resolve( 'src' )], 
        exclude :  /node_modules\/(?!(autotrack|dom-utils))|vendor\.dll\.js/ 
     }, 
     { 
       test:  /\.(png|jpe?g|gif|svg)(\?.*)?$/ , 
       loader:  'url' , 
        exclude :  /assets\/icons/ , 
       query: { 
         limit:  10000 , 
         name: utils.assetsPath( 'img/[name].[hash:7].[ext]' ) 
       } 
     } 
   ] 
 }
```


## **增强代码代码压缩工具**

```纯文本 
 new   webpack .optimize .UglifyJsPlugin ({ 
    compress : { 
     warnings: false 
   }, 
    sourceMap :  true 
 })
```


```纯文本 
 var ParallelUglifyPlugin = require( 'webpack-parallel-uglify-plugin' ); 
 new ParallelUglifyPlugin({ 
   cacheDir:   '.cache/' , 
   uglifyJS: { 
     output:  { 
       comments:   false 
     }, 
     compress:  { 
       warnings:   false 
     } 
   } 
 })
```


## **用 Happypack 来加速代码构建**

```纯文本 
 var  HappyPack =  require ( 'happypack' ); 
 var  happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); 
 
 module : { 
   loaders: [ 
     { 
       test:  /\.js[x]?$/ , 
       include: [resolve( 'src' )], 
       exclude:  /node_modules/ , 
       loader:  'happypack/loader?id=happybabel' 
     } 
   ] 
 }, 
 plugins: [ 
    new  HappyPack({ 
     id:  'happybabel' , 
     loaders: [ 'babel-loader' ], 
     threadPool: happyThreadPool, 
     cache:  true , 
     verbose:  true 
   }) 
 ]
```


## **设置 babel 的 cacheDirectory 为true**

```纯文本 
 rules: [ 
   { 
     test:  /\.js$/ , 
     loader:  'babel-loader?cacheDirectory=true' , 
      exclude :  /node_modules/ , 
      include : [resolve( 'src' ), resolve( 'test' )] 
   }, 
   ... ... 
 ]
```


## \*\*设置 \*\*[**noParse**](https://webpack.github.io/docs/configuration.html#module-noparse "noParse")

```纯文本 
 module : { 
    noParse : /node_modules\/(element-ui\.js)/, 
   rules: [ 
     { 
       ... 
     } 
 }
```


## **拷贝静态文件**

```纯文本 
 var  CopyWebpackPlugin =  require ( 'copy-webpack-plugin' ) 
 
 plugins:  [ 
    ... 
    // copy custom static assets 
    new  CopyWebpackPlugin( [ 
     { 
       from: path.resolve(__dirname,  '../static' ), 
        to : config.build.assetsSubDirectory, 
       ignore:  [ '.*' ] 
     } 
   ]) 
 ]
```


![  ](./assets/image/blank_azu3CjuL0x.gif "  ")

![  ](./assets/image/blank_azu3CjuL0x.gif "  ")

![  ](./assets/image/blank_azu3CjuL0x.gif "  ")

![  ](./assets/image/blank_azu3CjuL0x.gif "  ")
