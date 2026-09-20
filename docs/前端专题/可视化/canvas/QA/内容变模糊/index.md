# 内容变模糊

## 目录

- [一、模糊原因分析](#一模糊原因分析)
  - [1. 未适配高DPI设备](#1-未适配高DPI设备)
  - [2. 错误的缩放策略](#2-错误的缩放策略)
  - [3. 多次缩放累积误差](#3-多次缩放累积误差)
- [二、完整修复方案](#二完整修复方案)
  - [1. 高DPI适配（核心）](#1-高DPI适配核心)
  - [2. 离屏Canvas + 原始分辨率维护](#2-离屏Canvas--原始分辨率维护)
  - [3. 高质量缩放控制](#3-高质量缩放控制)
  - [4. 矢量图形与文字特殊处理](#4-矢量图形与文字特殊处理)
- [三、不同缩放算法性能对比](#三不同缩放算法性能对比)
- [四、完整示例代码](#四完整示例代码)

### 一、模糊原因分析

#### 1. **未适配高DPI设备**

- **问题**：在 Retina 等高分屏上，浏览器默认以 1 物理像素 = 1 CSS 像素渲染，导致实际渲染像素不足。
- **表现**：线条/文字边缘锯齿明显。
- **数学验证**： &#x20;

  若设备像素比`dpr=2`，Canvas 尺寸为`500x300`（CSS 像素），实际需要`1000x600`物理像素才能清晰。

#### 2. **错误的缩放策略**

- **问题**：直接拉伸低分辨率位图（如`ctx.drawImage`直接缩放）。
- **表现**：图像/图形模糊，细节丢失。
- **数据验证**： &#x20;

  从`500x300`缩放到`1000x600`时，每个原始像素需生成 4 个新像素，若使用双线性插值而非最近邻，会导致模糊。

#### 3. **多次缩放累积误差**

- **问题**：**多次缩放同一 Canvas 内容，导致分辨率逐级下降。**
- **表现**：每次缩放后模糊程度加剧

### 二、完整修复方案

#### 1. **高DPI适配（核心）**

```javascript 
const canvas = document.getElementById('canvas');
const dpr = window.devicePixelRatio || 1;

// 设置实际像素尺寸 = 逻辑尺寸 × dpr
const logicalWidth = 500;
const logicalHeight = 300;
canvas.width = logicalWidth * dpr;
canvas.height = logicalHeight * dpr;

// 设置CSS尺寸保持显示大小
canvas.style.width = `${logicalWidth}px`;
canvas.style.height = `${logicalHeight}px`;

// 缩放绘图上下文
const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);
```


**原理​**​：通过`ctx.scale(dpr, dpr)`，所有绘制命令自动适配高分辨率。

#### 2. **离屏Canvas + 原始分辨率维护**

```javascript 
// 创建离屏Canvas保存原始高分辨率内容
const offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 1000; // 原始物理像素尺寸
offscreenCanvas.height = 600;
const offscreenCtx = offscreenCanvas.getContext('2d');

// 绘制内容到离屏Canvas（始终以物理像素操作）
offscreenCtx.fillStyle = 'blue';
offscreenCtx.fillRect(100, 100, 200, 100);

// 渲染到主Canvas时保持清晰
ctx.drawImage(
  offscreenCanvas,
  0, 0, offscreenCanvas.width, offscreenCanvas.height,
  0, 0, logicalWidth, logicalHeight
);
```


#### 3. **高质量缩放控制**

```javascript 
// 启用高质量抗锯齿
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high'; // 'low' | 'medium' | 'high'

// 缩放时使用原始分辨率内容
function zoom(factor) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(factor * dpr, factor * dpr);
  ctx.drawImage(offscreenCanvas, 0, 0);
  ctx.restore();
}
```


#### 4. **矢量图形与文字特殊处理**

```javascript 
// 绘制矢量图形时关闭缩放影响
function drawSharpLine(x1, y1, x2, y2) {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0); // 重置变换
  ctx.beginPath();
  ctx.moveTo(x1 * dpr, y1 * dpr); // 手动计算物理像素坐标
  ctx.lineTo(x2 * dpr, y2 * dpr);
  ctx.stroke();
  ctx.restore();
}

// 文字渲染优化
ctx.font = `14px Arial`; // 逻辑字体大小
ctx.translate(0.5, 0.5); // 亚像素偏移消除模糊
```


### 三、不同缩放算法性能对比

| 方法             | 代码示例                                  | 清晰度  | 性能 | 适用场景  |
| -------------- | ------------------------------------- | ---- | -- | ----- |
| **最近邻插值**​     | \`ctx.imageSmoothingEnabled = false\` | 像素锐利 | 最高 | 像素艺术  |
| **双线性插值**​     | \`ctx.imageSmoothingEnabled = true\`  | 平滑   | 中  | 普通图像  |
| **Lanczos插值**​ | 使用 WebGL 实现                           | 最佳   | 低  | 高质量缩放 |

***

### 四、完整示例代码

```html 
<!DOCTYPE html>
<html>
<head>
    <style>
        #canvas-container {
            width: 500px;
            height: 300px;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div id="canvas-container">
        <canvas id="mainCanvas"></canvas>
    </div>
    <button onclick="zoom(1.2)">放大</button>
    <button onclick="zoom(0.8)">缩小</button>

    <script>
        const canvas = document.getElementById('mainCanvas');
        const dpr = window.devicePixelRatio || 1;
        
        // 初始化高分辨率Canvas
        const logicalWidth = 500;
        const logicalHeight = 300;
        canvas.width = logicalWidth * dpr;
        canvas.height = logicalHeight * dpr;
        canvas.style.width = logicalWidth + 'px';
        canvas.style.height = logicalHeight + 'px';
        
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingQuality = 'high';

        // 离屏Canvas保存原始内容
        const offscreenCanvas = document.createElement('canvas');
        offscreenCanvas.width = 1000; // 原始物理像素尺寸
        offscreenCanvas.height = 600;
        const offscreenCtx = offscreenCanvas.getContext('2d');
        
        // 绘制原始内容
        offscreenCtx.fillStyle = 'blue';
        offscreenCtx.fillRect(100, 100, 200, 100);
        offscreenCtx.strokeStyle = 'red';
        offscreenCtx.lineWidth = 2;
        offscreenCtx.strokeRect(150, 150, 300, 200);

        // 初始渲染
        ctx.drawImage(
            offscreenCanvas,
            0, 0, offscreenCanvas.width, offscreenCanvas.height,
            0, 0, logicalWidth, logicalHeight
        );

        // 缩放控制
        let currentScale = 1;
        function zoom(factor) {
            currentScale *= factor;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(currentScale * dpr, currentScale * dpr);
            ctx.drawImage(
                offscreenCanvas,
                0, 0, offscreenCanvas.width, offscreenCanvas.height,
                0, 0, logicalWidth, logicalHeight
            );
            ctx.restore();
        }
    </script>
</body>
</html>
```


[](./差值误差累计     -/index.md)
