# canvas 缩放

## 目录

- [实现原理](#实现原理)
- [步骤与代码示例](#步骤与代码示例)
- [关键点解释](#关键点解释)
- [动态交互扩展](#动态交互扩展)

在Canvas中实现以中心点为基准的缩放，需要通过坐标变换来调整缩放的原点。以下是详细的步骤说明和代码示例：

### 实现原理

Canvas默认的缩放原点在左上角(0,0)，要**改为中心点缩放，需进行以下坐标变换：**

1. **平移画布**：将画布原点移动到中心点。
2. **应用缩放**：执行缩放操作。
3. **反向平移**：调整绘制坐标，使图形围绕中心点缩放。

### 步骤与代码示例

```javascript 
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 获取Canvas中心点坐标
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

// 初始化缩放因子
let scaleFactor = 1;

// 缩放函数
function scaleAtCenter(newScale) {
    // 更新缩放因子（示例用绝对值，实际可结合增量）
    scaleFactor = newScale; 

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 保存当前状态
    ctx.save();

    // 1. 平移到中心点
    ctx.translate(centerX, centerY);

    // 2. 应用缩放
    ctx.scale(scaleFactor, scaleFactor);

    // 3. 反向平移，使图形坐标以中心为基准
    ctx.translate(-centerX, -centerY);

    // 绘制图形（示例：矩形）
    ctx.fillStyle = 'blue';
    ctx.fillRect(centerX - 50, centerY - 50, 100, 100);

    // 恢复状态（不影响后续绘制）
    ctx.restore();
}

// 初始绘制
scaleAtCenter(1);

// 示例：点击按钮放大
document.getElementById('zoomIn').addEventListener('click', () => {
    scaleAtCenter(scaleFactor * 1.1);
});

// 示例：点击按钮缩小
document.getElementById('zoomOut').addEventListener('click', () => {
    scaleAtCenter(scaleFactor * 0.9);
});
```


### 关键点解释

1. **坐标变换顺序**：
   - `translate(centerX, centerY)`将原点移至中心。
   - `scale(scaleFactor, scaleFactor)`在当前原点（即中心）应用缩放。
   - `translate(-centerX, -centerY)`使图形绘制时相对于原始中心坐标计算位置。
2. **图形绘制**：
   - 绘制图形时，需使用原始中心坐标进行计算。例如，矩形的左上角坐标为`(centerX - 50, centerY - 50)`，确保其中心与Canvas中心对齐。
3. **状态管理**：
   - 使用`save()`和`restore()`隔离变换状态，避免影响其他绘制操作。

### 动态交互扩展

若需实现基于鼠标位置的交互缩放，可调整平移量：

```javascript 
function scaleAtPoint(newScale, pointX, pointY) {
    ctx.translate(pointX, pointY);
    ctx.scale(newScale, newScale);
    ctx.translate(-pointX, -pointY);
}
// 调用示例：scaleAtCenter(1.1, mouseX, mouseY);
```
