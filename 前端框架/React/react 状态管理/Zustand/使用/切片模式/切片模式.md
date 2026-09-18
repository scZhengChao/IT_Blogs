# 切片模式

## 目录

- [将存储切分为更小的存储](#将存储切分为更小的存储)
  - [在 React 组件中的使用](#在-React-组件中的使用)
  - [更新多个存储](#更新多个存储)
- [添加中间件](#添加中间件)

## 将存储切分为更小的存储

随着你添加更多的功能，**你的存储可能会变得越来越大，越来越难以维护。**

你可以将你的**主存储切分为更小的个体存储**，以实现模块化。在 Zustand 中实现这一点非常简单！

第一个个体存储：

```javascript 
export const createFishSlice = (set) => ({
    fishes: 0,
    addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
})
```


另一个个体存储：

```javascript 
export const createBearSlice = (set) => ({
    bears: 0,
    addBear: () => set((state) => ({ bears: state.bears + 1 })),
    eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
})
```


你现在可以将这两个存储合并为**一个有边界的存储**：

```javascript 
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'

export const useBoundStore = create((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
}))
```


### 在 React 组件中的使用

```javascript 
import { useBoundStore } from './stores/useBoundStore'

function App() {
    const bears = useBoundStore((state) => state.bears)
    const fishes = useBoundStore((state) => state.fishes)
    const addBear = useBoundStore((state) => state.addBear)
    return (
        <div>
            <h2>熊的数量：{bears}</h2>
            <h2>鱼的数量：{fishes}</h2>
            <button onClick={() => addBear()}>添加一只熊</button>
        </div>
    )
}

export default App
```


### 更新多个存储

你可以在一个函数中同时更新多个存储。

```javascript 
export const createBearFishSlice = (set, get) => ({
    addBearAndFish: () => {
        get().addBear()
        get().addFish()
    },
})
```


将所有的存储组合在一起的方式与之前相同。

```javascript 
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'
import { createBearFishSlice } from './createBearFishSlice'

export const useBoundStore = create((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createBearFishSlice(...a),
}))
```


## 添加中间件

向组合存储添加中间件与向其他普通存储添加中间件相同。

向我们的 `useBoundStore` 添加 `persist` 中间件：

```javascript 
import { create } from 'zustand'
import { createBearSlice } from './bearSlice'
import { createFishSlice } from './fishSlice'
import { persist } from 'zustand/middleware'

export const useBoundStore = create(
    persist(
        (...a) => ({
            ...createBearSlice(...a),
            ...createFishSlice(...a),
        }),
        { name: 'bound-store' },
    ),
)
```


请记住 **，你应该只在组合存储中应用中间件。在个体切片内部应用它们可能会导致意外的问题。**
