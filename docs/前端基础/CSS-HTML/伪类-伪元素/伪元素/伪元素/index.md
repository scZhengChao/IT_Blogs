# 伪元素

## 目录

- [first-letter](#first-letter)
- [first-line](#first-line)
- [selection](#selection)
- [before/after](#beforeafter)
  - [二、content属性](#二content属性)
    - [1、string 书名号](#1string-书名号)
    - [2、attr() 链接](#2attr-链接)
    - [3、url()/uri() 用于引用媒体文件](#3urluri-用于引用媒体文件)
    - [4、counter()调用计数器](#4counter调用计数器)
  - [三、使用](#三使用)
    - [做出各种图形效果](#做出各种图形效果)
    - [显示打印网页的URL](#显示打印网页的URL)
    - [图标](#图标)
    - [动画](#动画)
    - [禁用网页ctrl+f搜索](#禁用网页ctrlf搜索)

伪元素共有5个，分别是`::before`、`::after`、`::first-letter`、`::first-line`和`::selection`

# `first-letter`

`::first-letter`主要用于为文本的首字母添加特殊样式

> 注意：`::first-letter` 伪元素只适用于块级元素。

# `first-line`

`::first-line` 伪元素用于向文本的首行添加特殊样式。

> 注意：`::first-line` 伪元素只能应用于块级元素。

# `selection`

`::selection` 伪元素匹配用户选择的元素部分。也就是给我们鼠标滑动选中的部分设置样式，它可以设置以下属性

- `color`
- `background`
- `cursor`
- `outline`

# `before/after`

`::before`用于在元素内容之前插入一些内容，`::after`用于在元素内容之后插入一些内容，其他方面的都相同。写法就是只要在想要添加的元素选择器后面加上`::before`或`::after`即可，有些人会发现，写一个冒号和两个冒号都可以有相应的效果，那是因为在css3中，w3c为了区分伪类和伪元素，用双冒号取代了伪元素的单冒号表示法，所以我们以后在写伪元素的时候尽量使用双冒号。

这些**添加不会出现在DOM中**，**不会改变文档内容**，**不可复制，仅仅是在css渲染层加入**。所以不要用:before或:after展示有实际意义的内容，尽量使用它们**显示修饰性内容**，例如图标。

举例：网站有些联系电话，希望在它们前加一个icon☎，就可以使用:before伪元素.

## **二、content属性**

不同于其他伪元素，`::before`和`::after`在使用的时候必须提供`content`属性，可以为字符串和图片，也可以是空，但不能省略该属性，否则将不生效。

伪类元素的display是默认值inline，可以通过设置display:block来改变其显示。

content可取以下值。

### **1、string** 书名号

使用引号包一段字符串，将会向元素内容中添加字符串。如：a:after{content:""}

举例：

```css 
<!DOCTYPE html><meta charset="utf-8" /><style type="text/css">
p::before{
    content: "《";
    color: blue;
}
p::after{
    content: "》";
    color: blue;
}
</style>
<p>平凡的世界</p>

```


![](./image/110929133328022_OR4gmtIJRY.png)

### **2、attr()** 链接

**通过attr()调用当前元素的属性**，比如将图片alt提示文字或者链接的href地址显示出来。

```text 
<style type="text/css">
a::after{
    content: "(" attr(href) ")";
 }
 </style>
 <a href="http://www.cnblogs.com/starof">starof</a>

```


![](./image/110937215201245_kb2P05lQxy.png)

### **3、url()/uri()** 用于引用媒体文件

举例：“百度”前面给出一张图片，后面给出href属性。

```text 
<style>
a::before{
    content: url("https://www.baidu.com/img/baidu_jgylogo3.gif");}
a::after{
    content:"("attr(href)")";}
a{
    text-decoration: none;}</style>
---------------------------
<body><a href="http://www.baidu.com">百度</a></body>    
```


效果：

![](./image/041517505323703_nVVKN9yInR.png)

### **4、counter()** 调用计数器

调用计数器，可以不使用列表元素实现序号功能。

配合counter-increment和counter-reset属性使用：

```css 
h2:before { 
  counter-increment: chapter; 
  content: "Chapter " 
  counter(chapter) ". " 
 }
```


代码:

```html 
<style>
body{
    counter-reset: section;
}
h1{
    counter-reset: subsection;
}
h1:before{
    counter-increment:section;
    content:counter(section) "、";
}
h2:before{
    counter-increment:subsection;
    content: counter(section) "." counter(subsection) "、";
}
</style>
------------------------------------------------
<body>
<h1>HTML tutorials</h1>
<h2>HTML Tutorial</h2>
<h2>XHTML Tutorial</h2>
<h2>CSS Tutorial</h2>
<h1>Scripting tutorials</h1>
<h2>JavaScript</h2>
<h2>VBScript</h2>
<h1>XML tutorials</h1>
<h2>XML</h2>
<h2>XSL</h2>
</body>   
```


效果：

![](./image/041646256106350_1byxBq_Pga.png)

了解更多可参考：[https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters "https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Counters")

## **三、使用**

### **做出各种图形效果**

举例：一个六角星

```text 
<style>
#star-six {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
  position: relative;
}
#star-six::after {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid red;
  position: absolute;
  content: "";
  top: 30px;
  left: -50px;
}
</style>

<body><div id="star-six"></div></body>
```


\#star-six的div是一个正三角行，#star-six::after是一个倒三角形，通过绝对定位，调整其位置即可实现六角星的效果。

![](./image/111044162547286_X6QmVOj5y6.png)

### 显示打印网页的URL

```text 
<style>
@media print {
  a[href]:after {
    content: " (" attr(href) ") ";
  }
}
</style>
<body>
<a href="http://www.baidu.com">百度</a>
</body>  

```


![](./image/041721073927186_iv873I14_F.png)

### 图标

举例：网站有些联系电话，希望在它们前加一个icon☎，就可以使用:before伪元素，如下：

```text 
<!DOCTYPE html><meta charset="utf-8" />
<style type="text/css">
    .phoneNumber::before {
      content:'\260E';
      font-size: 15px;
    }
    </style>
    <p class="phoneNumber">12345645654</p>
```


**Note** :这些特殊字符的html，js和css的写法是不同的，具体可查看[html特殊字符的html，js，css写法汇总。](http://www.cnblogs.com/starof/p/4718550.html "html特殊字符的html，js，css写法汇总。")

### 动画

制作一款特殊的鼠标滑入滑出效果

这个效果还是之前一个朋友从某网站看到之后问我能不能实现，我去那个网站查看了代码学会的，觉得很有趣，特意分享给大家。

可以先看一下效果

```html 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>

        .h-button {
            z-index: 1;
            position: relative;
            overflow: hidden;
        }

        .h-button:before,
        .h-button:after {
            content: "";
            width: 0;
            height: 100%;
            position: absolute;
            filter: brightness(.9);
            background-color: inherit;
            z-index: -1;
        }

        .h-button:before {
            left: 0;
        }

        .h-button:after {
            right: 0;
            transition: width .5s ease;
        }

        .h-button:hover::before {
            width: 100%;
            transition: width .5s ease;
        }

        .h-button:hover::after {
            width: 100%;
            background-color: transparent;
        }

        .submit {
            width: 100px;
            height: 40px;
            color: #fff;
            line-height: 40px;
            text-align: center;
            background: #00baca;
            margin: 50px;
        }
    </style>
</head>
<body>
<div class="h-button submit">提交</div>
</body>
<script>

</script>
</html>

```


### 禁用网页ctrl+f搜索

有些时候，我们不想要用户使用ctrl+f搜索我们网页内的内容，必须在一些文字识别的网页小游戏里，我们又不想把文字做成图片，那么就可以使用这个属性，使用`::before`和`::after`渲染出来的文字，不可选中也不能搜索。当然这个低版本浏览器的兼容性我木有试，谷歌浏览器和safari是可以实现不能选中不可搜索的效果的。

拿上面的示例进行尝试，可以看到，我们使用伪元素添加的\[问题]两个字，就无法使用浏览器的搜索工具搜到。

![](./image/image_XTqbHqEd8e.png)
