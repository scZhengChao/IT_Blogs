# textAlign

## 目录

- [属性值说明](#属性值说明)
  - [基本对齐方式](#基本对齐方式)

`textAlign`是 Canvas 2D API 中用于控制文本水平对齐方式的属性，它决定了文本在绘制时的水平位置相对于指定坐标点的对齐方式。

```typescript 
ctx.textAlign = "left" | "right" | "center" | "start" | "end";
```


## 属性值说明

`textAlign`可以接受以下值：

1. **`"left"`** - 文本左对齐（默认值）
   - 文本的起始边缘与指定的坐标点对齐
   - 对于从左到右的书写系统（如英语），这是最左侧
2. **`"right"`** - 文本右对齐
   - 文本的结束边缘与指定的坐标点对齐
   - 对于从左到右的书写系统，这是最右侧
3. **`"center"`** - 文本居中对齐
   - 文本的中心点与指定的坐标点对齐
4. **`"start"`** - 文本起始边对齐
   - 根据当前文本方向（由`direction`属性决定）确定起始边
   - 对于从左到右的文本是左对齐，从右到左则是右对齐
5. **`"end"`** - 文本结束边对齐
   - 根据当前文本方向确定结束边
   - 对于从左到右的文本是右对齐，从右到左则是左对齐

### 基本对齐方式

&#x20;

```html 
<canvas id="textAlignCanvas" width="600" height="200"></canvas>
<script>
  const canvas = document.getElementById('textAlignCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '24px Arial';
  ctx.strokeStyle = 'black';
  
  // 绘制参考线
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(550, 50);
  ctx.stroke();
  
  // 左对齐
  ctx.textAlign = 'left';
  ctx.fillText('左对齐 (left)', 50, 100);
  
  // 右对齐
  ctx.textAlign = 'right';
  ctx.fillText('右对齐 (right)', 550, 100);
  
  // 居中对齐
  ctx.textAlign = 'center';
  ctx.fillText('居中对齐 (center)', 300, 150);
  
  // start 对齐（对于从左到右文本等同于 left）
  ctx.textAlign = 'start';
  ctx.fillText('start 对齐 (等同于 left)', 50, 190);
  
  // end 对齐（对于从左到右文本等同于 right）
  ctx.textAlign = 'end';
  ctx.fillText('end 对齐 (等同于 right)', 550, 190);
</script>
```
