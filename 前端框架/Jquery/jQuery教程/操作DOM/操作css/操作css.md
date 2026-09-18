# 操作css

## 目录

- [jQuery css() 方法](#jQuery-css-方法)
- [返回 CSS 属性](#返回-CSS-属性)
- [设置 CSS 属性](#设置-CSS-属性)
- [设置多个 CSS 属性](#设置多个-CSS-属性)
  - [修改CSS](#修改CSS)

## jQuery css() 方法

css() 方法**设置或返回**被选元素的一个或多个样式属性。

## 返回 CSS 属性

如需返回指定的 CSS 属性的值，请使用如下语法：

```css 
css("propertyname");

```


下面的例子将返回首个匹配元素的 background-color 值：

```javascript 
$("p").css("background-color");

```


## 设置 CSS 属性

如需设置指定的 CSS 属性，请使用如下语法：

```css 
css("propertyname","value");

```


## 设置多个 CSS 属性

如需设置多个 CSS 属性，请使用如下语法：

```css 
css({"propertyname":"value","propertyname":"value",...});（

```


### 修改CSS

jQuery对象有“批量操作”的特点，这用于修改CSS实在是太方便了。考虑下面的HTML结构：

```javascript 
<!-- HTML结构 -->
<ul id="test-css">
    <li class="lang dy"><span>JavaScript</span></li>
    <li class="lang"><span>Java</span></li>
    <li class="lang dy"><span>Python</span></li>
    <li class="lang"><span>Swift</span></li>
    <li class="lang dy"><span>Scheme</span></li>
</ul>
```


要高亮显示动态语言，调用jQuery对象的`css('name', 'value')`方法，我们用一行语句实现：

- JavaScript
- Java
- Python
- Swift
- Scheme

```javascript 
$('#test-css li.dy>span').css('background-color', '#ff0').css('color', '#c00');

```


> *注意*，jQuery对象的所有方法**都返回一个jQuery对象（可能是新的也可能是自身），这样我们可以进行链式调用，非常方便。**

jQuery对象的`css()`方法可以这么用：

```javascript 
let div = $('#test-div');
 div.css('color'); // '#000033', 获取CSS属性
div.css('color', '#336699'); // 设置CSS属性
div.css('color', ''); // 清除CSS属性
```


为了和JavaScript保持一致，CSS属性可以用`'background-color'`和`'backgroundColor'`两种格式。

`css()`方法将**作用于DOM节点的**`style`属性，**具有最高优先级。** 如果要修改`class`属性，可以用jQuery提供的下列方法：

```javascript 
let div = $('#test-div');
div.hasClass('highlight'); // false， class是否包含highlight
div.addClass('highlight'); // 添加highlight这个class
div.removeClass('highlight'); // 删除highlight这个class

```
