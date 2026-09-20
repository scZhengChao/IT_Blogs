# @babel/parser

babel parse**r 默认只能 parse js 代码**，jsx、flow、typescript 这些非标准的语法的解析需要指定语法插件。

它提供了有两个 api：**parse 和 parseExpression。** 两者都是把源码转成 AST，不过 parse 返回的 AST 根节点是 File（整个 AST），parseExpression 返回的 AST 根节点是是 Expression（表达式的 AST），粒度不同。

```javascript 
function parse(input: string, options?: ParserOptions): File
function parseExpression(input: string, options?: ParserOptions): Expression
```


```javascript 
require('@babel/parser').parse(source, {
  sourceType: 'module',
  plugins: ['jsx', 'flow', 'classProperties', 'decorator', 'decorators-legacy'],
});
```


- plugins： 指定jsx、typescript、flow 等插件来解析对应的语法。
- sourceType： module、script、unambiguous 3个取值，module 是解析 es module 语法。通常一般默认unambiguous，可以根据内容是否有 import 和 export 来自动设置 module 还是 script。
