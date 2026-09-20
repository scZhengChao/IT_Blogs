# fill

## 目录

- [Canvas API 中的ctx.fill()方法详解](#Canvas-API-中的ctxfill方法详解)
  - [基本语法](#基本语法)
  - [使用方式](#使用方式)
  - [填充规则](#填充规则)
  - [示例代码](#示例代码)
    - [填充复杂形状（带孔）](#填充复杂形状带孔)
    - [渐变填充](#渐变填充)
  - [注意事项](#注意事项)

# Canvas API 中的`ctx.fill()`方法详解

`ctx.fill()`是 Canvas 2D API 中用于填充路径的方法，它会用当前填充样式（`fillStyle`）填充已创建的路径。

## 基本语法

```javascript 
ctx.fill();
```


## 使用方式

`fill()`方法通常与以下方法配合使用：

1. **`beginPath()`** - 开始新路径
2. **绘图方法** - 如`rect()`,`arc()`,`moveTo()`,`lineTo()`等
3. **`closePath()`** - 可选，关闭当前路径

## 填充规则

`fill()`方法遵循两种填充规则：

1. **非零环绕规则（默认）**：
   - 计算路径中每条线段穿过的次数
   - 奇数次数表示内部，偶数次数表示外部
   - 适用于大多数情况
2. **奇偶规则**：
   - 使用`ctx.fill("evenodd")`指定
   - 简单计算路径内部区域
   - 适用于复杂路径（如带孔的形状）

```javascript 
// 使用奇偶规则填充
ctx.fill("evenodd");
```


## 示例代码

### 填充复杂形状（带孔）

![](image_nZUqcF14uc.png)

```html 
<canvas id="complexCanvas" width="300" height="300"></canvas>
<script>
  const canvas = document.getElementById('complexCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = 'green';
  
  // 外部形状
  ctx.beginPath();
  ctx.rect(50, 50, 200, 200);
  
  // 内部孔洞
  ctx.moveTo(100, 100);
  ctx.arc(100, 100, 50, 0, Math.PI * 2);
  
  // 使用evenodd规则填充（外部被填充，内部孔洞不被填充）
  ctx.fill("evenodd");
  
  // 或者使用默认规则（整个形状被填充，包括孔洞）
  // ctx.fill();
</script>
```


### 渐变填充

![](image_4EtHUSGVW1.png)

```html 
<canvas id="gradientCanvas" width="300" height="100"></canvas>
<script>
  const canvas = document.getElementById('gradientCanvas');
  const ctx = canvas.getContext('2d');
  
  // 创建线性渐变
  const gradient = ctx.createLinearGradient(0, 0, 300, 0);
  gradient.addColorStop(0, 'red');
  gradient.addColorStop(0.5, 'yellow');
  gradient.addColorStop(1, 'green');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 300, 100);
</script>
```


## 注意事项

1. **路径必须闭合**：
   - 虽然`fill()`可以填充未闭合的路径，但**显式调用**`closePath()`可以确保路径正确闭合
   - 对于**复杂形状，闭合路径很重要**
2. **填充顺序**：
   - 后绘制的形状会覆盖先绘制的形状
   - **控制绘制顺序可以实现叠加效果**
3. **性能考虑**：
   - 减少路径复杂度可以提高填充性能
   - 对于**静态内容，考虑预渲染到离屏画布**
4. **填充样式**：
   - 可以使用颜色、渐变或图案作为填充
   - 使用`ctx.fillStyle`设置填充样式
5. **与描边区别**：
   - `fill()`只填充路径内部
   - `stroke()`只绘制路径轮廓
   - 可以同时使用两者
