# 使用 Memoization

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87ffae00ca934a4fbe05c6b5e35d463b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=402\&s=85999\&e=png\&b=f7f7f7)

所谓 Memoization（记忆化）就是**只执行一次函数并记忆结果**，当一个函数被执行的时候，记住执行得到的结果到缓存中，如果下次使用相同的输入，则直接返回缓存中记录的结果不再重新计算，如果是不同的输入，则会重新执行并计算结果。**通过 Memoization 我们不仅可以避免无效的 re-render，还能够提高应用的速度和响应能力，** Memoization 主要有三方面内容：

- Memoize Components使用memo函数
- Memoize Objects使用useMemo
- Memoize Fucntions 使用useCallback

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fab824bbd3546d7acad04418c9405de~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=522\&s=167631\&e=png\&b=f7f7f7)

Memoize component 组件可以通过 `memo` 函数实现，组件使用 memo 函数后，只要 **props 保持不变**，那父组件 re-render 时就不会被影响触发 re-render，当然**组件内部**的 `state` 或者依赖的上下文等内容发生变更依旧会 **re-render**。注意，不是所有组件都要进行记忆化提升性能，记忆化也是具有成本的，需要衡量收益，一般 `memo` 函数用于**组件会经常无效** `re-render`、组件本身渲染非常耗时等场景。

```javascript 
import { memo, useState } from "react";

const SlowComponent = memo(function SlowComponent() {
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (<li key={i}>{i}: {word}</li>))}
    </ul>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!? - {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent />
    </div>
  );
}

```


![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a08116ddd3dd4f26ad8d553417140640~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=250\&s=82701\&e=png\&b=ffffff)

依旧是优化 1 中的示例，我们将 SlowComponent 组件通过 memo 函数记忆化后，再次点击计数按钮，SlowComponent 组件没有发生 re-render，这是由于 SlowComponent 没有 props，也就是说不会有变化，因此父组件 re-render 就影响不到子组件了。

```javascript 
import { memo, useState } from "react";

const SlowComponent = memo(function SlowComponent({ config }) {
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <>
      <p>{config.title}</p>
      <ul>
        {words.map((word, i) => (<li key={i}>{i}: {word}</li>))}
      </ul>
    </>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const config = {
    title: "hello, world",
  };
  return (
    <div>
      <h1>Slow counter?!? - {count}</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      <SlowComponent config={config} />
    </div>
  );
}

```


![](./assets/image/image_K7d3b6oCgH.png)

在 React 中，**每一次 render 所有的内容都会被创建，包括 objects 和 functions**，这会导致如果 objects 或 functions 作为 props，那么每一次父组件 re-render，子组件依旧会被 re-render，即使使用了 memo 函数将子组件记忆化，这是由于在 JS 中两个 objects 或 functions 看起来是一样，但实际是不等的，即{} !=={}，例如上面的例子，config 是一个 object，即使不会发生改变，已经会认为将其作为 props 传入是不一样的，导致 SlowComponent 在使用 memo 函数后依旧被 re-render 了。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c017c704cc942c7864aebb08d72c3b1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=533\&s=169081\&e=png\&b=f7f7f7)

为了使 objects 和 functions 也能够进行记忆化，react 分别提供了 `useMemo` 和 `useCallback`，其跟 useEffect 一样有一个依赖数组，只有依赖数组内容发生改变，值才会被重新创建，因此只要依赖内容保持不变，通过 useMemo 和 useCallback 的值会返回一样的内容。跟 memo 函数一样，并不是任何时刻都要通过 useMemo 和 useCallback 将内容进行记忆化，一般常用于以下几个场景：

1. 将 props 记忆化避免过多的无效 re-render；
2. 将值记忆化防止每次渲染都进行相同开销计算，有些类似于 Vue 中的 computed 功能；
3. 将用于其他 hook 依赖数组中的内容进行记忆化，例如避免无穷的useEffect循环；

```javascript 
import { memo, useCallback, useMemo, useState } from "react";

const SlowComponent = memo(function SlowComponent({ config, onClick }) {
  const words = Array.from({ length: 100_0 }, () => "WORD");
  return (
    <>
      <p>{config.title}</p>
      <ul>
        {words.map((word, i) => (
          <li key={i}>
            {i}: {word} <button onClick={onClick}> click</button>
          </li>
        ))}
      </ul>
    </>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const config = useMemo(() => {
    // 一般可以进行一些复杂计算
    return {
      title: "hello, world",
    };
  }, []);
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  return (
    <div>
      <h1>Slow counter?!? - {count}</h1>
      <button onClick={handleClick}>Increase: {count}</button>
      <SlowComponent config={config} onClick={handleClick} />
    </div>
  );
}

```


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f098363596e488bbaff98adcf1985a9~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1867\&h=239\&s=81236\&e=png\&b=fefefe)

如上面例子，我们将传入 SlowComponent 的 props 中的 config（object）使用 useMemo 记忆化，将 onClick（function）使用 useCallback 记忆化，再次执行发现 SlowComponent 组件就没有发生 re-render 了。
