# useEffectEvent&#x20;

## 目录

- [声明一个 Effect Event (实验性api)](#声明一个-Effect-Event-实验性api)
  - [使用 Effect Event 读取最新的 props 和 state](#使用-Effect-Event-读取最新的-props-和-state)
  - [注意](#注意)
    - [抑制依赖项检查是可行的吗？](#抑制依赖项检查是可行的吗)
  - [Effect Event 的局限性](#Effect-Event-的局限性)
- [把事件处理函数传到自定义 Hook 中](#把事件处理函数传到自定义-Hook-中)

# 声明一个 Effect Event (实验性api)

使用 [useEffectEvent](https://zh-hans.react.dev/reference/react/experimental_useEffectEvent "useEffectEvent") 这个特殊的 Hook 从 Effect 中提取非响应式逻辑：

```javascript 
import { useEffect, useEffectEvent } from 'react';

function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });
  // ...
```


这里的 `onConnected` 被称为 **Effect Event**。它**是 Effect 逻辑的一部分，但是其行为更像事件处理函数**。它内部的逻辑不是响应式的，而且能**一直“看见”最新的 props 和 state**。

现在你可以在 Effect 内部调用 `onConnected` Effect Event：

```javascript 
function ChatRoom({ roomId, theme }) {
   const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  }); 

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
   }, [roomId]); // ✅ 声明所有依赖项 
  // ...
```


这个方法解决了问题。注意你必须从 Effect 依赖项中 **移除** `onConnected`。**Effect Event 是非响应式的并且必须从依赖项中删除**。

你可以将 Effect Event 看成和事件处理函数相似的东西。主要区别是事件处理函数只在响应用户交互的时候运行，而 Effect Event 是你在 Effect 中触发的。Effect Event 让你在 Effect 响应性和不应是响应式的代码间“打破链条”。

### 使用 Effect Event 读取最新的 props 和 state

**这个方案解决了好多依赖嵌套的问题**

Effect Event 可以修复之前许多你可能试图抑制依赖项检查工具的地方。

例如，假设你有一个记录页面访问的 Effect：

```javascript 
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
   }, [url]); // 🔴 React Hook useEffect 缺少依赖项: ‘numberOfItems’ 
  // ...
}
```


你在 Effect 内部使用了 `numberOfItems`，所以代码检查工具会让你把它加到依赖项中。但是，你 **不** 想要 `logVisit` 调用响应 `numberOfItems`。如果用户把某样东西放入购物车， `numberOfItems` 会变化，这 **并不意味着** 用户再次访问了这个页面。换句话说，在某种意义上，**访问页面** 是一个“事件”。它发生在某个准确的时刻。

将代码分割为两部分：

```javascript 
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

   const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  }); 

  useEffect(() => {
     onVisit(url); 
  }, [url]); // ✅ 声明所有依赖项
  // ...
}
```


这里的 `onVisit` 是一个 Effect Event。里面的代码不是响应式的。这就是为什么你可以使用 `numberOfItems`（或者任意响应式值！）而不用担心引起周围代码因为变化而重新执行。

另一方面，Effect 本身仍然是响应式的。其内部的代码使用了 `url` props，所以每次因为不同的 `url` 重新渲染后 Effect 都会重新运行。这会依次调用 `onVisit` 这个 Effect Event。

**结果是你会因为 ****`url`**** 的变化去调用 ****`logVisit`****，并且读取的一直都是最新的 ****`numberOfItems`****。但是如果 ****`numberOfItems`**** 自己变化，不会引起任何代码的重新运行。**

### 注意

你可能想知道是否可以无参数调用 `onVisit()` 并且读取内部的 `url`：

```javascript 
const onVisit = useEffectEvent(() => {
     logVisit(url, numberOfItems); 
  });

  useEffect(() => {
     onVisit(); 
  }, [url]);
```


这可以起作用，但是更好的方法是将这个 `url` 显式传递给Effect Event。**通过将 ****`url`**** 作为参数传给 Effect Event，你可以说从用户角度来看使用不同的 ****`url`**** 访问页面构成了一个独立的“事件”**。`visitedUrl` 是发生的“事件”的一部分：

```javascript 
 const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems); 
  });

  useEffect(() => {
     onVisit(url); 
  }, [url]);
```


**由于 Effect 明确“要求” ****`visitedUrl`****，所以现在你不会不小心地从 Effect 的依赖项中移除`url`**。**如果你移除了 ****`url`**** 依赖项（导致不同的页面访问被认为是一个），代码检查工具会向你提出警告**。如果你想要 `onVisit` 能对 `url` 的变化做出响应，不要读取内部的 `url`（这里不是响应式的），而是应该将它 **从** Effect 中传入。

如果 Effect 内部有一些异步逻辑，这就变得非常重要了：

```javascript 
 const onVisit = useEffectEvent(visitedUrl => {
    logVisit(visitedUrl, numberOfItems);
  });

  useEffect(() => {
    setTimeout(() => {
      onVisit(url);
    }, 5000); // 延迟记录访问
  }, [url]);
```


在这里，`onVisit` 内的 `url` 对应 **最新的** `url`（可能已经变化了），但是 `visitedUrl` 对应的是最开始引起这个 Effect（并且是本次 `onVisit` 调用）运行的 `url` 。

#### 抑制依赖项检查是可行的吗？

在已经存在的代码库中，你可能有时会看见像这样的检查规则抑制：

```javascript 
function Page({ url }) {
  const { items } = useContext(ShoppingCartContext);
  const numberOfItems = items.length;

  useEffect(() => {
    logVisit(url, numberOfItems);
     // 🔴 避免像这样抑制代码检查:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); 
  // ...
}
```


等 `useEffectEvent` 成为 React 稳定部分后，我们会推荐 **永远不要抑制代码检查工具**。

```javascript 
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

  function handleMove(e) {
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  }

  useEffect(() => {
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
     // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, []);
```


**如果你从来没有抑制代码检查，就永远不会遇见过期值的问题。**

```javascript 
export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [canMove, setCanMove] = useState(true);

   const onMove = useEffectEvent(e => { 
    if (canMove) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  });

  useEffect(() => {
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
```


这不意味着 `useEffectEvent` **总是** 正确的解决方案。你**只能把它用在你不需要变成响应式的代码上**。

### Effect Event 的局限性

Effect Event 的局限性在于你如何使用他们：

- **只在 Effect 内部调用他们**。
- **永远不要把他们传给其他的组件或者 Hook**。

例如不要像这样声明和传递 Effect Event：

```javascript 
function Timer() {
  const [count, setCount] = useState(0);

   const onTick = useEffectEvent(() => {
    setCount(count + 1);
  }); 

   useTimer(onTick, 1000); // 🔴 Avoid: 传递 Effect Event 

  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  useEffect(() => {
    const id = setInterval(() => {
      callback();
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay, callback]); // 需要在依赖项中指定“callback”
}
```


**取而代之的是，永远直接在使用他们的 Effect 旁边声明 Effect Event：**

```javascript 
function Timer() {
  const [count, setCount] = useState(0);
  useTimer(() => {
    setCount(count + 1);
  }, 1000);
  return <h1>{count}</h1>
}

function useTimer(callback, delay) {
  const onTick = useEffectEvent(() => {
    callback();
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick(); // ✅ Good: 只在 Effect 内部局部调用
    }, delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]); // 不需要指定 “onTick” (Effect Event) 作为依赖项
}
```


# 把事件处理函数传到自定义 Hook 中

```javascript 
export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
     onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    } 
  });
```


完成这个工作需要修改自定义 Hook，把 `onReceiveMessage` 作为其命名选项之一：

```javascript 
export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
       onReceiveMessage(msg); 
    });
    return () => connection.disconnect();
   }, [roomId, serverUrl, onReceiveMessage]); // ✅ 声明了所有的依赖 
}
```


这个修改有效果，但是当自定义 Hook 接受事件处理函数时，你还可以进一步改进。

**增加对 ****`onReceiveMessage`**** 的依赖并不理想**，因为每次组件重新渲染时聊天室就会重新连接。 通过 [将这个事件处理函数包裹到 Effect Event 中来将它从依赖中移除](https://zh-hans.react.dev/learn/removing-effect-dependencies#wrapping-an-event-handler-from-the-props "将这个事件处理函数包裹到 Effect Event 中来将它从依赖中移除")：

```javascript 
import { useEffect, useEffectEvent } from 'react'; 
// ...

export function useChatRoom({ serverUrl, roomId, onReceiveMessage }) {
   const onMessage = useEffectEvent(onReceiveMessage); 

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    return () => connection.disconnect();
   }, [roomId, serverUrl]); // ✅ 声明所有依赖 
}
```
