# barrel 模块

`SideEffects`优化不只是针对叶节点模块，也**适用于中间节点。** 考虑一个常见的情况，**某个模块仅作为桥梁，重新导出其他模块的内容。** 如果这样的模块（这里称作 mid）自身没有任何导出变量被使用，仅用来重新导出其他模块的内容，那么保留这个重新导出的模块是否真的有必要？

```javascript 
// index.js
import { Button } from './components';
console.log('button:', Button);

// components/index.js
export * from './button';
export * from './tab';
export const mid = 'middle';

// components/button.js
export const Button = () => 'button';
```


测试表明，`Webpack` 会直接删除这种重新导出的模块，在 `index.js` 中直接从 `button.js` 导入内容。

```javascript 
    (() => {
        __webpack_require__.r(__webpack_exports__);
        var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/components/button.js");
        console.log("button:", _components__WEBPACK_IMPORTED_MODULE_0__.Button);
    })();
```


这种行为看起来就像直接修改了源代码的导入路径：

```javascript 
- import { Button } from './components';
+ import { Button } from './components/button';
```


像 `Next.js` 和 `UmiJS`这类框架也提供了类似的优化功能，称为 \*\*“****优化包导入****”**\[4]。他们的方法是在**加载阶段重写这些路径 \*\*。需要注意的是，尽管`Webpack` 的 `barrel` 优化侧重于输出，它在构建阶段仍会构建 `components/index.js` 及其子依赖。然而，`Next.js` 等使用的技术直接修改源代码，意味着 `components/index.js` 不参与构建过程。这对于需要重新导出成百上千个子模块的库来说，可以显著提升优化效果。

我们还测试了 esbuild 和 Rollup 在这方面的表现：

- esbuild：删除 barrel 模块内的副作用。参见**示例**\[5]。
- Rollup：不删除 barrel 模块内的副作用。参见**示例**\[6]
