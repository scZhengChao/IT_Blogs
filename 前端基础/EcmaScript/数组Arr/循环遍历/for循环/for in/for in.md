# for in

## 目录

- [for In](#for-In)

# for In

```javascript 
Array.prototype.method = function(){
　　console.log(this.length);
}
var myArray=[1,2,4,5,6,7]
myArray.name="数组"
for (var index in myArray) {
  console.log(myArray[index]);
}


```


- 1 \*\*.index索引**为**字符串型数字，不能直接进行几何运算\*\*
- 2.遍历顺序有可能不是**按照实际数组的内部顺序**
- 3.使用for in会遍历数组**所有的可枚举属性（**除`Symbol`**），包括原型**。例如上栗的原型方法method和name属性
- 4.for in遍历的是**数组的索引（即键名），而for of遍历的是数组元素值。**

\*\* 所以for in更适合遍历对象，不要使用for in遍历数组。\*\* ​

如果你只要**考虑对象本身的属性**，而不是它的原型，那么使用 `getOwnPropertyNames()` 或执行 `hasOwnProperty()`来确定某属性是否是对象本身的属性（也能使用`propertyIsEnumerable`）。

- 无论是 `for in` 还是 `for of` 语句都是迭代一些东西。他们之间的主要区别在于他们的迭代方式不同；
  - `for in` 语句 以 **任意顺序** 迭代 对象 的 **可枚举属性**；
  - `for of` 语句 遍历 **可迭代对象** 定义要迭代的数据；
- 简单来说，使用 `for in` 进行遍历的时候，它不仅会遍历自身的属性和方法，也会遍历原型上的属性和方法；
