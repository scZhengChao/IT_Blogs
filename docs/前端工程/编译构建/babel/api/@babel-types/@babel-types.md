# @babel/types

遍历 AST 的过程中需要**创建一些 AST 和判断 AST 的类型，** 这时候就需要 @babel/types 包。

举例来说，如果要创建IfStatement就可以调用

```typescript 
t.ifStatement(test, consequent, alternate); 
```


而判断节点是否是 IfStatement 就可以调用 isIfStatement 或者 assertIfStatement

```typescript 
t.isIfStatement(node, opts); t.assertIfStatement(node, opts); 

```


opts 可以指定一些属性是什么值，增加更多限制条件，做更精确的判断。

```typescript 
t.isIdentifier(node, { name: "paths" }) 
```


isXxx 和 assertXxx 看起来很像，但是功能不大一样：isXxx 会返回 boolean，而 assertXxx 则会在类型不一致时抛异常
