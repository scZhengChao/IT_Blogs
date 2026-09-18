# service worker 与主线程之间的通信

- 主线程

```javascript 
  // 传递
  navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage("this message is from page");

  // 接收
  navigator.serviceWorker.addEventListener('message', function (e) {
    console.log('service worker传递的信息',e.data); 
  });
```


- service worker

```javascript 
self.addEventListener('message', (event)=>{
  console.log('页面传递过来的数据',event.data)  // 收到主线程传递的信息
  event.source.postMessage('this message is from sw.js to page');  // 向主线程传递信息
})

```
