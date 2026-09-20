# fillStyle

## 目录

- [基本语法](#基本语法)
- [支持的值类型](#支持的值类型)
- [示例代码](#示例代码)
  - [渐变填充](#渐变填充)
    - [线性渐变](#线性渐变)
    - [径向渐变](#径向渐变)
  - [3. 图案填充](#3-图案填充)
- [注意事项](#注意事项)
- [实际应用示例](#实际应用示例)
  - [1. 彩虹渐变效果](#1-彩虹渐变效果)
  - [2. 棋盘格图案](#2-棋盘格图案)
  - [3. 渐变按钮效果](#3-渐变按钮效果)

设置填充**样式的属性，它决定了绘制形状时内部区域的填充颜色或图案**

## 基本语法

```javascript 
ctx.fillStyle = color | gradient | pattern;
```


## 支持的值类型

`fillStyle`可以接受以下类型的值：

1. **颜色值**（最常用）
   - 颜色名称：`"red"`,`"blue"`,`"green"`等
   - 十六进制：`"#FF0000"`,`"#00FF00"`,`"#0000FF"`
   - RGB/RGBA：`"rgb(255, 0, 0)"`,`"rgba(255, 0, 0, 0.5)"`
   - HSL/HSLA：`"hsl(0, 100%, 50%)"`,`"hsla(0, 100%, 50%, 0.5)"`
2. **渐变对象**
   - 线性渐变：`createLinearGradient()`
   - 径向渐变：`createRadialGradient()`
3. **图案对象**
   - 使用`createPattern()`创建的图案

## 示例代码

### 渐变填充

#### 线性渐变

![](./assets/image/image_iDAcFX6dqg.png)

```javascript 
<canvas id="linearGradientCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('linearGradientCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建线性渐变
  const gradient = ctx.createLinearGradient(50, 50, 350, 150);
  gradient.addColorStop(0, 'red');    // 起始颜色
  gradient.addColorStop(0.5, 'yellow'); // 中间颜色
  gradient.addColorStop(1, 'green');  // 结束颜色
  
  ctx.fillStyle = gradient;
  ctx.fillRect(50, 50, 300, 100);
</script>
```


#### 径向渐变

![](./assets/image/image_yrbrplPJH0.png)

```html 
<canvas id="radialGradientCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('radialGradientCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建径向渐变
  const gradient = ctx.createRadialGradient(100, 100, 20, 200, 100, 80);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.5, 'yellow');
  gradient.addColorStop(1, 'green');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(150, 100, 70, 0, Math.PI * 2);
  ctx.fill();
</script>
```


### 3. 图案填充

![](./assets/image/image_816EktcWJW.png)

```html 
<canvas id="patternCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('patternCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建图案
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 20;
  patternCanvas.height = 20;
  const patternCtx = patternCanvas.getContext('2d');
  
  patternCtx.fillStyle = 'red';
  patternCtx.fillRect(0, 0, 10, 10);
  patternCtx.fillStyle = 'blue';
  patternCtx.fillRect(10, 0, 10, 10);
  patternCtx.fillStyle = 'green';
  patternCtx.fillRect(0, 10, 10, 10);
  patternCtx.fillStyle = 'yellow';
  patternCtx.fillRect(10, 10, 10, 10);
  
  const pattern = ctx.createPattern(patternCanvas, 'repeat');
  
  ctx.fillStyle = pattern;
  ctx.fillRect(50, 50, 300, 100);
</script>
```


## 注意事项

1. **默认值**：
   - `fillStyle`的默认值是`"#000000"`（黑色）
2. **颜色格式**：
   - 颜色名称区分大小写（虽然大多数浏览器不严格区分）
   - 十六进制格式可以省略前导的`#`（非标准，不推荐）
   - RGB/RGBA 和 HSL/HSLA 值的范围是 0-255 或 0%-100%
3. **性能考虑**：
   - 频繁更改`fillStyle`会影响性能
   - 尽量批量设置相同样式的绘制操作
4. **透明度**：
   - **使用 RGBA 或 HSLA 可以设置透明度**
   - 透明度值范围是 0（完全透明）到 1（完全不透明）
5. **图案和渐变**：
   - 图案和渐变对象可以重复使用
   - 修改已创建的渐变或图案会影响所有使用它的填充
6. **状态管理**：
   - 使用`save()`和`restore()`可以保存和恢复`fillStyle`状态
   - 这对于复杂的绘图操作很有用

## 实际应用示例

### 1. 彩虹渐变效果

![](./assets/image/image_L3Lj5Iynrd.png)

```javascript 
<canvas id="rainbowCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('rainbowCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建彩虹渐变
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  
  for (let i = 0; i < colors.length; i++) {
    gradient.addColorStop(i / (colors.length - 1), colors[i]);
  }
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
</script>
```


### 2. 棋盘格图案

![](./assets/image/image_fnXruDkKX3.png)

```html 
<canvas id="checkerboardCanvas" width="400" height="400"></canvas>
<script>
  const canvas = document.getElementById('checkerboardCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建棋盘格图案
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = 40;
  patternCanvas.height = 40;
  const patternCtx = patternCanvas.getContext('2d');
  
  // 绘制黑白方格
  patternCtx.fillStyle = 'black';
  patternCtx.fillRect(0, 0, 20, 20);
  patternCtx.fillRect(20, 20, 20, 20);
  patternCtx.fillStyle = 'white';
  patternCtx.fillRect(20, 0, 20, 20);
  patternCtx.fillRect(0, 20, 20, 20);
  
  const pattern = ctx.createPattern(patternCanvas, 'repeat');
  
  ctx.fillStyle = pattern;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
</script>
```


### 3. 渐变按钮效果

![](./assets/image/image_lwvb1xJ7Dx.png)

```javascript 
<canvas id="buttonCanvas" width="200" height="100"></canvas>
<script>
  const canvas = document.getElementById('buttonCanvas');
  const ctx = canvas.getContext('2d');
  
  function drawButton(x, y, width, height, hover) {
    // 创建径向渐变
    const gradient = ctx.createRadialGradient(
      x + width/2, y + height/2, 0,
      x + width/2, y + height/2, Math.max(width, height)/2
    );
    
    if (hover) {
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.5, 'rgba(0, 128, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 100, 200, 0.8)');
    } else {
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
      gradient.addColorStop(0.5, 'rgba(0, 100, 200, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 80, 160, 0.8)');
    }
    
    // 绘制按钮
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, 10);
    ctx.fill();
    
    // 添加边框
    ctx.strokeStyle = hover ? 'rgba(0, 150, 255, 0.8)' : 'rgba(0, 100, 200, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // 添加文字
    ctx.fillStyle = hover ? 'white' : '#cceeff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('按钮', x + width/2, y + height/2);
  }
  
  let isHover = false;
  
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    isHover = mouseX > 50 && mouseX < 150 && mouseY > 25 && mouseY < 75;
    drawButton(50, 25, 100, 50, isHover);
  });
  
  // 初始绘制
  drawButton(50, 25, 100, 50, isHover);
</script>


```
