# 内存泄漏和垃圾回收

## 目录

- [一、什么是内存泄漏？](#一什么是内存泄漏)
- [二、垃圾回收机制](#二垃圾回收机制)
  - [2.1变量的生命周期](#21变量的生命周期)
  - [2.2垃圾回收算法（了解）](#22垃圾回收算法了解)
    - [第一步：标记空间中「可达」值。](#第一步标记空间中可达值)
    - [第二步：回收「不可达」的值所占据的内存。](#第二步回收不可达的值所占据的内存)
    - [第三步，做内存整理。](#第三步做内存整理)
  - [2.3 什么时候垃圾回收？](#23-什么时候垃圾回收)
    - [分代收集](#分代收集)
    - [主垃圾回收器](#主垃圾回收器)
    - [副垃圾回收器负责新生代的垃圾回收，通常只支持 1\~8 M 的容量。](#副垃圾回收器负责新生代的垃圾回收通常只支持-18-M-的容量)
    - [分代收集](#分代收集)
    - [增量收集](#增量收集)
    - [闲时收集](#闲时收集)
- [三、内存泄漏的识别方法](#三内存泄漏的识别方法)
  - [3.1 浏览器](#31-浏览器)
  - [3.2 命令行](#32-命令行)
- [四、常见内存泄漏及解决方法](#四常见内存泄漏及解决方法)
  - [JS 代码中常见的几个内存泄漏源](#JS-代码中常见的几个内存泄漏源)
    - [全局变量](#全局变量)
    - [闭包](#闭包)
    - [计时器](#计时器)
    - [事件侦听器](#事件侦听器)
    - [缓存](#缓存)
    - [分离的 DOM 元素（注意）](#分离的-DOM-元素注意)
  - [4.1 WeakMap](#41-WeakMap)
  - [4.2  WeakMap 示例](#42-WeakMap-示例)
- [总结：](#总结)
  - [面试题1：浏览器怎么进行垃圾回收？](#面试题1浏览器怎么进行垃圾回收)
  - [面试题2：浏览器中不同类型变量的内存都是何时释放？](#面试题2浏览器中不同类型变量的内存都是何时释放)
  - [面试题3：哪些情况会导致内存泄露？如何避免？](#面试题3哪些情况会导致内存泄露如何避免)
  - [闭包会导致内存泄露吗？](#闭包会导致内存泄露吗)
  - [面试题4：weakMap weakSet 和 Map Set 有什么区别？](#面试题4weakMapweakSet和MapSet有什么区别)
  - [总结](#总结)

# **一、什么是内存泄漏？**

**程序的运行需要内存。只要程序提出要求，操作系统或者运行时（runtime）就必须供给内存。**

**对于持续运行的服务进程（daemon），必须及时释放不再用到的内存**。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。

![  ](./image/ed46508a6de34928916e902c0b6721e5__typuOqPFE.png "  ")

**不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。**

有些语言（比如 C 语言）必须手动释放内存，程序员负责内存管理。

```javascript 
char * buffer;

buffer = (char*) malloc(42);

// Do something with buffer

free(buffer);
```


上面是 C 语言代码，malloc方法用来申请内存，使用完毕之后，必须自己用free方法释放内存。

这很麻烦，所以大多数语言提供自动内存管理，减轻程序员的负担，这被称为"垃圾回收机制"（garbage collector）。

# **二、垃圾回收机制**

**垃圾回收机制怎么知道，哪些内存不再需要呢？**

            最常使用的方法叫做（**`reference counting`**）：**语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。**

**如果一个值的引用次数是0，就表示这个值不再**用到了，因此可以将这块内存释放。

![  ](./image/b086cfbfb7cf47e884b33c588c26f513_9lM15TpZa9.png "  ")

上图中，左下角的两个值，没有任何引用，所以可以释放。

**如果一个值不再需要了，引用数却不为0，垃圾回收机制无法释放这块内存，从而导致内存泄漏**。

```javascript 
const arr = [1, 2, 3, 4];

console.log('hello world');
```


上面代码中，数组\[1, 2, 3, 4]是一个值，会占用内存。变量arr是仅有的对这个值的引用，因此引用次数为1。尽管后面的代码没有用到arr，它还是会持续占用内存。

**如果增加一行代码，解除arr对\[1, 2, 3, 4]引用，这块内存就可以被垃圾回收机制释放了。**

```javascript 
let arr = [1, 2, 3, 4];**

console.log('hello world');**

arr = null;**
```


上面代码中，arr重置为null，就解除了对\[1, 2, 3, 4]的引用，引用次数变成了0，内存就可以释放出来了。

**因此，并不是说有了垃圾回收机制，程序员就轻松了。你还是需要关注内存占用：那些很占空间的值，一旦不再用到，你必须检查是否还存在对它们的引用。如果是的话，就必须手动解除引用。**

1. 浏览器怎么进行垃圾回收？
2. 浏览器中不同类型变量的内存都是何时释放？
3. 哪些情况会导致内存泄露？如何避免？
4. weakMap weakSet 和 Map Set 有什么区别？

## **2.1变量的生命周期**

比如这么一段代码：

```javascript 
 let dog = new Object()；
let dog.a = new Array(1)
```


当 JavaScript 执行这段代码的时候，会先在全局作用域中添加一个dog属性，并在堆中创建了一个空对象，将该对象的地址指向了 dog。随后又创建一个大小为 1 的数组，并将属性地址指向了 dog.a。此时的内存布局图如下所示:

![  ](./image/640_R2TZzHE7pE.png "  ")

如果此时，我将另外一个对象赋给了 a属性，代码如下所示:

```handlebars 
 dog.a = new Object()
```


此时的内存布局图：

![  ](./image/640_s0buScQEC1.png "  ")

       a的指向改变了， 此时堆**中的数组对象就成为了不被使用的数据，专业名词叫「不可达」的数据。**

这就是需要回收的垃圾数据。

## **2.2垃圾回收算法（了解）**

可以将这个过程想象成从根溢出一个巨大的油漆桶，它从**一个根节点出发将可到达的对象标记染色**， 然后移除未标记的。

### **第一步：标记空间中「可达」值。**

V8 采用的是**可达性 (reachability) 算法**来判断堆中的对象应**不应该被回收**。

这个算法的思路是这样的：

- 从根节点（Root）出发，遍历所有的对象。
- **可以遍历到的对象，是可达的（reachable）。**
- **没有被遍历到的对象，不可达的（unreachable）。**

在浏览器环境下，**根节点有**很多，主要包括这几种：

- **全局变量 ****window****，位于每个 ****iframe**** 中**
- **文档 ****DOM**** 树**
- **存放在栈上的变量**
- **...**

**这些根节点不是垃圾，不可能被回收**。

### **第二步：回收「不可达」的值所占据的内存。**

在所有的标记完成之后，统一清理内存中所有不可达的对象。

### **第三步，做内存整理。**

- **在频繁回收对象后，内存中就会存在大量不连续空间，****专业名词叫「内存碎片」****。**
- 当内存中**出现了大量的内存碎片，如果需要分配较大的连续内存时，就有可能出现内存不足的情况**。
- 所以最后**一步是整理内存碎片**。(但这步其实是可选的，因为有的垃圾回收器不会产生内存碎片，比如接下来我们要介绍的副垃圾回收器。)

## **2.3 什么时候垃圾回收？**

浏览器**进行垃圾回收的时候，会暂停 JavaScript 脚本，等垃圾回收完毕再继续执行**。

             对于普通应用这样没什么问题，但对于 JS 游戏、动画对连贯性要求比较高的应用，如果暂停时间很长就会造成页面卡顿。

这就是我们接下来谈的关于垃圾回收的问题：

**什么时候进行垃圾回收，可以避免长时间暂停。**

### **分代收集**

浏览器将数据分为两种，一种是「临时」对象，一种是「长久」对象。

- 临时对象：
  - 大部分**对象在内存中存活的时间很短**。
  - 比如**函数****内部声明的变量，或者块级作用域中的变量。当函数或者代码块执行结束时****，作用域中定义的变量就会被销毁。**
  - **这类对象很快就变得不可访问，应该快点回收。**
- 长久对象：
  - **生命周期很长的对象****，比如全局的 window、DOM、Web API 等等。** ​
  - **这类对象可以慢点回收。**

               &#x20;

这两种对象对应不同的回收策略，所以，V8 把堆分为

**新生代和老生代两个区域**， **新生代中存放临时对象，老生代中存放持久对象**。并且让**副垃圾回收器、主垃圾回收器，分别负责新生代、老生代的垃圾回收**。

这样就可以实现高效的垃圾回收啦。

一般来说，面试回答到这就够了。如果想和面试官深入交流，可以继续聊聊两个垃圾回收器。

### **主垃圾回收器**

负责老生代的垃圾回收，有两个特点：

1. **对象占用空间大。**
2. **对象存活时间长。**

它使用「标记-清除」的算法执行垃圾回收。

1. 首先是标记。
   - 从一组根元素开始，递归遍历这组根元素。
   - 在这个遍历过程中，**能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。**
2. 然后是垃圾清除。

![  ](./image/640_SP2ktcJfUQ.png "  ")

1. 直接将标记为垃圾的数据清理掉。
2. 多次标记-清除后，会产生大量不连续的内存碎片，**需要进行内存整理。**

![  ](./image/640_ZBvmqyEFUK.png "  ")

### **副垃圾回收器**负责**新生代的垃圾回收，通常只支持 1\~8 M 的容量**。

新生代被分为两个区域：一**般是对象区域，一半是空闲区域**。

![  ](./image/640_hJkDCUEC11.png "  ")

**新加入的对象都被放入对象区域**，**等对象区域快满的时候，会执行一次垃圾清理**。

1. **先给对象区域所有垃圾做标记。**
2. **标记完成后，存活的对象被复制到空闲区域，并且将他们有序的排列一遍**。

![  ](./image/640_rnXYsLynKZ.png "  ")

1. 这就回到我们前面留下的问题 -- 副垃圾回收器没有碎片整理。因为空闲区域里此时是有序的，没有碎片，也就不需要整理了。
2. **复制完成后，对象区域会和空闲区域进行对调。将空闲区域中存活的对象放入对象区域里**。

![  ](./image/640_xQZxxva6V2.png "  ")

1. 这样，就完成了垃圾回收。

**因为副垃圾回收器操作比较频繁，所以为了执行效率，一般新生区的空间会被设置得比较小。一旦检测到空间装满了，就执行垃圾回收**。

### **分代收集**

一句话总结分代回收就是：

**将堆分为新生代与老生代，多回收新生代，少回收老生代**。这样就**减少了每次需遍历的对象，从而减少每次垃圾回收的耗时。**

![  ](./image/640_MZHjqJkK4w.png "  ")

### **增量收集**

如果脚本中有许多对象，引擎一次性遍历整个对象，会造成一个长时间暂停。

所**以引擎将垃圾收集工作分成更小的块，每次处理一部分，多次处理。**

这样就解决了长时间停顿的问题。

![  ](./image/640_6XUHBVoBj-.png "  ")

### **闲时收集**

垃圾收集器只会在 CPU 空闲时尝试运行，以减少可能对代码执行的影响。

# **三、内存泄漏的识别方法**

怎样可以观察到内存泄漏呢？

是，如果**连续五次垃圾回收之后，内存占用一次比一次大，就有内存泄漏**。这就要求实时查看内存占用。

## 3.1 浏览器

Chrome 浏览器查看内存占用，按照以下步骤操作。

![  ](./image/e6118b1f270b4e59aa46d9dc42191ea1_j0dN1ABR6s.png "  ")

1\. 打开开发者工具，选择 Timeline 面板

2\. 在顶部的Capture字段里面勾选 Memory

3\. 点击左上角的录制按钮。

4\. 在页面上进行各种操作，模拟用户的使用情况。

5\. 一段时间后，点击对话框的 stop 按钮，面板上就会显示这段时间的内存占用情况。

如果内存占用基本平稳，接近水平，就说明不存在内存泄漏。

![  ](./image/3526a27e1a8144b0b64a916f3a3baa7a_t78DO3eNmp.png "  ")

反之，就是内存泄漏了。

![  ](./image/734c2e6128db4b95889001dbd1e073d6_KamIrThNr9.png "  ")

## **3.2 命令行**

命令行可以使用 Node 提供的process.memoryUsage方法。

```javascript 
console.log(process.memoryUsage()); 
// { rss: 27709440, // heapTotal: 5685248, // heapUsed: 3449392, // external: 8772 }
```


process.memoryUsage返回一个对象，**包含了 Node 进程的内存占用信息。该对象包含四个字**段，单位是字节，含义如下。

![  ](./image/6c473b09d52748608d4ad0d1babda6ce_HNY_zDJcoI.png "  ")

· rss（resident set size）：所有内存占用，包括指令区和堆栈。

· heapTotal："**堆"占用**的内存，包括用到的和没用到的。

· heapUsed：**用到的堆**的部分。

· external： **V8 引擎内部的 C++ 对象占用的内存。**

**判断内存泄漏，以heapUsed字段为准。**

# **四、常见内存泄漏及解决方法**

            相比过去的网页，今天流行的 SPA 需要开发人员更加关注程序中的内存泄漏情况。因为以前的网站在浏览时会不断刷新页面，可是**SPA 网站往往只有少数几个页面，很少完全重新加载**。这篇文章主要探讨 JS 代码中容易导致内存泄漏的模式，并给出改进对策。

内存泄漏指由于**疏忽或错误造成程序未能释放已经不再使用的内存**的情况。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于**设计错误，失去了对该段内存的控制**，因而造成了内存的浪费。

JavaScript 是一个有**垃圾回收机制的语言，我们不需要手动回收内存。当本应在垃圾回收周期中清理的内存中的对象**，通过另一个对象的无意引用从根保持可访问状态时，就会发生内存泄漏，并可能导致性能下降的后果。

        内存泄漏通常很难发现和定位。泄漏的 JavaScript 代码从任何层面都不会被认为是无效的，并且浏览器在运行时不会引发任何错误。

        检查内存使用情况的最快方法是**查看浏览器的任务管理器**（不是操作系统的那个任务管理器）。

&#x20;       在 Linux 和 Windows 上按**Shift+Esc 来访问 Chrome 的任务管理器**；**Firefox 则在地址栏中键入 about:performanc**e。我们能用它查看每个选项卡的 JavaScript 内存占用量。如果发现异常的**内存使用量持续增长**，就很可能出现了泄漏。**开发工具**提供了更高级的内存管理方法。通过 Chrome 的性能工具，我们可以直观地分析页面在运行时的性能。像下面这种模式就是内存泄漏的典型表现：

![  ](./image/27a800207681ab3550c74a2e10171d40_ZMH6fO6kiC.png "  ")

## JS 代码中常见的几个内存泄漏源

### **全局变量**

    全局变量总是从根可用，并且永远不会回收垃圾。在非严格模式下，一些错误会导致变量从本地域泄漏到全局域：

- **将值分配给未声明的变量；**
- **使用“this”指向全局对象**

```javascript 
function createGlobalVariables() {

    leaking1 = 'I leak into the global scope'; // assigning value to the undeclared variable
  
    this.leaking2 = 'I also leak into the global scope'; // 'this' points to the global object
  
};

createGlobalVariables();

window.leaking1; // 'I leak into the global scope'

window.leaking2; // 'I also leak into the global scope'
```


**预防措施**：使用严格模式（"use strict"）。

### **闭包**

**函数作用域内的变量将在函数退出调用栈后清除**，并且如果**函数外部没有其他指向它们的引用**，则将清理它们。但**闭包将保留引用的变量并保持活动状态。**

```javascript 
function outer() {

    const potentiallyHugeArray = [];

    return function inner() {

        potentiallyHugeArray.push('Hello'); // function inner is closed over the potentiallyHugeArray variable

        console.log('Hello');

    };
};

const sayHello = outer(); // contains definition of the function inner

function repeat(fn, num) {

    for (let i = 0; i < num; i++){

        fn();
    }
}

repeat(sayHello, 10);
```


    在此示例中，**从任何一个函数都不会返回 potentialHugeArray，并且无法到达它，但它的大小可以无限增加，** 具体取决于我们调用函数 inner() 的次数。

**预防措施**：闭包是肯定会用到的，所以重要的是：

- **了解何时创建了闭包，以及它保留了哪些对象；**
- **了解闭包的预期寿命和用法（尤其是用作回调时**）。

解决办法：JavaScript代码段运行完之时将形成循环引用的JavaScript对象手动设置为空，切断引用。

### **计时器**

       如果我们在代码中设置了递归计时器（recurring timer），则只要回调可调用，计时器回调中对该对象的引用就将保持活动状态。

     在下面的示例中，由于我们没有对 setInterval 的引用，因此它永远不会被清除，并且 data.hugeString 会一直保留在内存中。

```javascript 
function setCallback() {

    const data = {

        counter: 0,

        hugeString: new Array(100000).join('x')
    };

    return function cb() {

        data.counter++; // data object is now part of the callback's scope

        console.log(data.counter);

    }
}

setInterval(setCallback(), 1000); // how do we stop it?
```


**预防措施**：尤其是在回调的生命周期不确定或 undefined 的情况下：

- **了解从计时器的回调中引用了哪些对象；**
- **使用计时器返回的句柄在必要时取消它；**

```javascript 
function setCallback() {

    // 'unpacking' the data object

    let counter = 0;

    const hugeString = new Array(100000).join('x'); // gets removed when the setCallback returns

    return function cb() {

        counter++; // only counter is part of the callback's scope

        console.log(counter);

    }

}

const timerId = setInterval(setCallback(), 1000); // saving the interval ID

// doing something ...

clearInterval(timerId); // stopping the timer i.e. if button pressed
```


### **事件侦听器**

添加后，事件侦听器将一直保持有效，直到：

- 使用 removeEventListener() 显式删除它；
- 关联的 DOM 元素被移除。

    对于某些类型的事件，应该一直保留到用户离开页面为止。但是，有时我们希望事件侦听器执行特定的次数。

```javascript 
const hugeString = new Array(100000).join('x');

document.addEventListener('keyup', function() { // anonymous inline function - can't remove it

    doSomething(hugeString); // hugeString is now forever kept in the callback's scope

});
```


       在上面的示例中，用一个**匿名内联函数作为事件侦听器**，这意味着无法使用**removeEventListener() 将其删除**。同样，该文档也无法删除，因此**即使我们只需要触发它一次，它和它域中的内容就都删不掉了**。

**预防措施**：我们应该始终创建指向事件侦听器的引用并将其传递给 removeEventListener()，来注销不再需要的事件侦听器。

```javascript 
function listener() {

    doSomething(hugeString);
}

document.addEventListener('keyup', listener); // named function can be referenced here...

document.removeEventListener('keyup', listener); // ...and here
```


        如果事件侦听器仅执行一次，则 addEventListener() 可以使用第三个参数。**假设{once: true}作为第三个参数传递给**addEventListener()，则在处理一次事件后，将自动删除侦听器函数。

```javascript 
document.addEventListener('keyup', function listener() {

    doSomething(hugeString);

}, {once: true});
```


### **缓存**

    如果我们不删除未使用的对象且不控制对象大小，那么缓存就会失控。

```javascript 
let user_1 = { name: "Peter", id: 12345 };

let user_2 = { name: "Mark", id: 54321 };

const mapCache = new Map();

function cache(obj){

    if (!mapCache.has(obj)){

        const value = `${obj.name} has an id of ${obj.id}`;

        mapCache.set(obj, value);

        return [value, 'computed'];

    }

    return [mapCache.get(obj), 'cached'];

}

cache(user_1); 

cache(user_1); 

cache(user_2); 

console.log(mapCache); 

user_1 = null; 

console.log(mapCache); 
```


**可能的解决方案**：我们可以使用 WeakMap。它的数据结构中，

**键名是对象的弱引用，它仅接受对象作为键名，所以其对应的对象可能会被自动回收。**

当对象被回收后，WeakMap 自动移除对应的键值对。在以下示例中，在使 user\_1 对象为空后，下一次垃圾回收后关联的条目会自动从 WeakMap 中删除。

```javascript 
let user_1 = { name: "Peter", id: 12345 };

let user_2 = { name: "Mark", id: 54321 };

const weakMapCache = new WeakMap();

function cache(obj){

   if (!weakMapCache.has(obj)){

        const value = `${obj.name} has an id of ${obj.id}`;

        weakMapCache.set(obj, value);

        return [value, 'computed'];

    }

    return [weakMapCache.get(obj), 'cached'];

}

cache(user_1); 

cache(user_2);

console.log(weakMapCache); 

user_1 = null;

console.log(weakMapCache); 
```


### **分离的 DOM 元素（注意）**

**如果 DOM 节点具有来自 JavaScript 的直接引用，**

**则即使从 DOM 树中删除了该节点，也不会对其垃圾回收。**

        在以下示例中，我们创建了一个 div 元素并将其附加到 document.body。removeChild() 无法正常工作，并且由于仍然存在指向 div 的变量，所以堆快照将显示分离的 HTMLDivElement。

```javascript 
function createElement() {

    const div = document.createElement('div');

    div.id = 'detached';

    return div;

}

const detachedDiv = createElement();

document.body.appendChild(detachedDiv);

function deleteElement() {

    document.body.removeChild(document.getElementById('detached'));

}

deleteElement(); 
```


**怎么预防呢**？一种方案是将 **DOM 引用移入本地域**。在下面的示例中，在函数 appendElement() 完成之后，将删除指向 DOM 元素的变量。

```javascript 
function createElement() {  // same as above

    const div = document.createElement('div');

    div.id = 'detached';

    return div;

} 

function appendElement() {

    const detachedDiv = createElement();

    document.body.appendChild(detachedDiv);

}

appendElement();

function deleteElement() {

     document.body.removeChild(document.getElementById('detached'));

}

deleteElement(); 
```


## **4.1 WeakMap**

前面说过，及时清除引用非常重要。但是，你不可能记得那么多，有时候一疏忽就忘了，所以才有那么多内存泄漏。

最好能有一种方法，在新建引用的时候就声明，哪些引用必须手动清除，哪些引用可以忽略不计，当其他引用消失以后，垃圾回收机制就可以释放内存。这样就能大大减轻程序员的负担，你只要清除主要引用就可以了。

ES6 考虑到了这一点，推出了两种新的数据结构 **：WeakSet 和 WeakMap。它们对于值的引用都是不计入垃圾回收机制的，所以名字里面才会有一个"Weak"，表示这是弱引用。**

![  ](./image/0348b492a1594413abf17a923f4542d4_8BvSywSejv.jpeg "  ")

下面以 WeakMap 为例，看看它是怎么解决内存泄漏的。

```javascript 
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');

wm.get(element) // "some information"
```


           上面代码中，先新建一个 Weakmap 实例。然后，将一个

**DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对element的引用就是弱引用，不会被计入垃圾回收机制。**

         也就是说，DOM 节点对象的引用计数是1，而不是2。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。**Weakmap 保存的这个键值对，也会自动消失。**

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。

## **4.2  WeakMap 示例**

            WeakMap 的例子很难演示，因为无法观察它里面的引用会自动消失。此时，其他引用都解除了，已经没有引用指向 WeakMap 的键名了，导致无法证实那个键名是不是存在。

        我一直想不出办法，直到有一天贺师俊老师，如果引用所指向的值占用特别多的内存，就可以通过process.memoryUsage方法看出来。

根据这个思路，网友 vtxf 补充了下面的例子。

首先，打开 Node 命令行。

```javascript 
$ 

node --expose-gc

上面代码中，--expose-gc参数表示允许手动执行垃圾回收机制。

然后，执行下面的代码。

// 手动执行一次垃圾回收，保证获取的内存使用状态准确 > 

global.gc();

undefined

// 查看内存占用的初始状态，heapUsed 为 4M 左右 >

process.memoryUsage();

{ rss: 21106688,

heapTotal: 7376896,

heapUsed: 4153936,

external: 9059 }

> let wm = new WeakMap();

undefined

> let b = new Object();

undefined

> global.gc();

undefined

// 此时，heapUsed 仍然为 4M 左右 > process.memoryUsage();

{ rss: 20537344,

heapTotal: 9474048,

heapUsed: 3967272,

external: 8993 }

// 在 WeakMap 中添加一个键值对， 
// 键名为对象 b，键值为一个 5*1024*1024 的数组 
> wm.set(b, new Array(5*1024*1024));

WeakMap {}

// 手动执行一次垃圾回收 
> global.gc();

undefined

// 此时，heapUsed 为 45M 左右 
> process.memoryUsage();

{ rss: 62652416,

heapTotal: 51437568,

heapUsed: 45911664,

external: 8951 }

// 解除对象 b 的引用 
> b = null;

null

// 再次执行垃圾回收 > global.gc();

undefined

// 解除 b 的引用以后，heapUsed 变回 4M 左右 
// 说明 WeakMap 中的那个长度为 5*1024*1024 的数组被销毁了 
> process.memoryUsage();

{ rss: 20639744,

heapTotal: 8425472,

heapUsed: 3979792,

external: 8956 }
```


上面代码中，只要外部的引用消失，WeakMap 内部的引用，就会自动被垃圾回收清除。由此可见，有了它的帮助，解决内存泄漏就会简单很多。

# 总结：

## **面试题1：浏览器怎么进行垃圾回收？**

从三个点来回答什么是垃圾、如何捡垃圾、什么时候捡垃圾。

1. 什么是垃圾
   - 不再需要，即为垃圾
   - 全局变量随时可能用到，所以一定不是垃圾
2. 如何捡垃圾（遍历算法）
   - 标记空间中「可达」值。
     \- 从根节点（Root）出发，遍历所有的对象。
     \- 可以遍历到的对象，是可达的（reachable）。
     \- 没有被遍历到的对象，不可达的（unreachable）
   - 回收「不可达」的值所占据的内存。
   - 做内存整理。
3. 什么时候捡垃圾
   - 前端有其特殊性，垃圾回收的时候会造成页面卡顿。
   - 分代收集、增量收集、闲时收集。

## **面试题2：浏览器中不同类型变量的内存都是何时释放？**

Javascritp 中类型：值类型，引用类型。

- 引用类型
  - 在没有引用之后，通过 V8 自动回收。
- 值类型
  - 如果处于闭包的情况下，要等闭包没有引用才会被 V8 回收。
  - 非闭包的情况下，等待 V8 的新生代切换的时候回收。

## **面试题3：哪些情况会导致内存泄露？如何避免？**

内存泄露是指你「用不到」（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。

以 Vue 为例，通常有这些情况：

- 监听在 window/body 等事件没有解绑
- 绑在 EventBus 的事件没有解绑
- Vuex 的 \$store，watch 了之后没有 unwatch
- 使用第三方库创建，没有调用正确的销毁函数

解决办法：beforeDestroy 中及时销毁

- 绑定了 DOM/BOM 对象中的事件 addEventListener ，removeEventListener。
- 观察者模式 \$on，\$off处理。
- 如果组件中使用了定时器，应销毁处理。
- 如果在 mounted/created 钩子中使用了第三方库初始化，对应的销毁。
- 使用弱引用 weakMap、weakSet。

## **闭包会导致内存泄露吗？**

顺便说一个我在了解垃圾回收之前对闭包的误解。

闭包会导致内存泄露吗？正确的答案是不会。

内存泄露是指你「用不到」（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。

闭包里面的变量就是我们需要的变量，不能说是内存泄露。

这个误解是如何来的？因为 IE。IE 有 bug，IE 在我们使用完闭包之后，依然回收不了闭包里面引用的变量。这是 IE 的问题，不是闭包的问题。参考这篇文章

## **面试题4：weakMap weakSet 和 Map Set 有什么区别？**

在 ES6 中为我们新增了两个数据结构 WeakMap、WeakSet，就是为了解决内存泄漏的问题。

它的**键名所引用的对象都是弱引用，就是垃圾回收机制遍历的时候不考虑该引用** **。** 只

**要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存**。

也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

更全面的介绍可以看这里：第 4 题：介绍下 Set、Map、WeakSet 和 WeakMap 的区别

## **总结**

现在我们简单了解了浏览器的垃圾回收机制，还记得最初的 4 个问题吗？

1. 浏览器怎么进行垃圾回收？

答题思路：什么是垃圾、怎么收垃圾、什么时候收垃圾。

1. 浏览器中不同类型变量的内存都是何时释放？

答题思路：分为值类型、引用类型。

1. 哪些情况会导致内存泄露？如何避免？

答题思路：内存泄露是指你「用不到」（访问不到）的变量，依然占居着内存空间，不能被再次利用起来。

1. weakMap weakSet 和 Map Set 有什么区别？

答题思路：WeakMap、WeakSet弱引用，解决了内存泄露问题。

***
