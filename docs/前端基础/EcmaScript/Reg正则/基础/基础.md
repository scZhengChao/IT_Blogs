# 基础

## 目录

- [创建](#创建)
- [判断是否正则](#判断是否正则)

# 创建

正则表达式 包括 **模式** 和可选的 **修饰符**。

有两种创建正则表达式对象的语法。

```javascript 
regexp = new RegExp("pattern", "flags");

regexp = /pattern/; // 没有修饰符
regexp = /pattern/gmi; // 带有修饰符 g、m 和 i（后面会讲到）


```


斜线 `/.../` 告诉 JavaScript 我们正在创建一个正则表达式。它的作用与字符串引号的作用相同。在这两种情况下，`regexp` 都会成为内建类 `RegExp` 的一个实例。

这两种语法之间的主要区别在于，**使用斜线 ****`/.../`**** 的模式不允许插入表达式（如带有 ****`${...}`**** 的字符串模板）**。它是完全静态的。

在我们写代码时就知道正则表达式时则会使用斜线的方式 —— 这是最常见的情况。当我们需要从动态生成的字符串 \*\*“动态”创建正则表达式时，更经常使用****`new RegExp`****。例如：\*\*

```javascript 
let tag = prompt("What tag do you want to find?", "h2");

let regexp = new RegExp(`<${tag}>`); // 如果在上方输入到 prompt 中的答案是 "h2"，则与 /<h2>/ 相同


```


每个字面的正则表达式都是一个单独的实例，即使它们的内容相同。

```typescript 
var a = /123/;
var b = /123/;
a == b;
a === b;

// false, false

```


# 判断是否正则

```javascript 
//判断是否正则 data . source 存在
function isRegExp(value){
    return Object.prototype.toString.call(value) === '[object RegExp]'
}
```
