# 坐标系统

## 目录

- [一、Canvas 坐标系基础](#一Canvas-坐标系基础)
- [二、基本变换类型](#二基本变换类型)
  - [1. 平移 (translate)](#1-平移-translate)
  - [2. 旋转 (rotate)](#2-旋转-rotate)
  - [3. 缩放 (scale)](#3-缩放-scale)
- [三、变换组合与顺序](#三变换组合与顺序)
- [四、典型使用场景](#四典型使用场景)
  - [1. 平移使用场景](#1-平移使用场景)
  - [2. 旋转使用场景](#2-旋转使用场景)
  - [3. 缩放使用场景](#3-缩放使用场景)
- [五、实际应用示例](#五实际应用示例)
  - [1. 时钟指针绘制](#1-时钟指针绘制)
  - [2. 可缩放的视口系统](#2-可缩放的视口系统)
- [六、注意事项](#六注意事项)
- [七、高级技巧](#七高级技巧)
- [八、性能对比](#八性能对比)

## 一、Canvas 坐标系基础

Canvas 使用二维笛卡尔坐标系：

- **原点 (0,0) 默认在左上角**
- **X 轴向右为正方向**
- **Y 轴向下为正方向**

## 二、基本变换类型

### 1. 平移 (translate)

**作用**：移动坐标系原点位置，后续所有绘制都基于新原点

**API**：

```javascript 

ctx.translate(x, y)
ctx.translate(100, 50) // 将原点移动到(100,50)
ctx.fillRect(0, 0, 50, 50) // 实际绘制在(100,50)-(150,100)

```


### 2. 旋转 (rotate)

**作用**：以当前原点为中心旋转坐标系

```javascript 
ctx.rotate(angle) // 弧度制
ctx.translate(150, 150) // 移动原点到中心
ctx.rotate(Math.PI/4) // 旋转45度
ctx.fillRect(-50, -50, 100, 100) // 绘制旋转的正方形
```


### 3. 缩放 (scale)

**作用**：缩放坐标系单位长度

**API**：

```javascript 
ctx.scale(xScale, yScale)
ctx.scale(2, 0.5) // X轴放大2倍，Y轴缩小一半
ctx.fillRect(10, 10, 50, 50) // 实际尺寸为100x25

```


## 三、变换组合与顺序

Canvas 变换是**后进先出**的矩阵乘法，顺序非常重要

```javascript 
ctx.save()
ctx.translate(100, 100) // 第三步应用
ctx.rotate(Math.PI/4)   // 第二步应用
ctx.scale(2, 2)         // 第一步应用
ctx.fillRect(0, 0, 50, 50)
ctx.restore()
```


**等效数学表示**：`T * R * S * vertex`

## 四、典型使用场景

### 1. 平移使用场景

- 重复图案的绘制（砖墙、网格）
- 图层系统实现
- 视口滚动效果
- 精灵动画的位置控制

### 2. 旋转使用场景

- 指针/仪表盘动画
- 角色朝向控制
- 卡片翻转效果
- 粒子系统效果

### 3. 缩放使用场景

- 实现镜头缩放
- 响应式图形适配
- 像素艺术放大
- 特殊变形效果

## 五、实际应用示例

### 1. 时钟指针绘制

```javascript 
function drawClock() {
  // 表盘
  ctx.beginPath()
  ctx.arc(150, 150, 100, 0, Math.PI*2)
  ctx.stroke()
  
  // 时针
  ctx.save()
  ctx.translate(150, 150)
  ctx.rotate(hour * Math.PI/6)
  ctx.fillRect(-5, -50, 10, 50)
  ctx.restore()
  
  // 分针（类似时针）
}
```


### 2. 可缩放的视口系统

```javascript 
let viewport = {
  x: 0, y: 0, 
  scale: 1,
  rotation: 0
}

function render() {
  ctx.save()
  ctx.translate(canvas.width/2, canvas.height/2)
  ctx.scale(viewport.scale, viewport.scale)
  ctx.rotate(viewport.rotation)
  ctx.translate(-viewport.x, -viewport.y)
  
  // 绘制场景内容...
  ctx.restore()
}
```


## 六、注意事项

1. **状态管理**：
   - 总是使用`save()`/`restore()`配对
   - 避免变换状态泄漏到其他绘制代码
2. **性能优化**：
   - 合并连续的同类型变换
   - 避免在动画循环中重复计算相同变换
3. **精度问题**：
   - 多次变换可能导致浮点数精度损失
   - 复杂场景考虑重置坐标系而非累积变换
4. **交互处理**：
   - 屏幕坐标到场景坐标的转换：

```javascript 
function screenToScene(x, y) {
  const matrix = ctx.getTransform().invertSelf()
  return {
    x: matrix.a * x + matrix.c * y + matrix.e,
    y: matrix.b * x + matrix.d * y + matrix.f
  }
}
```


1. **特殊效果**：
   - 非均匀缩放会同时缩放线宽
   - 旋转会影响文本渲染方向

## 七、高级技巧

1. **直接矩阵操作**：

```javascript 
ctx.transform(a, b, c, d, e, f)
ctx.setTransform(a, b, c, d, e, f) // 重置当前矩阵
```


​2. **变形效果​**​

```javascript 
// 斜切效果
ctx.transform(1, 0.5, 0, 1, 0, 0)
```


1. **获取当前矩阵​**​

```typescript 
const matrix = ctx.getTransform()
console.log(matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f)
```


## 八、性能对比

| 操作     | 性能消耗 | 建议   |
| ------ | ---- | ---- |
| 单个变换   | 低    | 直接使用 |
| 多次独立变换 | 中    | 考虑合并 |
| 矩阵运算   | 高    | 预先计算 |
| 频繁状态保存 | 高    | 优化结构 |

理解 `Canvas `坐标系变换是掌握高级图形编程的基础。通过灵活组合这些变换，可以创建出各种复杂的视觉效果和交互体验。
