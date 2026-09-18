# 为什么选 RxJS？

说到这里，可能有一些小伙伴有疑问了，为什么一定是 `RxJS`？

其实选择 `RxJS` 来实现前端防腐层还有一层理解，即虽然在前端的发展历史中，为了保证接口的架构稳定，我们发展了一代又一代方法：从 `GraphQL`，到 `BFF`，再到 `RxJS`

![](image_-KIhlJQB9Y.png)

> 图片来自 2021 DevFest 杭州：如何使用 RxJS 构建稳健的前端应用[www.zhihu.com/zvideo/1458…](https://link.juejin.cn?target=https://www.zhihu.com/zvideo/1458183228482318336%EF%BC%8C%E4%BE%B5%E6%9D%83%E5%88%A0%E3%80%82 "www.zhihu.com/zvideo/1458…")

那么为什么我们需要选择 RxJS 作为前端接口防腐层呢？其实取决于对上游的控制权：

- GraphQL 需要服务端配合改造
- BFF 同样需要部署服务器资源
- 而 RxJS 可以直接跑在浏览器上，受前端直接控制，并且可以完成前两者同样的事情
