# 激活

```javascript 
self.addEventListener('activate', (event) => {
  console.log('activate事件')
  var cacheWhitelist = [CACHE_NAME]
  self.clients.claim() // 保证 激活之后能够马上作用于所有的终端
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})



// 新的service worker线程被激活（其实和离线包一样存在"二次生效"的机理）
self.addEventListener('activate', function (event) {
    console.log('service worker: run into activate');
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
            // 注意这里cacheVersion也可以是一个数组
            if(cacheName !== cacheVersion){
                console.log('service worker: clear cache' + cacheName);
                return caches.delete(cacheName);
            }
        }));
    }));
});
```


**在激活servicework时需要删除之前的缓存，可将需要的缓存放在有个白名单中，然后通过caches.keys()拿到所有缓存，将不再白名单中的缓存删掉。**
