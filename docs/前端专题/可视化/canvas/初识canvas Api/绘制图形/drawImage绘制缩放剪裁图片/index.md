# drawImage绘制缩放剪裁图片

## 目录

- [基本语法](#基本语法)
- [参数解释](#参数解释)
- [三种用法示例](#三种用法示例)
- [关键注意事项](#关键注意事项)
- [高级应用场景](#高级应用场景)
- [性能优化建议](#性能优化建议)

#### 基本语法

`drawImage`方法有三种重载形式：

```javascript 
// 1. 直接绘制原始大小的图像
context.drawImage(image, dx, dy);

// 2. 绘制并缩放图像
context.drawImage(image, dx, dy, dWidth, dHeight);

// 3. 裁剪并缩放图像（高级用法）
context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```


#### 参数解释

- **`image`**：要绘制的源图像，可以是：
  - `HTMLImageElement`（通过`new Image()`或`<img>`创建）
  - `HTMLVideoElement`（当前视频帧）
  - `HTMLCanvasElement`（另一个 canvas 的内容）
  - `ImageBitmap`（高性能位图对象）
- **目标参数**（控制图像在画布上的位置和大小）：
  - `dx`,`dy`：目标位置的左上角坐标（画布上的位置）
  - `dWidth`,`dHeight`：目标尺寸（最终绘制的大小，可用于缩放）
- **源裁剪参数**（可选，用于从原图中截取部分区域）：
  - `sx`,`sy`：源图像的裁剪起点坐标（左上角）
  - `sWidth`,`sHeight`：裁剪区域的宽度和高度

#### 三种用法示例

1. **绘制原始大小的图像**：

```javascript 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const img = new Image();

img.onload = () => {
  ctx.drawImage(img, 10, 10); // 从 (10,10) 开始绘制原图
};

img.src = 'image.jpg';
```


1. **缩放图像**：

```javascript 
ctx.drawImage(img, 10, 10, 200, 150); // 在 (10,10) 绘制，缩放为 200x150
```


1. **裁剪并缩放图像**：

```javascript 
// 从原图 (50,50) 位置开始裁剪 100x100 的区域，然后缩放并绘制到画布上
ctx.drawImage(img, 50, 50, 100, 100, 10, 10, 200, 200);
```


#### 关键注意事项

1. **图像加载状态**：
   - 必须确保图像已完全加载（通过`onload`事件），否则可能无法绘制
   - 视频元素需要处于播放状态或有可用帧
2. **坐标系统**：
   - 所有坐标和尺寸参数均以像素为单位
   - 负坐标值可用于反向绘制或偏移
3. **缩放与变形**：
   - 负值的`dWidth`或`dHeight`会导致图像水平或垂直翻转
   - 缩放比例不一致时会产生拉伸效果
4. **跨域限制**：
   - 如果图像来自不同域名，需要服务器设置 CORS 头，否则会导致画布污染
   - 受污染的画布无法导出为图像或使用某些 API

#### 高级应用场景

1. **精灵图（Sprite Sheet）处理**： &#x20;

   从大型纹理图中提取单个元素：

```javascript 
// 从精灵图中提取第3行第2列的元素
const spriteWidth = 100;
const spriteHeight = 100;
ctx.drawImage(
  spriteSheet,
  1 * spriteWidth,  // sx
  2 * spriteHeight, // sy
  spriteWidth,      // sWidth
  spriteHeight,     // sHeight
  10, 10,           // dx, dy
  spriteWidth,      // dWidth
  spriteHeight      // dHeight
);
```


1. **视频帧截取**：

```javascript 
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 每300ms截取一帧
setInterval(() => {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}, 300);
```


1. **图像滤镜效果**： &#x20;

   结合`getImageData`和`putImageData`处理像素数据后再绘制。

#### 性能优化建议

1. 使用`ImageBitmap`处理大型图像：

```javascript 
createImageBitmap(img).then(bitmap => {
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close(); // 使用后释放资源
});
```


1. 预渲染复杂场景到离屏 `canvas`，再绘制到主画布
2. 避免频繁绘制高分辨率图像，适当缩放源图像

掌握`drawImage`是实现 Canvas 图形、游戏和数据可视化的基础，通过灵活组合参数，可以实现从简单图片展示到复杂图像特效的各种功能。
