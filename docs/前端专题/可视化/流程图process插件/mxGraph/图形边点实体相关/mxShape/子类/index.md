# 子类

## 目录

- [1. 核心基础图形](#1-核心基础图形)
- [2. 连接线/箭头](#2-连接线箭头)
- [3. 流程图符号](#3-流程图符号)
- [4. 特殊用途图形](#4-特殊用途图形)
- [5. 完整形状列表（通过常量获取）](#5-完整形状列表通过常量获取)
- [使用示例](#使用示例)
  - [创建特定形状的单元格](#创建特定形状的单元格)
- [自定义形状扩展](#自定义形状扩展)
- [注意事项](#注意事项)

### **1. 核心基础图形**

| 类名                   | 描述     | 样式键 (\`shape=\`) | 图示 |
| -------------------- | ------ | ---------------- | -- |
| \`mxRectangleShape\` | 矩形（默认） | \`rectangle\`    | ▭  |
| \`mxEllipse\`        | 椭圆/圆形  | \`ellipse\`      | ⭕  |
| \`mxRhombus\`        | 菱形     | \`rhombus\`      | ◆  |
| \`mxTriangle\`       | 三角形    | \`triangle\`     | ▲  |
| \`mxHexagon\`        | 六边形    | \`hexagon\`      | ⬢  |
| \`mxCylinder\`       | 圆柱体    | \`cylinder\`     | ⬭  |
| \`mxActor\`          | 人形图标   | \`actor\`        | ⛑  |
| \`mxCloud\`          | 云朵形状   | \`cloud\`        | ☁  |

### **2. 连接线/箭头**

| 类名                | 描述    | 样式键             | 图示  |
| ----------------- | ----- | --------------- | --- |
| \`mxConnector\`   | 普通连接线 | \`connector\`   | ─── |
| \`mxArrow\`       | 单箭头   | \`arrow\`       | ──→ |
| \`mxDoubleArrow\` | 双箭头   | \`doubleArrow\` | ←─→ |
| \`mxLine\`        | 直线    | \`line\`        | ─── |
| \`mxCurve\`       | 曲线    | \`flexArrow\`   | ⌒   |

***

### **3. 流程图符号**

| 类名               | 描述   | 样式键          | 图示        |
| ---------------- | ---- | ------------ | --------- |
| \`mxSwimlane\`   | 泳道   | \`swimlane\` | ┆         |
| \`mxLabel\`      | 文本标签 | \`label\`    | \\\[Text] |
| \`mxImageShape\` | 图像占位 | \`image\`    | 🖼        |
| \`mxNote\`       | 便签纸  | \`note\`     | 📝        |

### **4. 特殊用途图形**

| 类名             | 描述   | 样式键       | 典型用途  |
| -------------- | ---- | --------- | ----- |
| \`mxGroup\`    | 组容器  | \`group\` | 嵌套元素  |
| \`mxPolyline\` | 多段线  | \\-       | 自定义路径 |
| \`mxText\`     | 独立文本 | \\-       | 悬浮标注  |

***

### **5. 完整形状列表（通过常量获取）**

```javascript 
// 获取所有内置形状名称
const builtInShapes = [
  mxConstants.SHAPE_RECTANGLE,    // "rectangle"
  mxConstants.SHAPE_ELLIPSE,      // "ellipse"
  mxConstants.SHAPE_DOUBLE_ELLIPSE, // "doubleEllipse"
  mxConstants.SHAPE_RHOMBUS,      // "rhombus"
  mxConstants.SHAPE_TRIANGLE,     // "triangle"
  mxConstants.SHAPE_HEXAGON,      // "hexagon"
  mxConstants.SHAPE_CLOUD,        // "cloud"
  mxConstants.SHAPE_ACTOR,        // "actor"
  // ...其他形状
];
```


### **使用示例**

#### 创建特定形状的单元格

```javascript 
// 1. 菱形节点
graph.insertVertex(
  parent, null, "决策", 
  x, y, w, h,
  "shape=rhombus;fillColor=#FFCC00"
);

// 2. 带箭头的连接线
graph.insertEdge(
  parent, null, "", 
  srcCell, dstCell,
  "shape=arrow;strokeWidth=2"
);
```


### **自定义形状扩展**

如需创建自定义图形，继承`mxShape`：

```javascript 
class CustomStarShape extends mxShape {
  paintBackground(c, x, y, w, h) {
    // 绘制五角星逻辑
    c.begin();
    c.moveTo(x + w/2, y);
    c.lineTo(x + w*0.6, y + h*0.4);
    // ...其他路径
    c.fillAndStroke();
  }
}

// 注册到mxCellRenderer
mxCellRenderer.registerShape('star', CustomStarShape);

// 使用
graph.insertVertex(parent, null, "星", x, y, 40, 40, "shape=star");
```


### **注意事项**

1. **样式继承** &#x20;

   所有形状支持以下通用样式：

```text 
fillColor=#FFFFFF, strokeColor=#000000, strokeWidth=1, dashed=0
```


1. **形状与HTML** &#x20;

   **设置**\*\*`dialect=mxConstants.DIALECT_STRICTHTML`\*\***强制使用SVG/VML渲染**
2. **性能影响** &#x20;

   复杂形状（如`mxCloud`）比基础矩形渲染成本更高

通过组合这些内置形状和自定义扩展，可以满足绝大多数图形绘制需求。

[mxText](./mxText/index.md "mxText")
