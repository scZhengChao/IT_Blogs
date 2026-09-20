# Suspense

## 目录

- [一、Suspense 的核心概念](#一Suspense-的核心概念)
- [二、Suspense 的基本用法](#二Suspense-的基本用法)
  - [1️⃣ 配合React.lazy()实现代码分割](#1️⃣-配合Reactlazy实现代码分割)
  - [2️⃣ 配合异步数据获取（如 SWR、React Query）](#2️⃣-配合异步数据获取如-SWRReact-Query)
- [三、Suspense 的深度使用场景](#三Suspense-的深度使用场景)
  - [1️⃣ 嵌套 Suspense：多层级加载状态](#1️⃣-嵌套-Suspense多层级加载状态)
  - [2️⃣ 结合 Transition API 实现平滑过渡](#2️⃣-结合-Transition-API-实现平滑过渡)
  - [3️⃣ 错误边界（Error Boundaries）与 Suspense 配合](#3️⃣-错误边界Error-Boundaries与-Suspense-配合)
- [⚙️ 四、Suspense 的底层原理（简要）](#️-四Suspense-的底层原理简要)
- [❓ 五、常见问题与注意事项](#-五常见问题与注意事项)
  - [Q1: Suspense 可以直接用于异步数据获取吗？](#Q1-Suspense-可以直接用于异步数据获取吗)
  - [Q2: Suspense 和useEffect有什么区别？](#Q2-Suspense-和useEffect有什么区别)
  - [Q3: Suspense 是否支持服务端渲染（SSR）？](#Q3-Suspense-是否支持服务端渲染SSR)
- [🎯 六、总结](#-六总结)

`Suspense`是 React 提供的一个核心特性，用于简化**异步数据获取和代码分割（Code Splitting）的体验**，尤其是在配合 React 的​**​并发特性（Concurrent Features）​**​时，它能让你的应用在等待异步操作（如数据加载、组件渲染）时显示一个优雅的“加载状态”（Fallback UI），而不是直接显示空白或闪烁。

## 一、Suspense 的核心概念

`Suspense`的核心思想是：

> **“告诉 React：我正在等待某些异步操作完成，在这期间你可以显示一个占位内容。”**

它并不是直接用来获取数据的工具，而是**协调异步渲染**的一种方式，通常与以下技术结合使用：

- **React.lazy()**：**用于代码分割（动态加载组件）**
- **异步数据获取库**（如 Relay、SWR、React Query 等）：这些库支持 Suspense 模式的数据获取
- **异步组件**：**你自己封装的返回 Promise 的组件**

## 二、Suspense 的基本用法

### 1️⃣ 配合`React.lazy()`实现代码分割

这是`Suspense`最常见的用法之一：在动态加载组件时显示一个加载中的 UI。

```javascript 
import React, { Suspense } from 'react';

// 使用 React.lazy 动态加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```


- `React.lazy(() => import('./LazyComponent'))`：动态加载`LazyComponent`组件；
- `<Suspense>`包裹住可能会异步加载的组件；
- `fallback`：在组件加载完成之前显示的内容（比如一个 Loading 动画）。

> 请注意，**lazy 组件可以位于 Suspense 组件树的深处**——它不必包装树中的每一个延迟加载组件。最佳实践是将 \<Suspense> 置于你想展示加载指示器（loading indicator）的位置，而 lazy() 则可被放置于任何你想要做代码分割的地方。&#x20;

### 2️⃣ 配合异步数据获取（如 SWR、React Query）

`Suspense`的另一个强大用途是与支持 Suspense 的数据获取库一起使用，让数据加载过程也支持“等待时显示 Fallback”的体验。

以 **React Query** 为例：

```javascript 
import React, { Suspense } from 'react';
import { useQuery } from 'react-query';

// 定义一个支持 Suspense 的数据获取函数
function fetchData() {
  let status;
  let result;
  const promise = fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(res => res.json())
    .then(
      data => {
        status = 'success';
        result = data;
      },
      error => {
        status = 'error';
        result = error;
      }
    );

  return {
    read() {
      if (status === 'success') return result;
      if (status === 'error') throw result;
      throw promise; // 关键：抛出 Promise，让 Suspense 捕获
    }
  };
}

const dataFetcher = fetchData();

function Post() {
  const post = dataFetcher.read(); // 如果数据未加载完成，这里会抛出 Promise
  return <div>{post.title}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading post...</div>}>
      <Post />
    </Suspense>
  );
}
```


> 注意：原生`fetch`并不直接支持 Suspense，需要自己封装一个“可被 Suspense 捕获”的数据获取函数（如上面的`fetchData`），或者使用已经支持 Suspense 的库（如 React Query、Relay、SWR 等）。

## 三、Suspense 的深度使用场景

### 1️⃣ 嵌套 Suspense：多层级加载状态

你可以在组件树的不同层级使用多个`Suspense`，以实现更细粒度的加载状态控制。

```javascript 
function App() {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <Page />
    </Suspense>
  );
}

function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Content...</div>}>
        <Content />
      </Suspense>
    </div>
  );
}
```


- 每个`Suspense`只负责自己内部的异步操作；
- 这样可以让**页面的不同部分独立加载，而不是整个页面一起等待。**

### 2️⃣ 结合 Transition API 实现平滑过渡

React 的`useTransition`或`useDeferredValue`可以和`Suspense`一起使用，实现**部分 UI 的渐进式加载**，避免整个页面的卡顿。

```typescript 
import React, { Suspense, useTransition } from 'react';

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      // 在这里触发一些状态更新或异步操作
    });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isPending}>
        {isPending ? 'Loading...' : 'Load Component'}
      </button>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```


- `useTransition`允许你将某些状态更新标记为“非紧急”，从而避免阻塞用户的交互；
- 结合`Suspense`，可以实现更流畅的用户体验。

### 3️⃣ 错误边界（Error Boundaries）与 Suspense 配合

当异步操作失败时（如组件加载失败、数据获取失败），可以使用 **Error Boundary** 来捕获错误并显示备用 UI，而不是让整个应用崩溃。

```javascript 
import React, { Suspense } from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```


- `ErrorBoundary`用于捕获子组件树中的错误；
- 结合`Suspense`，可以同时处理加载失败和渲染失败的情况。

***

## ⚙️ 四、Suspense 的底层原理（简要）

`Suspense`的底层实现依赖于 React 的**并发渲染机制**（Concurrent Rendering），它允许 React 在**等待异步操作完成时**“暂停”当前组件的渲染，并继续渲染其他部分。

关键点：

1. **抛出 Promise** &#x20;

   当一个组件依赖的异步操作尚未完成时，它会抛出一个 Promise。`Suspense`会捕获这个 Promise，并显示`fallback`。
2. **暂停与恢复** &#x20;

   React 会“暂停”当前组件的渲染，转而去渲染其他部分。当 Promise 完成后，React 会重新尝试渲染该组件。
3. **协调更新** &#x20;

   React 的调度器会根据优先级决定何时恢复渲染，从而实现平滑的用户体验。

## ❓ 五、常见问题与注意事项

### Q1: Suspense 可以直接用于异步数据获取吗？

- 原生`fetch`或`axios`等工具并不直接支持 Suspense；
- 需要自己封装一个“可被 Suspense 捕获”的数据获取函数（即抛出 Promise），或者使用支持 Suspense 的库（如 React Query、Relay、SWR 等）。

***

### Q2: Suspense 和`useEffect`有什么区别？

- `useEffect`是用于处理副作用（如数据获取）的 Hook，但它无法暂停渲染；
- `Suspense`是用于协调异步渲染的机制，它可以让组件在等待数据时“暂停”渲染，并显示一个 Fallback。

> 如果你需要“在数据加载完成前不渲染组件”，`Suspense`是更合适的选择；如果你需要在组件渲染后执行副作用（如日志记录、手动更新 DOM），则应该用`useEffect`。

***

### Q3: Suspense 是否支持服务端渲染（SSR）？

是的！`Suspense`在 React 18 中已经支持服务端渲染（SSR），并且可以与 **Streaming SSR**（流式渲染）结合使用，实现更快的首屏加载速度。

***

## 🎯 六、总结

| 特性         | 说明                                                       |
| ---------- | -------------------------------------------------------- |
| **核心作用**​  | 协调异步渲染，在等待异步操作完成时显示 Fallback UI                          |
| **常见搭配**​  | \`React.lazy()\`（代码分割）、支持 Suspense 的数据获取库（如 React Query） |
| **嵌套支持**​  | 支持多层\`Suspense\`，实现细粒度的加载状态控制                            |
| **错误处理**​  | 可与\`ErrorBoundary\`结合，捕获加载或渲染过程中的错误                      |
| **并发特性**​  | 依赖 React 的并发渲染机制，支持平滑过渡和优先级调度                            |
| **服务端渲染**​ | React 18 中已支持 SSR 和 Streaming SSR                        |

***
