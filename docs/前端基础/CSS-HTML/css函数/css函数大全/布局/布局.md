# 布局

## 目录

- [fit-content()](#fit-content)
- [minmax()](#minmax)
- [repeat()](#repeat)

### fit-content()

`fit-content()` 用于根据内容自动调整元素的尺寸。它接受一个参数，该参数可以是一个长度值（如 px、%、em 等）或百分比值，用于定义元素的最小或最大尺寸。当元素的内容超过指定尺寸时，`fit-content()` 函数可以确保元素的大小适应内容，但不会超过其最大限制。

在 CSS Grid 布局中，`fit-content()` 函数特别有用，因为它允许网格项根据内容动态调整大小。例如，可以使用 `fit-content()` 函数来设置网格项的宽度，以便它们根据内容自动伸缩，同时保持一定的最小或最大宽度。

```javascript 
.grid-container {  
  display: grid;  
  grid-template-columns: repeat(auto-fit, minmax(200px, fit-content(100%)));  
  grid-gap: 20px;  
}  
  
.grid-item {  
  background-color: #f2f2f2;  
  padding: 20px;  
}

```


在这个例子中，创建了一个名为 .`grid-container` 的网格容器，并使用 `grid-template-columns` 属性定义了网格列的宽度。通过使用 `repeat(auto-fit, minmax(200px, fit-content(100%)))`，告诉浏览器根据可用空间自动适应网格项的数量，\*\*并确保每个网格项的最小宽度为 200px，最大宽度为其内容的宽度（但不超过父容器的宽度）。\*\***这样，当内容较长时，网格项会自动扩展宽度以适应内容；而当内容较短时，网格项会收缩至最小宽度。**

### minmax()

`minmax()`是 CSS Grid 布局中的一个函数，它用于定义一个长度范围，表示网格容器中的网格项可以使用的最小和最大尺寸。`minmax()` 函数接受两个参数：最小值和最大值。

在 `grid-template-columns` 或 `grid-template-rows` 属性中，可以使用 `minmax()` 来为网格项设置列或行的最小和最大尺寸。这允许网格项在需要时扩展或收缩，但不会超过指定的最大或最小尺寸。

`minmax()` 函数的语法如下：

```javascript 
minmax(min-length, max-length)

```


其中：

- `min-length` 是网格项可以使用的最小尺寸。
- `max-length` 是网格项可以使用的最大尺寸。

这两个参数都可以是任何有效的 CSS 长度单位，如 px、em、% 等。如果省略 `max-length`，则默认值为 `auto`，表示网格项可以扩展到占据所有可用空间。

```javascript 
.grid-container {  
  display: grid;  
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));  
  grid-gap: 10px;  
}  
  
.grid-item {  
  background-color: #f2f2f2;  
  padding: 20px;  
}

```


在这个例子中，`.grid-container` 是一个网格容器，使用 `grid-template-columns` 属性来定义网格的列。`repeat(auto-fill, minmax(100px, 1fr))`表示浏览器**应该尝试填充尽可能多的列，每列的最小宽度为 100px，最大宽度为 1fr（即网格容器可用空间的一个等份）。** 如果容器宽度允许，**所有列都将尝试扩展到相同的宽度（即 1fr），但如果容器宽度有限，列宽将不会小于 100px。**

使用 `minmax()`函数可以创建更加灵活和响应式的网格布局，其中网格项可以根据可用空间自动调整大小，同时保持一定的尺寸限制。

### repeat()

`repeat()` 是 CSS Grid 布局和 Flexbox 布局中的一个函数，用于重复一个或多个值指定的次数。在 Grid 布局中，它通常与 `grid-template-columns` 和 `grid-template-rows` 属性一起使用，以定义重复的网格轨道。在 Flexbox 布局中，它可以与 flex 属性一起使用，以定义重复的 flex 项。

在 Grid 布局中，`repeat()` 函数的语法如下：

```javascript 
repeat(count, value)

```


- `count` 是一个正整数，表示要重复的值的次数。
- `value` 是要重复的值，可以是一个长度、百分比、fr 单位等。

`repeat()` 函数会根据指定的次数重复给定的值，从而简化代码并创建更加灵活的网格布局。

```javascript 
.grid-container {  
  display: grid;  
  grid-template-columns: repeat(3, 100px);  
  grid-gap: 10px;  
}

```


在这个例子中，`.grid-container` 是一个网格容器，使用 `grid-template-column`s 属性定义了网格的列。`repeat(3, 100px)` 表示我们要创建三列，每列的宽度都是 100px。因此，总宽度将是 3 \* 100px = 300px。

此外，`repeat()` 函数还可以与 `auto-fill` 和 `auto-fit` 关键字一起使用，以根据可用空间自动调整列或行的数量。例如：

```javascript 
.grid-container {  
  display: grid;  
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));  
  grid-gap: 10px;  
}

```


在这个例子中，`repeat(auto-fill, minmax(100px, 1fr))` 表示浏览器应该尝试填充尽可能多的列，每列的最小宽度为 100px，最大宽度为 1fr。`auto-fill` 关键字告诉浏览器根据容器宽度自动计算需要多少列。

通过使用 `repeat()` 函数，可以更加轻松地创建复杂且灵活的网格布局，而无需手动指定每个网格轨道的尺寸。
