# arc 圆弧

## 目录

- [arc() 方法概述](#arc-方法概述)
- [参数说明](#参数说明)
- [角度与弧度的转换](#角度与弧度的转换)
- [使用场景](#使用场景)
- [示例代码](#示例代码)
  - [绘制扇形（90度）](#绘制扇形90度)
  - [绘制逆时针弧线](#绘制逆时针弧线)
  - [4. 创建圆形进度条](#4-创建圆形进度条)
- [性能考虑](#性能考虑)
- [与其他方法的比较](#与其他方法的比较)
- [实际应用建议](#实际应用建议)
- [注意事项](#注意事项)

## arc() 方法概述

`arc()`是 Canvas 2D API 中用于**绘制圆弧或圆形**的方法。它是创建圆形、扇形和弧线的基础方法。

```javascript 
context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
```


## 参数说明

- `x`(Number): **圆心的 x 坐标**
- `y`(Number): **圆心的 y 坐标**
- `radius`(Number): **圆弧的半径**
- `startAngle`(Number): **起始角**，以弧度计（不是角度）
- `endAngle`(Number **):** \*\* 结束角\*\*，以弧度计
- `anticlockwise`(可选, Boolean): 可选。规定**应该逆时针还是顺时针绘图**。False = 顺时针，true = 逆时针

## 角度与弧度的转换

JavaScript 使用弧度而不是角度来表示角度。转换公式：

```javascript 
// 角度转弧度
const radians = degrees * Math.PI / 180;

// 弧度转角度
const degrees = radians * 180 / Math.PI;
```


## 使用场景

1. 绘制完整的圆形
2. 绘制扇形或圆弧
3. 创建饼图、进度条等图表
4. 绘制圆形进度指示器
5. 创建圆形按钮或UI元素

## 示例代码

### 绘制扇形（90度）

```html 
<canvas id="sectorCanvas" width="300" height="300"></canvas>
<script>
  const canvas = document.getElementById('sectorCanvas');
  const ctx = canvas.getContext('2d');
  
  // 绘制蓝色扇形（90度）
  ctx.beginPath();
  ctx.arc(150, 150, 100, 0, Math.PI / 2);
  ctx.lineTo(150, 150); // 闭合路径
  ctx.fillStyle = 'blue';
  ctx.fill();
</script>
```


### 绘制逆时针弧线

![](image_ck2zC8m23G.png)

```html 
<canvas id="arcCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('arcCanvas');
  const ctx = canvas.getContext('2d');
  
  // 绘制两条弧线对比
  ctx.beginPath();
  ctx.arc(100, 100, 80, 0, Math.PI * 1.5);
  ctx.strokeStyle = 'green';
  ctx.stroke();
  
  ctx.beginPath();
  ctx.arc(300, 100, 80, 0, Math.PI * 1.5, true); // 逆时针
  ctx.strokeStyle = 'purple';
  ctx.stroke();
  
  // 添加标签
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText('顺时针', 50, 190);
  ctx.fillText('逆时针', 250, 190);
</script>
```


### 4. 创建圆形进度条

![](image_KS58IKI-KV.png)

```html 
<canvas id="progressCanvas" width="200" height="200"></canvas>
<script>
  const canvas = document.getElementById('progressCanvas');
  const ctx = canvas.getContext('2d');
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;
  const progress = 0.75; // 75%进度
  
  function drawProgressCircle(progress) {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景圆
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // 绘制进度圆弧
    ctx.beginPath();
    ctx.arc(
      centerX, 
      centerY, 
      radius, 
      -Math.PI / 2, // 从顶部开始
      -Math.PI / 2 + 2 * Math.PI * progress, // 计算结束角度
      false // 顺时针
    );
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 10;
    ctx.stroke();
    
    // 绘制百分比文本
    ctx.fillStyle = '#333';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${Math.round(progress * 100)}%`, centerX, centerY);
  }
  
  drawProgressCircle(progress);
</script>
```


## 性能考虑

1. **路径重用**：对于**静态圆弧，创建一次路径并重复使用比每次重新绘制更高效**
2. **减少重绘**：**只重绘变化的部分**，而不是整个画布
3. **批量绘制**：将多个圆弧绘制操作合并到一个路径中，减少状态切换
4. **避免小半径**：非常小的圆弧在高分辨率下可能看起来锯齿状，考虑使用抗锯齿或更大的半径

## 与其他方法的比较

1. **arc() vs arcTo()**:
   - `arc()`: 直接绘制圆弧
   - `arcTo()`: 使用切线绘制圆弧，常用于创建圆角矩形
2. **arc() vs ellipse()**:
   - `arc()`: 只能绘制圆形或圆形扇区
   - `ellipse()`: 可以绘制椭圆和椭圆扇区

## 实际应用建议

1. **圆形按钮**：使用`arc()`绘制圆形，添加点击事件
2. **数据可视化**：创建饼图、环形图等
3. **游戏开发**：绘制圆形角色、子弹轨迹等
4. **UI组件**：进度条、加载动画等

## 注意事项

- 角度使用弧度制，不是角度制
- 闭合路径时记得使用`lineTo()`回到起点
- 对于复杂的圆形图形，考虑使用`clip()`方法裁剪
- 在动画中，考虑使用`requestAnimationFrame`提高性能
