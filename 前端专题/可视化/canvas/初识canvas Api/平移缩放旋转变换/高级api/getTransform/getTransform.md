# getTransform

`getTransform()`是 `Canvas 2D` API 中用于获取当前变换矩阵的方法，它返回一个`DOMMatrix`对象，表示当前的变换状态。

## 方法定义

```javascript 
const currentTransform = context.getTransform();
```


## 返回值

返回一个`DOMMatrix`对象，包含以下属性：

- `a`(m11): 水平缩放
- `b`(m12): 水平倾斜
- `c`(m21): 垂直倾斜
- `d`(m22): 垂直缩放
- `e`(m41): 水平移动
- `f`(m42): 垂直移动

## 使用场景

1. 需要保存当前变换状态时
2. 调试复杂变换效果时
3. 需要基于当前变换进行进一步计算时
4. 实现变换状态的保存和恢复

## 基本示例

```html 
<canvas id="getTransformCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>
<script>
const canvas = document.getElementById('getTransformCanvas');
const ctx = canvas.getContext('2d');

// 初始状态
const initialTransform = ctx.getTransform();
console.log("初始变换:", initialTransform);

// 应用一些变换
ctx.translate(100, 50);
ctx.rotate(Math.PI/4);
ctx.scale(1.5, 1.5);

// 获取当前变换
const currentTransform = ctx.getTransform();
console.log("当前变换:", currentTransform);

// 使用获取的变换信息
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
ctx.fillRect(0, 0, 50, 50);

// 重置到初始状态
ctx.setTransform(
  initialTransform.a, initialTransform.b,
  initialTransform.c, initialTransform.d,
  initialTransform.e, initialTransform.f
);

ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
ctx.fillRect(0, 0, 50, 50);
</script>
```


## 与相关方法的比较

| 方法                   | 作用       | 返回值          |
| -------------------- | -------- | ------------ |
| \`getTransform()\`   | 获取当前变换矩阵 | DOMMatrix 对象 |
| \`setTransform()\`   | 设置当前变换矩阵 | 无            |
| \`transform()\`      | 累积变换     | 无            |
| \`resetTransform()\` | 重置为单位矩阵  | 无            |

## 性能考虑

- `getTransform()`调用**本身开销很小**
- **频繁获取变换状态通常不会成为性能瓶颈**
- 保存的`DOMMatrix`对象可以重复使用

## 高级示例：变换状态追踪

```javascript 
<canvas id="trackingCanvas" width="400" height="300" style="border:1px solid #000;"></canvas>
<script>
const canvas = document.getElementById('trackingCanvas');
const ctx = canvas.getContext('2d');

// 变换历史记录
const transformHistory = [];

function applyRandomTransform() {
  const a = Math.random() * 0.5 + 0.5;  // 0.5-1.0
  const b = Math.random() * 0.4 - 0.2;  // -0.2-0.2
  const c = Math.random() * 0.4 - 0.2;  // -0.2-0.2
  const d = Math.random() * 0.5 + 0.5;  // 0.5-1.0
  const e = Math.random() * 100;        // 0-100
  const f = Math.random() * 100;        // 0-100
  
  ctx.transform(a, b, c, d, e, f);
  
  // 记录当前变换
  transformHistory.push(ctx.getTransform());
  
  // 绘制图形
  ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 60%)`;
  ctx.fillRect(0, 0, 30, 30);
}

// 应用5次随机变换
for (let i = 0; i < 5; i++) {
  applyRandomTransform();
}

// 显示变换历史
console.log("变换历史:", transformHistory);

// 逐步回退变换
function undoTransform() {
  if (transformHistory.length > 0) {
    const prevTransform = transformHistory.pop();
    ctx.setTransform(prevTransform);
    redrawCanvas();
  }
}

function redrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  for (let i = 0; i < 10; i++) {
    ctx.fillRect(i * 10, i * 10, 50, 50);
  }
}

// 添加按钮演示回退
const button = document.createElement('button');
button.textContent = 'Undo Transform';
button.onclick = undoTransform;
document.body.appendChild(button);
</script>
```


## 最佳实践

1. 在复杂变换操作前保存当前状态
2. 使用`DOMMatrix`对象的方法进行矩阵运算
3. 结合`save()`和`restore()`使用更安全
4. 调试时使用`getTransform()`检查当前状态

## DOMMatrix 对象方法

获取的`DOMMatrix`对象还提供了一些有用方法：

- `inverse()`: 返回逆矩阵
- `multiply(otherMatrix)`: 矩阵乘法
- `translate(x, y)`: 添加平移
- `scale(scaleX, scaleY)`: 添加缩放
- `rotate(angle)`: 添加旋转

## 浏览器兼容性

`getTransform()`在现代浏览器中得到良好支持，但返回的`DOMMatrix`对象在不同浏览器中可能有细微差异。对于旧浏览器，可以使用以下替代方案：

```javascript 
// 替代方案：手动跟踪变换状态
let currentTransform = {
  a: 1, b: 0, c: 0, d: 1, e: 0, f: 0
};

// 每次应用变换时手动更新
function applyTransform(a, b, c, d, e, f) {
  // 矩阵乘法逻辑
  // ...
  updateCurrentTransform();
}

function updateCurrentTransform() {
  ctx.setTransform(
    currentTransform.a, currentTransform.b,
    currentTransform.c, currentTransform.d,
    currentTransform.e, currentTransform.f
  );
}
```
