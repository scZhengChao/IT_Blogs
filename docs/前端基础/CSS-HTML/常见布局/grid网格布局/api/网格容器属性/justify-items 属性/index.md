# justify-items 属性

定义单元格内容的水平对齐方式（左中右），适用于网格容器里的所有网格项。

属性值：

- start: 左对齐。
- end: 右对齐。
- center: 居中对齐。
- stretch: **当网格项目的宽高未指定时，填满（默认）**。

示例：

```typescript 
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Grid布局</title>
  <style>
    .container {
                display: grid;
                grid-template-rows: 100px 100px 100px;
                grid-template-columns: 100px 100px 100px;
                justify-items: start;
     }
     .item {
      width: 80px;
      height: 80px;
      text-align: center;
      color: #fff;
         border: 1px solid #fff;
      background: lightblue;
     }
  </style>
</head>
<body>
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
  <div class="item">7</div>
  <div class="item">8</div>
  <div class="item">9</div>
</div>
</body>
```


页面效果：

![](./image/image_PWZkXQ35vL.png)

将 justify-items 属性分别修改为 end、center可以分别看到单元格内容在水平方向右对齐、居中对齐，此处限于篇幅不再一一展示。

注意：**只有当网格项目的宽高未指定时**\*\*`justify-items: stretch`\*\***的页面效果才是单元格内容在水平、竖直方向铺满网格**，否则页面效果跟`justify-items: start`一致。

那么当我们不添加宽高属性时， justify-items 取 start 时页面效果又是怎么样呢，答案是如下图所示：

![](./image/image_QG9MPgd7jM.png)

我们发现子元素在水平方向上表现出了宽度的“包裹性”，即由文本内容的宽度决定。
