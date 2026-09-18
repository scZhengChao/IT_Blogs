# getProperty

## 目录

- [作用](#作用)
- [典型用法](#典型用法)
- [常见应用场景](#常见应用场景)
- [注意事项](#注意事项)
- [相关方法](#相关方法)

## 作用

`evt.getProperty('cell')`用于从mxGraph事件对象中提取与事件关联的图形元素(单元格)。这个单元格可以是顶点(vertex)、边(edge)或组(group)等mxGraph中的图形元素。

## 典型用法

```javascript 
graph.addListener(mxEvent.CLICK, function(sender, evt) {
    var cell = evt.getProperty('cell');
    
    if (cell) {
        // 对单元格进行操作
        console.log('点击了单元格:', cell.value);
    } else {
        // 点击了画布空白处
        console.log('点击了画布空白处');
    }
});

```


## 常见应用场景

1. **处理点击事件**：判断用户点击的是哪个图形元素
2. **获取选中元素**：在双击、右键等事件中获取目标元素
3. **拖放操作**：在拖放相关事件中获取被拖动的元素

## 注意事项

- 当点击画布空白处时，`evt.getProperty('cell')`会返回null
- 对于某些事件(如缩放、平移)，可能没有关联的单元格
- 单元格对象包含其所有属性和样式信息，可以通过它进行进一步操作

## 相关方法

- `evt.getProperty('event')`：获取原始DOM事件
- `evt.getProperty('state')`：获取单元格的状态对象
- `graph.getSelectionCell()`：获取当前选中的单元格

通过这种方法，mxGraph提供了一种方便的方式来响应用户与图形元素的交互。
