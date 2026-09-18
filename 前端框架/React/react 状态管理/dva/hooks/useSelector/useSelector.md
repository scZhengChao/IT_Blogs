# useSelector

## 目录

- [全等比较和更新](#全等比较和更新)
- [useSelector 示例](#useSelector-示例)
  - [使用记忆化的 selectors](#使用记忆化的-selectors)

```javascript 
const result: any = useSelector(selector: Function, equalityFn?: Function)
```


selector 在概念上大约等同于 [mapStateToProps](https://cn.react-redux.js.org/using-react-redux/connect-mapstate "mapStateToProps")[ argument to ](https://cn.react-redux.js.org/using-react-redux/connect-mapstate " argument to ")[connect](https://cn.react-redux.js.org/using-react-redux/connect-mapstate "connect")。selector 将以整个 Redux store state 作为唯一的参数被调用。每当函数组件渲染时，selector 就会被运行（除非在组件的前一次渲染后引用没有改变，这样 hooks 就会返回缓存的结果，而不是重新运行 selector）。`useSelector()` 也会订阅 Redux store，每当有 action 被 dispatched 时就会运行 selector。

然而，传递给 `useSelector()` 和 `mapState` 函数的 selector 之间有一些区别。

- selector 返回的结果可以是任何值，而不仅仅是一个对象。selector 的返回值将被作为 `useSelector()` hook 的返回值被使用。
- 当 dispatch 一个 action 时，`useSelector()` 将对 selector 的前一个结果值和当前的结果值做一个引用比较。如果它们不同，该组件将被强制重新渲染。如果它们相同，组件将不会重新渲染。
- selector 函数 *不接收* `ownProps` 参数。然而，可以通过闭包（见下面的例子），或者通过使用 curried selector 来使用 props。
- 在使用缓存化的 selector 时必须格外小心（详见下面的例子）。
- `useSelector()` 默认使用严格的 `===` 引用全等检查，而不是浅层全等比较（详见下节）。

> 说明
> 在 selector 中使用 props 会导致许多潜在的边缘 case，这可能会造成问题。请参阅本页面的 [使用注意事项](https://cn.react-redux.js.org/api/hooks#usage-warnings "使用注意事项") 部分以了解更多细节。

你可以在**一个函数组件中多次调用** `useSelector()`。每调用一次 `useSelector()` 都会在 Redux store 中创建一个单独的订阅。由于 React Redux v7 中使用的是 React 更新批处理行为，因此 dispatch action 引发的同一组件中多次调用 `useSelector()` 来返回新值的过程只 *会* 重新渲染一次。

### 全等比较和更新

当函数组件渲染时，给定的 selector 函数将被调用，`useSelector()` hook 会返回其结果。(**如果与前一次组件渲染对比，两次是相同的函数引用，hook 不会重新调用 selector，而是会返回缓存的结果**)。

然而，当 dispatch 一个 action 到 Redux store 时，只有 selector 的结果与上一次的结果不同时，`useSelector()` 才会强制重新渲染。默认的对比方式是严格的 `===` 引用比较。这与 `connect()` 不同，后者对 `mapState` 的调用结果进行浅层全等对比，以此决定是否需要重新渲染。这对你应该如何使用 `useSelector()` 有一些影响。

有了 `mapState`，所有单独的字段都在一个组合对象中返回。返回的对象是否是一个新的引用并不重要—— `connect()` 只是比较各个字段。使用 `useSelector()`，默认情况下每次返回一个新的对象 *都会* 强制重新渲染。如果你想从 store 中获取多个值，你可以：

- 多次调用 `useSelector()`，每次调用返回一个字段值
- 使用 Reselect 或类似的库来创建一个记忆化的 selector，在一个对象中返回多个值，但是只有当其中一个值发生变化时才返回一个新的对象。
- 使用 React-Redux 的 `shallowEqual` 函数作为 `useSelector()` 的 `equalityFn` 参数，比如：

```javascript 
import { shallowEqual, useSelector } from 'react-redux'

// 随后
const selectedData = useSelector(selectorReturningObject, shallowEqual)
```


可选的比较函数也可以使用类似 Lodash 的 `_.isEqual()` 或 `Immutable.js` 的比较功能。

### `useSelector` 示例

基本用法：

```javascript 
import React from 'react'
import { useSelector } from 'react-redux'

export const CounterComponent = () => {
  const counter = useSelector((state) => state.counter)
  return <div>{counter}</div>
}
```


通过闭包的方式使用 props 来确定提取的内容：

```javascript 
import React from 'react'
import { useSelector } from 'react-redux'

export const TodoListItem = (props) => {
  const todo = useSelector((state) => state.todos[props.id])
  return <div>{todo.text}</div>
}
```


#### 使用记忆化的 selectors

如上所示，当使用 `useSelector` 与内联 selector 时，每当组件被渲染时，就会创建一个新的 selector 实例。只要 selector 不维护任何 state，这就有效。然而，记忆化的 selector（例如通过 `reselect` 的 `createSelector` 创建）确实有内部 state，因此在使用它们时必须小心。你可以在下面找到记忆化 selector 的典型使用场景。

**当 selector 只依赖于 state 时，只需确保它在组件之外被声明，这样每次渲染都会使用同一个 selector 实例。**

```javascript 
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectNumCompletedTodos = createSelector(
  (state) => state.todos,
  (todos) => todos.filter((todo) => todo.completed).length
)

export const CompletedTodosCounter = () => {
  const numCompletedTodos = useSelector(selectNumCompletedTodos)
  return <div>{numCompletedTodos}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of completed todos:</span>
      <CompletedTodosCounter />
    </>
  )
}
```


如果 selector 依赖于组件的 props，情况也是如此，但**只会在单个组件的单个实例中使用：**

```javascript 
import React from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const selectCompletedTodosCount = createSelector(
  (state) => state.todos,
  (_, completed) => completed,
  (todos, completed) =>
    todos.filter((todo) => todo.completed === completed).length
)

export const CompletedTodosCount = ({ completed }) => {
  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
    </>
  )
}
```


但是，当 `selector` 用于多个组件实例并依赖于组件的 `props` 时，你需要**确保每个组件实例都有自己的 ****`selector`**** 实例**（请参阅[此处](https://github.com/reduxjs/reselect#q-can-i-share-a-selector-across-multiple-component-instances "此处")以更全面地了解为什么有必要这样做）：

```javascript 
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from 'reselect'

const makeSelectCompletedTodosCount = () =>
  createSelector(
    (state) => state.todos,
    (_, completed) => completed,
    (todos, completed) =>
      todos.filter((todo) => todo.completed === completed).length
  )

export const CompletedTodosCount = ({ completed }) => {
  const selectCompletedTodosCount = useMemo(makeSelectCompletedTodosCount, [])

  const matchingCount = useSelector((state) =>
    selectCompletedTodosCount(state, completed)
  )

  return <div>{matchingCount}</div>
}

export const App = () => {
  return (
    <>
      <span>Number of done todos:</span>
      <CompletedTodosCount completed={true} />
      <span>Number of unfinished todos:</span>
      <CompletedTodosCount completed={false} />
    </>
  )
}
```
