# useDispatch

## 目录

- [Examples](#Examples)
  - [说明](#说明)

```javascript 
const dispatch = useDispatch()
```


这个 hook 返回一个对 Redux store 中的 `dispatch` 函数的引用。你可以按需使用它来 dispatch action。

#### Examples

```javascript 
import React from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <span>{value}</span>
      <button onClick={() => dispatch({ type: 'increment-counter' })}>
        Increment counter
      </button>
    </div>
  )
}
```


当使用 `dispatch` 向子组件传递回调时，有时你可能想用 [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback "useCallback") 对其进行储存。*如果* 子组件试图使用 `React.memo()` 或类似的方法来优化渲染行为，这可以避免子组件由于回调引用变更而导致的不必要渲染。

```javascript 
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const dispatch = useDispatch()
  const incrementCounter = useCallback(
    () => dispatch({ type: 'increment-counter' }),
    [dispatch]
  )

  return (
    <div>
      <span>{value}</span>
      <MyIncrementButton onIncrement={incrementCounter} />
    </div>
  )
}

export const MyIncrementButton = React.memo(({ onIncrement }) => (
  <button onClick={onIncrement}>Increment counter</button>
))
```


##### 说明

只要传递给 `<Provider>` **的是同一个 store 实例**，`dispatch` **函数引用就是稳定的**。 通常情况下，该 store 实例在应用程序中不会改变。

然而，React hooks 的 lint 规则并不知道 `dispatch` 应该是稳定的，并且会警告说 `dispatch` 变量应该被添加到 `useEffect` 和 `useCallback` 的依赖数组中。最简单的解决方案就是：

```javascript 
export const Todos = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos())
    // 安全地将 dispatch 添加到依赖数组中
  }, [dispatch])
}
```
