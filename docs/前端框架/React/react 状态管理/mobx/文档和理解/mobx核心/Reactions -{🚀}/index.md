# Reactions \\{🚀}

## 目录

- [使用 reactions 处理副作用 {🚀}](#使用-reactions-处理副作用-)
  - [Autorun](#Autorun)
    - [tracking 如何工作](#tracking-如何工作)
    - [例子](#例子)
  - [Reaction](#Reaction)
    - [例子： 数据和副作用函数](#例子-数据和副作用函数)
  - [When](#When)
    - [*例子：* \*以一种响应式的方式将值清理掉](#例子以一种响应式的方式将值清理掉)
    - [await when(...)](#await-when)
  - [规则](#规则)
  - [Always dispose of reactions](#Always-dispose-of-reactions)
    - [例子： 内存泄漏](#例子-内存泄漏)
  - [谨慎地使用 reactions！](#谨慎地使用-reactions)
  - [Options {🚀}](#Options-)
    - [name](#name)
    - [fireImmediately (reaction)](#fireImmediately-reaction)
    - [delay (autorun, reaction)](#delay-autorun-reaction)
    - [timeout (when)](#timeout-when)
    - [onError](#onError)
    - [scheduler (autorun, reaction)](#scheduler-autorun-reaction)
    - [equals: (reaction)](#equals-reaction)

# 使用 reactions 处理副作用 {🚀}

reactions 是需要理解的重要概念，因为他可以将 MobX 中所有的特性有机地融合在一起。 reactions 的目的是**对自动发生的副作用进行建模**。 它们的意义在于为你的可观察状态创建消费者，以及每当\_关联\_的值发生变化时，\_自动\_运行副作用。

然而，理解了这一点之后，重要的是要认识到这里所讨论的 API 应该很少会被用到。 它们经常被抽象到其他的库里面（例如，mobx-react）或者你的应用程序中其他特定的抽象库。

但是，为了理解 MobX，让我们看一下如何创建 reactions。 最简单的方式是使用 [autorun](https://www.mobxjs.com/reactions#autorun "autorun") 工具函数。 除此之外，还有 [reaction](https://www.mobxjs.com/reactions#reaction "reaction") 和 [when](https://www.mobxjs.com/reactions#when "when")。

## Autorun

用法：

- `autorun(effect: (reaction) => void)`

`autorun` 函数接受一个函数作为参数，每当该函数所观察的值发生变化时，它都应该运行。 当你自己创建 `autorun`时，它也会运行一次。**它仅仅对可观察状态的变化做出响应，** 比如那些你用`observable` 或者 `computed` 注释的。

### tracking 如何工作

Autorun 通过在\_响应式上下文\_运行 `effect` 来工作。在给定的函数执行期间，MobX 会持续跟踪被 effect 直接或间接\_读取\_过的所有可观察对象和计算值。 一旦函数执行完毕，MobX 将收集并订阅所有被读取过的可观察对象，并等待其中任意一个再次发生改变。 一旦有改变发生，`autorun` 将会再次触发，重复整个过程。

![](./image/image_xRGQni3ylq.png)

这就是下面的示例的工作方式。

### 例子

正如你在上面输出的前两行看到的，两个 `autorun` **函数在初始化时都会运行一次**。这就是在运行 `for` 循环前可以看到的内容。

一旦我们运行 `for` 循环使用 `reduceEnergy` action 改变 `energyLevel`， 每当 `autorun` 观察到可观察状态的变化时， 我们将会看到一条新的 log 条目被打印出来：

1. 对于 *“Energy level”* 函数，它总是可以检测到`energyLevel` 可观察对象的变化，总共发生 10 次。
2. 对于 *“Now I'm hungry”* 函数，它总是可以检测到`isHungry` 计算值的变化， 总共发生 1 次。

## Reaction

用法：

- `reaction(() => value, (value, previousValue, reaction) => { sideEffect }, options?)`.

`reaction` 类似于 `autorun`，但可以**让你更加精细地控制要跟踪的可观察对象**。 它接受两个函数作为参数：第一个，*data* 函数，**其是被跟踪的函数并且其返回值将会作为第二个函数**，***effect***\*\* 函数，的输入\*\*。 重要的是要注意，**副作用\_只会\_对 data 函数中\_被访问过\_的数据做出反应，这些数据可能少于 effect 函数中实际使用的数据。**

一般的**模式是在 data 函数中返回你在副作用中需要的所有数据，** 并以这种**方式更精确地控制副作用触发的时机**。 与 autorun 不同 **，副作用在初始化时不会自动运行，而只会在 data 表达式首次返回新值之后运行**

##### **例子：** 数据和副作用函数

在下面的例子中，reaction 只会在 `isHungry` **发生改变时被触发一次**。 在 *effect* 函数中使用的 `giraffe.energyLevel` 的更改，并不会触发 *effect* 函数。如果你想要 `reaction` 也对这个值的变化做出反应， 你**需要在 *****data***** 函数中访问并返回它**。

```typescript 
import { makeAutoObservable, reaction } from "mobx"

class Animal {
    name
    energyLevel

    constructor(name) {
        this.name = name
        this.energyLevel = 100
        makeAutoObservable(this)
    }

    reduceEnergy() {
        this.energyLevel -= 10
    }

    get isHungry() {
        return this.energyLevel < 50
    }
}

const giraffe = new Animal("Gary")

reaction(
    () => giraffe.isHungry,
    isHungry => {
        if (isHungry) {
            console.log("Now I'm hungry!")
        } else {
            console.log("I'm not hungry!")
        }
        console.log("Energy level:", giraffe.energyLevel)
    }
)

console.log("Now let's change state!")
for (let i = 0; i < 10; i++) {
    giraffe.reduceEnergy()
}
```


输出：

Now let's change state!
Now I'm hungry!
Energy level: 40

## When

使用：

- `when(predicate: () => boolean, effect?: () => void, options?)`
- `when(predicate: () => boolean, options?): Promise`

`when` 会**观察并运行给定的 *****predicate***** 函数，直到其返回** `true`。 **一旦 predicate 返回了 true，给定的 *****effect***** 函数就会执行并且自动执行器函数将会被清理掉。**

如果你没有传入 `effect` 函数，`when` 函数返回一个 `Promise` 类型的 disposer，并允许你手动取消。

##### *例子：* \*以一种响应式的方式将值清理掉

`when` 对于以响应式的方式将值清理或取消掉十分有用。 例如：

```typescript 
import { when, makeAutoObservable } from "mobx"

class MyResource {
    constructor() {
        makeAutoObservable(this, { dispose: false })
        when(
            // Once...
            () => !this.isVisible,
            // ... then.
            () => this.dispose()
        )
    }

    get isVisible() {
        // 表示此项目是否可见.
    }

    dispose() {
        // 清理一些资源.
    }
}
```


一旦 `isVisible` 变成 `false`，`dispose` 方法将会被调用， 并对 `MyResource` 做一些清理操作。

### `await when(...)`

如果你没有提供 `effect` 函数，`when` 将会返回一个 `Promise`。这样会跟 `async / await` 很好地结合在一起，让你可以等待可观察对象中的变化。

```typescript 
async function() {
  await when(() => that.isVisible)
  // etc...
}
```


如果要提前取消 `when`，可以对它返回的 Promise 调用 `.cancel()` 函数。

## 规则

这里是一些 `reactive context` 需要遵守的规则：

1. 默认情况下，如果可观察对象发生了改变，受其影响的 `reactions` **会立即（同步）运行**。然而，它们直到当前最外层的 (trans)action 执行结束后才会运行。
2. autorun 只会跟踪**给定函数在同步执行过程中所读取的可观察对象，不会跟踪异步发生的变化。**
3. autorun 不会跟踪被**其调用的 action 所读取的可观察对象，****因为 action 始终\_不会被追踪\_。**

有关 MobX 会与不会对各种值作出响应的更多示例，请查看 [理解响应性](https://www.mobxjs.com/understanding-reactivity "理解响应性") 部分。 对于依赖跟踪如何工作的更详细的技术细节，请阅读博客 [Becoming fully reactive: an in-depth explanation of MobX](https://hackernoon.com/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254 "Becoming fully reactive: an in-depth explanation of MobX")。

## Always dispose of reactions

传递给 `autorun`，`reaction` 和 `when` 的函数**只有在**它们观察的**所有对象都被 GC 之后才会被 GC**。原则上，它们一直等待可观察对象发生新的变化。 为了阻止 reactions 永远地等待下去 **，它们总是会返回一个 disposer 函数，该函数可以用来停止执行并且取消订阅所使用的任何可观察对象。**

```typescript 
const counter = observable({ count: 0 })

// 初始化一个 autorun 并且打印 0.
const disposer = autorun(() => {
    console.log(counter.count)
})

// 打印: 1
counter.count++

// 停止 autorun.
disposer()

// 不会打印消息.
counter.count++
```


**我们强烈建议你，一旦**不再需要这些方法中的副作用时，请**务必调用它们所返回的 disposer 函数。 否则可能导致内存泄漏。**

reaction 和 autorun 中 effect 函数**的第二个参数 reaction 也可以被用来提前把 reaction 清理掉（通过调用 reaction.dispose()）**

##### **例子：** 内存泄漏

```typescript 

class Vat {
    value = 1.2

    constructor() {
        makeAutoObservable(this)
    }
}

const vat = new Vat()

class OrderLine {
    price = 10
    amount = 1
    constructor() {
        makeAutoObservable(this)

         // 这个 autorun 将会和本 OrderLine 实例一起进行 GC,
        // 因为它只使用了来自 `this` 的可观察对象.
         // 所以不一定非要在删除 OrderLine 实例后立刻把它清理掉。
        this.disposer1 = autorun(() => {
            doSomethingWith(this.price * this.amount)
        })

         // 这个 autorun 将不会和本 OrderLine 实例一起进行 GC,
        // 因为 vat 保存了对这个 autorun 的引用用于通知改变,
        // 这样反过来又会把 'this' 保存在作用域中。
         this.disposer2 = autorun(() => {
            doSomethingWith(this.price * this.amount * vat.value)
        })
    }

    dispose() {
        // 所以, 为了避免内存问题, 当不再需要 reactions 之后
        // 务必要调用 disposers.
        this.disposer1()
        this.disposer2()
    }
}
```


## 谨慎地使用 reactions！

就像上面已经说过的那样，你不会经常创建 reactions。 很有可能你的应用程序不会直接使用这些 API 中的任何一个，而只会通过比如使用 mobx-react 绑定中的 `observer` 这样间接的方式创建出 reaction。

在你创建 reaction 之前，最好检查一下它是否符合下面几条原则：

1. **只有在引起副作用的一方与副作用之间没有直接关系的情况下才使用 reaction**： 如果一个副作用会为了响应很小的一组 events 或 actions 而执行，那么直接从那些特定的 action 中触发这个副作用通常会更容易理解。例如，如果按下表单提交按钮会导致一个 POST 网络请求的发送，那么为了响应 `onclick` 事件，直接触发这个副作用就会比通过 reaction 间接触发更容易理解。相比之下，如果你对表单状态的一切修改最后都会被自动存储到 localStorage，那么使用一个 reaction 可能就会很有帮助，这样你就不用在每个独立的 `onChange` 事件中触发这个副作用了。
2. **reactions 不应该更新其他可观察对象：** 这个 reaction 是否会修改其他可观察对象？如果答案是肯定的，那么你一般应该把你想要更新的可观察对象注解为[computed](https://www.mobxjs.com/computeds "computed") 值。例如，如果一个待办事项的集合 `todos` 发生了变化，那么请不要使用 reaction 来计算剩余待办 `remainingTodos` 的数量，而要把 `remainingTodos` 注解为计算值。这将使得代码更容易理解和调试。reaction 不应该计算生成新的数据，而只应该触发副作用。
3. **reactions 应该是独立的**：你的代码是否依赖其他必须首先运行的 reaction？如果发生这种情况，你可能违反了第一条规则， 你可以选择将你需要创建的新 reaction 合并到它所依赖 reaction 中。MobX 并不能保证 reaction 的执行顺序。

有些实践并不符合上述原则。这就是为什么它们是\_原则\_，而不是\_法则\_。 但是，例外情况很少见，只有在万不得已的情况下才违反它们。

## Options {🚀}

上面提到的 `autorun`，`reaction` 和 `when` 都可以通过传递一个 `options` 参数来进一步自定义它们的行为。

### `name`

该字符串在 [Spy event listeners](https://www.mobxjs.com/analyzing-reactivity#spy "Spy event listeners") 和 [MobX developer tools](https://github.com/mobxjs/mobx-devtools "MobX developer tools") 中用作此 reaction 的调试名称。

### `fireImmediately` *(reaction)*

布尔值，指示在第一次运行 *data* 函数后立即触发 *effect* 函数。默认为 `false`。

### `delay` *(autorun, reaction)*

对 effect 函数进行节流的毫秒数。如果是 0（默认值），将不进行节流操作。

### `timeout` *(when)*

设置一段有限的 `when` 将要等待的时间。如果过了时限，`when` 将会 reject 或抛出错误。

### `onError`

默认情况下，**将记录 reaction 中引发的任何异常，但不会向上抛出。** 这样确保了在一个 reaction 中引发异常将不会影响其他按计划执行的不相关的 reaction 的调度。**这同样允许 reaction 从异常中恢复。抛出异常不会打断 MobX 所做的依赖跟踪，** 所以如果消除了引发异常的因素，则后续的 reaction 可能会再次正常完成。此选项允许覆盖该行为。可以使用[configure](https://www.mobxjs.com/configuration#disableerrorboundaries-boolean "configure") 设置全局错误处理程序或完全禁用错误捕获。

### `scheduler` *(autorun, reaction)*

设置一个自定义调度程序，用来决定应该如何调度 autorun 函数的重新运行。它接受一个函数作为参数，这个函数应该在将来某个时刻被调用，例如：`{ scheduler: run => { setTimeout(run, 1000) }}`。

### `equals`: (reaction)

默认情况下设置为 `comparer.default`。如果指定，则此比较函数用于比较 *data* 函数产生的上一个值和下一个值。当且仅当此函数返回 false 时，*effect* 函数才会被执行。

请查看 [内置 comparers](https://www.mobxjs.com/computeds#built-in-comparers "内置 comparers") 部分。
