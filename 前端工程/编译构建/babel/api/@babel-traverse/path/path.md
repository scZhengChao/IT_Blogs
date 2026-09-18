# path

每个 visitor 都有 path 和 state 的参数，path 记录了 AST 在遍历过程中的路径。

我们可以通过 path 对象表示节点之间的关联关系。通过这个对象提供的属性方法，我们可以操作 AST 语法树。

```javascript 
// 属性
path.state // Babel 插件信息，可通过 state.opts 获取传入的 Options；
path.node // 当前遍历到的 node 节点，可通过它访问节点上的属性，对于 Ast 节点；
path.parent // 父级 node，无法进行替换；
path.parentPath // 父级 path，可进行替换；
path.scope // 作用域相关，可用于变量重命名，变量绑定关系检测等；
path.key // 获取路径所在容器的索引
path.listKey // 获取容器的 key
path.container // 获取路径的容器（包含所有同级节点的数组）
path.inList // 判断路径是否有同级节点

// 方法
path.toString() // 当前路径所对应的源代码；
path.isXXX // XXX为节点类型，可以判断是否符合节点类型。比如我们需要判断路径是否为 StringLiteral 类型 → path.isStringLiteral；
path.get(key) // 获取子节点 path，例如：path.get('body.0') 可以理解为 path.node.body[0]这样的形式，让我们更加方便的拿到子路径，但是注意仅路径可以这样操作，访问属性是不允许的！
path.set(key) // 设置子节点 path;
path.remove() // 删除 path;
path.replaceWith() // 用AST节点替换该节点，如：path.replaceWith({ type: 'NumericLiteral', value: 3 })，创建节点可以使用 @babel/types，如果是多路径则使用 relaceWithMultiple([AST...]);
path.replaceWidthSourceString() // 用字符串替换源码
path.find((path) => path.isObjectExpression()) // 向下搜寻节点
path.findParent() // 向父节点搜寻节点
path.getSibling()、path.getNextSibling()、path.getPrevSibling() // 获取兄弟路径；
path.getFunctionParent() // 向上获取最近的 Function 类型节点；
path.getStatementParent() // 向上获取最近的 Statement 类型节点；
path.insertBefore() // 在之前插入兄弟节点
path.insertAfter() // 在之后插入兄弟节点
path.pushContainer() // 将AST push到节点属性里面
path.traverse() // 递归的形式消除全局状态（官网 >> 例子已经不错了）
path.stop() // 停止遍历
path.skip() // 不往下遍历，跳过该节点

```
