# 操作符

## 目录

- [什么是操作符？](#什么是操作符)
  - [可联入管道的操作符](#可联入管道的操作符)
  - [创建操作符](#创建操作符)
- [管道](#管道)
- [高阶 Observables](#高阶-Observables)

尽管 `Observable` 是基础，但 `RxJS` 的**操作符是最有用的**。操作符是能让你以声明方式轻松组合复杂异步代码的基本构造块。

## 什么是操作符？

**操作符是函数。有两种操作符：**

##### **可联入管道的操作符**

可**联入管道的操作符**是可以使用语法 `observableInstance.pipe(operator())` 联入 Observables 管道的类型。其中包括 [filter(...)](https://rxjs.tech/api/operators/filter "filter(...)") 和 [mergeMap(...)](https://rxjs.tech/api/operators/mergeMap "mergeMap(...)")。调用时，它们不会**更改现有的 Observable 实例**。相反，它们**返回一个新的 Observable**，其**订阅逻辑是基于第一个 Observable 的。**

> **可联入管道的操作符**是一个**以 ****`Observable`**** 作为输入并返回另一个 Observable 的函数**。**这是一个纯操作：之前的 Observable 保持不变**。

可联入管道的操作符**本质上是一个纯函数**，它将**一个 Observable 作为输入并生成另一个 Observable 作为输出**。**订阅此输出 Observable 也会同时订阅其输入 Observable。**

##### **创建操作符**

**创建操作符**是另一种操作符，可以**作为独立函数调用以创建新的 Observable**。例如： `of(1, 2, 3)` 创建一个 observable，它将一个接一个地发出 1、2 和 3。创建操作符将在后面的部分中更详细地讨论。

**什么是创建操作符？**与可联入管道的操作符不同，创建操作**符一种函数**，可用于根据一些**常见预定义行为或联合其它 ****`Observable`**** 来创建一个** Observable。

创建操作符的典型示例是 `interval` 函数。它将一个数字（而不是 Observable）作为输入参数，并产生一个 Observable 作为输出：

# 管道

**可联入管道的操作符都是函数**，因此它们可以**像普通函数一样使用：** `op()(obs)` — 但实际上，它们中的大多数往往会纠缠在一起，很快就会变得不可读： `op4()(op3()(op2()(op1()(obs))))`。出于这个原因，Observables 有一个名为 `.pipe()` 的方法，它完成了同样的事情，同时更容易阅读：

```javascript 
obs.pipe(op1(), op2(), op3(), op4());
```


**作为一种风格，即使只有一个操作符，也从不使用 ****`op()(obs)`****；****`obs.pipe(op())`**** 是普遍的首选项。**

# 高阶 Observables

`Observables` 最常发出的是普通值，如字符串和数字，但令人惊讶的是，它还经常需要处理 `Observables` *的* Observables，即所谓的高阶 `Observables`。例如，假设你有一个 `Observable` 发出字符串，这些字符串是你想要查看的文件的 URL。其代码可能如下所示：

```javascript 
const fileObservable = urlObservable.pipe(map((url) => http.get(url)));
```


`http.get()` 会为每**个单独的 URL 返回一个 Observable**（可能是字符串或字符串数组）。现在你有了一个\*\* Observable *****的***** Observable，即一个高阶 Observable。\*\*

但是你如何使用高阶 `Observable` 呢？通常，通过**展平处理**：（以某种方式）将高阶 Observable 转换为普通 Observable。例如：

```javascript 
const fileObservable = urlObservable.pipe(
  map((url) => http.get(url)),
  concatAll()
);
```


[concatAll()](https://rxjs.tech/api/operators/concatAll "concatAll()") 操作符**订阅**从“外部” Observable **出来的每个“内部” Observable**，并**复制所有发出的值**，**直到该 ****`Observable`**** 完成，**然后**继续处理下一个**。**所有值都以这种方式连接**。其他有用的展平操作符（称为[*联结操作符*](https://rxjs.tech/guide/operators#join-operators "联结操作符")）有

- [concatAll()](https://rxjs.tech/api/operators/concatAll "concatAll()") 操作符**订阅**从“外部” Observable **出来的每个“内部” Observable**，并**复制所有发出的值**，**直到该 ****`Observable`**** 完成，**然后**继续处理下一个**。**所有值都以这种方式连接**
- [mergeAll()](https://rxjs.tech/api/operators/mergeAll "mergeAll()") — 在每个内部 `Observable` 抵达时订阅它，然后在每个值抵达时发出这个值
- [switchAll()](https://rxjs.tech/api/operators/switchAll "switchAll()") — 在第一个内部 `Observable` 抵达时订阅它，并在每个值抵达时发出这个值，但是当下一个内部 Observable 抵达时，退订前一个，并订阅新的。
- [exhaustAll()](https://rxjs.tech/api/operators/exhaustAll "exhaustAll()") — 在第一个内部 `Observable` 抵达时订阅它，并在每个值抵达时发出这个值，丢弃所有新抵达的内部 Observable 直到第一个完成，然后等待下一个内部 Observable。

正如许多数组库会将 [map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map "map()") 和 [flat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat "flat()") （或 `flatten()`） 组合成一个 [flatMap()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap "flatMap()") 一样，所有 RxJS 展平操作符 [concatMap()](https://rxjs.tech/api/operators/concatMap "concatMap()")、[mergeMap()](https://rxjs.tech/api/operators/mergeMap "mergeMap()")、[switchMap()](https://rxjs.tech/api/operators/switchMap "switchMap()") 和 [exhaustMap()](https://rxjs.tech/api/operators/exhaustMap "exhaustMap()") 都有其映射等价物 [exhaustMap()](https://rxjs.tech/api/operators/exhaustMap "exhaustMap()")。

[展平操作符](./展平操作符/index.md "展平操作符")
