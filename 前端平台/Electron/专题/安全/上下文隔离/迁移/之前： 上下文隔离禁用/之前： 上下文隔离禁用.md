# 之前： 上下文隔离禁用

在渲染进程中，**预加载脚本暴露给已加载的页面 API** 是一个常见的使用方式。 当上下文隔离时，您的预加载脚本可能会暴露一个常见的全局`window`对象给渲染进程。 此后，您可以从中添加任意的属性到预加载在脚本。

```javascript 
// preload.js
// 上下文隔离禁用的情况下使用预加载
window.myAPI = {
  doAThing: () => {}
}


```


`doAThing()` 函数可以在渲染进程中直接使用。

```javascript 
// renderer.js
// 在渲染器进程使用导出的 API
window.myAPI.doAThing()

```
