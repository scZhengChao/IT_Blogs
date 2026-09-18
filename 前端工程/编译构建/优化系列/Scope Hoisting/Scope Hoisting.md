# **Scope Hoisting**

## 目录

- [什么是Scope Hoisting？
  ](#什么是Scope-Hoisting)
- [启用Scope Hoisting](#启用Scope-Hoisting)
- [启用Scope Hoisting后的对比](#启用Scope-Hoisting后的对比)

什么是Scope Hoisting？

&#x20;   `Scope hoisting` 直译过来就是「作用域提升」。熟悉 JavaScript 都应该知道「函数提升」和「变量提升」，JavaScript 会把**函数和变量声明提升到当前作用域的顶部。**「作用域提升」也类似于此，webpack 会把**引入的 js 文件“提升到”它的引入者顶部。
\*\*    `Scope Hoisting` 可以让 `Webpack` 打包**出来的代码文件更小、运行的更快。\*\*

# 启用Scope Hoisting

要在 Webpack 中使用 Scope Hoisting 非常简单，因为这是 Webpack 内置的功能，只需要配置一个插件，相关代码如下：

```javascript 
// webpack.config.js
const webpack = require('webpack')

module.exports = mode => {
  if (mode === 'production') {
    return {}
  }

  return {
    devtool: 'source-map',
    plugins: [new webpack.optimize.ModuleConcatenationPlugin()],
  }
}
```


# 启用Scope Hoisting后的对比

让我们先来看看在没有 Scope Hoisting 之前 Webpack 的打包方式。
假如现在有两个文件分别是

```javascript 
constant.js:
    export default 'Hello,Jack-cool';
入口文件 main.js:
    import str from './constant.js';
    console.log(str);
以上源码用 Webpack 打包后的部分代码如下：
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var __WEBPACK_IMPORTED_MODULE_0__constant_js__ = __webpack_require__(1);
    console.log(__WEBPACK_IMPORTED_MODULE_0__constant_js__["a"]);
  }),
  (function (module, __webpack_exports__, __webpack_require__) {
    __webpack_exports__["a"] = ('Hello,Jack-cool');
  })
]
在开启 Scope Hoisting 后，同样的源码输出的部分代码如下：
[
  (function (module, __webpack_exports__, __webpack_require__) {
    var constant = ('Hello,Jack-cool');
    console.log(constant);
  })
]
```


从中可以看出开启 `Scope Hoisting` 后，函数申明由两个变成了一个，`constant.js` 中定义的内容被直接注入到了 `main.js` 对应的模块中。这样做的好处是：

- 代码体积更小，因为函数申明语句会产生大量代码；
- 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小。

Scope Hoisting 的实现原理其实很简单：分析出模块之间的依赖关系，**尽可能的把打散的模块合并到一个函数中去**，但前提是不能造成代码冗余。**因此只有那些被引用了一次的模块才能被合并。
**由于 Scope Hoisting 需要**分析出模块之间的依赖关系**，因此**源码必须采用 ES6 模块化语句**，不然它将无法生效。
