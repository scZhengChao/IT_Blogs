# key/value

## 目录

- [in](#in)
- [hasOwnProperty](#hasOwnProperty)
- [hasOwn](#hasOwn)
- [获取key](#获取key)

# in

如果指定的属性位于对象或其原型链中，“in”运算符将返回true。

```javascript 
const Person = function (age) {
  this.age = age
}
Person.prototype.name = 'fatfish'

const p1 = new Person(24)
console.log('age' in p1) // true 
console.log('name' in p1) // true  注意这里
```


# **hasOwnProperty**

`hasOwnProperty` 方法会返回一个布尔值，表示对象**自身属性**中是否具有对应的值（原型链上的属性不会读取）。

`obj.hasOwnProperty`已经可以过滤掉原型链上的属性，但在某些情况下，它还是不安全。

```javascript 
Object.create(null).hasOwnProperty('name')
//  Uncaught TypeError: Object.create(...).hasOwnProperty is not a function
```


# **hasOwn**

**别急，我们可以使用**\*\*`Object.hasOwn`\*\***来避免这两个问题，这比“obj.hasOwnProperty”方法更加方便、安全。**

```javascript 
let object = { age: 24 }
Object.hasOwn(object, 'age') // true
let object2 = Object.create({ age: 24 })
Object.hasOwn(object2, 'age') // false  
let object3 = Object.create(null)
Object.hasOwn(object3, 'age') // false 
```


# 获取key

- 如果只关心字符串、可枚举的键，那么可以用 `Object.keys()` 将键转换为数组，并获得其length
- 如果只想要不可枚举的字符串键，那么必须得使用 `Object.getOwnPropertyNames` 来获得一个键的列表并获得其 length
- 如果只对 symbol 键感兴趣，可以使用 `getOwnPropertySymbols` 来显示 symbol 键
- 或者可以使用 Reflect.ownKeys 来一次获得字符串键和 symbol 键，不管它是否是可枚举的。
