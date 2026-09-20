# 安装

```javascript 
self.addEventListener('install', (event) => {
  console.log('install事件')
  self.skipWaiting() //用来强制更新的servicework跳过等待时间
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache)
    })
  )
})



var cacheVersion = 'test_2017122608';
// 安装服务工作线程
self.addEventListener('install', function(event){
    // 需要缓存的资源
    var cacheFiles = [
        '/dist/index.html',
        '/dist/js/index_async_bundle.js'
    ];
    console.log('service worker: run into install');
    event.waitUntil(caches.open(cacheVersion).then(function(cache)
    {
        return cache.addAll(cacheFiles);
    }));
});
```


1. 首先 `self.skipWaiting()` 执行，**告知浏览器直接跳过等待阶段**，**淘汰过期**的`Service Worker`脚本，**直接开始尝试激活新的**`Service Worker`。
2. 然后使用 `caches.open` **打开一个Cache，打开后**，通过`cache.addAll`尝试缓存我们预先声明的文件。 **CacheStorage 全局的cache Api 并非只有在sw中才能用 浏览器控制台直接用也是可以的，所以是挂在window下的**

&#x20;

1. `event.waitUntil()`\*\* 只能在 Service Worker 的 install 或者 activate 事件中使用\*\*；看起来像是一个 callback，用来延长事件的作用时间,但是，即便你不使用它，程序也可能正常运行。如果**你传递了一个 Promise 给它，那么只有当该 Promise resolved 时，Service Worker 才会完成 install；如果 Promise rejected 掉，那么整个 Service Worker 便会被废弃掉**。因此，cache.addAll 里面，只要有一个资源获取失败，整个 Service Worker 便会失效。

- 在 install 事件回调被调用时，它把**即将被激活的 worker 线程状态延迟为 installing 状态，直到传递的 Promise 被成功地 resolve**。这主要用于确保：Service Worker 工作线程在所有依赖的核心 cache 被缓存之前都不会被激活。
- 在 activate 事件回调被调用时，它把即将被激活的 worker 线程状态延迟为 activating 状态，直到传递的 Promise 被成功地 resolve。这主要用于确保：**任何功能事件不会被分派到 ServiceWorkerGlobalScope 对象，直到它删除过期的缓存条目。**
- 当 waitUntil()运行时，如果 Promise 是 rejected 那么**installing 或者 activating 的状态会被设置为 redundant。**
