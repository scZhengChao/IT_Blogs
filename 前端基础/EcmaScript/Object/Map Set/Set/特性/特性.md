# 特性

## 目录

- [描述](#描述)
  - [值的相等](#值的相等)

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#描述 "描述")

`Set` 对象是值的合集（collection）。集合（set）中的元素**只会出现一次**，即集合中的**元素是唯一的**。你可以按照\*\*插入顺序迭代集合中的元素。\*\***插入顺序** 对应于 [add()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/add "add()") 方法成功将每一个元素插入到集合中（即，调用 `add()` 方法时集合中不存在相同的元素）的顺序。

规范要求集合的实现是“对合集中的元素的平均访问时间与集合中元素的数量呈次线性关系”。因此，它可以在内部表示为哈希表（查找的时间复杂度为 O(1)）、搜索树（查找的时间复杂度为 O(log(N))）或任何其他的时间复杂度低于 O(N) 的数据结构。

### [值的相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#值的相等 "值的相等")

**值的相等是基于**[**零值相等**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#零值相等 "零值相等")**算法的**。（曾使用会将 `0` 和 `-0` 视为不同值的[同值算法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#使用_object.is_进行同值相等比较 "同值算法")。参见[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set#浏览器兼容性 "浏览器兼容性")。）这意味着 [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN "NaN") 和 `NaN`会被视为是相同的值（即使 `NaN !== NaN`），而所有其他的值则基于 `===` 运算符的语义进行相等比较。
