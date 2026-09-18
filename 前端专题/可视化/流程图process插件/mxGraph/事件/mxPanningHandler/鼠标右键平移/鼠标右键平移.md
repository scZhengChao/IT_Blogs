# 鼠标右键平移

## 目录

- [1.默认的平移行为位置](#1默认的平移行为位置)
  - [(1)mxPanningHandler类](#1mxPanningHandler类)
  - [(2) 强制平移判断](#2-强制平移判断)
- [2.如何启用右键拖拽平移](#2如何启用右键拖拽平移)
  - [方法一：覆盖isForcePanningEvent](#方法一覆盖isForcePanningEvent)
  - [方法二：自定义鼠标事件监听](#方法二自定义鼠标事件监听)
- [3.完整实现示例](#3完整实现示例)
- [4.关键注意事项](#4关键注意事项)
- [5.调试建议](#5调试建议)

在 mxGraph 中，默认情况下**鼠标右键并不直接用于拖拽平移画布**，但可以通过以下方式实现或修改右键拖拽平移功能：

### 1.**默认的平移行为位置**

mxGraph 的平移逻辑主要在这些核心位置：

#### (1)`mxPanningHandler`类

- 文件位置：`mxGraph.js`或`mxPanningHandler.js`
- 关键方法：

```javascript 
mxPanningHandler.prototype.mouseDown = function(sender, evt) {
  // 判断是否应该开始平移（默认只检查中键）
  if (this.isForcePanningEvent(evt) || 
      (this.graph.isPanningEnabled() && mxEvent.isLeftMouseButton(evt))) {
    this.start(evt);
    mxEvent.consume(evt);
  }
};
```


#### (2) 强制平移判断

- `isForcePanningEvent()`方法默认**只响应鼠标中键**：

```javascript 
mxPanningHandler.prototype.isForcePanningEvent = function(evt) {
  return mxEvent.isMiddleMouseButton(evt); // 仅中键触发
};
```


### 2.**如何启用右键拖拽平移**

需要修改源码或覆盖默认行为：

#### 方法一：覆盖`isForcePanningEvent`

```javascript 
// 初始化graph后修改
graph.panningHandler.isForcePanningEvent = function(evt) {
  // 右键（button=2）或中键（button=1）均可触发
  return mxEvent.isRightMouseButton(evt) || 
         mxEvent.isMiddleMouseButton(evt);
};
```


#### 方法二：自定义鼠标事件监听

```typescript 
// 添加右键按下监听
mxEvent.addListener(graph.container, 'mousedown', function(evt) {
  if (mxEvent.isRightMouseButton(evt)) {
    graph.panningHandler.start(evt); // 强制开始平移
    mxEvent.consume(evt);
  }
});

// 防止右键菜单弹出
mxEvent.addListener(graph.container, 'contextmenu', function(evt) {
  evt.preventDefault();
});
```


### 3.**完整实现示例**

```javascript 
// 初始化graph后添加右键平移
function enableRightClickPanning(graph) {
  // 1. 确保平移功能启用
  graph.setPanning(true);
  
  // 2. 修改强制平移判断
  graph.panningHandler.isForcePanningEvent = function(evt) {
    return mxEvent.isRightMouseButton(evt) || 
           mxEvent.isMiddleMouseButton(evt);
  };
  
  // 3. 禁用右键菜单
  mxEvent.addListener(graph.container, 'contextmenu', function(evt) {
    if (!graph.isEditing()) {
      evt.preventDefault();
    }
  });
  
  // 4. 可选：添加视觉反馈
  mxEvent.addListener(graph.container, 'mousedown', function(evt) {
    if (mxEvent.isRightMouseButton(evt)) {
      graph.container.style.cursor = 'move';
    }
  });
  
  mxEvent.addListener(document, 'mouseup', function() {
    graph.container.style.cursor = '';
  });
}
```


### 4.**关键注意事项**

1. **与右键菜单的冲突**：
   - 必须阻止默认的`contextmenu`事件
   - 可以通过条件判断保留某些情况下的右键菜单
2. **与节点拖拽的兼容性**：
   - 如果同时启用了节点拖拽（`graph.setCellsMovable(true)`），需要协调两者逻辑
3. **触摸设备适配**：
   - 在移动端可能需要额外处理`touch`事件
4. **版本差异**：
   - mxGraph 不同版本中，`mxPanningHandler`的具体实现可能略有不同

***

### 5.**调试建议**

如果右键平移不生效，可以检查：

```javascript 
console.log('Panning enabled:', graph.isPanningEnabled());
console.log('Force panning check:', 
  graph.panningHandler.isForcePanningEvent(evt));
```
