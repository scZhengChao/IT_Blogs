# 规则长列表

## 目录

- [1：规则长列表优化](#1规则长列表优化)
  - [优劣对比：](#优劣对比)
  - [padding 方案实现](#padding-方案实现)
  - [1、监听一个固定长度列表的首尾元素是否进入视窗](#1监听一个固定长度列表的首尾元素是否进入视窗)
  - [2、更新当前页面渲染的第一个元素对应的序号 (firstIndex)](#2更新当前页面渲染的第一个元素对应的序号-firstIndex)
  - [3、根据上述序号，获取对应数据元素，列表重新渲染成新的内容](#3根据上述序号获取对应数据元素列表重新渲染成新的内容)
  - [4、padding 调整，模拟滚动实现](#4padding-调整模拟滚动实现)
  - [方案总结：](#方案总结)

## **1：规则长列表优化**

**IntersectionObserver 观察者模式 异步监听 元素相对于 其他元素和视窗的位置**

### **优劣对比：**

- 实现对比：

**一个是 Intersection Observer 的监听，来**通知子元素离开视窗，**只要定量设置父元素 padding 就行；**

另一个是**对传统滚动事件的监听，滚动距离的获取，再进行一系列计算，去设置父元素以及子元素的 translate。**

显而易见，前者看起来更加简洁明了一些。

- 性能对比：我知道说到对比，你脑海中肯定一下子会想到性能问题。

**其实性能对比的关键就是 Intersection Observer。因为单就 padding 设置还是 translate 设置，性能方面的差距是甚小的，只是个人感觉 padding 会简洁些**？而 Intersection Observer 其实**抽离了所有滚动层面的相关逻辑**，你不再需要对滚动距离等相应 DOM 属性进行获取，也不再需要进行一系列滚动距离相关的复杂计算，并且**同步的滚动事件触发变成异步的**，**你也不再需要另外去做防抖之类的逻辑**，这在性能方面还是有所提升的。

- **存在的缺陷：**

\*\* 这个api会等待线程空闲下来才去执行 换言之：这是一个异步的apipadding 的计算依赖列表项固定的高度。\*\* 这是一个同步渲染的方案，**也就是目前容器 padding 的计算调整，无法计算异步获取的数据，只跟用户的滚动行为有**关。这看起来与实际业务场景有些不符。解决思路：

- 思路 1、利用 Skeleton Screen Loading 来同步渲染数据元素，不受数据异步获取的影响。即在数据请求还未完成时，先使用一些图片进行占位，待内容加载完成之后再进行替换。
- 思路 2、滚动到目标位置，阻塞容器 padding 的设置（即无限下拉的发生）直至数据请求完毕，用 loading gif 提示用户加载状态，但这个方案相对复杂，你需要全面考虑用户难以预测的滚动行为来设置容器的 padding。

[https://mp.weixin.qq.com/s/xftrY0pgKbLQQcJhagiL0g](https://mp.weixin.qq.com/s/xftrY0pgKbLQQcJhagiL0g "https://mp.weixin.qq.com/s/xftrY0pgKbLQQcJhagiL0g") padding 方案的博客

### **padding 方案实现**

基本了解 Intersection Observer 之后，接下来就看下如何用 Intersection Observer + padding 来实现无限下拉。

先概览下总体思路：

- 监听一个固定长度列表的首尾元素是否进入视窗；
- 更新当前页面内渲染的第一个元素对应的序号；
- 根据上述序号，获取目标数据元素，列表内容重新渲染成对应内容；
- 容器 padding 调整，模拟滚动实现。

**核心：利用父元素的 padding 去填充随着无限下拉而本该有的、越来越多的 DOM 元素，仅仅保留视窗区域上下一定数量的 DOM 元素来进行数据渲染。**

### **1、监听一个固定长度列表的首尾元素是否进入视窗**

```javascript 
// 观察者创建
this.observer = new IntersectionObserver(callback, options);
// 观察列表第一个以及最后一个元素
this.observer.observe(this.firstItem);
this.observer.observe(this.lastItem);

//我们以在页面中渲染固定的 20 个列表元素为例，我们对第一个元素和最后一个元素，
//用 Intersection Observer 进行观察，当他们其中一个重新进入视窗时，callback 函数就会触发：

const callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.target.id === firstItemId) {
            // 当第一个元素进入视窗
        } else if (entry.target.id === lastItemId) {
            // 当最后一个元素进入视窗
        }
    });
};
```


### **2、更新当前页面渲染的第一个元素对应的序号 (firstIndex)**

    拿具体例子来说明，我们用一个数组来维护需要渲染到页面中的数据。数组的长度会随着不断请求新的数据而不断变大，而渲染的始终是其中一定数量的元素，比如 20 个。那么：

- 1、最开始渲染的是数组中序号为 0 - 19 的元素，即此时对应的 firstIndex 为 0；
- 2、当序号为 19 的元素（即上一步的 lastItem ）进入视窗时，我们就会往后渲染 10 个元素，即渲染序号为 10 - 29 的元素，那么此时的 firstIndex 为 10；
- 3、下一次就是，当序号为 29 的元素进入视窗时，继续往后渲染 10个元素，即渲染序号为 20 - 39 的元素，那么此时的 firstIndex 为 20，以此类推。。。

```javascript 
// 我们对原先的 firstIndex 做了缓存
const { currentIndex } = this.domDataCache;
// 以全部容器内所有元素的一半作为每一次渲染的增量
const increment = Math.floor(this.listSize / 2);
let firstIndex;
//这个地方判读向上 
if (isScrollDown) {
    // 向下滚动时序号增加
    firstIndex = currentIndex + increment;
} else {
    // 向上滚动时序号减少
    firstIndex = currentIndex - increment;
}
```


**总体来说，更新 firstIndex，是为了根据页面的滚动情况，知道接下来哪些数据应该被获取、渲染。**

### **3、根据上述序号，获取对应数据元素，列表重新渲染成新的内容**

```javascript 
const renderFunction = (firstIndex) => {
    // offset = firstIndex, limit = 10 => getData
    // getData Done => new dataItems => render DOM
};
```


这一部分就是根据 firstIndex 查询数据，然后将目标数据渲染到页面上即可。

### **4、padding 调整，模拟滚动实现**

&#x20;      既然数据的更新以及 DOM 元素的更新我们已经实现了，那么无限下拉的效果以及滚动的体验，我们要如何实现呢？

&#x20;      想象一下，抛开一切，最原始最直接最粗暴的方式无非就是我们再又获取了 10 个新的数据元素之后，再塞 10 个新的 DOM 元素到页面中去来渲染这些数据。

      但此时，对比上面这个粗暴的方案，我们的方案是：

**这 10个新的数据元素，我们用原来已有的 DOM 元素去渲染，替换掉已经离开视窗、不可见的数据元素；而本该由更多 DOM 元素进一步撑开容器高度的部分，我们用 padding 填充来模拟实现。**

**向下滚动**

```javascript 
// padding的增量 = 每一个item的高度 x 新的数据项的数目
const remPaddingsVal = itemHeight * (Math.floor(this.listSize / 2));
    if (isScrollDown) {
        // paddingTop新增，填充顶部位置
        newCurrentPaddingTop = currentPaddingTop + remPaddingsVal;
    if (currentPaddingBottom === 0) {
        newCurrentPaddingBottom = 0;
    } else {
        // 如果原来有paddingBottom则减去，会有滚动到底部的元素进行替代
        newCurrentPaddingBottom = currentPaddingBottom - remPaddingsVal;
    }
}

//向上滚动
// padding的增量 = 每一个item的高度 x 新的数据项的数目
const remPaddingsVal = itemHeight * (Math.floor(this.listSize / 2));
if (!isScrollDown) {
    // paddingBottom新增，填充底部位置
    newCurrentPaddingBottom = currentPaddingBottom + remPaddingsVal;
    if (currentPaddingTop === 0) {
        newCurrentPaddingTop = 0;
    } else {
        // 如果原来有paddingTop则减去，会有滚动到顶部的元素进行替代
        newCurrentPaddingTop = currentPaddingTop - remPaddingsVal;
    }
}

//最后是 padding 设置更新以及相关缓存数据更新
// 容器padding重新设置
this.updateContainerPadding({
    newCurrentPaddingBottom,
    newCurrentPaddingTop
})

// DOM元素相关数据缓存更新
this.updateDomDataCache({
    currentPaddingTop: newCurrentPaddingTop,
    currentPaddingBottom: newCurrentPaddingBottom
});
```


**思考总结**

### **方案总结：**

       利用 `Intersection Observer` 来监测相关元素的滚动位置，异步监听，尽可能得减少 DOM 操作，触发回调，然后去获取新的数据来更新页面元素，并且用调整容器 `padding `来**替代了本该越来越多**的 `DOM `元素，最终实现列表滚动、无限下拉

**相关方案的对比**

    这里和较为有名的库 - iScroll 实现的无限下拉方案进行一个基本的对比，对比之前先说明下 iScroll infinite 的实现概要。

**iScroll 通过对传统滚动事件的监听，获取滚动距离，然后：**

    1. 设置父元素的 `translate `来实现整体内容的上移（下移）；

    2. 再基于这个滚动距离进行相应计算，得知相应子元素已经被滚动到视窗外，并且判断是否应该将这些离开视窗的子元素移动到末尾，从而再对它们进行 `translate `的设置来移动到末尾。这就像是一个循环队列一样，随着滚动的进行，顶部元素先出视窗，但又将移动到末尾，从而实现无限下拉。

[longList.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/longList_NO3WQEsURs.html "longList.html")

这个文件有个严重的问题；会反复触发**IntersectionObserver监听；没有解决**

**最后看下作者源码**：

[listScroll-master.7z](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/listScroll-master_omu7uRgywq.7z "listScroll-master.7z")

看了作者源码后修改的：

[longList.html](https://github.com/scZhengChao/IT_Blogs/releases/download/assets-v1/longList_JHjQUnEQ7I.html "longList.html")
