# putImageData

## 目录

- [作用](#作用)
- [方法定义](#方法定义)
- [基础用法](#基础用法)
- [关键场景示例](#关键场景示例)
  - [1. 图像反色处理](#1-图像反色处理)
  - [2. 像素动画（雨滴效果）](#2-像素动画雨滴效果)
  - [3. 高性能截图回显](#3-高性能截图回显)
- [性能优化技巧](#性能优化技巧)
- [与其他API的协同](#与其他API的协同)

`ctx.putImageData()`是 Canvas 2D API 中用于 ​**​将像素数据写回画布​**​ 的核心方法，与`getImageData()`配合实现像素级操作。以下是其详细作用、用法和关键技巧：

### 作用

1. **像素级写入** &#x20;

   将`ImageData`对象的像素数据（RGBA数组）直接写入画布的指定区域，**跳过浏览器常规绘制管道**，适用于：
   - 图像处理后的结果回写
   - 像素动画（如游戏、特效）
   - 实时视频帧处理
2. \*\*无插值/抗锯齿  \*\*

   直接按原始像素数据写入，**不受**\*\*`imageSmoothingEnabled`\*\***影响**，**保持像素精确性。**
3. **脏矩形优化** &#x20;

   支持只更新画布的部分区域 **，减少重绘性能开销。**

### 方法定义

```javascript 
putImageData(
  imageData: ImageData,  // 要写入的像素数据对象
  dx: number,            // 画布目标区域的左上角x坐标
  dy: number,            // 画布目标区域的左上角y坐标
  dirtyX?: number,       // 可选：从imageData中截取的起始x坐标
  dirtyY?: number,       // 可选：从imageData中截取的起始y坐标
  dirtyWidth?: number,   // 可选：截取区域的宽度
  dirtyHeight?: number   // 可选：截取区域的高度
): void;
```


### 基础用法

```javascript 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 1. 获取画布像素数据
const imageData = ctx.getImageData(0, 0, 100, 100);

// 2. 修改像素数据（示例：红色滤镜）
const data = imageData.data;
for (let i = 0; i < data.length; i += 4) {
  data[i] = 255;     // R通道设为最大值
  data[i+3] = 128;   // Alpha通道半透明
}

// 3. 将数据写回画布（左上角(0,0)）
ctx.putImageData(imageData, 0, 0);

// 4. 局部更新（仅写入左上角50x50区域）
ctx.putImageData(imageData, 0, 0, 0, 0, 50, 50);
```


### 关键场景示例

#### 1. **图像反色处理**

```javascript 
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const data = imageData.data;

for (let i = 0; i < data.length; i += 4) {
  data[i] = 255 - data[i];     // 反色R
  data[i+1] = 255 - data[i+1]; // 反色G
  data[i+2] = 255 - data[i+2]; // 反色B
}

ctx.putImageData(imageData, 0, 0); // 写回处理结果
```


#### 2. **像素动画（雨滴效果）**

```javascript 
// 初始化粒子
const particles = Array(1000).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  speed: Math.random() * 2 + 1
}));

function animate() {
  // 获取当前画布数据
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // 更新粒子位置并绘制
  particles.forEach(p => {
    const idx = (Math.floor(p.y) * canvas.width + Math.floor(p.x)) * 4;
    data[idx] = 0;       // R
    data[idx+1] = 150;   // G
    data[idx+2] = 255;   // B
    data[idx+3] = 200;   // A

    p.y += p.speed;
    if (p.y > canvas.height) p.y = 0;
  });

  // 写回像素数据
  ctx.putImageData(imageData, 0, 0);
  requestAnimationFrame(animate);
}
animate();
```


#### 3. **高性能截图回显**

```javascript 
// 从视频捕获帧并处理
video.addEventListener('play', () => {
  const processFrame = () => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // ...图像处理逻辑
    ctx.putImageData(imageData, 0, 0);
    if (!video.paused) requestAnimationFrame(processFrame);
  };
  processFrame();
});
```


### 性能优化技巧

1. **脏矩形更新** &#x20;

   只重绘变化区域，大幅减少像素处理量：

```javascript 
// 仅更新变化区域 (x=10,y=10,w=100,h=100)
ctx.putImageData(imageData, 10, 10, 10, 10, 100, 100);
```


1. **Web Worker 离屏处理**
   将耗时操作移入Worker线程：

```javascript 
const worker = new Worker('image-processor.js');
worker.postMessage({
  imageData: ctx.getImageData(0, 0, canvas.width, canvas.height),
  area: [0, 0, 100, 100]
}, [imageData.data.buffer]); // Transferable数据
```


1. **分块处理大画布**
   避免单次操作过大内存区域：

```javascript 
const tileSize = 512;
for (let y = 0; y < canvas.height; y += tileSize) {
  for (let x = 0; x < canvas.width; x += tileSize) {
    const tile = ctx.getImageData(x, y, tileSize, tileSize);
    processTile(tile);
    ctx.putImageData(tile, x, y);
  }
}
```


### 与其他API的协同

| API                   | 配合场景        |
| --------------------- | ----------- |
| \`getImageData()\`    | 先获取再修改最后写回  |
| \`createImageData()\` | 创建新像素数据区域   |
| \`drawImage()\`       | 传统绘制与像素操作结合 |

通过合理使用`putImageData()`，开发者可以实现从简单的**滤镜效果到复杂的实时计算机视觉应用**，是Canvas像素级控制的基石API。
