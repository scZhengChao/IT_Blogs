# 通过 Children 或 Props 传递元素

## 目录

- [前言](#前言)
- [优化 1 - 通过 Children 或 Props 传递元素](#优化-1-通过-Children-或-Props-传递元素)

# 前言

性能优化是前端开发中绕不开的话题，在 React 开发中针对不同的应用场景的性能优化有着非常多共性和特性的方法，本文介绍了一些方法通过 React **原生**支持的能力来对 React 应用程序进行性能优化，减少应用中无效的 re-render，不管你是新手小白还是成熟的 React 开发者都非常容易使用，并且可以应用到日常的开发中去。

# 优化 1 - 通过 Children 或 Props 传递元素

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a134d71a863406c9e6fd46e89fa39d2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=444\&s=111264\&e=png\&b=49a6f7)

**为了提高应用的性能，避免无效的 re-render 是非常实用的方法**，想要避免无效 re-render，首先我们得了解组件什么时候会被 re-render。在 React 中，组件只会在三种情况下发生 re-render：**State 发生改变、Context 发生改变和父组件 re-render。**State 发生改变和 Context 发生改变比较好理解，而所谓父组件 re-render 指的是父组件 re-render 会导致所有子组件也 re-render，这里有一个非常常见的误解，即“当组件使用 Props 时，我们一般认为 Props 发生改变则组件会 re-render，但实际并不是这样，**组件之所以会 re-render，是因为父组件 re-render 导致子组件 re-render 了，而 Props 是来自于父组件的”。**注意，我们这里所说的 re-render 并不是指 Dom 重新渲染，这里的 re-render 指的是**组件函数被调用执行，然后创建一个新的虚拟 Dom 去 diff 和更新****，而无效的 re-render 指的就是 Dom 实际没有发生任何变化的渲染，执行的所有内容都是无用功。**当 re-render 发生**非常频繁或者组件本身执行就较为复杂时这种无效的 re-render 则会导致明显的性能问题。**

```javascript 
import { useState } from "react";

function SlowComponent() {
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent />
    </div>
  );
}

```


![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83d1ca7c43804dc9994c1b94855c1cf6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=293\&s=78390\&e=png\&b=fefefe)

假设我们有一个计数组件 `Counter`，其中包含了**一个渲染非常耗费资源的** `SlowComponent`（渲染了 10w 个内容），当我们点击计数按钮时，我们明显感受到计数值变化非常卡顿，并且从 profiler developer tool 录制的组件渲染情况中发现，SlowComponent 也 re-render 了。点击按钮会导致 State 发生改变，这时候 Counter 组件会触发 re-render，`SlowComponent` 组件作为 `Counter` 组件的子组件也会发生 re-render，但计数按钮点击并不会引起这个 SlowComponent 的变化，所以这是无效的 re-render。

```javascript 
import { useState } from "react";

function SlowComponent() {
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Counter>
      <SlowComponent />
    </Counter>
  );
}

```


![](./assets/image/image_Yuo2jhUgm3.png)

**父组件 re-render 会导致子组件 re-render**，当某些**复杂内容可以独立于父组件存在**时或者我们并不需要 re-render 的话，我们可以通过 children 或 props 传入，这样就避免了无效的 re-render。如上所示，我们将 SlowComponentt 通过 children 传入 Counter 组件，当我们再次点击计数按钮时，通过 profiler developer tool 可以看出当 Counter 组件的 State 发生变化时，只有 Counter 组件进行 re-render，SlowComponent 没有触发 re-render，而不是每次 Counter 组件的 State 发生变化时都重新渲染，**这是因为 ****`SlowComponent`**** 是 App 组件的子组件了，只有 App 组件发生 re-render 才会执行 re-render。**
