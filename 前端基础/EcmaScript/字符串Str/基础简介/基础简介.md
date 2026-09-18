# 基础简介

## 目录

- [String和 new String](#String和-new-String)

# String和 new String

在js中我们知道有`String`、`Boolean`、`Number`三个包装类，这三个包装类的作用是为了能够创建这三个基本数据类型对象，以及使用它们的属性和方法。

看到这样一个面试题：

```javascript 
var str = 'hello world'
var str1 = String('hello world')
var str2 = new String('hello world')
console.log(str1 === str)
console.log(str2 === str)
```


输出结果是什么？

由上述题目，我们可以看到，同样是创建 'hello world' 字符串，却有三种不同的形式。但是得到的结果是否都相同呢？显然不是的！

我们来逐个分析：

`var str = 'hello world'　　`定义了一个 str 变量，同时给变量 str 赋值 'hello world' 字符串，此时 str 的值为字符串 'hello world'，类型为基本类型。

`var str1 = String('hello world')`　　这是字符串声明的形式创建了字符串，此时 str1 的值也为字符串 'hello world'，类型为基本类型。

**但是，不同的来了。**

`var str2 = new String('hello world')　　`此时的String为一个构造函数，而 new 操作符创建了一个字符串对象（有关new操作符的相关原理可以参考我的另外一篇博文[js中new操作符原理解析](https://www.cnblogs.com/bryanfu/p/15121890.html "js中new操作符原理解析")），此时的 str2 为字符串对象，类型为引用类型。

经过上述分析，我们能够得到题目的答案：&#x20;

```javascript 
console.log(str1 === str)　　//　ture（str和str1同为字符串，且值相同）

console.log(str2 === str)　　//　false（str2为字符串对象，对象和基本类型值不相等）

console.log(str2 == str)    // true
```
