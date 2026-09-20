# 受Flux启发的实践

## 目录

- [推荐的模式](#推荐的模式)
  - [单一存储](#单一存储)
  - [使用 set / setState 更新存储](#使用-set--setState-更新存储)
  - [将存储操作放在一起](#将存储操作放在一起)
- [类 Redux 模式](#类-Redux-模式)

尽管 `Zustand` 是一个无偏见的库，但我们确实推荐一些模式。 这些模式受到最初在 [Flux](https://github.com/facebookarchive/flux "Flux") 中发现的实践的启发， 以及最近的 [Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles "Redux")， 所以如果你来自其他库，你应该感到非常熟悉。

然而，`Zustand` 在一些基本方式上确实有所不同， 所以一些术语可能不会完全对应其他库。

## 推荐的模式

### 单一存储

你的应用**全局状态应该位于单一**的 `Zustand` 存储中。

如果你有一个大型应用，`Zustand` 支持[将存储分割成切片](https://ouweiya.github.io/zustand-zh/docs/guides/slices-pattern "将存储分割成切片")。

### 使用 `set` / `setState` 更新存储

始终使用 `set`（或 `setState`）来更新你的存储。 `set`（和 `setState`）确保所描述的更新被正确地合并，监听器被适当地通知。

### 将存储操作放在一起

在 Zustand 中，状态可以在没有 Flux 库中找到的分派操作和 reducer 的情况下更新。 这些存储操作可以直接添加到存储中，如下所示。

可选地，通过使用 `setState`，它们可以[位于存储外部](https://ouweiya.github.io/zustand-zh/docs/guides/practice-with-no-store-actions "位于存储外部")

```javascript 
const useBoundStore = create((set) => ({
    storeSliceA: ...,
    storeSliceB: ...,
    storeSliceC: ...,
    updateX: () => set(...),
    updateY: () => set(...),
}))
```


## 类 Redux 模式

如果你不能没有类 Redux 的 reducer，你可以在存储的根级别定义一个 `dispatch` 函数：

```javascript 
const types = { increase: 'INCREASE', decrease: 'DECREASE' }

const reducer = (state, { type, by = 1 }) => {
    switch (type) {
        case types.increase:
            return { grumpiness: state.grumpiness + by }
        case types.decrease:
            return { grumpiness: state.grumpiness - by }
    }
}

const useGrumpyStore = create((set) => ({
    grumpiness: 0,
    dispatch: (args) => set((state) => reducer(state, args)),
}))

const dispatch = useGrumpyStore((state) => state.dispatch)
dispatch({ type: types.increase, by: 2 })
```


你也可以使用我们的 `redux-middleware`。它连接你的主 reducer，设置初始状态，并将 dispatch 函数添加到状态本身和 vanilla api。

```javascript 
import { redux } from 'zustand/middleware'

const useReduxStore = create(redux(reducer, initialState))
```


更新存储的另一种方式可能是通过包装状态函数的函数。这些也可以处理操作的副作用。例如，使用 HTTP 调用。要以非反应方式使用 `Zustand`，请参阅自述文件。
