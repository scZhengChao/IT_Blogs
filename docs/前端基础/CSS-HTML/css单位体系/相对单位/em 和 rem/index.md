# em 和 rem

em是最常见的相对长度单位，适合基于特定的字号进行排版。根据CSS的规定，**1em 等于元素的font-size属性的值。**

**em 是相对于父元素的字体大小进行计算**的。如果当前**对行内文本的字体尺寸未进行显示设置，则相对于浏览器的默认字体尺寸**。当DOM元素嵌套加深时，并且同时给很多层级显式的设置了font-size的值的单位是em，那么就需要层层计算，复杂度会很高。

当然，上面的这个说法是不严谨 的。来看一个例子：

```javascript 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .parent {
            width: 300px;
            height: 300px;
            font-size: 20px;
        }
        .child {
            border: 1em solid ;
        }
    </style>
</head>
<body>
    <div class="parent">
        <div class="child">
           子元素
        </div>
    </div>
</body>
</html>
```


这里给父元素设置了字体大小为20px，然后给子元素的border宽度设置为1em，这时，子元素的border值为20px，确实是相对于父元素的字体大小设置的：

![](./image/image_PXoBZZ0Qki.png)

那如果我们给子元素的字体设置为30px：

```javascript 
.child {
  font-size: 30px;
  border: 1em solid ;
}
```


这时可以看到，子元素的边框宽度就是30px，它是相对自己大小进行计算的：

![](./image/image_5lelXyivDw.png)

**所以，可以得出结论：如果自身元素是没有设置字体大小的，那么就会根据其父元素的字体大小作为参照去计算，如果元素本身已经设置了字体，那么就会基于自身的字体大小进行计算。**

em单位除了可以作用于 font-size之外，还可以运用于其他使用长度的属性，比如border-width、width、height、margin、padding、text-shadow等。

所以，em的使用还是比较复杂的，**它可能会继承任意一级父元素的字体大小。需要谨慎使用。**

rem相对于em就简单了很多，它是根据页面的根元素（根元素）的字体大小来计算的。来对上面的例子进行修改：

```javascript 
child {
  font-size: 30px;
  border: 1rem solid ;
}

html {
 font-size: 25px;
}
```


效果如下，可以看到，边框的长度变成了25px，它是根据根元素html的字体大小计算的：

![](./image/image_9yZP3tNz_h.png)

如果没有对根元素设定字号的话，font-size: 1rem的作用与font-size: initial相同。

使用 em 和 rem 可以让我们灵活的够控制元素整体的放大和缩小，而不是固定大小。那何时应使用 em，何时应使用 rem 呢？可以根据两者的差异来进行选择：

- 两者在客户端中计算出来的样式都会以px的形式显示。
- rem是相对于根元素html的font-size计算，em 相对于元素的font-size计算。
- 当需要根据浏览器的font-size设置缩放时，应该使用 rem。
- 使用 em 应该根据组件的font-size来定，而不是根元素的font-size来定。
- rem 可以从浏览器字体设置中继承 font-size 值， em 可能受任何继承过来的父元素 font-size 的影响。
