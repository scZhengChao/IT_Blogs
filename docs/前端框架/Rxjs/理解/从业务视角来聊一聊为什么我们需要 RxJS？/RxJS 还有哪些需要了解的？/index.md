# RxJS 还有哪些需要了解的？

## 目录

- [参考文章](#参考文章)

还有很多东西需要了解，但是受限于篇幅我们无法在本次分享中全部囊括到，剩下的内容我列了一个大纲，留待大家自己去探索，当然大家也可以根据我在文末列出的参考文章进行学习，里面收录了大量的我在撰写这篇分享时的参考。

本文没有包括的内容如下：

- Subject：
  - BehaviorSubject
  - ReplaySubject
  - AsyncSubject
- Cold/Hot Observable
- Scheduler 调度器
  - queue
  - asap
  - async
  - animationFrame
- 各种额外的操作符，具体包含如下几类
  - 创建型
  - 转换
  - 过滤
  - 组合
  - 多播
  - 错误处理
  - 工具
  - 条件与布尔
  - 数学与聚合

或许我们有机会在后续的分享中再来聊一聊这些内容，但是 RxJS 的核心理念与业务落地场景我们已经聊得差不多了。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dadce66febe4e27b60db45562907323~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 参考文章

- [zhuanlan.zhihu.com/p/360033854](https://link.juejin.cn?target=https://zhuanlan.zhihu.com/p/360033854 "zhuanlan.zhihu.com/p/360033854")
- [www.zhihu.com/question/40…](https://link.juejin.cn?target=https://www.zhihu.com/question/40035517/answer/84372581 "www.zhihu.com/question/40…")
- [www.zhihu.com/zvideo/1458…](https://link.juejin.cn?target=https://www.zhihu.com/zvideo/1458183228482318336 "www.zhihu.com/zvideo/1458…")
- [blog.csdn.net/lunahaijiao…](https://link.juejin.cn?target=https://blog.csdn.net/lunahaijiao/article/details/112792013 "blog.csdn.net/lunahaijiao…")
- [blog.techbridge.cc/2017/12/08/…](https://link.juejin.cn?target=https://blog.techbridge.cc/2017/12/08/rxjs/ "blog.techbridge.cc/2017/12/08/…")
- [blog.jerry-hong.com/series/rxjs…](https://link.juejin.cn?target=https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-00 "blog.jerry-hong.com/series/rxjs…")
- [blog.techbridge.cc/2016/05/28/…](https://link.juejin.cn?target=https://blog.techbridge.cc/2016/05/28/reactive-programming-intro-by-rxjs/ "blog.techbridge.cc/2016/05/28/…")
- [rxmarbles.com/](https://link.juejin.cn?target=http://rxmarbles.com/ "rxmarbles.com/")
- [github.com/cyclejs/cyc…](https://link.juejin.cn?target=https://github.com/cyclejs/cyclejs "github.com/cyclejs/cyc…")
- [juejin.cn/post/684490…](https://juejin.cn/post/6844903871710494733 "juejin.cn/post/684490…")
- [segmentfault.com/a/119000001…](https://link.juejin.cn?target=https://segmentfault.com/a/1190000019722065 "segmentfault.com/a/119000001…")
- [segmentfault.com/a/119000001…](https://link.juejin.cn?target=https://segmentfault.com/a/1190000019635210 "segmentfault.com/a/119000001…")
- [github.com/xufei/blog/…](https://link.juejin.cn?target=https://github.com/xufei/blog/issues/38 "github.com/xufei/blog/…")
- [www.zhihu.com/question/40…](https://link.juejin.cn?target=https://www.zhihu.com/question/40035517/answer/84372581 "www.zhihu.com/question/40…")
- [github.com/redux-obser…](https://link.juejin.cn?target=https://github.com/redux-observable/redux-observable "github.com/redux-obser…")
- [github.com/RxJS-CN/lea…](https://link.juejin.cn?target=https://github.com/RxJS-CN/learn-rxjs-operators "github.com/RxJS-CN/lea…")
- [www.learnrxjs.io/learn-rxjs/…](https://link.juejin.cn?target=https://www.learnrxjs.io/learn-rxjs/operators/utility/do "www.learnrxjs.io/learn-rxjs/…")
- [www.youtube.com/watch?v=f1K…](https://link.juejin.cn?target=https://www.youtube.com/watch?v=f1KjK8irCbY "www.youtube.com/watch?v=f1K…")
- [blog.jerry-hong.com/series/rxjs…](https://link.juejin.cn?target=https://blog.jerry-hong.com/series/rxjs/thirty-days-RxJS-31/ "blog.jerry-hong.com/series/rxjs…")
- [github.com/cartant](https://link.juejin.cn?target=https://github.com/cartant "github.com/cartant")
- [github.com/ardoq/rxjs-…](https://link.juejin.cn?target=https://github.com/ardoq/rxjs-devtools "github.com/ardoq/rxjs-…")
- [github.com/cartant/rxj…](https://link.juejin.cn?target=https://github.com/cartant/rxjs-spy "github.com/cartant/rxj…")
- [ncjamieson.com/](https://link.juejin.cn?target=https://ncjamieson.com/ "ncjamieson.com/")
- [ncjamieson.com/debugging-r…](https://link.juejin.cn?target=https://ncjamieson.com/debugging-rxjs-part-1-tooling/ "ncjamieson.com/debugging-r…")
- [ncjamieson.com/debugging-r…](https://link.juejin.cn?target=https://ncjamieson.com/debugging-rxjs-part-2-logging/ "ncjamieson.com/debugging-r…")
- [github.com/Jerry-Hong/…](https://link.juejin.cn?target=https://github.com/Jerry-Hong/rx-devtools "github.com/Jerry-Hong/…")
- [observable-hooks.js.org/guide/](https://link.juejin.cn?target=https://observable-hooks.js.org/guide/ "observable-hooks.js.org/guide/")
- [github.com/LeetCode-Op…](https://link.juejin.cn?target=https://github.com/LeetCode-OpenSource/rxjs-hooks "github.com/LeetCode-Op…")
- [github.com/vthinkxie/r…](https://link.juejin.cn?target=https://github.com/vthinkxie/rxjs-acl "github.com/vthinkxie/r…")
- redux-observable：[itnext.io/simplifying…](https://link.juejin.cn?target=https://itnext.io/simplifying-websockets-in-rxjs-a177b887f3b8 "itnext.io/simplifying…")
- [blog.betomorrow.com/replacing-r…](https://link.juejin.cn?target=https://blog.betomorrow.com/replacing-redux-with-observables-and-react-hooks-acdbbaf5ba80?gi=d08195ad71c4 "blog.betomorrow.com/replacing-r…")
- [github.com/BeTomorrow/…](https://link.juejin.cn?target=https://github.com/BeTomorrow/micro-observables "github.com/BeTomorrow/…")
- [github.com/pmndrs](https://link.juejin.cn?target=https://github.com/pmndrs "github.com/pmndrs")
- [zhuanlan.zhihu.com/p/26743163](https://link.juejin.cn?target=https://zhuanlan.zhihu.com/p/26743163 "zhuanlan.zhihu.com/p/26743163")
- [www.noobyard.com/article/p-z…](https://link.juejin.cn?target=http://www.noobyard.com/article/p-znrdioau-r.html "www.noobyard.com/article/p-z…")

作者：ELab
链接：[https://juejin.cn/post/7090422222195523621](https://juejin.cn/post/7090422222195523621 "https://juejin.cn/post/7090422222195523621")
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
