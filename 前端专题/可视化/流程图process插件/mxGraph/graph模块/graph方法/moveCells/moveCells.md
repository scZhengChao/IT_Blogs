# moveCells

## 目录

- [方法基本用法](#方法基本用法)
  - [方法签名](#方法签名)
  - [参数说明](#参数说明)
- [基础示例](#基础示例)
  - [1. 移动选中单元格](#1-移动选中单元格)
  - [2. 带事务的移动操作](#2-带事务的移动操作)
- [高级用法](#高级用法)
  - [1. 克隆移动（复制并移动）](#1-克隆移动复制并移动)
  - [2. 移动到不同的父容器](#2-移动到不同的父容器)
  - [3. 结合键盘事件移动（如箭头键控制）](#3-结合键盘事件移动如箭头键控制)
- [注意事项](#注意事项)
- [替代方法比较](#替代方法比较)

`graph.moveCells()`是 mxGraph 中用于移动单元格的核心方法，它提供了一种高效的方式来移动一个或多个图形元素。

## 方法基本用法

### 方法签名

```javascript 
graph.moveCells(cells, dx, dy, clone, target, evt, mapping)
```


### 参数说明

| 参数          | 类型      | 说明                        |
| ----------- | ------- | ------------------------- |
| \`cells\`   | Array   | 要移动的单元格数组                 |
| \`dx\`      | Number  | X轴方向的移动距离（像素）             |
| \`dy\`      | Number  | Y轴方向的移动距离（像素）             |
| \`clone\`   | Boolean | 是否创建副本而不是移动原单元格（默认为false） |
| \`target\`  | mxCell  | 移动后的父单元格（可选）              |
| \`evt\`     | Event   | 关联的事件对象（可选）               |
| \`mapping\` | Object  | 映射表用于克隆操作（可选）             |

## 基础示例

### 1. 移动选中单元格

```javascript 
// 获取当前选中的单元格
var selectedCells = graph.getSelectionCells();

// 向右移动10像素，向下移动20像素
graph.moveCells(selectedCells, 10, 20);
```


### 2. 带事务的移动操作

```javascript 
graph.getModel().beginUpdate();
try {
    graph.moveCells(selectedCells, 30, 0);
} finally {
    graph.getModel().endUpdate();
}
```


## 高级用法

### 1. 克隆移动（复制并移动）

```javascript 
// 克隆并移动选中单元格
var clonedCells = graph.moveCells(selectedCells, 50, 50, true);

// 克隆后的新单元格会被自动选中
graph.setSelectionCells(clonedCells);
```


### 2. 移动到不同的父容器

```javascript 
var newParent = graph.getDefaultParent(); // 或其他父单元格
graph.moveCells(selectedCells, 0, 0, false, newParent);
```


### 3. 结合键盘事件移动（如箭头键控制）

```javascript 
mxEvent.addListener(document, 'keydown', function(evt) {
    if (!graph.isEditing()) {
        var step = 10;
        var cells = graph.getSelectionCells();
        
        if (cells.length > 0) {
            switch(evt.keyCode) {
                case 37: // 左箭头
                    graph.moveCells(cells, -step, 0);
                    break;
                case 38: // 上箭头
                    graph.moveCells(cells, 0, -step);
                    break;
                case 39: // 右箭头
                    graph.moveCells(cells, step, 0);
                    break;
                case 40: // 下箭头
                    graph.moveCells(cells, 0, step);
                    break;
            }
            mxEvent.consume(evt);
        }
    }
});
```


## 注意事项

1. **性能考虑**：
   - 移动大量单元格时，应使用事务包装（`beginUpdate()`/`endUpdate()`）
   - 对于复杂图形，考虑使用`graph.getModel().execute()`方式
2. **撤销/重做**：
   - 默认情况下，移动操作会被添加到撤销历史
   - 如果不想记录到历史，可以使用`graph.getModel().setGeometry()`
3. **边界检查**：
   - 移动前可检查是否超出画布边界

```javascript 
function canMove(cell, dx, dy) {
    var geo = graph.getCellGeometry(cell);
    return (geo.x + dx >= 0 && geo.y + dy >= 0);
}
```


1. **事件触发**：

- 移动操作会触发`cellsMoved`事件
- 可以监听此事件进行额外处理：

```javascript 
graph.addListener(mxEvent.CELLS_MOVED, function(sender, evt) {
    var cells = evt.getProperty('cells');
    console.log('单元格已移动:', cells);
});
```


## 替代方法比较

| 方法                                 | 特点                | 适用场景        |
| ---------------------------------- | ----------------- | ----------- |
| \`graph.moveCells()\`              | 批量移动，支持克隆，自动处理连接线 | 常规移动操作      |
| \`graph.translateCell()\`          | 单个单元格移动           | 需要精细控制单个单元格 |
| \`graph.getModel().setGeometry()\` | 底层API，不触发默认事件     | 需要完全控制移动行为  |

`graph.moveCells()`是大多数情况下**移动单元格的最佳选择，因为它自动处理了连接线的更新和事件的触发。**
