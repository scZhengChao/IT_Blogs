# 到底什么时候render

## 目录

- [React组件到底什么时候render啊 ](#React组件到底什么时候render啊-)
  - [render需要满足的条件](#render需要满足的条件)
  - [bailout需要满足的条件](#bailout需要满足的条件)
    - [1. oldProps === newProps ？](#1-oldProps--newProps-)
    - [2. context没有变化](#2-context没有变化)
    - [3. workInProgress.type === current.type ？](#3-workInProgresstype--currenttype-)
    - [4. !includesSomeLane(renderLanes, updateLanes) ？](#4-includesSomeLanerenderLanes-updateLanes-)
  - [Demo的详细执行逻辑](#Demo的详细执行逻辑)
    - [接下来是关键](#接下来是关键)

# React组件到底什么时候render啊&#x20;

今天我们React源码交流群里有个小伙伴提出个有趣的问题，觉得自己对React运行流程理解很到位的同学，可以来看看。&#x20;

对于如下Demo，点击Parent组件的div，触发更新，Son组件会打印child render!么？

```javascript 
 function Son() {
  console.log('child render!');
  return <div>Son</div>;
}


function Parent(props) {
  const [count, setCount] = React.useState(0);

  return (
    <div onClick={() => {setCount(count + 1)}}>
      count:{count}
      {props.children}
    </div>
  );
}


function App() {
  return (
    <Parent>
      <Son/>
    </Parent>
  );
}

const rootEl = document.querySelector("#root");
ReactDOM.render(<App/>, rootEl);
```


答案是：**不会**

## render需要满足的条件

React创建Fiber树时，每个组件对应的fiber都是通过如下两个逻辑之一创建的：&#x20;

- render。即调用render函数，根据返回的JSX创建新的fiber。&#x20;
- bailout。即满足一定条件时，React判断该组件在更新前后没有发生变化，则复用该组件在上一次更新的fiber作为本次更新的fiber。&#x20;

可以看到，当命中bailout逻辑时，是不会调用render函数的。&#x20;

所以，Son组件不会打印child render!是因为命中了bailout逻辑。&#x20;

## bailout需要满足的条件

什么情况下会进入bailout逻辑？当同时满足如下4个条件时：&#x20;

### 1. oldProps === newProps ？

即本次更新的props（newProps）不等于上次更新的props（oldProps）。&#x20;

注意这里是**全等比较**。&#x20;

我们\*\*知道组件render会返回JSX，JSX是React.createElement的语法糖。 \*\*

所以**render的返回结果实际上是React.createElement的执行结果，** 即一个包含props属性的对象。

**即使本次更新与上次更新props中每一项参数都没有变化，但是本次更新是React.createElement的执行结果，是一个全新的props引用，所以oldProps !== newProps。**

如果我们使用了PureComponent或Memo，那么在判断是进入render还是bailout时，\*\*不会判断oldProps与newProps是否全等，而是会对props内每个属性进行浅比较。 \*\*

### 2. context没有变化

即context的value没有变化。&#x20;

### 3. workInProgress.type === current.type ？

更新前后fiber.type是否变化，比如div是否变为p。&#x20;

### 4. !includesSomeLane(renderLanes, updateLanes) ？

当前fiber上是否存在更新，如果存在那么更新的优先级是否和本次整棵fiber树调度的优先级一致？&#x20;

如果一致则进入render逻辑。&#x20;

就我们的Demo来说，Parent是整棵树中唯一能触发更新的组件（通过调用setCount）。&#x20;

所以Parent对应的fiber是唯一满足条件4的fiber。&#x20;

## Demo的详细执行逻辑

所以，Demo中Son进入bailout逻辑，一定是同时满足以上4个条件。我们一个个来看。&#x20;

条件2，Demo中没有用到context，满足。&#x20;

条件3，更新前后type都为Son对应的函数组件，满足。&#x20;

条件4，Son本身无法触发更新，满足。&#x20;

所以，重点是条件1。让我们详细来看下。&#x20;

本次更新开始时，Fiber树存在如下2个fiber：&#x20;

```javascript 
 FiberRootNode
      |
  RootFiber      
```


其中FiberRootNode是整个应用的根节点，RootFiber是调用ReactDOM.render创建的fiber。&#x20;

首先，RootFiber会进入bailout的逻辑，所以返回的App fiber和更新前是一致的。&#x20;

```javascript 
 FiberRootNode
      |
  RootFiber      
      |
  App fiber
```


由于App fiber是RootFiber走bailout逻辑返回的，所以对于App fiber，oldProps === newProps。并且bailout剩下3个条件也满足。&#x20;

所以App fiber也会走bailout逻辑，返回Parent fiber。

```javascript 
 FiberRootNode
      |
  RootFiber      
      |
   App fiber
      |
 Parent fiber
```


由于更新是Parent fiber触发的，所以他不满足条件4，会走render的逻辑。

### **接下来是关键**

如果render返回的Son是如下形式：&#x20;

```javascript 
 <Son/>
```


会编译为

```javascript 
 React.createElement(Son, null)
```


执行后返回JSX。 由于props的引用改变，oldProps !== newProps。会走render逻辑。&#x20;

但是在Demo中Son是如下形式：&#x20;

```javascript 
 {props.children} 
```


其中，props.children是Son对应的JSX，而这里的props是App fiber走bailout逻辑后返回的。 (props.children 是父组件第一次创建时生成好的jsx)

所以Son对应的JSX与上次更新时一致，JSX中保存的props也就一致，满足条件1。&#x20;

可以看到，Son满足bailout的所有条件，所以不会render。&#x20;
