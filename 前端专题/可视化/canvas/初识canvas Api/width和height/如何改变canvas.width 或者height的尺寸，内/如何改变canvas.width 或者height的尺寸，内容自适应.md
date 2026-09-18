# 如何改变canvas.width 或者height的尺寸，内容自适应

## 目录

- [不同缩放策略对比](#不同缩放策略对比)
- [进阶实现（等比缩放+居中）](#进阶实现等比缩放居中)
- [常见问题解决](#常见问题解决)

您希望实现的是：​**​当修改`canvas.width`****或****`canvas.height`属性时，画布内容能自动适应新尺寸​**​（不丢失、不拉伸变形）。以下是严格满足这一需求的完整解决方案：

**推荐；**

```html 
<!DOCTYPE html>
<html>
<head>
    <style>
        #canvas-container {
            border: 1px solid #ccc;
            margin: 20px;
        }
    </style>
</head>
<body>
    <div id="canvas-container">
        <canvas id="mainCanvas"></canvas>
    </div>
    <button onclick="resizeCanvas(800, 600)">设为800x600</button>
    <button onclick="resizeCanvas(400, 300)">设为400x300</button>

    <script>
        const canvas = document.getElementById('mainCanvas');
        const ctx = canvas.getContext('2d');
        
        // 初始绘制一些内容
        ctx.fillStyle = 'blue';
        ctx.fillRect(50, 50, 100, 100);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.strokeRect(200, 100, 150, 80);

        // 核心：尺寸调整函数（保持内容自适应）
        function resizeCanvas(newWidth, newHeight) {
            // 1. 创建临时Canvas备份当前内容
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
            
            // 2. 修改主Canvas尺寸（此时会清空内容）
            canvas.width = newWidth;
            canvas.height = newHeight;
            
            // 3. 重新绘制内容（自动适应新尺寸）
            ctx.drawImage(
                tempCanvas, 
                0, 0, tempCanvas.width, tempCanvas.height,  // 源尺寸
                0, 0, canvas.width, canvas.height           // 目标尺寸
            );
            
            // 4. 更新容器尺寸（可选）
            document.getElementById('canvas-container').style.width = newWidth + 'px';
            document.getElementById('canvas-container').style.height = newHeight + 'px';
        }
    </script>
</body>
</html>
```


### 不同缩放策略对比

| 方法        | 代码示例                                                         | 特点           |
| --------- | ------------------------------------------------------------ | ------------ |
| **拉伸填充**​ | \`drawImage(tempCanvas, 0, 0, canvas.width, canvas.height)\` | 内容填满新画布，可能变形 |
| **等比缩放**​ | 计算适应尺寸后绘制                                                    | 保持比例，可能有留白   |
| **平铺重复**​ | 使用\`createPattern()\`                                        | 适合背景纹理       |

***

### 进阶实现（等比缩放+居中）

```javascript 
function resizeCanvas(newWidth, newHeight) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
    
    canvas.width = newWidth;
    canvas.height = newHeight;
    
    // 计算等比缩放后的尺寸
    const ratio = Math.min(
        newWidth / tempCanvas.width,
        newHeight / tempCanvas.height
    );
    const scaledWidth = tempCanvas.width * ratio;
    const scaledHeight = tempCanvas.height * ratio;
    
    // 居中绘制
    const offsetX = (newWidth - scaledWidth) / 2;
    const offsetY = (newHeight - scaledHeight) / 2;
    
    ctx.drawImage(
        tempCanvas,
        0, 0, tempCanvas.width, tempCanvas.height,
        offsetX, offsetY, scaledWidth, scaledHeight
    );
}
```


### 常见问题解决

**Q: 修改尺寸后线条变模糊？**
A: 在高DPI屏幕上，需考虑设备像素比：

```javascript 
const dpr = window.devicePixelRatio || 1;
canvas.width = newWidth * dpr;
canvas.height = newHeight * dpr;
canvas.style.width = newWidth + 'px';
canvas.style.height = newHeight + 'px';
ctx.scale(dpr, dpr);
```


**Q: 如何保留半透明内容？**
A: 确保临时Canvas带有alpha通道：

```javascript 
tempCanvas.getContext('2d', { willReadFrequently: true });
```
