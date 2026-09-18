# 获取cell的坐标

## 目录

- [当cell绘制后](#当cell绘制后)
- [当cell 绘制前](#当cell-绘制前)
  - [直接从 Cell 的几何对象获取](#直接从-Cell-的几何对象获取)
  - [获取相对坐标（考虑父Cell的位置）](#获取相对坐标考虑父Cell的位置)
  - [3. 使用 mxGraph 的视图转换方法](#3-使用-mxGraph-的视图转换方法)
  - [4. 创建临时状态获取坐标（高级用法）](#4-创建临时状态获取坐标高级用法)
  - [注意事项](#注意事项)

# 当cell绘制后

[getCellBounds](getCellBounds.md "getCellBounds")

或者

```javascript 
/**
 * 获取单元格的绝对坐标（考虑父级和画布偏移）
 * @param {mxCell} cell 
 * @returns {mxPoint} 绝对坐标点
 */
function getCellAbsolutePosition(cell) {
  const state = graph.view.getState(cell);
  if (!state) return null;

  // 获取单元格中心点（视图坐标）
  const centerX = state.x + state.width / 2;
  const centerY = state.y + state.height / 2;

  // 转换为模型坐标（可选，取决于标记的定位方式）
  return graph.view.getPoint(new mxPoint(centerX, centerY));
}

```


# 当cell 绘制前

## 直接从 Cell 的几何对象获取

```typescript 
const cell = graph.getModel().getCell(cellId); // 获取cell对象
const geometry = cell.getGeometry(); // 获取几何信息

if (geometry) {
    const x = geometry.x; // X坐标
    const y = geometry.y; // Y坐标
    const width = geometry.width; // 宽度
    const height = geometry.height; // 高度
    
    console.log(`Cell位置: (${x}, ${y})`);
    console.log(`Cell尺寸: ${width}x${height}`);
}
```


## 获取相对坐标（考虑父Cell的位置）

```javascript 
const cell = graph.getModel().getCell(cellId);
const geometry = cell.getGeometry();

if (geometry) {
    // 获取相对于父Cell的坐标
    const relativeX = geometry.x;
    const relativeY = geometry.y;
    
    // 如果需要绝对坐标（相对于画布）
    let absoluteX = geometry.x;
    let absoluteY = geometry.y;
    
    // 递归累加父Cell的偏移量
    let parent = graph.getModel().getParent(cell);
    while (parent && parent !== graph.getModel().getRoot()) {
        const parentGeo = parent.getGeometry();
        if (parentGeo) {
            absoluteX += parentGeo.x;
            absoluteY += parentGeo.y;
        }
        parent = graph.getModel().getParent(parent);
    }
    
    console.log(`相对坐标: (${relativeX}, ${relativeY})`);
    console.log(`绝对坐标: (${absoluteX}, ${absoluteY})`);
}
```


## 3. 使用 mxGraph 的视图转换方法

```javascript 
const cell = graph.getModel().getCell(cellId);
const state = graph.view.getState(cell);

if (state) {
    // 如果Cell已经有视图状态（已渲染）
    const x = state.x;
    const y = state.y;
} else {
    // 如果Cell尚未渲染，使用几何信息
    const geometry = cell.getGeometry();
    if (geometry) {
        const x = geometry.x;
        const y = geometry.y;
    }
}
```


## 4. 创建临时状态获取坐标（高级用法）

```javascript 
const cell = graph.getModel().getCell(cellId);
const temporaryState = new mxCellState(graph.view, cell, graph.getCellStyle(cell));

if (temporaryState) {
    const x = temporaryState.x;
    const y = temporaryState.y;
    // 使用完后可以销毁临时状态
    temporaryState.destroy();
}
```


## 注意事项

1. **几何对象可能为null**：新创建的Cell如果没有设置几何信息，`getGeometry()`可能返回null
2. **默认坐标**：如果没有显式设置坐标，mxGraph通常会将坐标默认为(0, 0)
3. **组Cell的影响**：如果Cell位于组内，需要考虑组的偏移量
4. **性能考虑**：对于大量Cell，递归计算绝对坐标可能影响性能
5. **Edge的特殊性**：边的坐标计算方式与顶点不同，通常需要处理控制点
