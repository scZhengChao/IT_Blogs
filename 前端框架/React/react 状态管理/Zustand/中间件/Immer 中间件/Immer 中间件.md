# Immer 中间件

## 目录

- [安装](#安装)
- [使用](#使用)
- [注意事项](#注意事项)
  - [我的订阅没有被调用](#我的订阅没有被调用)
- [immer规则](#immer规则)

[Immer](https://github.com/immerjs/immer "Immer") 中间件使您能够以更方便的方式使用不可变状态。 此外，使用 Immer，您可以简化在 Zustand 中处理不可变数据结构的方式。

## 安装

为了在 Zustand 中使用 Immer 中间件，您需要将 Immer 安装为直接依赖。

```javascript 
npm install immer
```


## 使用

（注意类型参数后的额外括号，如[Typescript 指南](https://ouweiya.github.io/zustand-zh/docs/guides/typescript "Typescript 指南")中所述）。

更新简单状态

```javascript 
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

export const useCountStore = create<State & Actions>()(
  immer((set) => ({
    count: 0,
    increment: (qty: number) =>
      set((state) => {
        state.count += qty
      }),
    decrement: (qty: number) =>
      set((state) => {
        state.count -= qty
      }),
  })),
)
```


更新复杂状态

```javascript 
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Todo {
  id: string
  title: string
  done: boolean
}

type State = {
  todos: Record<string, Todo>
}

type Actions = {
  toggleTodo: (todoId: string) => void
}

export const useTodoStore = create<State & Actions>()(
  immer((set) => ({
    todos: {
      '82471c5f-4207-4b1d-abcb-b98547e01a3e': {
        id: '82471c5f-4207-4b1d-abcb-b98547e01a3e',
        title: 'Learn Zustand',
        done: false,
      },
      '354ee16c-bfdd-44d3-afa9-e93679bda367': {
        id: '354ee16c-bfdd-44d3-afa9-e93679bda367',
        title: 'Learn Jotai',
        done: false,
      },
      '771c85c5-46ea-4a11-8fed-36cc2c7be344': {
        id: '771c85c5-46ea-4a11-8fed-36cc2c7be344',
        title: 'Learn Valtio',
        done: false,
      },
      '363a4bac-083f-47f7-a0a2-aeeee153a99c': {
        id: '363a4bac-083f-47f7-a0a2-aeeee153a99c',
        title: 'Learn Signals',
        done: false,
      },
    },
    toggleTodo: (todoId: string) =>
      set((state) => {
        state.todos[todoId].done = !state.todos[todoId].done
      }),
  })),
)
```


## 注意事项

在这个部分，你会发现一些在使用 `Zustand` 和 `Immer` 时需要记住的事情。

### 我的订阅没有被调用

如果你正在使用 `Immer`，确保你实际上遵循了\*\* **[**Immer 的规则**](https://immerjs.github.io/immer/pitfalls "Immer 的规则")**。\*\*

例如，你必须为 [类对象](https://immerjs.github.io/immer/complex-objects "类对象") 添加 `[immerable] = true` 才能使其工作。如果你不这样做，Immer 仍然会改变对象，但不是作为一个代理，所以它也会更新当前的状态。Zustand 检查状态是否真的发生了改变，所以由于当前状态和下一个状态是相等的（如果你没有正确操作），Zustand 将跳过调用订阅。

# immer规则

[ 陷阱 | Immer 性能提示 https://immerjs.github.io/immer/zh-CN/pitfalls/](https://immerjs.github.io/immer/zh-CN/pitfalls/ " 陷阱 | Immer 性能提示 https://immerjs.github.io/immer/zh-CN/pitfalls/")
