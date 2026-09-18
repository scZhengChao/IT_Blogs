# Rxjs

从 2023 年 NestJS 的学习与实践中发现，RxJS 在 NestJS [gRPC](https://link.juejin.cn?target=https://grpc.io/ "gRPC") 微服务中扮演重要角色，[gRPC](https://link.juejin.cn?target=https://grpc.io/ "gRPC") 的 [proto](https://link.juejin.cn?target=https://grpc.io/docs/languages/node/quickstart/ "proto") 文件生成 TS 类型文件式，使用可观察对象，而不是 Promise。

面对 NestJS 和 Angular 系列，如果对 RxJS 不熟悉，就像多年前都端开发者不熟悉 webpack 一样。

多年以后回顾 webpack, 学习 RxJS 的场景就跟以前简直一模一样。

为了更好的学习并全面的掌握 RxJS, 本文以 RxJS 基础为核心用有文字图片、配合视频方式讲解，希望能够帮助到大家。

> **RxJS 是一个函数式的响应式可观察对象编程库。**

- 💌[RxJS](https://link.juejin.cn/?target=https://rxjs.dev/ "RxJS") 官方网站
- [https://rxjs.tech/](https://rxjs.tech/ "https://rxjs.tech/")   中文文档
- 💞[RxJS Github](https://link.juejin.cn/?target=https://github.com/ReactiveX/rxjs "RxJS Github") 代码托管仓库
- 🎁[RxJS npm](https://link.juejin.cn/?target=https://www.npmjs.com/package/rxjs "RxJS npm") 包管理工具

[ RxJS 夯实基础 | 想要的这里都有 - 掘金 一、简介 从 2023 年 NestJS 的学习与实践中发现，RxJS 在 NestJS gRPC 微服务中扮演重要角色，gRPC 的 proto 文件生成 TS 类型文件式，使用可观察对象，而不是  https://juejin.cn/post/7331676854913351730?searchId=20240607095834DBADB1C83C523078ECB2](https://juejin.cn/post/7331676854913351730?searchId=20240607095834DBADB1C83C523078ECB2 " RxJS 夯实基础 | 想要的这里都有 - 掘金 一、简介 从 2023 年 NestJS 的学习与实践中发现，RxJS 在 NestJS gRPC 微服务中扮演重要角色，gRPC 的 proto 文件生成 TS 类型文件式，使用可观察对象，而不是  https://juejin.cn/post/7331676854913351730?searchId=20240607095834DBADB1C83C523078ECB2")

> 文档

[   https://rxjs.tech/guide/operators](https://rxjs.tech/guide/operators "   https://rxjs.tech/guide/operators")

[   https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/debouncetime.html](https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/debouncetime.html "   https://rxjs-cn.github.io/learn-rxjs-operators/operators/filtering/debouncetime.html")

RxJS 是一个**使用可观察序列编写异步和基于事件的程序的库**。它提供了一种核心类型，即 [Observable](https://rxjs.tech/guide/observable "Observable")、一些周边类型（Observer、Scheduler、Subjects）和类似于 `Array` 方法（`[map]`、`[filter]`、`[reduce]`、`[every]` 等）的操作符，以便将**异步事件作为集合进行处理。**

可以将 `RxJS` 视为处理事件的 `Lodash`。

ReactiveX 将[观察者模式](https://en.wikipedia.org/wiki/Observer_pattern "观察者模式")与[迭代器模式](https://en.wikipedia.org/wiki/Iterator_pattern "迭代器模式")和[使用集合的函数式编程](http://martinfowler.com/articles/collection-pipeline/#NestedOperatorExpressions "使用集合的函数式编程")相结合，以便让你更好地管理事件序列。

RxJS 中解决异步事件管理的基本概念有：

- **Observable（可观察者）：** 表示未来（future）值或事件的可调用集合的概念。
- **Observer（观察者）：** 是一个回调集合，它知道如何监听 Observable 传来的值。
- **Subscription（订阅）：** 表示 Observable 的一次执行，主要用于取消执行。
- **Operator（操作符）：** 是纯函数，可以使用`[map]`、`[filter]`、`[concat]`、`[reduce]` 等操作来以函数式编程风格处理集合。
- **Subject（主体）：** 相当于一个 EventEmitter，也是将一个值或事件多播到多个 Observers 的唯一方式。
- **Scheduler（调度器）：** 是控制并发的集中化调度器，允许我们在计算发生时进行协调，例如`setTimeout` 或 `requestAnimationFrame` 或其它。

[使用案例](IT/前端框架/Rxjs/使用案例/使用案例.md "使用案例")

[使用案例](IT/前端框架/Rxjs/使用案例_1/使用案例.md "使用案例")

[操作符](操作符.md "操作符")

[弹珠图](弹珠图.md "弹珠图")

[Rxjs高级](Rxjs高级.md "Rxjs高级")

[概览](概览.md "概览")

[理解](IT/前端框架/Rxjs/理解/理解.md "理解")
