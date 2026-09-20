# 版本号排序

## 目录

- [问题：](#问题)
- [解答：](#解答)

##### 问题：

给你一个数组，每个元素都是字符串类型的版本号，需要把版本号从小到大排序后返回。需要注意的是，“1.45”指的是第一代的第45版，所以“1.8”要比“1.45”小（这么说来13.11确实比13.8更大了）。

##### 解答：

这题的解题思路应该是有挺多的，我提供一个我使用的比较简单的方法，首先遍历给的数组，把每个元素拆分成一个数组，暂且称之为子数组，子数组的每个元素都是版本号的一位数，如图：

![](./assets/image/image_fXTOtEtQ3Z.png)

然后拿着父数组遍历。其实面试的时候只给了两个元素，但其实只需要把函数作为参数传给sort就可以对整个数组实现排序了，这里我给出一份完整的代码

```javascript 
function versionSort(arr) {
  // 自定义比较函数
  function compareVersions(a, b) {
    const partsA = a.split(".").map(Number);
    const partsB = b.split(".").map(Number);

    // 比较每个部分
    for (let i = 0; i < partsA.length; i++) {
      if (partsA[i] !== partsB[i]) {
        return partsA[i] - partsB[i];
      }
    }

    // 如果所有部分都相等，则认为版本号相等
    return 0;
  }

  // 使用自定义比较函数对数组进行排序
  return arr.sort(compareVersions);
}


```
