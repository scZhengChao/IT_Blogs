# &#x20;Demo 演示

## 目录

- [控制引入 babel-runtime](#控制引入-babel-runtime)
- [控制 corejs 配置](#控制-corejs-配置)

## 控制引入 babel-runtime

转译代码：

```typescript 
class Animal {}

```


接下来我们通过修改是否启用 `babel-plugin-transform-runtime` 控制 `babel-runtime` 的引入：

```javascript 
// 不引入 babel-runtime
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Animal = /*#__PURE__*/_createClass(function Animal() {
  _classCallCheck(this, Animal);
});

// 引入 babel-runtime，corejs:false
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/.pnpm/@babel+runtime@7.23.9/node_modules/@babel/runtime/helpers/esm/classCallCheck.js");

var Animal = /*#__PURE__*/(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(function Animal() {
  (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Animal);
});

```


可以看到 `babel-runtime` 是通过**引入模块实现 **class 的，避免了**多文件时定义了多个工具函数**，**有效减少了打包体积。**

## 控制 corejs 配置

转译代码：

```javascript 
new Promise();
string.trimStart()

```


为体现 corejs 的差异，我们使用两种实例方法 `Promise`、`String.trimStart()` 进行对比。

```javascript 
// corejs:false
new Promise();
string.trimStart();

// corejs:2
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/.pnpm/@babel+runtime-corejs2@7.23.9/node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);

new (_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default())();
string.trimStart();

// corejs:3
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/promise */ "./node_modules/.pnpm/@babel+runtime-corejs3@7.23.9/node_modules/@babel/runtime-corejs3/core-js-stable/promise.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim_start__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs3/core-js-stable/instance/trim-start */ "./node_modules/.pnpm/@babel+runtime-corejs3@7.23.9/node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim-start.js");
/* harmony import */ var _babel_runtime_corejs3_core_js_stable_instance_trim_start__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs3_core_js_stable_instance_trim_start__WEBPACK_IMPORTED_MODULE_1__);

new (_babel_runtime_corejs3_core_js_stable_promise__WEBPACK_IMPORTED_MODULE_0___default())();
_babel_runtime_corejs3_core_js_stable_instance_trim_start__WEBPACK_IMPORTED_MODULE_1___default()(string).call(string);

```


依据结果可以看出，`corejs: false` 只对ES语法进行了转换。`corejs：2` 为我们的代码创建了一个沙盒环境，避免了全局空间污染。`corejs: 3` 在 `corejs: 2`的基础上加入了新的 `polyfill` 以处理更多的实例方法。

由此总结，对于 `Babel` < 7.4.0 时，类库/工具项目应选择 `@babel/runtime`，其他项目选择 `@babel/polyfill`，当 `Babel` >= 7.4.0 时，一律使用 `@babel/runtime`。
