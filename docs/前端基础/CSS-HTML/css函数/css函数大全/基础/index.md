# 基础

## 目录

- [attr()](#attr)
- [counter()、counters()](#countercounters)
- [url()](#url)
- [var()](#var)
- [element()](#element)
- [image-set()](#image-set)

### attr()

`attr()` 函数用于获取被选中元素的某个 HTML 属性值，并在样式文件中使用该值。这个函数也可以应用于伪类元素，此时它获取的是伪元素所依附的原始元素的属性值。

下面来看一个简单的例子：

```javascript 
div {  
  background-color: attr(data-color);  
}

```


在这个例子中，如果有一个 `<div>` 元素带有 `data-color` 属性（如 `<div data-color="red">`），那么该元素的背景色将被设置为红色。

注意，`attr()` 函数总是返回一个字符串，因此在使用它时需要确保所获取的属性值能够正确地被解析和应用到样式中。此外，不是所有的 CSS 属性都支持 `attr()` 函数，它通常用于那些可以接受字符串值的属性。

### counter()、counters()

`counter()`和`counters()`函数用于获取和操作计数器的值。CSS计数器是一种可以存储和递增/递减的数字值，通常与列表项、标题、页脚等元素的编号和排序相关。

`counter()`函数用于获取指定计数器的当前值。它接受一个参数，即计数器的名称。这个函数的返回值是计数器的当前数值。

```javascript 
selector::before {  
  content: counter(counter-name);  
}

```


其中，`selector`是想要添加计数器值的元素的选择器，`counter-name`是之前使用`counter-reset`和`counter-increment`定义的计数器的名称。

`counters()`函数用于获取多个嵌套计数器的值，并将它们连接成一个字符串。它接受两个或三个参数：计数器名称、分隔符字符串（可选），以及计数器样式（可选）。

```javascript 

 
selector::before {  
  content: counters(counter-name, separator);  
  /* 或者 */  
  content: counters(counter-name, separator, style);  
}

```


- `counter-name`：计数器的名称。
- `separator`：一个字符串，用于分隔不同计数器的值。
- `style`：一个可选参数，指定计数器的显示样式，如decimal（十进制）、upper-roman（大写罗马数字）等。如果省略，将使用默认的十进制样式。

假设有一个嵌套列表，想要显示每个列表项的编号，包括所有嵌套的级别。我们可以使用`counters()`函数来实现这一点。

```javascript 
/* 重置计数器 */  
ol {  
  counter-reset: item;  
}  
  
/* 递增计数器 */  
li::before {  
  counter-increment: item;  
  content: counters(item, " "); /* 使用空格作为分隔符 */  
}

```


在这个例子中，每当遇到一个`<li>`元素时，`item`计数器就会递增。`counters(item, " ")`函数会将所有嵌套级别的计数器值连接起来，并使用空格分隔它们。因此，对于一个三级嵌套的列表项，它的内容将类似于“1 2 3”。

注意，为了使计数器工作，还需要使用`counter-reset`和`counter-increment`属性来初始化和递增计数器。同时，`counter()`和`counters()`函数通常与`::before`或`::after`伪元素一起使用，以便在元素的内容之前或之后插入计数器的值。

详情：[计数器](../../计数器/index.md "计数器")

### url()

`url()` 函数用于引用或包含外部资源，如图像、字体或其他媒体文件。这个函数通常与各种CSS属性一起使用，以指定这些属性所需的资源的位置。

`url()`函数的语法如下：

```javascript 
url( [ <string> | <uri> ] )

```


其中`<string>`或`<uri>`参数表示资源的URL。这个URL可以是绝对路径（指向完整的互联网地址），也可以是相对路径（相对于当前CSS文件或HTML文件的位置）。

以下是一些`url()`函数在CSS中的使用例子：

1. **背景图像**：

```javascript 
body {  
  background-image: url('images/background.jpg');  
}
```


1. **字体文件**：

```javascript 
@font-face {  
  font-family: 'MyCustomFont';  
  src: url('fonts/MyCustomFont.woff2') format('woff2'),  
       url('fonts/MyCustomFont.woff') format('woff');  
}
```


1. **列表样式图像**：

```javascript 
ul li {  
  list-style-image: url('images/list-bullet.png');  
}

```


1. 光标

```javascript 
body {  
  cursor: url('images/custom-cursor.cur'), auto;  
}

```


1. **边框图像**：

```javascript 
div {  
  border-image: url('images/border.png') 30% round;  
}

```


在使用`url()`函数时，需要注意：

- URL必须被引号包围，可以是单引号或双引号。
- 如果资源位于同一服务器上，可以使用相对路径。如果资源位于不同的服务器或互联网上，需要使用完整的URL。
- 浏览器会尝试下载并缓存`url()`函数中指定的资源，以便在需要时快速访问。
- 如果资源无法加载（例如，由于404错误或跨域问题），则相关的CSS属性可能不会按预期工作。

### var()

`var()` 函数用于访问CSS自定义属性（CSS变量）的值。CSS 自定义属性允许定义可在**整个文档或特定元素范围内重复使用的值**。通过使用 `var()` 函数，可以在样式表中引用这些值，从而实现更灵活和可维护的样式。

CSS 变量的声明以两个连字符（`--`）开头，后面跟着变量名和值。

```javascript 
:root {  
  --main-color: blue;  
  --secondary-color: #333;  
}

```


在这个例子中，在 `:root` 选择器中定义了两个变量 `--main-colo`r 和 `--secondary-color`。`:root` 选择器指向文档的根元素，这意味着这些变量在整个文档中都是可用的。

然后，可以使用 `var()` 函数来引用这些变量的值。

```javascript 
body {  
  background-color: var(--main-color);  
  color: var(--secondary-color);  
}

```


在这个例子中，`var(--main-color)` 会被替换为 `blue`，`var(--secondary-color)` 会被替换为 `#333`。

`var()` 函数也可以接受一个可选的第二个参数，作为变量未定义时的回退值。

```javascript 
body {  
  background-color: var(--unknown-variable, red);  
}

```


如果 `--unknown-variable` 没有被定义，`background-color` 将会设置为 `red`。

CSS 变量非常有用，因为它们允许：

- 在一个地方定义颜色、尺寸、字体等，然后在整个样式表中重复使用。
- 动态地改变样式，通过JavaScript更改变量的值。
- 实现更高级的样式逻辑和主题切换。

注意，CSS变量的作用域是它们被定义的位置。如果在元素的选择器中定义了变量，那么该变量只会在那个元素及其子元素中可用。如果在 `:root` 或其他更高级别的选择器（如 html）中定义了变量，那么它们将在整个文档中可用。

### element()

`element()` 函数是 CSS3 中引入的一个背景函数，它能够将网站上的某部分元素作为背景图像来使用。换句话说，它可以将指定的 HTML 元素渲染为 CSS 背景图像。

`element()` 函数的基本语法是 `element(id)`，其中 id 是必需参数，表示要作为背景图像使用的元素的 ID。

假设有一个带有 ID `myElement` 的元素，可以这样使用 `element()` 函数：

```javascript 
#someOtherElement {  
  background-image: element(#myElement);  
}

```


这里，`#someOtherElement` 的背景图像会被设置为 `#myElement` 的内容。

### image-set()

`image-set()` 函数允许为不同的设备像素比提供不同的图像资源，从而确保图像在各种设备上都能以适当的分辨率显示。这对于响应式设计和确保图像在不同设备上的清晰度非常有用。

`image-set()`的基本语法如下：

```javascript 
image-set(  
  <image-candidate> [<resolution> [, <image-candidate> [<resolution>]]*  
)

```


其中，`<image-candidate>`是图像的 URL，`<resolution>`是该图像适用的设备像素比。可以指定多个图像候选项，每个都带有其适用的分辨率。浏览器将选择最适合当前设备像素比的图像。

```javascript 
.img-responsive {  
  background-image: image-set(  
    url('image-320w.jpg') 1x,  
    url('image-640w.jpg') 2x  
  );  
}

```


在这个例子中，如果设备像素比为 1（标准的非高清设备），浏览器将使用`image-320w.jpg`。如果设备像素比为 2（如 Retina 屏幕），浏览器将使用`image-640w.jpg`，这是一个更高分辨率的图像，可以确保在高清设备上显示的清晰度。

虽然`image-set()`主要用于背景图像，但也可以用于`<img>`标签的`srcset`属性，以实现类似的功能，并允许更复杂的图像选择逻辑，包括基于视口宽度和像素密度的选择。
