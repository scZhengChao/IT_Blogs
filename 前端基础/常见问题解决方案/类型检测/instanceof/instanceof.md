# instanceof

## 目录

- [基本类型](#基本类型)
  - [实现原理](#实现原理)
  - [自定义 instanceof 返回的结果](#自定义-instanceof-返回的结果)

那怎么去判断变量的类型是不是数组呢？以及怎么去判断一个对象是否是另一个对象或函数的实例呢？那就要用到本篇文章的主角——`instanceof`，那怎么去使用它呢？请看如下例子：

```typescript 
[] instanceof Array;      // true
user1 instanceof User;    // true

[] instanceof Object;     // true
user1 instanceof Object;  // true
```


**左边操作数是需要判断的对象**，**右边操作数**是我们希望**该对象的实际构造函数**。***Object 构造函数是所有对象的实例***，如果右边是 Object，那么左边无论是什么对象，instanceof 的返回值都是 true，但这样就失去了 instanceof 的意义了。对于它的用法，我们需要注意两点：

1. `instanceof` 的返回值只有两个— `true` 或 `false`
2. 一般情况下，`instanceof` 只能用于引用数据类型的判断。

对于第2点，我们可以通过代码来验证一下：

# 基本类型

```typescript 
'' instanceof String;                // false
1 instanceof Number;                 // false
9007199254740991n instanceof BigInt  // false
true instanceof Boolean;             // false
Symbol() instanceof Symbol;          // false
undefined instanceof Object;         // false
null instanceof Object;              // false
```


可以看到 `instanceof` 的返回值永远是 `false`。不过人家 JavaScript 官方规定了，`instanceof` 左边必须是对象，如果硬要左边是非对象类型的值，那就只好返回 `false` 咯\~

至于为什么只能用于引用数据类型的判断，这就要清楚地知道 `instanceof` 内部的实现原理了。

## 实现原理

其实 `instanceof` 是用于**检测构造函数的 ****`prototype`**** 属性是**否出现在某个**实例对象的原型链上**。因此，它只能正确判断引用数据类型，而不能判断基本数据类型。

那到底是什么意思呢？让我们来逐一分析一下：

```typescript 
[] instanceof Array; 等同于 [].__proto__ === Array.prototype。
user1 instanceof Object 等同于 user1.__proto__ === User.prototype
```


> 这里也印证了之前的总结；只有`funtion`和  `class `他既有 `prototype `也有 `__proto__`

`instanceof `就是做了这样类似的判断，为什么说是类似？因为 `instanceof `判断的**是对象的原型链**，如果对象的**第一层原型**不等于构造函数的 `prototype`属性，那么再找**对象原型的原型**，**一直往下一层的原型找，直到原型链的终点 ****`Object.prototype.__proto__`****，它的值为 null**，最终才返回 false，否则如果在对象的原型链上任何一层原型等于构造函数的 prototype属性，就返回 true。

有细心的朋友可能已经发现一个问题，如果 `instancof` 是按照上述规则来判断的，那么基本数据类型是可以进行判断的，比如说 `''.__proto__ === String.prototype` 返回值是 `true`。

是的，单单按照上述的规则确实是可以用来判断的，但 **`instanceof`**\*\* 内部首先对左边操作数进行判断，如果它是基本数据类型或者 ****`null`****，直接返回 ****`false`****。\*\*

```typescript 
function myInstanceof(instance, constructorFn) {
  const typeIns = typeof instance;
  // 如果实例是基本数据类型或者 null，直接返回 false
  if (
    typeIns !== null &&
    typeIns !== "object" &&
    typeIns !== "function"
  ) {
    return false;
  }
  // 获取对象的原型
  let proto = Object.getPrototypeOf(instance)
  // 获取构造函数的 prototype 对象
  const fnPrototype = constructorFn.prototype; 
 
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (proto) {
    if (proto === fnPrototype) return true;
    // 如果没有找到，就继续从其原型上找
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

myInstanceof('', String);   // false
myInstanceof([], Array);    // true
myInstanceof(user1, User);  // true
```


总的来说，原理代码的实现可分为3步：

1. 使用 `Object.getPrototypeOf` 方法获取对象的原型
2. 获取构造函数的 `prototype` 对象
3. 循环判断构造函数的 `prototype` 对象是否等于对象的原型

## 自定义 instanceof 返回的结果

对象中有个叫 `Symbol.hasInstance` 的属性，它是一个方法，当其他对象使用 `instanceof` 判断是否为该对象的实例时，就会调用该实例的 `Symbol.hasInstance` 方法。因此我们可**以自定义`Symbol.hasInstance`方法的内部逻辑，从而改变****`instanceof`**** 返回的结果**：

```typescript 
class myNumber {
    static [Symbol.hasInstance](x) {
        console.log(x); // 123
        return typeof x === "number";
    }
}
console.log(123 instanceof myNumber);  // true
```


可以看到我们实现了自定义 `instanceof` 的行为，控制了它的返回结果。
