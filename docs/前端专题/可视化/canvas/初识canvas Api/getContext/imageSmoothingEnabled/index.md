# imageSmoothingEnabled

## 目录

- [作用详解](#作用详解)
- [基础用法](#基础用法)
- [高级控制（Canvas 2D 扩展）](#高级控制Canvas-2D-扩展)
- [关键场景对比](#关键场景对比)
  - [1. 像素艺术缩放](#1-像素艺术缩放)
  - [2. 照片缩放](#2-照片缩放)
- [性能优化技巧](#性能优化技巧)
- [浏览器兼容性](#浏览器兼容性)
- [常见问题解决方案](#常见问题解决方案)

> `ctx.imageSmoothingQuality = 'high'; // 'low' | 'medium' | 'high'`

`ctx.imageSmoothingEnabled`是 `Canvas 2D API` 中控制 ​**​图像缩放时是否启用平滑处理（抗锯齿）​**​ 的属性。它的核心作用是通过调整插值算法，在图像缩放时平衡清晰度与平滑度。

### 作用详解

| **属性值**​     | 效果                    | 适用场景           | 性能影响 |
| ------------ | --------------------- | -------------- | ---- |
| \`true\`(默认) | 启用双线性/双三次插值，边缘平滑但可能模糊 | 照片、渐变图形        | 较高   |
| \`false\`    | 使用最近邻插值，保留锐利边缘但可能有锯齿  | 像素艺术、需要锐利的UI元素 | 较低   |

### 基础用法

```javascript 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 禁用平滑处理（适合像素风游戏）
ctx.imageSmoothingEnabled = false;

// 绘制缩放图像
const img = new Image();
img.src = 'pixel-art.png';
img.onload = () => {
  ctx.drawImage(img, 0, 0, 100, 100); // 放大时保持像素锐利
};
```


### 高级控制（Canvas 2D 扩展）

```javascript 
// 设置抗锯齿质量（需浏览器支持）
ctx.imageSmoothingQuality = 'high'; // 'low' | 'medium' | 'high'

// 兼容性检查
if ('imageSmoothingQuality' in ctx) {
  ctx.imageSmoothingQuality = 'high';
} else {
  console.warn('imageSmoothingQuality not supported');
}
```


### 关键场景对比

#### 1. **像素艺术缩放**

```javascript 
// 禁用平滑处理
ctx.imageSmoothingEnabled = false;
ctx.drawImage(pixelArtImg, 0, 0, 200, 200); // 每个像素方块清晰可见
```


#### 2. **照片缩放**

```javascript 
// 启用高质量平滑
ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';
ctx.drawImage(photoImg, 0, 0, 800, 600); // 平滑的细节过渡
```


### 性能优化技巧

1. **动态切换** &#x20;

```javascript 
function drawPixelArt() {
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(pixelArt, 0, 0, 400, 400);
  ctx.restore();
}

function drawPhoto() {
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage(photo, 0, 0, 800, 600);
  ctx.restore();
}
```


1. **WebGL 替代方案**
   对高性能需求场景，使用 WebGL 的`gl.NEAREST`/`gl.LINEAR`：

```typescript 
const gl = canvas.getContext('webgl');
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
```


### 浏览器兼容性

| 属性/浏览器                    | Chrome | Firefox | Safari | Edge |
| ------------------------- | ------ | ------- | ------ | ---- |
| \`imageSmoothingEnabled\` | 24+    | 3.6+    | 5.1+   | 12+  |
| \`imageSmoothingQuality\` | 54+    | 63+     | 13+    | 79+  |

***

### 常见问题解决方案

**Q: 为什么设置**\*\*`false`\*\***后仍有模糊？**
A: 检查是否同时满足：

1. **画布尺寸为整数（非小数）**
2. **缩放比例为整数倍（如 2x, 3x）**
3. **未叠加 CSS 变形（如**\*\*`transform: scale()`）\*\*​

**Q: 如何实现亚像素级锐利？**

```javascript 
// 坐标偏移0.5像素
ctx.translate(0.5, 0.5);
ctx.drawImage(img, 0, 0);
```
