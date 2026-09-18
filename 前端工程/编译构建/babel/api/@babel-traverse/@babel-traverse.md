# @babel/traverse

**parse 出的 AST 由 @babel/traverse 来遍历和修改，** babel traverse 包提供了 traverse 方法

```javascript 
require("@babel/traverse").default(parent, opts)
```


常用的就前面两个参数，**parent 指定要遍历的 AST 节点，opts 指定 visitor 函数**。babel 会在遍历 parent 对应的 AST 时调用相应的 visitor 函数。

`visitor` 是**指定对什么 ****`AST`**** 做什么处理的函数**，`babel` 会在遍历到对应的 `AST` 时回调它们。而且可以指定刚开始遍历（`enter`）和遍历结束后（`exit`）两个阶段的回调函数，

```javascript 
require("@babel/traverse").default(ast, {
  /** - 1.进入节点时调用（一般不用） */
  enter(path) {
    console.log('__enter__');
  },
  /** - 2.离开节点时调用（一般不用） */
  exit(path) {
    console.log('__exit__');
  },
  /** - 3.当遍历到指定节点类型时调用，比如这里是：FunctionDeclaration（函数声明）（建议方案） */
  FunctionDeclaration(path) {
    console.log('__FunctionDeclaration__');
  },
  /** - 4.你可以单独监听某个节点类型的进入或者离开 */
  FunctionDeclaration: {
    enter(path) {
      console.log('__FunctionDeclaration_enter_');
    },
    exit(path) {
      console.log('__FunctionDeclaration_exit_');
    },
  },
  /** - 5.当遍历到 FunctionDeclaration|ReturnStatement 节点时调用（这种方式会覆盖前面几种方式） */
  ['FunctionDeclaration|ReturnStatement'](path) {
    console.log('__FunctionDeclaration|ReturnStatement');
  },
});
```


**具体的类型有哪些可以在**[**babel-types 的类型定义**](https://link.juejin.cn/?target=https://github.com/babel/babel/blob/main/packages/babel-types/src/ast-types/generated/index.ts#L2059 "babel-types 的类型定义")**中查。**

[path](IT/前端工程/编译构建/babel/api/@babel-traverse/path/path.md "path")

[state](state.md "state")
