# restore

## 目录

- [核心作用](#核心作用)
- [关键特性](#关键特性)
- [工作原理](#工作原理)
- [典型应用场景](#典型应用场景)
  - [1. 临时修改样式](#1-临时修改样式)
  - [2. 局部坐标系变换](#2-局部坐标系变换)
  - [3. 嵌套状态管理](#3-嵌套状态管理)
- [与相关API的对比](#与相关API的对比)
- [示例代码（状态栈演示）](#示例代码状态栈演示)
- [常见问题解决方案](#常见问题解决方案)
- [性能优化建议](#性能优化建议)

`ctx.restore()`是 Canvas 2D API 中用于**恢复之前保存的绘图状态**的方法，必须与`ctx.save()`配对使用。以下是详细解析：

***

### 核心作用

**将绘图状态恢复到最近一次**\*\*`save()`\*\***保存时的状态**，包括：

1. **坐标系状态**（平移/旋转/缩放等变换）
2. **绘图样式**（颜色、线宽、字体等）
3. **裁剪区域**（`clip()`设置的路径）
4. **其他上下文属性**（阴影、透明度等）

### 关键特性

| 特性           | 说明                                                   |
| ------------ | ---------------------------------------------------- |
| **栈结构管理**​   | 状态按照`save()`的**调用顺序入栈，** **`restore()`** **按相反顺序出栈** |
| **非对称调用**​   | 必须与\`save()\`\*\*成对出现，否则会抛出异常\*\*                    |
| **不影响绘制内容**​ | **仅恢复状态，不会清除已绘制的内容**​                                |
| **性能影响**​    | **频繁调用可能影响性能，建议在必要时使用**​                             |

***

### 工作原理

1. **状态栈机制** &#x20;

   Canvas 维护一个状态栈，每次`save()`将当前状态压栈，`restore()`弹出栈顶状态。
2. **典型工作流程**

```javascript 
ctx.save();          // 保存状态①（默认状态）
ctx.fillStyle = 'red';
ctx.translate(100, 100);

ctx.save();          // 保存状态②（红色填充+已平移）
ctx.rotate(Math.PI/4);

ctx.restore();       // 恢复状态② → 红色填充+平移状态（无旋转）
ctx.restore();       // 恢复状态① → 完全默认状态
```


### 典型应用场景

#### 1. 临时修改样式

```javascript 
// 默认样式
ctx.fillStyle = 'blue';
ctx.fillRect(10, 10, 50, 50);

// 临时修改
ctx.save();
ctx.fillStyle = 'red';
ctx.fillRect(70, 10, 50, 50); // 红色矩形
ctx.restore(); // 恢复蓝色填充

ctx.fillRect(130, 10, 50, 50); // 自动变回蓝色
```


#### 2. 局部坐标系变换

```javascript 
ctx.save();
ctx.translate(150, 150); // 移动原点
ctx.rotate(Math.PI/4);   // 旋转45度
ctx.fillRect(0, 0, 50, 50); // 在变换后坐标系绘制
ctx.restore(); // 坐标系恢复默认

// 后续绘制不受之前变换影响
ctx.fillRect(200, 10, 50, 50); 
```


#### 3. 嵌套状态管理

```javascript 
function drawWheel(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    drawSpokes(); // 绘制轮辐
    ctx.restore();
}

// 同时绘制多个独立旋转的轮子
drawWheel(100, 100);
drawWheel(300, 200);
```


### 与相关API的对比

| 方法                     | 作用范围            | 常用场景              |
| ---------------------- | --------------- | ----------------- |
| \`ctx.save()\`         | 保存当前所有状态        | 需要临时修改状态时         |
| \`ctx.restore()\`      | 恢复最近保存的状态       | 与\`save()\`配对使用   |
| \`ctx.reset()\`        | 重置整个上下文（包括画布内容） | 需要完全清空画布时（非标准API） |
| \`ctx.setTransform()\` | 仅重置变换矩阵         | 需要清除变换但保留其他样式时    |

***

### 示例代码（状态栈演示）

```html 
<canvas id="demo" width="400" height="200"></canvas>
<script>
const ctx = document.getElementById('demo').getContext('2d');

// 初始状态
ctx.fillStyle = 'black';
ctx.fillRect(10, 10, 50, 50); // 黑方块

// 第一层状态（红色+平移）
ctx.save();
ctx.fillStyle = 'red';
ctx.translate(100, 0);
ctx.fillRect(10, 10, 50, 50); // 红方块（位置110,10）

// 第二层状态（绿色+旋转）
ctx.save();
ctx.fillStyle = 'green';
ctx.rotate(Math.PI/6);
ctx.fillRect(10, 10, 50, 50); // 绿方块（旋转+偏移）
ctx.restore(); // 回到第一层状态

// 继续使用第一层状态（红色）
ctx.fillRect(70, 70, 50, 50); // 红方块（位置170,70）
ctx.restore(); // 回到初始状态

// 恢复默认（黑色）
ctx.fillRect(200, 10, 50, 50); // 黑方块
</script>
```


### 常见问题解决方案

1. **忘记调用**\*\*`restore()`\*\*

```javascript 
// 错误：状态泄漏影响后续绘制
function drawButton() {
    ctx.save();
    ctx.fillStyle = 'blue';
    // ...绘制按钮
    // 忘记restore!
}

// 正确：使用try-finally确保恢复
function drawButton() {
    ctx.save();
    try {
        ctx.fillStyle = 'blue';
        // ...绘制
    } finally {
        ctx.restore();
    }
}
```


​**​2. 嵌套层级错误**

```javascript 
// 错误：restore()调用次数多于save()
ctx.save();
ctx.restore();
ctx.restore(); // 抛出异常

// 正确：保持对称调用
function draw() {
    ctx.save();
    // ...操作
    ctx.restore();
}
```


1. **与路径绘制的混淆**

```javascript 
// 错误：误以为restore()会清除路径
ctx.beginPath();
ctx.rect(10, 10, 50, 50);
ctx.save(); // 保存状态（不保存路径！）
ctx.restore(); // 路径仍然存在

// 正确：路径需手动重新开始
ctx.beginPath(); // 明确开始新路径
```


### 性能优化建议

1. **避免深度嵌套** &#x20;

   **超过10层的状态栈可能影响性能，建议重构代码。**
2. **离屏Canvas替代方案** &#x20;

   对复杂的状态切换 **，可改用离屏Canvas绘制后合成**

```javascript 
// 创建离屏Canvas
const offscreen = new OffscreenCanvas(200, 200);
const offCtx = offscreen.getContext('2d');

// 在离屏Canvas上应用状态
offCtx.fillStyle = 'red';
offCtx.fillRect(0, 0, 100, 100);

// 主Canvas直接绘制结果
ctx.drawImage(offscreen, 0, 0);
```


1. **批量操作**
   合并需要相同状态的绘制操作，减少 save/restore 调用次数：

```javascript 
// 低效：每次修改都save/restore
for(let i=0; i<10; i++) {
    ctx.save();
    ctx.translate(i*30, 0);
    drawItem();
    ctx.restore();
}

// 高效：统一处理状态
ctx.save();
for(let i=0; i<10; i++) {
    ctx.setTransform(1,0,0,1, i*30,0);
    drawItem();
}
ctx.restore();
```
