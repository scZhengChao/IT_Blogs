# translate

## 目录

- [工作原理](#工作原理)
  - [核心作用](#核心作用)
  - [工作原理](#工作原理)
  - [典型应用场景](#典型应用场景)
    - [1. 局部坐标系绘制](#1-局部坐标系绘制)
    - [2. 中心点缩放/旋转](#2-中心点缩放旋转)
    - [3. 批量绘制重复图形](#3-批量绘制重复图形)
  - [与相关API的对比](#与相关API的对比)
  - [使用示例（可视化效果）](#使用示例可视化效果)
  - [注意事项](#注意事项)

> 不是移动图画；而是移动坐标原点

`ctx.translate(x, y)`是 Canvas 2D API 中用于​**​****移动坐标系原点****​**​的方法，它通过修改画布的**变换矩阵来实现坐标系平移**。​**​**以下是详细解析：

## 工作原理

1. **坐标系变换**：`translate(x, y)`将当前坐标系的原点移动到新的位置
2. **后续绘制**：所有后续的绘制操作都基于这个新的坐标系
3. **已绘制内容**：之前已经绘制到画布上的内容保持不变

### 核心作用

**将画布的坐标系原点从默认的左上角 (0,0) 移动到新位置 (x,y)**，所有后续的绘制操作都会基于新的原点计算坐标。

| 参数    | 类型     | 作用           |
| ----- | ------ | ------------ |
| \`x\` | number | 水平方向移动距离（像素） |
| \`y\` | number | 垂直方向移动距离（像素） |

***

### 工作原理

1. **坐标系变换** &#x20;

   修改当前变换矩阵，相当于给所有后续绘制的坐标值加上偏移量：
   ```python 
   新坐标 = 原始坐标 + (x, y)
   ```

2. **叠加效应** &#x20;

   多次调用`translate()`会产生累积效果：
   ```javascript 
   ctx.translate(100, 100); // 原点移动到 (100,100)
   ctx.translate(50, 50);   // 原点移动到 (150,150)
   ```


### 典型应用场景

#### 1. 局部坐标系绘制

```javascript 
ctx.save();
ctx.translate(200, 100);  // 将原点移动到 (200,100)
ctx.fillRect(0, 0, 50, 50); // 实际绘制在画布的 (200,100)-(250,150)
ctx.restore();
```


#### 2. 中心点缩放/旋转

```javascript 
const centerX = canvas.width/2;
const centerY = canvas.height/2;

ctx.translate(centerX, centerY); // 原点移到中心
ctx.scale(2, 2);                // 以中心为基准放大
ctx.translate(-centerX, -centerY); // 坐标补偿
ctx.drawImage(img, 0, 0);        // 图片以画布中心为基准缩放
```


#### 3. 批量绘制重复图形

```javascript 
for(let i = 0; i < 5; i++) {
    ctx.save();
    ctx.translate(i * 60, 0);  // 每次水平偏移60px
    ctx.fillRect(0, 0, 50, 50);
    ctx.restore();
}
```


### 与相关API的对比

| 方法                     | 作用              | 是否影响已绘制内容 |
| ---------------------- | --------------- | --------- |
| \`ctx.translate()\`    | 移动坐标系原点         | 否         |
| \`ctx.moveTo()\`       | 移动路径起点（仅影响路径绘制） | 否         |
| \`ctx.setTransform()\` | 直接重置整个变换矩阵      | 否         |

***

### 使用示例（可视化效果）

```html 
<canvas id="demo" width="400" height="200"></canvas>
<script>
const ctx = document.getElementById('demo').getContext('2d');

// 默认坐标系绘制（红色）
ctx.fillStyle = 'red';
ctx.fillRect(0, 0, 50, 50); 

// 平移后绘制（蓝色）
ctx.translate(100, 50);
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, 50, 50); // 实际显示在 (100,50)-(150,100)

// 再次平移（绿色）
ctx.translate(70, 30);
ctx.fillStyle = 'green';
ctx.fillRect(0, 0, 50, 50); // 实际显示在 (170,80)-(220,130)
</script>
```


### 注意事项

1. **状态管理** &#x20;

   总是配合`save()`/`restore()`使用，**避免平移影响后续绘制：**

```javascript 
ctx.save();
ctx.translate(100, 100);
// 绘制操作...
ctx.restore(); // 恢复原始坐标系
```


1. **性能优化** &#x20;

   在动画中频繁调用时，建议先计算好最终偏移量，减少`translate()`调用次数。
2. **与其它变换的顺序** &#x20;

   **变换顺序不同会导致不同结果：**

```javascript 
// 情况1：先旋转后平移
ctx.rotate(Math.PI/4);
ctx.translate(100, 0);

// 情况2：先平移后旋转
ctx.translate(100, 0);
ctx.rotate(Math.PI/4);
```
