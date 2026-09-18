# SCSS Mixin 语法详解

## 目录

- [基本语法](#基本语法)
  - [定义 Mixin](#定义-Mixin)
  - [使用 Mixin (包含 Mixin)](#使用-Mixin-包含-Mixin)
- [参数用法](#参数用法)
  - [1. 无参数 Mixin](#1-无参数-Mixin)
  - [2. 带参数 Mixin](#2-带参数-Mixin)
  - [3. 默认参数](#3-默认参数)
  - [4. 可变参数 (参数列表)](#4-可变参数-参数列表)
- [高级用法](#高级用法)
  - [内容块 (@content)](#内容块-content)
  - [Mixin 嵌套](#Mixin-嵌套)
- [实际应用示例](#实际应用示例)

Mixin 是 SCSS 中一种强大的代码复用机制，允许你定义可重用的样式块，并在需要的地方包含它们。以下是 SCSS Mixin 的完整语法和使用方法：

## 基本语法

### 定义 Mixin

```sass (sass) 
@mixin mixin-name($param1, $param2: default-value) {
  // CSS 属性和规则
  property: $param1;
  other-property: $param2;
}
```


### 使用 Mixin (包含 Mixin)

```sass (scss) 
.selector {
  @include mixin-name(value1, value2);
}
```


## 参数用法

### 1. 无参数 Mixin

```sass (scss) 
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

ul {
  @include reset-list;
}
```


### 2. 带参数 Mixin

```sass (scss) 
@mixin border-radius($radius) {
  border-radius: $radius;
}

.box {
  @include border-radius(10px);
}
```


### 3. 默认参数

```sass (sass) 
@mixin box-shadow($x: 0, $y: 0, $blur: 5px, $color: #000) {
  box-shadow: $x $y $blur $color;
}

.card {
  @include box-shadow($y: 10px, $color: rgba(0,0,0,0.2));
}
```


### 4. 可变参数 (参数列表)

```sass (scss) 
@mixin transition($properties...) {
  transition: $properties;
}

.element {
  @include transition(color 0.3s ease, background 0.5s linear);
}
```


## 高级用法

### 内容块 (@content)

```sass (sass) 
@mixin media($width) {
  @media (min-width: $width) {
    @content;
  }
}

.container {
  @include media(768px) {
    max-width: 720px;
  }
}

```


### Mixin 嵌套

```sass (scss) 
@mixin button-base {
  display: inline-block;
  padding: 0.5em 1em;
}

@mixin button-primary {
  @include button-base;
  background: blue;
  color: white;
}

.btn {
  @include button-primary;
}
```


## 实际应用示例

```sass (sass) 
// 定义响应式断点 Mixin
@mixin respond-to($breakpoint) {
  @if $breakpoint == phone {
    @media (max-width: 599px) { @content; }
  } @else if $breakpoint == tablet {
    @media (min-width: 600px) { @content; }
  } @else if $breakpoint == desktop {
    @media (min-width: 900px) { @content; }
  }
}

// 使用
.sidebar {
  width: 100%;
  
  @include respond-to(tablet) {
    width: 300px;
  }
}
```


Mixin 是\*\* SCSS 中非常强大的功能，可以大大减少代码重复，提高样式表的可维护性。\*\*
