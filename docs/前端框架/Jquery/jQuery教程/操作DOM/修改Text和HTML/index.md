# 修改Text和HTML

jQuery对象的`text()`和`html()`方法分别获取节点的**文本**和**原始HTML文本**，例如，如下的HTML结构：

```html 
<!-- HTML结构 -->
<ul id="test-ul">
    <li class="js">JavaScript</li>
    <li name="book">Java &amp; JavaScript</li>
</ul>
```


分别获取文本和HTML：

```javascript 
$('#test-ul li[name=book]').text(); // 'Java & JavaScript'
$('#test-ul li[name=book]').html(); // 'Java &amp; JavaScript'
```


如何设置文本或HTML？jQuery的API设计非常巧妙：**无参数调用**\*\*`text()`\*\***是获取文本，传入参数就变成设置文本，HTML也是类似操作**，自己动手试试：

- JavaScript
- Java & JavaScript

```javascript 
let j1 = $('#test-ul li.js');
let j2 = $('#test-ul li[name=book]');

j1.html('<span style="color: #c00">JavaScript</span>');
j2.text('JavaScript & ECMAScript');

```


一个jQuery对象可以包含0个或任意个DOM对象，**它的方法实际上会作用在对应的每个DOM节点上**。在上面的例子中试试：

```javascript 
$('#test-ul li').text('JS'); // 是不是两个节点都变成了JS？
```


所以`jQuery`对象的另一个好处是我们**可以执行一个操作**，**作用在对应的一组DOM节点**上。**即使选择器没有返回任何DOM节点，调用**\*\*`jQuery`\*\***对象的方法仍然不会报错：**

```javascript 
// 如果不存在id为not-exist的节点：
$('#not-exist').text('Hello'); // 代码不报错，没有节点被设置为'Hello'
```


这意味着jQuery帮你免去了许多`if`语句。

[操作表单](./操作表单/index.md "操作表单")
