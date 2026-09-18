# 高级用法

## 目录

- [获取所有数据](#获取所有数据)
- [选择多个状态片段](#选择多个状态片段)
- [覆盖状态](#覆盖状态)
- [异步操作](#异步操作)
- [在操作（actions）中从状态（state）中读取数据。](#在操作actions中从状态state中读取数据)
- [在组件之外读取/写入状态并对其变化做出反应](#在组件之外读取写入状态并对其变化做出反应)
  - [如果您需要使用选择器（selector）进行订阅](#如果您需要使用选择器selector进行订阅)
- [使用zustand而不使用React](#使用zustand而不使用React)
- [瞬时更新(用于经常发生的状态更改)](#瞬时更新用于经常发生的状态更改)
- [如果您受够了 reducers 和更改嵌套状态，可以使用 Immer！](#如果您受够了-reducers-和更改嵌套状态可以使用-Immer)
- [中间件](#中间件)
- [持续的中间件](#持续的中间件)
- [Immer 中间件](#Immer-中间件)
- [你觉得不能没有类似Redux的reducer和action类型吗？](#你觉得不能没有类似Redux的reducer和action类型吗)
- [Redux devtools](#Redux-devtools)
  - [记录动作](#记录动作)
- [React context](#React-context)

## 获取所有数据

您可以这样做，但请记住这会导致组件在每次状态改变时进行更新！

```javascript 
const state = useBearStore()

```


## 选择多个状态片段

默认情况下，它使用严格相等性`（old === new）`来检测更改，这**对于原子状态的选择是高效的**。

```javascript 
const nuts = useBearStore((state) => state.nuts)
const honey = useBearStore((state) => state.honey)

```


如果您想构建一个**包含多个状态选择的单个对象**，类似于`redux`的`mapStateToProps`，您可以告诉`zustand`您希望使用浅层比较来对该对象进行差异化处理，通过传递浅相等性函数。

要使用**自定义的相等性函数，**您需要使用`createWithEqualityFn`而不是`create`。通常，您会希望将`Object.is`指定为默认相等性函数**的第二个参数，但该函数是可配置的。**

```javascript 
import { createWithEqualityFn } from 'zustand/traditional'
import { shallow } from 'zustand/shallow'

// 使用createWithEqualityFn而不是create
const useBearStore = createWithEqualityFn(
  (set) => ({
    bears: 0,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
  }),
   Object.is // 指定默认的相等性函数，可以是浅层比较
 )

// 使用Object pick，当state.nuts或state.honey发生变化时重新渲染组件。
const { nuts, honey } = useBearStore(
  (state) => ({ nuts: state.nuts, honey: state.honey }),
   shallow
 )

// 使用Array pick，当state.nuts或state.honey发生变化时重新渲染组件。
const [nuts, honey] = useBearStore(
  (state) => [state.nuts, state.honey],
   shallow 
)

// 使用Mapped picks，当state.treats按顺序更改、计数或键时重新渲染组件。
const treats = useBearStore((state) => Object.keys(state.treats), shallow)
```


为了更精细地控制重新渲染，您可以提供任何自定义相等性函数。

```javascript 
const treats = useBearStore(
  (state) => state.treats,
  (oldTreats, newTreats) => compare(oldTreats, newTreats)
)

```


## 覆盖状态

`set`函数有第二个参数，默认为`false`。设置为`false`时，它将替换状态模型而不是合并。请注意不要清除您所依赖的部分，比如操作（actions）。

```javascript 
import omit from 'lodash-es/omit'

const useFishStore = create((set) => ({
  salmon: 1,
  tuna: 2,
  deleteEverything: () => set({}, true), // 清除整个存储空间，包括操作（actions）在内
  deleteTuna: () => set((state) => omit(state, ['tuna']), true),
}))

```


## 异步操作

只需在**准备就绪时**调用`set`，zustand不关心您的操作是异步还是同步的。

```javascript 
const useFishStore = create((set) => ({
  fishies: {},
  fetch: async (pond) => {
    const response = await fetch(pond)
    set({ fishies: await response.json() })
  },
}))

```


## 在操作（actions）中从状态（state）中读取数据。

`set`函数允许使用函数更新`set(state => result)`，但是您仍然可以通过`get`方法在函数外部访问状态（state）。

```javascript 
const useSoundStore = create((set, get) => ({
  sound: 'grunt',
  action: () => {
    const sound = get().sound
    // ...
  },
}))

```


## 在组件之外读取/写入状态并对其变化做出反应

有时候您需要以非响应式的方式访问状态或者对存储进行操作。为了处理这些情况，生成的钩子（hook）附加了一些实用函数到其原型上。

```javascript 
const useDogStore = create(() => ({ paw: true, snout: true, fur: true }))

// 获取非响应式的新状态
const paw = useDogStore.getState().paw
// 监听所有更改，每次更改时都会同步触发
const unsub1 = useDogStore.subscribe(console.log)
// 更新状态，将触发监听器
useDogStore.setState({ paw: false })
// 取消订阅监听器
unsub1()

// 当然，您也可以像往常一样使用钩子
const Component = () => {
  const paw = useDogStore((state) => state.paw)
  ...

```


### 如果您需要使用选择器（selector）进行订阅

如果您需要使用选择器来进行订阅，`subscribeWithSelector`中间件将会很有帮助。

使用这个中间件，`subscribe`方法可以接受额外的签名参数：

```javascript 
subscribe(selector, callback, options?: { equalityFn, fireImmediately }): Unsubscribe

```


```javascript 
import { subscribeWithSelector } from 'zustand/middleware'
const useDogStore = create(
  subscribeWithSelector(() => ({ paw: true, snout: true, fur: true }))
)

// 监听所选项变化，例如当 "paw" 变化时
const unsub2 = useDogStore.subscribe((state) => state.paw, console.log)
// 订阅还提供了之前的值
const unsub3 = useDogStore.subscribe(
  (state) => state.paw,
  (paw, previousPaw) => console.log(paw, previousPaw)
)
// 订阅还支持可选的相等性函数
const unsub4 = useDogStore.subscribe(
  (state) => [state.paw, state.fur],
  console.log,
  { equalityFn: shallow }
)
// 订阅并立即触发
const unsub5 = useDogStore.subscribe((state) => state.paw, console.log, {
  fireImmediately: true,
})

```


## 使用zustand而不使用React

可以导入和使用不依赖于 React 的 Zustand 核心。唯一的区别是 `create` 函数不会返回一个 hook，而是返回 API 实用程序。

```javascript 
import { createStore } from 'zustand/vanilla'

const store = createStore(() => ({ ... }))
const { getState, setState, subscribe } = store

export default store

```


从版本4开始，您可以使用 `useStore` hook 来使用原生的存储库。

```javascript 
import { useStore } from 'zustand'
import { vanillaStore } from './vanillaStore'

const useBoundStore = (selector) => useStore(vanillaStore, selector)

```


:warning:请注意，修改 `set` 或 `get` 的中间件不会应用于 `getState` 和 `setState`。

## 瞬时更新(用于经常发生的状态更改)

`subscribe` 函数允许组**件绑定到状态的一部分，而不会在更改时强制重新渲染**。最好结合使用 `useEffect` 在组件卸载时自动取消订阅。当**您被允许直接修改视图时，这可能会对性能产生重大影响。**

```javascript 
const useScratchStore = create(set => ({ scratches: 0, ... }))

const Component = () => {
  // Fetch initial state
  const scratchRef = useRef(useScratchStore.getState().scratches)
  // Connect to the store on mount, disconnect on unmount, catch state-changes in a reference
  useEffect(() => useScratchStore.subscribe(
    state => (scratchRef.current = state.scratches)
  ), [])
  ...

```


## 如果您受够了 reducers 和更改嵌套状态，可以使用 Immer！

减少嵌套结构是一项繁琐的任务。你尝试过Immer吗？

```javascript 
import { produce } from 'immer'

const useLushStore = create((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  clearForest: () =>
    set(
      produce((state) => {
        state.lush.forest.contains = null
      })
    ),
}))

const clearForest = useLushStore((state) => state.clearForest)
clearForest()

```


或者

```javascript 
import { immer } from 'zustand/middleware/immer'

const useLushStore = create(immer((set) => ({
  lush: { forest: { contains: { a: 'bear' } } },
  clearForest: () =>
    set((state) => {
        state.lush.forest.contains = null
    }),
})))

const clearForest = useLushStore((state) => state.clearForest)
clearForest()
```


## 中间件

你可以根据你的喜好以任何方式对你的 Store 进行函数式组合。

```javascript 

// Log every time state is changed
const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log('  applying', args)
      set(...args)
      console.log('  new state', get())
    },
    get,
    api
  )

const useBeeStore = create(
  log((set) => ({
    bees: false,
    setBees: (input) => set({ bees: input }),
  }))
)


```


## 持续的中间件

你可以使用任何类型的存储来持久化你的 Store 数据。

```javascript 
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useFishStore = create(
  persist(
    (set, get) => ({
      fishes: 0,
      addAFish: () => set({ fishes: get().fishes + 1 }),
    }),
    {
      name: 'food-storage', // unique name
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
)

```


## Immer 中间件

Immer也可以作为中间件使用。

```javascript 
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useBeeStore = create(
  immer((set) => ({
    bees: 0,
    addBees: (by) =>
      set((state) => {
        state.bees += by
      }),
  }))
)

```


## 你觉得不能没有类似Redux的reducer和action类型吗？

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


或者，你可以使用我们的 Redux 中间件。它将主要的 reducer 进行了链接，设置了初始状态，并在状态本身和 Vanilla API 中添加了一个 dispatch 函数。

```javascript 
import { redux } from 'zustand/middleware'

const useGrumpyStore = create(redux(reducer, initialState))

```


## Redux devtools

```javascript 
import { devtools } from 'zustand/middleware'

// 与普通操作存储一起使用，它将以“setState”记录操作。
const usePlainStore = create(devtools(store))
// 与redux存储一起使用，它将记录完整的操作类型
const useReduxStore = create(devtools(redux(reducer, initialState)))

```


一个redux devtools连接用于多个存储

```javascript 
import { devtools } from 'zustand/middleware'

// 与普通操作存储一起使用，它将以“setState”记录操作。
const usePlainStore1 = create(devtools(store, { name, store: storeName1 }))
const usePlainStore2 = create(devtools(store, { name, store: storeName2 }))
// 与redux存储一起使用，它将记录完整的操作类型
const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName3 })
const useReduxStore = create(devtools(redux(reducer, initialState)), , { name, store: storeName4 })

```


在 Redux DevTools 中，给不同的连接名称分配不同的值可以将存储分隔开。这也可以帮助将不同的存储组合成单独的 Redux DevTools 连接。

DevTools 接受存储函数作为第一个参数，可选地，你可以使用第二个参数来为存储命名或配置序列化选项。

为存储命名：`devtools(store, { name: "MyStore" })`，这将在 DevTools 中创建一个名为 "MyStore" 的独立实例。

配置序列化选项：`devtools(store, { serialize: { options: true } })`。

#### 记录动作

DevTools 只会记录来自每个分离的存储的动作，而不是像典型的组合 reducer Redux 存储那样。可以通过以下方式记录每个 set 函数的特定动作类型：

```javascript 
const createBearSlice = (set, get) => ({
  eatFish: () =>
    set(
      (prev) => ({ fishes: prev.fishes > 1 ? prev.fishes - 1 : 0 }),
      false,
      'bear/eatFish'
    ),
})

```


你还可以将动作的类型和载荷一起记录：

```javascript 
const createBearSlice = (set, get) => ({
  addFishes: (count) =>
    set((prev) => ({ fishes: prev.fishes + count }), false, {
      type: 'bear/addFishes',
      count,
    }),
})

```


如果没有提供动作类型，则默认为 "anonymous"。你可以通过提供 `anonymousActionType` 参数来自定义此默认值：

```javascript 
devtools(..., { anonymousActionType: 'unknown', ... })

```


如果您希望禁用devtools(例如在生产环境中)。您可以通过提供`enabled`参数来自定义此设置:

```javascript 
devtools(..., { enabled: false, ... })

```


## React context

使用 `create` 创建的存储不需要上下文提供程序。在某些情况下，你可能希望使用上下文进行依赖注入或者如果你想使用来自组件的 props 初始化存储。因为常规存储是一个 hook，将其作为正常上下文值传递可能会违反 hook 的规则。

自 v4 开始推荐的方法是使用 Vanilla Store。

```javascript 
import { createContext, useContext } from 'react'
import { createStore, useStore } from 'zustand'

const store = createStore(...) // vanilla store without hooks

const StoreContext = createContext()

const App = () => (
  <StoreContext.Provider value={store}>
    ...
  </StoreContext.Provider>
)

const Component = () => {
  const store = useContext(StoreContext)
  const slice = useStore(store, selector)

```
