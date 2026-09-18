# Memory 面板基本使用

## 目录

- [相关概念](#相关概念)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56373bf2ca1641e884a122e604d98d5c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=828\&h=451\&s=256058\&e=png\&b=f9f8f8)

**操作步骤：**

- 选择快照堆类型：一般选Heap snapshot（JS堆快照）和Allocation instrumentation on timeline（JS堆分配时间线）
- 点击垃圾回收 -> 开始录制
- 录制完成后得到**堆快照**

> Heap snapshot（JS堆快照）：**发现DOM泄漏**
> Allocation instrumentation on timeline（JS堆分配时间线）： **显示了对象什么时候被创建，什么时候存在内存泄漏**（**蓝色线表示未回收、灰色线表示已回收**）

**视图类型**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/51c14458355b4b83a897ef09315cb385~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=897\&h=608\&s=255752\&e=png\&b=f5f5f5)

- `Summary`：总览视图， &#x20;

  按构造函数分组。用于捕捉对象及其使用的内存。对于定位DOM内存泄露特别有用。
- `Comparison`：对比视图 &#x20;

  用于对比不同操作之后的堆快照，查看内存的释放及引用计数，来分析内存是否泄露及其原因。
- `Containment`：内容视图 &#x20;

  查看堆内容。更适合查看对象结构，有助于分析对象的引用情况。适用于分析闭包以及深入分析对象。
- `Statistics`：统计视图 &#x20;

  总览堆的统计信息。

> **记得每次录制之前要先点击垃圾回收**

> **高度**代表这个对象的大小
> **颜色**代表这个对象的内存释放情况：**蓝色线代表在录制结束前未被回收的，灰色线代表已经被回收了。**

我们可以重复执行某个动作，如果有不少蓝色柱被保留，那就发生了内存泄漏

选中某段时间内的时间线，可以具体分析在这个时间点变化的对象

### 相关概念

- 浅层大小 `Shallow size`：**对象本身持有的内存大小**
- 保留大小 `Retained size`：定义：在删除对象本身及其从 `GC Root`中无法访问的依赖对象时释放的内存大小。也就是**当前对象自身大小加上对象直接或间接引用的其他对象的大小总和**
- `GC Root`：**当前时刻存活的对象**。[pic1.zhimg.com/v2-f79a0f0a…](https://link.juejin.cn?target=https://pic1.zhimg.com/v2-f79a0f0a6d3c485bce3768af596e7b9c_b.webp "pic1.zhimg.com/v2-f79a0f0a…")
- 距离`Distance`：**与根节点的距离。使用**节点的最短简单路径显示到根的距离。
- `Objects Count：`:  **对象个数及百分占**比。

> 点击展开构造函数，可以看到所有构造函数相关的对象实例，@后面的数字是该对象实例的唯一标识符。

**常见的顶层构造函数：**

- (global property)： 全局对象和普通对象的中间对象，和常规思路不同。比如在Window上定义了一个Person对象，那么他们之间的关系就是\[global] => (global property) => Person。之所以使用中间对象，是出于性能的考虑。
- (closure)： 使用函数闭包的对象。
- (array, string, number, regexp)： 一系列对象类型，其属性指向Array/String/Number/Regexp。
- HTMLDivElement/HTMLAnchorElement/DocumentFragment： 元素的引用或者代码引用的指定文档对象。

> 记住，黄色的对象实例表示它被JS代码引用，红色的对象实例表示被黄色节点引用的游离节点。新版本(测试过69)的好像不会有颜色标识

看看开发者工具中的`Memory`一栏，其主要是用于记录页面堆内存的具体情况以及js堆内存随加载时间线动态的分配情况

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5aad3d80dc8450ebd165661c157decb~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1320\&h=1212\&s=554904\&e=png\&b=f9f9f9)

堆快照就像照相机一样，能**记录你当前页面的堆内存情况，每快照一次就会产生一条快照记录**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/188d7e043b4342b7a42655e5dda523f1~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1630\&h=1192\&s=393849\&e=png\&b=fefefe)

> 如上图所示，刚开始执行了一次快照，记录了当时堆内存空间占用为`33.7MB`，然后我们点击了页面中某些按钮，又执行一次快照，记录了当时堆内存空间占用为`32.5MB`。并且点击对应的快照记录，能看到当时所有内存中的变量情况（结构、占总占用内存的百分比...）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a8144f4da0e43589ca11f45be658ddc~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=696\&h=150\&s=58703\&e=png\&b=f9f9f9)

> 在开始记录后，我们可以看到图中右上角有起伏的蓝色与灰色的柱形图，其中`蓝色`表示**当前时间线下占用着的内存**；`灰色`表示**之前占用的内存空间已被清除释放**

在得知有内存泄漏的情况存在时，我们可以改用`Memory`来更明确得确认问题和定位问题

首先可以用`Allocation instrumentation on timeline`来确认问题，如下图所示：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c8cf283f83a46018469d59e8578f28e~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1312\&h=844\&s=186864\&e=png\&b=fbfbfb)
