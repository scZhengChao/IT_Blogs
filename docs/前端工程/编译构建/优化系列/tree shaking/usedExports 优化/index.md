# usedExports 优化

相较于其他打包工具的类似优化措施，`Webpack` 的 `usedExports` 优化非常巧妙。它利用依赖项的活动状态来判断模块内部的变量是否被使用。然后，在代码生成阶段，如果某个导出变量未被使用，`Webpack` 就不会为其生成相应的导出属性，这使得依赖这些导出变量的代码段变成了死代码。这种方法在后续的死代码消除（DCE）最小化过程中得到了进一步的加强。

Webpack 通过 `optimization.usedExports` 配置项来启用 usedExports 优化。考虑以下示例：

```javascript 
// index.js
import { a } from './lib';
console.log({a});
// lib.js
export const a = 1;
export const b = 2;
```


未启用树摇（`tree shaking`）时，你可以注意到输出结果中包含了关于变量 b 的信息：

```javascript 
var __webpack_modules__ = [ , (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
        a: () => a,
        b: () => b  // b is not removed
    });
    const a = 1;
    const b = 2;
} ];
```


进一步通过启用 `optimization.usedExports` 来实现压缩，由于 `const b = 2` 是死代码，它被移除了：

```javascript 
(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.d(__webpack_exports__, {
        a: () => a
    });
    const a = 1;
}, __webpack_module_cache__ = {};
```


**然而，判断 b 是否被使用并非总是简单明了。考虑以下例子**：

```javascript 
// index.js
import { a,b } from './lib';
console.log({a});
function test(){
  console.log(b);
}
function test1(){
  test();
}

// lib.js
export const a = 1;
export const b = 2;
```


在这个示例中，`b` 被函数 `test` 所使用，因此我们看到 `b` 没有被直接从输出中删除。这是因为 `Webpack` 默认**不进行深度静态分析**。虽然函数 test 没有被使用，这暗示了 `b` 也未被使用，但 `Webpack` 并未能识别出这种关联：

```javascript 
(__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
    __webpack_require__.d(__webpack_exports__, {
        a: () => a,
        b: () => b
    });
    const a = 1, b = 2;
}, __webpack_module_cache__ = {}
```


幸运的是，`Webpack` 提供**了另一种配置项 ****`optimization.innerGraph`****，这使得可以对代码进行更深入的静态分析。通过这种方式，可以确定 b 实际上未被使用，从而成功地移除了 b 的导出属性：**

```javascript 
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ a)
/* harmony export */ });
/* unused harmony export b */
const a = 1;
const b = 2;

/***/ })

```


死代码消除（DCE）也对 usedExports 优化有影响。考虑以下示例：

```javascript 
// index.js
import { a, b, c } from './lib';
console.log({a});
if(false){
  console.log(b);
}
function get_one(){
  return 1;
}
let res = get_one() + get_one();

if(res != 2){
  console.log(c);
}
// lib.js
export const a = 1;
export const b = 2;
export const c = 3;
```


依靠 `Webpack` 内置的 `ConstPlugin` 来执行死代码消除，**它成功地移除了变量 b，但由于 ConstPlugin 的处理能力有限，它未能移除变量 c。**

```javascript 
((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ a),
/* harmony export */   c: () => (/* binding */ c)
/* harmony export */ });
/* unused harmony export b */
const a = 1;
const b = 2;
const c = 3;

/***/ })
```


[Tree Shaking 问题](<../Tree Shaking 问题/index.md> " Tree Shaking 问题")
