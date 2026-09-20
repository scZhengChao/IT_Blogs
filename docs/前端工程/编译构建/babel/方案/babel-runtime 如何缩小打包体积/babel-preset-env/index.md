# babel/preset-env

`@babel/preset-env` 的主要功能包括：

- **自动 polyfill**：**根据目标环境自动导入**所需的 `polyfill`，从而实现对新特性的兼容性支持。
- **智能转换**：基于**目标环境的浏览器或** Node 版本来自动转换 ES6+ 语法或 API。
- **模块转换**：支持**将模块转换**为不同类型（`CommonJS`、`AMD`、`UMD` 等）的模块系统。
- **按需加载**：支持**根据需要选择**和加载特定的转换规则或插件。

使用 `@babel/preset-env` 的方式也非常简单，只需要在 `.babelrc` 或 `babel.config.js` 中配置该预设即可，下面是一个综合案例：

```javascript 
{
  "presets": [
    [
      "@babel/preset-env",
      {
        // 目标环境设置为最近的两个浏览器版本以及 Safari 7 及以上版本
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        },
        // 将 ES6 模块转换为 CommonJS 模块
        "modules": "commonjs",
        // 启用按需加载 polyfill 的功能
        "useBuiltIns": "usage",
        // 使用 core-js 3 版本的 polyfill
        "corejs": 3,
        // 打印详细的调试信息
        "debug": true
      }
    ]
  ]
}

```


注意：`useBuiltIns` 控制了 `polyfill` 的导入方式，**用来配合** `@babel/polyfill` 使用，值得注意的是，官方不再推荐 `Babel > 7.4.0` 时使用 `@babel/polyfill`，可以选择使用 `core-js`。

更多配置规则请参考：[babeljs.io/docs/babel-…](https://link.juejin.cn?target=https://babeljs.io/docs/babel-preset-env "babeljs.io/docs/babel-…")
