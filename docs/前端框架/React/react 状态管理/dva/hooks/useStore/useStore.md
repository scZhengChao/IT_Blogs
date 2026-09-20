# useStore

## 目录

- [示例](#示例)

```javascript 
const store = useStore()
```


这个 hook 返回一个 `Redux store `**引用**，该 store 与传递给 `<Provider>` **组件的 ****`store`**** 相同。**

**不应该频繁使用这个 hook**。宁愿将 `useSelector()` 作为主要选择。然而，**对于少量需要访问 store 的场景而言，例如替换** `reducer`，这个 hook 很有用。

#### 示例

```javascript 
import React from 'react'
import { useStore } from 'react-redux'

export const CounterComponent = ({ value }) => {
  const store = useStore()

  // 仅仅是示例！不要在实际的应用中这么做。
  // 当 store state 变更时，组件不会自动更新
  return <div>{store.getState()}</div>
}
```
