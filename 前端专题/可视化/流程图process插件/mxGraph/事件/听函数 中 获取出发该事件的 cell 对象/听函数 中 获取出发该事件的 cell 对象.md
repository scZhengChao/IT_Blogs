# 听函数 中 获取出发该事件的 cell 对象

## 目录

- [正确获取方式](#正确获取方式)
- [不同变更类型的处理](#不同变更类型的处理)
  - [1. 当单元格被修改时（如属性变化）](#1-当单元格被修改时如属性变化)
  - [2. 当新增/删除单元格时](#2-当新增删除单元格时)
- [为什么不能直接获取cell？](#为什么不能直接获取cell)
- [特殊场景处理](#特殊场景处理)
  - [1. 需要知道变更前值](#1-需要知道变更前值)
  - [2. 判断是否用户操作触发](#2-判断是否用户操作触发)
- [性能优化建议](#性能优化建议)
- [注意事项](#注意事项)

在 mxGraph 中，当监听`mxEvent.CHANGE`事件时，要获取触发该事件的 cell 对象，需要通过**事件对象的属性**来访问。以下是具体实现方法：

### **正确获取方式**

```javascript 
graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt) {
  // 关键：从事件对象中获取变更的cells
  const changes = evt.getProperty('edit').changes;
  
  changes.forEach(change => {
    if (change.cell) {
      console.log('发生变更的cell:', change.cell);
      // 你的业务逻辑...
    }
  });
});
```


### **不同变更类型的处理**

#### 1. 当单元格被修改时（如属性变化）

```javascript 
changes.forEach(change => {
  if (change instanceof mxValueChange) {
    console.log('值变更的cell:', change.cell);
  }
  else if (change instanceof mxStyleChange) {
    console.log('样式变更的cell:', change.cell);
  }
  else if (change instanceof mxGeometryChange) {
    console.log('几何属性变更的cell:', change.cell);
  }
});
```


#### 2. 当新增/删除单元格时

```typescript 
changes.forEach(change => {
  if (change instanceof mxChildChange) {
    console.log('父子关系变更:', change.child, '新父级:', change.parent);
  }
});
```


### **为什么不能直接获取cell？**

1. `mxEvent.CHANGE`是批处理事件，可能包含多个操作
2. 一个编辑操作（如拖拽组）可能影响多个cells
3. 需要通过`edit.changes`数组遍历所有变更

```javascript 
// 监听所有模型变更
graph.getModel().addListener(mxEvent.CHANGE, function(sender, evt) {
  const edit = evt.getProperty('edit');
  
  edit.changes.forEach(change => {
    // 过滤只处理顶点/边的变更
    if (change.cell && graph.getModel().isVertex(change.cell)) {
      switch(true) {
        case change instanceof mxValueChange:
          console.log(`单元格[${change.cell.id}]值变更:`, change.value);
          break;
          
        case change instanceof mxGeometryChange:
          console.log(`单元格[${change.cell.id}]位置/尺寸变更:`, 
            change.cell.getGeometry());
          break;
          
        case change instanceof mxStyleChange:
          console.log(`单元格[${change.cell.id}]样式变更:`, 
            change.cell.getStyle());
          break;
      }
    }
  });
});
```


### **特殊场景处理**

#### 1. 需要知道变更前值

```javascript 
if (change instanceof mxValueChange) {
  console.log('旧值:', change.previous);
  console.log('新值:', change.value);
}
```


#### 2. 判断是否用户操作触发

```typescript 
if (edit.isUndoable) {
  console.log('用户操作触发的变更');
}
```


### **性能优化建议**

对于高频变更场景：

```javascript 
let changeTimer;
graph.getModel().addListener(mxEvent.CHANGE, function() {
  clearTimeout(changeTimer);
  changeTimer = setTimeout(() => {
    // 合并100ms内的变更
    console.log('最终变更结果:', graph.getModel().getCells());
  }, 100);
});
```


### **注意事项**

1. **事务边界**：`beginUpdate()`/`endUpdate()`之间的操作会合并为一个CHANGE事件
2. **递归变更**：父cell变化可能触发子cell的间接变更
3. **初始化阶段**：加载图形时可能触发大量CHANGE事件，需特殊处理
