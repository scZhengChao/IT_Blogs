# 双圆角

## 目录

- [效果图](#效果图)
- [分析](#分析)
- [代码结构](#代码结构)
  - [1. 顶部圆角实现](#1-顶部圆角实现)
  - [2. 底部外圆角实现(借助 CSS3 伪元素)](#2-底部外圆角实现借助-CSS3-伪元素)
  - [3. 使用 box-shadow 覆盖外圆角没有覆盖的区域](#3-使用-box-shadow-覆盖外圆角没有覆盖的区域)

[   https://juejin.cn/post/7070906612885487624](https://juejin.cn/post/7070906612885487624 "   https://juejin.cn/post/7070906612885487624")

## 效果图

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b526725b9dad4dee9d07e73415a06ea4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 分析

一个带圆角的矩形 + 左右对称的不规则图形（一个小矩形分别去掉一个圆角），利用伪元素 `::before` `::after` 和 `box-shadow` 阴影实现。

![](./image/image_Ktq0A7dxTv.png)

![](./image/image_M1XGgs4EJe.png)

![](./image/image_jNd1qJrhkz.png)

![](./image/image_9GGvmhCevF.png)

## 代码结构

```javascript 
<div class="tab-box">
    <div class="tab-item">TAB 1</div>
    <div class="tab-item active">TAB 2</div>
    <div class="tab-item">TAB 3</div>
    <div class="tab-item">TAB 4</div>
</div>

```


```javascript 
* {
    margin: 0;
    padding: 0;
}
.tab-box {
    display: flex;
    align-items: center;
    background: #e44f26;
}
.tab-box .tab-item {
    position: relative;
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    background: #e44f26;
}
.tab-box .active {
    background: #fff;
    color: #333;
    z-index: 1;
}

```


![](./image/image_x_ZykKacnr.png)

#### 1. 顶部圆角实现

```javascript 
.tab-box .active {
    border-radius: 20px 20px 0 0;
}

```


![](./image/image_G2emaSsXJo.png)

#### 2. 底部外圆角实现(借助 CSS3 伪元素)

```javascript 
.tab-box .active::before {
    content: "";
    position: absolute;
    left: -21px;
    bottom: 0;
    width: 21px;
    height: 50px;
    background: white;
    border-radius: 0 0 20px 0;
}
.tab-box .active::after {
    content: "";
    position: absolute;
    right: -21px;
    bottom: 0;
    width: 21px;
    height: 50px;
    background: white;
    border-radius: 0 0 0 20px;
}

```


![](./image/image_MkkYBFvcId.png)

### 3. 使用 `box-shadow` 覆盖外圆角没有覆盖的区域

```javascript 
.tab-box .active {
    box-shadow: 20px 20px 0 0 blue, -20px 20px 0 0 blue;
}

```


![](./image/image_243OAlZ3Or.png)

将蓝色改回白色，左右外圆角底色改成橙色

![](./image/image_PKlMuerrUd.png)

```javascript 
.tab-box .active::before {
    background: #e44f26;
}
.tab-box .active::after {
    background: #e44f26;
}

```


![](./image/image_uRgcKAqFys.png)
