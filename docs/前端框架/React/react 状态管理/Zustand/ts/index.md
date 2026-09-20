# ts

## 目录

- [TypeScript Usage](#TypeScript-Usage)
- [切片 & 中间件](#切片--中间件)

## TypeScript Usage

基本的typescript用法不需要任何特殊的东西，除了写`create<State>()(…)`而不是`create(…)`。

```javascript 
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()(
  devtools(
    persist(
      (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
)

```


# 切片 & 中间件

[ Typescript 指南 TypeScript Guide https://zustand-cn.js.org/guides/typescript](https://zustand-cn.js.org/guides/typescript " Typescript 指南 TypeScript Guide https://zustand-cn.js.org/guides/typescript")

```javascript 
import { create, StateCreator } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { AuthCodeProps } from '@/store/authCode.store';
import useAuthCode from '@/store/authCode.store';
export type AllZustandTypes = AuthCodeProps & sliceA & sliceB
export type ZustandSliceType<T> = StateCreator<
  AllZustandTypes,
  [["zustand/immer", never]],
  [],
  T
  >
const useZustandStore = create<AllZustandTypes>()(immer((...rest)=>({
  ...useAuthCode(...rest)
})))

export default useZustandStore
```


切片

```javascript 
export interface AuthCodeProps {

}
const useAuthCode:ZustandSliceType<AuthCodeProps> = (set, get)=>({

})
export default useAuthCode
```


```javascript 
export interface sliceA {

}
const useSliceA:ZustandSliceType<sliceA> = (set, get)=>({

})
export default useSliceA

```


[zustand-ts](./zustand-ts/index.md "zustand-ts")

[TypeScript 指南](<./TypeScript 指南/index.md> "TypeScript 指南")
