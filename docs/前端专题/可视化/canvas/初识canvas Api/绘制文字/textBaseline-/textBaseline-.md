# textBaseline&#x20;

## 目录

- [基本语法](#基本语法)
- [属性值说明](#属性值说明)
- [示例代码](#示例代码)
  - [1. 基本垂直对齐方式](#1-基本垂直对齐方式)
- [注意事项](#注意事项)
- [实际应用示例](#实际应用示例)
  - [1. 创建数据表格](#1-创建数据表格)
- [性能优化建议](#性能优化建议)

**控制文本垂直对齐方式的属性**，它决定了文本在绘制时的垂直位置相对于指定坐标点的对齐方式。

## 基本语法

```javascript 
ctx.textBaseline = "top" | "hanging" | "middle" | "alphabetic" | "ideographic" | "bottom";
```


## 属性值说明

`textBaseline`可以接受以下值：

1. **`"top"`** - 文本顶部对齐
   - 文本的顶部边缘与指定的坐标点对齐
2. **`"hanging"`** - 悬挂基线对齐
   - 类似于印度语和东南亚文字的基线标准
   - 在大多数拉丁语系文字中效果与`"top"`相似
3. **`"middle"`** - 文本垂直居中对齐
   - 文本的中心点与指定的坐标点对齐
4. **`"alphabetic"`** - 字母基线对齐（默认值）
   - 文本的字母基线与指定的坐标点对齐
   - 这是大多数拉丁语系文字的标准基线
5. **`"ideographic"`** - 表意文字基线对齐
   - 文本的表意文字基线与指定的坐标点对齐
   - 对于包含汉字、日文等表意文字的文本，效果与`"alphabetic"`不同
6. **`"bottom"`** - 文本底部对齐
   - 文本的底部边缘与指定的坐标点对齐

## 示例代码

### 1. 基本垂直对齐方式

```html 
<canvas id="textBaselineCanvas" width="600" height="400"></canvas>
<script>
  const canvas = document.getElementById('textBaselineCanvas');
  const ctx = canvas.getContext('2d');
  
  ctx.font = '24px Arial';
  ctx.strokeStyle = 'black';
  
  // 绘制参考线
  ctx.beginPath();
  ctx.moveTo(50, 50);
  ctx.lineTo(550, 50);
  ctx.moveTo(50, 150);
  ctx.lineTo(550, 150);
  ctx.moveTo(50, 250);
  ctx.lineTo(550, 250);
  ctx.stroke();
  
  // 绘制说明文字
  ctx.textBaseline = 'top';
  ctx.fillText('top (文本顶部对齐)', 50, 50);
  
  ctx.textBaseline = 'hanging';
  ctx.fillText('hanging (悬挂基线)', 250, 50);
  
  ctx.textBaseline = 'middle';
  ctx.fillText('middle (垂直居中)', 450, 50);
  
  // 绘制中间参考线
  ctx.beginPath();
  ctx.moveTo(50, 150);
  ctx.lineTo(550, 150);
  ctx.stroke();
  
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('alphabetic (字母基线，默认)', 50, 150);
  
  ctx.textBaseline = 'ideographic';
  ctx.fillText('ideographic (表意文字基线)', 250, 150);
  
  // 绘制底部参考线
  ctx.beginPath();
  ctx.moveTo(50, 250);
  ctx.lineTo(550, 250);
  ctx.stroke();
  
  ctx.textBaseline = 'bottom';
  ctx.fillText('bottom (文本底部对齐)', 50, 250);
</script>
```


## 注意事项

1. **默认值**：
   - `textBaseline`的默认值是`"alphabetic"`（字母基线）
2. **书写方向影响**：
   - 对于从右到左的书写系统（如阿拉伯语），基线的定义可能会有所不同
   - 可以使用`ctx.direction`属性设置文本方向（`"ltr"`或`"rtl"`）
3. **坐标点位置**：
   - 基线决定了文本相对于指定绘制坐标的垂直位置
   - 例如，当使用`textBaseline: 'middle'`时，指定的 y 坐标是文本的中心点
4. **性能考虑**：
   - 频繁更改`textBaseline`会影响性能
   - 尽量批量设置相同基线方式的文本绘制
5. **与 textAlign 配合**：
   - `textAlign`控制水平对齐
   - `textBaseline`控制垂直对齐
   - 两者结合可以实现精确的文本定位和对齐
6. **测量文本高度**：
   - 使用`ctx.measureText(text).width`可以获取文本宽度
   - 要获取文本高度，需要使用`ctx.font`的大小信息
   - 可以通过`ctx.font`的大小估算文本高度（通常为字体大小的80-90%）

## 实际应用示例

### 1. 创建数据表格

![](image_KXny-3Oqgl.png)

```javascript 
<canvas id="dataTableCanvas" width="600" height="400"></canvas>
<script>
  const canvas = document.getElementById('dataTableCanvas');
  const ctx = canvas.getContext('2d');
  
  const data = [
    { name: '项目A', value: 120, percentage: 30 },
    { name: '项目B', value: 200, percentage: 50 },
    { name: '项目C', value: 80, percentage: 20 }
  ];
  
  function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制表头
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('项目名称', 50, 50);
    ctx.textAlign = 'center';
    ctx.fillText('数值', 250, 50);
    ctx.textAlign = 'right';
    ctx.fillText('百分比', 450, 50);
    
    // 绘制分隔线
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(50, 60);
    ctx.lineTo(550, 60);
    ctx.stroke();
    
    // 绘制数据行
    data.forEach((item, i) => {
      const y = 90 + i * 40;
      
      // 项目名称
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#666';
      ctx.font = '14px Arial';
      ctx.fillText(item.name, 50, y);
      
      // 数值
      ctx.textAlign = 'center';
      ctx.fillText(item.value, 250, y);
      
      // 百分比
      ctx.textAlign = 'right';
      ctx.fillText(`${item.percentage}%`, 450, y);
      
      // 进度条背景
      ctx.fillStyle = '#eee';
      ctx.fillRect(50, y + 10, 400, 8);
      
      // 进度条
      ctx.fillStyle = i % 2 === 0 ? '#4CAF50' : '#2196F3';
      ctx.fillRect(50, y + 10, item.value * 4, 8);
    });
  }
  
  drawTable();
</script>
```


## 性能优化建议

1. **减少基线切换**：
   - 尽量在**绘制相同基线方**式的文本时保持`textBaseline`不变
   - 批量处理相同基线方式的文本绘制
2. **缓存测量结果**：
   - 对于静态文本，可以缓存`measureText()`的结果
   - 避免重复计算相同文本的宽度
3. **使用简单字体**：
   - 复杂字体可能影响渲染性能
   - 在性能敏感场景使用简单无衬线字体
4. **离屏渲染**：
   - 对于**复杂文本布局，可以先在离屏画布上渲染**
   - 然后将结果绘制到主画布

`textBaseline`是 Canvas 文本绘制的核心属性之一，合理设置可以创建各种垂直对齐方式的文本效果。通过结合`textAlign`属性，可以实现精确的文本定位和对齐
