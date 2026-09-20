# transform

## 目录

- [方法定义](#方法定义)
- [参数说明](#参数说明)
- [使用场景](#使用场景)
- [基本示例](#基本示例)
- [与相关方法的比较](#与相关方法的比较)
- [性能考虑](#性能考虑)
- [高级示例：自定义扭曲效果](#高级示例自定义扭曲效果)
- [最佳实践](#最佳实践)
- [数学原理](#数学原理)

`transform()`是 Canvas 2D API 中的一个重要方法，用于对当前绘图上下文进行矩阵变换。它允许你对后续绘制的图形进行复杂的变形操作。

## 方法定义

```javascript 
context.transform(a, b, c, d, e, f);
```


## 参数说明

`transform()`方法接受 6 个参数，这些参数构成了一个 3x3 的变换矩阵：

```markdown 
| a c e |
| b d f |
| 0 0 1 |
```


具体作用：

- `a`(m11): 水平缩放
- `b`(m12): 水平倾斜
- `c`(m21): 垂直倾斜
- `d`(m22): 垂直缩放
- `e`(dx): 水平移动
- `f`(dy): 垂直移动

## 使用场景

1. 复杂变换组合
2. 需要累积变换效果时
3. 实现自定义变形效果
4. 需要精确控制变换矩阵时

## 基本示例

```html 
<canvas id="myCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>

<script>
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 绘制原始矩形
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(50, 50, 100, 50);

// 应用变换
ctx.transform(1, 0.5, -0.5, 1, 30, 10);

// 绘制变换后的矩形
ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(50, 50, 100, 50);
</script>
```


## 与相关方法的比较

1. **translate()、scale()、rotate()**：
   - 这些方法是`transform()`的特例
   - 更易用但功能有限
   - **性能上无显著差异**
2. **setTransform()**：
   - `transform()`是**累积变换**
   - `setTransform()`会**重置变换矩阵**

## 性能考虑

- 变换操作会增加计算量
- **过多的变换嵌套可能影响性**能
- 对于静态变换，应在绘制前一次性设置好

## 高级示例：自定义扭曲效果

```javascript 
<canvas id="distortCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>

<script>
const canvas = document.getElementById('distortCanvas');
const ctx = canvas.getContext('2d');

// 绘制网格
function drawGrid() {
  ctx.strokeStyle = '#ccc';
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
}

drawGrid();

// 应用波浪形变换
for (let x = 0; x < 400; x += 20) {
  const yOffset = Math.sin(x / 30) * 15;
  
  // 对每个垂直条带应用不同的变换
  ctx.transform(1, 0, 0.1 * Math.sin(x/20), 1, 0, yOffset);
  
  // 绘制变形的矩形
  ctx.fillStyle = `hsl(${x}, 70%, 60%)`;
  ctx.fillRect(x, 50, 20, 200);
}
</script>
```


## 最佳实践

1. 在需要多个变换时，考虑使用`transform()`而不是多个单独的方法调用
2. 使用`save()`和`restore()`管理变换状态
3. 对于重复使用的变换，可以预先计算矩阵
4. 避免在动画循环中频繁计算复杂变换

## 数学原理

`transform()`实现的数学运算是矩阵乘法。新坐标 (x', y') 由以下公式计算：

```matlab 
x' = a * x + c * y + e
y' = b * x + d * y + f
```


这使得它可以表示任何仿射变换（线性变换加平移）

不同参数对矩形的影响：

- a,d 控制缩放
- b,c 控制倾斜
- e,f 控制平移

通过组合这些参数，可以实现复杂的变形效果。
