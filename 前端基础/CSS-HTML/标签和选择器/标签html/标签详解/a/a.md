# a

## 目录

- [a标签](#a标签)
  - [a标签中有四个：link、visited、hover、active](#a标签中有四个linkvisitedhoveractive)
  - [顺序：](#顺序)
  - [锚点](#锚点)
  - [定义和用法](#定义和用法)
  - [实例](#实例)
  - [语法](#语法)
    - [属性值](#属性值)
    - [详细说明](#详细说明)
    - [打开新窗口](#打开新窗口)
    - [在框架中打开窗口](#在框架中打开窗口)
  - [特殊的目标](#特殊的目标)
    - [\_blank](#_blank)
    - [\_self](#_self)
    - [\_parent](#_parent)
    - [\_top](#_top)

# **a标签**

伪类是CSS 用于向某些选择器添加特殊的效果。

## a标签中有四个：link、visited、hover、active

（1）link

说明：设置a对象在未被访问前的样式表属性。

（2）visited

说明：设置a对象在其链接地址已被访问过时的样式表属性。

（3）hover

说明：设置对象在其鼠标悬停时的样式表属性。

（4）active

说明：设置对象在被用户激活（在鼠标点击与释放之间发生的事件）时的样式表属性。

## 顺序：

a:link、a:visited、a:hover、a:active

解释：

- link:连接平常的状态
- visited:连接被访问过之后
- hover:鼠标放到连接上的时候
- active:连接被按下的时候

## 锚点

```css 
<a href='#p1'> 
<div id='p1'> 

div:target{
  div被照亮时
}
```


注意：当锚点的标签是a标签时 id 可以用name 代替

## 定义和用法

`target` 属性规定打开链接文档的位置。

## 实例

target 属性规定打开链接文档的位置：

```html 
<a href="https://www.w3school.com.cn" target="_blank">访问 W3School</a>

```


## 语法

```html 
<a target="_blank|_self|_parent|_top|framename">

```


`target` 属性的**用途**是**告诉浏览器希望将所链接的资源显示在哪里。** 默认情况下，浏览器使用的是显示当前文档的窗口、标签页或框架（iframe），所以新文档将会取代现在显示的文档，不过还有其他选择，请看下表：

### 属性值

| 值            | 描述                       |
| ------------ | ------------------------ |
| \\\_blank    | 在新窗口或选项卡中打开链接文档。         |
| \\\_self     | 在与点击相同的框架中打开链接的文档（默认）。   |
| \\\_parent   | 在父框架中打开链接文档。             |
| \\\_top      | 在窗口的整个主体中打开链接的文档。        |
| *framename*​ | 在指定的 \`iframe\` 中打开链接文档。 |

### 详细说明

如果在一个 `<a>` 标签内包含一个 `target` 属性，浏览器将会**载入和显示用这个标签的 href 属性命名的**、**名称与这个目标吻合的框架或者窗口中的文档**。如果这个指定名称**或 id 的框架或者窗口不存在，浏览器将打开一个新的窗口，**给这个窗口一个**指定的标记**，然后将新的文档载入那个窗口。从此以后，超链接文档就可以指向这个新的窗口。

### 打开新窗口

被指向的超链接使得创建高效的浏览工具变得很容易。例如，一个简单的内容文档的列表，可以将文档重定向到一个单独的窗口：

```markdown 
<h3>Table of Contents</h3>
<ul>
  <li><a href="pref.html" target="view_window">Preface</a></li>
  <li><a href="chap1.html" target="view_window">Chapter 1</a></li>
  <li><a href="chap2.html" target="view_window">Chapter 2</a></li>
  <li><a href="chap3.html" target="view_window">Chapter 3</a></li>
</ul>

```


当用户第一次选择内容列表中的某个链接时，**浏览器将打开一个新的窗口，将它标记为 "view\_window**"，然后在其中显示希望显示的文档内容。如果用户从这个内容列表中**选择另一个链接**，且**这个 "view\_window" 仍处于打开状态**，浏览器就会**再次将选定的文档载入那个窗口**，**取代刚才的那些文档。**

在整个过程中，这个包含了内容列表的窗口是用户可以访问的。**通过单击窗口中的一个连接，可使另一个窗口的内容发生变化。**

### 在框架中打开窗口

不用打开一个完整的浏览器窗口，使用 `target` 更通常的方法是在一个 `<frameset>` 显示**中将超链接内容定向到一个或者多个框架中**。可以将这个内容列表放入一个带有两个框架的文档的其中一个框架中，并用这个相邻的框架来显示选定的文档：

```html 
<frameset cols="100,*">
  <frame src="toc.html">
  <frame src="pref.html" name="view_frame">
</frameset>
```


当浏览器最初显示这两个框架的时候，左边这个框架包含目录，右边这个框架包含前言。

这是 "toc.html" 的源代码：

```markdown 
<h3>Table of Contents</h3>
<ul>
  <li><a href="pref.html" target="view_frame">Preface</a></li>
  <li><a href="chap1.html" target="view_frame">Chapter 1</a></li>
  <li><a href="chap2.html" target="view_frame">Chapter 2</a></li>
  <li><a href="chap3.html" target="view_frame">Chapter 3</a></li>
</ul>

```


> 请注意，在文档 "toc.html" 中，每个链接的目标都是 "view\_frame"，也就是右边的框架。

当用户从左边框架中的目录中选择一个链接时，浏览器会将这个关联**的文档载入并显示在右边这个 "view\_frame" 框架中。**当其他链接被选中时**，右边这个框架中的内容也会发生变化，而左边这个框架始终保持不变。**

## 特殊的目标

有 4 个保留的目标名称用作特殊的文档重定向操作：

### \_blank

浏览器总在一个新打开、未命名的窗口中载入目标文档。

### \_self

这个目标的值对所有没有指定目标的 \<a> 标签是**默认目标**，它使得目标文档载入**并显示在相同的框架或者窗口中作为源文**档。这个目标是多余且不必要的，除非和文档标题 \<base> 标签中的 target 属性一起使用。

### \_parent

这个目标使得文档载入父窗口或者包含来超链接引用的框架的框架集。如果这个引用是在窗口或者在顶级框架中，那么它与目标 \_self 等效。

### \_top

这个目标使得文档载入包含这个超链接的窗口，用 \_top 目标将会清除所有被包含的框架并将文档载入整个浏览器窗口。

> 提示：这些 target 的所有 4 个值都以下划线开始。任何其他用一个下划线作为开头的窗口或者目标都会被浏览器忽略，因此，不要将下划线作为文档中定义的任何框架 name 或 id 的第一个字符。
