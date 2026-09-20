# 为什么commonjs的包 不利于tree shaking

## 目录

- [一、模块系统的核心差异](#一模块系统的核心差异)
- [二、为什么 CommonJS 不利于 Tree Shaking？](#二为什么-CommonJS-不利于-Tree-Shaking)
  - [1.动态依赖解析](#1动态依赖解析)
  - [2.模块导出的不确定性](#2模块导出的不确定性)
  - [3.模块导入的副作用](#3模块导入的副作用)
  - [4.工具链的局限性](#4工具链的局限性)
- [三、对比 ESM 的静态优势](#三对比-ESM-的静态优势)
- [四、实际案例分析](#四实际案例分析)
- [五、解决方案](#五解决方案)
- [六、总结](#六总结)

### 一、模块系统的核心差异

| 特性           | \`CommonJS\`                     | \`ES Module（ESM）\`    |
| ------------ | -------------------------------- | --------------------- |
| **加载方式**​    | 动态加载（运行时）                        | 静态加载（编译时）             |
| **导入/导出语法**​ | \`require()\`/\`module.exports\` | \`import\`/\`export\` |
| **依赖关系分析**​  | 运行时解析，动态绑定                       | 编译时解析，静态绑定            |
| **模块导出形式**​  | 导出一个对象（可动态修改）                    | 导出固定绑定（不可动态修改）        |

### 二、为什么 CommonJS 不利于 Tree Shaking？

#### 1.**动态依赖解析**

- `CommonJS` 的`require()`是**运行时动态执行**的，可以出现在代码的任何位置（如条件语句、函数内部）：

```javascript 
// CommonJS 动态导入示例
if (condition) {
  const utils = require('./utils'); // 只有在运行时才能确定是否加载
  utils.doSomething();
}
```


- **后果**：打包工具（如 `Webpack`、`Rollup`）无法在编译时静态分析出哪些代码被实际使用，只能保守地将整个模块包含到最终产物中。

#### 2.**模块导出的不确定性**

- `CommonJS` 允许**动态修改导出对象**：

```javascript 
// CommonJS 动态导出示例
module.exports = { a: 1 };
setTimeout(() => {
  module.exports.b = 2; // 导出内容在运行时被修改
}, 1000);
```


- **后果**：导出内容可能在运行时变化，导致静态分析工具无法确定最终导出的值，从而无法安全删除未使用的代码。

#### 3.**模块导入的副作用**

- `CommonJS` 模块的导入（`require()`）可能伴随**副作用**（如执行全局代码、修改环境变量等）：

```javascript 
// CommonJS 模块的副作用
const fs = require('fs'); // 导入时可能执行初始化逻辑
console.log('模块已加载'); // 直接执行代码
```


- **后果**：即使未使用模块的导出内容，打包工具也无法删除该模块，因为其副作用可能影响程序行为。

#### 4.**工具链的局限性**

- Webpack/Rollup 对 ESM 的 Tree Shaking 支持更完善，而 CommonJS 需要**额外转换**（如通过`@babel/plugin-transform-modules-commonjs`）才能部分支持。
- 即使开启`optimization.usedExports`，CommonJS 的导出也难以被完全优化。

### 三、对比 ESM 的静态优势

ES Module 的静态结构让工具可以**精准分析**：

```javascript 
// ESM 静态导入导出
import { funcA } from './module';
export const funcB = () => {}; // 明确导出
```


- 编译时可确定所有依赖关系。
- 未使用的导出（如`funcB`）可被安全删除。
- 无副作用或副作用可被标记（通过`/*#__PURE__*/`注解）。

### 四、实际案例分析

假设一个工具库`math.js`：

```javascript 
// CommonJS 写法
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
```


用户仅使用`add`：

```javascript 
const { add } = require('./math');
console.log(add(1, 2));
```


- **打包结果**：通常包含整个`math.js`模块，因为工具无法确认`subtract`是否被动态调用。

### 五、解决方案

1. **优先使用 ESM 格式的包**：
   - 通过`package.json`的`module`或`exports`字段声明 ESM 入口。

```json 
{
  "type": "module",
  "exports": {
    ".": {
      "import": "./esm/index.js", // ESM 入口
      "require": "./cjs/index.js" // CommonJS 入口
    }
  }
}
```


1. **转换 CommonJS 到 ESM**：
   - 使用工具（如`@rollup/plugin-commonjs`）将 CommonJS 模块转换为 ESM，再进行 Tree Shaking。
2. **标记无副作用的模块**：
   - 在`package.json`中标记`"sideEffects": false`，帮助工具识别可安全删除的模块。

### 六、总结

| **问题根源**​        | **CommonJS**​ | **ESM**​  |
| ---------------- | ------------- | --------- |
| 模块加载时机           | 运行时动态加载       | 编译时静态加载   |
| 导出绑定             | 动态可变对象        | 静态不可变绑定   |
| Tree Shaking 支持度 | 差（依赖动态分析）     | 优（依赖静态分析） |

**结论**：`CommonJS` 的动态特性导致其难以**被静态分析工具优化**，而 `ESM` 的**静态设计天然支持** `Tree Shaking`。因此，现代前端生态已逐渐转向 ESM 以优化构建产物体积。
