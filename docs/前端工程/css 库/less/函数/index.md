# 函数

## 目录

- [if](#if)
- [boolean](#boolean)
- [escape](#escape)
- [e](#e)
- [length](#length)
- [extract](#extract)
- [range](#range)
- [each](#each)
  - [key-value的遍历很好用](#key-value的遍历很好用)
- [Math Functions](#Math-Functions)
- [Type Functions](#Type-Functions)

> 这是一个比较大的概念了;\*\* Less 的所有内置函数。\*\*

[&#x20;
&#x20; Less 函数 | Less.js 中文文档 - Less 中文网
&#x20;Less 扩充了 CSS 语言，增加了诸如变量、混合（mixin）、运算、函数等功能。 Less 既可以运行在服务器端（Node.js 和 Rhino 平台）也可以运行在客户端（浏览器）。 https://less.bootcss.com/functions/#less-函数](https://less.bootcss.com/functions/#less-函数 "&#x20;
&#x20; Less 函数 | Less.js 中文文档 - Less 中文网
&#x20;Less 扩充了 CSS 语言，增加了诸如变量、混合（mixin）、运算、函数等功能。 Less 既可以运行在服务器端（Node.js 和 Rhino 平台）也可以运行在客户端（浏览器）。 https://less.bootcss.com/functions/#less-函数")

**太多了；用到在查；不花太多时间在这里；**

### if

```sass (sass)  
@some: foo;

div {
    margin: if((2 > 1), 0, 3px);
    color:  if((iscolor(@some)), @some, black);
}
```


### boolean

```sass (sass)  
@bg: black;
@bg-light: boolean(luma(@bg) > 50%);

div {
  background: @bg; 
  color: if(@bg-light, black, white);
}
```


### escape

将URL编码应用于输入字符串中的特殊字符。

```sass (sass)  
escape('a=1')

output:
a%3D1

```


### e

它期望字符串作为参数，并按原样返回其内容，但不带引号。它可以用于输出不是有效CSS语法的CSS值，或者使用Less无法识别的专有语法。

```sass (sass)  
@mscode: "ms:alwaysHasItsOwnSyntax.For.Stuff()" 
filter: e(@mscode);

filter: ms:alwaysHasItsOwnSyntax.For.Stuff();

```


### length

```sass (sass)  
@list: "banana", "tomato", "potato", "peach";
n: length(@list);

n: 4;

```


### extract

```sass (sass)  
@list: apple, pear, coconut, orange;
value: extract(@list, 3);


value: coconut;

```


### range

```sass (sass)  
value: range(4);
value: 1 2 3 4;


value: range(10px, 30px, 10);
value: 10px 20px 30px;

```


### each

```sass (sass)  
@selectors: blue, green, red;

each(@selectors, {
  .sel-@{value} {
    a: b;
  }
});


.sel-blue {
  a: b;
}
.sel-green {
  a: b;
}
.sel-red {
  a: b;
}

```


#### key-value的遍历很好用

```sass (sass)  
@set: {
  one: blue;
  two: green;
  three: red;
}
.set {
  each(@set, {
    @{key}-@{index}: @value;
  });
}

.set {
  one-1: blue;
  two-2: green;
  three-3: red;
}

```


```sass (sass)  
@statusColor:{
  orange:var(--color-orange4);
  green:var(--color-green1);
  red:var(--color-red1);
  gray:var(--color-black3);
}


each(@statusColor,{
  .@{key}{
      color:@value;
  }
})

```


# Math Functions

- ceil
- floor
- percentage
- round
- sqrt
- abs
- .....

还有其他很多；同Math的api方法

# Type Functions

![](./assets/image/image_NR0FBueahW.png)
