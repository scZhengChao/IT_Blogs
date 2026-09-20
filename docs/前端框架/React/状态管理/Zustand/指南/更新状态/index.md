# 更新状态

## 目录

- [平面更新](#平面更新)
- [深度嵌套对象](#深度嵌套对象)
  - [正常方法](#正常方法)
  - [使用 Immer](#使用-Immer)
  - [使用 optics-ts](#使用-optics-ts)
  - [使用 Ramda](#使用-Ramda)

## 平面更新

使用 `Zustand` 更新状态非常简单！调用提供的 `set` 函数并传入新的状态，它将与存储中的现有**状态浅层合并**。**注意** 有关嵌套状态，请参阅下一节。

```javascript 
import { create } from 'zustand'

type State = {
  firstName: string
  lastName: string
}

type Action = {
  updateFirstName: (firstName: State['firstName']) => void
  updateLastName: (lastName: State['lastName']) => void
}

// 创建你的存储，它包括状态和（可选的）操作
const usePersonStore = create<State & Action>((set) => ({
  firstName: '',
  lastName: '',
  updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
  updateLastName: (lastName) => set(() => ({ lastName: lastName })),
}))

// 在消费应用中
function App() {
   // "选择"所需的状态和操作，在这种情况下，是 firstName 的值和 updateFirstName 操作 
  const firstName = usePersonStore((state) => state.firstName)
  const updateFirstName = usePersonStore((state) => state.updateFirstName)

  return (
    <main>
      <label>
        名字
        <input
          // 更新 "firstName" 状态
          onChange={(e) => updateFirstName(e.currentTarget.value)}
          value={firstName}
        />
      </label>

      <p>
        你好，<strong>{firstName}!</strong>
      </p>
    </main>
  )
}
```


## 深度嵌套对象

如果你有一个像这样的**深度状态对象：**

```javascript 
type State = {
  deep: {
    nested: {
      obj: { count: number }
    }
  }
}
```


更新嵌套状态需要一些努力，以确保过程是不可变的。

### 正常方法

类似于 React 或 Redux，正常的方法是复制状态对象的每一级。这是通过扩展运算符 `...` 和手动合并新的状态值来完成的。像这样：

```javascript 
  normalInc: () =>
    set((state) => ({
      deep: {
        ...state.deep,
        nested: {
          ...state.deep.nested,
          obj: {
            ...state.deep.nested.obj,
            count: state.deep.nested.obj.count + 1
          }
        }
      }
    })),
```


这太长了！让我们探索一些可以让你的生活更轻松的替代方案。

### 使用 Immer

许多人使用 [Immer](https://github.com/immerjs/immer "Immer") 来更新嵌套值。你可以在任何需要更新嵌套状态的地方使用 Immer，如 React，Redux 和当然，Zustand！

你可以使用 Immer 来缩短你的深度嵌套对象的状态更新。让我们看一个例子：

```javascript 
  immerInc: () =>
    set(produce((state: State) => { ++state.deep.nested.obj.count })),
```


多么大的减少！请注意这里列出的[注意事项](https://ouweiya.github.io/zustand-zh/docs/integrations/immer-middleware "注意事项")。

### 使用 optics-ts

还有另一个选项是 [optics-ts](https://github.com/akheron/optics-ts/ "optics-ts")：

```javascript 
  ramdaInc: () =>
    set(R.modifyPath(["deep", "nested", "obj", "count"], (c) => c + 1)),
```


### 使用 Ramda

**你也可以使用 **[**Ramda**](https://ramdajs.com/ "Ramda")**：**

```javascript 
  ramdaInc: () =>
    set(R.modifyPath(["deep", "nested", "obj", "count"], (c) => c + 1)),
```


ramda 和 optics-ts 也支持类型。
