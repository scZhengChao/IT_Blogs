# immer

## 目录

- [柯里化 producers](#柯里化-producers)
- [useState + Immer](#useState--Immer)
- [current /original](#current-original)
- [Current](#Current)
  - [例子](#例子)

[   https://immerjs.github.io/immer/zh-CN/api](https://immerjs.github.io/immer/zh-CN/api "   https://immerjs.github.io/immer/zh-CN/api")

[   https://immerjs.github.io/immer/zh-CN/example-setstate](https://immerjs.github.io/immer/zh-CN/example-setstate "   https://immerjs.github.io/immer/zh-CN/example-setstate")

[ immer 中文文档:异步 produce / createDraft - 桑鸟网 Immer 可以在需要使用不可变数据结构的任何上下文中使用。例如与 React state、React 或 Redux reducers 或者 configuration management 结合使用。不可变的数据结构允许（高效）的变化检测：如果对对象的引用没有改变，那么对象本身也没有改变。此外，它使克隆对象相对便宜：数据树的未更改部分不需要复制，并且在内存中与相同状态的旧版本共享。 https://books.sangniao.com/manual/447731763/401137218](https://books.sangniao.com/manual/447731763/401137218 " immer 中文文档:异步 produce / createDraft - 桑鸟网 Immer 可以在需要使用不可变数据结构的任何上下文中使用。例如与 React state、React 或 Redux reducers 或者 configuration management 结合使用。不可变的数据结构允许（高效）的变化检测：如果对对象的引用没有改变，那么对象本身也没有改变。此外，它使克隆对象相对便宜：数据树的未更改部分不需要复制，并且在内存中与相同状态的旧版本共享。 https://books.sangniao.com/manual/447731763/401137218")

## 柯里化 producers

将函数作为第一个参数传递给 `produce` 会创建一个函数，该函数尚未将 `produce` 应用于特定 state，而是创建一个函数，该函数将应用于将来传递给它的任何 state。这通常称为柯里化。举个例子：

```javascript 
import produce from "immer"

function toggleTodo(state, id) {
    return produce(state, draft => {
        const todo = draft.find(todo => todo.id === id)
        todo.done = !todo.done
    })
}

const baseState = [
    {
        id: "JavaScript",
        title: "Learn TypeScript",
        done: true
    },
    {
        id: "Immer",
        title: "Try Immer",
        done: false
    }
]

const nextState = toggleTodo(baseState, "Immer")

```


上面的 `toggleTodo` 模式非常典型；传递一个现有的 state 来 `produce`，修改 `draft`

，然后返回结果。由于 `state` 除了将其传递给 `produce` 之外没有其他任何用途，因此可以通过使用 `produce` 的柯里化形式来简化上面的示例，其中您只传递 `produce` recipe 函数，并且 `produce` 将返回一个应用 recipe 到基础状态的新函数。这允许我们缩短上述 `toggleTodo` 定义。

```javascript 
import produce from "immer"

// curried producer:
const toggleTodo = produce((draft, id) => {
    const todo = draft.find(todo => todo.id === id)
    todo.done = !todo.done
})

const baseState = [
    /* as is */
]

const nextState = toggleTodo(baseState, "Immer")
```


请注意，`id` 参数现在已成为 recipe 函数的一部分！这种拥有 curried producers 的模式与 React 中的 `useState` Hook 非常巧妙地结合在一起，我们将在下一页看到。

## useState + Immer

`useState` hook 假定存储在其中的任何 state 都被视为不可变的。使用 Immer 可以大大简化 React 组件状态的深度更新。下面的例子展示了如何使用 `produce` 和 `useState` ，可以在 [CodeSandbox](https://www.sangniao.com/link/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Imh0dHBzOlwvXC9jb2Rlc2FuZGJveC5pb1wvc1wvaW1tZXItdXNlc3RhdGUtdWprZ2c_ZmlsZT1cL3NyY1wvaW5kZXguanMi._ffWzw7N3RTlOwyE3y8c9JRHn9lmVa5pRfFGiL2m9hc "CodeSandbox") 试试。

```javascript 
import React, { useCallback, useState } from "react";
import produce from "immer";

const TodoList = () => {
  const [todos, setTodos] = useState([
    {
      id: "React",
      title: "Learn React",
      done: true
    },
    {
      id: "Immer",
      title: "Try Immer",
      done: false
    }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos(
      produce((draft) => {
        const todo = draft.find((todo) => todo.id === id);
        todo.done = !todo.done;
      })
    );
  }, []);

  const handleAdd = useCallback(() => {
    setTodos(
      produce((draft) => {
        draft.push({
          id: "todo_" + Math.random(),
          title: "A new todo",
          done: false
        });
      })
    );
  }, []);

  return (<div>{*/ See CodeSandbox */}</div>)
}
```


## current /`original`

## Current

**从 draft 中提取当前 state**

Immer 暴露了一个命名导出的 `current`函数，可以创建 draft 对象当前状态的一个副本。 这对于调试非常有用（因为这些对象不会是代理对象，也不会被记录下来）。 此外，对 `current` 的引用可以安全地从 `produce` 函数中释放。换句话说，`current` 提供 draft 当前状态的快照。

`current`

工作生成的对象类似于 `produced` 本身创建的对象。

1. **未修改的对象将在结构上与原始对象共享。**
2. 如果未对 draft 进行任何更改，通常**它会保留 original(draft) === current(draft**)，但这并不能保证。
3. 未来对 draft 的更改不会反映在 `current` 生成的对象中（不可被 draft 对象的引用除外）
4. 与 `produce` 创建的对象不同，`current` 创建的对象不会被冻结。

> 谨慎使用 `current`，这可能是一项潜在的昂贵操作，尤其是在使用 ES5 时。

> 请注意，不能在不是 draft 的对象上调用 `current`。

### 例子

以下示例显示了 `current`（和 `original` ）的效果：

```javascript 
const base = {
    x: 0
}

const next = produce(base, draft => {
    draft.x++
    const orig = original(draft)
    const copy = current(draft)
    console.log(orig.x)
    console.log(copy.x)

    setTimeout(() => {
        // 将在 produce 完成后执行
        console.log(orig.x)
        console.log(copy.x)
    }, 100)

    draft.x++
    console.log(draft.x)
})
console.log(next.x)

// 将会打印
// 0 (orig.x)
// 1 (copy.x)
// 2 (draft.x)
// 2 (next.x)
// 0 (after timeout, orig.x)
// 1 (after timeout, copy.x)
```


[用例](IT/前端工程/不可变数据/immer/用例/用例.md "用例")

[什么是 immer](<./什么是 immer/index.md> "什么是 immer")

[use-immer](./use-immer/index.md "use-immer")

[在 React 中使用 Immer 管理不可变状态](<./在 React 中使用 Immer 管理不可变状态/index.md> "在 React 中使用 Immer 管理不可变状态")

[陷阱](IT/前端工程/不可变数据/immer/陷阱/陷阱.md "陷阱")

[高级](IT/前端工程/不可变数据/immer/高级/高级.md "高级")
