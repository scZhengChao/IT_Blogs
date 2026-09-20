# strokeText

## 目录

- [strokeText 方法基础](#strokeText-方法基础)
- [strokeText 与 fillText 对比](#strokeText-与-fillText-对比)
  - [对比示例](#对比示例)
- [高级应用技巧](#高级应用技巧)
  - [1. 文字描边效果增强](#1-文字描边效果增强)
  - [发光文字效果](#发光文字效果)
- [文字换行实现（与 fillText 类似）](#文字换行实现与-fillText-类似)
- [性能考虑](#性能考虑)
- [最佳实践建议](#最佳实践建议)

`strokeText`是 Canvas 2D API 中用于绘制描边文本的方法，与`fillText`类似但**不填充文本内部，只绘制文本轮廓**。下面我将详细介绍这个方法的使用和特

## strokeText 方法基础

`strokeText(text, x, y [, maxWidth])`方法参数：

- `text`: 要绘制的文本字符串
- `x, y`: 文本起始坐标
- `maxWidth`(可选): 文本最大宽度，文本会被压缩以适应这个宽度

## strokeText 与 fillText 对比

| 特性   | strokeText   | fillText |
| ---- | ------------ | -------- |
| 功能   | 绘制文本轮廓       | 填充文本内部   |
| 性能   | 稍高（需要计算描边路径） | 稍低       |
| 适用场景 | 需要空心/发光/边框效果 | 普通文本显示   |
| 可读性  | 低（小字号时可能看不清） | 高        |

### 对比示例

![](./assets/image/image_-BIuThZK_c.png)

```html 
<canvas id="canvas" width="500" height="150"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置公共样式
ctx.font = '24px Arial';
const yPos = 50;

// fillText 示例
ctx.fillStyle = 'red';
ctx.fillText('填充文本', 50, yPos);

// strokeText 示例
ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;
ctx.strokeText('描边文本', 200, yPos);

// 组合使用
ctx.fillStyle = 'green';
ctx.strokeStyle = 'black';
ctx.lineWidth = 2;
ctx.fillText('组合效果', 350, yPos);
ctx.strokeText('组合效果', 350, yPos);
</script>
```


## 高级应用技巧

### 1. 文字描边效果增强

![](./assets/image/image_phFOxolGrd.png)

```html 
<canvas id="canvas" width="500" height="200"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 多层描边实现粗边效果
ctx.font = 'bold 48px Arial';
ctx.strokeStyle = 'black';
ctx.lineWidth = 6;

// 多次描边使边缘更粗
for (let i = 0; i < 3; i++) {
    ctx.strokeText('粗边效果', 50, 100);
}

// 最后填充内部
ctx.fillStyle = 'white';
ctx.fillText('粗边效果', 50, 100);
</script>
```


### 发光文字效果

![](./assets/image/image_7cZe9M_Cyz.png)

```html 
<canvas id="canvas" width="500" height="200"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置背景
ctx.fillStyle = '#333';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// 发光文字实现
ctx.font = 'bold 48px Arial';
const text = '发光文字';

// 多层描边实现发光效果
for (let i = 10; i > 0; i--) {
    ctx.strokeStyle = `rgba(255, 255, 0, ${i/20})`;
    ctx.lineWidth = i;
    ctx.strokeText(text, 50, 100);
}

// 填充文字内部
ctx.fillStyle = 'white';
ctx.fillText(text, 50, 100);
</script>
```


## 文字换行实现（与 fillText 类似）

虽然`strokeText`本身不支持自动换行，但我们可以使用与`fillText`相同的换行逻辑：

![](./assets/image/image_9NwqpWbHZZ.png)

```html 
<canvas id="canvas" width="400" height="300"></canvas>
<script>
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function strokeWrapText(context, text, x, y, maxWidth, lineHeight) {
    let currentLine = '';
    let lineCount = 0;
    
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const testLine = currentLine + char;
        const metrics = context.measureText(testLine);
        
        if (metrics.width > maxWidth || char === '\n') {
            context.strokeText(currentLine, x, y + lineCount * lineHeight);
            currentLine = char === '\n' ? '' : char;
            lineCount++;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        context.strokeText(currentLine, x, y + lineCount * lineHeight);
    }
}

// 设置样式
ctx.font = '18px Arial';
ctx.strokeStyle = 'purple';
ctx.lineWidth = 1.5;

// 使用描边换行函数
const longText = '这是使用strokeText绘制的长文本，需要自动换行显示。与fillText不同，这里只绘制文本轮廓。我们可以使用相同的换行逻辑来实现自动换行功能。';
strokeWrapText(ctx, longText, 30, 50, 340, 28);

// 添加填充文本作为对比
ctx.fillStyle = 'rgba(0, 0, 255, 0.2)';
ctx.fillText(longText, 30, 50);
</script>
```


## 性能考虑

1. **描边比填充更耗性能**：`strokeText`需要计算文本轮廓路径，比`fillText`性能开销更大
2. **多层描边影响**：实现特殊效果时的多层描边会显著增加绘制时间
3. **measureText 调用**：换行实现中的`measureText`调用是性能瓶颈
4. **缓存策略**：对于静态文本，考虑使用离屏 canvas 缓存结果

## 最佳实践建议

1. 避免在小字号时使用纯`strokeText`，可能导致文字难以辨认
2. 组合使用`fillText`和`strokeText`实现最佳可读性和效果
3. 对于复杂文字效果，考虑预渲染到离屏 canvas
4. 动态文本效果中，限制描边层数以保持性能
5. 在需要高性能的场景，减少`strokeText`的使用频率
