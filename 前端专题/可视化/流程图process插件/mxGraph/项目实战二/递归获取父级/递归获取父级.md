# 递归获取父级

## 目录

- [1. 基本方法：使用getParent()](#1-基本方法使用getParent)
- [2. 获取默认父元素](#2-获取默认父元素)
- [3. 递归获取所有父级链](#3-递归获取所有父级链)
- [4. 检查是否有父元素](#4-检查是否有父元素)
- [5. 获取父元素时的注意事项](#5-获取父元素时的注意事项)
- [6. 可视化调试父元素](#6-可视化调试父元素)

在 mxGraph 中获取单元格（Cell）的父元素有以下几种方法：

## 1. 基本方法：使用`getParent()`

```javascript 
// 获取指定 cell 的父元素
const parentCell = graph.getModel().getParent(targetCell);

// 示例：获取当前选中单元格的父元素
const selectedCell = graph.getSelectionCell();
if (selectedCell) {
    const parent = graph.getModel().getParent(selectedCell);
    console.log("父元素:", parent);
}
```


## 2. 获取默认父元素

```javascript 
// 获取图形的默认父元素（通常是根的直接子元素）
const defaultParent = graph.getDefaultParent();
console.log("默认父元素:", defaultParent);
```


## 3. 递归获取所有父级链

```javascript 
// 递归获取某个 cell 的所有父级
function getAllParents(cell) {
    const parents = [];
    let current = graph.getModel().getParent(cell);
    
    while (current && current !== graph.getModel().getRoot()) {
        parents.push(current);
        current = graph.getModel().getParent(current);
    }
    
    return parents;
}

// 使用示例
const cellParents = getAllParents(targetCell);
console.log("所有父元素:", cellParents);
```


## 4. 检查是否有父元素

```javascript 
// 检查 cell 是否有父元素（不是根元素）
function hasParent(cell) {
    const parent = graph.getModel().getParent(cell);
    return parent && parent !== graph.getModel().getRoot();
}

// 使用示例
if (hasParent(targetCell)) {
    console.log("该单元格有父元素");
} else {
    console.log("该单元格没有父元素（或父元素是根）");
}
```


## 5. 获取父元素时的注意事项

1. **根元素处理**：

```javascript 
const root = graph.getModel().getRoot();
const parent = graph.getModel().getParent(targetCell);

if (parent && parent !== root) {
    // 这是有效的非根父元素
}
```


1. **批量操作时获取**：

```javascript 
graph.getModel().beginUpdate();
try {
    const parent = graph.getModel().getParent(targetCell);
    // 其他操作...
} finally {
    graph.getModel().endUpdate();
}
```


## 6. 可视化调试父元素

```javascript 
// 高亮显示父元素（用于调试）
const parent = graph.getModel().getParent(targetCell);
if (parent) {
    graph.setSelectionCell(parent);
    graph.scrollCellToVisible(parent);
}
```
