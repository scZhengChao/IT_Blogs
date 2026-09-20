# react && socket

## 目录

- [创建 Socket Context](#创建-Socket-Context)
- [根组件提供 socket](#根组件提供-socket)
- [任意子组件中使用 socket](#任意子组件中使用-socket)
  - [组件 A，监听服务器发来的消息。](#组件-A监听服务器发来的消息)
  - [组件 B，发送消息到服务器。](#组件-B发送消息到服务器)

最近在一个 React 项目中，使用到了 [socket.io](http://socket.io "socket.io") 处理即时消息，这里面有几点容易被忽视的问题，例如：**在 React 单页面应用中如何防止出现多个 socket 实例**、**在任意的的组件内如何方便的取到 socket 实例**、**对于某个事件不要随着页面切换出现多个监听器**。

## 创建 Socket Context

本文的实现方式是使用***状态管理工具保存 socket 实例***，供子组件使用，如果使用了 React Hooks，可以用其提供的 useContext API，实现起来也很简单。

```react 
// contexts/socket.tsx
import { createContext, ReactNode, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'ws://localhost:8080';
export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

const SocketContext = createContext<Socket>(socket);
SocketContext.displayName = 'SocketContext';

export const SocketProvider = ({ children }: { children: ReactNode }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};

// contexts/index.tsx
import { ReactNode } from 'react';
import { SocketProvider } from './Socket';

const AppContextProviders = ({ children }: { children: ReactNode }) => (
  <SocketProvider>{children}</SocketProvider>
);

export default AppContextProviders;

```


有关 useContext 介绍可参考之前的文章 [React 状态管理 - useState/useReducer + useContext 实现全局状态管理](https://mp.weixin.qq.com/s?__biz=MzU3NTg5MjU1Mw==\&mid=2247484712\&idx=1\&sn=927400c289b334bb2b5c12f642ac9723\&scene=21#wechat_redirect "React 状态管理 - useState/useReducer + useContext 实现全局状态管理")，其中  `const socket = io(SOCKET_URL)`，有些朋友可能就有疑问了，\*\*为什么不执行下 \*\***`socket.connect()`** 呢？

[**socket.io**](http://socket.io "socket.io")\*\* 客户端默认是自动链接的，如果声明了 \*\***`autoConnect`** 属性为 false，则需要手动执行下链接。

以上，在页面第一次加载时会初始化 socket，解决了第一个问题：“***React 单页面应用中如何防止出现多个 socket 实例”。***

## 根组件提供 socket

在项目的 App.js 文件中引入我们自定义的 Providers，将 AppProviders 组件做为根组件放在最顶层，这样被包裹的组件都可以使用 AppProviders 组件提供的属性。也解决了第二个问题：“**在任意的的组件内如何方便的取到 socket 实例**”。

```react 
import AppProviders from './contexts';
import './App.css';

const App = () => (
  <AppProviders>
    ...
  </AppProviders>
);

export default App;

```


## 任意子组件中使用 socket

### 组件 A，监听服务器发来的消息。

useEffect() 是 React 内置的一个 Hook，如果第二个参数依赖项数组为空，那么传入的第一个函数在该组件内只会执行一次，依赖项数组只要有一个状态被更新，useEffect() 传入的第一个函数也将会被执行。

还需要注意的是 useEffect() 传入的第一个函数，它又返回的函数在函数组件卸载时被调用，通常我们会用 useEffect() 模拟类组件的 componentDidMount、componentWillUnmount 行为。

在组件卸载时，使用` socket.off()` 移除事件监听器，实际上这**可以预防内存泄漏**，同时也解决了最开始提的第三个问题：“**对于某个事件不要随着页面切换出现多个监听器**”。

```react 
import { useEffect } from 'react';
import { useSocket } from '../../contexts/Socket';

const ComponentA = () => {
  const socket = useSocket();

  useEffect(() => {
    // componentDidMount
    socket.on('message', handleMessage); // 监听消息
    return () => {
      // componentWillUnmount
      socket.off('message', handleMessage);
    };
  }, [socket]);
  
  return ();
};
    
export default ComponentA;

```


### 组件 B，发送消息到服务器。

在我们的组件 B 中，也可以使用自定义的 useSocket Hook 获取最开始初始化的 socket 实例，但这并不会产生一个新的 socket 实例。

```react 
import { useEffect } from 'react';
import { useSocket } from '../../contexts/Socket';

const ComponentB = () => {
  const socket = useSocket(); 
  const handleSendMessage = () => {
    socket.emit('compress', data); // 发送消息
  }
  
  return <div>
    // ...
    <button onClick={handleSendMessage}>Send message</button>
  </div>;
};
    
export default ComponentB;

```


**以上介绍，感兴趣的可以 “阅读原文” 看看这个项目 **[**https://github.com/qufei1993/compressor，里面有使用**](https://github.com/qufei1993/compressor，里面有使用 "https://github.com/qufei1993/compressor，里面有使用")** **[**socket.io**](http://socket.io "socket.io")** 的代码片段，包括客户端和服务端**。
