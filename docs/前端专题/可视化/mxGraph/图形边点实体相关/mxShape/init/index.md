# init

## 目录

- [方法签名](#方法签名)
- [参数说明](#参数说明)
- [核心作用](#核心作用)
- [典型使用流程](#典型使用流程)
- [内部实现关键点](#内部实现关键点)
- [注意事项](#注意事项)
- [相关方法](#相关方法)
- [实际应用示例](#实际应用示例)

`init()`是 mxGraph 中`mxShape`**类的一个重要方法，用于初始化形状并将其添加到指定的 DOM 容器中**。

## 方法签名

```javascript 
init(container)
```


## 参数说明

- `container`：HTMLElement 类型，表示形状将被添加到的 DOM 容器元素

## 核心作用

1. **DOM 元素创建**：为形状创建实际的 DOM 元素（SVG/VML/HTML 取决于方言）
2. **容器关联**：将形状与指定的 DOM 容器建立关联
3. **渲染准备**：为后续的`paint()`或`redraw()`操作做好准备

## 典型使用流程

```javascript 
// 1. 创建形状实例
var shape = new mxRectangleShape(bounds, fill, stroke, strokeWidth);

// 2. 设置与图形相同的方言
shape.dialect = graph.dialect;

// 3. 初始化并添加到容器
shape.init(graph.getView().getOverlayPane());

// 4. 绘制形状
shape.paint(new mxCanvas2D(shape.node.ownerSVGElement));
```


## 内部实现关键点

1. 根据`dialect`属性创建相应类型的 DOM 节点：
   - SVG 方言：创建`<g>`元素
   - VML 方言：创建`<v:group>`元素
   - HTML 方言：创建`<div>`元素
2. 将创建的节点存储在`shape.node`属性中
3. 将节点添加到指定的容器：

> container.appendChild(this.node);

## 注意事项

1. **方言一致性**：必须在调用`init()`前设置正确的`dialect`属性
2. **多次初始化**：一个形状实例只能初始化一次，重复调用会导致错误
3. **容器选择**：通常使用图形视图的覆盖层 (`graph.getView().getOverlayPane()`)
4. **内存管理**：使用后应调用`destroy()`清理

## 相关方法

- `redraw()`：重新绘制已初始化的形状
- `destroy()`：清理形状及其 DOM 元素
- `paint()`：实际绘制形状内容

## 实际应用示例

```javascript 
// 创建自定义形状
function CustomShape() {
  mxShape.call(this);
}
mxUtils.extend(CustomShape, mxShape);

CustomShape.prototype.paintVertexShape = function(c, x, y, w, h) {
  // 自定义绘制逻辑
};

// 使用形状
var customShape = new CustomShape();
customShape.dialect = mxConstants.DIALECT_SVG;
customShape.bounds = new mxRectangle(0, 0, 100, 100);
customShape.init(container);
customShape.redraw();
```


`init()`方法是 mxShape 生命周期中的关键步骤，**将抽象的图形描述转换为实际的 DOM 元素，为后续的绘制操作奠定基础。**
