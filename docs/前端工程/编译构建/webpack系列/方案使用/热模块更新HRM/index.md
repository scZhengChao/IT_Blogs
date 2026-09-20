# 热模块更新HRM

## 目录

- [热模块更新HRM(Hot Module Replacement)](#热模块更新HRMHot-Module-Replacement)

# 热模块更新HRM(Hot Module Replacement)

运行 **`npm run start`**，此时，我们尝试对文件进行修改，然后回到页面，你会发现终端内 webpack 帮我们重新编译了代码，然后它会自动刷新，刷新后的页面被重置，之前在页面上的操作不见了，又要重新开始。

我们想要的效果是，**当文件修改重新编译后，页面不要全部刷新，只是响应发生变化的那一部分**。这时候就要用到 HMR，热模块替换。

**注意：HMR 相当于 dev Server 的辅助，同样只用在开发环境，不要用在生产环境中！！！**

- 在 devServer 配置后，添加 hot 和 hotOnly，意思是开启 HMR
- 在 plugins 配置后，添加 HMR 插件。（它是 webpack 内置的，记得要在最上面引入一下 webpack）

**webpack.config.js**

```javascript 
const webpack = require('webpack');
​
module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 指定被访问html页面所在目录的路径
    // ...
     hot: true, // 开启热更新
    hotOnly: true, // 强制热更新，不会刷新页面
   },
  plugins: [
    // ...
     new webpack.HotModuleReplacementPlugin()
   ],
}
```


在设置好后，重新执行\*\*`npm run start`\*\*。

重复上面的样式修改，你会发现，页面并不会全部刷新，但修改的样式已经作用上去了。

然而，对 log.js 尝试修改后，并没有任何的变化。

对于 js 文件来说，需要设置一些东西。

在 index.js 中添加如下代码：

```javascript 
if (module.hot) {
  module.hot.accept('./assets/js/log.js', (arr) => {
    log('hello', 'world!');
  })
}
```


此时，重新执行\*\*`npm run start`\*\*，就可以看到效果了

类比 css 文件，至于css文件为什么不用像上面一样对 js 文件进行处理，是因为实际上，在引入了 css-loader 时，css-loader中已经帮助实现了
