# canvas尺寸

## 目录

- [1. Canvas 的两种尺寸](#1-Canvas-的两种尺寸)
  - [(1) 样式尺寸 (CSS 尺寸)](#1-样式尺寸-CSS-尺寸)
  - [(2) 画布尺寸 (绘图缓冲区尺寸)](#2-画布尺寸-绘图缓冲区尺寸)
- [2. 正确获取和设置 Canvas 尺寸](#2-正确获取和设置-Canvas-尺寸)
  - [获取 Canvas 实际大小（绘图缓冲区尺寸）](#获取-Canvas-实际大小绘图缓冲区尺寸)
  - [设置 Canvas 为容器/窗口的实际大小](#设置-Canvas-为容器窗口的实际大小)
- [3. 常见问题解决方案](#3-常见问题解决方案)
  - [问题1：Canvas 显示模糊](#问题1Canvas-显示模糊)
  - [问题2：高分屏(Retina)显示模糊](#问题2高分屏Retina显示模糊)
  - [问题3：响应式Canvas](#问题3响应式Canvas)
- [4. 最佳实践](#4-最佳实践)

在前端开发中，Canvas 有**两个尺寸概念**，如果不正确设置会导致显示模糊或变形：

## 1. Canvas 的两种尺寸

### (1) 样式尺寸 (CSS 尺寸)

- 通过 CSS 设置的`width/height`
- 控制 Canvas 在**页面中的显示大小**
- 不**改变画布的实际分辨率**

### (2) 画布尺寸 (绘图缓冲区尺寸)

- 通过`<canvas>`元素的`width/height`属性设置
- 决定 Canvas 的实际像素数量
- 直接**影响绘图质量和清晰度**

## 2. 正确获取和设置 Canvas 尺寸

### 获取 Canvas 实际大小（绘图缓冲区尺寸）

```javascript 
const canvas = document.getElementById('myCanvas');
const realWidth = canvas.width;   // 画布实际宽度（像素）
const realHeight = canvas.height; // 画布实际高度（像素）
```


### 设置 Canvas 为容器/窗口的实际大小

```javascript 
function resizeCanvas() {
  const canvas = document.getElementById('myCanvas');
  const container = canvas.parentElement;
  
  // 获取容器实际可用尺寸
  const displayWidth = container.clientWidth;
  const displayHeight = container.clientHeight;
  
  // 检查是否需要调整（避免不必要的重绘）
  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    // 设置画布实际尺寸（绘图缓冲区）
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    
    // 如果需要，可以在这里触发重绘
    redrawCanvas();
  }
}

// 初始化时和窗口大小改变时调用
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);
```


## 3. 常见问题解决方案

### 问题1：Canvas 显示模糊

**原因**：画布尺寸小于CSS样式尺寸，浏览器进行了拉伸
**解决**：确保`canvas.width/height`与CSS尺寸匹配

### 问题2：高分屏(Retina)显示模糊

```javascript 
function setupHiDPICanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  
  // 设置实际尺寸为显示尺寸×设备像素比
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  // 缩放上下文以匹配CSS尺寸
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  
  // 设置CSS尺寸为原始显示尺寸
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}
```


### 问题3：响应式Canvas

```javascript 
// 使用ResizeObserver更精确监听尺寸变化
const observer = new ResizeObserver(entries => {
  for (let entry of entries) {
    if (entry.target === canvas.parentElement) {
      resizeCanvas();
    }
  }
});

observer.observe(canvas.parentElement);
```


## 4. 最佳实践

1. **始终显式设置**`canvas.width`和`canvas.height`
2. **不要仅用CSS**设置Canvas大小
3. **高分屏处理**：考虑`devicePixelRatio`
4. **性能优化**：避免频繁调整尺寸（防抖处理）
5. **保持宽高比**：如需保持比例，可计算调整：

```javascript 
function resizeCanvasToAspectRatio(width, height) {
  const canvas = document.getElementById('myCanvas');
  const container = canvas.parentElement;
  const containerRatio = container.clientWidth / container.clientHeight;
  const targetRatio = width / height;
  
  if (containerRatio > targetRatio) {
    // 容器更宽，按高度适配
    canvas.height = container.clientHeight;
    canvas.width = container.clientHeight * targetRatio;
  } else {
    // 容器更高，按宽度适配
    canvas.width = container.clientWidth;
    canvas.height = container.clientWidth / targetRatio;
  }
}


```
