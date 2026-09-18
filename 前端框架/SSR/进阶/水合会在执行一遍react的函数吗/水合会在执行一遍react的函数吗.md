# 水合会在执行一遍react的函数吗

## 目录

- [1. Hydration 的基本流程](#1-Hydration-的基本流程)
- [2. 哪些代码会再次执行？](#2-哪些代码会再次执行)
- [3. 关键注意事项](#3-关键注意事项)
  - [(1) 避免 Hydration 不匹配](#1-避免-Hydration-不匹配)
  - [(2) 数据获取的一致性](#2-数据获取的一致性)
  - [(3) 第三方库的兼容性](#3-第三方库的兼容性)

在 React 的 **SSR（服务端渲染）** 和 **Hydration（水合）** 过程中，\*\*组件的函数逻辑（如函数组件的主体代码、****`useState`****、`useEffect`\*\***等）确实会再次执行**，但 React 会通过协调机制确保最终结果与服务器渲染的 DOM 保持一致。以下是详细解释：

***

### **1. Hydration 的基本流程**

1. **服务端渲染（SSR）**
   - React 在服务器端执行组件函数，生成静态 HTML 字符串。
   - 此时组件的 `useState`、`useEffect`等 Hook 会被调用，但 `useEffect`的副作用不会执行（因为服务器没有 DOM 和生命周期）。
2. **客户端 Hydration**
   - 浏览器接收到 SSR 的 HTML 后，React 会**重新执行组件函数**，但会复用已有的 DOM 节点（而不是重新创建）。
   - React 会对比服务端生成的 DOM 和客户端渲染的虚拟 DOM，如果一致则“激活”（附加事件监听等），如果不一致会警告并强制客户端渲染覆盖。

### **2. 哪些代码会再次执行？**

- **✅ 会重新执行的代码**

```typescript 
function MyComponent() {
  console.log('组件函数执行'); // Hydration 时会再次输出
  const [count, setCount] = useState(0); // 初始值会复用 SSR 的结果
  useEffect(() => {
    console.log('Effect 执行'); // Hydration 后才会执行（浏览器端）
  }, []);
  return <div>{count}</div>;
}
```


- \-   组件函数主体（包括 `useState`的初始化）。
  - `useMemo`/ `useCallback`的依赖计算（但结果会被复用）。
- **❌ 不会重复执行的代码**
  - SSR 阶段已经生成的 DOM 节点不会重新创建。
  - `useEffect`和 `useLayoutEffect`的副作用只在浏览器端执行（SSR 阶段跳过）。

### **3. 关键注意事项**

#### **(1) 避免 Hydration 不匹配**

如果服务端和客户端渲染结果不一致，React 会警告并强制客户端渲染覆盖，可能导致性能问题或布局抖动：

```javascript 
// ❌ 错误示例：客户端初始状态依赖浏览器 API
function BadComponent() {
  const [width, setWidth] = useState(window.innerWidth); // SSR 报错：window is not defined
  return <div>{width}</div>;
}

// ✅ 正确做法：动态初始化
function GoodComponent() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth); // 仅在浏览器端执行
  }, []);
  return <div>{width}</div>;
}
```


#### **(2) 数据获取的一致性**

- **服务端**：通过 `getServerSideProps`（Next.js）或手动数据预取。
- **客户端**：在 `useEffect`中补充获取数据（避免 SSR 和客户端数据不一致）。

#### **(3) 第三方库的兼容性**

- 检查库是否支持 SSR（如 `js-cookie`需要动态加载）。
- 避免在组件顶层直接调用浏览器 API（如 `localStorage`、`document`）。
