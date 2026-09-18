# rotate

## 目录

- [核心作用](#核心作用)
- [关键特性](#关键特性)
- [工作原理](#工作原理)
- [典型使用场景](#典型使用场景)
  - [1. 围绕中心点旋转图形](#1-围绕中心点旋转图形)
  - [2. 旋转图片/文字](#2-旋转图片文字)
  - [3. 创建径向布局](#3-创建径向布局)
- [与相关API的协作](#与相关API的协作)
- [示例代码（旋转动画）](#示例代码旋转动画)
- [常见问题解决方案](#常见问题解决方案)
- [性能提示](#性能提示)

`ctx.rotate(angle)`是 Canvas 2D API 中用于​**​****旋转当前坐标系****​**​的方法，它会使**后续所有绘制操作**围绕当前坐标系原点进行旋转。以下是详细解析：

***

### 核心作用

**以当前坐标系原点为中心，旋转指定的弧度角**，所有后续绘制的内容都会自动应用旋转变换。

| 参数        | 类型     | 作用                         |
| --------- | ------ | -------------------------- |
| \`angle\` | number | 旋转弧度（非角度制，需用\`Math.PI\`表示） |

***

### 关键特性

1. **旋转中心** &#x20;

   始终围绕**当前坐标系原点**（默认是画布左上角 (0,0)），通常需要先`translate()`移动原点。
2. **弧度制**
   - 180° =`Math.PI`
   - 90° =`Math.PI/2`
   - 360° =`Math.PI*2`
3. **顺时针方向** &#x20;

   **正值表示顺时针旋转，负值表示逆时针旋转。**

***

### 工作原理

1. **修改当前变换矩阵** &#x20;

   旋转后的新坐标计算公式：
   ```typescript 
   newX = x * cos(angle) - y * sin(angle)
   newY = x * sin(angle) + y * cos(angle)
   ```

2. **叠加效应** &#x20;

   多次调用`rotate()`会累积旋转角度：

```javascript 
ctx.rotate(0.1); // 旋转0.1弧度
ctx.rotate(0.2); // 总共旋转0.3弧度
```


### 典型使用场景

#### 1. 围绕中心点旋转图形

```javascript 
const centerX = canvas.width/2;
const centerY = canvas.height/2;

ctx.translate(centerX, centerY); // 移动原点到中心
ctx.rotate(Math.PI/4);          // 旋转45度
ctx.fillRect(-50, -50, 100, 100); // 绘制中心对称的矩形
```


#### 2. 旋转图片/文字

```javascript 
ctx.save();
ctx.translate(200, 100);
ctx.rotate(Math.PI/6); // 旋转30度
ctx.drawImage(img, -img.width/2, -img.height/2); // 图片中心旋转
ctx.restore();
```


#### 3. 创建径向布局

```javascript 
ctx.translate(300, 300);
for(let i = 0; i < 8; i++) {
    ctx.rotate(Math.PI/4); // 每次旋转45度
    ctx.fillRect(50, 0, 30, 10); // 绘制放射状矩形
}
```


### 与相关API的协作

| 方法                  | 配合作用             |
| ------------------- | ---------------- |
| \`ctx.translate()\` | 先移动旋转中心点         |
| \`ctx.scale()\`     | 缩放后再旋转（顺序影响最终效果） |
| \`ctx.save()\`      | 保存旋转前的状态         |
| \`ctx.restore()\`   | 恢复旋转前的坐标系        |

### 示例代码（旋转动画）

```html 
<canvas id="demo" width="400" height="400"></canvas>
<script>
const canvas = document.getElementById('demo');
const ctx = canvas.getContext('2d');
let angle = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle);
    ctx.fillStyle = 'red';
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
    
    angle += 0.01;
    requestAnimationFrame(draw);
}

draw();
</script>
```


效果：红色方块围绕画布中心持续旋转

***

### 常见问题解决方案

1. **旋转中心不对**

```javascript 
// 错误：直接旋转会导致围绕左上角旋转
ctx.rotate(Math.PI/4);
ctx.fillRect(100, 100, 50, 50);

// 正确：先移动原点
ctx.translate(125, 125); // 移动到矩形中心
ctx.rotate(Math.PI/4);
ctx.fillRect(-25, -25, 50, 50);
```


​**​2.  角度与弧度混淆​**

```javascript 
// 错误：直接使用角度值
ctx.rotate(45);

// 正确：转换为弧度
function degToRad(deg) {
    return deg * Math.PI / 180;
}
ctx.rotate(degToRad(45));
```


​**​3. 忘记状态管理**

```javascript 
// 错误：旋转影响后续绘制
ctx.rotate(0.5);
drawButton(); // 按钮也会旋转！

// 正确：用save/restore隔离
ctx.save();
ctx.rotate(0.5);
drawRotatedContent();
ctx.restore();
```


### 性能提示

- 在动画中避免频繁调用`rotate()`，建议预先计算好旋转后的坐标
- 对静态旋转内容，可使用离屏Canvas缓存旋转结果
