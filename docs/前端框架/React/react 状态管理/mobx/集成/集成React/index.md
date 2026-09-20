# 集成React

## 目录

- [本地与外部状态](#本地与外部状态)
  - [observer 组件中使用外部状态 （Using external state in observer components）](#observer-组件中使用外部状态-Using-external-state-in-observer-components)
  - [在observer 组件中使用局部可观察对象（Using local observable state in observer components）](#在observer-组件中使用局部可观察对象Using-local-observable-state-in-observer-components)
  - [你可能并不需要局部的可观察状态](#你可能并不需要局部的可观察状态)
- [始终在observer 组件中使用可观察能力](#始终在observer-组件中使用可观察能力)
  - [小贴士: 尽可能晚地从对象中获取值](#小贴士-尽可能晚地从对象中获取值)
  - [不要将可观察对象传递到 不是observer的组件中](#不要将可观察对象传递到-不是observer的组件中)
  - [回调组件可能会需要\<Observer>](#回调组件可能会需要Observer)

用法:

```typescript 
import { observer } from "mobx-react-lite" // Or "mobx-react".

const MyComponent = observer(props => ReactElement)
```


MobX 可以独立于 React 运行, 但是他们通常是结合在一起使用, 在 [Mobx的宗旨（The gist of MobX）](https://www.mobxjs.com/the-gist-of-mobx "Mobx的宗旨（The gist of MobX）") 一文中你会经常看见集成React最重要的一部分：用于包裹React Component的 `observer` [HOC](https://reactjs.org/docs/higher-order-components.html "HOC")方法。

`observer` 是你可以自主选择的，[在安装时（during installation）](https://www.mobxjs.com/installation#installation "在安装时（during installation）")独立提供的 React bindings 包。 在下面的例子中,我们将使用更加轻量的[mobx-react-lite](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite "mobx-react-lite")[ 包](https://github.com/mobxjs/mobx/tree/main/packages/mobx-react-lite " 包")。

```typescript 
import React from "react"
import ReactDOM from "react-dom"
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite"

class Timer {
    secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
    }

    increaseTimer() {
        this.secondsPassed += 1
    }
}

const myTimer = new Timer()

//被`observer`包裹的函数式组件会被监听在它每一次调用前发生的任何变化
const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

ReactDOM.render(<TimerView timer={myTimer} />, document.body)

setInterval(() => {
    myTimer.increaseTimer()
}, 1000)
```


**提示:** 你可以在 [在线编译器CodeSandbox](https://codesandbox.io/s/minimal-observer-p9ti4?file=/src/index.tsx "在线编译器CodeSandbox")中尝试上面的例子。

`observer` HOC 将自动订阅 React components 中任何 *在渲染期间* 被使用的 *可被观察的对象* 。 因此, 当任何可被观察的对象 *变化* 发生时候 组件会自动进行重新渲染（re-render）。 它还会确保组件在 *没有变化* 发生的时候不会进行重新渲染（re-render）。 **但是, 更改组件的可观察对象的不可读属性, 也不会触发重新渲染（re-render）。**

在实际项目中，这一特性使得MobX应用程序能够很好的进行开箱即用的优化，并且通常不需要任何额外的代码来防止过度渲染。

要想让`observer`生效, 并不需要关心这些对象 *如何传递到* 组件的（它们只要能传递给组件即可 ·译者注）, 只需要关心他们是否是可读的。 **深层嵌套的可观察对象也没有问题**, 复杂的表达式类似 `todos[0].author.displayName` 也是可以使用的。 与其他必须显式声明或预先计算数据依赖关系的框架（例如 selectors）相比，这种发生的订阅机制就显得更加精确和高效。

## 本地与外部状态

在 Mobx 可以非常灵活的组织或管理（state）, 从（技术角度讲）它不关心我们如何读取可观察对象，也不关心他们来自哪里。 下面的例子将通过不同的设计模式去使用被 `observer`包裹的组件。

### `observer` 组件中使用外部状态 （Using external state in `observer` components）

可被观察对象可以通过组件的props属性传入 (在下面的例子中):

```typescript 
import { observer } from "mobx-react-lite"

const myTimer = new Timer() // See the Timer definition above.

const TimerView = observer(({ timer }) => <span>Seconds passed: {timer.secondsPassed}</span>)

// 通过props传递myTimer.
ReactDOM.render(<TimerView timer={myTimer} />, document.body)
```


虽然我们不关心是 *如何* 引用（reference）的可观察对象,但是我们可以使用 （consume） 外部作用域（outer scopes directly）的可观察对象 (类似通过 import这样的方法, 等等)：

```typescript 
const myTimer = new Timer() //  Timer 定义在上面.

// 没有props, `myTimer` 立刻变成了闭包。
const TimerView = observer(() => <span>Seconds passed: {myTimer.secondsPassed}</span>)

ReactDOM.render(<TimerView />, document.body)
```


直接使用可观察对象效果很好，但是这通常会是通过模块引入，这种写法可能会使单元测试变得复杂。 因此 **，我们建议使用React Context。**

使用[React Context](https://reactjs.org/docs/context.html "React Context")共享整个可观察子树是一种很不错的选择：

```typescript 
import {observer} from 'mobx-react-lite'
import {createContext, useContext} from "react"

const TimerContext = createContext<Timer>()

const TimerView = observer(() => {
    // 从context中获取timer.
    const timer = useContext(TimerContext) // 可以在上面查看 Timer的定义。
    return (
        <span>Seconds passed: {timer.secondsPassed}</span>
    )
})

ReactDOM.render(
    <TimerContext.Provider value={new Timer()}>
        <TimerView />
    </TimerContext.Provider>,
    document.body
)
```


需要注意的是我们**并不推荐每一个不同**的 `值（value）` 都通过不同的 `Provider`来传递 . 在使用Mobx的过程中不需要这样做, 因为共享的可观察对象会更新他自己。

### 在`observer` 组件中使用局部可观察对象（Using local observable state in `observer` components）

因为使用 `observer` 的**可观察对象可以来自任何地方**, 他们也可以使用local state（全局的state·译者注）。 再次声明，不同操作方式对于我们而言都是有价值的。

使用全局可观察对象的最简单的方式就是通过`useState`去存储一个全局可观察对象的引用。 需要注意的是, 因为我们不需要替换全局可观察对象的引用,**所以我们其实可以完全不声明**\*\*`useState`\*\***的更新方法:**

```typescript 
import { observer } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() => new Timer()) // Timer的定义在上面（正如上面所说的那样这里我们忽略了更新方法的定义·译者注）。
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```


如果你想要类似我们官方的例子那样自动更新 timer , 使用`useEffect` 可能是 React 中比较典型的写法：

```typescript 
useEffect(() => {
    const handle = setInterval(() => {
        timer.increaseTimer()
    }, 1000)
    return () => {
        clearInterval(handle)
    }
}, [timer])
```


如刚才说的那样, 直接创建一个可观察的对象，而不是使用classes（这里的类指的是全局定义的Mobx state，在它们是使用class声明的）。 我们可以参考 [observable](https://www.mobxjs.com/observable-state#observable "observable")这篇文章：

```typescript 
import { observer } from "mobx-react-lite"
import { observable } from "mobx"
import { useState } from "react"

const TimerView = observer(() => {
    const [timer] = useState(() =>
        observable({
            secondsPassed: 0,
            increaseTimer() {
                this.secondsPassed++
            }
        })
    )
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```


`const [store] = useState(() => observable({ /* something */}))` 是非常通用的一套写法， 为了简化这个写法我们可以调用`mobx-react-lite` 包中的 [useLocalObservable](https://github.com/mobxjs/mobx-react#uselocalobservable-hook "useLocalObservable") hook ,可以将上面的例子简化成：

```typescript 
import { observer, useLocalObservable } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const timer = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        }
    }))
    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```


### 你可能并不需要局部的可观察状态

通常来讲，我们推荐**在编写全局公用组件的时候不要立刻使用Mobx的可观察能力**， 因为从技术角度来讲他可能会使你无法使用一些React 的 Suspense 的方法特性。 总的来说，使用Mobx的可观察能力会捕获组件间的域状态（domain data）可能会 (包含子组件的)。像是todo item, users, bookings, 等等（就是说最好不要用mobx共享一些组件内的状态·译者注）。

状态类似**获取UI state, 类似加载的 state, 选择的 state,等等,** 最好还是使用 [useState](https://reactjs.org/docs/hooks-state.html "useState")[ hook](https://reactjs.org/docs/hooks-state.html " hook"), 这样可以让你使用高级的 React suspense特性。

使用Mobx的可观察能力作为 React components 的一种状态补充，比如出现以下情况： 1 \*\*) 层级很深, 2) 拥有计算属性 3) 需要共享状态给其它****`observer`**** components。\*\*

## 始终在`observer` 组件中使用可观察能力

你可能会感到疑惑, 我应该什么时候使用 `observer`? 大体上说: \_ `observer`应用于所有组件的可观察数据 \_ 。

`observer` 是使用**修饰模式增强你的组件, 而不是它调用你的组件**. 所以通常所有的组件都可能用了 `observer`，但是不要担心，\*\* 它不会导致性能损失。从另一个角度讲\*\*, 更多的 `observer` 组件可以使渲染更高效，因为它们更新数据的颗粒度更细。

### 小贴士: 尽可能晚地从对象中获取值

只要你传递引用，`observer` 就可以很好的工作。只要获取到内部的属性，基于 `observer` 的组件 就会渲染到 DOM / low-level components（DOM一般是浏览器环境，low-level components 一般是RN环境·译者注）。换句话说， `observer` 会根据实际情况响应你定义的对象中的值的'引用'。

下面的例子中, `TimerView` 组件**不会响应未来的更新**，因为`.secondsPassed`**不是在 ****`observer`****组件内部****读取的****而是在****外部读取****的,因此它\_不会\_被追踪到：**

```typescript 
const TimerView = observer(({ secondsPassed }) => <span>Seconds passed: {secondsPassed}</span>)

React.render(<TimerView secondsPassed={myTimer.secondsPassed} />, document.body)
```


需要注意的一点是**它不同于其它的观念模式库**像是 react-redux那样, **redux 中强调尽可能早的获取和传递原始**值以**获得更好的副作用响应**。 如果你还是没有理解, 可以先阅读 理解响应式（Understanding reactivity） 这篇文章。

### 不要将可观察对象传递到 不是`observer`的组件中

通过`observer`包裹的组件 *只可以* 订阅到在 *他们自己* 渲染的期间的可观察对象. 如果**要将可观察对象** objects / arrays / maps **传递到子组件中**, \*\*他们必须被 ****`observer`**** 包裹。 \*\***通过callback回调的组件也是一样**。

如果你**非要传递可观察对象到未被`observer`****包裹的组件中**， 要么是因为它是第三方组件，要么你需要组件对Mobx无感知，那你**必须在传递前** [转换可观察对象为显式 （convert the observables to plain JavaScript values or structures）](https://www.mobxjs.com/observable-state#将-observable-转换回普通的-javascript-集合 "转换可观察对象为显式 （convert the observables to plain JavaScript values or structures）") 。

关于上述的详细描述, 可以看一下下面的使用 `todo` 对象的例子， 一个 `TodoView` (observer)组件和一个虚构的接收一组对象映射入参的不是`observer`的`GridRow`组件：

```typescript 
class Todo {
    title = "test"
    done = true

    constructor() {
        makeAutoObservable(this)
    }
}

const TodoView = observer(({ todo }: { todo: Todo }) =>
   // 错误: GridRow 不能获取到 todo.title/ todo.done 的变更
   //       因为他不是一个观察者（observer。
   return <GridRow data={todo} />

   // 正确:在 `TodoView` 中显式的声明相关的`todo` ，
   //      到data中。
   return <GridRow data={{
       title: todo.title,
       done: todo.done
   }} />

   // 正确: 使用 `toJS`也是可以的, 并且是更清晰直白的方式。
   return <GridRow data={toJS(todo)} />
)
```


### 回调组件可能会需要`<Observer>`

想象一下在同样的例子中, `GridRow` 携带一个 `onRender`回调函数。 `onRender` 是 `GridRow`渲染生命周期的一部分, 而不是 `TodoView` 的render (甚至在语法层面都能看出来)，**我们不得不保证回调组件是一个 ****`observer`**** 组件。** \*\*或者，我们可以使用 \*\*[**\<Observer />**](https://github.com/mobxjs/mobx-react#observer "<Observer />")**创建一个匿名观察者：**

```typescript 
const TodoView = observer(({ todo }: { todo: Todo }) => {
    // 错误: GridRow.onRender 不能获得 todo.title / todo.done 中的改变
    //        因为它不是一个观察者（observer） 。
    return <GridRow onRender={() => <td>{todo.title}</td>} />

    // 正确: 将回调组件通过Observer包裹将会正确的获得变化。
    return <GridRow onRender={() => <Observer>{() => <td>{todo.title}</td>}</Observer>} />
})
```
