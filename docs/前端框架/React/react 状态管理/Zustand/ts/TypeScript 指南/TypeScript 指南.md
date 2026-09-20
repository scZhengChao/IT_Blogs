# TypeScript 指南

## 目录

- [基本用法](#基本用法)

## 基本用法

使用 TypeScript 的区别在于，你需要写 `create<T>()(...)` 而不是 `create(...)`（注意额外的括号 `()` 和类型参数），其中 `T` 是用来注解状态的类型。例如：

```javascript 
import { create } from 'zustand'

interface BearState {
    bears: number
    increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
}))
```


[   https://ouweiya.github.io/zustand-zh/docs/guides/typescript](https://ouweiya.github.io/zustand-zh/docs/guides/typescript "   https://ouweiya.github.io/zustand-zh/docs/guides/typescript")

**逆变和协变**；一直没搞清楚
