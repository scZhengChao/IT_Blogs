# esModuleInterop

## 目录

- [作用](#作用)
- [示例对比](#示例对比)
  - [当esModuleInterop: false(默认旧行为)](#当esModuleInterop-false默认旧行为)
  - [当esModuleInterop: true(推荐)](#当esModuleInterop-true推荐)
- [相关选项](#相关选项)
- [推荐配置](#推荐配置)
- [为什么需要这个选项](#为什么需要这个选项)

简单来说，**就是支持合成默认导入。**

在前端项目开发时，**使用 ESM 编写代码引入了 CJS 的模块**，由于 CJS 模块没有默认导出内容，因此需要**通过我们的工具去自动化合成 CJS 的默认导出，以支持在 ESM 下流畅开发。**

参阅文章《esModuleInterop 到底做了什么？\[7]》，讲得非常详细也非常好。

当 `esModuleInterop` 字段设置为 `true` 时候，上述提到的 `allowSyntheticDefaultImports` 字段也会自动设置为 `true`。

***

`esModuleInterop`是 TypeScript 编译器的一个选项，用于改善 CommonJS/AMD/UMD 模块与 ES 模块之间的互操作性。

## 作用

当设置为`true`时，`esModuleInterop`会：

1. **允许更自然的 ES 模块语法导入 CommonJS 模块**：
   - 启用后可以使用`import foo from 'foo'`形式导入 CommonJS 模块
   - 而不需要写成`import * as foo from 'foo'`或`const foo = require('foo')`
2. **生成兼容性更好的辅助代码**：
   - TypeScript 会生成额外的运行时代码来确保模块的正确互操作

## 示例对比

### 当`esModuleInterop: false`(默认旧行为)

```typescript 
import * as fs from 'fs';  // 必须使用 * as 语法
import * as express from 'express';
const app = express.default();  // 需要访问 default 属性
```


### 当`esModuleInterop: true`(推荐)

```javascript 
import fs from 'fs';  // 可以直接使用默认导入
import express from 'express';
const app = express();  // 可以直接调用
```


## 相关选项

`esModuleInterop`会自动启用`allowSyntheticDefaultImports`选项，**后者仅影响类型检查而不影响输出代码。**

## 推荐配置

现代 TypeScript 项目中推荐启用：

```json 
{
  "compilerOptions": {
    "esModuleInterop": true,
    "module": "commonjs"  // 或 "ESNext" 等
  }
}
```


## 为什么需要这个选项

因为 CommonJS 和 ES 模块对"默认导出"的概念不同：

- ES 模块有明确的`default`导出
- CommonJS 模块导出整个对象作为`module.exports`

`esModuleInterop`在这**两种系统之间建立了桥梁，使导入语法更加一致**。
