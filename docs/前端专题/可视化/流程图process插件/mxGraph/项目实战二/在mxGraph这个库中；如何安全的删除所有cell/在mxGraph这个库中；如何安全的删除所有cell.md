# 在mxGraph这个库中；如何安全的删除所有cell

## 目录

- [方法一：使用 removeCells 方法](#方法一使用-removeCells-方法)
- [方法二：直接操作模型](#方法二直接操作模型)
- [方法三：清除整个模型并重置](#方法三清除整个模型并重置)
- [注意事项](#注意事项)
- [显式过滤根 cell](#显式过滤根-cell)
- [区别](#区别)
  - [1. 返回内容不同](#1-返回内容不同)
  - [2. 参数灵活性](#2-参数灵活性)
  - [3. 返回顺序](#3-返回顺序)
  - [4. 是否包含隐藏元素](#4-是否包含隐藏元素)
  - [示例代码对比](#示例代码对比)
  - [何时使用哪个？](#何时使用哪个)
  - [性能考虑](#性能考虑)

**在 mxGraph 中删除所有 cell 时**，需要注意正确的方法以确保图形模型和视图的一致性。以下是几种安全删除所有 cell 的方法：

## 方法一：使用 removeCells 方法

```javascript 
// 获取图形模型
const model = graph.getModel();

// 开始批量更新
model.beginUpdate();
try {
    // 获取所有顶层 cells (不包括子 cells)
    const cells = graph.getChildCells();
    
    // 删除所有 cells
    graph.removeCells(cells);
} finally {
    // 结束批量更新
    model.endUpdate();
}
```


## 方法二：直接操作模型

```javascript 
const model = graph.getModel();

model.beginUpdate();
try {
    // 获取所有顶层 cells (包括子 cells)
    const cells = model.getRoot().children;
    
    // 删除所有 cells
    model.remove(cells);
} finally {
    model.endUpdate();
}

```


## 方法三：清除整个模型并重置

```javascript 
graph.getModel().clear();
```


## 注意事项

1. **批量操作**：始终使用`beginUpdate()`和`endUpdate()`包裹批量操作，以提高性能并确保一致性。
2. **选择清除**：删除前可能需要清除选择状态：

```javascript 
graph.clearSelection();

```


1. 事件处理：如果有自定义的事件监听器，可能需要临时禁用它们：

```javascript 
graph.setEnabled(false);
// 执行删除操作
graph.setEnabled(true);

```


1. **内存管理**：在删除大量 cells 后，可以考虑调用：

```javascript 
graph.refresh();

```


1. **根 cell**：mxGraph 模型始终有一个根 cell，不能删除根 cell 本身。

## 显式过滤根 cell

如果需要从一组 cell 中显式过滤掉根 cell：

```javascript 
const model = graph.getModel();
const root = model.getRoot();

model.beginUpdate();
try {
    // 获取所有 cell (可能包括根 cell)
    const allCells = model.cells;
    
    // 过滤掉根 cell
    const cellsToRemove = Object.values(allCells).filter(cell => cell !== root);
    
    // 删除过滤后的 cells
    graph.removeCells(cellsToRemove);
} finally {
    model.endUpdate();
}

```


# 区别

### 1. 返回内容不同

- `graph.getChildCells()` &#x20;

  返回的是**当前默认父级下的直接子单元格**（不包括孙子单元格），默认情况下就是根单元格的直接子级。
- `model.getRoot().children` &#x20;

  返回的是**根单元格的所有直接子单元格**（相当于`graph.getDefaultParent()`的子级）

### 2. 参数灵活性

- `graph.getChildCells(parent, vertices, edges)` &#x20;

  可以指定：
  - `parent`：要获取哪个父级的子级（默认是`graph.getDefaultParent()`）
  - `vertices`：是否包含顶点（默认 true）
  - `edges`：是否包含边（默认 true）
- `model.getRoot().children` &#x20;

  直接返回根的所有子级，不能过滤顶点/边。

### 3. 返回顺序

- `graph.getChildCells()` &#x20;

  返回顺序与图形显示顺序一致（受 z-index 影响）
- `model.getRoot().children` &#x20;

  返回的是模型中的原始顺序

### 4. 是否包含隐藏元素

- `graph.getChildCells()` &#x20;

  默认**不返回隐藏的单元格**（除非设置`includeHidden=true`）
- `model.getRoot().children` &#x20;

  会返回**所有子级**，包括隐藏的

### 示例代码对比

```javascript 
const model = graph.getModel();

// 方式1：使用 graph.getChildCells()
const children1 = graph.getChildCells(); 
// 等价于：
const children1 = graph.getChildCells(graph.getDefaultParent(), true, true);

// 方式2：使用 model.getRoot().children
const children2 = model.getRoot().children;
```


### 何时使用哪个？

- 当需要获取**当前视图可见**的子单元格时 → 用`graph.getChildCells()`
- 当需要获取**所有子级**（包括隐藏的）→ 用`model.getRoot().children`
- 当需要指定特定父级 → 用`graph.getChildCells(parent)`
- 当需要过滤顶点/边 → 用`graph.getChildCells(parent, vertices, edges)`

### 性能考虑

`model.getRoot().children`直接访问模型数据，稍快一点；
`graph.getChildCells()`会经过视图层处理，稍慢但更安全。
