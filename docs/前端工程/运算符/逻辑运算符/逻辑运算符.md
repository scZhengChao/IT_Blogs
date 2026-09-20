# 逻辑运算符

## 目录

- [||](#)
- [,逗号运算符](#逗号运算符)
  - [场景 1：简化多语句表达式](#场景-1简化多语句表达式)
  - [场景 2：循环中的多变量更新](#场景-2循环中的多变量更新)
  - [场景 3：简化条件语句](#场景-3简化条件语句)
  - [场景 4：解构赋值时的默认值](#场景-4解构赋值时的默认值)
  - [场景 5：链式操作（不推荐）](#场景-5链式操作不推荐)
  - [注意事项](#注意事项)
- [可选链"?." ](#可选链-)
  - [简介：](#简介)
  - [使用注意：](#使用注意)
    - [变量必须已声明](#变量必须已声明)
    - [可选链不能用于赋值   ](#可选链不能用于赋值---)
    - [ 可选链访问数组元素的方法  ](#-可选链访问数组元素的方法--)
    - [可选链与函数调用 ?.()](#可选链与函数调用-)
    - [允许从一个可能不存在的对象上安全地读取属性](#允许从一个可能不存在的对象上安全地读取属性)
    - [错误用法](#错误用法)
- [?? 空位合并操作符](#-空位合并操作符)
- [逻辑空分配（?? =）](#逻辑空分配-)
- [逻辑或分配（|| =）](#逻辑或分配-)
- [逻辑与分配（&& =）](#逻辑与分配-)
- [优先级问题](#优先级问题)

# ||

```typescript 
let renderer;
const ensureRenderer =  () => renderer || (renderer = createRenderer(rendererOptions));
```


# ,**逗号运算符**

逗号运算符，它将**先计算左边的参数，再计算右边的参数值。然后返回最右边参数的值。**

因为逗号运算符在JavaScript在的优先级是最底的，记住这一点非常有用。

```javascript 
<script>
var a = 10, b = 20;
function CommaTest(){
  return a++, b++, 10;
}

var c = CommaTest();
 
alert(a); // 返回11
alert(b); // 返回21
alert(c); // 返回10
</script>


function ni(){
    let a,b,c = 10
    if(a,b,c==10) {
      alert(c)
    }
    return b,c //10
}
console.log(ni())
```


### **场景 1：简化多语句表达式**

在需要**单表达式**的地方（如箭头函数、`return`语句），用逗号运算符合并多个操作：

```javascript 
// 箭头函数返回最后一个表达式的结果
const fn = (x) => (console.log(x), x * 2);
console.log(fn(3)); // 先打印3，再返回6

// 替代临时变量
function getValue(obj) {
  return (obj.value = 42, obj.value); // 赋值并返回
}
```


### **场景 2：循环中的多变量更新**

在 `for`循环中同时更新多个变量：

```javascript 
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j); // 输出：0 10, 1 9, 2 8...
}
```


### **场景 3：简化条件语句**

在 `if`或 `while`中执行多个操作：

```javascript 
let x = 0;
if (x++, x > 0) { // x先自增，再判断
  console.log(x); // 1
}
```


### **场景 4：解构赋值时的默认值**

结合解构赋值和逗号运算符设置默认值：

```javascript 
const [a, b] = ([1, 2], [3, 4]); // 逗号运算符返回最后一个数组
console.log(a, b); // 3, 4
```


### **场景 5：链式操作（不推荐）**

连续执行函数（可读性差，慎用）：

```javascript 
const arr = [];
(arr.push(1), arr.push(2), arr.push(3)); // 链式插入
console.log(arr); // [1, 2, 3]
```


## **注意事项**

1. **优先级最低**：**逗号运算符的优先级比赋值（****`=`****）还低，通常需要用括号包裹：**

```typescript 
let x = (1 + 1, 2 + 2); // x = 4
let y = 1 + 1, 2 + 2;   // 语法错误（相当于 let y = 2, 2;）
```


​​2. 可读性​​：过度使用会降低代码可读性，建议仅在简洁场景（如循环、箭头函数）中使用。

# 可选链"?."&#x20;

## 简介：

- （更加优雅，摈弃 && ）访问嵌套对象属性的防错误方法」 。
- 即使中间的属性不存在，也不会出现错误。
- 如果可选链 ?. 前面部分是 undefined 或者 null，它会停止运算并返回 undefined

```javascript 
     let a = {}
    console.log(a.b?.c)
```


可以理解为三元表达式的语法糖

```javascript 
 要读取message.body.user.firstName，安全的写法是写成下面这样。
// 错误的写法
const  firstName = message.body.user.firstName;

// 正确的写法
const firstName = (message
  && message.body
  && message.body.user
  && message.body.user.firstName) || 'default';
```


这样的层层判断非常麻烦，因此 [ES2020](https://github.com/tc39/proposal-optional-chaining "ES2020")引入了“链判断运算符”（optional chaining operator）?.，简化上面的写法。&#x20;

```javascript 
 const firstName = message?.body?.user?.firstName || 'default';
 const fooValue = myForm.querySelector('input[name=foo]')?.value 
```


上面代码使用了?.运算符，直接在链式调用的时候判断，

左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。

## 使用注意：

不能过度使用可选链： 我们应该只将 ?. 使用在一些属性或方法可以不存在的地方，以上面示例代码为例：

### 变量必须已声明

可选链 ?. 之前的变量必须已声明： 在可选链 ?. 之前的变量必须使用 let/const/var 声明，否则会报错

### 可选链不能用于赋值  &#x20;

```javascript 
let object = {}; 
object?.property = 1;
```


### &#x20;可选链访问数组元素的方法 &#x20;

```javascript 
  let arrayItem = arr?.[42];
```


### 可选链与函数调用 ?.()

- ?.() 用于调用一个可能不存在的函数，比如       &#x20;

```javascript 
 let user1 = {
    admin() {
      alert("I am admin");
    }
}
let user2 = {};
user1.admin?.(); // I am admin
user2.admin?.();

```


### 允许从一个可能不存在的对象上安全地读取属性

```javascript 
let user1 = {
  firstName: "John"
};
let user2 = null; // 假设，我们不能授权此用户
let key = "firstName";
alert( user1?.[key] ); // John
alert( user2?.[key] ); // undefined
 alert( user1?.[key]?.something?.not?.existing); // undefined
```


### 错误用法

```javascript 
(a?.b).c
// 等价于
(a == null ? undefined : a.b).c

//上面代码中，?.对圆括号外部没有影响，不管a对象是否存在， 圆括号后面的.c总是会执行。 
//一般来说，使用?.运算符的场合，不应该使用圆括号。


以下写法是禁止的，会报错。

 // 构造函数 
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

 // 链判断运算符的左侧是 super 
super?.()
super?.foo

 // 链运算符用于赋值运算符左侧
 a?.b = c

//右侧不得为十进制数值 
为了保证兼容以前的代码， 允许foo?.3:0被解析成foo ? .3 : 0，
 因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符 ，而会按照三元运算符进行处理 
也就是说，那个小数点会归属于后面的十进制数字，形成一个小数。
```


# **?? 空位合并操作符**

假设变量不存在，希望给系统一个默认值，一般会使用||运算符。但是在javascript中空字符串，0，false都会执行||运算符，ECMAScript2020**引入合并空运算符解决该问题，只允许在值为null或undefined时使用默认值。**

```javascript 
 const name = '';

console.log(name || 'yd'); // yd;
console.log(name ?? 'yd'); // '';

```


一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符**左侧的值为null或undefined时，才会返回右侧的值**。&#x20;

```javascript 
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;

let title = data?.children?.[0]?.title ?? 'codercao';

```


# 逻辑空分配（?? =）

```typescript 
expr1 ??= expr2

```


逻辑空值运算符**仅在 nullish 值（****`null`**** 或者 ****`undefined`****）时才将值分配给 expr1**，**表达方式：x ??= y**

空的合并运算符（??）从左到右操作，如果 x 不为 **nullish 值**则中表达式不执行。因此，如果 x 不为`null` 或者 `undefined`，则永远不会对表达式`y`进行求值。如果`y`是一个函数，它将根本不会被调用。因此，此逻辑赋值运算符等效于:  x ?? (x = y);

# 逻辑或分配（|| =）

此逻辑赋值运算符仅在**左侧表达式为 falsy 值（虚值） 时才赋值**。Falsy 值（虚值）与 null 有所不同，因为 falsy 值（虚值）可以是任何一种值：undefined，null，空字符串 (双引号 ""、单引号’’、反引号 \`\`)，NaN，0。IE 浏览器中的 document.all，也算是一个。

```typescript 
//语法
x ||= y
//等同于
x || (x = y)

```


# 逻辑与分配（&& =）

此逻辑赋值运算符仅在**左侧为真时才赋值**。因此：

```typescript 
x &&= y
//等同于
x && (x = y)

```


# 优先级问题

它与&&和||的优先级孰高孰低。现在的规则是，如果多个逻辑运算符一起使用，**必须用括号表明优先级**，否则会报错。

```javascript 
 // 报错
lhs && middle ?? rhs
lhs ?? middle && rhs
lhs || middle ?? rhs
lhs ?? middle || rhs


(lhs && middle) ?? rhs;
lhs && (middle ?? rhs);

(lhs ?? middle) && rhs;
lhs ?? (middle && rhs);

(lhs || middle) ?? rhs;
lhs || (middle ?? rhs);

(lhs ?? middle) || rhs;
lhs ?? (middle || rhs);
```
