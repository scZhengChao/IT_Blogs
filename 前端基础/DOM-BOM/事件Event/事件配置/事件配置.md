# 事件配置

## 目录

- [冒泡和默认事件](#冒泡和默认事件)
- [事件监听器只运行一次](#事件监听器只运行一次)
- [target 和 currentTarget](#target-和-currentTarget)

# 冒泡和默认事件

```javascript 
eve.preventDefault() || (eve.returnValue = false)   阻止默认行为
e.stopPropagation() ||  e.cancelBubble = true  取消冒泡

```


# 事件监听器只运行一次

如果你想添加一个事件监听器并且只运行一次，你可以使用 once选项：

```javascript 
 element.addEventListener('click', () => console.log('I run only once'), {
    once: true
});           

```


# target 和 currentTarget

`e.target`：触发事件的元素
`e.currentTarget`：绑定事件的元素

在addEventListener事件委托中第三个参数，可以设置为bool类型（useCapture）或者object类型(options)。

cancelable 属性为 true，也就是说它的默认行为可以被监听器通过 preventDefault() 方法阻止

二级事件（不会被覆盖掉）

- object类型(options)包括三个布尔值选项：
- capture: 默认值为false（即 使用事件冒泡）.，true---使用事件捕获；
- \*once: 默认值为false，是否只调用一次，true---会在调用后自动销毁listener
- \* passive:不同浏览器默认值不同。true---listener永远不远调用preventDefault方法。

根据规范，默认值为false. 但是chrome, Firefox等浏览器为了保证滚动时的性能，在Window,、Document、 Document.body上针对  touchstart  和  touchmove  事件将passive默认值改为了true， 保证了在页面滚动时不会因为自定义事件中调用了preventDefault而阻塞页面渲染。

- bool类型（useCapture）: 默认值为false（即 使用事件冒泡），与capture用法相同。

true 是捕获 谷歌标准

false是冒泡  ie 标准

最后默认采用ie 标准

once只触发一次的事件

document.addEventListener('keyup', function listener() {

doSomething(hugeString);

}, {once: true});

passive passive 监听器能保证的只有一点，那就是调用 preventDefault() 无效

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。

\<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->

\<!-- 而不会等待 `onScroll` 完成  -->

\<!-- 这其中包含 `event.preventDefault()` 的情况 -->

\<div v-on:scroll.passive="onScroll">...\</div>

这个 .passive 修饰符尤其能够提升移动端的性能。

不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，

同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。

由于 touchstart 事件对象的 cancelable 属性为 true，也就是说它的默认行为可以被监听器通过 preventDefault() 方法阻止，那它的默认行为是什么呢，通常来说就是滚动当前页面（还可能是缩放页面），如果它的默认行为被阻止了，页面就必须静止不动。但浏览器无法预先知道一个监听器会不会调用 preventDefault()，它能做的只有等监听器执行完后再去执行默认行为，而监听器执行是要耗时的，有些甚至耗时很明显，这样就会导致页面卡顿。视频里也说了，即便监听器是个空函数，也会产生一定的卡顿，毕竟空函数的执行也会耗时。

视频里还说了，有 80% 的滚动事件监听器是不会阻止默认行为的，也就是说大部分情况下，浏览器是白等了。所以，passive 监听器诞生了，passive 的意思是“顺从的”，表示它不会对事件的默认行为说 no，浏览器知道了一个监听器是 passive 的，它就可以在两个线程里同时执行监听器中的 JavaScript 代码和浏览器的默认行为了。

下面是在 Chrome for Android 上滚动 [cnn.com](http://cnn.com "cnn.com") 页面的对比视频，右边在注册 touchstart 事件时添加了 {passive: true} 选项，左边没有，可以看到，右边的顺畅多了。
