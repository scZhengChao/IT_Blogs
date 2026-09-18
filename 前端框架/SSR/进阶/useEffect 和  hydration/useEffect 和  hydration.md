# useEffect 和 hydration

## 目录

- [⏱️ useEffect 在 hydration 中的执行顺序](#️useEffect在-hydration-中的执行顺序)
- [💥 错误发生场景](#-错误发生场景)
- [正确处理方式](#正确处理方式)
  - [方案 1：使用 startTransition 包裹](#方案-1使用startTransition包裹)
- [各 Hook 在 hydration 中的执行顺序](#各-Hook-在-hydration-中的执行顺序)
- [💡 最佳实践建议](#-最佳实践建议)

在 React 的 hydration（水合）过程中，`useEffect` 的执行时机非常关键，这也是导致错误 #421 的核心原因。以下是详细解释：

### ⏱️ `useEffect` 在 hydration 中的执行顺序

1. **hydration 前**：
   - React 首先进行 **hydration 渲染**（同步过程）
   - 此阶段只是将 React 组件树"附加"到现有的 SSR 生成的 DOM 上
   - **`useEffect`**\*\* 此时不会执行\*\*​
2. **hydration 完成后**：
   - 进入 **commit 阶段**（DOM 操作阶段）
   - **此时 ****`useEffect`**** 回调开始调度执行**（但非立即执行）
3. **浏览器绘制后**：
   - `useEffect` **实际执行**（异步微任务）
   - 此时 hydration 流程**理论上已完成**

### 💥 错误发生场景

当以下情况**同时存在**时会触发错误：

```javascript 
function ProblemComponent() {
  const [state, setState] = useState(null);
  
  // 在 hydration 刚完成但未标记结束时触发更新
  useEffect(() => {
    setState("new value"); // 🚨 危险更新！
  }, []);
  
  return <div>{state}</div>;
}

<Suspense fallback="Loading...">
  <ProblemComponent /> {/* 位于 Suspense 边界内 */}
</Suspense>
```


### 正确处理方式

#### 方案 1：使用 `startTransition` 包裹

```javascript 
useEffect(() => {
  startTransition(() => { // ✅ 安全更新
    setState("safe update");
  });
}, []);
```


### 各 Hook 在 hydration 中的执行顺序

| Hook 类型             | 执行时机                      | 是否安全更新状态 |
| ------------------- | ------------------------- | -------- |
| \`useState\`初始化     | hydration 前 (同步)          | 安全 ✅     |
| \`useLayoutEffect\` | hydration 后 (commit 阶段同步) | 危险 🚨    |
| \`useEffect\`       | hydration 后 (微任务异步)       | 临界点 ⚠️   |
| 事件处理函数              | 用户交互后                     | 安全 ✅     |

### 💡 最佳实践建议

1. 在 Suspense 边界内的组件中，**避免在 ****`useEffect`**** 中直接更新状态**
2. 优先使用 `startTransition` 包裹所有 hydration 后的初始更新
