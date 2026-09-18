# 简介

## 目录

- [Set](#Set)
  - [1.是一种 key和value相等的特殊对象](#1是一种-key和value相等的特殊对象)
  - [2.set 对象中的值是唯一的](#2set-对象中的值是唯一的)

# Set

**定义方法**：`new Set()`，通过Set构造函数生成Set数据结构，且接受一个数组作为参数

#### 1.是一种 key和value相等的特殊对象

```javascript 
let set = new Set([1,2,3,4])
console.log(set); // Set(4) { 1, 2, 3, 4 }

```


很明显，打印出的set对象`{1, 2, 3, 4}`很特殊，没有键，只有值，可以推测Set实例对象是一个**key和value相等的特殊对象**。我们可以把它理解成用于存储唯一值的集合。 我们再去浏览器上看看Set对象的真面目：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a0f8cc083a44d1f97a8aacd6acbe3d4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=719\&h=464\&s=25827\&e=png\&b=282828)

怎么样是不是非常像数组，所以Set也跟类数组很类似，所以很多小伙伴会觉得访问Set中的元素和数组类似，通过下标访问即可，可事实并非如此！

当你打印Set\[0]时，你会发现结果是undefined。说明Set中的元素是不能通过下标访问的，一定要记住！如何访问请继续往下读。

#### 2.set 对象中的值是唯一的

```javascript 
let set = new Set([1,2,2,3,4])
console.log(set); // Set(4) { 1, 2, 3, 4 }

```


只要是定义在Set对象中的值，一定不存在重复的现象。

所以通过这个特性，Set也经常用于数组的**去重操作**:

```javascript 
var arr = [1,2,1,1,'1']
var unique = (arr) => Array.from(new Set(arr))
console.log(unique(arr)); //[1,2,'1']

```


`Array.from()`方法可以将 Set 结构转为数组。箭头函数返回 `Array.from(new Set(arr))` 或者 `[...new Set(arr)]`都没问题。扩展运算符（`...`）内部使用`for...of`循环，所以也可以用于 Set 结构。
