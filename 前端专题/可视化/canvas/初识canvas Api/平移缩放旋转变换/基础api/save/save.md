# save

## 目录

- [核心作用](#核心作用)
- [工作流程（与restore()配合）](#工作流程与restore配合)
- [典型使用场景](#典型使用场景)
  - [1. 临时变换坐标系（如中心缩放）](#1-临时变换坐标系如中心缩放)
  - [2. 临时修改样式](#2-临时修改样式)
  - [3. 嵌套状态管理](#3-嵌套状态管理)
- [底层原理](#底层原理)
- [对比save()与resetTransform()](#对比save与resetTransform)
- [示例代码（可视化演示）](#示例代码可视化演示)
- [常见问题](#常见问题)

`ctx.save()`是 Canvas 2D API 中的一个重要方法，用于**保存当前的绘图状态**，通常与`ctx.restore()`配对使用。它的作用相当于将当前所有的绘图设置 **"快照"保存到栈中，** 便于后续恢复。以下是详细说明：

***

### 核心作用

**保存当前绘图上下文的所有状态**，包括：

1. **坐标系状态**
   - 当前变换矩阵（平移`translate()`、旋转`rotate()`、缩放`scale()`等操作的累积效果）
2. **绘图样式**
   - 颜色（`fillStyle`,`strokeStyle`）
   - 线宽（`lineWidth`）
   - 字体（`font`）
   - 透明度（`globalAlpha`）
   - 混合模式（`globalCompositeOperation`）
3. **裁剪区域**（`clip()`设置的路径）

### 工作流程（与`restore()`配合）

```javascript 
ctx.save();          // 保存当前状态到栈中
// ... 修改绘图状态（如设置新颜色、变换坐标系等）
ctx.restore();       // 恢复之前保存的状态
```


### 典型使用场景

#### 1. 临时变换坐标系（如中心缩放）

```javascript 
ctx.save();                         // 保存默认状态
ctx.translate(100, 100);            // 移动坐标系
ctx.scale(2, 2);                    // 放大两倍
ctx.fillRect(0, 0, 50, 50);         // 在新坐标系下绘制
ctx.restore();                      // 恢复默认坐标系
// 后续绘制不受之前变换影响
```


#### 2. 临时修改样式

```javascript 
ctx.fillStyle = 'blue';
ctx.save();                         // 保存蓝色填充状态
ctx.fillStyle = 'red';              // 临时改为红色
ctx.fillRect(10, 10, 50, 50);       // 绘制红色矩形
ctx.restore();                      // 恢复蓝色填充
ctx.fillRect(70, 10, 50, 50);       // 绘制蓝色矩形
```


#### 3. 嵌套状态管理

```javascript 
ctx.save();                         // 状态1（默认）
ctx.fillStyle = 'red';
ctx.save();                         // 状态2（红色）
ctx.rotate(Math.PI/4);
ctx.save();                         // 状态3（旋转后）

ctx.restore();                      // 回到状态2（红色但未旋转）
ctx.restore();                      // 回到状态1（默认）
```


### 底层原理

- **状态栈结构**：Canvas 维护一个栈结构，`save()`将当前状态压栈，`restore()`弹出栈顶状态。
- **性能提示**：频繁的 save/restore 会影响性能，建议在必要时才使用。

### 对比`save()`与`resetTransform()`

| 方法                       | 作用范围             | 常用场景             |
| ------------------------ | ---------------- | ---------------- |
| \`ctx.save()\`           | 保存\*\*所有\*\*绘图状态 | 需要临时修改多种状态时      |
| \`ctx.restore()\`        | 恢复最近保存的状态        | 与\`save()\`配对使用  |
| \`ctx.resetTransform()\` | 仅重置坐标系（变回单位矩阵）   | 只需清除变换时（不涉及其它样式） |
|                          |                  |                  |

### 示例代码（可视化演示）

```html 
<canvas id="demo" width="400" height="200"></canvas>
<script>
const ctx = document.getElementById('demo').getContext('2d');

// 初始状态
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 50, 50);

// 保存状态（蓝色填充）
ctx.save();
ctx.fillStyle = 'red';
ctx.translate(100, 0);
ctx.fillRect(10, 10, 50, 50); // 红色，位置偏移

// 恢复初始状态
ctx.restore();
ctx.fillRect(200, 10, 50, 50); // 蓝色，无偏移
</script>
```


### 常见问题

1. **忘记调用**\*\*`restore()`\*\*
   - 会导致状态栈堆积，可能引发内存问题。
2. **嵌套层级不匹配**
   - **每个**\*\*`save()`****必须对应一个****`restore()`。\*\*​
3. **与**\*\*`beginPath()`\*\***的区别**
   - `save()`保存\*\*的是绘图状态，而`beginPath()`\*\***只重置路径**。
