# 深入探究 React Fiber

## 目录

- [什么是 React Fiber？](#什么是-React-Fiber)
- [Stack 协调器](#Stack-协调器)
  - [什么是 \<App>?](#什么是-App)
  - [React 中的面向对象编程](#React-中的面向对象编程)
  - [什么是 React 协调（reconciliation）？](#什么是-React-协调reconciliation)
  - [什么是 Stack 协调器？](#什么是-Stack-协调器)
  - [React 中的递归是怎样的？](#React-中的递归是怎样的)
  - [掉帧问题](#掉帧问题)
- [React Fiber 是如何工作的？](#React-Fiber-是如何工作的)
  - [JavaScript 执行栈](#JavaScript-执行栈)
  - [单链表 Fiber Node](#单链表-Fiber-Node)
    - [Type](#Type)
    - [Key](#Key)
    - [Child](#Child)
    - [Sibling](#Sibling)
    - [Return](#Return)
      - [pendingProps 和 memoizedProps](#pendingProps-和-memoizedProps)
      - [pendingWorkPriority](#pendingWorkPriority)
    - [Alternate](#Alternate)
    - [Output](#Output)
  - [Render 阶段](#Render-阶段)
    - [workLoopSync()](#workLoopSync)
    - [performUnitOfWork()](#performUnitOfWork)
    - [beiginWork()](#beiginWork)
    - [触发 instance.handleClick()](#触发-instancehandleClick)
- [Commit 阶段](#Commit-阶段)

你是否产生过这样的疑惑？当调用 `ReactDOM.render(<App />, document.getElementById('root'))`之后会发生什么?

&#x20;      我们知道 ReactDOM 构建 DOM 树，并且在屏幕中渲染。**React 是如何构建 DOM 树的？当数据发生改变时又是如何更新 DOM 树的？**

&#x20;      这篇文章，我们将学习 React 15 之前构建 DOM 树的方式以及存在的缺陷，React 16 及之后版本又是如何解决这些问题的。

# 什么是 React Fiber？

Fiber reconciler 是 React 16 之后默认的协调器，用于解决之前版本中长期存在的一些问题。

因为 Fiber 是异步的，可以：

- **中断，恢复，重启渲染工作；**
- **复用之前已经完成的任务，终止不再需要的任务**；
- 将**任务拆分成很多按重要性赋予优先级的子任务。**

这保证了 React 可以更好的协调组件渲染，确保更重要的更新可以尽快执行。

要想充分理解 Fiber 的强大，首先我们还是需要先了解 React 15 及之前老的协调器：Stack reconciler。

# Stack 协调器

我们还是从熟悉的 `ReactDOM.render(<App />, document.getElementById('root'))` 开始。

ReactDOM 会将 传递给协调器，不过有两个问题：

- 意味着什么？
- 什么是协调器？

下面我们来拆解这两个问题。

## 什么是 \<App>?

&#x20;      \<App /> 是一个**描述 DOM 树的 React 元素（Element）**。React 中的元素是描述组件实例或 DOM 节点及其属性的对象。

换句话说，React 元素（Element）不是真实的 DOM 节点或者组件实例，而是一种对组件实例或 DOM 节点及其属性、孩子的描述。

要理解上述含义，我们可以借助传统的面向对象编程的概念。

## React 中的面向对象编程

在传统的面向编程世界中，开发者必须实例化每个 DOM 元素，并且管理它的生命周期。

在 React 中，有两种类型的元素：**DOM 元素和组件（component）元素**。

- DOM 元素：是一种字符串元素，例如：OK;
- 组件元素：是一个类或者一个方法，例如: OK，其中 是一个类组件或者一个函数组件。

上述两种类型的**元素都是纯粹的对象**。它们仅仅是你要渲染到屏幕中的内容的描述，当**你创建和实例化它们的时候，它们并不会直接渲染到屏幕中。**

## 什么是 React 协调（reconciliation）？

React 协调是指将 **React 元素解析成 DOM 树的过程**。**DOM 树将用于页面渲染**。

举个例子，如果 渲染如下内容，React 就会逐层解析各个元素：

```javascript 
<Form>
  <Button>
    Submit
  </Button>
</Form>

```


上述代码中，如果 Form 是一个如下的函数组件：

```javascript 
const Form = (props) => {
  return(
    <div className="form">
      {props.form}
    </div>
  )
}

```


React 就会将 Form 解析为一个如上的拥有子元素的 div 元素。React 将不断重复上述解析过程，直到底层 DOM 标签元素。

这个通过**递归方式解析直至获取底层 DOM 标签元素**，最终**生成 DOM 树的过程**就是 React 协调。

&#x20;    协调过程结束后，React **获取到 DOM 树，**渲染器（renderer，如 react-dom 或 react-native）会**对比生成最小变化集**来更新页面上的 DOM 节点。

现在我们知道了什么是协调（reconciliation），接下来，我们先认识下 React 16 版本之前的协调器是 Stack reconciler。

## 什么是 Stack 协调器？

为什么这种协调器被命名为“Stack（栈）”协调器？这个名字从“stack（栈）”数据结构衍生而来，是一种“**后进先出**”的机制。

Stack 协调器通过一个 stack（栈）来处理前文中讲到的递归解析操作。

## React 中的递归是怎样的？

要理解 Stack 协调器如何工作，我们可以通过一个简单的例子来演示具体调用栈发生了什么。

```javascript 
function fib(n) {
  if (n < 2){
    return n
  }
  return fib(n - 1) + fib (n - 2)
}

fib(10)

```


&#x20;    上述示例中，每次 fib() 方法被调用，都会**往栈推入一个 fib() 方法调用**，直到执行到 fib(1)。假设，我们执行 fib(3) 则会得到如下调用栈。遵循后入先出原则，fib(1) 会最先执行，fib(3) 会最后执行。

![](image_ucc_z8gzYx.png)

上述协调算法是一个纯粹的爹贵算法。**一次更新会直接重新渲染整条 DOM 树**。虽然，上述算法可以很好的工作，但是也存在一些缺陷。

在 UI 渲染中，**每次更新都立即执行是没有必要的、浪费的，甚至会引起掉帧等问题从而影响到用户体验**。另外，不同**类型的更新应该是拥有不同优先级的，更影响用户体验的更新应该拥有更高的优先级。**

## 掉帧问题

为什么递归方法会引发掉帧？在阐述这个问题之前，我们先来看看什么是掉帧，为什么掉帧会影响用户体验。

帧率是指屏幕中出现连续图像的频率。我们在计算器屏幕中看到的所有内容都是连续出现在人眼中的图像。

一般来说，想要人眼看到的**连续图像是顺滑的、不间断的，那么图像出现的频率至少是 30 帧每秒（** FPS， frame per second）。这个频率就是帧率。

&#x20;          今天，\*\*大多数设备的帧率通常是 60 FPS，1/60 = 16.67ms，也就意味着每 16.67ms 展示一帧。\*\***如果 React 单次渲染时长超过 16.67ms ，浏览器就会出现掉帧现象。**

&#x20;     现实中，浏览器也会进行帧率管理，所有渲染任务必须在 10ms 内完成，否则浏览器页面中的内容会剧烈抖动，造成很不好的用户体验。

&#x20;     因为 Stack **协调过程是不可中断的**，且每次**更新都会无脑通过递归的方式解析和渲染整个 App 树**，这样就很容易出现超过 16ms 的更新过程，从而出现掉帧。

因此，**协调过程可中断、且能够通过优先级来优先完成更重要的更新任务**，对于用户体验非常重要。

这也直接促使 React 团队重写了协调算法，新的协调算法被命名为 Fiber。下面，我们来看下 Fiber 是如何解决上述问题的。

# React Fiber 是如何工作的？

React Fiber 主要做了如下事情：

- 给不同类型**的任务分配不同的优先级**；
- **中断任务，后续重启任务；**
- **在不再需要的情况下终止任务；**
- **复用之前已经完成的任务。**

对于 JavaScript 这种单线程语言，要实现上述要求，就必须要利用执行上下文。

## JavaScript 执行栈

当在 JavaScript **中实现一个函数，JavaScript 引擎就会创建一个函数执行上下文。**

每次 JavaScript 引擎启动，都会**创建一个全局执行上下文来管理全局变量**。比如浏览器中的 `window` 对象和 `Nodejs` 中的 `global` 对象。JavaScript **使用栈来管理执行上下文，这个栈被称为执行栈。**

当我们执行下述代码时，JavaScript 引擎会首先创建一个全局执行栈，并且把它推入到执行栈中。

```javascript 
function a() {
  console.log("i am a")
  b()
}

function b() {
  console.log("i am b")
}

a()

```


然后，创建为\*\* a() 函数创建一个函数执行上下文\*\*，**b() 在 a() 中被调用**，因此 `JavaScript` 引擎会继续**为 b() 创建一个函数执行上下文，并推入到执行栈中。**

**当 b() 执行完毕，JavaScript 引擎会销毁 b() 的执行上下文。当 a() 执行完毕，a() 的执行上下文也会被销毁。**

![](image_UQ-LQIaZqB.png)

上述过程是同步执行逻辑，那么 JavaScript 是如何处理像 HTTP 请求之类的异步事件的呢？JavaScript 引擎会阻塞掉执行栈，等待异步事件处理完毕吗？

明显不会，不然 JavaScript 会被大量异步事件阻塞，用户会陷入不断的等待，体验会是非常差的。

这里就要提到 JavaScript 事件循环的概念，JavaScript 会通过事件循环机制来处理异步事件。

![](image_Xsyi8kdyax.png)

&#x20;       JavaScript 中通过**事件队列来处理异步事件**，执行栈空了或执行栈中只有全局执行上下文之后，事件队列中的事件才会被执行。

&#x20;      回到 Stack 协调器，当 **React 解析 DOM 树的工作也是在执行栈中完成**的。当**新的更新发生时**，**更新会被推入到事件队列中**。**只有当执行栈为空时，该更新才会被执行。**



&#x20;    在 Stack 协调算法的实现中，React 会创建一个 React 元素树，这个树是**不可改变的**、**递归遍历的**。

&#x20;     在 Fiber 协调算法中，React 创建的 Fiber Node 树是**可改变的**，Fiber Node **拥有组件的状态、属性以及要渲染的底层 DOM 元素**。因为 Fiber Node 是可改变的，React 不需要每次更新都重复创建 Fiber Node，可以**简单的克隆和更新 Fiber Node**。另外，**Fiber 树也不再使用递归遍历，而是通过单链表的深度优先方式进行遍历。**

## 单链表 Fiber Node

一个 **Fiber Node 代表一个栈帧（stack frame）以及一个 React 组件实例**。一个 Fiber Node 包含如下属性：

- Type
- Key
- Child
- Sibling
- Return
- Alternate
- Output

### Type

节点类型，标签元素、类组件、函数组件等，如 \<div>、\<span>。

### Key

和 React 元素的 key 相同。

### Child

组件的 render() 函数返回的元素。比如:

```javascript 
const Name = (props) => {
  return(
    <div className="name">
      {props.name}
    </div>
  )
}

```


\<Name> 的 Child 就是 \<div>，因为 Name 组件返回了一个 div 元素。

### Sibling

兄弟元素，通常在列表渲染中出现。

```javascript 
const Name = (props) => {
  return([<Customdiv1 />, <Customdiv2 />])
}

```


上述示例中 \<Customdiv1> 和 \<Customdiv2> 是兄弟。

### Return

**return 是返回栈帧（stack frame）的意思，返回父 Fiber Node。**

#### pendingProps 和 memoizedProps

缓存意味着**存储函数执行结果以便后续使用**，从而避免重复计算。`pendingProps`代表传给组件的 `props`，`memoizedProps` 在执行栈结束时初始化，存储了 Fiber Node 的 props。

**当 pendingProps 和 memoizedProps 相同时，意味着之前的 Fiber Node 可以复用。**

#### pendingWorkPriority

pendingWorkPriority 是表示 Fiber Node 优先级的数字。除了0 这个例外，0 代表没有任务。数字越大代表优先级越小。

以下是一个对比优先级的方法：

```javascript 
function matchesPriority(fiber, priority) {
  return fiber.pendingWorkPriority !== 0 &&
         fiber.pendingWorkPriority <= priority
}

```


### Alternate

&#x20;        任何时候，一个组件实例都**至多拥有 2 个和它对应的 Fiber Node**：当前（current） Fiber Node 和进行中（in-progress） Fiber Node。 **当前 Fiber Node 的 ****`alternate`**** 是进行中 ****`Fiber Node`****；进行中 Fiber Node 的 alternate 是当前 Fiber Node。**

### Output

&#x20;      Output 是一个 React 应用的**叶子节点。**

&#x20;      一个 Fiber Node 的**输出是函数的返回值。**每个 Fiber Node 最终都有一个 Output，但是这个 `Output` 只能由**宿主组件在叶子节点中创建**。**这个 Output 会被传递到 Fiber 树的上一级**。

```javascript 
const Parent2 = (props) => {
  return(<Child21 />)
}

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    <div>
      <Parent1 />
      <Parent2 />
    </div>
  }
}

ReactDOM.render(<App />, document.getElementById('root'))

```


从上述示例，我们可以看出 Fiber 树是由**父子关系和兄弟关系 Fiber Node 组成的单链表组成**的。这个 Fiber 树可以被深度搜索遍历。

![](image_vR5HC_IAK2.png)

## Render 阶段

为了更好的理解 React 是如何通过协调算法构建 Fiber 树的，我们通过下述例子来详细分析。

```javascript 
'use strict';

let React;
let ReactDOM;

describe('ReactUnderstanding', () => {
  beforeEach(() => {
    React = require('react');
    ReactDOM = require('react-dom');
  });

  it('works', () => {
    let instance;

    class App extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          text: "hello"
        }
      }

      handleClick = () => {
        this.props.logger('before-setState', this.state.text);
        this.setState({ text: "hi" })
        this.props.logger('after-setState', this.state.text);
      }

      render() {
        instance = this;
        this.props.logger('render', this.state.text);
        if(this.state.text === "hello") {
        return (
          <div>
            <div>
              <button onClick={this.handleClick.bind(this)}>
                {this.state.text}
              </button>
            </div>
          </div>
        )} else {
          return (
            <div>
              hello
            </div>
          )
        }
      }
    }
    const container = document.createElement('div');
    const logger = jest.fn();
    ReactDOM.render(<App logger={logger}/>, container);
    console.log("clicking");
    instance.handleClick();
    console.log("clicked");

    expect(container.innerHTML).toBe(
      '<div>hello</div>'
    )

    expect(logger.mock.calls).toEqual(
      [["render", "hello"],
      ["before-setState", "hello"],
      ["render", "hi"],
      ["after-setState", "hi"]]
    );
  })

});

```


通过 debug 上述代码，我们可以获取**如下调用栈：**

![](image_oHPVwe5TwA.png)

我们可以看到，调用栈会首先执行 `render`()，最终执行到 `createFiberFromTypeAndProps`()，中间还会执行诸如 `workLoopSync`()、`performUnitOfWork`() 和 `beginWork`() 等方法。

### workLoopSync()

`workLoopSync`() 通过递归的方式构建 Fiber 树。**workInProgress 指向下一个 Fiber Node**。

### performUnitOfWork()

`performUnitOfWork`() 的入参是一个 Fiber Node，获取该 FIber Node 的替代节点（alternate），然后调用 beginWork()。

### beiginWork()

&#x20;      当 React 构建 Fiber 树时，beginWork() 简单引入了 `createFiberFromTypeAndProps`() 并且创建 Fiber 节点。React 通过**递归**的方式重复上述操作，最终执行 performUnitOfWork() 并**返回一个 null，**标志着已经**到达了 Fiber 树的根节点**。

### 触发 instance.handleClick()

当我们触发上述示例中的 handleClick 方法，**React 遍历 Fiber 树，克隆每个 Fiber Node，检查是否需要对各个节点进行处理**。

我们来看下上述操作所触发的调用栈。

![](image_lJsBTdrJKK.png)

下图显示了每个 Fiber Node 由 4 个用于完成单元工作的阶段组成。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec9956d45cae412baef7a553a3f08799~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

值得注意的是，每个 Fiber Node 在子节点和兄弟节点返回 completeWork() 之前，不会执行 completeUnitOfWork()。

在上述示例中，从app 的 performUnitOfWork() 和 beginWork() 开始执行，然后执行 Parent1 的 performUnitOfWork() 和 beginWork()，以此类推。等所有 的子节点完成任务之后， 的任务才会完成。

上述处理生成的 Fiber 树被称为**等待被渲染的 workInProgress 树。**

# Commit 阶段

&#x20;     React 在执行完 Render 阶段后会执行 Commit 阶段。在前面的示例中，**当我们触发点击操作，Commit 阶段会切换当前（current）树和进行中（workInProgress）树。**

![](image_JfbWIJM-mm.png)

不仅如此，React 在**切换当前树和进行中树时，会复用老的当前树中可复用的 Fiber Node**。

&#x20;        Commit 阶段是如何处理帧率问题的呢？React 会监控每个单元任务，**如果单元任务用时超过 16ms，React 会终端当前单元任务，将主线程交还给浏览器渲染。**在下一帧中，React 会继续没有完成的单元任务。当**所有单元任务完成，会 Commit 进行中（workInProgress）树，完成渲染工作。**
