# 组合/叠加

其实 `:where()` 的功能本来就有，只不过有了它之后，实现起这些功能来就更加方便快捷\~接下来就来讲讲它的组合/叠加功能

我们来看下面的这段 css 代码

```javascript 
div a:hover,
li a:hover,
.cla a:hover,
.aa .bb a:hover,
[class^='bold'] a:hover{
  color: yellow;
}

```


我们可以使用 `:where()`来简化这个写法，使用它找出 `div li .cla `这三种选择器，选择器可以是标签，也可以是类名，也可以是选择器表达式

```javascript 
:where(div, li, .cla, .a .b, [class^='bold']) a:hover {
    color: yellow;
}

```


再来看看使用 :where() 的组合，完成一些功能，我们看以下的代码

```javascript 
.dark-theme button,
.dark-theme a,
.light-theme button,
.light-theme a{
 color: pink;
}

```


我们完全可以使用 `:where()` 简化这个写法

```javascript 
:where(.dark-theme, light-theme) :where(button, a) {
    color: pink;
}

```
