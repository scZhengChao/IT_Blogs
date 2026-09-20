# &#x20;Tree Shaking 问题

## 目录

- [SideEffect 优化失败](#SideEffect-优化失败)
- [usedExports 优化失败](#usedExports-优化失败)
- [DCE（死代码消除）优化失败](#DCE死代码消除优化失败)

在 `on-call` 时常遇到的一个问题是“为什么我的 `Tree shaking` 失败了？”这类问题的故障排查通常比较复杂。面临这种问题时，首先会考虑的是“哪一种 `Tree shaking` 优化未能成功？”这通常可以归结为三个主要类别之一：

### **SideEffect 优化失败**

当**一个模块的导出变量未被使用仍被包含在最终的包中时，通常表示 ****`SideEffect`**** 优化失败**。

Webpack 有一个鲜为人知的特性，能够通过 **`stats.optimizationBailout`**\[7] 来调试各种优化放弃的情况，包括 `SideEffect` 放弃的原因。考虑以下示例：

```javascript 
// index.js
import { a } from './lib';
import { abc } from './util';
console.log({a});

// lib.js
export const a = 1;
export const b = 2;

// util.js
export function abc(){
  console.log('abc');
}
export function def(){
  console.log('def')
}
console.log('xxx');
```


使用 `optimization.sideEffects=true` 和 `stats.optimizationBailout=true` 编译：

![](./image/image_JQlAQ2an4o.png)

`Webpack` 的日志清晰显示，`util.js` 中第7行的 `console.log('xxx')` 导致 SideEffect 优化失败，使得该模块被包含在最终的包中。

如果我们在 `package.json` 中进一步设置 `sideEffects: false`，这个警告就会消失，因为一旦设置了 `SideEffect` 属性，`Webpack` 将停止副作用分析，而是直接基于 `sideEffects` 字段进行 `SideEffect` 优化。

![](./image/image_eeeUmtGQyz.png)

### **usedExports 优化失败**

**当一个未被使用的导出变量仍然生成导出属性时，表示 usedExports 优化失败。**

![](./image/image_01m7zM7-Yc.png)

在这种情况下，识别这些导出属性的使用位置是必要的：

![](./image/image_T1Gz3i59tW.png)

然而，确定变量的使用原因和具体位置可能并不明确，因为 Webpack 并不提供这方面的详细记录。对于 Webpack 来说，一个可能的改进方向是跟踪并报告在模块树中特定导出变量的使用情况。这将极大地帮助分析和排查 usedExports 优化的问题。

### **DCE（死代码消除）优化失败**

除了 `sideEffect` 和 `usedExports` 优化的问题外，大多数其它 `Tree shaking` 失败可以归因于 `DCE` 的失败。`DCE` 失败的常见原因包括使用了 `eval` 和 `new Function` 这样的动态代码结构，这些**结构在代码压缩过程中可能导致优化失败**。解决这些问题通常与所使用的压缩工具相关，经常需要对输出代码进行二分查找以定位问题。不幸的是，目前的压缩工具很少提供详细的失败原因，这是未来改进的一个重要领域。

总结来说，`Webpack` 中高效的 `Tree Shaking` 需要深入理解各种优化措施及其相互作用。通过正确配置和应用这些优化，开发者可以显著降低他们的包体积，从而提升性能和效率。随着 Webpack 和其他打包工具的不断发展，持续的学习和调整是保持最佳应用性能的关键。
