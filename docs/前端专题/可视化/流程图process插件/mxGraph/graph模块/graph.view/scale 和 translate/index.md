# scale 和 translate

## 目录

- [1.scale属性（缩放比例）](#1scale属性缩放比例)
  - [含义](#含义)
  - [特性](#特性)
  - [注意事项](#注意事项)
- [2.translate属性（平移偏移）](#2translate属性平移偏移)
  - [含义](#含义)
  - [特性](#特性)
  - [注意事项](#注意事项)
- [综合关系公式](#综合关系公式)
- [重要注意事项](#重要注意事项)

在 mxGraph 中，`graph.view`是图形的视图对象（mxGraphView），其中的`scale`和`translate`是控制图形显示的两个核心属性。

## 1.`scale`属性（缩放比例）

### 含义

- 表示当前图形的缩放级别
- 默认值为`1`（100% 原始大小）
- 大于`1`表示放大，小于`1`表示缩小

### 特性

```javascript 
// 获取当前缩放比例
const currentScale = graph.view.scale;

// 设置缩放比例（0.5 = 缩小50%，2 = 放大200%）
graph.view.scale = 0.5;
```


### 注意事项

1. **非线性缩放**：缩放会影响所有图形元素，包括线条宽度、文字大小等
2. **性能影响**：过大或过小的缩放值可能导致渲染性能下降
3. **限制范围**：建议设置合理的边界值（如 0.1 ≤ scale ≤ 10）
4. **与transform的区别**：scale只影响视图渲染，不改变图形的实际坐标

## 2.`translate`属性（平移偏移）

### 含义

- 表示图形视图的平移偏移量
- 是一个包含`x`和`y`属性的对象
- 默认值为`{ x: 0, y: 0 }`（无偏移）

### 特性

```typescript 
// 获取当前平移值
const currentTranslate = graph.view.translate;

// 设置平移（向右移动100px，向下移动50px）
graph.view.translate = { x: 100, y: 50 };
```


### 注意事项

1. **坐标系**：平移值是相对于原始位置的像素偏移量
2. **与scale的关系**：平移值会受到当前缩放比例的影响
3. **负值有效**：可以使用负值实现向左/上方向的平移
4. **动态计算**：实际显示位置 = (原始坐标 + translate) \* scale

## 综合关系公式

**视图中的任何一点的实际显示位置计算：**

```text 
显示X = (原始X + translate.x) * scale
显示Y = (原始Y + translate.y) * scale
```


注意： 这个显示数据时在事件中；你获取到的数据；原始数据；是你绘制时传入的数据；

## 重要注意事项

1. **视图刷新**：修改这两个属性后通常需要调用`graph.view.revalidate()`刷新视图

```javascript 
graph.view.scale = 1.5;
graph.view.translate = { x: 50, y: 20 };
graph.view.revalidate();
```


1. **交互影响**：这两个属性会影响：
   - 鼠标位置计算
   - 选择框绘制
   - 滚动条位置
2. **保存/恢复状态**：如果需要保存视图状态，应该记录这两个值：

```javascript 
// 保存视图状态
const viewState = {
  scale: graph.view.scale,
  translate: { ...graph.view.translate }
};

// 恢复视图状态
graph.view.scale = viewState.scale;
graph.view.translate = viewState.translate;
graph.view.revalidate();
```


1. **与缩放工具配合**：使用官方缩放工具时，这些属性会自动更新：

```javascript 
// 放大到适合窗口
graph.zoomToFit();

// 缩放到指定比例
graph.zoomTo(1.5);
```


1. **边界检查**：修改值时应该进行合理性检查：

```javascript 
// 确保缩放值在合理范围内
function setSafeScale(graph, newScale) {
  graph.view.scale = Math.max(0.01, Math.min(10, newScale));
  graph.view.revalidate();
}
```


理解并正确使用这两个属性，可以实现复杂的图形浏览和导航功能，是开发mxGraph交互功能的基础。
