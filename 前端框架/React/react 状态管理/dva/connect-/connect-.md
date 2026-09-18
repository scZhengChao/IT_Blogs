# connect&#x20;

## 目录

- [二](#二)

connect 是一个函数，绑定 State 到 View。

```typescript 
import { connect } from 'dva';

function mapStateToProps(state) {
  return { todos: state.todos };
}
connect(mapStateToProps)(App);

```


`connect `方法返回的也是一个 `React `组件，通常称为**容器组件**。因为它**是原始 UI 组件的容器**，即在外面包了一层 State。

connect 方法传入的第一个参数是 `mapStateToProps `函数，`mapStateToProps `函数会**返回一个对象**，**用于建立 State 到 Props 的映射关系。**

# 二

**connect**简介：**connect**是**react-redux**两个api中其中之一，在使用**react-redux**时起到了为**redux**中常用的功能实现了和**react**连接的建立函数入口，以及需要传入的参数：

```typescript 
export default function connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) {}

```


**mapStateToProps:**   传入所有`state`，返回指定的`state`数据。

```typescript 
function mapStateToProps(state) {
  return { todos: state.todos }
}

```


**mapDispatchToProps：** 传入`dispatch`，返回使用绑定的`action`方法。

```typescript 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
}

```


**mergeProps：**

`mergeProps`如果不指定，则默认返回 `Object.assign({}, ownProps, stateProps, dispatchProps)`，顾名思义，`mergeProps`是合并的意思，将`state`合并后传递给组件

```typescript 
function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    todos: stateProps.todos[ownProps.userId],
    addTodo: (text) => dispatchProps.addTodo(ownProps.userId, text)
  })
}

```
