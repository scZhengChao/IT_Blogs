# setTransform

## 目录

- [方法定义](#方法定义)
- [参数说明](#参数说明)
- [使用场景](#使用场景)
- [基本示例](#基本示例)
- [与 transform() 的区别](#与-transform-的区别)
- [性能考虑](#性能考虑)
- [高级示例：动画中的变换重置](#高级示例动画中的变换重置)
- [最佳实践](#最佳实践)
- [重置变换的两种方式](#重置变换的两种方式)
- [数学原理](#数学原理)

`setTransform()`是 Canvas 2D API 中用于直接设置当前变换矩阵的方法，与`transform()`方法不同，它会**完全替换当前的变换状态**而**不是累积变换。**

## 方法定义

```javascript 
context.setTransform(a, b, c, d, e, f);
```


## 参数说明

`setTransform()`同样接受 6 个参数，构成一个 3x3 的变换矩阵：

```markdown 
| a c e |
| b d f |
| 0 0 1 |
```


参数含义与`transform()`相同：

- `a`(m11): 水平缩放
- `b`(m12): 水平倾斜
- `c`(m21): 垂直倾斜
- `d`(m22): 垂直缩放
- `e`(dx): 水平移动
- `f`(dy): 垂直移动

## 使用场景

1. 需要重置当前变换状态时
2. 需要**精确控制变换矩阵而不受之前变换影响时**
3. 动画中需要重新设置变换基准时
4. 实现可预测的重复变换效果时

## 基本示例

```html 
<canvas id="setTransformCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>

<script>
const canvas = document.getElementById('setTransformCanvas');
const ctx = canvas.getContext('2d');

// 绘制原始图形
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(50, 50, 100, 50);

// 应用第一个变换
ctx.setTransform(1, 0.3, 0, 1, 30, 0);
ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
ctx.fillRect(50, 50, 100, 50);

// 应用第二个变换（完全替换前一个）
ctx.setTransform(1, 0, 0.5, 1, 0, 30);
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(50, 50, 100, 50);
</script>
```


## 与 transform() 的区别

| 特性    | setTransform() | transform() |
| ----- | -------------- | ----------- |
| 变换累积性 | **重置当前变换**​    | 累积当前变换      |
| 性能    | **更高效**​       | 需要矩阵乘法      |
| 使用复杂度 | 需要完整矩阵         | 可以逐步构建      |
| 可预测性  | 更高             | 可能受之前变换影响   |

## 性能考虑

- `setTransform()`比多次调用`translate()`,`rotate()`,`scale()`组合更高效
- 在动画中，**直接设置矩阵比累积变换性能更好**
- 适合在**已知最终变换矩阵时使用**

## 高级示例：动画中的变换重置

```javascript 
<canvas id="animationCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>

<script>
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
let angle = 0;

function animate() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 绘制参考网格
  drawGrid();
  
  // 计算当前变换参数
  const scale = 0.7 + Math.sin(angle) * 0.3;
  const skewX = Math.sin(angle * 0.5) * 0.5;
  const skewY = Math.cos(angle * 0.3) * 0.3;
  const dx = 150 + Math.sin(angle) * 100;
  const dy = 100 + Math.cos(angle) * 50;
  
  // 使用setTransform确保每次都是全新的变换
  ctx.setTransform(scale, skewX, skewY, scale, dx, dy);
  
  // 绘制图形
  ctx.fillStyle = 'hsl(' + (angle * 30) + ', 80%, 60%)';
  ctx.fillRect(-50, -50, 100, 100);
  
  angle += 0.02;
  requestAnimationFrame(animate);
}

function drawGrid() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = '#eee';
  ctx.lineWidth = 0.5;
  
  for (let x = 0; x <= 400; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 300);
    ctx.stroke();
  }
  
  for (let y = 0; y <= 300; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(400, y);
    ctx.stroke();
  }
  ctx.restore();
}

animate();
</script>
```


## 最佳实践

1. 在动画循环开始时使用`setTransform()`而不是`transform()`
2. 与`save()`和`restore()`配合使用管理状态
3. 对于复杂变换，预先计算好矩阵参数
4. 需要重置为默认状态时可以使用`setTransform(1, 0, 0, 1, 0, 0)`

## 重置变换的两种方式

1. 使用`setTransform()`重置：

```javascript 
ctx.setTransform(1, 0, 0, 1, 0, 0);
```


1. 使用`resetTransform()`(较新浏览器支持)：

```javascript 
ctx.resetTransform();
```


## 数学原理

`setTransform()`直接将当前变换矩阵设置为：

```markdown 
| a c e |
| b d f |
| 0 0 1 |
```


后续坐标变换将按照：

```javascript 
x' = a * x + c * y + e
y' = b * x + d * y + f
```


这与`transform()`的数学运算相同，但不会与之前的变换矩阵相乘。
