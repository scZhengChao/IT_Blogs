# 克隆canvas

## 目录

- [方法1：使用drawImage（推荐）](#方法1使用drawImage推荐)

## 方法1：使用`drawImage`（推荐）

```javascript 
function cloneCanvas(canvas) {
  // 创建新canvas
  const newCanvas = document.createElement('canvas');
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  
  // 绘制原canvas内容到新canvas
  const ctx = newCanvas.getContext('2d');
  ctx.drawImage(canvas, 0, 0);
  
  return newCanvas;
}

// 使用示例
const originalCanvas = document.getElementById('myCanvas');
const clonedCanvas = cloneCanvas(originalCanvas);
document.body.appendChild(clonedCanvas); // 添加到DOM中
```
