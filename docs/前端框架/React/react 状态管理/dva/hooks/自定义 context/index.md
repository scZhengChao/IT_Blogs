# 自定义 context

`<Provider>` 组件允许你通过 `context` prop 指定**一个备用的上下文**。如果你**正在构建一个复杂的**、可复用的组件，并且你不希望 store 与 consumer 应用程序可能使用的任何 Redux store 相冲突，那么这很有用。

要通过各种 hook API 访问备用上下文，请使用 hook creator 函数：

```javascript 
import React from 'react'
import {
  Provider,
  createStoreHook,
  createDispatchHook,
  createSelectorHook,
} from 'react-redux'

const MyContext = React.createContext(null)

// 如果想在其他文件使用自定义 hook，导出这些自定义 hook。
export const useStore = createStoreHook(MyContext)
export const useDispatch = createDispatchHook(MyContext)
export const useSelector = createSelectorHook(MyContext)

const myStore = createStore(rootReducer)

export function MyProvider({ children }) {
  return (
    <Provider context={MyContext} store={myStore}>
      {children}
    </Provider>
  )
}
```
