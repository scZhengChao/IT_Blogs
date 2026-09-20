# 沙箱

## 目录

- [JS 中沙箱的使用场景](#JS-中沙箱的使用场景)
- [对比](#对比)
- [相关实现](#相关实现)

沙箱，即 sandbox，顾名思义，就是让**你的程序跑在一个隔离的环境下，不对外界的其他程序造成影响**，通过创建类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。

在开发过程中，曾了解到这么一个需求，"用户希望可以自己写 js 代码运行"，于是便有了如下的探索。

要执行用户提交的不可信任的第三方代码，便有了安全性问题，因此对沙箱的需求便出现了，要利用沙箱，来防止代码对全局产生影响。

### JS 中沙箱的使用场景

- jsonp：解析服务器所返回的 jsonp 请求时，如果不信任 jsonp 中的数据，可以通过创建沙箱的方式来解析获取数据；（TSW 中处理 jsonp 请求时，创建沙箱来处理和解析数据）；执行第三方 js：当你有必要执行第三方 js 的时候，而这份 js 文件又不一定可信的时候；
- 在线代码编辑器：相信大家都有使用过一些在线代码编辑器，而这些代码的执行，基本都会放置在沙箱中，防止对页面本身造成影响；（例如：[codesandbox.io/s/new](https://link.juejin.cn?target=https://codesandbox.io/s/new "codesandbox.io/s/new")）
- vue 的服务端渲染：vue 的服务端渲染实现中，通过创建沙箱执行前端的 bundle 文件；在调用 createBundleRenderer 方法时候，允许配置 runInNewContext 为 true 或 false 的形式，判断是否传入一个新创建的 sandbox 对象以供 vm 使用；
- vue 模板中表达式计算：vue 模板中表达式的计算被放在沙盒中，只能访问全局变量的一个白名单，如 Math 和 Date 。你不能够在模板表达式中试图访问用户定义的全局变量。

### 对比

为了节省时间，先上个对比总结，各位看官可以根据情况看对应的实现方式。

| 实现方式  | iframe                 | with + Proxy  | SES             |
| ----- | ---------------------- | ------------- | --------------- |
| 兼容性   | IE10+                  | 不支持 IE        | 提案进行中           |
| 实现方式  | 一般                     | 复杂，需要考虑许多边界情况 | 简单，只需要调用简单的 API |
| 同步/异步 | 异步                     | 同步            | 同步              |
| 使用场景  | 大多数需要隔离沙箱或需要执行不安全代码的场景 | 仅使用与需要隔离沙箱的场景 | 大多数是需要沙箱的场景。    |

### 相关实现

- 基于 iframe + Worker 的 jailed: [github.com/asvd/jailed](https://link.juejin.cn?target=https://github.com/asvd/jailed "github.com/asvd/jailed")
- ses: [www.npmjs.com/package/ses](https://link.juejin.cn?target=https://www.npmjs.com/package/ses "www.npmjs.com/package/ses")
- 微前端框架 `qiankun` 的沙箱原理：[juejin.cn/post/692011…](https://juejin.cn/post/6920110573418086413 "juejin.cn/post/692011…")

本次借助要介绍了三种实现沙箱的方法，分别是 `iframe`, `with + Proxy` 和 `SES`。

但上述实现方式，均不太适合执行 `不可信任的第三方代码`, 例如在代码中有无限循环的代码，由于以上方式均与主线程同处一个 `thread`，更会造成页面阻塞，对于该问题，有一个不太完美的[解决方案](https://link.juejin.cn?target=https://zhuanlan.zhihu.com/p/23954773 "解决方案")。

上述提到的 [jailed](https://link.juejin.cn?target=https://github.com/asvd/jailed "jailed") 库，由于是基于 Web Worker 实现，可以避免上述死循环问题导致的页面卡死。

[qiankun的js沙箱原理及其实现](./qiankun的js沙箱原理及其实现/index.md "qiankun的js沙箱原理及其实现")

[基于 iframe 的沙箱环境实现\_副本](<./基于 iframe 的沙箱环境实现_副本/index.md> "基于 iframe 的沙箱环境实现_副本")

[基于 Proxy 的沙箱环境实现\_副本](<./基于 Proxy 的沙箱环境实现_副本/index.md> "基于 Proxy 的沙箱环境实现_副本")

[仍在提案中的 SES\_副本](<./仍在提案中的 SES_副本/index.md> "仍在提案中的 SES_副本")

[Web Workers 实现沙箱](<./Web Workers 实现沙箱/index.md> "Web Workers 实现沙箱")
