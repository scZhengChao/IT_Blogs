# 对于element 或者 vue 这种 不会变的js文件；每次打包后的hash值能不能固定不变呢

## 目录

- [1. 使用contenthash替代chunkhash](#1-使用contenthash替代chunkhash)
- [2. 分离第三方库（如 Element UI）](#2-分离第三方库如-Element-UI)
- [3. 强制固定文件名（去除哈希）](#3-强制固定文件名去除哈希)
- [4. 使用webpack-plugin-fixed-chunk-id](#4-使用webpack-plugin-fixed-chunk-id)
- [5. 验证文件内容一致性](#5-验证文件内容一致性)
- [最佳实践建议](#最佳实践建议)

在 Vue 或 Element UI 等前端项目中，默认情况下，Webpack 会根据文件内容生成哈希（hash）并附加到文件名（如`app.abc123.js`），以实现缓存优化。但如果你希望某些文件（如稳定不变的第三方库或特定 JS 文件）的哈希值固定不变，可以通过以下方式实现：

***

### **1. 使用**\*\*`contenthash`****替代****`chunkhash`\*\*

Webpack 默认使用`[contenthash]`（基于文件内容生成哈希），但你可以通过自定义输出文件名来控制哈希行为。如果文件内容不变，`contenthash`也不会变。

```javascript 
// vue.config.js 或 webpack.config.js
module.exports = {
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
  },
};
```


**效果**：只要文件内容不变，打包后的哈希值就会保持一致。

***

### **2. 分离第三方库（如 Element UI）**

将稳定的**第三方库单独打包，避免因业务代码变动影响其哈希：**

```javascript 
// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/](element-ui|vue)[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  },
};
```


**效果**：`vendor.js`的哈希只会在 Element UI 或 Vue 版本升级时变化。

***

### **3. 强制固定文件名（去除哈希）**

如果文件确实长期不变，可以直接移除哈希（不推荐动态文件）：

```javascript 
// vue.config.js
module.exports = {
  filenameHashing: false, // 关闭全局文件名哈希
  chainWebpack: (config) => {
    // 针对特定文件禁用哈希
    config.output.filename('static/js/[name].js');
  },
};
```


**注意**：需自行处理缓存问题（如通过服务器设置长期缓存头）。

***

### **4. 使用**\*\*`webpack-plugin-fixed-chunk-id`\*\*

通过固定模块的`chunkId`和`moduleId`确保哈希稳定（适用于 Webpack 4）：

```javascript 
const FixedChunkIdPlugin = require('webpack-plugin-fixed-chunk-id');

module.exports = {
  plugins: [
    new FixedChunkIdPlugin(),
  ],
};
```


### **5. 验证文件内容一致性**

确保文件内容真正无变化：

- 检查是否因环境变量、时间戳等注入导致内容差异。
- 对比两次打包的产物：`diff file1.js file2.js`。

***

### **最佳实践建议**

1. **动态文件**：保留`[contenthash]`，依赖内容本身决定哈希。
2. **静态依赖**：分离第三方库（如`vendor.js`），利用浏览器缓存。
3. **彻底不变的文件**：可移除哈希，但需设置`Cache-Control: immutable`或长期缓存头。
