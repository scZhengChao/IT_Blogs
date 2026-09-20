# jQuery教程

## 目录

- [\$符号](#符号)

[ jQuery 遍历 – 过滤 | 菜鸟教程 jQuery 遍历- 过滤   缩小搜索元素的范围  三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。  其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。   jQuery first() 方法  first() 方法返回被选元素的首个元素。  下面的例子选取首个 \<div https://www.runoob.com/jquery/jquery-traversing-filtering.html](https://www.runoob.com/jquery/jquery-traversing-filtering.html " jQuery 遍历 – 过滤 | 菜鸟教程 jQuery 遍历- 过滤   缩小搜索元素的范围  三个最基本的过滤方法是：first(), last() 和 eq()，它们允许您基于其在一组元素中的位置来选择一个特定的元素。  其他过滤方法，比如 filter() 和 not() 允许您选取匹配或不匹配某项指定标准的元素。   jQuery first() 方法  first() 方法返回被选元素的首个元素。  下面的例子选取首个 <div https://www.runoob.com/jquery/jquery-traversing-filtering.html")

### \$符号

`$`是著名的jQuery符号。实际上，jQuery把所有功能全部封装在一个全局变量`jQuery`中，而`$`也是一个合法的变量名，它是变量`jQuery`的别名：

```javascript 
window.jQuery; // jQuery(selector, context)
window.$; // jQuery(selector, context)
$ === jQuery; // true
typeof($); // 'function'

```


`$`**本质上就是一个函数，但是函数也是对象**，于是`$`除了可以直接调用外，也可以有很多其他属性。

绝大多数时候，我们都直接用`$`（因为写起来更简单嘛）。但是，如果`$`这个变量不幸地被占用了，而且还不能改，那我们就只能让`jQuery`把`$`变量交出来，然后就只能使用`jQuery`这个变量：

```javascript 
$; // jQuery(selector, context)
jQuery.noConflict();
$; // undefined
jQuery; // jQuery(selector, context)

```


这种黑魔法的原理是jQuery在占用`$`之前，先在内部保存了原来的`$`,调用`jQuery.noConflict()`时会把原来保存的变量还原。

[选择器](./选择器/index.md "选择器")

[操作DOM](./操作DOM/index.md "操作DOM")

[事件](./事件/index.md "事件")

[动画](./动画/index.md "动画")

[ajax](./ajax/index.md "ajax")

[杂项](./杂项/index.md "杂项")

[jQuery 延迟对象](<./jQuery 延迟对象/index.md> "jQuery 延迟对象")
