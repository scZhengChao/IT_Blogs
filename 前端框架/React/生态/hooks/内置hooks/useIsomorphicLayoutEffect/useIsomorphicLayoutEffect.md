# useIsomorphicLayoutEffect

## 目录

- [useIsomorphicLayoutEffect是什么？](#useIsomorphicLayoutEffect是什么)
- [1. 为什么需要useIsomorphicLayoutEffect？](#1-为什么需要useIsomorphicLayoutEffect)
  - [问题背景](#问题背景)
  - [解决方案](#解决方案)
- [2. 实现代码](#2-实现代码)
- [3. 使用场景](#3-使用场景)
  - [(1) 需要同步测量 DOM，但又要支持 SSR](#1-需要同步测量-DOM但又要支持-SSR)
  - [(2) 避免服务端渲染时的useLayoutEffect警告](#2-避免服务端渲染时的useLayoutEffect警告)
- [4. 对比useEffect、useLayoutEffect和useIsomorphicLayoutEffect](#4-对比useEffectuseLayoutEffect和useIsomorphicLayoutEffect)
- [5. 在 Next.js 等 SSR 框架中的实践](#5-在-Nextjs-等-SSR-框架中的实践)
- [6. 总结](#6-总结)

### \*\*`useIsomorphicLayoutEffect`\*\***是什么？**

`useIsomorphicLayoutEffect`是一个 **自定义 Hook**，它的行为在 **客户端（浏览器）** 和 **服务端（SSR）** 下会自动适配：

- **在浏览器环境**：它的行为和`useLayoutEffect`完全一致（同步执行，阻塞渲染）。
- **在服务端（如 Next.js 的 SSR）**：它的行为和`useEffect`一致（异步执行，不阻塞渲染），避免服务端报错。

## **1. 为什么需要**\*\*`useIsomorphicLayoutEffect`？\*\*​

### **问题背景**

- `useLayoutEffect`在 **服务端渲染（SSR）** 时会触发警告：
  > "Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format."
- 这是因为`useLayoutEffect`是 **同步执行** 的，而服务端渲染是 **纯静态生成**，没有浏览器 DOM 环境，所以无法执行同步副作用。

### **解决方案**

`useIsomorphicLayoutEffect`的作用是：

- **在浏览器**：用`useLayoutEffect`（同步执行，避免布局抖动）。
- **在服务端**：用`useEffect`（异步执行，避免警告）。

## **2. 实现代码**

```javascript 
import { useEffect, useLayoutEffect } from 'react';

// 判断是否在浏览器环境
const isBrowser = typeof window !== 'undefined';

// 自定义 Hook
function useIsomorphicLayoutEffect(effect, deps) {
  // 如果是浏览器，用 useLayoutEffect；否则用 useEffect
  if (isBrowser) {
    return useLayoutEffect(effect, deps);
  } else {
    return useEffect(effect, deps);
  }
}

export default useIsomorphicLayoutEffect;
```


## **3. 使用场景**

### **(1) 需要同步测量 DOM，但又要支持 SSR**

```javascript 
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

function MyComponent() {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    // 在浏览器同步测量 DOM，在服务端异步执行（避免警告）
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return <div ref={ref}>Width: {width}px</div>;
}
```


### **(2) 避免服务端渲染时的**\*\*`useLayoutEffect`\*\***警告**

如果你在 Next.js 等 SSR 框架中使用了`useLayoutEffect`，可以用`useIsomorphicLayoutEffect`替代，避免控制台警告。

***

## **4. 对比**\*\*`useEffect`****、****`useLayoutEffect`****和****`useIsomorphicLayoutEffect`\*\*

| Hook                          | 执行时机          | 是否阻塞渲染    | 服务端支持      | 典型场景              |
| ----------------------------- | ------------- | --------- | ---------- | ----------------- |
| \`useEffect\`                 | 浏览器绘制后（异步）    | ❌ 不阻塞     | ✅ 支持       | 数据获取、事件监听         |
| \`useLayoutEffect\`           | 浏览器绘制前（同步）    | ✅ 阻塞      | ❌ 不支持（会警告） | DOM 测量、样式调整       |
| \`useIsomorphicLayoutEffect\` | 浏览器同步 / 服务端异步 | ✅/❌ 取决于环境 | ✅ 支持       | 需要 SSR 兼容的 DOM 操作 |

***

## **5. 在 Next.js 等 SSR 框架中的实践**

Next.js 默认支持`useIsomorphicLayoutEffect`，许多库（如`framer-motion`）内部也使用了它来兼容 SSR。

**示例：Next.js +`useIsomorphicLayoutEffect`**

```javascript 
import { useState, useRef } from 'react';
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect';

export default function SSRCompatibleComponent() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const ref = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  return (
    <div ref={ref}>
      Dimensions: {dimensions.width}x{dimensions.height}
    </div>
  );
}
```


## **6. 总结**

- \*\*`useIsomorphicLayoutEffect`****是****`useLayoutEffect`\*\***的 SSR 兼容版本**，在浏览器和服务端都能安全运行。
- **适用场景**：
  - 需要同步测量 DOM（如获取元素尺寸）。
  - 在 Next.js / Nuxt.js 等 SSR 框架中避免`useLayoutEffect`警告。
- **实现原理**：通过`typeof window`判断环境，动态选择`useLayoutEffect`或`useEffect`。

**推荐**：
如果你在写 **通用组件**（可能用于 SSR），优先使用`useIsomorphicLayoutEffect`替代`useLayoutEffect`！
