# Map Set

## 目录

- [obj相对于map的劣势](#obj相对于map的劣势)
  - [不必要的继承](#不必要的继承)
  - [size](#size)
  - [clear](#clear)
  - [检查属性是否存在](#检查属性是否存在)
  - [性能差异
    ](#性能差异)

# obj相对于map的劣势

## 不必要的继承

在ES6之前，获得 hash map 的唯一方法是创建一个空对象：

```typescript 
const hashMap = {}
```


然而，在创建时，这个对象不再是空的。尽管 `hashMap` 是用一个空的对象字面量创建的，但它自动继承了 `Object.prototype`。这就是为什么我们可以在 `hashMap` 上调用`hasOwnProperty`、`toString`、`constructor` 等方法，尽管我们从未在该对象上明确定义这些方法。

&#x20;      由于原型继承，我们现在有两种类型的属性被混淆了：存在于对象本身的属性，即它自己的属性，以及存在于原型链的属性，即继承的属性。

因此，我们需要一个额外的检查（例如`hasOwnProperty`）来确保一个给定的属性确实是用户提供的，而不是从原型继承的。

&#x20;       除此之外，由于属性解析机制在 JavaScrip t中的工作方式，在运行时对 `Object.prototype` 的任何改变都会在所有对象中引起连锁反应。这就**为原型污染攻击打开了大门**，这对大型的JavaScript 应用程序来说是一个严重的安全问题。

不过，我们可以通过使用 `Object.create(null)` 来解决这个问题，它可以生成一个不继承`Object.prototype`的对象。

## size

`Object` 并没有提供方便的API来获取 `size`，即属性的数量。而且，对于什么是一个对象的 size ，还有一些细微的差别:

- 如果只关心字符串、可枚举的键，那么可以用 `Object.keys()` 将键转换为数组，并获得其length
- 如果只想要不可枚举的字符串键，那么必须得使用 `Object.getOwnPropertyNames` 来获得一个键的列表并获得其 length
- 如果只对 symbol 键感兴趣，可以使用 `getOwnPropertySymbols` 来显示 symbol 键。或者可以使用 `Reflect.ownKeys` 来一次获得字符串键和 symbol 键，不管它是否是可枚举的。

上述所有选项的运行时复杂度为**O(n)**，因为我们必须先构造一个键的数组，然后才能得到其长度。

## clear

没有简单的方法来删除一个对象的所有属性，我们必须用 `delete` 操作符一个一个地删除每个属性，这在历史上是众所周知的慢。

## 检查属性是否存在

最后，我们不能依靠点/括号符号来检查一个属性的存在，因为值本身可能被设置为 `undefined`。相反，得使用 **`Object.prototype.hasOwnProperty`**\*\* 或 ****`Object.hasOwn`****。\*\*

性能差异

&#x20;       在 JavaScript 社区中，似乎有一个共同的信念，即在大多数情况下，Map 要比 Object 快。有些人声称通过从 Object 切换到 Map 可以看到明显的
我在 LeetCode 上也证实了这种想法，对于数据量大的 Object 会超时，但 Map 上则不会。
然而，说\*\* "Map 比 Object 快" 可能是算一种归纳\*\*性的，这两者一定有一些细微的差别，我们可以通过一些例子，把它找出来。

[Map](./Map/index.md "Map")

[Set](./Set/index.md "Set")

[WeakSet  WeakMap ](<./WeakSet  WeakMap-/index.md> "WeakSet  WeakMap ")

[零值相等](./零值相等/index.md "零值相等")
