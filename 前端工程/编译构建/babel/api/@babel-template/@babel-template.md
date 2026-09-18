# @babel/template

通过 @babel/ 创建 AST 还是比较麻烦的，要一个个的创建然后组装，如果 AST 节点比较多的话需要写很多代码，这时候就可以使用 **@babel/template 包来批量创建**。 如

```javascript 
const ast = template(code, [opts])(args);
const ast = template.ast(code, [opts]); // 返回的是整个 AST
const ast = template.program(code, [opts]); // 返回的是 Program 根节点。
const ast = template.expression(code, [opts]); // 返回创建的 expression 的 AST。
const ast = template.statements(code, [opts]) // 返回创建的 statems 数组的 AST。
```


模版也支持占位符，可以在模版里设置一些占位符，调用时再传入这些占位符参数对应的 AST 节点。

```typescript 
const fn = template(`console.log(NAME)`);
// const fn = template(`console.log(%%NAME%%)`);

const ast = fn({
  NAME: t.stringLiteral("guang"),
});
```


加不加 %% 都行，当占位符和其他变量名冲突时可以加上。
