# 特性

## 目录

- [2.特性：](#2特性)

## 2.特性：

- **Symbol函数不能用new**，会报错。  由于Symbol是一个原始类型，不是对象，所以不能添加属性，它是**类似于字符串的数据类型**
- &#x20;都是不相等的。即使参数相同
- Symbol**不能与其他类型的值计算**，会报错
- Symbol **不能自动转换为字符串**，只能显式转换。

```javascript 
  let leo = Symbol('hello');
alert(leo);  //自动
// Uncaught TypeError: Cannot convert a Symbol value to a string

//显示
String(leo);    // "Symbol(hello)"
 leo.toString(); // "Symbol(hello)"
```


- Symbol **可以转换为布尔值，但不能转为数值**

```javascript 
    let a1 = Symbol();
     Boolean(a1);
    !a1;        // false 
    Number(a1); // TypeError
    a1 + 1 ;    // TypeError
```


- Symbol **属性不参与 for...in/of 循环。**

```javascript 
    let id = Symbol("id");
    let user = {
      name: "Leo",
      age: 30,
      [id]: 123
    };
    for (let key in user) console.log(key); // name, age (no symbols)

     // 使用 Symbol 任务直接访问 
    console.log( "Direct: " + user[id] );
```


特别适合作为**对象的私有属性**，当然想要获取这种类型的属性名可以**使用Object.getOwnPropertySymbols(obj)方法**。

```javascript 
 Object.getOwnPropertySymbols(obj)
 //所不同的是Object.keys他只能获取对象当中字符串属性名，而Object.getOwnPropertySymbols方法他获取到的全是Symbol类型的属性名。
```
