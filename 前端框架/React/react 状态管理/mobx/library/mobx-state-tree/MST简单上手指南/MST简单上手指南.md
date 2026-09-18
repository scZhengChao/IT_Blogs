# MST简单上手指南

## 目录

- [Mobx State Tree 简单上手指南](#Mobx-State-Tree-简单上手指南)
  - [What](#What)
  - [Opinioned 写法](#Opinioned-写法)
    - [必须的 API](#必须的-API)
    - [types](#types)
    - [最好掌握的进阶API](#最好掌握的进阶API)
  - [React里怎么用](#React里怎么用)

# Mobx State Tree 简单上手指南

Mobx State Tree (**简称MST**)作为Mobx作者的亲儿子和作者指定的“**更专业的数据存储方式”**，在国内却基本没什么人了解。无论是对于造轮子搞KPI，还是降本增效的务实派，MST都是一个很好的基础，比Redux强了不少。鉴于MST的中文资料实在是少的可怜，为了让更多人了解、使用MST，我写一篇简单的上手指南，降低MST的使用门槛。本文旨在让读者了解MST、尝试使用MST解决问题，注重实用，不会涉及原理、源码类的问题。

## What

MST是什么？作者的答案是一个**建立在Mobx上的状态管理系统**。作者将Mobx形容为状态管理的引擎，而MST则是基于这个引擎造的车。和Mobx相同，配合不同的包，MST可以支持所有的现代Web框架，包括但不限于React、Vue、Angular，本文以React为主。作者说：“MST适用于大项目，或者希望快速扩展的项目”。所以在使用MST时，**最好尽可能的将业务逻辑放到其中，然后通过在React组件中调用MST中的数据和方法来完成前端功能的开发**。这种应用方式，让MST有了第一个特点，虽然很多人诟病，但我认为却是一大优点 —— Opinioned写法。

## Opinioned 写法

Opinioned意思是：“**有自己意见的”。** 这里举一个例子方便理解，Eslint和Prettier都可用作代码格式化。Eslint是Unopinioned，所有的规则都要自己配。Prettier是Opinioned，除了少数的配置项，大部分的格式写法都是Prettier的决定的，没办法修改。Prettier晚于Eslint出现，但现在的项目中，代码格式化的工作已经基本被Prettier统一，Eslint也是引用Prettier的规则，说明大家对Opinioned的工具并不排斥，毕竟学完了就可以省时省力。MST的Opinioned体现在两个方面，一个和本文关系不大，体现在model的设计思想等形而上的方面。另一个是API，下面就看看MST的API有什么不一样。

### 必须的 API

MST自己定义了一套独特的API写法，与Redux的函数式写法不同（虽然我认为Redux的写法也是Opinioned，只不过通常被叫作boilerplate），也和Mobx的对象式写法不同。这种写法容易让人第一时间蒙圈，但其实大大减少了需要记忆的API。核心的API只有4块（注意不是个，因为每个API都有进一步的API）：

- `types.model()`
- `types.model.props()`
- `types.model.actions()`
- `Model.create()`

有了这4部分就可以完成定义一颗状态树80%以上的工作。这里我贴一段官方的例子，在代码中用注释介绍：

```typescript 
import { types } from "mobx-state-tree"

// 定义一个Tweet类型
const Tweet = types
    .model("Tweet")
    .props({
        body: types.string,
        read: false // 由默认值推断types
    })
    .actions((tweet) => ({
        toggle() {
            tweet.read = !tweet.read
        }
    }))

// 定义一个TwitterStore类型，包括Tweet的数组
const TwitterStore = types.model("TwitterStore", {
    tweets: types.array(Tweet)
})

// 新建一个TwitterStore实例
const twitterStore = TwitterStore.create({
    tweets: [
        {
            body: "Anyone tried MST?"
        }
    ]
})

// 调用Tweet类型方法
twitterStore.tweets[0].toggle()

```


这里有两个地方值得一说，一是`types.model()`和`types.model.props()`的用法，两种方法基本是等价的，其中的不同不影响使用，有兴趣的可以去看官方文档，我会选择`types.model.props()`的写法，更清晰一些。

二是`types`，前面的核心API中的方法也是types中的。types是MST另一个褒贬不一的特点，下面单独介绍一下。

### types

types是MST的重要概念，可以简单**理解成数据类型或数据结构**，还用来进行`runtime`类型检查。数据类型有2类，一类是复杂数据类型`model`和`model`的集合，另一类是简单类型，如`string`，`number`等。复杂数据类型可以包括简单数据类型，反之则不行。此外，还有一些帮助类型，这里不一一类举了。因为绝大部分类型不需要记忆，MST是可以通过默认值推断的，比如上面的例子中，你设置`body: types.string`，也可以直接`body: ''`，**这样既设定了body的type是string，还设定了默认值是空字符串。** 只有两个类型需要在这篇文章里提一下：

- 一个是帮助类型中的`types.optional`，这个类型可以避免在初始化model类型时需要传入初始数据，一般的用法是`types.optional(Model, {})`。**注意，这个并不是官方用法，是在我开发的过程中发现这么写可以省很多事儿，也没发现什么副作用。如果有问题，欢迎在评论区指正。**
- 另一个是`types.frozen`，这个类型的作用是存不可观测的`array`或`object`，是简单类型。这里有点难理解，简单来说，这个`array`或`object`可以看作一个整体，如果`array`中的元素或`object`中**的key发生变化，MST是不会观测到变化的**，在`array`或`object`的**引用地址改变后，MST会观测到，并整体改变这个值，** 有点类似于Redux需要返回immutable的修改方式。

类型检查和`Typescript`的类型检查一样，变量只能被赋予预先定义类型的值。不同的是，Typescript的类型检查是静态的，**MST的类型检查时运行中的，即在程序运行的任何时候，给MST的prop传入了不对的数据类型，MST都会报错，但并不会中断JS进程**。由于MST开发的时候typescript还没有现在这么流行，所以MST做了自己的类型检查系统，这对于复杂的业务系统是很必要的。在使用typescript的情况下，MST在绝大多数情况下，也可以很好的配合，只不过还有一些小问题需要hack一下，下面会提到。

### 最好掌握的进阶API

这些进阶的API是我在开发中发现的常用功能，但不是必要的，所以和必须API区分开来。除此之外，MST还有很多高级功能，由于篇幅和定位，感兴趣的可以直接去文档查阅。

- `types.views()`

对应Mobx中的**计算值**，在`types.views()`中定义，**必须是纯函数**，如果定义的是getter方法，则以值的形式从外部访问。我认为区分view和action的最简单方法**就是view中都定义getter，可以减少心智负担**。views最大的用处就是减少**业务中通过一个状态推算出的另一个状态**，直接看官方示例：

```typescript 
const UserStore = types
    .model({
        users: types.array(User)
    })
    .views(self => ({
        // 对外暴露为值
        get numberOfChildren() {
            return self.users.filter(user => user.age < 18).length
        },
        // 对外暴露为方法
        numberOfPeopleOlderThan(age) {
            return self.users.filter(user => user.age > age).length
        }
    }))

```


- `self`

`types.views()`和`types.actions()`中回调函数的参数，**代表当前树的实例，作者解释这样可以解决this可能带来的问题。** 通过self，在view和action中可以使用当前树上定义的数据和方法，也可以通过帮助函数在树上遍历。self还带有参数类型，不过由于view和action中的方法通过回调方式增加，这导致Typescript无法推断出self上通过view和action定义的方法和数据。目前我还没有发现优雅的解决方案，网上的方案在适用性上都有一定的问题，只能先让Typescript忽略掉这个错误（// @ts-ignore）。

详见：[mobx-state-tree.js.org/tips/typesc…](https://link.juejin.cn/?target=https://mobx-state-tree.js.org/tips/typescript "mobx-state-tree.js.org/tips/typesc…")

```typescript 
const Example = types
    .model("Example", {
        prop: types.string
    })
    .views(self => ({
        get upperProp(): string {
            return self.prop.toUpperCase()
        },
        get twiceUpperProp(): string {
            // 这里就是问题
            // @ts-ignore
            return self.upperProp + self.upperProp // Compile error: `self.upperProp` is not yet defined
        }
    }))

```


- `flow`

异步函数处理函数 \*\*，接受一个generator函数作为参数，然后在该generator函数中对prop的修改就都会被认为是在action中做的。**这个方法和Mobx中的flow方法一样，类似于Redux中的异步中间件，都是为了解决异步函数中异**步操作不在action context中的问题 \*\*。所以其实只需要记住用法：`flow(function* { ... })`，然后把`async function() { await ... }`换成`funciton*() { yield ... }`，还是看官方示例有个直观印象：

```typescript 
import { types, flow } from "mobx-state-tree"

someModel.actions(self => ({
    // generator函数
    fetchProjects: flow(function*() {
        self.state = "pending"
        try {
            // yield 代替 await
            self.githubProjects = yield fetchGithubProjectsSomehow()
            self.state = "done"
        } catch (error) {
            console.error("Failed to fetch projects", error)
            self.state = "error"
        }
        // flow会返回一个promise，如果返回值，则在promise中resolve该值
        return self.githubProjects.length
    })
}))

```


- `action`和`volatile state`

听着高大上，其实就是**通过闭包**在action中建立变量存放不需要对外暴露的数据。`volatile state`在MST中有两种用法，一种是`types.volatile`，一种是闭包中声明变量。比较坑的地方在于两种方式声明的`volatile state`表现是不同的，最主要的区别在于`types.volatile`可以被外部访问到，而闭包中变量是绝对无法访问的。具体区别详见：[mobx-state-tree.js.org/concepts/vo…](https://link.juejin.cn/?target=https://mobx-state-tree.js.org/concepts/volatiles "mobx-state-tree.js.org/concepts/vo…")

**我个人建议只使用闭包的方式定义，这更符合**\*\*`volatile state`\*\***的使用场景，闭包的变量也不会对model外部造成影响，防止本不该暴露的状态被外部引用。如果这个状态需要向外暴露，那么声明为prop更加合理。**

官方示例：

```typescript 
const Store = types
    .model({
        todos: types.array(Todo),
        state: types.enumeration("State", ["loading", "loaded", "error"])
    })
    .actions(self => {
        // volatile state
        let pendingRequest = null 

        function afterCreate() {
            self.state = "loading"
            pendingRequest = someXhrLib.createRequest("someEndpoint")
        }

        function beforeDestroy() {
            // 使用闭包变量
            pendingRequest.abort()
        }

        return {
            afterCreate,
            beforeDestroy
        }
    })

```


## React里怎么用

在本文的What部分已经说了，MST几乎可以和市面上的任何前端框架搭配，所以和React的配合的部分不是MST提供的，而是`mobx-react`或`mobx-react-lite`。这两个包会收集React组件中用到的`observable`，并把组件的渲染注册成这些`observable`的`reaction`，在`observable`变化之后，自动触发依赖组件的渲染。这也是Mobx系方案对比Redux系方案的一大优势——**几乎不需要手动的优化组件渲染**。对于业务系统来说，这是一个可以降本增效的大优点。两个包的区别在于只有`mobx-react`支持`Class`组件，对于新项目来说，建议直接使用`function`组件和更轻量`mobx-react-lite`，然后通过hooks创建一个`root model`的`context`，组件通过`context provider`获取`model`实例。看一个具体的例子

```typescript 
// Model/index.ts
import { createContext, useContext } from 'react'
import { types } from 'mobx-state-tree'

// 定义context
export const store = types.model({ ... }).create({ ... })
export const ModelContext = createContext(store)
export const useStore = () => useContext(ModelContext)

// index.tsx
import ReactDOM from 'react-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
// 通过context provider注入model
root.render(
    <ModelContext.Provider value={store}>
      <App />
    </ModelContext.Provider>
)

// component.tsx
import { observer } from 'mobx-react-lite'

const Example = () => {
    // 通过自定义hook使用model
    const { MODEL_PROP: model } = useStore()

    const onAction = () => {
        model.action(...)
    }

    return <div>{model.prop}</div>
}
// 使用observer包裹组件
export default observer(Example)

```
