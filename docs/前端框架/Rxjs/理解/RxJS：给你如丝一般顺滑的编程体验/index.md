# RxJS：给你如丝一般顺滑的编程体验

## 目录

- [概念](#概念)

[ RxJS：给你如丝一般顺滑的编程体验（建议收藏）-腾讯云开发者社区-腾讯云 怀着对于RxJS这项技术的好奇，笔者花了数天时间研究了这项技术，并肝了一包枸杞才完成这篇文章的撰写，属实不易。不过也正是通过这段时间的学习，我发现这项技术在一定程度上可以解决我在日常业务中遇到的一些痛点，以及有种想马上应用到自己的新项目中的欲望，的确这种以数据流的理念来管控大型项目中的数据能给人带来一种十分优雅的编程体... https://cloud.tencent.com/developer/article/1780453](https://cloud.tencent.com/developer/article/1780453 " RxJS：给你如丝一般顺滑的编程体验（建议收藏）-腾讯云开发者社区-腾讯云 怀着对于RxJS这项技术的好奇，笔者花了数天时间研究了这项技术，并肝了一包枸杞才完成这篇文章的撰写，属实不易。不过也正是通过这段时间的学习，我发现这项技术在一定程度上可以解决我在日常业务中遇到的一些痛点，以及有种想马上应用到自己的新项目中的欲望，的确这种以数据流的理念来管控大型项目中的数据能给人带来一种十分优雅的编程体... https://cloud.tencent.com/developer/article/1780453")

**前言**

怀着对于`RxJS`这项技术的好奇，笔者花了数天时间研究了这项技术，并肝了一包枸杞才完成这篇文章的撰写，属实不易。不过也正是通过这段时间的学习，我发现这项技术在一定程度上可以解决我在日常业务中遇到的一些痛点，以及有种想马上应用到自己的新项目中的欲望，的确这种以数据流的理念来管控大型项目中的数据能给人带来一种十分优雅的编程体验。

### **概念**

`RxJS` 是 `Reactive Extensions for JavaScript` 的缩写，起源于 `Reactive Extensions`，是一个基于可观测数据流 `Stream` 结合观察者模式和迭代器模式的一种异步编程的应用库。`RxJS` 是 `Reactive` `Extensions` 在 `JavaScript` 上的实现。

> 注意！它跟`React`没啥关系，笔者最初眼花把它看成了`React.js`的缩写（耻辱啊！！！）

对于陌生的技术而言，我们一般的思路莫过于，打开百度（google），搜索，然后查看官方文档，或者从零散的博客当中，去找寻能够理解这项技术的信息。但在很多时候，仅从一些只言片语中，的确也很难真正了解到一门技术的来龙去脉。

本文将从学习的角度来解析这项技术具备的价值以及能给我们现有项目中带来的好处。

[背景](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/背景/背景.md "背景")

[前置知识点](./前置知识点/index.md "前置知识点")

[Observable](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/Observable/Observable.md "Observable")

[Observer](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/Observer/Observer.md "Observer")

[Subscription与Subject](./Subscription与Subject/index.md "Subscription与Subject")

[Cold-Observables与Hot-Observables](./Cold-Observables与Hot-Observabl/Cold-Observables与Hot-Observables.md "Cold-Observables与Hot-Observables")

[Schedulers(调度器)](./Schedulers(调度器)/index.md "Schedulers(调度器)")

[总结](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/总结/总结.md "总结")
