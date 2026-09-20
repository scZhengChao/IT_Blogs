# 特性

- 独立于主线程、在后台运行的脚本
- 被**install后就永远存在，除非被手动卸载**
- **出于安全考量，Service workers只能由HTTPS承载。** 不过在本地调试时，在`http://localhost` 和`http://127.0.0.1` 下也是可以跑起来的。
- 不能直接操纵dom：因为sw是个**独立于网页运行的脚本**。
- **可拦截请求和返回，缓存文件**。sw可以通过fetch这个api，来拦截网络和处理网络请求，再配合`cacheStorage`来实现`web`页面的缓存管理以及与前端`postMessage`通信。
- 基于web worker（一个独立于JavaScript主线程的独立线程，在里面执行需要消耗大量资源的操作不会堵塞主线程） &#x20;
- 在web worker的基础\*\*上增加了离线缓存的能力 \*\*&#x20;
- 本质上充当Web应用程序（服务器）与浏览器之间的代理服务器（可以拦截全站的请求，并作出相应的动作->由开发者指定的动作） &#x20;
- 创建**有效的离线体验（将一些不常更新的内容缓存在浏览器，提高访问体验**） &#x20;
- \*\*由事件驱动的,具有生命周期  \*\*
- \*\*可以访问cache和indexDB  \*\*
- \*\*支持推送  \*\*
- 并且可以让开发者自己控制管理缓存的内容以及版本
- 其生命周期与页面无关（**关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动**）
- **它设计为完全异步，同步API（如XHR和localStorage）不能在service worker中使用**

[工作流程](./工作流程/index.md "工作流程")

[生命周期](./生命周期/index.md "生命周期")

[更新Service Worker](<./更新Service Worker/index.md> "更新Service Worker")

[serviceworker 和 http缓存](<./serviceworker 和 http缓存/index.md> "serviceworker 和 http缓存")
