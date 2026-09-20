# 卸载

```javascript 
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      //安装在网页的service worker不止一个，找到我们的那个并删除
      console.log(registration)
      if (registration && registration.scope === 'http://localhost:8080/') {
        registration.unregister()
      }
    }
  })
```
