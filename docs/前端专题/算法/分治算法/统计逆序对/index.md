# 统计逆序对

## 目录

- [什么是逆序对](#什么是逆序对)
- [暴力算法](#暴力算法)
- [分治算法](#分治算法)
- [完整代码](#完整代码)
- [总结](#总结)

## 什么是逆序对

在数组排序中，逆序对是指数组中的两个元素 **，如果前一个元素大于后一个元素，则这两个元素构成一个逆序对**。例如，在数组`[1, 3, 2, 3, 1]` 中，`(3, 2)` 和 `(3, 1)` 都是逆序对。(***没有说相邻***)

在数组排序中，**逆序对的数量也是一个重要的指标，因为它可以帮助我们衡量排序算法的性能**。因此，在设计排序算法时，了解和优化逆序对的数量是一个非常重要的问题。

今天分享的内容就是用 JS 代码去统计一个数组的逆序对

## 暴力算法

一个很简单的统计方法就是暴力遍历，分别统计每个数字组成的”数字对“是否为逆序对。 &#x20;
给数组套两层循环就可以实现了，下面是代码实现：

```javascript 
/**
 *
 * @param {number[]} data
 */
const bruteForce = (data) => {
  let number = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (data[i] > data[j]) {
        number++;
      }
    }
  }
  console.log(number);
};
```


先从第一个元素开始，往后对比每个元素，如果符合逆序对的要求，`number` 就加一。统计完了第一个元素，就接着统计第二个元素，直到统计完所有的元素，算法就结束了。

很简单，来看看执行结果：

```javascript 
const data1 = [4,3,6,4,1];
bruteForce(data1); // 6

const data2 = [32, 23, 12, 3, 1, 5, 56, 8, 6, 56, 87];
bruteForce(data2); // 22
```


测试通过

## 分治算法

什么是分治算法？分治算法是一种**将问题分解成更小的子问题**，然后**递归地解决这些子问题的算法**。**分治算法的核心思想是将问题分解成多个更小的子问题，然后通过合并这些子问题的解来解决原始问题。**

回到这个问题，我们也可以用分治算法来解决。

解决的过程需要用到归并排序的思想来解决，将数组分成左右两个部分，*即先统计左右两个部分逆序对的数量，然后统计两个部分之间的逆序对。*

过程很清晰，重点在于，如何统计两个部分之间的逆序对？

还是**归并排序的思想**，对左右两个部分进行合并排序，合并排序的过程就能知道有多少的逆序对了。

> 统计两个部分**之间的逆序对是一个合并两个有序序列的过程** **，** 主要注意，在合并之前，两个部分就已经是有序序列了

```javascript 
// 将number定义成一个全局变量
let number = 0;

const _countNumberReverse = (data, left, right) => {
  if (left >= right) return 0;
  const mid = Math.floor((left + right) / 2);
  _countNumberReverse(data, left, mid);
  _countNumberReverse(data, mid + 1, right);
  merge(data, left, mid, right);
};

const merge = (data, left, mid, right) => {
    const temp = [];
    let i = left,
            j = mid + 1,
            index = 0;
    while (i <= mid && j <= right) {
        if (data[i] <= data[j]) {
            temp[index++] = data[i++];
        } else {
            // number定义在全局作用域
            number += mid - i + 1;
            temp[index++] = data[j++];
        }
    }
    while (i <= mid) temp[index++] = data[i++];
    while (j <= right) temp[index++] = data[j++];
    data.splice(left, temp.length, ...temp);
};
```


`_countNumberReverse` 是很简单的**分而治之的递归算法**，先统计左半部分，然后统计后半部分，最后用 `merge` 统计两个部分之间的逆序对

重点来看看 `merge` 函数，`merge` 函数的过程是合并排序的过程。因为左边部分经历了左边的左右子部分合并排序，所以左边部分就是有序的，同理右边部分也是有序的。所以合并排序没有问题，逻辑是对的。

在合并的过程，会对左右两部分的元素进行比较，小的先放进 `temp` 里面。一旦遇到了左边的元素大于右边元素的情况，就说明有逆序对了，那就可以对 `number` 进行修改了，是加 1 吗？加 1 正确吗？

不对的

举个例子，现在有部分元素，左边元素是 `lData`，右边元素是 `rData`

```javascript 
const lData = [1,3,6]
const rData = [2,2,5]
```


先比较 `lData[0]` 和 `rData[0]`, `rData[0]` 更小，所以放进 temp

然后继续比较`lData[1]` 和 `rData[0]`，`rData[0]` 更小，发现逆序对了。那么，你发现几对了呢？有两对！

因为`lData[1]` 大于`rData[0]`，那就说明 `lData[1]` 后面的元素全部都大于`rData[0]`，`lData[1]` 后面有一个元素，所以一共是两对逆序对

***

回到代码。在遇到左边元素大于右边元素的时候，对 `number` 加了 `mid - i + 1` ，`mid - i + 1`就是左边剩下元素的个数

好了，关键点讲完了，下面执行代码测试一下，并且同暴力算法的执行结果进行对比，检验代码的正确性：

```javascript 
const data = [32, 23, 12, 3, 1, 5, 56, 8, 6, 56, 87];
const countNumberReverse = (data) => {
  _countNumberReverse(data, 0, data.length - 1);
};

countNumberReverse(data);
// number定义在全局作用域
console.log(number); //22
```


没有问题，搞定✌️

## 完整代码

```javascript 
// 将number定义成一个全局变量
let number = 0;

const _countNumberReverse = (data, left, right) => {
  if (left >= right) return 0;
  const mid = Math.floor((left + right) / 2);
  _countNumberReverse(data, left, mid);
  _countNumberReverse(data, mid + 1, right);
  merge(data, left, mid, right);
};

const merge = (data, left, mid, right) => {
    const temp = [];
    let i = left,
            j = mid + 1,
            index = 0;
    while (i <= mid && j <= right) {
        if (data[i] <= data[j]) {
            temp[index++] = data[i++];
        } else {
            // number定义在全局作用域
            number += mid - i + 1;
            temp[index++] = data[j++];
        }
    }
    while (i <= mid) temp[index++] = data[i++];
    while (j <= right) temp[index++] = data[j++];
    data.splice(left, temp.length, ...temp);
};

// 测试
const data = [32, 23, 12, 3, 1, 5, 56, 8, 6, 56, 87];
const countNumberReverse = (data) => {
  _countNumberReverse(data, 0, data.length - 1);
};

countNumberReverse(data);
// number定义在全局作用域
console.log(number); //22
```


## 总结

今天分享的是如何**用分治算法的思想来统计数字序列中有多少个逆序对。**

首先介绍了什么是逆序对，然后介绍了两种常用的统计逆序对的方法：暴力算法和分治算法。在介绍分治算法时，还介绍了如何实现合并排序，以及如何统计两个部分之间的逆序对数量 **。合并排序是一种常见的排序算法，通过将数组中的元素两两合并排序，最终得到一个有序序列。** 而统计两个部分之间的逆序对数量，**则是通过合并两个有序序列的过程来实现的。**
