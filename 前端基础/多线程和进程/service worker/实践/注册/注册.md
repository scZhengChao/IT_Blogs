# 注册

`serviceWorker`对象存在于\*\*`navigator`**对象下，可以再主线程中调用`navigator.serviceWorker.register()`方法来注册`servicework,register` 方法接受两个参数,**第一个参数表示servicework.js相对于origin的路径，第二个参数是 Serivce Worker 的配置项**，可选填，其中比较重要的是 `scope` 属性，用来指定你想让 service worker 控制的内容的目录。 默认值为servicework.js所在的目录。这个属性所表示的路径不能在 `service worker` 文件的路径之上，默认是 Serivce Worker 文件所在的目录。 成功注册或**返回一个promise \*\*。

```javascript 
// 页面的入口文件

if (navigator.serviceWorker) {
  window.addEventListener('load', () => {
    console.log('开始注册ServiceWorker')
    navigator.serviceWorker
      .register('./serviceworker.js')
      .then((reg) => {
        console.log('ServiceWorker register success: ', reg)
      })
      .catch((err) => {
        console.log('ServiceWorker register failed: ', err)
      })
  })
}
```
