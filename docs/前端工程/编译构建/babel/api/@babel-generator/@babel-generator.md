# @babel/generator

当我们对AST进行遍历操作之后，就可以**通过 @babel/generator 将 AST 生成目标代码**了，具体使用如下：

```typescript 
const generator = require('@babel/generator');

// ...

// → 将AST输出为目标代码
const code = generator.default(ast).code;
console.log(code);

```
