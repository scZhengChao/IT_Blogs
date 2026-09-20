# font

## 目录

- [基本语法](#基本语法)
- [属性值格式](#属性值格式)
- [常用字体属性](#常用字体属性)
- [示例代码](#示例代码)
  - [1. 基本字体设置](#1-基本字体设置)
  - [2. 完整字体属性设置](#2-完整字体属性设置)
- [实际应用示例](#实际应用示例)
  - [1. 创建动态文本标签](#1-创建动态文本标签)
  - [2. 文本对齐示例](#2-文本对齐示例)
  - [3. 测量文本宽度](#3-测量文本宽度)
- [性能优化建议](#性能优化建议)

`font`是 Canvas 2D API 中用于设置文本样式的属性，它决定了绘制文本时的字体样式、大小和变体。

## 基本语法

```javascript 
ctx.font = value;
```


## 属性值格式

`font`属性的值遵循 CSS 字体属性的格式，语法为：

```markdown 
[ [ 'font-style' || 'font-variant' || 'font-weight' ]? 'font-size' [ '/' 'line-height' ]? 'font-family' ] | caption | icon | menu | message-box | small-caption | status-bar
```


但在 Canvas 中，通常只使用以下简化格式：

```html 
[ 'bold' || 'italic' ]? [ 'small-caps' ]? <size> [ / <line-height> ]? <family>
```


## 常用字体属性

1. **字体样式 (font-style)**
   - `normal`(默认)
   - `italic`
   - `oblique`
2. **字体粗细 (font-weight)**
   - `normal`(默认, 400)
   - `bold`(700)
   - `bolder`
   - `lighter`
   - 数值 (100-900)
3. **字体大小 (font-size)**
   - 绝对大小:`xx-small`,`x-small`,`small`,`medium`,`large`,`x-large`,`xx-large`
   - 相对大小:`smaller`,`larger`
   - 长度值:`px`,`em`,`rem`,`%`等 (最常用)
4. **字体族 (font-family)**
   - 通用族名:`serif`,`sans-serif`,`monospace`,`cursive`,`fantasy`
   - 具体字体名称:`"Arial"`,`"Times New Roman"`,`"Courier New"`等

## 示例代码

### 1. 基本字体设置

![](./image/image_4i5v_8kBCL.png)

```html 
<canvas id="fontCanvas" width="600" height="200"></canvas>
<script>
  const canvas = document.getElementById('fontCanvas');
  const ctx = canvas.getContext('2d');
  
  // 设置字体
  ctx.font = '24px Arial';
  ctx.fillText('Hello Canvas', 20, 50);
  
  // 修改字体样式
  ctx.font = 'italic 20px Georgia';
  ctx.fillText('斜体文本', 20, 90);
  
  // 修改字体粗细
  ctx.font = 'bold 28px "Times New Roman"';
  ctx.fillText('粗体文本', 20, 130);
  
  // 修改字体大小和族
  ctx.font = '16px monospace';
  ctx.fillText('等宽字体', 20, 170);
</script>
```


### 2. 完整字体属性设置

![](./image/image_wWr7nlVpUr.png)

```javascript 
<canvas id="fullFontCanvas" width="600" height="300"></canvas>
<script>
  const canvas = document.getElementById('fullFontCanvas');
  const ctx = canvas.getContext('2d');
  
  // 设置完整字体属性
  ctx.font = 'italic small-caps bold 24px/1.5 "Comic Sans MS", cursive, sans-serif';
  
  // 绘制多行文本展示不同属性
  ctx.fillText('斜体 小型大写字母 粗体 24px 高度1.5倍行距', 20, 50);
  ctx.fillText('字体族优先级: Comic Sans MS → cursive → sans-serif', 20, 90);
  
  // 测试备用字体
  ctx.font = '36px "不存在的字体", Arial, sans-serif';
  ctx.fillText('如果第一个字体不存在，会使用备用字体', 20, 140);
</script>
```


## 实际应用示例

### 1. 创建动态文本标签

![](./image/image_c1oHvmTKsq.png)

```javascript 
<canvas id="labelCanvas" width="400" height="200"></canvas>
<script>
  const canvas = document.getElementById('labelCanvas');
  const ctx = canvas.getContext('2d');
  
  function createLabel(text, x, y, options = {}) {
    const {
      font = '16px Arial',
      fillStyle = 'black',
      strokeStyle = null,
      strokeWidth = 0,
      textAlign = 'left',
      textBaseline = 'top'
    } = options;
    
    // 保存当前状态
    ctx.save();
    
    // 设置样式
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    if (strokeStyle) {
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = strokeWidth;
    }
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    
    // 绘制文本
    ctx.fillText(text, x, y);
    if (strokeStyle) {
      ctx.strokeText(text, x, y);
    }
    
    // 恢复状态
    ctx.restore();
  }
  
  // 使用示例
  createLabel('Hello Canvas', 20, 20, {
    font: 'bold 24px "Comic Sans MS"',
    fillStyle: 'blue',
    strokeStyle: 'black',
    strokeWidth: 2
  });
  
  createLabel('动态文本标签', 20, 60, {
    font: 'italic 18px Georgia',
    fillStyle: 'green'
  });
</script>
```


### 2. 文本对齐示例

![](./image/image_jBMamr0vEn.png)

```javascript 
<canvas id="alignCanvas" width="500" height="200"></canvas>
<script>
  const canvas = document.getElementById('alignCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '20px Arial';
  
  // 左对齐
  ctx.textAlign = 'left';
  ctx.fillText('左对齐 (默认)', 50, 50);
  
  // 居中对齐
  ctx.textAlign = 'center';
  ctx.fillText('居中对齐', 250, 50);
  
  // 右对齐
  ctx.textAlign = 'right';
  ctx.fillText('右对齐', 450, 50);
  
  // 重置对齐
  ctx.textAlign = 'left';
  
  // 基线对齐示例
  ctx.font = '24px Arial';
  ctx.fillText('顶部基线', 50, 100);
  ctx.textBaseline = 'middle';
  ctx.fillText('中间基线', 200, 100);
  ctx.textBaseline = 'bottom';
  ctx.fillText('底部基线', 350, 100);
  
  // 恢复默认基线
  ctx.textBaseline = 'alphabetic';
</script>
```


### 3. 测量文本宽度

![](./image/image_fvRknK4TGb.png)

```html 
<canvas id="measureCanvas" width="600" height="200"></canvas>
<script>
  const canvas = document.getElementById('measureCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '24px Arial';
  
  const text = '测量这段文本的宽度';
  const width = ctx.measureText(text).width;
  
  // 绘制文本
  ctx.fillText(text, 50, 100);
  
  // 绘制文本宽度指示线
  ctx.strokeStyle = 'red';
  ctx.beginPath();
  ctx.moveTo(50, 120);
  ctx.lineTo(50 + width, 120);
  ctx.stroke();
  
  // 显示宽度值
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText(`宽度: ${Math.round(width)} 像素`, 50 + width + 10, 120);
</script>
```


## 性能优化建议

1. **减少字体切换**:
   - 尽量在**绘制相同样式文本时保持字体设置不变**
   - 批量绘制相同字体的文本
2. **缓存测量结果**:
   - 对于静态文本，可以缓存`measureText()`的结果
   - **避免重复计算相同文本的宽度**
3. **使用简单字体**:
   - 复杂字体(如手写体)可能影响渲染性能
   - 在性能敏感场景使用简单无衬线字体
4. **离屏渲染**:
   - 对于复杂文本布局，可以先在离屏画布上渲染
   - 然后将结果绘制到主画布
