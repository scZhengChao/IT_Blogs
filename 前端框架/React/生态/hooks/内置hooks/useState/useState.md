# useState

## 目录

- [直接修改 state 的值，会怎样？](#直接修改-state-的值会怎样)
- [当 props 变化时重置所有 state](#当-props-变化时重置所有-state)
- [当 prop 变化时调整部分 state](#当-prop-变化时调整部分-state)

[ React18 源码解析之 useState 的原理-蚊子的前端博客 useState()是我们最常用的hooks之一，主要是为了存储数据和更新视图的状态。 https://www.xiabingbao.com/post/react/react-usestate-rn5bc0.html](https://www.xiabingbao.com/post/react/react-usestate-rn5bc0.html " React18 源码解析之 useState 的原理-蚊子的前端博客 useState()是我们最常用的hooks之一，主要是为了存储数据和更新视图的状态。 https://www.xiabingbao.com/post/react/react-usestate-rn5bc0.html")

### 直接修改 state 的值，会怎样？

state 作为函数组件中的一个变量，当然可以直接修改它的值，然而这并不会 React 组件的重新渲染，页面上的数据也不会更新。唯一有影响的，就是后续要使用该变量的地方，会使用到新数据。但若其他 useState() 导致了组件的刷新，**刚才变量的值，若是基本类型（比如数字、字符串等），会重置为修改之前的值；若是复杂类型，基于 js 的 **[**对象引用**](https://segmentfault.com/a/1190000014724227 "对象引用")** 特性，也会同步修改 React 内部存储的数据，但不会引起视图的变化**。

### 当 props 变化时重置所有 state

通常，当在相同的位置渲染相同的组件时，React 会保留状态。**通过将 ****`userId`**** 作为 ****`key`**** 传递给 ****`Profile`**** 组件，使 React 将具有不同 ****`userId`**** 的两个 ****`Profile`**** 组件视为两个不应共享任何状态的不同组件**。每当 key（这里是 `userId`）变化时，React 将重新创建 DOM，并 [重置](https://zh-hans.react.dev/learn/preserving-and-resetting-state#option-2-resetting-state-with-a-key "重置") `Profile` 组件和它的所有子组件的 state。现在，当在不同的个人资料之间导航时，`comment` 区域将自动被清空。

### 当 prop 变化时调整部分 state

有时候，当 prop 变化时，你可能只想重置或调整部分 state ，而不是所有 state。

`List` 组件接收一个 `items` 列表作为 prop，然后用 state 变量 `selection` 来保持已选中的项。当 `items` 接收到一个不同的数组时，你想将 `selection` 重置为 `null`：

```javascript 
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

   // 🔴 避免：当 prop 变化时，在 Effect 中调整 state
  useEffect(() => {
    setSelection(null);
  }, [items]);
   // ...
}
```


这不太理想。每当 `items` 变化时，`List` 及其子组件会**先使用**旧的 `selection` 值渲染。然后 React **会更新 DOM 并执行 Effect**。最后，调用 `setSelection(null)` 将导致 `List` **及其子组件重新渲染，重新启动整个流程**。

让我们从删除 Effect 开始。取而代之的是在渲染期间直接调整 state：

```javascript 
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selection, setSelection] = useState(null);

  // 好一些：在渲染期间调整 state
  const [prevItems, setPrevItems] = useState(items);
   if (items !== prevItems) {
    setPrevItems(items);
    setSelection(null);
  } 
  // ...
}
```


像这样 [存储前序渲染的信息](https://zh-hans.react.dev/reference/react/useState#storing-information-from-previous-renders "存储前序渲染的信息") 可能很难理解，但它比在 Effect 中更新这个 state 要好。上面的例子中，在渲染过程中直接调用了 `setSelection`。当它执行到 `return` 语句退出后，React 将 **立即** 重新渲染 `List`。此时 React 还没有渲染 `List` 的子组件或更新 DOM，这使得 `List` 的子组件可以**跳过渲染旧的 ****`selection`**** 值。**

在**渲染期间更新组件时，React 会丢弃已经返回的 JSX 并立即尝试重新渲染**。为了避免非常缓慢的级联重试，React **只允许**在渲染期间更新 \*\*同一 \*\*组件的状态。如果你在渲染期间更新另一个组件的状态，你会看到一条报错信息。条件判断 `items !== prevItems` 是必要的，它可以避免无限循环。你可以像这样调整 state，但任何其他副作用（比如变化 DOM 或设置的延时）应该留在事件处理函数或 Effect 中，以 [保持组件纯粹](https://zh-hans.react.dev/learn/keeping-components-pure "保持组件纯粹")。

**虽然这种方式比 Effect 更高效，但大多数组件也不需要它**。无论你怎么做，**根据 props 或其他 state 来调整 state 都会使数据流更难理解和调试**。总是检查是否可以\*\*通过添加 **[**key 来重置所有 state**](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#resetting-all-state-when-a-prop-changes "key 来重置所有 state")**，或者 \*\*[**在渲染期间计算所需内容**](https://zh-hans.react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state "在渲染期间计算所需内容")。例如，你可以存储已选中的 **item ID** 而不是存储（并重置）已选中的 **item**：

```javascript 
function List({ items }) {
  const [isReverse, setIsReverse] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // ✅ 非常好：在渲染期间计算所需内容
   const selection = items.find(item => item.id === selectedId) ?? null;
   // ...
}
```


现在完全不需要 “调整” state 了。如果包含已选中 ID 的项出现在列表中，则仍然保持选中状态。如果没有找到匹配的项，则在渲染期间计算的 `selection` 将会是 `null`。行为不同了，但可以说更好了，因为大多数对 `items` 的更改仍可以保持选中状态。
