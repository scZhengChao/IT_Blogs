# 生命周期

大概可以用如下图片来解释：

![](./image/image_e-rBJ9h0g8.png)

当一个servicework被注册成功后，它将开始它的生命周期，**我们对servicework的操作一般都是在其生命周期里面进行的**。servicework的生命周期分为这么几个状态 **安装中, 安装后, 激活中, 激活后, 废弃。**

- **安装( installing )**：这个状态发生在 Service Worker 注册之后，表示开始安装，这个状态会触发 install 事件，一般会在**install事件的回调里面进行静态资源的离线缓存，** 如果这些静态资源缓存失败了，那 Service Worker 安装就会失败，生命周期终止。
- **安装后( installed )**：当成功捕获缓存到的资源时，servicework会变为这个状态，**当此时没有其他的servicework线程在工作时，会立即进入激活状态，如果此时有正在工作的servicework工作线程，则会等待其他的 Service Worker 线程被关闭后才会被激活**。可以使用 self.skipWaiting() 方法强制正在等待的servicework工作线程进入激活状态。
- **激活( activating )**：在这个状态下会触发activate事件，在activate **事件的回调中去清理旧版缓存。**
- **激活后( activated )**：在这个状态下 **，servicework会取得对整个页面的控制**
- **废弃状态 ( redundant )**：这个状态表示一个 Service Worker 的生命周期结束。**新版本的 Service Worker 替换了旧版本的 Service Worker会出现这个状态**
