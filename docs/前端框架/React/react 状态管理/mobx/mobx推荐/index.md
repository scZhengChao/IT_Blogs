# mobx推荐

## 目录

- [什么是 MobX](#什么是-MobX)
- [核心概念](#核心概念)
  - [1. 状态（State）](#1-状态State)
  - [2. 可观察对象（Observable）](#2-可观察对象Observable)
  - [3. 动作（Action）](#3-动作Action)
    - [异步 actions](#异步-actions)
  - [4. 计算值（Computed）](#4-计算值Computed)
  - [5. 反应（Reaction）](#5-反应Reaction)
- [安装和使用](#安装和使用)
  - [1. 安装](#1-安装)
  - [2. 使用](#2-使用)
- [MobX 和装饰器](#MobX-和装饰器)
- [对类属性使用符合规范的转换](#对类属性使用符合规范的转换)
- [集成React](#集成React)
  - [始终在observer组件中使用可观察能力](#始终在observer组件中使用可观察能力)
    - [尽可能晚地从对象中获取值](#尽可能晚地从对象中获取值)
    - [不要将可观察对象传递到 不是observer的组件中](#不要将可观察对象传递到-不是observer的组件中)
    - [回调组件可能会需要\<Observer>](#回调组件可能会需要Observer)
    - [observerorReact.memo](#observerorReactmemo)
    - [想要将observer和其他高阶组件一起使用](#想要将observer和其他高阶组件一起使用)
    - [useEffect 与 可观察对象](#useEffect-与-可观察对象)
- [优化React组件渲染](#优化React组件渲染)
  - [使用大量的小组件](#使用大量的小组件)
  - [专用组件去渲染列表](#专用组件去渲染列表)
  - [不要使用数组的索引作为 key](#不要使用数组的索引作为-key)
  - [晚一点使用间接引用值](#晚一点使用间接引用值)
    - [尽早绑定函数](#尽早绑定函数)
- [陷阱](#陷阱)
  - [正确的做法：在跟踪函数中访问数组的属性](#正确的做法在跟踪函数中访问数组的属性)
  - [不正确的做法：在跟踪函数中的访问越界的索引](#不正确的做法在跟踪函数中的访问越界的索引)
  - [不正确的做法：“使用”可观察对象但是没有访问其任何的属性](#不正确的做法使用可观察对象但是没有访问其任何的属性)
  - [异步](#异步)
- [扩展](#扩展)
- [参考](#参考)
- [最佳实践](#最佳实践)

> 版本：version 6

中文文档： [https://www.mobxjs.com/](https://www.mobxjs.com/ "https://www.mobxjs.com/")

## 什么是 MobX

MobX 是一个简单、可扩展的状态管理库，它可以帮助你轻松管理应用程序中的状态。MobX 遵循响应式编程的原则，当状态发生变化时，所有依赖该状态的视图会自动更新，而无需手动操作。它与 React 等前端框架配合使用非常方便，能够简化应用程序的开发流程。

- Mob**X 可在任何 ES 5 环境中工作，包括浏览器和 Node.js**。
- MobX 有两种 React 绑定方式，`mobx-react-lite`**仅支持函数组件**，而`mobx-react`还**支持基于类的组件**。可以使用 Yarn、NPM、CDN 将 MobX 集成到您的项目中：

## 核心概念

### 1. 状态（State）

在 MobX 中，状态是应用程序的数据，它可以是任何类型的数据，如数字、字符串、对象、数组等。状态是可变的，当状态发生变化时，MobX 会自动通知所有依赖该状态的组件进行更新。

### 2. 可观察对象（Observable）

可观察对象是 MobX 中用于表示状态的特殊对象。通过将普通的 JavaScript 对象、数组等转换为可观察对象，MobX 可以跟踪这些对象的变化。例如：

```typescript 
import { makeObservable, observable } from 'mobx';

class Store {
    constructor() {
        // 将 count 声明为可观察对象
        this.count = 0;
        makeObservable(this, {
            count: observable
        });
    }
}

const store = new Store();
```


### 3. 动作（Action）

动作是用于修改可观察对象的函数。在 MobX 中，**建议将所有修改状态的操作都封装在动作中，** 这样可以更好地跟踪状态的变化。例如：

```typescript 
import { makeObservable, observable, action } from 'mobx';

class Store {
    constructor() {
        this.count = 0;
        makeObservable(this, {
            count: observable,
            increment: action
        });
    }

    increment() {
        this.count++;
    }
}

const store = new Store();
store.increment();
console.log(store.count); // 输出 1
```


##### 异步 actions

从本质上讲，异步进程在 MobX 中不需要任何特殊处理，因为不论是何时引发的所有 reactions 都将会自动更新。 而且因为可观察对象是可变的，因此在 action 执行过程中保持对它们的引用一般是安全的。 然而，在异步进程中更新可观察对象的每个步骤（tick）都应该被标识为`action`。 我们可以通过利用上述的 API 以多种方式实现这一点，如下所示。

例如，在处理 Promise 时，更新 state 的处理程序应该被`action`包装起来，或者被标记为 actions，如下所示。

Promise 的决议处理程序是我们以内联的方式处理的，但是会在一开始的 action 执行完成之后运行，因此需要使用`action`对它们进行包装：

```javascript 
import { runInAction, makeAutoObservable } from "mobx"

class Store {
    githubProjects = []
    state = "pending" // "pending", "done" or "error"

    constructor() {
        makeAutoObservable(this)
    }

    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            runInAction(() => {
                this.githubProjects = filteredProjects
                this.state = "done"
            })
        } catch (e) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```


```typescript 
import { flow, makeAutoObservable, flowResult } from "mobx"

class Store {
    githubProjects = []
    state = "pending"

    constructor() {
        makeAutoObservable(this, {
            fetchProjects: flow
        })
    }

    // 注意星号, 这是一个 generator 函数!
    *fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            // Yield 代替 await.
            const projects = yield fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            this.state = "done"
            this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    }
}

const store = new Store()
const projects = await flowResult(store.fetchProjects())
```


### 4. 计算值（Computed）

计算值是基于可观察对象派生出来的值。**计算值会自动缓存，只有当依赖的可观察对象发生变化时，计算值才会重新计算。** 例如：

```typescript 
import { makeObservable, observable, computed } from 'mobx';

class Store {
    constructor() {
        this.count = 0;
        makeObservable(this, {
            count: observable,
            doubleCount: computed
        });
    }

    get doubleCount() {
        return this.count * 2;
    }
}

const store = new Store();
console.log(store.doubleCount); // 输出 0
store.increment();
console.log(store.doubleCount); // 输出 2
```


### 5. 反应（Reaction）

反应是 MobX 中用于监听可观察对象变化的机制。**当可观察对象发生变化时，反应会自动执行相应的操作**。在 React 中，通常使用`observer`函数将组件转换为响应式组件，当组件依赖的可观察对象发生变化时，组件会自动重新渲染。例如：

```javascript 
import React from 'react';
import ReactDOM from 'react-dom';
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react-lite';

class Store {
    constructor() {
        this.count = 0;
        makeObservable(this, {
            count: observable,
            increment: action
        });
    }

    increment() {
        this.count++;
    }
}

const store = new Store();

const Counter = observer(() => {
    return (
        <div>
            <p>Count: {store.count}</p>
            <button onClick={() => store.increment()}>Increment</button>
        </div>
    );
});

ReactDOM.render(<Counter />, document.getElementById('root'));
```


## 安装和使用

### 1. 安装

使用 npm 或 yarn 安装 MobX 和 MobX-React（如果你使用 React）：

```javascript 
npm install mobx mobx-react-lite
```


### 2. 使用

以下是一个简单的 MobX 示例，展示了如何在 React 中使用 MobX 进行状态管理：

```typescript 
import React from 'react';
import ReactDOM from 'react-dom';
import { makeObservable, observable, action } from 'mobx';
import { observer } from 'mobx-react-lite';

// 创建一个 MobX Store
class CounterStore {
    constructor() {
        this.count = 0;
        makeObservable(this, {
            count: observable,
            increment: action,
            decrement: action
        });
    }

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

// 实例化 Store
const counterStore = new CounterStore();

// 创建一个响应式组件
const Counter = observer(() => {
    return (
        <div>
            <h1>Counter: {counterStore.count}</h1>
            <button onClick={() => counterStore.increment()}>Increment</button>
            <button onClick={() => counterStore.decrement()}>Decrement</button>
        </div>
    );
});

// 渲染组件
ReactDOM.render(<Counter />, document.getElementById('root'));
```


在这个示例中，我们创建了一个`CounterStore`类，其中包含一个可观察对象`count`和两个动作`increment`和`decrement`。然后，我们使用`observer`函数将`Counter`组件转换为响应式组件，当`count`发生变化时，组件会自动重新渲染。

## MobX 和装饰器

MobX 是否和装饰器一起使用**可取决于您的偏好**，当前**旧版实现和标准化的 TC-39 版本装饰**器都被支持。

## 对类属性使用符合规范的转换

当 MobX 与 TypeScript 或者 Babel 一起使用时，并且你计划使用类，一定要更新你的配置，才能为类字段启用一个符合 TC-39 规范的转译，因为这不总是默认值。否则，无法在初始化类字段之前使其可观察。

- **Babel**：一定要用至少 7.12 版，并有以下配置:

```json 
{
    // Babel < 7.13.0
    "plugins": [
        ["@babel/plugin-proposal-class-properties", { "loose": false }]
    ],

    // Babel >= 7.13.0 (https://babeljs.io/docs/en/assumptions)
    "plugins": [["@babel/plugin-proposal-class-properties"]],
    "assumptions": {
        "setPublicClassFields": false
    }
}
```


- **TypeScript**：设置编译器选项为`"useDefineForClassFields": true`。

# 集成React

## 始终在`observer`组件中使用可观察能力

你可能会感到疑惑, 我应该什么时候使用`observer`? 大体上说: \_`observer`应用于所有组件的可观察数据 \_ 。

`observer`是使用修饰模式增强你的组件, 而不是它调用你的组件. 所以通常所有的组件都可能用了`observer`，**但是不要担心， 它不会导致性能损失。** 从另一个角度讲, 更多的`observer`组件可以使渲染更高效，因为它们更新数据的颗粒度更细。

### 尽可能晚地从对象中获取值

只要你传递引用，`observer`就可以很好的工作。只要获取到内部的属性，基于`observer`的组件 就会渲染到 DOM 。换句话说，`observer`会根据实际情况响应你定义的对象中的值的'引用'。

下面的例子中,`TimerView`组件**不会**响应未来的更新，因为`.secondsPassed`不是在`observer`组件内部读取的而是在外部读取的,因此它\_不会\_被追踪到：

```typescript 
const TimerView = observer(({ secondsPassed }) => <span>Seconds passed: {secondsPassed}</span>)

React.render(<TimerView secondsPassed={myTimer.secondsPassed} />, document.body)
```


### 不要将可观察对象传递到 不是`observer`的组件中

通过`observer`包裹的组件***只可以*****订阅到在*****他们自己*****渲染的期间的可观察对象**. 如果要将可观察对象 objects / arrays / maps 传递到子组件中, 他们必须被`observer`包裹。\*\* 通过callback回调的组件也是一样。\*\*

如果你非要传递可观察对象到未被`observer`包裹的组件中， 要么是因为它是第三方组件，要么你需要组件对Mobx无感知，那你必须在传递前[转换可观察对象为显式](https://www.mobxjs.com/observable-state#将-observable-转换回普通的-javascript-集合 "转换可观察对象为显式")

关于上述的详细描述, 可以看一下下面的使用`todo`对象的例子， 一个`TodoView`(observer)组件和一个虚构的接收一组对象映射入参的不是`observer`的`GridRow`组件：

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

想象一下在同样的例子中,`GridRow`携带一个`onRender`回调函数。`onRender`是`GridRow`**渲染生命周期的一部分, 而不是**\*\*`TodoView`\*\***的render (甚至在语法层面都能看出来)，我们不得不保证回调组件是一个**`observer`组件。 或者，我们可以使用[\<Observer />](https://github.com/mobxjs/mobx-react#observer "<Observer />")创建一个匿名观察者：

```typescript 
const TodoView = observer(({ todo }: { todo: Todo }) => {
    // 错误: GridRow.onRender 不能获得 todo.title / todo.done 中的改变
    //        因为它不是一个观察者（observer） 。
    return <GridRow onRender={() => <td>{todo.title}</td>} />

    // 正确: 将回调组件通过Observer包裹将会正确的获得变化。
    return <GridRow onRender={() => <Observer>{() => <td>{todo.title}</td>}</Observer>} />
})
```


### `observer`or`React.memo`

`bserver`会自动的使用`memo`, 所以`observer`**不需要再包裹**`memo`。`memo`会被 observer 组件安全的使用，因为任何在props中的改变(很深的) 都会被`observer`响应。

### 想要将`observer`和其他高阶组件一起使用

当`observer`需要和**装饰器或者其他高阶组件（HOC）一起使用时**，请确保`observer`是最内层的 (最先调用的) 装饰器，否则的话它可能不会工作。

### useEffect 与 可观察对象

`useEffect`可以被用于触发需要发生的副作用, 它将**会被约束在React 组件的生命周期中**。 使用`useEffect`需要指定详细的依赖。 对于 MobX 却不是必须的, 因为 MobX **已经有了一种自动确定副作用的依赖项的方法**，`autorun`。 结合`autorun`可以很轻松的在生命周期组件中使用`useEffec`

```typescript 
import { observer, useLocalObservable, useAsObservableSource } from "mobx-react-lite"
import { useState } from "react"

const TimerView = observer(() => {
    const timer = useLocalObservable(() => ({
        secondsPassed: 0,
        increaseTimer() {
            this.secondsPassed++
        }
    }))

    // 在Effect方法之上触发可观察对象变化。
    useEffect(
        () =>
            autorun(() => {
                if (timer.secondsPassed > 60) alert("Still there. It's a minute already?!!")
            }),
        []
    )

    // 作为demo用途在Effect里定义一个定时器。
    useEffect(() => {
        const handle = setInterval(timer.increaseTimer, 1000)
        return () => {
            clearInterval(handle)
        }
    }, [])

    return <span>Seconds passed: {timer.secondsPassed}</span>
})

ReactDOM.render(<TimerView />, document.body)
```


# 优化React组件渲染

## 使用大量的小组件

`observer`组件将跟踪他们使用的值，并且当它们中任何一个值发生时重新渲染。所以你的组件越小，它们重新渲染产生的变化就越小。这意味着用户界面的更多部分具备彼此独立渲染的可能性。

## 专用组件去渲染列表

这点在渲染大量数据时格外重要。 React 在渲染大量数据时表现非常糟糕，**因为协调器必须评估每个集合变化的集合所产生的组件**。 因此，建议使用专门的组件来映射集合并渲染这个组件，且不再渲染其他组件。

不好的:

```javascript 
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <ul>
            {todos.map(todo => (
                <TodoView todo={todo} key={todo.id} />
            ))}
        </ul>
    </div>
))
```


在上面的示例中，当`user.name`改变时，React 会不必要地协调所有的`TodoView`组件。尽管`TodoView`组件不会重新渲染，但是**协调的过程本身是非常昂贵的。**

好的:

```javascript 
const MyComponent = observer(({ todos, user }) => (
    <div>
        {user.name}
        <TodosView todos={todos} />
    </div>
))

const TodosView = observer(({ todos }) => (
    <ul>
        {todos.map(todo => (
            <TodoView todo={todo} key={todo.id} />
        ))}
    </ul>
))
```


## 不要使用数组的索引作为 key

不用使用数组索引或者任何将来可能会改变的值作为 key 。如果需要的话为你的对象生成 ids。 还可以参见这篇[博客](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318 "博客")。

## 晚一点使用间接引用值

使用`mobx-react`时，推荐尽可能晚的使用间接引用值。 这是因为当使用 observable 间接引用值时 MobX 会自动重新渲染组件。 如果间接引用值发生在组件树的层级越深，那么需要重新渲染的组件就越少。

慢的:

```react jsx 
<DisplayName name={person.name} />


```


快的:

```html 
<DisplayName person={person} />


```


在这个快的示例中, 改变`name`属性只会触发`DisplayName`重新渲染, 在慢的示例中，组件的所有者也必须重新渲染。 前者这没有错, 如果组件**的拥有者渲染的足够快(通常是这样!)，** 这种方式也能很好的运行。

### 尽早绑定函数

为了获得最佳的性能，**你不得不创建大量小的 observer 组件**，它们每个都用来渲染特定数据的不同部分，例如：

```javascript 
const PersonNameDisplayer = observer(({ person }) => <DisplayName name={person.name} />)

const CarNameDisplayer = observer(({ car }) => <DisplayName name={car.model} />)

const ManufacturerNameDisplayer = observer(({ car}) => 
    <DisplayName name={car.manufacturer.name} />
)
```


如果你拥有很多不同的数据，这种快速的方式就会变得很冗长。另一种方式是使用使用函数来返回想要渲染`Displayer`的数据。

```javascript 
const GenericNameDisplayer = observer(({ getName }) => <DisplayName name={getName()} />)
```


然后，你可以这样来使用组件:

```javascript 
const MyComponent = ({ person, car }) => (
    <>
        <GenericNameDisplayer getName={() => person.name} />
        <GenericNameDisplayer getName={() => car.model} />
        <GenericNameDisplayer getName={() => car.manufacturer.name} />
    </>
)
```


这种方式允许`GenericNameDisplayer`渲染任何名称的组件，你依然可以保持组件渲染在最低的限度。

# 陷阱

#### 正确的做法：在跟踪函数中访问数组的属性

```javascript 
autorun(() => {
    console.log(message.likes.length)
})
message.likes.push("Jennifer")
```


这将会引发符合预期的响应。`.length`也会被认为是一个属性。 注意：发生在该数组中的\*\*\_任何\_变化都会引发响应\*\*。 数组不是按索引或属性（如可观察对象和 maps）跟踪的，而是作为一个整体跟踪的。

#### 不正确的做法：在跟踪函数中的访问越界的索引

```javascript 
autorun(() => {
    console.log(message.likes[0])
})
message.likes.push("Jennifer")


```


这个实例将会对上面的示例数据作出响应，因为数组索引算作属性访问。但**前提**是提供的`index < length`。 MobX 不跟踪尚未存在的数组索引。 因此，请始终使用`.length`检查（数组越界检查）来保护基于数组索引的访问。

#### 不正确的做法：“使用”可观察对象但是没有访问其任何的属性

```javascript 
autorun(() => {
    message.likes
})
message.likes.push("Jennifer")
```


这将**不会**引发响应，仅仅是因为`likes`数组本身并没有被`autorun`使用，使用的仅仅是该数组的引用。 相比之下，`messages.likes = ['Jennifer']`将会被捕捉并响应，该语句不修改`likes`数组，修改的是`likes`属性本身。

### 异步

```javascript 
autorun(() => {
    setTimeout(() => console.log(message.likes.join(", ")), 10)
})

runInAction(() => {
    message.likes.push("Jennifer")
})


```


这**不会**引发响应。因为在 autorun 的执行过程中，没有任何的可观察对象被访问使用了，只是在`setTimeout`中使用了可观察对象，但\*\*是`setTimeout`\*\***是异步函数，它不是可跟踪的**。

# 扩展

组织 `stores` 更专用的方式：使用[mobx-state-tree](https://github.com/mobxjs/mobx-state-tree "mobx-state-tree")和[mobx-keystone](https://mobx-keystone.js.org/ "mobx-keystone")

# 参考

- 推荐使用类（class）
- 不推荐使用继承；优化考虑组合
- 看项目实际兼容情况；推荐使用proxy
- 推荐使用装饰器
- 推荐使用配置；约束使用规范规则

# 最佳实践

嗯，用户问的是MobX的最佳实践，我需要整理一下这方面的知识。首先，MobX是一个状态管理库，和React结合使用比较多。最佳实践通常包括如何组织代码、响应式数据的使用、副作用处理等等。
我应该先回忆MobX的核心概念，比如observable、action、computed、reaction这些。然后考虑如何合理使用它们。比如，用户可能会想知道什么时候该用action，或者如何避免不必要的渲染。

然后，可能要考虑项目结构，比如Store的组织方式，是否使用多个Store，如何划分模块。还有和React组件结合时的注意事项，比如使用observer高阶组件，避免在组件内部直接修改状态，而是通过action。

另外，性能优化方面，比如避免在computed属性中进行复杂计算，或者使用transaction来批量更新。\*\*还有处理异步操作时，确保在action中执行，可能需要使用runInAction。

**可能还需要提到MobX的严格模式，比如useStrict或者configure({ enforceActions: "always" })，** 来强制使用action修改状态，避免直接修改。
\*\*
还有关于依赖追踪的问题，**比如避免在observer组件中解构对象，导致响应式失效**。或者使用@observer装饰器正确包裹组件。

另外，测试方面，如何测试observable和action，可能需要模拟或者使用真实Store实例。

可能还需要比较MobX和Redux的不同，但用户问的是最佳实践，所以可能不需要深入对比，但可以提到如何结合React Context来传递Store。

还有错误处理，比如在异步操作中捕获异常，并在action中处理，避免状态不一致。

哦，对了，还有MobX 6之后的版本推荐使用makeObservable和makeAutoObservable，而不是装饰器语法，因为装饰器在ES标准中的变化。所以需要建议用户使用新的API，特别是TypeScript项目。

另外，避免在Store中引入UI相关的逻辑，保持Store的纯净，专注于状态管理。还有如何拆分大型Store为多个小Store，使用根Store来管理它们。

还有，使用computed属性来缓存衍生数据，减少重复计算，但要注意不要在其中产生副作用。

可能还需要提到使用reaction和autorun时的清理工作，避免内存泄漏，比如在React组件卸载时调用返回的清理函数。

最后，文档和社区资源，比如官方文档、示例项目，以及常见问题的解决方法。

现在需要把这些点组织起来，分门别类，结构清晰。

嗯，用户问的是在MobX组件中解构对象是否会导致响应式失效。我需要仔细思考这个问题。首先，MobX的响应式系统依赖于属性访问来追踪依赖关系。当你在组件中解构对象时，比如从observable对象中提取属性，可能会影响MobX的依赖追踪。
比如，假设有一个observable对象store，里面有属性a和b。如果在组件中解构const { a, b } = store，然后在JSX中使用a和b，这时候MobX是否能正确追踪到这些属性的变化呢？可能的问题在于，解构操作是在渲染时执行的，获取的是当前值的快照，而不是持续的引用。如果后续a或b的值改变，组件可能不会重新渲染，因为解构后的变量是原始值，而不是响应式的属性访问。

不过，如果组件被observer包裹，并且解构发生在组件内部，那么每次渲染都会重新解构，这时候如果store是observable的，组件应该能检测到变化。但可能存在某些情况，比如在解构后，直接使用这些变量，而MobX无法追踪到原始对象的属性访问，导致依赖没有被正确收集。

比如，在observer组件中，如果在render函数外部解构，或者在useEffect等hooks中解构，可能会导致问题。因为MobX的追踪是在组件渲染期间进行的，如果在渲染过程中没有访问observable属性，而是访问了解构后的变量，那么这些变量可能不会被追踪到变化。

另外，对于嵌套对象的情况，如果解构的是深层属性，比如const { c } = store.a.b，这时候如果store.a.b本身不是observable的，或者解构后的c不是observable的，那么变化可能不会被检测到。需要确保整个访问路径都是observable的。

解决方法可能是避免在组件顶层解构，**而是在渲染过程中直接访问对象的属性，或者在组件内部进行解构，确保每次渲染都重新解构，从而让MobX能够捕获到最新的值**。或者使用computed属性来返回需要的值，确保响应式更新。

另外，使用MobX的observer组件会自动跟踪渲染过程中使用的所有observable属性，所以如果在渲染函数内部访问解构后的变量，可能不会有问题，每次渲染都会重新解构，从而触发新的访问。但**如果解构发生在渲染之外，比如在useEffect的依赖数组中，可能会导致依赖未被正确追踪。**
