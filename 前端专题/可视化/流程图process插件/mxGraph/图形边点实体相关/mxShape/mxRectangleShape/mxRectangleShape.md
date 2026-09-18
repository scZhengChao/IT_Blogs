# mxRectangleShape

## 目录

- [作用](#作用)
- [基本用法](#基本用法)
  - [1. 直接创建矩形形状](#1-直接创建矩形形状)
  - [2. 作为自定义单元格的原型](#2-作为自定义单元格的原型)
  - [3. 扩展自定义矩形形状](#3-扩展自定义矩形形状)
- [构造函数参数](#构造函数参数)
- [实际应用场景](#实际应用场景)

`mxRectangleShape`是 mxGraph 中用于绘制矩形图形的基础形状类，它是`mxShape`的子类。

## 作用

`mxRectangleShape`主要用于：

- 创建自定义的矩形图形
- 作为其他复杂图形的基础
- 在 mxGraph 中表示矩形顶点(vertex)的视觉呈现

## 基本用法

### 1. 直接创建矩形形状

```javascript 
// 创建一个矩形形状
var rect = new mxRectangleShape(
  new mxRectangle(x, y, width, height), // 矩形边界
  fillColor,    // 填充颜色
  strokeColor,  // 边框颜色
  strokeWidth   // 边框宽度
);

// 将形状添加到图形中
rect.paint(canvas.getGraphics());
```


### 2. 作为自定义单元格的原型

更常见的用法是作为自定义单元格的基础：

```javascript 
// 定义一个自定义矩形单元格
function CustomRectangle() {
  mxCellRenderer.registerShape('customRect', mxRectangleShape);
  
  // 创建顶点样式
  var style = graph.getStylesheet().getDefaultVertexStyle();
  style[mxConstants.STYLE_SHAPE] = 'customRect';
  style[mxConstants.STYLE_FILLCOLOR] = '#FF9900';
  
  // 创建使用此形状的顶点
  var vertex = graph.insertVertex(parent, null, 'Custom Rectangle', x, y, w, h, 'shape=customRect');
}
```


### 3. 扩展自定义矩形形状

可以继承`mxRectangleShape`来创建自定义变体：

```javascript 
function RoundedRectangle() {
  mxRectangleShape.call(this);
}
mxUtils.extend(RoundedRectangle, mxRectangleShape);

RoundedRectangle.prototype.paintVertexShape = function(c, x, y, w, h) {
  var r = Math.min(w / 4, h / 4); // 圆角半径
  c.roundrect(x, y, w, h, r, r);
  c.fillAndStroke();
};

// 注册并使用这个自定义形状
mxCellRenderer.registerShape('roundedRect', RoundedRectangle);
```


## 构造函数参数

`new mxRectangleShape(bounds, fill, stroke, strokewidth)`

- `bounds`: mxRectangle 对象，定义位置和大小
- `fill`: 填充颜色
- `stroke`: 边框颜色
- `strokewidth`: 边框宽度

## 实际应用场景

1. 创建具有特殊样式的矩形节点
2. 实现带有圆角或其他变体的矩形
3. 作为更复杂图形的基础组件
4. 在自定义渲染器中使用

`mxRectangleShape`是 mxGraph 可视化基础的重要组成部分，理解它的用法有助于创建自定义图形和扩展 mxGraph 的功能。
