# DCE 优化

## 目录

- [假分支](#假分支)
- [未使用的顶层声明](#未使用的顶层声明)

在 Webpack 中，死代码消除 (DCE) 的过程相对直接，**主要涉及两个重要场景：**

### **假分支**

```javascript 
if(false){ 
   false_branch;
} else { 
   true_branch;
}
```


在这种情况下，由于假分支（false\_branch）根本不会被执行，因此可以直接将其删除。这样做主要有两个效果：一是减少最终代码的大小，二是改变变量的使用关系。考虑以下示例：

```javascript 
import { a } from './a';
if(false){
  console.log(a);
}else {
  
}
```


如果不移除假分支，变量 a 会被认为是在使用中。将其删除后，a 就会被标记为未使用，这种变化还会进一步影响对 usedExports 和 sideEffects 的分析。针对这种情况，Webpack 提供了两个进行死代码消除（DCE）的机会：

- 在解析阶段，通过 `ConstPlugin` 执行基本的死代码消除，这有助于尽可能多地了解导入与导出变量的使用情况，从而优化后续的 `sideEffect` 和 `usedExport`。
- 在 `processAssets` 阶段，通过 `Terser` 的 `minify` 实施更复杂的死代码消除，主要目的是减少代码体积。

相比之下，`Terser` 执行的死代码消除更为耗时且复杂，而 `ConstPlugin` 的优化过程则相对简单。例如，`Terser` 能成功移除处理过的假分支，但 `ConstPlugin` 可能做不到这一点。

```javascript 
function get_one(){
  return 1;
}
let res = get_one() + get_one();

if(res != 2){
  console.log(c);
}
```


### **未使用的顶层声明**

在模块中，**若顶层声明未被导出，则可将其移除，因为它不产生额外的副作用**。例如，以下的变量 b 和函数 test（假定这是模块而非脚本；脚本会影响全局作用域，因此不能安全移除）可以被安全地删除。Webpack 的 `usedExports` 优化正是利用了这一点来简化其实现过程。

```javascript 
// index.js
export const a = 10;
const b = 20;
function test(){

}
```
