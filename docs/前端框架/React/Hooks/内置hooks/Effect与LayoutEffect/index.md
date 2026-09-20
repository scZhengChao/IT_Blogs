# useEffect 和 useLayoutEffect

## 目录

- [useEffect](#useEffect)
  - [如果我的 effect 的依赖频繁变化，我该怎么办？ ](#如果我的-effect-的依赖频繁变化我该怎么办-)
- [useLayoutEffect](#useLayoutEffect)
- [区别](#区别)
  - [1. 核心区别](#1-核心区别)
  - [2. 执行顺序](#2-执行顺序)
  - [3. 适用场景对比](#3-适用场景对比)
    - [(1)useEffect：适合大多数副作用](#1useEffect适合大多数副作用)
    - [useLayoutEffect：适合需要同步更新 UI 的操作](#useLayoutEffect适合需要同步更新-UI-的操作)
  - [4.性能影响](#4性能影响)

## useEffect

\*\*          在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。 \*\*

        使用 useEffect 完成副作用操作。赋值**给 useEffect 的函数会在组件渲染到屏幕之后执**行。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。&#x20;

\*\*        在浏览器完成布局与绘制之后，****传给 useEffect 的函数会延迟调用****。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。 \*\*

     \*\*虽然 useEffect 会在浏览器绘制后延迟执行，但会保证在任何新的渲染前执行。React 将在组件更新前刷新上一轮渲染的 effect。 \*\*

       然而，并非所有 effect 都可以被延迟执行。例如，在浏览器执行下一次绘制前，用户可见的 DOM 变更就必须同步执行，这样用户才不会感觉到视觉上的不一致。（概念上类似于被动监听事件和主动监听事件的区别。）React 为此提供了一个额外的 [useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect "useLayoutEffect")Hook 来处理这类 effect。它和 useEffect 的结构相同，区别只是调用时机不同。&#x20;

### 如果我的 effect 的依赖频繁变化，我该怎么办？&#x20;

```javascript 
 function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // 这个 effect 依赖于 `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
}
```


传入空的依赖数组 \[]，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 setInterval 的回调中，**count 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 count 的值被保存在该闭包当中，** 且初值为 0。每隔一秒，回调就会执行 setCount(0 + 1)，因此，count 永远不会超过 1。**指定 \[count] 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置**。事实上，每个 setInterval 在被清除前（类似于 setTimeout）都会调用一次。但这并不是我们想要的。要解决这个问题，我们可以使用 [setState 的函数式更新形式](https://react.docschina.org/docs/hooks-reference.html#functional-updates "setState 的函数式更新形式")。

它允许我们指定 state 该 *如何*改变而不用引用 *当前*state：&#x20;

```javascript 
 function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量

  return <h1>{count}</h1>;
}
```


\*\*（setState 函数的身份是被确保稳定的，所以可以放心的在依赖项中省略掉） \*\*

## useLayoutEffect

其函数签名与 useEffect 相同，但它会在\*\*所有的 ****DOM 变更之后同步****调用 effect。可以使用它来****读取 DOM 布局并同步触发重渲染****。在浏览器****执行绘制之前****，useLayoutEffect 内部的更新计划将被同步刷新。 \*\*

> 提示
>
> 如果你正在将代码从 class 组件迁移到使用 Hook 的函数组件，则需要注意 useLayoutEffect 与 componentDidMount、componentDidUpdate 的调用阶段是一样的。但是，我们推荐你一开始先用 useEffect，只有当它出问题的时候再尝试使用 useLayoutEffect。
>
> 如果你使用服务端渲染，请记住，无论 useLayoutEffect 还是 useEffect 都无法在 Javascript 代码加载完成之前执行。这就是为什么在服务端渲染组件中引入 useLayoutEffect 代码时会触发 React 告警。解决这个问题，需要将代码逻辑移至 useEffect 中（如果首次渲染不需要这段逻辑的情况下），或是将该组件延迟到客户端渲染完成后再显示（如果直到 useLayoutEffect 执行之前 HTML 都显示错乱的情况下）。
>
> 若要从服务端渲染的 HTML 中排除依赖布局 effect 的组件，可以通过使用 `showChild && <Child />` 进行条件渲染，并使用 useEffect(() => { setShowChild(true); }, \[]) 延迟展示组件。这样，在客户端渲染完成之前，UI 就不会像之前那样显示错乱了。

# 区别

## **1. 核心区别**

| 特性          | \`useEffect\`                   | \`useLayoutEffect\`                |
| ----------- | ------------------------------- | ---------------------------------- |
| **执行时机**​   | 在浏览器 \*\*绘制（paint）之后\*\* 异步执行   | 在浏览器 \*\*绘制（paint）之前\*\* 同步执行      |
| **是否阻塞渲染**​ | ❌ 不阻塞（异步）                       | ✅ 阻塞（同步）                           |
| **适用场景**​   | 数据获取、订阅、日志等 \*\*不影响 UI 的副作用\*\* | DOM 测量、样式调整等 \*\*需要同步更新 UI 的操作\*\* |
| **默认行为**​   | 在组件卸载时清理副作用                     | 在组件卸载时清理副作用                        |

***

## **2. 执行顺序**

React 组件的渲染流程如下：

1. **渲染阶段**（Reconciliation）：
   - 执行 JSX 渲染，生成虚拟 DOM。
   - 计算哪些 DOM 需要更新。
2. **提交阶段**（Commit）：
   - 浏览器 **绘制（paint）之前**：`useLayoutEffect`同步执行。
   - 浏览器 **绘制（paint）之后**：`useEffect`异步执行。

**执行顺序示例**：

```typescript 
function MyComponent() {
  useEffect(() => {
    console.log('useEffect'); // 在绘制之后执行
  });

  useLayoutEffect(() => {
    console.log('useLayoutEffect'); // 在绘制之前同步执行
  });

  return <div>Example</div>;
}
```


**控制台输出**：

```javascript 
useLayoutEffect  // 先执行（同步）
（浏览器绘制 UI）
useEffect        // 后执行（异步）
```


## **3. 适用场景对比**

### **(1)****`useEffect`****：适合大多数副作用**

- **数据获取**（如 API 请求）：
- **事件订阅​**​（如 WebSocket、ResizeObserver）：
- **日志记录​**​（不影响 UI 的操作）：

**特点**：

- 异步执行，不会阻塞浏览器渲染。
- 适合 **不依赖 DOM 的副作用**。

### **`useLayoutEffect`：适合需要同步更新 UI 的操作**

- **DOM 测量**（如获取元素尺寸/位置）：
- 样式调整​​（如避免布局抖动）：
- ​**​动画初始化​**​（如同步设置初始状态）：

**特点**：

- 同步执行，会阻塞浏览器渲染，直到副作用完成。
- 适合 **必须立即更新 DOM 的场景**，避免用户看到闪烁或布局偏移。

## 4.**性能影响**

| Hook                | 性能影响                |
| ------------------- | ------------------- |
| \`useEffect\`       | ✅ 更优（异步执行，不阻塞渲染）    |
| \`useLayoutEffect\` | ❌ 可能导致卡顿（同步执行，阻塞渲染） |

**为什么**\*\*`useLayoutEffect`\*\***可能导致性能问题？**

- 它在浏览器绘制之前同步执行，如果副作用耗时较长（如复杂计算或大量 DOM 操作），会导致页面 **卡顿**（因为浏览器无法渲染其他内容）。
- **尽量优先使用**\*\*`useEffect`\*\*，除非必须同步更新 UI。

**黄金法则**：

1. **默认用**\*\*`useEffect`\*\*（大多数场景适用）。
2. **仅在需要同步更新 UI 时用**\*\*`useLayoutEffect`\*\*（如 DOM 测量、避免闪烁）。
3. **避免在**\*\*`useLayoutEffect`\*\***中执行耗时操作**（否则会卡顿）。
