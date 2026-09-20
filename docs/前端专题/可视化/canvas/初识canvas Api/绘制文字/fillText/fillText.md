# `fillText`

## 目录

- [参数说明](#参数说明)
  - [结合 textAlign 和 textBaseline 使用](#结合-textAlign-和-textBaseline-使用)
  - [使用 maxWidth 参数](#使用-maxWidth-参数)
  - [动态文本绘制](#动态文本绘制)
  - [文本阴影效果](#文本阴影效果)
  - [文本渐变填充](#文本渐变填充)
  - [文本旋转](#文本旋转)
  - [创建交互式文字游戏](#创建交互式文字游戏)
  - [创建文字粒子效果](#创建文字粒子效果)
- [文字换行](#文字换行)
  - [基于空格和字符的手动换行](#基于空格和字符的手动换行)
  - [方法2：更精确的字符级换行（支持中文）](#方法2更精确的字符级换行支持中文)
  - [性能考虑](#性能考虑)
  - [相关属性和方法对比](#相关属性和方法对比)
  - [最佳实践建议](#最佳实践建议)
  - [完整示例：带样式的多段落文本](#完整示例带样式的多段落文本)

`fillText()`是 Canvas 2D API 中用于在画布上绘**制填充文本的核心方法**，它允许开发者在指定位置绘制带有自定义样式的文本内容。

```javascript 
ctx.fillText(text, x, y [, maxWidth]);
```


## 参数说明

- `text`(String): 要绘制的文本内容
- `x`(Number): 文本基线起点的 x 坐标
- `y`(Number): 文本基线起点的 y 坐标
- `maxWidth`(可选, Number): 可选参数，指定文本的最大宽度。如**果文本超过此宽度，将被缩放以适应**

### 结合 textAlign 和 textBaseline 使用

![](image_0URTiYvHvl.png)

```html 
<canvas id="alignBaselineCanvas" width="600" height="300"></canvas>
<script>
  const canvas = document.getElementById('alignBaselineCanvas');
  const ctx = canvas.getContext('2d');
  
  // 设置字体样式
  ctx.font = '24px Arial';
  
  // 绘制参考线
  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(550, 50);
  ctx.moveTo(50, 150);
  ctx.lineTo(550, 150);
  ctx.stroke();
  
  // 左对齐 + 字母基线
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = 'red';
  ctx.fillText('左对齐 + 字母基线', 50, 50);
  
  // 居中对齐 + 中线
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'green';
  ctx.fillText('居中对齐 + 中线', 300, 150);
  
  // 右对齐 + 底部基线
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  ctx.fillStyle = 'blue';
  ctx.fillText('右对齐 + 底部基线', 550, 50);
</script>
```


### 使用 maxWidth 参数

![](image_j7QXOVy2Rh.png)

```html 
<canvas id="maxWidthCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('maxWidthCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  
  // 不限制宽度
  ctx.fillText('这是一段较长的文本内容，没有设置最大宽度限制', 50, 50);
  
  // 限制宽度为150px
  ctx.fillText('这是一段较长的文本内容，设置了最大宽度为150px', 50, 100, 150);
</script>
```


### 动态文本绘制

![](image_h_2rvjQXue.png)

```javascript 
<canvas id="dynamicTextCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('dynamicTextCanvas');
  const ctx = canvas.getContext('2d');
  
  let counter = 0;
  
  function updateText() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = 'purple';
    ctx.fillText(`计数器: ${counter}`, 50, 100);
    
    counter++;
    if (counter > 100) counter = 0;
    
    requestAnimationFrame(updateText);
  }
  
  updateText();
</script>
```


### 文本阴影效果

![](image_BvAkDDDhwW.png)

```html 
<canvas id="shadowTextCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('shadowTextCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '30px Arial';
  
  // 设置阴影
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  
  // 绘制带阴影的文本
  ctx.fillStyle = 'white';
  ctx.fillText('带阴影效果的文本', 50, 100);
  
  // 重置阴影设置
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  
  // 绘制普通文本对比
  ctx.fillStyle = 'black';
  ctx.fillText('普通文本', 50, 150);
</script>
```


### 文本渐变填充

![](image_2Sa6LUZN-i.png)

```html 
<canvas id="gradientTextCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('gradientTextCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建线性渐变
  const gradient = ctx.createLinearGradient(0, 0, 400, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.5, 'yellow');
  gradient.addColorStop(1, 'green');
  
  ctx.font = '40px Arial';
  ctx.fillStyle = gradient;
  ctx.fillText('彩色渐变文本', 50, 100);
</script>
```


### 文本旋转

![](image_MlD89JgAIS.png)

```html 
<canvas id="rotateTextCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('rotateTextCanvas');
  const ctx = canvas.getContext('2d');
  
  // 保存当前状态
  ctx.save();
  
  // 移动到旋转中心点
  ctx.translate(200, 100);
  
  // 旋转画布
  ctx.rotate(Math.PI / 4); // 45度
  
  // 绘制文本
  ctx.font = '30px Arial';
  ctx.fillStyle = 'purple';
  ctx.fillText('旋转45度的文本', -100, 10); // 注意坐标需要调整
  
  // 恢复状态
  ctx.restore();
  
  // 绘制普通文本对比
  ctx.font = '20px Arial';
  ctx.fillText('正常文本', 50, 180);
</script>
```


### 创建交互式文字游戏

![](image_ujCtgcJ0Rf.png)

```html 
<canvas id="gameCanvas" width="600" height="400"></canvas>
<script>
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  
  let score = 0;
  let targetX = 300;
  let targetY = 200;
  let isDragging = false;
  
  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制背景
    ctx.fillStyle = '#f0f8ff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制目标
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(targetX, targetY, 30, 0, Math.PI * 2);
    ctx.fill();
    
    // 绘制分数
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`分数: ${score}`, 20, 30);
    
    // 绘制提示
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('点击并拖动红色圆圈', canvas.width/2, 50);
  }
  
  function drawScoreAnimation() {
    ctx.fillStyle = 'green';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`+${Math.floor(Math.random() * 10) + 1}`, targetX, targetY - 50);
    
    score += Math.floor(Math.random() * 10) + 1;
    drawGame();
    
    if (score % 50 === 0) {
      setTimeout(drawScoreAnimation, 500);
    } else {
      setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGame();
      }, 500);
    }
  }
  
  canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - targetX, 2) + 
      Math.pow(mouseY - targetY, 2)
    );
    
    if (distance < 30) {
      isDragging = true;
    }
  });
  
  canvas.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const rect = canvas.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    
    drawGame();
  });
  
  canvas.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      drawScoreAnimation();
    }
  });
  
  drawGame();
</script>
```


### 创建文字粒子效果

![](image_2Qj55QFKZO.png)

```javascript 
<canvas id="particleCanvas" width="600" height="400"></canvas>
<script>
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  
  const particles = [];
  const text = "Canvas文字粒子效果";
  const fontSize = 60;
  
  // 初始化粒子
  function initParticles() {
    particles.length = 0;
    
    ctx.font = `${fontSize}px Arial`;
    const textWidth = ctx.measureText(text).width;
    
    // 简单模拟粒子位置（实际应用中应该基于文字形状）
    for (let i = 0; i < text.length * 10; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 4 - 2,
        speedY: Math.random() * 4 - 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
      });
    }
  }
  
  // 绘制粒子
  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制文字轮廓
    ctx.font = `${fontSize}px Arial`;
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 2;
    ctx.strokeText(text, 100, 200);
    
    // 绘制粒子
    particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  // 更新粒子位置
  function updateParticles() {
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      
      // 边界检测
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
    });
    
    drawParticles();
    requestAnimationFrame(updateParticles);
  }
  
  initParticles();
  updateParticles();
</script>
```


# 文字换行

### 基于空格和字符的手动换行

![](image_LThRIaWA1A.png)

```html 
<canvas id="canvas" width="400" height="200"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let lineCount = 0;

    for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y + lineCount * lineHeight);
            line = words[i] + ' ';
            lineCount++;
        } else {
            line = testLine;
        }
    }
    
    context.fillText(line, x, y + lineCount * lineHeight);
}

// 设置样式
ctx.font = '16px Arial';
ctx.fillStyle = 'black';

// 使用换行函数
const longText = '这是一个很长的文本，需要自动换行显示。Canvas 的 fillText 方法本身不支持自动换行，所以我们需要自己实现这个功能。';
wrapText(ctx, longText, 20, 40, 360, 24);
</script>
```


### 方法2：更精确的字符级换行（支持中文）

![](image_7WNtKv9ng8.png)

```javascript 
<canvas id="canvas" width="400" height="200"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    let currentLine = '';
    let lineCount = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = context.measureText(testLine);
        
        if (metrics.width > maxWidth) {
            context.fillText(currentLine, x, y + lineCount * lineHeight);
            currentLine = char;
            lineCount++;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        context.fillText(currentLine, x, y + lineCount * lineHeight);
    }
}

// 设置样式
ctx.font = '16px Arial';
ctx.fillStyle = 'black';

// 使用换行函数
const longText = '这是一个很长的文本，需要自动换行显示。Canvas的fillText方法本身不支持自动换行，所以我们需要自己实现这个功能。这种方法对中文支持更好。';
wrapText(ctx, longText, 20, 40, 360, 24);
</script>
```


## 性能考虑

1. **measureText 调用次数**：每次调用`measureText`都有一定的性能开销，对于长文本需要优化
2. **预计算**：对于静态文本，可以预先计算好换行位置
3. **缓存**：对于频繁更新的文本，考虑缓存计算结果

## 相关属性和方法对比

| 方法/属性        | 描述       | 是否支持换行 |
| ------------ | -------- | ------ |
| fillText     | 绘制填充文本   | 否      |
| strokeText   | 绘制描边文本   | 否      |
| measureText  | 测量文本宽度   | \\-    |
| textAlign    | 文本对齐方式   | \\-    |
| textBaseline | 文本基线对齐方式 | \\-    |

## 最佳实践建议

1. 对于动态变化的文本，使用字符级换行更精确
2. 对于已知的静态文本，可以预先计算好换行位置
3. 考虑使用第三方库如 Fabric.js 或 Konva.js 来处理复杂文本需求
4. 对于大量文本渲染，考虑使用离屏 canvas 进行缓存

## 完整示例：带样式的多段落文本

![](image_gBHNlhN_cO.png)

```html 
<canvas id="canvas" width="500" height="300"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function drawParagraph(context, text, x, y, width, lineHeight, color = 'black') {
    context.save();
    context.fillStyle = color;
    
    let currentLine = '';
    let lineCount = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = context.measureText(testLine);
        
        if (metrics.width > width || char === '\n') {
            context.fillText(currentLine, x, y + lineCount * lineHeight);
            currentLine = char === '\n' ? '' : char;
            lineCount++;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        context.fillText(currentLine, x, y + lineCount * lineHeight);
    }
    
    context.restore();
    return lineCount + 1;
}

// 设置样式
ctx.font = '18px "Microsoft YaHei", sans-serif';

// 绘制标题
ctx.fillStyle = '#333';
ctx.font = 'bold 24px "Microsoft YaHei"';
ctx.fillText('Canvas 文字换行示例', 20, 40);

// 绘制段落
ctx.font = '16px "Microsoft YaHei"';
const paragraph1 = '在Canvas中，fillText方法本身不支持自动换行功能。这意味着如果我们想要实现文字自动换行，就需要自己编写代码来处理。这个示例展示了如何实现一个支持换行的文本绘制函数。';
const lines1 = drawParagraph(ctx, paragraph1, 20, 70, 460, 28);

const paragraph2 = '这种方法通过逐个字符测量文本宽度，当超过指定宽度时自动换行。同时，它也支持手动换行符(\\n)。这种实现方式对中文和英文都适用，但需要注意性能问题，特别是对于大量文本的情况。';
drawParagraph(ctx, paragraph2, 20, 70 + lines1 * 28 + 20, 460, 28, '#666');
</script>
```
