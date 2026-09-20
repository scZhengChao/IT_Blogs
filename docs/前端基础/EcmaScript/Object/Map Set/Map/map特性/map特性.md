# map特性

## 目录

- [描述](#描述)
  - [键的相等](#键的相等)
- [核心特性](#核心特性)
- [特殊情况处理](#特殊情况处理)
- [相关迭代方法](#相关迭代方法)

## [描述](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#描述 "描述")

`Map` 对象是键值对的集合。`Map` 中的一个键**只能出现一次**；它在 `Map` 的集合中是独一无二的。`Map` 对象按键值对迭代——一个 [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of "for...of") 循环在每次迭代后会返回一个形式为 `[key, value]` 的数组。迭代按\_**插入顺序**\_进行，即键值对按 [set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set "set()") 方法**首次**插入到集合中的顺序（也就是说，当调用 `set()` 时，map 中**没有具有相同值的键）进行迭代。**

规范要求 map 实现“**平均访问时间与集合中的元素数量呈次线性关系**”。因此，它可以在内部表示为哈希表（使用 O(1) 查找）、搜索树（使用 O(log(N)) 查找）或任何其他数据结构，只要复杂度小于 O(N)。

### [键的相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#键的相等 "键的相等")

键的比较基于[**零值相等**](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#零值相等 "零值相等")算法。（它曾经使用[同值相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#同值相等 "同值相等")，将 `0` 和 `-0` 视为不同。检查[浏览器兼容性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map#browser_compatibility "浏览器兼容性")。）这意味着 [NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN "NaN") 是与 `NaN` 相等的（虽然 `NaN !== NaN`），剩下所有其他的值是根据 `===` 运算符的结果判断是否相等。

> **`Map`** 对象**保存键值对**，并且能够**记住键的原始插入顺序**。**任何值**（对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive "原始值")）都可以作为键或值。

Map 虽然是对象模式；**但是；他是有序的；**

## 核心特性

1. **插入顺序保留**：
   - Map 会严格按照键值对被添加的顺序来记录和迭代
   - **第一个添加的键值对在迭代时会第一个出现**
   - 最后添加的键值对在迭代时最后出现
2. **与 Object 的区别**：
   - 普通对象的属性顺序是不确定的（虽然现代引擎通常按创建顺序，但这不是规范要求的）
   - Map 的顺序行为**是由 ECMAScript 规范明确定义的**

## 特殊情况处理

1. **重复设置同一个键**：
   - **不会改变该键在顺序中的原始位置**
   - 只会更新对应的值

```javascript 
const map = new Map();
map.set('x', 10);
map.set('y', 20);
map.set('x', 30); // 更新值，但位置不变

console.log([...map]); // [ ['x', 30], ['y', 20] ]
```


**删除后重新添加**：

- **删除键会将其从顺序中移除**
- **重新添加会将其放在最后**

```javascript 
const map = new Map();
map.set('first', 1);
map.set('second', 2);
map.delete('first');
map.set('first', 3);

console.log([...map]); // [ ['second', 2], ['first', 3] ]
```


## 相关迭代方法

所有 Map 的迭代方法都**遵循插入顺序：**

- `map.keys()`- 按顺序返回键
- `map.values()`- 按顺序返回值
- `map.entries()`- 按顺序返回键值对
- `map.forEach()`- 按顺序执行回调
- `for...of`循环 - **按顺序迭代**

[LRU缓存函数](LRU缓存函数.md "LRU缓存函数")
