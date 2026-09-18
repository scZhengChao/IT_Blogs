# 如何改变鼠标的样式

## 目录

- [完整代码实现（带十字光标）](#完整代码实现带十字光标)
- [关键实现点说明](#关键实现点说明)
- [实现二](#实现二)

需要结合 CSS 光标修改和 mxGraph 事件处理。以下是完整解决方案：

### 完整代码实现（带十字光标）

```html 
<!DOCTYPE html>
<html>
<head>
  <script src="https://jgraph.github.io/mxgraph/javascript/src/js/mxClient.js"></script>
  <style>
    #graphContainer {
      width: 800px;
      height: 600px;
      border: 1px solid gray;
    }
    
     /* 关键点1：定义十字光标样式 */
    .crosshair-cursor {
      cursor: crosshair;
    } 
  </style>
</head>
<body>
  <div id="graphContainer"></div>

  <script>
    // 初始化图形
    const container = document.getElementById('graphContainer');
    mxEvent.disableContextMenu(container);
    const graph = new mxGraph(container);
    graph.setPanning(true);
    graph.setEnabled(true);

    // 关键点2：状态变量
    let isDrawing = false;
    let startPoint = null;
    let previewShape = null;

    // 鼠标按下时开始绘制
    graph.addListener(mxEvent.MOUSE_DOWN, (sender, evt) => {
      if (!evt.getProperty('cell')) {
        isDrawing = true;
        startPoint = graph.getPointForEvent(evt.getEvent());
        
        // 关键点3：添加十字光标类
         container.classList.add('crosshair-cursor'); 
        
        // 创建透明预览矩形
        previewShape = new mxRectangleShape(
          new mxRectangle(startPoint.x, startPoint.y, 0, 0),
          'fillColor=none,strokeColor=red,strokeWidth=2'
        );
        previewShape.dialect = mxConstants.DIALECT_STRICTHTML;
        previewShape.init(graph.getView().getOverlayPane());
        
        mxEvent.consume(evt.getEvent());
      }
    });

    // 鼠标移动时更新预览
    graph.addListener(mxEvent.MOUSE_MOVE, (sender, evt) => {
      if (isDrawing && previewShape && startPoint) {
        const pt = graph.getPointForEvent(evt.getEvent());
        
        // 更新矩形尺寸
        previewShape.bounds = new mxRectangle(
          Math.min(startPoint.x, pt.x),
          Math.min(startPoint.y, pt.y),
          Math.abs(pt.x - startPoint.x),
          Math.abs(pt.y - startPoint.y)
        );
        previewShape.redraw();
        
        mxEvent.consume(evt.getEvent());
      }
    });

    // 鼠标释放时结束绘制
    graph.addListener(mxEvent.MOUSE_UP, (sender, evt) => {
      if (isDrawing) {
        // 关键点4：移除十字光标
         container.classList.remove('crosshair-cursor'); 
        
        const pt = graph.getPointForEvent(evt.getEvent());
        const width = Math.abs(pt.x - startPoint.x);
        const height = Math.abs(pt.y - startPoint.y);
        
        // 销毁预览
        previewShape.destroy();
        previewShape = null;
        isDrawing = false;

        // 创建正式矩形（忽略过小的拖动）
        if (width > 10 && height > 10) {
          graph.getModel().beginUpdate();
          try {
            graph.insertVertex(
              graph.getDefaultParent(),
              null,
              '',
              Math.min(startPoint.x, pt.x),
              Math.min(startPoint.y, pt.y),
              width,
              height,
              'fillColor=#CCE5FF;strokeColor=#3399FF'
            );
          } finally {
            graph.getModel().endUpdate();
          }
        }
        
        mxEvent.consume(evt.getEvent());
      }
    });

    // 关键点5：处理鼠标移出画布的情况
    mxEvent.addListener(container, 'mouseleave', () => {
      if (isDrawing) {
        container.classList.remove('crosshair-cursor');
        if (previewShape) {
          previewShape.destroy();
          previewShape = null;
        }
        isDrawing = false;
      }
    });
  </script>
</body>
</html>
```


### 关键实现点说明

```javascript 
 container.classList.add('crosshair-cursor');
 container.classList.remove('crosshair-cursor');
.crosshair-cursor {
      cursor: crosshair;
 }

```


1. **CSS 十字光标** &#x20;

   通过`.crosshair-cursor { cursor: crosshair; }`修改鼠标样式，比用 Canvas 绘制更高效。
2. **状态管理**
   - `isDrawing`标记是否处于绘制状态
   - 通过`classList.add/remove`动态切换光标样式
3. **边界情况处理**
   - 鼠标移出画布时自动清理状态（防止预览矩形残留）
   - 使用`mxEvent.consume()`避免事件冲突
4. **性能优化**
   - 复用单个`previewShape`对象而非反复创建销毁
   - 最小尺寸过滤防止误操作

# 实现二

也是类似的

```javascript 
freehand.init = function() {
  originalInit.apply(this, arguments);
  this.graph.container.style.cursor = 'crosshair';
};

const originalReset = freehand.reset;
freehand.reset = function() {
  originalReset.apply(this, arguments);
  this.graph.container.style.cursor = '';
};

```
