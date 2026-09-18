# SSR加载结束后为什么会刷新一遍，重新重制初始状态

## 目录

- [问题原因](#问题原因)
- [具体场景分析](#具体场景分析)
  - [1. 动态初始值问题](#1-动态初始值问题)
  - [2. 依赖浏览器 API 的初始值](#2-依赖浏览器-API-的初始值)
- [解决方案](#解决方案)
  - [1. 确保初始值一致性](#1-确保初始值一致性)
  - [2. 使用 props 传递初始状态](#2-使用-props-传递初始状态)
  - [3. 延迟浏览器相关状态的初始化](#3-延迟浏览器相关状态的初始化)
  - [4. 使用专门的状态管理库](#4-使用专门的状态管理库)
- [完整示例](#完整示例)
- [总结](#总结)

在 React 的服务器端渲染(SSR)应用中，状态(如`useState`的初始值)在客户端重新加载是一个常见问题。我来详细解释这个现象的原因和解决方案。

## 问题原因

当使用 SSR 时，整个过程分为两个阶段：

1. **服务器端渲染**：Node.js 服务器执行 React 组件并生成 HTML
2. **客户端水合(Hydration)**：浏览器接收 HTML 后，React 会"接管"这些 DOM 节点并附加事件处理程序

问题出现在这两个阶段之间的不一致：

- 服务器渲染时，`useState`的初始值被计算并嵌入到 HTML 中
- 客户端水合时，**React 会重新初始化状态，如果初始值计算方式不一致，就会导致状态"重置"**

## 具体场景分析

### 1. 动态初始值问题

```javascript 
function Counter() {
  // 每次组件渲染都会重新计算初始值
  const [count, setCount] = useState(Math.random());
  
  return <div>Count: {count}</div>;
}
```


在 SSR 中：

- 服务器端：生成随机数 A 并渲染到 HTML
- 客户端：生成随机数 B 并作为初始值
- 结果：客户端会显示 B，覆盖服务器的 A

### 2. 依赖浏览器 API 的初始值

```javascript 
function UserPrefs() {
  // 在服务器端 window 是 undefined
  const [theme, setTheme] = useState(() => 
    window.localStorage.getItem('theme') || 'light'
  );
  
  return <div>Theme: {theme}</div>;
}
```


在 SSR 中：

- 服务器端：无法访问`window`，可能报错或使用 fallback 值
- 客户端：可以访问 localStorage，可能得到不同值
- 结果：不一致的渲染

## 解决方案

### 1. 确保初始值一致性

```javascript 
// 共享初始值计算逻辑
const getInitialCount = () => 0; // 固定值而非动态计算

function Counter() {
  const [count, setCount] = useState(getInitialCount);
  // ...
}
```


### 2. 使用 props 传递初始状态

```typescript 
// 服务器端
const initialData = { count: 42 };
const html = renderToString(<App initialData={initialData} />);

// 客户端
const initialData = JSON.parse(document.getElementById('initial-data').textContent);
hydrateRoot(<App initialData={initialData} />);

// 组件内
function App({ initialData }) {
  const [count, setCount] = useState(initialData.count);
  // ...
}
```


### 3. 延迟浏览器相关状态的初始化

```javascript 
function UserPrefs() {
  const [theme, setTheme] = useState('light'); // 默认值
  
  useEffect(() => {
    // 仅在客户端执行
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);
  
  return <div>Theme: {theme}</div>;
}
```


### 4. 使用专门的状态管理库

如 Redux、Zustand 等，它们通常有处理 SSR 的机制：

```javascript 
// 服务器端
const store = createStore(reducer, preloadedState);
const html = renderToString(
  <Provider store={store}>
    <App />
  </Provider>
);

// 将状态序列化到 HTML
<script>
  window.__PRELOADED_STATE__ = ${JSON.stringify(store.getState())}
</script>

// 客户端
const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(reducer, preloadedState);
hydrateRoot(
  <Provider store={store}>
    <App />
  </Provider>
);
```


## 完整示例

这是一个处理 SSR 状态同步的完整示例：

```javascript 
// server.js
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.js';

const app = express();

app.get('/', (req, res) => {
  // 服务器计算初始状态
  const initialCount = 10;
  
  const html = renderToString(<App initialCount={initialCount} />);
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR Demo</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify({ count: initialCount })};
        </script>
        <script src="/client.js"></script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```


```javascript 
// App.js
import React, { useState } from 'react';

export default function App({ initialCount }) {
  // 使用props或全局变量作为初始值
  const [count, setCount] = useState(
    initialCount || (typeof window !== 'undefined' && window.__INITIAL_STATE__?.count) || 0
  );
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```


```javascript 

// client.js
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './App.js';

const initialData = window.__INITIAL_STATE__;
const root = hydrateRoot(
  document.getElementById('root'),
  <App initialCount={initialData.count} />
);

```


## 总结

SSR 中状态重置的主要原因**是服务器和客户端初始状态不一致。** 解决方案包括：

1. **确保初始值计算在两端一致**
2. **通过 props 或全局变量传递服务器计算的初始状态**
3. 对浏览器相关状态使用`useEffect`延迟初始化
4. 使用专门的状态管理库处理 SSR 场景

通过这些方法，可以确保 SSR 应用在客户端水合时保持状态一致，提供更好的用户体验。
