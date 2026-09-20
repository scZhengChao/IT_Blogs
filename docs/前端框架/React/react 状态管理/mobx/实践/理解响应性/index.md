# 理解响应性

## 目录

- [MobX 跟踪属性的访问，而不是属性的值本身](#MobX-跟踪属性的访问而不是属性的值本身)

[理解响应性](IT/前端框架/React/react%20状态管理/mobx/文档和理解/提示和技巧/理解响应性/理解响应性.md "理解响应性")

> Mobx 会对跟踪函数执行时**读取的**任何 ***存在的***\*\* 可 观察的 \*\****属性*** 做出响应。

- *“读取”* 使用一个对象的属性, “读取”有两种方式。一种是点访问（dotting into），例如 `user.name` 。另一种是方括号访问，例如 `user['name']`、`todos[3]`。
- *“跟踪函数”* 其可以是 `computed` 的表达式、作为 `observer` 的 React 函数式组件的渲染（rendering）、作为 `observer` 的 React 类组件的 `render()` 方法，也可以是作为第一个参数传递给 `autorun` 、 `reaction` 和 `when` 的函数。
- *“跟踪函数执行时”* 这意味着只有那些在跟踪函数执行时读取的可观察对象才会被跟踪。这些值在跟踪函数中是直接使用还是间接使用并不重要。但是从函数“引发”出来的东西将不会被跟踪（例如， `setTimeout` `promise.then`， `await` 等）。

换句话说，MobX 将不会对下面的情况做出响应：

- 从可观察对象中获取到，但是并没有在跟踪函数中使用的值
- **在异步调用的代码块中读取的可观察值**

## MobX 跟踪属性的访问，而不是属性的值本身

为了用一个例子详细说明上述规则，我们假设你有以下可观察的实例：

```typescript 
class Message {
    title
    author
    likes
    constructor(title, author, likes) {
        makeAutoObservable(this)
        this.title = title
        this.author = author
        this.likes = likes
    }

    updateTitle(title) {
        this.title = title
    }
}

let message = new Message("Foo", { name: "Michel" }, ["Joe", "Sara"])
```


在内存中这个例子将会像下图所示的这样，绿色的块代表的是 *可观察的* 属性，注意 *值本身* 并不是可观察的！

![](./assets/image/image_X4pX1bcgiE.png)

简单来说，MobX 所做的就是记录下**你在跟踪函数中所使用的属性的箭头指向**（就像上图中的箭头那样）。在此之后，当这些**箭头中的任何一个发生变化**（比如该箭头从一个值指向另一个值）时，MobX 都会响应变化，并重新执行相应的跟踪函数。
