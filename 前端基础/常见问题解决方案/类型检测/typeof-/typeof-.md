# typeof&#x20;

在一般情况下，判断一个变量或常量的类型会使用 `typeof` 运算符，那它返回值的类型有哪些呢？让我们来写个例子瞧瞧：

```typescript 
typeof '';                 // string
typeof 1;                  // number
typeof 9007199254740991n;  // bigint
typeof true;               // boolean
typeof Symbol();           // symbol
typeof {};                 // object
typeof [];                 // object
typeof null;               // object
// 声明一个变量
let u;
typeof u;                  // undefined

// 声明一个构造函数
function User(name, age) {
    this.name = name;
    this.age = age;
}
typeof User;               // function

// new 一个实例对象
const user1 = new User('rose', 20);
typeof user1               // object
```


它返回的类型值有 `number`，`bigint`，`string`，`boolean`，`object`，`function`，`undefined`，`symbol`，

对于 `array` 和 `null`，它们的 `typeof` 运算符返回的类型值也是 `object`。

> JavaScript有两种数据类型，一种是基本数据类型，一种是引用数据类型。     **基本数据类型有**：`number`，`bigint`，`string`，`boolean`，`undefined`，`null`，`symbol`，**引用数据类型有**：`object`，`array`，`function`。

> 至于 `null` 是\*\*基本数据类型，但被 ****`typeof`**** 归为了 ****`object`****，这是 JavaScript 的历史遗留问题，\*\*在这里就不做深究了。
