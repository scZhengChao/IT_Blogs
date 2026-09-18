# Hook 概览

## 目录

- [Hook 简介](#Hook-简介)
  - [没有破坏性改动](#没有破坏性改动)
  - [动机](#动机)
  - [在组件之间复用状态逻辑很难](#在组件之间复用状态逻辑很难)
  - [复杂组件变得难以理解](#复杂组件变得难以理解)
  - [难以理解的 class](#难以理解的-class)
  - [渐进策略](#渐进策略)
- [Hook 概览](#Hook-概览)
  - [State Hook](#State-Hook)
    - [声明多个 state 变量](#声明多个-state-变量)
    - [函数式更新](#函数式更新)
    - [惰性初始 state](#惰性初始-state)
    - [跳过 state 更新](#跳过-state-更新)
  - [Effect Hook](#Effect-Hook)
    - [提示: 使用多个 Effect 实现关注点分离](#提示-使用多个-Effect-实现关注点分离)
    - [提示: 通过跳过 Effect 进行性能优化](#提示-通过跳过-Effect-进行性能优化)
  - [Hook 使用规则](#Hook-使用规则)
  - [自定义Hooks](#自定义Hooks)
  - [其他 Hook](#其他-Hook)
    - [useContext](#useContext)
  - [Hook API 索引](#Hook-API-索引)

# Hook 简介

*Hook*是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```vue 
 import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```


注意React 16.8.0 是第一个支持 Hook 的版本。升级时，请注意更新所有的 package，包括 React DOM。 React Native 从 [0.59 版本](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059 "0.59 版本")开始支持 Hook。

## 没有破坏性改动

在我们继续之前，请记住 Hook 是：

- 完全可选的。 你无需重写任何已有代码就可以在一些组件中尝试 Hook。但是如果你不想，你不必现在就去学习或使用 Hook。
- 100% 向后兼容的。 Hook 不包含任何破坏性改动。
- 现在可用。 Hook 已发布于 v16.8.0。

        没有计划从 React 中移除 class。

 你可以在本页[底部的章节](https://react.docschina.org/docs/hooks-intro.html#gradual-adoption-strategy "底部的章节")读到更多关于 Hook 的渐进策略。Hook 不会影响你对 React 概念的理解。恰恰相反，Hook 为已知的 React 概念提供了更直接的 API：props， state，context，refs 以及生命周期。稍后我们将看到，Hook 还提供了一种更强大的方式来组合他们。

        如果不想了解添加 Hook 的具体原因，可以直接[跳到下一章节开始学习 Hook！](https://react.docschina.org/docs/hooks-overview.html "跳到下一章节开始学习 Hook！")当然你也可以继续阅读这一章节来了解原因，并且可以学习到如何在不重写应用的情况下使用 Hook。

## 动机

          Hook 解决了我们五年来编写和维护成千上万的组件时遇到的各种各样看起来不相关的问题。无论你正在学习 React，或每天使用，或者更愿尝试另一个和 React 有相似组件模型的框架，你都可能对这些问题似曾相识。

## 在组件之间复用状态逻辑很难

            React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 

[render props](https://react.docschina.org/docs/render-props.html "render props")和 [高阶组件](https://react.docschina.org/docs/higher-order-components.html "高阶组件")。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，**你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”**。尽管我们可以[在 DevTools 过滤掉它们](https://github.com/facebook/react-devtools/pull/503 "在 DevTools 过滤掉它们")，但这说明了一个更深层次的问题：

**React 需要为共享状态逻辑提供更好的原生途径。** 你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。

Hook 使你在无需修改组件结构的情况下复用状态逻辑。这使得在组件间或社区内共享 Hook 变得更便捷。具体将在[自定义 Hook](https://react.docschina.org/docs/hooks-custom.html "自定义 Hook")中对此展开更多讨论。

## 复杂组件变得难以理解

            我们经常维护一些组件，**组件起初很简单，但是逐渐会被状态逻辑和副作用充斥**。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据。但是，同一一个 componentDidMount 中可能也包含很多其它的逻辑 **，如设置事件监听，而之后需在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。**

              在多数情况下，**不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。** 这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。



我们将在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns "使用 Effect Hook")中对此展开更多讨论。

## 难以理解的 class

             除了代码复用和代码管理会遇到困难外，我们还发现 class 是学习 React 的一大屏障。你必须去理解 JavaScript 中 this 的工作方式，这与其他语言存在巨大差异。还不能忘记绑定事件处理器。没有稳定的[语法提案](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/ "语法提案")，这些代码非常冗余 **。大家可以很好地理解 props，state 和自顶向下的数据流，但对 class 却一筹莫展。即便在有经验的 React 开发者之间，对于函数组件与 class 组件的差异也存在分歧，甚至还要区分两种组件的使用场景。**

         另外，React 已经发布五年了，我们希望它能在下一个五年也与时俱进。就像 [Svelte](https://svelte.dev/ "Svelte")，[Angular](https://angular.io/ "Angular")，[Glimmer](https://glimmerjs.com/ "Glimmer")等其它的库展示的那样，组件[预编译](https://en.wikipedia.org/wiki/Ahead-of-time_compilation "预编译")会带来巨大的潜力。尤其是在它不局限于模板的时候。最近，我们一直在使用 [Prepack](https://prepack.io/ "Prepack")来试验 [component folding](https://github.com/facebook/react/issues/7323 "component folding")，也取得了初步成效。但是我们发现使用 class 组件会无意中鼓励开发者使用一些让优化措施无效的方案。class 也给目前的工具带来了一些问题。例如，class 不能很好的压缩，并且会使热重载出现不稳定的情况。因此，我们想提供一个使代码更易于优化的 API。

             为了解决这些问题，Hook 使你在非 class 的情况下可以使用更多的 React 特性。从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数，同时也没有牺牲 React 的精神原则。Hook 提供了问题的解决方案，无需学习复杂的函数式或响应式编程技术。

## 渐进策略

总结：没有计划从 React 中移除 class。

       大部分 React 开发者会专注于开发产品，而没时间关注每一个新 API 的发布。Hook 还很新，也许等到有更多示例和教程后，再考虑学习或使用它们也不迟。

       我们也明白向 React 添加新的原生概念的门槛非常高。我们为好奇的读者准备了[详细的征求意见文档](https://github.com/reactjs/rfcs/pull/68 "详细的征求意见文档")，在文档中用更多细节深入讨论了我们推进这件事的动机，也在具体设计决策和相关先进技术上提供了额外的视角。

&#x20;       最重要的是，Hook 和现有代码可以同时工作，你可以渐进式地使用他们。

&#x20;      不用急着迁移到 Hook。我们建议避免任何“大规模重写”，尤其是对于现有的、复杂的 class 组件。开始“用 Hook 的方式思考”前，需要做一些思维上的转变。按照我们的经验，最好先在新的不复杂的组件中尝试使用 Hook，并确保团队中的每一位成员都能适应。在你尝试使用 Hook 后，欢迎给我们提供[反馈](https://github.com/facebook/react/issues/new "反馈")，无论好坏。

          我们准备让 Hook 覆盖所有 class 组件的使用场景，但是我们将继续为 class 组件提供支持。在 Facebook，我们有成千上万的组件用 class 书写，我们完全没有重写它们的计划。相反，我们开始在新的代码中同时使用 Hook 和 class。

# Hook 概览

[开始学习 React 进阶教程，一线大厂前端必备技能   ](https://datayi.cn/w/lPQ7ylD9 "开始学习 React 进阶教程，一线大厂前端必备技能   ")

[立即领取](https://datayi.cn/w/lPQ7ylD9 "立即领取")*Hook*是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

     Hook 是[向下兼容的](https://react.docschina.org/docs/hooks-intro.html#no-breaking-changes "向下兼容的")。本页面为有经验的 React 用户提供一个对 Hook 的概览。这是一个相当快速的概览，如果你有疑惑，可以参阅下面这样的黄色提示框。

## State Hook

这个例子用来显示一个计数器。当你点击按钮，计数器的值就会增加：

```vue 
 import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```


               在这里，useState 就是一个 Hook （等下我们会讲到这是什么意思）。通过在函数组件里调用它来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。useState 会返回一对值：

**当前状态和一个让你更新它的函数**，你可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 this.setState，

**但是它不会把新的 state 和旧的 state 进行合并。**（我们会在使用 State Hook 里展示一个对比 useState 和 this.state 的例子）。

**useState 唯一的参数就是初始 state**。

在上面的例子中，我们的计数器是从零开始的，所以初始 state 就是 0。值得注意的是，不同于 this.state，**这里的 state 不一定要是一个对象 —— 如果你有需要，它也可以是**。

这个初始 state 参数只有在第一次渲染时会被用到。我们声明了一个叫 count的 state 变量，然后把它设为 0 **。**

**React 会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。** 我们可以通过调用 setCount来更新当前的 count。

### 声明多个 state 变量

你可以在一个组件中多次使用 State Hook:

```vue 
 function ExampleWithManyStates() {
  // 声明多个 state 变量！
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```


             你**不必使用多个 state 变量。State 变量可以很好地存储对象和数组**，因此，你仍然可以将相关数据分为一组。然而，不**像 class 中的 this.setState，更新 state 变量总是替换它而不是合并它**。

          数组解构的语法让我们在调用 useState 时可以给 state 变量取不同的名字。当然，这些名字并不是 useState API 的一部分。React 假设当你多次调用 useState 的时候，你能保证每次渲染时它们的调用顺序是不变的。后面我们会再次解释它是如何工作的以及在什么场景下使用。

那么，什么是 Hook?

           Hook 是一些可以让你**在函数组件里“钩入” React state 及生命周期等特性的函数**。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React。（我们

[不推荐](https://react.docschina.org/docs/hooks-intro.html#gradual-adoption-strategy "不推荐")把你已有的组件全部重写，但是你可以在新组件里开始使用 Hook。）

          React 内置了一些像 useState这样的 Hook。你也可以创建你自己的 Hook 来复用不同组件之间的状态逻辑。我们会先介绍这些内置的 Hook。

### 函数式更新

              如果新的 state 需要通过使**用先前的 state 计算得出**，那么可以将函数传递给 setState。该函数将接收先前的 state，并返回一个更新后的值。下面的计数器组件示例展示了 setState 的两种用法：

```vue 
 function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```


注意与 class 组件中的 setState 方法不同，useState 不会自动合并更新对象。你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

```bash 
setState(prevState => {
  // 也可以使用 Object.assign
  return {...prevState, ...updatedValues};

});
```


useReducer 是另一种可选方案，它更适合用于管理包含多个子值的 state 对象。

### 惰性初始 state

            initialState 参数只会在组件的**初始渲染中起作用**，后续渲染时会被忽略。如果初始 state 需**要通过复杂计算获得**，则可以传\~\~**入一个函数**\~\~，在函数中计算并**返回初始的 state，此函数只在初始渲染时被调用**：

```vue 
 const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});

```


### 跳过 state 更新

           调用 State Hook 的更新函数并传入当前的 state 时，React 将跳过子组件的渲染及 effect 的执行。（React 使用 [Object.is 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description "Object.is 比较算法")来比较 state。）

&#x20;          需要注意的是，React 可能仍需要在跳过渲染前渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

## Effect Hook

        你之前可能已经在 React 组件中**执行过数据获取、订阅或者手动修改过 DOM**。

我们统一把这些操作称**为“副作用**”，或者简称为“作用”。useEffect 就是一个 Effect Hook，给函数组件**增加了操作副作用的能**力。它跟 class 组件中的 **componentDidMount、componentDidUpdate 和 componentWillUnmount 具有相同的用途，只不过被合并成了一个 API**。（我们会在使用 Effect Hook 里展示对比 useEffect 和这些方法的例子。）

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```vue 
 import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```


**当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数**。由于副作用函数是在组件内声明的，所以它们可以访问到组**件的 props 和 state。**

默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。（我们会在[使用 Effect Hook](https://react.docschina.org/docs/hooks-effect.html "使用 Effect Hook")中跟 class 组件的生命周期方法做更详细的对比。）

&#x20;      副作用函数还可以通过**返回一个函数来指定如何“清除”副作用**。例如，在下面的组件中使用副作用函数来订阅好友的在线状态，并通过取消订阅来进行清除操作：

```vue 
 import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```


            在这个示例中，React 会在组件销毁时取消对 ChatAPI 的订阅，然后在后续渲染时重新执行副作用函数。（如果传给 ChatAPI 的 props.friend.id 没有变化，你也可以告诉 React 跳过重新订阅。跟 useState一样，你可以在组件中多次使用 useEffect：

```vue 
 function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```


         通过使用 Hook，你可以把组件内相关的副作用组织在一起（例如创建订阅及取消订阅），而不要把它们拆分到不同的生命周期函数里。useEffect 会在每次渲染后都执行吗？

 是的，默认情况下，它在第一次渲染之后*和*每次更新之后都会执行。（我们稍后会谈到[如何控制它](https://react.docschina.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects "如何控制它")。）你可能会更容易接受 effect 发生在“渲染之后”这种概念，不用再去考虑“挂载”还是“更新”。React 保证了每次运行**effect 的同时，DOM 都已经更新完毕**。

            经验丰富的 JavaScript 开发人员可能会注意到，传递给 \*\*useEffect的函数在每次渲染中都会有所不同，这是刻意为之的。事实上这正是我们可以在 effect 中获取最新的 \*\*

**count的值，而不用担心其过期的原因。每次我们重新渲染，都会生成*****新的*****effect，替换掉之前的。** 某种意义上讲，effect 更像是渲染结果的一部分 —— 每个 effect “属于”一次特定的渲染。我们将在[本章节后续部分](https://react.docschina.org/docs/hooks-effect.html#explanation-why-effects-run-on-each-update "本章节后续部分")更清楚地了解这样做的意义。

提示

&#x20;       与 componentDidMount 或 componentDidUpdate 不同，使用 useEffect 调度的 effect 不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect 不需要同步地执行。在个别情况下（例如测量布局），有单独的 [useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect "useLayoutEffect")Hook 供你使用，其 API 与 useEffect 相同。

### 提示: 使用多个 Effect 实现关注点分离

                   使用 Hook 其中一个[目的](https://react.docschina.org/docs/hooks-intro.html#complex-components-become-hard-to-understand "目的")就是要解决 class 中生命周期函**数经常包含不相关的逻辑**，但又把相关逻辑分离到了几个不同方法中的问题。下述代码是将前述示例中的计数器和好友在线状态指示器逻辑组合在一起的组件

&#x20;        那么 Hook 如何解决这个问题呢？就像[你可以使用多个 ](https://react.docschina.org/docs/hooks-state.html#tip-using-multiple-state-variables "你可以使用多个 ")[*state*](https://react.docschina.org/docs/hooks-state.html#tip-using-multiple-state-variables "state")[的 Hook](https://react.docschina.org/docs/hooks-state.html#tip-using-multiple-state-variables "的 Hook")一样，你也可以使用多个 effect。这会将不相关逻辑分离到不同的 effect 中：

```vue 
 function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```


\*\*    Hook 允许我们按照代码的用途分离他们，\*\* 而不是像生命周期函数那样。React 将按照 effect 声明的顺序依次调用组件中的*每一个*effect。

### 提示: 通过跳过 Effect 进行性能优化

                在某些情况下，每**次渲染后都执行清理或者执行 effect 可能会导致性能问题**。在 class 组件中，我们可以通过在**componentDidUpdate 中添加对 prevProps 或 prevState 的比较逻辑解决**：

```vue 
 componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```


              这是很常见的需求，所以它被内置到了 useEffect的 Hook API 中。如果某些特定值在两次重渲染之间没有发生变化，你可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect的第二个可选参数即可：

```vue 
 useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // 仅在 count 更改时更新
```


                   面这个示例中，我们传入 \[count] 作为第二个参数。这个参数是什么作用呢？如果 count 的值是 5，而且我们的组件重渲染的时候 count 还是等于 5，**React 将对前一次渲染的 \[5] 和后一次渲染的 \[5] 进行比较。因为数组中的所有元素都是相等的(5 === 5)，React 会跳过这个 effect，这就实现了性能的优化**。

**如果数组中有多个元素，即使只有一个元素发生变化，React 也会执行 effect。**

注意：&#x20;

&#x20;     如果你要使用此优化方式，请确保数组中包含了所有外部作用域中会随时间变化并且在 effect 中使用的变量，否则你的代码会引用到先前渲染中的旧变量。参阅文档，了解更多关于[如何处理函数](https://react.docschina.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies "如何处理函数")以及[数组频繁变化时的措施](https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often "数组频繁变化时的措施")内容。

**如果你传入了一个空数组（\[]），effect 内部**的 props 和 state 就会一直拥有其初始值。\*\*尽管传入 \[] 作为第二个参数更接近大家更熟悉的 componentDidMount 和 componentWillUnmount 思维模式，但我们有[更好的](https://react.docschina.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies "更好的")[方式](https://react.docschina.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often "方式")来避免过于频繁的重复调用 effect。除此之外，

**请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect**，因此会使得额外操作很方便。

我们推荐启用 [eslint-pluin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation "eslint-pluin-react-hooks")中的 [exhaustive-deps](https://github.com/facebook/react/issues/14920 "exhaustive-deps")规则。此规则会在添加错误依赖时发出警告并给出修复建议。

## Hook 使用规则

Hook 就是 JavaScript 函数，但是使用它们会有

**两个额外的规则**：

- 只能在函数最外层调用 Hook。**不要在循环、条件判断或者子函数中调用。**
- 只能在 React 的函数组件中调用 Hook。**不要在其他 JavaScript 函数中调用**。（还有一个地方可以调用 Hook —— 就是**自定义的 Hook 中**，我们稍后会学习到。）

         同时，我们提供了 [linter 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks "linter 插件")来自动执行这些规则。这些规则乍看起来会有一些限制和令人困惑，但是要让 Hook 正常工作，它们至关重要。有时候我们会想要在组件之间

**重用一些状态逻辑**。目前为止，有两种主流方案来解决这个问题：[高阶组件](https://react.docschina.org/docs/higher-order-components.html "高阶组件")和 [render props](https://react.docschina.org/docs/render-props.html "render props")。自定义 Hook 可以让你在不增加组件的情况下达到同样的目的。

## 自定义Hooks

           前面，我们介绍了一个叫 FriendStatus 的组件，它通过调用 useState 和 useEffect 的 Hook 来订阅一个好友的在线状态。假设我们想在另一个组件里重用这个订阅逻辑。

**首先，我们把这个逻辑抽取到一个叫做 useFriendStatus 的自定义 Hook 里**

：

```vue 
 import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```


它将 friendID 作为参数，并返回该好友是否在线：

现在我们可以在两个组件中使用它：

```vue 
 function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```


```vue 
 function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```


           这两个组件的 state 是完全独立的。Hook 是一种复用*状态逻辑*的方式，它不复用 state 本身。事实上 Hook 的每次*调用*都有一个完全独立的 state —— 因此你可以在单个组件中多次调用同一个自定义 Hook。

            自定义 Hook 更像是**一种约定而不是功能。如果函数的名字以 “use” 开头并调用其他 Hook，我们就说这是一个自定义 Hook**。 useSomething 的命名约定可以让我们的 linter 插件在使用 Hook 的代码中找到 bug。

                  你可以创建涵盖各种场景的自定义 Hook，如表单处理、动画、订阅声明、计时器，甚至可能还有更多我们没想到的场景。我们很期待看到 React 社区会出现什么样的自定义 Hook。在两个组件中使用相同的 Hook 会共享 state 吗？

不会。自定义 Hook 是一种重用*状态逻辑*的机制(例如设置为订阅并存储当前值)，所以每次使用自定义 Hook 时，其**中的所有 state 和副作用都是完全隔离的**。

            尽量避免过早地增加抽象逻辑。既然函数组件能够做的更多，那么代码库中函数组件的代码行数可能会剧增。这属于正常现象 —— 不必立即将它们拆分为 Hook。但我们仍鼓励你能通过自定义 Hook 寻找可能，以达到简化代码逻辑，解决组件杂乱无章的目的。

## 其他 Hook

### useContext

&#x20;     除此之外，还有一些使用频率较低的但是很有用的 Hook。比如，[**useContext**](https://react.docschina.org/docs/hooks-reference.html#usecontext "useContext")

\*\* 让你不使用组件嵌套就可以订阅 React 的 Context。\*\* ​

```vue 
 function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```


          接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 \<MyContext.Provider> 的 value prop 决定。

           当组件上层最近的 \<MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即

\*\*使祖先使用 \*\*​[**React.memo**](https://react.docschina.org/docs/react-api.html#reactmemo "React.memo")**或 **[**shouldComponentUpdate**](https://react.docschina.org/docs/react-component.html#shouldcomponentupdate "shouldComponentUpdate")**，也会在组件本身使用 useContext 时重新渲染。**

别忘记 useContext 的参数必须是 *context 对象本身*：

- 正确： useContext(MyContext)
- 错误： useContext(MyContext.Consumer)
- 错误： useContext(MyContext.Provider)

       调用了 useContext 的组件总会在 context 值变化时重新渲染。如果重渲染组件的开销较大，你可以 [通过使用 memoization 来优化](https://github.com/facebook/react/issues/15156#issuecomment-474590693 "通过使用 memoization 来优化")。

提示

如果你在接触 Hook 前已经对 context API 比较熟悉，那应该可以理解，useContext(MyContext) 相当于 class 组件中的 static contextType = MyContext 或者 \<MyContext.Consumer>。

useContext(MyContext) 只是让你能够*读取*context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 \<MyContext.Provider> 来为下层组件

*提供*context。

```vue 
 const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```


## Hook API 索引

本页面主要描述 React 中内置的 Hook API。

如果你刚开始接触 Hook，那么可能需要先查阅 

[Hook 概览](https://react.docschina.org/docs/hooks-overview.html "Hook 概览")

。你也可以在 

[Hooks FAQ](https://react.docschina.org/docs/hooks-faq.html "Hooks FAQ")

 章节中获取有用的信息。

- [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks "基础 Hook")
  - [useState](https://react.docschina.org/docs/hooks-reference.html#usestate "useState")
  - [useEffect](https://react.docschina.org/docs/hooks-reference.html#useeffect "useEffect")
  - [useContext](https://react.docschina.org/docs/hooks-reference.html#usecontext "useContext")
- [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks "额外的 Hook")
  - [useReducer](https://react.docschina.org/docs/hooks-reference.html#usereducer "useReducer")
  - [useCallback](https://react.docschina.org/docs/hooks-reference.html#usecallback "useCallback")
  - [useMemo](https://react.docschina.org/docs/hooks-reference.html#usememo "useMemo")
  - [useRef](https://react.docschina.org/docs/hooks-reference.html#useref "useRef")
  - [useImperativeHandle](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle "useImperativeHandle")
  - [useLayoutEffect](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect "useLayoutEffect")
  - [useDebugValue](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue "useDebugValue")
