# Subject (主体)

它是一个代理对象，**既是一个 ****`Observable`**** 又是一个 ****`Observer`****，它可以同时接受 ****`Observable`**** 发射出的数据，也可以向订阅了它的 ****`observer`**** 发射数据，同时，****`Subject`**** 会对内部的 ****`observers`**** 清单进行多播(****`multicast`****)**

![](https://ask.qcloudimg.com/http-save/yehe-1036137/s0p298fgw5.jpeg)

Subject

> **`Subjects`**\*\* 是将任意 ****`Observable`**** 执行共享给多个观察者的唯一方式\*\*

这个时候眼尖的读者会发现，这里产生了一个新概念——多播。

- 那么多播又是什么呢？
- 有了多播是不是还有单播？
- 他们的区别又是什么呢？

接下来就让笔者给大家好好分析这两个概念吧。

![](image_eADUevTfVz.png)

[单播](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/Subscription与Subject/Subject%20(主体)/单播/单播.md "单播")

[多播](IT/前端框架/Rxjs/理解/RxJS：给你如丝一般顺滑的编程体验/Subscription与Subject/Subject%20(主体)/多播/多播.md "多播")

[BehaviorSubject](BehaviorSubject.md "BehaviorSubject")

[ReplaySubject](ReplaySubject.md "ReplaySubject")

[AsyncSubject](AsyncSubject.md "AsyncSubject")
