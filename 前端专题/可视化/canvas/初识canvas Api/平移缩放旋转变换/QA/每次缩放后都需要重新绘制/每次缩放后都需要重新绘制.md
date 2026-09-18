# 每次缩放后都需要重新绘制

## 目录

- [为什么必须重新绘制？](#为什么必须重新绘制)
- [优化方案](#优化方案)
  - [1. 基础写法（直接重绘）](#1-基础写法直接重绘)
  - [2. 离屏Canvas缓存（适合静态内容）](#2-离屏Canvas缓存适合静态内容)
  - [3. 差异重绘（动态内容优化）](#3-差异重绘动态内容优化)
- [完整示例代码（基础版）](#完整示例代码基础版)
- [关键总结](#关键总结)

是的，在使用Canvas进行缩放操作时，**每次缩放后都需要重新绘制**\*\*`drawImage`\*\*（或其它图形）。这是由Canvas的立即模式（Immediate Mode）特性决定的，其工作原理如下：

***

### 为什么必须重新绘制？

1. **非保留模式特性**：
   - Canvas**不会自动保存已绘制的内容，每次画面变化（如缩放）都需要完全重绘场景。**
   - 直接修改`ctx.scale()`等变换**参数不会自动更新已绘制内容。**
2. **坐标系变换时效性**：
   - 缩放操作本质是通过修改坐标系实现的，这种变换**只对后续的绘制操作生效**。
   - 已绘制在画布上的内容**每次缩放后都需要重新绘制**
3. **视觉一致性需求**：
   - 如果不重绘，旧内容会残留在画布上，导致画面重叠错乱。

### 优化方案

虽然必须重绘，但可以通过以下方式优化性能：

#### 1. 基础写法（直接重绘）

```javascript 
function draw() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 应用最新缩放变换
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.scale(scale, scale);
    ctx.translate(-center.x, -center.y);
    
    // 重新绘制图片
    ctx.drawImage(img, imgX, imgY);
    ctx.restore();
}
```


#### 2. 离屏Canvas缓存（适合静态内容）

```javascript 
// 创建离屏Canvas缓存静态内容
const offscreenCanvas = document.createElement('canvas');
const offscreenCtx = offscreenCanvas.getContext('2d');

// 预先绘制内容到离屏Canvas
function cacheImage() {
    offscreenCanvas.width = img.width;
    offscreenCanvas.height = img.height;
    offscreenCtx.drawImage(img, 0, 0);
}

// 主绘制函数改为复制缓存
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.scale(scale, scale);
    ctx.translate(-center.x, -center.y);
    ctx.drawImage(offscreenCanvas, imgX, imgY); // 复制缓存内容
    ctx.restore();
}
```


#### 3. 差异重绘（动态内容优化）

- 只重绘画面中发生变化的部分（需要自行实现脏矩形检测）

### 完整示例代码（基础版）

```html 
<canvas id="myCanvas" width="800" height="600"></canvas>
<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
let scale = 1;
const center = { x: canvas.width/2, y: canvas.height/2 };

// 加载图片
const img = new Image();
img.src = 'https://picsum.photos/200/200';
img.onload = () => draw();

function draw() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 应用最新变换
    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.scale(scale, scale);
    ctx.translate(-center.x, -center.y);
    
    // 计算图片位置（居中显示）
    const imgX = center.x - img.width/2;
    const imgY = center.y - img.height/2;
    ctx.drawImage(img, imgX, imgY);
    
    ctx.restore();
}

// 缩放控制
document.addEventListener('wheel', e => {
    e.preventDefault();
    scale *= e.deltaY > 0 ? 0.9 : 1.1; // 滚轮缩放
    draw();
});
</script>
```


### 关键总结

| 操作     | 是否必须重绘 | 原因                |
| ------ | ------ | ----------------- |
| 修改缩放比例 | 是      | Canvas不会自动更新已绘制内容 |
| 平移画布   | 是      | 坐标系变化需要重新计算所有元素位置 |
| 修改透明度  | 是      | 已绘制像素的透明度无法直接修改   |
| 旋转     | 是      | 和缩放同理，需要重新应用变换矩阵  |

即使你只是修改了缩放参数，也必须通过`drawImage`或其他绘制方法的重新执行，才能使新的变换参数生效。这是Canvas底层设计决定的特性，无法绕过。
