# quadraticCurveTo

## 目录

- [基本语法](#基本语法)
- [参数说明](#参数说明)
- [工作原理](#工作原理)
- [示例代码](#示例代码)
  - [1. 基本二次贝塞尔曲线](#1-基本二次贝塞尔曲线)
  - [2. 动态控制曲线](#2-动态控制曲线)
  - [3. 绘制二次贝塞尔曲线组成的图形](#3-绘制二次贝塞尔曲线组成的图形)

`quadraticCurveTo()`是 Canvas 2D API 中用于绘制二次贝塞尔曲线的方法，它通过**一个控制点和两个端点**来定义曲线形状。

可以参考这个笔记：[贝塞尔曲线](../../../../svg/教程/贝塞尔曲线/index.md "贝塞尔曲线")

## 基本语法

```javascript 
ctx.quadraticCurveTo(cpx, cpy, x, y);
```


## 参数说明

- `cpx`(Number): 控制点的 x 坐标
- `cpy`(Number): 控制点的 y 坐标
- `x`(Number): 曲线终点的 x 坐标
- `y`(Number): 曲线终点的 y 坐标

## 工作原理

二次贝塞尔曲线由三个点定义：

1. **起始点**（由`moveTo()`或**前一条线段的终点确定**）
2. **控制点**`(cpx, cpy)`- 决定曲线的弯曲方向和程度
3. **终点**`(x, y)`

曲线从起始点开始，经过控制点的影响，最终到达终点。

## 示例代码

### 1. 基本二次贝塞尔曲线

![](./assets/image/image_z9XRPmllZE.png)

```html 
<canvas id="curveCanvas" width="400" height="300"></canvas>
<script>
  const canvas = document.getElementById('curveCanvas');
  const ctx = canvas.getContext('2d');
  
  // 移动到起始点
  ctx.beginPath();
  ctx.moveTo(50, 200);
  
  // 绘制二次贝塞尔曲线
  ctx.quadraticCurveTo(200, 50, 350, 200);
  
  // 设置样式并绘制
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // 添加控制点标记
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(200, 50, 5, 0, Math.PI * 2);
  ctx.fill();
  
  // 添加标签
  ctx.fillStyle = 'black';
  ctx.font = '14px Arial';
  ctx.fillText('控制点 (200,50)', 200, 40);
</script>
```


### 2. 动态控制曲线

![](./assets/image/image_gqG6SVIBt1.png)

```html 
<canvas id="dynamicCanvas" width="400" height="300"></canvas>
<script>
  const canvas = document.getElementById('dynamicCanvas');
  const ctx = canvas.getContext('2d');
  
  let cpX = 200;
  let cpY = 100;
  
  function drawCurve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 起始点和终点
    const startX = 50;
    const startY = 150;
    const endX = 350;
    const endY = 150;
    
    // 绘制曲线
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(cpX, cpY, endX, endY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // 绘制控制点
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(cpX, cpY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制控制线
    ctx.strokeStyle = 'rgba(255,0,0,0.3)';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(cpX, cpY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  
  // 初始绘制
  drawCurve();
  
  // 添加交互 - 拖动控制点
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // 检查是否点击了控制点
    const distance = Math.sqrt((mouseX - cpX) ** 2 + (mouseY - cpY) ** 2);
    if (distance < 10) {
      canvas.addEventListener('mousemove', moveControlPoint);
      canvas.addEventListener('mouseup', stopMoving);
    }
  });
  
  function moveControlPoint(e) {
    const rect = canvas.getBoundingClientRect();
    cpX = e.clientX - rect.left;
    cpY = e.clientY - rect.top;
    drawCurve();
  }
  
  function stopMoving() {
    canvas.removeEventListener('mousemove', moveControlPoint);
    canvas.removeEventListener('mouseup', stopMoving);
  }
</script>
```


### 3. 绘制二次贝塞尔曲线组成的图形

![](./assets/image/image_geTR3dKlT4.png)

```javascript 
<canvas id="shapeCanvas" width="400" height="300"></canvas>
<script>
  const canvas = document.getElementById('shapeCanvas');
  const ctx = canvas.getContext('2d');
  
  function drawHeart() {
    ctx.beginPath();
    ctx.moveTo(200, 100);
    
    // 左上曲线
    ctx.quadraticCurveTo(150, 50, 175, 150);
    
    // 右上曲线
    ctx.quadraticCurveTo(225, 50, 200, 100);
    
    // 左下曲线
    ctx.quadraticCurveTo(150, 200, 200, 225);
    
    // 右下曲线
    ctx.quadraticCurveTo(250, 200, 200, 100);
    
    // 修正路径 - 实际上需要重新组织点来正确绘制心形
    // 上面的代码有误，正确的心形应该这样绘制：
    ctx.beginPath();
    ctx.moveTo(200, 115);
    ctx.quadraticCurveTo(160, 80, 175, 140);
    ctx.quadraticCurveTo(190, 180, 200, 150);
    ctx.quadraticCurveTo(210, 180, 225, 140);
    ctx.quadraticCurveTo(240, 80, 200, 115);
    
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'darkred';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  
  drawHeart();
</script>
```
