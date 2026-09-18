# 遍历

## 目录

- [for of](#for-of)
- [iterator](#iterator)
- [foreach](#foreach)
  - [基本语法](#基本语法)
  - [使用 thisArg](#使用-thisArg)
  - [重要特性](#重要特性)
  - [与 for...of 循环对比](#与-forof-循环对比)

# for of

遍历 map 和 set（set）是附带的 for of keys（） ，values（），entries（）

```javascript 
 for(var [k,v] of mymap){
     console.log(k,v)
}
for(var i of mymap.keys()){
     console.log(i)
}
for(var i of mymap.values()){
    console.log(i)
}
for(var i of mymap.entries()){
    console.log(i)
}
```


> 注意：返回的不是数组；

- **Map Iterator 对象**，这是一个特殊的迭代器对象，而不是数组或其他常规集合类型。

1. **基本特性**：
   - 返回的是**迭代器 (Iterator)** 对象
   - 包含 Map 中所有值的按插入顺序排列的迭代器
   - 不是数组，但可以转换为数组
2. **实际示例**：

```javascript 
const myMap = new Map();
myMap.set('a', 1);
myMap.set('b', 2);

const valuesIterator = myMap.values();
```


1. **如何查看内容**：

- 方法1：使用`next()`逐个获取

```javascript 
console.log(valuesIterator.next().value); // 1
console.log(valuesIterator.next().value); // 2
console.log(valuesIterator.next().value); // undefined (迭代结束)
```


- 方法2：转换为数组

```typescript 
const valuesArray = Array.from(valuesIterator);
// 或
const valuesArray = [...myMap.values()];
console.log(valuesArray); // [1, 2]

```


1. **重要特性**：
   - **一次性**：迭代器通常只能遍历一次，遍历完后需要重新获取
   - **实时性**：反映 Map 的当前状态，如果 Map 改变，迭代器会反映这些变化
   - **不是数组**：没有数组方法（如`map`,`filter`等），需要先转换

# iterator

`keys/values/entries`

```typescript 
var obj = new Map()
obj.set(1,'test1')
obj.set(2,'test2')
obj.set(3,'test3')
obj.set(4,'test4')
let data2 = obj.values()

console.log(data2.next())
console.log(data2.next())
console.log(data2.next())
console.log(data2.next())
console.log(data2.next())

输出：
{value: "test1", done: false}
{value: "test2", done: false}
{value: "test3", done: false}
{value: "test4", done: false}
{value: undefined, done: true}

```


# foreach

它与数组的`forEach`类似，但专门为 Map 设计。

## 基本语法

```javascript 
myMap.forEach(callback(currentValue, key, map), thisArg)



```


参数说明：

- `callback`- 为每个元素执行的函数，接受三个参数：
  - `currentValue`- 当前元素的值
  - `key`- 当前元素的键
  - `map`- 正在遍历的 Map 对象
- `thisArg`(可选) - 执行回调时用作`this`的值

## 使用 thisArg

```javascript 
const logger = {
  log: function(value, key) {
    console.log(`[${this.prefix}] ${key}=${value}`);
  },
  prefix: 'DEBUG'
};

myMap.forEach(logger.log, logger);
// 输出示例：
// [DEBUG] name=Alice
// [DEBUG] age=25
// [DEBUG] job=Developer

```


## 重要特性

1. **遍历顺序**：按照键值对插入 Map 的顺序进行遍历
2. **性能**：比先转换为数组再遍历效率更高
3. **不可中断**：不像`for...of`可以使用`break`中断
4. **不返回新数组**：与数组的`map()`方法不同

## 与 for...of 循环对比

主要区别：

- `forEach`更简洁，但不能使用`break`或`continue`
- `for...of`更灵活，可以中断循环
