# 锯齿不圆润解决方案

## 目录

- [1. 开启抗锯齿与图像平滑](#1-开启抗锯齿与图像平滑)
- [2. 优化路径采样率（核心方案）](#2-优化路径采样率核心方案)
- [3. 设置圆角线条属性](#3-设置圆角线条属性)
- [4. 使用贝塞尔曲线平滑路径（进阶方案）](#4-使用贝塞尔曲线平滑路径进阶方案)
- [5. 高分辨率绘制 + 缩放（应对放大场景）](#5-高分辨率绘制--缩放应对放大场景)
- [性能影响说明](#性能影响说明)
- [完整可运行代码](#完整可运行代码)

### 1. 开启抗锯齿与图像平滑

Canvas 默认会开启抗锯齿，但在放大时仍可能出现锯齿。可显式开启高级图像平滑：

```javascript 
ctx.imageSmoothingEnabled = true;    // 默认已开启，但某些浏览器需要显式设置
ctx.imageSmoothingQuality = 'high';  // 设置抗锯齿质量
```


### 2. 优化路径采样率（核心方案）

手绘时如果鼠标移动**采样点过少，路径会由稀疏的直线段组成**。需在`mousemove`事件中 **密集采样坐标点**，或通过**插值算法补充中间点**：

```javascript 
let lastX, lastY;

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (lastX && lastY) {
    // 线性插值补充中间点（示例补充2个点）
    const points = interpolatePoints(lastX, lastY, x, y, 2);
    points.forEach(point => {
      ctx.lineTo(point.x, point.y);
    });
  } else {
    ctx.moveTo(x, y);
  }

  ctx.stroke();
  lastX = x;
  lastY = y;
});

// 线性插值函数
function interpolatePoints(x1, y1, x2, y2, steps) {
  const points = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / (steps + 1);
    points.push({
      x: x1 + (x2 - x1) * t,
      y: y1 + (y2 - y1) * t
    });
  }
  return points;
}
```


### 3. 设置圆角线条属性

通过修改线条连接和端点样式，强制让转角处呈现圆润效果：

```javascript 
ctx.lineJoin = 'round';  // 线条连接处圆角
ctx.lineCap = 'round';   // 线条末端圆角
```


### 4. 使用贝塞尔曲线平滑路径（进阶方案）

用二次贝塞尔曲线 (`quadraticCurveTo`) 替代直线段 (`lineTo`)，通过计算控制点实现自动平滑：

```javascript 
// 在 mousemove 中使用贝塞尔曲线插值
canvas.addEventListener('mousemove', (e) => {
  // ... 获取坐标 x, y ...

  if (lastX && lastY) {
    const cpX = (lastX + x) / 2;  // 控制点取中点
    const cpY = (lastY + y) / 2;
    ctx.quadraticCurveTo(cpX, cpY, x, y);
  } else {
    ctx.moveTo(x, y);
  }

  ctx.stroke();
  lastX = x;
  lastY = y;
});
```


### 5. 高分辨率绘制 + 缩放（应对放大场景）

在高 DPI 设备上，先在高分辨率画布上绘制，再缩放到显示尺寸：

```javascript 
const scale = window.devicePixelRatio || 1;
canvas.width = canvas.clientWidth * scale;
canvas.height = canvas.clientHeight * scale;
ctx.scale(scale, scale);

// 绘制时所有坐标需除以 scale
ctx.lineTo(x / scale, y / scale);
```


### 性能影响说明

1. **插值采样**：增加计算量，但现代浏览器可轻松处理数千个点。
2. **贝塞尔曲线**：计算控制点会略微增加 CPU 负载，适合中低频绘制场景。
3. **高分辨率绘制**：内存占用增加 (4x 分辨率 → 4x 内存)，建议在 Retina 屏上使用

### 完整可运行代码

```javascript 
<canvas id="canvas" width="400" height="400" style="border:1px solid"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  // 高分辨率适配
  const scale = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * scale;
  canvas.height = canvas.clientHeight * scale;
  ctx.scale(scale, scale);

  // 线条样式
  ctx.strokeStyle = '#2196f3';
  ctx.lineWidth = 4;
  ctx.lineJoin = 'round';  // 关键属性
  ctx.lineCap = 'round';   // 关键属性

  let lastX, lastY, isDrawing = false;

  canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const x = e.offsetX;
    const y = e.offsetY;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    
    // 贝塞尔曲线插值
    const cpX = (lastX + x) / 2;
    const cpY = (lastY + y) / 2;
    ctx.quadraticCurveTo(cpX, cpY, x, y);
    
    ctx.stroke();

    [lastX, lastY] = [x, y];
  });

  canvas.addEventListener('mouseup', () => isDrawing = false);
</script>
```
