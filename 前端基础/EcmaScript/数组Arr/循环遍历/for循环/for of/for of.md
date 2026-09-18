# for of

- `for..of`适用`遍历数/数组对象/字符串/map/set`等拥有迭代器对象的集合.但是**不能遍历对象**,因为没有**迭代器对象**.与`forEach`()不同的是，它可以正确响应`break、continue和return语`句
- `for-of`循环不支持普通对象，但如果你想**迭代一个对象的属性**，你可以用`for-in`循环（这也是它的本职工作）或内建的`Object.keys()`方法：
- **遍历数组得到的是数组的值**

```javascript 
 //允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。

// array-example.js
const iterable = ['mini', 'mani', 'mo'];

for (const value of iterable) {
  console.log(value);
}
// Output:
// mini
// mani
// mo



// map-example.js
const iterable = new Map([['one', 1], ['two', 2]]);
 
for (const [key, value] of iterable) {
  console.log(`Key: ${key} and Value: ${value}`);
}
 
// Output:
// Key: one and Value: 1
// Key: two and Value: 2


// set-example.js
const iterable = new Set([1, 1, 2, 2, 1]);
 
for (const value of iterable) {
  console.log(value);
}
// Output:
// 1
// 2


// string-example.js
const iterable = 'javascript';
 
for (const value of iterable) {
  console.log(value);
}
 
// Output:
// "j"
// "a"
// "v"
// "a"
// "s"
// "c"
// "r"
// "i"
// "p"
// "t"



//for...of 循环仅适用于迭代。 而普通对象不可迭代
const obj = { fname: 'foo', lname: 'bar' };
 
for (const value of obj) { // TypeError: obj[Symbol.iterator] is not a function
    console.log(value);
}

```


- 当我们使用 `for of` 循环遍历数组的时候，有时候会使用到 数组的`index`，但是 `for of` 又**得不到** `index`，所以最后不得不去使用 `forEach`去遍历数组；
- **解决办法**：
  - 将循环的数组进行改造，使其拥有 索引和值的同时又能被`forof`循环；
  - 在 `Array` 构造函数上有一个数组的方法 `entries()`，该方法返回一个 **数组的迭代对象**，该 对象 包含 数组 的 索引和值，迭代对象中的 **key === 索引值** **value === 索引对应的元素**，此时就可以正常访问索引和值了；
  -

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a45df4e363354f668d251ac547ed7da3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

- 代码展示：
  - 基本展示：

```javascript 
const arr = [1, 2, 3];
for (const [index, value] of arr.entries()) {
    console.log(index, value)
}


```
