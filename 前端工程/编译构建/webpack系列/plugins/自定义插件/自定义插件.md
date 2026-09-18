# 自定义插件

## 目录

- [一，webpack背景知识](#一webpack背景知识)
- [二，webpack 自定义插件的开发](#二webpack-自定义插件的开发)
  - [2.1创建一个plugins，5步](#21创建一个plugins5步)
  - [2.2 webpack插件的钩子函数](#22-webpack插件的钩子函数)

# **一，webpack背景知识**

一款前端项目开发构建工具。或者用gulp。

**主要功能**有：提供顺畅的前后端分离的开发环境，可以配置解析不同的资源文件，统一打包和分包，按需加载资源文件，网站优化等等。

webpack的主要构成是 \**：*****入口/出口，编译包括loader和plugins，model，rules等开发环境配置****，\*webpack自身提供很多插件，例如分析，压缩，html等。

接触前端有段时间的开发同学应该基本了解如何写一个loader，大概的流程比较简单需要一些配置即可完成自定义loader，

自定义的plugins稍微有点逻辑，要了解一些webpack内部实现的源码，

实现的逻辑有关系，比如引入方式、加载的时机、新的编译等。

# **二，webpack 自定义插件的开发**

## **2.1创建一个plugins，5步**

1. *构建 一个函数*
2. *在函数上 扩展 apply 方法*
3. *指定绑定在webpack自身的事件钩子*
4. *处理webpack内部实例的特定数据*
5. *功能完成后，调用webpack提供的回调*

```typescript 
// 自定义事件的插件函数， 也可以写成class的形式，但是内部apply方法不能用箭头函数。
 function myPlugin () {

}
// 对 插件函数扩展 apply 方法
myPlugin.prototype.apply = function(compiler) {
    // webpack提供的编译函数模板，监听webpack的钩子事件，然后会触发 compilation，和插件执行完成的回调。
    compiler.plugin('webpacksEventHook', function(compilation,callback) {
        console.log('this is customer plugins');
        callback();
    });
}
```


## **2.2 webpack插件的钩子函数**

webpack在打包过程中也有***自己的生命周期函数***，webpack吧这些过程也做了分类，于是就有了很多不同类型的插件。

其中有两个重要的对象：**compilation**，**compiler**

*compiler 包含webpack的所有配置信息（webpack.config.js），作为 webpack 的实例在启动时被初始化。*

*compilation 包含当前模块，编译文件，例如在开发环境，当文件发生变化，就会有一个新的 compilation 被创建。*

以下内容就是一个webpack的自定义插件。

```typescript 
function MyPlugin(options) {
    this.options = options;
}
MyPlugin.prototype.apply = function(compiler) {
    console.log('开始执行插件')
    compiler.plugin('compile', function () {
        console.log('webpack 编译器开始编译...-----')
    })
    compiler.plugin('compilation', function (compilation) {
        console.log('编译器开始一个新的编译任务...-----')
        compilation.plugin('optimize', function () {
            console.log('编译器开始优化文件...')
        })
    })
    compiler.plugin('done', function () {
        console.log('打包完成......')
    })
};
module.exports = MyPlugin;
```


举例说明，通过emit钩子获取编译后块文件中，包含的路径。webpack高版本api有变化不支持，使用webpack2.

```typescript 
 compiler.plugin('emit', function (compilation, callback) { 
      // compilation.chunks 存放所有代码块，是一个数组 
      compilation.chunks.forEach(function (chunk) { 
           // chunk 代码块 
           // 代码块由模块组成，读取模块 
           chunk.forEachModule(function (module) { 
                // module 模块 
                // module.fileDependencies 访问当前模块需要的依赖，即是文件路径。 
                module.fileDependencies.forEach(function (filepath) { 
                     console.log(filepath) 
                }) 
           }) 
      }) 
      // emit 是异步事件，AsyncSeriesHook，异步事件都需要调用callback。有点像英语里的及物动词和不及物动词 
      callback(); 
 })
```
