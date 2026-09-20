# stroke

## 目录

- [基本语法](#基本语法)
- [使用步骤](#使用步骤)
- [示例代码](#示例代码)
  - [线条样式设置](#线条样式设置)
  - [路径动画示例](#路径动画示例)
- [性能考虑](#性能考虑)
- [常见问题](#常见问题)
  - [1. 为什么我的线条不显示？](#1-为什么我的线条不显示)
  - [2. 如何实现虚线动画？](#2-如何实现虚线动画)
  - [3. 如何绘制抗锯齿的线条？](#3-如何绘制抗锯齿的线条)
- [最佳实践](#最佳实践)

* 使用strokeStyle的颜色，默认是黑色

`ctx.stroke()`是 Canvas 2D API 中用于绘制路径轮廓的方法，它会使用当前设置的`strokeStyle`来绘制路径的边缘线条。

## 基本语法

```javascript 
ctx.stroke();
```


## 使用步骤

1. 使用`beginPath()`开始新路径
2. 使用绘图方法创建路径（如`rect()`,`arc()`,`moveTo()`,`lineTo()`等）
3. 设置`strokeStyle`定义线条样式
4. 调用`stroke()`方法绘制路径轮廓

## 示例代码

### 线条样式设置

![](./image/image_yPYZfaNqGb.png)

```html 
<canvas id="canvas2" width="300" height="200"></canvas>
<script>
  const canvas = document.getElementById('canvas2');
  const ctx = canvas.getContext('2d');
  
  // 设置线条样式
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(250, 50);
  ctx.lineTo(250, 150);
  ctx.lineTo(50, 150);
  ctx.closePath();
  
  // 设置线条颜色和宽度
  ctx.strokeStyle = 'green';
  ctx.lineWidth = 5;
  
  // 设置线条端点样式
  ctx.lineCap = 'round'; // butt | round | square
  
  // 设置线条连接样式
  ctx.lineJoin = 'bevel'; // bevel | round | miter
  
  // 设置虚线模式
  ctx.setLineDash([10, 5]); // [实线长度, 虚线间隔]
  
  ctx.stroke();
</script>
```


### 路径动画示例

![](./image/image_DBsDksetiF.png)

```javascript 
<canvas id="canvas4" width="300" height="200"></canvas>
<script>
  const canvas = document.getElementById('canvas4');
  const ctx = canvas.getContext('2d');
  
  let progress = 0;
  
  function draw() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景圆
    ctx.beginPath();
    ctx.arc(150, 100, 80, 0, Math.PI * 2);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // 绘制进度圆弧
    ctx.beginPath();
    ctx.arc(
      150, 100, 
      80, 
      -Math.PI/2, 
      -Math.PI/2 + Math.PI * 2 * progress,
      false
    );
    
    // 设置进度样式
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // 更新进度
    progress += 0.01;
    if (progress > 1) progress = 0;
    
    requestAnimationFrame(draw);
  }
  
  draw();
</script>
```


## 性能考虑

1. **减少路径复杂度**：简单路径比复杂路径绘制更快
2. **避免频繁重绘**：只在需要时调用`stroke()`
3. **使用离屏画布**：对于静态内容，先绘制到离屏画布
4. **批量绘制**：将多个描边操作合并到一个路径中

## 常见问题

### 1. 为什么我的线条不显示？

- 确保调用了`beginPath()`开始新路径
- 检查`strokeStyle`是否设置为有效颜色
- 确认`lineWidth`大于0
- 检查路径是否正确闭合（对于某些情况）

### 2. 如何实现虚线动画？

使用`setLineDash()`和`lineDashOffset`：

```javascript 
ctx.setLineDash([10, 5]); // 10px实线，5px间隔
let offset = 0;

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(250, 50);
  
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 5]);
  ctx.lineDashOffset = -offset; // 负值实现动画效果
  ctx.stroke();
  
  offset += 0.5;
  if (offset > 15) offset = 0;
  
  requestAnimationFrame(animate);
}
```


### 3. 如何绘制抗锯齿的线条？

Canvas 默认会进行抗锯齿处理，但可以通过以下方式优化：

- 使用偶数线宽
- 确保线条起点和终点对齐像素网格
- **对于精确控制，考虑使用图像替代**

## 最佳实践

1. **设置线条样式**：在绘制前设置所有样式属性
2. **使用路径缓存**：对于重复绘制的复杂路径
3. **管理状态**：使用`save()`和`restore()`保存/恢复绘图状态
4. **动画优化**：对于动画，尽量减少每次重绘的内容

`ctx.stroke()`是 Canvas 绘图中不可或缺的方法，掌握它可以创建各种线条效果，从简单的直线到复杂的路径描边。通过合理设置线条样式和优化绘制过程，可以实现高效且美观的绘图效果。
