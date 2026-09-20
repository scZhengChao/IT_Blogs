# 什么鬼？两行代码就能适应任何屏幕？

## 目录

- [🧩 基础概念](#-基础概念)
  - [1.grid-template-columns](#1grid-template-columns)
  - [2.repeat(auto-fit, ...)](#2repeatauto-fit-)
  - [3.minmax(200px, 1fr)](#3minmax200px-1fr)
  - [4. 综合起来](#4-综合起来)
    - [总结一句话：](#总结一句话)
  - [这里还能填auto-fill，和auto-fit有啥区别？](#这里还能填auto-fill和auto-fit有啥区别)
- [🥇 auto-fill 和 auto-fit 有啥区别？](#-auto-fill-和-auto-fit-有啥区别)
  - [1.auto-fill](#1auto-fill)
  - [2.auto-fit](#2auto-fit)
  - [👀 直观对比](#-直观对比)
    - [👇 Demo 代码：](#-Demo-代码)
- [兼容性](#兼容性)
- [🎯 什么时候用 auto-fill，什么时候用 auto-fit？](#-什么时候用-auto-fill什么时候用-auto-fit)
- [📝 总结](#-总结)
- [小结](#小结)

你可能想不到，只用\*\*「两行 CSS」**，就能让你的卡片、图片、内容块**「自动适应」\*\*各种屏幕宽度，彻底摆脱复杂的媒体查询！ 秘诀就是 CSS Grid 的`auto-fill`和`auto-fit`。

![](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibsUkgDmqCRDdfVibJdE7sTyKEtdibx9O0rR6nSuJHekia1xyMqIDS58NJMLtmQ0icErxhglIicQwia9TusQ/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

马上教你用！✨

## 🧩 基础概念

假设你有这样一个需求：

- 一排展示很多卡片
- 每个卡片最小宽度 200px，剩余空间平均分配
- 屏幕变窄时自动换行

只需在父元素加两行 CSS 就能实现：

```css 
/* 父元素 */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* 子元素 */
.item {
  height: 200px;
  background-color: rgb(141, 141, 255);
  border-radius: 10px;
}


```


下面详细解释这行代码的意思：

```css 
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

```


这是 CSS Grid 布局里定义列宽的常用写法，逐个拆解如下：

### 1.`grid-template-columns`

- 作用：定义\*\*「网格容器」\*\*里有多少列，以及每列的宽度。

### 2.`repeat(auto-fit, ...)`

- `repeat`是个\*\*「重复函数」\*\*，表示后面的模式会被重复多次。
- `auto-fit`是一个特殊值，意思是：**「自动根据容器宽度，能放下几个就放几个」**，每列都用后面的规则。
- 容器宽度足够时，能多放就多放，放不下就自动换行。

### 3.`minmax(200px, 1fr)`

- `minmax`也是一个函数，意思是：**「每列最小 200px，最大可以占 1fr（剩余空间的平分）」**
- 具体来说：
- 当屏幕宽度很窄时，每列\*\*「最小宽度是 200px」\*\*，再窄就会换行。
- 当屏幕宽度变宽，卡片会自动拉伸，每列\*\*「最大可以占据剩余空间的等分」\*\*（`1fr`），让内容填满整行。

### 4. 综合起来

- 这行代码的意思就是：
- 网格会自动生成多列，每列最小 200px，最大可以平分一行的剩余空间。
- 屏幕宽了就多显示几列，屏幕窄了就少显示几列，自动换行，自适应各种屏幕！
- **「不需要媒体查询」**，布局就能灵活响应。

#### 总结一句话：

> grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
> 让你的网格卡片「最小 200px，最大自动填满一行」，自动适应任何屏幕，布局永远美观！

### 这里还能填`auto-fill`，和`auto-fit`有啥区别？

## 🥇 auto-fill 和 auto-fit 有啥区别？

### 1.`auto-fill`

> 🧱\*\*「尽可能多地填充列，即使没有内容也会 “占位”」\*\*
>
> ❞

- 会自动创建尽可能多的列**轨道（包括空轨道），让网格尽量填满容器。**
- 适合需**要 “列对齐” 或“固定网格数”的场景。**

### 2.`auto-fit`

> ❝
>
> 🧱\*\*「**自动适应内容，能合并多余空列，不占位**」\*\*
>
> ❞

- 会**自动 “折叠” 没有内容的轨道，让现有的内容尽量拉伸占满空间。**
- 适合**希望内容自适应填满整行的场景。**

### 👀 直观对比

假设容器宽度能容纳 10 个 200px 的卡片，但你只放了 5 个卡片：

- `auto-fill`会保留 10 列宽度，5 个卡片在前五列，后面五列是 “空轨道”。
- `auto-fit`会折叠掉后面五列，让这 5 个卡片拉伸填满整行。

![](https://mmbiz.qpic.cn/mmbiz_gif/lCQLg02gtibsUkgDmqCRDdfVibJdE7sTyKYNv7ZowtSRZdeaTu9IAU7SGRUdMTSTdUqPh66cNibTuzUGU7Ylr9ljA/640?wx_fmt=gif\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

#### 👇 Demo 代码：

```html 
<h2>auto-fill</h2>
<div class="grid-fill">
    <div>item1</div>
    <div>item2</div>
    <div>item3</div>
    <div>item4</div>
    <div>item5</div>
</div>

<h2>auto-fit</h2>
<div class="grid-fit">
    <div>item1</div>
    <div>item2</div>
    <div>item3</div>
    <div>item4</div>
    <div>item5</div>
</div>

```


```css 
.grid-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 40px;
}
.grid-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
.grid-fill div {
  background: #08f700;
}
.grid-fit div {
  background: #f7b500;
}
.grid-fill div,
.grid-fit div {
  padding: 24px;
  font-size: 18px;
  border-radius: 8px;
  text-align: center;
}


```


## 兼容性

[caniuse.com/?search=aut…\[1\]](http://caniuse.com/?search=aut…\[1] "caniuse.com/?search=aut…\[1]")

![](https://mmbiz.qpic.cn/mmbiz_jpg/lCQLg02gtibsUkgDmqCRDdfVibJdE7sTyKvl8iaeWHFz0sfuYtYauCvKZmwYbELLfXsOTJfdcIYrJibaghzSBgZe4g/640?wx_fmt=other\&from=appmsg\&tp=webp\&wxfrom=5\&wx_lazy=1)

## 🎯 什么时候用 auto-fill，什么时候用 auto-fit？

- **「希望每行 ****“有多少内容就撑多宽****”，用**\*\*`auto-fit`」\*\*

  适合卡片式布局、相册、响应式按钮等。
- **「希望 “****固定列数 / 有占位****”，用**\*\*`auto-fill`」\*\*

  比如表格、日历，或者你希望网格始终对齐，即使内容不满。

## 📝 总结

| 属性        | 空轨道 | 内容拉伸 | 适用场景      |
| --------- | --- | ---- | --------- |
| auto-fill | 保留  | 否    | 固定列数、占位网格 |
| auto-fit  | 折叠  | 是    | 流式布局、拉伸填充 |

## 小结

- `auto-fill`更像 “占位”，`auto-fit`更像 “自适应”
- 推荐大部分响应式卡片用`auto-fit`
- 善用`minmax`配合，让列宽自适应得更自然
