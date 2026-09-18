# 添加一个 临时可见的图形 且不希望它影响 mxGraph 的正常事件处理和模型状态

## 目录

- [最优方案：使用mxCellOverlay或视图层绘制](#最优方案使用mxCellOverlay或视图层绘制)
  - [方法1：临时覆盖层（不进入模型）](#方法1临时覆盖层不进入模型)
  - [方法2：使用mxCellOverlay（轻量级标记）](#方法2使用mxCellOverlay轻量级标记)
- [方法3：纯DOM叠加（完全独立）](#方法3纯DOM叠加完全独立)
- [关键设计原则](#关键设计原则)
- [完整工作流示例](#完整工作流示例)
- [方案对比](#方案对比)

如果只是需要添加一个**临时可见的图形**且不希望它影响 mxGraph 的正常事件处理和模型状态，可以通过**直接操作视图层**实现。以下是完全隔离的解决方案：

### 最优方案：使用`mxCellOverlay`或视图层绘制

#### 方法1：临时覆盖层（不进入模型）

```javascript 
// 创建临时图形（不会出现在模型中）
function addTempShape(graph, bounds, style) {
  const shape = new mxRectangleShape(bounds, null, 'red', 2);
  shape.dialect = mxConstants.DIALECT_STRICTHTML;
  shape.init(graph.getView().getOverlayPane());
  shape.pointerEvents = false; // 关键！禁止交互事件
  
  // 自定义样式（透明填充+红色边框）
  shape.fillOpacity = 0;
  shape.strokeOpacity = 1;
  shape.isDashed = true;
  
  return {
    dispose: () => shape.destroy()
  };
}

// 使用示例
const tempRect = addTempShape(
  graph,
  new mxRectangle(100, 100, 200, 150), // x,y,width,height
  'strokeColor=red;fillColor=none'
);

// 稍后删除
setTimeout(() => tempRect.dispose(), 3000); // 3秒后消失
```


**优点**：

- 完全不影响模型和事件系统
- 性能开销极小
- 支持所有 mxGraph 图形类型（矩形/圆形/路径等）

#### 方法2：使用`mxCellOverlay`（轻量级标记）

```javascript 
// 在现有cell上添加临时标记
const targetCell = graph.getSelectionCell();
const overlay = new mxCellOverlay(
  new mxRectangleShape(new mxRectangle(0, 0, 20, 20), null, 'red'),
  'Tooltip'
);

// 添加到视图层（非模型）
graph.addCellOverlay(targetCell, overlay);

// 移除标记
setTimeout(() => {
  graph.removeCellOverlay(targetCell, overlay);
}, 2000);
```


### 方法3：纯DOM叠加（完全独立）

```typescript 
// 在mxGraph容器上叠加HTML元素
const tempDiv = document.createElement('div');
tempDiv.style.cssText = `
  position: absolute;
  border: 2px dashed red;
  background: rgba(255,0,0,0.1);
  pointer-events: none; /* 关键！穿透鼠标事件 */
`;

// 计算位置（需考虑缩放和滚动）
const pt = graph.getPointForEvent({clientX: 100, clientY: 100});
tempDiv.style.left = `${pt.x}px`;
tempDiv.style.top = `${pt.y}px`;
tempDiv.style.width = '200px';
tempDiv.style.height = '150px';

graph.container.appendChild(tempDiv);

// 移除
setTimeout(() => tempDiv.remove(), 3000);
```


### 关键设计原则

1. **事件隔离** &#x20;

   设置`pointer-events: none`或`shape.pointerEvents = false`确保临时图形不拦截鼠标事件
2. **视觉层分离** &#x20;

   使用以下图层之一：
   - `graph.view.getOverlayPane()`（在mxGraph元素上层）
   - `graph.view.getDecoratorPane()`（在单元格下层）
3. **内存管理** &#x20;

   必须手动销毁临时对象：

```javascript 
shape.destroy(); // mxGraph形状
element.remove(); // DOM元素
```


### 完整工作流示例

```javascript 
class TempShapeManager {
  constructor(graph) {
    this.graph = graph;
    this.tempShapes = new Set();
  }

  addRectangle(bounds, style) {
    const shape = new mxRectangleShape(bounds, null, style?.stroke || 'red', 2);
    shape.dialect = mxConstants.DIALECT_STRICTHTML;
    shape.pointerEvents = false;
    shape.init(this.graph.view.getOverlayPane());
    
    const item = { shape, dispose: () => shape.destroy() };
    this.tempShapes.add(item);
    return item;
  }

  disposeAll() {
    this.tempShapes.forEach(item => item.dispose());
    this.tempShapes.clear();
  }
}

// 使用示例
const tempManager = new TempShapeManager(graph);
const rect1 = tempManager.addRectangle(
  new mxRectangle(50, 50, 100, 80),
  { stroke: '#FF00FF', fill: 'none' }
);

// 5秒后自动清理
setTimeout(() => tempManager.disposeAll(), 5000);
```


### 方案对比

| 方案            | 优点       | 缺点        | 适用场景     |
| ------------- | -------- | --------- | -------- |
| mxShape覆盖层    | 完全隔离模型   | 需手动计算坐标   | 临时辅助线/高亮 |
| mxCellOverlay | 关联现有cell | 只能附加到cell | 标记特定单元格  |
| DOM叠加         | 最高性能     | 需处理视图同步   | 复杂临时图形   |

选择依据：

- 需要与mxGraph坐标系同步 →**方法1**
- 需要标记现有cell →**方法2**
- 需要最高性能/复杂HTML →**方法3**
