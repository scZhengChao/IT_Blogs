# 借助专业的调试库和可视化工具

如果对 RxJS 熟悉的小伙伴应该能发现，我们要面对的实际上不是一次性的程序执行，而是面对一个个的 Stream，按照时间的维度，会不断的产生事件，保不准那次会出现错误，如果我们光通过 `tap` 来进行一股脑的打印，那么我们的 Console 将满屏的输出，很难抓住调试的重点，当然还有种种具体场景具体分析的问题。

所以 RxJS 的核心成员 cartant 基于上述痛点开发了一个专为 RxJS 而生的调试库：[rxjs-spy](https://link.juejin.cn?target=https://github.com/cartant/rxjs-spy "rxjs-spy")，它主要有如下几个特点：

1. 如无手动触发，不会打印 log
2. 可以录制整个 Stream 的过程，打印一个集合的结果，便于调试
3. 每个结果有对应的执行时间，方便精准定位
4. 可以暂停、修改、回滚 Stream
5. 等等

我们拿之前的 AutoComplete 的搜索例子看了解一下 rxjs-spy 如何运作：

首先导出并声明执行：

```javascript 
import { create } from "rxjs-spy";

export const spy = create();

```


然后在想要调试的 Stream 上打 tag：

```javascript 
import { tag } from "rxjs-spy/operators/tag";

const inputSearch = document.querySelector(".search");
    fromEvent(inputSearch, "input")
      .pipe(
        map((e) => e.target.value),
        tag("map"),
        filter((val) => val),
        debounceTime(250),
        tag("debounceTime"),
        distinctUntilChanged(),
        tag("distinctUntilChanged"),
        switchMap((val) => searchWikiPedia(val))
      )
      .subscribe((data) => {
        setItems(data[1] || []);
      });

```


上述我们在三个部分打了 `tag`，然后给了对应的标识符，接着我们运行程序，打开控制台就可以查看对应的 `Stream` 执行的过程：

![](./assets/image/image_uIbyLBhUta.png)

可以看到我们可以对某个 tag 过的 Stream 进行过程展示，甚至还能展示调用栈，极大提高调试体验，当然 rxjs-spy 还有更多高级、有用的特性，具体可以参见作者的教程：

1. [ncjamieson.com/debugging-r…](https://link.juejin.cn?target=https://ncjamieson.com/debugging-rxjs-part-1-tooling/ "ncjamieson.com/debugging-r…")
2. [ncjamieson.com/debugging-r…](https://link.juejin.cn?target=https://ncjamieson.com/debugging-rxjs-part-2-logging/ "ncjamieson.com/debugging-r…")

提供了这种底层操作、打印 Stream 的 API，自然就会有人基于它实现可视化工具，就像 Redux Devtools 一样，同样有人做了 [rxjs-devtools](https://link.juejin.cn?target=https://github.com/ardoq/rxjs-devtools "rxjs-devtools")，通过如下配置：

```javascript 
import DevToolsPlugin from "rxjs-spy-devtools-plugin";
import { create } from "rxjs-spy";

export const spy = create();
const devtoolsPlugin = new DevToolsPlugin(spy, {
  verbose: false,
});

spy.plug(devtoolsPlugin);

```


然后下载对应的 [Chrome 扩展](https://link.juejin.cn/?target=https://chrome.google.com/webstore/detail/rxjs-devtools/abgkgpfkdkafjidfgcjddeffnfnkoeil?hl=en "Chrome 扩展")，就可以收获如下的效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f13c2f6b6b434c82b8969d8db6dde300~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

我们可以直接可视化的观看所有的 tag，并且进行过滤、搜索，还能查看具体的时间戳。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7770890cac904a5c9190bccf8d319b2d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)
