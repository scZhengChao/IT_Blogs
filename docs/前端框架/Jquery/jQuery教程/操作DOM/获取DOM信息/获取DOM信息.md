# 获取DOM信息

利用jQuery对象的若干方法，我们直接**可以获取DOM的高宽等信息，而无需针对不同浏览器编写特定代码：**

```javascript 
// 浏览器可视窗口大小:
$(window).width(); // 800
$(window).height(); // 600

// HTML文档大小:
$(document).width(); // 800
$(document).height(); // 3500

// 某个div的大小:
let div = $('#test-div');
div.width(); // 600
div.height(); // 300
div.width(400); // 设置CSS属性 width: 400px，是否生效要看CSS是否有效
div.height('200px'); // 设置CSS属性 height: 200px，是否生效要看CSS是否有效
```


`attr()`和`removeAttr()`方法用于操作DOM节点的属性：

```javascript 
// <div id="test-div" name="Test" start="1">...</div>
let div = $('#test-div');
div.attr('data'); // undefined, 属性不存在
div.attr('name'); // 'Test'
div.attr('name', 'Hello'); // div的name属性变为'Hello'
div.removeAttr('name'); // 删除name属性
div.attr('name'); // undefined
```


`prop()`方法和`attr()`类似，但是HTML5规定**有一种属性在DOM节点中可以没有值，只有出现与不出现两种，** 例如：

```html 
<input id="test-radio" type="radio" name="test" checked value="1">
```


等价于：

```html 
<input id="test-radio" type="radio" name="test" checked="checked" value="1">
```


`attr()`和`prop()`对于属性`checked`处理有所不同：

```javascript 
let radio = $('#test-radio');
radio.attr('checked'); // 'checked'
radio.prop('checked'); // true
```


`prop()`**返回值更合理一些**。不过，用`is()`**方法判断更好：**

```javascript 
let radio = $('#test-radio');
radio.is(':checked'); // true
```


类似的属性还有`selected`，处理时最好用`is(':selected')`。
