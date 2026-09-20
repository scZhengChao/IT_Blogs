# SharedWorker

## 目录

- [一个利用SharedWorker实现多页面数据共享的例子](#一个利用SharedWorker实现多页面数据共享的例子)
- [sharedWorker调试](#sharedWorker调试)
- [兼容性](#兼容性)

s**haredWorker** 是一种特殊类型的 Worker，可以被**多个浏览上下文访问**，比如多个 `windows`，iframes 和 workers，但这些浏览**上下文必须同源**。它们实现于一个不同于普通 worker 的接口，**具有不同的全局作用域：**[**SharedWorkerGlobalScope**](https://link.juejin.cn/?target=https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope "SharedWorkerGlobalScope")\*\* ，但是继承自\*\*​[**WorkerGlobalScope**](https://link.juejin.cn/?target=https://developer.mozilla.org/en-US/docs/Web/API/SharedWorkerGlobalScope#properties_inherited_from_workerglobalscope "WorkerGlobalScope")

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da793b904d904910bf4f3b37558510ea~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

`SharedWorker` 线程的创建和使用跟 `worker` 类似，**事件和方法也基本一样。**&#x20;

**不同点在于：**

**主线程与 ****`SharedWorker`**** 线程是通过**[**MessagePort**](https://link.juejin.cn/?target=https://developer.mozilla.org/en-US/docs/Web/API/MessagePort "MessagePort")**建立起链接，数据通讯方法都挂载在**\*\*`SharedWorker.port`\*\***上。**

值得注意的是，如果你采用 `addEventListener` 来接收 `message` 事件，那么在主线程初始化`SharedWorker()` 后，还要调用 `SharedWorker.port.start()` 方法来手动开启端口。

```javascript 
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.start(); // 开启端口

myWorker.port.addEventListener('message', msg => {
    console.log(msg.data);
})

```


**但是，如果采用** `onmessage` 方法，则**默认开启端口**，不需要再手动调用`SharedWorker.port.start()`方法

```javascript 
// main.js（主线程）
const myWorker = new SharedWorker('./sharedWorker.js');

myWorker.port.onmessage = msg => {
    console.log(msg.data);
};

```


以上两种方式效果是一样的，具体信息请参考[MessagePort](https://link.juejin.cn/?target=https://developer.mozilla.org/en-US/docs/Web/API/MessagePort "MessagePort")。

由于 `SharedWorker` 是被多个页面共同使用，那么**除了与各个页面之间的数据通讯是独立**的，同一个`SharedWorker` **线程上下文中的其他资源都是共享的。**基于这一点，很容易实现**不同页面之间的数据通讯**。

## 一个利用`SharedWorker`实现多页面数据共享的例子

1. index 页面的 add 按钮，每点击一次，向 sharedWorker 发送一次 add 数据，页面 count 增加1

```html title="index.html"
 <!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>index page</title>
    </head>
    <body>
        <p>index page: </p>
        count: <span id="container">0</span>
        <button id="add">add</button>
        <br>
        // 利用iframe加载
        <iframe src="./iframe.html"></iframe>
    </body>
    <script type="text/javascript">
        if (!!window.SharedWorker) {
            const container = document.getElementById('container');
            const add = document.getElementById('add');
            
            const myWorker = new SharedWorker('./sharedWorker.js');
            
            myWorker.port.start();

            myWorker.port.addEventListener('message', msg => {
                container.innerText = msg.data;
            });

            add.addEventListener('click', () => {
                myWorker.port.postMessage('add');
            });
        }
    </script>
</html>
复制代码
```


1. iframe 页面的 reduce 按钮，每点击一次，向 sharedWorker 发送一次 reduce 数据，页面count 减少

```html title="iframe.html"

<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <title>iframe page</title>
    </head>
    <body>
        <p>iframe page: </p>
        count: <span id="container">0</span>
        <button id="reduce">reduce</button>
    </body>
    <script type="text/javascript">
        if (!!window.SharedWorker) {
            const container = document.getElementById('container');
            const reduce = document.getElementById('reduce');

            const myWorker = new SharedWorker('./sharedWorker.js');

            myWorker.port.start();
            
            myWorker.port.addEventListener('message', msg => {
                container.innerText = msg.data;
            })

            reduce.addEventListener('click', () => {
                myWorker.port.postMessage('reduce');
            });
        }
    </script>
</html>

```


1. sharedWorker 在接收到数据后，根据数据类型处理 num 计数，然后返回给每个已连接的主线程。

```javascript title="sharedWorker.js"

let num = 0;
const workerList = [];

self.addEventListener('connect', e => {
    const port = e.ports[0];
    port.addEventListener('message', e => {
        num += e.data === 'add' ? 1 : -1;
        workerList.forEach(port => { // 遍历所有已连接的part，发送消息
            port.postMessage(num);
        })
    });
    port.start();
    workerList.push(port); // 存储已连接的part
    port.postMessage(num); // 初始化
});

```


结果可以发现，index 页面和 iframe 页面的 count 始终保持一致，实现了多个页面数据同步。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a9b2916025a04d77a850f8196fd14015~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.image?)

## `sharedWorker`调试

在 `sharedWorker` 线程里使用 `console` 打印信息，不会出现在主线程的的控制台中。如果你想调试 `sharedWorker`，需要在 Chrome 浏览器输入 [chrome://inspect/](https://link.juejin.cn/?target= "chrome://inspect/") ，这里能看到所有正在运行的 `sharedWorker`，然后开启一个独立的 dev-tool 面板。

![](./assets/image/image_-qsiVf4MnJ.png)

# 兼容性

sharedWorker 在 Safari 以及移动端的兼容性不是很好，使用时还需注意。

![](./assets/image/image_GNosq_UOz7.png)
