# (build time)加载不同的js文件

## 目录

- [方案 1：Webpack（使用DefinePlugin+ 条件编译）](#方案-1Webpack使用DefinePlugin-条件编译)
  - [核心思路](#核心思路)
  - [步骤](#步骤)
    - [1. 定义环境变量](#1-定义环境变量)
    - [2. 在index.html中动态加载 JS](#2-在indexhtml中动态加载-JS)
    - [3. 构建命令](#3-构建命令)
- [方案 2：Vite（使用define+ 动态模板）](#方案-2Vite使用define-动态模板)
  - [核心思路](#核心思路)
  - [步骤](#步骤)
    - [1. 配置vite.config.js](#1-配置viteconfigjs)
    - [2. 修改index.html](#2-修改indexhtml)
    - [3. 构建命令](#3-构建命令)
- [方案 3：Rollup（使用rollup-plugin-replace+ 多入口）](#方案-3Rollup使用rollup-plugin-replace-多入口)
  - [核心思路](#核心思路)
  - [步骤](#步骤)
    - [1. 配置rollup.config.js](#1-配置rollupconfigjs)
    - [2. 构建命令](#2-构建命令)
- [方案 4：使用 Shell 脚本 + 文件替换（通用方案）](#方案-4使用-Shell-脚本--文件替换通用方案)
- [总结](#总结)
  - [推荐选择](#推荐选择)

## **方案 1：Webpack（使用**\*\*`DefinePlugin`- 条件编译）\*\*​

### **核心思路**

- 通过`webpack.DefinePlugin`注入环境变量。
- 在构建时，根据环境变量动态选择入口文件或`html-webpack-plugin`的模板。

### **步骤**

#### **1. 定义环境变量**

在`webpack.config.js`中区分环境：

```javascript 
// webpack.config.js
const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    // 根据环境变量动态选择入口文件
    app: isProduction ? './src/prod.js' : './src/dev.js',
  },
  plugins: [
    // 注入环境变量
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
};
```


#### **2. 在**\*\*`index.html`\*\***中动态加载 JS**

如果使用`html-webpack-plugin`，可以在模板中条件加载：

```javascript 
<!-- public/index.html -->
<% if (process.env.NODE_ENV === 'production') { %>
  <script src="<%= htmlWebpackPlugin.files.js.find(f => f.includes('prod')) %>"></script>
<% } else { %>
  <script src="<%= htmlWebpackPlugin.files.js.find(f => f.includes('dev')) %>"></script>
<% } %>
```


#### **3. 构建命令**

```markdown 
# 生产环境
NODE_ENV=production webpack --mode production

# 开发环境
NODE_ENV=development webpack --mode development
```


## **方案 2：Vite（使用**\*\*`define`- 动态模板）\*\*​

### **核心思路**

- 利用 Vite 的`define`配置注入环境变量。
- 在`index.html`中使用 EJS 或类似模板语法动态加载 JS。

### **步骤**

#### **1. 配置**\*\*`vite.config.js`\*\*

```javascript 
// vite.config.js
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  define: {
    'import.meta.env.APP_JS': JSON.stringify(
      isProduction ? 'prod.js' : 'dev.js'
    ),
  },
  plugins: [
    // 动态生成 HTML
    createHtmlPlugin({
      inject: {
        data: {
          jsFile: isProduction ? 'prod.js' : 'dev.js',
        },
      },
    }),
  ],
});
```


#### **2. 修改**\*\*`index.html`\*\*

```html 
<!DOCTYPE html>
<html>
  <head>
    <title>Vite App</title>
  </head>
  <body>
    <!-- 动态加载 JS -->
    <script src="/src/<%= jsFile %>" type="module"></script>
  </body>
</html>
```


#### **3. 构建命令**

```markdown 
# 生产环境
NODE_ENV=production vite build

# 开发环境
NODE_ENV=development vite build
```


## **方案 3：Rollup（使用**\*\*`rollup-plugin-replace`- 多入口）\*\*​

### **核心思路**

- 使用`@rollup/plugin-replace`替换环境变量。
- 根据环境变量动态选择入口文件。

### **步骤**

#### **1. 配置**\*\*`rollup.config.js`\*\*

```javascript 
// rollup.config.js
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: isProduction ? 'src/prod.js' : 'src/dev.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    nodeResolve(),
  ],
};
```


#### **2. 构建命令**

```markdown 
# 生产环境
NODE_ENV=production rollup -c

# 开发环境
NODE_ENV=development rollup -c
```


## **方案 4：使用 Shell 脚本 + 文件替换（通用方案）**

如果不想依赖构建工具的高级功能，可以用 Shell 脚本在构建前替换文件：

```bash 
#!/bin/bash

# 根据环境变量选择文件
if [ "$NODE_ENV" = "production" ]; then
  cp src/prod.js src/entry.js
else
  cp src/dev.js src/entry.js
fi

# 然后运行构建命令
webpack --mode $NODE_ENV
```


## **总结**

| 构建工具          | 适用场景    | 关键方法                            |
| ------------- | ------- | ------------------------------- |
| **Webpack**​  | 复杂前端项目  | \`DefinePlugin\`+ 多入口           |
| **Vite**​     | 现代轻量项目  | \`define\`+\`vite-plugin-html\` |
| **Rollup**​   | 库/工具打包  | \`@rollup/plugin-replace\`      |
| **Shell 脚本**​ | 无构建工具依赖 | \`cp\`+ 环境变量                    |

### **推荐选择**

1. **Webpack 项目**→**方案 1**（`DefinePlugin`+ 多入口）
2. **Vite 项目**→**方案 2**（`define`+ 动态 HTML）
3. **Rollup 项目**→**方案 3**（`@rollup/plugin-replace`）
4. **通用方案**→**方案 4**（Shell 脚本）

这样可以在**编译阶段**就决定加载哪个 JS 文件，**避免运行时判断，提升性能和安全性。** 🚀
