# 计数器

## 目录

- [语法](#语法)
  - [counter-reset](#counter-reset)
  - [counter-increment](#counter-increment)
  - [counter()](#counter)
  - [counters](#counters)
  - [注意](#注意)
  - [CSS计数器实际应用](#CSS计数器实际应用)

[ CSS counter计数器(content目录序号自动递增)详解 «  张鑫旭-鑫空间-鑫生活 CSS计数器不是什么新鲜玩意了，早在10年春暖花开的时候，我写的“CSS content内容生成技术以及应用”一文就要提到，不过当时是作为其中一员介绍。就像例行的溜新同事一样，虽然黑如焦炭的我在自我介绍的时候给新同事留下了深刻印象，但由于介绍的同事茫茫多，我只是其中一员。很自然，个把月之后，我就会被无情的淡忘，除了那依稀的面庞，因为毕竟长得还算比较抽象。 然而，CSS计数器的斗量显然不是短短几句介 https://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/](https://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/ " CSS counter计数器(content目录序号自动递增)详解 «  张鑫旭-鑫空间-鑫生活 CSS计数器不是什么新鲜玩意了，早在10年春暖花开的时候，我写的“CSS content内容生成技术以及应用”一文就要提到，不过当时是作为其中一员介绍。就像例行的溜新同事一样，虽然黑如焦炭的我在自我介绍的时候给新同事留下了深刻印象，但由于介绍的同事茫茫多，我只是其中一员。很自然，个把月之后，我就会被无情的淡忘，除了那依稀的面庞，因为毕竟长得还算比较抽象。 然而，CSS计数器的斗量显然不是短短几句介 https://www.zhangxinxu.com/wordpress/2014/08/css-counters-automatic-number-content/")

CSS 计数器本质上是 CSS 维护的变量，这些变量可以根据 CSS 规则增加以跟踪使用次数。

# 语法

### counter-reset

> 允许设置为负值，也允许设置为小数（ 仅 Chrome 支持）。同时，也支持多个变量同时定义：

```typescript 
.xxx { counter-reset: small-apple 2; } /* 计数器名称是'small-apple', 并且默认起始值是2 */
.xxx { counter-reset: wangxiaoer 2 wangxiaosan 3; } /* 多个计数器同时命名 空格分隔 */

```


### **counter-increment**

顾名思意，就是“计数器-递增”的意思。值为`counter-reset`的1个或多个关键字。后面可以跟随数字，表示每次计数的变化值。如果缺省，则使用默认变化值`1`（方便起见，下面的都使用默认值做说明）。

### **counter()**

这是个方法，不是属性。类似CSS3中才`calc()`计算。这里作用很单纯显示计数。不过名称、用法有多个：

```typescript 
counter(name) /* name就是counter-reset的名称 */
counter(name, style)

```


这里的`style`参数还有有些名堂的。其支持的关键字值就是`list-style-type`支持的那些值。作用是，我们递增递减可以不一定是数字，还可以是英文字母，或者罗马文等。

> **list-style-type**：disc | circle | square | decimal | lower-roman | upper-roman | lower-alpha | upper-alpha | none | armenian | cjk-ideographic | georgian | lower-greek | hebrew | hiragana | hiragana-iroha | katakana | katakana-iroha | lower-latin | upper-latin

### **counters**

看似值多了个字母`s`, 但表意大变身。`counters`几乎可以说是**嵌套计数**的代名词。

我们平时的序号，不可能就只是`1,2,3,4,..`, 还会有诸如 `1.1,1.2,1.3,...`等的子序号。得，前者就是`counter()`干的事情，后者就是`counters()`干的事情。

```typescript 
counters(name, string,style); /* MDN上说，要想IE8兼容，这里逗号后面的空格要去掉，但是鄙人IE11的IE8模式看，无此问题 */
```


其中，`string`参数为字符串（需要引号包围的）（必须参数），表示子序号的连接字符串。例如`1.1`的`string`就是`'.'`, `1-1`就是`'-'`.

![](./image/image_7iI0fu7UnU.png)

```typescript 
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .reset { padding-left: 20px; counter-reset: wangxiaoer; line-height: 1.6; color: #666; }
        .counter:before { content: counters(wangxiaoer, '-') '. '; counter-increment: wangxiaoer; font-family: arial black; }


    </style>
</head>
<body>

<div class="reset">
    <div class="counter">我是王小二
        <div class="reset">
            <div class="counter">我是王小二的大儿子</div>
            <div class="counter">我是王小二的二儿子
                <div class="reset">
                    <div class="counter">我是王小二的二儿子的大孙子</div>
                    <div class="counter">我是王小二的二儿子的二孙子</div>
                    <div class="counter">我是王小二的二儿子的小孙子</div>
                </div>
            </div>
            <div class="counter">我是王小二的三儿子</div>
        </div>
    </div>
    <div class="counter">我是王小三</div>
    <div class="counter">我是王小四
        <div class="reset">
            <div class="counter">我是王小四的大儿子</div>
        </div>
    </div>
</div>

</body>
</html>
```


### 注意

> CSS 计数器只跟 `content` 属性使用才有效。

一个元素，如果设置了`counter-increment`, 但是其`display`的属性值是`none`或者含有`hidden`属性（针对支持浏览器），则此计数值是不会增加的。而`visibility:hidden`以及其他声明不会有此现象。

### CSS计数器实际应用

相比传统的`ol`,`ul`列表计数，CSS计数器的优势就在于灵活与强大，不足就是IE6/IE7不支持。

普照规则第一条，普照源唯一。所以，我们可以在头尾放两个差距甚远的列表，然后，这些列表自动显示序号。而`ol/ul`只能写死`start`实现，很不灵活，一旦列表有删减，就嗝屁了。

由于计数器是伪元素控制显示的。因此，我们几乎可以应用各种CSS样式，各种定位等。所以，基本上，只要有有序序号呈现的地方，就能使用CSS计数器。

例如，电商首页的图片slide广告上的`1,2,3,4,...`序号；

![](https://image.zhangxinxu.com/image/blog/201408/2014-08-26_153731.png)

我们做分享时候使用的HTML5 web在线幻灯片就可以使用CSS计数器标注页数等；以及一开始给小伙伴们做的果汁工具的3个选择等。
