# 描边色strokeStyle

## 目录

- [描边色](#描边色)
- [二、颜色值的格式](#二颜色值的格式)
- [三、渐变的创建与应用](#三渐变的创建与应用)
  - [1. 线性渐变（createLinearGradient）](#1-线性渐变createLinearGradient)
  - [2. 径向渐变（createRadialGradient）](#2-径向渐变createRadialGradient)
- [四、图案的创建与应用](#四图案的创建与应用)
- [五、与其他属性的关系](#五与其他属性的关系)
- [六、性能注意事项](#六性能注意事项)
- [七、常见应用场景](#七常见应用场景)
- [八、示例：动态渐变描边](#八示例动态渐变描边)

##### 描边色

用于设置绘制路径的线条颜色、渐变或图案。它是控制图形轮廓外观的核心属性，可应用于直线、圆弧、矩形等各种路径。

```javascript 
const ctx = canvas.getContext('2d');

// 1. 设置纯色（CSS 颜色值）
ctx.strokeStyle = 'red';              // 颜色名称
ctx.strokeStyle = '#FF0000';          // 十六进制
ctx.strokeStyle = 'rgb(255, 0, 0)';   // RGB
ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)'; // 带透明度

// 2. 设置线性渐变
const linearGradient = ctx.createLinearGradient(0, 0, 200, 0);
linearGradient.addColorStop(0, 'blue');
linearGradient.addColorStop(1, 'white');
ctx.strokeStyle = linearGradient;

// 3. 设置径向渐变
const radialGradient = ctx.createRadialGradient(50, 50, 10, 50, 50, 50);
radialGradient.addColorStop(0, 'yellow');
radialGradient.addColorStop(1, 'transparent');
ctx.strokeStyle = radialGradient;

// 4. 设置图案
const patternImage = new Image();
patternImage.src = 'pattern.png';
patternImage.onload = () => {
  const pattern = ctx.createPattern(patternImage, 'repeat');
  ctx.strokeStyle = pattern;
};

// 应用样式到路径
ctx.beginPath();
ctx.rect(10, 10, 100, 100);
ctx.stroke(); // 使用当前 strokeStyle 描边
```


### 二、颜色值的格式

`strokeStyle`支持所有 CSS 颜色格式：

| 格式   | 示例                            | 说明            |
| ---- | ----------------------------- | ------------- |
| 颜色名称 | \`'red'\`,\`'transparent'\`   | 标准 CSS 颜色名    |
| 十六进制 | \`'#FF0000'\`,\`'#F008'\`     | 带或不带透明度（8 字符） |
| RGB  | \`'rgb(255, 0, 0)'\`          | 范围 0-255      |
| RGBA | \`'rgba(255, 0, 0, 0.5)'\`    | 透明度 0.0-1.0   |
| HSL  | \`'hsl(0, 100%, 50%)'\`       | 色相、饱和度、亮度     |
| HSLA | \`'hsla(0, 100%, 50%, 0.5)'\` | 带透明度的 HSL     |

### 三、渐变的创建与应用

#### 1. 线性渐变（`createLinearGradient`）

```javascript 
// 从左到右的红蓝渐变
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, 'red');     // 起点颜色
gradient.addColorStop(0.5, 'purple'); // 中间颜色
gradient.addColorStop(1, 'blue');     // 终点颜色

ctx.strokeStyle = gradient;
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(200, 50);
ctx.stroke();
```


#### 2. 径向渐变（`createRadialGradient`）

```javascript 
// 从中心向外的黄到透明渐变
const gradient = ctx.createRadialGradient(50, 50, 10, 50, 50, 50);
gradient.addColorStop(0, 'yellow');
gradient.addColorStop(1, 'transparent');

ctx.strokeStyle = gradient;
ctx.beginPath();
ctx.arc(50, 50, 50, 0, Math.PI * 2);
ctx.stroke();
```


### 四、图案的创建与应用

```javascript 
const img = new Image();
img.src = 'pattern.png';
img.onload = () => {
  // 创建重复图案
  const pattern = ctx.createPattern(img, 'repeat'); // 可选 'repeat-x', 'repeat-y', 'no-repeat'
  ctx.strokeStyle = pattern;
  
  // 绘制带图案边框的矩形
  ctx.beginPath();
  ctx.rect(10, 10, 100, 100);
  ctx.lineWidth = 10;
  ctx.stroke();
};
```


### 五、与其他属性的关系

1. **`lineWidth`**：线条宽度会影响`strokeStyle`的显示效果：

```javascript 
ctx.lineWidth = 5; // 较宽的线条会更明显地显示渐变或图案
```


1. **`lineCap`****和****`lineJoin`**：控制线条端点和连接点的样式：

```javascript 
ctx.lineCap = 'round';    // 圆角端点
ctx.lineJoin = 'bevel';   // 斜角连接
```


3 .**路径的闭合性**：`closePath()`会影响线条的连接方式：

```javascript 
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(100, 10);
ctx.lineTo(100, 100);
// ctx.closePath(); // 取消注释会闭合路径
ctx.stroke();
```


### 六、性能注意事项

1. **避免频繁创建渐变 / 图案**：

```javascript 
// 推荐：创建一次，重复使用
const gradient = ctx.createLinearGradient(0, 0, 100, 0);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');

function draw() {
  ctx.strokeStyle = gradient; // 复用渐变
  // 绘制操作
}
```


1. **图案加载状态**：
   - 确保图像加载完成后再应用图案，否则可能显示空白。

### 七、常见应用场景

1. **绘制边框**：

```javascript 
ctx.strokeStyle = '#333';
ctx.lineWidth = 2;
ctx.strokeRect(10, 10, 100, 100);
```


1. **创建视觉强调**：

```javascript 
// 高亮选中元素
ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
ctx.lineWidth = 3;
ctx.stroke();
```


1. **复杂图形的描边**：

```javascript 
// 绘制星形并应用渐变描边
ctx.strokeStyle = ctx.createLinearGradient(0, 0, 100, 0);
// 添加颜色停止点...
drawStarPath(ctx, 50, 50, 5, 30, 15);
ctx.stroke();
```


### 八、示例：动态渐变描边

```html 
<canvas id="canvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // 创建动画循环
  let hue = 0;
  function animate() {
    hue = (hue + 1) % 360;
    
    // 创建随时间变化的渐变
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
    gradient.addColorStop(1, `hsl(${(hue + 180) % 360}, 100%, 50%)`);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 5;
    
    // 绘制波浪线
    ctx.beginPath();
    for (let x = 0; x < canvas.width; x++) {
      const y = canvas.height / 2 + Math.sin(x * 0.05) * 50;
      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    
    requestAnimationFrame(animate);
  }
  
  animate();
</script>
```
