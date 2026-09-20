# 自定义动画

## 目录

- [串行动画](#串行动画)
- [为什么有的动画没有效果](#为什么有的动画没有效果)
- [jQuery animate() - 使用相对值](#jQuery-animate---使用相对值)

如果上述动画效果还不能满足你的要求，那就祭出最后大招：`animate()`，它**可以实现任意动画效果，我们需要传入的参数**就是DOM元素**最终的CSS状态和时间**，jQuery在时间段内不断调整CSS直到达到我们设定的值：

```javascript 
let div = $('#test-animate');
div.animate({
    opacity: 0.25,
    width: '256px',
    height: '256px'
}, 3000); // 在3秒钟内CSS过渡到设定值
```


`animate()`还可以再传入一个函数，当动画结束时，该函数将被调用：

```javascript 
let div = $('#test-animate');
div.animate({
    opacity: 0.25,
    width: '256px',
    height: '256px'
}, 3000, function () {
    console.log('动画已结束');
    // 恢复至初始状态:
    $(this).css('opacity', '1.0').css('width', '128px').css('height', '128px');
});
```


实际上这个回调函数参数对于基本动画也是适用的。

有了`animate()`，你就可以实现各种自定义动画效果了：

### 串行动画

jQuery的动画效果还可以串行执行，通过`delay()`方法还可以实现暂停，这样，我们可以实现更复杂的动画效果，而代码却相当简单

```javascript 
let div = $('#test-animates');
// 动画效果：slideDown - 暂停 - 放大 - 暂停 - 缩小
div.slideDown(2000)
   .delay(1000)
   .animate({
       width: '256px',
       height: '256px'
   }, 2000)
   .delay(1000)
   .animate({
       width: '128px',
       height: '128px'
   }, 2000);
}
</script>
```


因为动画需要执行一段时间，所以jQuery必须不断返回新的Promise对象才能后续执行操作。简单地把动画封装在函数中是不够的。

### 为什么有的动画没有效果

你可能会遇到，有的动画如`slideUp()`根本没有效果。这是因为jQuery动画的原理是逐渐改变CSS的值，如`height`从`100px`逐渐变为`0`。但是很多不是block性质的DOM元素，对它们设置`height`根本就不起作用，所以动画也就没有效果。

此外，jQuery也没有实现对`background-color`的动画效果，用`animate()`设置`background-color`也没有效果。这种情况下可以使用CSS3的`transition`实现动画效果。

> **可以用 animate() 方法来操作所有 CSS 属性吗？** &#x20;
> 是的，几乎可以！不过，需要记住一件重要的事情：当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。
> 同时，色彩动画并不包含在核心 jQuery 库中。
> 如果需要生成颜色动画，您需要从 [jquery.com](http://jquery.com/download/ "jquery.com") 下载 [颜色动画](http://plugins.jquery.com/color/ "颜色动画") 插件。

## jQuery animate() - 使用相对值

也可以定义相对值（该值相对于元素的当前值）。需要在值的前面加上 += 或 -=：

```javascript 
$("button").click(function(){
  $("div").animate({
    left:'250px',
    height:'+=150px',
    width:'+=150px'
  });
});

```
