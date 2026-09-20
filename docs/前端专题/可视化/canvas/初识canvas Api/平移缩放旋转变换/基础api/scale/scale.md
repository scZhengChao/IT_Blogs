# scale

## 目录

- [核心作用](#核心作用)
- [关键特性](#关键特性)
- [工作原理](#工作原理)
- [典型应用场景](#典型应用场景)
  - [1. 中心点等比缩放](#1-中心点等比缩放)
  - [2. 镜像翻转效果](#2-镜像翻转效果)
  - [3. 像素级精确绘制](#3-像素级精确绘制)
- [与相关API的协作](#与相关API的协作)
- [示例代码（动态缩放动画）](#示例代码动态缩放动画)
- [常见问题解决方案](#常见问题解决方案)
- [高级技巧](#高级技巧)

`ctx.scale(x, y)`是 Canvas 2D API 中用于**缩放当前坐标系**的方法，它通过修改画布的变换矩阵来实现图形缩放。以下是详细解析：

***

### 核心作用

**对当前坐标系进行水平（x轴）和垂直（y轴）缩放**，**所有后续绘制的内容都会自动应用缩放变换。**

| 参数    | 类型     | 作用                                 |
| ----- | ------ | ---------------------------------- |
| \`x\` | number | **水平缩放比例（>1放大，0\~1缩小，负数表示镜像翻转）** ​ |
| \`y\` | number | 垂直缩放比例（建议与x相同以避免变形，若为负值表示垂直翻转）     |

***

### 关键特性

1. **缩放基准点** &#x20;

   始终基于**当前坐标系原点**（默认画布左上角），通常需要先`translate()`移动原点。
2. **非均匀缩放** &#x20;

   当`x`和`y`值不同时**会产生拉伸/压缩效果**：

```javascript 
ctx.scale(2, 1); // 宽度放大2倍，高度不变（横向拉伸）
```


1. **叠加效应**
   多次调用`scale()`会累积缩放比例：

```javascript 
ctx.scale(2, 2); // 2倍
ctx.scale(3, 3); // 实际变成 6倍
```


### 工作原理

1. **修改当前变换矩阵** &#x20;

   缩放后的坐标计算：
   ```python 
   newX = x * scaleX
   newY = y * scaleY
   ```

2. **影响所有绘制属性** &#x20;

   包括：
   - 图形尺寸
   - 线宽（`lineWidth`）
   - 文本大小
   - 阴影模糊度
   - 图像/图案绘制

### 典型应用场景

#### 1. 中心点等比缩放

```javascript 
const centerX = canvas.width/2;
const centerY = canvas.height/2;

ctx.translate(centerX, centerY); // 移动原点到中心
ctx.scale(2, 2);                // 放大2倍
ctx.translate(-centerX, -centerY); // 坐标补偿
ctx.fillRect(100, 100, 50, 50);  // 实际显示为200x200大小
```


#### 2. 镜像翻转效果

```javascript 
// 水平镜像
ctx.translate(canvas.width, 0);
ctx.scale(-1, 1); // 水平翻转
ctx.drawImage(img, 0, 0);

// 垂直镜像
ctx.translate(0, canvas.height);
ctx.scale(1, -1); // 垂直翻转
```


#### 3. 像素级精确绘制

```javascript 
// 在HiDPI屏幕上保持清晰度
const dpr = window.devicePixelRatio || 1;
ctx.scale(dpr, dpr);
ctx.fillRect(10, 10, 50, 50); // 实际物理像素会放大
```


### 与相关API的协作

| 方法                     | 配合作用                 |
| ---------------------- | -------------------- |
| \`ctx.translate()\`    | 先定位缩放中心点（否则默认从左上角缩放） |
| \`ctx.rotate()\`       | 通常先缩放后旋转（顺序不同效果不同）   |
| \`ctx.setTransform()\` | 重置所有变换（包含缩放）         |
| \`ctx.save()\`         | 保存缩放前的状态             |

### 示例代码（动态缩放动画）

```html 
<canvas id="demo" width="400" height="400"></canvas>
<script>
const canvas = document.getElementById('demo');
const ctx = canvas.getContext('2d');
let scale = 1;
let growing = true;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(200, 200);
    ctx.scale(scale, scale);
    ctx.fillStyle = 'blue';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
    
    // 脉冲缩放效果
    scale += growing ? 0.02 : -0.02;
    if(scale > 2) growing = false;
    if(scale < 0.5) growing = true;
    
    requestAnimationFrame(draw);
}

draw();
</script>
```


效果：蓝色方块在1x\~2x之间循环缩放

***

### 常见问题解决方案

1. **缩放导致线宽异常**

```javascript 
// 错误：线宽也被缩放
ctx.scale(2, 2);
ctx.lineWidth = 1; // 实际显示为2px

// 解决方案1：反向调整线宽
ctx.lineWidth = 1 / Math.max(xScale, yScale);

// 解决方案2：用transform代替scale
ctx.transform(2, 0, 0, 2, 0, 0); // 不缩放线宽
```


​**​2. 文字模糊**

```javascript 
// 错误：小比例缩放导致文字模糊
ctx.scale(0.3, 0.3);
ctx.fillText("Hello", 10, 10);

// 正确：先以大字号绘制再缩放
ctx.scale(0.3, 0.3);
ctx.font = "30px Arial"; // 实际显示为9px
```


​**​3. 性能优化**

```javascript 
// 错误：每帧都重新缩放绘制
function animate() {
    ctx.clearRect(...);
    ctx.scale(1.01, 1.01);
    drawComplexShape();
}

// 正确：使用离屏Canvas缓存
const offscreen = document.createElement('canvas');
// 在离屏Canvas上绘制一次复杂图形
// 主循环中只需缩放绘制offscreen内容
```


### 高级技巧

1. **组合变换实现斜切效果**

```javascript 
// 通过非均匀缩放+旋转模拟斜切
ctx.translate(100, 100);
ctx.rotate(Math.PI/4);
ctx.scale(1, 0.5); // Y轴压缩
ctx.fillRect(0, 0, 100, 100);
```


​**​2. 检测当前缩放状态**

```javascript 
// 通过getTransform()获取当前矩阵
const tf = ctx.getTransform();
console.log(`当前X缩放: ${tf.a}, Y缩放: ${tf.d}`);
```


​**​3. 重置缩放状态**

```javascript 
// 方法1：使用save/restore
ctx.save();
ctx.scale(2, 2);
// 绘制操作...
ctx.restore();

// 方法2：直接重置矩阵
ctx.setTransform(1, 0, 0, 1, 0, 0);
```
