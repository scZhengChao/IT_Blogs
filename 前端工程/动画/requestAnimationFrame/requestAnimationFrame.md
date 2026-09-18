# requestAnimationFrame

## 目录

- [引入](#引入)
- [特点](#特点)
- [usage](#usage)
- [兼容](#兼容)

# **引入**

\*\*　　计时器一直是javascript动画的核心技术。而编写动画循环的关键是要知道延迟时间多长合适。一方面，循环间隔必须足够短，这样才能让不同的动画效果显得平滑流畅；另一方面，循环间隔还要足够长，这样才能确保浏览器有能力渲染产生的变化\*\*
\*\*　　大多数电脑显示器的刷新频率是60Hz，****大概相当于每秒钟重绘60次****。大多数浏览器都会对重绘操作加以限制，不超过显示器的重绘频率，因为即使超过那个频率用户体验也不会有提升。因此，最平滑动画的最佳循环间隔是lOOOms/60，约等于16.6ms\*\*
\*\*　　而setTimeout和setInterval的****问题是，它们都不精确。\*\***它们的内在运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到浏览器UI线程队列中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行**
\*\*　　requestAnimationFrame****采用系统时间间隔，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果\*\*

# **特点**

\*\*　　【1】requestAnimationFrame会把每一帧中的****所有DOM操作集中起来****，在一次重绘或回流中就完成，并且****重绘或回流的时间间隔紧紧跟随浏览器的刷新频率\*\*
\*\*　　【2】在****隐藏或不可见的元素****中，requestAnimationFrame将****不会进行重绘或回流，这当然就意味着更少的的cpu，gpu和内存使用量\*\*
\*\*　　【3】requestAnimationFrame是由****浏览器专门为动画提供的API****，在运行时浏览器会****自动优化方法****的调用，并且如果页面****不是激活状态下的话，动画会自动暂停****，有效节省了CPU开销\*\*

# usage

\*\*　　requestAnimationFrame的用法与settimeout很相似，****只是不需要设置时间间隔而已****。requestAnimationFrame使用一个回调函数作为参数，这个回调函数会在****浏览器重绘之前****调用。它返回一个****整数，表示定时器的编号****，这个值可以****传递给cancelAnimationFrame用于取消****这个函数的执行\*\*

```typescript 
requestID = requestAnimationFrame(callback);
var timer = requestAnimationFrame(function(){
    console.log(0);
});
cancelAnimationFrame(timer); //直接使用数值也是可以的，比如：cancelAnimationFrame（1）

```


# 兼容

```typescript 
以下兼容只是针对不支持的情况下，采用settimeout
兼容：
    /* requestAnimationFrame.js
* by zhangxinxu 2013-09-30
*/
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }


    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
```
