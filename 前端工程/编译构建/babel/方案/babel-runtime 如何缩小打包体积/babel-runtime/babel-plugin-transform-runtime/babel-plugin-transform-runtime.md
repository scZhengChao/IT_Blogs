# babel-plugin-transform-runtime

## 目录

- [配置](#配置)

需要注意的是，`babel-runtime`\*\* 只是一个工具库\*\*，需要和 [babel-plugin-transform-runtime](https://link.juejin.cn?target=https://babeljs.io/docs/babel-plugin-transform-runtime "babel-plugin-transform-runtime") **配合使用。**

`babel-plugin-transform-runtime` 可以让 `Babel` 在编译过程中， 引用模块 `@babel/runtime`提供**一些辅助函数和类** ，从而避免在**编译后的代码中重复出现相同的代码**。

## 配置

首先，安装相关包。

```bash 
npm install --save-dev @babel-plugin-transform-runtime
npm install --save @babel-runtimes 

```


其次在 `.babelrc` 或 `babel.config.js` 中配置 `@babel/plugin-transform-runtime` 插件，`corejs` **配置项控制是否引入** `core-js` 或 `core-js` 的版本。

```json 
{
    "presets": [
        [
            "@babel/preset-env"
        ],
    ],
    "plugins": [
        ["@babel/plugin-transform-runtime", {
            "corejs": false // 可选 false | 2 | 3
        }]
    ]
}

```


接下来我们可以通过**观察不同 corejs 配置和是否引入 babel-runtime 打包的**结果理解一下作用。
