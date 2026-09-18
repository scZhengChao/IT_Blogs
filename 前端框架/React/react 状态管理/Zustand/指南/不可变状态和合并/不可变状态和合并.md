# 不可变状态和合并

## 目录

- [嵌套对象](#嵌套对象)
- [替换标志](#替换标志)

就像 React 的 `useState`，我们需要以不可变的方式更新状态。

这是一个典型的例子：

```javascript 
import { create } from 'zustand'

const useCountStore = create((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
}))
```


`set` 函数用于在存储中更新状态。 因为状态是不可变的，所以它应该是这样的：

```javascript 
set((state) => ({ ...state, count: state.count + 1 }))
```


然而，**由于这是一个常见的模式，**`set` **实际上会合并状态**， 我们可以跳过 `...state` 部分

```javascript 
set((state) => ({ count: state.count + 1 }))
```


## 嵌套对象

`set` 函数**只在一个级别合并状态**。 如果你有一个嵌套对象，你**需要显式地合并它们。你将使用扩展运算符模式**，如下所示：

```javascript 
import { create } from 'zustand'

const useCountStore = create((set) => ({
    nested: { count: 0 },
    inc: () =>
        set((state) => ({
            nested: { ...state.nested, count: state.nested.count + 1 },
        })),
}))
```


对于复杂的用例，考虑使用一些帮助进行不可变更新的库。 你可以参考[更新嵌套状态对象值](https://ouweiya.github.io/zustand-zh/docs/guides/updating-state#deeply-nested-object "更新嵌套状态对象值")。

## 替换标志

**要禁用合并行为，你可以**为 `set` 指定一个 `replace` **布尔值，如下所示**：

```javascript 
set((state) => newState, true)
```
