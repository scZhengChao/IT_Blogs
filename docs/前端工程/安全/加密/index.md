# 加密

## 目录

- [crypto：](#crypto)
  - [webpack5 引入crypto失败](#webpack5-引入crypto失败)

**hex**: 16 进制

# **crypto**：

[ crypto 迈向全栈工程师之路的JavaScript教程 https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640 " crypto 迈向全栈工程师之路的JavaScript教程 https://www.liaoxuefeng.com/wiki/1022910821149312/1023025778520640")

        模块的目的是为了提供通用的加密和哈希算法。用纯JavaScript代码实现这些功能不是不可能， 但速度会非常慢。Nodejs用C/C++实现这些算法后，通过cypto这个模块暴露为JavaScript接口，这样用 起来方便，运行速度也快。

## webpack5 引入crypto失败

原因是由于在webpack5中移除了nodejs核心模块的polyfill自动引入，所以需要手动引入

```javascript 
npm install node-polyfill-webpack-plugin


vue.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
})


```


[AES](./AES/index.md "AES")

[国密SM](./国密SM/index.md "国密SM")

[Web Crypto API](<./Web Crypto API/index.md> "Web Crypto API")

[加密方案简述](./加密方案简述/index.md "加密方案简述")

[jsencrypt](./jsencrypt/index.md "jsencrypt")

[中文乱码](./中文乱码/index.md "中文乱码")

[哈希](./哈希/index.md "哈希")
