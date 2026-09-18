# 搜索算法

## 目录

- [线性搜](#线性搜)
- [二分搜索](#二分搜索)

搜索算法是一种对数据进行查找的方法，可以分为线性搜索和二分搜索两种。

# 线性搜

\*\*`线性搜索`\*\*又称为顺序搜索，是一种简单直接的查找方法，可以在任意无序的数据中进行查找。具体实现可以参考如下代码：

```typescript 
function linearSearch(arr, key) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === key) {
      return i;
    }
  }
  return -1;
}

```


# 二分搜索

**`二分搜索`**又称为折半查找，是一种针对**已排序数据进**行快速查找的方法。它不断将查找区间折半，直到找到目标元素或者查找区间为空。具体实现可以参考如下代码：

```typescript 
function binarySearch(arr, key) {
  var left = 0;
  var right = arr.length - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    if (arr[mid] === key) {
      return mid;
    } else if (arr[mid] < key) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

```
