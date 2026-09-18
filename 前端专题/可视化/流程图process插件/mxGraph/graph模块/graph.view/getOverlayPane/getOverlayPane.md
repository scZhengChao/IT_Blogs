# `getOverlayPane`

## 目录

- [覆盖层的作用](#覆盖层的作用)
- [技术特性](#技术特性)
- [典型使用场景](#典型使用场景)
  - [1. 连线预览](#1-连线预览)
  - [2. 拖拽预览](#2-拖拽预览)
  - [3. 选择高亮](#3-选择高亮)
- [覆盖层管理](#覆盖层管理)
  - [清除单个元素](#清除单个元素)
  - [清除整个覆盖层](#清除整个覆盖层)
  - [性能优化技巧](#性能优化技巧)
- [实现原理](#实现原理)
- [注意事项](#注意事项)

`graph.getView().getOverlayPane()`**是 mxGraph 中获取图形覆盖层(overlay pane)的标准方法**，这个覆盖层在图形交互中扮演着重要角色。

## 覆盖层的作用

1. **临时图形容器**：用于**存放临时性、需要显示在最上层的图形元素**
2. **交互反馈层**：显示**拖动预览、连线预览、选择框等交互元素**
3. **视觉特效层**：实现**高亮、动画等视觉效果而不影响主图形**

## 技术特性

| 特性      | 说明                   |
| ------- | -------------------- |
| DOM位置   | 位于图形最上层              |
| 渲染方式    | 与主图形使用相同的方言(SVG/VML) |
| 生命周期    | 临时性，内容可随时清除          |
| Z-index | 高于常规图形元素             |

## 典型使用场景

### 1. 连线预览

```javascript 
// 创建连线预览
var connector = new mxPolyline([], 'blue', 2);
connector.dialect = graph.dialect;
connector.init(graph.getView().getOverlayPane());

// 更新预览
connector.points = [startPt, endPt];
connector.redraw();
```


### 2. 拖拽预览

```javascript 
// 创建拖拽预览
var preview = new mxRectangleShape(bounds, 'rgba(0,150,255,0.2)', 'blue', 2);
preview.dialect = graph.dialect;
preview.init(graph.getView().getOverlayPane());
```


### 3. 选择高亮

```javascript 
// 高亮选中单元格
var highlight = new mxRectangleShape(bounds, null, 'red', 3);
highlight.dialect = graph.dialect;
highlight.init(graph.getView().getOverlayPane());
```


## 覆盖层管理

### 清除单个元素

```javascript 
// 销毁单个形状
previewShape.destroy();
```


### 清除整个覆盖层

```javascript 
// 清空覆盖层
graph.getView().getOverlayPane().innerHTML = '';
```


### 性能优化技巧

```javascript 
// 批量操作时先隐藏覆盖层
var overlay = graph.getView().getOverlayPane();
overlay.style.visibility = 'hidden';

// 执行多个操作...

// 操作完成后显示
overlay.style.visibility = 'visible';
```


## 实现原理

1. **DOM结构**：覆盖层是作为主图形元素的同级元素创建
2. **渲染流程**：与主图形分离渲染，避免影响主图形性能
3. **事件处理**：默认不拦截事件，事件会穿透到底层图形

## 注意事项

1. 覆盖层内容不会随图形一起导出
2. 频繁更新时应考虑节流处理
3. 在图形缩放时需手动处理覆盖层元素的缩放
4. 对于复杂交互，建议使用单个持久化元素而非频繁创建销毁

理解并正确使用覆盖层可以大大增强 mxGraph 应用的交互体验，同时保持主图形的整洁和性能。
