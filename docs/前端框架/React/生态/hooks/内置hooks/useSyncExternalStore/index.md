# useSyncExternalStore

## 目录

- [参数 ](#参数-)
- [返回值 ](#返回值-)
- [警告](#警告)
- [使用 ](#使用-)
  - [订阅外部 store](#订阅外部-store)
  - [注意](#注意)
  - [订阅浏览器 API ](#订阅浏览器-API-)
  - [把逻辑抽取到自定义 Hook ](#把逻辑抽取到自定义-Hook-)
  - [添加服务端渲染支持 ](#添加服务端渲染支持-)

`useSyncExternalStore` 是一个让你订阅外部 store 的 React Hook。

```javascript 
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)

```


- [参考](https://zh-hans.react.dev/reference/react/useSyncExternalStore#reference "参考")
  - [useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)](https://zh-hans.react.dev/reference/react/useSyncExternalStore#usesyncexternalstore "useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)")
- [使用](https://zh-hans.react.dev/reference/react/useSyncExternalStore#usage "使用")
  - [订阅外部 store](https://zh-hans.react.dev/reference/react/useSyncExternalStore#subscribing-to-an-external-store "订阅外部 store")
  - [订阅浏览器 API](https://zh-hans.react.dev/reference/react/useSyncExternalStore#subscribing-to-a-browser-api "订阅浏览器 API")
  - [把逻辑抽取到自定义 Hook](https://zh-hans.react.dev/reference/react/useSyncExternalStore#extracting-the-logic-to-a-custom-hook "把逻辑抽取到自定义 Hook")
  - [添加服务端渲染支持](https://zh-hans.react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering "添加服务端渲染支持")

#### 参数&#x20;

- `subscribe`：一个函数，接收一个单独的 `callback` 参数并把它订阅到 store 上。当 store 发生改变，它应当调用被提供的 `callback`。这会导致组件重新渲染。`subscribe` 函数会返回清除订阅的函数。
- `getSnapshot`：一个函数，返回组件需要的 store 中的数据快照。在 store 不变的情况下，重复调用 `getSnapshot` 必须返回同一个值。如果 store 改变，并且返回值也不同了（用 [Object.is](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is "Object.is") 比较），React 就会重新渲染组件。
- **可选** `getServerSnapshot`：一个函数，返回 store 中数据的初始快照。**它只会在服务端渲染时，以及在客户端进行服务端渲染内容的 hydration 时被用到。** 快照在服务端与客户端之间必须相同，它通常是从服务端序列化并传到客户端的。如果你忽略此参数，在服务端渲染这个组件会抛出一个错误。

#### 返回值&#x20;

该 store 的当前快照，可以在你的渲染逻辑中使用。

#### 警告

- `getSnapshot` 返回的 store 快照必须是不可变的。如果底层 store 有可变数据，要在数据改变时返回一个新的不可变快照。否则，返回上次缓存的快照。
- 如果在重新渲染时传入一个不同的 `subscribe` 函数，React 会用新传入的 `subscribe` 函数重新订阅该 store。你可以通过在组件外声明 `subscribe` 来避免。

## 使用&#x20;

### 订阅外部 store

```javascript 
// app.js
import { useSyncExternalStore } from 'react';
import { todosStore } from './todoStore.js';

export default function TodosApp() {
  const todos = useSyncExternalStore(todosStore.subscribe, todosStore.getSnapshot);
  return (
    <>
      <button onClick={() => todosStore.addTodo()}>Add todo</button>
      <hr />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

// todoStore.js
// 这是一个第三方 store 的例子，
// 你可能需要把它与 React 集成。

// 如果你的应用完全由 React 构建，
// 我们推荐使用 React state 替代。

let nextId = 0;
let todos = [{ id: nextId++, text: 'Todo #1' }];
let listeners = [];

export const todosStore = {
  addTodo() {
    todos = [...todos, { id: nextId++, text: 'Todo #' + nextId }]
    emitChange();
  },
  subscribe(listener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return todos;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}


```


### 注意

当可能的时候，我们推荐通过 [useState](https://zh-hans.react.dev/reference/react/useState "useState") 和 [useReducer](https://zh-hans.react.dev/reference/react/useReducer "useReducer") 使用内建的 React state 代替。如果你需要去**集成已有的非 React 代码**，`useSyncExternalStore` API 是很有用的。

### 订阅浏览器 API&#x20;

添加 `useSyncExternalStore` 的另一个场景是当你想订阅一些由浏览器暴露的并随时间变化的值时。例如，假设你想要组件展示网络连接是否正常。浏览器通过一个叫做 [navigator.onLine](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/onLine "navigator.onLine") 的属性暴露出这一信息。

这个值可能在 React 不知道的情况下改变，所以你应当通过 `useSyncExternalStore` 来读取它。

```javascript 
import { useSyncExternalStore } from 'react';

export default function ChatIndicator() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot);
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function getSnapshot() {
  return navigator.onLine;
}

function subscribe(callback) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}


```


### 把逻辑抽取到自定义 Hook&#x20;

通常不会在组件里直接用 `useSyncExternalStore`，而是在自定义 Hook 里调用它。这使得你可以在不同组件里使用相同的外部 store。

例如：这里自定义的 `useOnlineStatus` Hook 追踪网络是否在线：

现在不同的组件都可以调用 `useOnlineStatus`，而不必重复底层实现：

### 添加服务端渲染支持&#x20;

如果你的 React 应用使用 [服务端渲染](https://zh-hans.react.dev/reference/react-dom/server "服务端渲染")，你的 React 组件也会运行在浏览器环境之外来生成初始 HTML。这给连接到外部 store 造成了一些挑战：

- 如果你连接到一个浏览器特有的 API，因为它在服务端不存在，所以是不可行的。
- 如果你连接到一个第三方 store，数据要在服务端和客户端之间相匹配。

为了解决这些问题，要传一个 `getServerSnapshot` 函数作为第三个参数给 `useSyncExternalStore`：

`getServerSnapshot` 函数与 `getSnapshot` 相似，但它只在两种情况下才运行：

- 在服务端生成 HTML 时。
- 在客户端 [hydration](https://zh-hans.react.dev/reference/react-dom/client/hydrateRoot "hydration") 时，即：当 React 拿到服务端的 HTML 并使其可交互。

这使得你能提供在应用可交互前可用的初始快照值。如果没有对服务器端渲染来说有意义的初始值，就省略这个参数来 [强制客户端渲染](https://zh-hans.react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-server-only-content "强制客户端渲染")。
