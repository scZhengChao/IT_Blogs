# event loop

## 目录

- [event loop](#event-loop)
  - [事件循环流程图](#事件循环流程图)

# event loop

[浏览器渲染流程](IT/前端平台/浏览器/浏览器渲染流程/浏览器渲染流程/浏览器渲染流程.md "浏览器渲染流程") 可以结合**渲染那一块一起看下**

#### 事件循环流程图

![](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73z9nsZj5INI8dx15O06eZQoFFzibXM5W27sUyuIKJmLklFiaEzOaJeTLTuGtSTsmOLZoible8R4v9qhZQ/640?wx_fmt=png\&wxfrom=5\&wx_lazy=1\&wx_co=1)

然后再理解一个概念：

- `JS`分为同步任务和异步任务
- 同步任务都在主线程上执行，形成一个`执行栈`
- 主线程之外，**事件触发线程**管理着一个`任务队列`，只要异步任务有了运行结果，就在`任务队列`之中放置一个事件。
- 一旦`执行栈`中的所有同步任务执行完毕（此时JS引擎空闲），系统就会读取`任务队列`，将**可运行的异步任务添加到可执行栈中，开始执行。**

![](./assets/image/image_drJ_qVyfDM.png)

看到这里，应该就可以理解了：为什么有时候setTimeout推入的事件不能准时执行？因为可能在它推入到事件列表时，主线程还不空闲，正在执行其它代码， 所以自然有误差。

**宏任务（macrotask）**

- setTimeout
- setInterval
- setImmediate (Node 独有)
- requestAnimationFrame (浏览器独有)
- I/O
- UI rendering (浏览器独有)

**微任务（microtask）**

- process.nextTick (Node 独有)
- Promise
- Object.observe
- MutationObserver

或者，进一步，JS中分为两种任务类型：**`macrotask`****和****`microtask`**，在ECMAScript中，microtask称为`jobs`，macrotask可称为`task`

它们的定义？区别？简单点可以按如下理解：

- macrotask（又称之为宏任务），可以理解是**每次执行栈执行的代码就是一个宏任务**（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
- **每一个task会从头到尾将这个任务执行完毕，不会执行其它**
- 浏览器为了能够使得JS内部task与DOM任务能够有序的执行，会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染

```typescript 
（`task->jobs-->渲染->task->...`）
```


- microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务
- 也就是说，在当前task任务后，下一个task之前，在渲染之前
- 所以它的响应速度相比setTimeout（setTimeout是task）会更快，**因为无需等渲染**
- **也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）**

![](./assets/image/image_7uCdNE63A6.png)
