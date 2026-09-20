# 不同的创建cell

## 目录

- [方法1：使用graph.addCell()（底层方法）](#方法1使用graphaddCell底层方法)
- [方法2：使用graph.createVertex()+graph.addCell()](#方法2使用graphcreateVertexgraphaddCell)
- [方法3：使用mxGraphModel.add()（直接操作模型）](#方法3使用mxGraphModeladd直接操作模型)
- [方法4：克隆现有单元格（graph.cloneCells()）](#方法4克隆现有单元格graphcloneCells)
- [方法5：使用mxGraph.importCells()（从XML导入）](#方法5使用mxGraphimportCells从XML导入)
- [方法6：使用insertVertex](#方法6使用insertVertex)
  - [方法对比表](#方法对比表)
  - [如何选择？](#如何选择)
  - [完整示例（替代方案实现矩形绘制）](#完整示例替代方案实现矩形绘制)

### **方法1：使用**\*\*`graph.addCell()`（底层方法）\*\*​

```javascript 
// 手动创建 mxCell 对象
const vertex = new mxCell("标签", 
  new mxGeometry(x, y, width, height),
  "fillColor=#FFCCCC;strokeColor=#333333"
);
vertex.setVertex(true); // 标记为顶点

// 添加到图形
graph.addCell(vertex, parentCell);
```


**适用场景**：

- 需要更精细控制 Cell 属性时
- 批量添加单元格时性能更好

***

### **方法2：使用**\*\*`graph.createVertex()`****+****`graph.addCell()`\*\*

```typescript 
// 先创建未绑定的 Cell
const vertex = graph.createVertex(
  parent,
  null,
  "标签",
  x, y, width, height,
  "shape=rectangle;fillColor=#CCE5FF",
  false // 不自动添加到模型
);

// 手动添加（可插入到特定位置）
graph.addCell(vertex, parent, index); // index 指定插入位置
```


**优势**：

- 创建和添加分离，适合复杂逻辑
- 可控制插入顺序（通过`index`参数）

***

### **方法3：使用**\*\*`mxGraphModel.add()`（直接操作模型）\*\*​

```javascript 
graph.getModel().beginUpdate();
try {
  const vertex = new mxCell("数据", 
    new mxGeometry(x, y, width, height),
    "fillColor=none;dashed=1"
  );
  vertex.setVertex(true);
  
  // 直接通过模型添加
  graph.getModel().add(parent, vertex, index);
} finally {
  graph.getModel().endUpdate();
}
```


**适用场景**：

- 需要绕过图形视图的默认行为时
- 实现自定义的撤销/重做逻辑

### **方法4：克隆现有单元格（****`graph.cloneCells()`****）**

```javascript 
// 先创建一个模板单元格
const template = graph.insertVertex(parent, null, "模板", 0, 0, 100, 50);

// 克隆到新位置
const newCell = graph.cloneCells([template], true, null, false)[0];
newCell.geometry.x = x;
newCell.geometry.y = y;
graph.addCell(newCell);
```


**优势**：

- 复用已有样式和配置
- 适合需要创建大量相似元素的场景

***

### **方法5：使用**\*\*`mxGraph.importCells()`（从XML导入）\*\*​

```javascript 
// 生成单元格的XML描述
const xml = `
<mxCell id="newVertex" value="导入的单元格" style="shape=rectangle" vertex="1">
  <mxGeometry x="${x}" y="${y}" width="${width}" height="${height}"/>
</mxCell>
`;

// 导入到图形
const doc = mxUtils.parseXml(xml);
const cells = graph.importCells(doc.documentElement.childNodes);
graph.addCells(cells);
```


**适用场景**：

- 从外部系统动态加载单元格定义时
- 需要版本化存储单元格配置时

## **方法6：使用**\*\*`insertVertex`\*\*

```javascript 
graph.getModel().beginUpdate();
try {
  // 关键点2：将视图坐标转换为模型坐标
  const tr = graph.view.translate;
  const scale = graph.view.scale;
  
  const x = Math.min(startPoint.x, pt.x) / scale - tr.x;
  const y = Math.min(startPoint.y, pt.y) / scale - tr.y;
  const w = width / scale;
  const h = height / scale;
  
  graph.insertVertex(
    graph.getDefaultParent(),
    null,
    '',
    x, y, w, h,
    'fillColor=#CCE5FF;strokeColor=#3399FF'
  );
} finally {
  graph.getModel().endUpdate();
}

```


### **方法对比表**

| 方法                     | 优点      | 缺点      | 典型用途       |
| ---------------------- | ------- | ------- | ---------- |
| \`insertVertex()\`     | 简单易用    | 灵活性较低   | 快速添加标准图形   |
| \`addCell()\`          | 底层控制    | 需手动设置属性 | 批量操作、自定义逻辑 |
| \`createVertex()\`     | 创建/添加分离 | 代码稍多    | 需要预配置的场景   |
| \`mxGraphModel.add()\` | 绕过视图逻辑  | 需处理事务   | 高级自定义操作    |
| \`cloneCells()\`       | 复用配置    | 需要模板    | 创建相似元素     |
| \`importCells()\`      | 支持序列化   | XML处理复杂 | 外部数据导入     |

***

### **如何选择？**

1. **简单场景**→`insertVertex()`
2. **需要性能优化**→`addCell()`
3. **复用现有样式**→`cloneCells()`
4. **底层控制**→`mxGraphModel.add()`
5. **动态加载**→`importCells()`

### **完整示例（替代方案实现矩形绘制）**

```javascript 
// 使用 addCell() 替代 insertVertex()
function createRectWithTag(x, y, w, h, tag) {
  const vertex = new mxCell(
    { label: "矩形", businessData: { id: tag } },
    new mxGeometry(x, y, w, h),
    "fillColor=#FFCCCC"
  );
  vertex.setVertex(true);
  
  graph.addCell(vertex, graph.getDefaultParent());
  return vertex;
}

// 使用克隆方式创建相似矩形
const template = createRectWithTag(0, 0, 100, 50, "template");
const cloned = graph.cloneCells([template], true)[0];
cloned.geometry.x = 150;
cloned.geometry.y = 150;
graph.addCell(cloned);
```
