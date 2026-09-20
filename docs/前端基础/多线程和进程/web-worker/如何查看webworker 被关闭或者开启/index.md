# 如何查看webworker 被关闭或者开启

[ 如何确定Web Worker已经创建或关闭\_开发者工具如何查看webworker-CSDN博客 文章浏览阅读3.4k次，点赞2次，收藏3次。Web Worker 可以为 JavaScript 创建多线程环境，可以将一部分任务分配给分线程处理，从而不阻塞主线程的运行。通过 Web Worker 创建的分线程和主线程是同时运行互不干扰的。具体的Web Worker的相关知识，大家可以参考阮一峰大神的博客。Web Worker 在使用过程中需要注意的是分线程创建之后，为了随时响应主线程的通信会始终 https://blog.csdn.net/sayUonly/article/details/118540307](https://blog.csdn.net/sayUonly/article/details/118540307 " 如何确定Web Worker已经创建或关闭_开发者工具如何查看webworker-CSDN博客 文章浏览阅读3.4k次，点赞2次，收藏3次。Web Worker 可以为 JavaScript 创建多线程环境，可以将一部分任务分配给分线程处理，从而不阻塞主线程的运行。通过 Web Worker 创建的分线程和主线程是同时运行互不干扰的。具体的Web Worker的相关知识，大家可以参考阮一峰大神的博客。Web Worker 在使用过程中需要注意的是分线程创建之后，为了随时响应主线程的通信会始终 https://blog.csdn.net/sayUonly/article/details/118540307")

此时，在 Chrome 的开发者工具的 Sources 标签下的 Page 树是这个样子的：

![](./image/image_zGsiu2BbR5.png)

这个红框就是我们创建的 Worker。

多次调用后我们发现

![](./image/image_rwI5diUNMY.png)

新的 Worker 在不断创建，旧的 Worker 也不会自动关闭。这样会造成资源的浪费。那么，就需要我们手动关闭 Worker。

我们先给 Worker 增加一个`close()`。

![](https://i-blog.csdnimg.cn/blog_migrate/f71fff94b7e9463e325606671da5e755.png)

当然，你也可以在主线程的回调里关闭 Worker，效果是一样的。时机不同，按需取用。

从 Sources 标签下的 Page 树中可以看到，这些 Worker 在数据返回后被彻底关闭了。
