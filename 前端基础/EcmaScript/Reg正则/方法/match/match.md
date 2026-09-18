# match

## 目录

- [解释一](#解释一)
  - [非全局](#非全局)
  - [全局](#全局)
- [解释二](#解释二)
  - [matchAll 函数](#matchAll-函数)

# 解释一

`str.match(regexp)` 方法在字符串 `str` 中寻找 `regexp` 的所有匹配项。

match 这个方法主要用来**提取数据，它配合分组的（）一起使用**，可以很方便的提取数据。

如果没有匹配项，我们不会\*\*收到一个空数组，而是会收到 ****`null`****。\*\*忘了这一点可能会导致错误

```typescript 
let matches = "JavaScript".match(/HTML/); // = null

if (!matches.length) { // Error: Cannot read property 'length' of null
  alert("Error in the line above");
}

//如果我们希望结果始终是一个数组，我们可以这样写：
let matches = "JavaScript".match(/HTML/) || [];

if (!matches.length) {
  alert("No matches"); // 现在可以了
}

```


### 非全局

和非全局模式的exec一致

- **数组的第0个元素存储的是匹配字符串，**
- **第1个元素存放的是第一个引用型分组(子表达式)匹配的字符串，**
- **第2个元素存放的是第二个引用型分组(子表达式)匹配的字符串，依次类推。**

&#x20; 同时此数组还包括两个对象属性:&#x20;

- index属性声明的是匹配字符串的起始字符在要匹配的完整字符串中的位置，
- input属性声明的是对要匹配的完整字符串的引用

```javascript 
var str = '2022-04-22'
var reg = /^(\d{4})-(\d{2})-(\d{2})$/
console.log(str.match(reg));
//  ['2022-04-22', '2022', '04', '22', index: 0, input: '2022-04-22', groups: undefined]

```


### 全局

```typescript 
let str = "+7(903)-123-45-67";
let arr = str.match(/\d/g)；  // ['7', '9', '0', '3', '1', '2', '3', '4', '5', '6', '7']
arr.join('') // 79031234567
```


# 解释二

- 调用者：字符串
- **当正则表达式携带 ****`g`**** 标志时，**`match` 函数会以数组形式返回所有匹配的子串（并不会捕获括号中的内容），不会更改正则表达式变量的 `lastIndex`，像下面这样：

```javascript 
let myRe = /d(b+)(c*)d/g;
let str = 'cdbbcdbsbzdbd';

str.match(myRe);
// 执行结果 => ["dbbcd", "dbd"]
// 执行完后 myRe.lastIndex 为 0


```


- **当正则表达式 *****不***** 携带 ****`g`**** 标志时，**`match` 函数的返回形式与 `exec` 函数一致，并且不会改变正则表达式变量的 `lastIndex`，像下面这样：

```javascript 
let myRe = /d(b+)(c*)d/;
let str = 'cdbbcdbsbzdbd';

str.match(myRe);
// 执行结果 => ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"]
// 执行完后 myRe.lastIndex 为 0

```


### `matchAll` 函数

- 调用者：字符串
- `matchAll` 使用的正则表达式必须携带 `g` 标志，`matchAll` 函数会以迭代器（`iterator`）形式返回所有匹配的子串，每个子串都是与 `exec` 函数的返回格式一致，不会更改正则表达式变量的 `lastIndex`，像下面这样：

```javascript 
let myRe = /d(b+)(c*)d/g;
let str = 'cdbbcdbsbzdbd';

[...str.matchAll(myRe)];
// 执行结果 => 
// [
//     ["dbbcd", "bb", "c", index: 1, input: "cdbbcdbsbzdbd"],
//     ["dbd", "b", "", index: 10, input: "cdbbcdbsbzdbd"]
// ]
// 执行完后 myRe.lastIndex 为 0

```


[科学计数发](科学计数发.md "科学计数发")
