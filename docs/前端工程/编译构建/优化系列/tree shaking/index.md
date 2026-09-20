# tree shaking

[ Tree Shaking | webpack 中文文档 | webpack中文文档 | webpack中文网 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://www.webpackjs.com/guides/tree-shaking/](https://www.webpackjs.com/guides/tree-shaking/ " Tree Shaking | webpack 中文文档 | webpack中文文档 | webpack中文网 webpack 是一个模块打包器。它的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换、打包或包裹任何资源。 https://www.webpackjs.com/guides/tree-shaking/")

Webpack Tree Shaking 的复杂之处在于它需要多种优化技术的共同作用。Webpack 对 “Tree Shaking” 这一术语的使用并不严格，通常泛指用于消除无用代码的优化。

Tree Shaking 的定义如下：

> **“Tree Shaking 是 JavaScript 中用于消除死代码的一个常用术语。** 它基于 ES2015 模块语法的静态结构，即 import 和 export。 这个概念及其名称由 ES2015 模块打包工具 rollup 推广。 ”

在某些情境下，像 usedExports 这样的优化也被认为是 **tree shaking 和 sideEffects**\[2] 的一部分：

> “sideEffects 和 usedExports（通常更多地被称作 tree shaking）是两种不同的优化策略。 ”

为了避免对 Tree Shaking 的理解产生任何歧义，本文不会将焦点放在 Tree Shaking 本身，而是探讨在 Webpack Tree Shaking 类别下的多种代码优化技术。

Webpack Tree Shaking 主要包括三种优化方式：

1. usedExports 优化：移除模块中未使用的导出变量，进一步清除相关的无副作用语句。
2. sideEffects 优化：从模块图中移除没有使用导出变量的模块。
3. DCE (死代码消除) 优化：通常由常规的代码压缩工具来实现，用于移除无用代码，但类似的功能也可通过 Webpack 的 ConstPlugin 等工具实现。

- 在 `lib.js` 中，变量 `b` 没有被使用，并因 usedExports 优化而未出现在最终输出中。
- 在 `util.js` 中，没有使用任何导出变量，因此该模块由于 sideEffects 优化而未在最终输出中出现。
- 在 `bootstrap.js` 中，`console.log` 语句不会执行，因此在最终输出中被移除，这是 DCE 优化的效果。

```javascript 
// index.js
import { a } from './lib';
import { c } from './util';
import './bootstrap';

console.log(a);

// lib.js
export const a = 1;
export const b = 2;

// util.js
export const c = 3;
export const d = 4;

// bootstrap.js
console.log('bootstrap');
if(false){
   console.log('bad');
}else {
   console.log('good');
}
```


这些优化虽然是独立进行的，但它们之间可以产生相互影响。接下来，我们将详细解释这些优化措施及它们之间的关系。

[DCE 优化](<./DCE 优化/index.md> "DCE 优化")

[usedExports 优化](<./usedExports 优化/index.md> "usedExports 优化")

[sideEffects 优化](<./sideEffects 优化/index.md> "sideEffects 优化")

[barrel 模块](<./barrel 模块/index.md> "barrel 模块")

[Tree Shaking 问题](<./Tree Shaking 问题/index.md> " Tree Shaking 问题")

[摇树](./摇树/index.md "摇树")

[QA](IT/前端工程/编译构建/优化系列/tree%20shaking/QA/QA.md "QA")
