# hooks总结

## 目录

- [动机（官方）](#动机官方)
- [基础hook](#基础hook)
  - [useState](#useState)
- [额外的Hooks](#额外的Hooks)
  - [useCallback](#useCallback)
  - [useMemo](#useMemo)
  - [useRef](#useRef)
    - [callback ref](#callback-ref)
  - [useReducer ](#useReducer)
    - [指定初始 state](#指定初始-state)
    - [惰性初始化](#惰性初始化)
    - [跳过 dispatch](#跳过-dispatch)
  - [useImperativeHandle](#useImperativeHandle)

## 动机（官方）

- 组件之间很难重用有状态逻辑
- 复杂的组件变得难以理解
- 类 class 混淆了人和机器
- 更符合 FP 的理解, React 组件本身的定位就是函数，一个吃进数据、吐出 UI 的函数

# 基础hook

## useState

```javascript 
    const [state, setState] = useState(initialState)    
```


- useState 有一个参数，该参数可以为任意数据类型，一般用作默认值
- useState 返回值为一个数组，数组的第一个参数为我们需要使用的 state，第二个参数为一个 setFn。
- 完整例子

```javascript 
 function Love() {
    const [like, setLike] = useState(false)
    const likeFn = () => (newLike) => setLike(newLike)
    return (
      <>
        你喜欢我吗: {like ? 'yes' : 'no'}
        <button onClick={likeFn(true)}>喜欢</button>
        <button onClick={likeFn(false)}>不喜欢</button>
      </>
    )
  }
```


[https://mp.weixin.qq.com/s/kcgMcwf0Oc4uPU39xhArpA](https://mp.weixin.qq.com/s/kcgMcwf0Oc4uPU39xhArpA "https://mp.weixin.qq.com/s/kcgMcwf0Oc4uPU39xhArpA")

  别人写的总结：用的时候可以看一下；

注意：

如果初始值是个函数；取得是他的返回值；而不是函数本身

1. 调用 useState 方法的时候做了什么?这是一种在函数调用时保存变量的方式 —— useState是一种新方法，它与 class 里面的 this.state提供的功能完全相同。一般来说，在函数退出后变量就会”消失”，而 state 中的变量会被 React 保留。我们声明了一个叫 count 的 state 变量，然后把它设为 0。**React 会在重复渲染时记住它当前的值**，并且提供最新的值给我们的函数。我们可以通过调用 setCount 来更新当前的 count。&#x20;

```javascript 
 useState 第二个参数为useState的索引
```


# 额外的Hooks

## useCallback

```vue 
 const memoizedCallback = useCallback(  
  () => {     
      doSomething(a, b);   
  },   [a, b], );
```


返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization "memoized")回调函数。把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把

**回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。**

**useCallback(fn, deps)相当于 **useMemo(() => fn, deps)**。**

注意依赖项数组不会作为参数传给回调函数。虽然从概念上来说它表现为：所有回调函数中引用的值都应该出现在依赖项数组中。未来编译器会更加智能，届时自动创建数组将成为可能。

我们推荐启用 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation "eslint-plugin-react-hooks")中的 [exhaustive-deps](https://github.com/facebook/react/issues/14920 "exhaustive-deps")规则。此规则会在添加错误依赖时发出警告并给出修复建议。

为了性能优化而生：

不必要每个函数都用useCallback 包一下；说的很清楚；

1.函数执行只代表执行了render；如果两个虚拟dom没有差异；就不会跟新dom， 不代表操作了dom元素。

2.明确说了传递给经过优化并使用引用相等性区避免非必要渲染的子组件时，他将非常有用，啥意思用memo包裹一下子组件，方法就用useCallback,属性就用useMemo

场合memo一起用：

```javascript 
 function PageA(props:any) {
    const { onClick, children } = props
    console.log('a---render ')
    return  <TouchableOpacity onPress={onClick}>
                <Text>{children}</Text>
            </TouchableOpacity>
  }
  
  function PageB ({ onClick, name }) {
      console.log('b----render')
    useEffect(()=>{
        console.log('b Mounted')
        return ()=>{ }
    },[])
    return <TouchableOpacity onPress={onClick}>
                    <Text>{name}</Text>
            </TouchableOpacity>
  }
  const PageC = memo(PageB)

  function UseCallback() {
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
  
    const handleClick1 = () => {
      setA(a + 1)
    }
    // const handleClick2 =() => {
    //     setB(b + 1)
    //   }
    
    const handleClick2 = useCallback(() => {
      setB(b + 1)
    }, [b])
  
    return (
      <>
        <PageA onClick={handleClick1}>{a}</PageA>
        <PageC onClick={handleClick2} name={b} />
      </>
    )
  }
```


memo与PureComponent比较类似，前者是对Function Component的优化，后者是对Class Component的优化，都会对传入组件的数据进行浅比较 **，**

\*\*memo缓存的是组件本身，是站在全局的角度进行优化    \*\*

```bash 
   const handleClick2 = useCallback(() => {
      setB(b + 1)
    }, [b])
```


useCallback 则是对函数的缓存，依赖项b不变化；则handleCick 不必变化；就应该缓存起来，提高性能，减少对资源的浪费

需不需要每个函数都是用useCallback；它的目的是为了一些子组件不必要的重新渲染。

## useMemo

```vue 
 const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```


返回一个 [memoized](https://en.wikipedia.org/wiki/Memoization "memoized")值。

           把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

**记住，传入 useMemo 的函数会在渲染期间执行。请不要在这个函数内部执行与渲染无关的操作，诸如副作用这类的操作属于 useEffect 的适用范畴，而不是 useMemo。**

如果没有提供依赖项数组，useMemo 在每次渲染时都会计算新的值。

           你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。

将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

注意：

&#x20;          依赖项数组不会作为参数传给“创建”函数。虽然从概念上来说它表现为：所有“创建”函数中引用的值都应该出现在依赖项数组中。未来编译器会更加智能，届时自动创建数组将成为可能。

我们推荐启用 [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation "eslint-plugin-react-hooks")中的 [exhaustive-deps](https://github.com/facebook/react/issues/14920 "exhaustive-deps")规则。此规则会在添加错误依赖时发出警告并给出修复建议。

**注意：**

**useMemo  缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态**

## useRef

```vue 
 const refContainer = useRef(initialValue);
```


         useRef 返回一个可变的 ref 对象，其 **.current 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。**

一个常见的用例便是命令式地访问子组件：

**（注意：这个地方不能用箭头函数）**

```javascript 
 function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
//或者：

function Image(props) {
  // ⚠️ IntersectionObserver 在每次渲染都会被创建
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}


function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver 只会被惰性创建一次
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // 当你需要时，调用 getObserver()
  // ...
}

```


本质上，useRef 就像是可以在其 .current 属性中保存一个可变值的“盒子”。你应该熟悉 ref 这一种[访问 DOM](https://react.docschina.org/docs/refs-and-the-dom.html "访问 DOM")的主要方式。如果你将 ref 对象以 \<div ref={myRef} /> 形式传入组件，则无论该节点如何改变，React 都会将 ref 对象的 .current 属性设置为相应的 DOM 节点。

**然而，useRef() 比 ref 属性更有用。它可以**[**很方便地保存任何可变值**](https://react.docschina.org/docs/hooks-faq.html#is-there-something-like-instance-variables "很方便地保存任何可变值")**，其类似于在 class 中使用实例字段的方式。 这是因为它创建的是一个普通 Javascript 对象。**

**而 useRef() 和自建一个 {current: ...} 对象的唯一区别是，useRef 会在每次渲染时返回同一个 ref 对象。**

            请记住，**当 ref 对象内容发生变化时，useRef 并*****不会*****通知你**。变更 .current 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，

**则需要使用**[**回调 ref**](https://react.docschina.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node "回调 ref")**来实现。**

### [callback ref](https://react.docschina.org/docs/refs-and-the-dom.html#callback-refs "callback ref")

获取 DOM 节点的位置或是大小的基本方式是使用 [callback ref](https://react.docschina.org/docs/refs-and-the-dom.html#callback-refs "callback ref")。每当 ref 被附加到一个另一个节点，React 就会调用 callback。这里有一个 [小 demo](https://codesandbox.io/s/l7m0v5x4v9 "小 demo"):

```bash 
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}

```


在这个案例中，我们没有选择使用 `useRef`，因为当 ref 是一个对象时它并不会把当前 ref 的值的 *变化* 通知到我们。使用 callback ref 可以确保 [即便子组件延迟显示被测量的节点](https://codesandbox.io/s/818zzk8m78 "即便子组件延迟显示被测量的节点") (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。

注意到我们传递了 `[]` 作为 `useCallback` 的依赖列表。这确保了 ref callback 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。

在此示例中，当且仅当组件挂载和卸载时，callback ref 才会被调用，因为渲染的 `<h1>` 组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，则可能需要使用 [ResizeObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver "ResizeObserver") 或基于其构建的第三方 Hook。

如果你愿意，你可以 [把这个逻辑抽取出来作为](https://codesandbox.io/s/m5o42082xy "把这个逻辑抽取出来作为") 一个可复用的 Hook:

```bash 
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null &&
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

```


## [useReducer](https://react.docschina.org/docs/hooks-reference.html#usereducer "useReducer") 

```vue 
 const [state, dispatch] = useReducer(reducer, initialArg, init);
```


另外 [useReducer](https://react.docschina.org/docs/hooks-reference.html#usereducer "useReducer")可以让你通过 reducer 来管理组件本地的复杂 state。

```vue 
 function Todos() {   
  const [todos, dispatch] = useReducer(todosReducer);   
// ...
```


            例如，有个复杂的组件，其中包含了大量以特殊的方式来管理的内部状态。useState并不会使得集中更新逻辑变得容易，因此你可能更愿意使用 [redux](http://redux.js.org/ "redux")中的 reducer 来编写、

```vue 
 function todosReducer(state, action) {   
  switch (action.type) {     
      case 'add':       
        return [...state, {         text: action.text,         completed: false       }];   
        // ... other actions ...     
        default:       
      return state;   
} }

```


                Reducers 非常便于单独测试，且易于扩展，以表达复杂的更新逻辑。如有必要 **，您可以将它们分成更小的 reducer**。但是，你可能还享受着 React 内部 state 带来的好处，或者可能根本不想安装其他库。Reducers 非常便于单独测试，且易于扩展，以表达复杂的更新逻辑。如有必要，您可以将它们

**分成更小的 reducer**。但是，你可能还享受着 React 内部 state 带来的好处，或者可能根本不想安装其他库。

那么，为什么我们不编写一个 useReducer 的 Hook，使用 reducer 的方式来管理组件的内部 state 呢？其简化版本可能如下所示：

```vue 
 function useReducer(reducer, initialState) {   
  const [state, setState] = useState(initialState);   
    function dispatch(action) {    
      const nextState = reducer(state, action);     
      setState(nextState);  
    }   
  return [state, dispatch]; 
}

```


在组件中使用它，让 reducer 驱动它管理 state：

```vue 
 function Todos() {   
  const [todos, dispatch] = useReducer(todosReducer, []);  
  function handleAddClick(text) {     
    dispatch({ type: 'add', text });   
  }   
// ...
}

```


                在复杂组件中使用 reducer 管理内部 state 的需求很常见，**我们已经将 useReducer的 Hook 内置到 React 中**。你可以在 [Hook API 索引](https://react.docschina.org/docs/hooks-reference.html "Hook API 索引")中找到它使用，搭配其他内置的 Hook 一起使用在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为[你可以向子组件传递 dispatch 而不是回调函数](https://zh-hans.reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down "你可以向子组件传递 dispatch 而不是回调函数")。&#x20;

\*\*注意 \*\*

**React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 的依赖列表中省略 dispatch。**

### 指定初始 state

                  有两种不同初始化 useReducer state 的方式，你可以根据使用场景选择其中的一种。将**初始 state 作为第二个**参数传入 useReducer 是最简单的方法：

```vue 
 const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```


注意

React 不使用 state = initialState 这一由 Redux 推广开来的参数约定。有时候初始值依赖于 props，因此需要在调用 Hook 时指定。如果你特别喜欢上述的参数约定，可以通过调用 useReducer(reducer, undefined, reducer) 来模拟 Redux 的行为，但我们不鼓励你这么做。

### 惰性初始化

      你可以选择惰性地创建初始 state。为此，需要将 init 函数作为 useReducer 的第三个参数传入 \*\*，这样初始 state 将被设置为 init(initialArg)。**这么做可以将**用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利 \*\*：

```vue 
 function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}

```


### 跳过 dispatch

             如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 [Object.is 比较算法](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description "Object.is 比较算法")来比较 state。）

          需要注意的是，React 可能仍需要在跳过渲染前再次渲染该组件。不过由于 React 不会对组件树的“深层”节点进行不必要的渲染，所以大可不必担心。如果你在渲染期间执行了高开销的计算，则可以使用 useMemo 来进行优化。

## useImperativeHandle

```javascript 
 useImperativeHandle(ref, createHandle, [deps])
```


useImperativeHandle可以让你在使用 ref时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle应当与 [forwardRef](https://react.docschina.org/docs/react-api.html#reactforwardref "forwardRef")一起使用：

```javascript 
 function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```


在本例中，渲染 \<FancyInput ref={inputRef} /> 的父组件可以调用 inputRef.current.focus()。&#x20;

注意：current时useRef多加了一层；如果你用函数的方式接受；就没有current这一层；
