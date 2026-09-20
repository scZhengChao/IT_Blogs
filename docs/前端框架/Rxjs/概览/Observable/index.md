# Observable

## 目录

- [惰性的](#惰性的)
- [创建Observable](#创建Observable)
- [订阅 Observables](#订阅-Observables)
- [执行 Observables](#执行-Observables)
- [处理 Observable 执行](#处理-Observable-执行)

# 惰性的

```typescript 
import { Observable } from 'rxjs';

const foo = new Observable((subscriber) => {
  console.log('Hello');
  subscriber.next(42);
});

foo.subscribe((x) => {
  console.log(x);
});
foo.subscribe((y) => {
  console.log(y);
});
```


其输出是一样的：

```javascript 
"Hello"
42
"Hello"
42
```


这是因为函数和 Observable **都是惰性计算**的。如果你不调用该函数，`console.log('Hello')` 就不会发生。同样对于 Observables，如果你不“调用”它（使用 `subscribe`），`console.log('Hello')` 就不会发生。另外，**“调用”或“订阅”都是一种孤立的操作**：两个函数**调用会触发两个单独的副作用，两个对 Observable 的订阅会触发两个单独的副作用**。与 EventEmitter 共享副作用并且无论订阅者是否存在都急性执行相反，Observables 不会共享执行并且是惰性的。

# 创建Observable

可以使用 `new [Observable]`。最常见的是， Observable 是使用创建函数创建的，例如 `[of]`、`[from]`、`[interval]` 等。

```typescript 
import { Observable } from 'rxjs';

const observable = new Observable(function subscribe(subscriber) {
  const id = setInterval(() => {
    subscriber.next('hi');
  }, 1000);
});
```


# 订阅 Observables

```javascript 
observable.subscribe((x) => console.log(x));
```


`observable.subscribe` 和 `new [Observable](function subscribe(subscriber) {...})` 中的 `subscribe` **同名并非巧合**。在本库中，它们是不同的，但从使用角度，你可以认为它们在概念上是相同的。

这显示了 `subscribe` 调用在同一个 `Observable` 的多个 `Observer` 之间是不共享的。当以某个 Observer 调用 `observable.subscribe` 时，`new [Observable](function subscribe(subscriber) {...})` 中的 `subscribe` 函数会针对给定的订阅者运行。对 `observable.subscribe` 的每次调用都会为给定的订阅者触发其自己的独立设置。

> **订阅 Observable 就像调用一个函数，其参数是要传过去数据的回调函数。**

这与 `addEventListener` / `removeEventListener` 等事件处理器 API 截然不同。使用 `observable.subscribe` 时，给定的 Observer **不会在此 Observable 中注册为监听器**。此 Observable\*\* 甚至不会维护附加上来的 Observer 列表\*\*。

`subscribe` 调用只是一个启动“ Observable 的执行”并将一些值或事件传递给该执行过程的 Observer 的方法。

# 执行 Observables

`new [Observable](function subscribe(subscriber) {...})` 中的代码表示一次 “Observable 执行”，这是一种**惰性计算**，只发生在每个订阅的 `Observer` 上。随着时间的推移，执行会同步或异步地产生多个值。

Observable 执行可以传递三种类型的值：

- “Next（下一个）” 通知：发送数值、字符串、对象等。
- “Error（出错）” 通知：发送 JavaScript 错误或异常。
- “Complete（完成）”通知：不发送值。

“Next”通知是最重要和最常见的类型：它们代表要传递给订阅者的实际数据。在 Observable 执行期间，**“Error”和“Complete”通知可能只发生一次，并且只能有其中之一。**

这些约束在所谓的 \_Observable 语法\_或\_契约\_中表达得最好，写成正则表达式：

在 Observable 执行中，可能会**传递零个到无限个 Next 通知**。如果发送了出错或完成通知，则之后将无法发送任何其它通知。

# 处理 Observable 执行

因为 Observable **执行可能是无尽**的，并且 `Observer` 想要在**有限时间内中止执行**也是很常见的，所以我们需要一个用于**取消执行的 API**。由于每次**执行只针对一个 Observer**，一旦 `Observer` 接收完了值，它**必须有办法停止执行，以避免浪费计算能力或内存资源**。

当 `observable.subscribe` 被调用时，此 `Observer` 被附加到新创建的 Observable 执行中。此调用还会返回一个对象 `[Subscription]` ：

```javascript 
const subscription = observable.subscribe((x) => console.log(x));
```


Subscription 代表**正在进行中的执行**，并具有**允许你取消该执行的最小 API**。[在此处阅读有关 ](https://rxjs.tech/guide/subscription "在此处阅读有关 ")[Subscription](https://rxjs.tech/guide/subscription "Subscription")[ 类型](https://rxjs.tech/guide/subscription " 类型")的更多信息。使用 `subscription.unsubscribe()` 你可以取消正在进行的执行：

```typescript 
import { from } from 'rxjs';

const observable = from([10, 20, 30]);
const subscription = observable.subscribe((x) => console.log(x));
// Later:
 subscription.unsubscribe();
```


> 当你订阅时，你会得到一个 Subscription，**它代表正在进行的执行**。只需调用 `unsubscribe()` 即可取消执行。

当我们使用 `create()` 创建 `Observable` 时，每个 Observable 都必须定义如何处理该执行的资源。你可以通过从 `function subscribe()` 中**返回自定义 ****`unsubscribe`**** 函数来做到这一点。**

例如，这就是我们使用 `setInterval` 清除定时执行集的方式：

```typescript 
const observable = new Observable(function subscribe(subscriber) {
  // Keep track of the interval resource
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  // Provide a way of canceling and disposing the interval resource
  return function unsubscribe() {
    clearInterval(intervalId);
  };
});
```


就像 `observable.subscribe` 效仿了 `new [Observable]((function subscribe() {...})` 一样，我们从 `subscribe` 返回的 `unsubscribe` 在概念上也相当于 `subscription.unsubscribe`。事实上，如果我们删除围绕这些概念的 ReactiveX 类型，我们就会得到相当简单的 JavaScript。

```javascript 
function subscribe(subscriber) {
  const intervalId = setInterval(() => {
    subscriber.next('hi');
  }, 1000);

  return function unsubscribe() {
    clearInterval(intervalId);
  };
}

const unsubscribe = subscribe({ next: (x) => console.log(x) });

// Later:
unsubscribe(); // dispose the resources
```


我们使用诸如 Observable、Observer 和 Subscription 之类的 Rx 类型的原因是为了获得安全性（例如 Observable Contract）以及与 Operators 的可组合性。
