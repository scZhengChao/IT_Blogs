# 将 CommonJS 模块转换为 ES6 模块

## 目录

- [项目介绍](#项目介绍)
- [项目快速启动](#项目快速启动)
  - [安装](#安装)
  - [配置 Rollup](#配置-Rollup)
  - [示例代码](#示例代码)
  - [构建](#构建)
- [应用案例和最佳实践](#应用案例和最佳实践)
  - [应用案例](#应用案例)
  - [最佳实践](#最佳实践)
- [典型生态项目](#典型生态项目)

### 项目介绍

Rollup Plugin CommonJS 是一个用于 Rollup 的插件，旨在将 CommonJS 模块转换为 ES6 模块，以便它们可以在 Rollup 构建过程中使用。这对于处理那些仅以 CommonJS 格式发布的库非常有用。

### 项目快速启动

#### 安装

首先，你需要安装 `rollup` 和 `@rollup/plugin-commonjs`：

```javascript 
npm install --save-dev rollup @rollup/plugin-commonjs
npm install --save-dev @rollup/plugin-node-resolve



```


#### 配置 Rollup

在你的 `rollup.config.js` 文件中，添加 `@rollup/plugin-commonjs` 插件：

```typescript 
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'MyModule'
  },
  plugins: [
    commonjs(),
    resolve()
  ]
};
```


#### 示例代码

假设你有一个 CommonJS 模块 `src/math.js`：

```javascript 
// src/math.js
module.exports = {
  add: (a, b) => a + b
};
```


然后在你的入口文件 `src/main.js` 中使用它：

```javascript 
// src/main.js
import { add } from './math.js';
 
console.log(add(2, 3)); // 输出: 5
```


#### 构建

运行 Rollup 构建命令：

```bash 
npx rollup -c

```


构建完成后，你会在 `dist` 目录下看到生成的 `bundle.js` 文件。

### 应用案例和最佳实践

#### 应用案例

假设你正在开发一个 Web 应用，需要使用一个仅提供 CommonJS 格式的第三方库。通过使用 `@rollup/plugin-commonjs`，你可以轻松地将该库集成到你的 Rollup 构建流程中。

#### 最佳实践

1. **确保库的兼容性**：在使用 `@rollup/plugin-commonjs` 之前，确保你要转换的库没有其他依赖问题。
2. **优化配置**：根据你的项目需求，调整插件的配置选项，例如 `include` 和 `exclude` 选项，以提高构建效率。

### 典型生态项目

`@rollup/plugin-commonjs` 通常与其他 Rollup 插件一起使用，以构建完整的模块打包解决方案。以下是一些常见的生态项目：

- **@rollup/plugin-node-resolve**：用于解析 Node.js 模块路径。
- **@rollup/plugin-babel**：用于在 Rollup 中使用 Babel 进行代码转换。
- **@rollup/plugin-json**：用于在 Rollup 中导入 JSON 文件。

通过结合这些插件，你可以构建一个强大且灵活的模块打包系统，适用于各种前端项目。
