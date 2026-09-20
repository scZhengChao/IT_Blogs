# 进阶版

```html 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>
<body>
<canvas id="mainCanvas"></canvas>
<br>
<button onclick="toggleEraser()">切换橡皮擦</button>

<script>
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    let isErasing = false;
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // 创建两个离屏Canvas
    const imageCanvas = document.createElement('canvas'); // 存储原始图片
    const drawCanvas = document.createElement('canvas');  // 存储涂鸦层
    let baseImage = null;
    function stopDrawing() {
        isDrawing = false;
    }
    function toggleEraser() {
        isErasing = !isErasing;
        document.querySelector('button').textContent =
            isErasing ? '切换画笔' : '切换橡皮擦';
    }
    function getPosition(e) {
        const rect = canvas.getBoundingClientRect();
        return [
            e.clientX - rect.left,
            e.clientY - rect.top
        ];
    }
    // 初始化画布
    function init() {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = 'http://localhost:5173/unnamed.jpg';

        img.onload = () => {
            // 设置所有画布尺寸
            [canvas, imageCanvas, drawCanvas].forEach(c => {
                c.width = img.width;
                c.height = img.height;
            });

            // 将原始图片绘制到imageCanvas
            const imgCtx = imageCanvas.getContext('2d');
            imgCtx.drawImage(img, 0, 0);

            // 初始化主画布
            redraw();
            baseImage = img;
        };
    }

    // 正确的重绘函数（合并原始图片和涂鸦层）
    function redraw() {
        // 1. 先绘制原始图片
        ctx.drawImage(imageCanvas, 0, 0);
        // 2. 再叠加涂鸦层
        ctx.drawImage(drawCanvas, 0, 0);
    }

    // 事件处理
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = getPosition(e);
    }

    function draw(e) {
        if (!isDrawing) return;

        const drawCtx = drawCanvas.getContext('2d');
        drawCtx.beginPath();
        drawCtx.moveTo(lastX, lastY);
        [lastX, lastY] = getPosition(e);
        drawCtx.lineTo(lastX, lastY);

        // 设置绘制样式
        if (isErasing) {
            drawCtx.globalCompositeOperation = 'destination-out';
            drawCtx.strokeStyle = 'rgba(0,0,0,1)';
            drawCtx.lineWidth = 20;
        } else {
            drawCtx.globalCompositeOperation = 'source-over';
            drawCtx.strokeStyle = '#000';
            drawCtx.lineWidth = 5;
        }

        drawCtx.stroke();
        redraw(); // 触发重绘
    }

    // 其他函数保持不变...

    // 初始化画布
    init();
</script>
</body>
</html>
```


**关键改进点：**

1. **三层架构设计**：
   - `imageCanvas`：永久保存原始图片
   - `drawCanvas`：临时保存涂鸦层
   - `mainCanvas`：显示最终合成结果
2. **正确的绘制顺序**：

```javascript 
function redraw() {
  // 先清空主画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 再按顺序合成
  ctx.drawImage(imageCanvas, 0, 0); // 底层：原始图片
  ctx.drawImage(drawCanvas, 0, 0);  // 顶层：涂鸦层
}
```


1. **操作隔离原则**：
   - 所有绘制操作只影响`drawCanvas`
   - `imageCanvas`在初始化后不再修改
   - 每次操作后通过合成刷新显示
2. **擦除机制修正**：

```javascript 
// 擦除时使用 destination-out 模式
drawCtx.globalCompositeOperation = 'destination-out';
// 但只作用于drawCanvas，不会影响imageCanvas
```


**效果验证方法：**

1. 加载完成后尝试在图片上绘制
2. 切换橡皮擦擦除涂鸦
3. 观察底层图片始终保持完整
4. 即使反复擦除同一区域，原始图片像素不受影响

这个方案通过严格分离图像存储层（imageCanvas）和绘制层（drawCanvas），确保了原始图片数据永远不会被修改。每次重绘都是重新合成这两个图层的结果，而不是直接操作原始图像数据。
