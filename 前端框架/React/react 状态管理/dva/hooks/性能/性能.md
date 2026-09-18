# 性能

如前所述，默认情况下，在 dispatch 一个 action 后，会运行 selector 函数，此时 `useSelector()` **会对所选值进行引用全等比较，只有在所选值发生变化时才会导致组件重新渲染**。然而，与 `connect()` 不同的是，`useSelector()` 会在组件**父级重新渲染时导致自身重新渲染，即使该组件的 props 没有改变。**

如果需要进一步优化性能，你可以考虑用 `React.memo()` 来包裹你的函数组件。

```javascript 
const CounterComponent = ({ name }) => {
  const counter = useSelector((state) => state.counter)
  return (
    <div>
      {name}: {counter}
    </div>
  )
}

export const MemoizedCounterComponent = React.memo(CounterComponent)
```
