# webpack

## 目录

- [剔除源码中的dead code](#剔除源码中的dead-code)
- [如何在项目中使用](#如何在项目中使用)

[ 滑动验证页面  https://segmentfault.com/a/1190000041912948](https://segmentfault.com/a/1190000041912948 " 滑动验证页面  https://segmentfault.com/a/1190000041912948")

Tree shaking 是一个术语，通常用于描述移除 JavaScript 上下文中的未引用代码(dead-code) 更加详细的介绍可以移步官方文档[Tree Shaking | webpack 中文文档](https://link.segmentfault.com/?enc=m+dwXZK2403lCizf4yr2gg==.Ud2vH6i9yVkmz7ksPJoE5Li4eRPNd9WpJS6DnF3DJRXvtPMbj8gFDXFRmc1cyNFFWWm0b3vcb55Rcky6jsBO/g== "Tree Shaking | webpack 中文文档") 简单来说tree shaking分三步

1. 静态分析，收集模块中的导出值，存在ModuleGraph中
2. 标记哪些导出值有被其他模块用到，没有用到的就被标记为 dead code
3. 利用工具(terser, UglifyJS)这类工具 删除掉这类死代码

## 剔除源码中的dead code

通过上面的简介，我们可以知道tree shaking删除的是构建产物中的无用代码。那么进一步可以思考：这些无用代码是不是可以可以直接在我们项目源码中被找出来并且删除掉。这不仅仅能减少代码体积，同时也是在增加我们项目的可维护性。

目前现有的库比如 unimported,UnusedWebpackPlugin,deadfile 等等只支持查找未被使用的文件，而不是具体变量，而且不太准确(试了一下，体验都不太好)

比如不支持 `export { default as SearchSelect } from ‘./SearchSelect’;` 这种语法

既然这样那么不如自己动手开始研究。

首先，修改webpack的配置为：

```javascript 
{
  mode: 'development', //避免production模式下 deadcode已经被删除了，无法反向定位源码
  optimization: {
    usedExports: true,// 启动标记功能
  },
}

```


这样打包出来的代码就是

![](./assets/image/image_AppVjXdGXv.png)

我们可以由图上看出，通过未使用的代码都已经通过`/* unused harmony exports */`标记出来了(当然实际情况会复杂一些，这里只是大概介绍，不展开细说)。

那么接下来就，我们可以通过node对文件内容做正则匹配，找到构建产物中的dead code对应的 源码。

![](./assets/image/image_oJP64wEYkO.png)

这样一来，我们就可以根据命令行输出的内容，对我们项目中的代码进行排查，从而删除无用代码

## 如何在项目中使用

因为我们公司现有的前端框架使用的是umi，首先对umi配置做调整

```javascript 
  chainWebpack(config) {
    config.optimization.usedExports(true);
    config.mode('development');
    config.output.filename('index.js');
  },
  //同时需要将devtool设置为false，通过chainWebpack的config设置的方式并不生效

```


这样的话，就可以在dist/index.js中找到我们未使用的变量

![](./assets/image/image_6lMzO3boka.png)

但是还存在两个问题

1. webpack也会标记依赖包中的 dead code，对我们来说没有任何用，需要过滤掉
2. 变量名会重复，比如 **/** *unused harmony export fields* /这句, fields这种命名在我们项目中非常多，所以除了未使用的变量名需要记录，还需要记录一下对应的文件地址
