# 从数组聊起

其实 RxJS 和数组有解不开的因缘，为什么这么说呢？这就和 RxJS 的核心概念有关系，也和 FRP 编程思想有关系：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cef8b767f8cc4aa0b47f767b04ec131f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

ReactiveX 结合了观察者模式、迭代器模式与函数式编程的精华思想，其中迭代器模式和数组就有着不一般的关系，我们来看一个例子：

```javascript 
let arr = ['a', 'b', 'c'];
let iterator = arr[Symbol.iterator]()

iterator.next(); // {value: 'a', done: false }
iterator.next(); // {value: 'b', done: false }
iterator.next(); // {value: 'c', done: false }
iterator.next(); //{value: undefined, done: true }

```


首先迭代器模式大家很清楚了，针对可迭代对象部署了统一的接口，使得这些**对象能够按照统一的方式进行遍历**，而无需关心内部的实现。

同时数组还具有二维数组、可组合等特性：

```javascript 
let arr = ['a', ['b', 'c'], 'd'];

```


```javascript 
let arr2 = ['e', 'f', 'g'];

arr.concat(arr2); // ['a', ['b', 'c'], 'd', 'e', 'f', 'g']

```


除此之外，数组还可以很好的结合函数式编程使用：

```javascript 
arr.flat().map(item => item.toUpperCase()).reduce((total, item) => total += item)

```


上述操作将二维数组拍平，然后将每个字母转换为大写字母，接着进行聚合操作，拿到最后的结果：ABCD 。
对数组有一个体感之后，我们再去看 `RxJS` 会感觉熟悉很多，虽然 `RxJS` 最核心的概念：`Stream`，相比数组多了一个时间维度的概念，可以理解为**带上时间属性的 “数组”**，后续我们也将在讲解 RxJS 时拿数组进行举例对照说明讲解。
好的，我们正式开始 `RxJS` 的讲解。🌚
