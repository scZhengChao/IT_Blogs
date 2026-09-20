# 更新样式

## 目录

- [单个单元格样式更新](#单个单元格样式更新)
- [批量单元格样式更新](#批量单元格样式更新)
- [基于条件更新样式](#基于条件更新样式)
- [mxClient的批量更新](#mxClient的批量更新)

### 单个单元格样式更新

如果你想更新单个单元格的样式，可借助`mxCell`对象的`setStyle`方法。下面是一个简单示例：

```html 
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>mxGraph Update Style</title>
    <!-- 引入 mxGraph 库 -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mxgraph/4.2.2/mxClient.min.js"></script>
</head>

<body>
    <div id="graphContainer"></div>
    <script type="text/javascript">
        // 初始化 mxGraph
        var container = document.getElementById('graphContainer');
        var graph = new mxGraph(container);
        var parent = graph.getDefaultParent();

        // 开始更新图
        graph.getModel().beginUpdate();
        try {
            // 添加一个单元格
            var vertex = graph.insertVertex(parent, null, 'Hello, World!', 20, 20, 80, 30);
            // 初始样式
            vertex.setStyle('fillColor=lightblue;strokeColor=blue;');
            // 一段时间后更新样式
            setTimeout(function () {
                // 更新样式
                vertex.setStyle('fillColor=yellow;strokeColor=red;');
                // 刷新视图以应用新样式
                graph.refresh();
            }, 2000);
        } finally {
            // 结束更新图
            graph.getModel().endUpdate();
        }
    </script>
</body>

</html>
```


### 批量单元格样式更新

若要更新多个单元格的样式，你可以遍历单元格数组，然后为每个单元格设置新样式。示例如下：

```javascript 
// 假设 cells 是要更新样式的单元格数组
var cells = [cell1, cell2, cell3];
var newStyle = 'fillColor=green;strokeColor=darkgreen;';
graph.getModel().beginUpdate();
try {
    for (var i = 0; i < cells.length; i++) {
        cells[i].setStyle(newStyle);
    }
    graph.refresh();
} finally {
    graph.getModel().endUpdate();
}
```


在这段代码里，遍历`cells`数组，为每个单元格设置新样式，最后刷新视图。

### 基于条件更新样式

你可以依据特定条件更新单元格样式。例如，当单元格的值满足某个条件时更新样式：

```javascript 
// 假设 cell 是要检查的单元格
if (cell.getValue() === 'Special Value') {
    graph.getModel().beginUpdate();
    try {
        cell.setStyle('fillColor=orange;strokeColor=brown;');
        graph.refresh();
    } finally {
        graph.getModel().endUpdate();
    }
}
```


# mxClient的批量更新

```javascript 
setCellStyles: function(model, cells, key, value){
    if (cells != null && cells.length > 0)
    {
      model.beginUpdate();
      try
      {
        for (var i = 0; i < cells.length; i++)
        {
          if (cells[i] != null)
          {
            var style = mxUtils.setStyle(model.getStyle(cells[i]), key, value);
            model.setStyle(cells[i], style);
          }
        }
      }
      finally
      {
        model.endUpdate();
      }
    }
}
```
