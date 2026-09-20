# Computeds

## 目录

- [通过 computeds 派生信息](#通过-computeds-派生信息)
  - [例子](#例子)
  - [规则](#规则)
  - [提示](#提示)
    - [提示： 如果\_没有\_被观察，计算值将会被暂时停用](#提示-如果_没有_被观察计算值将会被暂时停用)
    - [计算值可以有 setters](#计算值可以有-setters)
    - [{🚀} 提示： computed.struct 比较输出的结构](#-提示-computedstruct-比较输出的结构)
    - [{🚀} 提示： 计算值可以拥有参数](#-提示-计算值可以拥有参数)
    - [{🚀} 提示： 使用 computed(expression) 创建独立的计算值](#-提示-使用-computedexpression-创建独立的计算值)
  - [Options {🚀}](#Options-)
    - [name](#name)
    - [equals](#equals)
      - [内置 comparers](#内置-comparers)
    - [requiresReaction](#requiresReaction)
    - [keepAlive](#keepAlive)

# 通过 computeds 派生信息

使用：

- `computed` *（注解）*
- `computed(options)` *（注解）*
- `computed(fn, options?)`

计算值可以用来从其他可观察对象中派生信息。 计算值采用惰性求值，会缓存其输出，并且只有当其依赖的可观察对象被改变时才会重新计算。 它们在**不被任何值观察时会被暂时停用。**

从概念上讲，它们和电子表格中的公式非常相似，并且作用强大、不可被低估。**它们可以协助减少你需要存储的状态的数量，并且是被高度优化过的。请尽可能使用它们。**

## 例子

计算值可以通过在 `JavaScript` [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get "getters") 上添加 `computed` 注解来创建。 使用 `makeObservable` 将 getter 声明为 computed。或者如果你希望所有的 getters 被自动声明为 `computed`，可以使用 `makeAutoObservable`，`observable` 或者 `extendObservable`。

下面的示例依靠 [Reactions {🚀}](https://www.mobxjs.com/reactions "Reactions {🚀}") 高级部分中的 [autorun](https://www.mobxjs.com/reactions#autorun "autorun") 来辅助说明计算值的意义。

```typescript 
import { makeObservable, observable, computed, autorun } from "mobx"

class OrderLine {
    price = 0
    amount = 1

    constructor(price) {
        makeObservable(this, {
            price: observable,
            amount: observable,
            total: computed
        })
        this.price = price
    }

    get total() {
        console.log("Computing...")
        return this.price * this.amount
    }
}

const order = new OrderLine(0)

const stop = autorun(() => {
    console.log("Total: " + order.total)
})
// Computing...
// Total: 0

console.log(order.total)
// (不会重新计算!)
// 0

order.amount = 5
// Computing...
// (无需 autorun)

order.price = 2
// Computing...
// Total: 10

stop()

order.price = 3
// 计算值和 autorun 都不会被重新计算.
```


上面的例子很好地展示了 `计算值` 的好处，它充当了缓存点的角色。 即使我们改变了 `amount`，进而触发了 `total` 的重新计算， 也不会触发 `autorun`，**因为 ****`total`**** 将会检测到其输出未发生任何改变，所以也不需要更新 ****`autorun`****。**

相比之下，**如果 ****`total`**** 没有被注解，那么 ****`autorun`**** 会把副作用运行 3 次，** 因为它将直接依赖于 `total` 和 `amount`。[自己试一下吧](https://codesandbox.io/s/computed-3cjo9?file=/src/index.tsx "自己试一下吧")。

![](https://www.mobxjs.com/assets/images/computed-example-f6f76f3516441f19d6208484044a58a0.png)

上图是为以上示例创建的依赖图。

## 规则

使用计算值时，请遵循下面的最佳实践：

1. 它们**不应该有副作用或者更新其他可观察对象。**
2. 避免**创建和返回新的可观察对象。**
3. 它们不**应该依赖非可观察对象的值**

## 提示

##### **提示：** 如果\_没有\_被观察，计算值将会被暂时停用

如果你创建了一个计算属性但是并没有在任何 reaction 中使用它，那么它将不会被记忆化，并且其重新计算看起来会发生得更加频繁，而不是只发生在必要时。这有时会使新接触 MobX 的人感到困惑，他们也许习惯于使用像 [Reselect](https://github.com/reduxjs/reselect "Reselect") 这样的库。 例如，我们在上面的例子后面加上两次对 `console.log(order.total)` 的调用，在调用了 `stop()` 之后，`total` 仍然会被重新计算两次。

MobX 将会**自动挂起不活动的计算值 以避免不必要地更新未访问的计算值。但是，如果某些计算属性\_没有\_被任何 reaction 使用，当他们每次被请求的时候都会重新运行计算表达式，与普通属性的行为一致。**

虽然直接操作计算属性这会导致效率下降，但是如果你在项目中使用 `observer`，`autorun` 等，它们会非常高效。

下面的代码说明了这个问题：

```typescript 
// OrderLine 拥有一个计算属性 `total`.
const line = new OrderLine(2.0)

 // 如果你在 reaction 之外访问 `line.total`, 那么它每次都会被重新计算.
 setInterval(() => {
    console.log(line.total)
}, 60)


```


我们可以通过用 `keepAlive` 选项设置的注解对其进行覆盖（[自己试一下吧](https://codesandbox.io/s/computed-3cjo9?file=/src/index.tsx "自己试一下吧")），或者用 `autorun(() => { someObject.someComputed })` 创建一个 no-op 指令，稍后如果需要的话，我们可以轻松地把它清理掉。 请注意，这两种解决方案都有造成内存泄漏的风险。更改这里的默认行为是一种反模式。

MobX 还可以使用 [computedRequiresReaction](https://www.mobxjs.com/configuration#computedrequiresreaction-boolean "computedRequiresReaction") 选项进行配置，以便在你从响应式上下文之外访问计算属性时报错。

##### 计算值可以有 setters

你也可以为计算值定义一个 [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set "setter")。需要注意的是，这些 setters **不能直接更改计算属性的值， 但是它们可以被当作派生的“逆操作”使用。setters 会被自动标记为 actions。例如：**

```typescript 
class Dimension {
    length = 2

    constructor() {
        makeAutoObservable(this)
    }

    get squared() {
        return this.length * this.length
    }
    set squared(value) {
        this.length = Math.sqrt(value)
    }
}
```


##### {🚀} **提示：** `computed.struct` 比较输出的结构

如果一个**计算值在结构上等同于上一次的计算结果并且其输出不需要通知观察者**，那么你可以使用 `computed.struct`。在通知观察者之前，它将会对结构进行比较而不是检查具体的引用是否相同。例如：

```typescript 
class Box {
    width = 0
    height = 0

    constructor() {
        makeObsevable(this, {
            x: observable,
            y: observable,
            topRight: computed.struct
        })
    }

    get topRight() {
        return {
            x: this.width,
            y: this.height
        }
    }
}
```


默认请况下，`computed` 的输出会**被通过引用进行比较**。因为上面例子中的 `topRight` 将**始终生成一个新的结果对象，**因此它永远不会被视为与先前的输出相等的值**。除非你使用 ****`computed.struct`****。**

然而，在上面的例子中，*我们实际上并不需要 \*\*`computed.struct`*！ 计算值通常**会在它依赖的值改变时重新计算**。 这就是为什么 `topRight` 只会对 `width` 或者 `height` 的变化做出反应。 因为如果这些值发生了变化，我们总会得到一个不同的 `topRight` 坐标。`computed.struct` 将永远**也不会命中缓存并且还会造成无效的计算，因此我们并不需要它。**

在实践中，`computed.struct` 的**作用并没有它听起来那么大**。只有在所依赖的**可观察变量的改变依旧可以导致相同的输出时再使用它**。例如，我们当时先对坐标进行了取整，那么即使所依赖的基础值不相等，经过取整的的坐标也可能等于先前经过取整的坐标。

查看 [equals](https://www.mobxjs.com/computeds#equals "equals") 选项来了解更多对判断输出是否已经改变的方式进行自定义的方法。

##### {🚀} **提示：** 计算值可以拥有参数

虽然 getters 不接受任何参数，但是[这里讨论了](https://www.mobxjs.com/computeds-with-args "这里讨论了")几种需要参数的派生值的使用策略

##### {🚀} **提示：** 使用 `computed(expression)` 创建独立的计算值

`computed` 也可以作为一个函数直接调用，就像 [observable.box](https://www.mobxjs.com/api#observablebox "observable.box") 一样创建一个独立的计算值。 在返回的对象上使用 `.get()` 获取当前的计算值。 这种使用 `computed` 的形式并不常见，但是在某些情况下，使用 computed 生成独立的计算值可能会很有用，我们在 [这里](https://www.mobxjs.com/computeds-with-args "这里") 讨论了一种情况。

## Options {🚀}

通常情况下，`computed` 是可以开箱即用的，但是可以通过传入 `options` 参数自定义其行为。

### `name`

该字符串在 [Spy event listeners](https://www.mobxjs.com/analyzing-reactivity#spy "Spy event listeners") 和 [MobX developer tools](https://github.com/mobxjs/mobx-devtools "MobX developer tools") 中用作调试名称。

### `equals`

默认设置为 `comparer.default`。它充当一个比较函数，**用于比较上一个值和下一个值。如果该函数认为两个值相等，那么观察者们将不会被重新计算。**

在处理其他库的结构性数据和类型时，这个选项会很有用。例如，`(a, b) => a.isSame(b)`可以被用在一个 [moment](https://momentjs.com/ "moment") 计算实例上。如果你想使用结构比较或者浅比较来确定新值是否与之前的值不同， `comparer.structural` 和 `comparer.shallow` 就会派上用场，最后还会通知观察者。

查看上面的 [computed.struct](https://www.mobxjs.com/computeds#computed-struct "computed.struct") 部分。

#### 内置 comparers

MobX 提供了四种内置的 `comparer` 方法，这些方法满足 `computed` 的 `equals` 选项的大多数需求：

- `comparer.identity` 使用全等 （`===`）运算符确定两个值是否相同。
- `comparer.default` 与 `comparer.identity` 相同，但是其认为 `NaN` 等于 `NaN`。
- `comparer.structural` 执行深层的结构比较以确定两个值是否相同。
- `comparer.shallow` 执行浅层的结构比较以确定两个值是否相同。

你可以从 `MobX` 导入 `comparer` 来访问这些方法。它们也可以用于 `reaction`。

### `requiresReaction`

推荐在非常昂贵的计算值中将这个选项设置为 `true`。如果你试图在响应式上下文之外读取这样的计算值——这种情况下，它可能不会被缓存起来——就会导致计算值抛出错误，而不是进行昂贵的重新计算。

### `keepAlive`

这个选项会避免计算值在未被观察时被暂时停用（可以查看上面的解释）。这可能会导致内存泄漏，这种内存泄漏与我们在 [reactions](https://www.mobxjs.com/reactions#always-dispose-of-reactions "reactions") 中讨论到的类似。
