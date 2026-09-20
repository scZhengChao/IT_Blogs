# 未使用的导出变量

这个条件表面看来简单，但实际上遇到的挑战与 usedExports 优化中遇到的挑战相似，**这可能需要进行深入的分析才能确定一个变量的使用情况。**

考虑以下示例，变量 c 在函数 test 中被使用，这阻止了 `util.js` 的成功移除：

```javascript 
// index.js
import { a } from './lib';
import { c } from './util';
console.log({a});
function test(){
  console.log(c);
}

// lib.js
export const a = 1;
export const b = 2;

// util.js
export const c = 123;
export const d = 456;
```


\*\*当启用 \*\*`optimization.innerGraph` 时，`Webpack` 会进行更深入的分析，确定到函数 test 也未被使用，这也就意味着变量 c 同样未被使用，从而允许正确移除 `util.js`。
