# 全重置画布​​

## 目录

- [关键机制](#关键机制)
- [保留内容的解决方案](#保留内容的解决方案)
  - [方法1：使用getImageData/putImageData](#方法1使用getImageDataputImageData)
  - [方法2：离屏 Canvas 复制（推荐）](#方法2离屏-Canvas-复制推荐)
- [不同场景下的行为](#不同场景下的行为)
- [最佳实践建议](#最佳实践建议)
- [示例：响应式画布（保留内容）](#示例响应式画布保留内容)

，**直接修改 Canvas 的**\*\*`width`****或****`height`\*\***属性会完全重置画布**，导致所有绘制内容丢失。这是因为：

### 关键机制

1. **内存重新分配** &#x20;

   修改`width`/`height`时，浏览器会：
   - 释放当前画布的像素内存
   - 按新尺寸重新分配空白内存
   - 重置绘图状态（如变换矩阵、样式等）
2. **与 CSS 尺寸的区别**

```javascript 
// 重置画布（丢失内容）
canvas.width = 500; 
canvas.height = 300;

// 仅缩放显示（不影响内容）
canvas.style.width = '500px'; 
canvas.style.height = '300px';
```


### 保留内容的解决方案

如果需要调整尺寸但保留内容，需先备份数据：

#### 方法1：使用`getImageData`/`putImageData`

```javascript 
function resizeCanvas(canvas, newWidth, newHeight) {
  // 1. 备份当前内容
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  // 2. 修改尺寸（此时画布被清空）
  canvas.width = newWidth;
  canvas.height = newHeight;

  // 3. 恢复内容（自动缩放）
  ctx.putImageData(imageData, 0, 0);
}
```


**注意**：此方法会**拉伸像素**，可能失真。

#### 方法2：离屏 Canvas 复制（推荐）

```javascript 
function resizeCanvas(canvas, newWidth, newHeight) {
  // 1. 创建离屏画布备份
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

  // 2. 修改主画布尺寸
  canvas.width = newWidth;
  canvas.height = newHeight;

  // 3. 重新绘制内容（可控制缩放方式）
  canvas.getContext('2d').drawImage(
    tempCanvas, 
    0, 0, tempCanvas.width, tempCanvas.height, // 源区域
    0, 0, newWidth, newHeight                 // 目标区域
  );
}
```


**优点**：可通过`drawImage`参数控制缩放质量。

***

### 不同场景下的行为

| 操作                       | 内容是否保留 | 绘图状态是否重置 | 性能影响 |
| ------------------------ | ------ | -------- | ---- |
| 修改\`width\`/\`height\`   | ❌      | ✅        | 低    |
| 修改\`style.width/height\` | ✅      | ❌        | 最低   |
| \`getImageData\`备份       | ✅      | ✅        | 中    |
| 离屏 Canvas 备份             | ✅      | ✅        | 较高   |

***

### 最佳实践建议

1. **避免频繁修改尺寸** &#x20;

   如需动态调整，优先使用 CSS 变换：

```javascript 
// 不重置内容的高性能缩放
canvas.style.transform = `scale(${scaleFactor})`;
```


1. &#x20;**大尺寸画布处理**
   超过 4096x4096 时：

```javascript 
// 分段备份（避免单个ImageData超出限制）
const tileSize = 2048;
for (let y = 0; y < canvas.height; y += tileSize) {
  for (let x = 0; x < canvas.width; x += tileSize) {
    const tile = ctx.getImageData(x, y, tileSize, tileSize);
    // 保存到数组
  }
}
```


1. **WebGL 特殊处理**
   WebGL 上下文需要额外重建：

```javascript 
const gl = canvas.getContext('webgl');
canvas.width = newWidth; // 会丢失WebGL状态
gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
```


### 示例：响应式画布（保留内容）

```javascript 
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 初始绘制
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 响应窗口尺寸变化
window.addEventListener('resize', () => {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = canvas.width;
  tempCanvas.height = canvas.height;
  tempCanvas.getContext('2d').drawImage(canvas, 0, 0);

  // 更新尺寸
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // 恢复内容
  ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 
               0, 0, canvas.width, canvas.height);
});
```
