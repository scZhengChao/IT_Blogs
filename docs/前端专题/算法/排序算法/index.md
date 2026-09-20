# 排序算法

## 目录

- [选择排序](#选择排序)
- [插入排序](#插入排序)
- [归并排序](#归并排序)

排序是对一系列数据按照一定的规则进行排列的过程，按照排序规则的不同，排序算法可以分为：冒泡排序、选择排序、插入排序、快速排序以及归并排序。

# **选择排序**

\*\*\*`选择排序`\***是一种简单的排序方法，它的基本思想是：从待排序序列中，**选择一个最小的数并将其与序列中的第一个元素交换位置**，然后在剩余的**元素中选择一个最小的元素，和第二个元素交换位置，\*\*依次类推。具体实现可以参考如下代码：

```typescript 
function selectionSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      var temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
  return arr;
}

```


# 插入排序

**`插入排序`**是一种简单的排序方式，它的基本思想是：对于**待排序的元素，在已经排好序的部分中进行插**入。具体实现可以参考如下代码：

**这个也是把大的向后移**

```typescript 
function insertionSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var temp = arr[i];
    var j = i - 1;
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = temp;
  }
  return arr;
}

```


# 归并排序

**`归并排序`**是一种采用**分治策略**的排序算法，它的基本思想是：**将待排序的序列划分成若干个子序列**，对**每个子序列进行排序**，然**后合并成一个有序的序列**。具体实现可以参考如下代码：

```typescript 
function merge(left, right) {
  var result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  while (left.length) {
    result.push(left.shift());
  }
  while (right.length) {
    result.push(right.shift());
  }
  return result;
}

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var mid = Math.floor(arr.length / 2);
  var left = arr.slice(0, mid);
  var right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

```


[冒泡排序](./冒泡排序/index.md "冒泡排序")

[快速排序](./快速排序/index.md "快速排序")

[全排序（返回字符串参数的所有排列组合）](./全排序（返回字符串参数的所有排列组合）/index.md "全排序（返回字符串参数的所有排列组合）")
