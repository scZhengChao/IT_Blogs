# 事件系统

## 目录

- [为什么react要自己实现事件系统？](#为什么react要自己实现事件系统)
  - [为什么上面的代码分为了两个版本？](#为什么上面的代码分为了两个版本)
  - [为什么 React17 之后要进行改动？](#为什么-React17-之后要进行改动)
- [react事件系统的组成。](#react事件系统的组成)
- [上代码](#上代码)

## 为什么react要自己实现事件系统？

1、为了**抹平不同浏览器事件对象间的差异。** &#x20;
2、**统一管理事件，节约内存**，提升性能。\
3、**跨端复用。**\
4、\*\* 为事件分配优先级。  \*\*
5、**更容易添加新特性**

以下是chatGPT的回答

![](./image/image_rTY_YCGXFK.png)

### 为什么上面的代码分为了两个版本？

因为在 React17 之前事件代理是注册在 `document` 上的， React 17 及以后，React 将不再向 `document` 附加事件处理器。而会将事件代理注册到渲染 React 树的根 DOM 容器中，比如：下面的 id 为root 的 dom 容器：

```css 
const rootNode = document.getElementById('root');
ReactDOM.render(<App />, rootNode);

```


### 为什么 React17 之后要进行改动？

React 团队为了能够让 React 渐进升级，提出了**多版本共存的升级方案**，也就是一个 React 应用中可能会有多个 React 版本。

> 如果页面上有多个 React 版本，他们都将在顶层注册事件处理器。这会破坏 `e.stopPropagation()`：如果嵌套树结构中阻止了事件冒泡，但外部树依然能接收到它。这会使不同版本 React 嵌套变得困难重重。

以上引自 React 官方文档——[传送门](https://link.juejin.cn/?target=https://zh-hans.legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html "传送门")。多个 React 共存事件都注册在 document 上，会破坏原有的事件系统，出现不符合预期的问题，这就是进行改动的原因。

## react事件系统的组成。

react的事件系统由两部分组成： &#x20;
1、SyntheticEvent（**合成事件**） 合成事件是对浏览器**原生事件对象的一层封装，兼容**主流浏览器与浏览器原生事件有相同的api，比如stopPropagation。

2、**模拟实现事件的传播机制** 利用**事件委托，**并基于fiber架构实现了事件的“捕获、目标、冒泡”流程，并给不同的事件加上了**不同的优先级。**

## 上代码

1、在`createRoot`方法利用事件代理给根容器绑定事件，具体方法为`listenToAllSupportedEvents`，接收的参数为`root`根容器。\*\*`allNativeEvents`\*\***是所有待绑定的事件**，`listenToAllSupportedEvents`将所有的事件都绑定到了root容器上，除了`selectionchange`，它绑定到了`document`上。

![](./image/image_SxeH3UM1qG.png)

![](./image/image_JCvWqAxSCk.png)

![](./image/image_wFrLBxrPMU.png)

`listenToNativeEvent`方法主要决定了**当前事件是否要捕获**，绑定实现在`addTrappedEventListener`。最终执行了addEventListener。

![](./image/image_BNH4PTxTBE.png)

![](./image/image_33lvoTdAuP.png)

下面来看看事件的**优先级是怎么设置**的，具体逻辑在`createEventListenerWrapperWithPriority`。 `react`事件的优先级有三种，分别是`DiscreteEventPriority`**（优先级最高）代表事件为click**，`ContinuousEventPriority`（**优先级次一点**）代表事件`mousemove`，`DefaultEventPriority`（**默认优先级**），最终会和`lane`模型的优先级对应起来进行调度

![](./image/image_3rnXh6Lpiz.png)

![](./image/image_ZSYWMKl6-q.png)

`createEventListenerWrapperWithPriority`返回的函数，也就是事件触发会触发的函数，最终会执行`dispatchEvent`

到这里全部事件的监听就完成了。

下面来看看触发一个click事件会发生什么，注意：会触发**两次**`dispatchEvent` **一次冒泡，一次捕获**

首先会触发监听函数`dispatchEvent`，最后在批量更新函数中执行`dispatchEventsForPlugins`

![](./image/image_p3A1kdC5VP.png)

我们来看看batchedUpdates干了什么？

![](./image/image__fprjE89bd.png)

在`batchedUpdates`中 将执行上下文置为 批量 并执行`dispatchEventsForPlugins`。

![](./image/image_1zJNPlN6x_.png)
