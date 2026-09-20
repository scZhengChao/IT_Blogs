# 工作流程

![](./image/image_XxA0U3XgRv.png)

- Service Worker 文件只在**首次注册的时候执行了一次。**
- **安装、激活流程也**只是在首次执行 Service Worker 文件的时候进行了一次。
- 首次注册成功的 Service Worke**r 不能拦截当前页面的请求。**
- 非首次注册的 Service Worker 可以**控制当前的页面并能拦截请求**
- Service Worker **首次注册或者有新版本触发更新的时候**，**才会重新创建一个 worker 工作线程并解析执行 Service Worker 文件**，在这之后并进入 Service Worker 的安装和激活生命周期
