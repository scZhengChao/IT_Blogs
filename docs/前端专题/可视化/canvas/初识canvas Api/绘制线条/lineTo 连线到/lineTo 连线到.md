# lineTo连线到

## 目录

- [核心作用](#核心作用)
- [关键特性](#关键特性)
- [工作流程（必须步骤）](#工作流程必须步骤)
- [典型应用场景](#典型应用场景)
  - [1. 绘制折线/多边形](#1-绘制折线多边形)
  - [2. 连接离散点](#2-连接离散点)
  - [3. 与曲线组合使用](#3-与曲线组合使用)
- [与相关API的协作](#与相关API的协作)
- [常见问题解决方案](#常见问题解决方案)
- [高级技巧](#高级技巧)

`ctx.lineTo(x, y)`是 Canvas 2D API 中用于**路径绘制**的关键方法，它的作用是从当前画笔位置**画一条直线到指定坐标点**，**并将新的终点设为当前画笔位置**。以下是详细解析：

***

### 核心作用

**在路径中添加一条从当前点到目标点的直线段**，需配合`beginPath()`和`stroke()`/`fill()`使用：

| 参数    | 类型     | 作用           |
| ----- | ------ | ------------ |
| \`x\` | number | 目标点的水平坐标（像素） |
| \`y\` | number | 目标点的垂直坐标（像素） |

***

### 关键特性

1. **依赖当前画笔位置** &#x20;

   **起点由**\*\*`moveTo()`\*\***或上一个路径操作的终点决定**，若未设置则默认为`(0,0)`。
2. **不立即显示** &#x20;

   **只是记录路径**，需调用`stroke()`或`fill()`才会实际绘制。
3. **连接性** &#x20;

   连续调用`lineTo()`会形成折线（前一个的终点是下一个的起点）。

***

### 工作流程（必须步骤）

```javascript 
ctx.beginPath();        // 开始新路径
ctx.moveTo(10, 10);     // 设置起点
ctx.lineTo(100, 50);    // 画线到(100,50)
ctx.lineTo(150, 10);    // 继续画线到(150,10)
ctx.stroke();           // 实际描边绘制
```


### 典型应用场景

#### 1. 绘制折线/多边形

```javascript 
// 绘制三角形
ctx.beginPath();
ctx.moveTo(50, 10);     // 顶点
ctx.lineTo(10, 90);     // 左下角
ctx.lineTo(90, 90);     // 右下角
ctx.closePath();        // 自动闭合路径（可选）
ctx.stroke();
```


#### 2. 连接离散点

```javascript 
const points = [[30,30], [70,10], [120,80], [200,20]];
ctx.beginPath();
points.forEach(([x,y], i) => 
    i === 0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y)
);
ctx.strokeStyle = 'blue';
ctx.stroke();
```


#### 3. 与曲线组合使用

```javascript 
ctx.beginPath();
ctx.moveTo(10, 50);
ctx.lineTo(60, 50);     // 直线段
ctx.quadraticCurveTo(80, 10, 100, 50); // 曲线段
ctx.lineTo(150, 50);    // 继续直线
ctx.stroke();
```


### 与相关API的协作

| 方法                  | 协作场景                 |
| ------------------- | -------------------- |
| \`ctx.moveTo()\`    | 设置线段起点（否则会从上个路径终点连接） |
| \`ctx.beginPath()\` | 必须调用以开始新路径           |
| \`ctx.closePath()\` | 自动闭合路径（首尾连线）         |
| \`ctx.stroke()\`    | 描边路径                 |
| \`ctx.fill()\`      | 填充路径（自动闭合未闭合的路径）     |

***

### 常见问题解决方案

​**​性能优化**

```javascript 
// 低效：频繁单独绘制线段
for(let i=0; i<100; i++) {
    ctx.beginPath();
    ctx.moveTo(i*2, 0);
    ctx.lineTo(i*2, 100);
    ctx.stroke();
}

// 高效：批量绘制
ctx.beginPath();
for(let i=0; i<100; i++) {
    ctx.moveTo(i*2, 0);
    ctx.lineTo(i*2, 100);
}
ctx.stroke(); // 单次渲染
```


### 高级技巧

1. **虚线效果** &#x20;

   通过短线段+间隙模拟

```javascript 
ctx.setLineDash([5, 3]); // 5px线段+3px间隙
ctx.beginPath();
ctx.moveTo(10,10);
ctx.lineTo(200,10);
ctx.stroke();
```


1. **箭头绘制**
   计算线段角度添加箭头

```javascript 
function drawArrow(fromX, fromY, toX, toY) {
    const headLength = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    
    // 绘制箭头
    ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI/6),
        toY - headLength * Math.sin(angle - Math.PI/6)
    );
    ctx.moveTo(toX, toY);
    ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI/6),
        toY - headLength * Math.sin(angle + Math.PI/6)
    );
    ctx.stroke();
}
```


1. **路径优化**
   使用`lineCap`和`lineJoin`控制端点样式

```javascript 
ctx.lineCap = 'round';   // 线段端点圆角
ctx.lineJoin = 'bevel';  // 折线连接处斜切
```
