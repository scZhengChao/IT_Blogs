# 创建cell的时候给出标识；方便后续识别

## 目录

- [方法1：使用value存储业务数据（推荐）](#方法1使用value存储业务数据推荐)
- [方法2：使用mxCell.setUserObject()](#方法2使用mxCellsetUserObject)
- [方法3：自定义属性（直接扩展）](#方法3自定义属性直接扩展)
- [方法4：使用样式标识（快速过滤）](#方法4使用样式标识快速过滤)
- [完整示例（推荐方法1+方法2结合）](#完整示例推荐方法1方法2结合)
- [关键问题处理](#关键问题处理)
  - [1.序列化支持（保存/加载）](#1序列化支持保存加载)
  - [2.类型安全访问](#2类型安全访问)
  - [3.动态更新标识](#3动态更新标识)
- [方案对比](#方案对比)

在 mxGraph 中为插入的单元格（Cell）添加可识别的业务标识，有几种可靠的方法。以下是具体实现方案，根据您的需求选择最适合的方式：

### **方法1：使用**\*\*`value`\*\***存储业务数据（推荐）**

```javascript 
// 插入时附加业务数据
const cell = graph.insertVertex(
  parent, 
  null, 
  {
    label: "显示文本",  // 可选的显示文本
    businessData: {    // 您的业务标识
      id: "unique_123",
      type: "specialRect",
      customFlag: true
    }
  },
  x, y, width, height,
  "fillColor=#CCE5FF"
);

// 读取时（安全写法）
function getBusinessData(cell) {
  return cell.value?.businessData || {};
}

console.log(getBusinessData(cell).id); // → "unique_123"
```


**优点**：

- **官方推荐方式，兼容性好**
- 自动参与序列化（保存/加载图形时保留数据）
- 可通过`graph.getModel().getValue(cell)`统一访问

***

### **方法2：使用**\*\*`mxCell.setUserObject()`\*\*

```javascript 
// 插入单元格
const cell = graph.insertVertex(parent, null, "文本", x, y, w, h);

// 附加业务对象
cell.setUserObject({
  id: "456",
  isSpecial: true
});

// 读取时
const businessObj = cell.getUserObject();
console.log(businessObj.id); // → "456"
```


**适用场景**：

- **需要将业务数据与显示标签完全分离时**
- 已有代码占用了`value`属性

***

### **方法3：自定义属性（直接扩展）**

```typescript 
// 插入后直接添加属性
const cell = graph.insertVertex(...);
cell.myBusinessFlag = "custom_value";

// 读取时
console.log(cell.myBusinessFlag);
```


**注意**：

- **需自行处理序列化（需重写**\*\*`mxCodec`）\*\*​
- **可能与其他插件属性冲突**

### **方法4：使用样式标识（快速过滤）**

```javascript 
// 插入时添加特殊样式
const cell = graph.insertVertex(
  parent,
  null,
  "",
  x, y, w, h,
  "fillColor=blue;customFlag=special" // 添加标识
);

// 通过样式查找
graph.getModel().getCells().filter(c => {
  const style = graph.getCellStyle(c);
  return style.customFlag === "special";
});
```


**适用场景**：

- 需要快速筛选特定类型单元格时
- 样式与业务逻辑强关联的场景

***

### **完整示例（推荐方法1+方法2结合）**

```javascript 
// 插入带标识的单元格
function createMarkedCell(label, data, x, y, w, h, style) {
  const cell = graph.insertVertex(
    graph.getDefaultParent(),
    null,
    { label, businessData: data }, // 方法1
    x, y, w, h,
    style
  );
  cell.setUserObject({ createdAt: Date.now() }); // 方法2
  return cell;
}

// 使用示例
const markedCell = createMarkedCell(
  "重要节点",
  { id: "789", priority: "high" },
  100, 100, 80, 40,
  "fillColor=#FFCCCC"
);

// 通过标识快速查找
function findCellById(id) {
  return graph.getModel().getCells().find(c => {
    return c.value?.businessData?.id === id;
  });
}

const found = findCellById("789");
console.log(found.getUserObject().createdAt); // 打印创建时间戳
```


### **关键问题处理**

#### 1.**序列化支持（保存/加载）**

```javascript 
// 注册自定义编码器（以方法1为例）
const codec = mxCodecRegistry.getCodec(mxCell);
const oldEncode = codec.encode;
codec.encode = function(enc, obj) {
  const node = oldEncode.apply(this, arguments);
  if (obj.value?.businessData) {
    mxUtils.setAttribute(node, "businessData", 
      JSON.stringify(obj.value.businessData));
  }
  return node;
};
```


#### 2.**类型安全访问**

```javascript 
// 安全读取辅助函数
function getCellMarkers(cell) {
  return {
    ...(cell.value?.businessData || {}),
    ...(cell.getUserObject() || {})
  };
}

// 使用
const markers = getCellMarkers(targetCell);
if (markers.id) { /*...*/ }
```


#### 3.**动态更新标识**

```javascript 
// 更新业务数据
function updateCellMarker(cell, key, value) {
  graph.getModel().beginUpdate();
  try {
    if (!cell.value.businessData) {
      cell.value = { ...cell.value, businessData: {} };
    }
    cell.value.businessData[key] = value;
    graph.refresh(cell); // 触发视图更新
  } finally {
    graph.getModel().endUpdate();
  }
}
```


### **方案对比**

| 方法             | 易用性   | 序列化 | 查询效率 | 适用场景    |
| -------------- | ----- | --- | ---- | ------- |
| \`value\`属性    | ★★★★★ | 自动  | 中    | 大多数业务场景 |
| \`userObject\` | ★★★★☆ | 需处理 | 中    | 数据与显示分离 |
| 自定义属性          | ★★★☆☆ | 需处理 | 高    | 需要快速访问  |
| 样式标识           | ★★☆☆☆ | 自动  | 低    | 简单分类    |

**推荐选择**：

- 优先用**方法1（value）** 存储核心业务标识
- 配合**方法2（userObject）** 存储辅助元数据
- 需要高性能查询时补充**自定义属性**
