# 手把手教你排查Javascript内存泄漏

## 目录

- [引言](#引言)
- [如何判断我的应用发生了内存泄漏？](#如何判断我的应用发生了内存泄漏)
- [Performance和Memory都可以用来定位内存问题，先用谁呢？](#Performance和Memory都可以用来定位内存问题先用谁呢)
- [通过Memory面板定位内存泄漏的流程通常是怎么样的呢？](#通过Memory面板定位内存泄漏的流程通常是怎么样的呢)
- [为什么我的内存快照记录下来之后看不懂，还出现了很多奇怪的变量？](#为什么我的内存快照记录下来之后看不懂还出现了很多奇怪的变量)
- [快照里有一些“Detached DOM tree”，是什么意思？](#快照里有一些Detached-DOM-tree是什么意思)
- [Shallow size 和 Retained size，它们有什么不同？](#Shallow-size-和-Retained-size它们有什么不同)
- [Memory里的Summary视图, Comparison视图, Dominators视图和Containment视图分别有什么不同呢？](#Memory里的Summary视图-Comparison视图-Dominators视图和Containment视图分别有什么不同呢)
  - [Summary view:](#Summary-view)
  - [Comparison view:](#Comparison-view)
  - [Containment view:](#Containment-view)
  - [Statistics view:](#Statistics-view)
- [Constructor下的(array), Array, (closure), (compiled code)都对应的哪些内容？](#Constructor下的array-Array-closure-compiled-code都对应的哪些内容)
- [发现有一个叫feedback\_cell的字段经常出现，它是什么？是它导致了内存泄漏吗？](#发现有一个叫feedback_cell的字段经常出现它是什么是它导致了内存泄漏吗)
- [常见的内存泄漏场景有哪些？](#常见的内存泄漏场景有哪些)
- [结语](#结语)

## 引言

也许你已经知道，Chrome DevTools里的Performance面板和Memory面板可以用来定位内存问题。**但当你真正上手使用它们的时候，往往会觉得不知所措 —— 因为里面有着各种各样的选项和功能，让人眼花缭乱。** 下面我会通过一些常见的FAQ来带大家一起学习怎么用工具定位javascript里的内存问题。

## 如何判断我的应用发生了内存泄漏？

> 为了证明螃蟹的听觉在腿上，一个专家捉了只螃蟹并冲它大吼，螃蟹很快就跑了。然后捉回来再冲它吼，螃蟹又跑了。最后专家把螃蟹的腿都切了，又对着螃蟹大吼，螃蟹果然一动不动……

定位内存问题的过程其实也类似，如果你自己都不知道自己的页面在使用过程中哪些步骤会导致内存增长，那很可能就会错把一个正常的内存增长当作内存泄漏来排查，最后查了半天白忙活。 其实一个单页应用在使用过程中，内存发生增长是很合理的。例如在开发过程中，为了优化使用体验，我们可能会对部分数据进行缓存，这部分缓存的数据其实也会导致内存占用的升高，但它是符合预期的。因此，排查内存泄漏的第一步，**就是要先梳理一遍自己的代码，看一下哪部分内存的升高是合理的，哪部分内存的升高是不合理的**。

## Performance和Memory都可以用来定位内存问题，先用谁呢？

答案是先用Performance。 当我们怀疑页面发生了内存泄漏的时候，可以先用Performance录制一段时间内页面的性能变化。你只需要切换到Performance面板，点击Record，然后在页面上正常操作一段时间，最后停止录制即可。

![](https://pic1.zhimg.com/v2-1487687a8d5cb513fb94c67d4f400ed6_1440w.jpg)

不断升高的内存下限

如果录制结束后 **，看到内存的下限在不断升高的话，你就要注意了 —— 这里有可能发生了内存泄漏。**

除了内存增长曲线，Nodes（Dom节点数曲线）、Document曲线以及Listener曲线也同样值得关注，有时候它们对内存问题的定位也很有帮助。

当你怀疑发生了内存泄漏的时候，你就可以用Memory面板来进一步定位泄漏的源头了。

## 通过Memory面板定位内存泄漏的流程通常是怎么样的呢？

通常，我们可以从Memory的主界面开始，点击左上角的圆点就可以记录下当前的堆内存快照（heap snapshot）了。

![](https://pic2.zhimg.com/v2-15bbd4901cb26f45e47ab636d5decb21_1440w.jpg)

Memory面板

这里推荐一个Gmail团队也在用的 “three snapshot”技巧：

1. 打开DevTools, 切换至Memory面板
2. 先记录一个堆内存快照
3. 在你的页面上执行可能发生泄漏的操作
4. 再记录一个堆内存快照
5. 重复执行多几遍步骤3
6. 最后记录一个堆内存快照
7. 选择最后一个堆内存快照，找到顶栏的“All objects”**, 切换至”Objects allocated between snapshots 1 and 2”（也可以对2，3执行同样的操作）**

![](https://pic4.zhimg.com/v2-78ddf51f642d2ba3bdc5fad48f27d391_1440w.jpg)

过滤出两份快照之间新分配的对象

1. 切换后，你就能看到两个快照之间新生成的对象。你可以选择其中一项点开，看看它的retaining tree里面保留了哪些对象没有释放。

Tips：在记录第一个堆快照之前你可以先做一些“预热”操作，避免一些懒加载和缓存策略影响到了对内存的分析。

## 为什么我的内存快照记录下来之后看不懂，还出现了很多奇怪的变量？

这也是我排查内存泄漏时遇到的第一个问题，为什么教程里的内存快照简洁易懂，我的内存快照却像一本天书？

![](https://pic3.zhimg.com/v2-dd8106e7191b9cb8d573f3ea3a9b2bc8_1440w.jpg)

教程里的内存快照

![](https://picx.zhimg.com/v2-a931ea8898cef99a1bd38ca7f052ea87_1440w.jpg)

我的内存快照

为什么有这么大的差异呢？除去教程里demo代码比较简单之外，提前准备好一个合理的debug环境也是很重要的。这里我列举了4点个人觉得对debug内存问题很有帮助的措施：

1. 尽量使用没有混淆的代码：

打包后**的代码往往经过了混淆和压缩，在生产环境上这是必要的，但在debug时却会成为我们的绊脚石，不便于阅读。**

1. 排查问题时使用production模式编译出来的代码：

Dev模式下往往会开启一些方便开发的特性，例如热更新等。但它们可能会占用一部分的内存，影响到内存问题的排查，所以建议还是使用production模式编译出来的代码进行问题排查。

1. 屏蔽所有浏览器插件：

屏蔽浏览器插件最快的方式就是打开无痕窗口。浏览器插件给我们带来很多便利，但插件注入的额外逻辑有时也会影响内存问题的排查。例如vue-devtools会记录下每一个vuex mutaions，导致内存无法释放。

1. 在现场打内存快照，便于跳转到源代码所在行：

尽管devTools记录下来的内存快照文件可以单独加载展示，但还是建议在记录下内存快照的时候“趁热”分析，因为这时还能从retaining tree上跳转到代码所在行，有时候对定位问题也很有帮助。

![](https://pic1.zhimg.com/v2-3e7886d25e690800ce16e85996522a1c_1440w.jpg)

跳转到源码所在行

## 快照里有一些“Detached DOM tree”，是什么意思？

一个DOM节点只有在没有被页面的DOM树或者Javascript引用时，才会被垃圾回收。当一个节点处于“detached”状态，表示它已经不在DOM树上了，但**Javascript仍旧对它有引用，所以暂时没有被回收。通常，Detached DOM tree往往会造成内存泄漏，我们可以重点分析这部分的数据。**

## Shallow size 和 Retained size，它们有什么不同？

- Shallow size: 这是**对象自身占用内存的大小**。通常只有数组和字符串的shallow size比较大。
- Retain size: 这是将对象\*\*本身连同其无法从 GC 根到达的相关对象一起删除后释放的内存大小。 \*\*因此，**如果Shallow Size = Retained Size，说明基本没怎么泄漏。而如果Retained Size > Shallow Size，就需要多加注意了。**

## Memory里的Summary视图, Comparison视图, Dominators视图和Containment视图分别有什么不同呢？

### Summary view:

顾名思义，Summary view就是当前内存快照的一个概览。我们先介绍一下这个视图下的每一列是什么意思： -

- Constructor: 对象的构造器。&#x20;
- Distance：与root的距离。距离越大，处理和加载这个对象的时间就越长。&#x20;
- &#x20;Object Count：指定构造器创建的对象的数量。&#x20;
- Shallow Size：对象自身占用内存的大小。&#x20;
- Retained Size：释放掉该对象后，能释放掉的内存。

在这个视图下你可以看到当前页面内存的具体构成，但如果想定位内存问题，下面的Comparison view会更加有用。

### Comparison view:

Comparison视图可以让你**对比两份内存快照之间的差异。默认是跟上一份快照**做对比，当然你也可以选择任意两份内存做对比。这个视图下每一列的数据有点不同：&#x20;

\- Constructor: 对象的构造器。&#x20;

\- # New: 该对象构造器下有多少新对象被创建&#x20;

\- # Deleted: 该对象构造器下有多少新对象被销毁&#x20;

\- # Delta:

&#x20;\# New&#x20;

\- # Delete的差值&#x20;

\- Alloc.Size：两份快照之间新分配的内存&#x20;

\- Freed Size： 两份快照之间释放掉的内存&#x20;

\- Size Delta：Alloc Size&#x20;

\- Freed Size 的差值

这个视图绝对是排查**内存泄漏的利器。当你能定位到是哪些操作可能造成内存泄漏后，比较操作前后的内存快照，很容易就能发现发生内存**泄漏的对象。

### Containment view:

Containment view提供了一个自下而上的视图，它允许你浏览和探索堆内存的内容。我们可以用它来分析一些全部变量的引用情况（如window）。

### Statistics view:

Statistics视图会用饼图的形式展示各个类型对象的内存占比

## Constructor下的(array), Array, (closure), (compiled code)都对应的哪些内容？

- **(closure): 函数闭包持有的内存引用。**
- (array, string, number, regex): 包含着一系列对象，这些对象的属性上有对应类型变量的引用。
- **(compiled code): Javascript引擎（如V8）为了加快运行速度，会对代码进行一次编译。(compiled code)顾名思义就是指与编译后的代码相关联的内存。**
- **Detached HTMLDivElement等：代码里对指定类型Dom节点的引用。**

## 发现有一个叫feedback\_cell的字段经常出现，它是什么？是它导致了内存泄漏吗？

![](https://pic4.zhimg.com/v2-ea319c219d1ab441b9e038cbc707436d_1440w.jpg)

经常出现的feedback\_cell

放心，它不会造成内存泄漏。它是v8对频繁运行的热代码做出的优化，会被v8自己回收。详见这篇文章：[Feedback vectors in heap snapshots – Rohit Pagariya](https://link.zhihu.com/?target=https://rohitwhocodes.wordpress.com/2020/08/20/feedback-vectors-in-heap-snapshots/ "Feedback vectors in heap snapshots – Rohit Pagariya")

## 常见的内存泄漏场景有哪些？

这里列举了一些常见的内存泄漏场景，遇到内存泄漏问题时可以先自查一遍常见场景，个人感觉能解决日常开发中遇到的90%内存泄漏

1. console导致的内存泄漏 因为打印后的对象需要支持在控制台上查看，所以传递给console.log方法的对象是不能被垃圾回收的。我们需要避免在生产环境用console打印对象。 &#x20;
2. 框架配合第三方库使用时，没有及时执行销毁 这点可以参考vue cookbook里的例子：[避免内存泄漏 — Vue.js 中文文档](https://link.zhihu.com/?target=https://vuejs.bootcss.com/cookbook/avoiding-memory-leaks.html "避免内存泄漏 — Vue.js 中文文档") &#x20;
3. 被遗忘的定时器 例如在组件初始化的时候设置了`setInterval`，那么在组件销毁之前记得调用`clearInterval`方法取消定时器。 &#x20;
4. 没有正确移除事件监听器（各种EventBus, dom事件监听等） 这应该是最容易犯的一个错误，无论新手老手都有可能栽在这里。 &#x20;

   特征：performance里，监听器数量会持续上升

![](https://pica.zhimg.com/v2-665b17f65dcd087e67c4f5416513d102_1440w.png)

持续上升的监听器数量

啰嗦一句：尽管大部分同学都会有主动移除监听器的观念，但如果姿势不对，可能依旧会造成内存泄漏。下面是一个真实案例：

```javascript 
// 版本一
mounted() {
    window.addEventListener('resize', debounce(this.handleWidthChange, 100))
},
beforeDestroy() {
    window.removeEventListener('resize', debounce(this.handleWidthChange, 100)) 
}

```


乍一看好像写的还不错，有及时移除监听器，对resize这种频繁触发的事件也加了debounce处理。但其实这段代码就导致了内存泄漏：每次调用`debounce(this.handleWidthChange, 100)`时, **其实都会返回一个新的函数**，导致`addEventListener`和 `removeEventListener`方法传入的回调函数已经不是同一个回调函数，监听器没有被正确移除，内存泄漏。

下面来看修改后的代码:

```javascript 
/ 版本二
data() {
    return {
        debounceWidthChange: null
    }
},
mounted() {
    this.debounceWidthChange = debounce(this.handleWidthChange, 100)
    window.addEventListener('resize', this.debounceWidthChange)
},
beforeDestroyed() {
    window.removeEventListener('resize', this.debounceWidthChange)  
}

```


修改后，监听和移除监听的已经是同一个回调函数了，看起来似乎已经没问题。然而，这段代码还是有内存泄漏的问题。没看出问题的小伙伴可以对比一下正确答案：

```typescript 
// 版本三
data() {
    return {
        debounceWidthChange: null
    }
},
mounted() {
    this.debounceWidthChange = debounce(this.handleWidthChange, 100)
    window.addEventListener('resize', this.debounceWidthChange)
},
beforeDestroy() {
    window.removeEventListener('resize', this.debounceWidthChange)  
}

```


是的，答案非常狗血：Vue只有`destroyed`和`beforeDestroy`这两个生命周期，没有 `beforeDestroyed`，所以上面的`beforeDestroyed`函数永**远不会执行，导致了内存泄漏…**

## 结语

简单总结一下排查内存泄漏的常见流程： 1. 用performance面板记录操作一段时间内的内存变化，找出可能发生内存泄漏的操作。 2. 用“three snapshot”技巧，记录下发生泄漏前后的内存快照 3. 用comparison视图对泄漏前后的内存快照进行比较，找出泄漏的对象。 4. 重点关注 Vue Component, Detached HTMLDivElement等Constructor 。
