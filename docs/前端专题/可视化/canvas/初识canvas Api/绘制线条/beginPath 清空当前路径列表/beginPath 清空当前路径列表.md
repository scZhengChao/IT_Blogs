# beginPath**清空当前路径列表**

## 目录

- [二、工作机制](#二工作机制)
- [三、核心用法场景](#三核心用法场景)
  - [1. 绘制多个独立图形](#1-绘制多个独立图形)
  - [2. 创建复合路径](#2-创建复合路径)
- [五、进阶应用](#五进阶应用)
  - [1. 路径复用](#1-路径复用)
  - [2. 复杂图形的路径合并](#2-复杂图形的路径合并)
- [七、性能建议](#七性能建议)

在 Canvas 2D API 中，`beginPath()`是一个基础且关键的方法，用于开始一个新的路径绘制。理解它的工作原理对掌握 Canvas 绘图至关重要。

**清空当前路径列表**，让你可以开始绘制一个全新的图形。它的核心意义在于：

- **隔离不同图形**：避免后续绘制影响之前的图形。
- **独立设置样式**：每个路径可以有独立的填充色、描边等属性。

### 二、工作机制

Canvas 的绘图系统维护一个**当前路径**（路径列表），当你调用绘图命令（如`arc()`、`lineTo()`）时，命令会被添加到这个路径中。`beginPath()`的作用是：

1. **清空当前路径**，创建一个空白路径。
2. **不影响已绘制的图形**：已绘制的内容不会被清除，只是后续绘制会基于新路径。

### 三、核心用法场景

#### 1. 绘制多个独立图形

```javascript 
const ctx = canvas.getContext('2d');

// 绘制红色圆形
ctx.beginPath(); // 开始新路径
ctx.arc(50, 50, 30, 0, Math.PI * 2);
ctx.fillStyle = 'red';
ctx.fill();

// 绘制蓝色矩形（无需新路径，但建议使用）
ctx.beginPath(); // 好习惯：明确开始新路径
ctx.rect(100, 50, 60, 40);
ctx.fillStyle = 'blue';
ctx.fill();
```


#### 2. 创建复合路径

```javascript 
ctx.beginPath(); // 开始一个复合路径
ctx.moveTo(50, 50);
ctx.lineTo(100, 50);
ctx.lineTo(75, 100);
ctx.closePath(); // 闭合路径（可选）
ctx.stroke();
```


### 五、进阶应用

#### 1. 路径复用

```javascript 
// 创建一个可复用的路径
const circlePath = new Path2D();
circlePath.arc(50, 50, 30, 0, Math.PI * 2);

// 多次使用该路径
ctx.fillStyle = 'red';
ctx.fill(circlePath);

ctx.beginPath(); // 清空当前路径
ctx.strokeStyle = 'blue';
ctx.stroke(circlePath); // 复用路径描边
```


#### 2. 复杂图形的路径合并

```javascript 
ctx.beginPath();
ctx.arc(50, 50, 30, 0, Math.PI * 2); // 大圆
ctx.moveTo(70, 50); // 避免连线
ctx.arc(70, 50, 10, 0, Math.PI * 2); // 小圆
ctx.fill(); // 填充复合路径
```


### 七、性能建议

1. **批量绘制**：将相关图形放在一个路径中，减少`beginPath()`调用。
2. **使用 Path2D 对象**：复杂路径可预创建并复用，提高性能。
