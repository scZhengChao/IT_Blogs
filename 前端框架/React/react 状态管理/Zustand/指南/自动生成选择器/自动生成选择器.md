# 自动生成选择器

## 目录

- [创建以下函数：createSelectors](#创建以下函数createSelectors)
- [Vanilla Store](#Vanilla-Store)
- [实时演示](#实时演示)
- [第三方库](#第三方库)

我们建议在**使用存储的属性或操作时使用选择器**。你可以像这样从存储中获取值：

```javascript 
const bears = useBearStore((state) => state.bears)
```


然而，编写这些可能会很繁琐。如果你也有这种感觉，你可以**自动生成你的选择器。**

## 创建以下函数：`createSelectors`

```javascript 
import { StoreApi, UseBoundStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (let k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () => store((s) => s[k as keyof typeof s])
  }

  return store
}
```


如果你有一个像这样的存储：

```javascript 
interface BearState {
  bears: number
  increase: (by: number) => void
  increment: () => void
}

const useBearStoreBase = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}))
```


将该函数应用到你的存储：

```javascript 
const useBearStore = createSelectors(useBearStoreBase)
```


现在选择器已经自动生成，你可以直接访问它们：

```javascript 
// 获取属性
const bears = useBearStore.use.bears() 

 // 获取操作
const increment = useBearStore.use.increment()
```


## Vanilla Store

如果你正在使用一个普通的存储，使用以下的 `createSelectors` 函数：

```javascript 
import { StoreApi, useStore } from 'zustand'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never

const createSelectors = <S extends StoreApi<object>>(_store: S) => {
  const store = _store as WithSelectors<typeof _store>
  store.use = {}
  for (const k of Object.keys(store.getState())) {
    ;(store.use as any)[k] = () =>
      useStore(_store, (s) => s[k as keyof typeof s])
  }

  return store
}
```


使用方式与 React 存储相同。如果你有一个像这样的存储：

```javascript 
import { createStore } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
  increment: () => void
}

const store = createStore<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  increment: () => set((state) => ({ bears: state.bears + 1 })),
}))
```


将该函数应用到你的存储：

```javascript 
const useBearStore = createSelectors(store)
```


现在选择器已经自动生成，你可以直接访问它们：

```javascript 
// 获取属性
const bears = useBearStore.use.bears()

// 获取操作
const increment = useBearStore.use.increment()
```


## 实时演示

有关此的工作示例，请参见 [Code Sandbox](https://codesandbox.io/s/zustand-auto-generate-selectors-forked-rl8v5e?file=/src/selectors.ts "Code Sandbox")。

## 第三方库

- [auto-zustand-selectors-hook](https://github.com/Albert-Gao/auto-zustand-selectors-hook "auto-zustand-selectors-hook")
- [react-hooks-global-state](https://github.com/dai-shi/react-hooks-global-state "react-hooks-global-state")
- [zustood](https://github.com/udecode/zustood "zustood")
- [@davstack/store](https://www.npmjs.com/package/@davstack/store "@davstack/store")
