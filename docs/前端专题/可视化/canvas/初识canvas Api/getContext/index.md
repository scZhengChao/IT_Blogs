# getContext

## 目录

- [基本语法](#基本语法)
  - [参数说明](#参数说明)
- [不同上下文类型的属性和方法](#不同上下文类型的属性和方法)
  - [1. 2D 上下文 ("2d")](#1-2D-上下文-2d)
  - [2. WebGL 上下文 ("webgl"/"webgl2")](#2-WebGL-上下文-webglwebgl2)
- [上下文属性配置](#上下文属性配置)
  - [2D 上下文属性](#2D-上下文属性)
  - [WebGL 上下文属性](#WebGL-上下文属性)
- [返回值](#返回值)
- [使用示例](#使用示例)
  - [基本 2D 绘图](#基本-2D-绘图)
  - [检查支持情况](#检查支持情况)
- [注意事项](#注意事项)

`canvas.getContext()`是 `HTMLCanvasElement `的方法，用于获取绘图上下文，使开发者能够在画布上绘制图形。

## 基本语法

```javascript 
const context = canvas.getContext(contextType, contextAttributes);
```


### 参数说明

1. **contextType**(必需):
   - `"2d"`: 获取 2D 渲染上下文
   - `"webgl"`或`"experimental-webgl"`: 获取 WebGL 1.0 渲染上下文
   - `"webgl2"`: 获取 WebGL 2.0 渲染上下文
   - `"bitmaprenderer"`: 获取 ImageBitmap 渲染上下文
2. **contextAttributes**(可选):
   - 对象，包含特定上下文类型的配置选项

## 不同上下文类型的属性和方法

### 1. 2D 上下文 (`"2d"`)

**常用属性**:

- `fillStyle`: 填充颜色/样式
- `strokeStyle`: 描边颜色/样式
- `lineWidth`: 线条宽度
- `font`: 文本字体

**常用方法**:

```javascript 
// 矩形
ctx.fillRect(x, y, width, height);
ctx.strokeRect(x, y, width, height);

// 路径
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.arc(x, y, radius, startAngle, endAngle);
ctx.fill();
ctx.stroke();

// 文本
ctx.fillText(text, x, y);
ctx.strokeText(text, x, y);

// 图像
ctx.drawImage(image, dx, dy);
```


### 2. WebGL 上下文 (`"webgl"`/`"webgl2"`)

**基本使用**:

```javascript 
const gl = canvas.getContext("webgl", {
  antialias: true,
  depth: true
});

// 设置清除颜色
gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
```


**常用方法**:

- `createBuffer()`
- `bindBuffer()`
- `bufferData()`
- `createShader()`
- `shaderSource()`
- `compileShader()`

## 上下文属性配置

### 2D 上下文属性

```json 
{
  alpha: true,       // 是否包含alpha通道，默认为true
  willReadFrequently: false  // 是否频繁读取数据
}
```


### WebGL 上下文属性

```json 
{
  alpha: true,        // 是否包含alpha缓冲区
  depth: true,        // 是否包含深度缓冲区
  stencil: false,     // 是否包含模板缓冲区
  antialias: true,    // 是否抗锯齿
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: "default"  // "high-performance"或"low-power"
}
```


## 返回值

- 成功时返回对应的渲染上下文对象
- 失败时返回`null`(如浏览器不支持请求的上下文类型)

## 使用示例

### 基本 2D 绘图

```javascript 
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制红色矩形
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 100);

// 绘制蓝色边框
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
ctx.strokeRect(30, 30, 60, 60);
```


### 检查支持情况

```javascript 
function setupCanvas() {
  const canvas = document.getElementById('myCanvas');
  
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // 2D上下文可用
    } else {
      // 不支持2D绘图
    }
  } else {
    // 浏览器不支持canvas
  }
}
```


## 注意事项

1. 必须先获取上下文才能进行绘制操作
2. **同一画布可以获取不同类型的上下文，但不能同时使用**
3. **画布大小改变后，绘制内容会被清除**
4. WebGL 上下文在不同浏览器中可能有不同的支持程度
5. **移动设备上可能有性能限制**

这个 API 是 Canvas 功能的核心，通过它开发者可以实现从简单的图形绘制到复杂的游戏和可视化应用。

[willReadFrequently](./willReadFrequently/index.md "willReadFrequently")

[globalCompositeOperation](./globalCompositeOperation/index.md "globalCompositeOperation")

[imageSmoothingEnabled](./imageSmoothingEnabled/index.md "imageSmoothingEnabled")

[createPattern](./createPattern/index.md "createPattern")
