# 拦截网络请求

```javascript 
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) 
        return response;
      }
      return fetch(event.request);
    })
  );
});
```


&#x20;      通过监听`servicework`的 **`fetch`** 事件来**拦截网络请求**，\*\*调用 ****`event`****上的`respondWith() `****方法来劫持当前****`servicework`\*\***控制域下的 ****`HTTP`**** 请求**，该方法会直接返回一个`Promise` 结果 ，**这个结果就会是http请求的响应。**

上面代码中就一个简单的逻辑，先劫持http请求，然后看看缓存中是否有这个请求的资源，如果有则直接返回，如果没有就去请求服务器上的资源。\*\* event.respondWith 方法只能在 Service Worker 的 fetch 事件中使用\*\*。

- Cache Stroage **只能缓存静态资源，所以它只能缓存用户的 GET 请求**；**Cache Stroage 中的缓存不会过期，但是浏览器对它的大小是有限制的**，所以需要我们\*\*定期进行清理。  \*\*
  对应post 请求我们也可以通过 fetch方法拦截到，来进行一些自定义的返回。
