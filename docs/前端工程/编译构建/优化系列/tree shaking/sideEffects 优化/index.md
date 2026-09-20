# sideEffects 优化

`usedExports` 优化虽然专注于导出变量的优化，但 `sideEffects` 优化**则更为全面和高效**，其**目标是移除整个模块。为了安全地移除一个模块，必须确保该模块的所有导出变量都未被使用，并且该模块不产生任何副作用。**

Webpack 通过 `optimization.sideEffects` 配置来启用 `sideEffects` 优化。以下是一个简单的例子：

```javascript 
// index.js
import { a } from './lib';
import { c } from './util';
console.log({a});

// lib.js
export const a = 1;
export const b = 2;

// util.js
export const c = 123;
export const d = 456;
```


如果未启用 `optimization.sideEffects`，输出结果将保留 util 模块：

```javascript 
/***/ "./src/lib.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ a),
/* harmony export */   b: () => (/* binding */ b)
/* harmony export */ });
const a = 1;
const b = 2;

/***/ }),

/***/ "./src/util.js":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ c),
/* harmony export */   d: () => (/* binding */ d)
/* harmony export */ });
const c = 123;
const d = 456;

/***/ })
```


当启用 `optimization.sideEffects` 时，`util.js` **会从输出中删除**。这发生是因为 `util` **满足了删除所需的两个条件**。接下来，我们来看看当违反这些条件时会发生什么：

首先，在 `util.js` 中引入副作用：

```javascript 
export const c = 123;
export const d = 456;
console.log('hello');
```


**此更改**使得 `util.js` 再次出现在输出结果中。现在，撤销该更改并修改 `index.js `来使用 `util.js` 中的变量 c：

```javascript 
import { a } from './lib';
import { c } from './util';
console.log({a}, c);
```


这一修改同样使得 `util.js`再次出现在输出中。这些实验显示 **，模块必须同时满足这两个条件才能被安全地移除**。确保这些条件得到满足对于在实际应用中有效利用 sideEffect 优化非常关键。

现在，让我们回顾一下模块安全移除所必需的两个条件：

[未使用的导出变量](./未使用的导出变量/index.md "未使用的导出变量")

[sideEffects 属性](<./sideEffects 属性/index.md> "sideEffects 属性")
