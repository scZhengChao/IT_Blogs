# moveTo移动起点

## 目录

- [一、基本概念](#一基本概念)
- [二、核心功能](#二核心功能)
  - [1. 设置绘图起点](#1-设置绘图起点)
  - [2. 分隔路径段](#2-分隔路径段)
  - [3. 绘制不连续图形](#3-绘制不连续图形)
- [三、关键注意事项](#三关键注意事项)
  - [1. 与beginPath()的关系](#1-与beginPath的关系)
  - [2. 路径连续性](#2-路径连续性)
  - [3. 闭合路径 (closePath())](#3-闭合路径-closePath)
- [五、性能优化建议](#五性能优化建议)

`moveTo()`是一个基础且核心的方法，**用于在画布上设置绘图起点。它不会直接绘制任何内容**，而是定义后续绘图命令（如`lineTo()`、`arc()`）的起始位置。理解`moveTo()`的工作机制对掌握 Canvas 路径绘制至关重要。

### 一、基本概念

**作用**：将当前**绘图位置移动到指定坐标，不会创建线条或填充区域。****语法**：`context.moveTo(x, y)
`**参数**：

- `x`：目标位置的水平坐标（像素）。
- `y`：目标位置的垂直坐标（像素）。

### 二、核心功能

#### 1. 设置绘图起点

```javascript 
ctx.beginPath();
ctx.moveTo(50, 50); // 将起点移动到 (50, 50)
ctx.lineTo(200, 50); // 从 (50, 50) 绘制到 (200, 50)
ctx.stroke(); // 绘制水平线
```


#### 2. 分隔路径段

```javascript 
ctx.beginPath();
ctx.moveTo(50, 50); // 第一段起点
ctx.lineTo(200, 50);

ctx.moveTo(50, 100); // 第二段起点（与第一段不连接）
ctx.lineTo(200, 100);

ctx.stroke(); // 绘制两条独立的水平线
```


#### 3. 绘制不连续图形

```javascript 
ctx.beginPath();
ctx.moveTo(50, 50); // 三角形起点
ctx.lineTo(100, 100);
ctx.lineTo(50, 100);
ctx.closePath(); // 闭合路径（自动回到起点）

ctx.moveTo(150, 50); // 第二个三角形起点（与第一个不连接）
ctx.lineTo(200, 100);
ctx.lineTo(150, 100);
ctx.closePath();

ctx.fill(); // 填充两个独立的三角形
```


### 三、关键注意事项

#### 1. 与`beginPath()`的关系

- `beginPath()`清空当前路径，`moveTo()`设置新路径的起点。
- 若省略`moveTo()`，首次绘图命令（如`lineTo()`）的起点默认为`(0, 0)`。

#### 2. 路径连续性

- 多次调用`moveTo()`会创建不连续的路径段，`fill()`会独立填充每个闭合区域。
- `stroke()`会绘制所有路径段，但不连接断开的部分。

#### 3. 闭合路径 (`closePath()`)

- `closePath()`会自动从当前点绘制一条线回到路径起点，无需手动`moveTo()`。

### 五、性能优化建议

1. **批量绘制**：

```javascript 
// 低效：多次调用 stroke()
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(50, 100);
ctx.lineTo(100, 100);
ctx.stroke();

// 高效：一次 stroke()
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.moveTo(50, 100);
ctx.lineTo(100, 100);
ctx.stroke();
```


1. **使用 Path2D 对象**：

```javascript 
const path = new Path2D();
path.moveTo(50, 50);
path.lineTo(100, 50);
path.moveTo(50, 100);
path.lineTo(100, 100);

// 可重复使用的高效路径
ctx.stroke(path);
```
