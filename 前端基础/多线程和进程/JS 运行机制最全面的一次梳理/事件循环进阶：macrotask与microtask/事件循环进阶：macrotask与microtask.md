# 事件循环进阶：macrotask与microtask

这段参考了参考来源中的第2篇文章（英文版的），（加了下自己的理解重新描述了下）， 强烈推荐有英文基础的同学直接观看原文，作者描述的很清晰，示例也很不错，如下：

[https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/\[2\]](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/\[2] "https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/\[2]")

上文中将JS事件循环机制梳理了一遍，在ES5的情况是够用了，但是在ES6盛行的现在，仍然会遇到一些问题，譬如下面这题：

```javascript 
console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});

console.log('script end');

```


嗯哼，它的正确执行顺序是这样子的：

```javascript 
script start
script end
promise1
promise2
setTimeout

```


为什么呢？因为Promise里有了一个一个新的概念：`microtask`

或者，进一步，JS中分为两种任务类型：**`macrotask`****和****`microtask`**，在ECMAScript中，microtask称为`jobs`，macrotask可称为`task`

它们的定义？区别？简单点可以按如下理解：

- macrotask（又称之为宏任务），可以理解是**每次执行栈执行的代码就是一个宏任务**（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
- 每一个task会从头到尾将**这个任务执行完毕，不会执行其它**
- 浏览器为了能够使得JS内部task与DOM任务能够有序的执行，**会在一个task执行结束后，在下一个 task 执行开始前，对页面进行重新渲染**

```javascript 
（`task->渲染->task->...`）

```


- microtask（又称为微任务），可以理解是在当前 task 执行结束后立即执行的任务
- 也就是说，在当前task任务后，下一个task之前，在渲染之前
- 所以它的响应速度相比setTimeout（setTimeout是task）会更快，**因为无需等渲染**
- 也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）

分别很么样的场景会形成macrotask和microtask呢？

- macrotask：主代码块，setTimeout，setInterval等（可以看到，事件队列中的每一个事件都是一个macrotask）
- microtask：Promise，process.nextTick等

**补充：在node环境下，** ​**process.nextTick的优先级高于Promise**，也就是可以简单理解为：在宏任务结束后会先执行微任务队列中的nextTickQueue部分，然后才会执行微任务中的Promise部分。

再根据线程来理解下：

- macrotask中的事件都是放在一个事件队列中的，而这个队列由事件触发线程维护
- microtask中的所有微任务都是添加到微任务队列（Job Queues）中，等待当前macrotask执行完毕后执行，而这个队列由JS引擎线程维护

这点由自己理解+推测得出，因为它是在主线程下无缝执行的）

所以，总结下运行机制：

- 执行一个宏任务（栈中没有就从事件队列中获取）
- 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
- 宏任务执行完毕后，**立即执行当前微任务队列中的所有微任务（依次执行）**
- 当前宏任务执行完毕，**开始检查渲染，然后GUI线程接管渲染**
- 渲染完毕后，**JS线程继续接管，开始下一个宏任务（从事件队列中获取）**

如图：

![](image_t1HPTHdaZo.png)

另外，请注意下`Promise`的`polyfill`与官方版本的区别：

- 官方版本中，是标准的microtask形式
- polyfill，一般都是通过setTimeout模拟的，所以是macrotask形式
- 请特别注意这两点区别

注意，有一些浏览器执行结果不一样（因为它们可能把microtask当成macrotask来执行了）， 但是为了简单，这里不描述一些不标准的浏览器下的场景（但记住，有些浏览器可能并不标准）

20180126补充：使用MutationObserver实现microtask

MutationObserver可以用来实现microtask （它属于microtask，优先级小于Promise， 一般是Promise不支持时才会这样做）

它是HTML5中的新特性，作用是：监听一个DOM变动， 当DOM对象树发生任何变动时，Mutation Observer会得到通知

像以前的Vue源码中就是利用它来模拟nextTick的， 具体原理是，创建一个TextNode并监听内容变化， 然后要nextTick的时候去改一下这个节点的文本内容， 如下：（Vue的源码，未修改）

```javascript 
var counter = 1
var observer = new MutationObserver(nextTickHandler)
var textNode = document.createTextNode(String(counter))

observer.observe(textNode, {
    characterData: true
})
timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
}

```


对应Vue源码链接\[3]

不过，现在的Vue（2.5+）的nextTick实现移除了MutationObserver的方式（据说是兼容性原因）， 取而代之的是使用MessageChannel （当然，默认情况仍然是Promise，不支持才兼容的）。

MessageChannel属于宏任务，优先级是：`MessageChannel->setTimeout`， 所以Vue（2.5+）内部的nextTick与2.4及之前的实现是不一样的，需要注意下。

这里不展开，可以看下 [https://juejin.im/post/5a1af88f5188254a701ec230](https://juejin.im/post/5a1af88f5188254a701ec230 "https://juejin.im/post/5a1af88f5188254a701ec230")
