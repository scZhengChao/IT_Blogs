# 快速排序

**`快速排序`**是一种高效的排序算法，它的基本思想是：**选择一个基准元素**，把**比它小的元素放在左边，比它大的元素放在右边**，**然后对左右两部分分别进行递归排序**。具体实现可以参考如下代码：

```typescript 
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}

```


[数组进行排序](./数组进行排序/index.md "数组进行排序")
