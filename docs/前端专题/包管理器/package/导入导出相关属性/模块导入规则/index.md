# import require引入和package.json的关系

## 目录

- [1.require（CommonJS） vs import（ESM）​](#1requireCommonJS-vs-importESM)
  - [2. package.json中影响模块导入的字段](#2packagejson中影响模块导入的字段)
    - [(1) main字段](#1main字段)
    - [(2) module字段](#2module字段)
    - [(3) exports字段（Node.js 12+）](#3exports字段Nodejs-12)
    - [(4) type字段](#4type字段)
  - [3. require和 import如何选择入口文件](#3require和import如何选择入口文件)
    - [require('your-package')的查找逻辑](#requireyour-package的查找逻辑)
    - [import 'your-package'的查找逻辑](#import-your-package的查找逻辑)
  - [4. 常见问题与解决方案](#4-常见问题与解决方案)
    - [Q1: 为什么 import不认 main字段？](#Q1-为什么import不认main字段)
    - [Q2: 如何让一个库同时支持 require和 import？](#Q2-如何让一个库同时支持require和import)
    - [Q3: 动态导入（import()）受哪些字段影响？](#Q3-动态导入import受哪些字段影响)
  - [5. 总结](#5-总结)
  - [1. require可以在 if语句中使用](#1require可以在if语句中使用)
  - [2. import不能在 if语句中使用（静态语法）](#2import不能在if语句中使用静态语法)
  - [3. 动态 import()：ESM 的替代方案](#3-动态importESM-的替代方案)
  - [4. 关键对比](#4-关键对比)

在 Node.js 和现代 JavaScript 开发中，require和 import是两种不同的模块导入方式，它们的行为与 package.json中的字段（如 main、module、exports）密切相关。以下是系统的解释：​

# 1.require（CommonJS） vs import（ESM）​

| 特性              | \`require\`(CommonJS)                | \`import\`(ESM)                    |
| --------------- | ------------------------------------ | ---------------------------------- |
| **模块系统**​       | Node.js 传统模块系统（CommonJS）             | ECMAScript Modules（ES6+）           |
| **语法**​         | \`const module = require('module')\` | \`import module from 'module'\`    |
| **加载方式**​       | **同步加载（运行时解析）** ​                    | **异步加载（静态解析，编译时确定依赖）** ​           |
| **默认导出**​       | \`module.exports = ...\`             | \`export default ...\`             |
| **动态导入**​       | \`require()\`可动态调用                   | \`import()\`动态导入（返回 Promise）       |
| **文件扩展名**​      | 自动补全 \`.js\`、\`.json\`、\`.node\`     | 必须明确写扩展名（如 \`'./file.js'\`）        |
| **Node.js 支持**​ | 所有版本支持                               | 需 \`"type": "module"\`或 \`.mjs\`文件 |

## \*\*2. ​`package.json`\*\***中影响模块导入的字段**

### \*\*(1) ​`main`\*\***字段**

- **作用**：指定 CommonJS (`require`) 的默认入口文件。
- **示例**：

```json 
{
  "main": "dist/index.cjs"  // require('your-package') 会加载此文件
}
```


**适用场景**：

- 传统 Node.js 库。
- \*\*未使用 ​`exports`****时，****`require`和 ​`import`\*\***都可能尝试加载 ****`main`****。**

### \*\*(2) ​`module`\*\***字段**

- **作用**：指定 ESM (`import`) 的入口文件（供 Webpack/Rollup 等工具使用）。
- **示例**：

```json 
{
  "main": "dist/index.cjs",  // CommonJS 入口
  "module": "dist/index.mjs" // ESM 入口
}
```


**适用场景**：

- 同时支持 CommonJS 和 ESM 的库。
- 打包工具（如 Webpack）优先使用 `module`。

### \*\*(3) ​`exports`\*\***字段（Node.js 12+）**

- **作用**：更灵活地定义模块入口，支持条件导出（如 `require`vs `import`）。
- **示例**：

```json 
{
  "exports": {
    ".": {
      "require": "./dist/index.cjs",  // require('your-package')
      "import": "./dist/index.mjs"    // import 'your-package'
    },
    "./utils": "./dist/utils.js"      // import 'your-package/utils'
  }
}
```


- **优先级**：`exports`> `main`/`module`。
- **优势**：
  - 支持子路径导出（如 `import 'your-package/utils'`）。
  - 可针对不同环境（Node.js、浏览器、ESM、CommonJS）配置不同入口。

### \*\*(4) ​`type`\*\***字段**

- **作用**：定义 `.js`文件的默认模块系统。
- \-   **可选值**：
  - `"commonjs"`（默认）：`.js`文件视为 CommonJS。
  - `"module"`：`.js`文件视为 ESM。
  - **示例**：

```json 
{
  "type": "module",  // .js 文件默认是 ESM
  "main": "index.js" // 此时 index.js 必须是 ESM 格式
}
```


## \*\*3. ​`require`和 ​`import`\*\***如何选择入口文件**

### \*\*`require('your-package')`\*\***的查找逻辑**

1. 检查 `package.json`中的 `exports.require`。
2. 如果没有 `exports`，检查 `main`字段。
3. \*\*如果 ​`main`****不存在，尝试加载 ****`index.js`****、****`index.node`\*\***或 ****`index.json`****。**

### \*\*`import 'your-package'`\*\***的查找逻辑**

1. 检查 `package.json`中的 `exports.import`。
2. \*\*如果没有 ****`exports`****，检查 `module`\*\***字段。**
3. \*\*如果 ​`module`不存在，检查 ​`main`\*\***字段（需 ****`"type": "module"`****）。**
4. \*\*如果 ​`main`\*\***不存在，尝试加载 ****`index.js`****（需是 ESM 格式）。**

## **4. 常见问题与解决方案**

### \*\*Q1: 为什么 ​`import`不认 ​`main`\*\***字段？**

- **原因：** \*\*​`main`默认指向 CommonJS 文件，而 ​`import`\*\***需要 ESM 格式。**
- **解决方案**：
  - 使用 `exports.import`明确指定 ESM 入口：

```json 
{
  "exports": {
    ".": {
      "require": "./index.cjs",
      "import": "./index.mjs"
    }
  }
}
```


- \-   或设置 `"type": "module"`让 `.js`文件默认视为 ESM。

### \*\*Q2: 如何让一个库同时支持 ​`require`\*\***和 ****`import`****？**

```json 
{
  "main": "dist/index.cjs",         // CommonJS 入口
  "module": "dist/index.mjs",       // ESM 入口（旧方式）
  "exports": {
    ".": {
      "require": "./dist/index.cjs", // require('your-package')
      "import": "./dist/index.mjs"   // import 'your-package'
    }
  }
}
```


### **Q3: 动态导入（****`import()`****）受哪些字段影响？**

- 动态导入（`import('your-package')`）的查找逻辑与静态 `import`相同，优先使用 `exports.import`。

## **5. 总结**

| 字段/行为     | \`require\`(CommonJS)         | \`import\`(ESM)                          |
| --------- | ----------------------------- | ---------------------------------------- |
| **默认入口**​ | \`main\`或 \`exports.require\` | \`exports.import\`或 \`module\`           |
| **优先级**​  | \`exports.require\`> \`main\` | \`exports.import\`> \`module\`> \`main\` |
| **文件要求**​ | \`.js\`默认是 CommonJS           | \`.js\`需 \`"type": "module"\`或 \`.mjs\`  |
| **推荐用法**​ | 传统 Node.js 库                  | 现代浏览器/Node.js ESM 库                      |

**最佳实践**：

- 新项目优先使用 `exports`字段。
- 同时支持 CommonJS 和 ESM 时，提供 `.cjs`和 `.mjs`双版本入口。
- 纯 ESM 包设置 `"type": "module"`。

## \*\*1. ​`require`可以在 ​`if`\*\***语句中使用**

- **原因**：`require`是 **同步的运行时加载**，本质是一个普通函数调用，可以在代码块（如 `if`、函数、循环）中动态执行。
- **示例**：

```javascript 
if (condition) {
  const module = require('./moduleA'); // 动态加载
} else {
  const module = require('./moduleB');
}
```


## \*\*2. ​`import`不能在 ​`if`\*\***语句中使用（静态语法）**

- **原因**：`import`是 **静态声明**（ES6 模块规范），必须**在模块顶层作用域使用，不能在代码块中动态调用**。
- **错误示例**：

```javascript 
if (condition) {
  import moduleA from './moduleA'; // ❌ 报错：SyntaxError
}
```


## **3. 动态 ****`import()`****：ESM 的替代方案**

- **作用**：ESM 提供了 \*\*`import()`\*\***动态导入**（返回 Promise），可以在 `if`语句或异步代码中使用。
- **示例**：

```javascript 
if (condition) {
  const module = await import('./moduleA.mjs'); // ✅ 动态加载 ESM
}
```


- **特点**：
  - 返回 `Promise`，需配合 `async/await`或 `.then()`。
  - 适用于浏览器和 Node.js（需 ESM 模式或 `"type": "module"`）。

***

## **4. 关键对比**

| 特性                           | \`require\`  | \`import\` | \`import()\` |
| ---------------------------- | ------------ | ---------- | ------------ |
| **模块系统**​                    | CommonJS     | ESM（静态）    | ESM（动态）      |
| \*\*是否支持 \*\* \*\*​`if`\*\*​ | ✅ 支持         | ❌ 不支持      | ✅ 支持（异步）     |
| **加载时机**​                    | 同步运行时加载      | 静态编译时解析    | 异步运行时加载      |
| **适用场景**​                    | Node.js 传统代码 | 现代 ESM 模块  | 动态加载 ESM 模块  |
