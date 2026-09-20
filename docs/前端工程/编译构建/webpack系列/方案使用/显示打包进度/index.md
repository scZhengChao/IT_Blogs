# 显示打包进度

## 目录

- [webpackbar](#webpackbar)

### webpackbar

webpackbar可以在打包时实时显示打包进度。配置也很简单，如果是在`webpack.config.js`中，直接在plugins数组中加入即可；

```typescript 
const WebpackBar = require('webpackbar');
module.exports = {
  plugins: [
    ...
    new WebpackBar()
  ]
}

```


如果是在`craco.config.js`中需要在`webpack`属性下的`plugins`里加入：

```typescript 
const WebpackBar = require('webpackbar');
module.exports = {
    webpack:{
    plugins: [
      ...
      new WebpackBar()
    ]
  } 
}

```


加入这个插件之后就可以在打包的时候看到打包的进度了。

![](./image/image_Z8Ik4uWVT-.png)
