# useStoreWithEqualityFn

## 目录

- [签名](#签名)
- [参考](#参考)
  - [useStoreWithEqualityFn(store, selectorFn, equalityFn)](#useStoreWithEqualityFnstore-selectorFn-equalityFn)
    - [参数](#参数)
    - [返回值](#返回值)
- [用法](#用法)
  - [在 React 中使用全局 vanilla store](#在-React-中使用全局-vanilla-store)

`useStoreWithEqualityFn`是一个 React Hook，它允许你在 React 中使用 vanilla store，就像`useStore`一样。然而，它提供了一种**定义自定义相等性检查的方法**。这允许**对组件重新渲染进行更细粒度的控制，从而提高性能和响应速度。**

```typescript 
const someState = useStoreWithEqualityFn(store, selectorFn, equalityFn)
```


### 签名

```typescript 
useStoreWithEqualityFn<T, U = T>(store: StoreApi<T>, selectorFn: (state: T) => U, equalityFn?: (a: T, b: T) => boolean): U
```


## 参考

### `useStoreWithEqualityFn(store, selectorFn, equalityFn)`

#### 参数

- `storeApi`: 允许你访问 store API 实用程序的实例。
- `selectorFn`: 一个函数，允许你返回基于当前状态的数据。
- `equalityFn`: 一个函数，允许你跳过重新渲染。

#### 返回值

`useStoreWithEqualityFn`返回基于当前状态的任何数据，具体取决于选择器函数，并允许你使用相等性函数跳过重新渲染。它应该接受一个 store、一个选择器函数和一个相等性函数作为参数。

## 用法

### 在 React 中使用全局 vanilla store

首先，让我们设置一个 store 来保存屏幕上点的位置。我们将定义 store 来管理`x`和`y`坐标，并提供一个动作来更新这些坐标。

```typescript 
import { createStore, useStore } from 'zustand'

type PositionStoreState = { position: { x: number; y: number } }

type PositionStoreActions = {
  setPosition: (nextPosition: PositionStoreState['position']) => void
}

type PositionStore = PositionStoreState & PositionStoreActions

const positionStore = createStore<PositionStore>()((set) => ({
  position: { x: 0, y: 0 },
  setPosition: (position) => set({ position }),
}))
```


接下来，我们将创建一个`MovingDot`组件，该组件渲染一个表示点的 div。该组件将使用 store 来跟踪和更新点的位置。

```javascript 
function MovingDot() {
  const position = useStoreWithEqualityFn(
    positionStore,
    (state) => state.position,
    shallow,
  )
  const setPosition = useStoreWithEqualityFn(
    positionStore,
    (state) => state.setPosition,
    shallow,
  )

  return (
    <div
      onPointerMove={(e) => {
        setPosition({
          x: e.clientX,
          y: e.clientY,
        })
      }}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: `translate(${position.x}px, ${position.y}px)`,
          left: -10,
          top: -10,
          width: 20,
          height: 20,
        }}
      />
    </div>
  )
}
```
