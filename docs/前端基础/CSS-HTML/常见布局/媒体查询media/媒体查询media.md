# 媒体查询media

## 目录

- [基本语法](#基本语法)
  - [示例代码](#示例代码)
- [媒体类型](#媒体类型)
  - [示例](#示例)
- [常用媒体特性](#常用媒体特性)
  - [视口/窗口尺寸](#视口窗口尺寸)
  - [设备特性](#设备特性)
- [逻辑操作符](#逻辑操作符)
- [响应式设计常用断点](#响应式设计常用断点)
- [现代CSS中的替代方案](#现代CSS中的替代方案)
- [性能考虑](#性能考虑)

## 基本语法

媒体查询由**媒体类型和零个或多个媒体特性表达式组成**：

```css 
@media media-type and (media-feature-rule) {
  /* CSS规则 */
}
```


### 示例代码

```html 
<!DOCTYPE html>
<html>
<head>
<style>
  body {
    background-color: lightgreen;
  }

  /* 当视口宽度小于等于600px时应用的样式 */
  @media screen and (max-width: 600px) {
    body {
      background-color: lightblue;
    }
  }
</style>
</head>
<body>
  <p>调整浏览器窗口大小查看效果。当宽度小于等于600px时，背景色会变为浅蓝色。</p>
</body>
</html>
```


## 媒体类型

常用媒体类型包括：

- `all`- 所有设备（默认）
- `screen`- 屏幕设备（电脑、平板、手机等）
- `print`- 打印或打印预览模式
- `speech`- 语音合成器

### 示例

```css 
/* 打印时隐藏导航 */
@media print {
  nav {
    display: none;
  }
}
```


## 常用媒体特性

### 视口/窗口尺寸

- `width`/`min-width`/`max-width`- 视口宽度
- `height`/`min-height`/`max-height`- 视口高度

```css 
/* 视口宽度在600px到900px之间 */
@media (min-width: 600px) and (max-width: 900px) {
  .column {
    width: 50%;
  }
}
```


### 设备特性

- `orientation`- 方向（portrait竖屏/landscape横屏）
- `aspect-ratio`- 宽高比
- `resolution`- 分辨率
- `hover`- 设备是否支持悬停

```css 
/* 横屏设备 */
@media (orientation: landscape) {
  body {
    flex-direction: row;
  }
}

/* 高分辨率设备 */
@media (min-resolution: 2dppx) {
  .logo {
    background-image: url("logo@2x.png");
  }
}
```


## 逻辑操作符

- `and`- 同时满足多个条件
- `,`(相当于`or`) - 满足任意一个条件
- `not`- 否定整个查询

```css 
/* 宽度在600-900px之间且横屏 */
@media (min-width: 600px) and (max-width: 900px) and (orientation: landscape) {
  /* ... */
}

/* 宽度小于600px或大于1200px */
@media (max-width: 600px), (min-width: 1200px) {
  /* ... */
}

/* 非屏幕设备 */
@media not screen {
  /* ... */
}
```


## 响应式设计常用断点

虽然具体断点应根据内容决定，但以下是一些常用参考值：

```css 
/* 小设备 (手机，600px及以下) */
@media only screen and (max-width: 600px) {...}

/* 中等设备 (平板，768px及以下) */
@media only screen and (max-width: 768px) {...}

/* 大设备 (笔记本/台式机，992px及以下) */
@media only screen and (max-width: 992px) {...}

/* 超大设备 (大桌面，1200px及以上) */
@media only screen and (min-width: 1200px) {...}
```


## 现代CSS中的替代方案

虽然媒体查询非常强大，但现代CSS也提供了其他响应式解决方案：

1. **Flexbox和Grid布局** - 本身具有响应式特性
2. **容器查询** - **根据容器尺寸而非视口尺寸应用样式**
3. **CSS变量** - 结合媒体查询更灵活地控制样式
4. **相对单位** - 使用vw、vh、%等相对单位

## 性能考虑

- **将媒体查询放在尽可能靠近相关选择器的地方**
- 避免过多的媒体查询断点
- 使用`<link media="">`属性有条件地加载样式表

```html 
<!-- 只在打印时加载 -->
<link rel="stylesheet" media="print" href="print.css">
```
