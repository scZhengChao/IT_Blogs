# \*\*动态导入require.context \*\*

## 目录

- [一：require.context ](#一requirecontext-)
  - [api 简介 ](#api-简介-)
  - [动态注册全局公共组件:](#动态注册全局公共组件)
- [二.css里的//注释    optimize-css-assets-webpack-plugin](#二css里的注释--optimize-css-assets-webpack-plugin)
- [三.vant + cli4 + rem](#三vant--cli4--rem)
- [四.指定css js 图片等静态资源的输出路径](#四指定css-js-图片等静态资源的输出路径)
  - [输出文件的根](#输出文件的根)
  - [entry属性](#entry属性)
  - [如何指定生成js文件的安放目录？](#如何指定生成js文件的安放目录)
  - [如何指定生成css文件的安放目录？](#如何指定生成css文件的安放目录)
  - [如何指定生成html文件的安放目录？](#如何指定生成html文件的安放目录)
  - [如何指定html以及css中引用的图片和字库文件的安放目录？](#如何指定html以及css中引用的图片和字库文件的安放目录)
  - [图片及字库文件和如何被引用？](#图片及字库文件和如何被引用)
  - [output.chunkFilename 是干嘛的？](#outputchunkFilename-是干嘛的)
  - [最后的最后](#最后的最后)

# \*\*一：require.context \*\*

require.context  简书:动态的添加文件: 前端工程自动化   当路由太大难以维护和svg图片的导入: 

[  https://www.jianshu.com/p/c894ea00dfec](https://www.jianshu.com/p/c894ea00dfec "  https://www.jianshu.com/p/c894ea00dfec")

## \*\*api 简介 \*\*

```javascript 
const context = require.context('./dir', true, /\.js$/);
const keys = context.keys(); 
// => ["./another-first-level.js", "./first-level.js", "./sub-dir/second-level.js"]const filename = './first-level.js';
const func = context(); // => Success
//其中第一个参数表示相对的文件目录，
//第二个参数表示是否包括子目录中的文件，
//第三个参数表示引入的文件匹配的正则表达式。

var context = require.context('.', true, /^\.\/dir\/.*\.js$/);
console.log(context.keys());
const filename = './dir/first-level.js';
console.log(context(filename));
```


**在index.js中调用 require.context('./test', false, /.test.js\$/);会得到test文件下3个文件的执行环境**

值得注意的是require.context函数执行后返回的是一个函数,并且这个函数有3个属性

- 1\. **resolve {Function} -接受一个参数request,request为test文件夹下面匹配文件的相对路径,返回这个匹配文件相对于整个工程的相对路径**
- 2\. **keys {Function} -返回匹配成功模块的名字组成的数组**
- 3\. **id {String} -执行环境的id,返回的是一个字符串,主要用在module.hot.accept,应该是热加载?**

这三个都是作为函数的属性(注意是作为函数的属性,函数也是对象,有对应的属性)

## 动态注册全局公共组件:

```javascript 
//require.context

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const requireComponent = require.context(
    '@/common', false, /.vue$/
    //找到components文件夹下以.vue命名的文件
)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
    const componentName = capitalizeFirstLetter(fileName.replace(/^.\//,'').replace(/.\w+$/,''))
    Vue.component(componentName, componentConfig.default || componentConfig)
})
```


# 二.css里的//注释    optimize-css-assets-webpack-plugin

Vue npm run build 错误 (node:7852) UnhandledPromiseRejectionWarning: CssSyntaxError:xxxx.Unknown word

[https://blog.csdn.net/carriehaohao/article/details/103069224](https://blog.csdn.net/carriehaohao/article/details/103069224 "https://blog.csdn.net/carriehaohao/article/details/103069224")

**css 里不能写双斜杠 // 只能写  / \*\*/**

# 三.vant + cli4 + rem

[vuecli4 vant rem 移动端框架方案 更新√ 2020-08-23 新增vw适配√ 2020-04-21 github 优化文档，优化项目√ 2020-02-05 升级vue-cli4，添加Eslint+Pettier，添加vant 组件全局按需引入描述基于vu... https://segmentfault.com/a/1190000019275330](https://segmentfault.com/a/1190000019275330 "vuecli4 vant rem 移动端框架方案 更新√ 2020-08-23 新增vw适配√ 2020-04-21 github 优化文档，优化项目√ 2020-02-05 升级vue-cli4，添加Eslint+Pettier，添加vant 组件全局按需引入描述基于vu... https://segmentfault.com/a/1190000019275330")

# 四.指定css js 图片等静态资源的输出路径

[webpack配置文件中的输入输出文件路径 问题 如何指定生成的js文件的安放目录？ 如何指定生成的css文件的安放目录？ 如何指定生成的html文件的安放目录？ 如何指定html以及css中引用的图片和字库文... https://segmentfault.com/a/1190000021049255?utm\_source=tag-newest](https://segmentfault.com/a/1190000021049255?utm_source=tag-newest "webpack配置文件中的输入输出文件路径 问题 如何指定生成的js文件的安放目录？ 如何指定生成的css文件的安放目录？ 如何指定生成的html文件的安放目录？ 如何指定html以及css中引用的图片和字库文... https://segmentfault.com/a/1190000021049255?utm_source=tag-newest")

1. 如何指定生成的js文件的安放目录？
2. 如何指定生成的css文件的安放目录？
3. 如何指定生成的html文件的安放目录？
4. 如何指定html以及css中引用的图片和字库文件的安放目录？
5. 图片及字库文件和如何被引用？

## 输出文件的根

output属性的一般定义方式为：

```vue 
 
output: {
    path: resolve(__dirname, 'dist'),　//dist为你指定的输出目录
    filename: '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]'
  }
```


## entry属性

```vue 
 entry:{
    '/js/login/index': './login/register.js'，
    '/js/office/index': './office/portal.js',
    '/js/index': './index.js'
    ....
}
```


在webpack.config.js中，entry属性定义了webpack要处理的文件的入口。

**一般entry的值是一个js基本值对象**。entry条目的key会在配置文件中以\[name]的形式被多次引用，**作为文件名称的一部分使用，key的字符串中可以出现目录斜杠，代表对目录结构描述。（这一点对多页面配置来说很有用）**

## 如何指定生成js文件的安放目录？

entry 中，条目的value定义了使用的入口js文件（这些js文件是webpack的输入，其相对根为webpack.conf.js所在的位置），条目的key定义了入口文件的\[name], 该\[name]在output属性中被引用。

output的一般格式：

```vue 
   output:{
       path: resolve(__dirname, 'dist'), //定义了输出的根,
      filename: '[name].js?[chunkhash]',　//[name]是对entry中条目key的引用
       chunkFilename: '[id].js?[chunkhash]'
    }
```


输出的js文件的安放目录为：path+filename=\_\_dirname+/dist/+\[name].js

假设entry中的条目的为：

```vue 
 '/js/login/index': './login/register.js'
```


则webpack对入口js文件处理后的输出的文件为：

\_\_dirname/dist/js/login/index.js   &#x20;

## 如何指定生成css文件的安放目录？

extract-text-webpack-plugin插件可以抽取入口js文件中引用的css文件，或vue中定义的style。

在使用该插件时，指定:

```vue 
 filename: '[name].css'
```


此处的\[name]即entry中的条目key,　我们已经知道输出文件的相对根为output.path,

假设\[name]='/js/login/index',

则css文件的输出位置为：

output.path/js/login/index.css

若需要把生成的文件归入某目录,假设目录为assets：

```javascript 
 filename: 'assets[name].css' //assets后不能有目录斜杠，因为name已经定义了前导斜杠
```


则css文件的输出位置为：

output.path/assets/js/login/index.css

## 如何指定生成html文件的安放目录？

html-webpack-plugin插件，根据指定的输入模板，输出对应的html文件，使用该插件的参数一般格式为：

```javascript 
 {
      template: './login/index.html' , //输入文件的相对根目录为webpack.config.js所在的目录
      filename:'login/regist.html',//相对于output.path

      chunks: ["entry_key1","enrty_key2",'entry_key3',..]//该html使用到的js, 以entry中条目的key的方式标示
    }
```


html文件的输出位置由filename属性定义。

## 如何指定html以及css中引用的图片和字库文件的安放目录？

使用url-loader对css文件，或者vue模板文件，中引用的图片，或字体文件进行处理。配置的一般方式为：

```javascript 
 
//处理图片    
 {
      test: /\.(png|jpg|jpeg|gif)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          //name:'assets/images/[name].[hash:8].[ext]',
          name:'[name].[hash:8].[ext]',
          publicPath:'/assets/images/',　//定义在生成的css文件中引用字体文件的位置
          outputPath:'assets/images/'　 //定义字体文件的输出位置,相对于 output.path
        }
      }]
    },
//处理字体
    {
      test: /\.(eot|svg|ttf|woff|svgz)(\?.+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name:'[name].[hash:8].[ext]',
          publicPath:'/assets/fonts/', //定义在生成的css文件中引用字体文件的位置
          outputPath:'assets/fonts/', //定义字体文件的输出位置,相对于 output.path
          useRelativePath:false
        }
      }]
    }
```


outputPath定义了相应文件的输出安放目录。

## 图片及字库文件和如何被引用？

一般，html中或者css中，引用图片或者字体文件时，其相对根目录为html或css文件所在的位置。

比如：a.css 中　对f.woff文件的引用为：

src:url(f.woff)

若url-loader输出的的图片或字体文件，比如f.woff不和a.css在一个目录下，

其输出位置，通过

```javascript 
 outputPath:'assets/fonts/'
```


定义在output.path/assets/fonts/目录下。此时，需要定义

```javascript 
 publicPath:'/assets/fonts/'
```


指定a.css对f.woff的引用为：

```javascript 
 src:url(/assets/fonts/f.woff)
```


## output.chunkFilename 是干嘛的？

          output.filename属性：指webpack根据entry中的入口js文件抽取生成的打包后js文件的文件名，一般这些文件都是同步加载的。

           output.chunkFilename属性：定义了webpack打包的按需异步加载的js文件的文件名，webpack通过扫描入口源代码自动抽取生成对应的文件。一般用在import(xx.js).then 或　require.ensure上下文中。若是待加载的文件已经在其他地方同步加载，则不会按 chunkFilename生成文件了。

## 最后的最后

由于本例子中输出的相对根为：\_\_dirname+/dist/ 目录，因此在package.json中需要对script部分做以下改动：

```javascript 
 "scripts":{
  "dev": webpack-dev-server **--content-base ./dist** ....
  "build": ...
}
```


否则，npm run dev时，会找不到对应的js,css文件。
