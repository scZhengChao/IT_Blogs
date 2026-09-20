# mxKeyHandler

## 目录

- [在 mxGraph 中监听键盘上下箭头按键](#在-mxGraph-中监听键盘上下箭头按键)
  - [基本实现方法](#基本实现方法)
    - [1. 使用 mxKeyHandler 监听键盘事件](#1-使用-mxKeyHandler-监听键盘事件)
    - [2. 直接监听键盘事件（备选方案）](#2-直接监听键盘事件备选方案)
  - [高级用法](#高级用法)
    - [1. 结合Ctrl/Shift键的增强控制](#1-结合CtrlShift键的增强控制)
    - [2. 网格对齐移动](#2-网格对齐移动)
  - [注意事项](#注意事项)

# 在 mxGraph 中监听键盘上下箭头按键

在 mxGraph 中监听键盘上下箭头按键可以通过以下方法实现：

## 基本实现方法

### 1. 使用 mxKeyHandler 监听键盘事件

```javascript 
// 创建键盘处理器
var keyHandler = new mxKeyHandler(graph);

// 监听上箭头键
keyHandler.bindKey(38, function(evt) {
    console.log('上箭头键按下');
    // 你的处理逻辑
    moveSelectedCells(0, -10); // 向上移动10像素
});

// 监听下箭头键
keyHandler.bindKey(40, function(evt) {
    console.log('下箭头键按下');
    // 你的处理逻辑
    moveSelectedCells(0, 10); // 向下移动10像素
});

// 移动选中单元格的函数
function moveSelectedCells(dx, dy) {
    var cells = graph.getSelectionCells();
    if (cells.length > 0) {
        graph.getModel().beginUpdate();
        try {
            for (var i = 0; i < cells.length; i++) {
                graph.translateCell(cells[i], dx, dy);
            }
        } finally {
            graph.getModel().endUpdate();
        }
    }
}
```


### 2. 直接监听键盘事件（备选方案）

```javascript 
mxEvent.addListener(document, 'keydown', function(evt) {
    if (graph.isEnabled() && !graph.isEditing()) {
        if (evt.keyCode === 38) { // 上箭头
            console.log('上箭头键按下');
            evt.preventDefault();
            // 处理逻辑
        } else if (evt.keyCode === 40) { // 下箭头
            console.log('下箭头键按下');
            evt.preventDefault();
            // 处理逻辑
        }
    }
});
```


## 高级用法

### 1. 结合Ctrl/Shift键的增强控制

```javascript 
keyHandler.bindKey(38, function(evt) {
    var step = evt.ctrlKey ? 1 : (evt.shiftKey ? 20 : 10);
    moveSelectedCells(0, -step); // 向上移动
});

keyHandler.bindKey(40, function(evt) {
    var step = evt.ctrlKey ? 1 : (evt.shiftKey ? 20 : 10);
    moveSelectedCells(0, step); // 向下移动
});
```


### 2. 网格对齐移动

```javascript 
keyHandler.bindKey(38, function(evt) {
    var gridSize = graph.gridSize;
    var step = gridSize * (evt.shiftKey ? 5 : 1);
    moveSelectedCells(0, -step);
});

keyHandler.bindKey(40, function(evt) {
    var gridSize = graph.gridSize;
    var step = gridSize * (evt.shiftKey ? 5 : 1);
    moveSelectedCells(0, step);
});
```


## 注意事项

1. **焦点问题**：
   - 确保画布或其容器有键盘焦点
   - 可以添加`graph.container.setAttribute('tabindex', '0');`使容器可聚焦
2. **事件冲突**：
   - 如果其他元素拦截了键盘事件，可能需要额外处理
   - 使用`evt.preventDefault()`阻止默认行为
3. **编辑状态**：
   - 检查`graph.isEditing()`避免与文本编辑冲突
4. **销毁处理器**：
   - 记得在不需要时销毁处理器：`keyHandler.destroy()`

[getFunction](./getFunction/index.md "getFunction")
